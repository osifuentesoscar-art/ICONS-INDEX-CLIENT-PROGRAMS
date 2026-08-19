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
 * FOOTNOTES: 10 total, via the engine's exported DEFAULT_ASSESSMENT_
 * FOOTNOTES() (added 8/17/2026, post-audit fix — see below). Footnotes 1-8
 * are the engine's shared default set (Body Fat Rank / BMR / Shape Score /
 * VFA / Peer Comparison / ALST / % BW & Level / segmental-composition
 * reliability — all directly applicable to Rena's data with no edits
 * needed). Footnotes 9-10 are exercise-specific caveats (Deadlift
 * bone-loading claim scope; Hip Thrust co-activation-vs-strengthening
 * distinction) attached via `benefitLinesFromLibrary()`'s override
 * parameter, matching how Anna's reference document's own footnotes 8-9
 * covered the identical two claims (renumbered 9-10 here to make room for
 * the new shared footnote 8).
 *
 * POST-AUDIT FIX (8/17/2026, independent icons-doc-auditor pass): two
 * findings addressed. (1) The engine's DEFAULT_ASSESSMENT_FOOTNOTES() was
 * previously unexported, so this script hand-duplicated footnotes 1-7 —
 * a drift risk. Now exported and reused directly, plus extended with a new
 * marker 8 covering CLAUDE.md's "3D Optical Scanning — Validity" finding
 * that segmental (arm/leg) composition is this scanner's least-validated
 * output (CCCs ~0.32-0.52 vs. DXA) — referenced from the Segmental Lean
 * Mass section's `asymmetryNote` via a `[8]` marker. (2) Footnote 10 (Hip
 * Thrust co-activation, marker 9 at the time of the audit) cited "Skaug et
 * al. 2024" with no year/journal/volume detail — the auditor flagged that
 * this couldn't be verified against CLAUDE.md's vetted science-layer
 * sources. Pulled the bare citation pending verification, then dispatched
 * `icons-research-analyst` to check it properly rather than either leaving
 * an unverified citation in roster-wide template language or discarding a
 * possibly-real source. RESOLVED same day: the citation is real and
 * correctly attributed — Skaug KL, Engh ME, Bø K, "Acute Effect of Heavy
 * Weightlifting on the Pelvic Floor Muscles in Strength-Trained Women: An
 * Experimental Crossover Study," Medicine & Science in Sports & Exercise
 * 2024;56(1):37-43 — confirmed via CLAUDE.md's own Pelvic Floor Protocol
 * section, now updated with this citation ("Co-activation during a lift ≠
 * PFM strengthening," added 8/17/2026) and a matching Research Update Log
 * entry (fifteenth pass). Footnote 10 below now cites it directly.
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
const { buildAssessmentReport, benefitLinesFromLibrary, pctOfBodyweight, DEFAULT_ASSESSMENT_FOOTNOTES } = require('./icons_template');

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
const asymmetryNote = 'A left/right arm lean-mass difference of about 2% was observed (L 6.3 vs R 6.4 lbs), and a left/right leg difference of about 3% (L 13.3 vs R 13.7 lbs, right-dominant).[8] Both fall well under the range research associates with meaningful strength asymmetry (commonly flagged at 10–15%+), so no unilateral-lead protocol is triggered from this scan alone — tracked as routine monitoring and confirmed again at the next rescan.';

const strength = {
  protocolIntro: 'ICONS Protocol: 10 core movements + 1 bonus, assessed on weight lifted, reps, and movement quality. Strength is re-checked every 4 weeks against the program\'s Week 4 targets; the full body-composition rescan runs on its own longer 8–12 week cycle. Benchmarks: Aesthetics · Health · Biological Age | Mobility & flexibility assessed as part of the longevity factor.',
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
  { exercise: 'Deadlift (Hex or BB)', weightRepsLabel: '85 lbs · 5 reps', lines: benefitLinesFromLibrary('Deadlift', { bioAgeFootnote: 9 }) },
  { exercise: 'Overhead Press (Seated DB)', weightRepsLabel: '15 lbs/hand · 5 reps', lines: benefitLinesFromLibrary('Overhead Press') },
  { exercise: 'Incline Dumbbell Press', weightRepsLabel: '20 lbs/hand · 5 reps', lines: benefitLinesFromLibrary('Incline Dumbbell Press') },
  { exercise: 'Push-Ups (Incline)', weightRepsLabel: 'Bodyweight · 10 reps', lines: benefitLinesFromLibrary('Push-Ups') },
  { exercise: 'Farmers Carry (DB, Both Hands)', weightRepsLabel: '30 lbs/hand · 4 sets, 25–30 yds', lines: benefitLinesFromLibrary('Farmers Carry') },
  { exercise: 'Hip Thrust', weightRepsLabel: '85 lbs · 5 reps', lines: benefitLinesFromLibrary('Hip Thrust', { healthFootnote: 10 }) },
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
    body: "Back Squat was not part of the original 11-exercise testing battery — a working Goblet Squat load (30 lbs) was established this program and becomes the new baseline to track from here, first re-checked at the 4-week strength reassessment.",
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
  { title: 'Reassessment — Two Clocks', body: 'Strength (ICONS Index) is re-checked every 4 weeks against the program\'s Week 4 targets; the Styku body-composition rescan runs on its own 8–12 week cycle and tracks the segmental gaps noted above. The two are tracked separately, not on the same clock.' },
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

// Use the engine's own exported default (1-8: Body Fat Rank / BMR / Shape
// Score / VFA / Peer Comparison / ALST / % BW & Level / segmental-composition
// reliability — all directly applicable to Rena's data with no edits needed),
// then append two exercise-specific footnotes this document uses (Deadlift
// bone-loading scope; Hip Thrust co-activation distinction), numbered 9-10.
function buildFootnotes() {
  return [
    ...DEFAULT_ASSESSMENT_FOOTNOTES(data),
    { marker: 9, text: 'Deadlift: the Biological Age line above describes a bone-loading benefit associated with maintained/improved bone mineral density in women 40+ — it does not claim to reduce Rena\'s individual osteoporosis risk, since a single assessment (with no bone-density scan on file) cannot confirm that for any one person.' },
    { marker: 10, text: 'Hip Thrust: the Health line above describes deep-core/pelvic-floor co-activation during the lift, not pelvic-floor strengthening — heavy compound lifting alone is not a substitute for targeted pelvic-floor training, which is what builds pelvic-floor strength specifically. Skaug KL, Engh ME, Bø K, "Acute Effect of Heavy Weightlifting on the Pelvic Floor Muscles in Strength-Trained Women: An Experimental Crossover Study," Medicine & Science in Sports & Exercise 2024;56(1):37-43, found pelvic-floor-muscle strength was not significantly correlated with whole-body squat/deadlift strength in strength-trained women.' },
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
