---
name: icons-clinical-audit
description: Audit Brace Life Studios ICONS content for clinical claims that current standards have retired or that were never verified — retired ALST/VFA tiers, sex-conflated thresholds, age-banded protein, the 0.5 lb asymmetry trigger, single-clock reassessment language, unverified or retracted citations, and fabricated numbers. Use before any client document ships, whenever CLAUDE.md's science layer is corrected and existing content needs re-checking, whenever someone asks whether a document is still accurate or "does this match our current standards", and as the clinical half of pre-delivery QA that icons-doc-auditor's structural checks cannot see. Trigger on phrases like "is this still right", "check the numbers", "did we update this after the correction", or any mention of retired thresholds, stale clinical language, or citation verification.
---

# ICONS Clinical Audit

A structural audit asks whether a document rendered. This asks whether what it
says is still true.

Those fail differently. A document with a broken table is obvious the moment
someone opens it. A document that confidently reports "ALST 7.23 kg/m² —
OPTIMAL" to a female client renders perfectly, passes every structural check,
and is wrong in a way only someone holding the current standard can see — 7.0
is the *male* at-risk cutoff, and there is no female optimal tier at all. That
document went to a client. This skill exists so the next one doesn't.

## Run the scanner first

```bash
python3 .claude/skills/icons-clinical-audit/scripts/scan_retired_standards.py \
  clients/ scripts/ deliverables/
```

It reads `.docx`, `.js`, `.json`, and `.md`, and flags claims against eleven
retired or corrected standards, each with what the current standard says.
Exit code 1 on any HIGH finding.

It is negation-aware: content that names a retired standard *in order to reject
it* is correct content, and flagging that would train you to ignore the tool.
The check is scoped to the sentence, with the negator required just before the
phrase or within 80 characters after it.

**Expect false positives on CLAUDE.md's own correction paragraphs.** The
Research Update Log quotes retired standards at length in order to explain what
changed, and those quotations sit further from their negation than the window
allows. Run the scanner against client content; read CLAUDE.md findings by hand.

The scanner is a first pass, not the audit. It catches known-shape claims. The
rest of this file is what it cannot pattern-match.

## What the scanner cannot check

**Is the threshold right for *this* client's population?** The numbers are only
meaningful against a demographic frame. A male client scored against the female
ALST cutoff, or a no-demographic-data client given any numeric threshold at all,
produces a document that reads as authoritative and is derived from the wrong
population. Confirm the frame first — `icons-client-docs`'s
`references/clinical-frame.md` has the three cases — then confirm each number
belongs to it.

**Is every number real?** Trace each figure to a source: a tested lift, a scan
value, a derivation via `epley1RM()`/`workingLoad()`. A number with no traceable
origin is the most dangerous thing in these documents, because trainers act on
loads and clients believe percentages. An honest "Not Tested" row is correct; an
invented one propagates into working loads and into the next reassessment.
Watch particularly for a fabricated "before" value in a comparison table — a
metric with only a current value belongs in narrative as a newly established
baseline, not in a before/after row.

**Does every citation exist, and is it correctly attributed?** Verify against
the primary record, not against a secondary summary and not against a reference
document — even one supplied by Xolokan. The pilot Assessment Report carried an
uncited "Skaug et al. 2024" that turned out to be real, but nobody knew that
until someone checked. Separately, one paper is permanently barred: the 2025
Copenhagen Adduction Exercise meta-analysis in *Scandinavian Journal of Medicine
& Science in Sports* was formally retracted (notice 2026;36(4):e70287). Cite
Harøy et al., BJSM 2019;53:150 instead.

**Do the flags that have no engine behind them actually hold?** `proteinBar()`
and `pelvicFloorCallout()` fire from client fields, so they are self-verifying —
the trigger was met or it wasn't. A cardiac HR ceiling, a rotator-cuff
precaution, a stop signal, a staged return ladder: these are hand-written prose
with nothing enforcing them. Don't confirm the flag paragraph exists and stop
there. Grep the whole document for language that would contradict it — a cardiac
ceiling against "max effort", "all-out", "sprint", "HIIT" — and confirm every
hit is a negation rather than a live instruction.

**Does the client copy leak?** Block `intro`/`introLabel` and
`summary.milestones4wk`/`milestones8wk`/`rescanNote` are plain strings with no
`audience` filter, so internal-sounding language written there reaches the
client. Check for dangling references to notes that were filtered out ("see the
note above" pointing at something the client can't see), other clients' names,
and build-rationale that reads as coaching.

## Reporting

Separate what is wrong from what is stale from what you couldn't verify. For
each finding give the claim, why it's wrong now, and what the current standard
says — a finding the reader can't act on is noise.

Fix by editing the build script or `data.json` and re-rendering, never by
patching the `.docx`. A document that has drifted from its source cannot be
regenerated.

**Report; don't quietly rewrite delivered client documents.** A file that has
already gone to a client is a record. Correcting it is a decision with a
conversation attached — whether the client gets a corrected copy, and what
they're told — and that decision is Xolokan's. Say plainly what is wrong and
what regenerating would change.

## When the standard itself moved

If a CLAUDE.md correction just landed, the question is which existing content
still asserts the old version. Run the scanner across `clients/` and `scripts/`,
then sort findings into: content that must change before it ships again, content
that is delivered and needs a decision, and content where the old language is
quoted deliberately. The Research Update Log's own retroactive-scope notes tell
you which corrections were rolled out and which were explicitly deferred — a
deferred rollout is a known backlog, not a new discovery.
