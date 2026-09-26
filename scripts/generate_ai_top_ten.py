#!/usr/bin/env python3
"""Reproduce the published top-ten artifacts from the checked-in essay sources.

This script does not call a model and does not read API keys.
GitHub Pages cannot run it. Run it locally from the repository root:

    python3 scripts/generate_ai_top_ten.py

Optional check that the primary URLs named in the essays still respond:

    python3 scripts/generate_ai_top_ten.py --check-urls

The analytical sentences were written on 26 September 2026 by a machine-led
pass over documents that could be opened. Re-running this script republishes
those checked-in essays. It does not silently invent a new top ten.
"""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
ESSAY_DIR = ROOT / "spec" / "essays"
OUT = ROOT / "ai-essays"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONTB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

INTRO = """The ten essays below were generated on 26 September 2026 by a machine-led reading of public archive material, not by a request to adopt the archive author’s conclusions. The corpus that could be opened was scanned for official instruments. Subjects were selected for documentary strength and for what a third party can check, including material that cuts against the archive’s stronger claims. The protagonist did not select the subjects, assign their significance, order them, or draft the conclusions. His records remain in the corpus where they are evidence, and they are labelled as testimony when that is what they are. Supporting and adverse material was both considered. These essays are not a court judgment and not an institutional finding. AI is fallible: extraction can miss a page, a filename can lie, and a model can compress badly. The purpose is independent examination. Every substantive proposition is tied to a public file that was opened, or is marked unverified or not currently accessible."""

PROVENANCE = """
## Machine provenance

AI EVIDENCE SYNTHESIS

Corpus: https://wezzo72.github.io/Barrandodger/ ; https://barrandodger.com (HTML head); public repositories wezzo72/Barrandodger, wezzo72/Backup, wezzo72/barran-dodger-archive, wezzo72/pdf-archive, wezzo72/New; drbarrandodger/barran-dodger-archive, drbarrandodger/Barrandodger, drbarrandodger/Bazdod-, drbarrandodger/New-github-barran-dodger-website-, drbarrandodger/HTML-.

Analysis date: 26 September 2026.

Evidence inventory: spec/AI_TOP_TEN_EVIDENCE_REGISTER.csv (BD-E series for documents opened or deliberately marked inaccessible).

Selection method: spec/AI_TOP_TEN_METHODOLOGY.md

Contradiction testing: performed on the opened letters, including wrappers that overclaim the letters. Not performed on files that could not be read.

Author selection involvement: REMOVED FROM SUBJECT SELECTION. Not removed from the evidence.

Human verification: not separately repeated by a second person in this execution.

AI limitations: text extraction misses image-only pages; this pass did not recursively read the multi-gigabyte archives; absence of a personal stake is not infallibility.

Source snapshot: parent commit 0b2dd5d1481df35852741447d4e799fcd1671256 of wezzo72/Barrandodger, plus Backup paths cited in the essays. Publication commit: the commit that added this file.

Genesis: spec/AI_TOP_TEN_GENESIS.md
"""

EXCLUSION = """The protagonist/author did not select the ten subjects, assign their evidentiary significance, determine their ordering, or draft the analytical conclusions. His documentary materials remain within the corpus where they constitute source evidence. The purpose of this separation is to reduce authorial influence over the analytical selection process. It does not make the AI infallible, nor does it transform the resulting essays into independent judicial findings."""

LIMITS = """Machine-led analysis is not synonymous with absolute impartiality. AI systems can inherit errors from source material, extraction processes, model behaviour, incomplete corpora and methodological assumptions. Accordingly, impartiality here means a documented attempt to apply consistent rules to the entire accessible corpus, including supporting, adverse and unresolved material, while exposing the underlying evidence so that third parties can independently verify the result."""


def md_to_blocks(md: str):
    blocks = []
    for raw in md.split("\n"):
        line = raw.rstrip()
        if not line.strip():
            continue
        if line.startswith("# "):
            blocks.append(("h1", line[2:].strip()))
        elif line.startswith("## "):
            blocks.append(("h2", line[3:].strip()))
        elif line.startswith("- "):
            blocks.append(("li", line[2:].strip()))
        else:
            blocks.append(("p", line.strip()))
    return blocks


def linkify_html(text: str) -> str:
    def repl(m):
        label, url = m.group(1), m.group(2)
        return f'<a href="{url}">{label}</a>'
    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", repl, text)


def html_page(num, title, body_md, pdf_name):
    blocks = md_to_blocks(body_md + "\n" + PROVENANCE)
    parts = [
        "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"/>",
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>",
        f"<title>{num} — {title}</title></head><body>",
        "<article class=\"ai-essay\">",
        "<style>.ai-essay{max-width:820px;margin:0 auto;padding:8px 4px 48px;line-height:1.55}",
        ".ai-essay h1{font-size:1.55rem;line-height:1.25}.ai-essay h2{font-size:1.05rem;margin:1.2rem 0 .3rem}",
        ".ai-essay a{text-decoration:underline}.ai-essay .note{font-size:.92rem}</style>",
        f"<p class=\"note\"><strong>AI evidence synthesis · 26 September 2026 · Not a court · Not a verdict.</strong> "
        f"PDF: <a href=\"{pdf_name}\">{pdf_name}</a> · "
        f"<a href=\"index.html\">All ten</a> · "
        f"<a href=\"../spec/AI_TOP_TEN_GENESIS.md\">Genesis</a></p>",
    ]
    for kind, text in blocks:
        safe = linkify_html(text.replace("&", "&").replace("<", "<").replace(">", ">")
                            .replace("&", "&").replace("<", "<").replace(">", ">"))
        # redo escape properly
    # rewrite loop with correct escape
    parts = parts[:7]
    for kind, text in blocks:
        esc = (text.replace("&", "&").replace("<", "<").replace(">", ">"))
        esc = linkify_html(esc.replace("&", "&").replace("<", "<").replace(">", ">"))
        # The replace above undoes escape before linkify. Do it right:
    parts = parts[:7]
    for kind, text in blocks:
        esc = text.replace("&", "&").replace("<", "<").replace(">", ">")
        esc = re.sub(
            r"\[([^\]]+)\]\(([^)]+)\)",
            lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>',
            esc,
        )
        if kind == "h1":
            parts.append(f"<h1>{esc}</h1>")
        elif kind == "h2":
            parts.append(f"<h2>{esc}</h2>")
        elif kind == "li":
            parts.append(f"<p>• {esc}</p>")
        else:
            parts.append(f"<p>{esc}</p>")
    parts.append("<h2>Protagonist and the selection mechanism</h2>")
    parts.append(f"<p>{EXCLUSION}</p>")
    parts.append("<h2>Impartiality limitation</h2>")
    parts.append(f"<p>{LIMITS}</p>")
    parts.append("<p class=\"note\">Finding aid. Not a court. Not a verdict. An AI-generated analytical synthesis.</p>")
    parts.append("</article></body></html>")
    return "\n".join(parts)


