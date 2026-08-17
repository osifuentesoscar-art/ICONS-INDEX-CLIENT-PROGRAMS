/**
 * Mary Burfete — ICONS 2-Day Full Gym Training Plan
 * Brace Life Studios
 *
 * New client. Built from a Styku scan (8/10/2026) and an 11-exercise ICONS
 * baseline battery (client-reported, includes bonus 3-grip assisted pull-up
 * test — same three-grip format as Vinz Feller's baseline).
 *
 * Structural reference: scripts/rena_paul_2day_plan.js (same demographic
 * bracket, same full Styku+baseline data shape, same 2-day full-gym format,
 * no weekOverview strip).
 *
 * AGE BRACKET BOUNDARY: at 55, Mary sits directly on the boundary between
 * the 45-55 (Perimenopause/Menopause Transition) and 55-65 (Postmenopausal)
 * brackets — flagged explicitly in baselineNotes rather than silently
 * picking one. ageYears=55 already trends proteinTargets()/nutritionBlock()
 * into the 50+ tier (2.0-2.2 g/kg) and creatine "strongly indicated"
 * automatically — no manual override needed for those two.
 * PROTEIN ENGINE NOTE (8/17/2026): CLAUDE.md's Protein Targets section was
 * corrected 8/17/2026 to re-key the 2.0-2.2 g/kg escalation from age alone
 * to context (genuine energy deficit, heavy training load, or ALST
 * At-Risk) — `proteinTargets()`'s `atRisk || ageYears >= 50` logic is a
 * known, not-yet-built engine gap per that correction (flagged there for
 * future engine/intake work, since "energy deficit"/"heavy training load"
 * aren't yet structured client-data fields). Left UNCHANGED here rather
 * than hand-overridden: the nutrition block's rendered "50+ tier" label
 * still reflects the engine's actual current (unmodified) computation, so
 * rewriting only this comment/baselineNote would create an internal
 * mismatch against what the document itself displays. Worth noting Mary's
 * elevated target is independently well-supported under the corrected,
 * context-driven standard too — her ALST sits only 0.02 kg/m² from the
 * At-Risk line, and this program carries real heavy training load.
 *
 * isPostmenopausal is left false/unset — no menopausal status was stated by
 * the trainer, so it is not fabricated here (same posture as Rena Paul's
 * script). Because Mary's program carries real heavy hip-thrust/squat/
 * deadlift loading and she is at/past the average age of menopause onset,
 * this ambiguity is flagged in its own baselineNote (not just a one-line
 * aside) per CLAUDE.md's Perimenopausal Status section — confirming her
 * actual status at next intake is explicitly worth doing given how
 * load-bearing that determination is for the pelvic floor protocol.
 *
 * ALST Index 5.52 kg/m² sits within the women's normal reference range
 * (>= 5.5 kg/m²), but only 0.02 kg/m² above the <5.5 At-Risk cutoff —
 * flagged explicitly as genuinely borderline rather than reported as
 * comfortably clear. This does NOT trip client.alstIndex < 5.5, so
 * proteinBar() is correctly NOT auto-inserted per day by buildDocument() —
 * the borderline status is documented in baselineNotes/Styku findings
 * instead, not forced into the per-day engine trigger that's reserved for
 * confirmed At-Risk clients.
 * LANGUAGE CORRECTED 8/17/2026 (CLAUDE.md's External Evidence Review): the
 * prior version of this comment (and the matching baselineNote/rescanNote
 * body text below) described this as the "Normal — monitor" middle rung of
 * a 3-tier table (<5.5 At-Risk / 5.5-6.99 Normal-monitor / >=7.0 Optimal).
 * That 3-tier table is retired — 7.0 kg/m² is EWGSOP2's MALE at-risk
 * cutoff, not a female "Optimal" threshold, so there is no graded tier
 * above 5.5 for a woman. ALST is now presented as a trend metric with a
 * single reference floor (<5.5 At-Risk / >=5.5 normal reference range),
 * not a 3-rung scale — same 5.52 kg/m² number, corrected framing only.
 *
 * VFA 62.0 cm² — LANGUAGE CORRECTED 8/17/2026: CLAUDE.md's VFA risk-band
 * table (<70/70-99/100-149/>=150 -> Very Low/Low/Moderate/High Risk) is
 * retired entirely, not just recalibrated — no consensus body endorses a
 * single VAT/VFA cm² cutoff, and Styku's own VFA validation was against
 * DXA in KILOGRAMS, never in cm². The prior version of this comment (and
 * the matching baselineNote/rescanNote text below) labeled 62.0 cm² "Very
 * Low Risk" as the "correct, more precise tier" against Styku's own "Low
 * Risk" dashboard tag — that framing is now itself the error being
 * corrected, not a fix over Styku's label. VFA is presented as a trend
 * metric to track at future scans, with no risk-band label applied to
 * either Styku's tag or ICONS's own (now-retired) table.
 *
 * Segmental asymmetry: arms 0.1 lb gap (below the 0.5 lb asymmetry-protocol
 * threshold — monitor only). Legs: Left 14.6 / Right 15.1 lbs — exactly
 * 0.5 lbs, landing precisely AT the asymmetry-protocol trigger. Per the
 * Johanna Castillo precedent, an exact-threshold gap is treated as
 * triggering the full protocol, not as a borderline non-trigger. weakerSide()
 * confirms LEFT leg (lower LST) is weaker and leads every unilateral leg
 * exercise below.
 *
 * Baseline battery is strong and well-established (155 lb Hex Deadlift x5,
 * 90 lb Back Squat x5, 90 lb Hip Thrust x5, 65 lb Bench x5, 2:03 plank) —
 * this is a solid trainee, not a beginner. Working loads below are computed
 * from Epley 1RM + workingLoad() off her real tested numbers rather than
 * conservative estimates, per the "never under-load" principle. Sled Push
 * and Farmer Carry use descriptive/reference load framing (no 1RM math —
 * neither is a maximal-strength-tested movement).
 *
 * REVISION (8/16/2026, roster spot-check from icons-roster-analyst) — POWER
 * TRAINING ADDED, 55-65 BRACKET: CLAUDE.md's Power Training section places
 * sub-maximal-load/maximal-intent power work in the 55-65 bracket already,
 * not just 65+ (power output declines before strength does), and Mary's two
 * closest bracket-mates on the roster (Siobhan Hansen 59, Elizabeth Poyner
 * 64) both already carry it. Mary has no clinical flag — no shoulder issue,
 * no cardiac flag — that would rule out any particular movement, but the
 * addition below stays deliberately conservative and consistent with the
 * roster's existing pattern (Siobhan's Box Step-Up Jump was kept lower-body/
 * non-overhead specifically because of her shoulder reintroduction; the same
 * lower-body choice is used here even though nothing in Mary's document
 * specifically rules out an overhead movement, since a hip/knee-dominant
 * jump pattern is the more conservative default and pairs naturally with her
 * existing Hex Bar Deadlift work). Day A, new Block D: Trap Bar Jump — light
 * load (well below her Epley-derived hinge working loads), full recovery
 * between sets, deliberately sequenced BEFORE the Conditioning Finisher
 * (renumbered from Block D to Block E) so the power stimulus is trained
 * fresh rather than after fatiguing conditioning work — matching Siobhan's
 * Day 3 sequencing (power block placed before, not after, the metabolic
 * finisher). Reviewed against the Antagonist Rotation Rule: Block C closes
 * on Pallof Press (core/anti-rotation, not hip-hinge), so the new Trap Bar
 * Jump does not stack a third consecutive hip-hinge/power movement against
 * anything preceding it, and Block E's Sled Push option (if chosen over the
 * Bike HIIT alternative) makes only 2 consecutive hip-dominant/explosive
 * exercises across the block boundary — within the rule's two-in-a-row
 * allowance, not a violation.
 *
 * REVISION (8/16/2026, roster spot-check from icons-doc-auditor) —
 * ANTAGONIST ROTATION RULE FIX, DAY A BLOCK A/B BOUNDARY: a real,
 * pre-existing violation was found spanning the Block A/B boundary — Block A
 * closed on Face Pull (pull) and Block B opened Single-Arm DB Row (pull) →
 * Bent-Over DB Row (pull), three consecutive pull-pattern exercises. This
 * was an artifact of the 8/12/2026 antagonist-rotation fix (see CLIENTS.md),
 * which resolved the original Block-B-internal 3-pull stack (Single-Arm Row
 * → Bent-Over Row → Face Pull) by moving Face Pull to the end of Block A —
 * inadvertently relocating the same 3-pull run to span the block boundary
 * instead of eliminating it. Fixed by swapping Bent-Over DB Row and
 * Single-Leg RDL's order within Block B: the day now reads Face Pull (pull)
 * → Single-Arm DB Row (pull) → Single-Leg RDL (hinge) → Bent-Over DB Row
 * (pull) → Incline DB Press (push) — the hinge exercise breaks up the pull
 * stack without dropping anything, per the rule's own "resequence, don't
 * drop" scope. Full sequence re-checked end to end: Block A opens Hex Bar
 * Deadlift (hinge) → Hip Thrust (hinge) — 2 in a row, the allowed
 * primary+accessory pairing — then Face Pull (pull) → Single-Arm DB Row
 * (pull) — 2 in a row, allowed — then Single-Leg RDL (hinge) breaks it, so
 * no 3-consecutive-hinge or 3-consecutive-pull stack exists anywhere across
 * the boundary, and Single-Leg RDL is separated from Block A's Hex Bar
 * Deadlift/Hip Thrust hinge pair by two intervening pull exercises, so it
 * does not create a new hinge-adjacency issue with them either. Block B's
 * intro paragraph was rewritten to match the new order (learning from the
 * 8/12/2026 history where a stale intro was initially missed on the first
 * pass). Regenerated and structurally re-verified via python-docx; one more
 * independent audit pass recommended before this change is committed
 * alongside the rest of Mary Burfete's pending revisions.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument, epley1RM, workingLoad, weakerSide } = require('./icons_template');

// ── Epley 1RM + working-load calculations off real tested numbers ────────
const hexDL1RM = epley1RM(155, 5);        // 181
const backSquat1RM = epley1RM(90, 5);      // 105
const hipThrust1RM = epley1RM(90, 5);      // 105
const bench1RM = epley1RM(65, 5);          // 76
const splitSquat1RM = epley1RM(17.5, 5);   // 20
const row1RM = epley1RM(30, 5);            // 35

const hexDL_wk1 = workingLoad(hexDL1RM, 0.80);   // 145
const hexDL_wk4 = workingLoad(hexDL1RM, 0.93);   // 170
const backSquat_wk1 = workingLoad(backSquat1RM, 0.80); // 85
const backSquat_wk4 = workingLoad(backSquat1RM, 0.93); // 100
const hipThrust_wk1 = workingLoad(hipThrust1RM, 0.80); // 85
const hipThrust_wk4 = workingLoad(hipThrust1RM, 0.93); // 100
const bench_wk1 = workingLoad(bench1RM, 0.80);   // 60
const bench_wk4 = workingLoad(bench1RM, 0.93);   // 70
const splitSquat_wk1 = workingLoad(splitSquat1RM, 0.80); // 15
const splitSquat_wk4 = workingLoad(splitSquat1RM, 0.93); // 20
const row_wk1 = workingLoad(row1RM, 0.80);       // 30
const row_wk4 = workingLoad(row1RM, 0.93);       // 35

// Legs: Left 14.6 / Right 15.1 — exactly 0.5 lb gap, at the asymmetry
// trigger. weakerSide() confirms LEFT (lower LST) leads unilateral leg work.
const legLead = weakerSide(14.6, 15.1); // 'left'

const client = {
  name: 'Mary Burfete',
  programTitle: '2-Day Full Gym Training Plan',
  subtitle: 'Strength, Bone Density & Hormonal Resilience Foundation',
  schedule: 'Full Gym · 2 Days/Week',
  stats: ['Age 55', "5'8\"", '140 lbs', 'Full Gym · 2 Days/Week'],
  weightKg: 63.5,
  ageYears: 55,
  isPostmenopausal: false,
  bmr: 1330,
  alstIndex: 5.52,
};

const styku = {
  scanDate: '8/10/2026',
  bodyFatPct: 35.5,
  bodyFatRank: 'Average',
  leanMass: 85.2,
  leanMassPct: 61.1,
  fatMass: 49.6,
  boneMass: 4.7,
  bmi: 21.2,
  bmr: 1330,
  vfa: 62.0,
  shapeScore: 65,
  shapeScoreLabel: 'Needs Improvement',
  alstIndex: 5.52,
  leftArmLST: 7.3,
  rightArmLST: 7.2,
  leftLegLST: 14.6,
  rightLegLST: 15.1,
  peerComparison: "Body fat % is lower than 79% of women 50-59 (21st percentile) — leaner than most peers, though Styku's own peer-comparison dashboard tags this band \"Moderate Risk.\" Lean Mass is flagged \"Ideal Lean Mass\" by Styku.",
};

const baselineNotes = [
  {
    type: 'green',
    label: 'Strong, Well-Established Baseline',
    body: `Mary tested well above a typical new-client baseline across every major pattern: 155 lb Hex Deadlift x5 (Epley 1RM ${hexDL1RM} lbs), 90 lb Back Squat x5 (Epley 1RM ${backSquat1RM} lbs), 90 lb Hip Thrust x5 (Epley 1RM ${hipThrust1RM} lbs), 65 lb Bench Press x5 (Epley 1RM ${bench1RM} lbs), and a 2:03 plank hold — well past the 60-second ICONS threshold. This is a solid, established trainee, not a beginner. Working loads throughout this program are set from her real tested numbers rather than a conservative ramp-up, per the "never under-load" principle.`,
  },
  {
    type: 'teal',
    label: 'Styku Findings — Composition & Risk Bands',
    body: 'Shape Score 65/100 (Needs Improvement). Body Fat 35.5% (49.6 lbs fat mass) — Styku\'s own scan classification reads "Average" (35-39.9% band). Lean Mass 85.2 lbs (61.1%) — Styku flags this "Ideal Lean Mass." BMI 21.2 — Normal range (18.5-24.9). ALST Index 5.52 kg/m² — within the normal reference range (≥5.5 kg/m²), but only 0.02 kg/m² above the At-Risk cutoff — genuinely borderline, and worth close attention at the next rescan rather than treated as comfortably clear; ALST is tracked here as a trend metric, not a graded score. VFA 62.0 cm² — a low reading, worth tracking as a trend at future scans rather than assigned a precise risk-band label.',
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Legs At Threshold, Protocol Triggered',
    body: `Arms: Left ${styku.leftArmLST} lbs / Right ${styku.rightArmLST} lbs — 0.1 lb gap, below the 0.5 lb asymmetry-protocol threshold — monitor only, no unilateral-lead requirement. Legs: Left ${styku.leftLegLST} lbs / Right ${styku.rightLegLST} lbs — exactly 0.5 lbs, landing precisely AT the asymmetry-protocol trigger. An exact-threshold gap is treated as triggering the full protocol, not as a borderline non-trigger. LEFT leg (lower LST) is weaker and leads every unilateral leg exercise in this program — split stance squat, step-up, and single-leg RDL all list LEFT first below.`,
  },
  {
    type: 'gold',
    label: 'Age Bracket Boundary — 45-55 / 55-65',
    body: 'At 55, Mary sits directly on the boundary between the 45-55 (Perimenopause/Menopause Transition) and 55-65 (Postmenopausal) age brackets. Protein and creatine targets below sit at the upper end of the working range (2.0-2.2 g/kg, creatine strongly indicated) — supported by her borderline ALST reading (0.02 kg/m² above the At-Risk cutoff) and the heavy training load carried in this program. LIFTMOR-style bone-loading candidacy screening (T-score < -1.0) is worth introducing now rather than waiting — both brackets converge on bone density as a priority as estrogen decline accelerates.',
  },
  {
    type: 'gold',
    label: 'Seated Overhead Press, Incline Press & Lunge — Baselines Established This Week',
    body: 'Three movements from the core ICONS Baseline Testing Protocol were not part of Mary\'s initial testing battery: Seated Overhead Press, Incline Dumbbell Press, and a true lunge pattern (her split stance squat and step-up cover related but distinct patterns, not a substitute for a genuine lunge). All three are introduced this week at conservative, technique-first loads (Seated DB Overhead Press 15 lbs/hand, Incline Dumbbell Press 20 lbs/hand, DB Reverse Lunge 15 lbs/hand — LEFT leg leads, consistent with the segmental asymmetry finding above) and become the new 8-week baseline for each pattern, not an invented tested number.',
  },
  {
    type: 'watch',
    audience: 'internal',
    label: 'Menopausal Status — Unconfirmed, Flagged for Next Intake',
    body: 'No menopausal status was stated by the trainer at intake — isPostmenopausal is left unconfirmed here rather than fabricated. At 55, Mary is at or past the average age of menopause onset (~51), and this program includes real, heavy hip-thrust, squat, and deadlift loading — exactly the pattern the pelvic floor protocol exists to safeguard. Per CLAUDE.md\'s Perimenopausal Status guidance, the transition window itself (not just confirmed postmenopausal status) carries elevated stress-urinary-incontinence risk, so this is not a low-stakes unknown. Confirming her actual status is worth doing at the next intake conversation given how load-bearing that determination is for whether the pelvic floor safety callout should be running on every heavy day. Fixed 8/17/2026: both heavy-loading days now carry the written Pelvic Floor Safety Note directly (via `day.forcePelvicFloor: true`, a new engine field for exactly this unconfirmed-but-cautious case), not just verbal coaching cues.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Power Training Added — 55-65 Bracket (8/16/2026)',
    body: 'CLAUDE.md\'s Power Training section places sub-maximal-load, maximal-intent power work in the 55-65 bracket already, not just 65+ — power output declines before strength does, so waiting until 65 is a real cost. Day A, Block D now includes a Trap Bar Jump: a light load well below her tested hinge working weights, moved with maximal intent, full recovery between sets. Full recovery is the defining design feature of power work, distinct from a metabolic stimulus, so it is sequenced before the Conditioning Finisher rather than after it — trained fresh, not stacked onto fatigue. Mary carries no clinical flag ruling out any particular movement, but a lower-body, non-overhead jump pattern was chosen as the more conservative default, consistent with how this same addition was made for her closest bracket-mates on the roster (Siobhan Hansen, Elizabeth Poyner), and because it pairs naturally with the hex bar equipment already in use on this day.',
  },
];

const days = [
  {
    intensity: 80,
    title: 'DAY A — Hinge, Pull & Loaded Carry',
    subtitle: 'Hex Deadlift · Hip Thrust · Row — Posterior Chain Strength Foundation',
    descriptor: 'PRIMARY HINGE & PULL STRENGTH · LOADED CARRY & CORE · CONDITIONING FINISHER · 55–65 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: `Control precedes power: every session opens with hip hinge activation before loading the two biggest hinge lifts in the program. Hex deadlift (${hexDL1RM} lb Epley 1RM off 155 lbs x5) and hip thrust (${hipThrust1RM} lb Epley 1RM off 90 lbs x5) both tested genuinely strong — this day builds directly on that strength while treating the hip-dominant work as a bone-density investment ahead of the 55-65 postmenopausal bracket. Closes with a conditioning finisher, the primary cardiovascular stimulus at 2 days/week.`,
    warmUp: '8 min: 3 min bike or brisk walk (Zone 2). Then: PVC hip hinge drill 2×10, glute bridge 2×15, band pull-apart 2×15, cat-cow 10 slow reps, arm circles 10 each direction.',
    forcePelvicFloor: true, // Menopausal status unconfirmed (see baselineNotes) — per CLAUDE.md's Perimenopausal Status guidance, a 45-55 bracket client with ambiguous status and real heavy hinge/hip-thrust content should carry this in writing, not rely on verbal-only cueing.
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY HINGE STRENGTH',
        introLabel: `Hex Deadlift & Hip Thrust — Epley 1RM ${hexDL1RM} / ${hipThrust1RM} lbs`,
        intro: `Both lifts tested at 90+ lbs for 5 reps — a genuinely strong starting point. Week 1 trains at 80% of Epley 1RM to lock in hip hinge mechanics under real load; by Week 4 both lifts climb to 93% of Epley 1RM, above the originally tested weight.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `Wk1: ${hexDL_wk1} lbs → Wk4: ${hexDL_wk4} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Hinge hips back to grip, drive floor away, hips and shoulders rise together.' },
          { name: 'Hip Thrust (Barbell or Loaded DB, Bench-Supported)', sets: '4', reps: '5–6', load: `Wk1: ${hipThrust_wk1} lbs → Wk4: ${hipThrust_wk4} lbs`, tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, drive hips to full extension, squeeze glutes hard at top. Bone-density investment.' },
          { name: 'Face Pull (Cable or Band)', sets: '3', reps: '15–20', load: 'Light–Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows at ear height, external rotation at end range. Shoulder health, balances pressing.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PULL STRENGTH & PRESS ACCESSORY',
        introLabel: `Single-Arm Row — Epley 1RM ${row1RM} lbs`,
        intro: 'Single-arm row tested at 30 lbs for 5 reps and climbs from there; single-leg RDL sits next, breaking up the pulling volume with a hinge-pattern movement, before bent-over bilateral row rounds out the pulling volume, balancing the pressing work on Day B. Incline Dumbbell Press was not part of the initial testing battery — it closes the block as a new horizontal-press baseline, established this week at a conservative technique-first load.',
        exercises: [
          { name: 'Single-Arm DB Row', sets: '4', reps: '8', load: `Wk1: ${row_wk1} lbs → Wk4: ${row_wk4} lbs`, tempo: '3-1-2', rest: '60s', cue: 'Bench-supported, flat back. Drive elbow to hip, full stretch at bottom.' },
          { name: 'Single-Leg RDL (DB)', sets: '3+3', reps: '8–10 ea', load: '20 lbs → 25 lbs', tempo: '3-1-1', rest: '75s', cue: 'LEFT leg leads every set — lower leg LST (14.6 vs 15.1 lbs), asymmetry-protocol trigger at exactly 0.5 lb gap.' },
          { name: 'Bent-Over DB Row (Both Arms)', sets: '3', reps: '10', load: '20–25 lbs/hand', tempo: '2-1-2', rest: '60s', cue: 'Hip hinge, flat back, pull both DBs to ribs together. Bilateral pulling volume.' },
          { name: 'Incline Dumbbell Press', sets: '3', reps: '8', load: 'Wk1: 20 lbs/hand → Wk4: 25 lbs/hand', tempo: '2-1-2', rest: '75s', flag: 'Not tested — establishing baseline this week', cue: 'Bench ~30°, elbows ~45°, controlled descent to full stretch.' },
        ],
      },
      {
        letter: 'C',
        title: 'LOADED CARRY + CORE',
        introLabel: 'Farmer Carry & Plank Baseline — 25 lbs/Hand · 2:03 Hold',
        intro: 'A 2:03 plank hold is exceptional — well past the 60-second ICONS threshold. Carries build the deep spinal stabilizer strength (multifidus, QL) that supports posture under all the compound lifts above. Both are descriptive/reference loads, not 1RM-calculated.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '4', reps: '25–30 yds', load: 'Wk1: 25 lbs/hand → +5 lbs every 2 wks', tempo: 'Controlled', rest: '90s', cue: 'Shoulders packed, chest tall, neutral neck. Add 5 lbs per hand every 2 weeks.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: '1:45', load: 'Bodyweight', tempo: '—', rest: '90s', cue: 'Exceptional baseline 2:03. Hold at 1:45 in training — quality over max time. Wk4: 2:00+ loaded.' },
          { name: 'Pallof Press (Anti-Rotation)', sets: '3', reps: '10 ea side', load: 'Light–Mod band', tempo: '2-2-1', rest: '45s', cue: 'Press straight out from chest, resist the band pulling you into rotation.' },
        ],
      },
      {
        letter: 'D',
        title: 'POWER TRAINING — LOWER BODY (55-65 BRACKET)',
        introLabel: 'Why',
        intro: 'Muscle power — moving a sub-maximal load with maximal intent — predicts functional independence and longevity more strongly than strength alone, and belongs in the 55-65 bracket already, not just 65+. Light load relative to her tested hex deadlift working weights; full recovery between sets is the point — this is a velocity stimulus, not a conditioning one, so it is trained fresh, before the conditioning finisher below, not after it.',
        exercises: [
          { name: 'Trap Bar Jump (Light Load, Full Recovery)', sets: '3', reps: '3', load: '30–40 lbs (empty-to-light trap bar)', tempo: 'Explosive up, soft controlled landing', rest: '120s', cue: 'Drive up with real intent through ankle, knee, hip. Land soft. Full recovery — not a metabolic set.' },
        ],
      },
      {
        letter: 'E',
        title: 'CONDITIONING FINISHER (CHOOSE ONE)',
        color: 'gold',
        introLabel: 'Conditioning Protocol — Sled Push Baseline 45 lbs',
        intro: 'Sled push tested at 45 lbs — a reference/descriptive load, not a 1RM-tested movement. At 2 days/week, this finisher is the primary cardiovascular stimulus of the session — not optional.',
        exercises: [
          { name: 'Sled Push (Loaded)', sets: '4', reps: '20–25 yds', load: 'Wk1: 45 lbs → progress distance/resistance weekly', tempo: 'Drive, controlled', rest: '90s', cue: 'Low shin angle, drive through the balls of the feet, arms locked. Reference load — no 1RM math.' },
          { name: 'Stationary Bike — HIIT (Alt. Option)', sets: '8', reps: '20s hard / 40s easy', load: 'High resistance', tempo: 'Hard then easy', rest: '40s', cue: '20 seconds maximum effort, 40 seconds easy spin, 8 rounds. Substitute for sled push if unavailable.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 60s each. Doorway chest stretch 30s each. Lat stretch 30s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'Muscle is the medicine — every set of the hinge and pull work here is a hormonal reset as much as a strength builder. Track load progression weekly; the baseline supports adding weight faster than a typical new client.',
  },
  {
    intensity: 70,
    title: 'DAY B — Squat, Press & Pull-Up Progression',
    subtitle: 'Back Squat · Split Stance Squat · Bench Press · Pull-Up — Lower & Upper Strength Build',
    descriptor: 'PRIMARY LOWER & PRESS STRENGTH · PULL-UP PROGRESSION · METABOLIC FINISHER · 55–65 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Strength builds confidence: this day builds moderate volume across the squat, press, and pull-up patterns without stacking peak fatigue on top of Day A\'s heavier hinge work. Close-grip pull-up leads every session as the strongest and most shoulder-friendly of the three grips tested.',
    warmUp: '8 min: 3 min bike or treadmill walk (Zone 2). Then: glute bridge 2×15, goblet squat 2×10 light (depth focus), dead hang 20 seconds (shoulder decompression), band pull-apart 2×15, ankle circles 10 each.',
    forcePelvicFloor: true, // Same rationale as Day A — heavy squat/split-squat content, menopausal status unconfirmed.
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY LOWER — SQUAT, SPLIT SQUAT & LUNGE',
        introLabel: `Back Squat & Split Stance Squat — Epley 1RM ${backSquat1RM} / ${splitSquat1RM} lbs`,
        intro: `Back squat tested at 90 lbs for 5 reps; split stance DB squat tested at 17.5 lbs/hand for 5 reps. LEFT leg leads every unilateral exercise here — legs sit exactly at the 0.5 lb asymmetry-protocol trigger (14.6 vs 15.1 lbs). DB Reverse Lunge was not part of the initial testing battery — it closes the block as a new baseline, LEFT-led per the same asymmetry finding.`,
        exercises: [
          { name: 'Back Squat (Barbell or Loaded)', sets: '4', reps: '5–6', load: `Wk1: ${backSquat_wk1} lbs → Wk4: ${backSquat_wk4} lbs`, tempo: '3-1-1', rest: '90s', cue: 'Full depth, chest tall, drive knees out. Brace before descent, exhale on the drive up.' },
          { name: 'Split Stance Squat (DB) — LEFT Leads', sets: '3+3', reps: '8 ea', load: `Wk1: ${splitSquat_wk1} lbs/hand → Wk4: ${splitSquat_wk4} lbs/hand`, tempo: '2-1-1', rest: '75s', cue: 'LEFT (weaker) leg trains first every set. Rear foot elevated optional. Front knee tracks over toes.' },
          { name: 'DB Lateral Raise', sets: '3', reps: '12–15', load: '8–10 lbs', tempo: '2-1-2', rest: '30s', cue: 'Arms slightly bent. Raise to shoulder height, 1-second hold at top, slow 2-second lower.' },
          { name: 'DB Reverse Lunge — LEFT Leads', sets: '3+3', reps: '8 ea', load: 'Wk1: 15 lbs/hand → Wk4: 20 lbs/hand', tempo: '2-1-1', rest: '75s', flag: 'Not tested — establishing baseline this week', cue: 'LEFT (weaker) leg trains first. Step back, knee tracks over mid-foot, drive through front heel.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PRESS + PULL-UP PROGRESSION',
        introLabel: `Bench Press & Pull-Up Baseline — Epley 1RM ${bench1RM} lbs / 5 Reps Each Grip`,
        intro: 'Bench press tested at 65 lbs for 5 reps. Seated Overhead Press was not part of the initial testing battery and closes the pressing pair as a new vertical-press baseline, established this week at a conservative technique-first load. Five clean reps per grip on assisted pull-ups (close, standard, wide) is a strong starting point — close grip leads every session as the least shoulder strain and easiest to add volume to first.',
        exercises: [
          { name: 'Bench Press (Barbell or DB)', sets: '4', reps: '6–8', load: `Wk1: ${bench_wk1} lbs → Wk4: ${bench_wk4} lbs`, tempo: '2-1-1', rest: '90s', cue: 'Shoulder blades set, feet planted, controlled descent to chest, drive up without bouncing.' },
          { name: 'Seated DB Overhead Press', sets: '3', reps: '8', load: 'Wk1: 15 lbs/hand → Wk4: 20 lbs/hand', tempo: '2-0-2', rest: '75s', flag: 'Not tested — establishing baseline this week', cue: 'Ribs stacked over hips, press straight overhead, no lean-back.' },
          { name: 'Assisted Pull-Up — Close Grip', sets: '3', reps: '5–6', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'LEADS every session. Full hang at bottom, chin over bar at top, controlled 3-second descent.' },
          { name: 'Assisted Pull-Up — Standard Grip', sets: '3', reps: '5–6', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'Standard overhand grip, shoulder-width. Same quality as close grip.' },
          { name: 'Assisted Pull-Up — Wide Grip', sets: '3', reps: '5–6', load: 'Assist level set', tempo: '3-1-2', rest: '75s', cue: 'Wide overhand grip — greatest lat stretch at bottom, hardest of the three. Full range, no partial reps.' },
          { name: 'Step-Up (Unilateral, DB) — LEFT Leads', sets: '3+3', reps: '8 ea', load: '15–20 lbs/hand', tempo: '2-1-1', rest: '60s', cue: 'LEFT leads. 18–20 inch box. Drive through front heel, full hip extension at top.' },
        ],
      },
      {
        letter: 'C',
        title: 'PUSH-UP PROGRESSION',
        color: 'green',
        introLabel: 'Push-Up Baseline — 10 Reps Incline',
        intro: 'Ten reps on an incline is a solid bridge point toward full floor push-ups. Week 1 continues building incline volume while starting the first full-floor attempts.',
        exercises: [
          { name: 'Incline Push-Up (Hands Elevated)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Baseline 10 reps. Hands on bench or box, full chest to bench level, controlled descent.' },
          { name: 'Full Push-Up (Floor Attempt)', sets: '3', reps: 'Max (target 5–7)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Attempt full push-ups, stop 2 reps before form breaks. Neutral spine throughout.' },
          { name: 'Tricep Dip (Bench)', sets: '3', reps: '10–12', load: 'Bodyweight', tempo: '3-0-1', rest: '45s', cue: 'Hands on bench behind body, lower until elbows reach 90°, drive back up.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC CONDITIONING CIRCUIT — 3 ROUNDS',
        color: 'gold',
        introLabel: 'Cardio Protocol',
        intro: "Day B's cardiovascular work is a metabolic circuit rather than dedicated cardio — the strength-plus-conditioning combination most effective for body composition at 2 days/week. After 3 rounds: 10-minute finisher — stationary bike easy spin, treadmill Zone 2 walk, or rowing machine easy pace.",
        exercises: [
          { name: 'Goblet Squat (Light, Continuous)', sets: '3 rounds', reps: '15', load: '20–25 lbs', tempo: '2-0-1', rest: '15s then next', cue: 'Sub-maximal load, continuous reps. Focus is metabolic — keep moving into the next exercise.' },
          { name: 'DB Row (Both Arms, Bent Over)', sets: '3 rounds', reps: '12', load: '20–25 lbs', tempo: '2-1-2', rest: '15s then next', cue: 'Hip hinge, pull both DBs to ribs. Lighter than Day A primary row — metabolic pull volume.' },
          { name: 'Push-Up (Max or Incline)', sets: '3 rounds', reps: 'Max', load: 'Bodyweight', tempo: '3-0-1', rest: '15s then next', cue: 'Full or incline — whatever allows quality reps. Stop 1 rep before form breaks.' },
          { name: 'Plank Hold', sets: '3 rounds', reps: '45–60s', load: 'Bodyweight', tempo: '—', rest: '90s rest', cue: 'Full brace. Rest 90 seconds after plank, then begin next round. 3 full rounds of the complete circuit.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 10 slow reps. Doorway chest stretch 30s each. Hip flexor lunge 60s each.',
    iconsNote: "Energy becomes identity — this is the session's finish, and it should feel unstoppable, not depleting. Track how many circuit rounds complete with good form each week as a conditioning marker alongside the strength numbers above.",
  },
];

const baselines = [
  ['Hex Bar Deadlift', '155 lbs', '5 RM', `Epley 1RM ${hexDL1RM} lbs. Wk1: ${hexDL_wk1} lbs ×5 → Wk4: ${hexDL_wk4} lbs ×5.`],
  ['Back Squat', '90 lbs', '5 RM', `Epley 1RM ${backSquat1RM} lbs. Wk1: ${backSquat_wk1} lbs ×5–6 → Wk4: ${backSquat_wk4} lbs ×5–6.`],
  ['Hip Thrust', '90 lbs', '5 RM', `Epley 1RM ${hipThrust1RM} lbs. Wk1: ${hipThrust_wk1} lbs ×5–6 → Wk4: ${hipThrust_wk4} lbs ×5–6. Hip-dominant bone investment.`],
  ['Bench Press', '65 lbs', '5 RM', `Epley 1RM ${bench1RM} lbs. Wk1: ${bench_wk1} lbs ×6–8 → Wk4: ${bench_wk4} lbs ×6–8.`],
  ['Split Stance Squat (DB)', '17.5 lbs / hand', '5 RM', `Epley 1RM ${splitSquat1RM} lbs. Wk1: ${splitSquat_wk1} lbs/hand ×8 → Wk4: ${splitSquat_wk4} lbs/hand ×8. LEFT leg leads.`],
  ['Single-Arm DB Row', '30 lbs', '5 RM', `Epley 1RM ${row1RM} lbs. Wk1: ${row_wk1} lbs ×8 → Wk4: ${row_wk4} lbs ×8.`],
  ['Sled Push', '45 lbs', 'Working', 'Reference load — not a 1RM-tested movement. Progress distance/resistance week to week.'],
  ['Farmer Carry', '25 lbs / hand', 'Working', 'Wk1: 25 lbs/hand ×4 sets → +5 lbs/hand every 2 weeks → Wk4: 30–35 lbs/hand.'],
  ['Plank (Elbow)', '2:03', 'Max', 'Exceptional — well above the 60-second ICONS threshold. Hold at 1:45 in training → Wk4: 2:00+ loaded.'],
  ['Incline Push-Up', '10 reps', 'Max', 'Wk1: 10–12 reps, begin floor attempts → Wk4: 5–7 full push-ups.'],
  ['Assisted Pull-Up (all grips)', '5 reps each', 'Close-Grip / Standard / Wide', 'Wk1: all 3 grips ×5 → Wk4: ×6–7. Close grip leads (most shoulder-friendly).'],
  ['Seated DB Overhead Press', 'Not Tested', 'Working', 'Wk1: 15 lbs/hand ×8 — new baseline established this week. Target 20 lbs/hand ×8 by Wk4.'],
  ['Incline Dumbbell Press', 'Not Tested', 'Working', 'Wk1: 20 lbs/hand ×8 — new baseline established this week. Target 25 lbs/hand ×8 by Wk4.'],
  ['DB Reverse Lunge', 'Not Tested', 'Working', 'Wk1: 15 lbs/hand ×8/side — new baseline established this week. Target 20 lbs/hand by Wk4. LEFT leg leads.'],
];

const summary = {
  subtitle: 'Mary Burfete  ·  ICONS Index  ·  Strength & Bone Density Foundation  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['Wk 1', '—', 'Day A & B', `Hex DL ${hexDL_wk1} lbs ×5 / Hip Thrust ${hipThrust_wk1} lbs ×5–6 / Back Squat ${backSquat_wk1} lbs ×5–6 / Bench ${bench_wk1} lbs ×6–8`, 'Establish all working loads. LEFT leg leads split stance squat, step-up, single-leg RDL. Plank: 1:45. Pull-up: 5 reps all grips.'],
    ['Wk 2', '—', 'Day A & B', 'Hex DL +5–10 lbs / Hip Thrust +5–10 lbs / Back Squat +5 lbs / Bench +2.5–5 lbs', 'Pull-up: 6 reps all grips. Push-up: 6 floor reps. Plank: 1:50.'],
    ['Wk 3', '—', 'Day A & B', 'Hex DL approaching tested baseline / Hip Thrust at tested baseline / Back Squat above baseline', 'Push-up: 6–7 floor reps. Plank: 1:55.'],
    ['Wk 4', '—', 'Day A & B', `Hex DL ${hexDL_wk4} lbs ×5 / Hip Thrust ${hipThrust_wk4} lbs ×5–6 / Back Squat ${backSquat_wk4} lbs ×5–6 / Bench ${bench_wk4} lbs ×6–8`, 'All baseline lifts surpassed. Push-up: 7 full unassisted. Plank: 2:00+ loaded. Reassess pull-up assist level.'],
  ],
  milestones4wk: 'All baseline lifts surpassed. Push-up: 7 full unassisted. Plank: 2:00+ loaded. Pull-up assist level reduced across all 3 grips. Seated Overhead Press progressing from 15 toward 20 lbs/hand; Incline Dumbbell Press from 20 toward 25 lbs/hand; DB Reverse Lunge from 15 toward 20 lbs/hand (LEFT leads) — all three newly established this week.',
  milestones8wk: `Strength: Hex DL ${hexDL_wk4 + 15}+ lbs ×5. Hip Thrust ${hipThrust_wk4 + 10}+ lbs ×5–6. Back Squat ${backSquat_wk4 + 10}+ lbs ×5–6. Bench ${bench_wk4 + 5}+ lbs ×6–8. Row ${row_wk4 + 5}+ lbs ×8. Split Stance Squat ${splitSquat_wk4 + 5}+ lbs/hand ×8. Sled Push distance/resistance increased. Push-up 10+ full unassisted. Pull-up 8+ reps all grips, next assist-level reduction. Plank 2:15+ loaded.`,
  rescanNote: 'Styku rescan recommended at 8 weeks — track ALST Index closely given the current 5.52 kg/m² reading sits only 0.02 kg/m² above the At-Risk cutoff (do not assume it stays clear of the threshold without confirming; ALST is tracked as a trend metric, not a graded score), VFA trend (currently 62.0 cm² — track as a trend rather than a risk-band label), and the leg segmental gap (currently exactly 0.5 lbs, at the asymmetry-protocol trigger — should trend down with the LEFT-leads unilateral protocol). Also worth revisiting at next intake: confirming actual menopausal status, given its direct relevance to the pelvic floor protocol on this program\'s heavy hinge/squat days.',
};

const data = {
  client,
  styku,
  baselines,
  baselinesTargetHeader: 'TRAINING LOAD · 4-WEEK TARGET',
  baselineNotes,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'mary_burfete');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Mary_Burfete_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — no clientHighlight set: this is a
  // first-build program with no prior version/PR on file to compare
  // against, so per CLAUDE.md's Client View spec, nothing is fabricated.
  // (Her baseline battery is strong, but these are first-ever tested
  // numbers, not a documented improvement over a prior program version.)
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Mary_Burfete_2Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);

  console.log('Computed working loads:', {
    hexDL1RM, hexDL_wk1, hexDL_wk4,
    backSquat1RM, backSquat_wk1, backSquat_wk4,
    hipThrust1RM, hipThrust_wk1, hipThrust_wk4,
    bench1RM, bench_wk1, bench_wk4,
    splitSquat1RM, splitSquat_wk1, splitSquat_wk4,
    row1RM, row_wk1, row_wk4,
    legLead,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
