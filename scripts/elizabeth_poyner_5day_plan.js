/**
 * Elizabeth Poyner — ICONS 5-Day Training Plan
 * Brace Life Studios
 *
 * FIRST BUILD SCRIPT for this client. Prior to this build, her main training
 * plan (`clients/elizabeth_poyner/Elizabeth_Poyner_5Day_Training_Plan.docx`)
 * was the one active client document maintained as a direct hand-edit — no
 * `buildDocument()` script existed, unlike her companion Brace Life
 * Improvement Report (`scripts/elizabeth_poyner_improvement_doc.js`). This
 * migrates her onto the engine, triggered by a same-day `icons-intake-monitor`
 * finding: her Thursday (Heavy Lower) and Friday (Heavy Prep) day pages were
 * missing the Pelvic Floor Safety Note despite clear trigger content (Hex
 * Deadlift/Back Squat/Reverse Lunge on Thursday; RDL/Goblet Squat/Hip Thrust
 * on Friday), while Wednesday and Saturday already carried it correctly (an
 * 8/12/2026 fix documented in CLIENTS.md). Per that same finding, migrating
 * onto the engine also retires the legacy boxed "PROGRESSIVE OVERLOAD — HOW
 * TO ADD WEIGHT" callout (present 5x in the old file, one per day) in favor
 * of the engine's standard `progressionBlock()` — CLAUDE.md documents the
 * boxed-callout style as superseded once the engine was rebuilt against the
 * actual Kelly Mulroy reference document.
 *
 * FIDELITY METHOD: the entire prior .docx was extracted via python-docx
 * (every paragraph, every table, every cell, run-level bold/italic/color)
 * before a single line of this script was written, per the standing "read
 * the full existing record before any build" rule. Every exercise, load,
 * rep range, tempo, rest, coaching cue, sub-line note, RIR note, PR/baseline
 * narrative, and the Week 8 Styku rescan narrative are reproduced verbatim
 * from that extraction — nothing was altered, added, or dropped beyond the
 * two authorized fixes (pelvic floor note additions; legacy callout
 * retirement, which `progressionBlock()` handles automatically per day with
 * no manual code needed).
 *
 * MAPPING NOTES (things a text diff alone wouldn't explain):
 *   - Sub-lines under an exercise name in the old file (e.g. "Wk1: 40 lbs ·
 *     Wk4 target: 45–50 lbs") were confirmed via run-level formatting to be
 *     italic/C.mid (6B6B6B) — this is exactly `ex.insight`'s rendering, so
 *     every such sub-line below is carried via `insight`, not invented.
 *   - The old file's "  2 RIR" / "  1–2 RIR" sub-lines under COACHING CUE
 *     were a second paragraph in that cell, colored C.teal (00695C) — the
 *     closest engine equivalent is `ex.rirNote` (also C.teal), used
 *     throughout; the engine appends it inline rather than as a second
 *     paragraph, a cosmetic rendering difference only.
 *   - Every block-intro paragraph in the old file (e.g. "Row target: 40 lbs
 *     → 45 lbs this cycle...") was confirmed via run inspection to carry NO
 *     bold label prefix — these use `introLabel: null` throughout to
 *     reproduce that as plain unlabeled prose, per the engine's documented
 *     mechanism for exactly this case, rather than defaulting to a "Note:"
 *     label the old file never had.
 *   - PR/baseline narrative paragraphs (Hex Deadlift, Hip Thrust, Plank,
 *     Push-Ups) were confirmed C.green (43A047) → `greenCallout`. Weight
 *     Update and the Week 8 Styku Re-Scan narrative were confirmed C.teal
 *     (00695C) → `tealCallout`/`summary.rescanNote` respectively.
 *   - The Week 8 Styku Re-Scan result (ALST 5.85, VFA 61.4, Shape Score
 *     98/100, BMI 18.9, segmental LST, etc.) is preserved TWICE, deliberately
 *     non-redundantly: once as structured `data.styku` (the standard early-
 *     page presentation every other engine-built client document uses) and
 *     once as the full original narrative paragraph, verbatim, in
 *     `summary.rescanNote` — which is also where it sat in the old file
 *     (end of document, in the Weekly Summary section, right after the
 *     4-/8-week milestones). This is the one section of the old document
 *     that already matched the engine's own `data.summary` schema almost
 *     exactly (subtitle / weeklySummary rows / milestones4wk / milestones8wk
 *     / rescanNote), so it's reproduced as structured data rather than a
 *     hand-copied paragraph.
 *   - The old file's Nutrition table had 4 rows: PROTEIN, CREATINE,
 *     COLLAGEN, CALORIES. The first three are exactly what `nutritionBlock()`
 *     already generates from `client.weightKg`/`ageYears`/`alstIndex`/
 *     `isPostmenopausal` (see weightKg note below) — the CALORIES row has no
 *     engine equivalent, so it's preserved as an explicit baselineNote
 *     ("Calories & Energy Availability") rather than silently dropped.
 *   - **UPDATED 8/14/2026 (Xolokan-approved resolution of CLIENTS.md item 2):**
 *     `client.weightKg` now reflects her CURRENT 114 lb weight (51.7 kg),
 *     not the pre-rescan 52.2 kg (115 lbs) the original hand-authored file
 *     used. This shifts the `proteinTargets()`-calculated range from
 *     104–115g/day to 103–114g/day (51.7 × 2.0 = 103.4→103, × 2.2 =
 *     113.74→114) — the ~1g/day shift previously flagged as a pre-existing
 *     inconsistency is now resolved, current weight in, current target out.
 *   - **UPDATED 8/14/2026 (CLIENTS.md item 3):** the preserved CALORIES
 *     baselineNote's stale "BMR: 1,122 cal/day" (her pre-rescan 2/7/2026
 *     figure) is now corrected to "BMR: 1,159 cal/day," matching the
 *     confirmed current 8/7/2026 value already used for `client.bmr` /
 *     `styku.bmr` and documented in the sibling Improvement Report script.
 *     This resolves the internal inconsistency previously flagged.
 *   - **UPDATED 8/14/2026 (CLIENTS.md item 4):** the baselines table's
 *     Single-Leg RDL row previously said "Wk4 target: 45 lbs — left leg
 *     leads," left over from her original asymmetry finding, while the
 *     Week 8 rescan narrative elsewhere in the same document states the leg
 *     LST gap (0.4 lbs) is now below the 0.5 lb asymmetry threshold with
 *     "no unilateral-lead protocol change indicated." Resolved in favor of
 *     the more current rescan data — the row now briefly notes the
 *     historical left-leg-lead basis and states it's resolved per the Week
 *     8 rescan, with unilateral work proceeding evenly both sides going
 *     forward. The Weight Update baselineNote's 112→115 lb narrative vs. the
 *     Week 8 rescan's 114 lbs remains an unresolved, disclosed pre-existing
 *     inconsistency (out of the 6 authorized items, not touched here).
 *   - **UPDATED 8/14/2026 (CLIENTS.md item 5 — Antagonist Rotation Rule):**
 *     Friday Block B ran 4 consecutive pull-pattern exercises (Lat Pulldown
 *     → Seated Cable Row → Face Pull → Band Pull-Apart), a real violation.
 *     Neither of Friday's other two blocks (A: lower-body hinge/squat; C:
 *     core/anti-rotation) contains a push movement to reorder in, so per
 *     CLAUDE.md's documented fallback a light push exercise was added
 *     rather than deleting any pull exercise — "Wall Push-Up (Light
 *     Activation)" inserted as the 3rd exercise (between Seated Cable Row
 *     and Face Pull), matching Friday's sub-maximal 60% "no PRs, no
 *     grinding" theme. Sequence is now pull → pull → push → pull → pull:
 *     no 3 consecutive same-pattern exercises anywhere in the block, all 4
 *     original exercises preserved.
 *   - **UPDATED 8/14/2026 (CLIENTS.md item 6):** the Week 8 rescan narrative
 *     (`summary.rescanNote`) mislabeled VFA 61.4 cm² as "Low Risk" —
 *     per CLAUDE.md's VFA table (<70 cm² = Very Low Risk, 70–99 = Low
 *     Risk), corrected to "Very Low Risk." No other VFA-risk-label
 *     occurrence exists elsewhere in this document (confirmed via search).
 *   - Two cosmetic style corrections happen automatically as a byproduct of
 *     using `buildDocument()` rather than the old hand-authored XML, per
 *     CLAUDE.md's documented house rules (not treated as content changes):
 *     Warm-Up labels render in `C.warmGreen` (the old file used gold,
 *     C9A227, for Warm-Up — a legacy inconsistency); and Wednesday's
 *     exercise-table headers render at the correct gold TABLE-HEAD tint
 *     (F5E8C0) rather than the old file's gold DAY-HEADER-PALE tint
 *     (FAF3E0) used for both — the one place CLAUDE.md's color system
 *     documents gold as having two distinct tints.
 *   - No block in the old file used a `block.color` override — every
 *     exercise table's header fill was independently confirmed (via XML
 *     shading inspection) to match its own day's default intensity color
 *     exactly, with zero exceptions. Reproduced the same way here: no block
 *     below sets `color`, preserving the old file's actual behavior rather
 *     than introducing new color choices (e.g. purple for the posterior-
 *     chain/pull blocks) that would be a redesign, not a migration.
 *   - The Antagonist Rotation Rule fixes already applied to the old file on
 *     8/12/2026 (Wednesday Block A/B swap; Thursday Block B/C swap, with
 *     Block C's title corrected to "Ground Stability & Lateral Squat") are
 *     reproduced in their already-fixed state — this build does not re-audit
 *     or re-decide that sequencing, only carries the already-correct result
 *     forward faithfully.
 *
 * PELVIC FLOOR FIX (the task this build exists to make): `client.
 * isPostmenopausal = true` is set, and NO day sets `pelvicFloor: false`, so
 * `buildDocument()`'s standard auto-trigger (fires whenever a day contains
 * squat/deadlift/RDL/hip-thrust/carry/lunge content) runs identically across
 * all 5 days rather than being manually placed per day. This correctly adds
 * the missing note to Thursday (Hex Deadlift, Back Squat, DB Reverse Lunge)
 * and Friday (Romanian Deadlift, Goblet Squat, Hip Thrust) as required. It
 * ALSO fires on Tuesday, which the old file never flagged — Tuesday's Block
 * C includes "Farmers Carry (Intro Weight)," a lighter-load carry (40–45
 * lbs/hand vs. the 50–65 lbs main Thursday/Saturday carries) explicitly
 * framed in-file as reduced load to protect CNS output. The engine's trigger
 * is a blunt keyword match (any exercise name containing "carry"), not
 * load-aware, so it does not distinguish "intro weight" from "heavy" the way
 * the old file's author apparently did by hand. This is flagged explicitly
 * in the final report as a genuine, disclosed side effect of the fix — not
 * hidden — since it goes beyond the two specifically requested days
 * (Thursday/Friday) even though it is arguably the more clinically
 * consistent outcome for a postmenopausal client doing any carry work.
 * Wednesday and Saturday's notes now render in their STANDARD engine
 * position (immediately after Warm-Up, before Block A) rather than the old
 * file's mid-block placement (after Block A's exercise table) — the wording
 * is byte-identical (confirmed against the old file's actual text), only
 * the position moved, matching how every other engine-built client document
 * places this note.
 *
 * LANGUAGE CORRECTION (8/17/2026, per CLAUDE.md's External Evidence Review
 * corrections — targeted framing fixes only, no exercise/training/load
 * content touched):
 *   1. ALST Index 5.85 — dropped the retired "Normal/monitor tier, just
 *      under the 7.0 Optimal threshold" framing (CLAUDE.md's ALST table no
 *      longer has a graded "Optimal" tier above 5.5 for women — 7.0 is the
 *      MALE at-risk cutoff, not a female optimal target) in favor of
 *      "within normal reference range... a trend metric, not a graded
 *      score."
 *   2. VFA 61.4 — dropped the retired absolute "Very Low Risk" risk-band
 *      label (CLAUDE.md's VFA risk-band table is retired entirely) in favor
 *      of trend framing ("a low reading, worth tracking as a trend at
 *      future scans").
 *   3. LIFTMOR intensity — corrected "≥80% 1RM" to the actual LIFTMOR trial
 *      standard, ">85% 1RM" (Watson et al., JBMR 2018, 5×5 at >85% 1RM, not
 *      80%), in the three places this document referenced it (Hex Deadlift
 *      baselineNote, Thursday's intensityPara, the LIFTMOR/T-score
 *      baselineNote) — reworded to note her Wk3–4 loads (200–215 lbs,
 *      ~88–94% 1RM) are what actually clear that threshold, rather than
 *      implying every working set already does.
 * Protein language was checked and left as-is: her nutrition figures are
 * auto-generated by `nutritionBlock()`/`proteinTargets()`, whose age-banded
 * tier logic is unchanged (CLAUDE.md explicitly defers that engine fix
 * pending new client-data fields not yet captured anywhere in this system)
 * — this document carries no hand-written narrative asserting the retired
 * age-tier reasoning as clinical fact, so nothing needed correcting there.
 *
 * REVISION (8/18/2026) — RIR TIER INVERSION FIX + LIFTMOR CONDITIONS:
 *   1. RIR TIERS WERE INVERTED relative to CLAUDE.md's corrected RIR Model
 *      (8/17/2026, which made 2 RIR the DEFAULT for PRIMARY lifts and
 *      reserved 1 RIR for hypertrophy-priority ACCESSORY work, on the basis
 *      that a 2024 dose-response meta-regression found strength gains
 *      largely unrelated to estimated RIR). This document had the two tiers
 *      effectively swapped: the heaviest primary lifts sat at 1 RIR while
 *      accessory work sat correctly at 2 RIR. Corrected:
 *        - Hex Bar Deadlift (Thu, 5x3-5, the program's heaviest lift):
 *          '1 RIR on work sets' -> '2 RIR on work sets — not to failure'
 *        - Split Stance Hex DL (Wed, primary): '1 RIR on last set' ->
 *          '2 RIR on last set'
 *        - Hip Thrust (Wed, the day's headline PR lift): '1-2 RIR' -> '2 RIR'
 *      Every other rirNote in the document was checked exercise by exercise
 *      and left alone: Tuesday's DB Overhead Press sits in a block titled
 *      'SECONDARY HYPERTROPHY — ACCESSORY UPPER' at 3x8-10, which is
 *      genuinely the 1-RIR accessory tier — the blurred '1-2 RIR' RANGE was
 *      tightened to '1 RIR — hypertrophy-priority accessory' to state the
 *      tier cleanly, NOT moved to 2 RIR. Friday's 60% day keeps its '3 RIR —
 *      sub-maximal' / '3 RIR' notes: that is the corrected standard's single
 *      collapsed technique/submaximal band, correctly applied.
 *   2. LIFTMOR CONDITIONS — verified genuinely absent, then added. CLAUDE.md's
 *      8/17/2026 LIFTMOR correction added four requirements beyond the
 *      intensity number. This document already had the intensity right
 *      (>85% 1RM, corrected 8/17/2026 above). The other four were confirmed
 *      MISSING by extracting the full rendered .docx via python-docx and
 *      searching all five day pages — zero hits for 'supervis', 'spinal
 *      flexion', 'fracture', 'BMD', 'ramp', 'physiotherap'. The only adjacent
 *      content was two exercise-level technique cues (Sled Push: "Don't round
 *      lower back"; Seated Cable Row: "No rounding"), which are per-exercise
 *      coaching, not a stated programmatic prohibition. Added:
 *        - Supervision, technique-first ramp-in (naming Friday's 60% day as
 *          the standing vehicle, per CLAUDE.md's own suggestion), and the
 *          loaded-spinal-flexion prohibition -> a NEW adjacent watch-type
 *          baselineNote, 'Bone-Loading Protocol — Supervision, Ramp-In &
 *          Spinal Precaution'.
 *        - The risk-stratification gate (prior vertebral fracture / multiple
 *          low-trauma fractures / very low BMD -> individualised
 *          physiotherapist input FIRST) plus the fall-prevention rationale
 *          -> appended to the EXISTING 'Bone-Loading Candidacy — LIFTMOR /
 *          T-Score Screening' note, where the DEXA/T-score discussion it
 *          gates already lives.
 *      Jason Bethea is deliberately NOT named in the referral language:
 *      Elizabeth has no documented coordinated-care relationship with him
 *      anywhere in CLIENTS.md (verified), so naming him would be an
 *      unverified claim rather than a documentation upgrade. Generic
 *      'individualised physiotherapist assessment' is used instead, matching
 *      CLAUDE.md's own LIFTMOR wording.
 *      Both additions are left client-visible (no audience: 'internal') —
 *      this is clinical safety content in the same category as the pelvic
 *      floor protocol, which CLAUDE.md explicitly keeps visible in both views.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Elizabeth Poyner',
  programTitle: '5-Day Training Plan',
  subtitle: '60–100% Progressive Intensity Build',
  schedule: 'Tue/Wed/Thu/Fri/Sat Gym',
  stats: ['Age 64', '5\'5"', '114 lbs', 'Postmenopausal', 'Tue/Wed/Thu/Fri/Sat Gym'],
  // UPDATED 8/14/2026: her current 114 lbs (51.7 kg) — see header note
  // above. Protein target recalculates to 103-114g/day (2.0-2.2 g/kg).
  weightKg: 51.7,
  ageYears: 64,
  isPostmenopausal: true,
  bmr: 1159,
  alstIndex: 5.85, // Week 8 rescan — Not At-Risk (within normal reference range; a trend metric, not a graded tier — corrected 8/17/2026)
};

const styku = {
  scanDate: '8/7/2026',
  bodyFatPct: 27.1,
  bodyFatRank: 'Fit',
  leanMass: 78.4,
  leanMassPct: 69.0,
  fatMass: 30.8,
  boneMass: 4.5,
  bmi: 18.9,
  bmr: 1159,
  vfa: 61.4,
  shapeScore: 98,
  shapeScoreLabel: 'Excellent',
  alstIndex: 5.85,
  leftArmLST: 6.2,
  rightArmLST: 6.4,
  leftLegLST: 12.7,
  rightLegLST: 13.1,
  peerComparison: "Body Fat 27.1% reads lower than 80% of Styku's peer comparison group. Both segmental gaps (arms 0.2 lbs, legs 0.4 lbs) sit below the 0.5 lb Asymmetry Protocol trigger — monitor only, no unilateral-lead protocol change indicated.",
};

const weekOverview = [
  { day: 'TUE', intensity: 70, focus: 'Upper\nStrength' },
  { day: 'WED', intensity: 80, focus: 'Glute &\nHamstring' },
  { day: 'THU', intensity: 90, focus: 'Heavy\nLower' },
  { day: 'FRI', intensity: 60, focus: 'Heavy\nPrep' },
  { day: 'SAT', intensity: 90, focus: 'Fast-Twitch\nPerformance' },
  { day: 'SUN', intensity: 'AR', focus: 'Recovery' },
  { day: 'MON', intensity: 'Off', focus: 'Off' },
];

const baselines = [
  ['Hex Bar Deadlift', '195 lbs × 5', 'NEW PR', 'Est 1RM: 228 lbs · Wk4 target: 210–215 lbs'],
  ['Split Stance Hex DL', '165 lbs × 5', 'NEW PR', 'Est 1RM: 192 lbs · Wk4 target: 175–180 lbs'],
  ['Hip Thrust', '145 lbs × 5', 'NEW PR', 'Est 1RM: 169 lbs · Wk4 target: 155–160 lbs'],
  ['DB Lunge', '40 lbs × 8', 'Baseline', 'Wk4 target: 45–50 lbs/hand'],
  ['Single-Leg RDL', '40 lbs', 'Baseline', 'Wk4 target: 45 lbs. Previously left-leg-lead (per original leg LST gap); Week 8 rescan confirmed gap closed below the 0.5 lb threshold — proceed evenly both sides.'],
  ['Push-Ups', '28 reps', 'NEW PR', 'Exceptional. Add weighted vest Wk3'],
  ['Farmers Carry', '50 lbs/hand', 'Baseline', 'Wk4 target: 60–65 lbs/hand'],
  ['Plank Hold', '2:00', 'NEW PR', 'Exceptional. Loaded with 10–15 lb plate from session 1'],
  ['Overhead Press (DB)', '20 lbs × 5', 'Baseline', 'Wk4 target: 22.5–25 lbs'],
];

const baselineNotes = [
  {
    type: 'green',
    label: 'Hex Deadlift — 195 lbs × 5 · NEW PR',
    body: 'Estimated 1RM: 228 lbs. This is an elite-level deadlift for any age — extraordinary for a 64-year-old woman at 115 lbs. Previous PR was 175 lbs. New 4-week loading: Wk1: 180 lbs · Wk2: 190 lbs · Wk3: 200 lbs · Wk4 peak test: 210–215 lbs. This progression builds directly toward LIFTMOR RCT-level bone-density loading (the trial\'s protocol was >85% 1RM) — Wk3–4 sets (200–215 lbs, roughly 88–94% 1RM) meet or exceed that intensity directly.',
  },
  {
    type: 'green',
    label: 'Hip Thrust — 145 lbs × 5 · NEW PR Established',
    body: 'Estimated 1RM: 169 lbs. This is the first documented heavy hip thrust baseline for Elizabeth. New 4-week loading: Wk1: 135 lbs · Wk2: 145 lbs · Wk3: 150 lbs · Wk4: 155–160 lbs. Hip thrust at this load builds the posterior chain for bone density and pelvic health.',
  },
  {
    type: 'green',
    label: 'Plank — 2:00 · Exceptional Baseline',
    body: '2:00 is exactly double the ICONS 60-second threshold. This is an elite core endurance result. Adding a 10–15 lb plate from session 1. Target: 2:00 loaded by Week 4. This transfers directly to spinal stability under all heavy compound lifts.',
  },
  {
    type: 'green',
    label: 'Push-Ups — 28 Reps · Exceptional',
    body: '28 full push-ups at 64 years old is in the top percentile for women of any age. Maintaining this while adding load. Add weighted vest (5–10 lbs) in Week 3 to continue progressive overload on this movement.',
  },
  {
    type: 'teal',
    label: 'Weight Update — 115 lbs (+3 lbs since last assessment)',
    body: 'Previous weight: 112 lbs. Current: 115 lbs. Weight gain with no loss of leanness or conditioning = lean mass gain. This is the correct direction for a postmenopausal woman at ICONS standards. Styku rescan recommended at 8 weeks to confirm lean mass increase and track ALST index.',
  },
  {
    type: 'gold',
    label: 'Calories & Energy Availability',
    body: 'BMR: 1,159 cal/day (current, per 8/7/2026 Week 8 Styku rescan). Total intake must SUPPORT training and muscle-building — avoid a deficit while building lean mass. RED-S risk: avoid chronic low energy availability; priority is muscle-building, not fat loss. Body composition changes as lean mass grows.',
  },
  {
    type: 'gold',
    label: 'Bone-Loading Candidacy — LIFTMOR / T-Score Screening',
    body: 'At 64 and postmenopausal, Elizabeth sits in the 55-65 bracket where LIFTMOR-style bone-loading candidacy screening (T-score < -1.0) is worth pursuing directly — framed as "bone investment," not added risk. Her Hex Deadlift and Hip Thrust progression builds toward and, by Week 3–4, reaches LIFTMOR\'s actual >85% 1RM standard, so the training stimulus is already in place; a DEXA scan would confirm formal candidacy and give a T-score baseline to track. No DEXA/T-score data is currently on file. Risk-stratification gate, to run before the DEXA result is acted on either way: a prior vertebral fracture, multiple low-trauma fractures, or a very low BMD reading routes to individualised physiotherapist assessment FIRST — that assessment comes before heavier loading, not alongside it. Nothing on file indicates any of these for Elizabeth, which is exactly what the scan would confirm. Balance and fall-prevention work belongs alongside the loading protocol rather than instead of it: in the trial evidence for this protocol, a fall — not the lifting load itself — was the proximate mechanism behind the single vertebral fracture recorded.',
  },
  {
    // ADDED 8/18/2026 — the three standing conditions CLAUDE.md's corrected
    // LIFTMOR section (8/17/2026) requires alongside the intensity number,
    // which this document already had right at >85% 1RM but which were
    // otherwise absent from all five day pages (verified via python-docx
    // extraction of the full rendered document, not just a script grep).
    // Deliberately NOT marked audience: 'internal' — this is genuine
    // client-facing clinical safety content, the same category as the
    // pelvic floor protocol, and it should reach her, not just her trainer.
    type: 'watch',
    label: 'Bone-Loading Protocol — Supervision, Ramp-In & Spinal Precaution',
    body: 'Three standing conditions apply wherever Hex Deadlift or Hip Thrust loading reaches LIFTMOR intensity (>85% 1RM — Weeks 3–4 of this cycle). SUPERVISION: the trials this protocol comes from were delivered as fully supervised sessions, and heavy 5×5 work above 85% 1RM is never programmed here as unsupervised homework — every Week 3–4 peak-loading set is coached in person. TECHNIQUE-FIRST RAMP-IN: Weeks 1–2 sit deliberately below that intensity by design (Hex DL 180–190 lbs, roughly 79–83% of the 228 lb estimated 1RM) so mechanics are locked in before the heaviest loads arrive, and Friday\'s 60% day is the standing vehicle for that technique work throughout the cycle — it is a deliberate part of the bone-loading protocol, not simply a light day. LOADED SPINAL FLEXION: no loaded forward bending, no rounding under load, and no repeated or end-range spinal flexion on any lift in this program. Neutral spine is the non-negotiable position on every deadlift, hinge, carry, row, and sled push — if it cannot be held, the set ends there regardless of the number on the bar.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Tuesday',
    subtitle: 'Upper Body Strength & Hypertrophy',
    descriptor: 'Moderate Strength Day · Upper Compound Push + Pull · 60–70 Min',
    intensityLabel: '70% Day',
    intensityPara: "Tuesday builds upper body strength at 70% intensity — challenging but not near-maximal. This protects CNS output for Thursday and Saturday's heavy lower sessions. Primary goal today: add load to the row, establish OHP baseline progression, and maintain push-up volume.",
    warmUp: '5 min: arm circles ×15, band pull-aparts ×15, cat-cow ×10, dead hang 20s, scapular push-ups ×10, neck rolls. Goal: open the shoulder girdle and prime the upper back before pressing and pulling.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY STRENGTH — COMPOUND PUSH / PULL',
        introLabel: null,
        intro: 'Row target: 40 lbs → 45 lbs this cycle. Push-ups: 28-rep PR baseline — work at 20 reps (controlled, 2 RIR) and add weighted vest Week 3.',
        exercises: [
          { name: 'DB Single-Arm Row', insight: 'Wk1: 40 lbs · Wk4 target: 45–50 lbs', sets: '4', reps: '8–10', load: '40–45 lbs', tempo: '3-1-2', rest: '60s', cue: 'Chest on pad. Drive elbow to hip. Full stretch at bottom.', rirNote: '2 RIR' },
          { name: 'Push-Ups (Full Floor)', insight: 'Baseline 28 reps — controlled at 20. Wk3: add vest', sets: '4', reps: '18–20', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Full lockout at top. 3-sec descent. Stop 2 reps before failure.', rirNote: '2 RIR — not to failure' },
          { name: 'Incline DB Press (30–45°)', sets: '3', reps: '10–12', load: '20–25 lbs', tempo: '3-1-1', rest: '60s', cue: 'Elbows at 45°. Squeeze chest at top. Full range every rep.' },
        ],
      },
      {
        letter: 'B',
        title: 'SECONDARY HYPERTROPHY — ACCESSORY UPPER',
        exercises: [
          { name: 'DB Overhead Press', insight: 'Baseline 20 lbs × 5. Wk4 target: 22.5–25 lbs', sets: '3', reps: '8–10', load: '20 lbs', tempo: '2-1-1', rest: '60s', cue: 'Neutral grip. Press to lockout. Arms alongside ears. Core braced.', rirNote: '1 RIR — hypertrophy-priority accessory' },
          { name: 'Seated Cable / Band Row', sets: '3', reps: '12–15', load: 'Moderate', tempo: '2-1-2', rest: '45s', cue: 'Sit tall. Shoulder blades squeeze at end range. No rounding.' },
          { name: 'Face Pull / Band Pull-Apart', sets: '3', reps: '15–20', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Arms at ear height. External rotation at end. Primary posture movement.' },
          { name: 'Tricep Overhead Extension', sets: '3', reps: '12–15', load: 'Light-Mod', tempo: '2-0-2', rest: '45s', cue: 'Elbows close to head. Full stretch at bottom. Elbow integrity under load.' },
        ],
      },
      {
        letter: 'C',
        title: 'GRIP & SHOULDER LONGEVITY',
        exercises: [
          { name: 'Farmers Carry (Intro Weight)', insight: 'Full carry 50 lbs is Thursday/Saturday — lighter here to protect CNS', sets: '3', reps: '25–30 yds', load: '40–45 lbs/hand', tempo: 'Controlled', rest: '60s', cue: "Shoulders packed down and back. Tall posture. Don't shrug." },
          { name: 'Dead Hang', sets: '3', reps: '25–30s', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Passive hang. Decompress spine. Grip + lat traction. Shoulder health.' },
        ],
      },
    ],
    coolDown: '5 min: thoracic extension foam roller 60s, doorway chest stretch 30s each, lat stretch 30s each, wrist circles. Undo forward shoulder pattern from pressing.',
    iconsNote: 'Push-Ups: baseline 28 reps — work at 20 (2 RIR) and maintain quality. Weighted vest added Week 3. Row: 40 → 45 lbs this cycle. OHP: 20 lbs is the working baseline — build to 22.5–25 lbs by Week 4. Document all loads.',
  },
  {
    intensity: 80,
    title: 'Day 2 — Wednesday',
    subtitle: 'Glute & Hamstring Hypertrophy',
    descriptor: 'Strength Emphasis · Hip Thrust New PR · Posterior Chain Volume',
    intensityLabel: '80% Day',
    intensityPara: 'Wednesday establishes the new hip thrust PR baseline (145 lbs × 5, Est 1RM 169 lbs) and continues Split Stance Hex DL loading. 80% intensity means the last 1–2 reps of each work set are hard but achievable with clean form. This is where posterior chain strength grows.',
    warmUp: '5–8 min: glute bridges 2×15, banded clamshells 2×15 each side, hip 90/90 rotations ×10 each, leg swings front/back and lateral ×10 each. Prime the posterior chain before hip-dominant loading.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY HYPERTROPHY — HIP HINGE & THRUST',
        introLabel: null,
        intro: 'Hip Thrust: NEW PR baseline 145 lbs × 5. Wk1 working load: 135 lbs. Pelvic floor note: exhale on the drive up every rep. Split Stance Hex DL: 165 lbs PR → Wk1 working load 155 lbs.',
        exercises: [
          { name: 'Hip Thrust (Barbell or DB)', insight: 'PR 145 lbs × 5 · Wk1: 135 · Wk2: 145 · Wk4: 155–160 lbs', sets: '4', reps: '6–8', load: '135 lbs', tempo: '2-2-1', rest: '90s', cue: 'Upper back on bench. Drive through heels. 2-sec hold at top. Exhale on drive.', rirNote: '2 RIR' },
          { name: 'Split Stance Hex DL', insight: 'PR 165 lbs × 5 · Wk1: 155 · Wk2: 160 · Wk4: 175–180 lbs', sets: '4', reps: '5–6 ea', load: '155 lbs', tempo: '3-1-1', rest: '90s', cue: 'Hinge from hip — not squat. Hamstring stretch, not lower back.', rirNote: '2 RIR on last set' },
          { name: 'Lateral Band Walk', sets: '3', reps: '12 ea way', load: 'Light band', tempo: 'Controlled', rest: '30s', cue: 'Band above knees. Proud chest. Steps lateral, maintain tension.' },
        ],
      },
      {
        letter: 'B',
        title: 'ACCESSORY GLUTE & HAMSTRING',
        exercises: [
          { name: 'Single-Leg RDL (DB)', insight: 'Wk4 target: 45 lbs · flag any L/R difference', sets: '3', reps: '8–10 ea', load: '40 lbs', tempo: '3-1-1', rest: '60s', cue: 'Soft knee. Hips square. Hamstring stretch at bottom. Log L vs R.', rirNote: '2 RIR' },
          { name: 'Lying Hamstring Curl (Machine)', sets: '3', reps: '12–15', load: 'Light-Mod', tempo: '2-1-2', rest: '45s', cue: 'Control the eccentric. Hips flat. Full extension between reps.' },
          { name: 'Glute Bridge (Feet Elevated)', sets: '3', reps: '15–20', load: 'Bodyweight', tempo: '2-2-1', rest: '30s', cue: 'Feet on bench. Drive through heels. Adds difficulty without spinal load.' },
          { name: 'Romanian Deadlift (Bilateral)', sets: '3', reps: '10–12', load: '80–90 lbs', tempo: '3-1-1', rest: '60s', cue: 'Neutral spine. Push hips back. Bar or DBs close to legs throughout.' },
        ],
      },
      {
        letter: 'C',
        title: 'POSTERIOR CHAIN FINISHER',
        exercises: [
          { name: 'Nordic Hamstring Curl (Assisted)', sets: '2', reps: '5–8', load: 'Assisted', tempo: '4-0-1', rest: '90s', cue: 'Slow controlled fall forward. Strong eccentric. Protects hamstring integrity.' },
          { name: 'Reverse Hyper or Back Extension', sets: '2', reps: '15', load: 'Bodyweight', tempo: '2-0-2', rest: '45s', cue: "Controlled arc — don't hyperextend at top. Spinal health." },
        ],
      },
    ],
    coolDown: '8 min: pigeon pose 90s each side, supine figure-4 hip stretch, standing quad stretch, hamstring doorway stretch 60s each side.',
    iconsNote: 'Hip Thrust NEW PR: 145 lbs × 5 (Est 1RM 169 lbs). 4-week loading: Wk1 135 → Wk2 145 → Wk3 150 → Wk4 155–160 lbs. Split Stance Hex DL: 165 lbs PR → Wk1 155 → Wk2 160 → Wk3 165 → Wk4 175 lbs peak test. Document hip thrust baseline carefully — first heavy session.',
  },
  {
    // FIX: Thursday was missing the Pelvic Floor Safety Note despite Hex
    // Bar Deadlift / Back Squat / DB Reverse Lunge — all three match the
    // engine's auto-trigger, which fires here since day.pelvicFloor is not
    // set to false and client.isPostmenopausal is true.
    intensity: 90,
    title: 'Day 3 — Thursday',
    subtitle: 'Heavy Lower Body Strength',
    descriptor: 'Peak Intensity · Hex Bar 195 Lbs PR → 210+ · Bone Density Investment',
    intensityLabel: '90% Day',
    intensityPara: 'Thursday is the highest-intensity gym session of the week. Hex bar PR is now 195 lbs × 5 (Est 1RM 228 lbs) — a new all-time record. Wk1 working load: 180 lbs. Rest fully between sets. CNS output is the priority. This block builds toward LIFTMOR RCT-level bone-density loading (>85% 1RM), reached directly by Week 3–4.',
    warmUp: '8–10 min: leg swings ×10 each direction, hip circles, goblet squat 2×10 light, box step-ups 2×8 each leg, hex bar warm-up: 50% × 5, 65% × 3, 80% × 1. Prime the CNS for maximal output.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY STRENGTH — ICONS BATTERY LIFTS',
        introLabel: null,
        intro: 'Hex DL: NEW PR 195 lbs × 5. Est 1RM 228 lbs. Wk1: 180 lbs (79% 1RM). Add 10 lbs each week. Wk4 peak test: 210–215 lbs. This is the highest-priority bone-density movement in this program.',
        exercises: [
          { name: 'Hex Bar Deadlift', insight: 'PR 195 lbs × 5 · Est 1RM 228 · Wk1: 180 · Wk2: 190 · Wk3: 200 · Wk4: 210–215', sets: '5', reps: '3–5', load: '180 lbs', tempo: '3-1-1', rest: '2 min', cue: 'Neutral spine. Hip-width stance. Drive the floor away. Lock knees and hips at top.', rirNote: '2 RIR on work sets — not to failure' },
          { name: 'Back Squat or Goblet Squat', sets: '4', reps: '6–8', load: '50–70 lbs', tempo: '3-1-1', rest: '90s', cue: 'Knees track toes. Depth to parallel. Chest tall throughout.', rirNote: '2 RIR' },
          { name: 'Sled Push', insight: 'Add 10 lbs each week · Wk4 target: 140–150 lbs', sets: '4', reps: '20 yds', load: '110–120 lbs', tempo: 'Explosive', rest: '90s', cue: "Low drive position. Full hip extension each stride. Don't round lower back." },
        ],
      },
      {
        letter: 'B',
        title: 'UNILATERAL LOWER STRENGTH',
        introLabel: null,
        intro: 'Lunge baseline: 40 lbs × 8 reps (Est 1RM 51 lbs). Work at 40 lbs (80% 1RM). Target 45–50 lbs by Week 4.',
        exercises: [
          { name: 'DB Reverse Lunge', insight: 'Baseline 40 lbs × 8 · Wk4: 45–50 lbs · log L vs R', sets: '3', reps: '10 ea', load: '40 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'Step back, rear knee hovers 1 inch. Drive through front heel to stand.', rirNote: '2 RIR' },
          { name: 'Box Step-Up', sets: '3', reps: '10 ea', load: '20–25 lbs/hand', tempo: '2-1-1', rest: '60s', cue: '18–20 inch box. Full hip extension at top. All drive from working leg.' },
          { name: 'Single-Leg Glute Bridge', sets: '3', reps: '12 ea', load: 'Bodyweight', tempo: '2-2-1', rest: '45s', cue: 'Drive through one heel. Pelvis level throughout. Note any L vs R difference.' },
        ],
      },
      {
        letter: 'C',
        title: 'GROUND STABILITY & LATERAL SQUAT',
        exercises: [
          { name: 'Cossack Squat', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: '3-1-1', rest: '45s', cue: 'Shift weight laterally. Extend opposite leg. Hip adductor mobility under load.' },
          { name: 'Goblet Squat Pulse (Bottom Hold)', sets: '2', reps: '20 pulses', load: 'Light-Mod', tempo: '—', rest: '45s', cue: 'Hold bottom position, small pulses. Knee and hip joint health at depth.' },
        ],
      },
    ],
    coolDown: '10 min: supine spinal twist 60s each side, standing hip flexor stretch in lunge 60s each side, seated forward fold, quad stretch. Lower back decompression after heavy deadlifts — non-negotiable.',
    iconsNote: 'Hex Deadlift NEW PR: 195 lbs × 5 (Est 1RM 228 lbs). 4-week loading: Wk1 180 → Wk2 190 → Wk3 200 → Wk4 peak test 210–215 lbs. DB Lunge: 40 lbs baseline. Sled Push: +10 lbs each week from 110–120 lbs. This is the highest-priority bone-density session of the week.',
  },
  {
    // FIX: Friday was missing the Pelvic Floor Safety Note despite
    // Romanian Deadlift / Goblet Squat / Hip Thrust — auto-trigger fires
    // here for the same reason as Thursday above.
    intensity: 60,
    title: 'Day 4 — Friday',
    subtitle: 'Heavy Prep — Saturday Prime',
    descriptor: 'Sub-Maximal · Prime Without Fatigue · 60–65% Effort Throughout',
    intensityLabel: '60% Day',
    intensityPara: "Friday bridges Thursday's heavy lower session and Saturday's fast-twitch day. Loading stays at 60–65% of max effort. Goal is neural and muscular priming — increase blood flow, reinforce motor patterns, arrive Saturday fully activated. No PRs today. No grinding.",
    warmUp: '8 min: hip 90/90 rotations, banded glute bridges 2×15, lat pulldown warm-up sets, shoulder circles, box step-ups 2×8 each leg. Light and deliberate.',
    blocks: [
      {
        letter: 'A',
        title: 'LOWER BODY ACTIVATION — SUB-MAXIMAL LOADING',
        exercises: [
          { name: 'Romanian Deadlift (Bilateral)', sets: '4', reps: '8–10', load: '80–90 lbs', tempo: '3-1-1', rest: '75s', cue: 'Leave 3 RIR — this is NOT a max effort day. Prime hamstrings without CNS tax.', rirNote: '3 RIR — sub-maximal' },
          { name: 'Goblet Squat', sets: '3', reps: '10–12', load: '30–40 lbs', tempo: '3-1-1', rest: '60s', cue: "Full depth. Reinforce squat pattern ahead of Saturday's explosive work." },
          { name: 'Hip Thrust (Moderate Load)', sets: '3', reps: '12–15', load: '80–90 lbs', tempo: '2-2-1', rest: '60s', cue: "Volume at 65% of Wednesday's load. Higher reps, shorter rest. Glute priming.", rirNote: '3 RIR' },
        ],
      },
      {
        letter: 'B',
        title: 'UPPER BODY PREP — PULL FOCUS + SHOULDER STABILITY',
        exercises: [
          { name: 'Lat Pulldown (Wide Grip)', sets: '4', reps: '10–12', load: 'Moderate', tempo: '2-1-2', rest: '60s', cue: "Full stretch at top. Drive elbows to hip pockets. Don't shrug at top." },
          { name: 'Seated Cable Row', sets: '3', reps: '12–15', load: 'Moderate', tempo: '2-1-2', rest: '45s', cue: 'Shoulder blades retract and depress at end range. Sit tall throughout.' },
          { name: 'Wall Push-Up (Light Activation)', insight: 'Antagonist rotation — brief push touch between pull sets, no CNS tax', insightAudience: 'internal', sets: '2', reps: '12–15', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Light chest/shoulder activation. Sub-maximal — prime the push pattern only.' },
          { name: 'Face Pull (Band or Cable)', sets: '3', reps: '20', load: 'Light', tempo: '2-1-2', rest: '30s', cue: 'External rotation emphasis. Elbows at ear height. Rotator cuff health.' },
          { name: 'Band Pull-Apart', sets: '3', reps: '20', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight. Pull to chest. Rear delt and mid-trap. Posture carry-over.' },
        ],
      },
      {
        letter: 'C',
        title: 'CORE & STABILITY — LOADED PLANK + ANTI-ROTATION',
        introLabel: null,
        intro: 'Plank baseline: 2:00 — exceptional. Load with 10 lb plate from this session. Target: 2:00 loaded by Week 4.',
        exercises: [
          { name: 'Plank Hold (Loaded)', insight: 'Baseline 2:00 BW — now loaded from session 1 · Wk4: 2:00 loaded', sets: '3', reps: '60–90s', load: '10 lb plate', tempo: '—', rest: '90s', cue: 'Plate on mid-back. Neutral spine. Glutes squeezed. Exhale to brace.' },
          { name: 'Dead Bug', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '45s', cue: 'Lower back into floor throughout. Slow opposite arm and leg extension.' },
          { name: 'Pallof Press (Band)', sets: '3', reps: '10 ea side', load: 'Light-Mod', tempo: '2-1-2', rest: '45s', cue: 'Anti-rotation core. Press out against band tension, resist twist.' },
          { name: 'Single-Leg Glute Bridge', sets: '2', reps: '15 ea', load: 'Bodyweight', tempo: '2-2-1', rest: '30s', cue: 'Final activation. One heel drive, pelvis level. Light glute signal before Saturday.' },
        ],
      },
    ],
    coolDown: '8 min: hip flexor lunge stretch 60s each side, thoracic extension over foam roller 60s, hamstring wall stretch 45s each, lat stretch 30s each. Exit loose, warm, ready — not sore.',
    iconsNote: 'Friday is a priming session — NOT a training stimulus. Effort stays at 60–65%. No PRs, no grinding. The goal is to arrive Saturday fully activated. Plank is now loaded: 10 lb plate from today forward.',
  },
  {
    intensity: 90,
    title: 'Day 5 — Saturday',
    subtitle: 'Fast-Twitch Performance + Loaded Carry',
    descriptor: 'Peak Performance Day · Power Output · 50 Lb Carry PR · Pull-Up Progression',
    intensityLabel: '90% Day',
    intensityPara: 'Saturday is the highest neurological demand day of the week. Power, rate of force development, loaded carry at PR weight, and pull-up progression. Farmers carry baseline is 50 lbs/hand — the target is 60–65 lbs/hand by Week 4. Record every number every session.',
    warmUp: '8–10 min: jump rope or high knees 3 min, hip flexor lunge 60s each, lateral shuffles 4×10 yds, box step-ups unweighted fast 2×10 each leg, glute bridges 20 reps. Nervous system primed and ready.',
    blocks: [
      {
        letter: 'A',
        title: 'POWER & RATE OF FORCE DEVELOPMENT',
        exercises: [
          { name: 'Sled Push (Speed Focus)', insight: 'Speed focus — not max load', sets: '5', reps: '15 yds', load: '70–80 lbs', tempo: 'Explosive', rest: '90s', cue: 'Velocity training — lighter than Thursday. Drive hard and fast. Full hip extension.' },
          { name: 'Trap Bar Jump or Box Step-Up Jump', sets: '4', reps: '5', load: '30–40 lbs', tempo: 'Explosive', rest: '90s', cue: 'Light load, fast intent. Triple extension: ankle, knee, hip. Safe power expression.' },
          { name: 'Medicine Ball Slam', sets: '3', reps: '8', load: '8–10 lbs', tempo: 'Explosive', rest: '60s', cue: 'Overhead raise, full-force slam. Full-body power. Rate of force development.' },
        ],
      },
      {
        letter: 'B',
        title: 'LOADED CARRY — ICONS BATTERY',
        introLabel: null,
        intro: 'Farmers carry baseline: 50 lbs/hand. Wk1: 50 lbs. Wk2: 52.5 lbs. Wk3: 55 lbs. Wk4: 60–65 lbs. Add load weekly. Pelvic floor: brace before picking up, maintain throughout the walk.',
        exercises: [
          { name: 'Farmers Carry (Trap Bar or DB)', insight: 'Baseline 50 lbs · Wk2: 52.5 · Wk3: 55 · Wk4: 60–65 lbs', sets: '4', reps: '30–35 yds', load: '50 lbs/hand', tempo: 'Controlled', rest: '90s', cue: 'Shoulders packed. Chest tall. Neutral neck. Grip is the limiter.' },
          { name: 'Suitcase Carry (Single-Arm)', sets: '3', reps: '25 yds ea', load: '30–35 lbs', tempo: 'Controlled', rest: '60s', cue: 'One-sided carry. Resist lateral lean — core stays neutral. Log L vs R.' },
          { name: 'KB or DB Swing', sets: '3', reps: '10', load: '20–25 lbs', tempo: 'Explosive hinge', rest: '60s', cue: 'Hip hinge power — not a squat. Drive hips forward explosively. Posterior chain.' },
        ],
      },
      {
        letter: 'C',
        title: 'PULL-UP PROGRESSION — ICONS BATTERY',
        introLabel: null,
        intro: 'Pull-ups remain a progressive target. Use assisted or band-assisted. Document resistance level and reps every set — reduction in assist = measurable progress.',
        exercises: [
          { name: 'Assisted or Band-Assisted Pull-Up', insight: 'Log assist level + reps every set — this is the progress marker', sets: '4', reps: '5–8', load: 'Assist level', tempo: '3-1-1', rest: '90s', cue: 'Full hang at bottom. Chin over bar at top. 3-sec descent every rep.' },
          { name: 'Inverted Row (TRX or Barbell)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '2-1-2', rest: '60s', cue: 'Feet on floor, body angled 30–45°. Scapular retraction at top. Posture benefit.' },
        ],
      },
      {
        letter: 'D',
        title: 'CONDITIONING FINISHER — RECORD WEEKLY',
        introLabel: null,
        intro: "10-minute AMRAP. Record total rounds completed — this is Elizabeth's weekly output benchmark. Should improve by 1–2 rounds over the 4-week cycle.",
        exercises: [
          { name: 'AMRAP Circuit — 10 Minutes', insight: 'Record total rounds — Week 1 baseline. Beat it every week.', sets: '10 min', reps: 'Max rounds', load: 'See cue', tempo: '—', rest: '—', cue: '6 push-ups + 10 KB swings (20 lbs) + 15 yd sled (light) + 5 box step-ups each leg.' },
        ],
      },
    ],
    coolDown: '10 min: hamstring wall stretch 60s each, hip flexor lunge 60s each, lateral lat stretch 45s each, chest opener on floor, 5 min supine breathing. Saturday is peak neurological demand — recovery starts now.',
    iconsNote: "Saturday closes the training week. Carry: 50 lbs/hand baseline → 60–65 lbs by Week 4. Pull-up: log assist level every set. Finisher: record rounds, beat it weekly. This is the athletic output benchmark for Elizabeth's program.",
  },
];

const summary = {
  subtitle: 'Elizabeth Poyner  ·  ICONS Index  ·  Progressive Intensity Build  ·  Week 1',
  rows: [
    ['TUE', '70% — Green', 'Upper Strength', 'DB Row · Push-Ups · OHP · Incline Press', 'Row: 40→45 lbs · OHP: 20→22.5 lbs · Push-ups: 20 reps (controlled)'],
    ['WED', '80% — Gold', 'Glute & Hamstring', 'Hip Thrust PR · Split Hex DL · SL RDL', 'Hip Thrust: 135→155–160 lbs · Split DL: 155→175 lbs'],
    ['THU', '90% — Red', 'Heavy Lower Strength', 'Hex DL PR · Squat · Sled · Lunge', 'Hex DL: 180→210–215 lbs · Sled: 110→140–150 lbs'],
    ['FRI', '60% — Teal', 'Heavy Prep', 'RDL · Hip Thrust · Lat PD · Loaded Plank', 'Sub-maximal · Plank: BW 2:00 → 10 lb plate loaded'],
    ['SAT', '90% — Red', 'Fast-Twitch Performance', 'Sled Speed · Carry 50 lbs · Pull-Up', 'Carry: 50→60–65 lbs · Pull-up: reduce assist weekly'],
  ],
  milestones4wk: 'Wk1: Hex DL 180 lbs working set, hip thrust 135 lbs, carry 50 lbs. Wk2: DL 190, HT 145, carry 52.5 lbs. Wk3: DL 200, weighted vest push-ups, carry 55 lbs, plank loaded 2:00. Wk4 peak test: DL 210–215 lbs, Hip Thrust 155–160 lbs, Split DL 175 lbs, carry 60–65 lbs.',
  milestones8wk: 'Hex DL: 215–225 lbs for 5 reps. Hip Thrust: 165–175 lbs. Push-ups: 28+ reps unweighted or 20+ with vest. Carry: 65–70 lbs/hand. OHP: 25 lbs. Pull-up: reduce assist by 2–3 levels. Plank: 2:00 loaded. Styku rescan to confirm ALST index and lean mass gain.',
  rescanNote: 'Scan completed. Weight 114 lbs (essentially flat vs. 115 lbs pre-scan — the 116–118 lb lean-gain target was not reached this cycle). ALST Index 5.85 kg/m² — Not At-Risk (within the normal reference range; a trend metric to keep tracking at future scans, not a graded score). Body Fat 27.1% (Fit — lower than 80% of peers). Lean Mass 78.4 lbs. Fat Mass 30.8 lbs. VFA 61.4 cm² — a low reading, worth tracking as a trend at future scans. Shape Score 98/100 — Excellent. BMI 18.9. Segmental: Left Arm LST 6.2 lbs / Right Arm LST 6.4 lbs (0.2 lb gap — below the 0.5 lb asymmetry threshold). Left Leg LST 12.7 lbs / Right Leg LST 13.1 lbs (0.4 lb gap — below threshold, monitor only, no unilateral-lead protocol change indicated). Compare all 9 ICONS battery lifts against these new baselines heading into the next block.',
};

// Client View highlight (added 8/17/2026) — her most compelling
// documented PR, matching the "New PR" language already in baselineNotes.
// Only set when a real prior number exists to compare against (175 lbs,
// per her training log) — never fabricated.
const clientHighlight = {
  label: 'New Deadlift PR',
  body: 'You just set a new Hex Deadlift PR — 195 lbs × 5, up from your previous PR of 175 lbs. That\'s an estimated 1RM of 228 lbs. Every heavy set at this weight is a direct investment in your bone density.',
};

const data = {
  client,
  styku,
  baselines,
  baselineNotes,
  weekOverview,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'elizabeth_poyner');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Elizabeth_Poyner_5Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  const clientBuffer = await buildDocument({ ...data, viewMode: 'client', clientHighlight });
  const clientOutPath = path.join(outDir, 'Elizabeth_Poyner_5Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
