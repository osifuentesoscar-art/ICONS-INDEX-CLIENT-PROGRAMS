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

**Repo paths:**
```
Shared engine     → scripts/icons_template.js
Client scripts    → scripts/clients/     Client outputs   → clients/<client_name>/
Trainer scripts   → scripts/trainers/    Trainer outputs  → trainers/<trainer_name>/
                                         Trainer education → trainers/education/
System documents  → system_documents/ (index: docs/CLIENT_ROSTER_MAP.md)
Uploaded files    → (attached inline to the conversation)
This file         → CLAUDE.md at repo root
System prompt     → docs/ICONS_System_Prompt.md (paste-into-Projects reference copy)
```

**CLIENT / TRAINER SEPARATION — a hard boundary (established 8/20/2026, at Xolokan's direct instruction).**
Client and trainer material are separate trees, top to bottom: separate output folders, separate
script folders. A client build never writes into `trainers/`, and a trainer build never writes into
`clients/` — the split exists so the two can never be produced into the same folder again. The only
shared file is the engine itself, `scripts/icons_template.js`. Trainers with individual programs:
Becca, Brodie, Jah, Nick, Oscar. Jason Bethea and Niko Heers are studio staff who appear *inside*
client documents (see "STUDIO STAFF") — they are not programmed trainers. When adding a new person,
decide which tree they belong to BEFORE writing the build script, and put the script in the matching
`scripts/` subfolder.

**Build pattern — no exceptions:**
1. Write the build script under `scripts/`
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

**Output location:** same folder as the trainer document, `clients/<client_name>/`, filename `<ClientName>_<ProgramTitle>_Client_View.docx` (e.g. `Elizabeth_Poyner_5Day_Training_Plan_Client_View.docx`) — a client view is a per-client artifact, not a new top-level category like `trainers/` or `system_documents/`.

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

## THE TEMPLATE ENGINE — `scripts/icons_template.js`

**Moved to the `icons-docx-engine` skill** (2026-08-20) — page setup, the three-tier color
system, callout colour assignments, exercise/baseline/summary table column widths, the full
`buildDocument()` data schema, `buildImprovementDoc()`, and the exported API. Load it before
building or editing any `.docx` deliverable.

Two rules stay here because they are contracts, not reference: **never write an output file
directly — always run it through a script**, and the confirmed house visual language is
**compact labeled paragraphs, never bordered/shaded callout boxes** (the ICONS Performance
Assessment Report is the one deliberate exception, scoped to that document type only).
## PDF ENGINE (Python ReportLab)

**Moved to the `icons-pdf-engine` skill** (2026-08-20) — page/margin constants, exercise-table
column widths, the ~50-char cue limit, row-height math, the mandatory pdfplumber overflow audit,
and the two-page-per-training-day split. Load it when building or auditing a PDF deliverable.
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
**Partial resolution 8/19/2026:** the PER-MEAL half of this flag is fixed —
`proteinTargets()` now computes ~0.3 g/kg/meal (was 0.4) and the rendered
label states "across 4 meals spaced 3–4 hours apart" with the leucine-
threshold framing removed, per the corrected standard above; every
nutrition-block client inherited it via same-day regeneration. The AGE-
TRIGGER half (`atRisk || ageYears >= 50` and the rendered "50+ tier"/"40+
tier" labels) remains open exactly as described — it still needs the new
intake fields plus per-client review, not a formula edit. Note the male
framework's `maleProteinTargets()` per-meal figure (0.4 g/kg) was
deliberately NOT changed — the Male Framework's own prose still states 0.4,
and whether the women's correction transfers is an open
`icons-research-analyst` question (flagged 8/19), not an assumption to make
silently.

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

### Condition-Specific Protocols — `icons-clinical-conditions` skill

**Moved out of this always-loaded layer 2026-08-20** (each covers a condition with zero or one
current roster client): Vitamin D & Calcium supplementation, Osteoarthritis (knee & hip),
Scoliosis, Breast Cancer Survivorship & lymphedema, Cardiovascular/Cardiac considerations, and
Postpartum Return to Training & Diastasis Recti. Load the `icons-clinical-conditions` skill when
any of these appears on a client's record — the mandatory research-coverage check at NEW CLIENT
ONBOARDING is the trigger. Everything else in this layer stays resident.
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
  only and refer for cardiac assessment. Cross-references the Cardiovascular
  section (`icons-clinical-conditions` skill), which already treats brief
  bracing as low-risk for a cleared, stable client.

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

**Moved to the `icons-male-framework` skill** (2026-08-20). Load it whenever a client is male —
it carries the male age brackets, the EWGSOP2 male ALST cutoff (<7.0 kg/m²), male protein and
creatine targets, testosterone/TRT framing, male VFA/BMI/body-fat references, and bone-loading
and power-training evidence for men. The Demographic Scope Rule above still binds: the women's
numeric thresholds never silently transfer to a male client.
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
                                   the Scoliosis section's (icons-clinical-
                                   conditions skill) "back extension to
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

- **Individual client records — `CLIENTS.md`** is the maintained source of truth: profile,
  Styku data, clinical flags, baselines, program structure, and revision history per client.
- **Operational/process state — `CLIENT_OPERATIONS.md`**: assessment gate, reassessment ledger,
  clinical constraint register, asymmetry execution log, watchlists.
- **Roster map, system-document index, trainer-education format history —
  `docs/CLIENT_ROSTER_MAP.md`** (moved out of this file 2026-08-20).
- **Trainer programs, data & education** — `trainers/README.md` carries the roster, the
  per-format tables, and the client/trainer boundary.
- **Subagent team** — the eight `.claude/agents/*.md` definitions describe their own scope in
  frontmatter, which every session receives automatically; route by those descriptions.
## ARCHITECTURE AUDIT — 2026-08-18, RESOLVED 2026-08-20

All four findings of the 8/18 audit are closed. Kept as record because two of them were closed
in the *opposite* direction from what the audit recommended — reality had moved on by 8/19, and
anyone re-reading the old recommendation would otherwise delete the wrong side.

```
1. DUPLICATE CLIENT RECORD — August Olivia (and Johanna Castillo). RESOLVED 8/20.
   The 8/18 audit named clients/august-olivia/ (hyphen) as CURRENT and told a future agent to
   delete clients/august_olivia/ (underscore). That recommendation became WRONG on 8/19, when
   the roster-wide ICONS Block Method restructure was applied to the underscore pipeline
   (scripts/clients/august_olivia_3day_plan.js -> clients/august_olivia/). The hyphen dirs had
   not been touched since 8/07 and predated the Block Method entirely.
   ACTION TAKEN: kept the underscore pipeline. Deleted clients/august-olivia/ and
   clients/johanna-castillo/ (same duplicate pattern) after confirming, field by field, that
   every Styku value in their intake.md/data.json already exists in the live build script.
   Nothing unique was lost.

2. DUPLICATE TEMPLATE ENGINE. RESOLVED 8/20 — again, opposite to the audit's recommendation.
   The audit said to keep my-agent/engine/icons_template.cjs "because it's the one actually
   wired into automation." It was not wired into anything that could run: my-agent/ had no
   package.json at all (its package.json sat in a separate top-level bls-expert-agent/ dir),
   so the workflow's `npm ci` step could never have succeeded.
   ACTION TAKEN: deleted my-agent/ and bls-expert-agent/. scripts/icons_template.js is now the
   single engine, with no second copy to drift against.

3. MISSING SPECIALIST AGENTS. RESOLVED — all eight agents now exist in .claude/agents/
   (icons-expert, icons-research-analyst, icons-evidence-curator, icons-trainer-education,
   icons-doc-auditor, icons-intake-monitor, icons-roster-analyst, icons-operations-analyst).
   The scheduled-automation half was closed differently: the .github/workflows/
   generate-icons-docs.yml workflow was DELETED on 8/20 rather than repaired. It fired on every
   push to clients/**, could never install its dependencies (see item 2), and would have
   auto-committed generated output back to the branch. Document generation is deliberately a
   run-the-script-and-audit-it operation, not a CI job.

4. REPO HYGIENE — unrelated personal-tool files at repo root. RESOLVED 8/20.
   BACKUP, JARVIS, Clsrvis, Preque, hook, PONYTAIL and "clarvis_config (1).toml" were setup
   notes for Clarvis (a third-party TTS status-narrator) and a plugin install line — all
   deleted. ICONS_Trainer_Learning_Module.html was also loose at the root; it was trainer
   material and moved to trainers/education/.
```

**Standing rule this audit produced:** client and trainer material stay in separate trees — see
"CLIENT / TRAINER SEPARATION" at the top of this file.

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

## PDF LAYOUT ENGINE

Column widths, cue-length limits, row-height math, and the per-page height budget now live in
the `icons-pdf-engine` skill alongside the rest of the ReportLab reference.
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

**Moved to `docs/RESEARCH_UPDATE_LOG.md`** (2026-08-20) — it was ~31k tokens of historical
record loading into every session. The standing practice is unchanged: periodically re-research
this file's Evidence-Based Science Layer against current literature and append a dated entry
there (never for merely *using* the layer to build a client doc — only for a pass that changed
or verified the reference material). That file also carries the Coverage Index used to pick an
under-served topic. `icons-research-analyst` owns it.
## SCRIPTS QUICK REFERENCE

Run `ls scripts/` for the current list (34 files as of 2026-08-20). The engine is
`scripts/icons_template.js`, and as of 8/20/2026 it is the *only* engine — the duplicate
`my-agent/engine/icons_template.cjs` and its broken automation were removed (see "KNOWN
ISSUES" above). Client scripts live in `scripts/clients/`, trainer scripts in
`scripts/trainers/`; both require the engine as `../icons_template`. Each client script's header comment states its own purpose,
data sources, and output path.

---

*Brace Life Studios ICONS System — see `docs/RESEARCH_UPDATE_LOG.md` for the science-layer
revision history, and `docs/ICONS_System_Prompt.md` for the paste-into-Projects reference copy.*
