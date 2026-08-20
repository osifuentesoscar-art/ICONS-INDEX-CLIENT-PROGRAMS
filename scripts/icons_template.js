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
  PageBreak, Header, Footer, TabStopType, TabStopPosition, PageNumber,
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

// Client View only — a short, warm line under the cover name reinforcing
// the ICONS mission. Uses the Three Zone coaching cues (CLAUDE.md's "ICONS
// TRAINING PHILOSOPHY" section) rather than the "You're not fragile..."
// mantra used elsewhere in this system — that phrase is explicitly scoped
// there to the women 40s-60s target population, and a Client View Client
// audit (8/17/2026) found it firing unconditionally for male clients whose
// own build scripts had separately, deliberately chosen not to use it (see
// Jake Poyner's script). The three-zone cues are stated as genuinely
// universal in CLAUDE.md — no sex/demographic scoping — so they're the
// safe default for a line the engine inserts for every client.
function clientWelcomeLine() {
  return [para(
    [txt('This is your ICONS Index program — built for your body, your goals, and where you are right now. Control precedes power. Strength builds confidence. Energy becomes identity.', { italics: true, size: 17, color: C.goldDeep })],
    { alignment: AlignmentType.CENTER, spacing: { after: 140 } }
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
// Second param accepts either the historical single-string override (only
// the 4th/target header changes, "LIFT"/"BASELINE"/"TESTED AT" stay fixed —
// existing behavior, unchanged) or a full 4-string array to relabel every
// column (e.g. ['MOVEMENT','BASELINE','FORMAT','COACHING NOTE'] for a
// non-client-plan reuse of this schema — see ICONS Baseline Sheets).
function baselinesTable(rows, targetHeaderLabelOrHeaders = '8-WEEK TARGET') {
  const colWidths = [2600, 1600, 1400, 4840];
  const headerLabels = Array.isArray(targetHeaderLabelOrHeaders)
    ? targetHeaderLabelOrHeaders
    : ['LIFT', 'BASELINE', 'TESTED AT', targetHeaderLabelOrHeaders];
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
// Partial-field behavior (added 8/18/2026): a styku object may carry any
// SUBSET of the standard scan fields — a missing field's row is omitted
// entirely, never interpolated as a literal "undefined". Motivating
// precedent: Johanna Castillo's 8/18/2026 build, where only 6 of the 12
// fields were on record and this function's unconditional interpolation
// forced a hand-composed substitute section; several intake-pending
// clients are expected to arrive with similarly partial scan records.
// Rules:
//   - A field is "missing" when null/undefined; 0 is a real value.
//   - Sub-label fields (bodyFatRank, leanMassPct, shapeScoreLabel) drop
//     only their own parenthetical/suffix, not the parent row.
//   - Segmental L/R pairs render only when BOTH sides are present — a
//     one-sided LST comparison is meaningless. If both pairs are absent,
//     no segmental rows render at all.
//   - A missing scanDate omits the date line — never fabricated or
//     defaulted. The section still renders.
// A COMPLETE object renders identically to the pre-8/18/2026 output (the
// two-column split below reproduces the historical fixed 6/6 layout) —
// verified empirically via regenerate-and-diff against Johanna Castillo,
// Mary Burfete, Siobhan Hansen, and August Olivia (all full-scan clients).
function stykuBlock(styku) {
  const has = (v) => v !== undefined && v !== null;
  const els = [sectionTitle('Styku Body Composition Scan', C.teal)];
  if (has(styku.scanDate)) {
    els.push(para([txt(`Scan Date: ${styku.scanDate}`, { size: 14, italics: true, color: C.mid })], { spacing: { after: 80 } }));
  }

  const colWidths = [5220, 5220];
  const entries = [];
  if (has(styku.bodyFatPct)) entries.push(['Body Fat %', `${styku.bodyFatPct}%${has(styku.bodyFatRank) ? ` (${styku.bodyFatRank})` : ''}`]);
  if (has(styku.leanMass)) entries.push(['Lean Mass', `${styku.leanMass} lbs${has(styku.leanMassPct) ? ` (${styku.leanMassPct}%)` : ''}`]);
  if (has(styku.fatMass)) entries.push(['Fat Mass', `${styku.fatMass} lbs`]);
  if (has(styku.boneMass)) entries.push(['Bone Mass (Styku est.)', `${styku.boneMass} lbs`]);
  if (has(styku.bmi)) entries.push(['BMI', styku.bmi]);
  if (has(styku.bmr)) entries.push(['BMR', `${styku.bmr} cal/day`]);
  if (has(styku.vfa)) entries.push(['VFA (Visceral Fat)', `${styku.vfa} cm²`]);
  if (has(styku.shapeScore)) entries.push(['Shape Score', `${styku.shapeScore}/100${has(styku.shapeScoreLabel) ? ` — ${styku.shapeScoreLabel}` : ''}`]);
  if (has(styku.alstIndex)) entries.push(['ALST Index', `${styku.alstIndex} kg/m²`]);
  if (has(styku.leftArmLST) && has(styku.rightArmLST)) {
    entries.push(['Left Arm LST', `${styku.leftArmLST} lbs`]);
    entries.push(['Right Arm LST', `${styku.rightArmLST} lbs`]);
  }
  if (has(styku.leftLegLST) && has(styku.rightLegLST)) {
    entries.push(['Left / Right Leg LST', `${styku.leftLegLST} / ${styku.rightLegLST} lbs`]);
  }

  // Two-column split: left column takes the first ceil(n/2) entries. With
  // all 12 present this is exactly the historical 6-left/6-right layout
  // (Body Fat → BMR left; VFA → Leg LST right) — the backward-compatibility
  // hard requirement.
  const splitAt = Math.ceil(entries.length / 2);
  const leftCol = entries.slice(0, splitAt);
  const rightCol = entries.slice(splitAt);
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
  if (rows.length) {
    els.push(fullWidthTable(rows, colWidths));
    els.push(spacer(100));
  }
  if (styku.peerComparison) {
    els.push(...tealCallout('Peer Comparison', styku.peerComparison));
  }
  return els;
}

// ── ASYMMETRY — WEAKER SIDE HELPER ──────────────────────────────────────
// Lower LST = weaker = leads unilateral work (see CLAUDE.md's Asymmetry
// Protocol and Common Mistakes sections — getting this backwards is a
// documented real bug, not a hypothetical one). Returns 'left'|'right'|
// 'even'. A gap under ~0.1 lbs is treated as noise-level "even" to avoid
// false precision on scan data — this is a small, separate comparison
// threshold, not the 0.5 lb gap CLAUDE.md's Asymmetry Protocol uses to
// decide whether the full protocol applies at all.
function weakerSide(leftLST, rightLST) {
  const gap = leftLST - rightLST;
  if (Math.abs(gap) < 0.1) return 'even';
  return gap < 0 ? 'left' : 'right';
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
  // Corrected 8/17/2026 (applied to the engine 8/19/2026): ~0.3 g/kg/meal
  // (≈25-40g, 4 meals spaced 3-4h) per the ISSN serving guidance and the
  // ~0.31 g/kg MPS-maximizing dose — the old 0.4 g/kg figure exceeded both.
  // Leucine framing downgraded to approximate, per the same correction.
  const perMeal = Math.round(client.weightKg * 0.3);

  return { atRisk, low, high, tier, proteinLow, proteinHigh, perMeal };
}

// ── NUTRITION BLOCK ───────────────────────────────────────────────────
function nutritionBlock(client) {
  const els = [sectionTitle('Evidence-Based Nutrition Targets', C.gold)];
  const { atRisk, low, high, tier, proteinLow, proteinHigh, perMeal } = proteinTargets(client);

  // When a tier's endpoints coincide (e.g. the 1.6 g/kg active-women
  // baseline), render a single value — "110–110g/day (1.6–1.6 g/kg)" was a
  // real, client-visible display artifact (flagged 8/19/2026, Kelly Mulroy
  // travel-plan audit). Range tiers render exactly as before.
  const gramsText = proteinLow === proteinHigh ? `${proteinLow}g/day` : `${proteinLow}–${proteinHigh}g/day`;
  const gkgText = low === high ? `${low.toFixed(1)} g/kg` : `${low.toFixed(1)}–${high.toFixed(1)} g/kg`;
  els.push(...goldCallout(
    'Daily Protein Target',
    [
      txt(gramsText, { bold: true, size: 20, color: C.dark }),
      txt(`  (${gkgText} — ${tier})  `, { size: 15, color: C.mid }),
      txt(`~${perMeal}g per meal (≈0.3 g/kg), across 4 meals spaced 3–4 hours apart.`, { size: 17, color: C.dark }),
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
      `${reason} 3–5g creatine monohydrate daily with food, no loading phase. Saturates in 3–4 weeks. Well-supported for strength, power, and cognition; bone-density evidence is mixed, not settled — a possible upside alongside LIFTMOR-style loading, not a substitute for it.`
    ));
  } else {
    els.push(...tealCallout(
      'Creatine',
      '3–5g creatine monohydrate daily with food, no loading phase. Indicated for all women in strength training.'
    ));
  }

  els.push(...blueCallout(
    'Collagen Protocol',
    '15g collagen peptides + 50mg Vitamin C, taken 45–60 minutes before the loading session. A connective-tissue support protocol taken consistently on training days over 12+ weeks — the benefit is structural and builds over time, not a pre-workout performance boost. Requires mechanical load to work. Ranks below protein and creatine in priority (Shaw et al. 2017).'
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

// ── MALE PROTEIN TARGETS (shared calc) — Male Client Programming Framework
// General resistance-trained-male range: 1.6–2.2 g/kg/day (ISSN 2017
// position stand + Morton et al. 2018 meta-analysis — the same meta-
// analysis already cited for the women's tiers above; its trial pool was
// not sex-restricted). Unlike proteinTargets() above, the male framework
// in CLAUDE.md documents no cited hard age-tier escalation — only a soft
// judgment call to "trend toward the upper end of the range" once a
// client is 40+. This function mirrors that deliberately: it always
// returns the full 1.6–2.2 g/kg range (proteinLow/proteinHigh), plus a
// narrower "working" sub-range (workingLow/workingHigh) that nudges
// toward the top of that same range for 40+ clients — not a distinct,
// separately-cited tier the way the women's 40+/50+ brackets are.
//
// `client.maleBodyFatConcern` (optional, boolean, default false/undefined —
// backward compatible, no behavior change for a client that doesn't set
// it): mirrors how proteinTargets() above checks `client.alstIndex` to
// decide its own escalation. There is no ALST-based protein escalation
// cited for men, so this instead ties to the one composition-based finding
// CLAUDE.md's Male Client Programming Framework actually documents — an
// ACE body-fat-% tier reading worse than a client's BMI/ALST alone would
// suggest (e.g. Vinz Feller: "Average" per Styku's peer-comparison rank,
// but "Obese" tier per the ACE male body-fat-% reference table). When set,
// the working sub-range escalates to the TOP of the cited 1.6-2.2 g/kg
// range (2.0-2.2 g/kg) rather than just nudging to 1.9 g/kg for age alone
// — this is what reproduces Vinz's original hand-written 150-165g/day
// target once his real weight is run through it. Still inside the cited
// range; not a new invented threshold.
function maleProteinTargets(client) {
  const low = 1.6, high = 2.2;
  const trendUpper = client.ageYears !== undefined && client.ageYears >= 40;
  const bodyFatConcern = client.maleBodyFatConcern === true;
  // Escalation precedence: a documented body-fat-tier concern escalates
  // further than age alone (2.0 vs. 1.9 g/kg floor) — mirrors the women's
  // proteinTargets() pattern of a composition-driven finding outweighing a
  // bracket-only trend, just built on the male framework's own cited factor.
  let workLow = low;
  if (bodyFatConcern) workLow = 2.0;
  else if (trendUpper) workLow = 1.9; // soft nudge toward the top of the range, not a new tier
  const workHigh = high;

  const proteinLow = Math.round(client.weightKg * low);
  const proteinHigh = Math.round(client.weightKg * high);
  const workingLow = Math.round(client.weightKg * workLow);
  const workingHigh = Math.round(client.weightKg * workHigh);
  const perMeal = Math.round(client.weightKg * 0.4);

  return { low, high, proteinLow, proteinHigh, trendUpper, bodyFatConcern, workingLow, workingHigh, perMeal };
}

// ── MALE NUTRITION NOTE — protein + creatine callout ────────────────────
// The male-framework equivalent of nutritionBlock()/proteinTargets() above,
// built as a single goldCallout-style labeledPara rather than a full
// section (matching how Vinz Feller's document hand-wrote this before this
// helper existed). Not auto-inserted by buildDocument() — call explicitly
// from a male client's script and add the returned paragraphs to
// baselineNotes / day content as appropriate.
function maleNutritionNote(client) {
  const t = maleProteinTargets(client);
  let trendClause = '';
  if (t.bodyFatConcern && t.trendUpper) {
    trendClause = ` given both his age bracket (40+) and his ACE body-fat-% tier finding (see the Styku interpretation note above), the working target escalates to the top of that range — roughly ${t.workingLow}–${t.workingHigh}g/day —`;
  } else if (t.bodyFatConcern) {
    trendClause = ` given his ACE body-fat-% tier finding (see the Styku interpretation note above), the working target escalates to the top of that range — roughly ${t.workingLow}–${t.workingHigh}g/day —`;
  } else if (t.trendUpper) {
    trendClause = ` trending toward the upper end of that range is reasonable given his age (40+), landing around ${t.workingLow}–${t.workingHigh}g/day as a working target,`;
  }
  const body = `General resistance-trained-male range is ${t.low.toFixed(1)}–${t.high.toFixed(1)} g/kg/day (ISSN 2017 position stand; Morton et al. 2018 meta-analysis — the same source already cited for the women's 1.6 g/kg tier in this system, and its trial pool was not sex-restricted). At ${client.weightKg} kg that's roughly ${t.proteinLow}–${t.proteinHigh}g/day;${trendClause} at ~${t.perMeal}g per meal minimum (leucine threshold), distributed across 4+ meals/day. Creatine: 3–5g monohydrate daily with food, no loading phase — same protocol as any resistance-trained adult, saturates in 3–4 weeks.`;
  return labeledPara('Protein & Creatine Targets — Male Client Programming Framework', body, C.gold);
}

// ── TESTOSTERONE / ANDROPAUSE NOTE — informational, not diagnostic ──────
// Male-framework analog to how the women's HRT/MHT section is framed
// elsewhere in this system: never diagnostic, never presented as a
// substitute for medical care in either direction. Per CLAUDE.md's Male
// Client Programming Framework, this becomes a relevant conversation
// starting in the 40-59 bracket ("Midlife Androgen Decline & Sarcopenia
// Onset") — returns [] for a client younger than 40 (an easy no-op to
// spread, e.g. `els.push(...testosteroneNote(client))`), rather than
// auto-firing the way pelvicFloorCallout() does, since male-scope
// auto-detection isn't wired into buildDocument() the way
// client.isPostmenopausal is.
//
// Branches on the two separate CLAUDE.md brackets rather than lumping
// every 40+ client into one label — "40-59 — Midlife Androgen Decline &
// Sarcopenia Onset" and "60+ — Older Male / Bone-Density Priority" are
// distinct brackets with distinct framing. The 60+ bracket's own bullet
// list in CLAUDE.md is bone-density/power-training-first and carries no
// dedicated testosterone content of its own (beyond the general
// Testosterone & Resistance Training subsection's frail-70+ nuance), so
// its branch here stays deliberately shorter rather than inventing detail
// CLAUDE.md doesn't state for that bracket.
function testosteroneNote(client) {
  if (client.ageYears === undefined || client.ageYears < 40) return [];
  const who = client.name || 'this client';
  const is60Plus = client.ageYears >= 60;

  if (is60Plus) {
    const body = `At ${client.ageYears}, ${who} sits within the Male Client Programming Framework's 60+ bracket ("Older Male / Bone-Density Priority"). This bracket's programming priority is bone-density loading and power/fall-risk training, not a dedicated testosterone discussion — CLAUDE.md's Male Client Programming Framework carries thinner testosterone-specific content here than it does for the 40-59 bracket. The same posture still applies if it comes up: late-onset hypogonadism is a clinical diagnosis requiring persistent symptoms plus confirmed low morning serum testosterone on bloodwork — a referral conversation, not something inferred from a Styku scan or training performance. One nuance worth flagging for a client this age: the exercise-vs-testosterone evidence is more mixed in frail very-old men — a separate 52-week RCT in frail men 70+ with confirmed low T found testosterone + resistance training reduced fatigue versus controls, but the combined group did not significantly outperform other groups on a physical-performance test — so the "exercise matches or beats TRT alone" finding below should not be over-generalized to a frail client without that caveat.`;
    return labeledPara('Testosterone & Training — Informational Note, Not Diagnostic', body, C.teal);
  }

  const body = `At ${client.ageYears}, ${who} sits within the Male Client Programming Framework's 40-59 bracket ("Midlife Androgen Decline & Sarcopenia Onset"), where late-onset hypogonadism / TRT can become a relevant screening conversation IF he raises it — not something inferred from a Styku scan or training performance, and not raised unprompted. Late-onset hypogonadism is a clinical diagnosis requiring both persistent symptoms and confirmed low morning serum testosterone on bloodwork — a referral conversation, not a training assessment. Worth knowing: a 2024 study (Hildreth et al., Sports Medicine – Open) of men 50-70 with low-normal testosterone found structured exercise training matched or outperformed testosterone treatment alone for aerobic fitness, strength, and fat mass, with no additional benefit from adding testosterone on top of training. On or off TRT, the resistance training in this program is doing real, evidenced work for his strength, fitness, and body composition — this is not a substitute for medical care in either direction.`;
  return labeledPara('Testosterone & Training — Informational Note, Not Diagnostic', body, C.teal);
}

// ── PELVIC FLOOR CALLOUT ──────────────────────────────────────────────
// Mandatory on every training day page for postmenopausal clients —
// triggers: heavy carries, squats, deadlifts, hip thrusts at high loads.
// Language corrected 8/17/2026 (POGP 2024 clinical commentary, Prevett & Moore) —
// a blanket "no breath-holding" rule is not appropriate; intra-abdominal pressure
// strategy scales with load: free breathing on lighter work, exhale-on-exertion as
// the default, and a brief, controlled brace (which may include a short breath-hold)
// is normal and appropriate on the heaviest working sets.
function pelvicFloorCallout() {
  return watchFlag(
    'Pelvic Floor Safety Note',
    'Match your bracing to the load: breathe freely on lighter sets, exhale on exertion as your default, and use a brief, controlled brace on your heaviest working sets. If you experience any leaking, heaviness, or pressure, stop and flag your coach. This is common and treatable.'
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

function intensityPara(label, text, color) {
  return labeledPara(label, text, color, { spacingAfter: 100 });
}

// ── EXERCISE TABLE ────────────────────────────────────────────────────
const EX_COLS = { EXERCISE: 2400, SETS: 380, REPS: 420, LOAD: 680, TEMPO: 540, REST: 440, CUE: 5580 };
const EX_COL_WIDTHS = [EX_COLS.EXERCISE, EX_COLS.SETS, EX_COLS.REPS, EX_COLS.LOAD, EX_COLS.TEMPO, EX_COLS.REST, EX_COLS.CUE];

// introLabel: null (explicit) renders intro as a plain unlabeled paragraph —
// for trainer-education-style content where the intro reads as continuous
// prose rather than a labeled callout. Omitted/undefined keeps the default
// labeledPara behavior (bold "Note:" or custom label prefix).
function blockLabel(letter, title, colorKey, day, introLabel, intro) {
  const accent = colorKey ? hueOf(colorKey).accent : ivOf(day.intensity).accent;
  const els = [para(
    [txt(`${letter} — ${title}`, { bold: true, size: 17, color: accent })],
    { spacing: { before: 120, after: 60 } }
  )];
  if (intro) {
    if (introLabel === null) {
      els.push(para([txt(intro, { size: 17, color: C.dark })], { spacing: { after: 80 } }));
    } else {
      els.push(...labeledPara(introLabel || 'Note', intro, accent, { spacingAfter: 80 }));
    }
  }
  return els;
}

// isClientView: when true, an exercise's `flag`/`insight` sub-line is
// skipped if that exercise also carries `flagAudience: 'internal'` /
// `insightAudience: 'internal'` — the exercise-level counterpart to
// baselineNotes' `audience: 'internal'` filter above. Needed because
// `insight` sometimes carries build-rationale text written for a
// trainer/auditor (e.g. "Antagonist rotation — ...", explaining why an
// exercise was sequenced a certain way per CLAUDE.md's Antagonist
// Rotation Rule) rather than something a client needs to read — see the
// 8/17/2026 Client View pilot audit finding on Elizabeth Poynor's
// document, which is what surfaced this gap.
function exTable(exercises, colorKey, isClientView = false) {
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
    if (ex.flag && !(isClientView && ex.flagAudience === 'internal')) {
      nameParas.push(para([txt(ex.flag, { italics: true, size: 14, color: C.flagRed })]));
    }
    if (ex.insight && !(isClientView && ex.insightAudience === 'internal')) {
      nameParas.push(para([txt(ex.insight, { italics: true, size: 14, color: C.mid })]));
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
// headerLabels: optional 5-string override of the default DAY/INTENSITY/
// FOCUS/KEY LIFTS/PROGRESSION TARGETS headers — backward compatible, only
// used when a caller reuses this table's schema for non-weekly-summary
// content (e.g. a MOVEMENT/WK1/WK2/WK3/WK4 session log).
function weeklySummary(rows, headerLabels = ['DAY', 'INTENSITY', 'FOCUS', 'KEY LIFTS', 'PROGRESSION TARGETS']) {
  const colWidths = [1200, 1000, 2040, 2200, 4000];
  const headers = headerLabels;
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

function buildDayContent(day, client, isClientView = false) {
  const els = [];
  const iv = ivOf(day.intensity);
  els.push(...dayHeader(day.intensity, day.title, day.subtitle, day.descriptor, day.badge));
  // .replace() guards the AR fallback ('ACTIVE\nRECOV.') — intensityPara's label
  // is a single inline TextRun (unlike dayHeader's badge, which uses txtLines()
  // for real two-line rendering), so a raw \n here would show as a literal
  // stray break instead of wrapping. Every current day object sets
  // intensityLabel explicitly and never hits this fallback, but it's a real
  // landmine for anyone who doesn't.
  els.push(...intensityPara(day.intensityLabel || `${iv.label.replace(/\n/g, ' ')} Day`, day.intensityPara, iv.accent));

  if (client && client.alstIndex !== undefined && client.alstIndex < 5.5) {
    els.push(...proteinBar(client));
  }

  if (day.warmUp) els.push(...labeledPara('Warm-Up', day.warmUp, C.warmGreen));

  // day.forcePelvicFloor: true renders the callout regardless of
  // client.isPostmenopausal — for the CLAUDE.md "Perimenopausal Status —
  // Screening Ambiguity" case: a 45-55-bracket client with unconfirmed
  // status and real heavy-loading content should still get the written
  // safety language, not rely on isPostmenopausal being fabricated true
  // or on a purely verbal coaching workaround. Mirror of day.pelvicFloor:
  // false (which suppresses the auto-insert on a specific day).
  if (day.forcePelvicFloor === true || (client && client.isPostmenopausal && day.pelvicFloor !== false && dayHasHeavyLoading(day))) {
    els.push(...pelvicFloorCallout());
  }

  (day.blocks || []).forEach((block) => {
    els.push(...blockLabel(block.letter, block.title, block.color, day, block.introLabel, block.intro));
    els.push(...exTable(block.exercises, block.color || iv.hue, isClientView));
  });

  if (day.coolDown) els.push(...labeledPara('Cool-Down', day.coolDown, C.blue));
  if (day.iconsNote) els.push(...labeledPara('ICONS Note', day.iconsNote, C.gold));

  return els;
}

async function buildDocument(data) {
  const children = [];
  const client = data.client;
  // Client View mode (added 8/17/2026): the same buildDocument() call, on
  // the exact same `data` object, renders a client-safe copy of the
  // program instead of the full trainer/audit-trail document — so the
  // actual workout content (days/blocks/exercises/loads/Styku/baselines)
  // can never drift between the two. Set `data.viewMode = 'client'` to
  // activate. Only two things differ: (1) any baselineNotes item with
  // `audience: 'internal'` is dropped (judgment-call/methodology/
  // audit-trail notes meant for the trainer, not the client), and (2) an
  // optional `data.clientHighlight: {label, body}` (a real PR/progress
  // milestone) renders first, in the "milestone achieved" clearFlag style.
  const isClientView = data.viewMode === 'client';

  children.push(...coverHeader(client.name, client.programTitle, client.subtitle));
  if (isClientView) children.push(...clientWelcomeLine());
  if (client.stats && client.stats.length) children.push(...clientStats(client.stats));

  if (data.weekOverview) children.push(...weekOverview(data.weekOverview));
  if (data.styku) children.push(...stykuBlock(data.styku));

  if (data.baselines) {
    children.push(sectionTitle('Strength Baselines — Established'));
    children.push(...baselinesTable(data.baselines, data.baselinesTargetHeader));
  }

  if (isClientView && data.clientHighlight) {
    children.push(...clearFlag(data.clientHighlight.label, data.clientHighlight.body));
  }

  if (data.baselineNotes) {
    const fnMap = {
      green: greenCallout, gold: goldCallout, red: redCallout, teal: tealCallout, blue: blueCallout, purple: purpleCallout,
      clinical: clinicalFlag, watch: watchFlag, clear: clearFlag,
    };
    const notes = isClientView ? data.baselineNotes.filter((n) => n.audience !== 'internal') : data.baselineNotes;
    notes.forEach((n) => {
      // n.render: an already-built paragraph array (e.g. the output of
      // maleNutritionNote()/testosteroneNote(), which — like goldCallout/
      // tealCallout — bake their own label/color internally) can be
      // spliced in directly instead of going through the type/label/body
      // dispatch below. Backward compatible: existing {type,label,body}
      // items are unaffected.
      if (n.render) { children.push(...n.render); return; }
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
    children.push(...buildDayContent(day, client, isClientView));
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

// ── COMPARISON TABLE (Brace Life Improvement Report) ────────────────────
// 4-column before/after table: Metric | <date A> | <date B> | Change.
// The Change column is bold green — this document type exists to
// celebrate improvement, so unlike baselinesTable() it doesn't need to
// stay direction-neutral.
function comparisonTable(headers, rows) {
  const colWidths = [3200, 2400, 2400, 2440];
  const header = new TableRow({
    children: headers.map((h, i) => cell(
      [para([txt(h, { bold: true, size: 14, color: C.goldDeep })], { alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: C.goldHead, width: colWidths[i] }
    )),
  });
  const body = rows.map((r, i) => new TableRow({
    children: r.map((val, j) => cell(
      [para([txt(String(val), { size: j === 0 ? 17 : 16, color: j === 0 ? C.dark : (j === 3 ? C.green : C.mid), bold: j === 0 || j === 3 })], { alignment: j === 0 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: i % 2 === 0 ? C.goldPale : 'FFFFFF', width: colWidths[j] }
    )),
  }));
  return [fullWidthTable([header, ...body], colWidths), spacer(100)];
}

// ── BRACE LIFE IMPROVEMENT REPORT ────────────────────────────────────────
// A standalone before/after progress report — not a training plan, so it
// doesn't reuse buildDocument()'s day/block schema. Data shape:
// {
//   client: { name, subtitle, stats },
//   reportTitle,                 // default 'BRACE LIFE IMPROVEMENT REPORT'
//   periodLabel,                 // e.g. '2/7/2026 → 8/7/2026  ·  6-Month Progress'
//   comparison: { title, headers: [4], rows: [[metric, before, after, change], ...] },
//   narrative: [{ type, label, body }],   // same shape/types as baselineNotes
//   strengthGains: { title, headers: [4], rows: [...] },  // optional 2nd table
//   closingNote,                 // optional plain paragraph before the brand footer
// }
async function buildImprovementDoc(data) {
  const children = [];
  const client = data.client;

  children.push(...coverHeader(client.name, data.reportTitle || 'BRACE LIFE IMPROVEMENT REPORT', client.subtitle));
  if (client.stats && client.stats.length) children.push(...clientStats(client.stats));

  if (data.periodLabel) {
    children.push(para([txt(data.periodLabel, { italics: true, size: 16, color: C.mid })], {
      alignment: AlignmentType.CENTER, spacing: { after: 120 },
    }));
  }

  if (data.comparison) {
    children.push(sectionTitle(data.comparison.title || 'Body Composition — Before & After', C.teal));
    children.push(...comparisonTable(data.comparison.headers, data.comparison.rows));
  }

  if (data.narrative) {
    const fnMap = {
      green: greenCallout, gold: goldCallout, red: redCallout, teal: tealCallout, blue: blueCallout, purple: purpleCallout,
      clinical: clinicalFlag, watch: watchFlag, clear: clearFlag,
    };
    data.narrative.forEach((n) => {
      const fn = fnMap[n.type] || goldCallout;
      children.push(...fn(n.label, n.body));
    });
    children.push(spacer(80));
  }

  if (data.strengthGains) {
    children.push(sectionTitle(data.strengthGains.title || 'Strength Gains', C.gold));
    children.push(...comparisonTable(data.strengthGains.headers, data.strengthGains.rows));
  }

  if (data.closingNote) {
    children.push(para([txt(data.closingNote, { size: 17, color: C.dark })], { spacing: { after: 120 } }));
  }

  children.push(spacer(160));
  children.push(para([txt('BRACE LIFE STUDIOS  ·  ICONS INDEX  ·  bracelifestudios.com', { bold: true, size: 18, color: C.gold })], {
    alignment: AlignmentType.CENTER, spacing: { after: 40 },
  }));
  children.push(para([txt(`This progress report is confidential and prepared exclusively for ${client.name}.`, { italics: true, size: 16, color: C.mid })], {
    alignment: AlignmentType.CENTER,
  }));

  const headerSubtitle = client.subtitle || data.reportTitle || 'Improvement Report';
  const footerRight = `${client.name}  |  Brace Life Improvement Report`;

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

// ════════════════════════════════════════════════════════════════════════
// ICONS PERFORMANCE ASSESSMENT REPORT — box/card visual language
// ════════════════════════════════════════════════════════════════════════
// A distinct document type from buildDocument()/buildImprovementDoc() above
// — the INITIAL BASELINE assessment a client receives after her first Styku
// scan + full ICONS strength-testing battery, before a training plan is
// built (see CLAUDE.md's "NEW CLIENT ONBOARDING" checklist, step 1). Built
// to the exact structural/visual spec of the Anna Samuelsson ICONS
// Performance Assessment reference document — Xolokan's confirmed standard
// for this report type (see CLAUDE.md's "VFA (Visceral Fat Area)" section,
// which already cites this same reference document by name).
//
// DELIBERATE VISUAL-LANGUAGE DEVIATION from buildDocument() above: this
// report type uses colored background boxes/cards throughout (badge chips,
// a Styku stat-card grid, a solid reference-comparison box, orange flagged-
// row highlighting, dark numbered "Next Steps" cards, a tan methodology
// appendix box). This is intentional and confirmed against the actual
// reference PDF — do NOT "correct" it back to the compact-labeled-paragraph
// convention that governs buildDocument(). The two document types are
// allowed to look different; see CLAUDE.md for the full rationale.
//
// Uses CLAUDE.md's 8/17/2026-corrected science-layer language throughout:
// ALST as a 2-tier trend metric (no graded "Optimal" tier above 5.5 kg/m²
// for women), VFA as a single trend tag with a methodology caveat (not a
// 4-tier risk table), and the Asymmetry Protocol's corrected ≥10% relative
// trigger (not the retired 0.5 lb absolute one).

const AR = {
  dark: '1B1815',      // header band / strength-table header row / Next Step cards
  card: 'EDE7DA',      // default box/card fill (warm tan)
  cardAlt: 'E3DBC7',   // zebra-stripe alt fill on tables inside this doc type
  flag: 'F6DDBB',      // flagged-row / priority-card fill (peach)
  flagText: 'A6431C',  // flagged label/accent text (burnt orange)
  green: '5B7A52',     // solid reference-group comparison box
  novice: '8B6F3E',    // LEVEL pill — Novice
  intermediate: '3C6B35', // LEVEL pill — Intermediate
  advanced: HUES.blue.accent, // LEVEL pill — Advanced
};

// Inline footnote marker — small bold superscript bracket, e.g. "Fit [1]".
function fnRun(n, opts = {}) {
  if (n === undefined || n === null) return null;
  return txt(` [${n}]`, { size: 12, superScript: true, bold: true, color: opts.color || AR.dark, font: FONT });
}

// A small filled "chip" of text (badge, LEVEL pill, FLAGGED tag) — run-level
// shading rather than a bordered box, since docx has no rounded-corner
// primitive; padding is simulated with leading/trailing spaces.
function chipRun(text, bg, color, opts = {}) {
  return txt(`  ${text}  `, { bold: true, size: opts.size || 13, color, font: FONT, shading: shade(bg) });
}

const LEVEL_COLOR = { Novice: AR.novice, Intermediate: AR.intermediate, Advanced: AR.advanced };

// ── COVER BAND (report page 1) ──────────────────────────────────────────
function assessmentCoverBand(client, badgeText) {
  const w = [2600, 5240, 2600];
  const row1 = new TableRow({
    children: [
      cell(
        [para([txt('BRACE LIFE STUDIOS', { bold: true, size: 15, color: C.gold, characterSpacing: 10 })]),
          para([txt('bracelifestudios.com', { size: 11, color: C.mid })])],
        { fill: AR.dark, width: w[0], vAlign: VerticalAlign.TOP, margins: { top: 160, bottom: 40, left: 120, right: 40 } }
      ),
      cell([para([])], { fill: AR.dark, width: w[1] }),
      cell(
        [para([chipRun(badgeText || 'INITIAL BASELINE', C.gold, AR.dark)], { alignment: AlignmentType.RIGHT })],
        { fill: AR.dark, width: w[2], vAlign: VerticalAlign.TOP, margins: { top: 160, bottom: 40, left: 40, right: 120 } }
      ),
    ],
  });
  const row2 = new TableRow({
    children: [cell(
      [para([txt('ICONS PERFORMANCE ASSESSMENT', { bold: true, size: 15, color: C.gold, characterSpacing: 20 })], { alignment: AlignmentType.CENTER, spacing: { before: 40 } })],
      { fill: AR.dark, colSpan: 3, width: TW }
    )],
  });
  const row3 = new TableRow({
    children: [cell(
      [para([txt(client.name.toUpperCase(), { bold: true, size: 34, color: C.white, characterSpacing: 10 })], { alignment: AlignmentType.CENTER, spacing: { before: 60, after: 40 } })],
      { fill: AR.dark, colSpan: 3, width: TW }
    )],
  });
  // Partial-field guard (8/18/2026 — see standardStykuStatItems()): only
  // the meta parts that actually exist are printed; a missing date or
  // location is omitted, never rendered as "undefined" or defaulted.
  const metaParts = [];
  if (client.assessmentDate !== undefined && client.assessmentDate !== null) metaParts.push(`Assessment Date: ${client.assessmentDate}`);
  if (client.location !== undefined && client.location !== null) metaParts.push(`Location: ${client.location}`);
  const metaText = metaParts.join('   |   ');
  const row4 = new TableRow({
    children: [cell(
      [para([txt(metaText, { size: 14, color: 'D8D2C6' })], { alignment: AlignmentType.CENTER, spacing: { after: 160 } })],
      { fill: AR.dark, colSpan: 3, width: TW }
    )],
  });
  return [fullWidthTable([row1, row2, row3, row4], w), spacer(140)];
}

// ── PAGE BAND (report pages 2–6, repeated per section) ───────────────────
function assessmentPageBand(pageTitle, metaLine) {
  const w = [2400, 5640, 2400];
  const row = new TableRow({
    children: [
      cell(
        [para([txt('BRACE LIFE STUDIOS', { bold: true, size: 14, color: C.gold, characterSpacing: 10 })]),
          para([txt('bracelifestudios.com', { size: 10, color: C.mid })])],
        { fill: AR.dark, width: w[0], vAlign: VerticalAlign.CENTER, margins: { top: 100, bottom: 100, left: 120, right: 40 } }
      ),
      cell(
        [para([txt(pageTitle.toUpperCase(), { bold: true, size: 17, color: C.gold, characterSpacing: 10 })], { alignment: AlignmentType.CENTER })],
        { fill: AR.dark, width: w[1], vAlign: VerticalAlign.CENTER, margins: { top: 100, bottom: 100 } }
      ),
      cell([para([])], { fill: AR.dark, width: w[2] }),
    ],
  });
  const els = [fullWidthTable([row], w)];
  if (metaLine) {
    els.push(para([txt(metaLine, { size: 14, italics: true, color: C.mid })], { alignment: AlignmentType.CENTER, spacing: { before: 80, after: 140 } }));
  } else {
    els.push(spacer(140));
  }
  return els;
}

// ── GENERIC TAN/PEACH BOX (protocol intro, how-to-read, corrections) ─────
function tanBox(label, body, opts = {}) {
  const fill = opts.fill || AR.card;
  const accent = opts.accent || C.gold;
  const bodyEls = Array.isArray(body) ? body : [para([txt(body, { size: 16, color: C.dark })])];
  const contentChildren = [];
  if (label) contentChildren.push(para([txt(label, { bold: true, size: 16, color: opts.labelColor || AR.dark })], { spacing: { after: 60 } }));
  contentChildren.push(...bodyEls);
  const row = new TableRow({
    children: [cell(contentChildren, {
      fill,
      width: TW,
      margins: { top: 140, bottom: 140, left: 200, right: 200 },
      borders: { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.SINGLE, size: 36, color: accent } },
    })],
  });
  return [fullWidthTable([row], [TW]), spacer(120)];
}

// ── THREE PILLARS ROW (Aesthetics / Health / Biological Age) ─────────────
const DEFAULT_ASSESSMENT_PILLARS = [
  { title: 'AESTHETICS', sub: 'Shape, tone & symmetry goals' },
  { title: 'HEALTH', sub: 'Strength, posture & joint integrity' },
  { title: 'BIOLOGICAL AGE', sub: 'Longevity, independence & vitality' },
];
function pillarRow(pillars = DEFAULT_ASSESSMENT_PILLARS) {
  const w = evenWidths(pillars.length);
  const cells = pillars.map((p, i) => cell(
    [
      para([txt(p.title, { bold: true, size: 15, color: C.gold, characterSpacing: 10 })], { alignment: AlignmentType.CENTER, spacing: { after: 20 } }),
      para([txt(p.sub, { size: 12, color: 'D8D2C6' })], { alignment: AlignmentType.CENTER }),
    ],
    { fill: AR.dark, width: w[i], margins: { top: 140, bottom: 140, left: 80, right: 80 } }
  ));
  return [fullWidthTable([new TableRow({ children: cells })], w), spacer(60)];
}

function biologicalAgeDisclaimer() {
  return [para(
    [txt('"Biological Age" here is a coaching framework built from strength, mobility, and body-composition trends over time — not a lab-measured biological age test (such as an epigenetic clock).', { italics: true, size: 13, color: C.mid })],
    { spacing: { after: 140 } }
  )];
}

// ── STYKU STAT-CARD GRID (4 cols × 2 rows) ────────────────────────────────
// items: [{ value, label, sub, labelFootnote, subFootnote, highlight }]
function statBoxGrid(items, colsPerRow = 4) {
  // Partial-field guard (8/18/2026 — see standardStykuStatItems()'s comment
  // block): drop any item whose primary value is missing (null/undefined —
  // 0 is a real value), and render nothing at all for an empty set rather
  // than an empty zero-row table. Covers caller-supplied item arrays
  // (data.styku.items) the same way as the standard set.
  items = (items || []).filter((it) => it.value !== undefined && it.value !== null);
  if (!items.length) return [];
  const w = evenWidths(colsPerRow);
  const rows = [];
  for (let i = 0; i < items.length; i += colsPerRow) {
    const rowItems = items.slice(i, i + colsPerRow);
    const cells = rowItems.map((it, j) => {
      const isDark = !!it.highlight;
      const valueColor = isDark ? C.gold : C.dark;
      const labelColor = isDark ? 'D8D2C6' : C.mid;
      const labelRuns = [txt(it.label, { bold: true, size: 12, color: labelColor, characterSpacing: 6 })];
      if (it.labelFootnote) labelRuns.push(fnRun(it.labelFootnote, { color: labelColor }));
      const children = [
        para([txt(String(it.value), { bold: true, size: 24, color: valueColor })], { alignment: AlignmentType.CENTER, spacing: { after: 20 } }),
        para(labelRuns, { alignment: AlignmentType.CENTER }),
      ];
      if (it.sub) {
        const subRuns = [txt(it.sub, { size: 11, color: labelColor })];
        if (it.subFootnote) subRuns.push(fnRun(it.subFootnote, { color: labelColor }));
        children.push(para(subRuns, { alignment: AlignmentType.CENTER, spacing: { before: 10 } }));
      }
      return cell(children, { fill: isDark ? AR.dark : AR.card, width: w[j], margins: { top: 140, bottom: 140, left: 60, right: 60 } });
    });
    // pad an incomplete final row with empty cells so column widths stay aligned
    while (cells.length < colsPerRow) cells.push(cell([para([])], { fill: 'FFFFFF', width: w[cells.length] }));
    rows.push(new TableRow({ children: cells }));
  }
  return [fullWidthTable(rows, w), spacer(100)];
}

// Standard 8-box Styku grid (Body Fat / Lean Mass / Fat Mass / Bone Mass /
// BMI / BMR / Shape Score (highlighted) / VFA), matching the reference
// document's exact card set and footnote assignments (1/2/3/4). VFA is
// shown as a single trend tag (e.g. "Very Low") per CLAUDE.md's corrected
// VFA framing, not the retired 4-tier risk table.
// Partial-field behavior (added 8/18/2026, mirroring stykuBlock()'s fix —
// same motivating precedent: Johanna Castillo's 8/18/2026 build, where a
// partial scan record met unconditional interpolation; several of the 10
// intake-pending clients onboarded 8/18/2026 are expected to arrive with
// similarly partial records, and the Assessment Report is onboarding
// checklist item 1). Rules, matching stykuBlock() exactly:
//   - A field is "missing" when null/undefined; 0 is a real value.
//   - A stat box whose PRIMARY value is missing is omitted from the grid
//     entirely — never rendered as a literal "undefined", never as an
//     empty card. statBoxGrid() lays out fewer-than-8 boxes cleanly: it
//     chunks into rows of 4 and pads an incomplete final row with
//     borderless white cells (blank space, not visible empty boxes).
//   - Sub-label fields (bodyFatRank, leanMassPct) drop only their own
//     suffix line, not the parent box — the same rule the already-guarded
//     fatMassPct/boneMassPct/bmiLabel/shapeScoreLabel/vfaTag subs follow.
// A COMPLETE object renders identically to the pre-8/18/2026 output —
// verified empirically via regenerate-and-diff on Rena Paul's Assessment
// Report (the pilot, and the only one built so far).
function standardStykuStatItems(styku) {
  const has = (v) => v !== undefined && v !== null;
  const items = [];
  if (has(styku.bodyFatPct)) items.push({ value: `${styku.bodyFatPct}%`, label: 'BODY FAT %', sub: has(styku.bodyFatRank) ? `Rank: ${styku.bodyFatRank}` : '', subFootnote: 1 });
  if (has(styku.leanMass)) items.push({ value: `${styku.leanMass} lbs`, label: 'LEAN MASS', sub: has(styku.leanMassPct) ? `${styku.leanMassPct}% of total` : '' });
  if (has(styku.fatMass)) items.push({ value: `${styku.fatMass} lbs`, label: 'FAT MASS', sub: `${styku.fatMassPct != null ? styku.fatMassPct + '% of total' : ''}` });
  if (has(styku.boneMass)) items.push({ value: `${styku.boneMass} lbs`, label: 'BONE MASS', sub: `${styku.boneMassPct != null ? styku.boneMassPct + '% of total' : ''}` });
  if (has(styku.bmi)) items.push({ value: styku.bmi, label: 'BMI', sub: styku.bmiLabel || '' });
  if (has(styku.bmr)) items.push({ value: `${styku.bmr} cal/day`, label: 'BMR', labelFootnote: 2, sub: 'Revised Harris-Benedict estimate' });
  if (has(styku.shapeScore)) items.push({ value: `${styku.shapeScore}/100`, label: 'SHAPE SCORE', labelFootnote: 3, sub: styku.shapeScoreLabel || '', highlight: true });
  if (has(styku.vfa)) items.push({ value: `${styku.vfa} cm²`, label: 'VISCERAL FAT AREA', labelFootnote: 4, sub: styku.vfaTag || '' });
  return items;
}

// ── SOLID REFERENCE-GROUP COMPARISON BOX ──────────────────────────────────
function solidBox(label, body, opts = {}) {
  const fill = opts.fill || AR.green;
  const row = new TableRow({
    children: [cell(
      [
        para([txt(label, { bold: true, size: 14, color: C.white })], { spacing: { after: 60 } }),
        para([txt(body, { size: 14, color: 'F0EEE6' })]),
      ],
      { fill, width: TW, margins: { top: 140, bottom: 140, left: 200, right: 200 } }
    )],
  });
  return [fullWidthTable([row], [TW]), spacer(120)];
}

// ── SEGMENTAL / MEASUREMENT GRID — flexible list of {label, value} ───────
// Reused for both "Segmental Lean Mass Distribution" (2 cols) and "3D Scan
// Body Measurements" (3 cols) — a client's measurement set is inherently
// variable, so this does not assume a fixed schema.
function statRowGrid(items, cols = 2) {
  // Partial-field guard (8/18/2026 — see standardStykuStatItems()): an item
  // whose value is missing (null/undefined; 0 is real) is dropped rather
  // than rendered as "undefined" — relevant when a calling script maps a
  // partial scan record straight into segmental/measurement rows.
  items = (items || []).filter((it) => it.value !== undefined && it.value !== null);
  if (!items.length) return [];
  const w = evenWidths(cols);
  const rows = [];
  for (let i = 0; i < items.length; i += cols) {
    const rowItems = items.slice(i, i + cols);
    const cells = rowItems.map((it, j) => cell(
      [para([
        txt(it.label, { size: 14, color: C.mid }),
        txt('     ', { size: 14 }),
        txt(String(it.value), { bold: true, size: 15, color: C.dark }),
      ], { tabStops: [{ type: TabStopType.RIGHT, position: w[j] - 240 }] })],
      { fill: (Math.floor(i / cols)) % 2 === 0 ? AR.card : 'FFFFFF', width: w[j], margins: { top: 80, bottom: 80, left: 160, right: 160 } }
    ));
    while (cells.length < cols) cells.push(cell([para([])], { fill: 'FFFFFF', width: w[cells.length] }));
    rows.push(new TableRow({ children: cells }));
  }
  return [fullWidthTable(rows, w), spacer(100)];
}

// A single full-width highlighted row — used for the "Appendicular LST
// Index" summary line under the segmental grid.
function highlightRow(label, value, footnote) {
  const labelRuns = [txt(label, { size: 14, color: C.mid })];
  if (footnote) labelRuns.push(fnRun(footnote, { color: C.mid }));
  const row = new TableRow({
    children: [cell(
      [para([
        ...labelRuns,
        txt('\t', { size: 14 }),
        txt(String(value), { bold: true, size: 15, color: C.dark }),
      ], { tabStops: [{ type: TabStopType.RIGHT, position: TW - 240 }] })],
      { fill: AR.cardAlt, width: TW, margins: { top: 90, bottom: 90, left: 160, right: 160 } }
    )],
  });
  return [fullWidthTable([row], [TW]), spacer(100)];
}

// ── STRENGTH ASSESSMENT TABLE ─────────────────────────────────────────────
// rows: [{ num, exercise, weight, reps, pctBW, level, notes, flagged,
//          notTested }]
const STRENGTH_COLS = { NUM: 500, EXERCISE: 2600, WEIGHT: 1200, REPS: 900, PCTBW: 900, LEVEL: 1500, NOTES: 2840 };
const STRENGTH_COL_WIDTHS = [STRENGTH_COLS.NUM, STRENGTH_COLS.EXERCISE, STRENGTH_COLS.WEIGHT, STRENGTH_COLS.REPS, STRENGTH_COLS.PCTBW, STRENGTH_COLS.LEVEL, STRENGTH_COLS.NOTES];
function strengthAssessmentTable(rows, opts = {}) {
  const headers = ['#', 'EXERCISE', 'WEIGHT', 'REPS', '% BW', 'LEVEL', 'NOTES / FLAGS'];
  const headerFootnotes = { 4: 7, 5: 7 }; // % BW and LEVEL both point to footnote 7
  const header = new TableRow({
    children: headers.map((h, i) => {
      const runs = [txt(h, { bold: true, size: i === 1 || i === 6 ? 14 : 12, color: C.gold })];
      if (headerFootnotes[i]) runs.push(fnRun(headerFootnotes[i], { color: C.gold }));
      return cell([para(runs, { alignment: i === 1 || i === 6 ? AlignmentType.LEFT : AlignmentType.CENTER })], { fill: AR.dark, width: STRENGTH_COL_WIDTHS[i] });
    }),
  });

  const body = rows.map((r, i) => {
    const dash = '—';
    const muted = !!r.notTested;
    const fill = r.flagged ? AR.flag : (muted ? 'F4F2EC' : (i % 2 === 0 ? AR.cardAlt : 'FFFFFF'));
    const textColor = muted ? C.mid : C.dark;
    const levelCell = (r.level && !muted)
      ? [para([chipRun(r.level, LEVEL_COLOR[r.level] || C.mid, C.white, { size: 12 })], { alignment: AlignmentType.CENTER })]
      : [para([txt(dash, { size: 14, color: C.mid })], { alignment: AlignmentType.CENTER })];
    return new TableRow({
      children: [
        cell([para([txt(String(r.num), { size: 14, color: textColor })], { alignment: AlignmentType.CENTER })], { fill, width: STRENGTH_COLS.NUM }),
        cell([para([txt(r.exercise, { bold: true, size: 16, color: muted ? C.mid : C.dark })])], { fill, width: STRENGTH_COLS.EXERCISE }),
        cell([para([txt(r.weight || dash, { size: 14, color: textColor })], { alignment: AlignmentType.CENTER })], { fill, width: STRENGTH_COLS.WEIGHT }),
        cell([para([txt(r.reps || dash, { size: 14, color: textColor })], { alignment: AlignmentType.CENTER })], { fill, width: STRENGTH_COLS.REPS }),
        cell([para([txt(r.pctBW || dash, { size: 14, color: textColor })], { alignment: AlignmentType.CENTER })], { fill, width: STRENGTH_COLS.PCTBW }),
        cell(levelCell, { fill, width: STRENGTH_COLS.LEVEL }),
        cell([para([txt(r.notes || '', { size: 13, italics: !!r.notes, color: r.flagged ? AR.flagText : C.mid })])], { fill, width: STRENGTH_COLS.NOTES }),
      ],
    });
  });

  return [fullWidthTable([header, ...body], STRENGTH_COL_WIDTHS), spacer(100)];
}

function flagsSummaryBox(text) {
  if (!text) return [];
  const row = new TableRow({
    children: [cell(
      [para([
        txt('FLAGS:  ', { bold: true, size: 15, color: AR.flagText }),
        txt(text, { size: 15, color: AR.flagText }),
      ])],
      { fill: AR.flag, width: TW, margins: { top: 100, bottom: 100, left: 200, right: 200 } }
    )],
  });
  return [fullWidthTable([row], [TW]), spacer(100)];
}

// ── EXERCISE BENEFIT LIBRARY (Aesthetics / Health / Biological Age) ──────
// Default, reusable copy for the 10 core ICONS Baseline Testing Protocol
// movements + the bonus Pull-Up test, keyed by canonical movement name.
// Written to CLAUDE.md's corrected clinical framing from the start — no
// "reduces osteoporosis risk" claim on Deadlift (a single assessment can't
// confirm individual disease-risk reduction), no "strengthens the pelvic
// floor" claim on Hip Thrust (current evidence supports co-activation, not
// PFM-strength change, from heavy compound lifts alone — targeted pelvic-
// floor training is what builds pelvic-floor strength).
const EXERCISE_BENEFIT_LIBRARY = {
  'Deadlift': {
    aesthetics: 'Strengthens the posterior chain — glutes, hamstrings, and back — building a lifted, firm lower-body line.',
    health: 'Builds core and spinal stability under load and reinforces the hip-hinge pattern that protects the low back in everyday lifting.',
    bioAge: 'A bone-loading movement associated with maintained or improved bone mineral density in women 40+ — a meaningful input to long-term bone health, not a guarantee for any one person (a single assessment cannot confirm individual osteoporosis-risk reduction; that requires a bone-density scan).',
    // No hardcoded footnote number here — footnote numbering is scoped to
    // a specific client's document (see buildAssessmentReport's
    // data.footnotes), so a calling script attaches the right number via
    // benefitLinesFromLibrary('Deadlift', { bioAgeFootnote: N }).
  },
  'Back Squat': {
    aesthetics: 'Develops toned, sculpted legs and glutes through a full, controlled range of motion.',
    health: 'Builds lower-body strength and reinforces the hip/knee/ankle mobility that daily movement — stairs, floor transfers, carrying — depends on.',
    bioAge: 'Maintains functional independence by reinforcing balance, joint integrity, and the strength needed to stand from a low position unassisted.',
  },
  'Overhead Press': {
    aesthetics: 'Defines and shapes the shoulders, arms, and upper chest.',
    health: 'Strengthens the shoulders and shoulder stabilizers, supporting upright posture indirectly through improved upper-back and shoulder-girdle strength.',
    bioAge: 'Supports the overhead reaching strength daily life quietly depends on — a top shelf, a suitcase into an overhead bin, a grandchild lifted overhead.',
  },
  'Incline Dumbbell Press': {
    aesthetics: 'Enhances chest and upper-body shape and firms the front of the shoulder.',
    health: 'Strengthens the chest and shoulder complex and reinforces shoulder-joint stability through a controlled pressing range.',
    bioAge: 'Helps maintain upper-body pushing strength for longevity — carrying, pushing open a heavy door, catching a fall.',
  },
  'Push-Ups': {
    aesthetics: 'Develops lean, defined arms, chest, and shoulders using bodyweight alone.',
    health: 'Engages the core to stabilize the spine through the movement — core-engaging bodyweight work like this is associated with reduced lower-back complaints.',
    bioAge: 'Maintains the functional upper-body pressing strength everyday tasks — getting up off the floor, pushing a heavy cart — quietly depend on.',
  },
  'Farmers Carry': {
    aesthetics: 'Builds a tight, upright carriage and grip/forearm definition.',
    health: 'Trains the deep spinal stabilizers (multifidus, quadratus lumborum) and grip strength under load, supporting posture through every other lift in the program.',
    bioAge: 'Grip strength and loaded-carry capacity are both independently associated with functional independence and fall resilience in older adults.',
  },
  'Hip Thrust': {
    aesthetics: 'Lifts and shapes the glutes for a firm, rounded look.',
    health: 'Reduces low-back strain by strengthening the glutes and posterior chain, and co-activates the deep core and pelvic floor.',
    // No hardcoded footnote number — see the Deadlift entry's comment above.
    healthCaveat: ' (co-activation is not the same as pelvic-floor strengthening — targeted pelvic-floor training, not heavy compound lifting alone, is what builds pelvic-floor strength.)',
    bioAge: 'Maintains hip mobility and helps offset age-related muscle loss in one of the body\'s largest, most power-relevant muscle groups.',
  },
  'Single-Leg RDL': {
    aesthetics: 'Tones and elongates the hamstrings and glutes while improving balance and symmetry.',
    health: 'Enhances coordination and strengthens the stabilizing muscles around the hip, knee, and ankle on each side independently.',
    bioAge: 'Single-leg control is directly linked to fall risk — this movement trains exactly the balance-under-load quality that protects functional independence with age.',
  },
  'Lunges': {
    aesthetics: 'Shapes the legs and glutes while improving left/right symmetry.',
    health: 'Improves knee and hip stability through a unilateral, functional loading pattern.',
    bioAge: 'Maintains the lower-body strength that walking, stair climbing, and getting in and out of a car depend on.',
  },
  'Plank Hold': {
    aesthetics: 'Tightens the waistline and improves visible core strength and control.',
    health: 'Strengthens the entire core, supporting reduced back pain and improved posture under everyday load.',
    bioAge: 'Supports spinal alignment and postural endurance — the ability to hold good posture through a full day, not just a single lift.',
  },
  'Pull-Ups': {
    aesthetics: 'Builds a defined back and shoulder line — the "V-taper" most upper-body aesthetic goals point toward.',
    health: 'Strengthens the lats, upper back, and grip, balancing the pressing volume that dominates most upper-body programs.',
    bioAge: 'Relative bodyweight pulling strength is a strong, simple marker of overall upper-body strength reserve as training years accumulate.',
  },
};

// Looks up default library copy for a canonical movement key and applies
// any per-client overrides (e.g. a flag-specific rewrite of the Biological
// Age or Health line — see Anna Samuelsson's Single-Leg RDL/Lunges, whose
// Biological Age/Health lines were rewritten to reference a real flagged
// finding rather than using the generic default copy).
function getExerciseBenefits(canonicalKey, overrides = {}) {
  const base = EXERCISE_BENEFIT_LIBRARY[canonicalKey] || { aesthetics: '', health: '', bioAge: '' };
  return { ...base, ...overrides };
}

// Converts a getExerciseBenefits() result into benefitCard()'s `lines`
// array shape, merging each line's optional `<field>Caveat` suffix (e.g.
// Hip Thrust's healthCaveat, the co-activation-vs-strengthening
// distinction) into the visible text and carrying its `<field>Footnote`
// through as that line's footnote marker.
function benefitLinesFromLibrary(canonicalKey, overrides = {}) {
  const b = getExerciseBenefits(canonicalKey, overrides);
  return [
    { label: 'Aesthetics', text: (b.aesthetics || '') + (b.aestheticsCaveat || ''), footnote: b.aestheticsFootnote },
    { label: 'Health', text: (b.health || '') + (b.healthCaveat || ''), footnote: b.healthFootnote },
    { label: 'Biological Age', text: (b.bioAge || '') + (b.bioAgeCaveat || ''), footnote: b.bioAgeFootnote },
  ];
}

// ── EXERCISE BENEFIT CARD (pages "What Each Lift Means") ─────────────────
// card: { exercise, weightRepsLabel, flagged, flagTag, lines: [{label, text,
//         footnote}], flagNote }
// `lines` is the fully-resolved 3-line (Aesthetics/Health/Biological Age)
// content for this card — build it via getExerciseBenefits() plus any
// client-specific overrides before calling this.
function benefitCard(card) {
  const fill = card.flagged ? AR.flag : AR.card;
  const accent = card.flagged ? AR.flagText : C.gold;
  const children = [];
  children.push(para([
    txt(card.exercise, { bold: true, size: 17, color: C.dark }),
    txt('\t', { size: 14 }),
    txt(card.weightRepsLabel || '', { size: 13, color: C.mid }),
  ], { tabStops: [{ type: TabStopType.RIGHT, position: TW - 400 }], spacing: { after: card.flagged ? 20 : 80 } }));
  if (card.flagged) {
    children.push(para([txt('■ FLAGGED', { bold: true, size: 12, color: AR.flagText })], { alignment: AlignmentType.RIGHT, spacing: { after: 80 } }));
  }
  (card.lines || []).forEach((l) => {
    const bodyRuns = [txt(l.text, { size: 15, color: C.dark })];
    if (l.footnote) bodyRuns.push(fnRun(l.footnote, { color: C.dark }));
    children.push(...labeledPara(l.label, bodyRuns, accent, { spacingAfter: 60 }));
  });
  const row = new TableRow({
    children: [cell(children, {
      fill,
      width: TW,
      margins: { top: 140, bottom: 140, left: 200, right: 200 },
      borders: { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.SINGLE, size: 36, color: accent } },
    })],
  });
  return [fullWidthTable([row], [TW]), spacer(120)];
}

// ── TRAINER OBSERVATION / JASON'S PT NOTES CARDS ──────────────────────────
// tone: 'positive' | 'priority' | 'neutral' | 'warning'
const OBSERVATION_TONE = {
  positive: { fill: AR.card, labelColor: AR.dark },
  neutral: { fill: AR.card, labelColor: AR.dark },
  priority: { fill: AR.flag, labelColor: AR.flagText },
  warning: { fill: AR.flag, labelColor: AR.flagText },
};
function observationCard(obs) {
  const t = OBSERVATION_TONE[obs.tone] || OBSERVATION_TONE.neutral;
  const bodyRuns = [txt(obs.body, { size: 15, color: C.dark })];
  (obs.footnotes || []).forEach((n) => bodyRuns.push(fnRun(n, { color: C.dark })));
  const row = new TableRow({
    children: [cell(
      [
        para([txt(obs.label, { bold: true, size: 15, color: t.labelColor })], { spacing: { after: 50 } }),
        para(bodyRuns),
      ],
      { fill: t.fill, width: TW, margins: { top: 120, bottom: 120, left: 200, right: 200 } }
    )],
  });
  return [fullWidthTable([row], [TW]), spacer(100)];
}

// ── NEXT STEP CARD (dark numbered card) ───────────────────────────────────
function nextStepCard(number, title, body) {
  const w = [900, TW - 900];
  const numStr = String(number).padStart(2, '0');
  const row = new TableRow({
    children: [
      cell([para([txt(numStr, { bold: true, size: 20, color: C.gold })], { alignment: AlignmentType.CENTER })], { fill: AR.dark, width: w[0], vAlign: VerticalAlign.CENTER }),
      cell(
        [
          para([txt(title, { bold: true, size: 16, color: C.gold })], { spacing: { after: 40 } }),
          para([txt(body, { size: 14, color: 'D8D2C6' })]),
        ],
        { fill: AR.dark, width: w[1], margins: { top: 100, bottom: 100, left: 100, right: 200 } }
      ),
    ],
  });
  return [fullWidthTable([row], w), spacer(80)];
}

// ── FOOTNOTES APPENDIX (final report page) ────────────────────────────────
function footnotesList(footnotes) {
  const els = [];
  (footnotes || []).forEach((f) => {
    els.push(para(
      [txt(`${f.marker}. `, { bold: true, size: 14, color: C.dark }), txt(f.text, { size: 14, color: C.dark })],
      { spacing: { after: 100 } }
    ));
  });
  return els;
}

function correctionsSummaryBox(corrections) {
  const body = (corrections && corrections.length)
    ? corrections.map((c) => para([txt('•  ', { size: 14, color: AR.dark }), txt(c, { size: 14, color: C.dark })], { spacing: { after: 60 } }))
    : [para([txt('First build — no prior version of this report exists to correct. This is the reference version going forward.', { size: 14, italics: true, color: C.mid })])];
  return tanBox('Summary of Factual Corrections Made in This Revision', body, { fill: AR.card, accent: C.gold });
}

// ── JASON'S PT NOTES SECTION (optional) ───────────────────────────────────
// jasonNotes: { intro, cards: [{ label, body, footnotes }] } — renders in
// the same observationCard() style as Trainer Observations. Only render
// when a script actually supplies real data for this client (see CLAUDE.md
// / icons-expert.md's Studio Staff naming guidance) — do not fabricate a
// clinical note for a client with none on file.
function jasonNotesSection(jasonNotes) {
  if (!jasonNotes) return [];
  const els = [sectionTitle("Jason's PT Notes", AR.dark)];
  if (jasonNotes.intro) {
    els.push(para([txt(jasonNotes.intro, { size: 14, italics: true, color: C.mid })], { spacing: { after: 100 } }));
  }
  (jasonNotes.cards || []).forEach((c) => {
    els.push(...observationCard({ tone: c.tone || 'neutral', label: c.label, body: c.body, footnotes: c.footnotes }));
  });
  return els;
}

// ── ASSESSMENT REPORT FOOTER (live "Page X of Y" field, not hardcoded) ───
function assessmentFooter(client) {
  const p = new Paragraph({
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.gold, space: 4 } },
    spacing: { before: 80 },
    alignment: AlignmentType.CENTER,
    children: [
      txt('BRACE LIFE STUDIOS  |  bracelifestudios.com  |  ICONS Performance System  |  Confidential Client Report   ', { size: 13, color: C.mid }),
      txt('Page ', { size: 13, color: C.mid }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 13, color: C.mid }),
      txt(' of ', { size: 13, color: C.mid }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 13, color: C.mid }),
      // Partial-field guard (8/18/2026): only present parts are appended —
      // a missing assessmentDate never prints as "undefined" in the footer.
      txt(' ' + [client.name, client.assessmentDate].filter((p) => p !== undefined && p !== null && p !== '').map((p) => `  |  ${p}`).join(''), { size: 13, color: C.mid }),
    ],
  });
  return new Footer({ children: [p] });
}

// ── DOCUMENT ASSEMBLY ─────────────────────────────────────────────────────
// data = {
//   client: { name, assessmentDate, location, weightLbs },
//   badge,                          // default 'INITIAL BASELINE'
//   introText,                      // "What This Assessment Measures" body
//   pillars,                        // optional override of the 3 pillar chips
//   styku: { ...standardStykuStatItems() fields..., vfaTag, peerComparison },
//   segmental: [{label,value}],     // e.g. Left Arm / Right Arm / Left Leg / Right Leg
//   alstRow: { label, value, footnote },
//   asymmetryNote: string,
//   strength: { protocolIntro, rows: [...], flagsSummary, howToReadLabel, howToReadBody },
//   benefitCards: [ ... ],          // see benefitCard() doc above
//   cardsPerPage: 6,
//   measurements: [{label,value}],
//   measurementsNote: string,       // shown when measurements is empty
//   observations: [{tone,label,body,footnotes}],
//   jasonNotes: { intro, cards },   // optional
//   nextSteps: [{title, body}],
//   footnotes: [{marker, text}],
//   corrections: [string],          // omit for a first build
// }
async function buildAssessmentReport(data) {
  const client = data.client;
  const children = [];
  // Partial-field helpers (8/18/2026 — Johanna Castillo precedent; see
  // standardStykuStatItems()'s comment block for the full rules). has()
  // treats 0 as a real value; metaLine() joins only the parts that exist,
  // so a missing assessmentDate never prints as a literal "undefined" in
  // a page band.
  const has = (v) => v !== undefined && v !== null;
  const metaLine = (...parts) => parts.filter((p) => has(p) && p !== '').join('  |  ');

  // ---- Page 1: Cover / Styku scan ----
  children.push(...assessmentCoverBand(client, data.badge));
  children.push(sectionTitle('What This Assessment Measures', C.gold));
  children.push(para([txt(data.introText || DEFAULT_ASSESSMENT_INTRO, { size: 15, color: C.dark })], { spacing: { after: 140 } }));
  children.push(...pillarRow(data.pillars));
  children.push(...biologicalAgeDisclaimer());

  if (data.styku) {
    // Partial-scan behavior (8/18/2026, Johanna Castillo precedent): the
    // "Scanned:" date line renders only when a scan date actually exists —
    // never fabricated or defaulted; the attribution line still reads
    // grammatically without the date clause. Stat boxes with missing
    // primary values are omitted (see standardStykuStatItems()). A styku
    // object that yields NO renderable content at all (no date, no stat
    // items, no peer comparison) skips this section entirely rather than
    // leaving an orphaned section title — a deliberate graceful-omission
    // choice, not a throw, since data.styku has always been optional on
    // this path (a scan-less report simply never renders this section).
    const stykuItems = (data.styku.items || standardStykuStatItems(data.styku))
      .filter((it) => has(it.value));
    if (has(data.styku.scanDate) || stykuItems.length || data.styku.peerComparison) {
      children.push(sectionTitle('Styku Body Composition Scan', C.gold));
      if (has(data.styku.scanDate)) {
        children.push(para([txt(`Scanned: ${data.styku.scanDate}   |   Brace Life Studios`, { size: 13, italics: true, color: C.mid })], { spacing: { after: 100 } }));
      }
      if (stykuItems.length) children.push(...statBoxGrid(stykuItems));
      if (data.styku.peerComparison) {
        children.push(...solidBox('Reference-Group Comparison  [5]', data.styku.peerComparison, { fill: AR.green }));
      }
    }
  }

  // Segmental section gates on rows that actually carry a value (8/18/2026
  // partial-field guard), and the ALST summary row requires a real value —
  // never an "undefined" highlight line.
  const segmentalItems = (data.segmental || []).filter((it) => has(it.value));
  if (segmentalItems.length) {
    children.push(sectionTitle('Segmental Lean Mass Distribution', C.gold));
    children.push(...statRowGrid(segmentalItems, 2));
    if (data.alstRow && has(data.alstRow.value)) children.push(...highlightRow(data.alstRow.label, data.alstRow.value, data.alstRow.footnote));
    if (data.asymmetryNote) {
      children.push(para([txt(data.asymmetryNote, { size: 13, color: C.mid })], { spacing: { after: 100 } }));
    }
  }

  // ---- Page 2: Strength Assessment ----
  if (data.strength) {
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(...assessmentPageBand('ICONS Index — Strength Assessment', metaLine(client.name, client.assessmentDate, 'Brace Life Studios')));
    if (data.strength.protocolIntro) {
      children.push(...tanBox('ICONS Protocol', data.strength.protocolIntro, { fill: AR.card, accent: C.gold }));
    }
    children.push(sectionTitle('Assessment Results', C.gold));
    children.push(...strengthAssessmentTable(data.strength.rows));
    children.push(...flagsSummaryBox(data.strength.flagsSummary));
    children.push(...tanBox(
      data.strength.howToReadLabel || 'How to Read [7] % BW and Level',
      data.strength.howToReadBody || DEFAULT_HOW_TO_READ,
      { fill: AR.card, accent: C.gold }
    ));
  }

  // ---- Pages 3–4: What Each Lift Means ----
  if (data.benefitCards && data.benefitCards.length) {
    const perPage = data.cardsPerPage || 6;
    for (let i = 0; i < data.benefitCards.length; i += perPage) {
      const chunk = data.benefitCards.slice(i, i + perPage);
      children.push(new Paragraph({ children: [new PageBreak()] }));
      const title = i === 0 ? `What Each Lift Means for ${client.name}` : `What Each Lift Means for ${client.name} (cont.)`;
      children.push(...assessmentPageBand(title, `${client.name}  |  ICONS Performance System  |  Brace Life Studios`));
      children.push(sectionTitle('Exercise Benefit Breakdown', C.gold));
      chunk.forEach((c) => children.push(...benefitCard(c)));
    }
  }

  // ---- Page 5: Body Measurements & Next Steps ----
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(...assessmentPageBand('Body Measurements & Next Steps', metaLine(client.name, client.assessmentDate, 'Brace Life Studios')));
  children.push(sectionTitle('3D Scan Body Measurements (Styku — all measurements in inches)', C.gold));
  const measurementItems = (data.measurements || []).filter((it) => has(it.value));
  if (measurementItems.length) {
    children.push(...statRowGrid(measurementItems, 3));
  } else {
    children.push(...tanBox(null, data.measurementsNote || 'Circumference measurements were not captured as part of this scan/intake session — add at the next Styku session to enable this section.', { fill: AR.card, accent: C.gold }));
  }
  if (data.observations && data.observations.length) {
    children.push(sectionTitle('Trainer Observations & Programming Notes', C.gold));
    data.observations.forEach((o) => children.push(...observationCard(o)));
  }
  children.push(...jasonNotesSection(data.jasonNotes));
  if (data.nextSteps && data.nextSteps.length) {
    children.push(sectionTitle('Your Next Steps', C.gold));
    data.nextSteps.forEach((s, i) => children.push(...nextStepCard(i + 1, s.title, s.body)));
  }

  // ---- Page 6: Methodology & How to Read This Report ----
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(...assessmentPageBand('Methodology & How to Read This Report', `${client.name}  |  ICONS Performance System  |  Brace Life Studios`));
  children.push(para([txt(
    'This appendix documents the methodology and reference standards behind every number and claim above, so nothing in this report is stated more precisely than the underlying measurement actually supports. Superscript markers in the body of the report point to the notes below.',
    { size: 14, color: C.dark }
  )], { spacing: { after: 120 } }));
  children.push(sectionTitle('Footnotes', C.gold));
  children.push(...footnotesList(data.footnotes || DEFAULT_ASSESSMENT_FOOTNOTES(data)));
  children.push(...correctionsSummaryBox(data.corrections));

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: PAGE_H },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        footers: { default: assessmentFooter(client) },
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

const DEFAULT_ASSESSMENT_INTRO = 'The ICONS Index is a comprehensive strength and longevity assessment designed for women 40+ and 50+. It measures and tracks strength, movement quality, body composition, and overall fitness over time. This baseline establishes where you are today and provides a roadmap for measurable improvement. Metrics drawn from the 3D body scanner and strength testing are explained in plain language below, with a short note on how each should and shouldn\'t be read — see the methodology box on the final page for details.';

const DEFAULT_HOW_TO_READ = '% Body Weight and Level reflect the working sets shown above — not a tested 1-rep max (1RM). Level (Novice/Intermediate/Advanced) is your coach\'s estimate, combining an ExRx 1RM-based reference table with a visual assessment of movement quality. Treat it as a training-history indicator, not a precise percentile ranking.';

// Standing methodology footnote set — the actual numbers/values in [4]/[6]
// should be reconciled with the specific client's own styku data by the
// calling script; this default exists so a script that doesn't supply
// data.footnotes still gets CLAUDE.md-accurate methodology language rather
// than nothing at all. Partial-field audit (8/18/2026): verified this
// default set interpolates NO styku/client fields — all 8 notes are static
// text (it takes `data` for signature symmetry only), so a partial scan
// record cannot print "undefined" here. Keep it that way: if a future
// footnote needs a client-specific number, guard it per the rules in
// standardStykuStatItems()'s comment block.
function DEFAULT_ASSESSMENT_FOOTNOTES(data) {
  return [
    { marker: 1, text: 'Body-fat "Rank" (e.g., Fit) is generated by Styku against its own norm-referenced comparison groups, drawn from self-selected clinical/fitness-testing populations — not a nationally representative sample. A population-representative comparison can shift a person\'s percentile substantially versus these vendor tables, even though the underlying body-fat % is identical.' },
    { marker: 2, text: 'BMR is calculated with the Revised Harris-Benedict equation from height, weight, age, and sex — a population-average formula, not a measured value (only indirect calorimetry measures metabolic rate directly). Published accuracy studies show these formulas land within ±10% of measured resting metabolic rate for roughly half of people; treat the number as a useful planning estimate, not a precise reading.' },
    { marker: 3, text: 'Shape Score is a Styku-proprietary composite of body fat %, a muscle-fat index, and waist-to-height ratio, designed for easy client communication. It has not been independently validated as a clinical health score — read it as a personal trend-tracking number, not a diagnostic one.' },
    { marker: 4, text: 'Visceral Fat Area is shown as a single trend tag (e.g., "Very Low," the <70 cm² floor already used elsewhere in this system) rather than a multi-tier risk classification — no consensus body endorses one universal VFA threshold, published CT-derived cutoffs for elevated risk in women run considerably higher (commonly cited around 106 cm²+), and this scanner\'s own visceral-fat validation was performed against DXA in kilograms, not against CT in cm². Read this number as a personal trend to track over time, alongside waist circumference.' },
    { marker: 5, text: 'Peer-comparison percentiles reflect Styku\'s own reference database for similar age/sex, drawn from self-selected fitness/clinical testing populations, not a nationally representative survey. A population-representative comparison can place the same body composition at a meaningfully different percentile.' },
    { marker: 6, text: 'Appendicular Lean Soft Tissue (ALST) Index reflects the sex-specific EWGSOP2 reference range (women: <5.5 kg/m² is the low-muscle-mass screening cutoff). There is no separate female "Optimal" tier above that cutoff — a higher band once used for this (≥7.0 kg/m²) is EWGSOP2\'s MALE threshold, not a female one, and is not used in this report. ALM/ALMI from 3D optical scanning has not been independently validated against DXA in the published Styku validation study — read this number as a trend to track at future scans, not a precise classification.' },
    { marker: 7, text: 'See the in-page note on "How to Read % BW and Level" on the Strength Assessment page.' },
    { marker: 8, text: 'Segmental (left/right arm and leg) lean-mass figures are this scanner\'s least-validated output — cross-device comparisons against DXA show CCCs (concordance) on the order of 0.32-0.52 for segmental composition, well below the accuracy of whole-body totals. Read a segmental gap as a general trend to monitor, not a precise measurement; a functional strength test (single-leg press, isometric strength, single-leg jump) is preferred over the scan number alone before any programming change is made on the strength of a segmental finding.' },
  ];
}

module.exports = {
  buildDocument,
  buildImprovementDoc, comparisonTable,
  buildAssessmentReport,
  assessmentCoverBand, assessmentPageBand, tanBox, pillarRow, biologicalAgeDisclaimer,
  statBoxGrid, standardStykuStatItems, solidBox, statRowGrid, highlightRow,
  strengthAssessmentTable, flagsSummaryBox,
  EXERCISE_BENEFIT_LIBRARY, getExerciseBenefits, benefitLinesFromLibrary, benefitCard,
  observationCard, nextStepCard, footnotesList, correctionsSummaryBox, jasonNotesSection,
  DEFAULT_ASSESSMENT_FOOTNOTES,
  C,
  PAGE_W, PAGE_H, MARGIN, TW,
  buildHeader, buildFooter,
  coverHeader, clientStats, clientWelcomeLine, weekOverview, baselinesTable, stykuBlock,
  nutritionBlock, proteinTargets, proteinBar, pelvicFloorCallout,
  weakerSide,
  maleProteinTargets, maleNutritionNote, testosteroneNote,
  dayHeader, exTable, weeklySummary, progressionBlock, milestoneTracker,
  labeledPara,
  goldCallout, greenCallout, redCallout, tealCallout, blueCallout, purpleCallout,
  clinicalFlag, watchFlag, clearFlag,
  sectionTitle,
  epley1RM: (weight, reps) => Math.round(weight * (1 + reps / 30)),
  workingLoad: (oneRM, pct, roundTo = 5) => Math.round((oneRM * pct) / roundTo) * roundTo,
  pctOfBodyweight: (weight, bodyweightLbs, roundTo = 1) => (weight && bodyweightLbs ? Math.round((weight / bodyweightLbs) * 100 / roundTo) * roundTo : null),
};
