/**
 * ICONS Template Engine — Brace Life Studios
 * Canonical .docx generator for client training plans and assessment reports.
 * Measurements, colors, and structure extracted from the Kelly Mulroy
 * 5-Day Training Plan XML (reference document). See CLAUDE.md for the
 * full project specification — this file is the source of truth it
 * describes and must stay in sync with it.
 */

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  VerticalAlign,
  ShadingType,
  Header,
  Footer,
  PageNumber,
} = require('docx');

// ---------------------------------------------------------------------------
// PAGE SETUP (US Letter)
// ---------------------------------------------------------------------------

const PAGE_W = 12240; // dxa
const PAGE_H = 15840; // dxa
const MARGIN = 900; // dxa — 0.625"
const TW = 10440; // dxa — content width
const FONT = 'Arial';

// ---------------------------------------------------------------------------
// COLOR SYSTEM
// ---------------------------------------------------------------------------

const C = {
  // Day intensity
  teal: '00695C',
  tealPale: 'E0F2F1',
  green: '43A047',
  greenPale: 'E8F5E9',
  gold: 'C9A227',
  goldPale: 'FAF3E0',
  red: 'E53935',
  redPale: 'FFEBEE',
  blue: '1565C0',
  bluePale: 'EAF4FB',

  // Text
  dark: '2C2C2C',
  mid: '6B6B6B',
  white: 'FFFFFF',

  // Clinical flags
  flagRed: 'B71C1C',
  flagAmber: 'E65100',
  flagGreen: '1B5E20',

  // Callout fills (auto-paired with borders)
  callGold: 'FAF3E0',
  callGoldB: 'C9A227',
  callGreen: 'E8F5E9',
  callGreenB: '43A047',
  callRed: 'FFEBEE',
  callRedB: 'E53935',
  callTeal: 'E0F2F1',
  callTealB: '00695C',
  callBlue: 'EAF4FB',
  callBlueB: '1565C0',
  callPurple: 'F3EEF9',
  callPurpleB: '6A1B9A',
};

// Intensity → accent/pale/label lookup used by dayHeader() and weekOverview()
const INTENSITY = {
  60: { accent: C.teal, pale: C.tealPale, label: 'TECHNIQUE DAY' },
  70: { accent: C.green, pale: C.greenPale, label: 'MODERATE DAY' },
  80: { accent: C.gold, pale: C.goldPale, label: 'PRIMARY STRENGTH DAY' },
  90: { accent: C.red, pale: C.redPale, label: 'PEAK INTENSITY DAY' },
  AR: { accent: C.blue, pale: C.bluePale, label: 'ACTIVE RECOVERY' },
};

function intensityMeta(intensity) {
  const key = String(intensity).toUpperCase().replace('%', '');
  return INTENSITY[key] || INTENSITY[80];
}

// ---------------------------------------------------------------------------
// TABLE SCHEMAS (dxa) — NEVER CHANGE
// ---------------------------------------------------------------------------

const EX_COLS = [2400, 380, 420, 680, 540, 440, 5580]; // sums to 10440
const BASELINE_COLS = [2600, 1600, 1400, 4840]; // sums to 10440
const WEEKLY_SUMMARY_COLS = [1200, 1000, 2040, 2200, 4000]; // sums to 10440
const DAY_HEADER_COLS = [1600, 8840]; // sums to 10440

// ---------------------------------------------------------------------------
// LOW-LEVEL HELPERS
// ---------------------------------------------------------------------------

function run(text, opts = {}) {
  return new TextRun({ text: String(text), font: FONT, ...opts });
}

function para(content, opts = {}) {
  let children;
  if (Array.isArray(content)) {
    children = content;
  } else if (content instanceof TextRun) {
    children = [content];
  } else {
    children = [run(content == null ? '' : content, opts.runOpts || {})];
  }
  return new Paragraph({
    children,
    alignment: opts.alignment,
    spacing: opts.spacing || { before: 40, after: 40 },
    border: opts.border,
  });
}

function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
}

function cellBorder(color, size = 4) {
  const b = { style: BorderStyle.SINGLE, size, color };
  return { top: b, bottom: b, left: b, right: b };
}

function shadedCell({ children, width, fill, borders, verticalAlign = VerticalAlign.CENTER, margins }) {
  return new TableCell({
    children,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, color: 'auto', fill } : undefined,
    borders: borders || noBorders(),
    verticalAlign,
    margins: margins || { top: 60, bottom: 60, left: 80, right: 80 },
  });
}

