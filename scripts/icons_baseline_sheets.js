/**
 * ICONS Baseline Sheets — migration build script
 * Brace Life Studios
 *
 * Migrates the legacy "ICONS Baseline Sheets" PDF (5 athlete baseline-
 * assessment sheets — Becca, Brodie, Oscar, Jah, Nick) into a brand-
 * compliant .docx built on icons_template.js's actual exported primitives.
 *
 * This is a deliberate STYLE migration, not a faithful visual reproduction.
 * The source PDF used a legacy visual language (solid black header band,
 * bright blue/orange level-badge accents, bordered/shaded colored callout
 * boxes for COACH NOTE / NOT YET ASSESSED / 4-WEEK TARGETS) that predates
 * and was explicitly retired by CLAUDE.md's confirmed house visual
 * language (see "Visual language — confirmed from reference document" —
 * no bordered/shaded alert boxes, pale-tint table headers with bold
 * colored text, running header/footer with a gold hairline). Same
 * precedent already used for the Train the Trainer base program's boxed
 * "PROGRESSIVE OVERLOAD" table (see CLAUDE.md's "Trainer Development
 * Programs" — Deliberate deviation from the uploaded source).
 *
 * This is NOT a client training plan — no Styku/ALST/VFA/age/clinical
 * data exists for any of these 5 athletes, so buildDocument()'s
 * client-plan schema (days/blocks/exTable, proteinBar/pelvicFloorCallout
 * auto-insertion, the Antagonist Rotation Rule, the Full-Spectrum
 * Progression Standard) does not apply here and is not used. Instead this
 * script composes a custom multi-athlete document directly from the
 * engine's exported content + chrome primitives (buildHeader/buildFooter,
 * page setup constants, coverHeader/clientStats/sectionTitle/dayHeader/
 * baselinesTable/weeklySummary/labeledPara callouts) — reusing the exact
 * branded page chrome without forcing 5 separate athlete baseline tables
 * into buildDocument()'s single-client days[] shape.
 *
 * Two small, backward-compatible additions were made to icons_template.js
 * to reproduce this content faithfully with real primitives instead of
 * hand-rolled tables:
 *   - baselinesTable()'s 2nd param now also accepts a full 4-string header
 *     array (not just the 4th/target column override) — used here as
 *     ['MOVEMENT','BASELINE','FORMAT','COACHING NOTE'].
 *   - weeklySummary()'s optional 2nd param overrides its 5 header labels —
 *     used here as ['MOVEMENT','WK 1','WK 2','WK 3','WK 4'] for the
 *     hand-tracked session log grid.
 *   - buildHeader/buildFooter and the page-setup constants (PAGE_W/PAGE_H/
 *     MARGIN/TW) are now exported so a non-buildDocument() script can still
 *     reuse the exact branded running header/footer + page setup.
 */

const {
  Document, Packer, Paragraph, PageBreak, TextRun, AlignmentType,
} = require('docx');
const {
  C, PAGE_W, PAGE_H, MARGIN, TW,
  buildHeader, buildFooter,
  coverHeader, clientStats, sectionTitle, dayHeader,
  baselinesTable, weeklySummary,
  goldCallout, greenCallout, watchFlag,
} = require('./icons_template');

// ── helpers local to this script ────────────────────────────────────────
function spacer(size = 100) {
  return new Paragraph({ text: '', spacing: { after: size } });
}

function para(runs, opts = {}) {
  return new Paragraph({ children: runs, ...opts });
}

function txt(text, opts = {}) {
  return new TextRun({ text, font: 'Arial', ...opts });
}

// Renders a list of {name, value} target pairs as one mixed bold/regular
// paragraph body — same "bold label + regular value, ' · '-joined" shape
// already used elsewhere in the engine (proteinTargets callout body,
// clientStats' dot-joined stats line) rather than inventing a bulleted
// list style the engine doesn't otherwise use.
function keyValueRuns(pairs) {
  const runs = [];
  pairs.forEach((p, i) => {
    runs.push(txt(`${p.name}: `, { bold: true, size: 17, color: C.dark }));
    runs.push(txt(p.value, { size: 17, color: C.dark }));
    if (i < pairs.length - 1) runs.push(txt('   ·   ', { size: 17, color: C.mid }));
  });
  return runs;
}

