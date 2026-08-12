/**
 * Mary Burfete — ICONS 2-Day Full Gym Training Plan
 * Brace Life Studios
 *
 * New client. Built from a Styku scan (8/10/2026) and an 11-exercise ICONS
 * baseline battery (client-reported, includes bonus 3-grip assisted pull-up
 * test — same three-grip format as Vinz Feller's baseline).
 *
 * Structural reference: scripts/rena_paul_2day_plan.js (same demographic
 * bracket, same full Styku+baseline data shape, same 2-day full-gym format,
 * no weekOverview strip).
 *
 * AGE BRACKET BOUNDARY: at 55, Mary sits directly on the boundary between
 * the 45-55 (Perimenopause/Menopause Transition) and 55-65 (Postmenopausal)
 * brackets — flagged explicitly in baselineNotes rather than silently
 * picking one. ageYears=55 already trends proteinTargets()/nutritionBlock()
 * into the 50+ tier (2.0-2.2 g/kg) and creatine "strongly indicated"
 * automatically — no manual override needed for those two.
 *
 * isPostmenopausal is left false/unset — no menopausal status was stated by
 * the trainer, so it is not fabricated here (same posture as Rena Paul's
 * script). Because Mary's program carries real heavy hip-thrust/squat/
 * deadlift loading and she is at/past the average age of menopause onset,
 * this ambiguity is flagged in its own baselineNote (not just a one-line
 * aside) per CLAUDE.md's Perimenopausal Status section — confirming her
 * actual status at next intake is explicitly worth doing given how
 * load-bearing that determination is for the pelvic floor protocol.
 *
 * ALST Index 5.52 kg/m² falls in the women's "Normal — monitor" tier
 * (5.5-6.99) per CLAUDE.md's 3-tier table, but only 0.02 kg/m² above the
 * <5.5 At-Risk cutoff — flagged explicitly as genuinely borderline rather
 * than reported as comfortably clear. This does NOT trip
 * client.alstIndex < 5.5, so proteinBar() is correctly NOT auto-inserted
 * per day by buildDocument() — the borderline status is documented in
 * baselineNotes/Styku findings instead, not forced into the per-day engine
 * trigger that's reserved for confirmed At-Risk clients.
 *
 * VFA 62.0 cm² — CLAUDE.md's own VFA table (<70 cm² = Very Low Risk) places
 * this in the more favorable Very Low Risk band; Styku's own dashboard tag
 * on the scan reads "Low Risk," but the correct, more precise tier from our
 * reference table is used here instead of the coarser Styku label.
 *
 * Segmental asymmetry: arms 0.1 lb gap (below the 0.5 lb asymmetry-protocol
 * threshold — monitor only). Legs: Left 14.6 / Right 15.1 lbs — exactly
 * 0.5 lbs, landing precisely AT the asymmetry-protocol trigger. Per the
 * Johanna Castillo precedent, an exact-threshold gap is treated as
 * triggering the full protocol, not as a borderline non-trigger. weakerSide()
 * confirms LEFT leg (lower LST) is weaker and leads every unilateral leg
 * exercise below.
 *
 * Baseline battery is strong and well-established (155 lb Hex Deadlift x5,
 * 90 lb Back Squat x5, 90 lb Hip Thrust x5, 65 lb Bench x5, 2:03 plank) —
 * this is a solid trainee, not a beginner. Working loads below are computed
 * from Epley 1RM + workingLoad() off her real tested numbers rather than
 * conservative estimates, per the "never under-load" principle. Sled Push
 * and Farmer Carry use descriptive/reference load framing (no 1RM math —
 * neither is a maximal-strength-tested movement).
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad, weakerSide } = require('./icons_template');

// ── Epley 1RM + working-load calculations off real tested numbers ────────
const hexDL1RM = epley1RM(155, 5);        // 181
const backSquat1RM = epley1RM(90, 5);      // 105
const hipThrust1RM = epley1RM(90, 5);      // 105
const bench1RM = epley1RM(65, 5);          // 76
const splitSquat1RM = epley1RM(17.5, 5);   // 20
const row1RM = epley1RM(30, 5);            // 35

const hexDL_wk1 = workingLoad(hexDL1RM, 0.80);   // 145
const hexDL_wk4 = workingLoad(hexDL1RM, 0.93);   // 170
const backSquat_wk1 = workingLoad(backSquat1RM, 0.80); // 85
const backSquat_wk4 = workingLoad(backSquat1RM, 0.93); // 100
const hipThrust_wk1 = workingLoad(hipThrust1RM, 0.80); // 85
const hipThrust_wk4 = workingLoad(hipThrust1RM, 0.93); // 100
const bench_wk1 = workingLoad(bench1RM, 0.80);   // 60
const bench_wk4 = workingLoad(bench1RM, 0.93);   // 70
const splitSquat_wk1 = workingLoad(splitSquat1RM, 0.80); // 15
const splitSquat_wk4 = workingLoad(splitSquat1RM, 0.93); // 20
const row_wk1 = workingLoad(row1RM, 0.80);       // 30
const row_wk4 = workingLoad(row1RM, 0.93);       // 35

// Legs: Left 14.6 / Right 15.1 — exactly 0.5 lb gap, at the asymmetry
// trigger. weakerSide() confirms LEFT (lower LST) leads unilateral leg work.
const legLead = weakerSide(14.6, 15.1); // 'left'

const client = {
  name: 'Mary Burfete',
  programTitle: '2-Day Full Gym Training Plan',
  subtitle: 'Strength, Bone Density & Hormonal Resilience Foundation',
  schedule: 'Full Gym · 2 Days/Week',
  stats: ['Age 55', "5'8\"", '140 lbs', 'Full Gym · 2 Days/Week'],
  weightKg: 63.5,
  ageYears: 55,
  isPostmenopausal: false,
  bmr: 1330,
  alstIndex: 5.52,
};

const styku = {
  scanDate: '8/10/2026',
  bodyFatPct: 35.5,
  bodyFatRank: 'Average',
  leanMass: 85.2,
  leanMassPct: 61.1,
  fatMass: 49.6,
  boneMass: 4.7,
  bmi: 21.2,
  bmr: 1330,
  vfa: 62.0,
  shapeScore: 65,
  shapeScoreLabel: 'Needs Improvement',
  alstIndex: 5.52,
  leftArmLST: 7.3,
  rightArmLST: 7.2,
  leftLegLST: 14.6,
  rightLegLST: 15.1,
  peerComparison: "Body fat % is lower than 79% of women 50-59 (21st percentile) — leaner than most peers, though Styku's own peer-comparison dashboard tags this band \"Moderate Risk.\" Lean Mass is flagged \"Ideal Lean Mass\" by Styku.",
};

const baselineNotes = [
  {
    type: 'green',
    label: 'Strong, Well-Established Baseline',
    body: `Mary tested well above a typical new-client baseline across every major pattern: 155 lb Hex Deadlift x5 (Epley 1RM ${hexDL1RM} lbs), 90 lb Back Squat x5 (Epley 1RM ${backSquat1RM} lbs), 90 lb Hip Thrust x5 (Epley 1RM ${hipThrust1RM} lbs), 65 lb Bench Press x5 (Epley 1RM ${bench1RM} lbs), and a 2:03 plank hold — well past the 60-second ICONS threshold. This is a solid, established trainee, not a beginner. Working loads throughout this program are set from her real tested numbers rather than a conservative ramp-up, per the "never under-load" principle.`,
  },
  {
    type: 'teal',
    label: 'Styku Findings — Composition & Risk Bands',
    body: 'Shape Score 65/100 (Needs Improvement). Body Fat 35.5% (49.6 lbs fat mass) — Styku\'s own scan classification reads "Average" (35-39.9% band). Lean Mass 85.2 lbs (61.1%) — Styku flags this "Ideal Lean Mass." BMI 21.2 — Normal range (18.5-24.9). ALST Index 5.52 kg/m² — falls in the Normal/monitor tier per our 3-tier table (<5.5 At-Risk / 5.5-6.99 Normal-monitor / ≥7.0 Optimal), but only 0.02 kg/m² above the At-Risk cutoff — genuinely borderline, and worth close attention at the next rescan rather than treated as comfortably clear. VFA 62.0 cm² — Very Low Risk per our precise VFA table (<70 cm² threshold); Styku\'s own dashboard tag on this scan reads "Low Risk," but our table\'s more precise banding places her in the more favorable Very Low Risk tier — using the correct, more precise tier here rather than Styku\'s coarser label.',
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Legs At Threshold, Protocol Triggered',
    body: `Arms: Left ${styku.leftArmLST} lbs / Right ${styku.rightArmLST} lbs — 0.1 lb gap, below the 0.5 lb asymmetry-protocol threshold — monitor only, no unilateral-lead requirement. Legs: Left ${styku.leftLegLST} lbs / Right ${styku.rightLegLST} lbs — exactly 0.5 lbs, landing precisely AT the asymmetry-protocol trigger. Consistent with the Johanna Castillo precedent, an exact-threshold gap is treated as triggering the full protocol, not as a borderline non-trigger. LEFT leg (lower LST) is weaker and leads every unilateral leg exercise in this program — split stance squat, step-up, and single-leg RDL all list LEFT first below.`,
  },
  {
    type: 'gold',
    label: 'Age Bracket Boundary — 45-55 / 55-65',
    body: 'At 55, Mary sits directly on the boundary between the 45-55 (Perimenopause/Menopause Transition) and 55-65 (Postmenopausal) age brackets. Protein and creatine targets below already reflect the 50+ escalation (2.0-2.2 g/kg, creatine strongly indicated) appropriate to either bracket. LIFTMOR-style bone-loading candidacy screening (T-score < -1.0) is worth introducing now rather than waiting — both brackets converge on bone density as a priority as estrogen decline accelerates.',
  },
  {
    type: 'watch',
    label: 'Menopausal Status — Unconfirmed, Flagged for Next Intake',
    body: 'No menopausal status was stated by the trainer at intake — isPostmenopausal is left unconfirmed here rather than fabricated. At 55, Mary is at or past the average age of menopause onset (~51), and this program includes real, heavy hip-thrust, squat, and deadlift loading — exactly the pattern the pelvic floor protocol exists to safeguard. Per CLAUDE.md\'s Perimenopausal Status guidance, the transition window itself (not just confirmed postmenopausal status) carries elevated stress-urinary-incontinence risk, so this is not a low-stakes unknown. Confirming her actual status is worth doing at the next intake conversation given how load-bearing that determination is for whether the pelvic floor safety callout should be running on every heavy day. Until confirmed, coach standard pelvic floor bracing and exhale-on-exertion cues verbally on all heavy hinge and squat work as a precaution, independent of what this document auto-generates.',
  },
];

const days = [
  {
    intensity: 80,
    title: 'DAY A — Hinge, Pull & Loaded Carry',
    subtitle: 'Hex Deadlift · Hip Thrust · Row — Posterior Chain Strength Foundation',
    descriptor: 'PRIMARY HINGE & PULL STRENGTH · LOADED CARRY & CORE · CONDITIONING FINISHER · 55–65 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: `Control precedes power: every session opens with hip hinge activation before loading the two biggest hinge lifts in the program. Hex deadlift (${hexDL1RM} lb Epley 1RM off 155 lbs x5) and hip thrust (${hipThrust1RM} lb Epley 1RM off 90 lbs x5) both tested genuinely strong — this day builds directly on that strength while treating the hip-dominant work as a bone-density investment ahead of the 55-65 postmenopausal bracket. Closes with a conditioning finisher, the primary cardiovascular stimulus at 2 days/week.`,
    warmUp: '8 min: 3 min bike or brisk walk (Zone 2). Then: PVC hip hinge drill 2×10, glute bridge 2×15, band pull-apart 2×15, cat-cow 10 slow reps, arm circles 10 each direction.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY HINGE STRENGTH',
        introLabel: `Hex Deadlift & Hip Thrust — Epley 1RM ${hexDL1RM} / ${hipThrust1RM} lbs`,
        intro: `Both lifts tested at 90+ lbs for 5 reps — a genuinely strong starting point. Week 1 trains at 80% of Epley 1RM to lock in hip hinge mechanics under real load; by Week 4 both lifts climb to 93% of Epley 1RM, above the originally tested weight.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `Wk1: ${hexDL_wk1} lbs → Wk4: ${hexDL_wk4} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Hinge hips back to grip, drive floor away, hips and shoulders rise together.' },
          { name: 'Hip Thrust (Barbell or Loaded DB, Bench-Supported)', sets: '4', reps: '5–6', load: `Wk1: ${hipThrust_wk1} lbs → Wk4: ${hipThrust_wk4} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, drive hips to full extension, squeeze glutes hard at top. Bone-density investment.' },
          { name: 'Single-Leg RDL (DB)', sets: '3+3', reps: '8–10 ea', load: '20 lbs → 25 lbs', tempo: '3-1-1', rest: '75s', cue: 'LEFT leg leads every set — lower leg LST (14.6 vs 15.1 lbs), asymmetry-protocol trigger at exactly 0.5 lb gap.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PULL STRENGTH',
        introLabel: `Single-Arm Row — Epley 1RM ${row1RM} lbs`,
        intro: 'Single-arm row tested at 30 lbs for 5 reps and climbs from there; bent-over bilateral row and face pull round out the pulling volume, balancing the pressing work on Day B.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '4', reps: '8', load: `Wk1: ${row_wk1} lbs → Wk4: ${row_wk4} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Bench-supported, flat back. Drive elbow to hip, full stretch at bottom.' },
          { name: 'Bent-Over DB Row (Both Arms)', sets: '3', reps: '10', load: '20–25 lbs/hand', tempo: '2-1-2', rest: '60s', cue: 'Hip hinge, flat back, pull both DBs to ribs together. Bilateral pulling volume.' },
          { name: 'Face Pull (Cable or Band)', sets: '3', reps: '15–20', load: 'Light–Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows at ear height, external rotation at end range. Shoulder health, balances pressing.' },
        ],
      },
      {
        letter: 'C',
        title: 'LOADED CARRY + CORE',
        introLabel: 'Farmer Carry & Plank Baseline — 25 lbs/Hand · 2:03 Hold',
        intro: 'A 2:03 plank hold is exceptional — well past the 60-second ICONS threshold. Carries build the deep spinal stabilizer strength (multifidus, QL) that supports posture under all the compound lifts above. Both are descriptive/reference loads, not 1RM-calculated.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '4', reps: '25–30 yds', load: 'Wk1: 25 lbs/hand → +5 lbs every 2 wks', tempo: 'Controlled', rest: '90s', cue: 'Shoulders packed, chest tall, neutral neck. Add 5 lbs per hand every 2 weeks.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: '1:45', load: 'Bodyweight', tempo: '—', rest: '90s', cue: 'Exceptional baseline 2:03. Hold at 1:45 in training — quality over max time. Wk4: 2:00+ loaded.' },
          { name: 'Pallof Press (Anti-Rotation)', sets: '3', reps: '10 ea side', load: 'Light–Mod band', tempo: '2-2-1', rest: '45s', cue: 'Press straight out from chest, resist the band pulling you into rotation.' },
        ],
      },
      {
        letter: 'D',
        title: 'CONDITIONING FINISHER (CHOOSE ONE)',
        color: 'gold',
        introLabel: 'Conditioning Protocol — Sled Push Baseline 45 lbs',
        intro: 'Sled push tested at 45 lbs — a reference/descriptive load, not a 1RM-tested movement. At 2 days/week, this finisher is the primary cardiovascular stimulus of the session — not optional.',
        exercises: [
          { name: 'Sled Push (Loaded)', sets: '4', reps: '20–25 yds', load: 'Wk1: 45 lbs → progress distance/resistance weekly', tempo: 'Drive, controlled', rest: '90s', cue: 'Low shin angle, drive through the balls of the feet, arms locked. Reference load — no 1RM math.' },
          { name: 'Stationary Bike — HIIT (Alt. Option)', sets: '8', reps: '20s hard / 40s easy', load: 'High resistance', tempo: 'Hard then easy', rest: '40s', cue: '20 seconds maximum effort, 40 seconds easy spin, 8 rounds. Substitute for sled push if unavailable.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 60s each. Doorway chest stretch 30s each. Lat stretch 30s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'Muscle is the medicine — every set of the hinge and pull work here is a hormonal reset as much as a strength builder. Track load progression weekly; the baseline supports adding weight faster than a typical new client.',
  },
  {
    intensity: 70,
    title: 'DAY B — Squat, Press & Pull-Up Progression',
    subtitle: 'Back Squat · Split Stance Squat · Bench Press · Pull-Up — Lower & Upper Strength Build',
    descriptor: 'PRIMARY LOWER & PRESS STRENGTH · PULL-UP PROGRESSION · METABOLIC FINISHER · 55–65 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Strength builds confidence: this day builds moderate volume across the squat, press, and pull-up patterns without stacking peak fatigue on top of Day A\'s heavier hinge work. Close-grip pull-up leads every session as the strongest and most shoulder-friendly of the three grips tested.',
    warmUp: '8 min: 3 min bike or treadmill walk (Zone 2). Then: glute bridge 2×15, goblet squat 2×10 light (depth focus), dead hang 20 seconds (shoulder decompression), band pull-apart 2×15, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY LOWER — SQUAT & SPLIT SQUAT',
        introLabel: `Back Squat & Split Stance Squat — Epley 1RM ${backSquat1RM} / ${splitSquat1RM} lbs`,
        intro: `Back squat tested at 90 lbs for 5 reps; split stance DB squat tested at 17.5 lbs/hand for 5 reps. LEFT leg leads every unilateral exercise here — legs sit exactly at the 0.5 lb asymmetry-protocol trigger (14.6 vs 15.1 lbs), per the Johanna Castillo precedent.`,
        exercises: [
          { name: 'Back Squat (Barbell or Loaded)', sets: '4', reps: '5–6', load: `Wk1: ${backSquat_wk1} lbs → Wk4: ${backSquat_wk4} lbs`, tempo: '3-1-1', rest: '90s', cue: 'Full depth, chest tall, drive knees out. Brace before descent, exhale on the drive up.' },
          { name: 'Split Stance Squat (DB) — LEFT Leads', sets: '3+3', reps: '8 ea', load: `Wk1: ${splitSquat_wk1} lbs/hand → Wk4: ${splitSquat_wk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'LEFT (weaker) leg trains first every set. Rear foot elevated optional. Front knee tracks over toes.' },
          { name: 'Step-Up (Unilateral, DB) — LEFT Leads', sets: '3+3', reps: '8 ea', load: '15–20 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'LEFT leads. 18–20 inch box. Drive through front heel, full hip extension at top.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PRESS + PULL-UP PROGRESSION',
        introLabel: `Bench Press & Pull-Up Baseline — Epley 1RM ${bench1RM} lbs / 5 Reps Each Grip`,
        intro: 'Bench press tested at 65 lbs for 5 reps. Five clean reps per grip on assisted pull-ups (close, standard, wide) is a strong starting point — close grip leads every session as the least shoulder strain and easiest to add volume to first.',
        exercises: [
          { name: 'Bench Press (Barbell or DB)', sets: '4', reps: '6–8', load: `Wk1: ${bench_wk1} lbs → Wk4: ${bench_wk4} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Shoulder blades set, feet planted, controlled descent to chest, drive up without bouncing.' },
          { name: 'Assisted Pull-Up — Close Grip', sets: '3', reps: '5–6', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'LEADS every session. Full hang at bottom, chin over bar at top, controlled 3-second descent.' },
          { name: 'Assisted Pull-Up — Standard Grip', sets: '3', reps: '5–6', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'Standard overhand grip, shoulder-width. Same quality as close grip.' },
          { name: 'Assisted Pull-Up — Wide Grip', sets: '3', reps: '5–6', load: 'Assist level set', tempo: '3-1-2', rest: '75s', cue: 'Wide overhand grip — greatest lat stretch at bottom, hardest of the three. Full range, no partial reps.' },
          { name: 'DB Lateral Raise', sets: '3', reps: '12–15', load: '8–10 lbs', tempo: '2-1-2', rest: '30s', cue: 'Arms slightly bent. Raise to shoulder height, 1-second hold at top, slow 2-second lower.' },
        ],
      },
      {
        letter: 'C',
        title: 'PUSH-UP PROGRESSION',
        color: 'green',
        introLabel: 'Push-Up Baseline — 10 Reps Incline',
        intro: 'Ten reps on an incline is a solid bridge point toward full floor push-ups. Week 1 continues building incline volume while starting the first full-floor attempts.',
        exercises: [
          { name: 'Incline Push-Up (Hands Elevated)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Baseline 10 reps. Hands on bench or box, full chest to bench level, controlled descent.' },
          { name: 'Full Push-Up (Floor Attempt)', sets: '3', reps: 'Max (target 5–7)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Attempt full push-ups, stop 2 reps before form breaks. Neutral spine throughout.' },
          { name: 'Tricep Dip (Bench)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Hands on bench behind body, lower until elbows reach 90°, drive back up.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC CONDITIONING CIRCUIT — 3 ROUNDS',
        color: 'gold',
        introLabel: 'Cardio Protocol',
        intro: "Day B's cardiovascular work is a metabolic circuit rather than dedicated cardio — the strength-plus-conditioning combination most effective for body composition at 2 days/week. After 3 rounds: 10-minute finisher — stationary bike easy spin, treadmill Zone 2 walk, or rowing machine easy pace.",
        exercises: [
          { name: 'Goblet Squat (Light, Continuous)', sets: '3 rounds', reps: '15', load: '20–25 lbs', tempo: '2-0-1', rest: '15s then next', cue: 'Sub-maximal load, continuous reps. Focus is metabolic — keep moving into the next exercise.' },
          { name: 'DB Row (Both Arms, Bent Over)', sets: '3 rounds', reps: '12', load: '20–25 lbs', tempo: '2-1-2', rest: '15s then next', cue: 'Hip hinge, pull both DBs to ribs. Lighter than Day A primary row — metabolic pull volume.' },
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
  ['Hex Bar Deadlift', '155 lbs', '5 RM', `Epley 1RM ${hexDL1RM} lbs. Wk1: ${hexDL_wk1} lbs ×5 → Wk4: ${hexDL_wk4} lbs ×5.`],
  ['Back Squat', '90 lbs', '5 RM', `Epley 1RM ${backSquat1RM} lbs. Wk1: ${backSquat_wk1} lbs ×5–6 → Wk4: ${backSquat_wk4} lbs ×5–6.`],
  ['Hip Thrust', '90 lbs', '5 RM', `Epley 1RM ${hipThrust1RM} lbs. Wk1: ${hipThrust_wk1} lbs ×5–6 → Wk4: ${hipThrust_wk4} lbs ×5–6. Hip-dominant bone investment.`],
  ['Bench Press', '65 lbs', '5 RM', `Epley 1RM ${bench1RM} lbs. Wk1: ${bench_wk1} lbs ×6–8 → Wk4: ${bench_wk4} lbs ×6–8.`],
  ['Split Stance Squat (DB)', '17.5 lbs / hand', '5 RM', `Epley 1RM ${splitSquat1RM} lbs. Wk1: ${splitSquat_wk1} lbs/hand ×8 → Wk4: ${splitSquat_wk4} lbs/hand ×8. LEFT leg leads.`],
  ['Single-Arm DB Row', '30 lbs', '5 RM', `Epley 1RM ${row1RM} lbs. Wk1: ${row_wk1} lbs ×8 → Wk4: ${row_wk4} lbs ×8.`],
  ['Sled Push', '45 lbs', 'Working', 'Reference load — not a 1RM-tested movement. Progress distance/resistance week to week.'],
  ['Farmer Carry', '25 lbs / hand', 'Working', 'Wk1: 25 lbs/hand ×4 sets → +5 lbs/hand every 2 weeks → Wk4: 30–35 lbs/hand.'],
  ['Plank (Elbow)', '2:03', 'Max', 'Exceptional — well above the 60-second ICONS threshold. Hold at 1:45 in training → Wk4: 2:00+ loaded.'],
  ['Incline Push-Up', '10 reps', 'Max', 'Wk1: 10–12 reps, begin floor attempts → Wk4: 5–7 full push-ups.'],
  ['Assisted Pull-Up (all grips)', '5 reps each', 'Close-Grip / Standard / Wide', 'Wk1: all 3 grips ×5 → Wk4: ×6–7. Close grip leads (most shoulder-friendly).'],
];

const summary = {
  subtitle: 'Mary Burfete  ·  ICONS Index  ·  Strength & Bone Density Foundation  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['Wk 1', '—', 'Day A & B', `Hex DL ${hexDL_wk1} lbs ×5 / Hip Thrust ${hipThrust_wk1} lbs ×5–6 / Back Squat ${backSquat_wk1} lbs ×5–6 / Bench ${bench_wk1} lbs ×6–8`, 'Establish all working loads. LEFT leg leads split stance squat, step-up, single-leg RDL. Plank: 1:45. Pull-up: 5 reps all grips.'],
    ['Wk 2', '—', 'Day A & B', 'Hex DL +5–10 lbs / Hip Thrust +5–10 lbs / Back Squat +5 lbs / Bench +2.5–5 lbs', 'Pull-up: 6 reps all grips. Push-up: 6 floor reps. Plank: 1:50.'],
    ['Wk 3', '—', 'Day A & B', 'Hex DL approaching tested baseline / Hip Thrust at tested baseline / Back Squat above baseline', 'Push-up: 6–7 floor reps. Plank: 1:55.'],
    ['Wk 4', '—', 'Day A & B', `Hex DL ${hexDL_wk4} lbs ×5 / Hip Thrust ${hipThrust_wk4} lbs ×5–6 / Back Squat ${backSquat_wk4} lbs ×5–6 / Bench ${bench_wk4} lbs ×6–8`, 'All baseline lifts surpassed. Push-up: 7 full unassisted. Plank: 2:00+ loaded. Reassess pull-up assist level.'],
  ],
  milestones4wk: 'All baseline lifts surpassed. Push-up: 7 full unassisted. Plank: 2:00+ loaded. Pull-up assist level reduced across all 3 grips.',
  milestones8wk: `Strength: Hex DL ${hexDL_wk4 + 15}+ lbs ×5. Hip Thrust ${hipThrust_wk4 + 10}+ lbs ×5–6. Back Squat ${backSquat_wk4 + 10}+ lbs ×5–6. Bench ${bench_wk4 + 5}+ lbs ×6–8. Row ${row_wk4 + 5}+ lbs ×8. Split Stance Squat ${splitSquat_wk4 + 5}+ lbs/hand ×8. Sled Push distance/resistance increased. Push-up 10+ full unassisted. Pull-up 8+ reps all grips, next assist-level reduction. Plank 2:15+ loaded.`,
  rescanNote: 'Styku rescan recommended at 8 weeks — track ALST Index closely given the current 5.52 kg/m² reading sits only 0.02 kg/m² above the At-Risk cutoff (do not assume it stays clear of the threshold without confirming), VFA trend (currently 62.0 cm², Very Low Risk — maintain), and the leg segmental gap (currently exactly 0.5 lbs, at the asymmetry-protocol trigger — should trend down with the LEFT-leads unilateral protocol). Also worth revisiting at next intake: confirming actual menopausal status, given its direct relevance to the pelvic floor protocol on this program\'s heavy hinge/squat days.',
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
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'mary_burfete');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Mary_Burfete_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
  console.log('Computed working loads:', {
    hexDL1RM, hexDL_wk1, hexDL_wk4,
    backSquat1RM, backSquat_wk1, backSquat_wk4,
    hipThrust1RM, hipThrust_wk1, hipThrust_wk4,
    bench1RM, bench_wk1, bench_wk4,
    splitSquat1RM, splitSquat_wk1, splitSquat_wk4,
    row1RM, row_wk1, row_wk4,
    legLead,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
