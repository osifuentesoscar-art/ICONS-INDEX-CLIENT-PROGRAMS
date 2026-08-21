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
 *
 * REVISION (8/17/2026, External Evidence Review response) — ASYMMETRY
 * TRIGGER LANGUAGE + VFA FRAMING CORRECTED (protein/nutrition language is
 * OUT OF SCOPE for this pass — he is on the Male Client Programming
 * Framework, which the review did not touch; see CLAUDE.md's "Protein
 * Targets — Men" section, unchanged):
 *   - Asymmetry: CLAUDE.md's Asymmetry Protocol section was corrected from
 *     an absolute 0.5 lb trigger to a RELATIVE >=10% trigger. Recomputed
 *     both of Vinz's gaps as a percentage of the larger side (the engine
 *     has no built-in %-relative helper yet):
 *       - ARMS: 0.8 lb gap / 10.8 lbs = ~7.4% — below the corrected >=10%
 *         threshold, even though it cleared the old 0.5 lb absolute one.
 *       - LEGS: 1.2 lb gap / 22.7 lbs = ~5.3% — likewise below the
 *         corrected threshold.
 *     Per the corrected standard's own retroactive-scope note ("some
 *     clients' documented gaps may no longer clear 10%... needs careful
 *     per-client verification, not a blanket rewrite"), the existing
 *     left-side-leads unilateral prescription (both arms and legs) is
 *     being LEFT IN PLACE here rather than silently removed — this is a
 *     targeted language-correction pass, not a re-determination of his
 *     programming. FLAGGED FOR HUMAN REVIEW: whether Vinz's unilateral-lead
 *     assignment should be re-evaluated (e.g. against a functional
 *     single-limb strength/power test, per the corrected standard's
 *     preferred primary trigger) is a genuine open question for both arms
 *     and legs, not resolved by this pass. Rendered language updated to
 *     cite the relative % instead of the retired absolute trigger.
 *   - VFA: CLAUDE.md's VFA section was corrected the same day to retire the
 *     absolute risk-band table (<70/70-99/100-149/>=150 -> Very Low/Low/
 *     Moderate/High Risk) in favor of trend-tracking language. Vinz's VFA
 *     70.0 cm² note reworded accordingly — no longer labeled against a
 *     risk band.
 *
 * REVISION (8/21/2026) — ICONS BLOCK METHOD RESTRUCTURE + STANDING
 * TOUCH-RULE PASS. Full existing record read first (his CLIENTS.md entry in
 * full and this script in full) before anything was changed; every prior
 * clinical decision, tested baseline, audit fix, and internal note was
 * re-confirmed against the source rather than re-derived.
 *
 * 1. SIX-SLOT ARCHITECTURE. All three days rebuilt onto Corrective ->
 *    Primary Compound -> Accessory -> Jason's exercise -> Secondary Compound
 *    -> Third Compound (Integration), with block titles naming the slot each
 *    block occupies. SLOT 4 IS OMITTED ENTIRELY ON ALL THREE DAYS, honestly:
 *    Vinz has no Jason Bethea SOAP-note record and no coordinated-care
 *    relationship — no filler was inserted in its place. Day 3 mapped 1:1
 *    onto existing content with no exercise reordered at all (its old
 *    combined unilateral block simply split into Accessory + Secondary
 *    Compound, preserving the split-squat-before-SL-RDL order). Days 1 and 2
 *    each gained one genuinely new block to fill the accessory slot with
 *    real content rather than filler — Day 1 machine leg work (leg extension
 *    + hamstring curl, both confirmed studio inventory, no invented loads:
 *    self-select at 1 RIR), Day 2 a Push-Up Protocol built off his TESTED
 *    26-rep baseline, which had a documented 8-week target (32-35) but was
 *    never actually programmed anywhere in the document.
 *
 * 2. ANTAGONIST ROTATION re-walked on the FULL RENDERED ORDER across block
 *    boundaries, not per block. Two ordering consequences: (a) Day 1's
 *    accessory runs Leg Extension BEFORE Hamstring Curl — the reverse order
 *    would have produced Glute Bridge -> Hex Deadlift -> Hamstring Curl,
 *    three consecutive posterior-chain exercises across the A->B->C
 *    boundaries; (b) Day 2's corrective block swapped Scap Push-Up and Face
 *    Pull, so the block no longer ends on a push directly ahead of the
 *    Incline Press and the new Push-Up Protocol (which would have been three
 *    consecutive pushes). The 8/15/2026 audit fix's requirement — that the
 *    close/standard/wide pull-up grip battery is never adjacent to the
 *    single-arm row — is PRESERVED and re-verified: the row now sits in the
 *    integration closer with the overhead press between it and the battery.
 *
 * 3. SINGLE-ARM ROW EXITS THE STUDIO'S DUMBBELL INVENTORY (implement fix).
 *    His prescription ran Wk1 70 lbs -> Wk4 72.5-75 lbs per hand against a
 *    confirmed 60 lbs/hand dumbbell ceiling — i.e. it was outside inventory
 *    from Week 1, not just at the Week 4 target. Renamed to Single-Arm
 *    Landmine Row (Kieser row stated as the equivalent machine option); the
 *    TESTED baseline stays recorded as what it actually was (60 lbs x 15/side
 *    on dumbbells) and the target numbers are unchanged — only the implement
 *    carrying them changed. Stated in the block intro and the baselines row,
 *    not just in code.
 *
 * 4. RIR CORRECTED ON BOTH PRIMARY LIFTS. Hex Bar Deadlift and Incline
 *    Dumbbell Bench Press both carried "1 RIR top set," which is the
 *    hypertrophy-priority ACCESSORY target, not the primary-lift default —
 *    both now run at 2 RIR, matching the corrected standard. 1 RIR is now
 *    used only where it belongs: the new hypertrophy accessories (push-ups,
 *    leg extension, hamstring curl, Bulgarian split squat). The overhead
 *    press's "1-2 RIR" and the baselines table's "1-2 RIR" line were
 *    tightened to 2 RIR the same way.
 *
 * 5. DAY 2 RE-ANCHORED FROM 90% (RED) TO 80% (GOLD). Red/90% days are now
 *    reserved for clients with an actual testing or competition rationale;
 *    Vinz has neither documented. Compounding this, his incline-press "90%"
 *    was 90% of an ESTIMATED 1RM (57) derived from a 45 x 8 test — the
 *    weakest possible basis for a near-maximal prescription. The re-anchor
 *    is a LABEL and RIR change, not a load cut: the prescribed Week 1 load
 *    stays 50 lbs and now builds to 55 by Week 4, with the top set at 2 RIR
 *    instead of 1. Weekly intensity variation is preserved (80 / 80 / 70
 *    plus the deload week), and near-maximal work now appears where it has a
 *    real rationale — the Week 4 strength check.
 *
 * 6. PROACTIVE WEEK 5 DELOAD ADDED. He meets the 8+ week continuous-
 *    progression criterion, so the deload is scheduled into the program
 *    rather than left to autoregulation: same exercises, sets roughly
 *    halved, loads held at 50-70% of working weights, everything in the 3+
 *    RIR technique band, framed as a "reload." Placed immediately after the
 *    Week 4 strength check per the house pattern. Milestones and the rescan
 *    note were reconciled to it.
 *
 * 7. TOUCH-RULE PASS: Face Pull's "Light band/cable" renamed (there is no
 *    standalone cable stack — the Kieser is the studio's cable machine);
 *    every progressing lift's `load` field converted to the Wk1 -> Wk4
 *    convention; dumbbell ceiling (60 lbs/hand) and kettlebell ceiling (25
 *    lbs) stated where a progression approaches them, with the hex bar named
 *    as the vehicle for carries past 60 lbs/hand; warm-up strings checked for
 *    drift (clean — all three are unloaded mobility/movement rehearsal, no
 *    loaded prescriptions hiding in prose); reassessment language updated to
 *    the 4-week strength / 8-12 week Styku two-clock split. Male Client
 *    Programming Framework content is UNTOUCHED — ALST 7.55 Not At-Risk,
 *    maleProteinTargets()/maleNutritionNote() (including its 0.4 g/kg
 *    per-meal figure, which is deliberately NOT changed to the women's
 *    corrected 0.3), and testosteroneNote() at age 50 all render exactly as
 *    before.
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

