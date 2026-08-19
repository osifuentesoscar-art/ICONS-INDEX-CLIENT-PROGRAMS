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
 *   - weightKg/ageYears/alstIndex are all on file. NOTE (corrected 8/17/2026,
 *     per CLAUDE.md's "Protein Targets — re-keyed from age to context"
 *     correction): the prior age-banded reading of this client as an
 *     automatic "50+ tier" 2.0-2.2 g/kg escalation is retired — her ALST
 *     (6.32 kg/m²) is within the normal reference range, not At-Risk, and
 *     nothing on file documents a genuine energy deficit or heavy training
 *     load, so per the corrected standard her protein target is context-
 *     driven, not age-driven. `proteinTargets()` in icons_template.js has
 *     not yet been updated to this corrected logic (see CLAUDE.md's Research
 *     Update Log, 8/17/2026 pass) — the rendered nutrition block below still
 *     reflects the prior formula pending that engine fix; the language in
 *     this script has been corrected so it no longer asserts the retired
 *     age-tier as the reason. Creatine remains strongly indicated at 40+
 *     regardless (age-based creatine guidance is unaffected by this fix).
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
 * ALST — CORRECTED 8/17/2026 (sex-conflation fix, see CLAUDE.md's "ALST
 * Index" section): the prior 3-tier read used here (<5.5 At-Risk / 5.5-6.99
 * Normal-monitor / >=7.0 Optimal) was wrong — 7.0 kg/m² is EWGSOP2's MALE
 * at-risk cutoff, not a female "Optimal" tier; there is no graded "how good"
 * scale for women above 5.5. Styku's own report labels ALST 6.32 kg/m² "Not
 * At-Risk," which is correct against the EWGSOP2 <5.5 kg/m² female at-risk
 * cutoff. Presented throughout as: within normal reference range, a trend
 * metric tracked at rescan — not "Normal — monitor" (implying a lesser tier
 * below some higher target) and not "Optimal" (a tier that doesn't exist).
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
 *
 * REVISION (8/19/2026) — ICONS BLOCK METHOD RESTRUCTURE (roster-wide
 * rollout, batch 2; spec: CLAUDE.md "ICONS Block Method — Standing Session
 * Architecture"; reference: scripts/siobhan_hansen_3day_plan.js, the
 * pilot). Full prior record (this header + CLIENTS.md entry) re-read
 * first, per the standing rule. Slot 4 (Jason's Exercise) is OMITTED on
 * all three days — no Jason Bethea SOAP note, exercise, or coordinated-
 * care relationship is on file for this client (her frozen-shoulder work
 * is a self-contained corrective priority, explicitly not PT-coordinated
 * per intake) — no filler inserted.
 *   DAY 1: slot 1 = Block A (Hip Activation & 90/90, unchanged); slot 2 =
 *   Goblet Squat alone (new Block B — primary, still baseline-
 *   establishment: options menu is technique-band only); slot 3 = the
 *   Tibia & Inner-Thigh corrective pairing, MOVED between the two lifts
 *   as the accessory block (the one genuine resequencing in this
 *   restructure: previous rendered order was Squat → Trap Bar DL → tibia
 *   block; new order Squat → tibia block → Trap Bar DL. Antagonist walk:
 *   squat → isolated corrective work → hinge — no same-pattern stack
 *   created or removed; no documented audit-fix ordering existed on this
 *   day to disturb); slot 5 = Trap Bar Deadlift (new Block D — secondary
 *   compound, hinge vs. the squat primary; technique-band options only);
 *   slot 6 = NEW Block E, Full-Body Integration — Farmers Carry (Light),
 *   2x25-30 yd at 20-25 lbs/hand — anchored BELOW her tested 30 lbs/hand
 *   Farmers Carry baseline, no invented number; integrates the two brand-
 *   new lift patterns into braced gait at technique loads. Block F =
 *   metabolic finisher.
 *   DAY 2: slot 1 = Block A (Shoulder Internal Rotation corrective,
 *   unchanged); slot 2 = Seated DB OHP alone (new Block B — primary;
 *   options constraint-filtered by the frozen-shoulder history: landmine
 *   press [standard scap-friendly alternate] and half-kneeling single-arm
 *   DB press, every option inside the same pain-free-range/sharp-pinch
 *   stop rule; NOTE: CLAUDE.md's shoulder-reintroduction addendum
 *   [press → closed-chain hold] was considered and deliberately NOT
 *   applied — its stated scope is a REINTRODUCED press after shoulder
 *   rehab/reconstruction, and Johnna's OHP is a tested, continuously-
 *   programmed lift under a corrective-priority gate, not a
 *   reintroduction); slot 3 = Incline Push-Up (new Block C — accessory,
 *   split out of the old press block); slot 5 = old Block C retitled
 *   secondary compound (Bent-Over Row + Face Pull [renamed Band or
 *   Kieser] + Incline DB Press — order unchanged; row options:
 *   chest-supported DB row, single-arm Kieser row); slot 6 = NEW Block E,
 *   Full-Body Integration — Farmers Carry, 2x20-30 yd at 20-25 lbs/hand,
 *   packed-shoulder framing that directly reinforces the shoulder-care
 *   priority in a closed, neutral position (a deliberately shoulder-safe
 *   integration choice — no overhead carry, which is excluded on
 *   constraint grounds). Block F = metabolic finisher.
 *   DAY 3: slot 1 = Block A (Hip Activation Carryover, unchanged);
 *   slot 2 = DB Hip Thrust alone (new Block B — her strongest tested
 *   lift; options: floor glute bridge, B-stance hip thrust [left working
 *   share], single-leg glute bridge [left leads]); slot 3 = Single-Leg
 *   RDL left-led (new Block C — accessory; 2 RIR kept); slot 5 = old
 *   Block C retitled secondary compound (DB Reverse Lunge left-led +
 *   tibia/Copenhagen touch-up — lunge is knee-dominant vs. the hip-
 *   extension primary; options: step-up [left leads], static split
 *   squat); slot 6 = old Block D (Loaded Carry + Core) retitled
 *   Full-Body Integration (+ suitcase-carry/front-rack options — arms
 *   read effectively even, so a one-sided carry alternates sides rather
 *   than fabricating a lead; Farmers Carry rirNote aligned from '2 RIR'
 *   to the carry convention, matching the pilot); Block F = finisher.
 *   Rendered order on Days 2-3 is otherwise unchanged.
 * CONSTRAINT FILTERING SUMMARY: no overhead carries or overhead ballistic
 * options anywhere (frozen-shoulder history + conservative OHP ramp); the
 * two not-yet-baselined patterns (Goblet Squat, Trap Bar DL) get
 * technique-band options only — no heavy barbell variants offered while
 * the baseline is still being established.
 * TOUCH-IT-BRING-IT-CURRENT: Face Pull renamed (Band or Kieser);
 * equipment ceilings verified (all DB loads ≤60/hand, KB Swing 20 lbs ≤25
 * ceiling, trap bar confirmed in inventory); DELOAD — PROACTIVE Week 5
 * (new blue client-visible note): an 8+ week continuous-progression arc
 * plus a conservative frozen-shoulder ramp that benefits from a
 * consolidation week put her in the proactive tier of CLAUDE.md's deload
 * protocol; milestones/rescanNote reconciled to the Wk4-check →
 * Wk5-deload → Wk6-8-rebuild arc, and the 4-week strength / 8-12-week
 * Styku cadence split stated. Warm-up drift checked: all three warmUps
 * carry only unloaded mobility/activation — no loaded, rep-prescribed
 * exercise in any of them. 10-movement Full-Spectrum coverage (she is 54)
 * re-verified intact post-restructure, including the 8/13 Incline DB
 * Press addition.
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
  alstIndex: 6.32, // Within normal reference range (>=5.5 kg/m²) — corrected 8/17/2026, no graded "Optimal" tier for women
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
  peerComparison: 'Lower body fat than 75% of women 50-59 (25th percentile) — leaner than most peers, though Styku\'s own comparison band labels this result "Moderate Risk." Read alongside the Ideal Lean Mass marker and the VFA trend figure below rather than in isolation.',
};

// weakerSide() replaces hand-derived weaker-side comments — lower LST =
// weaker = leads unilateral work. Legs carry the larger gap (1.4 lbs,
// ~7.7% relative) and lead unilateral work; arms are effectively even
// (0.1 lb, ~1.2%) and are not run through the unilateral-lead protocol.
// NOTE (8/18/2026): neither gap clears CLAUDE.md's corrected >=10%
// RELATIVE asymmetry trigger (the prior absolute 0.5 lb figure is
// retired). The left-led prescription below is deliberately UNCHANGED
// pending a per-client clinical review — see the internal baselineNote.
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
  ['Incline Dumbbell Press', 'Not Tested — Established This Week', '8/12/2026', 'Wk1 working load 12.5 lbs/hand x8 — becomes the new 8-week baseline; target 15–17.5 lbs/hand by Week 4 as shoulder tolerates load'],
];

