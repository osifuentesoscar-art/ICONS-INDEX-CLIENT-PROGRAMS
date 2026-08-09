/**
 * Aimee — ICONS 2-Day Full Gym Training Plan
 * Brace Life Studios
 *
 * Rebuilt from the client's existing document (Aimee 2-Day Full Gym Training
 * Plan .docx) to match the confirmed engine standard (Kelly Mulroy reference
 * — see CLAUDE.md's "Visual language" note). All program content, loads,
 * and clinical flags are carried over 1:1 from the source; only rendering
 * changed.
 *
 * No age/height/weight is given anywhere in the source document, so no
 * weightKg/ageYears/alstIndex/isPostmenopausal is set on the client object —
 * fabricating any of these would produce an unsupported protein target or
 * an unsupported pelvic-floor trigger. includeNutritionBlock is explicitly
 * set to false for the same reason (no weightKg → no defensible protein
 * target). proteinBar() and pelvicFloorCallout() both no-op automatically
 * since client.alstIndex and client.isPostmenopausal are both undefined.
 *
 * Day A ("Hinge + Push + Core") and Day B ("Squat + Pull + Conditioning")
 * are not naturally 60/70/80/90/AR intensity days — this is a 2-day/week,
 * 4-week-progression program, not a %-graded weekly split. Day A is
 * rendered with intensity: 'AR' and Day B with intensity: 70 purely to
 * reproduce the source's exact day-badge ACCENT COLORS via the engine's
 * ivOf()/INTENSITY map (Day A → blue EAF4FB/1565C0, Day B → green
 * E8F5E9/43A047 — confirmed against the source table shading). The badge
 * TEXT is overridden per day via dayHeader()'s badgeOverride param (now
 * day.badge in the schema) to 'A'/'DAY' and 'B'/'DAY' instead of the
 * borrowed "ACTIVE RECOV."/"70%" labels, which don't describe either day
 * (Day A is a heavy hinge/press strength day, not recovery) — matching the
 * source, whose own Day A/B badge cells are blank color swatches with no
 * text at all. day.intensityLabel is also set to a day-specific phrase
 * ("Day A's Purpose" / "Day B's Purpose") for the same reason.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Aimee',
  programTitle: '2-Day Full Gym Training Plan',
  subtitle: 'Fat Loss · Body Composition · Cardiovascular Health',
  schedule: 'Full Gym · 2 Days/Week',
  stats: ['2 Days / Week', 'Full Gym', 'Fat Loss & Body Comp', 'Spinal Stenosis Considerations'],
};

const baselineNotes = [
  {
    type: 'clinical',
    label: 'Spinal Stenosis — Confirmed Diagnosis',
    body: 'Aimee has a confirmed diagnosis of slight spinal stenosis. This means the spinal canal is slightly narrowed, which can create nerve irritation under certain loading conditions — particularly: heavy axial spinal compression (e.g. barbell back squat, heavy barbell deadlift), extreme lumbar flexion under load, and sustained lumbar extension positions. This program avoids all of these. The hex bar deadlift is used instead of a conventional barbell (it reduces shear forces on the lumbar spine). All pressing is dumbbell-based. No behind-the-neck movements. If Aimee experiences radiating pain, numbness, or tingling in the legs during any exercise, stop immediately and do not return to that movement without physician clearance.',
  },
  {
    type: 'watch',
    label: 'Hip Hinge Pattern — Underdeveloped',
    body: 'The hip hinge pattern is underdeveloped, which is clinically significant given the spinal stenosis. Poor hip hinge = spine compensates under load. Every session begins with hip hinge rehearsal drills before any loaded hinge work. The goal is to make the hip hinge reflexive over 8 weeks so the spine is never the path of least resistance during pulling and deadlift movements.',
  },
  {
    type: 'purple',
    label: 'Pull-Up Priority — Baseline 5 Reps, All Grips',
    body: 'Aimee tested at 5 reps each in neutral, wide, and standard grip — this is a solid assisted baseline. The program runs pull-up progression systematically, tracking all three grips. Neutral grip is the safest for spinal stenosis (least shoulder internal rotation and lat compression through the spine). Standard and wide grips progress alongside.',
  },
  {
    type: 'gold',
    label: 'Cardiovascular Priority — Built Into Every Session',
    body: 'Cardiovascular health improvement is built into every session via metabolic finishers and conditioning circuits. Day A ends with a Zone 2 or HIIT cardio finisher. Day B ends with a metabolic strength circuit. At 2 days per week, the cardio within each session is the primary cardiovascular training stimulus for fat loss. Rest periods on accessory work are kept short (30–45s) to maintain heart rate.',
  },
  {
    type: 'clinical',
    label: 'Barbell Back Squat — Tested, Not Programmed',
    body: 'A barbell back squat was tested at 55 lbs. This is recorded in the baselines table for reference only — it is not programmed as a working exercise. The confirmed spinal stenosis restriction against barbell back squats (axial spinal compression) remains in place. DB Split Squat and Goblet Squat continue as the primary lower-body lifts. If Aimee has since received physician clearance for barbell squatting, flag this so the restriction and program can be formally updated.',
  },
  {
    type: 'clinical',
    label: 'Spinal Stenosis — Movements Removed or Modified',
    body: 'Movements removed or modified for spinal stenosis: No barbell back squat (axial compression). No conventional barbell deadlift (replaced with hex bar). No behind-the-neck press or pulldown. No heavy good mornings. No lumbar flexion under load (sit-ups, crunches). All core work is anti-flexion or anti-extension (plank, dead bug, Pallof press). If any exercise produces radiating pain or numbness — stop and flag immediately.',
  },
  {
    type: 'red',
    label: 'Avoid — Spine-Unsafe',
    body: 'Barbell back squat (axial load); conventional barbell deadlift; behind-the-neck press or pulldown; sit-ups, crunches, or any flexion under load; heavy good mornings; any exercise producing radiating leg pain.',
  },
  {
    type: 'green',
    label: 'Safe — Spine-Appropriate',
    body: 'Hex bar deadlift (reduced spinal shear); DB / KB loading (no axial bar load); anti-extension core — plank, dead bug; anti-rotation core — Pallof press; chest-supported rows (no lumbar load); single-leg RDL (hip hinge, controlled).',
  },
];

const days = [
  {
    intensity: 'AR',
    badge: { label: 'A', sub: 'DAY' },
    title: 'DAY A — Hinge + Push + Core',
    subtitle: 'Deadlift · Press · Carry — Strength Emphasis & Hip Hinge Development',
    descriptor: 'STRENGTH EMPHASIS · HIP HINGE DEVELOPMENT · CARDIOVASCULAR FINISHER · 55–65 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'Hinge, press, and loaded carry work built around hip hinge development and spinal-stenosis-safe loading. Hex bar deadlift replaces the conventional barbell; all pressing is dumbbell-based. The day closes with a Zone 2 or HIIT cardio finisher — the primary cardiovascular training stimulus in this 2-day/week program.',
    warmUp: '10 min: 5 min stationary bike or treadmill walk (Zone 2 — cardiovascular warm-in). Then hip hinge rehearsal: PVC or broomstick hip hinge drill 2×10 (spine neutral, hinge from hips not back), glute bridge 2×15, dead bug 2×8 each side (spine decompression before loading), cat-cow 10 slow reps, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'HIP HINGE CORRECTIVE (BEFORE EVERY DEADLIFT SET)',
        color: 'red',
        introLabel: 'Hip Hinge Cue',
        intro: 'Hip hinge needs improvement. This means Aimee is currently bending from the lumbar spine rather than hinging from the hip joint. Under load, this puts direct stress on the stenosis. These drills run before every deadlift set until the hinge is reflexive. Hip hinge cue: push the hips BACK toward the wall behind you, not down toward the floor.',
        exercises: [
          { name: 'PVC Hip Hinge Drill (Wall Touch)', sets: '2', reps: '10', load: 'Bodyweight / PVC', tempo: '3-2-1', rest: '30s', cue: 'Stand 1 foot from wall. PVC along spine (3 contact points: head, mid-back, tailbone). Hinge hips back to touch wall. If any contact point breaks, the hinge is wrong. This is the single most important corrective in the plan.' },
          { name: 'Kettlebell Deadhinge (Hip Hinge Pattern)', sets: '2', reps: '8', load: '20–25 lbs KB', tempo: '3-1-1', rest: '30s', cue: 'KB between feet. Hinge back to grip, drive hips forward to lockout. Not a squat — if knees track over toes, the pattern is wrong. Groove the hinge before loading the hex bar.' },
          { name: 'Single-Leg Hip Hinge (Bodyweight)', sets: '2', reps: '8 ea', load: 'Bodyweight', tempo: '3-1-1', rest: '30s', cue: 'One leg, hinge from the hip, reach toward the floor. Develops hip hinge on each side independently. Left and right equal sets.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY HINGE STRENGTH',
        introLabel: 'Deadlift Baseline — 105 lbs ×3RM',
        intro: 'Week 1 backs down to 95 lbs ×4×4. The 3RM baseline means technique may be under pressure at higher loads. Given the spinal stenosis, form is the absolute priority over load. Hip hinge corrective runs before every set. Add 5 lbs per week when all sets complete with clean hip hinge mechanics. Hex bar only — no conventional barbell. Hip thrust is new this block — hip-dominant and fully spine-safe, it reinforces the hip hinge pattern without any axial load.',
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '4–6', load: 'Wk1: 95 lbs → Wk4: 120 lbs', tempo: '2-1-1', rest: '90s', cue: 'Hex bar reduces lumbar shear vs conventional deadlift — appropriate for spinal stenosis. Stand centered. Hinge hips back to grip handles. Drive floor away. Hips and shoulders rise together. Lockout at top. Hip hinge drill before each set.' },
          { name: 'Hip Thrust (Barbell or Loaded DB, Bench-Supported)', sets: '4', reps: '5―6', load: 'Wk1: 80 lbs → Wk4: 105 lbs', tempo: '2-1-2', rest: '90s', cue: 'New baseline 95 lbs. Upper back on bench, drive hips to full extension, squeeze glutes hard at top. Hip-dominant — no axial spinal load, one of the safest heavy-loading options for spinal stenosis.' },
          { name: 'Single-Leg RDL (DB)', sets: '3+3', reps: '8―10 ea', load: 'Wk1: 22.5 lbs → Wk4: 30 lbs', tempo: '3-1-1', rest: '75s', cue: 'Updated baseline 25 lbs ×8. Slight knee bend, hinge from hip, feel hamstring load. Return by squeezing glute. Left and right equal. The most effective hip hinge developer in this plan — single-leg removes the compensation that two-leg hinging allows.' },
          { name: 'Romanian Deadlift (DB)', sets: '3', reps: '10', load: '25–30 lbs / hand', tempo: '3-1-1', rest: '60s', cue: 'Hip hinge, soft knee, full hamstring stretch at bottom. DBs track close to legs. Builds hip hinge volume after the hex bar primary work. Keep spine long throughout — no rounding.' },
        ],
      },
      {
        letter: 'C',
        title: 'PRIMARY PRESS STRENGTH',
        introLabel: 'Spinal Stenosis Note',
        intro: 'All pressing is dumbbell-based — no barbell overhead press. Dumbbells allow the spine to remain in a more neutral position and reduce axial load vs a barbell. Seated overhead press is preferred for spinal stenosis (supported lumbar spine). Flat bench press is new this block — fully supine, no axial load. Avoid pressing to absolute failure — brace fails first.',
        exercises: [
          { name: 'DB Overhead Press (Seated)', sets: '4', reps: '10', load: 'Wk1: 15 lbs/hand → Wk4: 20 lbs', tempo: '2-1-1', rest: '75s', cue: 'Updated baseline 17.5 lbs ×5RM. Wk1 starts at 15 lbs for 10 reps. Seated: back supported, spine neutral. Press overhead, arms alongside ears. Core braced throughout. Add 2.5 lbs every 2 weeks.' },
          { name: 'Incline DB Press (30–45°)', sets: '4', reps: '10―12', load: 'Wk1: 15 lbs/hand → Wk4: 20 lbs', tempo: '3-1-1', rest: '75s', cue: 'Updated baseline 15 lbs ×8 reps. Primary chest movement. 30–45° incline. Elbows at 45°. Full range, squeeze at top. Safe for spinal stenosis — no axial load.' },
          { name: 'DB Flat Bench Press', sets: '3', reps: '10', load: 'Wk1: 20 lbs/hand → Wk4: 25 lbs', tempo: '2-1-1', rest: '75s', cue: 'New baseline 20 lbs ×5RM. Fully supine, full back support — one of the safest presses for spinal stenosis. Full range, control the descent, drive up without arching off the bench.' },
          { name: 'DB Lateral Raise', sets: '3', reps: '12―15', load: '8―10 lbs', tempo: '2-1-2', rest: '30s', cue: 'Lateral delt. Arms slightly bent. Raise to shoulder height. 1-second hold at top. Slow 2-second lower. Short rest maintains heart rate for fat loss.' },
        ],
      },
      {
        letter: 'D',
        title: 'LOADED CARRY + CORE',
        introLabel: 'Farmer Carry & Spinal Stenosis',
        intro: 'Loaded carries are safe and beneficial for spinal stenosis when performed with neutral spine and shoulders packed. The carry builds deep spinal stabilizer strength (multifidus, QL) which directly supports the stenotic segments. Avoid carrying so heavy that the spine laterally flexes or the shoulder hikes. Start at 35 lbs/hand and feel the position first.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '4', reps: '25–30 yds', load: 'Wk1: 35 lbs/hand → +5 lbs/2wks', tempo: 'Controlled', rest: '90s', cue: 'Baseline 35 lbs/hand. Shoulders packed, chest tall, neutral neck. Add 5 lbs every 2 weeks. Stop if spine begins to laterally flex or shoulder hikes. These are the form cues that matter most.' },
          { name: 'Suitcase Carry (Single Arm)', sets: '3', reps: '20 yds ea', load: '25―30 lbs', tempo: 'Controlled', rest: '60s', cue: 'One arm. Resist lateral lean — anti-lateral flexion core. Keep spine perfectly vertical. Alternate starting arm each set.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: ':50', load: 'Bodyweight', tempo: '—', rest: '90s', cue: 'Updated baseline :55. Hold at :50 in training — quality over max time. Full brace, neutral spine. Builds to 1:05 in Wk2, 1:15 in Wk4. SAFE for stenosis: anti-extension, no spinal flexion under load.' },
          { name: 'Dead Bug', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '45s', cue: 'Lower back pressed FIRMLY into the floor throughout — this is therapeutic for stenosis (gentle lumbar flexion in non-loaded position). Slow opposite arm and leg extension. The best safe core exercise for this clinical presentation.' },
        ],
      },
      {
        letter: 'E',
        title: 'CARDIOVASCULAR FINISHER (CHOOSE ONE)',
        introLabel: 'Cardio Protocol — Choose One',
        intro: 'At 2 days per week, cardiovascular improvement depends heavily on the quality of conditioning work done within each session. Every Day A ends with one of these finishers. They are not optional. This is the primary fat loss and cardiovascular adaptation mechanism in the program.',
        exercises: [
          { name: 'Treadmill — Zone 2 Walk/Jog', sets: '1', reps: '15–20 min', load: '60–65% max HR', tempo: 'Steady', rest: '—', cue: 'Brisk walk or light jog at conversational pace. Full sentences throughout. Builds aerobic base. Best option on high-fatigue days. Minimum cardiovascular dose for fat loss adaptation.' },
          { name: 'Treadmill — Incline Intervals', sets: '8–10', reps: '30s on / 60s easy', load: 'Incline 8–12%', tempo: 'Alternating', rest: '30s', cue: '30 seconds at steep incline (brisk walk), 60 seconds flat easy walk. Elevates HR without running impact. Spine-appropriate — no jarring. Excellent cardiovascular fat-burn tool.' },
          { name: 'Stationary Bike — HIIT', sets: '8', reps: '20s hard / 40s easy', load: 'High resistance', tempo: 'Hard then easy', rest: '40s', cue: 'Cycling is zero spinal impact. 20 seconds maximum effort, 40 seconds easy spin. 8 rounds total. Heart rate should peak at 80–85% then recover partially. Best HIIT option for spinal stenosis.' },
        ],
      },
    ],
    coolDown: "Hip flexor lunge 60s each (unloads lumbar after hinge work). Supine knee-to-chest 30s each (gentle lumbar decompression — safe for stenosis). Pigeon pose 60s each. Hamstring stretch 60s each. Thoracic extension over foam roller 60s.",
    iconsNote: 'If Aimee experiences any of the following at any point: radiating pain down either leg, numbness or tingling in the feet or toes, significant increase in lower back pain after a session — pause that movement, note it, and flag it before the next session. Do not attempt to train through radiating neurological symptoms. These are signals from the stenosis and require physician review before continuing.',
  },
  {
    intensity: 70,
    badge: { label: 'B', sub: 'DAY' },
    title: 'DAY B — Squat + Pull + Conditioning',
    subtitle: 'Split Squat · Row · Pull-Up — Pulling Strength & Pull-Up Progression',
    descriptor: 'PULLING STRENGTH · PULL-UP PROGRESSION · METABOLIC CONDITIONING · 55–65 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Squat, pull, and pull-up progression work using DB/KB-only lower-body loading (no barbell back squat) and a metabolic conditioning circuit that doubles as the day\'s cardiovascular stimulus. Neutral-grip pull-up leads every session as the safest grip for spinal stenosis.',
    warmUp: '10 min: 5 min bike or treadmill walk (Zone 2 cardiovascular warm-in). Then: glute bridge 2×15, hip hinge rehearsal 2×10 (runs every session), goblet squat 2×10 light (30 lbs, depth focus), cat-cow 10, dead hang 20 seconds (shoulder decompression), band pull-aparts or arm circles 2×15.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY SQUAT STRENGTH',
        introLabel: 'Spinal Stenosis Note',
        intro: 'No barbell back squat. DB split squat and goblet squat are the primary lower body movements on Day B. Both allow the spine to remain in a safe, upright position without axial barbell load. The split squat 3RM baseline (35 lbs/hand) suggests form may be under pressure at max load — Week 1 trains at 25 lbs for 8 reps with full depth focus.',
        exercises: [
          { name: 'DB Split Squat (Front Foot Elevated)', sets: '3+3', reps: '8―10 ea', load: 'Wk1: 25 lbs/hand → Wk4: 35 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Baseline 35 lbs ×3RM. Start at 25 lbs for 8 quality reps with full depth. Front foot elevated 2–4 inches increases range of motion. Front knee tracks over second toe. Left leg leads first. Add 2.5 lbs every 2 weeks.' },
          { name: 'Goblet Squat (DB or KB)', sets: '4', reps: '10―12', load: '30–40 lbs', tempo: '3-1-1', rest: '75s', cue: 'DB held at chest. Full depth, chest tall. Elbows inside knees at bottom. Knees track out over toes. Builds the bilateral squat pattern safely without axial spine load. Progress load every 2 weeks.' },
          { name: 'Step-Up (Unilateral, DB)', sets: '3+3', reps: '8 ea', load: '12.5―17.5 lbs/hand', tempo: '2-1-1', rest: '60s', cue: '18–20 inch box. Drive through front heel, full hip extension at top. Left leg leads. Unilateral lower body volume without spine compression. Excellent glute and quad developer.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PULL STRENGTH + PULL-UP PROGRESSION',
        introLabel: 'Pull-Up Baseline — 5 Reps Each Grip (Assisted)',
        intro: 'Neutral grip is the safest for spinal stenosis — least internal rotation and least lat tension through the lumbar spine at end range. Neutral grip leads in every session. All three grips trained every session for comprehensive lat and upper back development. Progress: +1 rep per grip every 2 weeks.',
        exercises: [
          { name: 'Assisted Pull-Up — Neutral Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'LEADS every session — safest grip for spinal stenosis. Full hang at bottom. Chin over bar at top. Controlled 3-second descent. Neural grip (palms facing each other). Add 1 rep every 2 weeks.' },
          { name: 'Assisted Pull-Up — Standard Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'Standard overhand grip, shoulder-width. Same quality as neutral grip. 3-second descent. Second grip in the rotation.' },
          { name: 'Assisted Pull-Up — Wide Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '75s', cue: 'Wide overhand grip. Hardest of the three. Greatest lat stretch at bottom. Full range — do not partial rep. 3-second descent. If reps drop below 4, reduce to 4 and hold there until strength catches up.' },
          { name: 'Chest-Supported DB Row', sets: '4', reps: '10', load: 'Wk1: 22.5 lbs → Wk4: 30 lbs', tempo: '3-1-2', rest: '60s', cue: 'Baseline 25 lbs ×5RM. Chest on incline bench — removes ALL lumbar load. Most spine-safe rowing variation available. Drive elbow to hip. Full stretch at bottom. This is the preferred row for spinal stenosis.' },
          { name: 'Face Pull (Cable)', sets: '3', reps: '15―20', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows at ear height, external rotation at end range. Rear delt and rotator cuff health. Balances the pressing volume from Day A. Non-negotiable for shoulder health.' },
        ],
      },
      {
        letter: 'C',
        title: 'PUSH-UP PROGRESSION',
        color: 'green',
        introLabel: 'Push-Up Baseline — 7 Reps Incline (Hands Elevated)',
        intro: 'Aimee has already progressed past the knee push-up stage to incline push-ups at 7 reps. Week 1 continues building incline volume while beginning the first full floor attempts. Week 3: target 6–8 full push-ups. Week 4: 8–10 full unassisted. Push-ups are safe for spinal stenosis when the core is braced and spine remains neutral.',
        exercises: [
          { name: 'Incline Push-Up (Hands Elevated)', sets: '3', reps: '8―10', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Updated baseline 7 reps. Hands on bench or box. Full chest to bench level. Controlled descent. Progress by lowering the incline height each week. Bridges the gap to floor push-ups.' },
          { name: 'Full Push-Up (Floor Attempt)', sets: '3', reps: 'Max (target 3–5)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Attempt full push-ups. Stop 2 reps before form breaks. Record reps every set every session. Target: 8–10 full reps by Week 4. Neutral spine throughout — no sag or pike.' },
          { name: 'Tricep Dip (Bench)', sets: '3', reps: '10―12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Hands on bench behind body. Lower until elbows reach 90°, drive back up. Complements pressing volume. Builds tricep strength for push-up progression.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC CONDITIONING CIRCUIT — 3 ROUNDS',
        color: 'gold',
        introLabel: 'Cardio Protocol',
        intro: "Day B's cardiovascular work is a metabolic circuit rather than dedicated cardio. This provides the strength-plus-conditioning stimulus that is most effective for fat loss and body composition at 2 days per week. The circuit uses movements Aimee has already done in the session at sub-maximal loads to maintain quality under fatigue. After 3 circuit rounds: 10-minute cardiovascular finisher — choose stationary bike easy spin, treadmill Zone 2 walk, or rowing machine easy pace. This is active recovery from the circuit while maintaining elevated heart rate for continued fat oxidation. Spine-safe — no impact.",
        exercises: [
          { name: 'Goblet Squat (Light, Continuous)', sets: '3 rounds', reps: '15', load: '25―30 lbs', tempo: '2-0-1', rest: '15s then next', cue: 'Sub-maximal load, continuous reps. Focus is metabolic — keep moving. Into the next exercise immediately after 15 seconds.' },
          { name: 'DB Row (Both Arms, Bent Over)', sets: '3 rounds', reps: '12', load: '20―25 lbs', tempo: '2-1-2', rest: '15s then next', cue: 'Hip hinge, pull both DBs to ribs. Lighter than Day B primary row. Metabolic pull volume. Into the next exercise.' },
          { name: 'Push-Up (Max or Incline)', sets: '3 rounds', reps: 'Max', load: 'Bodyweight', tempo: '3-0-1', rest: '15s then next', cue: 'Full or incline — whatever allows quality reps. Stop 1 rep before form breaks.' },
          { name: 'Plank Hold', sets: '3 rounds', reps: '45–60s', load: 'Bodyweight', tempo: '—', rest: '90s rest', cue: 'Full brace. Rest 90 seconds after plank then begin next round. 3 full rounds of the complete circuit. Record how many rounds complete with good form each week.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each (lumbar decompression — most important cool-down for stenosis). Cat-cow 10 slow reps. Doorway chest stretch 30s each. Lat stretch 30s each. Hip flexor lunge 60s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'If Aimee experiences any of the following at any point: radiating pain down either leg, numbness or tingling in the feet or toes, significant increase in lower back pain after a session — pause that movement, note it, and flag it before the next session. Do not attempt to train through radiating neurological symptoms. These are signals from the stenosis and require physician review before continuing.',
  },
];

const baselines = [
  ['Hex Deadlift', '105 lbs', '3 RM', 'Wk1: 95 lbs ×4×4 (hip hinge form first) → Wk4: 120 lbs ×4. Spine-safe: hex bar only, no conventional barbell.'],
  ['Hip Thrust', '95 lbs', '5 RM (est.)', 'New baseline. Wk1: 80 lbs ×6 → Wk4: 105 lbs ×5–6. Hip-dominant, no axial spinal load — ideal for spinal stenosis.'],
  ['Single-Leg RDL', '25 lbs / hand', '8 reps', 'Wk1: 22.5 lbs ×10 → Wk4: 30 lbs ×8. Left and right equal sets. Most important hip hinge developer.'],
  ['DB Split Squat', '35 lbs / hand', '3 RM', 'Wk1: 25 lbs ×8 (form + depth focus at lower load) → Wk4: 35 lbs ×8. 3RM suggests form may break at max — train sub-max.'],
  ['Barbell Back Squat', '55 lbs', 'Tested — Not Programmed', 'Recorded for reference only. Per confirmed spinal stenosis restriction, barbell back squat is not programmed — DB Split Squat and Goblet Squat remain the primary lower-body lifts (see clinical note below).'],
  ['Overhead Press', '17.5 lbs / hand', '5 RM', 'Wk1: 15 lbs ×10 (sub-max) → Wk4: 20 lbs ×8. Spine-safe: seated or standing, no barbell.'],
  ['Incline DB Press', '15 lbs / hand', '8 reps', 'Wk1: 15 lbs ×10 → Wk4: 20 lbs ×8. Primary chest movement.'],
  ['DB Flat Bench Press', '20 lbs / hand', '5 RM (est.)', 'New baseline. Wk1: 20 lbs ×10 → Wk4: 25 lbs ×8. Supine bench position is fully spine-safe — full back support, no axial load.'],
  ['Dumbbell Row', '25 lbs', '5 RM', 'Wk1: 22.5 lbs ×10 → Wk4: 30 lbs ×8. Chest-supported row preferred (no lumbar load).'],
  ['Farmer Carry', '35 lbs / hand', 'Working', 'Wk1: 35 lbs ×4 sets → +5 lbs/hand every 2 weeks → Wk4: 45 lbs/hand.'],
  ['Push-Up', '7 incline', 'Max', 'Advanced past the knee push-up stage. Wk1: 8–10 incline reps + 3–5 full floor attempts → Wk4: 8–10 full floor push-ups unassisted.'],
  ['Plank (Elbow)', ':55', 'Max', 'Wk1: hold at :50 (controlled) → Wk4 target 1:15. Wk8: 1:30.'],
  ['Assisted Pull-Up (all grips)', '5 reps each', 'Neutral / Wide / Standard', 'Wk1: all 3 grips ×5. Wk2: ×6. Wk4: ×8. Neutral grip leads (most spine-safe).'],
];

// Lightweight 4-week progression summary, grounded only in the numbers
// already established in the baselines table above (no Styku scan exists
// for this client, so no rescan-tracking metrics are fabricated).
const summary = {
  subtitle: 'Aimee  ·  ICONS Index  ·  Fat Loss & Body Composition  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['Wk 1', '—', 'Day A & B', 'Hex DL 95 lbs ×4×4 / Hip Thrust 80 lbs ×5–6 / Split Squat 25 lbs ×8', 'Establish updated baselines. Hip hinge drill every set. Push-up: 3–5 full floor reps off a 7-rep incline base. Plank: :50. Cardio: 15 min Zone 2.'],
    ['Wk 2', '—', 'Day A & B', 'Hex DL 100 lbs ×4×4 / Hip Thrust 90 lbs ×5–6 / Split Squat 27.5 lbs ×8', 'Pull-up: 6 reps all grips. Push-up: 5–6 full floor reps. Hip hinge should feel more natural. Plank: 1:00.'],
    ['Wk 3', '—', 'Day A & B', 'Hex DL 105 lbs ×4×4 / Hip Thrust 95–100 lbs ×5–6 / Split Squat 30 lbs ×8', 'Hex DL and Hip Thrust back to tested baseline, treated as working weight. Push-up: 6–8 full reps. Plank: 1:10. Cardiovascular endurance noticeably improved.'],
    ['Wk 4', '—', 'Day A & B', 'Hex DL 120 lbs ×4×4 / Hip Thrust 105 lbs ×5–6 / Split Squat 32.5 lbs ×8', 'All updated baseline lifts surpassed. Push-up: 8–10 full unassisted. Plank: 1:15. Hip hinge: clean and reflexive. Reassess pull-up assist level.'],
  ],
  milestones4wk: 'All updated baseline lifts surpassed. Push-up: 8–10 full unassisted. Plank: 1:15. Hip hinge: clean and reflexive. Reassess pull-up assist level.',
  milestones8wk: 'Strength: Hex DL 130+ lbs ×4. Hip Thrust 115+ lbs ×5–6. OHP 22.5 lbs/hand ×8. Incline 22.5 lbs/hand ×8. Flat Press 27.5 lbs/hand ×8. Row 32.5 lbs ×8. Split Squat 37.5 lbs/hand ×8. Goblet 45 lbs ×10. SL-RDL 32.5 lbs/hand. Carry 50 lbs/hand. Push-up 12 full unassisted. Pull-up 8 reps all grips. Plank 1:30. Cardiovascular: Day A cardio finisher extends to 20–25 min Zone 2 or 10 rounds of incline intervals; Day B metabolic circuit completes 3 rounds faster than Week 1 at the same loads; resting heart rate should be noticeably lower. Re-test barbell back squat only if physician clearance has been obtained.',
  rescanNote: 'No Styku scan is on file for this client — reassess at 8 weeks via baseline lift retest, pull-up assist-level reduction, and resting heart rate trend rather than a body-composition rescan.',
};

const data = {
  client,
  baselines,
  baselinesTargetHeader: 'TRAINING LOAD · 4-WEEK TARGET',
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'aimee');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Aimee_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