// Week 4 targets — the top of the four-week progression, feeding the Week 4
// strength check (ICONS reassesses strength every 4 weeks; the Styku body-
// composition rescan runs on its own separate 8-12 week clock). Stepped up
// roughly one intensity band from Week 1 off the same estimated 1RMs
// (deadlift 80% -> 86%, squat/hip thrust 70% -> 78%), with the pressing and
// rowing lifts stepped by the smallest increment the studio's implements
// allow. No invented numbers — every figure derives from a tested baseline.
const wk4 = {
  deadlift: workingLoad(oneRM.deadlift, 0.86),      // 200
  squat: workingLoad(oneRM.squat, 0.78),            // 135
  hipThrust: workingLoad(oneRM.hipThrust, 0.78),    // 135
  inclineBench: wk1.inclineBench + 5,               // 55
  row: wk1.row + 5,                                 // 75
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
  ['Single-Arm Row (DB tested / landmine programmed)', '60 x 15/side, DB (approx. est. 1RM 90)', '8/11/2026', '80–85 lbs x 10–12/side on the landmine or Kieser (Week 4 lands at 75, so the eight-week number steps past it like every other lift here). Landmine load is not dumbbell-equivalent — the leverage differs, so track this as its own progression from Week 1 rather than against the 60 lbs/hand DB test'],
  ['Overhead Press', '35 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively at 2 RIR — no fixed numeric target'],
  ['Farmers Carry', '40 lbs/hand', '8/11/2026', '50–55 lbs/hand for 30–40m'],
  ['Weighted Plank', '10 lb plate x 1:35', '8/11/2026', '15–20 lb plate x 2:00+'],
  ['Push-Ups', '26 reps (bodyweight, full)', '8/11/2026', '32–35 reps'],
  ['Assisted Pull-Ups (Wide/Std/Close)', '15 reps/grip, assisted', '8/11/2026', 'Reduce assistance / progress toward 1–3 unassisted reps per grip'],
];

