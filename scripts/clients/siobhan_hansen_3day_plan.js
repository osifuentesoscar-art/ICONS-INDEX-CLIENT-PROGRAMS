/**
 * Siobhan Hansen — ICONS 3-Day Training Plan
 * Brace Life Studios
 *
 * FIRST BUILD IN THIS REPO for a known, previously-documented client. Her
 * legacy roster entry (CLAUDE.md, "CLIENT ROSTER & DOCUMENT MAP" section)
 * describes a prior 3-day program built pre-repo via a different Python/
 * reportlab pipeline — no script or docx for her exists anywhere in this
 * git repo. This build is fresh via buildDocument()/icons_template.js,
 * informed by both that already-documented history (age, height, weight,
 * postmenopausal status, ALST/VFA/BMI, segmental LST, protein target — all
 * independently re-confirmed today via a fresh read of her actual Styku
 * PDF, numbers matched exactly) and new intake data (a full strength
 * baseline battery, and two new clinical/programming priorities from the
 * trainer). Structural references: scripts/johnna_macarthur_3day_plan.js
 * (real Styku data, 3-day, clinical corrective priorities, epley1RM/
 * workingLoad usage) and scripts/moe_shahheidari_3day_plan.js (shoulder-flag
 * "strengthen with precautions, not restrictions" treatment, pain-monitoring
 * language distinguishing sharp/pinching pain from ordinary fatigue).
 *
 * CLINICAL / PROGRAMMING PRIORITIES FROM INTAKE (real emphasis throughout,
 * not passing mentions):
 *   1. Left shoulder — pain on overhead raising, PREVIOUSLY SUSPENDED,
 *      now being actively, carefully reintroduced. The new trainer note
 *      ("Over Head Left Side Raising Shoulder Pain... Strengthen overhead
 *      (Not Tested)") is an intentional progression, not a silent reversal
 *      of the earlier "suspended" status — framed explicitly as such in
 *      baselineNotes and in Day 1's intensity paragraph. Same "strengthen
 *      with precautions, not restrictions" principle already established
 *      for Moe Shahheidari's rotator cuff content: real progressive
 *      overhead loading, autoregulated by pain-free ROM and RIR (not a
 *      fixed %1RM table — overhead press was never load-tested, so there
 *      is no 1RM to build a percentage table from), sharp/pinching pain as
 *      the explicit stop signal (distinct from ordinary fatigue), and a
 *      dedicated Isolated-zone shoulder corrective/prep block sequenced
 *      BEFORE any overhead pressing on Day 1 — "control precedes power."
 *   2. Scapular strength required before pull-up progression. Trainer note
 *      "Before doing pull ups needs scapula strength" is a direct
 *      sequencing instruction — Day 1 Block B is a dedicated scapular
 *      strengthening block that precedes and gates her Assisted Pull-Up
 *      progression (tested at intake, 5 reps x 3 grips, documented as a
 *      baseline reference in the table below but not yet progressed in
 *      load/volume until the scapular block's own strength criteria are
 *      met). Directly connected to priority #1, since scapular stability
 *      also supports the overhead-shoulder work.
 *
 * DEMOGRAPHIC SCOPE: age 59 -> CLAUDE.md's 55-65 "Postmenopausal" bracket.
 * isPostmenopausal: true is a CONFIRMED fact from her existing roster
 * entry, not an assumption — pelvicFloorCallout() fires automatically on
 * Days 2 and 3 (squat/RDL/hip-thrust/carry content present) and is left to
 * fire naturally on both, never suppressed. proteinBar() also fires
 * automatically on every day given alstIndex 4.66 < 5.5.
 *   - weightKg 53.5 (118 lbs) x 2.0-2.2 g/kg (proteinTargets()'s ALST-At-Risk
 *     tier — per CLAUDE.md's Protein Targets section, corrected 8/17/2026,
 *     the escalation to the upper end of the 1.6-2.2 g/kg range is now
 *     context-driven [energy deficit / heavy training load / ALST At-Risk],
 *     NOT an age-band escalation; she qualifies on ALST At-Risk alone,
 *     independent of her age) resolves to 107-118g/day — matches her
 *     already-documented protein target exactly; no number changed here,
 *     only the stated rationale for why the target sits where it does.
 *
 * ALST + BMI — CLAUDE.md's NAMED HIGHEST-PRIORITY COMBINATION: ALST 4.66
 * kg/m² (At-Risk, <5.5) + BMI 17.4 (Underweight, <18.5) is the specific
 * numeric pattern CLAUDE.md's Evidence-Based Science Layer names
 * "sarcopenic obesity profile" — stated explicitly in baselineNotes as her
 * top clinical priority, with the counterintuitive label reconciled against
 * her actual composition (Body Fat 30.9%, Styku's own "Fit" tier in
 * isolation, is nonetheless a disproportionate share of an already-depleted
 * 76.9 lb lean mass total — low muscle mass + relatively elevated fat
 * proportion despite low total bodyweight is the compositional signature
 * the flag names, not a contradiction of "Underweight").
 *
 * BASELINE BATTERY — epley1RM()/workingLoad() used for every lift with real
 * weight+reps data (Hex Bar Deadlift, Squat, Hip Thrust, Single-Leg RDL,
 * Single-Leg Stance Squat) at a 75%->85% Week1->Week4 ramp, matching the
 * reference scripts' convention. Overhead Press was explicitly "Not
 * Tested" (per the shoulder-reintroduction note) and gets RIR/pain-free-ROM
 * autoregulation instead — no %1RM table, per Priority #1 above. Single-Arm
 * Row (20 lbs, no rep count given) and Kieser Pulldown (13.5 — a Kieser
 * pin-loaded/pneumatic-machine reading, NOT free-weight lbs, presented as
 * such rather than silently relabeled) both get descriptive/reference
 * framing, matching how Vinz Feller's/Moe Shahheidari's untested reference
 * loads are handled — no fabricated precise max for either.
 *
 * ASYMMETRY: weakerSide(7.0, 6.2) [arms] resolves to 'right' — right arm
 * leads all unilateral rowing/pressing (Single-Arm Row, Day 1; Suitcase
 * Carry, Day 3, per the Asymmetry Protocol's "weaker HAND holds the
 * suitcase load" rule). weakerSide(12.7, 13.5) [legs] resolves to 'left' —
 * left leg leads all unilateral leg work (Single-Leg Stance Squat and
 * Single-Leg RDL, Day 2; carried into Day 3's activation carryover).
 *
 * REVISION (8/17/2026, External Evidence Review response — Asymmetry
 * Protocol trigger corrected from an absolute 0.5 lb gap to a RELATIVE
 * gap >= 10%, per CLAUDE.md's "Asymmetry Protocol" section corrected the
 * same day): recomputed both gaps as a percentage of the larger side,
 * since the engine has no built-in %-relative helper yet (see CLAUDE.md —
 * "known gap, not yet built").
 *   - ARMS: 0.8 lb gap / 7.0 lbs = ~11.4% — MEETS the corrected >=10%
 *     relative threshold. Right-arm-leads prescription is retained and its
 *     rationale updated to cite the relative-% standard instead of the
 *     retired 0.5 lb absolute trigger.
 *   - LEGS: 0.8 lb gap / 13.5 lbs = ~5.9% — DOES NOT meet the corrected
 *     >=10% relative threshold, even though it cleared the old 0.5 lb
 *     absolute trigger. Per the corrected standard's own retroactive-
 *     scope note ("some clients' documented gaps may no longer clear
 *     10%... needs careful per-client verification, not a blanket
 *     rewrite"), the existing left-leg-leads unilateral prescription is
 *     being LEFT IN PLACE here rather than silently removed — this is a
 *     targeted language-correction pass, not a re-determination of her
 *     programming. FLAGGED FOR HUMAN REVIEW: whether Siobhan's leg
 *     unilateral-lead assignment should be re-evaluated (e.g. against a
 *     functional single-leg strength/power test, per the corrected
 *     standard's preferred primary trigger) is a genuine open question,
 *     not resolved by this pass. Client-facing language for the leg gap
 *     was reworded to avoid claiming it meets a trigger it does not,
 *     while still stating the finding and the existing prescription
 *     plainly.
 *
 * REVISION (8/13/2026, roster cross-check from icons-roster-analyst) — POWER
 * TRAINING ADDED, 55-65 BRACKET: CLAUDE.md's Power Training section places
 * sub-maximal-load/maximal-intent power work in the 55-65 bracket already,
 * not just 65+ (power output declines before strength does). Her three
 * existing Metabolic-finisher blocks (Bike Intervals, Standing March w/
 * Band, Incline Treadmill Walk) are general conditioning, not power work.
 * Day 3, Block F is new: Box Step-Up Jump — bodyweight, full recovery
 * between sets, deliberately NOT an overhead movement given the left
 * shoulder reintroduction underway in Blocks A/C on Days 1 and 3 (no
 * overhead med ball throw or similar). Full recovery between sets is the
 * defining design feature of power work, distinct from a metabolic
 * stimulus — it does not compete with the deliberately brief metabolic
 * finishers elsewhere in this program, which stay short specifically to
 * protect recovery capacity for the ALST At-Risk/Underweight resistance
 * priority (see the sarcopenic-profile baselineNote). The prior Block F
 * (Metabolic Finisher) is renumbered to Block G; nothing else on Day 3
 * changed.
 *
 * REVISION (8/18/2026, Jason Bethea SOAP-note sweep — new clinical finding,
 * NOT previously documented anywhere in this file or in CLIENTS.md): a new
 * SOAP note (SOAP_SiobhanHansen_2026-08-06.pdf, Stress Bar Clinical, dated
 * 2026-08-06) documents an active "Hip & Pelvis — Overuse/Chronic · Left ·
 * severity 4 · Tendinitis" finding, with the subjective note "Still in the
 * rehab stage for left hip." This is a genuinely new, currently-rehabbing
 * clinical flag, added as an ADDITION — nothing else in this document was
 * removed or changed. Coordinated with Jason Bethea (Brace Life's in-house
 * Trainer/Physical Therapist), per the Studio Staff naming convention. The
 * same note also documents a left shoulder finding ("Mobility & Function ·
 * Left · severity 3 · Postural dysfunction") — this is CONTINUITY with the
 * already-documented left-shoulder overhead-reintroduction priority above,
 * not a new finding, and required no action.
 *   Added: (1) a new clinical-priority baselineNote (red) naming the
 *   finding, the rehab stage, and Jason Bethea's coordinating role; (2) a
 *   caution clause on Day 2 Block A's ("Hip & Single-Leg Stance Activation")
 *   intro, since that block is literally hip-focused; (3) exercise-level
 *   `flag` text on every directly hip-loaded exercise across Day 2
 *   (Squat, Single-Leg Stance Squat, Single-Leg RDL) and Day 3 (Hex Bar
 *   Deadlift, DB Hip Thrust, Box Step-Up Jump), matching the exact
 *   sharp/pinching-pain-vs-ordinary-fatigue pattern already used for her
 *   left shoulder flags; (4) a closing clause on both Day 2's and Day 3's
 *   iconsNote. No load numbers, sets/reps, or existing clinical content
 *   (shoulder flag, scapular gate, asymmetry protocol) were changed —
 *   this is purely additive caution language layered onto already-existing
 *   hip-loading content.
 *
 * REVISION (8/18/2026, second pass, same day — full-detail enhancement
 * pass, Xolokan's direct request: mine the FULL raw content of the same
 * 8/6/2026 SOAP note for durable Isolated-zone/accessory/activation value,
 * not just the one headline clinical finding already added above). Full
 * prior record (this header and CLIENTS.md's entry) re-read in full first,
 * per the standing rule. This note documents a genuinely rich activation/
 * corrective circuit covering BOTH of her documented issues (left shoulder,
 * left hip):
 *   1. Stick mobility drill warm-up (shoulder passovers, overhead squat
 *      with stick, hip openers) — her actual session opener. Added to Day
 *      1's warm-up, the day already carrying the shoulder-reintroduction
 *      priority; not repeated on Days 2/3 to avoid redundant bloat, but a
 *      hip-opener-only line is separately added to Day 2's warm-up given
 *      the active left-hip tendinitis rehab there (see #2 below).
 *   2. Hip-side content (Crab Walk — Static Elvis Knee/Internal Rotation
 *      variant, her actual performed modification rather than the standard
 *      walking version — and Glute Kickback, Total Gym Level 10/50 lb, a
 *      real load reading) added to Day 2 Block A and Day 3 Block A, the
 *      two existing "hip activation" blocks, directly reinforcing the
 *      active left-hip tendinitis rehab already documented above.
 *   3. Shoulder/postural content (Floor Row on Foam Roller — an unstable-
 *      surface, core-integrated pulling accessory; I's-T's-W's Prone, with
 *      her actual documented modification — 5 lb DBs, 8 reps one arm in a
 *      hinge stance, reduced ROM on the W/Y sweep; Quadruped Shoulder
 *      Press, a closed-chain activation drill) added to Day 1 Block A
 *      ("Shoulder Reintroduction — Corrective Priority"), the existing
 *      Isolated-zone shoulder corrective block, directly reinforcing the
 *      documented left-shoulder postural-dysfunction finding.
 * A new baselineNote (marked internal — cites SOAP-note session detail,
 * same pattern as the existing clinical-priority note above) documents
 * this addition; the exercises/warm-up content themselves stay fully
 * visible in both the trainer document and Client View regardless of that
 * note's audience.
 *
 * REVISION (8/18/2026, fourth pass, same day — ICONS BLOCK METHOD PILOT,
 * per CLAUDE.md's "ICONS Block Method — Standing Session Architecture"
 * section added the same day; Siobhan is the roster pilot, chosen for
 * having all three of the method's data sources rich and current: full
 * Styku scan, fresh Jason Bethea SOAP note with prescribed exercises AND
 * two active clinical findings, and a tested baseline battery). Each day
 * restructured onto the standing five-slot order (Corrective → Primary
 * Compound → Accessory → Jason's Exercise → Secondary Compound), with the
 * pre-existing carries/core/power/finisher blocks retained as standing
 * post-architecture blocks after slot 5 (the spec's Three-Zone mapping
 * explicitly allows finishers to close a day after the secondary
 * compound; carries/core/power have no named slot — reported as a pilot
 * friction finding, not silently dropped). Per-day mapping:
 *   DAY 1 (upper/press-pull day → shoulder correctives lead):
 *     Slot 1 = Blocks A+B (shoulder reintroduction corrective + scapular
 *     gate — her double corrective coverage spans two blocks; compressing
 *     them into one would blur the gate's distinct clinical identity).
 *     Slot 1 consumes ALL of Jason's Day-1-applicable content (I's-T's-W's,
 *     Quadruped Shoulder Press, Floor Row on Foam Roller — all three are
 *     shoulder/postural correctives per his note). Slot 2 = Block C
 *     (Seated DB OHP, the reintroduction primary). Slot 3 = Block D
 *     (Incline Push-Up, moved up from old Block E — hypertrophy-priority
 *     press accessory, rirNote corrected 2→1 RIR per the corrected tiers;
 *     no clinical flag on the incline-press pattern). Slot 4 = OMITTED —
 *     all applicable Jason content already consumed by slot 1, and the
 *     two placements considered were both rejected: Floor Row in slot 4
 *     would create a 3-consecutive-pull run into slot 5 (floor row →
 *     Kieser pulldown → SA row), and placing hip-side Jason content
 *     (kickback/crab walk) on Day 1 would silently raise her active-
 *     tendinitis rehab-exercise frequency from 2x to 3x/week — a clinical
 *     dosing decision that belongs to Jason, not this restructure. Slot 5
 *     = Block E (Kieser Pulldown + Single-Arm DB Row, right-led — pull,
 *     antagonist to the press primary). Block F finisher unchanged.
 *   DAY 2 (lower day → hip correctives lead):
 *     Slot 1 = Block A unchanged (clamshell, bird dog, Crab Walk static
 *     Elvis-knee [Jason], Glute Kickback TG L10 [Jason] — both hip-side
 *     Jason exercises stay slot-1 priming, exactly as his note used them).
 *     Slot 2 = Block B, Squat only (SL Stance Squat split out). Slot 3 =
 *     new Block C, Single-Leg Stance Squat (left-led) — unilateral squat
 *     accessory supporting the primary; rirNote kept at 2 RIR despite the
 *     accessory-slot 1-RIR default, a deliberate clinical override given
 *     the active left-hip tendinitis flag + fixed %1RM ramp. Slot 4 = new
 *     Block D, Floor Row on Foam Roller (Jason — shoulder-side exercise
 *     NOT consumed by this day's hip-focused slot 1; gives the documented
 *     postural-dysfunction finding a second weekly touch, gives this
 *     otherwise lower-only day its one upper-back pull, and lands as a
 *     textbook antagonist break between the squat-pattern work above and
 *     the hinge below). Slot 5 = Block E, Single-Leg RDL (left-led) —
 *     hinge, different pattern from the squat primary. Block F finisher
 *     unchanged.
 *   DAY 3 (posterior-chain day → hip correctives lead):
 *     Slot 1 = Block A unchanged (clamshell, standing hip abduction,
 *     Glute Kickback [Jason] — kickback stays slot-1 priming here, as
 *     before; moving it to slot 4 would stack Hex DL → Hip Thrust →
 *     Kickback as 3 consecutive hip-extension exercises). Slot 2 = Block
 *     B, Hex Bar Deadlift only (rirNote aligned '1-2 RIR' → '2 RIR' per
 *     the corrected primary-lift default). Slot 3 = new Block C, DB Hip
 *     Thrust — glute hypertrophy accessory in the allowed primary+
 *     accessory posterior-chain pairing; 2 RIR kept (same hip-flag
 *     clinical override as Day 2's accessory). Slot 4 = new Block D,
 *     I's-T's-W's Prone Modified (Jason — shoulder-side, not consumed by
 *     this day's slot 1; primes the shoulder immediately before the
 *     pressing check-in below, mirroring Day 1's corrective-before-
 *     pressing discipline). Slot 5 = Block E, Shoulder & Pull Check-In
 *     (Standing DB OHP + Kieser Pulldown — press+pull secondary, Index-
 *     serving via the OHP reintroduction, kept early enough to be run
 *     fresh rather than after carries). Blocks F (carries) / G (core) /
 *     H (power) / I (finisher) retained post-architecture, relative order
 *     unchanged; internal power-training note and intro cross-references
 *     updated from Block F/G to H/I.
 * NO clinical content changed: all 6 left-hip flags, the shoulder
 * reintroduction protocol, the scapular gate, both asymmetry leads, the
 * pelvic-floor auto-fire days (2 and 3 — exercise-name trigger set
 * unchanged on both), proteinBar auto-fire, and all Wk1→Wk4 loads
 * survive verbatim. The only prescription-detail changes are the two
 * RIR-tier alignments noted above, both implementing the corrected RIR
 * standard the method itself specifies. A new internal baselineNote
 * documents the restructure; nothing about it appears in the Client View.
 *
 * REVISION (8/18/2026, third pass, same day — Client View audience-leak
 * fix, audit finding; chronologically PRECEDES the Block Method pilot
 * pass documented above, which was appended out of physical order): the
 * two same-day editing passes above left build-process language in fields
 * that have NO audience filter and therefore render in the Client View.
 * Fixed: (1) the left-hip clinical note's opening sourcing clause ("New
 * finding (SOAP note dated 8/6/2026, not previously documented...)") SPLIT
 * per the Aimee Morris LIFTMOR precedent — the clinical finding, the Jason
 * Bethea coordination language, and the pain-monitoring instruction all stay
 * visible; only the provenance admission moved to a new audience:'internal'
 * note; (2) five exercise `cue` fields reworded to drop "New this update"
 * framing (the Glute Kickback cues now state the working load itself rather
 * than its session provenance); (3) Day 1 Block A and Day 2 Block A `intro`
 * text reworded to describe what the block does rather than when it was
 * added; (4) both warm-up fields reworded off "PT-documented ... from the
 * 8/6 session, used as her actual opener" to "PT-led ... used as the session
 * opener." No exercise, load, set/rep, or clinical-content change.
 *
 * REVISION (8/18/2026, fifth pass, same day — BLOCK METHOD SLOT 6 APPLIED,
 * per CLAUDE.md commit 3429cbd adding "THIRD COMPOUND — INTEGRATION" to the
 * ICONS Block Method: the session's closer, a compound movement or short
 * compound complex pulling the day's patterns together — carries, core-
 * integrated compound work, and bracket-mandated power work now live here
 * by default instead of floating in unnamed post-architecture blocks.
 * This resolves the pilot's own friction finding from the fourth pass.):
 *   DAY 1 — NEW Block F, "Full-Body Integration — Suitcase Carry
 *     (Right-Led)": integrates the day's scapular setting (Blocks A-B),
 *     grip/pull strength (Block E), and tall pressing posture (Block C)
 *     under gait. Right hand holds the load per the Asymmetry Protocol
 *     (right arm weaker — same rule as Day 3's suitcase carry). Load
 *     15-20 lbs — anchored to her existing Day 3 suitcase prescription,
 *     itself derived from the tested 25 lbs/hand Farmers Carry baseline;
 *     no invented number. CONSEQUENCE: the carry brings Day 1 into
 *     pelvicFloorCallout()'s trigger set, so the callout now auto-fires
 *     on ALL THREE days (previously Days 2-3 only) — correct behavior
 *     per the amended spec, not a bug; the internal Age Bracket note and
 *     the visible asymmetry note were both updated to match (no stale
 *     "Days 2 and 3" / "Suitcase Carry, Day 3" references left dangling).
 *     Metabolic finisher relettered F→G.
 *   DAY 2 — NEW Block F, "Full-Body Integration — Hinge-to-Carry
 *     Complex" (DB Deadlift x5 → Farmers Carry 20-30 yd, one continuous
 *     complex row, 2 sets, 15-20 lbs/hand — deliberately light): the day
 *     already carries substantial hip-extension volume during active
 *     left-hip tendinitis rehab, so the closer integrates the day's
 *     squat/hinge patterns into braced gait WITHOUT piling on heavy
 *     hip-extension sets. Carries the standard left-hip flag (the hinge
 *     pickup is hip-loaded, and walking under load with a rehabbing hip
 *     warrants the pain-monitoring language regardless). Antagonist walk:
 *     SL RDL (hinge) → complex (hinge pickup, then carry) = 2 consecutive
 *     hinge exercises then a carry — within the two-in-a-row allowance.
 *     Metabolic finisher relettered F→G.
 *   DAY 3 — no content moved; Blocks F (carries), G (core), H (power)
 *     RETITLED as the day's integration work ("Full-Body Integration —
 *     Loaded Carries / Core Under Load / Power Expression"), formalizing
 *     what the day already did — these were exactly the orphaned
 *     post-architecture blocks the slot-6 amendment names. Letters F/G/H/I
 *     unchanged (no reletter; the power note's Block H reference and the
 *     H-intro's Block I reference both stay accurate). One prescription-
 *     detail alignment: DB Farmers Carry rirNote '2 RIR' → the carry
 *     convention ("Distance & quality governed — no RIR target"),
 *     matching the treatment stated on both new integration blocks.
 *   RIR convention on all carry/complex work: distance- and quality-
 *   governed, no RIR target, stated as such per exercise — an RIR count
 *   is meaningless on a gait-based quality movement.
 *
 * REVISION (8/18/2026, sixth pass, same day — EXTERNAL REVIEW APPLICATION,
 * Xolokan-commissioned external review of her Client View at commit 4ee7acc
 * + delta audit; four actionable gaps applied, one clinical question
 * documented-but-not-applied):
 *   1. CALORIC SURPLUS (new gold baselineNote, client-visible, placed
 *      directly after the sarcopenic-profile clinical note): the plan
 *      prescribed protein grams (107-118g/day) but never stated the energy
 *      condition muscle-building depends on. For an underweight (BMI 17.4)
 *      + ALST At-Risk client, a modest consistent surplus (~350-480
 *      kcal/day above maintenance, monitored/adjusted at rescan, not fixed
 *      for 8 weeks) is now stated explicitly, with a registered-dietitian
 *      referral phrased as an offer. No TDEE/absolute-kcal total is
 *      computed or stated — her BMR (1230) is not maintenance, and
 *      fabricating a maintenance number would be exactly the kind of
 *      invented figure this system prohibits.
 *   2. PLANNED DELOAD — WEEK 5 (new blue baselineNote, client-visible,
 *      placed directly after the left-hip clinical note): the program ran
 *      continuous progressive loading to Week 8 with two active injury
 *      sites. Week 5 — immediately after the Week 4 strength check, per
 *      the 4-week reassessment cadence — is now a planned deload: same
 *      exercises, sets reduced roughly a third, all work in the 3+ RIR
 *      technique/submaximal band, loads HELD at Week 3-4 levels (the
 *      standard add-weight progression rule pauses for the week), then
 *      Weeks 6-8 rebuild from the Week 4 loads toward the retest/rescan.
 *      RECONCILIATION with existing progression language: every Wk1→Wk4
 *      load field describes only the first 4-week block and needed no
 *      change; summary.milestones4wk, milestones8wk, and rescanNote were
 *      each updated to state the Wk4-check → Wk5-deload → Wk6-8-rebuild
 *      arc so no field implies unbroken linear loading through 8 weeks.
 *   3. BONE DENSITY (new gold baselineNote, client-visible, placed after
 *      the teal Styku note; modeled on Elizabeth Poyner's "Bone-Loading
 *      Candidacy" note): postmenopausal + low body weight are two stacked
 *      osteoporosis risk factors and the document never mentioned bone
 *      density client-side (the internal Age Bracket note's LIFTMOR line
 *      was trainer-only). New note recommends a physician conversation —
 *      clinical risk assessment (FRAX or similar), DXA if indicated —
 *      framed as "bone investment," never alarm; honestly states her
 *      current intensities peak ~85% e1RM at Wk4, below LIFTMOR's >85%
 *      threshold and appropriate for where she is, with the T-score
 *      result shaping the long-term loading plan. Referral-not-diagnose
 *      throughout.
 *   4. SLEEP/RECOVERY (new blue baselineNote, client-visible, brief):
 *      zero recovery language existed in a plan for a recovery-limited
 *      client. One warm note per CLAUDE.md's Sleep & Recovery section —
 *      RT itself measurably improves sleep quality; for her, sleep is
 *      where the stimulated muscle gets built.
 *   5. HIP PAIN RULE — DOCUMENTED ONLY, DELIBERATELY NOT CHANGED (new
 *      internal baselineNote): the review correctly notes her binary
 *      stop-signal (sharp/pinching = stop) is more conservative than the
 *      graded tendinopathy loading model (Silbernagel pain-monitoring:
 *      pain up to ~5/10 acceptable during loading if it settles within
 *      24h and isn't trending worse). That stop-signal is Jason Bethea's
 *      clinical call — per the never-silently-merge-clinical-conflicts
 *      rule, ALL existing stop-signal language stays verbatim; the
 *      question is recorded for Jason via the normal SOAP-note channel
 *      and logged in CLIENTS.md as pending his input.
 * No exercise, load, set/rep, flag, or existing clinical content changed
 * in this pass — additions 1-4 are notes plus the three summary-field
 * reconciliation edits listed under #2.
 *
 * REVISION (8/19/2026, seventh pass — COMPOUND-SLOT EXPERT OPTIONS, per
 * CLAUDE.md's "Compound-slot exercise options" paragraph added to the
 * Block Method 8/18/2026, commit 99c2bed; Siobhan is the Block Method
 * pilot, so the rule is applied here first): every compound slot
 * (Primary, Secondary, Third/Integration — plus the Day 3 hip-thrust
 * accessory-compound, per the rollout instruction) now carries a 2-4
 * option same-pattern rotation stated in the block intro (one case uses
 * an exercise `insight` — the Day 3 power block's no-jump step-up
 * option), coach-selectable by equipment/tolerance/day readiness, in
 * client-readable coaching language ("If the day calls for a
 * variation, rotate between: ..."). Per the spec's four rules:
 *   (1) ANCHORS UNCHANGED — every Index-tested movement (Seated DB OHP,
 *       Squat, SL RDL, Hex Bar Deadlift, DB Hip Thrust) remains the
 *       tracked/retested progression anchor, stated in each intro; no
 *       Wk1→Wk4 load line moved.
 *   (2) CONSTRAINT-FILTERED — every hip-loaded option carries the same
 *       sharp/pinching stop rule and none raises hip-loading frequency
 *       (options substitute within a session, never add sessions);
 *       every press option sits inside the pain-free-ROM
 *       reintroduction protocol (landmine press = standard scap-
 *       friendly first alternate; half-kneeling SA press right-led;
 *       high-incline DB press conditional on a clean range check);
 *       the band-assisted pull-up option is explicitly conditional on
 *       Block B's scapular criteria — the gate is not bypassed; side
 *       rules (right arm leads rows/presses, right hand holds
 *       one-sided carries, left leg leads unilateral lower work)
 *       restated on every option they touch.
 *   (3) SAME-PATTERN per the Antagonist Rotation taxonomy — squat slot
 *       offers squat variants, hinge slot hinge variants, press slot
 *       press variants, integration slots carry/complex variants.
 *   (4) NO DECORATIVE OPTIONS — rejected on constraint grounds:
 *       overhead/waiter's carry (new overhead loading outside the
 *       reintroduction protocol), kettlebell swing as a hinge/power
 *       alternate (ballistic hip extension during active severity-4
 *       tendinitis rehab), broad/depth-jump power alternates (impact
 *       escalation on the rehabbing hip — the valuable direction is
 *       the no-jump regression, which IS listed).
 * One new internal baselineNote records the selection/rejection
 * reasoning for the trainer; nothing about it reaches the Client View.
 * No load, set/rep, flag, tempo, rest, or clinical language changed.
 */

