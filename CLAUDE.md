# BRACE LIFE STUDIOS — ICONS SYSTEM
## Claude Code Project Intelligence File
### Read this entire file before writing a single line of code.

---

## WHAT THIS PROJECT IS

You are building the **ICONS Index** coaching platform for **Brace Life Studios** (bracelifestudios.com). ICONS stands for:

- **I** — Identity & Intention
- **C** — Capacity & Composition
- **O** — Output & Objectives
- **N** — Nutrition & Recovery
- **S** — Strategy & Sustainability

The deliverable is always one of:
1. A client training plan `.docx` (built with `docx` npm package via `icons_template.js`)
2. A client assessment report `.docx` (same engine)
3. A PDF (built with Python `reportlab` for luxury layout)
4. A PPTX trainer education deck (built with JS scripts)

**The operator is Xolokan.** Tone is luxury, clinical, and precise. Every document represents Brace Life Studios' brand. Never casual, never sloppy, never generic.

---

## ABSOLUTE FILE CONVENTIONS

```
Source scripts   → /home/claude/
Final outputs    → /mnt/user-data/outputs/
Uploaded files   → /mnt/user-data/uploads/
This file        → /mnt/user-data/outputs/CLAUDE.md
```

**In this git repo, that maps to:**
```
Source scripts    → scripts/
Client outputs    → clients/<client_name>/
Trainer programs   → trainer_education/
System documents  → system_documents/ (added 8/12/2026 — see "System Documents" below)
Uploaded files    → (attached inline to the conversation)
This file         → CLAUDE.md at repo root
System prompt     → docs/ICONS_System_Prompt.md (paste-into-Projects reference copy)
```

**Build pattern — no exceptions:**
1. Write script to `/home/claude/`
2. Run script
3. Audit output (pdfplumber for PDFs, soffice convert for docx)
4. Verify zero overflow
5. `present_files` to deliver

**Never write output files directly. Always run through the script.**

---

## GOOGLE DRIVE — MANUAL HANDOFF ONLY (Aug 2026 policy change, supersedes prior auto-upload instruction)

**Do NOT attempt to upload finished deliverables to Google Drive via `mcp__Google_Drive__create_file`.** This was previously a standing "upload automatically every time" instruction, but it was retired after a full session (Aug 8–9, 2026) of diagnosis proved the automated path is fundamentally unreliable, not just occasionally flaky:

- `create_file` requires the entire file re-encoded as a single base64 string generated inline as a tool-call parameter. Above roughly 26–29 KB of source file size, that generation step silently truncates or corrupts the payload — confirmed repeatedly across direct attempts, fresh isolated subagents, and multiple independent retry loops, on multiple different client files.
- The API's own `fileSize` response field is **not proof of correctness** — a corrupt upload has reported a `fileSize` that exactly matched the original while the actual byte content was completely different. Only a full download + local decode + sha256 compare catches this, and even that is expensive to do reliably every time.
- The integration also has no delete or update-in-place call (`search_files`, `create_file`, `copy_file`, `download_file_content`, `get_file_metadata`, `get_file_permissions`, `list_recent_files` only), so every failed attempt leaves a permanent orphan file in the Drive folder that only Xolokan can remove.

**Current workflow instead:** every finished deliverable is delivered directly in the chat (e.g. via `SendUserFile`) as the last step of the build. Xolokan uploads it to the "ICONS CLIENT PROGRAMS" Drive folder (id `15H7cenvZAY4vn2_eaPmGKR7zgZo2cR52`) manually from there — dragging a file in from the browser doesn't go through the broken re-encoding path, so it isn't subject to any of the above. Do not re-enable automatic Drive upload unless Xolokan explicitly asks for it again.

If asked to still name the file for Drive, the filename convention is unchanged: `<ClientName>_<ProgramTitle>_YYYY-MM-DD.<ext>` (date = day generated), e.g. `August_Olivia_3Day_Training_Plan_2026-08-07.docx` — mention this suggested filename to Xolokan alongside the delivered file so they can rename it on the way in if they want. This applies to the Drive copy only — local repo filenames under `clients/<client_name>/` stay undated; git history is their versioning.

---

## CLIENT VIEW — CLIENT-FACING PROGRAM COPY (added 8/17/2026, at Xolokan's direct request)

A second, shareable document per client — the actual program, in an encouraging ICONS-voice presentation, safe to send directly to the client. Xolokan maintains a **separate Google Drive folder** for these (distinct from "ICONS CLIENT PROGRAMS," which stays the trainer-facing archive) — deliver via the same `SendUserFile` manual-handoff pattern as every other deliverable (see "GOOGLE DRIVE — MANUAL HANDOFF ONLY" above); this document type does not change that policy.

**Built from the exact same `buildDocument()` call, on the exact same `data` object, as the trainer document — never a separate hand-maintained copy.** This is deliberate: the workout content (days, blocks, exercises, sets/reps/load/tempo/rest/cues, Styku data, baselines, nutrition targets) is identical between the two documents by construction, so they can never silently drift apart. Only two things differ, controlled by `data.viewMode`:

```javascript
await buildDocument({ ...data })                        // trainer document — unchanged, default behavior
await buildDocument({ ...data, viewMode: 'client' })     // client view — same content, filtered
```

When `viewMode: 'client'` is set:
1. **Any `baselineNotes` item carrying `audience: 'internal'` is dropped.** Mark a note internal when it's written for the trainer/build-process, not the client — judgment-call reasoning ("Confirm with the trainer whether these were the same movement"), documentation-methodology notes ("Baselines Table Scope — Confirmed Tested Lifts Only"), or a screening-gap admission that reads awkwardly out of context ("Perimenopausal Status — Not Assessed at Intake"). A note stays visible by default — only mark it internal when it genuinely shouldn't reach the client, not reflexively. Genuinely client-facing content (PR callouts, clinical safety language like the pelvic floor protocol, encouraging baseline-battery summaries) should stay visible in both documents.
2. **`data.clientHighlight: {label, body}` renders first, in the "milestone achieved" clearFlag style**, ahead of any other baselineNotes — for a real, documented PR or progress-since-last-version. **Never fabricate one.** Only set this field when there's an actual PR/improvement on record for that client (a new 1RM, a lean-mass gain, a closed asymmetry gap); omit it entirely for a first-build client with no prior version to compare against, rather than inventing filler encouragement.
3. A short, warm welcome line renders on the cover (`clientWelcomeLine()`), quoting the same ICONS mission language already used verbatim elsewhere in this system.
4. **Any exercise's `insight`/`flag` sub-line is dropped when that exercise also carries `insightAudience: 'internal'` / `flagAudience: 'internal'`** — the exercise-level counterpart to rule 1 above. Added after the pilot audit on Elizabeth Poyner's document found an `insight` line ("Antagonist rotation — brief push touch between pull sets, no CNS tax") that explained BUILD rationale (referencing the Antagonist Rotation Rule by name) rather than coaching the client — `audience: 'internal'` on `baselineNotes` has no equivalent at the exercise level without this. `insight` is the field most likely to need this (it often exists specifically to explain a sequencing/build decision); `flag` is usually genuine client safety/sequencing info (e.g. "Left corrective") and should stay visible by default.

Everything else — page setup, color system, exercise tables, warm-up/cool-down/ICONS Note callouts, `proteinBar()`/`pelvicFloorCallout()` auto-inserts, the weekly summary — renders identically to the trainer document.

**When marking an exercise's `insight` internal, do a full-text search of the client's document for similar language before assuming it's the only instance** — any exercise inserted specifically to satisfy the Antagonist Rotation Rule (a common pattern roster-wide; grep a client's script for `insight:.*[Aa]ntagonist` or similar sequencing-rationale phrasing) is a candidate for the same fix.

**Output location:** same folder as the trainer document, `clients/<client_name>/`, filename `<ClientName>_<ProgramTitle>_Client_View.docx` (e.g. `Elizabeth_Poyner_5Day_Training_Plan_Client_View.docx`) — a client view is a per-client artifact, not a new top-level category like `trainer_education/` or `system_documents/`.

**Standing rule going forward:** generate the client view alongside every new or materially updated trainer document, not just as a one-time rollout — the same build→audit→commit→deliver pipeline applies to both. See `icons-expert.md` for the corresponding standing instruction.

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
    badge?: { label: string, sub?: string },  // overrides the day-header badge's default "{intensity}%" / "INTENSITY" text — for non-%-graded days (letter-named days, "BASE TEST"/"RE TEST" testing days) where showing the borrowed intensity value would misstate the day; pass sub: '' to omit the sub-label entirely. Color/accent still comes from `intensity`. See Aimee Morris's Day A/B badges and the Baseline-to-Rescan trainer program's Day 0/Day 4 badges for reference usage.
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
                                      // Poyner's Hip Thrust/Split Stance Hex DL, where
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

**Never fabricate a "before" value.** Only put a metric/lift in `comparison.rows` or `strengthGains.rows` if both the before and after numbers are actually documented — if a metric (e.g. ALST/VFA/Shape Score on a client whose earlier scan predates that report page) or a PR (e.g. a lift with no prior numeric baseline on file) only has a current value, describe it in `narrative` as a newly-established baseline or an undocumented-improvement PR instead of inventing a "before" number for the table. See `scripts/elizabeth_poyner_improvement_doc.js` for the reference implementation of this rule.

---

## PDF ENGINE (Python ReportLab)

Used for luxury-format PDFs: assessment reports, baseline sheets, protocol documents.

**Key scripts:**
```
/home/claude/siobhan_3day_plan_v2.py   ← current reference for PDF training plans
/home/claude/siobhan_icons_report.py   ← assessment report PDF
/home/claude/icons_baseline_protocol.py ← baseline testing protocol
/home/claude/baseline_sheets.py         ← athlete baseline sheets
```

### PDF Layout Engine Rules
```python
PW, PH = letter  # 612 × 792 pt
ML = MR = 36     # margins (training plans)
ML = MR = 40     # margins (assessment reports)
MB = 36
CW = PW - ML - MR

# Header height
HH = 64  # training plans
CT = PH - HH - 10  # content top
CB = MB + 18        # content bottom

# Exercise table columns (must sum to CW)
_CW = [165, 30, 42, 80, 52, 40]  # EXERCISE|SETS|REPS|LOAD|TEMPO|REST
_CX_CUE = sum of _CW + ML        # cue column starts here
_CW_CUE = ML + CW - _CX_CUE - 4  # ~127pt — cue width
```

### PDF Overflow Prevention — MANDATORY
**Every PDF must pass pdfplumber audit before delivery:**
```python
import pdfplumber
with pdfplumber.open(output_path) as pdf:
    for i, page in enumerate(pdf.pages):
        overflow = [ch for ch in page.chars if ch['y0'] < 0]
        assert not overflow, f"Page {i+1} overflows by {-min(ch['y0'] for ch in overflow):.0f}pt"
```

**Root causes of overflow and fixes:**
- Cue text > ~50 chars → wraps to 2+ lines → row height 56pt instead of 30pt
- Too many callout blocks on one page → split across pages
- Fix: shorten cues, remove one callout, or split the day across 2 pages

### PDF Training Plan — Page Split Pattern
Each training day splits across **2 pages** (Part 1 of 2 / Part 2 of 2):
- Page A: shoulder protocol callout + protein_bar + correctives + primary lift + hip thrust/glute
- Page B: pull + core + overload bar + targets box + note lines

---

## ICONS TRAINING PHILOSOPHY — THE THREE ZONES

Source: "The ICONS Training System" (Brace Life Studios internal methodology doc, shared by Robert, Aug 2026). This is the qualitative counterpart to the Evidence-Based Science Layer below — it explains *why* sessions are built the way they are and sets the trainer/client-facing voice, while the Science Layer supplies the numeric thresholds. Treat the three-zone structure as house philosophy and vocabulary, not a rigid per-day template — plans still flex for Active Recovery days, corrective-heavy days, and individual clinical flags exactly as they do now.

**Target population:** women in their 40s–60s navigating hormonal, physical, and lifestyle transitions. Mission: reclaim strength, shape, posture, and confidence by working *with* their biology, not against it. Result: the "Brace Life aesthetic" — muscular yet feminine, aligned yet powerful, graceful yet strong.

### The Three Progressive Zones

1. **Isolated — Control, Activation & Alignment.** Single-joint exercises that wake up underused/dormant muscles, correct imbalances that distort posture or limit performance, and build neural precision before loading compound patterns. Coaching cue: *"Control precedes power."*
2. **Compound — Strength, Shape & Hormonal Balance.** Multi-joint lifts that build overall strength, create mechanical tension for growth, and stimulate anabolic/bone-preserving hormones. The most transformative work for this population — combats age-related muscle loss and shapes the physique (lifted glutes, defined shoulders, upright posture). Coaching cue: *"Strength builds confidence."*
3. **Metabolic — Burn, Energy & Endurance.** High-intensity circuits combining resistance and cardiovascular work that drive EPOC, energy, and mental grit — the session's "finish" that turns results emotional as well as physical. Coaching cue: *"Energy becomes identity."*

### Why This Population Needs This Approach

- **Hormonally:** declining estrogen/progesterone/testosterone reduce bone density, joint lubrication, and muscle regeneration, and slow metabolism while raising stress/sleep sensitivity. Progressive resistance training is their primary hormonal reset; unstable or excessive cardio instead spikes cortisol, leading to fatigue, water retention, and muscle loss. Trainer mantra: *"Muscle is the medicine."*
- **Physiologically:** without intervention, women lose 3–8% lean mass per decade and up to 10% bone density post-menopause, with ligament laxity/lower collagen and reduced neural efficiency increasing vulnerability under instability. Isolated work retrains neuromuscular patterns and corrects asymmetry; compound lifts load the skeletal system to preserve bone density; metabolic work maintains cardiovascular health without overtaxing joints. Every session emphasizes alignment, breathing, and full range of motion — for joint resilience and mobility longevity, not just muscle development.
- **Psychologically:** this demographic carries high cognitive/emotional load (careers, families, stress, shifting identity) and needs training as an emotional release and identity reinforcement, not just a workout. They need to feel capable rather than fragile, see visible empowering change (not just maintenance), and experience training as a metaphor for strength and control in their life. Trainer mantra: *"You're not fragile. You're powerful, capable, and still evolving."*

### Posture — Treated as Both Aesthetic and Functional

Physiological benefits: aligns ribcage/pelvis for optimal breathing and bracing, protects joints via better load distribution, increases strength potential through better leverage. Aesthetic benefits: lengthens the silhouette, creates the "tall, open, sculpted, poised" Brace Life look, improves every photo/pose/presence. Coaching cue: *"We don't just lift weight — we lift posture."*

### Functional Training — Deliberately Not the Primary Focus

Functional training (multi-planar, unstable, or balance-based movement — lunge with rotation, step-up with twist, BOSU squats) is good for rehabilitation, coordination, mobility, and athletic skill transfer, but is NOT the primary training mode here: it limits mechanical tension and progressive overload (too unstable for heavy load), diffuses focus away from transformation, and can raise cortisol without delivering enough stimulus for muscle or metabolic change. House use case is narrow — warm-ups/mobility prep, active recovery, clients rebuilding after injury, or reintegrating stability *after* strength is developed — not as a session's main driver. Trainer takeaway: *"Functional training builds movement literacy; ICONS builds transformation."*

### Full Range of Motion — With Control, Not At Its Expense

Full ROM strengthens muscle through its full length (supports flexibility and hypertrophy) and keeps joints healthy through usable ranges, building the "sculpted grace" look — but only *with control*: never chase depth if posture breaks, and regress ROM or load when alignment falters. Quality movement under tension is the true transformation driver. Coaching cue: *"Long where you move, tight where you hold."*

### Compound Block Sequencing — Antagonist Rotation Rule

Added 8/12/2026, at Xolokan's direction after a team discussion. **Within a Compound-zone block, never stack three consecutive exercises that load the same primary muscle group or movement pattern.** Rotate through an antagonistic or complementary pattern instead — push↔pull, hip-dominant↔knee-dominant, upper↔lower — so the block still trains hard, just not the same joints/tissue three times in a row.

**Why:** the third consecutive exercise on the same pattern is exactly where accumulated joint/connective-tissue stress and technical fatigue peak — the same rep range and mechanical loading, but with the least fresh stabilization left to control it. Rotating to the antagonist lets the just-worked muscle group passively recover while the block's training density stays high; the client keeps working hard, just not on the same structures back-to-back-to-back. This is a sequencing rule, not a volume cut — nothing about total sets, load, or intensity changes, only the order exercises land in.

**What this does and doesn't restrict:**
- Two same-pattern exercises back to back is fine (a primary compound lift immediately followed by a close accessory in the same pattern — e.g. Back Squat → Goblet Squat as a primary/accessory pairing) — the rule is specifically about a *third* stacked on top of that.
- Example fix: Squat → RDL → Split Squat all load the same quad/hip-hinge chain under compression three times running — swap the third for a pull or press instead (Squat → RDL → Row) even within the same block, rather than moving it to a different block.
- Applies to Compound-zone blocks specifically — multi-joint, real-load exercises. Isolated-zone/corrective blocks (lower load, different injury-risk profile, often deliberately targeting one weak muscle group repeatedly, e.g. a hip-activation circuit) are not bound by this the same way; use judgment there rather than force antagonist rotation where the block's actual purpose is concentrated correctivework.
- **Exempt: grip/skill-progression sequences** (confirmed 8/12/2026, during the retroactive audit) — three same-pattern reps done deliberately as a testing/progression sequence (the close-grip → standard-grip → wide-grip assisted pull-up battery already used across multiple client baselines, or an incline-push-up → full-push-up → dip skill regression) are exempt. These are one movement pattern progressing through grip width or difficulty as an intentional skill/strength-testing sequence, not three separate heavy compound lifts stacked for convenience — the injury-accumulation mechanism this rule targets doesn't apply the same way to a deliberately lighter, technique-focused progression battery. Don't resequence these.
- This governs exercise *order within and across a block*, not exercise *selection* — don't drop an exercise the day's programming actually calls for just to satisfy this rule; resequence it (move it to a later block, or swap its position with a complementary-pattern exercise already in the plan) instead.
- **Not waived for advanced/elite trainees** (confirmed 8/12/2026, Xolokan's direct reminder during the trainer-athlete program builds): a client or trainer's training level doesn't exempt them from this rule. The mechanism the rule targets — accumulated joint/connective-tissue stress and technical fatigue peaking on the third same-pattern exercise — doesn't go away because someone is Advanced/Elite; if anything, an advanced trainee's heavier absolute loads make the same accumulated-stress mechanism higher-stakes, not lower. Don't reason "they can handle it" as grounds to skip a resequence on an Advanced/Elite program. Nick's (Advanced/Elite) individual trainer program is the reference example this rule was correctly applied to without exception — see "Individual Trainer/Athlete Training Programs" below.

Coaching cue: *"No muscle group works alone three times in a row."*

`icons-expert` applies this at build time when constructing a day's blocks; `icons-doc-auditor` spot-checks it on delivery (see that agent's standing checklist).

---

## EVIDENCE-BASED SCIENCE LAYER

This is the foundation of every programming decision. Do not deviate without flagging it.

### Age Bracket Programming Framework

Every client's program should be filtered through the age bracket below, layered on top of their individual Styku/ALST/VFA findings and any clinical flags. Brackets are proximity guides, not hard cutoffs — a 44-year-old postpartum client may sit closer to the 45–55 profile, and vice versa; use judgment. Each bullet below points to the detailed protocol elsewhere in this section rather than restating it — that section stays the single source of truth for the actual numbers.

**Demographic scope rule.** These five brackets, and every numeric threshold in the Evidence-Based Science Layer below (ALST cutoffs, protein tiers, LIFTMOR candidacy, pelvic floor protocol), are validated for the stated target population: women. When a client falls outside that, do not silently apply the women's numeric thresholds by default, and do not silently invent a parallel framework either.

- **Male clients** (e.g. Jake Poyner, Vinz Feller): a real, cited framework now exists for this — see "MALE CLIENT PROGRAMMING FRAMEWORK" immediately after this Evidence-Based Science Layer section. Use its ALST/protein/creatine/testosterone/VFA/BMI/bone-loading thresholds rather than reporting raw Styku numbers with no clinical interpretation, and rather than reaching for the women's numeric thresholds by default.
- **A population neither framework covers** (a client meaningfully younger than 20-35, e.g. an adolescent, or any other genuinely out-of-scope case): apply the sex-neutral structural philosophy (three-zone Isolated→Compound→Metabolic build, RIR/RPE autoregulation, corrective-before-compound sequencing) since that transfers, and explicitly flag in the client's document which numeric thresholds were NOT applied and why — the same way Jake Poyner's and Vinz Feller's programs each carry a dedicated note explaining the scope decision rather than burying it in code. Per the standing trigger at the top of the Male Client Programming Framework section, treat onboarding a client from any such population as the moment to research and build out that population's framework in this file, not just document the gap and move on.
- **The "ICONS Index Full-Spectrum Progression Standard" (all 10 core Baseline Testing Protocol exercises must show programmed progression)** is scoped to women 40–55 specifically (see that standard, under "ICONS BASELINE TESTING PROTOCOL" below) — the same non-transfer rule applies: don't silently extend that specific mandate to women outside 40–55 or to male clients without a dedicated research pass validating it for that population first.

This is a standing decision rule, not a one-off judgment call specific to any one client.

**Method Selection Principle — best-evidenced bracket per client, not a universal rule (added 8/13/2026, at Xolokan's direction).** When choosing a specific training method or parameter — rep range, bone-loading protocol, power-training inclusion, protein/creatine tier, RIR target, whether a corrective circuit is warranted — select whichever age/sex-bracket-specific finding is most significant and best-supported for that particular client's actual demographic profile, rather than adopting one method as a blanket rule applied to every client regardless of bracket. This file's bracket structure already exists for exactly this reason (the women's five brackets, the male three-bracket structure, EWGSOP2's separate ALST cutoffs by sex, LIFTMOR's postmenopausal-specific bone-loading evidence, the Mayo Clinic Proceedings power-training data broken out by sex) — the direct trigger for stating it as an explicit principle was the 8/13/2026 rep-range question below, where the correct answer was "rep range should vary by goal/zone, governed by RIR — not a fixed 8-12 applied to everyone" precisely because the strongest evidence (ACSM 2026, Schoenfeld 2021, Robinson et al. 2024) supports goal/context-dependent prescription over a universal number. Apply the same logic to every other method choice: reach for whichever bracket's cited evidence is strongest and most specific to the client actually in front of you, and do not silently default to whichever method happens to be used most often across the roster.

