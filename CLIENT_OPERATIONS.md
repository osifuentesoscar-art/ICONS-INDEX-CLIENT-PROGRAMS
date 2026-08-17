# BRACE LIFE STUDIOS — CLIENT OPERATIONS
## Governance layer: gates, ledgers, registers, and standing checklists

Established 8/17/2026, at Xolokan's direct request (a 9-point operational directive). This file is distinct from `CLAUDE.md` (engine mechanics + clinical science reference) and `CLIENTS.md` (per-client program facts/changelog) — it tracks **process and governance state**: whether a client's program has cleared the gates it's supposed to clear, who owns which clinical constraint, and whether a standing checklist has actually been run, not just documented as a rule somewhere else.

**Owner:** `icons-operations-analyst` (new subagent, see `.claude/agents/icons-operations-analyst.md`). Read this file's own header in that agent's definition for how it stays current — this file is meant to be re-verified against the real roster on a standing cadence, not written once and left stale.

**Honest scope limitation (stated once here, applies to every section below):** this repo has no calendar, email, SMS, or task-queue integration. Nothing in this file can literally "notify the MA/coach" or "prevent a new block from being released" — there is no release mechanism to gate. What this file CAN do: make the required state visible and auditable (a weekly glance shows exactly what's due, what's missing, and what's overdue), and make it the standing practice of every subagent that touches a client's document to check this file before proceeding. That is a real operational improvement over the status quo (nothing tracked centrally), but it is a documentation/discipline layer, not automation — do not describe it to Xolokan as automated notification, because it isn't.

---

## 1. BLOCK 1 ASSESSMENT GATE

**Rule:** a program is not "Block 1 complete" — and should not be renewed into a new block — until its assessment package has all of the following on file. A client missing any item below gets an explicit, named gap in the table, not a silent pass.

**Required fields:**
1. Demographics (age, sex, height, weight)
2. Contraindication/clearance fields (any diagnosed condition, physician clearance status, medication use — GLP-1, beta-blocker, etc.)
3. Styku scan (or an explicitly approved clinical alternative — e.g. a force-plate/dynamometer assessment, documented as the deliberate substitute, not a silent absence)
4. The 11-exercise ICONS Baseline Testing Protocol battery (or an explicitly approved clinical alternative, same standard as #3)
5. Nutrition fields (body weight in kg, sufficient to calculate `proteinTargets()`)
6. Unilateral/force flags (segmental LST data or equivalent asymmetry finding, with weaker-side determination)

**Gate status:** `COMPLETE` (all 6 present), `COMPLETE — APPROVED ALTERNATIVE` (a substitute was used and explicitly documented as such), `BLOCKED — GAP` (named field(s) missing, program should not renew into a new block until resolved or an explicit clinical exception is documented), or `EXCEPTION — DOCUMENTED` (a gap exists but a clinical/business reason for proceeding anyway is on record, e.g. Petra's virtual-only intake).

| Client | Demographics | Clearance/Contraindication | Styku (or alt.) | 11-Ex. Battery (or alt.) | Nutrition fields | Unilateral/force flags | Gate Status |
|---|---|---|---|---|---|---|---|
| _to be populated from verified audit — see Section 8 below_ | | | | | | | |

---

## 2. 8-WEEK REVIEW LEDGER

**Rule:** every client's program runs on an implicit assessment → corrective exercise → training → progress review → renewal cycle, targeting an 8-week Styku rescan and baseline-battery retest. This ledger makes that cycle's actual status visible instead of assumed.

**Columns:** Client · Current Block Start Date · Assessment Booked (Y/N + date) · Assessment Completed (Y/N + date) · Reviewed (Y/N + date, who reviewed) · Next-Block Decision (Renewed / Modified / Paused / Pending) · Week 6-7 Flag (see below).

**Week 6-7 flag (manual-check substitute for automated notification — see the scope limitation above):** any client whose current block started 6+ weeks ago and has no booked reassessment gets an explicit `⚠ DUE FOR BOOKING` flag in this table. This requires someone (Xolokan, a coach, or a scheduled `icons-operations-analyst` pass) to actually look at the table — it does not push a notification anywhere.

| Client | Block Start | Assessment Booked | Assessment Completed | Reviewed | Next-Block Decision | Flag |
|---|---|---|---|---|---|---|
| _to be populated from verified audit — see Section 8 below_ | | | | | | |

---

## 3. CLINICAL CONSTRAINT REGISTER

**Rule:** every client carrying a real clinical flag (cardiac, spinal, joint/tendon rehab, shoulder safeguard, movement-fault correction) gets a named entry here — owner, clearance status, stop signals, and the progression gate that has to clear before load/intensity advances. A flag that exists only as prose inside a training-plan document (not also tracked here) is the exact gap this register exists to close.

**Columns:** Client · Constraint · Named Owner (who is clinically responsible — a specific person, e.g. "Jason Bethea," "client's cardiologist," not "the trainer") · Clearance Status · Stop Signals (what triggers a hold) · Progression Gate (what has to be true before advancing).

**Visibility, not authority:** any operations/coordination role (e.g. Oscar) can be given read access to this register so the assigned coach always sees the current constraint status — that does not confer clinical authority to change a status. Only the named owner (or the client's own physician/specialist) updates a clearance status.

| Client | Constraint | Named Owner | Clearance Status | Stop Signals | Progression Gate |
|---|---|---|---|---|---|
| Kayma Liburd | Cardiac — 160bpm HR ceiling | Client's cardiologist (external) | _to be verified_ | HR exceeds 160bpm in any session; new symptom reported | Cardiologist re-clearance before ceiling is raised |
| Aimee Morris | Spinal stenosis (staged reintroduction) | Trainer + Jason Bethea (in-house PT) | _to be verified_ | Any spinal symptom on reintroduced movement | 3-4 clean, symptom-free weeks before axial-load lifts added |
| Jake Poyner | QL tendinosis | Jason Bethea (in-house PT) | _to be verified_ | QL pain during/after session | Clinician criteria met (see his document) |
| Moe Shahheidari | Rotator cuff rehab | Jason Bethea (in-house PT) | _to be verified_ | Shoulder pain on overhead/pressing pattern | PT-confirmed progression milestone |
| August Olivia | Shoulder safeguard | _to be verified_ | _to be verified_ | _to be verified_ | _to be verified_ |
| Johnna Macarthur | Frozen shoulder / shoulder safeguard | _to be verified_ | _to be verified_ | _to be verified_ | _to be verified_ |
| Siobhan Hansen | Shoulder safeguard (overhead reintroduction) | _to be verified_ | _to be verified_ | Pain on overhead loading | Pain-free ROM at current load before advancing |
| Kelly Mulroy | Knee valgus (squat) | _to be verified_ | _to be verified_ | Valgus collapse under load | Corrective circuit compliance + clean movement at current load |
| _remaining flagged clients — see Section 8 below_ | | | | | |

---

## 4. ASYMMETRY EXECUTION LOG STANDARD

**Rule:** every client with a documented L/R asymmetry finding (Styku segmental LST gap ≥0.5 lb, or an equivalent force-assessment finding) gets a standardized execution log, not just a one-time note in `baselineNotes`. This tracks whether the asymmetry protocol (weaker side leads) is actually being executed session to session, not just prescribed on paper.

**Mandatory fields:** Client · Weaker Side (arm/leg, left/right) · Trigger Value (the LST gap or force-test %) · Unilateral Sequence (which exercises the weaker-side-leads rule applies to) · Left/Right Load-Reps-Time (per-side tracking, not just "same load both sides") · Suitcase-Carry Hand (weaker arm holds, per protocol) · Start Date · 8-Week Exit Criterion (gap closes below 0.5 lb at rescan, or a coach documents an evidence-based exception for continuing).

**Standing rule for the 9 LST-triggered leg cases:** retain left-first (or whichever side the scan identifies as weaker) sequencing on every unilateral leg exercise until EITHER (a) the 8-week rescan shows the segmental gap below 0.5 lb, or (b) a coach documents a specific, evidence-based reason to stop the left-lead protocol early (not simply "seems fine now"). Elizabeth Poyner's Week 8 rescan (gap closed, unilateral work now proceeds evenly, documented in `CLIENTS.md`) is the reference example of criterion (a) being met and correctly acted on.

| Client | Weaker Side | Trigger Value | Unilateral Sequence | L/R Load-Reps-Time Tracked? | Suitcase-Carry Hand | Start Date | 8-Wk Exit Status |
|---|---|---|---|---|---|---|---|
| _to be populated from verified audit — see Section 8 below_ | | | | | | | |

---

## 5. ALST / LOW-BODY-MASS ESCALATION WATCHLIST

**Rule:** don't wait for the next block's Styku rescan to discover a client has drifted across the ALST At-Risk (<5.5 kg/m²) or clinical-underweight (BMI <18.5) threshold. This watchlist tracks clients already At-Risk (engine-enforced `proteinBar()` coverage check) and clients genuinely close to a threshold (a "near threshold" watch status, not yet triggering the engine's auto-insert).

**ALST At-Risk clients (confirm `proteinBar()` fires on every training day):**

| Client | ALST Index | Status | `proteinBar()` on Every Day? | Protein/Creatine Documented? | Next Rescan Due |
|---|---|---|---|---|---|
| _to be populated from verified audit — see Section 8 below_ | | | | | |

**"Near threshold" watch status (not yet At-Risk, but close enough to warrant explicit tracking rather than silent drift):**

| Client | Metric | Current Value | Threshold | Watch Rationale |
|---|---|---|---|---|
| Mary Burfete | ALST Index | 5.52 kg/m² | <5.5 = At-Risk | 0.02 kg/m² above cutoff |
| Nicolette Scott | ALST Index | 5.52 kg/m² | <5.5 = At-Risk | 0.02 kg/m² above cutoff |
| Siobhan Hansen | BMI | 17.4 | <18.5 = Underweight | Already below cutoff — confirm this reads as an active flag, not just a watch item |

---

## 6. NUTRITION PROTOCOL ADOPTION TRACKER

**Rule:** track whether a nutrition protocol is actually PRESCRIBED, DECLINED, CONTRAINDICATED, or UNCONFIRMED for each client — not just "recommended" in a document. Distinguish "we told her the target" from "we know whether she's doing it."

**Data gap to close first:** body mass and other intake fields needed before `proteinTargets()` can calculate anything — Aimee Morris, Kayma Liburd, Kelly Mulroy, Nancy Avitable, Petra all currently have `includeNutritionBlock: false` or no weight on file.

| Client | Body Weight on File? | Daily Protein Range Status | Creatine (3-5g w/ food) Status | Collagen (15g+50mg VitC, pre-load) Status |
|---|---|---|---|---|
| _to be populated from verified audit — see Section 8 below_ | | | | |

---

## 7. SPECIAL-POPULATION REVIEW CHECKLIST

**Rule:** apply this review to every woman 50+ and every plan with real heavy-loading content, at build time and at every revision — not just once.

- [ ] Menopausal status confirmed (not left as an unconfirmed default) — priority: Mary Burfete, Johnna Macarthur
- [ ] Pelvic floor cues present and correctly triggered on every heavy squat/deadlift/hip-thrust/carry day — priority: Elizabeth Poyner, Johanna Castillo, Siobhan Hansen, and any symptomatic client
- [ ] Styku bone-mass figures are labeled as Styku's soft-tissue-derived estimate, not presented as clinical DEXA/T-score bone density
- [ ] Any DEXA/LIFTMOR-candidacy discussion is framed as a referral to the client's own physician, not an in-house diagnostic determination

| Client | Menopausal Status Confirmed? | Pelvic Floor Cues Correct? | Bone-Mass Language Correct? | DEXA/LIFTMOR Framed as Referral? |
|---|---|---|---|---|
| _to be populated from verified audit — see Section 8 below_ | | | | |

---

## 8. VERIFICATION STATUS

This file was scaffolded 8/17/2026 with the gate/register/ledger structures above. Per-client data is being populated by a verification pass (`icons-operations-analyst`, dispatched 8/17/2026) that checks every specific claim against the actual current state of `CLIENTS.md` and the build scripts — not against the unverified directive that prompted this file's creation. See the Verification Log below for what's been confirmed, corrected, or is still pending.

### Verification Log

_Entries added as verification passes complete — dated, with what was checked and what (if anything) differed from the assumption that prompted the check._
