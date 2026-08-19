/**
 * Johanna Castillo — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * Rebuilt from the client's existing document (johannacastillo3.pdf) to match
 * the confirmed engine standard (Kelly Mulroy reference — see CLAUDE.md's
 * "Visual language" note). All program content, loads, and clinical flags
 * are carried over 1:1 from the source; only rendering changed.
 *
 * isPostmenopausal is set true because the source document already applies
 * the ICONS pelvic-floor protocol verbatim ("If you experience any leaking,
 * heaviness, or pressure — stop and flag your coach. This is common and
 * treatable.") on every heavy-load exercise — that's the documented trigger
 * for postmenopausal clients, so buildDocument() now inserts it automatically
 * instead of it being hand-repeated in every block intro and ICONS Note.
 *
 * REVISION (8/13/2026, icons-roster-analyst cross-check) — AGE BRACKET / LIFTMOR
 * NOTE ADDED: every other 45-55/55-65 bracket client on the roster (Johnna
 * Macarthur, Rena Paul, Mary Burfete, Siobhan Hansen, Elizabeth Poyner)
 * carries a LIFTMOR bone-loading candidacy / T-score screening note; this
 * document had none. Added below, matching the established wording pattern
 * for her bracket (45-55, confirmed postmenopausal).
 *
 * REVISION (8/17/2026, language-only correction, per CLAUDE.md's corrected
 * "ALST Index" and "Protein Targets — re-keyed from age to context" sections):
 * this document previously labeled her ALST (7.23 kg/m²) "Optimal" and framed
 * her protein target as an automatic "50+ tier" escalation. Neither framing
 * is correct under the corrected standards — there is no female "Optimal"
 * ALST tier above 5.5 kg/m² (7.0 kg/m² is EWGSOP2's MALE at-risk cutoff, not
 * a female target), and the 2.0-2.2 g/kg protein escalation is now
 * context-driven (energy deficit, heavy training load, or ALST At-Risk), not
 * age/bracket-driven. Corrected the language throughout to "within normal
 * reference range" / context-driven protein framing — no Styku numbers, load
 * numbers, or exercise/training content were changed. `proteinTargets()` in
 * icons_template.js has not yet been updated to the corrected logic (see
 * CLAUDE.md's Research Update Log, 8/17/2026 pass), so the rendered
 * nutrition block's actual g/day figure still reflects the prior formula
 * pending that engine fix.
 *
 * REVISION (8/18/2026, science-layer language sweep — completion pass; no
 * training content, loads, or exercise selection changed):
 *   - VFA: the client-visible "Moderate Cardiometabolic Risk / 100-149 cm²
 *     moderate-risk band" label is removed. CLAUDE.md retired that entire
 *     4-tier VFA table 8/17/2026 — no consensus body endorses a single
 *     VFA cutoff, and Styku's own visceral-fat output was validated
 *     against DXA in KILOGRAMS, never CT in cm². Her 142.7 cm² reading is
 *     genuinely elevated and is still stated plainly as such (no false
 *     reassurance) — it is simply framed as a personal trend figure with
 *     the methodology caveat and waist circumference named as the primary
 *     clinical-facing metric going forward.
 *   - Asymmetry: the retired absolute 0.5 lb trigger is removed from all
 *     client-visible copy (baselineNotes, Day 2 intensityPara, Day 2
 *     Block C intro, Day 3 intensityPara/iconsNote, milestones8wk,
 *     rescanNote). Recomputed under the corrected >=10% RELATIVE trigger,
 *     her legs (17.5 vs 18.0 lbs) are only ~2.8% apart and do NOT clear
 *     it. Per the Nicolette Scott precedent, the LEFT-LED PRESCRIPTION IS
 *     LEFT UNCHANGED — that is a per-client clinical decision, not a
 *     language fix — and a new audience:'internal' note documents the
 *     discrepancy explicitly for that review.
 *   - Styku section added: this script previously had no `styku` key at
 *     all, so the document rendered no scan data even though its own
 *     prose references "your Styku scan" repeatedly. Rendered at that
 *     point from engine primitives, because only six of the twelve
 *     fields `stykuBlock()` interpolates were on record.
 *   - ALST note split per the Client View standard: the clinical read
 *     stays client-visible; the CLAUDE.md citation and dated-correction
 *     admission move to a companion audience:'internal' note.
 *
 * REVISION (8/18/2026, later same day — SOURCE STYKU PDF SUPPLIED, Styku
 * section converted to the standard engine block; no training content,
 * loads, exercise selection, or block structure changed):
 *   Xolokan supplied Johanna's source Styku PDF (scan date 8/7/2026,
 *   Brace Life Studios), which carries all twelve fields `stykuBlock()`
 *   renders. The values-on-record substitute section composed earlier
 *   today from `sectionTitle()`/`tealCallout()` primitives, and its
 *   companion audience:'internal' "fields not on file" note, are both
 *   removed as obsolete; the document now passes a standard `styku: {}`
 *   object to `buildDocument()` and renders the normal twelve-field
 *   scan grid in its standard position (before the baselines table),
 *   matching every other scanned client on the roster.
 *
 *   Three interpretation points, all preserved from this morning's
 *   science-layer sweep rather than reverted to Styku's raw dashboard
 *   labels:
 *     - ALST 7.23 kg/m² is carried as within the normal female reference
 *       range (>=5.5), tracked as a trend metric. It is NOT labeled
 *       "Optimal" — 7.0 kg/m² is EWGSOP2's MALE at-risk cutoff, and
 *       7.23 is precisely the value that would have reproduced that
 *       retired sex-conflation error. Styku's own "Not At-Risk" tag is
 *       consistent with the corrected framing.
 *     - VFA 142.7 cm² keeps the "Elevated, Tracked as a Trend" framing
 *       with the methodology caveat and waist circumference named as the
 *       primary clinical-facing metric. Styku's dashboard "High Risk"
 *       band label is deliberately not introduced; `stykuBlock()` renders
 *       the raw cm² value with no risk label, which is the preferred
 *       presentation under the corrected standard.
 *     - Body Fat 40.4% carries Styku's own "At-Risk" BODY-FAT rank
 *       verbatim in `bodyFatRank`. That is a body-composition ranking,
 *       not an ALST/sarcopenia flag, and the surrounding note now says
 *       so explicitly so the two cannot be read as the same finding.
 *   Her BMI (29.5) is now a real reported field rather than an inferred
 *   figure, and reproduces exactly from her documented 5'4"/172 lbs.
 *   Per CLAUDE.md, Styku's own computed ALST is used as reported rather
 *   than recomputed from the segmental values.
 *
 *   Circumference data from the same PDF (waist, hip, chest, limb girths,
 *   android/gynoid mass) is on file in CLIENTS.md but deliberately NOT
 *   rendered here — a measurements table is a separate document change,
 *   not part of this swap.
 *
 * REVISION (8/19/2026) — ICONS BLOCK METHOD RESTRUCTURE (roster rollout,
 * batch 1; Siobhan Hansen pilot is the reference implementation). All
 * three days resequenced onto the six-slot order (Corrective → Primary
 * Compound → Accessory → Jason's Exercise → Secondary Compound → Third
 * Compound/Integration). Organizational only: every exercise, tested
 * baseline, load, RIR tier, pelvic-floor bracing flag and left-lead
 * prescription survives verbatim; no RIR tier changed. SLOT 4 omitted on
 * all days — no Jason Bethea SOAP-note exercise exists on file for this
 * client. Metabolic finishers (her VFA/body-fat priority) stay as the
 * closing block after slot 6 on every day, per the spec's
 * finishers-may-follow rule.
 *   Per-day mapping:
 *   DAY 1 — A activation (unchanged) · B PRIMARY = DB Hip Thrust (tested
 *     baseline, battery #7 — split out of the old 3-lift primary block) ·
 *     C ACCESSORY = Chest-Supported Row + Incline Push-Up · D SECONDARY =
 *     Seated DB Overhead Press (tested baseline, battery #3 — press,
 *     rotated off the thrust primary) · E INTEGRATION = Farmers Carry +
 *     Plank (carries/core live in slot 6 by default) · F metabolic
 *     finisher unchanged.
 *   DAY 2 — A movement prep (unchanged) · B PRIMARY = Goblet Squat
 *     (battery #2, new baseline) · C ACCESSORY = unilateral left-led
 *     block (unchanged) · D SECONDARY = Trap Bar Deadlift (battery #1,
 *     new baseline — hinge, rotated off the squat primary) · E
 *     INTEGRATION = NEW light farmers carry (20-25 lbs/hand — anchored
 *     below Day 1's documented 30 lbs/hand working carry; no invented
 *     baseline; kept light so it never competes with the technique
 *     tracking this day exists for) · F metabolic finisher unchanged.
 *   DAY 3 — A scapular activation (unchanged) · B PRIMARY = Incline DB
 *     Press (battery #4 — the day's Index movement takes the primary
 *     slot; the old block ran row-first, a build-order choice, not a
 *     tested-priority statement) · C ACCESSORY = Single-Arm DB Row ·
 *     D SECONDARY = Bent-Over DB Row · E INTEGRATION = Suitcase Carry +
 *     Plank · F metabolic finisher unchanged.
 * TOUCH-RULE CHANGES in the same pass:
 *   - No cable references existed (verified — her doc is DB/machine/rower/
 *     bike only); KB swing at 25 lbs sits exactly at the studio KB
 *     ceiling — legal, no change.
 *   - Load-field Wk1→Wk4 convention applied to the two newly-baselined
 *     progressing lifts (Goblet Squat Wk1: 20 → Wk4: 25-27.5; Trap Bar
 *     DL Wk1: 45 → Wk4: 55-60 — the same numbers already in
 *     milestones4wk). Day 1's tested lifts hold at baseline by design
 *     (flat load fields stay correct for a genuinely non-progressing
 *     prescription).
 *   - 4-week strength / 8-12 week Styku cadence note added (new gold
 *     note); the two tested baselines' target text now names the 4-week
 *     check ahead of the 8-week formal retest.
 *   - DELOAD CALL — AUTOREGULATED, not proactive (documented): she is
 *     not rehab-flagged, not 65+/recovery-limited, and runs only
 *     moderate 60-70% intensities across 3 days; per CLAUDE.md's deload
 *     section she fits the "robust, well-recovering client" combined
 *     model — a planned Week 5 slot after the Week 4 check that can be
 *     pulled forward on triggers or pushed back if all signals are
 *     green. New blue client-visible note states it.
 *   - NUTRITION FRAMING CHECK (per rollout instruction): her rendered
 *     protein figure (156-172 g/day) still comes from proteinTargets()'s
 *     age>=50 formula, which CLAUDE.md retired 8/17/2026 — engine fix
 *     still pending, unchanged here. BUT the corrected context-driven
 *     standard independently supports the upper range for her: her
 *     stated fat-loss/cardiometabolic priority means she is training in
 *     an intended energy deficit, which IS a corrected-standard trigger
 *     for the 1.6-2.2 g/kg upper range (protein protects lean mass in a
 *     deficit — directly serving her strength-maintenance-under-fat-loss
 *     goal). One clause added to the Age Bracket note stating this, so
 *     the rendered figure now has correct, current reasoning behind it
 *     rather than resting on the retired age trigger.
 *   - Compound-slot expert options menus added to every compound slot,
 *     filtered by her record: every hip-thrust/carry option carries the
 *     same pelvic-floor bracing rule already flagged on those rows;
 *     Day 2 options all stay in the 3+ RIR technique band (that day's
 *     entire purpose); no swing/ballistic option is listed outside the
 *     existing finisher. VFA stays a trend metric throughout — no
 *     risk-band label anywhere (verified again post-build).
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Johanna Castillo',
  programTitle: '3-Day Training Plan',
  subtitle: 'Moderate Strength & Metabolic Conditioning Build',
  schedule: 'Tue/Thu/Sat Gym',
  stats: ['Age 51', '5\'4"', '172 lbs', '3-Day Program'],
  weightKg: 78.0,
  ageYears: 51,
  isPostmenopausal: true,
  bmr: 1451,
  alstIndex: 7.23,
};

const weekOverview = [
  { day: 'MON', intensity: 'Off', focus: 'Off' },
  { day: 'TUE', intensity: 70, focus: 'Full Body Strength\n& Conditioning' },
  { day: 'WED', intensity: 'Off', focus: 'Off' },
  { day: 'THU', intensity: 60, focus: 'Lower Body\nTechnique' },
  { day: 'FRI', intensity: 'Off', focus: 'Off' },
  { day: 'SAT', intensity: 70, focus: 'Upper Body &\nPosterior Chain' },
  { day: 'SUN', intensity: 'Off', focus: 'Off' },
];

// ── Baselines table (added 8/13/2026, roster completeness sweep) ──────────
// The script previously had no `baselines: []` array at all, even though the
// document's own text repeatedly references a real "initial testing battery"
// (intensityPara on Day 1 and Day 2, the gold "Squat & Deadlift" baseline
// note). Rows below are built ONLY from numbers the document's own language
// confirms one way or the other — nothing re-derived or guessed:
//   - DB Hip Thrust (60 lbs, Day 1 Block B) and Seated DB Overhead Press
//     (17.5 lbs, Day 1 Block B) are explicitly named in the Day 1
//     intensityPara as "today's tested baselines (Hip Thrust, Seated OHP)"
//     and again in the Week 1 summary row ("Working loads hold at tested
//     baseline") — confirmed tested, real numbers pulled straight from
//     their exercise-table load fields.
//   - Goblet Squat (20 lbs) and Trap Bar Deadlift (45 lbs), both Day 2
//     Block B, are explicitly the opposite case — the Day 2 intensityPara
//     ("Squat and deadlift were not tested in the initial battery"), the
//     Block B intro ("No baseline was recorded for squat or deadlift"),
//     and the gold baselineNote below all confirm these were NOT part of
//     the initial battery and instead become the new Week 1 baseline this
//     week — matching the Johnna Macarthur "Not Tested — Established This
//     Week" precedent (see scripts/johnna_macarthur_3day_plan.js) rather
//     than being presented as if pre-tested.
// No calendar date is stated anywhere in the source document for when the
// initial battery was run (unlike Nancy Avitable/Johnna Macarthur, where
// Xolokan supplied a dated battery) — rather than inventing one, the TESTED
// AT column uses the document's own phrasing ("Initial Testing Battery" /
// "This Week").
//
// Checked every other Day 1/Day 3 exercise for similar "tested" language
// (Chest-Supported Row, Incline Push-Up, DB Farmers Carry, Plank Hold,
// Bent-Over DB Row, Incline DB Press, Single-Arm DB Row, Suitcase Carry) —
// none is ever called "tested" or "baseline" anywhere in the document; only
// Hip Thrust, Seated OHP, Squat, and Deadlift carry that language. Per the
// "flag ambiguity rather than guess" instruction, these are deliberately
// NOT added to the baselines table as if their origin were confirmed — see
// the new watch-type baselineNote below. This doesn't leave a program gap:
// Johanna is 51 (CLAUDE.md's 40–55 bracket), and the core-protocol movements
// among that list (DB Farmers Carry, Plank Hold, Incline DB Press,
// Single-Leg RDL, Reverse Lunge, Incline Push-Up) already satisfy the ICONS
// Index Full-Spectrum Progression Standard via their presence in `days[].
// exercises[]` — the standard only requires programmed progression
// somewhere in baselines[]/exercises[]/summary, not a baselines-table row
// specifically.
const baselines = [
  ['DB Hip Thrust', '60 lbs × 8', 'Initial Testing Battery', 'Day 1 working load holds at tested baseline (60 lbs × 8, 2 RIR) — re-checked at the 4-week strength check; formal retest at 8 weeks'],
  ['Seated DB Overhead Press', '17.5 lbs × 8', 'Initial Testing Battery', 'Day 1 working load holds at tested baseline (17.5 lbs × 8, 2 RIR) — re-checked at the 4-week strength check; formal retest at 8 weeks'],
  ['Goblet Squat (Back Squat)', 'Not Tested — Established This Week', 'This Week', 'Wk1 working load 20 lbs × 8 (Day 2 Block B) — becomes the new 8-week baseline'],
  ['Trap Bar Deadlift', 'Not Tested — Established This Week', 'This Week', 'Wk1 working load 45 lbs × 6 (Day 2 Block B) — becomes the new 8-week baseline'],
];

// Styku body composition scan — full twelve-field record, transcribed from
// the source Styku PDF supplied 8/18/2026 (scan date 8/7/2026, Brace Life
// Studios). This replaces the values-on-record substitute section composed
// earlier the same day from engine primitives, which existed only because
// six of these twelve fields were not yet on record and `stykuBlock()`
// interpolates all twelve unconditionally.
//
// Values are carried exactly as Styku reports them, with two deliberate
// framing decisions handled in the notes below rather than in this object:
// her ALST (7.23 kg/m²) is Styku's own computed figure and is used as
// reported per CLAUDE.md rather than recomputed from the segmental values
// (a manual arms+legs/height^2 gives ~9.0, which is expected), and her VFA
// is passed as a raw cm² value with no risk-band label attached.
const styku = {
  scanDate: '8/7/2026',
  bodyFatPct: 40.4,
  bodyFatRank: 'At-Risk',
  leanMass: 97.7,
  leanMassPct: 56.9,
  fatMass: 69.4,
  boneMass: 4.7,
  bmi: 29.5,
  bmr: 1451,
  vfa: 142.7,
  shapeScore: 54,
  shapeScoreLabel: 'Needs Improvement',
  alstIndex: 7.23,
  leftArmLST: 8.7,
  rightArmLST: 8.4,
  leftLegLST: 17.5,
  rightLegLST: 18.0,
  peerComparison: 'Lower body fat than 20% of your peers',
};

const baselineNotes = [
  {
    type: 'green',
    label: 'ALST Index Within Normal Reference Range — 7.23 kg/m²',
    body: 'Well above the 5.5 kg/m² EWGSOP2 female at-risk cutoff — not At-Risk, and there is no higher "Optimal" tier above that threshold for women. Read this as a healthy number tracked as a trend over time, not a graded score. This program layers strength maintenance under a fat-loss/cardiometabolic focus rather than muscle-building-primary — loads hold at tested baselines while the conditioning finisher does the heavy lifting on body composition.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'ALST Threshold Basis — Female Cutoff, Sex-Conflation Correction',
    body: 'The ALST framing above reflects CLAUDE.md\'s "ALST Index" section as corrected 8/17/2026: the prior three-tier women\'s scale wrongly presented EWGSOP2\'s 7.0 kg/m² figure as a female "Optimal" target, when 7.0 is the separate MALE at-risk threshold — there is no female Optimal tier in EWGSOP2 or any consensus body reviewed. Only the <5.5 kg/m² female at-risk floor applies to Johanna, and per the same correction, ALST should be presented as a trend metric rather than a precise risk classification (Styku\'s own ALM/ALMI output is not validated in its published validation study).',
  },
  {
    type: 'watch',
    label: 'VFA 142.7 cm² — Elevated, Tracked as a Trend',
    body: 'A genuinely elevated reading, and one of the two findings driving the conditioning finisher on every training day — brisk, sustainable work, not max-effort testing. Read it as a personal trend figure to follow scan over scan rather than a graded risk classification: no consensus body endorses a single visceral-fat cutoff, published thresholds vary widely, and this scanner\'s visceral-fat output was validated against DXA in kilograms rather than CT in cm², so the absolute number carries real individual-level uncertainty. Waist circumference, measured to protocol, is the primary clinical-facing metric going forward — add it at the next scan and track the two together.',
  },
  {
    type: 'watch',
    label: 'Body Fat 40.4% — Styku Body-Fat Rank At-Risk',
    body: 'This is Styku\'s own body-fat ranking, a body-composition figure — separate from the ALST lean-mass reading above, which is within normal reference range. Tracked alongside VFA as the cardiometabolic/fat-loss priority for this block, which is what the conditioning finisher on each training day is built for. Her BMI reads 29.5, in the standard overweight band and just under the 30 cutoff; read it alongside body composition rather than on its own. Reassess all three at the 8-week Styku rescan.',
  },
  {
    type: 'teal',
    label: 'Segmental Lean Mass — Left Leg Leads Unilateral Work',
    body: 'Left Leg 17.5 lbs / Right Leg 18.0 lbs — the left leg reads as the lighter side on this scan and leads every unilateral lower-body exercise in this program, which caps the stronger side at what the weaker side can match. Log left and right loads separately, and recheck both figures at the next rescan.',
  },
  {
    type: 'teal',
    label: 'Segmental Lean Mass — Arms (Monitor Only)',
    body: 'Left Arm 8.7 lbs / Right Arm 8.4 lbs — a small difference, well inside the range read as routine scan-to-scan variation. Logged per side on the single-arm row and suitcase carry as monitoring only; no lead-side prescription is applied to upper-body work.',
  },
  {
    type: 'watch',
    audience: 'internal',
    label: 'Asymmetry Trigger Recalculation — Flagged Discrepancy (8/18/2026)',
    body: 'CLAUDE.md\'s Asymmetry Protocol trigger was corrected 8/17/2026 from an absolute 0.5 lb L/R gap to a relative ≥10% gap — the old absolute figure was firing on measurement noise, since device error on Styku\'s segmental lean-mass readings runs several times larger than half a pound. Recomputed against this client\'s actual numbers: Left Leg 17.5 lbs / Right Leg 18.0 lbs is a 0.5 lb gap but only ~2.8% relative, so it met the OLD absolute trigger exactly and does NOT clear the corrected ≥10% threshold. Arms (8.7 vs 8.4 lbs, ~3.4% relative) sit below the trigger either way. Per the Nicolette Scott precedent, the left-leg-leads prescription already programmed into Day 2 Block C (Single-Leg RDL, Reverse Lunge) is left UNCHANGED pending a dedicated per-client clinical review — this note exists to make the discrepancy visible for that review, not to resolve it silently. A functional single-leg strength or power test is the preferred primary trigger going forward. Flagged to the main thread / icons-expert.',
  },
  {
    type: 'gold',
    label: 'Squat & Deadlift — Baseline Established This Week',
    body: 'Not part of the initial testing battery. Today\'s working loads (Goblet Squat 20 lbs, Trap Bar Deadlift 45 lbs) become the new 8-week baseline — track progression from here.',
  },
  {
    type: 'gold',
    label: 'Age Bracket — Perimenopause / Menopause Transition (45–55)',
    body: 'At 51, Johanna sits in the 45–55 age bracket, confirmed postmenopausal. Creatine is strongly indicated by age and postmenopausal status alike. Protein moves up within the 1.6–2.2 g/kg range for a genuine energy deficit, heavy training load, or ALST At-Risk status — not for age or postmenopausal status alone (Johanna\'s ALST, 7.23 kg/m², is well within normal reference range). For Johanna specifically, the fat-loss priority driving this program means training in an intended energy deficit — and that deficit is exactly the condition that puts her protein target toward the upper end of the range: protein is what protects the lean mass this program is built to keep while the body fat comes down. LIFTMOR-style bone-loading candidacy screening (T-score < -1.0) is worth introducing as part of ongoing care as estrogen decline accelerates through this window — framed as "bone investment," not added risk — though no DEXA/T-score data is currently on file to confirm candidacy either way.',
  },
  {
    type: 'gold',
    label: 'Reassessment Cadence',
    body: 'Strength reassessment runs every 4 weeks: the tested lifts in the table above get re-checked against their Week 4 targets and working loads reset from the result, with the formal full retest of the newly-baselined squat and deadlift at 8 weeks. Body-composition rescanning runs on its own longer cycle of 8–12 weeks — the two are tracked separately, not on the same clock.',
  },
  {
    type: 'blue',
    label: 'Planned Deload Slot — Week 5, Flexible',
    body: 'One lighter week is built into this program\'s calendar: Week 5, directly after the Week 4 strength check, is the standing deload ("reload") slot — same movements, working sets roughly halved, loads at about 50–70% of normal working weights, every set comfortably sub-maximal, conditioning finishers kept but easy. At this program\'s moderate intensities the slot is flexible rather than fixed: if energy, sleep, and sessions all feel strong at Week 4, it can slide a week later; if soreness or flat sessions show up earlier, it moves up. One light week costs nothing that matters — it is where the previous month\'s work consolidates before the push toward the 8-week retest and rescan.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Session Architecture — ICONS Block Method Restructure (8/19/2026)',
    body: 'Restructured to the ICONS Block Method six-slot order in the roster rollout (batch 1) — organizational only; every exercise, tested baseline, load, RIR tier, pelvic-floor bracing flag and left-lead prescription preserved verbatim, no RIR tier changed. Slot 4 omitted all days (no Jason Bethea SOAP-note exercise on file). Mapping: Day 1 — Hip Thrust primary (tested battery lift) / Chest-Supported Row + Incline Push-Up accessory / Seated OHP secondary / Farmers Carry + Plank integration / finisher last. Day 2 — Goblet Squat primary / unilateral left-led accessory / Trap Bar DL secondary / NEW light farmers carry integration (20–25 lbs/hand, anchored below Day 1\'s 30 lbs/hand — no invented baseline) / finisher last. Day 3 — Incline DB Press promoted to primary (battery #4; the old row-first order was build-order, not tested priority) / SA Row accessory / Bent-Over Row secondary / Suitcase Carry + Plank integration / finisher last. Deload call: AUTOREGULATED (flexible Week 5 slot), not proactive — she is not rehab-flagged, not 65+/recovery-limited, and runs only 60–70% intensities over 3 days; documented against CLAUDE.md\'s deload criteria. Nutrition framing: the rendered 156–172 g/day figure still comes from proteinTargets()\'s retired age≥50 formula (engine fix pending per CLAUDE.md), but her intended fat-loss deficit is a genuine corrected-standard trigger for the same upper range — the Age Bracket note now states that deficit-context reasoning so the figure rests on current grounds. Options menus filtered: all hip-thrust/carry options carry the pelvic-floor bracing rule; Day 2 options stay in the 3+ RIR technique band; REJECTED — kettlebell swing as a hinge-slot option (ballistic work lives only in her existing finisher, and Day 2 is a technique-introduction day), and any barbell back-squat option (squat pattern is one week old — goblet/box variants only until the pattern is established).',
  },
  {
    type: 'watch',
    label: 'Baselines Table Scope — Confirmed Tested Lifts Only',
    body: 'The table above lists only the lifts this program explicitly documents as tested (Hip Thrust, Seated OHP) or explicitly documents as newly established this week (Goblet Squat, Trap Bar Deadlift). Other core ICONS movements in this program — DB Farmers Carry, Plank Hold, Incline DB Press, Single-Leg RDL, Reverse Lunge, Incline Push-Up — carry real current working loads in their exercise tables but are not labeled tested or untested anywhere in the source record, so their loads are not presented here as confirmed baselines. Confirm with the trainer whether these were part of the same initial battery before treating them as retest-tracked baselines.',
    // Client View (added 8/17/2026): documentation-methodology note written
    // for the trainer/build-process ("confirm with the trainer...") — not
    // appropriate to send directly to the client. See CLAUDE.md's "CLIENT
    // VIEW" section, which cites this exact note as its worked example.
    audience: 'internal',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Full Body Strength & Metabolic Conditioning',
    subtitle: 'Moderate Strength + Cardiometabolic Priority',
    descriptor: 'Moderate Strength · Volume Build · Conditioning Priority',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate strength, building volume without peak CNS demand. Loads sit on today\'s tested baselines (Hip Thrust, Seated OHP) while a conditioning finisher supports the VFA and body-fat priority from your Styku scan. This is strength maintenance layered under fat-loss focus, not muscle-building-primary — your ALST is well within normal reference range at 7.23 kg/m².',
    warmUp: '5 min bike, band pull-aparts x15, bodyweight squat x10, glute bridge x10, arm circles x10/direction',
    blocks: [
      {
        letter: 'A',
        title: 'GLUTE ACTIVATION & CORE BRACING',
        introLabel: 'Why',
        intro: 'Bracing pattern rehearsed here carries directly into the loaded hip thrust and carry work in Block B/C.',
        exercises: [
          { name: 'Banded Glute Bridge', sets: '2', reps: '12', load: 'mini band', tempo: '2-1-2', rest: '45s', cue: 'Squeeze glutes, ribs down, band stays taut.' },
          { name: 'Dead Bug', sets: '2', reps: '8/side', load: 'bodyweight', tempo: '3-1-1', rest: '45s', cue: 'Brace low back flat, slow controlled reach.' },
          { name: 'Bird Dog', sets: '2', reps: '8/side', load: 'bodyweight', tempo: '2-2-2', rest: '30s', cue: 'Neutral spine, reach long, no hip rotation.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — HIP THRUST (ICONS BATTERY)',
        introLabel: 'Load Target',
        intro: 'Working sets at 70% — 2 RIR, holding at the tested 60 lbs × 8 baseline. If the day calls for a variation, rotate between: a barbell hip thrust in the rack, a B-stance hip thrust (one leg takes the working share), or a heavier banded glute bridge — every option keeps the same brace-and-exhale rule as the lift itself. The DB hip thrust stays the tested lift we track and retest.',
        exercises: [
          { name: 'DB Hip Thrust', sets: '3', reps: '8', load: '60 lbs', tempo: '2-1-2', rest: '90s', flag: 'Brace + exhale on exertion — pelvic floor cue', cue: 'Drive through heels, glutes lock at top.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — UPPER PULL & PUSH',
        color: 'gold',
        introLabel: 'Note',
        intro: 'Hypertrophy accessories behind the primary — a strict supported pull, then the incline push-up progression.',
        exercises: [
          { name: 'Chest-Supported Row', sets: '3', reps: '10', load: '20 lbs', tempo: '2-1-2', rest: '75s', cue: 'Squeeze shoulder blades, elbows track back.', rirNote: '2 RIR' },
          { name: 'Incline Push-Up', sets: '3', reps: '8', load: 'bodyweight (bench)', tempo: '3-1-1', rest: '60s', cue: 'Hands under shoulders, chest to bench, brace.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — SEATED OVERHEAD PRESS (ICONS BATTERY)',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound — pressing, rotated off the hip work above, holding at the tested 17.5 lbs × 8 baseline. If the day calls for a variation, rotate between: a standing DB press, a half-kneeling single-arm press, or a landmine press (the friendliest arc). The seated DB press stays the tested lift we track and retest.',
        exercises: [
          { name: 'Seated DB Overhead Press', sets: '3', reps: '8', load: '17.5 lbs', tempo: '2-0-2', rest: '75s', cue: 'Ribs stacked over hips, press straight up.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — LOADED CARRY & CORE',
        color: 'gold',
        introLabel: 'Note',
        intro: 'The session\'s closing compound work: the carry pulls the day\'s brace, posture and hip strength into upright gait, and the plank holds the same brace statically. Farmers Carry is bilateral load-bearing — same pelvic floor bracing cue applies before every pass. When a variation suits the day, a suitcase carry (one hand, log sides) or a front-rack carry covers the same ground at the same bracing standard.',
        exercises: [
          { name: 'DB Farmers Carry', sets: '3', reps: '40 yd', load: '30 lbs/hand', tempo: 'controlled', rest: '60s', flag: 'Brace before lifting — pelvic floor cue', cue: 'Tall posture, ribs down, quick tight steps.', rirNote: '2 RIR' },
          { name: 'Plank Hold', sets: '3', reps: '40 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'F',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Short conditioning finisher supports the cardiometabolic/fat-loss priority driven by elevated VFA and body fat %. Brisk and sustainable — not a max-effort test.',
        exercises: [
          { name: 'Kettlebell Swing', sets: '4', reps: '20 sec on/40 off', load: '25 lbs', tempo: 'explosive hip snap', rest: '40 sec', cue: 'Hinge, snap hips, arms stay relaxed.' },
          { name: 'Step-Up', sets: '4', reps: '20 sec on/40 off', load: 'bodyweight', tempo: 'controlled', rest: '40 sec', cue: 'Drive through full foot, stand tall at top.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, doorway chest stretch 30s/side, child\'s pose 45s',
    iconsNote: 'Cardiometabolic priority this block — VFA 142.7 cm² and body fat 40.4% drive the conditioning finisher. Keep bracing before every hip thrust and carry rep, exactly as flagged above.',
  },
  {
    intensity: 60,
    title: 'Day 2 — Lower Body Technique',
    subtitle: 'Squat & Deadlift Introduction + Left-Leg Asymmetry Protocol',
    descriptor: 'Technique Day · Lighter Loads · Full Attention to Form',
    intensityLabel: '60% Day',
    intensityPara: 'Squat and deadlift were not tested in the initial battery, so today\'s loads are deliberately light and become the new 8-week baseline. Left leg leads every unilateral set — segmental lean mass reads lighter on the left (17.5 vs 18.0 lbs), so the left side sets the working load and the right matches it. Work every set at 3+ RIR.',
    warmUp: '5 min bike, hip circles x10/direction, banded lateral walk x10/side, bodyweight squat x10, glute bridge x10',
    blocks: [
      {
        letter: 'A',
        title: 'MOVEMENT PREP',
        introLabel: 'Why',
        intro: 'General hip and glute activation before the squat and unilateral patterns below.',
        exercises: [
          { name: 'Banded Lateral Walk', sets: '2', reps: '10 steps/side', load: 'mini band', tempo: 'continuous', rest: '30s', cue: 'Band above knees, push knees out, stay low.' },
          { name: 'Bodyweight Squat to Box', sets: '2', reps: '10', load: 'bodyweight', tempo: '3-1-1', rest: '30s', cue: 'Sit back to box, knees track over toes.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — GOBLET SQUAT (TECHNIQUE INTRODUCTION)',
        introLabel: 'Load Target',
        intro: 'No baseline was recorded for squat. Loads stay light; the goal is a clean, repeatable pattern for 8-week testing, not load — Week 1\'s 20 lbs becomes the new baseline and builds toward 25–27.5 lbs by Week 4. If the day calls for a variation, rotate between: a box squat to bench height (depth set by the box) or a banded goblet squat (band above knees for tracking feedback) — both at the same easy technique effort. The goblet squat stays the movement we track and retest.',
        exercises: [
          { name: 'Goblet Squat', sets: '3', reps: '8', load: 'Wk1: 20 → Wk4: 25–27.5 lbs', tempo: '3-1-1', rest: '75s', cue: 'Elbows inside knees, chest tall, full depth.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — UNILATERAL LEG (LEFT-LED)',
        introLabel: 'Why',
        intro: 'Segmental lean mass reads lighter on the left (L 17.5 / R 18.0 lbs), so the left leg leads every set below and sets the working load. Log reps per side.',
        exercises: [
          { name: 'Single-Leg RDL', sets: '3', reps: '6/side', load: '22.5 lbs/hand', tempo: '3-1-1', rest: '60s', flag: 'Left leg weaker (Styku) — leads every set', cue: 'Left leg first. Hinge, flat back, soft knee.', rirNote: '2 RIR' },
          { name: 'Reverse Lunge', sets: '3', reps: '8/side', load: 'bodyweight', tempo: '2-1-1', rest: '60s', flag: 'Left leg leads', cue: 'Left leg first. Knee tracks over mid-foot.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — TRAP BAR DEADLIFT (TECHNIQUE INTRODUCTION)',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound — a hinge, rotated off the squat pattern above. No baseline was recorded for deadlift; Week 1\'s 45 lbs becomes the new baseline and builds toward 55–60 lbs by Week 4, technique governing every step. If the day calls for a variation, rotate between: a two-DB deadlift or an elevated trap-bar pull (bar raised on blocks — a shorter range while the pattern beds in). The trap bar lift stays the movement we track and retest.',
        exercises: [
          { name: 'Trap Bar Deadlift', sets: '3', reps: '6', load: 'Wk1: 45 → Wk4: 55–60 lbs', tempo: '2-1-1', rest: '90s', cue: 'Flat back, brace, push floor away evenly.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — LOADED CARRY (LIGHT)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The closing compound: a short, light farmers carry integrates the day\'s new squat and hinge patterns into upright, braced gait — deliberately lighter than Day 1\'s working carry, so it never competes with the technique tracking this session exists for. Brace before every pickup, exactly as flagged on Day 1.',
        exercises: [
          { name: 'DB Farmers Carry (Light)', sets: '2', reps: '30 yd', load: '20–25 lbs/hand', tempo: 'controlled', rest: '60s', flag: 'Brace before lifting — pelvic floor cue', cue: 'Tall posture, ribs down — the quality of the carry is the exercise, not the load.' },
        ],
      },
      {
        letter: 'F',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Low-impact conditioning to close the session without adding lower-body fatigue that would compromise squat/deadlift technique tracking.',
        exercises: [
          { name: 'Rowing Machine Intervals', sets: '5', reps: '30 sec on/30 off', load: 'moderate', tempo: 'steady power', rest: '30 sec', cue: 'Legs drive first, then lean, then pull.' },
          { name: 'Standing March w/ Band', sets: '3', reps: '10/side', load: 'light band', tempo: 'controlled', rest: '30s', cue: 'Knee to hip height, stand tall, no lean.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, standing quad stretch 30s/side, child\'s pose 45s',
    iconsNote: 'First exposure to squat and deadlift patterns — log today\'s working loads as the new baseline for 8-week testing. Left leg leads all unilateral work this block; track the L/R gap at rescan.',
  },
  {
    intensity: 70,
    title: 'Day 3 — Upper Body & Posterior Chain',
    subtitle: 'Pressing/Pulling Strength + Metabolic Finisher',
    descriptor: 'Moderate Strength · Volume Build · Conditioning Priority',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate strength, building pressing/pulling volume without peak CNS demand. Single-arm row and suitcase carry are logged per side given the marginal right-arm difference on Styku (8.4 vs 8.7 lbs — a small gap tracked as routine monitoring, not a lead-side prescription).',
    warmUp: '5 min bike, band pull-apart x15, scapular wall slide x10, arm circles x10/direction',
    blocks: [
      {
        letter: 'A',
        title: 'SCAPULAR ACTIVATION',
        introLabel: 'Why',
        intro: 'Shoulder prep before pressing and rowing loads.',
        exercises: [
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'light band', tempo: '2-1-2', rest: '30s', cue: 'Squeeze shoulder blades, elbows stay straight.' },
          { name: 'Scapular Wall Slide', sets: '2', reps: '10', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Ribs down, slide arms, keep low back flat.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — INCLINE DB PRESS (ICONS BATTERY)',
        introLabel: 'Load Target',
        intro: 'Working sets at 70% — 2 RIR. The incline press is the day\'s primary compound and its tracked battery movement. If the day calls for a variation, rotate between: a flat DB bench press or a lower-incline press — same pattern, same effort standard. The incline DB press stays the lift we track and retest.',
        exercises: [
          { name: 'Incline DB Press', sets: '3', reps: '8', load: '17.5 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Ribs down, press up and slightly in.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — SINGLE-ARM ROW',
        color: 'gold',
        introLabel: 'Note',
        intro: 'Pulling accessory behind the press — logged left and right per the marginal Styku arm gap (monitoring only, no lead-side prescription).',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '10', load: '20 lbs', tempo: '2-1-2', rest: '60s', flag: 'Log reps per side — track L/R (Styku)', cue: 'Brace on bench, pull to hip, no rotation.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — BENT-OVER DB ROW',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound — a bilateral pull, rotating off the pressing above. Working sets at 70% — 2 RIR. If the day calls for a variation, rotate between: a chest-supported row (the strict, back-friendly line — Day 1\'s movement) or an inverted row on the bar in the rack. The bent-over DB row stays the lift we track.',
        exercises: [
          { name: 'Bent-Over DB Row', sets: '3', reps: '10', load: '20 lbs/hand', tempo: '2-1-2', rest: '75s', cue: 'Flat back, pull to hip, squeeze at top.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — SUITCASE CARRY & CORE',
        color: 'gold',
        introLabel: 'Note',
        intro: 'The session\'s closing compound work: the suitcase carry loads the pelvic floor bracing pattern under single-side load — same cue as flagged above — and the plank holds the same brace statically. Log carry sides per the routine arm monitoring. A two-hand farmers carry (Day 1\'s movement) covers the same ground when a variation suits the day.',
        exercises: [
          { name: 'Suitcase Carry', sets: '3', reps: '30 yd/side', load: '25 lbs', tempo: 'controlled', rest: '60s', flag: 'Brace before lifting — pelvic floor cue', cue: 'Ribs stacked, resist leaning, quick steps.', rirNote: '2 RIR' },
          { name: 'Plank Hold', sets: '3', reps: '40 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'F',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Closing conditioning block supports the cardiometabolic/fat-loss priority. Brisk and sustainable — not a max-effort test.',
        exercises: [
          { name: 'Bike Sprint Intervals', sets: '5', reps: '20 sec on/40 off', load: 'moderate', tempo: 'high effort, controlled', rest: '40 sec', cue: 'Brisk and sustainable — not a max effort test.' },
          { name: 'Bodyweight Squat to Stand', sets: '3', reps: '12', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Full stand each rep, exhale on the way up.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s/side, lat stretch 30s/side, cat-cow x8',
    iconsNote: 'Log single-arm row and suitcase carry reps per side — right arm is marginally lighter on Styku (8.4 vs 8.7 lbs), tracked as routine monitoring rather than a formal lead-side protocol. Keep bracing on the suitcase carry, as flagged above.',
  },
];

const summary = {
  subtitle: 'Johanna Castillo  ·  ICONS Index  ·  Moderate Strength & Metabolic Conditioning Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Full Body Strength & Metabolic Conditioning', 'DB Hip Thrust', 'Working loads hold at tested baseline; conditioning finisher drives VFA/body-fat priority'],
    ['2', '60%', 'Lower Body Technique', 'Goblet Squat / Trap Bar Deadlift', 'New baseline established — left leg leads all unilateral work'],
    ['3', '70%', 'Upper Body & Posterior Chain', 'Bent-Over DB Row', 'Single-arm row & suitcase carry tracked per side — monitor right-arm gap'],
  ],
  milestones4wk: 'Squat 25–27.5 lbs × 8 @ 2–3 RIR. Trap bar deadlift 55–60 lbs × 6. Hip thrust progressing toward 70 lbs. Left-leg single-leg RDL load matched to right within 10%. Week 4 carries the standing 4-week strength check — tested lifts re-checked and working loads reset from the result — with the flexible Week 5 deload slot (see the deload note above) following it.',
  milestones8wk: 'Reached through the Week 4 strength check, the flexible Week 5 deload slot, and the weeks that rebuild from it: squat/deadlift 8-week retest against today\'s new baseline. VFA and body fat % trending down from 142.7 cm² / 40.4%. Left/right leg lean-mass gap (currently 17.5 vs 18.0 lbs) holding steady or narrowing. Hip thrust and OHP progressed from current working loads.',
  rescanNote: 'Rebook Styku scan at 8 weeks. Track: VFA and body fat % direction, left/right leg LST gap (currently 17.5 vs 18.0 lbs, roughly 3% — track the percentage, not the raw pounds), arm LST gap (currently 8.7 vs 8.4 lbs, monitor only), ALST maintenance (currently 7.23 kg/m², within normal reference range).',
};

const data = {
  client,
  styku,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'johanna_castillo');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Johanna_Castillo_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — same data object, filtered. Three
  // notes are marked audience: 'internal': the "Baselines Table Scope"
  // build-methodology note, the ALST sex-conflation-correction citation,
  // and the 8/18/2026 asymmetry-trigger discrepancy flag. (A fourth,
  // recording which Styku fields were missing, was removed 8/18/2026 once
  // the source scan PDF arrived.) The client-facing clinical content each
  // of those sits beside — the ALST read, the segmental lean-mass
  // prescriptions, and the full Styku scan grid itself — stays visible in
  // both documents. No real documented PR/progress-since-last-version
  // exists on file for her, so no clientHighlight is set.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Johanna_Castillo_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
