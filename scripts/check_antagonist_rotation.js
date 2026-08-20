/**
 * Antagonist Rotation walker
 * Brace Life Studios — node scripts/check_antagonist_rotation.js <file.docx> [...]
 *
 * CLAUDE.md's Antagonist Rotation Rule must be walked on the FULL RENDERED DAY,
 * across block boundaries — checking each block in isolation misses violations
 * that span A→B, which is the defect the Nicolette Scott batch-2 finding
 * exposed. Inline comments in a build script claiming compliance are not
 * evidence; this reads the generated .docx and walks the day in performance
 * order.
 *
 * SCOPE, per the rule's own carve-outs in CLAUDE.md — getting these wrong makes
 * the check worse than useless, because it flags sound programs and invites
 * "fixes" that damage them:
 *   - Compound-zone blocks ONLY: "multi-joint, real-load exercises". Corrective,
 *     activation, primer, isolated-zone and mobility blocks are explicitly NOT
 *     bound the same way — concentrated repetition is often the block's purpose
 *     (a hip-activation circuit is the example CLAUDE.md itself gives).
 *   - Bodyweight/banded/isometric activation work never counts toward a run.
 *   - Grip and skill-progression batteries are exempt: the close/standard/wide
 *     assisted pull-up battery, incline→full push-up regressions. One movement
 *     progressing through difficulty is not three heavy compounds stacked.
 *   - Two same-pattern lifts back to back is fine. Only the third is a finding.
 *
 * Two rules are checked:
 *   1. Three consecutive exercises sharing one primary pattern.
 *   2. Three consecutive LOADED LOWER-BODY compounds even when the pattern
 *      alternates knee/hinge — CLAUDE.md's own worked example, "Squat → RDL →
 *      Split Squat all load the same quad/hip-hinge chain under compression
 *      three times running", which rule 1 alone cannot see.
 */

const fs = require('fs');
const { execSync } = require('child_process');

const PATTERNS = [
  ['knee', /back squat|front squat|goblet squat|box squat|belt squat|split squat|lunge|step-?up|leg press|leg extension/i],
  ['hinge', /deadlift|rdl|romanian|good morning|swing|hamstring curl|clean|nordic/i],
  ['hipext', /hip thrust|glute bridge|kickback|abduction/i],
  ['push', /bench press|overhead press|ohp|push press|arnold|shoulder press|dip|landmine press|chest press|push-?up|floor press/i],
  ['pull', /row|pull-?up|chin-?up|pulldown|lat pull/i],
  ['carry', /carry|sled|farmer/i],
];

/** Blocks whose contents are outside the rule's scope entirely. */
const NON_COMPOUND_BLOCK =
  /CORRECTIVE|ACTIVATION|PRIMER|PRIMING|MOBILITY|WARM|ISOLATED|SCAPULAR|CONTROL & ALIGNMENT|CONTROL AND ALIGNMENT|COOL|CORE|STABILITY|REHAB|CONDITIONING|METABOLIC|POWER/i;

/** Never counts toward a run regardless of block: bodyweight/banded/isometric. */
// Named activation/isolation movements only. Do NOT filter on the word "band"
// alone — a "Standing Cable/Band Row" is a real loaded pull, and excluding it
// invents violations by deleting the very exercise that breaks a leg run.
const NOT_REAL_LOAD =
  /drill|dowel|pvc|wall slide|isometric|hold\)|dead ?bug|pallof|bird dog|march\b|clamshell|monster walk|lateral walk|abduction|kickback|scapular|dead hang|pull-?apart|superman|stretch|foam roll|breathing|activation|primer|rock\b/i;

/** Grip / skill-progression batteries — one movement through difficulty. */
const SKILL_BATTERY =
  /\((wide|standard|close)[- ]?grip\)|(wide|standard|close)[- ]?grip\s+(assisted\s+)?(pull|chin)-?up|incline push-?up|half push-?up|knee push-?up/i;

/** Rendered artifacts that are headings or summary cells, not exercises. */
const NOT_AN_EXERCISE = /\+|Baseline Establishment|Primary Strength|Technique Day|^Day\b|From Block [A-Z]/i;

function classify(name) {
  for (const [p, re] of PATTERNS) if (re.test(name)) return p;
  return 'other';
}

function extract(docx) {
  const xml = execSync(`unzip -p "${docx}" word/document.xml`, { maxBuffer: 1 << 28 }).toString();
  const days = [];
  let cur = null;
  let blockOk = true; // is the current block in scope?
  for (const c of xml.split(/<\/w:p>/)) {
    const text = c.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    if (!text) continue;

    if (/^DAY\s+[A-Z0-9]/i.test(text) && text.length < 90) {
      // A baseline-testing or retest day runs the ICONS Baseline Testing
      // Protocol's own 11-movement order. That order is prescribed by the
      // protocol, not chosen by whoever built the program, so it is outside
      // this rule the same way a grip battery is.
      const testing = /BASELINE TESTING|RETEST|RE-?TEST|BASE TEST/i.test(text);
      cur = testing ? null : { day: text, ex: [] };
      if (cur) days.push(cur);
      blockOk = true;
      continue;
    }
    // block header: "A — PRIMARY COMPOUND — BACK SQUAT"
    const bh = text.match(/^([A-Z])\s*[—-]\s*(.+)$/);
    if (bh && text.length < 110 && text === text.toUpperCase()) {
      blockOk = !NON_COMPOUND_BLOCK.test(bh[2]);
      continue;
    }
    if (!cur || !blockOk) continue;
    if (NOT_AN_EXERCISE.test(text)) continue;
    if (!/^[A-Z][A-Za-z0-9'’\-() ,&]{3,60}$/.test(text)) continue;
    if (NOT_REAL_LOAD.test(text) || SKILL_BATTERY.test(text)) continue;
    const pat = classify(text);
    if (pat !== 'other') cur.ex.push({ name: text, pat });
  }
  return days;
}

const LOWER = new Set(['knee', 'hinge', 'hipext']);
let bad = 0;
const verbose = process.argv.includes('-v');
for (const f of process.argv.slice(2).filter((a) => a !== '-v')) {
  if (!fs.existsSync(f)) { console.error('missing', f); process.exit(2); }
  const hits = [];
  const days = extract(f);
  for (const d of days) {
    const s = d.ex;
    for (let i = 0; i + 2 < s.length; i++) {
      const w = [s[i], s[i + 1], s[i + 2]];
      if (w[0].pat === w[1].pat && w[1].pat === w[2].pat) {
        hits.push(`${d.day}: THREE ${w[0].pat.toUpperCase()} IN A ROW — ${w.map((e) => e.name).join(' → ')}`);
      } else if (w.every((e) => LOWER.has(e.pat))) {
        hits.push(`${d.day}: THREE LOADED LEG LIFTS — ${w.map((e) => `${e.name} [${e.pat}]`).join(' → ')}`);
      }
    }
  }
  bad += hits.length;
  console.log(`\n═══ ${f.split('/').pop()}${hits.length ? '' : '   ✓ clean'}`);
  if (verbose) for (const d of days) console.log(`   ${d.day}\n      ${d.ex.map((e) => `${e.name} [${e.pat}]`).join(' → ') || '(none in scope)'}`);
  for (const h of hits) console.log(`   ⚠ ${h}`);
}
console.log(bad === 0 ? '\nPASS — no violations in Compound-zone scope.' : `\nFAIL — ${bad} violation(s).`);
process.exit(bad === 0 ? 0 : 1);
