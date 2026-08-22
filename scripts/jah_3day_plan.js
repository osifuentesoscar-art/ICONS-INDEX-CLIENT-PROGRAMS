/**
 * Jah — ICONS 3-Day Training Plan
 * Brace Life Studios · Trainer Development / In-House Athlete Roster
 *
 * Built from Jah's real tested baselines in `system_documents/ICONS_Baseline_
 * Sheets.docx` / `scripts/icons_baseline_sheets.js` (Level: INTERMEDIATE /
 * ADVANCED). Companion build to Nick's 3-day plan (`scripts/nick_3day_plan.js`)
 * — Becca, Brodie, and Oscar's 3-day programs are being built separately and
 * are NOT touched here.
 *
 * SCOPE NOTE — WHY THE WOMEN'S/MALE CLINICAL FRAMEWORKS DO NOT APPEAR HERE:
 * No Styku scan, no age, no sex, and no clinical data of any kind exists on
 * file for Jah — the baseline sheet is a pure strength-testing document
 * (tested lift baselines, coach progression notes, 4-week targets, a
 * session log), nothing else. Per CLAUDE.md's Demographic Scope Rule, the
 * women's Age Bracket Programming Framework's numeric thresholds (ALST/VFA/
 * BMI cutoffs, protein/creatine g/kg tiers, pelvic floor triggers) are
 * validated for women 40s-60s and are not applied here. The Male Client
 * Programming Framework is also NOT applied — not because Jah's sex is
 * unknown either way, but because that framework's own numeric content
 * (maleProteinTargets/maleNutritionNote/testosteroneNote) requires
 * client.weightKg and client.ageYears to compute anything, and neither
 * exists on file; inventing them to populate a framework would be
 * fabrication, exactly the failure mode CLAUDE.md's Jake Poyner/Vinz
 * Feller precedent warns against repeating. `includeNutritionBlock: false`
 * and no age/weight fields are set on `client` below — this correctly
 * no-ops `proteinBar()` (guarded by `alstIndex !== undefined`, left unset)
 * and `pelvicFloorCallout()` (guarded by `isPostmenopausal`, left unset).
 *
 * What DOES carry over, because it's sex/age-neutral structural philosophy,
 * not a numeric clinical threshold: the ICONS three-zone build (Isolated —
 * Control, Activation & Alignment -> Compound — Strength, Shape & Hormonal
 * Balance -> Metabolic — Burn, Energy & Endurance), RIR-based autoregulated
 * progressive overload (`progressionBlock()`), and corrective-before-
 * compound sequencing. This mirrors the precedent already established for
 * Jake Poyner, Vinz Feller, Petra, and Nancy Avitable.
 *
 * BASELINE ANCHORING & SUBSTITUTIONS:
 * All Week 1 working loads for Back Squat, Deadlift (Conventional), Single-
 * Arm Row, and Split Squat (BSS) are computed via epley1RM()/workingLoad()
 * off Jah's real tested 5RMs (Back Squat 150x5, Deadlift 200x5, Single-Arm
 * Row 60x5, Split Squat 60x5), at 60/70/80% across the week's three days —
 * NOT recomputed loads for Weeks 2-4, which instead follow the coach's own
 * stated progression numbers verbatim (e.g. "Progress to 160 lbs Wk2. Wk4
 * target: 170-180 lbs" for Back Squat), consistent with how Vinz Feller's
 * plan treats Week 1 vs. the milestone arc. Push-Up (60 reps bodyweight)
 * and Pull-Up (25 reps bodyweight) are programmed per the coach note's own
 * explicit instruction to add external load immediately (weighted variants
 * from Week 1), not re-derived via Epley (bodyweight max-rep tests don't
 * convert to a loaded 1RM the same way a weighted 5RM does). Farmer Carry
 * and Plank hold the coach's own stated Week 1 numbers directly.
 *
 * Jah's two "NOT YET ASSESSED" items are both honored as their coach note
 * explicitly intends, not skipped:
 *   - "Hex Bar Deadlift (substitute conventional DL baseline)" — programmed
 *     on Day 3 as Hex Bar Deadlift, with its Week 1 load derived from the
 *     Conventional Deadlift's own 233 lb estimated 1RM per the coach's
 *     stated substitution, flagged explicitly in the exercise cue.
 *   - "Goblet Squat (use squat baseline as reference)" — introduced on Day
 *     1 as a light, technique-focused NEW baseline-establishing exercise,
 *     referencing the Back Squat baseline as its load anchor per the coach
 *     note, rather than treated as an untested/skipped movement.
 *
 * ANTAGONIST ROTATION RULE — FULL-DAY WALK (re-done 8/22/2026; the previous
 * note here was a PER-BLOCK self-check, which CLAUDE.md's rollout convention
 * #4 explicitly says is not evidence — the rule is walked on the full
 * rendered day, across block boundaries). Walked on rendered table order:
 *   Day 1: Goblet(squat, Isolated) | Back Squat(squat) -> Split Squat(squat)
 *          | Row(horiz pull) -> Pull-Up(vert pull) | Conv DL(hinge)
 *          | Carry -> Plank.
 *   Day 2: Push-Up(horiz push) -> Row(horiz pull) | Pull-Up(vert pull) ->
 *          Split Squat(squat) | Plank -> interval.
 *   Day 3: Glute Bridge/Ankle rock(corrective) | Hex DL(hinge) | Split
 *          Squat(squat) -> Row(pull) | Pull-Up(vert pull) | Carry -> Plank.
 * Days 2 and 3 are clean outright. DAY 1 IS A BORDERLINE CASE, FLAGGED
 * RATHER THAN SILENTLY RESOLVED: read across the A/B boundary, Goblet Squat
 * -> Back Squat -> Split Squat is three knee-dominant movements in a row.
 * It is treated as compliant here on the same basis the base Train-the-
 * Trainer program's Day 3 corrective primer is (a Banded Squat immediately
 * precedes a Back Squat + Goblet Squat there): the Isolated-zone opener is a
 * technique/activation exposure at 40 lbs against a 150x5 Back Squat
 * baseline — roughly 27% of it — which sits inside the rule's own carve-out
 * for "Isolated-zone/corrective blocks (lower load, different injury-risk
 * profile)." The counter-argument is real and worth a ruling: unlike Becca's
 * and Brodie's, Jah's goblet squat is labelled a NEW TRACKED BASELINE rather
 * than a held corrective load, so it is arguably a programmed compound lift
 * rather than a primer. If Xolokan rules it in scope, the fix is a swap, not
 * a deletion — move Split Squat behind the Block C pull work.
 * Metabolic-zone carry/core blocks are exempt per the rule's own scope.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad,
} = require('./icons_template');

// ── Verify Week 1 working loads off Jah's tested baselines ─────────────
const oneRM = {
  squat: epley1RM(150, 5),       // 175
  deadlift: epley1RM(200, 5),    // 233
  row: epley1RM(60, 5),          // 70
  splitSquat: epley1RM(60, 5),   // 70
};

const wk1 = {
  squat60: workingLoad(oneRM.squat, 0.60),        // 105
  splitSquat60: workingLoad(oneRM.splitSquat, 0.60), // 40
  row60: workingLoad(oneRM.row, 0.60),            // 40
  deadlift60: workingLoad(oneRM.deadlift, 0.60),  // 140
  row70: workingLoad(oneRM.row, 0.70),            // 50
  splitSquat70: workingLoad(oneRM.splitSquat, 0.70), // 50
  deadlift80: workingLoad(oneRM.deadlift, 0.80),  // 185 (Hex Bar substitute reference)
  splitSquat80: workingLoad(oneRM.splitSquat, 0.80), // 55
  row80: workingLoad(oneRM.row, 0.80),            // 55
};

const client = {
  name: 'Jah',
  programTitle: '3-Day Training Plan',
  subtitle: 'Intermediate / Advanced — Full-Body Strength Build',
  schedule: '3-Day · In-House Athlete Program',
  stats: ['Level: Intermediate / Advanced', '3-Day Program', 'ICONS Baseline Testing Protocol'],
};

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Squat & Hinge Foundation\nTechnique + New Baseline' },
  { day: 'DAY 2', intensity: 70, focus: 'Push/Pull Strength\nPush-Up Progression' },
  { day: 'DAY 3', intensity: 80, focus: 'Full-Body Peak\nHex Bar DL Sub · Heaviest Carry' },
];

const baselines = [
  ['Plank (Elbow)', '3:00', 'Baseline Intake', '2:30 loaded (15 lb plate)'],
  ['Push-Up', '60 reps (max)', 'Baseline Intake', 'Weighted — 35+ reps'],
  ['Pull-Up (Full)', '25 reps (max)', 'Baseline Intake', 'Weighted +15 lbs (DB between feet or plate) — 8+ reps'],
  ['Single-Arm Row', '60 lbs x 5 (5RM)', 'Baseline Intake', '72.5 lbs — landmine or Kieser above the 60 lb DB ceiling'],
  ['Farmer Carry', '60 lbs / hand (working)', 'Baseline Intake', '75 lbs / hand — trap bar above the 60 lb DB ceiling'],
  ['Back Squat', '150 lbs x 5 (5RM)', 'Baseline Intake', '170–180 lbs'],
  ['Deadlift (Conventional)', '200 lbs x 5 (5RM)', 'Baseline Intake', '225–235 lbs'],
  ['Split Squat (BSS)', '60 lbs x 5 (5RM)', 'Baseline Intake', '72.5–75 lbs — barbell/landmine above the 60 lb/hand DB ceiling'],
];

const baselineNotes = [
  {
    type: 'gold',
    label: 'Coach Note — Baseline Intake',
    body: 'Full baseline now established. Highest push-up count in the group at 60 reps and highest pull-up count at 25 reps — exceptional bodyweight strength. 200 lb deadlift, 150 lb squat, 60 lb row all competitive with the group. Split squat at 60 lbs matches Nick. Strong across the board.',
  },
  {
    type: 'purple',
    label: 'Scope Note — No Clinical/Demographic Framework Applied',
    body: "No Styku scan, age, sex, or clinical data exists on file for Jah — this is a pure strength-testing baseline, not a clinical intake. Neither the women's Age Bracket Programming Framework nor the Male Client Programming Framework's numeric thresholds are applied here; both require data (age, weight, body composition) that hasn't been collected, and inventing it would be fabrication. What carries over is the sex/age-neutral ICONS structural philosophy — the Isolated -> Compound -> Metabolic three-zone build, RIR-based autoregulated progressive overload, and corrective-before-compound sequencing — applied at Intermediate/Advanced volume and intensity per the coach note above.",
  },
  {
    type: 'watch',
    label: 'Not Yet Assessed — Both Honored As New Baselines, Not Skipped',
    body: 'Hex Bar Deadlift (substitute — uses the Conventional Deadlift baseline, 200 lbs x 5, as its Week 1 load reference; programmed on Day 3) and Goblet Squat (uses the Back Squat baseline as its load reference; introduced on Day 1 as a light, technique-focused new baseline). Both are honored as legitimate first-exposure baseline-establishing exercises per the coach note\'s own stated substitution intent — neither is skipped.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'Day 1 — Squat & Hinge Foundation',
    subtitle: 'Technique Day + Goblet Squat Baseline Establishment',
    descriptor: 'CONTROL PRECEDES POWER · NEW BASELINE: GOBLET SQUAT',
    intensityLabel: '60% Day',
    intensityPara: 'Technique day — form over load. Back Squat, Split Squat, Single-Arm Row, and Deadlift all run at their Week 1 working loads (60% of estimated 1RM off Jah\'s tested 5RMs). No PRs today; the goal is clean patterns in the technique/submaximal band (3+ RIR) before the week\'s intensity climbs. Per CLAUDE.md\'s corrected RIR Model (8/17/2026), everything above 2 RIR is one band, not a graduated 3-vs-4-vs-5 target — RIR accuracy degrades the farther a set sits from failure, so naming a precise number up here would be false precision.',
    warmUp: 'General dynamic warm-up: 5 min bike or row, hip circles, bodyweight squats x10, walking lunges x8/side, band pull-aparts x12, deep squat hold 3x20s.',
    blocks: [
      {
        letter: 'A',
        title: 'ISOLATED — ACTIVATION & GOBLET SQUAT BASELINE',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Hip/glute activation before loading, plus Jah\'s first exposure to Goblet Squat — his coach note calls for using the Back Squat baseline as this movement\'s load reference rather than leaving it untested.',
        exercises: [
          { name: 'Lateral Band Walk', sets: '2', reps: '10 ea way', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Band above knees; hips level; drive knee out.' },
          { name: 'Goblet Squat (NEW — Baseline Established)', sets: '3', reps: '8', load: '40 lbs (new baseline — ref. Back Squat)', tempo: '3-1-1', rest: '60s', cue: 'NOT YET ASSESSED — using Back Squat as reference load per coach note.' },
        ],
      },
      {
        letter: 'B',
        title: 'COMPOUND — PRIMARY SQUAT',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.squat60} lbs (60% of est. 1RM ${oneRM.squat}, off the tested 150 lbs x 5 baseline) — technique/submaximal band (3+ RIR), technique-first.`,
        exercises: [
          { name: 'Back Squat', sets: '4', reps: '6', load: `${wk1.squat60} lbs (Wk1)`, tempo: '3-1-1', rest: '90s', cue: 'Ribs stacked over pelvis; full depth. Film side-on — depth check priority.', rirNote: 'Technique/submaximal band (3+ RIR)' },
          { name: 'Split Squat (BSS)', sets: '3', reps: '8 ea', load: `${wk1.splitSquat60} lbs/hand (Wk1)`, tempo: '2-1-1', rest: '75s', cue: 'Left leg leads. Rear foot elevated, front knee tracks toe.' },
        ],
      },
      {
        letter: 'C',
        title: 'COMPOUND — PULL',
        introLabel: 'Load Target',
        intro: `Row Week 1 working load ${wk1.row60} lbs (60% of est. 1RM ${oneRM.row}, off the tested 60 lbs x 5 baseline). Pull-Up: add load immediately per coach note.`,
        exercises: [
          { name: 'Single-Arm Row', sets: '4', reps: '8 ea', load: `${wk1.row60} lbs (Wk1)`, tempo: '3-1-2', rest: '60s', cue: 'Full stretch at bottom every rep. Tied with Nick for heaviest row in the group.' },
          { name: 'Pull-Up (Full) — Weighted + Volume', sets: '3 + 2', reps: '5 / max', load: '+15 lbs (DB or plate) → Bodyweight', tempo: 'Controlled', rest: '90s', cue: 'Weighted set: +15 lbs, chin over bar, 2 RIR. Volume set: max unweighted, track reps.' },
        ],
      },
      {
        letter: 'D',
        title: 'COMPOUND — HINGE',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.deadlift60} lbs (60% of est. 1RM ${oneRM.deadlift}, off the tested 200 lbs x 5 baseline). PVC hip hinge drill mandatory before every set per coach note.`,
        exercises: [
          { name: 'Deadlift (Conventional)', sets: '4', reps: '5', load: `${wk1.deadlift60} lbs (Wk1)`, tempo: '2-1-1', rest: '90s', cue: 'PVC hip hinge drill before every set. Neutral spine, drive floor away.' },
        ],
      },
      {
        letter: 'E',
        title: 'METABOLIC — CARRY & CORE',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'Farmer Carry holds its established working baseline this week; Plank runs loaded per the coach note\'s Week 1 instruction.',
        exercises: [
          { name: 'Farmer Carry', sets: '4', reps: '30–35 yds', load: '60 lbs/hand (established baseline — DB or trap bar)', tempo: 'Controlled', rest: '90s', insight: 'His established 60 lbs/hand sits exactly on the studio\u2019s dumbbell ceiling, so every progression from here \u2014 including the 75 lb/hand 4-week target \u2014 runs on the trap bar or plate-loaded implements.', cue: 'Shoulder packing cue — chest tall throughout the carry.' },
          { name: 'Plank (Elbow, Loaded)', sets: '3', reps: '2:30', load: '10 lb plate (Wk1)', tempo: 'Hold', rest: '60s', cue: 'Full brace — squeeze glutes, ribs down. Progress plate every 2 sessions.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge stretch 60s/side. Hamstring stretch 60s/side. Lat stretch 30s/side. Thoracic extension 60s.',
    iconsNote: 'Technique day — every rep in the technique/submaximal band, 3+ RIR, nothing near failure. Goblet Squat is Jah\'s first exposure this week; coach should confirm depth and knee tracking before Week 2 loads increase. Film side-on for Back Squat and Deadlift.',
  },
  {
    intensity: 70,
    title: 'Day 2 — Push/Pull Strength',
    subtitle: 'Push-Up Progression + Compound Row/Pull-Up',
    descriptor: 'STRENGTH BUILDS CONFIDENCE · WEIGHTED PUSH-UP FROM WEEK 1',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate-to-heavy upper body volume. Push-Up moves to weighted load this week per the coach note — highest push-up baseline in the group by a significant margin. Row and Split Squat climb to 70% of estimated 1RM.',
    warmUp: 'General dynamic warm-up: 5 min row or bike, arm circles x10, scapular push-ups x10, thoracic rotation x10/side, band pull-aparts x12.',
    blocks: [
      {
        letter: 'A',
        title: 'ISOLATED — SHOULDER & SCAPULAR PREP',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Primes the scapular stabilizers ahead of heavy pressing and pulling.',
        exercises: [
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: 'Controlled', rest: '30s', cue: 'Squeeze shoulder blades; ribs down.' },
          { name: 'Scap Push-Up', sets: '2', reps: '10', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'Protract/retract only; arms stay straight.' },
        ],
      },
      {
        letter: 'B',
        title: 'COMPOUND — PUSH / PULL',
        introLabel: 'Load Target',
        intro: `Push-Up moves weighted from Week 1 per coach note — target 35-40 loaded reps by Wk4. Row Week 1 working load ${wk1.row70} lbs (70% of est. 1RM ${oneRM.row}).`,
        exercises: [
          { name: 'Push-Up (Weighted)', sets: '4', reps: '20–25', load: '20 lb vest or plate (Wk1)', tempo: '3-0-1', rest: '90s', cue: 'Weighted from Wk1 per coach note. Building toward 35–40 loaded reps.' },
          { name: 'Single-Arm Row', sets: '4', reps: '8 ea', load: `${wk1.row70} lbs (Wk1)`, tempo: '3-1-2', rest: '60s', cue: 'Progress to 65 lbs Wk2 per coach note. Full stretch at bottom.' },
        ],
      },
      {
        letter: 'C',
        title: 'COMPOUND — PULL-UP & UNILATERAL LOWER',
        introLabel: 'Load Target',
        intro: `Pull-Up: weighted + volume, every session per coach note. Split Squat Week 1 working load ${wk1.splitSquat70} lbs/hand (70% of est. 1RM ${oneRM.splitSquat}).`,
        exercises: [
          { name: 'Pull-Up (Full) — Weighted + Volume', sets: '3 + 2', reps: '5 / max', load: '+15 lbs (DB or plate) → Bodyweight', tempo: 'Controlled', rest: '90s', cue: 'Weighted set: +15 lbs, 2 RIR. Volume set: max unweighted, both every session.' },
          { name: 'Split Squat (BSS)', sets: '3', reps: '8 ea', load: `${wk1.splitSquat70} lbs/hand (Wk1)`, tempo: '2-1-1', rest: '75s', cue: 'Left leg leads. Progress to 65 lbs Wk2 per coach note.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC — CORE & CONDITIONING FINISHER',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Loaded plank plus a short interval finisher — the metabolic third of the ICONS three-zone build.',
        exercises: [
          { name: 'Plank (Elbow, Loaded)', sets: '3', reps: '2:30', load: '10–12.5 lb plate', tempo: 'Hold', rest: '60s', cue: 'Progress plate weight every 2 sessions per coach note.' },
          { name: 'Kettlebell Swing / Assault Bike Interval', sets: '1', reps: '6 x 30s hard / 30s easy', load: '25 lb KB (studio ceiling) or bike', tempo: 'Intervals', rest: '—', cue: 'Energy becomes identity — hold form to the last round. Bike if the 25 lb bell is too light to drive intervals.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s/side. Lat stretch 30s/side. Thoracic extension on floor 60s. Bicep doorframe stretch 20s/side.',
    iconsNote: 'Push-Up goes weighted this week — coach should confirm form under load holds before adding more Wk2. Pull-Up runs both a weighted strength set and an unweighted volume set every session per coach note.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Full-Body Peak',
    subtitle: 'Hex Bar Deadlift Substitution · Heaviest Carry of the Week',
    descriptor: 'PRIMARY STRENGTH DAY · HEX BAR DL (SUB) · SPLIT SQUAT · HEAVIEST ROW',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day for the week. Hex Bar Deadlift is introduced here — Jah\'s coach note calls it out by name as "not yet assessed" but explicitly substitutes the Conventional Deadlift baseline as its load reference, so it is programmed, not skipped. Split Squat and Single-Arm Row both run at 80% of estimated 1RM — this week\'s heaviest working loads.',
    warmUp: 'General dynamic warm-up: 5 min bike, leg swings x10/side, glute bridges x10, hip circles, deep squat hold 3x20s.',
    blocks: [
      {
        letter: 'A',
        title: 'ISOLATED — ACTIVATION',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Brief hip/ankle activation ahead of the week\'s heaviest loading.',
        exercises: [
          { name: 'Glute Bridge (Bilateral)', sets: '2', reps: '12', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Full glute lockout; ribs down, no arch.' },
          { name: 'Ankle Dorsiflexion Rock', sets: '2', reps: '10 ea', load: 'Bodyweight', tempo: 'Controlled', rest: '20s', cue: 'Knee tracks over 2nd/3rd toe; heel stays down.' },
        ],
      },
      {
        letter: 'B',
        title: 'COMPOUND — PRIMARY HINGE (HEX BAR DEADLIFT — SUBSTITUTE)',
        introLabel: 'Load Target',
        intro: `Not yet assessed on hex bar — coach note substitutes the Conventional Deadlift baseline as this movement's reference. Week 1 working load ${wk1.deadlift80} lbs (80% of est. Conventional Deadlift 1RM ${oneRM.deadlift}).`,
        exercises: [
          { name: 'Hex Bar Deadlift (Substitute — Conventional DL Reference)', sets: '4', reps: '5', load: `${wk1.deadlift80} lbs (Wk1)`, tempo: '2-0-1', rest: '2 min', cue: 'NOT YET ASSESSED on hex bar — using 233 lb est. 1RM from conventional DL. Film side-on.' },
        ],
      },
      {
        letter: 'C',
        title: 'COMPOUND — UNILATERAL SQUAT & PULL',
        introLabel: 'Load Target',
        intro: `Week's heaviest Split Squat and Row loads — ${wk1.splitSquat80} lbs/hand and ${wk1.row80} lbs (both 80% of est. 1RM ${oneRM.splitSquat}/${oneRM.row}).`,
        exercises: [
          { name: 'Split Squat (BSS)', sets: '3', reps: '5 ea', load: `${wk1.splitSquat80} lbs/hand (Wk1)`, tempo: '2-1-1', rest: '90s', cue: 'Left leg leads. Tied with Nick for heaviest split squat in the group.' },
          { name: 'Single-Arm Row', sets: '4', reps: '5 ea', load: `${wk1.row80} lbs (Wk1)`, tempo: '3-1-2', rest: '75s', cue: 'Heaviest row of the week. Full stretch, controlled tempo.' },
        ],
      },
      {
        letter: 'D',
        title: 'COMPOUND — PULL-UP',
        introLabel: 'Load Target',
        intro: 'Peak-day pull work — push toward the Wk4 target of +15 lbs x 8 reps.',
        exercises: [
          { name: 'Pull-Up (Full) — Weighted + Volume', sets: '3 + 2', reps: '3–5 / max', load: '+15–20 lbs → Bodyweight', tempo: 'Controlled', rest: '90s', cue: 'Peak day — push weighted load toward Wk4 target of +15 lbs x 8.' },
        ],
      },
      {
        letter: 'E',
        title: 'METABOLIC — HEAVIEST CARRY & CORE',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'Farmer Carry progresses this week toward the 75 lbs/hand Wk4 target; Plank pushes plate weight.',
        exercises: [
          { name: 'Farmer Carry', sets: '4', reps: '30–40 yds', load: '65 lbs/hand, trap bar (Wk1 — progressing toward 75 lb Wk4 target)', tempo: 'Controlled', rest: '90s', cue: 'Chest tall, no shrug. Shoulder packing cue.' },
          { name: 'Plank (Elbow, Loaded)', sets: '3', reps: '2:30+', load: '12.5–15 lb plate', tempo: 'Hold', rest: '60s', cue: 'Push plate weight — Wk4 target 2:30 @ 15 lb plate.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 90s/side. Hip flexor lunge 60s/side. Lat stretch 30s/side. Thoracic extension 60s.',
    iconsNote: 'This week\'s heaviest day. Hex Bar Deadlift is a genuinely new movement for Jah despite the substituted load reference — coach should confirm the hex bar setup and bar path feel clean before treating the substituted 1RM as a hard target.',
  },
];

const summary = {
  subtitle: 'Jah  ·  ICONS Index  ·  Intermediate/Advanced Full-Body Build  ·  Week 1',
  rows: [
    ['Day 1', '60%', 'Squat & Hinge Foundation — Technique', 'Back Squat / Deadlift (Conv.)', `Wk1 ${wk1.squat60}/${wk1.deadlift60} lbs. Goblet Squat introduced as new baseline, ref. Back Squat.`],
    ['Day 2', '70%', 'Push/Pull Strength — Push-Up Progression', 'Push-Up (Weighted) / Single-Arm Row', `Push-Up goes weighted (20 lb) from Wk1. Row Wk1 ${wk1.row70} lbs, toward 65 lbs Wk2.`],
    ['Day 3', '80%', 'Full-Body Peak — Hex Bar DL Substitution', 'Hex Bar Deadlift (Sub) / Split Squat', `Hex Bar DL Wk1 ${wk1.deadlift80} lbs (conv. DL reference). Split Squat/Row at week's heaviest loads.`],
  ],
  milestones4wk: 'Plank: 2:30 loaded (15 lb plate). Push-Up: Weighted — 35+ reps. Pull-Up: Weighted +15 lbs (DB between feet or plate) — 8+ reps. Back Squat: 170–180 lbs. Deadlift: 225–235 lbs. Single-Arm Row: 72.5 lbs. Split Squat: 72.5–75 lbs. Farmer Carry: 75 lbs/hand. (Implement note: the row, split squat and carry 4-week targets all cross the studio’s 60 lb/hand dumbbell ceiling — run them on the landmine/Kieser, barbell, and trap bar respectively. The loads are achievable in-studio; the dumbbells simply stop at 60.) All figures per coach note — add load only at top of rep range with clean form (RIR model), never a grind to failure.',
  milestones8wk: 'Continue linear progression off the 4-week targets above at the same RIR-autoregulated rate. Re-test Goblet Squat and Hex Bar Deadlift on their own merits once enough exposure has accumulated to move off the substituted reference loads — both should have real, independently tested numbers by the 8-week mark rather than continuing to borrow Back Squat/Deadlift figures.',
};

const data = {
  client,
  weekOverview,
  baselines,
  baselinesTargetHeader: ['MOVEMENT', 'BASELINE', 'TESTED AT', '4-WEEK TARGET'],
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'trainer_education');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Jah_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
