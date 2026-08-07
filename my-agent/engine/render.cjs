#!/usr/bin/env node
'use strict';

// Thin CLI wrapper around buildDocument() so the orchestration script (and
// anyone else) can render a data.json to .docx without importing the engine.
// Usage: node render.cjs <data.json> <output.docx>

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template.cjs');

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
