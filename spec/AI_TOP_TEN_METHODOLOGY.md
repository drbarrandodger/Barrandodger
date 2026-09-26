# Methodology — top ten impartial AI evidence essays

Execution date: 26 September 2026.

## What was done

1. Public GitHub accounts `wezzo72` and `drbarrandodger` were listed through the GitHub API. Repository URLs are in the genesis record.
2. `https://barrandodger.com` was fetched. The HTML head was read. The client application behind that page was not executed, so body claims beyond the head are not treated as inspected.
3. `https://wezzo72.github.io/Barrandodger/` was inspected as the Pages archive. Its finding-aid language was read from the published door.
4. `docs/official-drive` in `wezzo72/Barrandodger` was listed: 48 filenames. 25 PDFs were downloaded and text-extracted with pypdf, limited to the pages the extractor returned. One three-page PDF (the file named as an 8 August 2025 Ombudsman service restriction) returned no readable text.
5. The 27 March 2023 Federal Court letter was read from `wezzo72/Backup`, including the archive covers around it.
6. A Legal Aid NSW extract already stored as text in the repository was read. Its source PDF was not opened.
7. Subjects were ranked by whether an official instrument could be read, whether it decides something a third party can check, and whether the archive’s wrapper says something the instrument does not. Dramatic allegations without an opened primary record were not promoted into the ten.
8. Essays were drafted to the classification rules below. A second-pass comparison checked quotations against the extracted text used in this execution.
9. HTML and PDF copies were rendered by `scripts/generate_ai_top_ten.py` from `spec/essays/*.md`.

## Classification

- A — documented fact, from an accessible primary or official record.
- B — corroborated claim, more than one independent record, not necessarily a formal determination.
- C — documented allegation.
- D — inference.
- E — unresolved or speculation.
- UNVERIFIED — not checked against a record.
- NOT CURRENTLY ACCESSIBLE — the file exists or was named, and its contents could not be read.
- DERIVATIVE — the same document or the same author’s later retelling. Not counted as independent corroboration.

## What was not done

The multi-gigabyte trees `wezzo72/Backup`, `wezzo72/barran-dodger-archive` and `drbarrandodger/barran-dodger-archive` were not recursively inventoried file by file. No hashes were computed for this publication. No blockchain proof was verified. No court that was not in the opened PDFs was searched. Homepage statistics were not audited.

## Author blinding

The author’s preference, theological ranking, and self-description were not used to choose the ten subjects. His testimony remains in the corpus and is labelled as testimony.

## Reproduction

`python3 scripts/generate_ai_top_ten.py` rebuilds HTML and PDF from the checked-in markdown. It does not call a model. A new analytical pass would be a new execution, not a silent rerun of this script.

## Not a determination

These essays are an AI-generated analytical synthesis. They are not a court judgment, a government finding, or a grant of whistleblower status.