**20–35 — Foundation & Peak Bone Mass**
- Protein: ≥1.6 g/kg/day ("Active women general" tier)
- Creatine: indicated (not yet the "strongly indicated" tier by age alone — that's driven by ALST/postmenopausal status, not age in this bracket)
- Menstrual cycle: no phase-based programming — autoregulate around individual symptoms over ≥3 cycles, train hard year-round
- Volume/frequency: full ≥10 sets/muscle/week hypertrophy target, 2–3×/week per muscle group — never under-load
- ACL/knee valgus screening is highest-yield here for clients in field/court sports (2.8× male incidence)
- Copenhagen plank / adductor injury prevention is highest-yield here for athletic/team-sport clients
- Heavy compound lifting still contributes to building peak bone mass — no need to wait for LIFTMOR-style candidacy criteria to justify loading
- Watch energy availability in athletic/high-training-volume clients in this bracket — Relative Energy Deficiency in Sport (RED-S) suppresses bone density and raises stress-fracture risk even in clients who read as lean/fit on a scan; a BMI or body-fat reading that looks "fine" does not rule this out if training volume is high and intake hasn't been discussed

**35–45 — Transition Onset**
- Protein: trending from 1.6 g/kg/day toward the 1.8–2.0 g/kg "Women 40+" tier as the client crosses 40
- Creatine: move to "strongly indicated" once the client crosses 40
- Watch for early perimenopausal signals (cycle irregularity, symptom shifts) — still autoregulate on individual data, not calendar or age alone. This is a genuinely early bracket for it: perimenopausal symptoms can begin in the early-to-mid 30s, well before the ~45 average onset, so "she's too young for this" is not a safe assumption to bring into an intake conversation. See "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" below for what's reasonable to ask about this at intake
- Volume/frequency targets unchanged from the 20–35 bracket — no physiological reason to reduce load yet
- Begin ALST/VFA monitoring at the first Styku scan if not already established, even though risk is typically still low
- If a client mentions she's on a GLP-1/anti-obesity medication (semaglutide, tirzepatide, etc.), see "GLP-1 / Anti-Obesity Medications" below — treat as a standing ALST-preservation priority regardless of her current ALST number
- For a client 40+ within this bracket, see "ICONS Index Full-Spectrum Progression Standard — Women 40–55" below — her program should show programmed progression across all 10 core Baseline Testing Protocol exercises, not just her strongest or most-tested lifts

**45–55 — Perimenopause / Menopause Transition**
- Protein: 1.8–2.0 g/kg/day minimum through the earlier part of this bracket. The move to 2.0–2.2 g/kg/day is governed by THREE independent triggers, whichever comes first — age 50 (an age-based trigger in its own right, not gated behind a confirmed diagnosis — see note below), ALST flagging At-Risk, or menopause being confirmed before 50. A 46-year-old with ALST At-Risk or confirmed menopause escalates immediately; a 52-year-old escalates on age alone even with Normal ALST and unconfirmed menopausal status — this matches `proteinTargets()`'s actual implementation (`atRisk || ageYears >= 50`) in `icons_template.js`, see "Protein Targets" below for the full tier table. Age 50 is a deliberate, defensible population-level proxy (average natural menopause onset is ~51), consistent with this file's existing practice of treating ambiguous perimenopausal status as the higher-need case by default rather than assuming the lower-risk one (see "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" below) — it is not a stand-in for confirmed status, it's an intentional second, independent trigger.
- Creatine: strongly indicated
- Heavy RT ≥3×/week + protein 2.0–2.2 g/kg/day is strongly evidence-backed through this transition; HRV dips in luteal-equivalent phases are NORMAL — interpret against the client's individual baseline, not a flat line
- Start screening for LIFTMOR-style bone loading candidacy (T-score < -1.0) as estrogen decline accelerates
- ALST monitoring becomes a priority — sarcopenia risk begins rising through this window
- Perimenopausal status is frequently ambiguous at intake in this bracket — neither confirmed premenopausal nor confirmed postmenopausal. See "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" below for what's reasonable to ask at intake without overstepping into diagnosis, and why an unconfirmed status should still trigger pelvic-floor caution rather than default to "not postmenopausal" — that section's evidence says the transition window itself, not confirmed postmenopausal status, is the higher-risk period for stress urinary incontinence specifically
- See "ICONS Index Full-Spectrum Progression Standard — Women 40–55" below — her program should show programmed progression across all 10 core Baseline Testing Protocol exercises

**55–65 — Postmenopausal**
- Protein: 2.0–2.2 g/kg/day ("Women 50+ / ALST At-Risk" tier)
- Creatine: strongly indicated
- Bone loading: LIFTMOR protocol directly applicable if T-score < -1.0 — frame as "bone investment," never as risk
- Pelvic floor triggers apply to every heavy carry/squat/deadlift/hip thrust session
- ALST At-Risk is the top programming priority when flagged — protein/creatine escalation, resistance-priority sessions
- VFA/cardiometabolic monitoring carries more weight given metabolic shifts post-menopause
- Power training (moving a sub-maximal load with maximal intent — see "Power Training — Fall Risk & Longevity" below) belongs in this bracket already, not just 65+; power output starts declining before strength does

**65+ — Older Postmenopausal**
- Protein: 2.0–2.2 g/kg/day, same tier as 55–65 — do not step this down with age
- Creatine: strongly indicated — cognitive benefits are well-supported here; treat bone-density benefit as plausible but not settled (see Creatine section below)
- Bone loading: LIFTMOR candidacy screening remains a priority, framed consistently as "bone investment"
- Pelvic floor protocol applies identically to the 55–65 bracket
- ALST At-Risk / sarcopenia prevention remains the top physiological priority
- Favor movements with direct functional/fall-risk transfer (carries, step-ups, single-leg work, and explicit power/velocity work) alongside the standard compound lifts — this is now evidence-backed, not just general good practice: see "Power Training — Fall Risk & Longevity" below

### ALST Index (Appendicular Lean Soft Tissue) — EWGSOP2 2018
```
≥ 7.0 kg/m²  → Optimal
5.5–6.99      → Normal — monitor
< 5.5 kg/m²  → AT-RISK for sarcopenia ← programming priority shift
```
**When ALST < 5.5:** Muscle-building is the primary physiological goal. Every session prioritizes progressive resistance. Protein target escalates. Creatine is strongly indicated.

**Use Styku's reported ALST value** — their calculation differs from manual (arm + leg LST / height²).

### Protein Targets (Morton 2018 meta-analysis + anabolic resistance research)
```
Active women general    : ≥ 1.6 g/kg/day
Women 40+               : 1.8–2.0 g/kg/day
Women 50+ / ALST At-Risk: 2.0–2.2 g/kg/day
Per meal                : ~0.4 g/kg (leucine threshold)
Distribution            : 4+ meals/day
```
**"50+ / ALST At-Risk" is an OR, not an AND, and age 50 is not conditional on
confirmed menopausal status** — either condition alone moves a client into the
2.0–2.2 g/kg tier: turning 50 (regardless of confirmed menopausal status), or
ALST flagging At-Risk at any age. This matches `proteinTargets()`'s actual
implementation in `icons_template.js` (`atRisk || ageYears >= 50`) and the
45–55 bracket bullet above, which spells out why age 50 functions as its own
independent trigger rather than a fallback used only when status can't be
confirmed. Clarified 8/13/2026 after `icons-roster-analyst` flagged this
subsection and the 45–55 bracket bullet as reading inconsistently — see the
Research Update Log for the reconciliation.

### Creatine (evidence-based for women)
```
Dose    : 3–5g monohydrate daily (no loading phase)
Timing  : with food
Saturates: 3–4 weeks
Indicated: all women in strength training
Strongly indicated: women 40+, ALST At-Risk, postmenopausal
Benefits: strength, power, sleep quality — all well-supported
Cognition: well-supported — memory, attention, and processing speed improved in
           5 of 6 reviewed older-adult trials (Nutrition Reviews systematic
           review, 2025)
Bone    : evidence is MIXED, not settled — some trials show a benefit when
          creatine is paired with heavy resistance training; a well-designed
          2-year RCT in older women found no BMD improvement over placebo.
          Coach it as a strength/cognition supplement with a possible bone
          upside, not a guaranteed bone intervention — LIFTMOR-style loading
          is the settled bone protocol, creatine is not a substitute for it
```

### Collagen (Shaw et al. 2017 AJCN)
```
Dose   : 15g collagen + 50mg Vitamin C
Timing : 30–60 min BEFORE loading session
Effect : doubles collagen synthesis markers
Requires: mechanical load to be effective
```

### Bone Loading — LIFTMOR RCT (Watson & Beck 2018)
```
Stimulus : ≥ 80% 1RM compound lifts, 5×5, 2×/week
Safe in  : postmenopausal women WITH low bone mass (T-score < -1.0)
Result   : +2.9% lumbar BMD vs -1.2% control
Frame as : "bone investment" not "heavy lifting"
Supplement: impact loading (jumps, drop landings) for hip bone
Corroborated: 2025 systematic review/meta-analysis (17 RCTs, n=690) confirms
  resistance training improves BMD at lumbar spine, femoral neck, total hip,
  and trochanter in postmenopausal women; high-intensity strength training
  outperforms low/moderate intensity specifically at spine and hip; combined
  aerobic + resistance training is the single most effective modality for
  lumbar BMD specifically — worth defaulting to for clients who already do
  cardio elsewhere in their week, not an either/or against the lifting.
```

### Vitamin D & Calcium Supplementation — Bone Health Cofactor (2024-2025 evidence)
```
Why this section exists: the Bone Loading section above (LIFTMOR) and the
  Power Training/65+ bracket bullets treat resistance-training load as the
  bone stimulus, but this file had no position at all on the supplement
  question a bone-loading-candidate client will very likely ask about
  directly — "should I also be taking calcium and vitamin D?" This is a
  genuine gap, filled here for the first time; not a correction of anything
  previously written.
Not a blanket recommendation for a healthy client: USPSTF's December 2024
  draft update (finalizing its 2018 statement) concludes with MODERATE
  certainty that vitamin D supplementation, with or without calcium, has NO
  net benefit for primary fracture prevention in community-dwelling
  postmenopausal women and men 60+ at standard doses (≤400 IU vitamin D /
  ≤1,000mg calcium/day) — and finds the evidence INSUFFICIENT (not
  negative, genuinely unknown) to judge benefit/harm at higher doses. This
  explicitly does NOT apply to a client with a confirmed osteoporosis
  diagnosis, a prior fracture, a condition affecting vitamin D absorption,
  or confirmed vitamin D deficiency — those clients follow their
  prescriber's guidance, not this general-population framing. Mirrors this
  file's existing posture on GLP-1/HRT/TRT: worth knowing the evidence, not
  ours to prescribe or diagnose deficiency.
Combined with exercise, the picture is more favorable — but the "exercise"
  studied isn't confirmed to be LIFTMOR-style loading specifically: a 2025
  systematic review/meta-analysis (13 RCTs, postmenopausal women) found
  combined exercise + calcium/vitamin D supplementation outperformed
  supplementation alone for both lumbar spine BMD (SMD 0.31) and femoral
  neck BMD (SMD 0.47). Genuine gap, same pattern as the creatine/bone
  caveat above: the review's exercise arms were heterogeneous (whole-body
  vibration produced the most consistent benefit across sites in
  subgroup analysis; mixed/traditional-Chinese-exercise arms improved
  spine BMD specifically) — none of the included trials were confirmed at
  LIFTMOR's specific ≥80% 1RM/5×5/2×week protocol, so treat "add
  supplementation on top of our bone-loading protocol" as a reasonable
  extrapolation from adjacent evidence, not a directly-replicated finding.
Live, unresolved risk signal — do not treat calcium supplementation as a
  free add-on: a meta-analysis of 13 double-blind placebo-controlled RCTs
  (n=43,178) found calcium supplementation was associated with a 15%
  increased risk of cardiovascular disease/coronary heart disease
  specifically in postmenopausal women — a finding the literature
  describes as contested, not settled (other trials/reviews found no
  increased risk). This is the same "evidence is mixed, say so plainly"
  standard this file already applies to creatine and bone density above,
  and it now has a direct line to the Cardiovascular / Cardiac
  Considerations section above — a client already carrying a cardiac flag
  is exactly the wrong client to casually recommend calcium supplementation
  to without her physician weighing in, given this unresolved signal.
Practical takeaway: don't default to recommending blanket calcium +
  vitamin D supplementation for a healthy postmenopausal client just
  because she's a LIFTMOR/bone-loading candidate — current best evidence
  (USPSTF 2024 draft) doesn't support that as a fracture-prevention
  measure at standard doses in an otherwise-healthy client, and calcium's
  cardiovascular signal is a real, unresolved caution rather than a
  reason to encourage it casually. Food-first framing (dietary
  calcium/vitamin D intake, sun exposure) is uncontroversial; a
  supplement recommendation is a conversation for her physician/
  dietitian, not a standing line in her ICONS document — consistent with
  the referral-not-diagnose posture already used throughout this file.
```

### Power Training — Fall Risk & Longevity (2025 evidence)
```
Finding: muscle POWER (force × velocity — moving a sub-maximal load fast,
  not moving a maximal load slowly) predicts functional independence and
  longevity in older women more strongly than strength alone. Primary
  source: Araújo CG, Kunutsor SK, et al., "Muscle Power Versus Strength as
  a Predictor of Mortality in Middle-Aged and Older Men and Women," Mayo
  Clinic Proceedings 2025;100(8):1319-1331 (CLINIMEX Exercise cohort,
  n=3,889, ages 46-75, median 10.8yr follow-up). Hazard ratio for
  mortality comparing lowest-vs-highest relative POWER was 6.90 for women
  (5.88 for men), vs. only 1.71 for relative STRENGTH in women (1.62 for
  men) — i.e. women in the lowest power category had ~7x the mortality
  risk of women in the highest, a materially larger gap than strength
  alone shows. (This is the same primary source now cited directly, with
  its actual composition and hazard-ratio data, in the Male Client
  Programming Framework's "Power Training — Men" section below — see that
  section for the full men's-data breakdown.)
  Power output declines faster with age than strength does — training it
  directly does not happen automatically as a side effect of strength work.
Protocol: sub-maximal load (30–50% 1RM) moved with maximal intent —
  trap bar jumps, box step-up jumps, med ball throws/slams, fast (not
  maximal-load) sled pushes. Full recovery between sets — this is a
  velocity stimulus, not a metabolic one.
Applies to: 55–65 bracket onward, not just 65+ — power decline starts
  before the 65+ bracket, so waiting until then to introduce it is late.
Fall-risk link: ≥2 hrs/week strength training associated with ~34% fall-risk
  reduction in women 75+ (WHISH cohort, 2025); power-specific training
  shows the strongest single association with retained functional
  independence in women over 70 among the qualities studied.
Status: this replaces the earlier "general good practice, not evidence-
  backed" caveat that lived in the 65+ bracket bullet — power/fall-risk
  training is now a cited protocol, not just a reasonable instinct.
```

### Osteoarthritis (Knee & Hip) & Resistance Training (2024-2025 evidence)
```
Why this section exists: knee/hip osteoarthritis (OA) is extremely common in
  this client population and had ZERO prior coverage in this file, despite
  every other major joint/loading topic (bone density, ACL/knee valgus,
  pelvic floor, postpartum core) having a dedicated subsection. The default
  instinct — lighten load or avoid a movement pattern around a painful/
  diagnosed joint — is the opposite of current evidence, which treats
  resistance training as CORE first-line OA management, not a risk to
  train around.
Prevalence/risk context: women account for roughly 60% of OA cases
  globally, and postmenopausal women show roughly TWICE the knee OA
  prevalence of age-matched men. Estrogen deficiency is mechanistically
  linked to cartilage degeneration in a 2025 systematic review/meta-
  analysis (Journal of Menopausal Medicine) — this directly reinforces
  (does not newly introduce) this file's existing ICONS Training
  Philosophy language about declining estrogen reducing "joint
  lubrication," but note the mechanistic evidence is stronger at the
  molecular/animal-model level than at the human causal-intervention
  level — treat "menopause raises OA risk" as well-supported and "here is
  exactly how much estrogen itself drives it vs. general aging" as still
  being clarified.
Standing guideline: the 2019 ACR/Arthritis Foundation Guideline for the
  Management of Osteoarthritis of the Hand, Hip, and Knee — the most
  current ACR guideline found in this pass, no 2025 update located —
  STRONGLY recommends land-based resistance exercise (alongside aerobic,
  aquatic, and neuromuscular exercise) for knee OA, with no established
  hierarchy among exercise modes, and notes supervised exercise is
  associated with better outcomes than unsupervised.
Programming specifics (2025 systematic review and network meta-analysis,
  46 RCTs, 3,463 participants): high-speed resistance training was most
  effective across pain, stiffness, and function combined. For pain and
  function specifically, moderate intensity (43-47% 1RM) sustained over a
  longer duration (35-37 weeks) with higher weekly rep volume (610-640
  reps/week) was optimal. For stiffness specifically, a shorter, higher-
  rep protocol (12 weeks, ~1,200 reps/week) was more effective — dosing
  should follow the client's actual limiting symptom, not one universal
  OA prescription.
Heavier loading is not disqualified by OA or joint pain — useful nuance
  for a LIFTMOR-candidate client who also has knee/hip OA: the PROHIP
  trial (hip OA, 2025) found patients tolerated progressively higher
  training loads while maintaining low pain intensity. A case series
  (Henriksen et al., Translational Sports Medicine, 16 women with
  generalized joint hypermobility + knee pain, supervised heavy RT 2x/wk
  for 12 weeks) found meaningful pain reduction plus gains in strength,
  proprioception, and patellar tendon stiffness with no major adverse
  events — heavy loading had traditionally been considered inappropriate
  in a hypermobile/joint-lax population specifically because of assumed
  pain/injury risk, and this case series pushes back on that assumption.
  Flag honestly: this case series' population is young (mean age 24.2)
  and hypermobility-specific, not this file's postmenopausal bracket
  directly — cited here as counter-evidence to the "heavy loading is
  unsafe with joint laxity" assumption, which is directly relevant given
  this file's own philosophy language about postmenopausal ligament
  laxity, not as a bracket-matched replication.
Important boundary — resistance training is not a substitute for an
  already-indicated surgery: a 2024 NEJM RCT (Frydendal et al., n=109,
  severe hip OA WITH an existing surgical indication) found total hip
  replacement produced a clinically superior improvement in patient-
  reported hip pain and function vs. resistance training alone at 6
  months — physical activity levels improved comparably in both groups,
  but hip replacement won on the primary pain/function outcome. Practical
  implication: resistance training is strongly evidence-backed as core
  OA management generally, but a client whose OA is severe enough that a
  surgeon has already indicated replacement should not be led to believe
  training alone is expected to match a surgical outcome — refer to her
  orthopedist for that specific conversation, same referral-not-diagnose
  posture used throughout this file.
Knee replacement continuum: a 2026 (ahead-of-print) systematic review
  found resistance training benefits both BEFORE knee replacement
  (greater strength gains with higher training intensity/machine-based
  work; better pain/function outcomes with programs ≥8 weeks) and AFTER
  (faster mobility/walking-capacity gains with programs ≥12 weeks) — RT
  has a role on both sides of a replacement, not just as an alternative
  to one.
ICONS practical application:
  - Do not default to reducing load or avoiding a movement pattern just
    because a client reports a knee or hip OA diagnosis — resistance
    training, including progressively heavier loading, is core evidence-
    based management, not a risk to train around by default.
  - Screen at intake: which specific joint, diagnosed OA vs. undiagnosed
    pain, and whether a surgical-indication conversation is already
    underway with her physician — a client already in that conversation
    should have expectations set accordingly (see the NEJM finding
    above), not be led to expect training alone will resolve what a
    surgeon has already flagged as replacement-indicated.
  - Program to the client's actual limiting symptom per the 2025 network
    meta-analysis above: sustained moderate-intensity work over a longer
    block for pain/function complaints; higher-rep, shorter-duration
    blocks for stiffness-predominant complaints. This is programming
    nuance layered on top of, not a contradiction of, the RIR-governed
    approach already used everywhere else in this file.
  - An OA-affected joint does not need to be avoided in the Compound
    zone, but pain occurring DURING or persisting AFTER a session (as
    opposed to a client's pre-existing baseline pain) is the coachable
    regression signal — the same "does the pattern hold up under load"
    judgment already used elsewhere in this file (postpartum DRA midline
    doming, squat-depth/posture breakdown).
  - Diagnosis, imaging interpretation, and surgical-timing decisions stay
    an external referral to the client's physician/orthopedist — training
    can proceed in parallel per the evidence above, but staging severity
    or timing a replacement decision is not ours to do.
Genuine gap: no dedicated postmenopausal-women-specific OA-plus-heavy-
  loading RCT replicating LIFTMOR's exact protocol (≥80% 1RM, 5×5,
  2×/week) in a confirmed-OA population was found in this pass — the
  intensity/dosing evidence above is drawn from mixed-age, mixed-sex
  knee/hip OA RCT pools, not this file's specific 40-65 bracket
  population. Treat the guidance above as directly applicable (it's
  OA-specific evidence with a strong RCT count behind it) but not as a
  bracket-matched replication of LIFTMOR the way the core Bone Loading
  section is.
```

### Breast Cancer Survivorship & Resistance Training (2009-2025 evidence)
```
Why this section exists: confirmed via search of this file that breast
  cancer, lymphedema, and mastectomy have never been mentioned here —
  a genuine, previously-unaddressed gap, unlike OA/cardiac/postpartum
  which at least had partial precedent (client philosophy language,
  a live client) before their dedicated sections were built. Breast
  cancer incidence is highest in exactly this file's core demographic —
  median age at diagnosis is 60-62 (American Cancer Society, 2024-2025
  Facts & Figures) — and there are over 4 million breast cancer
  survivors in the US today. A future client with a mastectomy/lymph-
  node-dissection history and lymphedema risk is a realistic, not
  hypothetical, scenario for this roster, and the single most common
  outdated instinct — restrict or avoid loading the affected-side arm
  to "protect" it from lymphedema — is directly contradicted by the
  evidence below, the same pattern already seen in this file's OA
  section (train around a diagnosis, not through it, being the wrong
  default).
Foundational RCT — the finding that changed clinical practice: Schmitz
  KH, Ahmed RL, Troxel A, et al., "Weight Lifting in Women with
  Breast-Cancer-Related Lymphedema," New England Journal of Medicine
  2009;361:664-673 (the PAL — Physical Activity and Lymphedema — trial,
  n=141 women with STABLE existing lymphedema, twice-weekly slowly
  progressive weight lifting with no imposed upper limit on load). Slow
  progressive weight training did not worsen arm swelling, and the
  weight-lifting group had roughly HALF as many lymphedema flare-ups
  requiring intensive complete decongestive therapy as the control
  group, with reduced symptom severity overall. This trial is why the
  National Lymphedema Network's Medical Advisory Committee moved away
  from blanket loading restrictions — "slowly progressive" describes
  the RCT's own protocol design, not a permanent ceiling on load.
Current evidence goes further — HIGH-intensity resistance training is
  not just tolerated, it may be protective: a 2025 cohort study (EXERT-
  BC/BCN/C, n=115 breast cancer survivors, thrice-weekly dose-escalated
  resistance training over 3 months explicitly progressed toward
  strength/hypertrophy, not kept conservative) found intense resistance
  training was NOT associated with increased lymphedema symptoms, and
  bioimpedance analysis showed significant reductions in extracellular
  water and improved fluid balance — a potential therapeutic benefit,
  not merely a safety finding (Iyengar NM, et al., JAMA Network Open
  2025;8(6), PMID 40498485). A 2025 systematic review and dose-response
  meta-analysis (Wang L, Liu Y, Zhang W, et al., Supportive Care in
  Cancer 2025;33:395, 30 studies synthesized) found resistance training
  overall reduces lymphedema (SMD -0.28, 95% CI -0.44 to -0.15) and
  enhances upper/lower limb strength — and in dose-response analysis,
  HIGH-intensity training (5-8RM, 4x/week, 120-180 min/week) showed a
  LARGER lymphedema-reduction effect than moderate-to-low intensity
  training (8-20RM, ≤3x/week, ≤120 min/week), with programs ≥12 weeks
  outperforming shorter ones. Read together with the PAL trial, this
  reframes "start light, progress slowly" as sound RIR-governed
  practice for ANY new client (same as this file's standing approach
  everywhere else), not as a special permanent restriction unique to
  lymphedema risk.
Standing guideline (no full 2025 replacement found — same "most current
  version located, not superseded" caveat already used for the ACR 2019
  OA guideline above): the ACSM 2019 Roundtable on Exercise Guidelines
  for Cancer Survivors (update to the original 2010 roundtable) — general
  dosing: aerobic training ≥3x/week, 20-30 min, moderate intensity, plus
  resistance training 1-3x/week, 6-10 exercises, 1-4 sets, 8-15 reps at
  ≥50-60% 1RM. This is a starting-point dosing floor, not a ceiling — the
  2025 evidence above shows survivors tolerate and may benefit from
  meaningfully higher intensity than this baseline once appropriately
  progressed, consistent with this file's general "don't under-load"
  philosophy (see Women & Strength Training section above).
ICONS practical application:
  - Do not default to restricting or avoiding loading on the affected-
    side arm for a breast cancer survivor/lymphedema-risk client —
    progressive resistance training (including unilateral carries,
    rows, and presses on that side) is core evidence-based practice,
    not a risk to train around. This mirrors the OA section's core
    lesson: the historically "cautious" instinct is the outdated one.
  - Progress load the same RIR-governed way every other client's
    program does — "slowly progressive" is standard practice here
    anyway, not a special lymphedema accommodation — and don't cap a
    client's ceiling once she's tolerating load well just because of a
    lymphedema history.
  - Genuine interpretive caution for this file's existing Styku
    Asymmetry Protocol specifically: `weakerSide()`/the L/R LST
    comparison this file already uses elsewhere assumes an asymmetry
    reflects a true strength/muscle-mass gap. For a lymphedema-risk or
    lymphedema-affected client, the JAMA Network Open 2025 study above
    found resistance training measurably changed EXTRACELLULAR WATER on
    the affected side — meaning a Styku LST reading on that arm may be
    confounded by fluid status, not muscle alone, in a way the protocol
    was never validated against (its existing reference point, Kelly
    Mulroy's leg data, has no comparable fluid-retention confound). Use
    Styku's L/R comparison as one input, not the sole determinant of
    "weaker side," for this specific population — cross-check against
    reported swelling/heaviness and, where available, the coordinating
    clinician's own measurements.
  - Watch for the standing clinical flags — new/worsening swelling,
    heaviness, tightness, or skin changes on the at-risk arm — as the
    coachable regression signal, the same "stop and flag your coach,
    this is common and treatable, never train through it" posture and
    language already used in the Pelvic Floor Protocol above. An acute,
    unmanaged flare should pause progression on that limb pending
    clinician input, not be pushed through.
  - Scope boundary, same pattern as the Postpartum/DRA section's pelvic-
    floor-PT boundary: neither Jason Bethea's nor Niko Heers' in-house
    scope has been confirmed to cover lymphedema-certified therapy (a
    distinct specialty from general orthopedic PT or PNF stretch
    therapy) or oncology-specific rehab. A symptomatic or newly-
    diagnosed client stays an EXTERNAL referral to her oncologist,
    surgeon, or a certified lymphedema therapist — do not imply in-house
    coverage of this specialty without Xolokan's explicit confirmation.
  - Compression garment use during exercise is a live clinical decision
    (some cited trial protocols used one, some did not) that belongs to
    the client's physician/lymphedema therapist, not something to
    standardize here — same referral-not-diagnose posture used
    throughout this file for anything requiring an individual clinical
    determination this system isn't positioned to make.
Genuine gap: no dedicated postmenopausal-women-specific (40-65 bracket)
  RCT combining LIFTMOR-style ≥80% 1RM bone-loading protocols WITH
  confirmed lymphedema risk was found in this pass — the high-intensity
  evidence above (5-8RM, i.e. roughly 80-87% 1RM by standard %1RM/rep
  tables) is close to LIFTMOR's loading zone but comes from lymphedema-
  focused RCTs/cohorts, not a bone-density-primary study population.
  Treat as strong supporting evidence that heavy loading is appropriate
  for this population, not as a direct LIFTMOR replication.
```

### Cardiovascular / Cardiac Considerations in Resistance Training (2023-2026 evidence)
```
Why this section exists: every other clinical area this file handles
  (pelvic floor, GLP-1, HRT, ACL/knee valgus, bone loading) has a dedicated
  cited subsection — cardiac considerations did not, despite this
  population carrying materially elevated cardiovascular risk through and
  after the menopause transition, and despite a live client (Kayma
  Liburd — cardiac flag, hard 160bpm ceiling, physician-coordinated,
  added 8/12/2026) already needing this judgment call made in practice
  ahead of any citation existing for it. This section is that citation,
  added retroactively; nothing in Kayma Liburd's document was edited as
  part of this pass — see the direct assessment of her build below, which
  is a flag back to the main thread/icons-expert, not an edit.
Risk context: cardiovascular disease is the leading cause of death in
  women, and CVD risk approximately DOUBLES in the 10 years after
  menopause — independent of chronological/ovarian aging, the menopause
  TRANSITION itself (not just confirmed postmenopausal status) is already
  a window of rising risk (Anagnostis P, El Khoudary SR, et al.,
  "Menopause Transition and Cardiovascular Disease Risk: Implications for
  Timing of Early Prevention," AHA Scientific Statement, Circulation
  2020;142(25):e506-e532). This mirrors the same "the transition itself
  matters, not just confirmed postmenopausal status" framing this file
  already uses for pelvic floor risk in the Perimenopausal Status section
  above — cardiac risk belongs in that same category, not treated as an
  unrelated one-off.
Resistance training is broadly SAFE in cardiac populations, including at
  meaningful intensity: primary source "Resistance Exercise Training in
  Individuals With and Without Cardiovascular Disease: 2023 Update," AHA
  Scientific Statement, Circulation 2023;149(3):e217-e231 (update to
  AHA's 2007 statement). Contraindications mirror the ones already used
  for the aerobic/cardiac-rehab component — unstable angina, advanced
  arrhythmias, decompensated heart failure, active thromboembolism.
  Hypertrophic cardiomyopathy is a named exception where RT is generally
  advised against, though low-intensity machine-based RT may be
  permissible per a separate AHA statement on genetic CV disease in young
  patients. Progression: initial intensity 40-60% 1RM, advancing sets/
  frequency/load via a "2-for-2" rule; after ~6 months of regular
  training, a client free of contraindications can move to >80% 1RM with
  longer rest — i.e. heavy compound work is NOT categorically off-limits
  for a stable, cleared cardiac client. Even ~20% 1RM produces real
  strength benefit post-acute-coronary-event, useful context for a client
  early in rehab rather than an established trainee.
  Corroboration (ACSM 2026 — the same guideline update already cited
  elsewhere in this file for the RIR model): safety data spanning >38,000
  participants shows resistance training does NOT increase serious
  adverse event risk, including in adults with cardiovascular disease,
  when progressed appropriately — and in the coronary-heart-disease-
  specific data reviewed, nonfatal cardiovascular complications occurred
  during AEROBIC training, not resistance training. Worth stating plainly
  to a trainer or client who assumes heavy lifting is the riskier half of
  a cardiac-flagged client's session — the citation base places more of
  the observed risk on the conditioning/aerobic side, not the strength
  side.
HR-based vs. RPE/RIR-based autoregulation for a hard HR ceiling: a
  physician-issued absolute bpm ceiling (e.g. Kayma Liburd's 160bpm) is
  standard, legitimate cardiac-rehab practice — typically derived from an
  individual's symptom-limited graded exercise test (the bpm at which
  ischemia, arrhythmia, or symptoms actually emerged, minus a safety
  margin), not an arbitrary population formula. Treat a physician's
  literal number as authoritative over any generic formula (Karvonen/
  heart-rate-reserve, resting-HR-plus-20-30, age-predicted-max
  percentage) — those formulas are what a physician uses to DERIVE a
  number like this in the first place, not a substitute for it once it
  exists. Caution: if a cardiac-flagged client is on a beta-blocker or
  other chronotropic-limiting medication (worth asking directly at
  intake, not assuming), heart rate becomes a LESS reliable real-time
  effort signal — beta-blockade blunts HR response across the intensity
  spectrum, while the RPE-to-oxygen-uptake relationship stays stable even
  under beta-blockade. Track both; do not let a "still under the ceiling"
  HR reading alone clear a set that RPE/RIR says is near-maximal. Direct
  corroboration that this file's existing RIR model transfers to a
  cardiac population, not just a general one: a pilot study in coronary
  artery disease patients (n=16, 9-week supervised cardiac-rehab RT
  protocol) comparing RIR-based RPE prescription against %1RM
  prescription found no significant between-group difference in strength
  gains (Gismondi A, Iellamo F, Caminiti G, et al., "Rate of Perceived
  Exertion Based on Repetitions in Reserve Versus Percentage of
  One-Repetition Maximum for Resistance Training Prescription in Cardiac
  Rehabilitation: A Pilot Study," Journal of Cardiovascular Development
  and Disease 2025;12(1):8). Practical takeaway: run HR-ceiling
  monitoring on conditioning work AND RIR-based autoregulation on
  strength work together for a cardiac-flagged client — they are not
  competing systems, and the existing RIR model (see "Progressive
  Overload — RIR Model" above) does not need a cardiac-specific
  substitute.
Valsalva maneuver / blood pressure response — this is the direct answer to
  whether it was correct to leave Kayma Liburd's strength side entirely
  unrestricted under "precautions not restrictions": PARTIALLY correct.
  The load/intensity side of that call holds up against the AHA 2023
  evidence above — nothing there supports capping %1RM or avoiding heavy
  compound lifts by default in a stable, cleared cardiac client. But the
  call stopped one layer short: a cardiac flag should also trigger an
  explicit BREATHING-TECHNIQUE precaution on heavy compound work, a real,
  separate, well-evidenced risk pathway distinct from the sustained-
  elevated-HR risk that conditioning-side HR capping addresses. A heavy
  near-maximal lift spontaneously triggers a Valsalva maneuver (forced
  exhalation against a closed glottis / breath-holding), sharply raising
  intrathoracic pressure and blood pressure — directly measured mean
  peak values of 320/250 mmHg (one subject exceeding 480/350 mmHg) during
  a double-leg press taken to failure at up to 100% max with Valsalva
  (MacDougall JD, Tuxen D, Sale DG, Moroz JR, Sutton JR, "Arterial blood
  pressure response to heavy resistance exercise," Journal of Applied
  Physiology 1985;58(3):785-790 — an old but still frequently-cited direct
  measurement study, the clearest primary source found for this specific
  magnitude). Breathing technique alone changes this materially at the
  SAME load: mean BP of 311/284 mmHg with Valsalva breath-holding vs.
  198/175 mmHg with slow controlled exhalation, both at ~100% max
  (Linsenbardt ST, Vidal C, Prietto CA, "Effect of breathing techniques
  on blood pressure response to resistance exercise," British Journal of
  Sports Medicine 1992;26(2):97-100 — likewise an older but clearly still
  the primary direct-comparison source; a 2025 bench-press hemodynamics
  study, Deniz IE & Erdemir I, BMC Sports Science, Medicine and
  Rehabilitation 2025, corroborates the same direction of effect in
  resistance-trained males, though its sample was healthy young athletes,
  not a cardiac population, and is cited here only for mechanism
  corroboration, not as cardiac-population evidence). A second,
  cardiac-specific risk sits on the release side: the hemodynamic
  "rebound" when breath is released after sustained Valsalva — the heart
  overcompensates for reduced venous return and BP can drop rapidly
  enough to disrupt normal SA-node pacing, a documented mechanism for
  palpitations or more serious arrhythmia specifically in someone with
  underlying cardiac vulnerability.
  Recommended technique: controlled, open-glottis exhale during the
  exertion (lifting) phase of a heavy rep, rather than sustained breath-
  holding through the rep or the set. This is NOT a call to eliminate
  bracing — brief intra-abdominal-pressure bracing at the sticking point
  of a heavy compound lift is normal, necessary spinal-stability
  technique, and is the SAME "brace BEFORE lifting, exhale on exertion"
  cue this file already prescribes in the Pelvic Floor Protocol above for
  a completely different reason (continence, not cardiac risk) — the two
  populations' needs converge on the identical coaching cue. What matters
  for cardiac risk specifically is SUSTAINED breath-holding across
  multiple reps or an entire set, not a single brief brace-and-exhale.
  Practical implication: a cardiac flag should make an explicit "exhale
  on exertion, do not hold your breath through the rep" cue a standing,
  WRITTEN part of every heavy compound-lift block (roughly ≥70-80%
  working intensity — squat, deadlift-pattern hinge, heavy press) for
  that client, the same way the pelvic floor cue is standing/written
  rather than assumed. Per CLIENTS.md's own description, Kayma Liburd's
  document left the strength-training side unrestricted with no
  breathing-technique language at all — flagged back to the main thread/
  icons-expert as a candidate revision, not edited here.
General framing — when should a cardiac flag scope conditioning only vs.
  also touch resistance training: conditioning/metabolic work (sustained
  elevated HR, circuits, bike/rower, anything with a duration component)
  is where a hard HR ceiling + RIR/RPE monitoring is the primary, direct
  control — correctly the main lever Kayma Liburd's build already used.
  Heavy compound resistance training (brief, near-maximal single-effort
  loading) is not automatically load-restricted in a stable, cleared
  client per AHA 2023 above — but it's the domain where Valsalva/BP-spike
  risk is sharpest, so it should ALWAYS carry the breathing-technique cue
  above as a standing precaution, regardless of whether load is
  restricted. Anything beyond that standing precaution (a true %1RM cap,
  avoiding single-rep near-maximal testing, avoiding sustained isometric
  holds, a lower absolute HR ceiling than standard formulas would
  suggest) must come from the client's own physician/cardiologist, not be
  invented here — cardiac clearance is inherently individualized
  (ejection fraction, arrhythmia history, actual stress-test result) in a
  way ALST/VFA/T-score are not, so unlike `pelvicFloorCallout()`'s
  universal auto-trigger off a single boolean, a cardiac flag's SPECIFIC
  numeric restrictions (beyond breathing technique) have no universal
  threshold to auto-apply — document whatever the physician specifies,
  and default to the breathing-technique + HR-ceiling/RIR combination
  above when nothing more specific has been given.
Engine note (flagged for future engine work, not built in this pass — out
  of this agent's scope): the pattern above — HR-ceiling conditioning
  language + a standing breathing-technique cue on heavy compound blocks,
  auto-fired off a `client.cardiacFlag`-type field — is structurally
  similar to how `pelvicFloorCallout()` already auto-fires off
  `client.isPostmenopausal`. Worth considering as a template addition the
  next time `icons_template.js` is extended, so a future cardiac-flagged
  client doesn't depend on a trainer/agent remembering this section by
  hand the way Kayma Liburd's build currently does.
Male Client Programming Framework population: the RT-safety evidence
  above (AHA 2023, ACSM 2026) is not sex-differentiated — the same
  "resistance training does not increase serious-adverse-event risk,
  breathing technique matters more than load restriction" framing applies
  to a male client with a cardiac flag without adjustment. The one
  population-level difference worth flagging: average CVD-risk onset
  runs earlier in men than the postmenopause-linked rise this file
  documents for women — commonly described as risk beginning to climb
  from the mid-40s in men, roughly a decade or more ahead of the
  postmenopause-driven rise cited for women above — so a cardiac-flag
  conversation is reasonably relevant starting earlier in the Male
  Client Programming Framework's brackets than the equivalent trigger
  point in the women's brackets, not because the training response
  differs, but because the base-rate conversation comes up sooner.
```

### Hormone Therapy (MHT/HRT) — How Resistance Training Relates, Not Competes
```
Client question to expect: "Should I also be on hormone therapy, or does
  training cover it?" — this is not ours to answer clinically, but the
  training-specific evidence is worth knowing so the answer isn't a shrug.
Finding: resistance training ALONE was as effective as hormone therapy
  alone at preventing bone loss at the spine in early postmenopausal
  women, and outperformed HRT alone at the spine in some trials. Combining
  HRT + resistance training showed no additional spine-BMD benefit over
  resistance training alone in the reviewed trials.
Framing: never present training as a replacement for a client's medical
  care or as medical advice either way — "on or off HRT, the resistance
  training half of this is doing real, comparable work for your bone
  density" is an accurate, supportive thing to say; "you don't need HRT
  because of this program" is not ours to say.
Optimal RT dose for BMD in menopausal women specifically: 2–3×/week
  moderate-to-high intensity resistance training + separate impact
  activity (jumps, hops) at least 3×/week — consistent with the existing
  LIFTMOR-style protocol above, not a change to it.
```

### Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context (2025-2026 evidence)
```
Why this matters: the 35-45 and 45-55 brackets above already say "autoregulate
  on individual symptoms, not calendar/age" — this section checks that
  guidance against current literature and asks the sharper follow-up
  question: what is actually reasonable for a trainer to ASK at intake, and
  does an unconfirmed/ambiguous status (neither clearly premenopausal nor
  postmenopausal) require anything MORE specific than "autoregulate"?

Diagnosis/staging context (not ours to perform, but useful to know what it's
  built on): STRAW+10 (Stages of Reproductive Aging Workshop, 2011 revision)
  is the clinical gold-standard staging system, and it is itself built on
  self-reported menstrual bleeding-pattern changes — persistent cycle-length
  differences of 7+ days between consecutive cycles marks early perimenopause
  (stage -2), continuing through 12 months after the final period (stage
  +1a). This means the categories a trainer could reasonably ask about at
  intake (has your cycle length changed by a week or more? periods further
  apart or closer together? hot flashes/night sweats, sleep disruption, new
  mood changes?) are the SAME category of self-report data STRAW+10 itself
  runs on — asking about them is not overstepping into diagnosis, it's
  collecting the same input a clinician would use. What crosses the line is
  STAGING the answers into a diagnosis or a treatment recommendation — that
  stays a referral conversation, mirroring the posture already established
  for HRT/TRT elsewhere in this file.
STRAW+10 known limitation: reduced applicability for women with PCOS, prior
  hysterectomy, endometrial ablation, or a hormonal IUD — none of which
  produce a trackable normal bleeding pattern. Useful for a trainer to know
  because it flags exactly the clients for whom "ask about cycle changes"
  won't produce a usable answer, making vasomotor/sleep/mood self-report the
  only usable signal instead.

Does ambiguous status change the training prescription itself? A 2025 RCT
  (University of Exeter, n=70 pre-/peri-/postmenopausal women not on HRT,
  12-week supervised low-impact resistance program 4x/week, Medicine &
  Science in Sports & Exercise 2025;57(3):501-513) found lower-body strength
  and dynamic balance adaptations occurred irrespective of menopausal status
  — the training response itself did not depend on which stage a woman was
  actually in. This is now a direct, current citation for what this file's
  35-45/45-55 brackets already state. FINDING OF THIS PASS: the existing
  "autoregulate on individual symptoms, not calendar" guidance already
  covers this adequately — no change to the underlying training philosophy
  is warranted. A client with genuinely unconfirmed status does not need
  her programming held back pending a diagnosis; RIR-based autoregulation,
  protein/creatine tiering by the nearer bracket, and heavy compound
  lifting all proceed the same way whether status reads confirmed peri-,
  post-, or unknown.

One place ambiguity DOES have a concrete, non-trivial consequence: pelvic
  floor risk is not a clean postmenopausal-only phenomenon. Mishra GD,
  Cardozo L, Kuh D, "Menopausal transition and the risk of urinary
  incontinence: results from a British prospective cohort," BJU
  International 2010 (n=1,211 women followed ages 48-54) found women who
  were perimenopausal, or had been perimenopausal >1 year, were MORE likely
  to report stress urinary incontinence than postmenopausal women in the
  same cohort (OR 1.39, 95% CI 1.11-1.73 for both) — the transition itself,
  not confirmed postmenopausal status, is the higher-risk window for this
  specific outcome. This is an older but still-cited cohort study, not a
  2025-2026 finding, but it is the clearest direct evidence found on this
  specific question and it changes a practical default, so it's included
  here rather than left out for recency alone.
Engine implication: `client.isPostmenopausal` in `icons_template.js` gates
  `pelvicFloorCallout()` as a clean boolean. That boolean is a reasonable
  proxy once status is CONFIRMED, but per the finding above, a 45-55
  bracket client with an ambiguous/unconfirmed status should NOT be
  assumed pelvic-floor-safe by default just because `isPostmenopausal`
  reads false or is unset — the transition window itself is the elevated-
  risk period for stress UI, arguably more so than confirmed
  postmenopausal status. Until/unless the engine supports a three-state
  field, the safe manual practice is: for any 45-55 bracket client with
  menstrual irregularity or vasomotor/sleep symptoms reported at intake,
  set `isPostmenopausal: true` (or otherwise manually include
  `pelvicFloorCallout()`/equivalent language on heavy-loading days) even
  without a confirmed diagnosis. This is a genuine, evidence-based
  refinement — not just a restatement of "autoregulate" — and is the one
  concrete process change this pass produced.
```

### GLP-1 / Anti-Obesity Medications (semaglutide, tirzepatide, etc.) — 2025 evidence
```
Relevance: increasingly common in this client population (women 40s-60s)
  — worth asking about directly at intake rather than assuming, since it
  changes the nutrition and programming priorities materially.
Finding: roughly 40% of weight lost on GLP-1 medications is lean mass,
  not fat mass — women and older adults appear to lose muscle at a higher
  rate than the general GLP-1 population. This directly compounds ALST
  At-Risk status if already flagged, and can create a new sarcopenic-
  composition risk even in a client who is losing weight "successfully"
  by the scale.
Mitigation — resistance training: clients combining GLP-1 therapy with
  structured resistance training 3-5x/week preserved 2-3x more lean mass
  than those on medication without structured training.
Mitigation — protein: higher protein intake specifically protects lean
  mass during GLP-1-driven weight loss — this is the same mechanism the
  existing protein tiers already target, but the priority is sharper for
  a client on these medications: do not let a shrinking appetite (a
  common GLP-1 side effect) become an excuse to under-hit the g/kg target.
ICONS application: a client on a GLP-1 medication should be treated as a
  standing ALST-preservation priority regardless of what her actual ALST
  number currently reads — resistance-priority programming and hitting
  the protein target are not optional "nice to haves" for this client,
  they are the entire reason the weight loss doesn't become a sarcopenia
  problem in 6 months. Flag GLP-1 use explicitly in intake notes/baseline
  notes so this isn't missed by a trainer who wasn't told.
```

### Sleep & Recovery
```
Finding: resistance training itself measurably improves sleep quality —
  shown in both young women and older women (12-week RCT), independent of
  a client's baseline sleep quality. This is a legitimate thing to tell a
  client who says she's "too tired to train" — properly dosed training is
  more often a fix for that than a further drain on it.
Mechanism: modulates sympathetic/β-adrenergic signaling, reduces
  inflammatory markers, increases BDNF (linked to cognitive/mental health
  benefits already cited elsewhere in this file for creatine/exercise).
Caution: this describes properly dosed, RIR-managed training — it is not
  a license to add volume indiscriminately. Unmanaged excessive volume or
  chronic near-failure training remains a plausible sleep/recovery drain;
  the RIR model above is what keeps the dose in the beneficial range.
```

### Progressive Overload — RIR Model (ACSM 2026)
```
Training to momentary failure does NOT consistently improve strength/hypertrophy.
Use RIR (Reps In Reserve) language:
  3+ RIR → warm-up / pattern set
  2 RIR  → moderate working set
  1 RIR  → hard working set (primary strength sets)
  0 RIR  → near-failure (use sparingly)

Add weight when: top of rep range + 2 RIR + clean form
Same weight when: form degraded
Drop weight when: missed reps / pain / fatigue

Citation strength: this is ACSM's first resistance-training guideline update
in 17 years, synthesizing 137 systematic reviews across 30,000+ participants
— not a single-study finding. Cite it with that weight when a trainer or
client pushes back on "why not just go to failure."

Perimenopause-specific corroboration (WHEN position statement, 2025): heavy
lifting is well-supported for bone density and strength in perimenopausal/
menopausal women specifically; training to failure or near-failure has no
evidence base in this population for ANY outcome — reinforces, not just
generalizes, the RIR standard for the 45–55 bracket specifically.
```

### Why Not Just Fix Every Exercise At 8–12 Reps? (checked 8/13/2026)
```
"8–12 reps for growth" is retired bodybuilding-era doctrine, not current
evidence — do not adopt it as a standing rule. Two separate bodies of
evidence say this directly, not just permissively:

Hypertrophy: Schoenfeld, Grgic, Van Every & Plotkin's repetition-continuum
  re-examination (Sports 2021;9(2):32) found comparable hypertrophy across a
  wide loading spectrum (as low as ~30% 1RM up to ~90%+ 1RM) PROVIDED sets
  are taken close to failure — load/rep-range itself is not the driver once
  effort is controlled for. Robinson, Pelland, Remmert, Refalo, Jukic,
  Steele & Zourdos's 2024 dose-response meta-regression (Sports Medicine
  2024;54(9):2209-2231) sharpens the mechanism: hypertrophy increased as
  sets were taken closer to failure (lower RIR), largely independent of rep
  range — but strength gains showed a NEGLIGIBLE relationship with
  proximity to failure. In other words: for hypertrophy, proximity-to-
  failure (RIR) is the driver, not rep count. For strength specifically,
  %1RM/load is the driver, not RIR and not rep count.
ACSM 2026 (the same guideline update already anchoring this section) makes
  this a position-stand-level conclusion, not just a meta-analysis footnote:
  it explicitly retires the "8-12 reps for hypertrophy" rule, states rep
  range has no independent effect on hypertrophy once effort/volume are
  matched, and supports a working range of roughly 1-30 reps/set depending
  on goal — a direct endorsement of exactly the goal-varying rep-range
  approach this system already uses (e.g. Nick's 3-5 rep/70-88% 1RM
  strength-focused primary lifts vs. 8-12+ rep Compound-zone accessory and
  Isolated-zone activation work), not a contradiction of it.
Practical takeaway: locking every exercise in every program to 8-12 reps
  would be a REGRESSION from current evidence, not an upgrade — it would
  cap strength-focused primary lifts at a rep range that isn't optimized
  for that goal, for no evidence-based reason. The correct model — already
  what this system does — is: rep range varies by training goal/zone
  (Isolated activation, Compound strength-vs-hypertrophy split, Metabolic
  conditioning each have a different natural rep-range profile), and
  PROGRESSION within whatever rep range is programmed is governed by RIR/
  proximity-to-failure, not by hitting a specific rep number. 8-12 is not
  wrong as ONE reasonable range a Compound-zone hypertrophy block might use
  — it's wrong as a universal rule applied to every exercise regardless of
  goal.
```

### Women & Strength Training (Roberts, Nuckols & Krieger 2020, JSCR)
```
Hypertrophy: no sex difference (ES=0.07)
Upper-body strength GAINS: women adapt MORE (ES=-0.60 favoring females)
Volume tolerance: women fatigue LESS than men at equivalent relative loads
Rest periods: women recover faster between sets — can use shorter rest
Frequency: 2–3× per week per muscle group
Volume: ≥10 sets/muscle/week for hypertrophy (ACSM 2026)
NEVER under-load: women are systematically under-loaded in most programs
```

### Menstrual Cycle Training
```
Evidence: Colenso-Semple, Phillips et al. 2023 (umbrella review) — 
  NO reliable influence of cycle phase on strength adaptations.
Practice: Train hard year-round. Use RPE/RIR-based autoregulation.
  Autoregulate around INDIVIDUAL symptoms over ≥3 cycles — not calendar.
Perimenopause/menopause: Heavy RT ≥3×/week + protein 2.0–2.2 g/kg is 
  strongly evidence-backed. HRV dips in luteal phase are NORMAL — 
  interpret vs individual baseline not a flat line.
```

### Asymmetry Protocol (Styku segmental data)
```
When Styku shows L/R gap ≥ 0.5 lbs in arms or legs:
1. Lead with WEAKER side on ALL unilateral exercises
2. Log left vs right separately in coaching cue / flag field
3. Suitcase carry: carry in weaker HAND (anti-lateral-flexion trains opposite)
4. Track at 8-week Styku rescan — asymmetry should reduce
```
`weakerSide(leftLST, rightLST)` (exported from `icons_template.js`) now does the "lower LST = weaker" comparison itself — returns `'left'|'right'|'even'` — use it instead of hand-deriving weaker side in comments.

### VFA (Visceral Fat Area) Thresholds
```
< 70 cm²   → Very Low Risk
70–99 cm²  → Low Risk
100–149 cm²→ Moderate Risk (cardiometabolic flag)
≥ 150 cm²  → High Risk
```

### BMI Clinical Flags (use alongside body fat %)
```
< 18.5  → Underweight — flag regardless of body fat %
18.5–24.9 → Normal
25–29.9   → Overweight
≥ 30      → Obese
BMI < 18.5 + ALST < 5.5 = sarcopenic obesity profile — highest priority
```

### Pelvic Floor (postmenopausal + heavy loading)
```
Triggers: heavy carries, squats, deadlifts, hip thrusts at high loads
Protocol: brace BEFORE lifting, exhale on exertion
Language: "If you experience any leaking, heaviness, or pressure — 
           stop and flag your coach. This is common and treatable."
Do NOT say: "train through it" or minimize symptoms
Refer to pelvic floor PT when symptomatic
```

### Postpartum Return to Training & Diastasis Recti Abdominis (DRA) — 2025 evidence (new subsection, checked 8/14/2026)
```
Why this section exists: the Age Bracket Programming Framework's own intro
  already gives "a 44-year-old postpartum client may sit closer to the
  45-55 profile" as its example of bracket proximity guidance — meaning
  this file has referenced a postpartum client as a live scenario since
  8/11/2026 without ever actually building the protocol behind it. This
  is that protocol, added retroactively, the same pattern as the
  Cardiovascular section's relationship to Kayma Liburd's build. No
  current roster client is known to be postpartum as of this pass — this
  is proactive framework-building per the standing "be ready for any
  client at any time" trigger, not a response to a specific intake.
Scope: this is a physiological STATE, not an age bracket — a postpartum
  client can fall anywhere in the 20-35 or 35-45 brackets (rarely 45-55+).
  Layer this section's guidance on top of whichever age bracket otherwise
  applies; it does not replace that bracket's protein/creatine/volume
  guidance.

Not a blanket "cleared at 6 weeks" event: the 2025 Canadian Guideline for
  Physical Activity, Sedentary Behaviour and Sleep Throughout the First
  Year Postpartum (CSEP-led pan-Canadian Consensus Panel, ~19,000 articles
  screened, 7 supporting systematic reviews, published British Journal of
  Sports Medicine 2025, endorsed by ACSM) explicitly moves away from a
  single blanket medical-clearance date toward an individualized,
  gradual, symptom-based return. Target: build up to 120 min/week
  moderate-to-vigorous physical activity spread over ≥4 days, including
  BOTH aerobic movement and resistance training, plus daily pelvic floor
  exercise — resistance training is a named, explicit component of the
  guideline, not an afterthought to cardio. A physician's 6-week
  "cleared for exercise" note is necessary but not sufficient by this
  standard — it does not by itself mean cleared for heavy compound
  loading, and progression from there should still be gradual and
  symptom-led.
Screening: the guideline's companion tool, the Get Active Questionnaire
  for Postpartum (GAQ-PP, CSEP), is a 4-question self-administered
  screen for relative contraindications to postpartum exercise; a "yes"
  on any item routes the client to her own healthcare provider before
  progressing, mirroring this file's existing referral-not-diagnose
  posture used for HRT/TRT and pelvic floor symptoms elsewhere. A
  trainer administering GAQ-PP-style questions at intake is the same
  category of legitimate, non-diagnostic self-report collection already
  established for perimenopausal screening in this file (see
  "Perimenopausal Status — Screening Ambiguity" above) — collecting the
  answers is fine, staging/diagnosing off them is not.

Diastasis recti abdominis (DRA) — what it is and how common it stays:
  a midline separation of the rectus abdominis at the linea alba,
  present in roughly 60-100% of women in late pregnancy depending on
  diagnostic threshold, and NOT something that reliably resolves on its
  own by 6 weeks or even 6 months. A frequently-cited longitudinal cohort
  found prevalence at 60% at 6 weeks postpartum, 45.4% at 6 months, and
  32.6% at 12 months (Sperstad JB, Tennfjord MK, Hilde G, Ellström-Engh
  M, Bø K, "Diastasis recti abdominis during pregnancy and 12 months
  after childbirth," British Journal of Sports Medicine 2016 — an older
  but still the standard-cited cohort on this specific timeline). A
  separate 2024 cross-sectional study found DRA (IRD > 2cm) still present
  in 36%/31%/22%/26%/30% of women at 3/5/10/20/30 YEARS postpartum
  respectively — worth knowing because it means a "postpartum" clinical
  flag isn't automatically stale just because a client is years out from
  delivery; ask rather than assume it resolved.
Exercise is the recommended first-line treatment, not a risk to manage
  around: multiple 2025 systematic reviews/meta-analyses (a Scientific
  Reports systematic review and network meta-analysis, 27 RCTs/1,340
  postpartum women with DRA/39 interventions, comparing physical-therapy
  strategies for reducing inter-recti distance; a separate non-operative-
  management systematic review and meta-analysis of RCTs) confirm
  structured exercise programs measurably reduce inter-recti distance.
  Neither review found a single clearly superior protocol — evidence
  favors SOME structured deep-core exercise over no intervention, without
  yet settling which specific exercise program is best.
The "no crunches/no sit-ups ever" rule is outdated, not evidence-based
  as an absolute: the mechanical concern is real (a standard curl-up
  raises intra-abdominal pressure and can visibly bulge/dome the midline
  in an under-prepared client — this is a real biomechanical finding, not
  a myth), but the current evidence-based response is sequencing, not a
  permanent ban. Gluppe S, Ellström Engh M, Bø K, "What is the evidence
  for abdominal and pelvic floor muscle training to treat diastasis
  recti abdominis postpartum? A systematic review with meta-analysis,"
  Brazilian Journal of Physical Therapy 2021, found low-quality but
  positive evidence that transversus abdominis (TrA) training AND
  curl-up training both outperformed minimal intervention for DRA — i.e.
  curl-up-pattern training is not disqualified by the evidence, provided
  it's introduced once foundational deep-core control is established, not
  as a first exercise. This maps directly onto this file's existing
  Three-Zone philosophy: Isolated-zone work (TrA/diaphragm/pelvic-floor
  activation, neutral-spine control) precedes Compound-zone loading and
  any anti-flexion/flexion-pattern accessory work for this client, exactly
  as "Control precedes power" already describes for every other client —
  this is not a new philosophy, it's an application of the existing one
  to a population this file hadn't yet written the application for.
ICONS practical application for a postpartum client's program:
  - Do not assume a physician's 6-week clearance note means cleared for
    heavy compound loading — confirm current symptom status (leaking,
    pelvic heaviness/pressure, visible midline doming/coning under load)
    before progressing intensity, the same "ask, don't assume" posture
    already used for perimenopausal status.
  - Sequence Isolated-zone deep-core/pelvic-floor activation (TrA
    bracing, diaphragmatic breathing, dead bug/bird dog-family patterns)
    before Compound-zone heavy loading, and before reintroducing
    flexion-pattern ab work (crunches, sit-ups, hollow holds) — not a
    permanent exclusion of those patterns, a sequencing decision.
  - Watch for visible midline doming/coning under load (the same "does
    the pattern break down under load" judgment already used for squat-
    depth/posture regression elsewhere in this file) as the practical,
    coachable signal to regress load or exercise selection, rather than
    relying on a caliper/finger-width DRA measurement a trainer isn't
    qualified to perform diagnostically.
  - A symptomatic client (leaking, pelvic pressure/heaviness, or a DRA
    gap that isn't responding to several weeks of foundational work)
    should be referred to pelvic floor PT — same language and posture as
    the existing Pelvic Floor Protocol above. Per the Studio Staff
    section's scope boundary, this stays an EXTERNAL referral — neither
    Jason Bethea's nor Niko Heers' in-house scope has been confirmed to
    cover pelvic floor PT, and DRA/postpartum core rehab sits close
    enough to that specialty that the same boundary applies here, not
    just to classic pelvic-floor-symptom cases.
Genuine gap, not filled here: no systematic review reviewed in this pass
  gives a specific %1RM, load, or timeline threshold for when a
  postpartum client can safely return to LIFTMOR-style (≥80% 1RM)
  compound loading — the guideline's own framing is deliberately
  individualized/symptom-based rather than threshold-based, so inventing
  a specific number here would misrepresent the evidence. Progress load
  the same RIR-governed way every other client's program does, gated by
  the symptom checks above rather than a fixed week count.
Engine note (flagged for future engine work, not built in this pass —
  out of this agent's scope, same pattern as the cardiac-flag engine
  note above): a `client.isPostpartum`-type field that auto-inserts a
  deep-core/pelvic-floor sequencing reminder the way `isPostmenopausal`
  auto-inserts `pelvicFloorCallout()` would be a reasonable future
  addition — no postpartum client exists on the roster yet to make this
  urgent, but the pattern is now documented here for whenever one does.
```

### ACL / Knee Valgus (women 2.8× male incidence — team ball sports meta-analysis 2022)
```
Cause: hip abductor / glute med weakness → dynamic knee collapse
Screen: single-leg squat drop test (does knee cave medially?)
Fix: lateral band walks, terminal knee extensions, Spanish squat,
     Copenhagen plank, single-leg step-downs
Banded squats: band above knees creates proprioceptive cue to push OUT
Protocol: corrective circuit before every squat session

Updated 2025 meta-analyses (female team-sport athletes): neuromuscular
training reduces ACL injury risk ~50% and overall knee injury risk ~22%.
Critical practical finding: compliance (≥75% session adherence) predicts
outcomes better than program complexity does. Coaching implication — a
short, simple 4-exercise corrective circuit run every single session beats
an elaborate 8-exercise circuit that gets skipped when time is short. Don't
add correctives to look thorough; add the minimum set a client will
actually complete every time.
```

### Copenhagen Plank (adductor strengthening)
```
Target: adductor longus. EMG ~108% MVIC — extremely effective.
Protocol: 3×/week × 6–8 weeks preseason, then 1×/week maintenance
Dose: progressive hold time starting 15–25s, building to 45s
Effect: -41% groin injury risk (Harøy et al. 2018, BJSM)
Coaching: side plank, top leg on bench, adductor holds the position
```

---

## MALE CLIENT PROGRAMMING FRAMEWORK

Built 8/11/2026 in response to Xolokan's explicit request, after Jake Poyner's and Vinz Feller's documents both correctly *scoped out* the women's numeric thresholds but left no substitute in their place — meaning a male client's ALST, VFA, BMI, and protein needs were being reported with no clinical interpretation at all, just raw Styku numbers. This section fixes that gap and is now the standing reference for any male client, present or future.

**Standing trigger — this is proactive, not reactive.** Whenever a new client falls outside both the women's Age Bracket Programming Framework above and this section (a different sex/gender scope, an age population neither framework covers, etc.), research and build out that population's framework in this file *as part of onboarding them* — the same way this section was built for Jake and Vinz — rather than shipping another document that just says "thresholds not applied" with nothing to replace them. "We need to be ready for any client at any time" (Xolokan, 8/11/2026) is the operating principle, not a one-time backfill.

**How this differs structurally from the women's framework, and why.** The women's Age Bracket Programming Framework is built around a hormonal cliff — perimenopause/menopause — which justifies five brackets tied to a fairly predictable timeline and a set of threshold escalations (protein, creatine, bone-loading candidacy) that trigger around that transition. Men do not have an equivalent cliff. Total testosterone decline with age is gradual, and its population-level shape is genuinely less settled than the menopause literature: the commonly cited figure is roughly 1–2%/year from age 30 (cumulative ~20–30% loss of peak T by age 50), but at least one published normative-modeling study found *increasing variance* rather than a clean population-level decline after age 40 — i.e., individual variation matters more than a fixed age curve for men, the same way this file already tells trainers to autoregulate women's training around individual symptoms rather than a calendar. That's why this section uses a flatter, three-bracket structure instead of mirroring the women's five, and why none of its brackets carry a hard numeric trigger the way "postmenopausal" does for women.

### Male Age Bracket Structure

**20–39 — Foundation**
- No unique physiological trigger in this window; apply standard resistance-training protocol (ACSM 2026 RIR model, ≥10 sets/muscle/week hypertrophy target, sex-neutral) at full intensity.
- Protein/creatine/ALST: see thresholds below — no age-based escalation needed yet.
- The women's ACL/knee-valgus corrective-priority emphasis in this file (2.8× female incidence, dedicated corrective circuit before every squat session) is a *female-elevated-risk* finding specific to the cited meta-analysis — do not apply that same weighting/priority to a male client by default. General movement-quality coaching (single-leg squat drop screen, correcting an obvious fault) still applies to anyone; the elevated-risk corrective-circuit emphasis does not transfer.
- Copenhagen plank / adductor injury prevention is sex-neutral (Harøy et al. 2018 studied male and female athletes) and remains highest-yield for athletic/team-sport clients in this bracket regardless of sex.

**40–59 — Midlife Androgen Decline & Sarcopenia Onset**
- Protein: reasonable to trend toward the upper end of the general resistance-trained-male range (see below) as anabolic resistance with age is a real, if more gradual, phenomenon in men too — there just isn't a single hormonal-transition trigger the way "crossing 40" or "postmenopausal" functions for women, so treat this as a soft trend, not a hard tier change.
- Late-onset hypogonadism (LOH) / "andropause" becomes a relevant screening conversation here, especially by the 50s — but it is a clinical diagnosis requiring both persistent symptoms (low libido, fatigue, unexplained muscle loss, mood changes) AND confirmed low morning testosterone on bloodwork, not something inferred from a Styku scan or training performance. Flag it as a referral conversation, the same way this file treats HRT for women: not ours to diagnose, but worth knowing what the training evidence says (see "Testosterone & Resistance Training" below).
- ALST monitoring becomes a priority in this window, same rationale as the women's 45–55 bracket — sarcopenia risk begins rising, even before any hormonal diagnosis is on the table.
- If a client reports a cardiac history or diagnosis, see "Cardiovascular / Cardiac Considerations in Resistance Training" in the Evidence-Based Science Layer above — its RT-safety evidence (AHA 2023, ACSM 2026) is not sex-differentiated and applies directly; average CVD-risk onset runs earlier in men than the postmenopause-linked rise documented for women, so this conversation is reasonably relevant starting in this bracket rather than later.
- Vinz Feller (age 50) sits in this bracket.

**60+ — Older Male / Bone-Density Priority**
- Bone loss in men becomes clinically significant later than in women — typically described in the literature as emerging in the "seventh decade and beyond" rather than tracking a menopause-adjacent transition — which is consistent with standard osteoporosis screening guidance generally starting at 65+ for men (or 50–64 with additional risk factors), later than the postmenopausal-window trigger used for women in this file.
- Bone loading: see "Bone Loading in Men" below — apply the same "bone investment" framing used for women, with the evidentiary caveats noted there.
- Power training for fall-risk/longevity applies directly and with strong evidentiary backing — see "Power Training — Men" below; unlike the women's WHISH-cohort fall-risk citation (women 75+, women's-health-specific cohort), the core power/mortality citation for this bracket is a mixed-sex study in which men were the majority of the sample, so it transfers to men directly rather than by analogy.
- If a male client reports pelvic floor symptoms (most commonly post-prostatectomy in this age range), treat it as an individual clinical flag and refer to pelvic floor PT — the same "stop and flag your coach, this is common and treatable" language used for women applies, but do NOT auto-trigger it the way `pelvicFloorCallout()` does for postmenopausal women; there is no equivalent universal age/sex trigger for men, so this stays a documented individual flag, not a bracket-driven default.

