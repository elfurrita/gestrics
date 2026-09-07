# Changelog

Changes you can see when using Gestrics, version by version. Anything invisible
in day-to-day use — refactors, tests, build tweaks — is left out.

This file follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
[Semantic Versioning](https://semver.org/).

Spanish version: [CHANGELOG.md](CHANGELOG.md)

---

## [1.1.0] — 2026-09-07

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
- **A support address inside the application**: in the translator profile, next
  to the technical log download button, on the server-unavailable screen and on
  the recovery screen after an error. It lived only on the website, so anyone
  who got stuck inside the program had no one to write to without leaving to
  look for it.
- The license activation screen now says who to write to. The messages for a
  suspended or blocked license, or one activated on too many devices, all ask
  you to contact support, and that screen —the very first one, with the whole
  app behind it— gave no address at all: the only one in the app lives in the
  translator profile, on the far side of the door that won't open.
- The setup guide can always be reopened, from Settings. It used to be a header
  icon that only appeared if you had skipped the profile step, so anyone who
  filled in their name —most people— lost the wizard and the tour for good. It
  now sits next to Diagnostics, where the rest of the housekeeping lives, and
  takes up no room in a header that has none to spare.
- The empty contact list now says where to start. On a fresh install it was the
  first thing you looked at —an icon, "No contacts" and nothing else— with both
  doors in plain sight but neither announcing itself as the first step. It now
  names both: the "New contact" tab above and the "Import contacts" button
  below. It only shows while the list is genuinely empty, never when it is the
  search box or the status filter that found nothing.
- The new-project form now says where clients come from when there are none.
  Anyone who buys the app for the invoicing goes straight to Projects and finds
  the client dropdown with a single option, "pick one": clients are your
  Outreach contacts, which is a different tab, under a different name, with
  nothing tying the two together. The hint only shows while the list is empty.
- The onboarding wizard now explains what the tax country decides, with the
  same sentence the translator profile already used: that choice drives the
  name of each tax, the rates offered, the tax ID label and whether the invoice
  carries Veri*Factu. It was the only one of the two places where you pick it
  that said nothing — and it is the first one you go through.
- **14-day free trial.** The whole application can be used, with no key and no
  card, for fourteen days from the first time it is opened. A strip under the
  header shows how many are left, turning from amber to red for the last three;
  from there you can buy a license or enter one you already have. Once the time
  is up, the application asks for a license to get back in and says so in those
  words, instead of pointing you to a purchase email that never existed. Your
  data stays where it was.

### Changed

- **The terms of use no longer claim the invoice complies with Spanish Royal
  Decree 1007/2023.** The invoicing section said that, on the Spain profile,
  the app generates documents "following, in 'No Veri*Factu' mode, the
  technical requirements" of that decree. That was not accurate: the
  hash-chained record the app keeps is its own traceability measure, and
  neither the QR code nor the hash follows the format required by Order
  HAC/1177/2024. The text now describes what it actually does and states
  plainly what it does not yet meet, so nobody relies on it with their
  accountant.
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
- **The "server unavailable" screen no longer asks for a terminal command.** It
  showed `cd server && npm start` to someone with no terminal —the local server
  is started by the application itself— and no folder by that name even exists.
  It now states the only thing a user can actually do: close Gestrics and open
  it again, which relaunches the process.
- Connecting your email is no longer required to get in. The onboarding
  wizard's "Connect your email" step could not be skipped, does not close on
  Escape or on an outside click, and covers the rest of the app — so anyone
  without an app password to hand was locked out of what they had just
  installed, even though projects, quotes and invoices work without email. It
  can now be left for later: while it is still pending, the Settings gear
  carries an amber dot that explains itself on hover, and any attempt to send
  says so in the interface language instead of failing against the server.
- The wizard's email step now says which account is connected, not just that one
  is. A green tick with no address asks you to take its word for it, and that is
  exactly the doubt that leads to retyping an app password that was fine.
- The wizard's second step was called "Billing details" and collected two of the
  profile's twenty-seven fields. It is now "Name and tax country" and says where
  the rest —tax ID, address, IBAN— gets filled in, instead of implying an
  invoicing setup that stops halfway.
- **The Terms of Use now cover the trial period.** Section 3 becomes "Trial
  period, license to use and activation" and describes the fourteen days:
  every feature, no key and no means of payment, counted on the device
  itself. It previously said only that use was subject to payment and a
  license key. Because this is a substantive change, the application asks
  for the terms to be accepted again the next time it opens.

- **The support address is now `contact@outreachstudio.app`.** It replaces
  `soporte@`, and it is the one shown in the translator profile, on the
  "server unavailable" screen, on the recovery screen after an error, on the
  licence activation screen and on the line that asks for the send log to be
  attached. It comes from a single constant, so all five change together; the
  website advertises the same one.

### Fixed

**Backup**

- **Restoring a backup silently dropped eleven columns.** The restore
  writes each table naming its columns one by one, and the ones added later were
  never added there. Among the losses: the issuer identity frozen at invoicing
  time — so an old invoice went back to using your CURRENT details — the tax
  country it was issued under, the date of supply, the payment-reminder state —
  your client received the whole chasing sequence again for an invoice they may
  already have paid — the Stripe payment link, and the flag marking a deliverable
  as already sent. The quietest one: the period of a recurring invoice, which is
  what stops the same month being invoiced twice; without it, restoring was
  enough to issue that month's invoice a second time. A backup now returns
  exactly what it stored, and a check verifies it by exporting, restoring and
  comparing.

**Invoices and quotes**

- **One invoice in ten did not add up to its own total.** VAT and withholding are
  rounded to the cent, but the total was computed on the full decimals, so the
  totals block could contradict itself: on a €50.03 base the invoice read
  50.03 + 10.51 − 7.50 with a TOTAL of **53.03** instead of 53.04. Sweeping bases
  from €50 to €10,000 at the usual rates, 1,160,062 of 11,940,012 combinations
  failed to add up. Each amount is now rounded to its currency's smallest unit —
  the yen has no cents, the Kuwaiti dinar has three — and the total is the sum of
  those figures, which is what gets paid.

- **The CAT breakdown lines did not add up to their own total.** Each line was
  rounded on its own while the total came from the exact amounts, so the printed
  lines could differ from the figure below by a cent: at €0.0333 per word, four
  lines added up to €43.92 while the total read €43.91. On a quote that invites a
  question from the client; on an invoice the mismatch was against the **taxable
  base**, which is precisely what those lines exist to determine. The difference
  is now allocated to the largest line and the document adds up.

- **An invoice with no issue date vanished from the accounting CSV.** It was
  dropped even when exporting everything with no date range, so an issued invoice
  could simply never reach your accountant without anything saying so. It now
  appears in the full listing, with the date column blank so the problem is
  visible; a quarterly export still leaves it out, since without a date it cannot
  be assigned to a period.

- **A client name in Hindi (or any Indic script) came out as empty boxes.** The
  fallback font meant to cover them was looked up under a filename that does not
  exist on Windows, so it was never used. It now prints correctly, and the
  internal warning that reported the lost characters — which did work — stops
  firing.

- **New warning when invoicing a client whose details are in Arabic or Hebrew.**
  The PDF prints those letters reversed and unjoined, because it does not lay out
  right-to-left text. Since the recipient's name is mandatory on an invoice, the
  dialog now warns you before issuing instead of letting you find out in the
  document you already sent.

- **A country written without accents left the invoice missing its mandatory
  wording.** The dropdown on the client card stores canonical names, but
  **importing contacts** from a spreadsheet stores whatever the file says:
  "Espana", "Belgica", "Paises Bajos", "Deutschland", "Holanda", "USA"… None
  were recognised, and an unrecognised country meant the app did not print the
  reverse-charge wording on an intra-EU invoice. Accents, dots and the most
  common endonyms now resolve alike. And when the country still isn't
  recognised, the issuing dialog **warns before you issue** instead of staying
  silent.

- **Editing a paid invoice wiped its payment date.** Just opening the invoice and
  saving again was enough, even without changing anything: the dialog doesn't
  send the payment date, and the server blanked it anyway. From then on, the CSV
  for your accountant reported that invoice as **unpaid** with an empty
  payment-date column, it dropped out of "Collected" and out of the average
  time-to-payment in Metrics, and the job card offered to generate a payment link
  again for something your client had already paid.

- **The default due date counted from today, not from the invoice date.** An
  invoice dated earlier said "30 days" and fell due after 47. The sum was also
  done in hours: the day daylight saving ends is 25 hours long, so the term
  landed a day early. It is now 30 days from the invoice date, counted in days.

- **Dates were off by one day outside the Madrid time zone.** A date stored as
  `2026-08-20` was read as midnight UTC, so in Mexico, the United States,
  Brazil, Chile, Colombia, Peru, Argentina or Canada it was shown and printed as
  the 19th. It affected everything at once: the invoice issue and due dates, the
  quote's validity, the date of supply, and every date in the interface. Writing
  failed the other way round — the UTC day was used — so invoicing in the
  afternoon in Mexico issued the document with **tomorrow's date**, and that date
  is frozen into the invoice ledger. Alerts were off too: an invoice showed as
  overdue on its own due date, and the **payment reminder reached the client a
  day early**.

- **You could issue an invoice without your own tax details.** Until now the tax
  ID and address were optional fields in Settings, so a fresh installation could
  generate an invoice whose issuer was just a name. Such an invoice is not valid
  anywhere. The app now refuses to issue it and says exactly which fields are
  missing and where to fill them in; the rejected invoice consumes no number and
  leaves no trace. The client's details are not blocked — their tax ID is not
  always mandatory, and requiring it would prevent invoicing a private
  individual — but the issuing dialog warns when they are missing and explains
  when they matter.

- **Correcting an issued invoice left two documents in circulation under the
  same number.** When you changed the VAT or withholding on an invoice you had
  already sent, the app asked for a reason and recorded the correction in its
  internal ledger, but the PDF still came out with the original number and date
  and the new amounts: the client ended up with two different pieces of paper
  both claiming to be invoice 2026-001. The QR code, which did read the right
  ledger entry, also contradicted the heading printed right above it. The
  document is now issued as what it is — "RECTIFICATIVE INVOICE #R-2026-001",
  with its own date, the invoice it corrects, the reason and the rectified
  amount — and the QR agrees with the heading. The project card and the email
  attachment use that number too.

- **The invoice said two different things about when it was due, and neither
  was yours.** The top right read "Payment due: 30 days end of month" and
  halfway down the page "Payment due upon receipt": both were hardcoded and
  contradicted each other, while the due date you actually picked when issuing
  never appeared anywhere. The invoice now shows that real date, next to the
  issue date. Leave it blank and nothing is printed, rather than inventing a
  term.
- **"Invoice notes" did not appear on the invoice.** The issuing dialog asks
  for that text under exactly that label and suggests using it for an account
  number or payment terms; it was then stored and never shown on the document.
  It now prints below the payment terms, on its own page if needed and without
  truncation — it is where a legal mention goes, such as the reverse charge on
  an intra-EU invoice.
- **Changing your own details rewrote invoices you had already sent.** The
  issuer's name, tax ID, address and bank details were read from Settings every
  time a PDF was downloaded, not from what they were at issue time. Moving
  house, fixing a typo or incorporating changed who appeared as the issuer on
  **every** earlier invoice, including the ones the client already had. That
  identity is now frozen on the invoice, and the QR code likewise stops
  attributing an old invoice to a new tax ID. Invoices issued before this
  change behave as they did, since they have nothing frozen to show.

- **A foreign client's name was destroyed in the PDF.** Both documents were
  generated with the PDF format's standard fonts, which only cover the Western
  Latin alphabet. Any other character came out as garbage, with no warning: a
  Polish agency called "Biuro Tłumaczeń Sp. z o.o." was printed as
  "Biuro T'VÖ7eB7.". The same went for Czech, Turkish, Romanian,
  Greek, Cyrillic, Japanese, Chinese and Korean — and the recipient's name is a
  mandatory invoice detail. Only Spanish accents and the euro sign were spared,
  which is why invoicing within Spain never showed the problem. Both documents
  now embed a full font, with automatic fallback for alphabets that font does
  not cover, and anything no installed font can represent is recorded in the
  application log instead of silently vanishing.

**Onboarding**

- Switching email provider in the wizard left the previous provider's error on
  screen: picking "Custom" after failing with Gmail still showed the notice
  about the Gmail app password, below a form that was now asking for something
  else.
- With a "Custom" email provider, the "Use SSL/TLS" checkbox came ticked while
  the suggested port was 587 — precisely the combination that cannot work, since
  465 is TLS from the first byte and 587 is STARTTLS. Anyone who typed their own
  server and left the suggested port failed on the first attempt without having
  got anything wrong. The checkbox now starts unticked, matching 587, and
  follows the port on the two values where the answer is not open to debate; on
  any other (2525, 25, one of the provider's own) whatever you ticked by hand is
  respected. This covers both forms, the wizard's and Settings'.
- Connecting your email from the onboarding wizard left the Settings screen
  looking as if no account existed —provider "Gmail", every field empty— with
  the email already working. The wizard only wrote where the server reads to
  send, and that screen is painted from somewhere else that nothing was
  updating; for the same reason, reopening the wizard asked again for the
  password of an account that was already connected. The password is still not
  stored there.

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
- The label on the profile's tax-note field was hardcoded to "VAT / Tax note":
  one country's tax names on the same line, whoever was looking. It now comes
  from the fiscal profile like the rest of the app — "GST note" on an Indian
  profile, and the translated generic when the country has no term of its own.
- The IBAN placeholder suggested a Spanish-shaped number (`ES00 0000…`)
  whatever the fiscal profile said. It is now neutral (`XX00 0000…`): it keeps
  the hint about how an IBAN is grouped without assuming the country, and it
  matches the BIC placeholder beside it.
- The accounting CSV export hardcoded both tax column headers in Spanish
  ("% IVA", "% IRPF"), ignoring the fiscal profile: a translator with a Mexican
  profile got an "IRPF" column for what their country calls ISR, contradicting
  the PDF of that same invoice. With the interface in English, the whole header
  row, each row's status and the file name still came out in Spanish.
- The "Correction history" for an invoice named the withholding tax generically
  instead of by the name it has in the translator's country: with a Mexican
  fiscal profile it read "Withholding" where the rest of the app already said
  "ISR". The VAT on that same line was already correct.
- The warning about a negative tax rate named IVA and IRPF, two Spanish taxes,
  regardless of the translator's country: a Mexican user was told the problem
  was their IRPF, which does not exist there — their withholding is ISR — and an
  Indian user, who only has GST, got the same. It now refers to "tax rates",
  naming none of them.
- Withholding was labelled "IRPF" on almost everyone's invoice. Only Spain and
  Mexico had a name of their own for it, so a Colombian, Argentine or Chilean
  translator — or anyone from the remaining countries — saw the Spanish tax
  named where theirs belonged. When a country has no specific name, it now says
  "Retención" (plain "Withholding" in the English interface). VAT is unchanged:
  that one really is called the same across the Spanish-speaking world.
- The reason field for a credit note asked for it "when changing VAT/IRPF" and
  offered "VAT applied incorrectly" as the example, two lines below fields that
  did call each tax by its own name. Those two sentences now use the country's
  name as well.

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
- The notice that trims a batch send on reaching the daily limit left a literal
  `{{remaining}}` on screen in its second sentence ("Sending to {{remaining}} of
  8 contacts"), in both Spanish and English: the placeholder occurs twice in the
  string and only the first one was being filled in.

**Sending email**

- **An already-saved password looked exactly like a field that never had
  one.** The server never returns the email account password, not even
  encrypted, so the Settings field showed up empty whether or not an account
  was connected. Anyone coming back months later had no way to tell if their
  email was still set up. Now, when there is one, a green dot and “One is
  already saved” appear next to the label, and the field itself says “Leave
  blank to keep it unchanged”.

- The same email could reach the client **three times**. If the connection
  dropped right after the message was handed over — the server already had it
  queued and only the confirmation was lost — the app treated it as failed and
  sent it again up to three times, then reported an error. In outreach that
  means the same cold email repeated to a prospect. Only failures known to have
  happened before delivery are retried now, such as a temporary rejection of
  the recipient; everything else is reported without sending again.
- Every refusal from the mail server was announced as "check your app
  password". An address that does not exist, a message that is too large or one
  blocked by a spam filter all sent you off to retype a password that was
  perfectly fine, with no way out: the check in Settings kept saying it was
  correct. Each case now says what actually happened.
- A server that stalled halfway could leave the app on "Sending…" for up to
  half an hour — ten minutes per attempt, and it tried three times — with
  nothing to click and no way to tell whether the email had gone out. Each
  stage of the connection now has its own timeout.
- The subject line could go out with unresolved variables. If it contained
  "{{idiomas}}" or "{{especialidad}}" — the body template accepts both, and the
  unresolved-variable warning treated them as fine — the client received the
  literal braces in the subject line of a cold email. The contact's history
  even stored the correctly resolved subject, so it did not show up there
  either.
- An empty attachment was sent as if nothing were wrong. A 0-byte file — an
  export that failed halfway, or one the cloud had not finished downloading —
  was accepted, listed as an attachment, and then silently dropped at send
  time: the client got the email without the file and the app reported success.
  It can no longer be added, and if one arrives empty by another route the send
  stops and names it.
- Saving the email settings when the file could not be written to disk — no
  free space, no permissions, or an antivirus locking it — silently shut down
  the app's internal server: the window stayed open and everything else stopped
  responding without a single warning. It now explains the problem and the app
  stays up.

- A format that cannot be sent is now flagged when you pick the file, not when
  you send. An .exe or a .docm was accepted as an attachment — the file
  dialog's filter is only a hint, and picking "All files" got around it — sat
  in the list like any other, and the rejection only arrived when you pressed
  Send; in a batch, once per contact. It is now checked when you pick it and
  when it is saved, with the same rule deliverables already used.
- The sending warnings that were hardcoded in Spanish now read in the
  interface language: a malformed recipient address, an attachment that is too
  large, a format that is not accepted, more than five files, and the
  send-rate limit. Until now only connection errors with the mail provider
  were translated.
- Changing the email account without typing the password said "Settings saved"
  and changed nothing: the screen showed the new address while emails kept
  going out from the previous one. Since the password is never pre-filled, all
  it took was reopening Settings and editing the address. It now says the
  password is needed to verify the account and leaves the dialog open with
  everything you typed, instead of reporting as saved what was not.

**Other**

- **“Cancel” in Settings did not revert three fields.** The app password, the
  Stripe key and the licence key are typed outside the settings draft — they
  are text used to activate or verify something, not a setting that gets saved
  — so closing with Cancel left them there, still filled in on the next open,
  as if nothing had been cancelled. The modal now clears them when it opens.

- Response metrics were stuck at 0 after automatic reply detection was removed.
- The file types accepted as attachments are the same everywhere in the app, and
  include the formats used in translation work.
- Form examples no longer show addresses or numbers that looked like real data
  already filled in.
- With Windows in dark mode, the application shell appeared flanked by two
  almost-black bands. A dark-mode block inherited from the scaffolding template
  had survived, redefining the background, text and border of an interface that
  deliberately uses a light palette.
- The email templates no longer carry the original installation translator's
  identity anywhere in the installed application. A migration remained with
  their name, their degree and their professional profiles written in plain
  text, inside a file that is installed uncompressed.
- An internal server crash now leaves a record in `send.log`. This is a
  separate path from the error screen, which recorded its own failures before
  and still does: this is about the process that stores your data. That it had
  died was recorded nowhere at all, and the reason came down to a race: the log
  is written through a stream that process shutdown does not wait for, so that
  last line — the one explaining the crash — arrived or not with nothing to
  guarantee it, and never arrived at all while the file had yet to be created.
  It is now written straight to the file before exiting, and the application
  also records that the internal server has terminated, which until now only
  went to a console the installed version does not have.
- An unexpected server failure no longer takes the last thing you did down with
  it. The database saves lazily — changes pile up in memory and reach disk a
  second later — and closing the application properly forces that save before
  exiting. Crashing did not: there were two uncaught-exception handlers, and the
  first killed the process before the second, the only one that saved, ever ran.
  Any uncaught exception, or any unhandled promise rejection, threw away
  whatever was pending: the contact you had just edited, the hours you had just
  logged. All four exit paths now save.
- Unexpected interface crashes left no trace in `send.log`. There were two
  nested safety nets, and the inner one —the one that actually caught every
  failure, being the closer of the two— only wrote to the browser console: the
  very file the error screen asks you to attach carried not a line about that
  crash. Only the outer net remains, and it does record the stack trace.
- That error screen now appears in the active language. It carried all of its
  text in Spanish and English at once, one below the other, and was the only
  screen in the app that did not go through the translation system. On top of
  that, while no language had been chosen it always fell back to Spanish, even
  when the system was in English.
- Every warning the app gives you when something cannot be done now reads in
  the interface language. Until now a good part of them arrived in Spanish even
  with the app set to English, because the text was written inside the program
  and shown as-is. There are about fifty: contacts, jobs, invoices, recurring
  plans, hours, expenses, glossary, deliverables, Stripe, licence and exchange
  rates. Several also say more clearly what happened — that another contact
  already uses that email, how many jobs have to go before one can be deleted,
  or that an already-invoiced job has its amount frozen into its invoice.

### Security

The app's first security review, focused on what can realistically happen to a
translator: a bad file you open yourself, and a web page open in your browser
while Gestrics is running.

- **Restoring an incomplete backup no longer deletes issued invoices.**
  Restoring a backup made with an older version — one that did not yet save the
  invoice ledger — emptied that ledger and reported success. And since invoice
  numbering is derived from it, the next invoice was named 2026-001 again: a
  number already sent to another client. The app now stops before touching
  anything, tells you how many issued invoices would be lost and with which
  numbers, and only continues if you confirm it explicitly.
- **A backup with a tampered invoice ledger is never stored.** Ledger entries
  are hash-chained precisely so that altering one shows; but on restore they
  were written back as-is, unchecked. A hand-edited backup file could write
  invented invoices for any amount. The whole chain is now verified before
  anything is restored, and an entry that does not check out never reaches the
  disk under any circumstances. If the backup's ledger is damaged, the app
  tells you and offers to recover everything else - contacts, jobs, invoices -
  leaving the ledger empty, rather than leaving you unable to restore at all.
- **A restore that fails halfway no longer leaves your data halfway.**
  Previously the tables were emptied and then filled row by row, skipping the
  ones that failed: the result was "restored" with an error count beside it, and
  an incomplete database. A restore is now a single operation — all of it or
  none of it — and if something fails it tells you which row, with your data
  untouched.
- **The local server only answers requests addressed to 127.0.0.1.** Gestrics
  runs a server on your machine so the app itself can talk to it. Even though it
  only listened locally, a web page open in your browser could reach it by
  pointing its own domain at your machine, and read your contacts, invoices and
  stored keys from there. The app now checks which name it was called by and
  turns away anything that is not your own.
- **The date of the last licence check is now stored encrypted.** The 7-day
  offline allowance hangs off it, and it sat in plain text inside
  `license-config.json`: a date in a JSON file inviting you to change it in a
  text editor. It is now encrypted like everything else, and a hand-written
  date is discarded rather than trusted. This is the same rule already applied
  to the trial record; this file had simply been left out. If the first launch
  after updating happens offline, one online check is needed to regain the
  offline allowance.
- **An imported contact can no longer smuggle a formula into your exports.**
  Excel and LibreOffice execute a cell that starts with `=`, `+`, `-` or `@`.
  If you imported a contact list from an agency and one of its fields carried
  a formula, it was stored as-is: exporting your contacts and opening the file
  ran that formula on your machine. Those cells are now marked as text in CSV
  and TSV exports. Amounts are left alone, so the CSV for your accountant
  still adds up, and re-importing one of your own exports into Gestrics gives
  back the original text.

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
