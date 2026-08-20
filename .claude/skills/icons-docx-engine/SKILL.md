---
name: icons-docx-engine
description: The canonical icons_template.js .docx engine: page setup, three-tier color system, callout colour rules, exercise/baseline/summary table column widths, the full buildDocument() data schema, buildImprovementDoc(), and the exported API. Load before building or editing any ICONS client training plan, improvement report, or assessment report.
---

## THE TEMPLATE ENGINE — `icons_template.js`

**Location:** `scripts/icons_template.js`
**Usage:** `const { buildDocument } = require('./icons_template');`

This is the canonical source of truth for all `.docx` client documents. Every measurement, color, and structure was **XML-audited directly against the actual Kelly Mulroy 5-Day Training Plan client deliverable** (uploaded Aug 2026, not just described) — see `docs/reference/` note below.

### Visual language — confirmed from the reference document
```
- Compact and editorial. NO bordered/shaded "alert box" callouts anywhere.
  Every callout (warm-up, cool-down, ICONS Note, baseline notes, clinical
  flags, block intros) is ONE paragraph: a bold colored label run
  ("Warm-Up:  ") followed by a regular dark body run. Label text is
  Title Case, never forced uppercase.
- A running header (brand name left, client/program right) and footer
  (studio credit left, client/schedule right) on every page, each set
  off by a hairline gold rule.
- Exercise/baseline/summary table headers use a PALE tint background with
  BOLD COLORED text — not a solid color bar with white text.
- Every color has three tiers: accent (solid), table-head tint, and a
  stripe tint (alternating table rows, lighter than the head tint).
  Gold is the one exception: its DAY-HEADER pale cell uses the stripe
  tint (#FAF3E0), not the head tint (#F5E8C0) — the head tint reads too
  saturated across a full-width band. Everywhere else, table-head tint
  === day-header pale cell color.
```
This superseded the engine's earlier "bordered box" callout design (kept in git history) once the actual reference document was available — the abstract system-prompt description of `clinicalFlag` as a "thick red border" turned out not to match production. Even the reference's most severe note ("Corrective Priorities") renders as a plain bold-red label, no border. Follow the document, not the abstraction, when they disagree.

### Page Setup (US Letter)
```
PAGE_W = 12240 dxa
PAGE_H = 15840 dxa
MARGIN = 900 dxa (0.625" all sides)
TW     = 10440 dxa (content width)
Font   = Arial throughout, 8.5pt (size 17) default body
```

### Color System — three tiers per hue (`HUES` object), exposed via `C`
```javascript
// hue: { accent, head (table headers / day-header pale), stripe (alt rows) }
teal   : #00695C / #E0F2F1 / #F0FAFA   // 60%
green  : #43A047 / #E8F5E9 / #F1F8F2   // 70%
gold   : #C9A227 / #F5E8C0 / #FAF3E0   // 80% — day-header pale uses stripe (#FAF3E0), not head
red    : #E53935 / #FFEBEE / #FFF5F5   // 90%
blue   : #1565C0 / #EAF4FB / #F0F7FF   // Active Recovery
purple : #6A1B9A / #F3EEF9 / #F8F4FB   // pull-up pathway / posterior chain (no reference example — estimated stripe)
gray   : #6B6B6B / #F0F0F0 / #F0F0F0   // "Off" days in the week strip

C.dark #2C2C2C · C.mid #6B6B6B · C.white #FFFFFF · C.offGray #F0F0F0
C.warmGreen #2E7D32   // Warm-Up label color — distinct from C.green, used on every day regardless of intensity
C.goldDeep  #B8860B   // baselines/summary table header TEXT color (table fill stays goldHead #F5E8C0)
C.flagRed #B71C1C · C.flagAmber #E65100 · C.flagGreen #1B5E20   // clinicalFlag/watchFlag/clearFlag label colors
```

