---
name: icons-male-framework
description: The Male Client Programming Framework: male age brackets, EWGSOP2 male ALST cutoff, protein and creatine targets for men, testosterone/TRT framing, male VFA/BMI/body-fat references, bone loading and power training in men. Load whenever building or revising a document for a male ICONS client, per CLAUDE.md's Demographic Scope Rule.
---

## MALE CLIENT PROGRAMMING FRAMEWORK

Built 8/11/2026 in response to Xolokan's explicit request, after Jake Poyner's and Vinz Feller's documents both correctly *scoped out* the women's numeric thresholds but left no substitute in their place — meaning a male client's ALST, VFA, BMI, and protein needs were being reported with no clinical interpretation at all, just raw Styku numbers. This section fixes that gap and is now the standing reference for any male client, present or future.

**Standing trigger — this is proactive, not reactive.** Whenever a new client falls outside both the women's Age Bracket Programming Framework above and this section (a different sex/gender scope, an age population neither framework covers, etc.), research and build out that population's framework in this file *as part of onboarding them* — the same way this section was built for Jake and Vinz — rather than shipping another document that just says "thresholds not applied" with nothing to replace them. "We need to be ready for any client at any time" (Xolokan, 8/11/2026) is the operating principle, not a one-time backfill.

**How this differs structurally from the women's framework, and why.** The women's Age Bracket Programming Framework is built around a hormonal cliff — perimenopause/menopause — which justifies five brackets tied to a fairly predictable timeline and a set of threshold escalations (protein, creatine, bone-loading candidacy) that trigger around that transition. Men do not have an equivalent cliff. Total testosterone decline with age is gradual, and its population-level shape is genuinely less settled than the menopause literature: the commonly cited figure is roughly 1–2%/year from age 30 (cumulative ~20–30% loss of peak T by age 50), but at least one published normative-modeling study found *increasing variance* rather than a clean population-level decline after age 40 — i.e., individual variation matters more than a fixed age curve for men, the same way this file already tells trainers to autoregulate women's training around individual symptoms rather than a calendar. That's why this section uses a flatter, three-bracket structure instead of mirroring the women's five, and why none of its brackets carry a hard numeric trigger the way "postmenopausal" does for women.

### Male Age Bracket Structure

**20–39 — Foundation**
- No unique physiological trigger in this window; apply standard resistance-training protocol (ACSM 2026 RIR model, ≥10 sets/muscle/week hypertrophy target, sex-neutral) at full intensity.
- Protein/creatine/ALST: see thresholds below — no age-based escalation needed yet.
- The women's ACL/knee-valgus corrective-priority emphasis in this file (2.8× female incidence, a universal neuromuscular circuit per the corrected trigger above) is a *female-elevated-risk* finding specific to the cited meta-analysis — do not apply that same weighting/priority to a male client by default. General movement-quality coaching (correcting an obvious fault observed during training) still applies to anyone; the elevated-risk/mandatory-circuit emphasis does not transfer.
- Copenhagen plank / adductor injury prevention is sex-neutral (Harøy et al. 2019 cluster-RCT, BJSM 53:150, studied male and female athletes) and remains highest-yield for athletic/team-sport clients in this bracket regardless of sex.

**40–59 — Midlife Androgen Decline & Sarcopenia Onset**
- Protein: reasonable to trend toward the upper end of the general resistance-trained-male range (see below) as anabolic resistance with age is a real, if more gradual, phenomenon in men too — there just isn't a single hormonal-transition trigger the way "crossing 40" or "postmenopausal" functions for women, so treat this as a soft trend, not a hard tier change.
- Late-onset hypogonadism (LOH) / "andropause" becomes a relevant screening conversation here, especially by the 50s — but it is a clinical diagnosis requiring both persistent symptoms (low libido, fatigue, unexplained muscle loss, mood changes) AND confirmed low morning testosterone on bloodwork, not something inferred from a Styku scan or training performance. Flag it as a referral conversation, the same way this file treats HRT for women: not ours to diagnose, but worth knowing what the training evidence says (see "Testosterone & Resistance Training" below).
- ALST monitoring becomes a priority in this window, same rationale as the women's 45–55 bracket — sarcopenia risk begins rising, even before any hormonal diagnosis is on the table.
- If a client reports a cardiac history or diagnosis, see "Cardiovascular / Cardiac Considerations in Resistance Training" in the Evidence-Based Science Layer above — its RT-safety evidence (AHA 2023, ACSM 2026) is not sex-differentiated and applies directly; average CVD-risk onset runs earlier in men than the postmenopause-linked rise documented for women, so this conversation is reasonably relevant starting in this bracket rather than later.
- Vinz Feller (age 50) sits in this bracket.