function headerCell(text, width, accentColor, fill) {
  return shadedCell({
    width,
    fill,
    children: [
      para(run(text, { bold: true, color: accentColor, size: 15 }), {
        alignment: AlignmentType.CENTER,
        spacing: { before: 20, after: 20 },
      }),
    ],
  });
}

// ---------------------------------------------------------------------------
// CALLOUT BLOCKS
// ---------------------------------------------------------------------------

function buildCallout(label, body, fill, borderColor, borderSize = 8) {
  const bodyParas = Array.isArray(body) ? body : [body];
  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: [TW],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: TW, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, color: 'auto', fill },
            borders: cellBorder(borderColor, borderSize),
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              para(run(label.toUpperCase(), { bold: true, color: borderColor, size: 17 }), {
                spacing: { before: 0, after: 60 },
              }),
              ...bodyParas.map((b) =>
                typeof b === 'string'
                  ? para(run(b, { color: C.dark, size: 17 }), { spacing: { before: 0, after: 0 } })
                  : b
              ),
            ],
          }),
        ],
      }),
    ],
  });
}

function goldCallout(label, body) {
  return buildCallout(label, body, C.callGold, C.callGoldB);
}
function greenCallout(label, body) {
  return buildCallout(label, body, C.callGreen, C.callGreenB);
}
function redCallout(label, body) {
  return buildCallout(label, body, C.callRed, C.callRedB);
}
function tealCallout(label, body) {
  return buildCallout(label, body, C.callTeal, C.callTealB);
}
function blueCallout(label, body) {
  return buildCallout(label, body, C.callBlue, C.callBlueB);
}
function purpleCallout(label, body) {
  return buildCallout(label, body, C.callPurple, C.callPurpleB);
}

// Clinical flags carry a thicker border than standard callouts
function clinicalFlag(label, body) {
  return buildCallout(label, body, C.callRed, C.flagRed, 24);
}
function watchFlag(label, body) {
  return buildCallout(label, body, 'FFF3E0', C.flagAmber, 14);
}
function clearFlag(label, body) {
  return buildCallout(label, body, C.callGreen, C.flagGreen, 14);
}

// ---------------------------------------------------------------------------
// COVER / OVERVIEW BLOCKS
// ---------------------------------------------------------------------------

function coverHeader(clientName, programTitle, tagLine) {
  return [
    para(run('B R A C E   L I F E   S T U D I O S', { bold: true, color: C.gold, size: 15 }), {
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120 },
    }),
    para(run((programTitle || '').toUpperCase(), { bold: true, color: C.gold, size: 52, characterSpacing: 280 }), {
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
    }),
    para(run(clientName || '', { bold: true, color: C.dark, size: 40 }), {
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    tagLine
      ? para(run(tagLine, { italics: true, color: C.mid, size: 18 }), {
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
        })
      : para('', { spacing: { before: 0, after: 100 } }),
  ];
}

function clientStats(stats) {
  const list = stats || [];
  return para(run(list.join('    |    '), { color: C.mid, size: 18 }), {
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240 },
  });
}

function weekOverview(days) {
  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell('DAY', 3480, C.white, C.dark),
      headerCell('INTENSITY', 2400, C.white, C.dark),
      headerCell('FOCUS', 4560, C.white, C.dark),
    ],
  });

  const rows = (days || []).map((d) => {
    const meta = intensityMeta(d.intensity);
    const intensityLabel = String(d.intensity).toUpperCase() === 'AR' ? 'ACTIVE RECOVERY' : `${d.intensity}%`;
    return new TableRow({
      children: [
        shadedCell({
          width: 3480,
          fill: meta.pale,
          children: [para(run(d.day || '', { bold: true, color: C.dark, size: 16 }))],
        }),
        shadedCell({
          width: 2400,
          fill: meta.pale,
          children: [
            para(run(intensityLabel, { bold: true, color: meta.accent, size: 16 }), {
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
        shadedCell({
          width: 4560,
          fill: meta.pale,
          children: [para(run(d.focus || '', { color: C.dark, size: 16 }))],
        }),
      ],
    });
  });

  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: [3480, 2400, 4560],
    rows: [header, ...rows],
  });
}

function baselinesTable(rows) {
  const header = new TableRow({
    tableHeader: true,
    children: [
      headerCell('EXERCISE', BASELINE_COLS[0], C.white, C.dark),
      headerCell('BASELINE', BASELINE_COLS[1], C.white, C.dark),
      headerCell('TESTED AT', BASELINE_COLS[2], C.white, C.dark),
      headerCell('8-WEEK TARGET', BASELINE_COLS[3], C.white, C.dark),
    ],
  });

  const dataRows = (rows || []).map((r, i) => {
    const fill = i % 2 === 0 ? 'FFFFFF' : 'F7F7F7';
    return new TableRow({
      children: r.map((val, ci) =>
        shadedCell({
          width: BASELINE_COLS[ci],
          fill,
          children: [
            para(run(val || '', { color: C.dark, size: 16, bold: ci === 0 }), {
              alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
            }),
          ],
        })
      ),
    });
  });

  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: BASELINE_COLS,
    rows: [header, ...dataRows],
  });
}

