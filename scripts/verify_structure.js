/**
 * ICONS repo structure verifier
 * Brace Life Studios — run with: node scripts/verify_structure.js
 *
 * Enforces the client/trainer separation established 8/20/2026 (CLAUDE.md,
 * "CLIENT / TRAINER SEPARATION"). This exists instead of a supervising agent:
 * the boundary is a mechanical property of the repo, so a check that runs in
 * two seconds is a better guard than a role that has to remember to look.
 *
 * Checks:
 *   1. Every build script lives in scripts/clients/ or scripts/trainers/
 *      (only the shared engine and system-doc builders sit at scripts/ root).
 *   2. No client script writes into trainers/, and no trainer script writes
 *      into clients/ — read straight out of each script's output path.
 *   3. Removed-and-should-stay-removed paths have not come back.
 *   4. Every generated .docx sits under clients/ or trainers/, nowhere else.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const problems = [];
const notes = [];

const ENGINE_ROOT_ALLOWED = new Set([
  'icons_template.js',        // shared engine, required by both sides
  'icons_baseline_sheets.js', // writes system_documents/, audience-neutral
  'verify_structure.js',      // this file
]);

// ---- 1. script placement -------------------------------------------------
for (const entry of fs.readdirSync(path.join(ROOT, 'scripts'))) {
  const full = path.join(ROOT, 'scripts', entry);
  if (fs.statSync(full).isDirectory()) {
    if (!['clients', 'trainers'].includes(entry)) {
      problems.push(`scripts/${entry}/ is not a recognized audience folder (expected clients/ or trainers/)`);
    }
    continue;
  }
  if (!ENGINE_ROOT_ALLOWED.has(entry)) {
    problems.push(`scripts/${entry} sits at scripts/ root — move it to scripts/clients/ or scripts/trainers/`);
  }
}

// ---- 2. output paths respect the boundary --------------------------------
// matches both `path.join(...)` and the inline `require('path').join(...)` form
const OUT_RE = /(?:require\('path'\)|path)\.join\(\s*__dirname\s*,\s*'\.\.'\s*,\s*'\.\.'\s*,\s*'([a-z_]+)'/g;

function checkAudience(dir, expectedTop) {
  const scriptDir = path.join(ROOT, 'scripts', dir);
  if (!fs.existsSync(scriptDir)) return;
  for (const f of fs.readdirSync(scriptDir).filter((n) => n.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(scriptDir, f), 'utf8');

    const tops = new Set();
    let m;
    while ((m = OUT_RE.exec(src)) !== null) tops.add(m[1]);
    OUT_RE.lastIndex = 0;

    for (const top of tops) {
      if (top !== expectedTop && top !== 'system_documents') {
        problems.push(`scripts/${dir}/${f} writes into ${top}/ — a ${dir.slice(0, -1)} script must write into ${expectedTop}/`);
      }
    }
    if (tops.size === 0) notes.push(`scripts/${dir}/${f}: no output path matched (module or helper?)`);

    if (/require\('\.\/icons_template'\)/.test(src)) {
      problems.push(`scripts/${dir}/${f} requires './icons_template' — should be '../icons_template'`);
    }
  }
}
checkAudience('clients', 'clients');
checkAudience('trainers', 'trainers');

// ---- 3. removed paths stay removed ---------------------------------------
const MUST_NOT_EXIST = [
  ['trainer_education', 'superseded by trainers/'],
  ['deliverables', 'abandoned 8/07 pipeline'],
  ['my-agent', 'duplicate engine, removed 8/20'],
  ['bls-expert-agent', 'orphaned package.json for my-agent, removed 8/20'],
  ['clients/august-olivia', 'duplicate of clients/august_olivia'],
  ['clients/johanna-castillo', 'duplicate of clients/johanna_castillo'],
  ['.github/workflows/generate-icons-docs.yml', 'broken CI, removed 8/20'],
];
for (const [p, why] of MUST_NOT_EXIST) {
  if (fs.existsSync(path.join(ROOT, p))) problems.push(`${p} is back — it was removed 8/20/2026 (${why})`);
}

// ---- 4. no generated documents outside the two trees ---------------------
function walk(dir, hits = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, hits);
    else if (e.name.endsWith('.docx')) hits.push(path.relative(ROOT, full));
  }
  return hits;
}
for (const d of walk(ROOT)) {
  const top = d.split(path.sep)[0];
  if (!['clients', 'trainers', 'system_documents'].includes(top)) {
    problems.push(`${d} is a .docx outside clients/, trainers/ and system_documents/`);
  }
}

// ---- report ---------------------------------------------------------------
const docs = walk(ROOT);
console.log(`Structure check — ${docs.length} documents, ` +
  `${fs.readdirSync(path.join(ROOT, 'scripts/clients')).length} client scripts, ` +
  `${fs.readdirSync(path.join(ROOT, 'scripts/trainers')).length} trainer scripts`);
for (const n of notes) console.log(`  note: ${n}`);
if (problems.length === 0) {
  console.log('PASS — client/trainer separation intact, no stale paths.');
  process.exit(0);
}
console.error(`\nFAIL — ${problems.length} problem(s):`);
for (const p of problems) console.error(`  - ${p}`);
process.exit(1);