const baselineNotes = [
  {
    type: 'red',
    label: 'Frozen Shoulder (Adhesive Capsulitis) History — Corrective Priority',
    body: 'Documented history of frozen shoulder. Every upper-body session opens with a dedicated internal-rotation strengthening block, sequenced BEFORE any overhead or compound pressing — "control precedes power." This is active strengthening, not restriction: work within her current pain-free range and never force end-range. Sharp or pinching pain is a hard stop signal, clearly distinct from normal training fatigue — stop the set immediately and flag your coach if it occurs. No in-house PT/stretch-therapy coordination is named here; none was reported as involved for this client at intake, so this stays a self-contained corrective priority.',
  },
  {
    type: 'teal',
    audience: 'internal',
    label: 'Styku Findings — Body Composition & ALST',
    body: 'Body Fat 36.5% (58.6 lbs fat mass) — Styku\'s own "Average" classification (35–39.9% band). Lean Mass 96.6 lbs (60.2%) carries Styku\'s "Ideal Lean Mass" flag — a genuinely positive marker. Bone Mass 5.3 lbs (3.3%). BMI 23.7 — Normal (18.5–24.9). Shape Score 70/100 — Good. ALST Index 6.32 kg/m²: Styku\'s own report labels this binary "Not At-Risk," which is correct against the EWGSOP2 <5.5 kg/m² female at-risk cutoff — this system treats 5.5 kg/m² as the governing threshold, not a graded scale above it (EWGSOP2 sets no higher "Optimal" tier for women). ALST above 5.5 kg/m² is best read as within normal reference range and tracked as a trend metric, not a precision score — worth tracking again at the 8-week rescan simply to confirm it holds steady or continues trending upward, not against any higher numeric target.',
  },
  {
    type: 'watch',
    label: 'Peer-Comparison Tension — Body Fat % vs. "Moderate Risk" Band',
    body: 'Compared against age-matched peers (women 50–59), Johnna\'s body fat % is lower than 75% of the comparison group — she is leaner than most peers in this bracket — yet Styku\'s own comparison band for that same result is labeled "Moderate Risk," 25th percentile. Read this as a population-relative marker, not a standalone clinical risk flag: VFA (82.7 cm² — a mid-range figure tracked as a personal trend, not assigned a risk band) and ALST (6.32 kg/m², within normal reference range) don\'t support an elevated cardiometabolic read on their own, and Lean Mass carries the positive "Ideal Lean Mass" flag noted above. The full picture is a healthy profile, not one driven by any single number in isolation.',
  },
  {
    type: 'teal',
    label: 'VFA 82.7 cm² — Tracked as a Trend',
    body: 'Presented as a personal trend figure to follow scan over scan rather than assigned a risk band: no consensus body endorses a single visceral-fat cutoff, published thresholds vary widely across studies, and this scanner\'s visceral-fat output was validated against DXA in kilograms rather than CT in cm² — so the absolute number carries real individual-level uncertainty. Waist circumference, measured to protocol, is the primary clinical-facing metric going forward; add it at the next scan and track the two together.',
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Left Leg Leads (Arms Monitor Only)',
    body: `Legs: Left ${styku.leftLegLST} lbs / Right ${styku.rightLegLST} lbs — the left leg reads as the lighter/weaker side on this scan and leads every unilateral lower-body exercise across this program; reps/loads are logged per side. Arms: Left ${styku.leftArmLST} lbs / Right ${styku.rightArmLST} lbs — a difference small enough to read as routine scan-to-scan variation, so arms are tracked as monitoring only with no formal unilateral-lead requirement.`,
  },
  {
    type: 'watch',
    audience: 'internal',
    label: 'Asymmetry Trigger Recalculation — Flagged Discrepancy (8/18/2026)',
    body: 'CLAUDE.md\'s Asymmetry Protocol trigger was corrected 8/17/2026 from an absolute 0.5 lb L/R gap to a relative ≥10% gap, because the old absolute figure was firing on measurement noise. Recomputed against this client\'s actual numbers: Left Leg 16.8 lbs / Right Leg 18.2 lbs is a 1.4 lb gap — the largest currently on the roster — but ~7.7% relative, so it cleared the OLD absolute trigger comfortably and still falls short of the corrected ≥10% threshold. Arms (8.4 vs 8.5 lbs, ~1.2% relative) sit below it either way. Per the Nicolette Scott precedent, the left-leg-leads prescription already programmed into this document (Single-Leg RDL, DB Reverse Lunge, Step-Up) is left UNCHANGED pending a dedicated per-client clinical review — this note makes the discrepancy visible for that review rather than resolving it silently, and a functional single-leg strength or power test is the preferred primary trigger going forward. Flagged to the main thread / icons-expert.',
  },
  {
    type: 'gold',
    label: 'Squat, Deadlift & Incline Press — Baselines Established This Week',
    body: `Three lifts were not part of the initial testing battery: Back Squat, Deadlift, and Incline Dumbbell Press. Day 1's deliberately light working loads (Goblet Squat 25 lbs, Trap Bar Deadlift 55 lbs) and Day 2's Incline Dumbbell Press (12.5 lbs/hand, technique-first, same conservative posture as her Overhead Press given the frozen shoulder history) all become the new 8-week baseline — track progression from here rather than against an invented tested number.`,
  },
  {
    type: 'gold',
    label: 'Hip Activation, 90/90 Mobility & Tibia/Inner-Thigh — Standing Programming Priorities',
    body: 'Three real, standing priorities from intake, not throwaway lines: (1) hip activation and glute medius/abductor strengthening opens every lower-body session and carries directly into the loaded squat, deadlift, hip thrust, and lunge patterns below; (2) the 90/90 hip internal/external rotation drill opens the warm-up on lower-body days and also appears as scored corrective work in Day 1\'s activation block; (3) tibialis anterior strengthening (tibialis raises, banded dorsiflexion) is paired with adductor/inner-thigh activation (Copenhagen-style regressed side plank, side-lying adductor lift) as a deliberate corrective pairing on Days 1 and 3.',
  },
  {
    type: 'gold',
    label: 'Age Bracket — Perimenopause / Menopause Transition (45–55)',
    body: 'At 54, Johnna sits in the 45–55 age bracket. Creatine is strongly indicated by age alone regardless of ALST status. Protein moves up within the 1.6–2.2 g/kg range for a genuine energy deficit, heavy training load, or ALST At-Risk status — not for age or bracket alone (her ALST, 6.32 kg/m², is within normal reference range, not At-Risk). Bone-loading candidacy (LIFTMOR-style, T-score dependent) is worth screening for as she moves through this window even though nothing on the current scan indicates low bone mass.',
  },
  {
    type: 'blue',
    label: 'Planned Deload — Week 5, Directly After the Week 4 Strength Check',
    body: 'This program deliberately includes one lighter week, and it is planned, not a reaction to anything going wrong. Week 5 — immediately after the Week 4 strength check — is a structured deload: the same exercises and movement patterns, with sets reduced by roughly a third, every set held comfortably in the technique band (3 or more reps in reserve), and loads held at Week 3-4 levels rather than climbing — the usual add-weight rule pauses for this one week. With two brand-new lift baselines being established and a shoulder trained deliberately conservatively, this is how the program consolidates the strength built in Weeks 1-4 before Weeks 6-8 rebuild from the Week 4 loads toward the 8-week retest and rescan. One light week costs nothing that matters: muscle built over the previous month is not lost in a single reduced-volume week — only a small edge of peak strength dips, and it returns within days of resuming.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Session Architecture — ICONS Block Method Restructure (8/19/2026)',
    body: 'All three days restructured onto the ICONS Block Method six-slot order (Corrective → Primary Compound → Accessory → Jason\'s Exercise → Secondary Compound → Third Compound/Integration). Slot 4 omitted on all days — no Jason Bethea exercise or coordinated-care relationship on file (her shoulder work is a self-contained corrective priority per intake); no filler inserted. Day 1: corrective = Hip Activation & 90/90; primary = Goblet Squat; accessory = the Tibia & Inner-Thigh pairing, MOVED between the two lifts (the one genuine resequencing — previous order was Squat → Trap Bar DL → tibia block; antagonist walk clean: squat → isolated correctives → hinge; no documented audit-fix ordering existed on this day); secondary = Trap Bar Deadlift; integration = NEW light Farmers Carry (2x25-30 yd, 20-25 lbs/hand, anchored below her tested 30 lbs/hand baseline). Day 2: corrective = Shoulder Internal Rotation; primary = Seated OHP (split from the old press block); accessory = Incline Push-Up; secondary = row/face-pull/incline-press block unchanged; integration = NEW Farmers Carry, packed-shoulder framing (shoulder-safe by design — overhead carry excluded on constraint grounds). CLAUDE.md\'s shoulder-reintroduction addendum (press → closed-chain hold) was considered and deliberately not applied: its scope is a reintroduced press after rehab/reconstruction; her OHP is a tested, continuously-programmed lift under a corrective gate, not a reintroduction. Day 3: primary = DB Hip Thrust; accessory = SL RDL (left-led); secondary = Reverse Lunge + tibia/Copenhagen touch-up; integration = the existing Carry + Core block retitled (Farmers Carry rirNote aligned to the carry convention; suitcase/front-rack options alternate sides — arms effectively even, no lead fabricated). Options menus on every compound slot, constraint-filtered: technique-band options only on the two not-yet-baselined patterns; every press option inside the pain-free-range/sharp-pinch stop rule; no overhead carries or ballistic overhead options anywhere. Same pass: Face Pull renamed (Band or Kieser), proactive Week-5 deload added, 4-week strength / 8-12-week Styku cadence split stated, warm-up drift checked clean, 10-movement coverage re-verified intact.',
  },
  {
    type: 'teal',
    audience: 'internal',
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
        title: 'PRIMARY COMPOUND — GOBLET SQUAT (BASELINE ESTABLISHMENT)',
        introLabel: 'Load Target',
        intro: 'No baseline was recorded for the squat. Today\'s deliberately light load becomes the new baseline — the goal is a clean, repeatable pattern, not maximal weight. If the day calls for a variation while the pattern is still being established, both options stay in the same technique band: a box squat (depth set by the box) or a supported split-stance squat holding a rail (left leg leads). The goblet squat stays the lift we track — its working load is the number that becomes the 8-week baseline.',
        exercises: [
          { name: 'Goblet Squat', sets: '3', reps: '8', load: '25 lbs', tempo: '3-1-1', rest: '75s', cue: 'Elbows inside knees, chest tall, full depth.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — TIBIA & INNER-THIGH CORRECTIVE PAIRING',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Tibialis strength and inner-thigh/adductor activation are paired corrective priorities from intake — tibialis raises build the ankle-dorsiflexion control that supports squat and lunge mechanics, while the adductor work balances the lateral hip-abductor emphasis in Block A. Placed between today\'s two main lifts, this work also gives the legs a controlled breather before the hinge pattern below.',
        exercises: [
          { name: 'Tibialis Raise (Wall or Slant Board)', sets: '3', reps: '15', load: 'bodyweight / light plate', tempo: '2-1-2', rest: '30s', cue: 'Heels planted, toes drive up toward shins, slow return.' },
          { name: 'Banded Dorsiflexion Pull', sets: '2', reps: '15', load: 'light band', tempo: 'controlled', rest: '30s', cue: 'Seated, pull toes toward shin against band resistance.' },
          { name: 'Copenhagen Plank (Bent-Knee, Regressed)', sets: '2', reps: '15–20s/side', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Top leg on bench, adductor engaged, hips level.' },
          { name: 'Side-Lying Adductor Lift', sets: '2', reps: '12/side', load: 'bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Bottom leg lifts straight, inner thigh drives the movement.' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — TRAP BAR DEADLIFT (BASELINE ESTABLISHMENT)',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — a hinge, rotating off the squat work above. No baseline was recorded for the deadlift; today\'s deliberately light load becomes the new baseline. If a variation is needed while the pattern is established, both options stay in the same technique band: a trap bar pull from low blocks (shortened range) or a light double-DB Romanian deadlift. The trap bar lift stays the one we track — its working load becomes the 8-week baseline.',
        exercises: [
          { name: 'Trap Bar Deadlift', sets: '3', reps: '6', load: '55 lbs', tempo: '2-1-1', rest: '90s', cue: 'Flat back, brace, push floor away evenly.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — FARMERS CARRY (LIGHT)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — a light loaded carry that puts today\'s two brand-new lift patterns to work as one integrated movement: the hinge to pick the weights up, the braced, tall posture of the squat work, carried under gait. Loads stay deliberately below her tested 30 lbs/hand carry baseline — this closes a technique day with quality movement, not extra load. Distance and movement quality govern this work, not an effort target. A goblet carry (one DB held at the chest) covers the same ground with an upright-posture bias if it suits the day better.',
        exercises: [
          { name: 'Farmers Carry (DB, Both Hands — Light)', sets: '2', reps: '25–30 yd', load: '20–25 lbs/hand', tempo: 'controlled', rest: '60s', cue: 'Hinge to pick up clean. Tall posture, ribs down, quick tight steps.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
      {
        letter: 'F',
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
    descriptor: 'SHOULDER CARE PRIORITY · MODERATE STRENGTH · VOLUME BUILD',
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
        title: 'PRIMARY COMPOUND — SEATED OVERHEAD PRESS',
        introLabel: 'Load Target',
        intro: `The day's main lift. Seated overhead press tested at 15 lbs x8 (Epley 1RM ≈${oneRM.ohp} lbs). Given the frozen shoulder history, Week 1 trains conservatively below baseline (${wk1.ohp} lbs) and progresses only as far as pain-free range allows, reaching ${wk4.ohp} lbs by Week 4. If the day calls for a press variation, rotate between: a landmine press (a friendlier, angled arc when the fully vertical line isn't comfortable) or a half-kneeling single-arm DB press (light, one side at a time). Every option lives inside the same rule as the press itself — pain-free range only, sharp or pinching pain ends the set — and the seated press stays the lift we track and retest.`,
        exercises: [
          { name: 'Seated DB Overhead Press', sets: '3', reps: '8', load: `Wk1: ${wk1.ohp} lbs → Wk4: ${wk4.ohp} lbs`, tempo: '2-0-2', rest: '75s', flag: 'Progress only within pain-free range', cue: 'Ribs stacked over hips, press within comfortable range.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — INCLINE PUSH-UP',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'The pressing accessory directly behind the overhead work — a controlled, non-overhead range that builds pushing volume while staying well clear of the shoulder\'s sensitive arc.',
        exercises: [
          { name: 'Incline Push-Up', sets: '3', reps: '6–8', load: 'bodyweight (bench)', tempo: '3-1-1', rest: '60s', cue: 'Baseline 6 reps. Hands under shoulders, chest to bench, brace.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — PULL STRENGTH & INCLINE PRESS BASELINE',
        color: 'purple',
        introLabel: 'Note',
        intro: 'The day\'s second compound territory — pulling, rotating off the pressing work above. Rowing volume balances the pressing and builds scapular stability around the healing shoulder. Incline Dumbbell Press was not part of the initial testing battery — it closes the block as a new horizontal-press baseline, light load and technique-first, respecting the same pain-free-range guardrail as the rest of this session. If the row needs a variation: a chest-supported DB row (torso fully supported) or a single-arm Kieser row covers the same pattern; the bent-over row stays the one we track.',
        exercises: [
          { name: 'Bent-Over DB Row', sets: '3', reps: '10', load: '20 lbs/hand', tempo: '2-1-2', rest: '75s', cue: 'Flat back, pull to hip, squeeze at top.', rirNote: '2 RIR' },
          { name: 'Face Pull (Band or Kieser)', sets: '3', reps: '15', load: 'light band', tempo: '2-1-2', rest: '45s', cue: 'Pull to face, elbows high. Light, pain-free range only.' },
          { name: 'Incline Dumbbell Press', sets: '3', reps: '8', load: '12.5 lbs/hand', tempo: '2-1-2', rest: '75s', flag: 'Not tested — establishing baseline. Stop at any pinch or sharp pain.', cue: 'Bench ~30°, elbows ~45°, press within pain-free range only.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — FARMERS CARRY (PACKED SHOULDERS)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — a loaded carry that puts today\'s shoulder work to use in the position it is strongest and safest: shoulders packed down and back, arms locked at the sides, load carried under a tall, braced posture. This directly reinforces the shoulder-care priority in a closed, neutral position — nothing travels overhead. Loads stay below her tested 30 lbs/hand carry baseline. Distance and movement quality govern this work, not an effort target. A goblet carry (one DB at the chest) is the alternate if it suits the day better; no overhead carry variation is used in this program.',
        exercises: [
          { name: 'Farmers Carry (DB, Both Hands)', sets: '2', reps: '20–30 yd', load: '20–25 lbs/hand', tempo: 'controlled', rest: '60s', cue: 'Shoulders packed down and back, tall posture, quick tight steps.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
      {
        letter: 'F',
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
    intensityPara: 'Primary strength day, built on Johnna\'s strongest tested numbers (Hip Thrust 55 lbs x8, Epley 1RM ≈70 lbs). Left leg leads every unilateral set — segmental lean mass reads lighter on the left (16.8 vs 18.2 lbs), so the left side sets the working load and the right matches it. Hip activation carries forward from earlier in the week into every rep here.',
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
        title: 'PRIMARY COMPOUND — DB HIP THRUST',
        introLabel: 'Load Target',
        intro: `The day's main lift, built on her strongest tested number. Hip Thrust tested at 55 lbs x8 (Epley 1RM ≈${oneRM.hipThrust} lbs); Week 1 trains at ${wk1.hipThrust} lbs, climbing to ${wk4.hipThrust} lbs by Week 4. If the day calls for a variation, rotate between: a floor glute bridge (the simplest regression), a B-stance hip thrust (left leg takes the working share), or a single-leg glute bridge (left leg leads). The bench-supported DB hip thrust stays the lift we track and retest.`,
        exercises: [
          { name: 'DB Hip Thrust', sets: '3', reps: '8', load: `Wk1: ${wk1.hipThrust} lbs → Wk4: ${wk4.hipThrust} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Drive through heels, glutes lock at top.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — SINGLE-LEG RDL (LEFT-LED)',
        introLabel: 'Load Target',
        intro: `The unilateral accessory directly behind the hip thrust — same posterior chain, worked one leg at a time with the left leading. Tested at 20 lbs/hand x5 (Epley 1RM ≈${oneRM.slRDL} lbs); Week 1 trains at ${wk1.slRDL} lbs/hand, climbing to ${wk4.slRDL} lbs/hand — left leg leads every set.`,
        exercises: [
          { name: 'Single-Leg RDL (Left-Led)', sets: '3', reps: '6/side', load: `Wk1: ${wk1.slRDL} lbs/hand → Wk4: ${wk4.slRDL} lbs/hand`, tempo: '3-1-1', rest: '60s', flag: 'Left leg weaker (Styku) — leads every set', cue: 'Left leg first. Hinge, flat back, soft knee.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — LUNGE (LEFT-LED) & TIBIA/INNER-THIGH ACCESSORY',
        color: 'gold',
        introLabel: 'Note',
        intro: `The day's second compound pattern — knee-dominant lunging, rotating off the hip-extension work above. Lunge tested at 15 lbs/hand x8 (Epley 1RM ≈${oneRM.lunge} lbs) — Week 1 trains at ${wk1.lunge} lbs/hand, climbing to ${wk4.lunge} lbs/hand by Week 4, left leg leading. If the lunge needs a variation: a DB step-up (left leg leads) or a static split squat covers the same knee-dominant territory; the reverse lunge stays the lift we track. Tibialis and adductor work from Day 1 gets a lighter touch-up here to reinforce the pattern under load.`,
        exercises: [
          { name: 'DB Reverse Lunge (Left-Led)', sets: '3', reps: '8/side', load: `Wk1: ${wk1.lunge} lbs/hand → Wk4: ${wk4.lunge} lbs/hand`, tempo: '2-1-1', rest: '60s', flag: 'Left leg leads', cue: 'Left leg first. Knee tracks over mid-foot.', rirNote: '2 RIR' },
          { name: 'Tibialis Raise (Wall or Slant Board)', sets: '2', reps: '15', load: 'bodyweight / light plate', tempo: '2-1-2', rest: '30s', cue: 'Heels planted, toes drive up toward shins.' },
          { name: 'Copenhagen Plank (Bent-Knee, Regressed)', sets: '2', reps: '15–20s/side', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Top leg on bench — adductor engaged, hips level.' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — LOADED CARRY + CORE',
        introLabel: 'Why',
        intro: 'The session\'s closing compound work — the carry pulls the day\'s hip-extension strength into upright, braced gait at her full tested working load (30 lbs/hand), building the deep spinal stabilizer strength that supports posture under all the compound lifts above. Distance and movement quality govern the carry, not an effort target. If a variation suits the day: a suitcase carry (one side at a time, alternating sides evenly — her arms read effectively even on the scan, so no side leads) or a front-rack carry (upright-posture bias). Plank closes the block.',
        exercises: [
          { name: 'DB Farmers Carry', sets: '3', reps: '30–40 yd', load: '30 lbs/hand', tempo: 'controlled', rest: '60s', cue: 'Tall posture, ribs down, quick tight steps.', rirNote: 'Distance & quality governed — no RIR target' },
          { name: 'Plank Hold', sets: '3', reps: '37 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Baseline 37 sec — ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'F',
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
    iconsNote: 'Left leg leads every unilateral set this session — Styku shows the left leg lighter by 1.4 lbs (16.8 vs 18.2 lbs), the largest segmental difference on her scan. Track the gap at the 8-week rescan. Hip activation and tibia/inner-thigh work carry forward from earlier sessions; keep shoulder work pain-free per the internal-rotation protocol established on Day 2.',
  },
];

const summary = {
  subtitle: 'Johnna Macarthur  ·  ICONS Index  ·  Hip Activation, Shoulder Care & Posterior Chain Strength Build  ·  Week 1',
  rows: [
    ['1', '60%', 'Lower Body Foundation — Squat & Deadlift Baseline', 'Goblet Squat / Trap Bar Deadlift', 'New baseline established (25 lbs / 55 lbs); hip activation, 90/90, and tibia/inner-thigh corrective priorities open the week'],
    ['2', '70%', 'Upper Body — Shoulder Care Priority', 'Seated DB Overhead Press', `Internal rotation strengthening precedes all pressing — frozen shoulder history, conservative load progression ${wk1.ohp}→${wk4.ohp} lbs; Incline Dumbbell Press baseline newly established this week at 12.5 lbs/hand, technique-first`],
    ['3', '80%', 'Posterior Chain — Left-Led Unilateral', 'DB Hip Thrust', `Loads build off tested baselines (Hip Thrust Epley 1RM ≈${oneRM.hipThrust} lbs); left leg leads every unilateral set per 1.4 lb Styku gap`],
  ],
  milestones4wk: `Goblet Squat 30–35 lbs x8, Trap Bar Deadlift 65–70 lbs x6 at 2–3 RIR. Hip Thrust progressing toward ${wk4.hipThrust + 5} lbs x8. Seated OHP at 15 lbs x8 pain-free (matching tested baseline) — progress only as shoulder ROM allows. Incline Dumbbell Press progressing from 12.5 lbs/hand toward 15 lbs/hand, pain-free. Left-leg single-leg RDL load matched toward parity with right within 10%. Week 4 closes with the strength check (the standing 4-week reassessment); Week 5 that follows is the planned deload week — same movements, sets reduced, loads held (see the deload note above) — before Weeks 6–8 rebuild.`,
  milestones8wk: 'Reached through the Week 4 strength check, the planned Week 5 deload, and the Weeks 6–8 rebuild. Squat/deadlift 8-week retest against today\'s new baseline (25 lbs / 55 lbs). Hip Thrust and OHP progressed from current working loads. Left/right leg LST gap reduced from 1.4 lbs. Plank hold past 50 seconds. Shoulder internal rotation strength improved with no pain flags logged.',
  rescanNote: 'Two clocks run separately: strength is reassessed on the standing 4-week cadence (the Week 4 check, then the Week 8 retest at the end of the rebuild), while the Styku body-composition rescan books at 8 weeks — landing at the end of the Weeks 6–8 rebuild that follows the planned Week 5 deload, so the scan reads a consolidated block. Track: ALST Index trend (currently 6.32 kg/m², within normal reference range), VFA (currently 82.7 cm² — track the direction of travel rather than a risk band, and pair it with a waist-circumference measurement at the next scan), left/right leg LST gap (baseline 1.4 lbs, ≈8% relative — track the percentage narrowing, not just the raw pounds), lean mass (currently 96.6 lbs, Ideal Lean Mass marker — maintain or build further).',
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
  const outDir = path.join(__dirname, '..', 'clients', 'johnna_macarthur');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Johnna_Macarthur_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — no clientHighlight set: this is a
  // first-build program with no prior version/PR on file to compare
  // against, so per CLAUDE.md's Client View spec, nothing is fabricated.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Johnna_Macarthur_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
