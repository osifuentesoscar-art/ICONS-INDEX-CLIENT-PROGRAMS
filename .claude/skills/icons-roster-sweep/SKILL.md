---
name: icons-roster-sweep
description: Measure and work down standards drift across the whole Brace Life Studios ICONS roster — which clients are missing a Client View, still carry a retired threshold, lack derived loads or a Wk1→Wk4 progression, haven't been restructured to the ICONS Block Method, or still reference equipment the studio doesn't have. Use whenever a standard changes and existing clients need bringing current, whenever someone asks "who still needs X", "which clients are behind", or "roll this out to everyone", when planning a batch of revisions, or when auditing whether a rollout that was declared done actually reached every client. Also use before onboarding a partner or generating any claim about roster-wide consistency.
---

# ICONS Roster Sweep

Standards move faster than documents. A correction lands in CLAUDE.md, gets
applied to whichever client prompted it, and every other client keeps asserting
the old version until someone touches that file again. Nothing surfaces that
gap — a stale document renders perfectly and passes structural QA.

The roster is 30 clients across ~12,800 lines of hand-written build scripts.
At that size "touch it, bring it current" is a hope unless something measures
whether it happened.

## Measure before you plan

```bash
python3 .claude/skills/icons-roster-sweep/scripts/roster_drift.py --repo .
```

Three sections: **adoption** (how many scripts carry each current standard),
**residue** (how many still carry a retired one), and a **work order** sorted by
how far behind each client is. Add `--client NAME` for one client, `--json` to
pipe it somewhere.

Trainer-education and system documents are excluded from client-only checks —
they get no Client View and client cadence language doesn't apply to them.

Read the numbers before deciding what to sweep. A standard adopted by 14 of 20
is a rollout that stalled; one adopted by 2 of 20 is a pilot that was never
rolled out at all, and those need different conversations.

## What the counts don't tell you

The scanner matches text. It cannot tell whether a client *should* have a
standard applied:

- A client with no tested lifts has nothing to derive loads from, so "missing
  derived loads" is correct for her, not a defect.
- A trainer-directed format (Sarah's circuit programming, set by her trainer
  Nick) is not converted to the Block Method by default.
- A clinically-led client gets the clinician's structure first, with house
  architecture fitted around it.
- A virtual or home-gym client programs against her own equipment, so a studio
  ceiling or a Kieser rename doesn't apply.

Check each candidate against `CLIENTS.md` before putting it in a batch. A sweep
that "fixes" a deliberate exception is worse than one that skips it.

## Sweeping

Work in small audited batches, not roster-wide passes. Each batch:

1. Pick 2–4 clients from the work order that genuinely warrant the change.
2. For each, read the `CLIENTS.md` entry and the current script first — the same
   step that catches a client having more data on file than the sweep assumed.
3. Edit the build script (or `data.json`), never the `.docx`.
4. Re-render, then run both audits — structural
   (`icons-client-docs/scripts/audit_docx.py`) and clinical
   (`icons-clinical-audit/scripts/scan_retired_standards.py`).
5. Regenerate the Client View alongside every training plan, every time.
6. Re-run the drift scanner to confirm the batch actually moved the number.

**The same-touch mirror rule.** A client with more than one live document — a
studio plan and a travel plan, a gym plan and an at-home plan — gets every one
of them touched in the same pass. Half-updated pairs are how a client ends up
holding two documents that disagree.

**Bring the whole file current when you touch it.** If you're in a script to
rename a cable reference, also fix the cadence language, the load-field
convention, and the deload placement while you're there. The expensive part is
reading the client's record and re-verifying the output; the marginal fix is
nearly free.

## Reporting a sweep

Say what moved, what you deliberately skipped and why, and what's left. A
rollout reported as complete when four clients were skipped for good reasons is
a worse record than one that names them — the next sweep re-discovers them from
scratch otherwise.

Update `CLIENTS.md` and `CLIENT_OPERATIONS.md` to reflect what actually changed.
Those files are the roster's memory; a sweep that doesn't land there didn't
happen as far as the next session is concerned.
