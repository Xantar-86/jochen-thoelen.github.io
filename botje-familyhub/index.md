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
- Meerdere gebruikers en contexten
- Automatisatie van terugkerende taken
- Integratie met externe APIs (o.a. Google Calendar)

Doel: een **stabiele en onderhoudbare webapplicatie** met aandacht voor security, configuratie en uitbreidbaarheid.

---

## Wat ik heb opgezet

### Applicatiestructuur
- Next.js met **App Router**
- Duidelijke scheiding via route groups
- Herbruikbare componenten en logische mappenstructuur

### Data & authenticatie
- **Supabase** als backend (database + authentication)
- Structuur per gezin / context
- Dataconsistentie en server-side validatie

### Google Calendar integratie
- Integratie via **Google Calendar API**
- Gebruik van **service accounts**
- Automatisch aanmaken en synchroniseren van kalenderitems en reminders

### Configuratie & secrets
- Geen hardcoded secrets
- Environment variables via:
  - `.env.local` (lokaal)
  - cloud environment settings
- Duidelijke scheiding tussen test- en productieconfiguratie

---

## Security & betrouwbaarheid

- Secrets en credentials nooit in frontend code
- Bewuste keuzes rond permissions en API scopes
- Correct omgaan met service account beperkingen
- Stabiliteit en voorspelbaarheid boven snelle workarounds

---

## Troubleshooting & leerpunten

- Oplossen van issues rond:
  - ontbrekende of foutieve environment variables
  - Google Calendar permissions en attendees
  - Next.js routing en duplicaten
- Inzicht opgedaan in:
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
- Supabase (database & authentication)
- Google Calendar API
- JavaScript / TypeScript
- Environment variables & cloud configuration

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
    <img src="/jochen-thoelen.github.io/assets/images/botje/Agenda.jpg" alt="Gezinsagenda">
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
      <strong>Digitale klantenkaarten (detail)</strong><br>
      Alternatieve weergave met focus op leesbaarheid en snelle scan.
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
      inclusief validatie, foutafhandeling en bevestiging.
    </figcaption>
  </figure>

</div>

---

## Technische highlights (per functionaliteit)

### Dashboard & modules
- Modulaire UI-components per feature (agenda, bestanden, boodschappen).
- Consistente styling met ondersteuning voor dark/light mode.
- Ontworpen met focus op eenvoud voor niet-technische gebruikers.

### Gezinsagenda
- Integratie met Google Calendar via service accounts.
- Duidelijke scheiding tussen gedeelde en persoonlijke events.
- Betrouwbare synchronisatie met gecontroleerde foutafhandeling.

### Boodschappen & klantenkaarten
- Data-structuur per winkel en lijst.
- Mobile-first gebruik in de winkel.
- QR-codes fullscreen scanbaar aan de kassa.

### Bestandenbeheer
- OneDrive-integratie voor gedeelde opslag.
- Basis bestandsbeheer (upload, mappen, verwijderen).
- Geen secrets of tokens in de client.

### Chat & automatisatie
- Natuurlijke taalinput om acties te triggeren.
- Server-side validatie en guardrails.
- Transparante feedback richting gebruiker.

---

## Architectuur (overzicht)

<figure class="shot reveal">
    <img src="/jochen-thoelen.github.io/assets/images/botje/architectuur.jpg" alt="Botje chat interface">
    <figcaption>
      <strong>Architectuur</strong><br>
      Botje is opgebouwd als een server-side Next.js applicatie met duidelijke scheiding tussen frontend, API-logica en externe services. Authenticatie en data-opslag verlopen via Supabase, terwijl integraties (zoals Google Calendar en OneDrive) veilig via server-side API-routes worden afgehandeld.
    </figcaption>
  </figure>

