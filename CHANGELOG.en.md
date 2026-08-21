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
- **Charts in Metrics**: collected per month over the last twelve, and collected
  per client, largest first. Until now the tab was only figures and tables: you
  could read how much had been collected in total, but not whether this month is
  going better than the last, nor which clients the money comes from.
- **A configurable main currency** in the translator settings. Totals in the
  header and in Metrics are summarised in it. The most-billed one is suggested,
  but the choice is the translator's: it is usually the currency they think and
  pay taxes in, which need not be the one they earn most in.

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
- **Currencies are named by their ISO code** — EUR, USD, GBP — in Metrics and in
  the header, instead of by symbol. Only the euro and the dollar have a symbol
  in Spanish, so a single list mixed "€" and "US$" with "GBP" and "CHF".
- **The header shows a single abbreviated total** in the main currency — "EUR
  201k" — instead of a list of per-currency amounts that did not fit the cell.
  The full amount appears on hover, and a negative profit is shown in red.
- **A freshly installed Metrics tab no longer greets you with a grid of
  dashes.** Four cards reading "—" and three tables repeating "Not enough data"
  were the first impression for someone who had just installed the app.
- **Tax-number placeholders no longer show a Spanish format.** "00000000X"
  appeared under fields labelled RFC, SIRET or GST depending on the country. In
  the Spanish interface the client's field was also labelled "CIF / NIF", so a
  Mexican translator saw Spanish wording above their client's RFC; it now uses
  the same neutral wording the English interface always had.
- **The "Quoted" counter explains what it counts** on hover: quotes already sent
  to the client. It read 0 while the first project sat in the "Quoted" state,
  and without an explanation that looked like a fault at the most fragile moment
  of all.
- **The project form's examples are prefixed with "E.g."** so they do not read
  as data already entered. The new-contact and new-project buttons lose their
  "+".
- **The rate writes its decimal separator according to the language**: "0,11
  EUR/word" in Spanish, where it previously read "0.11" right below amounts
  written with a comma. The quote the client receives stays in English, with a
  point.

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
- A skipped month of recurring billing was lost for good: if the app was not
  opened for a month, on returning only the current one was generated and the
  plan was marked as up to date, with no warning and no way to recover the
  missed month from any screen.
- Restoring a backup could issue the same month's invoice twice, each with its
  own number and its own ledger entry.

**Data and backups**

- Restoring a backup kept the contact but **lost its entire history**. Not any
  more.
- Restoring no longer loses creation and modification dates either.
- Advancing a project's status deleted every deliverable, including files that
  had never been sent to anyone. Only files that actually reached the client are
  removed now.

**Metrics**

- The header overflowed when several currencies were involved: the amount spilled
  out of its cell and over the label next to it.
- The "Net profit" card stretched across the full width when it wrapped onto a
  second row, and stopped looking like one card among others.
- The average-rate table showed rows that looked repeated — two "Technical", two
  "EN-ES". They were not: rows are grouped by label, currency and unit, because
  averaging 0.15 € with 0.18 $ would mean nothing. Each row now states what
  tells it apart from its siblings.

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
