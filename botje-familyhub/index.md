---
title: Botje / Family Hub
---

[Terug naar home](index.md)

## Overzicht
Botje / Family Hub is een eigen webapplicatie rond gezinsplanning en automatisatie. De focus lag op een betrouwbare workflow, nette structuur, veilige configuratie en integratie met externe services.

## Doelen
- Een centrale plek voor planning en overzicht (family hub)
- Automatisatie van terugkerende taken en reminders
- Integratie met Google Calendar
- Veilige handling van secrets en environment variables
- Praktische troubleshooting en productiegericht denken

## Technologie (high level)
- Next.js (App Router)
- Supabase (database + auth)
- Google Calendar API (service account)
- Environment variables (.env.local en cloud settings)

## Functionaliteit (voorbeelden)
- Afspraken en reminders beheren
- Kalenderitems aanmaken en synchroniseren via Google Calendar API
- Rollen/structuur per gezin of context (familiegericht)
- Validatie en foutafhandeling voor betrouwbaarheid

## Security en betrouwbaarheid
- Secrets nooit hardcoded; alles via environment variables
- Scheiding tussen local config en cloud config
- Edge cases rond service accounts en calendar permissions afgevangen
- Stabiliteit boven "snelle hacks"

## Troubleshooting highlights (wat ik heb opgelost/geleerd)
- Correcte configuratie van environment variables (local en cloud)
- Service account beperkingen rond invites/attendees en praktische workarounds
- Structuur in Next.js App Router en route groups
- Debugging van fouten door verkeerde paths, duplicaten of backups
- Consistente werkwijze met versiebeheer en reproduceerbare fixes

## Wat dit project toont
- Moderne webstack en API-integratie
- Cloud-aware denken (config, secrets, service accounts)
- Probleemoplossend vermogen met realistische issues
- Documenteren en iteratief verbeteren

## Screenshots (optioneel)
Later kan je hier screenshots toevoegen:
- app UI (dashboard/agenda)
- projectstructuur (zonder secrets)
- voorbeeld van logging/monitoring
- voorbeeld van deployment settings (zonder gevoelige data)

## Conclusie
Dit project toont mijn interesse en ervaring in automatisatie en praktische webontwikkeling, met focus op betrouwbaarheid, security en onderhoudbaarheid.
