# Active Directory & Windows Server - Electro

[Terug naar home](index.md)

## Overzicht
In dit project heb ik een volledige Windows Server-omgeving opgezet voor een fictief bedrijf "Electro". De focus lag op een correcte AD-structuur, veilig rechtenbeheer (AGDLP), fileshares (DFS/ABE), GPO-automatisatie en auditing.

## Doelen
- Een schaalbare OU-structuur opzetten
- Gebruikers en groepen logisch organiseren
- Rechten toekennen volgens AGDLP
- Shares aanbieden via 1 DFS-pad en ABE gebruiken
- GPO's voor omgeving, logon, software en policies
- Auditing op gevoelige data (wie/wat/wanneer)

## Architectuur
- Domein: electro.intra
- Domain Controller: DC-ELECTRO
- Fileserver: FS1

## OU-structuur (voorbeeld)
- Electro
  - Admins
  - Computers
  - Groups
    - GG (Global Groups)
    - DL (Domain Local Groups)
  - Servers
    - DC-ELECTRO
    - FS1
  - Users
    - Afdelingen
      - Boekhouding
      - Inkoop
      - Verkoop
      - Herstellingen
      - Interim
      - Directie

Waarom zo:
- OU's sturen GPO-scope (wie krijgt welke policy)
- Groepen blijven in aparte OU voor overzicht en beheer
- Servers apart van clients en users

## Groepen en rechtenbeheer (AGDLP)
Ik heb rechten opgebouwd via het AGDLP-model:
- A = Accounts (users)
- G = Global groups (per afdeling/rol)
- DL = Domain Local groups (per resource + recht)
- P = Permissions (NTFS/share rechten enkel op DL-groepen)

Voorbeeld:
- GG_Boekhouding bevat de users van boekhouding
- DL_Qubic_Modify krijgt NTFS Modify op de Qubic share/map
- GG_Boekhouding wordt lid van DL_Qubic_Modify

Voordeel:
- Rechten blijven overzichtelijk en uitbreidbaar
- Wijzigingen gebeuren via groepslidmaatschap, niet via individuele NTFS rechten

## Fileserver: shares, DFS en ABE
Op FS1 zijn applicatie-shares voorzien (als "apps" aangeboden via server):
- Qubic
- Easypay
- Prodata
- COMBO
- Email (basis share voor mail/demo)

Belangrijke punten:
- DFS: gebruikers gebruiken 1 pad/driveletter (1 ingang)
- ABE (Access Based Enumeration): users zien enkel mappen waarvoor ze rechten hebben
- NTFS rechten: via DL-groepen (AGDLP)

## GPO's (selectie)
Voor de automatisatie en standaardisatie werden GPO's ingezet, o.a. voor:
- Drive mappings (DFS share koppelen aan driveletter)
- Folder Redirection (indien van toepassing)
- Omgevingsinstellingen (desktop/shortcuts/printers)
- Logon scripts (correct via NETLOGON)
- Wallpaper standaard en uitzonderingen (demo)
- Password policy en account lockout
- Logon hours (directie vs gewone users)
- Security hardening: privacy en lock screen/idle lock

Opmerking:
- Logon scripts op FS1 bleken onbetrouwbaar; de definitieve oplossing was NETLOGON gebruiken.

## Logon scripts (NETLOGON)
Logon scripts zijn geplaatst in:
- \\electro.intra\\NETLOGON

Waarom:
- NETLOGON is ontworpen voor logon scripts en is beschikbaar tijdens logon
- Scripts op een fileserver kunnen falen omdat het netwerk nog niet volledig klaar is

## Auditing (Easypay)
Doel:
- weten wie wijzigingen doet aan bestanden in de Easypay map en wanneer

Aanpak:
1. Advanced Audit Policy (Object Access / File System) ingeschakeld via GPO
2. NTFS Auditing ingesteld op de Easypay folder (Success/Failure waar nodig)
3. Logging nagekeken in Event Viewer op de fileserver (Security log)

Resultaat:
- Event logs geven een audit trail van file access/changes (wie/wat/wanneer)

## Troubleshooting highlights (wat ik heb geleerd)
- GPO filtering: "Not Applied (Unknown Reason)" wijst vaak op security filtering/permissions
- Deny Apply Group Policy werkt om uitzonderingen te maken (bv. demo user)
- Wallpaper conflicts of missing access kunnen leiden tot zwarte achtergrond
- NETLOGON is de juiste plaats voor logon scripts (stabiliteit)

## Screenshots (optioneel)
Hier kan je later screenshots toevoegen:
- OU-structuur in ADUC
- GPO-overzicht in GPMC
- DFS namespace en share-structuur
- ABE bewijs (user ziet enkel eigen mappen)
- Event Viewer audit log voorbeelden

## Conclusie
Dit project toont dat ik een Windows Server/AD-omgeving end-to-end kan opzetten:
- structuur en beheer
- beveiliging en rechten
- automatisatie via GPO
- auditing en troubleshooting
- documentatie die klaar is voor overdracht
