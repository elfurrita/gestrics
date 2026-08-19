# Changelog

Changes you can see when using Gestrics, version by version. Anything invisible
in day-to-day use — refactors, tests, build tweaks — is left out.

This file follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
[Semantic Versioning](https://semver.org/).

Spanish version: [CHANGELOG.md](CHANGELOG.md)

---

## [1.1.0]

The first release that actually ships. It replaces the installer uploaded on
10 August under this same number: that build was produced before the licensing
code existed, so it did not include the activation its own release note
announced.

### Added

- **Licence activation and validation.** The app requires an active licence to
  run, and lets you deactivate the current computer so you can activate it on
  another one.
- **"Send delivery"** on the job card. Previously you had to scroll to a
  separate card at the bottom of the page, upload the files there and then, in a
  second step, tick them and send; anyone who did not know that card existed
  could not find how to deliver the work at all. Files are now picked inside the
  send dialog itself.
- **"Send invoice"** on the invoice card, with the invoice file visible and the
  download button beside it. Emailing the invoice was possible before, but only
  through a path you had to know about in advance.
- **CAT category breakdown on the project page.** It was previously only visible
  by reopening the edit form.
- **Free-text language pair**, with the common combinations offered as
  suggestions. It used to be six fixed options, all between English, French and
  Spanish, plus an "Other" that forced a detour on every project.
- **Phone, address and tax ID** in contact export and import. They were dropped
  on every export.

### Changed

- **Full visual overhaul**: new wordmark, consistent icons throughout, a shared
  design for dialogs, skeleton placeholders instead of spinners, custom
  scrollbars, and a single system of corner radii and shadows.
- **Every piece of interface copy rewritten**, in both Spanish and English.
- **Template editing and preview merged into one screen**, instead of two
  separate modes.
- **The email subject saves itself** as you type.
- **The invoice is no longer stored as a file**: it is generated at the moment
  you download or send it, so it always reflects the current data. Previously a
  copy frozen at invoice-creation time was kept, which meant anyone generating a
  payment link afterwards could send the client an invoice **without that link**.

### Fixed

**Invoicing and tax**

- Withholding tax now appears under the name it has in the issuer's country —
  ISR in Mexico, IRPF in Spain — in the form, on the invoice card and in the
  PDF. It previously always said "IRPF", so a Canadian invoice displayed a
  Spanish tax, and a Mexican one could show four different names for the same
  tax.
- Negative VAT and withholding rates are rejected on both creation and
  rectification.
- A rectification that only redistributes VAT and withholding without changing
  the total is now recorded as such.
- An invoiced project can no longer be deleted.
- The manual project status can no longer mark a project as invoiced when no
  invoice exists.
- CAT breakdown amounts respect each currency's decimal places.

**Data and backups**

- Restoring a backup kept the contact but **lost its entire history**. Not any
  more.
- Restoring no longer loses creation and modification dates either.
- Advancing a project's status deleted every deliverable, including files that
  had never been sent to anyone. Only files that actually reached the client are
  removed now.

**Outreach**

- The daily sending limit was saved and displayed, but never enforced.
- Cancelling a batch send during a retry wait took up to a minute to take
  effect. It now responds almost immediately.
- The estimated duration of a batch send was overstated, worst of all on small
  batches.
- Contacts whose last send failed showed up as "Pending", with no way to tell
  them apart from contacts never contacted at all.
- Contact search ignores accents: "jose" finds "José".
- The 5 MB attachment limit was advertised but never checked; the failure only
  surfaced on sending, as a confusing email error.
- Email addresses with leading or trailing spaces are trimmed on save.
- Deleting a contact could be blocked with no way out by glossary terms or
  recurring plans that no screen let you manage.

**Other**

- Response metrics were stuck at 0 after automatic reply detection was removed.
- The file types accepted as attachments are the same everywhere in the app, and
  include the formats used in translation work.
- Form examples no longer show addresses or numbers that looked like real data
  already filled in.

---

## [1.0.0] — 2026-08-09

First public release. A desktop CRM for freelance translators, with all data
kept on your own machine.

### Added

- **Outreach**: contacts, email templates, batch sending with rate limits,
  per-contact status tracking and history.
- **Projects**: jobs with word counts, rates, CAT analysis import, time
  tracking, deliverables and a per-client glossary.
- **Invoicing**: invoices with VAT and withholding tax, a purpose-built PDF, a
  hash-chained ledger compliant with Veri\*Factu, rectifications, per-country
  tax profiles and Stripe payment links.
- **Metrics**: income, expenses, response rates and a per-client breakdown.
- Full **backups**, plus contact export and import in CSV, TSV, Excel and ODS.
- SMTP sending with automatic provider detection.
- Spanish and English.

[1.1.0]: https://github.com/elfurrita/gestrics/releases/tag/v1.1.0
[1.0.0]: https://github.com/elfurrita/gestrics/releases/tag/v1.0.0
