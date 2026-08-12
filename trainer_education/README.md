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

## Where a new trainer should start

1. `ICONS_Trainer_Learning_Module.html` (repo root) — ungated foundation, 5 modules, ~100 min total.
2. Pick **one** gated HTML variant (A, B, or C) based on what the lead coach wants reinforced — they teach the same content through different structures, not different content.
3. `ICONS_Trainer_Development_Program.docx` (or a variant, at the lead coach's discretion) — physical, felt experience of the client-facing method.

Full build details, data schemas, and the science-layer sourcing behind every quiz question live in `CLAUDE.md` — see "Trainer Development Modules" and "Trainer Development Programs."