// Level tier -> intensity key (drives dayHeader's accent color via the
// engine's existing INTENSITY/HUES lookup) + a short badge code (the
// literal legacy level text is preserved in full as the day-header
// descriptor line, per the badge-override pattern already used for
// non-%-graded days elsewhere in this system — e.g. Aimee Morris's Day
// A/B badges — rather than forcing the level text itself into the %
// system).
const TIER = {
  INTERMEDIATE: { intensity: 60, badge: 'INT', color: C.teal },
  'INTERMEDIATE / ADVANCED': { intensity: 70, badge: 'INT/\nADV', color: C.green },
  'ADVANCED / ELITE': { intensity: 90, badge: 'ADV/\nELITE', color: C.red },
};

// ── athlete data — preserved exactly as extracted from the source PDF ──
const athletes = [
  {
    name: 'Becca',
    level: 'INTERMEDIATE',
    coachNote: 'Assisted pull-up across all three grips. Strong plank baseline. Deadlift established. Split stance and row lighter than group.',
    movements: [
      ['Plank (Elbow)', '3:00', 'Max time', '3:00 = strong baseline. Train at 2:30 loaded from Week 1.'],
      ['Push-Up', '11 reps', 'Max reps', 'Full floor. Train at 8–9 reps to stay 2 RIR. Progress form before load.'],
      ['Split Stance', '50 lbs × 5', '5RM', 'Working load established. Progress +5 lbs when all 5 reps clean at 2 RIR.'],
      ['Goblet Squat', '50 lbs × 5', 'Working', 'Matches split stance. Use as primary squat corrective load.'],
      ['Single-Arm Row', '30 lbs × 5', '5RM', 'Starting lighter than group. Build to 40 lbs by Wk4. Focus on full stretch at bottom.'],
      ['Pull-Up (Assisted)', 'CG / Std / Wide — 5 each', '3-grip protocol', 'Run all three grips every pull-up session. Rotate which grip leads. Progress = reduce assist.'],
      ['Farmer Carry', '40 lbs / hand', 'Working', '+5 lbs every 2 sessions. Shoulder packing cue priority.'],
      ['Deadlift (Conventional)', '125 lbs × 5', '5RM', 'Established. Progress to 135 lbs when all 5 clean + 2 RIR. Hip hinge corrective before every set.'],
    ],
    notYetAssessed: ['Hex Bar Deadlift', 'Back Squat', 'Full Pull-Up'],
    targets: [
      { name: 'Plank', value: '2:30 loaded (10 lb plate)' },
      { name: 'Push-Up', value: '15+ full floor' },
      { name: 'Split Stance', value: '65 lbs' },
      { name: 'Single-Arm Row', value: '42.5 lbs' },
      { name: 'Deadlift', value: '145–150 lbs' },
      { name: 'Farmer Carry', value: '52.5 lbs / hand' },
    ],
    sessionLog: ['Plank (Elbow)', 'Push-Up', 'Split Stance', 'Goblet Squat'],
  },
  {
    name: 'Brodie',
    level: 'INTERMEDIATE',
    coachNote: 'Full unassisted pull-ups — 16 rep baseline is strong. Highest push-up count in the group. Back squat and hex DL established. Competitive across all lifts.',
    movements: [
      ['Plank (Elbow)', '3:00', 'Max time', 'Strong baseline. Train at 2:30 loaded from Week 1. Progress plate weight — not duration.'],
      ['Push-Up', '37 reps', 'Max reps', 'Exceptional baseline. Train at 28–30 reps (80%). Add resistance vest or weighted vest from Wk2.'],
      ['Split Stance', '45 lbs × 5', '5RM', '5RM established. Note: lighter than Oscar/Nick — prioritize depth and tempo first.'],
      ['Goblet Squat', '45 lbs × 5', 'Working', 'Matches split stance. Corrective pattern — full depth, 3-sec descent every rep.'],
      ['Hex Bar Deadlift', '205 lbs × 5', '5RM', 'Strong baseline. Progress to 215 lbs Wk2. Wk4 target: 225–235 lbs. Hip hinge drill mandatory.'],
      ['Single-Arm Row', '40 lbs × 5', '5RM', 'Solid. Progress +5 lbs every 2 sessions. Drive elbow to hip — 2-sec hold at top.'],
      ['Pull-Up (Full)', '16 reps max', 'Max reps', 'Strong unassisted baseline. Add load (+10 lbs) for strength sets. Volume sets: max unweighted.'],
      ['Farmer Carry', '60 lbs / hand', 'Working', 'Strong carry. +5 lbs every 2 sessions. Wk4 target: 75 lbs / hand.'],
      ['Back Squat', '155 lbs × 5', '5RM', 'Established. Progress to 165 lbs Wk2. Wk4 target: 175–185 lbs. Film side-on every session.'],
    ],
    notYetAssessed: ['Conventional Deadlift', 'Assisted Pull-Up'],
    targets: [
      { name: 'Plank', value: '2:30 loaded (15 lb plate)' },
      { name: 'Push-Up', value: 'Weighted vest — 20+ reps' },
      { name: 'Hex Bar Deadlift', value: '225–235 lbs' },
      { name: 'Back Squat', value: '175–185 lbs' },
      { name: 'Pull-Up', value: 'Weighted +10 lbs — 6+ reps' },
      { name: 'Farmer Carry', value: '75 lbs / hand' },
    ],
    sessionLog: ['Plank (Elbow)', 'Push-Up', 'Split Stance', 'Goblet Squat'],
  },
  {
    name: 'Oscar',
    level: 'INTERMEDIATE',
    coachNote: 'Highest push-up baseline in the group. 20 full pull-ups — exceptional. Heaviest single-arm row. Back squat and hex DL established. Strong across all lifts.',
    movements: [
      ['Plank (Elbow)', '3:00', 'Max time', 'Strong baseline. Train at 2:30 loaded from Week 1. Progress plate weight not duration.'],
      ['Push-Up', '42 reps', 'Max reps', 'Highest in the group. Train at 30–34 reps (80%). Add weighted vest or band resistance from Wk2.'],
      ['Split Stance', '40 lbs × 5', '5RM', 'Lighter than row and squat baselines — focus on depth and unilateral quality. Progress to 50 lbs Wk2.'],
      ['Goblet Squat', '40 lbs × 5', 'Working', 'Corrective pattern. Full depth. 3-sec descent. This should progress quickly as squat is strong.'],
      ['Hex Bar Deadlift', '205 lbs × 5', '5RM', 'Strong baseline. Progress to 215 lbs Wk2. Wk4 target: 230–240 lbs.'],
      ['Single-Arm Row', '50 lbs × 5', '5RM', 'Heaviest row in the group. Progress to 55 lbs Wk2. Wk4 target: 62.5–65 lbs.'],
      ['Pull-Up (Full)', '20 reps max', 'Max reps', 'Exceptional baseline — highest in the group. Add load (+15 lbs) for strength sets from Wk1.'],
      ['Back Squat', '155 lbs × 5', '5RM', 'Established. Progress to 165 lbs Wk2. Wk4 target: 180–190 lbs.'],
    ],
    notYetAssessed: ['Farmer Carry', 'Conventional Deadlift', 'Assisted Pull-Up'],
    targets: [
      { name: 'Plank', value: '2:30 loaded (15 lb plate)' },
      { name: 'Push-Up', value: 'Weighted — 25+ reps' },
      { name: 'Hex Bar Deadlift', value: '230–240 lbs' },
      { name: 'Back Squat', value: '180–190 lbs' },
      { name: 'Pull-Up', value: 'Weighted +15 lbs — 8+ reps' },
      { name: 'Single-Arm Row', value: '62.5–65 lbs' },
    ],
    sessionLog: ['Plank (Elbow)', 'Push-Up', 'Split Stance', 'Goblet Squat'],
  },
  {
    name: 'Jah',
    level: 'INTERMEDIATE / ADVANCED',
    coachNote: 'Full baseline now established. Highest push-up count in the group at 60 reps and highest pull-up count at 25 reps — exceptional bodyweight strength. 200 lb deadlift, 150 lb squat, 60 lb row all competitive with the group. Split squat at 60 lbs matches Nick. Strong across the board.',
    movements: [
      ['Plank (Elbow)', '3:00', 'Max time', 'Strong baseline. Train at 2:30 loaded (10 lb plate) from Week 1. Progress plate weight every 2 sessions.'],
      ['Push-Up', '60 reps', 'Max reps', 'Highest in the group by a significant margin. Train weighted — 20 lb vest or plate on back from Wk1. Target: 35–40 reps loaded.'],
      ['Pull-Up (Full)', '25 reps max', 'Max reps', 'Highest in the group. Add load immediately — +15 lbs for strength sets from Wk1. Volume: max unweighted. Both every session.'],
      ['Single-Arm Row', '60 lbs × 5', '5RM', 'Tied with Nick for heaviest row. Progress to 65 lbs Wk2. Wk4 target: 72.5 lbs. Full stretch at bottom every rep.'],
      ['Farmer Carry', '60 lbs / hand', 'Working', 'Strong baseline. +5 lbs every 2 sessions. Wk4 target: 75 lbs / hand. Shoulder packing cue — chest tall throughout.'],
      ['Back Squat', '150 lbs × 5', '5RM', 'Solid baseline. Progress to 160 lbs Wk2. Wk4 target: 170–180 lbs. Film side-on every session — depth check priority.'],
      ['Deadlift (Conventional)', '200 lbs × 5', '5RM', 'Strong baseline. Progress to 210 lbs Wk2. Wk4 target: 225–235 lbs. PVC hip hinge drill mandatory before every set.'],
      ['Split Squat (BSS)', '60 lbs × 5', '5RM', 'Strong unilateral baseline — tied with Nick. Progress to 65 lbs Wk2. Wk4 target: 72.5–75 lbs. Left leg leads.'],
    ],
    notYetAssessed: ['Hex Bar Deadlift (substitute conventional DL baseline)', 'Goblet Squat (use squat baseline as reference)'],
    targets: [
      { name: 'Plank', value: '2:30 loaded (15 lb plate)' },
      { name: 'Push-Up', value: 'Weighted — 35+ reps' },
      { name: 'Pull-Up', value: 'Weighted +15 lbs — 8+ reps' },
      { name: 'Back Squat', value: '170–180 lbs' },
      { name: 'Deadlift', value: '225–235 lbs' },
      { name: 'Single-Arm Row', value: '72.5 lbs' },
      { name: 'Split Squat', value: '72.5–75 lbs' },
      { name: 'Farmer Carry', value: '75 lbs / hand' },
    ],
    sessionLog: ['Plank (Elbow)', 'Push-Up', 'Pull-Up (Full)', 'Single-Arm Row'],
  },
  {
    name: 'Nick',
    level: 'ADVANCED / ELITE',
    coachNote: 'Elite-level baselines across every movement. 345 lb hex bar deadlift, 275 lb back squat, 60 lb single-arm row, 205 lb farmer carry, 15 pull-ups. Programming requires advanced periodization — heavier loads, lower rep ranges, longer rest, velocity-based progression.',
    movements: [
      ['Plank (Elbow)', '3:00', 'Max time', 'Strong baseline. From Week 1: loaded (25 lb plate). Progress weight every 2 sessions.'],
      ['Push-Up', '33 reps', 'Max reps', 'Train weighted (20 lb vest minimum). Target: 20+ reps with load. Add plate on back if no vest.'],
      ['Hex Bar Deadlift', '345 lbs × 5', '5RM', 'Elite baseline. Progress to 365 lbs Wk2. Wk4 target: 380–400 lbs. Neural focus: 3–4 reps at 85–90%.'],
      ['Single-Arm Row', '60 lbs × 5', '5RM', 'Heaviest in group. Progress to 65 lbs Wk2. Wk4 target: 72.5–75 lbs. Heavier DB or cable row.'],
      ['Pull-Up (Full)', '15 reps max', 'Max reps', 'Solid baseline. Add load: +25 lbs for strength sets. Volume: unweighted max-rep sets. Both each session.'],
      ['Farmer Carry', '205 lbs / hand (Hex Bar)', 'Working', 'Exceptional. Transition to trap bar or heavy DBs. Progress +10 lbs every session. Wk4: 225+ lbs.'],
      ['Back Squat', '275 lbs × 5', '5RM', 'Elite baseline. Progress to 285 lbs Wk2. Wk4 target: 295–315 lbs. Film every work set.'],
    ],
    notYetAssessed: ['Split Stance (to assess)', 'Goblet Squat (to assess)'],
    targets: [
      { name: 'Plank', value: '3:00 loaded (25 lb plate)' },
      { name: 'Hex Bar Deadlift', value: '380–400 lbs' },
      { name: 'Back Squat', value: '295–315 lbs' },
      { name: 'Pull-Up', value: 'Weighted +25 lbs — 6+ reps' },
      { name: 'Farmer Carry', value: '225+ lbs / hand' },
      { name: 'Single-Arm Row', value: '72.5–75 lbs' },
    ],
    sessionLog: ['Plank (Elbow)', 'Push-Up', 'Hex Bar Deadlift', 'Single-Arm Row'],
  },
];

