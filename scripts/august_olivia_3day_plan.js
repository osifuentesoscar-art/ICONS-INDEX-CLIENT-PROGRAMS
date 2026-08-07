/**
 * August Olivia — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * Source data: Styku scan 8/5/2026, shoulder extension force test 6/1/2026,
 * baseline strength testing 8/5/2026 (client-reported).
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'August Olivia',
  programTitle: '3-Day Training Plan',
  subtitle: '60–80% Progressive Intensity Build',
  schedule: 'Tue/Thu/Sat Gym',
  stats: ['Age 25', '5\'2"', '109 lbs', 'Tue/Thu/Sat Gym', 'Sun, Mon, Wed, Fri Off'],
  weightKg: 49.4,
  ageYears: 25,
  isPostmenopausal: false,
  bmr: 1284,
  alstIndex: 5.02,
};

const styku = {
  scanDate: '8/5/2026',
  bodyFatPct: 43.4,
  bodyFatRank: 'AT-RISK',
  leanMass: 58.1,
  leanMassPct: 53.3,
  fatMass: 47.3,
  boneMass: 3.6,
  bmi: 19.9,
  bmr: 1284,
  vfa: 71.4,
  shapeScore: 39,
  shapeScoreLabel: 'Off Track',
  alstIndex: 5.02,
  leftArmLST: 4.3,
  rightArmLST: 4.7,
  leftLegLST: 11.4,
  rightLegLST: 12.1,
  peerComparison: 'Body fat % is higher than 88% of women ages 18–29 (Mayo Clinic reference ranges).',
};

const weekOverview = [
  { day: 'MON', intensity: 'Off', focus: 'Off' },
  { day: 'TUE', intensity: 70, focus: 'Full-Body\nFoundation' },
  { day: 'WED', intensity: 'Off', focus: 'Off' },
  { day: 'THU', intensity: 60, focus: 'Lower Unilateral\n& Corrective' },
  { day: 'FRI', intensity: 'Off', focus: 'Off' },
  { day: 'SAT', intensity: 80, focus: 'Upper Push/Pull\n+ Core' },
  { day: 'SUN', intensity: 'Off', focus: 'Off' },
];

const baselines = [
  ['Deadlift', 'N/A — Not Yet Tested', '8/5/2026', 'Establish baseline Week 1'],
  ['Back Squat (DB Goblet)', '35 lb × 5', '8/5/2026', '45–50 lb × 5 @ 1–2 RIR'],
  ['Seated OH Press (DB)', '12 lb × 5', '8/5/2026', '15 lb × 5 @ 1–2 RIR'],
  ['Incline Push-Up', '5 reps', '8/5/2026', '8–10 reps, progress incline'],
  ['DB Farmer Carry', '25 lb / hand', '8/5/2026', '30–35 lb / hand'],
  ['Hip Thrust', '45 lb × 5', '8/5/2026', '65–75 lb × 5'],
  ['RDL (DB, each hand)', '17.5 lb × 5', '8/5/2026', '20–22.5 lb × 5'],
  ['Lunges', 'N/A — Not Yet Tested', '8/5/2026', 'Establish baseline Week 1'],
  ['Plank Hold', '50 sec', '8/5/2026', '70–75 sec'],
];

const baselineNotes = [
  {
    type: 'clinical',
    label: 'ALST Index At-Risk — 5.02 kg/m²',
    body: 'Below the 5.5 kg/m² EWGSOP2 sarcopenia-risk threshold despite age 25. Muscle-building is the primary physiological goal of this program. Every session prioritizes progressive resistance loading. Protein and creatine targets are escalated below — see Nutrition Targets.',
  },
  {
    type: 'watch',
    label: 'Body Fat 43.4% At-Risk With Normal BMI (19.9)',
    body: 'A normal BMI is masking an At-Risk body fat percentage and an Off Track Shape Score (39/100) — a "normal weight, high adiposity" profile. Track body composition and circumference trends at the 8-week rescan, not scale weight.',
  },
  {
    type: 'clinical',
    label: 'Right Shoulder Force Deficit — 63.2% Asymmetry',
    body: 'Shoulder extension force test (6/1/2026): Peak Force Left 190N vs Right 70N — 63.2% asymmetry favoring the left. Right shoulder leads all unilateral pressing and pulling movements at reduced load with strict tempo control. Add rotator cuff and scapular stability work every session. Avoid near-maximal bilateral overhead loading until reassessed. Flag any pain, weakness, or fatigue on the right to your coach immediately.',
  },
  {
    type: 'teal',
    label: 'Left Leg Lean Soft Tissue Asymmetry — 11.4 vs 12.1 lbs',
    body: 'Gap of 0.7 lbs meets the ≥0.5 lb asymmetry threshold. LEFT leg leads all unilateral lower-body exercises. Log left vs. right loads separately in the coaching cue field. Reassess at the 8-week Styku rescan — asymmetry should reduce.',
  },
  {
    type: 'gold',
    label: 'Baselines Pending — Deadlift & Lunges',
    body: 'Not yet tested. Establish working loads under direct coach supervision in the Week 1 session, then add to the programmed baseline table above.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Tuesday',
    subtitle: 'Full-Body Foundation — Squat, Hip Thrust, Press',
    descriptor: 'Moderate Day — Building Baseline Volume',
    intensityLabel: '70% Day',
    intensityPara: 'Tuesday\'s loads are moderate — challenging but not near-maximal. Focus on clean, repeatable technique across all three movement patterns before load increases next block.',
    warmUp: '5 min bike or march in place. 2 rounds: 10 bodyweight squats, 10 arm circles each direction (both arms, controlled), 10 glute bridges, 30-sec world\'s greatest stretch each side.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY LOWER — SQUAT',
        introLabel: 'Load Target',
        intro: 'Goblet position, DB held at chest. Full-Body Foundation lift for the day — own the depth and bracing pattern before adding load.',
        exercises: [
          { name: 'DB Goblet Squat', sets: '3', reps: '5', load: '35 lb', tempo: '3-1-1', rest: '90s', cue: 'Chest tall, sit hips back, knees track over toes.' },
          { name: 'Bodyweight Squat (pattern set)', sets: '1', reps: '10', load: 'BW', tempo: '2-0-1', rest: '—', cue: 'Warm-up pattern set before loaded work.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'B',
        title: 'POSTERIOR CHAIN',
        introLabel: 'Why',
        intro: 'Hip thrust and RDL build the posterior chain that supports every lift on the baseline sheet.',
        exercises: [
          { name: 'Barbell Hip Thrust', sets: '3', reps: '5', load: '45 lb', tempo: '2-1-1', rest: '90s', cue: 'Chin tucked, ribs down, drive through heels.', rirNote: '1–2 RIR' },
          { name: 'DB Romanian Deadlift', sets: '3', reps: '5', load: '17.5 lb/hand', tempo: '3-1-1', rest: '75s', cue: 'Soft knees, hinge hips back, feel hamstring stretch.' },
        ],
      },
      {
        letter: 'C',
        title: 'UPPER PRESS & CORE',
        color: 'gold',
        introLabel: 'Shoulder Note',
        intro: 'Right shoulder leads at reduced load with strict control — see clinical flag above.',
        exercises: [
          { name: 'Seated DB OH Press', sets: '3', reps: '5', load: '12 lb', tempo: '2-0-2', rest: '75s', flag: 'Right shoulder leads — control tempo, no press-out compensation.', cue: 'Ribs down, press straight overhead, avoid arching.' },
          { name: 'Incline Push-Up', sets: '3', reps: '5–6', load: 'BW, bench', tempo: '3-0-1', rest: '60s', cue: 'Hands under shoulders, hips level, full lockout.' },
          { name: 'Plank Hold', sets: '3', reps: '40–45s', load: 'BW', tempo: '—', rest: '45s', cue: 'Ribs down, glutes on, straight line head to heel.' },
        ],
      },
    ],
    coolDown: '2 min child\'s pose breathing. Doorway chest stretch 30s/side. Couch stretch (hip flexor) 30s/side. Standing quad stretch 20s/side.',
    iconsNote: 'ALST At-Risk at 25 means today\'s work is the highest-leverage session of the week for long-term muscle. Hit your protein target below and take creatine with your next meal.',
  },
  {
    intensity: 60,
    title: 'Day 2 — Thursday',
    subtitle: 'Lower Unilateral & Corrective — Asymmetry Protocol',
    descriptor: 'Technique & Corrective Day — Lighter Loads, No PRs',
    intensityLabel: '60% Day',
    intensityPara: 'Thursday is the lightest training day of the week by design — technique-first. LEFT leg leads every unilateral movement per the asymmetry protocol above; lighter loads, full attention on control and symmetry, not weight on the bar.',
    warmUp: '5 min easy cardio. 2 rounds: 10 banded lateral walks each direction, 10 glute bridges, 20-sec single-leg balance each side (eyes open).',
    blocks: [
      {
        letter: 'A',
        title: 'KNEE VALGUS & ASYMMETRY CORRECTIVE CIRCUIT',
        color: 'red',
        introLabel: 'Why',
        intro: 'Hip abductor / glute med activation before loaded unilateral work — standard screen for women\'s ACL/knee-valgus risk on single-leg patterns, and the entry point for closing the flagged leg asymmetry.',
        exercises: [
          { name: 'Banded Lateral Walk', sets: '2', reps: '10 each way', load: 'Mini band', tempo: '—', rest: '30s', cue: 'Band above knees, push knees out, stay low.' },
          { name: 'Single-Leg Balance', sets: '2', reps: '20–30s each', load: 'BW', tempo: '—', rest: '20s', flag: 'Left leg leads — log seconds L vs R separately.', cue: 'Soft knee, tall posture, eyes on a fixed point.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY UNILATERAL',
        introLabel: 'Load Target',
        intro: 'Left leg leads every set — always perform the left-side rep first while freshest.',
        exercises: [
          { name: 'DB Split Squat', sets: '3', reps: '5 each leg', load: 'Light DB', tempo: '3-1-1', rest: '75s', flag: 'Left leg leads — log load/reps L vs R separately.', cue: 'Left leg first. Torso tall, back knee soft-tap.' },
          { name: 'DB Suitcase Farmer Carry', sets: '3', reps: '20 yd each hand', load: '25 lb', tempo: '—', rest: '60s', cue: 'Ribs stacked over hips, no side lean, tight grip.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY',
        color: 'gold',
        exercises: [
          { name: 'Single-Leg RDL (hand-supported)', sets: '2', reps: '5 each leg', load: 'BW / light DB', tempo: '3-1-1', rest: '60s', flag: 'Left leg leads.', cue: 'Hinge from hip, square hips to the floor.' },
          { name: 'Copenhagen Plank (bench, top leg)', sets: '2', reps: '15–20s each side', load: 'BW', tempo: '—', rest: '30s', cue: 'Side plank, top shin on bench, hold level hips.' },
        ],
      },
    ],
    coolDown: '90/90 hip stretch 30s/side. Standing adductor stretch 20s/side. Figure-4 glute stretch 30s/side.',
    iconsNote: 'No PRs today — this session exists to close the left/right leg gap. Every left-side rep goes first, at full attention, before the right.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Saturday',
    subtitle: 'Upper Push/Pull + Core — Primary Strength',
    descriptor: 'Primary Strength Day — Last 1–2 Reps Hard, Achievable',
    intensityLabel: '80% Day',
    intensityPara: 'Saturday is this week\'s primary strength stimulus for the upper body. Right shoulder still leads all pressing and pulling at a controlled load — build capacity without overloading the deficit side.',
    warmUp: '5 min row or bike. 2 rounds: 10 band pull-aparts, 10 scap push-ups, 10 arm circles each direction (both arms).',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY PRESS',
        introLabel: 'Shoulder Note',
        intro: 'Right shoulder leads every set at a reduced, controlled load — see clinical flag on page 1.',
        exercises: [
          { name: 'Seated DB OH Press', sets: '3', reps: '5', load: '12–13 lb', tempo: '2-0-2', rest: '90s', flag: 'Right shoulder leads at reduced load — strict tempo.', cue: 'Right arm first. Ribs down, straight overhead path.', rirNote: '1–2 RIR' },
          { name: 'Incline Push-Up', sets: '3', reps: '6–8', load: 'BW, bench', tempo: '3-0-1', rest: '60s', cue: 'Lower bench height only if form holds clean.' },
        ],
      },
      {
        letter: 'B',
        title: 'PULL',
        introLabel: 'Why',
        intro: 'Single-arm row trains the weaker right shoulder unilaterally under full control.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '6 each arm', load: '15–17.5 lb', tempo: '2-1-1', rest: '75s', flag: 'Right arm leads — log load L vs R separately.', cue: 'Right first. Flat back, pull elbow to hip.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '12–15', load: 'Light band', tempo: '2-1-2', rest: '45s', cue: 'Squeeze shoulder blades, control the return.' },
        ],
      },
      {
        letter: 'C',
        title: 'CORE & CARRY',
        color: 'gold',
        exercises: [
          { name: 'DB Farmer Carry', sets: '3', reps: '25 yd each hand', load: '25–27.5 lb', tempo: '—', rest: '60s', cue: 'Tall posture, ribs stacked, quiet shoulders.' },
          { name: 'Plank Hold', sets: '3', reps: '45–50s', load: 'BW', tempo: '—', rest: '45s', cue: 'Ribs down, glutes on, no hip sag.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s/side. Cross-body shoulder stretch 20s/side. Cat-cow x8. Child\'s pose 60s.',
    iconsNote: 'Primary strength day for the week — but "primary" means controlled intensity, not max effort on the right shoulder. Stop any set early if you feel right-side fatigue outpacing the left.',
  },
];

const summary = {
  subtitle: 'August Olivia  ·  ICONS Index  ·  Progressive Intensity Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Full-Body Foundation', 'DB Goblet Squat', 'Baseline volume — form check on all 3 patterns'],
    ['2', '60%', 'Lower Unilateral & Corrective', 'DB Split Squat', 'No PRs — left leg leads, close the leg gap'],
    ['3', '80%', 'Upper Push/Pull + Core', 'Seated DB OH Press', 'Right shoulder leads at controlled load'],
  ],
  milestones4wk: 'Squat 40–42.5 lb × 5 @ 1–2 RIR. Hip thrust 55–60 lb × 5. Plank 60s. Right shoulder unilateral load within 20% of left on single-arm row.',
  milestones8wk: 'Squat 45–50 lb × 5 @ 1–2 RIR. Deadlift and lunge baselines established and progressing. Plank 70–75s. Left/right leg LST gap reduced from 0.7 lbs.',
  rescanNote: 'Rebook Styku scan at 8 weeks. Track: ALST Index trend toward 5.5 kg/m², body fat % direction, left/right leg LST gap, and right shoulder force output vs. left on the extension test.',
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
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'august_olivia');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'August_Olivia_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