// ---------------------------------------------------------------------------
// STYKU + NUTRITION SCIENCE LAYER
// ---------------------------------------------------------------------------

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

function statRow(label, value) {
  return new TableRow({
    children: [
      shadedCell({
        width: 3480,
        fill: 'F7F7F7',
        children: [para(run(label, { color: C.mid, size: 15 }))],
      }),
      shadedCell({
        width: 6960,
        fill: 'FFFFFF',
        children: [para(run(value, { bold: true, color: C.dark, size: 16 }))],
      }),
    ],
  });
}

function stykuBlock(styku) {
  if (!styku) return [];
  const elements = [];

  elements.push(
    para(run('STYKU BODY COMPOSITION SCAN', { bold: true, color: C.teal, size: 19 }), {
      spacing: { before: 200, after: 40 },
    })
  );
  if (styku.scanDate) {
    elements.push(
      para(run(`Scan Date: ${styku.scanDate}`, { italics: true, color: C.mid, size: 15 }), {
        spacing: { before: 0, after: 120 },
      })
    );
  }

  const rows = [];
  if (styku.bodyFatPct != null)
    rows.push(statRow('Body Fat %', `${styku.bodyFatPct}%${styku.bodyFatRank ? ` (${styku.bodyFatRank})` : ''}`));
  if (styku.leanMass != null)
    rows.push(statRow('Lean Mass', `${styku.leanMass} lbs${styku.leanMassPct != null ? ` (${styku.leanMassPct}%)` : ''}`));
  if (styku.fatMass != null) rows.push(statRow('Fat Mass', `${styku.fatMass} lbs`));
  if (styku.boneMass != null) rows.push(statRow('Bone Mass', `${styku.boneMass} lbs`));
  if (styku.bmr != null) rows.push(statRow('BMR', `${styku.bmr} kcal/day`));
  if (styku.bmi != null) rows.push(statRow('BMI', `${styku.bmi}${bmiStatus(styku.bmi) ? ` — ${bmiStatus(styku.bmi)}` : ''}`));
  if (styku.vfa != null) rows.push(statRow('Visceral Fat Area (VFA)', `${styku.vfa} cm²${vfaStatus(styku.vfa) ? ` — ${vfaStatus(styku.vfa)}` : ''}`));
  if (styku.shapeScore != null)
    rows.push(statRow('Shape Score', `${styku.shapeScore}/100${styku.shapeScoreLabel ? ` (${styku.shapeScoreLabel})` : ''}`));
  if (styku.alstIndex != null)
    rows.push(statRow('ALST Index', `${styku.alstIndex} kg/m²${alstStatus(styku.alstIndex) ? ` — ${alstStatus(styku.alstIndex)}` : ''}`));
  if (styku.peerComparison) rows.push(statRow('Peer Comparison', styku.peerComparison));

  if (rows.length) {
    elements.push(
      new Table({
        width: { size: TW, type: WidthType.DXA },
        columnWidths: [3480, 6960],
        rows,
      })
    );
  }

  // Segmental LST — identify weaker side for asymmetry protocol
  const hasArms = styku.leftArmLST != null && styku.rightArmLST != null;
  const hasLegs = styku.leftLegLST != null && styku.rightLegLST != null;
  if (hasArms || hasLegs) {
    const segRows = [];
    const segHeader = new TableRow({
      tableHeader: true,
      children: [
        headerCell('SEGMENT', 3480, C.white, C.teal),
        headerCell('LEFT (lbs)', 3480, C.white, C.teal),
        headerCell('RIGHT (lbs)', 3480, C.white, C.teal),
      ],
    });
    segRows.push(segHeader);

    const segRow = (label, left, right) => {
      const weaker = left < right ? 'left' : right < left ? 'right' : null;
      const gap = Math.abs(left - right);
      const flagGap = gap >= 0.5;
      return new TableRow({
        children: [
          shadedCell({ width: 3480, fill: 'F7F7F7', children: [para(run(label, { color: C.dark, size: 15 }))] }),
          shadedCell({
            width: 3480,
            fill: weaker === 'left' && flagGap ? C.callRed : 'FFFFFF',
            children: [para(run(String(left), { bold: weaker === 'left', color: C.dark, size: 16 }), { alignment: AlignmentType.CENTER })],
          }),
          shadedCell({
            width: 3480,
            fill: weaker === 'right' && flagGap ? C.callRed : 'FFFFFF',
            children: [para(run(String(right), { bold: weaker === 'right', color: C.dark, size: 16 }), { alignment: AlignmentType.CENTER })],
          }),
        ],
      });
    };

    if (hasArms) segRows.push(segRow('Arm LST', styku.leftArmLST, styku.rightArmLST));
    if (hasLegs) segRows.push(segRow('Leg LST', styku.leftLegLST, styku.rightLegLST));

    elements.push(
      para('', { spacing: { before: 100, after: 60 } }),
      new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: [3480, 3480, 3480], rows: segRows })
    );
  }

  // Automatic clinical flags
  elements.push(para('', { spacing: { before: 100, after: 0 } }));
  if (styku.alstIndex != null && styku.alstIndex < 5.5) {
    elements.push(
      clinicalFlag(
        'ALST At-Risk',
        `ALST Index of ${styku.alstIndex} kg/m² falls below the 5.5 kg/m² sarcopenia threshold (EWGSOP2, 2018). Muscle-building is the primary physiological priority — every session emphasizes progressive resistance, protein targets escalate, and creatine is strongly indicated.`
      )
    );
  }
  if (styku.bmi != null && styku.bmi < 18.5) {
    elements.push(
      clinicalFlag(
        'BMI Underweight',
        `BMI of ${styku.bmi} is clinically underweight regardless of body fat percentage. Flag alongside ALST status — combined with a low ALST Index this indicates a sarcopenic obesity profile requiring highest-priority nutrition support.`
      )
    );
  }
  if (styku.vfa != null && styku.vfa >= 100) {
    elements.push(
      watchFlag(
        'Cardiometabolic Watch',
        `Visceral Fat Area of ${styku.vfa} cm² is at or above the 100 cm² threshold for cardiometabolic risk. Continue trend tracking at the next rescan.`
      )
    );
  }
  const armGap = hasArms ? Math.abs(styku.leftArmLST - styku.rightArmLST) : 0;
  const legGap = hasLegs ? Math.abs(styku.leftLegLST - styku.rightLegLST) : 0;
  if (armGap >= 0.5 || legGap >= 0.5) {
    const parts = [];
    if (armGap >= 0.5) {
      const weaker = styku.leftArmLST < styku.rightArmLST ? 'LEFT' : 'RIGHT';
      parts.push(`arms (${weaker} weaker, leads single-arm rows and carries)`);
    }
    if (legGap >= 0.5) {
      const weaker = styku.leftLegLST < styku.rightLegLST ? 'LEFT' : 'RIGHT';
      parts.push(`legs (${weaker} weaker, leads unilateral leg work)`);
    }
    elements.push(
      watchFlag(
        'Asymmetry Protocol',
        `A left/right gap of ≥0.5 lbs was detected in the ${parts.join(' and ')}. Lead all unilateral work with the weaker side, log left vs. right separately in coaching cues, and track the gap for reduction at the 8-week rescan.`
      )
    );
  }

  return elements;
}