const fs = require('fs');
const path = require('path');
const {
  buildDocument, epley1RM, workingLoad, weakerSide,
} = require('../icons_template');

// ── Convert tested weight/rep data into working loads ──────────────────
const oneRM = {
  hexDL: epley1RM(85, 5),        // 99
  squat: epley1RM(25, 5),        // 29
  hipThrust: epley1RM(35, 5),    // 41
  slRDL: epley1RM(25, 5),        // 29
  slStanceSquat: epley1RM(12, 5), // 14
};

const wk1 = {
  hexDL: workingLoad(oneRM.hexDL, 0.75, 5),               // 75
  squat: workingLoad(oneRM.squat, 0.75, 5),                // 20
  hipThrust: workingLoad(oneRM.hipThrust, 0.75, 5),        // 30
  slRDL: workingLoad(oneRM.slRDL, 0.75, 2.5),              // 22.5
  slStanceSquat: workingLoad(oneRM.slStanceSquat, 0.75, 2.5), // 10
};

const wk4 = {
  hexDL: workingLoad(oneRM.hexDL, 0.85, 5),                // 85
  squat: workingLoad(oneRM.squat, 0.85, 5),                // 25
  hipThrust: workingLoad(oneRM.hipThrust, 0.85, 5),        // 35
  slRDL: workingLoad(oneRM.slRDL, 0.85, 2.5),              // 25
  slStanceSquat: workingLoad(oneRM.slStanceSquat, 0.85, 2.5), // 12.5
};

