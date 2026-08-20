# ICONS Performance Assessment Report — `buildAssessmentReport()`

The initial baseline report a client receives after her first Styku scan and
strength battery, *before* her training plan is built. Distinct from
`buildDocument()` (training plan) and `buildImprovementDoc()` (before/after
progress report).

**This document type deliberately uses boxes.** A dark header band, an 8-box
Styku stat grid, colored callout boxes, a flagged-row strength table, a tan
methodology appendix. That is not a violation of the training-plan engine's
"no boxes" convention — that convention is scoped to training plans and stays as
it is. The two document types have different visual languages on purpose.

Reference build: `scripts/rena_paul_assessment_report.js`.

## Data schema

```js
{
  client: { name, assessmentDate },
  badge: 'INITIAL BASELINE',
  introText,                 // optional — defaults to DEFAULT_ASSESSMENT_INTRO
  pillars,                   // optional — defaults to Aesthetics/Health/Bio Age
  styku: { /* same fields as buildDocument, plus vfaTag, bmiLabel,
              fatMassPct, boneMassPct, peerComparison */ },
  segmental: [{ label: 'Left Arm', value: '6.3 lbs' }],
  alstRow: { label, value, footnote },
  asymmetryNote,
  strength: { protocolIntro, rows: [...] },
  flagsSummary,              // optional text under the strength table
  benefitCards: [...],
  cardsPerPage,              // optional
  measurements: [...],       // circumference grid — handles a partial set
  measurementsNote,          // used when measurements are absent
  observations: [{ tone, label, body }],
  jasonNotes,                // optional — see below
  nextSteps: [{ title, body }],
  footnotes: [...],
  corrections,               // optional — for later revisions
}
```

Missing fields degrade gracefully rather than printing `undefined`: a stat box
with no value is omitted, the scan-date line renders only when a date exists, and
a `styku` object yielding no renderable content skips its section entirely rather
than leaving an orphaned heading. Lean on that instead of inventing filler.

## Page structure

1. **Cover / Styku** — three pillar badges (Aesthetics / Health / Biological Age)
   with the "Biological Age is a coaching framework, not a lab test" disclaimer,
   the 8-box stat grid via `statBoxGrid(standardStykuStatItems(styku))`, a
   Reference-Group Comparison box, and Segmental Lean Mass Distribution using the
   corrected ≥10% relative asymmetry language — never the retired 0.5 lb absolute
   trigger.
2. **Strength Assessment** — the 10 core movements plus bonus Pull-Ups via
   `strengthAssessmentTable(rows)`, a flagged-row summary, and the "How to Read
   %BW and Level" box.
3. **Exercise Benefit Breakdown** — one `benefitCard` per tested movement.
4. **Body Measurements & Next Steps** — the circumference grid, Trainer
   Observation cards, an optional Jason PT-notes section, and numbered Next Steps
   cards (flexible count).
5. **Methodology appendix** — `footnotesList(footnotes)` plus a corrections box on
   revisions.

## Strength table rows

```js
{ num: 1, exercise: 'Deadlift (Hex or BB)', weight: '85 lbs', reps: '5',
  pctBW: `${pctOfBodyweight(85, BW)}%`, level: 'Intermediate',
  notes: 'Strong baseline — well above typical new-client starting loads.' }

{ num: 2, exercise: 'Back Squat', notTested: true,
  notes: 'Not tested today — Goblet Squat established as new working baseline.' }
```

`notTested: true` renders a muted row with em-dashes. Use it. An untested
movement gets an honest row, never an invented weight — the numbers here feed
directly into the training plan's working loads, so a fabricated baseline
propagates into loads a real person lifts.

`flagged: true` highlights the row. `level` is one of Novice / Intermediate /
Advanced and renders as a colored chip.

**Level is a coach judgment call, not a formula.** It combines an ExRx 1RM-based
reference table with a visual assessment of movement quality on the day. Do not
compute it from weight, reps, and bodyweight, and do not hardcode a percentile
table into the engine — it is an input field the trainer supplies, informed by
the client's training history and how the movement actually looked.

## Benefit cards

`EXERCISE_BENEFIT_LIBRARY` covers all 10 core movements plus Pull-Ups, keyed as
`Deadlift`, `BackSquat`, `OverheadPress`, `InclineDumbbellPress`, `Push-Ups`,
`FarmersCarry`, `HipThrust`, `Single-LegRDL`, `Lunges`, `PlankHold`, `Pull-Ups`.

```js
benefitLinesFromLibrary('HipThrust', {
  healthFootnote: 10,
  bioAgeFootnote: 9,
})
```

The library copy is already written to the corrected clinical framing. Preserve
it: no "reduces osteoporosis risk" claim on Deadlift — bone-loading benefit only,
since a single assessment with no bone-density scan cannot establish individual
risk reduction. No "strengthens the pelvic floor" claim on Hip Thrust —
co-activation during a lift is not PFM strengthening, and heavy lifting is not a
substitute for targeted pelvic floor training.

## Footnotes are data, not prose

```js
data.footnotes = [
  ...DEFAULT_ASSESSMENT_FOOTNOTES(data),   // 1–8, shared and reusable
  { marker: 9,  text: '...' },             // exercise-specific, numbered from 9
  { marker: 10, text: '...' },
];
```

The default eight — Body Fat Rank, BMR, Shape Score, VFA, Peer Comparison, ALST,
%BW & Level, and segmental-composition reliability — apply to any client with no
edits. **Never hand-duplicate them into a new script.** Doing so creates a silent
drift risk: the engine's copy gets corrected and the hand-written copy doesn't.
That exact mistake happened in the pilot build and was caught in audit.

**Never cite a source you haven't verified independently** — including one that
arrived in a reference document from Xolokan. The pilot's Hip Thrust footnote
carried an uncited "Skaug et al. 2024" reference flagged as unverifiable; it
turned out to be real and is now properly cited, but the verification step is
what made that knowable.

## Jason's PT notes

Rendered as a section *within* this report via `jasonNotesSection()`, placed
after Trainer Observations and before Next Steps — not as a separate companion
document the way Client View is.

Populate it only when real PT or rehab data exists for that client. A placeholder
section for a client with no coordinated-care relationship with Jason is
decorative, not informative. When `icons-intake-monitor`'s sweep of the "ICONS
NOTES JASON PDFS" folder surfaces new note data for a client with an Assessment
Report, that's the trigger to populate or update this section.

## Reassessment language

The two clocks: strength re-checked every **4 weeks** against the program's Week
4 targets; the Styku body-composition rescan on its own **8–12 week** cycle.
Tracked separately, not on the same clock.

Older reference material — including the Anna Samuelsson document this report
type was modeled on — says "reassessed every 8–12 weeks" for both. That predates
the correction. Copy the phrasing from `scripts/rena_paul_assessment_report.js`,
where it appears in three rendered places: `strength.protocolIntro`, the
Reassessment card in `nextSteps`, and any observation-card phrasing that
references a new baseline.
