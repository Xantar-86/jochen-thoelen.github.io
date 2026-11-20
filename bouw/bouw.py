"""Bouwt ad-electro/index.html en botje-familyhub/index.html in de filmische stijl van de cv-site.

Gebruik:  python bouw/bouw.py   (vanuit de map portfolio-site)
De opmaak en animaties staan in assets/cinema/ (kopie van websitecv/css/cinema.css en js/cinema.js).
"""
import io
import os

HIER = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HIER)
CV = "https://www.cv-jochen-thoelen.be/"
BASE = "https://xantar-86.github.io/jochen-thoelen.github.io/"

ICO = {
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "down": '<path d="M12 4v12M6 11l6 6 6-6M5 20h14"/>',
    "server": '<rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M8 7h.01M8 17h.01M12 7h4M12 17h4"/>',
    "users": '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4a3 3 0 0 1 0 6M21 20c0-2.6-1.6-4.8-4-5.6"/>',
    "folder": '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    "policy": '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4M10 12h6M10 16h6"/>',
    "eye": '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    "layers": '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    "db": '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    "cal": '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    "lock": '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    "shield": '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
    "wrench": '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"/>',
    "spark": '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    "cart": '<path d="M3 4h2l2.4 11h10.2L20 8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
    "chat": '<path d="M4 5h16v11H9l-5 4z"/>',
}


