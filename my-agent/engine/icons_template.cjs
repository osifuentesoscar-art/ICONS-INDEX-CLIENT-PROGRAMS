'use strict';

/**
 * ICONS canonical .docx template engine — Brace Life Studios.
 * Page setup, color system, table schemas, and callout rules are pinned to
 * docs/ICONS_System_Prompt.md. Do not change the dxa constants below without
 * updating that spec — they are extracted from the reference document XML.
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, VerticalAlign, ShadingType,
  Header, Footer, PageNumber, PageBreak, HeadingLevel,
} = require('docx');

// ---------------------------------------------------------------------------
// Page setup (US Letter) — never change
// ---------------------------------------------------------------------------
const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN = 900;
const TW = 10440;
const FONT = 'Arial';

// ---------------------------------------------------------------------------
// Color system
// ---------------------------------------------------------------------------
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
  '60': { label: '60% · TECHNIQUE', color: C.teal, pale: C.tealPale },
  '70': { label: '70% · MODERATE', color: C.green, pale: C.greenPale },
  '80': { label: '80% · PRIMARY STRENGTH', color: C.gold, pale: C.goldPale },
  '90': { label: '90% · PEAK INTENSITY', color: C.red, pale: C.redPale },
  AR: { label: 'ACTIVE RECOVERY', color: C.blue, pale: C.bluePale },
};

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------
function run(text, opts = {}) {
  return new TextRun({ text: String(text), font: FONT, ...opts });
}

function para(children, opts = {}) {
  const runs = Array.isArray(children) ? children : [run(children)];
  return new Paragraph({ children: runs, ...opts });
}

function cellBorderNone() {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: none, bottom: none, left: none, right: none };
}

function shading(fill) {
  return { type: ShadingType.CLEAR, color: 'auto', fill };
}

/** A single-cell "table" used to draw a bordered, filled callout box. */
function calloutBox(label, body, fillHex, borderHex, opts = {}) {
  const borderSz = opts.thick ? 20 : 8;
  const border = { style: BorderStyle.SINGLE, size: borderSz, color: borderHex };
  return new Table({
    width: { size: TW, type: WidthType.DXA },
    borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: TW, type: WidthType.DXA },
            shading: shading(fillHex),
            margins: { top: 100, bottom: 100, left: 160, right: 160 },
            children: [
              new Paragraph({
                children: [run(label, { bold: true, size: 17, color: borderHex })],
                spacing: { after: 60 },
              }),
              new Paragraph({
                children: [run(body, { size: 17, color: C.dark })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

const goldCallout = (label, body) => calloutBox(label, body, C.callGold, C.callGoldB);
const greenCallout = (label, body) => calloutBox(label, body, C.callGreen, C.callGreenB);
const redCallout = (label, body) => calloutBox(label, body, C.callRed, C.callRedB);
const tealCallout = (label, body) => calloutBox(label, body, C.callTeal, C.callTealB);
const blueCallout = (label, body) => calloutBox(label, body, C.callBlue, C.callBlueB);
const purpleCallout = (label, body) => calloutBox(label, body, C.callPurple, C.callPurpleB);
const clinicalFlag = (label, body) => calloutBox(label, body, C.callRed, C.flagRed, { thick: true });
const watchFlag = (label, body) => calloutBox(label, body, C.goldPale, C.flagAmber, { thick: true });
const clearFlag = (label, body) => calloutBox(label, body, C.greenPale, C.flagGreen, { thick: true });

function spacer(size = 120) {
  return new Paragraph({ spacing: { after: size }, children: [] });
}

// ---------------------------------------------------------------------------
// Cover / header blocks
// ---------------------------------------------------------------------------
function coverHeader(clientName, programTitle, tagLine) {
  const brand = 'B R A C E   L I F E   S T U D I O S';
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [run(brand, { bold: true, size: 18, color: C.gold, characterSpacing: 40 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [run(tagLine || "It's not about working out. It's about working in.™", { italics: true, size: 14, color: C.mid })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [run(clientName.toUpperCase(), { bold: true, size: 40, color: C.dark })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [run(programTitle.toUpperCase(), { bold: true, size: 26, color: C.gold, characterSpacing: 28 })],
    }),
  ];
}

function clientStats(stats) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    children: [run((stats || []).join('   ·   '), { size: 17, color: C.mid })],
  });
}

// ---------------------------------------------------------------------------
// Week overview
// ---------------------------------------------------------------------------
function weekOverview(rows) {
  const header = new TableRow({
    tableHeader: true,
    children: ['DAY', 'INTENSITY', 'FOCUS'].map((t, i) => new TableCell({
      width: { size: [2200, 2200, 6040][i], type: WidthType.DXA },
      shading: shading(C.dark),
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [para([run(t, { bold: true, size: 15, color: C.white })])],
    })),
  });

  const body = (rows || []).map((r) => {
    const key = String(r.intensity).toUpperCase() === 'AR' ? 'AR' : String(r.intensity);
    const meta = INTENSITY[key] || INTENSITY['70'];
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 2200, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [para([run(r.day, { size: 16, color: C.dark })])],
        }),
        new TableCell({
          width: { size: 2200, type: WidthType.DXA },
          shading: shading(meta.pale),
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [para([run(meta.label, { bold: true, size: 14, color: meta.color })])],
        }),
        new TableCell({
          width: { size: 6040, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [para([run(r.focus, { size: 16, color: C.dark })])],
        }),
      ],
    });
  });

  return new Table({
    width: { size: TW, type: WidthType.DXA },
    rows: [header, ...body],
  });
}

// ---------------------------------------------------------------------------
// Baselines table — 4 col [2600, 1600, 1400, 4840]
// ---------------------------------------------------------------------------
function baselinesTable(rows) {
  const widths = [2600, 1600, 1400, 4840];
  const header = new TableRow({
    tableHeader: true,
    children: ['LIFT', 'BASELINE', 'TESTED AT', '8-WEEK TARGET'].map((t, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      shading: shading(C.dark),
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [para([run(t, { bold: true, size: 14, color: C.white })])],
    })),
  });
  const body = (rows || []).map((r) => new TableRow({
    children: r.map((val, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      margins: { top: 70, bottom: 70, left: 120, right: 120 },
      children: [para([run(val, { size: 16, color: C.dark })])],
    })),
  }));
  return new Table({ width: { size: TW, type: WidthType.DXA }, rows: [header, ...body] });
}

