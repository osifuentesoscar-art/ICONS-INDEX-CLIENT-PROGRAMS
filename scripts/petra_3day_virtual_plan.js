/**
 * Petra — ICONS 3-Day Virtual Training Plan (Updated Equipment)
 * Brace Life Studios
 *
 * Rebuilt from the client's existing document (petra.docx, "3-Day Virtual
 * Plan / Updated Equipment") to match the confirmed engine standard (Kelly
 * Mulroy reference — see CLAUDE.md's "Visual language" note). All program
 * content, loads, force-assessment findings, and coaching cues are carried
 * over 1:1 from the source; only rendering and a few structural mappings
 * changed to fit buildDocument()'s schema. Notes on those mappings:
 *
 * - No Styku scan, ALST, BMI, age, height, or weight appear anywhere in the
 *   source. client.alstIndex / client.isPostmenopausal / client.weightKg /
 *   client.ageYears are therefore all left UNSET — do not fabricate them.
 *   This also means proteinBar() and pelvicFloorCallout() correctly never
 *   fire for this client (no ALST-At-Risk or postmenopausal basis), and
 *   includeNutritionBlock is set false because the source has no protein/
 *   creatine/collagen content to report on (nutritionBlock() requires
 *   client.weightKg to compute real numbers — inventing a body weight to
 *   populate it would be fabrication).
 *
 * - The source instead has a force-plate/dynamometer "FORCE ASSESSMENT
 *   RESULTS" table (grip squeeze, floor pull, hip extension A/B — peak
 *   force L/R, % asymmetry, time-to-peak, coach flags) that has no matching
 *   buildDocument() table component. Its findings are carried into
 *   baselineNotes as narrative watch/teal/gold callouts (the same technique
 *   the Johanna Castillo migration used for tabular Styku findings) —
 *   content preserved in full, only the rendering shape changed.
 *
 * - The source's cover day-strip used non-standard accent colors (blue /
 *   green / purple) with an EMPTY day-header badge (no % shown) — a
 *   pre-engine design quirk, not the confirmed dayHeader() badge. Since
 *   day.intensity must resolve through the engine's 60/70/80/90/AR palette,
 *   each day was mapped to the closest content-justified % based on its own
 *   descriptor line: Day 1 ("STRENGTH EMPHASIS · PRIMARY LOWER BODY VOLUME")
 *   -> 80% Gold; Day 2 ("PUSH/PULL BALANCE", moderate, no near-failure
 *   language) -> 70% Green (this also happens to match the source's own
 *   green accent for Day 2); Day 3 (explicitly "the highest-demand session
 *   of the week," schedule a rest day after) -> 90% Red. This is an
 *   interpretive rendering decision, not literal source data.
 *
 * - Per-day "Equipment" lines and Day 3's "Day 3 Purpose" paragraph have no
 *   dedicated schema field; both are folded into each day's intensityPara
 *   per the task's guidance to preserve virtual/equipment framing there.
 *
 * - The closing section had two custom matrix tables (Week x Day load grid;
 *   Movement x Week-load progression grid) that don't match weeklySummary()'s
 *   fixed 5-column schema. Their content was reorganized into
 *   summary.rows (one row per training day) plus prose in milestones4wk /
 *   milestones8wk — all figures preserved, only the layout changed.
 *   rescanNote is left unset — there is no Styku rescan for this client;
 *   the 8-week milestone note instead points to re-testing the force
 *   assessment protocol, which is what the source itself tracks.
 *
 * - Note on source content: the Day 1 warm-up text reads "5–80% grade" for
 *   the treadmill incline (confirmed verbatim in the source XML, not an
 *   extraction artifact). This looks like a plausible source typo (most
 *   likely intended as "5–8%") but is reproduced exactly as written per
 *   instruction not to editorialize the client's document — flagged here
 *   for Xolokan's review rather than silently corrected.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Petra',
  programTitle: '3-Day Virtual Training Plan',
  subtitle: 'Strength & Muscle Building — Updated Equipment',
  schedule: 'Virtual · Flexible 3-Day',
  stats: ['Intermediate', 'Flexible 3-Day Schedule', 'Dumbbells', 'Kettlebell', 'Bench', 'Bands', 'Medicine Ball'],
};

const weekOverview = [
  { day: 'DAY 1', intensity: 80, focus: 'Lower Body\nSquat · Hinge · Unilateral · KB' },
  { day: 'DAY 2', intensity: 70, focus: 'Upper Body\nPush · Pull · Carry · Bench' },
  { day: 'DAY 3', intensity: 90, focus: 'Full Body Power\nKB · Med Ball · Compound Clusters' },
];

const baselines = [
  ['Hex Deadlift', '95 lbs', 'Working', '130 lbs ×5 · Training Wk1: 85 lbs ×4×5 (70% effort, groove the pattern first)'],
  ['Farmers Carry', '40 lbs / hand', 'Working', '55 lbs/hand · Wk1: 40 lbs ×4 sets → +5 lbs/hand each week'],
  ['Overhead Press (DB)', '15 lbs / hand', 'Working', '22.5 lbs/hand ×8 · Wk1: 15 lbs ×10–12 → +2.5 lbs every 2 weeks'],
  ['Dumbbell Chest Press', '15 lbs / hand', 'Working', '22.5 lbs/hand ×8 · Wk1: 15 lbs ×10–12 → +2.5 lbs every 2 weeks'],
  ['Split Stance Squat (DB)', '20 lbs / hand', 'Working', '32.5 lbs/hand ×8 · Wk1: 20 lbs maintained → +2.5 lbs every 2 weeks'],
  ['Single-Leg RDL (DB)', '20 lbs / hand', 'Working', '30 lbs/hand ×8 · Wk1: 20 lbs ×10 → +2.5 lbs every 2 weeks'],
  ['Single-Leg DB (Unilateral)', '20 lbs', 'Working', '30 lbs · Wk1: 20 lbs → same progression'],
  ['Push-Up', '10 assisted', 'Max', '15 full push-ups unassisted · Transition to full by Week 3'],
  ['Plank (Elbow)', ':45', 'Max', '1:20 · +10s per week'],
];

const baselineNotes = [
  {
    type: 'gold',
    label: 'Training Load Logic',
    body: 'For strength and muscle building at an intermediate level, primary compound lifts run at 70–85% of working weight for 3–5 sets of 5–10 reps. Last 2 reps of every work set should be hard but achievable. Reps in Reserve (RIR): always leave 1–2 reps in the tank on sets 1–3. Final set can go closer to failure.',
  },
  {
    type: 'gold',
    label: 'Virtual Session Format',
    body: 'Each session is designed for self-coaching. Every exercise includes setup notes, key form cues, and progression criteria. Camera-on during virtual sessions means form can be checked from the front and side — coach will call cues live. Sessions run 45–60 minutes including warm-up and cool-down.',
  },
  {
    type: 'gold',
    label: 'Progressive Overload',
    body: 'Lower body: +2.5–5 lbs every 2 weeks when all sets are completed with 2 reps in reserve. Upper body: +2.5 lbs every 2 weeks. Deadlift: +5 lbs per week for first 4 weeks (linear progression still available at this baseline). Carry: +5 lbs/hand per week.',
  },
  {
    type: 'gold',
    label: 'Equipment List — Updated',
    body: 'Dumbbells (15–40 lbs range minimum, ideally 10–45 lbs). Kettlebell (one bell, 20–35 lbs recommended). Flat bench or adjustable bench. Resistance bands (light + medium). Medicine ball (8–12 lbs). Mat or flat floor space. This is an updated-equipment revision — several exercises below are explicit substitutions for cable- or anchor-based movements (DB Rear Delt Fly replaces banded face pull, Med Ball Rotational Press replaces Pallof press, KB Renegade Row replaces cable row) so every lift is achievable with the equipment list above.',
  },
  {
    type: 'watch',
    label: 'Force Assessment — Grip & Floor Pull: Left Arm Dominant (29.5% / 23.8%)',
    body: 'Grip squeeze: Left 78 lb (98th %ile, elite for her age) vs Right 55 lb (65th %ile) — 29.5% asymmetry favoring left. Floor pull: Left 332 lb vs Right 253 lb — 23.8% asymmetry, same pattern. Right arm gets priority sequencing and neural activation before all pulling and carry work.',
  },
  {
    type: 'teal',
    label: 'Right Arm Neural Delay — 14.8% Slower Time-to-Peak Force',
    body: 'Right time-to-peak 1.01s vs left 0.88s on the grip test. Right arm will underperform in all carries and pulling until this closes. Protocol: right-hand isometric squeeze hold 10s ×3 before every loaded pulling session and before Day 3 — fires the neural pathway and primes the right grip for heavy rows and carries.',
  },
  {
    type: 'watch',
    label: 'Force Assessment — Hip Extension: Right Hip Dominance (Projected 43.9%)',
    body: 'Hip Extension A (direct test): Left 32 lb vs Right 36 lb — 11.1% right advantage, both time-to-peak slow (1.9s / 2.18s), likely first-time test anxiety. Hip Extension B (system projection): Left 46 lb vs Right 82 lb — 43.9% right dominance. If confirmed on re-test, LEFT glute is severely undertrained. Left leg leads every unilateral lower-body exercise.',
  },
  {
    type: 'gold',
    label: 'Hip Extension Re-Test Note',
    body: 'Both hip time-to-peak readings are slow — likely first-time test anxiety rather than a true neuromuscular limit. Re-test hip extension at Session 3 or 4 once Petra is comfortable with the dynamometer. If the projected 43.9% gap is confirmed on re-test, left-hip priority continues in all lower-body programming.',
  },
  {
    type: 'watch',
    label: 'Force Pattern Summary — Opposing Compensation Chains',
    body: 'LEFT ARM DOMINANT in grip and pulling (29.5% asymmetry). RIGHT HIP DOMINANT in extension (11–44% asymmetry depending on reading). These are opposite patterns — the body is compensating on one chain for weakness in the other. Key training changes: (1) RIGHT arm gets priority sequencing and neural activation before all pulling and carry work. (2) LEFT leg leads all unilateral lower body exercises to address the right hip dominance and develop the weaker left glute.',
  },
];

const days = [
  {
    intensity: 80,
    title: 'Day 1 — Lower Body',
    subtitle: 'Squat · Hinge · Unilateral · Kettlebell',
    descriptor: 'Strength Emphasis · Primary Lower Body Volume · 45–55 Min',
    intensityLabel: '80% Day',
    intensityPara: 'Primary lower-body strength day — hex deadlift and squat patterns carry the week\'s heaviest working loads, with unilateral work directly targeting the force-assessment asymmetry below. Equipment: Dumbbells (20–95 lbs range) · Kettlebell · Bench or step · Mini-band (optional).',
    warmUp: '3 min treadmill incline walk (5–8% grade, posterior chain + hip flexor activation before loading). Then: LEFT HIP ACTIVATION: single-leg glute bridge LEFT side 2×12 + clamshell LEFT side 2×15. Bilateral glute bridge 2×10, KB deadhinge 2×10 light, leg swings 10 each, hip circles, deep squat hold 3×30s, ankle circles 10 each. Camera side-on.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY HINGE STRENGTH (HEX DEADLIFT)',
        introLabel: 'Deadlift Baseline',
        intro: '95 lbs. Week 1 starts at 85 lbs ×4×5 to groove the pattern. Add 5 lbs per session — linear progression is still available here. 130 lbs ×5 is the 4-week target. Camera side-on during deadlift sets so coach can check hip height, spine, and knee tracking.',
        exercises: [
          { name: 'Hex Bar Deadlift (or DB Deadlift)', sets: '4', reps: '5', load: 'Wk1: 85 lbs → Wk4: 110 lbs', tempo: '2-1-1', rest: '90s', cue: 'Stand centered in hex bar or DBs at sides. Hips hinge back to grip. Drive floor away, lockout hips at top. Neutral spine throughout. Camera side-on for coach check.' },
          { name: 'Romanian Deadlift (DB)', sets: '3', reps: '8–10', load: '30–40 lbs', tempo: '3-1-1', rest: '75s', cue: 'Hip hinge, soft knee, feel hamstring load. DBs track close to legs. Returns to standing via glute squeeze. Builds hamstring volume to complement the hex bar pattern.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY SQUAT STRENGTH',
        introLabel: 'Virtual Cue',
        intro: 'Camera facing front for goblet squat. Knees should track over the second toe. No inward collapse. Coach will cue depth — aim for thighs parallel or below.',
        exercises: [
          { name: 'Goblet Squat (DB or KB)', sets: '4', reps: '8–10', load: '30–40 lbs', tempo: '3-1-1', rest: '90s', cue: 'DB or KB at chest, elbows inside knees at depth. Full depth, drive through heels. Chest tall. Builds the bilateral squat pattern before loading heavier.' },
          { name: 'Bulgarian Split Squat (DB, per leg)', sets: '3+3', reps: '8 ea', load: '20–25 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Baseline 20 lbs/hand. Rear foot elevated on bench. Front knee tracks over second toe. Left leg leads first. +2.5 lbs/hand every 2 weeks.' },
          { name: 'Lateral Band Walk (Mini-band if available)', sets: '2', reps: '15 ea way', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Band above knees. Slight squat, step lateral. Glute medius activation — prevents knee cave under load.' },
        ],
      },
      {
        letter: 'C',
        title: 'UNILATERAL LOWER BODY',
        color: 'red',
        introLabel: 'Unilateral Priority — Force Data Informed',
        intro: 'Force assessment shows right hip extension is dominant (36 vs 32 lb on direct test, projected 82 vs 46 lb). LEFT glute is the weaker side. All unilateral lower body exercises lead with LEFT leg, all sets. Left side always completes full sets before switching to right. This directly targets the force asymmetry identified in testing.',
        exercises: [
          { name: 'Single-Leg RDL (DB)', sets: '3+3', reps: '8 ea', load: '20–25 lbs/hand', tempo: '3-1-1', rest: '60s', cue: 'Baseline 20 lbs/hand. Slight knee bend, hinge from hip, feel hamstring load. Return to standing by squeezing the glute. Left leg leads. +2.5 lbs every 2 weeks.' },
          { name: 'Single-Leg Dumbbell Squat (Step or Bench)', sets: '3+3', reps: '8 ea', load: '20–25 lbs', tempo: '3-1-1', rest: '60s', cue: 'Step on bench, single leg. Lower until opposite foot grazes floor. Drive through heel. Full hip extension at top. Left leg leads.' },
          { name: 'Hip Thrust (DB or Barbell, on Bench)', sets: '3', reps: '12–15', load: '30–45 lbs', tempo: '2-2-1', rest: '60s', cue: 'Upper back on bench, DB or bar on hips. Drive through heels, hold 2 seconds at top. Glute isolation — the key driver of glute hypertrophy.' },
        ],
      },
      {
        letter: 'D',
        title: 'KB COMPLEX FINISHER + CORE',
        color: 'gold',
        introLabel: 'Finisher',
        intro: 'KB Complex — 3 rounds, rest 90s between: 8 KB Swings (hip hinge power) + 8 KB Goblet Squat + 8 KB Romanian Deadlift + 30s Plank Hold (baseline :45 → build to 1:20). Use a KB you can swing explosively — not too heavy. Record load and rounds.',
        exercises: [
          { name: 'Plank Hold (Elbow)', sets: '3', reps: 'Baseline :45 +10s/wk', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline :45. Add 10 seconds per week. Full brace — squeeze glutes, ribs down, neutral neck. Camera side-on so coach can check spine position.' },
          { name: 'Dead Bug', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '45s', cue: 'Lower back pressed into floor throughout. Slow opposite arm-leg extension. Anti-extension core. Key stability work for deadlift and squat patterns.' },
          { name: 'KB Swing (Hinge Power)', sets: '4', reps: '10', load: 'Moderate KB', tempo: 'Explosive', rest: '60s', cue: 'Hip hinge back, drive hips forward hard. Not a squat — the power comes entirely from the hip snap. Arms are ropes. Rate of force development.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 90s each, supine hamstring stretch 60s each, hip flexor lunge 60s each, thoracic extension 60s.',
    iconsNote: 'Day 1 camera angles: side-on for deadlift. Front-facing for split squat and goblet squat — coach checks knee tracking and any lateral lean (right hip dominance can mask as a lean toward the left during unilateral work). Force data flags: left leg always completes ALL sets before right leg starts. Coach watches for right hip compensation on left-leg single-leg work.',
  },
  {
    intensity: 70,
    title: 'Day 2 — Upper Body',
    subtitle: 'Push · Pull · Carry · Bench',
    descriptor: 'Push/Pull Balance · Carry Strength · Push-Up Progression · 45–55 Min',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate, balanced upper-body volume — press and pull loaded evenly, no near-failure work. Right arm leads sequencing on every pulling exercise per the neural-delay protocol below. Equipment: Dumbbells (15–40 lbs) · Flat/adjustable bench · Resistance bands (light + medium) · Pull-up bar or band anchor (optional).',
    warmUp: '3 min treadmill walk or light jog (elevate HR before upper work). Then: RIGHT ARM NEURAL ACTIVATION: right hand isometric squeeze 10s ×3 (neural delay protocol). Arm circles 2×10, scapular push-ups 2×10, cat-cow 10 reps, thoracic rotation 10 each side, med ball chest pass to wall 2×8 light (shoulder warm-up). Camera: posture check before loading.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY PRESS STRENGTH (PUSH)',
        introLabel: 'Press Baseline',
        intro: '15 lbs/hand for the DB bench press. Wk1 keeps that load for 10–12 reps. Progress +2.5 lbs/hand every 2 weeks toward a 22.5 lbs/hand target by Week 4 — a realistic intermediary jump from a 15 lb working weight. Incline press runs slightly lighter to build the upper chest and anterior delt alongside the flat press.',
        exercises: [
          { name: 'DB Bench Press (Flat)', sets: '4', reps: '10–12', load: 'Wk1: 15 → Wk4: 22.5 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Baseline 15 lbs/hand. Elbows at 45°. Full range — DBs to chest level. Squeeze at top. Add 2.5 lbs/hand every 2 weeks. Target 22.5 lbs by Week 4.' },
          { name: 'Incline DB Press (30–45°)', sets: '3', reps: '10–12', load: '12.5–17.5 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Upper chest emphasis. Slightly lighter than flat press. Builds the upper chest and anterior delt that complement the flat press.' },
          { name: 'DB Single-Arm Row', sets: '4', reps: '8–10 ea', load: 'R: 30 lbs / L: 35 lbs Wk1', tempo: '3-1-2', rest: '60s', flag: 'Right arm leads — 14.8% neural delay protocol', cue: 'Force data: LEFT grip 78 lb (98th %ile), RIGHT 55 lb (65th %ile), 29.5% asymmetry. RIGHT arm leads each set and starts 5 lbs lighter than left. RIGHT arm: 3s isometric squeeze at top every rep to address the 14.8% neural delay. Left arm: normal tempo. Add 2.5 lbs/hand every 2 weeks.' },
          { name: 'Push-Up Progression', sets: '3', reps: 'Max (target 8–10 full)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Baseline 10 assisted. Week 1: incline push-ups (hands on bench) or first full floor attempts. Week 3: full push-ups from the floor. Record reps each set every session.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PULL STRENGTH',
        introLabel: 'Pull Baseline',
        intro: 'OHP baseline is 15 lbs/hand, progressing +2.5 lbs/hand every 2 weeks toward 22.5 lbs/hand by Week 4 — same rate as the bench press. Force data shows right grip 29.5% weaker (55 lb vs 78 lb) and 14.8% slower time-to-peak — right arm leads sequencing on every pulling exercise below and starts each load lighter than left. Row baseline: L 35 / R 30 lbs Wk1, adding 2.5 lbs/hand every 2 weeks toward symmetry. Renegade row and rear delt fly reinforce the same pull pattern and neural-delay protocol without a cable machine.',
        exercises: [
          { name: 'DB Overhead Press', sets: '4', reps: '10–12', load: 'Wk1: 15 → Wk4: 22.5 lbs/hand', tempo: '2-1-1', rest: '75s', cue: 'Baseline 15 lbs/hand. Seated or standing. Press overhead, arms alongside ears. Core rigid. Progress same rate as bench press.' },
          { name: 'KB Renegade Row', sets: '3', reps: '8 ea side', load: 'KB or 15–20 lbs DB', tempo: '2-1-2', rest: '60s', cue: 'Push-up position, one hand on KB. Row one arm while holding plank with the other. Builds lat and mid-back strength without a cable. RIGHT arm: 3s hold at top (neural delay protocol).' },
          { name: 'DB Rear Delt Fly (Bent-Over)', sets: '3', reps: '12–15', load: '8–12 lbs', tempo: '2-1-3', rest: '30s', cue: 'Hinge forward, arms hanging. Raise DBs out to shoulder height, 3-second hold at top. Rear delt and mid-back. Replaces banded face pull — no anchor needed. 3s hold creates the same stimulus.' },
          { name: 'Med Ball Overhead Slam', sets: '3', reps: '10', load: '8–10 lbs med ball', tempo: 'Explosive', rest: '20s', cue: 'Raise overhead, slam to floor with full force. Shoulders and lats fire hard at the top — trains the same scapular retraction pattern as a pull-apart but adds power expression. No band needed.' },
        ],
      },
      {
        letter: 'C',
        title: 'LOADED CARRY + CORE',
        color: 'gold',
        introLabel: 'Carry Baseline',
        intro: '40 lbs/hand. +5 lbs/hand per week. Week 4 target: 55 lbs/hand. Farmer carry is the single most reliable strength and grip builder in this program. Shoulders packed, chest tall, neutral neck. Camera side-on to check posture drift.',
        exercises: [
          { name: 'Farmer Carry (Both Hands, DB)', sets: '4', reps: '30–35 yds', load: 'Wk1: L 40 lbs / R 35 lbs', tempo: 'Controlled', rest: '90s', flag: 'Right hand 5 lbs lighter — grip asymmetry protocol', cue: 'Force data shows right grip 29.5% weaker. Start RIGHT hand 5 lbs lighter than left (L:40, R:35) to avoid right-side compensation. Raise right-side load by 5 lbs per week when sets complete cleanly. Target load symmetry by Week 4.' },
          { name: 'Suitcase Carry (Single Arm)', sets: '3', reps: '25 yds ea', load: '30–35 lbs', tempo: 'Controlled', rest: '60s', flag: 'RIGHT arm leads — grip asymmetry protocol', cue: 'RIGHT arm carries first each set, per the right-arm-priority protocol. Resist lateral lean. Anti-lateral flexion core. Reveals left-right imbalance under load.' },
          { name: 'Plank Hold (Elbow)', sets: '3', reps: 'Baseline :45 +10s/wk', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline :45. Add 10 seconds per week. Target 1:00 by Week 2, 1:20 by Week 4.' },
          { name: 'Med Ball Rotational Press', sets: '3', reps: '10 ea side', load: '8 lbs med ball', tempo: '2-1-2', rest: '45s', cue: 'Hold med ball at chest, step laterally and press out while resisting trunk rotation. No anchor needed. Same anti-rotation stimulus as Pallof press using the med ball as resistance.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s each, lat stretch 30s each, thoracic extension on floor 60s, bicep doorframe stretch 20s each.',
    iconsNote: 'Day 2 camera angles: front-facing for OHP (coach checks elbow flare and shoulder position). Side-on for bench press (coach confirms range of motion). Side-on for renegade rows (coach checks hip rotation and plank position). Side-on for carries. Switch angles between blocks.',
  },
  {
    intensity: 90,
    title: 'Day 3 — Full Body Power',
    subtitle: 'Kettlebell · Medicine Ball · Compound Clusters',
    descriptor: 'Rate Of Force Development · Metabolic Conditioning · Total-Body Strength · 50–60 Min',
    intensityLabel: '90% Day',
    intensityPara: 'Full body power day combines explosive KB work, medicine ball throws, and compound strength clusters. This is the highest-demand session of the week. It trains Rate of Force Development (RFD) — how fast you produce force — which builds athleticism and accelerates strength gains on Days 1 and 2. Schedule this session with at least one rest day after it. Equipment: Kettlebell (20–35 lbs) · Medicine ball (8–12 lbs) · Dumbbells (15–40 lbs) · Bench · Resistance band.',
    warmUp: '3 min treadmill moderate pace (full-body activation before power work). CORRECTIVE: Right hand isometric squeeze 10s ×3 (right grip neural delay). Left hip single-leg bridge 2×12 (left glute priority for hip extension gap). Then: leg swings 10 each, arm circles, hip circles, light KB deadhinge 2×10, med ball chest pass to wall 2×8 explosive.',
    blocks: [
      {
        letter: 'A',
        title: 'KB POWER BLOCK',
        introLabel: 'KB Setup',
        intro: 'Use a KB you can swing explosively — not so heavy that the hinge pattern breaks. Swings are a hip hinge power movement, not a squat. Hike the KB back between the legs, then snap the hips forward. Arms are passive — the hip drives everything.',
        exercises: [
          { name: 'KB Swing (Two-Hand)', sets: '5', reps: '10', load: 'Moderate KB', tempo: 'Explosive', rest: '60s', cue: 'Hip hinge back, explosive hip snap forward. The KB floats to shoulder height from hip drive alone. This is the foundational power exercise in this program.' },
          { name: 'KB Swing (Single-Arm, alternating)', sets: '3', reps: '8 ea hand', load: 'Moderate KB', tempo: 'Explosive', rest: '60s', cue: 'Same mechanics as two-hand. Release and switch at the top. Challenges rotational core stability. Build from two-hand base before loading this.' },
          { name: 'KB Goblet Squat (Pulse at Bottom)', sets: '3', reps: '10 + 5 pulse', load: 'Moderate KB', tempo: '3-1-1+pulse', rest: '60s', cue: 'Full squat, then pulse 3 inches at bottom for 5 reps. The pulse creates time under tension at the most mechanically demanding position.' },
          { name: 'KB Clean (to Rack Position)', sets: '3', reps: '6 ea side', load: 'Moderate KB', tempo: 'Explosive', rest: '75s', cue: 'Hinge back, pull KB up close to body, punch elbow under to rack at shoulder. Explosive pull from the floor. Builds power and shoulder stability simultaneously.' },
        ],
      },
      {
        letter: 'B',
        title: 'MEDICINE BALL POWER BLOCK',
        introLabel: 'Med Ball Note',
        intro: 'Medicine ball drills train explosive upper body power — something dumbbells and bands cannot replicate. These are ballistic movements: intent is maximum velocity on every rep. Use an 8–12 lb ball against a solid wall or floor.',
        exercises: [
          { name: 'Med Ball Chest Pass (Wall)', sets: '4', reps: '8', load: '8–12 lbs', tempo: 'Explosive', rest: '45s', cue: 'Stand 3–4 feet from wall. Catch and immediately fire back. No pause. Trains horizontal pushing power and reflexive upper body strength.' },
          { name: 'Med Ball Slam', sets: '4', reps: '8', load: '8–12 lbs', tempo: 'Explosive', rest: '45s', cue: 'Raise overhead (full extension), slam to floor with full force. Total-body power from shoulders through hips. Excellent metabolic and neural stimulus.' },
          { name: 'Med Ball Rotational Throw (Wall)', sets: '3', reps: '8 ea side', load: '8–10 lbs', tempo: 'Explosive', rest: '45s', cue: 'Stand side-on to wall, rotate through trunk and throw across body. Trains transverse plane power and thoracic rotation under load.' },
          { name: 'Med Ball Push-Up (Hands on Ball)', sets: '2', reps: '8–10', load: '1 med ball', tempo: '3-0-1', rest: '45s', cue: 'Both hands on the med ball for a destabilized push-up. Challenges shoulder stability and core. Regression: one hand on ball, one on floor.' },
        ],
      },
      {
        letter: 'C',
        title: 'COMPOUND STRENGTH CLUSTERS',
        introLabel: 'Cluster Format',
        intro: 'A ‘cluster’ is two exercises performed back-to-back with 15 seconds rest between them, then full rest after the pair. C1+C2 together, 15s, then 90s rest. This allows heavier loads with better quality reps than straight supersets.',
        exercises: [
          { name: 'C1  DB Deadlift (Suitcase Style)', sets: '3', reps: '5', load: 'Wk1: 80 lbs → Wk4: 100 lbs (per hand, total)', tempo: '2-1-1', rest: '15s rest then C2', cue: 'Hip hinge, one DB each side like a suitcase. Heavy — near Day 1\'s Hex Bar Deadlift load. Then 15s rest, straight into C2.' },
          { name: 'C2  DB Overhead Press', sets: '3', reps: '8', load: 'Working load', tempo: '2-1-1', rest: '90s', cue: '15 lbs/hand Wk1. Same baseline as Day 2. Full 90s rest after C2 before next cluster. The deadlift pre-fatigues the posterior chain, making the OHP pure upper.' },
          { name: 'D1  DB Goblet Squat', sets: '3', reps: '8', load: 'Wk1: 40 lbs → Wk4: 50 lbs', tempo: '3-1-1', rest: '15s rest then D2', cue: 'Heaviest goblet squat of the week — above Day 1\'s working load. Push load here. Then 15s, into D2.' },
          { name: 'D2  DB Bench Press', sets: '3', reps: '10', load: 'Working load', tempo: '3-1-1', rest: '90s', cue: '15 lbs/hand Wk1. Rest 90s after D2. Squat pre-loads the full body, making the bench a true upper test under fatigue.' },
        ],
      },
      {
        letter: 'D',
        title: 'CONDITIONING FINISHER + CORE',
        color: 'gold',
        introLabel: 'Finisher',
        intro: '5-min AMRAP (Week 1–2) or 7-min AMRAP (Week 3–4): 10 KB swings + 8 med ball slams + 8 push-ups (full or incline) + 30s elbow plank. Record total rounds. Week 4 target: 1 additional round vs Week 1 on the same AMRAP.',
        exercises: [
          { name: 'Elbow Plank Hold', sets: '3', reps: 'Baseline :45 +10s/wk', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Third plank exposure this week. All three sessions build plank time simultaneously. :45 baseline → 1:00 Wk2 → 1:10 Wk3 → 1:20 Wk4.' },
          { name: 'Dead Bug (Anti-Extension Core)', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '45s', cue: 'Lower back to floor throughout. Full extension arm and leg. Anti-extension core endurance for deadlift and carry strength.' },
          { name: 'Med Ball Rotational Hold', sets: '2', reps: '10 ea side', load: '8 lbs med ball', tempo: '2-1-2', rest: '30s', cue: 'Hold med ball extended, rotate trunk and resist. Anti-rotation core. Third exposure this week. No band needed — med ball as resistance.' },
        ],
      },
    ],
    coolDown: '10 min full-body: pigeon pose 90s each, hip flexor lunge 60s each, lat stretch 30s each, thoracic extension 60s, hamstring stretch 60s each, diaphragmatic breathing 2 min (4 counts in, hold 4, exhale 6).',
    iconsNote: 'Day 3 camera angles: side-on for all KB swings and deadlift clusters. Front-facing for med ball rotational throws so coach can see trunk rotation quality. Front-facing for push-ups and plank for spinal alignment check. Day 3 is the most technically demanding session — coach watch is most critical here.',
  },
];

const summary = {
  subtitle: 'Petra  ·  ICONS Index  ·  Strength & Muscle  ·  Virtual  ·  Flexible 3-Day',
  rows: [
    ['1', '80%', 'Lower Body — Squat, Hinge & Unilateral', 'Hex Deadlift / Goblet Squat', 'Wk1 85 lbs → Wk4 110 lbs, 4-wk target 130 lbs ×5. Left leg leads all unilateral work per force-asymmetry protocol.'],
    ['2', '70%', 'Upper Body — Push, Pull & Carry', 'DB Bench Press / DB Single-Arm Row', 'Press +2.5 lbs/hand every 2 weeks toward 22.5 lbs ×8 by Wk4. Farmer Carry +5 lbs/hand/week toward 55 lbs by Wk4; right hand trails left by 5 lbs per the grip-asymmetry protocol.'],
    ['3', '90%', 'Full Body Power — KB, Med Ball & Compound Clusters', 'KB Swing / Compound Clusters (Deadlift+OHP, Squat+Bench)', '5-min AMRAP Wk1–2 → 7-min AMRAP Wk3–4, target +1 round vs Wk1. Highest-demand session of the week — schedule a rest day after.'],
  ],
  milestones4wk: 'Virtual Training Best Practices: record each session or keep camera live; send clips of primary lifts (deadlift, OHP, Bulgarian split squat) after each session for async coach review; log load, reps, and how each set felt (easy / hard / form broke) every session. Strength & Muscle Protocol: primary lifts run 5–6 reps heavy and close to failure on the final set (1–2 RIR) while accessory work runs 8–12 reps moderate (hypertrophy-focused) — both strength and hypertrophy trained simultaneously. Week 4 targets: Hex Deadlift 105 lbs ×5, Bulgarian Split Squat 25 lbs/hand ×8, Single-Leg RDL 27.5 lbs/hand ×8, Bench/OHP 20 lbs/hand ×10, DB Single-Arm Row 37.5 lbs, Farmer Carry 55 lbs/hand, Elbow Plank 1:15, Push-Up 10–12 full reps. Day 3 test week: compare max AMRAP rounds vs Week 1.',
  milestones8wk: '8-week targets: Hex Deadlift 140–150 lbs ×5, Bench Press 27.5–30 lbs/hand ×8, Overhead Press 27.5 lbs/hand ×8, DB Single-Arm Row 50+ lbs ×8, Farmer Carry 70 lbs/hand, Bulgarian Split Squat 35 lbs/hand ×8, Elbow Plank 1:30+, Push-Up 15+ full reps unassisted. Re-test the Week 1 force assessment protocol (grip squeeze, floor pull, hip extension) around this window to confirm whether the left-grip/right-hip asymmetry pattern is closing — current gaps: grip 29.5% left, floor pull 23.8% left, hip extension (projected) 43.9% right.',
};

const data = {
  client,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'petra');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Petra_3Day_Virtual_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — same data object, filtered. None of
  // her baselineNotes are build/methodology notes (all are training-logic,
  // equipment, or force-assessment findings genuinely meant for her), so
  // none are marked internal; no `insight` fields exist in this script;
  // and no real documented PR/progress-since-last-version exists on file
  // (this is a rebuild from the original source, not an update over an
  // earlier version), so no clientHighlight is set.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Petra_3Day_Virtual_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
