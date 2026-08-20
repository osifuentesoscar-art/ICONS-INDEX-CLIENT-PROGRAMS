#!/usr/bin/env python3
"""
ICONS canonical PDF engine — Brace Life Studios.

Layout constants, cue-length rule, and the overflow-audit contract are
pinned to docs/ICONS_System_Prompt.md — do not change them without
updating that spec. Consumes the same data schema as the docx engine
(scripts/icons_template.js — the single canonical engine) so one client
data.json drives both
deliverables.

CLI:
    python3 icons_pdf.py <data.json> <output.pdf>
"""

import json
import sys

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

# ---------------------------------------------------------------------------
# Layout constants — never change
# ---------------------------------------------------------------------------
PW, PH = letter          # 612 x 792 pt
ML = MR = 36
MB = 36
CW = PW - ML - MR        # 540 pt

HH = 64                  # header height
CT = PH - HH - 10        # content top
CB = MB + 18             # content bottom
AVAIL = CT - CB          # ~664pt per page

# Exercise table columns — EXERCISE | SETS | REPS | LOAD | TEMPO | REST
_CW = [165, 30, 42, 80, 52, 40]
_HEADERS = ["EXERCISE", "SETS", "REPS", "LOAD", "TEMPO", "REST"]
_CX_CUE = ML + sum(_CW)
_CW_CUE = ML + CW - _CX_CUE - 4   # ~127pt cue column width

CUE_MAX_CHARS = 50

FONT = "Helvetica"
FONT_B = "Helvetica-Bold"
FONT_I = "Helvetica-Oblique"

C = {
    "teal": "#00695C", "tealPale": "#E0F2F1",
    "green": "#43A047", "greenPale": "#E8F5E9",
    "gold": "#C9A227", "goldPale": "#FAF3E0",
    "red": "#E53935", "redPale": "#FFEBEE",
    "blue": "#1565C0", "bluePale": "#EAF4FB",
    "dark": "#2C2C2C", "mid": "#6B6B6B", "white": "#FFFFFF",
    "flagRed": "#B71C1C", "flagAmber": "#E65100", "flagGreen": "#1B5E20",
}

INTENSITY = {
    "60": ("60% · TECHNIQUE", C["teal"], C["tealPale"]),
    "70": ("70% · MODERATE", C["green"], C["greenPale"]),
    "80": ("80% · PRIMARY STRENGTH", C["gold"], C["goldPale"]),
    "90": ("90% · PEAK INTENSITY", C["red"], C["redPale"]),
    "AR": ("ACTIVE RECOVERY", C["blue"], C["bluePale"]),
}


# ---------------------------------------------------------------------------
# 1RM helpers (Epley formula) — used by the orchestration layer, not required
# for rendering, but part of the canonical engine per spec.
# ---------------------------------------------------------------------------
def epley_1rm(weight, reps):
    return round(weight * (1 + reps / 30))


def working_load(one_rm, pct, round_to=5):
    return round(one_rm * pct / round_to) * round_to


# ---------------------------------------------------------------------------
# Text wrapping
# ---------------------------------------------------------------------------
def wrap_text(text, font, size, max_width):
    if not text:
        return []
    words = str(text).split()
    lines = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if stringWidth(trial, font, size) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines or [""]


