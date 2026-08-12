/**
 * Johnna Macarthur — At-Home Warm-Up Routine
 * Brace Life Studios
 *
 * Built per Xolokan's direct request: a standalone, consolidated warm-up
 * routine covering the 90/90 hip activation drill (with the hip-extension
 * component made explicit), banded tibialis strengthening, and both
 * directions of banded rotator-cuff work — to run before ANY of her 3
 * training days, not a replacement for scripts/johnna_macarthur_3day_plan.js.
 *
 * SETTING — AT-HOME, SELF-GUIDED (clarified by Xolokan after first draft):
 * this is NOT a studio pre-session protocol run under a trainer's eye —
 * Johnna runs this alone at home before heading to any of her 3 training
 * days. That changes three things from a studio-context document:
 *   1. Equipment stays band-only/home-realistic — where an anchor point is
 *      needed (tibia pull, both shoulder rotations), the instruction calls
 *      for a door anchor or sturdy furniture leg, not gym equipment.
 *   2. Cues are written as self-directed/self-check language (mirror check,
 *      phone-clip check) rather than trainer-to-client verbal cueing — she
 *      has no one watching in real time to catch a form fault.
 *   3. The frozen-shoulder/pain stop-signal language is framed as something
 *      she must actively self-monitor for — MORE important, not less,
 *      without a trainer present to catch a pain response early — not
 *      presented as routine boilerplate.
 *
 * All 4 movements are already-established corrective priorities in her main
 * plan (see that script's header comment and CLIENTS.md entry) except where
 * noted below:
 *   - 90/90 Hip Switch: already programmed (Days 1 & 3 warm-up + Day 1
 *     Block A). This version makes the hip-EXTENSION phase explicit — her
 *     existing version stops at the seated rotation; this adds the drive-
 *     into-tall-half-kneeling extension component per the research below,
 *     which is what actually links the drill to glute/posterior-chain
 *     activation, not just hip rotation mobility.
 *   - Banded Dorsiflexion Pull: already in her main plan (Day 1 Block C, at
 *     2x15) — NOT a brand-new exercise, corrected from an earlier draft of
 *     this comment that claimed it wasn't tabled there. Re-dosed to 3x20-25
 *     here per the research below (standard shin-splint-prevention dosing)
 *     and per Xolokan's explicit "tibia strengthening with band" request.
 *   - Band Internal Rotation (Elbow at Side): sets/reps/load/tempo/rest are
 *     identical to her Day 2 Block A. The flag/cue text is NOT verbatim —
 *     both were rewritten for the at-home/no-trainer context (anchor
 *     instructions, mirror self-check, explicit "no trainer here to catch
 *     this" framing) per the mid-build at-home correction below.
 *   - Band External Rotation (Elbow at Side): a genuine ADDITION, not in
 *     her main plan. "Rotator shoulder drills" (plural) plus the research
 *     below — external rotation targets infraspinatus/teres minor, the
 *     more commonly weak/injured rotator cuff muscles, and is a standard
 *     complement to internal rotation in real frozen-shoulder rehab
 *     protocols (banded strengthening across flexion/abduction/IR/ER is
 *     evidence-based across all stages of adhesive capsulitis, including
 *     post-op). Uses the identical frozen-shoulder stop-signal framing
 *     already established for her IR work — an addition, not a
 *     replacement.
 *
 * Composed directly from icons_template.js's exported primitives rather
 * than buildDocument() — same reasoning as scripts/icons_baseline_sheets.js:
 * this is single-client, single-purpose reference content (one exercise
 * table, no days/blocks/baselines/Styku schema), so buildDocument()'s full
 * training-plan shape doesn't fit. Reuses the exact branded page chrome
 * (buildHeader/buildFooter, page setup constants) and content primitives
 * (coverHeader/clientStats/sectionTitle/exTable/labeledPara callouts)
 * instead of hand-rolling any of it.
 *
 * Not subject to the Antagonist Rotation Rule (CLAUDE.md) — that rule
 * governs Compound-zone training blocks; this is Isolated-zone/corrective
 * warm-up content, the same exemption already applied to Johnna's own
 * corrective blocks (Day 1 Block A, Day 1/3 Block C, Day 2 Block A) in her
 * main plan.
 *
 * Scope discipline: does NOT touch scripts/johnna_macarthur_3day_plan.js or
 * its output — additive only.
 */

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
} = require('docx');
const {
  C, PAGE_W, PAGE_H, MARGIN,
  buildHeader, buildFooter,
  coverHeader, clientStats, sectionTitle,
  exTable,
  goldCallout, redCallout, tealCallout,
} = require('./icons_template');

