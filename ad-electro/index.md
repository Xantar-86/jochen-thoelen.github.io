---
title: Active Directory & Windows Server – Electro
---

<!-- Page Header -->
<section class="hero" style="min-height: 40vh; padding: 100px 0 40px;">
  <div class="hero-bg"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-greeting">Project</div>
      <h1 class="hero-title">Active Directory & Windows Server – Electro</h1>
      <p class="hero-description">
        Een realistische Active Directory-omgeving voor een fictieve KMO,
        met focus op structuur, security, schaalbaarheid en beheerbaarheid.
      </p>
    </div>
  </div>
</section>

<!-- Page Content -->
<div class="page-content">
  <div class="container">

## Context & doelstelling

- Middelgrote organisatie met meerdere afdelingen  
- Centrale Windows Server infrastructuur  
- Gecentraliseerd gebruikers- en rechtenbeheer  
- Strikte scheiding tussen gebruikers, computers en servers  

**Doel:**  
Een **onderhoudsvriendelijke en uitbreidbare domeinstructuur** die eenvoudig te beheren is en duidelijke security-grenzen hanteert.

---

## Waarom deze setup?

Deze omgeving is bewust opgezet volgens klassieke enterprise-principes:

- duidelijke **OU-structuur** i.p.v. een "flat" AD
- **AGDLP-model** voor toegangsbeheer
- geen rechten rechtstreeks op gebruikers
- auditing en logging standaard voorzien
- fileshares en policies schaalbaar per afdeling

Dit zorgt voor:
- minder fouten bij groei
- eenvoudiger troubleshooting
- betere security-controle
- duidelijke overdraagbaarheid naar andere beheerders

---

## Architectuur (overzicht)

Onderstaande schematische weergave toont hoe gebruikers, Active Directory, fileservers en policies samenwerken binnen de omgeving.

<figure class="shot reveal arch-figure">
  <img
    src="/jochen-thoelen.github.io/assets/images/ad/ADusers.jpg"
    alt="Active Directory architectuur"
    loading="lazy"
  >
  <figcaption>
    <strong>Architectuur overzicht</strong><br>
    Gebruikers authenticeren via Active Directory. Toegang tot fileshares en resources verloopt via groepslidmaatschappen, GPO's en NTFS-rechten, beheerd vanuit een centrale Windows Server omgeving.
  </figcaption>
</figure>

---

## Wat ik heb opgezet

### Active Directory structuur
- Logische **OU-structuur per afdeling**
- Scheiding tussen:
  - users
  - computers
  - servers
- Voorbereid op delegatie en groei

### Groepen & rechten (AGDLP)
- Correct gebruik van het **AGDLP-model**
- Rollen via **globale groepen**
- Toegang via **domain local groups**
- Geen permissies rechtstreeks op gebruikers

### Fileshares & opslag
- Fileshares beheerd via **Server Manager**
- **Access-Based Enumeration** actief
- NTFS-rechten uitsluitend via groepen
- Structuur per afdeling en functie

### Group Policy Objects (GPO)
- Password & account lockout policies
- Logon scripts
- Drive mappings
- Folder redirection
- Consistente configuratie per OU

### Auditing & beheer
- File system auditing op gevoelige mappen
- Inzicht in wie wat wanneer heeft geraadpleegd
- Beheer via **RSAT / MMC**
- Focus op traceerbaarheid en troubleshooting

---

## Screenshots (praktijkvoorbeelden)

<div class="shot-grid">

  <figure class="shot reveal">
    <img
      src="/jochen-thoelen.github.io/assets/images/ad/gpo.jpg"
      alt="Default Domain Policy instellingen"
      loading="lazy"
    >
    <figcaption>
      <strong>Group Policy – Security policies</strong><br>
      Password-, lockout- en Kerberos-instellingen centraal afgedwongen via de Default Domain Policy.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img
      src="/jochen-thoelen.github.io/assets/images/ad/shares.jpg"
      alt="Fileshares overzicht"
      loading="lazy"
    >
    <figcaption>
      <strong>Fileshares & opslag</strong><br>
      Overzicht van SMB-shares per server, met duidelijke scheiding tussen afdelingen en data-types.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img
      src="/jochen-thoelen.github.io/assets/images/ad/abe.jpg"
      alt="Share permissies en ABE"
      loading="lazy"
    >
    <figcaption>
      <strong>NTFS-rechten & Access-Based Enumeration</strong><br>
      Gebruikers zien enkel mappen waarvoor ze effectief rechten hebben.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img
      src="/jochen-thoelen.github.io/assets/images/ad/ADusers.jpg"
      alt="Active Directory groepen"
      loading="lazy"
    >
    <figcaption>
      <strong>AD-groepen volgens AGDLP</strong><br>
      Duidelijke scheiding tussen rollen en toegangsrechten via groepsstructuur.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img
      src="/jochen-thoelen.github.io/assets/images/ad/audit.jpg"
      alt="File auditing"
      loading="lazy"
    >
    <figcaption>
      <strong>Auditing & logging</strong><br>
      File access wordt gelogd voor controle, security en troubleshooting.
    </figcaption>
  </figure>

  <figure class="shot reveal">
    <img
      src="/jochen-thoelen.github.io/assets/images/ad/dfs.jpg"
      alt="DFS SYSVOL"
      loading="lazy"
    >
    <figcaption>
      <strong>SYSVOL & replicatie</strong><br>
      Policies en scripts consistent beschikbaar via SYSVOL replicatie.
    </figcaption>
  </figure>

</div>

---

## Wat dit project aantoont

- Inzicht in **Active Directory design**
- Correct gebruik van **security best practices**
- Praktische ervaring met **Windows Server**
- Gestructureerde aanpak van IT-infrastructuur
- Denken in **beheerbaarheid en schaalbaarheid**

---

## Gebruikte technologieën

<div class="badge-row" style="margin-top: 1rem;">
  <span class="badge">Windows Server</span>
  <span class="badge">Active Directory Domain Services</span>
  <span class="badge">Group Policy</span>
  <span class="badge">NTFS & DFS</span>
  <span class="badge">RSAT / MMC</span>
</div>

  </div>
</div>