# ---------------------------------------------------------------------------
# PDF builder
# ---------------------------------------------------------------------------
class IconsPDF:
    def __init__(self, path, client_name):
        self.c = canvas.Canvas(path, pagesize=letter)
        self.client_name = client_name
        self.page_no = 1
        self.y = CT
        self._draw_header()

    # -- page machinery ----------------------------------------------------
    def _draw_header(self):
        self.c.setFillColor(C["gold"])
        self.c.setFont(FONT_B, 9)
        self.c.drawString(ML, PH - 30, "B R A C E   L I F E   S T U D I O S")
        self.c.setFillColor(C["mid"])
        self.c.setFont(FONT, 7)
        self.c.drawRightString(PW - MR, PH - 30, "CONFIDENTIAL CLIENT REPORT")
        self.c.setStrokeColor(C["gold"])
        self.c.setLineWidth(0.75)
        self.c.line(ML, PH - HH, PW - MR, PH - HH)

    def _draw_footer(self):
        self.c.setFillColor(C["mid"])
        self.c.setFont(FONT, 7)
        self.c.drawCentredString(
            PW / 2, MB - 12,
            f"Brace Life Studios · {self.client_name} · Confidential · Page {self.page_no}",
        )

    def new_page(self):
        self._draw_footer()
        self.c.showPage()
        self.page_no += 1
        self.y = CT
        self._draw_header()

    def ensure_space(self, height):
        if self.y - height < CB:
            self.new_page()

    def finish(self):
        self._draw_footer()
        self.c.save()

    # -- primitives ----------------------------------------------------------
    def title(self, text, size=22, color=None, spacing_after=26):
        self.ensure_space(size + 10)
        self.c.setFillColor(color or C["dark"])
        self.c.setFont(FONT_B, size)
        self.c.drawCentredString(PW / 2, self.y, text)
        self.y -= size + spacing_after

    def subtitle(self, text, size=11, color=None, spacing_after=18):
        self.ensure_space(size + 6)
        self.c.setFillColor(color or C["mid"])
        self.c.setFont(FONT_I, size)
        self.c.drawCentredString(PW / 2, self.y, text)
        self.y -= size + spacing_after

    def section_label(self, letter_, text, color):
        self.ensure_space(20)
        self.c.setFillColor(color)
        self.c.setFont(FONT_B, 10.5)
        self.c.drawString(ML, self.y, f"{letter_}  —  {text.upper()}")
        self.y -= 18

    def body_para(self, text, size=8.5, color=None):
        lines = wrap_text(text, FONT, size, CW)
        h = len(lines) * (size + 2) + 8
        self.ensure_space(h)
        self.c.setFillColor(color or C["dark"])
        self.c.setFont(FONT, size)
        for line in lines:
            self.c.drawString(ML, self.y, line)
            self.y -= size + 2
        self.y -= 6

    def spacer(self, h=10):
        self.y -= h

    # -- callouts --------------------------------------------------------
    def callout(self, label, body, fill, border, thick=False):
        pad = 8
        label_size = 8.5
        body_size = 8
        lines = wrap_text(body, FONT, body_size, CW - 2 * pad)
        h = pad * 2 + (label_size + 3) + len(lines) * (body_size + 2)
        self.ensure_space(h)
        top = self.y
        self.c.setFillColor(fill)
        self.c.rect(ML, top - h, CW, h, fill=1, stroke=0)
        self.c.setStrokeColor(border)
        self.c.setLineWidth(3 if thick else 1)
        self.c.line(ML, top - h, ML, top)  # left accent bar
        self.c.setLineWidth(0.5)
        self.c.rect(ML, top - h, CW, h, fill=0, stroke=1)

        ty = top - pad - label_size
        self.c.setFillColor(border)
        self.c.setFont(FONT_B, label_size)
        self.c.drawString(ML + pad, ty, label)
        ty -= label_size + 3
        self.c.setFillColor(C["dark"])
        self.c.setFont(FONT, body_size)
        for line in lines:
            self.c.drawString(ML + pad, ty, line)
            ty -= body_size + 2

        self.y = top - h - 10

    def gold_callout(self, label, body):
        self.callout(label, body, C["goldPale"], C["gold"])

    def green_callout(self, label, body):
        self.callout(label, body, C["greenPale"], C["green"])

    def red_callout(self, label, body):
        self.callout(label, body, C["redPale"], C["red"])

    def teal_callout(self, label, body):
        self.callout(label, body, C["tealPale"], C["teal"])

    def blue_callout(self, label, body):
        self.callout(label, body, C["bluePale"], C["blue"])

    def clinical_flag(self, label, body):
        self.callout(label, body, C["redPale"], C["flagRed"], thick=True)

    def watch_flag(self, label, body):
        self.callout(label, body, C["goldPale"], C["flagAmber"], thick=True)

    def clear_flag(self, label, body):
        self.callout(label, body, C["greenPale"], C["flagGreen"], thick=True)

    # -- day header banner -------------------------------------------------
    def day_header(self, intensity, title_text, subtitle_text, descriptor):
        label, color, pale = INTENSITY.get(intensity, INTENSITY["70"])
        h = 46
        self.ensure_space(h + 14)
        top = self.y
        badge_w = 90
        self.c.setFillColor(color)
        self.c.rect(ML, top - h, badge_w, h, fill=1, stroke=0)
        self.c.setFillColor(C["white"])
        self.c.setFont(FONT_B, 7.5)
        for i, word in enumerate(label.split(" · ")):
            self.c.drawCentredString(ML + badge_w / 2, top - 18 - i * 10, word)

        self.c.setFillColor(pale)
        self.c.rect(ML + badge_w, top - h, CW - badge_w, h, fill=1, stroke=0)
        tx = ML + badge_w + 10
        self.c.setFillColor(color)
        self.c.setFont(FONT_B, 12)
        self.c.drawString(tx, top - 16, title_text)
        self.c.setFillColor(C["dark"])
        self.c.setFont(FONT_B, 9)
        self.c.drawString(tx, top - 29, subtitle_text)
        self.c.setFillColor(C["mid"])
        self.c.setFont(FONT, 6.5)
        self.c.drawString(tx, top - 40, descriptor)

        self.y = top - h - 14

    # -- exercise table ------------------------------------------------------
    def exercise_table(self, exercises, accent, pale):
        widths = _CW + [_CW_CUE]
        xs = [ML]
        for w in widths[:-1]:
            xs.append(xs[-1] + w)
        headers = _HEADERS + ["COACHING CUE"]

        def draw_table_header():
            hh = 16
            self.ensure_space(hh)
            self.c.setFillColor(accent)
            self.c.rect(ML, self.y - hh, CW, hh, fill=1, stroke=0)
            self.c.setFillColor(C["white"])
            self.c.setFont(FONT_B, 6.5)
            for x, w, htext in zip(xs, widths, headers):
                self.c.drawString(x + 3, self.y - hh + 5, htext)
            self.y -= hh

        draw_table_header()

        for idx, ex in enumerate(exercises):
            cue = ex.get("cue", "")
            if ex.get("rirNote"):
                cue = f"{cue}  {ex['rirNote']}"
            name_lines = wrap_text(ex.get("name", ""), FONT_B, 7.5, _CW[0] - 6)
            cue_lines = wrap_text(cue, FONT, 7, _CW_CUE - 6)
            flag_lines = wrap_text(ex.get("flag", ""), FONT_I, 6, _CW[0] - 6) if ex.get("flag") else []

            lines = max(len(name_lines), len(cue_lines), 1)
            rh = max(24, lines * 10 + 10)
            if flag_lines:
                rh = max(rh, len(flag_lines) * 9 + 20 + 6)

            if self.y - rh < CB:
                self.new_page()
                draw_table_header()

            fill = C["white"] if idx % 2 == 0 else pale
            self.c.setFillColor(fill)
            self.c.rect(ML, self.y - rh, CW, rh, fill=1, stroke=0)
            self.c.setStrokeColor("#DDDDDD")
            self.c.setLineWidth(0.4)
            self.c.rect(ML, self.y - rh, CW, rh, fill=0, stroke=1)

            row_top = self.y - 9
            self.c.setFillColor(C["dark"])
            self.c.setFont(FONT_B, 7.5)
            ny = row_top
            for line in name_lines:
                self.c.drawString(xs[0] + 3, ny, line)
                ny -= 9
            if flag_lines:
                self.c.setFillColor(C["flagRed"])
                self.c.setFont(FONT_I, 6)
                for line in flag_lines:
                    self.c.drawString(xs[0] + 3, ny, line)
                    ny -= 8

            self.c.setFillColor(C["dark"])
            self.c.setFont(FONT, 7.5)
            for col, key in zip(xs[1:5], ["sets", "reps", "load", "tempo"]):
                self.c.drawString(col + 3, row_top, str(ex.get(key, "")))
            self.c.drawString(xs[5] + 3, row_top, str(ex.get("rest", "")))

            cy = row_top
            self.c.setFont(FONT, 7)
            for line in cue_lines:
                self.c.drawString(xs[6] + 3, cy, line)
                cy -= 9

            self.y -= rh


