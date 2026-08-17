/**
 * Nicolette Scott — ICONS 2-Day Full Gym Training Plan
 * Brace Life Studios
 *
 * NEW CLIENT — first build. No prior CLIENTS.md entry or script existed
 * before this session, so there was nothing to read first per the standing
 * "read the full existing record before any build" rule — that rule applies
 * to revisions of an EXISTING client's record, not a first-time onboarding.
 *
 * NAME NOTE: the Styku scan (8/13/2026) registers her as "Nicolette Scott."
 * Xolokan's onboarding message spelled it "Nicollete Scott" — confirmed the
 * same client. Client-facing documents use the Styku-registered spelling;
 * this is the same handling as the Rena Paul/"Ren Itch" precedent (see
 * scripts/rena_paul_2day_plan.js and CLIENTS.md).
 *
 * COMPANION DOCUMENT: an at-home/office dumbbell-only 2-day plan also exists
 * for this client — see scripts/nicolette_scott_2day_athome_plan.js. Same
 * Styku data, same asymmetry protocol (left leg leads), same age-bracket
 * reasoning; equipment differs, so exercise selection and load progression
 * differ where the studio version uses a barbell/hex bar this one does not
 * need.
 *
 * STYKU INTERPRETATION — verified against CLAUDE.md's actual thresholds,
 * not taken at face value from Styku's own dashboard labels:
 *   - ALST Index 5.52 kg/m² — Styku labels "Not At-Risk." Per CLAUDE.md's
 *     3-tier women's table (<5.5 At-Risk / 5.5-6.99 Normal-monitor / >=7.0
 *     Optimal), 5.52 correctly lands in the Normal/monitor tier, NOT
 *     At-Risk. It sits only 0.02 kg/m² above the At-Risk cutoff — stated
 *     honestly as a genuine monitoring point for her 8-week rescan, not
 *     rounded up into a false sense of security and not fabricated into an
 *     At-Risk flag either. `client.alstIndex: 5.52` correctly leaves
 *     `proteinBar()` un-triggered (only fires <5.5).
 *   - VFA (Segmental Analysis, the authoritative cm² figure): 20.1 cm².
 *     Styku's own dashboard label says "Low Risk" — per CLAUDE.md's VFA
 *     table (<70 cm² = Very Low Risk), this is corrected to "Very Low
 *     Risk," the same correction already applied to Nick's and Elizabeth
 *     Poyner's documents. The separate raw "Visceral Fat 0.2" figure on the
 *     Body Composition summary page is a different, non-cm² scale — not
 *     used or interpreted anywhere in this document.
 *   - BMI 18.6 — technically Normal (18.5-24.9) but only 0.1 above the
 *     Underweight cutoff. Noted as borderline in the Styku interpretation,
 *     NOT flagged as clinical underweight (CLAUDE.md's actual threshold is
 *     <18.5, not crossed) and NOT combined with her ALST status to fabricate
 *     a "sarcopenic obesity profile" flag — that specific flag requires
 *     BOTH BMI<18.5 AND ALST<5.5, and neither condition is met here.
 *   - Segmental: Left Arm 5.8 lbs / Right Arm 6.1 lbs — 0.3 lb gap, BELOW
 *     the 0.5 lb Asymmetry Protocol trigger. Noted, but the weaker-side-
 *     leads rule is NOT applied to arm work (Single-Arm Row, Farmers
 *     Carry). Left Leg 13.8 lbs / Right Leg 14.3 lbs — 0.5 lb gap, MEETS
 *     the trigger exactly (treated as triggering, matching the Mary
 *     Burfete/Johanna Castillo precedent for an exact-threshold gap, not
 *     waived as borderline). `weakerSide(13.8, 14.3)` → 'left' — left leg
 *     leads every unilateral leg exercise (Single-Leg RDL, DB Split Squat).
 *
 * AGE BRACKET — 35, the literal boundary between "20-35 Foundation & Peak
 * Bone Mass" and "35-45 Transition Onset." No CLAUDE.md numeric threshold
 * actually differs between these two brackets at exactly 35 (protein stays
 * at the "active women general" 1.6 g/kg tier since she is neither ALST
 * At-Risk nor 40+; creatine is "indicated," not yet "strongly indicated").
 * Applied the shared guidance directly: full volume/frequency target
 * (>=10 sets/muscle/week), no early escalation, RIR-based autoregulation.
 * `proteinTargets({alstIndex:5.52, ageYears:35, weightKg:52.2})` correctly
 * returns the flat 1.6 g/kg tier (~84g/day).
 *
 * `isPostmenopausal: false` — correctly not applicable at 35. No pelvic
 * floor callout fires anywhere in this document (verified below).
 *
 * PROGRAM LEVEL — first build, first tested battery, all tested loads sit
 * at light-to-moderate relative intensities across 5-12 rep efforts.
 * Programmed as an early-intermediate, technique-first buildout — NOT an
 * advanced/elite periodization. Epley1RM/workingLoad() used for every lift
 * with a genuine strength test; Week 1 working loads sit around 70-75% of
 * estimated 1RM, Week 4 around 88-95%, RIR-governed throughout.
 *
 * BASELINE BATTERY COMPLETENESS — the "ICONS Index Full-Spectrum
 * Progression Standard" is scoped to women 40-55 and does NOT apply to
 * Nicolette at 35 (not silently applied here). Her intake battery already
 * covers all 10 core ICONS Baseline Testing Protocol patterns regardless
 * (DB Split Squat standing in for the Lunges test) — good baseline
 * completeness on its own merits, not because the standard required it.
 * Pull-Ups (bonus 11th test) were not tested and are not fabricated.
 *
 * ANTAGONIST ROTATION RULE — applied at build time, not retrofitted. Every
 * Compound-zone block below is checked inline in its comment for no-3-
 * consecutive-same-pattern compliance.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad } = require('./icons_template');

const client = {
  name: 'Nicolette Scott',
  programTitle: '2-Day Full Gym Training Plan',
  subtitle: 'Foundational Strength & Full-Spectrum Baseline Build',
  schedule: 'Full Gym · 2 Days/Week',
  stats: ['Age 35', "5'6\"", '115 lbs', 'Full Gym · 2 Days/Week'],
  weightKg: 52.2,
  ageYears: 35,
  isPostmenopausal: false,
  bmr: 1299,
  alstIndex: 5.52,
};

const styku = {
  scanDate: '8/13/2026',
  bodyFatPct: 26.6,
  bodyFatRank: 'Fit',
  leanMass: 79.9,
  leanMassPct: 69.4,
  fatMass: 30.7,
  boneMass: 4.6,
  bmi: 18.6,
  bmr: 1299,
  vfa: 20.1,
  shapeScore: 85,
  shapeScoreLabel: 'Excellent',
  alstIndex: 5.52,
  leftArmLST: 5.8,
  rightArmLST: 6.1,
  leftLegLST: 13.8,
  rightLegLST: 14.3,
  peerComparison: 'Lower body fat than 70% of her peers.',
};

// ── Epley/working-load math, computed via the engine's own functions ──────
// Hex Bar Deadlift 45x12 (1RM ~63): Wk1 75% -> Wk4 95%
const dlRM = epley1RM(45, 12); // 63
const dlWk1 = workingLoad(dlRM, 0.75, 5); // 45
const dlWk4 = workingLoad(dlRM, 0.95, 5); // 60
// Back Squat 55x5 (1RM ~64): Wk1 75% -> Wk4 95%
const sqRM = epley1RM(55, 5); // 64
const sqWk1 = workingLoad(sqRM, 0.75, 5); // 50
const sqWk4 = workingLoad(sqRM, 0.95, 5); // 60
// DB Overhead Press 10/hand x5 (1RM ~12): Wk1 75% -> Wk4 95%
const ohpRM = epley1RM(10, 5); // 12
const ohpWk1 = workingLoad(ohpRM, 0.75, 2.5); // 10
const ohpWk4 = workingLoad(ohpRM, 0.95, 2.5); // 12.5
// Incline DB Chest Press 15/hand x5 (1RM ~18): Wk1 75% -> Wk4 95%
const inclineRM = epley1RM(15, 5); // 18
const inclineWk1 = workingLoad(inclineRM, 0.75, 2.5); // 12.5
const inclineWk4 = workingLoad(inclineRM, 0.95, 2.5); // 17.5
// Hip Thrust 65x8 (1RM ~82): Wk1 75% -> Wk4 95%
const htRM = epley1RM(65, 8); // 82
const htWk1 = workingLoad(htRM, 0.75, 5); // 60
const htWk4 = workingLoad(htRM, 0.95, 5); // 80
// Single-Leg RDL 15/hand x8 (1RM ~19): Wk1 75% -> Wk4 95%
const slrdlRM = epley1RM(15, 8); // 19
const slrdlWk1 = workingLoad(slrdlRM, 0.75, 2.5); // 15
const slrdlWk4 = workingLoad(slrdlRM, 0.95, 2.5); // 17.5

const baselineNotes = [
  {
    type: 'teal',
    label: 'Styku Findings — Interpretation & One Correction',
    audience: 'internal',
    body: `Shape Score 85/100 (Excellent). Body Fat 26.6% (Fit — lower than 70% of peers). ALST Index 5.52 kg/m² lands in the Normal/monitor tier (5.5-6.99) per CLAUDE.md's 3-tier table, NOT At-Risk — but it sits only 0.02 kg/m² above the At-Risk cutoff, close enough to flag as a genuine monitoring point for her 8-week rescan rather than a present-day clinical flag. VFA (Segmental Analysis): 20.1 cm² — Styku's own dashboard labels this "Low Risk," but per CLAUDE.md's VFA table (<70 cm²) this correctly reads Very Low Risk. (A separate raw "Visceral Fat 0.2" figure on the Body Composition summary page is a different, non-cm² scale and is not used here.) BMI 18.6 — technically Normal but only 0.1 above the Underweight cutoff; noted as borderline, not flagged as clinical underweight (that threshold is <18.5, not crossed), and not combined with her ALST reading to imply a sarcopenic-obesity profile — that specific flag requires both conditions, and neither is met.`,
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Legs Meet the Protocol Trigger, Arms Do Not',
    body: 'Left Leg LST 13.8 lbs / Right Leg LST 14.3 lbs — 0.5 lb gap, meets the Asymmetry Protocol trigger exactly. Left leg is the weaker side (lower LST) and leads every unilateral leg exercise in this program — Single-Leg RDL and DB Split Squat. Left Arm LST 5.8 lbs / Right Arm LST 6.1 lbs — 0.3 lb gap, below the 0.5 lb trigger; noted for monitoring, but the weaker-side-leads rule is NOT applied to arm work (Single-Arm Row, Farmers Carry) at this gap size.',
  },
  {
    type: 'gold',
    label: 'Age Bracket — 35, the Boundary of 20-35 and 35-45',
    audience: 'internal',
    body: 'At exactly 35, Nicolette sits on the literal boundary between "Foundation & Peak Bone Mass" and "Transition Onset." No CLAUDE.md numeric threshold actually differs between these two brackets at this exact age — protein stays at the active-women-general 1.6 g/kg tier (she is neither ALST At-Risk nor 40+), and creatine is indicated, not yet strongly indicated. This program applies the shared guidance directly: full volume/frequency target (>=10 sets/muscle/week across the week), no early escalation, RIR-based autoregulation throughout.',
  },
  {
    type: 'gold',
    label: 'Program Level — Early-Intermediate, Technique-First',
    body: 'First build, first tested battery. Every tested load sits at a light-to-moderate relative intensity across 5-12 rep efforts — this program is written as an early-intermediate, technique-first buildout, not an advanced/elite periodization. Working loads on tested lifts use Epley-estimated 1RMs: Week 1 sets start around 70-75% of estimated 1RM, Week 4 builds to roughly 90-95%. Add weight at 2 RIR + clean form; hold weight if form degrades; drop weight on missed reps, pain, or excess fatigue.',
  },
  {
    type: 'green',
    label: 'Baseline Battery — Full 10-Pattern Coverage',
    audience: 'internal',
    body: 'The "ICONS Index Full-Spectrum Progression Standard" is scoped to women 40-55 and does not apply to Nicolette at 35 (not applied here as a requirement). Her intake battery already covers all 10 core ICONS Baseline Testing Protocol patterns on its own merits — DB Split Squat stands in for the Lunges test. Pull-Ups (the bonus 11th test) were not tested and are not fabricated; introduce assisted pull-up testing once foundational pulling strength is established over the coming weeks.',
  },
  {
    type: 'gold',
    label: 'Companion At-Home/Office Program',
    body: 'A companion 2-day at-home/office dumbbell-only training plan (no barbell, hex bar, cables, or pull-up bar) is also on file for days she cannot access the studio. The same Styku findings and asymmetry protocol apply there, with equipment-appropriate exercise substitutions and equipment-capped load targets — see her At-Home 2-Day Training Plan.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'DAY A — Hinge, Press & Core Foundation',
    subtitle: 'Deadlift · Hip Thrust · Press — Strength Foundation',
    descriptor: 'PRIMARY HINGE & PRESS STRENGTH · LOADED CARRY & CORE · 50–60 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'Control precedes power: a short activation block opens the session before the two biggest hinge lifts in the program go on the bar. First build — technique wins over load every time load and form compete. Hex deadlift and hip thrust both tested cleanly; this day locks in hinge mechanics under real weight while establishing the pressing baseline. Closes with a loaded-carry-and-core finisher that doubles as the primary conditioning stimulus at 2 days/week.',
    warmUp: '6-8 min: 3 min bike or brisk walk (Zone 2). Then: bodyweight glute bridge 2x12, PVC or empty-bar hip hinge drill 2x10, cat-cow 10 slow reps, arm circles 10 each direction.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Wakes the glutes and posterior chain and locks in core bracing before any compound load goes on the bar — the neural precision this program starts every session with.',
        exercises: [
          { name: 'Glute Bridge (Bodyweight)', sets: '2', reps: '15', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Full hip extension, squeeze glutes hard at top, no low-back arch.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Shoulder height, squeeze shoulder blades together, control the return.' },
          { name: 'Dead Bug', sets: '2', reps: '10 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back pressed flat, slow opposite arm-leg reach, exhale on the reach.' },
        ],
      },
      // Compound zone. Pattern check: Hex Bar Deadlift (hinge) -> Hip Thrust
      // (hinge) -> DB Lateral Raise (shoulder isolation) = 2 hinge + 1
      // different pattern. No 3rd hinge stacked. Compliant.
      {
        letter: 'B',
        title: 'PRIMARY HINGE STRENGTH',
        introLabel: 'Load Target',
        intro: `Hex Bar Deadlift tested at 45 lbs x12 (Epley 1RM ~${dlRM} lbs) and Hip Thrust at 65 lbs x8 (Epley 1RM ~${htRM} lbs) — both are strong first-session numbers. Week 1 trains at roughly 70-75% of estimated 1RM to lock in hip hinge mechanics before adding weight; Week 4 builds toward 90-95%.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '3', reps: '6–8', load: `Wk1: ${dlWk1} lbs → Wk4: ${dlWk4} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Hinge hips back to grip, drive floor away, hips and shoulders rise together.' },
          { name: 'Hip Thrust (Barbell or Loaded DB, Bench-Supported)', sets: '3', reps: '8', load: `Wk1: ${htWk1} lbs → Wk4: ${htWk4} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, drive hips to full extension, squeeze glutes at top.' },
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
        intro: `Seated overhead press (10 lbs/hand x5, Epley 1RM ~${ohpRM} lbs) and incline chest press (15 lbs/hand x5, Epley 1RM ~${inclineRM} lbs) both tested clean. Single-Leg RDL closes the block — left leg leads every set (weaker side per the segmental scan above).`,
        exercises: [
          { name: 'DB Overhead Press (Seated)', sets: '3', reps: '8', load: `Wk1: ${ohpWk1} lbs/hand → Wk4: ${ohpWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'Back supported, spine neutral. Press overhead, arms alongside ears.' },
          { name: 'Incline DB Chest Press (30–45°)', sets: '3', reps: '8', load: `Wk1: ${inclineWk1} lbs/hand → Wk4: ${inclineWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: '30–45° incline, full range, control the descent, no bench arch.' },
          { name: 'Single-Leg RDL (DB)', sets: '3', reps: '8 ea, LEFT leads', load: `Wk1: ${slrdlWk1} lbs/hand → Wk4: ${slrdlWk4} lbs/hand`, tempo: '3-1-1', rest: '75s', cue: 'Left leads (weaker side). Slight knee bend, hinge from hip, reach floor.' },
        ],
      },
      {
        letter: 'D',
        title: 'LOADED CARRY, CORE & CONDITIONING',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Farmer carry and plank close the session and double as the primary cardiovascular stimulus at 2 days/week. Carry with both hands evenly — arm asymmetry (0.3 lb gap) sits below the 0.5 lb protocol trigger, so no side-lead is applied to carry or row work.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '3', reps: '25–30 yds', load: 'Wk1: 20 lbs/hand → Wk4: 25 lbs/hand', tempo: 'Controlled', rest: '75s', cue: 'Shoulders packed, chest tall, neutral neck. Carry evenly, both hands.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: '1:00–1:10', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline 1:36. Hold at 1:00-1:10 in training — quality over max time.' },
          { name: 'Pallof Press (Anti-Rotation)', sets: '2', reps: '10 ea side', load: 'Light band', tempo: '2-2-1', rest: '45s', cue: 'Press straight out from chest, resist the band pulling you into rotation.' },
          { name: 'Stationary Bike or Rower — Zone 2', sets: '1', reps: '10 min', load: 'Conversational pace', tempo: 'Steady', rest: '—', cue: 'Easy, steady effort. Minimum weekly cardiovascular dose, session close.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 45s each. Doorway chest stretch 30s each. Cat-cow 8 slow reps. Thoracic extension over foam roller 45s.',
    iconsNote: 'Muscle is the medicine — every set of hinge and press work here is a hormonal reset as much as a strength builder. Log load and RIR every set this first month; it becomes the numeric record everything else in this program tracks against.',
  },
  {
    intensity: 80,
    title: 'DAY B — Squat, Lunge & Pull Strength',
    subtitle: 'Squat · Split Squat · Row — Lower Body & Pulling Strength',
    descriptor: 'PRIMARY SQUAT & PULL STRENGTH · PUSH-UP PROGRESSION · 50–60 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Strength builds confidence: this day pairs squat/lunge loading with direct pulling strength, then closes on the push-up progression tested at intake. Technique proven in Day A carries forward here at a real primary-strength intensity — last 1-2 reps hard but achievable, never grinding.',
    warmUp: '6-8 min: 3 min bike or treadmill walk (Zone 2). Then: bodyweight glute bridge 2x12, bodyweight squat-to-stand 2x8, band pull-apart 2x15, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Primes the hip abductors and thoracic spine ahead of squat and lunge loading — general movement-quality preparation, not a dedicated corrective circuit (no elevated-risk ACL/knee-valgus finding is on file for Nicolette specifically).',
        exercises: [
          { name: 'Standing Hip Abduction (Bodyweight)', sets: '2', reps: '12 ea side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Hips level, no torso lean, controlled tempo both directions.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Shoulder height, squeeze shoulder blades, control the return.' },
          { name: 'Thoracic Rotation (Quadruped)', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: 'Controlled', rest: '30s', cue: 'Hand behind head, rotate from the mid-back, hips stay still.' },
        ],
      },
      // Compound zone. Pattern check: Back Squat (squat) -> DB Split Squat
      // (squat/lunge, left leads) -> Cable Face Pull (horizontal pull) =
      // 2 squat/lunge + 1 different pattern. No 3rd squat/lunge stacked.
      // Compliant.
      {
        letter: 'B',
        title: 'PRIMARY SQUAT & LUNGE STRENGTH',
        introLabel: 'Load Target',
        intro: `Back Squat tested at 55 lbs x5 (Epley 1RM ~${sqRM} lbs). DB Split Squat is the lunge-pattern substitute from her intake battery — left leg leads (weaker side). Face Pull closes the block, balancing the pressing volume from Day A.`,
        exercises: [
          { name: 'Back Squat (Barbell)', sets: '3', reps: '6', load: `Wk1: ${sqWk1} lbs → Wk4: ${sqWk4} lbs`, tempo: '3-1-1', rest: '90s', cue: 'Brace before descent, chest tall, drive floor away through mid-foot.' },
          { name: 'DB Split Squat', sets: '3', reps: '8 ea, LEFT leads', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-1', rest: '75s', cue: 'Left leads (weaker side). Front knee tracks over toes, even tempo.' },
          { name: 'Cable or Band Face Pull', sets: '3', reps: '15', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows at ear height, external rotation at end range.' },
        ],
      },
      // Compound zone. Pattern check: Single-Arm DB Row (pull) -> Bent-Over
      // DB Row (pull) -> Standing DB Push Press (push) = 2 pull + 1
      // different pattern. No 3rd pull stacked. Compliant.
      {
        letter: 'C',
        title: 'PRIMARY PULL STRENGTH',
        introLabel: 'Load Target',
        intro: 'Row was not part of the tested 10-pattern battery — today\'s working loads become the new 8-week baseline for both rows, tracked the same as every tested lift. No side-lead is applied to Single-Arm Row (arm asymmetry sits below the 0.5 lb trigger).',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '8 ea side', load: 'Wk1: 15 lbs → Wk4: 20 lbs', tempo: '3-1-2', rest: '60s', cue: 'Bench-supported, flat back, drive elbow to hip, full stretch at bottom.' },
          { name: 'Bent-Over DB Row (Both Arms)', sets: '3', reps: '10', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-2', rest: '60s', cue: 'Hip hinge, flat back, pull both DBs to lower ribs.' },
          { name: 'Standing DB Push Press', sets: '3', reps: '8', load: 'Wk1: 10 lbs/hand → Wk4: 12.5 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'Slight knee dip, drive up and press overhead in one motion.' },
        ],
      },
      {
        letter: 'D',
        title: 'PUSH-UP PROGRESSION & METABOLIC FINISHER',
        color: 'green',
        introLabel: 'Baseline',
        intro: '10 reps on an incline is a solid bridge point toward full floor push-ups. Side plank varies the core stimulus from Day A\'s front plank; the finisher is a brief conditioning close, same role as Day A\'s bike/rower block.',
        exercises: [
          { name: 'Incline Push-Up (Hands Elevated)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Baseline 10 reps. Hands on bench, full chest to bench, controlled descent.' },
          { name: 'Side Plank', sets: '2', reps: '30s ea side', load: 'Bodyweight', tempo: '—', rest: '45s', cue: 'Hips stacked, no sag, straight line shoulder to ankle.' },
          { name: 'Rowing Machine or Bike — Zone 2', sets: '1', reps: '10 min', load: 'Conversational pace', tempo: 'Steady', rest: '—', cue: 'Easy, steady effort. Session close, same dose as Day A.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 8 slow reps. Doorway chest stretch 30s each. Hip flexor lunge 45s each.',
    iconsNote: 'Strength builds confidence — every set here proves the technique from Day A translates to real load. Track push-up rep count and plank hold time weekly alongside the lift numbers; both are core baseline metrics.',
  },
];

const baselines = [
  ['Hex Bar Deadlift', `45 lbs x12 (Epley 1RM ~${dlRM} lbs)`, '12 RM', `Wk1: ${dlWk1} lbs x6-8 → Wk4: ${dlWk4} lbs x6-8.`],
  ['Back Squat', `55 lbs x5 (Epley 1RM ~${sqRM} lbs)`, '5 RM', `Wk1: ${sqWk1} lbs x6 → Wk4: ${sqWk4} lbs x6.`],
  ['Seated DB Overhead Press', `10 lbs/hand x5 (Epley 1RM ~${ohpRM} lbs/hand)`, '5 RM', `Wk1: ${ohpWk1} lbs/hand x8 → Wk4: ${ohpWk4} lbs/hand x8.`],
  ['Incline DB Chest Press', `15 lbs/hand x5 (Epley 1RM ~${inclineRM} lbs/hand)`, '5 RM', `Wk1: ${inclineWk1} lbs/hand x8 → Wk4: ${inclineWk4} lbs/hand x8.`],
  ['Incline Push-Ups', '10 reps (max)', 'Max', 'Wk1: 10-12 reps x3 sets → Wk4: 12-15 reps, begin floor attempts.'],
  ['DB Farmers Carry', '20 lbs/hand (reference load)', 'Working', 'Wk1: 20 lbs/hand x3, 25-30 yds → Wk4: 25 lbs/hand. No side-lead (arm gap below trigger).'],
  ['Hip Thrust', `65 lbs x8 (Epley 1RM ~${htRM} lbs)`, '8 RM', `Wk1: ${htWk1} lbs x8 → Wk4: ${htWk4} lbs x8.`],
  ['Single-Leg RDL', `15 lbs/hand x8 (Epley 1RM ~${slrdlRM} lbs)`, '8 RM', `Wk1: ${slrdlWk1} lbs/hand x8 ea → Wk4: ${slrdlWk4} lbs/hand x8 ea. LEFT leads (weaker leg).`],
  ['DB Split Squat (Lunge Substitute)', '15 lbs/hand (reference load)', 'Working', 'Wk1: 12.5 lbs/hand x8 ea → Wk4: 17.5 lbs/hand x8 ea. LEFT leads (weaker leg).'],
  ['Plank Hold', '1:36 (max)', 'Max', 'Wk1: hold 1:00-1:10 x2-3 → Wk4: 1:30-1:45, loaded option once bodyweight is clean.'],
  ['Pull-Up (Bonus)', 'Not Tested', '—', 'Not part of the 10 core baseline patterns. Introduce assisted pull-up testing once foundational pulling strength is established.'],
];

const summary = {
  subtitle: 'Nicolette Scott  ·  ICONS Index  ·  Foundational Strength Build  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['Wk 1', '—', 'Day A & B', `Hex DL ${dlWk1} lbs / Back Squat ${sqWk1} lbs / Hip Thrust ${htWk1} lbs`, 'Establish all working loads at technique-first intensity. Push-up: 10-12 incline reps. Plank: 1:00-1:10.'],
    ['Wk 2', '—', 'Day A & B', 'Hex DL +5 / Back Squat +5 / Hip Thrust +5', 'Add load only at 2 RIR + clean form. Push-up: begin full-floor attempts. Plank: 1:15-1:20.'],
    ['Wk 3', '—', 'Day A & B', 'Hex DL +5 / Back Squat +5 / Hip Thrust +5', 'Loads approach 85-90% of estimated 1RM. Push-up: 4-6 full floor reps. Plank: 1:20-1:30.'],
    ['Wk 4', '—', 'Day A & B', `Hex DL ${dlWk4} lbs / Back Squat ${sqWk4} lbs / Hip Thrust ${htWk4} lbs`, 'Peak week loads (~90-95% estimated 1RM). Push-up: 6-8 full unassisted. Plank: 1:30-1:45.'],
  ],
  milestones4wk: `All tested lifts progressed on schedule: Hex DL ${dlWk4} lbs, Back Squat ${sqWk4} lbs, Hip Thrust ${htWk4} lbs, OHP ${ohpWk4} lbs/hand, Incline Press ${inclineWk4} lbs/hand, Single-Leg RDL ${slrdlWk4} lbs/hand. Push-up: 6-8 full floor reps. Plank: 1:30-1:45.`,
  milestones8wk: 'Re-test the full 10-pattern battery and establish new 1RM/working-baseline numbers via epley1RM()/workingLoad(). Introduce assisted pull-up testing (bonus 11th pattern) if pulling strength supports it. Reassess whether DB Split Squat or a true barbell/loaded lunge better fills the lunge-pattern slot going forward.',
  rescanNote: 'Styku rescan recommended at 8 weeks — ALST Index (currently 5.52, close to the At-Risk boundary) is the top metric to watch; also track BMI (currently 18.6, only 0.1 above the Underweight cutoff — watch it doesn\'t drop further as training volume increases), Shape Score (currently 85, Excellent — maintain), and the leg segmental gap (currently 0.5 lbs, right at the asymmetry trigger — should reduce with left-led unilateral programming).',
};

const data = {
  client,
  styku,
  baselines,
  baselinesTargetHeader: 'TRAINING LOAD · 4-WEEK TARGET',
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

// Client View (added 8/17/2026): no `clientHighlight` set — this is a
// first-build client with no prior version/PR on record to compare against,
// so per CLAUDE.md's Client View spec ("never fabricate one") nothing is
// invented here. 3 baselineNotes are internal-only (Styku Findings —
// Interpretation & One Correction, Age Bracket boundary reasoning, Baseline
// Battery Full-Spectrum-Standard scoping note) — all three explicitly name
// CLAUDE.md/internal standards or correct Styku's own dashboard label, which
// reads as audit/documentation content, not a client message. No `insight`
// or `flag` fields exist anywhere in this script, so no exercise-level
// filtering was needed.
async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'nicolette_scott');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Nicolette_Scott_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Nicolette_Scott_2Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