const client = {
  name: 'Siobhan Hansen',
  programTitle: '3-Day Training Plan',
  subtitle: 'Sarcopenia-Priority Strength Build · Shoulder Reintroduction & Scapular Foundation',
  schedule: '3x/Week · Full Gym',
  stats: ['Age 59', "5'9\"", '118 lbs', 'Postmenopausal', 'Styku Scan 7/29/2026'],
  weightKg: 53.5,
  ageYears: 59,
  isPostmenopausal: true,
  bmr: 1230,
  alstIndex: 4.66, // At-Risk — sarcopenia priority, see baselineNotes
};

const styku = {
  scanDate: '7/29/2026',
  bodyFatPct: 30.9,
  bodyFatRank: 'Fit',
  leanMass: 76.9,
  leanMassPct: 65.3,
  fatMass: 36.4,
  boneMass: 4.6,
  bmi: 17.4,
  bmr: 1230,
  vfa: 70.8,
  shapeScore: 72,
  shapeScoreLabel: 'Good',
  alstIndex: 4.66,
  leftArmLST: 7.0,
  rightArmLST: 6.2,
  leftLegLST: 12.7,
  rightLegLST: 13.5,
  peerComparison: "Lower body fat than 60% of Styku's peer comparison group — reads favorably in isolation, but see the ALST At-Risk + BMI Underweight note below for why this is not the governing clinical read on its own.",
};

// weakerSide() — lower LST = weaker = leads unilateral work.
const armWeakerSide = weakerSide(styku.leftArmLST, styku.rightArmLST); // 'right'
const legWeakerSide = weakerSide(styku.leftLegLST, styku.rightLegLST); // 'left'

const weekOverview = [
  { day: 'DAY 1', intensity: 60, focus: 'Upper Body —\nShoulder Reintroduction' },
  { day: 'DAY 2', intensity: 70, focus: 'Lower Body —\nLeft-Led Unilateral' },
  { day: 'DAY 3', intensity: 80, focus: 'Posterior Chain —\nFull-Body Strength' },
];

