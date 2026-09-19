# Phase 2 inventory — 19 September 2026

Archive counts below are project catalogue counts. They are not independently verified content hashes.

## Stores inspected

| Store | Role | Result this phase |
| --- | --- | --- |
| wezzo72/Barrandodger | presentation site | Static HTML + `/spec`. No primary PDFs stored here. |
| wezzo72/Backup `client/public/documents/` | public evidence mirror | **545** blobs, **531** PDFs. |
| drbarrandodger/barran-dodger-archive | named primary archive | Repo exists (TypeScript). Full tree not scanned. Description figure 2,077+ is **unverified here**. |
| Google Drive | external store | Not fully inventoried (API page limit). |
| barrandodger.com and related apps | external | Links **not verified** this phase. |

## Backup documents folder

- PDFs: 531
- Official-looking titles (filename/path only): 169
- Author publication titles: 41
- Sensitive titles (NDIS/health/guardianship/lease/tax etc.): 18
- Filename-duplicate groups: 1
- Same-size groups (possible duplicates, not confirmed): 17
- `blockchain_manifest.json` / `.txt` present. That is a repository file. It is **not** treated as proof of every document’s contents.

## Files that should not be auto-featured

Titles matching NDIS plans, discharge summaries, guardianship, tax file, leases. They are already public on GitHub Backup because they were uploaded earlier. Phase 2 does not delete them. It flags them.

## What Phase 2 did not do

- Did not delete, rename or overwrite evidence.
- Did not calculate SHA-256 of PDF bytes.
- Did not copy Drive files.
- Did not rebuild the website.
