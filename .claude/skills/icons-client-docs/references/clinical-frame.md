# Clinical Frame — Reading a Client's Data

Everything downstream depends on this step. The thresholds below are the
build-time operative versions; CLAUDE.md's Evidence-Based Science Layer carries
the citations, the caveats, and the reasoning, and is authoritative if the two
ever disagree.

## Contents
- [Step 1 — the scope rule](#step-1--which-framework-applies)
- [Step 2 — reading a Styku scan](#step-2--reading-a-styku-scan)
- [Step 3 — the flags](#step-3--the-flags)
- [Step 4 — asymmetry](#step-4--asymmetry-and-weaker-side)
- [Step 5 — nutrition](#step-5--protein-and-creatine)
- [Step 6 — what fires automatically](#step-6--what-the-engine-fires-automatically)
- [Age brackets](#age-bracket-quick-reference-women)
- [Conditions with dedicated sections](#conditions-that-already-have-a-dedicated-section)

## Step 1 — Which framework applies

Determine this before touching any number, because a threshold applied to the
wrong population produces a document that reads as authoritative and is wrong.

**Case A — woman with age on file.** The women's Age Bracket Framework applies.
Use the bracket table below.

**Case B — male client.** Use the Male Client Programming Framework, not the
women's numbers. The differences that matter most: ALST At-Risk is `< 7.0 kg/m²`
(not 5.5), there is no cited three-tier subdivision for men so don't invent an
"optimal" band, protein runs 1.6–2.2 g/kg/day with no age-tiered escalation, and
questions about TRT get the same referral-not-diagnose posture the women's
framework gives HRT. Bone-loading and power evidence transfers with caveats —
see CLAUDE.md's Male Client Programming Framework.

**Case C — no demographic data at all** (no age, no sex, no scan; only
trainer-observed constraints). This is distinct from Case B and is the one most
often handled wrongly. You cannot determine which framework applies, so the
correct posture is not "pick the nearest bracket and be careful" — it is to
apply only what is genuinely sex- and age-neutral and to *say in the document*
that you did.

- Transfers: the three-zone Isolated → Compound → Metabolic structure, RIR/RPE
  autoregulation and the calibration protocol, corrective-before-compound
  sequencing, the Antagonist Rotation Rule, full-ROM-with-control coaching, and
  progression governed by observed performance and symptom response.
- Does not transfer, and must be stated as not applied: every numeric threshold
  without exception — ALST cutoffs, protein g/kg tiers, creatine indication,
  LIFTMOR candidacy, VFA and BMI interpretation, pelvic floor auto-triggers, the
  Full-Spectrum Progression Standard, and the intensity framework's
  novice-vs-trained tiering (which needs training age).

A Case C document carries one explicit scope note naming this, the way Jake
Poyner's and Vinz Feller's do for the male-scope case. Set
`includeNutritionBlock: false` — a nutrition block with no weight on file has
nothing real to compute. And ask for age and sex: they are the two fields that
unlock the most downstream clinical content per unit of effort.

**Case D — a population neither framework covers** (an adolescent, say). Apply
the sex-neutral structural philosophy, state the gap in the document, and treat
onboarding as the trigger to research and build that population's framework into
CLAUDE.md — not to ship another document that just says "not applied."

## Step 2 — Reading a Styku scan

Pull these into the `styku` object, using Styku's own reported values rather
than recomputing:

```js
scanDate, bodyFatPct, bodyFatRank, leanMass, leanMassPct, fatMass, boneMass,
bmi, bmr, vfa, shapeScore, shapeScoreLabel, alstIndex,
leftArmLST, rightArmLST, leftLegLST, rightLegLST, peerComparison
```

**What the device is actually good at.** Styku has excellent test-retest
precision and moderate individual-level accuracy. A single `%BF` reading can
differ from a clinical DXA scan by roughly 7–11 percentage points, while repeat
scans on the same person agree to well under 1 point. That profile makes it a
strong trend tracker and a poor diagnostic instrument, and client-facing
language should say so — it is a trust asset, because it explains why a number
moves. Circumferences are its most reliable output; segmental composition is its
least, and should never be presented as precise.

Its ALM/ALMI output — the number `alstIndex` reports — was not validated in the
published Styku study at all. Present ALST as a trend metric with a stated
reference floor, never as a graded score.

## Step 3 — The flags

```
ALST < 5.5 kg/m² (women) / < 7.0 (men)  → AT-RISK. Muscle-building becomes the
                                          primary physiological goal.
ALST ≥ threshold                        → within normal reference range. There
                                          is no "optimal" tier for women — the
                                          old ≥7.0 band was the male cutoff
                                          misapplied, and it pathologized normal
                                          muscle mass on a female roster.
BMI < 18.5                              → underweight, flag regardless of body
                                          fat %. Add an explicit eat-above-
                                          maintenance instruction, and never let
                                          a quoted BMR read as an intake target
                                          — BMR sits below maintenance by
                                          definition.
BMI < 18.5 + ALST At-Risk               → sarcopenic-obesity profile, highest
                                          priority.
VFA                                     → trend metric only. The old four-tier
                                          risk table is retired: no consensus
                                          body endorses a single cutoff, and
                                          this device validated VFA against DXA
                                          in kilograms, never against CT in cm².
                                          A single "Very Low" tag under 70 cm² is
                                          acceptable if paired with the caveat.
                                          Waist circumference is the primary
                                          clinical-facing metric.
```

Two zero-cost function screens outrank mass in every consensus algorithm and are
worth adding: grip strength (flag < 16 kg women / < 27 kg men) and the
five-times chair-stand (flag > 15 s).

## Step 4 — Asymmetry and weaker side

The trigger is a **relative gap ≥ 10%** between limbs. The retired 0.5 lb
absolute trigger was firing on measurement noise — the device's own error on leg
lean mass is two to three times larger than that whole threshold, and the
injury literature that actually links asymmetry to outcomes uses 10–15%.

`weakerSide(leftLST, rightLST)` returns `'left' | 'right' | 'even'` and does the
direction comparison only. It does **not** compute the percentage, so a non-even
return is not confirmation the trigger is met — work the percentage out
yourself:

```js
const gapPct = Math.abs(l - r) / Math.max(l, r) * 100;  // ≥ 10 → protocol active
```

When it is active: lower LST is the weaker side; the weaker side leads every
unilateral set; a suitcase carry is held in the weaker hand; log left and right
separately in the `flag` or `cue` field; track it to the 8-week rescan. Present
the lead-with-weaker convention as a coaching convention — it caps the stronger
side's volume at what the weaker side can match — rather than a research-backed
rule, because no source establishes that set ordering changes outcomes.

For a lymphedema-risk client, a segmental LST reading may reflect fluid rather
than muscle; cross-check against symptoms instead of trusting the scan alone.

## Step 5 — Protein and creatine

**Protein is keyed to context, not to age.** The old age-banded escalation
(1.8–2.0 at 40+, 2.0–2.2 at 50+) is retired — the most current female-specific
synthesis finds peri- and postmenopausal athletes likely need no different
target than premenopausal ones.

```
Baseline, active women      : 1.6 g/kg/day
Energy deficit / heavy load : up to 2.2 g/kg/day
ALST At-Risk                : upper end of 1.6–2.2
Per meal                    : ~0.3 g/kg (≈25–40 g), 4 meals, 3–4 h apart
Plant-based                 : add ~10%
```

`proteinTargets()` still implements the retired `atRisk || ageYears >= 50`
trigger, because "energy deficit" and "heavy training load" are not captured as
client fields yet. Known engine gap. Use the function, but write the *rationale*
in the document from the corrected standard — say the escalation is driven by
ALST At-Risk or by deficit, not by the client's age.

**Creatine:** 3–5 g monohydrate daily, no loading phase, taken with food,
saturating in about 4 weeks. Indicated for all women in strength training;
strongly indicated at 40+, ALST At-Risk, or postmenopausal. Always messaged as
paired with resistance training — creatine without training did not increase
lean mass in postmenopausal women over two years. Don't market the standard dose
on cognitive grounds; the trials showing cognitive benefit used substantially
higher doses.

## Step 6 — What the engine fires automatically

| Client field | Fires | Suppress with |
|---|---|---|
| `alstIndex < 5.5` | `proteinBar()` on every day page | — |
| `isPostmenopausal: true` + squat/deadlift/RDL/hip thrust/carry/lunge on the day | `pelvicFloorCallout()` | `day.pelvicFloor: false` |
| `day.forcePelvicFloor: true` | `pelvicFloorCallout()` regardless of status | — |

`forcePelvicFloor` exists for the 45–55 client whose menopausal status is
genuinely unconfirmed. The transition window itself, not confirmed
postmenopausal status, is the higher-risk period for stress incontinence — so
ambiguity should produce caution rather than a default of "not postmenopausal."
Use this field rather than setting `isPostmenopausal: true` on a client who
isn't; the flag is also read by protein logic and by the age-bracket framing, so
falsifying it corrupts more than the one callout you were aiming at.

Anything not in this table is hand-written prose with no engine enforcement
behind it — a cardiac HR ceiling, a rotator-cuff precaution, a stop signal. Those
need the writer's own care, and an audit that greps for contradicting language
rather than just confirming the flag paragraph exists.

## Age bracket quick reference (women)

Brackets are proximity guides, not cutoffs — a 44-year-old postpartum client may
sit closer to the 45–55 profile.

| Bracket | Emphasis |
|---|---|
| 20–35 Foundation | Peak bone mass window — heavy compound lifting counts, and the window closes permanently. Watch energy availability/RED-S in high-volume clients. Universal neuromuscular injury-prevention circuit is highest-yield here. |
| 35–45 Transition onset | Creatine strongly indicated from 40. Watch for early perimenopausal signals — symptoms can begin in the early 30s. Begin ALST/VFA monitoring. From 40, the Full-Spectrum Progression Standard applies. |
| 45–55 Perimenopause | Heavy RT ≥3×/week strongly backed. Status is frequently ambiguous — see `forcePelvicFloor` above. Start LIFTMOR candidacy screening. Full-Spectrum Standard applies. |
| 55–65 Postmenopausal | Pelvic floor triggers on every heavy loading day. LIFTMOR applies if T-score < −1.0, framed as "bone investment." Power training belongs here already, not just at 65+. |
| 65+ | Same as above plus fall-risk and functional transfer: carries, step-ups, single-leg work, explicit power/velocity work. |

**Full-Spectrum Progression Standard (women 40–55 only).** Her program should
show programmed progression across all 10 core Baseline Testing Protocol
movements — Deadlift, Back Squat, Seated OHP, Incline DB Press, Push-Ups,
Farmers Carry, Hip Thrust, Single-Leg RDL, Lunges, Plank Hold. Not every one on
every day; visibly present somewhere across `baselines[]`, the days, and the
summary. A reasonable substitute counts (hex-bar DL for BB DL, goblet squat for
back squat); silence on a movement pattern for the program's whole arc does not.
"Not Tested" is not an exemption — establish a first working baseline instead.
Do not extend this mandate outside 40–55 without a research pass.

## Conditions that already have a dedicated section

Check CLAUDE.md before writing clinical content for any of these; each carries
findings that reverse the intuitive default.

Cardiac · Osteoarthritis (knee/hip) · Scoliosis · Breast cancer survivorship and
lymphedema · Postpartum and diastasis recti · GLP-1 medications · HRT/MHT ·
Perimenopausal screening ambiguity · Pelvic floor · Bone loading (LIFTMOR) ·
Deload weeks · Energy availability and caloric surplus · Vitamin D and calcium ·
Power training · Sleep and recovery.

The recurring pattern across several of them — OA and lymphedema most sharply —
is that the cautious instinct to unload a painful or vulnerable structure is the
outdated one, and progressive loading is core management. Scoliosis is the
explicit exception: there the evidence is genuinely thin in both directions, so
don't pattern-match the others onto it.
