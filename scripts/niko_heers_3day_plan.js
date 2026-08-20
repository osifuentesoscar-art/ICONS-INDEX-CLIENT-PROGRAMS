/**
 * Niko Heers — ICONS 3-Day Training Plan
 * Brace Life Studios · Trainer Development / In-House Athlete Roster (Format 3)
 *
 * NEW BUILD, 8/20/2026, at Xolokan's direct request ("create trainer program
 * for this new trainer like the standard we have"). Niko Heers is Brace Life's
 * certified in-house Stretch Therapist (PNF — see CLAUDE.md's "STUDIO STAFF"
 * section); this is her own individually-programmed training plan, not a
 * generic teaching module.
 *
 * FORMAT — this is trainer_education Format 3 (an individual trainer/athlete
 * program built off that person's own real tested numbers), the same family as
 * Nick/Becca/Brodie/Oscar/Jah. Two Format-3 conventions are followed
 * deliberately:
 *   - Uniform 3-day length, matching the other five.
 *   - NO Client View companion document. Format 3 has never carried one
 *     (verified: no `viewMode` usage in any of the five existing Format 3
 *     scripts, no `*_Client_View.docx` in trainer_education/) because the
 *     trainer IS the reader — there is no second, separate client audience the
 *     way there is for a `clients/` deliverable. CLAUDE.md's standing
 *     "generate the Client View alongside every trainer document" rule is
 *     scoped to client-facing programs; it is not silently extended here.
 *
 * BUILT TO THE CURRENT STANDARD — ICONS BLOCK METHOD, not the older Format 3
 * template. The five existing Format 3 programs predate CLAUDE.md's "ICONS
 * Block Method — Standing Session Architecture" (8/18/2026) and its roster-wide
 * rollout (green-lit 8/19/2026); none of them have been restructured yet. A NEW
 * build today is written to the current standard rather than to the superseded
 * one, so every day below runs the six-slot order:
 *     1 CORRECTIVE · 2 PRIMARY COMPOUND · 3 ACCESSORY ·
 *     4 JASON'S EXERCISE (conditional) · 5 SECONDARY COMPOUND ·
 *     6 THIRD COMPOUND — INTEGRATION      (+ metabolic finisher where useful)
 *   - SLOT 4 IS OMITTED ON ALL THREE DAYS — deliberately, not as an oversight.
 *     Niko has no Jason Bethea SOAP note on file (she is studio staff, not a
 *     coordinated-care PT client). Per the rollout convention codified 8/19,
 *     an absent slot 4 is omitted honestly, never filled with generic filler.
 *   - Every compound slot (2, 5, 6) carries a 2-4 option same-pattern expert
 *     menu in its block intro, per the 8/18 compound-slot options rule. All
 *     options are drawn from the confirmed in-studio equipment inventory
 *     (CLAUDE.md's "STUDIO EQUIPMENT" section) — squat rack + Olympic bar, DBs
 *     to 60 lbs/hand, KBs to 25 lbs, incline-capable bench, leg extension,
 *     hamstring curl, hyperextension, assisted pull-up machine, Kieser (the
 *     studio's cable line), hex/trap bar, landmine, Total Gym, sled, plyo
 *     boxes, bands, med balls, cardio machines.
 *
 * DEMOGRAPHIC SCOPE — WOMEN'S FRAMEWORK, 20-35 BRACKET (first Format 3 program
 * to apply it; Nick's is the male-framework reference). Her Styku scan supplies
 * real age (24) and sex (female), so unlike Becca/Brodie/Oscar/Jah this document
 * does NOT carry a "no demographic data" scope note. Applied from CLAUDE.md's
 * Age Bracket Programming Framework, "20-35 — Foundation & Peak Bone Mass":
 *   - Protein >=1.6 g/kg/day (active women general tier) — engine-computed by
 *     nutritionBlock()/proteinTargets() off weightKg 66.7, ageYears 24.
 *   - Creatine INDICATED, not "strongly indicated" — the strongly-indicated
 *     tier is driven by 40+/ALST At-Risk/postmenopausal status, none of which
 *     applies at 24. The engine's own creatineStrong logic resolves this
 *     correctly; no manual override.
 *   - The ACL/knee-valgus/neuromuscular injury-prevention circuit is highest-
 *     yield in this bracket and is built in as a standing, dosed program
 *     component (see below) — this is the corrected UNIVERSAL trigger, not the
 *     retired screen-gated one.
 *   - Copenhagen plank / adductor prevention: highest-yield here, included.
 *   - Full ROM, heavy compound lifting contributes to PEAK BONE MASS in this
 *     bracket — no LIFTMOR candidacy screen is needed or implied (she is
 *     premenopausal with no T-score on file; that protocol is not applied).
 *   - No phase-based menstrual-cycle programming (Colenso-Semple/Phillips 2023
 *     umbrella review; UEFA 2025 consensus) — symptom-based autoregulation over
 *     >=3 consecutive cycles instead. Stated in a baseline note.
 *   - `isPostmenopausal: false` — pelvicFloorCallout() correctly never fires,
 *     and no forcePelvicFloor override is used (that field is for the 45-55
 *     ambiguous-status case, which does not apply at 24).
 *   - RED-S: the bracket's watch item is scoped to athletic/high-training-volume
 *     clients whose intake hasn't been discussed. Niko's profile (BMI 21.7,
 *     37.6% body fat, 3x/week resistance program) is not a RED-S presentation
 *     and no RED-S flag is fabricated. What IS carried across from the Energy
 *     Availability section is the BMR-is-not-an-intake-target caveat, which
 *     applies directly because this document quotes her BMR figure.
 *
 * NOT APPLIED, AND SAID SO: the "ICONS Index Full-Spectrum Progression Standard"
 * (all 10 core Baseline Testing Protocol movements must show programmed
 * progression) is scoped to WOMEN 40-55. Niko is 24 — per CLAUDE.md's
 * Demographic Scope Rule that mandate is NOT silently extended to her. As it
 * happens all 10 core movements are covered below anyway, because her intake
 * battery covered nine of them and the tenth (Lunges) is introduced as a new
 * baseline — but that is a consequence of her actual data, not a claim that the
 * 40-55 standard was applied.
 *
 * STYKU SCAN — 8/6/2026, Brace Life Studios (source PDF supplied by Xolokan):
 *   Body Fat 37.6% (Styku band: "Average," 35-39.9%) · Fat Mass 55.3 lbs ·
 *   Lean Mass 86.9 lbs (59.1%) · Bone Mass 4.8 lbs (3.3%) · BMI 21.7 ·
 *   BMR 1503 cal/day · ALST Index 5.61 kg/m² · VFA 132.0 cm² ·
 *   L/R Arm LST 8.1 / 7.9 lbs · L/R Leg LST 15.6 / 16.3 lbs ·
 *   Waist (Abdominal) 36.0 in, Waist (Narrowest) 34.8 in.
 *   No Shape Score is reported on this scan — the field is deliberately left
 *   unset rather than invented, and stykuBlock() omits the row cleanly.
 *
 * THE THREE READINGS THAT DROVE PROGRAMMING DECISIONS:
 *   1. ALST 5.61 kg/m² — Not At-Risk against EWGSOP2 2018's female cutoff
 *      (<5.5), but only 0.11 kg/m² above it. Per CLAUDE.md's corrected ALST
 *      section there is NO female "Optimal" tier (>=7.0 was EWGSOP2's MALE
 *      cutoff, retired here 8/17/2026), so no graded label is invented for how
 *      far above the line she sits. What the narrow margin does justify — read
 *      alongside 59.1% lean mass on a 5'9" frame — is making progressive
 *      resistance and muscle-building the program's primary physiological
 *      driver. Not a clinical flag; a programming priority. `alstIndex: 5.61`
 *      is >= 5.5, so proteinBar() correctly does NOT auto-insert per page.
 *   2. VFA 132.0 cm² — Styku's own dashboard labels this "High Risk." That
 *      label is NOT reproduced. CLAUDE.md retired the 4-tier VFA risk-band
 *      table 8/17/2026: no consensus body endorses a single VFA cutoff,
 *      published CT-derived thresholds span ~82-140 cm², female elevated-risk
 *      thresholds run higher than the old table assumed (~106 cm²+, Kelley et
 *      al.), and Styku's own VFA output was validated against DXA in KILOGRAMS,
 *      never against CT in cm². Presented as a personal trend baseline with the
 *      methodology caveat attached, and paired with the metric the IAS/ICCR
 *      consensus actually endorses for clinical use — WAIST CIRCUMFERENCE.
 *   3. Waist circumference 36.0 in (91.4 cm) abdominal / 34.8 in (88.4 cm)
 *      narrowest — above the IAS/ICCR female >=80 cm elevated threshold that
 *      applies at her normal BMI (Ross et al., Nat Rev Endocrinol 16:177-189).
 *      This is the honest, clinically-endorsed version of what the VFA reading
 *      is gesturing at, and it is reported as such: a real finding, stated
 *      without alarm, with the training-side response (progressive resistance +
 *      protein adequacy) already being what the program does.
 *
 * ASYMMETRY PROTOCOL — CHECKED, TRIGGER NOT MET, NOT APPLIED:
 *   Arms  L 8.1 / R 7.9 lbs -> 0.2 lb gap = ~2.5% relative (right lower)
 *   Legs  L 15.6 / R 16.3 lbs -> 0.7 lb gap = ~4.3% relative (left lower)
 *   Both sit well BELOW CLAUDE.md's corrected >=10% RELATIVE trigger, so no
 *   weaker-side-leads protocol is prescribed anywhere in this program. Per the
 *   engine gap documented in the Asymmetry Protocol section, weakerSide()
 *   returns a direction off raw values and does NOT gate on the percentage —
 *   the percentages above were computed by hand here, exactly as that section
 *   instructs, and weakerSide() is used only to name the direction in the
 *   monitor-only note. Both gaps also sit inside the device's own published
 *   segmental error (0.27 kg RMSE female arm FFM / 0.61-0.69 kg female leg FFM,
 *   Shape Up! Adults) — i.e. they are not distinguishable from measurement
 *   noise, which is precisely why the old 0.5 lb absolute trigger was retired.
 *   Worth logging that her circumference data (the device's most reliable
 *   output, ICC ~0.99) agrees on direction — bicep L 11.5 in / R 10.7 in, upper
 *   thigh L 21.8 in / R 22.0 in — so the direction is real even though the
 *   magnitude does not clear the protocol threshold. Monitor at rescan.
 *
 * BASELINE ANCHORING — Xolokan's supplied intake battery, 8/2026:
 *   Pull-Up (full, unassisted) 1 rep · Assisted Pull-Up battery: close grip 10,
 *   standard 10, wide grip 7 · Plank 3:00 · DB Farmers Carry 55 lbs ·
 *   DB RDL 50 lbs · Push-Ups 20 · Hex Bar Deadlift 165 x 8 · Back Squat 120 x 8
 *   · Hip Thrust 175 lbs.
 *   Epley 1RMs and working loads are computed below via epley1RM()/workingLoad()
 *   for the two lifts that arrived with a rep count. Three intake ambiguities
 *   are recorded honestly rather than silently resolved:
 *     (a) Farmers Carry 55 lbs and DB RDL 50 lbs are read as PER HAND (the
 *         standard for both movements, and consistent with a 165 lb hex bar
 *         deadlift). Both are inside the studio's 60 lb/hand DB ceiling.
 *     (b) Hip Thrust 175 lbs arrived with no rep count, so it is NOT run
 *         through Epley — it is carried as a documented working load and
 *         progressed conservatively from there.
 *     (c) Farmers Carry arrived with no distance and Plank is a max hold; both
 *         are recorded as given.
 *   All three gaps are listed as items to close at the 4-week reassessment.
 *
 * ANTAGONIST ROTATION RULE — walked on the FULL RENDERED DAY, across every
 * block boundary (the corrected audit method codified 8/19/2026), not per
 * block. Multi-joint real-load sequences, in render order:
 *   Day 1: v-push (OHP) -> h-push (Incline DB Press) -> v-pull (Pull-Up
 *          battery) -> h-pull (Kieser Row) -> h-push (Kieser Chest Press,
 *          Push-Up) -> carry.  Max 2 consecutive same-pattern. COMPLIANT.
 *   Day 2: knee (Back Squat) -> knee (Walking Lunge) -> hinge (Single-Leg RDL)
 *          -> hinge (DB RDL) -> knee+v-push (Squat-to-Press complex).
 *          Max 2 consecutive. COMPLIANT.
 *   Day 3: hinge (Hex Bar DL) -> h-pull (Kieser Seated Row) -> hip extension
 *          (Barbell Hip Thrust) -> carry (Farmers Carry) -> sled.
 *          Max 1-2 consecutive. COMPLIANT.
 *   Exempt by the rule's own scope and used as such: all three Slot-1
 *   corrective/Isolated-zone blocks, the single-joint machine accessories
 *   (hamstring curl, leg extension), core/metabolic work, and the assisted
 *   pull-up close/standard/wide GRIP-PROGRESSION BATTERY (explicitly exempt).
 *
 * WEEKLY VOLUME AUDIT (CLAUDE.md's ICONS Intensity Framework requires this
 * alongside the intensity coloring — % days specify intensity, not volume):
 *   Quads ~13 · Hamstrings/glutes ~17 · Chest ~10 · Back/lats ~10 ·
 *   Shoulders ~7 · Calves/adductors via corrective circuit.
 *   Chest and back land right at the ACSM 2026 >=10 sets/muscle/week
 *   hypertrophy target; shoulders sit at ~7, the honest cost of a 3-day split
 *   with two lower-body-weighted days. Recorded in the weekly summary rather
 *   than papered over.
 *
 * DELOAD: scheduled proactively at Week 5, immediately after the Week 4 peak
 * test — CLAUDE.md's house pattern (the deload absorbs test fatigue and the
 * 4-week reassessment clock supplies the slot). Framed as a "reload," per the
 * same positive-framing discipline as "bone investment."
 *
 * REASSESSMENT: the two-clock split, correctly stated — 4-week strength
 * reassessment (corrected 8/17/2026 from the old informal 8-week assumption)
 * and 8-12 week Styku rescan, which stay independent tracks.
 *
 * Output: trainer_education/Niko_Heers_3Day_Training_Plan.docx
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad, weakerSide } = require('./icons_template');

// ── Epley 1RMs and Week 1 -> Week 4 working loads ──────────────────────
// Only the two lifts that arrived with a rep count are Epley-derived.
const oneRM = {
  hexDL: epley1RM(165, 8),   // 209
  squat: epley1RM(120, 8),   // 152
};

const load = {
  // Day 3 is the week's 80% day — Hex Bar DL Wk1 sits at 80% of e1RM
  // (CLAUDE.md: "Week 1 working load = 80% 1RM"), building to the Week 4
  // peak test at 92% ("Week 4 peak test = 92-95% 1RM").
  hexWk1: workingLoad(oneRM.hexDL, 0.80),   // 165
  hexWk4: workingLoad(oneRM.hexDL, 0.92),   // 190
  // Day 2 is the week's 70% day — Back Squat is her weaker lift relative to
  // bodyweight (0.82x BW vs. 1.12x BW on the hex bar), so it runs as moderate-
  // intensity quality volume (8-10 reps at 2 RIR) climbing toward ~82% by
  // Week 4, rather than being held at a light number all block.
  squatWk1: workingLoad(oneRM.squat, 0.70), // 105
  squatWk4: workingLoad(oneRM.squat, 0.82), // 125
};

const client = {
  name: 'Niko Heers',
  programTitle: '3-Day Training Plan',
  subtitle: 'ICONS Block Method — Strength Foundation & Lean-Mass Build',
  schedule: '3-Day · In-House Staff / Trainer Program',
  stats: ['Age 24', 'Female', "5'9\"", '147 lbs', 'Stretch Therapist (PNF) — Brace Life Studios', 'Styku Scan 8/6/2026'],
  weightKg: 66.7, // 147 lbs
  ageYears: 24,
  isPostmenopausal: false,
  bmr: 1503,
  alstIndex: 5.61, // Not At-Risk (EWGSOP2 2018 female cutoff <5.5) — proteinBar() correctly does not auto-fire
};

const styku = {
  scanDate: '8/6/2026',
  bodyFatPct: 37.6,
  bodyFatRank: 'Average',
  leanMass: 86.9,
  leanMassPct: 59.1,
  fatMass: 55.3,
  boneMass: 4.8,
  bmi: 21.7,
  bmr: 1503,
  vfa: 132.0,
  // shapeScore deliberately unset — not reported on this scan, not invented.
  alstIndex: 5.61,
  leftArmLST: 8.1,
  rightArmLST: 7.9,
  leftLegLST: 15.6,
  rightLegLST: 16.3,
  peerComparison: 'Body fat % higher than 58% of women ages 18–29 (Styku peer band, 58th percentile).',
};

// Direction only — the >=10% relative trigger is computed by hand above and is
// NOT met on either pair, so no weaker-side-leads protocol is prescribed.
const armWeaker = weakerSide(styku.leftArmLST, styku.rightArmLST);  // 'right'
const legWeaker = weakerSide(styku.leftLegLST, styku.rightLegLST);  // 'left'
const armGapPct = (Math.abs(styku.leftArmLST - styku.rightArmLST) / Math.max(styku.leftArmLST, styku.rightArmLST) * 100).toFixed(1);
const legGapPct = (Math.abs(styku.leftLegLST - styku.rightLegLST) / Math.max(styku.leftLegLST, styku.rightLegLST) * 100).toFixed(1);

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Upper Body — Technique\nNew Baselines + NMT Circuit' },
  { day: 'DAY 2', intensity: 70, focus: 'Squat & Single-Leg\nModerate Quality Volume' },
  { day: 'DAY 3', intensity: 80, focus: 'Posterior Chain Peak\nHex Bar DL + Hip Thrust' },
];

const baselines = [
  ['Hex Bar Deadlift', '165 lbs × 8', 'Intake 8/2026', `Est 1RM ${oneRM.hexDL} · Wk1 ${load.hexWk1} → Wk4 peak test ${load.hexWk4} lbs`],
  ['Back Squat', '120 lbs × 8', 'Intake 8/2026', `Est 1RM ${oneRM.squat} · Wk1 ${load.squatWk1} → Wk4 ${load.squatWk4} lbs`],
  ['Hip Thrust', '175 lbs (working)', 'Intake 8/2026', 'Wk1 175 → Wk4 205 lbs · record reps at reassessment'],
  ['DB Romanian Deadlift', '50 lbs / hand', 'Intake 8/2026', '60 lbs / hand (DB ceiling) → barbell RDL next block'],
  ['DB Farmers Carry', '55 lbs / hand', 'Intake 8/2026', '60 lbs / hand → hex bar beyond the DB ceiling'],
  ['Push-Up (Full)', '20 reps (max)', 'Intake 8/2026', '26–28 reps'],
  ['Pull-Up (Full, Unassisted)', '1 rep', 'Intake 8/2026', '2–3 clean reps'],
  ['Assisted Pull-Up — Grip Battery', 'Close 10 · Standard 10 · Wide 7', 'Intake 8/2026', 'Close 12 · Standard 12 · Wide 9'],
  ['Plank Hold (Elbow)', '3:00', 'Intake 8/2026', '3:15 → 3:00 loaded (10 lb plate) by Wk 8'],
  ['Seated Overhead Press', 'Not tested at intake', '—', 'Establish Wk 1 baseline — Day 1'],
  ['Incline Dumbbell Press', 'Not tested at intake', '—', 'Establish Wk 1 baseline — Day 1'],
  ['Lunges (DB)', 'Not tested at intake', '—', 'Establish Wk 1 baseline — Day 2'],
  ['Single-Leg RDL', 'Not tested at intake', '—', 'Establish Wk 1 baseline — Day 2'],
];

const baselineNotes = [
  {
    type: 'green',
    label: 'Baseline Battery — Strong, Broad Intake Numbers',
    body: 'Nine of the ten core ICONS Baseline Testing Protocol movements were tested at intake, which is an unusually complete first battery. The headline numbers: a 165 lb hex bar deadlift for 8 (1.12× bodyweight), a 175 lb hip thrust, a 3:00 plank hold, 20 full push-ups, and — the one that gates the whole pull-up pathway — one full unassisted pull-up alongside a three-grip assisted battery at 10 close / 10 standard / 7 wide. A first unassisted rep is the hardest rep there is to earn; the program below builds directly off it rather than treating pull-ups as aspirational.',
  },
  {
    type: 'teal',
    label: 'Styku Scan Interpretation — Women 20–35 Bracket (8/6/2026)',
    body: `Lean Mass ${styku.leanMass} lbs (${styku.leanMassPct}%) · Fat Mass ${styku.fatMass} lbs · Bone Mass ${styku.boneMass} lbs · BMI ${styku.bmi} (WHO Normal, 18.5–24.9) · BMR ${styku.bmr} cal/day · Body Fat ${styku.bodyFatPct}% (Styku's Mayo-Clinic-based band: "Average," 35–39.9%). ALST Index ${styku.alstIndex} kg/m² reads NOT AT-RISK against EWGSOP2 2018's female low-muscle-mass cutoff (<5.5 kg/m²) — but by 0.11 kg/m², a narrow margin. There is no female "Optimal" tier in EWGSOP2 (the ≥7.0 figure retired from this system on 8/17/2026 was EWGSOP2's MALE cutoff), so no graded label is attached to how far above the line she sits. Read alongside 59.1% lean mass on a 5'9" frame, the practical consequence is a programming priority rather than a clinical flag: progressive resistance and muscle-building are this plan's primary physiological driver, and every block below is real loaded work rather than conditioning filler. On honest measurement limits — Styku is excellent at PRECISION (repeat scans on the same person agree to well under 1 percentage point of body fat) and only moderate at ACCURACY (any single scan's absolute body-fat reading can differ from a clinical DXA by roughly 7–11 points), and ALM/ALMI was not reported or validated at all in the device's own peer-reviewed validation study. Read every absolute number here as a personal trend baseline, not a diagnosis — the scan's real value is what the next one shows against this one.`,
  },
  {
    type: 'watch',
    label: 'Visceral Fat & Waist Circumference — Read Together, Trend Not Verdict',
    body: `VFA ${styku.vfa} cm². Styku's own dashboard tags this reading "High Risk"; that label is deliberately not reproduced here. No consensus body endorses a single VFA cutoff — published CT-derived thresholds span roughly 82–140 cm², female elevated-risk thresholds run higher than the older tables assumed (≈106 cm² and up, Kelley et al., Diabetes Care 26:1413), and this scanner's own VFA output was validated against DXA in KILOGRAMS, never against CT in cm². So the 132.0 figure is recorded as a personal trend baseline to track at rescan, not as a risk classification. What IS clinically endorsed for routine use is waist circumference, and hers reads 36.0 in (91.4 cm) at the abdomen / 34.8 in (88.4 cm) at the narrowest point — above the IAS/ICCR female ≥80 cm elevated threshold that applies at a normal BMI (Ross et al., Nat Rev Endocrinol 16:177–189). Stated plainly and without alarm: this is a real finding, it is the honest version of what the VFA number is gesturing at, and the training-side response is exactly what this program already does — progressive resistance work three days a week plus hitting the protein target. Track waist circumference at every rescan alongside VFA; it is the more reliable of the two by a wide margin (Styku circumference reliability ICC ≈ 0.99).`,
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Direction Real, Magnitude Below Threshold, Protocol NOT Applied',
    body: `Left Arm LST ${styku.leftArmLST} lbs vs Right Arm ${styku.rightArmLST} lbs (0.2 lb gap, ~${armGapPct}% relative — ${armWeaker} lower). Left Leg LST ${styku.leftLegLST} lbs vs Right Leg ${styku.rightLegLST} lbs (0.7 lb gap, ~${legGapPct}% relative — ${legWeaker} lower). Both sit well below the corrected ≥10% RELATIVE Asymmetry Protocol trigger, and both sit inside the scanner's own published segmental error for female limb lean tissue — so NO weaker-side-leads protocol is prescribed anywhere in this program, and no unilateral exercise below carries a lead-side instruction. Her circumference data, which is the device's most reliable output, agrees on direction (bicep left 11.5 in / right 10.7 in; upper thigh left 21.8 in / right 22.0 in), so the direction is real even though the magnitude is not actionable. Monitor at the 8–12 week rescan and re-check both percentages then; a functional test (single-leg press, single-leg jump) is the better primary trigger if a gap ever does open up, since the evidence-linked thresholds come from strength and power asymmetry studies rather than from imaging-derived lean mass.`,
  },
  {
    type: 'purple',
    label: 'Age Bracket Framework — What Was Applied, and What Was Not',
    body: "Applied: CLAUDE.md's women's Age Bracket Programming Framework, \"20–35 — Foundation & Peak Bone Mass.\" Protein at the 1.6 g/kg active-women baseline (see the nutrition targets below — engine-computed, not hand-set). Creatine INDICATED, not \"strongly indicated\" — that tier is driven by age 40+, ALST At-Risk status, or postmenopausal status, none of which applies at 24. Heavy compound lifting treated as peak-bone-mass work in its own right, which is what this bracket is for — bone mineral density is still being banked at 24 and the barbell is the tool that banks it. The lower-limb neuromuscular injury-prevention circuit is the bracket's highest-yield preventive component and is built in as a standing, dosed program element (Block A on Days 1 and 2, carryover on Day 3) rather than as a few minutes tacked on before squats. NOT applied, deliberately: the LIFTMOR bone-loading protocol (postmenopausal, T-score < −1.0 — neither applies), the pelvic floor auto-trigger (`isPostmenopausal` is false and no override is used; that field exists for the 45–55 ambiguous-status case), any protein or creatine escalation tier (all are 40+/ALST/postmenopausal-driven), and the ICONS Index Full-Spectrum Progression Standard, which is scoped to women 40–55 and is not silently extended to a 24-year-old. All ten core movements happen to be covered below regardless — that follows from her own intake battery, not from applying an out-of-bracket mandate.",
  },
  {
    type: 'gold',
    label: 'Menstrual Cycle — No Phase-Based Programming',
    body: 'Train hard year-round. No training decision in this program is keyed to cycle phase, and none should be added: the highest-quality evidence (Colenso-Semple, Phillips et al. 2023 umbrella review; independently corroborated by the 2025 UEFA consensus on menstrual-cycle tracking) finds no reliable influence of cycle phase on strength adaptation, and states that building resistance-training prescriptions around cyclical hormonal changes is not an evidence-based approach. Autoregulate around individual symptoms logged over at least three consecutive cycles, using RIR and how the session actually feels — never a calendar, and never a tracking app\'s predicted phase, which the 2025 scoping-review evidence specifically flags as inaccurate. If periods become absent, irregular, or newly lost, that is a medical referral, not a programming adjustment.',
  },
  {
    type: 'gold',
    label: 'BMR Is Not a Calorie Target',
    body: 'Her scan reports BMR 1503 cal/day, and that figure appears in the scan block above — so this needs saying explicitly. BMR is resting energy: by definition it sits BELOW maintenance, because maintenance equals BMR multiplied by an activity factor. Eating at 1503 would be eating in a deficit, which directly undercuts the muscle-building priority this program is built around. Total intake needs to sit above maintenance, not at BMR, and a g/kg protein target hit inside an accidental energy deficit undercuts itself — protein and total energy are complementary levers, not substitutes. She is not underweight (BMI 21.7) and has no flat-trend rescan history yet, so no specific surplus figure is prescribed here; the point is simply that the BMR number on the scan is not the number to eat.',
  },
  {
    type: 'green',
    label: 'RIR Calibration — Run This Before Trusting Load Progressions',
    body: 'Standing protocol for every new client and trainer, and it is genuinely required before the load progressions in this program can be steered by feel. On one submaximal set per new exercise, call your own RIR out loud, then take that set to true failure and record the discrepancy. Repeat until absolute error is within 1 rep on two consecutive sessions before trusting RIR calls for load decisions. RIR is accurate to roughly ±1 rep near failure in trained lifters and degrades the further a set sits from failure — which is exactly why this program collapses everything above 2 RIR into a single "technique/submaximal" band rather than pretending 3 RIR and 5 RIR are meaningfully different targets. Primary lifts run at 2 RIR; the hypertrophy-priority accessory sets are the only work taken to 1 RIR.',
  },
  {
    type: 'teal',
    label: 'Stretch Therapy — Her Own Discipline, Used in Her Own Program',
    body: "Niko is Brace Life's certified in-house Stretch Therapist, and PNF (Proprioceptive Neuromuscular Facilitation — contract-relax and hold-relax) is her named technique. The cool-downs below are deliberately written as PNF-appropriate targets rather than as generic static holds, so her own professional work has somewhere real to live inside her own training week. Worth carrying into how she coaches it as well: the chronic-effects evidence is the strong half — stretch-training programs run for two weeks or longer using static or PNF stretching produce greater long-term ROM gains than dynamic or ballistic work (Konrad et al., J Sport Health Sci 2024;13(2):186–194) — while the acute effect of any single session is small and comparable across modalities. The traditional autogenic/reciprocal-inhibition explanation is more contested than it is usually taught; the contemporary reading leans toward PNF working largely by shifting stretch tolerance.",
  },
  {
    type: 'watch',
    label: 'Intake Gaps to Close at the 4-Week Reassessment',
    body: 'Three items are recorded as given rather than resolved by assumption, and each should be closed at the first reassessment. (1) Hip Thrust arrived as 175 lbs with no rep count — it is therefore NOT run through the Epley formula, and is carried as a documented working load with a conservative progression rather than a derived 1RM. Record reps at the next test. (2) Farmers Carry 55 lbs and DB RDL 50 lbs are both read as PER HAND, the standard for those movements and consistent with a 165 lb hex bar deadlift; confirm at the next session. (3) Farmers Carry arrived with no distance — log yards per set going forward so the carry has a progressable second variable once the 60 lb/hand dumbbell ceiling is reached.',
  },
  {
    type: 'gold',
    label: 'Equipment — Every Exercise and Option Below Is In-Studio',
    body: 'All programming and every alternate in the compound-slot option menus comes from the confirmed Brace Life inventory: squat rack and Olympic bar, hex/trap bar, dumbbells to 60 lbs per hand, kettlebells to 25 lbs, incline-capable bench, leg extension, hamstring curl, hyperextension, assisted pull-up machine, the Kieser line (which serves as the studio\'s cable machine — there is no standalone cable stack), landmine, Total Gym, sled, plyo boxes, bands, foam rollers, med balls, and cardio machines. Two live ceilings matter for her specifically: her 50 lb/hand DB RDL and 55 lb/hand farmers carry both progress into the 60 lb/hand dumbbell ceiling inside this 8-week window — the RDL moves to a barbell and the carry to the hex bar at that point, rather than stalling.',
  },
];

// ─────────────────────────────────────────────────────────────────────
// DAY 1 — 60% · UPPER BODY TECHNIQUE, NEW BASELINES, FULL NMT CIRCUIT
// ─────────────────────────────────────────────────────────────────────
const day1 = {
  intensity: 60,
  title: 'DAY 1 — UPPER BODY: TECHNIQUE & NEW BASELINES',
  subtitle: 'Overhead Press & Incline Press Established · Pull-Up Pathway Built Off One Real Rep',
  descriptor: 'CONTROL PRECEDES POWER · NEW BASELINES: OHP & INCLINE PRESS · FULL NEUROMUSCULAR CIRCUIT',
  intensityLabel: '60% Day',
  intensityPara: 'Technique day — form over load, no PRs. This is the right session to establish the two untested core movements (Seated Overhead Press and Incline Dumbbell Press), because a technique-first day is where a first working number should be found rather than chased. It also carries the week\'s longest neuromuscular circuit. Effort is tiered: the corrective block stays comfortably submaximal in the 3+ RIR technique band, the primary press works at 2 RIR, and the hypertrophy-priority accessory pressing is the only work taken to 1 rep in reserve.',
  warmUp: '5 min bike (easy), band pull-apart ×15, scapular wall slide ×10, arm circles ×10/direction, cat-cow ×8, 90/90 hip switch ×8/side, deep squat hold 3×20s.',
  blocks: [
    {
      letter: 'A',
      title: 'CORRECTIVE — LOWER-LIMB NEUROMUSCULAR CIRCUIT (KNEE / VALGUS EMPHASIS)',
      color: 'red',
      introLabel: 'Why',
      intro: 'This is a standing program component with its own weekly time allocation — roughly 20 minutes here and again on Day 2, with a short carryover on Day 3 — not a few minutes tacked on before the lifting. It is deliberately UNIVERSAL rather than gated behind a visual valgus screen: prospective work in elite female athletes found that visually assessing single-leg squat or drop-jump mechanics cannot predict who will sustain a future non-contact knee injury, while the strength-training intervention itself reduces sports injuries at the population level (rate ratio 0.338, high-certainty; ~75% reduction in anterior knee pain — Lauersen et al., BJSM 2018). Screening it out would withhold an effective intervention from exactly the people the screen misses. Adherence is the dominant moderator and is tracked like a load: the target is completing at least 76% of prescribed circuit sessions, dose-responsive in the meta-analysed data. Frame it as general lower-limb injury and knee-pain prevention, which is where the strongest evidence sits — not as knee-injury risk screening, which these tools cannot do.',
      exercises: [
        { name: 'Lateral Band Walk', sets: '3', reps: '12/direction', load: 'mod band above knees', tempo: 'controlled', rest: '30s', cue: 'Band above the knees, feet forward, push out — no torso sway.' },
        { name: 'Spanish Squat (Band-Anchored)', sets: '3', reps: '10', load: 'heavy band, knee level', tempo: '3-2-2', rest: '45s', cue: 'Band behind the knees, shins vertical, sit straight down.' },
        { name: 'Terminal Knee Extension (Band)', sets: '2', reps: '15/side', load: 'light-mod band', tempo: '2-1-2', rest: '30s', cue: 'Lock the last few degrees, quad squeeze at the top.' },
        { name: 'Single-Leg Step-Down', sets: '3', reps: '8/side', load: 'bodyweight, 6-8 in box', tempo: '3-1-2', rest: '45s', cue: 'Knee tracks over the second toe, tap the heel, no collapse.' },
        { name: 'Drop Landing — Mechanics Focus', sets: '3', reps: '5', load: 'bodyweight, 12 in box', tempo: 'land & stick', rest: '45s', cue: 'Step off, land soft and wide, stick it for two counts.' },
        { name: 'Glute Bridge (Bilateral)', sets: '2', reps: '15', load: 'bodyweight', tempo: '2-2-2', rest: '30s', cue: 'Ribs down, squeeze at the top, no lumbar arch.' },
      ],
    },
    {
      letter: 'B',
      title: 'PRIMARY COMPOUND — SEATED OVERHEAD PRESS (NEW BASELINE)',
      introLabel: 'Load Target',
      intro: 'One of the ten core ICONS Index movements and untested at intake, so there is no 1RM to build a percentage table from — Week 1 establishes the number. Start conservatively (dumbbells in the 15–20 lb per hand range is the usual honest starting point for a lifter at her pull-up and press-up level), find a load where the last two reps are genuinely hard at 2 RIR, and log it: that number becomes the anchor every later week progresses from and the 4-week reassessment retests. Expert options for whoever runs the session — same pattern, rotate by the day: seated dumbbell press (the tracked default), standing barbell overhead press from the rack once the seated version is clean, half-kneeling single-arm dumbbell press when core-to-shoulder connection is the emphasis, or a landmine press on any day the fully vertical bar path does not look clean. The seated dumbbell press stays the lift we track and retest; the others are session substitutions, not a fork in the progression.',
      exercises: [
        { name: 'Seated Dumbbell Overhead Press', sets: '4', reps: '8', load: 'Wk1: establish (self-select) → Wk4: +10–15%', tempo: '2-0-2', rest: '90s', insight: 'Trainer Insight: a new baseline is a number you FIND, not a number you assume — the first honest Week 1 load is worth more to the next four weeks than an ambitious one.', cue: 'Ribs stacked over hips, press to full lockout, control down.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'C',
      title: 'ACCESSORY — INCLINE DUMBBELL PRESS (NEW BASELINE)',
      color: 'green',
      introLabel: 'Load Target',
      intro: 'The second untested core movement, and the hypertrophy-priority work behind today\'s pressing. Establish the Week 1 number the same way as the overhead press. This is the block taken hardest today — 1 rep in reserve, the only 1 RIR work in the session. Pressing across two different angles in one day (vertical overhead, then incline) is the "built from all angles" requirement of the Block Method doing its job: same muscle group, different line of pull, rather than the same angle twice.',
      exercises: [
        { name: 'Incline Dumbbell Press', sets: '4', reps: '8-10', load: 'Wk1: establish (self-select) → Wk4: +10–15%', tempo: '3-1-1', rest: '75s', cue: 'Bench ~30–45°, elbows at 45°, full controlled range.', rirNote: '1 RIR' },
      ],
    },
    // SLOT 4 — JASON'S EXERCISE — OMITTED. No Jason Bethea SOAP note exists on
    // file for Niko (studio staff, not a coordinated-care PT client). Per the
    // Block Method rollout convention, an absent slot 4 is omitted honestly
    // rather than filled with generic filler. Same on Days 2 and 3.
    {
      letter: 'D',
      title: 'SECONDARY COMPOUND — PULL STRENGTH & PULL-UP PATHWAY',
      color: 'purple',
      introLabel: 'Load Target',
      intro: 'The day\'s second compound pattern, rotating away from the pressing above. Her one full unassisted pull-up is the real asset here and the whole pathway is built off it: the single unassisted rep leads the block while she is freshest, then the assisted three-grip battery does the volume. Close-grip → standard-grip → wide-grip is run as one deliberate grip-progression sequence, which is explicitly exempt from the Antagonist Rotation Rule — it is one movement pattern progressing through grip width as a skill and strength battery, not three separate heavy compound lifts stacked for convenience. Do not resequence it. Expert options for the horizontal pull that follows: Kieser row (the tracked default, and the studio\'s cable line), chest-supported dumbbell row with the torso fully supported for a stricter pattern, single-arm dumbbell row on a bench, or a landmine row. No lead-side instruction on any of them — her arm asymmetry does not clear the ≥10% trigger.',
      exercises: [
        { name: 'Pull-Up (Full, Unassisted)', sets: '3', reps: '1-2', load: 'bodyweight', tempo: 'controlled', rest: '120s', insight: 'Trainer Insight: singles first, while fresh. Volume comes from the assisted battery below — the unassisted rep is a strength expression, not a conditioning set.', cue: 'Full hang to chin over bar, no kip, lower under control.', rirNote: 'Quality-governed — no RIR target' },
        { name: 'Assisted Pull-Up — Close / Standard / Wide Battery', sets: '1 each', reps: '10 / 10 / 7', load: 'assisted machine, reduce assist weekly', tempo: 'controlled', rest: '90s', cue: 'Run all three grips in order. Log clean reps per grip.', rirNote: '2 RIR' },
        { name: 'Kieser Row', sets: '3', reps: '10-12', load: 'Wk1: establish on machine → Wk4: build weekly', tempo: '2-1-2', rest: '75s', cue: 'Chest tall, pull to the ribs, no momentum, full range.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'E',
      title: 'PRESSING VOLUME & PUSH-UP BASELINE',
      color: 'green',
      introLabel: 'Why',
      intro: 'Placed after the pull block on purpose, not as an afterthought — running it here keeps the day at a maximum of two consecutive pressing movements instead of three, which is the Antagonist Rotation Rule applied across block boundaries rather than inside one block. It also brings weekly chest volume to roughly 10 working sets, the ACSM 2026 hypertrophy target. Push-Up is a tracked core ICONS Index movement at 20 reps, so it is programmed as real sets rather than tested once and forgotten.',
      exercises: [
        { name: 'Kieser Chest Press', sets: '3', reps: '10-12', load: 'Wk1: establish on machine → Wk4: build weekly', tempo: '2-1-2', rest: '60s', cue: 'Full range, shoulder blades set back and down.', rirNote: '1 RIR' },
        { name: 'Push-Up (Full)', sets: '3', reps: '10-14', load: 'bodyweight', tempo: '3-1-1', rest: '60s', cue: 'Baseline 20 max. Body in one line, chest to fist height.', rirNote: '1 RIR' },
      ],
    },
    {
      letter: 'F',
      title: 'THIRD COMPOUND — INTEGRATION — SUITCASE CARRY',
      color: 'gold',
      introLabel: 'Why',
      intro: 'The session\'s closer: one movement that puts the whole day to work at once — the scapular position built in the pull block, the tall stacked ribcage from the pressing, and grip, all held under gait against a load trying to bend her sideways. Distance and movement quality govern this work, not an RIR target; add load only when every yard stays tall and level. Expert options, same pattern: suitcase carry with one dumbbell (the default), bilateral farmers carry with both hands loaded, or a goblet carry with a single dumbbell at the chest for a lighter, more upright-posture-biased version. Alternate hands set to set — there is no weaker-side lead here, since her arm gap does not clear the asymmetry trigger.',
      exercises: [
        { name: 'Suitcase Carry (Alternating Hands)', sets: '3', reps: '25-30 yd/side', load: 'Wk1: 35 → Wk4: 45 lbs', tempo: 'controlled', rest: '60s', cue: 'Shoulders set, ribs stacked, resist the lean. Log the yards.', rirNote: 'Distance & quality governed — no RIR target' },
      ],
    },
  ],
  coolDown: 'PNF-appropriate targets, contract-relax where a partner is available: pec/doorway 2×20s per side, lat and posterior shoulder 2×20s per side, thoracic extension over a foam roller 45s, child\'s pose 45s.',
  iconsNote: 'Two new baselines get established today, and how they get established matters more than what they come out at — the honest Week 1 number is the one the next three weeks actually build from. The pull-up work is the centrepiece of this day: one clean unassisted rep at bodyweight is a real strength marker, and the assisted battery exists to feed it, not to replace it. Run the grip battery in its written order, close to wide. Keep the corrective circuit in the session even on a rushed day — completion rate is what makes it work, and the target is at least 76% of prescribed sessions.',
};

// ─────────────────────────────────────────────────────────────────────
// DAY 2 — 70% · SQUAT & SINGLE-LEG, MODERATE QUALITY VOLUME
// ─────────────────────────────────────────────────────────────────────
const day2 = {
  intensity: 70,
  title: 'DAY 2 — LOWER BODY: SQUAT & SINGLE-LEG FOUNDATION',
  subtitle: 'Back Squat Quality Volume · Lunge & Single-Leg RDL Established as New Baselines',
  descriptor: 'MODERATE VOLUME DAY · HAMSTRING & ADDUCTOR PREVENTION CIRCUIT · TWO NEW BASELINES',
  intensityLabel: '70% Day',
  intensityPara: 'Moderate day — building real baseline volume without peak fatigue. Her squat is the lift with the most room in it: 120 lbs × 8 is 0.82× bodyweight against a hex bar deadlift at 1.12× bodyweight, so the squat gets quality volume in the 8–10 rep range rather than being held light, climbing from 105 lbs in Week 1 to about 125 by Week 4. That is a deliberate choice, not a soft one — women are systematically under-loaded in most programs, and moderate intensity means moderate load at honest reps, never easy sets.',
  warmUp: '5 min bike, leg swings ×10/direction/side, 90/90 hip switch ×8/side, bodyweight squat ×15, glute bridge ×15, walking knee hug and quad pull ×8/side.',
  blocks: [
    {
      letter: 'A',
      title: 'CORRECTIVE — HAMSTRING & ADDUCTOR PREVENTION CIRCUIT',
      color: 'red',
      introLabel: 'Why',
      intro: 'The second half of the week\'s neuromuscular allocation, targeting two muscle groups with distinct mechanisms and distinct evidence. Nordic hamstring programs roughly halve hamstring-injury rates across a systematic review of 8,459 athletes (BJSM 2019;53:1362) — among the strongest single-exercise effects in the whole injury-prevention literature. The Copenhagen plank is a separate addition, not a substitute: it targets the adductor longus at roughly 108% MVIC, and the cluster-randomised trial behind it (Harøy et al., BJSM 2019;53:150) found a 41% lower risk of reporting groin problems. Run the Copenhagen at one set per side, selecting the progression level by pain response — start at level 3, regress a level if groin pain goes above 3/10. That is the source trial\'s own pain-guided design, and it is the progression level that gets regressed, not just the hold time.',
      exercises: [
        { name: 'Nordic Hamstring Curl (Eccentric)', sets: '3', reps: '5', load: 'bodyweight, partner or anchored', tempo: 'slow eccentric', rest: '60s', cue: 'Resist as far down as control holds, catch with the hands.' },
        { name: 'Copenhagen Plank', sets: '1/side', reps: '20-30s', load: 'bodyweight, bench', tempo: 'hold', rest: '45s', flag: 'Regress a progression level if groin pain exceeds 3/10', cue: 'Top leg on the bench, hips lifted and level, adductor holds it.' },
        { name: 'Lateral Band Walk', sets: '2', reps: '12/direction', load: 'mod band above knees', tempo: 'controlled', rest: '30s', cue: 'Band above the knees, push out, torso quiet.' },
        { name: 'Single-Leg Glute Bridge', sets: '2', reps: '12/side', load: 'bodyweight', tempo: '2-2-2', rest: '30s', cue: 'Hips level throughout, drive through the heel.' },
        { name: 'Hip Airplane (Supported)', sets: '2', reps: '6/side', load: 'bodyweight', tempo: 'slow', rest: '30s', cue: 'Hinge on one leg, rotate the pelvis open and closed slowly.' },
      ],
    },
    {
      letter: 'B',
      title: 'PRIMARY COMPOUND — BACK SQUAT',
      introLabel: 'Load Target',
      intro: `Tested 120 lbs × 8 at intake — estimated 1RM ${oneRM.squat} lbs by the Epley formula. Week 1 works at ${load.squatWk1} lbs, climbing to about ${load.squatWk4} by Week 4, with reps held at 8–10 so the moderate percentage still buys real hypertrophy volume rather than easy sets. Depth follows control, never the other way around: full range where alignment holds, regress the range before the posture breaks. Expert options, all squat-pattern: back squat from the rack (the tracked default and the lift the 4-week reassessment retests), goblet squat with a dumbbell for a day when the upright-torso cue needs reinforcing, box squat to a plyo box for consistent depth under fatigue, or a split-stance squat if a session calls for a unilateral emphasis. Whichever runs, the back squat number is what gets tracked.`,
      exercises: [
        { name: 'Back Squat', sets: '4', reps: '8-10', load: `Wk1: ${load.squatWk1} → Wk4: ${load.squatWk4} lbs`, tempo: '3-1-2', rest: '120s', insight: 'Trainer Insight: her squat is the lift with the most headroom relative to her deadlift — this block is where the ICONS Index number moves most over four weeks.', cue: 'Brace, sit between the hips, drive the floor apart on the way up.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'C',
      title: 'ACCESSORY — DUMBBELL WALKING LUNGE (NEW BASELINE)',
      color: 'green',
      introLabel: 'Load Target',
      intro: 'The tenth core ICONS Index movement and the only one her intake battery did not touch — established here as a new baseline rather than left silent. It is also the day\'s hypertrophy-priority work, taken to 1 rep in reserve. Start in the 20–25 lb per hand range, find the load where the last two steps per leg are genuinely hard with the torso still upright, and log it.',
      exercises: [
        { name: 'Dumbbell Walking Lunge', sets: '3', reps: '10/side', load: 'Wk1: establish (self-select) → Wk4: +10–15%', tempo: '2-1-2', rest: '75s', cue: 'Long step, torso tall, front knee tracks over the second toe.', rirNote: '1 RIR' },
      ],
    },
    // SLOT 4 — JASON'S EXERCISE — OMITTED (no SOAP note on file). See Day 1.
    {
      letter: 'D',
      title: 'SECONDARY COMPOUND — HINGE (SINGLE-LEG RDL + DUMBBELL RDL)',
      color: 'purple',
      introLabel: 'Load Target',
      intro: 'The day\'s second compound pattern, rotating from the knee-dominant work above into the hip hinge. Single-Leg RDL is the ninth core movement and untested at intake — established here, light, with balance and hip control governing the load rather than ambition. The bilateral dumbbell RDL then carries her real tested number (50 lbs per hand) and progresses toward the studio\'s 60 lb per hand dumbbell ceiling, which she reaches inside this eight-week window: at that point the movement moves to a barbell RDL rather than stalling. Expert options, all hinge-pattern: dumbbell RDL (the tracked default), barbell RDL once past the dumbbell ceiling, single-leg RDL for a unilateral session, or a hyperextension/back extension to tolerance when a lower-spinal-load hinge is the better call that day. No lead-side instruction — her leg gap does not clear the ≥10% asymmetry trigger.',
      exercises: [
        { name: 'Single-Leg Romanian Deadlift', sets: '3', reps: '8/side', load: 'Wk1: establish (self-select, ~20–25 lbs) → Wk4: +10–15%', tempo: '3-1-2', rest: '75s', cue: 'Hips square, spine long, reach the free heel back behind you.', rirNote: '2 RIR' },
        { name: 'Dumbbell Romanian Deadlift', sets: '3', reps: '8-10', load: 'Wk1: 50 → Wk4: 60 lbs/hand', tempo: '3-1-2', rest: '90s', insight: 'Trainer Insight: Wk4 lands exactly on the studio\'s 60 lb/hand dumbbell ceiling — the next block moves this to a barbell RDL rather than capping the progression.', cue: 'Push the hips back, bar path close, hamstrings load, chest proud.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'E',
      title: 'THIRD COMPOUND — INTEGRATION — DUMBBELL SQUAT-TO-PRESS COMPLEX',
      color: 'gold',
      introLabel: 'Why',
      intro: 'The session\'s closer, pulling the day\'s squat pattern into one integrated, full-body expression — legs drive, the brace transfers it, the shoulders finish it, all in one rep. Deliberately lighter than either the squat or the press it borrows from; the point is a clean chain from floor to lockout, not another heavy set. Expert options, same integration family: dumbbell squat-to-press (the default), a kettlebell goblet squat-to-press within the 25 lb kettlebell ceiling, a hex bar deadlift-to-carry complex on a day that calls for a hinge bias instead, or a landmine squat-to-press when the fully vertical press path is not the priority.',
      exercises: [
        { name: 'Dumbbell Squat-to-Press Complex', sets: '3', reps: '8', load: 'Wk1: 20 → Wk4: 30 lbs/hand', tempo: 'controlled, no pause', rest: '90s', cue: 'One continuous rep — squat, stand, press. Never a press with a squat attached.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'F',
      title: 'CORE & METABOLIC FINISHER',
      color: 'green',
      introLabel: 'Why',
      intro: 'Plank is a tracked core ICONS Index movement — baseline 3:00, which is a strong hold — so it is programmed as real work rather than tested once and shelved. Progression runs through added load, not longer and longer holds: past about three minutes, more time buys less than a plate does. The bike finisher is kept short so conditioning volume never competes with recovery capacity for the resistance work driving this plan.',
      exercises: [
        { name: 'Plank Hold (Elbow)', sets: '3', reps: '60-75s', load: 'Wk1: bodyweight → Wk4: 10 lb plate', tempo: 'hold', rest: '60s', cue: 'Baseline 3:00. Ribs down, glutes on, no sagging or piking.' },
        { name: 'Bike Intervals', sets: '5', reps: '20s on / 40s off', load: 'moderate', tempo: 'controlled', rest: '40s', cue: 'Brisk and sustainable — not a max-effort test.' },
      ],
    },
  ],
  coolDown: 'PNF-appropriate targets, contract-relax where a partner is available: hamstring 2×20s per side, hip flexor/couch stretch 2×20s per side, adductor 2×20s per side, figure-4 glute 20s per side.',
  iconsNote: 'Two more core movements get their first baseline today, which means nine of ten are now tracked and the tenth is on Day 3. The squat is where the biggest four-week change is available — 8 to 10 reps at 2 RIR, load climbing weekly, and depth that follows control rather than chasing it. Keep the Copenhagen plank in even on a short day: one set per side, level chosen by pain response, and it is over in under five minutes. The dumbbell RDL hits the studio\'s 60 lb per hand ceiling by Week 4 — plan the move to a barbell now rather than discovering it mid-session.',
};

// ─────────────────────────────────────────────────────────────────────
// DAY 3 — 80% · POSTERIOR CHAIN PEAK
// ─────────────────────────────────────────────────────────────────────
const day3 = {
  intensity: 80,
  title: 'DAY 3 — POSTERIOR CHAIN: PEAK STRENGTH',
  subtitle: 'Hex Bar Deadlift · Barbell Hip Thrust · Loaded Carry — The Week\'s Heaviest Session',
  descriptor: 'PRIMARY STRENGTH DAY · LAST 1–2 REPS HARD BUT ACHIEVABLE · PEAK BONE MASS WORK',
  intensityLabel: '80% Day',
  intensityPara: `Primary strength day — the last one to two reps of a working set should be hard but achievable, never a grind to failure. Her two biggest numbers live here: the hex bar deadlift at ${load.hexWk1} lbs in Week 1 (80% of an estimated ${oneRM.hexDL} lb 1RM) building to the Week 4 peak test at ${load.hexWk4}, and the 175 lb hip thrust. Worth naming for a 24-year-old: heavy compound loading at this age is peak-bone-mass work in its own right — bone mineral density is still being banked in this bracket, and the barbell is the tool that banks it. No 90% Red day appears anywhere in this program; near-maximal work needs a genuine testing or competition reason, and the Week 4 peak test is where that belongs.`,
  warmUp: '5 min row (easy), hip hinge pattern drill with dowel ×10, glute bridge ×15, band pull-apart ×15, bodyweight good morning ×12, two ramp-up sets on the hex bar before the first working set.',
  blocks: [
    {
      letter: 'A',
      title: 'CORRECTIVE — NEUROMUSCULAR CARRYOVER',
      color: 'red',
      introLabel: 'Why',
      intro: 'A short carryover, roughly eight minutes — the week\'s full 20–30 minute neuromuscular dose is already delivered across Days 1 and 2, so this session runs the knee-tracking essentials as priming ahead of heavy hinging rather than repeating the whole circuit. Keeping something here on every training day is what holds the ≥76% session-completion target realistic across a three-day week.',
      exercises: [
        { name: 'Lateral Band Walk', sets: '2', reps: '12/direction', load: 'mod band above knees', tempo: 'controlled', rest: '30s', cue: 'Band above the knees, push out, torso quiet.' },
        { name: 'Terminal Knee Extension (Band)', sets: '2', reps: '15/side', load: 'light-mod band', tempo: '2-1-2', rest: '30s', cue: 'Lock the last few degrees, quad squeeze at the top.' },
        { name: 'Single-Leg Step-Down', sets: '2', reps: '8/side', load: 'bodyweight, 6-8 in box', tempo: '3-1-2', rest: '45s', cue: 'Knee over the second toe, tap the heel, no collapse.' },
      ],
    },
    {
      letter: 'B',
      title: 'PRIMARY COMPOUND — HEX BAR DEADLIFT',
      introLabel: 'Load Target',
      intro: `Her strongest tested lift — 165 lbs × 8 at intake, estimated 1RM ${oneRM.hexDL} lbs. Week 1 works at ${load.hexWk1} lbs (80% of estimated 1RM) for 6 reps at 2 RIR, progressing to the Week 4 peak test at ${load.hexWk4} lbs (92%). This is the anchor lift of the whole program and the one the 4-week reassessment retests. Expert options, all hinge-pattern: hex/trap bar deadlift (the tracked default and the ICONS Index-tested movement), conventional barbell deadlift when a more hip-dominant bar path is wanted, sumo deadlift for a day the hips want a wider stance, or block/rack pulls to load the top half when the floor position is not clean. Options are session substitutions — the hex bar number is what gets tracked and retested.`,
      exercises: [
        { name: 'Hex Bar Deadlift', sets: '4', reps: '6', load: `Wk1: ${load.hexWk1} → Wk4: ${load.hexWk4} lbs (peak test)`, tempo: '2-1-2', rest: '150s', insight: 'Trainer Insight: 1.12× bodyweight at intake for 8 reps is a genuinely strong starting point — this progression is built to be earned week by week, not rushed to the Week 4 number.', cue: 'Push the floor away, ribs down, lock hips and knees together.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'C',
      title: 'ACCESSORY — HAMSTRING ISOLATION & UPPER-BACK VOLUME',
      color: 'green',
      introLabel: 'Why',
      intro: 'Two accessories chosen to support the deadlift from both ends. The seated hamstring curl trains knee flexion, which the hinge pattern never loads directly — a genuinely different angle on the same muscle group, which is the Block Method\'s "built from all angles" requirement rather than a second hinge. The Kieser row addresses the upper back, which is what usually gives out before the legs do on a heavy pull, and it brings weekly back volume to about 10 working sets. Both are taken to 1 rep in reserve.',
      exercises: [
        { name: 'Seated Hamstring Curl', sets: '3', reps: '10-12', load: 'Wk1: establish on machine → Wk4: build weekly', tempo: '2-2-2', rest: '60s', cue: 'Slow on the way back, full range, no hip lift off the pad.', rirNote: '1 RIR' },
        { name: 'Kieser Seated Row', sets: '3', reps: '10-12', load: 'Wk1: establish on machine → Wk4: build weekly', tempo: '2-1-2', rest: '60s', cue: 'Chest tall, pull to the ribs, shoulder blades finish the rep.', rirNote: '1 RIR' },
      ],
    },
    // SLOT 4 — JASON'S EXERCISE — OMITTED (no SOAP note on file). See Day 1.
    {
      letter: 'D',
      title: 'SECONDARY COMPOUND — BARBELL HIP THRUST',
      introLabel: 'Load Target',
      intro: 'Her second-biggest tested number at 175 lbs, and a core ICONS Index movement. It arrived without a rep count, so it is deliberately NOT run through the Epley formula — inventing a 1RM from a load with no reps behind it would be fabrication. It is carried as a documented working load and progressed conservatively from there: 175 in Week 1 to about 205 by Week 4, at 8–10 reps. Record reps at the 4-week reassessment so the next block can be built off a real estimate. Expert options, all hip-extension pattern: barbell hip thrust with the shoulders on the bench (the tracked default), single-leg hip thrust for a unilateral session, glute bridge from the floor when bench setup time is short, or a Kieser pull-through for a standing, cable-line version of the same hip extension.',
      exercises: [
        { name: 'Barbell Hip Thrust', sets: '4', reps: '8-10', load: 'Wk1: 175 → Wk4: 205 lbs', tempo: '2-2-2', rest: '120s', flag: 'Reps not recorded at intake — log them at the 4-week reassessment', cue: 'Shoulders on the bench, ribs down, full lockout, chin tucked.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'E',
      title: 'THIRD COMPOUND — INTEGRATION — DUMBBELL FARMERS CARRY',
      color: 'gold',
      introLabel: 'Why',
      intro: 'The session\'s closer and the tenth core ICONS Index movement, tested at 55 lbs per hand. It pulls the whole day together into one loaded expression — the same braced trunk that held position under the deadlift and the hip thrust, now holding it under gait with the grip as the limiter. Distance and quality govern this, not RIR. Note the ceiling: Week 4 lands at 60 lbs per hand, which is the studio\'s dumbbell maximum, so the progression moves to the hex bar beyond that rather than stopping. Expert options, all carry-pattern: dumbbell farmers carry (the tracked default), hex bar carry once past the dumbbell ceiling, suitcase carry for an anti-lateral-flexion emphasis, or a front-rack carry for an upright-posture bias.',
      exercises: [
        { name: 'Dumbbell Farmers Carry', sets: '3', reps: '30-40 yd', load: 'Wk1: 55 → Wk4: 60 lbs/hand', tempo: 'controlled', rest: '90s', insight: 'Trainer Insight: Wk4 hits the 60 lb/hand DB ceiling — the hex bar is the vehicle past it, which is also why logging yards matters now.', cue: 'Tall and level, shoulders packed, walk it — do not race it.', rirNote: 'Distance & quality governed — no RIR target' },
      ],
    },
    {
      letter: 'F',
      title: 'METABOLIC FINISHER',
      introLabel: 'Why',
      intro: 'Short and low-impact, closing the week. Kept brief on purpose: after the heaviest session of the week, conditioning should not compete with the recovery capacity that the resistance work depends on.',
      exercises: [
        { name: 'Sled Push', sets: '4', reps: '20 yd', load: 'moderate — brisk, not maximal', tempo: 'continuous', rest: '60s', cue: 'Low body angle, short quick steps, drive the whole way.' },
      ],
    },
  ],
  coolDown: 'PNF-appropriate targets, contract-relax where a partner is available: hamstring 2×20s per side, glute/figure-4 2×20s per side, hip flexor 2×20s per side, thoracic extension over a foam roller 45s.',
  iconsNote: 'The week\'s heaviest session, and the one the ICONS Index numbers move on. Hard but achievable is the standard on the top sets — the last one to two reps should demand something without turning into a grind. There is no 90% day in this program by design; near-maximal work needs a real testing reason, and that is what the Week 4 peak test is for. Log the hip thrust reps this time — that single missing number is the reason its progression is currently the most conservative one in the plan. Week 5 is a scheduled reload, not a lost week: same movements, half the sets, loads around 50 to 70%, everything comfortably submaximal.',
};

const days = [day1, day2, day3];

const summary = {
  subtitle: 'Niko Heers · ICONS Index · Block Method Strength Foundation · Week 1',
  rows: [
    ['1', '60%', 'Upper Body — Technique & New Baselines', 'Seated OHP · Incline DB Press · Pull-Up Pathway', 'Establish OHP + Incline Press Wk1 loads · 2–3 unassisted pull-ups by Wk 8'],
    ['2', '70%', 'Squat & Single-Leg Foundation', `Back Squat · Walking Lunge · SL RDL · DB RDL`, `Squat ${load.squatWk1} → ${load.squatWk4} lbs · DB RDL 50 → 60 lbs/hand`],
    ['3', '80%', 'Posterior Chain — Peak Strength', 'Hex Bar Deadlift · Barbell Hip Thrust · Farmers Carry', `Hex DL ${load.hexWk1} → ${load.hexWk4} lbs (peak test) · Hip Thrust 175 → 205 lbs`],
  ],
  milestones4wk: `Week 4 is the strength reassessment — the standing ICONS cadence, corrected 8/17/2026 from the older informal 8-week assumption. Retest the ICONS Index battery and rebuild working loads off the new numbers. Targets: Hex Bar Deadlift peak test at ${load.hexWk4} lbs · Back Squat ${load.squatWk4} lbs × 8 · Hip Thrust 205 lbs × 8 (and RECORD THE REPS this time — that missing number is why its progression is currently the most conservative in the plan) · DB RDL 60 lbs/hand · Farmers Carry 60 lbs/hand with yards logged · Push-Ups 24+ · 2 clean unassisted pull-ups · assisted battery close 12 / standard 12 / wide 9 · Plank 3:15. Also close the two remaining intake ambiguities (per-hand confirmation on the carry and RDL) and log the Week 1 numbers actually established for Seated OHP, Incline DB Press, Walking Lunge and Single-Leg RDL. WEEK 5 IS A SCHEDULED RELOAD, placed immediately after the peak test so it absorbs the testing fatigue: same movements, same day structure, working sets cut roughly in half, loads at about 50–70% of normal, everything in the 3+ RIR submaximal band — no PRs, no AMRAP. It is a reload, not a lost week; a light week costs no muscle, only briefly-recoverable peak strength.`,
  milestones8wk: `Eight-week targets: Hex Bar Deadlift 200–210 lbs × 5 · Back Squat 135–140 lbs × 8 · Hip Thrust 215–225 lbs × 8 · Push-Ups 26–28 · 3 clean unassisted pull-ups · Plank 3:00 with a 10 lb plate. Two implement transitions are already scheduled rather than discovered mid-session: the DB Romanian Deadlift and the Farmers Carry both reach the studio's 60 lb per hand dumbbell ceiling by Week 4, so the RDL moves to a barbell and the carry to the hex bar for the second four-week block. Weekly volume audit for this program, recorded rather than assumed: quads ~13 sets, hamstrings and glutes ~17, chest ~10, back and lats ~10, shoulders ~7. Chest and back sit right at the ACSM 2026 target of at least 10 sets per muscle per week; shoulders sit below it at ~7, which is the honest cost of a three-day split carrying two lower-body-weighted days — the fix, if it matters more than the lower-body emphasis does, is a fourth day rather than more volume crammed into these three. Adherence target for the lower-limb neuromuscular circuit: at least 76% of prescribed sessions completed, tracked the same way load progression is.`,
  rescanNote: 'Styku rescan at 8–12 weeks — a separate clock from the 4-week strength reassessment above, and the two are deliberately not merged. What to compare against this baseline: ALST Index against 5.61 kg/m² (the margin above the 5.5 female floor is narrow, so the direction of travel matters more than the absolute figure), lean mass against 86.9 lbs, body fat against 37.6%, waist circumference against 36.0 in at the abdomen and 34.8 in at the narrowest — waist is the most reliable and most clinically endorsed of these, and the one to lead with — and VFA against 132.0 cm² as a personal trend, never as a risk grade. Also re-check both segmental gaps against the ≥10% relative trigger: arms at ~2.5% and legs at ~4.3% are both well below it today, so no unilateral-lead protocol is active, and nothing changes unless a future scan actually clears the threshold. Change-tracking is what this device is genuinely good at, and it performs better in women than men — female lean-mass change tracks at R²=0.70 with sub-kilogram error — so scan under standardised conditions each time (same time of day, same hydration state, same clothing and hair position) to protect the one thing the scanner does best.',
};

const data = {
  client,
  styku,
  weekOverview,
  baselines,
  baselinesTargetHeader: ['LIFT', 'BASELINE', 'TESTED AT', 'PROGRESSION TARGET'],
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

(async () => {
  const buf = await buildDocument(data);
  const out = path.join(__dirname, '..', 'trainer_education', 'Niko_Heers_3Day_Training_Plan.docx');
  fs.writeFileSync(out, buf);
  console.log('Written:', out);
  console.log('Epley 1RM — Hex Bar DL:', oneRM.hexDL, '| Back Squat:', oneRM.squat);
  console.log('Working loads:', JSON.stringify(load));
  console.log('Asymmetry — arm gap:', armGapPct + '% (' + armWeaker + ' lower), leg gap:', legGapPct + '% (' + legWeaker + ' lower) — both below the >=10% trigger');
})();
