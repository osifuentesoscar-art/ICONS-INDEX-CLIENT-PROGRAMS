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

**Standing rule going forward (confirmed permanent 8/17/2026 — "keep this as constant standard that needs to improve every client doc it creates as well"):** generate the client view alongside every new trainer document, and regenerate it alongside every later revision to an existing one — not a one-time rollout. The same build→audit→commit→deliver pipeline applies to both, every time, including `icons-doc-auditor`'s standing "Client View audience-leak check" (see that agent's file for the full checklist — cross-client names, dangling "see note" references, and the fact that block `intro` text and `summary.milestones4wk`/`milestones8wk`/`rescanNote` strings have no `audience` filter mechanism, so internal-sounding language written there always leaks) — a note, block intro, or summary field added in a later revision needs the same internal/client-facing judgment call applied to it that the original build got. See `icons-expert.md` for the corresponding standing instruction.

**Known engine gap (as of 8/17/2026, not yet fixed):** the `audience: 'internal'` mechanism exists on `baselineNotes` and (as `insightAudience`/`flagAudience`) on individual exercises — but NOT on block `intro`/`introLabel` or on `summary.milestones4wk`/`milestones8wk`/`rescanNote`, which are plain strings with no per-field filtering. The rollout's first audit round found real leaks in exactly these unfiltered fields (a dangling note reference in a block intro, an age-placeholder admission in `milestones8wk`) — current workaround is rewording the shared string so it reads correctly for both audiences, since the content is identical in both documents either way. A cleaner long-term fix (e.g. an internal-only variant string, or splitting these fields the way `baselineNotes` supports) is a real future engine improvement, not yet built.

---

## ICONS PERFORMANCE ASSESSMENT REPORT — INITIAL BASELINE STANDARD (added 8/17/2026, at Xolokan's direct request)

A third document type, distinct from `buildDocument()` (training plan) and `buildImprovementDoc()` (before/after progress report): the INITIAL BASELINE report a client receives after her first Styku scan + full strength-testing battery, before her training plan is even built — this is what "NEW CLIENT ONBOARDING" checklist item 1 below refers to. Built by a new `buildAssessmentReport()` function in `icons_template.js`, modeled exactly on a reference document Xolokan supplied and confirmed as the standard ("this is how I want further client report standards to look") — a corrected "Anna Samuelsson — ICONS Performance Assessment" report.

**Deliberately different visual language from the training-plan engine, on purpose — not a violation of the "no boxes" convention.** The training-plan engine's confirmed style (see "Visual language — confirmed from reference document" above) retired bordered/shaded callout boxes in favor of compact labeled paragraphs. The Assessment Report does the opposite by design: a dark header band, an 8-box Styku stat grid, colored callout boxes (Reference-Group Comparison, Trainer Observations, Next Steps), a strength-assessment table with flagged-row highlighting, and a tan methodology-appendix box. This is Xolokan's explicit, current standard for *this* document type specifically — the training-plan engine's "no boxes" rule is scoped to training plans and stays exactly as it was.

### Structure (mirrors the reference document page-for-page)
1. **Cover / Styku page** — three pillar badges (Aesthetics / Health / Biological Age) with a "Biological Age is a coaching framework, not a lab test" disclaimer, an 8-box Styku stat grid (Body Fat %/Lean Mass/Fat Mass/Bone Mass/BMI/BMR/Shape Score/VFA), a Reference-Group Comparison callout, and a Segmental Lean Mass Distribution section with the Asymmetry Protocol's corrected ≥10% relative-trigger language (not the retired 0.5lb absolute one).
2. **Strength Assessment page** — the 10 core ICONS Baseline Testing Protocol movements + bonus Pull-Ups in a table (columns: #, Exercise, Weight, Reps, %BW, Level, Notes/Flags), with an honest "Not Tested Today" row for any untested movement (never fabricated), a flagged-row summary, and a "How to Read %BW and Level" explanatory box.
3. **Exercise Benefit Breakdown pages** — one card per tested movement: Aesthetics/Health/Biological Age benefit copy, drawn from a reusable `EXERCISE_BENEFIT_LIBRARY` covering all 10 core movements + Pull-Ups, written to this file's corrected clinical framing (no "reduces osteoporosis risk" claim on Deadlift — bone-loading benefit only; no "strengthens the pelvic floor" claim on Hip Thrust — co-activation only, see the Pelvic Floor Protocol's "Co-activation during a lift ≠ PFM strengthening" addition above).
4. **Body Measurements & Next Steps page** — a flexible circumference-measurement grid (not every client has every measurement; the grid handles a partial set gracefully), Trainer Observation cards, an optional Jason PT-notes section (see below), and numbered Next Steps cards (flexible count, not hardcoded to 4).
5. **Methodology & How to Read This Report appendix** — a numbered footnotes list plus a "Summary of factual corrections" box for later revisions of the same client's report (omit/state "first build" when there's nothing to correct yet).

### Jason's PT notes — a section within the same report, not a separate document
Xolokan's explicit choice (confirmed 8/17/2026, when asked directly): Jason Bethea's SOAP-note summary renders as a **new section within the same Assessment Report**, placed after Trainer Observations and before Next Steps — not a separate companion document the way Client View is. Built via `jasonNotesSection()`, and only populated when real PT/rehab data exists for that client — inserting a placeholder into a client with no coordinated-care relationship with Jason would be decorative, not informative, per the same judgment-call standard the Studio Staff section already applies to naming him. When `icons-intake-monitor`'s weekly sweep of "ICONS NOTES JASON PDFS" surfaces new note data for a client who has (or should have) an Assessment Report, that's the trigger to populate or update this section — flag it the same way any other SOAP-note update gets flagged, per that agent's standing rules.

### Footnotes are data, not auto-generated text
`DEFAULT_ASSESSMENT_FOOTNOTES(data)` is exported and provides 8 shared, reusable footnotes (Body Fat Rank, BMR, Shape Score, VFA, Peer Comparison, ALST, %BW & Level, and segmental-composition reliability — the last citing the "3D Optical Scanning — Validity" section above) that apply to any client with no edits needed. A calling script extends this array with exercise-specific footnotes (numbered starting at 9) via `benefitLinesFromLibrary()`'s `{healthFootnote, bioAgeFootnote}` override parameters. **Never hand-duplicate the default 7-or-8 footnote text in a new script** — call `DEFAULT_ASSESSMENT_FOOTNOTES(data)` directly (an early mistake in the pilot build hand-duplicated it, creating a drift risk the first audit caught) — and **never cite a source in a footnote without independently verifying it first**, even one supplied in a reference document Xolokan provides directly — the pilot build's Hip Thrust footnote initially carried an uncited "Skaug et al. 2024" reference that `icons-doc-auditor` correctly flagged as absent from this file's science layer; it turned out to be real and has since been verified and properly cited both here (Pelvic Floor Protocol section) and in the footnote text itself, but that verification step is not optional just because a citation came from Xolokan's own source material.

### Level (Novice/Intermediate/Advanced) is a coach judgment call, not a formula
The reference document is explicit that Level "combines an ExRx 1RM-based reference table with a visual assessment of movement quality" — this is deliberately NOT a pure calculation. **Do not hardcode a fake ExRx percentile table into the engine.** Level is a per-exercise input field the document builder (ultimately the trainer) supplies, informed by the client's actual training history and movement quality on the day, not something `buildAssessmentReport()` computes from weight/reps/bodyweight alone.

### Pilot and rollout status
First built and piloted on Rena Paul (`clients/rena_paul/Rena_Paul_ICONS_Performance_Assessment.docx`, `scripts/rena_paul_assessment_report.js`) — chosen for having the most complete baseline data on file (full 8-box Styku scan + 9-of-10 core movements tested with real weights/reps). Independently audited via `icons-doc-auditor`, clean after two fixes (the footnote-duplication and unverified-citation issues above). **Not yet rolled out to the rest of the roster** — per the same "confirm the pilot before batch-producing" discipline already used for Client View's rollout, generating an Assessment Report for every other client with sufficient baseline data on file is real, separate follow-up work, not assumed to happen automatically.

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

### ICONS Block Method — Standing Session Architecture (added 8/18/2026, Xolokan's direct instruction)

The standing per-day block order for every client training program, stated by Xolokan 8/18/2026 as *the* method for the programming ("every client should be unique to this format"):

```
1. CORRECTIVE          — client-specific corrective/activation work, sourced from
                          the client's actual findings (Jason Bethea's SOAP notes,
                          Styku asymmetry, movement flags) — never generic filler
2. PRIMARY COMPOUND    — the day's main lift, drawn from / progressing the
                          10 core ICONS Index movements
3. ACCESSORY           — hypertrophy-focused accessory work supporting the primary
4. JASON'S EXERCISE    — CONDITIONAL: if the client has a documented exercise from
                          Jason Bethea's SOAP notes on file, it slots here — keeping
                          in-session continuity with his in-house PT work. Omitted
                          entirely (not replaced with filler) for a client with no
                          Jason exercise on file.
5. SECONDARY COMPOUND  — a second compound lift, in a different movement pattern
                          from the primary (which the Antagonist Rotation Rule
                          already all but requires)
6. THIRD COMPOUND —      the session's closer: a compound movement or short
   INTEGRATION            compound complex that pulls the day's patterns together
                          into one integrated, full-body expression — a loaded
                          carry, a hinge-to-carry or squat-to-press complex, or a
                          power expression of the day's primary pattern where the
                          client's bracket calls for power work. Added 8/18/2026
                          (Xolokan: "a third compound block that pulls everything
                          together"), and it resolves the pilot's named-slot gap:
                          carries, core-integrated compound work, and bracket-
                          mandated power work now live HERE by default rather
                          than floating in unnamed post-architecture blocks.
                          Metabolic finishers may still follow it. Clinical
                          constraints govern selection as everywhere else (e.g.
                          a carry triggers the pelvic floor callout for a
                          postmenopausal client — that's correct, not a bug).
```

**Design requirements, all four stated by Xolokan as part of the method:**
1. **It must improve the ICONS Index.** Primary/secondary compound selection is drawn from the 10 core Baseline Testing Protocol movements (or their documented programmatic substitutes), with real programmed progression — the architecture exists to move the client's Index numbers, not just to fill a session. (The Full-Spectrum Progression Standard's all-10-movements mandate remains its own separately-scoped rule for women 40–55; this architecture serves Index improvement for every client regardless of bracket.)
2. **Hypertrophy in all muscle groups, bodybuilding format.** Across the program's week, every major muscle group gets genuine hypertrophy-oriented volume (the ≥10 sets/muscle/week target where the client's day count supports it), programmed in a bodybuilding format — straight sets, controlled tempo, the corrected RIR tiers (2 RIR primaries / 1 RIR hypertrophy-priority accessories).
3. **Built from all angles.** Multi-angle selection within each muscle group across the week — e.g. pressing across incline/flat/overhead planes, pulling across vertical/horizontal/angle variations, hip work across hinge/thrust/abduction patterns — not the same angle repeated. This is exercise *selection* guidance layered inside the block architecture; the Antagonist Rotation Rule continues to govern *order*.
4. **Smooth.** Sequencing flows — no awkward equipment or position jumps mid-block, transitions read as one continuous session. Judgment call at build time, spot-checked at audit.

**Uniqueness mandate:** every client's implementation of this format is built from that client's own three data sources — **Styku scan** (composition priorities, asymmetry), **Jason's SOAP notes** (correctives, tolerances, staged constraints, the slot-4 exercise), and **ICONS Index results** (tested baselines → working loads via `epley1RM()`/`workingLoad()`). Same skeleton, no two identical programs.