// ── helpers local to this script (matches icons_baseline_sheets.js) ────
function spacer(size = 100) {
  return new Paragraph({ text: '', spacing: { after: size } });
}

function para(runs, opts = {}) {
  return new Paragraph({ children: runs, ...opts });
}

function txt(text, opts = {}) {
  return new TextRun({ text, font: 'Arial', ...opts });
}

const CLIENT_NAME = 'Johnna Macarthur';
const PROGRAM_TITLE = 'At-Home Warm-Up Routine';
const SUBTITLE = 'Hip Activation · Tibialis Strength · Shoulder Care — Self-Guided';

const FROZEN_SHOULDER_FLAG = 'Frozen shoulder history — self-monitor closely: sharp or pinching pain is a stop signal, clearly distinct from normal training fatigue. No trainer is present to catch this in real time — that responsibility is yours here.';

const exercises = [
  {
    name: '90/90 Hip Switch w/ Hip Extension (Rock & Reach)',
    sets: '2',
    reps: '5/side',
    load: 'bodyweight',
    tempo: 'controlled',
    rest: '30s',
    cue: 'Rotate through full range, then drive your hips forward and up into tall half-kneeling — you should feel the back-leg glute squeeze at the top. Chest tall throughout. If a mirror or your phone camera is handy, a quick side-view check helps confirm you\'re not forcing end-range.',
  },
  {
    name: 'Banded Dorsiflexion Pull',
    sets: '3',
    reps: '20–25',
    load: 'light band',
    tempo: 'controlled + 1s hold',
    rest: '30s',
    cue: 'Seated, loop the band around your forefoot and anchor it to a door anchor or sturdy furniture leg in front of you. Self-check: your knee should stay completely still — only the ankle moves. If you can\'t tell whether it\'s drifting, film a quick clip on your phone; if the knee bends to help pull, the band is too heavy. Pull toes to shin, hold 1s, release slowly.',
  },
  {
    name: 'Band Internal Rotation (Elbow at Side)',
    sets: '3',
    reps: '12/side',
    load: 'light band',
    tempo: '2-1-2',
    rest: '45s',
    flag: FROZEN_SHOULDER_FLAG,
    cue: 'Anchor the band to a door anchor or sturdy furniture leg at elbow height. Elbow pinned to your ribs — check in a mirror if available. Rotate within pain-free range only; stop the moment you feel sharp or pinching, not just fatigue.',
  },
  {
    name: 'Band External Rotation (Elbow at Side)',
    sets: '3',
    reps: '12/side',
    load: 'light band',
    tempo: '2-1-2',
    rest: '45s',
    flag: FROZEN_SHOULDER_FLAG,
    cue: 'Same anchor setup as internal rotation (door anchor or sturdy furniture leg, elbow height). Elbow stays pinned to your ribs, rotate the forearm outward within pain-free range only, return slow. Stop at the first sign of sharp or pinching sensation.',
  },
];

