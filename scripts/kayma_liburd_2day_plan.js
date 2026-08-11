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
 *     a real intake value. Because she's confirmed in her 40s regardless of
 *     exactly where, the 40+ protein tier (1.8-2.0 g/kg) would apply either
 *     way once real weight data exists — noted for the future revision.
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
    body: 'Known cardiac condition on file. Heart rate must not exceed 160 bpm at any point during training. Wear a heart-rate monitor every session, and check it explicitly during every conditioning/metabolic block (flagged inline in each day\'s Block D below) — not just at the end of a set. This program proceeds under physician/cardiologist clearance and coordination, the same posture this system already uses for PT-coordinated clinical flags: this is an operating constraint, not a diagnosis. Stop signal: chest pain, dizziness, shortness of breath disproportionate to effort, or an HR monitor reading above 160 bpm is a hard stop for that set or session — flag your coach immediately, do not push through to finish a set or round.',
  },
  {
    type: 'gold',
    label: 'Age Bracket — 44 Years Is a Working Figure, Not Confirmed',
    body: 'Kayma\'s trainer confirmed she is in her 40s but did not supply an exact age. 44 is used here as a working figure, positioned at the boundary of CLAUDE.md\'s 35-45 "Transition Onset" and 45-55 "Perimenopause/Menopause Transition" brackets — treat the bracket-specific detail (LIFTMOR bone-loading candidacy screening, perimenopausal symptom monitoring) as provisional until her actual age is confirmed. What does not depend on resolving this: since she is confirmed in her 40s regardless of exactly where, the 40+ protein tier (1.8-2.0 g/kg/day) will apply once real weight data exists, whichever side of 44 she actually falls on.',
  },
  {
    type: 'gold',
    label: 'Intake Gap — No Styku Scan, Weigh-In, or Baseline Battery on File',
    body: 'No Styku body-composition scan and no weight are on file, so protein/creatine targets and full clinical interpretation (ALST, VFA, BMI) are not calculated here — inventing them from an assumed weight would be fabrication, not programming. No tested strength battery (1RM/5RM) is on file either, so every load below is a descriptive band ("Heavy," "Moderate-Heavy," a working range in lbs/hand) rather than a percentage of a real number. Recommend running the standard 11-exercise ICONS Baseline Testing Protocol at her next session, alongside a Styku scan and weigh-in, so this document can be revised from descriptive to numeric prescriptions using epley1RM()/workingLoad() off real data.',
  },
  {
    type: 'teal',
    label: 'Perimenopausal Status — Not Assessed, isPostmenopausal Left False',
    body: 'No menstrual irregularity, vasomotor symptoms (hot flashes/night sweats), sleep disruption, or mood-change data was reported at intake. Per CLAUDE.md\'s "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" guidance, treating an unconfirmed 45-55-bracket client as pelvic-floor-cautious by default applies specifically when those symptoms ARE reported — none were reported here, so isPostmenopausal is left false rather than escalated, and the pelvic floor callout correctly does not auto-fire. Revisit this if symptom data becomes available at a future session.',
  },
  {
    type: 'gold',
    label: 'Program Structure — True Full-Body, Advanced, Per Client Request',
    body: 'Built as a genuine 2-day full-body program at Kayma\'s explicit request — both Day A and Day B hit squat, hinge, upper push, upper pull, and core/carry patterns, not a movement-pattern split. Advanced level means no technique/foundation day: both sessions open at real working intensity (80% / 90%) with barbell and heavy-DB compound variations, unilateral single-leg/single-arm work, tempo and paused reps, and supersets. Volume audits to meet or exceed the ACSM/ICONS >=10 sets/muscle/week hypertrophy target across the two sessions for every major pattern (squat/quad, hinge/hamstring-glute, chest, back, direct core work), with shoulders picking up substantial secondary volume from the pressing and dip work even where direct sets land just under 10. RIR 1-2 on all working sets — advanced expresses as load and complexity, never as training to failure.',
  },
];

