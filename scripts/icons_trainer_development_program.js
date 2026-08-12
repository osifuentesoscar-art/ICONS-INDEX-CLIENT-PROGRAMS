/**
 * ICONS Trainer Development Program — "Train the Trainer"
 * Brace Life Studios
 *
 * Source: client-uploaded ICONS_Trainer_Development_Program.docx (Advanced
 * Level, "Learn ICONS by Living It"). Days 1-3 are reconstructed faithfully
 * from the uploaded document (XML-verified: cell shading C9A227/FAF3E0 on
 * the day-header badge confirms it was built with this same engine). Days
 * 4-5 were referenced only at the weekly-summary level in the source
 * ("Volume + Skill" / "Fast-Twitch") with no day pages written — completed
 * here to match, using the same Trainer Insight voice and RIR discipline.
 *
 * Two small engine additions in icons_template.js were needed to reproduce
 * the source faithfully:
 *   - exTable() exercises: optional `insight` field — italic gray sub-line
 *     under the exercise name ("Trainer Insight: ..."), distinct from the
 *     existing `flag` (italic red, clinical) field.
 *   - blockLabel(): `introLabel: null` opts a block's intro into a plain
 *     unlabeled paragraph instead of the default bold-label callout — the
 *     source's block intros read as continuous prose, not "Note: ...".
 *
 * Deliberate deviation from the source: the source's boxed "PROGRESSIVE
 * OVERLOAD — HOW TO ADD WEIGHT" table (a bordered/shaded box with colored
 * rows) is dropped in favor of the engine's standard progressionBlock() —
 * CLAUDE.md documents that bordered/shaded box callouts were explicitly
 * superseded when the engine was rebuilt against the Kelly Mulroy
 * reference; the source's box was a regression back toward that retired
 * style. The same RIR add/same/drop rule is preserved, just in the
 * confirmed house format (single teal labeled paragraph, auto-inserted
 * after every day).
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'ICONS Trainer Development Program',
  programTitle: 'Train the Trainer — ICONS Method',
  subtitle: '60–100% Progressive Intensity Build',
  schedule: '5 Days/Week · Advanced Level',
  stats: ['Advanced Level', 'Learn ICONS by Living It', 'Brace Life Studios', 'bracelifestudios.com'],
  // No individual trainer's weight/age/Styku data — this is a generic
  // advanced-level template, not a per-person plan. Nothing fabricated.
  isPostmenopausal: false,
};

const weekOverview = [
  { day: 'DAY 1', intensity: 80, focus: 'Primary\nStrength' },
  { day: 'DAY 2', intensity: 90, focus: 'Peak\nOutput' },
  { day: 'DAY 3', intensity: 70, focus: 'Both Legs\n& Upper' },
  { day: 'DAY 4', intensity: 70, focus: 'Volume\n& Skill' },
  { day: 'DAY 5', intensity: 90, focus: 'Fast-Twitch\nPerformance' },
  { day: 'DAY 6', intensity: 'Off', focus: 'Rest' },
  { day: 'DAY 7', intensity: 'Off', focus: 'Rest' },
];

const baselines = [
  ['Hex Bar Deadlift', 'Your 5RM', 'Self-test', 'Est 1RM × 0.80 = Wk1 working load'],
  ['Back Squat', 'Your 5RM', 'Self-test', 'Est 1RM × 0.80 = Wk1 working load'],
  ['Bench Press (DB/BB)', 'Your 5RM', 'Self-test', 'Est 1RM × 0.80 = Wk1 working load'],
  ['Overhead Press', 'Your 3–5RM', 'Self-test', 'Working load: ~80% of 3RM'],
  ['Single-Arm DB Row', 'Your 8RM', 'Self-test', 'Wk4 target: +10–15 lbs'],
  ['Farmers Carry', 'BW/hand', 'Self-test', 'Carry your bodyweight/hand by Wk4'],
  ['Push-Ups', 'Max reps', 'Self-test', 'Weighted vest Wk3'],
  ['Plank Hold', 'Max seconds', 'Self-test', 'Loaded (10–25 lb plate) from session 1'],
  ['Pull-Ups', 'Max reps', 'Self-test', 'Weighted pull-ups by Wk4'],
  ['Back Squat (Bilateral)', 'Your 5RM', 'Self-test', 'Both legs · Est 1RM × 0.75 = Day 3 working load'],
  ['Hip Thrust (Bilateral)', 'Your 5RM', 'Self-test', 'Both legs · Est 1RM × 0.80 = Day 3 working load'],
];

const baselineNotes = [
  {
    type: 'gold',
    label: 'Purpose of This Program',
    body: "You cannot coach what you haven't felt. This program puts you through the exact ICONS method — the same philosophy, structure, callout logic, intensity framework, and progressive overload system your clients experience. Every workout is annotated with trainer insights explaining the why behind each programming decision. By the end of four weeks, you will know this system from the inside.",
  },
  {
    type: 'green',
    label: 'How to Use the Trainer Insights',
    body: 'Every block in this program contains a Trainer Insight note. These explain the clinical and scientific rationale behind each programming choice. Read them during rest periods. These are the coaching points you will deliver to clients. When you understand why a rest period is 90 seconds, why the eccentric tempo is 3 seconds, why correctives come first — you coach from knowledge, not from a script.',
  },
  {
    type: 'teal',
    label: 'Self-Assessment Protocol — Complete Before Starting',
    body: 'Before Day 1, test your own baselines using the ICONS battery: Hex Bar Deadlift (5 reps, working weight), Back Squat (5 reps), Bench Press (5 reps), Single-Arm Row (8 reps), Push-Ups (max), Plank (max hold), Pull-Ups (max), Farmers Carry (working weight). Record everything. These become your 4-week targets. You will experience exactly what your clients experience when they see numbers on paper for the first time.',
  },
  {
    type: 'red',
    label: 'Advanced Level — What This Means',
    body: "Advanced loading assumes a working deadlift ≥ 1.5× bodyweight, squat ≥ 1.25× BW, bench ≥ 1× BW. If these numbers aren't there yet, adjust loads accordingly — the structure and principles remain identical. The ICONS method is load-agnostic: the same programming logic applies at 95 lbs and 295 lbs. What matters is the intent, the tempo, and the RIR discipline.",
  },
  {
    type: 'blue',
    label: 'The RIR Standard — Non-Negotiable',
    body: 'Every work set in this program uses RIR (Reps In Reserve). 2 RIR means you could do 2 more reps with perfect form but choose not to. 1 RIR means one rep left. This is how ACSM 2026 recommends loading — training to failure does not consistently outperform RIR-based loading and increases injury and recovery cost. When you enforce this with clients, you will do so knowing exactly how 1 RIR feels.',
  },
];

const days = [
  // ═══════════ DAY 1 — 80% GOLD — PRIMARY STRENGTH ═══════════
  {
    intensity: 80,
    title: 'DAY 1 — PRIMARY STRENGTH',
    subtitle: 'Compound Push · Compound Pull · Hinge · Core',
    descriptor: '80% INTENSITY · THE CLIENT EXPERIENCE · STRENGTH AS MEDICINE',
    intensityPara: "Day 1 is 80% — the gold intensity day. This is the primary strength session of the ICONS week. Loads are challenging. The last 1–2 reps of each work set are hard. Form must hold. This is exactly what your clients experience on their heaviest training day. Notice the warm-up structure, the block order, the rest periods, the tempo. Every decision you feel today was made deliberately.",
    warmUp: '10 min: foam roll thoracic spine 60s, lat stretch 30s each, band pull-aparts 2×15, scapular push-ups ×10, dead hang 20s, goblet squat 2×10 (light), hip hinge drill with dowel ×8. Trainer Insight: Warm-up order is always mobility → activation → pattern primer. Never load before the joint is open and the pattern is rehearsed.',
    coolDown: '10 min: thoracic extension foam roller 90s, doorway chest stretch 30s each, lat stretch 45s each, hip flexor lunge 60s each, wrist mobility. Trainer Insight: the cool-down is the moment clients are most receptive to coaching conversation. Use it. Debrief the session here, not at the start.',
    iconsNote: "DAY 1 DEBRIEF — What to log and reflect on: (1) Where was your 1 RIR? Was it where you thought? (2) Which side felt stronger on the single-arm row? (3) How long did you hold the loaded plank? (4) How did the corrective primer feel compared to how you'd typically start a session? These are the questions you will ask your clients.",
    blocks: [
      {
        letter: 'A', title: 'CORRECTIVE PRIMER — SCAPULAR & HIP CONTROL', introLabel: null,
        intro: "Every ICONS session — regardless of client level — opens with a corrective primer. This is not optional and it is not 'just for beginners.' The corrective block serves two purposes: it activates the stabilizers that protect the joints under heavy loading, and it reinforces the movement patterns that make compound lifts safe and productive. As a trainer, you will implement this block with every client, every session.",
        exercises: [
          { name: 'Band Pull-Apart (Horizontal)', insight: 'Trainer Insight: rear delt weakness = forward shoulder = impingement under load', sets: '3', reps: '20', load: 'Light–medium band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight. Full retraction at end. Rear delt and mid-trap.', rirNote: 'Corrective — not to failure' },
          { name: 'Dead Bug (Controlled)', insight: 'Trainer Insight: this pattern fires the anterior core that stabilizes the spine under deadlift and squat', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back into floor throughout. Opposite arm + leg. 3 sec each way.' },
          { name: 'Hip Hinge Drill (Dowel on Spine)', insight: 'Trainer Insight: this is the movement prep you give clients before every deadlift session', sets: '2', reps: '10', load: 'Dowel / PVC pipe', tempo: 'Slow', rest: '30s', cue: "3 points of contact: head, upper back, tailbone. Hinge — don't squat." },
          { name: 'Copenhagen Plank (Adductor)', insight: 'Trainer Insight: −41% groin injury risk (Harøy 2018). Program for every client.', sets: '3', reps: '20–30s ea', load: 'Bodyweight', tempo: 'Hold', rest: '45s', cue: 'Side plank. Top leg on bench. Adductor isometric. Hips stacked.' },
        ],
      },
      {
        letter: 'B', title: 'PRIMARY COMPOUND PUSH — BENCH + OVERHEAD PRESS', introLabel: null,
        intro: 'Primary push strength. Load at 80% of your estimated 1RM. The bench press and overhead press together build the horizontal and vertical pushing strength that clients need for functional independence, posture, and aesthetic goals. Note the tempo: 3 seconds down is not slow for a beginner — it is correct for everyone. The eccentric phase is where adaptation happens.',
        exercises: [
          { name: 'Barbell or DB Bench Press', insight: 'Trainer Insight: Est 1RM = BW × 0.80 typical advanced baseline. Work at 80% of that.', sets: '4', reps: '4–6', load: '80% Est 1RM', tempo: '3-1-1', rest: '2 min', cue: 'Elbows at 45°. Bar to chest. Full lockout. 3-sec descent is mandatory.', rirNote: '1–2 RIR on last set' },
          { name: 'DB Overhead Press (Standing)', insight: 'Trainer Insight: OHP is the #1 functional overhead indicator for clients 40+', sets: '4', reps: '5–7', load: '80% of 3RM', tempo: '2-1-1', rest: '90s', cue: 'Neutral grip. Press to lockout. Arms alongside ears. Core braced.', rirNote: '1–2 RIR' },
          { name: 'Incline DB Press (30–45°)', sets: '3', reps: '8–10', load: '75% 1RM', tempo: '3-1-1', rest: '60s', cue: 'Upper chest. Full range. Press up and slightly inward. Control descent.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C', title: 'PRIMARY COMPOUND PULL — PULL-UPS + ROW', introLabel: null,
        intro: 'Primary pull strength. The pulling volume in an ICONS program is always equal to or greater than the pressing volume. This is non-negotiable. Most clients arrive with underdeveloped pulling strength relative to their press — this imbalance drives shoulder impingement and postural collapse. Experience the feeling of matching your push with your pull. You will coach this balance in every program you write.',
        exercises: [
          { name: 'Weighted Pull-Up (or Lat Pulldown)', insight: 'Trainer Insight: pull-up is the best single indicator of relative pulling strength', sets: '4', reps: '4–6', load: 'BW +10–20 lbs', tempo: '3-1-2', rest: '2 min', cue: 'Full dead hang. Chin over bar. 3-sec descent. Log weight + reps.', rirNote: '1–2 RIR' },
          { name: 'Barbell or DB Bent-Over Row', sets: '4', reps: '5–7', load: '80% Est 1RM', tempo: '3-1-2', rest: '90s', cue: '45° hinge. Drive elbows to hips. 2-sec hold at top. Full stretch at bottom.', rirNote: '1 RIR on last set' },
          { name: 'Single-Arm DB Row (Heavy)', insight: 'Trainer Insight: log left vs right separately — you may find your own asymmetry', sets: '3', reps: '8–10', load: 'Heavy — 8RM', tempo: '3-1-2', rest: '60s', cue: 'Chest on bench. Full stretch at bottom — blade opens. Note L vs R.', rirNote: '2 RIR' },
          { name: 'Hanging Knee Tuck', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '2-0-2', rest: '45s', cue: 'Hang from bar. Pull knees to chest. Lower controlled. No swinging.' },
        ],
      },
      {
        letter: 'D', title: 'LOADED CORE — PLANK + ANTI-ROTATION', introLabel: null,
        intro: 'Loaded core work always closes the strength session. Notice the plank is loaded — a 2:00 bodyweight plank is a mobility test, not a strength stimulus. Once a client can hold 60 seconds, weight is added. This applies to you too. The anti-rotation work trains the core in the same pattern it fires during carries and heavy pulls.',
        exercises: [
          { name: 'Elbow Plank (Loaded)', insight: 'Trainer Insight: if a client can hold 60s BW easily — load it. Same principle applies here.', sets: '3', reps: '60–90s', load: '25 lb plate', tempo: 'Hold', rest: '90s', cue: 'Plate on mid-back. Full brace. Exhale to set. Glutes squeezed.' },
          { name: 'Pallof Press (Cable)', insight: 'Trainer Insight: this fires the same core pattern as a heavy carry — pre-teaches it', sets: '3', reps: '12 ea side', load: 'Moderate', tempo: '2-1-2', rest: '45s', cue: 'Press straight out against band tension. Resist the twist. Anti-rotation.' },
          { name: 'Face Pull (Cable or Band)', insight: 'Trainer Insight: this is the posture corrective you give every client every session', sets: '3', reps: '15–20', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face. Elbows at ear height. External rotation at end. Rear delt.' },
        ],
      },
    ],
  },

  // ═══════════ DAY 2 — 90% RED — PEAK OUTPUT ═══════════
  {
    intensity: 90,
    title: 'DAY 2 — PEAK OUTPUT',
    subtitle: 'Heavy Hinge · Power · Loaded Carry · Athletic Conditioning',
    descriptor: '90% INTENSITY · MAXIMUM LOADING · BONE DENSITY · ATHLETIC OUTPUT',
    intensityPara: "Day 2 is 90% — the red intensity day. This is near-maximal effort. The hex bar deadlift is loaded at approximately 90% of your 1RM for work sets of 3–5 reps. Farmers carry is at or above bodyweight per hand. The rate of force development finisher is programmed for peak power output. This is the session where bone density is built, athletic capacity is tested, and the ICONS system delivers its highest physiological stimulus. Rest fully between sets.",
    warmUp: '10–12 min: bike or row 3 min (moderate), hip hinge drill with dowel ×10, leg swings front/back and lateral ×10 each, glute bridge 2×15, box step-up 2×8 each leg (unloaded), deadlift warm-up: 40% × 5, 55% × 3, 70% × 2, 85% × 1. Trainer Insight: CNS warm-up for a 90% session requires specific loading ramp-up sets, not just general movement. The 85% single before work sets primes the nervous system for maximal output.',
    coolDown: "10–12 min: supine spinal twist 60s each, hamstring wall stretch 60s each, pigeon pose 90s each, hip flexor lunge 60s each, lateral lat stretch 45s each, 5 min supine breathing. Trainer Insight: the cool-down after a 90% session is as important as the session. CNS recovery begins here. A client who rushes the cool-down will under-recover. Model it yourself first.",
    iconsNote: "DAY 2 DEBRIEF — What to log and reflect on: (1) What was your deadlift load? How did 1 RIR feel on sets 1–4 vs the final set? (2) Which suitcase carry side felt harder? (3) How many AMRAP rounds? (4) How does your body feel right now vs how you expected it to feel? These debriefs are the coaching conversations you will have with clients after their 90% sessions. Practice them on yourself first.",
    blocks: [
      {
        letter: 'A', title: 'PRIMARY HINGE — HEX BAR DEADLIFT', introLabel: null,
        intro: 'The hex bar deadlift is the single most important movement in the ICONS system. It builds posterior chain strength, drives bone density (≥80% 1RM per LIFTMOR RCT), trains loaded hip extension, and is safe for a wide range of ages and populations. When you coach this lift, you are delivering a physiological intervention. Load it with that intention. Your working sets today are at 87–92% of your estimated 1RM.',
        exercises: [
          { name: 'Hex Bar Deadlift — Work Sets', insight: 'Trainer Insight: 3-sec eccentric is non-negotiable. This is where bone density is stimulated. Every client gets this.', sets: '5', reps: '3–5', load: '87–92% Est 1RM', tempo: '3-1-1', rest: '2–3 min', cue: 'Neutral spine. Hip-width stance. Drive floor away. Lock hips + knees at top.', rirNote: '1 RIR on sets 1–4 · 0–1 RIR on set 5' },
          { name: 'Romanian Deadlift (Barbell)', insight: 'Trainer Insight: RDL teaches the hip hinge clients struggle with most', sets: '3', reps: '6–8', load: '70% 1RM', tempo: '3-1-1', rest: '90s', cue: 'Hips back to wall. Hamstring stretch at bottom. Bar close to legs.', rirNote: '2 RIR' },
          { name: 'Lateral Band Walk (Loaded)', insight: 'Trainer Insight: glute medius weakness = knee valgus = ACL risk. Every client gets this.', sets: '3', reps: '15 ea way', load: 'Heavy band', tempo: 'Controlled', rest: '30s', cue: 'Mini-band above knees. Squat stance. Steps lateral, maintain tension.' },
        ],
      },
      {
        letter: 'B', title: 'LOWER POWER + UNILATERAL STRENGTH', introLabel: null,
        intro: 'Power development at 90% intensity requires sub-maximal loads moved with maximal intent. The trap bar jump and box step-up jump build rate of force development — the same quality that protects clients from falls, drives athletic output, and deteriorates fastest with age. Every postmenopausal client you work with needs this in their program. Today you experience why.',
        exercises: [
          { name: 'Trap Bar Jump (or Box Jump)', insight: "Trainer Insight: rate of force development declines fastest with age. This is why it's programmed. Not optional.", sets: '4', reps: '4–5', load: '30–40% 1RM (fast)', tempo: 'Explosive', rest: '90s', cue: 'Fast intent. Triple extension: ankle, knee, hip. Land soft — absorb and reset.' },
          { name: 'Barbell Hip Thrust (Heavy)', insight: 'Trainer Insight: hip thrust at this load is the primary glute strength stimulus — not squats', sets: '4', reps: '5–6', load: '90% of your baseline', tempo: '2-2-1', rest: '90s', cue: 'Upper back on bench. Drive through heels. 2-sec hold. Exhale on drive.', rirNote: '1 RIR on last set' },
          { name: 'Weighted Reverse Lunge', insight: 'Trainer Insight: log L vs R. Your weaker leg will reveal itself here.', sets: '3', reps: '8–10 ea', load: 'Heavy — challenging', tempo: '2-1-1', rest: '60s', cue: 'Step back, hover rear knee. Drive through front heel. Full hip extension.', rirNote: '2 RIR' },
          { name: 'Single-Leg RDL (Heavy DB)', insight: 'Trainer Insight: log left vs right — find your own asymmetry before coaching others on theirs', sets: '3', reps: '6–8 ea', load: 'Heavy — challenging', tempo: '3-1-1', rest: '75s', cue: 'Soft knee. Hips square. DB tracks the standing leg. Control the balance.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C', title: 'LOADED CARRY — ICONS BATTERY MOVEMENT', introLabel: null,
        intro: 'Loaded carries are non-negotiable in the ICONS system. They train grip strength, shoulder packing, spinal stiffness, loaded gait, and metabolic conditioning simultaneously. Carry strength is one of the highest predictors of longevity outcomes in women over 50. Target: bodyweight / hand for the farmers carry. If you weigh 80 kg, carry 80 kg/hand. This is the advanced standard.',
        exercises: [
          { name: 'Farmers Carry (Trap Bar or DB) — Heavy', insight: 'Trainer Insight: if a 64-year-old client can carry 50 lbs/hand for 30 yards, you must carry more.', sets: '5', reps: '35–40 yds', load: 'BW per hand (target)', tempo: 'Controlled', rest: '90s', cue: 'Shoulders packed. Chest tall. Neutral neck. Grip is the limiter — that is the point.' },
          { name: 'Suitcase Carry — Single Arm (Heavy)', insight: 'Trainer Insight: the lateral lean reveals hip and core asymmetry. Your clients’ asymmetries live here.', sets: '3', reps: '30 yds ea', load: 'Heavy — reveals asymmetry', tempo: 'Controlled', rest: '60s', cue: 'One arm. Spine vertical. Resist the lateral lean. Log left vs right.' },
          { name: 'Medicine Ball Slam', insight: 'Trainer Insight: this is how you develop RFD safely across all ages and fitness levels', sets: '3', reps: '8–10', load: '12–16 lbs', tempo: 'Max intent', rest: '60s', cue: 'Full overhead raise. Slam with max force. Full-body power expression.' },
        ],
      },
      {
        letter: 'D', title: 'ATHLETIC FINISHER — RATE OF FORCE DEVELOPMENT', introLabel: null,
        intro: "The finisher is the highest-output, shortest-duration block. It tests and develops athletic capacity — the quality most clients fear they've lost. When you can perform this finisher, you can coach it. Record your score. Beat it next week. This is the same competitive framing you will use with clients.",
        exercises: [
          { name: 'Sled Push (Speed Focus)', insight: 'Trainer Insight: speed-load sled vs max-load sled = different stimulus. This is velocity training.', sets: '5', reps: '20 yds', load: '60–80% of max sled', tempo: 'Explosive', rest: '90s', cue: 'Low drive angle. Full hip extension each stride. Drive through the floor.' },
          { name: 'Farmer Carry — Sprint (Light, Fast)', insight: 'Trainer Insight: velocity training at sub-maximal loads builds fast-twitch output', sets: '3', reps: '20 yds', load: '50% of heavy carry', tempo: 'Fast walk / sprint', rest: '60s', cue: 'Same posture, faster pace. Power and speed variant of the carry pattern.' },
          { name: 'AMRAP — 10 Minutes (Record Rounds)', insight: 'Trainer Insight: record rounds completed. This is your Week 1 benchmark. Beat it every week. You will teach clients to track this same way.', sets: '10 min', reps: 'Max rounds', load: 'See cue', tempo: '—', rest: '—', cue: '5 pull-ups + 10 KB swings (32 kg) + 15 yd sprint. Count and record total rounds.' },
        ],
      },
    ],
  },

  // ═══════════ DAY 3 — 70% GREEN — BOTH LEGS + UPPER BODY ═══════════
  {
    intensity: 70,
    title: 'DAY 3 — BOTH LEGS + UPPER BODY',
    subtitle: 'Bilateral Squat · Hip Thrust · Vertical + Horizontal Pull · Upper Volume',
    descriptor: '70% INTENSITY · VOLUME ACCUMULATION · BILATERAL AFTER UNILATERAL · HYPERTROPHY',
    intensityPara: "Day 3 is 70% — the green intensity day. After Day 2's near-maximal hinge and power output, this session shifts to bilateral leg work at moderate load and upper body hypertrophy volume. The goal is accumulation, not peak effort. Notice the difference in how this session feels compared to Day 2 — that contrast is deliberate. You will program this exact contrast for your clients.",
    warmUp: '8 min: hip circles ×10 each, glute bridge 2×15, goblet squat ×10 (light), band pull-aparts 2×15, dead hang 20s, scapular push-up ×10. Trainer Insight: 70% days need a shorter warm-up than 90% days. The lower CNS demand means you don\'t need ramp-up sets to prime the nervous system — you need activation and pattern rehearsal only.',
    coolDown: "10 min: pigeon pose 90s each side, adductor wide-leg stretch 90s, thoracic extension foam roller 60s, doorway chest stretch 30s each, lat stretch 30s each, hamstring wall stretch 45s each. Trainer Insight: Day 3 cool-down covers both the lower body posterior work and the upper body pressing work from today. Full hip and shoulder sequence. If a client says they don't have time for the cool-down — this is your answer: 'The cool-down is not optional for a client who just squatted and pressed in the same session.'",
    iconsNote: "DAY 3 DEBRIEF — What to log and reflect on: (1) How did the bilateral squat feel after Day 2's heavy unilateral hinge? Did the pattern feel different? (2) Did your knee tracking hold under bilateral load at 75%? What did the corrective primer change? (3) In the upper body superset — which side fatigued first on the row? (4) What is the difference in how you feel walking out of a 70% session vs a 90% session? This difference is what you will manage week-over-week for your clients.",
    blocks: [
      {
        letter: 'A', title: 'CORRECTIVE PRIMER — KNEE STABILITY + POSTERIOR CHAIN ACTIVATION', introLabel: null,
        intro: "The corrective primer on a bilateral lower body day targets knee stability and glute activation. Today's correctives fire the glute medius and VMO — the two muscles most responsible for preventing knee valgus under bilateral loading. This is the corrective protocol your knee-valgus clients receive before every squat session.",
        exercises: [
          { name: 'Banded Squat (Mini-Band Above Knees)', insight: 'Trainer Insight: this is exactly what a knee-valgus client gets before loading. Feel why.', sets: '2', reps: '15', load: 'Light mini-band', tempo: '2-1-2', rest: '30s', cue: 'Band creates constant cue to push knees OUT. No load — full focus on tracking.', rirNote: 'Corrective — not to failure' },
          { name: 'Terminal Knee Extension (TKE — Band)', insight: 'Trainer Insight: TKE is the fastest way to activate VMO before squatting. Use it always.', sets: '3', reps: '15 ea', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Band behind knee. Drive to full extension. VMO fires directly. Knee corrective.' },
          { name: 'Lateral Band Walk (Glute Med Activation)', insight: 'Trainer Insight: glute med drives knee tracking. Activate it before every bilateral squat session.', sets: '2', reps: '15 ea way', load: 'Mini-band above knees', tempo: 'Controlled', rest: '30s', cue: "Band above knees. Proud chest. Steps lateral — don't let knees cave inward." },
          { name: 'Copenhagen Plank (Adductor)', insight: 'Trainer Insight: adductor + abductor balance = stable knee joint. This is the corrective pair.', sets: '3', reps: '25–30s ea', load: 'Bodyweight', tempo: 'Hold', rest: '45s', cue: 'Side plank. Top leg on bench. Adductor isometric. Hips stacked and level.' },
        ],
      },
      {
        letter: 'B', title: 'BILATERAL SQUAT — BOTH LEGS · MODERATE LOAD', introLabel: null,
        intro: "Day 3 bilateral squat follows Day 2's unilateral hinge. The bilateral pattern at 70% load teaches you how to coach the squat as a skill — not a max effort test. At this intensity the client can hear your cues, process them, and apply them. This is the teaching window. Your clients' squat technique improves most on 70% days, not 90% days.",
        exercises: [
          { name: 'Back Squat (Bilateral)', insight: 'Trainer Insight: 75% at 8–10 reps is the volume-accumulation standard. Notice how different this feels from 90% × 3–5.', sets: '4', reps: '8–10', load: '75% Est 1RM', tempo: '3-1-1', rest: '90s', cue: 'Brace before descent. Sit between knees — not down. Drive through full foot.', rirNote: '2 RIR on all sets' },
          { name: 'Goblet Squat (Technique + Depth)', insight: 'Trainer Insight: goblet squat teaches clients to sit into the bottom position. Use this as a teaching tool.', sets: '3', reps: '12–15', load: 'Moderate — technique focus', tempo: '3-2-1', rest: '60s', cue: '2-sec pause at bottom. Knees out. Heels down. Chest tall. Elbows push knees.', rirNote: '3 RIR — technique priority' },
          { name: 'Lying or Seated Hamstring Curl (Machine)', insight: "Trainer Insight: 3-sec eccentric on the curl is highest mechanical tension point. Don't let clients rush this.", sets: '3', reps: '12–15', load: 'Light-Moderate', tempo: '2-1-3', rest: '45s', cue: '3-sec eccentric. Hips flat on pad. Full extension between reps. Hamstring isolation.' },
        ],
      },
      {
        letter: 'C', title: 'HIP THRUST + POSTERIOR CHAIN — BILATERAL GLUTE & HAMSTRING', introLabel: null,
        intro: "Hip thrust at 70% is the moderate volume day for the posterior chain. After Day 2's heavy unilateral hinge, bilateral hip thrust at this load completes the posterior chain volume for the week. Notice the tempo: 2-second hold at the top is non-negotiable. This is where the glute contraction occurs — allowing the weight to crash down eliminates the stimulus.",
        exercises: [
          { name: 'Barbell Hip Thrust (Bilateral)', insight: 'Trainer Insight: hip thrust at this load is the primary glute hypertrophy stimulus for the week. The 2-sec hold is the contraction — not a pause.', sets: '4', reps: '10–12', load: '80% of Day 2 hip thrust load', tempo: '2-2-1', rest: '75s', cue: 'Upper back on bench. Drive through heels. 2-sec hold. Exhale on the drive.', rirNote: '2 RIR on all sets' },
          { name: 'Romanian Deadlift (Bilateral — Both Legs)', insight: 'Trainer Insight: bilateral RDL after hip thrust = full posterior chain volume. This is the pairing.', sets: '3', reps: '10–12', load: '70% 1RM', tempo: '3-1-1', rest: '60s', cue: 'Hips back. Hamstring loaded to full stretch. Bar or DBs close to legs throughout.', rirNote: '2 RIR' },
          { name: 'Leg Press (Bilateral — Foot Width Variation)', insight: 'Trainer Insight: foot position variation teaches clients that stance is individual — not universal.', sets: '3', reps: '12–15', load: 'Moderate', tempo: '3-1-1', rest: '60s', cue: 'Try two foot positions: shoulder-width and wide-stance. Note which feels stronger.', rirNote: '2 RIR' },
          { name: 'Glute Bridge — Feet Elevated (Bodyweight Volume)', insight: 'Trainer Insight: this high-rep glute bridge volume at session end is exactly what you give clients as a finisher when they need glute activation without spinal load.', sets: '2', reps: '20–25', load: 'Bodyweight', tempo: '2-2-1', rest: '30s', cue: 'Heels on bench. 2-sec hold at top. Max squeeze. High-rep glute finisher.' },
        ],
      },
      {
        letter: 'D', title: 'UPPER BODY VOLUME — HYPERTROPHY PUSH + PULL', introLabel: null,
        intro: 'Upper body volume follows the lower body primary work. At 70% intensity, upper body moves into a higher rep range (10–15) with moderate loads. Pull volume matches or exceeds push volume — this is the rule every trainer must apply in every program they write. The superset pairing here teaches you how to structure efficient client programming: opposing muscle groups, zero wasted rest time.',
        exercises: [
          { name: 'DB Bench Press + Chest-Supported Row (Superset)', insight: 'Trainer Insight: push + pull superset = maximum efficiency. Agonist rests while antagonist works. Every client benefits from this structure.', sets: '4', reps: '10–12 ea', load: '70% 1RM each', tempo: '3-1-1 / 3-1-2', rest: '75s after both', cue: 'Press: elbows at 45°. Row: full stretch at bottom — blade opens. No rest between.', rirNote: '2 RIR on each' },
          { name: 'Lat Pulldown (Wide Grip) + DB Lateral Raise (Superset)', insight: 'Trainer Insight: vertical pull + lateral delt superset = shoulder health pairing. These two movements together prevent the imbalance that causes impingement.', sets: '3', reps: '12–15 ea', load: 'Moderate each', tempo: '2-1-2 / 2-1-2', rest: '60s after both', cue: 'Pulldown: elbows to hip pockets. Lateral raise: 1-sec hold at top. No swinging.', rirNote: '2 RIR on each' },
          { name: 'Push-Up (Full Floor — Volume Set)', insight: 'Trainer Insight: push-up volume at moderate load is how you track pressing endurance progression. Record it every session.', sets: '3', reps: '15–20', load: 'Bodyweight', tempo: '2-0-1', rest: '60s', cue: 'Stop 2 reps before failure. 3 sets. Record total reps across all sets.', rirNote: '2 RIR — not to failure' },
          { name: 'Face Pull + Band Pull-Apart (Superset)', insight: 'Trainer Insight: this posture corrective superset is what you give every client at the end of every upper body session. Non-negotiable for shoulder health.', sets: '3', reps: '20 ea', load: 'Light band each', tempo: '2-1-2', rest: '30s after both', cue: 'Face pull: pull to face, external rotation at end. Pull-apart: full retraction.' },
        ],
      },
      {
        letter: 'E', title: 'BILATERAL CORE — LOADED CARRY PRIMER + STABILITY', introLabel: null,
        intro: 'Day 3 core closes with loaded carries at moderate weight — not the bodyweight-per-hand Day 2 standard, but a purposeful volume day for the carry pattern. Paired with rotational and anti-extension work, this block reinforces the core stability that makes every bilateral compound lift safer and more powerful.',
        exercises: [
          { name: 'Farmers Carry (Moderate — Bilateral)', insight: "Trainer Insight: compare how this feels vs Day 2's BW/hand carry. The contrast teaches clients why carry load matters.", sets: '3', reps: '30–35 yds', load: '60–65% of Day 2 carry', tempo: 'Controlled', rest: '60s', cue: 'Same posture as Day 2. Shoulders packed. Chest tall. Grip the implement hard.' },
          { name: 'Elbow Plank (Loaded — Moderate)', insight: "Trainer Insight: 15 lb plate vs Day 1's 25 lb plate. 70% day = 70% of core challenge too.", sets: '3', reps: '60s', load: '15 lb plate', tempo: 'Hold', rest: '75s', cue: 'Plate on mid-back. Exhale to brace. Glutes squeezed. Neutral neck.' },
          { name: 'Rotational Med Ball Throw (Wall) or Cable Rotation', insight: "Trainer Insight: rotational power training is the missing link in most women's programs. This is how you add it safely.", sets: '3', reps: '10 ea side', load: '8–12 lb ball or moderate cable', tempo: 'Explosive', rest: '45s', cue: 'Drive from the hips and core — not the arms. Rotate fully. Catch or resist.' },
        ],
      },
    ],
  },

  // ═══════════ DAY 4 — 70% GREEN — VOLUME & SKILL (completed — not in source) ═══════════
  {
    intensity: 70,
    title: 'DAY 4 — VOLUME & SKILL',
    subtitle: 'Full-Body Volume · Corrective Mastery · Coaching Practice',
    descriptor: '70% INTENSITY · SUB-MAXIMAL LOADS · TEACHING WINDOW · FILM YOUR CUES',
    intensityPara: 'Day 4 drops back to 70% — but this is not a rest day disguised as training. This is the volume day: sub-maximal loads, higher total sets, and the session where you actively practice being a coach, not just a lifter. Film yourself delivering at least two coaching cues today and review the footage tonight. Notice how each block below stacks toward the ACSM 2026 threshold of 10+ sets per muscle group per week — the same weekly volume target every ICONS client program is built around.',
    warmUp: '8–10 min: ankle circles ×10 each, hip circles ×10 each, band pull-aparts 2×15, scapular push-ups ×10, goblet squat 2×10 (light), walking lunge with reach ×8 each. Trainer Insight: a 70% volume day still opens with the same activation sequence as every other day — mobility → activation → pattern primer never changes, regardless of the day\'s intensity.',
    coolDown: "10 min: standing quad stretch 45s each, doorway chest stretch 30s each, seated forward fold 60s, thread-the-needle 45s each, box breathing 5 rounds. Trainer Insight: cool-down is also the moment to review your filmed cues from Block D. Watch one clip before you leave the gym, while it's fresh.",
    iconsNote: 'DAY 4 DEBRIEF — What to log and reflect on: (1) Which side won on the split squat and single-leg hip thrust — does it match your Day 2 asymmetry notes? (2) Watch your filmed cue from Block D. Was it the exact written cue, or did you paraphrase? (3) How did narrating Block B out loud change how you felt about the set? (4) Running weekly total: how many sets have you logged for chest, back, and legs so far this week? Are you tracking toward 10+ per muscle group? These are the exact questions a client\'s 4-week check-in is built around.',
    blocks: [
      {
        letter: 'A', title: 'CORRECTIVE PRIMER — ANKLE & SHOULDER MOBILITY', introLabel: null,
        intro: "Volume days accumulate the most total reps of the week, which means the joints doing the most repetitive work — ankles under squat volume, shoulders under press volume — get the corrective attention today. This is the block you'll use with clients training high-volume hypertrophy phases.",
        exercises: [
          { name: 'Ankle Dorsiflexion Mobilization (Wall)', insight: 'Trainer Insight: limited ankle mobility is the single most under-diagnosed cause of poor squat depth', sets: '2', reps: '10 ea', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'Knee to wall, heel down. Drive knee forward and back. Feel the ankle, not the calf.' },
          { name: 'Banded Shoulder Dislocate', insight: 'Trainer Insight: this is your pre-press shoulder-health screen — if it feels tight today, scale the press load', sets: '2', reps: '12', load: 'Light band or dowel', tempo: 'Slow', rest: '30s', cue: 'Wide grip. Overhead and behind without shrugging or arching. Stop at the first pinch.' },
          { name: 'Wall Slide (Scapular Control)', sets: '2', reps: '12', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Low back and wrists flat on wall throughout. Slide up without losing contact.' },
        ],
      },
      {
        letter: 'B', title: 'UPPER BODY VOLUME — HORIZONTAL PUSH + PULL', introLabel: null,
        intro: "Sub-maximal load, higher rep target. This is the block where clients build the muscular volume that drives the shape changes they actually came in for. At 70%, you can talk through every rep — practice narrating what you're feeling out loud as if a client were asking.",
        exercises: [
          { name: 'DB Flat Bench Press', insight: "Trainer Insight: narrate this set out loud — this is the exact cueing cadence you'll use with a client on rep 8 of 12", sets: '4', reps: '10–12', load: '65% Est 1RM', tempo: '2-1-1', rest: '75s', cue: 'Elbows at 45°. Full stretch at bottom. Press to lockout without flaring.', rirNote: '2 RIR' },
          { name: 'Chest-Supported Row', sets: '4', reps: '10–12', load: '65% Est 1RM', tempo: '2-1-2', rest: '75s', cue: 'Chest pinned to pad. Drive elbows back. 1-sec squeeze at the top.', rirNote: '2 RIR' },
          { name: 'DB Lateral Raise', insight: 'Trainer Insight: this is the accessory clients skip on their own and the one that changes shoulder shape the most', sets: '3', reps: '12–15', load: 'Light-moderate', tempo: '2-1-2', rest: '45s', cue: 'Lead with elbows, not hands. Stop at shoulder height. No swinging.' },
        ],
      },
      {
        letter: 'C', title: 'LOWER BODY VOLUME — UNILATERAL FOCUS', introLabel: null,
        intro: "Unilateral volume work at moderate load is where asymmetries first become visible — the same window you use with every client's first few sessions. Pay attention to which side fatigues first.",
        exercises: [
          { name: 'Bulgarian Split Squat', insight: 'Trainer Insight: rear-foot-elevated split squat reveals hip asymmetry faster than any bilateral lift', sets: '3', reps: '10–12 ea', load: 'Moderate DB each hand', tempo: '2-1-1', rest: '75s', cue: 'Torso tall. Rear foot on bench. Front knee tracks over toes. Note L vs R.', rirNote: '2 RIR' },
          { name: 'Single-Leg Hip Thrust (Bench)', sets: '3', reps: '12 ea', load: 'Bodyweight or light DB', tempo: '2-2-1', rest: '60s', cue: 'Shoulders on bench, one foot planted. 2-sec hold at top. Log the harder side.' },
          { name: 'Standing Calf Raise', sets: '3', reps: '15–20', load: 'Moderate', tempo: '2-1-2', rest: '45s', cue: 'Full stretch at bottom, full extension at top. Slow and controlled — no bouncing.' },
        ],
      },
      {
        letter: 'D', title: 'CORE & COACHING PRACTICE — FILM TODAY', introLabel: null,
        intro: "This block closes every volume day. Pair up if you can, or set up a phone camera: deliver the coaching cue for each exercise out loud, exactly as written, before the working set begins. Review the footage tonight — this is the single fastest way to close the gap between knowing a cue and delivering it fluently.",
        exercises: [
          { name: 'Cable Woodchop (High to Low)', sets: '3', reps: '12 ea side', load: 'Moderate', tempo: '2-1-2', rest: '45s', cue: 'Rotate from the hips and core. Arms stay long. Control the return.' },
          { name: 'Weighted Sit-Up (Plate)', sets: '3', reps: '15', load: '10–15 lb plate', tempo: '2-0-2', rest: '45s', cue: 'Plate at chest. Exhale to curl up. Control the descent — no momentum.' },
          { name: 'Farmer Carry (Moderate — Coaching Cue Practice)', insight: 'Trainer Insight: say the cue before the client picks up the weight, not after — this block is about that timing habit', sets: '3', reps: '30 yds', load: "60% of your Day 2 carry", tempo: 'Controlled', rest: '60s', cue: 'Shoulders packed, chest tall. Say the cue out loud before you lift, not during.' },
        ],
      },
    ],
  },

  // ═══════════ DAY 5 — 90% RED — FAST-TWITCH PERFORMANCE (completed — not in source) ═══════════
  {
    intensity: 90,
    title: 'DAY 5 — FAST-TWITCH PERFORMANCE',
    subtitle: 'Plyometric Power · Speed · Explosive Conditioning',
    descriptor: '90% INTENSITY · MAXIMAL VELOCITY · RATE OF FORCE DEVELOPMENT · ATHLETIC CEILING',
    intensityPara: "Day 5 closes the week at 90% again, but this session tests a different quality than Day 2's heavy hinge. Today is about how fast you can produce force, not how much you can move. This is the session where the athletic capacity most clients believe they've lost — power, speed, explosiveness — gets tested and rebuilt. Every rep is maximal intent, even when the load is light.",
    warmUp: "10–12 min: bike or row 3 min (easy), high knees ×20 yds, butt kicks ×20 yds, A-skips ×20 yds, lateral shuffle ×10 each way, box jump — 3 easy reps to prime the pattern (no max effort yet). Trainer Insight: power days need a dynamic, rising-intensity warm-up, not a static one — the nervous system needs to feel fast before it's asked to be fast.",
    coolDown: "10–12 min: standing hamstring stretch 45s each, quad stretch 45s each, hip flexor lunge 60s each, child's pose 90s, 5 min supine breathing. Trainer Insight: a fast-twitch session spikes the nervous system harder than a heavy-hinge day — the extended breathing block at the end is not optional. Model unhurried recovery here; clients copy your pace.",
    iconsNote: "DAY 5 DEBRIEF — What to log and reflect on: (1) What was your best interval score on the finisher? Write it down — this is your Week 1 benchmark. (2) Did the depth jump or broad jump feel more natural? Why might that matter for a client's individual programming? (3) How does 90% fast-twitch fatigue feel compared to Day 2's 90% heavy-hinge fatigue — same number, different experience? (4) You've now completed a full 5-day ICONS week on yourself. What surprised you most? This is the exact debrief conversation you'll have with a client after her first full week.",
    blocks: [
      {
        letter: 'A', title: 'PLYOMETRIC POWER — LOWER BODY', introLabel: null,
        intro: 'Plyometric work is dosed in low reps at maximal intent, with full recovery between sets — the opposite of a metabolic circuit. Rate of force development declines fastest with age of anything you can train, which is exactly why this block exists for every client over 40, not just athletes.',
        exercises: [
          { name: 'Depth Jump (12–18in Box)', insight: 'Trainer Insight: minimize ground contact time — this is the entire point of the drill, not the jump height', sets: '4', reps: '4', load: 'Bodyweight', tempo: 'Explosive', rest: '2 min', cue: "Step off, don't jump off. Land and rebound instantly. Absorb, then explode." },
          { name: 'Broad Jump (Distance)', sets: '4', reps: '3', load: 'Bodyweight', tempo: 'Explosive', rest: '90s', cue: 'Full arm swing. Triple extension at takeoff. Stick the landing — control it.', rirNote: 'Maximal intent, not maximal fatigue' },
          { name: 'Lateral Bound (Skater Jump)', insight: 'Trainer Insight: frontal-plane power is the quality most programs skip entirely — falls happen sideways, not forward', sets: '3', reps: '6 ea side', load: 'Bodyweight', tempo: 'Explosive', rest: '75s', cue: 'Push off outside leg, land soft on the opposite leg. Hold the landing 1 second.' },
        ],
      },
      {
        letter: 'B', title: 'SPEED & SLED WORK', introLabel: null,
        intro: "Sled work at this intensity is velocity training, not strength training — the load is light enough to move fast, which is the entire stimulus. Compare how this feels to Day 1's heavy press work: same nervous system, completely different demand.",
        exercises: [
          { name: 'Sled Sprint (Light Load)', insight: 'Trainer Insight: if the sled slows you down noticeably, the load is too heavy for a speed day', sets: '5', reps: '15 yds', load: '20–30% BW', tempo: 'Max effort', rest: '90s', cue: 'Low drive angle for the first 5 yards, then tall and fast. Full sprint mechanics.' },
          { name: 'Resisted Sprint (Band or Sled Harness)', sets: '3', reps: '15 yds', load: 'Light resistance', tempo: 'Max effort', rest: '90s', cue: 'Drive knees, pump arms. Resistance should barely be noticeable after the first steps.' },
        ],
      },
      {
        letter: 'C', title: 'EXPLOSIVE UPPER BODY', introLabel: null,
        intro: 'Upper-body power gets programmed far less often than lower-body power in most systems — this block corrects that. The same rate-of-force-development principle applies to a chest pass as it does to a jump.',
        exercises: [
          { name: 'Medicine Ball Chest Pass (Wall)', insight: 'Trainer Insight: full extension and release, every rep — a slow chest pass has already lost the stimulus', sets: '4', reps: '6', load: '8–12 lb ball', tempo: 'Max intent', rest: '60s', cue: 'Load through the chest, release with full extension. Catch and reset — no rushing.' },
          { name: 'Plyo Push-Up', insight: "Trainer Insight: hands should clear the floor visibly — if they don't, regress to a box or bench height", sets: '3', reps: '5', load: 'Bodyweight', tempo: 'Explosive', rest: '75s', cue: 'Explode up until hands leave the floor. Land soft, reset your brace, go again.' },
        ],
      },
      {
        letter: 'D', title: 'CONDITIONING FINISHER — INTERVAL SPEED WORK', introLabel: null,
        intro: "Day 2's finisher was AMRAP for total volume. This one is interval-based for pure speed — different metabolic demand, same principle: record it, beat it next week, and teach clients to do the same.",
        exercises: [
          { name: 'Assault Bike or Sprint Intervals', insight: 'Trainer Insight: record max effort per interval, not an average — this is what tells you and a client whether output is actually improving', sets: '6', reps: '20s max effort / 40s rest', load: 'All-out effort', tempo: '—', rest: '40s', cue: 'Six rounds. Full sprint for 20 seconds, complete rest for 40. Log your hardest round.' },
        ],
      },
    ],
  },
];

const summary = {
  subtitle: 'ICONS Trainer Development Program · ICONS Index · Progressive Intensity Build · Week 1',
  rows: [
    ['DAY 1', '80% — Gold', 'Primary Strength', 'Bench · OHP · Weighted Pull-Up · Heavy Row · Loaded Plank', 'Push = Pull volume · 4 sets at 80% 1RM · 2 RIR discipline'],
    ['DAY 2', '90% — Red', 'Peak Output', 'Hex DL · Hip Thrust · Weighted Carry · AMRAP Finisher', 'Deadlift 87–92% 1RM · Carry BW/hand · Record AMRAP score'],
    ['DAY 3', '70% — Green', 'Both Legs + Upper', 'Back Squat · Hip Thrust · Bench + Row Superset · Carries', 'Squat 75% at 8–10 reps · Hip thrust 80% Day 2 load · Pull = Push volume'],
    ['DAY 4', '70% — Green', 'Volume + Skill', 'Sub-maximal loads · High volume · Corrective focus', '10+ sets/muscle group · Film client scenarios · Practice cues'],
    ['DAY 5', '90% — Red', 'Fast-Twitch', 'Power · Speed sled · Jump training · Conditioning', 'Rate of force development · Plyometrics · Max output'],
  ],
  milestones4wk: 'Week 1: establish all ICONS battery baselines on yourself. Document every number. Week 2: increase loads 5–10%. Begin filming your own sessions for form review. Week 3: add weighted vest to push-ups, increase carry load to 110% BW/hand, attempt a heavier pull-up. Week 4: retest all baselines. Compare to Week 1. You now know what a client experiences at their 4-week reassessment.',
  milestones8wk: 'By Week 8: you will have completed 2 full ICONS training cycles on yourself. You will have experienced: the corrective primer protocol, the RIR loading system, the asymmetry discovery, the carry progression, the AMRAP competitive framework, the loaded plank progression, and the 8-week reassessment. You are now qualified to coach this system because you have lived it.',
  rescanNote: 'Self-assessment: retest all baseline movements using the same protocol from Week 1. Calculate the percentage increase on each ICONS battery lift. This is what your clients experience when they see their 8-week results. The emotion they feel — the proof of progress — is what you are delivering as a Brace Life Studios trainer. Know that moment from the inside.',
};

const data = {
  client,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: false, // generic advanced template, no individual weight/age/ALST on file — nothing fabricated
  includeProgressionBlock: true, // engine's standard teal RIR callout, replacing the source's boxed table (see header note)
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'trainer_education');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'ICONS_Trainer_Development_Program.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

// Exercise/day content reused by the 3 build-up variants (see
// icons_trainer_development_program_{a,b,c}.js) — only runs main() when
// executed directly, so requiring this module for its data has no side effect.
module.exports = { client, weekOverview, baselines, baselineNotes, days, summary, data };

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