**What this does NOT override:**
- **Clinically-led clients stay clinically-led.** A client whose record carries a binding clinical constraint (Makai Brown's do-not-standard-program flag, a staged return ladder, a stop-signal) gets the clinician's structure FIRST, this architecture fitted around it — per the intake-pending build rules in `icons-expert.md`.
- **Trainer-directed formats stand.** Sarah's fast-paced/high-rep circuit format is her trainer Nick's explicit direction and is not converted to bodybuilding format by default; the block *order* principle (corrective → primary → accessory → secondary) still informs her circuit sequencing where compatible.
- The Three-Zone philosophy maps directly onto this (Corrective = Isolated zone, blocks 2–5 = Compound zone, existing metabolic finishers may still close a day after the secondary compound where programmed); the Antagonist Rotation Rule, RIR model, and all Science Layer thresholds apply unchanged inside it.

**Compound-slot exercise options (added 8/18/2026, Xolokan's direct instruction — "more exercise options for the compound block"):** every compound slot (Primary, Secondary, and Third/Integration) carries an **expert options menu** alongside its prescribed lift — 2–4 same-pattern alternates the coach running the session can select or rotate by the client's equipment, tolerance, and that day's readiness, stated in the block's intro (or an exercise `insight` where more natural). Rules: (1) the **ICONS-Index-tested movement stays the progression anchor** — its Wk1→Wk4 load line is what gets tracked and retested; options are same-pattern substitutions for a given session, not a fork in the progression; (2) options are **filtered by the client's clinical constraints before they're listed** — a hip-flagged client's hinge options all carry the same monitoring language, a shoulder-reintroduction client's press options stay inside the documented pain-free protocol (landmine press is the standard scap-friendly alternate), a scoliosis/axial-intolerant client's squat options are the non-axial vectors (belt squat, hip-belt variants) per the Scoliosis section; (3) same-pattern means same-pattern — a squat slot offers squat variants (goblet, box, split-stance, belt), a hinge slot offers hinge variants (hex bar, conventional, sumo, RDL, block pulls), a press slot press variants, an integration slot carry/complex variants — the Antagonist Rotation Rule's pattern taxonomy is the reference for what counts as "same"; (4) never list an option the client's record contraindicates just to fill the menu — 2 honest options beat 4 decorative ones. This mirrors the scapular expert-options rule below at compound scale.

**Shoulder-reintroduction addendum (added 8/18/2026, Xolokan's direct instruction, same day as the pilot):** when a client coming back from shoulder rehab/reconstruction has a reintroduced overhead press in the primary-compound slot, **follow the press with a static closed-chain stability hold** — the named example is shoulder taps held in the push-up/plank position (plank shoulder taps); quadruped variants are the regression. Rationale: after loading the reconstructed shoulder open-chain overhead, the closed-chain isometric immediately re-anchors scapular control under a stable base — and it matches Jason Bethea's own documented in-session pattern for shoulder clients (his SOAP notes for Aparna Rao and Heather Dolland both run this exact closed-chain progression: quadruped press → plank shoulder taps → bear-crawl holds). This deliberate press→isometric-hold pairing is not an Antagonist Rotation concern — the hold is a bodyweight stability drill, outside the rule's "multi-joint, real-load" scope, and the pairing itself is the prescription. **Scapular retraction blocks must carry expert exercise options, not a single default:** a scapular gate should offer a real menu (band pull-apart, scapular retraction-depression hold, scapular dead hang, scapular push-up, prone I's-T's-W's/Y-T-W raises, face pull, wall slide with lift-off, chest-supported scap-retraction row) so the trainer running the session can select and progress by what the client's control actually shows that day, rather than repeating one drill by default.

**Rollout conventions (codified 8/19/2026 from the batch 1–2 builds and audits — these were consistent precedent and are now spec, not judgment calls to re-derive):**
1. **Slot 1 is omissible, honestly.** A day with no documented corrective finding for its region omits slot 1 (or serves it with a genuine existing priming/activation block) — never generic filler. Kelly Mulroy's WED/FRI upper days are the reference case.
2. **Slot 4 consumed-by-corrective rule.** When a client's documented Jason Bethea exercises are themselves corrective (crab-walk primer, anti-valgus ladder, glute-med program), they live in slot 1 exactly as his documentation used them and slot 4 is omitted — no double placement, no filler. Aimee Morris Day A is the reference for a genuine slot-4 (his non-corrective shoulder/postural exercises, kept in his prescribed position).
3. **Integration-closer load anchoring.** A new slot-6 closer never gets an invented load: anchor BELOW the client's nearest documented tested/working number for the same implement/pattern, and say so in the intro or cue.
4. **Antagonist Rotation is walked on the FULL rendered day, across block boundaries.** More blocks per day (A–F/A–G post-restructure) means more boundaries — the defect class the Nicolette Scott batch-2 finding exposed. Inline per-block compliance comments are not evidence; see `icons-doc-auditor.md`'s corrected checklist item.
5. **Same-touch mirror rule.** A Block Method restructure (or any material revision) touches EVERY live document a client has in the same pass — Kelly's studio+travel pair and Nicolette's gym+at-home pair are the reference cases.

**Rollout status:** piloted first on one fully-instrumented client (Siobhan Hansen, 8/18–8/19/2026) before roster-wide application, per the same confirm-the-pilot-before-batch-producing discipline used for Client View and the Assessment Report. **Roster-wide rollout GREEN-LIT by Xolokan 8/19/2026** ("now we can green light the other clients docs to have this new method we just created") — proceeding in audited batches via the standard build→audit→fix→deliver pipeline. Scope: every active client with real program data on file. Explicitly OUT of scope: Sarah (trainer-directed circuit format stands, per the override above), the 10 intake-pending clients (build gate unmet — Styku + strength battery both required), Audrey Harnagel (active status unconfirmed). Clinically-led clients (Jake Poyner, Moe Shahheidari, Daisy Auger Dominguez) get the clinician's structure FIRST with this architecture fitted around it, per the override above. Each restructure also triggers the standing "touch it, bring it current" pass: Kieser renames for cable references, DB-ceiling implement decisions, deload-week placement where criteria are met, 4-week cadence language, load-field Wk1→Wk4 convention, and the warm-up drift check. See CLIENTS.md for which clients have been restructured to this architecture and when.

---

## EVIDENCE-BASED SCIENCE LAYER

This is the foundation of every programming decision. Do not deviate without flagging it.

### Age Bracket Programming Framework

Every client's program should be filtered through the age bracket below, layered on top of their individual Styku/ALST/VFA findings and any clinical flags. Brackets are proximity guides, not hard cutoffs — a 44-year-old postpartum client may sit closer to the 45–55 profile, and vice versa; use judgment. Each bullet below points to the detailed protocol elsewhere in this section rather than restating it — that section stays the single source of truth for the actual numbers.

**Demographic scope rule.** These five brackets, and every numeric threshold in the Evidence-Based Science Layer below (ALST cutoffs, protein tiers, LIFTMOR candidacy, pelvic floor protocol), are validated for the stated target population: women. When a client falls outside that, do not silently apply the women's numeric thresholds by default, and do not silently invent a parallel framework either.

- **Male clients** (e.g. Jake Poyner, Vinz Feller): a real, cited framework now exists for this — see "MALE CLIENT PROGRAMMING FRAMEWORK" immediately after this Evidence-Based Science Layer section. Use its ALST/protein/creatine/testosterone/VFA/BMI/bone-loading thresholds rather than reporting raw Styku numbers with no clinical interpretation, and rather than reaching for the women's numeric thresholds by default.
- **A population neither framework covers** (a client meaningfully younger than 20-35, e.g. an adolescent, or any other genuinely out-of-scope case): apply the sex-neutral structural philosophy (three-zone Isolated→Compound→Metabolic build, RIR/RPE autoregulation, corrective-before-compound sequencing) since that transfers, and explicitly flag in the client's document which numeric thresholds were NOT applied and why — the same way Jake Poyner's and Vinz Feller's programs each carry a dedicated note explaining the scope decision rather than burying it in code. Per the standing trigger at the top of the Male Client Programming Framework section, treat onboarding a client from any such population as the moment to research and build out that population's framework in this file, not just document the gap and move on.
- **A client with NO demographic data at all** (no age, no sex on file, no scan — only trainer-observed movement constraints; e.g. Sarah, built 8/18/2026, and several of the 8/18 intake-pending SOAP-note clients whose notes state neither DOB nor sex): this is a THIRD case, distinct from the two above, and it was previously unhandled — added 8/18/2026. The two bullets above both assume you know enough about the client to determine that she or he falls outside a framework. Here you cannot determine which framework applies at all, which means the correct posture is not "pick the nearest bracket and proceed cautiously" — it is to apply only what is genuinely sex- and age-neutral and say so explicitly. **What transfers with no demographic data:** the three-zone Isolated→Compound→Metabolic structure, RIR/RPE autoregulation and the RIR calibration protocol, corrective-before-compound sequencing, the Antagonist Rotation Rule, full-ROM-with-control coaching, and progression governed by observed performance and symptom response rather than by any threshold. **What must NOT be applied, and must be stated as not applied in the document:** every numeric threshold in this layer without exception — ALST cutoffs (sex-specific), protein g/kg tiers (require weight AND a context determination), creatine indication tiers (age/status-driven), LIFTMOR candidacy, VFA/BMI interpretation, pelvic floor auto-triggers, the Full-Spectrum Progression Standard, and the ICONS Intensity Framework's novice-vs-trained tiering (which requires knowing training age). A no-data client's document should carry a single explicit scope note naming this — the same way Jake Poyner's and Vinz Feller's do for the male-scope case — rather than quietly shipping a program whose thresholds were all silently skipped. **This is a data gap, not a population gap**, so unlike the bullet below it does NOT trigger a research pass to build a new framework — there is no population to research. It triggers an INTAKE request instead: age and sex are the two fields that unlock the most downstream clinical content per unit of effort, and asking for them should be the default follow-up on any no-data build.
- **The "ICONS Index Full-Spectrum Progression Standard" (all 10 core Baseline Testing Protocol exercises must show programmed progression)** is scoped to women 40–55 specifically (see that standard, under "ICONS BASELINE TESTING PROTOCOL" below) — the same non-transfer rule applies: don't silently extend that specific mandate to women outside 40–55 or to male clients without a dedicated research pass validating it for that population first.

This is a standing decision rule, not a one-off judgment call specific to any one client.

**Method Selection Principle — best-evidenced bracket per client, not a universal rule (added 8/13/2026, at Xolokan's direction).** When choosing a specific training method or parameter — rep range, bone-loading protocol, power-training inclusion, protein/creatine tier, RIR target, whether a corrective circuit is warranted — select whichever age/sex-bracket-specific finding is most significant and best-supported for that particular client's actual demographic profile, rather than adopting one method as a blanket rule applied to every client regardless of bracket. This file's bracket structure already exists for exactly this reason (the women's five brackets, the male three-bracket structure, EWGSOP2's separate ALST cutoffs by sex, LIFTMOR's postmenopausal-specific bone-loading evidence, the Mayo Clinic Proceedings power-training data broken out by sex) — the direct trigger for stating it as an explicit principle was the 8/13/2026 rep-range question below, where the correct answer was "rep range should vary by goal/zone, governed by RIR — not a fixed 8-12 applied to everyone" precisely because the strongest evidence (ACSM 2026, Schoenfeld 2021, Robinson et al. 2024) supports goal/context-dependent prescription over a universal number. Apply the same logic to every other method choice: reach for whichever bracket's cited evidence is strongest and most specific to the client actually in front of you, and do not silently default to whichever method happens to be used most often across the roster.

**20–35 — Foundation & Peak Bone Mass**
- Protein: ≥1.6 g/kg/day ("Active women general" tier)
- Creatine: indicated (not yet the "strongly indicated" tier by age alone — that's driven by ALST/postmenopausal status, not age in this bracket)
- Menstrual cycle: no phase-based programming — autoregulate around individual symptoms over ≥3 cycles, train hard year-round
- Volume/frequency: full ≥10 sets/muscle/week hypertrophy target, 2–3×/week per muscle group — never under-load
- ACL/lower-limb neuromuscular injury-prevention circuit is highest-yield here for clients in field/court sports (2.8× male incidence) — per the corrected "ACL / Knee Valgus / Neuromuscular Injury-Prevention Circuit" section below, deliver it as a universal, dosed program component for this population, not gated behind a positive valgus screen
- Copenhagen plank / adductor injury prevention is highest-yield here for athletic/team-sport clients
- Heavy compound lifting still contributes to building peak bone mass — no need to wait for LIFTMOR-style candidacy criteria to justify loading
- Watch energy availability in athletic/high-training-volume clients in this bracket — Relative Energy Deficiency in Sport (RED-S) suppresses bone density and raises stress-fracture risk even in clients who read as lean/fit on a scan; a BMI or body-fat reading that looks "fine" does not rule this out if training volume is high and intake hasn't been discussed

**35–45 — Transition Onset**
- Protein: 1.6 g/kg/day baseline (corrected 8/17/2026 — no longer trended upward by age alone; see "Protein Targets" below). Move toward the upper end of the 1.6–2.2 g/kg range only if the client is in an energy deficit or carrying a heavy training load, not simply because she's crossing 40
- Creatine: move to "strongly indicated" once the client crosses 40
- Watch for early perimenopausal signals (cycle irregularity, symptom shifts) — still autoregulate on individual data, not calendar or age alone. This is a genuinely early bracket for it: perimenopausal symptoms can begin in the early-to-mid 30s, well before the ~45 average onset, so "she's too young for this" is not a safe assumption to bring into an intake conversation. See "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" below for what's reasonable to ask about this at intake
- Volume/frequency targets unchanged from the 20–35 bracket — no physiological reason to reduce load yet
- Begin ALST/VFA monitoring at the first Styku scan if not already established, even though risk is typically still low
- If a client mentions she's on a GLP-1/anti-obesity medication (semaglutide, tirzepatide, etc.), see "GLP-1 / Anti-Obesity Medications" below — treat as a standing ALST-preservation priority regardless of her current ALST number
- For a client 40+ within this bracket, see "ICONS Index Full-Spectrum Progression Standard — Women 40–55" below — her program should show programmed progression across all 10 core Baseline Testing Protocol exercises, not just her strongest or most-tested lifts

**45–55 — Perimenopause / Menopause Transition**
- Protein: 1.6 g/kg/day baseline (corrected 8/17/2026 — the prior age-triggered escalation to 1.8–2.2 g/kg is retired; see "Protein Targets" below for the full corrected framing and why the 8/13/2026 age-50-OR-gate reconciliation is superseded, not just refined). Move up within the 1.6–2.2 g/kg range for a genuine energy deficit or heavy training load, or when ALST flags At-Risk — not for turning 50 or reaching a particular bracket by itself. The most current female-specific synthesis found in this review (GSSI/Phillips, Nov 2025) states peri- and postmenopausal athletes likely need no different protein target than premenopausal athletes.
- Creatine: strongly indicated
- Heavy RT ≥3×/week is strongly evidence-backed through this transition, at whatever protein target the client's actual context (deficit/training load/ALST) supports — not a flat 2.0–2.2 g/kg by bracket alone; HRV dips in luteal-equivalent phases are NORMAL — interpret against the client's individual baseline, not a flat line
- Start screening for LIFTMOR-style bone loading candidacy (T-score < -1.0) as estrogen decline accelerates
- ALST monitoring becomes a priority — sarcopenia risk begins rising through this window
- Perimenopausal status is frequently ambiguous at intake in this bracket — neither confirmed premenopausal nor confirmed postmenopausal. See "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" below for what's reasonable to ask at intake without overstepping into diagnosis, and why an unconfirmed status should still trigger pelvic-floor caution rather than default to "not postmenopausal" — that section's evidence says the transition window itself, not confirmed postmenopausal status, is the higher-risk period for stress urinary incontinence specifically
- See "ICONS Index Full-Spectrum Progression Standard — Women 40–55" below — her program should show programmed progression across all 10 core Baseline Testing Protocol exercises

**55–65 — Postmenopausal**
- Protein: 1.6 g/kg/day baseline, moving up toward 2.2 g/kg/day for a genuine energy deficit, heavy training load, or ALST At-Risk (corrected 8/17/2026 — not an automatic bracket-based 2.0–2.2 g/kg tier; see "Protein Targets" below)
- Creatine: strongly indicated
- Bone loading: LIFTMOR protocol directly applicable if T-score < -1.0 — frame as "bone investment," never as risk
- Pelvic floor triggers apply to every heavy carry/squat/deadlift/hip thrust session
- ALST At-Risk is the top programming priority when flagged — protein/creatine escalation, resistance-priority sessions
- VFA/cardiometabolic monitoring carries more weight given metabolic shifts post-menopause
- Power training (moving a sub-maximal load with maximal intent — see "Power Training — Fall Risk & Longevity" below) belongs in this bracket already, not just 65+; power output starts declining before strength does

**65+ — Older Postmenopausal**
- Protein: same corrected context-driven framing as 55–65 (1.6 g/kg/day baseline, up toward 2.2 g/kg/day for deficit/training-load/ALST At-Risk) — note this now sits ABOVE geriatric-consensus general guidance (PROT-AGE/ESPEN recommend ≥1.0–1.2 g/kg/day for healthy older adults generally), which is appropriate for an actively resistance-training population but should not be read as an age-65+ escalation in its own right
- Creatine: strongly indicated — cognitive benefits are well-supported here; treat bone-density benefit as plausible but not settled (see Creatine section below)
- Bone loading: LIFTMOR candidacy screening remains a priority, framed consistently as "bone investment"
- Pelvic floor protocol applies identically to the 55–65 bracket
- ALST At-Risk / sarcopenia prevention remains the top physiological priority
- Favor movements with direct functional/fall-risk transfer (carries, step-ups, single-leg work, and explicit power/velocity work) alongside the standard compound lifts — this is now evidence-backed, not just general good practice: see "Power Training — Fall Risk & Longevity" below

### ALST Index (Appendicular Lean Soft Tissue) — EWGSOP2 2018 (corrected 8/17/2026 — sex-conflation error)
```
< 5.5 kg/m²  → AT-RISK for sarcopenia ← programming priority shift
≥ 5.5 kg/m²  → Within normal reference range (women) — a trend metric, not a graded "how good" score
```
**Corrected 8/17/2026, per an external evidence review (Brace Life / ICONS Methodology — External Evidence Review, 8/17/2026) — this was the single most consequential finding in that review.** The prior version of this table treated 5.5 and 7.0 kg/m² as two rungs of one severity ladder for women ("5.5–6.99 = Normal-monitor," "≥7.0 = Optimal"). That is wrong: EWGSOP2's actual cutoffs are sex-specific, not a graded scale — <7.0 kg/m² is the MALE at-risk threshold (already correctly used in the Male Client Programming Framework below) and <5.5 kg/m² is the FEMALE at-risk threshold (EWGSOP2, *Age and Ageing* 48(1):16–31). There is no female "≥7.0 = Optimal" tier in EWGSOP2 or any other consensus body reviewed — 7.0 sits roughly 1.5 kg/m² above where a healthy woman's ALST typically falls, meaning the old "Optimal" band was asking most healthy female clients to hit a number derived from men. Applied to a predominantly female roster, the old bands systematically pathologized normal muscle mass (a woman at 5.8 read as "Normal — monitor," not simply normal) while holding out an unreachable, misapplied "Optimal" target.
**EWGSOP2 does not treat lean-mass index as the primary sarcopenia criterion, and neither should this file.** In the actual EWGSOP2 algorithm, low muscle *strength* (grip <16 kg women / <27 kg men) is the primary indicator; low muscle quantity (ALST/ASM) only *confirms* a diagnosis already suggested by low strength; and low physical performance (gait speed ≤0.8 m/s, five-times chair-stand >15 s, SPPB ≤8) grades severity. EWGSOP2 itself states plainly that "some cut-off points are arbitrary at this time." A 2020 alternative framework (SDOC, Cawthon et al., *JAGS* 68:1429–1437) goes further and excludes DXA-derived lean mass from its sarcopenia definition entirely, having found it "not consistently associated" with falls, mobility limitation, hip fracture, or mortality in pooled cohort data — SDOC defines sarcopenia by grip strength plus gait speed alone, listing ALM/height² only as a secondary variable. AWGS 2019 (the Asian Working Group) uses a lower female cutoff (<5.4 kg/m² by DXA) and a threshold that shifts with the measurement device (<5.7 by BIA).
**Add two zero-cost function screens the consensus bodies actually weight above mass.** Grip strength (hand dynamometer, flag <16 kg women / <27 kg men per EWGSOP2) and the five-times chair-stand test (flag >15 s per EWGSOP2, >12 s per AWGS) convert this from a single unvalidated proxy into something resembling a real consensus algorithm, at the cost of a $30–50 hand dynamometer.
**A genuine measurement-validity gap: ALM/ALMI from 3D optical scanning (Styku) is not validated in the published Styku study.** The peer-reviewed Styku S100 validation (Bennett et al., *Clinical Nutrition* 41:211–218, n=188, 102 women, DXA-calibrated, vs. Hologic DXA) reported fat-free mass, fat mass, %BF, and VAT — but did NOT report or validate ALM or ALMI at all; the authors flag skeletal muscle mass explicitly as future work. A separate 3D-optical study (different device, not confirmed as Styku) estimated DXA ALM at r²=0.96, RMSE 1.5 kg under cross-validation — for context, an RMSE of ~1.5 kg total-body ALM is roughly ±0.55 kg/m² of ALMI on a 1.65 m woman, which is on the order of the entire width this file used to treat as meaningful around the 5.5 cutoff. **Practical consequence: present ALST Index to clients and trainers as a trend metric with a stated reference floor (<5.5 = at-risk, tracked over time), not as a precise risk classification or a graded "how good is my muscle mass" score.** See "3D Optical Scanning — Validity & What It's Actually Good For" below for the fuller measurement-validity discussion (VFA, %BF, segmental composition) this same review surfaced.
**When ALST < 5.5:** Muscle-building is the primary physiological goal. Every session prioritizes progressive resistance. Protein target escalates. Creatine is strongly indicated.

**Use Styku's reported ALST value** — their calculation differs from manual (arm + leg LST / height²). Note the validity caveat above when interpreting it.

### 3D Optical Scanning — Validity & What It's Actually Good For (new section, 8/17/2026)
```
Why this section exists: ICONS uses Styku as the measurement backbone for
  ALST (Item 1 above), VFA, %BF, and circumferences — but this file never
  had a single place stating what the device is actually validated to do.
  Built in response to the external evidence review's dedicated measurement-
  validity item, which found the device is being asked to do more
  diagnostic work than its own validation supports.

Against DXA (the practical comparator, not the gold standard): performs
  well on WHOLE-BODY totals, with wide INDIVIDUAL limits of agreement. The
  peer-reviewed Styku S100 v4.1 validation (Bennett et al., Clinical
  Nutrition 41:211-218, n=188, 102 women, DXA-calibrated) found excellent
  test-retest PRECISION (FFM CV 0.75%, FM CV 1.94%, %BF RMSE 0.60, VAT CV
  3.67% — actually better than DXA VAT's own 8.61% CV) but a %BF limit of
  agreement spanning roughly 18 percentage points — meaning a single scan
  can differ from DXA by 7-11 points in an individual client even though
  group-level bias is under 2 points. This is exactly the profile of a
  good TREND-tracking tool and a poor DIAGNOSTIC one: excellent precision
  (repeat scans on the same person agree tightly), moderate accuracy
  (any single scan's absolute number carries real individual-level error).

Against a true 4-compartment-model criterion (not just DXA): validity is
  POOR. Tinsley et al. (Appl Physiol Nutr Metab 46:644-650) found 3D
  optical scanning showed "poor validity" vs. a 4C model — %BF overestimated
  by 5.31 points vs. 4C, 4.20 points vs. DXA alone. Because optical
  scanners are calibrated TO DXA, agreement with DXA is partly built into
  the calibration itself — agreement with the underlying physiology (the
  4C criterion) is weaker than the DXA comparison alone suggests.

Segmental (arm/leg/trunk) composition is NOT reliable — do not report it
  as accurate. Segmental volumes agreed poorly with DXA in the Bennett
  validation (differing body-partition definitions between devices), with
  CCCs on the order of ~0.32-0.52 in comparable optical-vs-DXA segmental
  work — unsuitable for client-facing precision claims. This directly
  reinforces (does not newly introduce) the corrected Asymmetry Protocol
  above, which already moved away from treating an absolute segmental L/R
  gap as precise.

Change-tracking — the actual ICONS use case — performs moderately, and
  BETTER in women specifically. A longitudinal study (Fit3D, n=133, 45
  women) found female ALM CHANGE R²=0.70 (RMSE 0.37 kg) vs. male ALM change
  R²=0.52 (RMSE 0.52 kg), and female FM change R²=0.86 (RMSE 1.98 kg).
  Sub-kilogram RMSE on ALM change is genuinely useful for tracking a
  12-week training block — this is the device's real strength.

Circumferences are the device's single most trustworthy output: ICC≈0.99
  reliability (Styku's own published study list). Pair circumference data
  with waist circumference specifically, interpreted against the IAS/ICCR
  female thresholds (see corrected VFA section above) — this turns the
  device's most reliable measurement into its most clinically endorsed one.

ALM/ALMI (the number ALST is built from) was NOT reported or validated in
  the peer-reviewed Styku validation study at all — see the ALST Index
  section above for the full detail on this specific gap.

No calibration-interval guidance exists in the literature. Despite
  targeted searching, no source recommends how often an optical scan
  should be paired with DXA/BIA/skinfolds for calibration or drift-
  checking — this appears to be a genuine, unaddressed gap in the
  literature, not an oversight in this review. Any ICONS policy on
  rescan/calibration cadence is necessarily a REASONED INTERNAL CHOICE,
  not an evidence-based standard — state it that way to clients rather
  than implying a validated interval exists. A defensible starting policy:
  one baseline DXA and one at 6-12 months for any client whose scan output
  drives clinical-sounding language (sarcopenia risk, visceral fat risk) —
  labeled explicitly as studio policy, not a guideline.

PRACTICAL SUMMARY — how to talk about a Styku scan going forward:
  1. Frame every absolute number (ALST, VFA, %BF) as a trend indicator
     with individual-level uncertainty, not a precision diagnosis.
  2. Publish the uncertainty to clients rather than hiding it — e.g., "%BF
     may differ from a clinical DXA scan by up to roughly 7-11 percentage
     points for any one reading, while repeat scans on you personally are
     precise to well under 1 point." This is a trust asset (it explains
     why a number moves) not a liability.
  3. Standardize scan conditions rigorously (same time of day, hydration
     state, minimal clothing, hair position, posture) — precision is the
     device's real strength, and only a tight protocol preserves it.
  4. Do not report segmental composition as precise/diagnostic.
  5. Lean into circumferences + waist circumference as the headline,
     clinically-endorsed metrics.
  6. Add a hand dynamometer and a tape measure as low-cost ($<$100
     combined) second-modality triangulation for the two biggest
     validity gaps identified here and in the ALST section above.
```

### Protein Targets — re-keyed from age to context 8/17/2026 (ISSN 2017 + Nunes et al. 2022 meta-analysis + GSSI/Phillips Nov 2025 female-athlete synthesis)
```
Active women, baseline           : 1.6 g/kg/day
Energy deficit / heavy training  : 1.6–2.2 g/kg/day (context-driven — see below,
                                    NOT an age escalation)
ALST At-Risk                     : upper end of the 1.6–2.2 g/kg range
Per meal                         : ~0.3 g/kg (≈25–40g), 4 meals spaced 3–4h apart
Pre-sleep option                 : 30–40g slow-digesting protein (e.g. casein)
Plant-based clients              : add ~10% to whatever target otherwise applies
Leucine (approximate, not protocol-grade): ~3g/meal from a complete protein source
```
**Corrected 8/17/2026 — this replaces an age-banded escalation (1.6 →
1.8–2.0 at 40+ → 2.0–2.2 at 50+) that the external evidence review found is
not what current, population-specific literature supports.** What changed
and why:
- **1.6 g/kg/day remains the well-evidenced baseline** — unchanged. A
  meta-analysis of 74 RCTs (Nunes et al., J Cachexia Sarcopenia Muscle
  13:795-810) found ≥1.6 g/kg/day with resistance training improved lean
  body mass (SMD 0.30) and lower-body strength (SMD 0.40) vs. lower
  intake, and the ISSN position stand independently supports 1.4–2.0
  g/kg/day (Jäger et al., JISSN 14:20).
- **The age-banded escalation (40+, 50+) is retired.** The most current
  female-specific synthesis found in this review — a November 2025
  Gatorade Sports Science Institute review co-authored by Stuart Phillips
  — targets 1.4–1.6 g/kg/day for female athletes generally, reserves
  >1.6 up to 2.2 g/kg/day specifically for ENERGY RESTRICTION or heavy
  training load (not age), and states explicitly that peri- and
  postmenopausal athletes likely need no different protein target than
  premenopausal athletes (D'Souza & Phillips, GSSI Sports Science
  Exchange #270). Direct postmenopausal RCT evidence for pushing intake
  higher by age alone is weak: 1.2 vs. 0.8 g/kg/day in postmenopausal
  women doing resistance training produced only a small functional-
  capacity difference, with no difference in strength or lean-mass
  quality (Nutrients 11:1323). Geriatric consensus bodies (PROT-AGE,
  ESPEN) recommend ≥1.0–1.2 g/kg/day for healthy older adults generally —
  well below what the old ICONS bands implied age alone requires.
- **The 8/13/2026 reconciliation pass (see Research Update Log, seventh
  pass) is SUPERSEDED by this finding, not just refined.** That pass
  correctly identified that `proteinTargets()`'s `atRisk || ageYears >= 50`
  logic matched the prose at the time and concluded no change was needed —
  but it worked from Morton et al. 2018 alone, which is not menopause- or
  age-specific at all. This pass found a more current, population-specific
  source (GSSI/Phillips 2025) that directly contradicts the age-escalation
  premise both passes shared. Recorded here rather than silently
  overwritten, per this file's citation-integrity practice.
- **Per-meal target lowered from ~0.4 g/kg to ~0.3 g/kg** (≈25-40g,
  4 meals, 3-4h apart) — the old 0.4 g/kg figure exceeded both the ISSN's
  0.25 g/kg serving guidance and the ~0.31 g/kg/meal muscle-protein-
  synthesis-maximizing dose identified in the GSSI review.
- **Added, not previously present:** a pre-sleep 30-40g slow-protein
  option (ISSN-supported, low-friction way to hit daily totals), a +10%
  adjustment for plant-based clients (GSSI), and an explicit "leucine is
  approximate, not protocol-grade" caveat — the commonly cited ~3-4g/meal
  leucine threshold could not be independently verified to a primary
  source in this review.

**Engine consequence — flagged, not yet built.** `proteinTargets()` in
`icons_template.js` currently implements `atRisk || ageYears >= 50` — an
age-based trigger the corrected standard above no longer supports as
written. The corrected trigger is context-based (energy deficit or heavy
training load) OR ALST At-Risk, not age alone — but "energy deficit" and
"heavy training load" are not currently captured as structured client-data
fields anywhere in this system, so this is a real engine/intake change
(new fields, not just a formula edit), not a one-line fix. **Deliberately
not built in this pass** — same posture as the ALST/Asymmetry/ACL fixes
above: flagged for `icons-expert`/`icons-research-analyst` as real follow-up
work, and every current client document computed under the old age-banded
tiers needs individual review once the engine changes, not a blanket
regeneration under an unchanged formula.

### Energy Availability & Caloric Surplus for Lean-Mass Gain (2013-2023 evidence — new section, 8/18/2026)
```
Why this section exists: the Protein Targets section above is thorough, but
  nothing anywhere in this file stated that hypertrophy requires adequate
  TOTAL energy, not just adequate protein — a real gap surfaced by the
  Block Method pilot review: an underweight (BMI 17.4), ALST At-Risk
  client had protein and creatine prescribed with no eat-above-maintenance
  instruction at all. The file's own RED-S note (20-35 bracket) already
  acknowledges under-fueling risk without giving any surplus protocol.
  Confirmed via repo-wide search: "surplus"/"caloric"/"maintenance
  calories" had zero prior science-layer coverage.

The principle: a g/kg protein target hit inside an unintentional energy
  deficit undercuts itself — protein and total energy are COMPLEMENTARY
  levers, not substitutes. The Protein Targets section's "energy deficit"
  trigger (escalate protein when cutting) is the mirror image of this
  section: a client whose GOAL is lean-mass gain should not be in a
  deficit at all, intentional or accidental.

Evidence on surplus size — the honest state: the ~350-500 kcal/day
  "modest surplus" convention has mechanistic backing and practice
  precedent, but NO validated dose-response "sweet spot" exists.
  - Slater et al. (Frontiers in Nutrition 2019;6:131 — Slater, Dieter,
    Marsh, Helms, Shaw, Iraki) reviewed the question directly: the energy
    stored in 1 kg of skeletal muscle is ~5,000-5,200 kJ, and common
    recommendations run ~1,500-2,000 kJ/day (~360-480 kcal) in weight-
    stable athletes, up to an additional ~4,000 kJ/day for clients who
    struggle to gain — but the authors state plainly these estimates have
    NEVER been validated in a resistance-training population. Cite the
    convention as a reasoned starting point, not an evidenced dose.
  - Garthe et al. (European Journal of Sport Science 2013, n=39 elite
    athletes, 8-12 weeks, 4x/week strength training): a counseled ~506±84
    kcal/day surplus produced +2.7 kg body mass (+1.7 kg fat-free mass,
    +1.1 kg fat mass) — more total gain than ad libitum eating, but with
    a real fat-mass cost; the authors' own caution is that excess intake
    in a gain phase "should be considered carefully due to undesirable
    increases in body fat." Also practically useful: a majority of
    athletes reportedly failed to hit weight-gain targets even ON the
    prescribed 500 kcal plan — a prescribed surplus is a starting point
    that requires monitoring and adjustment, not a set-and-forget number.
  - Bigger is not better: a parallel-groups trial in trained lifters
    (Helms and colleagues — Sports Medicine - Open 2023;9, "Effect of
    Small and Large Energy Surpluses on Strength, Muscle, and Skinfold
    Thickness," maintenance vs. 5% vs. 15% surplus, 8 weeks, small sample
    — 17 completers, flag this when citing) found the larger surplus
    primarily accelerated FAT gain (skinfold thickness), with no clear
    additional hypertrophy or strength benefit over the smaller surplus.
    A modest surplus (~5-10% above maintenance, roughly the 350-500 kcal
    convention) is the defensible default; a large surplus is not a
    faster route to muscle for a non-novice.

When a surplus instruction belongs IN the client document (not just in a
  trainer's head): (1) underweight BMI (<18.5) — this client's document
  should carry an explicit eat-above-maintenance instruction alongside
  her protein/creatine targets, full stop; (2) ALST At-Risk where muscle-
  building is the stated primary goal; (3) any stated lean-mass goal with
  FLAT body-composition trends across rescans (lean mass not moving
  despite adequate protein and progressive training = the energy side is
  the likeliest missing lever). Conversely, a GLP-1 client is typically
  in a deficit BY DESIGN — her lever is protein adequacy inside the
  deficit (see GLP-1 section below), not a surplus; do not conflate the
  two cases.

BMR is not an intake target — a live documentation risk in this system:
  client documents quote Styku BMR (resting energy) prominently. BMR is
  below maintenance BY DEFINITION (maintenance = BMR x activity factor);
  a client who reads her BMR as "my calories" is eating in a deficit.
  Any document that states a BMR figure for a muscle-building client
  should state alongside it that total intake must sit ABOVE maintenance,
  not at BMR.

Monitoring-and-adjust framing, not fixed prescription: track scale-weight
  trend plus Styku rescan lean-vs-fat trend (the device's genuine
  strength is change-tracking — see "3D Optical Scanning — Validity"
  above; female fat-mass and ALM change tracking are its best-performing
  outputs). If weight is flat over 3-4 weeks on the starting surplus,
  adjust upward; if fat is accumulating disproportionately, trim. This is
  the same trend-metric posture this file already applies to ALST/VFA.

Underweight / older-adult / sarcopenic specifics — thin, stated honestly:
  no validated sarcopenic-specific surplus dose exists. The combined-
  intervention literature in sarcopenic older adults (protein/ONS/creatine
  + resistance training meta-analyses) supports supplementation WITH
  training for lean mass and strength but does not establish a kcal
  surplus number. The nearest citable anchor is the ESPEN geriatric
  guideline's guiding value of ~30 kcal/kg body weight/day for older
  persons, individually adjusted (Volkert et al., Clinical Nutrition
  2019; ESPEN practical guideline update 2022) — a clinical-nutrition
  reference point, not a hypertrophy prescription. Anabolic-resistance
  literature justifies the protein/leucine emphasis already in this file
  but was not found to justify a DIFFERENT surplus size for older
  clients — apply the same modest-surplus + monitor-and-adjust approach.

Referral boundary, same posture as HRT/GLP-1/TRT: a clinically
  underweight client (BMI <18.5) warrants a physician/dietitian
  conversation IN ADDITION to the training-side surplus instruction —
  unexplained low body weight has differential causes (malabsorption,
  thyroid, disordered eating, RED-S) that are not ours to rule out. The
  ICONS document states the training-nutrition principle (eat above
  maintenance to build muscle, here's a defensible starting range) and
  names the referral; it does not write a meal plan or diagnose why the
  client is underweight.
```

### Creatine (evidence-based for women) — refined 8/17/2026, verdict unchanged: strongest-evidenced item in the ICONS protocol
```
Dose    : 3–5g monohydrate daily (no loading phase) — confirmed well-supported
          as written. ISSN's "common questions and misconceptions" paper
          (Antonio et al., JISSN 2021) concludes explicitly: "a creatine
          loading phase is not required" at 3-5g/day (or 0.1 g/kg) for a
          minimum of 4 weeks to reach comparable saturation to loading.
          Cite ISSN 2021 and a 2026 Frontiers in Nutrition aging-specific
          review directly in client materials — both independently endorse
          this exact dose/no-loading/with-food combination.
Timing  : with food — confirmed (ISSN: carbohydrate or carb+protein appears
          to increase muscular creatine uptake, though performance outcomes
          may not differ)
Saturates: ~4 weeks (set this expectation explicitly with clients — no-
          loading is slower than loading by design; frame the slower
          saturation as a deliberate adherence/comfort tradeoff, since GI
          distress during loading phases measurably reduces adherence)
Indicated: all women in strength training
Strongly indicated: women 40+, ALST At-Risk, postmenopausal
Benefits: strength, power, sleep quality — all well-supported. Training
          pairing is non-negotiable: creatine WITHOUT resistance training
          did not increase lean mass in postmenopausal women over 2 years
          (ISSN 2021) — always message it paired with training, never as
          a standalone intervention.
Cognition: well-supported — memory, attention, and processing speed improved in
           5 of 6 reviewed older-adult trials (Nutrition Reviews systematic
           review, 2025). CORRECTED 8/17/2026 — do not imply the standard
           3-5g/day dose is what produced these cognitive benefits. Brain
           creatine uptake is slow/limited (only ~5-15% rise with
           supplementation), and the protocols that showed cognitive
           effects used substantially higher doses: 15-20g/day loading for
           3-7 days then 5-10g/day maintenance, or single studies at 5g/day
           for 6 weeks, 8g/day for 5 days, or 20g/day for 7 days. ICONS's
           standard 3-5g/day dose should not be marketed on cognitive
           grounds without this caveat.
Bone    : evidence is MIXED, not settled — refined 8/17/2026 with a body-
          mass-scaled option. Some trials show a benefit when creatine is
          paired with heavy resistance training (postmenopausal women at
          0.1 g/kg/day for 52 weeks attenuated femoral-neck/hip bone-
          mineral loss); a well-designed 2-year RCT (237 postmenopausal
          women, 0.14 g/kg) found NO BMD effect, though proximal femur
          geometry improved; a 24-week trial found appendicular lean mass
          gains with no bone effect. Note 0.1 g/kg/day is ~6-7g/day for a
          65kg woman — ABOVE ICONS's standard 3-5g band. Offer this as an
          optional body-mass-scaled tier (0.10-0.14 g/kg/day) for bone-
          loading-focused/LIFTMOR-candidate clients specifically, while
          keeping 3-5g/day as the general default. Coach it as a
          strength/cognition supplement with a possible, dose-dependent
          bone upside, not a guaranteed bone intervention — LIFTMOR-style
          loading is the settled bone protocol, creatine is not a
          substitute for it.
Form    : insist on creatine monohydrate specifically — ISSN states other
          forms (creatine HCl, buffered creatine, etc.) are not superior.
Safety  : no compelling evidence of harm at doses up to 30g/day for 5 years
          in healthy or clinical populations (ISSN 2021); weight gain is the
          only consistently reported side effect. FDA GRAS status (2020).
```

### Collagen (Shaw et al. 2017 AJCN) — timing and claims corrected 8/17/2026
```
Dose   : 15g collagen + ~50mg Vitamin C — correct as written, matches the
         literature almost exactly (Shaw used 48mg vitamin C; a separate
         follow-up study used 50mg)
Timing : 45–60 min BEFORE loading session — corrected from "30-60 min."
         Shaw et al.'s actual protocol dosed 1 HOUR pre-exercise for the 15g
         dose; the authors themselves noted a smaller (5g) dose would have
         been better timed at 30 min, meaning the 30-minute end of the old
         window was never actually studied at ICONS's 15g dose. Drop "30
         min" as an equivalent option for the 15g protocol.
Requires: mechanical load to be effective
Framing — reposition from acute to chronic, corrected 8/17/2026: this is a
  12+ week connective-tissue SUPPORT protocol taken consistently on
  training days, not a pre-workout performance aid. A January 2026 umbrella
  review (16 meta-analyses, 113 RCTs, 7,983 participants) explicitly
  describes collagen's effect as "chronic and structural rather than
  acutely ergogenic" — it found a positive effect on tendon MORPHOLOGY
  (SMD 0.65) but at low certainty (only 4 RCTs/127 participants), and NO
  effect on tendon mechanical properties. A separate meta-analysis of 13
  RCTs (450 participants) concluded collagen peptide supplementation does
  NOT further improve musculoskeletal PERFORMANCE when added to exercise
  (Kirmse et al., Dtsch Z Sportmed 75:179-188) — do not claim a performance
  benefit; the acute "doubles collagen synthesis markers" framing overstates
  what the current evidence base supports for actual outcomes.
Priority: rank below creatine and protein in the client supplement
  hierarchy — creatine rests on ISSN position stands, protein on multiple
  large meta-analyses; collagen rests on a small number of tendon-specific
  RCTs with a notable female-data gap (only 155 of 768 participants in the
  largest supporting review were women).
```

### Bone Loading — LIFTMOR RCT (Watson & Beck 2018) — corrected 8/17/2026: intensity number, supervision, risk gate
```
Stimulus : >85% 1RM compound lifts (CORRECTED from "≥80%" — the actual
  LIFTMOR trial (Watson et al., JBMR 2018, n=101, mean age 65±5) prescribed
  5×5 at >85% 1RM, not 80%. HiRIT as defined in current reviews (e.g.
  Exercise for Postmenopausal Bone Health review 2025) also includes IMPACT
  loading generating ground reaction forces >4× body weight, and MEDEX-OP's
  HiRIT arm included 5×5 assisted jumping — if ICONS's protocol omits the
  impact component, it is running "HiRT" (heavy resistance training), not
  "HiRIT" (heavy resistance AND IMPACT training), and should say so plainly
  rather than implying the full LIFTMOR stimulus.
Frequency: 2×/week, supervised — MUST be stated explicitly as supervised.
  LIFTMOR, MEDEX-OP, and the 2025 pelvic-floor safety analysis were ALL
  delivered as fully supervised sessions; the UK "Strong, Steady and
  Straight" consensus (BJSM 2022) independently states resistance exercise
  for bone health is "ideally supervised." Do not prescribe >85% 1RM 5×5
  as unsupervised homework for a postmenopausal client.
Safe in  : postmenopausal women WITH low bone mass (T-score < -1.0) — AND
  a mandatory risk-stratification gate before entry, added 8/17/2026: a
  client with a prior vertebral fracture, multiple low-trauma fractures, or
  very low BMD should be routed to individualised physiotherapist input
  FIRST, not straight into the protocol — per both the UK consensus (BJSM
  2022) and Bone Health & Osteoporosis Foundation guidance. The concrete
  reason this gate matters: in MEDEX-OP (JBMR 2021), one HiRIT participant
  sustained a grade-2 L2 wedge compression fracture after a fall (possibly
  squat-associated), and 30 falls occurred across 24 participants (21%,
  no between-group difference) — fall risk, not lifting load itself, was
  the proximate mechanism of harm in the trial evidence. Add balance/fall-
  prevention work alongside the loading protocol for this reason.
Ramp-in  : added 8/17/2026 — several weeks of technique-first, lower-
  intensity loading BEFORE reaching >85% 1RM, per both the UK consensus
  ("lower intensity exercise ensuring good technique is recommended before
  increasing intensity levels") and LIFTMOR's own supervised, progressive
  trial design. ICONS's Teal (technique) day is the natural vehicle for
  this ramp-in phase — use it explicitly for bone-loading-candidate
  clients working toward LIFTMOR-level intensity, not just as a generic
  "light day."
Spinal precaution: added 8/17/2026 — codify a loaded-spinal-flexion
  prohibition in all postmenopausal bone-loading programming. The UK
  consensus explicitly instructs avoiding loaded spinal flexion and
  "repeated or end-range flexion," and BHOF cautions against forward-
  bending/twisting movements for very-low-BMD clients.
Result   : lumbar spine BMD +2.9±2.8% vs -1.2±2.8% control (p<0.001);
  femoral neck BMD +0.3% vs -1.9% (p=0.004); femoral neck cortical
  thickness +13.6% vs +6.3%; compliance 92±11%; only one adverse event
  (minor lower back spasm) in the original LIFTMOR trial. A follow-up
  kyphosis analysis found HiRIT "did not induce vertebral fracture" and
  improved thoracic kyphosis significantly vs. control.
Frame as : "bone investment" not "heavy lifting"
Supplement: impact loading (jumps, drop landings) for hip bone — this is
  now understood as part of the core HiRIT stimulus itself (see above),
  not merely a supplementary add-on.
Pelvic floor safety (new, 8/17/2026): a 2025 MEDEX-OP pelvic-floor
  quality-of-life analysis (n=115) found HiRIT at >80% 1RM "does not
  aggravate symptoms of pelvic floor dysfunction," with a preliminary
  protective signal in women with a history of pelvic organ prolapse —
  directly supports offering heavy bone-loading work to a pelvic-floor-
  flagged client rather than defaulting to lighter loads out of caution.
Corroborated: 2025 systematic review/meta-analysis (17 RCTs, n=690) confirms
  resistance training improves BMD at lumbar spine, femoral neck, total hip,
  and trochanter in postmenopausal women; high-intensity strength training
  outperforms low/moderate intensity specifically at spine and hip; combined
  aerobic + resistance training is the single most effective modality for
  lumbar BMD specifically — worth defaulting to for clients who already do
  cardio elsewhere in their week, not an either/or against the lifting.
Evidence-base transparency (added 8/17/2026): be honest with clients that
  the strongest supporting data come from one research group's trial line
  (Watson et al./Griffith University/The Bone Clinic) plus that group's
  own real-world clinic data — no independent replication RCT outside
  that research line was located in this review. This does not undercut
  the protocol; it's a transparency practice consistent with how this file
  already flags other single-research-line evidence elsewhere.
Divergence from conservative professional guidance: the UK "Strong, Steady
  and Straight" consensus (BJSM 2022) is more conservative than LIFTMOR,
  recommending an 8-12RM formulation (not >85% 1RM 5×5) as the practical
  default outside a specialized clinic setting, while acknowledging
  "supervised progressive resistance training at higher intensity is
  likely to have greatest effects on BMD." Read as: LIFTMOR's intensity is
  the evidence-backed ceiling for a supervised, risk-screened client;
  8-12RM is the safer default where supervision or risk-screening is
  less certain.
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

### Scoliosis & Resistance Training (2015-2025 evidence — new section, 8/18/2026)
```
Why this section exists: confirmed via repo-wide search that scoliosis had
  ZERO prior coverage anywhere in this file, despite spinal-loading topics
  (bone loading, loaded spinal flexion, pelvic floor bracing, lumbar
  positioning) being covered extensively. Triggered by the mandatory
  research-coverage check at NEW CLIENT ONBOARDING: Samantha Swan (28,
  intake-pending, no plan built yet) has a documented left-sided scoliosis
  with a directional preference and a documented loaded-hip-hinge
  intolerance in Jason Bethea's SOAP-note archive. Written BEFORE her
  document is built, which is the point of that check.

READ THIS FIRST — the honest state of the evidence, which is NOT the same
  as OA or lymphedema. This file's two most recent condition sections (OA,
  breast-cancer/lymphedema) both concluded that the historically cautious
  "restrict load to protect the structure" instinct is the outdated one,
  contradicted by strong RCT evidence. DO NOT pattern-match that conclusion
  onto scoliosis. No RCT of progressive resistance training in adults with
  scoliosis was located in this pass — not a positive one, not a negative
  one. The honest position is that the evidence is thin in BOTH directions:
  there is no good evidence that heavy compound lifting harms a skeletally
  mature adult with scoliosis, and no good evidence that it is safe at
  LIFTMOR-style intensity either. Say that plainly rather than borrowing
  confidence from an adjacent section.

Scope distinction that matters more here than in any other section: nearly
  all scoliosis exercise evidence is in ADOLESCENT idiopathic scoliosis
  (AIS), during growth, with Cobb-angle progression as the primary
  outcome. A skeletally mature adult is a different clinical problem —
  the goals are pain, function, and quality of life, not curve
  correction — and AIS trial results do not transfer cleanly. Three
  distinct populations, do not conflate: (1) AIS (growth phase, where
  the RCTs are); (2) adult idiopathic scoliosis (ADIS — an adolescent-
  onset curve carried into adulthood, which is the likely picture for a
  28-year-old client); (3) adult degenerative/de novo scoliosis (a
  curve arising after skeletal maturity from disc/facet degeneration,
  more common in this file's 55-65/65+ brackets and closer in character
  to the Osteoarthritis section above than to AIS).

Standing guideline: the 2016 SOSORT guidelines (Society on Scoliosis
  Orthopaedic and Rehabilitation Treatment) remain the most current full
  guideline set located in this pass — same "most current version found,
  not superseded" caveat already used for the ACR 2019 OA guideline and
  the ACSM 2019 exercise-oncology roundtable. A SOSORT 2025 congress was
  held (Dubrovnik) but no published 2025 guideline replacement was
  found. Note the 2016 guidelines are explicitly scoped to "idiopathic
  scoliosis DURING GROWTH" — they are an adolescent document being used
  as the nearest available reference for adults, which is itself a
  stated limitation, not a silent assumption.
PSSE (Physiotherapeutic Scoliosis-Specific Exercises) is the SOSORT-
  endorsed umbrella term covering the recognized schools (Schroth, SEAS,
  BSPTS, FITS, Lyon, Side Shift, DoboMed). Its four consensus principles:
  auto-correction in three dimensions, training in activities of daily
  living, stabilization of the corrected posture, and patient education.
  SOSORT specifies PSSE programs be designed by a therapist trained in
  the specific approach and individualized to the client's curve pattern
  — i.e., PSSE is NOT something an ICONS trainer designs; it is the
  coordinating clinician's domain, and ICONS's job is to build strength
  work that respects it. Same referral-not-prescribe posture used
  throughout this file.

Adult-specific evidence — thin, but it exists and it is directionally
  positive: Negrini A, Negrini MG, Donzelli S, Romano M, Zaina F,
  Negrini S, "Scoliosis-Specific exercises can reduce the progression of
  severe curves in adult idiopathic scoliosis: a long-term cohort
  study," Scoliosis 2015;10:20 (ISICO, Milan). Retrospective cohort,
  n=34 adults with ADIS (5 men, 29 women, mean age 38.0±11.0), treated
  exclusively with SEAS auto-correction-based exercises at ≥2 sessions/
  week of 45 min. Flag the design honestly when citing it: retrospective,
  small, single-institute, no control arm, and from the research group
  that developed SEAS — the same single-research-line transparency
  caveat this file already applies to LIFTMOR/Watson et al. It is the
  clearest adult-specific evidence located, not a strong one.
Directional preference / auto-correction is an evidence-consistent
  concept, not a trainer improvisation. Auto-correction — actively
  reducing the deformity through three-dimensional postural realignment
  — is the defining principle of the Schroth method and of PSSE
  generally, and asymmetric spinal-stabilization exercise deliberately
  targeting the concave-side paraspinals is a described, trialed
  approach in AIS RCTs (e.g. Schroth + asymmetric spinal stabilization
  vs. control, adolescent RCTs, PMC11644102 / PMC10838577). Practical
  consequence for ICONS: when a coordinating clinician documents a
  directional preference (a movement direction that opens the concavity
  and is tolerated, vs. one that closes it and provokes symptoms), that
  is a legitimate clinical finding to program around — treat it the same
  way this file treats a physician-issued cardiac HR ceiling: the
  clinician's specific finding is authoritative, and ICONS's job is to
  build around it, not to re-derive or override it. Concretely: a
  bilateral or symmetric drill performed to the WRONG side can itself be
  the provoker (documented in Samantha Swan's note — a bear-crawl
  lateral-flexion drill run toward the closing side provoked symptoms
  mid-session), so a scoliosis client's document must state the
  direction explicitly on any lateral-flexion/rotation exercise rather
  than leaving side selection to whoever runs the session.

Axial load — what the evidence actually supports, and what it doesn't.
  The strongest mechanistic data located is a subject-specific
  musculoskeletal modeling study (Frontiers in Bioengineering and
  Biotechnology 2020;8:159, n=24 mild-to-moderate AIS, models built from
  spatially calibrated biplanar radiographs): the spinal deformity alone
  produced a ~10% increase in compressive force at the curve apex in
  unloaded standing, and apical compressive force then rose by 50-62%
  under a simulated 10%-bodyweight load, 77-94% at 15% BW, and 103-128%
  at 20% BW. The important feature is the NON-LINEARITY — apex load
  amplifies faster than the external load does. What this justifies:
  preferring load vectors that bypass axial spinal compression (hip-belt/
  Kaiser belt-harness squat, trap-bar or supported hinge variants,
  goblet/split-stance patterns, machine-supported work) for a client
  whose symptoms are provoked by axial loading. What this does NOT
  justify: declaring squats/deadlifts contraindicated in scoliosis
  generally. It is a modeling study, in adolescents, predicting FORCES —
  not a clinical study measuring curve progression, pain, or injury in a
  trained adult. No study located links resistance-training axial load
  to curve progression or injury in skeletally mature adults.
  IMPORTANT INTERACTION with the 20-35 bracket (peak bone mass): this
  file's 20-35 bracket bullet states heavy compound lifting contributes
  to building peak bone mass, and that window closes permanently. For a
  young adult client with scoliosis, systematically routing around axial
  load protects symptoms but also removes exactly the axial stimulus the
  peak-bone-mass window depends on. This is a real, unresolved tradeoff,
  not something to resolve silently in either direction — name it in the
  client's document, keep meaningful load in the program via non-axial
  vectors and impact/power work where tolerated, and treat it as a
  question for the coordinating clinician rather than a trainer's call.

ICONS practical application:
  - Program from the documented directional preference and symptom
    provokers, not from a generic scoliosis exercise blacklist. There is
    no evidence base supporting a fixed list of banned exercises for
    scoliosis; there IS a defensible basis for respecting an individual
    client's clinician-documented provoking patterns.
  - A load vector that bypasses a documented provoker (e.g. a hip-belt
    squat for an axial-load-intolerant client) is a legitimate PRIMARY
    lower-body tool with its own progression, not a permanent
    regression or a placeholder until "real" squatting returns. Write
    it that way in the document — progress it with real Wk1→Wk4 numbers
    per this file's load-field convention.
  - State the side explicitly on every lateral-flexion, rotation, and
    unilateral exercise for a scoliosis client. Wrong-side execution is
    a documented, real provoking mechanism, and the standard `flag`
    field (italic red sub-line under the exercise name) is the right
    place for it.
  - Hinge intolerance is a constraint on the LOADED hinge pattern
    specifically, not a reason to abandon posterior-chain training —
    substitute supported/reduced-ROM or non-axial hinge variants and
    hip-extension work (glute bridge, hip thrust, back extension to
    tolerance) rather than leaving the pattern unprogrammed. Note this
    intersects the ICONS Index Full-Spectrum Progression Standard's
    10-movement mandate, which requires programmed progression on
    Deadlift and Single-Leg RDL — that standard is scoped to women
    40-55, so it does not bind a 28-year-old client, but for a
    hinge-intolerant client who IS in the 40-55 bracket, the
    substitution must be a genuine programmed hinge-pattern
    alternative, not silence on the pattern.
  - Red-flag referral, unchanged from the rest of this file's posture:
    new radicular symptoms (leg pain, numbness, tingling), a sudden
    change in pain intensity or distribution, or a previously-tolerated
    tool becoming painful → stop and refer to the coordinating
    clinician. Curve measurement, imaging interpretation, bracing, and
    surgical-threshold decisions are never ICONS's to make.
  - Scope boundary: PSSE is a certified specialty (school-specific
    training). Neither Jason Bethea's nor Niko Heers' in-house scope has
    been confirmed to include PSSE/Schroth certification — do not imply
    in-house PSSE capability without Xolokan's explicit confirmation,
    same boundary already applied to pelvic floor PT and lymphedema
    therapy. Jason's documented management of a scoliosis client is real
    coordinated care and should be named as such; describing it as PSSE
    specifically would be an unverified claim.
Genuine gaps, stated rather than filled: (1) no RCT of progressive
  resistance training in adults with scoliosis, at any intensity; (2) no
  evidence on whether heavy axial loading affects curve progression
  after skeletal maturity; (3) no data on scoliosis + LIFTMOR-style
  bone-loading protocols, which is the direct unanswered question for a
  future postmenopausal client with a degenerative curve; (4) the
  paraspinal thermal-regulation hypothesis in Samantha Swan's note
  (simultaneous car AC + seat warmer on the low back interfering with
  autonomic paraspinal tone regulation) was NOT verifiable in the
  literature in this pass — it is the practitioner's working
  hypothesis, and should be carried as that, not repeated in any
  client-facing document as an established mechanism.
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

### Progressive Overload — RIR Model (ACSM 2026) — precision claims corrected 8/17/2026
```
Training to momentary failure does NOT consistently improve strength/hypertrophy.
Use RIR (Reps In Reserve) language:
  3+ RIR → warm-up / technique / submaximal band (a single band, not a
           precise target — see precision note below)
  2 RIR  → moderate working set — DEFAULT proximity for PRIMARY lifts
           (corrected 8/17/2026: strength gains were largely unrelated to
           estimated RIR in a 2024 dose-response meta-regression, so 1 RIR
           is not a stronger strength driver than 2 RIR — use 2 RIR as the
           default and reserve 1 RIR for hypertrophy-priority accessory
           work, not primary lifts)
  1 RIR  → hard working set — hypertrophy-priority ACCESSORY work
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

RIR PRECISION — corrected 8/17/2026, this is a refinement not a reversal.
  RIR-based autoregulation still ranks above fixed-percentage prescription:
  a 2025 network meta-analysis (Journal of Exercise Science & Fitness)
  ranked autoregulated methods by SUCRA for back-squat 1RM — APRE
  (autoregulatory progressive resistance exercise) 93.0%, RPE/RIR-based
  66.8%, velocity-based 27.0%, traditional percentage-based last at 13.2%
  — but the same analysis found no moderate/large effect size BETWEEN any
  of these methods, so the advantage is directional, not categorical.
  RIR itself is accurate to roughly ±1 rep in TRAINED lifters near failure
  (Refalo et al., JSCR 2024: absolute error 0.65±0.78 reps at 75% 1RM, no
  relationship to sex/training experience/strength level) but accuracy
  DEGRADES the further a set is from failure (a 2024 scoping review, 31
  studies/N=855: "RIR becomes less accurate the farther a lifter is from
  failure") and novice-client evidence is genuinely conflicting rather
  than simply "less accurate" — treat novice RIR reports as lower-
  confidence, not just noisier. Practical consequence: do not present 3
  RIR vs. 4 RIR vs. 5 RIR as meaningfully different targets — collapse
  everything above 2 RIR into one "technique/submaximal" band (see table
  above), and reserve RIR-precision claims for the 0-2 RIR range where the
  measured accuracy actually supports them.
Calibration protocol — new, add for every new client: on one submaximal
  set per new exercise, have the client call her own RIR, then take that
  set to true failure and record the discrepancy. Repeat until absolute
  error is ≤1 rep for two consecutive sessions before trusting her RIR
  calls for load-progression decisions. This mirrors standard research
  practice — 78% of studies reviewed (24 of 31) used a familiarisation
  session before collecting RIR data (Perceptual and Motor Skills, 2024
  scoping review) — and is a genuine process gap this file didn't
  previously specify.
Velocity-based training (VBT): a legitimate niche tool, not a general
  upgrade. A January 2026 systematic review/meta-analysis (17 studies,
  n=348) found VBT outperforms percentage-based training for jump
  performance and change-of-direction, but showed no significant advantage
  for maximal strength or sprinting. Do not invest in VBT for general
  strength/hypertrophy clients — reserve it for athletic/power-focused
  clients where jump/COD outcomes specifically matter.
Adopt APRE-style set-to-set load adjustment on primary lifts (the
  top-ranked method above) as the preferred within-session autoregulation
  approach, rather than adjusting load only between sessions.
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

### Deload / Planned Recovery Weeks (2011-2026 evidence — new section, 8/18/2026)
```
Why this section exists: this file has extensive intensity, volume, and
  RIR guidance but had ZERO deload coverage — no cadence, no protocol, no
  statement of what a lighter week costs or protects (confirmed via
  repo-wide search: the only prior "deload" appearances in this system
  were one client script's Week-4 row and one sentence in the deep-
  reference doc). Surfaced by the Block Method pilot review: a client
  with two active injury sites was running continuous progressive loading
  to Week 8 with no lighter week anywhere in the program.

What a deload is: ~1 week of deliberately reduced training stress —
  reduced sets and/or load and/or proximity to failure — while KEEPING
  the same movements and the week's day structure. It is not a week off
  (that is training cessation, a different intervention), and it is not
  the same thing as an Active Recovery day: an AR day is a within-week
  recovery day; a deload is a whole reduced week.

Evidence — practice base is strong, direct RCT base is thin; say so:
  - Expert consensus: Bell et al., "Integrating Deloading into Strength
    and Physique Sports Training Programmes: An International Delphi
    Consensus Approach," Sports Medicine - Open 2023;9:87 (3-round Delphi,
    34 coaches round 1) — defines deloading as a purposeful reduction in
    training demand to manage fatigue and enhance preparedness for
    subsequent training, and states outright the strategy is ubiquitous
    yet under-researched.
  - What practitioners actually do: Bell et al., "Deloading Practices in
    Strength and Physique Sports: A Cross-sectional Survey," Sports
    Medicine - Open 2024 (n=246 competitive strength/physique athletes,
    181M/65F): ALL respondents deloaded; typical deload 6.4±1.7 days,
    every 5.6±2.3 weeks; prescribed proactively (pre-planned) or
    proactive-plus-autoregulated, triggered by fatigue, performance
    stall, or elevated soreness. This — not an RCT — is the source of
    the "roughly every 5-6 weeks" convention; cite it as survey/practice
    evidence, not trial evidence. (Companion qualitative coach study:
    Bell et al., Frontiers in Sports and Active Living 2022.)
  - What a light week costs: Coleman et al., "Gaining more from doing
    less?", PeerJ 2024;12:e16777 — 9-week supervised RT in resistance-
    trained lifters (≥1 yr experience), with the mid-point "deload" arm
    operationalized as a FULL WEEK OF TRAINING CESSATION (complete rest —
    note this is a harsher intervention than a true reduced-load deload).
    Result: no appreciable difference in lower-body hypertrophy, power,
    or local muscular endurance vs. continuous training; the continuous
    group gained more lower-body STRENGTH within the 9-week window. Read:
    even a complete week off costs no measurable muscle — the cost is
    some short-horizon strength progress.
  - What an ACTIVE (reduced-load) deload costs: a 2026 within-subject
    randomized study (Scientific Reports, n=19 untrained young men,
    8 weeks, deload = volume/frequency cut to 1x/week, 2 sets, in weeks
    4 and 8) found similar hypertrophy AND strength-endurance vs.
    continuous training — reducing volume/load for a week did not hinder
    adaptation.
  - Strength lost to a break returns quickly: Ogasawara et al. (Clinical
    Physiology and Functional Imaging 2011; and a 6-month follow-up
    study, 2013) found repeated 3-WEEK full training cessations produced
    similar 15- and 24-week muscle CSA and 1RM outcomes vs. continuous
    training, with 20-25% fewer total sessions — no significant CSA/1RM
    loss even across a 3-week break, and retraining gains matched initial
    gains (the "resensitization" hypothesis). Practical meaning: a
    client's fear of losing progress in ONE light week has no evidentiary
    basis; even far longer interruptions recover.
  Honest gaps: both deload RCTs are short (8-9 weeks, single deload) and
  in young men — one untrained, one trained. No women-specific, older-
  adult, or postmenopausal deload RCT was located in this pass; the
  cadence numbers are survey/consensus practice evidence. Apply the
  protocol below as well-reasoned practice consistent with the trial
  evidence that exists, not as a bracket-matched validated protocol.

ICONS deload protocol:
  Cadence : schedule a deload week roughly every 4-6 training weeks of
            continuous progressive loading. HOUSE PATTERN: place it
            immediately AFTER the Week 4 peak-test/strength-reassessment
            (see "Reassessment Cadence" below) — the deload absorbs test
            fatigue and starts the next block fresh, and the 4-week
            reassessment clock gives every program a natural, pre-existing
            slot so no separate calendar is needed.
  Content : same movements, same day structure. Cut working sets roughly
            in half; drop loads to ~50-70% of normal working loads;
            everything lives in the 3+ RIR "technique/submaximal" band
            (see RIR Model above) — no 0-2 RIR sets, no PRs, no AMRAP.
            These specific percentages are practice convention (consistent
            with the survey/Delphi volume-and-load-reduction methods),
            not trial-derived — the trial evidence above says the precise
            depth of the reduction is unlikely to matter for hypertrophy.
  Who gets it PROACTIVELY scheduled (non-negotiable, written into the
            program): rehab-flagged/coordinated-care clients and clients
            carrying active injury sites under progressive loading (the
            triggering case); clients running continuous progression
            8+ weeks; older/recovery-limited clients (65+ bracket, or
            anyone whose recovery signals — sleep, soreness, session
            quality — run chronically marginal). For these clients the
            deload is exactly the connective-tissue/fatigue relief valve
            the Antagonist Rotation Rule provides within a session,
            applied at the mesocycle scale.
  Who can AUTOREGULATE it instead: a robust, well-recovering client may
            run the survey's combined model — a planned slot every 4-6
            weeks that gets pulled forward on triggers (performance
            stall, unusual soreness, disrupted sleep) or pushed back a
            week if all signals are green. Novice clients on the
            simplified two-day rotation (see ICONS Intensity Framework)
            accumulate less fatigue at their loads — autoregulate rather
            than force a calendar deload.
  Client framing: "reload," not "lost week" — same positive-framing
            discipline as "bone investment." The evidence line for a
            hesitant client: a light week costs no muscle and only
            briefly-recoverable peak strength, while unbroken hard
            loading is where soreness, joint stress, and stalls
            accumulate.
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

### Menstrual Cycle Training — confirmed 8/17/2026 as the best-aligned protocol in the whole system, with refinements added
```
Evidence: Colenso-Semple, Phillips et al. 2023 (umbrella review) — 
  NO reliable influence of cycle phase on strength adaptations. Concludes
  plainly: "the development of RET prescriptions based on cyclical
  hormonal changes is not an evidence-based approach." CORROBORATED
  independently 8/17/2026 by the 2025 UEFA consensus on menstrual-cycle
  tracking (BMJ Open Sport & Exercise Medicine 2025;11(3):e002769, 82
  agreed statements), which likewise rejects universal phase-based
  programming and — matching ICONS almost exactly — specifies that
  "cyclical symptoms should be self-reported for at least three
  consecutive menstrual cycles," defining a regular cycle as 21-35 days.
  A separate 2025 scoping review (Int J Sports Sci Coach) adds that
  calendar-based phase CALCULATIONS specifically "are not accurate" —
  worth stating to a client using a cycle-tracking app that predicts
  phase from calendar dates alone.
Practice: Train hard year-round. Use RPE/RIR-based autoregulation.
  Autoregulate around INDIVIDUAL symptoms over ≥3 consecutive cycles
  (formalized 8/17/2026 to match UEFA 2025's exact wording) — not
  calendar or app-predicted phase. Add an explicit disclaimer against
  letting a calendar/app-predicted phase drive any programming decision.
Perimenopause/menopause: Heavy RT ≥3×/week is strongly evidence-backed at
  whatever protein target the client's actual context supports (corrected
  8/17/2026 — see "Protein Targets" above; no longer a flat 2.0-2.2 g/kg
  by bracket). HRV dips in luteal phase are NORMAL — interpret vs
  individual baseline not a flat line. HRV downgraded 8/17/2026 from a
  decision input to an optional observational metric only: a 2024 RCT
  (n=21 older women, 7 weeks) comparing HRV-individualized recovery
  against fixed scheduling found no significant between-group advantage
  on ANY strength, hypertrophy, or function outcome measured — symptom
  logs plus RIR/RPE should remain the operative autoregulation signals,
  not HRV readings.
ACL/injury risk by phase: remains genuinely unresolved, not settled either
  direction (added 8/17/2026) — a 2023 systematic review found it
  "inconclusive whether a particular cycle phase predisposes women to
  greater non-contact ACL injury risk," at very-low certainty. Do NOT add
  phase-based ACL precautions on this basis. The real, phase-INDEPENDENT
  elevated ACL risk in women (~5x incidence) is already addressed through
  the universal neuromuscular circuit — see the corrected "ACL / Knee
  Valgus / Neuromuscular Injury-Prevention Circuit" section above.
Menstrual-health red-flag referral (added 8/17/2026): absent, irregular,
  or newly-lost periods should prompt medical referral, not a programming
  adjustment. Note that resumption of menses alone does not confirm
  ovulatory recovery — three or more cycles shorter than 36 days is a more
  reliable indicator (2025 Female Athlete Triad Coalition consensus
  update) — worth knowing for a client returning from an eating-disorder
  or RED-S history (see the RED-S note in the 20-35 bracket above).
```

### Asymmetry Protocol (Styku segmental data) — trigger corrected 8/17/2026

**The prior 0.5 lb absolute trigger was firing on measurement noise, not real asymmetry.** Per an external evidence review (Brace Life / ICONS Methodology — External Evidence Review, 8/17/2026): 0.5 lb ≈ 0.23 kg. The Shape Up! Adults study (n=634) found 3D-optical-vs-DXA accuracy error of 0.27 kg RMSE for female arm fat-free mass and 0.61–0.69 kg for female leg fat-free mass — meaning the device's own error on LEG lean mass is roughly 2.6–3.6× *larger* than the entire 0.5 lb trigger, and the arm error sits at or above it. The injury-prevention literature that actually links asymmetry to outcomes uses thresholds an order of magnitude higher: Bishop et al.'s review found 27 of 30 studies used a 10–15% asymmetry threshold, and Guan et al.'s prospective-cohort review links ≥15% strength/power asymmetry to injury risk. No published validation of Styku-derived left/right regional lean-soft-tissue mass against DXA or MRI was located in that review — a real, stated gap, not neutral.

**Corrected standard:**
```
1. Trigger on a RELATIVE gap ≥ 10% between limbs (matching the 10-15% convention
   used in the injury literature), not an absolute lb figure — AND the gap must
   exceed the studio's own measured test-retest CV for that scan/region if that
   data exists (no published source gives a device-specific calibration interval,
   so this is a studio policy, stated as one, not an evidence-backed standard).
2. Prefer a functional strength/power test (single-leg press, isometric strength,
   single-leg jump) as the PRIMARY asymmetry trigger where one is available —
   the evidence-linked thresholds come from strength/power asymmetry studies,
   not imaging-derived lean mass. Use Styku for client-facing progress
   visualization, where it is far less error-sensitive (see "3D Optical
   Scanning — Validity" below).
3. Lead with the WEAKER side on unilateral exercises — but present this as a
   defensible COACHING CONVENTION (it caps the stronger side's volume at what
   the weaker side can match), not a research-backed rule. No source located in
   this review establishes that unilateral-work set-ordering (weaker side first
   vs. any other order) changes outcomes.
4. Log left vs right separately in coaching cue / flag field.
5. Suitcase carry: carry in the weaker HAND, per the same coaching-convention framing as #3.
6. Track at 8-week Styku rescan — a real, evidence-backed dose: 6-10 weeks of
   corrective unilateral work at 1-2 sessions/week reduced measured asymmetry in
   the meta-analyzed RCTs this review cites.
```
`weakerSide(leftLST, rightLST)` (exported from `icons_template.js`) still does the "lower LST = weaker" direction comparison — that logic is unaffected by this fix — but the function does not yet compute or gate on a %-relative threshold; it returns `'left'|'right'|'even'` off the raw values passed to it. **Known gap, not yet built:** the engine has no %-based trigger helper today. Until one exists, computing whether a gap actually clears the new ≥10% relative threshold is a manual step for whoever builds a client's document — do not treat `weakerSide()` returning a non-`'even'` result as confirmation the corrected trigger is met; check the percentage yourself.

**Retroactive scope — deliberately not done in this pass.** Every current client document was built against the OLD 0.5 lb absolute trigger; a full recalculation of whose asymmetry protocol should actually still be active under the new ≥10% relative standard is a real, separate body of work (some clients' documented gaps may no longer clear 10%; some may still clear it easily) that needs careful per-client verification against real data, not a blanket rewrite tonight. This is `icons-roster-analyst`'s or `icons-operations-analyst`'s natural next assignment — see CLIENT_OPERATIONS.md's Asymmetry Execution Log Standard, which should get a "trigger recomputed under corrected threshold" column added when that pass runs.

### VFA (Visceral Fat Area) — reframed as trend metric 8/17/2026, not a risk-band classification
```
Prior banded table (< 70 Very Low / 70–99 Low / 100–149 Moderate / ≥150 High)
  is RETIRED as a risk classification. Corrected per the external evidence
  review: no consensus body endorses a single VAT/VFA threshold — published
  CT-derived cutoffs span roughly 82–140 cm² across studies (Kardiovize
  cohort, n=2,052), and the JASSO/CT-derived ≥100 cm² figure this file's old
  "Moderate Risk" line was built on has mediocre discriminative performance
  at that boundary (sensitivity 0.69/specificity 0.62). In women SPECIFICALLY,
  risk-relevant CT thresholds run considerably higher than the old ICONS
  band assumed — Kelley et al. (Diabetes Care 26:1413) found ≥106 cm² marking
  elevated risk (not 100) and ≥163 cm² marking substantially greater risk in
  women >45; the Kardiovize cohort's median VFA for women was 89.8 cm²,
  meaning a typical, unremarkable woman sat inside ICONS's old "Low" band
  near its top edge. The old "<70 Very Low / 70–99 Low" bands have no
  identified consensus basis — 70-99 cm² spans the population median.
Measurement-validity problem (compounds the above): Styku's own published
  validation compared its VAT output against DXA VAT IN KILOGRAMS (0.1±0.2 kg
  bias, CCC 0.81) — never against CT or MRI, and never in cm² (Bennett et
  al., Clinical Nutrition 41:211-218). This system was reporting a CT-derived
  cm² threshold sourced from a device validated only against DXA in kg —
  defensible for TREND (DXA VAT itself tracks MRI well, R²=0.91 in women),
  indefensible for a precise absolute cm² risk classification.

CORRECTED APPROACH — track change over time for the individual client;
  do not label an absolute VFA reading against the old 4-tier precision
  table ("Moderate Risk," "High Risk," implying a specific graded
  classification) in any client document. **Refined 8/17/2026 against the
  Anna Samuelsson ICONS Performance Assessment reference document
  (Xolokan's confirmed standard for this report type):** a short trend TAG
  is fine — e.g. "Very Low" — provided it (a) reflects only the single
  <70 cm² "Very Low" floor already used elsewhere in this system (not the
  4-tier 70/100/150 table), and (b) is paired with the methodology caveat
  every time (no universal VFA threshold exists; this device's own VFA
  validation was against DXA in kg, not CT in cm²; read as a personal
  trend, not a diagnosis). What's retired is presenting VFA as a precise,
  multi-tier risk CLASSIFICATION on its own — a single low-stakes trend
  tag with the caveat attached is the corrected house style, confirmed by
  this reference document's own methodology-appendix footnote 4.
Primary clinical-facing metric going forward: WAIST CIRCUMFERENCE, measured
  to protocol, against the IAS/ICCR (International Atherosclerosis Society/
  International Chair on Cardiometabolic Risk) consensus female thresholds:
  ≥80 cm (elevated) / ≥90 cm / ≥105 cm / ≥115 cm, BMI-specific (Ross et al.,
  Nat Rev Endocrinol 16:177-189) — an international consensus panel actually
  recommends this metric for routine clinical use, unlike VAT/VFA itself
  ("VAT mass is not routinely measured in clinical settings" — same
  source). Costs a tape measure; add it to intake alongside the Styku scan.
If an absolute VFA reading is still shown to a client (e.g. as scan-report
  context), state plainly: (1) it is a trend indicator, not a diagnosis;
  (2) the ~100 cm² figure some literature cites is a CT-derived screening
  value with real but modest accuracy (JASSO); (3) in women, elevated-risk
  CT thresholds are generally described as running higher, closer to
  106 cm²+, than the old ICONS band implied; (4) this specific scanner's
  own VFA validation was against DXA in kilograms, not cm², so an absolute
  cm² reading against any risk table should be treated as approximate.
Never present a VFA reading alone as a cardiometabolic verdict — Framingham
  data shows visceral fat's cardiometabolic association is real (and
  stronger in women than men, β 8.36 vs 4.24 for the VAT-glucose
  relationship) but that same analysis publishes no clinical cutoff to
  classify an individual against.

**Retroactive scope — deliberately not done in this pass**, same posture as
  the ALST/Asymmetry/ACL fixes above: existing client documents/CLIENTS.md
  entries that quote an absolute "Moderate Risk"/"High Risk" VFA label are
  not swept and rewritten here — flagged for `icons-roster-analyst`/
  `icons-expert` as real follow-up work, since it touches already-delivered
  clinical framing per client.
```

### BMI Clinical Flags (use alongside body fat %)
```
< 18.5  → Underweight — flag regardless of body fat %
18.5–24.9 → Normal
25–29.9   → Overweight
≥ 30      → Obese
BMI < 18.5 + ALST < 5.5 = sarcopenic obesity profile — highest priority
```

### Pelvic Floor (postmenopausal + heavy loading) — bracing model corrected 8/17/2026
```
Triggers: heavy carries, squats, deadlifts, hip thrusts at high loads
Protocol: intra-abdominal pressure strategy SCALES WITH LOAD — it is not a single
  blanket rule. Corrected per POGP (Pelvic, Obstetric and Gynaecological
  Physiotherapy) 2024 clinical commentary (Prevett & Moore), which establishes a
  graded hierarchy and states outright that a permanent "no breath-holding"
  prohibition is "not appropriate":
    - Lighter/warm-up work        → free breathing
    - Moderate working sets       → exhale on exertion (the default cue)
    - Heaviest working sets       → a brief, controlled brace is normal and
                                     appropriate — this MAY include a short
                                     breath-hold through the sticking point,
                                     the same way this file's Cardiovascular
                                     section already distinguishes brief bracing
                                     from sustained breath-holding for a
                                     completely different (cardiac) reason.
  Do NOT prescribe a blanket "never hold your breath" rule — that is the
  corrected error, not the standing guidance. What remains an error is
  SUSTAINED breath-holding across multiple reps or an entire set.
Language: "If you experience any leaking, heaviness, or pressure — 
           stop and flag your coach. This is common and treatable."
Do NOT say: "train through it" or minimize symptoms
Refer to pelvic floor PT when symptomatic

Co-activation during a lift ≠ PFM strengthening (added 8/17/2026, verified
  citation): heavy compound lifting (squat, deadlift, hip thrust) requires
  the PFM to co-activate for intra-abdominal pressure and spinal stability,
  and that co-activation is normal and well tolerated — but it is NOT the
  same thing as building PFM strength. Skaug KL, Engh ME, Bø K, "Acute
  Effect of Heavy Weightlifting on the Pelvic Floor Muscles in
  Strength-Trained Women: An Experimental Crossover Study," Medicine &
  Science in Sports & Exercise 2024;56(1):37-43 (n=47 nulliparous,
  strength-trained women; back squat/deadlift at 75-85% 1RM vs. seated
  rest, vaginal pressure + surface EMG measurement) found (1) heavy
  weightlifting had no immediate adverse effect on the PFM relative to
  rest — well tolerated, reinforcing the "symptom onset ≠ damage" framing
  above — and (2) PFM strength was NOT significantly correlated with
  whole-body maximal or relative strength (1RM or 1RM/bodyweight) in
  either squat or deadlift, leading the authors to conclude that targeted
  PFM training is necessary to actually improve PFM strength — heavy
  lifting does not build it as a side effect. Practical takeaway: a
  client's heavy-lifting program is not a substitute for targeted PFM
  training (Kegels / a PFM-specific protocol) if continence or PFM
  strength is itself a goal or concern — that stays a pelvic floor PT
  referral, same posture as the rest of this section. Scope caveat: this
  cohort was young (18-35), nulliparous, and already strength-trained —
  not a direct replication of this file's core postmenopausal population
  — but it is the most direct available evidence on this specific
  co-activation-vs-strengthening question, and there is no mechanistic
  reason to expect the finding (whole-body lifting strength and PFM
  strength are physiologically distinct qualities) to reverse in an
  older, postmenopausal, or postpartum population.

Prevalence — why this deserves systematic, not passive, screening (added
  8/17/2026): reported symptom rates run high in lifting populations —
  urinary incontinence in 44% of female powerlifters, 50% of elite
  powerlifters/weightlifters (23% reporting prolapse symptoms), prolapse
  reports of 59.7% among women lifting >50kg vs. 15.2% among those lifting
  ≤15kg. A scoping review (Bø et al., Int Urogynecology J 2023;34:1153-64)
  found symptomatic POP prevalence 0-23% across sport populations and
  identified parity (not just heavy lifting) as the main associated
  factor. At this prevalence, passive self-disclosure will miss most
  cases — add a short intake/periodic screening questionnaire rather than
  waiting for a client to volunteer symptoms: which movements provoke
  leakage, at what %1RM/rep range, at what point in the lift, drops vs.
  full emptying, belt use and its effect, recent training-volume or
  body-weight changes, and menstrual regularity.
Symptom onset ≠ damage, and treatment works (added 8/17/2026): per POGP
  2024, "symptom onset in this context can be seen as a sign of bodily
  readiness for RT loads rather than a sign of damage or dysfunction" —
  reassure, don't alarm. There is high-level evidence supporting pelvic
  floor muscle (PFM) training to improve incontinence symptoms, and
  leaking can reflect hypertonicity from OVER-recruitment rather than
  weakness — differentiating "needs strengthening" from "needs
  coordination/appropriate recruitment" is the actual clinical first step,
  which is exactly why this stays a PT referral rather than a default
  "just do more Kegels" response.
Do not cue maximal pelvic-floor contraction by default (added 8/17/2026):
  the pelvic floor is a reflexive muscle group and should not necessarily
  be cued to fully engage during every brace. If a client is asymptomatic
  and doesn't report pelvic-floor engagement, it is not necessary to cue
  a PFM contraction. Only cue a pre-brace PFM contraction specifically
  when leakage comes with a bearing-down sensation.
Exhale-on-exertion is a symptom-triggered tool, not a population-wide
  rule (added 8/17/2026): for a client who reports leaking, have her
  accumulate training volume BELOW her symptom threshold using exhale-on-
  exertion first; once coordination improves over a period of volume
  accumulation, progressively trial a stronger graded brace (which may
  include a brief breath-hold) rather than holding her at exhale-on-
  exertion indefinitely once she's ready to progress.
Valsalva red-flag screen (added 8/17/2026): the graded brace above is
  characterized as low-risk in the absence of significant cardiovascular
  disease, with described side effects (subconjunctival hemorrhage,
  presyncope, syncope from longer breath-holds) as generally transient
  and benign — but screen for cardiovascular disease before permitting
  braced breath-holds, and if a client repeatedly experiences presyncope,
  syncope, or subconjunctival hemorrhage, switch her to exhale-on-exertion
  only and refer for cardiac assessment. Cross-references this file's
  Cardiovascular section above, which already treats brief bracing as
  low-risk for a cleared, stable client.

Engine: `pelvicFloorCallout()` in icons_template.js was updated 8/17/2026 to
  match this corrected language — see that function for the exact client-
  facing wording. This is a language/framing correction, not a change to who
  the callout applies to or when it fires (still `isPostmenopausal` +
  matching exercise, or `day.forcePelvicFloor: true`) — every client document
  using this callout inherits the fix automatically on next regeneration, no
  per-client clinical re-determination needed (unlike the ALST/asymmetry
  fixes above, which do require per-client review before any retroactive
  change).
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

### ACL / Knee Valgus / Neuromuscular Injury-Prevention Circuit — trigger corrected 8/17/2026
```
Cause: hip abductor / glute med weakness → dynamic knee collapse (this
  mechanism explanation is fine and stays — what's corrected below is
  whether visually screening for it should GATE the corrective circuit)
Fix: lateral band walks, terminal knee extensions, Spanish squat,
     Copenhagen plank, single-leg step-downs — a Nordic hamstring /
     eccentric hamstring component should be added where not already
     present (see Nordic Hamstring note below — this is a distinct,
     separately-evidenced addition, not a Copenhagen substitute)
Banded squats: band above knees creates proprioceptive cue to push OUT

CORRECTED TRIGGER — do not screen-gate the circuit. Prior guidance
  conditioned the corrective circuit on visually observing knee valgus on a
  single-leg-squat or drop-landing screen. This is not supported: a
  prospective study of 880 elite female athletes (JOSPT 2021) concluded
  visual assessment of the vertical drop jump and single-leg squat "cannot
  predict who will sustain a future noncontact ACL injury," and Nilstad et
  al. ("Kiss goodbye to the 'kissing knees,'" Sports Biomechanics 2021)
  found no association between frontal-plane inward knee motion and future
  non-contact ACL injury across 74 new ACL injuries. Meanwhile the
  intervention itself works at the population level regardless of who
  visually screens positive: Lauersen et al. (BJSM 2018;52:1557) found
  strength training reduced sports injuries with a rate ratio of 0.338 (95%
  CI 0.238–0.480, I²=0%, high-certainty), a ~64% reduction in ACL injuries
  in the underlying Waldén data, and a 75% reduction in anterior knee pain.
  A 2025 meta-analysis of 24 RCTs in adolescents/young athletes (search to
  Nov 2024) found overall lower-limb injury RR 0.73 and knee-injury RR
  0.72. Net effect of screen-gating: ICONS was withholding an effective,
  population-level intervention from exactly the clients the screen missed
  (i.e., most clients who will actually sustain a future non-contact ACL
  injury don't visually fail the screen). **Make the corrective/
  neuromuscular circuit universal — every client gets it — rather than
  conditional on a positive visual screen.** Retain the single-leg-squat/
  drop-landing screen only as a coaching/technique tool (useful for
  correcting an obvious form fault), and stop describing it as risk
  prediction — it isn't one.

Evidenced dose (do not undershoot this): 20–30 minutes, 1–2×/week,
  sustained beyond 6 months (2025 NMT meta-analysis, 24 RCTs). A short
  pre-squat circuit tacked onto a training day will likely fall short of
  this dose — build it as a standing program component with its own
  weekly time allocation, not just a few minutes before squats. FIFA 11+
  program reviews report ~30–46% injury reduction, explicitly dependent on
  adherence (2025 review, PMC12856364).

Adherence is the dominant moderator — track it. A meta-analysis (HSS
  Journal 2023;19:154–62, 15 studies) found high adherence (≥76% of
  prescribed sessions completed) associated with a 64% ACL injury risk
  reduction, dose-responsive. Set a ≥76% session-completion target and
  track it per client the same way ICONS tracks load progression — this is
  likely the single highest-leverage change available in this protocol
  area. A short, simple circuit a client actually completes every time
  beats an elaborate one that gets skipped when time is short.

Nordic hamstring / eccentric hamstring — add if not already present. A
  systematic review/meta-analysis of 8,459 athletes (BJSM 2019;53:1362)
  found Nordic hamstring programs roughly halve hamstring-injury rates —
  among the strongest single-exercise effects in the injury-prevention
  literature, and a distinct muscle group/mechanism from the Copenhagen
  plank's adductor focus, so this is an addition, not interchangeable.

Framing: describe this as general lower-limb injury and knee-pain
  prevention (where the strongest, highest-certainty evidence actually
  lies — the 75% anterior-knee-pain reduction and the general injury-rate
  reduction) rather than as ACL-specific risk screening, since the
  screening tools ICONS has access to cannot do that.

**Retroactive scope — deliberately not done in this pass.** Converting
  every existing client's screen-gated corrective circuit into a universal,
  dosed, adherence-tracked standing program component is real structural
  work across the roster (a new weekly time allocation, not just added
  exercises), not a one-line rewrite — the same "correct the standard now,
  roll out to real client documents deliberately and separately" posture
  already applied to the ALST and Asymmetry Protocol fixes above. Flagged
  for `icons-roster-analyst`/`icons-expert` as a real follow-up: audit
  which current client documents still frame the corrective circuit as
  screen-conditional, and which have room in their weekly schedule for a
  standing 20–30 min/1–2x-week allocation (this may not fit every client's
  existing day count without displacing something else — a per-client
  judgment call, not a blanket insert).
```

### Copenhagen Plank (adductor strengthening) — citation and protocol corrected 8/17/2026
```
Target: adductor longus. EMG ~108% MVIC — extremely effective.

CITATION WARNING — do not cite the retracted 2025 meta-analysis. A
  "Copenhagen Adduction Exercise" systematic review/meta-analysis published
  in Scandinavian Journal of Medicine & Science in Sports (2025) was
  formally RETRACTED (retraction notice 2026 Apr;36(4):e70287, retracted
  article record PMC12363431) and must never be cited as evidence anywhere
  in this system. Confirmed via repo-wide search (8/17/2026) that this
  retracted paper is not currently cited anywhere in this file or in any
  client/trainer script — nothing to purge as of this pass — but flag it
  immediately if it surfaces in any future research pass or document draft.

Valid primary evidence: Harøy et al., cluster-randomised controlled trial,
  BJSM 2019;53:150 (corrected from "2018" — the actual cluster-RCT is the
  2019 paper; 2018 was likely conflating publication/preprint dates). 35
  semiprofessional Norwegian teams (intervention 18 teams/339 players;
  control 17 teams/313 players). Average weekly groin-problem prevalence
  13.5% (95% CI 12.3–14.7) vs. 21.3% (95% CI 20.0–22.6) in control — a 41%
  lower risk of reporting groin problems (OR 0.59, 95% CI 0.40–0.86,
  p=0.008), rising to 47% in the per-protocol analysis; an 18% reduction in
  SUBSTANTIAL groin problems specifically was not statistically
  significant — be precise about which endpoint the 41% figure describes
  when citing it to a trainer or client.

Protocol (regrounded on the actual Harøy et al. 2019 design — corrected
  from the prior hold-time-progression description, which did not match
  the source trial): one set per side per session, three progression
  levels selected by PAIN RESPONSE (start at level 3; regress a level if
  groin pain exceeds 3/10), 2–3×/week for ≥6 weeks in a build/preseason
  phase, then 1×/week for in-season maintenance — takes under 5 minutes
  per session in the source trial.
Coaching: side plank, top leg on bench, adductor holds the position;
  regress the progression level (not just the hold time) if pain exceeds
  3/10, per the source protocol's own pain-guided design.
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
- The women's ACL/knee-valgus corrective-priority emphasis in this file (2.8× female incidence, a universal neuromuscular circuit per the corrected trigger above) is a *female-elevated-risk* finding specific to the cited meta-analysis — do not apply that same weighting/priority to a male client by default. General movement-quality coaching (correcting an obvious fault observed during training) still applies to anyone; the elevated-risk/mandatory-circuit emphasis does not transfer.
- Copenhagen plank / adductor injury prevention is sex-neutral (Harøy et al. 2019 cluster-RCT, BJSM 53:150, studied male and female athletes) and remains highest-yield for athletic/team-sport clients in this bracket regardless of sex.

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

## STUDIO EQUIPMENT — CONFIRMED IN-STUDIO INVENTORY

Added 8/19/2026, from Xolokan's direct, definitive statement of what the studio actually has. **Every in-studio program build and every compound-slot exercise-options menu must be selected from this list** — a movement requiring equipment not on it either gets a substitution from what IS here, or gets flagged to Xolokan before the document ships. This section is the check the ICONS Block Method's exercise-options rule runs against.

**Confirmed inventory (Xolokan, verbatim list, 8/19/2026):**
```
Squat rack + Olympic bar        — full barbell work: back/front squat, BB deadlift,
                                   BB RDL, BB hip thrust, OHP, bench press (with the
                                   bench below), BB rows, rack-supported variations
Dumbbells up to 60 lbs           — HARD CEILING per hand. No DB prescription above
                                   60 lbs/hand for in-studio training.
Kettlebells up to 25 lbs         — HARD CEILING. Goblet work, carries, swings-family
                                   (where programmed) cap at 25 lbs per bell.
Bench                            — flat pressing/hip thrust shoulders-elevated/step
                                   & box work/supported rows. (Incline capability
                                   unconfirmed — see open questions.)
Leg extension machine            — quad isolation; TKE-adjacent knee rehab loading
Hamstring curl machine           — knee-flexion hamstring isolation (the hinge-free
                                   hamstring option for hinge-intolerant clients)
Hyperextension (back extension)  — hip-hinge pattern training at low spinal load;
                                   the Scoliosis section's "back extension to
                                   tolerance" tool
Assisted pull-up machine         — the roster's assisted pull-up baselines/grip
                                   progression batteries run here
Kieser                           — machine resistance line already used in programs
                                   (e.g. Siobhan's Kieser rows/press work)
Sled push                        — conditioning/power tool; the Power Training
                                   section's "fast, not maximal-load, sled push"
                                   lives here
```

**Programming implications (binding for in-studio clients):**
1. **The Kieser acts as the studio's cable machine** (Xolokan, 8/19/2026 — clarified same day as the inventory). There is no standalone cable stack, but cable-pattern prescriptions (pull-throughs, rows, presses, pulldowns, kickbacks, face pulls) run on the Kieser line as the designated equivalent. A cable reference in a legacy script is therefore executable as written on the Kieser — when touching such a script, rename the exercise to name the Kieser (or a band/DB equivalent where the pattern fits better) so the document says what the client actually uses, but this is a naming cleanup, not a programming conflict.
2. **Load ceilings are real constraints, not suggestions**: 60 lbs/hand DB, 25 lbs KB. A progression that would cross a ceiling moves to the Olympic bar (or a harder variation at the same load — deficit, tempo, unilateral) rather than prescribing equipment that doesn't exist.
3. **Heavy carries above 60 lbs/hand move off dumbbells** — the hex/trap bar (confirmed available, see below) is the standard vehicle for carry loads past the DB ceiling.
4. **Scope: IN-STUDIO clients only.** Virtual/home-gym clients (Petra, Sarah) program against their OWN equipment lists, not this one — Sarah's build already runs on trainer Nick's stated constraints, and a home-gym client's cable machine (if she has one) is legitimately programmable for her.

**Also confirmed available (Xolokan, 8/19/2026 — "Yes all of those available," resolving the same-day open-questions list):**
- **Hex/trap bar** — confirmed. Existing hex-bar prescriptions and tested PRs (Elizabeth Poyner Hex DL 195×5, Siobhan Hansen 75–85 lbs) stand as written; the Baseline Testing Protocol's "Deadlift (Hex Bar or BB)" is fully runnable in-studio. The hex bar is also the vehicle for heavy carries beyond the 60 lb/hand DB ceiling (see implications below).
- **Total Gym** — confirmed for general in-studio programming, not just Jason-coordinated PT work. Jason's SOAP-note Total Gym prescriptions (Siobhan, Heather Dolland, Christina Alesci) carry into ICONS programs as written.
- **Landmine** — confirmed. Landmine press remains the standard scap-friendly press alternate per the Block Method options rules.
- **Cardio machines (bike/assault bike/rower)** — confirmed. Existing warm-up/conditioning prescriptions stand.
- **Incline-capable bench** — confirmed. Incline Dumbbell Press (core Baseline Testing Protocol movement #4) is fully runnable.
- **Plyo boxes/step platforms, bands, foam rollers, med balls** — confirmed.

**Programming implications update (8/19/2026, post-confirmation):** heavy carries progressing past 60 lbs/hand move to the hex/trap bar (or plate-loaded implements) rather than being capped — Elizabeth Poyner's 65–70 lbs/hand carry loads are achievable in-studio and are NOT a conflict. The 60 lb DB / 25 lb KB ceilings still bind dumbbell/kettlebell prescriptions specifically: a DB exercise programmed above 60 lbs/hand (Brodie 75, Jah 65–75, Kelly 65) still needs a per-client implement decision (move to barbell/hex bar/Total Gym equivalent) at that document's next touch. **Cable-machine status resolved same day:** there is no standalone cable stack, but the Kieser acts as the cable machine (implication 1 above) — cable-pattern prescriptions are executable on it, so the cable question is a naming cleanup at next touch, not an absence.

**Roster reconciliation status (8/19/2026, updated post-confirmation):** the repo-wide sweep found cable references in 17 client/trainer scripts — Siobhan's (the Block Method pilot) fixed same-day; per the Kieser-equivalence clarification (implication 1), the remaining 16 are executable as written and get renamed to Kieser (or band/DB where the pattern fits better) as each document is next touched, per the standing "touch it, bring it current" practice. DB-ceiling overages (Brodie/Jah/Kelly) resolve per-client the same way. Petra's KB 20–35 lb range and 70 lb DB loads are exempt (virtual client, own equipment). The hex bar/Total Gym/landmine/cardio/incline flags above are all resolved — no longer conflicts.

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

Kelly Mulroy    → MIGRATED 8/18/2026 into this repo's clients/scripts structure — see
                  `clients/kelly_mulroy/Kelly_Mulroy_5Day_Training_Plan.docx` /
                  `scripts/kelly_mulroy_5day_plan.js` and CLIENTS.md's "Kelly Mulroy" entry
                  for the current, engine-built version. Her original deliverable is
                  preserved byte-identical as the engine's XML-audit standard at
                  `system_documents/reference/` (SHA-256 recorded there) — that artifact,
                  not her live program, is what the engine is audited against going forward.
  Age: 35 | 5'4" | 152 lbs | Tue/Wed/Thu/Fri gym + Sun active recovery
  Scan: 6/17/2026 | BF: 36.4% | Lean: 92.0 lbs | Shape: 61/100
  ALST: not At-Risk | Leg asymmetry: L 15.7 vs R 16.5 lbs (0.8 lb = ~5.0% relative —
    does NOT clear the corrected ≥10% trigger; see CLIENTS.md)
  Flags: Knee valgus (squat), hip hinge / adductor weakness; lumbar hinge-tolerance
    finding with an explicit stop-signal (Jason Bethea, 7/29–8/11/2026)
  Correctives: banded squat, TKE, Copenhagen plank every session
  Program: 5-day progressive intensity (60/70/80/90%/AR)
  Baselines (CORRECTED 8/18/2026 — the prior line here listed "DL 55–65 lbs, Squat 25 lbs,"
    neither of which is a tested baseline: 55–65 is her Thursday TRAINING LOAD, and no squat
    baseline of any kind exists anywhere in her document. Verified against the actual
    deliverable during her 8/18 engine migration): OHP 25 lbs×3RM, DB Row, Push-Up,
    Plank Hold, Farmer Carry 35 lbs/hand, Assisted Pull-Up — six rows, see CLIENTS.md.

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

Sarah           → SUPERSEDED 8/18/2026. Rebuilt from scratch as `clients/sarah/Sarah_2Day_Training_Plan.docx`
                  / `scripts/sarah_2day_plan.js` — see CLIENTS.md's "Sarah" entry. **Do NOT merge the
                  outline below back into her current program.** It is retained only as a historical
                  record of the pre-repo version. Real constraints since relayed by her trainer Nick
                  (no cable machine, nothing above 20 lbs, avoid the bench, fast-paced/high-rep/low-rest,
                  limited lower-back and hamstring mobility, struggles to hold a flat back through a
                  hinge, squats to just above parallel) rule out most of what this outline specifies —
                  the bench work, the cable pull, and the heavy squat+OHP superset are all now
                  explicitly excluded by trainer direction, not by equipment availability.
  Virtual 2-day program | Athletic strength focus
  Day A: Power + Strength (lateral primer, squat+OHP superset, bench, cable pull, core)
  Day B: Athletic Strength (RDL, row+cable pull superset, incline+lateral, carry, arms)
  Key: lateral lunge + lateral deadlift as Day A primer (NOT explosive — controlled)
       Cable pulldown replaces assisted pull-up
       Single-arm DB row only in superset (no standalone) ← the one detail carried
       forward into her current build, since it remains compatible
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

Eight scoped subagents cover this system as of 8/17/2026 — one per structure built so far. Route a task to the one whose scope actually matches rather than doing everything in the main thread; each agent's own file has the operative detail, this is just the map:

| Agent | Owns | Does NOT own |
|---|---|---|
| `icons-expert` | Client-facing documents — training plans, assessment reports, PPTX decks, Styku interpretation, via `buildDocument()`/reportlab | Trainer education content, science-layer research, QA, Drive monitoring |
| `icons-research-analyst` | The Evidence-Based Science Layer in this file — periodic literature research, correcting/upgrading/adding claims, the Research Update Log | Writing or editing any client/trainer deliverable; the standalone deep-reference doc below |
| `icons-evidence-curator` | `docs/Evidence_Based_Science_Womens_Strength_Training.md` — the discursive, fully-cited deep-reference literature review behind the women's science layer (distinct from this file's compact actionable version) | This file's Evidence-Based Science Layer itself; any client/trainer deliverable |
| `icons-trainer-education` | Trainer onboarding — the self-paced HTML knowledge modules and the physical Train-the-Trainer `.docx` programs | Client-facing plans/reports; science-layer research |
| `icons-doc-auditor` | Pre-delivery structural QA on `.docx`/`.pptx`/`.pdf` output (python-docx/pdfplumber checks, since rendered PDF audits are broken in this environment) | Building or editing deliverables — reports findings back, doesn't fix them itself |
| `icons-intake-monitor` | Weekly read-only scan of the "ICONS CLIENT PROGRAMS" and "ICONS NOTES JASON PDFS" Drive folders — flags stale-document candidates and new SOAP-note data back to the main thread / `icons-expert` | Editing any document, uploading anything to Drive (the manual-handoff policy below still stands), resolving clinical conflicts itself |
| `icons-roster-analyst` | Roster-wide category study — groups every client/athlete by actual age x sex bracket and checks whether each category is getting the strongest-evidenced method per the Method Selection Principle above; flags improvement candidates and roster-level patterns back to the main thread / `icons-expert` | Editing any document; literature research itself (that's `icons-research-analyst`/`icons-evidence-curator`); single-document structural QA (that's `icons-doc-auditor`) |
| `icons-operations-analyst` | `CLIENT_OPERATIONS.md` — the Block 1 assessment gate, 8-week review ledger, clinical constraint register, asymmetry execution log standard, ALST/low-body-mass watchlist, nutrition protocol tracker, and special-population review checklist; verifies operational/process state against the real roster and keeps that file current | Client documents, science-layer research, single-document structural QA; and — explicitly — sending any actual notification or mechanically blocking a release, since no calendar/email/task-queue integration exists in this repo (see that file's own stated scope limitation) |

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

## ICONS INTENSITY FRAMEWORK — status and rollout corrected 8/17/2026

| Day | % | Color | Philosophy |
|-----|---|-------|-----------|
| 60% | Teal | Technique day — form > load. No PRs. |
| 70% | Green | Moderate — building baseline volume without peak fatigue |
| 80% | Gold | Primary strength day — last 1-2 reps hard but achievable |
| 90% | Red | Peak intensity — near-maximal. Rest fully between sets. |
| AR  | Blue | Active recovery — no PRs, no AMRAP, feel better leaving |
| Off | Gray | Rest day — week overview only, no training day page |

**Verdict from the external evidence review: well-supported in structure,
needs training-status tiering and de-emphasis of the Red day.** The
undulating-intensity logic is real (Moesgaard et al., Sports Medicine 2022,
meta-analysis of 35 volume-equated studies: periodized training beat
non-periodized for 1RM, ES 0.31; undulating beat linear, ES 0.31), and the
80%/Gold anchor sits exactly on ACSM 2026's strength recommendation
(~80% 1RM). But two corrections:
- **The periodization benefit is concentrated in TRAINED clients, not
  beginners.** Moesgaard's subgroup split found the effect present in
  trained participants (ES 0.61) but essentially absent/non-significant in
  untrained participants (ES 0.06) — and beginners make up a real share of
  a studio's roster. **For a client in her first ~6 months, run a
  simplified two-day rotation (Gold ≈80% + Green ≈70%) hitting each major
  muscle group ≥2×/week, rather than the full five-color rotation** — this
  matches ACSM 2026's floor recommendation (≥2 sessions/muscle group
  weekly) without implying a precision of dose-response that doesn't
  exist for a novice. Introduce the full five-color undulating rotation
  once a client is past the novice phase, where undulating periodization
  does outperform linear.
- **Restrict Red (90%) days to clients with an actual testing or
  competition reason.** No source in this review supports 90% 1RM work as
  NECESSARY for general strength or hypertrophy outcomes in a recreational
  client — ACSM 2026's strength anchor is ~80% 1RM, and complex
  periodization "did not consistently impact outcomes for the average
  healthy adult" (ACSM 2026, "Consistency Beats Complexity"). This is a
  caveat, not a safety finding — no source reviewed evaluated 90% days as
  unsafe for recreational clients, only as unnecessary for the outcomes
  ICONS is training for outside a genuine test/peak context.
- **Keep the color system as client-facing communication and adherence
  branding** — it is legitimate and effective for that purpose — but do
  not sell it internally or to a client as an "optimal" physiological
  distribution; ACSM 2026 does not support that precision claim for the
  average adult.
- **Add an explicit weekly volume audit alongside the intensity coloring.**
  ICONS's day framework specifies intensity (%1RM) but not volume, and
  ACSM 2026's actual dosing guidance is volume-specific: ~10 sets/muscle/
  week for hypertrophy, 2-3 sets/exercise for strength, 30-70% 1RM moved
  with intent for power. Check color days against weekly per-muscle set
  counts, not just percentages — a client can hit every intensity color
  correctly and still be under- or over-volumed for her goal.
- **Add power work (30-70% 1RM moved with intent) to Green/Teal days for
  older clients** per ACSM 2026's power prescription — this is currently
  absent from the intensity taxonomy as described, and is distinct from
  (additive to) the existing "Power Training — Fall Risk & Longevity"
  section's sub-maximal-load-moved-with-maximal-intent protocol.

**Retroactive scope — deliberately not done in this pass.** Tiering the
existing roster by training status (who gets the simplified 2-day rotation
vs. the full 5-color rotation) and auditing existing client documents for
90% Red days without a testing/competition rationale is real per-client
review work, not a blanket rewrite — flagged for `icons-roster-analyst`/
`icons-expert` as follow-up, consistent with the deferred-rollout pattern
used for the P1 fixes above.

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

### Reassessment Cadence — corrected 8/17/2026, at Xolokan's direct instruction

**Two separate cadences track two separate things — do not conflate them.**

**Strength/baseline-battery reassessment: every 4 weeks (~30 days).** This is the standing cadence for re-testing the 11-movement ICONS Baseline Testing Protocol and updating a client's working loads/`summary.milestones4wk` off it — **corrected 8/17/2026 from the informal 8-week assumption used throughout this file and most client `rescanNote` text up to now.** This is a real policy change, not a restatement: prior to today, "8 weeks" was the default reassessment language baked into most client documents (their `rescanNote` fields, and the Assessment Report engine's own "Reassessed every 8-12 weeks" intro line — see below). Jake Poyner's document was the one existing exception already running a 4-week cycle; that exception is now the roster-wide standard, not a one-off. Base the 4-week reassessment on whatever strength metrics a client's program already tracks — her programmed Week 4 peak-test loads (per the "1RM CALCULATION" section's existing Week 1→Week 4 progression convention), her `milestoneTracker`'s 4wk field, or a fresh re-test of the full 11-movement battery where appropriate — not a fabricated or invented number. A client's actual documented Week 4 loads are frequently already the natural anchor for this check, since most programs already build to a Week 4 peak test as part of their normal progression.

**Styku body-composition rescan: stays at 8-12 weeks, unchanged.** This is a different measurement (body composition/segmental data, not strength) with its own separate evidentiary basis — see "3D Optical Scanning — Validity" above, which already states no calibration-interval guidance exists in the literature and that ICONS's own DXA-pairing/rescan cadence is a reasoned internal policy, not an evidence-based standard. Do not shorten the Styku cadence to match the new 4-week strength cadence — they are independent tracks that happen to sometimes coincide in a client's actual visit schedule, not the same clock.

**Jason Bethea's in-house PT reassessment is the operative mechanism for the 4-week strength track, not a separate third cadence.** When Jason reassesses a client (a functional strength test, a movement-quality re-check, a rehab-stage update) and documents it in his SOAP notes, that reassessment IS the 4-week strength check for that client — it should update her `summary.milestones4wk`/working loads and her document's language accordingly, the same way any other reassessment event would. This is also the confirmation mechanism already established for the six corrected-Asymmetry-Protocol discrepancies (see "Asymmetry Execution Log Standard" in `CLIENT_OPERATIONS.md`) — a functional test from Jason closes those the same way it closes a routine 4-week strength check. `icons-intake-monitor`'s weekly sweep of "ICONS NOTES JASON PDFS" is the trigger mechanism: when a new SOAP note lands for a roster client, that's the cue to update her document under this cadence, not just to log the note.

**What this does NOT mean: do not retroactively rewrite existing client documents' `rescanNote`/milestone text to claim a 4-week reassessment already happened.** Every current client document's existing "8-week rescan" language is real historical record of what was actually planned/documented at build time — it stays as delivered. Going FORWARD, from 8/17/2026: (1) any new client build should be written with the 4-week strength-reassessment cadence from the start; (2) any existing client whose program is revised for another reason should have this cadence folded in at that revision, per this file's existing "touch it, bring it current" practice; (3) as Jason's actual SOAP-note reassessments materialize for individual clients (via `icons-intake-monitor`'s sweep), that real data is what updates each client's document — not a blanket, undated rewrite of the whole roster with no new data behind it. **Improving every existing client document is real, explicitly directed follow-up work** (Xolokan, 8/17/2026: "improve all of our existing documents for every single client we have on file") — it proceeds per-client, gated on that client's actual next reassessment (hers, or Jason's), tracked via `CLIENT_OPERATIONS.md`'s review ledger (see below, retitled and re-thresholded to the 4-week cadence), not executed today with fabricated numbers.

**Engine/content consequence — RESOLVED 8/19/2026:** the Assessment Report's stale "Reassessed every 8-12 weeks" language (copied verbatim from the Anna Samuelsson reference document, which predates this policy correction) was corrected in `scripts/rena_paul_assessment_report.js` and the regenerated deliverable — and the 8/19 daily audit found it lived in THREE rendered locations, not one (`protocolIntro`, the "Reassessment" Next Steps card, and a "new 8-week baseline" observation-card phrase); all three now state the 4-week strength / 8-12 week Styku two-clock split. Any future Assessment Report build should copy the corrected phrasing from that script, not from the Anna Samuelsson reference.

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

## PROGRAM TEMPLATE LIBRARY — ELIZABETH POYNER AS REFERENCE PATTERN (added 8/17/2026, at Xolokan's direct request)

Elizabeth Poyner's document (`scripts/elizabeth_poyner_5day_plan.js`) is the most fully-instrumented program on the current roster — not because every client needs her volume, but because it demonstrates every element of a well-built program in one place. **Use this as a checklist of process elements to replicate, scaled to the individual client in front of you — never as a template to copy her literal 5-day/week structure onto a client whose schedule, recovery capacity, or clinical profile doesn't support it.** A 2-day/week client done to this same standard of instrumentation is a correctly-scaled program; a 2-day/week client given 5 days of Elizabeth's volume because "this is the template" is a misapplication of this section.

**The seven elements to replicate, each verified present in her actual build:**

1. **Baseline-to-working-load logic, made visible in the document itself.** Every tested lift carries its PR/baseline number AND the derived Week 1 → Week 4 progression, embedded directly in the exercise's `insight` field (e.g. "PR 195 lbs × 5 · Est 1RM 228 · Wk1: 180 · Wk2: 190 · Wk3: 200 · Wk4: 210–215") — not just a flat working number with the derivation buried in a script comment. Use `epley1RM()`/`workingLoad()` to compute it, then put the result where the reader can see the logic, the way this section's schema comment already recommends for the `load` field generally.
2. **Varied weekly intensities, not a flat template applied to every day.** Her week spans 60/70/80/90%/AR across 5 days (technique day, moderate day, primary strength day, peak day, active recovery) — the point isn't 5 specific values, it's that intensity is deliberately varied across the week rather than every session landing at the same relative effort. A 2-3 day/week client should still show real intensity variation across whatever days exist, not every day at "medium."
3. **RIR logging on nearly every work set**, via `rirNote` — not just present on the primary lift of the day, but threaded through accessory and even sub-maximal work (e.g. "3 RIR — sub-maximal" on a deliberately-easy Friday hinge exercise). This is the ACSM 2026 RIR Model in practice, not just cited in the abstract.
4. **Nutrition and recovery fields present and current**, not a one-time calculation left stale after the first build — her protein/BMR figures were caught and corrected against her actual current weight during an 8/14/2026 revision (see `CLIENTS.md`), which is the standard this element is checking for: does the nutrition block reflect the client's CURRENT data, re-verified at each revision, not just what was true at first build.
5. **Performance metrics with real numbers, not vague qualitative targets.** `summary.milestones8wk` states exact target numbers per lift ("Hex DL: 215–225 lbs for 5 reps...") — a client should be able to read her own document and know precisely what she's building toward, not just "get stronger."
6. **A real rescan review, not a placeholder.** `summary.rescanNote` isn't a generic "rescan recommended" line — it's the full actual Week 8 Styku comparison (ALST, VFA, BMI, segmental LST, body fat, lean mass) written up as narrative once the rescan happened, replacing the pre-rescan projection. This is what Section 2 of `CLIENT_OPERATIONS.md` (the 8-Week Review Ledger) is designed to make sure actually happens for every client, not just her.
7. **An explicit "resolved asymmetry" exit criterion, stated in the document itself.** Her `rescanNote` doesn't just report the new segmental numbers — it states the consequence directly: "Left Leg LST 12.7 lbs / Right Leg LST 13.1 lbs (0.4 lb gap — below threshold, monitor only, **no unilateral-lead protocol change indicated**)." A client whose asymmetry protocol has run its course should have that stated as plainly as this, not left implicit. This is the reference example Section 4 of `CLIENT_OPERATIONS.md` (the Asymmetry Execution Log Standard) points to for what a correctly-closed 8-week exit criterion looks like.

**What NOT to replicate:** her literal day count, her specific exercise selection, or her load numbers — those are hers, derived from her own tested PRs and her own schedule. The seven elements above are the process discipline; the actual program content still comes from each client's own intake data, exactly as this file's other sections already require.

---

## NEW CLIENT ONBOARDING — DOCUMENT CHECKLIST

**Mandatory research-coverage check (added 8/17/2026, at Xolokan's direct request — "client intake should auto-pull recent research on a client's condition").** Before building any new client's first document, or before a materially new condition/demographic surfaces for an existing client (a new clinical flag, a new age-bracket crossing, a first Styku scan revealing something new), check every clinical flag/condition/demographic on her intake — age bracket, sex, ALST/VFA/BMI status, any named condition (cardiac, OA, breast cancer/lymphedema, postpartum/DRA, GLP-1 use, etc.) — against CLAUDE.md's Evidence-Based Science Layer / Male Client Programming Framework. If a condition has no dedicated section yet, or the existing section is old enough to warrant a re-check against current literature, request a targeted `icons-research-analyst` pass on it BEFORE finalizing the document — do not proceed with zero or stale clinical grounding just because nothing flagged it yet. This is the same WebSearch-driven research pipeline that already built the Male Client Framework, Postpartum/DRA, Cardiac, OA, and Breast Cancer sections; it needs no new tooling, API, or key — only a guaranteed trigger at intake instead of an occasional one. See `.claude/agents/icons-expert.md` for the corresponding standing rule.

When a new client joins, build IN THIS ORDER:

```
□ 1. ICONS Performance Assessment Report (.docx via buildAssessmentReport() —
      see "ICONS PERFORMANCE ASSESSMENT REPORT — INITIAL BASELINE STANDARD"
      above for the full spec; updated 8/17/2026, supersedes the old
      obs_card/step_card sketch this checklist used to carry)
      - 8-box Styku stat grid + Segmental Lean Mass Distribution (statBoxGrid, statRowGrid/highlightRow)
      - Strength Assessment table, 10 core movements + bonus Pull-Ups (strengthAssessmentTable)
      - Exercise Benefit Breakdown cards, Aesthetics/Health/Biological Age (benefitCard, EXERCISE_BENEFIT_LIBRARY)
      - Body measurements grid + Trainer Observation cards (observationCard)
      - Jason PT-notes section if a coordinated-care relationship exists (jasonNotesSection)
      - Next Steps cards, flexible count (nextStepCard)
      - Methodology & footnotes appendix (footnotesList, DEFAULT_ASSESSMENT_FOOTNOTES + exercise-specific extensions)

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

**Table under active revision (8/17/2026)** — the external evidence review flagged ALST, VFA, protein, and bone-load framing for refinement; those rows are being updated as each fix lands (see the Research Update Log for the full writeup). Treat any row not yet marked "corrected" below as the pre-review version, still in use pending its own fix.

| Metric | At-Risk | Normal | Optimal |
|--------|---------|--------|---------|
| ALST (kg/m², women — corrected 8/17/2026) | < 5.5 | ≥ 5.5 (normal reference range — no graded "Optimal" tier; see ALST Index section above) | — |
| VFA — corrected 8/17/2026 | *(retired as a risk-band table — see "VFA (Visceral Fat Area)" section above; track change over time per client, use waist circumference against IAS/ICCR thresholds as the primary clinical-facing metric)* |||
| BMI | < 18.5 or ≥ 30 | 18.5–24.9 | 20–23 |
| Protein (g/kg/day) — corrected 8/17/2026 | < 1.6 | 1.6 (baseline, active women) | 1.6–2.2 (context-driven: energy deficit or heavy training load, NOT an age-band escalation — see "Protein Targets" section above) |
| Weekly sets/muscle | < 6 | 6–9 | ≥ 10 |
| Bone load (%1RM) — corrected 8/17/2026 | < 70% | 70–84% (8-12RM formulation, UK consensus default) | > 85%, supervised only, risk-gated (actual LIFTMOR intensity — see "Bone Loading" section above) |

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
| Osteoarthritis (knee/hip) | 8/16/2026 | All, both sexes | **No longer proactive-only (updated 8/18/2026)** — still zero *confirmed* OA diagnoses, but 6 intake-pending clients now carry knee-joint presentations the section speaks to: Bevy Smith (61, chronic right meniscus tear), Christina Alesci (47, chronic right knee, no imaging), Makai Brown (49, active inflamed left knee), Jerilan Greene (left anterior knee, VMO insufficiency), Danielle Purfey (49, bilateral knee discomfort on lunge), Heather Dolland (knee constraint: no deep flexion/impact/heavy load). See note below table. |
| Breast cancer survivorship / lymphedema | 8/17/2026 | Women, any bracket | **Zero roster clients — proactive only** (unchanged as of 8/18/2026) |
| Scoliosis & resistance training | 8/18/2026 | All; adult vs. adolescent scope distinction is critical | 1 client (Samantha Swan, 28, intake-pending, no plan built) |
| Women 65+ bracket (as a whole) | never dedicated | Women 65+ | **Zero roster clients** — Bevy Smith (61) and Elizabeth Poyner (64) are closest |
| Male 60+ bracket (as a whole) | never dedicated | Men 60+ | **Zero roster clients** |
| Women 20-35 bracket (as a whole) | never dedicated | Women 20-35 | Thin — Samantha Swan (28) is the clearest current case; peak-bone-mass window content has never had a dedicated pass |
| Pelvic Floor Protocol (bracing model, PFM co-activation vs. strengthening) | 8/17/2026 | Women, postmenopausal/heavy-loading | Well-represented (5 clients carry the callout) |
| Deload / planned recovery weeks | 8/18/2026 | All (direct RCTs are young-male only — no women/older-adult deload RCT exists) | Roster-wide — every client on continuous progressive loading; flagged via the Block Method pilot review (Siobhan Hansen: two active injury sites, 8 weeks, no lighter week) |
| Energy availability / caloric surplus for lean-mass gain | 8/18/2026 | All; underweight/ALST At-Risk focus | Directly live — Siobhan Hansen (BMI 17.4, ALST At-Risk) is the triggering case; complements (does not duplicate) the RED-S bullet and GLP-1 section |

**Note on the OA row (8/18/2026):** none of the six clients above has a documented OA diagnosis, and the section must not be applied to them as though they do — a meniscus tear, a VMO-insufficiency pattern, and an acutely inflamed knee are three different clinical problems, and only the first is closely OA-adjacent (degenerative meniscal pathology and knee OA overlap substantially in a 61-year-old). What the roster shift actually means is narrower and worth stating precisely: the OA section's single most transferable finding — that reflexively unloading a painful knee joint is the outdated default, and that progressive resistance training including heavier loading is core management rather than a risk to train around — now has real clients it bears on, so a future pass should verify it against *these* presentations (meniscus tear specifically, and patellofemoral/VMO-pattern anterior knee pain specifically) rather than assuming knee-OA evidence covers them. Neither meniscus tear nor patellofemoral pain has its own coverage in this file. That is the highest-value next research pass in this domain — flagged, not run today.

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

**8/17/2026 — thirteenth pass. External Evidence Review response, batch 1 (Priority 1 items) — ALST sex-conflation, Styku asymmetry trigger, pelvic-floor breathing rule, ACL/knee-valgus screening trigger.** Triggered by Xolokan uploading a full external methodology review ("Brace Life / ICONS Methodology / External Evidence Review," prepared for Oscar Sifuentes, Operations Lead/Movement Architect) checking 13 ICONS protocol elements against 2018-2026 peer-reviewed literature, with an instruction to adjust the system accordingly. This entry covers the four items the review flagged Priority 1 (most severe/highest-consequence); Priority 2/3 items and the downstream client-document sweep are separate, not-yet-started follow-up passes.
- **Corrected — ALST Index sex-conflation error.** The ALST Index table previously listed `≥7.0 kg/m² → Optimal` as a three-tier women's scale (At-Risk / Normal / Optimal). 7.0 kg/m² is EWGSOP2's MALE low-muscle-mass cutoff, not a female "optimal" threshold — it was misapplied as a top female tier. Corrected to a 2-tier structure (`<5.5 At-Risk` / `≥5.5 within normal reference range — a trend metric, not a graded score`), with new prose explaining EWGSOP2 treats lean mass as a confirmatory criterion (grip strength is primary), that EWGSOP2's own cutoffs are stated as "partly arbitrary," that SDOC (2020) excludes DXA lean mass from its definition entirely, and recommending grip strength/five-times-chair-stand as complementary function screens. Also flagged a genuine, unresolved gap: Styku's own ALM/ALMI output has not been validated against DXA (Bennett et al., Clinical Nutrition 41:211-218, did not validate ALM/ALMI) — present ALST as a trend metric, not a precision risk classification. Updated the Quick Reference table's ALST row to match, with a note flagging the rest of that table as under active revision. **Retroactive scope, deliberately deferred:** did not re-audit every existing client document's ALST-tier language against the corrected framing — that's separate future work, given the clinical-determination stakes of touching already-delivered client documents.
- **Corrected — Styku Asymmetry Protocol trigger.** The prior protocol triggered on any absolute L/R gap ≥0.5 lbs. The review's cited measurement-error data (Shape Up! Adults study) shows device error 2.6–3.6x larger than that trigger, meaning it was very likely firing on scan noise rather than real asymmetry a majority of the time. Corrected to a relative-percentage trigger (≥10% gap, per Bishop et al./Guan et al., with ≥15% specifically linked to injury risk in that literature) and above the studio's own measured scan coefficient of variation — explicitly labeled studio policy pending a real calibration study, not itself an evidence-backed number. Added a preference for a functional strength/power test as the primary trigger where available, and relabeled "weaker side leads" as coaching convention rather than a research-backed rule. Flagged that `weakerSide()` in the engine still does direction-only comparison with no %-relative-threshold computation — a known engine gap, not built in this pass. **Retroactive scope, deliberately deferred:** recalculating every current client's asymmetry-protocol status under the new ≥10% standard is separate future work (conceptually `icons-roster-analyst`/`icons-operations-analyst`'s scope), not a blanket rewrite done here.
- **Corrected — pelvic floor "no breath-holding" rule.** The engine's `pelvicFloorCallout()` (icons_template.js) and CLAUDE.md's Pelvic Floor section both previously prescribed a blanket "no breath-holding" rule. Per POGP (Pelvic, Obstetric and Gynaecological Physiotherapy) 2024 clinical commentary (Prevett & Moore), a permanent breath-hold prohibition is explicitly "not appropriate" — intra-abdominal pressure strategy should scale with load: free breathing on lighter work, exhale-on-exertion as the default, and a brief, controlled brace (which may include a short breath-hold) as normal and appropriate on the heaviest working sets. Corrected both the engine function's client-facing text and CLAUDE.md's prose to the graded model, cross-referenced against the existing Cardiovascular section's already-correct brief-brace-vs.-sustained-breath-hold distinction. **This fix required no per-client clinical re-determination** (unlike the two items above) since it's a language/framing correction to when the same callout fires, not a change to who it applies to — so it WAS rolled out immediately: regenerated all 5 affected client documents (Mary Burfete, Kayma Liburd, Siobhan Hansen, Johanna Castillo, Elizabeth Poyner — everyone with `isPostmenopausal: true` or `forcePelvicFloor: true`), both trainer and Client View copies, and spot-verified the corrected text landed in the regenerated .docx XML.
- **Corrected — ACL/knee-valgus screening trigger.** The prior protocol gated the corrective/neuromuscular circuit on a positive visual single-leg-squat/drop-landing screen. This is not supported: a prospective study of 880 elite female athletes (JOSPT 2021) found visual assessment of the vertical drop jump/single-leg squat "cannot predict who will sustain a future noncontact ACL injury," and Nilstad et al. ("Kiss goodbye to the 'kissing knees,'" Sports Biomechanics 2021) found no association between frontal-plane knee motion and future ACL injury across 74 real injuries — while the intervention itself is strongly evidenced at the population level regardless of screen status (Lauersen et al., BJSM 2018;52:1557, RR 0.338 for sports injuries; a 2025 meta-analysis of 24 RCTs, lower-limb injury RR 0.73). Net effect of the old trigger: withholding an effective intervention from most of the clients who would actually benefit, since most future ACL injuries occur in people who don't visually fail the screen. Rewrote the section to make the circuit universal rather than screen-gated, retaining the screen only as a coaching/technique tool; added the evidenced dose (20-30 min, 1-2x/week, sustained beyond 6 months); added an adherence-tracking requirement (≥76% session completion, HSS Journal 2023, dose-responsive with a 64% ACL-risk reduction at that threshold); and added a Nordic hamstring/eccentric hamstring recommendation (BJSM 2019;53:1362, ~50% hamstring-injury-rate reduction) as a distinct addition, not a Copenhagen-plank substitute. **Retroactive scope, deliberately deferred:** converting every existing client's screen-gated circuit into a universal, dosed, adherence-tracked standing program component is real structural work (a new weekly time allocation, potentially displacing existing content) — flagged for `icons-roster-analyst`/`icons-expert` as separate follow-up, not done blanket in this pass.
- **Also checked and cleared — retracted Copenhagen citation.** The review flagged that a 2025 "Copenhagen Adduction Exercise" systematic review/meta-analysis (Scandinavian Journal of Medicine & Science in Sports) was formally retracted (2026 retraction notice, PMC12363431) and must never be cited. Repo-wide search (CLAUDE.md and every client/trainer script) confirmed this retracted paper is NOT currently cited anywhere in this system — the existing Copenhagen Plank citation was already the valid Harøy et al. cluster-RCT, just mislabeled "2018" instead of "2019" (BJSM 2019;53:150). Corrected the year in all 3 locations it appears (Copenhagen Plank section, 20-35 bracket cross-reference, Male Framework cross-reference) and reworded the Copenhagen Plank protocol itself to match the source trial's actual pain-guided, three-progression-level design (previously described as hold-time progression, which didn't match Harøy et al.'s real protocol) — added an explicit citation-warning paragraph naming the retracted paper so it can't be accidentally introduced in a future research pass.
- Sources: [Lauersen JB, Andersen TE, Andersen LB, "Strength training as superior, dose-dependent and safe prevention of acute and overuse sports injuries: a systematic review, qualitative analysis and meta-analysis," British Journal of Sports Medicine 2018;52:1557-1563](https://bjsm.bmj.com/content/52/24/1557) · [Prospective study of visual assessment of vertical drop jump and single-leg squat for future noncontact ACL injury prediction in elite female athletes, Journal of Orthopaedic & Sports Physical Therapy 2021](https://www.jospt.org/) · [Nilstad A, et al., "Kiss goodbye to the 'kissing knees': no association between frontal plane inward knee motion and risk of future noncontact ACL injury in elite female athletes," Sports Biomechanics 2021](https://pubmed.ncbi.nlm.nih.gov/) · [Neuromuscular training and lower-limb/knee injury risk in adolescent and young athletes, meta-analysis of 24 RCTs, 2025](https://pmc.ncbi.nlm.nih.gov/) · [FIFA 11+ program effectiveness review, 2025, PMC12856364](https://pmc.ncbi.nlm.nih.gov/articles/PMC12856364/) · [Adherence and ACL injury risk reduction dose-response meta-analysis, HSS Journal 2023;19:154-162](https://journals.sagepub.com/home/HSS) · [Attia AK, et al., systematic review and meta-analysis, Nordic hamstring exercise and hamstring injury rates, British Journal of Sports Medicine 2019;53:1362](https://bjsm.bmj.com/) · [Retraction notice, Copenhagen Adduction Exercise systematic review/meta-analysis, Scandinavian Journal of Medicine & Science in Sports 2026 Apr;36(4):e70287, PMC12363431](https://pmc.ncbi.nlm.nih.gov/articles/PMC12363431/) · [Harøy J, et al., "The Adductor Strengthening Programme prevents groin problems among male football players: a cluster-randomised controlled trial," British Journal of Sports Medicine 2019;53:150-157](https://bjsm.bmj.com/content/53/3/150) · [Prevett C, Moore IS, "Return to running and impact loading after childbirth: current clinical commentary" / POGP 2024 pelvic-floor bracing clinical commentary](https://pogp.csp.org.uk/) · Source document: Brace Life / ICONS Methodology / External Evidence Review (uploaded 8/17/2026, prepared for Oscar Sifuentes, Operations Lead/Movement Architect).

**8/17/2026 — fourteenth pass. External Evidence Review response, batch 2 (Priority 2 and Priority 3 items) — VFA, protein, collagen, 3D optical scanning validity (new section), RIR precision, intensity framework, creatine, LIFTMOR, menstrual cycle.** Direct continuation of the thirteenth pass (same source document), covering the remaining 9 of 13 protocol items the review checked.
- **Corrected — VFA (Visceral Fat Area).** Retired the absolute risk-band table (<70/70-99/100-149/≥150 → Very Low/Low/Moderate/High Risk) — no consensus body endorses a single VAT/VFA cutoff (published CT-derived thresholds span 82-140 cm² across studies), and in women specifically, risk-relevant CT thresholds run considerably higher than ICONS's old bands assumed (Kelley et al.: ≥106 cm² marks elevated risk in women, not 100; population median VFA for women in one large cohort was 89.8 cm², meaning a typical woman sat inside ICONS's old "Low" band). Compounding problem: Styku's own VFA validation was against DXA VAT in KILOGRAMS, never in cm² and never against CT/MRI — the device was reporting a CT-derived threshold it was never validated to reproduce in those units. Reframed VFA as a trend metric tracked per-individual over time rather than an absolute risk classification, and added waist circumference (IAS/ICCR female thresholds: 80/90/105/115 cm) as the primary clinical-facing metric — an actual international consensus panel recommends this metric for routine use, unlike VAT/VFA itself.
- **Corrected — Protein Targets, the most consequential item in this batch.** Retired the age-banded escalation (1.6 baseline → 1.8-2.0 at 40+ → 2.0-2.2 at 50+/ALST At-Risk) in favor of a context-driven range: 1.6 g/kg/day baseline, moving up to 2.2 g/kg/day for genuine energy deficit or heavy training load, or ALST At-Risk — NOT for age/bracket alone. The most current female-specific synthesis found (GSSI/Phillips, Nov 2025) states peri- and postmenopausal athletes likely need no different protein target than premenopausal athletes — directly contradicting the age-escalation premise. **This explicitly SUPERSEDES the 8/13/2026 seventh-pass reconciliation** (which concluded the age-50 OR-gate was correct) — that pass worked from Morton et al. 2018 alone, which is not menopause-specific; this pass found a more current, population-specific source that overturns the shared premise both passes worked from. Recorded transparently per this file's citation-integrity practice rather than silently overwritten. Also lowered the per-meal target (~0.4→~0.3 g/kg), added a pre-sleep 30-40g protein option and a +10% plant-based adjustment, and softened the leucine claim to "approximate, not protocol-grade." **Engine consequence flagged, not built:** `proteinTargets()` in icons_template.js implements the now-retired `atRisk || ageYears >= 50` age trigger; the corrected trigger needs "energy deficit" and "heavy training load" as new structured client-data fields, not just a formula edit — flagged for `icons-expert`/`icons-research-analyst` as real follow-up, with every current client's computed protein target needing individual review once the engine changes (not a blanket regeneration under an unchanged formula).
- **Corrected — Collagen timing and claims.** Narrowed the pre-session timing window from "30-60 min" to "45-60 min" for the 15g dose — Shaw et al.'s actual protocol dosed 1 hour pre-exercise for 15g, and the 30-minute end was never studied at that dose (the source paper's own note was that a SMALLER 5g dose would have been better timed at 30 min). Repositioned the rationale from acute/pre-workout to chronic/structural — a Jan 2026 umbrella review (16 meta-analyses, 113 RCTs) explicitly found no effect on tendon mechanical properties and describes collagen's effect as "chronic and structural rather than acutely ergogenic"; a separate meta-analysis of 13 RCTs found collagen does NOT further improve musculoskeletal performance when added to exercise. Reprioritized collagen below creatine and protein in the client supplement hierarchy given the comparatively thin evidence base (a small number of tendon-specific RCTs, notable female-data gap).
- **Added (new section) — "3D Optical Scanning — Validity & What It's Actually Good For."** This system never had a single place stating what Styku is actually validated to do, despite using it as the measurement backbone for ALST, VFA, %BF, and circumferences. New section covers: excellent test-retest PRECISION but wide individual-level limits of agreement vs. DXA (~±7-11 percentage points on a single %BF reading); POOR validity against a true 4-compartment-model criterion (optical scanners are calibrated to DXA, so DXA agreement is partly circular); segmental (arm/leg/trunk) composition is NOT reliable for client reporting (CCCs ~0.32-0.52); change-tracking — the device's actual real-world use case — performs moderately and BETTER in women specifically (female ALM change R²=0.70); circumferences are the device's most trustworthy output (ICC≈0.99); and no calibration-interval guidance exists anywhere in the literature, so any ICONS rescan/DXA-pairing cadence is a reasoned internal policy, not an evidence-based standard, and should be stated to clients that way.
- **Corrected — RIR precision claims.** RIR-based autoregulation still ranks above fixed-percentage prescription (2025 network meta-analysis: APRE 93.0% SUCRA vs. RPE/RIR 66.8% vs. percentage-based 13.2%), but accuracy degrades the farther a set is from failure, and novice-client accuracy evidence is genuinely conflicting. Collapsed everything above 2 RIR into a single "technique/submaximal" band rather than treating 3/4/5+ RIR as meaningfully distinct targets, and reserved RIR-precision claims for the 0-2 RIR range where measured accuracy (±0.65 reps in trained lifters, Refalo et al. 2024) actually supports them. Changed the DEFAULT proximity for PRIMARY lifts from 1 RIR to 2 RIR — a 2024 dose-response meta-regression found strength gains largely unrelated to estimated RIR, so 1 RIR is not the stronger strength driver ICONS's old tiering implied; reserved 1 RIR for hypertrophy-priority accessory work instead. Added a formal RIR calibration protocol for new clients (call RIR on a submaximal set, then take it to true failure and record the discrepancy, repeat until ≤1 rep error for two sessions) and a note that velocity-based training shows no significant strength advantage over percentage-based training — not worth adopting for general clients, reserve for athletic/power-focused ones.
- **Corrected — Intensity framework (Teal/Green/Gold/Red/Blue).** Structure and the 80%/Gold anchor are confirmed well-supported (Moesgaard et al. 2022: undulating periodization beats linear; ACSM 2026's strength anchor is ~80% 1RM). Two corrections: the periodization benefit is concentrated in TRAINED clients (ES 0.61) and essentially absent in untrained ones (ES 0.06) — added a simplified two-day rotation (Gold+Green only) for clients in their first ~6 months, reserving the full five-color rotation for post-novice clients; and restricted Red (90%) days to clients with an actual testing/competition reason, since no source reviewed supports 90% 1RM as NECESSARY for general strength/hypertrophy outcomes in a recreational client. Added a weekly-volume-audit requirement (ACSM 2026 specifies volume, not just intensity) and a power-work addition (30-70% 1RM moved with intent) for Green/Teal days with older clients. **Retroactive scope, deliberately deferred:** training-status tiering of the existing roster and auditing existing 90%-day programming for a testing/competition rationale is per-client review work, flagged for follow-up rather than done blanket here.
- **Refined (verdict unchanged, strongest-evidenced item) — Creatine.** 3-5g/day, no loading, with food remains correctly the standard — ISSN 2021 explicitly endorses exactly this. Added: an explicit ~4-week saturation-timeline expectation for clients; a caution not to imply the standard dose drives the cited cognitive benefits (those protocols used 15-20g/day loading then 5-10g/day maintenance, well above ICONS's 3-5g); an optional body-mass-scaled tier (0.10-0.14 g/kg/day, ~6-7g for a 65kg woman) for bone-loading-focused/LIFTMOR-candidate clients specifically, since that's the dose used in the 52-week postmenopausal femoral-neck BMD trials; and an explicit "must be paired with resistance training" framing, since creatine alone did not increase lean mass in postmenopausal women over 2 years.
- **Corrected — LIFTMOR bone-loading protocol.** Fixed the intensity descriptor from "≥80% 1RM" to ">85% 1RM" (the actual LIFTMOR trial's prescription) in the live protocol section and the Quick Reference table, and noted HiRIT's impact-loading component (ground reaction forces >4x body weight, e.g. assisted jumps) is part of the core stimulus, not a mere supplement — omitting it means ICONS is running "HiRT," not "HiRIT." Added: an explicit supervision requirement (LIFTMOR, MEDEX-OP, and the pelvic-floor safety trial were all fully supervised — do not prescribe as unsupervised homework); a mandatory risk-stratification gate (prior vertebral fracture/multiple low-trauma fractures/very-low BMD routes to individualized PT first — the concrete reason: a MEDEX-OP participant sustained a vertebral fracture after a fall, with 30 falls across 21% of participants, making fall risk rather than lifting load the proximate harm mechanism in the trial evidence); a formal technique-first ramp-in phase before reaching >85% 1RM (ICONS's Teal day is the natural vehicle); a loaded-spinal-flexion prohibition; and 2025 pelvic-floor safety data (HiRIT at >80% 1RM does NOT aggravate pelvic-floor dysfunction symptoms, with a preliminary protective signal in prior-prolapse clients) supporting heavy bone-loading work for pelvic-floor-flagged clients rather than defaulting to caution.
- **Corroborated with additions — Menstrual Cycle Training, confirmed the best-aligned protocol in the entire system.** ICONS's existing stance (no calendar-phase restrictions, RPE/RIR autoregulation, 3-cycle individual symptom tracking) matches current consensus almost point-for-point. Added independent corroboration from the 2025 UEFA menstrual-cycle-tracking consensus (which also specifies exactly a 3-cycle, 21-35-day-regular-cycle self-report window) and a 2025 scoping review finding calendar-based phase calculations specifically "are not accurate." One real downgrade: HRV moved from a decision input to an optional observational metric only — a 2024 RCT found HRV-guided individualization produced no significant advantage on any strength/hypertrophy/function outcome versus fixed scheduling. Added a menstrual-health red-flag referral trigger (absent/irregular/newly-lost periods → medical referral, not a programming adjustment) and confirmed the phase-ACL-risk question remains genuinely unresolved (not a basis for phase-based precautions) — the real, phase-independent elevated ACL risk in women is already addressed via the corrected universal neuromuscular circuit above.
- Sources: [Examination Committee for "Obesity Disease," Japan (JASSO), VFA ≥100cm² CT-derived criterion, Circulation Journal 66:987-992] · [Kelley et al., VFA thresholds in women >45, Diabetes Care 26:1413] · [Polcrová et al., Kardiovize cohort VFA cutoffs, UCL Discovery] · [Ross et al., IAS/ICCR consensus, waist circumference thresholds, Nature Reviews Endocrinology 16:177-189] · [Bennett et al., Styku S100 validation against DXA, Clinical Nutrition 41:211-218] · [Tinsley et al., 3D optical scanning vs. 4-compartment model, Applied Physiology, Nutrition, and Metabolism 46:644-650] · [D'Souza & Phillips, female athlete protein targets, GSSI Sports Science Exchange #270, Nov 2025] · [Nunes et al., protein dose-response meta-analysis, Journal of Cachexia, Sarcopenia and Muscle 13:795-810] · [Jäger et al., ISSN protein position stand, JISSN 14:20] · [Shaw et al., collagen + vitamin C pre-load, American Journal of Clinical Nutrition 105:136-143] · [Bischof et al., collagen dose-response systematic review, Sports Medicine 54:2865-2888] · [Kirmse et al., collagen performance meta-analysis, Deutsche Zeitschrift für Sportmedizin 75:179-188] · [Refalo et al., RIR prediction accuracy, Journal of Strength and Conditioning Research 2024] · [Robinson et al., proximity-to-failure dose-response meta-regression, Sports Medicine 2024 (reused, already cited above)] · [Moesgaard et al., periodization meta-analysis, Sports Medicine 2022] · [Antonio et al., ISSN creatine common questions/misconceptions, JISSN 2021] · [Watson et al., LIFTMOR RCT, Journal of Bone and Mineral Research 2018] · [MEDEX-OP pelvic floor safety analysis, PMC12618346, 2025] · ["Strong, Steady and Straight" UK consensus statement, British Journal of Sports Medicine 2022;56:837] · [Colenso-Semple et al., menstrual cycle umbrella review, Frontiers in Sports and Active Living 2023] · [UEFA consensus on menstrual cycle tracking, BMJ Open Sport & Exercise Medicine 2025;11(3):e002769] · Source document: Brace Life / ICONS Methodology / External Evidence Review (uploaded 8/17/2026, prepared for Oscar Sifuentes, Operations Lead/Movement Architect).

**8/17/2026 — fifteenth pass. Citation verification: "Skaug et al. 2024" (heavy compound lifting co-activates but does not strengthen the pelvic floor) — new pilot document type, Priority-flagged by `icons-doc-auditor`.** Triggered by the new ICONS Performance Assessment Report document type's Hip Thrust benefit copy (drawn from Xolokan's own uploaded reference document) citing "Skaug et al. 2024" for the claim that heavy compound lifting co-activates but does not itself strengthen the pelvic floor — a citation `icons-doc-auditor` flagged as absent from this file's citation trail and therefore unverified. The client-facing citation text had already been pulled from the pilot document pending this check (see `scripts/rena_paul_assessment_report.js`'s header comment), with the underlying claim retained unattributed as a reasonable inference from the existing Pelvic Floor Protocol. This pass verifies (or replaces) that citation directly.
- **Verified — the citation is real, correctly attributed, and directly on-point (not a garbled or mis-cited reference).** Skaug KL, Engh ME, Bø K, "Acute Effect of Heavy Weightlifting on the Pelvic Floor Muscles in Strength-Trained Women: An Experimental Crossover Study," *Medicine & Science in Sports & Exercise* 2024;56(1):37-43. Confirmed via multiple independent search hits (PubMed/PMC record, the journal's own LWW/Ovid listing, and the 2023 ICS conference abstract that preceded the full publication) — journal, year, volume/issue/pages, and all three author names cross-checked and consistent across sources. n=47 nulliparous, strength-trained women (18-35), randomized crossover of 60 min heavy weightlifting — 4×4 back squat and deadlift at 75-85% 1RM — vs. 60 min seated rest, with vaginal pressure (PFM resting pressure/strength/endurance) and surface EMG measured before/after each condition. Two findings, both directly relevant: (1) heavy weightlifting had no immediate adverse effect on the PFM relative to rest — reinforcing, not contradicting, this file's existing "symptom onset ≠ damage, heavy lifting is well tolerated by the PFM" framing (added 8/17/2026, thirteenth pass); and (2) PFM strength showed **no statistically significant correlation** with whole-body maximal or relative strength (1RM or 1RM/bodyweight) in either squat or deadlift — the authors' own stated conclusion is that this implies **targeted PFM training is necessary to improve PFM strength**, i.e. heavy compound lifting does not build PFM strength as a side effect of building whole-body strength. This is essentially a verbatim match for the claim in the pilot document's original footnote — the citation was correct, just previously unverified in this system.
- **Added:** a new paragraph, "Co-activation during a lift ≠ PFM strengthening," in the Pelvic Floor Protocol section of the Evidence-Based Science Layer, with the full citation and an honest scope caveat (the Skaug cohort is young, nulliparous, and already strength-trained — not a direct replication of this file's core postmenopausal population — but it is the most direct available evidence on this specific mechanistic question, and there is no reason to expect a physiologically distinct-qualities finding like this to reverse in an older population). Framed as a practical takeaway: a client's heavy-lifting program is not a substitute for targeted PFM training if continence/PFM strength is itself a goal, which stays a pelvic floor PT referral — consistent with, not a change to, this section's existing referral-not-diagnose posture.
- **Categorization: Upgrade.** The underlying claim was already correctly stated in the pilot document and retained (unattributed) in CLAUDE.md's inference chain per the auditor's interim fix — this pass supplies the verified citation that was missing, rather than correcting a substantive error.
- **Handback note:** per this agent's scope boundary, `scripts/rena_paul_assessment_report.js` and `scripts/icons_template.js` were NOT edited — the Hip Thrust footnote text in those files should be updated to cite Skaug KL, Engh ME, Bø K, *Medicine & Science in Sports & Exercise* 2024;56(1):37-43 directly, matching the language now in CLAUDE.md's Pelvic Floor Protocol section.
- Sources: [Skaug KL, Engh ME, Bø K, "Acute Effect of Heavy Weightlifting on the Pelvic Floor Muscles in Strength-Trained Women: An Experimental Crossover Study," Medicine & Science in Sports & Exercise 2024;56(1):37-43 — journal listing](https://journals.lww.com/acsm-msse/fulltext/2024/01000/acute_effect_of_heavy_weightlifting_on_the_pelvic.5.aspx) (also [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11805478/) and [Ovid/LWW full text](https://www.ovid.com/jnls/acsm-msse/fulltext/10.1249/mss.0000000000003275~acute-effect-of-heavy-weightlifting-on-the-pelvic-floor)) · [ICS 2023 Abstract #282, preceding conference abstract for the same study/authors](https://www.ics.org/2023/abstract/282) · [World Physiotherapy congress-proceeding listing, same study](https://world.physio/congress-proceeding/acute-effect-heavy-weightlifting-pelvic-floor-muscles-experimental-crossover)

**8/18/2026 — sixteenth pass. Scoliosis & resistance training (new topic, first pass — genuine gap, zero prior coverage) + Demographic Scope Rule "no data at all" case + Coverage Index roster-representation refresh.** Triggered by the daily subagent check-in following the 8/18 onboarding of 10 intake-pending clients from Jason Bethea's SOAP-note archive. Ran under the mandatory research-coverage check at NEW CLIENT ONBOARDING: Samantha Swan (28, intake-pending) has a documented left-sided scoliosis with a directional preference and loaded-hip-hinge intolerance, and no document has been built for her yet — this is the intended timing for that check, before a build rather than after.
- **Added (new subsection):** "Scoliosis & Resistance Training," placed between Osteoarthritis and Breast Cancer Survivorship (grouping it with the other condition-specific loading sections). Confirmed via repo-wide search that scoliosis had zero prior coverage anywhere in this file, despite extensive spinal-loading content elsewhere (LIFTMOR's loaded-spinal-flexion prohibition, pelvic floor bracing, lumbar positioning).
- **Deliberately did NOT pattern-match the OA/lymphedema conclusion, and said so explicitly in the section.** The two most recent condition sections both concluded that the cautious "restrict load to protect the structure" instinct is the outdated one, contradicted by strong RCT evidence. That conclusion does not transfer here: no RCT of progressive resistance training in adults with scoliosis was located at any intensity — not positive, not negative. The section states plainly that the evidence is thin in both directions. Flagging this as the substantive judgment call of the pass, since the tempting write-up (a third "the cautious instinct is wrong" section) would have been unsupported.
- **Key scope distinction folded in:** nearly all scoliosis exercise evidence is adolescent idiopathic scoliosis (AIS) during growth, with Cobb-angle progression as the outcome — a different clinical problem from a skeletally mature adult, where the goals are pain/function/QoL. Three populations separated in the section (AIS / adult idiopathic carried forward from adolescence / adult degenerative de novo), with a note that adult degenerative scoliosis is closer in character to the Osteoarthritis section than to AIS and is the form likelier to appear in this file's 55-65/65+ brackets.
- **Standing guideline, with the usual not-superseded caveat:** the 2016 SOSORT guidelines remain the most current full set located (a SOSORT 2025 congress was held; no published 2025 guideline replacement found) — and they are explicitly scoped to scoliosis "during growth," i.e. an adolescent document being used as the nearest available adult reference. Stated as a limitation rather than assumed away. PSSE's four consensus principles (3D auto-correction, ADL training, stabilization of corrected posture, patient education) documented, with the boundary that PSSE program design belongs to a school-trained clinician, not an ICONS trainer.
- **Adult-specific evidence located and cited with honest design caveats:** Negrini A, et al., Scoliosis 2015;10:20 (ISICO, Milan) — retrospective cohort, n=34 adults with adult idiopathic scoliosis (5M/29F, mean age 38.0±11.0), SEAS auto-correction exercises ≥2×/week × 45 min. Flagged as retrospective, small, single-institute, uncontrolled, and authored by the group that developed SEAS — the same single-research-line transparency caveat this file already applies to LIFTMOR/Watson et al.
- **Verified that the practitioner's directional-preference finding is evidence-consistent, not improvisation.** Auto-correction is the defining principle of Schroth/PSSE, and concave-side-targeted asymmetric spinal stabilization is a trialed approach in AIS RCTs. Practical rule added: a clinician-documented directional preference is authoritative for ICONS to build around, treated the same way a physician-issued cardiac HR ceiling already is — and side must be stated explicitly on every lateral-flexion/rotation/unilateral exercise in a scoliosis client's document, since wrong-side execution is a documented real provoking mechanism (it happened mid-session in Samantha Swan's own note).
- **Axial load — quantified the mechanism without overclaiming it.** Cited the strongest mechanistic source located (Frontiers in Bioengineering and Biotechnology 2020;8:159, n=24 AIS, subject-specific musculoskeletal models from biplanar radiographs): deformity alone raises apex compressive force ~10% unloaded, then +50-62% at a 10%-bodyweight load, +77-94% at 15%, +103-128% at 20% — the notable feature being non-linear amplification. Stated precisely what this does support (preferring non-axial load vectors — hip-belt/Kaiser belt-harness squat, supported hinge variants — for an axial-load-provoked client) and what it does not (declaring squats/deadlifts contraindicated in scoliosis: it is a modeling study, in adolescents, predicting forces, not measuring curve progression or injury in trained adults).
- **Compound-profile finding, per the per-client research mode — a real unresolved tradeoff named rather than silently resolved:** this file's 20-35 bracket states heavy compound lifting builds peak bone mass in a window that closes permanently. For a 28-year-old with scoliosis, systematically routing around axial load protects symptoms while removing exactly the axial stimulus that window depends on. Documented as a genuine tension to name in the client's document and route to the coordinating clinician, not a call for a trainer or this file to make in either direction.
- **Scope boundary added, consistent with existing precedent:** PSSE/Schroth is a certified specialty; neither Jason Bethea's nor Niko Heers' confirmed in-house scope includes it. Jason's documented management of this client is real coordinated care and should be named as such, but describing it as PSSE specifically would be an unverified claim — same boundary already applied to pelvic floor PT and lymphedema therapy.
- **Explicitly not verified, flagged as hypothesis:** the paraspinal thermal-regulation idea in the SOAP note (simultaneous car AC + seat warmer interfering with autonomic paraspinal tone regulation) could not be substantiated in the literature in this pass. Recorded in the section as the practitioner's working hypothesis, with an instruction that it must not appear in any client-facing document as an established mechanism.
- **Added (process gap, not a literature finding) — Demographic Scope Rule now handles "no demographic data at all" as a distinct third case.** Surfaced by Sarah's 8/18 build (no age, no sex, no scan — only trainer-observed movement constraints) and by several of the 8/18 SOAP-note clients whose notes state neither DOB nor sex. The rule's existing two bullets both presuppose knowing enough about a client to determine she falls outside a framework; here you cannot determine which framework applies at all. Added an explicit list of what genuinely transfers with zero demographic data (three-zone structure, RIR/RPE autoregulation and calibration, corrective-before-compound sequencing, Antagonist Rotation, symptom/performance-governed progression) versus what must not be applied and must be stated as not applied (every numeric threshold without exception, including the Intensity Framework's novice-vs-trained tiering, which needs training age). Key distinction drawn: this is a DATA gap, not a POPULATION gap, so unlike the adjacent bullet it does not trigger a framework-building research pass — there is no population to research. It triggers an intake request instead, with age and sex identified as the two fields that unlock the most downstream clinical content.
- **Updated — Coverage Index roster-representation column.** Osteoarthritis moved off "zero roster clients — proactive only": six intake-pending clients now carry knee-joint presentations. Added a precision note below the table rather than overstating the shift — none of the six has a documented OA diagnosis, and a meniscus tear, a VMO-insufficiency pattern, and an acutely inflamed knee are three different clinical problems. What genuinely changed is that the OA section's most transferable finding (reflexive unloading of a painful knee is the outdated default) now has real clients it bears on. Breast cancer survivorship confirmed unchanged at zero. Added rows for Scoliosis and for the Women 20-35 bracket (never dedicated, and now thin-but-real via Samantha Swan); updated the Women 65+ row to note Bevy Smith (61) alongside Elizabeth Poyner (64).
- **Flagged as the highest-value next pass in this domain, not run today:** neither meniscus tear nor patellofemoral/VMO-pattern anterior knee pain has any coverage in this file, and four of the six knee-presentation clients above fall into one of those two categories rather than OA proper. Assuming the OA section covers them would be exactly the kind of silent extrapolation this file's Demographic Scope Rule exists to prevent.
- Did not touch any client document, build script, or `CLIENTS.md` — per this agent's non-negotiables. Two items flagged back to the main thread/`icons-expert` for their scope: (1) Samantha Swan's eventual build should carry explicit side-labeling on lateral-flexion/rotation/unilateral work and should present her belt-harness squat as a progressing primary tool with real Wk1→Wk4 loads, not a placeholder regression; (2) Sarah's already-built document should be checked for whether it carries the explicit no-data scope note the corrected Demographic Scope Rule now requires.
- Sources: [2016 SOSORT guidelines: orthopaedic and rehabilitation treatment of idiopathic scoliosis during growth, Scoliosis and Spinal Disorders](https://scoliosisjournal.biomedcentral.com/articles/10.1186/s13013-017-0145-8) (also [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5795289/)) · [Berdishevsky H, et al., "Physiotherapy scoliosis-specific exercises – a comprehensive review of seven major schools," Scoliosis and Spinal Disorders 2016;11:20](https://link.springer.com/article/10.1186/s13013-016-0076-9) (also [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4973373/)) · [Negrini A, Negrini MG, Donzelli S, Romano M, Zaina F, Negrini S, "Scoliosis-Specific exercises can reduce the progression of severe curves in adult idiopathic scoliosis: a long-term cohort study," Scoliosis 2015;10:20](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4537533/) (also [Springer](https://link.springer.com/article/10.1186/s13013-015-0044-9)) · [Spinal Compressive Forces in Adolescent Idiopathic Scoliosis With and Without Carrying Loads: A Musculoskeletal Modeling Study, Frontiers in Bioengineering and Biotechnology 2020;8:159](https://www.frontiersin.org/journals/bioengineering-and-biotechnology/articles/10.3389/fbioe.2020.00159/full) (also [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7062648/)) · [Schroth and Asymmetric Spinal Stabilization Exercises' Effectiveness on Back Pain and Trunk Muscle Endurance in Adolescents' Idiopathic Scoliosis: A Randomized Controlled Trial](https://pmc.ncbi.nlm.nih.gov/articles/PMC11644102/) · [Outcomes of 12 Weeks of Schroth and Asymmetric Spinal Stabilization Exercises on Cobb Angle, Angle of Trunk Rotation, and Quality of Life in Adolescent Boys with Idiopathic Scoliosis: A Randomized-controlled Trial](https://pmc.ncbi.nlm.nih.gov/articles/PMC10838577/) · [Schroth Physiotherapeutic Scoliosis-Specific Exercise (PSSE) Trials—Systematic Review of Methods and Recommendations for Future Research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10297476/) · [Evaluating exercise therapies in adolescent idiopathic scoliosis: a systematic review with Bayesian network meta-analysis, PeerJ 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11967429/) · [Treatment of idiopathic scoliosis with conservative methods based on exercises: a systematic review and meta-analysis, Frontiers in Sports and Active Living 2024](https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2024.1492241/full) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/39763485/))

**8/18/2026 — seventeenth pass, same day (second dated entry per this log's same-day convention; the sixteenth pass was this morning's scoliosis section). Deload/planned recovery weeks + energy availability/caloric surplus for lean-mass gain — two new topics, first pass each; both genuine gaps confirmed via repo-wide search before writing.** Triggered by an external review of the Block Method pilot (Siobhan Hansen), which surfaced that (a) this file had extensive intensity/volume/RIR guidance but ZERO deload coverage anywhere (the only prior "deload" appearances in this system: one Week-4 row in Jake Poyner's script and one sentence in the deep-reference doc), and (b) nothing anywhere stated that hypertrophy requires adequate TOTAL energy, not just protein — despite an underweight (BMI 17.4), ALST At-Risk client having protein/creatine prescribed with no eat-above-maintenance instruction, and despite the file's own RED-S bullet already acknowledging under-fueling risk without any surplus protocol behind it.
- **Added (new subsection): "Deload / Planned Recovery Weeks,"** placed directly after "Why Not Just Fix Every Exercise At 8–12 Reps?" (grouping it with the RIR/progressive-overload material it governs). Key findings folded in: (1) practice/consensus base is strong but the direct RCT base is thin, and the section says so — the "roughly every 5-6 weeks" cadence comes from Bell et al.'s 2024 cross-sectional survey of 246 competitive strength/physique athletes (all respondents deloaded; typical deload 6.4±1.7 days every 5.6±2.3 weeks, proactive or proactive-plus-autoregulated), backed by the same group's 2023 international Delphi consensus (Sports Medicine - Open 9:87) and 2022 qualitative coach study — survey/consensus evidence, cited as such, not trial evidence; (2) what a light week costs: Coleman et al. 2024 (PeerJ 12:e16777, 9-week RT in trained lifters) found a mid-point week of FULL TRAINING CESSATION — noted explicitly in the section as a harsher intervention than a true reduced-load deload — produced no difference in lower-body hypertrophy, power, or local endurance, with only lower-body strength favoring continuous training within the 9-week window; a 2026 within-subject randomized study (Scientific Reports, n=19 untrained young men) found a true ACTIVE deload (volume/frequency reduction at weeks 4 and 8) produced similar hypertrophy AND strength-endurance vs. continuous training; (3) Ogasawara et al. (2011 Clinical Physiology and Functional Imaging; 2013 six-month comparison) found even repeated 3-WEEK full cessations matched continuous training's 15/24-week CSA and 1RM outcomes with 20-25% fewer sessions — the evidentiary basis for telling a hesitant client that one light week costs no muscle and only briefly-recoverable peak strength. ICONS protocol codified: deload roughly every 4-6 training weeks, house pattern = the week immediately AFTER the Week 4 peak-test/strength-reassessment (the existing 4-week cadence gives every program a natural slot); same movements/day structure, sets roughly halved, loads ~50-70%, everything in the 3+ RIR band (reduction depths labeled practice convention, not trial-derived); PROACTIVE scheduling non-negotiable for rehab-flagged/active-injury-site clients (the triggering case), 8+ week continuous-progression programs, and older/recovery-limited clients, with autoregulated timing acceptable for robust well-recovering clients and novices on the simplified two-day rotation. Client framing: "reload," per the existing positive-framing discipline. Honest gap stated: both deload RCTs are short, single-deload, young-male studies (one untrained, one trained) — no women-specific, older-adult, or postmenopausal deload RCT was located.
- **Added (new subsection): "Energy Availability & Caloric Surplus for Lean-Mass Gain,"** placed directly after Protein Targets (before Creatine). Key findings folded in: (1) the ~350-500 kcal/day modest-surplus convention has mechanistic backing but NO validated dose-response "sweet spot" — Slater et al. (Frontiers in Nutrition 2019;6:131) put the energy stored in 1 kg of muscle at ~5,000-5,200 kJ and common recommendations at ~1,500-2,000 kJ/day (~360-480 kcal), while stating plainly these estimates have never been validated in a resistance-training population — the section cites the convention as a reasoned starting point, not an evidenced dose; (2) Garthe et al. (European Journal of Sport Science 2013, n=39 elite athletes, 8-12 weeks): a counseled ~506±84 kcal/day surplus produced +2.7 kg body mass (+1.7 kg FFM, +1.1 kg fat) — more total gain than ad libitum but with a real fat cost, and with reported failure of many athletes to hit gain targets even on the prescribed plan, grounding the section's monitor-and-adjust (not set-and-forget) framing; (3) bigger is not better — the Helms-group parallel-groups trial (Sports Medicine - Open 2023;9, maintenance vs. 5% vs. 15% surplus in trained lifters, 17 completers, small-sample flag stated) found the larger surplus primarily accelerated fat gain with no clear additional hypertrophy/strength benefit. Codified when a surplus instruction belongs IN a client's document (underweight BMI <18.5 — non-negotiable; ALST At-Risk with muscle-building as primary goal; stated lean-mass goal with flat rescan trends), explicitly distinguished from the GLP-1 deficit-by-design case; added a "BMR is not an intake target" documentation caution (client documents quote Styku BMR prominently, and BMR is below maintenance by definition); stated the older-adult/sarcopenic gap honestly — no validated sarcopenic-specific surplus dose exists, the combined protein/ONS/creatine-plus-RT meta-analytic literature supports supplementation-with-training but establishes no kcal number, and the nearest citable anchor is ESPEN's geriatric guiding value of ~30 kcal/kg/day, individually adjusted (Volkert et al., Clinical Nutrition 2019; practical guideline update 2022) — a clinical-nutrition reference, not a hypertrophy prescription; and set the referral boundary (clinically underweight client → physician/dietitian conversation in addition to the training-side instruction, same referral-not-prescribe posture as HRT/GLP-1/TRT).
- **Looked for but could not verify, stated rather than filled:** (1) any women-specific, postmenopausal, or older-adult deload RCT — none located; (2) a validated surplus "sweet spot" or lean:fat-optimizing surplus dose in any population — Slater et al. themselves flag this as an unfilled gap; (3) a sarcopenic/underweight-older-adult-specific surplus size — the anabolic-resistance literature justifies the existing protein/leucine emphasis but was not found to justify a different surplus magnitude; (4) Coleman et al. 2024's exact participant count was reported inconsistently across secondary sources (39 vs. 50), so the section describes the cohort qualitatively (resistance-trained, ≥1 year experience) rather than risking a wrong n — the finding itself is consistently reported across all sources checked.
- **Updated:** Coverage Index — two new rows (Deload / planned recovery weeks; Energy availability / caloric surplus), both Last Verified 8/18/2026, both noting the Siobhan Hansen trigger and the young-male-only scope of the direct deload RCTs.
- Did not touch any client document or script — Siobhan Hansen's document is being updated separately by `icons-expert` with client-specific versions of both items; these sections are the standing reference that update and all future builds cite. Flag back to the main thread/`icons-expert`: any OTHER current client matching the proactive-deload criteria (active injury sites under continuous progressive loading, 8+ week continuous progression) or the surplus-instruction criteria (BMI <18.5, ALST At-Risk with muscle-building primary) should pick these up at their next revision per the existing "touch it, bring it current" practice — not via a blanket sweep today.
- Sources: [Bell L, et al., "Deloading Practices in Strength and Physique Sports: A Cross-sectional Survey," Sports Medicine - Open 2024](https://link.springer.com/article/10.1186/s40798-024-00691-y) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/38499934/) and [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10948666/)) · [Bell L, et al., "Integrating Deloading into Strength and Physique Sports Training Programmes: An International Delphi Consensus Approach," Sports Medicine - Open 2023;9:87](https://link.springer.com/article/10.1186/s40798-023-00633-0) (also [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10511399/)) · [Bell L, Nolan D, et al., "'You can't shoot another bullet until you've reloaded the gun': Coaches' perceptions, practices and experiences of deloading in strength and physique sports," Frontiers in Sports and Active Living 2022](https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2022.1073223/full) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/36619355/)) · [Coleman M, et al., "Gaining more from doing less? The effects of a one-week deload period during supervised resistance training on muscular adaptations," PeerJ 2024;12:e16777](https://peerj.com/articles/16777/) (also [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10809978/)) · [Effects of deload periods in resistance training on muscle hypertrophy and strength endurance in untrained young men using a randomized within subject design, Scientific Reports 2026](https://www.nature.com/articles/s41598-026-40612-5) · [Ogasawara R, et al., "Effects of periodic and continued resistance training on muscle CSA and strength in previously untrained men," Clinical Physiology and Functional Imaging 2011](https://onlinelibrary.wiley.com/doi/10.1111/j.1475-097X.2011.01031.x) · [Ogasawara R, et al., "Comparison of muscle hypertrophy following 6-month of continuous and periodic strength training," 2013](https://www.semanticscholar.org/paper/Comparison-of-muscle-hypertrophy-following-6-month-Ogasawara-Yasuda/fa1e518decb3fe6a603573d510dc4ae7b0bed2d3) · [Slater GJ, Dieter BP, Marsh DJ, Helms ER, Shaw G, Iraki J, "Is an Energy Surplus Required to Maximize Skeletal Muscle Hypertrophy Associated With Resistance Training," Frontiers in Nutrition 2019;6:131](https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2019.00131/full) (also [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6710320/)) · [Garthe I, Raastad T, et al., "Effect of nutritional intervention on body composition and performance in elite athletes," European Journal of Sport Science 2013](https://www.tandfonline.com/doi/full/10.1080/17461391.2011.643923) (also [PubMed](https://pubmed.ncbi.nlm.nih.gov/23679146/)) · ["Effect of Small and Large Energy Surpluses on Strength, Muscle, and Skinfold Thickness in Resistance-Trained Individuals: A Parallel Groups Design," Sports Medicine - Open 2023](https://link.springer.com/article/10.1186/s40798-023-00651-y) (also [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10620361/)) · [Volkert D, et al., "ESPEN guideline on clinical nutrition and hydration in geriatrics," Clinical Nutrition 2019](https://pubmed.ncbi.nlm.nih.gov/30005900/) (also [ESPEN practical guideline update 2022](https://www.clinicalnutritionjournal.com/article/S0261-5614(22)00034-6/fulltext)) · [The effects of nutritional supplementation on older sarcopenic individuals who engage in resistance training: a meta-analysis, PMC 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10167299/)

---

## SCRIPTS QUICK REFERENCE

| Script | Purpose | Output |
|--------|---------|--------|
| `icons_template.js` | Canonical docx engine | .docx via buildDocument() / buildImprovementDoc() / buildAssessmentReport() |
| `rena_paul_assessment_report.js` | Rena Paul's ICONS Performance Assessment (pilot, 8/17/2026) | clients/rena_paul/Rena_Paul_ICONS_Performance_Assessment.docx |
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
