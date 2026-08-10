# Client Roster & Document Map

## Age Bracket Framework — Verification Pass (8/9/2026)

Checked every client with a known age/weight against the new Age Bracket Programming Framework in CLAUDE.md (added the same day, alongside the ICONS Training Philosophy section). `icons_template.js`'s `proteinTargets()` already implements the exact same tier logic (ALST-at-risk-or-50+ → 2.0–2.2 g/kg, 40+ → 1.8–2.0, else 1.6) — so every script-generated client (August Olivia, Johanna Castillo) was already numerically correct; rebuilding them produced byte-identical text output. **Elizabeth Poyner's hand-maintained doc had a real mislabeled tier** (see her entry below) and was corrected. Aimee, Petra, and Nancy Avitable have no age/weight on file (by design — see their entries) so the bracket framework doesn't apply to them numerically. Kelly Mulroy's file is the byte-identical engine reference standard with no build script and was left untouched.

## Active Clients

### Rena Paul
- **Program:** 2-Day Full Gym Training Plan (`.docx`)
- **Output:** `clients/rena_paul/Rena_Paul_2Day_Training_Plan.docx`
- **Build script:** `scripts/rena_paul_2day_plan.js`
- **Also on file as:** "Ren Itch" (email renitchka@gmail.com) — confirmed same client; this is the name her Styku scan is registered under. Client-facing documents use "Rena Paul"; match on either name when searching Styku/Drive records for her.
- Age 45 | 5'3" | 116 lbs | Scan: 8/8/2026 | Menopausal status not stated — not fabricated (falls in the 45–55 age bracket by age alone, but isPostmenopausal is left false pending confirmation)
- Body Fat 27.0% (Fit) | BMI 20.5 (Normal) | Shape Score 92/100 (Excellent) | ALST Index 5.94 kg/m² (Normal/monitor tier) | VFA 26.3 cm² (Very Low Risk)
- Segmental: L Arm 6.3 / R Arm 6.4 lbs (0.1 lb gap) · L Leg 13.3 / R Leg 13.7 lbs (0.4 lb gap) — both below the 0.5 lb asymmetry-protocol threshold, no unilateral-lead protocol triggered; leg gap flagged as monitor-only since it's closer to the threshold
- Protein target: 95–105g/day (1.8–2.0 g/kg, 40+ tier per `proteinTargets()`) | Creatine strongly indicated (age 40+)
- Strong baseline battery (all tested 8/8/2026): Hex DL 85×5, Hip Thrust 85×5, SL-RDL 25×8, DB Lunge 25×5, Single-Arm Row 30×5, Seated OHP 15×5, Incline DB Chest Press 20×5, Farmer Carry 30/hand, Plank 2:00, Incline Push-Up ×10, Assisted Pull-Up 5 reps × close/standard/wide grip
- Program: 2-day/week, 4-week progression (Day A Hinge + Press + Core 70%, Day B Squat/Lunge + Pull + Conditioning 80%) — no clinical restrictions on file, so full standard progression applies; no weekOverview strip (2-day/week programs use `days[].intensity` badges directly, matching the Aimee precedent)

### August Olivia
- **Program:** 3-Day Training Plan (`.docx`)
- **Output:** `clients/august_olivia/August_Olivia_3Day_Training_Plan.docx`
- **Build script:** `scripts/august_olivia_3day_plan.js`
- Age 25 | 5'2" | 109 lbs | Scan: 8/5/2026
- Body Fat 43.4% **At-Risk** | BMI 19.9 (normal — masks elevated adiposity) | Shape Score 39/100 Off Track
- ALST Index 5.02 kg/m² **At-Risk** (sarcopenia-risk threshold) | VFA 71.4 cm² Low Risk
- Legs: L 11.4 / R 12.1 lbs LST — **LEFT leg weaker, leads all unilateral leg work**
- Arms: L 4.3 / R 4.7 lbs LST — 0.4 lb gap, below 0.5 lb asymmetry-protocol threshold (monitor only)
- Shoulder extension force test (6/1/2026): Peak Force L 190N / R 70N — **63.2% asymmetry, right shoulder deficit** — corrective priority, right leads all unilateral press/pull at reduced load
- Protein target: 99–109 g/day (2.0–2.2 g/kg, ALST At-Risk tier) | Creatine strongly indicated
- Program: 3-day (Day 1 Full-Body Foundation 70%, Day 2 Lower Unilateral & Corrective 60%, Day 3 Upper Push/Pull + Core 80%)
- Baselines tested 8/5/2026: Squat 35×5, OH Press 12×5, Incline Push-Up ×5, Farmer Carry 25/hand, Hip Thrust 45×5, RDL 17.5/hand×5, Plank 50s. Deadlift and Lunges not yet tested.

