/**
 * ICONS Index — Canonical .docx template engine
 * Brace Life Studios
 *
 * Source of truth for all client-facing .docx deliverables (training plans,
 * assessment reports). Page setup, color system, and table schemas are
 * extracted from the Kelly Mulroy 5-Day Training Plan reference document.
 * See /CLAUDE.md for the full spec this file implements.
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, VerticalAlign, ShadingType,
  HeadingLevel, PageBreak, convertInchesToTwip, Footer,
} = require('docx');

// ── PAGE SETUP (US Letter) ──────────────────────────────────────────────
const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN = 900;
const TW = 10440;
const FONT = 'Arial';

// ── COLOR SYSTEM ─────────────────────────────────────────────────────────
const C = {
  teal: '00695C', tealPale: 'E0F2F1',
  green: '43A047', greenPale: 'E8F5E9',
  gold: 'C9A227', goldPale: 'FAF3E0',
  red: 'E53935', redPale: 'FFEBEE',
  blue: '1565C0', bluePale: 'EAF4FB',

  dark: '2C2C2C',
  mid: '6B6B6B',
  white: 'FFFFFF',

  flagRed: 'B71C1C',
  flagAmber: 'E65100',
  flagGreen: '1B5E20',

  callGold: 'FAF3E0', callGoldB: 'C9A227',
  callGreen: 'E8F5E9', callGreenB: '43A047',
  callRed: 'FFEBEE', callRedB: 'E53935',
  callTeal: 'E0F2F1', callTealB: '00695C',
  callBlue: 'EAF4FB', callBlueB: '1565C0',
  callPurple: 'F3EEF9', callPurpleB: '6A1B9A',
};

const INTENSITY = {
  60: { accent: C.teal, pale: C.tealPale, label: '60%' },
  70: { accent: C.green, pale: C.greenPale, label: '70%' },
  80: { accent: C.gold, pale: C.goldPale, label: '80%' },
  90: { accent: C.red, pale: C.redPale, label: '90%' },
  AR: { accent: C.blue, pale: C.bluePale, label: 'AR' },
};

// ── LOW-LEVEL HELPERS ────────────────────────────────────────────────────
function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: none, bottom: none, left: none, right: none };
}

function cellBorders(color, size = 4) {
  const b = { style: BorderStyle.SINGLE, size, color };
  return { top: b, bottom: b, left: b, right: b };
}

function shade(color) {
  return { type: ShadingType.CLEAR, color: 'auto', fill: color };
}

function txt(text, opts = {}) {
  return new TextRun({ text, font: FONT, ...opts });
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
    margins: opts.margins || { top: 60, bottom: 60, left: 100, right: 100 },
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    columnSpan: opts.colSpan,
  });
}

function fullWidthTable(rows, colWidths) {
  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows,
    borders: noBorders(),
  });
}

function spacer(size = 120) {
  return new Paragraph({ text: '', spacing: { after: size } });
}

// ── CALLOUTS ──────────────────────────────────────────────────────────────
function calloutBase(label, body, fill, borderColor, opts = {}) {
  const borderSize = opts.thick ? 18 : 6;
  const labelColor = opts.labelColor || borderColor;
  const bodyRuns = Array.isArray(body) ? body : [txt(body, { size: 17, color: C.dark })];

  const table = new Table({
    width: { size: TW, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          cell(
            [
              para([txt(label.toUpperCase(), { bold: true, size: 15, color: labelColor, characterSpacing: 12 })], { spacing: { after: 60 } }),
              para(bodyRuns, { spacing: { after: 0 } }),
            ],
            {
              fill,
              borders: cellBorders(borderColor, borderSize),
              width: TW,
              margins: { top: 120, bottom: 120, left: 160, right: 160 },
            }
          ),
        ],
      }),
    ],
    borders: noBorders(),
  });
  return [table, spacer(140)];
}

const goldCallout = (label, body) => calloutBase(label, body, C.callGold, C.callGoldB);
const greenCallout = (label, body) => calloutBase(label, body, C.callGreen, C.callGreenB);
const redCallout = (label, body) => calloutBase(label, body, C.callRed, C.callRedB);
const tealCallout = (label, body) => calloutBase(label, body, C.callTeal, C.callTealB);
const blueCallout = (label, body) => calloutBase(label, body, C.callBlue, C.callBlueB);
const purpleCallout = (label, body) => calloutBase(label, body, C.callPurple, C.callPurpleB);

const clinicalFlag = (label, body) => calloutBase(label, body, C.callRed, C.flagRed, { thick: true, labelColor: C.flagRed });
const watchFlag = (label, body) => calloutBase(label, body, C.callGold, C.flagAmber, { thick: false, labelColor: C.flagAmber });
const clearFlag = (label, body) => calloutBase(label, body, C.callGreen, C.flagGreen, { thick: false, labelColor: C.flagGreen });

// ── COVER / HEADER BLOCKS ────────────────────────────────────────────────
function brandLine() {
  return para(
    [txt('B R A C E   L I F E   S T U D I O S', { bold: true, size: 15, color: C.gold, characterSpacing: 20 })],
    { alignment: AlignmentType.CENTER, spacing: { after: 40 } }
  );
}

function coverHeader(clientName, programTitle, tagLine) {
  const els = [];
  els.push(brandLine());
  els.push(para([txt(programTitle.toUpperCase(), { bold: true, size: 52, color: C.gold, characterSpacing: 30 })], {
    alignment: AlignmentType.CENTER, spacing: { after: 100 },
  }));
  els.push(para([txt(clientName.toUpperCase(), { bold: true, size: 40, color: C.dark })], {
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }));
  if (tagLine) {
    els.push(para([txt(tagLine, { italics: true, size: 18, color: C.mid })], {
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
    }));
  }
  els.push(new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.gold, space: 1 } },
    spacing: { after: 240 },
  }));
  return els;
}

function clientStats(stats) {
  const cells = stats.map((s, i) => cell(
    [para([txt(s, { size: 16, bold: true, color: C.dark })], { alignment: AlignmentType.CENTER })],
    { fill: i % 2 === 0 ? 'F5F5F5' : 'FFFFFF', width: Math.floor(TW / stats.length) }
  ));
  return [
    fullWidthTable([new TableRow({ children: cells })], stats.map(() => Math.floor(TW / stats.length))),
    spacer(200),
  ];
}

function sectionTitle(title, color = C.gold) {
  return para(
    [txt(title.toUpperCase(), { bold: true, size: 20, color, characterSpacing: 14 })],
    {
      spacing: { before: 160, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color } },
    }
  );
}

// ── WEEK OVERVIEW ─────────────────────────────────────────────────────────
function weekOverview(days) {
  const colWidths = [2200, 1600, 6640];
  const header = new TableRow({
    children: [
      cell([para([txt('DAY', { bold: true, size: 14, color: C.white })])], { fill: C.dark, width: colWidths[0] }),
      cell([para([txt('INTENSITY', { bold: true, size: 14, color: C.white })], { alignment: AlignmentType.CENTER })], { fill: C.dark, width: colWidths[1] }),
      cell([para([txt('FOCUS', { bold: true, size: 14, color: C.white })])], { fill: C.dark, width: colWidths[2] }),
    ],
  });
  const rows = [header, ...days.map((d, i) => {
    const iv = INTENSITY[d.intensity] || INTENSITY[70];
    const rowFill = i % 2 === 0 ? 'FFFFFF' : 'F7F7F7';
    return new TableRow({
      children: [
        cell([para([txt(d.day, { bold: true, size: 15, color: C.dark })])], { fill: rowFill, width: colWidths[0] }),
        cell([para([txt(iv.label, { bold: true, size: 14, color: iv.accent })], { alignment: AlignmentType.CENTER })], { fill: rowFill, width: colWidths[1] }),
        cell([para([txt(d.focus, { size: 15, color: C.dark })])], { fill: rowFill, width: colWidths[2] }),
      ],
    });
  })];
  return [sectionTitle('Week Overview'), fullWidthTable(rows, colWidths), spacer(180)];
}

// ── BASELINES ──────────────────────────────────────────────────────────
function baselinesTable(rows) {
  const colWidths = [2600, 1600, 1400, 4840];
  const headerLabels = ['LIFT', 'BASELINE', 'TESTED AT', '8-WEEK TARGET'];
  const header = new TableRow({
    children: headerLabels.map((h, i) => cell(
      [para([txt(h, { bold: true, size: 13, color: C.white })], { alignment: i === 0 || i === 3 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: C.dark, width: colWidths[i] }
    )),
  });
  const body = rows.map((r, i) => new TableRow({
    children: r.map((val, j) => cell(
      [para([txt(String(val), { size: 15, color: C.dark, bold: j === 0 })], { alignment: j === 0 || j === 3 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: i % 2 === 0 ? 'FFFFFF' : 'F7F7F7', width: colWidths[j] }
    )),
  }));
  return [sectionTitle('Strength Baselines'), fullWidthTable([header, ...body], colWidths), spacer(160)];
}

// ── STYKU BLOCK ────────────────────────────────────────────────────────
function metricRow(label, value, colWidths) {
  return new TableRow({
    children: [
      cell([para([txt(label, { size: 14, color: C.mid })])], { width: colWidths[0] }),
      cell([para([txt(String(value), { size: 15, bold: true, color: C.dark })], { alignment: AlignmentType.RIGHT })], { width: colWidths[1] }),
    ],
  });
}

// Clinical status thresholds — see CLAUDE.md Styku scan interpretation workflow.
function alstStatus(alstIndex) {
  if (alstIndex == null) return null;
  if (alstIndex < 5.5) return 'AT-RISK';
  if (alstIndex < 7.0) return 'NORMAL';
  return 'OPTIMAL';
}

function vfaStatus(vfa) {
  if (vfa == null) return null;
  if (vfa < 70) return 'VERY LOW RISK';
  if (vfa < 100) return 'LOW RISK';
  if (vfa < 150) return 'MODERATE RISK';
  return 'HIGH RISK';
}

function bmiStatus(bmi) {
  if (bmi == null) return null;
  if (bmi < 18.5) return 'UNDERWEIGHT';
  if (bmi < 25) return 'NORMAL';
  if (bmi < 30) return 'OVERWEIGHT';
  return 'OBESE';
}

function stykuBlock(styku) {
  const els = [sectionTitle('Styku Body Composition Scan', C.teal)];
  els.push(para([txt(`Scan Date: ${styku.scanDate}`, { size: 14, italics: true, color: C.mid })], { spacing: { after: 100 } }));

  const colWidths = [5220, 5220];
  const leftCol = [
    ['Body Fat %', `${styku.bodyFatPct}% (${styku.bodyFatRank})`],
    ['Lean Mass', `${styku.leanMass} lbs (${styku.leanMassPct}%)`],
    ['Fat Mass', `${styku.fatMass} lbs`],
    ['Bone Mass', `${styku.boneMass} lbs`],
    ['BMI', `${styku.bmi}${bmiStatus(styku.bmi) ? ` — ${bmiStatus(styku.bmi)}` : ''}`],
    ['BMR', `${styku.bmr} cal/day`],
  ];
  const rightCol = [
    ['VFA (Visceral Fat)', `${styku.vfa} cm²${vfaStatus(styku.vfa) ? ` — ${vfaStatus(styku.vfa)}` : ''}`],
    ['Shape Score', `${styku.shapeScore}/100 — ${styku.shapeScoreLabel}`],
    ['ALST Index', `${styku.alstIndex} kg/m²${alstStatus(styku.alstIndex) ? ` — ${alstStatus(styku.alstIndex)}` : ''}`],
    ['Left Arm LST', `${styku.leftArmLST} lbs`],
    ['Right Arm LST', `${styku.rightArmLST} lbs`],
    ['Left / Right Leg LST', `${styku.leftLegLST} / ${styku.rightLegLST} lbs`],
  ];
  const rows = [];
  for (let i = 0; i < Math.max(leftCol.length, rightCol.length); i++) {
    const l = leftCol[i], r = rightCol[i];
    rows.push(new TableRow({
      children: [
        cell([para([txt(l ? l[0] : '', { size: 13, color: C.mid })]), para([txt(l ? String(l[1]) : '', { size: 15, bold: true, color: C.dark })])], { fill: i % 2 === 0 ? 'F7FBFA' : 'FFFFFF', width: colWidths[0] }),
        cell([para([txt(r ? r[0] : '', { size: 13, color: C.mid })]), para([txt(r ? String(r[1]) : '', { size: 15, bold: true, color: C.dark })])], { fill: i % 2 === 0 ? 'F7FBFA' : 'FFFFFF', width: colWidths[1] }),
      ],
    }));
  }
  els.push(fullWidthTable(rows, colWidths));
  els.push(spacer(160));

  // Automatic clinical flags — CLAUDE.md mandates flagging these immediately
  // rather than relying on a trainer to remember to author them by hand.
  if (styku.alstIndex != null && styku.alstIndex < 5.5) {
    els.push(...clinicalFlag(
      'ALST At-Risk',
      `ALST Index of ${styku.alstIndex} kg/m² is below the 5.5 kg/m² sarcopenia threshold (EWGSOP2, 2018). Muscle-building is the primary physiological priority — every session emphasizes progressive resistance, protein targets escalate, and creatine is strongly indicated.`
    ));
  }
  if (styku.bmi != null && styku.bmi < 18.5) {
    els.push(...clinicalFlag(
      'BMI Underweight',
      `BMI of ${styku.bmi} is clinically underweight regardless of body fat percentage. Flag alongside ALST status — a low ALST Index combined with an underweight BMI indicates a sarcopenic obesity profile requiring highest-priority nutrition support.`
    ));
  }
  if (styku.vfa != null && styku.vfa >= 100) {
    els.push(...watchFlag(
      'Cardiometabolic Watch',
      `Visceral Fat Area of ${styku.vfa} cm² is at or above the 100 cm² threshold for cardiometabolic risk. Continue trend tracking at the next rescan.`
    ));
  }

  // Asymmetry protocol — auto-detect the weaker side from segmental LST so the
  // "which side leads unilateral work" call is never made by hand. See
  // CLAUDE.md's "Common Mistakes" section: getting this backwards is the #1
  // recurring error in hand-authored notes.
  const hasArms = styku.leftArmLST != null && styku.rightArmLST != null;
  const hasLegs = styku.leftLegLST != null && styku.rightLegLST != null;
  const armGap = hasArms ? Math.abs(styku.leftArmLST - styku.rightArmLST) : 0;
  const legGap = hasLegs ? Math.abs(styku.leftLegLST - styku.rightLegLST) : 0;
  if (armGap >= 0.5 || legGap >= 0.5) {
    const parts = [];
    if (armGap >= 0.5) {
      const weaker = styku.leftArmLST < styku.rightArmLST ? 'LEFT' : 'RIGHT';
      parts.push(`arms (${weaker} weaker by ${armGap.toFixed(1)} lbs — leads single-arm rows and carries)`);
    }
    if (legGap >= 0.5) {
      const weaker = styku.leftLegLST < styku.rightLegLST ? 'LEFT' : 'RIGHT';
      parts.push(`legs (${weaker} weaker by ${legGap.toFixed(1)} lbs — leads unilateral leg work)`);
    }
    els.push(...watchFlag(
      'Asymmetry Protocol',
      `A left/right gap of ≥ 0.5 lbs was detected in the ${parts.join(' and ')}. Lead all unilateral work with the weaker side, log left vs. right separately in coaching cues, and track the gap for reduction at the 8-week rescan.`
    ));
  }

  if (styku.peerComparison) {
    els.push(...tealCallout('Peer Comparison', styku.peerComparison));
  }
  return els;
}

// ── NUTRITION BLOCK ───────────────────────────────────────────────────
function nutritionBlock(client) {
  const els = [sectionTitle('Evidence-Based Nutrition Targets', C.gold)];

  const atRisk = client.alstIndex !== undefined && client.alstIndex < 5.5;
  const is50Plus = client.ageYears >= 50;
  const is40Plus = client.ageYears >= 40;
  let low, high, tier;
  if (atRisk || is50Plus) { low = 2.0; high = 2.2; tier = 'ALST At-Risk / 50+ tier'; }
  else if (is40Plus) { low = 1.8; high = 2.0; tier = '40+ tier'; }
  else { low = 1.6; high = 1.6; tier = 'active women general tier'; }

  const proteinLow = Math.round(client.weightKg * low);
  const proteinHigh = Math.round(client.weightKg * high);
  const perMeal = Math.round(client.weightKg * 0.4);

  els.push(...goldCallout(
    'Daily Protein Target',
    [
      txt(`${proteinLow}–${proteinHigh}g/day`, { bold: true, size: 20, color: C.dark }),
      txt(`  (${low.toFixed(1)}–${high.toFixed(1)} g/kg — ${tier})`, { size: 15, color: C.mid }),
      txt(`\n~${perMeal}g per meal minimum (leucine threshold), distributed across 4+ meals/day.`, { size: 15, color: C.dark }),
    ]
  ));

  if (atRisk) {
    els.push(...clinicalFlag(
      'Creatine — Strongly Indicated',
      'ALST Index below the 5.5 kg/m² sarcopenia-risk threshold. Prescribe 3–5g creatine monohydrate daily with food, no loading phase. Saturates in 3–4 weeks. Supports strength, power, cognition, and bone density.'
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

// Per-page protein reminder for ALST At-Risk clients. CLAUDE.md's "Common
// Mistakes" section calls this out explicitly: the reminder belongs on every
// training page, not just the assessment report.
function proteinBar(client) {
  const atRisk = client.alstIndex !== undefined && client.alstIndex < 5.5;
  if (!atRisk || client.weightKg == null) return [];
  const proteinLow = Math.round(client.weightKg * 2.0);
  const proteinHigh = Math.round(client.weightKg * 2.2);
  const perMeal = Math.round(client.weightKg * 0.4);
  return goldCallout(
    'Protein Reminder — ALST At-Risk',
    `${proteinLow}–${proteinHigh}g protein today, distributed across 4+ meals (~${perMeal}g/meal). Muscle-building is this session's top priority.`
  );
}

// ── DAY HEADER ─────────────────────────────────────────────────────────
function dayHeader(intensity, title, subtitle, descriptor) {
  const iv = INTENSITY[intensity] || INTENSITY[70];
  const colWidths = [1600, 8840];
  const badge = cell(
    [para([txt(iv.label, { bold: true, size: 30, color: C.white })], { alignment: AlignmentType.CENTER })],
    { fill: iv.accent, width: colWidths[0], vAlign: VerticalAlign.CENTER }
  );
  const titleCell = cell(
    [
      para([txt(title.toUpperCase(), { bold: true, size: 26, color: iv.accent, characterSpacing: 8 })], { spacing: { after: 40 } }),
      para([txt(subtitle, { bold: true, size: 17, color: C.dark })], { spacing: { after: 40 } }),
      para([txt(descriptor.toUpperCase(), { size: 13, color: C.mid, characterSpacing: 10 })]),
    ],
    { fill: iv.pale, width: colWidths[1], vAlign: VerticalAlign.CENTER }
  );
  return [
    fullWidthTable([new TableRow({ children: [badge, titleCell] })], colWidths),
    spacer(160),
  ];
}

function intensityPara(text) {
  return [para([txt(text, { size: 15, italics: true, color: C.mid })], { spacing: { after: 160 } })];
}

// ── EXERCISE TABLE ────────────────────────────────────────────────────
const EX_COLS = { EXERCISE: 2400, SETS: 380, REPS: 420, LOAD: 680, TEMPO: 540, REST: 440, CUE: 5580 };
const EX_COL_WIDTHS = [EX_COLS.EXERCISE, EX_COLS.SETS, EX_COLS.REPS, EX_COLS.LOAD, EX_COLS.TEMPO, EX_COLS.REST, EX_COLS.CUE];

function blockLabel(letter, title, accentColor, intro) {
  const els = [para(
    [txt(`${letter}. `, { bold: true, size: 17, color: accentColor }), txt(title.toUpperCase(), { bold: true, size: 15, color: accentColor, characterSpacing: 8 })],
    { spacing: { before: 140, after: 60 } }
  )];
  if (intro) {
    els.push(para([txt(intro, { size: 14, color: C.dark })], { spacing: { after: 100 } }));
  }
  return els;
}

function exTable(exercises, accentColor, paleFill) {
  const headers = ['EXERCISE', 'SETS', 'REPS', 'LOAD', 'TEMPO', 'REST', 'COACHING CUE'];
  const header = new TableRow({
    children: headers.map((h, i) => cell(
      [para([txt(h, { bold: true, size: 12, color: C.white })], { alignment: i === 0 || i === 6 ? AlignmentType.LEFT : AlignmentType.CENTER })],
      { fill: accentColor, width: EX_COL_WIDTHS[i] }
    )),
  });

  const rows = exercises.map((ex, i) => {
    const nameParas = [para([txt(ex.name, { bold: true, size: 14, color: C.dark })])];
    if (ex.flag) {
      nameParas.push(para([txt(ex.flag, { italics: true, size: 11, color: C.flagRed })]));
    }
    let cueRuns = [txt(ex.cue || '', { size: 13, color: C.dark })];
    if (ex.rirNote) {
      cueRuns.push(txt(`  ${ex.rirNote}`, { size: 12, color: C.teal, italics: true }));
    }
    const fill = i % 2 === 0 ? 'FFFFFF' : paleFill;
    return new TableRow({
      children: [
        cell(nameParas, { fill, width: EX_COLS.EXERCISE }),
        cell([para([txt(ex.sets || '', { size: 13, color: C.dark })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.SETS }),
        cell([para([txt(ex.reps || '', { size: 13, color: C.dark })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.REPS }),
        cell([para([txt(ex.load || '', { size: 13, color: C.dark })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.LOAD }),
        cell([para([txt(ex.tempo || '', { size: 13, color: C.dark })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.TEMPO },),
        cell([para([txt(ex.rest || '', { size: 13, color: C.dark })], { alignment: AlignmentType.CENTER })], { fill, width: EX_COLS.REST }),
        cell([para(cueRuns)], { fill, width: EX_COLS.CUE }),
      ],
    });
  });

  return [fullWidthTable([header, ...rows], EX_COL_WIDTHS), spacer(120)];
}

// ── WEEKLY SUMMARY ─────────────────────────────────────────────────────
function weeklySummary(rows) {
  const colWidths = [1200, 1000, 2040, 2200, 4000];
  const headers = ['DAY', 'INTENSITY', 'FOCUS', 'KEY LIFT', 'NOTES'];
  const header = new TableRow({
    children: headers.map((h, i) => cell(
      [para([txt(h, { bold: true, size: 12, color: C.white })], { alignment: AlignmentType.CENTER })],
      { fill: C.dark, width: colWidths[i] }
    )),
  });
  const body = rows.map((r, i) => new TableRow({
    children: r.map((val, j) => cell(
      [para([txt(String(val), { size: 13, color: C.dark })], { alignment: j === 0 ? AlignmentType.CENTER : AlignmentType.LEFT })],
      { fill: i % 2 === 0 ? 'FFFFFF' : 'F7F7F7', width: colWidths[j] }
    )),
  }));
  return [sectionTitle('Weekly Summary'), fullWidthTable([header, ...body], colWidths), spacer(160)];
}

// ── PROGRESSION / MILESTONE BLOCKS ────────────────────────────────────
function progressionBlock(accentColor) {
  return calloutBase(
    'Progression Rule — RIR Model',
    [
      txt('Add weight: ', { bold: true, size: 14, color: C.dark }), txt('top of rep range + 2 RIR + clean form.\n', { size: 14, color: C.dark }),
      txt('Same weight: ', { bold: true, size: 14, color: C.dark }), txt('form degraded on final reps.\n', { size: 14, color: C.dark }),
      txt('Drop weight: ', { bold: true, size: 14, color: C.dark }), txt('missed reps, pain, or excess fatigue.', { size: 14, color: C.dark }),
    ],
    C.callTeal, accentColor || C.callTealB
  );
}

function milestoneTracker(m4wk, m8wk, rescanNote) {
  const els = [sectionTitle('Milestone Tracking')];
  els.push(...goldCallout('4-Week Milestone', m4wk));
  els.push(...greenCallout('8-Week Milestone', m8wk));
  if (rescanNote) {
    els.push(...tealCallout('8-Week Styku Rescan', rescanNote));
  }
  return els;
}

// ── FOOTER ─────────────────────────────────────────────────────────────
function footerParagraph(clientName) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      txt(`Brace Life Studios  •  bracelifestudios.com  •  Confidential — ${clientName}`, { size: 12, color: C.mid }),
    ],
  });
}

// ── DOCUMENT ASSEMBLY ─────────────────────────────────────────────────
function buildDayContent(day, client) {
  const els = [];
  els.push(...dayHeader(day.intensity, day.title, day.subtitle, day.descriptor));
  els.push(...intensityPara(day.intensityPara));

  if (client) els.push(...proteinBar(client));

  if (day.warmUp) els.push(...goldCallout('Warm-Up', day.warmUp));

  (day.blocks || []).forEach((block) => {
    const iv = INTENSITY[day.intensity] || INTENSITY[70];
    els.push(...blockLabel(block.letter, block.title, iv.accent, block.intro));
    els.push(...exTable(block.exercises, iv.accent, iv.pale));
  });

  if (day.coolDown) els.push(...blueCallout('Cool-Down', day.coolDown));
  if (day.iconsNote) els.push(...goldCallout('ICONS Note', day.iconsNote));

  return els;
}

async function buildDocument(data) {
  const children = [];
  const client = data.client;

  children.push(...coverHeader(client.name, client.programTitle, "It's not about working out. It's about working in.™"));
  if (client.stats && client.stats.length) children.push(...clientStats(client.stats));

  if (data.weekOverview) children.push(...weekOverview(data.weekOverview));
  if (data.styku) children.push(...stykuBlock(data.styku));
  if (data.baselines) children.push(...baselinesTable(data.baselines));

  if (data.baselineNotes) {
    const fnMap = {
      green: greenCallout, gold: goldCallout, red: redCallout, teal: tealCallout, blue: blueCallout, purple: purpleCallout,
      clinical: clinicalFlag, watch: watchFlag, clear: clearFlag,
    };
    data.baselineNotes.forEach((n) => {
      const fn = fnMap[n.type] || goldCallout;
      children.push(...fn(n.label, n.body));
    });
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
    children.push(sectionTitle('Weekly Summary & Milestones'));
    if (data.summary.rows) children.push(...weeklySummary(data.summary.rows));
    children.push(...milestoneTracker(data.summary.milestones4wk, data.summary.milestones8wk, data.summary.rescanNote));
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: PAGE_H },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        footers: {
          default: new Footer({ children: [footerParagraph(client.name)] }),
        },
        children,
      },
    ],
    styles: {
      default: {
        document: { run: { font: FONT, size: 15, color: C.dark } },
      },
    },
  });

  return Packer.toBuffer(doc);
}

module.exports = {
  buildDocument,
  C,
  coverHeader, clientStats, weekOverview, baselinesTable, stykuBlock, nutritionBlock, proteinBar,
  dayHeader, exTable, weeklySummary, progressionBlock, milestoneTracker,
  goldCallout, greenCallout, redCallout, tealCallout, blueCallout, purpleCallout,
  clinicalFlag, watchFlag, clearFlag,
  sectionTitle,
  alstStatus, vfaStatus, bmiStatus,
};