### ALST Index (Appendicular Lean Soft Tissue) — Men, EWGSOP2 2018
```
< 7.0 kg/m²  → AT-RISK for sarcopenia (EWGSOP2's male ASM/height² low-muscle-mass cutoff)
≥ 7.0 kg/m²  → Not At-Risk
```
EWGSOP2 sets the low-muscle-mass cutoff at ASM/height² < 7.0 kg/m² for men and < 5.5 kg/m² for women — the same source already cited for the women's threshold in this file. This confirms Vinz Feller's Styku report (ALST 7.55 kg/m², labeled "Not At-Risk") is consistent with the standard clinical cutoff, not a Styku-specific number.

**Genuine gap — no three-tier subdivision found for men.** The women's ALST table above splits into three tiers (At-Risk / Normal-monitor / Optimal ≥7.0). The literature search for this pass did not turn up a comparably-cited three-tier subdivision for men — EWGSOP2 gives a single binary threshold (<7.0 at-risk / ≥7.0 not-at-risk), used alongside grip strength (<27 kg = low) and physical-performance testing to stage probable vs. confirmed vs. severe sarcopenia, not to sub-divide the "not at-risk" range the way this file does for women. Do not invent an "optimal" male ALST number. Treat a value close to the 7.0 line with the same clinical judgment used for any borderline finding, not a numbered tier.

