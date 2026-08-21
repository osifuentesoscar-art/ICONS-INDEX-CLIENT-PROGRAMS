# Client Roster & Document Map — Index

**Each client's full record lives in `clients/<client_name>/README.md`**, next to that
client's programs. This file is the index over them.

Split out of a single 272 KB file on 2026-08-21. Every record moved **verbatim** — no
wording was rewritten, summarized, or dropped. The reason is working cost: reading one
client's record used to mean loading all thirty (~68,000 tokens to reach a record whose
median size is ~1,900). Keeping the record beside the program also means a program revision
and its record change in the same folder, in the same commit, so the two cannot drift.

**Where to look:**
- One client — open `clients/<client_name>/README.md`. Nothing else needs reading.
- Across the roster — the tables below, or grep the records directly, e.g.
  `grep -l "At-Risk" clients/*/README.md`.
- Process state (assessment gate, review ledger, clinical constraint register, asymmetry
  log, watchlists) — `CLIENT_OPERATIONS.md`, unchanged.

Columns below are read from the filesystem, not from record prose, so they stay true as
documents are rebuilt. Clinical detail — bracket, ALST/VFA, flags, baselines — lives in
each client's own record.

---

## Active Clients (17)

| Client | Record | Documents | Build script |
|---|---|---|---|
| **Siobhan Hansen** | [`siobhan_hansen/`](clients/siobhan_hansen/README.md) | 1 trainer + 1 client view | `siobhan_hansen_3day_plan.js` |
| **Johnna Macarthur** | [`johnna_macarthur/`](clients/johnna_macarthur/README.md) | 2 trainer + 1 client view | `johnna_macarthur_3day_plan.js`<br>`johnna_macarthur_warmup_protocol.js` |
| **Mary Burfete** | [`mary_burfete/`](clients/mary_burfete/README.md) | 1 trainer + 1 client view | `mary_burfete_2day_plan.js` |
| **Kayma Liburd** | [`kayma_liburd/`](clients/kayma_liburd/README.md) | 1 trainer + 1 client view | `kayma_liburd_2day_plan.js` |
| **Moe Shahheidari** | [`moe_shahheidari/`](clients/moe_shahheidari/README.md) | 1 trainer + 1 client view | `moe_shahheidari_3day_plan.js` |
| **Vinz Feller** | [`vinz_feller/`](clients/vinz_feller/README.md) | 1 trainer + 1 client view | `vinz_feller_3day_plan.js` |
| **Jake Poyner** | [`jake_poyner/`](clients/jake_poyner/README.md) | 1 trainer + 1 client view | `jake_poyner_3day_plan.js` |
| **Rena Paul** | [`rena_paul/`](clients/rena_paul/README.md) | 2 trainer + 1 client view | `rena_paul_2day_plan.js`<br>`rena_paul_assessment_report.js` |
| **August Olivia** ⭐ | [`august_olivia/`](clients/august_olivia/README.md) | 1 trainer + 1 client view | `august_olivia_3day_plan.js` |
| **Johanna Castillo** | [`johanna_castillo/`](clients/johanna_castillo/README.md) | 1 trainer + 1 client view | `johanna_castillo_3day_plan.js` |
| **Kelly Mulroy** | [`kelly_mulroy/`](clients/kelly_mulroy/README.md) | 2 trainer + 2 client view | `kelly_mulroy_5day_plan.js`<br>`kelly_mulroy_travel_plan.js` |
| **Aimee Morris** | [`aimee_morris/`](clients/aimee_morris/README.md) | 1 trainer + 1 client view | `aimee_morris_2day_plan.js` |
| **Petra** | [`petra/`](clients/petra/README.md) | 1 trainer + 1 client view | `petra_3day_virtual_plan.js` |
| **Nancy Avitable** | [`nancy_avitable/`](clients/nancy_avitable/README.md) | 1 trainer + 1 client view | `nancy_avitable_3day_plan.js` |
| **Elizabeth Poyner** ⭐ | [`elizabeth_poyner/`](clients/elizabeth_poyner/README.md) | 2 trainer + 1 client view | `elizabeth_poyner_5day_plan.js`<br>`elizabeth_poyner_improvement_doc.js` |
| **Nicolette Scott** | [`nicolette_scott/`](clients/nicolette_scott/README.md) | 2 trainer + 2 client view | `nicolette_scott_2day_athome_plan.js`<br>`nicolette_scott_2day_plan.js` |
| **Sarah** | [`sarah/`](clients/sarah/README.md) | 1 trainer + 1 client view | `sarah_2day_plan.js` |

---

## Intake Pending — Jason Bethea Clients (10)

Confirmed by Xolokan 8/18/2026: every name appearing in Jason Bethea's SOAP-note archive ("ICONS SOAP NOTES JASON PHYSICAL THERAPIST PDFS" / "ICONS NOTES JASON PDFS" Drive folder — per CLAUDE.md's Studio Staff section, this is Jason's own in-house PT documentation archive, not third-party/external data) is an actual ICONS client, not a non-roster reference. The 10 clients below were previously unaccounted for on the roster. Xolokan's direct instruction: **"create a profile for all the names we don't have, I will upload data slowly as it comes in."**