function baselineNotes(notes) {
  const fn = {
    green: greenCallout, gold: goldCallout, red: redCallout, teal: tealCallout, blue: blueCallout, purple: purpleCallout,
    clinicalFlag, watchFlag, clearFlag,
  };
  return (notes || []).flatMap((n) => [(fn[n.type] || goldCallout)(n.label, n.body), spacer(120)]);
}

// ---------------------------------------------------------------------------
// Styku scan block
// ---------------------------------------------------------------------------
function alstStatus(alst) {
  // Corrected 8/20/2026 to match scripts/icons_template.js and CLAUDE.md's
  // 8/17 correction: EWGSOP2's cutoffs are SEX-SPECIFIC, not a graded ladder.
  // <5.5 is the female at-risk threshold; 7.0 is the MALE threshold and was
  // being misapplied here as a female "Optimal" tier. Two tiers only, and the
  // upper one is a normal reference range, not a grade.
  if (alst < 5.5) return { label: 'AT-RISK', color: C.flagRed };
  return { label: 'WITHIN NORMAL RANGE', color: C.flagGreen };
}
function vfaStatus(vfa) {
  // Corrected 8/20/2026: the 70/100/150 risk-band table is RETIRED (no
  // consensus body endorses a single VFA cutoff; this device's VFA was
  // validated against DXA in kg, not CT in cm2). Only the <70 "Very Low"
  // floor survives, as a TREND tag — not a graded risk classification.
  if (vfa < 70) return { label: 'VERY LOW (TREND)', color: C.flagGreen };
  return { label: 'TRACKED AS A TREND', color: C.flagAmber };
}
function bmiStatus(bmi) {
  if (bmi < 18.5) return { label: 'UNDERWEIGHT', color: C.flagRed };
  if (bmi < 25) return { label: 'NORMAL', color: C.flagGreen };
  if (bmi < 30) return { label: 'OVERWEIGHT', color: C.flagAmber };
  return { label: 'OBESE', color: C.flagRed };
}