### Johanna Castillo
- **Program:** 3-Day Training Plan (`.docx`)
- **Output:** `clients/johanna_castillo/Johanna_Castillo_3Day_Training_Plan.docx`
- **Build script:** `scripts/johanna_castillo_3day_plan.js`
- Age 51 | 5'4" | 172 lbs | Postmenopausal (inferred from the client's existing pelvic-floor cueing — see script header)
- ALST Index 7.23 kg/m² **Optimal** — strength-maintenance-under-fat-loss program, not muscle-building-primary
- VFA 142.7 cm² **Moderate Risk** | Body Fat 40.4% **At-Risk** — drives a metabolic finisher on every training day
- Legs: L 17.5 / R 18.0 lbs LST — 0.5 lb gap, at the asymmetry-protocol trigger — **LEFT leg leads unilateral leg work**
- Arms: R 8.4 / L 8.7 lbs LST — 0.3 lb gap, below trigger — logged per side as routine monitoring only
- Protein target: 156–172 g/day (2.0–2.2 g/kg, 50+ tier) | Creatine strongly indicated (postmenopausal)
- Program: 3-day (Day 1 Full Body Strength & Metabolic Conditioning 70%, Day 2 Lower Body Technique 60% — new squat/deadlift baseline, Day 3 Upper Body & Posterior Chain 70%)
- Rebuilt Aug 2026 from the client's existing document to match the confirmed engine standard (see CLAUDE.md); all program content carried over 1:1, only rendering changed. The engine's auto pelvic-floor callout now also fires correctly on Day 2 (deadlift/RDL/squat), which the original hand-built document had missed.

### Kelly Mulroy
- **Program:** 5-Day Training Plan (`.docx`) — the canonical reference document the engine (`icons_template.js`) was itself XML-audited against
- **Output:** `clients/kelly_mulroy/Kelly_Mulroy_5Day_Training_Plan.docx`
- **Build script:** none — the client's uploaded file matches the engine's reference standard byte-for-byte (sha256-verified), so it was copied into the repo as-is rather than regenerated from a data script.
- Age 35 | 5'4" | 152 lbs | Tue/Wed/Thu/Fri Gym, Sun Active Recovery, Sat & Mon Off
- Styku Scan 6/17/2026: Body Fat 36.4% | Lean Mass 92.0 lbs | Shape Score 61/100 | ALST not yet At-Risk
- Legs: L 15.7 / R 16.5 lbs LST — **LEFT leg weaker, leads all unilateral leg work**
- Flags: Knee valgus (squat), hip hinge/adductor weakness — banded squat, TKE, and Copenhagen plank run every session
- Program: 5-day progressive intensity build (60% / 70% / 80% / 90% / Active Recovery)
- Baselines: Deadlift 55–65 lbs, Squat 25 lbs, OH Press 25 lbs ×3RM, Farmer Carry 35 lbs/hand, Push-Up 15 assisted → 15 unassisted target, Pull-Up Level 9/12 assisted → Level 6 target

