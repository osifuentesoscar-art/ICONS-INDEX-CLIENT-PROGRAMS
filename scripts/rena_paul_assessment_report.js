/**
 * Rena Paul — ICONS Performance Assessment Report (Initial Baseline)
 * Brace Life Studios
 *
 * PILOT for the new `buildAssessmentReport()` document type (see
 * `icons_template.js`'s "ICONS PERFORMANCE ASSESSMENT REPORT" section),
 * built to the exact structural/visual spec of the Anna Samuelsson ICONS
 * Performance Assessment reference document (Xolokan's confirmed standard
 * for this report type). This is a DISTINCT deliverable from Rena's
 * existing `Rena_Paul_2Day_Training_Plan.docx` (built via `buildDocument()`)
 * — it is the initial-baseline assessment CLAUDE.md's "NEW CLIENT
 * ONBOARDING" checklist names as step 1, documenting the same 8/8/2026
 * Styku scan + 11-exercise strength battery her training plan was built
 * from, rather than a training plan itself.
 *
 * CLIENT SELECTION (see final report to Xolokan for full reasoning):
 * chosen from the active roster as the client with the most complete
 * baseline data on file for THIS report type specifically — a full 8-box
 * Styku scan (all of Body Fat/Lean Mass/Fat Mass/Bone Mass/BMI/BMR/Shape
 * Score/VFA plus full segmental L/R arm+leg data) AND a strength-testing
 * battery covering 9 of the 10 core ICONS Baseline Testing Protocol
 * movements with real tested weights/reps (only Back Squat untested — held
 * out and shown as "Not Tested Today," the same pattern the Anna Samuelsson
 * reference itself uses for its own two untested movements), plus the bonus
 * Pull-Up test also genuinely tested (unlike Anna's, which was untested).
 *
 * FULL EXISTING RECORD READ FIRST, per the standing pre-build rule: this
 * script's data is drawn entirely from CLIENTS.md's "Rena Paul" entry and
 * her existing `scripts/rena_paul_2day_plan.js` in full — no new clinical
 * facts are introduced, only re-presented in this report's format. Where a
 * fact could only be estimated (Level per exercise — an explicit coach
 * judgment call per CLAUDE.md's spec, "combining an ExRx 1RM-based
 * reference table with a visual assessment of movement quality" — this
 * repo has no live trainer to consult, so Levels below are a reasonable,
 * conservative illustrative assignment for this pilot and should be
 * confirmed/adjusted by Rena's actual trainer before delivery).
 *
 * SCIENCE-LAYER LANGUAGE: uses CLAUDE.md's 8/17/2026-corrected framing
 * throughout — ALST as a 2-tier trend metric ("within normal reference
 * range," no graded "Optimal" tier), VFA as a single trend tag ("Very Low")
 * paired with the methodology caveat (not the retired 4-tier risk table),
 * and the Asymmetry Protocol's corrected ≥10% relative trigger (both of
 * Rena's segmental gaps compute well under 10% and are shown as monitor-
 * only, not triggering a unilateral-lead prescription from this scan alone
 * — her training plan's existing left-leg-led work predates this doc and
 * is not itself re-evaluated here, since a real Styku-only asymmetry
 * recompute is `icons-roster-analyst`/`icons-operations-analyst` work per
 * CLAUDE.md's "Retroactive scope" note, not something to silently change
 * from inside a new report script).
 *
 * FOOTNOTES: 9 total. Footnotes 1-7 reuse the engine's DEFAULT_ASSESSMENT_
 * FOOTNOTES() generic methodology language verbatim (Body Fat Rank / BMR /
 * Shape Score / VFA / Peer Comparison / ALST / % BW & Level — all directly
 * applicable to Rena's data with no edits needed). Footnotes 8-9 are new,
 * exercise-specific caveats (Deadlift bone-loading claim scope; Hip Thrust
 * co-activation-vs-strengthening distinction) attached via
 * `benefitLinesFromLibrary()`'s override parameter, matching how Anna's
 * reference document's own footnotes 8-9 covered the identical two claims.
 *
 * JASON'S PT NOTES: deliberately NOT populated for this delivered document
 * — Rena has no in-house PT/rehab flag or SOAP-note data on file (no
 * frozen shoulder, no tendinosis, nothing coordinated with Jason Bethea),
 * so inserting a placeholder-labeled example into her real, deliverable
 * report would be decorative/confusing rather than informative (same
 * "use judgment, don't insert decoratively" rule CLAUDE.md's Studio Staff
 * section already applies to naming Jason/Niko). The `jasonNotesSection()`
 * primitive itself was verified separately (a throwaway smoke-test script,
 * not part of this delivered document) to confirm it renders correctly
 * when supplied.
 *
 * No corrections: `data.corrections` intentionally omitted — this is a
 * first build, not a revision of a prior report, so the methodology
 * page's corrections box renders its standard "first build" message.
 */

