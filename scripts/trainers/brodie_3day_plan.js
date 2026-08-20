/**
 * Brodie — ICONS 3-Day Training Plan (INTERMEDIATE)
 * Brace Life Studios — Trainer Development Roster
 *
 * Built from Brodie's real tested baselines in
 * system_documents/ICONS_Baseline_Sheets.docx (source: scripts/icons_baseline_sheets.js,
 * migrated 8/12/2026 from the legacy "ICONS Baseline Sheets" PDF). Companion
 * builds for Jah and Nick are being produced separately by two other agents
 * in parallel — not touched here.
 *
 * SCOPE — NO CLINICAL/DEMOGRAPHIC DATA ON FILE (same precedent as
 * scripts/petra_3day_virtual_plan.js and scripts/nancy_avitable_3day_plan.js):
 * Brodie is an ICONS Index athlete with no Styku scan, age, sex, or clinical
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
 * "working" load throughout per the coach note ("corrective pattern — full
 * depth, 3-sec descent every rep"), not %1RM progressed. Push-Up, Plank,
 * and Farmer Carry stay at/near tested baselines on the coach's own
 * written progression cadence (not Epley-based — none are 5RM-format).
 *
 * NOT YET ASSESSED (Conventional Deadlift, Assisted Pull-Up): Conventional
 * Deadlift is introduced Day 1 at a conservative technique-focused
 * first-session load (not Epley-derived — no tested set exists yet to
 * convert; flagged in-line as a coach-judgment estimate). Assisted Pull-Up
 * is DELIBERATELY NOT introduced — Brodie's tested Full Pull-Up baseline
 * (16 unassisted reps) already supersedes the assisted variant; adding an
 * easier regression for an athlete already training weighted full pull-ups
 * would be a step backward, not a missing data point. This is a stated
 * judgment call in baselineNotes below, not a silent skip.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad } = require('../icons_template');

// ── Epley 1RM conversions from tested 5RM baselines ─────────────────────
const splitStanceE1RM = epley1RM(45, 5);      // 53
const hexDLE1RM = epley1RM(205, 5);           // 239
const singleArmRowE1RM = epley1RM(40, 5);     // 47
const backSquatE1RM = epley1RM(155, 5);       // 181

// ── Week 1 working loads at the standard 60/70/80% undulation ───────────
const d1BackSquat = workingLoad(backSquatE1RM, 0.6);      // 110
const d1SingleArmRow = workingLoad(singleArmRowE1RM, 0.6); // 30
const d2HexDL = workingLoad(hexDLE1RM, 0.7);              // 165
const d2SplitStance = workingLoad(splitStanceE1RM, 0.7);   // 35
const d2SingleArmRow = workingLoad(singleArmRowE1RM, 0.7); // 35
const d3BackSquat = workingLoad(backSquatE1RM, 0.8);      // 145
const d3HexDL = workingLoad(hexDLE1RM, 0.8);              // 190
const d3SingleArmRow = workingLoad(singleArmRowE1RM, 0.8);  // 40

const client = {
  name: 'Brodie',
  programTitle: '3-Day Training Plan',
  subtitle: 'Intermediate Strength Build — Baseline-to-4-Week Progression',
  stats: ['Intermediate — ICONS Index Athlete', 'ICONS Baseline Testing Protocol', '3-Day Program', 'No Styku / Clinical Data On File'],
};

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Foundational Patterns\nNew Baseline: Conventional DL' },
  { day: 'DAY 2', intensity: 70, focus: 'Hex Bar Deadlift\nUnilateral — Split Stance' },
  { day: 'DAY 3', intensity: 80, focus: 'Primary Strength\nBack Squat + Hex Bar DL' },
];

const baselines = [
  ['Hex Bar Deadlift', '205 lbs × 5', 'Baseline Intake', '225–235 lbs'],
  ['Back Squat', '155 lbs × 5', 'Baseline Intake', '175–185 lbs'],
  ['Split Stance', '45 lbs × 5', 'Baseline Intake', 'Depth/tempo priority — lighter than group by design'],
  ['Goblet Squat', '45 lbs × 5', 'Baseline Intake', 'Corrective load — maintained for pattern quality'],
  ['Single-Arm Row', '40 lbs × 5', 'Baseline Intake', 'Progress +5 lbs every 2 sessions'],
  ['Pull-Up (Full)', '16 reps max', 'Baseline Intake', 'Weighted +10 lbs — 6+ reps'],
  ['Farmer Carry', '60 lbs / hand', 'Baseline Intake', '75 lbs / hand'],
  ['Push-Up', '37 reps', 'Baseline Intake', 'Weighted vest — 20+ reps'],
  ['Plank (Elbow)', '3:00', 'Baseline Intake', '2:30 loaded (15 lb plate)'],
];

const baselineNotes = [
  {
    type: 'gold',
    label: 'Program Scope — No Clinical or Demographic Data On File',
    body: 'Brodie has no Styku scan, age, sex, or clinical intake data on file — only a tested strength baseline sheet. None of ICONS’s women’s Age Bracket Programming Framework numeric thresholds (protein/creatine tiers, ALST/VFA/BMI cutoffs, pelvic floor triggers, the "ICONS Index Full-Spectrum Progression Standard") are applied here — those are validated for a specific population this intake doesn’t confirm, and are not invented in their place. What does carry over: the sex-neutral ICONS three-zone structure (Isolated → Compound → Metabolic), RIR-based autoregulated progressive overload, and corrective-before-compound sequencing — all of which transfer regardless of age or sex. This program is built entirely from Brodie’s own tested numbers below.',
  },
  {
    type: 'gold',
    label: 'Coach Note',
    body: 'Full unassisted pull-ups — 16 rep baseline is strong. Highest push-up count in the group. Back squat and hex DL established. Competitive across all lifts.',
  },
  {
    type: 'watch',
    label: 'Not Yet Assessed',
    body: 'Conventional Deadlift is introduced Day 1 at a conservative, technique-focused starting load — a first-session coach-judgment estimate, not Epley-derived, since no tested set exists yet. It becomes a real tracked baseline from this week forward. Assisted Pull-Up is deliberately NOT introduced: Brodie’s tested Full Pull-Up baseline (16 unassisted reps) already supersedes it — programming an easier regression for an athlete already training weighted full pull-ups would be a step backward, not a missing data point.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'Day 1 — Foundational Patterns',
    subtitle: 'Squat Groove · New Hinge Baseline · Horizontal Pull',
    descriptor: 'Technique Day — New Baseline: Conventional Deadlift',
    intensityLabel: '60% Day',
    intensityPara: 'Technique day — form over load. Introduces the Conventional Deadlift as a second hinge-pattern baseline alongside the established Hex Bar Deadlift, and grooves squat depth/tempo with the tested corrective-load Goblet Squat.',
    warmUp: 'Hip hinge drill 2×10, ankle mobility circuit 10 each, band pull-apart 2×15, glute activation 2×12.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Grooves squat depth/tempo with the tested corrective load before the new-baseline hinge work and heavier squat below.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '3', reps: '8', load: '45 lbs', tempo: '3-1-1', rest: '60s', cue: 'Full depth, 3-sec descent every rep. Corrective pattern per coach note — hold this load steady across the week.' },
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
          { name: 'Back Squat', sets: '4', reps: '5', load: `${d1BackSquat} lbs`, tempo: '2-1-2', rest: '90s', cue: '60% Week-1 load off his 155×5 tested baseline. Film side-on every session per coach note.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d1SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Drive elbow to hip, 2-sec hold at top. +5 lbs every 2 sessions per coach note.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Push-Up, Farmer Carry, Plank, and full-rep Pull-Up volume all track directly against Brodie’s exceptional tested baselines.',
        exercises: [
          { name: 'Push-Up', sets: '3', reps: '26–28', load: 'Bodyweight', tempo: '3-0-1', rest: '75s', cue: 'Technique day — 26–28 reps (roughly 70–75% of his 37-rep max) to hold clean form. Weighted vest introduced from Week 2.' },
          { name: 'Farmer Carry', sets: '3', reps: '35 yds', load: '60 lbs / hand', tempo: 'Controlled', rest: '90s', cue: 'Tested baseline load. +5 lbs every 2 sessions toward 75 lbs/hand.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:30', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Strong 3:00 baseline — trains at 2:30 loaded per coach note. Bodyweight this session; plate loading added Week 2.' },
          { name: 'Pull-Up (Full)', sets: '3', reps: '8', load: 'Bodyweight', tempo: 'Controlled', rest: '75s', cue: 'Technique-day volume, well under his 16-rep max. Weighted strength sets begin Day 2.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s each, hip flexor lunge 60s each, lat stretch 30s each.',
    iconsNote: 'First exposure to Conventional Deadlift — coach checks bar path and hip height against the established Hex Bar Deadlift pattern. Back Squat and Single-Arm Row loads above are Week-1, 60%-day figures calculated from Brodie’s tested 5RMs.',
  },
  {
    intensity: 70,
    title: 'Day 2 — Hex Bar Deadlift + Unilateral',
    subtitle: 'Hex Bar Deadlift · Split Stance · Horizontal Pull',
    descriptor: 'Moderate Day — Weighted Pull-Up Begins',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate volume day on the established Hex Bar Deadlift, shifting the squat pattern to unilateral (Split Stance, depth/tempo priority per coach note). Weighted Pull-Up strength sets begin here.',
    warmUp: 'Thoracic mobility 10 each side, hip flexor dynamic stretch 10 each, band pull-apart 2×15, glute bridge 2×12.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Same corrective squat groove as Day 1, plus scapular prep for weighted pull-up work.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '3', reps: '8', load: '45 lbs', tempo: '3-1-1', rest: '60s', cue: 'Same corrective load and cues as Day 1 — full depth, 3-sec descent.' },
          { name: 'Bird Dog', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-2', rest: '30s', cue: 'Core brace before today’s heaviest hinge load.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'Established hinge → unilateral squat pattern → horizontal pull — three different patterns, per the Antagonist Rotation Rule.',
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `${d2HexDL} lbs`, tempo: '2-1-1', rest: '90s', cue: '70% Week-1 load off his 205×5 tested baseline. Hip hinge drill mandatory before every set.' },
          { name: 'Split Stance', sets: '3', reps: '5 ea leg', load: `${d2SplitStance} lbs`, tempo: '3-1-1', rest: '75s', cue: 'Lighter than Oscar/Nick by design — prioritize depth and tempo first per coach note.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d2SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: '+5 lbs from Day 1 per the weekly undulation. 2-sec hold at top.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Weighted Pull-Up strength sets begin here per coach note ("Add load +10 lbs for strength sets") alongside progressing carry and plank.',
        exercises: [
          { name: 'Push-Up', sets: '3', reps: '30', load: 'Bodyweight', tempo: '3-0-1', rest: '75s', cue: 'Up to 30 reps (≈80% of max) as strength work builds. Weighted vest optional from this session.' },
          { name: 'Farmer Carry', sets: '3', reps: '35 yds', load: '65 lbs / hand', tempo: 'Controlled', rest: '90s', cue: '+5 lbs/hand — this is session 2. Wk4 target: 75 lbs/hand.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:30', load: '10 lb plate', tempo: '—', rest: '60s', cue: 'Plate loading begins here, building toward the 15 lb Week-4 target. Progress plate weight, not duration, per coach note.' },
          { name: 'Pull-Up (Full — Weighted)', sets: '3', reps: '5', load: '+10 lbs', tempo: 'Controlled', rest: '90s', cue: 'Weighted strength sets begin per coach note. Toward the 4-week target: +10 lbs, 6+ reps.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 60s each, lat stretch 30s each, thoracic extension on floor 60s.',
    iconsNote: 'Split Stance stays intentionally lighter this week — depth and tempo take priority over load per coach note. Hex Bar Deadlift and Single-Arm Row loads above are Week-1, 70%-day figures.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Primary Strength',
    subtitle: 'Back Squat · Hex Bar Deadlift · Horizontal Pull',
    descriptor: 'Primary Strength Day — Heaviest Weekly Loads',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day — the week’s heaviest working loads on both established compound lifts, with weighted Pull-Up volume progressing toward the 4-week target.',
    warmUp: 'Hip hinge drill 2×10, ankle mobility 10 each, band pull-apart 2×15, deep squat hold 2×30s.',
    blocks: [
      {
        letter: 'A',
        title: 'Isolated — Control & Activation',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Final corrective-squat exposure of the week before the heaviest compound loads.',
        exercises: [
          { name: 'Goblet Squat (Corrective Load)', sets: '2', reps: '8', load: '45 lbs', tempo: '3-1-1', rest: '60s', cue: 'Quick priming set — pattern check before Back Squat goes heavier below.' },
          { name: 'Bird Dog', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-2', rest: '30s', cue: 'Core brace before the heaviest hinge and squat loads of the week.' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound — Primary Strength',
        introLabel: 'Load Target',
        intro: 'Heaviest weekly loads — bilateral squat → hinge → horizontal pull. 1–2 RIR on the last set of each; never to failure.',
        exercises: [
          { name: 'Back Squat', sets: '4', reps: '5', load: `${d3BackSquat} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Progress to 165 lbs Week 2 — 4-week target 175–185 lbs. Film side-on every session.' },
          { name: 'Hex Bar Deadlift', sets: '3', reps: '5', load: `${d3HexDL} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Approaching his tested 205×5 baseline — appropriate for the heaviest day. Progress to 215 lbs Week 2.' },
          { name: 'Single-Arm Row', sets: '3', reps: '5', load: `${d3SingleArmRow} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Heaviest row of the week. Drive elbow to hip, 2-sec hold at top.' },
        ],
      },
      {
        letter: 'C',
        title: 'Metabolic — Conditioning & Carry Finisher',
        color: 'green',
        introLabel: 'Finisher Format',
        intro: 'Heaviest weekly carry, longest plank load, and the week’s heaviest weighted Pull-Up sets.',
        exercises: [
          { name: 'Push-Up', sets: '3', reps: '32', load: 'Weighted Vest (Optional)', tempo: '3-0-1', rest: '75s', cue: 'Highest volume of the week (≈85% of max) — add the vest here if bodyweight reps stay clean. Building toward 20+ weighted by Week 4.' },
          { name: 'Farmer Carry', sets: '3', reps: '35 yds', load: '70 lbs / hand', tempo: 'Controlled', rest: '90s', cue: 'Heaviest carry of the week — closing in on the 75 lb Week-4 target.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: '2:30', load: '15 lb plate', tempo: '—', rest: '60s', cue: 'Hits the Week-4 plate target early — hold here and let duration build from Week 2 forward.' },
          { name: 'Pull-Up (Full — Weighted)', sets: '3', reps: '6', load: '+10 lbs', tempo: 'Controlled', rest: '90s', cue: 'Meets the 4-week target rep count (6+) at Week-1 load — a strong early signal. Progress load next week if this stays clean.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 90s each, doorway chest stretch 30s each, hamstring stretch 60s each, diaphragmatic breathing 2 min.',
    iconsNote: 'Heaviest day of the week on both compound lifts — 1–2 RIR on the last set, never to failure. Filming Back Squat side-on is mandatory per coach note every session, not just this one.',
  },
];

const summary = {
  subtitle: 'Brodie  ·  ICONS Index  ·  Intermediate Strength Build  ·  Week 1',
  rows: [
    ['1', '60%', 'Foundational Patterns — New Baseline: Conventional DL', 'Back Squat / Conventional Deadlift', `Back Squat ${d1BackSquat} lbs Wk1 → 4-wk target 175–185 lbs. Conventional Deadlift baseline established this session.`],
    ['2', '70%', 'Hex Bar Deadlift + Unilateral — Weighted Pull-Up Begins', 'Hex Bar Deadlift / Split Stance', `Hex Bar Deadlift ${d2HexDL} lbs Wk1 → 4-wk target 225–235 lbs. Weighted Pull-Up (+10 lbs) begins.`],
    ['3', '80%', 'Primary Strength — Heaviest Weekly Loads', 'Back Squat / Hex Bar Deadlift / Single-Arm Row', `Back Squat ${d3BackSquat} lbs, Hex Bar Deadlift ${d3HexDL} lbs Wk1. Weighted Pull-Up hits 4-wk rep target (6+) at Week-1 load.`],
  ],
  milestones4wk: 'Plank: 2:30 loaded (15 lb plate). Push-Up: Weighted vest — 20+ reps. Hex Bar Deadlift: 225–235 lbs. Back Squat: 175–185 lbs. Pull-Up: Weighted +10 lbs — 6+ reps. Farmer Carry: 75 lbs/hand. (Verbatim from Brodie’s baseline sheet 4-week targets.)',
  milestones8wk: 'No 8-week target is documented on Brodie’s baseline sheet — the 4-week targets above are the sole confirmed benchmark on file. Recommend a full baseline retest at Week 8 (mirroring the ICONS Baseline Testing Protocol, including a first real number for Conventional Deadlift) to set real 8-week targets rather than projecting unconfirmed numbers forward.',
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
  const outDir = path.join(__dirname, '..', '..', 'trainers', 'brodie');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Brodie_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
