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

const baselineNotes = [
  {
    type: 'green',
    label: 'ALST Index Optimal — 7.23 kg/m²',
    body: 'Above the 7.0 kg/m² EWGSOP2 optimal threshold. This program layers strength maintenance under a fat-loss/cardiometabolic focus rather than muscle-building-primary — loads hold at tested baselines while the conditioning finisher does the heavy lifting on body composition.',
  },
  {
    type: 'watch',
    label: 'VFA 142.7 cm² — Moderate Cardiometabolic Risk',
    body: 'Falls in the 100–149 cm² moderate-risk band. Drives the metabolic finisher on every training day — brisk, sustainable conditioning, not max-effort testing.',
  },
  {
    type: 'watch',
    label: 'Body Fat 40.4% At-Risk',
    body: 'Tracked alongside VFA as the cardiometabolic/fat-loss priority for this block. Reassess at the 8-week Styku rescan.',
  },
  {
    type: 'teal',
    label: 'Left Leg Asymmetry — 17.5 vs 18.0 lbs LST',
    body: 'Gap of 0.5 lbs meets the asymmetry protocol trigger. LEFT leg leads every unilateral lower-body exercise. Log left vs. right loads separately.',
  },
  {
    type: 'teal',
    label: 'Right Arm — 8.4 vs 8.7 lbs LST (Monitor Only)',
    body: 'Gap of 0.3 lbs sits below the 0.5 lb asymmetry-protocol threshold. Logged per side on single-arm row and suitcase carry as routine monitoring, not a formal lead-side prescription.',
  },
  {
    type: 'gold',
    label: 'Squat & Deadlift — Baseline Established This Week',
    body: 'Not part of the initial testing battery. Today\'s working loads (Goblet Squat 20 lbs, Trap Bar Deadlift 45 lbs) become the new 8-week baseline — track progression from here.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Full Body Strength & Metabolic Conditioning',
    subtitle: 'Moderate Strength + Cardiometabolic Priority',
    descriptor: 'Moderate Strength · Volume Build · Conditioning Priority',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate strength, building volume without peak CNS demand. Loads sit on today\'s tested baselines (Hip Thrust, Seated OHP) while a conditioning finisher supports the VFA and body-fat priority from your Styku scan. This is strength maintenance layered under fat-loss focus, not muscle-building-primary — your ALST is already optimal at 7.23 kg/m².',
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
        title: 'PRIMARY STRENGTH',
        introLabel: 'Load Target',
        intro: 'Working sets at 70% — 2 RIR.',
        exercises: [
          { name: 'DB Hip Thrust', sets: '3', reps: '8', load: '60 lbs', tempo: '2-1-2', rest: '90s', flag: 'Brace + exhale on exertion — pelvic floor cue', cue: 'Drive through heels, glutes lock at top.', rirNote: '2 RIR' },
          { name: 'Seated DB Overhead Press', sets: '3', reps: '8', load: '17.5 lbs', tempo: '2-0-2', rest: '75s', cue: 'Ribs stacked over hips, press straight up.', rirNote: '2 RIR' },
          { name: 'Chest-Supported Row', sets: '3', reps: '10', load: '20 lbs', tempo: '2-1-2', rest: '75s', cue: 'Squeeze shoulder blades, elbows track back.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY',
        color: 'gold',
        introLabel: 'Note',
        intro: 'Farmers Carry is bilateral load-bearing — same pelvic floor bracing cue applies before every pass.',
        exercises: [
          { name: 'Incline Push-Up', sets: '3', reps: '8', load: 'bodyweight (bench)', tempo: '3-1-1', rest: '60s', cue: 'Hands under shoulders, chest to bench, brace.', rirNote: '2 RIR' },
          { name: 'DB Farmers Carry', sets: '3', reps: '40 yd', load: '30 lbs/hand', tempo: 'controlled', rest: '60s', flag: 'Brace before lifting — pelvic floor cue', cue: 'Tall posture, ribs down, quick tight steps.', rirNote: '2 RIR' },
          { name: 'Plank Hold', sets: '3', reps: '40 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'D',
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
    intensityPara: 'Squat and deadlift were not tested in the initial battery, so today\'s loads are deliberately light and become the new 8-week baseline. Left leg leads every unilateral set — Styku segmental LST shows a 0.5 lb deficit (17.5 vs 18.0 lbs), exactly at the asymmetry protocol trigger. Work every set at 3+ RIR.',
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
        title: 'PRIMARY STRENGTH — TECHNIQUE INTRODUCTION',
        introLabel: 'Load Target',
        intro: 'No baseline was recorded for squat or deadlift. Loads stay light; the goal is a clean, repeatable pattern for 8-week testing, not load.',
        exercises: [
          { name: 'Goblet Squat', sets: '3', reps: '8', load: '20 lbs', tempo: '3-1-1', rest: '75s', cue: 'Elbows inside knees, chest tall, full depth.', rirNote: '3+ RIR' },
          { name: 'Trap Bar Deadlift', sets: '3', reps: '6', load: '45 lbs', tempo: '2-1-1', rest: '90s', cue: 'Flat back, brace, push floor away evenly.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'UNILATERAL LEG — LEFT-LED',
        introLabel: 'Why',
        intro: 'Styku scan shows a 0.5 lb left-leg deficit (L 17.5 / R 18.0) — at the asymmetry trigger threshold. Left leg leads every set below; log reps per side.',
        exercises: [
          { name: 'Single-Leg RDL', sets: '3', reps: '6/side', load: '22.5 lbs/hand', tempo: '3-1-1', rest: '60s', flag: 'Left leg weaker (Styku) — leads every set', cue: 'Left leg first. Hinge, flat back, soft knee.', rirNote: '2 RIR' },
          { name: 'Reverse Lunge', sets: '3', reps: '8/side', load: 'bodyweight', tempo: '2-1-1', rest: '60s', flag: 'Left leg leads', cue: 'Left leg first. Knee tracks over mid-foot.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
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
    intensityPara: 'Moderate strength, building pressing/pulling volume without peak CNS demand. Single-arm row and suitcase carry are logged per side given the marginal right-arm deficit on Styku (0.3 lb gap — below the formal 0.5 lb trigger, tracked as routine monitoring).',
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
        title: 'PRIMARY STRENGTH',
        introLabel: 'Load Target',
        intro: 'Working sets at 70% — 2 RIR on all sets.',
        exercises: [
          { name: 'Bent-Over DB Row', sets: '3', reps: '10', load: '20 lbs/hand', tempo: '2-1-2', rest: '75s', cue: 'Flat back, pull to hip, squeeze at top.', rirNote: '2 RIR' },
          { name: 'Incline DB Press', sets: '3', reps: '8', load: '17.5 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Ribs down, press up and slightly in.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY',
        color: 'gold',
        introLabel: 'Note',
        intro: 'Suitcase carry loads the pelvic floor bracing pattern under single-side load — same cue as flagged above. Single-arm row and suitcase carry track L/R per the marginal Styku arm gap.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '10', load: '20 lbs', tempo: '2-1-2', rest: '60s', flag: 'Log reps per side — track L/R (Styku)', cue: 'Brace on bench, pull to hip, no rotation.', rirNote: '2 RIR' },
          { name: 'Suitcase Carry', sets: '3', reps: '30 yd/side', load: '25 lbs', tempo: 'controlled', rest: '60s', flag: 'Brace before lifting — pelvic floor cue', cue: 'Ribs stacked, resist leaning, quick steps.', rirNote: '2 RIR' },
          { name: 'Plank Hold', sets: '3', reps: '40 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'D',
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
    iconsNote: 'Log single-arm row and suitcase carry reps per side — right arm is marginally lighter on Styku (8.4 vs 8.7 lbs) though below the formal asymmetry trigger. Keep bracing on the suitcase carry, as flagged above.',
  },
];

const summary = {
  subtitle: 'Johanna Castillo  ·  ICONS Index  ·  Moderate Strength & Metabolic Conditioning Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Full Body Strength & Metabolic Conditioning', 'DB Hip Thrust', 'Working loads hold at tested baseline; conditioning finisher drives VFA/body-fat priority'],
    ['2', '60%', 'Lower Body Technique', 'Goblet Squat / Trap Bar Deadlift', 'New baseline established — left leg leads all unilateral work'],
    ['3', '70%', 'Upper Body & Posterior Chain', 'Bent-Over DB Row', 'Single-arm row & suitcase carry tracked per side — monitor right-arm gap'],
  ],
  milestones4wk: 'Squat 25–27.5 lbs × 8 @ 2–3 RIR. Trap bar deadlift 55–60 lbs × 6. Hip thrust progressing toward 70 lbs. Left-leg single-leg RDL load matched to right within 10%.',
  milestones8wk: 'Squat/deadlift 8-week retest against today\'s new baseline. VFA and body fat % trending down from 142.7 cm² / 40.4%. Left/right leg LST gap reduced from 0.5 lbs. Hip thrust and OHP progressed from current working loads.',
  rescanNote: 'Rebook Styku scan at 8 weeks. Track: VFA and body fat % direction, left/right leg LST gap (baseline 0.5 lb), right arm LST gap (baseline 0.3 lb, monitor for trigger), ALST maintenance (currently optimal at 7.23 kg/m²).',
};

const data = {
  client,
  weekOverview,
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'johanna_castillo');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Johanna_Castillo_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