function computeProteinTarget(client) {
  const weightKg = client.weightKg;
  if (!weightKg) return null;
  const atRisk = client.alstIndex != null && client.alstIndex < 5.5;
  const isOlder50 = client.ageYears != null && client.ageYears >= 50;
  const isOlder40 = client.ageYears != null && client.ageYears >= 40;

  let low;
  let high;
  if (atRisk || isOlder50 || client.isPostmenopausal) {
    low = 2.0;
    high = 2.2;
  } else if (isOlder40) {
    low = 1.8;
    high = 2.0;
  } else {
    low = 1.6;
    high = 1.8;
  }

  return {
    lowG: Math.round(low * weightKg),
    highG: Math.round(high * weightKg),
    perMealG: Math.round(0.4 * weightKg),
    low,
    high,
  };
}

function nutritionBlock(client) {
  const target = computeProteinTarget(client);
  const atRisk = client.alstIndex != null && client.alstIndex < 5.5;
  const creatineStrong = atRisk || (client.ageYears != null && client.ageYears >= 40) || client.isPostmenopausal;

  const lines = [];
  if (target) {
    lines.push(
      `Protein: ${target.lowG}–${target.highG}g/day (${target.low}–${target.high} g/kg), ~${target.perMealG}g per meal across 4+ meals/day.`
    );
  }
  lines.push(
    `Creatine: 3–5g monohydrate daily with food, no loading phase. ${
      creatineStrong ? 'Strongly indicated for this client.' : 'Indicated for all women in strength training.'
    }`
  );
  lines.push('Collagen: 15g collagen + 50mg Vitamin C, 30–60 min before loading sessions to support connective tissue synthesis.');

  return goldCallout('Evidence-Based Nutrition Targets', lines);
}

