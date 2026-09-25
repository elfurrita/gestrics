# Changelog

Changes you can see when using Gestrics, version by version. Anything invisible
in day-to-day use — refactors, tests, build tweaks — is left out.

This file follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
[Semantic Versioning](https://semver.org/).

Spanish version: [CHANGELOG.md](CHANGELOG.md)

---

## [1.1.1] — 2026-09-26

### Changed

- **"New contact" is no longer a tab, it is a button.** The Outreach panel's
  header had two tabs, "Contacts" and "New contact", and the second one led
  nowhere: it opened the new-contact form. An action button dressed up as
  navigation, which also left "Contacts" looking clickable while you were
  already standing on it. It now works like Projects: at the top sits the
  section title —"Contacts", "New contact" or "Edit contact", depending on
  what is below it, with nothing to click— and adding a contact is a button at
  the foot of the list. The form gains a "Cancel" next to its save button, the
  way out the tab used to be, and its labels —"Name", "Company"…— no longer
  sit centred over fields that are left-aligned.
- **An empty list now just says "No contacts" again.** It used to carry a
  three-line hint below it naming both doors —"New contact" and "Import
  contacts"—. With adding a contact turned into a button at the foot of the
  list, both announce themselves, and the hint was taking up half of a box
  that is already short on height.
- **The contact search box now shares a row with the title, and is a
  magnifier.** It used to have a whole row to itself, leaving the list with
  199 of the panel's 652 px: four and a half contacts in view. It now sits to
  the right of "Contacts" —which moves left until it lines up right under the
  "T" of "All statuses"— and the "Search contacts…" text gives way to a
  magnifying glass pinned to the right edge, as in Windows Explorer; while
  there is something typed, the clear cross takes its place. The list goes
  from 199 to 262 px: **from 4.6 to 6.2 contacts in view** without scrolling.
  With the new-contact form open the search box is not drawn, since there is
  no list to filter.
- **The Projects search box, the same.** Same measurements as the Outreach
  one —a 12.5 px field in a 52 px row, instead of 13 in a 62 px one— and the
  same magnifier in place of the "Search projects or clients…" text. It also
  gains the clear cross, which it never had. And the same order: the status
  filter on top and the search below, as in Outreach, so the panel header is
  the same in both views.
- **Support moves from the translator profile to Settings.** It sat at the end
  of the profile, between the IBAN and the CAT rates: a section that is not
  configured at all, on the screen where you fill in the details that get
  printed on the invoice. It now closes the maintenance block, next to the
  backup, the setup guide and diagnostics, which is what you look at when
  something is not working.
- **Every title in Settings is now left-aligned.** All eleven came out
  centred, and the longer ones —"App password", with its notice beside it—
  looked differently aligned merely because they were wider. The two backup
  buttons, on the other hand, really were stuck to the left, and are now
  centred like the rest.
- **The backup leaves the panel for Settings.** It used to be a collapsible
  bar at the foot of Outreach, where it spent 50 px of height on something
  done once a month and where nobody working in Projects could find it. It
  now lives next to the setup guide and diagnostics, with both buttons and
  —this is what could not be lost— the notice of how long since the last one,
  which the File menu has no way to give. With the room it frees, the contact
  list reaches **7.4 contacts in view**.
- **The new-project form no longer explains where clients come from.** The
  "Clients are your Outreach contacts…" hint showed under the dropdown while
  the list was empty; it has been removed.
- **"No projects" now looks like "No contacts".** It was a smaller line of
  text with nothing around it; it now carries the open-folder icon above it
  —the project icon throughout that view— and the same text size as its
  Outreach counterpart. The icon follows the reason for the gap: the folder
  when no project has been created, the magnifier when there are projects but
  the search box or the filter finds none.
- **The interval between sends now lives only in Settings.** The Outreach
  panel carried a twin of the field already there —same setting, same 3 to
  300 second range— spending permanent height on a number you set once. Added
  to everything above, the contact list goes from the **4.6 contacts in view**
  this release started with to **8.3**, without dropping a single feature from
  the panel.

### Fixed

- **"File → Import Backup…" restored nothing.** It opened the "Import
  contacts" file picker, so it asked for a CSV or an Excel file and whatever
  you picked was read as a contact list, not as a backup. That menu entry has
  never worked since it existed.
- **Trados analyses now really import, in any of their formats.** "Import CAT
  analysis" now reads the "Analyze Files" report (or the "GroupShare Analyze
  and Translate" one) just as Trados leaves it: the `.xml` in the project's
  Reports folder and whatever its "Save As" produces —XML, Excel, HTML or
  MHT—; the Excel, HTML and MHT ones with Trados in English, German, Spanish,
  French or Italian. It sorts it by itself: the
  rows come with the Trados names, in the app's language, and in the same
  order as in its report, each one already mapped to its category, and all
  that is left is to check it and confirm. Whatever the report does not make
  clear whether to charge is left unmapped, for you to decide: "Locked",
  internal fuzzy matches when the report's total does not prove they are
  counted apart from the other rows, and categories that the Trados table does
  not show. If the table in an export is not laid out as expected, the import
  says so and asks for the XML instead of sorting it wrongly. Before, only the
  Excel file could be picked, and it was misread: it opens with the title and
  the analysis settings, repeats every category file by file —so they were
  added up twice— and, with Trados in French or Spanish, it did not recognise
  the new words. With a real 862-word analysis, the import suggested 26; now,
  in any of the four formats, 862.
- **The rate accepts a decimal comma.** Typing "0,09" as a project's rate
  silently dropped the comma and left "009": nine euros per word, a hundred
  times more. The comma now counts as a decimal point, and in "Source words" a
  "1.234" with a thousands dot is 1234 words, not 1.234.
- **And the same in the other number fields.** In the recurring billing plan,
  the comma was also dropped as you typed it: an amount of "150,50" became
  €15,050 a month and "1.500,00" €1.50, and a VAT rate of "5,5", 55%. The
  amount is now read with a decimal comma or point and with a thousands
  separator —"150,50", "1.500,00", "1 500", "1,500.00"—, a "1.500" is fifteen
  hundred, and the amount as it will be invoiced shows under the field;
  anything that cannot be read without guessing, such as "150 50", is flagged
  and cannot be saved. An expense amount is read the same way and shows next to
  the button how it will be saved: it was a browser number field, which never
  takes a dot as a thousands separator and accepts the comma or not depending
  on the Windows language. The VAT and withholding rates when issuing or
  correcting an invoice and the CAT rate weights were fields of that same
  kind, and every percentage now accepts a comma with any Windows —"5,5"—,
  pasted with its "%" too. And in manual time entries, "1,5" hours was one hour
  and the half hour was lost: it is now an hour and a half, and "1:30" and
  "1h30" work too.
- **A PDF no longer opens the importer as if it were a spreadsheet.** The file
  picker lets you choose "All files", and the PDF analysis agencies often send
  opened the column mapping with the PDF's internals as headers; "Import
  contacts" did the same with a vCard. Each import now reads only the formats
  its picker offers, and anything else shows a message saying which ones work.
- **With a window open, the keyboard no longer reaches what is behind it.**
  The app's windows let the focus out: pressing Tab from "Import CAT
  analysis", or from the terms of use on first launch, reached the header
  buttons behind the overlay, and from there the whole page could be used with
  the window still open. Pressing "Import contacts" or "Import CAT analysis"
  again also left the new file with the column mapping —or the row
  assignment— of the previous one, which fell out of line over it without
  warning. Now the focus moves into the window when it opens, Tab and
  Shift+Tab cycle inside it without leaving, and closing it returns the focus
  to the button it was opened from; and each imported file opens its window
  from scratch. Escape also closes only the window on top: pressing Escape on
  the confirmation question when sending deliverables without attachments
  closed both, and the email being written was lost.
- **The menu no longer acts behind an open window either.** "New Contact",
  "New Project", both backup entries and "View Getting Started Guide" still
  worked with a window in front: Ctrl+N switched view out of sight, and
  "Import Backup…" could restore the whole database with a half-written email
  on top. They are now greyed out while a window is open, the way Windows
  treats the menu of a window that has a dialog in front, and come back as soon
  as it closes. Copy, paste, zoom and quit stay available: they are needed
  inside the window.
- **The language switchers, the "skip" links and the CAT analysis links work
  with the keyboard.** The "ES | EN" in the header and the one in the terms of
  use on first launch, the "Skip step" and "Skip tour" links in the
  getting-started guide, and "Replace analysis" and "Remove analysis" in the
  project form only responded to the mouse: Tab skipped them, and Enter and
  Space did nothing. In the terms, which cannot be closed without accepting
  them and no longer let the focus out, keyboard users had no way to change the
  language before reading them. Now Tab reaches all of them, with the browser's
  focus ring, and Enter or Space activates them; they look the same as before.
  Screen readers can also tell which language is active.
- **The CAT breakdown table no longer shows one cent more than the project
  amount.** It added up each category's amount before rounding, while the
  "Calculated amount" and the PDF add up the rounded ones: two categories were
  enough to see €49.73 in the table above an amount of €49.72. Its word counts
  now also follow the app's language: they used the system's, so with the
  system in another language they did not match the amounts next to them.
- **A name containing "$" or braces no longer scrambles the messages it
  appears in**, such as the confirmation for deleting a contact or sending them
  an email, the one for generating a recurring invoice or the summary of a
  Trados analysis. The name went through a substitution that interprets
  certain combinations with "$": "Libro de $'final" duplicated the rest of the
  sentence and left a `{language}` in plain sight, and "$$" became a single
  "$". And the placeholders were filled in one at a time, so a contact called
  "Ana {email}" got the email inside their name while the real placeholder was
  left in plain sight. The name is now copied as is. Emails to clients were not
  affected: they fill in their variables another way.
- **Notifications and client folders answer to the keyboard.** Every
  notification in the bell's dropdown and every client row in the projects
  tree only worked with the mouse: Tab walked straight past them and neither
  Enter nor Space did anything, so without a mouse there was no way to open a
  notification or collapse a client. They are now part of the tab order, they
  fire on Enter and on Space, and tabbing draws a ring around whichever one
  has focus. The notification of a recurring invoice being generated stays
  out of the tab order while it lasts, just as it was already out of the
  mouse's reach. And a screen reader announces each folder as "Client NAME,
  N projects" instead of reading out everything in the row. Nothing on screen
  changes.
- **The first press on a client folder is no longer lost.** In the projects
  tree, collapsing a client nobody had touched since the app opened took two
  clicks: the first one was dropped. It now collapses on the first one.

## [1.1.0] — 2026-09-21

The first release that actually ships. It replaces the installer uploaded on
10 August under this same number: that build was produced before the licensing
code existed, so it did not include the activation its own release note
announced.

### Added

- **A proper menu bar** (File, Edit, View, Window, Help), with the app's real
  features instead of Electron's generic default: new contact or project,
  export and import backup, check for updates, reopen the getting-started
  guide, download the technical log, terms of use and support contact. In
  Spanish or English depending on the app's chosen language.
- **New-version notice.** On startup the app checks whether a later version has
  been released and, if so, says so in a strip below the header with a download
  link. It never downloads or installs anything on its own. "Not now" silences
  that particular version, so the notice comes back when the next one ships.
  Offline, the strip simply does not appear.
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
- **Gestrics now downloads for Mac too.** A single installer that covers both
  Apple Silicon and Intel, with nothing to choose between. It carries no
  developer signature, so the first time macOS refuses to open it and you have
  to allow it from System Settings → Privacy & Security; the website explains
  this next to the download button.

### Changed

- **The approximate total in Metrics now converts 24 currencies, not four.**
  Exchange rates were only fetched for the dollar, pound, Swiss franc and
  Canadian dollar, so invoicing in Swedish krona, Mexican pesos or yen left
  that money out of the consolidated total. Rates are now fetched for every
  currency in the dropdown that the European Central Bank publishes. The four
  it does not — Argentine peso, Chilean peso, Colombian peso and dirham — are
  still left out, and the screen lists them rather than hiding it.
- **The currency dropdown is no longer 159 entries long.** Reaching the euro
  meant scrolling past the Afghan afghani, the Angolan kwanza and the
  Azerbaijani manat. It is now 28 — the ones a translator with international
  clients actually gets paid in. A project already saved in any other one keeps
  it: it still appears in that project's own dropdown, so opening and saving it
  does not change its currency.
- **The Spanish interface no longer mixes "follow-up" with "seguimiento".** The
  English wording is unchanged — there "follow-up" is the right term.
- **Shorter, clearer button labels.** The two "Show key" buttons in Settings
  are now "Show"; the Stripe one is "Connect", pairing with the "Disconnect"
  next to it; "Deactivate this device" is now "Deactivate"; and the
  getting-started button says what it opens: "Open getting-started guide".

- **The privacy policy now also lists the version check.** It is the fourth
  connection the app makes, alongside the mail server, Keygen and the exchange
  rates, and that list exists in order to be complete. No data is sent — it is
  a read request for a static file — but it now says so. Because this changes
  the list of processing activities, the app asks for the legal texts to be
  accepted again next time it opens.

- **The main currency is now picked by name, not by its code.** The profile
  field shows "Euro" or "US Dollar", with the code in the tooltip, and the
  list is sorted alphabetically by that name. The currency dropdowns on a
  project still show the code: they sit inline in narrow fields where a long
  name does not fit.
- **The app's English is no longer a literal translation of the Spanish.** An
  audit of all 867 pairs, read one by one: calques were removed ("E.g.:" where
  "e.g." belongs, Spanish dashes, sentence orders copied across) and terms that
  had several forms at once were unified — "encargo" was "job" twelve times and
  "assignment" once, and "factura rectificativa" had three different English
  words, one of them ("credit note") a different document altogether.
- **The "Send delivery" button is now "Send deliverables".** It opened a dialog
  titled "Send deliverables", and what gets sent are the files, not the job.

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

- **A recurring plan's card read "Source words 1" and "320.00 EUR/word".** A
  monthly fee is charged neither by word nor by hour, but internally it is
  stored as one word at a "rate" equal to the fee, and that showed up raw on
  every retainer. The invoice PDF already handled it; the card now does too,
  showing the fee under its own label.

- **The quote no longer disappears once the job moves on.** As soon as the
  project left "Quoted", the PDF the client is looking at could no longer be
  downloaded: getting it back meant moving the project to its previous state.
  Its download button now stays, without the edit and resend options, which no
  longer apply there.

- **A job could charge a cent other than the one its own lines added up to.**
  With a CAT breakdown, the total was worked out by summing raw amounts and
  rounding at the end, while the PDF prints one already-rounded row per
  category: at a rate of €0.11, the five rows add up to €145.69 and the total
  read €145.70. Same for hourly work, where genuine half-cents turn up: a
  quarter of an hour at €32.50/h is €8.125, an amount that does not exist in
  money, and it was stored that way every time you stopped the timer. The total
  is now always the sum of what is printed, and every amount the app CALCULATES
  — words by rate, hours by rate, CAT breakdown — is rounded to the cent before
  being stored.

- **The invoice ledger filed a number its own signature did not back.** The
  taxable base went into the hash-chained record exactly as it came out of
  multiplying words by rate — 1,480 × 0.14 gives 207.20000000000002 in floating
  point — while the hash sealing that record is computed on the rounded figure.
  None of this showed on screen or in the PDF, which always formatted correctly,
  but anyone reading the database directly — an audit, a future export — got the
  dirty value, and base + tax did not match the stored total.

- **A quote already sent looked exactly like one never sent.** The project card
  still read “Send the quote to the client or edit it first” weeks after it had
  gone out: the only place that knew was the “Quotes” counter in the header, so
  it was easy to send the client the same quote twice. The card now shows the
  day it was sent and the button becomes “Resend quote”.

- **A newly created recurring billing plan did not appear under Alerts until
  the app was restarted.** The dialog itself tells you generation is confirmed
  from Alerts; you went there following that instruction and found it empty. It
  now shows up — and disappears when the plan is deleted — without a restart.

- **The reason for a correction is printed on the invoice the client receives,
  and the help text did not say so.** It only said it was “recorded alongside
  the correction”, which reads like an internal filing note. It now warns that
  it is printed on the client's document and that it should be written in
  English, like the rest of the invoice.

- **A recurring invoice was issued without the project or the invoice showing
  up anywhere.** Confirming it from Alerts while already on the Projects tab,
  the app reported it had been generated and the list did not change: the new
  project and its invoice — already recorded in the ledger, with its number —
  were nowhere to be seen until the app was restarted. The list only reloaded
  when switching tabs, so it failed on exactly the likeliest path: looking at
  your projects and confirming the alert. It now refreshes on its own and opens
  the new project, which is what it meant to do all along.

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

- **A recurring plan could skip its own first month, and nobody claimed it.**
  The date a plan is created is stored in universal time, but it was read as if
  it were the translator's local time. For anyone working west of Greenwich, a
  plan created early on the 1st was recorded as belonging to the following
  month: that instalment never showed up among the pending periods, the plan
  counted as up to date, and the retainer went unbilled with no warning at all.
  In Spain the bug was invisible, because there both readings agree.

- **The e-invoicing notice switched its wording a day early or a day late.** The
  date each country's mandate starts to apply was compared against the universal
  day instead of the local calendar day, so the notice could move by one day
  depending on the time zone.

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

- **Opening the tab took the whole app down.** Going to Metrics replaced the
  window with the "Unexpected error" screen, the message at its foot: "Cannot
  access 'expenseForm' before initialization" — in the installed copy,
  minified, "Cannot access 'M' before initialization", which tells nobody
  anything. Reloading brought the app back, but going into Metrics again took
  it down again. The cause was the very
  change in this same version that cut the currency dropdown down to 28: so
  that an expense saved in an uncommon currency keeps its own, the list started
  reading the currency of the expense being edited — and here it read it before
  it existed. Of the four currency dropdowns that were touched, this was the
  only one with the bug. The tab opens again, and editing an expense in a
  currency outside the short list — Thai baht, say — still keeps its option.

- The header overflowed when several currencies were involved: the amount spilled
  out of its cell and over the label next to it.
- The "Net profit" card stretched across the full width when it wrapped onto a
  second row, and stopped looking like one card among others.
- The average-rate table showed rows that looked repeated — two "Technical", two
  "EN-ES". They were not: rows are grouped by label, currency and unit, because
  averaging 0.15 € with 0.18 $ would mean nothing. Each row now states what
  tells it apart from its siblings.

**Outreach**

- **Stray spaces were only trimmed from the email address.** A name or company
  pasted from LinkedIn or a spreadsheet kept its leading and trailing spaces,
  and those went straight to two places the client sees: the first line of the
  cold email ("Hi␣␣␣␣Marie Dupont␣␣␣,") and the client block on the invoice.
  Every field is trimmed now, and anything left blank is stored as properly
  empty.
- **Changing a contact's email address wiped its history without asking.**
  Fixing a typo in the domain destroyed the logged sends, the contact dates and
  the follow-up count, and sent the contact back to "Pending"; the notice
  appeared afterwards, once done. You are now asked first, told how many sends
  will be lost, and only when there is something to lose. Cancelling saves
  nothing and leaves the form as it was.
- **A name made only of spaces** got past the form and came back from the
  server as "failed to save contact", as if the app had broken rather than a
  field being missing.
- **Saving a contact could leave it with no name or an unusable email address.**
  The check existed when creating one but not when editing, and editing an
  already-deleted contact reported success.
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
- **Pressing Enter at the end of a template did nothing, and whatever you typed
  next ended up stuck to your signature.** Adding a postscript or a link below
  "Best regards, [Your name]" was impossible: the new line was never drawn, so
  the caret fell back to the previous one. It also left an invisible line break
  at the end of the saved text, which went out with the email.
- **The Subject line gave no warning about braces that aren't real variables.**
  Typing something like `{{tarifa}}` there raised no warning — the template body
  did — and still stopped the send, marking the contact in red. The warning now
  appears next to whichever field causes it, subject or body.
- **A batch send with one of those braces marked every contact in the batch as
  failed**, one by one, over a problem that belongs to the template and not to
  any of them. It is now flagged before the batch starts and the contacts are
  left as they were, the same as already happened with a missing subject, no
  email account or an empty attachment.
- **A contact with no company was marked as failed if the template used that
  tag**, with a message sending you off to check the template — when the
  template was fine and what was missing was one of their own details. Company
  is optional, yet it was the only one of the four contact fields treated as
  required when sending. And since failed contacts re-enter the next batch, it
  failed again every time. It now comes out blank, as specialty and languages
  already did, and before a batch starts you are told how many contacts are
  missing a detail the template uses, so you can cancel and fill it in. The
  same happened in the Projects emails — payment reminder, quote and delivery —
  which now also accept all five contact tags instead of just two.
- **Undo after inserting a tag deleted something else.** The tag went in
  through a route the browser does not record in its history, so Ctrl+Z skipped
  it and undid the previous edit instead: a word on another line disappeared
  and the tag stayed put. Same when pasting.
- **Inserting a tag between two words left a double space.**
- **A tag typed by hand still showed as `{{nombre}}`.** It now turns into a tag
  like any other when you leave the editor.
- **Dragging formatted text into the editor smuggled its HTML in.** Pasting
  already stripped it; dropping did not.
- **The Subject line now shows what will go out underneath**, with the same
  tags and the chosen contact's details. Before you only saw raw braces.
- **Emptying a template and saving brought the factory one back**, silently,
  and that was the one being sent. You are now told it cannot be left empty.

**Sending email**

- **The "no email account" warning could lie in both directions.** The header
  decided whether an account existed by looking at a copy kept inside the
  database, while sending uses the real credentials, which live encrypted
  outside it. The two drifted apart: wipe the database and the warning stayed
  on forever with email working perfectly; and the other way round — restoring
  a backup, which carries the username but never the password — the app treated
  as configured an account every send was going to fail on. And it was not just
  the warning: **the Outreach batch send was gated on that same copy**, so with
  the database wiped it refused to send anything — "no email account
  configured" — while email worked perfectly, and after restoring a backup it
  started the batch only to fail contact by contact. All of that now asks the
  server, which is the side holding the credentials, and it also tells apart a
  third case that did not exist before: an account that is saved but rejected
  by the provider, with its own warning in the header and, in Settings, a red
  dot reading "Saved, but the provider rejects it" instead of the green one
  reassuring you about a password that does not work. The welcome wizard was
  taking the same wrong path: it counted an account with a saved address but no
  password as connected, and now only does so when the server confirms it can
  send.

- **The two emails that ask for money were the only ones not greeting the
  client by name.** The quote and the delivery said “Hi Anke,”; the invoice and
  the three payment reminders, a bare “Hi,”. And the invoice subject was the
  only one of the seven carrying no reference at all — “Invoice for Translation
  Services” — so three invoices to the same client arrived with identical
  subjects and their mail client stacked them into a single thread, which is
  the opposite of what chasing an unpaid invoice needs. All four now greet the
  client by name, and the invoice subject carries its number and the project.
  If you had already rewritten a template, yours is kept: this only changes the
  factory defaults.

- **Sending an invoice said “Deliverables sent”.** The dialog already adapted
  everything else — title, icon, button and email body — but the confirmation
  message had been left out.

- **The delivery and the invoice could go out promising an attachment that was
  not there.** The email delivering the translation says “Please find attached
  the completed work”, and the invoice one, “Please find attached the invoice”.
  If no file was added, or if the PDF was removed from the attachment list
  before hitting send, the email went out anyway: no warning, no way to undo
  it, and a client reading the promise of a file that was not enclosed. With no
  attachment at all, sending now stops and says which file is missing.

- **The payment reminder gave the due date in a format the client reads the
  other way round.** These emails always go out in English, and the amount was
  already formatted for the client, but the date followed the interface
  language: “€676.00” and “10/8/2026” sat in the same sentence. That date is 10
  August to whoever runs the app in Spanish and 8 October to whoever reads the
  email in English, so the final overdue notice ended up contradicting itself:
  a due date the client reads as being in the future, in an email chasing them
  for 39 days of delay. The month is now written out — “August 10, 2026” —
  which cannot be read two ways in any market. This covers all three reminder
  stages and the invoice email.

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

- **The browser's spellchecker underlined correct Spanish as misspelt.** The
  app declared itself English to the browser — the document language was fixed
  and nothing ever changed it — even with the interface in Spanish. Since that
  is what the spellchecker picks its dictionary from, writing an email subject
  or body, or notes on a contact or a project, got correctly spelt words
  underlined in red. The declared language now follows the one chosen in the
  header. A screen reader also stops reading Spanish with English
  pronunciation.

- **The timer left "0min" entries.** Starting and stopping it by mistake — or a
  double click — created a zero-minute line on the card, with its date and its
  cross, that only had to be deleted by hand and travelled in the backup too.
  Under half a minute nothing is stored any more.

- **A file under half a kilobyte showed as "0 KB"**, which looks like an empty
  file right before sending it to a client. Bytes are now shown.

- **The hourly rate suggested "e.g. 0.12"**, which is a per-word example: under
  the "Rate per hour" label it was proposing twelve cents an hour.

- **The language pair is now suggested** when you pick a client, taken from the
  one that contact already has. It is only a suggestion, and only when the
  contact holds a recognisable pair: anything already typed is left alone.

- **The trial period is now anchored in the data already saved.** It previously
  relied solely on its own record file, so an installation holding contacts,
  projects and invoices from weeks earlier could still present itself as brand
  new. Now, if that record is missing, the start is rebuilt from the oldest
  entry in the database. Nothing new is stored: only dates that were already
  there are read.

- **The main currency dropdown came up completely blank.** All 159 currencies
  were there, but every option rendered with no text and no value: the field
  was reading two properties the list does not have. On top of that, with no
  currency saved the browser showed the first one on the list — the UAE dirham
  — as if it had been chosen; the list now opens with an option that says what
  the app actually does until you pick one: summarise in whichever currency you
  bill most.

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
- **At 14 days the app now really does close.** The end of the trial was
  enforced by the screen alone: behind it the local server kept answering
  everything, so there was still a way to go on using the app without a
  licence. It is now closed from the inside too, and the only thing left open
  is what you need in order to activate. Your data is untouched: it is all
  still there, and it comes back the moment you enter your key.
- **Starting a fresh data folder no longer grants another trial.** The start
  of the trial is anchored to the oldest trace of your own work, but that was
  only consulted when the record was missing: starting from scratch and
  bringing your data over AFTERWARDS gave you fourteen new days losing
  nothing. It is now always consulted, and the older of the two dates wins.
  This also fixes the honest case: restoring a backup on a new laptop
  continues the same trial instead of starting another.

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