def ico(n, cls="svg-ico"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{ICO[n]}</svg>'


PAGES = [
    dict(
        map="ad-electro",
        title="Active Directory & Windows Server: Electro",
        h1=("Active Directory", "&amp; Windows Server"),
        eyebrow="Project &middot; Infrastructuur &middot; VDAB-opleiding",
        lead="Een realistische Active Directory-omgeving voor een fictieve kmo, <strong>Electro</strong>, met focus op structuur, security, schaalbaarheid en beheerbaarheid.",
        desc="Realistische Windows Server-infrastructuur voor een fictieve kmo, met focus op structuur, rechtenbeheer en beheerbaarheid.",
        chips=["Windows Server", "Active Directory Domain Services", "Group Policy", "NTFS en DFS", "RSAT / MMC"],
        context_h="Context en <span class=\"accent\">doel</span>",
        context=["Middelgrote organisatie met <strong>meerdere afdelingen</strong>", "Centrale <strong>Windows Server-infrastructuur</strong>",
                 "Gecentraliseerd <strong>gebruikers- en rechtenbeheer</strong>", "Strikte scheiding tussen <strong>gebruikers, computers en servers</strong>"],
        goal="Een onderhoudsvriendelijke en uitbreidbare domeinstructuur die eenvoudig te beheren is en duidelijke security-grenzen hanteert.",
        why_h="Waarom <span class=\"accent\">deze opzet</span>?",
        why_sub="Bewust opgezet volgens klassieke enterprise-principes.",
        why=["Een duidelijke <strong>OU-structuur</strong> in plaats van een platte AD", "Het <strong>AGDLP-model</strong> voor toegangsbeheer",
             "Geen rechten rechtstreeks op gebruikers", "Auditing en logging standaard voorzien", "Fileshares en policies schaalbaar per afdeling"],
        why_result=["Minder fouten bij groei", "Eenvoudiger troubleshooting", "Betere security-controle", "Vlot over te dragen aan andere beheerders"],
        arch=("ADusers.jpg", "Architectuur", "Gebruikers authenticeren via Active Directory. Toegang tot fileshares en resources verloopt via groepslidmaatschappen, GPO's en NTFS-rechten, beheerd vanuit een centrale Windows Server-omgeving."),
        built_h="Wat ik heb <span class=\"accent\">opgezet</span>",
        built=[("layers", "Active Directory-structuur", ["Logische OU-structuur per afdeling", "Scheiding tussen users, computers en servers", "Voorbereid op delegatie en groei"]),
               ("users", "Groepen en rechten (AGDLP)", ["Rollen via globale groepen", "Toegang via domain local groups", "Geen permissies rechtstreeks op gebruikers"]),
               ("folder", "Fileshares en opslag", ["Beheer via Server Manager", "Access-Based Enumeration actief", "NTFS-rechten uitsluitend via groepen", "Structuur per afdeling en functie"]),
               ("policy", "Group Policy", ["Password- en account lockout policies", "Logon scripts en drive mappings", "Folder redirection", "Consistente configuratie per OU"]),
               ("eye", "Auditing en beheer", ["File system auditing op gevoelige mappen", "Inzicht in wie wat wanneer raadpleegde", "Beheer via RSAT / MMC", "Focus op traceerbaarheid"])],
        img_dir="ad",
        shots=[("gpo.jpg", "Group Policy: security policies", "Password-, lockout- en Kerberos-instellingen centraal afgedwongen via de Default Domain Policy.", True),
               ("shares.jpg", "Fileshares en opslag", "SMB-shares per server, met een duidelijke scheiding tussen afdelingen en soorten data.", False),
               ("abe.jpg", "NTFS-rechten en Access-Based Enumeration", "Gebruikers zien enkel de mappen waarvoor ze effectief rechten hebben.", False),
               ("ADusers.jpg", "AD-groepen volgens AGDLP", "Duidelijke scheiding tussen rollen en toegangsrechten via de groepsstructuur.", False),
               ("audit.jpg", "Auditing en logging", "Bestandstoegang wordt gelogd voor controle, security en troubleshooting.", False),
               ("dfs.jpg", "SYSVOL en replicatie", "Policies en scripts consistent beschikbaar via SYSVOL-replicatie.", True)],
        proof=[("AD", "Inzicht in Active Directory-design"), ("Security", "Correct gebruik van security best practices"),
               ("Server", "Praktische ervaring met Windows Server"), ("Structuur", "Gestructureerde aanpak van infrastructuur"),
               ("Groei", "Denken in beheerbaarheid en schaalbaarheid")],
        other=("botje-familyhub", "Botje / Family Hub"),
    ),
    dict(
        map="botje-familyhub",
        title="Botje / Family Hub",
        h1=("Botje", "Family Hub"),
        eyebrow="Project &middot; Webapplicatie &middot; Gebouwd met AI-tools",
        lead="Een eigen webapplicatie voor <strong>gezinsplanning en automatisatie</strong>, met aandacht voor betrouwbaarheid, veilige configuratie en integraties met externe diensten.",
        desc="Eigen webapplicatie rond gezinsplanning en automatisatie, met aandacht voor security, configuratie en integraties.",
        chips=["Next.js (App Router)", "Supabase", "Google Calendar API", "OneDrive", "JavaScript / TypeScript"],
        context_h="Context en <span class=\"accent\">doel</span>",
        context=["Gezinsgerichte planning: het <strong>family hub</strong>-concept", "<strong>Meerdere gebruikers</strong> en contexten",
                 "Automatisatie van <strong>terugkerende taken</strong>", "Integratie met externe API's, zoals <strong>Google Calendar</strong>"],
        goal="Een stabiele en onderhoudbare webapplicatie die een realistische productieomgeving nabootst, met planning, meldingen en synchronisatie centraal.",
        why_h="Security en <span class=\"accent\">betrouwbaarheid</span>",
        why_sub="Stabiliteit en voorspelbaarheid boven snelle workarounds.",
        why=["Secrets en credentials <strong>nooit in frontend-code</strong>", "Bewuste keuzes rond <strong>permissions en API-scopes</strong>",
             "Correct omgaan met de beperkingen van <strong>service accounts</strong>", "Environment variables via <strong>.env.local</strong> en cloudinstellingen",
             "Duidelijke scheiding tussen <strong>test en productie</strong>"],
        why_result=["Opgelost: ontbrekende of foute environment variables", "Opgelost: Google Calendar-permissies en attendees",
                    "Opgelost: Next.js-routing en duplicaten", "Geleerd: reproduceerbare fixes en versiebeheer"],
        arch=("dashboard.jpg", "Dashboard", "Startpagina met modules en een overzicht van de status, in donkere en lichte modus."),
        built_h="Wat ik heb <span class=\"accent\">gebouwd</span>",
        built=[("layers", "Applicatiestructuur", ["Next.js met App Router", "Scheiding via route groups", "Herbruikbare componenten", "Ontworpen voor niet-technische gebruikers"]),
               ("db", "Data en authenticatie", ["Supabase als database en login", "Structuur per gezin en context", "Server-side validatie"]),
               ("cal", "Gezinsagenda", ["Google Calendar API via service accounts", "Gedeelde en persoonlijke events", "Synchronisatie met foutafhandeling"]),
               ("cart", "Boodschappen en klantenkaarten", ["Lijsten per winkel", "Mobile-first in de winkel", "QR-codes fullscreen scanbaar aan de kassa"]),
               ("lock", "Gezinskluis en verzekeringen", ["Veilige opslag van gevoelige documenten", "Toegangscontrole per gebruiker", "Herinneringen bij vervaldata"]),
               ("chat", "Botje, de assistent", ["Acties starten in gewone taal", "AI-assistent voor dagelijkse taken", "Server-side validatie en guardrails"])],
        img_dir="botje",
        shots=[("Agenda.jpg", "Gezinsagenda", "Gedeelde en persoonlijke events, gesynchroniseerd met Google Calendar.", False),
               ("bestanden.jpg", "Bestanden", "OneDrive-integratie voor gedeelde mappen, met uploaden, hernoemen en verwijderen.", False),
               ("boodschappen.jpg", "Boodschappen", "Lijsten per winkel met snel afvinken in de winkel.", False),
               ("klantenkaarten.jpg", "Klantenkaarten", "QR-codes fullscreen scanbaar aan de kassa.", False),
               ("klantenkaarten2.jpg", "Kaart tonen", "Een kaart tonen of verwijderen, met een duidelijke interface.", False),
               ("gezinskluis.jpg", "Gezinskluis", "Veilige opslag van gevoelige documenten en wachtwoorden.", False),
               ("verzekering_auto.jpg", "Verzekeringen", "Overzicht van polissen met details en vervaldata.", True),
               ("botje2.jpg", "Botje Chat", "AI-chatbot voor input in gewone taal en automatisatie.", False),
               ("architectuur.jpg", "Architectuur", "Scheiding tussen frontend, API-logica, Supabase en externe diensten.", False)],
        proof=[("Next.js", "Moderne webontwikkeling"), ("API", "Integraties in een realistische context"),
               ("Security", "Security-bewust werken"), ("Debug", "Problemen oplossen die niet triviaal zijn"),
               ("AI", "Complexe apps bouwen met AI-hulp")],
        other=("ad-electro", "Active Directory &amp; Windows Server: Electro"),
    ),
]


def page(p):
    img = f"../assets/images/{p['img_dir']}/"
    chips = "".join(f"<span>{c}</span>" for c in p["chips"])
    context = "".join(f"<li>{x}</li>" for x in p["context"])
    why = "".join(f"<li>{x}</li>" for x in p["why"])
    why_r = "".join(f"<li>{x}</li>" for x in p["why_result"])
    built = "".join(
        f'<div class="card reveal">{ico(i, "ico")}<h3>{h}</h3><ul>{"".join(f"<li>{x}</li>" for x in xs)}</ul></div>'
        for i, h, xs in p["built"])
    shots = "".join(
        f'<figure class="frame reveal{" wide" if w else ""}"><a href="{img}{f}" target="_blank" rel="noopener">'
        f'<img src="{img}{f}" alt="{t}" loading="lazy"></a><figcaption><strong>{t}</strong>{c}</figcaption></figure>'
        for f, t, c, w in p["shots"])
    proof = "".join(f'<div class="reveal"><strong>{a}</strong><p>{b}</p></div>' for a, b in p["proof"])
    af, at, ac = p["arch"]
    return f'''<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{p["title"]} | Jochen Thoelen</title>
<meta name="description" content="{p["desc"]}">
<meta name="theme-color" content="#03060e">
<meta property="og:type" content="article">
<meta property="og:title" content="{p["title"]}">
<meta property="og:description" content="{p["desc"]}">
<meta property="og:url" content="{BASE}{p["map"]}/">
<meta property="og:image" content="{BASE}og.png?v=3">
<meta property="og:site_name" content="Jochen Thoelen">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="../assets/favicon.svg?v=2" type="image/svg+xml">
<link rel="icon" href="../assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/cinema/cinema.css?v=1">
<link rel="stylesheet" href="../assets/cinema/project.css?v=1">
</head>
<body data-no-intro>
<div class="grain" aria-hidden="true"></div>

<header class="nav">
  <div class="nav-inner">
    <a class="mono" href="{CV}" aria-label="Jochen Thoelen"><i>JT</i><b>Jochen Thoelen</b></a>
    <nav class="nav-links"><a href="#context">Context</a><a href="#opgezet">Opbouw</a><a href="#beelden">Beelden</a></nav>
    <a class="btn btn-small" href="{CV}#projecten">Terug naar cv {ico("arrow")}</a>
  </div>
</header>

<main id="top">
  <section class="hero hero-sub">
    <canvas id="field" aria-hidden="true"></canvas>
    <div class="hero-vignette"></div>
    <div class="hero-content">
      <p class="eyebrow reveal"><span class="dot"></span>{p["eyebrow"]}</p>
      <h1><span class="line reveal">{p["h1"][0]}</span><span class="line reveal accent">{p["h1"][1]}</span></h1>
      <p class="hero-lead reveal">{p["lead"]}</p>
      <div class="hero-chips reveal">{chips}</div>
    </div>
  </section>

  <section class="section" id="context">
    <div class="wrap split">
      <div class="reveal">
        <p class="label">Context</p>
        <h2>{p["context_h"]}</h2>
        <ul class="big-feat">{context}</ul>
        <div class="goal"><p class="label">Doel</p><p>{p["goal"]}</p></div>
      </div>
      <div class="reveal">
        <p class="label">Aanpak</p>
        <h2>{p["why_h"]}</h2>
        <p class="sub">{p["why_sub"]}</p>
        <ul class="feat">{why}</ul>
        <ul class="big-feat" style="margin-top:28px">{why_r}</ul>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:40px">
    <div class="wrap">
      <figure class="frame hero-shot reveal"><a href="{img}{af}" target="_blank" rel="noopener"><img src="{img}{af}" alt="{at}" loading="lazy"></a>
        <figcaption><strong>{at}</strong>{ac}</figcaption></figure>
    </div>
  </section>

  <section class="section" id="opgezet">
    <div class="wrap">
      <div class="section-head reveal"><p class="label">Opbouw</p><h2>{p["built_h"]}</h2></div>
      <div class="cards three">{built}</div>
    </div>
  </section>

  <section class="section" id="beelden">
    <div class="wrap">
      <div class="section-head reveal"><p class="label">Beelden</p><h2>Uit de <span class="accent">praktijk</span></h2>
        <p class="sub">Klik op een beeld om het groot te bekijken.</p></div>
      <div class="gallery">{shots}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal"><p class="label">Resultaat</p><h2>Wat dit project <span class="accent">aantoont</span></h2></div>
      <div class="proof">{proof}</div>
    </div>
  </section>

  <section class="section" style="padding-top:20px">
    <div class="wrap">
      <div class="next reveal">
        <div><p class="label">Verder kijken</p><h3>Meer over mijn loopbaan en projecten</h3><p>Op mijn cv-site staan mijn ervaring, mijn eigen software en het volledige cv als pdf.</p></div>
        <div class="btns">
          <a class="btn" href="{CV}#projecten">Naar mijn cv {ico("arrow")}</a>
          <a class="btn btn-ghost" href="../{p["other"][0]}/">{p["other"][1]}</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="wrap footer-inner">
    <p>&copy; 2026 Jochen Thoelen</p>
    <p><a href="{CV}">www.cv-jochen-thoelen.be</a></p>
  </div>
</footer>
<script src="../assets/cinema/cinema.js?v=1" defer></script>
</body>
</html>
'''


if __name__ == "__main__":
    for p in PAGES:
        path = os.path.join(SITE, p["map"], "index.html")
        with io.open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(page(p))
        print("geschreven:", path)