function proteinBar(client) {
  const target = computeProteinTarget(client);
  const atRisk = client.alstIndex != null && client.alstIndex < 5.5;
  if (!target) return null;
  const body = atRisk
    ? `ALST At-Risk reminder: ${target.lowG}–${target.highG}g protein today, distributed across 4+ meals (~${target.perMealG}g/meal).`
    : `Daily target: ${target.lowG}–${target.highG}g protein across 4+ meals (~${target.perMealG}g/meal).`;
  return goldCallout('Protein Reminder', body);
}

// ---------------------------------------------------------------------------
// DAY HEADER + EXERCISE TABLE
// ---------------------------------------------------------------------------

function dayHeader(intensity, title, subtitle, descriptor) {
  const meta = intensityMeta(intensity);
  const badgeText = String(intensity).toUpperCase() === 'AR' ? 'AR' : `${intensity}%`;

  const badgeCell = shadedCell({
    width: DAY_HEADER_COLS[0],
    fill: meta.pale,
    children: [
      para(run(badgeText, { bold: true, color: meta.accent, size: 32 }), {
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 20 },
      }),
      para(run(meta.label, { bold: true, color: meta.accent, size: 12 }), {
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
      }),
    ],
  });

  const contentChildren = [
    para(run((title || '').toUpperCase(), { bold: true, color: meta.accent, size: 26 }), {
      spacing: { before: 20, after: 40 },
    }),
  ];
  if (subtitle) {
    contentChildren.push(para(run(subtitle, { color: C.dark, size: 19 }), { spacing: { before: 0, after: 40 } }));
  }
  if (descriptor) {
    contentChildren.push(
      para(run(descriptor.toUpperCase(), { bold: true, color: meta.accent, size: 17 }), {
        spacing: { before: 0, after: 20 },
      })
    );
  }

  const contentCell = shadedCell({
    width: DAY_HEADER_COLS[1],
    fill: 'FFFFFF',
    verticalAlign: VerticalAlign.CENTER,
    children: contentChildren,
  });

  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: DAY_HEADER_COLS,
    rows: [
      new TableRow({
        children: [badgeCell, contentCell],
      }),
    ],
  });
}

