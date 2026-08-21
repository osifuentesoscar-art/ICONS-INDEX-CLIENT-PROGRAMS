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
 * Asymmetry (REVISED 8/17/2026, External Evidence Review response — see
 * CLAUDE.md's Asymmetry Protocol section, corrected the same day, from an
 * absolute 0.5 lb trigger to a RELATIVE >=10% trigger): recomputed both
 * gaps as a percentage of the larger side, since the engine has no built-in
 * %-relative helper yet.
 *   - LEGS: 1.1 lb gap / 22.8 lbs = ~4.8% — DOES NOT meet the corrected
 *     >=10% relative threshold, even though it cleared the old 0.5 lb
 *     absolute trigger. Per the corrected standard's retroactive-scope note
 *     ("some clients' documented gaps may no longer clear 10%... needs
 *     careful per-client verification, not a blanket rewrite"), the
 *     existing left-leg-leads unilateral prescription is being LEFT IN
 *     PLACE here rather than silently removed — this is a targeted
 *     language-correction pass, not a re-determination of his programming.
 *     FLAGGED FOR HUMAN REVIEW: whether Moe's leg unilateral-lead
 *     assignment should be re-evaluated (e.g. against a functional
 *     single-leg strength/power test, per the corrected standard's
 *     preferred primary trigger) is a genuine open question, not resolved
 *     by this pass.
 *   - ARMS: 0.4 lb gap / 12.7 lbs = ~3.1% — also below the corrected
 *     threshold, consistent with the existing monitor-only (no lead
 *     assigned) treatment — no prescription change needed here.
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
 *
 * REVISION (8/18/2026, Client View audience-leak fix — audit finding): the
 * Styku interpretation note's VFA sentence carried a "(CLAUDE.md's VFA
 * section, corrected 8/17/2026)" citation into the Client View. SPLIT per
 * the Aimee Morris LIFTMOR precedent — the trend-indicator clinical framing
 * stays visible; the standard citation and correction date moved to a new
 * audience:'internal' note. No exercise, load, or clinical-content change.
 *
 * REVISION (8/21/2026) — ICONS BLOCK METHOD RESTRUCTURE, CLINICALLY-LED.
 * Full existing record read first (his CLIENTS.md entry in full and this
 * script in full). Moe is a CLINICALLY-LED build: per CLAUDE.md's own
 * override, the clinician's structure comes FIRST and the session
 * architecture is fitted around it, not the other way round. Concretely,
 * nothing about the rotator cuff protocol was re-derived, rescheduled, or
 * advanced — Day 2's cuff/scapular block keeps its position (first, before
 * any compound lift), its three prescribed drills, its isometric -> slow
 * eccentric -> controlled concentric -> dynamic progression, its REHAB/
 * STRENGTH badge override, and every word of its pain-guardrail framing.
 *
 * 1. SIX-SLOT MAPPING. Day 1: A Corrective / B Primary Compound (Hex Bar
 *    Deadlift) / C Accessory (leg extension + hamstring curl) / D Secondary
 *    Compound (Back Squat) / E Integration (Pallof + left-led suitcase
 *    carry). Day 2: A Corrective (cuff & scapular strengthening) / B Primary
 *    Compound (Incline DB Press) / C Accessory (Single-Arm DB Row) / D
 *    Secondary Compound (Overhead Press -> plank shoulder taps -> assisted
 *    pull-up) / E Integration (bear crawl hold). Day 3: A Corrective / B
 *    Primary Compound (SL RDL, left-led) / C Accessory (Push-Up Protocol) /
 *    D Secondary Compound (Split Squat, left-led) / E Integration (carry +
 *    plank) / F Metabolic Finisher.
 *
 * 2. SLOT 4 (Jason's exercise) — omitted on all three days, for two
 *    different honest reasons. On Day 2 it is CONSUMED BY THE CORRECTIVE
 *    SLOT: his Jason-coordinated shoulder work IS the block-A cuff and
 *    scapular protocol, kept exactly where Jason's own progression puts it,
 *    so placing it a second time in slot 4 would double-count it. On Days 1
 *    and 3 there is no documented Jason exercise for a lower-body session,
 *    so the slot is simply left out. No filler anywhere.
 *
 * 3. SHOULDER-REINTRODUCTION ADDENDUM APPLIED — this program does
 *    reintroduce and progress overhead pressing, so the addendum binds:
 *    (a) the overhead press is now immediately followed by a STATIC
 *    CLOSED-CHAIN HOLD (plank shoulder taps, with the quadruped/knees-down
 *    regression named in the exercise's own flag field), re-anchoring
 *    scapular control on a stable base straight after open-chain overhead
 *    loading; (b) the scapular block now carries a real EXPERT OPTIONS MENU
 *    (band pull-apart, scapular retraction-depression hold, scapular
 *    push-up, prone I's alongside the Y-T-W's, face pull, wall slide with
 *    lift-off) instead of one default set of drills repeated by rote, with
 *    two families explicitly filtered OUT pending Jason's clearance —
 *    hanging/dead-hang scapular work (traction on a healing cuff) and
 *    end-range overhead loading beyond the press already prescribed. Both
 *    additions are bodyweight and both name a regression; neither advances
 *    his loading past what his record already documents (push-ups at 3 x
 *    10-14 were already prescribed and tolerated).
 *
 * 4. CONSTRAINT-FILTERED OPTIONS ON EVERY COMPOUND SLOT. Each menu was
 *    filtered against his documented pain-free protocol before it was
 *    written, and the exclusions are stated rather than silently omitted:
 *    no barbell bench press (fixed bar path removes the shoulder's ability
 *    to find its own line), no front-rack barbell squat (end-range external
 *    rotation under load), no hanging scapular work, and every press option
 *    (landmine, floor press, half-kneeling single-arm, seated with back
 *    support) explicitly inherits the same pain-free-range rule as the
 *    press itself. Front-rack kettlebell carries are offered only
 *    conditionally ("if the front-rack position is comfortable that day").
 *
 * 5. PROACTIVE WEEK 5 DELOAD — non-negotiable for a rehab-flagged client,
 *    so it is written into the program rather than left to autoregulation.
 *    Same exercises, sets roughly halved, loads at 50-70%, everything at
 *    3+ RIR. The cuff/scapular block is the stated exception: it holds its
 *    current stage through that week rather than either advancing or being
 *    cut, because rehab continuity matters more than the fatigue relief the
 *    deload exists to provide. Milestones and rescan note reconciled to it.
 *
 * 6. RIR CORRECTED. The Hex Bar Deadlift's "1 RIR top set" and the Incline
 *    Press's "1-2 RIR" were stale — 2 RIR is the primary-lift default. Both
 *    corrected, along with three "1-2 RIR" lines in the baselines table.
 *    Deliberate departure worth stating: the hypertrophy accessories are
 *    ALSO held at 2 RIR rather than the 1 RIR a healthy client's accessory
 *    work would use — with the cuff in active rehab the extra rep of margin
 *    is worth more than the last increment of stimulus. Stated in the
 *    document, not just here.
 *
 * 7. NEW CONTENT, and why it is not filler: Day 1 and Day 3 each gained one
 *    block to fill the accessory and secondary-compound slots with real
 *    work rather than a placeholder — Day 1 machine leg work (leg extension
 *    + hamstring curl, confirmed studio inventory, zero shoulder
 *    involvement, self-select load, no invented numbers), Day 3 a left-led
 *    Split Squat (the loaded lunge pattern his week otherwise never
 *    touched, dumbbells at the sides so the shoulder stays out of it).
 *    Day 3's push-up and plank baselines were split out of one combined
 *    block into the accessory and integration slots respectively — same
 *    exercises, same targets, no content lost.
 *
 * 8. ANTAGONIST ROTATION re-walked on the FULL RENDERED ORDER across block
 *    boundaries. Day 1 runs the leg extension before the hamstring curl so
 *    Glute Bridge -> Hex Deadlift -> Hamstring Curl never becomes three
 *    consecutive posterior-chain exercises. Day 2 alternates push/pull
 *    throughout (press, row, press, pull) with the bodyweight holds outside
 *    the rule's loaded-compound scope. Day 3 runs hinge -> push -> knee ->
 *    carry. No three same-pattern exercises run consecutively anywhere.
 *
 * 9. TOUCH-RULE PASS: Wk1 -> Wk4 load convention applied wherever a real
 *    number exists (hex deadlift, incline press, carry); dumbbell (60
 *    lbs/hand) and kettlebell (25 lbs) ceilings stated where a progression
 *    approaches them, hex bar named as the carry vehicle past 60; face
 *    pull written as band-or-Kieser (the Kieser is the studio's cable
 *    machine); reassessment language updated to the 4-week strength /
 *    8-12 week Styku two-clock split; warm-up strings checked for drift —
 *    clean, all three are unloaded. Male Client Programming Framework
 *    content untouched: ALST 7.92 Not At-Risk, maleProteinTargets()/
 *    maleNutritionNote() with maleBodyFatConcern (including the 0.4 g/kg
 *    per-meal figure, deliberately NOT changed to the women's corrected
 *    0.3), and testosteroneNote() on the 40-59 branch all render as before.
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

// Week 4 targets — the top of the four-week progression, feeding the Week 4
// strength check (strength is reassessed every 4 weeks; the Styku body-
// composition rescan runs on its own separate 8-12 week clock). Derived from
// the same estimated 1RMs as Week 1, stepped up roughly one intensity band
// on the deadlift and by the smallest available dumbbell increment on the
// press. Every figure traces to a tested baseline — nothing invented.
const wk4 = {
  deadlift: workingLoad(oneRM.deadlift, 0.855),  // 190
  inclineBench: wk1.inclineBench + 5,            // 35
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
const armGap = Math.abs(styku.leftArmLST - styku.rightArmLST); // 0.4 lb / ~3.1% relative — below the corrected >=10% Asymmetry Protocol trigger

const baselines = [
  ['Hex Bar Deadlift', `175 x 8 (est. 1RM ${oneRM.deadlift})`, '8/11/2026', `${wk1.deadlift + 15}-${wk1.deadlift + 20} lbs x 5, progressive per RIR autoregulation`],
  ['Back Squat', '90 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively at 2 RIR — no fixed numeric target'],
  ['Incline Dumbbell Bench Press', `25 x 8 (est. 1RM ${oneRM.inclineBench})`, '8/11/2026', '35-40 lbs x 8, progressive per RIR autoregulation'],
  ['Overhead Press', '17.5 x 8 (reference — rotator cuff strengthening in progress)', '8/11/2026', 'Progressive strengthening work, pain-free ROM — load builds weekly, autoregulated by RIR not a fixed % table'],
  ['Single-Arm DB Row', '35 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively at 2 RIR — pain-free through the shoulder'],
  ['Farmers Carry', '45 lbs/hand', '8/11/2026', '55-60 lbs/hand for 30-40m'],
  ['Single-Leg Romanian Deadlift', '30 lbs (reference load, reps not recorded)', '8/11/2026', 'Build progressively at 2 RIR — left leg leads'],
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
    body: `Lean Mass ${styku.leanMass} lbs (${styku.leanMassPct}%), Fat Mass ${styku.fatMass} lbs, Bone Mass ${styku.boneMass} lbs (3.0%), BMR ${styku.bmr} cal/day, Shape Score ${styku.shapeScore}/100 ("${styku.shapeScoreLabel}"). ALST Index ${styku.alstIndex} kg/m² — EWGSOP2 2018's male low-muscle-mass cutoff is <7.0 kg/m² AT-RISK / ≥7.0 kg/m² Not At-Risk (the same source already used for the women's 5.5 kg/m² threshold in this system); Moe sits comfortably above the line — this is the clinically-governing figure for his muscle-mass status, see the note below for how it relates to Styku's own internal flag. VFA ${styku.vfa} cm² is tracked here as a trend indicator rather than a fixed risk-band classification — no consensus body endorses a single absolute cm² cutoff, so this reading is watched directionally at future rescans rather than labeled against a risk band; the sex-independence of the underlying visceral-adiposity evidence still applies to him directly. BMI ${styku.bmi} falls in the WHO Overweight range (25-29.9) — WHO BMI thresholds are not sex-specific, and unlike the "over-flagged muscular athlete" caution the Male Client Programming Framework raises for reading BMI in isolation, this BMI reading is concordant with — not contradicted by — his body fat % and lean mass findings below. There is no muscular-athlete false positive to correct for here.`,
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'VFA Framing — Standard Basis for the Trend-Indicator Language',
    body: 'The VFA framing in the Styku interpretation note above follows CLAUDE.md\'s VFA section as corrected 8/17/2026, which retired the prior four-tier absolute risk-band table (<70 / 70-99 / 100-149 / ≥150 cm²) in favor of per-client trend tracking. Rationale, for the record: no consensus body endorses a single VAT/VFA cm² cutoff, and Styku\'s own published VFA validation was against DXA in kilograms rather than CT in cm², so an absolute cm² reading should not be presented as a graded risk classification. Waist circumference against the IAS/ICCR thresholds is the preferred clinical-facing metric if that measurement is ever collected for him.',
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
    body: `Left Leg LST ${styku.leftLegLST} lbs vs Right Leg LST ${styku.rightLegLST} lbs — a ${(styku.rightLegLST - styku.leftLegLST).toFixed(1)} lb gap, roughly 5% relative to the larger side. Standard ICONS protocol applied as a coaching convention: the ${legWeakerSide} leg leads every unilateral leg exercise (single-leg RDL, any split-stance work), the ${legWeakerSide} side is logged separately from the right in the coaching cue, and any suitcase-style carry work has the ${legWeakerSide} hand hold the load — this assignment is being tracked closely at the next rescan to confirm it still reflects a real, worth-addressing difference. Left Arm LST ${styku.leftArmLST} lbs vs Right Arm LST ${styku.rightArmLST} lbs — only a ${armGap.toFixed(1)} lb gap, roughly 3% relative — monitor only this cycle; no unilateral lead is assigned for arm work. Re-check both gaps at the 8-week Styku rescan.`,
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
    type: 'blue',
    label: 'Planned Deload — Week 5, Directly After the Week 4 Strength Check',
    body: "This program deliberately includes one lighter week, and it is planned rather than a reaction to anything going wrong. Week 5 — immediately after the Week 4 strength check — is a structured reload: the same three days, the same exercises, with working sets cut roughly in half, loads dropped to about 50-70% of the weights being used in Week 4, and every set held comfortably in the technique band with three or more reps left in reserve. No top sets, no personal bests, no max-effort tests that week. With a rotator cuff in active rehabilitation and eight straight weeks of climbing loads on either side of it, this is the week that keeps accumulated fatigue and joint stress from stacking up on a healing shoulder while the strength built in Weeks 1-4 consolidates. One deliberate exception: the rotator cuff and scapular block on Thursday holds its current stage through the deload week rather than either advancing or being cut back — rehab continuity matters more there than the fatigue relief the lighter week is providing everywhere else. One light week costs nothing that matters: muscle built over a month is not lost in a single reduced-volume week, and the small edge of peak strength that dips returns within days. Weeks 6-8 then rebuild from the Week 4 loads.",
  },
  {
    type: 'gold',
    label: 'How This Program Is Reassessed',
    body: "Two separate clocks, and they are not the same measurement. Strength is rechecked every four weeks — the Week 4 numbers in each lift's load line are the checkpoint, and they set the loads for the block that follows. Body composition is rescanned on its own longer cycle, at roughly eight weeks, because composition moves on a slower timeline than strength does. The shoulder runs on a third track entirely: its progression is governed by pain-free range and Jason Bethea's own reassessment, not by the four-week clock — when he moves the cuff work to its next stage, that is the update that matters.",
  },
  {
    type: 'teal',
    audience: 'internal',
    label: 'Session Architecture — Restructure Record (8/21/2026)',
    body: "Clinically-led build: the clinician's structure came first and the six-slot session architecture was fitted around it. Nothing about the rotator cuff protocol was re-derived, rescheduled, or advanced — Day 2's cuff/scapular block keeps its first position ahead of every compound lift, its three prescribed drills, its isometric -> eccentric -> concentric -> dynamic progression, its REHAB/STRENGTH badge override, and its pain-guardrail framing verbatim. Slot 4 (Jason's exercise) omitted on all three days for two different honest reasons: on Day 2 it is CONSUMED BY THE CORRECTIVE SLOT (his Jason-coordinated shoulder work IS block A, and placing it again in slot 4 would double-count it); on Days 1 and 3 there is no documented Jason exercise for a lower-body session. No filler anywhere. New content, all of it real rather than placeholder: Day 1 machine leg work (leg extension + hamstring curl — confirmed inventory, zero shoulder involvement, self-select load), Day 3 a left-led split squat (the loaded lunge pattern the week otherwise never touched, dumbbells at the sides). Day 3's combined core-and-push-up block split into the accessory (push-ups) and integration (plank, with the carry) slots — same exercises, same targets, nothing lost. Antagonist rotation re-walked on the full rendered order across block boundaries: Day 1 runs leg extension before hamstring curl so Glute Bridge -> Hex Deadlift -> Hamstring Curl is never three consecutive posterior-chain; Day 2 alternates push/pull throughout; Day 3 runs hinge -> push -> knee -> carry.",
  },
  {
    type: 'teal',
    audience: 'internal',
    label: 'Shoulder-Reintroduction Standard & Options Filtering — Selection Record (8/21/2026)',
    body: "This program reintroduces and progresses overhead pressing, so the shoulder-reintroduction standard binds. Two consequences, both applied: (1) the overhead press is now immediately followed by a static closed-chain hold — plank shoulder taps, with the quadruped/knees-down regression named in the exercise's own flag field — re-anchoring scapular control on a stable base straight after open-chain overhead loading; (2) the scapular block carries a real options menu (band pull-apart, scapular retraction-depression hold, scapular push-up, prone I's alongside the Y-T-W's, face pull, wall slide with lift-off) rather than one default set repeated by rote. Both additions are bodyweight, both name a regression, and neither advances his loading past what his record already documents — push-ups at 3 x 10-14 were already prescribed and tolerated, and the Day 2 closer is deliberately a bear crawl HOLD rather than a travelling crawl for the same reason. Every compound-slot options menu was filtered against his documented pain-free protocol before being written, and the exclusions are stated in the document rather than silently omitted: no barbell bench press (fixed bar path removes the shoulder's ability to find its own line), no front-rack barbell squat (end-range external rotation under load), no hanging or dead-hang scapular work (traction on a healing cuff), no end-range overhead loading beyond the prescribed press. Front-rack kettlebell carries are offered conditionally. RIR note for the record: the hypertrophy accessories are held at 2 RIR rather than the 1 RIR a healthy client's accessory work would use — with the cuff in active rehab the extra rep of margin is worth more than the last increment of stimulus. The two leg machines run at the same 2 RIR despite having no shoulder involvement — not for cuff margin, but because a rehab block's session-to-session consistency is easier to read when effort is uniform across it; they are the first candidates to move to 1 RIR once the cuff work clears its current stage, and the document says so plainly rather than leaving it as an unexplained inconsistency.",
  },
  {
    type: 'gold',
    label: 'Purpose of This Program',
    body: 'General strength and conditioning development, built around a rotator cuff tear currently in active rehabilitation coordinated with Jason Bethea — this is a program that actively rebuilds the shoulder, not one that avoids it. This 3-day build applies the ICONS three-zone philosophy (Isolated activation/corrective strengthening → Compound strength → Metabolic conditioning finisher) across a Lower Body / Upper Body / Full-Body split. Every session runs the same shape: a corrective opener, a primary compound lift, muscle-building accessory work, a second compound lift in a different pattern, and a closing movement that pulls the day together — a loaded carry, or on Thursday a closed-chain hold that asks the whole shoulder girdle to support the body on a stable base. Day 2 carries the dedicated rotator cuff and scapular strengthening work first, ahead of every compound lift. Each compound lift lists alternates the coach can rotate to on the day, and every one of those alternates has been checked against the shoulder protocol before it appears — a few common variations are deliberately left off the lists, and the document says which and why rather than leaving it unexplained. Every primary and secondary lift is autoregulated on reps in reserve and pain-free range of motion rather than a fixed percentage grind.',
  },
];

const weekOverview = [
  { day: 'SUN', intensity: 'Off', focus: 'Rest' },
  { day: 'MON', intensity: 'Off', focus: 'Rest' },
  { day: 'TUE', intensity: 80, focus: 'Lower Body & Posterior Chain' },
  { day: 'WED', intensity: 'Off', focus: 'Rest' },
  // label override (engine field added 8/21/2026): his day-header badge, summary row and
  // Day 2 intensityPara all deliberately avoid a percentage — the page states outright that
  // one "would misstate what's actually prescribed". The strip printed 60% anyway, which in
  // the ICONS framework reads "technique day, no PRs" on the day his press and pull-ups
  // actively progress. Same intent as the badge override, one level up.
  { day: 'THU', intensity: 60, label: 'REHAB', focus: 'Upper Push/Pull — Rotator Cuff Strengthening' },
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
    intensityPara: 'Primary strength day for the week — the deadlift should finish with two clean reps still in reserve: hard, but never a grind. Control precedes power: the corrective block below earns full-depth, braced positions before any load goes on the bar. No shoulder-specific concern in the primary lifts today; the loaded carry that closes the session still loads the shoulder girdle isometrically, so the same pain-monitoring rule applies there too.',
    warmUp: 'General warm-up: 5 min easy bike, hip circles, bodyweight squats x10, glute bridges x10 before the corrective block below.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — HIP & POSTERIOR CHAIN ACTIVATION',
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
        title: 'PRIMARY COMPOUND — HEX BAR DEADLIFT',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.deadlift} lbs (80% of est. 1RM ${oneRM.deadlift}), building toward roughly ${wk4.deadlift} lbs by Week 4 — two reps in reserve on the top set, which is the working standard for a primary lift. Add load only at the top of the rep range with clean form. If the day calls for a variation, rotate between: a conventional barbell deadlift (longer lever, a more demanding brace), a barbell Romanian deadlift (same hinge, longer hamstring range, lighter load), or a rack/block pull (a shortened range for a day the floor position isn't clean). All three keep the shoulder in the same neutral, hanging position the hex bar does — nothing here asks the cuff to stabilize overhead. The hex bar deadlift stays the lift that gets tracked and retested.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `Wk1: ${wk1.deadlift} → Wk4: ${wk4.deadlift} lbs`, tempo: '2-0-1', rest: '2 min', cue: 'Neutral spine, brace hard. Stop with 2 reps left.', rirNote: '2 RIR top set' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — QUAD & HAMSTRING HYPERTROPHY',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Direct muscle-building work for the legs, machine-based so it can be pushed hard without adding spinal load after the deadlift — and with no shoulder involvement at all, which makes it the easiest hard work in the week right now. The leg extension primes the knee-dominant pattern for the squat that follows; the hamstring curl trains knee flexion, which the hinge above never reaches. There is no tested baseline on either machine yet, so load is self-selected and logged weekly.',
        exercises: [
          { name: 'Leg Extension', sets: '3', reps: '10–12', load: 'Self-select at 2 RIR', tempo: '2-1-2', rest: '60s', cue: 'Full lockout, controlled lower. Log the setting weekly.', rirNote: '2 RIR' },
          { name: 'Lying/Seated Hamstring Curl', sets: '3', reps: '10–12', load: 'Self-select at 2 RIR', tempo: '2-1-2', rest: '60s', cue: 'Hips stay down; slow return, no snapping back.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — BACK SQUAT',
        introLabel: 'Load Target',
        intro: 'Reference load 90 lbs (no rep count recorded at intake) — build progressively at two reps in reserve rather than off a fixed percentage table, and log the working weight each week so a real Week 4 number exists to check against. The day\'s second compound pattern: knee-dominant, rotating off the hinge above. If the day calls for a variation, rotate between: a goblet squat (lighter, upright torso, and the front-rack hold keeps the shoulder in a comfortable neutral position), a hex bar squat (same neutral shoulder position as the deadlift), or a box squat (a fixed depth that keeps the pattern honest on a tired day). A front-rack barbell squat is deliberately not on this list while the cuff is in active rehab — the rack position puts the shoulder in end-range external rotation under load.',
        exercises: [
          { name: 'Back Squat', sets: '3', reps: '6', load: '90 lbs (reference) → build weekly', tempo: '3-1-1', rest: '90s', cue: 'Ribs stacked over pelvis; full depth, 2 reps left.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'THIRD COMPOUND (INTEGRATION) — ANTI-ROTATION & LOADED CARRY',
        color: 'gold',
        introLabel: 'Why',
        intro: `The session's closer — one block that puts the whole day together: the braced trunk from the deadlift, the leg drive from the squat, and grip, all held at once while walking. The isometric suitcase hold this block used to finish on is now a loaded carry — the same pattern moving instead of standing still — with the left hand holding the load per the asymmetry note. Load starts at 35 lbs/hand, deliberately below the 45 lbs/hand already carried on Saturday, because this version is one-sided and lands at the end of the heaviest day of the week. This loads the shoulder girdle isometrically the same way Saturday's carry does: ordinary grip and shoulder fatigue is expected, sharp or pinching pain is the stop signal. Variations: a bilateral farmer's carry (both hands loaded, the easiest on the shoulder) or a front-rack kettlebell carry (kettlebells run to 25 lbs per bell — only if the front-rack position is comfortable on the day). Any time the carry is one-sided, the left hand holds the load.`,
        exercises: [
          { name: 'Half-Kneeling Pallof Press', sets: '3', reps: '10/side', load: 'Mod band', tempo: '2s hold', rest: '45s', cue: 'Resist rotation; ribs stacked over hips.' },
          { name: 'Suitcase Carry (Left-Led)', sets: '2', reps: '20–25 yd/side', load: '35 lbs/hand', tempo: 'Steady', rest: '60s', flag: 'Left hand holds the load — weaker side per the asymmetry note. Sharp shoulder pain = stop', cue: 'Tall, level shoulders; resist the lean the whole way.', rirNote: 'Distance & posture governed — no RIR target' },
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
    intensityPara: "This isn't a standard %1RM intensity day, so the badge reads REHAB / STRENGTH rather than a percentage that would misstate what's actually prescribed. That doesn't mean light or limited — it means the point of today is to actively rebuild the rotator cuff and scapular stabilizers while continuing real strength work everywhere else. The cuff and scapular block below is strengthening work in its own right, not a warm-up throwaway, and runs first — ahead of every compound lift — per ICONS's own 'control precedes power' sequencing. Overhead Press and Assisted Pull-Ups both keep progressing — load builds week to week — autoregulated by pain-free range of motion and RIR instead of a fixed percentage table, in coordination with Jason Bethea.",
    warmUp: 'General warm-up: 5 min row or bike, arm circles, band pull-aparts x10 before the strengthening block below.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — ROTATOR CUFF & SCAPULAR STRENGTHENING',
        color: 'red',
        introLabel: 'Why',
        intro: "This is the strengthening protocol itself, not a warm-up — direct, progressive loading of the rotator cuff and scapular stabilizers, following the standard rehab loading sequence (isometric hold capacity → slow eccentric control → controlled concentric strength → dynamic loading) as capacity builds week to week. It runs first, before any compound lift, so the shoulder is actively controlling the joint before it's asked to move real load. The three drills below are the prescribed set, but this block is meant to be selected from and progressed rather than repeated by rote: band pull-aparts, a scapular retraction-and-depression hold, a scapular push-up, prone I's as well as the Y-T-W's, a face pull (band or Kieser), and a wall slide with a lift-off at the top are all live options, and whichever one shows the cleanest control on the day is the one worth loading. Two families stay off the list for now and only come back with Jason Bethea's clearance: any hanging or dead-hang scapular work, which puts the healing cuff under traction, and end-range overhead loading beyond what the press below already covers.",
        exercises: [
          { name: 'Band External Rotation (Side-Lying / Standing)', sets: '3', reps: '12-15/side', load: 'Light-Mod band', tempo: 'Wk1-2 isometric hold; Wk3+ slow eccentric', rest: '45s', cue: 'Elbow pinned to side; full slow control both directions.' },
          { name: 'Prone Y-T-W', sets: '3', reps: '8 each letter', load: 'Bodyweight → light DB', tempo: 'Controlled', rest: '45s', cue: 'Thumbs up; small range, full scapular control.' },
          { name: 'Scapular Wall Slide / Retraction', sets: '2', reps: '12', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'Ribs down; scap glide, no shrugging.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — INCLINE DUMBBELL BENCH PRESS',
        introLabel: 'Load Target',
        intro: `Well-tolerated in cuff rehab (controlled-ROM pressing) — Week 1 working load ${wk1.inclineBench} lbs, building toward ${wk4.inclineBench} lbs by Week 4, progressing close to normal. Two reps in reserve; stop short of sharp or pinching pain, not of ordinary fatigue. If the day calls for a variation, rotate between: a landmine press (the most shoulder-friendly pressing arc of the group), a dumbbell floor press (the floor limits the range, which is useful on a day the shoulder is irritable), a flat dumbbell press, or a machine chest press. A barbell bench press is deliberately not on this list while the cuff is in active rehab — the fixed bar path removes the shoulder's ability to find its own comfortable line. The incline dumbbell press stays the lift that gets tracked and retested.`,
        exercises: [
          { name: 'Incline Dumbbell Bench Press', sets: '4', reps: '5-6', load: `Wk1: ${wk1.inclineBench} → Wk4: ${wk4.inclineBench} lbs`, tempo: '2-0-1', rest: '2 min', cue: 'Even path both arms. Stop at sharp/pinching pain.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — SINGLE-ARM DB ROW',
        introLabel: 'Load Target',
        intro: 'Well-tolerated in cuff rehab (posterior-chain and scapular-stabilizer work) — build progressively from the tested 35 lb reference, close to normal progression. This is the muscle-building accessory of the day, and it deliberately runs at two reps in reserve rather than the one-rep-in-reserve a hypertrophy accessory would normally use: with the cuff in active rehab, the extra rep of margin is worth more than the last increment of stimulus. Dumbbells run to 60 lbs per hand; past that the landmine or a Kieser row carries the same pattern.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '10-12/side', load: '35-40 lbs, build weekly', tempo: '2-1-2', rest: '60s', cue: 'Full lat stretch at bottom. Stop at sharp/pinching pain.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — OVERHEAD PRESS & VERTICAL PULL',
        introLabel: 'Load Target',
        intro: "Genuine strengthening work, not a placeholder — press load builds week to week from the tested 17.5 lb starting point the same as any other lift here, just autoregulated by pain-free range of motion and RIR instead of a fixed percentage table. The plank shoulder taps that follow the press are deliberate and not optional: after loading the shoulder overhead in an open chain, the closed-chain hold immediately re-anchors scapular control on a stable base. Regress them to a quadruped position (knees down) if the full plank loads the cuff, and confirm the progression with Jason Bethea before the first session. Pull-ups then close the block: reduce assistance week to week from the tested 5-rep baseline, autoregulated by pain-free range. If the day calls for a press variation, rotate between: a half-kneeling single-arm dumbbell press (one side at a time, easiest to keep honest), a landmine press (an arc rather than a vertical line), or a seated press with back support. If the day calls for a pull variation: a neutral or close grip instead of standard, a Kieser pulldown, or a band-assisted pull-up. Every option lives inside the same rule as the press itself — pain-free range only, sharp or pinching pain ends the set.",
        exercises: [
          { name: 'Standing Overhead Press', sets: '3', reps: '6-8', load: 'Self-select ~17.5-20 lbs, build weekly', tempo: 'Controlled', rest: '2 min', flag: 'Pain-free range only — sharp or pinching pain ends the set', cue: 'Full pain-free ROM; add load at 2 RIR + clean form.', rirNote: '2 RIR' },
          { name: 'Plank Shoulder Taps (Static Hold)', sets: '2', reps: '8-10 taps/side', load: 'Bodyweight', tempo: 'Slow, controlled', rest: '45s', flag: 'Regress to quadruped (knees down) if the plank loads the cuff', cue: 'Hold the push-up position, hips level — tap slow, the hold is the work.' },
          { name: 'Assisted Pull-Up (Standard or Neutral/Close Grip)', sets: '3', reps: '5-8', load: 'Reduced assist week to week', tempo: 'Controlled', rest: '90s', cue: 'Full hang to chin-over-bar; switch to neutral grip if it aggravates.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'THIRD COMPOUND (INTEGRATION) — CLOSED-CHAIN FULL-BODY HOLD',
        color: 'gold',
        introLabel: 'Why',
        intro: "The session's closer — one position that holds everything the day built at once: scapular control from the first block, trunk bracing, and the whole shoulder girdle supporting bodyweight on a stable base. It is the next step in the same closed-chain line the plank shoulder taps sit on, kept as a HOLD rather than a travelling crawl so nothing about the shoulder demand outruns where the rehab actually is. Bodyweight only, no added load, and no progression past a hold without Jason Bethea's clearance. Regress to a quadruped hover (knees an inch off the floor) or a straight plank if the bear position loads the cuff; the same pain rule governs — sharp or pinching pain ends the set, ordinary fatigue does not.",
        exercises: [
          { name: 'Bear Crawl Hold (Static)', sets: '3', reps: '20-30s', load: 'Bodyweight', tempo: 'Hold', rest: '45s', flag: 'Regress to quadruped hover or a straight plank if the bear position loads the cuff', cue: 'Knees hovering, back flat, ribs down. Breathe through the hold.', rirNote: 'Hold quality governed — no RIR target' },
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
    intensityPara: "Moderate accumulation day — build clean volume at two reps in reserve, not a max-effort test. Left leads every unilateral leg set this week per the asymmetry note. Farmers Carry and push-ups both load the shoulder girdle isometrically — apply the same pain-monitoring rule from Day 2 here too, even though today's primary focus is the lower body. The session closes with a short conditioning finisher — the metabolic third of the ICONS three-zone build.",
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
        title: 'PRIMARY COMPOUND — SINGLE-LEG ROMANIAN DEADLIFT (LEFT-LED)',
        introLabel: 'Load Target',
        intro: 'Reference load 30 lbs (no rep count recorded at intake) — left leg leads per the asymmetry protocol; build progressively at two reps in reserve and log the working weight weekly so a real Week 4 number exists. If the day calls for a variation, rotate between: a two-hand dumbbell single-leg RDL (easier to balance, more load), a rack- or rail-supported single-leg RDL (a hand on the upright removes the balance demand — and it is the version to use on a day the shoulder does not want to hold a dumbbell out at arm\'s length), or a b-stance RDL (back toe down for support, still one hip doing the work).',
        exercises: [
          { name: 'Single-Leg Romanian Deadlift', sets: '3', reps: '8/side', load: '30 lbs (reference) → build weekly', tempo: '3-1-1', rest: '75s', flag: 'Left leg leads — weaker side per the asymmetry note', cue: 'Left leg leads. Hips square, soft knee.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — PUSH-UP PROTOCOL',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'Baseline 12 full push-ups, tested 8/11/2026 — eight-week target is 20-22 in a single set, and this is the block that moves that number. Today is a full-body day, so this block carries the week\'s second dose of upper-body pushing volume: a controlled, non-overhead range that is normally well tolerated alongside the cuff work, at a different angle from Thursday\'s incline press. The same pain-monitoring rule still applies.',
        exercises: [
          { name: 'Push-Ups', sets: '3', reps: '10-14', load: 'Bodyweight', tempo: '2-0-1', rest: '60s', cue: 'Full range, no shoulder pinch. Build past the 12-rep baseline.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — SPLIT SQUAT (LEFT-LED)',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — knee-dominant, rotating off the hinge above, and the loaded lunge pattern the week otherwise never touches. Left leg leads every set per the asymmetry protocol. No tested baseline exists for this pattern, so load starts moderate and is built weekly at two reps in reserve; dumbbells held at the sides keep the shoulder completely out of it. If the day calls for a variation, rotate between: a rear-foot-elevated split squat (more range, more demand on the front leg), a reverse lunge (easier to balance, kinder to the knee), or a goblet split squat (one dumbbell at the chest — only if the front-rack position is comfortable that day).',
        exercises: [
          { name: 'Split Squat (DB at Sides)', sets: '3', reps: '8/side', load: 'Mod DB → build weekly', tempo: '2-1-1', rest: '75s', flag: 'Left leg leads — weaker side per the asymmetry note', cue: 'Left leg leads. Even depth both sides, knee tracks the toe.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'THIRD COMPOUND (INTEGRATION) — LOADED CARRY & CORE UNDER LOAD',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'The session\'s closer — the day\'s hip work, grip, and trunk position held together under load. Carry tested at 45 lbs/hand on 8/11/2026: hold there in Week 1 and build toward 50 lbs/hand by Week 4 as grip and trunk control allow. Plank progresses from the tested 1:18 baseline. The carry loads the shoulder girdle isometrically; ordinary grip and shoulder fatigue is expected, sharp or pinching pain is the stop signal. If the day calls for a variation, rotate between: a suitcase carry (one-sided, left hand holds the load), a hex bar carry (the vehicle once load passes the 60 lbs/hand dumbbell ceiling), or a front-rack kettlebell carry (to 25 lbs per bell — only if the front-rack position is comfortable). Distance and posture govern the carry, not a rep target.',
        exercises: [
          { name: 'Farmers Carry', sets: '3', reps: '30-40m', load: 'Wk1: 45 → Wk4: 50 lbs/hand', tempo: 'Steady', rest: '60s', cue: 'Tall posture, no shrug; even stride both sides.', rirNote: 'Distance & posture governed — no RIR target' },
          { name: 'Plank Hold', sets: '3', reps: '45-60s', load: 'Bodyweight', tempo: 'Hold', rest: '45s', cue: 'Ribs down, no lumbar sag. Build past the 1:18 baseline.' },
        ],
      },
      {
        letter: 'F',
        title: 'METABOLIC FINISHER',
        color: 'gold',
        introLabel: 'Format',
        intro: "The ICONS three-zone build closes every session with a metabolic component — this stays low-impact given the volume of the day.",
        exercises: [
          { name: 'Stationary Bike Intervals', sets: '1', reps: '8 x 30s hard / 90s easy', load: 'Moderate-hard', tempo: 'Intervals', rest: '—', cue: 'Energy becomes identity — hold form to the last round.' },
        ],
      },
    ],
    coolDown: "Hip flexor stretch 60s/side. Quad stretch 60s/side. Child's pose 60s.",
    iconsNote: 'Moderate accumulation day — build clean volume at two reps in reserve, not a max-effort test. Left leads every unilateral leg set this week per the asymmetry note; sharp or pinching shoulder pain during carries or push-ups is still the stop signal, ordinary fatigue is not.',
  },
];

const summary = {
  subtitle: 'Moe Shahheidari  ·  ICONS Index  ·  3-Day Full-Body Build  ·  Week 1',
  rows: [
    ['Day 1', '80%', 'Lower Body & Posterior Chain', 'Hex Bar Deadlift · Back Squat · Suitcase Carry', `Hex DL ${wk1.deadlift} → ${wk4.deadlift} lbs by Wk 4, all at 2 RIR + clean form.`],
    ['Day 2', 'Rehab/Strength', 'Upper Push/Pull — Cuff Strengthening', 'Cuff/Scap Block · Incline Press · SA Row · OHP + Shoulder Taps · Pull-Up', `Progress cuff/scap work isometric→eccentric→concentric→dynamic; incline ${wk1.inclineBench} → ${wk4.inclineBench} lbs; OHP/pull-up at pain-free RIR.`],
    ['Day 3', '70%', 'Full-Body Unilateral & Carries', 'SL RDL · Push-Ups · Split Squat · Carry/Plank', 'Carry 45 → 50 lbs/hand; extend plank past 1:18 and push-ups past 12.'],
  ],
  milestones4wk: `Week 4 is the strength check, and these are the numbers it checks against: Hex Bar Deadlift ${wk4.deadlift} lbs x 5, Incline Dumbbell Press ${wk4.inclineBench} lbs x 5-6, Farmers Carry 50 lbs/hand — every one reached at two reps in reserve with clean form, not by grinding. Back Squat, Single-Arm Row, Single-Leg RDL and Split Squat should each have a real logged working weight by then, not just the intake reference number. Rotator cuff and scapular block progressed from isometric holds into slow eccentric loading, fully pain-free. Plank shoulder taps held cleanly in the full plank position, or clearly progressing from the quadruped regression. Overhead Press and Assisted Pull-Ups both showing real week-over-week load or assistance progression. Left-led unilateral leg work showing improving control and even tempo on both sides. Week 5, immediately after this check, is the planned deload week — same exercises, sets roughly halved, loads at 50-70%, everything at 3+ reps in reserve, with the cuff block holding its stage — before Weeks 6-8 rebuild.`,
  milestones8wk: 'Target Hex Bar Deadlift 195-200 x 5, Incline Dumbbell Press 35-40 x 8, Single-Arm Row 40+ lbs x 10-12/side, Farmers Carry 55-60 lbs/hand, Plank 1:45-2:00, Push-Ups 20-22 reps in a single set, Split Squat carrying a real logged working load on both sides. Overhead Press and Assisted Pull-Ups showing real week-over-week load/assistance progression, fully pain-free through range. Rotator cuff strengthening block progressed into controlled concentric or early dynamic loading, per Jason Bethea\'s clearance. These are eight-week targets measured after the Week 5 deload and the Weeks 6-8 rebuild — not numbers to chase through the lighter week.',
  rescanNote: 'Two clocks, deliberately separate. Strength is rechecked every four weeks against the Week 4 numbers above. Body composition gets a Styku re-scan at eight weeks — landing at the end of the Weeks 6-8 rebuild rather than mid-deload, so it reads a consolidated block. Track at that scan: ALST Index (currently 7.92 kg/m², above the male at-risk line), VFA trend (currently 87.1 cm², read directionally rather than against a fixed risk band), body fat % and lean mass trend (the body-recomposition priority, per the composition note above), Shape Score, and the left/right leg lean-mass gap (currently ~5% relative to the larger side — below the threshold that would make the left-leads assignment a corrective priority rather than a coaching convention). Shoulder progress runs on its own track, coordinated with Jason Bethea, rather than waiting on either of these clocks.',
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