**These are deliberately thin, honest intake profiles — not training-plan builds.** Per CLAUDE.md's "Never fabricate a 'before' value" standard (and this repo's parallel standard of documenting "Not Tested" honestly rather than inventing a number), none of these 10 clients has a Styku scan or ICONS Baseline Testing Protocol strength battery on file yet (Samantha Swan is the one partial exception — see her entry) — no training plan has been built for any of them, and none should be until real baseline data exists. Each entry documents only what the practitioner's note actually states. A `clients/<name>/` folder was created for each (containing a placeholder README, no document yet) per this repo's existing convention that a folder exists once a client is being tracked. Age-bracket placement below is stated only where both age and sex are confirmed on the note itself — per the Age Bracket Programming Framework's Demographic Scope Rule, a bracket is not assigned where sex is unstated.

| Client | Record | Documents | Build script |
|---|---|---|---|
| **Aparna Rao** | [`aparna_rao/`](clients/aparna_rao/README.md) | — | — |
| **Danielle Purfey** | [`danielle_purfey/`](clients/danielle_purfey/README.md) | — | — |
| **Leslie Russo** | [`leslie_russo/`](clients/leslie_russo/README.md) | — | — |
| **Bevy Smith** | [`bevy_smith/`](clients/bevy_smith/README.md) | — | — |
| **Brandice Daniels** | [`brandice_daniels/`](clients/brandice_daniels/README.md) | — | — |
| **Jerilan Greene** | [`jerilan_greene/`](clients/jerilan_greene/README.md) | — | — |
| **Christina Alesci** | [`christina_alesci/`](clients/christina_alesci/README.md) | — | — |
| **Makai Brown** | [`makai_brown/`](clients/makai_brown/README.md) | — | — |
| **Samantha Swan** | [`samantha_swan/`](clients/samantha_swan/README.md) | — | — |
| **Heather Dolland** | [`heather_dolland/`](clients/heather_dolland/README.md) | — | — |

---

## Legacy Pre-Repo Clients — Triage Pending (3)

CLAUDE.md's legacy "Other Clients" block still lists three names against pre-repo
`/mnt/user-data/outputs/` paths, with zero presence in this file or `clients/` until now.
Today's precedent (all of Jason Bethea's caseload is ICONS; every name in the archive is a
real client) means these three deserve the same triage the 10 intake-pending clients got —
tracked here rather than left invisible in a legacy block. **Their original documents are
NOT on file in this repo** — migration waits on Xolokan uploading each original, per the
Siobhan Hansen / Elizabeth Poyner / Kelly Mulroy migration precedent. Do NOT rebuild any of
them from the one-line legacy descriptions alone; those are titles, not content.

| Client | Record | Documents | Build script |
|---|---|---|---|
| **Kerry Chandler** | [`kerry_chandler/`](clients/kerry_chandler/README.md) | — | — |
| **Daisy Auger Dominguez** | [`daisy_auger_dominguez/`](clients/daisy_auger_dominguez/README.md) | — | — |
| **Audrey Harnagel** | [`audrey_harnagel/`](clients/audrey_harnagel/README.md) | — | — |

---

## Priority Clients

A **⭐ Priority Client** designation (first used 8/11/2026, for August Olivia, at Xolokan's explicit instruction) means: no shortcuts on this client, ever. Concretely — `icons-doc-auditor` runs its full standing checklist on every delivery for her, never an abbreviated pass; `icons-intake-monitor`'s weekly Drive sweep treats her as a standing full-content re-check candidate rather than the normal "only flag if a relevant bracket/topic was touched since her last build" light-touch default; `icons-expert` gives her document tone and clinical accuracy an extra pass before delivery. This is a diligence floor, not a different set of clinical rules — the same ICONS science layer and engine conventions apply to her as to every client. Mark future priority clients the same way, with a one-line reason and date, directly in their roster entry below.

---

## Age Bracket Framework — Verification Pass (8/9/2026)

Checked every client with a known age/weight against the new Age Bracket Programming Framework in CLAUDE.md (added the same day, alongside the ICONS Training Philosophy section). `icons_template.js`'s `proteinTargets()` already implements the exact same tier logic (ALST-at-risk-or-50+ → 2.0–2.2 g/kg, 40+ → 1.8–2.0, else 1.6) — so every script-generated client (August Olivia, Johanna Castillo) was already numerically correct; rebuilding them produced byte-identical text output. **Elizabeth Poyner's hand-maintained doc had a real mislabeled tier** (see her entry below) and was corrected. Aimee, Petra, and Nancy Avitable have no age/weight on file (by design — see their entries) so the bracket framework doesn't apply to them numerically. Kelly Mulroy's file is the byte-identical engine reference standard with no build script and was left untouched.

---

## System Files
- `scripts/icons_template.js` — canonical `.docx` template engine (`buildDocument()`), per `/CLAUDE.md` spec.
  Rebuilt (Aug 2026) against the actual Kelly Mulroy reference `.docx`: compact labeled-paragraph
  callouts (no boxes), a running header/footer, and a single-row week-overview strip.
  Auto-inserts `proteinBar()` (ALST At-Risk clients, every day) and `pelvicFloorCallout()`
  (postmenopausal clients, heavy-loading days) — no manual per-day calls needed.
  Also exports `epley1RM(weight, reps)` / `workingLoad(oneRM, pct, roundTo=5)` for converting
  new PR data into program loads.
- `docs/ICONS_System_Prompt.md` — paste-into-Claude-Projects reference copy of the full system prompt
  (see its editorial note — a few visual details there are superseded by CLAUDE.md)
