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
Source scripts   → scripts/
Final outputs    → clients/<client_name>/
Uploaded files   → (attached inline to the conversation)
This file        → CLAUDE.md at repo root
System prompt    → docs/ICONS_System_Prompt.md (paste-into-Projects reference copy)
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
dayHeader(intensity, title, subtitle, descriptor)
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

---

## EVIDENCE-BASED SCIENCE LAYER

This is the foundation of every programming decision. Do not deviate without flagging it.

### Age Bracket Programming Framework

Every client's program should be filtered through the age bracket below, layered on top of their individual Styku/ALST/VFA findings and any clinical flags. Brackets are proximity guides, not hard cutoffs — a 44-year-old postpartum client may sit closer to the 45–55 profile, and vice versa; use judgment. Each bullet below points to the detailed protocol elsewhere in this section rather than restating it — that section stays the single source of truth for the actual numbers.

**Demographic scope rule.** These five brackets, and every numeric threshold in the Evidence-Based Science Layer below (ALST cutoffs, protein tiers, LIFTMOR candidacy, pelvic floor protocol), are validated for the stated target population: women. When a client falls outside that — a male client (see Jake Poyner), or a client meaningfully younger than 20-35 (e.g. adolescent) — do not silently apply the women's numeric thresholds by default, and do not silently invent a parallel framework either. Apply the sex-neutral structural philosophy (three-zone Isolated→Compound→Metabolic build, RIR/RPE autoregulation, corrective-before-compound sequencing) since that transfers, and explicitly flag in the client's document which numeric thresholds were NOT applied and why — the same way Jake Poyner's program carries a dedicated note explaining the scope decision rather than burying it in code. This is a standing decision rule, not a one-off judgment call specific to that client.

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
- Watch for early perimenopausal signals (cycle irregularity, symptom shifts) — still autoregulate on individual data, not calendar or age alone. This is a genuinely early bracket for it: perimenopausal symptoms can begin in the early-to-mid 30s, well before the ~45 average onset, so "she's too young for this" is not a safe assumption to bring into an intake conversation
- Volume/frequency targets unchanged from the 20–35 bracket — no physiological reason to reduce load yet
- Begin ALST/VFA monitoring at the first Styku scan if not already established, even though risk is typically still low
- If a client mentions she's on a GLP-1/anti-obesity medication (semaglutide, tirzepatide, etc.), see "GLP-1 / Anti-Obesity Medications" below — treat as a standing ALST-preservation priority regardless of her current ALST number

**45–55 — Perimenopause / Menopause Transition**
- Protein: 1.8–2.0 g/kg/day minimum, moving to 2.0–2.2 g/kg/day as menopause is reached or ALST flags At-Risk
- Creatine: strongly indicated
- Heavy RT ≥3×/week + protein 2.0–2.2 g/kg/day is strongly evidence-backed through this transition; HRV dips in luteal-equivalent phases are NORMAL — interpret against the client's individual baseline, not a flat line
- Start screening for LIFTMOR-style bone loading candidacy (T-score < -1.0) as estrogen decline accelerates
- ALST monitoring becomes a priority — sarcopenia risk begins rising through this window

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
  longevity in older women more strongly than strength alone. Mayo Clinic
  Proceedings 2025 (~4,000 adults, ages 46–75, 10+ year follow-up): women
  with low power had ~7× higher mortality risk than women with high power.
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

## CLIENT ROSTER & DOCUMENT MAP

