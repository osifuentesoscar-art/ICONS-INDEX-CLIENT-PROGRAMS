# Engine Reference Artifacts

Frozen, byte-identical copies of client deliverables that `icons_template.js` is
audited against. These are **not** live client documents — they are preserved
measurement standards.

## Why this folder exists (added 8/18/2026)

Before today, `clients/kelly_mulroy/Kelly_Mulroy_5Day_Training_Plan.docx` served
two incompatible roles at once: it was Kelly's actual training program AND the
canonical file the engine gets XML-audited against. That conflict had a real
cost — when a clinically significant finding surfaced for her (a lumbar
hinge-tolerance issue with an explicit stop-signal, documented by Jason Bethea
across three sessions), it could not be added to her program without destroying
the byte-identity the engine audit depends on. She became the only client on the
roster who couldn't receive a safety update, and the only one without a Client
View.

Separating the two roles resolves it. The reference artifact lives here,
permanently frozen and hash-verified. Kelly's live program can then be built and
revised like any other client's.

## Contents

### `Kelly_Mulroy_5Day_Training_Plan_ENGINE_REFERENCE.docx`

- **Frozen:** 8/18/2026
- **SHA-256:** `80e57c36ed32be02f1effde0a3a3e15e7f9c688886291ab819e139a867474fa6`
- **Provenance:** the actual client deliverable Xolokan supplied (Aug 2026),
  byte-identical to what was originally uploaded. Every measurement, color, and
  structural convention documented in CLAUDE.md's engine spec was XML-audited
  directly against this file.
- **Role:** the visual/structural standard for `buildDocument()`. Compact
  labeled-paragraph callouts (no bordered boxes), running header/footer,
  single-row week-overview strip, pale-tint table headers with colored text,
  the gold day-header stripe-tint exception.

**Never edit this file.** If it needs to change, that is a decision about what
the engine's standard *is*, not a routine document update — and it should be
recorded as such, with a new hash.

## Verifying the engine against a reference

Byte-identity is not the right test for a regenerated document — the `docx`
library writes its own zip metadata and timestamps, so a structurally perfect
regeneration will never match byte-for-byte. Compare **structure** instead:
extract paragraph text, table shapes, cell contents, and shading/color values
from both files and diff those.

A passing structural comparison is a *stronger* fidelity guarantee than passive
preservation, because it proves the engine can still reproduce the reference
standard today rather than assuming it can.
