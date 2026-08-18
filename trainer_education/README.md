# Trainer Education — Index

Two independent format families live in this folder. Both teach the same ICONS system; they are not alternates of each other — a trainer typically goes through the HTML track first, then the physical `.docx` track. Full detail on every file (data schema, build rules, science-layer sourcing) lives in the repo root `CLAUDE.md` under "Trainer Development Modules" / "Trainer Development Programs" — this file is just the map.

## Format 1 — Self-paced HTML knowledge modules (open directly in a browser)

Single-file, no build step, no backend. Test *knowledge* — reading a plan correctly, clinical thresholds, scope awareness — via scored quiz gates that lock the next section until a pass threshold is hit.

| File | Mirrors (client analog) | Structure |
|---|---|---|
| `ICONS_Trainer_Learning_Module.html` (repo root, not this folder) | — | Base: 5 passive read-and-reflect modules, no gating. Start here. |
| `ICONS_Trainer_Development_A_Intensity_Build.html` | Linear 60/70/80/90%/AR week | Content and pass-bar both escalate week over week, capped by a live 90% peak-practicum sign-off. |
| `ICONS_Trainer_Development_B_Three_Zone_Practicum.html` | Isolated → Compound → Metabolic | Isolated skill drills to 90% precision → an integrated case-study read → live-pressure fire-drill scenarios at 100%. |
| `ICONS_Trainer_Development_C_Baseline_to_Rescan.html` | Styku baseline / 8-week rescan | A 10-skill Day-0 diagnostic battery sets a personalized focus, gated development through Weeks 1–8, then a mirrored rescan battery that auto-generates a before/after comparison table. |

Every gated module ends in a live, lead-coach-observed practicum sign-off — quiz gates can only unlock the *next section*; self-certifying "I delivered a clean live session" is explicitly disallowed everywhere.