const baselineNotes = [
  {
    type: 'teal',
    label: 'Styku Scan Interpretation — Male Client Programming Framework (8/11/2026)',
    body: "Lean Mass 115.5 lbs (70.1%), Fat Mass 43.6 lbs, Bone Mass 5.5 lbs (3.4%), BMR 1658 cal/day, Shape Score 69/100. ALST Index 7.55 kg/m² — EWGSOP2 2018's male low-muscle-mass cutoff is <7.0 kg/m² AT-RISK / ≥7.0 kg/m² Not At-Risk (the same source already used for the women's 5.5 kg/m² threshold in this system); Vinz sits comfortably above the line. VFA 70.0 cm² is tracked here as a trend indicator rather than an absolute risk-band classification — no consensus body endorses a single cm² cutoff, so this reading is watched directionally at future rescans; the sex-independence of the underlying visceral-adiposity evidence still applies to him directly. BMI 23.6 falls in the WHO Normal range (18.5–24.9) — WHO BMI thresholds are not sex-specific. See the note below for why BMI, ALST, and body fat % need to be read together rather than any one in isolation.",
  },
  {
    type: 'watch',
    label: 'Body Fat % & BMI — Why These Need To Be Read Together',
    body: "Styku's Body Fat 26.5% carries the label \"Average\" — but that is a peer-comparison rank (lower body fat than 50% of Styku's user base), not an absolute health classification. Against the ACE body-fat-% reference for men (Essential 2–5% / Athletes 6–13% / Fitness 14–17% / Acceptable 18–24% / Obese 25%+), 26.5% falls in the Obese tier — a genuinely different read than \"Average\" suggests. His BMI of 23.6 is Normal per WHO thresholds, and his ALST of 7.55 kg/m² is Not At-Risk — but BMI should always be read alongside body fat % and ALST for a male client, not alone, especially for anyone visibly muscular. Vinz's profile isn't the over-flagged-muscular-athlete case that caution is usually written for; it's closer to the opposite — a normal-weight, non-sarcopenic client whose body composition, not his overall size, is the metric worth acting on.",
  },
  {
    type: 'watch',
    label: `${armWeakerSide === 'left' ? 'Left' : 'Right'}-Side Asymmetry — Arms & Legs`,
    body: `Left Arm LST ${styku.leftArmLST} lbs vs Right Arm LST ${styku.rightArmLST} lbs (${(Math.abs(styku.leftArmLST - styku.rightArmLST)).toFixed(1)} lb gap, roughly 7% relative to the larger side, ${armWeakerSide} weaker) and Left Leg LST ${styku.leftLegLST} lbs vs Right Leg LST ${styku.rightLegLST} lbs (${(Math.abs(styku.leftLegLST - styku.rightLegLST)).toFixed(1)} lb gap, roughly 5% relative, ${legWeakerSide} weaker) — the ${armWeakerSide} side reads weaker on both the upper and lower body. Standard ICONS asymmetry protocol applied as a coaching convention: ${armWeakerSide} leads every unilateral exercise (single-arm row, split squat, single-leg RDL), the ${armWeakerSide}/weaker side is logged separately from the right in the coaching cue, and any suitcase-style anti-lateral-flexion carry work has the ${armWeakerSide} hand hold the load. Both gaps are tracked closely at the 8-week Styku rescan to confirm this assignment still reflects a real, worth-addressing difference.`,
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
    type: 'blue',
    label: 'Planned Deload — Week 5, Directly After the Week 4 Strength Check',
    body: "This program deliberately includes one lighter week, and it is planned rather than a reaction to anything going wrong. Week 5 — immediately after the Week 4 strength check — is a structured reload: the same three days, the same exercises, the same movement patterns, with working sets cut roughly in half, loads dropped to about 50-70% of the weights being used in Week 4, and every set held comfortably in the technique band with three or more reps left in reserve. No top sets, no personal bests, no max-effort tests that week. This is what makes eight straight weeks of climbing loads sustainable at 50: the fatigue and joint stress that accumulate through a hard four-week block get cleared while the strength built in Weeks 1-4 consolidates. One light week costs nothing that matters — muscle built over a month is not lost in a single reduced-volume week, and the small edge of peak strength that dips returns within days of resuming. Weeks 6-8 then rebuild from the Week 4 loads toward the eight-week targets.",
  },
  {
    type: 'gold',
    label: 'How This Program Is Reassessed',
    body: "Two separate clocks, and they are not the same measurement. Strength is rechecked every four weeks — the Week 4 numbers in each lift's load line are the checkpoint, and they set the loads for the block that follows. Body composition is rescanned on its own longer cycle, at roughly eight weeks, because composition changes on a slower timeline than strength does and reading it more often mostly reads noise. The Week 4 strength check is also the only place near-maximal work belongs; normal training weeks stop with two reps in reserve.",
  },
  {
    type: 'teal',
    audience: 'internal',
    label: 'Session Architecture — Restructure Record (8/21/2026)',
    body: "All three days rebuilt onto the standing six-slot session architecture: Corrective -> Primary Compound -> Accessory -> Jason's exercise -> Secondary Compound -> Third Compound (Integration). Slot 4 omitted entirely on all three days — Vinz has no Jason Bethea SOAP-note record and no coordinated-care relationship on file, so the honest action is omission, not filler. Day 3 required no exercise reordering (its combined unilateral block split into Accessory + Secondary Compound, preserving split-squat-before-SL-RDL). Days 1 and 2 each gained one new accessory block built from real content rather than filler: Day 1 machine leg work (leg extension + hamstring curl, both confirmed studio inventory, self-select at 1 RIR — no invented loads), Day 2 a Push-Up Protocol built off his tested 26-rep baseline, which carried an 8-week target in the baselines table but had never been programmed in any day. Antagonist rotation re-walked on the full rendered order across block boundaries: Day 1's accessory deliberately runs leg extension before hamstring curl (the reverse would make Glute Bridge -> Hex Deadlift -> Hamstring Curl three consecutive posterior-chain), and Day 2's corrective block swapped scap push-up and face pull so it no longer ends on a push directly ahead of the incline press and push-up protocol. The 8/15/2026 audit fix (pull-up grip battery must never be adjacent to the single-arm row) is preserved — the overhead press now sits between them in the Day 2 closer.",
  },
  {
    type: 'teal',
    audience: 'internal',
    label: 'Compound-Slot Options & Intensity Decisions — Selection Record (8/21/2026)',
    body: "Every compound slot carries a same-pattern options menu in its block intro, with the tested movement named as the progression anchor. Vinz carries no clinical flags, so the filtering constraint on his menus is the confirmed studio inventory rather than a clinical restriction: dumbbells cap at 60 lbs/hand and kettlebells at 25 lbs, so the barbell is named as the destination once his incline press outgrows the dumbbells, the hex bar is named as the carry vehicle past 60 lbs/hand, and the landmine/Kieser carry the single-arm row (whose prescription already exceeded the dumbbell ceiling in Week 1 — corrected in this pass). No option was listed that the inventory does not contain. INTENSITY RE-ANCHOR: Day 2 moved from 90% (Red) to 80% (Gold). Red days are reserved for a documented testing or competition rationale, which he does not have, and the specific 90% figure was 90% of an estimated 1RM (57) derived from a 45 x 8 rep test — the weakest possible basis for a near-maximal prescription. This is a label and RIR change, not a load cut: Week 1 stays 50 lbs and builds to 55 by Week 4, at 2 RIR rather than 1. Week now runs 80/80/70 plus the planned Week 5 deload; near-maximal work is confined to the Week 4 strength check, where it has a real rationale.",
  },
  {
    type: 'gold',
    label: 'Purpose of This Program',
    body: "General strength and conditioning development — no injury or clinical flag reported at intake. This 3-day build applies the ICONS three-zone philosophy (Isolated activation/corrective work → Compound strength → Metabolic conditioning finisher) across a Lower Body / Upper Body / Full-Body split. Every session runs the same architecture: a corrective opener, a primary compound lift, muscle-building accessory work, a second compound lift in a different pattern, and a closing compound movement that pulls the day together — carries, anti-rotation work, or a standing press-and-row couplet. Every compound lift lists alternates the coach can rotate to on the day without losing the thread, with the tested lift staying the one that gets tracked. Weekly intensity is deliberately varied (80% / 80% / 70%, plus a planned lighter week at Week 5) rather than held flat, and every lift is autoregulated on reps in reserve rather than a fixed percentage grind.",
  },
];

