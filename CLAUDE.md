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

## THE TEMPLATE ENGINE — `icons_template.js`

**Location:** `/home/claude/icons_template.js`  
**Usage:** `const { buildDocument } = require('./icons_template');`

This is the canonical source of truth for all `.docx` client documents. Every measurement, color, and structure was extracted directly from the Kelly Mulroy 5-Day Training Plan XML (the reference document).

### Page Setup (US Letter)
```
PAGE_W = 12240 dxa
PAGE_H = 15840 dxa
MARGIN = 900 dxa (0.625" all sides)
TW     = 10440 dxa (content width)
Font   = Arial throughout
```

### Color System — `C` object
```javascript
// Day intensity
C.teal / C.tealPale     // 60% — #00695C / #E0F2F1
C.green / C.greenPale   // 70% — #43A047 / #E8F5E9
C.gold / C.goldPale     // 80% — #C9A227 / #FAF3E0
C.red / C.redPale       // 90% — #E53935 / #FFEBEE
C.blue / C.bluePale     // Active Recovery — #1565C0 / #EAF4FB

// Text
C.dark    // #2C2C2C — primary body text
C.mid     // #6B6B6B — secondary / labels
C.white   // #FFFFFF

// Clinical flags
C.flagRed    // #B71C1C — At-Risk / clinical priority
C.flagAmber  // #E65100 — Watch / moderate
C.flagGreen  // #1B5E20 — Cleared / optimal

// Callout fills (auto-paired with borders)
C.callGold / C.callGoldB     // #FAF3E0 / #C9A227
C.callGreen / C.callGreenB   // #E8F5E9 / #43A047
C.callRed / C.callRedB       // #FFEBEE / #E53935
C.callTeal / C.callTealB     // #E0F2F1 / #00695C
C.callBlue / C.callBlueB     // #EAF4FB / #1565C0
C.callPurple / C.callPurpleB // #F3EEF9 / #6A1B9A
```

### Callout Color Assignments — USE THESE RULES
```
goldCallout   → warm-up, general coaching, ICONS Notes
greenCallout  → baseline notes, positive performance data, PRs, cleared status
redCallout    → shoulder flags, corrective priorities, overhead suspension, near-maximal notes
tealCallout   → Styku scan data, assessment findings, asymmetry
blueCallout   → cool-down, recovery, mobility
purpleCallout → pull-up pathway, posterior chain notes
clinicalFlag  → ALST At-Risk, BMI underweight, RED-S — thick red border (sz=20)
watchFlag     → asymmetry alerts, moderate risk, pelvic floor safety notes
clearFlag     → shoulder cleared, milestone achieved
```

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

### Other Table Schemas
```
Baselines (4 col)  : [2600, 1600, 1400, 4840]
Weekly Summary (5) : [1200, 1000, 2040, 2200, 4000]
Day Header (2 col) : [1600, 8840]
```

### API — Primary Functions
```javascript
// Build complete document from data object
await buildDocument(data) → Buffer

// Blocks (compose custom pages)
coverHeader(clientName, programTitle, tagLine)
clientStats(stats[])
weekOverview([{day, intensity, focus}])
baselinesTable(rows[][])
stykuBlock(styku)          // ← full Styku scan interpretation
nutritionBlock(client)     // ← evidence-based protein/creatine/collagen targets
proteinTargets(client)     // ← shared calc behind nutritionBlock + proteinBar
proteinBar(client)         // ← slim per-page reminder, auto-inserted for ALST At-Risk clients
pelvicFloorCallout()       // ← auto-inserted for postmenopausal clients on heavy-loading days
dayHeader(intensity, title, subtitle, descriptor)
exTable(exercises[], accentColor, paleFill)
weeklySummary(rows[][])
progressionBlock(accentColor)
milestoneTracker(4wk, 8wk, rescanNote)
epley1RM(weight, reps)         // ← Epley formula: weight × (1 + reps/30)
workingLoad(oneRM, pct, roundTo=5)

// Callouts
goldCallout(label, body)
greenCallout(label, body)
redCallout(label, body)
tealCallout(label, body)
blueCallout(label, body)
purpleCallout(label, body)
clinicalFlag(label, body)   // thick red border, sz=20
watchFlag(label, body)
clearFlag(label, body)
```

