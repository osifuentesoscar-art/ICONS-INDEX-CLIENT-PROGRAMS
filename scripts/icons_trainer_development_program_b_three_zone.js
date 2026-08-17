/**
 * ICONS Trainer Development Program — Version B: The Three-Zone Practicum
 * Brace Life Studios
 *
 * Restructures the base 5-day program around the Isolated → Compound →
 * Metabolic zone philosophy (see CLAUDE.md's "ICONS Training Philosophy"
 * section) instead of a single week of graded intensities. Every normal
 * ICONS session already blends all three zones in one day — this variant
 * deliberately pulls them apart first so a trainer feels each zone in
 * isolation before feeling them combined:
 *
 *   Day 1 — ISOLATED   (new): a full day of only single-joint control
 *           work, no compound lifts at all. Uncomfortable on purpose —
 *           "control precedes power" only means something once a trainer
 *           has felt a day with zero power in it.
 *   Day 2-3 — COMPOUND (reused from the base program's 80%/90% days):
 *           the heaviest, most compound-loaded sessions in the system.
 *   Day 4 — METABOLIC  (reused from the base program's fast-twitch day):
 *           power, speed, and conditioning — the "burn" zone.
 *   Day 5 — INTEGRATED (new): a single, client-realistic session running
 *           all three zones back to back — the capstone that proves the
 *           first four days weren't separate skills, they were one skill
 *           taken apart and put back together.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');
const base = require('./icons_trainer_development_program');

const clone = (x) => JSON.parse(JSON.stringify(x));

const client = {
  ...base.client,
  programTitle: 'Train the Trainer — The Three-Zone Practicum',
  subtitle: 'Isolated → Compound → Metabolic · Advanced Level',
};

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Isolated\nOnly' },
  { day: 'DAY 2', intensity: 80, focus: 'Compound\nStrength' },
  { day: 'DAY 3', intensity: 90, focus: 'Compound\nPower' },
  { day: 'DAY 4', intensity: 90, focus: 'Metabolic\nConditioning' },
  { day: 'DAY 5', intensity: 80, focus: 'Integrated\nSession' },
  { day: 'DAY 6', intensity: 'Off', focus: 'Rest' },
  { day: 'DAY 7', intensity: 'Off', focus: 'Rest' },
];

const baselineNotes = [
  base.baselineNotes[0],
  {
    type: 'purple',
    label: 'Why Pull the Three Zones Apart First',
    body: 'Every ICONS session you deliver blends Isolated, Compound, and Metabolic work in one sitting — that\'s the standard format. This program deliberately does the opposite for four days: an entire day of nothing but isolated control work, two entire days of nothing but compound strength and power, and an entire day of nothing but metabolic conditioning. Each zone feels different in complete isolation than it does as one block inside a normal session. Day 5 puts them back together — and by then you\'ll know exactly which zone each part of that session is doing its job.',
  },
  base.baselineNotes[2],
  base.baselineNotes[3],
  base.baselineNotes[4],
];

// Day 1 — ISOLATED ZONE (new): single-joint control work only, all day.
const day1Isolated = {
  intensity: 60,
  title: 'DAY 1 — ISOLATED ZONE',
  subtitle: 'Control, Activation & Alignment — No Compound Lifts Today',
  descriptor: 'ISOLATED ZONE · CONTROL PRECEDES POWER · ZERO COMPOUND LIFTS',
  intensityLabel: 'Isolated Zone',
  intensityPara: "You will never program a full day of nothing but isolated corrective work for a client — this exists only so you feel the zone completely on its own, once, before you ever load it under a heavy compound lift again. No squat, no deadlift, no bench, no pull-up today. Every muscle you're about to load heavy this week gets activated here first, in complete isolation, with nothing competing for your attention. This is what 'control precedes power' actually means — not a slogan, a felt difference.",
  warmUp: '8 min: hip circles ×10 each, band pull-aparts 2×15, cat-cow ×10, ankle rocks ×10 each. Trainer Insight: even an all-isolated day opens with the same mobility sequence — the warm-up structure never changes, only what follows it does.',
  coolDown: '8 min: doorway chest stretch 30s each, hip flexor lunge 45s each, thoracic extension foam roller 60s, box breathing 4 rounds. Trainer Insight: notice how little this cool-down needs to undo compared to a compound day — that contrast is the whole lesson.',
  iconsNote: "DAY 1 DEBRIEF — What to log and reflect on: (1) Which single-joint pattern felt weakest in isolation — one you might not have noticed under a heavy compound lift? (2) Did today feel like 'real training'? Why or why not — and what would you say to a client who asks the same thing? (3) Which of today's isolated drills will you now insist on running before every client's compound lift, no exceptions? (4) Write down today's answer before reading Day 2 — you'll compare it after the Integrated session on Day 5.",
  blocks: [
    {
      letter: 'A', title: 'SHOULDER & SCAPULAR ISOLATION', introLabel: null,
      intro: 'Every pressing and pulling pattern you load heavy this week depends on scapular control established here, in complete isolation, first.',
      exercises: [
        { name: 'Band Pull-Apart (Horizontal)', insight: 'Trainer Insight: rear delt weakness = forward shoulder = impingement under load', sets: '3', reps: '20', load: 'Light–medium band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight. Full retraction at end. Rear delt and mid-trap.' },
        { name: 'Face Pull (Cable or Band)', insight: 'Trainer Insight: this is the posture corrective you give every client every session', sets: '3', reps: '15–20', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face. Elbows at ear height. External rotation at end. Rear delt.' },
        { name: 'Wall Slide (Scapular Control)', sets: '3', reps: '12', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Low back and wrists flat on wall throughout. Slide up without losing contact.' },
      ],
    },
    {
      letter: 'B', title: 'HIP & GLUTE ISOLATION', introLabel: null,
      intro: 'Every squat, hinge, and lunge you load heavy this week depends on glute medius and VMO activation established here, in complete isolation, first.',
      exercises: [
        { name: 'Terminal Knee Extension (TKE — Band)', insight: 'Trainer Insight: TKE is the fastest way to activate VMO before squatting. Use it always.', sets: '3', reps: '15 ea', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Band behind knee. Drive to full extension. VMO fires directly. Knee corrective.' },
        { name: 'Lateral Band Walk (Glute Med Activation)', insight: 'Trainer Insight: glute med drives knee tracking. Activate it before every bilateral squat session.', sets: '3', reps: '15 ea way', load: 'Mini-band above knees', tempo: 'Controlled', rest: '30s', cue: "Band above knees. Proud chest. Steps lateral — don't let knees cave inward." },
        { name: 'Copenhagen Plank (Adductor)', insight: 'Trainer Insight: −41% weekly groin-problem risk, cluster-RCT (Harøy et al. 2019, BJSM). Program for every client.', sets: '3', reps: '20–30s ea', load: 'Bodyweight', tempo: 'Hold', rest: '45s', cue: 'Side plank. Top leg on bench. Adductor isometric. Hips stacked.' },
      ],
    },
    {
      letter: 'C', title: 'CORE ISOLATION', introLabel: null,
      intro: 'Every carry and every compound lift you load heavy this week depends on the anti-extension and anti-rotation control established here, in complete isolation, first.',
      exercises: [
        { name: 'Dead Bug (Controlled)', insight: 'Trainer Insight: this pattern fires the anterior core that stabilizes the spine under deadlift and squat', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back into floor throughout. Opposite arm + leg. 3 sec each way.' },
        { name: 'Pallof Press (Cable)', insight: 'Trainer Insight: this fires the same core pattern as a heavy carry — pre-teaches it', sets: '3', reps: '12 ea side', load: 'Moderate', tempo: '2-1-2', rest: '45s', cue: 'Press straight out against band tension. Resist the twist. Anti-rotation.' },
      ],
    },
  ],
};

// Day 5 — INTEGRATED ZONE (new): all three zones, one client-realistic session.
const day5Integrated = {
  intensity: 80,
  title: 'DAY 5 — INTEGRATED SESSION',
  subtitle: 'Isolated + Compound + Metabolic — One Session, As Delivered',
  descriptor: '80% INTENSITY · ALL THREE ZONES · THE SESSION A CLIENT ACTUALLY GETS',
  intensityPara: "This is the session you actually deliver to a client — every zone from the last four days, back in one sitting. Notice that the corrective block feels faster and more automatic than it did on Day 1, the compound lift feels more controlled than it did on Days 2–3, and the finisher feels more familiar than it did on Day 4. That's not coincidence. That's the isolated work transferring into the compound work transferring into the metabolic work — the exact chain you are building in every client who walks through this same sequence for the first time.",
  warmUp: '10 min: foam roll thoracic spine 60s, band pull-aparts 2×15, TKE 2×15 ea, hip hinge drill with dowel ×8, goblet squat 2×10 (light). Trainer Insight: the warm-up itself is a compressed Isolated Zone — this is where the three zones start blending, before the session has even officially begun.',
  coolDown: '10 min: thoracic extension foam roller 90s, doorway chest stretch 30s each, hip flexor lunge 60s each, 3 min supine breathing. Trainer Insight: full-session cool-down, covering both the compound loading and the metabolic finisher — this is the version you run for a client after her heaviest, most complete session of the week.',
  iconsNote: "DAY 5 DEBRIEF — What to log and reflect on: (1) Compare this to your Day 1 answer: did today feel more like 'real training'? What changed? (2) Which zone transferred into the next most obviously — isolated into compound, or compound into metabolic? (3) If you had to cut one zone from today's session to save 15 minutes for a client running late, which would you cut, and why — and would your answer change for a different client? (4) You've now felt all three zones apart and together. Write the one sentence you'll use to explain this structure to a client who asks why her session has three 'parts.'",
  blocks: [
    {
      letter: 'A', title: 'ISOLATED — CORRECTIVE PRIMER', introLabel: null,
      intro: "The same isolated work from Day 1, compressed into a warm-up-length block — this is how the Isolated Zone actually shows up in a normal client session: not as a standalone day, but as the first ten minutes of every session, every time.",
      exercises: [
        { name: 'Lateral Band Walk (Glute Med Activation)', sets: '2', reps: '15 ea way', load: 'Mini-band above knees', tempo: 'Controlled', rest: '30s', cue: 'Band above knees. Proud chest. Steps lateral, maintain tension.' },
        { name: 'Band Pull-Apart (Horizontal)', sets: '2', reps: '20', load: 'Light–medium band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight. Full retraction at end. Rear delt and mid-trap.' },
      ],
    },
    {
      letter: 'B', title: 'COMPOUND — PRIMARY HINGE', introLabel: null,
      intro: "Primary strength, at 80% — hard but clean, exactly the effort level where a client can still hear and apply your cue. This is the Compound Zone doing what it does best: building the strength and shape that make the rest of the session possible.",
      exercises: [
        { name: 'Hex Bar Deadlift — Work Sets', insight: 'Trainer Insight: 3-sec eccentric is non-negotiable. This is where bone density is stimulated. Every client gets this.', sets: '4', reps: '5–6', load: '80% Est 1RM', tempo: '3-1-1', rest: '2 min', cue: 'Neutral spine. Hip-width stance. Drive floor away. Lock hips + knees at top.', rirNote: '2 RIR — default proximity for a primary lift' },
        { name: 'Single-Arm DB Row (Heavy)', insight: 'Trainer Insight: log left vs right separately — you may find your own asymmetry', sets: '3', reps: '8–10', load: 'Heavy — 8RM', tempo: '3-1-2', rest: '60s', cue: 'Chest on bench. Full stretch at bottom — blade opens. Note L vs R.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'C', title: 'METABOLIC — CONDITIONING FINISHER', introLabel: null,
      intro: "The same finisher logic from Day 4, sized to close a normal session rather than headline an entire day — the Metabolic Zone's real job in a client's week: the last five minutes that turn a strength session into something that also feels like an accomplishment.",
      exercises: [
        { name: 'AMRAP — 6 Minutes (Record Rounds)', insight: 'Trainer Insight: same competitive framing as Day 4 — record it, beat it next week, teach clients to do the same.', sets: '6 min', reps: 'Max rounds', load: 'See cue', tempo: '—', rest: '—', cue: '5 KB swings + 10 mountain climbers ea side + 10 yd sprint. Count and record total rounds.' },
      ],
    },
  ],
};

const days = [
  day1Isolated,
  clone(base.days[0]), // Compound — 80%
  clone(base.days[1]), // Compound — 90%
  clone(base.days[4]), // Metabolic — 90% fast-twitch
  day5Integrated,
];

days[1].title = 'DAY 2 — COMPOUND ZONE · STRENGTH';
days[1].descriptor = '80% INTENSITY · COMPOUND ZONE · STRENGTH, SHAPE & HORMONAL BALANCE';
days[2].title = 'DAY 3 — COMPOUND ZONE · POWER';
days[2].descriptor = '90% INTENSITY · COMPOUND ZONE · MAXIMUM LOADING · BONE DENSITY';
days[3].title = 'DAY 4 — METABOLIC ZONE';
days[3].descriptor = '90% INTENSITY · METABOLIC ZONE · BURN, ENERGY & ENDURANCE';

const summary = {
  subtitle: `${client.programTitle} · ICONS Index · Week 1`,
  rows: [
    ['DAY 1', '60% — Isolated', 'Control Only', 'Band Pull-Apart · TKE · Lateral Band Walk · Dead Bug', 'Zero compound lifts · felt precision only · sets up every later day'],
    ['DAY 2', '80% — Compound', 'Strength', 'Bench · OHP · Weighted Pull-Up · Heavy Row · Loaded Plank', 'Push = Pull volume · 4 sets at 80% 1RM · 2 RIR discipline'],
    ['DAY 3', '90% — Compound', 'Power', 'Hex DL · Hip Thrust · Weighted Carry · AMRAP Finisher', 'Deadlift 87–92% 1RM · Carry BW/hand · Record AMRAP score'],
    ['DAY 4', '90% — Metabolic', 'Conditioning', 'Depth Jump · Sled Sprint · Chest Pass · Interval Finisher', 'Rate of force development · Plyometrics · Max output'],
    ['DAY 5', '80% — Integrated', 'All 3 Zones', 'Corrective Primer → Hex DL → AMRAP Finisher', 'One session, every zone — the format every client gets'],
  ],
  milestones4wk: base.summary.milestones4wk,
  milestones8wk: base.summary.milestones8wk,
  rescanNote: base.summary.rescanNote,
};

const data = {
  client,
  weekOverview,
  baselines: base.baselines,
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
  const outPath = path.join(outDir, 'ICONS_Trainer_Development_Program_B_Three_Zone_Practicum.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
