# Genesis — how the ten essays were produced

View this page on the archive: [genesis.html](../ai-essays/genesis.html).

1. Source URLs: https://wezzo72.github.io/Barrandodger/ and https://barrandodger.com and the raw GitHub URLs cited in each essay.
2. Repositories discovered: listed in the execution report.
3. Discovery method: GitHub API repository list; directory list of `docs/official-drive`; direct PDF download.
4. Inventory method: evidence IDs BD-E-000001 onward in `AI_TOP_TEN_EVIDENCE_REGISTER.csv` for items opened or deliberately marked inaccessible. This is not a census of every file in the 2 GB archives.
5. Classification rules: see methodology.
6. Independence test: copies and the author’s later retellings marked derivative.
7. Contradiction test: each essay has a contrary-evidence section. Essay 10 is about wrappers that contradict the letters inside them.
8. Selection criteria: documentary strength, primary-source density, ability to verify, and the presence of a real limit or contrary record. Fewer than ten would have been published if ten readable subjects had not been found. Ten were found inside the official-drive sample and the Federal Court letter.
9. Author-blinding: the author did not select, order, or draft.
10. Essay procedure: machine-led drafting on 26 September 2026 from extracted text, then rendering.
11. PDF procedure: `fpdf2` and DejaVu Sans, via `scripts/generate_ai_top_ten.py`.
12. Publication: one git commit on `main` of `wezzo72/Barrandodger`, GitHub Pages from `/`.
13. Parent snapshot of the archive before this publication: `0b2dd5d1481df35852741447d4e799fcd1671256`.
14. Execution date: 26 September 2026.
15. Limitations: image-only PDF text not recovered; Backup and the large archive repos not fully walked; barrandodger.com body not executed; Legal Aid source PDF not opened; no API key is used or stored.
16. Inaccessible: `docs/official-drive/2025-08-08-Commonwealth-Ombudsman-Service-Restriction.pdf` (no extracted text). 12 April 2022 IBAC assessment PDF did not yield usable text and was not used.

## Executable source

`scripts/generate_ai_top_ten.py`

GitHub Pages does not execute this script. It is the reproducibility source for the HTML and PDF. Running it requires Python 3 and the `fpdf2` package. It does not require an API key. It republishes the checked-in essays. It does not, by itself, perform a new reading of the corpus.

Optional URL check, which only requests the links already written in the essays:

`python3 scripts/generate_ai_top_ten.py --check-urls`

## Statement

The analysis is machine-led and designed to apply the same evidentiary rules to supporting, adverse and unresolved material. The system has no personal financial stake, personal relationship with the participants, or independent interest in the outcome. Its conclusions remain subject to the quality of the source corpus, the accuracy of extraction, the limitations of the model and independent human verification.