function statTile(label, value, status) {
  const w = Math.floor(TW / 4);
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: shading(C.tealPale),
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
    children: [
      para([run(label.toUpperCase(), { size: 12, color: C.mid })], { spacing: { after: 40 } }),
      para([run(value, { bold: true, size: 20, color: C.dark })], { spacing: { after: 40 } }),
      status ? para([run(status.label, { bold: true, size: 13, color: status.color })]) : para([]),
    ],
  });
}

function stykuBlock(styku) {
  if (!styku) return [];
  const tiles1 = new TableRow({
    children: [
      statTile('Body Fat %', `${styku.bodyFatPct}%  (${styku.bodyFatRank})`),
      statTile('Lean Mass', `${styku.leanMass} lbs`),
      statTile('BMI', String(styku.bmi), bmiStatus(styku.bmi)),
      statTile('VFA', `${styku.vfa} cm²`, vfaStatus(styku.vfa)),
    ],
  });
  const tiles2 = new TableRow({
    children: [
      statTile('ALST Index', `${styku.alstIndex} kg/m²`, alstStatus(styku.alstIndex)),
      statTile('Shape Score', `${styku.shapeScore}/100  (${styku.shapeScoreLabel})`),
      statTile('BMR', `${styku.bmr} cal`),
      statTile('Scan Date', styku.scanDate),
    ],
  });

  const out = [
    para([run('STYKU SCAN', { bold: true, size: 18, color: C.teal })], { spacing: { after: 100 } }),
    new Table({ width: { size: TW, type: WidthType.DXA }, rows: [tiles1, tiles2] }),
    spacer(160),
  ];

  const armGap = Math.abs(styku.leftArmLST - styku.rightArmLST);
  const legGap = Math.abs(styku.leftLegLST - styku.rightLegLST);
  // Relative gap against the LARGER side — the corrected >=10% trigger.
  const armGapPct = armGap / Math.max(styku.leftArmLST, styku.rightArmLST) * 100;
  const legGapPct = legGap / Math.max(styku.leftLegLST, styku.rightLegLST) * 100;
  const weakerArm = styku.leftArmLST < styku.rightArmLST ? 'LEFT' : 'RIGHT';
  const weakerLeg = styku.leftLegLST < styku.rightLegLST ? 'LEFT' : 'RIGHT';

  out.push(tealCallout(
    'Segmental Lean Soft Tissue',
    `Arms: L ${styku.leftArmLST} / R ${styku.rightArmLST} lbs  ·  Legs: L ${styku.leftLegLST} / R ${styku.rightLegLST} lbs.`
    + (armGapPct >= 10 ? `  Arm gap ${armGapPct.toFixed(1)}% — clears the 10% relative threshold; ${weakerArm} arm leads all single-arm work.` : '')
    + (legGapPct >= 10 ? `  Leg gap ${legGapPct.toFixed(1)}% — clears the 10% relative threshold; ${weakerLeg} leg leads all unilateral work.` : ''),
  ));
  out.push(spacer(120));

  if (styku.alstIndex < 5.5) {
    out.push(clinicalFlag('ALST At-Risk', `ALST Index ${styku.alstIndex} kg/m² is below the EWGSOP2 5.5 threshold for sarcopenia risk. Muscle-building is the primary physiological goal: every session prioritizes progressive resistance, protein targets escalate, and creatine is strongly indicated.`));
    out.push(spacer(120));
  }
  if (styku.bmi < 18.5) {
    out.push(clinicalFlag('BMI Underweight', `BMI ${styku.bmi} is below 18.5. This flag stands regardless of body fat percentage — combined with ALST At-Risk this is a sarcopenic obesity profile and the highest programming priority.`));
    out.push(spacer(120));
  }
  if (styku.vfa >= 100) {
    out.push(watchFlag('Cardiometabolic Watch', `Visceral fat area ${styku.vfa} cm² is at or above the 100 cm² moderate-risk threshold.`));
    out.push(spacer(120));
  }

  return out;
}