**60+ — Older Male / Bone-Density Priority**
- Bone loss in men becomes clinically significant later than in women — typically described in the literature as emerging in the "seventh decade and beyond" rather than tracking a menopause-adjacent transition — which is consistent with standard osteoporosis screening guidance generally starting at 65+ for men (or 50–64 with additional risk factors), later than the postmenopausal-window trigger used for women in this file.
- Bone loading: see "Bone Loading in Men" below — apply the same "bone investment" framing used for women, with the evidentiary caveats noted there.
- Power training for fall-risk/longevity applies directly and with strong evidentiary backing — see "Power Training — Men" below; unlike the women's WHISH-cohort fall-risk citation (women 75+, women's-health-specific cohort), the core power/mortality citation for this bracket is a mixed-sex study in which men were the majority of the sample, so it transfers to men directly rather than by analogy.
- If a male client reports pelvic floor symptoms (most commonly post-prostatectomy in this age range), treat it as an individual clinical flag and refer to pelvic floor PT — the same "stop and flag your coach, this is common and treatable" language used for women applies, but do NOT auto-trigger it the way `pelvicFloorCallout()` does for postmenopausal women; there is no equivalent universal age/sex trigger for men, so this stays a documented individual flag, not a bracket-driven default.

### ALST Index (Appendicular Lean Soft Tissue) — Men, EWGSOP2 2018
```
< 7.0 kg/m²  → AT-RISK for sarcopenia (EWGSOP2's male ASM/height² low-muscle-mass cutoff)
≥ 7.0 kg/m²  → Not At-Risk
```
EWGSOP2 sets the low-muscle-mass cutoff at ASM/height² < 7.0 kg/m² for men and < 5.5 kg/m² for women — the same source already cited for the women's threshold in this file. This confirms Vinz Feller's Styku report (ALST 7.55 kg/m², labeled "Not At-Risk") is consistent with the standard clinical cutoff, not a Styku-specific number.

**Genuine gap — no three-tier subdivision found for men.** The women's ALST table above splits into three tiers (At-Risk / Normal-monitor / Optimal ≥7.0). The literature search for this pass did not turn up a comparably-cited three-tier subdivision for men — EWGSOP2 gives a single binary threshold (<7.0 at-risk / ≥7.0 not-at-risk), used alongside grip strength (<27 kg = low) and physical-performance testing to stage probable vs. confirmed vs. severe sarcopenia, not to sub-divide the "not at-risk" range the way this file does for women. Do not invent an "optimal" male ALST number. Treat a value close to the 7.0 line with the same clinical judgment used for any borderline finding, not a numbered tier.

