/**
 * Nick — ICONS 3-Day Training Plan
 * Brace Life Studios · Trainer Development / In-House Athlete Roster
 *
 * Built from Nick's real tested baselines in `system_documents/ICONS_
 * Baseline_Sheets.docx` / `scripts/icons_baseline_sheets.js` (Level:
 * ADVANCED / ELITE). Companion build to Jah's 3-day plan
 * (`scripts/jah_3day_plan.js`) — Becca, Brodie, and Oscar's 3-day programs
 * are being built separately and are NOT touched here.
 *
 * REVISION (8/13/2026) — MALE CLIENT PROGRAMMING FRAMEWORK NOW APPLIED,
 * REAL STYKU SCAN ON FILE: Xolokan supplied Nick's first Styku scan
 * (8/13/2026, Brace Life Studios). This document originally carried the
 * "no Styku/age/sex/clinical data" scope note reproduced below (kept for
 * build-history context) because none existed at build time — that is no
 * longer true. Following the exact pattern already used for Vinz Feller's
 * revision (`scripts/vinz_feller_3day_plan.js`), this build now applies:
 *   - Age 25 -> Male Client Programming Framework's "20-39 — Foundation"
 *     bracket: no unique physiological trigger, standard resistance
 *     protocol (ACSM 2026 RIR model) at full intensity, no age-based
 *     protein/creatine escalation yet (CLAUDE.md's "trend toward the upper
 *     end at 40+" is a 40+ judgment call, not applicable at 25).
 *     `testosteroneNote()` correctly returns [] under 40 and is deliberately
 *     NOT included below.
 *   - ALST Index 8.01 kg/m² -> read against EWGSOP2 2018's male cutoff
 *     (<7.0 At-Risk / >=7.0 Not At-Risk, the same source already cited for
 *     Vinz Feller) — comfortably Not At-Risk. No three-tier subdivision
 *     exists for men per CLAUDE.md's documented gap, so no "optimal" label
 *     is invented for how far above the line he sits.
 *   - VFA — the scan's Segmental Analysis tab reports 9.7 cm² (Styku's own
 *     label: "Low Risk"). LANGUAGE CORRECTED 8/17/2026, per CLAUDE.md's
 *     "VFA (Visceral Fat Area) — reframed as trend metric 8/17/2026": the
 *     old absolute risk-band table (<70/70-99/100-149/>=150 cm² -> Very
 *     Low/Low/Moderate/High Risk, previously confirmed sex-independent and
 *     already applied to Vinz Feller) is RETIRED — no consensus body
 *     endorses a single VAT/VFA cutoff, and Styku's own VFA validation was
 *     against DXA in KILOGRAMS, never in cm². This document previously
 *     labeled 9.7 cm² "Very Low Risk" (itself a correction of Styku's own
 *     "Low Risk" dashboard label) — both labels are now retired. 9.7 cm² is
 *     presented purely as a trend/context figure to track at future
 *     rescans, with no risk-band classification attached. NOTE: a separate,
 *     unrelated "Visceral Fat 0.1" figure appears on the scan's Body
 *     Composition summary page in a different, non-cm² scale — the
 *     Segmental Analysis tab's 9.7 cm² figure is the one directly
 *     comparable to CLAUDE.md's table and is the only VFA figure used here;
 *     the 0.1 figure is not repeated or interpreted as VFA anywhere below.
 *   - BMI 21.4 -> squarely WHO Normal (18.5-24.9). Unlike Vinz, this is not
 *     a case needing the muscular-athlete BMI caution — it reads correctly
 *     Normal, not falsely elevated.
 *   - Body Fat % 17.2% -> reads consistently lean/fit under both systems
 *     this file cites: the ACE male table (14-17% Fitness / 18-24%
 *     Acceptable — sits right at that boundary) and Styku's own
 *     Mayo-Clinic-based band (12-20.9% "Fit," where 17.2% sits solidly
 *     inside). No composition-driven protein escalation is warranted the
 *     way Vinz's Obese-tier ACE finding required — `maleBodyFatConcern` is
 *     deliberately left unset below.
 *   - Segmental LST asymmetry — LANGUAGE CORRECTED 8/17/2026, per CLAUDE.md's
 *     "Asymmetry Protocol — trigger corrected 8/17/2026" (old absolute
 *     >=0.5 lb trigger replaced with a relative >=10% trigger): Left Arm
 *     13.6 lbs / Right Arm 13.3 lbs (0.3 lb gap, ~2.2% relative) sits BELOW
 *     the corrected >=10% trigger (also below the old 0.5 lb trigger — no
 *     change here) — noted in the Styku interpretation but the weaker-
 *     side-leads rule is deliberately NOT applied to Single-Arm Row. Left
 *     Leg 23.6 lbs / Right Leg 24.9 lbs (1.3 lb gap, ~5.2% relative).
 *     **FLAGGED DISCREPANCY**: this gap met the OLD 0.5 lb absolute
 *     trigger (this document's original basis for "left leg leads"), but
 *     does NOT clear the corrected >=10% relative trigger. Per this pass's
 *     explicit instructions, the left-leg-leads Split Stance prescription
 *     already programmed into Days 1-2 below is left UNCHANGED pending a
 *     dedicated per-client review — this is a language correction (how the
 *     trigger is described), not a silent resolution of whether the
 *     protocol should still apply. Flagged to the main thread/icons-expert.
 *   - Real protein/creatine targets now come from `maleNutritionNote()` /
 *     `maleProteinTargets()` off `client.weightKg: 77.6` (171 lbs) and
 *     `client.ageYears: 25` — general resistance-trained range
 *     1.6-2.2 g/kg/day, no age-tier escalation at 25.
 * The training program itself (days, blocks, exercise selection, Epley/
 * working-load calculations, Antagonist Rotation sequencing) is UNCHANGED
 * by this revision except for the two Split Stance cue updates noting
 * left-leg-leads.
 *
 * ORIGINAL SCOPE NOTE (context only — superseded by the revision above):
 * No Styku scan, no age, no sex, and no clinical data of any kind exists on
 * file for Nick — the baseline sheet is a pure strength-testing document.
 * Per CLAUDE.md's Demographic Scope Rule, the women's Age Bracket
 * Programming Framework's numeric thresholds are not applied. The Male
 * Client Programming Framework is also NOT applied — its helpers
 * (maleProteinTargets/maleNutritionNote/testosteroneNote) require
 * client.weightKg and client.ageYears, neither of which exists on file;
 * inventing them would be fabrication. `includeNutritionBlock: false` and
 * no age/weight fields are set on `client` below — `proteinBar()` and
 * `pelvicFloorCallout()` correctly never fire. What carries over is the
 * sex/age-neutral ICONS structural philosophy — Isolated -> Compound ->
 * Metabolic, RIR-based autoregulated progressive overload, corrective-
 * before-compound sequencing — mirroring the Jake Poyner/Vinz Feller/
 * Petra/Nancy Avitable precedent.
 *
 * BASELINE ANCHORING & ADVANCED PERIODIZATION (coach note is a direct
 * instruction, not decoration):
 * Nick's coach note reads: "Elite-level baselines across every movement...
 * Programming requires advanced periodization — heavier loads, lower rep
 * ranges, longer rest, velocity-based progression." Concretely, this
 * program departs from the standard literal 60/70/80% load formula used
 * elsewhere in this roster (e.g. Jah's plan) while KEEPING the same
 * 60/70/80% day-badge structure for roster-wide consistency:
 *   - Week 1 working loads below are computed via epley1RM()/workingLoad()
 *     off Nick's tested 5RMs (Hex Bar Deadlift 345x5, Back Squat 275x5,
 *     Single-Arm Row 60x5) at 70/80/88% — deliberately HIGHER than the
 *     60/70/80% actually used for the day badges, so his Day 3 ("80% Day")
 *     load sits at ~88% of estimated 1RM, essentially at or just above his
 *     already-tested 5RM. This is the concrete mechanism for "working loads
 *     closer to true 1RM" while the badge/color framework stays uniform
 *     with the rest of the roster.
 *   - Rep ranges run 3-5 on primary lifts throughout (never the 8-12
 *     hypertrophy range used for the INTERMEDIATE-tier athletes' Isolated/
 *     accessory work).
 *   - Rest periods on every primary lift are 120-180s, well above this
 *     system's standard 30-90s range — directly satisfying the "75-120s+,
 *     not standard 30-75s" instruction.
 *   - A velocity/intent exercise (Trap Bar Jump or Med Ball Slam — a
 *     sub-maximal load moved with maximal intent, full recovery between
 *     sets, per CLAUDE.md's "Power Training" citation language) appears on
 *     all 3 days as a deliberate nod to the periodization his coach note
 *     calls for — not as his whole program, one exercise per day.
 * Farmer Carry and Plank hold the coach's own stated Week 1 numbers/
 * progression directly rather than being re-derived.
 *
 * Nick's two "NOT YET ASSESSED" items ("Split Stance (to assess)" and
 * "Goblet Squat (to assess)") are both introduced on Day 1 as light,
 * technique-focused new baseline-establishing exercises — not skipped.
 * Push-Up (33 reps bodyweight) and Pull-Up (15 reps bodyweight) follow the
 * coach note's own instruction to add external load immediately rather
 * than being re-derived via Epley.
 *
 * ANTAGONIST ROTATION RULE — self-check performed while building: every
 * Compound-zone block below was sequenced so no 3 consecutive exercises
 * load the same primary pattern (knee-dominant/squat, hip-hinge, horizontal
 * push, horizontal pull, vertical push, vertical pull, loaded carry). Two
 * in a row is used deliberately in a couple of places (e.g. Hex Bar
 * Deadlift -> Trap Bar Jump, both hip-hinge/triple-extension pattern) and
 * is compliant — the third exercise in every such block switches pattern.
 * Isolated-zone Block A and the Metabolic-zone carry/core blocks are exempt
 * per the rule's own scope.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad,
  weakerSide, maleNutritionNote, testosteroneNote,
} = require('../icons_template');

// ── Verify Week 1 working loads off Nick's tested baselines ────────────
// Percentages deliberately skewed above the day badges' literal 60/70/80%
// per the advanced-periodization instruction — see header comment.
const oneRM = {
  hbdl: epley1RM(345, 5),    // 403
  squat: epley1RM(275, 5),   // 321
  row: epley1RM(60, 5),      // 70
};

const wk1 = {
  hbdl70: workingLoad(oneRM.hbdl, 0.70),     // 280 (Day 1 — "60% Day" badge)
  row70: workingLoad(oneRM.row, 0.70),       // 50
  squat80: workingLoad(oneRM.squat, 0.80),   // 255 (Day 2 — "70% Day" badge)
  row80: workingLoad(oneRM.row, 0.80),       // 55
  hbdl88: workingLoad(oneRM.hbdl, 0.88),     // 355 (Day 3 — "80% Day" badge)
  squat88: workingLoad(oneRM.squat, 0.88),   // 280
  row88: workingLoad(oneRM.row, 0.88),       // 60 (matches tested 5RM)
};

const client = {
  name: 'Nick',
  programTitle: '3-Day Training Plan',
  subtitle: 'Advanced / Elite — Full-Body Strength Build',
  schedule: '3-Day · In-House Athlete Program',
  stats: ['Age 25', 'Male', "6'3\"", '171 lbs', 'Level: Advanced / Elite', 'Styku Scan 8/13/2026'],
  weightKg: 77.6, // 171 lbs
  ageYears: 25,
  isPostmenopausal: false,
  bmr: 1902,
  alstIndex: 8.01, // Not At-Risk — EWGSOP2 2018 male cutoff <7.0; see Styku interpretation note
};

const styku = {
  scanDate: '8/13/2026',
  bodyFatPct: 17.2,
  bodyFatRank: 'Fit',
  leanMass: 135.3,
  leanMassPct: 79.0,
  fatMass: 29.6,
  boneMass: 6.5,
  bmi: 21.4,
  bmr: 1902,
  vfa: 9.7,
  shapeScore: 95,
  shapeScoreLabel: 'Excellent',
  alstIndex: 8.01,
  leftArmLST: 13.6,
  rightArmLST: 13.3,
  leftLegLST: 23.6,
  rightLegLST: 24.9,
  peerComparison: 'Lower body fat than 94% of men ages 18–29 (6th percentile — Low Risk).',
};

// weakerSide() — lower LST = weaker = leads unilateral work.
// Corrected 8/17/2026: trigger language recomputed as a relative % gap
// (CLAUDE.md's corrected >=10% relative standard) rather than the old
// absolute >=0.5 lb figure. Arm gap ~2.2% relative (below both standards).
// Leg gap ~5.2% relative — met the OLD 0.5 lb trigger but does NOT clear
// the corrected >=10% trigger; flagged discrepancy, see header comment —
// the left-leg-leads Split Stance prescription is left unchanged pending
// per-client review.
const armWeakerSide = weakerSide(styku.leftArmLST, styku.rightArmLST); // 'right' — 0.3 lb gap (~2.2% relative), below the corrected >=10% trigger
const legWeakerSide = weakerSide(styku.leftLegLST, styku.rightLegLST); // 'left' — 1.3 lb gap (~5.2% relative) — met old 0.5 lb trigger, does NOT meet corrected >=10% trigger (flagged discrepancy)

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Hinge & New Baselines\nNeural Priming' },
  { day: 'DAY 2', intensity: 70, focus: 'Compound Squat & Press\nElite Volume' },
  { day: 'DAY 3', intensity: 80, focus: 'Peak Hinge, Squat & Carry\nLongest Rest of the Week' },
];

const baselines = [
  ['Plank (Elbow)', '3:00', 'Baseline Intake', '3:00 loaded (25 lb plate)'],
  ['Push-Up', '33 reps (max)', 'Baseline Intake', 'Weighted — 20+ reps'],
  ['Hex Bar Deadlift', '345 lbs x 5 (5RM)', 'Baseline Intake', '380–400 lbs'],
  ['Single-Arm Row', '60 lbs x 5 (5RM)', 'Baseline Intake', '72.5–75 lbs'],
  ['Pull-Up (Full)', '15 reps (max)', 'Baseline Intake', 'Weighted +25 lbs — 6+ reps'],
  ['Farmer Carry', '205 lbs / hand — Hex Bar (working)', 'Baseline Intake', '225+ lbs / hand'],
  ['Back Squat', '275 lbs x 5 (5RM)', 'Baseline Intake', '295–315 lbs'],
];

const baselineNotes = [
  {
    type: 'gold',
    label: 'Coach Note — Baseline Intake',
    body: 'Elite-level baselines across every movement. 345 lb hex bar deadlift, 275 lb back squat, 60 lb single-arm row, 205 lb farmer carry, 15 pull-ups. Programming requires advanced periodization — heavier loads, lower rep ranges, longer rest, velocity-based progression.',
  },
  {
    type: 'teal',
    label: 'Styku Scan Interpretation — Male Client Programming Framework (8/13/2026)',
    body: `Lean Mass ${styku.leanMass} lbs (${styku.leanMassPct}%), Fat Mass ${styku.fatMass} lbs, Bone Mass ${styku.boneMass} lbs, BMR ${styku.bmr} cal/day, Shape Score ${styku.shapeScore}/100 — Excellent. ALST Index ${styku.alstIndex} kg/m² — EWGSOP2 2018's male low-muscle-mass cutoff is <7.0 kg/m² AT-RISK / ≥7.0 kg/m² Not At-Risk (the same source already used for Vinz Feller); Nick sits comfortably above the line. VFA ${styku.vfa} cm² (Segmental Analysis tab; a separate "Visceral Fat 0.1" figure on the Body Composition summary page is a different, non-cm² metric and is not used here) — presented as a trend/context figure to track over time rather than a risk-band label; CLAUDE.md's prior absolute VFA risk-band table (which this document previously cited to label this reading "Very Low Risk," itself a correction of Styku's own "Low Risk" dashboard label) was retired 8/17/2026 as unsupported by consensus guidance and by this scanner's own validation limits (Styku's VFA output was validated against DXA in kilograms, never in cm²). BMI ${styku.bmi} falls in the WHO Normal range (18.5–24.9) and reads correctly here — no muscular-athlete BMI caution needed. Body Fat ${styku.bodyFatPct}% reads lean under both systems this file cites: the ACE male table (14–17% Fitness / 18–24% Acceptable — sits right at that boundary) and Styku's own Mayo-Clinic-based band (12–20.9% "Fit," where 17.2% sits solidly inside) — no composition-driven protein escalation is warranted.`,
  },
  {
    type: 'watch',
    label: `Segmental Asymmetry — ${legWeakerSide === 'left' ? 'Left' : 'Right'} Leg Leads Split Stance`,
    body: `Left Arm LST ${styku.leftArmLST} lbs vs Right Arm LST ${styku.rightArmLST} lbs (${(Math.abs(styku.leftArmLST - styku.rightArmLST)).toFixed(1)} lb gap, ~2.2% relative, ${armWeakerSide} marginally lower) — below CLAUDE.md's corrected >=10% relative Asymmetry Protocol trigger (also below the prior 0.5 lb absolute trigger — no change here), so it's noted here but the weaker-side-leads rule is deliberately NOT applied to Single-Arm Row. Left Leg LST ${styku.leftLegLST} lbs vs Right Leg LST ${styku.rightLegLST} lbs (${(Math.abs(styku.leftLegLST - styku.rightLegLST)).toFixed(1)} lb gap, ~5.2% relative, ${legWeakerSide} weaker) — left leg currently leads Split Stance (Days 1-2), the program's only unilateral leg movement, logged separately in the coaching cue. FLAGGED DISCREPANCY (8/17/2026 language-correction pass): this gap met the OLD 0.5 lb absolute trigger (this document's original basis for the left-leg-leads assignment), but does NOT clear CLAUDE.md's corrected >=10% relative trigger (per an external evidence review finding the old absolute trigger was firing on measurement noise). Per this pass's explicit instructions, the left-leg-leads Split Stance prescription is left UNCHANGED pending a dedicated per-client review — this is a trigger-logic language correction, not a silent resolution of whether the protocol should still apply. Flagged to the main thread/icons-expert. Re-check both gaps at Nick's next Styku rescan.`,
  },
  {
    type: 'purple',
    label: 'Male Client Programming Framework — What Was Applied Here',
    body: "ICONS's Evidence-Based Science Layer's five-bracket Age Bracket Programming Framework (protein/creatine g/kg tiers, ALST sarcopenia thresholds, the LIFTMOR postmenopausal bone-loading protocol, pelvic floor triggers) is derived from and validated for women 40s-60s navigating hormonal transitions — none of its numeric thresholds are applied to Nick. Instead, this document uses the Male Client Programming Framework's \"20-39 — Foundation\" bracket: his ALST, VFA, BMI, and body fat % are interpreted above against real male-specific citations (EWGSOP2 2018, the sex-independent VFA table, WHO BMI thresholds read alongside the ACE body-fat-% classification), and his protein/creatine targets below come from that framework's ISSN 2017 / Morton 2018 sources rather than the women's tiers. No testosterone/andropause note is included — that framework section is scoped to the 40-59+ brackets and `testosteroneNote()` correctly returns nothing for a 25-year-old client. What carries over unchanged from ICONS regardless of sex or age: the Isolated → Compound → Metabolic structural philosophy, RIR-based autoregulated progressive overload, corrective-before-compound sequencing, and the Styku segmental asymmetry protocol — all demographic-neutral principles, applied here on their own merits.",
  },
  // Protein/creatine targets generated by the engine's maleNutritionNote()
  // helper (icons_template.js) — `render` splices its pre-built paragraph
  // directly into the document. testosteroneNote() is deliberately checked
  // and omitted: it returns [] for ageYears < 40, correctly excluding Nick
  // at 25 rather than silently defaulting to no note either way.
  { render: maleNutritionNote(client) },
  ...testosteroneNote(client).length ? [{ render: testosteroneNote(client) }] : [],
  {
    type: 'watch',
    label: 'Advanced Periodization — What Changed From the Standard 3-Day Template',
    body: "Nick's coach note is a direct programming instruction, not a general observation. This plan keeps the roster-standard 60/70/80% day-badge structure for consistency, but the actual Week 1 working loads are computed at 70/80/88% of his estimated 1RM (not the literal 60/70/80%) — so his Day 3 primary lifts sit at or just above his already-tested 5RM. Rep ranges run 3-5 throughout, rest on primary lifts runs 120-180s (well above this system's standard 30-90s range), and a sub-maximal-load/maximal-intent velocity exercise (Trap Bar Jump or Med Ball Slam) appears once per day as a deliberate nod to velocity-based progression — not as the program's main driver.",
  },
  {
    type: 'watch',
    label: 'Not Yet Assessed — Both Introduced As New Baselines, Not Skipped',
    body: 'Split Stance and Goblet Squat are both introduced on Day 1 as light, technique-focused first exposures — Split Stance at a conservative starting load and Goblet Squat referenced off the Back Squat baseline. Neither is skipped; both become tracked baselines from this week forward.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'Day 1 — Hinge & New Baselines',
    subtitle: 'Neural Priming — Hex Bar Deadlift + New Baseline Introductions',
    descriptor: 'CONTROL PRECEDES POWER · NEW BASELINES: SPLIT STANCE & GOBLET SQUAT',
    intensityLabel: '60% Day',
    intensityPara: "Neural priming day — per the advanced-periodization note, Nick's Week 1 loads run higher than a literal 60% of 1RM (roughly 70% here) even on the week's lightest badge day, with lower reps and long rest. Split Stance and Goblet Squat are introduced as new tracked baselines.",
    warmUp: 'General dynamic warm-up: 5 min bike, hip/ankle mobility flow, glute bridges x10, band pull-aparts x12, deep squat hold 3x20s.',
    blocks: [
      {
        letter: 'A',
        title: 'ISOLATED — MOVEMENT PREP & NEW BASELINE INTRODUCTIONS',
        color: 'gold',
        introLabel: 'Why',
        intro: "Split Stance and Goblet Squat are both marked \"to assess\" on Nick's baseline sheet — first exposure here, light and technique-focused, becoming tracked baselines from this week forward.",
        exercises: [
          { name: 'Hip/Ankle Mobility Flow', sets: '2', reps: '—', load: 'Bodyweight', tempo: 'Controlled', rest: '30s', cue: 'General mobility prep before loaded hinge work.' },
          { name: 'Split Stance (NEW — Baseline Established)', sets: '3', reps: '8 ea', load: '35 lbs/hand (new baseline, light technique load)', tempo: '2-1-1', rest: '45s', cue: 'NOT YET ASSESSED — establishing first working baseline. Left leg leads — weaker per Styku segmental data. Depth and control priority.' },
          { name: 'Goblet Squat (NEW — Baseline Established, Back Squat Reference)', sets: '3', reps: '6', load: `70 lbs (new baseline — ref. Back Squat 1RM ${oneRM.squat})`, tempo: '3-1-1', rest: '60s', cue: 'NOT YET ASSESSED — using Back Squat baseline as reference load.' },
        ],
      },
      {
        letter: 'B',
        title: 'COMPOUND — PRIMARY HINGE & VELOCITY PRIMER',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.hbdl70} lbs (~70% of est. 1RM ${oneRM.hbdl}, off the tested 345 lbs x 5 baseline) — neural focus, 2 RIR, long rest. Trap Bar Jump is this session's velocity/intent exercise per the advanced-periodization note.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '5', reps: '4', load: `${wk1.hbdl70} lbs (Wk1)`, tempo: '1-0-X (explosive off floor)', rest: '150s', cue: 'Neural focus — controlled setup, fast concentric. 2 RIR.' },
          { name: 'Trap Bar Jump (Submaximal Load, Maximal Intent)', sets: '4', reps: '3', load: '~110–140 lbs (30–35% 1RM)', tempo: 'Explosive — full recovery', rest: '180s', cue: 'Velocity-based work — light load, maximal intent. Full recovery, not a metabolic set.' },
          { name: 'Single-Arm Row', sets: '4', reps: '5 ea', load: `${wk1.row70} lbs (Wk1)`, tempo: '3-1-2', rest: '90s', cue: 'Heaviest row in the group. Full stretch every rep.' },
        ],
      },
      {
        letter: 'C',
        title: 'COMPOUND — PULL-UP & CARRY',
        introLabel: 'Load Target',
        intro: 'Pull-Up: weighted + volume, every session per coach note. Farmer Carry holds its established baseline.',
        exercises: [
          { name: 'Pull-Up (Full) — Weighted + Volume', sets: '4 + 2', reps: '3–4 / max', load: '+25 lbs → Bodyweight', tempo: 'Controlled', rest: '150s', cue: 'Weighted set: +25 lbs, chin over bar, 2 RIR. Volume set: max unweighted.' },
          { name: 'Farmer Carry (Hex Bar / Heavy DB)', sets: '4', reps: '30 yds', load: '205 lbs/hand (established baseline)', tempo: 'Controlled', rest: '120s', cue: 'Exceptional baseline — transition to trap bar or heavy DBs per coach note.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC — CORE',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'Plank runs loaded from Week 1 per coach note.',
        exercises: [
          { name: 'Plank (Elbow, Loaded)', sets: '3', reps: '3:00', load: '25 lb plate (Wk1)', tempo: 'Hold', rest: '90s', cue: 'From Week 1: loaded (25 lb plate). Progress weight every 2 sessions.' },
        ],
      },
    ],
    coolDown: 'Hip flexor lunge stretch 60s/side. Hamstring stretch 60s/side. Lat stretch 30s/side. Thoracic extension 60s.',
    iconsNote: "Neural priming day — loads run higher than the badge % suggests per the advanced-periodization instruction. Coach should confirm Split Stance and Goblet Squat technique before either becomes a heavier tracked baseline next week.",
  },
  {
    intensity: 70,
    title: 'Day 2 — Compound Squat & Press',
    subtitle: 'Elite Volume — Back Squat, Push-Up & Pull-Up',
    descriptor: 'STRENGTH BUILDS CONFIDENCE · WEIGHTED PUSH-UP FROM WEEK 1',
    intensityLabel: '70% Day',
    intensityPara: "Compound strength day — per the advanced-periodization note, this week's Back Squat and Row loads run at ~80% of estimated 1RM, above the literal 70% badge value. Push-Up moves weighted from Week 1.",
    warmUp: 'General dynamic warm-up: 5 min row or bike, band pull-aparts x10, 90/90 hip switches x6/side, arm circles x10.',
    blocks: [
      {
        letter: 'A',
        title: 'ISOLATED — SHOULDER & HIP ACTIVATION',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Brief activation before heavy squat and press loading.',
        exercises: [
          { name: 'Band Pull-Apart', sets: '2', reps: '15', load: 'Light band', tempo: 'Controlled', rest: '30s', cue: 'Scapular activation before pressing work.' },
          { name: '90/90 Hip Switch', sets: '2', reps: '6 ea', load: 'Bodyweight', tempo: 'Controlled', rest: '30s', cue: 'Hip mobility prep before squat pattern.' },
        ],
      },
      {
        letter: 'B',
        title: 'COMPOUND — PRIMARY SQUAT & PULL',
        introLabel: 'Load Target',
        intro: `Week 1 working load ${wk1.squat80} lbs (~80% of est. 1RM ${oneRM.squat}, off the tested 275 lbs x 5 baseline) — 1-2 RIR, film every work set.`,
        exercises: [
          { name: 'Back Squat', sets: '5', reps: '4', load: `${wk1.squat80} lbs (Wk1)`, tempo: '3-1-X', rest: '150s', cue: 'Elite baseline — film every work set. 1–2 RIR.' },
          { name: 'Split Stance (Progression Load)', sets: '3', reps: '6 ea', load: '45 lbs/hand (building off Wk1 new baseline)', tempo: '2-1-1', rest: '75s', cue: 'Building off Week 1 new baseline. Left leg leads — weaker per Styku data. Depth and control priority.' },
          { name: 'Single-Arm Row', sets: '4', reps: '4 ea', load: `${wk1.row80} lbs (Wk1)`, tempo: '3-1-2', rest: '90s', cue: 'Progress toward 72.5–75 lb Wk4 target.' },
        ],
      },
      {
        letter: 'C',
        title: 'COMPOUND — PULL-UP, PUSH & VELOCITY FINISHER',
        introLabel: 'Load Target',
        intro: 'Push-Up moves weighted from Week 1. Med Ball Slam is this session\'s velocity/intent exercise.',
        exercises: [
          { name: 'Pull-Up (Full) — Weighted + Volume', sets: '4 + 2', reps: '3–4 / max', load: '+25 lbs → Bodyweight', tempo: 'Controlled', rest: '150s', cue: 'Both every session per coach note.' },
          { name: 'Push-Up (Weighted)', sets: '3', reps: '18–20', load: '20 lb vest minimum', tempo: '3-0-1', rest: '90s', cue: 'Weighted from Wk1. Target 20+ loaded reps by Wk4.' },
          { name: 'Med Ball Slam (Submaximal, Maximal Intent)', sets: '3', reps: '5', load: '10–12 lb med ball', tempo: 'Explosive — full recovery', rest: '90s', cue: 'Velocity finisher — full effort intent, full recovery between reps.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC — CONDITIONING FINISHER',
        color: 'gold',
        introLabel: 'Format',
        intro: 'Short, sharp finisher — doesn\'t compromise Day 3\'s peak session.',
        exercises: [
          { name: 'Bike Sprint Intervals', sets: '1', reps: '6 x 20s hard / 40s easy', load: 'Moderate', tempo: 'Intervals', rest: '—', cue: 'Short, sharp finisher. Hold form to the last round.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 30s/side. Lat stretch 30s/side. Hip flexor stretch 60s/side.',
    iconsNote: 'Elite-volume day — loads run above the literal 70% badge per the advanced-periodization note. Film every Back Squat work set. Recovery matters here — keep the finisher short so Day 3\'s peak session isn\'t compromised.',
  },
  {
    intensity: 80,
    title: 'Day 3 — Peak Hinge, Squat & Carry',
    subtitle: 'Longest Rest of the Week — Near-Tested-Max Loading',
    descriptor: 'PRIMARY STRENGTH DAY · NEURAL FOCUS 85–90% · HEAVIEST CARRY',
    intensityLabel: '80% Day',
    intensityPara: `Peak intensity for the week. Per the coach note's own instruction ("neural focus: 3-4 reps at 85-90%"), this session's Hex Bar Deadlift and Back Squat both run at ~88% of estimated 1RM — at or just above Nick's already-tested 5RM. Rest is the longest of the week (150-180s) on every primary lift, and reps stay low (3).`,
    warmUp: 'General dynamic warm-up: 5 min bike, glute bridges x10, ankle dorsiflexion rock x10/side, hip circles.',
    blocks: [
      {
        letter: 'A',
        title: 'ISOLATED — BRIEF ACTIVATION',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Quick activation ahead of the week\'s heaviest loading — kept brief on a peak day.',
        exercises: [
          { name: 'Glute Bridge (Bilateral)', sets: '2', reps: '10', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'Full glute lockout; ribs down, no arch.' },
        ],
      },
      {
        letter: 'B',
        title: 'COMPOUND — PEAK HINGE, SQUAT & PULL',
        introLabel: 'Load Target',
        intro: `Hex Bar Deadlift ${wk1.hbdl88} lbs (~88% of est. 1RM ${oneRM.hbdl}). Back Squat ${wk1.squat88} lbs (~88% of est. 1RM ${oneRM.squat}). Single-Arm Row ${wk1.row88} lbs — matches the tested 5RM baseline this week.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '5', reps: '3', load: `${wk1.hbdl88} lbs (Wk1)`, tempo: '1-0-X', rest: '180s', cue: 'Neural focus: 3–4 reps at 85–90% per coach note. Longest rest of the week.' },
          { name: 'Back Squat', sets: '4', reps: '3', load: `${wk1.squat88} lbs (Wk1)`, tempo: '2-1-X', rest: '180s', cue: 'Peak day — film every work set. 1 RIR.' },
          { name: 'Single-Arm Row', sets: '4', reps: '4 ea', load: `${wk1.row88} lbs (Wk1)`, tempo: '3-1-2', rest: '120s', cue: 'Heaviest in the group — matches tested 5RM baseline this week.' },
        ],
      },
      {
        letter: 'C',
        title: 'COMPOUND — PULL-UP & VELOCITY FINISHER',
        introLabel: 'Load Target',
        intro: 'Peak-day pull work followed by this session\'s closing velocity exercise.',
        exercises: [
          { name: 'Pull-Up (Full) — Weighted + Volume', sets: '4 + 2', reps: '3 / max', load: '+25 lbs → Bodyweight', tempo: 'Controlled', rest: '150s', cue: 'Peak day pull work — full recovery between weighted sets.' },
          { name: 'Trap Bar Jump (Submaximal, Maximal Intent)', sets: '3', reps: '3', load: '~120–150 lbs', tempo: 'Explosive — full recovery', rest: '180s', cue: 'Closing velocity work — power output before fatigue accumulates too high.' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC — HEAVIEST CARRY & CORE',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'Farmer Carry progresses toward the 225+ lb Wk4 target; Plank pushes toward its Wk4 target.',
        exercises: [
          { name: 'Farmer Carry', sets: '4', reps: '30–40 yds', load: '215 lbs/hand (Wk1 — progressing toward 225+ Wk4 target)', tempo: 'Controlled', rest: '150s', cue: 'Progress +10 lbs per session per coach note.' },
          { name: 'Plank (Elbow, Loaded)', sets: '3', reps: '3:00', load: '25–30 lb plate', tempo: 'Hold', rest: '90s', cue: 'Push plate weight toward Wk4 target.' },
        ],
      },
    ],
    coolDown: 'Pigeon pose 90s/side. Hip flexor lunge 60s/side. Lat stretch 30s/side. Thoracic extension 60s.',
    iconsNote: "This week's heaviest day, by design — Hex Bar Deadlift and Back Squat both sit at or just above Nick's already-tested 5RM. Full rest between every top set; this is not the day to rush for the sake of session length.",
  },
];

const summary = {
  subtitle: 'Nick  ·  ICONS Index  ·  Advanced/Elite Full-Body Build  ·  Week 1',
  rows: [
    ['Day 1', '60%', 'Hinge & New Baselines — Neural Priming', 'Hex Bar Deadlift / Trap Bar Jump', `Wk1 ${wk1.hbdl70} lbs (~70% 1RM). Split Stance & Goblet Squat introduced as new baselines.`],
    ['Day 2', '70%', 'Compound Squat & Press — Elite Volume', 'Back Squat / Push-Up (Weighted)', `Wk1 ${wk1.squat80} lbs (~80% 1RM). Push-Up goes weighted (20 lb) from Wk1.`],
    ['Day 3', '80%', 'Peak Hinge, Squat & Carry', 'Hex Bar Deadlift / Back Squat', `Wk1 ${wk1.hbdl88}/${wk1.squat88} lbs (~88% 1RM) — at or above tested 5RM. Longest rest of the week (150–180s).`],
  ],
  milestones4wk: 'Plank: 3:00 loaded (25 lb plate). Hex Bar Deadlift: 380–400 lbs. Back Squat: 295–315 lbs. Pull-Up: Weighted +25 lbs — 6+ reps. Farmer Carry: 225+ lbs/hand. Single-Arm Row: 72.5–75 lbs. All figures per coach note. Advanced periodization holds throughout: low reps, long rest, RIR-autoregulated — never a grind to failure.',
  milestones8wk: 'Continue advanced periodization off the 4-week targets above — re-test Hex Bar Deadlift and Back Squat around this window given how close Week 1 loads already sit to the tested 5RM. Split Stance and Goblet Squat should have real, independently tested numbers by the 8-week mark rather than continuing to run on Week 1 reference loads.',
};

const data = {
  client,
  styku,
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
  const outDir = path.join(__dirname, '..', '..', 'trainers', 'nick');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Nick_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
