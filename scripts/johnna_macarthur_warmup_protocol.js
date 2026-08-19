/**
 * Johnna Macarthur — At-Home Warm-Up Routine
 * Brace Life Studios
 *
 * REVISION (8/12/2026) — per Xolokan's direct request: "add more blocks to
 * her warmup & improve it & clean it up look for mistakes." This is an
 * expansion + accuracy pass on an already-delivered document, not a new
 * build. Original (single flat 4-exercise table, no block structure) is
 * preserved in git history.
 *
 * WHAT CHANGED — STRUCTURE:
 * The flat table is now four labeled, sequenced blocks (A-D), matching how
 * every other document in this system organizes training content
 * (sectionTitle + intro + exTable per block):
 *   A — Raise (NEW): light, general, no-equipment movement to raise heart
 *       rate/body temperature BEFORE any targeted corrective work. This was
 *       a genuine structural gap in the original document — it jumped
 *       straight into targeted corrective drills with zero general warm-up
 *       phase, which is not how a warm-up should be sequenced. Grounded in
 *       the RAMP framework (Raise-Activate-Mobilize-Potentiate) — see
 *       Research Basis below. Only Raise + Activate/Mobilize apply here;
 *       RAMP's 4th phase (Potentiate — explosive/max-effort sport priming)
 *       is deliberately excluded. This is a 54-year-old client's corrective
 *       home warm-up before strength training, not sprint/jump prep.
 *   B — Hip Activation & 90/90 Mobility: the original 90/90 Hip Switch,
 *       unchanged, PLUS Banded Lateral Walk and Glute Bridge — both pulled
 *       directly from scripts/johnna_macarthur_3day_plan.js's own Day 1 and
 *       Day 3 warm-up lines ("banded lateral walk x10/side, glute bridge
 *       x10"), reused here for consistency with movements she already
 *       knows rather than inventing new ones.
 *   C — Tibialis & Ankle Prep: the original Banded Dorsiflexion Pull,
 *       unchanged. Considered adding a light complementary ankle movement
 *       (e.g. ankle circles) and deliberately did NOT — the dorsiflexion
 *       pull already directly trains the tibialis anterior/ankle-
 *       dorsiflexion pattern this block exists for, and a generic
 *       joint-circles addition would be padding, not a genuine improvement,
 *       especially with the new Raise block already adding time. Judgment
 *       call, not an oversight.
 *   D — Shoulder Care & Rotator Cuff: the original Band Internal Rotation
 *       and Band External Rotation, unchanged (including the frozen-
 *       shoulder flag text verbatim), PLUS Scapular Wall Slide — reused
 *       directly from her main plan's Day 2 Block A (identical sets/reps/
 *       load/tempo/rest/cue). Real rotator-cuff strengthening protocols
 *       (see Research Basis — the same OrthoInfo/AAOS program already cited
 *       for the rotation work) commonly pair rotational strengthening with
 *       scapular stability work, so this is a grounded addition, not scope
 *       creep — and it costs nothing new for Johnna to learn since it's
 *       already programmed elsewhere in her week.
 *
 * WHAT CHANGED — ACCURACY / "LOOK FOR MISTAKES" PASS:
 *   1. Time estimate was wrong and has been recalculated honestly, TWICE —
 *      an independent audit caught that the first recalculation (16-20 min)
 *      still undershot the real math. The original "~8-10 Minutes" was a
 *      flat guess with no basis. The corrected figure applies this exact
 *      document's own tempo notation consistently (e.g. "2-1-2" = 2s+1s+2s
 *      = 5s/rep — the same convention this system uses on every client
 *      training-plan tempo field) to every exercise's actual rep count,
 *      plus its programmed rest between sets, summed across all 10
 *      movements: the ORIGINAL 4 exercises alone total roughly 20-24
 *      minutes at this pace (dominated by the two 3-set/24-rep rotation
 *      exercises in Block D, ~15-16 min of that on their own — unchanged
 *      carryovers from the prior version, not new content), and the fully
 *      expanded 4-block/10-movement version totals roughly 25-30 minutes.
 *      Stats line updated to "4 Blocks · 10 Movements · ~25-30 Minutes."
 *   2. "Three standing corrective priorities" vs "4 Movements" framing was
 *      unclear even before this revision, and would have been more
 *      confusing once a 4th, non-corrective block (Raise) was added. The
 *      "About This Routine" callout now explicitly separates the new Raise
 *      phase (general warm-up, not a corrective priority) from the three
 *      standing corrective priorities that follow it, and states the block
 *      count plainly.
 *   3. Every value (sets/reps/load/tempo/rest/cue/flag) on the original 4
 *      exercises was re-verified against the prior version and carried
 *      forward with ZERO changes — confirmed via direct comparison before
 *      writing this file. Where load/dosing values in this document overlap
 *      with the main plan (Banded Lateral Walk, Glute Bridge, Scapular Wall
 *      Slide), those were copied from the main plan's own established
 *      dosing, not invented.
 *   4. Repositioned the "Frozen Shoulder — Self-Monitor the Stop Signal"
 *      redCallout to sit immediately after Block D (the shoulder block)
 *      instead of after all four blocks — it only concerns the two rotation
 *      exercises, and reading it right after them (rather than after two
 *      unrelated blocks in between) is clearer. No wording changed, only
 *      position.
 *   5. Subtitle updated from "Hip Activation · Tibialis Strength ·
 *      Shoulder Care — Self-Guided" to "Raise · Hip Activation · Tibialis
 *      Strength · Shoulder Care — Self-Guided" so the running header/cover
 *      subtitle reflects the new Raise phase instead of silently omitting it.
 *
 * SETTING — AT-HOME, SELF-GUIDED (unchanged from original build): band/
 * bodyweight-only equipment throughout (new Block A movements need zero
 * equipment — marching/step-ups, arm circles, cat-cow); self-directed/
 * self-check cue language (mirror, phone-clip checks) preserved and
 * extended to the new movements; frozen-shoulder stop-signal language kept
 * fully intact and still framed as MORE important without a trainer present.
 *
 * Composed directly from icons_template.js's exported primitives rather
 * than buildDocument() — same reasoning as the original build and as
 * scripts/icons_baseline_sheets.js: single-client, single-purpose reference
 * content that doesn't fit buildDocument()'s days/blocks/baselines schema.
 *
 * Not subject to the Antagonist Rotation Rule (CLAUDE.md) — Isolated-zone/
 * corrective warm-up content, not a Compound-zone training block.
 *
 * Scope discipline: does NOT touch scripts/johnna_macarthur_3day_plan.js or
 * its output — additive/revision-only to this standalone document.
 */

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
} = require('docx');
const {
  C, PAGE_W, PAGE_H, MARGIN,
  buildHeader, buildFooter,
  coverHeader, clientStats, sectionTitle, labeledPara,
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
const SUBTITLE = 'Raise · Hip Activation · Tibialis Strength · Shoulder Care — Self-Guided';

const FROZEN_SHOULDER_FLAG = 'Frozen shoulder history — self-monitor closely: sharp or pinching pain is a stop signal, clearly distinct from normal training fatigue. No trainer is present to catch this in real time — that responsibility is yours here.';

// ── Block A — Raise (NEW) ───────────────────────────────────────────────
const blockA_raise = [
  {
    name: 'Marching in Place (or Stair Step-Ups)',
    sets: '1',
    reps: '60 sec',
    load: 'bodyweight',
    tempo: 'steady, easy pace',
    rest: '0s',
    cue: 'Light and easy — just enough to raise your heart rate and body temperature. Use a staircase step if you have one, or march tall in place.',
  },
  {
    name: 'Arm Circles (Forward & Backward)',
    sets: '1',
    reps: '10/direction',
    load: 'bodyweight',
    tempo: 'controlled',
    rest: '0s',
    cue: 'Arms out to shoulder height, small controlled circles growing slightly larger each rep. Forward 10, then reverse 10.',
  },
  {
    name: 'Cat-Cow',
    sets: '1',
    reps: '8',
    load: 'bodyweight',
    tempo: 'slow, controlled',
    rest: '0s',
    cue: 'Hands and knees, alternate a full spinal arch and round. Move with your breath — inhale to arch, exhale to round.',
  },
];

// ── Block B — Hip Activation & 90/90 Mobility ───────────────────────────
const blockB_hip = [
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
    name: 'Banded Lateral Walk',
    sets: '1',
    reps: '10/side',
    load: 'mini band (above knees)',
    tempo: 'controlled',
    rest: '20s',
    cue: 'Band above your knees, soft bend in hips and knees, step sideways without letting the band pull your knees inward. Same movement from her main plan\'s Day 1 and Day 3 warm-ups.',
  },
  {
    name: 'Glute Bridge',
    sets: '1',
    reps: '10',
    load: 'bodyweight',
    tempo: '2-1-2',
    rest: '20s',
    cue: 'Feet hip-width, drive through your heels, squeeze glutes at the top. Same movement from her main plan\'s Day 1 and Day 3 warm-ups.',
  },
];