const fs = require('fs');
const path = require('path');
const { buildAssessmentReport, benefitLinesFromLibrary, pctOfBodyweight } = require('./icons_template');

const BW = 116; // lbs, matches client.weightKg 52.6 in her training-plan script

const client = {
  name: 'Rena Paul',
  assessmentDate: '8/8/2026',
  location: 'Brace Life Studios',
  weightLbs: BW,
};

const styku = {
  scanDate: '8/8/2026',
  bodyFatPct: 27.0,
  bodyFatRank: 'Fit',
  leanMass: 80.1,
  leanMassPct: 69.3,
  fatMass: 31.2,
  fatMassPct: 26.9,
  boneMass: 4.3,
  boneMassPct: 3.7,
  bmi: 20.5,
  bmr: 1233,
  vfa: 26.3,
  vfaTag: 'Very Low',
  shapeScore: 92,
  shapeScoreLabel: 'Excellent',
  peerComparison: "Rena's body fat % is more favorable than the Styku reference group's median for women of a similar age — lower body fat than 70% of her peers in Styku's own comparison sample. This reference group is Styku's own norm sample, not a nationally representative population — see note [5] below.",
};

const segmental = [
  { label: 'Left Arm', value: '6.3 lbs' },
  { label: 'Right Arm', value: '6.4 lbs' },
  { label: 'Left Leg', value: '13.3 lbs' },
  { label: 'Right Leg', value: '13.7 lbs' },
];

const alstRow = {
  label: 'Appendicular LST Index',
  value: '5.94 kg/m² — Within Normal Reference Range for Women',
  footnote: 6,
};

// Relative gaps: arms 0.1/6.4 ≈ 1.6%, legs 0.4/13.7 ≈ 2.9% — both well under
// the corrected ≥10% relative Asymmetry Protocol trigger.
const asymmetryNote = 'A left/right arm lean-mass difference of about 2% was observed (L 6.3 vs R 6.4 lbs), and a left/right leg difference of about 3% (L 13.3 vs R 13.7 lbs, right-dominant). Both fall well under the range research associates with meaningful strength asymmetry (commonly flagged at 10–15%+), so no unilateral-lead protocol is triggered from this scan alone — tracked as routine monitoring and confirmed again at the next rescan.';

const strength = {
  protocolIntro: 'ICONS Protocol: 10 core movements + 1 bonus, assessed on weight lifted, reps, and movement quality. Reassessed every 8–12 weeks. Benchmarks: Aesthetics · Health · Biological Age | Mobility & flexibility assessed as part of the longevity factor.',
  rows: [
    { num: 1, exercise: 'Deadlift (Hex or BB)', weight: '85 lbs', reps: '5', pctBW: `${pctOfBodyweight(85, BW)}%`, level: 'Intermediate', notes: 'Strong baseline — well above typical new-client starting loads.' },
    { num: 2, exercise: 'Back Squat', notTested: true, notes: 'Not tested today — Goblet Squat established as new working baseline this program.' },
    { num: 3, exercise: 'Overhead Press (Seated DB)', weight: '15 lbs/hand', reps: '5', pctBW: `${pctOfBodyweight(15, BW)}%`, level: 'Novice' },
    { num: 4, exercise: 'Incline Dumbbell Press', weight: '20 lbs/hand', reps: '5', pctBW: `${pctOfBodyweight(20, BW)}%`, level: 'Novice' },
    { num: 5, exercise: 'Push-Ups (Incline)', weight: 'BW', reps: '10', notes: 'Strong bridge toward full floor push-ups.', level: 'Intermediate' },
    { num: 6, exercise: 'Farmers Carry (DB, Both Hands)', weight: '30 lbs/hand', reps: '4×25–30 yd', notes: 'Loaded carry — assessed on distance/load, not %BW.' },
    { num: 7, exercise: 'Hip Thrust', weight: '85 lbs', reps: '5', pctBW: `${pctOfBodyweight(85, BW)}%`, level: 'Intermediate', notes: 'Strong posterior chain — matches deadlift baseline.' },
    { num: 8, exercise: 'Single-Leg RDL (DB)', weight: '25 lbs/hand', reps: '8', pctBW: `${pctOfBodyweight(25, BW)}%`, level: 'Intermediate', notes: 'No imbalance observed — equal L/R sets.' },
    { num: 9, exercise: 'Lunges (DB)', weight: '25 lbs/hand', reps: '5', pctBW: `${pctOfBodyweight(25, BW)}%`, level: 'Intermediate' },
    { num: 10, exercise: 'Plank Hold', weight: 'BW', reps: '2:00', notes: 'Exceptional — well above the 60-second ICONS threshold.', level: 'Advanced' },
    { num: 'B', exercise: 'Pull-Ups (Bonus, Assisted — All Grips)', weight: 'Assist level set', reps: '5 ea grip', notes: 'Close/standard/wide grip, 5 reps each — strong pulling foundation.', level: 'Intermediate' },
  ],
  // No flagsSummary: Rena's strength battery carries no clinical or
  // movement-quality flags — flagsSummaryBox() correctly renders nothing
  // when this is omitted, rather than a forced empty "FLAGS:" box.
};