function exTable(exercises, accentColor, paleFill) {
  const headers = ['EXERCISE', 'SETS', 'REPS', 'LOAD', 'TEMPO', 'REST', 'COACHING CUE'];
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => headerCell(h, EX_COLS[i], accentColor, paleFill)),
  });

  const rows = (exercises || []).map((ex, i) => {
    const fill = i % 2 === 0 ? 'FFFFFF' : 'F9F9F9';
    const nameChildren = [para(run(ex.name || '', { bold: true, color: C.dark, size: 16 }))];
    if (ex.flag) {
      nameChildren.push(
        para(run(ex.flag, { italics: true, color: C.flagRed, size: 14 }), { spacing: { before: 10, after: 0 } })
      );
    }

    const cueRuns = [run(ex.cue || '', { color: C.dark, size: 15 })];
    if (ex.rirNote) {
      cueRuns.push(run('  ', { size: 15 }));
      cueRuns.push(run(ex.rirNote, { color: C.teal, italics: true, size: 15 }));
    }

    return new TableRow({
      children: [
        shadedCell({ width: EX_COLS[0], fill, children: nameChildren }),
        shadedCell({
          width: EX_COLS[1],
          fill,
          children: [para(run(ex.sets || '', { color: C.dark, size: 15 }), { alignment: AlignmentType.CENTER })],
        }),
        shadedCell({
          width: EX_COLS[2],
          fill,
          children: [para(run(ex.reps || '', { color: C.dark, size: 15 }), { alignment: AlignmentType.CENTER })],
        }),
        shadedCell({
          width: EX_COLS[3],
          fill,
          children: [para(run(ex.load || '', { color: C.dark, size: 15 }), { alignment: AlignmentType.CENTER })],
        }),
        shadedCell({
          width: EX_COLS[4],
          fill,
          children: [para(run(ex.tempo || '', { color: C.dark, size: 15 }), { alignment: AlignmentType.CENTER })],
        }),
        shadedCell({
          width: EX_COLS[5],
          fill,
          children: [para(run(ex.rest || '', { color: C.dark, size: 15 }), { alignment: AlignmentType.CENTER })],
        }),
        shadedCell({ width: EX_COLS[6], fill, children: [para(cueRuns)] }),
      ],
    });
  });

  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: EX_COLS,
    rows: [headerRow, ...rows],
  });
}

function exerciseBlock(block, accentColor, paleFill) {
  const elements = [
    para(run(`${block.letter}. ${(block.title || '').toUpperCase()}`, { bold: true, color: accentColor, size: 17 }), {
      spacing: { before: 200, after: 60 },
    }),
  ];
  if (block.intro) {
    elements.push(para(run(block.intro, { color: C.dark, size: 16 }), { spacing: { before: 0, after: 80 } }));
  }
  elements.push(exTable(block.exercises, accentColor, paleFill));
  return elements;
}

// ---------------------------------------------------------------------------
// PROGRESSION / SUMMARY / MILESTONES
// ---------------------------------------------------------------------------

function progressionBlock(accentColor) {
  const lines = [
    'Add weight when: top of the rep range is reached at 2 RIR with clean form.',
    'Same weight when: form degrades before the target RIR is reached.',
    'Drop weight when: reps are missed, or pain/excess fatigue is present.',
    'RIR guide — 3+ RIR: warm-up/pattern set. 2 RIR: moderate working set. 1 RIR: hard working set. 0 RIR: near-failure, use sparingly.',
  ];
  return buildCallout('Progression Guidance', lines, 'FFFFFF', accentColor, 8);
}

function weeklySummary(rows) {
  const headers = ['DAY', '%', 'FOCUS', 'PRIMARY LIFT', 'COACH NOTES'];
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => headerCell(h, WEEKLY_SUMMARY_COLS[i], C.white, C.dark)),
  });

  const dataRows = (rows || []).map((r, i) => {
    const fill = i % 2 === 0 ? 'FFFFFF' : 'F7F7F7';
    return new TableRow({
      children: r.map((val, ci) =>
        shadedCell({
          width: WEEKLY_SUMMARY_COLS[ci],
          fill,
          children: [para(run(val || '', { color: C.dark, size: 15 }), { alignment: ci <= 1 ? AlignmentType.CENTER : AlignmentType.LEFT })],
        })
      ),
    });
  });

  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: WEEKLY_SUMMARY_COLS,
    rows: [headerRow, ...dataRows],
  });
}

function milestoneTracker(fourWk, eightWk, rescanNote) {
  const elements = [
    para(run('MILESTONE TRACKING', { bold: true, color: C.gold, size: 19 }), {
      spacing: { before: 200, after: 100 },
    }),
  ];
  if (fourWk) elements.push(goldCallout('4-Week Milestone', fourWk));
  if (eightWk) elements.push(goldCallout('8-Week Milestone', eightWk));
  if (rescanNote) elements.push(tealCallout('Styku Rescan Note', rescanNote));
  return elements;
}

// ---------------------------------------------------------------------------
// HEADER / FOOTER
// ---------------------------------------------------------------------------

function buildFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: {
          top: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 4 },
        },
        children: [
          run('Confidential', { color: C.mid, size: 14, italics: true }),
          run('   |   Brace Life Studios   |   Page ', { color: C.mid, size: 14 }),
          new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 14, color: C.mid }),
          run(' of ', { color: C.mid, size: 14 }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 14, color: C.mid }),
        ],
      }),
    ],
  });
}

