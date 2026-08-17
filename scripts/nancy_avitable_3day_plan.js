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
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad,
} = require('./icons_template');

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
  ['Back Squat', `95 lbs x 8 (Epley 1RM ≈${oneRM.backSquat} lbs)`, '8/13/2026', `Wk1: ${wk1.backSquat} lbs x5 → Wk4: ${wk4.backSquat} lbs x5 — Day 3 Block A primary strength lift`],
  ['Single-Arm DB Row', `30 lbs x 10 (Epley 1RM ≈${oneRM.row} lbs)`, '8/13/2026', `Wk1: ${wk1.row} lbs x8 → Wk4: ${wk4.row} lbs x8 — Day 2 Block A`],
  ['Goblet Squat', '40 lbs w/ 10-sec isometric hold x 10 (isometric-loaded — not run through Epley formula)', '8/13/2026', `Wk1: ${wk1.gobletSquat} lbs x6-8 (tempo) → Wk4: ${wk4.gobletSquat} lbs x6-8 — Day 1 Block B, adjusted for the program's tempo-rep format vs. the tested hold format`],
  ['DB Chest Press', '15 lbs (reps not recorded — working/reference load, not a rep-max)', '8/13/2026', `Informs Day 2 Block A Incline DB Press Wk1: ${wk1.chestPress} lbs/hand → Wk4: ${wk4.chestPress} lbs/hand — judgment call, see note below`],
  ['DB Split Squat', `17.5 lbs/hand x 10 (Epley 1RM ≈${oneRM.splitSquat} lbs)`, '8/13/2026', `Informs Day 3 Block A Weighted Step-Up Wk1: ${wk1.splitSquat} lbs/hand → Wk4: ${wk4.splitSquat} lbs/hand — judgment call, see note below`],
  ['Hex Deadlift (Trap Bar)', `135 lbs x 8 (Epley 1RM ≈${oneRM.hexDL} lbs)`, '8/13/2026', 'Reference baseline only — no matching slot; NOT used to inform Romanian Deadlift (mechanically distinct lift, different load capacity). Revisit if a dedicated hex-bar deadlift slot is added.'],
  ['Overhead Press', `17.5 lbs x 10 (Epley 1RM ≈${oneRM.ohp} lbs) — format as reported, no seated/standing qualifier given`, '8/13/2026', 'Reference baseline only — no existing press slot beyond Incline DB Press; not force-fit as a 3rd pressing exercise.'],
  ['Sled Push', '135 lbs', '8/13/2026', 'Reference baseline only — not one of the 10 core ICONS Baseline Testing Protocol movements (distance/effort push, not a rep-max); no existing slot.'],
  ['Plank Hold', '2:05 (125 sec)', '8/13/2026', 'Reference baseline only — no plank slot in current 3-day structure.'],
  ['Push-Up (Incline)', '10 reps', '8/13/2026', 'Reference baseline only — no push-up slot in current 3-day structure.'],
  ['Pull-Up (Assisted)', '20 reps', '8/13/2026', 'Reference baseline only — bonus 11th ICONS protocol movement; no pull-up slot in current structure.'],
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
    body: '17.5% left/right gap exceeds the 0.5-unit asymmetry threshold. Lead every unilateral exercise with the LEFT (weaker) side per protocol.',
  },
  {
    type: 'red',
    label: 'Corrective Priority',
    body: 'Left glute medius activation and unilateral loading take precedence this block. Track left vs. right performance separately; re-test at 8-week rescan.',
  },
  {
    type: 'gold',
    label: 'New Strength Baseline Battery — 8/13/2026',
    body: `Nancy's first full strength-testing battery (11 movements) is now on file — see the table above. Five movements map directly onto an existing exercise slot and now carry real Week 1 → Week 4 loads in place of the prior "moderate"/"heavy" placeholders: Back Squat and Single-Arm DB Row (both Epley-derived), Goblet Squat (isometric-hold-informed, not Epley — see table note), and (via two flagged judgment calls below) Incline DB Press and Weighted Step-Up. The remaining six movements (Hex Deadlift, Overhead Press, Sled Push, Plank Hold, Push-Up Incline, Pull-Up Assisted) don't have a defensible existing slot in this 3-day structure and are logged as reference baselines only, not force-fit into the program. Nancy is 38 (CLAUDE.md's 35-45 bracket) — the 40-55 "all 10 core movements must show programmed progression" standard does not apply to her; broad battery coverage here is a good outcome, not a satisfied mandate.`,
  },
  {
    type: 'watch',
    label: 'Judgment Call — DB Chest Press vs. Incline DB Press',
    body: `Xolokan's baseline data lists "DB Chest Press" at 15 lbs with no incline qualifier, while Nancy's existing Day 2 program already includes "Incline DB Press." These are not silently treated as identical — flat and incline pressing are a real mechanical difference. Kept as a distinct baselines-table entry; the 15 lbs figure is used only to INFORM a reasonable Week 1 reference load (${wk1.chestPress} lbs/hand → ${wk4.chestPress} lbs/hand) for the existing Incline DB Press slot, not presented as a confirmed test of that specific exercise. Confirm with Nancy/trainer notes whether these were the same movement.`,
  },
  {
    type: 'watch',
    label: 'Judgment Call — DB Split Squat vs. Weighted Step-Up',
    body: `No exercise literally named "Split Squat" exists in Nancy's program. Weighted Step-Up (Day 3 Block A, a primary-strength-block loaded unilateral knee-dominant movement) is the closest analogous slot — closer than Day 1's Reverse Lunge or Day 3's Curtsy Lunge, both of which are deliberately light, corrective-context finishers where a heavier baseline-derived load would work against their actual purpose. The DB Split Squat baseline (${wk1.splitSquat} lbs/hand → ${wk4.splitSquat} lbs/hand) is used to inform Weighted Step-Up's Week 1 → Week 4 load on that basis.`,
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
    warmUp: '5–7 min cycle + dynamic lateral band walks (2×20) + single-leg glute bridges 2×10 each side',
    blocks: [
      {
        letter: 'A',
        title: 'Activation / Corrective',
        color: 'red',
        introLabel: 'Why',
        intro: 'Two exercises to re-balance left glute med activation.',
        exercises: [
          { name: 'Side-Lying Hip Abduction (Slow)', sets: '3', reps: '12', load: 'bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Lead with heel; no pelvic tilt; 1-2s hold top', flag: 'Left focus' },
          { name: 'Banded Standing Hip Abduction (Left Emphasis)', sets: '3', reps: '10', load: 'band', tempo: '2-0-1', rest: '30s', cue: 'Drive lateral glute; 2s hold; +2 reps left', flag: 'Left corrective' },
        ],
      },
      {
        letter: 'B',
        title: 'Compound Strength',
        introLabel: 'Why',
        intro: 'Build bilateral strength while preserving left control. Goblet Squat Week 1 load is informed by the 8/13 baseline test (40 lbs w/ 10-sec hold x10) — adjusted for this block\'s tempo-rep format, not a literal repeat of the isometric test load.',
        exercises: [
          { name: 'Goblet Squat', sets: '4', reps: '6-8', load: `Wk1: ${wk1.gobletSquat} lbs → Wk4: ${wk4.gobletSquat} lbs`, tempo: '2-0-2', rest: '90s', cue: 'Braced core; track knees; depth to parallel', rirNote: '2 RIR' },
          { name: 'Romanian Deadlift', sets: '3', reps: '8', load: 'moderate', tempo: '2-0-2', rest: '90s', cue: 'Hinge at hips; feel posterior chain tension' },
        ],
      },
      {
        letter: 'C',
        title: 'Unilateral Strength Finishers',
        exercises: [
          { name: 'Reverse Lunge (Left-Led)', sets: '3', reps: '8 each', load: 'bodyweight / light', tempo: '2-0-1', rest: '60s', cue: 'Step back with control; emphasise L push-off', flag: 'Left corrective' },
          { name: 'Single-Leg Hip Bridge (Left Focus)', sets: '3', reps: '10', load: 'bodyweight', tempo: '2-0-1', rest: '45s', cue: 'Drive left glute; 1s pause top; no knee cave', flag: 'Left corrective' },
        ],
      },
    ],
    coolDown: '8–10 min mobility and glute release',
    iconsNote: 'Emphasise tempo and control on left side. Use lighter load and perfect technique before progressing.',
  },
  {
    intensity: 60,
    title: 'Day 2 — Upper / Mobility',
    subtitle: 'Upper Stability + Posterior Chain',
    descriptor: 'Lower Load — Mobility Emphasis',
    intensityLabel: '60% Day',
    intensityPara: 'Lower overall load; emphasise shoulder and thoracic mobility.',
    warmUp: 'Band pull-aparts, thoracic rotations, 3×10 scapular push-ups',
    blocks: [
      {
        letter: 'A',
        title: 'Push / Pull',
        introLabel: 'Load Target',
        intro: `Incline DB Press Week 1 load is informed by the 8/13 baseline test ("DB Chest Press," 15 lbs — see judgment-call note above on the flat-vs-incline distinction). Single-Arm Row loads directly off its own matching baseline (30 lbs x10, Epley 1RM ≈${oneRM.row} lbs).`,
        exercises: [
          { name: 'Incline DB Press', sets: '4', reps: '8', load: `Wk1: ${wk1.chestPress} lbs/hand → Wk4: ${wk4.chestPress} lbs/hand`, tempo: '2-0-1', rest: '90s', cue: 'Control descent', flag: 'Load informed by DB Chest Press baseline — see note' },
          { name: 'Single-Arm Row', sets: '4', reps: '8 each', load: `Wk1: ${wk1.row} lbs → Wk4: ${wk4.row} lbs`, tempo: '2-0-1', rest: '60s', cue: 'Pull to the hip; maintain neutral spine' },
        ],
      },
      {
        letter: 'B',
        title: 'Accessory',
        color: 'gold',
        exercises: [
          { name: 'Face Pulls', sets: '3', reps: '15', load: 'band', tempo: '2-0-1', rest: '45s', cue: 'High elbows; squeeze rear delts' },
          { name: 'Farmer Carry', sets: '3', reps: '30s', load: 'moderate', tempo: '—', rest: '60s', cue: 'Tall posture; tight core' },
        ],
      },
    ],
    coolDown: 'Lat stretch and foam rolling',
    iconsNote: 'Use this session to improve movement quality and recovery.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Lower Body (Strength + Unilateral)',
    subtitle: 'Build Strength; Progressive Overload With Unilateral Finishers',
    descriptor: 'Higher Intensity — Left-Volume Maintenance',
    intensityLabel: '80% Day',
    intensityPara: 'Higher intensity to drive strength adaptations; include left-volume maintenance.',
    warmUp: 'Barbell hip hinge drill, 2 sets light RDLs, activation band side steps',
    blocks: [
      {
        letter: 'A',
        title: 'Strength Core',
        introLabel: 'Load Target',
        intro: `Back Squat tested at 95 lbs x8 (Epley 1RM ≈${oneRM.backSquat} lbs) — Week 1 trains at ${wk1.backSquat} lbs, climbing to ${wk4.backSquat} lbs by Week 4. Weighted Step-Up Week 1 load is informed by the DB Split Squat baseline (${wk1.splitSquat} lbs/hand — see judgment-call note above).`,
        exercises: [
          { name: 'Back Squat or Box Squat', sets: '5', reps: '5', load: `Wk1: ${wk1.backSquat} lbs → Wk4: ${wk4.backSquat} lbs`, tempo: '2-0-2', rest: '2m', cue: 'Braced core; safe depth', rirNote: '1-2 RIR' },
          { name: 'Weighted Step-Up', sets: '3', reps: '6 each', load: `Wk1: ${wk1.splitSquat} lbs/hand → Wk4: ${wk4.splitSquat} lbs/hand`, tempo: '2-0-1', rest: '90s', cue: 'Drive through heel; control descent', flag: 'Load informed by DB Split Squat baseline — see note' },
        ],
      },
      {
        letter: 'B',
        title: 'Posterior Chain',
        exercises: [
          { name: 'Hip Thrust', sets: '4', reps: '8', load: 'moderate-heavy', tempo: '2-0-1', rest: '90s', cue: 'Full hip extension; hold 1s top' },
          { name: 'Nordic Hamstring (Assisted)', sets: '3', reps: '6-8', load: 'bodyweight', tempo: '2-0-2', rest: '90s', cue: 'Slow eccentric; control' },
        ],
      },
      {
        letter: 'C',
        title: 'Left-Side Volume Finishers',
        color: 'red',
        exercises: [
          { name: 'Cable Hip Abduction (Left)', sets: '3', reps: '12', load: 'light-moderate', tempo: '2-0-1', rest: '45s', cue: 'Slow control; add 2 extra reps on L', flag: 'Left corrective' },
          { name: 'Curtsy Lunge (Left Lead)', sets: '3', reps: '10', load: 'bodyweight', tempo: '2-0-1', rest: '45s', cue: 'Focus on L glute drive' },
        ],
      },
    ],
    coolDown: 'Hamstring and lateral banded mobility',
    iconsNote: 'Push load on bilateral lifts but finish with unilateral sets focused on left quality.',
  },
];

