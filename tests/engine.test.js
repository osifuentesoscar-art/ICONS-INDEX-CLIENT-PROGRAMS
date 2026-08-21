'use strict';
// Regression tests for scripts/icons_template.js — the single document
// engine behind every client deliverable (33 consumer scripts).
//
// Scope is deliberately the engine's decision logic, not its visual
// layout: the calculations that set a client's loads and nutrition
// targets, the asymmetry trigger, and the Client View audience filters
// that decide what a client is allowed to read. Layout stays a human
// audit (icons-doc-auditor); these are the parts where a silent wrong
// answer ships as clinical-sounding text in a real document.
//
// Run: npm test
const test = require('node:test');
const assert = require('node:assert/strict');

const T = require('../scripts/icons_template.js');
const { docxText } = require('./helpers/docx-text.js');

// ── 1RM / LOAD MATH ────────────────────────────────────────────────────
test('epley1RM applies the Epley formula and rounds', () => {
  assert.equal(T.epley1RM(195, 5), 228); // Elizabeth Poyner's documented hex DL
  assert.equal(T.epley1RM(100, 1), 103);
});

test('workingLoad rounds to the nearest 5 lbs by default', () => {
  assert.equal(T.workingLoad(228, 0.8), 180);
  assert.equal(T.workingLoad(228, 0.92), 210);
  assert.equal(T.workingLoad(228, 0.8, 10), 180);
});

test('pctOfBodyweight returns null rather than NaN on missing input', () => {
  assert.equal(T.pctOfBodyweight(135, 150), 90);
  assert.equal(T.pctOfBodyweight(null, 150), null);
  assert.equal(T.pctOfBodyweight(135, 0), null);
});

// ── ASYMMETRY ──────────────────────────────────────────────────────────
// Getting the weaker side backwards is called out in CLAUDE.md's Common
// Mistakes as a documented real bug: lower LST = weaker = leads.
test('weakerSide picks the LOWER lean-soft-tissue side', () => {
  assert.equal(T.weakerSide(7.0, 6.2), 'right');
  assert.equal(T.weakerSide(6.2, 7.0), 'left');
});

test('weakerSide treats a sub-0.1 lb gap as noise, not a direction', () => {
  assert.equal(T.weakerSide(12.75, 12.7), 'even');
  assert.equal(T.weakerSide(12.7, 12.7), 'even');
});

test('asymmetryGapPct measures the gap against the larger side', () => {
  assert.equal(T.asymmetryGapPct(9, 10), 10);
  assert.equal(T.asymmetryGapPct(10, 9), 10);
  assert.equal(T.asymmetryGapPct(10, 10), 0);
});

test('asymmetryGapPct returns null on unusable input', () => {
  assert.equal(T.asymmetryGapPct(0, 0), null);
  assert.equal(T.asymmetryGapPct(undefined, 10), null);
  assert.equal(T.asymmetryGapPct(10, NaN), null);
});

test('asymmetryReport triggers at the 10% relative threshold, not below', () => {
  assert.equal(T.asymmetryReport(9, 10).triggered, true);      // exactly 10%
  assert.equal(T.asymmetryReport(9.1, 10).triggered, false);   // 9%
  assert.equal(T.asymmetryReport(8, 10).triggered, true);      // 20%
});

// The whole reason this helper exists: under the retired 0.5 lb absolute
// trigger, any non-'even' weakerSide() result read as "protocol applies".
// Elizabeth Poyner's post-rescan legs (12.7 / 13.1) are the documented
// case of a real direction that is NOT a real asymmetry — her document
// states "below threshold, monitor only, no unilateral-lead protocol
// change indicated".
test('a directional gap below 10% does not trigger the protocol', () => {
  const r = T.asymmetryReport(12.7, 13.1);
  assert.equal(r.weaker, 'left');       // direction is real
  assert.equal(r.triggered, false);     // magnitude is not
  assert.equal(r.gapPct, 3.1);
  assert.equal(r.gapAbs, 0.4);
});

