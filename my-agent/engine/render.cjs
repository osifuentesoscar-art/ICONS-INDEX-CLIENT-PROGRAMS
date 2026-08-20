#!/usr/bin/env node
'use strict';

// Thin CLI wrapper around buildDocument() so the orchestration script (and
// anyone else) can render a data.json to .docx without importing the engine.
// Usage: node render.cjs <data.json> <output.docx>
//
// ENGINE CONSOLIDATION (8/20/2026): this used to require a second, older copy
// of the engine at ./icons_template.cjs, which had drifted behind the canonical
// engine and was rendering retired clinical standards. That duplicate is deleted;
// this wrapper now uses the single canonical engine in scripts/. Verified before
// the switch by rendering every clients/*/data.json through both engines and
// diffing on data completeness: the canonical engine rendered strictly MORE of
// each data file than the old copy (3-4 more values per file) and lost nothing.
// The repo is "type": "commonjs", so requiring a .js file from here is fine.

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('../../scripts/icons_template.js');

async function main() {
  const [, , dataPath, outPath] = process.argv;
  if (!dataPath || !outPath) {
    console.error('usage: render.cjs <data.json> <output.docx>');
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const buffer = await buildDocument(data);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);
  console.log(`✓ wrote ${outPath} (${buffer.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
