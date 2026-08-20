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
 *   - ALST Index 5.52 kg/m² — Styku labels "Not At-Risk." LANGUAGE
 *     CORRECTED 8/18/2026, per CLAUDE.md's "ALST Index" section as
 *     corrected 8/17/2026: this document previously read 5.52 against a
 *     3-tier women's table (<5.5 At-Risk / 5.5-6.99 Normal-monitor /
 *     >=7.0 Optimal). That table was a sex-conflation error — 7.0 kg/m²
 *     is EWGSOP2's separate MALE at-risk threshold, never a female
 *     "Optimal" target — and the corrected female standard is a single
 *     cutoff: <5.5 At-Risk, >=5.5 within the normal reference range, read
 *     as a trend metric with no graded tier above it. Her 5.52 sits only
 *     0.02 kg/m² above that cutoff — stated honestly as a genuine
 *     monitoring point for her 8-week rescan, not rounded up into a false
 *     sense of security and not fabricated into an At-Risk flag either.
 *     Wording matched to Mary Burfete's document, which carries the
 *     identical 5.52 reading. `client.alstIndex: 5.52` correctly leaves
 *     `proteinBar()` un-triggered (only fires <5.5).
 *   - VFA (Segmental Analysis, the authoritative cm² figure): 20.1 cm².
 *     LANGUAGE CORRECTED 8/17/2026, per CLAUDE.md's "VFA (Visceral Fat
 *     Area) — reframed as trend metric 8/17/2026": the old absolute
 *     risk-band table (<70/70-99/100-149/>=150 cm² -> Very Low/Low/
 *     Moderate/High Risk) is RETIRED — no consensus body endorses a single
 *     VAT/VFA cutoff, and Styku's own VFA validation was against DXA in
 *     KILOGRAMS, never in cm². This document previously labeled 20.1 cm²
 *     "Very Low Risk" (itself a correction of Styku's own "Low Risk"
 *     dashboard label) — both labels are now retired. 20.1 cm² is
 *     presented purely as a trend/context figure to track at future
 *     rescans, with no risk-band classification attached. The separate raw
 *     "Visceral Fat 0.2" figure on the Body Composition summary page is a
 *     different, non-cm² scale — not used or interpreted anywhere in this
 *     document.
 *   - BMI 18.6 — technically Normal (18.5-24.9) but only 0.1 above the
 *     Underweight cutoff. Noted as borderline in the Styku interpretation,
 *     NOT flagged as clinical underweight (CLAUDE.md's actual threshold is
 *     <18.5, not crossed) and NOT combined with her ALST status to fabricate
 *     a "sarcopenic obesity profile" flag — that specific flag requires
 *     BOTH BMI<18.5 AND ALST<5.5, and neither condition is met here.
 *   - Segmental — LANGUAGE CORRECTED 8/17/2026, per CLAUDE.md's "Asymmetry
 *     Protocol — trigger corrected 8/17/2026" (old absolute >=0.5 lb
 *     trigger replaced with a relative >=10% trigger): Left Arm 5.8 lbs /
 *     Right Arm 6.1 lbs — 0.3 lb gap, ~5% relative, below the corrected
 *     >=10% trigger (also below the old 0.5 lb trigger — no change here).
 *     Weaker-side-leads rule correctly NOT applied to arm work (Single-Arm
 *     Row, Farmers Carry). Left Leg 13.8 lbs / Right Leg 14.3 lbs — 0.5 lb
 *     gap, ~3.5% relative. **FLAGGED DISCREPANCY**: this gap met the OLD
 *     0.5 lb absolute trigger exactly (this document's original basis for
 *     "left leg leads"), but does NOT clear the corrected >=10% relative
 *     trigger. Per this pass's explicit instructions, the left-leg-leads
 *     prescription already programmed into the exercise blocks below is
 *     left UNCHANGED pending a dedicated per-client review — this is a
 *     language correction (how the trigger is described) not a silent
 *     resolution of whether the protocol should still apply. Flagged to
 *     the main thread/icons-expert. `weakerSide(13.8, 14.3)` → 'left'
 *     (direction-only comparison, unaffected by this fix) still determines
 *     which side reads weaker if/when the protocol is reconfirmed.
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
 *
 * REVISION (8/19/2026) — ICONS BLOCK METHOD RESTRUCTURE (roster-wide
 * rollout, batch 2; spec: CLAUDE.md "ICONS Block Method — Standing Session
 * Architecture"; reference: scripts/siobhan_hansen_3day_plan.js, the
 * pilot). Full prior record (this header + CLIENTS.md) re-read first.
 * Slot 4 (Jason's Exercise) OMITTED on both days — no Jason Bethea SOAP
 * note or coordinated-care relationship on file; no filler inserted.
 * Slot 1 is served by the existing Control & Alignment activation blocks —
 * genuine, client-specific priming already built at first build, not
 * generic filler.
 *   DAY A: 1 = Block A (Control & Alignment); 2 = Hex Bar Deadlift alone
 *   (new Block B + options: conventional double-DB deadlift, hex pull
 *   from low blocks, sumo-stance DB deadlift); 3 = Hip Thrust + DB
 *   Lateral Raise (new Block C; hip-thrust options: floor glute bridge,
 *   B-stance [left working share], single-leg glute bridge [left leads]);
 *   5 = old Block C retitled secondary compound (OHP + Incline Press +
 *   SL RDL; press options: landmine press, half-kneeling single-arm DB
 *   press); 6 = old Block D SPLIT — new Block E, Full-Body Integration
 *   (Farmer Carry + Plank + Pallof, + goblet/front-rack carry options; no
 *   side-lead on carries, arm gap below trigger) and new Block F,
 *   Conditioning Close (the Zone 2 bike/rower line moved to its own
 *   block so the integration compound closes the training work and the
 *   conditioning finisher follows it, per the spec's ordering).
 *   DAY B: 1 = Block A; 2 = Back Squat alone (new Block B + options:
 *   goblet squat, box squat, landmine squat); 3 = DB Split Squat + Face
 *   Pull (new Block C; Face Pull renamed Kieser or Band per the studio
 *   inventory — the Kieser acts as the cable machine); 5 = old Block C
 *   retitled secondary compound (SA Row + Push Press + Bent-Over Row;
 *   row options: chest-supported DB row, single-arm Kieser row); old
 *   Block D SPLIT — new Block E, Push-Up Progression & Core (standing
 *   green baseline-protocol block: incline push-up + side plank);
 *   6 = NEW Block F, Full-Body Integration — Farmer Carry (Light),
 *   2x25-30 yd at 15-20 lbs/hand — anchored BELOW her tested 20 lbs/hand
 *   reference and Day A's 20-25 working loads, no invented number
 *   (pilot-precedent integration closer for a day that lacked one);
 *   new Block G, Conditioning Close (the Zone 2 line moved out of the
 *   old push-up block). Rendered exercise order otherwise unchanged on
 *   both days — the build-time Antagonist Rotation sequencing survives
 *   verbatim, re-walked post-build.
 * OPTIONS FILTERING: no clinical movement constraints on file — menus are
 * filtered by the confirmed studio inventory and her program level
 * (early-intermediate, technique-first: no advanced/ballistic variants
 * offered), with left-leg-leads side rules restated on unilateral options
 * and no arm-side lead fabricated (below trigger).
 * TOUCH-IT-BRING-IT-CURRENT: cable→Kieser rename (Face Pull); equipment
 * ceilings verified (all DB loads ≤60/hand; no KB content); DELOAD —
 * AUTOREGULATED per CLAUDE.md's protocol (early-intermediate client at
 * light-to-moderate relative loads, no injury sites, first build —
 * closest to the protocol's lower-accumulated-fatigue autoregulate case):
 * a planned every-4-6-weeks recovery-week concept stated in a new blue
 * client-visible note, pulled forward on stall/soreness/sleep triggers
 * rather than fixed to the calendar; summary reconciled with the 4-week
 * strength / 8-12-week Styku cadence split. Also FIXED a summary-string
 * leak that predates this pass: milestones8wk named the engine functions
 * "epley1RM()/workingLoad()" — build jargon rendering in BOTH views
 * (summary strings have no audience filter) — reworded to plain language.
 * Warm-up drift checked: both warmUps carry only unloaded prep.
 * (Full-Spectrum 10-movement mandate remains not-applied at 35, per the
 * existing scoping note — her battery covers all 10 on its own merits,
 * re-verified surviving the restructure.)
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad } = require('../icons_template');

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
    body: `Shape Score 85/100 (Excellent). Body Fat 26.6% (Fit — lower than 70% of peers). ALST Index 5.52 kg/m² — within the normal reference range (>=5.5 kg/m²), NOT At-Risk, but only 0.02 kg/m² above the At-Risk cutoff — genuinely borderline, and worth close attention at the next rescan rather than treated as comfortably clear; ALST is tracked here as a trend metric, not a graded score, and no higher tier exists above the 5.5 kg/m² cutoff for women — the 7.0 kg/m² figure previously used as an upper tier is EWGSOP2's separate MALE at-risk threshold, not a female target. VFA (Segmental Analysis): 20.1 cm² — presented as a trend/context figure to track over time rather than a risk-band label; CLAUDE.md's prior absolute VFA risk-band table (which this document previously cited to assign this reading a risk-band label of its own, itself a correction of the band Styku's dashboard prints for it) was retired 8/17/2026 as unsupported by consensus guidance and by this scanner's own validation limits (Styku's VFA output was validated against DXA in kilograms, never in cm²). (A separate raw "Visceral Fat 0.2" figure on the Body Composition summary page is a different, non-cm² scale and is not used here.) BMI 18.6 — technically Normal but only 0.1 above the Underweight cutoff; noted as borderline, not flagged as clinical underweight (that threshold is <18.5, not crossed), and not combined with her ALST reading to imply a sarcopenic-obesity profile — that specific flag requires both conditions, and neither is met.`,
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Left Leg Leads Unilateral Work',
    body: 'Left Leg LST 13.8 lbs / Right Leg LST 14.3 lbs — left leg reads as the lighter/weaker side on this scan and leads every unilateral leg exercise in this program (Single-Leg RDL and DB Split Squat) as a standard coaching convention. Left Arm LST 5.8 lbs / Right Arm LST 6.1 lbs — a smaller gap; no side-lead is applied to arm work (Single-Arm Row, Farmers Carry) at this size.',
  },
  {
    type: 'watch',
    label: 'Asymmetry Trigger Recalculation — Flagged Discrepancy (8/17/2026)',
    audience: 'internal',
    body: "CLAUDE.md's Asymmetry Protocol trigger was corrected 8/17/2026 from an absolute >=0.5 lb L/R gap to a relative >=10% gap (the old absolute trigger was firing on measurement noise — device error on Styku's segmental lean-mass reading runs 2.6-3.6x larger than the old 0.5 lb figure, per an external evidence review). Recomputed against this client's actual numbers: Left Leg 13.8 lbs / Right Leg 14.3 lbs (0.5 lb gap) met the OLD trigger exactly but is only ~3.5% relative — it does NOT clear the corrected >=10% threshold. Left Arm 5.8 lbs / Right Arm 6.1 lbs (0.3 lb gap, ~5% relative) stays below the trigger either way, no change there. Per this pass's explicit instruction, the left-leg-leads prescription already programmed into this document's exercise blocks (Single-Leg RDL, DB Split Squat) is left UNCHANGED pending a dedicated per-client review — this note exists to make the discrepancy visible for that review, not to resolve it silently. Flagged to the main thread/icons-expert.",
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
    type: 'blue',
    label: 'Planned Recovery Week — Built In, Timed by How Training Is Actually Going',
    body: 'Roughly every four to six weeks of continuous progression, this program takes one deliberately lighter week: the same exercises and movement patterns, sets reduced by roughly a third, every set held comfortably in the technique band (3 or more reps in reserve), and loads held rather than climbing — the usual add-weight rule pauses for that one week. At her current technique-first loads, fatigue accumulates slowly, so the light week is not fixed to a calendar date: the natural first window is right after the Week 4 strength check, and it moves earlier if lifts stall, soreness lingers, or sleep degrades. One light week costs nothing that matters — muscle built over the previous weeks is not lost in a single reduced-volume week, and training resumes from the same loads.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Session Architecture — ICONS Block Method Restructure (8/19/2026)',
    body: 'Both days restructured onto the ICONS Block Method six-slot order (Corrective → Primary Compound → Accessory → Jason\'s Exercise → Secondary Compound → Third Compound/Integration), rendered exercise order unchanged except two additions. Slot 4 omitted both days (no Jason Bethea relationship on file — no filler); slot 1 served by the existing Control & Alignment activation blocks (genuine client-specific priming, not generic filler). Day A: primary = Hex Bar Deadlift (own block); accessory = Hip Thrust + Lateral Raise; secondary = OHP/Incline Press/SL RDL block; integration = Farmer Carry + Plank + Pallof split into its own block, with the Zone 2 line moved to a separate Conditioning Close so the compound closer precedes the finisher. Day B: primary = Back Squat (own block); accessory = DB Split Squat + Face Pull (renamed Kieser or Band); secondary = rows + push press; Push-Up Progression & Core retained as a standing baseline-protocol block; integration = NEW light Farmer Carry (2x25-30 yd, 15-20 lbs/hand — anchored below her tested 20 lbs/hand reference and Day A\'s working loads, no invented number); Zone 2 moved to its own closing block. Options menus on every compound slot, filtered by studio inventory and her early-intermediate/technique-first level (no ballistic/advanced variants); left-leads restated on unilateral options, no arm lead fabricated. Same pass: autoregulated recovery-week note added (per the deload protocol\'s lower-fatigue autoregulate case for a first-build client at light-moderate relative loads); 4-week strength / 8-12-week Styku cadence split stated; milestones8wk reworded off engine-function names (build jargon in an unfiltered summary string). The asymmetry-trigger flagged discrepancy (8/17) and left-leg-leads prescription are untouched by this restructure.',
  },
  {
    type: 'gold',
    label: 'Companion At-Home/Office Program',
    body: 'A companion 2-day at-home/office dumbbell-only training plan (no barbell, hex bar, cables, or pull-up bar) is also on file for days she cannot access the studio. The same Styku findings and asymmetry protocol apply there, with equipment-appropriate exercise substitutions and equipment-capped load targets — see her At-Home 2-Day Training Plan.',
  },
  {
    type: 'watch',
    label: 'ACL/Knee-Valgus Circuit — Framing Corrected, Full Dose Not Yet Built In',
    audience: 'internal',
    body: "Day B Block A's hip-abductor/thoracic activation work was previously framed as omitted because \"no elevated-risk ACL/knee-valgus finding is on file for Nicolette specifically\" — that framing is corrected per CLAUDE.md's \"ACL / Knee Valgus / Neuromuscular Injury-Prevention Circuit — trigger corrected 8/17/2026\": the corrective/neuromuscular circuit is now universal programming for this population, not gated behind a positive visual screen. The block's intro line was reworded accordingly. Note this activation block is still lighter than the full evidenced dose (20-30 min, 1-2x/week, sustained beyond 6 months) that standard calls for — flagged as a candidate addition for a future revision (a new weekly time allocation, not just added exercises) rather than expanded here without a dedicated program-structure change.",
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
      // Compound zone. Pattern check across blocks B-C: Hex Bar Deadlift
      // (hinge) -> Hip Thrust (hinge) -> DB Lateral Raise (shoulder
      // isolation) = 2 hinge + 1 different pattern. No 3rd hinge stacked.
      // Compliant — order unchanged by the 8/19 Block Method re-cut.
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — HEX BAR DEADLIFT',
        introLabel: 'Load Target',
        intro: `The day's main lift. Hex Bar Deadlift tested at 45 lbs x12 (Epley 1RM ~${dlRM} lbs) — a strong first-session number. Week 1 trains at roughly 70-75% of estimated 1RM to lock in hip hinge mechanics before adding weight; Week 4 builds toward 90-95%. If the day calls for a variation, rotate between: a conventional double-DB deadlift, a hex bar pull from low blocks (shortened range), or a sumo-stance DB deadlift (wider base, more upright torso). The hex bar lift stays the one we track and retest.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '3', reps: '6–8', load: `Wk1: ${dlWk1} lbs → Wk4: ${dlWk4} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Hinge hips back to grip, drive floor away, hips and shoulders rise together.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — HIP THRUST & SHOULDER',
        introLabel: 'Load Target',
        intro: `The glute-building accessory directly behind the deadlift — Hip Thrust tested at 65 lbs x8 (Epley 1RM ~${htRM} lbs), trained on the same ramp — with a light lateral-raise pattern break before the pressing block below. If the hip thrust needs a variation: a floor glute bridge, a B-stance hip thrust (left leg takes the working share), or a single-leg glute bridge (left leg leads) covers the same pattern; the bench-supported hip thrust stays the lift we track.`,
        exercises: [
          { name: 'Hip Thrust (Barbell or Loaded DB, Bench-Supported)', sets: '3', reps: '8', load: `Wk1: ${htWk1} lbs → Wk4: ${htWk4} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, drive hips to full extension, squeeze glutes at top.' },
          { name: 'DB Lateral Raise', sets: '3', reps: '12–15', load: '5–8 lbs', tempo: '2-1-2', rest: '30s', cue: 'Lateral delt. Arms slightly bent, raise to shoulder height, slow lower.' },
        ],
      },
      // Compound zone. Pattern check: DB Overhead Press (vertical push) ->
      // Incline DB Chest Press (horizontal push) -> Single-Leg RDL (hinge)
      // = 2 push + 1 different pattern. No 3rd push stacked. Compliant.
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — PRESS STRENGTH',
        introLabel: 'Load Target',
        intro: `The day's second compound pattern — pressing, rotating off the hinge work above. Seated overhead press (10 lbs/hand x5, Epley 1RM ~${ohpRM} lbs) and incline chest press (15 lbs/hand x5, Epley 1RM ~${inclineRM} lbs) both tested clean. Single-Leg RDL closes the block — left leg leads every set (weaker side per the segmental scan above). If the day calls for a press variation, rotate between: a landmine press (angled, shoulder-friendly arc) or a half-kneeling single-arm DB press; the seated press and incline press stay the lifts we track and retest.`,
        exercises: [
          { name: 'DB Overhead Press (Seated)', sets: '3', reps: '8', load: `Wk1: ${ohpWk1} lbs/hand → Wk4: ${ohpWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'Back supported, spine neutral. Press overhead, arms alongside ears.' },
          { name: 'Incline DB Chest Press (30–45°)', sets: '3', reps: '8', load: `Wk1: ${inclineWk1} lbs/hand → Wk4: ${inclineWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: '30–45° incline, full range, control the descent, no bench arch.' },
          { name: 'Single-Leg RDL (DB)', sets: '3', reps: '8 ea, LEFT leads', load: `Wk1: ${slrdlWk1} lbs/hand → Wk4: ${slrdlWk4} lbs/hand`, tempo: '3-1-1', rest: '75s', cue: 'Left leads (weaker side). Slight knee bend, hinge from hip, reach floor.' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — LOADED CARRY + CORE',
        color: 'gold',
        introLabel: 'Format',
        intro: 'The session\'s closing compound work — the carry pulls the day\'s hinge strength and braced posture together under gait, paired with the core work that supports every compound lift above. Carry with both hands evenly — the arm-to-arm difference here is minor, so no side-lead is applied to carry or row work. Distance and movement quality govern the carry, not an effort target. A goblet carry (one DB at the chest) or front-rack carry covers the same ground with an upright-posture bias if it suits the day better.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '3', reps: '25–30 yds', load: 'Wk1: 20 lbs/hand → Wk4: 25 lbs/hand', tempo: 'Controlled', rest: '75s', cue: 'Shoulders packed, chest tall, neutral neck. Carry evenly, both hands.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: '1:00–1:10', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline 1:36. Hold at 1:00-1:10 in training — quality over max time.' },
          { name: 'Pallof Press (Anti-Rotation)', sets: '2', reps: '10 ea side', load: 'Light band', tempo: '2-2-1', rest: '45s', cue: 'Press straight out from chest, resist the band pulling you into rotation.' },
        ],
      },
      {
        letter: 'F',
        title: 'CONDITIONING CLOSE',
        color: 'gold',
        introLabel: 'Why',
        intro: 'A brief steady-state close — the primary cardiovascular dose at 2 days/week, after the training work is done.',
        exercises: [
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
        intro: 'Primes the hip abductors and thoracic spine ahead of squat and lunge loading — general movement-quality preparation that\'s standard here for every client, building lower-limb control and knee-pain resilience regardless of how she moves on a screen.',
        exercises: [
          { name: 'Standing Hip Abduction (Bodyweight)', sets: '2', reps: '12 ea side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Hips level, no torso lean, controlled tempo both directions.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Shoulder height, squeeze shoulder blades, control the return.' },
          { name: 'Thoracic Rotation (Quadruped)', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: 'Controlled', rest: '30s', cue: 'Hand behind head, rotate from the mid-back, hips stay still.' },
        ],
      },
      // Compound zone. Pattern check across blocks B-C: Back Squat (squat)
      // -> DB Split Squat (squat/lunge, left leads) -> Face Pull
      // (horizontal pull) = 2 squat/lunge + 1 different pattern. No 3rd
      // squat/lunge stacked. Compliant — order unchanged by the 8/19 re-cut.
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — BACK SQUAT',
        introLabel: 'Load Target',
        intro: `The day's main lift. Back Squat tested at 55 lbs x5 (Epley 1RM ~${sqRM} lbs), trained technique-first on the same 70-75% → 90-95% ramp as Day A's deadlift. If the day calls for a variation, rotate between: a goblet squat (DB at the chest, easiest to keep upright), a box squat (depth set by the box), or a landmine squat (angled, more forgiving path). The barbell back squat stays the lift we track and retest.`,
        exercises: [
          { name: 'Back Squat (Barbell)', sets: '3', reps: '6', load: `Wk1: ${sqWk1} lbs → Wk4: ${sqWk4} lbs`, tempo: '3-1-1', rest: '90s', cue: 'Brace before descent, chest tall, drive floor away through mid-foot.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — SPLIT SQUAT & SHOULDER HEALTH',
        introLabel: 'Load Target',
        intro: 'Unilateral accessory work directly behind the squat — DB Split Squat is the lunge-pattern substitute from her intake battery, left leg leading every set (weaker side) — then the face pull rotates the pattern and balances Day A\'s pressing volume.',
        exercises: [
          { name: 'DB Split Squat', sets: '3', reps: '8 ea, LEFT leads', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-1', rest: '75s', cue: 'Left leads (weaker side). Front knee tracks over toes, even tempo.' },
          { name: 'Kieser or Band Face Pull', sets: '3', reps: '15', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows at ear height, external rotation at end range.' },
        ],
      },
      // Compound zone. Antagonist walk ACROSS the C->D boundary (fixed
      // 8/19/2026, batch-2 audit, mirroring Mary Burfete's 8/16 fix):
      // Block C ends on Face Pull (pull), so the old D order (SA Row ->
      // Bent-Over Row) stacked a 3rd consecutive pull across the boundary.
      // Push Press now sits between the two rows: Face Pull -> SA Row ->
      // Push Press -> Bent-Over Row. Compliant on the full rendered walk.
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — PULL STRENGTH',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — pulling, rotating off the squat and lunge work above, with the push press breaking up the two rows so the pulling muscles get a breather mid-block. Row was not part of the tested 10-pattern battery — today\'s working loads become the new 8-week baseline for both rows, tracked the same as every tested lift. No side-lead is applied to Single-Arm Row — the arm-to-arm difference here is minor. If the row needs a variation: a chest-supported DB row (torso fully supported) or a single-arm Kieser row covers the same pattern; today\'s rows stay the lifts we track.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '8 ea side', load: 'Wk1: 15 lbs → Wk4: 20 lbs', tempo: '3-1-2', rest: '60s', cue: 'Bench-supported, flat back, drive elbow to hip, full stretch at bottom.' },
          { name: 'Standing DB Push Press', sets: '3', reps: '8', load: 'Wk1: 10 lbs/hand → Wk4: 12.5 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'Slight knee dip, drive up and press overhead in one motion.' },
          { name: 'Bent-Over DB Row (Both Arms)', sets: '3', reps: '10', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-2', rest: '60s', cue: 'Hip hinge, flat back, pull both DBs to lower ribs.' },
        ],
      },
      {
        letter: 'E',
        title: 'PUSH-UP PROGRESSION & CORE',
        color: 'green',
        introLabel: 'Baseline',
        intro: '10 reps on an incline is a solid bridge point toward full floor push-ups. Side plank varies the core stimulus from Day A\'s front plank.',
        exercises: [
          { name: 'Incline Push-Up (Hands Elevated)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Baseline 10 reps. Hands on bench, full chest to bench, controlled descent.' },
          { name: 'Side Plank', sets: '2', reps: '30s ea side', load: 'Bodyweight', tempo: '—', rest: '45s', cue: 'Hips stacked, no sag, straight line shoulder to ankle.' },
        ],
      },
      {
        letter: 'F',
        title: 'FULL-BODY INTEGRATION — FARMER CARRY (LIGHT)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — a light loaded carry that pulls the day\'s squat posture, pulling strength, and core bracing together under gait. Loads stay deliberately below Day A\'s carry work — this closes the day with quality movement, not extra load. Distance and movement quality govern this work, not an effort target; carry evenly with both hands (no side-lead — the arm-to-arm difference is minor). A goblet carry is the alternate if it suits the day better.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands — Light)', sets: '2', reps: '25–30 yds', load: '15–20 lbs/hand', tempo: 'Controlled', rest: '60s', cue: 'Hinge to pick up clean. Shoulders packed, chest tall, carry evenly.' },
        ],
      },
      {
        letter: 'G',
        title: 'CONDITIONING CLOSE',
        color: 'gold',
        introLabel: 'Why',
        intro: 'A brief steady-state close, same dose and role as Day A\'s bike/rower block.',
        exercises: [
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
  milestones4wk: `All tested lifts progressed on schedule: Hex DL ${dlWk4} lbs, Back Squat ${sqWk4} lbs, Hip Thrust ${htWk4} lbs, OHP ${ohpWk4} lbs/hand, Incline Press ${inclineWk4} lbs/hand, Single-Leg RDL ${slrdlWk4} lbs/hand. Push-up: 6-8 full floor reps. Plank: 1:30-1:45. Week 4 closes with the strength check (the standing 4-week reassessment) — the natural window for the planned recovery week that follows it (see the recovery-week note above).`,
  milestones8wk: 'Re-test the full 10-pattern battery and set new working baselines from the updated numbers. Introduce assisted pull-up testing (bonus 11th pattern) if pulling strength supports it. Reassess whether DB Split Squat or a true barbell/loaded lunge better fills the lunge-pattern role going forward.',
  rescanNote: 'Strength runs on the standing 4-week reassessment cadence (Week 4 check, Week 8 full re-test); the Styku body-composition rescan books separately at 8 weeks — ALST Index (currently 5.52, close to the At-Risk boundary) is the top metric to watch; also track BMI (currently 18.6, only 0.1 above the Underweight cutoff — watch it doesn\'t drop further as training volume increases), Shape Score (currently 85, Excellent — maintain), and the leg segmental LST gap (currently 0.5 lbs, roughly 3-4% of the total reading — track the percentage change at rescan, not just the raw lb figure, and reassess whether left-led unilateral programming is still the right call once updated numbers are in).',
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
  const outDir = path.join(__dirname, '..', '..', 'clients', 'nicolette_scott');
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
