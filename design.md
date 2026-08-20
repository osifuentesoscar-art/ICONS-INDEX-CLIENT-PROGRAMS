# BRACE LIFE STUDIOS — DESIGN SYSTEM & BRAND GUIDELINES
## Document & Content Architect Specification
### Canonical source of truth for all **HTML-page** deliverables.

---

## 0. SCOPE — READ THIS FIRST

This file governs **web/HTML documents**: protocols, blueprints, briefings, one-pagers,
landing pages, and editorial content rendered as standalone HTML5.

**It does NOT govern the ICONS `.docx` client deliverables.** Those are built by
`icons_template.js` / `my-agent/engine/icons_template.cjs` against a completely
different, separately-confirmed visual language — Arial 8.5pt, gold/teal/green/red
accent tiers, compact labeled-paragraph callouts, and an explicit **no bordered or
shaded box** rule (see `CLAUDE.md` → "Visual language — confirmed from reference
document"). Glassmorphism, Electric Cyan, and the Anybody/Manrope/Inter stack must
never be introduced into a client training plan, assessment report, or Client View
`.docx`. Two systems, two mediums, no cross-contamination.

When a request is ambiguous about medium, ask which one before building.

---

## 1. BRAND PHILOSOPHY & ETHOS

Brace Life Studios embodies the "working in" philosophy of fitness — a premium,
holistic approach that bridges physical exertion with mental restoration.

- **Tone:** High-performance yet serene. Corporate/modern with editorial
  sophistication. Energetic athletic precision paired with spa-like mindfulness.
- **Style Archetype:** Corporate / Modern with Glassmorphism accents.
  Structured, reliable, authoritative.
- **Voice rules:** Never casual. Never generic. Never sloppy. Every document
  represents the studio. Precision over enthusiasm; restraint over decoration.

---

## 2. PALETTE

| Token | Hex / Value | Role |
|---|---|---|
| Slate Foundation | `#1E293B` | Primary deep navy/slate base — strength, authority, headers, dark containers |
| Electric Cyan | `#00F0FF` | Vibrant accent — CTAs, active highlights, key metric values |
| Mist Grey | `#F8FAFC` | Soft editorial background tint, maximum breathability |
| Surface White | `#FCF8FA` | Page background |
| Glass Surface | `rgba(255,255,255,0.75)` + `backdrop-filter: blur(12px)` + `1px` white border | Floating cards, callouts, metric blocks |
| On-Surface Charcoal | `#1B1B1D` | Reading text — WCAG AA compliant on light surfaces |
| Subtle Outline | `#C6C6CD` | 1px delicate dividers |
| Ambient Shadow | `rgba(15,23,42,0.08)`, 10–20px soft spread | Elevation. **Never** harsh black drop-shadows |

### 2.1 CONTRAST GUARDRAIL — NON-NEGOTIABLE

Electric Cyan is a **light** color (relative luminance ≈ 0.70). Measured ratios:

```
#00F0FF text on #FCF8FA / #F8FAFC  →  ~1.4:1   ✗ FAILS WCAG at any size
#00F0FF text on #1E293B            →  ~10.3:1  ✓ PASSES AA + AAA
#1E293B text on #00F0FF fill       →  ~10.3:1  ✓ PASSES AA + AAA
#1B1B1D text on #FCF8FA            →  ~17:1    ✓ PASSES AA + AAA
```

Therefore:
- Cyan **text** is permitted **only on Slate Foundation** (or darker).
- On light surfaces, cyan appears as a **fill, left border, underline, rule, or
  badge background** — never as small type.
- A cyan CTA is always **solid cyan fill with Slate Foundation text**, never
  cyan text on a light button.
- Metric values that need to read cyan sit inside a **slate or glass-over-slate**
  block. A cyan number floating on the white page is a defect, not a style choice.

The spec claims WCAG AA compliance. This section is what makes that claim true.

---

## 3. TYPOGRAPHY SYSTEM

| Role | Family | Weight | Size / Metrics |
|---|---|---|---|
| Display hero & large headlines | **Anybody** | 700–800 | line-height 1.1–1.2, wide commanding stance, tight tracking |
| Subheadings & deep-dives | **Manrope** | 600 | line-height 1.5, letter-spacing 0.05em |
| Body copy | **Manrope** | 400 | 16px / 1rem, line-height 1.6, measure constrained to **65–75ch** |
| Overline tags & structural labels | **Inter** | 700 | 14px, uppercase, letter-spacing 0.1em |
| Quotes / axioms / captions | **Manrope italic** | 400 | 14px |

Utility class contract (used by every generated document):

```
.font-display  → Anybody
.font-body     → Manrope
.font-label    → Inter
```

Google Fonts link (exact, single request):

```html
<link href="https://fonts.googleapis.com/css2?family=Anybody:wght@700;800&family=Inter:wght@700&family=Manrope:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

Always ship a real fallback stack (`system-ui, -apple-system, "Segoe UI", sans-serif`)
so the document degrades gracefully if the font request fails.

---

## 4. LAYOUT, SPACING & ELEVATION

- **Grid:** fluid 12-column desktop grid, collapsing gracefully to a single column
  on mobile. Content column max-width ~1120px; body text measure 65–75ch regardless
  of container width.
- **Section rhythm:** generous vertical breathing room between major modules —
  the whitespace *is* the mindfulness. Target 5–7rem between top-level sections,
  1.5–2rem within them. Crowding is off-brand.
- **Shape radius:** `0.5rem` (8px) buttons/inputs · `1rem` (16px) major cards and
  containers · `9999px` (pill) tags and badges.
- **Elevation:** frosted glass containers (12px blur) over an ambient navy-tinted
  shadow. One elevation level per surface — do not stack glass on glass on glass.
- **Responsive:** every table, metric row, and wide block scrolls inside its own
  `overflow-x: auto` container. The page body never scrolls horizontally.

---

## 5. CORE DOCUMENT COMPONENTS

Every generated document is assembled from these five signature components, in order.

### 5.1 Document Header & Hero
- **Pill eyebrow tag** — uppercase Inter, cyan-on-slate or slate-on-cyan pill
  (e.g. `MIND & BODY PROTOCOL`, `EXECUTIVE WELLNESS BLUEPRINT`, `BRACE PROTOCOL`).
- **Commanding display title** — Anybody 800, the largest type on the page.
- **Evocative subheading** — one sentence, Manrope 400, measure-constrained.
- **Metadata strip** — Program Duration · Intensity Level · Target Outcome ·
  Lead Practitioner. Inter labels above Manrope values, separated by subtle outline rules.

### 5.2 Metric / Key Highlight Row
- **3 to 4** glassmorphic metric blocks in a single responsive row.
- Each: Inter overline label, large Anybody value, optional Manrope caption.
- Values render in Electric Cyan **only** when the block sits on slate (§2.1).

### 5.3 Modular Sections
- **Uppercase numbered section tag** — `01. PHYSIOLOGICAL FOUNDATION`,
  `02. RESTORATION TIMELINE` — Inter 700, cyan rule beneath.
- **Balanced editorial body paragraphs** — Manrope 400, 65–75ch.
- **Frosted glass callout boxes** — 4px Electric Cyan left accent, glass fill,
  Inter overline label + Manrope body. For coaching pearls and recovery axioms.
- **Structured protocol steps / checklists** — clean numbered bullets with cyan
  numerals on slate discs; never default browser list markers.

### 5.4 Editorial Quote / Testimonial Card
- Glass card, ambient shadow, generous internal padding.
- Italic Manrope quote (larger than caption size for display use).
- Practitioner attribution in Inter uppercase, muted.

### 5.5 Primary Action Callout
- Minimum **56px** height.
- Solid Electric Cyan `#00F0FF` fill, bold **Slate Foundation `#1E293B`**
  uppercase Inter text.
- One primary CTA per document. Secondary actions are outlined slate, never a
  second cyan button competing with the first.

### 5.6 Footer
- Clean signature line: **"Brace Life Studios · Certified Document System"**,
  subtle outline rule above, muted Manrope.

---

## 6. OUTPUT FORMAT DIRECTIVE — HTML PAGE

- Complete, **standalone**, responsive HTML5 document.
- Tailwind CSS + the Google Fonts link in §3.
- `tailwind.config` extended inline with the brand palette and the
  `font-display` / `font-body` / `font-label` families, so brand tokens are
  reachable as utilities (`bg-slate-foundation`, `text-electric-cyan`, …).
- A critical inline `<style>` block carries the brand baseline — background
  `#fcf8fa`, text `#1b1b1d`, font stacks, glass surface, ambient shadow — so the
  page still reads correctly if the Tailwind CDN or font request fails.
- Self-contained: no external images, no remote scripts beyond Tailwind + fonts.
  Embed any asset as a data URI.
- Print-friendly: a `@media print` block flattens glass to solid white and
  removes shadows, so the document exports to PDF cleanly.

---

## 7. EXECUTION PROTOCOL

When the user supplies raw notes, a brief, a transcript, or a topic:

1. **Extract** core objectives, audience, and functional milestones.
2. **Translate** all unstructured information into the journalistic hierarchy
   in §5 — eyebrow → title → subhead → metrics → numbered sections → quote → CTA.
3. **Preserve** every specific date, metric, exercise, load, and client detail
   exactly as supplied. Never round, re-derive, or "tidy" a supplied number.
4. **Never fabricate.** No invented metrics, testimonials, practitioner names,
   client results, or citations. A metric with no supplied value is omitted or
   marked as pending — never filled with a plausible-looking number. This carries
   the same weight here as it does in the ICONS `.docx` system.
5. **Output** the complete, styled document, ready for instant use.

---

## 8. PRE-DELIVERY CHECKLIST

Run before handing over any document:

```
□ All five signature components present, in order (§5)
□ Eyebrow pill, display title, subhead, metadata strip all populated
□ 3–4 metric blocks — not 2, not 6
□ Every section carries a numbered uppercase tag
□ No cyan text on a light background anywhere (§2.1)
□ CTA is solid cyan fill + slate text, ≥56px tall, exactly one per document
□ Body measure constrained to 65–75ch
□ Fonts: Anybody display / Manrope body / Inter labels — no strays
□ Glass surfaces use blur(12px) + white border + navy ambient shadow
□ No harsh black drop-shadows anywhere
□ Wide blocks scroll inside their own container; body never scrolls sideways
□ Renders correctly with the font/Tailwind requests blocked (inline fallback)
□ Every supplied number, date, and name preserved verbatim
□ Nothing fabricated
□ Footer signature line present
```

---

*Brace Life Studios — Document & Content Architect · design system for HTML deliverables.*
*Reference implementation: `system_documents/brand/brace_life_document_template.html`*
*For `.docx` client deliverables see `CLAUDE.md` — a separate and non-interchangeable system.*
