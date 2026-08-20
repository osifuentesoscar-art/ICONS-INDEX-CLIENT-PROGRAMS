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
  ['hinge', /deadlift|\bdl\b|rdl|romanian|good morning|swing|hamstring curl|clean|nordic|hinge/i],
  ['hipext', /hip thrust|glute bridge|kickback|abduction/i],
  ['push', /\bpress\b|ohp|arnold|\bdip\b|push-?up/i],   // knee/hinge are tested first, so "leg press" lands as knee
  ['pull', /row|pull-?up|chin-?up|pulldown|lat pull|face pull/i],
  ['carry', /carry|sled|farmer/i],
];

/** Blocks whose contents are outside the rule's scope entirely. */
const NON_COMPOUND_BLOCK =
  /CORRECTIVE|ACTIVATION|PRIMER|PRIMING|MOBILITY|WARM|ISOLATED|SCAPULAR|CONTROL & ALIGNMENT|CONTROL AND ALIGNMENT|COOL|CORE|STABILITY|REHAB|CONDITIONING|METABOLIC|POWER|FINISHER/i;

/** Never counts toward a run regardless of block: bodyweight/banded/isometric. */
// Named activation/isolation movements only. Do NOT filter on the word "band"
// alone — a "Standing Cable/Band Row" is a real loaded pull, and excluding it
// invents violations by deleting the very exercise that breaks a leg run.
const NOT_REAL_LOAD =
  /drill|dowel|pvc|wall slide|isometric|hold\)|dead ?bug|pallof|bird dog|march\b|clamshell|monster walk|lateral walk|abduction|kickback|scapular|dead hang|pull-?apart|superman|stretch|foam roll|breathing|activation|primer|rock\b|warm-?up|ramp/i;   // a ramp/warm-up set is preparatory, not a work set

/**
 * Single-joint isolation and bodyweight/low-load posterior work. The rule's
 * scope is "multi-joint, real-load exercises" — a machine hamstring curl, an
 * assisted Nordic curl, a bodyweight glute bridge and a bodyweight back
 * extension are none of those, and counting them turns a correctly-built
 * posterior-chain day into a wall of false findings.
 */
const ISOLATION =
  /hamstring curl|leg curl|leg extension|nordic|calf raise|bicep|tricep|lateral raise|\bfly\b|glute bridge|back extension|hyperextension|adduction/i;   // face pull deliberately NOT here: it is a real posterior-shoulder pull and does rotate stress

/** Grip / skill-progression batteries — one movement through difficulty. */
// Written either as "Assisted Pull-Up (Wide Grip)" or "Assisted Pull-Up — Wide
// Grip" across the roster; both spellings are the same exempt battery.
const SKILL_BATTERY =
  /[(—–-]\s*(wide|standard|close|neutral)[- ]?grip|(wide|standard|close|neutral)[- ]?grip\s+(assisted\s+)?(pull|chin)-?up|incline push-?up|half push-?up|knee push-?up/i;

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
    // Block header: "A — PRIMARY COMPOUND — BACK SQUAT". Scripts vary between
    // ALL CAPS and Title Case titles, so do NOT require uppercase here — doing
    // so silently fails to detect blocks in Title Case scripts, leaving every
    // corrective and priming block wrongly in scope.
    const bh = text.match(/^([A-Z])\s*[—–-]\s*(\S.*)$/);
    if (bh && text.length < 110) {
      blockOk = !NON_COMPOUND_BLOCK.test(bh[2]);
      continue;
    }
    if (!cur || !blockOk) continue;
    // An exercise NAME is 9pt bold per the brand spec (docx size = pt x 2, so
    // w:sz 18) while cue text is 8.5pt regular and insight lines are italic.
    // Matching on formatting rather than on the shape of the string is what
    // keeps coaching cues — which contain movement words too — from being read
    // as extra exercises and inventing runs that do not exist.
    if (!/<w:b\s*\/>/.test(c) || !/w:sz w:val="18"/.test(c)) continue;
    if (NOT_AN_EXERCISE.test(text)) continue;
    if (text.includes(' / ')) continue;
    if (NOT_REAL_LOAD.test(text) || SKILL_BATTERY.test(text) || ISOLATION.test(text)) continue;
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
      // Carries sit on none of the rule's rotation axes (push<->pull,
      // hip<->knee, upper<->lower) and a carry medley — farmer, suitcase, sled
      // — varies implement, grip and vector deliberately. Not this rule's
      // target, which is accumulated compression from heavy compound lifting.
      if (w[0].pat === 'carry') continue;
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
