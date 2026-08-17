/**
 * Rena Paul — ICONS 2-Day Full Gym Training Plan
 * Brace Life Studios
 *
 * New client. Built from a Styku scan (8/8/2026) and an 11-exercise ICONS
 * baseline battery (all tested same session, includes bonus pull-up test).
 *
 * NAME NOTE: the Styku scan PDF identifies the client as "Ren Itch"
 * (email renitchka@gmail.com) — confirmed by the trainer to be the same
 * client, also on file under that name. Client-facing documents use
 * "Rena Paul"; see CLIENTS.md for the cross-reference.
 *
 * isPostmenopausal is left false/unset — no menopausal status was stated
 * by the trainer. At 45 she sits in the 45-55 "Perimenopause / Menopause
 * Transition" age bracket, but perimenopausal status itself is not
 * confirmed, so it is not fabricated here. weightKg/ageYears/alstIndex
 * are all from the scan. NOTE (corrected 8/17/2026, per CLAUDE.md's
 * "Protein Targets — re-keyed from age to context" correction): the prior
 * age-banded reading of this client as an automatic "40+ tier" 1.8-2.0 g/kg
 * escalation is retired — her ALST (5.94 kg/m²) is within normal reference
 * range, not At-Risk, and nothing on file documents a genuine energy
 * deficit or heavy training load, so per the corrected standard her
 * protein target is context-driven, not age-driven. proteinTargets() in
 * icons_template.js has not yet been updated to this corrected logic (see
 * CLAUDE.md's Research Update Log, 8/17/2026 pass) — the rendered nutrition
 * block below still reflects the prior formula pending that engine fix;
 * the language in this script has been corrected so it no longer asserts
 * the retired age-tier as the reason. Creatine remains strongly indicated
 * by age 40+ regardless (age-based creatine guidance is unaffected by
 * this fix).
 *
 * Segmental asymmetry: arms 0.1 lb gap, legs 0.4 lb gap — both under the
 * 0.5 lb asymmetry-protocol threshold, so no unilateral-lead requirement;
 * noted as monitor-only in baselineNotes (legs closer to the threshold).
 *
 * Baseline battery is strong across the board (85 lb Hex Deadlift x5, 85 lb
 * Hip Thrust x5, 2:00 plank, 5 reps/grip on assisted pull-ups) — program
 * starts her at meaningful loads per the "never under-load" principle
 * rather than conservatively.
 *
 * REVISION (8/13/2026, icons-roster-analyst cross-check) — GOBLET SQUAT LOAD
 * FORMAT FIXED: Goblet Squat (Day B, Block A) — her only squat-pattern
 * movement — was loaded as a flat "30-40 lbs" while every other tested lift
 * in this document uses the Wk1->Wk4 progression format. Checked: this was
 * a genuine formatting gap, not an intentional flat-load choice — Back
 * Squat/Goblet Squat was never part of her tested 11-exercise battery (the
 * baselines table below has no squat-pattern row at all; Single-Arm Row
 * fills its slot in the standard ICONS 11), so there was no tested number
 * to build a Wk1->Wk4 ramp from, and no baseline row existed to say so.
 * Fixed the same way Johanna Castillo's and Johnna Macarthur's previously-
 * untested Squat/Deadlift lifts are handled: today's working load becomes
 * the new 8-week baseline, documented as such in the baselines table and
 * the Block A intro, and the exercise's load field now uses the same
 * Wk1->Wk4 format as the rest of the document.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Rena Paul',
  programTitle: '2-Day Full Gym Training Plan',
  subtitle: 'Strength, Bone Density & Hormonal Resilience Foundation',
  schedule: 'Full Gym · 2 Days/Week',
  stats: ['Age 45', "5'3\"", '116 lbs', 'Full Gym · 2 Days/Week'],
  weightKg: 52.6,
  ageYears: 45,
  isPostmenopausal: false,
  bmr: 1233,
  alstIndex: 5.94,
};

const styku = {
  scanDate: '8/8/2026',
  bodyFatPct: 27.0,
  bodyFatRank: 'Fit',
  leanMass: 80.1,
  leanMassPct: 69.3,
  fatMass: 31.2,
  boneMass: 4.3,
  bmi: 20.5,
  bmr: 1233,
  vfa: 26.3,
  shapeScore: 92,
  shapeScoreLabel: 'Excellent',
  alstIndex: 5.94,
  leftArmLST: 6.3,
  rightArmLST: 6.4,
  leftLegLST: 13.3,
  rightLegLST: 13.7,
  peerComparison: 'Lower body fat than 70% of her peers.',
};

const baselineNotes = [
  {
    type: 'green',
    label: 'Strong Baseline Across the Board',
    body: 'Rena tested well above typical new-client baselines: 85 lb Hex Deadlift and 85 lb Hip Thrust for 5 reps each, a 2:00 plank hold, and 5 reps per grip on assisted pull-ups (close, standard, and wide). This program starts her at meaningful working loads rather than conservative ones — the evidence is clear that women are systematically under-loaded in most programs, and her baseline does not call for a cautious ramp-up.',
  },
  {
    type: 'teal',
    label: 'Styku Findings — Excellent Baseline',
    body: 'Shape Score 92/100 (Excellent). Body Fat 27.0% (Fit — lower than 70% of peers). ALST Index 5.94 kg/m² — within normal reference range (the 5.5 kg/m² EWGSOP2 female at-risk cutoff is the governing threshold; there is no higher "Optimal" tier above it for women). VFA 26.3 cm² — Very Low Risk. BMI 20.5 — Normal range. No clinical body-composition flags on this scan.',
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Below Threshold, Monitor',
    body: 'Arms: Left 6.3 lbs / Right 6.4 lbs — 0.1 lb gap. Legs: Left 13.3 lbs / Right 13.7 lbs — 0.4 lb gap, right-dominant. Both gaps sit under the 0.5 lb asymmetry-protocol threshold, so no formal unilateral-lead requirement is triggered — but the leg gap is close enough to flag for monitoring at the next rescan.',
  },
  {
    type: 'gold',
    label: 'Age Bracket — Perimenopause / Menopause Transition (45–55)',
    body: 'At 45, Rena sits in the 45-55 age bracket, where heavy compound lifting is both a hormonal reset and an early bone-density investment ahead of the menopause transition — creatine is strongly indicated by age 40+ regardless, and protein moves up within the 1.6–2.2 g/kg range for a genuine energy deficit, heavy training load, or ALST At-Risk status, not for age or bracket alone (her ALST, 5.94 kg/m², is within normal reference range). Bone-loading candidacy (LIFTMOR-style, T-score dependent) is worth screening for as she moves through this window even though nothing currently indicates low bone mass.',
  },
  {
    type: 'gold',
    label: 'Goblet Squat — Baseline Established This Week',
    body: 'Back Squat/Goblet Squat was not part of the initial 11-exercise testing battery (Single-Arm Row fills that slot instead). Today\'s working load (30 lbs) becomes the new 8-week baseline — track progression from here the same as every other lift in this program.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'DAY A — Hinge + Press + Core',
    subtitle: 'Deadlift · Hip Thrust · Press — Strength Foundation',
    descriptor: 'PRIMARY HINGE & PRESS STRENGTH · CARDIOVASCULAR FINISHER · 55–65 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'Control precedes power: every session opens with hip hinge activation before loading the two biggest hinge lifts in the program. Hex deadlift and hip thrust both tested strong (85 lbs x5) — this day builds directly on that strength while establishing the pressing baseline. Closes with a cardiovascular finisher, the primary conditioning stimulus at 2 days/week.',
    warmUp: '8 min: 3 min bike or brisk walk (Zone 2). Then: PVC hip hinge drill 2×10, glute bridge 2×15, band pull-apart 2×15, cat-cow 10 slow reps, arm circles 10 each direction.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY HINGE STRENGTH',
        introLabel: 'Hex Deadlift & Hip Thrust Baseline — 85 lbs ×5 Each',
        intro: 'Both lifts tested at 85 lbs for 5 reps — a genuinely strong starting point. Week 1 trains at 75 lbs to lock in hip hinge mechanics under load before adding weight; by Week 4 both lifts move past baseline. Hip hinge drill from the warm-up carries into every set.',
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: 'Wk1: 75 lbs → Wk4: 95 lbs', tempo: '2-1-1', rest: '90s', cue: 'Hinge hips back to grip, drive floor away, hips and shoulders rise together. Strong baseline — own the pattern before pushing load.' },
          { name: 'Hip Thrust (Barbell or Loaded DB, Bench-Supported)', sets: '4', reps: '5―6', load: 'Wk1: 75 lbs → Wk4: 95–100 lbs', tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, drive hips to full extension, squeeze glutes hard at top. Hip-dominant — a direct bone-density investment.' },
          { name: 'DB Lateral Raise', sets: '3', reps: '12―15', load: '8―10 lbs', tempo: '2-1-2', rest: '30s', cue: 'Lateral delt. Arms slightly bent. Raise to shoulder height, 1-second hold at top, slow 2-second lower.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PRESS STRENGTH',
        introLabel: 'Overhead & Incline Press Baseline',
        intro: 'Seated overhead press (15 lbs/hand ×5) and incline chest press (20 lbs/hand ×5) both tested clean. Week 1 trains slightly below baseline for volume; both climb past baseline by Week 4.',
        exercises: [
          { name: 'DB Overhead Press (Seated)', sets: '4', reps: '8', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs', tempo: '2-1-1', rest: '75s', cue: 'Baseline 15 lbs ×5RM. Seated: back supported, spine neutral. Press overhead, arms alongside ears. Core braced throughout.' },
          { name: 'Incline DB Chest Press (30–45°)', sets: '4', reps: '8', load: 'Wk1: 17.5 lbs/hand → Wk4: 22.5–25 lbs', tempo: '2-1-1', rest: '75s', cue: 'Baseline 20 lbs ×5RM. 30–45° incline. Full range, control the descent, drive up without arching off the bench.' },
          { name: 'Single-Leg RDL (DB)', sets: '3+3', reps: '8―10 ea', load: 'Wk1: 22.5 lbs → Wk4: 30 lbs', tempo: '3-1-1', rest: '75s', cue: 'Baseline 25 lbs ×8. Slight knee bend, hinge from hip, feel hamstring load. Left and right equal sets — builds hip hinge control unilaterally.' },
        ],
      },
      {
        letter: 'C',
        title: 'LOADED CARRY + CORE',
        introLabel: 'Farmer Carry & Plank Baseline',
        intro: 'A 2:00 plank hold is exceptional — well past the 60-second ICONS threshold. Carries build the deep spinal stabilizer strength (multifidus, QL) that supports posture under all the compound lifts above.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '4', reps: '25–30 yds', load: 'Wk1: 30 lbs/hand → +5 lbs/2wks', tempo: 'Controlled', rest: '90s', cue: 'Baseline 30 lbs/hand. Shoulders packed, chest tall, neutral neck. Add 5 lbs every 2 weeks.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: '1:30', load: 'Bodyweight', tempo: '—', rest: '90s', cue: 'Exceptional baseline 2:00. Hold at 1:30 in training — quality over max time. Wk4: 2:00 loaded with a light plate on the back.' },
          { name: 'Pallof Press (Anti-Rotation)', sets: '3', reps: '10 ea side', load: 'Light-Mod band', tempo: '2-2-1', rest: '45s', cue: 'Press straight out from chest, resist the band pulling you into rotation. Complements the plank as the other core pillar — anti-rotation, not just anti-flexion.' },
        ],
      },
      {
        letter: 'D',
        title: 'CARDIOVASCULAR FINISHER (CHOOSE ONE)',
        color: 'gold',
        introLabel: 'Cardio Protocol — Choose One',
        intro: 'At 2 days/week, the quality of conditioning work inside each session is the primary cardiovascular stimulus. Every Day A ends with one of these — not optional.',
        exercises: [
          { name: 'Treadmill — Zone 2 Walk/Jog', sets: '1', reps: '15–20 min', load: '60–65% max HR', tempo: 'Steady', rest: '—', cue: 'Brisk walk or light jog at conversational pace. Builds aerobic base — minimum cardiovascular dose for the week.' },
          { name: 'Stationary Bike — HIIT', sets: '8', reps: '20s hard / 40s easy', load: 'High resistance', tempo: 'Hard then easy', rest: '40s', cue: '20 seconds maximum effort, 40 seconds easy spin, 8 rounds. Heart rate should peak at 80–85% then partially recover.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 60s each. Doorway chest stretch 30s each. Lat stretch 30s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'Muscle is the medicine — every set of the hinge and press work here is a hormonal reset as much as a strength builder. Track load progression weekly; the baseline supports adding weight faster than a typical new client.',
  },
  {
    intensity: 80,
    title: 'DAY B — Squat/Lunge + Pull + Conditioning',
    subtitle: 'Lunge · Pull-Up · Row — Lower Body & Pulling Strength',
    descriptor: 'PRIMARY LOWER & PULL STRENGTH · METABOLIC CONDITIONING · 55–65 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Strength builds confidence: this day pairs unilateral lower-body loading with a full pull-up progression across all three grips, then closes with a metabolic circuit that doubles as this session\'s conditioning stimulus. Close-grip pull-up leads every session as the strongest and most shoulder-friendly of the three.',
    warmUp: '8 min: 3 min bike or treadmill walk (Zone 2). Then: glute bridge 2×15, goblet squat 2×10 light (depth focus), dead hang 20 seconds (shoulder decompression), band pull-apart 2×15, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY LOWER — LUNGE & SQUAT',
        introLabel: 'DB Lunge Baseline — 25 lbs ×5',
        intro: 'Lunge tested at 25 lbs/hand for 5 reps — a solid unilateral strength baseline. Goblet squat was not part of the initial testing battery — today\'s working load becomes the new 8-week baseline — and step-up rounds out the bilateral and unilateral lower-body volume for the week.',
        exercises: [
          { name: 'DB Reverse Lunge', sets: '3+3', reps: '8 ea', load: 'Wk1: 20 lbs/hand → Wk4: 27.5–30 lbs', tempo: '2-1-1', rest: '75s', cue: 'Baseline 25 lbs ×5RM. Step back with control, front knee tracks over toes, drive through the front heel to stand.' },
          { name: 'Goblet Squat (DB or KB)', sets: '4', reps: '10―12', load: 'Wk1: 30 lbs → Wk4: 40 lbs', tempo: '3-1-1', rest: '75s', cue: 'Not tested — establishing baseline. DB held at chest. Full depth, chest tall, elbows inside knees at bottom.' },
          { name: 'Face Pull (Cable or Band)', sets: '3', reps: '15―20', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows at ear height, external rotation at end range. Balances the pressing volume from Day A.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PULL STRENGTH + PULL-UP PROGRESSION',
        introLabel: 'Pull-Up Baseline — 5 Reps Each Grip (Assisted)',
        intro: 'Five clean reps per grip on assisted pull-ups is a strong starting point across close, standard, and wide grip. Close grip leads every session — least shoulder strain, easiest to add volume to first. Single-arm row builds on the 30 lb ×5 baseline.',
        exercises: [
          { name: 'Assisted Pull-Up — Close Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'LEADS every session. Full hang at bottom, chin over bar at top, controlled 3-second descent. Add 1 rep every 2 weeks.' },
          { name: 'Assisted Pull-Up — Standard Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'Standard overhand grip, shoulder-width. Same quality as close grip. Second grip in the rotation.' },
          { name: 'Assisted Pull-Up — Wide Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '75s', cue: 'Wide overhand grip — greatest lat stretch at bottom, hardest of the three. Full range, no partial reps.' },
          { name: 'Single-Arm DB Row', sets: '4', reps: '8', load: 'Wk1: 25 lbs → Wk4: 32.5–35 lbs', tempo: '3-1-2', rest: '60s', cue: 'Baseline 30 lbs ×5RM. Bench-supported, flat back. Drive elbow to hip, full stretch at bottom.' },
          { name: 'Step-Up (Unilateral, DB)', sets: '3+3', reps: '8 ea', load: '15―20 lbs/hand', tempo: '2-1-1', rest: '60s', cue: '18–20 inch box. Drive through front heel, full hip extension at top. Excellent glute and quad developer without spine loading.' },
        ],
      },
      {
        letter: 'C',
        title: 'PUSH-UP PROGRESSION',
        color: 'green',
        introLabel: 'Push-Up Baseline — 10 Reps Incline',
        intro: 'Ten reps on an incline is a strong bridge point toward full floor push-ups. Week 1 continues building incline volume while starting the first full-floor attempts.',
        exercises: [
          { name: 'Incline Push-Up (Hands Elevated)', sets: '3', reps: '10―12', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Baseline 10 reps. Hands on bench or box, full chest to bench level, controlled descent. Progress by lowering the incline height each week.' },
          { name: 'Full Push-Up (Floor Attempt)', sets: '3', reps: 'Max (target 6–8)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Attempt full push-ups, stop 2 reps before form breaks. Neutral spine throughout — no sag or pike.' },
          { name: 'Tricep Dip (Bench)', sets: '3', reps: '10―12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Hands on bench behind body, lower until elbows reach 90°, drive back up. Complements pressing and push-up volume.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC CONDITIONING CIRCUIT — 3 ROUNDS',
        color: 'gold',
        introLabel: 'Cardio Protocol',
        intro: "Day B's cardiovascular work is a metabolic circuit rather than dedicated cardio — the strength-plus-conditioning combination most effective for body composition at 2 days/week. After 3 rounds: 10-minute finisher — stationary bike easy spin, treadmill Zone 2 walk, or rowing machine easy pace.",
        exercises: [
          { name: 'Goblet Squat (Light, Continuous)', sets: '3 rounds', reps: '15', load: '20―25 lbs', tempo: '2-0-1', rest: '15s then next', cue: 'Sub-maximal load, continuous reps. Focus is metabolic — keep moving into the next exercise.' },
          { name: 'DB Row (Both Arms, Bent Over)', sets: '3 rounds', reps: '12', load: '20―25 lbs', tempo: '2-1-2', rest: '15s then next', cue: 'Hip hinge, pull both DBs to ribs. Lighter than Day B primary row — metabolic pull volume.' },
          { name: 'Push-Up (Max or Incline)', sets: '3 rounds', reps: 'Max', load: 'Bodyweight', tempo: '3-0-1', rest: '15s then next', cue: 'Full or incline — whatever allows quality reps. Stop 1 rep before form breaks.' },
          { name: 'Plank Hold', sets: '3 rounds', reps: '45–60s', load: 'Bodyweight', tempo: '—', rest: '90s rest', cue: 'Full brace. Rest 90 seconds after plank, then begin next round. 3 full rounds of the complete circuit.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 10 slow reps. Doorway chest stretch 30s each. Hip flexor lunge 60s each.',
    iconsNote: "Energy becomes identity — this is the session's finish, and it should feel unstoppable, not depleting. Track how many circuit rounds complete with good form each week as a conditioning marker alongside the strength numbers above.",
  },
];

const baselines = [
  ['Hex Deadlift', '85 lbs', '5 RM', 'Wk1: 75 lbs ×5 → Wk4: 95 lbs ×5. Strong baseline — technique-first progression before heavier loading.'],
  ['Hip Thrust', '85 lbs', '5 RM', 'Wk1: 75 lbs ×5–6 → Wk4: 95–100 lbs ×5–6. Hip-dominant, no axial spinal load.'],
  ['Single-Leg RDL', '25 lbs / hand', '8 reps', 'Wk1: 22.5 lbs ×10 → Wk4: 30 lbs ×8. Left and right equal sets.'],
  ['DB Lunge', '25 lbs / hand', '5 RM', 'Wk1: 20 lbs ×8 → Wk4: 27.5–30 lbs ×8.'],
  ['Single-Arm Row', '30 lbs', '5 RM', 'Wk1: 25 lbs ×8 → Wk4: 32.5–35 lbs ×8.'],
  ['Seated Overhead Press', '15 lbs / hand', '5 RM', 'Wk1: 12.5 lbs ×8 → Wk4: 17.5 lbs ×8.'],
  ['Incline DB Chest Press', '20 lbs / hand', '5 RM', 'Wk1: 17.5 lbs ×8 → Wk4: 22.5–25 lbs ×8.'],
  ['Farmer Carry', '30 lbs / hand', 'Working', 'Wk1: 30 lbs ×4 sets → +5 lbs/hand every 2 weeks → Wk4: 40 lbs/hand.'],
  ['Plank (Elbow)', '2:00', 'Max', 'Exceptional — well above the 60-second ICONS threshold. Hold at 1:30 in training → Wk4: 2:00 loaded.'],
  ['Incline Push-Up', '10 reps', 'Max', 'Wk1: 10–12 reps, begin floor attempts → Wk4: 6–8 full push-ups.'],
  ['Assisted Pull-Up (all grips)', '5 reps each', 'Close-Grip / Standard / Wide', 'Wk1: all 3 grips ×5 → Wk4: ×7–8. Close grip leads (most shoulder-friendly).'],
  ['Goblet Squat (Back Squat)', 'Not Tested — Established This Week', 'Working', 'Wk1: 30 lbs ×10–12 → Wk4: 40 lbs ×10–12. Becomes the new 8-week baseline.'],
];

const summary = {
  subtitle: 'Rena Paul  ·  ICONS Index  ·  Strength & Bone Density Foundation  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['Wk 1', '—', 'Day A & B', 'Hex DL 75 lbs ×5 / Hip Thrust 75 lbs ×5–6 / Lunge 20 lbs ×8', 'Establish all working loads. Push-up: 6 floor reps off a 10-rep incline base. Plank: 1:30. Pull-up: 5 reps all grips.'],
    ['Wk 2', '—', 'Day A & B', 'Hex DL 80 lbs ×5 / Hip Thrust 80 lbs ×5–6 / Lunge 22.5 lbs ×8', 'Pull-up: 6 reps all grips. Push-up: 7 floor reps. Plank: 1:40.'],
    ['Wk 3', '—', 'Day A & B', 'Hex DL 90 lbs ×5 / Hip Thrust 90 lbs ×5–6 / Lunge 25 lbs ×8', 'Hex DL and Hip Thrust approach tested baseline as working weight. Push-up: 7–8 floor reps. Plank: 1:50.'],
    ['Wk 4', '—', 'Day A & B', 'Hex DL 95 lbs ×5 / Hip Thrust 95–100 lbs ×5–6 / Lunge 27.5–30 lbs ×8', 'All baseline lifts surpassed. Push-up: 8 full unassisted. Plank: 2:00 loaded. Reassess pull-up assist level.'],
  ],
  milestones4wk: 'All baseline lifts surpassed. Push-up: 8 full unassisted. Plank: 2:00 loaded. Pull-up assist level reduced across all 3 grips.',
  milestones8wk: 'Strength: Hex DL 110+ lbs ×5. Hip Thrust 110+ lbs ×5–6. OHP 20 lbs/hand ×8. Incline Press 27.5 lbs/hand ×8. Row 37.5–40 lbs ×8. Lunge 32.5 lbs/hand ×8. Carry 45–50 lbs/hand. Push-up 12+ full unassisted. Pull-up 8+ reps all grips, next assist-level reduction. Plank 2:15+ loaded.',
  rescanNote: 'Styku rescan recommended at 8 weeks — track ALST Index trend (currently 5.94 kg/m², within normal reference range), Shape Score (currently 92, Excellent — maintain), and the leg segmental gap (currently 0.4 lbs, below threshold but worth confirming it isn\'t widening).',
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

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'rena_paul');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Rena_Paul_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // No clientHighlight: first build (single Styku scan + single baseline
  // testing session, no prior version to compare against) — her strong
  // baseline numbers are a starting point, not a documented PR/progress-
  // since-last-version. Omitted per spec rather than fabricated.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Rena_Paul_2Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