const benefitCards = [
  { exercise: 'Deadlift (Hex or BB)', weightRepsLabel: '85 lbs · 5 reps', lines: benefitLinesFromLibrary('Deadlift', { bioAgeFootnote: 8 }) },
  { exercise: 'Overhead Press (Seated DB)', weightRepsLabel: '15 lbs/hand · 5 reps', lines: benefitLinesFromLibrary('Overhead Press') },
  { exercise: 'Incline Dumbbell Press', weightRepsLabel: '20 lbs/hand · 5 reps', lines: benefitLinesFromLibrary('Incline Dumbbell Press') },
  { exercise: 'Push-Ups (Incline)', weightRepsLabel: 'Bodyweight · 10 reps', lines: benefitLinesFromLibrary('Push-Ups') },
  { exercise: 'Farmers Carry (DB, Both Hands)', weightRepsLabel: '30 lbs/hand · 4 sets, 25–30 yds', lines: benefitLinesFromLibrary('Farmers Carry') },
  { exercise: 'Hip Thrust', weightRepsLabel: '85 lbs · 5 reps', lines: benefitLinesFromLibrary('Hip Thrust', { healthFootnote: 9 }) },
  { exercise: 'Single-Leg RDL (DB)', weightRepsLabel: '25 lbs/hand · 8 reps', lines: benefitLinesFromLibrary('Single-Leg RDL') },
  { exercise: 'Lunges (DB)', weightRepsLabel: '25 lbs/hand · 5 reps', lines: benefitLinesFromLibrary('Lunges') },
  { exercise: 'Plank Hold', weightRepsLabel: 'Bodyweight · 2:00 min', lines: benefitLinesFromLibrary('Plank Hold') },
  { exercise: 'Pull-Ups (Bonus, Assisted)', weightRepsLabel: '5 reps · close/standard/wide grip', lines: benefitLinesFromLibrary('Pull-Ups') },
];

// No circumference measurements on file for Rena — statRowGrid()'s caller
// (buildAssessmentReport) renders the "not captured" note automatically
// when this is left empty, per the flexible-schema spec for this section.
const measurements = [];

const observations = [
  {
    tone: 'positive',
    label: 'Strong Foundation',
    body: 'Rena tested well above typical new-client baselines — an 85 lb Hex Deadlift and 85 lb Hip Thrust for 5 reps each, plus a 2:00 plank hold and 5 clean reps per grip on assisted pull-ups. Her posterior chain and core are both well-developed.',
  },
  {
    tone: 'neutral',
    label: 'Body Composition Baseline',
    body: "Shape Score 92/100 (Excellent). ALST Index 5.94 kg/m² — within normal reference range for women. Visceral Fat Area is Very Low on ICONS's trend scale. Lean mass distribution supports a healthy-aging trajectory.",
    footnotes: [3, 4, 6],
  },
  {
    tone: 'neutral',
    label: 'Growth Opportunity — Back Squat Baseline',
    body: "Back Squat was not part of the original 11-exercise testing battery — a working Goblet Squat load (30 lbs) was established this program and becomes the new 8-week baseline to track from here.",
  },
  {
    tone: 'neutral',
    label: 'Segmental Asymmetry — Monitor Only',
    body: 'Both the arm (~2%) and leg (~3%) lean-mass gaps sit well under the ≥10% relative threshold research associates with meaningful strength asymmetry — no unilateral-lead protocol is triggered from this scan alone. Tracked again at the next rescan.',
  },
];

const nextSteps = [
  { title: 'Results Review Call', body: 'Oscar will walk you through your full assessment summary and Styku results.' },
  { title: 'Begin Your Personalized Program', body: 'Your 2-Day Full Gym Training Plan is built directly off today\'s tested baselines — hinge, press, and pull strength at meaningful working loads from week one.' },
  { title: 'Track Weekly Progression', body: 'Follow the Week 1 → Week 4 load progression already built into your program; your trainer monitors RIR and technique as loads climb toward and past today\'s tested numbers.' },
  { title: 'Reassessment — 8 to 12 Weeks', body: 'ICONS Index reassessment at 8 weeks to track strength gains, body-composition shifts, and the segmental gaps noted above.' },
];

