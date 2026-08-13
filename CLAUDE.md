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
        load: string,
        tempo: string,
        rest: string,
        cue: string,                 // max ~50 chars — 1 line in cue column
        flag?: string,               // italic red sub-text under exercise name
        insight?: string,            // italic gray sub-text under exercise name — "Trainer Insight: ..." (trainer-education docs; distinct from flag's clinical red)
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
- Protein: 1.8–2.0 g/kg/day minimum, moving to 2.0–2.2 g/kg/day as menopause is reached or ALST flags At-Risk
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
- **Mobility, ROM, assisted-stretching-heavy content** (a cool-down protocol, a corrective block built around regaining range rather than strength, a client whose limiting factor is flexibility/ROM rather than load): **Niko Heers** is a real, usable resource — reference him by name where a session's mobility work would genuinely benefit from stretch-therapist involvement, not as a blanket addition to every cool-down in the system.
- Use judgment on when naming either of them adds real information vs. when it would read as decorative — a client with no rehab/mobility-limiting content on file doesn't need either name inserted just because they're now on staff.

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

Elizabeth Poyner → /mnt/user-data/outputs/Elizabeth_Poyner_5Day_Training_Plan.docx
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

Six scoped subagents cover this system as of 8/12/2026 — one per structure built so far. Route a task to the one whose scope actually matches rather than doing everything in the main thread; each agent's own file has the operative detail, this is just the map:

| Agent | Owns | Does NOT own |
|---|---|---|
| `icons-expert` | Client-facing documents — training plans, assessment reports, PPTX decks, Styku interpretation, via `buildDocument()`/reportlab | Trainer education content, science-layer research, QA, Drive monitoring |
| `icons-research-analyst` | The Evidence-Based Science Layer in this file — periodic literature research, correcting/upgrading/adding claims, the Research Update Log | Writing or editing any client/trainer deliverable; the standalone deep-reference doc below |
| `icons-evidence-curator` | `docs/Evidence_Based_Science_Womens_Strength_Training.md` — the discursive, fully-cited deep-reference literature review behind the women's science layer (distinct from this file's compact actionable version) | This file's Evidence-Based Science Layer itself; any client/trainer deliverable |
| `icons-trainer-education` | Trainer onboarding — the self-paced HTML knowledge modules and the physical Train-the-Trainer `.docx` programs | Client-facing plans/reports; science-layer research |
| `icons-doc-auditor` | Pre-delivery structural QA on `.docx`/`.pptx`/`.pdf` output (python-docx/pdfplumber checks, since rendered PDF audits are broken in this environment) | Building or editing deliverables — reports findings back, doesn't fix them itself |
| `icons-intake-monitor` | Weekly read-only scan of the "ICONS CLIENT PROGRAMS" and "ICONS NOTES JASON PDFS" Drive folders — flags stale-document candidates and new SOAP-note data back to the main thread / `icons-expert` | Editing any document, uploading anything to Drive (the manual-handoff policy below still stands), resolving clinical conflicts itself |

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
