/**
 * August Olivia — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * Source data: Styku scan 8/5/2026, shoulder extension force test 6/1/2026,
 * baseline strength testing 8/5/2026 (client-reported).
 *
 * REVISION (8/17/2026, External Evidence Review response) — ASYMMETRY
 * TRIGGER LANGUAGE CORRECTED: CLAUDE.md's Asymmetry Protocol section was
 * corrected the same day from an absolute 0.5 lb trigger to a RELATIVE
 * >=10% trigger. Recomputed the leg LST gap as a percentage of the larger
 * side (the engine has no built-in %-relative helper yet):
 *   - LEGS: 0.7 lb gap / 12.1 lbs = ~5.8% — DOES NOT meet the corrected
 *     >=10% relative threshold, even though it cleared the old 0.5 lb
 *     absolute trigger. Per the corrected standard's own retroactive-scope
 *     note ("some clients' documented gaps may no longer clear 10%...
 *     needs careful per-client verification, not a blanket rewrite"), the
 *     existing left-leg-leads unilateral prescription is being LEFT IN
 *     PLACE here rather than silently removed — this is a targeted
 *     language-correction pass, not a re-determination of her programming.
 *     FLAGGED FOR HUMAN REVIEW: whether August Olivia's leg unilateral-lead
 *     assignment should be re-evaluated (e.g. against a functional
 *     single-leg strength/power test, per the corrected standard's
 *     preferred primary trigger) is a genuine open question, not resolved
 *     by this pass.
 *   - ARMS: 0.4 lb gap / 4.7 lbs = ~8.5% — also below the corrected
 *     threshold (was already below the old 0.5 lb trigger too), so no
 *     change to the existing monitor-only treatment.
 *   - NOTE: the separate "Right Shoulder Force Deficit — 63.2% Asymmetry"
 *     finding below (a shoulder extension force-plate test, not Styku LST)
 *     is unaffected by this correction — it is a different measurement
 *     entirely and clears any reasonable asymmetry threshold by a wide
 *     margin; its right-shoulder-leads prescription is untouched.
 *
 * REVISION (8/18/2026) — RIR PRESCRIPTION PASS: eight loaded exercise rows
 * carried a bare numeric load with no proximity-to-failure target anywhere
 * (DB Goblet Squat, DB RDL, Seated DB OH Press and Incline Push-Up on Day 1;
 * DB Split Squat and Single-Leg RDL on Day 2; Incline Push-Up and Single-Arm
 * DB Row on Day 3). All eight now carry a `rirNote`, assigned per exercise
 * role and per the day's own stated intensity rather than stamped uniformly:
 *   - 2 RIR on primary lifts (Goblet Squat, RDL, Hip Thrust, Day 3 OH Press,
 *     Single-Arm DB Row) — CLAUDE.md's corrected RIR Model (8/17/2026) makes
 *     2 RIR the DEFAULT for primary lifts, since a 2024 dose-response
 *     meta-regression found strength gains largely unrelated to estimated
 *     RIR, so 1 RIR is not a stronger strength driver.
 *   - 1 RIR reserved for genuinely hypertrophy-priority accessory work
 *     (Day 3 Incline Push-Up, the accessory to that day's primary press).
 *   - 3+ RIR (the single collapsed "technique/submaximal" band — the
 *     corrected standard explicitly does not distinguish 3 vs. 4 vs. 5,
 *     since RIR accuracy degrades further from failure) on Day 2's
 *     technique/corrective day and on Day 1's flagged-shoulder press.
 * Also corrected two exercises already carrying the superseded "1–2 RIR"
 * range on a PRIMARY lift (Day 1 Barbell Hip Thrust, Day 3 Seated DB OH
 * Press) to a clean 2 RIR, plus the four matching "@ 1–2 RIR" primary-lift
 * targets in `baselines[]` (Back Squat, Seated OH Press) and
 * `summary.milestones4wk`/`milestones8wk`, so the load targets and the
 * exercise rows no longer contradict each other.
 * DELIBERATELY NOT GIVEN AN RIR TARGET: plank holds and both farmer carries
 * (time/distance/grip-governed, not proximity-to-failure governed), and the
 * corrective/activation work in Day 2 Block A (banded lateral walk,
 * single-leg balance) — consistent with how Elizabeth Poyner's document
 * treats its own carries and isometrics.
 * DAY 2 JUDGMENT CALL, stated rather than buried: DB Split Squat is the
 * "PRIMARY UNILATERAL" lift of its block, which the 2-RIR default would
 * normally cover — but Day 2 is the deliberate 60% technique/corrective day
 * ("Technique & Corrective Day — Lighter Loads, No PRs" in its own
 * descriptor, "No PRs today" in its ICONS Note), and its whole purpose is
 * closing the leg asymmetry under control. Prescribing 2 RIR there would
 * contradict the day's stated intent and flatten the week's intensity
 * variation. Assigned the technique/submaximal band instead, matching the
 * house precedent on Elizabeth Poyner's own 60% day (Romanian Deadlift,
 * "3 RIR — sub-maximal").
 *
 * REVISION (8/19/2026 — ICONS BLOCK METHOD RESTRUCTURE, roster-wide
 * rollout batch 3; PRIORITY CLIENT — full-checklist care; CLAUDE.md's
 * "ICONS Block Method" section is the spec, scripts/
 * siobhan_hansen_3day_plan.js the reference implementation; full prior
 * record — this header + CLIENTS.md entry — read in full first).
 * Six-slot order per day (Corrective → Primary Compound → Accessory →
 * Jason's Exercise [conditional] → Secondary Compound → Third Compound/
 * Integration). Slot 4 OMITTED on all three days — no Jason Bethea SOAP
 * note, exercise, or coordinated-care relationship on file for August
 * Olivia; no filler inserted. Every clinical flag (right-shoulder force
 * deficit + right-leads prescriptions, left-leg-leads prescriptions, ALST
 * At-Risk framing), every tested baseline, and all 8/18 RIR prescriptions
 * survive verbatim. Per-day mapping:
 *   DAY 1 (Tue, 70% full-body): slot 1 = omitted (no documented corrective
 *     specific to this day; the warm-up's band pull-aparts/scap push-ups
 *     are unloaded activation that legitimately stays in warmUp). Slot 2 =
 *     DB Goblet Squat (own primary block, menu) — the bodyweight pattern
 *     set REORDERED to run FIRST in the block, fixing a latent
 *     row-order/cue mismatch (its own cue says "before loaded work" but it
 *     rendered after the loaded squat). Slot 3 = posterior-chain accessory
 *     (Barbell Hip Thrust + DB RDL — hinge/thrust pairing, 2 consecutive
 *     allowed). Slot 5 = press secondary (Seated OHP [3+ RIR flagged-
 *     shoulder prescription verbatim] + Incline Push-Up). Slot 6 = NEW
 *     "Full-Body Integration — Farmer Carry & Core": a light farmer carry
 *     at 20-22.5 lb/hand — anchored strictly BELOW her tested 25 lb/hand carry
 *     baseline, no invented number — plus the day's Plank Hold moved in as
 *     core-under-load (pilot precedent groups carry + core as the
 *     integration close).
 *   DAY 2 (Thu, 60% technique/corrective): slot 1 = existing corrective
 *     circuit (unchanged — its intro's retired screening-as-risk-
 *     prediction framing corrected, see touch rules below). Slot 2 = DB
 *     Split Squat (own primary block; 3+ RIR technique-day judgment call
 *     preserved verbatim; menu, all options left-led and technique-band).
 *     Slot 3 = Copenhagen Plank (adductor accessory). Slot 5 = Single-Leg
 *     RDL (hand-supported — hinge, rotating off the knee-dominant
 *     primary; 3+ RIR verbatim). Slot 6 = DB Suitcase Farmer Carry moved
 *     from the old primary block to the integration closer (content
 *     unchanged; sides even — her arm LST gap is below the ≥10% trigger,
 *     and the shoulder deficit is a force finding handled by its own
 *     controlled-load rule, so no carry-hand lead is fabricated or
 *     removed).
 *   DAY 3 (Sat, 80% upper): slot 1 = NEW corrective lead block — Band
 *     Pull-Apart RESEQUENCED out of the old pull block to open the day as
 *     scapular/cuff preparation before pressing, directly serving the
 *     clinical note's own standing instruction ("Add rotator cuff and
 *     scapular stability work every session") with existing content, not
 *     new filler. Slot 2 = Seated DB OH Press (right-leads flag verbatim;
 *     menu constraint-filtered per the shoulder deficit). Slot 3 =
 *     Incline Push-Up (1 RIR hypertrophy accessory, verbatim). Slot 5 =
 *     Single-Arm DB Row (right-leads flag verbatim; menu). Slot 6 =
 *     existing Core & Carry RETITLED "Full-Body Integration — Carry &
 *     Core" (content unchanged).
 * TOUCH-RULE CHANGES in the same pass: (1) RETIRED-LANGUAGE FIX (Nicolette
 * Scott precedent — prescriptions unchanged, framing corrected): Day 2
 * Block A's intro described the corrective circuit as a "standard screen
 * for women's ACL/knee-valgus risk" — visual screening is NOT risk
 * prediction per CLAUDE.md's corrected ACL section (8/17/2026), and the
 * circuit's value is population-level injury prevention, not a screen
 * result; reworded to general lower-limb injury-prevention framing, the
 * exercises themselves untouched. (2) Wk1→Wk4 load-field convention
 * applied where documented targets exist: Goblet Squat 35 → 40-42.5 lb
 * (milestones4wk), Hip Thrust 45 → 55-60 lb (milestones4wk), DB RDL
 * 17.5 → 20-22.5 lb/hand by Wk8 (baselines-table 8-week target — no Wk4
 * number exists, so the documented 8-week figure is used, nothing
 * invented). Shoulder-governed lifts (both OH presses, SA row)
 * deliberately KEEP their flat/controlled loads — their progression is
 * capacity-governed by the right-shoulder protocol, not load-driven, and
 * writing a load ramp onto a deficit-controlled lift would misstate the
 * prescription. (3) Deload call: AUTOREGULATED COMBINED MODEL (planned
 * Week 5 slot after the Wk4 check, movable on triggers) — grounds: 25,
 * robust, 3-day moderate-intensity program, no rehab flags; the ALST
 * At-Risk recovery priority is already protected by the program's
 * deliberately brief conditioning, and a rigid calendar deload is not
 * clinically indicated. New blue client-visible note + milestones/
 * rescanNote reconciled. (4) 4-week strength / 8-12-week Styku cadence
 * split stated in rescanNote (which also keeps the shoulder force-retest
 * tracking). (5) No cable references exist (verified); all DB loads sit
 * far under the 60 lb/hand ceiling; KB goblet variants EXCLUDED from the
 * squat menu (her 35 lb goblet load exceeds the studio's 25 lb KB
 * ceiling). (6) Warm-up drift re-checked all 3 days — all prose content
 * is unloaded/bodyweight activation; nothing to promote.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'August Olivia',
  programTitle: '3-Day Training Plan',
  subtitle: '60–80% Progressive Intensity Build',
  schedule: 'Tue/Thu/Sat Gym',
  stats: ['Age 25', '5\'2"', '109 lbs', 'Tue/Thu/Sat Gym', 'Sun, Mon, Wed, Fri Off'],
  weightKg: 49.4,
  ageYears: 25,
  isPostmenopausal: false,
  bmr: 1284,
  alstIndex: 5.02,
};

const styku = {
  scanDate: '8/5/2026',
  bodyFatPct: 43.4,
  bodyFatRank: 'AT-RISK',
  leanMass: 58.1,
  leanMassPct: 53.3,
  fatMass: 47.3,
  boneMass: 3.6,
  bmi: 19.9,
  bmr: 1284,
  vfa: 71.4,
  shapeScore: 39,
  shapeScoreLabel: 'Off Track',
  alstIndex: 5.02,
  leftArmLST: 4.3,
  rightArmLST: 4.7,
  leftLegLST: 11.4,
  rightLegLST: 12.1,
  peerComparison: 'Body fat % is higher than 88% of women ages 18–29 (Mayo Clinic reference ranges).',
};

const weekOverview = [
  { day: 'MON', intensity: 'Off', focus: 'Off' },
  { day: 'TUE', intensity: 70, focus: 'Full-Body\nFoundation' },
  { day: 'WED', intensity: 'Off', focus: 'Off' },
  { day: 'THU', intensity: 60, focus: 'Lower Unilateral\n& Corrective' },
  { day: 'FRI', intensity: 'Off', focus: 'Off' },
  { day: 'SAT', intensity: 80, focus: 'Upper Push/Pull\n+ Core' },
  { day: 'SUN', intensity: 'Off', focus: 'Off' },
];

const baselines = [
  ['Deadlift', 'N/A — Not Yet Tested', '8/5/2026', 'Establish baseline Week 1'],
  ['Back Squat (DB Goblet)', '35 lb × 5', '8/5/2026', '45–50 lb × 5 @ 2 RIR'],
  ['Seated OH Press (DB)', '12 lb × 5', '8/5/2026', '15 lb × 5 @ 2 RIR'],
  ['Incline Push-Up', '5 reps', '8/5/2026', '8–10 reps, progress incline'],
  ['DB Farmer Carry', '25 lb / hand', '8/5/2026', '30–35 lb / hand'],
  ['Hip Thrust', '45 lb × 5', '8/5/2026', '65–75 lb × 5'],
  ['RDL (DB, each hand)', '17.5 lb × 5', '8/5/2026', '20–22.5 lb × 5'],
  ['Lunges', 'N/A — Not Yet Tested', '8/5/2026', 'Establish baseline Week 1'],
  ['Plank Hold', '50 sec', '8/5/2026', '70–75 sec'],
];

const baselineNotes = [
  {
    type: 'clinical',
    label: 'ALST Index At-Risk — 5.02 kg/m²',
    body: 'Below the 5.5 kg/m² EWGSOP2 sarcopenia-risk threshold despite age 25. Muscle-building is the primary physiological goal of this program. Every session prioritizes progressive resistance loading. Protein and creatine targets are escalated below — see Nutrition Targets.',
  },
  {
    type: 'watch',
    label: 'Body Fat 43.4% At-Risk With Normal BMI (19.9)',
    body: 'A normal BMI is masking an At-Risk body fat percentage and an Off Track Shape Score (39/100) — a "normal weight, high adiposity" profile. Track body composition and circumference trends at the 8-week rescan, not scale weight.',
  },
  {
    type: 'clinical',
    label: 'Right Shoulder Force Deficit — 63.2% Asymmetry',
    body: 'Shoulder extension force test (6/1/2026): Peak Force Left 190N vs Right 70N — 63.2% asymmetry favoring the left. Right shoulder leads all unilateral pressing and pulling movements at reduced load with strict tempo control. Add rotator cuff and scapular stability work every session. Avoid near-maximal bilateral overhead loading until reassessed. Flag any pain, weakness, or fatigue on the right to your coach immediately.',
  },
  {
    type: 'teal',
    label: 'Left Leg Lean Soft Tissue Asymmetry — 11.4 vs 12.1 lbs',
    body: 'Gap of 0.7 lbs — roughly 6% relative to the larger side. LEFT leg continues to lead all unilateral lower-body exercises. Log left vs. right loads separately in the coaching cue field. Reassess at the 8-week Styku rescan to confirm this gap remains worth addressing.',
  },
  {
    type: 'gold',
    label: 'Baselines Pending — Deadlift & Lunges',
    body: 'Not yet tested. Establish working loads under direct coach supervision in the Week 1 session, then add to the programmed baseline table above.',
  },
  {
    type: 'blue',
    label: 'Planned Lighter Week — Week 5, Flexible',
    body: 'One deliberately lighter week is built into this program\'s rhythm: Week 5, directly after the Week 4 strength check. Same exercises and movement patterns, sets reduced by roughly a third, every set held comfortably in the technique band (3 or more reps in reserve), loads held at Week 3-4 levels — the usual add-weight rule pauses for that one week, then Weeks 6-8 rebuild toward the 8-week targets. With recovery running well this lighter week is flexible rather than fixed: it can slide a week later if everything feels strong, or move up if sleep, soreness, or session quality dip — your coach makes that call with you. One light week costs nothing that matters for the muscle-building priority: muscle built over the previous month is not lost in a single reduced-volume week — only a small edge of peak strength dips, and it returns within days.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Session Architecture — ICONS Block Method Restructure (8/19/2026)',
    body: 'Restructured to the ICONS Block Method six-slot session architecture (Corrective → Primary Compound → Accessory → Jason\'s Exercise → Secondary Compound → Third Compound/Integration; see CLAUDE.md). Slot 4 omitted all days — no Jason Bethea relationship on file, re-verified. Slot 1: Day 2\'s existing corrective circuit; Day 3 opens with Band Pull-Apart resequenced out of the old pull block as scapular/cuff preparation before pressing (serves the clinical note\'s own "rotator cuff and scapular stability work every session" instruction with existing content); Day 1 omitted (warm-up activation only, legitimately in prose). One latent fix: Day 1\'s bodyweight pattern set now renders before the loaded goblet squat, matching its own cue. New Day 1 integration carry (20-22.5 lb/hand) anchors strictly below the tested 25 lb/hand baseline (capped 8/22/2026 — convention #3 says below, and the top of the old range equalled the tested number). Wk1→Wk4 convention applied only where documented targets exist (Goblet 35→40-42.5, Hip Thrust 45→55-60 from milestones4wk; RDL 17.5→20-22.5 by Wk8 from the baselines table); shoulder-governed lifts deliberately keep flat controlled loads — their progression is capacity-governed by the right-shoulder protocol. Day 2 Block A intro\'s retired screening-as-risk-prediction ACL framing corrected to injury-prevention framing (Nicolette Scott precedent — exercises unchanged). Options menus constraint-filtered: every press option carries the right-leads/controlled-load rule and no near-maximal bilateral overhead option is listed; every unilateral lower option is left-led; KB goblet excluded (35 lb load > 25 lb KB ceiling). Deload: autoregulated combined model (25, robust, moderate intensities, no rehab flags). Carry-hand policy unchanged: sides even — the arm LST gap is below the ≥10% trigger and the shoulder force deficit is governed by its own controlled-load rule, so no carry lead is fabricated.',
  },
];

const days = [
  {
    intensity: 70,
    title: 'Day 1 — Tuesday',
    subtitle: 'Full-Body Foundation — Squat, Hip Thrust, Press',
    descriptor: 'Moderate Day — Building Baseline Volume',
    intensityLabel: '70% Day',
    intensityPara: 'Tuesday\'s loads are moderate — challenging but not near-maximal. Focus on clean, repeatable technique across all three movement patterns before load increases next block.',
    warmUp: '5 min bike or march in place. 2 rounds: 10 bodyweight squats, 10 band pull-aparts, 10 scap push-ups, 10 arm circles each direction (both arms, controlled), 10 glute bridges, 30-sec world\'s greatest stretch each side.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY COMPOUND — GOBLET SQUAT',
        introLabel: 'Load Target',
        intro: 'Goblet position, DB held at chest. Full-Body Foundation lift for the day — the bodyweight pattern set runs first, then own the depth and bracing pattern under load. If the day calls for a variation, rotate between: a box squat (depth set by the box), a split-stance squat (left leg leads), or a landmine squat. The goblet squat stays the lift we track toward the 4-week check.',
        exercises: [
          { name: 'Bodyweight Squat (pattern set)', sets: '1', reps: '10', load: 'BW', tempo: '2-0-1', rest: '—', cue: 'Warm-up pattern set before loaded work.', rirNote: '3+ RIR' },
          { name: 'DB Goblet Squat', sets: '3', reps: '5', load: 'Wk1: 35 lb → Wk4: 40–42.5 lb', tempo: '3-1-1', rest: '90s', cue: 'Baseline 35 lb ×5. Chest tall, sit hips back, knees track over toes.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'B',
        title: 'ACCESSORY — POSTERIOR CHAIN',
        introLabel: 'Why',
        intro: 'Hip thrust and RDL build the posterior chain that supports every lift on the baseline sheet — the muscle-building accessory work directly behind the squat. Hip thrust variations when the day calls for one: a floor glute bridge, a single-leg glute bridge (left leg leads), or a B-stance hip thrust (left leg takes the working share) — the barbell hip thrust stays the lift we track.',
        exercises: [
          { name: 'Barbell Hip Thrust', sets: '3', reps: '5', load: 'Wk1: 45 lb → Wk4: 55–60 lb', tempo: '2-1-1', rest: '90s', cue: 'Baseline 45 lb ×5. Chin tucked, ribs down, drive through heels.', rirNote: '2 RIR' },
          { name: 'DB Romanian Deadlift', sets: '3', reps: '5', load: 'Wk1: 17.5 lb/hand → 20–22.5 lb by Wk8', tempo: '3-1-1', rest: '75s', cue: 'Soft knees, hinge hips back, feel hamstring stretch.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'SECONDARY COMPOUND — UPPER PRESS',
        color: 'gold',
        introLabel: 'Shoulder Note',
        intro: 'The day\'s second compound pattern — pressing, rotating off the lower-body work above. Right shoulder leads at reduced load with strict control — see clinical flag above. If the day calls for a press variation, rotate between: a half-kneeling single-arm DB press (right arm leads, reduced load) or a landmine press (the shoulder-friendly arc) — both live inside the same controlled-load shoulder rule, and heavy bilateral overhead loading stays off the menu until the deficit is reassessed. The seated press stays the movement we track.',
        exercises: [
          { name: 'Seated DB OH Press', sets: '3', reps: '5', load: '12 lb', tempo: '2-0-2', rest: '75s', flag: 'Right shoulder leads — control tempo, no press-out compensation.', cue: 'Ribs down, press straight overhead, avoid arching.', rirNote: '3+ RIR — sub-maximal, flagged shoulder' },
          { name: 'Incline Push-Up', sets: '3', reps: '5–6', load: 'BW, bench', tempo: '3-0-1', rest: '60s', cue: 'Hands under shoulders, hips level, full lockout.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'FULL-BODY INTEGRATION — FARMER CARRY & CORE',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — a light loaded walk pulling the day\'s squat depth, hip drive, and pressing posture together under gait, then core under load. Loads stay below the tested 25 lb/hand carry baseline — this is a closer, not a second test. Distance and quality govern the carry, not a rep count. A suitcase carry (one side at a time, alternating evenly) covers the same closing ground when variety suits the day.',
        exercises: [
          { name: 'DB Farmer Carry (Light)', sets: '2', reps: '20–25 yd', load: '20–22.5 lb/hand', tempo: '—', rest: '60s', cue: 'Tested 25 lb/hand — this closer stays under it. Tall posture, ribs stacked, quiet shoulders.', rirNote: 'Distance & quality governed — no RIR target' },
          { name: 'Plank Hold', sets: '3', reps: '40–45s', load: 'BW', tempo: '—', rest: '45s', cue: 'Ribs down, glutes on, straight line head to heel.' },
        ],
      },
    ],
    coolDown: '2 min child\'s pose breathing. Doorway chest stretch 30s/side. Couch stretch (hip flexor) 30s/side. Standing quad stretch 20s/side.',
    iconsNote: 'ALST At-Risk at 25 means today\'s work is the highest-leverage session of the week for long-term muscle. Hit your protein target below and take creatine with your next meal.',
  },
  {
    intensity: 60,
    title: 'Day 2 — Thursday',
    subtitle: 'Lower Unilateral & Corrective — Asymmetry Protocol',
    descriptor: 'Technique & Corrective Day — Lighter Loads, No PRs',
    intensityLabel: '60% Day',
    intensityPara: 'Thursday is the lightest training day of the week by design — technique-first. LEFT leg leads every unilateral movement per the asymmetry protocol above; lighter loads, full attention on control and symmetry, not weight on the bar.',
    warmUp: '5 min easy cardio. 2 rounds: 10 banded lateral walks each direction, 10 glute bridges, 20-sec single-leg balance each side (eyes open).',
    blocks: [
      {
        letter: 'A',
        title: 'KNEE VALGUS & ASYMMETRY CORRECTIVE CIRCUIT',
        color: 'red',
        introLabel: 'Why',
        intro: 'Hip abductor / glute med activation before loaded unilateral work — the same lower-limb injury-prevention work that protects knee tracking on every single-leg pattern, and the entry point for closing the flagged leg asymmetry. This circuit earns its place for every session, not because of any one test result.',
        exercises: [
          { name: 'Banded Lateral Walk', sets: '2', reps: '10 each way', load: 'Mini band', tempo: '—', rest: '30s', cue: 'Band above knees, push knees out, stay low.' },
          { name: 'Single-Leg Balance', sets: '2', reps: '20–30s each', load: 'BW', tempo: '—', rest: '20s', flag: 'Left leg leads — log seconds L vs R separately.', cue: 'Soft knee, tall posture, eyes on a fixed point.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — DB SPLIT SQUAT (LEFT-LED)',
        introLabel: 'Load Target',
        intro: 'The day\'s primary lift, worked one leg at a time — left leg leads every set, always performing the left-side reps first while freshest. If the day calls for a variation, rotate between: a supported split squat (hand on a rail or bench for balance), a reverse lunge, or a low-box step-up — every option is left-led and stays in the same technique band as the split squat itself. The split squat stays the movement we track.',
        exercises: [
          { name: 'DB Split Squat', sets: '3', reps: '5 each leg', load: 'Light DB', tempo: '3-1-1', rest: '75s', flag: 'Left leg leads — log load/reps L vs R separately.', cue: 'Left leg first. Torso tall, back knee soft-tap.', rirNote: '3+ RIR — technique day, no PRs' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — ADDUCTOR STRENGTH',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Inner-thigh strength directly supports knee tracking and single-leg control — quiet, high-value accessory work between the two main lifts.',
        exercises: [
          { name: 'Copenhagen Plank (bench, top leg)', sets: '2', reps: '15–20s each side', load: 'BW', tempo: '—', rest: '30s', cue: 'Side plank, top shin on bench, hold level hips.' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — SINGLE-LEG RDL (LEFT-LED)',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — a hip hinge, rotating off the knee-dominant work above. Left leg leads. If the day calls for a variation, rotate between: a B-stance RDL (rear foot down for balance, left leg takes the working share) or a hip hinge to a bench or target (shortened range) — both left-led, both in the same technique band. The single-leg RDL stays the movement we track.',
        exercises: [
          { name: 'Single-Leg RDL (hand-supported)', sets: '2', reps: '5 each leg', load: 'BW / light DB', tempo: '3-1-1', rest: '60s', flag: 'Left leg leads.', cue: 'Hinge from hip, square hips to the floor.', rirNote: '3+ RIR — technique day' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — SUITCASE CARRY',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — one loaded walk pulling the day\'s single-leg control and bracing together under gait, one hand at a time with both sides working evenly. Distance and quality govern this work, not a rep count.',
        exercises: [
          { name: 'DB Suitcase Farmer Carry', sets: '3', reps: '20 yd each hand', load: '25 lb', tempo: '—', rest: '60s', cue: 'Ribs stacked over hips, no side lean, tight grip.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
    ],
    coolDown: '90/90 hip stretch 30s/side. Standing adductor stretch 20s/side. Figure-4 glute stretch 30s/side.',
    iconsNote: 'No PRs today — this session exists to close the left/right leg gap. Every left-side rep goes first, at full attention, before the right. The closing carry keeps that control working all the way out the door.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Saturday',
    subtitle: 'Upper Push/Pull + Core — Primary Strength',
    descriptor: 'Primary Strength Day — Last 1–2 Reps Hard, Achievable',
    intensityLabel: '80% Day',
    intensityPara: 'Saturday is this week\'s primary strength stimulus for the upper body. Right shoulder still leads all pressing and pulling at a controlled load — build capacity without overloading the deficit side.',
    warmUp: '5 min row or bike. 2 rounds: 10 band pull-aparts, 10 scap push-ups, 10 arm circles each direction (both arms).',
    blocks: [
      {
        letter: 'A',
        title: 'SHOULDER CORRECTIVE — SCAPULAR SET',
        color: 'red',
        introLabel: 'Why',
        intro: 'Scapular and rotator-cuff preparation before any pressing — the standing rule for every session given the right-shoulder force deficit. Control precedes power: set the shoulder blades first, then load them.',
        exercises: [
          { name: 'Band Pull-Apart', sets: '2', reps: '12–15', load: 'Light band', tempo: '2-1-2', rest: '45s', cue: 'Squeeze shoulder blades, control the return.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — SEATED OH PRESS',
        introLabel: 'Shoulder Note',
        intro: 'Right shoulder leads every set at a reduced, controlled load — see clinical flag on page 1. If the day calls for a press variation, rotate between: a half-kneeling single-arm DB press (right arm leads, reduced load) or a landmine press (the shoulder-friendly arc) — both live inside the same controlled-load rule, and heavy bilateral overhead loading stays off the menu until the deficit is reassessed. The seated press stays the movement we track.',
        exercises: [
          { name: 'Seated DB OH Press', sets: '3', reps: '5', load: '12–13 lb', tempo: '2-0-2', rest: '90s', flag: 'Right shoulder leads at reduced load — strict tempo.', cue: 'Right arm first. Ribs down, straight overhead path.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — INCLINE PUSH-UP',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'The muscle-building press accessory behind the day\'s primary — worked hard in a controlled, non-overhead range that respects the shoulder protocol.',
        exercises: [
          { name: 'Incline Push-Up', sets: '3', reps: '6–8', load: 'BW, bench', tempo: '3-0-1', rest: '60s', cue: 'Lower bench height only if form holds clean.', rirNote: '1 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — SINGLE-ARM ROW',
        introLabel: 'Why',
        intro: 'The day\'s second compound pattern — pulling, rotating off the pressing above. Single-arm row trains the weaker right shoulder unilaterally under full control. If the day calls for a row variation, rotate between: a chest-supported row, a Kieser row, or a band row — right arm leads on every option, at the same controlled load. The single-arm DB row stays the movement we track.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '3', reps: '6 each arm', load: '15–17.5 lb', tempo: '2-1-1', rest: '75s', flag: 'Right arm leads — log load L vs R separately.', cue: 'Right first. Flat back, pull elbow to hip.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — CARRY & CORE',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound work — the day\'s pressing posture, pulling strength, and grip pulled together under gait, then core under load. Distance and quality govern the carry, not a rep count.',
        exercises: [
          { name: 'DB Farmer Carry', sets: '3', reps: '25 yd each hand', load: '25–27.5 lb', tempo: '—', rest: '60s', cue: 'Tall posture, ribs stacked, quiet shoulders.', rirNote: 'Distance & quality governed — no RIR target' },
          { name: 'Plank Hold', sets: '3', reps: '45–50s', load: 'BW', tempo: '—', rest: '45s', cue: 'Ribs down, glutes on, no hip sag.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s/side. Cross-body shoulder stretch 20s/side. Cat-cow x8. Child\'s pose 60s.',
    iconsNote: 'Primary strength day for the week — but "primary" means controlled intensity, not max effort on the right shoulder. Stop any set early if you feel right-side fatigue outpacing the left.',
  },
];

const summary = {
  subtitle: 'August Olivia  ·  ICONS Index  ·  Progressive Intensity Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Full-Body Foundation', 'DB Goblet Squat', 'Baseline volume — form check on all 3 patterns'],
    ['2', '60%', 'Lower Unilateral & Corrective', 'DB Split Squat', 'No PRs — left leg leads, close the leg gap'],
    ['3', '80%', 'Upper Push/Pull + Core', 'Seated DB OH Press', 'Right shoulder leads at controlled load'],
  ],
  milestones4wk: 'Squat 40–42.5 lb × 5 @ 2 RIR. Hip thrust 55–60 lb × 5. Plank 60s. Right shoulder unilateral load within 20% of left on single-arm row. Week 4 closes with the strength check; the planned lighter week that follows (Week 5, flexible — see the note above) consolidates before Weeks 6-8 rebuild.',
  milestones8wk: 'Squat 45–50 lb × 5 @ 2 RIR (reached through the Wk4 check, the flexible Week 5 lighter week, and the Weeks 6-8 rebuild). Deadlift and lunge baselines established and progressing. Plank 70–75s. Left/right leg LST gap reduced from 0.7 lbs.',
  rescanNote: 'Two clocks run here: strength is re-checked every 4 weeks (the Week 4 check, then the Week 8 retest at the end of the rebuild), while the Styku body-composition scan runs on its own 8-12-week cadence — book one in that window. Track: ALST Index trend toward 5.5 kg/m², body fat % direction, left/right leg LST gap, and right shoulder force output vs. left on the extension test.',
};

const data = {
  client,
  styku,
  weekOverview,
  baselines,
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'august_olivia');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'August_Olivia_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026; re-checked 8/19/2026 with the Block
  // Method restructure) — same data object, filtered. ONE baselineNote is
  // now marked audience: 'internal' (the 8/19 Session Architecture record);
  // every clinical note stays client-visible. No clientHighlight is set —
  // this is her first build, with Deadlift/Lunges baselines still pending,
  // so there is no real prior PR/version to compare against.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'August_Olivia_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