### Protein Targets — Men (ISSN 2017 position stand + Morton 2018 meta-analysis)
```
General resistance-trained men     : 1.6–2.2 g/kg/day
  (ISSN 2017: 1.4–2.0 g/kg/day sufficient for most exercising individuals;
   Morton et al. 2018 meta-analysis/meta-regression, 49 trials, 1,863
   participants — the same meta-analysis already cited for the women's
   1.6 g/kg tier in this file, and its underlying trial pool was not
   sex-restricted — dose-response plateau ~1.62 g/kg)
Caloric restriction / cutting      : 2.3–3.1 g/kg/day to maximize lean-mass
  retention (ISSN 2017) — higher than maintenance, mirrors the logic (not
  the exact number) behind the women's ALST At-Risk escalation
Per meal                            : ~0.4 g/kg (leucine threshold — mechanism
  is not sex-specific)
Distribution                        : 4+ meals/day
```
No single age-based tier escalation (unlike the women's 1.6 → 1.8–2.0 → 2.0–2.2 progression tied to the 40/postmenopausal thresholds) is cited in the literature for men specifically — trend a 40–59+ client toward the upper end of the 1.6–2.2 g/kg range as a matter of sound practice given general anabolic-resistance-with-age findings, but do not present it as a cited hard tier the way the women's brackets are.

### Creatine — Men
```
Dose     : 3–5g monohydrate daily (no loading phase needed) — identical to
           the women's protocol; sex-specific dosing differences are not
           supported by the literature reviewed (men and women show
           comparable creatine-transporter saturation and comparable
           strength/performance benefit at standard doses)
Indicated: all resistance-trained men, same as women
Benefits : strength, power, cognition — well-supported, same evidence base
           already cited in the women's Creatine section (the 2025
           Nutrition Reviews systematic review and the 2025 Tandfonline
           older-adults/clinical-populations review were not sex-restricted)
Bone     : GENUINE GAP — no dedicated male-specific creatine + BMD RCT was
           found in this pass. The "mixed evidence" note in the women's
           Creatine section (2-year RCT showing no BMD benefit over
           placebo) was generated in postmenopausal women specifically.
           Do not assume it transfers to men either direction — treat
           creatine's bone effect in men as simply unverified, not as
           "probably mixed like the women's data."
```

### Testosterone & Resistance Training — the Male Physiological Analog to Perimenopause/Menopause
```
Client question to expect: "Should I look into TRT, or does training cover
  it?" — not ours to answer clinically (same posture as the women's HRT
  section), but the training-specific evidence is worth knowing.
Decline: total testosterone commonly cited as declining ~1-2%/year from
  age 30 (cumulative ~20-30% loss of peak T by age 50) — but this is
  LESS settled than it's often presented: a published normative-modeling
  study (Sartorius et al.) found increasing population VARIANCE rather
  than a clean age-linked decline after age 40. Treat age as a loose
  proximity guide for this conversation, not a determinant — same
  posture this file already takes toward perimenopause symptom onset
  timing for women.
Late-onset hypogonadism (LOH): a clinical diagnosis requiring persistent
  symptoms (low libido, fatigue, unexplained muscle loss, mood changes)
  PLUS confirmed low morning serum testosterone — not inferable from a
  Styku scan, training performance, or age alone. Flag for medical
  referral when a client raises it; do not diagnose or imply diagnosis.
Finding — exercise vs. TRT: in men 50-70 with low-normal serum
  testosterone, structured exercise training produced SUPERIOR outcomes
  to testosterone treatment alone for aerobic fitness, muscular strength,
  and total/visceral fat mass. Testosterone treatment alone and exercise
  alone had SIMILAR impacts on lean body mass. Adding testosterone
  treatment on top of exercise training gave NO additional benefit for
  any of these outcomes over exercise alone (Hildreth et al., Sports
  Medicine - Open, 2024).
Nuance — very old/frail men: a separate 52-week RCT in frail men 70+ with
  confirmed low T found testosterone + progressive resistance training
  reduced fatigue vs. controls, but the combined group did NOT
  significantly outperform other groups on a physical-performance test
  (30-second Sit-to-Stand) — i.e., evidence for training synergizing with
  TRT is more mixed in frail very-old men than the 50-70 low-normal-T
  finding above suggests. Do not over-generalize the "exercise beats/
  matches TRT" framing to a frail 75+ client without flagging this
  nuance.
Framing: mirror the women's HRT framing exactly — "on or off TRT, the
  resistance training half of this is doing real, evidenced work for
  your strength, fitness, and body composition" is accurate and
  supportive; "you don't need TRT because of this program" is not ours
  to say.
```

### VFA (Visceral Fat Area) — Men
```
The women's VFA table above (< 70 Very Low Risk / 70-99 Low Risk /
100-149 Moderate Risk / ≥ 150 High Risk cm²) applies to men WITHOUT
adjustment. The ~100 cm² visceral-obesity threshold underlying this scale
(Japanese Examination Committee of Criteria for "Obesity Disease", and
the large-scale VACATION-J population study) was validated as predicting
obesity-related cardiovascular risk factor accumulation "irrespective of
gender, age, and BMI" — unlike ALST/protein/creatine, VFA risk banding is
not sex-differentiated in the literature reviewed. No separate male VFA
table is needed; use the existing one.
Waist circumference (if reported/measured): the equivalent visceral-
adiposity waist-circumference cutoffs DO differ by sex — commonly cited
as ≥40 in (102 cm) for men vs. ≥35 in (88 cm) for women for elevated
cardiometabolic risk — flag this if a client's circumference data is
ever interpreted directly rather than through VFA.
```

### BMI & Body Fat % — Men
```
BMI category thresholds (< 18.5 Underweight / 18.5-24.9 Normal / 25-29.9
Overweight / ≥ 30 Obese) are NOT sex-specific per WHO classification and
apply to men without adjustment — same table as the women's section
above. The same caution already implicit in this file for muscular/
athletic clients applies with EXTRA force to men: a 2025 analysis found
standard BMI cutoffs substantially over-flag muscular male athletes as
overweight/obese relative to their actual body-fat-percentage-based
classification — read BMI alongside Styku body fat % and ALST, never
BMI alone, for any visibly muscular male client.

Body fat % reference (ACE classification, men — genuinely different
numbers than would be used for a woman, since Styku's peer-comparison
label like "Average" doesn't tell a trainer whether that's objectively
healthy):
  Essential fat : 2-5%
  Athletes      : 6-13%
  Fitness       : 14-17%
  Acceptable    : 18-24%
  Obese         : 25%+
```

### Bone Loading in Men
```
Finding: a 2024 systematic review (13 articles from 6 trials) found
  regular resistance and impact training of varying duration (6-18
  months) maintained or improved BMD in men with osteopenia/osteoporosis,
  with additional benefits to mobility/balance function (Archives of
  Rehabilitation Research and Clinical Translation, 2024). Resistance
  training outperformed other modalities tested (whole-body vibration,
  traditional Chinese exercise) in the same review.
Genuine gap: no male-specific RCT replicating LIFTMOR's exact protocol
  (≥80-85% 1RM, 5×5, 2×/week, supervised) was found in this pass. The
  2024 review's included trials varied in duration and were not confirmed
  at LIFTMOR's specific loading intensity. Treat "apply the same %1RM
  bone-investment framing to a male client" as a reasonable extrapolation
  from "high-intensity resistance training benefits bone in men" — not as
  an evidenced identical protocol the way LIFTMOR is for postmenopausal
  women.
T-score candidacy: the numeric thresholds transfer (T-score < -1.0
  osteopenia / < -2.5 osteoporosis, WHO), but the reference database
  differs — clinical guidance recommends T-scores in men be derived from
  a MALE-specific normative database, not the female young-adult
  reference the WHO standard was originally built on. Male osteoporosis
  more often has an identifiable secondary cause (hypogonadism,
  glucocorticoid/steroid use, alcohol) worth flagging for medical
  workup rather than assuming primary age-related bone loss by default.
Anatomical note: men retain more trabecular bone connectivity with age
  (steady trabecular thinning) vs. the loss of trabecular connectivity
  more characteristic of postmenopausal women's bone loss pattern — cited
  as a reason male bone loss becomes clinically significant later, not
  as a reason to skip loading.
```

### Power Training — Men
```
Finding: the same Mayo Clinic Proceedings 2025 study already cited in
  the women's Power Training section (relative muscle power predicting
  mortality more strongly than relative strength) was a MIXED-SEX cohort
  in which men were the majority (2,636 of 3,889 participants, 67.8%),
  and the finding held for men directly: hazard ratio for lowest-vs-
  highest relative power category was 5.88 for men (6.90 for women),
  vs. 1.62 for relative strength in men. This citation applies to male
  clients directly, not by analogy — unlike the WHISH fall-risk cohort
  in the women's section, which is a women's-health-specific study and
  does NOT get cited for a male client without a separate source.
Protocol: same as the women's section — sub-maximal load (30-50% 1RM)
  moved with maximal intent, full recovery between sets. No evidence
  reviewed suggests a different protocol for men.
Applies to: the 60+ bracket onward for men, consistent with the same
  "power declines before strength, don't wait" logic already established
  for women — though note the underlying cohort's age range (46-75)
  means the evidence base itself doesn't specifically validate waiting
  until 60 either; 60+ is this file's judgment call for where to
  prioritize it in a male client's programming, not a hard cited cutoff.
```

---

## STUDIO STAFF — IN-HOUSE PT & STRETCH THERAPY

Added 8/11/2026, at Xolokan's direction: "utilize [this staff] to push my clients' experience at Brace Life Studios to the maximal potential." Brace Life now has two in-house staff whose scope directly affects how clinical-flag content gets written in client documents:

```
Jason Bethea  — Trainer / Physical Therapist
Niko Heers    — Stretch Therapist (certified)
```

**Operating model: folded into training days, not a standalone bookable session.** Both work within a client's existing training session — leading a warm-up, cool-down, or corrective block in person — rather than as a separately scheduled appointment. Nothing in this system should describe a "stretch therapy session" or "PT session" as its own booking; describe it as in-session work led by name.

**What this changes in document language.** Before this addition, a clinical flag requiring rehab-adjacent care (a tendinosis, a tear, a corrective-heavy program) was written with generic external-referral language — "PT-coordinated care," "refer to a physical therapist." That language is still correct for genuinely external specialties (see scope note below), but where the actual coordinating clinician is now in-house, name them:
- **General orthopedic/musculoskeletal rehab context** (tendinosis, a tear in active rehab, a corrective-strengthening program tied to a real injury): reference **Jason Bethea** by name and role ("coordinated with Jason Bethea, Brace Life's in-house Trainer/Physical Therapist") rather than the generic "PT-coordinated care" phrase. This is a documentation-accuracy upgrade, not a new clinical claim — the coordinating relationship was already real, it's now nameable.
- **Mobility, ROM, assisted-stretching-heavy content** (a cool-down protocol, a corrective block built around regaining range rather than strength, a client whose limiting factor is flexibility/ROM rather than load): **Niko Heers** is a real, usable resource — reference him by name where a session's mobility work would genuinely benefit from stretch-therapist involvement, not as a blanket addition to every cool-down in the system. **Confirmed 8/13/2026 (Xolokan, direct to the main thread):** Niko's specific technique is **PNF (Proprioceptive Neuromuscular Facilitation) stretching** — see the dedicated paragraph below for the evidence base and use context. Going forward, a future client document naming him for mobility/ROM work should say "PNF stretching" (or the specific variant — "contract-relax"/"hold-relax" — if known) rather than the generic "assisted stretching," since that's his actual named technique, not just a category of work.
- Use judgment on when naming either of them adds real information vs. when it would read as decorative — a client with no rehab/mobility-limiting content on file doesn't need either name inserted just because they're now on staff.

**PNF (Proprioceptive Neuromuscular Facilitation) — the technique behind Niko's work, researched 8/13/2026.** PNF is most commonly practiced as contract-relax or hold-relax: an isometric (hold-relax) or isotonic (contract-relax) contraction of the target muscle against manual resistance, held briefly, then released into a deeper static stretch. It's a real, current-evidence-backed modality, not a placeholder label. Acute and chronic ROM evidence: a 2023 systematic review/meta-analysis (Konrad A, Alizadeh S, Daneshjoo A, et al., "Acute Effects of Various Stretching Techniques on Range of Motion: A Systematic Review with Meta-Analysis," Sports Medicine – Open 2023) found all major stretching modalities — static, dynamic, ballistic, and PNF — produce a small-magnitude acute ROM increase vs. no stretching, with PNF's acute effect comparable to static stretching; a companion chronic-effects meta-analysis by the same group (Konrad A, Alizadeh S, Daneshjoo A, et al., "Chronic effects of stretching on range of motion with consideration of potential moderating variables: A systematic review with meta-analysis," Journal of Sport and Health Science 2024;13(2):186–194, published online 2023) found ≥2-week stretch-training programs using static or PNF stretching produced GREATER long-term ROM gains than dynamic/ballistic stretching — i.e. PNF is a legitimate first-line choice for a client whose limiting factor is genuinely ROM, not just an alternative to static stretching. Mechanism: PNF is traditionally explained via autogenic inhibition (Golgi tendon organ-driven relaxation from the isometric hold) and reciprocal inhibition (antagonist relaxation during the subsequent stretch) — worth knowing when explaining the technique to a client, but flag honestly that the reflex-based explanation is more contested in the literature than commonly taught: EMG evidence has not consistently confirmed reciprocal inhibition during PNF's contraction phase, and the contemporary view leans toward PNF working primarily by shifting a client's stretch tolerance/pain perception rather than a pure spinal-reflex mechanism (Sharman MJ, Cresswell AG, Riek S, "Proprioceptive Neuromuscular Facilitation Stretching: Mechanisms and Clinical Implications," Sports Medicine 2006;36(11):929-939 — an older but still the standard review on this specific mechanistic question; no more current review superseding it was found). Use context: best suited to cool-down/mobility-block work and corrective programming for a client whose limiting factor is ROM rather than load — consistent with how this section already scopes Niko's involvement. Caution: because PNF's contraction phase is a resisted isometric or isotonic contraction of the target muscle immediately before the stretch, it is not generally appropriate as a stand-alone technique on an acutely injured, unstable, or actively inflamed joint/tendon (e.g. active tendinosis) without clearance from the coordinating clinician — treat it the same way this file already treats any loaded technique on a flagged injury: defer to Jason Bethea's/the client's own clinician's clearance status rather than assuming PNF is safe by default on a rehab-flagged area. This specific caution reflects standard clinical practice guidance on contraindications for resisted-contraction stretching techniques, not a dedicated PNF-and-tendinopathy study — none was found in this pass, and none should be implied.

**Scope boundary — do not over-extend either name.** Neither Jason nor Niko's scope has been confirmed to cover **pelvic floor physical therapy**, which is its own specialized sub-discipline distinct from general orthopedic PT. The existing Pelvic Floor Protocol language ("refer to pelvic floor PT when symptomatic," in the Evidence-Based Science Layer and the Male Client Programming Framework) stays exactly as written — external/generic — unless Xolokan explicitly confirms one of them covers that specialty. Do not silently extend "in-house PT is now available" to imply in-house pelvic floor care; that would be a real, unverified clinical claim, not a documentation upgrade.

**Retrofit status:** Moe Shahheidari's rotator cuff rehab and Jake Poyner's QL tendinosis program both had genuine "PT-coordinated care" language predating this addition — both were updated 8/11/2026 to name Jason Bethea directly (see their CLIENTS.md entries for what changed). Any future client with comparable rehab-context clinical content should be written with the named-staff language from the start rather than the old generic phrasing.

**Where Jason's notes live — the "ICONS NOTES JASON PDFS" Drive folder.** Confirmed 8/11/2026: this folder is Jason Bethea's own PT documentation archive — current, past, and future notes for every client he works with directly. It is not third-party/external SOAP-note data; it's the system of record for his in-house PT relationship with a client. `icons-intake-monitor` already sweeps this folder weekly (see "Subagent Team" below) and now treats a new note there as an update to an existing coordinated-care flag (a rehab-stage progression, a new clearance, a setback) rather than a first-time external finding — but the same never-silently-merge-clinical-conflicts rule still applies in full: a new note that contradicts or changes something already documented for a client still gets flagged to the main thread before any document is touched, exactly as the Aimee Morris precedent established.

**Direct-database access attempted 8/12/2026, currently blocked — do not re-attempt without new information.** Jason's app ("stress-bar-clinical," a Render-hosted web service backed by a Neon Postgres database — his SOAP-note UI, distinct from the Drive PDF archive above) was explored as a potential live-data channel. A real Neon connection string was tested via both raw Postgres (port 5432, `psql`) and a plain HTTPS request to the same host — both were rejected with a network-policy denial (confirmed via the session's own egress-proxy status log: `"gateway answered 403 to CONNECT (policy denial)"`), not a credentials or app-side problem. An attempt was made to allowlist the host through the environment's settings and the session was restarted, but the block persisted identically afterward — the change either didn't save, didn't match the exact hostname, or isn't the control that actually governs this session's egress. Resolution requires whoever manages the workspace's network/egress policy (may not be the same as this environment's own settings panel) to confirm where the block actually lives. Until resolved, the Drive folder above remains the sole channel for Jason's note data — do not re-attempt a direct DB connection on a future session without first confirming the allowlist actually changed.

---

## CLIENT ROSTER & DOCUMENT MAP

### Active Clients (documents built this session)
```
Siobhan Hansen  → MIGRATED 8/12/2026 into this repo's clients/scripts structure — see
                  `clients/siobhan_hansen/Siobhan_Hansen_3Day_Training_Plan.docx` and
                  CLIENTS.md's "Siobhan Hansen" entry for the current, engine-built version.
                  This block's numbers were the pre-repo (reportlab/PDF-era) profile; her
                  8/12/2026 rebuild independently re-confirmed every figure below against
                  her actual Styku PDF before reusing it, so it's accurate as a historical
                  snapshot but CLIENTS.md is now the maintained source of truth for her.
  Age: 59 | 5'9" | 118 lbs | Postmenopausal
  ALST: 4.66 AT-RISK | VFA: 70.8 cm² | BMI: 17.4 UNDERWEIGHT
  Body fat: 30.9% (FIT) | Scan: 7/29/2026
  Arms: L 7.0 / R 6.2 (RIGHT weaker — leads rows)
  Legs: L 12.7 / R 13.5 (LEFT weaker — leads unilateral)
  Flags: ALST At-Risk, BMI underweight; left shoulder overhead pain — previously
    suspended, now being actively/carefully reintroduced under pain-free-ROM
    autoregulation per her 8/12/2026 rebuild (see CLIENTS.md)
  Protein target: 107–118g/day | Creatine: strongly indicated
  Program (current): 3-day, engine-built — see CLIENTS.md for the full breakdown

Kelly Mulroy    → /mnt/user-data/outputs/Kelly_Mulroy_5Day_Training_Plan_v2.docx
  Age: 35 | 5'4" | 152 lbs | Tue/Wed/Thu/Fri gym + Sun active recovery
  Scan: 6/17/2026 | BF: 36.4% | Lean: 92.0 lbs | Shape: 61/100
  ALST: not yet At-Risk | Leg asymmetry: L 15.7 vs R 16.5 lbs
  Flags: Knee valgus (squat), hip hinge / adductor weakness
  Correctives: banded squat, TKE, Copenhagen plank every session
  Program: 5-day progressive intensity (60/70/80/90%/AR)
  Baselines: DL 55–65 lbs, Squat 25 lbs, OHP 25 lbs×3RM, Carry 35 lbs/hand

Elizabeth Poyner → MIGRATED 8/14/2026 into this repo's clients/scripts structure — see
                    `clients/elizabeth_poyner/Elizabeth_Poyner_5Day_Training_Plan.docx` /
                    `scripts/elizabeth_poyner_5day_plan.js` and CLIENTS.md's "Elizabeth Poyner"
                    entry for the current, engine-built version (which also fixed a missing
                    pelvic floor note on Thu/Fri — see CLIENTS.md for the open items flagged
                    alongside that fix). This block's numbers are the pre-migration snapshot.
  Age: 64 | 5'5" | 115 lbs (up from 112 — lean mass gain) | Postmenopausal
  PRs: Hex DL 195×5 (Epley 1RM 228), Split Hex DL 165×5, Hip Thrust 145×5,
       DB Lunge 40×8, Push-Ups 28, Carry 50/hand, Plank 2:00, SL RDL 40, OHP 20
  Training loads: DL Wk1 180 (≈80% 1RM), HT Wk1 135, Split DL Wk1 155, Carry 50→60–65
  Program: 5-day (Tue Upper / Wed Glute-Ham / Thu Heavy Lower / Fri Prep / Sat Fast-Twitch)
  Pelvic floor note: mandatory every heavy carry / hip thrust / deadlift day (auto-inserted)

Sarah           → /mnt/user-data/outputs/Sarah_Training_Plan_Client_Version.docx
  Virtual 2-day program | Athletic strength focus
  Day A: Power + Strength (lateral primer, squat+OHP superset, bench, cable pull, core)
  Day B: Athletic Strength (RDL, row+cable pull superset, incline+lateral, carry, arms)
  Key: lateral lunge + lateral deadlift as Day A primer (NOT explosive — controlled)
       Cable pulldown replaces assisted pull-up
       Single-arm DB row only in superset (no standalone)
```

### Other Clients (legacy documents)
```
Audrey Harnagel → Wedding week diet + 3-day home + upper sculpt
Aimee           → 2-day plan
Kerry Chandler  → 2-day plan
Nancy Avitable  → 3-day plan
Petra           → 3-day virtual
Daisy Dominguez → Shoulder rehab
```

### System Documents
```
system_documents/ICONS_Baseline_Sheets.docx                   — 5 athletes (migrated 8/12/2026 — see below)
/mnt/user-data/outputs/ICONS_Baseline_Testing_Protocol.pdf    — 5-page protocol (not yet migrated)
/mnt/user-data/outputs/ICONS_Trainer_Education_Deck_Full.pptx — 16 slides (not yet migrated)
/mnt/user-data/outputs/BraceLife_ICONS_Trainer_Staff_Guide.docx (not yet migrated)
/mnt/user-data/outputs/BraceLife_Client_Modification_Briefing_Template.docx (not yet migrated)
```
`system_documents/` (new folder, 8/12/2026) is this section's home in the repo, mirroring how `trainer_education/` maps to the "Trainer Development" sections above — for reference/operational documents that are neither a `clients/<name>/` deliverable nor a self-administered trainer program. The remaining 4 items above are still pre-repo-only (`/mnt/user-data/outputs/` paths, no source script in this repo) — migrate them the same way if/when they resurface, per the Siobhan Hansen and Baseline Sheets precedent.

**ICONS Baseline Sheets — migration detail (8/12/2026).** Xolokan supplied the actual legacy PDF (5 athletes: Becca, Brodie, Oscar, Jah, Nick — strength-testing reference sheets, no Styku/clinical data, not part of the women's client roster). Built via `scripts/icons_baseline_sheets.js`, composing a `Document` directly from the `docx` package (this content's five independent per-athlete tables don't fit `buildDocument()`'s single-client `baselines[]`/`days[]` schema) while reusing the engine's exact page chrome and content primitives rather than hand-recreating any of it.

**Deliberate style deviation, same pattern as the Trainer Development Program migration**: the source PDF used a legacy visual language — solid black header bands, bright blue/orange accents keyed to a level badge, and bordered/shaded callout boxes for the coach note / "not yet assessed" / 4-week-target sections. This predates and was explicitly superseded by this system's confirmed house visual language (no boxed callouts — see "Visual language — confirmed from reference document" above). Rebuilt using `goldCallout()` (coach note), `watchFlag()` (not yet assessed), `greenCallout()` (4-week targets), and `baselinesTable()`/`weeklySummary()` for the two tabular sections — all data preserved verbatim, only the visual treatment changed. Each athlete's level tag (INTERMEDIATE / INTERMEDIATE-ADVANCED / ADVANCED-ELITE) isn't a %-graded value, so it's carried via the existing non-%-graded `badge: {label, sub}` override pattern (same mechanism as Aimee Morris's Day A/B and the Baseline-to-Rescan program's Day 0/Day 4) rather than forced into the 60/70/80/90%/AR intensity system; tier color mapped onto the house accent system (INTERMEDIATE→teal, INTERMEDIATE/ADVANCED→green, ADVANCED/ELITE→red) rather than the source's blue/orange.

Two small backward-compatible engine additions were needed and are now available to any future script:
- `baselinesTable(rows, targetHeaderLabelOrHeaders)` — 2nd param now also accepts a full 4-string header array (not just an override of the 4th "target" column) for reusing this table schema outside the LIFT/BASELINE/TESTED-AT/TARGET shape (here: MOVEMENT/BASELINE/FORMAT/COACHING NOTE). Existing single-string callers unaffected — verified via full regeneration-and-diff against 3 existing client scripts.
- `weeklySummary(rows, headerLabels)` — same idea, optional 5-string header override (here: MOVEMENT/WK 1/WK 2/WK 3/WK 4 for a hand-tracked session log) defaulting to the original DAY/INTENSITY/FOCUS/KEY LIFTS/PROGRESSION TARGETS headers when omitted.
- `PAGE_W, PAGE_H, MARGIN, TW, buildHeader, buildFooter` added to `module.exports` — these already existed internally but weren't exposed, so a script composing its own `Document` outside `buildDocument()` had no way to reuse the exact branded running header/footer and page setup.

No clinical framework applies to this document (no Styku/ALST/VFA/age/sex data on file for any of the 5 athletes) and neither the Antagonist Rotation Rule nor the "ICONS Index Full-Spectrum Progression Standard — Women 40–55" apply — there are no sequenced Compound-zone training blocks here, just a fixed testing-movement list per athlete, and confirmed correctly absent from the delivered document. Independently audited via `icons-doc-auditor`: all 5 athletes' data verified 100% verbatim against the source PDF (not sampled — every movement/baseline/format/coaching-note/not-yet-assessed/target value checked), visual-language compliance confirmed via direct XML inspection (zero legacy box/border artifacts, only house palette colors present), and the engine changes empirically verified non-breaking via regenerate-and-diff against 3 existing client documents.

### Trainer Development Modules — self-paced HTML, distinct from the PPTX/docx system documents above
```
ICONS_Trainer_Learning_Module.html                                       — base layout (5 passive read-and-reflect modules, no gating)
trainer_education/ICONS_Trainer_Development_A_Intensity_Build.html       — mirrors a client's 60/70/80/90%/AR week: content gets heavier and the pass bar stricter each week, capped by a live 90% peak-practicum sign-off
trainer_education/ICONS_Trainer_Development_B_Three_Zone_Practicum.html  — mirrors Isolated→Compound→Metabolic: isolated skill drills to 90% precision, then an integrated case-study read, then live-pressure fire-drill scenarios at 100%
trainer_education/ICONS_Trainer_Development_C_Baseline_to_Rescan.html    — mirrors the Styku baseline/8-week-rescan model: a 10-skill diagnostic battery (Day 0) sets a personalized focus, gated development through Weeks 1–8, then a mirrored rescan battery that auto-generates a before/after competency comparison table
```
All three (built 8/11/2026) reuse the base file's Brace Life editorial CSS design system but add real teeth beyond passive reading: scored multiple-choice knowledge-check gates (`data-correct` per option, self-checking JS, no backend) that lock the next section until a trainer hits a stated threshold, pulled directly from the science-layer thresholds above (ALST/VFA/BMI, RIR, asymmetry, LIFTMOR, pelvic floor language). Each ends in a live, lead-coach-observed practicum sign-off — self-certification is explicitly disallowed for that step in all three. Self-contained single-file HTML, no build script — open directly in a browser.

**Male-client scope-awareness addition (8/11/2026, retro follow-up).** All four HTML files above (the base plus A/B/C) now fold in a compact male-scope addition alongside their existing ALST/VFA/BMI clinical-thresholds content — not a new module, since a trainer needs to know *when to reach for* the Male Client Programming Framework, not relearn ICONS pedagogy for a male client. Covers: the male EWGSOP2 ALST At-Risk cutoff (<7.0 kg/m², a single binary threshold with no "Optimal" tier — genuinely different from the women's <5.5/5.5–6.99/≥7.0 three-tier band, not the same number applied more loosely), the Demographic Scope Rule (women's numeric thresholds never silently transfer to a male client), and the referral-not-diagnose posture on TRT/late-onset-hypogonadism questions (mirroring how HRT questions are already handled for women). Each of the three gated variants (A/B/C) got one added knowledge-check question testing this, in the existing `data-correct`/`answerQuiz()` format, in the gate closest to its existing ALST/clinical content (Module A's Week 3 Primary Certification gate, Module B's Zone 1 Isolated Precision Check, Module C's Weeks 1–4 Milestone Check) — the mirrored Day 0/Rescan competency battery in Module C was deliberately left untouched to avoid disturbing its skill-ID-driven before/after comparison-table logic. Gate question-count/threshold display text was recomputed and updated alongside each addition (e.g. Module A's Week 3 gate: 8→9 questions, pass floor 7/8→8/9) so the displayed fraction still matches the actual `pct >= threshold` pass math. The base (ungated) file got the same content as a plain section plus one added reflection question, no quiz, since it has no gating infrastructure at all. See `trainer_education/README.md` for the short index this prompted.

### Trainer Development Programs — physical `.docx` (trainers do the actual workouts), distinct from the HTML knowledge modules above
```
trainer_education/ICONS_Trainer_Development_Program.docx                          — base: client-uploaded "Train the Trainer" plan, 5-day 80/90/70/70/90%, Days 4-5 completed (source only specified them at the weekly-summary level)
scripts/icons_trainer_development_program.js                                       — build script; also the data source the 3 variants below require() and reuse
trainer_education/ICONS_Trainer_Development_Program_A_Intensity_Build.docx         — resequenced into the linear 60/70/80/90/AR week; adds a 60% technique day and an AR day (the base program had neither)
trainer_education/ICONS_Trainer_Development_Program_B_Three_Zone_Practicum.docx    — Isolated (new, zero compound lifts) → Compound ×2 (reused) → Metabolic (reused) → Integrated (new, all 3 zones in one session)
trainer_education/ICONS_Trainer_Development_Program_C_Baseline_to_Rescan.docx      — Day 0 runs the actual 11-exercise ICONS Baseline Testing Protocol on the trainer; Days 1-3 (reused) rewrite their primary lift's LOAD field as an explicit Week1→Week4 progression off the Day 0 numbers; Day 4 reruns the identical battery for a real before/after
```
"You cannot coach what you haven't felt" — trainers physically run the client-facing ICONS method on themselves, with a "Trainer Insight" sub-line under relevant exercises explaining the clinical/scientific rationale, so the debrief questions on every day page double as the exact debrief conversation they'll later have with a client. The uploaded base document was confirmed built with `icons_template.js` itself (day-header badge cell shading C9A227/FAF3E0 matches the engine's gold accent/stripe tints exactly), so all 4 documents are produced via `buildDocument()`, not hand-composed — no PDF conversion available to visually audit in this environment (LibreOffice headless conversion fails here on any input file), so verification is structural (python-docx paragraph/table counts + keyword presence) rather than a rendered-page check.