### Aimee
- **Program:** 2-Day Full Gym Training Plan (`.docx`)
- **Output:** `clients/aimee/Aimee_2Day_Training_Plan.docx`
- **Build script:** `scripts/aimee_2day_plan.js`
- No age/height/weight given in source — `includeNutritionBlock` explicitly false; no ALST/postmenopausal flags fabricated
- Clinical: confirmed **slight spinal stenosis** — program avoids axial spinal compression and lumbar flexion/extension under load. Hex bar deadlift replaces conventional barbell; all pressing is dumbbell-based; no behind-the-neck movements; all core work is anti-flexion/anti-extension
- Underdeveloped hip hinge pattern flagged as clinically significant given the stenosis — hip hinge rehearsal drills precede all loaded hinge work every session
- Pull-up baseline: 5 reps each in neutral/wide/standard grip (assisted) — neutral grip prioritized as safest for spinal stenosis
- Program: 2-day/week, 4-week progression (Day A Hinge + Push + Core, Day B Squat + Pull + Conditioning). Day A/B are not %-graded — `day.badge` overrides the borrowed intensity-key badge text ('A'/'DAY', 'B'/'DAY') so the page doesn't misstate the day's nature (e.g. Day A no longer reads "ACTIVE RECOV." on a heavy strength day) while still reproducing the source's exact badge accent colors
- Baseline note pair reproduces the source's "Avoid — Spine-Unsafe" / "Safe — Spine-Appropriate" exercise comparison
- **Updated baselines (8/9/2026):** Hex Deadlift 105 lbs 3RM · Single-Leg RDL 25 lbs/hand · Overhead Press 17.5 lbs/hand 5RM · Incline DB Press 15 lbs/hand · Push-Up 7 incline reps (advanced past knee stage) · Plank :55. New exercises added: Hip Thrust 95 lbs (hip-dominant, spine-safe — added to Day A hinge block) and DB Flat Bench Press 20 lbs/hand (added to Day A press block). A barbell back squat was also tested at 55 lbs — recorded in the baselines table for reference only; per the confirmed spinal stenosis restriction it is **not programmed** as a working exercise (DB Split Squat/Goblet Squat remain primary). Flag to Xolokan if physician clearance for barbell squatting has since been given, since that would change the standing restriction.

### Petra
- **Program:** 3-Day Virtual Training Plan (`.docx`) — "Strength & Muscle Building, Updated Equipment"
- **Output:** `clients/petra/Petra_3Day_Virtual_Training_Plan.docx`
- **Build script:** `scripts/petra_3day_virtual_plan.js`
- Virtual/flexible 3-day schedule | Equipment: dumbbells, kettlebell, bench, bands, medicine ball
- No Styku scan/weight/age in source — force-plate/dynamometer assessment data (grip squeeze, floor pull, hip extension A/B asymmetry) captured in `baselineNotes` instead; `includeNutritionBlock` explicitly false
- Day intensities interpretively mapped from the source's non-standard, blank-badge color key onto the standard framework: Day 1 Squat/Hinge/Unilateral/Kettlebell = 80% Gold, Day 2 Push/Pull/Carry/Bench = 70% Green, Day 3 Kettlebell/Medicine Ball/Compound Clusters = 90% Red
- Corrected an apparent source typo in Day 1's warm-up ("5–80% grade" treadmill incline, physically implausible) to "5–8% grade"

### Nancy Avitable
- **Program:** 3-Day Training Plan (`.docx`)
- **Output:** `clients/nancy_avitable/Nancy_Avitable_3Day_Training_Plan.docx`
- **Build script:** `scripts/nancy_avitable_3day_plan.js`
- Age 38 | No weight/height/Styku scan in source — only an isolated hip abduction force test; `includeNutritionBlock` explicitly false, `isPostmenopausal: false` (no menopause indication in source)
- Hip Abduction Test 8/3/2026: Left peak force 126N (weaker) / Right peak force 153N — **17.5% asymmetry, right-dominant — LEFT leads all unilateral leg work** per protocol
- No strength-baselines table — source has no testing battery; weekOverview uses generic "DAY 1/2/3" labels (no weekday schedule given)
- Program: 3-day (Day 1 Lower Body — Left Hip Corrective 70%, Day 2 Upper Body — Stability & Posterior Chain 60%, Day 3 Lower Body — Bilateral Strength + Unilateral Finishers 80%)

