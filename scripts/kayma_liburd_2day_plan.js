/**
 * Kayma Liburd — ICONS 2-Day Full-Body Training Plan
 * Brace Life Studios
 *
 * Brand-new client. No Styku scan, no weigh-in, and no baseline strength
 * battery/PR data on file yet — this is a from-scratch build with a real,
 * disclosed intake gap, handled the same way the Jake Poyner precedent
 * handles a client with no weight/Styku data on file: nothing is fabricated,
 * the gap is documented in a baselineNote, and the document is built to be
 * revised once real numbers exist.
 *
 * INTAKE GAPS — WHAT WAS NOT FABRICATED:
 *   - client.weightKg / client.bmr / client.alstIndex are left unset
 *     entirely. This safely no-ops proteinBar() (guarded by
 *     `alstIndex !== undefined`) and the nutritionBlock()/proteinTargets()
 *     protein-target math — never invoked anyway because
 *     includeNutritionBlock is explicitly false below (no weight on file to
 *     compute g/kg targets from; inventing one would be fabrication).
 *   - client.ageYears is set to 44 as an explicit WORKING FIGURE, not a
 *     confirmed value — her trainer did not supply an exact age, only
 *     confirmation she is in her 40s. 44 sits at the boundary of the 35-45
 *     "Transition Onset" and 45-55 "Perimenopause/Menopause Transition"
 *     brackets in CLAUDE.md's Age Bracket Programming Framework. This is
 *     flagged explicitly in baselineNotes rather than silently presented as
 *     a real intake value. LANGUAGE CORRECTED 8/17/2026 (CLAUDE.md's
 *     Protein Targets section, re-keyed from age to context): the prior
 *     note here asserted an automatic "40+ tier (1.8-2.0 g/kg)" escalation
 *     regardless of exactly where in her 40s she falls — that framing is
 *     retired. The 1.6 g/kg baseline applies to her regardless of exact
 *     age within her 40s; moving toward 2.2 g/kg/day is gated on a genuine
 *     energy deficit, heavy training load, or ALST At-Risk status, not age
 *     alone — none of which is confirmed on file for her yet, alongside the
 *     missing weight data noted above.
 *   - No baselines table and no epley1RM()/workingLoad() calls anywhere —
 *     there is no tested 1RM/5RM battery to calculate working loads from.
 *     Every load prescription below uses descriptive bands ("Heavy",
 *     "Moderate-Heavy", "25-30 lbs/hand", "Bodyweight", "Band") — the same
 *     convention already established in scripts/petra_3day_virtual_plan.js
 *     and scripts/nancy_avitable_3day_plan.js for clients without a tested
 *     baseline. "Advanced" is expressed through load complexity (barbell/
 *     heavy-DB compounds, unilateral work, tempo/paused reps, supersets)
 *     and RIR prescription, not through invented numbers.
 *   - client.isPostmenopausal is left `false` — no menstrual/vasomotor
 *     symptom data was reported at intake. Per CLAUDE.md's "Perimenopausal
 *     Status — Screening Ambiguity in a Non-Clinical Context" section, the
 *     recommendation to treat an unconfirmed 45-55-bracket client as
 *     pelvic-floor-cautious applies specifically WHEN menstrual irregularity
 *     or vasomotor/sleep symptoms ARE reported — none were here, so
 *     `isPostmenopausal: true` would be a fabrication in the other
 *     direction. Documented explicitly in baselineNotes rather than left
 *     silent, since a reader shouldn't have to infer why the callout never
 *     fires.
 *
 * PROGRAM STRUCTURE — CLIENT'S EXPLICIT REQUEST:
 * 2 days/week, TRUE full-body every session — not a movement-pattern split
 * (contrast Rena Paul's Hinge+Press+Core / Squat+Pull+Conditioning 2-day
 * design). Both Day A and Day B hit squat, hinge, upper push, upper pull,
 * and core/carry patterns. Advanced level means no technique/foundation day
 * — opens directly at 80% (Day A) / 90% (Day B) working intensity per
 * CLAUDE.md's standard ICONS Intensity Framework, uses advanced compound
 * variations (barbell/heavy-DB lifts, unilateral single-leg/single-arm
 * work, tempo and paused reps, supersets), and is volume-audited to meet
 * or exceed the ACSM/ICONS >=10 sets/muscle/week hypertrophy target across
 * the two sessions (squat/quad pattern ~10 sets, hinge/hamstring-glute
 * pattern well over 10, chest 10, back/lats well over 10, direct core work
 * 10 — shoulders land slightly under 10 in direct sets but pick up
 * meaningful secondary volume from every press and dip in the program).
 * RIR 1-2 on working sets throughout — advanced means more load and
 * complexity, never grinding to failure. The three-zone Isolated (Block A,
 * activation/alignment) -> Compound (Blocks B-C, primary strength) ->
 * Metabolic (Block D, conditioning/carry/core) structure from CLAUDE.md's
 * ICONS Training Philosophy is used on both days.
 *
 * CARDIAC FLAG (added mid-build, 8/11/2026 — real clinical correction from
 * Xolokan, not a stylistic note): Kayma has a documented heart condition
 * with a hard training heart-rate ceiling of 160 bpm. Treated with the same
 * seriousness as Moe Shahheidari's rotator cuff flag or Jake Poyner's QL
 * tendinosis flag — a dedicated red clinicalFlag baselineNote sits at the
 * very top of baselineNotes (mirroring Jake's document opening on its
 * clinical Presenting Issue note), and the 160 bpm ceiling + stop-signal
 * language is repeated in both days' ICONS Notes, the same way Jake's QL
 * pain-monitoring rule repeats on every day page rather than being stated
 * once and assumed remembered.
 *   - Per Xolokan's explicit "precautions not restrictions" framing (the
 *     same principle already applied to Moe's shoulder flag): this is a
 *     conditioning/metabolic-intensity precaution, NOT a blanket downgrade.
 *     The resistance-training side of "advanced" (compound-lift loading,
 *     unilateral complexity, tempo work, >=10 sets/muscle/week) is
 *     unrestricted — a controlled resistance set does not sustain HR near a
 *     cardiac ceiling the way continuous HIIT/sprint conditioning does.
 *   - What DID change: every Block D (Metabolic/Conditioning) exercise and
 *     intro was written or rewritten to be HR-capped rather than max-
 *     effort — no "max effort," "all-out," or "sprint" language anywhere in
 *     this file. Kettlebell swings are prescribed at a controlled, moderate
 *     pace rather than "explosive." The Day B conditioning block, which
 *     would conventionally be a HIIT bike/rower interval finisher on an
 *     advanced program, is instead a moderate-effort, HR-monitor-checked
 *     circuit (steady-state-adjacent, not intervals structured as "hard/
 *     easy" sprints). Every Block D intro instructs an explicit HR-monitor
 *     check between rounds/sets.
 *
 * BREATHING-TECHNIQUE ADDITION (8/12/2026 — cueing-only correction, from
 * CLAUDE.md's new "Cardiovascular / Cardiac Considerations in Resistance
 * Training" section): the Valsalva maneuver / blood-pressure-spike risk
 * pathway during heavy compound lifting is real and SEPARATE from the
 * sustained-elevated-HR risk the Block D HR ceiling already addresses —
 * this document previously had no breathing-technique language on the
 * strength side. Nothing about load, intensity, or exercise selection
 * changed (the "precautions not restrictions" call on the resistance-
 * training side still holds per the science-layer citation above); this is
 * a cueing addition only. An explicit "exhale on exertion, do not hold your
 * breath through the rep" cue was added to the six heaviest compound
 * lifts across both days (Day A: Barbell Back Squat, Romanian Deadlift,
 * Incline DB Bench Press; Day B: Trap Bar Deadlift, Barbell Hip Thrust,
 * Close-Grip Bench Press or Weighted Dip) and to the cardiac clinicalFlag
 * baselineNote — the same brace-before-lifting/exhale-on-exertion cue this
 * system already uses in the Pelvic Floor Protocol, extended here for a
 * different (cardiac, not continence) reason.
 *
 * BETA-BLOCKER FLAG ADDED (8/13/2026, icons-roster-analyst cross-check) —
 * CLAUDE.md's Cardiovascular section notes that beta-blockade blunts HR
 * response across the intensity spectrum, making RIR/RPE the more reliable
 * real-time effort signal for a client on one, and that beta-blocker status
 * is worth confirming directly at intake rather than assumed. Nothing on
 * file indicates this was ever asked. A short line was added to the cardiac
 * clinicalFlag baselineNote flagging this as an open confirmation item —
 * not resolving it either way, since whether she is actually on a
 * beta-blocker is not known and is not invented here.
 *
 * ICONS INDEX FULL-SPECTRUM COVERAGE FIX (8/13/2026 — retroactive audit
 * against CLAUDE.md's "ICONS Index Full-Spectrum Progression Standard —
 * Women 40-55"; Kayma's working age of 44 sits within the 40-55 window
 * regardless of exactly where in her 40s she actually falls). Two of the
 * 10 core ICONS Baseline Testing Protocol patterns were genuinely absent
 * from the document, not just under-emphasized: Push-Ups (the only
 * "push-up" string anywhere was a warm-up "scapular push-up 2x10" mobility
 * cue, not a tracked exercise) and Single-Leg RDL (her hinge work was
 * entirely bilateral — Romanian Deadlift, Trap Bar Deadlift — and her
 * unilateral lower-body work — Bulgarian Split Squat, Front Rack Reverse
 * Lunge — is squat/lunge-pattern, not hinge-pattern). Both are added using
 * the SAME descriptive-band load convention as the rest of this document
 * (no numeric 1RM math introduced, since no tested battery exists on file
 * — see "INTAKE GAPS" above) and placed with the Antagonist Rotation Rule
 * applied to their exact insertion point, not waived for her Advanced
 * level per CLAUDE.md's explicit standing note that advanced trainees are
 * not exempt:
 *   - Push-Up (Weighted or Tempo, Advanced Variation) added to Day A,
 *     Block D, inserted 2nd (between Suitcase Carry and Weighted Plank):
 *     Suitcase Carry (carry) -> Push-Up (push, NEW) -> Weighted Plank
 *     (core) -> Kettlebell Swing (hinge) — four different patterns in a
 *     row, no 3-consecutive-same-pattern stack introduced.
 *   - Single-Leg RDL (DB) added to Day B, Block B, inserted 4th/last
 *     (after Front Rack Reverse Lunge): Trap Bar Deadlift (hinge) ->
 *     Barbell Hip Thrust (hinge) -> Front Rack Reverse Lunge (squat/lunge,
 *     breaks the hinge run at 2) -> Single-Leg RDL (hinge, NEW) — the
 *     hinge pattern never stacks 3 in a row since the lunge exercise sits
 *     between the two hinge pairs.
 *
 * ============================================================================
 * REVISION 8/20/2026 — ICONS BLOCK METHOD RESTRUCTURE (roster-wide rollout,
 * batch 4). Full existing record read first (CLIENTS.md entry in full +
 * this script in full) per the standing pre-build rule; every prior clinical
 * decision below was re-confirmed, not re-derived.
 *
 * 1. SIX-SLOT ARCHITECTURE. Both days rebuilt onto Corrective -> Primary
 *    Compound -> Accessory -> [Jason's exercise] -> Secondary Compound ->
 *    Third Compound (Integration), metabolic finisher following. Because
 *    this is a TRUE full-body 2-day build (client's explicit request —
 *    every session must cover squat, hinge, upper push, upper pull, and
 *    core/carry), each day carries TWO secondary-compound blocks — one
 *    lower, one upper — rather than dropping a pattern to fit a single
 *    slot. That is a deliberate, documented scaling of the architecture to
 *    a 2-day full-body client, not a deviation from it.
 *      Day A: A Corrective / B Primary Compound (Back Squat) / C Accessory
 *        (Bulgarian Split Squat + Push-Up) / D Secondary Compound (RDL) /
 *        E Secondary Compound (upper push+pull superset) / F Integration
 *        (suitcase carry + weighted plank) / G Metabolic finisher (HR-capped).
 *      Day B: A Corrective / B Primary Compound (Trap Bar DL) / C Accessory
 *        (Barbell Hip Thrust) / D Secondary Compound (lunge + single-leg
 *        RDL) / E Secondary Compound (upper pull+push superset) /
 *        F Integration (farmer carry + hanging leg raise) / G Metabolic
 *        finisher (HR-capped).
 *
 * 2. SLOT 4 (JASON'S EXERCISE) OMITTED ENTIRELY, HONESTLY. Kayma has no
 *    Jason Bethea SOAP-note record on file — her coordinated care is with
 *    her own physician/cardiologist, not in-house PT. Per the Block Method's
 *    conditional-slot rule, the slot is omitted rather than filled with
 *    generic filler. Nothing was invented to occupy it.
 *
 * 3. INTENSITY RE-ANCHOR — Day B 90% -> 80%, Day A 80% -> 70%. Per the
 *    corrected ICONS Intensity Framework, Red/90% days are reserved for
 *    clients with an actual testing or competition rationale; Kayma has
 *    neither, and — decisively — has NO tested strength battery on file at
 *    all, so a "90%" label was never anchored to a real number. Prescribing
 *    near-maximal work off descriptive load bands, with the RIR calibration
 *    protocol never yet run on her, is a precision claim the data does not
 *    support. Day A drops to 70% so the week carries genuine intensity
 *    variation (the ICONS two-day Green+Gold rotation) rather than two
 *    sessions run at the same relative effort. THIS IS NOT A CARDIAC
 *    RESTRICTION and must not be read as one: exercise selection, load
 *    ceilings, complexity, and weekly volume are all unchanged, and the
 *    "precautions not restrictions" call on her resistance training still
 *    stands in full. A 90% day becomes justified the moment a tested
 *    battery exists and a genuine Week-4 peak test is scheduled — that is
 *    a testing rationale, which the framework expressly permits.
 *
 * 4. RIR CORRECTED TO THE CURRENT MODEL. Primary lifts move off the old
 *    "1-2 RIR" blanket to 2 RIR (Day B) / 2-3 RIR (Day A, the moderate
 *    day); hypertrophy-priority accessories run at 1 RIR (Day B) / 2 RIR
 *    (Day A). "Near-maximal, 1 RIR" on the Trap Bar Deadlift is retired
 *    alongside the 90% re-anchor.
 *
 * 5. BREATHING CUE MADE BLOCK-LEVEL (was per-exercise on six named lifts).
 *    The Valsalva/blood-pressure precaution is a STANDING written part of
 *    every loaded compound block now — stated in each compound block's
 *    intro with the explicit clause that it applies to every option listed
 *    in that block's menu, not just the named lift, and repeated in both
 *    days' intensityPara and ICONS Note. The per-exercise cues on the
 *    heaviest lifts were kept as well (redundancy on a cardiac cue is a
 *    feature, not duplication to trim).
 *
 * 6. COMPOUND-SLOT OPTIONS MENUS added to every compound slot on both days,
 *    filtered against her record and the confirmed studio inventory before
 *    listing — every option in every menu inherits the block-level breathing
 *    cue and the HR-monitor rule. Index-tested movements named as the
 *    tracked progression anchors in each intro.
 *
 * 7. PLANNED DELOAD ADDED (combined model). She carries no active injury
 *    site and no rehab flag, so she is autoregulation-acceptable: a Week 5
 *    slot is planned immediately after the Week 4 strength check, pulled
 *    forward on triggers or pushed back a week if every signal is green.
 *    New blue, client-visible baselineNote; folded into milestones4wk.
 *
 * 8. FULL-SPECTRUM 10-MOVEMENT COVERAGE RE-VERIFIED POST-RESTRUCTURE (her
 *    working age 44 sits inside the women 40-55 window): Deadlift (Trap Bar,
 *    Day B), Back Squat (Day A), Overhead Press (standing BB, Day A;
 *    Arnold, Day B), Incline DB Press (Day A), Push-Ups (Day A accessory),
 *    Farmers Carry (Day B integration; suitcase Day A), Hip Thrust (Day B
 *    accessory), Single-Leg RDL (Day B), Lunges (Day B; Bulgarian Day A),
 *    Plank Hold (Day A integration; Day B option). 10/10 preserved — no
 *    pattern lost in the move.
 *
 * 9. TOUCH-RULE PASS. Kieser renames ("Lat Pulldown" -> "Kieser Pulldown";
 *    "Face Pull (Band or Cable)" -> "Band or Kieser"); studio ceilings
 *    stated in-document (60 lbs/hand DB, 25 lbs KB, hex bar for carries
 *    past the DB ceiling); "Weighted Dip" option dropped — no dip station
 *    on the confirmed studio inventory, and close-grip bench already
 *    occupied that slot; descriptive load bands converted to Wk1 -> Wk4
 *    fields wherever a real range already existed (Bulgarian Split Squat,
 *    Push-Up, Suitcase Carry, Single-Leg RDL, Farmer Carry, Weighted
 *    Plank); reassessment cadence language updated to the two-clock split
 *    (4-week strength reassessment / 8-12 week Styku rescan); stale block
 *    references ("Block D") in baselineNotes repointed to the restructured
 *    blocks; warm-up drift check run — both warm-ups hold band-activation
 *    and unloaded mobility only (band pull-apart/lateral walk/PVC drills/
 *    dead hang), which belong there, so nothing needed promoting to a table.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Kayma Liburd',
  programTitle: '2-Day Full-Body Training Plan',
  subtitle: 'True Full-Body Advanced Strength Build',
  schedule: 'Full Gym · 2 Days/Week',
  stats: [
    '40s — Exact Age Not Confirmed',
    'Advanced',
    'Cardiac Flag — 160 BPM HR Ceiling (Physician-Coordinated)',
    'Full Gym · 2 Days/Week',
  ],
  ageYears: 44,
  isPostmenopausal: false,
};

const baselineNotes = [
  {
    type: 'clinical',
    label: 'Cardiac Flag — Hard Heart-Rate Ceiling, 160 BPM',
    body: 'Known cardiac condition on file. Heart rate must not exceed 160 bpm at any point during training. Wear a heart-rate monitor every session, and check it explicitly during every conditioning/metabolic block (flagged inline in each day\'s closing HR-capped finisher below) — not just at the end of a set. This program proceeds under physician/cardiologist clearance and coordination: this is an operating constraint, not a diagnosis. Stop signal: chest pain, dizziness, shortness of breath disproportionate to effort, or an HR monitor reading above 160 bpm is a hard stop for that set or session — flag your coach immediately, do not push through to finish a set or round. Breathing technique on the heaviest compound lifts (squat, deadlift-pattern hinge, heavy press) is a second, separate precaution, distinct from the HR ceiling above: exhale on exertion through the lift, do not hold your breath through the rep. Brace before the lift, then exhale as you drive — sustained breath-holding on a heavy rep (a Valsalva maneuver) can cause a real blood-pressure spike — a manageable, well-understood consideration with the right cueing, not a reason to restrict the loads themselves. If you take a beta-blocker or any other heart medication, tell your coach — it changes how your heart rate responds to effort, which changes how we read the monitor. In that case we lean on how hard a set actually feels (RIR/RPE) alongside the number on the screen, not the number alone.',
  },
  {
    type: 'watch',
    audience: 'internal',
    label: 'Cardiac Flag — Build Rationale & Open Intake Item',
    body: 'Split out of the client-visible cardiac note 8/21/2026 (Aimee Morris split-note precedent) so the safety content reaches her without the build reasoning. Rationale for the record: the clearance framing follows the same posture used for PT-coordinated clinical flags, and the exhale-on-exertion cue is the same brace-before-lifting cue used for pelvic floor safety, extended here for a different mechanism (Valsalva blood-pressure spike, not continence). OPEN INTAKE ITEM: beta-blocker status has NOT been asked. Beta-blockade blunts heart-rate response across the intensity spectrum, so if she is on one, the 160 bpm ceiling alone becomes a less reliable real-time effort signal on conditioning work and RIR/RPE becomes the primary signal alongside (not instead of) the ceiling. Her client-visible note now asks her to disclose heart medication directly, which is the right channel for it, but confirming with her physician remains outstanding.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Age Bracket — 44 Years Is a Working Figure, Not Confirmed',
    body: 'Kayma\'s trainer confirmed she is in her 40s but did not supply an exact age. 44 is used here as a working figure, positioned at the boundary of CLAUDE.md\'s 35-45 "Transition Onset" and 45-55 "Perimenopause/Menopause Transition" brackets — treat the bracket-specific detail (LIFTMOR bone-loading candidacy screening, perimenopausal symptom monitoring) as provisional until her actual age is confirmed. What does not depend on resolving this: the 1.6 g/kg/day protein baseline applies to her regardless of exactly where in her 40s she falls; moving toward 2.2 g/kg/day once real weight data exists is gated on a genuine energy deficit, heavy training load, or ALST At-Risk status — not age alone (corrected 8/17/2026, CLAUDE.md\'s Protein Targets section).',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Intake Gap — No Styku Scan, Weigh-In, or Baseline Battery on File',
    body: 'No Styku body-composition scan and no weight are on file, so protein/creatine targets and full clinical interpretation (ALST, VFA, BMI) are not calculated here — inventing them from an assumed weight would be fabrication, not programming. No tested strength battery (1RM/5RM) is on file either, so every load below is a descriptive band ("Heavy," "Moderate-Heavy," a working range in lbs/hand) rather than a percentage of a real number. Recommend running the standard 11-exercise ICONS Baseline Testing Protocol at her next session, alongside a Styku scan and weigh-in, so this document can be revised from descriptive to numeric prescriptions using epley1RM()/workingLoad() off real data.',
  },
  {
    type: 'teal',
    audience: 'internal',
    label: 'Perimenopausal Status — Not Assessed, isPostmenopausal Left False',
    body: 'No menstrual irregularity, vasomotor symptoms (hot flashes/night sweats), sleep disruption, or mood-change data was reported at intake. Per CLAUDE.md\'s "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" guidance, treating an unconfirmed 45-55-bracket client as pelvic-floor-cautious by default applies specifically when those symptoms ARE reported — none were reported here, so isPostmenopausal is left false rather than escalated, and the pelvic floor callout correctly does not auto-fire. Revisit this if symptom data becomes available at a future session.',
  },
  {
    type: 'gold',
    label: 'Program Structure — True Full-Body, Advanced, Per Client Request',
    body: 'Built as a genuine 2-day full-body program at Kayma\'s explicit request — both Day A and Day B hit squat, hinge, upper push, upper pull, and core/carry patterns, not a movement-pattern split. Advanced level means no technique/foundation day: both sessions run at real working intensity — Day A the moderate day and Day B the primary strength day, so the week carries genuine variation rather than two sessions at the same effort — with barbell and heavy-DB compound variations, unilateral single-leg/single-arm work, tempo and paused reps, and supersets. Volume audits to meet or exceed the ACSM/ICONS >=10 sets/muscle/week hypertrophy target across the two sessions for every major pattern (squat/quad, hinge/hamstring-glute, chest, back, direct core work), with shoulders picking up substantial secondary volume from the pressing and dip work even where direct sets land just under 10. Main lifts finish with 2 clean reps in reserve on Day B and 2-3 on Day A; hypertrophy-priority accessories run one step harder. Advanced expresses as load and complexity, never as training to failure.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'ICONS Index Coverage Added — Push-Ups & Single-Leg RDL (8/13/2026)',
    body: 'Push-Ups and Single-Leg RDL were genuinely absent from this program — not just lightly touched — and are added to close that gap: Push-Up (Day A, accessory block, alongside the split squat) and Single-Leg RDL (Day B, unilateral lower compound block, alongside the lunge). Both use the same descriptive-band load convention already established throughout this document (no tested 1RM battery exists yet to derive numbers from), and both are placed to preserve the Antagonist Rotation Rule\'s no-3-consecutive-same-pattern standard within their block — not waived for her Advanced level, per CLAUDE.md\'s explicit note that heavier absolute loads at an advanced level make that rule\'s underlying accumulated-stress mechanism higher-stakes, not lower. Both should be included in her first ICONS Baseline Testing Protocol session so these descriptive bands can convert to real numbers alongside the rest of the program.',
  },
  {
    type: 'blue',
    label: 'Planned Deload — Week 5, Right After the Week 4 Strength Check',
    body: 'One lighter week is built into this program on purpose — it is planned, not a reaction to anything going wrong. Week 5, immediately after the Week 4 strength check, runs the same exercises and the same day structure with sets cut by roughly a third, loads held at Week 3-4 levels instead of climbing, and every set kept comfortably in the technique range (3 or more reps in reserve). No new top sets, no testing, no all-out finishers. Because you are training without an active injury site, the timing is flexible: if everything feels strong through Week 4 — sleep good, soreness normal, sessions sharp — the deload can slide a week later; if a session stalls or soreness runs unusually high before then, take it earlier. A light week costs nothing that matters. Muscle built over the previous month is not lost in one reduced week; only a small edge of peak strength dips, and it comes back within days. Weeks 6-8 then rebuild from the Week 4 loads.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Block Method Restructure — 8/20/2026 (Build Record)',
    body: 'Both days rebuilt onto the standing ICONS session architecture: Corrective -> Primary Compound -> Accessory -> [Jason\'s exercise] -> Secondary Compound -> Third Compound (Integration), with the HR-capped metabolic finisher following. Slot 4 is OMITTED ENTIRELY on both days — Kayma has no Jason Bethea SOAP-note record on file; her coordinated care is with her own physician/cardiologist — and nothing was invented to occupy it. Because this is a true full-body 2-day build at her explicit request (every session must cover squat, hinge, upper push, upper pull, and core/carry), each day carries TWO secondary-compound blocks, one lower and one upper, rather than dropping a pattern to fit a single slot: a documented scaling of the architecture to a 2-day full-body client, not a deviation from it. Antagonist Rotation was walked on the FULL rendered day across block boundaries, not per block: Day A runs squat -> squat -> push -> hinge -> push -> pull -> push -> pull -> carry -> core -> hinge; Day B runs hinge -> hip extension -> knee-dominant -> hinge -> pull -> push -> pull -> push -> carry -> core -> conditioning. No three consecutive same-pattern compounds anywhere on either rendered day. Full 10-of-10 ICONS Index movement coverage was re-verified after the move (see the coverage note above) — nothing was lost in the restructure.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Compound-Slot Exercise Options — Selection Record (8/20/2026)',
    body: 'Every compound slot on both days now carries a coach-selectable same-pattern options menu in its block intro, filtered against her record and the confirmed studio inventory BEFORE listing. Cardiac filter applied to all of them: each menu states explicitly that the brace-and-exhale breathing rule and the HR-monitor rule apply to every option listed, not only to the named lift — so no option can be selected out from under the standing Valsalva precaution. Equipment filter: no option requires anything outside the confirmed studio inventory. Options considered and REJECTED, not to be added without a record change: any HIIT/sprint-format conditioning alternate (directly contradicts the 160 bpm ceiling), weighted dip (no dip station on the confirmed studio inventory — the prior "Close-Grip Bench Press or Weighted Dip" listing was removed for this reason, and close-grip bench already occupies that slot), max-effort or AMRAP carry formats (sustained-HR risk), and any kettlebell prescription above 25 lbs or dumbbell prescription above 60 lbs/hand (studio ceilings). Index-tested movements — Back Squat, Trap Bar Deadlift, Incline DB Press, Hip Thrust, Single-Leg RDL, Front Rack Reverse Lunge, Push-Up, Farmers/Suitcase Carry, Plank, Overhead Press — all remain the tracked, retested progression anchors, named as such in each intro; options substitute within a session and never fork the progression.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Intensity Re-Anchor — Day B 90% -> 80%, Day A 80% -> 70% (8/20/2026)',
    body: 'Per the corrected ICONS Intensity Framework, a Red/90% day is reserved for a client with an actual testing or competition rationale. Kayma has neither — and, decisively, has no tested strength battery on file at all, so the "90%" label was never anchored to a real number in the first place. Prescribing near-maximal work off descriptive load bands, with the RIR calibration protocol never yet run on her, is a precision claim the data does not support. Day A was moved to 70% at the same time so the week carries real intensity variation (the documented ICONS two-day Green + Gold rotation) rather than two sessions run at the same relative effort, which is what two 80% days would have produced. THIS IS NOT A CARDIAC RESTRICTION and must not be recorded or explained as one: exercise selection, load ceilings, movement complexity, and weekly per-muscle volume are all unchanged, and the standing "precautions not restrictions" call on her resistance training holds in full. A 90% day becomes justified the moment a tested battery exists and a genuine Week-4 peak test is scheduled — that is a testing rationale, which the framework expressly permits.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'DAY A — Full-Body Strength I',
    subtitle: 'Squat & Push Emphasis — Moderate-Volume Day',
    descriptor: 'PRIMARY SQUAT · UPPER PUSH & PULL · LOADED CARRY · FULL-BODY EVERY SESSION · 60–70 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'The moderate day of the week — real working load, deliberately kept a step below Day B so the two sessions are not run at the same effort. True full-body as requested: squat, hinge, upper push, upper pull, and loaded carry/core all land in this one session. Control precedes power — a short corrective block opens every session before any compound load. Working sets finish with 2–3 good reps still in reserve on the main lifts, 2 on the accessories: hard, never a grind. Heart-rate monitor on from warm-up through the closing finisher — the 160 bpm ceiling applies to every block and is checked explicitly during the finisher. Breathing on every loaded compound block today: brace before the rep, exhale through the effort, never hold your breath across a rep or a set.',
    warmUp: 'Heart-rate monitor on before starting. 4-5 min row or bike, easy pace. Then: banded lateral walk 2×10/side, hip circles 10 each direction, thoracic rotation 10/side, scapular push-up 2×10, empty-bar or PVC squat-to-stand 2×8.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Wakes the glute medius and scapular stabilizers and locks in core bracing before any compound load goes on the bar — the neural precision this population needs before loading. Light, unhurried, and never rushed to get to the bar.',
        exercises: [
          { name: 'Banded Lateral Walk', sets: '2', reps: '12/side', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Band above knees, hips level, no torso lean.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Shoulder height, squeeze shoulder blades, control the return.' },
          { name: 'Dead Bug', sets: '2', reps: '10/side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back pressed flat, slow opposite arm-leg reach.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — BACK SQUAT',
        introLabel: 'Load Target',
        intro: 'The day\'s main lift, and the squat number we track and retest — everything else today is built around it. Moderate day: the top set finishes with 2–3 clean reps still in reserve. Breathing rule for this block and for every option listed below, not just the named lift: brace before the descent, exhale through the drive up, never hold your breath through a rep or across a set. Heart-rate monitor stays on. If the day calls for a different squat, rotate between: front squat (more upright torso, lighter bar load), paused box squat (depth fixed and controlled), goblet squat with a dumbbell or kettlebell (studio kettlebells top out at 25 lbs — use a dumbbell if you want more), or a hex-bar squat. The barbell back squat stays the lift we load, log, and retest — an option covers one session, it does not replace the progression.',
        exercises: [
          { name: 'Barbell Back Squat', sets: '4', reps: '6', load: 'Moderate-Heavy — Wk1 conservative → Wk4 top of the band', tempo: '3-2-1', rest: '2 min', cue: 'Brace before descent, 2-count pause at depth, drive floor away. Exhale on exertion — never hold your breath through the rep.', rirNote: '2-3 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — QUAD, GLUTE & PRESSING VOLUME',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'The muscle-building work behind the squat above, plus the push-up — one of the ten tested ICONS movements, kept in the program on purpose rather than left to warm-ups. Worked hard: these finish with about 2 reps in reserve on this day. Same breathing rule as the block above once a vest or plate is added.',
        exercises: [
          { name: 'Bulgarian Split Squat (DB)', sets: '3+3', reps: '8 ea', load: 'Wk1: 25 → Wk4: 30 lbs/hand', tempo: '2-1-1', rest: '75s', cue: 'Rear foot elevated, front knee tracks over toes, even tempo both legs.', rirNote: '2 RIR' },
          { name: 'Push-Up (Weighted Vest or Tempo, Advanced Variation)', sets: '3', reps: '10–12', load: 'Wk1: bodyweight → Wk4: light vest/plate', tempo: '3-1-1', rest: '45s', cue: 'Full brace, neutral spine, chest to floor. Slow the eccentric before adding load. Exhale on the press.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — HINGE (ROMANIAN DEADLIFT)',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern, rotating off the squat work above to the back of the legs and hips. Same breathing rule, and it applies to every option here: brace, exhale through the lift, no breath-holding across the set. If the day calls for a different hinge, rotate between: hex-bar Romanian deadlift (easier on the grip and the low back), dumbbell Romanian deadlift, staggered-stance Romanian deadlift (one hip at a time, both feet down), or a back extension on the hyperextension bench taken to comfortable range. The barbell Romanian deadlift is the version we load and log.',
        exercises: [
          { name: 'Romanian Deadlift (Barbell)', sets: '4', reps: '6–8', load: 'Moderate-Heavy — Wk1 conservative → Wk4 top of the band', tempo: '3-1-1', rest: '90s', cue: 'Hinge from the hip, bar tracks close, feel hamstring load, stand tall. Exhale on exertion — never hold your breath through the rep.', rirNote: '2-3 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'SECONDARY COMPOUND — UPPER PUSH & PULL (SUPERSET)',
        introLabel: 'Format',
        intro: 'Paired sets: press then pull, 15 seconds between the pair, full rest after — pressing and pulling alternate the whole way through so nothing gets hammered twice in a row. Breathing rule stands on every set in this block and on every option below: exhale through the press or the pull, never hold your breath. Studio dumbbells top out at 60 lbs per hand — once a press or row is comfortably at that ceiling, move it to the barbell or the Kieser rather than chasing a heavier dumbbell. Press options: incline dumbbell press (the tested ICONS movement, and the one we track), flat barbell bench press, landmine press, or a seated dumbbell overhead press. Pull options: single-arm dumbbell row (the version we log), chest-supported row, single-arm landmine row, or a Kieser row. Vertical pull options: weighted pull-up (what we track), the assisted pull-up machine, a Kieser pulldown, or a band-assisted pull-up.',
        exercises: [
          { name: 'Incline DB Bench Press (Paired A1)', sets: '5', reps: '6–8', load: 'Moderate-Heavy DB — 60 lbs/hand studio ceiling', tempo: '3-1-1', rest: '15s → A2', cue: 'Elbows ~45°, full stretch at bottom, press to lockout. Exhale on the press — never hold your breath.', rirNote: '2 RIR' },
          { name: 'Single-Arm DB Row (Paired A2)', sets: '5', reps: '8/side', load: 'Moderate-Heavy DB — 60 lbs/hand studio ceiling', tempo: '2-1-2', rest: '90s after pair', cue: 'Bench-supported, flat back, drive elbow to hip, full stretch at bottom.', rirNote: '2 RIR' },
          { name: 'Standing Barbell Overhead Press (Paired B1)', sets: '4', reps: '6', load: 'Moderate — Wk1 conservative → Wk4 top of the band', tempo: '2-1-1', rest: '15s → B2', cue: 'Ribs down, brace hard, press straight overhead. Exhale on the press.', rirNote: '2 RIR' },
          { name: 'Weighted Pull-Up or Kieser Pulldown (Paired B2)', sets: '4', reps: '6–8', load: 'BW + load, or Kieser — build on the same machine', tempo: '3-1-2', rest: '90s after pair', cue: 'Full hang to chin over bar, controlled descent. Assisted pull-up machine is the in-between step.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'F',
        title: 'FULL-BODY INTEGRATION — LOADED CARRY & CORE UNDER LOAD',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closer — one block that puts everything above to work at once: the bracing from the corrective block, the squat and hinge posture, and the pressing and pulling shoulder position, all held under load while you walk. Distance and posture govern this work, not a rep target. Carry load stays at or below the same 40–50 lbs per hand already used here; if a carry ever outgrows the 60 lb dumbbell ceiling, it moves to the hex bar rather than climbing further on dumbbells. If the day calls for a variation: farmer carry with both hands loaded, hex-bar carry, or a goblet carry held at the chest — the single-side suitcase carry is the one we track.',
        exercises: [
          { name: 'Suitcase Carry (Single-Side, Heavy DB)', sets: '3+3', reps: '30 yds ea', load: 'Wk1: 40 → Wk4: 50 lbs', tempo: 'Controlled', rest: '60s', cue: 'Resist lateral lean, tall posture. Check HR monitor before switching sides.' },
          { name: 'Weighted Plank (Plate on Back)', sets: '3', reps: '30–45s', load: 'Wk1: light plate → Wk4: moderate plate', tempo: 'Hold', rest: '45s', cue: 'Full brace, ribs down, no sag or pike. Isometric — minimal HR load.' },
        ],
      },
      {
        letter: 'G',
        title: 'METABOLIC FINISHER — HR-CAPPED',
        color: 'gold',
        introLabel: 'Cardiac-Safe Format — 160 BPM Ceiling',
        intro: 'Energy becomes identity — a short close to the session, run at a controlled pace and well inside the 160 bpm ceiling. This is not an all-out finisher and there is no sprint or max-effort work anywhere in this program. Check the heart-rate monitor after every set and ease the pace immediately if it climbs toward 160.',
        exercises: [
          { name: 'Kettlebell Swing (Two-Hand, Moderate Pace)', sets: '3', reps: '12', load: 'Moderate KB — 25 lbs studio ceiling', tempo: 'Controlled — not max effort', rest: '60s', cue: 'Hip hinge back, steady controlled pace. Check HR monitor after each set; stop the set early if approaching 160 bpm.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 60s each. Doorway chest stretch 30s each. Lat stretch 30s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'Cardiac flag reminder: heart rate must stay under 160 bpm the entire session, monitor worn throughout, checked explicitly during the finisher. Chest pain, dizziness, shortness of breath disproportionate to effort, or a monitor reading above 160 bpm is a hard stop for that set or the session — flag your coach immediately. Breathing on every loaded compound block: brace before the rep, exhale through the effort, never hold your breath across a rep or a set — this applies to whichever variation you run, not only to the named lift. On the strength side: advanced loading is about complexity and load, not grinding to failure — today\'s main lifts finish with 2–3 reps in reserve. Log load and RIR every set; this becomes the numeric baseline once a Styku scan and formal battery are on file.',
  },
  {
    intensity: 80,
    title: 'DAY B — Full-Body Strength II',
    subtitle: 'Hinge & Pull Emphasis — Primary Strength Day',
    descriptor: 'PRIMARY DEADLIFT · HIP THRUST · UNILATERAL LOWER · UPPER PULL & PUSH · LOADED CARRY · 60–70 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'The week\'s primary strength day — the heaviest hinge and pull work of the week, with full recovery between the main sets. Same full-body structure as Day A (squat, hinge, push, pull, and core/carry all present), sequenced hinge-and-pull-forward so the two sessions emphasize different patterns rather than repeating each other. Main lifts finish with 2 clean reps in reserve; hypertrophy-priority accessories run one step harder at about 1 rep in reserve. IMPORTANT: "primary strength" describes the resistance work only — the closing conditioning block is deliberately capped well inside the 160 bpm ceiling. The strength side of this program is not restricted by that ceiling; the sustained-conditioning side is. Breathing on every loaded compound block: brace, exhale through the effort, no breath-holding across a rep or a set.',
    warmUp: 'Heart-rate monitor on before starting. 4-5 min row or bike, easy pace. Then: glute bridge march 2×10/side, face pull 2×15 light, thoracic rotation 10/side, PVC hip hinge drill 2×10, dead hang 20s for shoulder decompression.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — HINGE PRIMING & POSTERIOR SHOULDER',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Primes the hip hinge pattern and posterior shoulder before the day\'s heaviest lifts, and locks in anti-rotation core control ahead of the loaded carry that closes the session.',
        exercises: [
          { name: 'Glute Bridge March', sets: '2', reps: '10/side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Pelvis level throughout, no rock side to side.' },
          { name: 'Face Pull (Band or Kieser)', sets: '2', reps: '15', load: 'Light band / Kieser', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows high, external rotation at end range.' },
          { name: 'Pallof Press (Anti-Rotation)', sets: '2', reps: '10/side', load: 'Light-Mod band', tempo: '2-2-1', rest: '30s', cue: 'Press straight out from chest, resist rotation toward the band.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — TRAP BAR DEADLIFT',
        introLabel: 'Load Target',
        intro: 'The heaviest lift of the week and the deadlift number we track and retest. Full recovery between every set — this is about load quality, not fatigue accumulation, and the top set still leaves 2 clean reps in reserve. Controlled heavy sets with full rest between them do not sustain heart rate the way continuous circuit work does, so this block is not capped the way the finisher is — but the monitor stays on throughout regardless. Breathing rule for this block and every option below: brace before the pull, exhale through the drive, never hold your breath through a rep or across a set. If the day calls for a different pull, rotate between: conventional barbell deadlift, sumo deadlift, elevated-handle or block-height hex-bar pulls (shorter range on a stiff day), or a barbell Romanian deadlift held to a shorter range. The trap bar version is the one we load, log, and retest.',
        exercises: [
          { name: 'Trap Bar Deadlift', sets: '4', reps: '5', load: 'Heavy — Wk1 conservative → Wk4 top of the band', tempo: '2-0-1', rest: '2 min', cue: 'Neutral spine, symmetric setup, drive floor away hard. Exhale on exertion — never hold your breath through the rep.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — GLUTE & POSTERIOR CHAIN (HIP THRUST)',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'The hypertrophy work behind the deadlift above, and one of the ten tested ICONS movements in its own right. Worked one step harder than the main lift — about 1 rep in reserve on the last set. Same breathing rule: brace, exhale through the drive to lockout, no breath-holding. If the day calls for a variation: single-leg hip thrust, dumbbell or kettlebell hip thrust (studio kettlebells top out at 25 lbs), or a shoulder-elevated glute bridge — the barbell version is what we track.',
        exercises: [
          { name: 'Barbell Hip Thrust', sets: '4', reps: '6–8', load: 'Heavy — Wk1 conservative → Wk4 top of the band', tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, full hip lockout, squeeze glutes hard at top. Exhale on exertion — never hold your breath through the rep.', rirNote: '1 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — UNILATERAL LOWER (LUNGE & SINGLE-LEG HINGE)',
        introLabel: 'Load Target',
        intro: 'One leg at a time — the lunge rotates the work off the hip-dominant lifts above and onto the front of the leg, and the single-leg RDL closes out the week\'s unilateral hinge. Both are tested ICONS movements. Breathing rule applies to every option here as well. Lunge options: walking dumbbell lunge, split squat, or a step-up to a plyo box — the front rack reverse lunge is what we log. Single-leg RDL options: staggered-stance RDL (back toe down for balance), kettlebell single-leg RDL (25 lb studio ceiling), or a rack-supported single-leg RDL with a light hand touch — the dumbbell version unassisted is the target we track.',
        exercises: [
          { name: 'Front Rack Reverse Lunge (DB or BB)', sets: '3+3', reps: '6 ea', load: 'Moderate-Heavy — DB ceiling 60 lbs/hand, barbell above that', tempo: '3-1-1, 1s pause at bottom', rest: '75s', cue: 'Step back with control, front knee tracks over toes, pause at depth.', rirNote: '2 RIR' },
          { name: 'Single-Leg RDL (DB)', sets: '3+3', reps: '8 ea', load: 'Wk1: 20 → Wk4: 25 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Slight bend in standing knee, hinge from the hip, reach toward floor, squeeze glute to return. Free hand may lightly touch a rack or wall for balance early on — target is unassisted. Left leg leads first.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'SECONDARY COMPOUND — UPPER PULL & PUSH (SUPERSET)',
        introLabel: 'Format',
        intro: 'Pull leads this session — paired sets, 15 seconds between the pair, full rest after, pulling and pressing alternating throughout. Breathing rule stands on every set here and on every option below. Studio dumbbells top out at 60 lbs per hand; once a press is comfortably there, it moves to the barbell. Vertical pull options: the assisted pull-up machine, a Kieser pulldown, or a band-assisted pull-up — the weighted pull-up is the version we track. Press options: flat barbell bench press, landmine press, or a dumbbell floor press — close-grip bench is what we log. Horizontal pull options: chest-supported row, single-arm landmine row, or a Kieser row — the bent-over barbell row is the tracked version.',
        exercises: [
          { name: 'Weighted Pull-Up or Chin-Up (Paired A1)', sets: '4', reps: '5–6', load: 'BW + load — assisted machine is the step below', tempo: '3-1-1', rest: '15s → A2', cue: 'Full hang, chin clears the bar, controlled 3-count descent.', rirNote: '2 RIR' },
          { name: 'Close-Grip Bench Press (Paired A2)', sets: '5', reps: '6–8', load: 'Heavy — Wk1 conservative → Wk4 top of the band', tempo: '2-1-1', rest: '90s after pair', cue: 'Elbows tucked ~30°, full range, drive to lockout. Exhale on the press — never hold your breath.', rirNote: '2 RIR' },
          { name: 'Bent-Over Barbell Row (Paired B1)', sets: '3', reps: '8', load: 'Heavy — Wk1 conservative → Wk4 top of the band', tempo: '2-1-2', rest: '15s → B2', cue: 'Hip hinge, flat back, pull bar to lower ribs. Exhale on the pull.', rirNote: '2 RIR' },
          { name: 'Standing DB Arnold Press (Paired B2)', sets: '4', reps: '8–10', load: 'Moderate DB — 60 lbs/hand studio ceiling', tempo: '2-1-2', rest: '75s after pair', cue: 'Rotate palms in to out through the press, brace throughout.', rirNote: '1 RIR' },
        ],
      },
      {
        letter: 'F',
        title: 'FULL-BODY INTEGRATION — LOADED CARRY & CORE UNDER LOAD',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closer — the day\'s hinge posture, pulling shoulder position, and bracing all held at once under load and under gait, then a final piece of core work under control. Carry load is anchored to the same 40–50 lbs per hand already proven in the Day A suitcase carry and does not jump ahead of it; past the 60 lb dumbbell ceiling the carry moves to the hex bar rather than climbing further on dumbbells. Distance and posture govern this block, not a rep target. Variations: hex-bar carry, single-side suitcase carry, or a front-rack/goblet carry — the two-hand farmer carry is what we track here.',
        exercises: [
          { name: 'Farmer Carry (Both Hands, DB)', sets: '3', reps: '30–40 yds', load: 'Wk1: 40 → Wk4: 50 lbs/hand', tempo: 'Controlled', rest: '90s', cue: 'Shoulders packed, chest tall, neutral neck. Check HR monitor before the next set — ease pace if approaching 160 bpm.' },
          { name: 'Hanging Leg Raise (or Weighted Plank)', sets: '3', reps: '10–12 or 45s', load: 'Bodyweight', tempo: 'Controlled', rest: '45s', cue: 'No swing, control the lower, full brace throughout. Low HR demand — a safe close to the session.' },
        ],
      },
      {
        letter: 'G',
        title: 'METABOLIC FINISHER — HR-CAPPED',
        color: 'gold',
        introLabel: 'Cardiac-Safe Format — 160 BPM Ceiling, Not a HIIT Finisher',
        intro: 'This closing block is deliberately steady-state-adjacent, not a HIIT interval finisher — the ceiling is 160 bpm and there is no all-out or sprint work anywhere in this program. Heart-rate monitor checked explicitly between every round; extend the easy portion of any round rather than pushing the pace if you approach the ceiling.',
        exercises: [
          { name: 'Bike or Rower — Moderate, HR-Capped Circuit', sets: '4', reps: '1 min moderate pace / 1 min easy', load: 'Moderate effort — never max', tempo: 'Steady, HR-monitored', rest: '—', cue: 'Moderate effort only, no sprinting. Check HR monitor every round; if near 160 bpm, extend the easy minute before continuing.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 10 slow reps. Hip flexor lunge 60s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'Cardiac flag reminder: heart rate must stay under 160 bpm the entire session, monitor worn throughout, checked explicitly during the closing bike/rower circuit and between carry sets. Chest pain, dizziness, shortness of breath disproportionate to effort, or a monitor reading above 160 bpm is a hard stop for that set or the session — flag your coach immediately. Breathing on every loaded compound block: brace before the rep, exhale through the effort, never hold your breath across a rep or a set — this applies to whichever variation you run, not only to the named lift. On the strength side: heavy does not mean near-failure — the main lifts here still finish with 2 reps in reserve, and full recovery between the heaviest sets is what makes the load legitimate.',
  },
];

const summary = {
  subtitle: 'Kayma Liburd  ·  ICONS Index  ·  True Full-Body Advanced Build  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['A', '70%', 'Full-Body — Squat & Push Emphasis (Moderate Day)', 'Barbell Back Squat / Incline DB Bench Press', 'Add load when the top set hits the target reps at 2-3 RIR with clean form. Log every set — this becomes the numeric baseline once a Styku scan and battery are on file. The 160 bpm ceiling applies all session; the closing finisher is where it is checked set by set.'],
    ['B', '80%', 'Full-Body — Hinge & Pull Emphasis (Primary Strength Day)', 'Trap Bar Deadlift / Weighted Pull-Up', 'Same RIR-based rule at the week\'s heaviest loads — main lifts finish at 2 RIR, full recovery between sets, never a grind. The closing bike/rower circuit stays HR-capped and moderate. Prioritize completing the ICONS Baseline Testing Protocol before Week 3 to convert descriptive load bands to tested numbers.'],
  ],
  milestones4wk: 'Complete the Styku scan and the full 11-exercise ICONS Baseline Testing Protocol within the first 2-4 weeks, under continued physician/cardiologist coordination given the cardiac flag — this converts every descriptive load band above into a numeric working weight and unlocks full clinical interpretation (ALST, VFA, BMI) plus your personalized protein and creatine targets. Strength is reassessed on a 4-week cycle from there, so Week 4 is a real checkpoint, not just a calendar mark: re-test the main lifts, log where each one landed, and confirm the heart-rate monitor has not read above 160 bpm in any session — if it has, flag for a programming review before continuing. Week 5, immediately after that check, is the planned deload week (same exercises, sets cut by about a third, loads held) — see the deload note above; the timing can shift a week either way based on how Week 4 actually feels. Until the battery exists, progress load qualitatively: add weight only when the prescribed reps land at the target reps in reserve with clean form.',
  milestones8wk: 'With scan and battery data on file, this plan\'s load prescriptions get rebuilt off your real tested numbers, and the evidence-based nutrition block (protein and creatine targets) gets added once weight is known. Confirm your exact age at that session so age-bracket guidance is set precisely rather than as a working estimate. Weeks 6-8 rebuild from the Week 4 loads toward the 8-week retest. Re-confirm cardiac clearance and coordination status with your physician before increasing conditioning duration or intensity beyond what is prescribed here — and once a tested battery exists, a genuine peak-test day can be scheduled, which is exactly the kind of testing week that earns a top-end intensity session.',
  rescanNote: 'No prior Styku scan exists for this client, so there is no "rescan" in the usual sense yet — this is the baseline scan. Recommend scheduling it at her next session per the ICONS Baseline Testing Protocol; results should be used to revise this document from descriptive to numeric prescriptions. Note the two separate clocks: strength is reassessed every 4 weeks (Week 4 check, Week 5 deload, Weeks 6-8 rebuild), while the Styku body-composition rescan runs on the longer 8-12 week cycle — they are independent tracks that happen to line up at the 8-week mark. Cardiac status and HR-ceiling clearance should be reconfirmed with her physician/cardiologist at or before that session, not assumed to carry forward indefinitely without check-in.',
};

const data = {
  client,
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'kayma_liburd');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Kayma_Liburd_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — no clientHighlight set: this is a
  // from-scratch first build with no Styku/baseline battery on file yet
  // (see "INTAKE GAPS" above), so there is no real PR/prior-version
  // comparison to surface — nothing is fabricated here.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Kayma_Liburd_2Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
