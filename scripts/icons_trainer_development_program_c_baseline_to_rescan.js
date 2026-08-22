/**
 * ICONS Trainer Development Program — Version C: Baseline to Rescan
 * Brace Life Studios
 *
 * Applies the client Styku-scan/8-week-rescan model directly to the
 * trainer's own training week, instead of just discussing it. Structure:
 *
 *   Day 0 — BASELINE TESTING (new): the actual 11-exercise ICONS Baseline
 *           Testing Protocol (see CLAUDE.md), run on yourself and logged.
 *   Day 1-3 — BUILD (reused from the base program's 80%/90%/70% days):
 *           each reused day's primary lift LOAD column is rewritten from
 *           a single static percentage into an explicit Week 1 → Week 4
 *           progression, calculated off the Day 0 numbers, exactly like a
 *           client's plan calculates hers.
 *   Day 4 — RETEST (new): the identical Day 0 battery, retaken, so the
 *           week ends with a real before/after — not a certificate that
 *           just says "complete."
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');
const base = require('./icons_trainer_development_program');

const clone = (x) => JSON.parse(JSON.stringify(x));
const { renumberDayReferences } = base;

// This variant happens to keep the base program's own day ORDER (base Day 1/2/3
// stay Day 1/2/3, with a new Day 0 test and Day 4 retest bracketing them), so
// this map is deliberately an identity. It is applied anyway, and stated here,
// because "correct by coincidence" is what produced the stale day numbers in
// Variants A and B — if this variant is ever resequenced, the mechanism is
// already wired in and only this object needs to change. Day 0 is absent from
// the map on purpose, so "Day 0" references are never rewritten.
const DAY_MAP = { 1: '1', 2: '2', 3: '3' };

const client = {
  ...base.client,
  programTitle: 'Train the Trainer — Baseline to Rescan',
  subtitle: 'Test → Build → Retest · Advanced Level',
};

const weekOverview = [
  { day: 'DAY 0', intensity: 70, focus: 'Baseline\nTesting' },
  { day: 'DAY 1', intensity: 80, focus: 'Build\nWk1→Wk4' },
  { day: 'DAY 2', intensity: 90, focus: 'Build\nWk1→Wk4' },
  { day: 'DAY 3', intensity: 70, focus: 'Build\nWk1→Wk4' },
  { day: 'DAY 4', intensity: 70, focus: 'Retest &\nCompare' },
  { day: 'DAY 5', intensity: 'Off', focus: 'Rest' },
  { day: 'DAY 6', intensity: 'Off', focus: 'Rest' },
];

const baselineNotes = [
  base.baselineNotes[0],
  {
    type: 'teal',
    label: 'The Measurement Model, Applied to You',
    body: "Every client gets tested before she gets programmed, and rescanned before her program is called a success. This version puts you through that exact structure on yourself: Day 0 establishes real numbers, Days 1–3 program directly off those numbers with an explicit week-by-week load progression instead of a flat percentage, and Day 4 retests the identical battery so the week ends with a genuine before/after — not a guess about how the week went.",
  },
  base.baselineNotes[2],
  base.baselineNotes[3],
  base.baselineNotes[4],
  base.baselineNotes[5], // Deload Week — scheduled, not optional
];

function baselineBattery(dayNumber, contextNote) {
  return {
    letter: 'A', title: 'LOWER BODY & POSTERIOR CHAIN BATTERY', introLabel: null,
    intro: contextNote,
    exercises: [
      { name: 'Hex Bar Deadlift', sets: '1–3', reps: '5–8', load: 'Find your working 5–8RM', tempo: 'Controlled', rest: '2–3 min', cue: `Log the exact weight and rep count. This is your ${dayNumber} deadlift number — everything else this week is calculated from it.` },
      { name: 'Back Squat', sets: '1–3', reps: '5–8', load: 'Find your working 5–8RM', tempo: 'Controlled', rest: '2–3 min', cue: 'Log the exact weight and rep count. Full depth, no exceptions on a test set.' },
      { name: 'Hip Thrust', sets: '1–3', reps: '5–8', load: 'Find your working 5–8RM', tempo: 'Controlled', rest: '90s–2 min', cue: '2-sec hold at top counts as part of the rep, even on a test set.' },
      { name: 'Single-Leg Romanian Deadlift', sets: '1–2', reps: '5–8 ea', load: 'Find your working weight', tempo: 'Controlled', rest: '90s', cue: 'Log left and right separately. This is where you find your own asymmetry.' },
      { name: 'Lunges (DB or BB)', sets: '1–2', reps: '5–8 ea', load: 'Find your working weight', tempo: 'Controlled', rest: '90s', cue: 'Log left and right separately here too.' },
      { name: 'Farmers Carry (DB, or Trap Bar above 60 lbs/hand)', sets: '1–2', reps: 'Max distance/hand load', load: 'Find your working weight', tempo: 'Controlled', rest: '2 min', cue: 'Record exact weight per hand and distance. Studio DBs stop at 60 lbs/hand — move to the trap bar above that, and note which implement you used.' },
    ],
  };
}

function baselineBatteryUpper(dayNumber) {
  return {
    letter: 'B', title: 'UPPER BODY & CORE BATTERY', introLabel: null,
    intro: 'Same protocol, upper body and core. 5–8 reps throughout except where noted — record everything before you leave.',
    exercises: [
      { name: 'Seated Overhead Press', sets: '1–3', reps: '5–8', load: 'Find your working 5–8RM', tempo: 'Controlled', rest: '2 min', cue: 'Full lockout counts. A press that stalls below lockout is not a completed rep.' },
      { name: 'Incline Dumbbell Press', sets: '1–3', reps: '5–8', load: 'Find your working 5–8RM', tempo: 'Controlled', rest: '2 min', cue: 'Full range, controlled descent — this is a test set, not a rep-max grind.' },
      { name: 'Push-Ups (Full or Half)', sets: '1', reps: 'Max reps', load: 'Bodyweight', tempo: 'Steady', rest: '—', cue: 'Record total reps to technical failure. Note full vs. half/knee variation used.' },
      { name: 'Plank Hold', sets: '1', reps: 'Max hold (seconds)', load: 'Bodyweight', tempo: 'Hold', rest: '—', cue: 'Time until form breaks, not until you feel done. Record the exact second count.' },
      { name: 'Pull-Ups (Bonus)', sets: '1', reps: 'Max reps', load: 'Bodyweight (or assisted)', tempo: 'Controlled', rest: '—', cue: 'Bonus movement — record reps and assistance level used, if any.' },
    ],
  };
}

// Day 0 — Baseline Testing (new)
const day0Baseline = {
  intensity: 70,
  badge: { label: 'BASE', sub: 'TEST' },
  title: 'DAY 0 — BASELINE TESTING',
  subtitle: 'The 11-Exercise ICONS Battery — Run It On Yourself First',
  descriptor: 'BASELINE TESTING · 5–8 REPS THROUGHOUT · RECORD EVERYTHING',
  intensityLabel: 'Baseline Testing Day',
  intensityPara: "Before Day 1, you test. This is the identical 11-exercise ICONS Baseline Testing Protocol you will eventually run with every client — Hex Bar Deadlift, Back Squat, Seated Overhead Press, Incline DB Press, Push-Ups, Farmers Carry, Hip Thrust, Single-Leg RDL, Lunges, Plank Hold, and bonus Pull-Ups, tested at 5–8 reps (except where noted). Every load in Days 1–3 this week is calculated as a percentage of what you record today. There is no way to skip this and still get an honest week.",
  warmUp: '10 min: general full-body movement — bike or row 3 min, hip circles ×10 each, band pull-aparts 2×15, bodyweight squat 2×10, arm circles ×10 each way. Trainer Insight: this is a general warm-up, not sport- or lift-specific — you\'re about to test eleven different movement patterns, not rehearse one.',
  coolDown: '10 min: full-body static stretch sequence, 5 min supine breathing. Trainer Insight: testing day fatigue is often underestimated — eleven tested movements adds up, even at moderate loads. Treat the cool-down with the same respect you would after a heavy training day.',
  iconsNote: "DAY 0 DEBRIEF — What to log and reflect on: (1) Which of the eleven numbers surprised you — higher or lower than you expected? (2) Where did you find an asymmetry you didn't know you had? (3) This is exactly the moment a new client sees her own numbers on paper for the first time — what did that feel like for you? (4) Take a photo of this page's numbers before you turn it in for Day 4 — you'll want the exact comparison, not your memory of it.",
  blocks: [
    baselineBattery('Day 0', 'This is the identical protocol you will run with every new client. Five to eight reps, controlled, logged exactly — this is a measurement, not a max-effort grind.'),
    baselineBatteryUpper('Day 0'),
  ],
};

// Days 1-3 — Build, with Week 1 → Week 4 progression on the primary lift
const day1Build = renumberDayReferences(clone(base.days[0]), DAY_MAP); // 80%
day1Build.title = 'DAY 1 — BUILD · PRIMARY STRENGTH';
day1Build.descriptor = '80% INTENSITY · WEEK 1–4 PROGRESSION · CALCULATED FROM DAY 0';
day1Build.intensityPara = "Day 1 is 80% — same primary-strength structure as the base program, with one change: the bench press load below isn't a single static number. It's calculated directly off your Day 0 baseline and laid out across the full 4-week block, exactly like a client's LOAD column changes week over week. Confirm which week you're in before you touch the bar — this is the single most common error trainers make on a real client plan, and it's worth making the mistake-checking habit automatic here first.";
day1Build.blocks[1].exercises[0].load = 'Wk1 70% · Wk2 75% · Wk3 80% · Wk4 85% (retest week) — % of Day 0 5–8RM';
day1Build.blocks[1].exercises[0].insight = 'Trainer Insight: this is exactly the LOAD-column progression a client sees on her own plan — confirm the week before you load the bar.';
day1Build.iconsNote = "DAY 1 DEBRIEF — What to log and reflect on: (1) Pull out your Day 0 sheet. Did the calculated bench load actually feel like 2 RIR, or did the arithmetic and the barbell disagree? That gap is the single most useful thing you will learn this week. (2) Which side felt stronger on the single-arm row, and does it match the asymmetry you logged on Day 0's single-leg RDL? (3) How long did you hold the loaded plank compared to your Day 0 plank number? (4) The corrective primer was not tested on Day 0 and will not be retested on Day 4 — decide now how you would judge whether it worked, since a client will ask you exactly that about hers.";

const day2Build = renumberDayReferences(clone(base.days[1]), DAY_MAP); // 90%
day2Build.title = 'DAY 2 — BUILD · PEAK OUTPUT';
day2Build.descriptor = '90% INTENSITY · WEEK 1–4 PROGRESSION · CALCULATED FROM DAY 0';
day2Build.intensityPara = "Day 2 is 90% — same peak-output structure as the base program, with the hex bar deadlift load now expressed as a 4-week progression off your Day 0 number instead of a flat 87–92%. This is the lift you'll retest on Day 4, so log every week's actual number, not just the target.";
day2Build.blocks[0].exercises[0].load = 'Wk1 78% · Wk2 83% · Wk3 88% · Wk4 90–92% (retest week) — % of Day 0 5–8RM';
day2Build.blocks[0].exercises[0].insight = 'Trainer Insight: notice the ramp — Week 1 is deliberately conservative off a same-week baseline number, the same caution you\'d use with a client testing and training in the same week.';
day2Build.iconsNote = "DAY 2 DEBRIEF — What to log and reflect on: (1) Write your actual deadlift load next to the Day 0 number it was calculated from — not the target percentage, the weight that was on the bar. This is the lift you retest on Day 4, so the comparison is only as good as this log. (2) Which suitcase carry side felt harder, and does it agree with your Day 0 single-leg RDL asymmetry? (3) How many AMRAP rounds? (4) A client's Week 4 retest number is only ever as trustworthy as her week-by-week logging. You are now on the inside of that problem — how will you make a client log this honestly?";

const day3Build = renumberDayReferences(clone(base.days[2]), DAY_MAP); // 70%
day3Build.title = 'DAY 3 — BUILD · BOTH LEGS + UPPER';
day3Build.descriptor = '70% INTENSITY · WEEK 1–4 PROGRESSION · CALCULATED FROM DAY 0';
day3Build.intensityPara = "Day 3 is 70% — same bilateral accumulation structure as the base program, with the back squat load expressed as a progression off your Day 0 number. This is the lift you'll retest on Day 4 alongside the deadlift.";
day3Build.blocks[1].exercises[0].load = 'Wk1 65% · Wk2 70% · Wk3 75% · Wk4 78–80% (retest week) — % of Day 0 5–8RM';
day3Build.iconsNote = "DAY 3 DEBRIEF — What to log and reflect on: (1) How did the bilateral squat feel at a load calculated off Day 0, rather than off how you felt walking in? Would you have chosen the same weight by feel? (2) Did your knee tracking hold under bilateral load? What did the corrective primer change? (3) In the upper body superset — which side fatigued first on the row, and is that the same side as every other asymmetry you have logged this week? (4) Tomorrow you rerun the identical Day 0 battery. Before you do: write down what you EXPECT each number to be. Comparing your prediction to the result is the part of a reassessment most trainers never practise.";

// Day 4 — Retest (new): identical battery to Day 0, framed as comparison
const day4Retest = {
  intensity: 70,
  badge: { label: 'RE', sub: 'TEST' },
  title: 'DAY 4 — RETEST & COMPARE',
  subtitle: 'The Identical Day 0 Battery — Now Compare the Numbers',
  descriptor: 'RETEST · SAME 11 EXERCISES · SAME PROTOCOL · REAL COMPARISON',
  intensityLabel: 'Retest Day',
  intensityPara: "Same eleven exercises, same protocol, same order as Day 0. No new movements, no different rep scheme — a retest that changes the test isn't a retest. Run it exactly as you did on Day 0, then place the two pages side by side. This is the exact moment a client experiences at her own 4-week or 8-week reassessment, and it is worth feeling before you deliver it to someone else for the first time.",
  warmUp: '10 min: general full-body movement — bike or row 3 min, hip circles ×10 each, band pull-aparts 2×15, bodyweight squat 2×10, arm circles ×10 each way. Trainer Insight: identical warm-up to Day 0 on purpose — changing the warm-up would change the test.',
  coolDown: '10 min: full-body static stretch sequence, 5 min supine breathing. Trainer Insight: identical to Day 0 for the same reason.',
  iconsNote: "DAY 4 DEBRIEF — What to log and reflect on: (1) Line up all eleven numbers next to Day 0. Which improved the most? Which didn't move, or dropped? (2) If a number didn't improve, what's the honest reason — programming, recovery, or just normal week-to-week variance? (3) This is the exact conversation a client has with you at her reassessment — including the uncomfortable version where a number doesn't move. Practice saying that sentence out loud, not just writing it. (4) You've now run a real baseline-to-rescan cycle on yourself, start to finish, in one week. What's different about how you'll deliver a client's own reassessment now?",
  blocks: [
    baselineBattery('Day 4', 'Identical protocol to Day 0. Compare directly to your Week 1 baseline as you go — this is the number a client sees at her own check-in.'),
    baselineBatteryUpper('Day 4'),
  ],
};

const days = [day0Baseline, day1Build, day2Build, day3Build, day4Retest];

const summary = {
  subtitle: `${client.programTitle} · ICONS Index · Test → Build → Retest Cycle`,
  rows: [
    ['DAY 0', 'Baseline', 'Testing', '11-exercise ICONS battery — full self-test', 'Record every number — this is the denominator for the whole week'],
    ['DAY 1', '80% — Gold', 'Primary Strength', 'Bench · OHP · Weighted Pull-Up · Heavy Row · Loaded Plank', 'Bench load: Wk1 70% → Wk4 85% of Day 0 5–8RM'],
    ['DAY 2', '90% — Red', 'Peak Output', 'Hex DL · Hip Thrust · Weighted Carry · AMRAP Finisher', 'Deadlift load: Wk1 78% → Wk4 90–92% of Day 0 5–8RM'],
    ['DAY 3', '70% — Green', 'Both Legs + Upper', 'Back Squat · Hip Thrust · Bench + Row Superset · Carries', 'Squat load: Wk1 65% → Wk4 78–80% of Day 0 5–8RM'],
    ['DAY 4', 'Retest', 'Compare', 'Identical 11-exercise battery, retaken', 'Direct before/after on all eleven numbers — no fabricated comparisons'],
  ],
  milestones4wk: 'This program compresses a 4-week arc into one week for training purposes — in real client programming, Day 0\'s battery is Week 1, the Wk1→Wk4 progressions shown here run across the actual four calendar weeks, and Day 4\'s retest happens at real Week 4, not the next training day. Practice explaining that distinction to a new client: the numbers on this page moved fast because you compressed a month into a week — hers won\'t, and that\'s normal, not a failure of the program.',
  milestones8wk: 'By your own Week 8 (a second full 4-week block beyond this one), run the entire Day 0 → Day 4 structure again from a fresh baseline. Two completed test-build-retest cycles on yourself is what qualifies you to explain an 8-week client reassessment from lived experience, including the honest parts — plateaus, numbers that don\'t move as fast as hoped, and how to keep a client\'s trust through both.',
  rescanNote: 'Week 8 Self-Rescan: repeat the full 11-exercise battery one more time. Build your own before/after comparison table — Day 0 vs. this rescan — the same format as a client\'s Brace Life Improvement Report. Only include a number if you actually tested it both times; if a movement changed between cycles, note that honestly rather than forcing a comparison that isn\'t real.',
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
  const outPath = path.join(outDir, 'ICONS_Trainer_Development_Program_C_Baseline_to_Rescan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
