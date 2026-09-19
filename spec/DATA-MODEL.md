# Data model — Phase 14 (Master Evidence Ledger)

Stable ID prefixes (required):

| Prefix | Entity |
|--------|--------|
| CLM- | Claim |
| DOC- | Document |
| PER- | Person |
| ORG- | Organisation |
| EVT- | Event |
| LAW- | Law or policy |
| RSP- | Response (official reply / decision record) |
| OUT- | Outcome |
| CST- | Cost item |
| PUB- | Publication |
| SRC- | Source store / archive |

## Core rule

A row in a ledger is a **catalogue record**. It is **not** a finding.

- Do not create a CLM- row that states an offence is established.
- Do not attach ORG- or PER- rows to the words “corrupt”, “criminal”, “fraudulent” or similar unless an authoritative determination is cited and the status is set accordingly.
- Default evidence_status for unadjudicated author statements: `AUTHOR'S ACCOUNT` or `ALLEGATION` or `RESEARCH QUESTION`.
- High-consequence rows (violence, sexual assault, attempt to cause death, conspiracy, etc.) remain at least `ALLEGATION` / `H` until independent material justifies a higher status.

## Entity required fields

### Document (DOC-)
`id`, `title`, `source`, `original_path`, `evidence_classification`, `privacy_classification`

### Person (PER-)
`id`, `name`, `role_in_archive`, `status`

### Organisation (ORG-)
`id`, `name`, `type`, `jurisdiction`, `status`

### Event (EVT-)
`id`, `label`, `date_from_filename` (or verified date if sourced), `status`  
Filename dates are **FILENAME DATE ONLY** unless separately verified.

### Claim (CLM-)
`id`, `text`, `linked_documents`, `evidence_status`  
Default: `AUTHOR'S ACCOUNT` or `RESEARCH QUESTION`. Never invent offences.

### Law / Policy (LAW-)
`id`, `name`, `jurisdiction`, `status` (`REFERENCE ONLY` unless a determination is cited)

### Response (RSP-)
`id`, `label`, `linked_document` or `source`, `status`

### Outcome (OUT-)
`id`, `label`, `linked_claim` or `linked_event`, `status`

### Cost (CST-)
`id`, `category`, `figure` (or range), `status` (`DOCUMENTED` / `ESTIMATED` / `HYPOTHETICAL` / `UNKNOWN`)

### Publication (PUB-)
`id`, `title`, `author`, `source_path`, `status`

### Source (SRC-)
`id`, `name`, `url` or `repo`, `role`

## Relationships (allowed)

Every relationship must cite at least one document id, path, or stable source id. No relationship without a source file or catalogue entry.

Allowed edges:

- Person ↔ Document
- Person ↔ Organisation
- Person ↔ Event
- Organisation ↔ Document
- Organisation ↔ Event
- Event ↔ Document
- Event ↔ Law
- Claim ↔ Document
- Claim ↔ Person
- Claim ↔ Organisation
- Claim ↔ Event
- Claim ↔ Law
- Claim ↔ Cost
- Claim ↔ Response
- Claim ↔ Outcome
- Publication ↔ Document
- Publication ↔ Person
- Publication ↔ Event
- Response ↔ Document / Organisation
- Outcome ↔ Claim / Event / Document
- Cost ↔ Claim / Person / Organisation

Example chain (illustrative only):

`PER-0001 → EVT-0001 → DOC-… → ORG-… → RSP-… → LAW-… → OUT-… → CST-…`

## Evidence status enum

`JUDICIALLY ESTABLISHED` · `OFFICIALLY DETERMINED` · `DOCUMENTED FACT` · `PRIMARY SOURCE` · `OFFICIAL RECORD` · `CORROBORATED` · `AUTHOR'S ACCOUNT` · `ALLEGATION` · `INFERENCE` · `INTERPRETATION` · `POSSIBLE LEGAL CHARACTERISATION` · `UNVERIFIED` · `DISPUTED` · `RESEARCH QUESTION` · `UNKNOWN`

## Privacy classification enum

`PUBLIC` · `PUBLIC WITH REDACTION` · `RESEARCH USE` · `RESTRICTED` · `PRIVATE` · `DO NOT PUBLISH` · `PUBLIC ON GITHUB — SENSITIVE TITLE`

## Implementation files

| File | Role |
|------|------|
| `data/schema.json` | Machine-readable schema + enums |
| `data/people.json` | PER- |
| `data/organisations.json` | ORG- |
| `data/events.json` | EVT- |
| `data/claims.json` | CLM- (empty of invented offences) |
| `data/documents.json` | DOC- header |
| `data/laws.json` | LAW- |
| `data/costs.json` | CST- |
| `data/publications.json` | PUB- |
| `data/sources.json` / `sources-ledger.json` | SRC- |
| `data/relationships.json` | Edges |
| `ledger.html` | Human-readable ledger view |

## Phase 14 stop rule

This phase formalises the ledger structure and viewer. It does **not** seed new alleged offences, does not invent people or findings, and does not proceed to interactive graph expansion or full forensic modules.
