/**
 * Sarah — ICONS 2-Day Training Plan
 * Brace Life Studios
 *
 * FIRST BUILD, 8/18/2026 — genuinely fresh, NOT a revision. Prior to this
 * build the only record of "Sarah" anywhere in this system was a two-line
 * pre-repo legacy outline in CLAUDE.md's old client-roster block (a virtual
 * 2-day "Athletic Strength" program built around a bench-press/cable-pull/
 * heavy-squat+OHP-superset structure) — no `clients/sarah/` folder, no
 * build script, nothing in Drive. That outline is SUPERSEDED, not merged:
 * most of its structure (bench press, cable machine, heavier squat/press
 * loading) directly conflicts with the real, current constraints below.
 * Per this system's standing "read the client's full existing record
 * before any build" rule: her full existing record was read (the two-line
 * legacy block above, and confirmed no `CLIENTS.md` entry existed) before
 * writing this script — there was nothing further to carry forward except
 * the one specific detail confirmed below.
 *
 * SOURCE OF DATA — NOT A STYKU/PARQ INTAKE. Every constraint in this
 * script comes from a voice note from Nick, one of Sarah's trainers (who
 * has been training her consistently for the past several sessions),
 * relayed by Xolokan on 8/18/2026. This is real-time trainer/movement
 * feedback, not a formal assessment. No age, sex, weight, height, Styku
 * scan, or strength-testing numbers exist anywhere in this system for her
 * as of this build — nothing beyond Nick's stated constraints was added or
 * inferred. Per CLAUDE.md's Demographic Scope Rule, this program applies
 * ONLY the sex-neutral structural philosophy (Three-Zone build, RIR-based
 * autoregulation, corrective-before-compound sequencing) — no numeric
 * clinical thresholds (protein tier, ALST, VFA, BMI, LIFTMOR candidacy,
 * pelvic floor triggers) are computed or implied anywhere in this document,
 * since there is no demographic/clinical data of any kind to attach them
 * to. `includeNutritionBlock: false`; `client.weightKg`/`ageYears`/
 * `isPostmenopausal`/`bmr`/`alstIndex` are all left genuinely UNSET (not
 * fabricated as placeholders), so `proteinBar()`/`pelvicFloorCallout()`
 * correctly never fire (both are falsy-gated off those exact fields).
 *
 * NICK'S STATED CONSTRAINTS (verbatim, the only real data on file — nothing
 * added beyond this):
 *   1. No cable machine, and no movement exceeding 20 lbs — a hard ceiling.
 *   2. Fast-paced, very little to no break time, high repetition.
 *   3. Doesn't want to use a bench if possible.
 *   4. Very limited lower back and hamstring mobility.
 *   5. Struggles with movements that require a flat back during a hip hinge.
 *   6. Doesn't get much range of motion on squats — typically just above
 *      parallel.
 *
 * PROGRAM DESIGN, per the main thread's explicit instruction:
 *   - Both days: continuous circuit style (3-4 rounds), 12-20 rep ranges or
 *     30-45s work windows, ~15-20s transitions between exercises, ~60-90s
 *     between full rounds ("fast-paced, little-to-no rest, high rep" made
 *     concrete). Activation/bodyweight work leads each day's warm-up before
 *     any loaded circuit work — "Control precedes power," the ICONS Three-
 *     Zone philosophy's Isolated-zone principle.
 *   - Squat pattern: cued to her actual comfortable/tolerated depth, never
 *     forcing full-depth progression, directly citing CLAUDE.md's "Full
 *     Range of Motion — With Control, Not At Its Expense" philosophy.
 *     Goblet squat (light DB up to 20 lbs) or bodyweight — no elevated-
 *     surface assist needed or used for the squat pattern itself.
 *   - Hip hinge: given her flat-back hinge struggle and limited hamstring/
 *     lower-back mobility, traditional RDL/DB deadlift is NOT her primary
 *     posterior-chain work. DB Hip Thrust and Glute Bridge (spine-
 *     supported, no sustained lumbar-flexion-resistant hinge under load)
 *     carry that role instead. ONE short-ROM hinge pattern-maintenance
 *     drill is included (Day A, Block A) — judgment call, reasoning stated
 *     directly in that block's intro rather than here.
 *   - No cable machine anywhere — banded rows, banded lat pulldown, DB
 *     rows, and DB pullovers stand in as needed. No bench-press pattern —
 *     floor press (lying on a mat/floor) or standing DB shoulder press
 *     replace any incline/flat bench press.
 *   - Carried forward from the old legacy outline (the one detail
 *     confirmed compatible and a real prior client preference, not a
 *     fabrication): single-arm DB row is programmed ONLY in superset, never
 *     as its own standalone straight-set block. See Day A, Block B.
 *   - Antagonist Rotation Rule applied at build time across both days'
 *     circuit blocks — checked inline per block below.
 *
 * EQUIPMENT ASSUMPTION — stated prominently in-document (first
 * baselineNote, a goldCallout), same convention as Nicolette Scott's
 * at-home build: dumbbells up to 20 lbs (hard ceiling), a resistance band,
 * bodyweight, and one sturdy elevated surface — a step, chair, or couch,
 * explicitly NOT called a "bench" per constraint 3 — for the one pattern
 * that genuinely needs elevation (DB Hip Thrust). No cable machine, no
 * barbell, no bench anywhere in this program. Flagged as easy to correct
 * if wrong, per the main thread's explicit instruction.
 *
 * NO `baselines[]` TABLE — no strength-testing battery exists for Sarah
 * (matches the Jake Poyner/Petra precedent for a client with no traditional
 * lift-testing data on file). Nothing fabricated in its place.
 *
 * REASSESSMENT CADENCE — per CLAUDE.md's corrected 4-week strength-
 * reassessment standard (8/17/2026), `summary.rescanNote` below points to a
 * 4-week check-in with Nick (load/rep tolerance, squat depth, hip-hinge
 * control) as the reassessment mechanism — not a Styku rescan, since no
 * Styku scan exists for her to begin with.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Sarah',
  programTitle: '2-Day Training Plan',
  subtitle: 'Fast-Paced Circuit Strength Foundation — Dumbbell ≤20 lb, Band & Bodyweight',
  schedule: '2 Days/Week · Circuit Format',
  stats: [
    'Trainer: Nick',
    '2 Days/Week',
    'Dumbbell ≤20 lb · Resistance Band · Bodyweight',
    'No age/sex/Styku data on file',
  ],
  // Deliberately NOT set: weightKg, ageYears, isPostmenopausal, bmr,
  // alstIndex — no such data exists for Sarah. Leaving these genuinely
  // absent (rather than fabricating placeholder values) is what correctly
  // keeps proteinBar()/pelvicFloorCallout() from firing — both are
  // falsy-gated off these exact fields in icons_template.js.
};

const baselineNotes = [
  {
    type: 'gold',
    label: 'Equipment Assumption — Please Confirm',
    body: 'This program is built around a genuinely light, constrained equipment set, per real-time programming feedback from Nick: dumbbells up to 20 lbs (a hard ceiling, not a soft guideline), a resistance band, bodyweight, and one sturdy elevated surface — a step, chair, or couch, not a bench, per Sarah’s preference — for the one exercise that genuinely needs elevation, DB Hip Thrust. No cable machine and no barbell appear anywhere in this program. If this equipment assumption is wrong, flag it to your coach right away so loads and exercise selection can be corrected before Sarah trains from this document.',
  },
  {
    type: 'gold',
    label: 'How This Program Was Built Around You',
    body: 'Every exercise here respects what you and Nick have worked out together: nothing over 20 lbs, no bench, a fast-paced/high-repetition circuit style with very little rest, and cautious range on hip-hinge and squat movements given your current lower back and hamstring mobility. Hip Thrust and Glute Bridge — not a traditional deadlift or RDL — carry the primary hip-strength role in this program for exactly that reason: they build real hip and glute strength without asking for the sustained flat-back hip hinge under load that’s currently a challenge for you. Squat depth is cued to wherever is genuinely comfortable for you, not a fixed target — quality over depth, always.',
  },
  {
    type: 'purple',
    audience: 'internal',
    label: 'Why This Program Doesn’t Use the Standard ICONS Science-Layer Numbers',
    body: 'No age, sex, weight, or Styku scan exists on file for Sarah at all — this is one level further than a client who simply falls outside a bracket (e.g. Jake Poyner, Vinz Feller): there is no demographic or clinical data of any kind to place her in a bracket to begin with. None of CLAUDE.md’s Evidence-Based Science Layer numeric thresholds (protein/creatine tiers, ALST sarcopenia cutoffs, VFA, BMI flags, LIFTMOR bone-loading candidacy, pelvic floor triggers) can be computed or applied here — not omitted by oversight, genuinely unattachable to nothing. Per CLAUDE.md’s Demographic Scope Rule, this program applies only the sex-neutral structural philosophy: the Isolated → Compound → Metabolic three-zone build and RIR-based autoregulated progressive overload, both stated in CLAUDE.md as genuinely demographic-neutral principles. `includeNutritionBlock: false`, and `client.weightKg`/`ageYears`/`alstIndex`/`isPostmenopausal` are all left unset rather than fabricated, so `proteinBar()`/`pelvicFloorCallout()` correctly never fire. Revisit this note the moment age, sex, weight, or a Styku scan is ever added to her intake record.',
  },
  {
    type: 'teal',
    audience: 'internal',
    label: 'Source of Programming Data — Trainer Voice Note, Not a Styku/PARQ Intake',
    body: 'The constraints and structure behind this build come from a voice note from Nick, one of Sarah’s trainers, who has been training her consistently for the past several sessions — relayed by Xolokan on 8/18/2026. This is real-time trainer/movement feedback, not a formal Styku scan or PAR-Q intake questionnaire; no age, sex, weight, height, or strength-testing numbers exist for her anywhere in this system as of this build. Per this system’s standing rule to read a client’s full existing record before any build: her only prior record was a two-line pre-repo legacy outline (a bench-press/cable-pull/squat+OHP-superset 2-day "Athletic Strength" program, no `clients/sarah/` folder, no build script, nothing in Drive) — that outline is explicitly SUPERSEDED, not merged, by this build, since most of its structure conflicts directly with Nick’s current constraints (bench, cable machine, heavier squat/press loading). Exactly one detail was carried forward, confirmed compatible with the new constraints and a real prior client preference rather than a fabrication: single-arm DB row programmed only in superset, never standalone — see Day A, Block B.',
  },
];

const days = [
  {
    intensity: 70,
    badge: { label: 'A', sub: '2-3 RIR' }, // circuit-format program, not the standard %1RM framework — see intensityPara
    title: 'DAY A — Squat, Hip Thrust & Press Circuit',
    subtitle: 'Goblet Squat · DB Hip Thrust · Standing Press & Row — Full-Body Circuit Foundation',
    descriptor: 'FAST-PACED CIRCUIT · HIGH REPETITION · DUMBBELL ≤20 LB & BODYWEIGHT · 35–45 MIN',
    intensityLabel: 'Day A’s Purpose',
    intensityPara: 'This program does not use the standard ICONS 60/70/80/90% day-intensity framework — with a 20 lb hard load ceiling and no strength-testing numbers on file, a %1RM schedule has nothing real to attach to. Instead, intensity is governed by RIR (2-3 reps in reserve throughout) inside a continuous circuit format, per Nick’s direct programming preference: fast pace, minimal rest, high repetition. The badge color is used for visual/day-accent consistency only, not a literal percentage. Control precedes power — a short bodyweight activation block opens the session before any loaded circuit work begins.',
    warmUp: '3-5 min: march in place or light stationary bike, arm circles both directions, bodyweight squat-to-stand ×8 (to your comfortable depth), cat-cow ×8 slow reps.',
    blocks: [
      // Isolated zone / control block — exempt from the strict Antagonist
      // Rotation Rule by CLAUDE.md's own carve-out ("Isolated-zone/
      // corrective blocks ... use judgment instead"), but sequence still
      // checked for variety: hip-ext -> pull -> hinge (technique-only),
      // no 3 consecutive same pattern regardless.
      {
        letter: 'A',
        title: 'CONTROL & ACTIVATION — BEFORE THE CIRCUIT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Control precedes power: this block wakes the glutes and shoulders and rehearses hip-hinge control at a genuinely light, brief dose before any loaded circuit work begins — straight sets, not circuit pace, generous rest between sets. Includes the one short-ROM hip-hinge pattern-maintenance drill in this program (DB RDL, Short-ROM). Judgment call, stated here rather than left implicit: DB Hip Thrust and Glute Bridge already carry Sarah’s primary hip-extension training role throughout this program precisely because they don’t require a sustained flat-back hinge under load — but a brief, technique-only, mid-shin-range hinge rehearsal (not a working strength lift) keeps the pattern itself from going completely untrained, at a dose and load low enough that her current hip-hinge/hamstring limitation stays the priority, not an afterthought.',
        exercises: [
          { name: 'Glute Bridge (Bodyweight)', sets: '2', reps: '15', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Full hip extension, squeeze glutes hard at the top, no low-back arch.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light-Moderate Band', tempo: '2-1-2', rest: '30s', cue: 'Arms straight, squeeze shoulder blades together, control the release.' },
          { name: 'DB RDL — Short-ROM, Technique Only', sets: '2', reps: '8', load: 'Light DB ≤10 lbs — technique only, not a working weight', tempo: '3-1-1', rest: '30s', cue: 'Stop the descent the moment your low back rounds — depth is not the goal here, a flat back is. Mid-shin range only, never reach for the floor.', flag: 'Technique/pattern-maintenance drill only — not a loaded strength lift. Stop signal: any low-back rounding.' },
        ],
      },
      // Compound zone, must comply. Pattern check: Goblet Squat (squat) ->
      // DB Hip Thrust (hip extension) -> Standing DB Shoulder Press (push,
      // superset A) -> Single-Arm DB Row (pull, superset A). 4 distinct
      // patterns in sequence, no 3 consecutive same-pattern. Compliant.
      {
        letter: 'B',
        title: 'MAIN CIRCUIT — SQUAT, HIP THRUST & PRESS/ROW SUPERSET',
        introLabel: 'Format',
        intro: 'Continuous circuit — 3-4 rounds, ~15-20s to move between exercises, ~60-90s rest after completing a full round before repeating. Squat to your own comfortable depth (typically just above parallel is completely normal) — quality over depth, never force further range than control allows. This is house philosophy, not a Sarah-specific accommodation: "Long where you move, tight where you hold" is how full range of motion is coached across this entire program, for every client. DB Hip Thrust uses the elevated surface (step/chair/couch) — the only exercise in this program that needs it. Standing Press and Single-Arm Row run as a superset — no rest between the two, straight from one into the other — carried forward from Sarah’s prior programming preference that single-arm row never stands alone.',
        exercises: [
          { name: 'Goblet Squat (Light DB or Bodyweight)', sets: '3-4 rounds', reps: '15-20', load: 'Bodyweight or ≤20 lb DB', tempo: 'Controlled', rest: '15-20s then next', cue: 'Squat to your comfortable depth — quality over depth, never force further range.', rirNote: '2-3 RIR' },
          { name: 'DB Hip Thrust (Elevated on Step/Chair/Couch)', sets: '3-4 rounds', reps: '15-20', load: '≤20 lb DB across hips', tempo: 'Controlled', rest: '15-20s then next', cue: 'Upper back on the elevated surface, drive through heels, full hip extension at the top.', rirNote: '2-3 RIR' },
          { name: 'Standing DB Shoulder Press — Superset A', sets: '3-4 rounds', reps: '12-15', load: '≤20 lb/hand', tempo: 'Controlled', rest: '0s — flows directly into row (superset)', cue: 'Ribs stacked over hips, press straight overhead, no low-back arch.', rirNote: '2-3 RIR' },
          { name: 'Single-Arm DB Row — Superset A (No Rest Between)', sets: '3-4 rounds', reps: '12-15 ea side', load: '≤20 lb', tempo: 'Controlled', rest: '60-90s (round rest) — then repeat squat', cue: 'Paired with the press above, no standalone sets. Hinge slightly, drive elbow to hip.', rirNote: '2-3 RIR' },
        ],
      },
      // Metabolic zone (less strict per CLAUDE.md, but checked anyway).
      // Pattern: Suitcase Carry (carry) -> Plank Shoulder Taps (core) ->
      // Standing Band Row (pull). No repeats. Compliant.
      {
        letter: 'C',
        title: 'METABOLIC FINISHER — CARRY, CORE & PULL',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Shorter closing circuit — 2-3 rounds, same fast pace and minimal rest as Block B. This is the day’s primary conditioning stimulus at 2 days/week — no separate cardio block needed.',
        exercises: [
          { name: 'Suitcase Carry (Single-Side, DB)', sets: '2-3 rounds', reps: '30-45s ea side', load: '≤20 lb', tempo: 'Controlled walk', rest: '15-20s then next', cue: 'Resist leaning toward the loaded side, tall posture, brace hard.' },
          { name: 'Plank Shoulder Taps', sets: '2-3 rounds', reps: '30-45s', load: 'Bodyweight', tempo: 'Controlled', rest: '15-20s then next', cue: 'Hips stay level — minimal rock as the opposite hand taps the shoulder.' },
          { name: 'Standing Band Row (No Cable)', sets: '2-3 rounds', reps: '15-20', load: 'Light-Moderate Band', tempo: 'Controlled', rest: '45-60s (round rest) — then repeat carry', cue: 'Band anchored at chest height, elbows drive back, squeeze shoulder blades.' },
        ],
      },
    ],
    coolDown: 'Standing quad stretch 30s each side. Doorway chest stretch 30s each side. Cat-cow 8 slow reps. Supine knee-to-chest, gentle, 30s each side — stop short of any low-back discomfort.',
    iconsNote: 'Log RIR every round even at this pace — fast and high-rep doesn’t mean unmonitored. Squat depth and hip-hinge control matter more than hitting a number here: comfortable, repeatable range beats forcing a deeper one.',
  },
  {
    intensity: 80,
    badge: { label: 'B', sub: '2-3 RIR' },
    title: 'DAY B — Hip Thrust, Squat & Pull Circuit',
    subtitle: 'DB Hip Thrust · Goblet Squat · Floor Press · Band Pulldown — Full-Body Circuit Foundation II',
    descriptor: 'FAST-PACED CIRCUIT · HIGH REPETITION · DUMBBELL ≤20 LB, BAND & BODYWEIGHT · 35–45 MIN',
    intensityLabel: 'Day B’s Purpose',
    intensityPara: 'Same non-%1RM, RIR-governed circuit approach as Day A (2-3 RIR throughout) — today’s emphasis shifts the press pattern to horizontal (floor press, no bench) and the pull pattern to a banded lat pulldown. Hip thrust leads the main circuit today rather than squat, simple round-to-round variety within the same fast-paced, minimal-rest format.',
    warmUp: '3-5 min: march in place or light stationary bike, standing hip circles both directions, band pull-apart ×12, thoracic rotation (quadruped) ×8 ea side.',
    blocks: [
      // Isolated zone / control block, exempt from the strict rule but
      // still varied: core/hip stability -> scap isolation -> hip
      // abductor. No repeats regardless.
      {
        letter: 'A',
        title: 'CONTROL & ACTIVATION — BEFORE THE CIRCUIT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Same control-precedes-power role as Day A’s opening block, targeting hip and shoulder stability specifically for today’s press/pull work. The program’s one hip-hinge pattern-maintenance drill lives on Day A only — not repeated here, since this block’s job today is priming hip abduction and scapular control, not hinge rehearsal.',
        exercises: [
          { name: 'Bird Dog', sets: '2', reps: '10 ea side', load: 'Bodyweight', tempo: '3-1-2', rest: '30s', cue: 'Low back stays flat and still, slow opposite arm-leg reach.' },
          { name: 'Prone Y-T-W Raise', sets: '2', reps: '10 ea', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Face down, lift arms in Y then T then W shapes, squeeze upper back.' },
          { name: 'Standing Hip Abduction (Bodyweight or Band)', sets: '2', reps: '12 ea side', load: 'Bodyweight or Light Band', tempo: '2-1-2', rest: '30s', cue: 'Hips level, no torso lean, controlled tempo in both directions.' },
        ],
      },
      // Compound zone, must comply. Pattern check: DB Hip Thrust (hip
      // extension) -> Goblet Squat (squat) -> Floor Press (push) -> Banded
      // Lat Pulldown (pull). 4 distinct patterns, no 3 consecutive
      // same-pattern. Compliant.
      {
        letter: 'B',
        title: 'MAIN CIRCUIT — HIP THRUST, SQUAT, FLOOR PRESS & PULLDOWN',
        introLabel: 'Format',
        intro: 'Continuous circuit — 3-4 rounds, ~15-20s between exercises, ~60-90s after each full round. Floor press replaces bench press — lying on the floor or a mat, not a bench, per Sarah’s preference; the floor itself limits the descent, which also keeps the shoulder range conservative. Banded lat pulldown replaces any cable-machine pulldown — no cable machine anywhere in this program.',
        exercises: [
          { name: 'DB Hip Thrust (Elevated on Step/Chair/Couch)', sets: '3-4 rounds', reps: '15-20', load: '≤20 lb DB across hips', tempo: 'Controlled', rest: '15-20s then next', cue: 'Upper back on the elevated surface, drive through heels, full extension at top.', rirNote: '2-3 RIR' },
          { name: 'Goblet Squat (Light DB or Bodyweight)', sets: '3-4 rounds', reps: '15-20', load: 'Bodyweight or ≤20 lb DB', tempo: 'Controlled', rest: '15-20s then next', cue: 'Squat to your comfortable depth — quality over depth, never force further range.', rirNote: '2-3 RIR' },
          { name: 'Floor Press (DB, Lying on Floor/Mat)', sets: '3-4 rounds', reps: '12-15', load: '≤20 lb/hand', tempo: 'Controlled', rest: '15-20s then next', cue: 'Upper arms touch the floor lightly at the bottom — that’s your depth limit, press up.', rirNote: '2-3 RIR' },
          { name: 'Banded Lat Pulldown (No Cable)', sets: '3-4 rounds', reps: '15-20', load: 'Light-Moderate Band', tempo: 'Controlled', rest: '60-90s (round rest) — then repeat hip thrust', cue: 'Band anchored overhead, pull elbows down and back, squeeze the lats.', rirNote: '2-3 RIR' },
        ],
      },
      // Metabolic zone (less strict per CLAUDE.md, but checked anyway).
      // Pattern: Farmer Carry (carry) -> Side Plank (core) -> Step-Ups
      // (lower/knee-dominant). No repeats. Compliant.
      {
        letter: 'C',
        title: 'METABOLIC FINISHER — CARRY, CORE & STEP-UPS',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Shorter closing circuit — 2-3 rounds, same fast pace and minimal rest as Block B. Step-ups reuse the same elevated surface as the hip thrust above — no new equipment needed. This is the day’s primary conditioning stimulus at 2 days/week.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '2-3 rounds', reps: '30-45s', load: '≤20 lb/hand', tempo: 'Controlled walk', rest: '15-20s then next', cue: 'Shoulders packed, chest tall, carry evenly with both hands.' },
          { name: 'Side Plank', sets: '2-3 rounds', reps: '20-30s ea side', load: 'Bodyweight', tempo: 'Controlled', rest: '15-20s then next', cue: 'Hips stacked and lifted, straight line from shoulder to ankle.' },
          { name: 'Step-Ups (Bodyweight, Elevated Surface)', sets: '2-3 rounds', reps: '10-12 ea leg', load: 'Bodyweight', tempo: 'Controlled', rest: '45-60s (round rest) — then repeat carry', cue: 'Full foot on the surface, drive through the heel, step down with control.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s each side. Standing quad stretch 30s each side. Cat-cow 8 slow reps. Child’s pose modified — knees wide, hands forward, only as far as comfortable — 30s.',
    iconsNote: 'Energy becomes identity — the finisher should feel like a strong close, not a grind. Track how many rounds complete with clean form each week alongside your RIR notes; that’s the real progress marker in a circuit-format program like this one.',
  },
];

const summary = {
  subtitle: 'Sarah  ·  ICONS Index  ·  Fast-Paced Circuit Strength Foundation  ·  2 Days/Week',
  rows: [
    ['Wk 1', '—', 'Day A & B', 'Establish comfortable working loads at 2-3 RIR', 'Confirm equipment assumption, squat depth, and hip-hinge tolerance before adding any load.'],
    ['Wk 2', '—', 'Day A & B', 'Add reps within the 12-20/30-45s range before adding load', 'Only add load once the full round count is completed cleanly at 2-3 RIR.'],
    ['Wk 3', '—', 'Day A & B', 'Add load in the smallest increment available (typically 2.5-5 lbs) where form is clean', 'Never chase depth on squat or hinge range — control governs progression here, not a fixed number.'],
    ['Wk 4', '—', 'Day A & B', 'Approaching the 20 lb equipment ceiling on some circuit exercises', 'Check in with Nick: which exercises have hit the load ceiling vs. the round-count ceiling first.'],
  ],
  milestones4wk: 'Check in with Nick at 4 weeks — this program’s reassessment mechanism, since no Styku scan or strength-testing battery exists to re-test instead. Confirm: has squat depth or hip-hinge control changed, is the short-ROM hinge drill (Day A, Block A) still needed at the same conservative dose, and which circuit exercises are approaching the 20 lb equipment ceiling versus still progressing on reps/rounds.',
  milestones8wk: 'If lower back and hamstring mobility have genuinely improved by 8 weeks, revisit with Nick whether a slightly longer-range hip hinge becomes appropriate, or whether the current hip-thrust-led approach continues to be the better fit — either is a legitimate outcome, not a target to force. If several circuit exercises have hit the 20 lb equipment ceiling, that’s the moment to discuss access to heavier dumbbells or additional equipment.',
  rescanNote: 'No Styku scan exists for Sarah, so there is no 8-12 week body-composition rescan to schedule. The 4-week check-in with Nick above is this program’s actual reassessment mechanism, per this program’s standard 4-week strength-reassessment cadence.',
};

const data = {
  client,
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

// Client View (added 8/18/2026, same build): 2 of the 4 baselineNotes are
// marked audience: 'internal' (the science-layer-scope note and the
// data-provenance note) — both are build-process/documentation-methodology
// reasoning per CLAUDE.md's Client View spec, not client-facing coaching
// content. The 2 remaining notes (Equipment Assumption, How This Program
// Was Built Around You) stay visible — genuinely useful, warmly-written
// client-facing content. No `insight`/`flag` fields carry build-rationale
// text that needs hiding — the one `flag` field in this script (on the
// short-ROM DB RDL) is genuine client safety/stop-signal information and
// stays visible by default, per CLAUDE.md's flag-field guidance. No block
// `intro` or `summary` field references either internal-only note ("see
// note above"-style dangling references) — each block's intro is
// self-contained. No `clientHighlight` set — first-build client, nothing
// on record yet to compare against.
async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'sarah');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Sarah_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Sarah_2Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
