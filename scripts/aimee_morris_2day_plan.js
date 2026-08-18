/**
 * Aimee Morris — ICONS 2-Day Full Gym Training Plan
 * Brace Life Studios
 *
 * Originally rebuilt from the client's existing document (Aimee 2-Day Full
 * Gym Training Plan .docx) to match the confirmed engine standard (Kelly
 * Mulroy reference — see CLAUDE.md's "Visual language" note).
 *
 * Updated 8/10/2026 from a SOAP note by a second provider ("Stress Bar
 * Clinical, CSCS, LMT", dated 7/31/2026, sourced from Drive folder
 * "ICONS NOTES JASON PDFS"), confirmed by the trainer:
 *   - Full name and DOB now known (Aimee Morris, DOB 1977-11-30 → age 48
 *     as of Aug 2026) — client.ageYears is now set. weightKg is still not
 *     given anywhere, so includeNutritionBlock stays false (no weight →
 *     no defensible protein target); isPostmenopausal also still unset
 *     (not stated anywhere) — neither is fabricated just because age is
 *     now known.
 *   - Her spinal stenosis restriction is CLEARED as of this update (trainer
 *     confirmed) — but per the trainer's explicit "moderate progression"
 *     instruction, previously-restricted movements are being reintroduced
 *     gradually, not all at once. Landmine squat, sit-up/bicycle crunch
 *     (moderate volume), and kettlebell swing are added now; barbell back
 *     squat, conventional barbell deadlift, and clean-to-overhead-press
 *     (the most axially-loaded/ballistic movements) are deliberately
 *     deferred to a later phase pending a few clean weeks on the
 *     reintroduced work — see baselineNotes for the exact reasoning.
 *
 * Updated 8/13/2026 (retroactive audit against CLAUDE.md's "ICONS Index
 * Full-Spectrum Progression Standard — Women 40-55"): the audit found a
 * circular-coverage gap, not a missing-pattern gap — DB Split Squat was
 * being counted as the substitute for BOTH Back Squat AND Lunges, and no
 * exercise in the document was actually shaped like a lunge (the only
 * "lunge" string anywhere was a cooldown hip-flexor stretch, not a trained
 * exercise). Barbell Back Squat's 'Tested — Deferred' status and its
 * surrounding clinical framing are untouched by this fix — the squat
 * pattern itself was already legitimately covered via Landmine Squat/
 * Goblet Squat/DB Split Squat and stays exactly as documented. The only
 * change: a genuine Reverse Lunge exercise was added to Day B, Block A, so
 * Lunges coverage no longer depends on the same exercise already covering
 * Back Squat. Reverse Lunge (not walking or curtsy lunge) was chosen as
 * the more established, lower-technical-demand starting point given her
 * documented stenosis history and moderate-progression pattern, even
 * though it is a brand-new addition, not a SOAP-note reintroduction.
 * Inserted between Face Pull and Step-Up (was 3rd/4th, now 3rd/4th/5th) so
 * the block still never stacks 3 consecutive squat/lunge-pattern
 * exercises (Split Squat + Landmine Squat = 2, Face Pull breaks it, then
 * Reverse Lunge + Step-Up = 2) — Antagonist Rotation Rule compliant.
 *
 * Day A ("Hinge + Push + Core") and Day B ("Squat + Pull + Conditioning")
 * are not naturally 60/70/80/90/AR intensity days — this is a 2-day/week,
 * 4-week-progression program, not a %-graded weekly split. Day A is
 * rendered with intensity: 'AR' and Day B with intensity: 70 purely to
 * reproduce the source's exact day-badge ACCENT COLORS via the engine's
 * ivOf()/INTENSITY map (Day A → blue EAF4FB/1565C0, Day B → green
 * E8F5E9/43A047 — confirmed against the source table shading). The badge
 * TEXT is overridden per day via dayHeader()'s badgeOverride param (now
 * day.badge in the schema) to 'A'/'DAY' and 'B'/'DAY' instead of the
 * borrowed "ACTIVE RECOV."/"70%" labels, which don't describe either day
 * (Day A is a heavy hinge/press strength day, not recovery) — matching the
 * source, whose own Day A/B badge cells are blank color swatches with no
 * text at all. day.intensityLabel is also set to a day-specific phrase
 * ("Day A's Purpose" / "Day B's Purpose") for the same reason.
 *
 * Updated 8/18/2026, from a new real SOAP note (SOAP_AimeeMorris_2026-08-10.pdf,
 * Jason Bethea, distinct from the 7/31/2026 template-source note above -- the
 * full prior record, this header comment and CLIENTS.md's entry, was read in
 * full before touching anything, per the standing rule). Two durable
 * additions:
 *   1. Single-Leg Reverse Hyper -- a new corrective/assessment movement
 *      introduced specifically to assess pelvic control and hip-extension
 *      quality. Added as a 4th exercise to Day A, Block A ("Hip Hinge
 *      Corrective") -- the most natural home given the block already exists
 *      to build/assess hip hinge and pelvic control quality before loaded
 *      hinge work, and directly ties to the standing "Hip Hinge Pattern --
 *      Underdeveloped" watch flag. Bodyweight/bench-supported, low reps,
 *      quality over load, consistent with every other newly-introduced
 *      movement in this program. Block A is a corrective/activation block,
 *      not a Compound-zone block, so the Antagonist Rotation Rule doesn't
 *      bind its sequencing the same way -- added at the end of the existing
 *      3-drill sequence.
 *   2. Hex Bar Deadlift progression target, 95 lbs -> 135 lbs over 6-8
 *      weeks, now explicitly documented by her PT. Checked the existing
 *      load field first (Block B: 'Wk1: 95 lbs -> Wk4: 120 lbs') -- it is
 *      NOT flat/vague, and its trajectory (+25 lbs over 4 weeks) is
 *      compatible with, not contradicted by, the longer 6-8 week PT target
 *      (135 lbs is a realistic continuation of the same ~5-7.5 lbs/week
 *      pace two-to-four weeks further out). So the Wk1->Wk4 numbers
 *      themselves are left untouched; the new, more precise long-arc target
 *      is added additively (baselines table target column, Block B intro,
 *      and summary.milestones8wk, which previously stated only an
 *      approximate "130+ lbs").
 * A DOMS-driven single-session substitution noted in the same SOAP note
 * (SL Deadlift -> walking reach) was a one-off accommodation for that
 * session only, not a standing program change -- deliberately not added.
 *
 * Updated 8/18/2026, second pass, same day (full-detail enhancement pass,
 * Xolokan's direct request -- mine the FULL raw session content of the
 * same 8/10/2026 SOAP note for durable Isolated-zone/accessory/activation
 * value, not just the one or two headline findings already added above).
 * Full prior record (this header and CLIENTS.md's entry) re-read in full
 * first, per the standing rule. Five additions, all real documented
 * session content, none invented beyond a direct carry-over of a stated
 * value:
 *   1. Stick mobility drill warm-up (shoulder passovers, overhead squat
 *      with stick, hip openers) -- her actual PT session opener. Added to
 *      Day A's warm-up, which already runs hip-hinge rehearsal and now
 *      also carries direct overhead-pressing content (DB Overhead Press,
 *      Incline DB Press) in Block C -- the shoulder-passover/overhead-
 *      squat-with-stick components are a genuine value-add there, not
 *      redundant with the existing hip-hinge-specific drills.
 *   2. Kettlebell Hip-Hinge Hang (20 lb, isometric hold at hinge-bottom,
 *      neutral spine, lats engaged) -- added as a 5th exercise to Day A
 *      Block A ("Hip Hinge Corrective"), the natural home for a hinge-
 *      pattern activation drill given the block already exists to build
 *      hip-hinge quality before loaded work. Deliberately isometric (no
 *      eccentric load), consistent with the block's quality-over-load
 *      ethos. Duration not specified in the note -- described in
 *      breath-count terms (a standard, non-arbitrary isometric cueing
 *      convention) rather than inventing a specific second count.
 *   3. Glute Kickback (Band or Cable, 2-3x12/side) -- confirmed via direct
 *      grep this is NOT already present anywhere in the document (the
 *      existing "Keiser/DB Kickback" line in Day B Block C is a TRICEP
 *      kickback -- elbow extension -- not a glute/hip-extension movement,
 *      a different exercise entirely despite the similar name). Added as
 *      a 6th exercise to Day A Block A, reinforcing the same hip-extension
 *      quality the new Single-Leg Reverse Hyper already assesses.
 *   4. Standing Hip-Hinge Back Fly (light DBs, 2x10-12, rear delt/upper
 *      back) and Around-the-World Lateral Raise (3-5 lb, full ROM shoulder
 *      abduction) -- real postural/shoulder activation used the same
 *      session. Added to Day A's warm-up alongside the stick mobility
 *      routine rather than into Block C's compound press work -- Day A's
 *      primary press block (OHP, Incline Press) is a Compound-zone block
 *      already carrying a full antagonist-safe sequence (2 presses, hinge
 *      break, lateral raise); stacking 2 more shoulder-isolation moves
 *      there would risk crowding a block that already works, and these
 *      are activation-intent moves (light load, postural/rear-delt
 *      priming ahead of the heavier pressing later in the session) --
 *      textbook Isolated-zone pre-compound content, which is what the
 *      warm-up slot is for.
 *   5. Walking Reach (SL DL simulation) -- NOT added as a program exercise
 *      (the DOMS-driven substitution itself was already correctly
 *      excluded above as a one-off). Documented instead as an available,
 *      named low-fatigue regression option directly on the Single-Leg RDL
 *      exercise (Day A, Block C) via its `insight` field, so a future
 *      high-fatigue day has a stated fallback on file rather than an
 *      improvised one -- same spirit as Nicolette Scott's documented
 *      equipment-capped substitutions.
 * New baselineNote added (marked internal -- cites SOAP-note session
 * detail, same pattern as the existing PT Update note above) documenting
 * items 1-5; the exercises themselves stay fully visible in both the
 * trainer document and Client View regardless of that note's audience.
 *
 * Updated 8/18/2026, third pass, same day. TWO structural fixes, one
 * regeneration. Full prior record (this header, CLIENTS.md) re-read first.
 *
 * FIX 1 -- warm-up content drift, Day A. The second pass above (item 4)
 * put Standing Hip-Hinge Back Fly (2x10-12, light DBs) and Around-the-World
 * Lateral Raise (2x10, 3-5 lb) into Day A's `warmUp` STRING. That was the
 * wrong container and the reasoning given at the time ("activation-intent,
 * textbook Isolated-zone pre-compound content, which is what the warm-up
 * slot is for") conflated INTENT with FORMAT. Both are genuinely loaded,
 * rep-prescribed exercises, and content living in `warmUp` prose gets no
 * sets/load/tempo/rest columns, no `rirNote`, no Wk1->Wk4 progression, no
 * `flag`/`insight` audience filtering, and is invisible to exercise-table
 * audits and to the Full-Spectrum Progression check. Two loaded shoulder
 * exercises that can never be progressed stop being training.
 *   - Both moved into a NEW Day A Block C, "SHOULDER & POSTURAL
 *     ACTIVATION", color 'gold' per CLAUDE.md's callout-color rule for a
 *     generic accessory/activation block. Placed immediately BEFORE the
 *     pressing block (not at the top of the day) because that is what the
 *     original warm-up text said they were for -- priming ahead of the
 *     day's heavier pressing. Day A blocks relettered C->D (Primary Press),
 *     D->E (Loaded Carry + Core), E->F (Cardio Finisher).
 *   - Sets/reps/tempo/rest carried over from what the warm-up text already
 *     specified. Back Fly gets a real progression (Wk1: 5 lbs/hand -> Wk4:
 *     8 lbs/hand) per CLAUDE.md's load-field convention -- the PT note said
 *     only "light DBs", so those numbers are a stated programming decision
 *     anchored to her existing 8-10 lb lateral-raise accessory load, and
 *     that derivation is disclosed on the exercise's `insight` with
 *     insightAudience: 'internal' (it is build rationale, not client
 *     coaching). Around-the-World Lateral Raise deliberately does NOT get a
 *     load progression -- it stays flat at the PT-documented 3-5 lbs and
 *     progresses by range/control, which is a genuine non-progressing
 *     prescription under the same convention, stated explicitly on the
 *     exercise rather than left looking like an oversight.
 *   - Antagonist Rotation Rule checked across the new boundary: Block C is
 *     an Isolated-zone activation block (single-joint, light load), not a
 *     Compound-zone block, so the rule does not bind it the same way; and
 *     the sequence across C->D is rear-delt horizontal pull -> shoulder
 *     abduction -> vertical press, which is three different patterns
 *     regardless. Compliant.
 *   - The genuine unloaded mobility work (PVC/stick shoulder passovers,
 *     overhead squat with stick, hip openers, hip hinge rehearsal, glute
 *     bridge, dead bug, cat-cow, ankle circles) STAYS in `warmUp` -- that is
 *     true mobility prep and belongs exactly where it is.
 *   - Day B's warm-up was checked for the same defect and deliberately left
 *     alone. Its one loaded item, "goblet squat 2x10 light (30 lbs, depth
 *     focus)", is a warm-up ramp of a movement that IS already programmed
 *     and progressed as a real exercise row later the same day (Day B,
 *     Block B, 4x10-12 @ 30-40 lbs). That is legitimate warm-up practice,
 *     not drift -- the distinguishing test is whether the movement exists
 *     anywhere as a tracked, progressed row, and it does.
 *
 * FIX 2 -- zero RIR prescriptions anywhere in the document (grep-verified:
 * 0 occurrences of `rirNote` or "RIR" before this pass), against CLAUDE.md's
 * corrected RIR Model (8/17/2026). Assigned by exercise ROLE, not stamped
 * uniformly:
 *   - 2 RIR on primary lifts: Hex Bar Deadlift, Hip Thrust, DB Flat Bench,
 *     DB Overhead Press, Incline DB Press, Single-Leg RDL, DB Split Squat,
 *     Chest-Supported Row, Goblet Squat. This is the CORRECTED default --
 *     it was 1 RIR before 8/17/2026.
 *   - 2 RIR also on compound accessories (DB RDL, Step-Up) and on the
 *     assisted pull-up battery, where it doubles as the assist-setting
 *     instruction ("set the assist so the last rep is clean with ~2 left").
 *     The wide-grip row's existing rep floor explicitly overrides it.
 *   - 1 RIR only on genuinely hypertrophy-priority isolation: DB Lateral
 *     Raise, Incline Push-Up volume, Tricep Dip/Kickback.
 *   - Technique/sub-maximal band (deliberately NOT expressed as 3 vs 4 vs 5,
 *     per the corrected model's collapse of everything above 2 RIR) on the
 *     shoulder activation work, Glute Kickback, Face Pull (shoulder health
 *     -- never near failure), and the movements still being established:
 *     Landmine Squat, Reverse Lunge.
 *   - NO RIR target at all, stated in the block intro rather than left
 *     silently absent: the entire Hip Hinge Corrective block (hinge quality
 *     governs, not fatigue), Farmer Carry (distance/posture), Plank (time),
 *     Dead Bug and the reintroduced sit-up/bicycle crunch (control and
 *     symptom response), the Day A cardio finishers, and the Day B
 *     metabolic circuit (clock and movement quality). Matches how Elizabeth
 *     Poyner's document treats its own carries and isometrics.
 *   - Full Push-Up (Floor Attempt) marked "Form-governed, not RIR" -- it is
 *     the one deliberately recorded max-rep set in the program, and its
 *     existing "stop 2 reps before form breaks" rule is the real governor.
 *   - Sled Push marked as ending on drive-speed dropoff rather than an RIR
 *     number, so a trainer does not apply the generic progression rule to
 *     a conditioning/drive-quality effort.
 *   - New client-visible gold baselineNote, "How Hard Each Set Should Feel
 *     -- Reps In Reserve (RIR)", explaining the scale, HER specific tiers,
 *     which work deliberately carries no target and why, and CLAUDE.md's
 *     RIR calibration protocol (call your RIR, take that set to failure,
 *     compare; trust her calls for load decisions once within one rep two
 *     sessions running). That calibration step is specified for every new
 *     client and was missing. Reference implementation: Mary Burfete's note
 *     of the same name.
 * NO loads, sets, reps, tempos, rests, exercise selection, block structure,
 * or clinical framing changed in this pass beyond the two moved exercises
 * and the Day A block relettering they required.
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Aimee Morris',
  programTitle: '2-Day Full Gym Training Plan',
  subtitle: 'Fat Loss · Body Composition · Cardiovascular Health',
  schedule: 'Full Gym · 2 Days/Week',
  stats: ['Age 48', '2 Days / Week', 'Full Gym', 'Fat Loss & Body Comp', 'Cleared — Moderate Progression'],
  ageYears: 48,
};

const baselineNotes = [
  {
    type: 'clear',
    label: 'Spinal Stenosis — Cleared (8/2026), Moderate Progression',
    body: 'Aimee\'s previously confirmed slight spinal stenosis is now cleared. Movements that were restricted are being reintroduced deliberately, not all at once: landmine squat, sit-up/bicycle crunch (moderate volume), and kettlebell swing are added to this update. The most axially-loaded or ballistic movements — barbell back squat, conventional barbell deadlift, and clean-to-overhead-press — are intentionally held for a later phase pending a few clean weeks on the newly-reintroduced work (see "Deferred — Later Phase" below). The hex bar deadlift stays as the primary hinge lift for now; there is no need to rush back to a conventional barbell just because the restriction is lifted.',
  },
  {
    type: 'watch',
    label: 'Hip Hinge Pattern — Underdeveloped',
    body: 'The hip hinge pattern was flagged as underdeveloped at intake. Poor hip hinge = spine compensates under load, which matters even post-clearance while heavier/more dynamic patterns are being reintroduced. Every session begins with hip hinge rehearsal drills before any loaded hinge work. The goal is a reflexive hip hinge so the spine is never the path of least resistance during pulling and deadlift movements.',
  },
  {
    type: 'purple',
    label: 'Pull-Up Priority — Baseline 5 Reps, All Grips',
    body: 'Aimee tested at 5 reps each in neutral, wide, and standard grip — a solid assisted baseline. The program runs pull-up progression systematically, tracking all three grips. Neutral grip leads (most shoulder-friendly), standard and wide grips progress alongside.',
  },
  {
    type: 'gold',
    label: 'How Hard Each Set Should Feel — Reps In Reserve (RIR)',
    body: 'Most working sets in this program now carry an RIR target — the number of clean reps you could still have completed at the moment you racked the weight. 2 RIR is the default on the primary lifts (hex bar deadlift, hip thrust, flat bench press, overhead press, incline press, split squat, goblet squat, chest-supported row): finish each set with two good reps left, not grinding. 1 RIR is used only where the goal is muscle growth rather than peak strength — lateral raises, incline push-up volume, tricep work. Anything marked technique/sub-maximal sits deliberately further from failure than that: the correctives, the shoulder activation, and every movement still being established (landmine squat, reverse lunge, glute kickback). There is no meaningful difference between three, four or five reps in reserve, so do not try to hit a precise number there — just stay clearly short of hard. Some work carries no RIR target at all, on purpose: farmer carries are governed by distance and posture, planks by time, the correctives by hinge quality, and the cardio finishers and metabolic circuit by the clock and by movement quality. Given the stenosis history, training to true failure is not required and is not the goal on any lift in this program. Calibration for the first few weeks: on one sub-maximal set of a new movement, call out the RIR you think you have left, then take that same set to true failure and compare. Once your call is within one rep two sessions running, your own RIR is reliable enough to drive load increases on its own.',
  },
  {
    type: 'gold',
    label: 'Cardiovascular Priority — Built Into Every Session',
    body: 'Cardiovascular health improvement is built into every session via metabolic finishers and conditioning circuits. Day A ends with a Zone 2 or HIIT cardio finisher. Day B ends with a metabolic strength circuit. At 2 days per week, the cardio within each session is the primary cardiovascular training stimulus for fat loss. Rest periods on accessory work are kept short (30–45s) to maintain heart rate.',
  },
  {
    type: 'watch',
    label: 'Deferred to a Later Phase — Barbell Squat, Barbell Deadlift, Clean-to-Press',
    // Client View (8/17/2026 audit fix): trimmed the internal provider/
    // chart-documentation references ("second provider's SOAP note,"
    // "Stress Bar Clinical," "per the trainer") — the deferral itself and
    // its reasoning stay, since that's genuinely useful for Aimee to know.
    body: 'A barbell back squat was tested at 55 lbs (recorded in the baselines table for reference), and a Clean-to-Overhead-Press sequence has also been discussed as a future addition. Per your moderate-progression plan, none of these are programmed yet: barbell back squat, conventional barbell deadlift, and clean-to-overhead-press are all higher axial-load or higher-skill/ballistic than anything currently in the program. DB Split Squat, Goblet Squat, Landmine Squat, and Hex Bar Deadlift remain the primary lower-body/hinge lifts. Revisit adding these once 3–4 weeks of the newly-reintroduced work (landmine squat, sit-ups, KB swing) is clean and symptom-free.',
  },
  {
    type: 'green',
    label: 'Reintroduced This Update — From Stress Bar Clinical SOAP Note (7/31/2026)',
    body: 'Landmine squat (Day B, primary squat block), sit-up and bicycle crunch (Day A, core block — moderate volume, controlled tempo), and kettlebell swing (Day B, metabolic circuit) are folded in from a cross-training session note. Sled push is added as a new Day A cardio-finisher option. Source: Drive folder "ICONS NOTES JASON PDFS."',
    // Client View (added 8/17/2026): names an internal Drive folder/file
    // sourcing detail — documentation-methodology language, not something
    // to send directly to the client. The exercises themselves stay fully
    // visible in the day pages; only this build-provenance note is hidden.
    audience: 'internal',
  },
  {
    type: 'gold',
    label: 'Lunge Pattern Added — 8/13/2026',
    body: 'Reverse Lunge is added to Day B\'s primary squat block as a genuinely distinct lunge-pattern exercise. Previously, DB Split Squat was covering both the squat and lunge movement-pattern territory in this program — a stationary front-foot-elevated split squat and a true stepping reverse lunge train meaningfully differently, so this closes that gap rather than relying on one exercise to stand in for both. No baseline has been tested for this pattern; Week 1 starts at bodyweight for quality reps, consistent with the moderate-progression approach already used for every other newly-introduced movement in this program, and given her spinal stenosis history a reverse lunge (controlled step-back, no forward-stepping deceleration load) is the more conservative starting variant vs. a walking or curtsy lunge.',
    // Client View (added 8/17/2026): this is a programming-gap admission
    // ("Previously... this closes that gap rather than relying on one
    // exercise to stand in for both") — an internal audit/build-fix note,
    // the same category the CLIENT VIEW spec calls out. The Reverse Lunge
    // exercise itself stays fully visible and programmed in Day B.
    audience: 'internal',
  },
  {
    // Client View (8/17/2026 audit fix): originally one note mixing
    // genuinely client-appropriate LIFTMOR/bone-investment content with a
    // trailing internal roster-audit sentence, then marked internal
    // wholesale since the audience filter only operates per-note — which
    // hid useful content a same-bracket sibling (Johanna Castillo) keeps
    // visible. Split into two notes instead: this one stays visible.
    type: 'gold',
    label: 'Age Bracket — Perimenopause / Menopause Transition (45–55)',
    body: 'At 48, Aimee sits in the 45–55 age bracket. LIFTMOR-style bone-loading candidacy screening (T-score < -1.0) is worth introducing as part of ongoing care as estrogen decline accelerates through this window — framed as "bone investment," not added risk, and directly relevant given real heavy Hex Bar Deadlift and Hip Thrust content already in her program. No DEXA/T-score data is currently on file to confirm candidacy either way.',
  },
  {
    // The roster-audit admission trimmed out of the note above — genuinely
    // internal (compares this document's completeness against other
    // clients' documents), kept only for the trainer/build record.
    type: 'watch',
    label: 'Documentation Note — LIFTMOR Screening Added 8/17/2026',
    body: 'Every other 45-55/55-65 bracket client on the roster carries the LIFTMOR screening note above; it was missing from this document and is added now (8/17/2026, roster-wide research-coverage sweep).',
    audience: 'internal',
  },
  {
    type: 'watch',
    label: 'Perimenopausal Status — Not Assessed at Intake',
    body: 'No menstrual irregularity, vasomotor symptoms (hot flashes/night sweats), sleep disruption, or mood-change data was reported at intake, and `isPostmenopausal` is left unset rather than fabricated either direction. Per CLAUDE.md\'s "Perimenopausal Status — Screening Ambiguity in a Non-Clinical Context" guidance, this is the exact bracket/symptom-ambiguity window the guidance is written around — and given real heavy hip-thrust/deadlift content in this program, worth confirming at next intake given how load-bearing that determination is for the pelvic floor protocol. Revisit if symptom data becomes available.',
    // Client View (added 8/17/2026): a screening-gap admission — reads
    // awkwardly coming from the studio directly to the client (per the
    // task brief's own flagging of this exact note as a strong candidate).
    audience: 'internal',
  },
  {
    type: 'green',
    label: 'PT Update — 8/10/2026 Session (Jason Bethea)',
    body: 'New SOAP note (SOAP_AimeeMorris_2026-08-10.pdf, a real session note, distinct from the 7/31/2026 template-source note above) documents two durable additions: (1) Single-Leg Reverse Hyper, introduced as an assessment tool for pelvic control/hip-extension quality — added to Day A, Block A\'s hip hinge corrective work below. (2) An explicit Hex Bar Deadlift progression target of 95 lbs → 135 lbs over 6–8 weeks — this document\'s existing Wk1→Wk4 progression (95→120 lbs) is the compatible near-term step on that same trajectory, not a conflicting number (see the baselines table and Block B intro below for the full target). A DOMS-driven single-session substitution noted in the same session (SL Deadlift → walking reach) was a one-off accommodation for that session only, not carried into the standing program.',
    // Client View: cites internal session-documentation detail (SOAP note
    // filename/date), same category already trimmed/marked internal
    // elsewhere in this file (the "Reintroduced This Update" note above).
    // The Single-Leg Reverse Hyper exercise itself and the Hex Bar Deadlift
    // target both stay fully visible in Block A / Block B / the baselines
    // table / summary.milestones8wk regardless of this note's audience.
    audience: 'internal',
  },
  {
    type: 'green',
    label: 'PT Update — 8/10/2026 Session, Additional Activation & Accessory Detail (Jason Bethea)',
    body: 'The same SOAP note above (SOAP_AimeeMorris_2026-08-10.pdf) documented a fuller PT-led warm-up and activation circuit than the headline additions alone captured. Folded in this update: (1) a full-body PVC-stick mobility routine (shoulder passovers, overhead squat with stick, hip openers) used as her actual session opener, added to Day A\'s warm-up; (2) Kettlebell Hip-Hinge Hang, an isometric hinge-position hold, added to Day A Block A alongside the dynamic hinge drills; (3) Glute Kickback (band or cable), added to Day A Block A — genuinely new, not already covered by the Day B "Keiser/DB Kickback" line, which is a tricep kickback; (4) Standing Hip-Hinge Back Fly and Around-the-World Lateral Raise, real postural/shoulder activation from the same session, now programmed as Day A Block C (Shoulder & Postural Activation) with full sets/load/tempo/rest and RIR — they were originally folded into Day A\'s warm-up prose, which gave two genuinely loaded, rep-prescribed exercises no load columns, no progression, and no visibility to exercise-table audits (restructured 8/18/2026); (5) Walking Reach documented as a named low-fatigue regression option on the Single-Leg RDL exercise (not programmed as a standing swap — a DOMS-driven one-off accommodation, per the note above).',
    // Client View: cites internal session-documentation detail (SOAP note
    // filename/date), same category already marked internal elsewhere in
    // this file (the "Reintroduced This Update" and prior "PT Update"
    // notes). The exercises/warm-up content themselves stay fully visible.
    audience: 'internal',
  },
];

// Client View highlight (added 8/17/2026) — her most significant real,
// documented clinical milestone: the spinal stenosis restriction that
// shaped this entire program was formally cleared this update (see the
// 'clear'-type baselineNote above, which stays visible in both documents).
// Framed here in second person for the "milestone achieved" placement at
// the top of the client copy. Not fabricated — restates the documented
// clearance and the real, already-programmed reintroduction plan.
const clientHighlight = {
  label: 'Spinal Stenosis Restriction — Cleared',
  body: 'Your previously confirmed slight spinal stenosis is now cleared. We\'re reintroducing movements deliberately, not all at once — landmine squat, sit-ups, and kettlebell swing are back in your program this update. Barbell back squat, barbell deadlift, and clean-to-overhead-press will follow once you\'ve built a few clean weeks on this newly reintroduced work. Every choice in this program is built around getting you back to full strength safely.',
};

const days = [
  {
    intensity: 'AR',
    badge: { label: 'A', sub: 'MODERATE' }, // intensity level indicated on the badge itself, not just in intensityPara prose — see the non-%-graded explanation added there 8/17/2026
    title: 'DAY A — Hinge + Push + Core',
    subtitle: 'Deadlift · Press · Carry — Strength Emphasis & Hip Hinge Development',
    descriptor: 'STRENGTH EMPHASIS · HIP HINGE DEVELOPMENT · CARDIOVASCULAR FINISHER · 55–65 MIN',
    intensityLabel: "Day A's Purpose",
    intensityPara: 'Hinge, press, and loaded carry work built around hip hinge development. Hex bar deadlift stays as the primary hinge lift for now, and all pressing is dumbbell-based — moderate progression means new patterns get added deliberately rather than all at once, even with the stenosis restriction cleared. The day closes with a Zone 2 or HIIT cardio finisher — the primary cardiovascular training stimulus in this 2-day/week program. This program does not use the standard ICONS 60/70/80/90 day-intensity framework — with spinal stenosis history and moderate-progression pacing, load advances only as each newly-reintroduced movement proves clean, not on a fixed weekly % schedule; the badge color reflects the day\'s pattern focus, not an intensity percentage.',
    warmUp: '10 min: 5 min stationary bike or treadmill walk (Zone 2 — cardiovascular warm-in). Then hip hinge rehearsal: PVC or broomstick hip hinge drill 2×10 (spine neutral, hinge from hips not back), glute bridge 2×15, dead bug 2×8 each side (spine decompression before loading), cat-cow 10 slow reps, ankle circles 10 each. PT-documented stick mobility circuit (from the 8/10 session): PVC/stick shoulder passovers 2×10 (front-to-back overhead pass, shoulder mobility prep ahead of today\'s pressing work), overhead squat with stick 2×8 (integrated hip/shoulder mobility), hip openers (90/90 or open-book) 8 each side. Shoulder and postural activation is not part of the warm-up — it runs as its own block (Block C) immediately before the pressing work, so it can be loaded and progressed properly.',
    blocks: [
      {
        letter: 'A',
        title: 'HIP HINGE CORRECTIVE (BEFORE EVERY DEADLIFT SET)',
        color: 'red',
        introLabel: 'Hip Hinge Cue',
        intro: 'Hip hinge needs improvement. This means Aimee is currently bending from the lumbar spine rather than hinging from the hip joint. Under load, this puts direct stress on the stenosis. These drills run before every deadlift set until the hinge is reflexive. Hip hinge cue: push the hips BACK toward the wall behind you, not down toward the floor. Kettlebell Hip-Hinge Hang and Glute Kickback are added this update — an isometric hinge-position hold and a targeted hip-extension isolation drill, both reinforcing the same hip-hinge/hip-extension quality this block exists to build. This whole block is quality-governed, not RIR-governed: the drills end when the hinge position degrades, never when the muscle fatigues, so no reps-in-reserve target is set on them.',
        exercises: [
          { name: 'PVC Hip Hinge Drill (Wall Touch)', sets: '2', reps: '10', load: 'Bodyweight / PVC', tempo: '3-2-1', rest: '30s', cue: 'Stand 1 foot from wall. PVC along spine (3 contact points: head, mid-back, tailbone). Hinge hips back to touch wall. If any contact point breaks, the hinge is wrong. This is the single most important corrective in the plan.' },
          { name: 'Kettlebell Deadhinge (Hip Hinge Pattern)', sets: '2', reps: '8', load: '20–25 lbs KB', tempo: '3-1-1', rest: '30s', cue: 'KB between feet. Hinge back to grip, drive hips forward to lockout. Not a squat — if knees track over toes, the pattern is wrong. Groove the hinge before loading the hex bar.' },
          { name: 'Kettlebell Hip-Hinge Hang (Isometric)', sets: '2', reps: '3-5 controlled breaths (hold)', load: '20 lbs KB', tempo: '—', rest: '30s', cue: 'New this update. Hold at the bottom of the hinge position — neutral spine, lats engaged, no eccentric loading. Builds hinge-position control and time-under-tension awareness without adding load stress before the working sets.' },
          { name: 'Single-Leg Hip Hinge (Bodyweight)', sets: '2', reps: '8 ea', load: 'Bodyweight', tempo: '3-1-1', rest: '30s', cue: 'One leg, hinge from the hip, reach toward the floor. Develops hip hinge on each side independently. Left and right equal sets.' },
          { name: 'Single-Leg Reverse Hyper (Bench-Supported, Assessment)', sets: '2', reps: '8 ea', load: 'Bodyweight', tempo: '2-1-2', rest: '30s', cue: 'New PT assessment tool. Hips at bench edge, one leg extends behind on a controlled hip-extension arc, opposite leg braces. Watch for pelvic rotation or lumbar compensation each side; quality over load.', flag: 'PT assessment — pelvic control / hip-extension quality' },
          { name: 'Glute Kickback (Band or Cable)', sets: '2-3', reps: '12/side', load: 'Band or cable — light-mod', tempo: 'Controlled', rest: '30s', cue: 'New this update. Standing or quadruped hip extension, squeeze glute at end range, avoid lumbar extension/compensation. Isolated hip-extension activation reinforcing the hinge and hip thrust patterns above.', rirNote: 'Technique/sub-maximal — activation, well short of failure' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY HINGE STRENGTH',
        introLabel: 'Deadlift Baseline — 105 lbs ×3RM',
        intro: 'Week 1 backs down to 95 lbs ×4×4. The 3RM baseline means technique may be under pressure at higher loads. Given the spinal stenosis, form is the absolute priority over load. Hip hinge corrective runs before every set. Add 5 lbs per week when all sets complete with clean hip hinge mechanics. Hex bar only — no conventional barbell. Hip thrust is new this block — hip-dominant and fully spine-safe, it reinforces the hip hinge pattern without any axial load. Your PT has set an explicit longer-arc target of 95 → 135 lbs over 6–8 weeks — this program\'s Wk1→Wk4 progression (95→120 lbs) is the compatible first step toward that goal.',
        exercises: [
          { name: 'Hex Bar Deadlift', sets: '4', reps: '4–6', load: 'Wk1: 95 lbs → Wk4: 120 lbs', tempo: '2-1-1', rest: '90s', cue: 'Hex bar reduces lumbar shear vs conventional deadlift — appropriate for spinal stenosis. Stand centered. Hinge hips back to grip handles. Drive floor away. Hips and shoulders rise together. Lockout at top. Hip hinge drill before each set.', rirNote: '2 RIR — primary lift' },
          { name: 'Hip Thrust (Barbell or Loaded DB, Bench-Supported)', sets: '4', reps: '5―6', load: 'Wk1: 80 lbs → Wk4: 105 lbs', tempo: '2-1-2', rest: '90s', cue: 'New baseline 95 lbs. Upper back on bench, drive hips to full extension, squeeze glutes hard at top. Hip-dominant — no axial spinal load, one of the safest heavy-loading options for spinal stenosis.', rirNote: '2 RIR — primary lift' },
          { name: 'DB Flat Bench Press', sets: '3', reps: '10', load: 'Wk1: 20 lbs/hand → Wk4: 25 lbs', tempo: '2-1-1', rest: '75s', cue: 'New baseline 20 lbs ×5RM. Fully supine, full back support — one of the safest presses for spinal stenosis. Full range, control the descent, drive up without arching off the bench.', rirNote: '2 RIR — primary lift' },
          { name: 'Romanian Deadlift (DB)', sets: '3', reps: '10', load: '25–30 lbs / hand', tempo: '3-1-1', rest: '60s', cue: 'Hip hinge, soft knee, full hamstring stretch at bottom. DBs track close to legs. Builds hip hinge volume after the hex bar primary work. Keep spine long throughout — no rounding.', rirNote: '2 RIR — compound accessory' },
        ],
      },
      {
        letter: 'C',
        title: 'SHOULDER & POSTURAL ACTIVATION',
        color: 'gold',
        introLabel: 'Why This Runs Before Pressing',
        intro: 'Two light postural/shoulder drills from the 8/10 PT session, primed immediately before the pressing work below. Rear-delt and upper-back activation counteracts the forward-shoulder posture that makes overhead pressing feel tight, and full-range abduction wakes up the shoulder through its whole arc before it has to hold load overhead. Deliberately light and deliberately sub-maximal — the goal is a switched-on shoulder going into Block D, not fatigue. Both movements are tracked with real loads and a progression the same way every other trained exercise in this program is.',
        exercises: [
          { name: 'Standing Hip-Hinge Back Fly (Light DBs)', sets: '2', reps: '10–12', load: 'Wk1: 5 lbs/hand → Wk4: 8 lbs/hand', tempo: '2-1-2', rest: '30s', cue: 'Hinge to a flat-back position, soft knees, arms long. Sweep the DBs out and back, leading with the pinky edge. Squeeze the shoulder blades together — no shrugging, no lumbar extension to help the weight up.', insight: 'Rear delt / upper back, postural anti-hunch. PT note specified only "light DBs" — the Wk1→Wk4 numbers are a programmed progression path set against her existing 8–10 lb lateral-raise accessory load, not a figure carried from the note.', insightAudience: 'internal', rirNote: 'Technique/sub-maximal — activation, well short of failure' },
          { name: 'Around-the-World Lateral Raise', sets: '2', reps: '10', load: '3–5 lbs', tempo: '2-1-2', rest: '30s', cue: 'Full arc from the hips to overhead and back, shoulders pulled down away from the ears the whole way. If the shoulders start to hike or the arc shortens, stop the set — range is the point of this one.', insight: 'Load stays at 3–5 lbs on purpose — this one progresses by range and control, not by weight. Heavier shortens the arc, which removes the reason it is in the program.', rirNote: 'Technique/sub-maximal — range and control, never near failure' },
        ],
      },
      {
        letter: 'D',
        title: 'PRIMARY PRESS STRENGTH',
        introLabel: 'Spinal Stenosis Note',
        intro: 'All pressing is dumbbell-based — no barbell overhead press. Dumbbells allow the spine to remain in a more neutral position and reduce axial load vs a barbell. Seated overhead press is preferred for spinal stenosis (supported lumbar spine). Flat bench press is new this block — fully supine, no axial load. Avoid pressing to absolute failure — brace fails first.',
        exercises: [
          { name: 'DB Overhead Press (Seated)', sets: '4', reps: '10', load: 'Wk1: 15 lbs/hand → Wk4: 20 lbs', tempo: '2-1-1', rest: '75s', cue: 'Updated baseline 17.5 lbs ×5RM. Wk1 starts at 15 lbs for 10 reps. Seated: back supported, spine neutral. Press overhead, arms alongside ears. Core braced throughout. Add 2.5 lbs every 2 weeks.', rirNote: '2 RIR — primary lift' },
          { name: 'Incline DB Press (30–45°)', sets: '4', reps: '10―12', load: 'Wk1: 15 lbs/hand → Wk4: 20 lbs', tempo: '3-1-1', rest: '75s', cue: 'Updated baseline 15 lbs ×8 reps. Primary chest movement. 30–45° incline. Elbows at 45°. Full range, squeeze at top. Safe for spinal stenosis — no axial load.', rirNote: '2 RIR — primary lift' },
          { name: 'Single-Leg RDL (DB)', sets: '3+3', reps: '8―10 ea', load: 'Wk1: 22.5 lbs → Wk4: 30 lbs', tempo: '3-1-1', rest: '75s', cue: 'Updated baseline 25 lbs ×8. Slight knee bend, hinge from hip, feel hamstring load. Return by squeezing glute. Left and right equal. The most effective hip hinge developer in this plan — single-leg removes the compensation that two-leg hinging allows.', rirNote: '2 RIR — balance-limited, stop when the hinge drifts', insight: 'Documented low-fatigue regression option: Walking Reach (a hip-hinge reach pattern without the single-leg balance demand) — available on a high-DOMS/high-fatigue day; not a standing swap, use only as needed.' },
          { name: 'DB Lateral Raise', sets: '3', reps: '12―15', load: '8―10 lbs', tempo: '2-1-2', rest: '30s', cue: 'Lateral delt. Arms slightly bent. Raise to shoulder height. 1-second hold at top. Slow 2-second lower. Short rest maintains heart rate for fat loss.', rirNote: '1 RIR — hypertrophy-priority isolation' },
        ],
      },
      {
        letter: 'E',
        title: 'LOADED CARRY + CORE',
        introLabel: 'Farmer Carry & Core Progression',
        intro: 'Loaded carries build deep spinal stabilizer strength (multifidus, QL) with neutral spine and shoulders packed. Sit-up and bicycle crunch are new this update — previously restricted, now cleared, reintroduced at moderate volume and controlled tempo. Stop and flag any discomfort rather than pushing through. Nothing in this block carries an RIR target: the carry is governed by distance and posture, the plank by time, and the core work by control and symptom response — a carry that ends because the grip failed is a different (and worse) set than one that ends with the spine still stacked.',
        exercises: [
          { name: 'Farmer Carry (DB, Both Hands)', sets: '4', reps: '25–30 yds', load: 'Wk1: 35 lbs/hand → +5 lbs/2wks', tempo: 'Controlled', rest: '90s', cue: 'Baseline 35 lbs/hand. Shoulders packed, chest tall, neutral neck. Add 5 lbs every 2 weeks. Stop if spine begins to laterally flex or shoulder hikes. These are the form cues that matter most.' },
          { name: 'Plank Hold (Elbow)', sets: '2', reps: ':50', load: 'Bodyweight', tempo: '—', rest: '90s', cue: 'Updated baseline :55. Hold at :50 in training — quality over max time. Full brace, neutral spine. Builds to 1:05 in Wk2, 1:15 in Wk4.' },
          { name: 'Dead Bug', sets: '3', reps: '8 ea side', load: 'Bodyweight', tempo: '3-0-3', rest: '45s', cue: 'Lower back pressed firmly into the floor throughout. Slow opposite arm and leg extension. Still one of the best control-focused core exercises in the plan.' },
          { name: 'Sit-Up or Bicycle Crunch (Coach/Client Choice)', sets: '3', reps: '12–15 (sit-up) or 20/10 ea side (bicycle)', load: 'Bodyweight', tempo: 'Controlled', rest: '45s', cue: 'Newly reintroduced — moderate volume, full control, no yanking on the neck. If bicycle crunch: rotate from the torso, not the neck. Reduce volume or drop if any discomfort.' },
        ],
      },
      {
        letter: 'F',
        title: 'CARDIOVASCULAR FINISHER (CHOOSE ONE)',
        introLabel: 'Cardio Protocol — Choose One',
        intro: 'At 2 days per week, cardiovascular improvement depends heavily on the quality of conditioning work done within each session. Every Day A ends with one of these finishers. They are not optional. This is the primary fat loss and cardiovascular adaptation mechanism in the program. None of these carry an RIR target — they are governed by heart rate, time, and drive quality, not by reps left in reserve. On the sled specifically: end a round when drive speed drops off sharply, rather than grinding out the distance.',
        exercises: [
          { name: 'Treadmill — Zone 2 Walk/Jog', sets: '1', reps: '15–20 min', load: '60–65% max HR', tempo: 'Steady', rest: '—', cue: 'Brisk walk or light jog at conversational pace. Full sentences throughout. Builds aerobic base. Best option on high-fatigue days. Minimum cardiovascular dose for fat loss adaptation.' },
          { name: 'Treadmill — Incline Intervals', sets: '8–10', reps: '30s on / 60s easy', load: 'Incline 8–12%', tempo: 'Alternating', rest: '30s', cue: '30 seconds at steep incline (brisk walk), 60 seconds flat easy walk. Elevates HR without running impact. Spine-appropriate — no jarring. Excellent cardiovascular fat-burn tool.' },
          { name: 'Stationary Bike — HIIT', sets: '8', reps: '20s hard / 40s easy', load: 'High resistance', tempo: 'Hard then easy', rest: '40s', cue: 'Cycling is zero spinal impact. 20 seconds maximum effort, 40 seconds easy spin. 8 rounds total. Heart rate should peak at 80–85% then recover partially.' },
          { name: 'Sled Push', sets: '3', reps: '20–30 yd', load: 'Moderate — coach discretion', tempo: 'Aggressive drive', rest: 'Short between rounds', cue: 'New option from cross-training notes. Drive aggressively from the hips, short rest between rounds. Horizontal loading — well tolerated even while other patterns are being reintroduced gradually.' },
        ],
      },
    ],
    coolDown: "Hip flexor lunge 60s each (unloads lumbar after hinge work). Supine knee-to-chest 30s each (gentle lumbar decompression). Pigeon pose 60s each. Hamstring stretch 60s each. Thoracic extension over foam roller 60s.",
    iconsNote: 'As a general precaution — not specific to any current restriction — if Aimee experiences radiating pain down either leg, numbness or tingling in the feet or toes, or a significant increase in lower back pain after a session: pause that movement, note it, and flag it before the next session.',
  },
  {
    intensity: 70,
    badge: { label: 'B', sub: 'MODERATE' },
    title: 'DAY B — Squat + Pull + Conditioning',
    subtitle: 'Split Squat · Row · Pull-Up — Pulling Strength & Pull-Up Progression',
    descriptor: 'PULLING STRENGTH · PULL-UP PROGRESSION · METABOLIC CONDITIONING · 55–65 MIN',
    intensityLabel: "Day B's Purpose",
    intensityPara: 'Squat, pull, and pull-up progression work using DB/KB-only lower-body loading (barbell back squat is still deferred — see baseline notes) and a metabolic conditioning circuit that doubles as the day\'s cardiovascular stimulus. Neutral-grip pull-up leads every session. Same non-%-graded framework as Day A — progression is pattern-by-pattern, not a fixed weekly intensity schedule.',
    warmUp: '10 min: 5 min bike or treadmill walk (Zone 2 cardiovascular warm-in). Then: glute bridge 2×15, hip hinge rehearsal 2×10 (runs every session), goblet squat 2×10 light (30 lbs, depth focus), cat-cow 10, dead hang 20 seconds (shoulder decompression), band pull-aparts or arm circles 2×15.',
    blocks: [
      {
        letter: 'A',
        title: 'PRIMARY SQUAT STRENGTH',
        introLabel: 'Squat Progression Note',
        intro: 'DB split squat and goblet squat remain the primary lower body movements on Day B. Landmine squat is new this update — the angled bar path is more forgiving than a straight barbell back squat, a good bridge exercise while barbell squatting itself is still deferred (see baseline notes). The split squat 3RM baseline (35 lbs/hand) suggests form may be under pressure at max load — Week 1 trains at 25 lbs for 8 reps with full depth focus. Reverse Lunge is new this update — a genuinely distinct lunge-pattern movement from DB Split Squat, started at bodyweight.',
        exercises: [
          { name: 'DB Split Squat (Front Foot Elevated)', sets: '3+3', reps: '8―10 ea', load: 'Wk1: 25 lbs/hand → Wk4: 35 lbs/hand', tempo: '3-1-1', rest: '75s', cue: 'Baseline 35 lbs ×3RM. Start at 25 lbs for 8 quality reps with full depth. Front foot elevated 2–4 inches increases range of motion. Front knee tracks over second toe. Left leg leads first. Add 2.5 lbs every 2 weeks.', rirNote: '2 RIR — primary lift' },
          { name: 'Landmine Squat', sets: '3', reps: '10–12', load: 'Light-Mod — coach discretion', tempo: 'Controlled', rest: '75s', cue: 'New this update. Chest up, drive through heels, full ROM. Angled bar path loads the spine more forgivingly than a straight barbell — bridges toward barbell squatting once that\'s reintroduced.', rirNote: 'Technique/sub-maximal while the pattern is new' },
          { name: 'Face Pull (Cable)', sets: '3', reps: '15―20', load: 'Light-Mod', tempo: '2-1-2', rest: '30s', cue: 'Pull to face, elbows at ear height, external rotation at end range. Rear delt and rotator cuff health. Balances the pressing volume from Day A. Non-negotiable for shoulder health.', rirNote: 'Technique/sub-maximal — shoulder health, never near failure' },
          { name: 'Reverse Lunge (Bodyweight or DB)', sets: '3', reps: '8 ea', load: 'Wk1: Bodyweight → Wk4: 10 lbs/hand', tempo: '3-1-1', rest: '60s', cue: 'New this update — first genuine lunge-pattern movement in the program. Step straight back, lower until rear knee lightly grazes floor, front knee tracks over toes, drive through front heel to return. Controlled step-back (not walking lunge) — lower deceleration demand, appropriate given the stenosis history. Left leg leads first.', rirNote: 'Technique/sub-maximal — new pattern, quality first' },
          { name: 'Step-Up (Unilateral, DB)', sets: '3+3', reps: '8 ea', load: '12.5―17.5 lbs/hand', tempo: '2-1-1', rest: '60s', cue: '18–20 inch box. Drive through front heel, full hip extension at top. Left leg leads. Excellent glute and quad developer.', rirNote: '2 RIR — compound accessory' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY PULL STRENGTH + PULL-UP PROGRESSION',
        introLabel: 'Pull-Up Baseline — 5 Reps Each Grip (Assisted)',
        intro: 'Neutral grip is the safest for spinal stenosis — least internal rotation and least lat tension through the lumbar spine at end range. Neutral grip leads in every session. All three grips trained every session for comprehensive lat and upper back development. Progress: +1 rep per grip every 2 weeks.',
        exercises: [
          { name: 'Assisted Pull-Up — Neutral Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'LEADS every session — safest grip for spinal stenosis. Full hang at bottom. Chin over bar at top. Controlled 3-second descent. Neural grip (palms facing each other). Add 1 rep every 2 weeks.', rirNote: '2 RIR — set the assist so the last rep is clean with ~2 left' },
          { name: 'Assisted Pull-Up — Standard Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '60s', cue: 'Standard overhand grip, shoulder-width. Same quality as neutral grip. 3-second descent. Second grip in the rotation.', rirNote: '2 RIR — same assist standard as neutral grip' },
          { name: 'Assisted Pull-Up — Wide Grip', sets: '3', reps: '5–6 reps', load: 'Assist level set', tempo: '3-1-2', rest: '75s', cue: 'Wide overhand grip. Hardest of the three. Greatest lat stretch at bottom. Full range — do not partial rep. 3-second descent. If reps drop below 4, reduce to 4 and hold there until strength catches up.', rirNote: '2 RIR — same assist standard; rep floor overrides it' },
          { name: 'Chest-Supported DB Row', sets: '4', reps: '10', load: 'Wk1: 22.5 lbs → Wk4: 30 lbs', tempo: '3-1-2', rest: '60s', cue: 'Baseline 25 lbs ×5RM. Chest on incline bench — removes ALL lumbar load. Most spine-safe rowing variation available. Drive elbow to hip. Full stretch at bottom. This is the preferred row for spinal stenosis.', rirNote: '2 RIR — primary lift' },
          { name: 'Goblet Squat (DB or KB)', sets: '4', reps: '10―12', load: '30–40 lbs', tempo: '3-1-1', rest: '75s', cue: 'DB held at chest. Full depth, chest tall. Elbows inside knees at bottom. Knees track out over toes. Progress load every 2 weeks.', rirNote: '2 RIR — primary lift' },
        ],
      },
      {
        letter: 'C',
        title: 'PUSH-UP PROGRESSION',
        color: 'green',
        introLabel: 'Push-Up Baseline — 7 Reps Incline (Hands Elevated)',
        intro: 'Aimee has already progressed past the knee push-up stage to incline push-ups at 7 reps. Week 1 continues building incline volume while beginning the first full floor attempts. Week 3: target 6–8 full push-ups. Week 4: 8–10 full unassisted. Push-ups are safe for spinal stenosis when the core is braced and spine remains neutral.',
        exercises: [
          { name: 'Incline Push-Up (Hands Elevated)', sets: '3', reps: '8―10', load: 'Bodyweight', tempo: '3-0-1', rest: '60s', cue: 'Updated baseline 7 reps. Hands on bench or box. Full chest to bench level. Controlled descent. Progress by lowering the incline height each week. Bridges the gap to floor push-ups.', rirNote: '1 RIR — hypertrophy-priority accessory volume' },
          { name: 'Full Push-Up (Floor Attempt)', sets: '3', reps: 'Max (target 3–5)', load: 'Bodyweight', tempo: '3-0-1', rest: '90s', cue: 'Attempt full push-ups. Stop 2 reps before form breaks. Record reps every set every session. Target: 8–10 full reps by Week 4. Neutral spine throughout — no sag or pike.', rirNote: 'Form-governed, not RIR — this is the one recorded max-rep set; stop 2 reps before form breaks' },
          { name: 'Tricep Dip (Bench) OR Keiser / DB Kickback', sets: '3', reps: '10―12', load: 'Bodyweight (dip) or Light-Mod (kickback)', tempo: '3-0-1', rest: '45s', cue: 'Dip: hands on bench behind body, lower until elbows reach 90°, drive back up. Keiser/DB kickback: hinge forward, elbow fixed at side, extend through full range, squeeze at lockout. Coach/client choice — both build tricep strength for push-up progression.', rirNote: '1 RIR — hypertrophy-priority isolation' },
        ],
      },
      {
        letter: 'D',
        title: 'METABOLIC CONDITIONING CIRCUIT — 3 ROUNDS',
        color: 'gold',
        introLabel: 'Cardio Protocol',
        intro: "Day B's cardiovascular work is a metabolic circuit rather than dedicated cardio. This provides the strength-plus-conditioning stimulus that is most effective for fat loss and body composition at 2 days per week. Kettlebell swing and pull-through are new this update — moderate, hip-hinge-dominant options from the cross-training notes, replacing goblet squat in this slot (client/coach choice over jump squat, which stays deferred for now given moderate-progression pacing). After 3 circuit rounds: 10-minute cardiovascular finisher — choose stationary bike easy spin, treadmill Zone 2 walk, or rowing machine easy pace. Nothing in this circuit carries an RIR target — it is paced by the clock and by movement quality, not by reps left in reserve. End a round of swings or pull-throughs if the hinge mechanics start to degrade, rather than completing the number.",
        exercises: [
          { name: 'Kettlebell Swing OR Cable/Band Pull-Through', sets: '3 rounds', reps: '10–15', load: 'Light-Mod KB or band/cable', tempo: '2-0-1', rest: '15s then next', cue: 'KB swing: hip hinge, snap glutes at top, arms relaxed. Pull-through: hinge back to reach through legs, drive hips forward to stand tall, squeeze glutes at top. Both hip-hinge dominant — coach discretion which to use. Into the next exercise after 15 seconds.' },
          { name: 'DB Row (Both Arms, Bent Over)', sets: '3 rounds', reps: '12', load: '20―25 lbs', tempo: '2-1-2', rest: '15s then next', cue: 'Hip hinge, pull both DBs to ribs. Lighter than Day B primary row. Metabolic pull volume. Into the next exercise.' },
          { name: 'Push-Up (Max or Incline)', sets: '3 rounds', reps: 'Max', load: 'Bodyweight', tempo: '3-0-1', rest: '15s then next', cue: 'Full or incline — whatever allows quality reps. Stop 1 rep before form breaks.' },
          { name: 'Plank Hold', sets: '3 rounds', reps: '45–60s', load: 'Bodyweight', tempo: '—', rest: '90s rest', cue: 'Full brace. Rest 90 seconds after plank then begin next round. 3 full rounds of the complete circuit. Record how many rounds complete with good form each week.' },
        ],
      },
    ],
    coolDown: 'Supine knee-to-chest 30s each. Cat-cow 10 slow reps. Doorway chest stretch 30s each. Lat stretch 30s each. Hip flexor lunge 60s each. Thoracic extension over foam roller 60s.',
    iconsNote: 'As a general precaution — not specific to any current restriction — if Aimee experiences radiating pain down either leg, numbness or tingling in the feet or toes, or a significant increase in lower back pain after a session: pause that movement, note it, and flag it before the next session.',
  },
];

const baselines = [
  ['Hex Deadlift', '105 lbs', '3 RM', 'Wk1: 95 lbs ×4×4 (hip hinge form first) → Wk4: 120 lbs ×4. Spine-safe: hex bar only, no conventional barbell. PT-documented target: 95 → 135 lbs over 6–8 weeks — this 4-week table is the compatible near-term step on that trajectory.'],
  ['Hip Thrust', '95 lbs', '5 RM (est.)', 'New baseline. Wk1: 80 lbs ×6 → Wk4: 105 lbs ×5–6. Hip-dominant, no axial spinal load — ideal for spinal stenosis.'],
  ['Single-Leg RDL', '25 lbs / hand', '8 reps', 'Wk1: 22.5 lbs ×10 → Wk4: 30 lbs ×8. Left and right equal sets. Most important hip hinge developer.'],
  ['DB Split Squat', '35 lbs / hand', '3 RM', 'Wk1: 25 lbs ×8 (form + depth focus at lower load) → Wk4: 35 lbs ×8. 3RM suggests form may break at max — train sub-max.'],
  ['Reverse Lunge', 'Not Tested', 'New — 8/13/2026', 'Wk1: Bodyweight ×8 ea (controlled step-back, form focus) → Wk4: 10 lbs/hand ×8 ea. New exercise added to establish genuine lunge-pattern coverage, distinct from DB Split Squat (a stationary split-squat pattern).'],
  ['Barbell Back Squat', '55 lbs', 'Tested — Deferred', 'Recorded for reference. Stenosis restriction cleared, but per moderate-progression guidance this is deferred to a later phase — Landmine Squat bridges toward it in the meantime (see baseline notes).'],
  ['Overhead Press', '17.5 lbs / hand', '5 RM', 'Wk1: 15 lbs ×10 (sub-max) → Wk4: 20 lbs ×8. Spine-safe: seated or standing, no barbell.'],
  ['Incline DB Press', '15 lbs / hand', '8 reps', 'Wk1: 15 lbs ×10 → Wk4: 20 lbs ×8. Primary chest movement.'],
  ['DB Flat Bench Press', '20 lbs / hand', '5 RM (est.)', 'New baseline. Wk1: 20 lbs ×10 → Wk4: 25 lbs ×8. Supine bench position is fully spine-safe — full back support, no axial load.'],
  ['Dumbbell Row', '25 lbs', '5 RM', 'Wk1: 22.5 lbs ×10 → Wk4: 30 lbs ×8. Chest-supported row preferred (no lumbar load).'],
  ['Farmer Carry', '35 lbs / hand', 'Working', 'Wk1: 35 lbs ×4 sets → +5 lbs/hand every 2 weeks → Wk4: 45 lbs/hand.'],
  ['Push-Up', '7 incline', 'Max', 'Advanced past the knee push-up stage. Wk1: 8–10 incline reps + 3–5 full floor attempts → Wk4: 8–10 full floor push-ups unassisted.'],
  ['Plank (Elbow)', ':55', 'Max', 'Wk1: hold at :50 (controlled) → Wk4 target 1:15. Wk8: 1:30.'],
  ['Assisted Pull-Up (all grips)', '5 reps each', 'Neutral / Wide / Standard', 'Wk1: all 3 grips ×5. Wk2: ×6. Wk4: ×8. Neutral grip leads (most spine-safe).'],
];

// Lightweight 4-week progression summary, grounded only in the numbers
// already established in the baselines table above (no Styku scan exists
// for this client, so no rescan-tracking metrics are fabricated).
const summary = {
  subtitle: 'Aimee Morris  ·  ICONS Index  ·  Fat Loss & Body Composition  ·  2 Days/Week  ·  Full Gym',
  rows: [
    ['Wk 1', '—', 'Day A & B', 'Hex DL 95 lbs ×4×4 / Hip Thrust 80 lbs ×5–6 / Split Squat 25 lbs ×8', 'Establish updated baselines. Hip hinge drill every set. Push-up: 3–5 full floor reps off a 7-rep incline base. Plank: :50. Cardio: 15 min Zone 2.'],
    ['Wk 2', '—', 'Day A & B', 'Hex DL 100 lbs ×4×4 / Hip Thrust 90 lbs ×5–6 / Split Squat 27.5 lbs ×8', 'Pull-up: 6 reps all grips. Push-up: 5–6 full floor reps. Hip hinge should feel more natural. Plank: 1:00.'],
    ['Wk 3', '—', 'Day A & B', 'Hex DL 105 lbs ×4×4 / Hip Thrust 95–100 lbs ×5–6 / Split Squat 30 lbs ×8', 'Hex DL and Hip Thrust back to tested baseline, treated as working weight. Push-up: 6–8 full reps. Plank: 1:10. Cardiovascular endurance noticeably improved.'],
    ['Wk 4', '—', 'Day A & B', 'Hex DL 120 lbs ×4×4 / Hip Thrust 105 lbs ×5–6 / Split Squat 32.5 lbs ×8', 'All updated baseline lifts surpassed. Push-up: 8–10 full unassisted. Plank: 1:15. Hip hinge: clean and reflexive. Reassess pull-up assist level.'],
  ],
  milestones4wk: 'All updated baseline lifts surpassed. Push-up: 8–10 full unassisted. Plank: 1:15. Hip hinge: clean and reflexive. Reassess pull-up assist level.',
  milestones8wk: 'Strength: Hex DL progressing toward the PT-documented 95→135 lbs / 6–8 week target (Wk4 program checkpoint 120 lbs). Hip Thrust 115+ lbs ×5–6. OHP 22.5 lbs/hand ×8. Incline 22.5 lbs/hand ×8. Flat Press 27.5 lbs/hand ×8. Row 32.5 lbs ×8. Split Squat 37.5 lbs/hand ×8. Landmine Squat progressing in load. Goblet 45 lbs ×10. SL-RDL 32.5 lbs/hand. Carry 50 lbs/hand. Push-up 12 full unassisted. Pull-up 8 reps all grips. Plank 1:30. Single-Leg Reverse Hyper: clean, controlled hip extension with no pelvic rotation either side. Sit-up/bicycle crunch and KB swing clean and symptom-free for 3–4+ weeks. Cardiovascular: Day A cardio finisher extends to 20–25 min Zone 2 or 10 rounds of incline intervals; Day B metabolic circuit completes 3 rounds faster than Week 1 at the same loads. Revisit barbell back squat, conventional barbell deadlift, and clean-to-overhead-press for reintroduction once the above is consistent.',
  rescanNote: 'No Styku scan is on file for this client — reassess at 8 weeks via baseline lift retest, pull-up assist-level reduction, and resting heart rate trend rather than a body-composition rescan.',
};

const data = {
  client,
  baselines,
  baselinesTargetHeader: 'TRAINING LOAD · 4-WEEK TARGET',
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'aimee_morris');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Aimee_Morris_2Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // Client View (added 8/17/2026) — same data object, filtered. Four
  // baselineNotes above are marked audience: 'internal' (Drive-folder
  // sourcing detail, a programming-gap admission, a roster-audit trailer,
  // and a screening-gap admission); clientHighlight surfaces her real,
  // documented spinal stenosis clearance.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client', clientHighlight });
  const clientOutPath = path.join(outDir, 'Aimee_Morris_2Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