`buildDocument()` calls `proteinBar()` and `pelvicFloorCallout()` automatically per day — you do not call them by hand in client scripts. `proteinBar` fires whenever `client.alstIndex < 5.5`; `pelvicFloorCallout` fires whenever `client.isPostmenopausal` is true **and** the day contains a squat, deadlift/RDL, hip thrust, carry, or lunge (set `day.pelvicFloor: false` to suppress it for a specific day if it's genuinely not applicable).

### Full Data Schema for `buildDocument()`
```javascript
{
  client: {
    name: string,
    programTitle: string,            // e.g. "5-DAY TRAINING PLAN"
    stats: string[],                 // ["Age 35", "5'4\"", "152 lbs", ...]
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
  weekOverview: [{ day, intensity, focus }],  // intensity: "60"|"70"|"80"|"90"|"AR"|"Off"
  baselines: string[][],             // [lift, baseline, tested_at, 8wk_target]
  baselineNotes: [{ type, label, body }],  // type = "green"|"gold"|"red"|"teal"|"blue"|"purple"|"clinical"|"watch"|"clear"
  includeNutritionBlock: boolean,    // default true
  includeProgressionBlock: boolean,  // default true (per training day)
  days: [{
    intensity: "60"|"70"|"80"|"90"|"AR",  // "Off" is week-overview-only, no day page rendered
    title: string,                   // "DAY 1 — TUESDAY"
    subtitle: string,                // "Lower Body — Squat Focus"
    descriptor: string,              // CAPS DESCRIPTOR LINE
    intensityPara: string,           // why this % day
    warmUp: string,
    coolDown: string,
    iconsNote: string,
    blocks: [{
      letter: "A"|"B"|"C"|"D",
      title: string,
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
        rirNote?: string,            // teal RIR note appended to cue
      }]
    }]
  }],
  summary?: {
    rows: string[][],
    milestones4wk: string,
    milestones8wk: string,
    rescanNote: string,
  }
}
```

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

## EVIDENCE-BASED SCIENCE LAYER

This is the foundation of every programming decision. Do not deviate without flagging it.

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
Benefits: strength, power, cognition, bone (Hall et al. 2025), sleep quality
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
Brand styling   : B R A C E   L I F E   S T U D I O S (spaced caps in gold)
Confidentiality : "CONFIDENTIAL CLIENT REPORT" on assessment docs
                  "Confidential" in footer on all documents
```

### Typography
```
Font: Arial (docx) / Helvetica (PDF)
Title: 26pt bold gold (#C9A227), letter-spacing 280
Client name: 20pt bold #2C2C2C centered
Day title: 13pt bold = day accent color
Section: 8.5pt bold = day accent color
Body: 8.5pt #2C2C2C
Labels: 7–7.5pt #6B6B6B
Footer: 7pt #6B6B6B
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

| Metric | At-Risk | Normal | Optimal |
|--------|---------|--------|---------|
| ALST (kg/m²) | < 5.5 | 5.5–6.99 | ≥ 7.0 |
| VFA (cm²) | ≥ 100 | 70–99 | < 70 |
| BMI | < 18.5 or ≥ 30 | 18.5–24.9 | 20–23 |
| Protein (g/kg/day) | < 1.6 | 1.6–1.8 | 2.0–2.2 (50+) |
| Weekly sets/muscle | < 6 | 6–9 | ≥ 10 |
| Bone load (%1RM) | < 70% | 70–79% | ≥ 80% |

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

*Last updated: August 7, 2026 — Brace Life Studios ICONS System*  
*Canonical reference: Kelly Mulroy 5-Day Training Plan (XML audit)*  
*Science layer: Evidence-Based Women's Strength Research Synthesis (Aug 2026)*  
*Styku integration: Siobhan Hansen scan 7/29/2026; August Olivia scan 8/5/2026*  
*Engine v2: protein_bar and pelvic floor callout are now auto-inserted by
`buildDocument()` (see `scripts/icons_template.js`) rather than manual
per-day calls — see `docs/ICONS_System_Prompt.md` for the full paste-into-
Projects reference copy of this system's rules.*