const weekOverview = [
  { day: 'SUN', intensity: 'Off', focus: 'Rest' },
  { day: 'MON', intensity: 'Off', focus: 'Rest' },
  { day: 'TUE', intensity: 80, focus: 'Lower Body & Posterior Chain' },
  { day: 'WED', intensity: 'Off', focus: 'Rest' },
  { day: 'THU', intensity: 80, focus: 'Upper Body Push/Pull' },
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
    intensityPara: 'Primary strength day for the week — the deadlift should finish with two clean reps still in reserve: hard, but never a grind. Control precedes power: the corrective block below earns full-depth, braced positions before any load goes on the bar.',
    warmUp: 'General warm-up: 5 min easy bike, hip circles, bodyweight squats x10, glute bridges x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — HIP & KNEE ACTIVATION',
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
        title: 'PRIMARY COMPOUND — HEX BAR DEADLIFT',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.deadlift} lbs (80% of est. 1RM ${oneRM.deadlift}), building toward roughly ${wk4.deadlift} lbs by Week 4 — two reps in reserve on the top set, which is the working standard for a primary lift. Add load only at the top of the rep range with clean form. If the day calls for a variation, rotate between: a conventional barbell deadlift (longer lever, a more demanding brace), a barbell Romanian deadlift (same hinge, longer hamstring range, lighter load), or a rack/block pull (a shortened range for a day the floor position isn't clean). Every option is the same hinge pattern, and the hex bar deadlift stays the lift that gets tracked and retested.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `Wk1: ${wk1.deadlift} → Wk4: ${wk4.deadlift} lbs`, tempo: '2-0-1', rest: '2 min', cue: 'Neutral spine, brace hard. Stop with 2 reps left.', rirNote: '2 RIR top set' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — QUAD & HAMSTRING HYPERTROPHY',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Direct muscle-building work for the legs, machine-based so it can be pushed hard without adding any more spinal load after the deadlift. The leg extension primes the knee-dominant pattern for the squat that follows; the hamstring curl trains knee flexion, which the hinge above never reaches. Both are hypertrophy-priority sets, taken to one rep in reserve. There is no tested baseline on either machine yet, so load is self-selected to hit that target and logged every week.',
        exercises: [
          { name: 'Leg Extension', sets: '3', reps: '10–12', load: 'Self-select at 1 RIR', tempo: '2-1-2', rest: '60s', cue: 'Full lockout, controlled lower. Log the setting weekly.', rirNote: '1 RIR' },
          { name: 'Lying/Seated Hamstring Curl', sets: '3', reps: '10–12', load: 'Self-select at 1 RIR', tempo: '2-1-2', rest: '60s', cue: 'Hips stay down; slow return, no snapping back.', rirNote: '1 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — BACK SQUAT',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.squat} lbs (70% of est. 1RM ${oneRM.squat}), building toward ${wk4.squat} lbs by Week 4 — two reps in reserve, technique-first after the deadlift. This is the day's second compound pattern: knee-dominant, rotating off the hinge above. If the day calls for a variation, rotate between: a goblet squat (lighter, upright torso, useful when depth is the limiter), a front squat (same depth demand, more upright), or a box squat (a fixed depth that keeps the pattern honest on a tired day). The back squat stays the lift that gets tracked and retested.`,
        exercises: [
          { name: 'Back Squat', sets: '3', reps: '6', load: `Wk1: ${wk1.squat} → Wk4: ${wk4.squat} lbs`, tempo: '3-1-1', rest: '90s', cue: 'Ribs stacked over pelvis; full depth, 2 reps left.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'THIRD COMPOUND (INTEGRATION) — ANTI-ROTATION & LOADED CARRY',
        color: 'gold',
        introLabel: 'Why',
        intro: `The session's closer — one block that puts the whole day together: the braced trunk from the deadlift, the leg drive from the squat, and grip, all held at once while walking. The isometric suitcase hold this block used to finish on is now a loaded carry — the same pattern moving instead of standing still — with the left hand holding the load per the asymmetry note. Load starts at 30 lbs/hand, deliberately below the 40 lbs/hand already carried on Saturday, because this version is one-sided and lands at the end of the heaviest day of the week. Distance and posture govern this work, not a rep target. Variations: a bilateral farmer's carry (both hands loaded) or a front-rack kettlebell carry (kettlebells run to 25 lbs per bell); any time the carry is one-sided, the left hand holds the load.`,
        exercises: [
          { name: 'Half-Kneeling Pallof Press', sets: '3', reps: '10/side', load: 'Mod band', tempo: '2s hold', rest: '45s', cue: 'Resist rotation; ribs stacked over hips.' },
          { name: 'Suitcase Carry (Left-Led)', sets: '2', reps: '20–25 yd/side', load: '30 lbs/hand', tempo: 'Steady', rest: '60s', flag: 'Left hand holds the load — weaker side per the asymmetry note', cue: 'Tall, level shoulders; resist the lean the whole way.', rirNote: 'Distance & posture governed — no RIR target' },
        ],
      },
    ],
    coolDown: 'Hip flexor stretch 60s/side. Hamstring stretch 60s/side. Foam roll quads/glutes 60s each.',
    iconsNote: 'Control precedes power — earn full-depth, braced positions on the corrective block before adding load. No PRs today; an 80% day is a hard, honest working session, not a max-effort test.',
  },
  {
    intensity: 80,
    title: 'DAY 2 — THURSDAY',
    subtitle: 'Upper Body Push/Pull (Primary)',
    descriptor: 'PRIMARY UPPER-BODY DAY · INCLINE PRESS · PULL-UP PROGRESSION · PRESS & ROW CLOSER',
    intensityLabel: '80% Day',
    intensityPara: "The week's primary upper-body session. Every working set finishes with two clean reps left in reserve rather than at a near-maximal grind — the last rep should be hard and still look like the first. Rest fully between top sets on the press; this is not the day to rush for the sake of session length. Strength builds confidence, and this is where it's earned.",
    warmUp: 'General warm-up: 5 min row or bike, arm circles, band pull-aparts x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — SHOULDER & SCAPULAR PREP',
        color: 'red',
        introLabel: 'Why',
        intro: 'Primes the scapular stabilizers ahead of heavy pressing and pulling — standard shoulder-health practice before a primary upper-body day.',
        exercises: [
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: 'Controlled', rest: '30s', cue: 'Squeeze shoulder blades; ribs down.' },
          { name: 'Scap Push-Up', sets: '2', reps: '10', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'Protract/retract only; arms stay straight.' },
          { name: 'Face Pull', sets: '2', reps: '12', load: 'Light band or Kieser', tempo: 'Controlled', rest: '30s', cue: 'Elbows high; external rotation at end range.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — INCLINE DUMBBELL BENCH PRESS',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.inclineBench} lbs, building toward ${wk4.inclineBench} lbs by Week 4 — two reps in reserve on the top set. Dumbbells in the studio run to 60 lbs per hand, so any progression past that point moves to the barbell rather than a heavier dumbbell. If the day calls for a variation, rotate between: a flat dumbbell bench press, a barbell bench press (the natural home once the load outgrows the dumbbells), a landmine press (the most shoulder-friendly arc of the group), or a dumbbell floor press (a shortened range that is easy on the shoulder). The incline dumbbell press stays the lift that gets tracked and retested.`,
        exercises: [
          { name: 'Incline Dumbbell Bench Press', sets: '4', reps: '5–6', load: `Wk1: ${wk1.inclineBench} → Wk4: ${wk4.inclineBench} lbs`, tempo: '2-0-1', rest: '2 min', cue: 'Even path both arms. Stop with 2 reps left.', rirNote: '2 RIR top set' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — PUSH-UP PROTOCOL',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'Baseline 26 full push-ups, tested 8/11/2026 — this is the muscle-building accessory behind the pressing work above, and the block that moves that number. Worked hard: a hypertrophy-priority set taken to one rep in reserve, stopping short of failure every time. Eight-week target is 32–35 reps in a single set.',
        exercises: [
          { name: 'Push-Up (Full)', sets: '3', reps: '12–15', load: 'Bodyweight', tempo: '2-1-1', rest: '60s', cue: 'Straight line head to heels; chest to fist height.', rirNote: '1 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — PULL-UP PROGRESSION',
        color: 'purple',
        introLabel: 'Load Target',
        intro: 'The day’s second compound pattern — vertical pulling, rotating off the pressing work above. Progress by reducing assistance from the tested 15-rep/grip assisted baseline (wide, standard, close): track assistance level, not just reps. The three grips are one movement progressing through hand position, so they are deliberately run back to back. If the day calls for a variation, rotate between: a band-assisted pull-up (a different assistance feel, useful for checking real strength), a Kieser pulldown (a machine-loaded version of the same vertical pull), or a slow eccentric-only pull-up from the top. The assisted pull-up on the machine stays the movement that gets tracked and retested.',
        exercises: [
          { name: 'Assisted Pull-Up (Wide Grip)', sets: '3', reps: '8–10', load: 'Reduced assist vs. test', tempo: 'Controlled', rest: '90s', cue: 'Full hang to chin-over-bar; reduce assist vs test.', rirNote: '2 RIR' },
          { name: 'Assisted Pull-Up (Standard Grip)', sets: '2', reps: '8–10', load: 'Reduced assist vs. test', tempo: 'Controlled', rest: '90s', cue: 'Full stretch at bottom; controlled descent.', rirNote: '2 RIR' },
          { name: 'Assisted Pull-Up (Close Grip)', sets: '2', reps: '8–10', load: 'Reduced assist vs. test', tempo: 'Controlled', rest: '90s', cue: 'Hands inside shoulder width; reduce assist vs test.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'THIRD COMPOUND (INTEGRATION) — STANDING PRESS & ROW COUPLET',
        color: 'gold',
        introLabel: 'Why',
        intro: `The session's closer — the day's press and pull patterns brought together standing, alternating, with the trunk holding position under both. Neither load here is a new number: the overhead press self-selects off the tested 35 lb reference, and the row carries its own Week 1 → Week 4 line off the tested 60 lbs × 15/side. The row runs on the landmine because the studio's dumbbells stop at 60 lbs per hand and this progression passes that ceiling in Week 1 — a Kieser row is the equally good machine version. Left arm leads every row set; log left and right separately. If the day calls for a variation, rotate between: a landmine press-to-row couplet on the same bar, a half-kneeling single-arm press paired with a chest-supported row, or a seated Kieser press and row pairing.`,
        exercises: [
          { name: 'Standing Overhead Press', sets: '3', reps: '6', load: 'Self-select ~35 lbs, build weekly', tempo: 'Controlled', rest: '2 min', cue: 'Brace hard; no lumbar arch. Stop with 2 reps left.', rirNote: '2 RIR' },
          { name: 'Single-Arm Landmine Row (Left-Led)', sets: '3', reps: '10–12/side', load: `Wk1: ${wk1.row} → Wk4: ${wk4.row} lbs`, tempo: '2-1-2', rest: '60s', flag: 'Left arm leads — weaker side per the asymmetry note', cue: 'Left arm first. Flat back, pull to hip. Log L vs R.', rirNote: '2 RIR' },
        ],
      },
    ],
    coolDown: 'Lat stretch 30s/side. Chest doorway stretch 30s/side. Thoracic extension over foam roller 60s.',
    iconsNote: 'A primary strength day, not a max-effort test — two reps in reserve on the press and the row, and full rest between top sets. Near-maximal work belongs at the Week 4 strength check, not in a normal training week.',
  },
  {
    intensity: 70,
    title: 'DAY 3 — SATURDAY',
    subtitle: 'Full-Body Unilateral, Carries & Conditioning',
    descriptor: 'MODERATE ACCUMULATION DAY · UNILATERAL LEG WORK · CARRIES · METABOLIC FINISH',
    intensityLabel: '70% Day',
    intensityPara: "Moderate accumulation day — build clean volume at two reps in reserve, not a max-effort test. Left leads every unilateral set this week per the asymmetry note. The session closes with a short conditioning finisher — the metabolic third of the ICONS three-zone build.",
    warmUp: 'General warm-up: 5 min easy bike, leg swings, bodyweight glute bridges x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — HIP & ANKLE MOBILITY PREP',
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
        title: 'PRIMARY COMPOUND — BARBELL HIP THRUST',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.hipThrust} lbs (70% of est. 1RM ${oneRM.hipThrust}), building toward ${wk4.hipThrust} lbs by Week 4 — two reps in reserve on a moderate accumulation day. If the day calls for a variation, rotate between: a single-leg hip thrust (left leg leads, far lighter), a barbell or bodyweight glute bridge (a shorter range, easy on the shoulders against the bench), or a hyperextension to tolerance (the same hip extension standing up). The barbell hip thrust stays the lift that gets tracked and retested.`,
        exercises: [
          { name: 'Barbell Hip Thrust', sets: '3', reps: '8', load: `Wk1: ${wk1.hipThrust} → Wk4: ${wk4.hipThrust} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Full lockout, ribs down. Stop with 2 reps left.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — BULGARIAN SPLIT SQUAT (LEFT-LED)',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Left leg leads every set — direct application of the asymmetry protocol (the lower-lean-mass side leads unilateral work). A hypertrophy-priority accessory, taken to one rep in reserve, and the knee-dominant pattern that rotates off the hip thrust above. Dumbbells run to 60 lbs per hand; if the load outgrows that, the same set runs holding a single heavier implement or with the barbell in a front-rack position.',
        exercises: [
          { name: 'Bulgarian Split Squat', sets: '3', reps: '8/side', load: 'Mod DB (to 60 lbs/hand)', tempo: '2-1-1', rest: '75s', flag: 'Left leg leads — weaker side per the asymmetry note', cue: 'Left leg leads. Even depth both sides.', rirNote: '1 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — SINGLE-LEG ROMANIAN DEADLIFT (LEFT-LED)',
        introLabel: 'Load Target',
        intro: 'The day’s second compound pattern — a hinge, rotating off the knee-dominant work above, and one of the ten tested ICONS Index movements. Left leg leads every set. Load stays light-to-moderate: balance and hip control are the limiter here, not strength. If the day calls for a variation, rotate between: a two-hand dumbbell single-leg RDL (easier to balance, more load), a rack- or rail-supported single-leg RDL (a hand on the upright removes the balance demand entirely), or a b-stance RDL (back toe down for support, still one hip doing the work).',
        exercises: [
          { name: 'Single-Leg Romanian Deadlift', sets: '3', reps: '8/side', load: 'Light-Mod DB', tempo: '3-1-1', rest: '60s', flag: 'Left leg leads — weaker side per the asymmetry note', cue: 'Left leg leads. Hips square, soft knee.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'THIRD COMPOUND (INTEGRATION) — LOADED CARRY & CORE UNDER LOAD',
        color: 'gold',
        introLabel: 'Load Target',
        intro: `The session's closer — the day's hip work, grip, and trunk position held together under load. Carry tested at 40 lbs/hand on 8/11/2026: hold there in Week 1 and build toward 45 lbs/hand by Week 4 as grip and trunk control allow. Plank progresses from the tested 10 lb plate × 1:35 baseline. If the day calls for a variation, rotate between: a suitcase carry (one-sided, left hand holds the load), a hex bar carry (the vehicle once load passes the 60 lbs/hand dumbbell ceiling), or a front-rack kettlebell carry (to 25 lbs per bell — lighter, with an upright-posture bias). Distance and posture govern the carry, not a rep target.`,
        exercises: [
          { name: 'Farmers Carry', sets: '3', reps: '30–40m', load: `Wk1: 40 → Wk4: 45 lbs/hand`, tempo: 'Steady', rest: '60s', cue: 'Tall posture, no shrug; even stride both sides.', rirNote: 'Distance & posture governed — no RIR target' },
          { name: 'Weighted Plank', sets: '3', reps: '45–60s', load: 'Wk1: 10 → Wk4: 15 lb plate', tempo: 'Hold', rest: '45s', cue: 'Ribs down, no lumbar sag. Build past the 1:35 baseline.' },
        ],
      },
      {
        letter: 'F',
        title: 'METABOLIC FINISHER',
        color: 'gold',
        introLabel: 'Format',
        intro: "The ICONS three-zone build closes every session with a metabolic component — this stays low-impact on a moderate day.",
        exercises: [
          { name: 'Stationary Bike Intervals', sets: '1', reps: '8 x 30s hard / 90s easy', load: 'Moderate-hard', tempo: 'Intervals', rest: '—', cue: 'Energy becomes identity — hold form to the last round.' },
        ],
      },
    ],
    coolDown: "Hip flexor stretch 60s/side. Quad stretch 60s/side. Child's pose 60s.",
    iconsNote: 'Moderate accumulation day — build clean volume at two reps in reserve, not a max-effort test. Left leads every unilateral set this week per the asymmetry note.',
  },
];