### Protein Targets — Men (ISSN 2017 position stand + Morton 2018 meta-analysis)
```
General resistance-trained men     : 1.6–2.2 g/kg/day
  (ISSN 2017: 1.4–2.0 g/kg/day sufficient for most exercising individuals;
   Morton et al. 2018 meta-analysis/meta-regression, 49 trials, 1,863
   participants — the same meta-analysis already cited for the women's
   1.6 g/kg tier in this file, and its underlying trial pool was not
   sex-restricted — dose-response plateau ~1.62 g/kg)
Caloric restriction / cutting      : 2.3–3.1 g/kg/day to maximize lean-mass
  retention (ISSN 2017) — higher than maintenance, mirrors the logic (not
  the exact number) behind the women's ALST At-Risk escalation
Per meal                            : ~0.4 g/kg (leucine threshold — mechanism
  is not sex-specific)
Distribution                        : 4+ meals/day
```
No single age-based tier escalation (unlike the women's 1.6 → 1.8–2.0 → 2.0–2.2 progression tied to the 40/postmenopausal thresholds) is cited in the literature for men specifically — trend a 40–59+ client toward the upper end of the 1.6–2.2 g/kg range as a matter of sound practice given general anabolic-resistance-with-age findings, but do not present it as a cited hard tier the way the women's brackets are.

### Creatine — Men
```
Dose     : 3–5g monohydrate daily (no loading phase needed) — identical to
           the women's protocol; sex-specific dosing differences are not
           supported by the literature reviewed (men and women show
           comparable creatine-transporter saturation and comparable
           strength/performance benefit at standard doses)
Indicated: all resistance-trained men, same as women
Benefits : strength, power, cognition — well-supported, same evidence base
           already cited in the women's Creatine section (the 2025
           Nutrition Reviews systematic review and the 2025 Tandfonline
           older-adults/clinical-populations review were not sex-restricted)
Bone     : GENUINE GAP — no dedicated male-specific creatine + BMD RCT was
           found in this pass. The "mixed evidence" note in the women's
           Creatine section (2-year RCT showing no BMD benefit over
           placebo) was generated in postmenopausal women specifically.
           Do not assume it transfers to men either direction — treat
           creatine's bone effect in men as simply unverified, not as
           "probably mixed like the women's data."
```

### Testosterone & Resistance Training — the Male Physiological Analog to Perimenopause/Menopause
```
Client question to expect: "Should I look into TRT, or does training cover
  it?" — not ours to answer clinically (same posture as the women's HRT
  section), but the training-specific evidence is worth knowing.
Decline: total testosterone commonly cited as declining ~1-2%/year from
  age 30 (cumulative ~20-30% loss of peak T by age 50) — but this is
  LESS settled than it's often presented: a published normative-modeling
  study (Sartorius et al.) found increasing population VARIANCE rather
  than a clean age-linked decline after age 40. Treat age as a loose
  proximity guide for this conversation, not a determinant — same
  posture this file already takes toward perimenopause symptom onset
  timing for women.
Late-onset hypogonadism (LOH): a clinical diagnosis requiring persistent
  symptoms (low libido, fatigue, unexplained muscle loss, mood changes)
  PLUS confirmed low morning serum testosterone — not inferable from a
  Styku scan, training performance, or age alone. Flag for medical
  referral when a client raises it; do not diagnose or imply diagnosis.
Finding — exercise vs. TRT: in men 50-70 with low-normal serum
  testosterone, structured exercise training produced SUPERIOR outcomes
  to testosterone treatment alone for aerobic fitness, muscular strength,
  and total/visceral fat mass. Testosterone treatment alone and exercise
  alone had SIMILAR impacts on lean body mass. Adding testosterone
  treatment on top of exercise training gave NO additional benefit for
  any of these outcomes over exercise alone (Hildreth et al., Sports
  Medicine - Open, 2024).
Nuance — very old/frail men: a separate 52-week RCT in frail men 70+ with
  confirmed low T found testosterone + progressive resistance training
  reduced fatigue vs. controls, but the combined group did NOT
  significantly outperform other groups on a physical-performance test
  (30-second Sit-to-Stand) — i.e., evidence for training synergizing with
  TRT is more mixed in frail very-old men than the 50-70 low-normal-T
  finding above suggests. Do not over-generalize the "exercise beats/
  matches TRT" framing to a frail 75+ client without flagging this
  nuance.
Framing: mirror the women's HRT framing exactly — "on or off TRT, the
  resistance training half of this is doing real, evidenced work for
  your strength, fitness, and body composition" is accurate and
  supportive; "you don't need TRT because of this program" is not ours
  to say.
```

### VFA (Visceral Fat Area) — Men
```
The women's VFA table above (< 70 Very Low Risk / 70-99 Low Risk /
100-149 Moderate Risk / ≥ 150 High Risk cm²) applies to men WITHOUT
adjustment. The ~100 cm² visceral-obesity threshold underlying this scale
(Japanese Examination Committee of Criteria for "Obesity Disease", and
the large-scale VACATION-J population study) was validated as predicting
obesity-related cardiovascular risk factor accumulation "irrespective of
gender, age, and BMI" — unlike ALST/protein/creatine, VFA risk banding is
not sex-differentiated in the literature reviewed. No separate male VFA
table is needed; use the existing one.
Waist circumference (if reported/measured): the equivalent visceral-
adiposity waist-circumference cutoffs DO differ by sex — commonly cited
as ≥40 in (102 cm) for men vs. ≥35 in (88 cm) for women for elevated
cardiometabolic risk — flag this if a client's circumference data is
ever interpreted directly rather than through VFA.
```

### BMI & Body Fat % — Men
```
BMI category thresholds (< 18.5 Underweight / 18.5-24.9 Normal / 25-29.9
Overweight / ≥ 30 Obese) are NOT sex-specific per WHO classification and
apply to men without adjustment — same table as the women's section
above. The same caution already implicit in this file for muscular/
athletic clients applies with EXTRA force to men: a 2025 analysis found
standard BMI cutoffs substantially over-flag muscular male athletes as
overweight/obese relative to their actual body-fat-percentage-based
classification — read BMI alongside Styku body fat % and ALST, never
BMI alone, for any visibly muscular male client.

Body fat % reference (ACE classification, men — genuinely different
numbers than would be used for a woman, since Styku's peer-comparison
label like "Average" doesn't tell a trainer whether that's objectively
healthy):
  Essential fat : 2-5%
  Athletes      : 6-13%
  Fitness       : 14-17%
  Acceptable    : 18-24%
  Obese         : 25%+
```

### Bone Loading in Men
```
Finding: a 2024 systematic review (13 articles from 6 trials) found
  regular resistance and impact training of varying duration (6-18
  months) maintained or improved BMD in men with osteopenia/osteoporosis,
  with additional benefits to mobility/balance function (Archives of
  Rehabilitation Research and Clinical Translation, 2024). Resistance
  training outperformed other modalities tested (whole-body vibration,
  traditional Chinese exercise) in the same review.
Genuine gap: no male-specific RCT replicating LIFTMOR's exact protocol
  (≥80-85% 1RM, 5×5, 2×/week, supervised) was found in this pass. The
  2024 review's included trials varied in duration and were not confirmed
  at LIFTMOR's specific loading intensity. Treat "apply the same %1RM
  bone-investment framing to a male client" as a reasonable extrapolation
  from "high-intensity resistance training benefits bone in men" — not as
  an evidenced identical protocol the way LIFTMOR is for postmenopausal
  women.
T-score candidacy: the numeric thresholds transfer (T-score < -1.0
  osteopenia / < -2.5 osteoporosis, WHO), but the reference database
  differs — clinical guidance recommends T-scores in men be derived from
  a MALE-specific normative database, not the female young-adult
  reference the WHO standard was originally built on. Male osteoporosis
  more often has an identifiable secondary cause (hypogonadism,
  glucocorticoid/steroid use, alcohol) worth flagging for medical
  workup rather than assuming primary age-related bone loss by default.
Anatomical note: men retain more trabecular bone connectivity with age
  (steady trabecular thinning) vs. the loss of trabecular connectivity
  more characteristic of postmenopausal women's bone loss pattern — cited
  as a reason male bone loss becomes clinically significant later, not
  as a reason to skip loading.
```

### Power Training — Men
```
Finding: the same Mayo Clinic Proceedings 2025 study already cited in
  the women's Power Training section (relative muscle power predicting
  mortality more strongly than relative strength) was a MIXED-SEX cohort
  in which men were the majority (2,636 of 3,889 participants, 67.8%),
  and the finding held for men directly: hazard ratio for lowest-vs-
  highest relative power category was 5.88 for men (6.90 for women),
  vs. 1.62 for relative strength in men. This citation applies to male
  clients directly, not by analogy — unlike the WHISH fall-risk cohort
  in the women's section, which is a women's-health-specific study and
  does NOT get cited for a male client without a separate source.
Protocol: same as the women's section — sub-maximal load (30-50% 1RM)
  moved with maximal intent, full recovery between sets. No evidence
  reviewed suggests a different protocol for men.
Applies to: the 60+ bracket onward for men, consistent with the same
  "power declines before strength, don't wait" logic already established
  for women — though note the underlying cohort's age range (46-75)
  means the evidence base itself doesn't specifically validate waiting
  until 60 either; 60+ is this file's judgment call for where to
  prioritize it in a male client's programming, not a hard cited cutoff.
```

---