### Callout Color Assignments — USE THESE RULES
All callouts render as a single compact labeled paragraph (see "Visual language" above) — no border, no fill.
```
goldCallout   → general coaching, ICONS Notes
greenCallout  → baseline notes, positive performance data, PRs, cleared status
redCallout    → shoulder flags, corrective priorities, overhead suspension, near-maximal notes
tealCallout   → Styku scan data, assessment findings, asymmetry
blueCallout   → cool-down, recovery, mobility
purpleCallout → pull-up pathway, posterior chain notes
clinicalFlag  → ALST At-Risk, BMI underweight, RED-S — same compact style, C.flagRed text
watchFlag     → asymmetry alerts, moderate risk, pelvic floor safety notes — C.flagAmber text
clearFlag     → shoulder cleared, milestone achieved — C.flagGreen text
```
Two elements in `buildDocument()`'s per-day flow are NOT built from these generic callouts, because the reference document colors them independently of content type: **Warm-Up** always uses `C.warmGreen` (#2E7D32 — distinct from `C.green`/greenCallout, and constant regardless of the day's own intensity color), and the **intensity paragraph** (`day.intensityLabel`, e.g. "60% Day:") is colored with that day's own accent.
The same color rule applies to **block headers** (`block.color`, optional): omit it to use the day's own intensity color (primary strength blocks); set `'red'` for a corrective circuit tied to a flagged movement fault; `'gold'` for generic accessory/stability/mobility blocks; `'green'` for a block tracking a baseline/PR metric (e.g. a push-up protocol block). On Active Recovery days, leave every block uncolored — there's no clinical corrective context on a recovery day, so everything stays the day's own blue.

### Exercise Table Column Widths — NEVER CHANGE
```
EXERCISE   : 2400 dxa
SETS       :  380 dxa
REPS       :  420 dxa
LOAD       :  680 dxa
TEMPO      :  540 dxa
REST       :  440 dxa
COACHING CUE: 5580 dxa
TOTAL      : 10440 dxa ✓
```
Header row: EXERCISE/COACHING CUE at 7.5pt bold, SETS/REPS/LOAD/TEMPO/REST at 6.5pt bold, colored text on the block's table-head tint. Body: exercise name 9pt bold dark; numeric columns 7.5pt `C.mid`; coaching cue 8.5pt `C.mid`. Rows alternate the block's stripe tint / white, starting with the stripe tint on the first body row.

### Other Table Schemas
```
Baselines (4 col)   : [2600, 1600, 1400, 4840]  — header fill goldHead, text 7pt bold goldDeep
Weekly Summary (5)  : [1200, 1000, 2040, 2200, 4000] — same gold-branded header treatment
Day Header (2 col)  : [1600, 8840]  — badge cell solid accent + "INTENSITY" sub-label; title cell day-pale tint
Week Strip (N col)  : TW divided evenly across up to 7 day-columns, remainder on the last two
```

### API — Primary Functions
```javascript
// Build complete document from data object
await buildDocument(data) → Buffer

// Build a standalone before/after progress report (NOT a training plan —
// skips the days/blocks/baselines schema entirely). See "Brace Life
// Improvement Report" below for the data shape.
await buildImprovementDoc(data) → Buffer
comparisonTable(headers[4], rows[][4])   // the 4-col before/after table buildImprovementDoc() uses internally — exported for reuse

// Blocks (compose custom pages)
coverHeader(clientName, programTitle, subtitleLine)   // subtitleLine e.g. "60–100% PROGRESSIVE INTENSITY BUILD"
clientStats(stats[])           // single italic centered line, "·"-joined — not a boxed table
weekOverview([{day, intensity, focus}])   // single-row day strip, up to 7 columns; intensity: "Off" for rest days
baselinesTable(rows[][])
stykuBlock(styku)          // ← full Styku scan interpretation
nutritionBlock(client)     // ← evidence-based protein/creatine/collagen targets
proteinTargets(client)     // ← shared calc behind nutritionBlock + proteinBar
proteinBar(client)         // ← compact per-page reminder, auto-inserted for ALST At-Risk clients
pelvicFloorCallout()       // ← auto-inserted for postmenopausal clients on heavy-loading days
weakerSide(leftLST, rightLST)  // ← 'left'|'right'|'even' — lower LST is weaker, leads unilateral work
maleProteinTargets(client)     // ← Male Client Programming Framework equivalent of proteinTargets()
maleNutritionNote(client)      // ← goldCallout-equivalent protein/creatine note built from maleProteinTargets()
testosteroneNote(client)       // ← teal, informational-only testosterone/andropause note; returns [] under age 40
dayHeader(intensity, title, subtitle, descriptor)
sectionTitle(title, color = C.gold)   // ← bold label + bottom-border rule; the section-header primitive stykuBlock/nutritionBlock/baselinesTable/buildImprovementDoc all build on — exported for reuse when composing a custom page
exTable(exercises[], colorKey)   // colorKey: 'teal'|'green'|'gold'|'red'|'blue'|'purple' (a HUES key)
weeklySummary(rows[][])
progressionBlock()
milestoneTracker(4wk, 8wk, rescanNote)
labeledPara(label, body, color)   // ← the base callout primitive everything else wraps
epley1RM(weight, reps)         // ← Epley formula: weight × (1 + reps/30)
workingLoad(oneRM, pct, roundTo=5)

// Callouts — all thin wrappers over labeledPara(label, body, <fixed color>)
goldCallout(label, body)
greenCallout(label, body)
redCallout(label, body)
tealCallout(label, body)
blueCallout(label, body)
purpleCallout(label, body)
clinicalFlag(label, body)
watchFlag(label, body)
clearFlag(label, body)
```