// ── Block C — Tibialis & Ankle Prep ─────────────────────────────────────
const blockC_tibialis = [
  {
    name: 'Banded Dorsiflexion Pull',
    sets: '3',
    reps: '20–25',
    load: 'light band',
    tempo: 'controlled + 1s hold',
    rest: '30s',
    cue: 'Seated, loop the band around your forefoot and anchor it to a door anchor or sturdy furniture leg in front of you. Self-check: your knee should stay completely still — only the ankle moves. If you can\'t tell whether it\'s drifting, film a quick clip on your phone; if the knee bends to help pull, the band is too heavy. Pull toes to shin, hold 1s, release slowly.',
  },
];

// ── Block D — Shoulder Care & Rotator Cuff ──────────────────────────────
const blockD_shoulder = [
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
  {
    name: 'Scapular Wall Slide',
    sets: '2',
    reps: '10',
    load: 'bodyweight',
    tempo: 'controlled',
    rest: '30s',
    cue: 'Ribs down, slide within comfortable range, low back flat. Same movement from her main plan\'s Day 2 warm-up and Block A.',
  },
];

async function buildWarmupProtocol() {
  const children = [];

  // Cover
  children.push(...coverHeader(CLIENT_NAME, PROGRAM_TITLE, SUBTITLE));
  children.push(...clientStats([
    'Self-Guided — At Home, No Trainer Present',
    'Run Before Any of Her 3 Training Days',
    '4 Blocks · 10 Movements · ~25–30 Minutes',
  ]));

  children.push(...goldCallout(
    'About This Routine',
    'This routine opens with a brief Raise phase — light, general movement that raises heart rate and body temperature — before moving through Johnna\'s three standing corrective priorities from her program: hip activation, tibialis anterior strengthening, and shoulder care. Organized into four labeled blocks (A–D) she runs on her own at home before Day 1, Day 2, or Day 3 of her main training plan (Johnna_Macarthur_3Day_Training_Plan.docx). It is not a replacement for that plan\'s own warm-ups or corrective blocks, which stay exactly as programmed; this is the at-home version she can run consistently before heading in, regardless of which day is up next. All equipment is band-only and home-appropriate — a resistance band and a door anchor or sturdy furniture leg cover every movement that needs one; the Raise block needs nothing at all.'
  ));

  children.push(sectionTitle('Warm-Up Sequence — Self-Guided, Run Before Any Training Day', C.red));
  children.push(para(
    [txt('"Control precedes power." Raise your heart rate and body temperature first, then work through hip mobility and activation, then tibialis strengthening, then shoulder care — establishing pain-free range and neural control here directly supports the loaded squat, deadlift, hinge, and press patterns programmed later in each training day. Every movement below is light, controlled, and deliberately sub-maximal; this is preparation, not the workout itself. Because Johnna is doing this alone, each cue includes a self-check (mirror, phone-camera clip, or a simple internal check) rather than relying on a trainer\'s eye to catch a form fault in real time.', { size: 17, color: C.dark })],
    { spacing: { after: 120 } }
  ));

  // ── Block A ────────────────────────────────────────────────────────
  children.push(sectionTitle('Block A — Raise', C.teal));
  children.push(...labeledPara(
    'Why',
    'A well-built warm-up starts with a brief general Raise phase before any targeted work — light movement that lifts heart rate and body temperature so the corrective and strengthening blocks that follow are working muscles and joints that are actually ready. This phase was missing from the original routine, which jumped straight into targeted corrective drills with no general warm-up first. Keep this brief and genuinely light — this is not corrective work.',
    C.teal
  ));
  children.push(...exTable(blockA_raise, 'teal'));

  // ── Block B ────────────────────────────────────────────────────────
  children.push(sectionTitle('Block B — Hip Activation & 90/90 Mobility', C.red));
  children.push(...labeledPara(
    'Why',
    'Hip activation is a standing programming priority for Johnna, not a warm-up formality — glute and hip-abductor strength carries directly into every squat, deadlift, hinge, and lunge pattern in her main plan. The 90/90 drill opens hip internal/external rotation and doubles as glute activation prep. Banded Lateral Walk and Glute Bridge are pulled directly from her main plan\'s own Day 1 and Day 3 warm-ups — reused here for consistency with movements she already knows, not introduced as anything new.',
    C.red
  ));
  children.push(...exTable(blockB_hip, 'red'));

  // ── Block C ────────────────────────────────────────────────────────
  children.push(sectionTitle('Block C — Tibialis & Ankle Prep', C.gold));
  children.push(...labeledPara(
    'Why',
    'Tibialis anterior strengthening builds the ankle-dorsiflexion control that supports her squat and lunge mechanics later in the week. One high-rep, controlled movement done well is what this block needs — nothing else has been added here.',
    C.gold
  ));
  children.push(...exTable(blockC_tibialis, 'gold'));

  // ── Block D ────────────────────────────────────────────────────────
  children.push(sectionTitle('Block D — Shoulder Care & Rotator Cuff', C.red));
  children.push(...labeledPara(
    'Why',
    'Dedicated strengthening for Johnna\'s frozen shoulder (adhesive capsulitis) history. Both banded rotation directions work the rotator cuff within her current pain-free range — this is active strengthening, not restriction. Scapular Wall Slide closes the block: real rotator-cuff strengthening protocols commonly pair rotational work with scapular stability (see Research Basis below), and this is the same movement already established in her main plan\'s Day 2 warm-up and Block A.',
    C.red
  ));
  children.push(...exTable(blockD_shoulder, 'red'));

  children.push(...redCallout(
    'Frozen Shoulder — Self-Monitor the Stop Signal',
    'Johnna runs this routine alone at home, without a trainer present to catch a form or pain issue in real time — that makes self-monitoring essential, not optional. Both banded rotation drills are active strengthening within her current pain-free range — never forced end-range. Sharp or pinching pain is a hard stop signal, clearly distinct from normal training fatigue: stop the set immediately if it occurs, and flag your coach before her next studio session. Normal training fatigue is expected and fine — pain is not, and there is no one else here to notice it for her.'
  ));

  children.push(...tealCallout(
    'Research Basis',
    'Raise (Block A): the RAMP warm-up framework (Raise-Activate-Mobilize-Potentiate) is a well-established, evidence-based structure — recent 2025 RCTs in soccer and police-academy populations confirm RAMP outperforms traditional static-stretch warm-ups for readiness, with no evidence a longer warm-up performs better than a well-structured 5–10 minute one. Only Raise and Activate/Mobilize apply here; RAMP\'s explosive/max-effort Potentiate phase is deliberately excluded — this is a corrective home warm-up before strength training, not sprint/jump prep. 90/90 Hip Switch w/ Extension: Rehab Hero\'s 90/90 Hip Switch exercise library entry and the Institute of Motion\'s Seated 90/90 Hip Switches w/ Hip Extension — the extension phase links hip rotational mobility directly to glute/posterior-chain activation, supporting squat, lunge, and deadlift mechanics. Banded Lateral Walk and Glute Bridge (Block B) are not new research additions — both are already-established movements from Johnna\'s own main training plan\'s Day 1 and Day 3 warm-ups, reused here for consistency rather than introducing anything unfamiliar. Banded Dorsiflexion Pull: Bodybuilding Wizard\'s Resistance Band Tibialis Raise protocol and the Foot & Ankle Institute\'s Home Training Program for Tibialis Anterior Tendinitis — standard rehab/prevention dosing of 3×20–25 reps, progressing band resistance over time, builds ankle-dorsiflexion control and reduces shin-splint risk. Band Internal/External Rotation and Scapular Wall Slide: Rehab Hero\'s Banded Shoulder External Rotation entry, OrthoInfo/AAOS\'s Rotator Cuff and Shoulder Conditioning Program — which pairs rotational strengthening with scapular stabilization work, the basis for adding Scapular Wall Slide here — and a PMC-indexed RCT on neuromuscular exercise for pain and active ROM in idiopathic frozen shoulder. Banded strengthening across multiple directions, including both internal and external rotation, is evidence-based across all stages of adhesive capsulitis, including post-op.'
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

module.exports = {
  buildWarmupProtocol, blockA_raise, blockB_hip, blockC_tibialis, blockD_shoulder,
};
