---
title: Botje / Family Hub
layout: default
---

<!-- Page Header -->
<section class="hero" style="min-height: 40vh; padding: 100px 0 40px;">
  <div class="hero-bg"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-greeting">Project</div>
      <h1 class="hero-title">Botje / Family Hub</h1>
      <p class="hero-description">
        Een eigen webapplicatie rond gezinsplanning en automatisatie,
        met aandacht voor security, configuratie en integraties.
      </p>
    </div>
  </div>
</section>

<!-- Page Content -->
<div class="page-content">
  <div class="container">

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

<div class="badge-row" style="margin-top: 1rem;">
  <span class="badge">Next.js (App Router)</span>
  <span class="badge">Supabase (database & authentication)</span>
  <span class="badge">Google Calendar API</span>
  <span class="badge">JavaScript / TypeScript</span>
  <span class="badge">Environment variables & cloud configuration</span>
</div>

---

## Screenshots

<div class="shot-grid">

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/dashboard.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/dashboard.jpg' | relative_url }}" alt="Botje - Dashboard"
      loading="lazy">
    </a>
    <figcaption><strong>Dashboard</strong><br>Startpagina met modules en status-overzicht (dark/light).</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/agenda.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/agenda.jpg' | relative_url }}" alt="Botje - Agenda"
      loading="lazy">
    </a>
    <figcaption><strong>Gezinsagenda</strong><br>Overzicht van gedeelde en persoonlijke events + sync met Google Calendar.</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/bestanden.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/bestanden.jpg' | relative_url }}" alt="Botje - Bestanden"
      loading="lazy">
    </a>
    <figcaption><strong>Bestanden</strong><br>OneDrive-integratie voor gedeelde mappen + upload/rename/delete.</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/boodschappen.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/boodschappen.jpg' | relative_url }}" alt="Botje - Boodschappen" 
      loading="lazy">
    </a>
    <figcaption><strong>Boodschappen</strong><br>Lijsten per winkel met snelle afvink-flow in de winkel.</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/klantenkaarten.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/klantenkaarten.jpg' | relative_url }}" alt="Botje - Klantenkaarten"
      loading="lazy">
    </a>
    <figcaption><strong>Klantenkaarten</strong><br>QR-codes fullscreen scanbaar aan de kassa (mobile-first).</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/klantenkaarten2.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/klantenkaarten2.jpg' | relative_url }}" alt="Botje - QR modal"
      loading="lazy">
    </a>
    <figcaption><strong>QR modal</strong><br>Kaart tonen/verwijden met duidelijke UI en veilige opslag.</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/gezinskluis.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/gezinskluis.jpg' | relative_url }}" alt="Botje - Gezinskluis"
      loading="lazy">
    </a>
    <figcaption><strong>Gezinskluis</strong><br>Veilige opslag van gevoelige documenten en wachtwoorden.</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/verzekering_auto.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/verzekering_auto.jpg' | relative_url }}" alt="Botje - Verzekeringen"
      loading="lazy">
    </a>
    <figcaption><strong>Verzekeringen</strong><br>Overzicht van verzekeringspolissen met details en vervaldata.</figcaption>
  </figure>

  <figure class="shot reveal">
    <a href="{{ '/assets/images/botje/botje2.jpg' | relative_url }}" target="_blank">
      <img src="{{ '/assets/images/botje/botje2.jpg' | relative_url }}" alt="Botje - Chatbot"
      loading="lazy">
    </a>
    <figcaption><strong>Botje Chat</strong><br>AI-chatbot voor natuurlijke taalinput en automatisatie.</figcaption>
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

### Gezinskluis
- Veilige opslag van gevoelige documenten en wachtwoorden.
- Encryptie en toegangscontrole per gebruiker.
- Categorisatie en snel zoeken van documenten.

### Verzekeringen
- Centraal overzicht van alle verzekeringspolissen.
- Automatische herinneringen bij vervaldata.
- Documenten koppelen aan specifieke verzekeringen.

### Chat & automatisatie (Botje)
- Natuurlijke taalinput om acties te triggeren.
- AI-gestuurde assistent voor dagelijkse taken.
- Server-side validatie en guardrails.
- Transparante feedback richting gebruiker.

---

## Architectuur (overzicht)

<figure class="shot reveal arch-figure">
  <a href="{{ '/assets/images/botje/architectuur.jpg' | relative_url }}" target="_blank">
    <img
      src="{{ '/assets/images/botje/architectuur.jpg' | relative_url }}"
      alt="Botje – Architectuur overzicht">
  </a>
  <figcaption>
    <strong>Architectuur</strong><br>
    Overzicht van de scheiding tussen frontend, API-logica, Supabase en externe services.
  </figcaption>
</figure>

  </div>
</div>