async function buildWarmupProtocol() {
  const children = [];

  // Cover
  children.push(...coverHeader(CLIENT_NAME, PROGRAM_TITLE, SUBTITLE));
  children.push(...clientStats([
    'Self-Guided — At Home, No Trainer Present',
    'Run Before Any of Her 3 Training Days',
    '4 Movements · ~8–10 Minutes',
  ]));

  children.push(...goldCallout(
    'About This Routine',
    'This consolidates three standing corrective priorities from Johnna\'s program — hip activation, tibialis anterior strengthening, and shoulder care — into a single repeatable sequence she runs on her own at home before Day 1, Day 2, or Day 3 of her main training plan (Johnna_Macarthur_3Day_Training_Plan.docx). It is not a replacement for that plan\'s own warm-ups or corrective blocks, which stay exactly as programmed; this is the at-home version she can run consistently before heading in, regardless of which day is up next. All equipment is band-only and home-appropriate — a resistance band and a door anchor or sturdy furniture leg cover every movement below.'
  ));

  children.push(sectionTitle('Warm-Up Sequence — Self-Guided, Run Before Any Training Day', C.red));
  children.push(para(
    [txt('"Control precedes power." Work through hip mobility and activation first, then tibialis strengthening, then shoulder care — establishing pain-free range and neural control here directly supports the loaded squat, deadlift, hinge, and press patterns programmed later in each training day. All four movements are light, controlled, and deliberately sub-maximal; this is preparation, not the workout itself. Because Johnna is doing this alone, each cue below includes a self-check (mirror, phone-camera clip, or a simple internal check) rather than relying on a trainer\'s eye to catch a form fault in real time.', { size: 17, color: C.dark })],
    { spacing: { after: 120 } }
  ));

  children.push(...exTable(exercises, 'red'));

  children.push(...redCallout(
    'Frozen Shoulder — Self-Monitor the Stop Signal',
    'Johnna runs this routine alone at home, without a trainer present to catch a form or pain issue in real time — that makes self-monitoring essential, not optional. Both banded rotation drills are active strengthening within her current pain-free range — never forced end-range. Sharp or pinching pain is a hard stop signal, clearly distinct from normal training fatigue: stop the set immediately if it occurs, and flag your coach before her next studio session. Normal training fatigue is expected and fine — pain is not, and there is no one else here to notice it for her.'
  ));

  children.push(...tealCallout(
    'Research Basis',
    '90/90 Hip Switch w/ Extension: Rehab Hero\'s 90/90 Hip Switch exercise library entry and the Institute of Motion\'s Seated 90/90 Hip Switches w/ Hip Extension — the extension phase links hip rotational mobility directly to glute/posterior-chain activation, supporting squat, lunge, and deadlift mechanics. Banded Dorsiflexion Pull: Bodybuilding Wizard\'s Resistance Band Tibialis Raise protocol and the Foot & Ankle Institute\'s Home Training Program for Tibialis Anterior Tendinitis — standard rehab/prevention dosing of 3×20–25 reps, progressing band resistance over time, builds ankle-dorsiflexion control and reduces shin-splint risk. Band Internal/External Rotation: Rehab Hero\'s Banded Shoulder External Rotation entry, OrthoInfo/AAOS\'s Rotator Cuff and Shoulder Conditioning Program, and a PMC-indexed RCT on neuromuscular exercise for pain and active ROM in idiopathic frozen shoulder — banded strengthening across multiple directions, including both internal and external rotation, is evidence-based across all stages of adhesive capsulitis, including post-op.'
  ));

  // Closing brand line
  children.push(spacer(160));
  children.push(para([txt('BRACE LIFE STUDIOS  ·  ICONS INDEX  ·  bracelifestudios.com', { bold: true, size: 18, color: C.gold })], {
    alignment: AlignmentType.CENTER, spacing: { after: 40 },
  }));
  children.push(para([txt('Prepared exclusively for Johnna Macarthur. Confidential — for client and trainer use.', { italics: true, size: 16, color: C.mid })], {
    alignment: AlignmentType.CENTER,
  }));

  const footerRight = 'At-Home Warm-Up Routine  |  Confidential';

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: PAGE_H },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        headers: { default: buildHeader(CLIENT_NAME, SUBTITLE) },
        footers: { default: buildFooter(CLIENT_NAME, footerRight) },
        children,
      },
    ],
    styles: {
      default: {
        document: { run: { font: 'Arial', size: 17, color: C.dark } },
      },
    },
  });

  return Packer.toBuffer(doc);
}

async function main() {
  const buf = await buildWarmupProtocol();
  const outPath = require('path').join(__dirname, '..', 'clients', 'johnna_macarthur', 'Johnna_Macarthur_Warmup_Protocol.docx');
  require('fs').mkdirSync(require('path').dirname(outPath), { recursive: true });
  require('fs').writeFileSync(outPath, buf);
  console.log('Wrote', outPath, `(${buf.length} bytes)`);
}

if (require.main === module) {
  main().catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { buildWarmupProtocol, exercises };