// ---------------------------------------------------------------------------
// buildDocument — PRIMARY ENTRY POINT
// ---------------------------------------------------------------------------

async function buildDocument(data) {
  const client = data.client || {};
  const includeNutritionBlock = data.includeNutritionBlock !== false;
  const includeProgressionBlock = data.includeProgressionBlock !== false;
  const atRisk = client.alstIndex != null && client.alstIndex < 5.5;

  const children = [];

  // ---- Cover ----
  children.push(...coverHeader(client.name, client.programTitle, "It's not about working out. It's about working in.™"));
  if (client.stats && client.stats.length) children.push(clientStats(client.stats));

  if (data.weekOverview && data.weekOverview.length) {
    children.push(
      para(run('WEEK OVERVIEW', { bold: true, color: C.gold, size: 19 }), { spacing: { before: 100, after: 100 } }),
      weekOverview(data.weekOverview)
    );
  }

  if (data.baselines && data.baselines.length) {
    children.push(
      para(run('STRENGTH BASELINES', { bold: true, color: C.gold, size: 19 }), { spacing: { before: 300, after: 100 } }),
      baselinesTable(data.baselines)
    );
  }

  if (data.baselineNotes && data.baselineNotes.length) {
    const calloutByType = {
      green: greenCallout,
      gold: goldCallout,
      red: redCallout,
      teal: tealCallout,
      blue: blueCallout,
      purple: purpleCallout,
    };
    children.push(para('', { spacing: { before: 100, after: 0 } }));
    data.baselineNotes.forEach((note) => {
      const fn = calloutByType[note.type] || goldCallout;
      children.push(fn(note.label, note.body), para('', { spacing: { before: 60, after: 0 } }));
    });
  }

  if (data.styku) {
    children.push(...stykuBlock(data.styku));
  }

  if (includeNutritionBlock && client.weightKg) {
    children.push(para('', { spacing: { before: 100, after: 0 } }), nutritionBlock(client));
  }

  // ---- Training Days ----
  (data.days || []).forEach((day) => {
    const meta = intensityMeta(day.intensity);
    children.push(new Paragraph({ children: [], pageBreakBefore: true }));
    children.push(dayHeader(day.intensity, day.title, day.subtitle, day.descriptor));

    if (day.intensityPara) {
      children.push(
        para(run(day.intensityPara, { color: C.dark, size: 16, italics: true }), { spacing: { before: 100, after: 120 } })
      );
    }

    if (atRisk && client.weightKg) {
      const bar = proteinBar(client);
      if (bar) children.push(bar, para('', { spacing: { before: 80, after: 0 } }));
    }

    if (day.warmUp) {
      children.push(goldCallout('Warm-Up', day.warmUp), para('', { spacing: { before: 100, after: 0 } }));
    }

    (day.blocks || []).forEach((block) => {
      children.push(...exerciseBlock(block, meta.accent, meta.pale));
    });

    if (day.coolDown) {
      children.push(para('', { spacing: { before: 100, after: 0 } }), blueCallout('Cool-Down', day.coolDown));
    }

    if (day.iconsNote) {
      children.push(para('', { spacing: { before: 100, after: 0 } }), goldCallout('ICONS Note', day.iconsNote));
    }

    if (includeProgressionBlock) {
      children.push(para('', { spacing: { before: 100, after: 0 } }), progressionBlock(meta.accent));
    }
  });

  // ---- Weekly Summary ----
  if (data.summary) {
    children.push(new Paragraph({ children: [], pageBreakBefore: true }));
    children.push(
      para(run('WEEKLY SUMMARY', { bold: true, color: C.gold, size: 24, characterSpacing: 100 }), {
        spacing: { before: 0, after: 160 },
      })
    );
    if (data.summary.rows && data.summary.rows.length) {
      children.push(weeklySummary(data.summary.rows));
    }
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
        footers: { default: buildFooter() },
        children,
      },
    ],
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 16, color: C.dark },
        },
      },
    },
  });

  return Packer.toBuffer(doc);
}

module.exports = {
  buildDocument,
  C,
  intensityMeta,
  coverHeader,
  clientStats,
  weekOverview,
  baselinesTable,
  stykuBlock,
  nutritionBlock,
  proteinBar,
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