const baselines = [
  ['Hex Bar Deadlift', `85 lbs x 5 (Epley 1RM ≈${oneRM.hexDL} lbs)`, '7/29/2026', `Wk1: ${wk1.hexDL} lbs x5 → Wk4: ${wk4.hexDL} lbs x5 — 75%→85% 1RM ramp`],
  ['Squat', `25 lbs x 5 (Epley 1RM ≈${oneRM.squat} lbs)`, '7/29/2026', `Wk1: ${wk1.squat} lbs x6-8 → Wk4: ${wk4.squat} lbs x6-8 — matches the programmed 3x6-8`],
  ['Hip Thrust (DB)', `35 lbs x 5 (Epley 1RM ≈${oneRM.hipThrust} lbs)`, '7/29/2026', `Wk1: ${wk1.hipThrust} lbs x8 → Wk4: ${wk4.hipThrust} lbs x8`],
  ['Single-Leg RDL', `25 lbs x 5 (Epley 1RM ≈${oneRM.slRDL} lbs)`, '7/29/2026', `Wk1: ${wk1.slRDL} lbs/side x6 → Wk4: ${wk4.slRDL} lbs/side x6 — left leg leads`],
  ['Single-Leg Stance Squat', `12 lbs x 5 (Epley 1RM ≈${oneRM.slStanceSquat} lbs)`, '7/29/2026', `Wk1: ${wk1.slStanceSquat} lbs x6 → Wk4: ${wk4.slStanceSquat} lbs x6 — left leg leads`],
  ['Overhead Press', 'Not Tested — Reintroducing After Prior Suspension', '7/29/2026', 'Progressive strengthening, pain-free ROM only — load builds week to week, autoregulated by RIR, not a fixed %1RM table'],
  ['Single-Arm Row', '20 lbs (reference load, reps not recorded)', '7/29/2026', 'Build progressively at 2 RIR — right arm leads (weaker side)'],
  ['Farmers Carry', '25 lbs/hand', '7/29/2026', 'Hold at 25-30 lbs/hand for volume; add 5 lbs/hand at the 8-week retest if quality holds'],
  ['Incline Push-Up', '10 reps (bodyweight)', '7/29/2026', 'Target 14-16 clean reps by Week 8'],
  ['Plank Hold', '1:04 (64 sec)', '7/29/2026', 'Target 1:30-1:45 by Week 8'],
  ['Kieser Pulldown', '13.5 (Kieser pin-loaded/pneumatic resistance units — not directly comparable to a free-weight lbs figure)', '7/29/2026', 'Track Kieser-unit progression on the same machine session to session, not converted to a free-weight equivalent'],
  ['Assisted Pull-Ups', '5 reps x close, standard, and wide grip', '7/29/2026', 'Gated behind Day 1\'s scapular strengthening block — reduce assistance / add volume only once scapular criteria are consistently met'],
];

const baselineNotes = [
  {
    type: 'clinical',
    label: 'ALST At-Risk + BMI Underweight — Sarcopenic Profile, Top Clinical Priority',
    body: `Combined ALST Index ${styku.alstIndex} kg/m² (At-Risk, <5.5 threshold) and BMI ${styku.bmi} (Underweight, <18.5) is a numeric combination known clinically as a "sarcopenic obesity profile" — the top clinical priority in this program. The label reads counterintuitively against a client presenting as clinically underweight, but the underlying composition is consistent with it, not contradicted by it: Body Fat ${styku.bodyFatPct}% (${styku.fatMass} lbs fat mass) is Styku's own "Fit" tier in isolation, yet against a lean mass of only ${styku.leanMass} lbs (${styku.leanMassPct}%) and an ALST Index well below the sarcopenia threshold, that fat mass represents a disproportionate share of an already-depleted total body composition — low muscle mass co-occurring with a relatively elevated fat proportion despite low total bodyweight is the compositional signature this flag is naming. This is the top programming priority in this document: muscle-building is the primary physiological goal of every session, progressive resistance is prioritized on all three training days, protein/creatine escalate per the tier below, and no metabolic finisher in this plan is allowed to compromise recovery capacity for the resistance work driving this goal.`,
  },
  {
    type: 'gold',
    label: 'Eating Enough Is Part of This Program — Modest Energy Surplus',
    body: `The protein target below (107-118g/day) supplies the building blocks; total energy decides whether the body is allowed to build with them. At 118 lbs with an At-Risk lean-mass reading, muscle-building requires eating above maintenance — protein alone cannot do it at maintenance intake or below. The working starting point is a modest, consistent surplus of roughly 350-480 calories per day above her usual maintenance intake — not a fixed rule for the full eight weeks: it gets checked against the body-composition and strength trends at the rescan and adjusted from there, the same way every load in this plan is. This is not a meal plan and not a weight-gain alarm — it is the same training-support logic as the protein and creatine targets already in place: for Siobhan specifically, given the At-Risk lean-mass reading and low body weight, eating enough is part of the training program itself, not a separate project. Given her profile, a conversation with a registered dietitian is a genuinely worthwhile option — offered here as support for making the surplus easy and sustainable, and something her coach can help arrange whenever she'd like.`,
  },
  {
    type: 'red',
    label: 'Left Shoulder — Overhead Work Actively Reintroduced After Prior Suspension',
    body: `Previously documented left shoulder pain on overhead raising led to overhead pressing being fully suspended. The current trainer note — "Over Head Left Side Raising Shoulder Pain... Strengthen overhead (Not Tested)" — is an intentional progression, not a silent reversal of that caution: overhead work is now being actively, carefully reintroduced under close pain-monitoring, following the same "strengthen with precautions, not restrictions" principle already established for shoulder flags in this system. Every session with overhead pressing (Day 1, with a brief continued check-in on Day 3) opens with a dedicated Isolated-zone shoulder corrective/prep block — external/internal rotation, scapular stability, controlled shoulder flexion — sequenced BEFORE any pressing, per "control precedes power." Because overhead press was never load-tested, its progression is autoregulated by pain-free range of motion and RIR, not a fixed %1RM table — there is no baseline 1RM to build a percentage table from. Pain-monitoring language is explicit and consistent throughout: sharp or pinching pain during a set, or pain lasting beyond 24 hours, is the real stop signal — regress the range or substitute the exercise; ordinary muscular fatigue or normal training soreness is expected and is not a stop signal.`,
  },
  {
    type: 'purple',
    label: 'Scapular Strength — Required Gate Before Pull-Up Progression',
    body: `Trainer note: "Before doing pull ups needs scapula strength." This is a direct sequencing instruction, not a general suggestion — a dedicated scapular strengthening block (scapular retraction/depression, controlled scapular dead hangs, band pull-aparts) precedes and gates her assisted pull-up progression on Day 1, consistent with ICONS's "control precedes power" philosophy, and is directly connected to the shoulder-reintroduction priority above: scapular stability is foundational support for both the overhead pressing work and any future pull-up loading. Assisted Pull-Ups were tested at intake (5 reps x close, standard, and wide grip) and are documented as a baseline reference in the table below, but formal loaded progression — reduced assistance, added volume — is deferred until the scapular block's own strength criteria are consistently met: clean band pull-aparts 3x15 and a controlled 20-second scapular dead hang with no compensatory shrug are the working benchmark. Kieser Pulldown (machine-guided, lower coordination demand) serves as her active pull-strength pathway exercise in the meantime.`,
  },
  {
    type: 'teal',
    label: 'Styku Findings — Body Composition, VFA & Bone Mass',
    body: `Lean Mass ${styku.leanMass} lbs (${styku.leanMassPct}%), Fat Mass ${styku.fatMass} lbs, Bone Mass ${styku.boneMass} lbs, BMR ${styku.bmr} cal/day, Shape Score ${styku.shapeScore}/100 — "${styku.shapeScoreLabel}." VFA ${styku.vfa} cm² is tracked here as a trend indicator, not a risk-band diagnosis — worth watching directionally at the 8-week rescan alongside the composition priorities above, rather than read against a fixed cm² cutoff. BMI ${styku.bmi} is a clinical Underweight flag (<18.5) regardless of the "Fit" body-fat-percentage reading — see the governing sarcopenic-profile note above for how these findings interact.`,
  },
  {
    type: 'gold',
    label: 'Bone Density — A Conversation Worth Raising With Her Physician (Bone Investment)',
    body: `At 59, postmenopausal, and at a low body weight, two established bone-density risk factors sit together in her profile — which makes this a conversation genuinely worth raising with her physician: a clinical bone-health risk assessment (FRAX or similar) and, if her physician finds it indicated, a DXA scan. This is bone investment, not alarm — the result directly informs how her Hex Bar Deadlift and Hip Thrust work gets framed and progressed over the long term. A T-score below -1.0 would make her a candidate for a formal bone-loading progression built on exactly the lifts already in this program; a healthy reading simply confirms the current plan as it stands. Stated honestly: her current working intensities — peaking around 85% of estimated 1RM at Week 4 — sit below the >85% threshold the strongest bone-loading trial evidence used, and that is exactly appropriate for where she is right now, with a shoulder reintroduction and a hip rehab both underway. A T-score result is what would shape whether, when, and how the long-term loading plan builds toward that standard. Nothing in today's program waits on the scan — her deadlift and hip-thrust work is already real, progressive bone-loading stimulus at her current level.`,
  },
  {
    type: 'watch',
    label: 'Segmental Asymmetry — Right Arm Leads Pull/Press, Left Leg Leads Unilateral Work',
    body: `Arms: Left ${styku.leftArmLST} lbs / Right ${styku.rightArmLST} lbs — a 0.8 lb gap, roughly 11% relative to the larger side. RIGHT arm is weaker (lower LST) and leads every unilateral rowing/pressing exercise across this program (Single-Arm Row, Day 1; Suitcase Carry, Days 1 and 3 — the weaker hand holds the load, per the Asymmetry Protocol's coaching convention). Legs: Left ${styku.leftLegLST} lbs / Right ${styku.rightLegLST} lbs — also a 0.8 lb gap, roughly 6% relative to the larger side. LEFT leg continues to lead every unilateral leg exercise (Single-Leg Stance Squat and Single-Leg RDL, Day 2; carried forward into Day 3's activation work), with this gap tracked closely at the 8-week Styku rescan to confirm the lead assignment still reflects a real, worth-addressing difference. Reps/loads are logged per side throughout.`,
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Age Bracket & Postmenopausal Status — 55-65 Bracket',
    body: `At 59, Siobhan sits within CLAUDE.md's 55-65 "Postmenopausal" Age Bracket. isPostmenopausal is a confirmed, already-documented fact (not inferred from today's build), so pelvicFloorCallout() fires automatically on every day containing squat, deadlift/RDL, hip-thrust, or carry content — all three days in this program, since the 8/18/2026 integration blocks brought carry content to Day 1 (previously Days 2-3 only) — and is left to fire naturally throughout, never suppressed. Protein escalates to the upper end of the 1.6-2.2 g/kg range on ALST At-Risk grounds (CLAUDE.md's Protein Targets section, corrected 8/17/2026 — the target is now context-driven [energy deficit / heavy training load / ALST At-Risk], not an age-band escalation; she qualifies on ALST At-Risk alone, independent of her age): at her 53.5 kg bodyweight that resolves to 107-118g/day, matching her already-documented protein target exactly — no number changed, only the stated rationale. Creatine is strongly indicated. LIFTMOR-style bone-loading candidacy (T-score < -1.0) is worth screening for as part of ongoing care, though no DEXA/T-score data is currently on file to confirm candidacy either way.`,
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Power Training Added — 55-65 Bracket (8/13/2026)',
    body: 'CLAUDE.md\'s Power Training section places sub-maximal-load, maximal-intent power work in the 55-65 bracket already, not just 65+ — power output declines before strength does, so waiting until 65 is a real cost. Day 3, Block H (relettered from F in the 8/18/2026 Block Method restructure) includes a Box Step-Up Jump: bodyweight, full recovery between sets, and deliberately a lower-body movement — no overhead component, given the left shoulder reintroduction still underway on Days 1 and 3. Full recovery between sets is the defining design feature of power work, distinct from a metabolic stimulus, so it does not compete with the deliberately brief metabolic finishers used elsewhere in this program, which stay short specifically to protect recovery capacity for the ALST At-Risk/Underweight resistance-training priority named above.',
  },
  {
    type: 'red',
    label: 'Left Hip — Overuse/Chronic Tendinitis, Active Rehab Stage (Coordinated with Jason Bethea)',
    body: `Current clinical finding: "Hip & Pelvis — Overuse/Chronic · Left · Severity 4 · Tendinitis," with the note "Still in the rehab stage for left hip." Coordinated with Jason Bethea, Brace Life's in-house Trainer/Physical Therapist. This is an active, currently-rehabbing finding, not a historical footnote — it directly overlaps with real left-side hip-loading content already in this program: left leg leads every unilateral leg exercise on Day 2 (Squat, Single-Leg Stance Squat, Single-Leg RDL) and Day 3's hip-dominant work (Hex Bar Deadlift, DB Hip Thrust, Box Step-Up Jump). None of that content is removed — per this system's "strengthen with precautions, not restrictions" principle, the hip stays trained, but every set of that loaded work now carries explicit pain-monitoring language: sharp, pinching, or catching pain anywhere in the front/side of the left hip is the stop signal — regress load, range, or substitute the exercise and flag Jason Bethea; ordinary muscular fatigue or normal training soreness is not a stop signal. Hip activation work in Day 2 Block A and Day 3 Block A (banded clamshell, hip abduction, bird dog) is unaffected — light, controlled activation work is generally well-tolerated in a rehabbing-tendinitis presentation and is not restricted here.`,
  },
  {
    type: 'blue',
    label: 'Planned Deload — Week 5, Directly After the Week 4 Strength Check',
    body: `This program deliberately includes one lighter week, and it is planned, not a reaction to anything going wrong. Week 5 — immediately after the Week 4 strength check — is a structured deload: the same exercises and the same movement patterns, with sets reduced by roughly a third, every set held comfortably in the technique band (3 or more reps in reserve), and loads held at Week 3-4 levels rather than climbing — the usual add-weight rule pauses for this one week. With a shoulder in active reintroduction and a hip in active rehab, this is how the program protects both healing sites while the strength built in Weeks 1-4 consolidates. One light week costs nothing that matters: muscle built over the previous month is not lost in a single reduced-volume week — only a small edge of peak strength dips, and it returns within days of resuming. Weeks 6-8 then rebuild from the Week 4 loads toward the Week 8 retest and rescan.`,
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Source of the Left Hip Finding — Documentation Provenance',
    body: 'The left hip tendinitis finding above enters this program from a Jason Bethea SOAP note dated 8/6/2026 (SOAP_SiobhanHansen_2026-08-06.pdf, Stress Bar Clinical) — it was not previously documented anywhere in this program or in her roster entry, and was added as a purely additive revision on 8/18/2026: no load numbers, sets/reps, or pre-existing clinical content (shoulder flag, scapular gate, asymmetry protocol) were changed. The same note also documented a left shoulder "Mobility & Function · Left · Severity 3 · Postural dysfunction" finding, which is continuity with the already-documented shoulder-reintroduction priority rather than a new finding, and required no action.',
  },
  {
    type: 'green',
    label: 'PT Update — 8/6/2026 Session, Additional Activation & Accessory Detail (Jason Bethea)',
    body: 'The same SOAP note above (SOAP_SiobhanHansen_2026-08-06.pdf) documented a fuller PT-led warm-up and activation circuit covering both her left shoulder and left hip findings. Folded in this update: (1) a full-body PVC-stick mobility routine (shoulder passovers, overhead squat with stick, hip openers) used as her actual session opener, added to Day 1\'s warm-up, with a hip-opener line also added to Day 2\'s warm-up given the active hip rehab there; (2) Crab Walk (Static Elvis Knee/Internal Rotation — her actual performed modification, not the standard walking version) and Glute Kickback (Total Gym Level 10, 50 lbs) added to the existing hip-activation blocks on Day 2 and Day 3, directly reinforcing the left-hip tendinitis rehab; (3) Floor Row on Foam Roller, I\'s-T\'s-W\'s (Prone, with her documented modification — 5 lb DBs, one arm in a hinge stance, reduced ROM on the W/Y sweep), and Quadruped Shoulder Press added to Day 1\'s existing shoulder corrective block, directly reinforcing the left-shoulder postural-dysfunction finding.',
    // Client View: cites internal session-documentation detail (SOAP note
    // filename/date), same category already marked internal elsewhere in
    // this file. The exercises/warm-up content themselves stay fully visible.
    audience: 'internal',
  },
  {
    type: 'blue',
    label: 'Sleep — Where the Training Turns Into Muscle',
    body: 'One quiet part of this program deserves naming: sleep. The sessions here stimulate muscle; sleep is where that muscle actually gets built — and with a shoulder and a hip both healing alongside a muscle-building priority, her recovery hours are doing real work every night, not just resting. The encouraging part runs both directions: consistent resistance training itself measurably improves sleep quality, so the plan supports the nights as much as the nights support the plan. Protect sleep the way the sessions are protected — it is part of the program, not adjacent to it.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Session Architecture — ICONS Block Method Pilot (8/18/2026, incl. Slot 6)',
    body: 'This document is the roster pilot for the ICONS Block Method standing session architecture (Corrective → Primary Compound → Accessory → Jason\'s Exercise → Secondary Compound → Third Compound — Integration; see CLAUDE.md — the sixth slot was added 8/18/2026, same day as the pilot, and is applied here too). Restructure is organizational only — every clinical element (left-hip tendinitis flags on all 6 originally hip-loaded exercises, shoulder reintroduction protocol, scapular gate, both asymmetry leads, protein bar on all days) and every Wk1→Wk4 load survives verbatim. Five-slot mapping: Day 1 — Incline Push-Up promoted to the accessory slot ahead of the pull block (1 RIR per corrected accessory tier); slot 4 omitted (all Jason content consumed by the corrective slot; a slot-4 Floor Row would stack 3 consecutive pulls, and adding hip-side Jason work to Day 1 would raise rehab-exercise frequency to 3x/week — Jason\'s call, not ours). Day 2 — Squat/SL Stance Squat split into primary/accessory blocks; Floor Row on Foam Roller added as the Jason slot (2nd weekly touch of the postural finding, antagonist break between squat and hinge patterns). Day 3 — Hex DL/Hip Thrust split into primary/accessory blocks (Hex DL RIR aligned to 2 RIR primary default); I\'s-T\'s-W\'s added as the Jason slot priming the check-in; check-in reframed as the secondary compound. Accessory-slot RIR held at 2 (not the 1-RIR default) on both hip-flagged accessories (SL Stance Squat, Hip Thrust) as a deliberate clinical override during active tendinitis rehab. SLOT 6 (Third Compound — Integration, applied fifth pass same day — resolves the pilot\'s original "carries/core/power have no named slot" friction finding): Day 1 gains Block F, Suitcase Carry right-led (15-20 lbs, anchored to the Day 3 suitcase prescription/tested Farmers Carry baseline, no invented number) — this brings carry content to Day 1, so pelvicFloorCallout() now auto-fires on ALL THREE days (previously 2-3 only; correct per the amended spec, not a bug). Day 2 gains Block F, Hinge-to-Carry Complex (DB Deadlift x5 → Farmers Carry, 2 sets, deliberately light 15-20 lbs/hand — integrates the day\'s patterns into braced gait without adding heavy hip-extension volume during active rehab; carries the standard left-hip flag, making 7 flagged hip-loaded exercises total). Day 3\'s Blocks F/G/H (carries/core/power) retitled as its integration work, content unchanged except Farmers Carry rirNote aligned from \'2 RIR\' to the carry convention. All carry/complex work is distance/quality-governed with no RIR target, stated per exercise. Metabolic finishers still close each day after the integration work.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Compound-Slot Exercise Options — Selection Record (8/19/2026)',
    body: 'Per CLAUDE.md\'s compound-slot expert-options rule (Block Method, added 8/18/2026), every compound slot in this program now carries a 2-4 option same-pattern rotation in its block intro (the Day 3 power block uses an exercise insight instead), coach-selectable by equipment, tolerance, and day readiness. All menus were filtered against her record before listing: every hip-loaded option carries the same sharp/pinching stop rule and none raises hip-loading frequency beyond what is already programmed (options substitute within a session, never add sessions); every press option sits inside the pain-free-ROM reintroduction protocol (landmine press is the standard scap-friendly first alternate; the high-incline DB press option is conditional on a clean range check that day); the band-assisted pull-up option is explicitly conditional on Block B\'s scapular criteria — the gate is not bypassed. Options considered and REJECTED on constraint grounds, not to be added without a record change: overhead/waiter\'s carry (new overhead loading outside the current reintroduction protocol), kettlebell swing as a hinge or power alternate (ballistic hip extension during active severity-4 tendinitis rehab), broad/depth-jump power alternates (impact escalation on the rehabbing hip — the useful direction is the listed no-jump step-up regression). Index-tested movements (Seated DB OHP, Squat, Single-Leg RDL, Hex Bar Deadlift, DB Hip Thrust) all remain the tracked/retested progression anchors, stated in each intro — options are per-session substitutions, never a fork in the progression.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Clinical Question for Jason Bethea — Graded vs. Binary Hip Pain Rule (Pending, 8/18/2026)',
    body: 'Recorded from the 8/18/2026 external review of this document, for Jason Bethea via the normal SOAP-note channel — deliberately NOT applied here. Her left-hip stop-signal is currently binary (sharp/pinching pain = stop the set), which is more conservative than the evidence-based graded tendinopathy loading model (Silbernagel pain-monitoring: pain up to ~5/10 acceptable DURING loading, provided it settles within 24 hours and is not trending worse week to week). The binary rule is Jason\'s clinical call as the coordinating in-house PT for her active left-hip tendinitis rehab — per the never-silently-merge-clinical-conflicts rule, every instance of the sharp/pinching stop-signal language in this document stays verbatim pending his input. If he adopts a graded model, the update touches all 7 hip-flagged exercises\' flag text plus the Day 2/Day 3 block intros and ICONS Notes in one pass. Status: question pending; do not change the pain rule without his documented answer.',
  },
];