Two small, backward-compatible additions to `icons_template.js` were needed to reproduce the source faithfully and are now available to any future script:
- `exTable()` exercises: optional `insight` field — an italic gray sub-line under the exercise name ("Trainer Insight: ..."), distinct from the existing `flag` field (italic red, reserved for clinical flags).
- Block objects: `introLabel: null` (the literal value `null`, not omitted) renders a block's `intro` as a plain unlabeled paragraph instead of the default bold-label callout — for content that reads as continuous prose rather than a "Note: ..." callout.

Deliberate deviation from the uploaded source: its boxed "PROGRESSIVE OVERLOAD — HOW TO ADD WEIGHT" table (a bordered/shaded box with colored rows) was dropped in favor of the engine's standard `progressionBlock()` — CLAUDE.md's engine v3 notes already document that bordered/shaded box callouts were explicitly superseded when the engine was rebuilt against the Kelly Mulroy reference; the source's box was a regression back toward that retired style. The same RIR add/same/drop rule is preserved, just in the confirmed house format.

**Updated 8/12/2026 (Antagonist Rotation Rule retroactive audit):** these 4 documents were not covered by the earlier retroactive audit of the 15 client-facing training-plan documents in `clients/` — that pass only touched the client roster. Four real violations found and fixed, all via edits to `scripts/icons_trainer_development_program.js` (the base script all 3 variants `require()` and reuse days from), following the same swap-with-a-nearby-block technique used on the client roster:
- Day 1, Block C ("Primary Compound Pull"): Bent-Over Row → Single-Arm DB Row → Face Pull (3 consecutive horizontal-pull) — swapped Face Pull with Hanging Knee Tuck from Block D.
- Day 2, Block A ("Primary Hinge"): Hex Bar Deadlift → Romanian Deadlift → Single-Leg RDL (3 consecutive hip-hinge) — swapped Single-Leg RDL with Lateral Band Walk from Block B.
- Day 2, Block C ("Loaded Carry — ICONS Battery Movement"): Farmers Carry → Suitcase Carry → Farmer Carry Sprint (3 consecutive loaded-carry) — swapped Farmer Carry Sprint with Medicine Ball Slam from Block D. (Initially flagged as a possible exemption on the reasoning that the three carries vary in load/intent, the same way the grip/skill-progression exemption covers varying difficulty — an independent audit correctly rejected this: the rule's own movement-pattern taxonomy lists "loaded carry" as its own tracked category, and the grip/skill-progression exemption is scoped specifically to one movement tested across grip widths, not three different carry variants chosen for different training qualities. Corrected.)
- Day 3, Block B ("Bilateral Squat"): Back Squat → Goblet Squat → Leg Press (3 consecutive squat-pattern) — swapped Leg Press with Lying/Seated Hamstring Curl from Block C.

Two items were reviewed and correctly left alone: the pull-up grip-progression battery (close/standard/wide-grip) is the named exemption itself. Day 5's plyometric block (Depth Jump → Broad Jump → Lateral Bound) was confirmed exempt — bodyweight, full-recovery-between-sets power/velocity work, outside the rule's stated scope of "multi-joint, real-load exercises."

Cascade per document, since each variant reuses a different subset of the base's days (Variant A reuses Days 1/2/3; Variant B reuses only Days 1/2, not Day 3; Variant C reuses Days 1/2/3 with its own LOAD-field progression rewrites layered on top, confirmed non-colliding with the swaps): base has all 4 fixes, Variant A has all 4, Variant B has 3 of 4 (correctly missing the Day 3 fix), Variant C has all 4. Independently re-verified via `icons-doc-auditor` in two passes (the second specifically to check the Loaded Carry judgment call) plus a final direct diff-against-prior-version check — all 4 documents confirmed clean, no other violations anywhere in any document, no collateral changes beyond the intended swaps.

**Male-client scope-awareness — deliberately NOT added here (8/11/2026 retro follow-up).** Unlike the 4 HTML modules above, none of these 4 `.docx` documents were touched for male-client scope awareness. These are physical, self-administered workout programs a trainer runs on themselves, not knowledge-testing content — there's no natural home for a scope-awareness note inside an exercise table or a `progressionBlock()`, and grafting one on would be forced. Revisit only if a future need (e.g. a male-specific Train-the-Trainer variant) makes it a genuine fit rather than an awkward addition.

### Individual Trainer/Athlete Training Programs — real people, real tested baselines, distinct from the generic Format 2 program above

Built 8/12/2026 at Xolokan's direct request ("have a program built for all these trainers"), immediately after the `ICONS_Baseline_Sheets.docx` migration. Distinct from the Trainer Development Programs above in one key way: those are one hypothetical trainer running the client-facing method once as a training exercise; these are 5 real, named trainers/athletes (Becca, Brodie, Oscar, Jah, Nick) with real tested strength baselines from that same baseline-sheets document, each getting an actual individualized 3-day program built off their own numbers via `epley1RM()`/`workingLoad()`.

Full detail — per-athlete baseline anchoring, new-baseline introductions, and Nick's structurally-applied "advanced periodization" note — lives in `trainer_education/README.md`'s "Format 3" table rather than duplicated here. Key points:
- Uniform 3-day length across all 5 (Xolokan's explicit choice, not level-varied).
- No Styku/age/sex/clinical data on file for 4 of the 5 (Becca, Brodie, Oscar, Jah) — same demographic-scope discipline as Jake Poyner/Vinz Feller/Petra: `includeNutritionBlock: false`, no women's or male framework numbers applied, each of those 4 documents carries an explicit scope note stating this rather than silently omitting it. **Nick is the exception, updated 8/13/2026**: Xolokan supplied his first real Styku scan (Age 25, Male, ALST 8.01 kg/m² Not At-Risk, VFA 9.7 cm² Very Low Risk, Body Fat 17.2%, BMI 21.4, Shape Score 95/100). His document now applies the Male Client Programming Framework's "20-39 — Foundation" bracket (real ALST/VFA/BMI/body-fat interpretation, `maleNutritionNote()`-generated protein/creatine targets, `testosteroneNote()` correctly excluded under 40) and the standard Styku asymmetry protocol (left leg leads Split Stance — 1.3 lb LST gap meets the 0.5 lb trigger; arm asymmetry at 0.3 lbs stays below it and is noted but not applied). See `scripts/nick_3day_plan.js`'s header revision comment for the full breakdown — the training program itself (days/blocks/loads/Antagonist Rotation sequencing) is unchanged by this update except for two cue-line edits.
- Antagonist Rotation Rule applied at BUILD TIME, not retrofitted — the first content in this system built with the rule as a starting constraint rather than a later audit-and-fix pass.
- Independently audited via `icons-doc-auditor` in two batches: every Epley/working-load calculation re-derived by hand and confirmed, every Compound-zone block across all 15 day-pages checked for 3-consecutive-same-pattern violations (none found), Nick's claimed departure from the standard 60/70/80% framework confirmed as a genuine structural difference (not cosmetic) by direct comparison against Jah's document on the same template.

Output: `trainer_education/Becca_3Day_Training_Plan.docx`, `Brodie_3Day_Training_Plan.docx`, `Oscar_3Day_Training_Plan.docx`, `Jah_3Day_Training_Plan.docx`, `Nick_3Day_Training_Plan.docx`. Build scripts: `scripts/becca_3day_plan.js`, `scripts/brodie_3day_plan.js`, `scripts/oscar_3day_plan.js`, `scripts/jah_3day_plan.js`, `scripts/nick_3day_plan.js`.

### Subagent Team (`.claude/agents/*.md`)

Seven scoped subagents cover this system as of 8/13/2026 — one per structure built so far. Route a task to the one whose scope actually matches rather than doing everything in the main thread; each agent's own file has the operative detail, this is just the map:

| Agent | Owns | Does NOT own |
|---|---|---|
| `icons-expert` | Client-facing documents — training plans, assessment reports, PPTX decks, Styku interpretation, via `buildDocument()`/reportlab | Trainer education content, science-layer research, QA, Drive monitoring |
| `icons-research-analyst` | The Evidence-Based Science Layer in this file — periodic literature research, correcting/upgrading/adding claims, the Research Update Log | Writing or editing any client/trainer deliverable; the standalone deep-reference doc below |
| `icons-evidence-curator` | `docs/Evidence_Based_Science_Womens_Strength_Training.md` — the discursive, fully-cited deep-reference literature review behind the women's science layer (distinct from this file's compact actionable version) | This file's Evidence-Based Science Layer itself; any client/trainer deliverable |
| `icons-trainer-education` | Trainer onboarding — the self-paced HTML knowledge modules and the physical Train-the-Trainer `.docx` programs | Client-facing plans/reports; science-layer research |
| `icons-doc-auditor` | Pre-delivery structural QA on `.docx`/`.pptx`/`.pdf` output (python-docx/pdfplumber checks, since rendered PDF audits are broken in this environment) | Building or editing deliverables — reports findings back, doesn't fix them itself |
| `icons-intake-monitor` | Weekly read-only scan of the "ICONS CLIENT PROGRAMS" and "ICONS NOTES JASON PDFS" Drive folders — flags stale-document candidates and new SOAP-note data back to the main thread / `icons-expert` | Editing any document, uploading anything to Drive (the manual-handoff policy below still stands), resolving clinical conflicts itself |
| `icons-roster-analyst` | Roster-wide category study — groups every client/athlete by actual age x sex bracket and checks whether each category is getting the strongest-evidenced method per the Method Selection Principle above; flags improvement candidates and roster-level patterns back to the main thread / `icons-expert` | Editing any document; literature research itself (that's `icons-research-analyst`/`icons-evidence-curator`); single-document structural QA (that's `icons-doc-auditor`) |

**Standing practice — client roster completeness ("stay at standard across the board," added 8/13/2026 at Xolokan's direct request).** Triggered by Nancy Avitable's document being found with no `baselines[]` table and vague load placeholders throughout, despite real strength-testing data existing for her — a gap present since her first build, invisible to any diff-against-prior-version check since there was no earlier complete version to diff against. Two standing responses now cover this, not just the one-time fix:
- **Build time** (`icons-expert`): read a client's full existing record (CLIENTS.md entry + current build script) before any build or revision — see that agent's file for the full rule.
- **Audit time** (`icons-doc-auditor`): the "Missing-standard-section check" in that agent's standing checklist — compare a client's document against its own CLIENTS.md entry and against a comparable sibling's document, not just against its own prior version.
- **Ongoing cadence**: the daily subagent check-in (see Research Update Log/trigger config) now rotates `icons-doc-auditor` through 2-3 not-recently-reviewed client documents each day as a spot-check, so a gap gets caught within days rather than sitting for weeks. A full 15-document sweep ran once (8/13/2026, all clean beyond the fixes already made) and doesn't need repeating in full — the rotating spot-check is the ongoing mechanism, not another full sweep.

---

## DOCUMENT STRUCTURE — PER DAY PAGE

Every training day follows this exact sequence:

```
1. Day header banner        (intensity badge + title + subtitle + descriptor)
2. Intensity paragraph      (why this % day, load context)
3. Protein/nutrition bar    (on every page — ALST reminder for At-Risk clients)
4. Warm-Up callout          (gold — specific, named, sequenced)
5. Block A: Corrective/Primer
   - Section label (accent color)
   - Intro paragraph (why, load targets)
   - Exercise table
6. Block B: Primary Strength
   - Section label
   - Load target callout
   - Exercise table
7. Block C: Accessory
   - Section table
8. [Block D if needed: push-up protocol / special]
9. Cool-down callout        (blue)
10. ICONS Note callout      (gold — coaching memo)
```

---

## ICONS INTENSITY FRAMEWORK

| Day | % | Color | Philosophy |
|-----|---|-------|-----------|
| 60% | Teal | Technique day — form > load. No PRs. |
| 70% | Green | Moderate — building baseline volume without peak fatigue |
| 80% | Gold | Primary strength day — last 1-2 reps hard but achievable |
| 90% | Red | Peak intensity — near-maximal. Rest fully between sets. |
| AR  | Blue | Active recovery — no PRs, no AMRAP, feel better leaving |
| Off | Gray | Rest day — week overview only, no training day page |

---

## 1RM CALCULATION

When new PR data is given, calculate working loads before building the plan. Exported from `icons_template.js` as `epley1RM(weight, reps)` and `workingLoad(oneRM, pct, roundTo=5)`.

```javascript
// Epley formula
function epley1RM(weight, reps) {
  return Math.round(weight * (1 + reps / 30));
}

function workingLoad(oneRM, pct, roundTo = 5) {
  return Math.round((oneRM * pct) / roundTo) * roundTo;
}

// Week 1 working load = 80% 1RM
// Week 4 peak test = 92–95% 1RM
// Always round to nearest 5 lbs
```

---

## ICONS BASELINE TESTING PROTOCOL

11 exercises tested in this order:
1. Deadlift (Hex Bar or BB)
2. Back Squat
3. Seated Overhead Press
4. Incline Dumbbell Press
5. Push-Ups (Full or Half)
6. Dumbbell Farmers Carry
7. Hip Thrust
8. Single-Leg Romanian Deadlift
9. Lunges (DB or BB)
10. Plank Hold (seconds)
11. Pull-Ups (bonus)

Rep target: 5–8 reps throughout (except plank = max hold, push-up = max reps)

---

### ICONS Index Full-Spectrum Progression Standard — Women 40–55

Directive from Xolokan, 8/12/2026 ("the programs should improve all 10 icons index numbers, for only the clients that are woman between 40-45 [corrected same day to 40-55]... the icons index applies to all clients just research data for males & females outside that age bracket").

**"The 10 ICONS Index numbers"** = the 10 core ICONS Baseline Testing Protocol exercises above, excluding Pull-Ups (explicitly marked "(bonus)" and not part of the core battery): Deadlift, Back Squat, Seated Overhead Press, Incline Dumbbell Press, Push-Ups, Dumbbell Farmers Carry, Hip Thrust, Single-Leg RDL, Lunges, Plank Hold.

**The rule, for any client who is a woman aged 40–55** (spanning the back half of the 35–45 bracket and the whole 45–55 bracket above — her exact age determines which bracket's protein/creatine/pelvic-floor thresholds apply, but this standard applies uniformly across the full 40–55 span regardless of which bracket she falls in): across the arc of her delivered program — not necessarily touched every single day, but visibly present somewhere in `baselines[]`, a day's `exercises[]`, and/or the `summary`/`weeklySummary`/`milestoneTracker` progression targets — all 10 of the exercises above should carry a programmed line of progression. Not every one of the 10 needs its own dedicated exercise slot on every day; a hex-bar deadlift, a goblet-squat regression, or an incline push-up are all legitimate programmatic substitutes for the literal named lift when appropriate to the client's level — the point is that the movement-pattern territory of all 10 gets programmed and tracked, not that a document silently goes 8-for-10 and leaves two patterns untouched for the life of the program.

**"Not Tested" is not an exemption.** If a client's intake baseline shows one of the 10 as "Not Tested" (e.g. Johnna Macarthur's Deadlift and Squat), the program should be establishing a first working baseline for that lift, not skipping it because no historical number exists yet to progress from.

**Demographic scope — this is a build-time requirement for women 40–55 specifically, not a universal hard rule (yet).** The broader ICONS three-zone system and its philosophy (see "ICONS TRAINING PHILOSOPHY") apply to every client regardless of age or sex, exactly as they always have — nothing about this standard narrows that. What's scoped to 40–55 is the specific "all 10 numbers must show programmed progression" requirement itself, per the Demographic Scope Rule already established in the Age Bracket Programming Framework: this exact mandate hasn't been researched or validated for women outside 40–55 or for male clients of any age, so it should not be silently extended to those clients by default. Per the same standing-trigger pattern already used to build the Male Client Programming Framework, the next time a client from one of those populations is onboarded, research and formalize a population-appropriate version of this standard (or an explicit finding that it doesn't apply / needs different numbers) rather than leaving a silent gap — this is `icons-research-analyst`'s or `icons-evidence-curator`'s scope, not `icons-expert`'s.

**Retroactive audit status:** not yet run. Per the same two-step pattern used for the Antagonist Rotation Rule (rule drafted first, retroactive audit only after explicit authorization), do not sweep existing 40–55-bracket client documents against this standard without Xolokan's explicit go-ahead.

---

## BRAND STANDARDS

```
Studio name     : Brace Life Studios
Website         : bracelifestudios.com
Tagline         : "It's not about working out. It's about working in.™"
                  (brand tagline for marketing/PPTX use — NOT printed on the
                   compact training-plan cover; confirmed absent from the
                   Kelly Mulroy reference document)
Brand styling   : B R A C E   L I F E   S T U D I O S (spaced caps in gold) —
                  used in the running HEADER on every page, not the cover
Confidentiality : "CONFIDENTIAL CLIENT REPORT" on assessment docs
                  "Confidential" in the running footer on every document
```

### Typography (docx — pt sizes, confirmed from reference; `docx` npm `size` = pt × 2)
```
Cover title            : 26pt bold gold (#C9A227), centered
Cover subtitle          : 11pt regular dark, centered, uppercase
Cover divider           : 10pt em-dash line, color #F5E8C0, centered
Client name             : 20pt bold #2C2C2C, centered
Stats line              : 8.5pt italic #6B6B6B, centered, "·"-joined
Running header (brand)  : 9pt bold gold, letter-spacing 100
Running header (right)  : 6.5pt regular #6B6B6B, letter-spacing 10, right-aligned
Running footer          : 8pt regular #6B6B6B both sides
Week-strip day/pct      : 8.5pt bold / 11pt bold, day accent color
Week-strip focus        : 6pt regular #2C2C2C
Section title           : 8.5pt bold gold, bottom border single gold 0.5pt
Day-header badge %      : 18pt bold white; "INTENSITY" sub-label 6.5pt bold white
Day-header title        : 13pt bold day accent
Day-header subtitle     : 9.5pt bold #2C2C2C
Day-header descriptor   : 7pt bold day accent, uppercase
Block label ("A — ...") : 8.5pt bold, block color
Labeled-paragraph body  : 8.5pt regular #2C2C2C (label run bold, same size, block/callout color)
Exercise name            : 9pt bold #2C2C2C
Exercise numeric cols    : 7.5pt regular #6B6B6B
Exercise coaching cue    : 8.5pt regular #6B6B6B
Exercise table header    : EXERCISE/CUE 7.5pt bold, others 6.5pt bold, colored on pale tint
Baselines/summary header : 7pt bold #B8860B (goldDeep) on #F5E8C0
Baselines body           : lift name 8.5pt bold dark, other cols 8pt #6B6B6B
Closing brand line       : 9pt bold gold, centered
Closing confidentiality  : 8pt italic #6B6B6B, centered
```

---

## STYKU SCAN INTERPRETATION — COMPLETE WORKFLOW

When a client provides a Styku scan, do the following IN ORDER:

```
1. Extract all values:
   - Body Fat %, Fat Mass, Lean Mass, Bone Mass
   - BMR, BMI, Shape Score, VFA
   - ALST Index (use Styku's number — not calculated)
   - Left/Right Arm LST, Left/Right Leg LST
   - All circumference measurements (inches)

2. Flag immediately:
   - ALST < 5.5 → AT-RISK → protein/creatine escalation + every-session nutrition bar
   - BMI < 18.5 → clinical underweight flag (even if body fat % says "FIT")
   - VFA ≥ 100 cm² → cardiometabolic risk flag
   - Any L/R asymmetry ≥ 0.5 lbs → asymmetry protocol

3. Determine weaker sides:
   - Lower arm LST = weaker arm → leads all single-arm rows
   - Lower leg LST = weaker leg → leads all unilateral leg work
   - Suitcase carry: weaker arm HOLDS the weight

4. Set protein targets from weight + age + ALST status

5. Include stykuBlock() on report cover page

6. Include nutritionBlock() with calculated targets

7. Set 8-week rescan tracking metrics:
   - ALST index change
   - L/R gap reduction in arms and legs
   - Body fat % and lean mass change
   - Key lift progressions
```

---

## PDF LAYOUT ENGINE — TRAINING PLAN REFERENCE

### Column Widths for PDF Exercise Table
```python
_CW = [165, 30, 42, 80, 52, 40]
# EXERCISE | SETS | REPS | LOAD | TEMPO | REST
# CUE column gets the remaining width (~127pt)
```

### Cue Text Rule
**Maximum ~50 characters per cue.** This keeps rows at 30pt height (1 line).
If a cue wraps to 2 lines the row becomes 56pt — pages overflow.

✓ "3-sec eccentric. Lock hips and knees at top."
✗ "3-second controlled eccentric. Lock hips and knees simultaneously at the top. Push the floor away."

### Row Height Math
```
1-line cue: 1×10 + 10 = 20pt min → max(20, 24) = 24pt
2-line cue: 2×10 + 10 = 30pt → max(30, 24) = 30pt ← DANGER ZONE
With flag:  max(rh, flag_lines×9+20+6)
```

### Available Height Per Page
```
664pt (PH=792, header=64+10, footer=36+18)
Average content per training day: ~856pt → ALWAYS splits across 2 pages
```

---

## NEW CLIENT ONBOARDING — DOCUMENT CHECKLIST

**Mandatory research-coverage check (added 8/17/2026, at Xolokan's direct request — "client intake should auto-pull recent research on a client's condition").** Before building any new client's first document, or before a materially new condition/demographic surfaces for an existing client (a new clinical flag, a new age-bracket crossing, a first Styku scan revealing something new), check every clinical flag/condition/demographic on her intake — age bracket, sex, ALST/VFA/BMI status, any named condition (cardiac, OA, breast cancer/lymphedema, postpartum/DRA, GLP-1 use, etc.) — against CLAUDE.md's Evidence-Based Science Layer / Male Client Programming Framework. If a condition has no dedicated section yet, or the existing section is old enough to warrant a re-check against current literature, request a targeted `icons-research-analyst` pass on it BEFORE finalizing the document — do not proceed with zero or stale clinical grounding just because nothing flagged it yet. This is the same WebSearch-driven research pipeline that already built the Male Client Framework, Postpartum/DRA, Cardiac, OA, and Breast Cancer sections; it needs no new tooling, API, or key — only a guaranteed trigger at intake instead of an occasional one. See `.claude/agents/icons-expert.md` for the corresponding standing rule.

When a new client joins, build IN THIS ORDER:

```
□ 1. ICONS Performance Assessment Report (.docx via icons_template.js)
      - Styku scan block (stykuBlock)
      - Strength baselines table
      - Baseline narrative callouts (push-up protocol, pull-up protocol, scan notes, corrective priorities)
      - Evidence-based nutrition block (nutritionBlock)
      - Trainer observations (obs_card × 6–7)
      - Next steps (step_card × 4)

□ 2. Training Plan PDF (reportlab)
      - Match day split to their schedule
      - Apply intensity % framework
      - Embed Styku asymmetry throughout (flags on every unilateral exercise)
      - Include protein_bar on every page for ALST At-Risk clients
      - Pelvic floor note on heavy carry and hip thrust days if postmenopausal
      - RIR language on all work sets

□ 3. Verify: pdfplumber audit — zero overflow on all pages

□ 4. Baseline Testing Protocol (if not yet assessed) — reference ICONS_Baseline_Testing_Protocol.pdf
```

---

## COMMON MISTAKES — DO NOT DO THESE

```
✗ Setting arm asymmetry weaker-side wrong
  → Lower LST = weaker. Right arm 6.2 < Left arm 7.0 → RIGHT is weaker → RIGHT leads rows.

✗ Writing cues > 50 chars in PDF tables
  → Results in 2-line rows → page overflow

✗ Packing too many callout blocks on a single page
  → Every callout block is 50–60pt. 3 callouts = 150–180pt of a 664pt page.

✗ Using "explosive" or "fast" to describe lateral lunge / lateral deadlift
  → These are CONTROLLED strength movements. Correction came from client feedback.

✗ Calling chest-supported row on Day 3A PDF
  → Was removed due to overflow. Keep Day 3A to: bent-over row + single-arm row only.

✗ Using absolute %RM language ("80% effort")
  → Replace with RIR: "1–2 RIR on last set"

✗ Putting protein reminder only on the report, not in the training plan
  → ALST At-Risk clients need protein_bar on EVERY training page.
     Engine-enforced: buildDocument() auto-inserts proteinBar(client) on every
     day when client.alstIndex < 5.5 — do not call it manually per day.

✗ Assuming the Styku-calculated body composition is the same as clinical DXA
  → Styku 3D scanning is reliable for circumferences and trend tracking.
     ALST value: use Styku's reported number. Body fat %: directionally correct.

✗ Phase-based menstrual cycle programming
  → Not supported by highest-quality evidence (Phillips lab umbrella review 2023).
     Use symptom-based autoregulation instead.

✗ Recommending training to failure as superior
  → ACSM 2026: failure training does NOT consistently outperform RIR-based loading.

✗ Missing the pelvic floor note on heavy carry / hip thrust / deadlift / squat
  days for postmenopausal clients
  → Engine-enforced: buildDocument() auto-inserts pelvicFloorCallout() whenever
     client.isPostmenopausal is true and the day contains a matching exercise.
     Set day.pelvicFloor: false only if it's genuinely not applicable.

✗ Stacking three same-muscle-group compound exercises in a row in one block
  → See "Compound Block Sequencing — Antagonist Rotation Rule" above. Squat →
     RDL → Split Squat all hammer the same hip-hinge/quad chain three times
     running; swap the third for a push/pull instead (Squat → RDL → Row). Two
     in a row (primary lift + its accessory) is fine — it's the third stacked
     on top that's the mistake.

✗ Leaving one of the 10 core Baseline Testing Protocol lifts silently
  unprogrammed for a 40–55 client's whole program
  → See "ICONS Index Full-Spectrum Progression Standard — Women 40–55" above.
     A woman 40–55 whose program never touches, say, Overhead Press or
     Single-Leg RDL anywhere in baselines[]/exercises[]/summary isn't just
     incomplete — it's the specific defect this standard exists to catch.
     A reasonable programmatic substitute (hex-bar DL for BB DL, goblet squat
     for back squat) is fine; total silence on a pattern for the program's
     whole arc is not. Scoped to women 40–55 only — do not apply this as a
     hard requirement outside that bracket without a dedicated research pass.
```

---

## VALIDATION CHECKLIST (run before every delivery)

### PDF
```python
import pdfplumber
with pdfplumber.open(path) as pdf:
    for i, page in enumerate(pdf.pages):
        overflow = [ch for ch in page.chars if ch['y0'] < 0]
        assert not overflow, f"P{i+1} overflow"
    print(f"✓ {len(pdf.pages)} pages clean")
```

### DOCX
```bash
cd /mnt/skills/public/docx && python scripts/office/soffice.py --headless --convert-to pdf [file] --outdir /home/claude/
# Then render: pdftoppm -jpeg -r 150 [pdf] /home/claude/preview
# Visual check at least pages 1, 2, and last
```

---

## QUICK REFERENCE — SCIENCE THRESHOLDS

For age-specific programming emphasis (protein tier, creatine indication, bone loading candidacy, etc.), see "Age Bracket Programming Framework" under Evidence-Based Science Layer above — the thresholds below are the underlying numbers that framework references.

| Metric | At-Risk | Normal | Optimal |
|--------|---------|--------|---------|
| ALST (kg/m²) | < 5.5 | 5.5–6.99 | ≥ 7.0 |
| VFA (cm²) | ≥ 100 | 70–99 | < 70 |
| BMI | < 18.5 or ≥ 30 | 18.5–24.9 | 20–23 |
| Protein (g/kg/day) | < 1.6 | 1.6–1.8 | 2.0–2.2 (50+) |
| Weekly sets/muscle | < 6 | 6–9 | ≥ 10 |
| Bone load (%1RM) | < 70% | 70–79% | ≥ 80% |

---

## RESEARCH UPDATE LOG

Standing practice (started 8/11/2026, at Xolokan's request): periodically re-research the Evidence-Based Science Layer against current literature, across every age bracket the roster has actually served (25–64 so far) and any bracket a future client might fall into, and fold verified findings back into this file — corrections as well as additions. Each entry below is one pass: what was checked, what changed, what was corroborated as-is (not touched), and sources. Do not add an entry for using the science layer to build a client doc — only for a pass that changed or verified the reference material itself.

**Coverage Index (added 8/17/2026)** — a quick-scan reference so a pass can pick a genuinely under-served topic/bracket without re-reading all twelve prior entries below. Update this table's "Last Verified" column whenever a pass touches that topic; do not rewrite the dated log entries themselves. This exists specifically to counter "always re-researching the roster's most common bracket" — see `icons-research-analyst.md`'s "Coverage discipline" section.

| Topic / Section | Last Verified | Population Scope | Roster Representation |
|---|---|---|---|
| Postmenopausal RT/BMD, ACSM RIR model, protein/sarcopenia, ACL/knee-valgus, fall-risk power | 8/11/2026 | Women, all brackets | Well-represented |
| HRT/MHT, GLP-1, sleep & recovery, 35-45 onset | 8/11/2026 | Women 35-45+ | Well-represented |
| Male Client Programming Framework | 8/11/2026 | Men, all brackets | Thin (20-39, 40-59 only — 60+ has zero roster clients as of 8/17/2026) |
| Perimenopausal status screening ambiguity | 8/11/2026 | Women 35-55 | Well-represented |
| Cardiovascular/cardiac considerations | 8/12/2026 | All, both sexes | Thin (1 client roster-wide) |
| Rep-range/RIR vs. fixed 8-12 | 8/13/2026 | All | Well-represented |
| Protein-tier trigger logic (age-50 OR-gate) | 8/13/2026 | Women 45-55 | Well-represented |
| PNF / Niko Heers staff naming | 8/13/2026 | All (staff-capability, not clinical) | 2 clients (Moe Shahheidari, and others per fit) |
| Postpartum & DRA | 8/14/2026 | Women, any bracket | **Zero roster clients — proactive only** |
| Vitamin D & Calcium (bone cofactor) | 8/15/2026 | Women 55+ | Well-represented (referral-only content) |
| Osteoarthritis (knee/hip) | 8/16/2026 | All, both sexes | **Zero roster clients — proactive only** |
| Breast cancer survivorship / lymphedema | 8/17/2026 | Women, any bracket | **Zero roster clients — proactive only** |
| Women 65+ bracket (as a whole) | never dedicated | Women 65+ | **Zero roster clients** — Elizabeth Poyner (64) is closest |
| Male 60+ bracket (as a whole) | never dedicated | Men 60+ | **Zero roster clients** |

**8/11/2026 — first pass.** Checked: postmenopausal resistance training/BMD, creatine (cognition + bone), protein/sarcopenia, perimenopause RT, the ACSM 2026 RIR citation itself, 20s/30s bone mass, ACL/neuromuscular training, fall-risk/power training 65+.
- **Corrected:** Creatine's bone-density benefit was stated flatly ("bone (Hall et al. 2025)") — actual evidence is mixed, including a 2-year RCT in older women showing no BMD improvement over placebo. Softened to reflect the real uncertainty; cognition/strength/sleep claims stayed as-is since those are well-supported.
- **Upgraded:** the 65+ bracket's fall-risk/functional-transfer bullet previously carried an explicit "not evidence-backed" caveat because no citation existed yet. A 2025 Mayo Clinic Proceedings study (~4,000 adults, 10+ yr follow-up) now gives that real evidentiary backing via power (not just strength) training — new "Power Training — Fall Risk & Longevity" subsection added, caveat removed, and the guidance extended down into the 55–65 bracket since power decline starts before 65.
- **Added:** RED-S/energy-availability caution to the 20–35 bracket (young athletic clients can look "fine" on BMI/body-fat and still be under-fueled); compliance-over-complexity finding to the ACL/knee-valgus section (adherence predicts outcome better than corrective-circuit complexity); LIFTMOR corroboration detail (2025 meta-analysis, 17 RCTs) confirming combined aerobic+resistance training as the strongest single modality for lumbar BMD specifically.
- **Corroborated, unchanged:** ACSM 2026's RIR-over-failure recommendation is a real, substantial citation (first resistance-training guideline update in 17 years, 137 systematic reviews, 30,000+ participants) — strengthened the citation's framing in-place rather than changing the guidance itself. Protein tiers already in this file (2.0–2.2 g/kg for 50+/At-Risk) sit at or above current academic RNI estimates for sarcopenic older adults, which is appropriate for an actively-training population and needed no change.
- **Process change:** added the "Demographic scope rule" to the Age Bracket Programming Framework's intro, formalizing (not just doing ad hoc) the judgment call already used once for Jake Poyner — any future client outside the women's target population gets the same explicit scope note, not a silent default either way.
- Sources: [Optimal RT parameters for BMD in postmenopausal women, 2025 meta-analysis](https://link.springer.com/article/10.1186/s13018-025-05890-1) · [Creatine and Cognition in Aging systematic review, 2025](https://academic.oup.com/nutritionreviews/advance-article/doi/10.1093/nutrit/nuaf135/8253584) · [Creatine monohydrate for older adults and clinical populations, 2025](https://www.tandfonline.com/doi/full/10.1080/15502783.2025.2534130) · [2-yr creatine/BMD RCT in older women](https://pubmed.ncbi.nlm.nih.gov/31257405/) · [WHEN position statement — resistance training & menopause](https://when.org.au/education/resistance-training-menopause/) · [ACSM 2026 resistance training guidelines summary](https://acsm.org/resistance-training-guidelines-update-2026/) · [Neuromuscular training for ACL injury prevention, female athletes, 2025 meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC12581765/) · [Muscle Power Versus Strength as a Predictor of Mortality in Middle-Aged and Older Men and Women, Araújo/Kunutsor et al., Mayo Clinic Proceedings 2025;100(8):1319-1331 — primary source, corrected 8/11/2026 fourth pass from a secondhand blog citation](https://www.mayoclinicproceedings.org/article/S0025-6196(25)00100-4/abstract) · [Fall risk & strength training, women 75–105 (WHISH cohort)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12363929/) · [Peak bone mass in 20s/30s](https://www.screenmybones.com/blog/building-peak-bone-mass)

**8/11/2026 — second pass, same day.** Checked: HRT/MHT vs. resistance training for bone, GLP-1/anti-obesity medications, sleep & recovery evidence, 35-45 bracket perimenopause-onset timing.
- **Added (new, real gap):** a "GLP-1 / Anti-Obesity Medications" section — nothing in this file previously addressed these medications at all, despite them being increasingly common in this exact client population. Key finding: ~40% of GLP-1 weight loss is lean mass, women/older adults lose muscle at a higher rate, and structured resistance training 3-5x/week preserves 2-3x more lean mass than medication alone. Flagged as a standing ALST-preservation priority regardless of a client's current ALST number, and added a cross-reference from the 35-45 bracket. This is arguably the single most practically relevant addition from either research pass today — worth asking every new client about at intake, not just clients who volunteer it.
- **Added:** an "MHT/HRT" section — resistance training alone is comparably or more effective than HRT alone for spine BMD in early postmenopausal women, with no added spine-BMD benefit from combining them. Framed carefully as a training-evidence talking point, explicitly not medical advice either direction.
- **Added:** a "Sleep & Recovery" section — properly dosed RT measurably improves sleep quality in both young and older women, independent of baseline. Useful reframe for a client who says she's "too tired to train."
- **Corroborated:** 35-45 bracket's existing "watch for early perimenopausal signals" guidance — symptoms can genuinely start in the early-to-mid 30s, well before the ~45 average, which sharpens (doesn't just restate) the existing bullet.
- Sources: [Menopause hormone therapy + exercise scoping review, 2025](https://www.frontiersin.org/journals/reproductive-health/articles/10.3389/frph.2025.1542746/full) · [HRT vs. exercise bone health systematic review](https://www.cureus.com/articles/426988-comparative-effects-of-hormone-replacement-therapy-and-exercise-on-bone-health-in-postmenopausal-women-a-systematic-review) · [SEMALEAN study — semaglutide body composition, 2025](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12673431/) · [GLP-1 receptor agonists in older women — lean mass preservation review](https://www.mdpi.com/2072-6643/18/4/632) · [Resistance training + sleep quality, older women RCT, 2025](https://www.sciencedirect.com/science/article/abs/pii/S1469029225001670) · [Short-term RT + sleep quality, young women, 2025](https://pubmed.ncbi.nlm.nih.gov/40156675/) · [Untreated perimenopause in younger women](https://www.healthline.com/health-news/untreated-perimenopause-symptoms-young-women)

**8/11/2026 — third pass, same day. Male Client Programming Framework (new section, first pass on this population).** Checked: EWGSOP2 male ALST/ASM cutoff, ISSN protein/creatine position stands for men, late-onset hypogonadism (LOH)/andropause and resistance training vs. TRT, male VFA/BMI/body-fat thresholds, bone-density loading evidence in men, and whether a LIFTMOR-equivalent or the existing power-training citation transfers to men. Triggered by Xolokan flagging that Jake Poyner's and Vinz Feller's documents both correctly scoped OUT the women's thresholds but never scoped anything IN — leaving male clients with uninterpreted raw Styku numbers.
- **Added (new top-level section):** "MALE CLIENT PROGRAMMING FRAMEWORK," positioned directly after the Evidence-Based Science Layer. Confirmed EWGSOP2's male ASM/height² cutoff is <7.0 kg/m² (vs. <5.5 kg/m² for women, same source already cited in this file) — this confirms Vinz Feller's Styku-reported 7.55 kg/m² "Not At-Risk" label is standard, not Styku-specific. Added men's protein (1.6-2.2 g/kg/day, ISSN 2017 + the same Morton 2018 meta-analysis already cited for women, whose trial pool was not sex-restricted), creatine (identical 3-5g/day dosing, no sex-specific adjustment needed), a full "Testosterone & Resistance Training" subsection (the male analog to the women's HRT section — exercise training outperformed TRT alone for fitness/strength/fat mass and matched it for lean mass in men 50-70 with low-normal T, per a 2024 Sports Medicine - Open RCT-comparison study), VFA (existing women's table transfers to men unchanged — the ~100 cm² threshold was validated "irrespective of gender" in the source population studies), BMI (WHO thresholds are not sex-specific and transfer unchanged, with an added ACE body-fat-% reference table since the numbers genuinely differ by sex and Styku's peer-comparison labels don't indicate absolute healthiness), and bone loading in men (a 2024 systematic review confirms resistance/impact training maintains or improves BMD in men with low bone mass, though no male-specific LIFTMOR-protocol replication was found).
- **Flagged as genuine gaps, not filled with invented numbers:** no three-tier ALST subdivision (optimal/normal/at-risk) exists for men in the literature reviewed — only EWGSOP2's single binary cutoff; no dedicated male-specific creatine+BMD RCT exists (the women's "mixed evidence" bone caveat does not transfer either direction, it's simply unverified for men); no male-specific RCT replicating LIFTMOR's exact ≥80-85% 1RM/5×5/2×week protocol was found, only general high-intensity-RT-benefits-male-bone evidence at varying intensities/durations; the age-linked testosterone decline widely cited (~1-2%/year from 30) is contradicted in its population-level shape by at least one normative-modeling study showing increasing variance rather than clean decline after 40 — presented as unsettled, not corrected to a single number.
- **Corroborated/reused:** confirmed the Mayo Clinic Proceedings 2025 power-training/mortality study already cited in the women's Power Training section was in fact a mixed-sex cohort in which men were the majority (67.8%) and the finding held for men directly (HR 5.88 men vs. 6.90 women) — cited directly for the male framework's 60+ bracket rather than by analogy. Did not edit the women's section's existing framing of that same study, per this pass's scope (women's content stays untouched) — flagging back to the main thread that a future pass could sharpen the women's-section citation to note the study's actual mixed-sex, majority-male composition, since it currently reads as a women's-only study.
- **Process change:** updated the "Demographic scope rule" paragraph (Age Bracket Programming Framework intro) to point to this new section as the actual resource for a male client, instead of only saying the women's thresholds "weren't applied." Added a standing trigger note at the top of the new section: any future client outside both frameworks (different sex/gender scope, or an age population neither covers) should get the same treatment — a real framework built during onboarding, not a scope note with nothing behind it.
- Did NOT touch `clients/jake_poyner/`, `clients/vinz_feller/`, or their build scripts — flagging back to the main thread (see final report) that both documents likely warrant a follow-up pass now that real male thresholds exist, but that decision and the edit itself belong to `icons-expert`, not this agent.
- Sources: [EWGSOP2 sarcopenia cutoffs, ASM/height² men <7.0 / women <5.5 kg/m²](https://onlinelibrary.wiley.com/doi/10.1002/jcsm.13160) · [ISSN Position Stand: protein and exercise, Jäger et al. 2017](https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8) · [Morton et al. 2018 meta-analysis/meta-regression, protein supplementation and RT-induced gains](https://pubmed.ncbi.nlm.nih.gov/28698222/) · [ISSN Position Stand: creatine supplementation, Kreider et al. 2017](https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0173-z) · [Creatine monohydrate for older adults and clinical populations, 2025 (reused from earlier pass, not sex-restricted)](https://www.tandfonline.com/doi/full/10.1080/15502783.2025.2534130) · [Comparing the Impacts of Testosterone and Exercise on Lean Body Mass, Strength and Aerobic Fitness in Aging Men, Hildreth et al., Sports Medicine - Open 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10987448/) · [Testosterone and resistance training in frail older men, 1-yr RCT follow-up, 2024](https://www.tandfonline.com/doi/full/10.1080/13685538.2024.2403519) · [A Validated Age-Related Normative Model for Male Total Testosterone Shows Increasing Variance but No Decline after Age 40](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4190174/) · [VACATION-J study — VFA 100 cm² threshold irrespective of gender](https://pubmed.ncbi.nlm.nih.gov/20964583/) · [Revising BMI Cut-Off Points for Overweight/Obesity in Male Athletes, 2025](https://www.mdpi.com/2072-6643/17/5/908) · [ACE body fat percentage categories](https://www.acefitness.org/about-ace/press-room/in-the-news/8602/body-fat-percentage-charting-averages-in-men-and-women-very-well-health/) · [Exercise and Musculoskeletal Health in Men With Low Bone Mineral Density: A Systematic Review, 2024](https://www.archives-rrct.org/article/S2590-1095(23)00080-0/fulltext) · [Osteoporosis in men — T-score reference database and diagnostic criteria](https://pubmed.ncbi.nlm.nih.gov/12464708/) · [Muscle Power Versus Strength as a Predictor of Mortality in Middle-Aged and Older Men and Women, Mayo Clinic Proceedings 2025](https://www.mayoclinicproceedings.org/article/S0025-6196(25)00100-4/abstract)

**8/11/2026 — fourth pass, same day. Citation-integrity fix + 45-55 bracket perimenopause-diagnosis-ambiguity deep dive.** Triggered by the first subagent team retro: (1) the women's Power Training section cited its Mayo Clinic Proceedings study only secondhand via a fitness-blog summary, while the Male Client Programming Framework (third pass) had already sourced the same study's actual primary-source data directly; (2) the 45-55 bracket was flagged as the highest-priority next topic because two live clients — one at the 45 bracket boundary, one at 48 — currently have unconfirmed menopausal status on file.
- **Corrected (citation integrity, no substance change):** the women's "Power Training — Fall Risk & Longevity" section previously cited "Mayo Clinic Proceedings 2025 (~4,000 adults...)" with the only real URL living in a fabulous50s.com blog-summary link in the first pass's Sources line. Replaced with the direct primary citation — Araújo CG, Kunutsor SK, et al., Mayo Clinic Proceedings 2025;100(8):1319-1331, CLINIMEX Exercise cohort, n=3,889 — and swapped the "~7x higher mortality risk" approximation for the actual hazard ratios (6.90 women / 5.88 men for power, vs. 1.71 women / 1.62 men for strength alone), matching the rigor the male framework already achieved for the same study. Also retroactively corrected the broken secondhand link in the **first-pass (8/11/2026) log entry's own Sources line** — a deliberate, disclosed exception to this log's normal append-only convention, made because leaving a demonstrably weak citation sitting uncorrected in the historical record while claiming to have "upgraded" it elsewhere would undercut the citation-integrity goal this fix exists for. The claim's substance (power predicts mortality more strongly than strength in older women) is unchanged — only the citation quality changed.
- **Added (new subsection):** "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context," placed between the Hormone Therapy (MHT/HRT) and GLP-1 sections, with cross-references added from both the 35-45 and 45-55 bracket bullets. Covers two questions: (a) what's reasonable for a trainer to ask at intake without overstepping into diagnosis — confirmed that STRAW+10, the clinical gold-standard staging system, is itself built on the same self-reported menstrual/vasomotor/sleep/mood data a trainer could reasonably ask about; staging those answers into a diagnosis is the actual line, not asking about them; (b) whether ambiguous status changes the training prescription itself.
- **Corroborated (explicit finding, not padding):** for question (b), a 2025 University of Exeter RCT (n=70 pre-/peri-/postmenopausal women, 12-week supervised resistance program, Medicine & Science in Sports & Exercise 2025;57(3):501-513) found strength/balance training adaptations occurred irrespective of menopausal status. **This confirms the existing "autoregulate on individual symptoms, not calendar" guidance in the 35-45/45-55 brackets already covers this adequately — no change to the underlying training philosophy was made.** Stating this plainly per instructions rather than inventing a new protocol layer where the honest finding is "the existing guidance holds up."
- **Added (genuine refinement, not just restated):** one concrete exception where ambiguity DOES change a default. A British prospective cohort study (Mishra, Cardozo & Kuh, BJU International 2010, n=1,211, ages 48-54) found perimenopausal women — not just postmenopausal women — had significantly elevated stress urinary incontinence risk (OR 1.39) relative to the same cohort's postmenopausal members; the transition window itself, not confirmed postmenopausal status, is the higher-risk period for this specific outcome. Practical consequence flagged for `icons_template.js`'s `client.isPostmenopausal` boolean (which gates `pelvicFloorCallout()`): that boolean is a reasonable proxy once status is confirmed, but a 45-55 bracket client with ambiguous status and any menstrual/vasomotor/sleep symptoms at intake should not be treated as pelvic-floor-safe by default just because the field reads false/unset — documented as a manual-override practice (set `isPostmenopausal: true` or otherwise include the callout) rather than an engine change, since a three-state field is a code change outside this agent's scope. This citation is older (2010) than this log's usual 2025-2026 preference; included anyway because it was the clearest direct evidence found on this specific question and changes a practical default, not because recency requirements were relaxed generally.
- Did NOT edit any client-facing document (e.g. Rena Paul's or Aimee Morris's files) — per this agent's non-negotiables, that finding is flagged back to the main thread/`icons-expert` for their intake data and documents, not applied here.
- Sources: [Muscle Power Versus Strength as a Predictor of Mortality in Middle-Aged and Older Men and Women, Araújo/Kunutsor et al., Mayo Clinic Proceedings 2025;100(8):1319-1331](https://www.mayoclinicproceedings.org/article/S0025-6196(25)00100-4/abstract) (also available via [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0025619625001004)) · [STRAW+10 staging criteria overview](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11601186/) · [A Novel Low-Impact Resistance Exercise Program Increases Strength and Balance in Females Irrespective of Menopause Status, Medicine & Science in Sports & Exercise 2025;57(3):501-513](https://pubmed.ncbi.nlm.nih.gov/39480197/) · [University of Exeter coverage of the same study](https://news.exeter.ac.uk/faculty-of-health-and-life-sciences/first-of-its-kind-study-shows-resistance-training-can-improve-physical-function-during-menopause/) · [Mishra GD, Cardozo L, Kuh D, "Menopausal transition and the risk of urinary incontinence: results from a British prospective cohort," BJU International 2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC3492747/) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/20346050/))

**8/12/2026 — fifth pass. Cardiovascular/cardiac considerations in resistance training (new topic, first pass — genuine gap, no prior coverage).** Triggered by a daily subagent check-in surfacing that Kayma Liburd's document (cardiac flag, hard 160bpm ceiling, physician-coordinated) rested entirely on undocumented clinical judgment — every other major clinical area this file handles (pelvic floor, GLP-1, HRT, ACL/knee valgus, bone loading) had a cited subsection; cardiovascular/cardiac did not. Checked: current AHA/ACSM guidance on resistance training with a cardiac flag, HR-based vs. RPE/RIR-based autoregulation for a hard HR ceiling (including beta-blocker interference with HR readings), the Valsalva maneuver/blood pressure response during heavy compound lifting and whether it should moderate strength work (not just conditioning) for a cardiac-flagged client, and whether/how a male client's cardiac considerations differ.
- **Added (new top-level subsection):** "Cardiovascular / Cardiac Considerations in Resistance Training (2023-2026 evidence)," placed in the Evidence-Based Science Layer between Power Training — Fall Risk & Longevity and Hormone Therapy (MHT/HRT). Covers: (1) risk context — CVD is the leading cause of death in women and risk roughly doubles in the 10 years after menopause, with the transition itself (not just confirmed postmenopausal status) already elevated, per the 2020 AHA menopause-transition scientific statement; (2) resistance training is broadly safe in cardiac populations at meaningful intensity per the AHA's 2023 update statement — contraindications mirror standard cardiac-rehab/aerobic contraindications (unstable angina, advanced arrhythmias, decompensated heart failure, active thromboembolism, with hypertrophic cardiomyopathy as a named exception), heavy work (>80% 1RM) is appropriate after ~6 months of progressive training in a cleared, stable client, and this is corroborated by the ACSM 2026 guideline update (already cited elsewhere in this file) reporting that nonfatal CV complications in coronary-heart-disease patients occurred during aerobic training, not resistance training, across >38,000 participants studied; (3) HR-based vs. RPE/RIR-based autoregulation — a physician-issued absolute bpm ceiling is legitimate, GXT-derived clinical practice and should be treated as authoritative over generic formulas, but beta-blockers blunt HR response and make RPE/RIR the more reliable real-time signal in that specific case, corroborated by a 2025 pilot RCT in coronary artery disease patients showing RIR-based prescription performs equivalently to %1RM prescription in a cardiac-rehab setting; (4) the Valsalva maneuver/BP response during heavy lifting — real, well-evidenced, and NOT limited to a load-restriction question: breathing technique alone changes peak BP dramatically at the same load (mean 311/284 mmHg with breath-holding vs. 198/175 mmHg with slow controlled exhalation at ~100% max, Linsenbardt et al. 1992), extreme BP spikes are directly measured during heavy lifting with Valsalva (MacDougall et al. 1985, mean 320/250 mmHg, one subject exceeding 480/350 mmHg), and a hemodynamic "rebound" on breath release is a documented arrhythmia-risk mechanism specifically in cardiac-vulnerable individuals — recommended technique is controlled open-glottis exhale-on-exertion (distinct from brief bracing, which is unaffected), the same cue this file already uses in the Pelvic Floor Protocol for an unrelated reason; (5) a general framing rule for when a cardiac flag should scope conditioning only vs. also touch resistance training, plus an engine note flagging a `pelvicFloorCallout()`-style auto-trigger as a reasonable future engine addition (not built in this pass); (6) a Male Client Programming Framework note — the RT-safety evidence is not sex-differentiated, but average CVD-risk onset runs earlier in men, so the conversation is relevant starting earlier in that framework's brackets. Added a one-line cross-reference pointer from the Male framework's 40–59 bracket back to this section.
- **Direct finding on Kayma Liburd's document, flagged back rather than edited:** the "precautions not restrictions, strength side left unrestricted" call was only PARTIALLY correct. The load/intensity side holds up — AHA 2023 does not support capping her 80%/90% working intensities or restricting compound lifts by default for a stable, physician-cleared cardiac client. But per CLIENTS.md's own description, her document's strength-training side carries no breathing-technique language at all, and the evidence above indicates a cardiac flag should make an explicit "exhale on exertion, don't hold your breath through the rep" cue a standing, written part of her heavy compound-lift blocks (squat, deadlift-pattern hinge, near-maximal pressing) — not because her load needs to change, but because Valsalva/BP-spike risk during heavy lifting is a real, separate risk pathway from the sustained-elevated-HR risk her conditioning-side HR cap already addresses. This is a candidate revision to her already-delivered document — flagged to the main thread/`icons-expert` per this agent's non-negotiables, not edited here.
- **Genuine gaps/uncertainty flagged, not resolved with invented numbers:** no cardiac-specific numeric %1RM cap is established in the literature reviewed beyond the standing breathing-technique precaution — any restriction tighter than that must come from the client's own physician, since cardiac clearance is individualized (ejection fraction, arrhythmia history, actual stress-test result) in a way this file's other numeric thresholds (ALST/VFA/T-score) are not. The 2025 breathing-technique/hemodynamics corroborating study (Deniz & Erdemir, BMC Sports Science, Medicine and Rehabilitation) was in healthy young resistance-trained males, not a cardiac population — cited only for mechanism corroboration, explicitly flagged as such, not presented as cardiac-population evidence.
- Did NOT edit `clients/kayma_liburd/` or `scripts/kayma_liburd_2day_plan.js` — flagged above per this agent's non-negotiables; that edit belongs to `icons-expert`.
- Sources: [Resistance Exercise Training in Individuals With and Without Cardiovascular Disease: 2023 Update, AHA Scientific Statement, Circulation 2023;149(3):e217-e231](https://www.ahajournals.org/doi/10.1161/CIR.0000000000001189) · [Menopause Transition and Cardiovascular Disease Risk: Implications for Timing of Early Prevention, AHA Scientific Statement, Circulation 2020;142(25):e506-e532](https://www.ahajournals.org/doi/10.1161/CIR.0000000000000912) · [ACSM 2026 resistance training guidelines update summary (reused, already cited elsewhere in this file)](https://acsm.org/resistance-training-guidelines-update-2026/) · [Gismondi A, Iellamo F, Caminiti G, et al., "Rate of Perceived Exertion Based on Repetitions in Reserve Versus Percentage of One-Repetition Maximum for Resistance Training Prescription in Cardiac Rehabilitation: A Pilot Study," Journal of Cardiovascular Development and Disease 2025;12(1):8](https://pmc.ncbi.nlm.nih.gov/articles/PMC11766398/) · [Effect of β-blockade on measures and reproducibility of heart rate, oxygen uptake and work rate across repeated bouts of short-duration, RPE-regulated exercise, European Journal of Applied Physiology 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12528277/) · [Reliability of Resting Heart Rate-based Target Heart Rate for Exercise Prescription after Acute Myocardial Infarction](https://pmc.ncbi.nlm.nih.gov/articles/PMC12778352/) · [MacDougall JD, Tuxen D, Sale DG, Moroz JR, Sutton JR, "Arterial blood pressure response to heavy resistance exercise," Journal of Applied Physiology 1985;58(3):785-790](https://journals.physiology.org/doi/abs/10.1152/jappl.1985.58.3.785) · [Linsenbardt ST, Vidal C, Prietto CA, "Effect of breathing techniques on blood pressure response to resistance exercise," British Journal of Sports Medicine 1992;26(2):97-100](https://pmc.ncbi.nlm.nih.gov/articles/PMC1478931/) · [Deniz IE, Erdemir I, "Influence of breathing strategies on maximal strength output and hemodynamic parameters during bench press exercise," BMC Sports Science, Medicine and Rehabilitation 2025](https://link.springer.com/article/10.1186/s13102-025-01460-4)

**8/13/2026 — sixth pass. Rep range vs. RIR model — direct check on whether "reps should always be 8-12" is evidence-backed.** Triggered by Xolokan directly asking whether an 8-12-reps-always rule should be adopted system-wide for progressive overload. Checked: Schoenfeld's rep-range/hypertrophy meta-analyses (the 2017 low- vs. high-load systematic review/meta-analysis and the 2021 repetition-continuum re-examination), the 2024 Robinson/Pelland/Remmert/Refalo/Jukic/Steele/Zourdos proximity-to-failure dose-response meta-regression, and what the ACSM 2026 position stand (already this file's standing citation for the RIR Model) says specifically about rep-range prescription.
- **Corroborated, with new supporting citations added — no rule change made.** The existing RIR-governed, goal-varying rep-range approach already in use across client programs (e.g. Nick's 3-5 rep/70-88% 1RM strength-focused primary lifts vs. most clients' 8-12+ rep Compound-zone accessory and Isolated-zone activation work) is confirmed correct, not just a defensible design choice. No current evidence supports a universal "always 8-12 reps" rule for progressive overload — that is retired bodybuilding-era doctrine, not current literature. Schoenfeld, Grgic, Van Every & Plotkin 2021 (Sports 9(2):32) found comparable hypertrophy across a wide loading spectrum (~30% to 90%+ 1RM) provided sets are taken close to failure — rep range itself is not the driver once effort/proximity-to-failure is controlled for. The 2024 Robinson et al. meta-regression (Sports Medicine 54(9):2209-2231) sharpens this: hypertrophy responds to proximity-to-failure (lower RIR), largely independent of rep range, while strength gains showed a NEGLIGIBLE relationship with proximity-to-failure — meaning %1RM/load, not RIR and not rep count, is the primary driver of strength adaptation specifically. Most directly: ACSM 2026 itself (this file's existing RIR-Model citation) explicitly retires the "8-12 for hypertrophy" rule at the position-stand level, states rep range has no independent hypertrophy effect once effort/volume are matched, and endorses a working range of roughly 1-30 reps/set depending on goal — a direct validation of this system's existing zone-varying rep-range practice, not a call to change it.
- **Added:** a new subsection, "Why Not Just Fix Every Exercise At 8–12 Reps?", directly under the existing "Progressive Overload — RIR Model (ACSM 2026)" section, so this exact question has a standing citation-backed answer on file rather than needing re-research if it recurs from a trainer or from Xolokan again.
- **Did not touch:** any client program's rep ranges, block structure, or the core RIR Model guidance itself — this pass confirmed the current approach is the evidence-backed one; nothing needed correcting.
- Sources: [Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training: A Systematic Review and Meta-analysis, Schoenfeld et al. 2017](https://pubmed.ncbi.nlm.nih.gov/28834797/) · [Loading Recommendations for Muscle Strength, Hypertrophy, and Local Endurance: A Re-Examination of the Repetition Continuum, Schoenfeld, Grgic, Van Every & Plotkin, Sports 2021;9(2):32](https://www.mdpi.com/2075-4663/9/2/32) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/33671664/)) · [Exploring the Dose-Response Relationship Between Estimated Resistance Training Proximity to Failure, Strength Gain, and Muscle Hypertrophy: A Series of Meta-Regressions, Robinson, Pelland, Remmert, Refalo, Jukic, Steele & Zourdos, Sports Medicine 2024;54(9):2209-2231](https://link.springer.com/article/10.1007/s40279-024-02069-2) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/38970765/)) · [ACSM Unveils Landmark 2026 Resistance Training Guidelines — First Update in 17 Years (reused, already cited elsewhere in this file for the RIR model itself)](https://acsm.org/resistance-training-guidelines-update-2026/)

**8/13/2026 — seventh pass. Protein-tier wording reconciliation — 45-55 bracket bullet vs. Protein Targets subsection/Quick Reference table/engine.** Triggered by `icons-roster-analyst`'s debut cross-roster pass flagging that the 45-55 bracket bullet ("moving to 2.0-2.2 g/kg/day as menopause is reached or ALST flags At-Risk") read as gating the 2.0-2.2 g/kg tier behind confirmed menopausal status, while the Protein Targets subsection, the Quick Reference table, and `proteinTargets()`'s actual implementation in `icons_template.js` (`atRisk || ageYears >= 50`) all treat age 50 as an independent trigger with no confirmed-status gate. Practical case: Johnna Macarthur (54, unconfirmed menopausal status, ALST Normal) gets the 2.0-2.2 tier from the engine today, which a strict reading of the bracket bullet would not have supported. Checked: Morton et al. 2018 (this file's own standing citation for the tier) for any explicit menopause-confirmation gate, ISSN/PROT-AGE-adjacent general sarcopenia-protein literature, and whether any source ties 2.0-2.2 g/kg specifically to confirmed postmenopausal status rather than an age threshold.
- **Corrected the 45-55 bracket bullet's wording; the substance (what actually triggers the tier) was already correct in the engine and in the Protein Targets subsection — this was a documentation-consistency defect, not a numeric error.** Searched Morton et al. 2018 (BJSM, 49 trials/1,863 participants) directly — it identifies a ~1.62 g/kg/day dose-response plateau for fat-free-mass gains and notes the effect of protein supplementation shrinks with age (anabolic resistance), but sets no confirmed-menopause gate on any tier; it is not menopause-specific at all. No source reviewed (this pass or prior passes already cited in this file, including the WHEN position statement) ties the 2.0-2.2 g/kg tier specifically to CONFIRMED postmenopausal status as opposed to an age threshold — general sarcopenia-protein literature (PROT-AGE-adjacent sources, ISSN) centers on age and training status, not menopausal confirmation, as the relevant variable. Given that, and given this file's own established practice of treating ambiguous perimenopausal status conservatively (see "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context"), age 50 functioning as its own independent, non-gated trigger is the correct resolution — confirming Xolokan's working assumption. Reworded the 45-55 bracket bullet to state plainly that the 2.0-2.2 g/kg tier is reached via any of three independent triggers (age 50, ALST At-Risk, or menopause confirmed before 50) rather than implying a confirmed-status gate, and to explicitly cross-reference `proteinTargets()`'s actual `atRisk || ageYears >= 50` logic so the prose and the engine can't drift apart silently again. Added a short clarifying note directly under the Protein Targets subsection's code block making the OR logic and the non-gated status of "50+" explicit there too.
- **No engine change needed/recommended.** `proteinTargets()`'s existing behavior (escalate on ALST At-Risk OR age ≥50, independent of confirmed menopausal status) is the version supported by the literature and is now what both prose passages say — nothing to flag to `icons-expert` on this point. Johnna Macarthur's current 2.0-2.2 g/kg tier assignment is correct as-is; no revision needed to her document.
- **Did not touch:** the Quick Reference table's "2.0-2.2 (50+)" row — already correctly worded as an age-based trigger, no ambiguity found there.
- Sources: [A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults, Morton RW, Murphy KT, McKellar SR, et al., British Journal of Sports Medicine 2018 (reused, already this file's standing citation for the Protein Targets subsection)](https://pubmed.ncbi.nlm.nih.gov/28698222/) · [International Society of Sports Nutrition Position Stand: protein and exercise, Jäger et al. 2017 (reused, already cited elsewhere in this file)](https://link.springer.com/article/10.1186/s12970-017-0177-8) · [Dietary Protein & Post Menopausal Women (60-90 Years), NASM research summary — reviewed for any confirmed-status gating, none found](https://blog.nasm.org/protein-for-post-menopausal-women) · [The Impact of Protein in Post-Menopausal Women on Muscle Mass and Strength: A Narrative Review, 2024](https://www.mdpi.com/2673-9488/4/3/16)

**8/13/2026 — eighth pass, same day. PNF (Proprioceptive Neuromuscular Facilitation) — new topic, first pass; staff-capability documentation, not a bracket/threshold change.** Triggered by Xolokan telling the main thread directly that PNF stretching is specifically Niko Heers' (in-house certified Stretch Therapist) technique — a genuine first-time addition (confirmed via grep: zero prior mentions of PNF/contract-relax/hold-relax anywhere in this file). Checked: PNF mechanism (autogenic inhibition, reciprocal inhibition, and how settled that explanation actually is), acute and chronic ROM evidence vs. static/dynamic/ballistic stretching, appropriate use context, and cautions around using PNF's resisted-contraction phase on an acutely injured or actively inflamed area.
- **Added:** a new paragraph in the "STUDIO STAFF — IN-HOUSE PT & STRETCH THERAPY" section naming PNF as Niko Heers' specific technique, with the evidence base (2023 Konrad et al. acute-effects meta-analysis showing PNF's acute ROM gain is comparable to static stretching; a companion 2024 Konrad et al. chronic-effects meta-analysis showing ≥2-week static or PNF stretch training outperforms dynamic/ballistic for long-term ROM gains), an honest mechanism caveat (the classic autogenic/reciprocal-inhibition explanation is more contested than commonly taught — EMG evidence hasn't consistently confirmed reciprocal inhibition during the contraction phase, and the contemporary view leans toward stretch-tolerance/pain-modulation instead), and a clinical caution (PNF's resisted-contraction phase makes it not generally appropriate as a stand-alone technique on an acutely injured, unstable, or actively inflamed joint/tendon without clearance from the coordinating clinician — deferring to Jason Bethea's/the client's own clinician's clearance status). Also updated the existing "Mobility, ROM, assisted-stretching-heavy content" bullet to say a future client document naming Niko for mobility/ROM work should specifically say "PNF stretching" (or the named variant — contract-relax/hold-relax) rather than generic "assisted stretching."
- **Judgment call, made per the task's own instruction to verify rather than assume: a compact addition inside the STUDIO STAFF section is sufficient — no dedicated Evidence-Based Science Layer subsection was added.** Reasoning: every existing Science Layer subsection (ALST, protein, RIR, Copenhagen plank, etc.) drives a population-wide programming threshold or technique applied across the roster independent of which staff member is involved. PNF here is scoped specifically to Niko's in-session work per this section's own "folded into training days, led by name" operating model — it's who does it and how it's described in documents, not a new client-population threshold. If PNF-based programming ever needs to be prescribed/tracked independent of Niko's involvement (e.g. a trainer running PNF cool-down protocols on their own), that would be the trigger to promote this into a full Science Layer subsection — not the case today.
- **Did not touch any client document** (`clients/`, `trainer_education/`) — confirmed via grep that no delivered/rendered document currently names Niko Heers; he appears only in a couple of build scripts' header comments explaining why he was deliberately NOT used for that client. Nothing to retrofit. **Flag for the main thread:** no existing client document was found that's an obvious immediate candidate for a follow-up naming Niko with the PNF detail — but per this section's existing "use judgment, don't insert decoratively" rule, the next client document with a genuine ROM-limited/mobility-focused cool-down or corrective block (rather than a strength/load-limited one) is the natural place to apply the new "PNF stretching," not "assisted stretching," language going forward.
- Sources: [Konrad A, Alizadeh S, Daneshjoo A, Hadjizadeh Anvar S, Graham A, Zahiri A, Goudini R, Edwards C, Culleton R, Scharf C, Behm DG, "Acute Effects of Various Stretching Techniques on Range of Motion: A Systematic Review with Meta-Analysis," Sports Medicine – Open 2023](https://link.springer.com/article/10.1186/s40798-023-00652-x) · [Konrad A, Alizadeh S, Daneshjoo A, Hadjizadeh Anvar S, Graham A, Zahiri A, Goudini R, Edwards C, Scharf C, Behm DG, "Chronic effects of stretching on range of motion with consideration of potential moderating variables: A systematic review with meta-analysis," Journal of Sport and Health Science 2024;13(2):186-194 (published online 2023)](https://www.sciencedirect.com/science/article/pii/S2095254623000571) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/37301370/)) · [Sharman MJ, Cresswell AG, Riek S, "Proprioceptive Neuromuscular Facilitation Stretching: Mechanisms and Clinical Implications," Sports Medicine 2006;36(11):929-939](https://pubmed.ncbi.nlm.nih.gov/17052131/) · [Hold-relax and contract-relax stretching for hamstrings flexibility: a systematic review with meta-analysis — reviewed for hamstring-specific PNF-vs-other-modality comparison](https://www.sciencedirect.com/science/article/abs/pii/S1466853X18300361)

**8/14/2026 — ninth pass. Postpartum return to training & diastasis recti abdominis (DRA) — new topic, first pass; genuine gap that had gone unfilled since the Age Bracket Programming Framework's own intro referenced a postpartum client as its bracket-proximity example (8/11/2026) without any actual protocol behind it.** Daily subagent check-in; no current roster client is known to be postpartum — this is proactive framework-building per the standing "be ready for any client at any time" trigger, the same category of pass that built the Male Client Programming Framework. Checked: current (2025-preferred) postpartum return-to-exercise/resistance-training guidelines, diastasis recti abdominis (DRA) prevalence and persistence timelines, whether structured exercise/resistance training is evidence-backed as treatment for DRA, and whether the "no crunches/sit-ups with DRA" rule commonly taught holds up as an absolute.
- **Added (new subsection):** "Postpartum Return to Training & Diastasis Recti Abdominis (DRA)," placed directly after the existing Pelvic Floor Protocol section in the Evidence-Based Science Layer (thematically closest — both are core/pelvic-region protocols with the same referral-not-diagnose posture). Key findings folded in: (1) the 2025 Canadian Guideline for Physical Activity, Sedentary Behaviour and Sleep Throughout the First Year Postpartum (CSEP-led Consensus Panel, ~19,000 articles screened, 7 systematic reviews, published British Journal of Sports Medicine 2025, ACSM-endorsed) explicitly retires the blanket "cleared at 6 weeks" model in favor of individualized, gradual, symptom-based return, with resistance training named as an explicit target-behavior component (120 min/week MVPA across ≥4 days, aerobic + resistance + daily pelvic floor work) — not just cardio with strength training implied; (2) its companion GAQ-PP (Get Active Questionnaire for Postpartum) 4-question screen is the same category of legitimate non-diagnostic self-report tool this file already uses for perimenopausal screening — collecting the answers is fine, staging/diagnosing them is not; (3) DRA prevalence/persistence is real and long-tailed, not a 6-week-resolving condition — a frequently-cited cohort (Sperstad et al. 2016, BJSM) found 60%/45.4%/32.6% prevalence at 6 weeks/6 months/12 months postpartum, and a 2024 cross-sectional study found DRA still present in 22-36% of women at 3-30 YEARS postpartum, meaning a postpartum flag shouldn't be assumed resolved just because a client is years past delivery; (4) structured exercise is evidence-backed as first-line DRA treatment — multiple 2025 systematic reviews/meta-analyses (a Scientific Reports network meta-analysis of 27 RCTs/1,340 women/39 interventions; a separate non-operative-management meta-analysis of RCTs) confirm structured programs reduce inter-recti distance versus no intervention, though no single protocol is yet confirmed superior; (5) the commonly-taught "never do crunches/sit-ups with DRA" rule is outdated as an absolute — Gluppe, Ellström Engh & Bø 2021 (Brazilian Journal of Physical Therapy) found both TrA training AND curl-up training outperformed minimal intervention, meaning the correct evidence-based response is SEQUENCING (deep-core/TrA/pelvic-floor foundation before flexion-pattern loading), not permanent exclusion — mapped directly onto this file's existing Three-Zone "Control precedes power" philosophy rather than presented as a new idea.
- **Practical application added:** don't treat a physician's 6-week clearance as sufficient for heavy compound loading without a current symptom check (leaking, pelvic pressure/heaviness, visible midline doming/coning under load); sequence Isolated-zone deep-core/pelvic-floor work before Compound-zone heavy loading and before reintroducing flexion-pattern ab work; use visible doming/coning under load as the trainer-coachable regression signal rather than attempting a diagnostic DRA measurement; refer a symptomatic client to pelvic floor PT using the same language as the existing Pelvic Floor Protocol. Explicitly cross-referenced the Studio Staff section's existing scope boundary — neither Jason Bethea nor Niko Heers has confirmed pelvic-floor-PT scope, so DRA/postpartum core referrals stay external, same as classic pelvic-floor-symptom referrals.
- **Genuine gap flagged, not filled with an invented number:** no systematic review found in this pass gives a specific %1RM/load/week-count threshold for safe return to LIFTMOR-style (≥80% 1RM) compound loading postpartum — the guideline's own framing is deliberately individualized/symptom-based, so a fabricated threshold would misrepresent the evidence. Progression stays RIR-governed and symptom-gated, same as every other client, rather than a fixed timeline.
- **Engine note (not built, flagged for future work only):** a `client.isPostpartum`-type field auto-inserting a deep-core/pelvic-floor sequencing reminder, mirroring how `isPostmenopausal` auto-inserts `pelvicFloorCallout()`, would be a reasonable future engine addition once a postpartum client is actually onboarded — documented here per the same pattern already used for the cardiac-flag engine note (5th pass, 8/12/2026).
- Did not touch any client document — no roster client is currently flagged postpartum, so there was nothing to retrofit; this is pure framework-building ahead of need.
- Sources: [2025 Canadian guideline for physical activity, sedentary behaviour and sleep throughout the first year postpartum — CSEP guideline landing page](https://csep.ca/2025/06/24/guideline-for-postpartum/) · [Postpartum – 24-Hour Movement Guidelines summary, CSEP](https://csepguidelines.ca/guidelines/postpartum/) · [ACSM Science Spotlight — ACSM Endorses CSEP Postpartum Guidelines](https://acsm.org/science-spotligh-csep-postpartum-guidelines/) · [Get Active Questionnaire for Postpartum, CSEP](https://csep.ca/2025/03/21/csep-get-active-questionnaire-for-postpartum/) · [CSEP-PATH GAQ-PP Guidelines PDF](https://csep.ca/wp-content/uploads/2025/03/CSEP-PATH_GAQ_PP_Guidelines.pdf) · [An evidence-based comparison of rehabilitation strategies for diastasis recti abdominis in postpartum women: a systematic review and network meta-analysis, Scientific Reports 2025](https://www.nature.com/articles/s41598-025-22574-2) · [Non operative management of postpartum Diastasis Recti: a systematic review and metanalysis of randomized controlled trials, Hernia 2025/2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC13090193/) · [Impact of postpartum exercise on pelvic floor disorders and diastasis recti abdominis: a systematic review and meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC12013572/) · [Gluppe S, Ellström Engh M, Bø K, "What is the evidence for abdominal and pelvic floor muscle training to treat diastasis recti abdominis postpartum? A systematic review with meta-analysis," Brazilian Journal of Physical Therapy 2021](https://pubmed.ncbi.nlm.nih.gov/34391661/) · [Sperstad JB, Tennfjord MK, Hilde G, Ellström-Engh M, Bø K, "Diastasis recti abdominis during pregnancy and 12 months after childbirth: prevalence, risk factors and report of lumbopelvic pain," British Journal of Sports Medicine 2016;50(17):1092-1096](https://pubmed.ncbi.nlm.nih.gov/27324871/) · [Prevalence and risk factors of diastasis recti abdominis in the long-term postpartum: a cross-sectional study, Scientific Reports 2024](https://www.nature.com/articles/s41598-024-76974-x)

**8/15/2026 — tenth pass. Vitamin D & Calcium supplementation as a bone-health cofactor — new topic, first pass; genuine gap directly adjacent to the existing Bone Loading (LIFTMOR) section, which had a stimulus/loading protocol but no position at all on the supplement question a bone-loading-candidate client would naturally ask about.** Daily subagent check-in. Checked: current (2024-2025 preferred) evidence on vitamin D/calcium supplementation for fracture/BMD outcomes in postmenopausal women specifically, whether combining supplementation with exercise changes the picture, standard dosing guidance, and the calcium/cardiovascular-risk controversy (relevant given the Cardiovascular section added in the fifth pass).
- **Added (new subsection):** "Vitamin D & Calcium Supplementation — Bone Health Cofactor (2024-2025 evidence)," placed directly after the existing Bone Loading — LIFTMOR RCT section (before Power Training), since it's the natural adjacent question for the same LIFTMOR-candidate client. Key findings folded in: (1) USPSTF's December 2024 draft recommendation update concludes with MODERATE certainty that vitamin D supplementation (with or without calcium) has NO net benefit for primary fracture prevention in healthy community-dwelling postmenopausal women/men 60+ at standard doses (≤400 IU vitamin D/≤1,000mg calcium), and finds evidence INSUFFICIENT — not negative, genuinely unresolved — at higher doses; explicitly does not apply to a client with confirmed osteoporosis, prior fracture, absorption issues, or confirmed deficiency, who should follow her own prescriber; (2) a 2025 systematic review/meta-analysis (13 RCTs) found combined exercise + calcium/vitamin D outperformed supplementation alone for lumbar spine (SMD 0.31) and femoral neck (SMD 0.47) BMD in postmenopausal women — genuine gap flagged alongside this, same pattern as the existing creatine/bone caveat: the exercise arms studied were heterogeneous (whole-body vibration, mixed/Baduanjin-style training) and not confirmed to include LIFTMOR's specific ≥80% 1RM/5×5/2×week protocol, so applying this to our bone-loading protocol specifically is a reasonable extrapolation, not a directly-replicated finding; (3) a meta-analysis of 13 double-blind placebo-controlled RCTs (n=43,178) found calcium supplementation associated with a 15% increased CVD/CHD risk specifically in postmenopausal women — described in the literature as contested/unresolved, not settled, and now cross-referenced directly to the Cardiovascular / Cardiac Considerations section (fifth pass) since a cardiac-flagged client is exactly the wrong client to casually recommend calcium supplementation to without her physician's input.
- **Practical takeaway added:** don't default to recommending blanket calcium + vitamin D supplementation to a healthy LIFTMOR-candidate client — current best evidence doesn't support it as a fracture-prevention measure at standard doses in an otherwise-healthy client, and the cardiovascular signal is real enough to warrant caution rather than casual encouragement. Food-first framing is uncontroversial; a supplement recommendation itself stays a physician/dietitian conversation, mirroring this file's existing referral-not-diagnose posture for GLP-1/HRT/TRT.
- **Categorization: Add, not Correct** — nothing prior in this file addressed vitamin D/calcium supplementation at all, so there was no existing claim to soften or fix, only a gap to fill.
- Did not touch any client document — this is reference material for a conversation that may come up with any LIFTMOR-candidate client (e.g. Siobhan Hansen, Elizabeth Poyner), not a correction tied to a specific existing document.
- Sources: [Draft Recommendation: Vitamin D, Calcium, or Combined Supplementation for the Primary Prevention of Falls and Fractures in Community-Dwelling Adults, USPSTF (Dec 2024 draft)](https://www.uspreventiveservicestaskforce.org/uspstf/draft-recommendation/vitamin-d-calcium-combined-supplementation-primary-prevention-falls-fractures-communitydwelling-adults) · [USPSTF final recommendation page — Vitamin D, Calcium, or Combined Supplementation for the Primary Prevention of Fractures in Community-Dwelling Adults](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/vitamin-d-calcium-or-combined-supplementation-for-the-primary-prevention-of-fractures-in-adults-preventive-medication) · [Effects of Combined Exercise and Calcium/Vitamin D Supplementation on Bone Mineral Density in Postmenopausal Women: A Systematic Review and Meta-Analysis, 2025](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12735737/) · [Effect of combined exercise and nutrition on bone density in postmenopausal women — a systematic review and meta-analysis, Nutrition & Metabolism 2025](https://link.springer.com/article/10.1186/s12986-025-01025-9) · [The effects of combined calcium and vitamin D supplementation on bone mineral density and fracture risk in postmenopausal women with osteoporosis: a systematic review and meta-analysis of RCTs, BMC Musculoskeletal Disorders 2025](https://link.springer.com/article/10.1186/s12891-025-09089-7) · [Calcium Supplements and Risk of Cardiovascular Disease: A Meta-Analysis of Clinical Trials, Nutrients 2021 (13 RCTs, n=43,178, postmenopausal-women-specific finding — older but the clearest direct source found for this specific risk signal)](https://www.mdpi.com/2072-6643/13/2/368) · [Calcium Supplementation - Efficacy and Safety, 2025 review](https://pmc.ncbi.nlm.nih.gov/articles/PMC11821691/)

**8/16/2026 — eleventh pass. Osteoarthritis (knee & hip) and resistance training — new topic, first pass; genuine gap confirmed via grep (zero prior mentions of "osteoarthritis"/"arthritis"/"joint pain" anywhere in this file) despite every other major joint/loading topic already having a dedicated subsection.** Daily subagent check-in. Checked: current ACR/OARSI-adjacent exercise guidance for knee/hip OA, 2025 dose-response/network meta-analysis evidence on resistance training intensity/volume for OA pain vs. stiffness vs. function, whether heavy/high-intensity loading is safe with OA or joint pain/laxity (directly relevant to this file's own "postmenopausal ligament laxity" philosophy language), the postmenopause/estrogen-OA link, and the boundary between training as OA management vs. training as a substitute for an already-indicated joint replacement.
- **Added (new subsection):** "Osteoarthritis (Knee & Hip) & Resistance Training (2024-2025 evidence)," placed directly after Power Training — Fall Risk & Longevity and before Cardiovascular / Cardiac Considerations, grouping it with this file's other joint-loading-adjacent sections (Bone Loading, Vitamin D & Calcium, Power Training). Key findings folded in: (1) prevalence/risk context — women account for ~60% of global OA cases and postmenopausal women show roughly 2x the knee OA prevalence of age-matched men, with a 2025 systematic review/meta-analysis (Journal of Menopausal Medicine) linking estrogen deficiency mechanistically to cartilage degeneration — directly reinforcing, not newly introducing, this file's existing ICONS Training Philosophy language about declining estrogen reducing "joint lubrication," with an honest caveat that the mechanistic evidence is stronger at the molecular/animal level than the human causal-intervention level; (2) the 2019 ACR/Arthritis Foundation guideline (no 2025 update located) strongly recommends land-based resistance exercise for knee OA, with supervised exercise outperforming unsupervised and no established hierarchy among exercise modes; (3) a 2025 network meta-analysis (46 RCTs, 3,463 participants) found high-speed resistance training most effective overall, with a specific dose-response split — moderate intensity (43-47% 1RM) over a longer duration (35-37 weeks, 610-640 weekly reps) optimal for pain/function, vs. a shorter, higher-rep protocol (12 weeks, ~1,200 weekly reps) optimal for stiffness specifically — i.e. dosing should follow the client's actual limiting symptom, not one universal OA prescription; (4) heavier loading is not disqualified by OA/joint pain — the PROHIP trial (hip OA, 2025) found patients tolerated progressively higher training loads while maintaining low pain, and a case series (Henriksen et al., Translational Sports Medicine, 16 women with joint hypermobility + knee pain) found supervised heavy RT reduced pain and improved strength/proprioception/tendon stiffness with no major adverse events — flagged honestly as a young (mean age 24.2), hypermobility-specific population, cited as counter-evidence to the "heavy loading is unsafe with joint laxity" assumption rather than a bracket-matched replication; (5) an important boundary — a 2024 NEJM RCT (Frydendal et al., n=109, severe hip OA WITH an existing surgical indication) found total hip replacement produced clinically superior pain/function outcomes vs. resistance training alone at 6 months, meaning training is not a substitute for an already-indicated replacement and a client in that specific situation should be referred to her orthopedist rather than told training alone should match a surgical outcome; (6) a 2026 ahead-of-print systematic review found RT benefits both pre- and post- knee replacement (higher intensity/machine work pre-op, ≥8-week programs for pain/function, ≥12-week programs for post-op mobility gains) — RT has a role on both sides of a replacement, not just as an alternative to one.
- **Categorization: Add, not Correct.** Nothing prior in this file addressed OA at all — pure gap-fill, consistent with this file's existing default instinct (reduce load around a painful/diagnosed joint) actually running counter to current evidence, which treats resistance training as core first-line OA management rather than a risk to train around.
- **Genuine gap flagged, not filled with an invented number:** no dedicated postmenopausal-women-specific OA-plus-heavy-loading RCT replicating LIFTMOR's exact protocol (≥80% 1RM, 5×5, 2×/week) in a confirmed-OA population was found — the intensity/dosing evidence above comes from mixed-age, mixed-sex OA RCT pools, not this file's specific 40-65 bracket population. Documented as directly applicable OA-specific evidence, not a bracket-matched LIFTMOR replication.
- Did not touch any client document — no current roster client has a documented OA diagnosis on file; this is proactive framework-building for when one is onboarded, same pattern as the Male Client Programming Framework and Postpartum/DRA passes. Also did not edit the ICONS Training Philosophy section's existing "joint lubrication" language — that's qualitative brand-voice prose, not a cited threshold, and out of this pass's scope; noting here only that the new subsection now gives it a real citation to point to if a future pass wants to add a cross-reference there.
- Sources: [Optimal resistance training strategies for knee osteoarthritis symptom relief: a systematic review and network meta-analysis, 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12821314/) · [Optimizing resistance training for pain management in knee and hip osteoarthritis: a pairwise and dose–response meta-analysis, Frontiers in Public Health 2025](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1623679/full) · [Training load and pain response during progressive resistance training in patients with hip osteoarthritis in the PROHIP trial, 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12547905/) · [Frydendal T, et al., "Total Hip Replacement or Resistance Training for Severe Hip Osteoarthritis," New England Journal of Medicine 2024](https://www.nejm.org/doi/abs/10.1056/NEJMoa2400141) · [Supervised, Heavy Resistance Training Is Tolerated and Potentially Beneficial in Women with Knee Pain and Knee Joint Hypermobility: A Case Series, Henriksen et al., Translational Sports Medicine](https://pmc.ncbi.nlm.nih.gov/articles/PMC11022762/) · [Efficacy and safety of resistance training for knee osteoarthritis and subsequent knee replacement: A systematic review and meta-analysis, 2026](https://www.sciencedirect.com/science/article/pii/S1877065726000254) · [2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee](https://pubmed.ncbi.nlm.nih.gov/31908149/) · [ACR's Latest Osteoarthritis Guidelines Address Benefits of Exercise](https://www.mdedge.com/familymedicine/article/49048/osteoarthritis/acrs-latest-osteoarthritis-guidelines-address-benefits) · [Estrogen Deficiency in Menopause: A Major Contributor to Cartilage Degeneration and Osteoarthritis: A Systematic Review and Meta-Analysis, Journal of Menopausal Medicine 2025](https://e-jmm.org/DOIx.php?id=10.6118%2Fjmm.25141) · [The intersection of aging and estrogen in osteoarthritis, npj Women's Health 2025](https://www.nature.com/articles/s44294-025-00063-1)

**8/17/2026 — twelfth pass. Breast cancer survivorship & resistance training (including lymphedema risk) — new topic, first pass; genuine gap confirmed via search (zero prior mentions of "lymphedema"/"breast cancer"/"mastectomy"/"cancer survivor" anywhere in this file), despite breast cancer incidence peaking in exactly this file's core demographic.** Daily subagent check-in. Checked: whether current evidence still supports the historically cautious "avoid/restrict loading the affected-side arm to prevent lymphedema" instinct, the foundational RCT behind current clinical practice, 2025 evidence on high-intensity (not just moderate) resistance training specifically, and the standing ACSM exercise-oncology dosing guideline.
- **Added (new subsection):** "Breast Cancer Survivorship & Resistance Training (2009-2025 evidence)," placed directly after Osteoarthritis and before Cardiovascular / Cardiac Considerations, grouping it with this file's other population/condition-specific resistance-training subsections. Key findings folded in: (1) the foundational PAL trial (Schmitz KH, Ahmed RL, Troxel A, et al., NEJM 2009;361:664-673, n=141 women with stable existing lymphedema) found slowly progressive twice-weekly weight lifting with no imposed load ceiling did not worsen swelling and roughly HALVED lymphedema flare-ups requiring intensive decongestive therapy versus controls — the RCT that moved the National Lymphedema Network away from blanket loading restrictions; (2) current evidence goes further than "safe" — a 2025 cohort study (EXERT-BC/BCN/C, n=115, Iyengar NM et al., JAMA Network Open 2025;8(6), PMID 40498485) found thrice-weekly dose-escalated resistance training explicitly progressed toward hypertrophy was NOT associated with increased lymphedema symptoms and produced measurable improvements in extracellular water/fluid balance — a potential therapeutic benefit, not merely a safety finding; (3) a 2025 systematic review and dose-response meta-analysis (Wang L, Liu Y, Zhang W, et al., Supportive Care in Cancer 2025;33:395, 30 studies) found resistance training reduces lymphedema overall (SMD -0.28) and that HIGH-intensity training (5-8RM, 4x/week, 120-180 min/week) had a LARGER lymphedema-reduction effect than moderate/low intensity, with ≥12-week programs outperforming shorter ones; (4) the standing ACSM 2019 exercise-oncology roundtable dosing guideline (no full 2025 replacement located, same "most current version found, not superseded" caveat already used for the ACR 2019 OA guideline) — treated here as a starting-point floor, not a ceiling, given how much higher intensity current evidence shows survivors tolerating.
- **Practical application added:** do not default to restricting/avoiding loading on the affected-side arm; progress load the same RIR-governed way as any other client rather than treating "slowly progressive" as a special permanent lymphedema accommodation; watch for new/worsening swelling, heaviness, tightness, or skin changes as the coachable regression signal, using the same "stop and flag your coach, this is common and treatable" language already established in the Pelvic Floor Protocol; scope-bounded external referral for lymphedema-certified therapy and oncology rehab, since neither Jason Bethea's nor Niko Heers' confirmed in-house scope covers this specialty (same pattern as the Postpartum/DRA section's pelvic-floor-PT boundary); compression garment use during exercise left as a clinician decision, not standardized here.
- **Genuine, non-obvious interpretive caution surfaced (not just a citation add):** this file's existing Styku Asymmetry Protocol / `weakerSide()` logic assumes an L/R LST gap reflects a true strength/muscle-mass difference — but the JAMA Network Open 2025 study found resistance training measurably changes EXTRACELLULAR WATER on a lymphedema-risk arm, meaning a Styku LST reading there may be confounded by fluid status in a way the protocol (built off Kelly Mulroy's leg data, no comparable fluid-retention confound) was never validated against. Documented as a caution to cross-check Styku's L/R comparison against reported symptoms/clinician measurements for this specific population, not a claim that the engine needs to change.
- **Categorization: Add, not Correct.** Nothing prior in this file addressed breast cancer, lymphedema, or oncology rehab at all — pure gap-fill, following the same pattern as the OA pass: the "protect by restricting load" default instinct is directly contradicted by current evidence.
- **Genuine gap flagged, not filled with an invented number:** no dedicated postmenopausal-women-specific (40-65 bracket) RCT combining LIFTMOR-style ≥80% 1RM bone-loading protocols WITH confirmed lymphedema risk was found — the high-intensity evidence above (5-8RM, roughly LIFTMOR's loading zone) comes from lymphedema-focused studies, not a bone-density-primary population. Treated as strong supporting evidence, not a direct LIFTMOR replication.
- Did not touch any client document — no current roster client has a documented breast cancer/lymphedema history on file; this is proactive framework-building ahead of need, same pattern as the Male Client Programming Framework, Postpartum/DRA, and OA passes.
- Sources: [Schmitz KH, Ahmed RL, Troxel A, et al., "Weight Lifting in Women with Breast-Cancer-Related Lymphedema," New England Journal of Medicine 2009;361:664-673](https://www.nejm.org/doi/full/10.1056/NEJMoa0810118) · [Iyengar NM, et al., "Resistance Training and Lymphedema in Breast Cancer Survivors," JAMA Network Open 2025;8(6), PMID 40498485](https://pmc.ncbi.nlm.nih.gov/articles/PMC12159776/) (also [JAMA Network](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2835176)) · [Wang L, Liu Y, Zhang W, et al., "Effects of resistance training on breast cancer–related arm lymphedema: a systematic review and dose–response meta-analysis," Supportive Care in Cancer 2025;33:395](https://link.springer.com/article/10.1007/s00520-025-09448-z) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/40244422/)) · [Campbell KL, Winters-Stone KM, Wiskemann J, et al., "Exercise Guidelines for Cancer Survivors: Consensus Statement from International Multidisciplinary Roundtable," Medicine & Science in Sports & Exercise 2019;51(11):2375-2390](https://pubmed.ncbi.nlm.nih.gov/31626055/) · [ACSM Cancer & Exercise Resources](https://acsm.org/education-resources/trending-topics-resources/cancer/) · [American Cancer Society, Breast Cancer Facts & Figures 2024-2025 — median age at diagnosis](https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/breast-cancer-facts-and-figures/2024/breast-cancer-facts-and-figures-2024.pdf) · [Intense Resistance Training for Breast Cancer Survivors With Lymphedema Risk, The ASCO Post, July 2025](https://ascopost.com/news/july-2025/intense-resistance-training-for-breast-cancer-survivors-with-lymphedema-risk/)

---

## SCRIPTS QUICK REFERENCE

| Script | Purpose | Output |
|--------|---------|--------|
| `icons_template.js` | Canonical docx engine | .docx via buildDocument() |
| `kelly_mulroy_plan.js` | Kelly's 5-day plan data | Kelly_Mulroy_5Day...v2.docx |
| `siobhan_icons_report_v3.js` | Siobhan assessment report | Siobhan_Hansen_ICONS_Report_v3.docx |
| `siobhan_3day_plan_v2.py` | Siobhan 3-day PDF | Siobhan_Hansen_3Day_Training_Plan.pdf |
| `sarah_plan_v2.js` | Sarah 2-day plan | Sarah_Training_Plan_Client_Version.docx |
| `icons_baseline_protocol.py` | 5-page baseline PDF | ICONS_Baseline_Testing_Protocol.pdf (not yet migrated) |
| `icons_baseline_sheets.js` | Athlete baseline sheets (5 athletes) | system_documents/ICONS_Baseline_Sheets.docx — migrated 8/12/2026, supersedes the old `baseline_sheets.py`/.pdf pre-repo pair |
| `icons_trainer_deck.js` | 16-slide trainer deck | ICONS_Trainer_Education_Deck_Full.pptx (not yet migrated) |

---

*Last updated: August 11, 2026 — Brace Life Studios ICONS System*  
*Research Update Log added 8/11/2026 — standing practice of re-checking the science layer against current literature over time; see that section for the running history of what's been verified, corrected, or added.*  
*Canonical reference: Kelly Mulroy 5-Day Training Plan — actual client deliverable, XML-audited in full*  
*Science layer: Evidence-Based Women's Strength Research Synthesis (Aug 2026)*  
*Styku integration: Siobhan Hansen scan 7/29/2026; August Olivia scan 8/5/2026*  
*Engine v2: protein_bar and pelvic floor callout are now auto-inserted by
`buildDocument()` (see `scripts/icons_template.js`) rather than manual
per-day calls — see `docs/ICONS_System_Prompt.md` for the full paste-into-
Projects reference copy of this system's rules.*  
*Engine v3: rebuilt against the actual Kelly Mulroy reference .docx (not just
its narrative description). Callouts are now compact labeled paragraphs, not
bordered boxes; a running header/footer was added; the week overview is a
single-row day strip; table headers use pale tints with colored text. See
"Visual language — confirmed from reference document" above. This was a
breaking change to `exTable()`'s signature and to `weekOverview()`'s data
shape — `scripts/august_olivia_3day_plan.js` was updated and regenerated
against it as the reference implementation.*

Three small, backward-compatible additions to `icons_template.js` (8/11/2026,
from the first ICONS subagent-team retro — every other client script that
doesn't touch these is unaffected):
- `weakerSide(leftLST, rightLST)` — the "lower LST = weaker = leads
  unilateral work" comparison, returning `'left'|'right'|'even'` (a <0.1 lb
  gap reads as `'even'`, to avoid false precision on scan noise — a separate,
  smaller threshold from the 0.5 lb Asymmetry Protocol trigger above). Every
  client script previously hand-derived this in a comment; getting it
  backwards was a real, documented bug (see "Common Mistakes"). Used in
  `scripts/vinz_feller_3day_plan.js`.
- `maleProteinTargets(client)` / `maleNutritionNote(client)` /
  `testosteroneNote(client)` — a Male Client Programming Framework
  equivalent to `proteinTargets()`/`nutritionBlock()`, built from that
  section's real thresholds/citations rather than the women's tier system.
  `maleProteinTargets()` mirrors `proteinTargets()`'s calc shape but does
  NOT invent a fake hard age-tier boundary the way the women's function
  does — the framework's own "trend toward the upper end of 1.6–2.2 g/kg
  once 40+" is a soft judgment call, not a cited tier, so the function
  returns the full range plus a narrower "working" sub-range that nudges
  upward at 40+, not a new tier. `maleNutritionNote()` is a goldCallout-
  equivalent built the same `labeledPara()`-wrapping way `goldCallout()` is.
  `testosteroneNote()` mirrors the women's HRT framing (informational, never
  diagnostic) and returns `[]` under age 40, since neither is auto-inserted
  by `buildDocument()` the way the women's callouts are — call them
  explicitly from a male client's script. To let a pre-built callout like
  these splice into the declarative `baselineNotes` schema, a `baselineNotes`
  item can now carry `{ render: [...] }` (a pre-built paragraph array)
  instead of `{ type, label, body }` — backward compatible, existing items
  are unaffected. Both replace ~15–20 lines each of hand-written duplicate
  prose in `scripts/jake_poyner_3day_plan.js` (evaluated, not force-fit — see
  that script's header comment for why the nutrition builder doesn't apply
  to a client with no weight/Styku data on file) and
  `scripts/vinz_feller_3day_plan.js` (applied directly — real Styku data on
  file).
