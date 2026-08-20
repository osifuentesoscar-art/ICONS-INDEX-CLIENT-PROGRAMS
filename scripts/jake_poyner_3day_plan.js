/**
 * Jake Poyner — ICONS 3-Day Strength Program (QL Tendinosis-Informed)
 * Brace Life Studios
 *
 * New client. Rebuilt from a client-supplied "QL Tendinosis 3-Day Program"
 * PDF (already excellently constructed — force-plate/dynamometer assessment
 * data, RPE-based progression, and evidence citations already appropriate
 * to a 25-year-old male) into the icons_template.js engine for visual/brand
 * consistency with the rest of the roster. All clinical content, findings,
 * exercise prescriptions, and load/progression numbers are carried over
 * faithfully from the source — nothing clinical is invented.
 *
 * IMPORTANT — SCOPE OF "ICONS METHODOLOGY" APPLIED HERE:
 * Per CLAUDE.md's ICONS Training Philosophy, the target population for the
 * ICONS system (and the entire Evidence-Based Science Layer's numeric
 * thresholds — protein/creatine tiers, ALST sarcopenia cutoffs, the LIFTMOR
 * postmenopausal bone-loading protocol, pelvic floor triggers) is women in
 * their 40s-60s navigating hormonal transitions. Jake is a 25-year-old male.
 * None of those numeric thresholds are applied to him — doing so would be
 * scientifically inappropriate, not just off-brand. `includeNutritionBlock`
 * is explicitly false and proteinTargets()/nutritionBlock() are never
 * called, because that function's tiering logic (is50Plus/is40Plus/ALST)
 * has no evidentiary basis for a 25-year-old male. His nutrition targets
 * instead come straight from the source document's own age/sex-appropriate
 * research (Morton 2018 general protein meta-analysis; Shaw/Bischof/Praet
 * on collagen + tendon loading) and are presented as a plain baselineNote,
 * not the engine's auto-generated block.
 *
 * What DOES carry over from ICONS: the sex-neutral structural philosophy
 * (Isolated -> Compound -> Metabolic zones; RIR/RPE-based autoregulated
 * progressive overload; "never grind to failure") and the visual/brand
 * system. The women-specific coaching mantras ("You're not fragile...")
 * are not used since they're written for a different demographic; the
 * demographic-neutral ones ("Control precedes power," "Strength builds
 * confidence") are used where they fit naturally.
 *
 * Two genuine additions beyond a straight transcription (both flagged to
 * the client/trainer, not silently inserted):
 *   1. A conditioning/metabolic finisher on Days 1-2 — the source program
 *      has no dedicated conditioning component at all, which is both a
 *      general health-guidance gap and the missing third of ICONS's three
 *      training zones. Kept low-impact/QL-safe (bike, incline walk).
 *   2. The pain-monitoring rule is sharpened with the standard tendon-rehab
 *      nuance (mild exercise-induced discomfort that resolves within 24h is
 *      an accepted part of loading a tendinopathic tissue; sharp/pulling/
 *      line-specific pain at the QL is the actual stop signal) rather than
 *      a flat "any pain = stop," which is more conservative than current
 *      tendon rehab practice supports and could under-load the tissue.
 *
 * No baselines table — the source has no traditional strength-testing
 * battery (no 1RM/5RM lift PRs), only force-plate/dynamometer assessment
 * data, which is captured in baselineNotes instead (same pattern as
 * Nancy Avitable / Petra, whose sources also had no lift-testing battery).
 *
 * REVISION (8/11/2026, same day) — EVALUATED AGAINST THE NEW ENGINE
 * HELPERS (weakerSide/maleNutritionNote/testosteroneNote, added this same
 * day per the subagent-team retro), NEITHER FORCE-FIT IN:
 *   - maleNutritionNote()/maleProteinTargets() require client.weightKg,
 *     which Jake has none of on file (`includeNutritionBlock: false`, no
 *     Styku scan) — his nutrition targets come from the source document's
 *     own force-plate-appropriate research (see the Evidence Base note
 *     below) instead. Nothing to calculate from, so nothing was forced in.
 *   - weakerSide() is built for a single-instant "lower LST = weaker"
 *     magnitude comparison (Styku segmental lean-soft-tissue data). Jake's
 *     asymmetry findings are force-plate/dynamometer % asymmetry and
 *     time-to-peak-force data — a genuinely different shape (direction
 *     flips between test sessions on hip abduction; time-to-peak-force is
 *     inverted from LST's convention, since a HIGHER time means weaker/
 *     slower, not a lower one) — so reusing weakerSide() here would either
 *     require negating inputs against its documented convention or produce
 *     an inverted (wrong) answer. Left as narrative findings instead.
 *
 * REVISION (8/11/2026, same day) — STUDIO STAFF NAMING (CLAUDE.md's new
 * "STUDIO STAFF — IN-HOUSE PT & STRETCH THERAPY" section): every generic
 * "PT-coordinated care" / "treating PT" occurrence (stats line, Presenting
 * Issue baselineNote, Evidence Base note, Reassessment note, Day 3 iconsNote,
 * summary.milestones4wk) now names Jason Bethea, Brace Life's in-house
 * Trainer/Physical Therapist, directly — a documentation-accuracy upgrade,
 * not a new clinical claim; the treating physician role (external, distinct
 * from Jason) is preserved wherever it was already named separately.
 * Niko Heers (in-house Stretch Therapist) was deliberately NOT added
 * anywhere in this program: Jake's clinical picture is force-asymmetry and
 * tendon-loading driven (RFD, hip abduction reliability, trunk extensor
 * capacity), not a flagged ROM/flexibility restriction, and the warm-up/
 * cool-down stretches here are routine maintenance work, not the kind of
 * assisted-stretching-heavy content CLAUDE.md's new section describes as
 * Niko's genuine fit. Inserting his name here would be decorative, which
 * that section explicitly warns against.
 *
 * REVISION (8/13/2026, icons-roster-analyst cross-check) — SCOPE NOTE
 * REWORDED, NOT NEW CLINICAL CONTENT: the purple "Why This Program Doesn't
 * Use the Standard ICONS Science-Layer Numbers" note below was written
 * before CLAUDE.md's Male Client Programming Framework existed (built
 * 8/11/2026) and had gone stale — it still read as if no male-specific
 * framework existed at all, the same gap Vinz Feller's document had before
 * its 8/11/2026 revision (see scripts/vinz_feller_3day_plan.js's header).
 * Checked whether Jake has weight/Styku scan data on file to actually
 * attach the framework's numeric thresholds (ALST/VFA/BMI/body-fat-%,
 * maleProteinTargets()/maleNutritionNote()) to, the way Vinz's revision did
 * — he does not: `client` below carries no weightKg, and no Styku scan
 * exists anywhere in this file. Vinz's fix doesn't apply here as-is. This
 * is a wording/citation-accuracy fix only: the note now correctly says the
 * framework's "20-39 — Foundation" bracket exists and is where Jake would
 * sit, but that its numeric interpretation tools have nothing on file to
 * calculate from for him specifically — not that no framework exists.
 * Nothing clinical changed; his nutrition targets still come from the
 * source document's own age/sex-appropriate research (Robinson et al.
 * 2024/2025, Morton et al. 2018, Shaw/Bischof/Praet), unchanged.
 *
 * ============================================================================
 * REVISION 8/20/2026 — ICONS BLOCK METHOD (roster-wide rollout, batch 4 —
 * CLINICALLY-LED CLIENT). Full existing record read first (CLIENTS.md entry
 * + this script in full). The clinician's structure came FIRST and the
 * architecture was fitted around it; nothing clinical was re-derived.
 *   1. Block titles now name the architecture slot they actually occupy on
 *      all three days. Slot 4 (Jason's exercise) omitted on all three days
 *      under the consumed-by-corrective rule; slot 6 omitted on Day 1 and
 *      served in place on Day 2, because the clinician's tendon-loading
 *      ladder stages the first integrated loaded-carry expression on Day 3.
 *      See the "Block Method Mapping" internal baselineNote for the full
 *      per-day map and rationale.
 *   2. ONE sequencing change, Day 3 only: the bilateral farmer's carry moved
 *      from mid-Block-C to the session closer, with an explicit coach
 *      instruction that it may be run in its original position if trunk
 *      posture degrades late in the session.
 *   3. Compound-slot options menus added to every compound slot, filtered
 *      against the clinician's hold-back list BEFORE listing — no option
 *      introduces loaded lateral flexion, a symptomatic-side suitcase carry,
 *      or heavy single-arm overhead work, and conventional/sumo deadlift is
 *      explicitly excluded from the hinge menu because the trap bar's
 *      centred load line is why that variation was chosen.
 *   4. COLLAGEN PROTOCOL CORRECTED in 4 locations (3 warm-ups + the Evidence
 *      Base note's two mentions): timing 30-60 min -> 45-60 min, which moves
 *      the program CLOSER to Shaw et al.'s actual 1-hour-pre-load protocol
 *      at the 15g dose, not away from the clinician; and the acute
 *      "increases collagen synthesis markers and, over months, tendon
 *      stiffness" claim retired per the January 2026 umbrella review (no
 *      effect on tendon mechanical properties; low-certainty morphology
 *      benefit only), reframed as a chronic structural support protocol
 *      ranked below protein and creatine.
 *   5. DELOAD: his clinician-structured Week 4 RPE-6 deload BEFORE the
 *      retest is left exactly as written and NOT converted to the house
 *      after-test pattern — documented in its own internal note so a future
 *      pass doesn't "fix" it.
 *   6. Two open intake items flagged, not resolved by invention: a single
 *      weigh-in (the 130-175 g/day absolute protein figure implies a ~81 kg
 *      body weight that is nowhere in his record), and confirmation of his
 *      training venue (leg press, treadmill, and dip station are all outside
 *      the confirmed studio inventory). Every affected slot now carries an
 *      in-studio-executable same-pattern option so the program runs either
 *      way.
 *   7. Touch-rule pass: "Lat Pulldown" -> "Kieser or Lat Pulldown" with the
 *      assisted pull-up machine named in the options; "Standing Cable/Band
 *      Row" -> "Standing Row (Kieser, Cable or Band)"; Day 3's duplicate
 *      em-dash Trap Bar stub row removed; warm-up drift check run — all
 *      three warm-ups hold only the collagen protocol line and 5 min of easy
 *      bike/row, so nothing needed promoting to an exercise table.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { buildDocument } = require('./icons_template');

const client = {
  name: 'Jake Poyner',
  programTitle: '3-Day Strength Program',
  subtitle: 'QL Tendinosis-Informed · Pelvic & Trunk Stability Focus',
  schedule: '3 Days/Week · Full Gym',
  stats: ['Age 25', 'Male', 'QL Tendinosis — Coordinated with Jason Bethea, In-House PT', 'Assessment: Force Plate / Dynamometer, 8/4–5/2026'],
};

const baselineNotes = [
  {
    type: 'clinical',
    label: 'Presenting Issue — Quadratus Lumborum (QL) Tendinosis',
    body: 'Diagnosed QL tendinosis, managed alongside Jason Bethea, Brace Life\'s in-house Trainer/Physical Therapist, and the client\'s treating physician — this program runs alongside that care, not instead of it. Train through a pain-free range only. Standard tendon-rehab nuance: mild exercise-induced discomfort that fully resolves within 24 hours is an accepted part of loading a tendinopathic tissue and is not itself a stop signal. Sharp, pulling, or line-specific pain at the QL (just above the iliac crest, lateral to the spine) — during or lasting beyond 24h — is the real stop signal for that exercise: regress or substitute it.',
  },
  {
    type: 'watch',
    label: 'Hip Abduction & Hip Flexion Asymmetry (Force Plate, 8/4–5/2026)',
    body: 'Hip Abduction (side-lying): 45.7% asymmetry, right-dominant on first test; a second test showed 13.5% left-dominant — glute medius output is unreliable bilaterally, not just weak on one side. Hip Flexion: 14.1–27.3% asymmetry with inconsistent direction across sessions — recruitment is inconsistent, build unilateral control before loading further. Glute medius unreliability is treated as a primary driver of QL compensation for pelvic stability.',
  },
  {
    type: 'watch',
    label: 'Right-Side Force Development Lag — Hip Extension & Shoulder Extension',
    body: 'Hip Extension time-to-peak-force: right side consistently slower (5.39s vs 4.76s; 10.07s vs 6.69s across two tests) — right posterior chain under-recruited/slow, bias unilateral glute/hamstring work to the right. Shoulder Extension time-to-peak: left 2.55s vs right 7.69s — large asymmetry, right lat/posterior chain slow to fire, relevant to compensatory patterning up the kinetic chain from the QL.',
  },
  {
    type: 'red',
    label: 'Trunk Extension Capacity — Low, Slow Rate of Force Development',
    body: 'Peak force only 37–73 lb with slow RFD (7.6–11.8s to peak). Global trunk extensor capacity is low — this program builds isometric capacity first, before any dynamic trunk-extension loading (Day 3 is the first session introducing dynamic work here, once Days 1–2 have been pain-free).',
  },
  {
    type: 'teal',
    label: 'Hand Grip Squeeze — Minor Asymmetry, Monitor Only',
    body: '11.3% asymmetry, right-dominant. Minor — monitored but not a programming priority.',
  },
  {
    type: 'gold',
    label: 'Working Hypothesis',
    body: 'The QL is likely compensating in two directions: laterally, to stabilize the pelvis in place of an unreliable glute medius; and in the sagittal/postural plane, to assist a weak, slow-firing trunk extensor system. Right-sided posterior chain and lat slowness suggests the compensation pattern may be more pronounced on that side. This program builds glute medius reliability and trunk extensor capacity/speed while deliberately limiting end-range lateral flexion, spinal side-bending under load, and unsupported single-arm carries early on — the positions most likely to load a symptomatic QL directly.',
  },
  {
    type: 'clinical',
    label: 'Movements Held Back Until 4-Week Reassessment',
    body: 'No loaded side bends, no suitcase carries on the QL-symptomatic side, and no heavy single-arm overhead work until trunk extensor capacity and hip abduction symmetry both improve. Tendon-loading sequencing follows the standard progressive model given the tendinosis diagnosis: isometric → slow eccentric → controlled concentric → dynamic. Each session\'s warm-up prioritizes glute medius activation plus a QL-friendly trunk extensor primer before any loaded lateral or rotational work.',
  },
  {
    type: 'gold',
    label: 'Load & Progression — RPE-Based, Not Fixed %1RM',
    body: 'Strength blocks use RPE (1–10) rather than fixed %1RM — more responsive day-to-day if the QL flares. RPE 7 = 3 reps left in the tank; RPE 8 = 2 reps left. No compound lift is trained past RPE 8.5 in this phase — no grinding reps. Week 1: RPE 6–7, establish baseline loads, confirm every lift is pain-free. Week 2: RPE 7, add load only if Week 1 was fully symptom-free. Week 3: RPE 7–8, small increases (2.5–5 lb upper / 5–10 lb lower) if the RPE target is being undershot. Week 4: RPE 6 deload, reduce load ~15–20% ahead of reassessment testing.',
  },
  {
    type: 'teal',
    label: 'Evidence Base — Volume, Frequency, RIR, Protein & Tendon Nutrition (Age 25, Male)',
    body: 'Robinson et al. (2024/2025) — a meta-regression of 67 studies / 2,000+ participants averaging age 25.2, putting Jake at the center of this evidence base rather than requiring extrapolation: ~10–20 hard sets/muscle/week before diminishing returns (this program targets ~12–16 across the 3 days); frequency matters more for strength than hypertrophy once volume is equated, so squat/hinge/press/pull patterns are each hit twice weekly. Grgic et al. (2018): strength gains are largely insensitive to proximity to failure — RPE 6–8 (≈2–4 RIR) is used throughout, no true failure, both per the evidence and to protect the QL. Morton et al. (2018): 1.6–2.2 g/kg/day protein supports hypertrophy with a plateau in benefit around 1.6 g/kg/day — spread across 4–5 meals including a pre-sleep dose (pre-sleep protein improves overnight muscle protein synthesis). The g/kg range is the real prescription; the working figure of roughly 130–175g/day assumes a body weight that has not actually been recorded yet, so bring a single weigh-in to any session and this gets set exactly rather than estimated. Collagen: Shaw et al. (2017) dosed 15g vitamin-C-enriched gelatin one hour before loading, so the protocol here is 15g collagen peptides + ~50mg vitamin C taken 45–60 minutes before each of the three training sessions. Be clear-eyed about what this is for: it is a chronic, structural connective-tissue support protocol taken consistently across 12+ weeks — not a pre-workout that does anything for you on the day. Current evidence (a January 2026 umbrella review of 16 meta-analyses and 113 RCTs, plus a separate meta-analysis of 13 RCTs) finds a low-certainty benefit to tendon morphology, no measurable effect on tendon mechanical properties, and no added performance benefit on top of the training itself. Priority order, in plain terms: hit the protein target first, creatine second if you choose to use it, collagen third — it is the most speculative of the three and should never displace either. The loading in this program is the actual tendon intervention; collagen supports it and does not substitute for it. Continue alongside Jason Bethea\'s care.',
  },
  {
    type: 'purple',
    audience: 'internal', // Client View: documentation-methodology/scope note — explains
    // why the standard ICONS numeric thresholds weren't applied and what's missing from
    // his intake to attach the Male Framework's tools; build-process reasoning, not
    // client-facing coaching content.
    label: "Why This Program Doesn't Use the Standard ICONS Science-Layer Numbers",
    body: "ICONS's Evidence-Based Science Layer (protein/creatine tiers, ALST sarcopenia thresholds, the LIFTMOR postmenopausal bone-loading protocol, pelvic floor triggers) is derived specifically from research on women 40-65 navigating hormonal transitions — none of it transfers to a 25-year-old male client. A Male Client Programming Framework now exists (built 8/11/2026) with real male-specific thresholds, and its \"20-39 — Foundation\" bracket is where Jake would sit — but its numeric interpretation tools (ALST/VFA/BMI/body-fat-% reads, protein/creatine targets) all require weight and/or Styku scan data, and neither is on file for him. There is nothing numeric to attach those thresholds to yet, not an absent framework. This program instead uses the age/sex-appropriate research already cited above (Robinson et al. 2024/2025, Morton et al. 2018, Shaw/Bischof/Praet on collagen and tendon loading). What does carry over from ICONS regardless: the Isolated → Compound → Metabolic structural philosophy and RPE/RIR-based autoregulated progressive overload — both demographic-neutral principles, applied here on their own merits. Revisit this note if a Styku scan or weigh-in is ever added to his intake record.",
  },
  {
    type: 'green',
    label: 'Reassessment — 4-Week Retest',
    body: 'Re-test hip abduction, hip extension time-to-peak-force, and trunk extension peak force/RFD at the 4-week mark. Progress QL-side loaded carries and side-bend work only once hip abduction asymmetry is under ~10% and trunk extension RFD has improved — and only with continued clearance from Jason Bethea and the treating physician.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Collagen Protocol — What Changed 8/20/2026 and Why',
    body: 'Four locations updated (all three day warm-ups plus both mentions inside the Evidence Base note). TIMING: 30-60 min pre-session became 45-60 min. This moves the program CLOSER to the source clinician\'s own citation, not away from it — Shaw et al. (2017) dosed the 15g protocol one hour pre-loading, and the authors themselves noted the 30-minute end of the window would suit a smaller 5g dose; the 30-minute end was never studied at 15g. CLAIM: the previous wording asserted collagen "increases collagen synthesis markers and, over months, tendon stiffness." That is retired. A January 2026 umbrella review (16 meta-analyses, 113 RCTs, 7,983 participants) found a positive effect on tendon MORPHOLOGY only, at low certainty (4 RCTs, 127 participants), and NO effect on tendon mechanical properties; a separate meta-analysis of 13 RCTs (450 participants) found collagen does not further improve musculoskeletal performance when added to exercise. The acute-synthesis framing overstated the outcome evidence, which matters more than usual here because the client has a tendinopathy and could reasonably read the old wording as "the supplement is fixing the tendon." Collagen is now explicitly ranked below protein and creatine in the supplement hierarchy, and the document states that mechanical loading is the actual intervention. PROTEIN: the absolute 130-175 g/day figure was left visible but is now qualified in-document as assuming an unrecorded body weight, with the g/kg range named as the real prescription — see the open-intake note below.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Block Method Mapping — 8/20/2026 (Clinically-Led Build Record)',
    body: 'This is a CLINICALLY-LED program (QL tendinosis, coordinated with Jason Bethea and the treating physician, rebuilt from a clinician-supplied source program). Per the clinically-led override, the clinician\'s structure came FIRST and the ICONS session architecture was fitted around it — no exercise was moved, added, or removed to satisfy the architecture except where noted below. Mapping as delivered: Day 1 — A Corrective (glute medius + trunk activation) / B Primary Compound (single-leg hip thrust + goblet squat) / C Accessory (isometric trunk extensor capacity) / D Secondary Compound (supported leg press + flat DB bench) / E Metabolic finisher. Day 2 — A Corrective / B Primary Compound (right-biased unilateral) / C Accessory & Integration (trunk/anti-lateral flexion, containing the unaffected-side suitcase carry) / D Secondary Compound (vertical pull + overhead press) / E Metabolic finisher. Day 3 — A Corrective / B Primary Compound (trap bar deadlift) / C Accessory (power/RFD + first dynamic trunk extension) / D Secondary Compound (press) / E Full-Body Integration (bilateral farmer\'s carry). SLOT 4 (Jason\'s exercise) is OMITTED on all three days under the consumed-by-corrective rule: Jason\'s coordinated input for this client IS the corrective/staging content, which already sits in slot 1 and in the clinician\'s hold-back list exactly as documented — placing it twice would double-count it, and inserting filler would be worse. SLOT 6 (integration closer) is deliberately OMITTED on Day 1 and served IN PLACE on Day 2 rather than moved: the clinician\'s tendon-loading ladder (isometric to slow eccentric to controlled concentric to dynamic) stages the first integrated loaded-carry expression on Day 3, and Day 2\'s single-side carry is deliberately positioned before the pull/press block rather than at the end of a fatigued session. Adding a Day 1 closer, or relocating Day 2\'s carry to the end, would move ahead of the clinician\'s staging — precisely what the clinically-led override forbids. Day 3 is the clinician\'s own integration day and maps cleanly. ONE sequencing change was made, and only there: the bilateral farmer\'s carry moved from mid-Block-C to the Day 3 closer, with the block intro stating explicitly that the coach may run it in its original position if trunk posture degrades late in the session. Antagonist Rotation walked on the full rendered day for all three days — no three consecutive same-pattern compounds anywhere. One documentation defect cleaned up: Day 3\'s old Block D carried a duplicate Trap Bar Deadlift row with em-dashes in every numeric column, a stub cross-reference rather than a real prescription; removed, since the full trap bar prescription already lives in Block B.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Deload — Clinician\'s Week 4 RPE-6 Deload Stands, House Pattern NOT Applied',
    body: 'This program already carries a planned deload, and it is the clinician\'s: Week 4 runs at RPE 6 with load reduced roughly 15-20% AHEAD of the reassessment testing, so the retest is performed fresh rather than on accumulated fatigue. The ICONS house pattern places a deload immediately AFTER the Week 4 strength check instead. That difference is deliberate and was NOT reconciled to the house pattern: for a client whose Week 4 event is a force-plate/dynamometer retest whose numbers drive the next phase\'s clearance decisions (QL-side carries, loaded side-bends), deloading before the test is the clinically correct order, and the clinically-led override governs. Recorded here so a future pass does not mistake it for a missing deload or "fix" it into the house cadence.',
  },
  {
    type: 'gold',
    audience: 'internal',
    label: 'Open Intake Items — Single Weigh-In, and Training-Venue Equipment Confirmation',
    body: 'TWO items to resolve at his next session, neither invented here. (1) WEIGH-IN: this document contains an internal inconsistency inherited from the source program. The scope note above correctly states no weight is on file, yet the Evidence Base note prescribes an absolute protein target of roughly 130-175 g/day — a figure that only makes sense back-calculated from a body weight of about 81 kg at the 1.6-2.2 g/kg range. That weight is not documented anywhere in his record; the absolute grams almost certainly came across with the source PDF. It has NOT been resolved by inventing a weight. A single weigh-in closes it completely: it converts the g/day figure from an inherited assumption into a real g/kg calculation, and it is also the one missing input that would let the Male Client Programming Framework\'s numeric tools (maleProteinTargets, the 20-39 Foundation bracket reads) actually attach to him. Until then, treat 130-175 g/day as provisional and read the g/kg range as the real prescription. (2) TRAINING VENUE: his schedule line reads "Full Gym," and the source program prescribes a 45-degree leg press, a treadmill, and a weighted dip — none of which appear on the confirmed Brace Life studio equipment inventory (which has a squat rack and Olympic bar, DBs to 60 lbs/hand, KBs to 25 lbs, bench, leg extension, hamstring curl, hyperextension, assisted pull-up machine, Kieser, sled, hex bar, Total Gym, landmine, bike/assault bike/rower, plyo boxes, bands, med balls). Whether he trains in-studio or at an outside commercial gym is not documented. Rather than silently rewriting clinician-prescribed exercise selections, every affected slot now carries a same-pattern option that IS available in-studio (Total Gym or supported machine variation for the leg press; bike or rower for the treadmill; close-grip DB floor press already named as the tracked version of the dip slot), so the program is executable either way. Confirm the venue and this resolves cleanly in one line.',
  },
];

const days = [
  {
    intensity: 60,
    badge: { label: '1', sub: 'RPE 6-8' }, // intensity level indicated via RPE range on the badge, not left as a bare day number
    title: 'DAY 1 — Glute Medius Reliability & Trunk Extensor Foundation',
    subtitle: 'Hip Abduction Symmetry · Isometric Trunk Extensor Capacity',
    descriptor: 'FOUNDATION DAY · REBUILD BILATERAL GLUTE MEDIUS OUTPUT · ISOMETRIC TRUNK BASE',
    intensityLabel: 'Day 1 Priority',
    intensityPara: 'Rebuild consistent bilateral hip abduction force output and give the trunk extensors an isometric strength base, without loading the QL directly. Control precedes power — this day is entirely about reliable activation before anything gets loaded hard. Progression is RPE-based (see Load & Progression note), not the standard ICONS 60/70/80/90 day-intensity framework; the badge color here is for visual variety only.',
    warmUp: 'Collagen protocol: 15g collagen peptides + ~50mg Vitamin C, 45–60 min before this session. 5 min easy bike — general warm-up before the activation work below.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — GLUTE MEDIUS & TRUNK ACTIVATION',
        color: 'red',
        introLabel: 'Why',
        intro: 'Directly targets the flagged hip abduction unreliability and primes the trunk before any loaded work.',
        exercises: [
          { name: 'Banded Lateral Walk', sets: '2', reps: '10 steps/side', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Band above knee; hips level, no hiking.' },
          { name: 'Side-Lying Hip Abduction (Isometric Hold)', sets: '2', reps: '20s/side', load: 'Bodyweight', tempo: 'Hold', rest: '20s', cue: 'Right side: add 2s extra hold — lagging on testing.' },
          { name: 'Supine Dead Bug (Isometric Hold)', sets: '2', reps: '20s hold/side', load: 'Bodyweight', tempo: 'Hold', rest: '30s', cue: 'Low back flat to floor; opposite arm/leg extended, no reach.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — SINGLE-LEG HIP THRUST & GOBLET SQUAT',
        introLabel: 'Format',
        intro: 'Single-leg hip thrust and goblet squat build lower-body strength on a stable, symmetric base; Pallof press is the QL-safe anti-rotation core work. If the day calls for a variation, these stay inside the QL rules — squat options: goblet squat (the version we track), box squat to a fixed height, or a heels-elevated goblet squat if ankle range limits depth; hip-thrust options: single-leg hip thrust (tracked), bilateral hip thrust, or a foot-elevated glute bridge. Every option keeps the rib cage stacked over the pelvis with no lateral shift, and none of them add loaded side-bending or single-arm overhead work — the two positions held back this phase.',
        exercises: [
          { name: 'Single-Leg Hip Thrust (Foot Elevated)', sets: '3', reps: '8–10/side', load: 'Bodyweight → light DB', tempo: '2-1-2', rest: '75s', cue: 'Full glute lockout; even hip height both sides.' },
          { name: 'Goblet Squat', sets: '3', reps: '8', load: 'RPE 7', tempo: '3-1-1', rest: '90s', cue: 'Rib cage stacked over pelvis, no lateral shift.' },
          { name: 'Half-Kneeling Pallof Press (Anti-Rotation)', sets: '3', reps: '8/side', load: 'Light-Mod band', tempo: '2s hold', rest: '60s', cue: 'This is the anti-lateral-flexion work — QL-safe core loading.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — TRUNK EXTENSOR CAPACITY (ISOMETRIC)',
        color: 'red',
        introLabel: 'Why Isometric Only This Week',
        intro: 'Trunk extensor work stays isometric this week — building capacity before adding dynamic loading, per the tendon-loading sequencing above.',
        exercises: [
          { name: 'Prone Plank on Elbows', sets: '3', reps: '20–30s', load: 'Bodyweight', tempo: 'Hold', rest: '45s', cue: 'Ribs down, no lumbar extension fault.' },
          { name: 'Bent-Over Band Pull-Apart', sets: '3', reps: '12', load: 'Light band', tempo: 'Controlled', rest: '45s', cue: 'Light load — postural/thoracic, not lumbar.' },
          { name: 'Supine 90/90 Breathing Reset', sets: '2', reps: '6 breaths', load: 'Bodyweight', tempo: 'Slow', rest: '—', cue: 'Finisher; full exhale, ribs down.' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — SUPPORTED LEG PRESS & BENCH PRESS',
        introLabel: 'Load & Progression',
        intro: 'The day\'s second compound pattern, rotating off the squat and hip work above. See the Load & Progression note for weekly RPE targets. No axial spinal loading in this block — the leg press seat and back stay fully supported, which is the whole reason this variation is here rather than a barbell squat. Options that keep that same fully-supported, non-axial requirement: a Total Gym leg press/squat slide, a machine hack-squat variation where the back is supported, or a supported single-leg press one side at a time. Press options: flat dumbbell bench press (tracked), barbell bench press, or a floor press if the shoulder prefers the shorter range. Every option keeps the trunk supported and the spine out of the load path.',
        exercises: [
          { name: '45° Leg Press', sets: '4', reps: '6–8', load: 'RPE 7', tempo: 'Controlled', rest: '2 min', cue: 'No axial spinal loading — seat/back fully supported. Full but pain-free depth.' },
          { name: 'Flat DB Bench Press', sets: '4', reps: '6–8', load: 'RPE 7', tempo: 'Controlled', rest: '90s', cue: 'Even bar path both arms; control the eccentric.' },
        ],
      },
      {
        letter: 'E',
        title: 'METABOLIC FINISHER (CHOOSE ONE)',
        color: 'gold',
        introLabel: 'Conditioning Finisher',
        intro: 'A short, low-impact cardio finisher to round out today\'s session — kept easy and QL-safe. Skip or shorten if fatigue from the work above is high.',
        exercises: [
          { name: 'Stationary Bike — Easy Spin', sets: '1', reps: '10–15 min', load: 'Easy, conversational', tempo: 'Steady', rest: '—', cue: 'Zero spinal/trunk loading. Energy becomes identity — this is the low-key finish, not another hard block.' },
          { name: 'Treadmill — Incline Walk', sets: '1', reps: '10–15 min', load: 'Incline 6–10%', tempo: 'Steady', rest: '—', cue: 'No jarring impact, no trunk rotation. Good alternative if biking isn\'t available.' },
        ],
      },
    ],
    coolDown: 'Hip flexor stretch 60s each side. Child\'s pose 60s. Thoracic extension over foam roller 60s.',
    iconsNote: 'Sharp, pulling, or line-specific pain at the QL — during a set or persisting beyond 24h — is the stop signal for that exercise: regress or substitute and flag it before the next session. Mild, diffuse post-exercise soreness that resolves within a day is expected and not a reason to change the program.',
  },
  {
    intensity: 70,
    badge: { label: '2', sub: 'RPE 6-8' },
    title: 'DAY 2 — Right-Side Posterior Chain & Unilateral Symmetry',
    subtitle: 'Right Hip Extension & Lat Force Development',
    descriptor: 'RIGHT-BIASED UNILATERAL DAY · CLOSE THE FORCE-DEVELOPMENT GAP',
    intensityLabel: 'Day 2 Priority',
    intensityPara: 'Right hip extension and right lat/posterior shoulder were both slow to produce force on testing. This session biases right-side unilateral loading to close the gap. Strength builds confidence — this is the day that directly targets the two clearest asymmetries from the assessment.',
    warmUp: 'Collagen protocol: 15g collagen peptides + ~50mg Vitamin C, 45–60 min before this session. 5 min easy row or bike.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — ACTIVATION & RIGHT-SIDE PREP',
        color: 'red',
        introLabel: 'Why',
        intro: 'Checks for right-side lag before it shows up under load.',
        exercises: [
          { name: 'Glute Bridge (Bilateral, Isometric Hold)', sets: '2', reps: '15s hold', load: 'Bodyweight', tempo: 'Hold', rest: '20s', cue: 'Pelvis level; check for right-side lag.' },
          { name: 'Wall Slide / Scap Retraction', sets: '2', reps: '10', load: 'Bodyweight', tempo: 'Slow', rest: '30s', cue: 'Primes right lat/posterior shoulder.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — RIGHT-BIASED UNILATERAL',
        introLabel: 'Format',
        intro: 'Right side leads every set this block — direct correction for the flagged hip extension and lat/posterior shoulder time-to-peak-force lag. Same-pattern options if the day calls for one, all right-led and all inside the QL rules — single-leg hinge: single-leg Romanian deadlift (the version we track), staggered-stance RDL with the back toe down, or a rack-supported single-leg RDL with a light hand touch for balance; row: single-arm dumbbell row (tracked), chest-supported row, or a single-arm landmine row; split-stance squat: rear-foot-elevated split squat (tracked), reverse lunge, or a box step-up. None of these add loaded lateral flexion or a suitcase carry on the symptomatic side.',
        exercises: [
          { name: 'Single-Leg Romanian Deadlift', sets: '3', reps: '8/side (right first)', load: 'RPE 7', tempo: '3-1-1', rest: '75s', cue: 'Right leg: add a 1-count pause at bottom.' },
          { name: 'Single-Arm DB Row', sets: '3', reps: '10/side (right first)', load: 'RPE 7', tempo: '2-1-2', rest: '60s', cue: 'Right arm: full lat stretch at bottom, no trunk rotation.' },
          { name: 'Rear-Foot-Elevated Split Squat', sets: '3', reps: '8/side', load: 'RPE 7', tempo: '2-1-1', rest: '75s', cue: 'Even loading both sides; track for compensation.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY & INTEGRATION — TRUNK / ANTI-LATERAL FLEXION',
        color: 'red',
        introLabel: 'Held Back This Phase',
        intro: 'No loaded side bends or QL-side carries this phase — revisit once trunk extensor and hip abduction symmetry improve at the 4-week reassessment.',
        exercises: [
          { name: 'Suitcase Carry (Unaffected Side Only)', sets: '3', reps: '20m', load: 'Moderate', tempo: 'Steady', rest: '60s', cue: 'Skip the QL side this phase — revisit at reassessment.' },
          { name: 'Dead Bug (Dynamic, Slow March)', sets: '3', reps: '8/side', load: 'Bodyweight', tempo: 'Slow', rest: '45s', cue: 'Progression from Day 1\'s hold; low back flat throughout, no arch.' },
          { name: 'Standing Band Anti-Rotation Press', sets: '2', reps: '10/side', load: 'Band', tempo: 'Controlled', rest: '45s', cue: 'Reinforces the Pallof pattern from Day 1.' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — VERTICAL PULL & OVERHEAD PRESS',
        introLabel: 'Right Side Is Priority',
        intro: 'The day\'s second compound pattern — vertical pulling and pressing, rotating off the unilateral lower work above. Slow lat/posterior chain on testing makes the right side the priority on the pull. Vertical pull options: weighted pull-up (tracked), the assisted pull-up machine, a Kieser or lat pulldown, or a band-assisted pull-up. Press options: standing barbell overhead press (tracked), seated dumbbell overhead press if standing lets the low back arch, or a landmine press. Note the phase rule that governs every option here — no heavy single-arm overhead work until the 4-week reassessment clears it, so any press alternate stays bilateral or light.',
        exercises: [
          { name: 'Weighted Pull-Up / Kieser or Lat Pulldown', sets: '4', reps: '6–8', load: 'RPE 7', tempo: 'Controlled', rest: '90s', cue: 'Right side is priority — slow lat/posterior chain on testing. Full stretch at top.' },
          { name: 'Standing Barbell Overhead Press', sets: '3', reps: '6', load: 'RPE 7', tempo: 'Controlled', rest: '2 min', cue: 'Brace hard; no lumbar arch to compensate for shoulder ROM.' },
        ],
      },
      {
        letter: 'E',
        title: 'METABOLIC FINISHER (CHOOSE ONE)',
        color: 'gold',
        introLabel: 'Conditioning Finisher',
        intro: 'Same easy, low-impact finisher as Day 1. Optional given the unilateral work above.',
        exercises: [
          { name: 'Stationary Bike — Easy Spin', sets: '1', reps: '10–15 min', load: 'Easy, conversational', tempo: 'Steady', rest: '—', cue: 'Zero spinal/trunk loading.' },
          { name: 'Treadmill — Incline Walk', sets: '1', reps: '10–15 min', load: 'Incline 6–10%', tempo: 'Steady', rest: '—', cue: 'No jarring impact, no trunk rotation.' },
        ],
      },
    ],
    coolDown: 'Lat stretch 30s each side. Hip flexor stretch 60s each side. Thoracic extension over foam roller 60s.',
    iconsNote: 'Sharp, pulling, or line-specific pain at the QL — during a set or persisting beyond 24h — is the stop signal for that exercise. Mild, diffuse post-exercise soreness that resolves within a day is expected.',
  },
  {
    intensity: 80,
    badge: { label: '3', sub: 'RPE 6-8' },
    title: 'DAY 3 — Integration, Rate of Force Development & Progression',
    subtitle: 'Dynamic Trunk Extension · Power & Symmetric Loaded Carries',
    descriptor: 'INTEGRATION DAY · FIRST DYNAMIC TRUNK EXTENSOR WORK · POWER/RFD',
    intensityLabel: 'Day 3 Priority',
    intensityPara: 'Begin layering speed/RFD work now that isometric capacity has been built, and integrate both hips and the trunk extensors together in compound patterns. This is the first session introducing dynamic trunk extension and jump-landing force — confirm Days 1–2 were fully pain-free before progressing here. No added conditioning finisher today; the power/RFD work and the closing bilateral carry already provide meaningful demand.',
    warmUp: 'Collagen protocol: 15g collagen peptides + ~50mg Vitamin C, 45–60 min before this session. 5 min easy bike.',
    blocks: [
      {
        letter: 'A',
        title: 'CORRECTIVE — ACTIVATION & FIRST DYNAMIC-ADJACENT TRUNK WORK',
        color: 'red',
        introLabel: 'First Dynamic-Adjacent Trunk Work',
        intro: 'Prone Superman is the progression from Day 1\'s isometric plank — first dynamic-adjacent trunk extensor work.',
        exercises: [
          { name: 'Banded Monster Walk', sets: '2', reps: '10 steps/side', load: 'Band', tempo: 'Controlled', rest: '30s', cue: 'Both directions; watch for right-side drop.' },
          { name: 'Prone Superman (Isometric, Arms at Sides)', sets: '2', reps: '15s hold', load: 'Bodyweight', tempo: 'Hold', rest: '20s', cue: 'Progression from Day 1 plank — first dynamic-adjacent trunk extensor work.' },
        ],
      },
      {
        letter: 'B',
        title: 'PRIMARY COMPOUND — TRAP BAR DEADLIFT',
        introLabel: 'Format',
        intro: 'Trap bar deadlift is the week\'s primary loaded strength lift and the number tracked into the 4-week retest — neutral spine, symmetric setup both feet. Hinge options if the day calls for one, all keeping the load line symmetrical and the spine neutral: elevated-handle or block-height trap bar pulls (shorter range on a stiff day), a rack pull from just below the knee, or a supported hip-hinge machine variation. Conventional and sumo barbell deadlifts are deliberately NOT offered this phase — the trap bar\'s centred load line is the reason this variation was chosen over a barbell for a symptomatic QL, and swapping it out would defeat that. Step-up options: box step-up (tracked), split squat, or reverse lunge. Row options: bilateral standing row (tracked), chest-supported row, or a seated Kieser row.',
        exercises: [
          { name: 'Trap Bar Deadlift', sets: '4', reps: '6', load: 'RPE 7–8 (see Load & Progression note)', tempo: '2-0-1', rest: '2 min', cue: 'Neutral spine, symmetric setup both feet. This week\'s primary loaded strength lift — apply the Load & Progression prescription to this lift specifically.' },
          { name: 'Single-Leg Box Step-Up', sets: '3', reps: '8/side', load: 'RPE 7', tempo: '2-1-1', rest: '75s', cue: 'Drive through mid-foot; no hip hike at top.' },
          { name: 'Standing Row (Kieser, Cable or Band)', sets: '3', reps: '10', load: 'RPE 7', tempo: '2-1-2', rest: '60s', cue: 'Full scap retraction; even bar path.' },
        ],
      },
      {
        letter: 'C',
        title: 'ACCESSORY — POWER / RFD & TRUNK EXTENSOR PROGRESSION',
        color: 'red',
        introLabel: 'Confirm Pain-Free First',
        intro: 'This is the first session introducing dynamic trunk extension and jump-landing force — confirm Days 1–2 were fully pain-free before progressing here.',
        exercises: [
          { name: 'Broad Jump (Submax, Controlled Landing)', sets: '3', reps: '3', load: 'Bodyweight', tempo: 'Explosive/controlled', rest: '90s', cue: 'Only if pain-free through Days 1–2; stop if any QL discomfort.' },
          { name: 'Prone Trunk Extension (Controlled, Small ROM)', sets: '3', reps: '8', load: 'Bodyweight', tempo: '3-1-1', rest: '60s', cue: 'First dynamic loading of trunk extensors — small range, no end-range hyperextension.' },
        ],
      },
      {
        letter: 'D',
        title: 'SECONDARY COMPOUND — PRESS',
        introLabel: 'Format',
        intro: 'The day\'s second compound pattern — pressing, rotating off the trap bar and jump work above, and rounding out the week\'s upper-body pushing volume. The trap bar prescription for this session lives in Block B above and is not repeated here. Press options: close-grip dumbbell floor press (the version we track — shortest, most shoulder-friendly range), flat dumbbell bench press, or a weighted dip where a dip station is available. Full but pain-free range on whichever one runs.',
        exercises: [
          { name: 'Close-Grip DB Floor Press (or Weighted Dip)', sets: '3', reps: '6–8', load: 'RPE 7', tempo: 'Controlled', rest: '90s', cue: 'Full but pain-free ROM; stop short if front shoulder pinches.' },
        ],
      },
      {
        letter: 'E',
        title: 'FULL-BODY INTEGRATION — BILATERAL FARMER\'S CARRY',
        color: 'gold',
        introLabel: 'Why',
        intro: 'The session\'s closer, and the one place in this phase where loaded carrying is reintroduced — bilateral only, symmetric by design, so nothing pulls the trunk into side-bending. It puts the whole day together at once: the glute medius reliability built in the activation block, the trunk extensor capacity from Days 1-2, and the neutral-spine bracing from the trap bar, all held under load while walking. Load stays moderate and does not run ahead of the trap bar work above. Position is coach-selectable: if trunk posture degrades at the end of the session, run this carry immediately after the primary block instead — the carry itself is the prescription, not its slot in the order. Variations, all bilateral this phase: two-hand dumbbell farmer\'s carry (the version we track), trap-bar carry, or a front-racked/goblet carry. Single-side suitcase carries on the symptomatic side stay held back until the 4-week reassessment clears them.',
        exercises: [
          { name: 'Farmer\'s Carry (Bilateral, Moderate Load)', sets: '3', reps: '30m', load: 'Moderate — held below the day\'s trap bar load', tempo: 'Steady', rest: '60s', cue: 'Bilateral only — reintroduces loaded carries symmetrically. Tall ribs, level pelvis, no side lean.' },
        ],
      },
    ],
    coolDown: 'Child\'s pose 60s. Hip flexor stretch 60s each side. Thoracic extension over foam roller 60s.',
    iconsNote: 'Sharp, pulling, or line-specific pain at the QL — during a set or persisting beyond 24h — is the stop signal. Mild, diffuse post-exercise soreness that resolves within a day is expected. This program is strength & conditioning guidance based on performance testing data — it is not a substitute for medical diagnosis or physical therapy treatment of the QL tendinosis; coordinate with Jason Bethea and the treating physician before progressing load or range of motion.',
  },
];

const summary = {
  subtitle: 'Jake Poyner  ·  ICONS Index  ·  QL Tendinosis-Informed Programming  ·  3 Days/Week  ·  Full Gym',
  rows: [
    ['Wk 1', '—', 'Days 1–3', 'RPE 6–7 all compound lifts', 'Establish baseline loads. Confirm every strength lift is pain-free before progressing.'],
    ['Wk 2', '—', 'Days 1–3', 'RPE 7', 'Add load only if Week 1 was fully symptom-free.'],
    ['Wk 3', '—', 'Days 1–3', 'RPE 7–8', 'Small load increases (2.5–5 lb upper / 5–10 lb lower) if RPE target is being undershot.'],
    ['Wk 4', '—', 'Days 1–3', 'RPE 6 (deload)', 'Reduce load ~15–20% ahead of 4-week reassessment testing.'],
  ],
  milestones4wk: 'Reassessment: re-test hip abduction, hip extension time-to-peak-force, and trunk extension peak force/RFD. Progress QL-side loaded carries and side-bend work only once hip abduction asymmetry is under ~10% and trunk extension RFD has improved — with continued clearance from Jason Bethea and the treating physician.',
  milestones8wk: 'If the 4-week reassessment clears progression: gradually reintroduce QL-side suitcase carries and loaded side-bends, continue right-side-biased unilateral work until posterior chain/lat time-to-peak-force symmetry improves, and progress the Day 3 power/RFD work (broad jump distance, trunk extension range) as tolerance is confirmed. Re-evaluate whether the RPE-based approach can shift toward standard %1RM programming once the QL has been consistently asymptomatic.',
  rescanNote: 'Force plate / dynamometer retest at 4 weeks is the primary reassessment tool for this client — not a Styku scan. Track hip abduction symmetry %, hip extension time-to-peak-force (L vs R), and trunk extension peak force + RFD as the three key metrics.',
};

const data = {
  client,
  baselineNotes,
  includeNutritionBlock: false,
  includeProgressionBlock: true,
  days,
  summary,
};

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'jake_poyner');
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await buildDocument(data);
  const outPath = path.join(outDir, 'Jake_Poyner_3Day_Training_Plan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);

  // No clientHighlight: first build, rebuilt from a client-supplied source
  // program rather than a prior ICONS version — no documented PR/progress-
  // since-last-version exists to surface. Omitted per spec rather than
  // fabricated.
  const clientBuffer = await buildDocument({ ...data, viewMode: 'client' });
  const clientOutPath = path.join(outDir, 'Jake_Poyner_3Day_Training_Plan_Client_View.docx');
  fs.writeFileSync(clientOutPath, clientBuffer);
  console.log('Wrote', clientOutPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
