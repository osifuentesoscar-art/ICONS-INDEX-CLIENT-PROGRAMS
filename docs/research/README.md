# ICONS Deep-Research Dossiers

Output of the `/deep-research` harness (27 Opus agents: 15 search across 5 angles × 3 topics,
9 adversarial verifiers, 3 synthesizers). Run 8/20/2026.

## STATUS: NOT CLEARED FOR THE SCIENCE LAYER

These are **research dossiers, not science-layer text.** Nothing here has been folded into
CLAUDE.md, and nothing should be until the blocker below is resolved.

**Blocker — organizational egress policy.** `WebFetch` returned 403-at-CONNECT (policy denial)
for every scholarly host attempted: `pubmed.ncbi.nlm.nih.gov`, `pmc.ncbi.nlm.nih.gov`,
`europepmc.org`, `bjsm.bmj.com`, `jospt.org`, `nejm.org`, `sciencedirect.com`,
`link.springer.com`, `wiley.com`, `jamanetwork.com`, `cochranelibrary.com`, `doi.org`,
Crossref and Semantic Scholar APIs, `gssiweb.org`. Per `/root/.ccr/README.md` this is reported,
not routed around. `WebSearch` works and returns verbatim abstract text, so claims reached
**abstract level but never full text**.

CLAUDE.md's own citation rule — a figure seen only secondhand must be fetched and confirmed
before use — therefore cannot be satisfied in this environment. Every claim carries an explicit
provenance tier; honour it. Unblocking those hosts is the prerequisite for a promotion pass.

A concrete reason to take this seriously: one auditor's own search returned a blended
description of the LIFTMOR trial that was not LIFTMOR. The search-summary channel
demonstrably conflates sources.

## Dossiers

| File | Topic | Commissioned question answered? |
|---|---|---|
| `01_meniscus_and_patellofemoral_pain.md` | Degenerative meniscal tear & patellofemoral/VMO anterior knee pain | Yes |
| `02_women_20_35_peak_bone_mass.md` | Women 20–35 peak bone mass; axial vs non-axial loading | Partly — central substitution question resolved negatively |
| `03_protein_trigger_operationalization.md` | Measurable "energy deficit" / "heavy training load" triggers | **No** — but surfaced two higher-priority defects |

## Highest-value findings

1. **Per-meal protein arithmetic is inconsistent today** (03). `0.3 g/kg × 4 meals = 1.2 g/kg/day`
   vs the stated `1.6` baseline; at 65 kg, `0.3 g/kg = 19.5 g`, below the same line's "≈25–40 g".
   Root cause: the 8/19 change substituted an acute MPS-maximising per-bout dose for a
   daily-adequacy distribution quotient. Fully supported and independent of the egress blocker.
2. **The 8/17 protein correction is more contested than CLAUDE.md presents** (03). The
   peer-reviewed ISSN 2023 female-athlete position stand directs peri/post-menopausal athletes
   to the *upper end* of 1.4–2.2 g/kg/day — the opposite of the premise the correction rests on.
   The driving source (GSSI SSE #270) is non-peer-reviewed industry content, its byline is
   incompletely cited in CLAUDE.md, and its evidence base is one research network.
3. **Do not build a VMO-selective block** (01). A society guideline recommends against EMG
   biofeedback on medial vastii; a head-to-head RCT found VMO-selective equivalent to general
   quadriceps training; a 26-paper review found insufficient evidence the VMO is anatomically
   distinct from vastus medialis longus.
4. **Medial meniscus posterior ROOT tears are a distinct entity** (01) — reported ~95%
   non-operative failure, 53% progression to replacement. Establish body-vs-root and extrusion
   status from imaging before applying the reassuring exercise-vs-surgery literature.
5. **The lumbar spine is the least loading-responsive site in premenopausal women** (02).
   Jumping improves femoral neck BMD but not lumbar spine BMD. No demonstrated non-axial
   substitute exists — because no located modality reliably moves lumbar spine BMD at all.
6. **Adolescent idiopathic scoliosis is associated with persistent generalized low BMD** (02) —
   absent from CLAUDE.md's Scoliosis section, and it raises the value of a baseline DXA.
7. **Heavy loading is untested in these knee conditions, not permitted or forbidden** (01).
   START (n=377) found no pain benefit for 75–90% over 30–40% 1RM in knee OA, with more
   nonserious adverse events in the heavy arm.

## Proposed standing rule (from 01, §7)

A claim's headline framing may never carry more confidence than its own source tier, and any
claim whose corroboration search failed twice is quarantined rather than summarised. Two
auditors independently caught upstream agents promoting `secondary-unverified` claims into
headline conclusions — structurally the same failure as the ALST sex-conflation.