### Elizabeth Poyner (no build script yet — document maintained as a direct client-file edit, not via icons_template.js)
- **Output:** `clients/elizabeth_poyner/Elizabeth_Poyner_5Day_Training_Plan.docx`
- Age 64 | 5'5" | 114 lbs (per Week 8 Styku rescan, essentially flat vs. 115 lbs pre-scan) | Postmenopausal
- PRs: Hex DL 195×5 (Epley 1RM 228), Split Hex DL 165×5, Hip Thrust 145×5, DB Lunge 40×8, Push-Ups 28, Carry 50/hand, Plank 2:00, SL RDL 40, OHP 20
- Training loads: DL Wk1 180 (~80% 1RM via `workingLoad(228, 0.8)`), HT Wk1 135, Split DL Wk1 155, Carry 50→60–65
- Program: 5-day (Tue Upper / Wed Glute-Ham / Thu Heavy Lower / Fri Prep / Sat Fast-Twitch)
- Pelvic floor note: auto-inserted on every heavy carry / hip thrust / deadlift day via `pelvicFloorCallout()`
- **Week 8 Styku Re-Scan (8/7/2026)** — first full scan on file for this client: ALST Index 5.85 kg/m² Not At-Risk (Normal/monitor tier) | Body Fat 27.1% (Fit) | Lean Mass 78.4 lbs | VFA 61.4 cm² Low Risk | Shape Score 98/100 Excellent | BMI 18.9
  Segmental: L Arm 6.2 / R Arm 6.4 lbs (0.2 lb gap, below asymmetry threshold) · L Leg 12.7 / R Leg 13.1 lbs (0.4 lb gap, below threshold — monitor only, no unilateral-lead change indicated)
- **Protein target corrected (8/9/2026):** the nutrition table mislabeled her tier as "1.8–2.0 g/kg for women 50+" (94–104g/day) — that's actually the 40+ tier per the Evidence-Based Science Layer / Age Bracket Framework. At 64yo and postmenopausal she's squarely in the 55–65 bracket, which calls for 2.0–2.2 g/kg. Corrected to 104–115g/day (2.0–2.2 g/kg) in both the intro line and the nutrition table; nothing else on the page changed.
- **Brace Life Improvement Report (8/9/2026):** `clients/elizabeth_poyner/Elizabeth_Poyner_Brace_Life_Improvement_Report.docx`, built via `scripts/elizabeth_poyner_improvement_doc.js` — a new standalone document type (`buildImprovementDoc()` in `icons_template.js`, not the training-plan schema) comparing an earlier Styku scan (2/7/2026, 105.0 lbs, a simpler 4-page format with no segmental/ALST/VFA/Shape Score page) against the 8/7/2026 rescan already on file. Over 6 months: +12.8 lbs lean mass, −4.4 lbs fat mass, body fat 33.5%→27.1%, body-fat percentile 50th→80th, waist (abdominal) −2.5 in, waist (narrowest) −3.5 in, waist (lower) unchanged, bone mass +0.3 lbs (4.0%→4.0%, proportionally flat). ALST/VFA/Shape Score are presented as newly-established (8/7 scan) rather than compared, since the 2/7 report never measured them. Bone Mass is explicitly flagged as Styku's soft-tissue estimate, not a clinical DEXA bone-density scan/T-score — narrative note recommends a DEXA scan if she wants to confirm bone density directly and screen LIFTMOR candidacy. Strength comparison table includes only Hex Deadlift (175→195 lbs×5, the one lift with an exact documented prior number) — Hip Thrust/Push-Ups/Plank are exceptional current PRs called out narratively, not given a fabricated "before" value.

## System Files
- `scripts/icons_template.js` — canonical `.docx` template engine (`buildDocument()`), per `/CLAUDE.md` spec.
  Rebuilt (Aug 2026) against the actual Kelly Mulroy reference `.docx`: compact labeled-paragraph
  callouts (no boxes), a running header/footer, and a single-row week-overview strip.
  Auto-inserts `proteinBar()` (ALST At-Risk clients, every day) and `pelvicFloorCallout()`
  (postmenopausal clients, heavy-loading days) — no manual per-day calls needed.
  Also exports `epley1RM(weight, reps)` / `workingLoad(oneRM, pct, roundTo=5)` for converting
  new PR data into program loads.
- `docs/ICONS_System_Prompt.md` — paste-into-Claude-Projects reference copy of the full system prompt
  (see its editorial note — a few visual details there are superseded by CLAUDE.md)
