/**
 * Vinz Feller — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * New client. Built from Styku scan data (8/11/2026) and a self-reported
 * baseline strength testing session (same day). No clinical flag reported
 * at intake — this is a general strength & conditioning build, not a
 * corrective/rehab program.
 *
 * REVISION (8/11/2026, same day) — MALE CLIENT PROGRAMMING FRAMEWORK NOW
 * APPLIED: this document originally reported Vinz's Styku numbers with
 * Styku's own labels only ("Not At-Risk", "Low Risk", "Average") and a
 * purple note explaining that the women's Age Bracket Programming
 * Framework's numeric thresholds did not apply to him, with nothing
 * clinical substituted in their place. `icons-research-analyst` has since
 * built the "MALE CLIENT PROGRAMMING FRAMEWORK" section in CLAUDE.md
 * (immediately after the Evidence-Based Science Layer), giving real,
 * cited male-specific thresholds. This revision applies that framework:
 *   - ALST 7.55 kg/m² is now cited against EWGSOP2 2018's male cutoff
 *     (<7.0 AT-RISK / >=7.0 Not At-Risk) instead of just repeating
 *     Styku's uncited label.
 *   - VFA 70.0 cm² is now read against the ICONS VFA risk table directly
 *     (confirmed sex-independent in the framework's source studies)
 *     rather than only relaying Styku's label.
 *   - Body Fat % 26.5% gets its own new 'watch' note: Styku's "Average"
 *     is a peer-comparison rank, not an absolute classification — the
 *     ACE male body-fat-% table puts 26.5% in the "Obese" tier, worth
 *     him knowing even though ALST and BMI both read healthy.
 *   - BMI 23.6 is noted as Normal per WHO (not sex-specific) but framed
 *     alongside ALST/body-fat per the framework's caution about reading
 *     BMI in isolation for male clients.
 *   - Real protein (1.6-2.2 g/kg/day, ISSN 2017 + Morton 2018) and
 *     creatine (3-5g/day) targets replace the absence of a nutrition
 *     block — built as direct goldCallout/tealCallout baselineNotes,
 *     NOT via `nutritionBlock()`, which remains the women's tier system
 *     and stays out of scope for him (`includeNutritionBlock: false` is
 *     unchanged).
 *   - One informational testosterone/andropause note (Hildreth et al.
 *     2024) mirrors how HRT is handled for women — not diagnostic, not
 *     raised unprompted.
 *   - The purple demographic-scope note is revised (not deleted) to
 *     describe what the document now does: real male-specific thresholds
 *     applied, sex-neutral structural philosophy unchanged.
 * The training program itself (days, blocks, exercises, loads, asymmetry
 * protocol) is untouched by this revision — see below.
 *
 * ORIGINAL SCOPE NOTE (context for the above): per CLAUDE.md's
 * "Demographic scope rule" (Age Bracket Programming Framework), the
 * women's Evidence-Based Science Layer numeric thresholds (ALST sarcopenia
 * cutoffs, protein g/kg tiers, the LIFTMOR postmenopausal bone-loading
 * protocol, pelvic floor triggers) are validated specifically for women
 * 40s-60s navigating hormonal transitions and were never applied to Vinz,
 * a 50-year-old male — that remains true. What changed is that a real
 * male-specific framework now exists to use instead, rather than leaving
 * the gap unfilled.
 *
 * Concretely (updated):
 *   - `includeNutritionBlock: false` — nutritionBlock()/proteinTargets()
 *     are never called; that logic is the women's tier system. Real
 *     protein/creatine targets are supplied via baselineNotes instead
 *     (see above).
 *   - `client.isPostmenopausal: false` — the pelvic floor callout will not
 *     (and should not) auto-fire regardless of exercise content. Male
 *     pelvic floor symptoms (if ever reported) are handled as an
 *     individual clinical flag per the Male Client Programming Framework,
 *     not an auto-triggered callout — none reported at intake.
 *   - `client.alstIndex` stays 7.55 for the engine's own mechanical
 *     proteinBar-trigger check — 7.55 sits above both the 5.5 (women) and
 *     7.0 (men, EWGSOP2) at-risk lines, so this does not risk silently
 *     applying a women's-only interpretation; it just prevents an
 *     irrelevant reminder bar from appearing on every page.
 *   - A dedicated purple baselineNote spells out the current scope
 *     decision explicitly (now: framework applied, not "no framework
 *     exists"), following the same document-don't-bury-in-code pattern
 *     established for Jake Poyner (see scripts/jake_poyner_3day_plan.js).
 *
 * What DOES carry over from ICONS, because it's sex-neutral structural
 * philosophy, not a numeric threshold: the Isolated -> Compound ->
 * Metabolic three-zone build (every day ends with a conditioning
 * finisher), RIR-based autoregulated progressive overload (2 RIR default
 * working sets, 1 RIR on primary/peak lifts, add/same/drop weight rules),
 * and corrective-before-compound sequencing. The standard Styku-driven
 * asymmetry protocol (weaker LST side leads unilateral work) also carries
 * over — it's a biomechanical, not a demographic-specific, rule.
 *
 * REVISION (8/11/2026, same day) — REFACTORED ONTO NEW ENGINE HELPERS:
 * the hand-written weaker-side determination, protein/creatine callout,
 * and testosterone note above are now generated by icons_template.js's
 * `weakerSide()`, `maleNutritionNote()`, and `testosteroneNote()` (added
 * this same day per the subagent-team retro) instead of duplicated prose.
 *
 * REVISION (8/11/2026, same day) — REAL FIX FOLLOWING INDEPENDENT AUDIT:
 * icons-doc-auditor diffed this refactor against the prior committed
 * version (not just checking the new version in isolation) and caught that
 * the claim above — "rendered content is materially unchanged" — was
 * inaccurate for the protein target. The original hand-written note's
 * 150-165g/day working target was driven by TWO factors together: Vinz's
 * age bracket AND his ACE body-fat-% "Obese" tier finding (26.5% body fat,
 * despite normal BMI/ALST). The new `maleNutritionNote()`/
 * `maleProteinTargets()` helpers only checked age, silently dropping the
 * working target to 142-165g/day and dropping the composition-driven
 * reasoning from the visible text — a real numeric regression, not a pure
 * generation-method change (nothing clinically dangerous — both ranges sit
 * inside CLAUDE.md's cited 1.6-2.2 g/kg range — but inaccurate as shipped).
 * Fixed by:
 *   - Adding an optional `client.maleBodyFatConcern` field to
 *     `maleProteinTargets()`/`maleNutritionNote()` in icons_template.js,
 *     mirroring how the women's `proteinTargets()` checks `client.alstIndex`
 *     for its own escalation — backward compatible, no behavior change for
 *     a male client that doesn't set it.
 *   - Setting `client.maleBodyFatConcern: true` below, which restores the
 *     working target to 150-165g/day (2.0-2.2 g/kg at his 74.8kg) and
 *     restores the explicit "given both his age bracket and his ACE
 *     body-fat-% tier finding" reasoning to the rendered note text.
 *   - Separately, `testosteroneNote()` was fixed to branch on the 40-59 vs.
 *     60+ brackets (it previously labeled every 40+ client "40-59+
 *     bracket" with no upper bound) — does not change Vinz's own rendered
 *     text (he's 50, correctly in 40-59) but fixes a latent mislabeling
 *     bug for a future 60+ male client.
 * See CLAUDE.md's engine-additions note for the underlying calc.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad,
  weakerSide, maleNutritionNote, testosteroneNote,
} = require('./icons_template');

// ── Verify the pre-supplied 1RM / working-load figures ─────────────────
const oneRM = {
  deadlift: epley1RM(185, 8),        // 234
  squat: epley1RM(145, 6),           // 174
  hipThrust: epley1RM(145, 6),       // 174
  inclineBench: epley1RM(45, 8),     // 57
  row: epley1RM(60, 15),             // 90 (approximate — 15-rep test)
};

const wk1 = {
  deadlift: workingLoad(oneRM.deadlift, 0.80),     // 185
  squat: workingLoad(oneRM.squat, 0.70),           // 120
  hipThrust: workingLoad(oneRM.hipThrust, 0.70),   // 120
  inclineBench: workingLoad(oneRM.inclineBench, 0.90), // 50
  row: workingLoad(oneRM.row, 0.75),               // 70
};

const client = {
  name: 'Vinz Feller',
  programTitle: '3-Day Training Plan',
  subtitle: 'Full-Body Strength & Conditioning · Three-Zone Build',
  schedule: 'Tue/Thu/Sat · Full Gym',
  stats: ['Age 50', 'Male', "5'10\"", '165 lbs', 'Styku Scan 8/11/2026'],
  weightKg: 74.8,
  ageYears: 50,
  isPostmenopausal: false,
  bmr: 1658,
  alstIndex: 7.55, // Not At-Risk — EWGSOP2 2018 male cutoff <7.0; see Styku interpretation note
  // ACE male body-fat-% reference table places his 26.5% in the "Obese"
  // tier despite Styku's "Average" peer-comparison label and a Normal
  // BMI/Not-At-Risk ALST (see the watch note below) — this is the
  // documented composition finding that escalates his working protein
  // target, per maleProteinTargets()/maleNutritionNote() in
  // icons_template.js. Restored 8/11/2026 after icons-doc-auditor's
  // independent diff caught that the prior refactor onto those helpers had
  // silently dropped this factor (see header revision note below).
  maleBodyFatConcern: true,
};

const styku = {
  scanDate: '8/11/2026',
  bodyFatPct: 26.5,
  bodyFatRank: 'Average',
  leanMass: 115.5,
  leanMassPct: 70.1,
  fatMass: 43.6,
  boneMass: 5.5,
  bmi: 23.6,
  bmr: 1658,
  vfa: 70.0,
  shapeScore: 69,
  shapeScoreLabel: 'Needs Improvement',
  alstIndex: 7.55,
  leftArmLST: 10.0,
  rightArmLST: 10.8,
  leftLegLST: 21.5,
  rightLegLST: 22.7,
  peerComparison: 'Lower body fat than 50% of Styku peer comparisons.',
};

// weakerSide() (icons_template.js) replaces hand-derived weaker-side
// comments — lower LST = weaker = leads unilateral work.
const armWeakerSide = weakerSide(styku.leftArmLST, styku.rightArmLST); // 'left'
const legWeakerSide = weakerSide(styku.leftLegLST, styku.rightLegLST); // 'left'

const baselines = [
  ['Hex Bar Deadlift', '185 x 8 (est. 1RM 234)', '8/11/2026', '205–210 lbs x 5, progressive per RIR autoregulation'],
  ['Back Squat', '145 x 6 (est. 1RM 174)', '8/11/2026', '155–160 lbs x 6'],
  ['Hip Thrust', '145 x 6 (est. 1RM 174)', '8/11/2026', '155–165 lbs x 6'],
  ['Incline Bench Press', '45 x 8 (est. 1RM 57)', '8/11/2026', '55–60 lbs x 8'],
  ['Single-Arm DB Row', '60 x 15/side (approx. est. 1RM 90)', '8/11/2026', '70–75 lbs x 10–12/side'],
  ['Overhead Press', '35 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively via 1–2 RIR — no fixed numeric target'],
  ['Farmers Carry', '40 lbs/hand', '8/11/2026', '50–55 lbs/hand for 30–40m'],
  ['Weighted Plank', '10 lb plate x 1:35', '8/11/2026', '15–20 lb plate x 2:00+'],
  ['Push-Ups', '26 reps (bodyweight, full)', '8/11/2026', '32–35 reps'],
  ['Assisted Pull-Ups (Wide/Std/Close)', '15 reps/grip, assisted', '8/11/2026', 'Reduce assistance / progress toward 1–3 unassisted reps per grip'],
];

const baselineNotes = [
  {
    type: 'teal',
    label: 'Styku Scan Interpretation — Male Client Programming Framework (8/11/2026)',
    body: "Lean Mass 115.5 lbs (70.1%), Fat Mass 43.6 lbs, Bone Mass 5.5 lbs (3.4%), BMR 1658 cal/day, Shape Score 69/100. ALST Index 7.55 kg/m² — EWGSOP2 2018's male low-muscle-mass cutoff is <7.0 kg/m² AT-RISK / ≥7.0 kg/m² Not At-Risk (the same source already used for the women's 5.5 kg/m² threshold in this system); Vinz sits comfortably above the line. VFA 70.0 cm² — the ICONS VFA risk table (<70 Very Low Risk / 70–99 Low Risk / 100–149 Moderate Risk / ≥150 High Risk cm²) is validated sex-independent and applies to him directly; 70.0 sits right at the boundary of the Low Risk band. BMI 23.6 falls in the WHO Normal range (18.5–24.9) — WHO BMI thresholds are not sex-specific. See the note below for why BMI, ALST, and body fat % need to be read together rather than any one in isolation.",
  },
  {
    type: 'watch',
    label: 'Body Fat % & BMI — Why These Need To Be Read Together',
    body: "Styku's Body Fat 26.5% carries the label \"Average\" — but that is a peer-comparison rank (lower body fat than 50% of Styku's user base), not an absolute health classification. Against the ACE body-fat-% reference for men (Essential 2–5% / Athletes 6–13% / Fitness 14–17% / Acceptable 18–24% / Obese 25%+), 26.5% falls in the Obese tier — a genuinely different read than \"Average\" suggests. His BMI of 23.6 is Normal per WHO thresholds, and his ALST of 7.55 kg/m² is Not At-Risk — but BMI should always be read alongside body fat % and ALST for a male client, not alone, especially for anyone visibly muscular. Vinz's profile isn't the over-flagged-muscular-athlete case that caution is usually written for; it's closer to the opposite — a normal-weight, non-sarcopenic client whose body composition, not his overall size, is the metric worth acting on.",
  },
  {
    type: 'watch',
    label: `${armWeakerSide === 'left' ? 'Left' : 'Right'}-Side Asymmetry — Arms & Legs`,
    body: `Left Arm LST ${styku.leftArmLST} lbs vs Right Arm LST ${styku.rightArmLST} lbs (${(Math.abs(styku.leftArmLST - styku.rightArmLST)).toFixed(1)} lb gap, ${armWeakerSide} weaker) and Left Leg LST ${styku.leftLegLST} lbs vs Right Leg LST ${styku.rightLegLST} lbs (${(Math.abs(styku.leftLegLST - styku.rightLegLST)).toFixed(1)} lb gap, ${legWeakerSide} weaker) — the ${armWeakerSide} side reads weaker on both the upper and lower body. Standard ICONS asymmetry protocol applied: ${armWeakerSide} leads every unilateral exercise (single-arm row, split squat, single-leg RDL), the ${armWeakerSide}/weaker side is logged separately from the right in the coaching cue, and any suitcase-style anti-lateral-flexion carry work has the ${armWeakerSide} hand hold the load. Re-check both gaps at the 8-week Styku rescan — both should trend toward under 0.5 lbs.`,
  },
  {
    type: 'purple',
    audience: 'internal', // Client View: documentation-methodology note — explains which
    // internal science-layer framework/thresholds were selected and why, build-process
    // reasoning rather than client-facing coaching content.
    label: 'Male Client Programming Framework — What Was Applied Here',
    body: "ICONS's Evidence-Based Science Layer's five-bracket Age Bracket Programming Framework (protein/creatine g/kg tiers, ALST sarcopenia thresholds, the LIFTMOR postmenopausal bone-loading protocol, pelvic floor triggers) is derived from and validated for women 40s-60s navigating hormonal transitions — none of its numeric thresholds are applied to Vinz directly. Instead, this document uses the Male Client Programming Framework: his ALST, VFA, and BMI are interpreted above against real male-specific citations (EWGSOP2 2018, the sex-independent VFA table, WHO BMI thresholds read alongside the ACE body-fat-% classification), and his protein/creatine targets and the testosterone note below come from that framework's ISSN 2017 / Morton 2018 and Hildreth et al. 2024 sources rather than the women's tiers. What carries over unchanged from ICONS regardless of sex: the Isolated → Compound → Metabolic structural philosophy, RIR-based autoregulated progressive overload, corrective-before-compound sequencing, and the Styku segmental asymmetry protocol — all demographic-neutral principles, applied here on their own merits.",
  },
  // Protein/creatine targets and the testosterone/andropause note are now
  // generated by the engine's maleNutritionNote()/testosteroneNote() helpers
  // (icons_template.js) rather than hand-written prose — `render` splices
  // their pre-built paragraphs directly into the document. As of the
  // 8/11/2026 audit-fix revision (see header comment above), the protein
  // note's working target and reasoning now correctly reflect BOTH his age
  // bracket and his ACE body-fat-% tier finding via `client.maleBodyFatConcern`
  // above — matching the original hand-written note's 150-165g/day
  // reasoning, not just its narrower age-only successor. See CLAUDE.md's
  // engine-additions note for the underlying calc.
  { render: maleNutritionNote(client) },
  ...testosteroneNote(client).length ? [{ render: testosteroneNote(client) }] : [],
  {
    type: 'gold',
    label: 'Purpose of This Program',
    body: "General strength and conditioning development — no injury or clinical flag reported at intake. This 3-day build applies the ICONS three-zone philosophy (Isolated activation/corrective work → Compound strength → Metabolic conditioning finisher) across a Lower Body / Upper Body / Full-Body split, with weekly intensity deliberately varied (80% / 90% / 70%) rather than held flat, and every primary and secondary lift autoregulated on RIR rather than a fixed percentage grind.",
  },
];

const weekOverview = [
  { day: 'SUN', intensity: 'Off', focus: 'Rest' },
  { day: 'MON', intensity: 'Off', focus: 'Rest' },
  { day: 'TUE', intensity: 80, focus: 'Lower Body & Posterior Chain' },
  { day: 'WED', intensity: 'Off', focus: 'Rest' },
  { day: 'THU', intensity: 90, focus: 'Upper Body Push/Pull' },
  { day: 'FRI', intensity: 'Off', focus: 'Rest' },
  { day: 'SAT', intensity: 70, focus: 'Full-Body Unilateral & Carries' },
];

const days = [
  {
    intensity: 80,
    title: 'DAY 1 — TUESDAY',
    subtitle: 'Lower Body & Posterior Chain (Primary)',
    descriptor: 'PRIMARY STRENGTH DAY · HEX BAR DEADLIFT & BACK SQUAT',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day for the week — the last 1–2 reps on the deadlift should be hard but clean. Control precedes power: the corrective block below earns full-depth, braced positions before any load goes on the bar.',
    warmUp: 'General warm-up: 5 min easy bike, hip circles, bodyweight squats x10, glute bridges x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'HIP & KNEE ACTIVATION',
        color: 'red',
        introLabel: 'Why',
        intro: 'General joint-health activation for the hip/knee complex ahead of heavy hip-hinge and squat loading — no specific flag reported, applied as standard practice.',
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
        intro: `Week 1 working load ${wk1.squat} lbs (70% of est. 1RM ${oneRM.squat}) — 2 RIR working sets, technique-first after the deadlift.`,
        exercises: [
          { name: 'Back Squat', sets: '3', reps: '6', load: `${wk1.squat} lbs (Wk1)`, tempo: '3-1-1', rest: '90s', cue: 'Ribs stacked over pelvis; full depth, 2 RIR.' },
        ],
      },
      {
        letter: 'D',
        title: 'CORE / CARRY-PREP ACCESSORY',
        color: 'gold',
        introLabel: 'Format',
        intro: "Anti-rotation core work plus an isometric carry-prep hold — sets up Saturday's loaded Farmers Carry work.",
        exercises: [
          { name: 'Half-Kneeling Pallof Press', sets: '3', reps: '10/side', load: 'Mod band', tempo: '2s hold', rest: '45s', cue: 'Resist rotation; ribs stacked over hips.' },
          { name: 'Suitcase Hold (Isometric)', sets: '2', reps: '20s/side', load: 'Mod DB', tempo: 'Hold', rest: '30s', cue: 'Left hand leads — weaker side per asymmetry note.' },
        ],
      },
    ],
    coolDown: 'Hip flexor stretch 60s/side. Hamstring stretch 60s/side. Foam roll quads/glutes 60s each.',
    iconsNote: 'Control precedes power — earn full-depth, braced positions on the corrective block before adding load. No PRs today; an 80% day is a hard, honest working session, not a max-effort test.',
  },
  {
    intensity: 90,
    title: 'DAY 2 — THURSDAY',
    subtitle: 'Upper Body Push/Pull (Peak)',
    descriptor: 'PEAK INTENSITY DAY · NEAR-MAXIMAL PRESSING, FULL RECOVERY BETWEEN SETS',
    intensityLabel: '90% Day',
    intensityPara: "Peak intensity for the week — near-maximal on the incline press. Rest fully between top sets; this is not the day to rush for the sake of session length. Strength builds confidence, and this is where it's earned.",
    warmUp: 'General warm-up: 5 min row or bike, arm circles, band pull-aparts x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'SHOULDER & SCAPULAR PREP',
        color: 'red',
        introLabel: 'Why',
        intro: 'Primes the scapular stabilizers ahead of heavy pressing and pulling — standard shoulder-health practice for a peak upper-body day.',
        exercises: [
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: 'Controlled', rest: '30s', cue: 'Squeeze shoulder blades; ribs down.' },
          { name: 'Face Pull', sets: '2', reps: '12', load: 'Light band/cable', tempo: 'Controlled', rest: '30s', cue: 'Elbows high; external rotation at end range.' },
          { name: 'Scap Push-Up', sets: '2', reps: '10', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'Protract/retract only; arms stay straight.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — INCLINE BENCH PRESS',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.inclineBench} lbs (90% of est. 1RM ${oneRM.inclineBench}) — 1 RIR, peak-intensity day. Rest fully between sets.`,
        exercises: [
          { name: 'Incline Dumbbell Bench Press', sets: '4', reps: '5', load: `${wk1.inclineBench} lbs (Wk1)`, tempo: '2-0-1', rest: '2 min', cue: 'Even bar path both arms. 1 RIR top set.', rirNote: '1 RIR top set' },
        ],
      },
      {
        // Antagonist Rotation Rule fix (8/15/2026 rotating audit): this block
        // (pull-up progression) was originally lettered D and sequenced after
        // the OHP block, putting two pull-up grip variants directly ahead of
        // Block E's Single-Arm DB Row — a distinct, separately-loaded compound
        // pull exercise, not a grip variant of the same pull-up movement, so
        // the grip/skill-progression exemption (which covers a single movement
        // progressing through grip width, e.g. this Wide->Standard sequence
        // itself) does not extend to cover the Row stacking on top of it. That
        // produced 3 consecutive pull-pattern exercises across the D->E block
        // boundary (Pull-Up Wide, Pull-Up Standard, Single-Arm DB Row). Fixed
        // by resequencing this block ahead of the OHP block (now lettered D,
        // below) rather than dropping or altering any exercise — the OHP
        // (push) block now sits between the pull-up progression and the row,
        // breaking the run: Incline Bench(B, push) -> Pull-Up Wide/Standard(C,
        // pull, pull) -> OHP(D, push) -> Single-Arm DB Row(E, pull). No 3
        // same-pattern exercises in a row anywhere in the day.
        letter: 'C',
        title: 'PULL — PULL-UP PROGRESSION',
        color: 'purple',
        introLabel: 'Load Target',
        intro: 'Progress by reducing assistance from the tested 15-rep/grip assisted baseline (wide, standard, close) — track assistance level, not just reps.',
        exercises: [
          { name: 'Assisted Pull-Up (Wide Grip)', sets: '3', reps: '8–10', load: 'Reduced assist', tempo: 'Controlled', rest: '90s', cue: 'Full hang to chin-over-bar; reduce assist vs test.' },
          { name: 'Assisted Pull-Up (Standard Grip)', sets: '2', reps: '8–10', load: 'Reduced assist', tempo: 'Controlled', rest: '90s', cue: 'Full stretch at bottom; controlled descent.' },
          { name: 'Assisted Pull-Up (Close Grip)', sets: '2', reps: '8–10', load: 'Reduced assist', tempo: 'Controlled', rest: '90s', cue: 'Hands inside shoulder width; reduce assist vs test.' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY — OVERHEAD PRESS',
        introLabel: 'Load Target',
        intro: 'No percentage prescription — self-select load off the tested 35 lb reference at 1–2 RIR; establish a true Week 1 working weight here.',
        exercises: [
          { name: 'Standing Overhead Press', sets: '3', reps: '6', load: 'Self-select ~35 lbs', tempo: 'Controlled', rest: '2 min', cue: 'Brace hard; no lumbar arch. 1–2 RIR.' },
        ],
      },
      {
        letter: 'E',
        title: 'ACCESSORY — SINGLE-ARM DB ROW',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.row} lbs (from an approximate estimate off a 15-rep test) for 10–12 reps — left arm leads per the asymmetry note; log left vs. right separately.`,
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '10–12/side', load: `${wk1.row} lbs (Wk1)`, tempo: '2-1-2', rest: '60s', cue: 'Left arm leads — weaker side. Log L vs R reps.' },
        ],
      },
    ],
    coolDown: 'Lat stretch 30s/side. Chest doorway stretch 30s/side. Thoracic extension over foam roller 60s.',
    iconsNote: 'Peak intensity day — near-maximal, 1 RIR on primary lifts. Full rest between top sets; this is not the day to rush between sets for the sake of session length.',
  },
  {
    intensity: 70,
    title: 'DAY 3 — SATURDAY',
    subtitle: 'Full-Body Unilateral, Carries & Conditioning',
    descriptor: 'MODERATE ACCUMULATION DAY · UNILATERAL LEG WORK · CARRIES · METABOLIC FINISH',
    intensityLabel: '70% Day',
    intensityPara: "Moderate accumulation day — build clean volume at 2 RIR, not a max-effort test. Left leads every unilateral set this week per the asymmetry note. The session closes with a short conditioning finisher — the metabolic third of the ICONS three-zone build.",
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
        title: 'PRIMARY STRENGTH — HIP THRUST',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.hipThrust} lbs (70% of est. 1RM ${oneRM.hipThrust}) — 2 RIR, moderate accumulation day.`,
        exercises: [
          { name: 'Barbell Hip Thrust', sets: '3', reps: '8', load: `${wk1.hipThrust} lbs (Wk1)`, tempo: '2-1-2', rest: '90s', cue: 'Full lockout, ribs down. 2 RIR working sets.' },
        ],
      },
      {
        letter: 'C',
        title: 'UNILATERAL LEG WORK',
        introLabel: 'Format',
        intro: 'Left leg leads every set — direct application of the standard asymmetry protocol (lower LST = weaker = leads unilateral work).',
        exercises: [
          { name: 'Bulgarian Split Squat', sets: '3', reps: '8/side', load: 'Mod DB', tempo: '2-1-1', rest: '75s', cue: 'Left leg leads — weaker side. Even depth both sides.' },
          { name: 'Single-Leg Romanian Deadlift', sets: '2', reps: '8/side', load: 'Light-Mod DB', tempo: '3-1-1', rest: '60s', cue: 'Left leg leads. Hips square, soft knee.' },
        ],
      },
      {
        letter: 'D',
        title: 'LOADED CARRIES',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'Tested at 40 lbs/hand — hold there this week and build from it as grip and trunk control allow.',
        exercises: [
          { name: 'Farmers Carry', sets: '3', reps: '30–40m', load: '40 lbs/hand', tempo: 'Steady', rest: '60s', cue: 'Tall posture, no shrug; even stride both sides.' },
        ],
      },
      {
        letter: 'E',
        title: 'CORE',
        introLabel: 'Load Target',
        intro: 'Progression from the tested 10 lb plate / 1:35 weighted plank baseline — build hold time and/or load week to week.',
        exercises: [
          { name: 'Weighted Plank', sets: '3', reps: '45–60s', load: '10 lb plate (Wk1)', tempo: 'Hold', rest: '45s', cue: 'Ribs down, no lumbar sag. Build past 1:35 baseline.' },
        ],
      },
      {
        letter: 'F',
        title: 'CONDITIONING FINISHER',
        color: 'gold',
        introLabel: 'Format',
        intro: "The ICONS three-zone build closes every session with a metabolic component — this stays low-impact on a moderate day.",
        exercises: [
          { name: 'Stationary Bike Intervals', sets: '1', reps: '8 x 30s hard / 90s easy', load: 'Moderate-hard', tempo: 'Intervals', rest: '—', cue: 'Energy becomes identity — hold form to the last round.' },
        ],
      },
    ],
    coolDown: "Hip flexor stretch 60s/side. Quad stretch 60s/side. Child's pose 60s.",
    iconsNote: 'Moderate accumulation day — build clean volume at 2 RIR, not a max-effort test. Left leads every unilateral set this week per the asymmetry note.',
  },
];

const summary = {
  subtitle: 'Vinz Feller  ·  ICONS Index  ·  3-Day Full-Body Build  ·  Week 1',
  rows: [
    ['Day 1', '80%', 'Lower Body & Posterior Chain', 'Hex Bar Deadlift · Back Squat', 'Add load at top of rep range + 2 RIR + clean form.'],
    ['Day 2', '90%', 'Upper Body Push/Pull', 'Incline Bench · OHP · Pull-Up · SA Row', 'Reduce pull-up assistance; add load on press/row at 2 RIR.'],
    ['Day 3', '70%', 'Full-Body Unilateral & Carries', 'Hip Thrust · Split Squat · Farmers Carry', 'Build carry distance/load; extend weighted plank hold time.'],
  ],
  milestones4wk: 'Confirm all primary/secondary lifts are progressing cleanly at their prescribed RIR (add load only at top of rep range with clean form). Reduce pull-up assistance by at least one increment per grip. Left-leads unilateral work should show improving control and even tempo both sides.',
  milestones8wk: 'Target Hex Bar Deadlift 205–210 x 5, Back Squat/Hip Thrust 155–165 x 6, Incline Bench 55–60 x 8, Single-Arm Row 70–75 x 10–12/side, Farmers Carry 50–55 lbs/hand, Weighted Plank 15–20 lb plate x 2:00+, Push-Ups 32–35 reps. Pull-up assistance meaningfully reduced across all three grips.',
  rescanNote: '8-week Styku re-scan — track ALST Index, VFA, Shape Score, and left/right arm & leg LST gap reduction (target: both gaps under 0.5 lbs), alongside the strength baselines table above.',
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
  const outDir = path.join(__dirname, '..', 'clients', 'vinz_feller');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Vinz_Feller_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // No clientHighlight: this is Vinz's first build — today's baseline
  // testing battery is not a PR/progress-since-last-version, so nothing
  // real exists yet to highlight. Omitted per spec rather than fabricated.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Vinz_Feller_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