const summary = {
  subtitle: 'Nancy Avitable  ·  ICONS Index  ·  Left Hip Corrective & Unilateral Strength Build  ·  Week 1',
  rows: [
    ['1', '70%', 'Lower Body — Left Hip Corrective', `Goblet Squat (${wk1.gobletSquat}→${wk4.gobletSquat} lbs)`, 'Left-side unloading emphasis; corrective circuit precedes compound work'],
    ['2', '60%', 'Upper Body — Stability & Posterior Chain', `Single-Arm DB Row (${wk1.row}→${wk4.row} lbs)`, 'Lower load week focused on movement quality and mobility'],
    ['3', '80%', 'Lower Body — Bilateral Strength + Unilateral Finishers', `Back Squat (${wk1.backSquat}→${wk4.backSquat} lbs)`, 'Higher intensity strength day; finish with left-focused unilateral volume'],
  ],
  milestones4wk: `Reduce asymmetry below 10% and increase left hip abduction force by 10-15%. Back Squat progressing toward ${wk4.backSquat}+ lbs x5 at 1-2 RIR; Single-Arm Row toward ${wk4.row} lbs x8.`,
  milestones8wk: `Symmetry within 5–8%; L and R hip abduction within 5%. Retest the 8/13/2026 strength battery — target measurable gains across Back Squat, Single-Arm DB Row, Goblet Squat, and DB Split Squat.`,
  rescanNote: 'Rescan with Styku in 8 weeks to assess asymmetry and lean mass changes. Continue left-focused progression if asymmetry persists. Re-run the full 8/13/2026 strength battery alongside the rescan to establish a real before/after on the newly-tested lifts.',
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

async function main() {
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'nancy_avitable');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Nancy_Avitable_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
