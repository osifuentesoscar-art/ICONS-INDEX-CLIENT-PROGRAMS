/**
 * Moe Shahheidari — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * New client. Built from Styku scan data (8/11/2026) and a self-reported
 * baseline strength testing session (same intake window). Male, age 46 —
 * Male Client Programming Framework applies (CLAUDE.md, 40-59 bracket:
 * "Midlife Androgen Decline & Sarcopenia Onset"). Structural reference:
 * scripts/vinz_feller_3day_plan.js (male, 40-59 bracket, real Styku scan,
 * self-reported baseline battery, 3-day program, same engine helpers).
 *
 * CLINICAL CONTEXT — ROTATOR CUFF: Moe is currently in active rehabilitation
 * from a small rotator cuff tear, coordinated with Jason Bethea, Brace
 * Life's in-house Trainer/Physical Therapist, and his treating physician
 * (per the 8/11/2026 STUDIO STAFF addition to CLAUDE.md, replacing the
 * generic "PT-coordinated care" language this doc originally shipped
 * with). Per an explicit correction from Xolokan mid-build, this
 * program's shoulder content is framed as PROGRESSIVE STRENGTHENING with
 * smart precautions, not as restriction/avoidance:
 *   - Day 2's Block A (external rotation, scapular stability work) IS the
 *     strengthening protocol itself, not a warm-up throwaway — it follows
 *     the standard rehab loading sequence (isometric -> slow eccentric ->
 *     controlled concentric -> dynamic) as an active rebuilding progression,
 *     not a static holding pattern.
 *   - Overhead Press and Assisted Pull-Ups both continue as real, loaded
 *     strengthening work — neither is downgraded to a placeholder. Load
 *     still progresses week to week; it's autoregulated by pain-free range
 *     of motion and RIR rather than a fixed %1RM table (rehab strengthening
 *     responds better to day-to-day pain-free autoregulation than a rigid
 *     percentage schedule pulled from a single tested load).
 *   - Pain-monitoring language (sharp/pinching pain = stop; ordinary
 *     fatigue/soreness is not a stop signal) is kept throughout — that's a
 *     precaution, not a restriction, and stays as the guardrail around the
 *     strengthening work rather than a low-RPE ceiling standing in for it.
 *   - Day 2's intensity badge is overridden (badge: {label:'REHAB',
 *     sub:'STRENGTH'}) instead of a numeric %, because "90% near-maximal"
 *     or any fixed percentage would misstate what's actually prescribed —
 *     per CLAUDE.md's badge-override precedent (Aimee Morris Day A/B,
 *     Baseline-to-Rescan Day 0/Day 4).
 *
 * STYKU INTERPRETATION — a genuine internal-vs-clinical discrepancy, same
 * pattern as Vinz Feller's body-fat-label divergence:
 *   - Styku's own dashboard flags "Low Lean Mass" (their internal ranking)
 *     — but his ALST Index (7.92 kg/m²) reads Not At-Risk against EWGSOP2
 *     2018's male clinical cutoff (<7.0 kg/m²), the framework's governing
 *     figure. Both are surfaced explicitly rather than picking one silently.
 *   - Body Fat 31.6% is At-Risk per Styku's own scale AND Obese per the ACE
 *     male body-fat-% reference table — unlike Vinz, these two agree here,
 *     which is itself worth stating plainly rather than assumed.
 *   - BMI 26.7 (WHO Overweight) is explicitly NOT treated as a muscular-
 *     athlete false positive (the caution CLAUDE.md raises for reading BMI
 *     in isolation) — it's concordant with the body fat / lean mass
 *     findings, and the document says so directly.
 *
 * Asymmetry: legs cross the 0.5 lb Asymmetry Protocol trigger (1.1 lb gap,
 * left weaker via weakerSide()) and get the full unilateral-leads protocol;
 * arms do not (0.4 lb gap, below trigger) and are monitored only, not led.
 *
 * Nutrition: maleProteinTargets()/maleNutritionNote() called with
 * client.maleBodyFatConcern: true — his 31.6% At-Risk/Obese-tier body fat
 * is a more pronounced composition concern than Vinz's, so the escalated
 * 2.0-2.2 g/kg working sub-range is clinically warranted on its own facts,
 * not just applied for cross-client consistency. testosteroneNote() is
 * called on the 40-59 bracket branch (informational only, not diagnostic).
 *
 * Demographic scope: none of the women's Age Bracket Programming Framework
 * numeric thresholds are applied — the Male Client Programming Framework's
 * real, cited thresholds are used throughout instead, per CLAUDE.md's
 * Demographic Scope Rule.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad,
  weakerSide, maleNutritionNote, testosteroneNote,
} = require('./icons_template');

// ── Verify the pre-supplied 1RM / working-load figures ─────────────────
const oneRM = {
  deadlift: epley1RM(175, 8),      // 222
  inclineBench: epley1RM(25, 8),   // 32
  ohpReference: epley1RM(17.5, 8), // 22 — reference figure only, see note below
};

const wk1 = {
  deadlift: workingLoad(oneRM.deadlift, 0.80),       // 180
  inclineBench: workingLoad(oneRM.inclineBench, 0.90), // 30
};

const client = {
  name: 'Moe Shahheidari',
  programTitle: '3-Day Training Plan',
  subtitle: 'Full-Body Strength & Rotator Cuff Strengthening · Three-Zone Build',
  schedule: 'Tue/Thu/Sat · Full Gym',
  stats: ['Age 46', 'Male', "5'11\"", '192 lbs', 'Styku Scan 8/11/2026', 'Rotator Cuff Rehab — Coordinated with Jason Bethea, In-House PT'],
  weightKg: 87.1,
  ageYears: 46,
  isPostmenopausal: false,
  bmr: 1858,
  alstIndex: 7.92, // Not At-Risk — EWGSOP2 2018 male cutoff <7.0; see Styku interpretation note
  // Styku's own At-Risk body-fat classification AND the ACE male body-fat-%
  // reference table (both land him in the "Obese" tier at 31.6%) — a more
  // pronounced composition concern than Vinz Feller's ACE-only finding, so
  // the escalated working protein sub-range below is clinically warranted
  // on its own facts. See maleProteinTargets()/maleNutritionNote() in
  // icons_template.js for the calc this drives.
  maleBodyFatConcern: true,
};

const styku = {
  scanDate: '8/11/2026',
  bodyFatPct: 31.6,
  bodyFatRank: 'At-Risk',
  leanMass: 125.3,
  leanMassPct: 65.4,
  fatMass: 61,
  boneMass: 5.8,
  bmi: 26.7,
  bmr: 1858,
  vfa: 87.1,
  shapeScore: 45,
  shapeScoreLabel: 'Needs Improvement',
  alstIndex: 7.92,
  leftArmLST: 12.3,
  rightArmLST: 12.7,
  leftLegLST: 21.7,
  rightLegLST: 22.8,
  peerComparison: "Higher body fat than 73% of Styku's peer comparison group for men 40-49 — Styku's own comparison band labels this 'High Risk' (73rd percentile).",
};

// weakerSide() — lower LST = weaker = leads unilateral work.
const legWeakerSide = weakerSide(styku.leftLegLST, styku.rightLegLST); // 'left'
const armGap = Math.abs(styku.leftArmLST - styku.rightArmLST); // 0.4 — below the 0.5 lb Asymmetry Protocol trigger

const baselines = [
  ['Hex Bar Deadlift', `175 x 8 (est. 1RM ${oneRM.deadlift})`, '8/11/2026', `${wk1.deadlift + 15}-${wk1.deadlift + 20} lbs x 5, progressive per RIR autoregulation`],
  ['Back Squat', '90 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively via 1-2 RIR — no fixed numeric target'],
  ['Incline Dumbbell Bench Press', `25 x 8 (est. 1RM ${oneRM.inclineBench})`, '8/11/2026', '35-40 lbs x 8, progressive per RIR autoregulation'],
  ['Overhead Press', '17.5 x 8 (reference — rotator cuff strengthening in progress)', '8/11/2026', 'Progressive strengthening work, pain-free ROM — load builds weekly, autoregulated by RIR not a fixed % table'],
  ['Single-Arm DB Row', '35 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively via 1-2 RIR — pain-free through the shoulder'],
  ['Farmers Carry', '45 lbs/hand', '8/11/2026', '55-60 lbs/hand for 30-40m'],
  ['Single-Leg Romanian Deadlift', '30 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively via 1-2 RIR — left leg leads'],
  ['Push-Ups', '12 reps (bodyweight)', '8/11/2026', '20-22 reps'],
  ['Plank Hold', '1:18', '8/11/2026', '1:45-2:00'],
  ['Assisted Pull-Ups', '5 reps (assistance level not specified)', '8/11/2026', 'Progressive strengthening — reduce assistance as pain-free ROM allows; neutral/close grip available if wide grip aggravates'],
];

const baselineNotes = [
  {
    type: 'teal',
    // Client View (8/17/2026 audit fix): previously marked audience:'internal'
    // because it named Vinz Feller's Styku reading for comparison — but
    // maleNutritionNote()'s auto-generated text hard-codes "(see the Styku
    // interpretation note above)", which dangled once this note was hidden.
    // Trimmed the cross-client comparison instead of hiding the whole note,
    // matching the Elizabeth Poyner precedent — the underlying clinical
    // content (ALST/VFA/BMI interpretation) is genuinely client-appropriate.
    label: 'Styku Scan Interpretation — Male Client Programming Framework (8/11/2026)',
    body: `Lean Mass ${styku.leanMass} lbs (${styku.leanMassPct}%), Fat Mass ${styku.fatMass} lbs, Bone Mass ${styku.boneMass} lbs (3.0%), BMR ${styku.bmr} cal/day, Shape Score ${styku.shapeScore}/100 ("${styku.shapeScoreLabel}"). ALST Index ${styku.alstIndex} kg/m² — EWGSOP2 2018's male low-muscle-mass cutoff is <7.0 kg/m² AT-RISK / ≥7.0 kg/m² Not At-Risk (the same source already used for the women's 5.5 kg/m² threshold in this system); Moe sits comfortably above the line — this is the clinically-governing figure for his muscle-mass status, see the note below for how it relates to Styku's own internal flag. VFA ${styku.vfa} cm² falls in the ICONS VFA table's Low Risk band (70-99 cm²), validated sex-independent and applied to him directly. BMI ${styku.bmi} falls in the WHO Overweight range (25-29.9) — WHO BMI thresholds are not sex-specific, and unlike the "over-flagged muscular athlete" caution the Male Client Programming Framework raises for reading BMI in isolation, this BMI reading is concordant with — not contradicted by — his body fat % and lean mass findings below. There is no muscular-athlete false positive to correct for here.`,
  },
  {
    type: 'watch',
    // Client View (8/17/2026 audit fix): same trim as above — was marked
    // internal for naming "Vinz Feller's document" by name; that comparison
    // removed, note kept visible since the ALST-vs-Styku-internal-flag
    // reconciliation is genuinely useful for Moe to understand.
    label: "Body Fat % & Lean Mass — Styku's Internal Flags vs. the Clinical ALST Reading",
    body: `Body Fat ${styku.bodyFatPct}% (${styku.fatMass} lbs fat mass) carries Styku's own classification of At-Risk (their internal, Mayo Clinic-based >28% threshold), and his peer comparison — higher body fat than 73% of Styku's men 40-49 comparison group — is labeled "High Risk" on Styku's own dashboard. Cross-checked against the ACE male body-fat-% reference table (Essential 2-5% / Athletes 6-13% / Fitness 14-17% / Acceptable 18-24% / Obese 25%+), 31.6% also falls in the Obese tier — the two scales agree here. Styku's dashboard separately flags "Low Lean Mass" internally — this is Styku's own internal ranking, not the EWGSOP2 clinical ALST cutoff, and the two genuinely disagree: his ALST Index of ${styku.alstIndex} kg/m² reads Not At-Risk against the EWGSOP2 <7.0 kg/m² clinical threshold cited above. The clinically-governing figure is the EWGSOP2 ALST reading — he is not sarcopenic — but Styku's Low Lean Mass flag is still carried forward as a body-recomposition priority (build lean mass, reduce fat mass) rather than a red flag requiring an escalated protein tier on ALST grounds alone.`,
  },
  {
    type: 'watch',
    label: `${legWeakerSide === 'left' ? 'Left' : 'Right'}-Leg Asymmetry — Legs Above Trigger, Arms Below It`,
    body: `Left Leg LST ${styku.leftLegLST} lbs vs Right Leg LST ${styku.rightLegLST} lbs — a ${(styku.rightLegLST - styku.leftLegLST).toFixed(1)} lb gap, above the 0.5 lb Asymmetry Protocol trigger. Standard ICONS protocol applied: the ${legWeakerSide} leg leads every unilateral leg exercise (single-leg RDL, any split-stance work), the ${legWeakerSide} side is logged separately from the right in the coaching cue, and any suitcase-style carry work has the ${legWeakerSide} hand hold the load. Left Arm LST ${styku.leftArmLST} lbs vs Right Arm LST ${styku.rightArmLST} lbs — only a ${armGap.toFixed(1)} lb gap, below the 0.5 lb trigger — monitor only this cycle; no unilateral lead is assigned for arm work. Re-check both gaps at the 8-week Styku rescan.`,
  },
  {
    type: 'clinical',
    label: 'Rotator Cuff — Active Strengthening, Coordinated with Jason Bethea',
    body: "Moe is currently in an active rotator cuff tear rehabilitation program, coordinated with Jason Bethea, Brace Life's in-house Trainer/Physical Therapist, and his treating physician — this ICONS program runs alongside that care, not instead of it, and its shoulder content is built to progressively STRENGTHEN the rotator cuff and scapular stabilizers, not to work around them. The dedicated block on Day 2 (external rotation, scapular stability work) is the strengthening protocol itself, not a warm-up throwaway — it follows the standard rehab loading sequence (isometric hold capacity first, then slow eccentric control, then controlled concentric strength, then dynamic/functional loading), progressed week to week as capacity builds rather than held at one level indefinitely. Overhead Press and Assisted Pull-Ups both continue as real, loaded strengthening work — load progresses week to week the same as any other lift in this program, autoregulated by pain-free range of motion and RIR rather than a fixed %1RM table, because rehab strengthening responds better to day-to-day pain-free autoregulation than a rigid percentage schedule pulled from one tested load. Pain-free technique is the guardrail here, not a low-effort ceiling: sharp or pinching shoulder pain during a set, or pain lasting beyond 24 hours, is the real stop signal for that exercise (regress the range or substitute it); ordinary muscular fatigue or normal training soreness is not a stop signal and should never be confused with it. The mobility/ROM side of this rehabilitation — regaining full pain-free range through PNF (Proprioceptive Neuromuscular Facilitation) stretching — is a natural complement from Niko Heers, Brace Life's certified in-house Stretch Therapist, working alongside Jason's strengthening-led protocol, not in place of it.",
  },
  {
    type: 'purple',
    audience: 'internal', // Client View: documentation-methodology note — explains which
    // internal science-layer framework/thresholds were selected and why, build-process
    // reasoning rather than client-facing coaching content.
    label: 'Male Client Programming Framework — What Was Applied Here',
    body: "ICONS's Evidence-Based Science Layer's five-bracket Age Bracket Programming Framework (protein/creatine g/kg tiers, ALST sarcopenia thresholds, the LIFTMOR postmenopausal bone-loading protocol, pelvic floor triggers) is derived from and validated for women 40s-60s navigating hormonal transitions — none of its numeric thresholds are applied to Moe directly. Instead, this document uses the Male Client Programming Framework: at 46, he sits in its 40-59 bracket (\"Midlife Androgen Decline & Sarcopenia Onset\"), where ALST monitoring is a stated priority even before any hormonal diagnosis is on the table. His ALST (7.92 kg/m²) is comfortably Not At-Risk, so this is a body-recomposition priority given the Styku-internal Low Lean Mass flag above — not a sarcopenia-driven programming escalation. His ALST, VFA, and BMI are interpreted above against real male-specific citations (EWGSOP2 2018, the sex-independent VFA table, WHO BMI thresholds read alongside the ACE body-fat-% classification), and his protein/creatine targets and the testosterone note below come from that framework's ISSN 2017 / Morton 2018 and Hildreth et al. 2024 sources rather than the women's tiers. What carries over unchanged from ICONS regardless of sex: the Isolated → Compound → Metabolic structural philosophy, RIR-based autoregulated progressive overload, corrective-before-compound sequencing, and the Styku segmental asymmetry protocol — all demographic-neutral principles, applied here on their own merits.",
  },
  { render: maleNutritionNote(client) },
  ...testosteroneNote(client).length ? [{ render: testosteroneNote(client) }] : [],
  {
    type: 'gold',
    label: 'Purpose of This Program',
    body: 'General strength and conditioning development, built around a rotator cuff tear currently in active rehabilitation coordinated with Jason Bethea — this is a program that actively rebuilds the shoulder, not one that avoids it. This 3-day build applies the ICONS three-zone philosophy (Isolated activation/corrective strengthening → Compound strength → Metabolic conditioning finisher) across a Lower Body / Upper Body / Full-Body split, with Day 2 carrying the dedicated rotator cuff and scapular strengthening work ahead of its compound pressing, and every primary and secondary lift autoregulated on RIR and pain-free range of motion rather than a fixed percentage grind.',
  },
];

const weekOverview = [
  { day: 'SUN', intensity: 'Off', focus: 'Rest' },
  { day: 'MON', intensity: 'Off', focus: 'Rest' },
  { day: 'TUE', intensity: 80, focus: 'Lower Body & Posterior Chain' },
  { day: 'WED', intensity: 'Off', focus: 'Rest' },
  { day: 'THU', intensity: 60, focus: 'Upper Push/Pull — Rotator Cuff Strengthening' },
  { day: 'FRI', intensity: 'Off', focus: 'Rest' },
  { day: 'SAT', intensity: 70, focus: 'Full-Body Unilateral, Carries & Conditioning' },
];

const days = [
  {
    intensity: 80,
    title: 'DAY 1 — TUESDAY',
    subtitle: 'Lower Body & Posterior Chain (Primary)',
    descriptor: 'PRIMARY STRENGTH DAY · HEX BAR DEADLIFT & BACK SQUAT',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day for the week — the last 1-2 reps on the deadlift should be hard but clean. Control precedes power: the corrective block below earns full-depth, braced positions before any load goes on the bar. No shoulder-specific concern in the primary lifts today; the loaded carry-prep work at the end still loads the shoulder girdle isometrically, so the same pain-monitoring rule applies there too.',
    warmUp: 'General warm-up: 5 min easy bike, hip circles, bodyweight squats x10, glute bridges x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'HIP & POSTERIOR CHAIN ACTIVATION',
        color: 'red',
        introLabel: 'Why',
        intro: 'General joint-health activation for the hip/glute complex ahead of heavy hip-hinge and squat loading — no specific lower-body flag reported, applied as standard practice.',
        exercises: [
          { name: 'Lateral Band Walk', sets: '2', reps: '10 steps/side', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Band above knees; hips level, no hiking.' },
          { name: 'Terminal Knee Extension', sets: '2', reps: '12/side', load: 'Light band', tempo: 'Controlled', rest: '30s', cue: 'Full knee lockout; quad squeeze at end range.' },
          { name: 'Glute Bridge (Bilateral)', sets: '2', reps: '12', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Full glute lockout; ribs down, no arch.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — HEX BAR DEADLIFT',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.deadlift} lbs (80% of est. 1RM ${oneRM.deadlift}) — 1 RIR on top sets. Add load only at the top of the rep range with clean form.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `${wk1.deadlift} lbs (Wk1)`, tempo: '2-0-1', rest: '2 min', cue: 'Neutral spine, brace hard. 1 RIR on top set.', rirNote: '1 RIR top set' },
        ],
      },
      {
        letter: 'C',
        title: 'SECONDARY COMPOUND — BACK SQUAT',
        introLabel: 'Load Target',
        intro: 'Reference load 90 lbs (no rep count recorded at intake) — build progressively at 2 RIR rather than off a fixed percentage table.',
        exercises: [
          { name: 'Back Squat', sets: '3', reps: '6', load: '90 lbs (reference) → build 1-2 RIR', tempo: '3-1-1', rest: '90s', cue: 'Ribs stacked over pelvis; full depth, 2 RIR.' },
        ],
      },
      {
        letter: 'D',
        title: 'CORE / CARRY-PREP ACCESSORY',
        color: 'gold',
        introLabel: 'Format',
        intro: "Anti-rotation core work plus an isometric carry-prep hold — sets up Saturday's loaded Farmers Carry work. The suitcase hold loads the shoulder girdle isometrically, same as the loaded carry it's prepping for — normal grip/shoulder fatigue is expected, sharp or pinching pain is not.",
        exercises: [
          { name: 'Half-Kneeling Pallof Press', sets: '3', reps: '10/side', load: 'Mod band', tempo: '2s hold', rest: '45s', cue: 'Resist rotation; ribs stacked over hips.' },
          { name: 'Suitcase Hold (Isometric)', sets: '2', reps: '20s/side', load: 'Mod DB', tempo: 'Hold', rest: '30s', cue: 'Left hand leads — weaker leg-side. Sharp shoulder pain = stop.' },
        ],
      },
    ],
    coolDown: 'Hip flexor stretch 60s/side. Hamstring stretch 60s/side. Foam roll quads/glutes 60s each.',
    iconsNote: 'Control precedes power — earn full-depth, braced positions on the corrective block before adding load. No PRs today; an 80% day is a hard, honest working session, not a max-effort test.',
  },
  {
    intensity: 60,
    badge: { label: 'REHAB', sub: 'STRENGTH' },
    title: 'DAY 2 — THURSDAY',
    subtitle: 'Upper Body Push/Pull — Rotator Cuff Strengthening Priority',
    descriptor: 'ROTATOR CUFF STRENGTHENING DAY · PROGRESSIVE, COORDINATED WITH JASON BETHEA, PAIN-FREE ROM',
    intensityLabel: 'Day 2 Priority',
    intensityPara: "This isn't a standard %1RM intensity day, so the badge reads REHAB / STRENGTH rather than a percentage that would misstate what's actually prescribed. That doesn't mean light or limited — it means the point of today is to actively rebuild the rotator cuff and scapular stabilizers while continuing real strength work everywhere else. The corrective block below is strengthening work in its own right, not a warm-up throwaway, and runs ahead of compound pressing per ICONS's own 'control precedes power' sequencing. Overhead Press and Assisted Pull-Ups both keep progressing — load builds week to week — autoregulated by pain-free range of motion and RIR instead of a fixed percentage table, in coordination with Jason Bethea.",
    warmUp: 'General warm-up: 5 min row or bike, arm circles, band pull-aparts x10 before the strengthening block below.',
    blocks: [
      {
        letter: 'A',
        title: 'ROTATOR CUFF & SCAPULAR STRENGTHENING',
        color: 'red',
        introLabel: 'Why',
        intro: "This is the strengthening protocol itself, not a warm-up — direct, progressive loading of the rotator cuff and scapular stabilizers, following the standard rehab loading sequence (isometric hold capacity → slow eccentric control → controlled concentric strength → dynamic loading) as capacity builds week to week. Runs before compound pressing so the shoulder is actively controlling the joint before it's asked to move real load.",
        exercises: [
          { name: 'Band External Rotation (Side-Lying / Standing)', sets: '3', reps: '12-15/side', load: 'Light-Mod band', tempo: 'Wk1-2 isometric hold; Wk3+ slow eccentric', rest: '45s', cue: 'Elbow pinned to side; full slow control both directions.' },
          { name: 'Prone Y-T-W', sets: '3', reps: '8 each letter', load: 'Bodyweight → light DB', tempo: 'Controlled', rest: '45s', cue: 'Thumbs up; small range, full scapular control.' },
          { name: 'Scapular Wall Slide / Retraction', sets: '2', reps: '12', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'Ribs down; scap glide, no shrugging.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — INCLINE BENCH PRESS',
        introLabel: 'Load Target',
        intro: `Well-tolerated in cuff rehab (controlled-ROM pressing) — Week 1 working load ${wk1.inclineBench} lbs (90% of est. 1RM ${oneRM.inclineBench}), progressing close to normal. 1-2 RIR; stop short of sharp or pinching pain, not of ordinary fatigue.`,
        exercises: [
          { name: 'Incline Dumbbell Bench Press', sets: '4', reps: '5', load: `${wk1.inclineBench} lbs (Wk1)`, tempo: '2-0-1', rest: '2 min', cue: 'Even bar path both arms. Stop at sharp/pinching pain.', rirNote: '1-2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'OVERHEAD PRESS — PROGRESSIVE STRENGTHENING, PAIN-FREE ROM',
        introLabel: 'Load Target',
        intro: 'Genuine strengthening work, not a placeholder — load builds week to week from the tested 17.5 lb starting point the same as any other lift here, just autoregulated by pain-free range of motion and RIR instead of a fixed %1RM table.',
        exercises: [
          { name: 'Standing Overhead Press', sets: '3', reps: '6-8', load: 'Self-select ~17.5-20 lbs, build weekly', tempo: 'Controlled', rest: '2 min', cue: 'Full pain-free ROM; add load at 2 RIR + clean form.' },
        ],
      },
      {
        letter: 'D',
        title: 'PULL — PROGRESSIVE STRENGTHENING',
        color: 'purple',
        introLabel: 'Load Target',
        intro: 'Real progression target, not a scaled-back stand-in: reduce assistance week to week from the tested 5-rep baseline, autoregulated by pain-free ROM. Neutral or close grip is an available option, not a mandate, if standard wide grip aggravates the shoulder.',
        exercises: [
          { name: 'Assisted Pull-Up (Standard or Neutral/Close Grip)', sets: '3', reps: '5-8', load: 'Reduced assist week to week', tempo: 'Controlled', rest: '90s', cue: 'Full hang to chin-over-bar; switch to neutral grip if it aggravates.' },
        ],
      },
      {
        letter: 'E',
        title: 'ACCESSORY — SINGLE-ARM DB ROW',
        introLabel: 'Load Target',
        intro: 'Well-tolerated in cuff rehab (posterior-chain/scap-stabilizer work) — build progressively from the tested 35 lb reference at 1-2 RIR, close to normal progression.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '10-12/side', load: '35-40 lbs, build weekly', tempo: '2-1-2', rest: '60s', cue: 'Full lat stretch at bottom. Stop at sharp/pinching pain.' },
        ],
      },
    ],
    coolDown: 'Lat stretch 30s/side. Chest doorway stretch 30s/side. Thoracic extension over foam roller 60s.',
    iconsNote: "Sharp or pinching shoulder pain during a set — or pain lasting beyond 24 hours — is the stop signal: regress the range or substitute that exercise, and flag it before the next session. Ordinary muscular fatigue and normal training soreness are not stop signals. This is active strengthening work coordinated with Jason Bethea, not a maintenance-only day.",
  },
  {
    intensity: 70,
    title: 'DAY 3 — SATURDAY',
    subtitle: 'Full-Body Unilateral, Carries & Conditioning',
    descriptor: 'MODERATE ACCUMULATION DAY · UNILATERAL LEG WORK · CARRIES · METABOLIC FINISH',
    intensityLabel: '70% Day',
    intensityPara: "Moderate accumulation day — build clean volume at 2 RIR, not a max-effort test. Left leads every unilateral leg set this week per the asymmetry note. Farmers Carry and push-ups both load the shoulder girdle isometrically — apply the same pain-monitoring rule from Day 2 here too, even though today's primary focus is the lower body. The session closes with a short conditioning finisher — the metabolic third of the ICONS three-zone build.",
    warmUp: 'General warm-up: 5 min easy bike, leg swings, bodyweight glute bridges x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'HIP & ANKLE MOBILITY PREP',
        color: 'red',
        introLabel: 'Why',
        intro: 'General mobility prep ahead of unilateral leg work and loaded carries — no specific flag reported, applied as standard practice.',
        exercises: [
          { name: 'Ankle Dorsiflexion Rock', sets: '2', reps: '10/side', load: 'Bodyweight', tempo: 'Controlled', rest: '20s', cue: 'Knee tracks over 2nd/3rd toe; heel stays down.' },
          { name: 'Banded Monster Walk', sets: '2', reps: '10 steps/side', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Both directions; watch for hip drop.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY — SINGLE-LEG ROMANIAN DEADLIFT',
        introLabel: 'Load Target',
        intro: 'Reference load 30 lbs (no rep count recorded at intake) — left leg leads per the asymmetry protocol; build progressively at 1-2 RIR.',
        exercises: [
          { name: 'Single-Leg Romanian Deadlift', sets: '3', reps: '8/side', load: '30 lbs (reference) → build 1-2 RIR', tempo: '3-1-1', rest: '75s', cue: 'Left leg leads — weaker side. Hips square, soft knee.' },
        ],
      },
      {
        letter: 'C',
        title: 'LOADED CARRIES',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'Tested at 45 lbs/hand — hold there this week and build from it as grip and trunk control allow. This loads the shoulder girdle isometrically; ordinary grip/shoulder fatigue is expected, sharp or pinching pain is the stop signal.',
        exercises: [
          { name: 'Farmers Carry', sets: '3', reps: '30-40m', load: '45 lbs/hand', tempo: 'Steady', rest: '60s', cue: 'Tall posture, no shrug; even stride both sides.' },
        ],
      },
      {
        letter: 'D',
        title: 'CORE & PUSH-UP PROTOCOL',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'Progression from the tested 1:18 plank and 12-rep push-up baselines. Push-ups load the shoulder girdle isometrically through a controlled, non-overhead range — normally well-tolerated in cuff rehab; the same pain-monitoring rule still applies.',
        exercises: [
          { name: 'Plank Hold', sets: '3', reps: '45-60s', load: 'Bodyweight', tempo: 'Hold', rest: '45s', cue: 'Ribs down, no lumbar sag. Build past 1:18 baseline.' },
          { name: 'Push-Ups', sets: '3', reps: '10-14', load: 'Bodyweight', tempo: '2-0-1', rest: '60s', cue: 'Full range, no shoulder pinch. Build past 12-rep baseline.' },
        ],
      },
      {
        letter: 'E',
        title: 'CONDITIONING FINISHER',
        color: 'gold',
        introLabel: 'Format',
        intro: "The ICONS three-zone build closes every session with a metabolic component — this stays low-impact given the volume of the day.",
        exercises: [
          { name: 'Stationary Bike Intervals', sets: '1', reps: '8 x 30s hard / 90s easy', load: 'Moderate-hard', tempo: 'Intervals', rest: '—', cue: 'Energy becomes identity — hold form to the last round.' },
        ],
      },
    ],
    coolDown: "Hip flexor stretch 60s/side. Quad stretch 60s/side. Child's pose 60s.",
    iconsNote: 'Moderate accumulation day — build clean volume at 2 RIR, not a max-effort test. Left leads every unilateral leg set this week per the asymmetry note; sharp or pinching shoulder pain during carries or push-ups is still the stop signal, ordinary fatigue is not.',
  },
];

const summary = {
  subtitle: 'Moe Shahheidari  ·  ICONS Index  ·  3-Day Full-Body Build  ·  Week 1',
  rows: [
    ['Day 1', '80%', 'Lower Body & Posterior Chain', 'Hex Bar Deadlift · Back Squat', 'Add load at top of rep range + 2 RIR + clean form.'],
    ['Day 2', 'Rehab/Strength', 'Upper Push/Pull — Cuff Strengthening', 'Rotator Cuff/Scap Block · Incline Bench · OHP · Pull-Up · SA Row', 'Progress cuff/scap work through isometric→eccentric→concentric→dynamic; add load on OHP/pull-up/row at pain-free RIR.'],
    ['Day 3', '70%', 'Full-Body Unilateral & Carries', 'SL RDL · Farmers Carry · Plank/Push-Ups', 'Build carry load; extend plank hold and push-up reps past baseline.'],
  ],
  milestones4wk: 'Confirm all primary/secondary lifts are progressing cleanly at their prescribed RIR (add load only at top of rep range with clean form). Rotator cuff/scapular strengthening block progresses from isometric to slow eccentric loading, fully pain-free. Left-leads unilateral leg work should show improving control and even tempo both sides.',
  milestones8wk: 'Target Hex Bar Deadlift 195-200 x 5, Incline Bench 35-40 x 8, Single-Arm Row 40+ lbs x 10-12/side, Farmers Carry 55-60 lbs/hand, Plank 1:45-2:00, Push-Ups 20-22 reps. Overhead Press and Assisted Pull-Ups showing real week-over-week load/assistance progression, fully pain-free through range. Rotator cuff strengthening block progressed into controlled concentric or early dynamic loading, per Jason Bethea\'s clearance.',
  rescanNote: '8-week Styku re-scan — track ALST Index, VFA, Shape Score, body fat % trend, and left/right leg LST gap reduction (target: under 0.5 lbs), alongside the strength baselines table above and continued shoulder progress coordinated with Jason Bethea.',
};

const data = {
  client,
  styku,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'moe_shahheidari');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Moe_Shahheidari_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // No clientHighlight: this is Moe's first build — today's baseline testing
  // battery is not a PR/progress-since-last-version, so nothing real exists
  // yet to highlight. Omitted per spec rather than fabricated.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Moe_Shahheidari_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
