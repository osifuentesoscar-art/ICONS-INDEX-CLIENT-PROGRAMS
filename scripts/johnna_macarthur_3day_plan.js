/**
 * Johnna Macarthur — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * Brand-new client. Built from a Styku scan (8/12/2026, Brace Life Studios)
 * and a client-reported baseline strength battery. Structural references:
 * scripts/johanna_castillo_3day_plan.js (squat/deadlift-not-tested ->
 * today's-loads-become-the-new-baseline pattern) and
 * scripts/nancy_avitable_3day_plan.js (generic DAY 1/2/3 labels — no
 * weekday schedule was supplied at intake, so none is invented here).
 *
 * CLINICAL / PROGRAMMING PRIORITIES FROM INTAKE (all real emphasis, not
 * passing mentions — see the day content and baselineNotes below):
 *   1. Hip activation & strengthening — dedicated Isolated-zone corrective
 *      block on Day 1 AND carried forward on Day 3 immediately before the
 *      heavy hip-hinge work, not a warm-up line.
 *   2. 90/90 hip mobility/rotation drill — opens the warm-up on Days 1 and 3
 *      AND appears as a scored exercise inside Block A on Day 1 (not just a
 *      warm-up mention), per the brief's "warm-up OR Isolated-zone corrective
 *      content" instruction — used both ways here.
 *   3. Tibialis anterior strength + adductor/inner-thigh activation — paired
 *      corrective block on Day 1 (Block C) and reinforced under load on
 *      Day 3 (Block C), pairing tibialis raises/banded dorsiflexion with
 *      Copenhagen-style/side-lying adductor work exactly as specified.
 *   4. Frozen shoulder (adhesive capsulitis) history, needs internal-
 *      rotation strengthening — dedicated red corrective block on Day 2,
 *      sequenced BEFORE any overhead/compound pressing ("control precedes
 *      power"). Framed as active strengthening within her current pain-free
 *      range, never forcing end-range; sharp/pinching pain is the explicit
 *      stop signal, distinct from normal training fatigue. No PT-coordination
 *      language and no in-house staff (Jason Bethea/Niko Heers) named — none
 *      was stated as involved for this client, unlike Moe Shahheidari's case;
 *      this stays a self-contained corrective priority per the brief.
 *
 * DEMOGRAPHIC SCOPE: age 54 -> CLAUDE.md's 45-55 "Perimenopause / Menopause
 * Transition" bracket. This is a standard women's-bracket client — no
 * demographic-scope-exclusion content is needed (unlike Jake Poyner, Vinz
 * Feller, or Moe Shahheidari's male-framework documents).
 *   - weightKg/ageYears/alstIndex are all on file, so proteinTargets()
 *     resolves on its own: ageYears 54 >= 50 -> the 2.0-2.2 g/kg "50+" tier
 *     fires automatically (is50Plus branch in proteinTargets()); creatine is
 *     strongly indicated (age 40+ branch in nutritionBlock()).
 *   - isPostmenopausal is left `false`/unconfirmed. No menstrual irregularity
 *     or vasomotor/sleep symptoms were reported at intake. Per CLAUDE.md's
 *     "Perimenopausal Status — Screening Ambiguity in a Non-Clinical
 *     Context" section, the recommendation to default an unconfirmed 45-55-
 *     bracket client to pelvic-floor-cautious applies specifically WHEN
 *     those symptoms ARE reported — none were here, so `false` is the
 *     correct default, not a fabrication in either direction. Documented
 *     explicitly in baselineNotes (mirroring the exact pattern used in
 *     scripts/kayma_liburd_2day_plan.js and scripts/rena_paul_2day_plan.js)
 *     rather than left silent, since the pelvic floor callout correctly
 *     never auto-fires despite squat/deadlift/hip-thrust/lunge content
 *     being present across all three days.
 *
 * ALST — GOVERNING READ IS THE 3-TIER TABLE, NOT STYKU'S BINARY LABEL:
 * Styku's own report labels ALST 6.32 kg/m² "Not At-Risk" (true against the
 * EWGSOP2 <5.5 kg/m² at-risk cutoff). CLAUDE.md's 3-tier women's table
 * (<5.5 At-Risk / 5.5-6.99 Normal — monitor / >=7.0 Optimal) is the more
 * nuanced, clinically governing read for this system and places 6.32 in
 * "Normal — monitor," not "Optimal." Presented that way throughout, per the
 * brief's explicit instruction not to just repeat Styku's binary label.
 *
 * SQUAT & DEADLIFT — NOT TESTED, TODAY'S LOADS BECOME THE NEW BASELINE:
 * Neither lift was part of the initial battery. Following the Johanna
 * Castillo precedent exactly, this week's deliberately light/conservative
 * working loads (Goblet Squat 25 lbs, Trap Bar Deadlift 55 lbs — both on
 * Day 1) are documented as the new 8-week baseline rather than an invented
 * tested number. epley1RM()/workingLoad() are used for every lift that DOES
 * have real weight+rep data (Overhead Press, Hip Thrust, Single-Leg RDL,
 * Lunge) — see the computed oneRM/wk1/wk4 tables below. The Overhead Press
 * and Lunge working-load ramp (Wk1 65% -> Wk4 90% of Epley 1RM, rather than
 * the more standard 75%->85% used for Hip Thrust/SL RDL) is intentionally
 * more conservative given the frozen shoulder history (OHP) and the general
 * "never chase load over a corrective priority" posture (Lunge, paired with
 * the tibia/inner-thigh work) — not an inconsistency.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad, weakerSide,
} = require('./icons_template');

// ── Convert tested weight/rep data into working loads ──────────────────
const oneRM = {
  ohp: epley1RM(15, 8),        // 19
  hipThrust: epley1RM(55, 8),  // 70
  slRDL: epley1RM(20, 5),      // 23
  lunge: epley1RM(15, 8),      // 19
};

const wk1 = {
  // OHP and Lunge ramp conservatively (65% -> 90%) — OHP given the frozen
  // shoulder history, Lunge paired with the tibia/inner-thigh corrective
  // priority rather than pushed as a load-first movement this block.
  ohp: workingLoad(oneRM.ohp, 0.65, 2.5),          // 12.5
  hipThrust: workingLoad(oneRM.hipThrust, 0.75, 5), // 55
  slRDL: workingLoad(oneRM.slRDL, 0.75, 2.5),       // 17.5
  lunge: workingLoad(oneRM.lunge, 0.65, 2.5),       // 12.5
};

const wk4 = {
  ohp: workingLoad(oneRM.ohp, 0.90, 2.5),           // 17.5
  hipThrust: workingLoad(oneRM.hipThrust, 0.85, 5), // 60
  slRDL: workingLoad(oneRM.slRDL, 0.85, 2.5),       // 20
  lunge: workingLoad(oneRM.lunge, 0.90, 2.5),       // 17.5
};

const client = {
  name: 'Johnna Macarthur',
  programTitle: '3-Day Training Plan',
  subtitle: 'Hip Activation, Shoulder Care & Posterior Chain Strength Build',
  stats: ['Age 54', "5'9\"", '160 lbs', '3-Day Program'],
  weightKg: 72.6,
  ageYears: 54,
  isPostmenopausal: false,
  bmr: 1430,
  alstIndex: 6.32, // Normal — monitor tier (CLAUDE.md 3-tier table), not Optimal
};

const styku = {
  scanDate: '8/12/2026',
  bodyFatPct: 36.5,
  bodyFatRank: 'Average',
  leanMass: 96.6,
  leanMassPct: 60.2,
  fatMass: 58.6,
  boneMass: 5.3,
  bmi: 23.7,
  bmr: 1430,
  vfa: 82.7,
  shapeScore: 70,
  shapeScoreLabel: 'Good',
  alstIndex: 6.32,
  leftArmLST: 8.4,
  rightArmLST: 8.5,
  leftLegLST: 16.8,
  rightLegLST: 18.2,
  peerComparison: 'Lower body fat than 75% of women 50-59 (25th percentile) — leaner than most peers, though Styku\'s own comparison band labels this result "Moderate Risk." Read alongside the Ideal Lean Mass marker and VFA Low Risk finding below rather than in isolation.',
};

// weakerSide() replaces hand-derived weaker-side comments — lower LST =
// weaker = leads unilateral work. Legs sit well above the 0.5 lb asymmetry-
// protocol trigger (1.4 lb gap); arms sit below it (0.1 lb gap, monitor
// only) and are not run through the unilateral-lead protocol.
const legWeakerSide = weakerSide(styku.leftLegLST, styku.rightLegLST); // 'left'

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Lower Body Foundation —\nSquat & DL Baseline' },
  { day: 'DAY 2', intensity: 70, focus: 'Upper Body —\nShoulder Care Priority' },
  { day: 'DAY 3', intensity: 80, focus: 'Posterior Chain —\nLeft-Led Unilateral' },
];

const baselines = [
  ['Overhead Press', '15 lbs x 8 (Epley 1RM ≈19 lbs)', '8/12/2026', `Wk1: ${wk1.ohp} lbs x8 → Wk4: ${wk4.ohp} lbs x8 — conservative ramp given frozen shoulder history`],
  ['Hip Thrust', '55 lbs x 8 (Epley 1RM ≈70 lbs)', '8/12/2026', `Wk1: ${wk1.hipThrust} lbs x8 → Wk4: ${wk4.hipThrust} lbs x8`],
  ['Single-Leg RDL', '20 lbs/hand x 5 (Epley 1RM ≈23 lbs)', '8/12/2026', `Wk1: ${wk1.slRDL} lbs/hand x6 → Wk4: ${wk4.slRDL} lbs/hand x6 — left leg leads`],
  ['DB Lunge', '15 lbs/hand x 8 (Epley 1RM ≈19 lbs)', '8/12/2026', `Wk1: ${wk1.lunge} lbs/hand x8 → Wk4: ${wk4.lunge} lbs/hand x8 — left leg leads`],
  ['Incline Push-Up', '6 reps (bodyweight)', '8/12/2026', 'Target 8–10 clean reps by Week 4'],
  ['Farmers Carry', '30 lbs/hand', '8/12/2026', 'Hold at 30 lbs/hand for volume; add 5 lbs/hand at the 8-week retest if quality holds'],
  ['Plank Hold', '37 sec', '8/12/2026', 'Target 50–60 sec by Week 4'],
  ['Back Squat (Goblet)', 'Not Tested — Established This Week', '8/12/2026', 'Wk1 working load 25 lbs — becomes the new 8-week baseline'],
  ['Deadlift (Trap Bar)', 'Not Tested — Established This Week', '8/12/2026', 'Wk1 working load 55 lbs — becomes the new 8-week baseline'],
];

const baselineNotes = [
  {
    type: 'red',
    label: 'Frozen Shoulder (Adhesive Capsulitis) History — Corrective Priority',
    body: 'Documented history of frozen shoulder. Every upper-body session opens with a dedicated internal-rotation strengthening block, sequenced BEFORE any overhead or compound pressing — "control precedes power." This is active strengthening, not restriction: work within her current pain-free range and never force end-range. Sharp or pinching pain is a hard stop signal, clearly distinct from normal training fatigue — stop the set immediately and flag your coach if it occurs. No in-house PT/stretch-therapy coordination is named here; none was reported as involved for this client at intake, so this stays a self-contained corrective priority.',
  },
  {
    type: 'teal',
    label: 'Styku Findings — Body Composition & ALST',
    body: 'Body Fat 36.5% (58.6 lbs fat mass) — Styku\'s own "Average" classification (35–39.9% band). Lean Mass 96.6 lbs (60.2%) carries Styku\'s "Ideal Lean Mass" flag — a genuinely positive marker. Bone Mass 5.3 lbs (3.3%). BMI 23.7 — Normal (18.5–24.9). Shape Score 70/100 — Good. ALST Index 6.32 kg/m²: Styku\'s own report labels this binary "Not At-Risk," which is technically correct against the EWGSOP2 <5.5 kg/m² at-risk cutoff — but CLAUDE.md\'s governing 3-tier table for women (<5.5 At-Risk / 5.5–6.99 Normal — monitor / ≥7.0 Optimal) places 6.32 in the Normal — monitor tier, not Optimal. That more nuanced table is the clinically governing read used throughout this program, not Styku\'s pass/fail label — ALST is worth tracking at the 8-week rescan to confirm it is trending toward, not away from, the 7.0 Optimal threshold.',
  },
  {
    type: 'watch',
    label: 'Peer-Comparison Tension — Body Fat % vs. "Moderate Risk" Band',
    body: 'Compared against age-matched peers (women 50–59), Johnna\'s body fat % is lower than 75% of the comparison group — she is leaner than most peers in this bracket — yet Styku\'s own comparison band for that same result is labeled "Moderate Risk," 25th percentile. Read this as a population-relative marker, not a standalone clinical risk flag: VFA (82.7 cm², Low Risk) and ALST (6.32 kg/m², Normal — monitor) don\'t support an elevated cardiometabolic read on their own, and Lean Mass carries the positive "Ideal Lean Mass" flag noted above. The full picture is a healthy, monitor-tier profile, not one driven by any single number in isolation.',
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Left Leg Leads (Arms Monitor Only)',
    body: `Legs: Left ${styku.leftLegLST} lbs / Right ${styku.rightLegLST} lbs — a 1.4 lb gap, well above the 0.5 lb asymmetry-protocol trigger. LEFT leg is weaker (lower LST) and leads every unilateral lower-body exercise across this program; reps/loads are logged per side. Arms: Left ${styku.leftArmLST} lbs / Right ${styku.rightArmLST} lbs — only a 0.1 lb gap, below the 0.5 lb trigger, so arms are tracked as routine monitoring only with no formal unilateral-lead requirement.`,
  },
  {
    type: 'gold',
    label: 'Squat & Deadlift — Baseline Established This Week',
    body: `Neither lift was part of the initial testing battery. Day 1's deliberately light working loads (Goblet Squat 25 lbs, Trap Bar Deadlift 55 lbs) become the new 8-week baseline — track progression from here rather than against an invented tested number.`,
  },
  {
    type: 'gold',
    label: 'Hip Activation, 90/90 Mobility & Tibia/Inner-Thigh — Standing Programming Priorities',
    body: 'Three real, standing priorities from intake, not throwaway lines: (1) hip activation and glute medius/abductor strengthening opens every lower-body session and carries directly into the loaded squat, deadlift, hip thrust, and lunge patterns below; (2) the 90/90 hip internal/external rotation drill opens the warm-up on lower-body days and also appears as scored corrective work in Day 1\'s activation block; (3) tibialis anterior strengthening (tibialis raises, banded dorsiflexion) is paired with adductor/inner-thigh activation (Copenhagen-style regressed side plank, side-lying adductor lift) as a deliberate corrective pairing on Days 1 and 3.',
  },
  {
    type: 'gold',
    label: 'Age Bracket — Perimenopause / Menopause Transition (45–55)',
    body: 'At 54, Johnna sits in the 45–55 age bracket. Protein and creatine targets below reflect the 2.0–2.2 g/kg "50+" tier automatically (proteinTargets() resolves this from ageYears/weightKg), and creatine is strongly indicated by age alone regardless of ALST status. Bone-loading candidacy (LIFTMOR-style, T-score dependent) is worth screening for as she moves through this window even though nothing on the current scan indicates low bone mass.',
  },
  {
    type: 'teal',
    label: 'Perimenopausal Status — Not Assessed, isPostmenopausal Left False',
    body: 'No menstrual irregularity, vasomotor symptoms (hot flashes/night sweats), sleep disruption, or mood-change data was reported at intake. Per CLAUDE.md\'s "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" guidance, treating an unconfirmed 45–55-bracket client as pelvic-floor-cautious by default applies specifically WHEN those symptoms are reported — none were reported here, so isPostmenopausal is left false rather than escalated, and the pelvic floor callout correctly does not auto-fire despite squat, deadlift, hip thrust, and lunge content appearing across this program. Revisit this if symptom data becomes available at a future session.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'DAY 1 — LOWER BODY FOUNDATION',
    subtitle: 'Squat & Deadlift Baseline Establishment + Hip Activation',
    descriptor: 'TECHNIQUE DAY · HIP ACTIVATION PRIORITY · NEW BASELINE',
    intensityLabel: '60% Day',
    intensityPara: 'Squat and deadlift were not part of the initial testing battery, so today\'s loads stay deliberately light and become the new 8-week baseline. Hip activation is a real, standing programming priority this block — not a warm-up formality — and carries directly into the loaded work below. Work every set at 3+ RIR.',
    warmUp: '5 min bike, 90/90 hip switch x6/side (controlled, working end-range internal/external rotation), banded lateral walk x10/side, glute bridge x10',
    blocks: [
      {
        letter: 'A',
        title: 'HIP ACTIVATION & 90/90 MOBILITY',
        color: 'red',
        introLabel: 'Why',
        intro: 'Hip activation is a standing programming priority for Johnna, not a warm-up formality — glute medius and hip abductor strength carry directly into every squat, deadlift, and lunge pattern below. The 90/90 drill opens hip internal/external rotation and doubles as glute activation prep before loaded work.',
        exercises: [
          { name: '90/90 Hip Switch (Rock & Reach)', sets: '2', reps: '5/side', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Rotate through full range, chest tall, no forcing end-range.' },
          { name: 'Banded Clamshell', sets: '2', reps: '15/side', load: 'mini band', tempo: '2-1-2', rest: '30s', cue: 'Hips stacked, heels together, squeeze glute med at top.' },
          { name: 'Standing Banded Hip Abduction', sets: '2', reps: '12/side', load: 'band', tempo: '2-0-1', rest: '30s', cue: 'Tall posture, drive knee out against band, no torso lean.' },
          { name: 'Bird Dog', sets: '2', reps: '8/side', load: 'bodyweight', tempo: '2-2-2', rest: '30s', cue: 'Neutral spine, reach long, no hip rotation.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — SQUAT & DEADLIFT TECHNIQUE INTRODUCTION',
        introLabel: 'Load Target',
        intro: 'No baseline was recorded for squat or deadlift. Loads stay light — the goal is a clean, repeatable pattern that becomes today\'s new baseline, not maximal load.',
        exercises: [
          { name: 'Goblet Squat', sets: '3', reps: '8', load: '25 lbs', tempo: '3-1-1', rest: '75s', cue: 'Elbows inside knees, chest tall, full depth.', rirNote: '3+ RIR' },
          { name: 'Trap Bar Deadlift', sets: '3', reps: '6', load: '55 lbs', tempo: '2-1-1', rest: '90s', cue: 'Flat back, brace, push floor away evenly.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'TIBIA & INNER-THIGH CORRECTIVE PAIRING',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Tibialis strength and inner-thigh/adductor activation are paired corrective priorities from intake — tibialis raises build the ankle-dorsiflexion control that supports squat and lunge mechanics, while the adductor work balances the lateral hip-abductor emphasis in Block A.',
        exercises: [
          { name: 'Tibialis Raise (Wall or Slant Board)', sets: '3', reps: '15', load: 'bodyweight / light plate', tempo: '2-1-2', rest: '30s', cue: 'Heels planted, toes drive up toward shins, slow return.' },
          { name: 'Banded Dorsiflexion Pull', sets: '2', reps: '15', load: 'light band', tempo: 'controlled', rest: '30s', cue: 'Seated, pull toes toward shin against band resistance.' },
          { name: 'Copenhagen Plank (Bent-Knee, Regressed)', sets: '2', reps: '15–20s/side', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Top leg on bench, adductor engaged, hips level.' },
          { name: 'Side-Lying Adductor Lift', sets: '2', reps: '12/side', load: 'bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Bottom leg lifts straight, inner thigh drives the movement.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Low-impact conditioning closes the session without adding lower-body fatigue that would compromise the new squat/deadlift baseline being tracked today.',
        exercises: [
          { name: 'Rowing Machine Intervals', sets: '5', reps: '30 sec on/30 off', load: 'moderate', tempo: 'steady power', rest: '30 sec', cue: 'Legs drive first, then lean, then pull.' },
          { name: 'Standing March w/ Band', sets: '3', reps: '10/side', load: 'light band', tempo: 'controlled', rest: '30s', cue: 'Knee to hip height, stand tall, no lean.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, 90/90 seated hip rotation hold 30s/side, child\'s pose 45s',
    iconsNote: 'First exposure to squat and deadlift patterns — log today\'s working loads (Goblet Squat 25 lbs, Trap Bar Deadlift 55 lbs) as the new baseline for 8-week testing. Hip activation and the 90/90 drill open this block; left leg leads all unilateral work once it appears later in the program (Styku segmental gap 16.8 vs 18.2 lbs).',
  },
  {
    intensity: 70,
    title: 'DAY 2 — UPPER BODY & SHOULDER CARE',
    subtitle: 'Internal Rotation Strengthening Before Pressing + Pull Strength',
    descriptor: 'SHOULDER COROLLARY PRIORITY · MODERATE STRENGTH · VOLUME BUILD',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate strength day. Control precedes power: the shoulder internal-rotation corrective block below is non-negotiable before any overhead or compound pressing — Johnna\'s frozen shoulder history means today\'s work builds real strength within her current, respected range of motion rather than chasing depth.',
    warmUp: '5 min bike, band pull-apart x15, scapular wall slide x10, arm circles x10/direction (pain-free range only)',
    blocks: [
      {
        letter: 'A',
        title: 'SHOULDER INTERNAL ROTATION — CORRECTIVE PRIORITY',
        color: 'red',
        introLabel: 'Why',
        intro: 'Dedicated strengthening for Johnna\'s frozen shoulder (adhesive capsulitis) history, sequenced before any pressing per "control precedes power." This is active strengthening, not restriction: work within her current pain-free range and never force end-range. Sharp or pinching pain is a stop signal — clearly distinct from normal training fatigue — stop the set and flag your coach if it occurs.',
        exercises: [
          { name: 'Band Internal Rotation (Elbow at Side)', sets: '3', reps: '12/side', load: 'light band', tempo: '2-1-2', rest: '45s', flag: 'Frozen shoulder history — stop at sharp/pinching pain, not fatigue', cue: 'Elbow pinned to ribs, rotate within pain-free range only.' },
          { name: 'Side-Lying DB Internal Rotation', sets: '3', reps: '10/side', load: '5 lbs', tempo: '3-1-2', rest: '45s', flag: 'Respect current ROM — never force end-range', cue: 'Small controlled arc, stop well short of any pinch.' },
          { name: 'Scapular Wall Slide', sets: '2', reps: '10', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Ribs down, slide within comfortable range, low back flat.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PRESS STRENGTH',
        introLabel: 'Load Target',
        intro: `Seated overhead press tested at 15 lbs x8 (Epley 1RM ≈${oneRM.ohp} lbs). Given the frozen shoulder history, Week 1 trains conservatively below baseline (${wk1.ohp} lbs) and progresses only as far as pain-free range allows, reaching ${wk4.ohp} lbs by Week 4.`,
        exercises: [
          { name: 'Seated DB Overhead Press', sets: '3', reps: '8', load: `Wk1: ${wk1.ohp} lbs → Wk4: ${wk4.ohp} lbs`, tempo: '2-0-2', rest: '75s', flag: 'Progress only within pain-free range', cue: 'Ribs stacked over hips, press within comfortable range.', rirNote: '2 RIR' },
          { name: 'Incline Push-Up', sets: '3', reps: '6–8', load: 'bodyweight (bench)', tempo: '3-1-1', rest: '60s', cue: 'Baseline 6 reps. Hands under shoulders, chest to bench, brace.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'PULL STRENGTH',
        color: 'purple',
        introLabel: 'Note',
        intro: 'Rowing volume balances the pressing work above and builds scapular stability around the healing shoulder.',
        exercises: [
          { name: 'Bent-Over DB Row', sets: '3', reps: '10', load: '20 lbs/hand', tempo: '2-1-2', rest: '75s', cue: 'Flat back, pull to hip, squeeze at top.', rirNote: '2 RIR' },
          { name: 'Face Pull (Band or Cable)', sets: '3', reps: '15', load: 'light band', tempo: '2-1-2', rest: '45s', cue: 'Pull to face, elbows at ear height — light range only, stay pain-free.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC FINISHER',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Closing conditioning block. Kept lower-body and floor-based — no overhead loading — to protect the shoulder priority above.',
        exercises: [
          { name: 'Bike Sprint Intervals (Controlled)', sets: '5', reps: '20 sec on/40 off', load: 'moderate', tempo: 'brisk, controlled', rest: '40 sec', cue: 'Brisk and sustainable — not a max effort test.' },
          { name: 'Bodyweight Squat to Stand', sets: '3', reps: '12', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Full stand each rep, exhale on the way up.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 20s/side (light, pain-free only), cross-body shoulder stretch 20s/side (light), cat-cow x8',
    iconsNote: 'Internal rotation strengthening opens every upper-body session ahead of pressing — this is active strengthening, not restriction. Respect her current range of motion; never force end-range. Sharp or pinching pain is a stop signal — flag your coach immediately. Normal training fatigue is expected and fine.',
  },
  {
    intensity: 80,
    title: 'DAY 3 — POSTERIOR CHAIN & FULL-BODY STRENGTH',
    subtitle: 'Hip Thrust · Single-Leg RDL (Left-Led) · Lunge · Carry',
    descriptor: 'PRIMARY STRENGTH DAY · LEFT-LEG ASYMMETRY PROTOCOL · TESTED BASELINES',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day, built on Johnna\'s strongest tested numbers (Hip Thrust 55 lbs x8, Epley 1RM ≈70 lbs). Left leg leads every unilateral set per Styku\'s 1.4 lb segmental LST gap (16.8 vs 18.2 lbs) — well above the 0.5 lb asymmetry-protocol trigger. Hip activation carries forward from earlier in the week into every rep here.',
    warmUp: '5 min bike, 90/90 hip switch x5/side, banded lateral walk x10/side, glute bridge x10, bodyweight squat x10',
    blocks: [
      {
        letter: 'A',
        title: 'HIP ACTIVATION CARRYOVER',
        color: 'red',
        introLabel: 'Why',
        intro: 'Same hip-activation priority from Day 1, condensed here to prime glute medius and hip external rotators before the heavy hinge work below.',
        exercises: [
          { name: 'Banded Clamshell', sets: '2', reps: '12/side', load: 'mini band', tempo: '2-1-2', rest: '30s', cue: 'Heels together, squeeze glute med at top.' },
          { name: 'Standing Banded Hip Abduction', sets: '2', reps: '10/side', load: 'band', tempo: '2-0-1', rest: '30s', cue: 'Tall posture, drive knee out, no torso lean.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — HIP THRUST & SINGLE-LEG RDL',
        introLabel: 'Load Target',
        intro: `Hip Thrust tested at 55 lbs x8 (Epley 1RM ≈${oneRM.hipThrust} lbs); Week 1 trains at ${wk1.hipThrust} lbs, climbing to ${wk4.hipThrust} lbs by Week 4. Single-Leg RDL tested at 20 lbs/hand x5 (Epley 1RM ≈${oneRM.slRDL} lbs); Week 1 trains at ${wk1.slRDL} lbs/hand, climbing to ${wk4.slRDL} lbs/hand — left leg leads every set.`,
        exercises: [
          { name: 'DB Hip Thrust', sets: '3', reps: '8', load: `Wk1: ${wk1.hipThrust} lbs → Wk4: ${wk4.hipThrust} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Drive through heels, glutes lock at top.', rirNote: '2 RIR' },
          { name: 'Single-Leg RDL (Left-Led)', sets: '3', reps: '6/side', load: `Wk1: ${wk1.slRDL} lbs/hand → Wk4: ${wk4.slRDL} lbs/hand`, tempo: '3-1-1', rest: '60s', flag: 'Left leg weaker (Styku) — leads every set', cue: 'Left leg first. Hinge, flat back, soft knee.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'LUNGE & TIBIA/INNER-THIGH ACCESSORY',
        color: 'gold',
        introLabel: 'Note',
        intro: `Lunge tested at 15 lbs/hand x8 (Epley 1RM ≈${oneRM.lunge} lbs) — Week 1 trains at ${wk1.lunge} lbs/hand, climbing to ${wk4.lunge} lbs/hand by Week 4. Tibialis and adductor work from Day 1 gets a lighter touch-up here to reinforce the pattern under load.`,
        exercises: [
          { name: 'DB Reverse Lunge (Left-Led)', sets: '3', reps: '8/side', load: `Wk1: ${wk1.lunge} lbs/hand → Wk4: ${wk4.lunge} lbs/hand`, tempo: '2-1-1', rest: '60s', flag: 'Left leg leads', cue: 'Left leg first. Knee tracks over mid-foot.', rirNote: '2 RIR' },
          { name: 'Tibialis Raise (Wall or Slant Board)', sets: '2', reps: '15', load: 'bodyweight / light plate', tempo: '2-1-2', rest: '30s', cue: 'Heels planted, toes drive up toward shins.' },
          { name: 'Copenhagen Plank (Bent-Knee, Regressed)', sets: '2', reps: '15–20s/side', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Top leg on bench — adductor engaged, hips level.' },
        ],
      },
      {
        letter: 'D',
        title: 'LOADED CARRY + CORE',
        introLabel: 'Why',
        intro: 'Farmers Carry tested at 30 lbs/hand — builds the deep spinal stabilizer strength that supports posture under all the compound lifts above. Plank closes the block.',
        exercises: [
          { name: 'DB Farmers Carry', sets: '3', reps: '30–40 yd', load: '30 lbs/hand', tempo: 'controlled', rest: '60s', cue: 'Tall posture, ribs down, quick tight steps.', rirNote: '2 RIR' },
          { name: 'Plank Hold', sets: '3', reps: '37 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Baseline 37 sec — ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'E',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Closing conditioning supports the week\'s cardiometabolic priority without adding lower-body fatigue that would compromise hip thrust/RDL load tracking.',
        exercises: [
          { name: 'Kettlebell Swing (Controlled Hip Snap)', sets: '4', reps: '20 sec on/40 off', load: '20 lbs', tempo: 'controlled hip snap', rest: '40 sec', cue: 'Hinge, snap hips, arms stay relaxed.' },
          { name: 'Step-Up (Left-Led)', sets: '4', reps: '20 sec on/40 off', load: 'bodyweight', tempo: 'controlled', rest: '40 sec', cue: 'Left leg leads — drive through full foot, stand tall at top.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, 90/90 seated hip rotation hold 30s/side, doorway chest stretch 20s/side (light), child\'s pose 45s',
    iconsNote: 'Left leg leads every unilateral set this session — Styku shows a 1.4 lb segmental gap (16.8 vs 18.2 lbs), well above the 0.5 lb asymmetry trigger. Track the gap at the 8-week rescan. Hip activation and tibia/inner-thigh work carry forward from earlier sessions; keep shoulder work pain-free per the internal-rotation protocol established on Day 2.',
  },
];

const summary = {
  subtitle: 'Johnna Macarthur  ·  ICONS Index  ·  Hip Activation, Shoulder Care & Posterior Chain Strength Build  ·  Week 1',
  rows: [
    ['1', '60%', 'Lower Body Foundation — Squat & Deadlift Baseline', 'Goblet Squat / Trap Bar Deadlift', 'New baseline established (25 lbs / 55 lbs); hip activation, 90/90, and tibia/inner-thigh corrective priorities open the week'],
    ['2', '70%', 'Upper Body — Shoulder Care Priority', 'Seated DB Overhead Press', `Internal rotation strengthening precedes all pressing — frozen shoulder history, conservative load progression ${wk1.ohp}→${wk4.ohp} lbs`],
    ['3', '80%', 'Posterior Chain — Left-Led Unilateral', 'DB Hip Thrust', `Loads build off tested baselines (Hip Thrust Epley 1RM ≈${oneRM.hipThrust} lbs); left leg leads every unilateral set per 1.4 lb Styku gap`],
  ],
  milestones4wk: `Goblet Squat 30–35 lbs x8, Trap Bar Deadlift 65–70 lbs x6 at 2–3 RIR. Hip Thrust progressing toward ${wk4.hipThrust + 5} lbs x8. Seated OHP at 15 lbs x8 pain-free (matching tested baseline) — progress only as shoulder ROM allows. Left-leg single-leg RDL load matched toward parity with right within 10%.`,
  milestones8wk: 'Squat/deadlift 8-week retest against today\'s new baseline (25 lbs / 55 lbs). Hip Thrust and OHP progressed from current working loads. Left/right leg LST gap reduced from 1.4 lbs. Plank hold past 50 seconds. Shoulder internal rotation strength improved with no pain flags logged.',
  rescanNote: 'Rebook Styku scan at 8 weeks. Track: ALST Index trend (currently 6.32 kg/m², Normal — monitor tier, not yet Optimal), VFA (currently 82.7 cm², Low Risk — maintain), left/right leg LST gap (baseline 1.4 lbs, target under 0.5), lean mass (currently 96.6 lbs, Ideal Lean Mass marker — maintain or build further).',
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
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'johnna_macarthur');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Johnna_Macarthur_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
