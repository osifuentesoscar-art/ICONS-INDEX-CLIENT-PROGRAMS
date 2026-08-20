# Training Plans — `buildDocument()`

## Contents
- [Data schema](#data-schema)
- [Block Method session architecture](#the-icons-block-method)
- [Antagonist Rotation Rule](#antagonist-rotation-rule)
- [Intensity framework](#intensity-framework)
- [Loads and progression](#loads-and-progression)
- [Studio equipment](#studio-equipment)
- [Client View](#client-view)
- [Script shape](#script-shape)

## Data schema

```js
{
  client: {
    name, programTitle,          // "5-DAY TRAINING PLAN"
    subtitle,                    // cover + running header
    schedule,                    // "Tue/Wed/Thu/Fri Gym" — running footer
    stats: [],                   // ["Age 35", "5'4\"", "152 lbs"] — one "·"-joined line
    weightKg, ageYears, isPostmenopausal, bmr, alstIndex,
  },
  styku: { /* see clinical-frame.md */ },      // optional
  weekOverview: [{ day: 'TUE', intensity: 60|70|80|90|'AR'|'Off', focus }],
  baselines: [[lift, baseline, testedAt, eightWkTarget]],
  baselineNotes: [{ type, label, body, audience? }],
  includeNutritionBlock: true,
  includeProgressionBlock: true,
  days: [{
    intensity, title, subtitle, descriptor,
    intensityLabel, intensityPara,
    warmUp, coolDown, iconsNote,
    pelvicFloor?: false, forcePelvicFloor?: true,
    badge?: { label, sub },
    blocks: [{
      letter: 'A', title, color?, introLabel?, intro?,
      exercises: [{
        name, sets, reps, load, tempo, rest, cue,
        flag?, flagAudience?, insight?, insightAudience?, rirNote?,
      }],
    }],
  }],
  summary: { subtitle, rows, milestones4wk, milestones8wk, rescanNote },
  viewMode?: 'client',
}
```

`baselineNotes[].type` is one of `green | gold | red | teal | blue | purple |
clinical | watch | clear`. An item may instead carry `{ render: [...] }` with
pre-built paragraphs — that is how `maleNutritionNote()` and `testosteroneNote()`
splice into the declarative schema.

`badge` overrides the day-header badge for days that aren't %-graded (letter-named
days, "BASE TEST"/"RE TEST"). Keep `sub` a real intensity indicator — a
qualitative level like "MODERATE" or a working range like "RPE 6–8" — rather than
a bare placeholder. The badge is where a reader looks first for the day's
intensity.

Cues run to about 50 characters. Longer text wraps to a second line, which
changes row height and is the origin of most layout problems.

**Callout color assignments.** Gold for general coaching and ICONS Notes; green
for baseline notes, PRs, and cleared status; red for shoulder flags, corrective
priorities, near-maximal notes; teal for Styku and assessment findings; blue for
cool-down and recovery; purple for pull-up pathway and posterior chain.
`clinicalFlag` for ALST At-Risk, BMI underweight, RED-S; `watchFlag` for
asymmetry alerts and pelvic floor safety; `clearFlag` for cleared status and
milestones. Warm-Up is always `C.warmGreen` regardless of the day's intensity,
and the intensity paragraph always takes the day's own accent — the engine
handles both.

Block headers: omit `color` for primary strength blocks (inherits the day's
accent); `'red'` for a corrective circuit tied to a flagged fault; `'gold'` for
generic accessory/stability/mobility; `'green'` for a block tracking a
baseline/PR metric. On Active Recovery days leave every block uncolored.

Callouts are compact labeled paragraphs — a bold colored label run followed by
regular dark body text. No bordered or shaded boxes anywhere in a training plan,
including the most severe clinical flags. (The Assessment Report deliberately
does the opposite; that's scoped to that document type.)

## The ICONS Block Method

The standing per-day block order:

```
1. CORRECTIVE         client-specific, sourced from her actual findings — Jason
                      Bethea's SOAP notes, Styku asymmetry, movement flags. Omit
                      the slot honestly when the day has no documented finding
                      for its region; never fill it with generic filler.
2. PRIMARY COMPOUND   the day's main lift, drawn from the 10 core movements
3. ACCESSORY          hypertrophy work supporting the primary
4. JASON'S EXERCISE   conditional — a documented exercise from his SOAP notes,
                      keeping continuity with his in-house PT work. Omitted
                      entirely when there is none. When his documented exercises
                      are themselves corrective, they live in slot 1 in his
                      prescribed position and slot 4 is omitted — no double
                      placement.
5. SECONDARY COMPOUND a second compound in a different movement pattern
6. THIRD COMPOUND —   the closer: a loaded carry, a hinge-to-carry or
   INTEGRATION        squat-to-press complex, or a power expression of the day's
                      primary pattern. Carries and bracket-mandated power work
                      live here by default. Metabolic finishers may follow.
```

Four design requirements: it must improve the ICONS Index (compound selection
drawn from the 10 core movements with real programmed progression); hypertrophy
across every major muscle group in bodybuilding format (≥10 sets/muscle/week
where the day count supports it); built from all angles (pressing across
incline/flat/overhead, pulling across vertical/horizontal, hip work across
hinge/thrust/abduction); and smooth — no awkward equipment or position jumps
mid-block.

Every client's implementation is built from her own three data sources: Styku
scan, Jason's SOAP notes, and ICONS Index results. Same skeleton, no two
identical programs.

**Compound-slot options menu.** Every compound slot carries 2–4 same-pattern
alternates in the block `intro` (or an exercise `insight`), so the coach running
the session can rotate by equipment, tolerance, and that day's readiness. Three
constraints: the ICONS-Index-tested movement stays the progression anchor and is
what gets retested; options are filtered by the client's clinical constraints
*before* they're listed; and same-pattern means same-pattern — a squat slot
offers squat variants, a hinge slot hinge variants. Two honest options beat four
decorative ones.

**What this does not override.** A clinically-led client gets the clinician's
structure first, with this architecture fitted around it. A trainer-directed
format (Sarah's circuit format, set by her trainer Nick) stands as directed.

**Shoulder-reintroduction addendum.** When a client returning from shoulder
rehab has a reintroduced overhead press in the primary slot, follow the press
with a static closed-chain stability hold — plank shoulder taps, with quadruped
variants as the regression. After loading the shoulder open-chain overhead, the
closed-chain isometric re-anchors scapular control under a stable base, and it
matches Jason's own documented progression for shoulder clients. This pairing is
the prescription, not an Antagonist Rotation problem — a bodyweight stability
drill sits outside that rule's scope. Scapular retraction blocks get a real menu
(band pull-apart, retraction-depression hold, scapular dead hang, scapular
push-up, prone I/T/W, face pull, wall slide, chest-supported scap row), not one
default drill repeated.

## Antagonist Rotation Rule

Within a Compound-zone block, never stack three consecutive exercises loading
the same primary muscle group or movement pattern. Rotate to an antagonistic or
complementary pattern instead — push↔pull, hip-dominant↔knee-dominant,
upper↔lower.

The third consecutive same-pattern exercise is exactly where accumulated
joint and connective-tissue stress and technical fatigue peak, with the least
fresh stabilization left to control it. Rotating lets the just-worked group
recover passively while training density stays high. It changes order, not
volume, load, or exercise selection — resequence, never drop an exercise the
programming calls for.

- Two in a row is fine (a primary lift plus a close accessory in the same
  pattern). It's the third that's the problem.
- Exempt: grip and skill-progression sequences — the close/standard/wide-grip
  assisted pull-up battery, an incline-push-up → full-push-up → dip regression.
  One movement progressing through difficulty is not three heavy compound lifts
  stacked for convenience.
- Isolated-zone and corrective blocks aren't bound the same way; concentrated
  work on one weak muscle group is often the block's actual purpose.
- Not waived for advanced or elite trainees. Heavier absolute loads make the
  same accumulation mechanism higher-stakes, not lower.
- **Walk the rule on the full rendered day, across block boundaries.** The Block
  Method produces more blocks per day, which means more boundaries. Checking
  each block in isolation misses violations that span A→B. Inline comments
  claiming compliance are not evidence — read the day as the client will
  perform it, in order.

## Intensity framework

| Day | Color | Philosophy |
|---|---|---|
| 60% | Teal | Technique day — form over load. No PRs. Natural vehicle for a bone-loading ramp-in. |
| 70% | Green | Moderate — baseline volume without peak fatigue |
| 80% | Gold | Primary strength day — last 1–2 reps hard but achievable |
| 90% | Red | Peak intensity — near-maximal, full rest |
| AR | Blue | Active recovery — no PRs, no AMRAP |
| Off | Gray | Rest — week overview only, no day page |

Two corrections to how this gets applied. The periodization benefit is
concentrated in trained clients and essentially absent in beginners, so a client
in her first ~6 months runs a simplified two-day rotation (Gold ≈80% + Green
≈70%) hitting each major muscle group ≥2×/week, and graduates to the full
five-color rotation afterward. And Red days belong to clients with an actual
testing or competition reason — no source supports 90% work as *necessary* for
general strength or hypertrophy outcomes.

Check weekly per-muscle set counts alongside the intensity coloring. A client
can hit every color correctly and still be under-volumed for her goal.

**RIR model.** 3+ RIR is one band — technique/submaximal, not three distinct
targets, because RIR accuracy degrades the further a set sits from failure. 2 RIR
is the default for primary lifts. 1 RIR is for hypertrophy-priority accessory
work. 0 RIR sparingly. Add weight at the top of the rep range with 2 RIR and
clean form; hold weight when form degrades; drop on missed reps, pain, or
fatigue. Training to failure does not consistently improve strength or
hypertrophy.

Rep range varies by goal and zone; progression within it is governed by RIR. A
universal 8–12 rule would be a regression from current evidence, not an upgrade.

**Deload.** Schedule one roughly every 4–6 training weeks, placed immediately
after the Week 4 peak test so it absorbs test fatigue and starts the next block
fresh. Same movements and day structure; sets roughly halved; loads at ~50–70%;
everything in the 3+ RIR band. Proactively written into the program — not left
to autoregulation — for rehab-flagged clients, clients with active injury sites
under progressive loading, anyone running 8+ weeks continuous, and
recovery-limited clients. Frame it to the client as a "reload," and if she's
hesitant, the honest line is that a light week costs no muscle and only briefly
recoverable peak strength.

**Reassessment runs on two clocks.** Strength/baseline battery re-tests every 4
weeks; the Styku body-composition rescan stays on its own 8–12 week cycle. Don't
collapse them into one number in `rescanNote`. A reassessment documented by
Jason in his SOAP notes *is* that client's 4-week strength check.

## Loads and progression

```js
const oneRM = epley1RM(weight, reps);            // weight × (1 + reps/30)
const wk1   = workingLoad(oneRM, 0.80);          // rounds to nearest 5
```

Week 1 working load ≈ 80% 1RM; Week 4 peak test ≈ 92–95%.

The `load` field carries the progression when a lift is being progressed:
`"Wk1: 180 → Wk4: 210"`. A flat value (`"Bodyweight"`, `"35 lbs/hand"`) is for a
genuinely non-progressing prescription only. Burying the Week 1 number in a block
`intro` while `load` stays vague means the trainer running the session can't see
it in the column where they'd look.

A newly introduced integration-closer never gets an invented load: anchor it
*below* the client's nearest documented tested number for the same implement and
pattern, and say so in the intro or cue.

## Studio equipment

Confirmed in-studio: squat rack + Olympic bar, dumbbells **up to 60 lbs/hand**,
kettlebells **up to 25 lbs**, bench (incline-capable), leg extension, hamstring
curl, hyperextension, assisted pull-up machine, Kieser, sled push, hex/trap bar,
Total Gym, landmine, cardio machines (bike/assault bike/rower), plyo boxes and
step platforms, bands, foam rollers, med balls.

There is no standalone cable stack — **the Kieser is the studio's cable
machine**. Cable-pattern prescriptions run on it; when touching a legacy script
with cable references, rename them to the Kieser (or a band/DB equivalent where
the pattern fits better).

The DB and KB ceilings bind. A progression crossing 60 lbs/hand moves to the
Olympic or hex bar, or to a harder variation at the same load — deficit, tempo,
unilateral. Heavy carries past the DB ceiling go on the hex bar.

Virtual and home-gym clients program against their own equipment lists, not this
one.

## Client View

Generated from the same `data` object and the same `buildDocument()` call, with
`viewMode: 'client'`. That is deliberate: the workout content is identical by
construction, so the two copies cannot silently drift.

`viewMode: 'client'` changes four things:

1. `baselineNotes` items carrying `audience: 'internal'` are dropped. Mark a note
   internal when it's written for the trainer or the build process — judgment-call
   reasoning, documentation methodology, a screening-gap admission that reads
   awkwardly out of context. Notes stay visible by default; genuinely
   client-facing content like PR callouts and clinical safety language belongs in
   both copies.
2. `data.clientHighlight: {label, body}` renders first, in the milestone style —
   for a real, documented PR or improvement. **Never fabricate one.** Omit it
   entirely for a first-build client with no prior version to compare against
   rather than inventing filler encouragement.
3. A short warm welcome line renders on the cover.
4. An exercise's `insight`/`flag` sub-line is dropped when it carries
   `insightAudience: 'internal'` / `flagAudience: 'internal'`. `insight` is the
   field most likely to need this, since it often exists to explain a build
   decision — an insight naming the Antagonist Rotation Rule is coaching the
   auditor, not the client. `flag` is usually genuine safety or sequencing
   information and stays visible by default.

**Known engine gap.** Block `intro`/`introLabel` and
`summary.milestones4wk`/`milestones8wk`/`rescanNote` are plain strings with no
audience filter, so internal-sounding language written there leaks into the
client copy. Word those fields to read correctly for both audiences. Watch
especially for dangling references to notes that were filtered out ("see the note
above" pointing at something the client can't see) and for cross-client names.

When marking one exercise's `insight` internal, search the whole script for
similar language before assuming it's the only instance — sequencing-rationale
phrasing tends to recur.

## Script shape

```js
const path = require('path');
const fs = require('fs');
const { buildDocument, epley1RM, workingLoad, weakerSide } =
  require('./icons_template');

/* Header comment: bracket and why, each flag's effect on the program,
   what was deliberately omitted and on what grounds. */

const client = { /* ... */ };
const styku = { /* ... */ };
const baselines = [ /* ... */ ];
const baselineNotes = [ /* ... */ ];
const days = [ /* ... */ ];
const summary = { /* ... */ };

const data = { client, styku, baselines, baselineNotes, weekOverview,
               includeNutritionBlock: true, includeProgressionBlock: true,
               days, summary };

async function main() {
  const outDir = path.join(__dirname, '..', 'clients', 'client_name');
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'Name_3Day_Training_Plan.docx'),
    await buildDocument(data));

  fs.writeFileSync(path.join(outDir, 'Name_3Day_Training_Plan_Client_View.docx'),
    await buildDocument({ ...data, viewMode: 'client' }));
}

main().catch((err) => { console.error(err); process.exit(1); });
```
