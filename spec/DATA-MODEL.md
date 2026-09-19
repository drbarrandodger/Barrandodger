# Data model — Phase 3

Stable ID prefixes:
- CLM- claim
- DOC- document
- PER- person
- ORG- organisation
- EVT- event
- LAW- law or policy
- CST- cost item
- PUB- publication
- SRC- source store

## Rule
A row in a ledger is a catalogue record. It is not a finding.
Do not create a CLM- row that states an offence is established.
Do not attach ORG- or PER- rows to the word corrupt or criminal.

## Required fields

Document: id, title, source, original_path, evidence_classification, privacy_classification
Person: id, name, role_in_archive, status
Organisation: id, name, type, jurisdiction, status
Event: id, label, date_from_filename, status (FILENAME DATE ONLY unless separately sourced)
Claim: id, text, linked_documents, evidence_status (default AUTHOR’S ALLEGATION or RESEARCH QUESTION)
Law: id, name, jurisdiction, status (REFERENCE ONLY unless a determination is cited)
Cost: id, category, figure, status (DOCUMENTED / ESTIMATED / HYPOTHETICAL / UNKNOWN)
Publication: id, title, author, source_path, status (AUTHOR PUBLICATION)

## Relationships allowed
Person ↔ Document
Person ↔ Organisation
Organisation ↔ Document
Event ↔ Document
Claim ↔ Document
Publication ↔ Document

Relationships must cite a document id or path. No relationship without a source file.