// ---------------------------------------------------------------------------
// Nutrition block — evidence-based auto-calculated targets
// ---------------------------------------------------------------------------
function proteinTargetPerKg(client) {
  if ((client.alstIndex ?? 99) < 5.5 || (client.ageYears >= 50)) return [2.0, 2.2];
  if (client.ageYears >= 40) return [1.8, 2.0];
  return [1.6, 1.8];
}

function nutritionBlock(client) {
  const [lo, hi] = proteinTargetPerKg(client);
  const weightKg = client.weightKg;
  const proteinLo = Math.round(weightKg * lo);
  const proteinHi = Math.round(weightKg * hi);
  const perMeal = Math.round(weightKg * 0.3);  // corrected 8/20/2026: ~0.3 g/kg, was 0.4
  const creatineIndicated = client.ageYears >= 40 || (client.alstIndex ?? 99) < 5.5 || client.isPostmenopausal;

  const body = `Protein target: ${proteinLo}–${proteinHi}g/day (~${perMeal}g per meal, across 4 meals spaced 3–4 hours apart). `
    + `Creatine monohydrate 3–5g/day with food — ${creatineIndicated ? 'strongly indicated' : 'indicated'} for this client. `
    + `Collagen: 15g + 50mg Vitamin C, 45–60 min before loading sessions — a chronic connective-tissue support protocol, not a pre-workout aid.`;

  return [
    para([run('NUTRITION & RECOVERY', { bold: true, size: 18, color: C.gold })], { spacing: { after: 100 } }),
    goldCallout('Evidence-Based Targets', body),
    spacer(160),
  ];
}

// ---------------------------------------------------------------------------
// Day header
// ---------------------------------------------------------------------------
function dayHeader(intensity, title, subtitle, descriptor) {
  const meta = INTENSITY[intensity] || INTENSITY['70'];
  const badge = new TableCell({
    width: { size: 1600, type: WidthType.DXA },
    shading: shading(meta.color),
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 120, bottom: 120, left: 100, right: 100 },
    children: [para([run(meta.label, { bold: true, size: 13, color: C.white })], { alignment: AlignmentType.CENTER })],
  });
  const text = new TableCell({
    width: { size: 8840, type: WidthType.DXA },
    shading: shading(meta.pale),
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      para([run(title, { bold: true, size: 21, color: meta.color })], { spacing: { after: 30 } }),
      para([run(subtitle, { bold: true, size: 15, color: C.dark })], { spacing: { after: 30 } }),
      para([run(descriptor, { size: 12, color: C.mid, characterSpacing: 10 })]),
    ],
  });
  return [
    new Table({ width: { size: TW, type: WidthType.DXA }, rows: [new TableRow({ children: [badge, text] })] }),
    spacer(160),
  ];
}

// ---------------------------------------------------------------------------
// Exercise table — column widths never change
// ---------------------------------------------------------------------------
const EX_WIDTHS = { name: 2400, sets: 380, reps: 420, load: 680, tempo: 540, rest: 440, cue: 5580 };
const EX_HEADERS = ['EXERCISE', 'SETS', 'REPS', 'LOAD', 'TEMPO', 'REST', 'COACHING CUE'];
const EX_KEYS = ['name', 'sets', 'reps', 'load', 'tempo', 'rest', 'cue'];

