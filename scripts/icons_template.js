/**
 * ICONS Index — Canonical .docx template engine
 * Brace Life Studios
 *
 * Source of truth for all client-facing .docx deliverables. Page setup,
 * color system, typography, and table schemas are extracted directly from
 * the Kelly Mulroy 5-Day Training Plan reference document (the actual
 * client-delivered file, XML-audited August 2026) — see
 * /CLAUDE.md and /docs/ICONS_System_Prompt.md for the narrative spec.
 *
 * Visual language, confirmed against the reference document:
 *   - Compact, editorial. No bordered/shaded "alert box" callouts anywhere.
 *     Every callout (warm-up, cool-down, ICONS Note, baseline notes,
 *     clinical flags, block intros) is a single paragraph: a bold colored
 *     label run ("Warm-Up:  ") followed by a regular dark body run.
 *   - Running header + footer with a hairline gold rule, present on every page.
 *   - Table headers use a PALE tint background with BOLD COLORED text
 *     (not a solid color bar with white text).
 *   - Every color has three tiers: accent (solid), head tint (table
 *     headers, day-header pale cell), stripe tint (alternating table rows
 *     — lighter than the head tint). Gold is the one exception: its
 *     day-header pale cell uses the STRIPE tint (FAF3E0), not the head
 *     tint (F5E8C0), because the head tint reads too saturated across a
 *     full-width band. Everywhere else head === day-header pale.
 *
 * Callout color rules — always follow:
 *   goldCallout   → warm-up, general coaching, ICONS Notes
 *   greenCallout  → baseline notes, positive performance data, PRs, cleared status
 *   redCallout    → shoulder flags, corrective priorities, overhead suspension
 *   tealCallout   → Styku scan data, assessment findings, asymmetry
 *   blueCallout   → cool-down, recovery, mobility
 *   purpleCallout → pull-up pathway, posterior chain notes
 *   clinicalFlag  → ALST At-Risk, BMI underweight (same compact style, flagRed text —
 *                   the reference document renders even its most severe note,
 *                   "Corrective Priorities", as a plain bold-red label, no border)
 *   watchFlag     → asymmetry alerts, moderate risk flags, pelvic floor safety notes
 *   clearFlag     → shoulder cleared, milestone achieved
 *
 * Block header colors follow the same rule, applied per block via an
 * explicit `block.color` override (one of the keys in HUES below):
 *   omitted            → the day's own intensity color (primary strength blocks)
 *   'red'              → corrective circuits tied to a flagged movement fault
 *   'green'            → blocks tracking a baseline/PR metric (e.g. push-up protocol)
 *   'gold'             → generic accessory / stability / mobility blocks
 *   'purple'           → pull-up pathway / posterior-chain-specific blocks
 * On Active Recovery days every block conventionally stays the day's own
 * blue — there's no clinical corrective context on a recovery day.
 *
 * Every training day auto-inserts, when applicable:
 *   proteinBar(client)      — ALST At-Risk clients only, on EVERY day page
 *   pelvicFloorCallout()    — postmenopausal clients only, on EVERY day page
 *   with a squat/deadlift/RDL/hip-thrust/carry/lunge
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, VerticalAlign, ShadingType,
  PageBreak, Header, Footer, TabStopType, TabStopPosition,
} = require('docx');

// ── PAGE SETUP (US Letter) ──────────────────────────────────────────────
const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN = 900;
const TW = 10440;
const FONT = 'Arial';

// ── COLOR SYSTEM — three tiers per hue ──────────────────────────────────
const HUES = {
  teal: { accent: '00695C', head: 'E0F2F1', stripe: 'F0FAFA' },
  green: { accent: '43A047', head: 'E8F5E9', stripe: 'F1F8F2' },
  gold: { accent: 'C9A227', head: 'F5E8C0', stripe: 'FAF3E0' },
  red: { accent: 'E53935', head: 'FFEBEE', stripe: 'FFF5F5' },
  blue: { accent: '1565C0', head: 'EAF4FB', stripe: 'F0F7FF' },
  purple: { accent: '6A1B9A', head: 'F3EEF9', stripe: 'F8F4FB' },
  gray: { accent: '6B6B6B', head: 'F0F0F0', stripe: 'F0F0F0' },
};

const C = {
  teal: HUES.teal.accent, tealPale: HUES.teal.head,
  green: HUES.green.accent, greenPale: HUES.green.head,
  gold: HUES.gold.accent, goldPale: HUES.gold.stripe,
  goldHead: HUES.gold.head,       // table-header gold tint — distinct from goldPale
  goldDeep: 'B8860B',             // brand table header text (baselines / summary)
  red: HUES.red.accent, redPale: HUES.red.head,
  blue: HUES.blue.accent, bluePale: HUES.blue.head,
  purple: HUES.purple.accent,

  dark: '2C2C2C',
  mid: '6B6B6B',
  white: 'FFFFFF',
  offGray: 'F0F0F0',
  warmGreen: '2E7D32',            // Warm-Up label color — distinct from C.green

  flagRed: 'B71C1C',
  flagAmber: 'E65100',
  flagGreen: '1B5E20',

  // Legacy aliases kept for any external reference to the old names.
  callGold: HUES.gold.stripe, callGoldB: HUES.gold.accent,
  callGreen: HUES.green.head, callGreenB: HUES.green.accent,
  callRed: HUES.red.head, callRedB: HUES.red.accent,
  callTeal: HUES.teal.head, callTealB: HUES.teal.accent,
  callBlue: HUES.blue.head, callBlueB: HUES.blue.accent,
  callPurple: HUES.purple.head, callPurpleB: HUES.purple.accent,
};

// intensity → hue key + label. "Off" is week-overview-only (no day page).
const INTENSITY = {
  60: { hue: 'teal', label: '60%' },
  70: { hue: 'green', label: '70%' },
  80: { hue: 'gold', label: '80%' },
  90: { hue: 'red', label: '90%' },
  AR: { hue: 'blue', label: 'ACTIVE\nRECOV.' },
  Off: { hue: 'gray', label: '—' },
};

function ivOf(intensity) {
  const entry = INTENSITY[intensity] || INTENSITY[70];
  const hue = HUES[entry.hue];
  const dayPale = entry.hue === 'gold' ? HUES.gold.stripe : hue.head;
  return { accent: hue.accent, tableHead: hue.head, stripe: hue.stripe, pale: dayPale, label: entry.label, hue: entry.hue };
}

function hueOf(colorKey) {
  const h = HUES[colorKey] || HUES.teal;
  return { accent: h.accent, tableHead: h.head, stripe: h.stripe };
}

// ── LOW-LEVEL HELPERS ────────────────────────────────────────────────────
function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: none, bottom: none, left: none, right: none };
}

function shade(color) {
  return { type: ShadingType.CLEAR, color: 'auto', fill: color };
}

function txt(text, opts = {}) {
  return new TextRun({ text, font: FONT, ...opts });
}

// Splits on \n and inserts hard line breaks within a single paragraph run,
// matching the reference document's "Squat\nKnee Fix" style two-line cells.
function txtLines(text, opts = {}) {
  const parts = String(text).split('\n');
  const runs = [];
  parts.forEach((part, i) => {
    runs.push(new TextRun({ text: part, font: FONT, ...opts, break: i > 0 ? 1 : undefined }));
  });
  return runs;
}

function para(children, opts = {}) {
  const runs = Array.isArray(children) ? children : [children];
  return new Paragraph({ children: runs, ...opts });
}

function cell(content, opts = {}) {
  const children = Array.isArray(content) ? content : [content];
  return new TableCell({
    children,
    borders: opts.borders || noBorders(),
    shading: opts.fill ? shade(opts.fill) : undefined,
    verticalAlign: opts.vAlign || VerticalAlign.CENTER,
    margins: opts.margins || { top: 40, bottom: 40, left: 80, right: 80 },
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    columnSpan: opts.colSpan,
  });
}

function fullWidthTable(rows, colWidths, opts = {}) {
  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows,
    borders: opts.borders || noBorders(),
  });
}

function spacer(size = 60) {
  return new Paragraph({ text: '', spacing: { after: size } });
}

// Evenly divides TW across n columns, pushing the rounding remainder onto
// the last two columns — mirrors the reference week-strip [1488×5, 1500×2].
function evenWidths(n) {
  const base = Math.floor(TW / n);
  const widths = Array(n).fill(base);
  let remainder = TW - base * n;
  for (let i = n - 1; remainder > 0; i--, remainder--) widths[i] += 1;
  return widths;
}

// ── LABELED PARAGRAPH (the base "callout") ──────────────────────────────
// Every narrative callout in the reference document is one paragraph: a
// bold colored label run, then a regular dark body run. No border, no fill.
function labeledPara(label, body, color, opts = {}) {
  const bodyRuns = Array.isArray(body)
    ? body
    : [txt(body, { size: 17, color: C.dark })];
  const p = para(
    [txt(`${label}:  `, { bold: true, size: 17, color }), ...bodyRuns],
    { spacing: { after: opts.spacingAfter ?? 100 } }
  );
  return [p];
}

const goldCallout = (label, body) => labeledPara(label, body, C.gold);
const greenCallout = (label, body) => labeledPara(label, body, C.green);
const redCallout = (label, body) => labeledPara(label, body, C.red);
const tealCallout = (label, body) => labeledPara(label, body, C.teal);
const blueCallout = (label, body) => labeledPara(label, body, C.blue);
const purpleCallout = (label, body) => labeledPara(label, body, C.purple);

const clinicalFlag = (label, body) => labeledPara(label, body, C.flagRed);
const watchFlag = (label, body) => labeledPara(label, body, C.flagAmber);
const clearFlag = (label, body) => labeledPara(label, body, C.flagGreen);

// ── RUNNING HEADER / FOOTER ──────────────────────────────────────────────
// 2-column table, gold hairline rule beneath — present on every page.
function buildHeader(clientName, subtitleLine) {
  const colWidths = [5220, 5220];
  const left = cell(
    [para([txt('BRACE LIFE STUDIOS', { bold: true, size: 18, color: C.gold, characterSpacing: 100 })])],
    { width: colWidths[0] }
  );
  const right = cell(
    [para([txt(`ICONS INDEX  |  ${clientName.toUpperCase()}  |  ${subtitleLine}`, { size: 13, color: C.mid, characterSpacing: 10 })], { alignment: AlignmentType.RIGHT })],
    { width: colWidths[1] }
  );
  const table = new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [new TableRow({ children: [left, right] })],
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: C.gold },
    },
  });
  return new Header({ children: [table] });
}

function buildFooter(clientName, footerRight) {
  const p = new Paragraph({
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.gold, space: 1 } },
    tabStops: [{ type: TabStopType.RIGHT, position: TW }],
    spacing: { before: 80 },
    children: [
      txt('Brace Life Studios  |  Confidential  |  bracelifestudios.com', { size: 16, color: C.mid }),
      txt('\t', { size: 16 }),
      txt(footerRight, { size: 16, color: C.mid }),
    ],
  });
  return new Footer({ children: [p] });
}

// ── COVER BLOCKS ──────────────────────────────────────────────────────
function coverHeader(clientName, programTitle, subtitleLine) {
  const els = [];
  els.push(para([txt(programTitle.toUpperCase(), { bold: true, size: 52, color: C.gold, characterSpacing: 30 })], {
    alignment: AlignmentType.CENTER, spacing: { after: 40 },
  }));
  if (subtitleLine) {
    els.push(para([txt(subtitleLine.toUpperCase(), { size: 22, color: C.dark })], {
      alignment: AlignmentType.CENTER, spacing: { after: 30 },
    }));
  }
  els.push(para([txt('————————————————————', { size: 20, color: C.goldHead })], {
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
  }));
  els.push(para([txt(clientName, { bold: true, size: 40, color: C.dark })], {
    alignment: AlignmentType.CENTER, spacing: { after: 20 },
  }));
  return els;
}

function clientStats(stats) {
  return [para(
    [txt(stats.join('  ·  '), { italics: true, size: 17, color: C.mid })],
    { alignment: AlignmentType.CENTER, spacing: { after: 100 } }
  )];
}

function sectionTitle(title, color = C.gold) {
  return para(
    [txt(title, { bold: true, size: 17, color })],
    {
      spacing: { before: 120, after: 80 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color, space: 2 } },
    }
  );
}

// ── WEEK OVERVIEW (single-row day strip, up to 7 columns) ───────────────
function weekOverview(days) {
  const colWidths = evenWidths(days.length);
  const cells = days.map((d, i) => {
    const iv = ivOf(d.intensity);
    const isOff = d.intensity === 'Off' || d.intensity === undefined;
    const accent = isOff ? C.mid : iv.accent;
    return cell(
      [
        para(txtLines(d.day, { bold: true, size: 17, color: accent }), { alignment: AlignmentType.CENTER, spacing: { after: 20 } }),
        para(txtLines(iv.label, { bold: true, size: 22, color: accent }), { alignment: AlignmentType.CENTER, spacing: { after: 20 } }),
        para(txtLines(d.focus, { size: 12, color: C.dark }), { alignment: AlignmentType.CENTER }),
      ],
      { fill: isOff ? C.offGray : 'FFFFFF', width: colWidths[i], margins: { top: 60, bottom: 60, left: 40, right: 40 } }
    );
  });
  return [fullWidthTable([new TableRow({ children: cells })], colWidths), spacer(120)];
}

// ── BASELINES ──────────────────────────────────────────────────────────
// targetHeaderLabel defaults to the Kelly Mulroy reference's "8-WEEK TARGET"
// — override for clients on a different progression cadence (e.g. Aimee's
// 4-week block: "TRAINING LOAD · 4-WEEK TARGET").
function baselinesTable(rows, targetHeaderLabel = '8-WEEK TARGET') {
  const colWidths = [2600, 1600, 1400, 4840];
  const headerLabels = ['LIFT', 'BASELINE', 'TESTED AT', targetHeaderLabel];
  const header = new TableRow({
    children: headerLabels.map((h, i) => cell(
      [para([txt(h, { bold: true, size: 14, color: C.goldDeep })], { alignment: i === 0 || i === 3 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: C.goldHead, width: colWidths[i] }
    )),
  });
  const body = rows.map((r, i) => new TableRow({
    children: r.map((val, j) => cell(
      [para([txt(String(val), { size: j === 0 ? 17 : 16, color: j === 0 ? C.dark : C.mid, bold: j === 0 })], { alignment: j === 0 || j === 3 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: i % 2 === 0 ? C.goldPale : 'FFFFFF', width: colWidths[j] }
    )),
  }));
  return [fullWidthTable([header, ...body], colWidths), spacer(100)];
}

// ── STYKU BLOCK ────────────────────────────────────────────────────────
function stykuBlock(styku) {
  const els = [sectionTitle('Styku Body Composition Scan', C.teal)];
  els.push(para([txt(`Scan Date: ${styku.scanDate}`, { size: 14, italics: true, color: C.mid })], { spacing: { after: 80 } }));

  const colWidths = [5220, 5220];
  const leftCol = [
    ['Body Fat %', `${styku.bodyFatPct}% (${styku.bodyFatRank})`],
    ['Lean Mass', `${styku.leanMass} lbs (${styku.leanMassPct}%)`],
    ['Fat Mass', `${styku.fatMass} lbs`],
    ['Bone Mass', `${styku.boneMass} lbs`],
    ['BMI', styku.bmi],
    ['BMR', `${styku.bmr} cal/day`],
  ];
  const rightCol = [
    ['VFA (Visceral Fat)', `${styku.vfa} cm²`],
    ['Shape Score', `${styku.shapeScore}/100 — ${styku.shapeScoreLabel}`],
    ['ALST Index', `${styku.alstIndex} kg/m²`],
    ['Left Arm LST', `${styku.leftArmLST} lbs`],
    ['Right Arm LST', `${styku.rightArmLST} lbs`],
    ['Left / Right Leg LST', `${styku.leftLegLST} / ${styku.rightLegLST} lbs`],
  ];
  const rows = [];
  for (let i = 0; i < Math.max(leftCol.length, rightCol.length); i++) {
    const l = leftCol[i], r = rightCol[i];
    rows.push(new TableRow({
      children: [
        cell([para([txt(l ? l[0] : '', { size: 13, color: C.mid })]), para([txt(l ? String(l[1]) : '', { size: 15, bold: true, color: C.dark })])], { fill: i % 2 === 0 ? HUES.teal.stripe : 'FFFFFF', width: colWidths[0] }),
        cell([para([txt(r ? r[0] : '', { size: 13, color: C.mid })]), para([txt(r ? String(r[1]) : '', { size: 15, bold: true, color: C.dark })])], { fill: i % 2 === 0 ? HUES.teal.stripe : 'FFFFFF', width: colWidths[1] }),
      ],
    }));
  }
  els.push(fullWidthTable(rows, colWidths));
  els.push(spacer(100));
  if (styku.peerComparison) {
    els.push(...tealCallout('Peer Comparison', styku.peerComparison));
  }
  return els;
}

// ── NUTRITION TARGETS (shared calc) ─────────────────────────────────────
// Women 50+ or ALST At-Risk: 2.0–2.2 g/kg/day. Women 40+: 1.8–2.0 g/kg/day.
// Active women general: ≥1.6 g/kg/day. Per meal: ~0.4 g/kg (leucine threshold).
// Source: Morton 2018 meta-analysis + anabolic resistance research.
function proteinTargets(client) {
  const atRisk = client.alstIndex !== undefined && client.alstIndex < 5.5;
  const is50Plus = client.ageYears >= 50;
  const is40Plus = client.ageYears >= 40;
  let low, high, tier;
  if (atRisk || is50Plus) {
    low = 2.0; high = 2.2;
    tier = atRisk && is50Plus ? 'ALST At-Risk / 50+ tier' : atRisk ? 'ALST At-Risk tier' : '50+ tier';
  }
  else if (is40Plus) { low = 1.8; high = 2.0; tier = '40+ tier'; }
  else { low = 1.6; high = 1.6; tier = 'active women general tier'; }

  const proteinLow = Math.round(client.weightKg * low);
  const proteinHigh = Math.round(client.weightKg * high);
  const perMeal = Math.round(client.weightKg * 0.4);

  return { atRisk, low, high, tier, proteinLow, proteinHigh, perMeal };
}

// ── NUTRITION BLOCK ───────────────────────────────────────────────────
function nutritionBlock(client) {
  const els = [sectionTitle('Evidence-Based Nutrition Targets', C.gold)];
  const { atRisk, low, high, tier, proteinLow, proteinHigh, perMeal } = proteinTargets(client);

  els.push(...goldCallout(
    'Daily Protein Target',
    [
      txt(`${proteinLow}–${proteinHigh}g/day`, { bold: true, size: 20, color: C.dark }),
      txt(`  (${low.toFixed(1)}–${high.toFixed(1)} g/kg — ${tier})  `, { size: 15, color: C.mid }),
      txt(`~${perMeal}g per meal minimum (leucine threshold), distributed across 4+ meals/day.`, { size: 17, color: C.dark }),
    ]
  ));

  // Strongly indicated: women 40+, ALST At-Risk, postmenopausal (not ALST alone).
  const creatineStrong = atRisk || client.ageYears >= 40 || client.isPostmenopausal;
  if (creatineStrong) {
    const reason = atRisk
      ? 'ALST Index below the 5.5 kg/m² sarcopenia-risk threshold.'
      : client.isPostmenopausal
        ? 'Postmenopausal status.'
        : 'Age 40+.';
    els.push(...clinicalFlag(
      'Creatine — Strongly Indicated',
      `${reason} Prescribe 3–5g creatine monohydrate daily with food, no loading phase. Saturates in 3–4 weeks. Supports strength, power, cognition, and bone density.`
    ));
  } else {
    els.push(...tealCallout(
      'Creatine',
      '3–5g creatine monohydrate daily with food, no loading phase. Indicated for all women in strength training.'
    ));
  }

  els.push(...blueCallout(
    'Collagen Protocol',
    '15g collagen peptides + 50mg Vitamin C, taken 30–60 minutes before the loading session. Doubles collagen synthesis markers when paired with mechanical load (Shaw et al. 2017).'
  ));

  return els;
}

// ── PROTEIN BAR ────────────────────────────────────────────────────────
// Compact reminder — same labeledPara style as everything else — auto-
// inserted on EVERY training day page for ALST At-Risk clients.
function proteinBar(client) {
  const { proteinLow, proteinHigh } = proteinTargets(client);
  return labeledPara('Protein Reminder', `Target ${proteinLow}–${proteinHigh}g today, 4+ meals. Creatine 3–5g with a meal.`, C.gold);
}

// ── PELVIC FLOOR CALLOUT ──────────────────────────────────────────────
// Mandatory on every training day page for postmenopausal clients —
// triggers: heavy carries, squats, deadlifts, hip thrusts at high loads.
function pelvicFloorCallout() {
  return watchFlag(
    'Pelvic Floor Safety Note',
    'Brace before lifting, exhale on exertion — no breath-holding. If you experience any leaking, heaviness, or pressure, stop and flag your coach. This is common and treatable.'
  );
}

// ── DAY HEADER ─────────────────────────────────────────────────────────
// badgeOverride: optional { label, sub } to replace the default intensity
// label/"INTENSITY" sub-label — for non-%-graded programs (e.g. letter-named
// days) where showing a borrowed intensity value (like "AR") would misstate
// what the day actually is. Pass sub: '' to omit the sub-label entirely.
function dayHeader(intensity, title, subtitle, descriptor, badgeOverride) {
  const iv = ivOf(intensity);
  const colWidths = [1600, 8840];
  const badgeLabel = badgeOverride ? badgeOverride.label : iv.label;
  const badgeSub = badgeOverride ? (badgeOverride.sub ?? '') : 'INTENSITY';
  const badge = cell(
    [
      para(txtLines(badgeLabel, { bold: true, size: 36, color: C.white }), { alignment: AlignmentType.CENTER, spacing: { after: badgeSub ? 20 : 0 } }),
      ...(badgeSub ? [para([txt(badgeSub, { bold: true, size: 13, color: C.white })], { alignment: AlignmentType.CENTER })] : []),
    ],
    { fill: iv.accent, width: colWidths[0], vAlign: VerticalAlign.CENTER }
  );
  const titleCell = cell(
    [
      para([txt(title.toUpperCase(), { bold: true, size: 26, color: iv.accent })], { spacing: { after: 30 } }),
      para([txt(subtitle, { bold: true, size: 19, color: C.dark })], { spacing: { after: 30 } }),
      para([txt(descriptor.toUpperCase(), { bold: true, size: 14, color: iv.accent })]),
    ],
    { fill: iv.pale, width: colWidths[1], vAlign: VerticalAlign.CENTER, margins: { top: 60, bottom: 60, left: 120, right: 120 } }
  );
  return [
    fullWidthTable([new TableRow({ children: [badge, titleCell] })], colWidths),
    spacer(100),
  ];
}

function intensityPara(label, text) {
  return labeledPara(label, text, undefined, { spacingAfter: 100 });
}

// ── EXERCISE TABLE ────────────────────────────────────────────────────
const EX_COLS = { EXERCISE: 2400, SETS: 380, REPS: 420, LOAD: 680, TEMPO: 540, REST: 440, CUE: 5580 };
const EX_COL_WIDTHS = [EX_COLS.EXERCISE, EX_COLS.SETS, EX_COLS.REPS, EX_COLS.LOAD, EX_COLS.TEMPO, EX_COLS.REST, EX_COLS.CUE];

function blockLabel(letter, title, colorKey, day, introLabel, intro) {
  const accent = colorKey ? hueOf(colorKey).accent : ivOf(day.intensity).accent;
  const els = [para(
    [txt(`${letter} — ${title}`, { bold: true, size: 17, color: accent })],
    { spacing: { before: 120, after: 60 } }
  )];
  if (intro) {
    els.push(...labeledPara(introLabel || 'Note', intro, accent, { spacingAfter: 80 }));
  }
  return els;
}

function exTable(exercises, colorKey) {
  const hue = hueOf(colorKey);
  const headers = ['EXERCISE', 'SETS', 'REPS', 'LOAD', 'TEMPO', 'REST', 'COACHING CUE'];
  const header = new TableRow({
    children: headers.map((h, i) => cell(
      [para([txt(h, { bold: true, size: i === 0 || i === 6 ? 15 : 13, color: hue.accent })], { alignment: i === 0 || i === 6 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: hue.tableHead, width: EX_COL_WIDTHS[i] }
    )),
  });

  const rows = exercises.map((ex, i) => {
    const nameParas = [para([txt(ex.name, { bold: true, size: 18, color: C.dark })])];
    if (ex.flag) {
      nameParas.push(para([txt(ex.flag, { italics: true, size: 14, color: C.flagRed })]));
    }
    let cueRuns = [txt(ex.cue || '', { size: 17, color: C.mid })];
    if (ex.rirNote) {
      cueRuns.push(txt(`  ${ex.rirNote}`, { size: 14, color: C.teal, italics: true }));
    }
    const fill = i % 2 === 0 ? hue.stripe : 'FFFFFF';
    return new TableRow({
      children: [
        cell(nameParas, { fill, width: EX_COLS.EXERCISE }),
        cell([para([txt(ex.sets || '', { size: 15, color: C.mid })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.SETS }),
        cell([para([txt(ex.reps || '', { size: 15, color: C.mid })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.REPS }),
        cell([para([txt(ex.load || '', { size: 15, color: C.mid })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.LOAD }),
        cell([para([txt(ex.tempo || '', { size: 15, color: C.mid })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.TEMPO }),
        cell([para([txt(ex.rest || '', { size: 15, color: C.mid })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.REST }),
        cell([para(cueRuns)], { fill, width: EX_COLS.CUE }),
      ],
    });
  });

  return [fullWidthTable([header, ...rows], EX_COL_WIDTHS), spacer(100)];
}

// ── WEEKLY SUMMARY ─────────────────────────────────────────────────────
function weeklySummary(rows) {
  const colWidths = [1200, 1000, 2040, 2200, 4000];
  const headers = ['DAY', 'INTENSITY', 'FOCUS', 'KEY LIFTS', 'PROGRESSION TARGETS'];
  const header = new TableRow({
    children: headers.map((h, i) => cell(
      [para([txt(h, { bold: true, size: 14, color: C.goldDeep })], { alignment: AlignmentType.CENTER })],
      { fill: C.goldHead, width: colWidths[i] }
    )),
  });
  const body = rows.map((r, i) => new TableRow({
    children: r.map((val, j) => cell(
      [para([txt(String(val), { size: 14, color: j === 0 ? C.gold : C.dark, bold: j === 0 })], { alignment: j === 0 ? AlignmentType.CENTER : AlignmentType.LEFT })],
      { fill: i % 2 === 0 ? C.goldPale : 'FFFFFF', width: colWidths[j] }
    )),
  }));
  return [fullWidthTable([header, ...body], colWidths), spacer(100)];
}

// ── PROGRESSION / MILESTONE BLOCKS ────────────────────────────────────
function progressionBlock() {
  return labeledPara(
    'Progression Rule — RIR Model',
    [
      txt('Add weight ', { bold: true, size: 17, color: C.dark }), txt('at top of rep range + 2 RIR + clean form. ', { size: 17, color: C.dark }),
      txt('Same weight ', { bold: true, size: 17, color: C.dark }), txt('if form degraded on final reps. ', { size: 17, color: C.dark }),
      txt('Drop weight ', { bold: true, size: 17, color: C.dark }), txt('on missed reps, pain, or excess fatigue.', { size: 17, color: C.dark }),
    ],
    C.teal
  );
}

function milestoneTracker(m4wk, m8wk, rescanNote) {
  const els = [];
  els.push(...goldCallout('4-Week Milestones', m4wk));
  els.push(...goldCallout('8-Week Milestones', m8wk));
  if (rescanNote) {
    els.push(...goldCallout('Week 8 Re-Scan', rescanNote));
  }
  return els;
}

// ── DOCUMENT ASSEMBLY ─────────────────────────────────────────────────
// Heavy hip-loading pattern check — squats, deadlifts/RDLs, hip thrusts,
// loaded carries, lunges — the pelvic floor trigger list.
const HEAVY_LOAD_PATTERN = /squat|deadlift|\brdl\b|hip thrust|carry|lunge/i;
function dayHasHeavyLoading(day) {
  return (day.blocks || []).some((block) =>
    (block.exercises || []).some((ex) => HEAVY_LOAD_PATTERN.test(ex.name || ''))
  );
}

function buildDayContent(day, client) {
  const els = [];
  els.push(...dayHeader(day.intensity, day.title, day.subtitle, day.descriptor, day.badge));
  els.push(...intensityPara(day.intensityLabel || `${ivOf(day.intensity).label} Day`, day.intensityPara));

  if (client && client.alstIndex !== undefined && client.alstIndex < 5.5) {
    els.push(...proteinBar(client));
  }

  if (day.warmUp) els.push(...labeledPara('Warm-Up', day.warmUp, C.warmGreen));

  if (client && client.isPostmenopausal && day.pelvicFloor !== false && dayHasHeavyLoading(day)) {
    els.push(...pelvicFloorCallout());
  }

  (day.blocks || []).forEach((block) => {
    els.push(...blockLabel(block.letter, block.title, block.color, day, block.introLabel, block.intro));
    els.push(...exTable(block.exercises, block.color || ivOf(day.intensity).hue));
  });

  if (day.coolDown) els.push(...labeledPara('Cool-Down', day.coolDown, C.blue));
  if (day.iconsNote) els.push(...labeledPara('ICONS Note', day.iconsNote, C.gold));

  return els;
}

async function buildDocument(data) {
  const children = [];
  const client = data.client;

  children.push(...coverHeader(client.name, client.programTitle, client.subtitle));
  if (client.stats && client.stats.length) children.push(...clientStats(client.stats));

  if (data.weekOverview) children.push(...weekOverview(data.weekOverview));
  if (data.styku) children.push(...stykuBlock(data.styku));

  if (data.baselines) {
    children.push(sectionTitle('Strength Baselines — Established'));
    children.push(...baselinesTable(data.baselines, data.baselinesTargetHeader));
  }

  if (data.baselineNotes) {
    const fnMap = {
      green: greenCallout, gold: goldCallout, red: redCallout, teal: tealCallout, blue: blueCallout, purple: purpleCallout,
      clinical: clinicalFlag, watch: watchFlag, clear: clearFlag,
    };
    data.baselineNotes.forEach((n) => {
      const fn = fnMap[n.type] || goldCallout;
      children.push(...fn(n.label, n.body));
    });
    children.push(spacer(80));
  }

  if (data.includeNutritionBlock !== false) {
    children.push(...nutritionBlock(client));
  }

  (data.days || []).forEach((day) => {
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(...buildDayContent(day, client));
    if (data.includeProgressionBlock !== false) {
      children.push(...progressionBlock());
    }
  });

  if (data.summary) {
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(para([txt('WEEKLY SUMMARY & PROGRESSION TARGETS', { bold: true, size: 28, color: C.gold })], {
      alignment: AlignmentType.CENTER, spacing: { after: 40 },
    }));
    if (data.summary.subtitle) {
      children.push(para([txt(data.summary.subtitle, { italics: true, size: 17, color: C.mid })], {
        alignment: AlignmentType.CENTER, spacing: { after: 100 },
      }));
    }
    if (data.summary.rows) children.push(...weeklySummary(data.summary.rows));
    children.push(...milestoneTracker(data.summary.milestones4wk, data.summary.milestones8wk, data.summary.rescanNote));

    children.push(spacer(160));
    children.push(para([txt(`BRACE LIFE STUDIOS  ·  ICONS INDEX  ·  bracelifestudios.com`, { bold: true, size: 18, color: C.gold })], {
      alignment: AlignmentType.CENTER, spacing: { after: 40 },
    }));
    children.push(para([txt(`This training plan is confidential and prepared exclusively for ${client.name}.`, { italics: true, size: 16, color: C.mid })], {
      alignment: AlignmentType.CENTER,
    }));
  }

  const headerSubtitle = client.subtitle || client.programTitle;
  const footerRight = `${client.name}  |  ${client.programTitle}  |  ${client.schedule || ''}`.replace(/\s*\|\s*$/, '');

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: PAGE_H },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        headers: { default: buildHeader(client.name, headerSubtitle) },
        footers: { default: buildFooter(client.name, footerRight) },
        children,
      },
    ],
    styles: {
      default: {
        document: { run: { font: FONT, size: 17, color: C.dark } },
      },
    },
  });

  return Packer.toBuffer(doc);
}

module.exports = {
  buildDocument,
  C,
  coverHeader, clientStats, weekOverview, baselinesTable, stykuBlock,
  nutritionBlock, proteinTargets, proteinBar, pelvicFloorCallout,
  dayHeader, exTable, weeklySummary, progressionBlock, milestoneTracker,
  labeledPara,
  goldCallout, greenCallout, redCallout, tealCallout, blueCallout, purpleCallout,
  clinicalFlag, watchFlag, clearFlag,
  sectionTitle,
  epley1RM: (weight, reps) => Math.round(weight * (1 + reps / 30)),
  workingLoad: (oneRM, pct, roundTo = 5) => Math.round((oneRM * pct) / roundTo) * roundTo,
};
