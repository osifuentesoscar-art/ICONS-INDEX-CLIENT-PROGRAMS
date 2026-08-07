# Client Roster & Document Map

## Active Clients

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

### Elizabeth Poyner (referenced client — no build script in this repo yet)
- Age 64 | 5'5" | 115 lbs (up from 112 — lean mass gain) | Postmenopausal
- PRs: Hex DL 195×5 (Epley 1RM 228), Split Hex DL 165×5, Hip Thrust 145×5, DB Lunge 40×8, Push-Ups 28, Carry 50/hand, Plank 2:00, SL RDL 40, OHP 20
- Training loads: DL Wk1 180 (~80% 1RM via `workingLoad(228, 0.8)`), HT Wk1 135, Split DL Wk1 155, Carry 50→60–65
- Program: 5-day (Tue Upper / Wed Glute-Ham / Thu Heavy Lower / Fri Prep / Sat Fast-Twitch)
- Pelvic floor note: auto-inserted on every heavy carry / hip thrust / deadlift day via `pelvicFloorCallout()`

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
