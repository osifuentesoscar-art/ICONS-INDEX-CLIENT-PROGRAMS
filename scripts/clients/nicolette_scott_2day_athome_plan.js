/**
 * Nicolette Scott — ICONS 2-Day At-Home/Office Training Plan
 * Brace Life Studios
 *
 * COMPANION DOCUMENT to scripts/nicolette_scott_2day_plan.js (the full-gym
 * version) — same client, same Styku scan (8/13/2026), same clinical
 * findings, same asymmetry protocol. See that script's header comment for
 * the full Styku-interpretation reasoning (ALST/VFA/BMI corrections, the
 * name-alias note) — not repeated verbatim here; only equipment-driven
 * differences are re-derived below.
 *
 * LANGUAGE CORRECTED 8/17/2026 (matching the full-gym version's header
 * comment): VFA risk-band labeling ("Very Low Risk" etc.) is retired per
 * CLAUDE.md's corrected VFA framing — 20.1 cm² is now presented as a
 * trend/context figure only. The Asymmetry Protocol trigger is corrected
 * from an absolute >=0.5 lb L/R gap to a relative >=10% gap. Recomputed:
 * the 0.5 lb leg gap (13.8 vs 14.3 lbs) is only ~3.5% relative — it met
 * the OLD trigger exactly but does NOT clear the corrected >=10% standard.
 * **FLAGGED DISCREPANCY**, same as the full-gym version — the left-leg-
 * leads prescription already programmed into this document is left
 * UNCHANGED pending a dedicated per-client review; only the trigger-logic
 * language is corrected here. The 0.3 lb arm gap (~5% relative) stays
 * below the trigger either way, no change there.
 *
 * EQUIPMENT ASSUMPTION — stated explicitly and prominently in-document
 * (first baselineNote, a goldCallout) per this system's convention of
 * disclosing assumptions rather than burying them: dumbbells only, a
 * reasonable range up to roughly 25-30 lb pairs (sized off her tested loads,
 * which topped out at 20 lbs/hand), plus a bench or sturdy elevated surface.
 * NO barbell, NO hex bar, NO cable machine, NO pull-up bar. Every exercise
 * below is written for that setup. If her actual home/office equipment
 * differs, this document should be revised before use.
 *
 * SUBSTITUTIONS FROM THE STUDIO VERSION:
 *   Hex Bar Deadlift  -> DB Romanian Deadlift (double DB)
 *   Back Squat        -> DB Goblet Squat (single DB)
 *   Hip Thrust         -> DB Hip Thrust (bench-supported, double DB)
 *   Cable/Band Face Pull -> DB Reverse Fly (bent-over)
 * Everything already DB-based in the studio version (OHP, Incline Press,
 * Farmers Carry, Single-Leg RDL, DB Split Squat, Single-Arm Row, Bent-Over
 * Row, Push-Ups, Plank) carries over unchanged in exercise selection; only
 * the DB-capped load progression differs where noted.
 *
 * EQUIPMENT-CAPPED LOADS: several lifts here are naturally lighter than
 * their studio barbell/hex-bar counterparts because a dumbbell-pair ceiling
 * (~25-30 lbs/hand assumed) caps total load well below what a barbell
 * allows — most visible on the Hip Thrust substitute (studio version
 * reaches 80 lbs total by Week 4; the double-DB version here caps around
 * 55-60 lbs total). This is flagged explicitly in baselineNotes and the
 * Block B intro rather than left for the reader to notice — it is an
 * equipment ceiling, not a program deficiency, and progressing to the
 * studio version or heavier dumbbells is the natural next step once
 * equipment becomes the limiting factor rather than strength.
 *
 * STYKU BLOCK — NOT rendered in full here (no `data.styku` object). The
 * complete Styku table with every segmental figure lives in the companion
 * full-gym document; this document carries a condensed teal cross-reference
 * summary instead so the clinical facts are still stated here, without
 * duplicating the full table across two documents for the same scan.
 *
 * ANTAGONIST ROTATION RULE — applied at build time, mirroring the studio
 * version's block structure and pattern sequencing so both documents stay
 * internally consistent. Compliance checked inline per block below.
 *
 * REVISION (8/19/2026) — ICONS BLOCK METHOD RESTRUCTURE, mirroring the
 * full-gym version's same-day restructure so both documents stay
 * structurally consistent (see scripts/nicolette_scott_2day_plan.js's
 * 8/19 header note for the full slot-mapping rationale; spec: CLAUDE.md's
 * Block Method section; pilot: scripts/siobhan_hansen_3day_plan.js).
 * Slot 4 (Jason's Exercise) omitted both days (nothing on file); slot 1
 * served by the existing Control & Alignment activation blocks.
 *   DAY A: primary = DB Romanian Deadlift (own block + DB-only options:
 *   B-stance DB RDL, sumo-stance DB deadlift); accessory = DB Hip Thrust
 *   + Lateral Raise (+ options: floor glute bridge, single-leg glute
 *   bridge left leads); secondary = press block (+ options: half-kneeling
 *   single-arm DB press, DB floor press); integration = Farmer Carry +
 *   Plank + Suitcase Carry split into its own closing block, with the
 *   Zone 2 line moved to a separate Conditioning Close.
 *   DAY B: primary = DB Goblet Squat (own block + options: squat to a
 *   box/sturdy chair, staggered-stance goblet squat); accessory = DB
 *   Split Squat + DB Reverse Fly; secondary = pull block (+ options:
 *   chest-supported DB row prone on the bench, staggered-stance
 *   single-arm row braced on the knee); Push-Up & Side Plank retained as
 *   a standing baseline block; NEW integration closer — Farmer Carry
 *   (Light), 2x25 yd at 15 lbs/hand, anchored below her tested 20
 *   lbs/hand reference (mirrors the gym version's new Day B closer);
 *   Zone 2 moved to its own Conditioning Close. Rendered exercise order
 *   otherwise unchanged; all options DB-only per the stated equipment
 *   assumption (no landmine/Kieser/barbell options in THIS document —
 *   those live in the studio version only).
 * TOUCH RULES: no cable references existed here (already DB-only);
 * equipment ceilings trivially satisfied (~25-30 lb pair assumption);
 * DELOAD — same AUTOREGULATED recovery-week note as the gym version (one
 * training week, venue-independent); 4-week strength cadence noted in
 * the summary. Warm-up drift checked: unloaded prep only.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad } = require('../icons_template');

const client = {
  name: 'Nicolette Scott',
  programTitle: '2-Day At-Home/Office Training Plan',
  subtitle: 'Dumbbell-Only Foundational Strength Build',
  schedule: 'At-Home/Office · Dumbbell-Only · 2 Days/Week',
  stats: ['Age 35', "5'6\"", '115 lbs', 'At-Home/Office · Dumbbell-Only · 2 Days/Week'],
  weightKg: 52.2,
  ageYears: 35,
  isPostmenopausal: false,
  bmr: 1299,
  alstIndex: 5.52,
};

// Loads shared/consistent with the studio version wherever the exercise is
// already DB-based (OHP, Incline Press, Single-Leg RDL, Split Squat).
const ohpRM = epley1RM(10, 5); // 12
const ohpWk1 = workingLoad(ohpRM, 0.75, 2.5); // 10
const ohpWk4 = workingLoad(ohpRM, 0.95, 2.5); // 12.5
const inclineRM = epley1RM(15, 5); // 18
const inclineWk1 = workingLoad(inclineRM, 0.75, 2.5); // 12.5
const inclineWk4 = workingLoad(inclineRM, 0.95, 2.5); // 17.5
const slrdlRM = epley1RM(15, 8); // 19
const slrdlWk1 = workingLoad(slrdlRM, 0.75, 2.5); // 15
const slrdlWk4 = workingLoad(slrdlRM, 0.95, 2.5); // 17.5

const baselineNotes = [
  {
    type: 'gold',
    label: 'Equipment Assumption — Please Confirm',
    body: 'This home/office program assumes a genuinely basic setup: dumbbells only, a reasonable range up to roughly 25-30 lb pairs (sized off Nicolette\'s tested loads, which topped out at 20 lbs/hand), plus a bench or sturdy elevated surface. No barbell, no hex bar, no cable machine, no pull-up bar. Every exercise below is written for that equipment — flag to your coach right away if her actual home/office setup differs (more equipment, less, or different), so loads and exercise selection can be corrected before she trains from this document.',
  },
  {
    type: 'teal',
    label: 'Styku Summary — Full Scan Detail Lives in the Full-Gym Document',
    audience: 'internal',
    body: 'ALST Index 5.52 kg/m² — within the normal reference range (>=5.5 kg/m²), NOT At-Risk, but only 0.02 kg/m² above the At-Risk cutoff — genuinely borderline and a real monitoring point for her 8-week rescan; ALST is tracked here as a trend metric, not a graded score, and no higher tier exists above the 5.5 kg/m² cutoff for women — the 7.0 kg/m² figure previously used as an upper tier is EWGSOP2\'s separate MALE at-risk threshold, not a female target. VFA (Segmental Analysis) 20.1 cm² — presented as a trend/context figure to track over time rather than a risk-band label; CLAUDE.md\'s prior absolute VFA risk-band table (which this document previously cited to assign this reading a risk-band label of its own, itself a correction of the band Styku\'s dashboard prints for it) was retired 8/17/2026 as unsupported by consensus guidance and by this scanner\'s own validation limits (the separate raw "Visceral Fat 0.2" figure elsewhere on her scan is a different, non-cm² scale and is not used). BMI 18.6 — technically Normal, only 0.1 above the Underweight cutoff, noted as borderline and not flagged clinically. The complete Styku table (body fat, lean mass, bone mass, Shape Score, full segmental LST) lives in her companion 2-Day Full Gym Training Plan — the clinical facts and asymmetry protocol below apply identically here.',
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Left Leg Leads Unilateral Work',
    body: 'Left Leg LST 13.8 lbs / Right Leg LST 14.3 lbs — left leg reads as the lighter/weaker side on this scan and leads every unilateral leg exercise in this program (Single-Leg RDL and DB Split Squat), same as the full-gym version. Left Arm LST 5.8 lbs / Right Arm LST 6.1 lbs — a smaller gap; no side-lead is applied to arm work (Single-Arm Row, Farmers Carry).',
  },
  {
    type: 'watch',
    label: 'Asymmetry Trigger Recalculation — Flagged Discrepancy (8/17/2026)',
    audience: 'internal',
    body: "CLAUDE.md's Asymmetry Protocol trigger was corrected 8/17/2026 from an absolute >=0.5 lb L/R gap to a relative >=10% gap (the old absolute trigger was firing on measurement noise, per an external evidence review). Recomputed against this client's actual numbers: Left Leg 13.8 lbs / Right Leg 14.3 lbs (0.5 lb gap) met the OLD trigger exactly but is only ~3.5% relative — it does NOT clear the corrected >=10% threshold. Left Arm 5.8 lbs / Right Arm 6.1 lbs (0.3 lb gap, ~5% relative) stays below the trigger either way, no change there. Per this pass's explicit instruction, the left-leg-leads prescription already programmed into this document's exercise blocks (Single-Leg RDL, DB Split Squat) is left UNCHANGED pending a dedicated per-client review — this note exists to make the discrepancy visible for that review, not to resolve it silently. Same discrepancy already flagged in the companion full-gym document. Flagged to the main thread/icons-expert.",
  },
  {
    type: 'gold',
    label: 'Age Bracket & Program Level',
    audience: 'internal',
    body: 'At 35 — the literal boundary of the 20-35 and 35-45 brackets — no CLAUDE.md numeric threshold actually differs at this exact age, so the shared guidance applies directly: protein stays at the active-women-general 1.6 g/kg tier, creatine is indicated (not yet strongly indicated), full volume/frequency target, RIR-based autoregulation. This is a first build for a first-time-tested, early-intermediate client — technique-first, not advanced/elite periodization, same posture as the full-gym version.',
  },
  {
    type: 'blue',
    label: 'Planned Recovery Week — Built In, Timed by How Training Is Actually Going',
    body: 'Roughly every four to six weeks of continuous progression, this program takes one deliberately lighter week — the same in this at-home plan as in the studio version, since it is one training week regardless of venue: the same exercises and movement patterns, sets reduced by roughly a third, every set held comfortably well short of hard effort, and loads held rather than climbing. At her current technique-first loads the light week is not fixed to a calendar date: the natural first window is right after the Week 4 strength check, and it moves earlier if lifts stall, soreness lingers, or sleep degrades. One light week costs nothing that matters — muscle built over the previous weeks is not lost in a single reduced-volume week.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Session Architecture — ICONS Block Method Restructure (8/19/2026)',
    body: 'Restructured onto the ICONS Block Method six-slot order in the same pass as the companion full-gym document, mirroring its slot mapping so the two documents stay structurally consistent — see the full-gym script/CLIENTS.md entry for the complete rationale. Slot 4 omitted both days (no Jason Bethea relationship on file); slot 1 served by the existing Control & Alignment blocks. Primary/accessory/secondary splits mirror the gym version with DB-only substitutes; integration closers: Day A = the existing carry/core work split into its own closing block (Zone 2 moved to a separate Conditioning Close), Day B = a NEW light Farmer Carry closer (2x25 yd, 15 lbs/hand — anchored below her tested 20 lbs/hand reference, no invented number), mirroring the gym version\'s new Day B closer. All options menus are DB-only per this document\'s stated equipment assumption — no landmine/Kieser/barbell options here; those exist only in the studio version. Same pass: autoregulated recovery-week note added (identical call to the gym version — one training week, venue-independent); 4-week strength cadence noted in the summary. The asymmetry-trigger flagged discrepancy (8/17) and left-leg-leads prescription are untouched.',
  },
  {
    type: 'gold',
    label: 'Equipment-Driven Load Differences vs. the Full-Gym Program',
    body: 'DB-based substitutes for barbell/hex-bar lifts are naturally lighter than their studio counterparts, and several will hit a practical dumbbell-pair ceiling (~25-30 lbs/hand assumed) by Week 4 rather than a strength ceiling — most visible on the Hip Thrust substitute below, which caps well under the studio version\'s Week 4 target. That is an equipment limit, not a program deficiency. When she can access the studio, or if her home equipment grows past this range, progressing to the Full Gym Training Plan (or simply adding heavier dumbbells) is the natural next step — flag this at her next check-in.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'DAY A — Hinge, Press & Core Foundation',
    subtitle: 'DB Romanian Deadlift · DB Hip Thrust · Press — Strength Foundation',
    descriptor: 'PRIMARY HINGE & PRESS STRENGTH · LOADED CARRY & CORE · DUMBBELL-ONLY · 50–60 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'Control precedes power: a short activation block opens the session before the two biggest hinge lifts go on the dumbbells. Technique wins over load every time the two compete — especially true here, where dumbbell hinge patterns demand more grip and stabilizer control than the equivalent barbell/hex-bar lift. Closes with a loaded-carry-and-core finisher that doubles as the primary conditioning stimulus at 2 days/week.',
    warmUp: '6-8 min: brisk walk or stair climb (Zone 2). Then: bodyweight glute bridge 2x12, bodyweight hip hinge drill 2x10 (hands on hips, hinge to a wall behind), cat-cow 10 slow reps, arm circles 10 each direction.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Wakes the glutes and posterior chain and locks in core bracing before any compound load goes on the dumbbells — no equipment needed, same as the full-gym version\'s opening block.',
        exercises: [
          { name: 'Glute Bridge (Bodyweight)', sets: '2', reps: '15', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Full hip extension, squeeze glutes hard at top, no low-back arch.' },
          { name: 'Prone Y-T-W Raise', sets: '2', reps: '10 each', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Face down on floor or bench, lift arms in Y then T then W shapes.' },
          { name: 'Dead Bug', sets: '2', reps: '10 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back pressed flat, slow opposite arm-leg reach, exhale on the reach.' },
        ],
      },
      // Compound zone. Pattern check across blocks B-C: DB Romanian
      // Deadlift (hinge) -> DB Hip Thrust (hinge) -> DB Lateral Raise
      // (shoulder isolation) = 2 hinge + 1 different pattern. No 3rd hinge
      // stacked. Compliant — order unchanged by the 8/19 re-cut.
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — DB ROMANIAN DEADLIFT',
        introLabel: 'Load Target',
        intro: 'The day\'s main lift. DB Romanian Deadlift replaces the studio version\'s Hex Bar Deadlift — naturally lighter by design, an equipment difference, not a regression. If the day calls for a variation, rotate between: a B-stance DB RDL (rear foot down for balance, one leg doing the working share) or a sumo-stance DB deadlift (wider base, more upright torso) — both dumbbell-only. The double-DB Romanian deadlift stays the lift we track.',
        exercises: [
          { name: 'DB Romanian Deadlift (Double DB)', sets: '3', reps: '6–8', load: 'Wk1: 20 lbs/hand → Wk4: 27.5–30 lbs/hand', tempo: '2-1-1', rest: '90s', cue: 'Hinge from hip, DBs stay close to legs, feel hamstring load, stand tall.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — DB HIP THRUST & SHOULDER',
        introLabel: 'Load Target',
        intro: 'The glute-building accessory directly behind the hinge — DB Hip Thrust (bench-supported, double dumbbell across the hips) replaces the barbell version and caps around 55-60 lbs total by Week 4 here versus 80 lbs total in the studio program: an equipment ceiling, not a strength ceiling. A light lateral raise rotates the pattern before the pressing block. If the hip thrust needs a variation: a floor glute bridge or a single-leg glute bridge (left leg leads) covers the same pattern.',
        exercises: [
          { name: 'DB Hip Thrust (Bench-Supported)', sets: '3', reps: '8', load: 'Wk1: 20 lbs/hand → Wk4: 27.5–30 lbs/hand (double DB)', tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, DBs rest on hip crease, full extension at top.' },
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
        intro: `The day's second compound pattern — pressing, rotating off the hinge work above. Same DB-based lifts as the full-gym version — no equipment substitution needed here. Seated overhead press (Epley 1RM ~${ohpRM} lbs/hand) and incline chest press (Epley 1RM ~${inclineRM} lbs/hand) both tested clean. Single-Leg RDL closes the block — left leg leads (weaker side). If the day calls for a press variation: a half-kneeling single-arm DB press or a DB floor press (no bench needed) covers the same patterns; the seated press and incline press stay the lifts we track.`,
        exercises: [
          { name: 'DB Overhead Press (Seated)', sets: '3', reps: '8', load: `Wk1: ${ohpWk1} lbs/hand → Wk4: ${ohpWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'Chair or bench with back support, spine neutral, press overhead.' },
          { name: 'Incline DB Chest Press (Bench)', sets: '3', reps: '8', load: `Wk1: ${inclineWk1} lbs/hand → Wk4: ${inclineWk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'Bench at 30-45°, full range, control the descent, no bench arch.' },
          { name: 'Single-Leg RDL (DB)', sets: '3', reps: '8 ea, LEFT leads', load: `Wk1: ${slrdlWk1} lbs/hand → Wk4: ${slrdlWk4} lbs/hand`, tempo: '3-1-1', rest: '75s', cue: 'Left leads (weaker side). Slight knee bend, hinge from hip, reach floor.' },
        ],
      },
      // Metabolic zone (less strict per CLAUDE.md, but checked anyway).
      // Pattern: Farmer Carry (carry) -> Plank (core) -> Suitcase Carry
      // (carry) — 2 carry, not 3 consecutive, split by Plank in between.
      // Compliant.
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — LOADED CARRY + CORE',
        color: 'gold',
        introLabel: 'Format',
        intro: 'The session\'s closing compound work — the carries pull the day\'s hinge strength and braced posture together under gait, and a hallway, driveway, or office corridor is enough space. Carry with both hands evenly on the Farmer Carry; the arm-to-arm difference here is minor, so no side-lead is applied there — the suitcase carry alternates sides evenly. Distance and movement quality govern this work, not an effort target.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '3', reps: '25–30 yds', load: 'Wk1: 20 lbs/hand → Wk4: 25 lbs/hand', tempo: 'Controlled', rest: '75s', cue: 'Shoulders packed, chest tall, neutral neck. Carry evenly, both hands.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: '1:00–1:10', load: 'Bodyweight', tempo: '—', rest: '60s', cue: 'Baseline 1:36. Hold at 1:00-1:10 in training — quality over max time.' },
          { name: 'Suitcase Carry (Single-Side, DB)', sets: '2+2', reps: '20–25 yds ea', load: 'Wk1: 15 lbs → Wk4: 20 lbs', tempo: 'Controlled', rest: '60s', cue: 'Resist lateral lean, tall posture, brace hard on the loaded side.' },
        ],
      },
      {
        letter: 'F',
        title: 'CONDITIONING CLOSE',
        color: 'gold',
        introLabel: 'Why',
        intro: 'A brief steady-state close — the primary cardiovascular dose at 2 days/week, after the training work is done.',
        exercises: [
          { name: 'Stair Climb or Brisk Walk — Zone 2', sets: '1', reps: '10 min', load: 'Conversational pace', tempo: 'Steady', rest: '—', cue: 'Easy, steady effort. Minimum weekly cardiovascular dose, session close.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 45s each. Doorway chest stretch 30s each. Cat-cow 8 slow reps. Thoracic extension over a rolled towel 45s.',
    iconsNote: 'Muscle is the medicine — every set of hinge and press work here is a hormonal reset as much as a strength builder. Log load and RIR every set this first month; it becomes the numeric record everything else in this program tracks against.',
  },
  {
    intensity: 80,
    title: 'DAY B — Squat, Lunge & Pull Strength',
    subtitle: 'DB Goblet Squat · DB Split Squat · Row — Lower Body & Pulling Strength',
    descriptor: 'PRIMARY SQUAT & PULL STRENGTH · PUSH-UP PROGRESSION · DUMBBELL-ONLY · 50–60 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Strength builds confidence: this day pairs squat/lunge loading with direct pulling strength, then closes on the push-up progression tested at intake. Same primary-strength intensity as the studio version — last 1-2 reps hard but achievable, never grinding.',
    warmUp: '6-8 min: brisk walk or stair climb (Zone 2). Then: bodyweight glute bridge 2x12, bodyweight squat-to-stand 2x8, prone Y-T-W raise 2x10, ankle circles 10 each.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Primes the hip abductors and thoracic spine ahead of squat and lunge loading — general movement-quality preparation, no equipment needed.',
        exercises: [
          { name: 'Standing Hip Abduction (Bodyweight)', sets: '2', reps: '12 ea side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Hips level, no torso lean, controlled tempo both directions.' },
          { name: 'Clamshell (Bodyweight or Light Band)', sets: '2', reps: '12 ea side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Side-lying, knees bent, lift top knee, keep hips stacked and still.' },
          { name: 'Thoracic Rotation (Quadruped)', sets: '2', reps: '8 ea side', load: 'Bodyweight', tempo: 'Controlled', rest: '30s', cue: 'Hand behind head, rotate from the mid-back, hips stay still.' },
        ],
      },
      // Compound zone. Pattern check across blocks B-C: DB Goblet Squat
      // (squat) -> DB Split Squat (squat/lunge, left leads) -> DB Reverse
      // Fly (horizontal pull) = 2 squat/lunge + 1 different pattern. No
      // 3rd squat/lunge stacked. Compliant — order unchanged by the re-cut.
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — DB GOBLET SQUAT',
        introLabel: 'Load Target',
        intro: 'The day\'s main lift. DB Goblet Squat (single DB, held at chest) replaces the studio version\'s Back Squat — naturally lighter by design, an equipment difference, not a regression. If the day calls for a variation, rotate between: a squat to a box or sturdy chair (depth set by the surface) or a staggered-stance goblet squat (one foot slightly back, left leg forward first) — both dumbbell-only. The goblet squat stays the lift we track.',
        exercises: [
          { name: 'DB Goblet Squat', sets: '3', reps: '8', load: 'Wk1: 20 lbs → Wk4: 27.5–30 lbs', tempo: '3-1-1', rest: '90s', cue: 'DB held at chest, full depth, chest tall, elbows inside knees at bottom.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — SPLIT SQUAT & SHOULDER HEALTH',
        introLabel: 'Load Target',
        intro: 'Unilateral accessory work directly behind the squat — DB Split Squat is unchanged from the studio version (already DB-based), left leg leading every set — then the DB Reverse Fly rotates the pattern, standing in for the studio version\'s face pull.',
        exercises: [
          { name: 'DB Split Squat', sets: '3', reps: '8 ea, LEFT leads', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-1', rest: '75s', cue: 'Left leads (weaker side). Front knee tracks over toes, even tempo.' },
          { name: 'DB Reverse Fly (Bent-Over)', sets: '3', reps: '15', load: '5–8 lbs/hand', tempo: '2-1-2', rest: '30s', cue: 'Hinge forward, soft knees, raise arms out to sides, squeeze shoulder blades.' },
        ],
      },
      // Compound zone. Antagonist walk ACROSS the C->D boundary (fixed
      // 8/19/2026, batch-2 audit, mirroring Mary Burfete's 8/16 fix and
      // the studio version's same-day fix): Block C ends on the Reverse
      // Fly (pull), so the old D order (SA Row -> Bent-Over Row) stacked
      // a 3rd consecutive pull across the boundary. Push Press now sits
      // between the two rows: Reverse Fly -> SA Row -> Push Press ->
      // Bent-Over Row. Compliant on the full rendered walk.
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — PULL STRENGTH',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — pulling, rotating off the squat and lunge work above, with the push press breaking up the two rows so the pulling muscles get a breather mid-block. Row was not part of the tested 10-pattern battery — today\'s working loads become the new 8-week baseline for both rows, tracked the same as every tested lift. No side-lead is applied to Single-Arm Row — the arm-to-arm difference here is minor. Same exercises and loads as the studio version — no equipment substitution needed here. If the row needs a variation: a chest-supported DB row (lying prone on the bench) or a staggered-stance single-arm row (free hand braced on the knee) covers the same pattern; today\'s rows stay the lifts we track.',
        exercises: [
          { name: 'Single-Arm DB Row (Bench-Supported)', sets: '3', reps: '8 ea side', load: 'Wk1: 15 lbs → Wk4: 20 lbs', tempo: '3-1-2', rest: '60s', cue: 'One hand and knee on bench, flat back, drive elbow to hip.' },
          { name: 'Standing DB Push Press', sets: '3', reps: '8', load: 'Wk1: 10 lbs/hand → Wk4: 12.5 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'Slight knee dip, drive up and press overhead in one motion.' },
          { name: 'Bent-Over DB Row (Both Arms)', sets: '3', reps: '10', load: 'Wk1: 12.5 lbs/hand → Wk4: 17.5 lbs/hand', tempo: '2-1-2', rest: '60s', cue: 'Hip hinge, flat back, pull both DBs to lower ribs.' },
        ],
      },
      {
        letter: 'E',
        title: 'PUSH-UP PROGRESSION & CORE',
        color: 'green',
        introLabel: 'Baseline',
        intro: '10 reps on an incline (hands on a bench or sturdy chair) is a solid bridge point toward full floor push-ups. Side plank varies the core stimulus from Day A\'s front plank.',
        exercises: [
          { name: 'Incline Push-Up (Hands on Bench/Chair)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Baseline 10 reps. Full chest to hand level, controlled descent.' },
          { name: 'Side Plank', sets: '2', reps: '30s ea side', load: 'Bodyweight', tempo: '—', rest: '45s', cue: 'Hips stacked, no sag, straight line shoulder to ankle.' },
        ],
      },
      {
        letter: 'F',
        title: 'FULL-BODY INTEGRATION — FARMER CARRY (LIGHT)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — a light loaded carry pulling the day\'s squat posture, pulling strength, and core bracing together under gait. Loads stay deliberately below Day A\'s carry work — this closes the day with quality movement, not extra load. Carry evenly with both hands; distance and movement quality govern this work, not an effort target.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands — Light)', sets: '2', reps: '25 yds', load: '15 lbs/hand', tempo: 'Controlled', rest: '60s', cue: 'Hinge to pick up clean. Shoulders packed, chest tall, carry evenly.' },
        ],
      },
      {
        letter: 'G',
        title: 'CONDITIONING CLOSE',
        color: 'gold',
        introLabel: 'Why',
        intro: 'A brief steady-state close, same dose and role as Day A\'s stair climb.',
        exercises: [
          { name: 'Stair Climb, Jump Rope, or Brisk Walk — Zone 2', sets: '1', reps: '10 min', load: 'Conversational pace', tempo: 'Steady', rest: '—', cue: 'Easy, steady effort. Session close, same dose as Day A.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 8 slow reps. Doorway chest stretch 30s each. Hip flexor lunge 45s each.',
    iconsNote: 'Strength builds confidence — every set here proves the technique from Day A translates to real load, even with a lighter home setup. Track push-up rep count and plank hold time weekly alongside the lift numbers; both are core baseline metrics.',
  },
];

const baselines = [
  ['Hex Bar Deadlift → DB Romanian Deadlift', '45 lbs x12 (studio test — hex bar)', '12 RM', 'Wk1: 20 lbs/hand → Wk4: 27.5-30 lbs/hand (double DB). Equipment-capped vs. studio version.'],
  ['Back Squat → DB Goblet Squat', '55 lbs x5 (studio test — barbell)', '5 RM', 'Wk1: 20 lbs → Wk4: 27.5-30 lbs (single DB). Equipment-capped vs. studio version.'],
  ['Seated DB Overhead Press', `10 lbs/hand x5 (Epley 1RM ~${ohpRM} lbs/hand)`, '5 RM', `Wk1: ${ohpWk1} lbs/hand x8 → Wk4: ${ohpWk4} lbs/hand x8. Same as studio version — already DB-based.`],
  ['Incline DB Chest Press', `15 lbs/hand x5 (Epley 1RM ~${inclineRM} lbs/hand)`, '5 RM', `Wk1: ${inclineWk1} lbs/hand x8 → Wk4: ${inclineWk4} lbs/hand x8. Same as studio version — already DB-based.`],
  ['Incline Push-Ups', '10 reps (max)', 'Max', 'Wk1: 10-12 reps x3 sets → Wk4: 12-15 reps, begin floor attempts. Same as studio version.'],
  ['DB Farmers Carry', '20 lbs/hand (reference load)', 'Working', 'Wk1: 20 lbs/hand x3, 25-30 yds → Wk4: 25 lbs/hand. No side-lead (arm gap below trigger).'],
  ['Hip Thrust → DB Hip Thrust', '65 lbs x8 (studio test — barbell)', '8 RM', 'Wk1: 20 lbs/hand → Wk4: 27.5-30 lbs/hand (double DB, ~55-60 lbs total). Meaningfully equipment-capped vs. the studio version\'s 80 lbs total by Wk4.'],
  ['Single-Leg RDL', `15 lbs/hand x8 (Epley 1RM ~${slrdlRM} lbs)`, '8 RM', `Wk1: ${slrdlWk1} lbs/hand x8 ea → Wk4: ${slrdlWk4} lbs/hand x8 ea. LEFT leads (weaker leg). Same as studio version.`],
  ['DB Split Squat (Lunge Substitute)', '15 lbs/hand (reference load)', 'Working', 'Wk1: 12.5 lbs/hand x8 ea → Wk4: 17.5 lbs/hand x8 ea. LEFT leads (weaker leg). Same as studio version.'],
  ['Plank Hold', '1:36 (max)', 'Max', 'Wk1: hold 1:00-1:10 x2-3 → Wk4: 1:30-1:45. Same as studio version.'],
  ['Pull-Up (Bonus)', 'Not Tested', '—', 'Not part of the 10 core baseline patterns, and not programmable at home (no pull-up bar assumed). Test at the studio once foundational pulling strength is established.'],
];

const summary = {
  subtitle: 'Nicolette Scott  ·  ICONS Index  ·  Foundational Strength Build  ·  2 Days/Week  ·  At-Home/Office · Dumbbell-Only',
  rows: [
    ['Wk 1', '—', 'Day A & B', 'DB RDL 20 lbs/hand / Goblet Squat 20 lbs / DB Hip Thrust 20 lbs/hand', 'Establish all working loads at technique-first intensity. Push-up: 10-12 incline reps. Plank: 1:00-1:10.'],
    ['Wk 2', '—', 'Day A & B', 'Add 2.5-5 lbs where form is clean at 2 RIR', 'Add load only at 2 RIR + clean form. Push-up: begin full-floor attempts. Plank: 1:15-1:20.'],
    ['Wk 3', '—', 'Day A & B', 'Approach equipment-capped ceiling on Hip Thrust/Goblet Squat/RDL', 'Loads on DB-only lifts begin approaching the practical dumbbell-pair ceiling. Push-up: 4-6 full floor reps. Plank: 1:20-1:30.'],
    ['Wk 4', '—', 'Day A & B', 'DB RDL 27.5-30 lbs/hand / Goblet Squat 27.5-30 lbs / DB Hip Thrust 27.5-30 lbs/hand', 'Peak week within equipment limits. Push-up: 6-8 full unassisted. Plank: 1:30-1:45.'],
  ],
  milestones4wk: 'All lifts progressed on schedule within equipment limits. Push-up: 6-8 full floor reps. Plank: 1:30-1:45. Flag at check-in whether any DB-only lift (especially Hip Thrust) has hit its equipment ceiling before Week 4. Week 4 closes with the strength check (the standing 4-week reassessment) — the natural window for the planned recovery week that follows it (see the recovery-week note above).',
  milestones8wk: 'Re-test the full 10-pattern battery in whichever setting (home or studio) she trains in most. If home equipment has not grown past the ~25-30 lb pair range, recommend a studio session or heavier dumbbells specifically for Hip Thrust and Goblet Squat, which are the two most equipment-capped lifts in this document.',
  rescanNote: 'Styku rescan recommended at 8 weeks — see the full-gym document for the complete rescan tracking list (ALST, BMI, Shape Score, leg segmental gap). Identical here; not restated in full to avoid duplicating the same tracking note across both documents.',
};

const data = {
  client,
  baselines,
  baselinesTargetHeader: 'AT-HOME EQUIVALENT · 4-WEEK TARGET',
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

// Client View (added 8/17/2026): no `clientHighlight` set — same reasoning
// as the full-gym companion document (first-build client, nothing to
// compare against yet). 2 baselineNotes are internal-only (Styku Summary —
// explicitly cites CLAUDE.md's corrected ALST/VFA standards and corrects
// Styku's own dashboard label; Age Bracket & Program Level — cites CLAUDE.md's bracket-
// boundary reasoning directly). No `insight`/`flag` fields exist anywhere in
// this script, so no exercise-level filtering was needed, and no block
// `intro` text references either internal-only note ("see note above"-style
// dangling references), so nothing else needed rewording.
async function main() {
  const outDir = path.join(__dirname, '..', '..', 'clients', 'nicolette_scott');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Nicolette_Scott_2Day_AtHome_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Nicolette_Scott_2Day_AtHome_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