const data = {
  client,
  badge: 'INITIAL BASELINE',
  styku,
  segmental,
  alstRow,
  asymmetryNote,
  strength,
  benefitCards,
  measurements,
  measurementsNote: 'Circumference measurements were not captured as part of this scan/intake session — add at the next Styku session to enable this section.',
  observations,
  // jasonNotes intentionally omitted — see header comment above.
  nextSteps,
  // footnotes intentionally omitted — the engine's default 7-footnote set
  // (Body Fat Rank / BMR / Shape Score / VFA / Peer Comparison / ALST / %BW
  // & Level) applies to Rena's data verbatim, so only the two exercise-
  // specific footnotes (8, 9) need adding on top of it.
  footnotes: undefined,
  // corrections intentionally omitted — first build.
};

// Build the 7 standard footnotes (matching the engine's own internal
// default set verbatim), then append the two exercise-specific ones this
// document actually uses (Deadlift bone-loading scope; Hip Thrust
// co-activation distinction).
function buildFootnotes() {
  // Re-derive the same 7 default footnotes the engine would use if
  // data.footnotes were left undefined, then extend to 9. (The engine's
  // DEFAULT_ASSESSMENT_FOOTNOTES() is an internal, unexported function by
  // design — it's a document-default, not a general-purpose primitive —
  // so this script defines its own 1-7 text here, matching that default
  // verbatim, to keep the footnote list a single explicit array.)
  return [
    { marker: 1, text: 'Body-fat "Rank" (e.g., Fit) is generated by Styku against its own norm-referenced comparison groups, drawn from self-selected clinical/fitness-testing populations — not a nationally representative sample. A population-representative comparison can shift a person\'s percentile substantially versus these vendor tables, even though the underlying body-fat % is identical.' },
    { marker: 2, text: 'BMR is calculated with the Revised Harris-Benedict equation from height, weight, age, and sex — a population-average formula, not a measured value (only indirect calorimetry measures metabolic rate directly). Published accuracy studies show these formulas land within ±10% of measured resting metabolic rate for roughly half of people; treat the number as a useful planning estimate, not a precise reading.' },
    { marker: 3, text: 'Shape Score is a Styku-proprietary composite of body fat %, a muscle-fat index, and waist-to-height ratio, designed for easy client communication. It has not been independently validated as a clinical health score — read it as a personal trend-tracking number, not a diagnostic one.' },
    { marker: 4, text: 'Visceral Fat Area is shown as a single trend tag ("Very Low," the <70 cm² floor already used elsewhere in this system) rather than a multi-tier risk classification — no consensus body endorses one universal VFA threshold, published CT-derived cutoffs for elevated risk in women run considerably higher (commonly cited around 106 cm²+), and this scanner\'s own visceral-fat validation was performed against DXA in kilograms, not against CT in cm². Read this number as a personal trend to track over time, alongside waist circumference.' },
    { marker: 5, text: 'Peer-comparison percentiles reflect Styku\'s own reference database for similar age/sex, drawn from self-selected fitness/clinical testing populations, not a nationally representative survey. A population-representative comparison can place the same body composition at a meaningfully different percentile.' },
    { marker: 6, text: 'Appendicular Lean Soft Tissue (ALST) Index reflects the sex-specific EWGSOP2 reference range (women: <5.5 kg/m² is the low-muscle-mass screening cutoff). Rena\'s 5.94 kg/m² sits comfortably above that cutoff and within the normal reference range for women — there is no separate female "Optimal" tier above it; a higher band once used for this (≥7.0 kg/m²) is EWGSOP2\'s MALE threshold, not a female one, and is not used in this report. ALM/ALMI from 3D optical scanning has not been independently validated against DXA in the published Styku validation study — read this number as a trend to track at future scans, not a precise classification.' },
    { marker: 7, text: 'See the in-page note on "How to Read % BW and Level" on the Strength Assessment page.' },
    { marker: 8, text: 'Deadlift: the Biological Age line above describes a bone-loading benefit associated with maintained/improved bone mineral density in women 40+ — it does not claim to reduce Rena\'s individual osteoporosis risk, since a single assessment (with no bone-density scan on file) cannot confirm that for any one person.' },
    { marker: 9, text: 'Hip Thrust: the Health line above describes deep-core/pelvic-floor co-activation during the lift, not pelvic-floor strengthening — current research (e.g., Skaug et al. 2024) finds no measurable pelvic-floor-muscle strength change from heavy compound lifts alone; only targeted pelvic-floor training builds pelvic-floor strength.' },
  ];
}
data.footnotes = buildFootnotes();

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'rena_paul');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildAssessmentReport(data);
  const outPath = path.join(outDir, 'Rena_Paul_ICONS_Performance_Assessment.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
