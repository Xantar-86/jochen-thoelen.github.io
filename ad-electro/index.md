---
title: Active Directory & Windows Server – Electro
---

## Overzicht

Dit project toont een volledige Active Directory-omgeving zoals opgezet voor een fictieve KMO (“Electro”), met focus op structuur, beveiliging en beheerbaarheid.

De omgeving is opgezet volgens best practices en simuleert een realistische bedrijfscontext.

---

## Context

- Bedrijf met meerdere afdelingen
- Centrale Windows Server omgeving
- Gebruikers en computers beheerd via Active Directory
- Toegang tot resources strikt geregeld via groepen en policies

Doel: een **schaalbare en onderhoudsvriendelijke** domeinstructuur.

---

## Wat ik heb opgezet

### Active Directory structuur
- Logische **OU-structuur** per afdeling
- Scheiding tussen users, computers en servers
- Voorbereid op groei en delegatie

### Groepen & rechten (AGDLP)
- Implementatie van het **AGDLP-model**
- Duidelijke scheiding tussen:
  - globale groepen (rollen)
  - domein-lokale groepen (toegang)
- Geen rechten rechtstreeks op gebruikers

### Fileshares & opslag
- Fileshares via **DFS**
- **Access-Based Enumeration** actief
- NTFS-rechten enkel via groepen
- Structuur per afdeling en functie

### Group Policy Objects (GPO)
- Logon scripts
- Drive mappings
- Folder redirection
- Beperking van gebruikersrechten
- Consistente configuratie per OU

### Auditing & beheer
- Auditing op gevoelige mappen
- Beheer via **MMC / RSAT**
- Focus op traceerbaarheid en troubleshooting

---

## Wat dit project aantoont

- Inzicht in **Active Directory design**
- Correct gebruik van **security best practices**
- Praktische ervaring met **Windows Server**
- Gestructureerde aanpak van IT-infrastructuur
- Documentatie- en beheergericht denken

---

## Gebruikte technologieën

- Windows Server
- Active Directory Domain Services
- Group Policy
- DFS & NTFS permissions
- RSAT / MMC
