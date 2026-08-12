/**
 * Oscar — ICONS 3-Day Training Plan (INTERMEDIATE)
 * Brace Life Studios — Trainer Development Roster
 *
 * Built from Oscar's real tested baselines in
 * system_documents/ICONS_Baseline_Sheets.docx (source: scripts/icons_baseline_sheets.js,
 * migrated 8/12/2026 from the legacy "ICONS Baseline Sheets" PDF). Companion
 * builds for Jah and Nick are being produced separately by two other agents
 * in parallel — not touched here.
 *
 * SCOPE — NO CLINICAL/DEMOGRAPHIC DATA ON FILE (same precedent as
 * scripts/petra_3day_virtual_plan.js and scripts/nancy_avitable_3day_plan.js):
 * Oscar is an ICONS Index athlete with no Styku scan, age, sex, or clinical
 * intake data on file — only a strength-testing baseline sheet. Per
 * CLAUDE.md's Demographic Scope Rule, none of the women's Age Bracket
 * Programming Framework's numeric thresholds are applied — those are
 * validated for a stated target population this client's intake doesn't
 * confirm, and are not invented in their place. client.weightKg / ageYears
 * / isPostmenopausal / alstIndex are therefore all left UNSET, correctly
 * no-oping proteinBar()/pelvicFloorCallout(), and includeNutritionBlock is
 * explicitly false (nutritionBlock() requires client.weightKg — inventing
 * a body weight would be fabrication). Stated plainly in a baselineNotes
 * callout below, not silently omitted.
 *
 * What DOES carry over: the sex-neutral ICONS three-zone structure
 * (Isolated -> Compound -> Metabolic), RIR-based autoregulated progressive
 * overload, and the Compound Block Sequencing — Antagonist Rotation Rule
 * (applied live below: every Compound-zone Block B sequences hinge ->
 * knee-dominant/unilateral -> horizontal pull, never 3 consecutive
 * same-pattern exercises).
 *
 * LOADS: Split Stance, Hex Bar Deadlift, Single-Arm Row, and Back Squat are
 * all tested 5RM lifts — Week 1 working loads below are computed via
 * epley1RM() + workingLoad() against the standard 60/70/80% three-day
 * undulation, not hand-picked. Goblet Squat is carried at its tested
 * "working" load throughout per the coach note ("corrective pattern... this
 * should progress quickly as squat is strong"), not %1RM progressed.
 * Push-Up and Plank stay at/near tested baselines on the coach's own
 * written progression cadence (not Epley-based).
 *
 * NOT YET ASSESSED (Farmer Carry, Conventional Deadlift, Assisted
 * Pull-Up): Conventional Deadlift is introduced Day 1 and Farmer Carry is
 * introduced Day 1 as well — both at conservative, technique-focused
 * first-session loads (not Epley-derived, since neither lift/carry has a
 * tested set yet to convert; flagged in-line as coach-judgment estimates).
 * Assisted Pull-Up is DELIBERATELY NOT introduced — Oscar's tested Full
 * Pull-Up baseline (20 unassisted reps, the highest in the group) already
 * supersedes the assisted variant; the same judgment call made for Brodie
 * applies here with even more force.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad } = require('./icons_template');

// ── Epley 1RM conversions from tested 5RM baselines ─────────────────────
const splitStanceE1RM = epley1RM(40, 5);      // 47
const hexDLE1RM = epley1RM(205, 5);           // 239
const singleArmRowE1RM = epley1RM(50, 5);     // 58
const backSquatE1RM = epley1RM(155, 5);       // 181

// ── Week 1 working loads at the standard 60/70/80% undulation ───────────
const d1BackSquat = workingLoad(backSquatE1RM, 0.6);      // 110
const d1SingleArmRow = workingLoad(singleArmRowE1RM, 0.6); // 35
const d2HexDL = workingLoad(hexDLE1RM, 0.7);              // 165
const d2SplitStance = workingLoad(splitStanceE1RM, 0.7);   // 35
const d2SingleArmRow = workingLoad(singleArmRowE1RM, 0.7); // 40
const d3BackSquat = workingLoad(backSquatE1RM, 0.8);      // 145
const d3HexDL = workingLoad(hexDLE1RM, 0.8);              // 190
const d3SingleArmRow = workingLoad(singleArmRowE1RM, 0.8);  // 45

const client = {
  name: 'Oscar',
  programTitle: '3-Day Training Plan',
  subtitle: 'Intermediate Strength Build — Baseline-to-4-Week Progression',
  stats: ['Intermediate — ICONS Index Athlete', 'ICONS Baseline Testing Protocol', '3-Day Program', 'No Styku / Clinical Data On File'],
};

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Foundational Patterns\nNew Baselines: Conv. DL + Farmer Carry' },
  { day: 'DAY 2', intensity: 70, focus: 'Hex Bar Deadlift\nUnilateral — Split Stance' },
  { day: 'DAY 3', intensity: 80, focus: 'Primary Strength\nBack Squat + Hex Bar DL' },
];

const baselines = [
  ['Hex Bar Deadlift', '205 lbs × 5', 'Baseline Intake', '230–240 lbs'],
  ['Back Squat', '155 lbs × 5', 'Baseline Intake', '180–190 lbs'],
  ['Split Stance', '40 lbs × 5', 'Baseline Intake', 'Progress to 50 lbs Wk2 — depth/unilateral priority'],
  ['Goblet Squat', '40 lbs × 5', 'Baseline Intake', 'Corrective load — should progress quickly'],
  ['Single-Arm Row', '50 lbs × 5', 'Baseline Intake', '62.5–65 lbs'],
  ['Pull-Up (Full)', '20 reps max', 'Baseline Intake', 'Weighted +15 lbs — 8+ reps'],
  ['Push-Up', '42 reps', 'Baseline Intake', 'Weighted — 25+ reps'],
  ['Plank (Elbow)', '3:00', 'Baseline Intake', '2:30 loaded (15 lb plate)'],
];

const baselineNotes = [
  {
    type: 'gold',
    label: 'Program Scope — No Clinical or Demographic Data On File',
    body: 'Oscar has no Styku scan, age, sex, or clinical intake data on file — only a tested strength baseline sheet. None of ICONS’s women’s Age Bracket Programming Framework numeric thresholds (protein/creatine tiers, ALST/VFA/BMI cutoffs, pelvic floor triggers, the "ICONS Index Full-Spectrum Progression Standard") are applied here — those are validated for a specific population this intake doesn’t confirm, and are not invented in their place. What does carry over: the sex-neutral ICONS three-zone structure (Isolated → Compound → Metabolic), RIR-based autoregulated progressive overload, and corrective-before-compound sequencing — all of which transfer regardless of age or sex. This program is built entirely from Oscar’s own tested numbers below.',
  },
  {
    type: 'gold',
    label: 'Coach Note',
    body: 'Highest push-up baseline in the group. 20 full pull-ups — exceptional. Heaviest single-arm row. Back squat and hex DL established. Strong across all lifts.',
  },
  {
    type: 'watch',
    label: 'Not Yet Assessed',
    body: 'Farmer Carry and Conventional Deadlift are both introduced Day 1 at conservative, technique-focused starting loads — first-session coach-judgment estimates, not Epley-derived, since neither has a tested set yet to convert. Both become real tracked baselines from this week forward. Assisted Pull-Up is deliberately NOT introduced: Oscar’s tested Full Pull-Up baseline (20 unassisted reps, the highest in the group) already far supersedes it — programming an easier regression here would be a step backward, not a missing data point.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'Day 1 — Foundational Patterns',
    subtitle: 'Squat Groove · New Hinge & Carry Baselines · Horizontal Pull',
    descriptor: 'Technique Day — New Baselines: Conventional Deadlift + Farmer Carry',
    intensityLabel: '60% Day',
    intensityPara: 'Technique day — form over load. Introduces the Conventional Deadlift as a second hinge-pattern baseline alongside the established Hex Bar Deadlift, and establishes a fresh Farmer Carry baseline — both untested movements to date.',
    warmUp: 'Hip mobility circuit 10 each, band pull-apart 2×15, glute activation 2×12, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Grooves squat depth/tempo with the tested corrective load — coach note flags this pattern should progress quickly given Oscar’s squat strength.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '3', reps: '8', load: '40 lbs', tempo: '3-1-1', rest: '60s', cue: 'Full depth, 3-sec descent every rep. Should progress quickly per coach note — squat pattern is strong.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight, squeeze shoulder blades. Preps today’s row and pull-up volume.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'New-baseline hinge → bilateral squat → horizontal pull — three different patterns in sequence, per the Antagonist Rotation Rule.',
        exercises: [
          { name: 'Deadlift (Conventional)', sets: '3', reps: '5', load: '175 lbs', tempo: '2-1-1', rest: '90s', insight: 'New baseline — conservative technique-focus estimate relative to his 205 lb tested Hex Bar Deadlift, not yet tested at this bar path. Becomes the real baseline this week.', cue: 'Longer bar path than hex bar — hips hinge back to grip, neutral spine, drive floor away.' },
          { name: 'Back Squat', sets: '4', reps: '5', load: `${d1BackSquat} lbs`, tempo: '2-1-2', rest: '90s', cue: '60% Week-1 load off his 155×5 tested baseline. Progress to 165 lbs Week 2.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d1SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Heaviest row in the group — this load reflects it even at 60% Week 1. Progress to 55 lbs Week 2.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'New Farmer Carry baseline established here, alongside Push-Up, Plank, and weighted Pull-Up strength work from Week 1 per coach note.',
        exercises: [
          { name: 'Farmer Carry (New Baseline)', sets: '3', reps: '30 yds', load: '50 lbs / hand', tempo: 'Controlled', rest: '90s', insight: 'New baseline — conservative starting estimate informed by his heaviest-in-group 50 lb Single-Arm Row grip strength, not yet tested as a carry. Becomes the real baseline this week.', cue: 'Shoulders packed, chest tall, neutral neck. First exposure — priority is clean posture over distance/load.' },
          { name: 'Push-Up', sets: '3', reps: '28–30', load: 'Bodyweight', tempo: '3-0-1', rest: '75s', cue: 'Technique day — roughly 70% of his 42-rep max to hold clean form. Weighted vest introduced Week 2.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:00', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Building toward 2:30 loaded (15 lb plate) by Week 4. Progress plate weight, not duration, per coach note.' },
          { name: 'Pull-Up (Full — Weighted)', sets: '3', reps: '4–5', load: '+15 lbs', tempo: 'Controlled', rest: '90s', cue: 'Coach note: add load immediately from Week 1. Toward the 4-week target of +15 lbs, 8+ reps.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s each, hip flexor lunge 60s each, lat stretch 30s each.',
    iconsNote: 'Two new baselines established this session — Conventional Deadlift and Farmer Carry. Coach checks bar path/hip height on the deadlift and posture/grip on the carry over any concern for load. Back Squat and Single-Arm Row loads above are Week-1, 60%-day figures.',
  },
  {
    intensity: 70,
    title: 'Day 2 — Hex Bar Deadlift + Unilateral',
    subtitle: 'Hex Bar Deadlift · Split Stance · Horizontal Pull',
    descriptor: 'Moderate Day — Farmer Carry Progression',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate volume day on the established Hex Bar Deadlift, shifting the squat pattern to unilateral (Split Stance — depth and unilateral-quality priority per coach note, since it’s lighter than his row/squat baselines).',
    warmUp: 'Thoracic mobility 10 each side, hip flexor dynamic stretch 10 each, band pull-apart 2×15, glute bridge 2×12.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Same corrective squat groove as Day 1, plus scapular prep for weighted pull-up work.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '3', reps: '8', load: '40 lbs', tempo: '3-1-1', rest: '60s', cue: 'Same corrective load and cues as Day 1 — full depth, 3-sec descent.' },
          { name: 'Bird Dog', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-2', rest: '30s', cue: 'Core brace before today’s heaviest hinge load.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'Established hinge → unilateral squat pattern → horizontal pull — three different patterns, per the Antagonist Rotation Rule.',
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `${d2HexDL} lbs`, tempo: '2-1-1', rest: '90s', cue: '70% Week-1 load off his 205×5 tested baseline. Progress to 215 lbs Week 2.' },
          { name: 'Split Stance', sets: '3', reps: '5 ea leg', load: `${d2SplitStance} lbs`, tempo: '3-1-1', rest: '75s', cue: 'Lighter than row/squat baselines by design — focus on depth and unilateral quality per coach note. Progress to 50 lbs Week 2.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d2SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: '+5 lbs from Day 1 per the weekly undulation. Full stretch at bottom every rep.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Second weekly exposure for the new Farmer Carry baseline, plus progressing Push-Up, Plank, and weighted Pull-Up work.',
        exercises: [
          { name: 'Farmer Carry', sets: '3', reps: '30 yds', load: '55 lbs / hand', tempo: 'Controlled', rest: '90s', cue: 'Second session on this new baseline — small load increase now that posture was confirmed clean Day 1.' },
          { name: 'Push-Up', sets: '3', reps: '32', load: 'Bodyweight', tempo: '3-0-1', rest: '75s', cue: 'Up to 32 reps (≈75% of max) as strength work builds. Weighted vest optional from this session.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:15', load: '10 lb plate', tempo: '—', rest: '60s', cue: 'Plate loading begins here, building toward the 15 lb Week-4 target.' },
          { name: 'Pull-Up (Full — Weighted)', sets: '3', reps: '5–6', load: '+15 lbs', tempo: 'Controlled', rest: '90s', cue: 'Holding at +15 lbs per coach note. Toward the 4-week target of 8+ reps at this load.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 60s each, lat stretch 30s each, thoracic extension on floor 60s.',
    iconsNote: 'Split Stance stays intentionally lighter this week — depth and unilateral quality take priority over load per coach note. Hex Bar Deadlift and Single-Arm Row loads above are Week-1, 70%-day figures.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Primary Strength',
    subtitle: 'Back Squat · Hex Bar Deadlift · Horizontal Pull',
    descriptor: 'Primary Strength Day — Heaviest Weekly Loads',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day — the week’s heaviest working loads on both established compound lifts, with weighted Pull-Up volume closing in on the 4-week target.',
    warmUp: 'Hip hinge drill 2×10, ankle mobility 10 each, band pull-apart 2×15, deep squat hold 2×30s.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Final corrective-squat exposure of the week before the heaviest compound loads.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '2', reps: '8', load: '40 lbs', tempo: '3-1-1', rest: '60s', cue: 'Quick priming set — pattern check before Back Squat goes heavier below.' },
          { name: 'Bird Dog', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-2', rest: '30s', cue: 'Core brace before the heaviest hinge and squat loads of the week.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'Heaviest weekly loads — bilateral squat → hinge → horizontal pull. 1–2 RIR on the last set of each; never to failure.',
        exercises: [
          { name: 'Back Squat', sets: '4', reps: '5', load: `${d3BackSquat} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Progress to 165 lbs Week 2 — 4-week target 180–190 lbs.' },
          { name: 'Hex Bar Deadlift', sets: '3', reps: '5', load: `${d3HexDL} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Approaching his tested 205×5 baseline — appropriate for the heaviest day. Progress to 215 lbs Week 2.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d3SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Approaching his tested 50×5 baseline — heaviest row of the week. 4-week target: 62.5–65 lbs.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Heaviest weekly carry, longest plank load, and the week’s heaviest weighted Pull-Up sets — closing in on Oscar’s 4-week targets.',
        exercises: [
          { name: 'Farmer Carry', sets: '3', reps: '30 yds', load: '60 lbs / hand', tempo: 'Controlled', rest: '90s', cue: 'Third and heaviest weekly session on this new baseline — matches his single-arm row load.' },
          { name: 'Push-Up', sets: '3', reps: '34', load: 'Weighted Vest (Optional)', tempo: '3-0-1', rest: '75s', cue: 'Highest volume of the week (≈80% of max) — add the vest here if bodyweight reps stay clean. Building toward 25+ weighted by Week 4.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:30', load: '15 lb plate', tempo: '—', rest: '60s', cue: 'Hits the Week-4 plate target early — hold here and let duration build from Week 2 forward.' },
          { name: 'Pull-Up (Full — Weighted)', sets: '3', reps: '6–8', load: '+15 lbs', tempo: 'Controlled', rest: '90s', cue: 'Approaching the 4-week target (+15 lbs, 8+ reps) already at Week 1 — exceptional starting point per coach note.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 90s each, doorway chest stretch 30s each, hamstring stretch 60s each, diaphragmatic breathing 2 min.',
    iconsNote: 'Heaviest day of the week on both compound lifts — 1–2 RIR on the last set, never to failure. Oscar’s squat is flagged by the coach as strong enough to progress quickly — watch for early opportunities to move Week 2 loads up ahead of schedule if form and RIR both stay clean.',
  },
];

const summary = {
  subtitle: 'Oscar  ·  ICONS Index  ·  Intermediate Strength Build  ·  Week 1',
  rows: [
    ['1', '60%', 'Foundational Patterns — New Baselines: Conv. DL + Farmer Carry', 'Back Squat / Conventional Deadlift', `Back Squat ${d1BackSquat} lbs Wk1 → 4-wk target 180–190 lbs. Conventional Deadlift and Farmer Carry baselines established this session.`],
    ['2', '70%', 'Hex Bar Deadlift + Unilateral — Farmer Carry Progression', 'Hex Bar Deadlift / Split Stance', `Hex Bar Deadlift ${d2HexDL} lbs Wk1 → 4-wk target 230–240 lbs. Farmer Carry progresses to 55 lbs/hand.`],
    ['3', '80%', 'Primary Strength — Heaviest Weekly Loads', 'Back Squat / Hex Bar Deadlift / Single-Arm Row', `Back Squat ${d3BackSquat} lbs, Hex Bar Deadlift ${d3HexDL} lbs, Row ${d3SingleArmRow} lbs Wk1. Weighted Pull-Up already closing in on the 4-wk target.`],
  ],
  milestones4wk: 'Plank: 2:30 loaded (15 lb plate). Push-Up: Weighted — 25+ reps. Hex Bar Deadlift: 230–240 lbs. Back Squat: 180–190 lbs. Pull-Up: Weighted +15 lbs — 8+ reps. Single-Arm Row: 62.5–65 lbs. (Verbatim from Oscar’s baseline sheet 4-week targets.)',
  milestones8wk: 'No 8-week target is documented on Oscar’s baseline sheet — the 4-week targets above are the sole confirmed benchmark on file. Recommend a full baseline retest at Week 8 (mirroring the ICONS Baseline Testing Protocol, including first real numbers for Conventional Deadlift and Farmer Carry) to set real 8-week targets rather than projecting unconfirmed numbers forward.',
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
  const outPath = path.join(outDir, 'Oscar_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
