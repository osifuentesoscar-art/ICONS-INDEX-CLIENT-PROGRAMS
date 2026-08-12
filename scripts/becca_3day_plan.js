/**
 * Becca — ICONS 3-Day Training Plan (INTERMEDIATE)
 * Brace Life Studios — Trainer Development Roster
 *
 * Built from Becca's real tested baselines in
 * system_documents/ICONS_Baseline_Sheets.docx (source: scripts/icons_baseline_sheets.js,
 * migrated 8/12/2026 from the legacy "ICONS Baseline Sheets" PDF). Companion
 * builds for Jah and Nick are being produced separately by two other agents
 * in parallel — not touched here.
 *
 * SCOPE — NO CLINICAL/DEMOGRAPHIC DATA ON FILE (same precedent as
 * scripts/petra_3day_virtual_plan.js and scripts/nancy_avitable_3day_plan.js):
 * Becca is an ICONS Index athlete with no Styku scan, age, sex, or clinical
 * intake data on file — only a strength-testing baseline sheet. Per
 * CLAUDE.md's Demographic Scope Rule, none of the women's Age Bracket
 * Programming Framework's numeric thresholds (protein/creatine tiers,
 * ALST/VFA/BMI cutoffs, pelvic floor triggers, the "ICONS Index
 * Full-Spectrum Progression Standard") are applied — those are validated
 * for a stated target population this client's intake doesn't confirm, and
 * are not invented here. client.weightKg / ageYears / isPostmenopausal /
 * alstIndex are therefore all left UNSET, which correctly no-ops
 * proteinBar() and pelvicFloorCallout() (both gated on those fields), and
 * includeNutritionBlock is explicitly false (nutritionBlock()'s math
 * requires client.weightKg — inventing a body weight to populate it would
 * be fabrication). This is stated plainly in a baselineNotes callout below,
 * not silently omitted.
 *
 * What DOES carry over: the sex-neutral ICONS structural philosophy
 * (Isolated -> Compound -> Metabolic zone sequencing per day, RIR-based
 * autoregulated progressive overload via progressionBlock(), corrective-
 * before-compound sequencing) and the Compound Block Sequencing —
 * Antagonist Rotation Rule (applied live below, not retrofitted — every
 * Compound-zone Block B here sequences hinge -> knee-dominant/unilateral
 * -> horizontal pull, never 3 consecutive same-pattern exercises).
 *
 * LOADS: Split Stance, Single-Arm Row, and Deadlift (Conventional) are
 * tested 5RM lifts — their Week 1 working loads below are computed via
 * epley1RM() + workingLoad() against this program's standard 60/70/80%
 * three-day undulation, not hand-picked numbers. Goblet Squat is carried
 * at its tested "working" load throughout (Becca's coach note frames it as
 * a squat-pattern corrective groove, not a max-effort lift, so it isn't
 * %1RM-progressed the way the tested 5RM lifts are). Farmer Carry,
 * Push-Up, and Plank stay at/near their tested baselines with the coach's
 * own written progression cadence (not Epley-based — none of these are
 * 5RM-format tests).
 *
 * NOT YET ASSESSED (Hex Bar Deadlift, Back Squat, Full Pull-Up): per this
 * build's instructions, these are legitimate candidates to introduce as
 * fresh baseline-establishing exercises rather than being skipped. Back
 * Squat is introduced Day 1, Hex Bar Deadlift Day 2 — both at conservative,
 * technique-focused first-session loads (not Epley-derived, since there is
 * no tested set of either lift yet to convert; flagged in-line as a
 * coach-judgment starting estimate). Full Pull-Up is tested as a single
 * unassisted attempt on Day 3, layered on top of (not replacing) her
 * standing 3-grip assisted protocol.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad } = require('./icons_template');

// ── Epley 1RM conversions from tested 5RM baselines ─────────────────────
const splitStanceE1RM = epley1RM(50, 5);      // 58
const singleArmRowE1RM = epley1RM(30, 5);     // 35
const deadliftE1RM = epley1RM(125, 5);        // 146

// ── Week 1 working loads at the standard 60/70/80% undulation ───────────
const d1Deadlift = workingLoad(deadliftE1RM, 0.6);      // 90
const d1SingleArmRow = workingLoad(singleArmRowE1RM, 0.6); // 20
const d2SplitStance = workingLoad(splitStanceE1RM, 0.7);   // 40
const d2SingleArmRow = workingLoad(singleArmRowE1RM, 0.7); // 25
const d3Deadlift = workingLoad(deadliftE1RM, 0.8);       // 115
const d3SplitStance = workingLoad(splitStanceE1RM, 0.8);   // 45
const d3SingleArmRow = workingLoad(singleArmRowE1RM, 0.8);  // 30

const client = {
  name: 'Becca',
  programTitle: '3-Day Training Plan',
  subtitle: 'Intermediate Strength Build — Baseline-to-4-Week Progression',
  stats: ['Intermediate — ICONS Index Athlete', 'ICONS Baseline Testing Protocol', '3-Day Program', 'No Styku / Clinical Data On File'],
};

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Foundational Patterns\nNew Baseline: Back Squat' },
  { day: 'DAY 2', intensity: 70, focus: 'Hip Hinge Variant\nNew Baseline: Hex Bar Deadlift' },
  { day: 'DAY 3', intensity: 80, focus: 'Primary Strength\nFull Pull-Up Test' },
];

const baselines = [
  ['Deadlift (Conventional)', '125 lbs × 5', 'Baseline Intake', '145–150 lbs'],
  ['Split Stance', '50 lbs × 5', 'Baseline Intake', '65 lbs'],
  ['Goblet Squat', '50 lbs × 5', 'Baseline Intake', 'Corrective load — maintained for pattern quality'],
  ['Single-Arm Row', '30 lbs × 5', 'Baseline Intake', '42.5 lbs'],
  ['Pull-Up (Assisted, 3-Grip)', 'CG / Std / Wide — 5 each', 'Baseline Intake', 'Reduce assist across all 3 grips'],
  ['Farmer Carry', '40 lbs / hand', 'Baseline Intake', '52.5 lbs / hand'],
  ['Push-Up', '11 reps', 'Baseline Intake', '15+ full floor'],
  ['Plank (Elbow)', '3:00', 'Baseline Intake', '2:30 loaded (10 lb plate)'],
];

const baselineNotes = [
  {
    type: 'gold',
    label: 'Program Scope — No Clinical or Demographic Data On File',
    body: 'Becca has no Styku scan, age, sex, or clinical intake data on file — only a tested strength baseline sheet. None of ICONS’s women’s Age Bracket Programming Framework numeric thresholds (protein/creatine tiers, ALST/VFA/BMI cutoffs, pelvic floor triggers, the "ICONS Index Full-Spectrum Progression Standard") are applied here — those are validated for a specific population this intake doesn’t confirm, and are not invented in their place. What does carry over: the sex-neutral ICONS three-zone structure (Isolated → Compound → Metabolic), RIR-based autoregulated progressive overload, and corrective-before-compound sequencing — all of which transfer regardless of age or sex. This program is built entirely from Becca’s own tested numbers below.',
  },
  {
    type: 'gold',
    label: 'Coach Note',
    body: 'Assisted pull-up across all three grips. Strong plank baseline. Deadlift established. Split stance and row lighter than group — Week 1 loads below are calculated from Becca’s own tested baseline, not matched to the rest of the roster.',
  },
  {
    type: 'watch',
    label: 'Not Yet Assessed — Introduced As New Baselines',
    body: 'Hex Bar Deadlift and Back Squat are introduced this week at conservative, technique-focused starting loads (Back Squat Day 1, Hex Bar Deadlift Day 2) — first-session coach-judgment estimates, not Epley-derived, since neither lift has a tested set yet to convert. Full Pull-Up is tested as a single unassisted attempt on Day 3, alongside (not replacing) the standing 3-grip assisted protocol. All three become real tracked baselines from this week forward.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'Day 1 — Foundational Patterns',
    subtitle: 'Squat Groove · Hinge · Horizontal Pull',
    descriptor: 'Technique Day — New Baseline: Back Squat',
    intensityLabel: '60% Day',
    intensityPara: 'Technique day — form over load, no near-failure work. Establishes a fresh Back Squat baseline and grooves the squat/hinge/pull patterns the rest of the week builds on.',
    warmUp: 'Hip hinge drill (PVC or dowel) 2×10, glute bridge 2×12, band pull-apart 2×15, cat-cow 10 reps, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Wakes up the hip hinge and scapular pull patterns before loading, and grooves squat depth/tempo with the tested corrective-load Goblet Squat.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '3', reps: '8', load: '50 lbs', tempo: '3-1-1', rest: '60s', cue: 'DB at chest, full depth, 3-sec descent. Primary squat corrective load — hold steady across the week.' },
          { name: 'Bird Dog', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-2', rest: '30s', cue: 'Flat back, opposite arm/leg extend slow. Core/hip stability before loaded hinge work.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'Hinge → new-baseline squat → horizontal pull — three different movement patterns in sequence, per the Antagonist Rotation Rule.',
        exercises: [
          { name: 'Deadlift (Conventional)', sets: '4', reps: '5', load: `${d1Deadlift} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Hip hinge corrective before every set. Neutral spine, drive floor away. 60% Week-1 load off her 125×5 tested baseline.' },
          { name: 'Back Squat', sets: '3', reps: '5', load: '45 lbs', tempo: '3-1-1', rest: '90s', insight: 'New baseline — conservative technique-focus starting load, not yet tested. Coach-judgment estimate, becomes the real baseline this week.', cue: 'Bar on upper back, full depth, drive through heels. Priority is clean pattern, not load.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d1SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Starting lighter than group per coach note. Full stretch at bottom, drive elbow to hip.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Push-Up, Farmer Carry, Plank, and the 3-grip Pull-Up battery all track directly against Becca’s tested baselines and 4-week targets.',
        exercises: [
          { name: 'Push-Up', sets: '3', reps: '8–9', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Full floor. Stay at 2 RIR — form before load per coach note. Target 15+ by Week 4.' },
          { name: 'Farmer Carry', sets: '3', reps: '30 yds', load: '40 lbs / hand', tempo: 'Controlled', rest: '75s', cue: 'Shoulders packed, chest tall. +5 lbs every 2 sessions toward 52.5 lbs.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:00', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Building toward 2:30 loaded (10 lb plate) by Week 4. Full brace, ribs down.' },
          { name: 'Pull-Up (Assisted, 3-Grip)', sets: '1', reps: '5 ea grip', load: 'Assisted', tempo: 'Controlled', rest: '60s', cue: 'Close / Standard / Wide, all three every session. Progress = reduce assist, not add reps.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge stretch 60s each, seated hamstring stretch 60s each, thoracic extension on floor 60s.',
    iconsNote: 'First exposure to Back Squat — coach watches depth and bar path over load this session. Deadlift and Single-Arm Row loads above are Week-1, 60%-day figures calculated from Becca’s tested 5RMs; expect them to feel comfortably sub-maximal by design.',
  },
  {
    intensity: 70,
    title: 'Day 2 — Hip Hinge Variant + Unilateral',
    subtitle: 'Hex Bar Deadlift · Split Stance · Horizontal Pull',
    descriptor: 'Moderate Day — New Baseline: Hex Bar Deadlift',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate volume day — introduces the Hex Bar Deadlift as a second hinge-pattern baseline and shifts the squat pattern to unilateral (Split Stance) to build single-leg strength alongside the bilateral pattern from Day 1.',
    warmUp: 'Hip flexor dynamic stretch 10 each, bird dog 2×8 ea side, band pull-apart 2×15, thoracic rotation 10 each side.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Same corrective squat groove as Day 1, plus scapular prep for today’s pull volume.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '3', reps: '8', load: '50 lbs', tempo: '3-1-1', rest: '60s', cue: 'Same corrective load and cues as Day 1 — pattern quality over progression here.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight, squeeze shoulder blades. Preps the row and pull-up work below.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'New-baseline hinge → unilateral squat pattern → horizontal pull — three different patterns, per the Antagonist Rotation Rule.',
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '3', reps: '5', load: '100 lbs', tempo: '2-1-1', rest: '90s', insight: 'New baseline — conservative technique-focus estimate off her 125 lb conventional deadlift, not yet tested. Becomes the real baseline this week.', cue: 'Stand centered in the frame, hips hinge to grip, drive through the floor. Hip hinge corrective before every set.' },
          { name: 'Split Stance', sets: '3', reps: '5 ea leg', load: `${d2SplitStance} lbs`, tempo: '3-1-1', rest: '75s', cue: '70% Week-1 load off her 50×5 tested baseline. Matches the Goblet Squat pattern — full depth, controlled.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d2SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Full stretch at bottom every rep. +5 lbs from Day 1 per the weekly undulation.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Second weekly exposure for carry, plank, and the pull-up battery — tracking directly toward 4-week targets.',
        exercises: [
          { name: 'Push-Up', sets: '3', reps: '9', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Hold at 2 RIR. One rep higher than Day 1 as form stays clean.' },
          { name: 'Farmer Carry', sets: '3', reps: '30 yds', load: '40–45 lbs / hand', tempo: 'Controlled', rest: '75s', cue: '+5 lbs/hand every 2 sessions — this is session 2. Shoulder packing cue priority.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:15', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Building toward 2:30 loaded by Week 4. Full brace throughout.' },
          { name: 'Pull-Up (Assisted, 3-Grip)', sets: '1', reps: '5 ea grip', load: 'Assisted', tempo: 'Controlled', rest: '60s', cue: 'Rotate which grip leads. Reduce assist slightly if all 15 reps stayed clean last session.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 60s each, doorway chest stretch 30s each, lat stretch 30s each.',
    iconsNote: 'First exposure to Hex Bar Deadlift — coach checks hip height and bar path against the established Conventional Deadlift pattern from Day 1. Split Stance and Single-Arm Row loads above are Week-1, 70%-day figures.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Primary Strength',
    subtitle: 'Heaviest Compound Loads · Full Pull-Up Test',
    descriptor: 'Primary Strength Day — Full Pull-Up Baseline Test',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day — the week’s heaviest working loads on the two established compound lifts, closing with a single unassisted Full Pull-Up attempt to start a real baseline for that movement.',
    warmUp: 'Hip hinge drill 2×10, glute bridge 2×12, band pull-apart 2×15, deep squat hold 2×30s.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Final corrective-squat exposure of the week before the heaviest compound loads.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '2', reps: '8', load: '50 lbs', tempo: '3-1-1', rest: '60s', cue: 'Quick priming set — pattern check before Split Stance goes heavier below.' },
          { name: 'Bird Dog', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-2', rest: '30s', cue: 'Core brace before the heaviest deadlift of the week.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'Heaviest weekly loads — hinge → unilateral squat → horizontal pull, matching Becca’s tested 5RM territory. 1–2 RIR on the last set of each.',
        exercises: [
          { name: 'Deadlift (Conventional)', sets: '4', reps: '5', load: `${d3Deadlift} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Progress to 135 lbs once all 5 reps are clean at 2 RIR — 4-week target is 145–150 lbs. Hip hinge corrective before every set.' },
          { name: 'Split Stance', sets: '3', reps: '5 ea leg', load: `${d3SplitStance} lbs`, tempo: '3-1-1', rest: '75s', cue: '80% Week-1 load, close to her tested 50×5 baseline. Progress +5 lbs when all reps are clean at 2 RIR.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d3SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Matches tested 30×5 baseline — appropriate for the heaviest day of the week. Build to 40 lbs by Week 4.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher + Full Pull-Up Test',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Heaviest weekly carry and longest plank exposure, closing with the week’s single unassisted Full Pull-Up test rep.',
        exercises: [
          { name: 'Push-Up', sets: '3', reps: '10', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Highest rep count of the week at 2 RIR — building toward the 15+ four-week target.' },
          { name: 'Farmer Carry', sets: '3', reps: '30 yds', load: '45 lbs / hand', tempo: 'Controlled', rest: '75s', cue: 'Heaviest carry of the week. Shoulder packing cue priority throughout.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:30', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Hits the Week-4 unloaded target early — introduce the 10 lb plate here if this feels clean.' },
          { name: 'Pull-Up (Assisted, 3-Grip)', sets: '1', reps: '5 ea grip', load: 'Assisted', tempo: 'Controlled', rest: '60s', cue: 'Standard weekly battery first, before the test rep below.' },
          { name: 'Pull-Up (Full — Baseline Test)', sets: '1', reps: '1 max attempt', load: 'Bodyweight', tempo: 'Controlled', rest: '—', insight: 'New baseline test — a single unassisted attempt after the assisted battery. Record the result (achieved or not) either way; this becomes her tracked Full Pull-Up baseline going forward.', cue: 'One clean unassisted attempt. No grinding — full range or it doesn’t count as the baseline rep.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 90s each, supine hamstring stretch 60s each, lat stretch 30s each, diaphragmatic breathing 2 min.',
    iconsNote: 'Heaviest day of the week on both compound lifts — 1–2 RIR on the last set, never to failure. The Full Pull-Up test at the end of Block C is informational, not a max-effort grind: one clean attempt, logged either way.',
  },
];

const summary = {
  subtitle: 'Becca  ·  ICONS Index  ·  Intermediate Strength Build  ·  Week 1',
  rows: [
    ['1', '60%', 'Foundational Patterns — New Baseline: Back Squat', 'Deadlift / Back Squat', `Deadlift ${d1Deadlift} lbs Wk1 → 4-wk target 145–150 lbs. Back Squat baseline established this session.`],
    ['2', '70%', 'Hip Hinge Variant — New Baseline: Hex Bar Deadlift', 'Hex Bar Deadlift / Split Stance', `Split Stance ${d2SplitStance} lbs Wk1 → 4-wk target 65 lbs. Hex Bar Deadlift baseline established this session.`],
    ['3', '80%', 'Primary Strength — Full Pull-Up Test', 'Deadlift / Split Stance / Single-Arm Row', `Row ${d3SingleArmRow} lbs Wk1 → 4-wk target 42.5 lbs. Farmer Carry 45 lbs/hand → 4-wk target 52.5 lbs/hand.`],
  ],
  milestones4wk: 'Plank: 2:30 loaded (10 lb plate). Push-Up: 15+ full floor. Split Stance: 65 lbs. Single-Arm Row: 42.5 lbs. Deadlift: 145–150 lbs. Farmer Carry: 52.5 lbs/hand. (Verbatim from Becca’s baseline sheet 4-week targets.)',
  milestones8wk: 'No 8-week target is documented on Becca’s baseline sheet — the 4-week targets above are the sole confirmed benchmark on file. Recommend a full baseline retest at Week 8 (mirroring the ICONS Baseline Testing Protocol, including first real numbers for Back Squat, Hex Bar Deadlift, and Full Pull-Up) to set real 8-week targets rather than projecting unconfirmed numbers forward.',
};

const data = {
  client,
  weekOverview,
  baselines,
  baselinesTargetHeader: '4-WEEK TARGET',
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'trainer_education');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Becca_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
