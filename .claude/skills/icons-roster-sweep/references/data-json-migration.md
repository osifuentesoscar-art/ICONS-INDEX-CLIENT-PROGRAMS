# Migrating a client from a hand-written script to `data.json`

## Why

Twenty-five clients are hand-written JS totalling ~12,800 lines. Every standards
change has to be applied by hand to each one, which is exactly why the drift
scanner finds fourteen cable references and ten retired asymmetry triggers still
sitting in the roster. At fifty clients that becomes twenty-five thousand lines
and the drift stops being recoverable.

Three clients already use the better pattern: `intake.md` → `data.json` →
rendered by `my-agent/engine/render.cjs`. And the shape of `data.json` is
already **exactly** `buildDocument()`'s data schema, so the migration is mostly
mechanical rather than a redesign.

## The prerequisite, already applied

`render.cjs` used to require `./icons_template.cjs` — a fork last updated 8/7
that hardcodes `alstStatus()` and `vfaStatus()`, stamping retired tiers
("OPTIMAL", "MODERATE RISK") onto every document rendered through it. That is
how a female client's document came to report her ALST as "OPTIMAL" against the
*male* 7.0 cutoff.

It now requires `../../scripts/icons_template.js`. Verify before migrating
anyone else:

```bash
node my-agent/engine/render.cjs clients/<name>/data.json /tmp/check.docx
python3 .claude/skills/icons-clinical-audit/scripts/scan_retired_standards.py /tmp/check.docx
```

## Converting one client

The build script already computes a `data` object and hands it to
`buildDocument()`. The migration is to serialize that object and keep everything
else.

```bash
node -e "
  const path='scripts/<client>_3day_plan.js';
  // Most scripts end with: const data = {...}; async function main(){...}
  // Temporarily export it, or require the script with main() stubbed, then:
  require('fs').writeFileSync('clients/<client>/data.json',
    JSON.stringify(data, null, 2));
"
```

Then render and diff against the existing document. **The migration is only
complete when the rendered output matches** — byte-identical is not required
(the live engine has fixes the old one lacked), but every load, cue, flag, and
clinical note must survive. Confirm with the structural audit plus a text diff,
not by eyeballing.

## What does not survive serialization, and matters

**Computed values.** Scripts that call `epley1RM()`/`workingLoad()` compute loads
at build time. Serializing produces the resulting numbers and loses the
derivation. Keep the derivation visible: record the tested lift and reps in the
client record, and state the arc in the `load` field (`"Wk1: 180 → Wk4: 210"`)
so the number remains traceable rather than becoming a magic constant.

**The header comment.** The 100–200 line clinical audit trail at the top of a
build script is the reasoning behind the program — which bracket applies and
why, what each flag does, what was deliberately omitted. JSON has no comments.
Move it to `intake.md` alongside `data.json`; do not drop it. That comment is
frequently the only record of why a judgment call went the way it did.

**Client View generation.** `render.cjs` renders one document. A migrated client
still needs the `viewMode: 'client'` copy, so either extend the renderer to emit
both or keep a per-client build step that does.

## Order of migration

Migrate a client when you are already touching them for another reason — the
expensive part is re-reading the record and verifying output, and that cost is
already paid during a sweep. Migrating for its own sake risks a silent content
change on a client nobody was asking about.

Good first candidates are clients whose scripts are already fully current (no
residue in the drift scanner), because a clean before/after diff is unambiguous.
Leave the most drifted clients until after their content is corrected — migrating
a stale document just relocates the staleness.
