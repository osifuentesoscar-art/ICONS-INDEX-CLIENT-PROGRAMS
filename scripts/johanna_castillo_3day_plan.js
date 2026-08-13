/**
 * Johanna Castillo — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * Rebuilt from the client's existing document (johannacastillo3.pdf) to match
 * the confirmed engine standard (Kelly Mulroy reference — see CLAUDE.md's
 * "Visual language" note). All program content, loads, and clinical flags
 * are carried over 1:1 from the source; only rendering changed.
 *
 * isPostmenopausal is set true because the source document already applies
 * the ICONS pelvic-floor protocol verbatim ("If you experience any leaking,
 * heaviness, or pressure — stop and flag your coach. This is common and
 * treatable.") on every heavy-load exercise — that's the documented trigger
 * for postmenopausal clients, so buildDocument() now inserts it automatically
 * instead of it being hand-repeated in every block intro and ICONS Note.
 *
 * REVISION (8/13/2026, icons-roster-analyst cross-check) — AGE BRACKET / LIFTMOR
 * NOTE ADDED: every other 45-55/55-65 bracket client on the roster (Johnna
 * Macarthur, Rena Paul, Mary Burfete, Siobhan Hansen, Elizabeth Poyner)
 * carries a LIFTMOR bone-loading candidacy / T-score screening note; this
 * document had none. Added below, matching the established wording pattern
 * for her bracket (45-55, confirmed postmenopausal).
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Johanna Castillo',
  programTitle: '3-Day Training Plan',
  subtitle: 'Moderate Strength & Metabolic Conditioning Build',
  schedule: 'Tue/Thu/Sat Gym',
  stats: ['Age 51', '5\'4"', '172 lbs', '3-Day Program'],
  weightKg: 78.0,
  ageYears: 51,
  isPostmenopausal: true,
  alstIndex: 7.23,
};

const weekOverview = [
  { day: 'MON', intensity: 'Off', focus: 'Off' },
  { day: 'TUE', intensity: 70, focus: 'Full Body Strength\n& Conditioning' },
  { day: 'WED', intensity: 'Off', focus: 'Off' },
  { day: 'THU', intensity: 60, focus: 'Lower Body\nTechnique' },
  { day: 'FRI', intensity: 'Off', focus: 'Off' },
  { day: 'SAT', intensity: 70, focus: 'Upper Body &\nPosterior Chain' },
  { day: 'SUN', intensity: 'Off', focus: 'Off' },
];

// ── Baselines table (added 8/13/2026, roster completeness sweep) ──────────
// The script previously had no `baselines: []` array at all, even though the
// document's own text repeatedly references a real "initial testing battery"
// (intensityPara on Day 1 and Day 2, the gold "Squat & Deadlift" baseline
// note). Rows below are built ONLY from numbers the document's own language
// confirms one way or the other — nothing re-derived or guessed:
//   - DB Hip Thrust (60 lbs, Day 1 Block B) and Seated DB Overhead Press
//     (17.5 lbs, Day 1 Block B) are explicitly named in the Day 1
//     intensityPara as "today's tested baselines (Hip Thrust, Seated OHP)"
//     and again in the Week 1 summary row ("Working loads hold at tested
//     baseline") — confirmed tested, real numbers pulled straight from
//     their exercise-table load fields.
//   - Goblet Squat (20 lbs) and Trap Bar Deadlift (45 lbs), both Day 2
//     Block B, are explicitly the opposite case — the Day 2 intensityPara
//     ("Squat and deadlift were not tested in the initial battery"), the
//     Block B intro ("No baseline was recorded for squat or deadlift"),
//     and the gold baselineNote below all confirm these were NOT part of
//     the initial battery and instead become the new Week 1 baseline this
//     week — matching the Johnna Macarthur "Not Tested — Established This
//     Week" precedent (see scripts/johnna_macarthur_3day_plan.js) rather
//     than being presented as if pre-tested.
// No calendar date is stated anywhere in the source document for when the
// initial battery was run (unlike Nancy Avitable/Johnna Macarthur, where
// Xolokan supplied a dated battery) — rather than inventing one, the TESTED
// AT column uses the document's own phrasing ("Initial Testing Battery" /
// "This Week").
//
// Checked every other Day 1/Day 3 exercise for similar "tested" language
// (Chest-Supported Row, Incline Push-Up, DB Farmers Carry, Plank Hold,
// Bent-Over DB Row, Incline DB Press, Single-Arm DB Row, Suitcase Carry) —
// none is ever called "tested" or "baseline" anywhere in the document; only
// Hip Thrust, Seated OHP, Squat, and Deadlift carry that language. Per the
// "flag ambiguity rather than guess" instruction, these are deliberately
// NOT added to the baselines table as if their origin were confirmed — see
// the new watch-type baselineNote below. This doesn't leave a program gap:
// Johanna is 51 (CLAUDE.md's 40–55 bracket), and the core-protocol movements
// among that list (DB Farmers Carry, Plank Hold, Incline DB Press,
// Single-Leg RDL, Reverse Lunge, Incline Push-Up) already satisfy the ICONS
// Index Full-Spectrum Progression Standard via their presence in `days[].
// exercises[]` — the standard only requires programmed progression
// somewhere in baselines[]/exercises[]/summary, not a baselines-table row
// specifically.
const baselines = [
  ['DB Hip Thrust', '60 lbs × 8', 'Initial Testing Battery', 'Day 1 working load holds at tested baseline (60 lbs × 8, 2 RIR) — reassess at 8-week retest'],
  ['Seated DB Overhead Press', '17.5 lbs × 8', 'Initial Testing Battery', 'Day 1 working load holds at tested baseline (17.5 lbs × 8, 2 RIR) — reassess at 8-week retest'],
  ['Goblet Squat (Back Squat)', 'Not Tested — Established This Week', 'This Week', 'Wk1 working load 20 lbs × 8 (Day 2 Block B) — becomes the new 8-week baseline'],
  ['Trap Bar Deadlift', 'Not Tested — Established This Week', 'This Week', 'Wk1 working load 45 lbs × 6 (Day 2 Block B) — becomes the new 8-week baseline'],
];

const baselineNotes = [
  {
    type: 'green',
    label: 'ALST Index Optimal — 7.23 kg/m²',
    body: 'Above the 7.0 kg/m² EWGSOP2 optimal threshold. This program layers strength maintenance under a fat-loss/cardiometabolic focus rather than muscle-building-primary — loads hold at tested baselines while the conditioning finisher does the heavy lifting on body composition.',
  },
  {
    type: 'watch',
    label: 'VFA 142.7 cm² — Moderate Cardiometabolic Risk',
    body: 'Falls in the 100–149 cm² moderate-risk band. Drives the metabolic finisher on every training day — brisk, sustainable conditioning, not max-effort testing.',
  },
  {
    type: 'watch',
    label: 'Body Fat 40.4% At-Risk',
    body: 'Tracked alongside VFA as the cardiometabolic/fat-loss priority for this block. Reassess at the 8-week Styku rescan.',
  },
  {
    type: 'teal',
    label: 'Left Leg Asymmetry — 17.5 vs 18.0 lbs LST',
    body: 'Gap of 0.5 lbs meets the asymmetry protocol trigger. LEFT leg leads every unilateral lower-body exercise. Log left vs. right loads separately.',
  },
  {
    type: 'teal',
    label: 'Right Arm — 8.4 vs 8.7 lbs LST (Monitor Only)',
    body: 'Gap of 0.3 lbs sits below the 0.5 lb asymmetry-protocol threshold. Logged per side on single-arm row and suitcase carry as routine monitoring, not a formal lead-side prescription.',
  },
  {
    type: 'gold',
    label: 'Squat & Deadlift — Baseline Established This Week',
    body: 'Not part of the initial testing battery. Today\'s working loads (Goblet Squat 20 lbs, Trap Bar Deadlift 45 lbs) become the new 8-week baseline — track progression from here.',
  },
  {
    type: 'gold',
    label: 'Age Bracket — Perimenopause / Menopause Transition (45–55)',
    body: 'At 51, Johanna sits in the 45–55 age bracket, confirmed postmenopausal. Protein and creatine targets already reflect the 2.0–2.2 g/kg "50+" tier (resolved automatically once age crosses 50), and creatine is strongly indicated by age and postmenopausal status alike. LIFTMOR-style bone-loading candidacy screening (T-score < -1.0) is worth introducing as part of ongoing care as estrogen decline accelerates through this window — framed as "bone investment," not added risk — though no DEXA/T-score data is currently on file to confirm candidacy either way.',
  },
  {
    type: 'watch',
    label: 'Baselines Table Scope — Confirmed Tested Lifts Only',
    body: 'The table above lists only the lifts this program explicitly documents as tested (Hip Thrust, Seated OHP) or explicitly documents as newly established this week (Goblet Squat, Trap Bar Deadlift). Other core ICONS movements in this program — DB Farmers Carry, Plank Hold, Incline DB Press, Single-Leg RDL, Reverse Lunge, Incline Push-Up — carry real current working loads in their exercise tables but are not labeled tested or untested anywhere in the source record, so their loads are not presented here as confirmed baselines. Confirm with the trainer whether these were part of the same initial battery before treating them as retest-tracked baselines.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Full Body Strength & Metabolic Conditioning',
    subtitle: 'Moderate Strength + Cardiometabolic Priority',
    descriptor: 'Moderate Strength · Volume Build · Conditioning Priority',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate strength, building volume without peak CNS demand. Loads sit on today\'s tested baselines (Hip Thrust, Seated OHP) while a conditioning finisher supports the VFA and body-fat priority from your Styku scan. This is strength maintenance layered under fat-loss focus, not muscle-building-primary — your ALST is already optimal at 7.23 kg/m².',
    warmUp: '5 min bike, band pull-aparts x15, bodyweight squat x10, glute bridge x10, arm circles x10/direction',
    blocks: [
      {
        letter: 'A',
        title: 'GLUTE ACTIVATION & CORE BRACING',
        introLabel: 'Why',
        intro: 'Bracing pattern rehearsed here carries directly into the loaded hip thrust and carry work in Block B/C.',
        exercises: [
          { name: 'Banded Glute Bridge', sets: '2', reps: '12', load: 'mini band', tempo: '2-1-2', rest: '45s', cue: 'Squeeze glutes, ribs down, band stays taut.' },
          { name: 'Dead Bug', sets: '2', reps: '8/side', load: 'bodyweight', tempo: '3-1-1', rest: '45s', cue: 'Brace low back flat, slow controlled reach.' },
          { name: 'Bird Dog', sets: '2', reps: '8/side', load: 'bodyweight', tempo: '2-2-2', rest: '30s', cue: 'Neutral spine, reach long, no hip rotation.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH',
        introLabel: 'Load Target',
        intro: 'Working sets at 70% — 2 RIR.',
        exercises: [
          { name: 'DB Hip Thrust', sets: '3', reps: '8', load: '60 lbs', tempo: '2-1-2', rest: '90s', flag: 'Brace + exhale on exertion — pelvic floor cue', cue: 'Drive through heels, glutes lock at top.', rirNote: '2 RIR' },
          { name: 'Seated DB Overhead Press', sets: '3', reps: '8', load: '17.5 lbs', tempo: '2-0-2', rest: '75s', cue: 'Ribs stacked over hips, press straight up.', rirNote: '2 RIR' },
          { name: 'Chest-Supported Row', sets: '3', reps: '10', load: '20 lbs', tempo: '2-1-2', rest: '75s', cue: 'Squeeze shoulder blades, elbows track back.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY',
        color: 'gold',
        introLabel: 'Note',
        intro: 'Farmers Carry is bilateral load-bearing — same pelvic floor bracing cue applies before every pass.',
        exercises: [
          { name: 'Incline Push-Up', sets: '3', reps: '8', load: 'bodyweight (bench)', tempo: '3-1-1', rest: '60s', cue: 'Hands under shoulders, chest to bench, brace.', rirNote: '2 RIR' },
          { name: 'DB Farmers Carry', sets: '3', reps: '40 yd', load: '30 lbs/hand', tempo: 'controlled', rest: '60s', flag: 'Brace before lifting — pelvic floor cue', cue: 'Tall posture, ribs down, quick tight steps.', rirNote: '2 RIR' },
          { name: 'Plank Hold', sets: '3', reps: '40 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Short conditioning finisher supports the cardiometabolic/fat-loss priority driven by elevated VFA and body fat %. Brisk and sustainable — not a max-effort test.',
        exercises: [
          { name: 'Kettlebell Swing', sets: '4', reps: '20 sec on/40 off', load: '25 lbs', tempo: 'explosive hip snap', rest: '40 sec', cue: 'Hinge, snap hips, arms stay relaxed.' },
          { name: 'Step-Up', sets: '4', reps: '20 sec on/40 off', load: 'bodyweight', tempo: 'controlled', rest: '40 sec', cue: 'Drive through full foot, stand tall at top.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, doorway chest stretch 30s/side, child\'s pose 45s',
    iconsNote: 'Cardiometabolic priority this block — VFA 142.7 cm² and body fat 40.4% drive the conditioning finisher. Keep bracing before every hip thrust and carry rep, exactly as flagged above.',
  },
  {
    intensity: 60,
    title: 'Day 2 — Lower Body Technique',
    subtitle: 'Squat & Deadlift Introduction + Left-Leg Asymmetry Protocol',
    descriptor: 'Technique Day · Lighter Loads · Full Attention to Form',
    intensityLabel: '60% Day',
    intensityPara: 'Squat and deadlift were not tested in the initial battery, so today\'s loads are deliberately light and become the new 8-week baseline. Left leg leads every unilateral set — Styku segmental LST shows a 0.5 lb deficit (17.5 vs 18.0 lbs), exactly at the asymmetry protocol trigger. Work every set at 3+ RIR.',
    warmUp: '5 min bike, hip circles x10/direction, banded lateral walk x10/side, bodyweight squat x10, glute bridge x10',
    blocks: [
      {
        letter: 'A',
        title: 'MOVEMENT PREP',
        introLabel: 'Why',
        intro: 'General hip and glute activation before the squat and unilateral patterns below.',
        exercises: [
          { name: 'Banded Lateral Walk', sets: '2', reps: '10 steps/side', load: 'mini band', tempo: 'continuous', rest: '30s', cue: 'Band above knees, push knees out, stay low.' },
          { name: 'Bodyweight Squat to Box', sets: '2', reps: '10', load: 'bodyweight', tempo: '3-1-1', rest: '30s', cue: 'Sit back to box, knees track over toes.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — TECHNIQUE INTRODUCTION',
        introLabel: 'Load Target',
        intro: 'No baseline was recorded for squat or deadlift. Loads stay light; the goal is a clean, repeatable pattern for 8-week testing, not load.',
        exercises: [
          { name: 'Goblet Squat', sets: '3', reps: '8', load: '20 lbs', tempo: '3-1-1', rest: '75s', cue: 'Elbows inside knees, chest tall, full depth.', rirNote: '3+ RIR' },
          { name: 'Trap Bar Deadlift', sets: '3', reps: '6', load: '45 lbs', tempo: '2-1-1', rest: '90s', cue: 'Flat back, brace, push floor away evenly.', rirNote: '3+ RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'UNILATERAL LEG — LEFT-LED',
        introLabel: 'Why',
        intro: 'Styku scan shows a 0.5 lb left-leg deficit (L 17.5 / R 18.0) — at the asymmetry trigger threshold. Left leg leads every set below; log reps per side.',
        exercises: [
          { name: 'Single-Leg RDL', sets: '3', reps: '6/side', load: '22.5 lbs/hand', tempo: '3-1-1', rest: '60s', flag: 'Left leg weaker (Styku) — leads every set', cue: 'Left leg first. Hinge, flat back, soft knee.', rirNote: '2 RIR' },
          { name: 'Reverse Lunge', sets: '3', reps: '8/side', load: 'bodyweight', tempo: '2-1-1', rest: '60s', flag: 'Left leg leads', cue: 'Left leg first. Knee tracks over mid-foot.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Low-impact conditioning to close the session without adding lower-body fatigue that would compromise squat/deadlift technique tracking.',
        exercises: [
          { name: 'Rowing Machine Intervals', sets: '5', reps: '30 sec on/30 off', load: 'moderate', tempo: 'steady power', rest: '30 sec', cue: 'Legs drive first, then lean, then pull.' },
          { name: 'Standing March w/ Band', sets: '3', reps: '10/side', load: 'light band', tempo: 'controlled', rest: '30s', cue: 'Knee to hip height, stand tall, no lean.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, standing quad stretch 30s/side, child\'s pose 45s',
    iconsNote: 'First exposure to squat and deadlift patterns — log today\'s working loads as the new baseline for 8-week testing. Left leg leads all unilateral work this block; track the L/R gap at rescan.',
  },
  {
    intensity: 70,
    title: 'Day 3 — Upper Body & Posterior Chain',
    subtitle: 'Pressing/Pulling Strength + Metabolic Finisher',
    descriptor: 'Moderate Strength · Volume Build · Conditioning Priority',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate strength, building pressing/pulling volume without peak CNS demand. Single-arm row and suitcase carry are logged per side given the marginal right-arm deficit on Styku (0.3 lb gap — below the formal 0.5 lb trigger, tracked as routine monitoring).',
    warmUp: '5 min bike, band pull-apart x15, scapular wall slide x10, arm circles x10/direction',
    blocks: [
      {
        letter: 'A',
        title: 'SCAPULAR ACTIVATION',
        introLabel: 'Why',
        intro: 'Shoulder prep before pressing and rowing loads.',
        exercises: [
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'light band', tempo: '2-1-2', rest: '30s', cue: 'Squeeze shoulder blades, elbows stay straight.' },
          { name: 'Scapular Wall Slide', sets: '2', reps: '10', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Ribs down, slide arms, keep low back flat.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH',
        introLabel: 'Load Target',
        intro: 'Working sets at 70% — 2 RIR on all sets.',
        exercises: [
          { name: 'Bent-Over DB Row', sets: '3', reps: '10', load: '20 lbs/hand', tempo: '2-1-2', rest: '75s', cue: 'Flat back, pull to hip, squeeze at top.', rirNote: '2 RIR' },
          { name: 'Incline DB Press', sets: '3', reps: '8', load: '17.5 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Ribs down, press up and slightly in.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY',
        color: 'gold',
        introLabel: 'Note',
        intro: 'Suitcase carry loads the pelvic floor bracing pattern under single-side load — same cue as flagged above. Single-arm row and suitcase carry track L/R per the marginal Styku arm gap.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '10', load: '20 lbs', tempo: '2-1-2', rest: '60s', flag: 'Log reps per side — track L/R (Styku)', cue: 'Brace on bench, pull to hip, no rotation.', rirNote: '2 RIR' },
          { name: 'Suitcase Carry', sets: '3', reps: '30 yd/side', load: '25 lbs', tempo: 'controlled', rest: '60s', flag: 'Brace before lifting — pelvic floor cue', cue: 'Ribs stacked, resist leaning, quick steps.', rirNote: '2 RIR' },
          { name: 'Plank Hold', sets: '3', reps: '40 sec', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Ribs down, glutes tight, breathe steady.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Closing conditioning block supports the cardiometabolic/fat-loss priority. Brisk and sustainable — not a max-effort test.',
        exercises: [
          { name: 'Bike Sprint Intervals', sets: '5', reps: '20 sec on/40 off', load: 'moderate', tempo: 'high effort, controlled', rest: '40 sec', cue: 'Brisk and sustainable — not a max effort test.' },
          { name: 'Bodyweight Squat to Stand', sets: '3', reps: '12', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Full stand each rep, exhale on the way up.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s/side, lat stretch 30s/side, cat-cow x8',
    iconsNote: 'Log single-arm row and suitcase carry reps per side — right arm is marginally lighter on Styku (8.4 vs 8.7 lbs) though below the formal asymmetry trigger. Keep bracing on the suitcase carry, as flagged above.',
  },
];

const summary = {
  subtitle: 'Johanna Castillo  ·  ICONS Index  ·  Moderate Strength & Metabolic Conditioning Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Full Body Strength & Metabolic Conditioning', 'DB Hip Thrust', 'Working loads hold at tested baseline; conditioning finisher drives VFA/body-fat priority'],
    ['2', '60%', 'Lower Body Technique', 'Goblet Squat / Trap Bar Deadlift', 'New baseline established — left leg leads all unilateral work'],
    ['3', '70%', 'Upper Body & Posterior Chain', 'Bent-Over DB Row', 'Single-arm row & suitcase carry tracked per side — monitor right-arm gap'],
  ],
  milestones4wk: 'Squat 25–27.5 lbs × 8 @ 2–3 RIR. Trap bar deadlift 55–60 lbs × 6. Hip thrust progressing toward 70 lbs. Left-leg single-leg RDL load matched to right within 10%.',
  milestones8wk: 'Squat/deadlift 8-week retest against today\'s new baseline. VFA and body fat % trending down from 142.7 cm² / 40.4%. Left/right leg LST gap reduced from 0.5 lbs. Hip thrust and OHP progressed from current working loads.',
  rescanNote: 'Rebook Styku scan at 8 weeks. Track: VFA and body fat % direction, left/right leg LST gap (baseline 0.5 lb), right arm LST gap (baseline 0.3 lb, monitor for trigger), ALST maintenance (currently optimal at 7.23 kg/m²).',
};

const data = {
  client,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'johanna_castillo');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Johanna_Castillo_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