const days = [
  {
    intensity: 60,
    title: 'DAY 1 — UPPER BODY: SHOULDER REINTRODUCTION & SCAPULAR FOUNDATION',
    subtitle: 'Overhead Pressing Actively Reintroduced · Scapular Strength Gates Pull-Up Progression',
    descriptor: 'TECHNIQUE DAY · SHOULDER CARE PRIORITY · PULL-UP PATHWAY GATED',
    intensityLabel: '60% Day',
    intensityPara: 'Technique day — form over load, no PRs. Overhead pressing is being actively, carefully reintroduced today after a prior period of full suspension; the corrective and scapular blocks below earn that reintroduction before any pressing happens. Muscle-building remains the session\'s primary goal given her ALST At-Risk status — every block here is real progressive-resistance work, not filler. Effort is tiered by block today: corrective and scapular work stays comfortably submaximal (3+ RIR), the reintroduced press works at 2 RIR inside pain-free range, and the one hypertrophy-priority accessory set (incline push-up) is the only work taken to 1 rep in reserve.',
    warmUp: '5 min bike, band pull-apart x15, scapular wall slide x10, arm circles x10/direction (pain-free range only), cat-cow x8. PT-led stick mobility circuit, used as the session opener: PVC/stick shoulder passovers 2x10 (front-to-back overhead pass, pain-free range only), overhead squat with stick 2x8, hip openers (90/90 or open-book) 8 each side.',
    blocks: [
      {
        letter: 'A',
        title: 'SHOULDER REINTRODUCTION — CORRECTIVE PRIORITY',
        color: 'red',
        introLabel: 'Why',
        intro: 'Left shoulder overhead work was previously suspended due to pain; it is now being actively reintroduced under close pain-monitoring, not avoided. This block earns pain-free control through rotation and controlled flexion before any pressing — "control precedes power." Sharp or pinching pain is the stop signal here, clearly distinct from normal training fatigue. Floor Row on Foam Roller, I\'s-T\'s-W\'s, and Quadruped Shoulder Press are PT-led postural and scapular activation work, directly supporting the documented left-shoulder postural-dysfunction finding.',
        exercises: [
          { name: 'Band External Rotation (Elbow at Side)', sets: '3', reps: '12/side', load: 'light band', tempo: '2-1-2', rest: '45s', flag: 'Left shoulder — stop at sharp/pinching pain, not fatigue', cue: 'Elbow pinned to ribs, rotate within pain-free range only.' },
          { name: 'Band Internal Rotation (Elbow at Side)', sets: '3', reps: '12/side', load: 'light band', tempo: '2-1-2', rest: '45s', flag: 'Respect current ROM — never force end-range', cue: 'Small controlled arc, stop well short of any pinch.' },
          { name: 'Controlled Shoulder Flexion Raise', sets: '2', reps: '10', load: '2-3 lbs / light band', tempo: '3-1-2', rest: '45s', flag: 'Left side — pain-free range only, first overhead reintroduction rep', cue: 'Raise only to the point before any pinch, slow controlled return.' },
          { name: 'Scapular Wall Slide', sets: '2', reps: '10', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Ribs down, slide within comfortable range, low back flat.' },
          { name: 'Floor Row on Foam Roller', sets: '2', reps: '10-12', load: 'light band or DB', tempo: '2-1-2', rest: '30s', cue: 'Row variant performed lying prone over a foam roller — unstable-surface, core-integrated pulling accessory. Pull to hip, squeeze shoulder blade, no compensatory shrug.' },
          { name: "I's-T's-W's (Prone, Modified)", sets: '2', reps: '8/side (one arm)', load: '5 lb DB', tempo: 'controlled', rest: '30s', flag: 'Left shoulder — reduced ROM on the W/Y sweep portion, per documented session modification', cue: 'Performed one arm at a time in a hinge stance (documented modification from the standard bilateral-prone version). Reduced range on the W/Y sweep — pain-free range only.' },
          { name: 'Quadruped Shoulder Press', sets: '2', reps: '8-10/side', load: 'bodyweight', tempo: 'controlled', rest: '30s', cue: 'Closed-chain shoulder activation — hands in quadruped position, press through the shoulder blade. Complements Block B\'s scapular work.' },
        ],
      },
      {
        letter: 'B',
        title: 'SCAPULAR STRENGTH — PULL-UP PATHWAY GATE',
        color: 'purple',
        introLabel: 'Why',
        intro: 'Trainer instruction: "Before doing pull ups needs scapula strength." This dedicated block is the strengthening protocol itself, not a warm-up throwaway, and gates her Assisted Pull-Up progression (tested at intake — 5 reps x close, standard, wide grip — see baselines table). Loaded progression on pull-ups is deferred until this block\'s own criteria are consistently clean: band pull-aparts 3x15 and a controlled 20-second scapular dead hang with no compensatory shrug. Expert retraction options for the coach running the session — rotate by what her control shows that day rather than repeating one drill: band pull-apart, retraction-depression hold, scapular push-up, prone I\'s-T\'s-W\'s (her Day 3 modification applies), face pull, wall slide with lift-off, chest-supported scap-retraction row.',
        exercises: [
          { name: 'Scapular Retraction & Depression Hold', sets: '3', reps: '10', load: 'bodyweight', tempo: '2s hold', rest: '30s', cue: 'Pull shoulder blades down and back, hold, no shrug.' },
          { name: 'Scapular Push-Up', sets: '2', reps: '10-12', load: 'bodyweight', tempo: 'controlled', rest: '30s', flag: 'Left shoulder — quadruped regression if plank position provokes', cue: 'Arms locked, move only the shoulder blades — protract and retract through full comfortable range.' },
          { name: 'Band Pull-Apart', sets: '3', reps: '15', load: 'light-mod band', tempo: '2-1-2', rest: '30s', cue: 'Squeeze shoulder blades together, arms stay near shoulder height.' },
          { name: 'Scapular Dead Hang (Assisted, Controlled)', sets: '2', reps: '15-20s', load: 'bodyweight, assisted', tempo: 'hold', rest: '45s', cue: 'Active scapular engagement, not a passive hang — shoulders set, not shrugged.' },
          { name: 'Assisted Pull-Up (Baseline Reference — Not Yet Progressing)', sets: '1', reps: '5', load: 'assisted, close/standard/wide grip', tempo: 'controlled', rest: '60s', flag: 'Gated — hold at tested baseline until scapular criteria above are consistently met', cue: 'Full hang to chin-over-bar; log clean reps per grip, do not chase volume yet.' },
        ],
      },
      {
        letter: 'C',
        title: 'PRIMARY STRENGTH — OVERHEAD PRESS (PROGRESSIVE REINTRODUCTION)',
        introLabel: 'Load Target',
        intro: 'Never load-tested, so there is no 1RM to build a percentage table from. Progression is autoregulated entirely by pain-free range of motion and RIR — start light, add load only when full pain-free range and 2 RIR are both met with clean form. If the day calls for a variation, rotate between: a landmine press (the shoulder-friendly arc — the natural first alternate when the fully vertical line isn\'t clean yet), a half-kneeling single-arm DB press (light, one side at a time — right arm leads), or a high-incline DB press on a day the range check is clean. Every option lives inside the same rule as the press itself — pain-free range only, sharp or pinching pain ends the set — and the seated press stays the lift we track and retest. Whichever press runs, the plank shoulder taps that follow stay.',
        exercises: [
          { name: 'Seated DB Overhead Press', sets: '3', reps: '6-8', load: 'self-select ~3-5 lbs, build weekly', tempo: '2-0-2', rest: '90s', flag: 'Left shoulder — progress only within pain-free range', cue: 'Ribs stacked over hips, press within comfortable range only.', rirNote: '2 RIR' },
          { name: 'Plank Shoulder Taps (Static Hold)', sets: '2', reps: '8-10 taps/side', load: 'bodyweight', tempo: 'slow, controlled', rest: '45s', flag: 'Left shoulder — regress to quadruped position if the plank loads it painfully', cue: 'Hold the push-up position, hips level — tap slow, the hold is the exercise. Anchors the shoulder closed-chain right after pressing.' },
        ],
      },
      {
        letter: 'D',
        title: 'ACCESSORY — INCLINE PUSH-UP PROTOCOL',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'Baseline 10 reps, bodyweight — the muscle-building accessory behind today\'s pressing work, in a controlled, non-overhead range that is well-tolerated alongside the shoulder reintroduction above. Worked hard: this is a hypertrophy-priority set, taken to 1 rep in reserve.',
        exercises: [
          { name: 'Incline Push-Up', sets: '3', reps: '8-10', load: 'bodyweight (bench)', tempo: '3-1-1', rest: '60s', cue: 'Baseline 10 reps. Hands under shoulders, chest to bench, brace.', rirNote: '1 RIR' },
        ],
      },
      {
        letter: 'E',
        title: 'SECONDARY COMPOUND — PULL STRENGTH (RIGHT ARM LEADS)',
        color: 'purple',
        introLabel: 'Load Target',
        intro: 'The day\'s second compound pattern — pulling, rotating away from the pressing work above. Kieser Pulldown is her active pull-strength pathway exercise while pull-up loading stays gated — track progression in Kieser units on the same machine, not converted to a free-weight number. Single-Arm Row is led by the right arm (weaker side, per Styku LST). If the day calls for a pull variation, rotate between: a chest-supported row (torso fully supported, strict pattern), a single-arm landmine row (right arm leads, same as the DB row), or — only once Block B\'s scapular criteria are consistently met — a band-assisted pull-up; until then the gate governs and the Kieser Pulldown stays the vertical-pull pathway. The Kieser number remains what we track session to session.',
        exercises: [
          { name: 'Kieser Pulldown', sets: '3', reps: '10-12', load: 'Kieser 13.5 units, build weekly on same machine', tempo: '2-1-2', rest: '75s', cue: 'Full controlled range, chest tall, no momentum.', rirNote: '2 RIR' },
          { name: 'Single-Arm DB Row (Right-Led)', sets: '3', reps: '10/side', load: '20 lbs (reference), build progressively', tempo: '2-1-2', rest: '75s', flag: 'Right arm weaker (Styku) — leads every set', cue: 'Right arm first. Flat back, pull to hip, squeeze at top.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'F',
        title: 'FULL-BODY INTEGRATION — SUITCASE CARRY (RIGHT-LED)',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound — one movement that pulls today\'s work together: the scapular setting built in Blocks A-B, the grip and pulling strength from Block E, and the tall pressing posture from Block C, all held at once under gait. The weaker (right) hand holds the load, the same rule as Day 3\'s suitcase carry. Distance and movement quality govern this work, not an RIR target — add load only when every yard stays tall and level. If the day calls for a variation, a bilateral farmer carry (both hands loaded) or a goblet carry (one DB held at the chest — lighter, with an upright-posture bias) covers the same ground; any time the carry is one-sided, the right hand holds the load.',
        exercises: [
          { name: 'Suitcase Carry (Right-Led)', sets: '2', reps: '20-30 yd/side', load: '15-20 lbs', tempo: 'controlled', rest: '60s', flag: 'Right hand holds the weight — weaker arm (Styku)', cue: 'Right hand loaded. Shoulders set, ribs stacked, resist the lean.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
      {
        letter: 'G',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'A short, low-impact finisher — kept brief given the ALST At-Risk/Underweight priority above, so conditioning volume never competes with recovery capacity for the resistance work driving this plan.',
        exercises: [
          { name: 'Bike Intervals (Easy-Moderate)', sets: '4', reps: '20 sec on/40 off', load: 'easy-moderate', tempo: 'controlled', rest: '40 sec', cue: 'Brisk and sustainable — not a max-effort test.' },
        ],
      },
    ],
    coolDown: 'Doorway chest stretch 20s/side (light, pain-free only), cross-body shoulder stretch 20s/side (light), child\'s pose 45s',
    iconsNote: 'Overhead pressing is being actively reintroduced today, not restricted — this is progressive strengthening within her current pain-free range. Sharp or pinching pain is the stop signal; ordinary fatigue and normal soreness are fine and expected. Scapular strength work is gating her pull-up progression, not a placeholder — hold Assisted Pull-Ups at the tested baseline until the block\'s own criteria are consistently met. The closing suitcase carry puts today\'s scapular and postural work to use under load — right hand holds the weight, every yard tall and level.',
  },
  {
    intensity: 70,
    title: 'DAY 2 — LOWER BODY: UNILATERAL FOUNDATION, LEFT-LED',
    subtitle: 'Squat · Single-Leg Stance Squat · Single-Leg RDL — Left Leg Leads',
    descriptor: 'MODERATE VOLUME DAY · LEFT-LEG ASYMMETRY PROTOCOL · MUSCLE-BUILDING PRIORITY',
    intensityLabel: '70% Day',
    intensityPara: 'Moderate day — build clean volume without peak fatigue. Muscle-building is the primary physiological goal of this session given her ALST At-Risk status: every set here is real progressive resistance, not maintenance. Left leg continues to lead every unilateral exercise per Styku\'s segmental LST reading. Work at 2-3 RIR.',
    warmUp: '5 min bike, banded lateral walk x10/side, glute bridge x10, standing hip abduction x10/side, bodyweight squat x8, hip openers (90/90 or open-book) 8 each side (from the PT-led stick mobility circuit, see Day 1 — included here given the active left-hip rehab).',
    blocks: [
      {
        letter: 'A',
        title: 'HIP & SINGLE-LEG STANCE ACTIVATION',
        color: 'red',
        introLabel: 'Why',
        intro: 'Primes glute medius and hip stabilizers ahead of the loaded single-leg work below — left leg leads throughout given the segmental LST gap. Left hip is in active rehab for overuse tendinitis (coordinated with Jason Bethea) — this activation work is well-tolerated, but every loaded exercise below is pain-monitored: sharp/pinching/catching hip pain is the stop signal, ordinary fatigue is not. Crab Walk and Glute Kickback are PT-led hip-extension and glute-med activation work, directly supporting the hip rehab.',
        exercises: [
          { name: 'Banded Clamshell', sets: '2', reps: '15/side', load: 'mini band', tempo: '2-1-2', rest: '30s', cue: 'Hips stacked, heels together, squeeze glute med at top.' },
          { name: 'Bird Dog', sets: '2', reps: '8/side', load: 'bodyweight', tempo: '2-2-2', rest: '30s', cue: 'Neutral spine, reach long, no hip rotation.' },
          { name: 'Crab Walk (Static Elvis Knee, Internal Rotation)', sets: '2', reps: '10/side', load: 'mini band, above knees', tempo: 'controlled', rest: '30s', flag: 'Left hip — active tendinitis rehab; documented static variant, not the standard walking version', cue: 'Static Elvis-knee, internal-rotation hold rather than the standard walking crab walk — glute med activation without added hip-loading distance.' },
          { name: 'Glute Kickback (Total Gym/Banded)', sets: '2', reps: '10/side', load: 'Total Gym Level 10 (≈50 lbs)', tempo: '2-1-2', rest: '30s', cue: 'Working load Total Gym Level 10 (≈50 lbs). Hip extension, squeeze glute at end range, avoid lumbar extension/compensation.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — SQUAT',
        introLabel: 'Load Target',
        intro: `Tested at 25 lbs x5 (Epley 1RM ≈${oneRM.squat} lbs) — Week 1 trains at ${wk1.squat} lbs, climbing to ${wk4.squat} lbs by Week 4. If the day calls for a variation — equipment, or how the hip is presenting — rotate between: a goblet squat (DB held at the chest, the easiest to keep upright), a box squat (depth set by the box — a genuinely useful choice on a day the hip is more vocal), or a supported split-stance squat (left leg leads). Every option carries the same hip rule as the squat itself — sharp or pinching pain stops the set, ordinary fatigue does not — and the squat above stays the lift we track and retest.`,
        exercises: [
          { name: 'Squat', sets: '3', reps: '6-8', load: `Wk1: ${wk1.squat} lbs → Wk4: ${wk4.squat} lbs`, tempo: '3-1-1', rest: '90s', flag: 'Left hip — active tendinitis rehab; stop at sharp/pinching pain, not fatigue', cue: 'Elbows tracking, chest tall, full comfortable depth.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — SINGLE-LEG STANCE SQUAT (LEFT-LED)',
        introLabel: 'Load Target',
        intro: `The unilateral accessory directly behind today's squat — same knee-dominant pattern, worked one leg at a time with the left leading. Tested at 12 lbs x5 (Epley 1RM ≈${oneRM.slStanceSquat} lbs) — Week 1 trains at ${wk1.slStanceSquat} lbs, climbing to ${wk4.slStanceSquat} lbs by Week 4. Held at 2 reps in reserve — the left-hip rehab governs how hard this is pushed, not a hypertrophy default.`,
        exercises: [
          { name: 'Single-Leg Stance Squat (Left-Led)', sets: '3', reps: '6/side', load: `Wk1: ${wk1.slStanceSquat} lbs → Wk4: ${wk4.slStanceSquat} lbs`, tempo: '3-1-1', rest: '75s', flag: 'Left leg weaker (Styku) — leads every set; left hip in active tendinitis rehab, stop at sharp/pinching pain', cue: 'Left leg first. Slow controlled descent, knee tracks mid-foot.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'PT-LED POSTURAL PULL — FLOOR ROW ON FOAM ROLLER',
        color: 'red',
        introLabel: 'Why',
        intro: 'Carried into this session from her PT-led work with Jason Bethea, Brace Life\'s in-house Trainer/Physical Therapist — an unstable-surface, core-integrated pulling accessory supporting the documented left-shoulder postural work. It gives this lower-body day its one upper-back touch, and deliberately rotates the movement pattern between the squat work above and the hinge work below.',
        exercises: [
          { name: 'Floor Row on Foam Roller', sets: '2', reps: '10-12', load: 'light band or DB', tempo: '2-1-2', rest: '30s', cue: 'Row variant performed lying prone over a foam roller — unstable-surface, core-integrated pulling accessory. Pull to hip, squeeze shoulder blade, no compensatory shrug.' },
        ],
      },
      {
        letter: 'E',
        title: 'SECONDARY COMPOUND — SINGLE-LEG RDL (LEFT-LED)',
        introLabel: 'Load Target',
        intro: `The day's second compound pattern — a hip hinge, rotating off the knee-dominant squat work above. Tested at 25 lbs x5 (Epley 1RM ≈${oneRM.slRDL} lbs) — Week 1 trains at ${wk1.slRDL} lbs/side, climbing to ${wk4.slRDL} lbs/side by Week 4. Left leg leads every set. If the day calls for a variation, rotate between: a B-stance RDL (rear foot down for balance — halfway between single-leg and two-leg, left leg still does the working share), a hip hinge to a bench or target (shortened range — useful when the hip wants a smaller day), or a band pull-through. Same hip rule on every option — sharp or pinching pain stops the set — and the single-leg RDL stays the lift we track and retest.`,
        exercises: [
          { name: 'Single-Leg RDL (Left-Led)', sets: '3', reps: '6/side', load: `Wk1: ${wk1.slRDL} lbs → Wk4: ${wk4.slRDL} lbs`, tempo: '3-1-1', rest: '75s', flag: 'Left leg weaker (Styku) — leads every set; left hip in active tendinitis rehab, stop at sharp/pinching pain', cue: 'Left leg first. Hinge, flat back, soft knee.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'F',
        title: 'FULL-BODY INTEGRATION — HINGE-TO-CARRY COMPLEX',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closing compound complex — a light hip hinge flowing straight into a loaded walk, integrating today\'s squat and hinge patterns into upright, braced gait. Loads stay deliberately light: this closes the session with quality movement, not more heavy hip-extension volume on a day that already carries plenty of it, out of respect for the left-hip rehab. Distance and movement quality govern this work, not an RIR target. If a variation suits the day better, a goblet-squat-to-carry or a deadlift-to-suitcase-carry (right hand holds the load) closes the session the same way — always at the same deliberately light loads, same hip rule throughout.',
        exercises: [
          { name: 'Hinge-to-Carry Complex (DB Deadlift → Farmers Carry)', sets: '2', reps: '5 + 20-30 yd', load: '15-20 lbs/hand', tempo: 'controlled', rest: '75s', flag: 'Left hip — active tendinitis rehab; stop at sharp/pinching pain, not fatigue', cue: 'Hinge to pick the DBs up clean, walk tall, hinge to set down.', rirNote: 'Distance & quality governed — no RIR target' },
        ],
      },
      {
        letter: 'G',
        title: 'METABOLIC FINISHER',
        color: 'gold',
        introLabel: 'Why',
        intro: 'Short, low-impact finisher — kept brief so it never competes with recovery capacity for the resistance-priority work above, given the ALST At-Risk/Underweight programming priority.',
        exercises: [
          { name: 'Standing March w/ Band', sets: '3', reps: '10/side', load: 'light band', tempo: 'controlled', rest: '30s', cue: 'Knee to hip height, stand tall, no lean.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, seated figure-4 hip stretch 30s/side, child\'s pose 45s',
    iconsNote: 'Left leg leads every unilateral set this session — Styku shows a 0.8 lb segmental gap (12.7 vs 13.5 lbs). Track the gap at the 8-week rescan. Muscle-building remains the session\'s primary goal given ALST At-Risk status — no set here is filler. Left hip is in active tendinitis rehab (coordinated with Jason Bethea) — every loaded lower-body set today is pain-monitored, including the closing hinge-to-carry complex; sharp or pinching hip pain stops the set, ordinary fatigue does not. The complex stays light on purpose — it is quality movement under load, not extra hip-extension volume.',
  },
  {
    intensity: 80,
    title: 'DAY 3 — POSTERIOR CHAIN & FULL-BODY STRENGTH',
    subtitle: 'Hex Bar Deadlift · Hip Thrust · Loaded Carries — Right-Arm & Left-Leg Asymmetry Protocol',
    descriptor: 'PRIMARY STRENGTH DAY · TESTED BASELINES · MUSCLE-BUILDING PRIORITY',
    intensityLabel: '80% Day',
    intensityPara: 'Primary strength day, built on her strongest tested numbers (Hex Bar Deadlift 85 lbs x5, Epley 1RM ≈99 lbs). Last 1-2 reps hard but achievable — muscle-building is the primary physiological goal given ALST At-Risk status. Left leg leads unilateral leg work, right arm leads the suitcase carry. Shoulder work stays pain-free per Day 1\'s protocol.',
    warmUp: '5 min bike, banded lateral walk x10/side, glute bridge x10, arm circles x10/direction (pain-free range only)',
    blocks: [
      {
        letter: 'A',
        title: 'HIP ACTIVATION CARRYOVER',
        color: 'red',
        introLabel: 'Why',
        intro: 'Same hip-activation priority carried forward from Day 2, condensed here to prime glute medius and hip external rotators before the heavy hinge work below. Left hip remains in active tendinitis rehab (coordinated with Jason Bethea) — every loaded exercise in this session is pain-monitored: sharp/pinching/catching hip pain is the stop signal, ordinary fatigue is not. Glute Kickback carries forward from Day 2 — real PT-led hip-extension activation directly priming today\'s Hex Bar Deadlift and Hip Thrust work.',
        exercises: [
          { name: 'Banded Clamshell', sets: '2', reps: '12/side', load: 'mini band', tempo: '2-1-2', rest: '30s', cue: 'Heels together, squeeze glute med at top.' },
          { name: 'Standing Banded Hip Abduction', sets: '2', reps: '10/side', load: 'band', tempo: '2-0-1', rest: '30s', cue: 'Tall posture, drive knee out, no torso lean.' },
          { name: 'Glute Kickback (Total Gym/Banded)', sets: '2', reps: '10/side', load: 'Total Gym Level 10 (≈50 lbs)', tempo: '2-1-2', rest: '30s', cue: 'Carried forward from Day 2 at the same working load. Hip extension, squeeze glute at end range, avoid lumbar extension/compensation, directly priming the Hex Bar Deadlift/Hip Thrust hip-extension pattern below.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY STRENGTH — HEX BAR DEADLIFT',
        introLabel: 'Load Target',
        intro: `Her strongest tested lift. Tested at 85 lbs x5 (Epley 1RM ≈${oneRM.hexDL} lbs) — Week 1 trains at ${wk1.hexDL} lbs, climbing to ${wk4.hexDL} lbs by Week 4. If the day calls for a variation, rotate between: a conventional DB deadlift, a block or elevated pull (bar or DBs raised — a shorter range that genuinely earns its place on a day the hip is more vocal), or a sumo-stance DB deadlift (wider base, more upright torso). Same hip rule on every option — sharp or pinching pain stops the set — and the hex bar lift stays the anchor: its Week 1 → Week 4 line is what gets tracked and retested.`,
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '5', load: `Wk1: ${wk1.hexDL} lbs → Wk4: ${wk4.hexDL} lbs`, tempo: '2-0-1', rest: '2 min', flag: 'Left hip — active tendinitis rehab; stop at sharp/pinching pain, not fatigue', cue: 'Neutral spine, brace hard, push floor away evenly.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — DB HIP THRUST (GLUTE BUILD)',
        introLabel: 'Load Target',
        intro: `The glute-building accessory directly behind the deadlift — same posterior chain, isolated harder at the hip. Tested at 35 lbs x5 (Epley 1RM ≈${oneRM.hipThrust} lbs) — Week 1 trains at ${wk1.hipThrust} lbs, climbing to ${wk4.hipThrust} lbs by Week 4. Held at 2 reps in reserve — the left-hip rehab governs how hard this is pushed, not a hypertrophy default. If the day calls for a variation, rotate between: a floor glute bridge (the simplest regression), a single-leg glute bridge (left leg leads), or a B-stance hip thrust (left leg takes the working share). Same hip monitoring on every option, and the DB hip thrust stays the lift we track and retest.`,
        exercises: [
          { name: 'DB Hip Thrust', sets: '3', reps: '8', load: `Wk1: ${wk1.hipThrust} lbs → Wk4: ${wk4.hipThrust} lbs`, tempo: '2-1-2', rest: '90s', flag: 'Left hip — active tendinitis rehab; stop at sharp/pinching pain, not fatigue', cue: 'Drive through heels, glutes lock at top.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'D',
        title: 'PT-LED SHOULDER PREP — I\'S-T\'S-W\'S (PRONE, MODIFIED)',
        color: 'red',
        introLabel: 'Why',
        intro: 'Carried into this session from her PT-led work with Jason Bethea — the same modified shoulder activation used in Day 1\'s corrective block, positioned here to prime the left shoulder immediately before the pressing check-in below. Control precedes power on this day too.',
        exercises: [
          { name: "I's-T's-W's (Prone, Modified)", sets: '2', reps: '8/side (one arm)', load: '5 lb DB', tempo: 'controlled', rest: '30s', flag: 'Left shoulder — reduced ROM on the W/Y sweep portion, per documented session modification', cue: 'Performed one arm at a time in a hinge stance (documented modification from the standard bilateral-prone version). Reduced range on the W/Y sweep — pain-free range only.' },
        ],
      },
      {
        letter: 'E',
        title: 'SECONDARY COMPOUND — SHOULDER & PULL CHECK-IN',
        color: 'red',
        introLabel: 'Why',
        intro: 'The day\'s second compound pattern — pressing and pulling, rotating off the hip-dominant work above. A brief continued check-in, not a full repeat of Day 1\'s corrective block — confirms the reintroduction is progressing cleanly before the next Day 1 session, and is run here rather than later so the shoulder is checked fresh, not fatigued. Same pain-monitoring rule applies: sharp/pinching pain stops the set, ordinary fatigue does not.',
        exercises: [
          { name: 'Standing DB Overhead Press', sets: '2', reps: '6-8', load: 'continue from Day 1 working load', tempo: '2-0-2', rest: '90s', flag: 'Left shoulder — pain-free range only', cue: 'Same working load as Day 1 unless pain-free range has clearly expanded.', rirNote: '2 RIR' },
          { name: 'Kieser Pulldown', sets: '2', reps: '10-12', load: 'continue from Day 1 Kieser units', tempo: '2-1-2', rest: '75s', cue: 'Full controlled range, chest tall, no momentum.', rirNote: '2 RIR' },
        ],
      },
      {
        letter: 'F',
        title: 'FULL-BODY INTEGRATION — LOADED CARRIES (ASYMMETRY PROTOCOL)',
        color: 'gold',
        introLabel: 'Load Target',
        intro: 'The session\'s closing compound work begins here — the carries pull the day\'s hinge and hip-extension strength into upright, braced gait. Farmers Carry tested bilaterally at 25 lbs/hand. Suitcase Carry adds the Asymmetry Protocol\'s single-hand rule directly — the weaker (right) hand holds the load, training anti-lateral-flexion through the opposite side. Distance and movement quality govern the carries, not an RIR target. A front-rack carry (DBs held at the chest) is a third option here — it trades grip demand for an upright-posture bias; same distance-and-quality rules, and any one-sided carry stays in the right hand.',
        exercises: [
          { name: 'DB Farmers Carry', sets: '3', reps: '30-40 yd', load: '25 lbs/hand', tempo: 'controlled', rest: '60s', cue: 'Tall posture, ribs down, quick tight steps.', rirNote: 'Distance & quality governed — no RIR target' },
          { name: 'Suitcase Carry (Right-Led)', sets: '2', reps: '20-30 yd/side', load: '15-20 lbs', tempo: 'controlled', rest: '45s', flag: 'Right hand holds the weight — weaker arm (Styku)', cue: 'Right hand loaded. Resist leaning — ribs stacked over hips.' },
        ],
      },
      {
        letter: 'G',
        title: 'FULL-BODY INTEGRATION — CORE UNDER LOAD (PLANK PROTOCOL)',
        color: 'green',
        introLabel: 'Load Target',
        intro: 'Core work as part of the session\'s integrated close — progression from the tested 1:04 plank baseline, paired with anti-rotation work supporting posture under all the compound lifts above.',
        exercises: [
          { name: 'Plank Hold', sets: '3', reps: '45-60s', load: 'bodyweight', tempo: 'hold', rest: '45s', cue: 'Baseline 1:04. Ribs down, glutes tight, breathe steady.' },
          { name: 'Half-Kneeling Pallof Press', sets: '2', reps: '10/side', load: 'light band', tempo: '2s hold', rest: '30s', cue: 'Resist rotation, ribs stacked over hips.' },
        ],
      },
      {
        letter: 'H',
        title: 'FULL-BODY INTEGRATION — POWER EXPRESSION (55-65 BRACKET)',
        introLabel: 'Why',
        intro: 'The final piece of the session\'s integrated close: a power expression of the day\'s lower-body work. Muscle power — moving a sub-maximal load with maximal intent — predicts functional independence and longevity in older women more strongly than strength alone, and belongs in the 55-65 bracket already, not just 65+. This is deliberately a lower-body movement, not overhead, given the shoulder reintroduction still underway in Blocks D and E. Full recovery between sets is the point — this is a velocity stimulus, not a conditioning one, so it does not compete with Block I\'s deliberately brief finisher below.',
        exercises: [
          { name: 'Box Step-Up Jump (Submaximal, Full Recovery)', sets: '3', reps: '3', load: 'bodyweight, low box (~10-12")', tempo: 'explosive up, soft controlled landing', rest: '120s', flag: 'Left hip — active tendinitis rehab; stop at sharp/pinching pain, not fatigue', cue: 'Drive up with real intent, land soft and controlled. Full recovery — not a metabolic set.', insight: 'On a day the hip is more vocal, run the same box as a brisk step-up without the jump — same drive-with-intent cue, none of the landing impact. The intent is the exercise; the jump is optional.' },
        ],
      },
      {
        letter: 'I',
        title: 'METABOLIC FINISHER',
        introLabel: 'Why',
        intro: 'Closing conditioning, kept low-impact and brief given the volume of the day and the ALST At-Risk/Underweight recovery priority.',
        exercises: [
          { name: 'Incline Treadmill Walk (Brisk)', sets: '1', reps: '6-8 min', load: 'brisk, sustainable pace', tempo: 'steady', rest: '—', cue: 'Energy becomes identity — hold posture through the finish.' },
        ],
      },
    ],
    coolDown: 'Couch stretch 30s/side, seated figure-4 hip stretch 30s/side, doorway chest stretch 20s/side (light), child\'s pose 45s',
    iconsNote: 'Left leg leads every unilateral leg set, right hand leads the suitcase carry — both per Styku\'s 0.8 lb segmental gaps. Shoulder and pull work continue their pain-free progression from Day 1; sharp or pinching pain is still the stop signal, ordinary fatigue is not. Muscle-building stays the top priority — every block here is real progressive resistance. Left hip remains in active tendinitis rehab (coordinated with Jason Bethea) — the Hex Bar Deadlift, DB Hip Thrust, and Box Step-Up Jump above are the day\'s heaviest hip-loading content and are pain-monitored the same way: sharp/pinching/catching hip pain stops the set.',
  },
];

const summary = {
  subtitle: 'Siobhan Hansen  ·  ICONS Index  ·  3-Day Sarcopenia-Priority Strength Build  ·  Week 1',
  rows: [
    ['Day 1', '60%', 'Upper Body — Shoulder Reintroduction & Scapular Foundation', 'Overhead Press · Kieser Pulldown · Single-Arm Row · Suitcase Carry', 'Overhead press progresses only via pain-free ROM + RIR; scapular criteria (band pull-apart 3x15, 20s dead hang) gate pull-up loading; closing suitcase carry right-led, quality-governed.'],
    ['Day 2', '70%', 'Lower Body — Left-Led Unilateral Foundation', 'Squat · Single-Leg Stance Squat · Single-Leg RDL · Hinge-to-Carry', `Loads build off tested baselines (Squat Epley 1RM ≈${oneRM.squat} lbs); left leg leads every unilateral set per 0.8 lb Styku gap; closing complex stays light, quality-governed.`],
    ['Day 3', '80%', 'Posterior Chain — Full-Body Strength', 'Hex Bar Deadlift · Hip Thrust · Farmers/Suitcase Carry', `Loads build off tested baselines (Deadlift Epley 1RM ≈${oneRM.hexDL} lbs); right hand leads suitcase carry, left leg leads unilateral work.`],
  ],
  milestones4wk: `Hex Bar Deadlift toward ${wk4.hexDL + 10} lbs x5, Squat toward ${wk4.squat + 5} lbs x6-8, Hip Thrust toward ${wk4.hipThrust + 5} lbs x8, all at 2-3 RIR. Overhead Press showing genuine week-over-week pain-free ROM expansion (not a fixed load target). Scapular block criteria (band pull-apart 3x15, 20s controlled dead hang) consistently clean — first checkpoint toward reduced pull-up assistance. Left-leg single-leg RDL/stance-squat loads matched toward parity with the right within 10%. Week 4 closes with the strength check; Week 5 that follows is the planned deload week — same exercises, reduced sets, loads held (see the deload note above) — before Weeks 6-8 rebuild.`,
  milestones8wk: 'Hex Bar Deadlift, Squat, and Hip Thrust progressed from current tested baselines — through the Week 4 check, the planned Week 5 deload (loads held, sets reduced), and the Weeks 6-8 rebuild toward the retest. Overhead Press fully pain-free through an expanded range, no sharp/pinching flags logged. Assisted Pull-Ups showing real reduced-assistance progression, gated release confirmed by scapular criteria being met. Plank hold past 1:30. Left/right leg and right/left arm LST gaps reduced from 0.8 lbs.',
  rescanNote: `Rebook Styku scan at 8 weeks — it lands at the end of the Weeks 6-8 rebuild that follows the planned Week 5 deload, so the scan reads a fully rebuilt, consolidated block rather than a mid-deload dip. Track: ALST Index trend (currently ${styku.alstIndex} kg/m², At-Risk — the top clinical priority), BMI trend (currently ${styku.bmi}, Underweight — read alongside the energy-surplus note above: the goal is lean-mass-driven weight gain, not weight loss), VFA (currently ${styku.vfa} cm², tracked as a trend indicator rather than a fixed risk band), left/right leg and right/left arm LST gaps (baseline 0.8 lbs each on both sides — right arm ~11% relative, left leg ~6% relative to the larger side; watch both directionally), lean mass (currently ${styku.leanMass} lbs — build), and continued shoulder/scapular progress.`,
};

const data = {
  client,
  styku,
  baselines,
  baselineNotes,
  weekOverview,
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', '..', 'clients', 'siobhan_hansen');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Siobhan_Hansen_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — no clientHighlight set: this is a
  // first-build program with no prior version/PR on file to compare
  // against, so per CLAUDE.md's Client View spec, nothing is fabricated.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Siobhan_Hansen_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
