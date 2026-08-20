# Client data convention

This is the input the automated ICONS pipeline watches. Drop a new or
updated client folder here, push it, and the pipeline (see
`my-agent/src/generate.mjs` and `.github/workflows/generate-icons-docs.yml`)
turns it into a `.docx` training plan/report and a luxury PDF in
`deliverables/<slug>/`.

## Folder layout

```
clients/
  <client-slug>/
    intake.md     — raw notes: Styku scan dump, PRs, injuries, schedule, goals
    data.json     — structured ICONS schema (optional — see below)
```

`<client-slug>` is lowercase-kebab-case, e.g. `siobhan-hansen`.

## Two ways to add a client

**1. Raw notes only (`intake.md`)** — write whatever you have: pasted Styku
scan values, PR list, injury notes, schedule. On push, the pipeline calls
Claude (via the Agent SDK) with `docs/ICONS_System_Prompt.md` as the system
prompt to structure your notes into `data.json`, applying the ICONS science
layer (ALST flags, protein targets, weaker-side determination, RIR
language, etc.) automatically. Review the generated `data.json` — it's
committed alongside the deliverables so you can correct it and let the next
push regenerate from your edits.

**2. Structured `data.json` directly** — if you already have the full
schema (e.g. copied from an existing plan), skip the LLM step entirely.
The pipeline detects `data.json` and renders straight to `.docx`/`.pdf`.

See `clients/_template/` for a worked example of both files and the full
schema. The schema is documented in detail in `docs/ICONS_System_Prompt.md`
under "buildDocument() Full Data Schema".

## What triggers regeneration

The pipeline only reprocesses a client when:
- `intake.md` changes and is newer than the last-generated `data.json`, or
- `data.json` changes and is newer than the files in `deliverables/<slug>/`.

State is tracked in `clients/<slug>/.state.json` (auto-generated — do not
hand-edit).

## Cue length rule

Any `cue` field longer than ~50 characters will wrap to two lines in the
PDF exercise table. The engine handles this by growing the row (no
overflow), but keep cues tight for a clean single-line layout.
