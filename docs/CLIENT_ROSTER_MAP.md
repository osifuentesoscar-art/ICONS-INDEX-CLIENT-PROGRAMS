# ICONS Client Roster & Document Map

Moved out of `CLAUDE.md` (2026-08-20). `CLIENTS.md` remains the maintained source of truth for individual client records; this file preserves the roster-map narrative, the system-document index, and the trainer-education format history.

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

Elizabeth Poynor → MIGRATED 8/14/2026 into this repo's clients/scripts structure — see
                    `clients/elizabeth_poynor/Elizabeth_Poynor_5Day_Training_Plan.docx` /
                    `scripts/elizabeth_poynor_5day_plan.js` and CLIENTS.md's "Elizabeth Poynor"
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
`system_documents/` (new folder, 8/12/2026) is this section's home in the repo, mirroring how `trainers/` maps to the "Trainer Development" sections above — for reference/operational documents that are neither a `clients/<name>/` deliverable nor a self-administered trainer program. The remaining 4 items above are still pre-repo-only (`/mnt/user-data/outputs/` paths, no source script in this repo) — migrate them the same way if/when they resurface, per the Siobhan Hansen and Baseline Sheets precedent.

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
trainers/education/ICONS_Trainer_Development_A_Intensity_Build.html       — mirrors a client's 60/70/80/90%/AR week: content gets heavier and the pass bar stricter each week, capped by a live 90% peak-practicum sign-off
trainers/education/ICONS_Trainer_Development_B_Three_Zone_Practicum.html  — mirrors Isolated→Compound→Metabolic: isolated skill drills to 90% precision, then an integrated case-study read, then live-pressure fire-drill scenarios at 100%
trainers/education/ICONS_Trainer_Development_C_Baseline_to_Rescan.html    — mirrors the Styku baseline/8-week-rescan model: a 10-skill diagnostic battery (Day 0) sets a personalized focus, gated development through Weeks 1–8, then a mirrored rescan battery that auto-generates a before/after competency comparison table
```
All three (built 8/11/2026) reuse the base file's Brace Life editorial CSS design system but add real teeth beyond passive reading: scored multiple-choice knowledge-check gates (`data-correct` per option, self-checking JS, no backend) that lock the next section until a trainer hits a stated threshold, pulled directly from the science-layer thresholds above (ALST/VFA/BMI, RIR, asymmetry, LIFTMOR, pelvic floor language). Each ends in a live, lead-coach-observed practicum sign-off — self-certification is explicitly disallowed for that step in all three. Self-contained single-file HTML, no build script — open directly in a browser.

**Male-client scope-awareness addition (8/11/2026, retro follow-up).** All four HTML files above (the base plus A/B/C) now fold in a compact male-scope addition alongside their existing ALST/VFA/BMI clinical-thresholds content — not a new module, since a trainer needs to know *when to reach for* the Male Client Programming Framework, not relearn ICONS pedagogy for a male client. Covers: the male EWGSOP2 ALST At-Risk cutoff (<7.0 kg/m², a single binary threshold with no "Optimal" tier — genuinely different from the women's <5.5/5.5–6.99/≥7.0 three-tier band, not the same number applied more loosely), the Demographic Scope Rule (women's numeric thresholds never silently transfer to a male client), and the referral-not-diagnose posture on TRT/late-onset-hypogonadism questions (mirroring how HRT questions are already handled for women). Each of the three gated variants (A/B/C) got one added knowledge-check question testing this, in the existing `data-correct`/`answerQuiz()` format, in the gate closest to its existing ALST/clinical content (Module A's Week 3 Primary Certification gate, Module B's Zone 1 Isolated Precision Check, Module C's Weeks 1–4 Milestone Check) — the mirrored Day 0/Rescan competency battery in Module C was deliberately left untouched to avoid disturbing its skill-ID-driven before/after comparison-table logic. Gate question-count/threshold display text was recomputed and updated alongside each addition (e.g. Module A's Week 3 gate: 8→9 questions, pass floor 7/8→8/9) so the displayed fraction still matches the actual `pct >= threshold` pass math. The base (ungated) file got the same content as a plain section plus one added reflection question, no quiz, since it has no gating infrastructure at all. See `trainers/README.md` for the short index this prompted.

### Trainer Development Programs — physical `.docx` (trainers do the actual workouts), distinct from the HTML knowledge modules above
```
trainers/education/ICONS_Trainer_Development_Program.docx                          — base: client-uploaded "Train the Trainer" plan, 5-day 80/90/70/70/90%, Days 4-5 completed (source only specified them at the weekly-summary level)
scripts/icons_trainer_development_program.js                                       — build script; also the data source the 3 variants below require() and reuse
trainers/education/ICONS_Trainer_Development_Program_A_Intensity_Build.docx         — resequenced into the linear 60/70/80/90/AR week; adds a 60% technique day and an AR day (the base program had neither)
trainers/education/ICONS_Trainer_Development_Program_B_Three_Zone_Practicum.docx    — Isolated (new, zero compound lifts) → Compound ×2 (reused) → Metabolic (reused) → Integrated (new, all 3 zones in one session)
trainers/education/ICONS_Trainer_Development_Program_C_Baseline_to_Rescan.docx      — Day 0 runs the actual 11-exercise ICONS Baseline Testing Protocol on the trainer; Days 1-3 (reused) rewrite their primary lift's LOAD field as an explicit Week1→Week4 progression off the Day 0 numbers; Day 4 reruns the identical battery for a real before/after
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