test('asymmetryReport accepts a raised threshold for scan-region CV', () => {
  assert.equal(T.asymmetryReport(9, 10).triggered, true);
  assert.equal(T.asymmetryReport(9, 10, { thresholdPct: 15 }).triggered, false);
});

test('asymmetryReport never reports a gap it also calls triggered at 0', () => {
  const r = T.asymmetryReport(10, 10);
  assert.equal(r.weaker, 'even');
  assert.equal(r.triggered, false);
});

// ── NUTRITION ──────────────────────────────────────────────────────────
// Locks in the 8/17/2026 correction (applied 8/19): ~0.3 g/kg per meal,
// down from the retired 0.4 g/kg leucine-threshold figure.
test('proteinTargets computes ~0.3 g/kg per meal', () => {
  const t = T.proteinTargets({ weightKg: 60, ageYears: 45 });
  assert.equal(t.perMeal, 18);
});

test('proteinTargets flags ALST At-Risk below 5.5 kg/m2', () => {
  const atRisk = T.proteinTargets({ weightKg: 60, ageYears: 45, alstIndex: 5.2 });
  const normal = T.proteinTargets({ weightKg: 60, ageYears: 45, alstIndex: 5.9 });
  assert.equal(atRisk.atRisk, true);
  assert.equal(normal.atRisk, false);
  assert.ok(atRisk.proteinLow > normal.proteinLow);
});

// ── AUDIENCE RESOLUTION ────────────────────────────────────────────────
test('resolveAudience leaves the trainer document completely untouched', () => {
  assert.equal(T.resolveAudience(false, 'trainer text', undefined, undefined), 'trainer text');
  assert.equal(T.resolveAudience(false, 'trainer text', 'client text', 'internal'), 'trainer text');
});

test('resolveAudience drops an internal field in Client View', () => {
  assert.equal(T.resolveAudience(true, 'trainer text', undefined, 'internal'), null);
});

test('resolveAudience passes a field through when not marked internal', () => {
  assert.equal(T.resolveAudience(true, 'shared text', undefined, undefined), 'shared text');
});

test('a client variant wins over an internal marking', () => {
  assert.equal(T.resolveAudience(true, 'trainer text', 'client text', 'internal'), 'client text');
  assert.equal(T.resolveAudience(true, 'trainer text', 'client text', undefined), 'client text');
});

test('milestoneTracker skips a falsy field instead of an empty callout', () => {
  assert.equal(T.milestoneTracker(null, null, null).length, 0);
  assert.ok(T.milestoneTracker('4wk text', null, null).length > 0);
});

// ── END TO END: TRAINER DOCUMENT vs CLIENT VIEW ────────────────────────
// The Client View contract, per CLAUDE.md: both documents come from the
// SAME buildDocument() call on the SAME data object, so workout content
// can never drift; only audience-marked fields differ.
const FIXTURE = {
  client: {
    name: 'Test Client',
    programTitle: '2-Day Training Plan',
    subtitle: 'Test Subtitle',
    schedule: 'Tue / Thu',
    weightKg: 60,
    ageYears: 52,
  },
  baselineNotes: [
    { type: 'gold', label: 'Shared Note', body: 'SHARED_BASELINE_NOTE_TEXT' },
    { type: 'gold', label: 'Internal Note', body: 'INTERNAL_BASELINE_NOTE_TEXT', audience: 'internal' },
  ],
  includeNutritionBlock: false,
  days: [
    {
      intensity: '80%',
      title: 'Day 1',
      subtitle: 'Lower',
      descriptor: 'STRENGTH',
      intensityLabel: 'Primary Strength Day',
      intensityPara: 'Test intensity paragraph.',
      blocks: [
        {
          letter: 'A',
          title: 'Primary Compound',
          intro: 'INTERNAL_BLOCK_INTRO_TEXT',
          introAudience: 'internal',
          exercises: [
            {
              name: 'UNIQUE_EXERCISE_NAME', sets: '4', reps: '6', load: '135 lbs',
              tempo: '3-1-1', rest: '2 min', cue: 'Brace before descent.',
              insight: 'INTERNAL_INSIGHT_TEXT', insightAudience: 'internal',
              flag: 'SHARED_FLAG_TEXT',
            },
          ],
        },
        {
          letter: 'B',
          title: 'Accessory',
          intro: 'TRAINER_VARIANT_INTRO_TEXT',
          introClient: 'CLIENT_VARIANT_INTRO_TEXT',
          exercises: [
            { name: 'Second Exercise', sets: '3', reps: '10', load: '40 lbs', tempo: '2-0-2', rest: '90s', cue: 'Controlled.' },
          ],
        },
      ],
    },
  ],
  summary: {
    rows: [['Day 1', '80%', 'Lower', 'Squat', 'Add 5 lbs']],
    milestones4wk: 'SHARED_4WK_TEXT',
    milestones8wk: 'TRAINER_8WK_TEXT',
    milestones8wkClient: 'CLIENT_8WK_TEXT',
    rescanNote: 'INTERNAL_RESCAN_TEXT',
    rescanNoteAudience: 'internal',
  },
};