const summary = {
  subtitle: 'Vinz Feller  ·  ICONS Index  ·  3-Day Full-Body Build  ·  Week 1',
  rows: [
    ['Day 1', '80%', 'Lower Body & Posterior Chain', 'Hex Bar Deadlift · Back Squat · Suitcase Carry', `Hex DL ${wk1.deadlift} → ${wk4.deadlift} lbs, Squat ${wk1.squat} → ${wk4.squat} lbs by Wk 4, all at 2 RIR.`],
    ['Day 2', '80%', 'Upper Body Push/Pull', 'Incline Press · Push-Ups · Pull-Ups · OHP + Row', `Incline ${wk1.inclineBench} → ${wk4.inclineBench} lbs, row ${wk1.row} → ${wk4.row} lbs; reduce pull-up assist each grip.`],
    ['Day 3', '70%', 'Full-Body Unilateral & Carries', 'Hip Thrust · Split Squat · SL RDL · Carries', `Hip Thrust ${wk1.hipThrust} → ${wk4.hipThrust} lbs; carry 40 → 45 lbs/hand; plank 10 → 15 lb plate.`],
  ],
  milestones4wk: `Week 4 is the strength check, and these are the numbers it checks against: Hex Bar Deadlift ${wk4.deadlift} lbs x 5, Back Squat ${wk4.squat} lbs x 6, Hip Thrust ${wk4.hipThrust} lbs x 8, Incline Dumbbell Press ${wk4.inclineBench} lbs x 5-6, Single-Arm Landmine Row ${wk4.row} lbs x 10-12/side, Farmers Carry 45 lbs/hand, Weighted Plank 15 lb plate — every one of them reached at two reps in reserve with clean form, not by grinding. Pull-up assistance reduced by at least one increment on each of the three grips. Push-ups moving off the 26-rep baseline. Left-led unilateral work showing improving control and even tempo on both sides. Week 5, immediately after this check, is the planned deload week — same exercises, sets roughly halved, loads dropped to 50-70%, everything at 3+ reps in reserve — before Weeks 6-8 rebuild.`,
  milestones8wk: 'Target Hex Bar Deadlift 205–210 x 5, Back Squat 155–160 x 6, Hip Thrust 155–165 x 6, Incline Dumbbell Press 55–60 x 8 (the barbell takes over past the 60 lbs/hand dumbbell ceiling), Single-Arm Landmine Row 80–85 x 10–12/side, Farmers Carry 50–55 lbs/hand, Weighted Plank 15–20 lb plate x 2:00+, Push-Ups 32–35 reps in a single set. Pull-up assistance meaningfully reduced across all three grips. These are eight-week targets measured after the Week 5 deload and the Weeks 6-8 rebuild — not numbers to chase through the lighter week.',
  rescanNote: 'Two clocks, deliberately separate. Strength is rechecked every four weeks against the Week 4 numbers above. Body composition gets a Styku re-scan at eight weeks — landing at the end of the Weeks 6-8 rebuild rather than mid-deload, so it reads a consolidated block. Track at that scan: ALST Index (currently 7.55 kg/m², above the male at-risk line), VFA trend (currently 70.0 cm², read directionally rather than against a fixed risk band), body fat % against the composition note above, Shape Score, and left/right arm and leg lean-mass gaps (currently ~7% relative for arms, ~5% for legs — both below the threshold that would make the left-leads assignment a corrective priority rather than a coaching convention), alongside the strength baselines table.',
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
