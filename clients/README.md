# Client data convention

One directory per client, holding that client's **current** deliverables and
raw intake. There is no automated pipeline — documents are built by running
the client's script under `scripts/` (see the "ARCHITECTURE — SINGLE-PIPELINE
STANDARD" section of `CLAUDE.md`).

## Folder layout

```
clients/
  <client_name>/
    README.md                              — THE CLIENT'S FULL RECORD: profile, Styku
                                             data, clinical flags, baselines, program
                                             structure, revision history
    intake.md                              — raw notes: Styku dump, PRs, injuries,
                                             schedule, goals (where captured)
    <Name>_<ProgramTitle>.docx             — trainer document
    <Name>_<ProgramTitle>_Client_View.docx — client-facing copy
    <Name>_ICONS_Performance_Assessment.docx — initial baseline report, if built
```

`<client_name>` is lowercase snake_case, e.g. `siobhan_hansen`. Every client has a
`README.md`; for a client with no program built yet it records what is still needed
(usually a Styku scan and/or the strength battery).

`CLIENTS.md` at the repo root is the roster **index** over these records — use it to
enumerate who exists or to answer cross-roster questions, not for per-client detail.

## Adding or revising a client

1. Capture raw intake in `clients/<client_name>/intake.md`.
2. Write or edit the build script at `scripts/<client_name>_<n>day_plan.js`,
   importing `scripts/icons_template.js`.
3. Run it. It writes both the trainer document and the Client View into
   `clients/<client_name>/`.
4. Audit before delivery (`icons-doc-auditor`), then deliver via `SendUserFile`.

## Only current files live here

Regenerate **in place** — overwrite the existing `.docx`. Never keep a second
dated or suffixed copy of a program alongside the live one; git history is the
versioning. Every revision to a client's trainer document regenerates its
Client View in the same pass, so the pair can never drift.

## Cue length rule

Any `cue` field longer than ~50 characters wraps to two lines in the PDF
exercise table. The engine grows the row (no overflow), but keep cues tight
for a clean single-line layout.