const days = [
  {
    intensity: 80,
    title: 'DAY A — Full-Body Strength I',
    subtitle: 'Squat, Push & Loaded Carry Emphasis',
    descriptor: 'PRIMARY SQUAT & PUSH STRENGTH · FULL-BODY EVERY SESSION · 60–70 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'Advanced full-body session — no technique day, no foundation ramp: squat, hinge, upper push, upper pull, and loaded carry/core all land in this one session, true to the two-day full-body structure requested. Control precedes power: a short isolated activation block opens every session before compound loading. Working sets run at 1-2 RIR — hard, never to failure. Heart-rate monitor on from warm-up through the closing conditioning block (see cardiac flag above) — the 160 bpm ceiling applies to every block, checked explicitly during Block D.',
    warmUp: 'Heart-rate monitor on before starting. 4-5 min row or bike, easy pace. Then: banded lateral walk 2×10/side, hip circles 10 each direction, thoracic rotation 10/side, scapular push-up 2×10, empty-bar or PVC squat-to-stand 2×8.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Wakes the glute medius and scapular stabilizers and locks in core bracing before any compound load goes on the bar — the neural precision this population needs before loading.',
        exercises: [
          { name: 'Banded Lateral Walk', sets: '2', reps: '12/side', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Band above knees, hips level, no torso lean.' },
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Shoulder height, squeeze shoulder blades, control the return.' },
          { name: 'Dead Bug', sets: '2', reps: '10/side', load: 'Bodyweight', tempo: '3-0-3', rest: '30s', cue: 'Low back pressed flat, slow opposite arm-leg reach.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY SQUAT & HINGE STRENGTH',
        introLabel: 'Load Target',
        intro: 'Heaviest work of the session. Advanced compound variations with tempo control — both squat and hinge patterns loaded every session by design, true full-body.',
        exercises: [
          { name: 'Barbell Back Squat', sets: '4', reps: '6', load: 'Heavy — 1-2 RIR', tempo: '3-2-1', rest: '2 min', cue: 'Brace before descent, 2-count pause at depth, drive floor away.' },
          { name: 'Romanian Deadlift (Barbell)', sets: '4', reps: '6–8', load: 'Heavy — 1-2 RIR', tempo: '3-1-1', rest: '90s', cue: 'Hinge from the hip, bar tracks close, feel hamstring load, stand tall.' },
          { name: 'Bulgarian Split Squat (DB)', sets: '3+3', reps: '8 ea', load: '25–30 lbs/hand', tempo: '2-1-1', rest: '75s', cue: 'Rear foot elevated, front knee tracks over toes, even tempo both legs.' },
        ],
      },
      {
        letter: 'C',
        title: 'PRIMARY PUSH & PULL — SUPERSET',
        introLabel: 'Format',
        intro: 'Paired sets: press then row, 15 seconds between the pair, full rest after. Advanced complexity — heavier press/pull pairing than a foundation-day program would use.',
        exercises: [
          { name: 'Incline DB Bench Press (Paired A1)', sets: '5', reps: '6–8', load: 'Heavy DB', tempo: '3-1-1', rest: '15s → A2', cue: 'Elbows ~45°, full stretch at bottom, press to lockout.' },
          { name: 'Single-Arm DB Row (Paired A2)', sets: '5', reps: '8/side', load: 'Heavy DB', tempo: '2-1-2', rest: '90s after pair', cue: 'Bench-supported, flat back, drive elbow to hip, full stretch at bottom.' },
          { name: 'Standing Barbell Overhead Press (Paired B1)', sets: '4', reps: '6', load: 'Moderate-Heavy', tempo: '2-1-1', rest: '15s → B2', cue: 'Ribs down, brace hard, press straight overhead.', rirNote: '1-2 RIR' },
          { name: 'Weighted Pull-Up or Lat Pulldown (Paired B2)', sets: '4', reps: '6–8', load: 'BW + load, or heavy stack', tempo: '3-1-2', rest: '90s after pair', cue: 'Full hang to chin over bar, controlled descent.' },
        ],
      },
      {
        letter: 'D',
        title: 'LOADED CARRY, CORE & CONDITIONING — HR-CAPPED',
        color: 'gold',
        introLabel: 'Cardiac-Safe Format — 160 BPM Ceiling',
        intro: 'Energy becomes identity — the session\'s finish, respecting the 160 bpm cardiac ceiling throughout. Heavy carry work doubles as core and grip loading at a controlled pace; the kettlebell work closes the session at a moderate, HR-monitored pace, not an all-out finisher. Check the HR monitor between every set in this block — ease pace immediately if approaching 160 bpm.',
        exercises: [
          { name: 'Suitcase Carry (Single-Side, Heavy DB)', sets: '3+3', reps: '30 yds ea', load: '40–50 lbs', tempo: 'Controlled', rest: '60s', cue: 'Resist lateral lean, tall posture. Check HR monitor before switching sides.' },
          { name: 'Weighted Plank (Plate on Back)', sets: '3', reps: '30–45s', load: 'Light-Mod plate', tempo: 'Hold', rest: '45s', cue: 'Full brace, ribs down, no sag or pike. Isometric — minimal HR load.' },
          { name: 'Kettlebell Swing (Two-Hand, Moderate Pace)', sets: '3', reps: '12', load: 'Moderate KB', tempo: 'Controlled — not max effort', rest: '60s', cue: 'Hip hinge back, steady controlled pace. Check HR monitor after each set; stop the set early if approaching 160 bpm.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge 60s each. Doorway chest stretch 30s each. Lat stretch 30s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'Cardiac flag reminder: heart rate must stay under 160 bpm the entire session, monitor worn throughout, checked explicitly during Block D. Chest pain, dizziness, shortness of breath disproportionate to effort, or a monitor reading above 160 bpm is a hard stop for that set or the session — flag your coach immediately. On the strength side: advanced loading is about complexity and load, not grinding to failure — every working set here stays at 1-2 RIR. Log load and RIR every set; this becomes the numeric baseline once a Styku scan and formal battery are on file.',
  },
  {
    intensity: 90,
    title: 'DAY B — Full-Body Strength II',
    subtitle: 'Hinge, Pull & Peak Intensity Emphasis',
    descriptor: 'PRIMARY HINGE & PULL STRENGTH · NEAR-MAXIMAL LOADS · FULL RECOVERY BETWEEN SETS · 60–70 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Peak-intensity full-body session — near-maximal loads on the week\'s heaviest hinge and pull work, with full recovery between strength sets, no near-failure grinding. Same full-body structure as Day A: squat, hinge, push, pull, and core/carry all present, sequenced hinge-and-pull-forward this session for balanced weekly emphasis. IMPORTANT: "peak intensity" here describes the resistance-training loads only — the closing conditioning block is deliberately capped well below an all-out effort per the 160 bpm cardiac ceiling (see cardiac flag above); the strength side of advanced programming is not restricted by that ceiling, only the sustained-conditioning side is.',
    warmUp: 'Heart-rate monitor on before starting. 4-5 min row or bike, easy pace. Then: glute bridge march 2×10/side, face pull 2×15 light, thoracic rotation 10/side, PVC hip hinge drill 2×10, dead hang 20s for shoulder decompression.',
    blocks: [
      {
        letter: 'A',
        title: 'CONTROL & ALIGNMENT',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Primes the hip hinge pattern and posterior shoulder before the day\'s heaviest lifts, and locks in anti-rotation core control ahead of the loaded carry.',
        exercises: [
          { name: 'Glute Bridge March', sets: '2', reps: '10/side', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Pelvis level throughout, no rock side to side.' },
          { name: 'Face Pull (Band or Cable)', sets: '2', reps: '15', load: 'Light band', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows high, external rotation at end range.' },
          { name: 'Pallof Press (Anti-Rotation)', sets: '2', reps: '10/side', load: 'Light-Mod band', tempo: '2-2-1', rest: '30s', cue: 'Press straight out from chest, resist rotation toward the band.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY HINGE & SQUAT — PEAK LOADS',
        introLabel: 'Load Target',
        intro: 'The week\'s heaviest resistance work. Full recovery between every set — near-maximal loading, not fatigue accumulation. Advanced complexity: paused unilateral lunge and a peak-week trap bar pull. This block is not affected by the cardiac ceiling the way conditioning is — controlled heavy sets with full rest between them do not sustain HR the way continuous circuit work does — but the HR monitor stays on throughout regardless.',
        exercises: [
          { name: 'Trap Bar Deadlift', sets: '4', reps: '5', load: 'Heavy — near-maximal, 1 RIR', tempo: '2-0-1', rest: '2 min', cue: 'Neutral spine, symmetric setup, drive floor away hard.' },
          { name: 'Barbell Hip Thrust', sets: '4', reps: '6–8', load: 'Heavy — 1-2 RIR', tempo: '2-1-2', rest: '90s', cue: 'Upper back on bench, full hip lockout, squeeze glutes hard at top.' },
          { name: 'Front Rack Reverse Lunge (DB or BB)', sets: '3+3', reps: '6 ea', load: 'Moderate-Heavy', tempo: '3-1-1, 1s pause at bottom', rest: '75s', cue: 'Step back with control, front knee tracks over toes, pause at depth.' },
        ],
      },
      {
        letter: 'C',
        title: 'PRIMARY PULL & PUSH — SUPERSET',
        introLabel: 'Format',
        intro: 'Pull leads this session — paired sets, 15 seconds between the pair, full rest after. Heaviest pulling and pressing complexity of the week.',
        exercises: [
          { name: 'Weighted Pull-Up or Chin-Up (Paired A1)', sets: '4', reps: '5–6', load: 'BW + load', tempo: '3-1-1', rest: '15s → A2', cue: 'Full hang, chin clears the bar, controlled 3-count descent.' },
          { name: 'Close-Grip Bench Press or Weighted Dip (Paired A2)', sets: '5', reps: '6–8', load: 'Heavy — 1-2 RIR', tempo: '2-1-1', rest: '90s after pair', cue: 'Elbows tucked ~30°, full range, drive to lockout.' },
          { name: 'Bent-Over Barbell Row (Paired B1)', sets: '3', reps: '8', load: 'Heavy', tempo: '2-1-2', rest: '15s → B2', cue: 'Hip hinge, flat back, pull bar to lower ribs.' },
          { name: 'Standing DB Arnold Press (Paired B2)', sets: '4', reps: '8–10', load: 'Moderate', tempo: '2-1-2', rest: '75s after pair', cue: 'Rotate palms in to out through the press, brace throughout.' },
        ],
      },
      {
        letter: 'D',
        title: 'CARRY, CORE & CONDITIONING — HR-CAPPED',
        color: 'gold',
        introLabel: 'Cardiac-Safe Format — 160 BPM Ceiling, Not a HIIT Finisher',
        intro: 'This closing block is deliberately steady-state-adjacent, not a HIIT interval finisher — per the cardiac flag, the ceiling is 160 bpm and there is no all-out or sprint work anywhere in this program. HR monitor checked explicitly between every round; extend the easy portion of any round rather than pushing pace if approaching the ceiling.',
        exercises: [
          { name: 'Farmer Carry (Both Hands, Heavy DB)', sets: '3', reps: '30–40 yds', load: 'Heavy', tempo: 'Controlled', rest: '90s', cue: 'Shoulders packed, chest tall, neutral neck. Check HR monitor before the next set — ease pace if approaching 160 bpm.' },
          { name: 'Bike or Rower — Moderate, HR-Capped Circuit', sets: '4', reps: '1 min moderate pace / 1 min easy', load: 'Moderate effort — never max', tempo: 'Steady, HR-monitored', rest: '—', cue: 'Moderate effort only, no sprinting. Check HR monitor every round; if near 160 bpm, extend the easy minute before continuing.' },
          { name: 'Hanging Leg Raise (or Weighted Plank)', sets: '3', reps: '10–12 or 45s', load: 'Bodyweight', tempo: 'Controlled', rest: '45s', cue: 'No swing, control the lower, full brace throughout. Low HR demand — a safe close to the session.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 10 slow reps. Hip flexor lunge 60s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'Cardiac flag reminder: heart rate must stay under 160 bpm the entire session, monitor worn throughout, checked explicitly during Block D\'s bike/rower circuit and between carry sets. Chest pain, dizziness, shortness of breath disproportionate to effort, or a monitor reading above 160 bpm is a hard stop for that set or the session — flag your coach immediately. On the strength side: near-maximal does not mean near-failure — every top set here still leaves 1 rep in reserve. Full recovery between the heaviest sets is what makes the load legitimate; rushing rest defeats the purpose of a peak-intensity day.',
  },
];

const summary = {
  subtitle: 'Kayma Liburd  ·  ICONS Index  ·  True Full-Body Advanced Build  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['A', '80%', 'Full-Body — Squat & Push Emphasis', 'Barbell Back Squat / Incline DB Bench Press', 'Add load when the top set hits 2 RIR at target reps with clean form. Log every set — this becomes the numeric baseline once a Styku scan and battery are on file. Cardiac ceiling (160 bpm) applies to Block D only.'],
    ['B', '90%', 'Full-Body — Hinge & Pull Emphasis, Peak Intensity', 'Trap Bar Deadlift / Weighted Pull-Up', 'Same RIR-based rule at peak intensity — full recovery, never grind. Block D stays HR-capped, moderate effort. Prioritize completing the ICONS Baseline Testing Protocol before Week 3 to convert descriptive loads to tested numbers.'],
  ],
  milestones4wk: 'Complete the Styku scan and full 11-exercise ICONS Baseline Testing Protocol within the first 2-4 weeks, under continued physician/cardiologist coordination given the cardiac flag — this converts every descriptive load band above into a numeric working weight and unlocks proteinTargets()/full clinical interpretation (ALST, VFA, BMI). Until then, track RIR and load progression qualitatively — add weight only when the prescribed reps land at 1-2 RIR with clean form. Confirm the HR monitor has not read above 160 bpm in any session; if it has, flag for a programming review before continuing.',
  milestones8wk: 'With scan and battery data on file, rebuild this plan\'s LOAD column using epley1RM()/workingLoad() off real 1RM numbers, and add the evidence-based nutrition block (protein/creatine targets) once weight is known. Reassess whether 44 remains an accurate placeholder age or should be corrected against her actual age. Re-confirm cardiac clearance/coordination status before increasing conditioning-block duration or intensity beyond what is prescribed here.',
  rescanNote: 'No prior Styku scan exists for this client, so there is no 8-week "rescan" in the usual sense — this is the baseline scan. Recommend scheduling it at her next session per the ICONS Baseline Testing Protocol; results should be used to revise this document from descriptive to numeric prescriptions. Cardiac status/HR-ceiling clearance should be reconfirmed with her physician/cardiologist at or before this session, not assumed to carry forward indefinitely without check-in.',
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
  const buffer = await buildDocument(data);
  const outDir = path.join(__dirname, '..', 'clients', 'kayma_liburd');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Kayma_Liburd_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