function exTable(exercises, accentColor, paleFill) {
  const widths = Object.values(EX_WIDTHS);
  const header = new TableRow({
    tableHeader: true,
    children: EX_HEADERS.map((t, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      shading: shading(accentColor || C.dark),
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
      children: [para([run(t, { bold: true, size: 12, color: C.white })])],
    })),
  });

  const rows = (exercises || []).map((ex, idx) => {
    const fill = idx % 2 === 0 ? C.white : (paleFill || C.tealPale);
    const nameChildren = [para([run(ex.name, { bold: true, size: 15, color: C.dark })])];
    if (ex.flag) {
      nameChildren.push(para([run(ex.flag, { italics: true, size: 12, color: C.flagRed })]));
    }
    const cueRuns = [run(ex.cue || '', { size: 13, color: C.dark })];
    if (ex.rirNote) {
      cueRuns.push(run(`  ${ex.rirNote}`, { size: 12, color: C.teal, italics: true }));
    }
    const cells = [
      new TableCell({ width: { size: widths[0], type: WidthType.DXA }, shading: shading(fill), margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: nameChildren }),
      new TableCell({ width: { size: widths[1], type: WidthType.DXA }, shading: shading(fill), margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [para([run(ex.sets, { size: 13, color: C.dark })])] }),
      new TableCell({ width: { size: widths[2], type: WidthType.DXA }, shading: shading(fill), margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [para([run(ex.reps, { size: 13, color: C.dark })])] }),
      new TableCell({ width: { size: widths[3], type: WidthType.DXA }, shading: shading(fill), margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [para([run(ex.load, { size: 13, color: C.dark })])] }),
      new TableCell({ width: { size: widths[4], type: WidthType.DXA }, shading: shading(fill), margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [para([run(ex.tempo, { size: 13, color: C.dark })])] }),
      new TableCell({ width: { size: widths[5], type: WidthType.DXA }, shading: shading(fill), margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [para([run(ex.rest, { size: 13, color: C.dark })])] }),
      new TableCell({ width: { size: widths[6], type: WidthType.DXA }, shading: shading(fill), margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [para(cueRuns)] }),
    ];
    return new TableRow({ children: cells });
  });

  return new Table({ width: { size: TW, type: WidthType.DXA }, rows: [header, ...rows] });
}

function sectionLabel(letter, title, color) {
  return para([run(`${letter}  —  ${title.toUpperCase()}`, { bold: true, size: 17, color: color || C.dark, characterSpacing: 10 })], { spacing: { before: 200, after: 100 } });
}

function bodyPara(text) {
  return para([run(text, { size: 15, color: C.dark })], { spacing: { after: 120 } });
}

// ---------------------------------------------------------------------------
// Weekly summary — 5 col [1200, 1000, 2040, 2200, 4000]
// ---------------------------------------------------------------------------
function weeklySummary(rows) {
  const widths = [1200, 1000, 2040, 2200, 4000];
  const header = new TableRow({
    tableHeader: true,
    children: ['DAY', 'INTENSITY', 'FOCUS', 'KEY LIFTS', 'TARGETS'].map((t, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      shading: shading(C.dark),
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
      children: [para([run(t, { bold: true, size: 12, color: C.white })])],
    })),
  });
  const body = (rows || []).map((r) => new TableRow({
    children: r.map((val, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
      children: [para([run(val, { size: 13, color: C.dark })])],
    })),
  }));
  return new Table({ width: { size: TW, type: WidthType.DXA }, rows: [header, ...body] });
}

function progressionBlock(accentColor) {
  return calloutBox(
    'Progressive Overload — RIR Model',
    'Add weight when you hit the top of the rep range at 2 RIR with clean form. Keep the same weight if form degrades on any set. Drop weight after missed reps, joint pain, or unusual fatigue — and flag your coach.',
    C.tealPale, accentColor || C.teal,
  );
}

function milestoneTracker(m4wk, m8wk, rescanNote) {
  return [
    para([run('MILESTONE TRACKER', { bold: true, size: 18, color: C.gold })], { spacing: { after: 100 } }),
    goldCallout('4-Week Milestones', m4wk || ''),
    spacer(120),
    goldCallout('8-Week Milestones', m8wk || ''),
    spacer(120),
    tealCallout('Rescan Note', rescanNote || 'Full Styku rescan at week 8 to track ALST index, L/R gap reduction, and lean mass change.'),
  ];
}

// ---------------------------------------------------------------------------
// Page setup / header-footer
// ---------------------------------------------------------------------------
function docSections(children, clientName) {
  return {
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      },
    },
    headers: {
      default: new Header({
        children: [para([run('CONFIDENTIAL CLIENT REPORT', { size: 10, color: C.mid, characterSpacing: 10 })], { alignment: AlignmentType.RIGHT })],
      }),
    },
    footers: {
      default: new Footer({
        children: [para([
          run(`Brace Life Studios · ${clientName} · Confidential · `, { size: 9, color: C.mid }),
          run('Page ', { size: 9, color: C.mid }),
          new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 9, color: C.mid }),
        ], { alignment: AlignmentType.CENTER })],
      }),
    },
    children,
  };
}