test('trainer document renders every field, filtered or not', async () => {
  const text = docxText(await T.buildDocument(FIXTURE));
  for (const phrase of [
    'SHARED_BASELINE_NOTE_TEXT', 'INTERNAL_BASELINE_NOTE_TEXT',
    'INTERNAL_BLOCK_INTRO_TEXT', 'TRAINER_VARIANT_INTRO_TEXT',
    'INTERNAL_INSIGHT_TEXT', 'SHARED_FLAG_TEXT',
    'SHARED_4WK_TEXT', 'TRAINER_8WK_TEXT', 'INTERNAL_RESCAN_TEXT',
    'UNIQUE_EXERCISE_NAME',
  ]) {
    assert.ok(text.includes(phrase), `trainer document missing ${phrase}`);
  }
  // Client-only strings must never appear in the trainer document.
  assert.ok(!text.includes('CLIENT_VARIANT_INTRO_TEXT'));
  assert.ok(!text.includes('CLIENT_8WK_TEXT'));
});

test('client view drops every internal-marked field', async () => {
  const text = docxText(await T.buildDocument({ ...FIXTURE, viewMode: 'client' }));
  for (const phrase of [
    'INTERNAL_BASELINE_NOTE_TEXT',
    'INTERNAL_BLOCK_INTRO_TEXT',
    'INTERNAL_INSIGHT_TEXT',
    'INTERNAL_RESCAN_TEXT',
    'TRAINER_VARIANT_INTRO_TEXT',
    'TRAINER_8WK_TEXT',
  ]) {
    assert.ok(!text.includes(phrase), `client view leaked ${phrase}`);
  }
});

test('client view renders client variants in place of trainer text', async () => {
  const text = docxText(await T.buildDocument({ ...FIXTURE, viewMode: 'client' }));
  assert.ok(text.includes('CLIENT_VARIANT_INTRO_TEXT'));
  assert.ok(text.includes('CLIENT_8WK_TEXT'));
});

test('workout content is identical in both views', async () => {
  const trainer = docxText(await T.buildDocument(FIXTURE));
  const client = docxText(await T.buildDocument({ ...FIXTURE, viewMode: 'client' }));
  for (const phrase of [
    'UNIQUE_EXERCISE_NAME', 'Second Exercise', '135 lbs', '40 lbs',
    'Brace before descent.', 'SHARED_FLAG_TEXT',
    'SHARED_BASELINE_NOTE_TEXT', 'SHARED_4WK_TEXT',
  ]) {
    assert.ok(trainer.includes(phrase), `trainer missing ${phrase}`);
    assert.ok(client.includes(phrase), `client view missing ${phrase}`);
  }
});

test('an unmarked document is byte-identical in structure across a rebuild', async () => {
  // Guards the "same call, same data" contract: nothing in the engine may
  // make a document depend on hidden state between builds.
  const a = docxText(await T.buildDocument(FIXTURE));
  const b = docxText(await T.buildDocument(FIXTURE));
  assert.equal(a, b);
});
