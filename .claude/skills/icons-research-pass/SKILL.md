---
name: icons-research-pass
description: Run a Brace Life Studios ICONS research pass — check the Evidence-Based Science Layer in CLAUDE.md against current literature, verify or correct existing claims, fill a genuine coverage gap, and append a Research Update Log entry with real citations. Use whenever someone asks to research, verify, re-check, or update a clinical claim or threshold; whenever a new client presents a condition the science layer doesn't cover; whenever a citation needs verifying before it goes into a client document; whenever the daily or periodic science-layer review comes up; and whenever a finding contradicts something already written. Trigger on "is this still current", "check the research on X", "we've never covered Y", "verify this citation", or any question about where a threshold came from.
---

# ICONS Research Pass

The science layer is what every clinical number in every client document rests
on. It has been through seventeen passes, and the ones that mattered most were
*corrections* — a threshold that turned out to be the male cutoff applied to
women, a risk table no consensus body endorses, an age-banded protein
escalation the current literature doesn't support. Each of those was wrong for
months while looking authoritative.

So the job is not "find supporting evidence." It's to find out what's actually
true and change the file when it disagrees.

## Before choosing a topic, check coverage

CLAUDE.md's Research Update Log opens with a **Coverage Index** — topic, last
verified, population scope, and how much of the roster it actually bears on.
Read it first. Its whole purpose is to stop passes from re-researching the
best-covered bracket while genuinely thin areas stay untouched.

Prefer topics that are under-covered *and* represented on the roster. A section
with zero roster clients is proactive framework-building, which is legitimate —
several sections were built ahead of need — but say that's what it is.

## Doing the work

**Search for the primary source, then read what it actually says.** Several
corrections came from someone finally reading the trial rather than the summary
of it: LIFTMOR prescribed >85% 1RM, not the ≥80% this file carried for months.
A secondhand citation is a placeholder, not a citation.

**Record the population.** Most of this file's real errors were scope errors —
a finding true in one group applied to another. Note sample size, sex, age
range, training status, and whether it's an RCT, a cohort, a survey, or expert
consensus. When the evidence is thin, say so in the file rather than writing
around it. "No RCT of progressive resistance training in adults with scoliosis
exists, in either direction" is more useful than a confident paragraph
assembled from adjacent findings.

**Check whether a source has been retracted.** One paper is permanently barred:
the 2025 Copenhagen Adduction Exercise meta-analysis in *Scandinavian Journal of
Medicine & Science in Sports*, retracted 2026;36(4):e70287. If a search surfaces
it, flag it rather than citing it.

**Verify before citing — including sources Xolokan supplies.** A reference
document he provided carried an uncited "Skaug et al. 2024." It turned out real,
but only because someone checked. The check is not optional because of where the
citation came from.

## Corrections need more care than additions

An addition fills a gap. A correction says something the system has been acting
on is wrong, so it carries obligations:

- **State what changed and why**, not just the new value. The next reader needs
  to know whether their existing understanding was wrong.
- **Say explicitly when a pass supersedes an earlier one.** The protein
  correction overturned a reconciliation from four days earlier that had reached
  the opposite conclusion from a less population-specific source. Both entries
  stay in the log; the later one names the earlier and explains what it missed.
  Silently overwriting destroys the record of how the standard evolved.
- **Decide retroactive scope, and write the decision down.** Does existing client
  content need changing? Sometimes yes and immediately — the pelvic floor
  language correction was a framing change requiring no per-client clinical
  re-determination, so every affected document was regenerated the same day.
  Sometimes no, deliberately — the ALST and asymmetry corrections needed
  per-client review of already-delivered clinical content, and were flagged as
  real follow-up rather than swept. Either is fine; an unstated decision is not,
  because the next session can't tell a deferred rollout from an oversight.
- **Flag engine consequences you aren't building.** When a correction outruns
  what the code can express — `proteinTargets()` still keys on age because
  "energy deficit" isn't a client field — say so as a named gap. Don't quietly
  leave the prose and the code disagreeing.

## Writing the log entry

Append to the Research Update Log; never rewrite a dated entry. Each entry
carries: what was checked, what changed (correction / addition / corroboration),
what was verified as already correct and left alone, genuine gaps found and
deliberately not filled, retroactive scope, and the sources as real links.

Recording "checked X, the existing guidance holds up" is a result worth writing.
Two passes reached exactly that conclusion and said so plainly instead of
inventing a change to justify the effort.

Update the Coverage Index's Last Verified column for the topic you touched.
Leave the dated entries alone.

## Scope

This skill maintains the science layer. It does not build or edit client
documents — a finding that affects a client's document gets flagged, and the
change happens through the document pipeline where it can be audited. The one
exception is a correction to shared engine language that applies identically to
everyone regardless of clinical circumstance; even then, say what was
regenerated.
