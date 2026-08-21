#!/usr/bin/env python3
"""Compute standards drift across the whole ICONS roster.

Standards move faster than documents do. Each correction lands in CLAUDE.md,
gets applied to whichever client prompted it, and leaves every other client
asserting the old version until someone touches that file again. This measures
how far behind each client is, so a sweep works from evidence instead of a
checklist someone maintains by hand.

    python3 roster_drift.py [--repo .] [--json] [--client NAME]
"""
import argparse, json, re, sys
from pathlib import Path

# Each check: (column, what it looks for, is a hit good or bad)
def analyse(repo):
    scripts = sorted(p for p in (repo / "scripts").glob("*.js")
                     if p.name != "icons_template.js")
    rows = []
    for s in scripts:
        src = s.read_text(errors="ignore")
        name = s.stem
        is_plan = "buildDocument(" in src
        is_assess = "buildAssessmentReport(" in src
        if not (is_plan or is_assess):
            continue
        # Trainer/athlete programs and system documents are not client
        # deliverables: they get no Client View, and client-facing cadence
        # language does not apply. Listing them as "missing Client View"
        # buries the real client backlog under noise.
        is_client = "trainer_education" not in src and "system_documents" not in src
        rows.append({
            "script": s.name,
            "client": name.replace("_3day_plan", "").replace("_2day_plan", "")
                          .replace("_5day_plan", "").replace("_assessment_report", ""),
            "type": ("assessment" if is_assess else "plan") if is_client else "trainer",
            # --- current-standard adoption ---
            "client_view": (bool(re.search(r"viewMode\s*:\s*['\"]client", src))
                            if (is_plan and is_client) else None),
            "four_week_cadence_na": not is_client,
            "derives_loads": bool(re.search(r"epley1RM|workingLoad", src)),
            "load_progression": bool(re.search(r"Wk\s*1.*(?:→|->).*Wk\s*4", src)),
            "block_method": bool(re.search(r"integration|block method", src, re.I)),
            "deload": bool(re.search(r"deload", src, re.I)),
            "four_week_cadence": bool(re.search(r"4.?week[^.\n]{0,40}(?:strength|re-?check|re-?test)", src, re.I)),
            # --- retired-standard residue ---
            "cable_ref": bool(re.search(r"\bcable\b", src, re.I)),
            "stale_8wk_only": bool(re.search(r"(?:reassess|re-?test)[^.\n]{0,40}8.?week", src, re.I)),
            "abs_asymmetry": bool(re.search(r"0\.5\s*lb[^.\n]{0,40}(?:trigger|threshold)", src, re.I)),
            "age_protein_tier": bool(re.search(r"(?:40\+|50\+)\s*tier", src, re.I)),
            # --- equipment ceilings ---
            "db_over_60": bool(re.search(r"\b(6[5-9]|[7-9]\d|1\d\d)\s*(?:lbs?)?\s*/\s*hand", src)),
        })
    return rows


ADOPT = [("client_view", "Client View"), ("derives_loads", "derived loads"),
         ("load_progression", "Wk1→Wk4 in load"), ("block_method", "Block Method"),
         ("deload", "deload week"), ("four_week_cadence", "4-wk cadence")]
RESIDUE = [("cable_ref", "cable ref"), ("stale_8wk_only", "8-wk-only cadence"),
           ("abs_asymmetry", "0.5 lb trigger"), ("age_protein_tier", "age protein tier"),
           ("db_over_60", "DB >60 lb")]


def main():
    ap = argparse.ArgumentParser(description=__doc__,
            formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--repo", default=".")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--client")
    args = ap.parse_args()

    repo = Path(args.repo)
    rows = analyse(repo)
    if args.client:
        rows = [r for r in rows if args.client.lower() in r["client"].lower()]

    if args.json:
        print(json.dumps(rows, indent=2)); return 0

    plans = [r for r in rows if r["type"] == "plan"]
    assess = [r for r in rows if r["type"] == "assessment"]
    trainer = [r for r in rows if r["type"] == "trainer"]
    print(f"\n{len(rows)} build scripts  ({len(plans)} client plans, "
          f"{len(assess)} assessments, {len(trainer)} trainer/system — "
          f"client-only checks skipped for the last group)\n")
    rows = [r for r in rows if r["type"] != "trainer"] if not args.client else rows

    print("ADOPTION — how many carry each current standard")
    for key, label in ADOPT:
        pool = [r for r in rows if r[key] is not None]
        n = sum(1 for r in pool if r[key])
        bar = "#" * round(20 * n / max(len(pool), 1))
        print(f"  {label:<20} {n:>3}/{len(pool):<3} {bar}")

    print("\nRESIDUE — how many still carry a retired standard")
    for key, label in RESIDUE:
        n = sum(1 for r in rows if r[key])
        bar = "!" * round(20 * n / max(len(rows), 1))
        print(f"  {label:<20} {n:>3}/{len(rows):<3} {bar}")

    def score(r):
        adopted = sum(1 for k, _ in ADOPT if r[k])
        residue = sum(1 for k, _ in RESIDUE if r[k])
        return residue * 2 - adopted

    print("\nWORK ORDER — most drifted first")
    for r in sorted(rows, key=score, reverse=True)[:12]:
        miss = [l for k, l in ADOPT if r[k] is False]
        res = [l for k, l in RESIDUE if r[k]]
        if not miss and not res:
            continue
        print(f"  {r['client']:<22} missing: {', '.join(miss) or '—'}")
        if res:
            print(f"  {'':<22} residue: {', '.join(res)}")

    clean = [r for r in rows if score(r) <= -len(ADOPT) + 1]
    print(f"\n{len(clean)} script(s) fully current.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
