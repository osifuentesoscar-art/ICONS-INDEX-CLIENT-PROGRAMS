/**
 * Kelly Mulroy — ICONS 5-Day Training Plan
 * Brace Life Studios
 *
 * FIRST BUILD SCRIPT FOR THIS CLIENT (8/18/2026). Her delivered .docx had
 * previously doubled as the engine's byte-identical XML-audit reference, so
 * it had never been script-driven and could not be revised without
 * destroying that reference. The reference artifact is now frozen
 * separately at
 *   system_documents/reference/Kelly_Mulroy_5Day_Training_Plan_ENGINE_REFERENCE.docx
 * (sha256 80e57c36ed32be02f1effde0a3a3e15e7f9c688886291ab819e139a867474fa6),
 * so this script reproduces her program and then carries the clinical
 * content she had been unable to receive.
 *
 * REPRODUCTION SOURCE: every day, block, exercise row, callout, table and
 * summary string below was extracted from the delivered .docx via
 * python-docx and transcribed verbatim (including its en/em dashes, the
 * U+2015 horizontal bars in some rep ranges, and the doubled spaces in a
 * few AR-day tempo cells). Where CLAUDE.md's roster summary disagreed with
 * the document, the document won — see the DISCREPANCIES note below.
 *
 * DISCREPANCIES vs. CLAUDE.md's roster block (document wins):
 *   - The roster block lists "Baselines: DL 55-65 lbs, Squat 25 lbs".
 *     Neither appears in the document's baselines table, which carries six
 *     rows: Overhead Press, Dumbbell Row, Push-Up, Plank Hold, Farmer
 *     Carry, Assisted Pull-Up. "DL 55-65 lbs" is her Thursday TRAINING
 *     load, not a tested baseline; no squat baseline of any kind appears
 *     anywhere in the document (her squat work is prescribed at 30-35 lbs
 *     goblet / 40-45 lbs box). Not invented here.
 *   - The roster block's "OHP 25 lbs x3RM" and "Carry 35 lbs/hand" do match
 *     the document exactly, as do the Styku figures and the leg asymmetry.
 *
 * KNOWN ENGINE GAPS EXPOSED BY THE REPRODUCTION (reported, not worked
 * around, and NOT fixed here — icons_template.js is out of scope for this
 * pass):
 *   1. Cover subtitle and running-header subtitle are the same field.
 *      The reference cover reads "60-100% PROGRESSIVE INTENSITY BUILD"
 *      while its running header reads "60-100% PROGRESSIVE INTENSITY".
 *      buildDocument() derives both from client.subtitle, so they cannot
 *      differ. The cover string is preserved exactly (it is the
 *      client-visible one); the running header now carries the same text.
 *   2. The running footer's middle field is hard-wired to
 *      client.programTitle. The reference footer reads "Kelly Mulroy |
 *      Progressive Intensity Build | Tue-Sun" while its cover title reads
 *      "5-DAY TRAINING PLAN" — two different strings the engine cannot
 *      source separately. Cover title preserved; footer now shows the
 *      program title.
 *   3. blockLabel() forces a block's intro-label color to equal the block
 *      accent. Two blocks in the reference deliberately differ (Day 1
 *      Block D: gold header, green intro label, green table; Day 4 Block
 *      B: red header, gold intro label, red table). Each is reproduced on
 *      whichever setting matches the most surface area — see the inline
 *      notes on those two blocks.
 *   4. labeledPara() appends a fixed ":  " to every label. Day 4 Block B's
 *      reference intro label ends in a period ("Carry Baseline: 35
 *      lbs/hand.  ") — unreproducible; renders with a colon instead.
 *   5. The reference emits each exercise table as TWO adjacent <w:tbl>
 *      elements (header row, then body rows) with no cell-level w:tcW,
 *      and its week strip grid is [1488 x5, 1500 x2]. The current engine
 *      emits one table per exercise block, writes w:tcW, and computes
 *      evenWidths(7) = [1491 x4, 1492 x3]. Visually and structurally
 *      identical; XML-level serialization differs because the reference
 *      predates the current docx-library/exTable serialization. Adjacent
 *      same-width tables render as one continuous table in Word.
 *   6. buildDocument() hard-codes the baselines section title as
 *      sectionTitle('Strength Baselines - Established') and sectionTitle()
 *      does not uppercase. The reference renders it fully uppercased
 *      ("STRENGTH BASELINES - ESTABLISHED"), which no caller-side data can
 *      produce.
 *
 * STRUCTURAL COMPARISON RESULT (reproduction, before the 8/18 additions):
 * 91 of 91 normalized items matched the frozen reference exactly -- every
 * paragraph's text and run formatting (bold/italic/pt size/hex color),
 * every table's shape, every cell's text, and every cell's shading fill.
 * The only three deltas are gaps 3, 4 and 6 above, all of which are engine
 * limitations rather than data errors. Byte-identity is deliberately not
 * the test: the docx library writes its own zip metadata, so a structurally
 * perfect regeneration can never match byte-for-byte.
 *
 * CLINICAL CONTENT ADDED 8/18/2026 (documented in CLIENTS.md, never
 * previously able to reach the document):
 *   A. LUMBAR HINGE-TOLERANCE STOP-SIGNAL — Jason Bethea, tracked across
 *      7/29, 7/30 and 8/11 sessions. Rendered as a clinicalFlag baseline
 *      note (front matter), inside Day 3's hinge block intro, as a red
 *      `flag` sub-line on all three loaded hinge exercises plus the
 *      unloaded hinge drill, and reinforced in Day 3's ICONS Note. Client
 *      safety information — visible in BOTH the trainer document and the
 *      Client View (no flagAudience/audience marking).
 *   B. ANTI-VALGUS ACTIVATION PROTOCOL — banded crab walks leading Day 1's
 *      corrective circuit (first movement of the session, before any
 *      closed-chain leg loading), and a new Day 1 Block E carrying the
 *      reverse wall lunge with calf raise, the plank-position leg
 *      tap-down (represented honestly as an equipment-limited
 *      knee-extension substitute, with the better alternatives named), and
 *      the assisted single-leg pistol squat with its full regression
 *      ladder. Home glute-med program carried as a client-visible note.
 *
 * BROUGHT CURRENT TO 8/18/2026 STANDARDS:
 *   - RIR prescriptions per CLAUDE.md's corrected model: 2 RIR default on
 *     primary lifts, 1 RIR on hypertrophy-priority accessory work,
 *     everything above 2 RIR collapsed into one technique/sub-maximal
 *     band, 0 RIR reserved for the single weekly push-up test set.
 *     progressionBlock() enabled (its rule text states the corrected 2 RIR
 *     add-weight trigger); the reference document had neither.
 *   - Nutrition block enabled. Age 35, 68.9 kg, ALST not At-Risk and no
 *     numeric ALST on file -> proteinTargets() returns the active-women
 *     general 1.6 g/kg tier (110 g/day) and the creatine-indicated (not
 *     strongly-indicated) branch, which is correct under both the old and
 *     the 8/17/2026-corrected protein framing for a 35-year-old. NOTE the
 *     engine's per-meal figure is still ~0.4 g/kg (CLAUDE.md corrected the
 *     standard to ~0.3 g/kg on 8/17/2026 and flags the engine change as
 *     unbuilt); at her body weight it resolves to ~28 g, which sits inside
 *     the corrected 25-40 g per-meal band, so no stale NUMBER ships — only
 *     the stale g/kg framing. Flagged, not patched here.
 *   - Asymmetry protocol: legs L 15.7 / R 16.5 lbs = 0.8 lb gap, ~5.0%
 *     relative. This does NOT clear the corrected >=10% relative trigger.
 *     Per the Nicolette Scott precedent the existing left-lead
 *     prescriptions are left UNCHANGED (a clinical decision, not a
 *     language fix) and the discrepancy is documented in an
 *     `audience: 'internal'` note for a dedicated per-client review. No
 *     client-visible copy cites the retired 0.5 lb absolute trigger.
 *   - No retired language anywhere: no VFA risk-band label, no 3-tier ALST
 *     table, no >=80% LIFTMOR figure. (None were present to begin with —
 *     verified against the extracted reference text.)
 *   - Client View generated alongside the trainer document. No
 *     `clientHighlight` is set: she has no documented PR or
 *     progress-since-last-version on file (her only Styku scan is
 *     6/17/2026 with no rescan), and CLAUDE.md forbids fabricating one.
 *
 * SCOPE NOTES:
 *   - Age 35 -> the "ICONS Index Full-Spectrum Progression Standard" is
 *     scoped to women 40-55 and does NOT apply to her; it is not applied
 *     here as a requirement.
 *   - Not postmenopausal, no ALST number on file -> neither
 *     pelvicFloorCallout() nor proteinBar() auto-fires. Correct, and
 *     matches the reference document.
 *   - No stykuBlock(): her scan record on file carries only body fat %,
 *     lean mass, Shape Score and leg segmental LST. ALST index, VFA, BMI,
 *     bone mass, BMR and arm segmental LST are absent, and stykuBlock()
 *     would require them. Her Styku findings stay in the baseline note the
 *     reference already used rather than being padded out with invented
 *     values.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

// ── CLIENT ────────────────────────────────────────────────────────────
// weightKg: 152 lbs = 68.9 kg. No alstIndex on file — deliberately unset
// (CLIENTS.md records "ALST not yet At-Risk" with no number, and a number
// is not invented here).
const client = {
  name: 'Kelly Mulroy',
  programTitle: '5-Day Training Plan',
  subtitle: '60–100% Progressive Intensity Build',
  schedule: 'Tue–Sun',
  stats: ['Age 35', '5’4″', '152 lbs', 'Tue/Wed/Thu/Fri Gym', 'Sun Active Recovery', 'Sat & Mon Off'],
  weightKg: 68.9,
  ageYears: 35,
  isPostmenopausal: false,
};

const weekOverview = [
  { day: 'TUE', intensity: 60, focus: 'Squat\nKnee Fix' },
  { day: 'WED', intensity: 70, focus: 'Upper\nPush/Pull' },
  { day: 'THU', intensity: 80, focus: 'Hinge +\nInner Thigh' },
  { day: 'FRI', intensity: 90, focus: 'Upper +\nCarry' },
  { day: 'SUN', intensity: 'AR', focus: 'Active\nRecovery' },
  { day: 'SAT', intensity: 'Off', focus: 'Off' },
  { day: 'MON', intensity: 'Off', focus: 'Off' },
];

const baselines = [
  ['Overhead Press', '25 lbs / hand', '3 RM', '35 lbs/hand ×3 · Training load starts 20 lbs/hand'],
  ['Dumbbell Row', '40 lbs', '5 RM', '55 lbs ×5 · Training load starts 32–35 lbs'],
  ['Push-Up', '15 reps assisted', 'Max', '15 full push-ups unassisted · First unassisted by Week 5–6'],
  ['Plank Hold', '1:00', 'Max', '1:45 · Wk4 target 1:20, Wk8 target 1:45+'],
  ['Farmer Carry', '35 lbs / hand', 'Working', '50 lbs/hand by Week 4 · 65 lbs/hand by Week 8'],
  ['Assisted Pull-Up', 'Level 9 / 12', 'Working', 'Level 6 / 12 by Week 4 · Level 3–4 by Week 8'],
];

const baselineNotes = [
  // ── ADDED 8/18/2026 — live client safety information. Placed FIRST so it
  // is the first thing read in both documents. Deliberately NOT marked
  // internal: this is the client's own stop-signal, not build rationale.
  {
    type: 'clinical',
    label: 'Lumbar Hinge Tolerance — Active Stop-Signal',
    body: 'Coordinated with Jason Bethea, Brace Life’s in-house Trainer/Physical Therapist, and tracked across three sessions: 7/29 — hip-hinging identified as a low-back-pain trigger. 7/30 — hinge patterns avoided, session tolerated well. 8/11 — two hinge patterns cautiously re-tested at moderate load. STANDING RULE, EVERY SESSION: back pain during the dumbbell deadlift or a single-leg hip hinge means STOP the set — regress to hinge-free squat patterns for the rest of that session. This governs Thursday’s Deadlift, Sumo RDL and Single-Leg RDL directly. Pain during a hinge, or pain that persists after one, is the signal to regress and tell the coach — never train through it. Load only returns to the pattern once it is symptom-free, and Jason is looped in before it does.',
  },
  {
    type: 'green',
    label: 'Push-Up Baseline (15 Assisted)',
    body: 'Kelly can perform 15 push-ups with assistance. Progression target is 15 unassisted within 8 weeks. Protocol: Weeks 1–2 transition from assisted to incline (hands on bench). Weeks 3–4 full push-ups from the floor, build from 5 to 10. Weeks 5–6 target 10–12 full reps per set. Weeks 7–8 target 15 unassisted. No more eccentric-only protocol — she is ready to load full reps.',
  },
  {
    type: 'gold',
    label: 'Pull-Up Baseline (Level 9/12 Assisted)',
    body: 'Level 9 out of 12 means significant assistance (heavier band = more help = easier). Goal is to step DOWN one level every 2–3 weeks. Wk1–2: Level 9. Wk3–4: Level 8. Wk5–6: Level 7. Wk7–8: Level 6. Track clearly every Friday.',
  },
  {
    type: 'gold',
    label: 'Styku Scan Baseline (6/17/2026)',
    body: 'Body fat 36.4% · Lean mass 92.0 lbs · Shape Score 61/100 · Leg asymmetry: left 15.7 lbs vs right 16.5 lbs. Left-leg-priority unilateral work maintained throughout.',
  },
  {
    type: 'red',
    label: 'Corrective Priorities',
    body: 'Two movement faults remain active: (1) Knee valgus during squat — corrected on Tuesday. (2) Hip hinge pattern / adductor weakness — corrected on Thursday. Copenhagen plank and banded squat correctives continue across all sessions.',
  },
  // ── ADDED 8/18/2026 — anti-valgus home program (PT-documented).
  {
    type: 'green',
    label: 'Home Anti-Valgus Program (Saturday & Monday)',
    body: 'Glute-medius isolation that holds the in-session knee-tracking work together on off days, documented by Jason Bethea: clamshells 2×15 each side, side plank with clamshell 2×8 each side, banded monster walks 2×10 each direction. Ten minutes, nothing needed beyond a mini-band. The glute medius is the muscle that keeps the knee from caving in — this is the work that makes Tuesday’s squat correction hold.',
  },
  // ── ADDED 8/18/2026 — RIR calibration, per CLAUDE.md's corrected model.
  {
    type: 'teal',
    label: 'RIR Calibration — First Two Weeks',
    body: 'RIR (reps in reserve) governs every load increase in this plan, so the calls have to be accurate before they drive progression. On one sub-maximal set per new exercise, call the RIR out loud, then take that same set to true failure and record the difference. Repeat until the call lands within one rep on two consecutive sessions. Above 2 RIR, treat everything as one technique/sub-maximal band — the precision simply is not there to separate 3 from 4.',
  },
  // ── ADDED 8/18/2026 — reassessment cadence, per CLAUDE.md's corrected
  // 4-week strength / 8-12 week body-composition split.
  {
    type: 'gold',
    label: 'Reassessment Cadence',
    body: 'Strength reassessment runs every 4 weeks: the tested lifts in the table above get re-checked against their Week 4 targets and working loads are reset from the result. Body-composition rescanning runs on its own longer cycle of 8–12 weeks — the two are tracked separately, not on the same clock. The only Styku scan on file is 6/17/2026, so a strength reassessment is due at the next available session.',
  },
  // ── INTERNAL (trainer/audit only — filtered out of the Client View).
  {
    type: 'watch',
    label: 'Asymmetry Trigger Recalculation — Flagged Discrepancy (8/18/2026)',
    audience: 'internal',
    body: 'CLAUDE.md’s Asymmetry Protocol trigger was corrected 8/17/2026 from an absolute ≥0.5 lb L/R gap to a relative ≥10% gap — the old absolute figure was firing on measurement noise, since device error on Styku’s segmental lean-mass reading runs 2.6–3.6× larger than 0.5 lb per an external evidence review. Recomputed against this client’s actual numbers: Left Leg 15.7 lbs / Right Leg 16.5 lbs is a 0.8 lb gap but only ~5.0% relative, which met the OLD trigger comfortably and does NOT clear the corrected ≥10% threshold. No arm segmental data is on file at all. Per the Nicolette Scott precedent, the left-leg-leads prescription already programmed throughout this document (Single-Leg Glute Bridge, Step-Up, Lateral Lunge, Single-Leg RDL, Suitcase Carry, Reverse Wall Lunge, Pistol Squat) is left UNCHANGED pending a dedicated per-client review — this note exists to make the discrepancy visible for that review, not to resolve it silently. A functional single-leg strength test would settle it; the corrected protocol prefers one over an imaging-derived lean-mass gap.',
  },
  {
    type: 'watch',
    label: 'Clinical Framework Scope & Data Gaps',
    audience: 'internal',
    body: 'Age 35 places her at the 20–35 / 35–45 bracket boundary; no numeric threshold differs between them at this exact age. Protein sits at the active-women general 1.6 g/kg tier (neither ALST At-Risk nor 40+) and creatine is indicated, not strongly indicated. The "ICONS Index Full-Spectrum Progression Standard" is scoped to women 40–55 and is NOT applied to her as a requirement. Data gaps on file, none of them invented: her 6/17/2026 Styku record carries body fat %, lean mass, Shape Score and leg segmental LST only — no ALST index, VFA, BMI, bone mass, BMR or arm segmental LST — which is why no stykuBlock() renders and why no ALST-driven escalation is applied. Perimenopausal-status screening is not applicable at 35. No cardiac, OA, postpartum or GLP-1 flags are on file.',
  },
  {
    type: 'watch',
    label: 'Document Provenance — First Engine Build (8/18/2026)',
    audience: 'internal',
    body: 'This is the first script-driven build of Kelly’s program. Her delivered .docx previously doubled as the engine’s byte-identical XML-audit reference, which is why she was the only client on the roster with no build script, no Client View, and no route for a documented safety finding to reach her document. The reference artifact is now frozen separately at system_documents/reference/Kelly_Mulroy_5Day_Training_Plan_ENGINE_REFERENCE.docx and is the engine standard going forward; this document is her live program and is revised like any other client’s. Program content below is reproduced verbatim from the frozen reference except for the clinical additions and RIR prescriptions dated 8/18/2026.',
  },
];

// ── DAY 1 — TUESDAY (60%) ─────────────────────────────────────────────
const day1 = {
  intensity: 60,
  title: 'DAY 1 — TUESDAY',
  subtitle: 'Lower Body — Squat Focus + Knee Valgus Corrective',
  descriptor: 'Technique & Corrective Day · Lighter Loads · Full Attention to Movement Quality',
  intensityLabel: '60% Day',
  intensityPara: 'Tuesday is the lightest training day of the week by design. It sits at the start of the training week when accumulated fatigue is lowest, and the session’s primary goal is movement quality, not load. Perfect knee tracking on every squat rep matters more than any number on the bar today.',
  warmUp: 'CORRECTIVE ACTIVATION (mandatory): Banded clamshell 2×15, banded glute bridge 2×15, mini-band lateral walk 2×12 each direction, ankle circles 10 each. This fires the glute medius and hip abductors before any squatting.',
  blocks: [
    {
      letter: 'A',
      title: 'KNEE VALGUS CORRECTIVE CIRCUIT',
      color: 'red',
      introLabel: 'Why',
      // Second sentence added 8/18/2026 alongside the crab walk row below.
      intro: 'Knees cave inward during squats because the glute medius and VMO fail to hold the knee in line. Use a mini-band above the knees on all squat work today. Banded crab walks lead this circuit — glute medius is primed before any closed-chain leg loading, per the protocol documented by Jason Bethea.',
      exercises: [
        // ADDED 8/18/2026 — deliberately the first movement of the session.
        { name: 'Banded Crab Walk (Glute Med Primer)', sets: '2', reps: '10 ea way', load: 'Mini-band', tempo: 'Controlled', rest: '30s', cue: 'FIRST movement of the session. Band above knees, quarter-squat, step laterally without letting either knee drift inward. Glute medius is the muscle that keeps the knee from caving.' },
        { name: 'Banded Squat (Mini-Band Above Knees)', sets: '3', reps: '12―15', load: 'Band only', tempo: '3-1-1', rest: '45s', cue: 'Band creates constant cue to push knees OUT. No load — full focus on knee tracking. Sit back and down.' },
        { name: 'Monster Walk (Lateral + Forward/Back)', sets: '2', reps: '12 ea way', load: 'Mini-band', tempo: 'Controlled', rest: '30s', cue: 'Band above knees, slight squat. Walk lateral, forward, backward. Glute medius activation.' },
        { name: 'Wall Squat with Ball Squeeze', sets: '2', reps: '15', load: 'Ball/fist', tempo: '2-2-1', rest: '30s', cue: 'Squat with soft ball or fist between inner thighs. Squeeze inward as you descend. Activates adductors and trains them to stabilize the knee.' },
      ],
    },
    {
      letter: 'B',
      title: 'PRIMARY SQUAT STRENGTH (60% EFFORT)',
      introLabel: 'Load Target',
      intro: '60% day. Goblet squat at 30–35 lbs (below the 3RM range — focus is form, not load). Box squat at 40–45 lbs. Technique must be clean before load increases Thursday and Friday.',
      exercises: [
        { name: 'Goblet Squat (Banded Knees)', sets: '4', reps: '8―10', load: '30―35 lbs', tempo: '3-1-1', rest: '90s', cue: 'Hold DB at chest. Elbows push knees out at bottom. Primary squat pattern. Band above knees for feedback. No barbell until this is consistently clean.', rirNote: '3+ RIR — technique band, 60% day' },
        { name: 'Box Squat (to Bench Height)', sets: '3', reps: '8', load: '40―45 lbs', tempo: '3-2-1', rest: '90s', cue: 'Sit BACK to the box, pause completely, drive up. The pause removes stretch-reflex and forces glutes to fire. Key valgus corrective.', rirNote: '3+ RIR — technique band' },
        { name: 'Single-Leg Glute Bridge (Left Lead)', sets: '3', reps: '12 ea', load: 'Bodyweight', tempo: '2-2-1', rest: '30s', cue: 'LEFT leg first. Drive through heel, hold squeeze. Unilateral correction for scan-confirmed leg asymmetry.' },
      ],
    },
    {
      letter: 'C',
      title: 'VMO & KNEE STABILITY',
      color: 'gold',
      exercises: [
        { name: 'Terminal Knee Extension (Band)', sets: '3', reps: '15 ea', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Band behind knee. Drive knee to full extension against band. Directly targets VMO. Key knee-tracking corrective.' },
        { name: 'Spanish Squat (Band Around Post)', sets: '3', reps: '10―12', load: 'Band', tempo: '3-2-1', rest: '45s', cue: 'Band looped around post at knee height. Sit back while band pulls knees forward. Forces upright torso and VMO engagement.' },
        { name: 'Step-Up (Left Lead)', sets: '3', reps: '10 ea', load: '15–20 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'LEFT leg first all sets — Styku scan shows right leg carries more lean tissue (16.5 vs 15.7 lbs). Drive through heel, full hip extension at top.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'D',
      title: 'PUSH-UP PROTOCOL (UPDATED BASELINE)',
      // ENGINE GAP #3: the reference renders this block's HEADER in gold
      // while its intro label and both table tints are green. blockLabel()
      // couples the header color to the table color, so 'green' is chosen
      // — it matches the intro label and the whole table; only the header
      // run's color differs from the reference (gold -> green).
      color: 'green',
      introLabel: 'Push-Up Update',
      intro: 'Baseline is 15 assisted reps. Moving off eccentric-only protocol. This week: incline push-ups (hands on bench) + first attempts at floor push-ups. Goal is 5+ full reps by end of Week 2.',
      exercises: [
        { name: 'Incline Push-Up (Hands on Bench)', sets: '4', reps: '10―12', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Hands elevated on bench. Full chest to bench level. This is the bridge from assisted to full floor push-up. Progress by lowering the incline height each week.', rirNote: '1 RIR — accessory' },
        { name: 'Full Push-Up Attempt (Floor)', sets: '3', reps: 'Max (target 3–5)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Attempt full push-ups from the floor. Record reps each set. Even 1 rep counts. Do NOT go to failure — stop 1 rep before form breaks.', rirNote: '1 RIR — stop before form breaks' },
      ],
    },
    // ── ADDED 8/18/2026 — anti-valgus progression, PT-documented.
    // Isolated-zone corrective work. Sequenced wall lunge -> plank tap-down
    // -> pistol squat so no three consecutive knee-dominant movements stack
    // (the block would be exempt as corrective work either way, but the
    // rotation is free here and worth taking).
    {
      letter: 'E',
      title: 'ANTI-VALGUS PROGRESSION',
      color: 'red',
      introLabel: 'Why',
      intro: 'The anti-valgus progression documented by Jason Bethea. Wall support removes the balance demand so all of the attention goes to knee tracking. The pistol squat is the highest valgus-risk movement in this program — it is trained through its regression ladder (doorframe or wall assist → heel elevated → reduced range of motion) and never at full depth unassisted until the knee tracks cleanly. Plank-position leg tap-downs stand in for a knee-extension machine here and are not a one-to-one replacement; when the equipment allows, a wall sit, Spanish squat, cyclist squat or banded terminal knee extension is the stronger choice.',
      exercises: [
        { name: 'Reverse Wall Lunge with Calf Raise (Left Lead)', sets: '3', reps: '8 ea', load: 'Bodyweight', tempo: '2-1-2', rest: '45s', cue: 'Hands on the wall for support. Step back, lower the trailing knee, drive up and finish with a calf raise. Front knee tracks over the second toe the whole way.', rirNote: '2 RIR — tracking quality first' },
        { name: 'Plank Position Leg Tap-Down', sets: '2', reps: '10 ea', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Plank on hands. Tap one knee lightly to the floor and drive straight back up. Hips stay square — no rotation, no sagging.', flag: 'Knee-extension substitute — not a 1:1 replacement.' },
        { name: 'Single-Leg Pistol Squat (Assisted, Left Lead)', sets: '2', reps: '5 ea', load: 'Bodyweight + assist', tempo: '3-1-1', rest: '60s', cue: 'Regression ladder: doorframe or wall assist first, then heel elevated, then reduced depth. Stay at whichever level keeps the knee tracking clean.', flag: 'High valgus risk — regress the moment the knee drifts inward.', rirNote: '3+ RIR — technique band' },
      ],
    },
  ],
  coolDown: 'Hip flexor lunge stretch 60s each, pigeon pose 60s each, adductor stretch 60s, foam roll quads and IT band 60s each leg.',
  iconsNote: 'Tuesday’s intensity is capped at 60% so that form can be the only focus. Do not add load beyond what’s written. The knee valgus corrective protocol must run on every session this week. Goblet squat should feel manageable — if it doesn’t, reduce load.',
};

// ── DAY 2 — WEDNESDAY (70%) ───────────────────────────────────────────
const day2 = {
  intensity: 70,
  title: 'DAY 2 — WEDNESDAY',
  subtitle: 'Upper Body — Push & Pull',
  descriptor: 'Moderate Strength Day · Building Baseline Loads · Upper Body Volume',
  intensityLabel: '70% Day',
  intensityPara: 'Wednesday’s loads are moderate — challenging but not near-maximal. Row at 32–35 lbs (from 40 lb 5RM baseline). OHP at 20 lbs/hand (from 25 lb 3RM). Reps are in the 10–12 range. This builds volume without accumulating the fatigue that would compromise Thursday and Friday.',
  warmUp: 'Band pull-aparts 2×15, face pulls 2×10, arm circles, cat-cow 10 reps, light DB warm-up press 2×10, shoulder external rotation 10 each side.',
  blocks: [
    {
      letter: 'A',
      title: 'PRIMARY PRESS STRENGTH',
      exercises: [
        { name: 'Dumbbell Chest Press (Flat)', sets: '4', reps: '10―12', load: '17.5–20 lbs/hand', tempo: '3-1-1', rest: '60s', cue: 'Elbows at 45°. Squeeze chest at top. Baseline OHP is 25 lbs ×3RM — chest press starts conservatively. Add 2.5 lbs/hand every 2 weeks.', rirNote: '2 RIR' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '10―12', load: '15–17.5 lbs/hand', tempo: '3-1-1', rest: '60s', cue: '30–45° angle. Upper chest and anterior delt. Pairs with flat press for full chest development.', rirNote: '1 RIR — accessory' },
        { name: 'Dumbbell Single-Arm Row (Left First)', sets: '4', reps: '10 ea', load: '32–35 lbs', tempo: '3-1-2', rest: '60s', cue: 'Baseline: 40 lbs ×5RM. Training load: 32–35 lbs for 10 reps. LEFT arm first per Styku scan. Chest supported. Drive elbow to hip. Full stretch at bottom.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'B',
      title: 'PRIMARY PULL STRENGTH',
      exercises: [
        { name: 'Dumbbell Overhead Press', sets: '3', reps: '10―12', load: '20 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'Baseline: 25 lbs ×3RM. Training load: 20 lbs/hand for 10–12 reps. Press overhead, arms alongside ears. Core braced. Increase to 22.5 in Week 3.', rirNote: '2 RIR' },
        { name: 'Lat Pulldown (Cable)', sets: '3', reps: '12―15', load: 'Moderate', tempo: '2-1-2', rest: '60s', cue: 'Full stretch overhead, drive elbows to hip pockets. Supports pull-up progression. Helps close the gap from Level 9 assisted.', rirNote: '1 RIR — accessory' },
        { name: 'Face Pull (Cable/Band)', sets: '3', reps: '15―20', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face with external rotation. Elbows at ear height. Rear delt and rotator cuff health.' },
      ],
    },
    {
      letter: 'C',
      title: 'ACCESSORY & PUSH-UP',
      color: 'gold',
      exercises: [
        { name: 'Incline Push-Up', sets: '3', reps: '10―12', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Hands on bench. Continue push-up progression. Wednesday reinforcement.', rirNote: '1 RIR — accessory' },
        { name: 'Full Push-Up (Floor)', sets: '2', reps: 'Max (3–5)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Attempt floor push-ups. Record reps. Stop before form breaks.', rirNote: '1 RIR' },
        { name: 'Tricep Pushdown', sets: '3', reps: '12―15', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Elbows pinned. Full extension at bottom. Supports pressing strength.', rirNote: '1 RIR — accessory' },
        { name: 'Plank Hold', sets: '2', reps: '1:00–1:10', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline 1:00. Add 10 seconds per week. Target 1:20 by Week 4, 1:45 by Week 8.' },
      ],
    },
  ],
  coolDown: 'Doorway chest stretch 30s each, lat stretch 30s each, thoracic extension 60s, wrist mobility.',
  iconsNote: 'Wednesday loads are intentionally 10–15% below max effort to preserve quality for Thursday and Friday. Row at 32–35 lbs is approximately 80–85% of the 5RM. OHP at 20 lbs is approximately 80% of the 3RM. These are the correct working loads for 10–12 rep sets.',
};

// ── DAY 3 — THURSDAY (80%) ────────────────────────────────────────────
// The hinge day. Carries the added lumbar hinge-tolerance stop-signal in
// the Block B intro, on every loaded hinge exercise's `flag` sub-line, on
// the unloaded hinge drill, and in the ICONS Note.
const day3 = {
  intensity: 80,
  title: 'DAY 3 — THURSDAY',
  subtitle: 'Lower Body — Hip Hinge + Inner Thigh Corrective',
  descriptor: 'Strength Emphasis Day · Primary Hinge Loads · Highest Lower Body Volume',
  intensityLabel: '80% Day',
  intensityPara: 'Thursday is the primary strength day for lower body. Deadlift and hip thrust loads step up from Tuesday’s squat work. 80% effort means the final 1–2 reps of each set are hard but achievable with good form. This is where the majority of lower body strength gains happen.',
  warmUp: 'Glute bridge 2×15, banded clamshell 2×15, hip hinge drill (PVC pipe along spine) 2×10, cat-cow 10 reps, leg swings 10 each direction.',
  blocks: [
    {
      letter: 'A',
      title: 'INNER THIGH / ADDUCTOR CORRECTIVE CIRCUIT',
      color: 'red',
      introLabel: 'Copenhagen Plank',
      intro: 'The most important corrective in this program. Side plank with top leg on bench. Every set targets the adductor isometrically in the position that mirrors the inner thigh demands of squatting and hinging.',
      exercises: [
        { name: 'Copenhagen Plank (Inner Thigh)', sets: '3', reps: '25–35s ea', load: 'Bodyweight', tempo: '—', rest: '45s', cue: 'Side plank, top leg on bench. Adductor isometric. Progress hold time by 5 seconds per week. Target 45s by Week 4.' },
        { name: 'Cable/Band Adductor Pull', sets: '3', reps: '15 ea', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Standing, cable or band at ankle height. Pull working leg across midline. Direct adductor strengthening.' },
        { name: 'Hip Hinge Drill (Wall or PVC)', sets: '2', reps: '10', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'PVC along spine, 3 points of contact. Hinge from hips, not lower back. Movement pattern baseline.', flag: 'Unloaded pattern check — if this provokes back pain, skip all loaded hinging today.' },
      ],
    },
    {
      letter: 'B',
      title: 'PRIMARY HINGE STRENGTH (80% EFFORT)',
      introLabel: 'Load Target',
      // Stop-signal sentence added 8/18/2026.
      intro: 'Deadlift starts at 55–60 lbs and progresses to 75 lbs by Week 4. At 80% effort this means 3–4 reps feel like work but the set completes cleanly. Sumo RDL should load the adductors — feel the inner thigh under tension. HINGE STOP-SIGNAL: back pain during the deadlift or a single-leg hip hinge means STOP the set immediately — regress to hinge-free squat patterns for the remainder of the session and flag it before the next one. That call is not made mid-set.',
      exercises: [
        { name: 'Deadlift (Conventional)', sets: '4', reps: '6–8', load: '55–65 lbs', tempo: '2-1-1', rest: '90s', cue: 'Bar close to shins. Drive floor away. Neutral spine. Add 5–7 lbs each week. Target 75 lbs by Week 4. At 80% effort — last 2 reps should be challenging.', flag: 'Hinge stop-signal — back pain means STOP; regress to hinge-free squat patterns.', rirNote: '2 RIR' },
        { name: 'Sumo RDL', sets: '3', reps: '8―10', load: '45―55 lbs', tempo: '3-1-1', rest: '75s', cue: 'Wide stance, toes out. Loads adductors more than conventional. Hinge from hip, feel inner thigh lengthen. Complement to Copenhagen plank.', flag: 'Hinge stop-signal — back pain means STOP; regress to hinge-free squat patterns.', rirNote: '2 RIR' },
        { name: 'Lateral Lunge (Left Lead)', sets: '3', reps: '10 ea', load: '12―17 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'LEFT leg leads. Step wide, sit into the hip. Inner thigh of the standing leg lengthens under load.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'C',
      title: 'HIP THRUST & POSTERIOR CHAIN',
      exercises: [
        { name: 'Hip Thrust (Barbell or DB)', sets: '4', reps: '10―12', load: '45―60 lbs', tempo: '2-2-1', rest: '60s', cue: 'Shoulders on bench, drive through heels. Hold squeeze 2 seconds at top. Add 5–10 lbs per week. This drives the glute strength that supports both squat and hinge corrections.', rirNote: '2 RIR' },
        { name: 'Single-Leg RDL (Left Lead)', sets: '3', reps: '8 ea', load: '12―17 lbs', tempo: '3-1-1', rest: '60s', cue: 'LEFT leg first, all sets. Hinge from hip, hamstring stretch. Balance and unilateral hip control.', flag: 'Hinge stop-signal — back pain means STOP; regress to hinge-free squat patterns.', rirNote: '2 RIR' },
      ],
    },
  ],
  coolDown: 'Pigeon pose 90s each, adductor wide-leg stretch 90s, hamstring stretch 60s each, hip flexor lunge 60s each.',
  // Final sentence added 8/18/2026.
  iconsNote: 'Thursday’s 80% effort means loads are challenging but not maximal. If the deadlift form deteriorates on the last set, reduce load by 5 lbs next session. Hip thrust is the second-most-important strength exercise in this program after the deadlift — load it progressively every week. The hinge stop-signal on this page is not a suggestion: a hinge that produces back pain gets regressed the same session, and Jason Bethea is looped in before it is loaded again.',
};

// ── DAY 4 — FRIDAY (90%) ──────────────────────────────────────────────
const day4 = {
  intensity: 90,
  title: 'DAY 4 — FRIDAY',
  subtitle: 'Upper Body — Strength & Loaded Carry',
  descriptor: 'Peak Weekly Intensity · Heavy Carries · Pull-Up Progression · Near-Maximal Effort',
  intensityLabel: '90% Day',
  intensityPara: 'Friday is the highest intensity gym session of the week. Loads are near-maximal — OHP at 22.5–25 lbs/hand (close to 3RM territory), row at 37–40 lbs (close to 5RM). Farmer carry steps up. Pull-ups stay at Level 9 this week then drop one level every 2–3 weeks. Rest fully between sets today.',
  warmUp: 'Band pull-aparts 2×15, arm circles, shoulder external rotation, cat-cow 10 reps, light DB warm-up press 2×10. Longer warm-up than usual — Friday loads are heavy.',
  blocks: [
    {
      letter: 'A',
      title: 'OVERHEAD & VERTICAL PULL STRENGTH (90% EFFORT)',
      introLabel: 'OHP Target',
      intro: 'Baseline is 25 lbs ×3RM. At 90% effort: Week 1 = 22.5 lbs ×8. Week 2 = 22.5–25 lbs ×6–8. Week 3 = 25 lbs ×6. Week 4 = attempt 27.5 lbs ×3RM (new PR test). This is the fastest-progressing lift in this plan.',
      exercises: [
        { name: 'Dumbbell Overhead Press (Heavy)', sets: '4', reps: '6–8', load: '22.5–25 lbs/hand', tempo: '2-1-1', rest: '90s', cue: '90% day = near-maximal load. Neutral grip. Press straight overhead. Lock out at top. Core rigid. Slightly heavier than Wednesday. Last 2 reps should be hard.', rirNote: '2 RIR — at this load, 2 RIR arrives early' },
        { name: 'Assisted Pull-Up (Level 9→12)', sets: '4', reps: '5–8', load: 'Level 9 assisted', tempo: '3-1-1', rest: '90s', cue: 'Baseline Level 9/12 (heavier band). Full hang at bottom, chin over bar. Drop one level every 2–3 weeks. Target Level 6 by Week 4.', rirNote: '1 RIR' },
        { name: 'Seated Cable Row (Wide Grip)', sets: '3', reps: '8―10', load: '37–40 lbs', tempo: '3-1-2', rest: '75s', cue: '90% of 40 lb 5RM baseline. Wide grip, pull to lower chest. Squeeze blades hard. Different stimulus from Wednesday’s single-arm row.', rirNote: '2 RIR' },
      ],
    },
    {
      letter: 'B',
      title: 'LOADED CARRY & GRIP STRENGTH',
      // ENGINE GAPS #3 and #4: the reference renders this block's header
      // and table in red but its intro label in gold, and that label ends
      // in a period rather than a colon ("Carry Baseline: 35 lbs/hand.  ").
      // blockLabel() ties the intro-label color to the block accent and
      // labeledPara() appends a fixed ":  " — so this reproduces with a red
      // intro label and a colon.
      introLabel: 'Carry Baseline: 35 lbs/hand',
      intro: 'This is the confirmed working weight. Week 1: 35 lbs ×4 sets. Week 2: 40 lbs. Week 3: 45 lbs. Week 4: test 50 lbs. Add 5 lbs/hand each week consistently.',
      exercises: [
        { name: 'Farmer Carry (Both Hands)', sets: '4', reps: '30–35 yds', load: '35 lbs/hand (Wk1) →40 →45 →50', tempo: 'Controlled', rest: '90s', cue: 'Shoulders packed, chest tall, neutral neck. Confirmed baseline 35 lbs/hand. Add 5 lbs every week. 50 lbs/hand is the Week 4 target.', rirNote: '2 RIR — stop the carry before grip fails' },
        { name: 'Suitcase Carry (Left Lead)', sets: '3', reps: '25 yds ea', load: '25–30 lbs', tempo: 'Controlled', rest: '60s', cue: 'LEFT arm first per Styku scan. Resist lateral lean. Core stays square. Anti-lateral flexion. Reveals asymmetry under load.' },
        { name: 'Trap Bar or Hex Bar Shrug', sets: '3', reps: '15', load: '55–65 lbs', tempo: '2-1-2', rest: '45s', cue: 'Elevate shoulders toward ears, hold 1 second, controlled lower. Upper trap and grip strength.', rirNote: '1 RIR — accessory' },
      ],
    },
    {
      letter: 'C',
      title: 'CORE, POSTURE & PUSH-UP',
      color: 'gold',
      exercises: [
        { name: 'Plank Hold', sets: '3', reps: '1:00–1:15', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline 1:00. Add 10–15 seconds per week. Full brace, neutral spine, squeeze glutes. Target 1:20 by Week 4.' },
        { name: 'Pallof Press (Cable/Band)', sets: '3', reps: '10 ea side', load: 'Light-Mod', tempo: '2-1-2', rest: '45s', cue: 'Anti-rotation core. Press and resist twist. Functional core for carries and loaded movement.' },
        { name: 'Band Pull-Apart (Posture)', sets: '3', reps: '20', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight. Rear delt and mid-back. Counters forward shoulder from pressing days.' },
        { name: 'Full Push-Up (Max Effort)', sets: '3', reps: 'Max reps', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Friday is peak day — attempt maximum full push-ups. Record every set. This is the weekly push-up PR test.', rirNote: '0 RIR — the one true test set of the week' },
      ],
    },
  ],
  coolDown: 'Doorway chest stretch 30s each, lat stretch 30s each, thoracic extension 60s, wrist mobility.',
  iconsNote: 'Friday’s 90% intensity means true near-maximal effort on primary lifts. OHP and row loads should feel hard. Pull-up level stays at 9 this week then steps down. Farmer carry progression of 5 lbs/hand per week is the single most reliable strength gain in this program — track it every session.',
};

// ── DAY 5 — SUNDAY (ACTIVE RECOVERY) ──────────────────────────────────
// Per CLAUDE.md, no block carries its own color on an Active Recovery day —
// everything stays the day's blue.
const day5 = {
  intensity: 'AR',
  title: 'SUNDAY — ACTIVE RECOVERY & CORRECTIVE STRENGTHENING',
  subtitle: 'Sub-Maximal Movement · Corrective Maintenance · Joint Health',
  descriptor: 'Low Intensity · No Heavy Loading · Feel Better Leaving Than When You Arrived',
  intensityLabel: 'Sunday’s Purpose',
  intensityPara: 'Sunday is not a training day — it’s a recovery day with intentional movement. No heavy loads, no AMRAP, no PRs. The goal is to flush the fatigue from Tuesday–Friday, reinforce the corrective movement patterns before the next training week, and maintain momentum on mobility. 30–40 minutes total.',
  warmUp: '10 min easy movement: arm circles, leg swings 10 each direction, hip circles, cat-cow 10 reps, ankle circles 10 each, gentle spinal rotation. No activation protocol needed — just circulation and range of motion.',
  blocks: [
    {
      letter: 'A',
      title: 'LIGHT CARDIO (CHOOSE ONE — 15–20 MIN)',
      exercises: [
        { name: 'Brisk Walk (Outdoor or Treadmill)', sets: '1', reps: '15–20 min', load: 'Zone 2', tempo: 'Easy', rest: '—', cue: 'Conversational pace only — full sentences throughout. Not a workout, not a stroll. Promotes blood flow and recovery.' },
        { name: 'Stationary Bike (Easy Spin)', sets: '1', reps: '15―20 min', load: 'Low resistance', tempo: '70–80 rpm', rest: '—', cue: 'Low impact. Good choice if legs are sore from Thursday or Friday. Cadence over resistance.' },
        { name: 'Swimming or Aqua Walk', sets: '1', reps: '15―20 min', load: 'Low', tempo: 'Easy', rest: '—', cue: 'Zero-impact option. Best choice on days of highest soreness. Full-body circulation.' },
      ],
    },
    {
      letter: 'B',
      title: 'CORRECTIVE STRENGTHENING CIRCUIT',
      introLabel: 'Format',
      intro: 'Perform B1 through B5 in order. No supersets, no rush. Full rest between sets. This is corrective work — control and quality are the only goals. If any exercise produces pain, skip it and note it for Tuesday.',
      exercises: [
        { name: 'B1  Copenhagen Plank (Inner Thigh)', sets: '3', reps: '25–35s ea', load: 'Bodyweight', tempo: '  —', rest: '45s', cue: 'Side plank, top leg on bench. Adductor isometric. Most important corrective in this plan. Progress hold time each week.' },
        { name: 'B2  Single-Leg Glute Bridge (Left Lead)', sets: '3', reps: '12 ea', load: 'Bodyweight', tempo: '2-2-1', rest: '45s', cue: 'LEFT leg first. Drive through heel, hold 2 seconds at top. Reinforces Tuesday’s unilateral asymmetry correction.' },
        { name: 'B3  Terminal Knee Extension (Band)', sets: '2', reps: '12 ea', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Band behind knee. Drive to full extension. VMO activation. Keeps knee-tracking corrective warm between Tuesday sessions.' },
        { name: 'B4  Banded Clamshell', sets: '2', reps: '15 ea', load: 'Mini-band', tempo: '2-1-2', rest: '30s', cue: 'Glute medius activation. Low load. This maintains the hip abductor recruitment pattern developed on Tuesday.' },
        { name: 'B5  Dead Bug', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Lower back pressed into floor throughout. Slow opposite arm and leg extension. Anti-extension core endurance.' },
      ],
    },
    {
      letter: 'C',
      title: 'MOBILITY & JOINT HEALTH',
      exercises: [
        { name: 'Ankle Dorsiflexion Drill', sets: '2', reps: '10 ea + 30s hold', load: 'Bodyweight', tempo: 'Slow', rest: '—', cue: 'Lunge forward, knee over toes, hold stretch. Directly reduces knee valgus tendency by improving ankle mobility. Daily ankle work accelerates the squat correction.' },
        { name: '90/90 Hip Stretch', sets: '2', reps: '90s ea side', load: 'Bodyweight', tempo: '  —', rest: '—', cue: '90° at front and rear hip. Improves hip internal and external rotation. Supports squat depth and reduces compensatory knee cave.' },
        { name: 'Thoracic Extension (Foam Roll)', sets: '2', reps: '60s', load: 'Bodyweight', tempo: '  —', rest: '—', cue: 'T-spine over foam roller at mid-back. Arms crossed or behind head. 5 slow extension breaths each position. Counteracts forward posture from daily life and pressing days.' },
        { name: 'Adductor Wide-Leg Stretch', sets: '2', reps: '90s', load: 'Bodyweight', tempo: '  —', rest: '—', cue: 'Sit tall, legs wide. Hinge gently from hip. Lengthens inner thigh. Supports Thursday’s adductor corrective work between sessions.' },
        { name: 'Pigeon Pose', sets: '2', reps: '90s ea side', load: 'Bodyweight', tempo: '  —', rest: '—', cue: 'Deep hip external rotation stretch. Passive hold only — no forcing range. Best hip mobility exercise in this plan.' },
      ],
    },
  ],
  coolDown: '5 min diaphragmatic breathing: 4 counts in, hold 4, exhale 6. Lie on back, knees bent. Activates the parasympathetic nervous system and signals full recovery before Monday’s rest day.',
  iconsNote: 'Sunday is deliberate, controlled, and low-intensity. If Kelly feels strong and wants to do more, resist the urge — the training week starts again Tuesday. The session is complete when the corrective circuit and mobility work are done. This is where the week’s work consolidates into adaptation.',
};

const summary = {
  subtitle: 'Kelly Mulroy  ·  ICONS Index  ·  Progressive Intensity Build  ·  Week 1',
  rows: [
    ['TUE', '60%  —  Teal', 'Squat + Knee Fix', 'Goblet squat · Box squat · TKE · Step-up', 'Squat 35 lbs Wk1 → 55 lbs Wk4 · Push-ups: 5 floor reps Wk2'],
    ['WED', '70%  —  Green', 'Upper Push/Pull', 'Chest press · OHP 20 lbs · Row 32–35 lbs · Lat PD', 'OHP: 20→22.5→22.5 lbs · Row: 32→35→38 lbs'],
    ['THU', '80%  —  Gold', 'Hinge + Inner Thigh', 'Deadlift · Sumo RDL · Hip Thrust · SL-RDL', 'DL: 55→65→72→78 lbs · Hip Thrust: 45→60 lbs'],
    ['FRI', '90%  —  Red', 'Upper + Carry', 'OHP 22.5–25 lbs · Pull-Up L9 · Carry 35 lbs', 'OHP: 22.5→25→27.5 lbs · Carry: 35→40→45→50 lbs · Pull-up: L9→8→7→6'],
    ['SUN', 'Active Recovery', 'Corrective + Mobility', 'Light cardio · Copenhagen · SL bridge · Mobility', 'Hold times: Copenhagen +5s/wk · Plank +10s/wk · 90/90 hip depth'],
    ['SAT/MON', 'Off', 'At-Home Optional', 'Copenhagen · Ankle mobility · Walk', 'See At-Home plan'],
  ],
  milestones4wk: 'Wk2: goblet squat knees tracking clean without banded cue. Wk2: 5+ full floor push-ups. Wk3: pull-up drops to Level 8. Wk4: deadlift at 75+ lbs, carry at 50 lbs/hand, plank at 1:20, OHP at 25 lbs ×6. Wk4 also carries the full strength reassessment — every tested lift in the baselines table gets re-checked and working loads reset from the result.',
  milestones8wk: '15 full push-ups unassisted. Pull-up at Level 6 or below. Deadlift at 90+ lbs. Farmer carry at 65 lbs/hand. OHP at 27.5–30 lbs ×6. Plank at 1:45. Row at 50 lbs ×10. Styku re-scan to measure body comp change.',
  rescanNote: 'Styku 3D scan at Week 8 measures leg lean mass asymmetry (baseline: left 15.7 vs right 16.5 lbs), body fat % (baseline 36.4%), and Shape Score (baseline 61/100). This is the objective measure of the corrective and recomposition program. Read every figure as a personal trend across scans rather than a precise diagnostic number — this scanner is far better at tracking change in one person over time than at pinning an exact absolute value on any single reading.',
};

const data = {
  client,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days: [day1, day2, day3, day4, day5],
  summary,
};

module.exports = { data };

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'kelly_mulroy');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Kelly_Mulroy_5Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Kelly_Mulroy_5Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
