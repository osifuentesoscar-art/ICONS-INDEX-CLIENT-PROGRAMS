/**
 * Nancy Avitable — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * REBUILD 8/13/2026 — Xolokan flagged this document as missing the standard
 * ICONS layout other client profiles carry ("missing the key standard
 * information like the other profiles"). Root cause, confirmed by reading
 * the prior version of this script in full before touching anything (per
 * the standing rule added 8/12/2026 to .claude/agents/icons-expert.md,
 * itself added in direct response to this exact document): there was NO
 * `baselines: []` field at all — every other client document has one — and
 * every exercise load in her program used vague qualitative descriptions
 * ("moderate," "heavy," "light-moderate") because no strength-testing
 * battery existed on file for her, only an isolated hip abduction force
 * test. Xolokan has now supplied a full baseline strength battery (dated
 * 8/13/2026, the date it was captured/entered) to fix this.
 *
 * WHAT WAS PRESERVED EXACTLY FROM THE PRIOR RECORD (nothing dropped/altered
 * without a stated reason — see the report accompanying this rebuild):
 *   - Age 38, no weight/height/full Styku scan on file — still true. The
 *     new data is a strength battery, not a body-composition scan, so
 *     includeNutritionBlock stays false and no age-bracket protein/creatine
 *     tier is fabricated from nothing.
 *   - The hip abduction asymmetry finding verbatim: left peak force 126N
 *     (weaker), right peak force 153N, 17.5% asymmetry, right-dominant —
 *     LEFT leads all unilateral leg work. This remains her standing
 *     clinical/corrective priority and still drives Day 1's left-corrective
 *     emphasis and Day 3's left-volume finishers. Untouched.
 *   - isPostmenopausal: false — no menopause indication in source, still
 *     true; no new data changes this.
 *   - The existing 3-day structure and its intensity/theme framing (Day 1
 *     70% Lower/Left Corrective, Day 2 60% Upper/Mobility, Day 3 80%
 *     Lower/Bilateral Strength + Unilateral Finishers) — preserved. The new
 *     baseline data informs REAL loads within this structure; it did not
 *     require a structural redesign (see Antagonist Rotation Rule audit
 *     note below — the existing structure was already compliant).
 *   - weekOverview still uses generic "DAY 1/2/3" labels — no weekday
 *     schedule was given in the new message either, so none is invented.
 *
 * NEW BASELINE BATTERY (8/13/2026) — HOW EACH MOVEMENT WAS HANDLED:
 * Every movement with a clean weight x reps rep-max format was run through
 * epley1RM()/workingLoad() (Back Squat, Hex Deadlift, Overhead Press,
 * Single-Arm DB Row, DB Split Squat). Two data points were deliberately NOT
 * forced through Epley: Goblet Squat (40 lbs w/ a 10-second isometric hold
 * x10 — the hold changes the loading character, so it's an isometric-loaded
 * baseline, not a standard rep-max) and DB Chest Press (15 lbs, reps not
 * recorded — a working/reference load, not an RM).
 *
 * Of the 11 tested movements, 5 map onto an existing exercise slot in
 * Nancy's current 3-day structure and had their vague load field replaced
 * with a real Week 1 -> Week 4 number:
 *   1. Back Squat (95x8, Epley 1RM ~120) -> Day 3 Block A "Back Squat or
 *      Box Squat" — direct match.
 *   2. Single-Arm DB Row (30x10, Epley 1RM ~40) -> Day 2 Block A
 *      "Single-Arm Row" — direct match.
 *   3. Goblet Squat (40 lbs / 10s hold x10, isometric) -> Day 1 Block B
 *      "Goblet Squat" — direct match, format-adjusted (see note below —
 *      the program's tempo-rep scheme differs from the tested hold format,
 *      so the working load is an informed estimate, not a literal repeat
 *      of the isometric test load).
 *   4. DB Chest Press (15 lbs, JUDGMENT CALL) -> Day 2 Block A "Incline DB
 *      Press". Xolokan's data used no incline qualifier even though
 *      Nancy's existing program has "Incline DB Press" specifically —
 *      these may be the same movement measured informally, or two
 *      genuinely distinct exercises (flat vs. incline angle is a real
 *      mechanical difference). NOT silently renamed/equated — kept as its
 *      own "DB Chest Press" baselines[] row, and used only to INFORM (not
 *      define) Incline DB Press's Week 1 reference load, flagged explicitly
 *      in baselineNotes below as an assumption pending confirmation.
 *   5. DB Split Squat (17.5x10, Epley 1RM ~23, JUDGMENT CALL) -> Day 3
 *      Block A "Weighted Step-Up". No exercise literally named "Split
 *      Squat" exists in Nancy's program; Weighted Step-Up is the closest
 *      analogous loaded, knee-dominant unilateral movement in a primary
 *      strength block (as opposed to Day 1's Reverse Lunge or Day 3's
 *      Curtsy Lunge, both deliberately light/corrective-context finishers
 *      where forcing a heavier baseline-derived load would work against
 *      their actual purpose). Flagged explicitly in baselineNotes below.
 *
 * The remaining 6 tested movements do NOT have a sensible existing slot and
 * were deliberately left as baselines[]-table reference data only, per the
 * "don't force-fit everything" instruction — each with a stated reason:
 *   - Hex Deadlift (135x8, Epley 1RM ~171): NOT used to inform Romanian
 *     Deadlift's load. A trap/hex bar deadlift and a Romanian deadlift are
 *     mechanically distinct lifts with materially different load capacity
 *     (RDL is hamstring/hip-hinge-limited, typically well below a hex DL's
 *     1RM for the same person) — mapping the hex DL number onto the RDL
 *     slot would overstate what the RDL can safely load. Reference only.
 *   - Overhead Press (17.5x10, Epley 1RM ~23): no existing press slot
 *     beyond Incline DB Press; adding a 3rd press exercise to Day 2 to
 *     house this number would be forcing the data rather than serving the
 *     program. Reference only.
 *   - Sled Push (135 lbs): not one of the 10 core ICONS Baseline Testing
 *     Protocol movements — a distance/effort-based push, no rep-max
 *     format, no existing slot. Reference only.
 *   - Plank Hold (2:05 / 125 sec), Push-Up Incline (10 reps), Pull-Up
 *     Assisted (20 reps, the bonus 11th movement): none currently appear
 *     anywhere in Nancy's 3-day structure. Reference only — not forced into
 *     new exercise slots that would expand the program's shape beyond what
 *     this rebuild was scoped to do.
 *
 * AGE BRACKET NOTE: Nancy is 38 -> CLAUDE.md's 35-45 bracket, NOT the 40-55
 * bracket. The "ICONS Index Full-Spectrum Progression Standard" (all 10
 * core baseline movements must show programmed progression) is scoped to
 * women 40-55 and does NOT apply to her as a hard requirement — it's
 * incidental, not a satisfied mandate, that her new battery happens to
 * cover most of the 10 movements.
 *
 * ANTAGONIST ROTATION RULE — retroactive audit (Nancy predates the
 * 8/12/2026 sweep that covered the other 15 client documents). Checked
 * every Compound-zone block, both within each block and across block
 * boundaries within a day. RESULT: no violation found. Every block in this
 * program has only 2 exercises, so a 3-consecutive-same-pattern stack is
 * structurally impossible within any single block; checked across block
 * boundaries too (e.g. Day 3: Back Squat/Weighted Step-Up [knee-dominant]
 * -> Hip Thrust/Nordic Hamstring [hip-dominant] -> Cable Hip
 * Abduction/Curtsy Lunge [frontal-plane/corrective]) and confirmed no run
 * of 3 identical-pattern exercises anywhere in the document. No resequence
 * was needed. Documented here rather than silently doing nothing, per the
 * instruction to actually check, not assume clean.
 *
 * Updated 8/18/2026, from a new real SOAP note (SOAP_NancyAvitable_2026-08-12.pdf,
 * Jason Bethea, upper-body carry/press session explicitly framed around her
 * documented running-knee-health/fat-loss/lower-body-strength goals --
 * continuity, no conflicts with anything already programmed). The full
 * prior record (this header comment and CLIENTS.md's entry) was read in
 * full first, per the standing rule. One new pattern from the note --
 * half-kneeling eccentric push-up -- was reviewed for placement: it fits
 * cleanly as a 3rd exercise in Day 2, Block A ("Push/Pull"), alongside
 * Incline DB Press (push) and Single-Arm Row (pull). Sequence becomes
 * push -> pull -> push, which never stacks 3 consecutive same-pattern
 * exercises -- Antagonist Rotation Rule compliant, no resequence needed.
 * Added as routine supplementary content (task explicitly framed this as
 * not urgent), bodyweight, no baseline weight/rep data given so no
 * baselines[] row was added -- consistent with how her other bodyweight
 * accessory exercises (Face Pulls, Nordic Hamstring, Curtsy Lunge, etc.)
 * are not tracked in that table either.
 *
 * Updated 8/18/2026, second pass, same day (full-detail enhancement pass,
 * Xolokan's direct request -- mine the FULL raw content of the same
 * 8/12/2026 SOAP note for durable Isolated-zone/accessory/activation
 * value, not just the eccentric push-up already added above). Full prior
 * record (this header and CLIENTS.md's entry) re-read in full first, per
 * the standing rule. The note's remaining content is explicitly framed by
 * the PT as direct running-economy transfer given Nancy's documented
 * running-knee-health goal -- that framing is preserved in Block B's intro
 * below rather than treated as generic upper-body accessory work.
 *   - Day 2 warm-up: arm bike (1 min forward + 1 min backward -- the
 *     backward direction deliberately engages the posterior shoulder
 *     differently, per the note) and a mobility-stick shoulder circuit
 *     (overhead pass-throughs, ER with stick, reach + drive, 2x8-10 each)
 *     added ahead of the existing band pull-apart/thoracic-rotation warm-up.
 *   - Day 2, Block A ("Push/Pull"): Standing Resistance Band Chest Press
 *     added as a 4th exercise (no bench support -- real core anti-rotation
 *     demand distinct from the existing Incline DB Press). Sequence becomes
 *     push -> pull -> push -> push (Incline DB Press, Single-Arm Row,
 *     Half-Kneeling Eccentric Push-Up, Standing Band Chest Press) -- the
 *     last two are 2 consecutive push-pattern exercises, never 3 --
 *     Antagonist Rotation Rule compliant, no resequence needed.
 *   - Day 2, Block B ("Accessory"): DB Deadlift -> Farmer Carry Combo,
 *     Static Overhead DB Hold (Walking), and Landmine Shoulder Press
 *     added. Landmine Shoulder Press is deliberately sequenced BETWEEN the
 *     two carry-type additions (Face Pulls -> Farmer Carry -> Landmine
 *     Shoulder Press -> DB Deadlift+Carry Combo -> Static OH DB Hold
 *     Walking) specifically to avoid stacking 3 consecutive loaded-carry-
 *     pattern exercises (Farmer Carry, DB Deadlift+Carry Combo, and Static
 *     OH DB Hold Walking are all carry-pattern) -- the same violation
 *     pattern the Trainer Development Program's retroactive audit found
 *     and fixed for a near-identical 3-carries-in-a-row stack. With the
 *     press inserted, the run is carry(1) -> push -> carry(1) -> carry(1),
 *     max 2 consecutive, compliant.
 * No new baselines[] rows added -- none of this content carries specific
 * tested weight/rep data (consistent with how her other bodyweight/band
 * accessory exercises are handled); loads are described qualitatively,
 * matching the existing "moderate"/"light-mod" convention already used
 * elsewhere in this document for untested accessory work. A new internal
 * baselineNote documents the addition; the exercises/warm-up content
 * themselves stay fully visible in both the trainer document and Client
 * View regardless of that note's audience.
 *
 * Updated 8/18/2026, third pass, same day (warm-up content-drift closeout,
 * confirmed daily-check-in findings -- the Aimee Morris defect class). Full
 * prior record (this header + CLIENTS.md entry) re-read in full first.
 * Three fixes, per the standing rule that a loaded, rep-prescribed movement
 * belongs in an exercise-table row, never in `warmUp` prose:
 *   1. Day 1 warm-up's "dynamic lateral band walks (2x20)" PROMOTED to a
 *      real Lateral Band Walk row, first position in Day 1 Block A
 *      (Activation/Corrective, red) -- it is a named component of the
 *      ACL/knee-valgus corrective circuit, and Nancy is a runner whose #1
 *      goal is running knee health. Block A intro updated to name the
 *      knee-health corrective context. Deliberately NOT the full roster-
 *      wide 20-30 min universal-circuit rollout (that remains CLAUDE.md's
 *      documented deferred item) -- this fixes only the unaudited prose
 *      instance in her document. Antagonist Rotation judgment: Block A is
 *      an Isolated-zone corrective block deliberately concentrated on left
 *      glute med / frontal-plane hip work -- three same-region correctives
 *      in a row is that block's stated purpose, explicitly within
 *      CLAUDE.md's corrective-block judgment carve-out, not a Compound-
 *      zone violation. No resequence.
 *   2. Day 3 warm-up's "2 sets light RDLs" PROMOTED (option taken: promote,
 *      not remove -- Day 3 is her 80% lower day with heavy squatting and a
 *      posterior-chain block, so a light hinge ramp is genuinely useful
 *      priming, and it was prescribed content) into a new Day 3 Block A
 *      "Hinge Priming" (gold, warm-up/priming context), with load stated
 *      as ~50% of Day 1's RDL working load and a technique/submaximal-band
 *      rirNote. Existing Day 3 blocks re-lettered A->B, B->C, C->D.
 *      Antagonist Rotation re-walk with the new row: RDL-ramp (hinge) ->
 *      Back Squat (knee) -> Weighted Step-Up (knee) -> Hip Thrust (hip) ->
 *      Nordic (hamstring) -> Cable Hip Abduction (frontal) -> Curtsy Lunge
 *      -- no 3 consecutive same-pattern anywhere. Compliant.
 *   3. Day 1 RDL's `load: 'moderate'` (her known 8/13 vague-placeholder
 *      issue) replaced with an honest structured instruction: "Establish
 *      Wk1 load at first session -- record" plus a rirNote anchoring the
 *      establishment effort (2 RIR). NO real tested RDL number exists to
 *      anchor a progression to -- the 8/13 Hex Deadlift (135x8) was
 *      deliberately NOT mapped onto RDL (mechanically distinct lift, see
 *      above), and no other hinge rep-max is on file. Nothing invented; a
 *      tested RDL baseline is flagged as still needed in CLIENTS.md.
 * Remaining warm-up content verified against the rule: Day 1 single-leg
 * glute bridges (bodyweight activation), Day 2 arm bike/mobility-stick
 * circuit/band pull-aparts/scapular push-ups (unloaded or bodyweight, all
 * re-checked today), Day 3 hip hinge drill (movement rehearsal, clarified
 * as empty bar/PVC) and band side steps (no rep prescription, activation)
 * -- all legitimately stay in `warmUp`.
 *
 * REVISION (8/19/2026 — ICONS BLOCK METHOD RESTRUCTURE, roster-wide
 * rollout batch 3; CLAUDE.md's "ICONS Block Method" section is the spec,
 * scripts/siobhan_hansen_3day_plan.js the reference implementation; full
 * prior record — this header + CLIENTS.md entry — read in full first).
 * Six-slot order per day (Corrective → Primary Compound → Accessory →
 * Jason's Exercise [conditional] → Secondary Compound → Third Compound/
 * Integration). Organizational restructure — every tested baseline, load,
 * RIR prescription, left-lead flag, and the 8/18 fixes (RDL establish-and-
 * record load, Lateral Band Walk promotion, Hinge Priming block) survive
 * verbatim. Per-day mapping:
 *   DAY 1: slot 1 = Block A (existing hip corrective, unchanged); slot 2 =
 *     Goblet Squat (own primary block, options menu added); slot 3 = the
 *     unilateral left-led pair (Reverse Lunge, Single-Leg Hip Bridge) MOVED
 *     between the two lifts as the accessory block — the one genuine
 *     resequencing on this day (prior rendered order Goblet → RDL →
 *     lunge/bridge; new order Goblet → lunge/bridge → RDL; antagonist walk
 *     re-verified: knee → knee[2, allowed] → hip → hinge[2 hip-extension,
 *     allowed] → sled — clean); slot 4 = OMITTED (Jason's documented
 *     exercises are all from the 8/12 upper-body session and live on Day
 *     2; importing them here would be filler and would raise their weekly
 *     frequency beyond his prescription); slot 5 = Romanian Deadlift (own
 *     secondary block — hinge, rotating off the squat pattern; the 8/18
 *     establish-and-record load + rirNote survive verbatim); slot 6 = NEW
 *     "Full-Body Integration — Sled Push (Controlled)", Wk1 90 → Wk4 105
 *     lbs — anchored BELOW her tested 135 lb sled baseline (8/13 battery),
 *     no invented number; this also resolves the sled baseline's prior
 *     "no existing slot" status honestly. Sled is deliberately apt for a
 *     runner with a knee-health priority: concentric-only leg drive under
 *     gait, no eccentric knee loading.
 *   DAY 2: slot 1 = omitted (no documented upper-body corrective on file;
 *     the arm-bike/stick-circuit activation legitimately stays in warmUp);
 *     slot 2 = Incline DB Press (own primary block, menu); slot 3 =
 *     accessory push/pull (Half-Kneeling Eccentric Push-Up, Face Pulls,
 *     Standing Band Chest Press); slot 4 = "PT-Led Running-Economy Circuit
 *     (Jason Bethea)" — Landmine Shoulder Press, DB Deadlift → Farmer
 *     Carry Combo, Static Overhead DB Hold (Walking): the three most
 *     explicitly PT-framed exercises from his 8/12 SOAP session, kept
 *     together as one continuous PT-continuity block (genuine slot-4
 *     trigger — documented Jason exercises on file); slot 5 = Single-Arm
 *     Row (own secondary block, menu); slot 6 = Farmer Carry moved from
 *     the old accessory block to the integration closer, its vague
 *     "moderate" load upgraded to the establish-and-record instruction
 *     (no tested carry number exists — nothing invented). NOTE on the
 *     8/18 carry-sequencing fix: its PURPOSE (never 3 consecutive
 *     carry-pattern exercises) is preserved under the new order — the
 *     rendered walk is push, push, pull, push, push, carry, carry, pull,
 *     carry — max 2 consecutive of any pattern; re-verified in full since
 *     the slot mapping moved Farmer Carry out of the old position.
 *   DAY 3: slot 1 = Hinge Priming (8/18 block, unchanged — genuine
 *     priming serving the corrective slot); slot 2 = Back Squat or Box
 *     Squat (own primary block, menu); slot 3 = Weighted Step-Up (own
 *     accessory block; internal flag + informed load survive verbatim);
 *     slot 4 = OMITTED (same reason as Day 1); slot 5 = Hip Thrust +
 *     Nordic Hamstring (secondary posterior-chain block; Hip Thrust's
 *     vague "moderate-heavy" load upgraded to establish-and-record — no
 *     tested hip-thrust number exists in her battery); slot 6 = NEW
 *     "Full-Body Integration — Sled Push (Drive)", Wk1 105 → Wk4 135 lbs
 *     (Wk4 = the tested baseline itself, never beyond it). The left-side
 *     volume finishers stay in their documented closing-corrective
 *     position ahead of the sled (their end-of-session placement is a
 *     stated design choice: "finish with unilateral sets focused on left
 *     quality").
 * TOUCH-RULE CHANGES in the same pass: (1) Cable Hip Abduction renamed
 * "Hip Abduction — Kieser (Left)" per the studio's Kieser-as-cable-machine
 * inventory rule (band alternative named in the cue); (2) retired-language
 * fix, Nicolette Scott precedent — the "Watch — Asymmetry Alert" note
 * cited "the 0.5-unit asymmetry threshold" (the retired absolute trigger):
 * reworded to the corrected ≥10% relative standard, which her 17.5%
 * functional-strength-test gap clears decisively (a functional test is the
 * corrected standard's PREFERRED primary trigger, so the prescription is
 * strengthened, not changed); (3) provenance-drift cue cleanup ("New this
 * update", "per the 8/12 PT session") reworded to client-appropriate
 * language per the Client View standard — these fields have no audience
 * filter; (4) deload call: PROACTIVE Week 5 (grounds: an 8-week
 * continuous-progression arc to the retest, plus a standing coordinated-
 * care relationship with Jason Bethea) — new blue client-visible note,
 * milestones/rescanNote reconciled to the Wk4-check → Wk5-deload →
 * Wk6-8-rebuild arc; (5) 4-week strength / 8-12-week Styku reassessment-
 * cadence split stated in the summary fields; (6) warm-up drift re-checked
 * on all three days — nothing further to promote (all remaining prose
 * content is unloaded/bodyweight activation or movement rehearsal);
 * (7) options menus on every compound slot, constraint-filtered: KB goblet
 * variants EXCLUDED (her 35-40 lb goblet loads exceed the studio's 25 lb
 * KB ceiling), hex-bar deadlift deliberately NOT listed as an RDL
 * alternate (would imply the 135 lb hex baseline transfers to the RDL —
 * the exact mapping the 8/13 rebuild explicitly refused), left-led side
 * rules restated on every unilateral option, sled/carry options stay
 * distance-and-quality governed.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad,
} = require('../icons_template');

// ── Convert new baseline weight/rep data into working loads ────────────
const oneRM = {
  backSquat: epley1RM(95, 8),   // 120
  hexDL: epley1RM(135, 8),      // 171 — reference only, see header note
  ohp: epley1RM(17.5, 10),      // 23 — reference only, see header note
  row: epley1RM(30, 10),        // 40
  splitSquat: epley1RM(17.5, 10), // 23
};

const wk1 = {
  backSquat: workingLoad(oneRM.backSquat, 0.75, 5),   // 90
  row: workingLoad(oneRM.row, 0.75, 2.5),             // 30
  splitSquat: workingLoad(oneRM.splitSquat, 0.75, 2.5), // 17.5
  // Not Epley-derived — isometric-loaded / no-rep-data baselines, see header note.
  gobletSquat: 35,
  chestPress: 15,
};

const wk4 = {
  backSquat: workingLoad(oneRM.backSquat, 0.85, 5),   // 100
  row: workingLoad(oneRM.row, 0.85, 2.5),             // 35
  splitSquat: workingLoad(oneRM.splitSquat, 0.85, 2.5), // 20
  gobletSquat: 40,
  chestPress: 17.5,
};

const client = {
  name: 'Nancy Avitable',
  programTitle: '3-Day Training Plan',
  subtitle: 'Left Hip Corrective & Unilateral Strength Build',
  stats: ['Age 38', 'Hip Abduction Test 8/3/2026', 'L 126N / R 153N — 17.5% Asymmetry', 'Strength Baseline 8/13/2026', '3-Day Program'],
  ageYears: 38,
  isPostmenopausal: false,
};

const weekOverview = [
  { day: 'DAY 1', intensity: 70, focus: 'Lower Body —\nLeft Hip Corrective' },
  { day: 'DAY 2', intensity: 60, focus: 'Upper Body —\nStability & Posterior Chain' },
  { day: 'DAY 3', intensity: 80, focus: 'Lower Body —\nBilateral Strength + Unilateral Finishers' },
];

const baselines = [
  ['Back Squat', `95 lbs x 8 (Epley 1RM ≈${oneRM.backSquat} lbs)`, '8/13/2026', `Wk1: ${wk1.backSquat} lbs x5 → Wk4: ${wk4.backSquat} lbs x5 — Day 3 Block B primary strength lift`],
  ['Single-Arm DB Row', `30 lbs x 10 (Epley 1RM ≈${oneRM.row} lbs)`, '8/13/2026', `Wk1: ${wk1.row} lbs x8 → Wk4: ${wk4.row} lbs x8 — Day 2 Block A`],
  ['Goblet Squat', '40 lbs w/ 10-sec isometric hold x 10 (isometric-loaded — not run through Epley formula)', '8/13/2026', `Wk1: ${wk1.gobletSquat} lbs x6-8 (tempo) → Wk4: ${wk4.gobletSquat} lbs x6-8 — Day 1 Block B, adjusted for the program's tempo-rep format vs. the tested hold format`],
  ['DB Chest Press', '15 lbs (reps not recorded — working/reference load, not a rep-max)', '8/13/2026', `Informs Day 2 Block A Incline DB Press Wk1: ${wk1.chestPress} lbs/hand → Wk4: ${wk4.chestPress} lbs/hand`],
  ['DB Split Squat', `17.5 lbs/hand x 10 (Epley 1RM ≈${oneRM.splitSquat} lbs)`, '8/13/2026', `Informs Day 3 Block B Weighted Step-Up Wk1: ${wk1.splitSquat} lbs/hand → Wk4: ${wk4.splitSquat} lbs/hand`],
  ['Hex Deadlift (Trap Bar)', `135 lbs x 8 (Epley 1RM ≈${oneRM.hexDL} lbs)`, '8/13/2026', 'Reference baseline only — deliberately NOT used to set the Romanian Deadlift load (mechanically distinct lift, different load capacity). Revisit if a dedicated hex-bar deadlift is added to the program.'],
  ['Overhead Press', `17.5 lbs x 10 (Epley 1RM ≈${oneRM.ohp} lbs) — format as reported, no seated/standing qualifier given`, '8/13/2026', 'Reference baseline only — Incline DB Press covers the week\'s pressing progression; a third pressing exercise is not force-fit in.'],
  ['Sled Push', '135 lbs', '8/13/2026', 'Now programmed as the closing integration work: Day 1 controlled push Wk1: 90 lbs → Wk4: 105 lbs; Day 3 drive push Wk1: 105 lbs → Wk4: 135 lbs (the tested load). Distance & quality governed.'],
  ['Plank Hold', '2:05 (125 sec)', '8/13/2026', 'Reference baseline only — not currently a programmed exercise in this 3-day plan.'],
  ['Push-Up (Incline)', '10 reps', '8/13/2026', 'Reference baseline only — not currently a programmed exercise in this 3-day plan.'],
  ['Pull-Up (Assisted)', '20 reps', '8/13/2026', 'Reference baseline only — bonus 11th ICONS protocol movement; not currently a programmed exercise in this 3-day plan.'],
];

const baselineNotes = [
  {
    type: 'teal',
    label: 'Styku Finding — Hip Abduction Asymmetry',
    body: 'Isolated hip abduction test: left peak force 126N (weaker side), right peak force 153N. Asymmetry 17.5%, right-dominant. Recommends left-side emphasis and a unilateral corrective pathway.',
  },
  {
    type: 'watch',
    label: 'Watch — Asymmetry Alert',
    body: 'The 17.5% left/right gap on the hip abduction force test clears the ≥10% relative asymmetry threshold decisively — and a functional strength test like this one is exactly the kind of measurement the asymmetry protocol treats as its primary trigger. Lead every unilateral exercise with the LEFT (weaker) side per protocol.',
  },
  {
    type: 'red',
    label: 'Corrective Priority',
    body: 'Left glute medius activation and unilateral loading take precedence this block. Track left vs. right performance separately; re-test at 8-week rescan.',
  },
  {
    type: 'gold',
    label: 'New Strength Baseline Battery — 8/13/2026',
    audience: 'internal',
    body: `Nancy's first full strength-testing battery (11 movements) is now on file — see the table above. Five movements map directly onto an existing exercise slot and now carry real Week 1 → Week 4 loads in place of the prior "moderate"/"heavy" placeholders: Back Squat and Single-Arm DB Row (both Epley-derived), Goblet Squat (isometric-hold-informed, not Epley — see table note), and (via two flagged judgment calls below) Incline DB Press and Weighted Step-Up. The remaining six movements (Hex Deadlift, Overhead Press, Sled Push, Plank Hold, Push-Up Incline, Pull-Up Assisted) don't have a defensible existing slot in this 3-day structure and are logged as reference baselines only, not force-fit into the program. Nancy is 38 (CLAUDE.md's 35-45 bracket) — the 40-55 "all 10 core movements must show programmed progression" standard does not apply to her; broad battery coverage here is a good outcome, not a satisfied mandate.`,
  },
  {
    type: 'watch',
    label: 'Judgment Call — DB Chest Press vs. Incline DB Press',
    audience: 'internal',
    body: `Xolokan's baseline data lists "DB Chest Press" at 15 lbs with no incline qualifier, while Nancy's existing Day 2 program already includes "Incline DB Press." These are not silently treated as identical — flat and incline pressing are a real mechanical difference. Kept as a distinct baselines-table entry; the 15 lbs figure is used only to INFORM a reasonable Week 1 reference load (${wk1.chestPress} lbs/hand → ${wk4.chestPress} lbs/hand) for the existing Incline DB Press slot, not presented as a confirmed test of that specific exercise. Confirm with Nancy/trainer notes whether these were the same movement.`,
  },
  {
    type: 'watch',
    label: 'Judgment Call — DB Split Squat vs. Weighted Step-Up',
    audience: 'internal',
    body: `No exercise literally named "Split Squat" exists in Nancy's program. Weighted Step-Up (Day 3 Block C as of the 8/19 restructure, a loaded unilateral knee-dominant movement) is the closest analogous slot — closer than Day 1's Reverse Lunge or Day 3's Curtsy Lunge, both of which are deliberately light, corrective-context finishers where a heavier baseline-derived load would work against their actual purpose. The DB Split Squat baseline (${wk1.splitSquat} lbs/hand → ${wk4.splitSquat} lbs/hand) is used to inform Weighted Step-Up's Week 1 → Week 4 load on that basis.`,
  },
  {
    type: 'teal',
    label: 'Perimenopausal Status — Not Assessed at Intake',
    audience: 'internal',
    body: 'No menstrual irregularity, vasomotor symptoms (hot flashes/night sweats), sleep disruption, or mood-change data was reported at intake. Per CLAUDE.md\'s "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" guidance, perimenopausal symptoms can begin in the early-to-mid 30s, well before the ~45 average onset — "she\'s too young for this" is not a safe assumption to bring into a 35-45 bracket intake. Nancy is 38; isPostmenopausal is correctly left false since nothing was reported, not assumed false by age. Revisit if symptom data becomes available at a future session.',
  },
  {
    type: 'green',
    label: 'PT Update — 8/12/2026 Session (Jason Bethea)',
    audience: 'internal',
    body: 'New SOAP note (SOAP_NancyAvitable_2026-08-12.pdf) — an upper-body carry/press session explicitly framed around Nancy\'s documented running-knee-health/fat-loss/lower-body-strength goals, continuity with no conflicts against anything already programmed. One new pattern, half-kneeling eccentric push-up, is added to Day 2 Block A (Push/Pull) as a push-pattern accessory alongside Incline DB Press and Single-Arm Row — push→pull→push sequencing, Antagonist Rotation Rule compliant, no resequence needed.',
  },
  {
    type: 'green',
    label: 'PT Update — 8/12/2026 Session, Additional Activation & Accessory Detail (Jason Bethea)',
    audience: 'internal',
    body: 'The same SOAP note above documented a fuller upper-body carry/press circuit than the eccentric push-up alone captured — explicitly framed by the PT as direct running-economy transfer given Nancy\'s running-knee-health goal (see Block B\'s intro below). Folded in this update: (1) arm bike warm-up (1 min forward + 1 min backward) and a mobility-stick shoulder circuit, added to Day 2\'s warm-up; (2) Standing Resistance Band Chest Press, a core-anti-rotation pressing accessory, added to Day 2 Block A; (3) DB Deadlift → Farmer Carry Combo, Static Overhead DB Hold (Walking), and Landmine Shoulder Press added to Day 2 Block B — the press is deliberately sequenced between the two carry-pattern additions to avoid stacking 3 consecutive loaded-carry exercises (Farmer Carry / DB Deadlift+Carry Combo / Static OH Hold Walking are all carry-pattern), per the Antagonist Rotation Rule.',
  },
  {
    type: 'blue',
    label: 'Planned Deload — Week 5, Directly After the Week 4 Strength Check',
    body: 'This program deliberately includes one lighter week, and it is planned, not a reaction to anything going wrong. Week 5 — immediately after the Week 4 strength check — is a structured deload: the same exercises and movement patterns, with sets reduced by roughly a third, every set held comfortably in the technique band (3 or more reps in reserve), and loads held at Week 3-4 levels rather than climbing — the usual add-weight rule pauses for this one week. For a runner training three days a week on top of her mileage, this is how the strength built in Weeks 1-4 consolidates without the knees or hips ever carrying accumulating fatigue into a run. One light week costs nothing that matters: muscle built over the previous month is not lost in a single reduced-volume week — only a small edge of peak strength dips, and it returns within days. Weeks 6-8 then rebuild from the Week 4 loads toward the Week 8 retest.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Session Architecture — ICONS Block Method Restructure (8/19/2026)',
    body: 'Restructured to the ICONS Block Method six-slot session architecture (Corrective → Primary Compound → Accessory → Jason\'s Exercise → Secondary Compound → Third Compound/Integration; see CLAUDE.md). Organizational — every tested baseline, load, RIR prescription, left-lead flag, and the 8/18 fixes (RDL establish-and-record, Lateral Band Walk promotion, Hinge Priming block) survive verbatim. Slot 4 fires on Day 2 only (the three most explicitly PT-framed exercises from Jason Bethea\'s 8/12 SOAP session grouped as one continuity block); omitted Days 1/3 — his documented content is upper-body-session-specific and importing it would exceed his prescribed frequency. One genuine resequence: Day 1\'s unilateral left-led pair now sits between the Goblet Squat and the RDL (antagonist walk re-verified clean); Day 2\'s Farmer Carry moved to the integration closer — the 8/18 no-3-consecutive-carries fix\'s purpose holds under the new order (max 2 consecutive carry-pattern exercises, re-walked in full). New integration closers anchor to her tested 135 lb sled baseline (Day 1: 90→105; Day 3: 105→135, never beyond the tested number). Touch-rule changes this pass: Cable Hip Abduction renamed to Kieser per studio inventory; the asymmetry note\'s retired 0.5-absolute-trigger language corrected to the ≥10% relative standard (her 17.5% functional-test gap clears it — prescription unchanged, Nicolette Scott precedent); provenance-drift cue language ("New this update," dated session references) reworded client-appropriate; Hip Thrust and Farmer Carry vague loads upgraded to establish-and-record instructions (no tested numbers exist — nothing invented; capture both at the next battery); proactive Week 5 deload added; 4-week strength / 8-12-week Styku cadence split stated in the summary. Options menus constraint-filtered: no KB goblet variants (35-40 lb loads exceed the 25 lb KB ceiling), no hex-bar-deadlift RDL alternate (would imply the refused 8/13 load mapping), left-led rules restated per unilateral option.',
  },
  {
    type: 'gold',
    label: 'Warm-Up Content Promoted to Tracked Rows — 8/18/2026',
    audience: 'internal',
    body: 'Per the standing warm-up content-drift rule (a loaded, rep-prescribed movement belongs in an exercise-table row, not warmUp prose): (1) Day 1\'s "dynamic lateral band walks (2×20)" is now a tracked Lateral Band Walk row leading Block A — a named ACL/knee-valgus corrective-circuit component, and Nancy is a runner whose #1 goal is running knee health; the full 20-30 min/1-2x-week universal-circuit rollout remains CLAUDE.md\'s deferred roster-wide item, this fixes only the unaudited prose instance. (2) Day 3\'s "2 sets light RDLs" is now a Hinge Priming block (new Block A; prior blocks re-lettered B/C/D) loaded at ~50% of Day 1\'s RDL working load. (3) Day 1 RDL\'s vague "moderate" load replaced with an explicit establish-and-record instruction — NO tested RDL baseline exists (the 8/13 Hex Deadlift was deliberately not mapped onto RDL, mechanically distinct lift), so nothing was invented. Trainer: set the Wk1 RDL load at 2 RIR at the next session, record it here, and capture a tested RDL number at the next baseline battery.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Lower Body (Left Corrective)',
    subtitle: 'Hip Abduction Emphasis — Unilateral Control',
    descriptor: 'Left-Side Corrective Emphasis',
    intensityLabel: '70% Day',
    intensityPara: 'Prioritise left-side unloading and glute med activation to correct the 17.5% hip abduction asymmetry flagged above.',
    warmUp: '5–7 min cycle + single-leg glute bridges 2×10 each side',
    blocks: [
{
        letter: 'A',
        title: 'Activation / Corrective',
        color: 'red',
        introLabel: 'Why',
        intro: 'Three exercises to re-balance left glute med activation and support running knee health — lateral hip strength directly supports knee tracking on every run.',
        exercises: [
          { name: 'Lateral Band Walk', sets: '2', reps: '20 steps ea. dir.', load: 'mini-band — light-mod', tempo: 'controlled', rest: '30s', cue: 'Knees track over toes; keep band tension', flag: 'Knee-health corrective — runner priority' },
          { name: 'Side-Lying Hip Abduction (Slow)', sets: '3', reps: '12', load: 'bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Lead with heel; no pelvic tilt; 1-2s hold top', flag: 'Left focus' },
          { name: 'Banded Standing Hip Abduction (Left Emphasis)', sets: '3', reps: '10', load: 'band', tempo: '2-0-1', rest: '30s', cue: 'Drive lateral glute; 2s hold; +2 reps left', flag: 'Left corrective' },
        ],
      },
{
        letter: 'B',
        title: 'Primary Compound — Goblet Squat',
        introLabel: 'Load Target',
        intro: 'Build bilateral strength while preserving left control. Goblet Squat Week 1 load is informed by the 8/13 baseline test (40 lbs w/ 10-sec hold x10) — adjusted for this block\'s tempo-rep format, not a literal repeat of the isometric test load. If the day calls for a variation, rotate between: a box squat (depth set by the box — useful on a heavy-legged running week) or a supported split-stance squat (left leg leads). The goblet squat stays the lift we track and progress.',
        exercises: [
          { name: 'Goblet Squat', sets: '4', reps: '6-8', load: `Wk1: ${wk1.gobletSquat} lbs → Wk4: ${wk4.gobletSquat} lbs`, tempo: '2-0-2', rest: '90s', cue: 'Braced core; track knees; depth to parallel', rirNote: '2 RIR' },
        ],
      },
{
        letter: 'C',
        title: 'Accessory — Unilateral Strength (Left-Led)',
        introLabel: 'Why',
        intro: 'The unilateral accessory work directly behind the squat — left leg leads both movements, keeping the corrective priority active under real training volume.',
        exercises: [
          { name: 'Reverse Lunge (Left-Led)', sets: '3', reps: '8 each', load: 'bodyweight / light', tempo: '2-0-1', rest: '60s', cue: 'Step back with control; emphasise L push-off', flag: 'Left corrective' },
          { name: 'Single-Leg Hip Bridge (Left Focus)', sets: '3', reps: '10', load: 'bodyweight', tempo: '2-0-1', rest: '45s', cue: 'Drive left glute; 1s pause top; no knee cave', flag: 'Left corrective' },
        ],
      },
{
        letter: 'D',
        title: 'Full-Body Integration — Sled Push (Controlled)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — leg drive, bracing, and gait in one movement, pulling the day\'s squat, lunge, and hinge patterns together. Deliberately runner-friendly: the sled loads the legs concentrically with no eccentric knee stress, so it builds drive without adding next-run soreness. Loads build from well below the tested 135 lb baseline. Distance and movement quality govern this work, not a rep count. A light farmer carry or suitcase carry (alternating sides evenly) covers the same closing ground when the sled is unavailable.',
        exercises: [
          { name: 'Sled Push (Controlled)', sets: '3', reps: '20-25 yd', load: 'Wk1: 90 lbs → Wk4: 105 lbs', tempo: 'controlled', rest: '90s', cue: 'Tested 135 lbs. Low hips, long spine, full-foot drive — smooth, not sprinting.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
{
        letter: 'E',
        title: 'Secondary Compound — Romanian Deadlift',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — a hip hinge, rotating off the squat and lunge work above. If the day calls for a variation, rotate between: a B-stance RDL (rear foot down for balance, left leg takes the working share) or a barbell RDL from the rack. The Romanian deadlift stays the lift we track — set its Week 1 load at the first session and record it.',
        exercises: [
          { name: 'Romanian Deadlift', sets: '3', reps: '8', load: 'Establish Wk1 load at first session — record', tempo: '2-0-2', rest: '90s', cue: 'Hinge at hips; feel posterior chain tension', rirNote: '2 RIR — use to set Wk1 load' },
        ],
      },
      ],
    coolDown: '8–10 min mobility and glute release',
    iconsNote: 'Emphasise tempo and control on left side. Use lighter load and perfect technique before progressing. The closing sled push puts the day\'s leg drive to work under gait — smooth and controlled today, never a sprint.',
  },
  {
    intensity: 60,
    title: 'Day 2 — Upper / Mobility',
    subtitle: 'Upper Stability + Posterior Chain',
    descriptor: 'Lower Load — Mobility Emphasis',
    intensityLabel: '60% Day',
    intensityPara: 'Lower overall load; emphasise shoulder and thoracic mobility.',
    warmUp: 'Arm bike 1 min forward + 1 min backward (upper-body cardio + shoulder circulation — a PT-led detail: the backward direction deliberately engages the posterior shoulder differently). Mobility stick shoulder circuit: overhead pass-throughs 2x8-10, external rotation with stick 2x8-10, reach + drive 2x8-10. Then: band pull-aparts, thoracic rotations, 3×10 scapular push-ups.',
    blocks: [
      {
        letter: 'A',
        title: 'Primary Compound — Incline DB Press',
        introLabel: 'Load Target',
        intro: 'Incline DB Press Week 1 load is informed by the 8/13 baseline test ("DB Chest Press," 15 lbs). If the day calls for a variation, rotate between: a flat DB bench press, a low-incline barbell press from the rack, or a Kieser chest press. The incline DB press stays the lift we track and progress.',
        exercises: [
          { name: 'Incline DB Press', sets: '4', reps: '8', load: `Wk1: ${wk1.chestPress} lbs/hand → Wk4: ${wk4.chestPress} lbs/hand`, tempo: '2-0-1', rest: '90s', cue: 'Control descent', flag: 'Load informed by DB Chest Press baseline — see note', flagAudience: 'internal' },
        ],
      },
      {
        letter: 'B',
        title: 'Accessory — Push/Pull Control',
        introLabel: 'Why',
        intro: 'Tempo and control accessories behind the press: a slow eccentric push-up, rear-delt/rotator health work, and a standing band press with a real core anti-rotation demand — no bench support.',
        exercises: [
          { name: 'Half-Kneeling Eccentric Push-Up', sets: '3', reps: '6-8', load: 'bodyweight', tempo: '4-0-1', rest: '45s', cue: 'Half-kneeling stance (one knee down); slow 4-sec controlled lower, drive back up.' },
          { name: 'Face Pulls', sets: '3', reps: '15', load: 'band', tempo: '2-0-1', rest: '45s', cue: 'High elbows; squeeze rear delts' },
          { name: 'Standing Resistance Band Chest Press', sets: '3', reps: '10-12', load: 'light-mod band', tempo: '2-1-2', rest: '45s', cue: 'No bench support — standing, anti-rotation core demand throughout. Press straight ahead, resist trunk rotation, control the return.' },
        ],
      },
      {
        letter: 'C',
        title: 'PT-Led Running-Economy Circuit (Jason Bethea)',
        color: 'green',
        introLabel: 'Why',
        intro: 'Carried into this session from her PT-led work with Jason Bethea, Brace Life\'s in-house Trainer/Physical Therapist — three drills chosen for direct running-economy transfer given her running-knee-health goal: grip, gait, and anti-lateral-flexion core demand under load carry over directly to running mechanics.',
        exercises: [
          { name: 'Landmine Shoulder Press', sets: '3', reps: '8-10/side', load: 'light-mod — coach discretion', tempo: '2-1-2', rest: '60s', cue: 'Scap-friendly unilateral press — the landmine angle reduces shoulder impingement risk vs. a straight vertical press.' },
          { name: 'DB Deadlift → Farmer Carry Combo', sets: '3', reps: '6-8 DL into 20-30 yd carry', load: 'moderate — coach discretion', tempo: 'controlled', rest: '75s', cue: 'Hinge into an immediate loaded carry — grip, gait, and anti-lateral-flexion core demand in one continuous drill.', insight: 'Hinge + loaded-carry combination targets the same grip, gait, and core-stability qualities that support running mechanics.' },
          { name: 'Static Overhead DB Hold (Walking)', sets: '2-3', reps: '20-30 yd', load: 'light-mod DB — coach discretion', tempo: 'controlled walk', rest: '60s', cue: 'Overhead isometric hold while walking — shoulder stability, thoracic extension, core anti-extension, and gait control combined.' },
        ],
      },
      {
        letter: 'D',
        title: 'Secondary Compound — Single-Arm Row',
        introLabel: 'Load Target',
        intro: `The day's second compound pattern — pulling, rotating off the pressing work above. Loads build directly off the tested baseline (30 lbs x10, Epley 1RM ≈${oneRM.row} lbs). If the day calls for a variation, rotate between: a chest-supported row, a Kieser row, or a bent-over barbell row. The single-arm row stays the lift we track and retest.`,
        exercises: [
          { name: 'Single-Arm Row', sets: '4', reps: '8 each', load: `Wk1: ${wk1.row} lbs → Wk4: ${wk4.row} lbs`, tempo: '2-0-1', rest: '60s', cue: 'Pull to the hip; maintain neutral spine' },
        ],
      },
      {
        letter: 'E',
        title: 'Full-Body Integration — Farmer Carry',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — the day\'s pressing posture, pulling strength, and core control held together under gait. Distance and movement quality govern this work, not a rep count. A suitcase carry (alternating sides evenly) or a goblet carry covers the same closing ground when variety suits the day.',
        exercises: [
          { name: 'Farmer Carry', sets: '3', reps: '30s', load: 'Establish working load at first session — record', tempo: '—', rest: '60s', cue: 'Tall posture; tight core. Add load only when every step stays tall and level.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
    ],
    coolDown: 'Lat stretch and foam rolling',
    iconsNote: 'Use this session to improve movement quality and recovery. The PT-led circuit is direct running-economy work, not filler — treat its quality bar the same as the main lifts.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Lower Body (Strength + Unilateral)',
    subtitle: 'Build Strength; Progressive Overload With Unilateral Finishers',
    descriptor: 'Higher Intensity — Left-Volume Maintenance',
    intensityLabel: '80% Day',
    intensityPara: 'Higher intensity to drive strength adaptations; include left-volume maintenance.',
    warmUp: 'Hip hinge drill (empty bar or PVC — movement rehearsal), activation band side steps',
    blocks: [
{
        letter: 'A',
        title: 'Hinge Priming',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Light hinge priming before the heavy work — wake up the posterior chain without spending strength. This is preparation, not a work set.',
        exercises: [
          { name: 'Romanian Deadlift (Light Ramp-Up)', sets: '2', reps: '8', load: '~50% of Day 1 RDL working load', tempo: '2-0-2', rest: '60s', cue: 'Crisp hinge; prime hamstrings — no grind', rirNote: '3+ RIR — technique/submaximal' },
        ],
      },
{
        letter: 'B',
        title: 'Primary Compound — Back Squat',
        introLabel: 'Load Target',
        intro: `Back Squat tested at 95 lbs x8 (Epley 1RM ≈${oneRM.backSquat} lbs) — Week 1 trains at ${wk1.backSquat} lbs, climbing to ${wk4.backSquat} lbs by Week 4. If the day calls for a variation, rotate between: a box squat (depth set by the box, already the built-in alternate), a goblet squat at its own Day 1 working loads, or a supported split-stance squat (left leg leads). The back squat stays the lift we track and retest.`,
        exercises: [
          { name: 'Back Squat or Box Squat', sets: '5', reps: '5', load: `Wk1: ${wk1.backSquat} lbs → Wk4: ${wk4.backSquat} lbs`, tempo: '2-0-2', rest: '2m', cue: 'Braced core; safe depth', rirNote: '1-2 RIR' },
        ],
      },
{
        letter: 'C',
        title: 'Accessory — Weighted Step-Up',
        introLabel: 'Load Target',
        intro: `The unilateral accessory behind the squat. Week 1 load is informed by the DB Split Squat baseline (${wk1.splitSquat} lbs/hand). A DB split squat (the tested pattern itself) or a reverse lunge (left leg leads) rotates in cleanly when the day calls for it.`,
        exercises: [
          { name: 'Weighted Step-Up', sets: '3', reps: '6 each', load: `Wk1: ${wk1.splitSquat} lbs/hand → Wk4: ${wk4.splitSquat} lbs/hand`, tempo: '2-0-1', rest: '90s', cue: 'Drive through heel; control descent', flag: 'Load informed by DB Split Squat baseline — see note', flagAudience: 'internal' },
        ],
      },
{
        letter: 'D',
        title: 'Full-Body Integration — Sled Push (Drive)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — the day\'s squat, hinge, and hip-extension strength expressed as one full-body drive under gait. Loads build toward the tested 135 lb baseline by Week 4, never beyond it this block. Distance and movement quality govern this work, not a rep count. A loaded farmer carry covers the same closing ground when the sled is unavailable.',
        exercises: [
          { name: 'Sled Push (Drive)', sets: '3', reps: '15-20 yd', load: 'Wk1: 105 lbs → Wk4: 135 lbs', tempo: 'strong, controlled drive', rest: '2 min', cue: 'Tested 135 lbs. Low hips, arms long, drive the floor back — full recovery between pushes.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
{
        letter: 'E',
        title: 'Secondary Compound — Hip Thrust & Posterior Chain',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — hip extension, rotating off the knee-dominant work above. Hip thrust was not part of the tested battery: set its Week 1 load at the first session and record it. If the day calls for a variation, rotate between: a glute bridge (floor), a single-leg glute bridge (left leg leads), or a B-stance hip thrust (left leg takes the working share). The hip thrust stays the lift we track.',
        exercises: [
          { name: 'Hip Thrust', sets: '4', reps: '8', load: 'Establish Wk1 load at first session — record', tempo: '2-0-1', rest: '90s', cue: 'Full hip extension; hold 1s top', rirNote: '2 RIR — use to set Wk1 load' },
          { name: 'Nordic Hamstring (Assisted)', sets: '3', reps: '6-8', load: 'bodyweight', tempo: '2-0-2', rest: '90s', cue: 'Slow eccentric; control' },
        ],
      },
{
        letter: 'F',
        title: 'Left-Side Volume Finishers',
        color: 'red',
        exercises: [
          { name: 'Hip Abduction — Kieser (Left)', sets: '3', reps: '12', load: 'light-moderate', tempo: '2-0-1', rest: '45s', cue: 'Kieser machine (or ankle band). Slow control; add 2 extra reps on L', flag: 'Left corrective' },
          { name: 'Curtsy Lunge (Left Lead)', sets: '3', reps: '10', load: 'bodyweight', tempo: '2-0-1', rest: '45s', cue: 'Focus on L glute drive' },
        ],
      },
      ],
    coolDown: 'Hamstring and lateral banded mobility',
    iconsNote: 'Push load on bilateral lifts, finish the unilateral sets focused on left quality, then close with the sled drive — the strength built today expressed as one movement. Full recovery between sled pushes.',
  },
];

const summary = {
  subtitle: 'Nancy Avitable  ·  ICONS Index  ·  Left Hip Corrective & Unilateral Strength Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Lower Body — Left Hip Corrective', `Goblet Squat (${wk1.gobletSquat}→${wk4.gobletSquat} lbs)`, 'Left-side unloading emphasis; corrective circuit precedes compound work'],
    ['2', '60%', 'Upper Body — Stability & Posterior Chain', `Single-Arm DB Row (${wk1.row}→${wk4.row} lbs)`, 'Lower load week focused on movement quality and mobility'],
    ['3', '80%', 'Lower Body — Bilateral Strength + Unilateral Finishers', `Back Squat (${wk1.backSquat}→${wk4.backSquat} lbs)`, 'Higher intensity strength day; finish with left-focused unilateral volume'],
  ],
  milestones4wk: `Reduce asymmetry below 10% and increase left hip abduction force by 10-15%. Back Squat progressing toward ${wk4.backSquat}+ lbs x5 at 1-2 RIR; Single-Arm Row toward ${wk4.row} lbs x8; sled push at 105 lbs (Day 1) and 135 lbs (Day 3) with clean drive. Week 4 closes with the strength check; Week 5 that follows is the planned deload week — same exercises, reduced sets, loads held (see the deload note above) — before Weeks 6-8 rebuild.`,
  milestones8wk: `Symmetry within 5–8%; L and R hip abduction within 5%. Retest the 8/13/2026 strength battery at the end of the Weeks 6-8 rebuild — target measurable gains across Back Squat, Single-Arm DB Row, Goblet Squat, and DB Split Squat, plus first recorded RDL, Hip Thrust, and Farmer Carry working loads on file.`,
  rescanNote: 'Two clocks run here: strength is re-checked every 4 weeks (the Week 4 check, then the Week 8 full battery retest at the end of the rebuild that follows the planned Week 5 deload), while a Styku body-composition scan runs on its own 8-12-week cadence — book one in that window to assess asymmetry and lean-mass trends. Continue left-focused progression if the asymmetry persists.',
};

const data = {
  client,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

// Client View (added 8/17/2026; re-checked 8/19/2026 with the Block Method
// restructure): no `clientHighlight` is set — Nancy's 8/13/2026 strength
// battery is a first-time test, not a documented before/after PR, so per
// CLAUDE.md's Client View spec ("never fabricate one") nothing is invented.
// The 8 internal baselineNotes above (New Strength Baseline Battery, both
// Judgment Call notes, Perimenopausal Status — Not Assessed, the two 8/18
// PT-update notes, the 8/18 warm-up-promotion note, and the 8/19 Session
// Architecture note) and the 2 flag lines that dangle-reference the
// judgment-call notes ("...— see note") are filtered out of this view;
// everything else (Styku finding, asymmetry watch/corrective flags, the
// client-visible deload note, all day/block/exercise content including the
// new integration closers and options menus) renders unchanged.
async function main() {
  const outDir = path.join(__dirname, '..', '..', 'clients', 'nancy_avitable');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Nancy_Avitable_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Nancy_Avitable_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
