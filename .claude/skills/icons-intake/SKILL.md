---
name: icons-intake
description: Take a new or updated Brace Life Studios ICONS client from raw arrival to a build-ready record — reading a Styku scan PDF, a Jason Bethea SOAP/PT note, or pasted numbers; extracting a structured client record; running the mandatory research-coverage check on every condition and demographic; deciding whether the build gate is met; and writing the CLIENTS.md entry and CLIENT_OPERATIONS registers. Use whenever a new client arrives, whenever new data lands for an existing one (a rescan, a re-test, a new SOAP note, a new diagnosis), whenever someone asks "can we build X yet", "what do we still need from her", or "add her to the roster", and whenever intake-pending clients need reviewing. Trigger on any arriving client data even when no document is requested.
---

# ICONS Intake

Intake is where the roster's data quality is decided. Everything downstream —
thresholds, working loads, clinical flags, which framework even applies — is
derived from what gets captured here. A number recorded wrong at intake is
invisible by the time it reaches a client's document, because by then it looks
like every other number.

Twelve of the roster's thirty clients are currently intake-pending. That is not
a backlog of documents; it's a backlog of *data*, and the gate exists so nobody
builds on top of a hole.

## 1. Read what arrived

**Styku scan PDF.** Extract every field into the `styku` shape used by the
engine: `scanDate, bodyFatPct, bodyFatRank, leanMass, leanMassPct, fatMass,
boneMass, bmi, bmr, vfa, shapeScore, shapeScoreLabel, alstIndex, leftArmLST,
rightArmLST, leftLegLST, rightLegLST, peerComparison`. Use Styku's own reported
ALST rather than recomputing it from limb values — they differ, and the reported
one is what the rest of the system expects.

Sanity-check the arithmetic as you go: lean + fat + bone should reconcile to
body weight, and BMI should recompute from height and weight. A scan that
doesn't reconcile is a transcription error, and catching it here costs a minute
instead of propagating into a document.

**Jason Bethea SOAP/PT note.** Pull the findings that change programming:
corrective exercises and the position he used them in, documented tolerances and
staged constraints, stop signals, directional preferences, and any reassessment
he performed — a reassessment in his notes *is* that client's 4-week strength
check. Note what he prescribed as corrective versus non-corrective; that decides
whether his exercise occupies Block Method slot 1 or slot 4.

**Pasted numbers and trainer notes.** The least structured and the most common.
Capture the tested lifts with their actual rep counts (`115x5`, not "115"), and
capture what was *not* tested along with why — "her knee felt off" and "we ran
out of time" produce different documents downstream.

**Never infer a value that wasn't given.** A missing measurement is recorded as
missing. The engine degrades gracefully on absent fields; it cannot recover from
a plausible-looking invention.

## 2. Establish the demographic frame

Before any threshold means anything, determine which framework applies — the
women's brackets, the Male Client Programming Framework, or neither. The three
cases and their consequences are in
`icons-client-docs/references/clinical-frame.md`.

The case that gets mishandled most is a client with **no age and no sex on
file** — several SOAP notes state neither. That is a data gap, not a population
gap: apply only what is genuinely sex- and age-neutral, say so explicitly in her
record, and *ask for age and sex*. They are the two fields that unlock the most
downstream clinical content per unit of effort, and asking is cheap.

## 3. Run the research-coverage check — this is mandatory

For every clinical flag, condition, and demographic on the intake, confirm
CLAUDE.md's science layer actually covers it. If a condition has no dedicated
section, or its section is old enough to warrant re-checking, request a targeted
research pass **before** the document is built.

This is the step that exists to be skipped under time pressure, and skipping it
is how a document acquires clinical-sounding language with nothing under it.
Note that adjacent coverage is not coverage: the osteoarthritis section is
scoped to *diagnosed* OA and does not cover a meniscus tear, patellofemoral
pain, or one session of "her knee felt off" — the Coverage Index says so
explicitly.

## 4. Decide the build gate

The gate for a full training plan is a Styku scan **and** a strength battery.
With neither, there is nothing to derive loads from and no composition priority
to program toward; the Block Method's compound slots have nothing legitimate to
source from.

State the gate's status plainly, and if it's unmet, name exactly what's missing
and what each missing item would unlock. "Intake pending" without that list is
just a shrug. A partial record can still support real work — a Styku read-out, a
corrective block built from Jason's findings, an assessment report where enough
baseline data exists — so say what *can* be built now.

## 5. Write the record

Add or update the `CLIENTS.md` entry: demographics, scan data with its date,
tested baselines, clinical flags with their source and date, framework applied,
gate status, and what's outstanding. This entry is what every future session
reads first, so it carries the reasoning, not just the values.

Then update the `CLIENT_OPERATIONS.md` registers the intake touches — the
assessment gate, the reassessment ledger, the clinical constraint register, the
asymmetry log, the ALST watchlist, the nutrition tracker. A flag that lives only
in a build script's header comment is invisible to every process that isn't
reading that file.

## What to hand back

A short summary of what arrived, what the frame is, which flags fired, whether
the gate is met, and the specific list of what's still needed. If a clinical
conflict surfaced — new data contradicting something already documented — flag
it rather than merging it silently. That rule exists because a silent merge once
overwrote a real clinical finding, and nobody could tell afterward which version
had been right.
