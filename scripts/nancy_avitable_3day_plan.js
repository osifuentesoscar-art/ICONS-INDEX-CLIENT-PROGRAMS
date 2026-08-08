/**
 * Nancy Avitable — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * Rebuilt from the client's existing document (Nancy's 3-Day Training Plan
 * PDF, "Updated 03 Aug 2026") to match the confirmed engine standard (Kelly
 * Mulroy reference — see CLAUDE.md's "Visual language" note). All program
 * content, loads, and clinical flags are carried over 1:1 from the source;
 * only rendering changed.
 *
 * Data gaps deliberately NOT fabricated (source provides only age — no
 * weight, height, or Styku body-composition scan, only an isolated hip
 * abduction force test):
 *   - client.weightKg / client.bmr / client.alstIndex are left unset. This
 *     safely no-ops proteinBar() (guarded by `alstIndex !== undefined`) and
 *     the nutritionBlock() protein-target math, which is never invoked
 *     anyway because includeNutritionBlock is explicitly false below.
 *   - No stykuBlock() — the source has only a 2x2 hip abduction force table
 *     (L/R peak force, asymmetry %, scan date), not a full Styku body-comp
 *     scan. That data is fully captured in the tealCallout body text below
 *     instead (matches the source's own "STYKU FINDING" callout verbatim).
 *   - No baselines table — the source has no strength-testing battery.
 *   - isPostmenopausal: false — no menopause indication or pelvic-floor
 *     language anywhere in the source (unlike Johanna's document), so the
 *     auto pelvic-floor callout correctly never fires despite squat/hip
 *     thrust/lunge exercises being present.
 *   - weekOverview uses generic "DAY 1/2/3" labels, not invented weekdays —
 *     the source's Program Overview table gives no weekday schedule.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Nancy Avitable',
  programTitle: '3-Day Training Plan',
  subtitle: 'Left Hip Corrective & Unilateral Strength Build',
  stats: ['Age 38', 'Hip Abduction Test 8/3/2026', 'L 126N / R 153N — 17.5% Asymmetry', '3-Day Program'],
  ageYears: 38,
  isPostmenopausal: false,
};

const weekOverview = [
  { day: 'DAY 1', intensity: 70, focus: 'Lower Body —\nLeft Hip Corrective' },
  { day: 'DAY 2', intensity: 60, focus: 'Upper Body —\nStability & Posterior Chain' },
  { day: 'DAY 3', intensity: 80, focus: 'Lower Body —\nBilateral Strength + Unilateral Finishers' },
];

const baselineNotes = [
  {
    type: 'teal',
    label: 'Styku Finding — Hip Abduction Asymmetry',
    body: 'Isolated hip abduction test: left peak force 126N (weaker side), right peak force 153N. Asymmetry 17.5%, right-dominant. Recommends left-side emphasis and a unilateral corrective pathway.',
  },
  {
    type: 'watch',
    label: 'Watch — Asymmetry Alert',
    body: '17.5% left/right gap exceeds the 0.5-unit asymmetry threshold. Lead every unilateral exercise with the LEFT (weaker) side per protocol.',
  },
  {
    type: 'red',
    label: 'Corrective Priority',
    body: 'Left glute medius activation and unilateral loading take precedence this block. Track left vs. right performance separately; re-test at 8-week rescan.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Lower Body (Left Corrective)',
    subtitle: 'Hip Abduction Emphasis — Unilateral Control',
    descriptor: 'Left-Side Corrective Emphasis',
    intensityLabel: '70% Day',
    intensityPara: 'Prioritise left-side unloading and glute med activation to correct the 17.5% hip abduction asymmetry flagged above.',
    warmUp: '5–7 min cycle + dynamic lateral band walks (2×20) + single-leg glute bridges 2×10 each side',
    blocks: [
      {
        letter: 'A',
        title: 'Activation / Corrective',
        color: 'red',
        introLabel: 'Why',
        intro: 'Two exercises to re-balance left glute med activation.',
        exercises: [
          { name: 'Side-Lying Hip Abduction (Slow)', sets: '3', reps: '12', load: 'bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Lead with heel; no pelvic tilt; 1-2s hold top', flag: 'Left focus' },
          { name: 'Banded Standing Hip Abduction (Left Emphasis)', sets: '3', reps: '10', load: 'band', tempo: '2-0-1', rest: '30s', cue: 'Drive lateral glute; 2s hold; +2 reps left', flag: 'Left corrective' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound Strength',
        introLabel: 'Why',
        intro: 'Build bilateral strength while preserving left control.',
        exercises: [
          { name: 'Goblet Squat', sets: '4', reps: '6-8', load: 'moderate', tempo: '2-0-2', rest: '90s', cue: 'Braced core; track knees; depth to parallel', rirNote: '2 RIR' },
          { name: 'Romanian Deadlift', sets: '3', reps: '8', load: 'moderate', tempo: '2-0-2', rest: '90s', cue: 'Hinge at hips; feel posterior chain tension' },
        ],
      },
      {
        letter: 'C',
        title: 'Unilateral Strength Finishers',
        exercises: [
          { name: 'Reverse Lunge (Start R to L)', sets: '3', reps: '8 each', load: 'bodyweight / light', tempo: '2-0-1', rest: '60s', cue: 'Step back with control; emphasise L push-off' },
          { name: 'Single-Leg Hip Bridge (Left Focus)', sets: '3', reps: '10', load: 'bodyweight', tempo: '2-0-1', rest: '45s', cue: 'Drive left glute; 1s pause top; no knee cave', flag: 'Left corrective' },
        ],
      },
    ],
    coolDown: '8–10 min mobility and glute release',
    iconsNote: 'Emphasise tempo and control on left side. Use lighter load and perfect technique before progressing.',
  },
  {
    intensity: 60,
    title: 'Day 2 — Upper / Mobility',
    subtitle: 'Upper Stability + Posterior Chain',
    descriptor: 'Lower Load — Mobility Emphasis',
    intensityLabel: '60% Day',
    intensityPara: 'Lower overall load; emphasise shoulder and thoracic mobility.',
    warmUp: 'Band pull-aparts, thoracic rotations, 3×10 scapular push-ups',
    blocks: [
      {
        letter: 'A',
        title: 'Push / Pull',
        exercises: [
          { name: 'Incline DB Press', sets: '4', reps: '8', load: 'moderate', tempo: '2-0-1', rest: '90s', cue: 'Control descent' },
          { name: 'Single-Arm Row', sets: '4', reps: '8 each', load: 'moderate', tempo: '2-0-1', rest: '60s', cue: 'Pull to the hip; maintain neutral spine' },
        ],
      },
      {
        letter: 'B',
        title: 'Accessory',
        color: 'gold',
        exercises: [
          { name: 'Face Pulls', sets: '3', reps: '15', load: 'band', tempo: '2-0-1', rest: '45s', cue: 'High elbows; squeeze rear delts' },
          { name: 'Farmer Carry', sets: '3', reps: '30s', load: 'moderate', tempo: '—', rest: '60s', cue: 'Tall posture; tight core' },
        ],
      },
    ],
    coolDown: 'Lat stretch and foam rolling',
    iconsNote: 'Use this session to improve movement quality and recovery.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Lower Body (Strength + Unilateral)',
    subtitle: 'Build Strength; Progressive Overload With Unilateral Finishers',
    descriptor: 'Higher Intensity — Left-Volume Maintenance',
    intensityLabel: '80% Day',
    intensityPara: 'Higher intensity to drive strength adaptations; include left-volume maintenance.',
    warmUp: 'Barbell hip hinge drill, 2 sets light RDLs, activation band side steps',
    blocks: [
      {
        letter: 'A',
        title: 'Strength Core',
        exercises: [
          { name: 'Back Squat or Box Squat', sets: '5', reps: '5', load: 'heavy', tempo: '2-0-2', rest: '2m', cue: 'Braced core; safe depth' },
          { name: 'Weighted Step-Up', sets: '3', reps: '6 each', load: 'moderate', tempo: '2-0-1', rest: '90s', cue: 'Drive through heel; control descent' },
        ],
      },
      {
        letter: 'B',
        title: 'Posterior Chain',
        exercises: [
          { name: 'Hip Thrust', sets: '4', reps: '8', load: 'moderate-heavy', tempo: '2-0-1', rest: '90s', cue: 'Full hip extension; hold 1s top' },
          { name: 'Nordic Hamstring (Assisted)', sets: '3', reps: '6-8', load: 'bodyweight', tempo: '2-0-2', rest: '90s', cue: 'Slow eccentric; control' },
        ],
      },
      {
        letter: 'C',
        title: 'Left-Side Volume Finishers',
        color: 'red',
        exercises: [
          { name: 'Cable Hip Abduction (Left)', sets: '3', reps: '12', load: 'light-moderate', tempo: '2-0-1', rest: '45s', cue: 'Slow control; add 2 extra reps on L', flag: 'Left corrective' },
          { name: 'Curtsy Lunge (Left Lead)', sets: '3', reps: '10', load: 'bodyweight', tempo: '2-0-1', rest: '45s', cue: 'Focus on L glute drive' },
        ],
      },
    ],
    coolDown: 'Hamstring and lateral banded mobility',
    iconsNote: 'Push load on bilateral lifts but finish with unilateral sets focused on left quality.',
  },
];

const summary = {
  subtitle: 'Nancy Avitable  ·  ICONS Index  ·  Left Hip Corrective & Unilateral Strength Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Lower Body — Left Hip Corrective', 'Goblet Squat', 'Left-side unloading emphasis; corrective circuit precedes compound work'],
    ['2', '60%', 'Upper Body — Stability & Posterior Chain', 'Incline DB Press', 'Lower load week focused on movement quality and mobility'],
    ['3', '80%', 'Lower Body — Bilateral Strength + Unilateral Finishers', 'Back Squat / Box Squat', 'Higher intensity strength day; finish with left-focused unilateral volume'],
  ],
  milestones4wk: 'Reduce asymmetry below 10% and increase left hip abduction force by 10-15%.',
  milestones8wk: 'Symmetry within 5–8%; L and R hip abduction within 5%.',
  rescanNote: 'Rescan with Styku in 8 weeks to assess asymmetry and lean mass changes. Continue left-focused progression if asymmetry persists.',
};

const data = {
  client,
  weekOverview,
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'nancy_avitable');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Nancy_Avitable_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
