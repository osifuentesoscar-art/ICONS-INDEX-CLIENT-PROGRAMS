#!/usr/bin/env node
'use strict';

// Thin CLI wrapper around buildDocument() so the orchestration script (and
// anyone else) can render a data.json to .docx without importing the engine.
// Usage: node render.cjs <data.json> <output.docx>

const fs = require('fs');
const path = require('path');
// Repointed 2026-08-20 from ./icons_template.cjs to the live engine.
// The .cjs fork was last updated 8/7 and hardcodes alstStatus()/vfaStatus(),
// which stamp retired clinical tiers ("OPTIMAL", "MODERATE RISK") onto every
// document rendered through it -- including a female client scored against
// the male 7.0 ALST cutoff. The live engine prints raw values with no
// interpretation, and additionally carries buildAssessmentReport() and the
// Client View viewMode the fork never had.
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