All four now include a compact male-client scope-awareness addition (added 8/11/26, alongside CLAUDE.md's Male Client Programming Framework) — the male ALST cutoff (<7.0 kg/m², vs <5.5 for women), the rule that women's numeric thresholds don't silently transfer to a male client, and the referral-not-diagnose posture on TRT/hypogonadism questions, each with at least one knowledge-check question testing it.

Case-study/scenario content in these modules should name Brace Life's in-house staff (Jason Bethea, Trainer/Physical Therapist; Niko Heers, Stretch Therapist) the same way real client documents do as of 8/11/26 — see CLAUDE.md's "STUDIO STAFF" section. A rehab-referral callout still using generic "pending PT clearance" language is stale, not a style choice.

### Delta module — `ICONS_Trainer_Update_Aug2026_What_Changed.html` (added 8/18/2026)

| File | Purpose | Structure |
|---|---|---|
| `ICONS_Trainer_Update_Aug2026_What_Changed.html` | Remediation for trainers who certified **before 8/17/2026** | 6 sections, ~25 min. Eleven corrections in explicit OLD → NEW form, then a scored 10-question recertification check (80%, 8/10) that unlocks a lead-coach sign-off section. |

**Who this is for — and who it isn't.** This is a *remediation path*, not a new onboarding step:

- **Existing trainers who passed a gate in A, B or C before 8/17/2026** — take this. The 8/17 external evidence review changed the correct answers to several knowledge-check questions they were scored on, and the corrected modules read as though they were always correct, so re-reading one never tells a trainer which of their answers used to be different. That gap is exactly what this module closes.
- **New trainers** — skip it entirely. Modules A, B and C already carry every correction in their teaching content *and* their `data-correct` answers; a trainer certifying today learns the corrected standard first time through and has no old answer to unlearn.

**The eleven corrections it covers** (each verified against CLAUDE.md's current text at build time; sourced from the 13th/14th/15th Research Update Log passes): RIR default on primary lifts 1 → **2 RIR** (1 RIR now reserved for hypertrophy-priority accessory work, and everything above 2 RIR collapses into one technique/submaximal band) · LIFTMOR intensity ≥80% → **>85% 1RM**, plus mandatory supervision, a risk-stratification gate, a technique-first ramp-in and a loaded-spinal-flexion prohibition · the five-color intensity week is **not** the novice default (first ~6 months = simplified Gold + Green rotation; Red 90% days need a genuine testing/competition rationale) · ALST retired from a 3-tier women's table to **2 tiers** (≥7.0 "Optimal" was EWGSOP2's *male* cutoff, never a female optimal tier — flagged in-module as the single most consequential correction) · asymmetry trigger 0.5 lb absolute → **≥10% relative** (the old trigger was smaller than the scanner's own margin of error) · VFA 4-tier risk table retired → **personal trend metric**, waist circumference primary · Styku scans generally = precise scan-to-scan, imprecise on any single absolute reading, with **segmental per-limb composition explicitly not reportable as precise** · pelvic floor blanket "never hold your breath" → **graded bracing model** (sustained breath-holding across reps remains the error) · knee/ACL corrective circuit screen-gated → **universal**, 20–30 min, 1–2×/week, ≥76% adherence target · protein age bands retired → **context-driven** 1.6 g/kg baseline, per-meal ~0.4 → **~0.3 g/kg** · collagen 30–60 → **45–60 min** pre-load and repositioned from acute performance aid to chronic 12+ week connective-tissue support, ranking below protein and creatine.

**Gate and sign-off.** One gate, in Section 5: 10 questions, four options each, one correct, threshold 80% — 8/10 passes, 7/10 fails, matching the displayed "80% (8/10)" exactly. Every question carries a distractor that is precisely what the trainer would have been scored *correct* on before 8/17/2026, so a miss identifies which specific old standard is still stuck rather than just producing a low score. Passing unlocks Section 6 (the only locked section in the file) — which is a **lead-coach-observed live sign-off**, not a self-certification: the quiz unlocks the page, it does not sign anyone off. Section 6 also states plainly that this module supersedes the corresponding content in A/B/C, and tells trainers to *flag* stale thresholds in existing client documents rather than editing them (protein targets still on the retired age tiers, and asymmetry protocols established under the old 0.5 lb trigger, are the two named cases).

Expect further delta modules as the standing science-layer re-check cadence produces more material corrections — see CLAUDE.md's Research Update Log.

## Format 2 — Physical "Train the Trainer" `.docx` programs (trainers run the workouts on themselves)

Built via `buildDocument()` in `scripts/icons_template.js` — never hand-composed. "You cannot coach what you haven't felt." Carries `insight` sub-lines (italic gray "Trainer Insight: ...") explaining the clinical rationale behind each exercise, distinct from the clinical-red `flag` field.

| File | Mirrors (client analog) | What's new vs. the base |
|---|---|---|
| `ICONS_Trainer_Development_Program.docx` | — | Base: client-uploaded 5-day 80/90/70/70/90% plan. |
| `ICONS_Trainer_Development_Program_A_Intensity_Build.docx` | Linear 60/70/80/90/AR week | Adds a 60% technique day and an AR day — neither existed in the base program. |
| `ICONS_Trainer_Development_Program_B_Three_Zone_Practicum.docx` | Isolated → Compound → Metabolic | Adds a new Isolated day (zero compound lifts) and a new Integrated capstone (all 3 zones in one session); reuses the base program's Compound/Metabolic days. |
| `ICONS_Trainer_Development_Program_C_Baseline_to_Rescan.docx` | Styku baseline / 8-week rescan | Day 0 runs the actual 11-exercise ICONS Baseline Testing Protocol on the trainer; reused days rewrite their primary lift as an explicit Week1→Week4 progression off those Day 0 numbers; Day 4 reruns the identical battery for a real before/after. |

No male-scope addition was made to this format — these are physical self-administered workout programs, not knowledge-testing content, so a scope-awareness addition doesn't fit naturally here. See CLAUDE.md's Trainer Development Programs subsection if that changes.

## Format 3 — Individual trainer/athlete training plans (real people, real tested baselines)

Distinct from Format 2: these are not a generic hypothetical trainer running the client-facing method once — each is a real 3-day training program built for a named trainer/athlete off their own actual tested strength numbers from `system_documents/ICONS_Baseline_Sheets.docx`. Built 8/12/2026 at Xolokan's request ("have a program built for all these trainers"). Uniform 3-day length across all 5, per Xolokan's explicit choice. Four of the 5 (Becca, Brodie, Oscar, Jah) have no Styku/age/sex/clinical data on file — each of those documents carries an explicit scope note (matching the Jake Poyner/Vinz Feller/Petra precedent) rather than silently omitting the ICONS science-layer numbers, and none of the women's or male clinical frameworks were applied to them.

**Nick is the exception (updated 8/13/2026).** Xolokan supplied his first real Styku scan, and his document now applies the Male Client Programming Framework's "20-39 — Foundation" bracket (ALST 8.01 kg/m² Not At-Risk, VFA 9.7 cm², Body Fat 17.2%, BMI 21.4, Shape Score 95/100 Excellent) plus the standard Styku asymmetry protocol (left leg leads Split Stance — his one unilateral leg movement; arm asymmetry stays below the corrected asymmetry trigger and isn't applied). See CLAUDE.md's Individual Trainer/Athlete Training Programs section and `scripts/nick_3day_plan.js`'s header comment for the full breakdown. His training program structure (days/blocks/loads/Antagonist Rotation sequencing) is unchanged by this update.

**Language-correction pass, 8/17/2026** (see `scripts/nick_3day_plan.js`'s header comment for the full breakdown): CLAUDE.md's external-evidence-review corrections retired the VFA risk-band table ("Very Low Risk" removed above — VFA is now a trend/context figure only, no risk-band label) and corrected the Asymmetry Protocol trigger from an absolute ≥0.5 lb L/R gap to a relative ≥10% gap. Recomputed against Nick's actual numbers: his leg gap (1.3 lb, 23.6 vs 24.9 lbs) is ~5.2% relative — it met the OLD 0.5 lb trigger (the original basis for "left leg leads Split Stance") but does **not** clear the corrected ≥10% standard. This is a flagged discrepancy, not silently resolved — the left-leg-leads Split Stance prescription is left unchanged pending a dedicated per-client review; only the trigger-logic language describing why it was flagged has been corrected. His arm gap (0.3 lb, ~2.2% relative) stays below the trigger either way, no change there.

| File | Level | What's individualized |
|---|---|---|
| `Becca_3Day_Training_Plan.docx` | Intermediate | Deadlift/Split Stance/Row loads off her real 5RMs; Back Squat and Hex Bar Deadlift introduced as new conservative baselines (both were "Not Yet Assessed"); Full Pull-Up given a single unassisted test rep alongside her standing 3-grip assisted battery. |
| `Brodie_3Day_Training_Plan.docx` | Intermediate | Back Squat/Hex Bar Deadlift/Row loads off his real 5RMs; Conventional Deadlift introduced as a new baseline. Assisted Pull-Up deliberately NOT programmed — his 16-rep unassisted baseline already supersedes it. |
| `Oscar_3Day_Training_Plan.docx` | Intermediate | Back Squat/Hex Bar Deadlift/Row loads off his real 5RMs (heaviest row, highest pull-up count in the group); Conventional Deadlift and Farmer Carry both introduced as new baselines. Assisted Pull-Up deliberately skipped, same rationale as Brodie's. |
| `Jah_3Day_Training_Plan.docx` | Intermediate/Advanced | Squat/Deadlift/Row/Split Squat loads off his real 5RMs; Goblet Squat and Hex Bar Deadlift introduced as new baselines per his own coach note's stated substitution intent (Hex Bar DL's Week 1 load explicitly derived from his Conventional Deadlift 1RM, not an independent number). |
| `Nick_3Day_Training_Plan.docx` | Advanced/Elite | Same anchoring approach, but his coach note's "advanced periodization" instruction is applied structurally, not just narratively: Week 1 working loads computed at ~70/80/88% of 1RM (vs. the 60/70/80% used for the other 4), reps held to 3-5 throughout, rest at 120-180s on primary lifts (vs. 30-90s elsewhere), and one sub-maximal/maximal-intent velocity exercise per day (Trap Bar Jump, Med Ball Slam) using this system's existing Power Training framing. |

All 5 apply the Antagonist Rotation Rule at build time (not as a retrofit) and were independently audited via `icons-doc-auditor` — every Epley 1RM/working-load calculation was independently re-derived and confirmed, every Compound-zone block across all 15 day-pages checked for 3-consecutive-same-pattern violations (none found), and every claimed scope/framework exclusion confirmed via a full-text grep (zero leaked women's- or male-framework content in any of the 5).

Build scripts: `scripts/becca_3day_plan.js`, `scripts/brodie_3day_plan.js`, `scripts/oscar_3day_plan.js`, `scripts/jah_3day_plan.js`, `scripts/nick_3day_plan.js`.

## Where a new trainer should start

1. `ICONS_Trainer_Learning_Module.html` (repo root) — ungated foundation, 5 modules, ~100 min total.
2. Pick **one** gated HTML variant (A, B, or C) based on what the lead coach wants reinforced — they teach the same content through different structures, not different content.
3. `ICONS_Trainer_Development_Program.docx` (or a variant, at the lead coach's discretion) — physical, felt experience of the client-facing method.

`ICONS_Trainer_Update_Aug2026_What_Changed.html` is also deliberately not part of this path — a new trainer starting today learns the corrected standards first time through A/B/C and has nothing to unlearn. Hand it only to a trainer who certified before 8/17/2026.

Format 3 is deliberately not part of this path — it's not a generic teaching step handed to any new trainer, it's an individualized program for a specific named trainer/athlete once their own baseline testing is on file (see "Format 3" above). Don't hand a new trainer one of the 5 named athlete programs as an onboarding step.

Full build details, data schemas, and the science-layer sourcing behind every quiz question live in `CLAUDE.md` — see "Trainer Development Modules" and "Trainer Development Programs."
