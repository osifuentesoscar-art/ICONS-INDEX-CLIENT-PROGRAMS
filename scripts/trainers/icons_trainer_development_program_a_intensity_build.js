/**
 * ICONS Trainer Development Program — Version A: The Intensity Build
 * Brace Life Studios
 *
 * Reworks the base 5-day "Train the Trainer" program (icons_trainer_
 * development_program.js, sequence 80/90/70/70/90%) into the classic
 * linear ICONS week: 60 → 70 → 80 → 90 → Active Recovery. This is the
 * most direct trainer-facing analog of the framework used on every
 * client (see Kelly Mulroy's reference plan) — trainers feel the week
 * build in a straight line instead of peaking on Day 2.
 *
 * Reuses the base script's Day 1 (80%), Day 2 (90%), and Day 3 (70%)
 * content verbatim, resequenced. Adds two days the base program never
 * covered at all: a 60% technique day and an Active Recovery day —
 * a real gap, since a trainer who has never *felt* an AR day has no
 * basis to coach one convincingly.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('../icons_template');
const base = require('./icons_trainer_development_program');

const clone = (x) => JSON.parse(JSON.stringify(x));

const client = {
  ...base.client,
  programTitle: 'Train the Trainer — The Intensity Build',
  subtitle: '60–90% Linear Progressive Build · Advanced Level',
};

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Technique\n& Pattern' },
  { day: 'DAY 2', intensity: 70, focus: 'Both Legs\n& Upper' },
  { day: 'DAY 3', intensity: 80, focus: 'Primary\nStrength' },
  { day: 'DAY 4', intensity: 90, focus: 'Peak\nOutput' },
  { day: 'DAY 5', intensity: 'AR', focus: 'Active\nRecovery' },
  { day: 'DAY 6', intensity: 'Off', focus: 'Rest' },
  { day: 'DAY 7', intensity: 'Off', focus: 'Rest' },
];

const baselineNotes = [
  base.baselineNotes[0],
  {
    type: 'green',
    label: 'Why Linear, Not Peak-Early',
    body: "The client-facing ICONS week almost always builds in a straight line — 60% technique, 70% moderate, 80% primary, 90% peak, then Active Recovery — so the nervous system ramps into the hardest day instead of front-loading it. This version puts you through that exact arc instead of jumping to 80% on Day 1. Notice how differently Day 3's 80% session feels after two build-up days, versus opening the week there.",
  },
  base.baselineNotes[2],
  base.baselineNotes[3],
  base.baselineNotes[4],
];

// Day 1 — 60% Teal — Technique Day (new: base program has no 60% day)
const day1Technique = {
  intensity: 60,
  title: 'DAY 1 — TECHNIQUE & PATTERN',
  subtitle: 'Squat · Hinge · Push · Pull — Bodyweight & Light Load Only',
  descriptor: '60% INTENSITY · FORM OVER LOAD · NO PRS · THE DAY MOST TRAINERS SKIP',
  intensityPara: 'Day 1 is 60% — the teal technique day. No PRs, no grinding, nothing near your limit. This is the day most advanced lifters mentally check out of, and it is exactly the day a client needs you most present for. Every pattern you will load heavy later in the week gets rehearsed here first, at a weight where your coaching cue is the only variable that matters.',
  warmUp: '8 min: hip circles ×10 each, band pull-aparts 2×15, cat-cow ×10, glute bridge 2×12, ankle rocks ×10 each. Trainer Insight: a 60% day still opens with the same mobility → activation → pattern primer sequence as every other day — the warm-up doesn\'t get smaller just because the loads do.',
  coolDown: '8 min: standing forward fold 45s, doorway chest stretch 30s each, hip flexor lunge 45s each, box breathing 4 rounds. Trainer Insight: cool-downs on light days are just as non-negotiable — this is where you build the habit clients will copy on their own hardest days.',
  iconsNote: "DAY 1 DEBRIEF — What to log and reflect on: (1) Where did your form actually break down, even at this light load? (2) Could you feel the target muscle on every rep, or did you rush through it? (3) What would you say out loud to a client struggling with the hip hinge pattern today? (4) A 60% day is often harder to coach well than a 90% day, because there's no adrenaline to hide behind. Did you notice that?",
  blocks: [
    {
      letter: 'A', title: 'PATTERN PRIMER — SQUAT & HINGE', introLabel: null,
      intro: 'Before any compound lift gets loaded this week, the pattern gets rehearsed at a weight where it cannot go wrong. This is the exact sequence you will use with a brand-new client in her first session — and the exact sequence you owe your most advanced client before her heaviest week.',
      exercises: [
        { name: 'Goblet Squat (Bodyweight or Light DB)', insight: 'Trainer Insight: this is the squat pattern screen you run on every new client — watch depth, knee tracking, and torso angle', sets: '3', reps: '12', load: 'Light or bodyweight', tempo: '3-1-1', rest: '45s', cue: 'Elbows push knees out. Chest tall. Full depth, controlled — no bounce.' },
        { name: 'Hip Hinge Drill (Dowel on Spine)', insight: 'Trainer Insight: this is the movement prep you give clients before every deadlift session', sets: '3', reps: '10', load: 'Dowel / PVC pipe', tempo: 'Slow', rest: '30s', cue: "3 points of contact: head, upper back, tailbone. Hinge — don't squat." },
        { name: 'Kettlebell Deadlift (Light)', sets: '3', reps: '10', load: 'Light KB or DB', tempo: '2-1-2', rest: '45s', cue: 'Hips back first. Flat back throughout. Stand tall at lockout — no lean-back.' },
      ],
    },
    {
      letter: 'B', title: 'PATTERN PRIMER — PUSH & PULL', introLabel: null,
      intro: "Same logic applied upward. Push and pull volume stays matched even on a technique day — the habit you're building this week is structural, not just physical.",
      exercises: [
        { name: 'Incline Push-Up (Bench or Rack)', insight: 'Trainer Insight: incline angle lets you coach the exact same bar path a client will use at full bench press later', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-1-1', rest: '45s', cue: 'Elbows at 45°. Full lockout at top. Straight line head to heels.' },
        { name: 'Band Pull-Apart (Horizontal)', insight: 'Trainer Insight: rear delt weakness = forward shoulder = impingement under load', sets: '3', reps: '20', load: 'Light–medium band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight. Full retraction at end. Rear delt and mid-trap.' },
        { name: 'Seated Cable Row (Light)', sets: '3', reps: '12', load: 'Light-moderate', tempo: '2-1-2', rest: '45s', cue: 'Chest up, no lean-back. Drive elbows to hips. 1-sec squeeze.' },
      ],
    },
    {
      letter: 'C', title: 'CORE FOUNDATION', introLabel: null,
      intro: 'A light day is the correct place to build the core bracing habit before it gets tested under load later in the week.',
      exercises: [
        { name: 'Dead Bug (Controlled)', insight: 'Trainer Insight: this pattern fires the anterior core that stabilizes the spine under deadlift and squat', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back into floor throughout. Opposite arm + leg. 3 sec each way.' },
        { name: 'Elbow Plank (Bodyweight)', sets: '3', reps: '30–45s', load: 'Bodyweight', tempo: 'Hold', rest: '45s', cue: 'Full brace. Exhale to set. Straight line — no sagging hips.' },
      ],
    },
  ],
};

// Day 5 — Active Recovery (new: base program has no AR day)
const day5ActiveRecovery = {
  intensity: 'AR',
  title: 'DAY 5 — ACTIVE RECOVERY',
  subtitle: 'Intentional Movement · No PRs · No AMRAP',
  descriptor: 'ACTIVE RECOVERY · FEEL BETTER LEAVING THAN YOU DID ARRIVING',
  intensityLabel: "Active Recovery Day",
  intensityPara: "This is not a light training day — it is a distinct training intention, and it is the one most advanced lifters coach worst, because it has no numbers to chase. There is no PR here, no AMRAP, no RIR discipline to enforce. The entire skill being practiced today is restraint: leading a session where the measure of success is how the client feels walking out, not what she lifted.",
  warmUp: '5 min: easy bike or walk, arm circles ×10 each way, gentle hip circles ×10 each. Trainer Insight: even the warm-up on an AR day is intentionally undersized — there is nothing ahead of it that needs priming.',
  coolDown: '10 min: full-body static stretch sequence, 5 min supine breathing to close. Trainer Insight: on every other day the cool-down follows the work. Today, the entire session basically is the cool-down.',
  iconsNote: "DAY 5 DEBRIEF — What to log and reflect on: (1) Did you feel the urge to add weight or push pace at any point today? Where? (2) How does it feel to lead a session with zero numbers to track? Was it harder or easier than you expected? (3) What would you say to a client who apologizes for 'not really working out' on a day like today? (4) You have now felt all five ICONS intensities in one week. Which one did you understand least before this week — and what changed?",
  blocks: [
    {
      letter: 'A', title: 'MOBILITY FLOW — FULL BODY', introLabel: null,
      intro: 'Every movement today is chosen for how it feels, not what it loads. There is no failure state in this block — only smoother or less smooth.',
      exercises: [
        { name: 'Cat-Cow Flow', sets: '2', reps: '10', load: 'Bodyweight', tempo: 'Slow', rest: '—', cue: 'Move with the breath. Inhale to arch, exhale to round. No rush.' },
        { name: "World's Greatest Stretch", insight: 'Trainer Insight: this single drill covers hip, thoracic, and hamstring mobility in one flow — teach it as a client\'s go-to reset', sets: '2', reps: '5 ea side', load: 'Bodyweight', tempo: 'Slow', rest: '—', cue: 'Lunge, rotate toward the front leg, reach tall. Move at your own pace.' },
        { name: 'Walking Lunge with Reach (Unloaded)', sets: '2', reps: '8 ea', load: 'Bodyweight', tempo: 'Slow', rest: '—', cue: 'Full step, reach overhead on each rep. This is movement, not a set.' },
      ],
    },
    {
      letter: 'B', title: 'LIGHT LOADED CARRY — POSTURE ONLY', introLabel: null,
      intro: 'The only "loaded" element on an AR day is a light carry — used here purely to reinforce posture and breathing, not as a strength stimulus.',
      exercises: [
        { name: 'Farmers Carry (Light)', insight: 'Trainer Insight: notice how different "light" feels this week — this is the exact contrast a client needs named out loud on her own AR days', sets: '2', reps: '20 yds', load: '30–40% of a working carry', tempo: 'Controlled', rest: '60s', cue: 'Shoulders packed, chest tall, easy breathing. This is a walk, not a set.' },
      ],
    },
    {
      letter: 'C', title: 'BREATH & DECOMPRESSION', introLabel: null,
      intro: 'This block closes every AR day. It has no strength or metabolic purpose — it exists to lower arousal, not raise it.',
      exercises: [
        { name: "Child's Pose (Held)", sets: '2', reps: '60–90s', load: 'Bodyweight', tempo: 'Hold', rest: '—', cue: 'Hips to heels, arms extended. Breathe into your low back.' },
        { name: 'Supine Box Breathing', sets: '1', reps: '5 min', load: '—', tempo: '4-4-4-4', rest: '—', cue: '4 sec in, 4 sec hold, 4 sec out, 4 sec hold. Eyes closed if comfortable.' },
      ],
    },
  ],
};

const days = [
  day1Technique,
  clone(base.days[2]), // 70%
  clone(base.days[0]), // 80%
  clone(base.days[1]), // 90%
  day5ActiveRecovery,
];

// Re-title day headers to match the new Day N position in this sequence
// (source content referenced "Day 3"/"Day 1"/"Day 2" internally by name).
days[1].title = 'DAY 2 — BOTH LEGS + UPPER BODY';
days[2].title = 'DAY 3 — PRIMARY STRENGTH';
days[3].title = 'DAY 4 — PEAK OUTPUT';

const summary = {
  subtitle: `${client.programTitle} · ICONS Index · Week 1`,
  rows: [
    ['DAY 1', '60% — Teal', 'Technique & Pattern', 'Goblet Squat · Hip Hinge Drill · Incline Push-Up · Row', 'Zero PRs · perfect form on every rep · pattern rehearsal only'],
    ['DAY 2', '70% — Green', 'Both Legs + Upper', 'Back Squat · Hip Thrust · Bench + Row Superset · Carries', 'Squat 75% at 8–10 reps · Hip thrust 80% Day 4 load · Pull = Push volume'],
    ['DAY 3', '80% — Gold', 'Primary Strength', 'Bench · OHP · Weighted Pull-Up · Heavy Row · Loaded Plank', 'Push = Pull volume · 4 sets at 80% 1RM · 2 RIR discipline'],
    ['DAY 4', '90% — Red', 'Peak Output', 'Hex DL · Hip Thrust · Weighted Carry · AMRAP Finisher', 'Deadlift 87–92% 1RM · Carry BW/hand · Record AMRAP score'],
    ['DAY 5', 'AR — Blue', 'Active Recovery', 'Mobility Flow · Light Carry · Breathwork', 'No PRs · no AMRAP · feel better leaving than arriving'],
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
  const outDir = path.join(__dirname, '..', '..', 'trainers', 'education');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'ICONS_Trainer_Development_Program_A_Intensity_Build.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