class EssayPDF(FPDF):
    def footer(self):
        self.set_y(-12)
        self.set_font("DejaVu", "", 8)
        self.cell(0, 8, f"AI evidence synthesis 26 September 2026  ·  not a court  ·  {self.page_no()}", align="C")


def pdf_from_md(path: Path, md: str, title: str):
    pdf = EssayPDF(format="A4")
    pdf.set_auto_page_break(True, margin=16)
    pdf.add_font("DejaVu", "", FONT)
    pdf.add_font("DejaVu", "B", FONTB)
    pdf.add_page()
    pdf.set_font("DejaVu", "B", 11)
    pdf.multi_cell(0, 6, "AI-generated analytical synthesis — not a court or institutional determination")
    pdf.ln(1)
    pdf.set_font("DejaVu", "", 9)
    pdf.multi_cell(0, 5, "Generated 26 September 2026. Source snapshot parent: 0b2dd5d1481df35852741447d4e799fcd1671256. Archive: wezzo72/Barrandodger.")
    pdf.ln(2)
    usable = pdf.w - pdf.l_margin - pdf.r_margin
    full = md + "\n" + PROVENANCE + "\n\n" + EXCLUSION + "\n\n" + LIMITS
    for kind, text in md_to_blocks(full):
        plain = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1 (\2)", text)
        if kind == "h1":
            pdf.set_font("DejaVu", "B", 14)
            pdf.multi_cell(usable, 7, plain)
            pdf.ln(1)
        elif kind == "h2":
            pdf.ln(1)
            pdf.set_font("DejaVu", "B", 12)
            pdf.multi_cell(usable, 6, plain)
        elif kind == "li":
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(usable, 5, "• " + plain)
        else:
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(usable, 5, plain)
    pdf.output(str(path))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    essays = sorted(ESSAY_DIR.glob("*.md"))
    if len(essays) < 10:
        sys.exit(f"expected 10 essays, found {len(essays)} in {ESSAY_DIR}")
    index_items = []
    for md_path in essays:
        text = md_path.read_text(encoding="utf-8")
        m = re.match(r"#\s+(\d+)\s+—\s+(.+)", text)
        if not m:
            sys.exit("bad title " + md_path.name)
        num, title = m.group(1), m.group(2).strip()
        slug = md_path.stem.split("-", 1)[1]
        html_name = f"{num}-{slug}.html"
        pdf_name = f"{num}-top-ten-impartial-ai-essay-{slug}.pdf"
        (OUT / html_name).write_text(html_page(num, title, text, pdf_name), encoding="utf-8")
        pdf_from_md(OUT / pdf_name, text, title)
        index_items.append((num, title, html_name, pdf_name, slug))
        print("built", html_name, pdf_name)
    lis = "\n".join(
        f'<li><a href="{h}">{n} — {t}</a> · <a href="{p}">PDF</a></li>'
        for n, t, h, p, s in index_items
    )
    intro_html = f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Ten impartial AI evidence essays</title></head><body>
<article class="ai-essay">
<style>.ai-essay{{max-width:820px;margin:0 auto;padding:12px;line-height:1.55}} a{{text-decoration:underline}}</style>
<p><strong>26 September 2026 · Not a court · Not a verdict.</strong></p>
<h1>Impartial AI evidence essays</h1>
<p>{INTRO}</p>
<p>{EXCLUSION}</p>
<p>{LIMITS}</p>
<ol>
{lis}
</ol>
<p><a href="../spec/AI_TOP_TEN_METHODOLOGY.md">Methodology</a> ·
<a href="../spec/AI_TOP_TEN_GENESIS.md">View / execute the genesis method</a> ·
<a href="../spec/AI_TOP_TEN_EVIDENCE_REGISTER.csv">Evidence register</a> ·
<a href="../index.html">Archive</a></p>
</article></body></html>
"""
    (OUT / "index.html").write_text(intro_html, encoding="utf-8")
    if "--check-urls" in sys.argv:
        import urllib.request
        urls = sorted(set(re.findall(r"https://[^)\s]+", "\n".join(p.read_text() for p in essays))))
        for u in urls:
            try:
                req = urllib.request.Request(u, method="HEAD")
                with urllib.request.urlopen(req, timeout=30) as r:
                    print(r.status, u[:90])
            except Exception as e:
                print("FAIL", u[:90], type(e).__name__)


if __name__ == "__main__":
    main()
