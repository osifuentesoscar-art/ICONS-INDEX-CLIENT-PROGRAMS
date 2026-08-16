/**
 * Nicolette Scott — ICONS 2-Day At-Home/Office Training Plan
 * Brace Life Studios
 *
 * COMPANION DOCUMENT to scripts/nicolette_scott_2day_plan.js (the full-gym
 * version) — same client, same Styku scan (8/13/2026), same clinical
 * findings, same asymmetry protocol. See that script's header comment for
 * the full Styku-interpretation reasoning (ALST/VFA/BMI corrections, the
 * name-alias note) — not repeated verbatim here; only equipment-driven
 * differences are re-derived below.
 *
 * EQUIPMENT ASSUMPTION — stated explicitly and prominently in-document
 * (first baselineNote, a goldCallout) per this system's convention of
 * disclosing assumptions rather than burying them: dumbbells only, a
 * reasonable range up to roughly 25-30 lb pairs (sized off her tested loads,
 * which topped out at 20 lbs/hand), plus a bench or sturdy elevated surface.
 * NO barbell, NO hex bar, NO cable machine, NO pull-up bar. Every exercise
 * below is written for that setup. If her actual home/office equipment
 * differs, this document should be revised before use.
 *
 * SUBSTITUTIONS FROM THE STUDIO VERSION:
 *   Hex Bar Deadlift  -> DB Romanian Deadlift (double DB)
 *   Back Squat        -> DB Goblet Squat (single DB)
 *   Hip Thrust         -> DB Hip Thrust (bench-supported, double DB)
 *   Cable/Band Face Pull -> DB Reverse Fly (bent-over)
 * Everything already DB-based in the studio version (OHP, Incline Press,
 * Farmers Carry, Single-Leg RDL, DB Split Squat, Single-Arm Row, Bent-Over
 * Row, Push-Ups, Plank) carries over unchanged in exercise selection; only
 * the DB-capped load progression differs where noted.
 *
 * EQUIPMENT-CAPPED LOADS: several lifts here are naturally lighter than
 * their studio barbell/hex-bar counterparts because a dumbbell-pair ceiling
 * (~25-30 lbs/hand assumed) caps total load well below what a barbell
 * allows — most visible on the Hip Thrust substitute (studio version
 * reaches 80 lbs total by Week 4; the double-DB version here caps around
 * 55-60 lbs total). This is flagged explicitly in baselineNotes and the
 * Block B intro rather than left for the reader to notice — it is an
 * equipment ceiling, not a program deficiency, and progressing to the
 * studio version or heavier dumbbells is the natural next step once
 * equipment becomes the limiting factor rather than strength.
 *
 * STYKU BLOCK — NOT rendered in full here (no `data.styku` object). The
 * complete Styku table with every segmental figure lives in the companion
 * full-gym document; this document carries a condensed teal cross-reference
 * summary instead so the clinical facts are still stated here, without
 * duplicating the full table across two documents for the same scan.
 *
 * ANTAGONIST ROTATION RULE — applied at build time, mirroring the studio
 * version's block structure and pattern sequencing so both documents stay
 * internally consistent. Compliance checked inline per block below.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad } = require('./icons_template');

const client = {
  name: 'Nicolette Scott',
  programTitle: '2-Day At-Home/Office Training Plan',
  subtitle: 'Dumbbell-Only Foundational Strength Build',
  schedule: 'At-Home/Office · Dumbbell-Only · 2 Days/Week',
  stats: ['Age 35', "5'6\"", '115 lbs', 'At-Home/Office · Dumbbell-Only · 2 Days/Week'],
  weightKg: 52.2,
  ageYears: 35,
  isPostmenopausal: false,
  bmr: 1299,
  alstIndex: 5.52,
};

// Loads shared/consistent with the studio version wherever the exercise is
// already DB-based (OHP, Incline Press, Single-Leg RDL, Split Squat).
const ohpRM = epley1RM(10, 5); // 12
const ohpWk1 = workingLoad(ohpRM, 0.75, 2.5); // 10
const ohpWk4 = workingLoad(ohpRM, 0.95, 2.5); // 12.5
const inclineRM = epley1RM(15, 5); // 18
const inclineWk1 = workingLoad(inclineRM, 0.75, 2.5); // 12.5
const inclineWk4 = workingLoad(inclineRM, 0.95, 2.5); // 17.5
const slrdlRM = epley1RM(15, 8); // 19
const slrdlWk1 = workingLoad(slrdlRM, 0.75, 2.5); // 15
const slrdlWk4 = workingLoad(slrdlRM, 0.95, 2.5); // 17.5

const baselineNotes = [
  {
    type: 'gold',
    label: 'Equipment Assumption — Please Confirm',
    body: 'This home/office program assumes a genuinely basic setup: dumbbells only, a reasonable range up to roughly 25-30 lb pairs (sized off Nicolette\'s tested loads, which topped out at 20 lbs/hand), plus a bench or sturdy elevated surface. No barbell, no hex bar, no cable machine, no pull-up bar. Every exercise below is written for that equipment — flag to your coach right away if her actual home/office setup differs (more equipment, less, or different), so loads and exercise selection can be corrected before she trains from this document.',
  },
  {
    type: 'teal',
    label: 'Styku Summary — Full Scan Detail Lives in the Full-Gym Document',
    body: 'ALST Index 5.52 kg/m² — Normal/monitor tier per CLAUDE.md\'s 3-tier table (NOT At-Risk), but only 0.02 kg/m² above the At-Risk cutoff — a genuine monitoring point for her 8-week rescan. VFA (Segmental Analysis) 20.1 cm² — Very Low Risk (correcting Styku\'s own "Low Risk" dashboard label; the separate raw "Visceral Fat 0.2" figure elsewhere on her scan is a different, non-cm² scale and is not used). BMI 18.6 — technically Normal, only 0.1 above the Underweight cutoff, noted as borderline and not flagged clinically. The complete Styku table (body fat, lean mass, bone mass, Shape Score, full segmental LST) lives in her companion 2-Day Full Gym Training Plan — the clinical facts and asymmetry protocol below apply identically here.',
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Legs Meet the Protocol Trigger, Arms Do Not',
    body: 'Left Leg LST 13.8 lbs / Right Leg LST 14.3 lbs — 0.5 lb gap, meets the Asymmetry Protocol trigger exactly. Left leg is the weaker side and leads every unilateral leg exercise in this program — Single-Leg RDL and DB Split Squat, same as the full-gym version. Left Arm LST 5.8 lbs / Right Arm LST 6.1 lbs — 0.3 lb gap, below the 0.5 lb trigger; noted, but the weaker-side-leads rule is NOT applied to arm work (Single-Arm Row, Farmers Carry).',
  },
  {
    type: 'gold',
    label: 'Age Bracket & Program Level',
    body: 'At 35 — the literal boundary of the 20-35 and 35-45 brackets — no CLAUDE.md numeric threshold actually differs at this exact age, so the shared guidance applies directly: protein stays at the active-women-general 1.6 g/kg tier, creatine is indicated (not yet strongly indicated), full volume/frequency target, RIR-based autoregulation. This is a first build for a first-time-tested, early-intermediate client — technique-first, not advanced/elite periodization, same posture as the full-gym version.',
  },
  {
    type: 'gold',
    label: 'Equipment-Driven Load Differences vs. the Full-Gym Program',
    body: 'DB-based substitutes for barbell/hex-bar lifts are naturally lighter than their studio counterparts, and several will hit a practical dumbbell-pair ceiling (~25-30 lbs/hand assumed) by Week 4 rather than a strength ceiling — most visible on the Hip Thrust substitute below, which caps well under the studio version\'s Week 4 target. That is an equipment limit, not a program deficiency. When she can access the studio, or if her home equipment grows past this range, progressing to the Full Gym Training Plan (or simply adding heavier dumbbells) is the natural next step — flag this at her next check-in.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'DAY A — Hinge, Press & Core Foundation',
    subtitle: 'DB Romanian Deadlift · DB Hip Thrust · Press — Strength Foundation',
    descriptor: 'PRIMARY HINGE & PRESS STRENGTH · LOADED CARRY & CORE · DUMBBELL-ONLY · 50–60 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'Control precedes power: a short activation block opens the session before the two biggest hinge lifts go on the dumbbells. Technique wins over load every time the two compete — especially true here, where dumbbell hinge patterns demand more grip and stabilizer control than the equivalent barbell/hex-bar lift. Closes with a loaded-carry-and-core finisher that doubles as the primary conditioning stimulus at 2 days/week.',
    warmUp: '6-8 min: brisk walk or stair climb (Zone 2). Then: bodyweight glute bridge 2x12, bodyweight hip hinge drill 2x10 (hands on hips, hinge to a wall behind), cat-cow 10 slow reps, arm circles 10 each direction.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Wakes the glutes and posterior chain and locks in core bracing before any compound load goes on the dumbbells — no equipment needed, same as the full-gym version\'s opening block.',
        exercises: [
          { name: 'Glute Bridge (Bodyweight)', sets: '2', reps: '15', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Full hip extension, squeeze glutes hard at top, no low-back arch.' },
          { name: 'Prone Y-T-W Raise', sets: '2', reps: '10 each', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Face down on floor or bench, lift arms in Y then T then W shapes.' },
          { name: 'Dead Bug', sets: '2', reps: '10 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back pressed flat, slow opposite arm-leg reach, exhale on the reach.' },
        ],
      },
      // Compound zone. Pattern check: DB Romanian Deadlift (hinge) -> DB
      // Hip Thrust (hinge) -> DB Lateral Raise (shoulder isolation) = 2
      // hinge + 1 different pattern. No 3rd hinge stacked. Compliant.
      {
        letter: 'B',
        title: 'PRIMARY HINGE STRENGTH — DB SUBSTITUTES',
        introLabel: 'Load Target',
        intro: 'DB Romanian Deadlift replaces Hex Bar Deadlift; DB Hip Thrust (bench-supported, double dumbbell across the hips) replaces the barbell version. Both are naturally lighter than their studio counterparts — the Hip Thrust in particular caps around 55-60 lbs total by Week 4 here versus 80 lbs total in the studio program, an equipment ceiling, not a strength ceiling.',
        exercises: [
          { name: 'DB Romanian Deadlift (Double DB)', sets: '3', reps: '6–8', load: 'Wk1: 20 lbs/hand → Wk4: 27.5–30 lbs/hand', tempo: '2-1-1', rest: '90s', cue: 'Hinge from hip, DBs stay close to legs, feel hamstring load, stand tall.' },
          { name: 'DB Hip Thrust (Bench-Supported)', sets: '3', reps: '8', load: 'Wk1: 20 lbs/hand → Wk4: 27.5–30 lbs/hand (double DB)', tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, DBs rest on hip crease, full extension at top.' },
          { name: 'DB Lateral Raise', sets: '3', reps: '12–15', load: '5–8 lbs', tempo: '2-1-2', rest: '30s', cue: 'Lateral delt. Arms slightly bent, raise to shoulder height, slow lower.' },
        ],
      },
      // Compound zone. Pattern check: DB Overhead Press (vertical push) ->
      // Incline DB Chest Press (horizontal push) -> Single-Leg RDL (hinge)
      // = 2 push + 1 different pattern. No 3rd push stacked. Compliant.
      {
        letter: 'C',
        title: 'PRIMARY PRESS STRENGTH',
        introLabel: 'Load Target',
        intro: `Same DB-based lifts as the full-gym version — no equipment substitution needed here. Seated overhead press (Epley 1RM ~${ohpRM} lbs/hand) and incline chest press (Epley 1RM ~${inclineRM} lbs/hand) both tested clean. Single-Leg RDL closes the block — left leg leads (weaker side).`,
        exercises: [
          { name: 'DB Overhead Press (Seated)', sets: '3', reps: '8', load: `Wk1: ${ohpWk1} lbs/hand → Wk4: ${ohpWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'Chair or bench with back support, spine neutral, press overhead.' },
          { name: 'Incline DB Chest Press (Bench)', sets: '3', reps: '8', load: `Wk1: ${inclineWk1} lbs/hand → Wk4: ${inclineWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'Bench at 30-45°, full range, control the descent, no bench arch.' },
          { name: 'Single-Leg RDL (DB)', sets: '3', reps: '8 ea, LEFT leads', load: `Wk1: ${slrdlWk1} lbs/hand → Wk4: ${slrdlWk4} lbs/hand`, tempo: '3-1-1', rest: '75s', cue: 'Left leads (weaker side). Slight knee bend, hinge from hip, reach floor.' },
        ],
      },
      // Metabolic zone (less strict per CLAUDE.md, but checked anyway).
      // Pattern: Farmer Carry (carry) -> Plank (core) -> Suitcase Carry
      // (carry) -> conditioning finisher (cardio) — 2 carry, not 3
      // consecutive, split by Plank in between. Compliant.
      {
        letter: 'D',
        title: 'LOADED CARRY, CORE & CONDITIONING',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Farmer carry and suitcase carry double as the primary cardiovascular stimulus at 2 days/week — a hallway, driveway, or office corridor is enough space. Carry with both hands evenly on the Farmer Carry; arm asymmetry (0.3 lb gap) sits below the 0.5 lb protocol trigger, so no side-lead is applied there.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '3', reps: '25–30 yds', load: 'Wk1: 20 lbs/hand → Wk4: 25 lbs/hand', tempo: 'Controlled', rest: '75s', cue: 'Shoulders packed, chest tall, neutral neck. Carry evenly, both hands.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: '1:00–1:10', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline 1:36. Hold at 1:00-1:10 in training — quality over max time.' },
          { name: 'Suitcase Carry (Single-Side, DB)', sets: '2+2', reps: '20–25 yds ea', load: 'Wk1: 15 lbs → Wk4: 20 lbs', tempo: 'Controlled', rest: '60s', cue: 'Resist lateral lean, tall posture, brace hard on the loaded side.' },
          { name: 'Stair Climb or Brisk Walk — Zone 2', sets: '1', reps: '10 min', load: 'Conversational pace', tempo: 'Steady', rest: '—', cue: 'Easy, steady effort. Minimum weekly cardiovascular dose, session close.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 45s each. Doorway chest stretch 30s each. Cat-cow 8 slow reps. Thoracic extension over a rolled towel 45s.',
    iconsNote: 'Muscle is the medicine — every set of hinge and press work here is a hormonal reset as much as a strength builder. Log load and RIR every set this first month; it becomes the numeric record everything else in this program tracks against.',
  },
  {
    intensity: 80,
    title: 'DAY B — Squat, Lunge & Pull Strength',
    subtitle: 'DB Goblet Squat · DB Split Squat · Row — Lower Body & Pulling Strength',
    descriptor: 'PRIMARY SQUAT & PULL STRENGTH · PUSH-UP PROGRESSION · DUMBBELL-ONLY · 50–60 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Strength builds confidence: this day pairs squat/lunge loading with direct pulling strength, then closes on the push-up progression tested at intake. Same primary-strength intensity as the studio version — last 1-2 reps hard but achievable, never grinding.',
    warmUp: '6-8 min: brisk walk or stair climb (Zone 2). Then: bodyweight glute bridge 2x12, bodyweight squat-to-stand 2x8, prone Y-T-W raise 2x10, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Primes the hip abductors and thoracic spine ahead of squat and lunge loading — general movement-quality preparation, no equipment needed.',
        exercises: [
          { name: 'Standing Hip Abduction (Bodyweight)', sets: '2', reps: '12 ea side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Hips level, no torso lean, controlled tempo both directions.' },
          { name: 'Clamshell (Bodyweight or Light Band)', sets: '2', reps: '12 ea side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Side-lying, knees bent, lift top knee, keep hips stacked and still.' },
          { name: 'Thoracic Rotation (Quadruped)', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: 'Controlled', rest: '30s', cue: 'Hand behind head, rotate from the mid-back, hips stay still.' },
        ],
      },
      // Compound zone. Pattern check: DB Goblet Squat (squat) -> DB Split
      // Squat (squat/lunge, left leads) -> DB Reverse Fly (horizontal pull)
      // = 2 squat/lunge + 1 different pattern. No 3rd squat/lunge stacked.
      // Compliant.
      {
        letter: 'B',
        title: 'PRIMARY SQUAT & LUNGE STRENGTH — DB SUBSTITUTES',
        introLabel: 'Load Target',
        intro: 'DB Goblet Squat (single DB, held at chest) replaces Back Squat — naturally lighter than a barbell back squat by design, an equipment difference, not a regression. DB Split Squat is unchanged from the studio version (already DB-based) — left leg leads. DB Reverse Fly closes the block, replacing the cable/band Face Pull.',
        exercises: [
          { name: 'DB Goblet Squat', sets: '3', reps: '8', load: 'Wk1: 20 lbs → Wk4: 27.5–30 lbs', tempo: '3-1-1', rest: '90s', cue: 'DB held at chest, full depth, chest tall, elbows inside knees at bottom.' },
          { name: 'DB Split Squat', sets: '3', reps: '8 ea, LEFT leads', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-1', rest: '75s', cue: 'Left leads (weaker side). Front knee tracks over toes, even tempo.' },
          { name: 'DB Reverse Fly (Bent-Over)', sets: '3', reps: '15', load: '5–8 lbs/hand', tempo: '2-1-2', rest: '30s', cue: 'Hinge forward, soft knees, raise arms out to sides, squeeze shoulder blades.' },
        ],
      },
      // Compound zone. Pattern check: Single-Arm DB Row (pull) -> Bent-Over
      // DB Row (pull) -> Standing DB Push Press (push) = 2 pull + 1
      // different pattern. No 3rd pull stacked. Compliant.
      {
        letter: 'C',
        title: 'PRIMARY PULL STRENGTH',
        introLabel: 'Load Target',
        intro: 'Row was not part of the tested 10-pattern battery — today\'s working loads become the new 8-week baseline for both rows, tracked the same as every tested lift. No side-lead is applied to Single-Arm Row (arm asymmetry sits below the 0.5 lb trigger). Same exercises and loads as the studio version — no equipment substitution needed here.',
        exercises: [
          { name: 'Single-Arm DB Row (Bench-Supported)', sets: '3', reps: '8 ea side', load: 'Wk1: 15 lbs → Wk4: 20 lbs', tempo: '3-1-2', rest: '60s', cue: 'One hand and knee on bench, flat back, drive elbow to hip.' },
          { name: 'Bent-Over DB Row (Both Arms)', sets: '3', reps: '10', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-2', rest: '60s', cue: 'Hip hinge, flat back, pull both DBs to lower ribs.' },
          { name: 'Standing DB Push Press', sets: '3', reps: '8', load: 'Wk1: 10 lbs/hand → Wk4: 12.5 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'Slight knee dip, drive up and press overhead in one motion.' },
        ],
      },
      {
        letter: 'D',
        title: 'PUSH-UP PROGRESSION & METABOLIC FINISHER',
        color: 'green',
        introLabel: 'Baseline',
        intro: '10 reps on an incline (hands on a bench or sturdy chair) is a solid bridge point toward full floor push-ups. Side plank varies the core stimulus from Day A\'s front plank; the finisher is a brief conditioning close, same role as Day A\'s stair climb.',
        exercises: [
          { name: 'Incline Push-Up (Hands on Bench/Chair)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Baseline 10 reps. Full chest to hand level, controlled descent.' },
          { name: 'Side Plank', sets: '2', reps: '30s ea side', load: 'Bodyweight', tempo: '—', rest: '45s', cue: 'Hips stacked, no sag, straight line shoulder to ankle.' },
          { name: 'Stair Climb, Jump Rope, or Brisk Walk — Zone 2', sets: '1', reps: '10 min', load: 'Conversational pace', tempo: 'Steady', rest: '—', cue: 'Easy, steady effort. Session close, same dose as Day A.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 8 slow reps. Doorway chest stretch 30s each. Hip flexor lunge 45s each.',
    iconsNote: 'Strength builds confidence — every set here proves the technique from Day A translates to real load, even with a lighter home setup. Track push-up rep count and plank hold time weekly alongside the lift numbers; both are core baseline metrics.',
  },
];

const baselines = [
  ['Hex Bar Deadlift → DB Romanian Deadlift', '45 lbs x12 (studio test — hex bar)', '12 RM', 'Wk1: 20 lbs/hand → Wk4: 27.5-30 lbs/hand (double DB). Equipment-capped vs. studio version.'],
  ['Back Squat → DB Goblet Squat', '55 lbs x5 (studio test — barbell)', '5 RM', 'Wk1: 20 lbs → Wk4: 27.5-30 lbs (single DB). Equipment-capped vs. studio version.'],
  ['Seated DB Overhead Press', `10 lbs/hand x5 (Epley 1RM ~${ohpRM} lbs/hand)`, '5 RM', `Wk1: ${ohpWk1} lbs/hand x8 → Wk4: ${ohpWk4} lbs/hand x8. Same as studio version — already DB-based.`],
  ['Incline DB Chest Press', `15 lbs/hand x5 (Epley 1RM ~${inclineRM} lbs/hand)`, '5 RM', `Wk1: ${inclineWk1} lbs/hand x8 → Wk4: ${inclineWk4} lbs/hand x8. Same as studio version — already DB-based.`],
  ['Incline Push-Ups', '10 reps (max)', 'Max', 'Wk1: 10-12 reps x3 sets → Wk4: 12-15 reps, begin floor attempts. Same as studio version.'],
  ['DB Farmers Carry', '20 lbs/hand (reference load)', 'Working', 'Wk1: 20 lbs/hand x3, 25-30 yds → Wk4: 25 lbs/hand. No side-lead (arm gap below trigger).'],
  ['Hip Thrust → DB Hip Thrust', '65 lbs x8 (studio test — barbell)', '8 RM', 'Wk1: 20 lbs/hand → Wk4: 27.5-30 lbs/hand (double DB, ~55-60 lbs total). Meaningfully equipment-capped vs. the studio version\'s 80 lbs total by Wk4.'],
  ['Single-Leg RDL', `15 lbs/hand x8 (Epley 1RM ~${slrdlRM} lbs)`, '8 RM', `Wk1: ${slrdlWk1} lbs/hand x8 ea → Wk4: ${slrdlWk4} lbs/hand x8 ea. LEFT leads (weaker leg). Same as studio version.`],
  ['DB Split Squat (Lunge Substitute)', '15 lbs/hand (reference load)', 'Working', 'Wk1: 12.5 lbs/hand x8 ea → Wk4: 17.5 lbs/hand x8 ea. LEFT leads (weaker leg). Same as studio version.'],
  ['Plank Hold', '1:36 (max)', 'Max', 'Wk1: hold 1:00-1:10 x2-3 → Wk4: 1:30-1:45. Same as studio version.'],
  ['Pull-Up (Bonus)', 'Not Tested', '—', 'Not part of the 10 core baseline patterns, and not programmable at home (no pull-up bar assumed). Test at the studio once foundational pulling strength is established.'],
];

const summary = {
  subtitle: 'Nicolette Scott  ·  ICONS Index  ·  Foundational Strength Build  ·  2 Days/Week  ·  At-Home/Office · Dumbbell-Only',
  rows: [
    ['Wk 1', '—', 'Day A & B', 'DB RDL 20 lbs/hand / Goblet Squat 20 lbs / DB Hip Thrust 20 lbs/hand', 'Establish all working loads at technique-first intensity. Push-up: 10-12 incline reps. Plank: 1:00-1:10.'],
    ['Wk 2', '—', 'Day A & B', 'Add 2.5-5 lbs where form is clean at 2 RIR', 'Add load only at 2 RIR + clean form. Push-up: begin full-floor attempts. Plank: 1:15-1:20.'],
    ['Wk 3', '—', 'Day A & B', 'Approach equipment-capped ceiling on Hip Thrust/Goblet Squat/RDL', 'Loads on DB-only lifts begin approaching the practical dumbbell-pair ceiling. Push-up: 4-6 full floor reps. Plank: 1:20-1:30.'],
    ['Wk 4', '—', 'Day A & B', 'DB RDL 27.5-30 lbs/hand / Goblet Squat 27.5-30 lbs / DB Hip Thrust 27.5-30 lbs/hand', 'Peak week within equipment limits. Push-up: 6-8 full unassisted. Plank: 1:30-1:45.'],
  ],
  milestones4wk: 'All lifts progressed on schedule within equipment limits. Push-up: 6-8 full floor reps. Plank: 1:30-1:45. Flag at check-in whether any DB-only lift (especially Hip Thrust) has hit its equipment ceiling before Week 4.',
  milestones8wk: 'Re-test the full 10-pattern battery in whichever setting (home or studio) she trains in most. If home equipment has not grown past the ~25-30 lb pair range, recommend a studio session or heavier dumbbells specifically for Hip Thrust and Goblet Squat, which are the two most equipment-capped lifts in this document.',
  rescanNote: 'Styku rescan recommended at 8 weeks — see the full-gym document for the complete rescan tracking list (ALST, Shape Score, leg segmental gap). Identical here; not restated in full to avoid duplicating the same tracking note across both documents.',
};

const data = {
  client,
  baselines,
  baselinesTargetHeader: 'AT-HOME EQUIVALENT · 4-WEEK TARGET',
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'nicolette_scott');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Nicolette_Scott_2Day_AtHome_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
