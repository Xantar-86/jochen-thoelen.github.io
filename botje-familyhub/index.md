---
title: Botje / Family Hub
layout: default
---

## Overzicht

Botje / Family Hub is een eigen webapplicatie rond gezinsplanning en automatisatie.  
Het project focust op betrouwbaarheid, duidelijke structuur, veilige configuratie en integratie met externe services.

De applicatie simuleert een realistische productieomgeving waarin planning, notificaties en synchronisatie centraal staan.

---

## Context

- Gezinsgerichte planning (family hub concept)
- Meerdere gebruikers / contexten
- Automatisatie van terugkerende taken
- Integratie met externe APIs (Google Calendar)

Doel: een **stabiele en onderhoudbare webapplicatie** met aandacht voor security en configuratie.

---

## Wat ik heb opgezet

### Applicatiestructuur
- Next.js met **App Router**
- Duidelijke scheiding via route groups
- Herbruikbare componenten en logische mappenstructuur

### Data & authenticatie
- **Supabase** als backend (database + auth)
- Structuur per gezin / context
- Dataconsistentie en validatie

### Google Calendar integratie
- Integratie via **Google Calendar API**
- Gebruik van **service accounts**
- Automatisch aanmaken en synchroniseren van kalenderitems

### Configuratie & secrets
- Geen hardcoded secrets
- Environment variables via:
  - `.env.local` (lokaal)
  - Cloud environment settings
- Duidelijke scheiding tussen test en productie

---

## Security & betrouwbaarheid

- Secrets en credentials nooit in de code
- Bewuste keuzes rond permissions en scopes
- Correct omgaan met service account beperkingen
- Stabiliteit en voorspelbaarheid boven snelle workarounds

---

## Troubleshooting & leerpunten

- Oplossen van fouten rond:
  - ontbrekende of foutieve environment variables
  - Google Calendar permissions en attendees
  - Next.js routing en duplicaten
- Inzicht gekregen in:
  - cloud-configuratie
  - service account beperkingen
  - reproduceerbare fixes en versiebeheer

---

## Wat dit project aantoont

- Moderne webontwikkeling met Next.js
- API-integratie in een realistische context
- Security-bewust werken
- Probleemoplossend vermogen bij niet-triviale issues
- Gestructureerde en professionele aanpak

---

## Gebruikte technologieën

- Next.js (App Router)
- Supabase (database & auth)
- Google Calendar API
- JavaScript / TypeScript
- Environment variables & cloud config
---

## Screenshots

<div class="shot-grid">

  <figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/dashboard.jpg" alt="Botje dashboard">
    <figcaption>
      <strong>Dashboard & modules</strong><br>
      Overzicht van beschikbare modules binnen de Family Hub (chat, agenda, bestanden, boodschappen),
      met ondersteuning voor light & dark mode.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/agenda.jpg" alt="Gezinsagenda">
    <figcaption>
      <strong>Gezinsagenda (Google Calendar integratie)</strong><br>
      Centrale agenda met gedeelde en persoonlijke events, reminders en automatische synchronisatie
      via Google Calendar API.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/boodschappen.jpg" alt="Boodschappenlijsten">
    <figcaption>
      <strong>Boodschappen per winkel</strong><br>
      Dynamische boodschappenlijsten per winkel, realtime afvinken op mobiel en overzicht per locatie.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/klantenkaarten.jpg" alt="Digitale klantenkaarten">
    <figcaption>
      <strong>Digitale klantenkaarten</strong><br>
      Mobiele klantenkaarten met QR-code, fullscreen scanbaar aan de kassa.
    </figcaption>
  </figure>

<figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/klantenkaarten2.jpg" alt="Digitale klantenkaarten">
    <figcaption>
      <strong>Digitale klantenkaarten</strong><br>
      Mobiele klantenkaarten met QR-code, fullscreen scanbaar aan de kassa.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/bestanden.jpg" alt="Bestandenbeheer">
    <figcaption>
      <strong>Bestanden & mappen</strong><br>
      Gedeelde bestandsopslag via OneDrive-integratie, met upload, mappenstructuur en rechten per gezin.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/botje.jpg" alt="Botje chat interface">
    <figcaption>
      <strong>Chat & automatisatie (Botje)</strong><br>
      Natuurlijke taalinterface om agenda-items en reminders aan te maken,
      inclusief foutafhandeling en bevestiging.
    </figcaption>
  </figure>
---

## Technische highlights (per screenshot)

### 1) Dashboard & modules
- Modulair opgezet (UI components per feature: agenda, bestanden, boodschappen, directory).
- Consistente styling (dark/light mode) met herbruikbare kaart-layouts.
- Focus op eenvoud voor niet-technische gebruikers.

### 2) Gezinsagenda (Google Calendar)
- Integratie met Google Calendar API (service accounts).
- Events + reminders met duidelijke “scope” (shared vs personal).
- Betrouwbare sync + foutafhandeling (herhaalbaar, geen “silent failures”).

### 3) Boodschappen per winkel
- Data-structuur per winkel + lijst (filteren en groeperen).
- Mobile-first: afvinken in de winkel met snelle UI.
- Voorbereid op uitbreidingen (favorieten winkels, QR/kaart koppeling).

### 4) Digitale klantenkaarten
- QR-codes in fullscreen modus: scanbaar aan de kassa.
- Per winkel een kaart, met snelle toegang vanuit de lijst.
- UX detail: tips en minimale handelingen in de winkel.

### 5) Bestanden & mappen
- OneDrive integratie voor gedeelde map (family hub).
- Basis bestandsbeheer: uploaden, mappen maken, hernoemen/verwijderen.
- Toegangscontrole en veilige koppelingen (geen secrets in de client).

### 6) Chat & automatisatie (Botje)
- Natuurlijke taal input → gestructureerde acties (agenda, reminders).
- Validatie en guardrails (bv. foutmeldingen bij onmogelijke reminder tijden).
- Logging/feedback richting gebruiker: “wat is aangemaakt, duplicaten, errors”.

---

## Architectuur (overzicht)

```text
Gebruiker (Browser)
  |
  |  Gebruikersinterface (Next.js)
  v
Next.js API routes (server-side)
  |
  |  Authenticatie & validatie
  |  Business logic
  |
  +--> Supabase
  |      - Auth (login & sessies)
  |      - Database (Postgres)
  |
  +--> Externe services
         - Google Calendar API
         - OneDrive / Microsoft Graph


⚠️ Belangrijk:
- Laat **alle spaties en streepjes staan**
- De ```text bovenaan en ``` onderaan **moeten er zijn**
- Niets aanpassen

---

# 👀 Wat zie je daarna op je website?
Op de Botje-pagina zie je straks:

- Titel: **Architectuur (overzicht)**
- Daaronder een **grijs tekstblok**
- Met pijltjes en structuur
- Iedereen snapt: *“aha, zo werkt dit”*

👉 Dit is PERFECT voor recruiters.

---

# ✅ Stap 4 — Opslaan & online zetten
In PowerShell:

```powershell
cd "C:\Users\joche\Documents\portfolio-site"
git add botje-familyhub/index.md
git commit -m "Add simple architecture overview to Botje page"
git push

</div>