**Breaking change from the earlier boxed-callout engine:** `exTable()`'s second argument is now a `colorKey` string (a `HUES` key), not an `(accentColor, paleFill)` hex-color pair — the table-head/stripe tints are looked up internally so every exercise table stays consistent with the rest of the palette.

`buildDocument()` calls `proteinBar()` and `pelvicFloorCallout()` automatically per day — you do not call them by hand in client scripts. `proteinBar` fires whenever `client.alstIndex < 5.5`; `pelvicFloorCallout` fires whenever `client.isPostmenopausal` is true **and** the day contains a squat, deadlift/RDL, hip thrust, carry, or lunge (set `day.pelvicFloor: false` to suppress it for a specific day if it's genuinely not applicable).

### Full Data Schema for `buildDocument()`
```javascript
{
  client: {
    name: string,
    programTitle: string,            // e.g. "5-DAY TRAINING PLAN"
    subtitle: string,                // e.g. "60–100% Progressive Intensity Build" — cover subtitle + running header
    schedule: string,                // e.g. "Tue/Wed/Thu/Fri Gym" — running footer, right side
    stats: string[],                 // ["Age 35", "5'4\"", "152 lbs", ...] — rendered as one "·"-joined line
    weightKg: number,                // for protein auto-calculation
    ageYears: number,
    isPostmenopausal: boolean,
    bmr: number,                     // from Styku
    alstIndex: number,               // from Styku — critical
  },
  styku?: {                          // include if scan available
    scanDate: string,
    bodyFatPct: number,
    bodyFatRank: string,             // "FIT" / "AVERAGE" / etc
    leanMass: number,                // lbs
    leanMassPct: number,
    fatMass: number,
    boneMass: number,
    bmi: number,
    bmr: number,
    vfa: number,                     // cm² — visceral fat area
    shapeScore: number,
    shapeScoreLabel: string,         // "Good" / "Excellent" / etc
    alstIndex: number,
    leftArmLST: number,              // lbs — lean soft tissue
    rightArmLST: number,
    leftLegLST: number,
    rightLegLST: number,
    peerComparison?: string,
  },
  weekOverview: [{ day, intensity, focus }],  // day: short code "TUE"; intensity: 60|70|80|90|"AR"|"Off"; up to 7 entries → one row, N columns
  baselines: string[][],             // [lift, baseline, tested_at, 8wk_target]
  baselineNotes: [{ type, label, body }],  // type = "green"|"gold"|"red"|"teal"|"blue"|"purple"|"clinical"|"watch"|"clear"
  includeNutritionBlock: boolean,    // default true
  includeProgressionBlock: boolean,  // default true (per training day)
  days: [{
    intensity: 60|70|80|90|"AR",     // "Off" is week-overview-only, no day page rendered
    title: string,                   // "DAY 1 — TUESDAY"
    subtitle: string,                // "Lower Body — Squat Focus"
    descriptor: string,              // CAPS DESCRIPTOR LINE
    intensityLabel: string,          // e.g. "60% Day" or "Sunday's Purpose" — bold label, day-accent colored
    intensityPara: string,           // why this % day
    warmUp: string,
    coolDown: string,
    iconsNote: string,
    pelvicFloor?: false,             // set to suppress the auto pelvic-floor callout on this specific day
    forcePelvicFloor?: true,         // added 8/17/2026 — renders the callout regardless of client.isPostmenopausal,
                                      // for the Perimenopausal Status "unconfirmed but should be cautious" case
                                      // (a 45-55 bracket client with ambiguous status and real heavy-loading
                                      // content). See Mary Burfete's document for the reference usage — don't
                                      // fabricate isPostmenopausal: true to get this effect; use this field instead.
    badge?: { label: string, sub?: string },  // overrides the day-header badge's default "{intensity}%" / "INTENSITY" text — for non-%-graded days (letter-named days, "BASE TEST"/"RE TEST" testing days) where showing the borrowed intensity value would misstate the day; pass sub: '' to omit the sub-label entirely. Color/accent still comes from `intensity`. See Aimee Morris's Day A/B badges and the Baseline-to-Rescan trainer program's Day 0/Day 4 badges for reference usage. `sub` should still carry a real intensity indicator (a qualitative level like "MODERATE," a working range like "RPE 6-8") rather than a bare placeholder like "DAY" — the badge is where a reader looks first for the day's intensity, on every program length, not just 5-day ones (confirmed standing requirement 8/17/2026; see `icons-doc-auditor.md`'s Intensity/progression QA check, item 5).
    blocks: [{
      letter: "A"|"B"|"C"|"D",
      title: string,
      color?: "teal"|"green"|"gold"|"red"|"blue"|"purple",  // omit → day's own accent color (see Callout Color rules)
      introLabel?: string,           // e.g. "Why", "Load Target", "Format" — default "Note"; pass the literal value null (not omitted) to render intro as a plain unlabeled paragraph instead
      intro?: string,
      exercises: [{
        name: string,
        sets: string,
        reps: string,
        load: string,                // convention (added 8/15/2026): a flat value
                                      // ("Bodyweight", "35 lbs/hand") is for a
                                      // genuinely non-progressing prescription only.
                                      // Whenever a lift IS being progressed across the
                                      // program's weeks, use "Wk1: X → Wk4: Y" (the
                                      // format already used across most of the roster —
                                      // see Rena Paul's script) so the load column itself
                                      // carries the progression, rather than burying it
                                      // in a block intro paragraph (see Elizabeth
                                      // Poynor's Hip Thrust/Split Stance Hex DL, where
                                      // the Wk1 numbers live only in `intro` prose and
                                      // `load` never states them) or leaving it implicit.
                                      // Not retrofitted roster-wide in this pass — apply
                                      // going forward and opportunistically when a
                                      // document is already being touched for another
                                      // reason.
        tempo: string,
        rest: string,
        cue: string,                 // max ~50 chars — 1 line in cue column
        flag?: string,               // italic red sub-text under exercise name
        flagAudience?: 'internal',   // Client View only (added 8/17/2026): suppresses `flag` when viewMode:'client' is set. flag is usually genuine client safety/sequencing info (e.g. "Left corrective") and should stay visible by default — mark internal only if a specific flag is build-rationale text, not client info.
        insight?: string,            // italic gray sub-text under exercise name — "Trainer Insight: ..." (trainer-education docs; distinct from flag's clinical red)
        insightAudience?: 'internal', // Client View only (added 8/17/2026): suppresses `insight` when viewMode:'client' is set — the exercise-level counterpart to baselineNotes' `audience: 'internal'`. Mark internal when insight explains BUILD rationale to a trainer/auditor (e.g. "Antagonist rotation — ...", referencing CLAUDE.md's sequencing rule by name) rather than coaching the client on something. See "CLIENT VIEW" section below for the full spec.
        rirNote?: string,            // teal RIR note appended to cue
      }]
    }]
  }],
  summary?: {
    subtitle?: string,               // "{Client} · ICONS Index · {Build} · Week 1"
    rows: string[][],                // [day#, intensity, focus, key_lift, progression_target]
    milestones4wk: string,
    milestones8wk: string,
    rescanNote: string,
  }
}
```

### Brace Life Improvement Report — `buildImprovementDoc()`

A standalone before/after progress report — for a client with two Styku scans (or two testing sessions) to compare, not for a training plan. Deliberately does not reuse `buildDocument()`'s days/blocks/baselines schema. Same page setup, running header/footer, and brand styling as the training-plan engine (both are built by the same `icons_template.js`).

```javascript
{
  client: { name: string, subtitle: string, stats: string[] },
  reportTitle?: string,          // default 'BRACE LIFE IMPROVEMENT REPORT'
  periodLabel?: string,          // e.g. '2/7/2026 → 8/7/2026  ·  6-Month Progress Window'
  comparison?: {
    title?: string,              // default 'Body Composition — Before & After'
    headers: [string, string, string, string],   // e.g. ['Metric', '<date A>', '<date B>', 'Change']
    rows: string[][4],           // [metric, before, after, change]
  },
  narrative?: [{ type, label, body }],   // same shape/types as baselineNotes (green/gold/red/teal/blue/purple/clinical/watch/clear)
  strengthGains?: {               // optional second comparisonTable — same shape as `comparison`
    title?: string,
    headers: [string, string, string, string],
    rows: string[][4],
  },
  closingNote?: string,          // optional plain paragraph before the brand footer
}
```

**Never fabricate a "before" value.** Only put a metric/lift in `comparison.rows` or `strengthGains.rows` if both the before and after numbers are actually documented — if a metric (e.g. ALST/VFA/Shape Score on a client whose earlier scan predates that report page) or a PR (e.g. a lift with no prior numeric baseline on file) only has a current value, describe it in `narrative` as a newly-established baseline or an undocumented-improvement PR instead of inventing a "before" number for the table. See `scripts/elizabeth_poynor_improvement_doc.js` for the reference implementation of this rule.

---