Full detail — per-athlete baseline anchoring, new-baseline introductions, and Nick's structurally-applied "advanced periodization" note — lives in `trainers/README.md`'s "Format 3" table rather than duplicated here. Key points:
- Uniform 3-day length across all 5 (Xolokan's explicit choice, not level-varied).
- No Styku/age/sex/clinical data on file for 4 of the 5 (Becca, Brodie, Oscar, Jah) — same demographic-scope discipline as Jake Poyner/Vinz Feller/Petra: `includeNutritionBlock: false`, no women's or male framework numbers applied, each of those 4 documents carries an explicit scope note stating this rather than silently omitting it. **Nick is the exception, updated 8/13/2026**: Xolokan supplied his first real Styku scan (Age 25, Male, ALST 8.01 kg/m² Not At-Risk, VFA 9.7 cm² Very Low Risk, Body Fat 17.2%, BMI 21.4, Shape Score 95/100). His document now applies the Male Client Programming Framework's "20-39 — Foundation" bracket (real ALST/VFA/BMI/body-fat interpretation, `maleNutritionNote()`-generated protein/creatine targets, `testosteroneNote()` correctly excluded under 40) and the standard Styku asymmetry protocol (left leg leads Split Stance — 1.3 lb LST gap meets the 0.5 lb trigger; arm asymmetry at 0.3 lbs stays below it and is noted but not applied). See `scripts/trainers/nick_3day_plan.js`'s header revision comment for the full breakdown — the training program itself (days/blocks/loads/Antagonist Rotation sequencing) is unchanged by this update except for two cue-line edits.
- Antagonist Rotation Rule applied at BUILD TIME, not retrofitted — the first content in this system built with the rule as a starting constraint rather than a later audit-and-fix pass.
- Independently audited via `icons-doc-auditor` in two batches: every Epley/working-load calculation re-derived by hand and confirmed, every Compound-zone block across all 15 day-pages checked for 3-consecutive-same-pattern violations (none found), Nick's claimed departure from the standard 60/70/80% framework confirmed as a genuine structural difference (not cosmetic) by direct comparison against Jah's document on the same template.

Output: `trainers/becca/Becca_3Day_Training_Plan.docx`, `trainers/brodie/Brodie_3Day_Training_Plan.docx`, `trainers/oscar/Oscar_3Day_Training_Plan.docx`, `trainers/jah/Jah_3Day_Training_Plan.docx`, `trainers/nick/Nick_3Day_Training_Plan.docx`. Build scripts: `scripts/trainers/becca_3day_plan.js`, `scripts/trainers/brodie_3day_plan.js`, `scripts/trainers/oscar_3day_plan.js`, `scripts/trainers/jah_3day_plan.js`, `scripts/trainers/nick_3day_plan.js`.

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
