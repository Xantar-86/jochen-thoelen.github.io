---
title: Botje / Family Hub
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
