/**
 * Pre-export validation gate for ICONS client data.json.
 *
 * Deterministic, non-LLM checks that catch the failure modes prose
 * generation is prone to: a "weaker side" conclusion that contradicts the
 * raw Styku numbers it should have been derived from, stray generation
 * artifacts, and cue text that will overflow in the PDF. Returns a list of
 * findings; generate.mjs blocks rendering on any 'error' severity finding.
 */

function collectTextFields(data) {
  const texts = [];
  const push = (loc, s) => { if (s) texts.push([loc, String(s)]); };

  (data.baselineNotes || []).forEach((n, i) => {
    push(`baselineNotes[${i}].label`, n.label);
    push(`baselineNotes[${i}].body`, n.body);
  });
  (data.weekOverview || []).forEach((w, i) => push(`weekOverview[${i}].focus`, w.focus));
  (data.days || []).forEach((day, di) => {
    push(`days[${di}].title`, day.title);
    push(`days[${di}].subtitle`, day.subtitle);
    push(`days[${di}].descriptor`, day.descriptor);
    push(`days[${di}].intensityPara`, day.intensityPara);
    push(`days[${di}].iconsNote`, day.iconsNote);
    (day.blocks || []).forEach((b, bi) => {
      push(`days[${di}].blocks[${bi}].intro`, b.intro);
      (b.exercises || []).forEach((ex, ei) => {
        push(`days[${di}].blocks[${bi}].exercises[${ei}].name`, ex.name);
        push(`days[${di}].blocks[${bi}].exercises[${ei}].cue`, ex.cue);
        push(`days[${di}].blocks[${bi}].exercises[${ei}].flag`, ex.flag);
      });
    });
  });
  if (data.summary) {
    push('summary.milestones4wk', data.summary.milestones4wk);
    push('summary.milestones8wk', data.summary.milestones8wk);
    push('summary.rescanNote', data.summary.rescanNote);
  }
  return texts;
}

// Given left/right LST values, the ICONS rule is: the LOWER number is the
// weaker side and should lead unilateral work. Returns null if either value
// is missing, or { weaker: 'left'|'right'|null, gap } — weaker is null when
// the gap doesn't cross the 0.5 lb protocol trigger (no side should be
// claimed as "leading" in that case).
function weakerSide(leftVal, rightVal) {
  if (leftVal == null || rightVal == null) return null;
  const gap = Math.abs(leftVal - rightVal);
  if (gap < 0.5) return { weaker: null, gap };
  return { weaker: leftVal < rightVal ? 'left' : 'right', gap };
}

function checkAsymmetryConsistency(data, texts, issues) {
  const styku = data.styku;
  if (!styku) return;

  const parts = [
    { label: 'leg', left: styku.leftLegLST, right: styku.rightLegLST },
    { label: 'arm', left: styku.leftArmLST, right: styku.rightArmLST },
  ];

  for (const part of parts) {
    const result = weakerSide(part.left, part.right);
    if (!result || !result.weaker) continue;
    const wrongSide = result.weaker === 'left' ? 'right' : 'left';
    const leadRe = new RegExp(`\\b${wrongSide}\\b[^.]{0,50}?\\b(leads?|leading)\\b`, 'i');
    const weakerRe = new RegExp(`\\b${wrongSide}\\s+(leg|arm)\\b[^.]{0,30}?\\bweaker\\b`, 'i');
    for (const [loc, text] of texts) {
      if (leadRe.test(text) || weakerRe.test(text)) {
        issues.push({
          severity: 'error',
          loc,
          message:
            `${part.label} asymmetry contradiction: Styku LST is L=${part.left} / R=${part.right} ` +
            `(gap ${result.gap.toFixed(1)} lbs) — the LOWER number (${result.weaker}) is the weaker ` +
            `side per the ICONS rule, but this text says "${wrongSide}" leads/is weaker: "${text}"`,
        });
      }
    }
  }
}

function checkStrayArtifacts(texts, issues) {
  const patterns = [/\bundefined\b/, /\bNaN\b/, /\bTODO\b/i, /\bFIXME\b/i, /```/, /\[object Object\]/];
  for (const [loc, text] of texts) {
    for (const pat of patterns) {
      if (pat.test(text)) {
        issues.push({ severity: 'error', loc, message: `stray artifact ${pat} in: "${text}"` });
      }
    }
  }
}

function checkCueLength(data, issues) {
  (data.days || []).forEach((day, di) => {
    (day.blocks || []).forEach((b, bi) => {
      (b.exercises || []).forEach((ex, ei) => {
        if (ex.cue && ex.cue.length > 50) {
          issues.push({
            severity: 'warning',
            loc: `days[${di}].blocks[${bi}].exercises[${ei}].cue`,
            message: `cue is ${ex.cue.length} chars (>50) — will wrap to 2 lines in the PDF row: "${ex.cue}"`,
          });
        }
      });
    });
  });
}

export function validateClientData(data) {
  const issues = [];
  const texts = collectTextFields(data);
  checkAsymmetryConsistency(data, texts, issues);
  checkStrayArtifacts(texts, issues);
  checkCueLength(data, issues);
  return issues;
}

export function formatIssues(issues) {
  return issues
    .map((i) => `  [${i.severity.toUpperCase()}] ${i.loc}: ${i.message}`)
    .join('\n');
}