// ── document assembly ────────────────────────────────────────────────────
async function buildBaselineSheets() {
  const rosterName = 'Becca · Brodie · Oscar · Jah · Nick';
  const programTitle = 'ICONS BASELINE SHEETS';
  const subtitleLine = 'Athlete Starting Baselines — Trainer Reference';

  const children = [];

  // Cover
  children.push(...coverHeader(rosterName, programTitle, subtitleLine));
  children.push(...clientStats([
    '5 Athletes — Becca, Brodie, Oscar, Jah, Nick',
    'ICONS Baseline Testing Protocol',
    'Trainer Copy — Confidential',
  ]));
  children.push(...goldCallout(
    'About This Document',
    'Starting strength baselines for five current ICONS Index athletes, captured at intake. Each athlete’s page documents tested baselines, coaching progression notes, movements not yet assessed, 4-week targets, and a session log for hand-tracked loads across Weeks 1–4.'
  ));

  // One page per athlete
  athletes.forEach((a) => {
    children.push(new Paragraph({ children: [new PageBreak()] }));

    const tier = TIER[a.level];
    children.push(...dayHeader(
      tier.intensity,
      a.name,
      'Starting Baseline Assessment',
      a.level,
      { label: tier.badge, sub: 'LEVEL' }
    ));

    children.push(...goldCallout('Coach Note', a.coachNote));

    children.push(sectionTitle(`${a.name} — Baseline Testing`, tier.color));
    children.push(...baselinesTable(a.movements, ['MOVEMENT', 'BASELINE', 'FORMAT', 'COACHING NOTE']));

    children.push(...watchFlag('Not Yet Assessed', a.notYetAssessed.join('   ·   ')));
    children.push(...greenCallout('4-Week Targets', keyValueRuns(a.targets)));

    children.push(sectionTitle('Session Log — Track Loads Each Session', C.gold));
    const logRows = a.sessionLog.map((m) => [m, '', '', '', '']);
    children.push(...weeklySummary(logRows, ['MOVEMENT', 'WK 1', 'WK 2', 'WK 3', 'WK 4']));
  });

  // Closing brand line
  children.push(spacer(160));
  children.push(para([txt('BRACE LIFE STUDIOS  ·  ICONS INDEX  ·  bracelifestudios.com', { bold: true, size: 18, color: C.gold })], {
    alignment: AlignmentType.CENTER, spacing: { after: 40 },
  }));
  children.push(para([txt('These baseline sheets are confidential and prepared exclusively for Brace Life Studios trainer use.', { italics: true, size: 16, color: C.mid })], {
    alignment: AlignmentType.CENTER,
  }));

  const footerRight = 'ICONS Baseline Sheets  |  Trainer Copy';

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: PAGE_H },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        headers: { default: buildHeader(rosterName, subtitleLine) },
        footers: { default: buildFooter(rosterName, footerRight) },
        children,
      },
    ],
    styles: {
      default: {
        document: { run: { font: 'Arial', size: 17, color: C.dark } },
      },
    },
  });

  return Packer.toBuffer(doc);
}

async function main() {
  const buf = await buildBaselineSheets();
  const outPath = require('path').join(__dirname, '..', 'system_documents', 'ICONS_Baseline_Sheets.docx');
  require('fs').writeFileSync(outPath, buf);
  console.log('Wrote', outPath, `(${buf.length} bytes)`);
}

if (require.main === module) {
  main().catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { buildBaselineSheets, athletes };
