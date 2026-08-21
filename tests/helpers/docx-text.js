'use strict';
// Minimal, dependency-free .docx text extractor for tests.
//
// A .docx is a ZIP; we need one entry from it (word/document.xml) and the
// repo has no zip library. Rather than add a dependency or shell out to
// `unzip`/python, this walks the ZIP central directory directly and
// inflates the entry with node's built-in zlib. Central directory (not
// local headers) because entries written with a data descriptor carry
// zero sizes in their local header.
const zlib = require('zlib');

const EOCD_SIG = 0x06054b50;
const CDFH_SIG = 0x02014b50;

function findEOCD(buf) {
  // EOCD is 22 bytes plus an optional trailing comment (max 65535).
  const start = Math.max(0, buf.length - (22 + 0xffff));
  for (let i = buf.length - 22; i >= start; i--) {
    if (buf.readUInt32LE(i) === EOCD_SIG) return i;
  }
  throw new Error('not a zip: no end-of-central-directory record');
}

function readEntry(buf, name) {
  const eocd = findEOCD(buf);
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);

  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== CDFH_SIG) throw new Error('corrupt central directory');
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const fnLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOff = buf.readUInt32LE(p + 42);
    const fileName = buf.toString('utf8', p + 46, p + 46 + fnLen);

    if (fileName === name) {
      // Local header's own name/extra lengths locate the data; they can
      // differ from the central directory's extra field.
      const lFnLen = buf.readUInt16LE(localOff + 26);
      const lExtraLen = buf.readUInt16LE(localOff + 28);
      const dataStart = localOff + 30 + lFnLen + lExtraLen;
      const data = buf.subarray(dataStart, dataStart + compSize);
      return method === 0 ? Buffer.from(data) : zlib.inflateRawSync(data);
    }
    p += 46 + fnLen + extraLen + commentLen;
  }
  throw new Error(`entry not found in zip: ${name}`);
}

// All visible text of the document body, one run per <w:t>, space-joined.
// Enough to assert a phrase is present or absent; not a layout check.
function docxText(buffer) {
  const xml = readEntry(buffer, 'word/document.xml').toString('utf8');
  const runs = xml.match(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g) || [];
  return runs
    .map((r) => r.replace(/^<w:t(?:\s[^>]*)?>/, '').replace(/<\/w:t>$/, ''))
    .map((t) => t
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&'))
    .join(' ');
}

module.exports = { docxText, readEntry };
