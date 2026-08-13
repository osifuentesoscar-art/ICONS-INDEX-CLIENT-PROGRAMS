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

**Nick is the exception (updated 8/13/2026).** Xolokan supplied his first real Styku scan, and his document now applies the Male Client Programming Framework's "20-39 — Foundation" bracket (ALST 8.01 kg/m² Not At-Risk, VFA 9.7 cm² Very Low Risk, Body Fat 17.2%, BMI 21.4, Shape Score 95/100 Excellent) plus the standard Styku asymmetry protocol (left leg leads Split Stance — his one unilateral leg movement; arm asymmetry stays below the 0.5 lb trigger and isn't applied). See CLAUDE.md's Individual Trainer/Athlete Training Programs section and `scripts/nick_3day_plan.js`'s header comment for the full breakdown. His training program structure (days/blocks/loads/Antagonist Rotation sequencing) is unchanged by this update.

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

Format 3 is deliberately not part of this path — it's not a generic teaching step handed to any new trainer, it's an individualized program for a specific named trainer/athlete once their own baseline testing is on file (see "Format 3" above). Don't hand a new trainer one of the 5 named athlete programs as an onboarding step.

Full build details, data schemas, and the science-layer sourcing behind every quiz question live in `CLAUDE.md` — see "Trainer Development Modules" and "Trainer Development Programs."