### Active Clients (documents built this session)
```
Siobhan Hansen  → /mnt/user-data/outputs/Siobhan_Hansen_3Day_Training_Plan.pdf
                  /mnt/user-data/outputs/Siobhan_Hansen_ICONS_Report_v3.docx
  Age: 59 | 5'9" | 118 lbs | Postmenopausal
  ALST: 4.66 AT-RISK | VFA: 70.8 cm² | BMI: 17.4 UNDERWEIGHT
  Body fat: 30.9% (FIT) | Scan: 7/29/2026
  Arms: L 7.0 / R 6.2 (RIGHT weaker — leads rows)
  Legs: L 12.7 / R 13.5 (LEFT weaker — leads unilateral)
  Flags: Left shoulder pain (overhead suspended), ALST At-Risk, BMI underweight
  Protein target: 107–118g/day | Creatine: strongly indicated
  Program: 3-day (Day 1 Posterior, Day 2 Lower Unilateral, Day 3 Upper/Pull)

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
/mnt/user-data/outputs/ICONS_Baseline_Testing_Protocol.pdf    — 5-page protocol
/mnt/user-data/outputs/ICONS_Baseline_Sheets.pdf              — 5 athletes
/mnt/user-data/outputs/ICONS_Trainer_Education_Deck_Full.pptx — 16 slides
/mnt/user-data/outputs/BraceLife_ICONS_Trainer_Staff_Guide.docx
/mnt/user-data/outputs/BraceLife_Client_Modification_Briefing_Template.docx
```

### Trainer Development Modules — self-paced HTML, distinct from the PPTX/docx system documents above
```
ICONS_Trainer_Learning_Module.html                                       — base layout (5 passive read-and-reflect modules, no gating)
trainer_education/ICONS_Trainer_Development_A_Intensity_Build.html       — mirrors a client's 60/70/80/90%/AR week: content gets heavier and the pass bar stricter each week, capped by a live 90% peak-practicum sign-off
trainer_education/ICONS_Trainer_Development_B_Three_Zone_Practicum.html  — mirrors Isolated→Compound→Metabolic: isolated skill drills to 90% precision, then an integrated case-study read, then live-pressure fire-drill scenarios at 100%
trainer_education/ICONS_Trainer_Development_C_Baseline_to_Rescan.html    — mirrors the Styku baseline/8-week-rescan model: a 10-skill diagnostic battery (Day 0) sets a personalized focus, gated development through Weeks 1–8, then a mirrored rescan battery that auto-generates a before/after competency comparison table
```
All three (built 8/11/2026) reuse the base file's Brace Life editorial CSS design system but add real teeth beyond passive reading: scored multiple-choice knowledge-check gates (`data-correct` per option, self-checking JS, no backend) that lock the next section until a trainer hits a stated threshold, pulled directly from the science-layer thresholds above (ALST/VFA/BMI, RIR, asymmetry, LIFTMOR, pelvic floor language). Each ends in a live, lead-coach-observed practicum sign-off — self-certification is explicitly disallowed for that step in all three. Self-contained single-file HTML, no build script — open directly in a browser.

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

### Subagent Team (`.claude/agents/*.md`)

Four scoped subagents cover this system as of 8/11/2026 — one per structure built so far. Route a task to the one whose scope actually matches rather than doing everything in the main thread; each agent's own file has the operative detail, this is just the map:

| Agent | Owns | Does NOT own |
|---|---|---|
| `icons-expert` | Client-facing documents — training plans, assessment reports, PPTX decks, Styku interpretation, via `buildDocument()`/reportlab | Trainer education content, science-layer research, QA |
| `icons-research-analyst` | The Evidence-Based Science Layer in this file — periodic literature research, correcting/upgrading/adding claims, the Research Update Log | Writing or editing any client/trainer deliverable |
| `icons-trainer-education` | Trainer onboarding — the self-paced HTML knowledge modules and the physical Train-the-Trainer `.docx` programs | Client-facing plans/reports; science-layer research |
| `icons-doc-auditor` | Pre-delivery structural QA on `.docx`/`.pptx`/`.pdf` output (python-docx/pdfplumber checks, since rendered PDF audits are broken in this environment) | Building or editing deliverables — reports findings back, doesn't fix them itself |

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
- Sources: [Optimal RT parameters for BMD in postmenopausal women, 2025 meta-analysis](https://link.springer.com/article/10.1186/s13018-025-05890-1) · [Creatine and Cognition in Aging systematic review, 2025](https://academic.oup.com/nutritionreviews/advance-article/doi/10.1093/nutrit/nuaf135/8253584) · [Creatine monohydrate for older adults and clinical populations, 2025](https://www.tandfonline.com/doi/full/10.1080/15502783.2025.2534130) · [2-yr creatine/BMD RCT in older women](https://pubmed.ncbi.nlm.nih.gov/31257405/) · [WHEN position statement — resistance training & menopause](https://when.org.au/education/resistance-training-menopause/) · [ACSM 2026 resistance training guidelines summary](https://acsm.org/resistance-training-guidelines-update-2026/) · [Neuromuscular training for ACL injury prevention, female athletes, 2025 meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC12581765/) · [Power training/mortality risk, Mayo Clinic Proceedings 2025 coverage](https://fabulous50s.com/power-training-longevity-and-fall-prevention-over-50/) · [Fall risk & strength training, women 75–105 (WHISH cohort)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12363929/) · [Peak bone mass in 20s/30s](https://www.screenmybones.com/blog/building-peak-bone-mass)

**8/11/2026 — second pass, same day.** Checked: HRT/MHT vs. resistance training for bone, GLP-1/anti-obesity medications, sleep & recovery evidence, 35-45 bracket perimenopause-onset timing.
- **Added (new, real gap):** a "GLP-1 / Anti-Obesity Medications" section — nothing in this file previously addressed these medications at all, despite them being increasingly common in this exact client population. Key finding: ~40% of GLP-1 weight loss is lean mass, women/older adults lose muscle at a higher rate, and structured resistance training 3-5x/week preserves 2-3x more lean mass than medication alone. Flagged as a standing ALST-preservation priority regardless of a client's current ALST number, and added a cross-reference from the 35-45 bracket. This is arguably the single most practically relevant addition from either research pass today — worth asking every new client about at intake, not just clients who volunteer it.
- **Added:** an "MHT/HRT" section — resistance training alone is comparably or more effective than HRT alone for spine BMD in early postmenopausal women, with no added spine-BMD benefit from combining them. Framed carefully as a training-evidence talking point, explicitly not medical advice either direction.
- **Added:** a "Sleep & Recovery" section — properly dosed RT measurably improves sleep quality in both young and older women, independent of baseline. Useful reframe for a client who says she's "too tired to train."
- **Corroborated:** 35-45 bracket's existing "watch for early perimenopausal signals" guidance — symptoms can genuinely start in the early-to-mid 30s, well before the ~45 average, which sharpens (doesn't just restate) the existing bullet.
- Sources: [Menopause hormone therapy + exercise scoping review, 2025](https://www.frontiersin.org/journals/reproductive-health/articles/10.3389/frph.2025.1542746/full) · [HRT vs. exercise bone health systematic review](https://www.cureus.com/articles/426988-comparative-effects-of-hormone-replacement-therapy-and-exercise-on-bone-health-in-postmenopausal-women-a-systematic-review) · [SEMALEAN study — semaglutide body composition, 2025](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12673431/) · [GLP-1 receptor agonists in older women — lean mass preservation review](https://www.mdpi.com/2072-6643/18/4/632) · [Resistance training + sleep quality, older women RCT, 2025](https://www.sciencedirect.com/science/article/abs/pii/S1469029225001670) · [Short-term RT + sleep quality, young women, 2025](https://pubmed.ncbi.nlm.nih.gov/40156675/) · [Untreated perimenopause in younger women](https://www.healthline.com/health-news/untreated-perimenopause-symptoms-young-women)

---

## SCRIPTS QUICK REFERENCE

| Script | Purpose | Output |
|--------|---------|--------|
| `icons_template.js` | Canonical docx engine | .docx via buildDocument() |
| `kelly_mulroy_plan.js` | Kelly's 5-day plan data | Kelly_Mulroy_5Day...v2.docx |
| `siobhan_icons_report_v3.js` | Siobhan assessment report | Siobhan_Hansen_ICONS_Report_v3.docx |
| `siobhan_3day_plan_v2.py` | Siobhan 3-day PDF | Siobhan_Hansen_3Day_Training_Plan.pdf |
| `sarah_plan_v2.js` | Sarah 2-day plan | Sarah_Training_Plan_Client_Version.docx |
| `icons_baseline_protocol.py` | 5-page baseline PDF | ICONS_Baseline_Testing_Protocol.pdf |
| `baseline_sheets.py` | Athlete baseline sheets | ICONS_Baseline_Sheets.pdf |
| `icons_trainer_deck.js` | 16-slide trainer deck | ICONS_Trainer_Education_Deck_Full.pptx |

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