# ---------------------------------------------------------------------------
# Data-driven rendering — consumes the shared client data.json schema
# ---------------------------------------------------------------------------
def render_training_plan(data, output_path):
    client = data["client"]
    styku = data.get("styku")
    alst = client.get("alstIndex", (styku or {}).get("alstIndex", 99))
    at_risk = alst is not None and alst < 5.5
    weight_kg = client.get("weightKg", 0)

    pdf = IconsPDF(output_path, client["name"])

    pdf.title(client["name"].upper())
    pdf.subtitle(client.get("programTitle", "").upper())
    if client.get("stats"):
        pdf.body_para("   ·   ".join(client["stats"]), size=8, color=C["mid"])
    pdf.spacer(6)

    days = data.get("days", [])
    for day_idx, day in enumerate(days):
        pdf.day_header(day["intensity"], day["title"], day["subtitle"], day.get("descriptor", ""))
        if day.get("intensityPara"):
            pdf.body_para(day["intensityPara"])
        if at_risk:
            lo, hi = round(weight_kg * 2.0), round(weight_kg * 2.2)
            pdf.gold_callout(
                "Protein Reminder",
                f"ALST At-Risk — hit your protein target today ({lo}–{hi}g). Creatine with your first meal.",
            )
        if day.get("warmUp"):
            pdf.gold_callout("Warm-Up", day["warmUp"])

        meta = INTENSITY.get(day["intensity"], INTENSITY["70"])
        for block in day.get("blocks", []):
            pdf.section_label(block["letter"], block["title"], meta[1])
            if block.get("intro"):
                pdf.body_para(block["intro"])
            pdf.exercise_table(block.get("exercises", []), meta[1], meta[2])
            pdf.spacer(8)

        if day.get("coolDown"):
            pdf.blue_callout("Cool-Down", day["coolDown"])
        if day.get("iconsNote"):
            pdf.gold_callout("ICONS Note", day["iconsNote"])

        if day_idx < len(days) - 1:
            pdf.new_page()

    pdf.finish()
    return output_path


# ---------------------------------------------------------------------------
# Overflow audit — mandatory before every delivery
# ---------------------------------------------------------------------------
def audit_pdf(path):
    import pdfplumber

    with pdfplumber.open(path) as pdf:
        for i, page in enumerate(pdf.pages):
            overflow = [ch for ch in page.chars if ch["y0"] < 0]
            if overflow:
                min_y = min(ch["y0"] for ch in overflow)
                raise ValueError(f"Page {i + 1} overflows by {-min_y:.0f}pt")
        print(f"✓ {len(pdf.pages)} pages clean")


def main():
    if len(sys.argv) != 3:
        print("usage: icons_pdf.py <data.json> <output.pdf>", file=sys.stderr)
        sys.exit(1)
    data_path, output_path = sys.argv[1], sys.argv[2]
    with open(data_path) as f:
        data = json.load(f)
    render_training_plan(data, output_path)
    audit_pdf(output_path)


if __name__ == "__main__":
    main()
