/**
 * Siobhan Hansen — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * FIRST BUILD IN THIS REPO for a known, previously-documented client. Her
 * legacy roster entry (CLAUDE.md, "CLIENT ROSTER & DOCUMENT MAP" section)
 * describes a prior 3-day program built pre-repo via a different Python/
 * reportlab pipeline — no script or docx for her exists anywhere in this
 * git repo. This build is fresh via buildDocument()/icons_template.js,
 * informed by both that already-documented history (age, height, weight,
 * postmenopausal status, ALST/VFA/BMI, segmental LST, protein target — all
 * independently re-confirmed today via a fresh read of her actual Styku
 * PDF, numbers matched exactly) and new intake data (a full strength
 * baseline battery, and two new clinical/programming priorities from the
 * trainer). Structural references: scripts/johnna_macarthur_3day_plan.js
 * (real Styku data, 3-day, clinical corrective priorities, epley1RM/
 * workingLoad usage) and scripts/moe_shahheidari_3day_plan.js (shoulder-flag
 * "strengthen with precautions, not restrictions" treatment, pain-monitoring
 * language distinguishing sharp/pinching pain from ordinary fatigue).
 *
 * CLINICAL / PROGRAMMING PRIORITIES FROM INTAKE (real emphasis throughout,
 * not passing mentions):
 *   1. Left shoulder — pain on overhead raising, PREVIOUSLY SUSPENDED,
 *      now being actively, carefully reintroduced. The new trainer note
 *      ("Over Head Left Side Raising Shoulder Pain... Strengthen overhead
 *      (Not Tested)") is an intentional progression, not a silent reversal
 *      of the earlier "suspended" status — framed explicitly as such in
 *      baselineNotes and in Day 1's intensity paragraph. Same "strengthen
 *      with precautions, not restrictions" principle already established
 *      for Moe Shahheidari's rotator cuff content: real progressive
 *      overhead loading, autoregulated by pain-free ROM and RIR (not a
 *      fixed %1RM table — overhead press was never load-tested, so there
 *      is no 1RM to build a percentage table from), sharp/pinching pain as
 *      the explicit stop signal (distinct from ordinary fatigue), and a
 *      dedicated Isolated-zone shoulder corrective/prep block sequenced
 *      BEFORE any overhead pressing on Day 1 — "control precedes power."
 *   2. Scapular strength required before pull-up progression. Trainer note
 *      "Before doing pull ups needs scapula strength" is a direct
 *      sequencing instruction — Day 1 Block B is a dedicated scapular
 *      strengthening block that precedes and gates her Assisted Pull-Up
 *      progression (tested at intake, 5 reps x 3 grips, documented as a
 *      baseline reference in the table below but not yet progressed in
 *      load/volume until the scapular block's own strength criteria are
 *      met). Directly connected to priority #1, since scapular stability
 *      also supports the overhead-shoulder work.
 *
 * DEMOGRAPHIC SCOPE: age 59 -> CLAUDE.md's 55-65 "Postmenopausal" bracket.
 * isPostmenopausal: true is a CONFIRMED fact from her existing roster
 * entry, not an assumption — pelvicFloorCallout() fires automatically on
 * Days 2 and 3 (squat/RDL/hip-thrust/carry content present) and is left to
 * fire naturally on both, never suppressed. proteinBar() also fires
 * automatically on every day given alstIndex 4.66 < 5.5.
 *   - weightKg 53.5 (118 lbs) x 2.0-2.2 g/kg (proteinTargets()'s
 *     ALST-At-Risk/50+ tier, both conditions true here) resolves to
 *     107-118g/day — matches her already-documented protein target exactly.
 *
 * ALST + BMI — CLAUDE.md's NAMED HIGHEST-PRIORITY COMBINATION: ALST 4.66
 * kg/m² (At-Risk, <5.5) + BMI 17.4 (Underweight, <18.5) is the specific
 * numeric pattern CLAUDE.md's Evidence-Based Science Layer names
 * "sarcopenic obesity profile" — stated explicitly in baselineNotes as her
 * top clinical priority, with the counterintuitive label reconciled against
 * her actual composition (Body Fat 30.9%, Styku's own "Fit" tier in
 * isolation, is nonetheless a disproportionate share of an already-depleted
 * 76.9 lb lean mass total — low muscle mass + relatively elevated fat
 * proportion despite low total bodyweight is the compositional signature
 * the flag names, not a contradiction of "Underweight").
 *
 * BASELINE BATTERY — epley1RM()/workingLoad() used for every lift with real
 * weight+reps data (Hex Bar Deadlift, Squat, Hip Thrust, Single-Leg RDL,
 * Single-Leg Stance Squat) at a 75%->85% Week1->Week4 ramp, matching the
 * reference scripts' convention. Overhead Press was explicitly "Not
 * Tested" (per the shoulder-reintroduction note) and gets RIR/pain-free-ROM
 * autoregulation instead — no %1RM table, per Priority #1 above. Single-Arm
 * Row (20 lbs, no rep count given) and Kieser Pulldown (13.5 — a Kieser
 * pin-loaded/pneumatic-machine reading, NOT free-weight lbs, presented as
 * such rather than silently relabeled) both get descriptive/reference
 * framing, matching how Vinz Feller's/Moe Shahheidari's untested reference
 * loads are handled — no fabricated precise max for either.
 *
 * ASYMMETRY: weakerSide(7.0, 6.2) [arms] resolves to 'right' — right arm
 * leads all unilateral rowing/pressing (Single-Arm Row, Day 1; Suitcase
 * Carry, Day 3, per the Asymmetry Protocol's "weaker HAND holds the
 * suitcase load" rule). weakerSide(12.7, 13.5) [legs] resolves to 'left' —
 * left leg leads all unilateral leg work (Single-Leg Stance Squat and
 * Single-Leg RDL, Day 2; carried into Day 3's activation carryover). Both
 * gaps (0.8 lbs) sit above the 0.5 lb Asymmetry Protocol trigger.
 *
 * REVISION (8/13/2026, roster cross-check from icons-roster-analyst) — POWER
 * TRAINING ADDED, 55-65 BRACKET: CLAUDE.md's Power Training section places
 * sub-maximal-load/maximal-intent power work in the 55-65 bracket already,
 * not just 65+ (power output declines before strength does). Her three
 * existing Metabolic-finisher blocks (Bike Intervals, Standing March w/
 * Band, Incline Treadmill Walk) are general conditioning, not power work.
 * Day 3, Block F is new: Box Step-Up Jump — bodyweight, full recovery
 * between sets, deliberately NOT an overhead movement given the left
 * shoulder reintroduction underway in Blocks A/C on Days 1 and 3 (no
 * overhead med ball throw or similar). Full recovery between sets is the
 * defining design feature of power work, distinct from a metabolic
 * stimulus — it does not compete with the deliberately brief metabolic
 * finishers elsewhere in this program, which stay short specifically to
 * protect recovery capacity for the ALST At-Risk/Underweight resistance
 * priority (see the sarcopenic-profile baselineNote). The prior Block F
 * (Metabolic Finisher) is renumbered to Block G; nothing else on Day 3
 * changed.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad, weakerSide,
} = require('./icons_template');

// ── Convert tested weight/rep data into working loads ──────────────────
const oneRM = {
  hexDL: epley1RM(85, 5),        // 99
  squat: epley1RM(25, 5),        // 29
  hipThrust: epley1RM(35, 5),    // 41
  slRDL: epley1RM(25, 5),        // 29
  slStanceSquat: epley1RM(12, 5), // 14
};

const wk1 = {
  hexDL: workingLoad(oneRM.hexDL, 0.75, 5),               // 75
  squat: workingLoad(oneRM.squat, 0.75, 5),                // 20
  hipThrust: workingLoad(oneRM.hipThrust, 0.75, 5),        // 30
  slRDL: workingLoad(oneRM.slRDL, 0.75, 2.5),              // 22.5
  slStanceSquat: workingLoad(oneRM.slStanceSquat, 0.75, 2.5), // 10
};

const wk4 = {
  hexDL: workingLoad(oneRM.hexDL, 0.85, 5),                // 85
  squat: workingLoad(oneRM.squat, 0.85, 5),                // 25
  hipThrust: workingLoad(oneRM.hipThrust, 0.85, 5),        // 35
  slRDL: workingLoad(oneRM.slRDL, 0.85, 2.5),              // 25
  slStanceSquat: workingLoad(oneRM.slStanceSquat, 0.85, 2.5), // 12.5
};

const client = {
  name: 'Siobhan Hansen',
  programTitle: '3-Day Training Plan',
  subtitle: 'Sarcopenia-Priority Strength Build · Shoulder Reintroduction & Scapular Foundation',
  schedule: '3x/Week · Full Gym',
  stats: ['Age 59', "5'9\"", '118 lbs', 'Postmenopausal', 'Styku Scan 7/29/2026'],
  weightKg: 53.5,
  ageYears: 59,
  isPostmenopausal: true,
  bmr: 1230,
  alstIndex: 4.66, // At-Risk — sarcopenia priority, see baselineNotes
};

const styku = {
  scanDate: '7/29/2026',
  bodyFatPct: 30.9,
  bodyFatRank: 'Fit',
  leanMass: 76.9,
  leanMassPct: 65.3,
  fatMass: 36.4,
  boneMass: 4.6,
  bmi: 17.4,
  bmr: 1230,
  vfa: 70.8,
  shapeScore: 72,
  shapeScoreLabel: 'Good',
  alstIndex: 4.66,
  leftArmLST: 7.0,
  rightArmLST: 6.2,
  leftLegLST: 12.7,
  rightLegLST: 13.5,
  peerComparison: "Lower body fat than 60% of Styku's peer comparison group — reads favorably in isolation, but see the ALST At-Risk + BMI Underweight note below for why this is not the governing clinical read on its own.",
};

// weakerSide() — lower LST = weaker = leads unilateral work.
const armWeakerSide = weakerSide(styku.leftArmLST, styku.rightArmLST); // 'right'
const legWeakerSide = weakerSide(styku.leftLegLST, styku.rightLegLST); // 'left'

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Upper Body —\nShoulder Reintroduction' },
  { day: 'DAY 2', intensity: 70, focus: 'Lower Body —\nLeft-Led Unilateral' },
  { day: 'DAY 3', intensity: 80, focus: 'Posterior Chain —\nFull-Body Strength' },
];

const baselines = [
  ['Hex Bar Deadlift', `85 lbs x 5 (Epley 1RM ≈${oneRM.hexDL} lbs)`, '7/29/2026', `Wk1: ${wk1.hexDL} lbs x5 → Wk4: ${wk4.hexDL} lbs x5 — 75%→85% 1RM ramp`],
  ['Squat', `25 lbs x 5 (Epley 1RM ≈${oneRM.squat} lbs)`, '7/29/2026', `Wk1: ${wk1.squat} lbs x5 → Wk4: ${wk4.squat} lbs x5`],
  ['Hip Thrust (DB)', `35 lbs x 5 (Epley 1RM ≈${oneRM.hipThrust} lbs)`, '7/29/2026', `Wk1: ${wk1.hipThrust} lbs x8 → Wk4: ${wk4.hipThrust} lbs x8`],
  ['Single-Leg RDL', `25 lbs x 5 (Epley 1RM ≈${oneRM.slRDL} lbs)`, '7/29/2026', `Wk1: ${wk1.slRDL} lbs/side x6 → Wk4: ${wk4.slRDL} lbs/side x6 — left leg leads`],
  ['Single-Leg Stance Squat', `12 lbs x 5 (Epley 1RM ≈${oneRM.slStanceSquat} lbs)`, '7/29/2026', `Wk1: ${wk1.slStanceSquat} lbs x6 → Wk4: ${wk4.slStanceSquat} lbs x6 — left leg leads`],
  ['Overhead Press', 'Not Tested — Reintroducing After Prior Suspension', '7/29/2026', 'Progressive strengthening, pain-free ROM only — load builds week to week, autoregulated by RIR, not a fixed %1RM table'],
  ['Single-Arm Row', '20 lbs (reference load, reps not recorded)', '7/29/2026', 'Build progressively at 1-2 RIR — right arm leads (weaker side)'],
  ['Farmers Carry', '25 lbs/hand', '7/29/2026', 'Hold at 25-30 lbs/hand for volume; add 5 lbs/hand at the 8-week retest if quality holds'],
  ['Incline Push-Up', '10 reps (bodyweight)', '7/29/2026', 'Target 14-16 clean reps by Week 8'],
  ['Plank Hold', '1:04 (64 sec)', '7/29/2026', 'Target 1:30-1:45 by Week 8'],
  ['Kieser Pulldown', '13.5 (Kieser pin-loaded/pneumatic resistance units — not directly comparable to a free-weight lbs figure)', '7/29/2026', 'Track Kieser-unit progression on the same machine session to session, not converted to a free-weight equivalent'],
  ['Assisted Pull-Ups', '5 reps x close, standard, and wide grip', '7/29/2026', 'Gated behind Day 1\'s scapular strengthening block — reduce assistance / add volume only once scapular criteria are consistently met'],
];

const baselineNotes = [
  {
    type: 'clinical',
    label: 'ALST At-Risk + BMI Underweight — Sarcopenic Profile, Top Clinical Priority',
    body: `Combined ALST Index ${styku.alstIndex} kg/m² (At-Risk, <5.5 threshold) and BMI ${styku.bmi} (Underweight, <18.5) is a numeric combination known clinically as a "sarcopenic obesity profile" — the top clinical priority in this program. The label reads counterintuitively against a client presenting as clinically underweight, but the underlying composition is consistent with it, not contradicted by it: Body Fat ${styku.bodyFatPct}% (${styku.fatMass} lbs fat mass) is Styku's own "Fit" tier in isolation, yet against a lean mass of only ${styku.leanMass} lbs (${styku.leanMassPct}%) and an ALST Index well below the sarcopenia threshold, that fat mass represents a disproportionate share of an already-depleted total body composition — low muscle mass co-occurring with a relatively elevated fat proportion despite low total bodyweight is the compositional signature this flag is naming. This is the top programming priority in this document: muscle-building is the primary physiological goal of every session, progressive resistance is prioritized on all three training days, protein/creatine escalate per the tier below, and no metabolic finisher in this plan is allowed to compromise recovery capacity for the resistance work driving this goal.`,
  },
  {
    type: 'red',
    label: 'Left Shoulder — Overhead Work Actively Reintroduced After Prior Suspension',
    body: `Previously documented left shoulder pain on overhead raising led to overhead pressing being fully suspended. The current trainer note — "Over Head Left Side Raising Shoulder Pain... Strengthen overhead (Not Tested)" — is an intentional progression, not a silent reversal of that caution: overhead work is now being actively, carefully reintroduced under close pain-monitoring, following the same "strengthen with precautions, not restrictions" principle already established for shoulder flags in this system. Every session with overhead pressing (Day 1, with a brief continued check-in on Day 3) opens with a dedicated Isolated-zone shoulder corrective/prep block — external/internal rotation, scapular stability, controlled shoulder flexion — sequenced BEFORE any pressing, per "control precedes power." Because overhead press was never load-tested, its progression is autoregulated by pain-free range of motion and RIR, not a fixed %1RM table — there is no baseline 1RM to build a percentage table from. Pain-monitoring language is explicit and consistent throughout: sharp or pinching pain during a set, or pain lasting beyond 24 hours, is the real stop signal — regress the range or substitute the exercise; ordinary muscular fatigue or normal training soreness is expected and is not a stop signal.`,
  },
  {
    type: 'purple',
    label: 'Scapular Strength — Required Gate Before Pull-Up Progression',
    body: `Trainer note: "Before doing pull ups needs scapula strength." This is a direct sequencing instruction, not a general suggestion — a dedicated scapular strengthening block (scapular retraction/depression, controlled scapular dead hangs, band pull-aparts) precedes and gates her assisted pull-up progression on Day 1, consistent with ICONS's "control precedes power" philosophy, and is directly connected to the shoulder-reintroduction priority above: scapular stability is foundational support for both the overhead pressing work and any future pull-up loading. Assisted Pull-Ups were tested at intake (5 reps x close, standard, and wide grip) and are documented as a baseline reference in the table below, but formal loaded progression — reduced assistance, added volume — is deferred until the scapular block's own strength criteria are consistently met: clean band pull-aparts 3x15 and a controlled 20-second scapular dead hang with no compensatory shrug are the working benchmark. Kieser Pulldown (machine-guided, lower coordination demand) serves as her active pull-strength pathway exercise in the meantime.`,
  },
  {
    type: 'teal',
    label: 'Styku Findings — Body Composition, VFA & Bone Mass',
    body: `Lean Mass ${styku.leanMass} lbs (${styku.leanMassPct}%), Fat Mass ${styku.fatMass} lbs, Bone Mass ${styku.boneMass} lbs, BMR ${styku.bmr} cal/day, Shape Score ${styku.shapeScore}/100 — "${styku.shapeScoreLabel}." VFA ${styku.vfa} cm² falls in the ICONS VFA table's Low Risk band (70-99 cm²) but sits just above the <70 cm² Very Low Risk cutoff — worth tracking at the 8-week rescan alongside the composition priorities above rather than treated as a standalone concern on its own. BMI ${styku.bmi} is a clinical Underweight flag (<18.5) regardless of the "Fit" body-fat-percentage reading — see the governing sarcopenic-profile note above for how these findings interact.`,
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Right Arm Leads Pull/Press, Left Leg Leads Unilateral Work',
    body: `Arms: Left ${styku.leftArmLST} lbs / Right ${styku.rightArmLST} lbs — a 0.8 lb gap, above the 0.5 lb Asymmetry Protocol trigger. RIGHT arm is weaker (lower LST) and leads every unilateral rowing/pressing exercise across this program (Single-Arm Row, Day 1; Suitcase Carry, Day 3 — the weaker hand holds the load, per the Asymmetry Protocol's anti-lateral-flexion rule). Legs: Left ${styku.leftLegLST} lbs / Right ${styku.rightLegLST} lbs — also a 0.8 lb gap, above trigger. LEFT leg is weaker and leads every unilateral leg exercise (Single-Leg Stance Squat and Single-Leg RDL, Day 2; carried forward into Day 3's activation work). Reps/loads are logged per side; track both gaps at the 8-week Styku rescan.`,
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Age Bracket & Postmenopausal Status — 55-65 Bracket',
    body: `At 59, Siobhan sits within CLAUDE.md's 55-65 "Postmenopausal" Age Bracket. isPostmenopausal is a confirmed, already-documented fact (not inferred from today's build), so pelvicFloorCallout() fires automatically on every day containing squat, deadlift/RDL, hip-thrust, or carry content — Days 2 and 3 in this program — and is left to fire naturally throughout, never suppressed. Protein escalates to the 2.0-2.2 g/kg ALST At-Risk/50+ tier: at her 53.5 kg bodyweight that resolves to 107-118g/day, matching her already-documented protein target exactly. Creatine is strongly indicated. LIFTMOR-style bone-loading candidacy (T-score < -1.0) is worth screening for as part of ongoing care, though no DEXA/T-score data is currently on file to confirm candidacy either way.`,
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Power Training Added — 55-65 Bracket (8/13/2026)',
    body: 'CLAUDE.md\'s Power Training section places sub-maximal-load, maximal-intent power work in the 55-65 bracket already, not just 65+ — power output declines before strength does, so waiting until 65 is a real cost. Day 3, Block F now includes a Box Step-Up Jump: bodyweight, full recovery between sets, and deliberately a lower-body movement — no overhead component, given the left shoulder reintroduction still underway in Blocks A and C. Full recovery between sets is the defining design feature of power work, distinct from a metabolic stimulus, so it does not compete with the deliberately brief metabolic finishers used elsewhere in this program, which stay short specifically to protect recovery capacity for the ALST At-Risk/Underweight resistance-training priority named above.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'DAY 1 — UPPER BODY: SHOULDER REINTRODUCTION & SCAPULAR FOUNDATION',
    subtitle: 'Overhead Pressing Actively Reintroduced · Scapular Strength Gates Pull-Up Progression',
    descriptor: 'TECHNIQUE DAY · SHOULDER CARE PRIORITY · PULL-UP PATHWAY GATED',
    intensityLabel: '60% Day',
    intensityPara: 'Technique day — form over load, no PRs. Overhead pressing is being actively, carefully reintroduced today after a prior period of full suspension; the corrective and scapular blocks below earn that reintroduction before any pressing happens. Muscle-building remains the session\'s primary goal given her ALST At-Risk status — every block here is real progressive-resistance work, not filler. Work every set at 3+ RIR.',
    warmUp: '5 min bike, band pull-apart x15, scapular wall slide x10, arm circles x10/direction (pain-free range only), cat-cow x8',
    blocks: [
      {
        letter: 'A',
        title: 'SHOULDER REINTRODUCTION — CORRECTIVE PRIORITY',
        color: 'red',
        introLabel: 'Why',
        intro: 'Left shoulder overhead work was previously suspended due to pain; it is now being actively reintroduced under close pain-monitoring, not avoided. This block earns pain-free control through rotation and controlled flexion before any pressing — "control precedes power." Sharp or pinching pain is the stop signal here, clearly distinct from normal training fatigue.',
        exercises: [
          { name: 'Band External Rotation (Elbow at Side)', sets: '3', reps: '12/side', load: 'light band', tempo: '2-1-2', rest: '45s', flag: 'Left shoulder — stop at sharp/pinching pain, not fatigue', cue: 'Elbow pinned to ribs, rotate within pain-free range only.' },
          { name: 'Band Internal Rotation (Elbow at Side)', sets: '3', reps: '12/side', load: 'light band', tempo: '2-1-2', rest: '45s', flag: 'Respect current ROM — never force end-range', cue: 'Small controlled arc, stop well short of any pinch.' },
          { name: 'Controlled Shoulder Flexion Raise', sets: '2', reps: '10', load: '2-3 lbs / light band', tempo: '3-1-2', rest: '45s', flag: 'Left side — pain-free range only, first overhead reintroduction rep', cue: 'Raise only to the point before any pinch, slow controlled return.' },
          { name: 'Scapular Wall Slide', sets: '2', reps: '10', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Ribs down, slide within comfortable range, low back flat.' },
        ],
      },
      {
        letter: 'B',
        title: 'SCAPULAR STRENGTH — PULL-UP PATHWAY GATE',
        color: 'purple',
        introLabel: 'Why',
        intro: 'Trainer instruction: "Before doing pull ups needs scapula strength." This dedicated block is the strengthening protocol itself, not a warm-up throwaway, and gates her Assisted Pull-Up progression (tested at intake — 5 reps x close, standard, wide grip — see baselines table). Loaded progression on pull-ups is deferred until this block\'s own criteria are consistently clean: band pull-aparts 3x15 and a controlled 20-second scapular dead hang with no compensatory shrug.',
        exercises: [
          { name: 'Scapular Retraction & Depression Hold', sets: '3', reps: '10', load: 'bodyweight', tempo: '2s hold', rest: '30s', cue: 'Pull shoulder blades down and back, hold, no shrug.' },
          { name: 'Band Pull-Apart', sets: '3', reps: '15', load: 'light-mod band', tempo: '2-1-2', rest: '30s', cue: 'Squeeze shoulder blades together, arms stay near shoulder height.' },
          { name: 'Scapular Dead Hang (Assisted, Controlled)', sets: '2', reps: '15-20s', load: 'bodyweight, assisted', tempo: 'hold', rest: '45s', cue: 'Active scapular engagement, not a passive hang — shoulders set, not shrugged.' },
          { name: 'Assisted Pull-Up (Baseline Reference — Not Yet Progressing)', sets: '1', reps: '5', load: 'assisted, close/standard/wide grip', tempo: 'controlled', rest: '60s', flag: 'Gated — hold at tested baseline until scapular criteria above are consistently met', cue: 'Full hang to chin-over-bar; log clean reps per grip, do not chase volume yet.' },
        ],
      },
      {
        letter: 'C',
        title: 'PRIMARY STRENGTH — OVERHEAD PRESS (PROGRESSIVE REINTRODUCTION)',
        introLabel: 'Load Target',
        intro: 'Never load-tested, so there is no 1RM to build a percentage table from. Progression is autoregulated entirely by pain-free range of motion and RIR — start light, add load only when full pain-free range and 2 RIR are both met with clean form.',
        exercises: [
          { name: 'Seated DB Overhead Press', sets: '3', reps: '6-8', load: 'self-select ~3-5 lbs, build weekly', tempo: '2-0-2', rest: '90s', flag: 'Left shoulder — progress only within pain-free range', cue: 'Ribs stacked over hips, press within comfortable range only.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'PULL STRENGTH — RIGHT ARM LEADS',
        color: 'purple',
        introLabel: 'Load Target',
        intro: 'Kieser Pulldown is her active pull-strength pathway exercise while pull-up loading stays gated — track progression in Kieser units on the same machine, not converted to a free-weight number. Single-Arm Row is led by the right arm (weaker side, per Styku LST).',
        exercises: [
          { name: 'Kieser Pulldown', sets: '3', reps: '10-12', load: 'Kieser 13.5 units, build weekly on same machine', tempo: '2-1-2', rest: '75s', cue: 'Full controlled range, chest tall, no momentum.' },
          { name: 'Single-Arm DB Row (Right-Led)', sets: '3', reps: '10/side', load: '20 lbs (reference), build progressively', tempo: '2-1-2', rest: '75s', flag: 'Right arm weaker (Styku) — leads every set', cue: 'Right arm first. Flat back, pull to hip, squeeze at top.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'PUSH ACCESSORY — INCLINE PUSH-UP PROTOCOL',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'Baseline 10 reps, bodyweight — controlled, non-overhead pressing range that is well-tolerated alongside the shoulder reintroduction work above.',
        exercises: [
          { name: 'Incline Push-Up', sets: '3', reps: '8-10', load: 'bodyweight (bench)', tempo: '3-1-1', rest: '60s', cue: 'Baseline 10 reps. Hands under shoulders, chest to bench, brace.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'F',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'A short, low-impact finisher — kept brief given the ALST At-Risk/Underweight priority above, so conditioning volume never competes with recovery capacity for the resistance work driving this plan.',
        exercises: [
          { name: 'Bike Intervals (Easy-Moderate)', sets: '4', reps: '20 sec on/40 off', load: 'easy-moderate', tempo: 'controlled', rest: '40 sec', cue: 'Brisk and sustainable — not a max-effort test.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 20s/side (light, pain-free only), cross-body shoulder stretch 20s/side (light), child\'s pose 45s',
    iconsNote: 'Overhead pressing is being actively reintroduced today, not restricted — this is progressive strengthening within her current pain-free range. Sharp or pinching pain is the stop signal; ordinary fatigue and normal soreness are fine and expected. Scapular strength work is gating her pull-up progression, not a placeholder — hold Assisted Pull-Ups at the tested baseline until the block\'s own criteria are consistently met.',
  },
  {
    intensity: 70,
    title: 'DAY 2 — LOWER BODY: UNILATERAL FOUNDATION, LEFT-LED',
    subtitle: 'Squat · Single-Leg Stance Squat · Single-Leg RDL — Left Leg Leads',
    descriptor: 'MODERATE VOLUME DAY · LEFT-LEG ASYMMETRY PROTOCOL · MUSCLE-BUILDING PRIORITY',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate day — build clean volume without peak fatigue. Muscle-building is the primary physiological goal of this session given her ALST At-Risk status: every set here is real progressive resistance, not maintenance. Left leg leads every unilateral exercise per Styku\'s 0.8 lb segmental LST gap. Work at 2-3 RIR.',
    warmUp: '5 min bike, banded lateral walk x10/side, glute bridge x10, standing hip abduction x10/side, bodyweight squat x8',
    blocks: [
      {
        letter: 'A',
        title: 'HIP & SINGLE-LEG STANCE ACTIVATION',
        color: 'red',
        introLabel: 'Why',
        intro: 'Primes glute medius and hip stabilizers ahead of the loaded single-leg work below — left leg leads throughout given the segmental LST gap.',
        exercises: [
          { name: 'Banded Clamshell', sets: '2', reps: '15/side', load: 'mini band', tempo: '2-1-2', rest: '30s', cue: 'Hips stacked, heels together, squeeze glute med at top.' },
          { name: 'Bird Dog', sets: '2', reps: '8/side', load: 'bodyweight', tempo: '2-2-2', rest: '30s', cue: 'Neutral spine, reach long, no hip rotation.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — SQUAT & SINGLE-LEG STANCE SQUAT (LEFT-LED)',
        introLabel: 'Load Target',
        intro: `Squat tested at 25 lbs x5 (Epley 1RM ≈${oneRM.squat} lbs) — Week 1 trains at ${wk1.squat} lbs, climbing to ${wk4.squat} lbs by Week 4. Single-Leg Stance Squat tested at 12 lbs x5 (Epley 1RM ≈${oneRM.slStanceSquat} lbs) — Week 1 trains at ${wk1.slStanceSquat} lbs, climbing to ${wk4.slStanceSquat} lbs — left leg leads every set.`,
        exercises: [
          { name: 'Squat', sets: '3', reps: '6-8', load: `Wk1: ${wk1.squat} lbs → Wk4: ${wk4.squat} lbs`, tempo: '3-1-1', rest: '90s', cue: 'Elbows tracking, chest tall, full comfortable depth.', rirNote: '2 RIR' },
          { name: 'Single-Leg Stance Squat (Left-Led)', sets: '3', reps: '6/side', load: `Wk1: ${wk1.slStanceSquat} lbs → Wk4: ${wk4.slStanceSquat} lbs`, tempo: '3-1-1', rest: '75s', flag: 'Left leg weaker (Styku) — leads every set', cue: 'Left leg first. Slow controlled descent, knee tracks mid-foot.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'SECONDARY COMPOUND — SINGLE-LEG RDL (LEFT-LED)',
        introLabel: 'Load Target',
        intro: `Tested at 25 lbs x5 (Epley 1RM ≈${oneRM.slRDL} lbs) — Week 1 trains at ${wk1.slRDL} lbs/side, climbing to ${wk4.slRDL} lbs/side by Week 4. Left leg leads every set.`,
        exercises: [
          { name: 'Single-Leg RDL (Left-Led)', sets: '3', reps: '6/side', load: `Wk1: ${wk1.slRDL} lbs → Wk4: ${wk4.slRDL} lbs`, tempo: '3-1-1', rest: '75s', flag: 'Left leg weaker (Styku) — leads every set', cue: 'Left leg first. Hinge, flat back, soft knee.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC FINISHER',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Short, low-impact finisher — kept brief so it never competes with recovery capacity for the resistance-priority work above, given the ALST At-Risk/Underweight programming priority.',
        exercises: [
          { name: 'Standing March w/ Band', sets: '3', reps: '10/side', load: 'light band', tempo: 'controlled', rest: '30s', cue: 'Knee to hip height, stand tall, no lean.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, seated figure-4 hip stretch 30s/side, child\'s pose 45s',
    iconsNote: 'Left leg leads every unilateral set this session — Styku shows a 0.8 lb segmental gap (12.7 vs 13.5 lbs), above the 0.5 lb asymmetry trigger. Track the gap at the 8-week rescan. Muscle-building remains the session\'s primary goal given ALST At-Risk status — no set here is filler.',
  },
  {
    intensity: 80,
    title: 'DAY 3 — POSTERIOR CHAIN & FULL-BODY STRENGTH',
    subtitle: 'Hex Bar Deadlift · Hip Thrust · Loaded Carries — Right-Arm & Left-Leg Asymmetry Protocol',
    descriptor: 'PRIMARY STRENGTH DAY · TESTED BASELINES · MUSCLE-BUILDING PRIORITY',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day, built on her strongest tested numbers (Hex Bar Deadlift 85 lbs x5, Epley 1RM ≈99 lbs). Last 1-2 reps hard but achievable — muscle-building is the primary physiological goal given ALST At-Risk status. Left leg leads unilateral leg work, right arm leads the suitcase carry. Shoulder work stays pain-free per Day 1\'s protocol.',
    warmUp: '5 min bike, banded lateral walk x10/side, glute bridge x10, arm circles x10/direction (pain-free range only)',
    blocks: [
      {
        letter: 'A',
        title: 'HIP ACTIVATION CARRYOVER',
        color: 'red',
        introLabel: 'Why',
        intro: 'Same hip-activation priority carried forward from Day 2, condensed here to prime glute medius and hip external rotators before the heavy hinge work below.',
        exercises: [
          { name: 'Banded Clamshell', sets: '2', reps: '12/side', load: 'mini band', tempo: '2-1-2', rest: '30s', cue: 'Heels together, squeeze glute med at top.' },
          { name: 'Standing Banded Hip Abduction', sets: '2', reps: '10/side', load: 'band', tempo: '2-0-1', rest: '30s', cue: 'Tall posture, drive knee out, no torso lean.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — HEX BAR DEADLIFT & HIP THRUST',
        introLabel: 'Load Target',
        intro: `Hex Bar Deadlift tested at 85 lbs x5 (Epley 1RM ≈${oneRM.hexDL} lbs) — Week 1 trains at ${wk1.hexDL} lbs, climbing to ${wk4.hexDL} lbs by Week 4. Hip Thrust tested at 35 lbs x5 (Epley 1RM ≈${oneRM.hipThrust} lbs) — Week 1 trains at ${wk1.hipThrust} lbs, climbing to ${wk4.hipThrust} lbs.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `Wk1: ${wk1.hexDL} lbs → Wk4: ${wk4.hexDL} lbs`, tempo: '2-0-1', rest: '2 min', cue: 'Neutral spine, brace hard, push floor away evenly.', rirNote: '1-2 RIR' },
          { name: 'DB Hip Thrust', sets: '3', reps: '8', load: `Wk1: ${wk1.hipThrust} lbs → Wk4: ${wk4.hipThrust} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Drive through heels, glutes lock at top.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'SHOULDER & PULL CHECK-IN — CONTINUED REINTRODUCTION',
        color: 'red',
        introLabel: 'Why',
        intro: 'A brief continued check-in, not a full repeat of Day 1\'s corrective block — confirms the reintroduction is progressing cleanly before the next Day 1 session. Same pain-monitoring rule applies: sharp/pinching pain stops the set, ordinary fatigue does not.',
        exercises: [
          { name: 'Standing DB Overhead Press', sets: '2', reps: '6-8', load: 'continue from Day 1 working load', tempo: '2-0-2', rest: '90s', flag: 'Left shoulder — pain-free range only', cue: 'Same working load as Day 1 unless pain-free range has clearly expanded.', rirNote: '2 RIR' },
          { name: 'Kieser Pulldown', sets: '2', reps: '10-12', load: 'continue from Day 1 Kieser units', tempo: '2-1-2', rest: '75s', cue: 'Full controlled range, chest tall, no momentum.' },
        ],
      },
      {
        letter: 'D',
        title: 'LOADED CARRIES — ASYMMETRY PROTOCOL',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'Farmers Carry tested bilaterally at 25 lbs/hand. Suitcase Carry adds the Asymmetry Protocol\'s single-hand rule directly — the weaker (right) hand holds the load, training anti-lateral-flexion through the opposite side.',
        exercises: [
          { name: 'DB Farmers Carry', sets: '3', reps: '30-40 yd', load: '25 lbs/hand', tempo: 'controlled', rest: '60s', cue: 'Tall posture, ribs down, quick tight steps.', rirNote: '2 RIR' },
          { name: 'Suitcase Carry (Right-Led)', sets: '2', reps: '20-30 yd/side', load: '15-20 lbs', tempo: 'controlled', rest: '45s', flag: 'Right hand holds the weight — weaker arm (Styku)', cue: 'Right hand loaded. Resist leaning — ribs stacked over hips.' },
        ],
      },
      {
        letter: 'E',
        title: 'CORE — PLANK PROTOCOL',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'Progression from the tested 1:04 plank baseline, paired with anti-rotation core work supporting posture under all the compound lifts above.',
        exercises: [
          { name: 'Plank Hold', sets: '3', reps: '45-60s', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Baseline 1:04. Ribs down, glutes tight, breathe steady.' },
          { name: 'Half-Kneeling Pallof Press', sets: '2', reps: '10/side', load: 'light band', tempo: '2s hold', rest: '30s', cue: 'Resist rotation, ribs stacked over hips.' },
        ],
      },
      {
        letter: 'F',
        title: 'POWER TRAINING — LOWER BODY (55-65 BRACKET)',
        introLabel: 'Why',
        intro: 'Muscle power — moving a sub-maximal load with maximal intent — predicts functional independence and longevity in older women more strongly than strength alone, and belongs in the 55-65 bracket already, not just 65+. This is deliberately a lower-body movement, not overhead, given the shoulder reintroduction still underway in Blocks A and C. Full recovery between sets is the point — this is a velocity stimulus, not a conditioning one, so it does not compete with Block G\'s deliberately brief finisher below.',
        exercises: [
          { name: 'Box Step-Up Jump (Submaximal, Full Recovery)', sets: '3', reps: '3', load: 'bodyweight, low box (~10-12")', tempo: 'explosive up, soft controlled landing', rest: '120s', cue: 'Drive up with real intent, land soft and controlled. Full recovery — not a metabolic set.' },
        ],
      },
      {
        letter: 'G',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Closing conditioning, kept low-impact and brief given the volume of the day and the ALST At-Risk/Underweight recovery priority.',
        exercises: [
          { name: 'Incline Treadmill Walk (Brisk)', sets: '1', reps: '6-8 min', load: 'brisk, sustainable pace', tempo: 'steady', rest: '—', cue: 'Energy becomes identity — hold posture through the finish.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, seated figure-4 hip stretch 30s/side, doorway chest stretch 20s/side (light), child\'s pose 45s',
    iconsNote: 'Left leg leads every unilateral leg set, right hand leads the suitcase carry — both per Styku\'s 0.8 lb segmental gaps, above the 0.5 lb asymmetry trigger. Shoulder and pull work continue their pain-free progression from Day 1; sharp or pinching pain is still the stop signal, ordinary fatigue is not. Muscle-building stays the top priority — every block here is real progressive resistance.',
  },
];

const summary = {
  subtitle: 'Siobhan Hansen  ·  ICONS Index  ·  3-Day Sarcopenia-Priority Strength Build  ·  Week 1',
  rows: [
    ['Day 1', '60%', 'Upper Body — Shoulder Reintroduction & Scapular Foundation', 'Overhead Press · Kieser Pulldown · Single-Arm Row', 'Overhead press progresses only via pain-free ROM + RIR; scapular criteria (band pull-apart 3x15, 20s dead hang) gate pull-up loading.'],
    ['Day 2', '70%', 'Lower Body — Left-Led Unilateral Foundation', 'Squat · Single-Leg Stance Squat · Single-Leg RDL', `Loads build off tested baselines (Squat Epley 1RM ≈${oneRM.squat} lbs); left leg leads every unilateral set per 0.8 lb Styku gap.`],
    ['Day 3', '80%', 'Posterior Chain — Full-Body Strength', 'Hex Bar Deadlift · Hip Thrust · Farmers/Suitcase Carry', `Loads build off tested baselines (Deadlift Epley 1RM ≈${oneRM.hexDL} lbs); right hand leads suitcase carry, left leg leads unilateral work.`],
  ],
  milestones4wk: `Hex Bar Deadlift toward ${wk4.hexDL + 10} lbs x5, Squat toward ${wk4.squat + 5} lbs x6-8, Hip Thrust toward ${wk4.hipThrust + 5} lbs x8, all at 2-3 RIR. Overhead Press showing genuine week-over-week pain-free ROM expansion (not a fixed load target). Scapular block criteria (band pull-apart 3x15, 20s controlled dead hang) consistently clean — first checkpoint toward reduced pull-up assistance. Left-leg single-leg RDL/stance-squat loads matched toward parity with the right within 10%.`,
  milestones8wk: 'Hex Bar Deadlift, Squat, and Hip Thrust progressed from current tested baselines. Overhead Press fully pain-free through an expanded range, no sharp/pinching flags logged. Assisted Pull-Ups showing real reduced-assistance progression, gated release confirmed by scapular criteria being met. Plank hold past 1:30. Left/right leg and right/left arm LST gaps reduced from 0.8 lbs.',
  rescanNote: `Rebook Styku scan at 8 weeks. Track: ALST Index trend (currently ${styku.alstIndex} kg/m², At-Risk — the top clinical priority), BMI trend (currently ${styku.bmi}, Underweight), VFA (currently ${styku.vfa} cm², Low Risk — maintain), left/right leg and right/left arm LST gaps (baseline 0.8 lbs each, target under 0.5), lean mass (currently ${styku.leanMass} lbs — build), and continued shoulder/scapular progress.`,
};

const data = {
  client,
  styku,
  baselines,
  baselineNotes,
  weekOverview,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'siobhan_hansen');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Siobhan_Hansen_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — no clientHighlight set: this is a
  // first-build program with no prior version/PR on file to compare
  // against, so per CLAUDE.md's Client View spec, nothing is fabricated.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Siobhan_Hansen_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