// ---------------------------------------------------------------------------
// buildDocument — top-level assembly
// ---------------------------------------------------------------------------
async function buildDocument(data) {
  const { client, styku, weekOverview: week, baselines, baselineNotes: notes, days, summary } = data;
  const includeNutrition = data.includeNutritionBlock !== false;
  const includeProgression = data.includeProgressionBlock !== false;
  const alstAtRisk = (client.alstIndex ?? styku?.alstIndex ?? 99) < 5.5;

  const body = [];

  // Cover
  body.push(...coverHeader(client.name, client.programTitle, data.tagLine));
  body.push(clientStats(client.stats));

  if (week && week.length) {
    body.push(para([run('WEEK OVERVIEW', { bold: true, size: 18, color: C.gold })], { spacing: { after: 100 } }));
    body.push(weekOverview(week));
    body.push(spacer(240));
  }

  if (baselines && baselines.length) {
    body.push(para([run('STRENGTH BASELINES', { bold: true, size: 18, color: C.gold })], { spacing: { after: 100 } }));
    body.push(baselinesTable(baselines));
    body.push(spacer(160));
  }
  if (notes && notes.length) {
    body.push(...baselineNotes(notes));
  }

  if (styku) {
    body.push(...stykuBlock(styku));
  }

  if (includeNutrition) {
    body.push(...nutritionBlock(client));
  }

  // Days
  (days || []).forEach((day, dayIdx) => {
    body.push(new Paragraph({ children: [new PageBreak()] }));
    const meta = INTENSITY[day.intensity] || INTENSITY['70'];
    body.push(...dayHeader(day.intensity, day.title, day.subtitle, day.descriptor));
    if (day.intensityPara) body.push(bodyPara(day.intensityPara));

    if (alstAtRisk) {
      body.push(goldCallout('Protein Reminder', `ALST At-Risk — hit your protein target today (${Math.round((client.weightKg || 0) * 2.0)}–${Math.round((client.weightKg || 0) * 2.2)}g). Creatine with your first meal.`));
      body.push(spacer(120));
    }

    if (day.warmUp) {
      body.push(goldCallout('Warm-Up', day.warmUp));
      body.push(spacer(160));
    }

    (day.blocks || []).forEach((block) => {
      body.push(sectionLabel(block.letter, block.title, meta.color));
      if (block.intro) body.push(bodyPara(block.intro));
      body.push(exTable(block.exercises, meta.color, meta.pale));
      body.push(spacer(160));
    });

    if (includeProgression) {
      body.push(progressionBlock(meta.color));
      body.push(spacer(160));
    }

    if (day.coolDown) {
      body.push(blueCallout('Cool-Down', day.coolDown));
      body.push(spacer(160));
    }

    if (day.iconsNote) {
      body.push(goldCallout('ICONS Note', day.iconsNote));
    }
  });

  if (summary) {
    body.push(new Paragraph({ children: [new PageBreak()] }));
    body.push(para([run('WEEKLY SUMMARY', { bold: true, size: 18, color: C.gold })], { spacing: { after: 100 } }));
    body.push(weeklySummary(summary.rows));
    body.push(spacer(240));
    body.push(...milestoneTracker(summary.milestones4wk, summary.milestones8wk, summary.rescanNote));
  }

  const doc = new Document({
    creator: 'Brace Life Studios — ICONS System',
    title: `${client.name} — ${client.programTitle}`,
    sections: [docSections(body, client.name)],
  });

  return Packer.toBuffer(doc);
}

module.exports = {
  buildDocument,
  C,
  coverHeader,
  clientStats,
  weekOverview,
  baselinesTable,
  baselineNotes,
  stykuBlock,
  nutritionBlock,
  dayHeader,
  exTable,
  weeklySummary,
  progressionBlock,
  milestoneTracker,
  goldCallout,
  greenCallout,
  redCallout,
  tealCallout,
  blueCallout,
  purpleCallout,
  clinicalFlag,
  watchFlag,
  clearFlag,
};
