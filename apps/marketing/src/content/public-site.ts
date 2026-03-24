import type {
  HeroAction,
  HouseHotspot,
  HouseRoom,
  HouseSceneAsset,
  Metric,
  NavigationItem,
  PillarCard,
  PublicPageContent,
  TimelineEvent,
  ValueCard,
} from '@/lib/types/public';

export const siteMeta = {
  title: 'KB! Teutonia',
  description:
    'Karlsruher Burschenschaft Teutonia seit 1843. Gemeinschaft, akademischer Anspruch und ein Haus in Campusnähe.',
  address: ['Karlsruher Burschenschaft Teutonia', 'Parkstraße 1', '76131 Karlsruhe'],
  phone: '0721 - 66 777 348',
  emails: {
    general: 'chargen@kbteutonia.de',
    rooms: 'zimmer@kbteutonia.de',
    privacy: 'admin@kbteutonia.de',
  },
  socials: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/teutoniakarlsruhe/?hl=de',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/KB.Teutonia/',
    },
  ],
};

export const mainNavigation: NavigationItem[] = [
  { href: '/#about', label: 'Profil' },
  {
    href: '/studium',
    label: 'Bereiche',
    children: [
      {
        href: '/studium',
        label: 'Studium',
        description: 'Lernen, Austausch und akademische Unterstützung.',
      },
      {
        href: '/karriere',
        label: 'Karriere',
        description: 'Verlässliches Netzwerk aus Karlsruhe in viele Branchen.',
      },
      {
        href: '/veranstaltungen',
        label: 'Veranstaltungen',
        description: 'Vorträge, Feste und studentische Formate auf dem Haus.',
      },
      {
        href: '/freundschaft',
        label: 'Freundschaft',
        description: 'Ein Lebensbund, der über Studienjahre hinaus trägt.',
      },
    ],
  },
  { href: '/#history', label: 'Geschichte' },
  { href: '/#house', label: 'Haus' },
  { href: '/#contact', label: 'Kontakt' },
];

export const homeHero = {
  eyebrow: 'Karlsruher Burschenschaft · Gegründet 1843',
  title: 'Manche Bindungen dauern länger als das Studium.',
  description:
    'Teutonia ist kein Wohnheim. Es ist eine Gemeinschaft — für die Zeit des Studiums und weit darüber hinaus.',
};

export const heroStats: { label: string }[] = [
  { label: '180 Jahre Geschichte' },
  { label: '170+ Alte Herren' },
  { label: '20 Zimmer in Karlsruhe' },
];

export const homeKennzahlen: Metric[] = [
  { value: '180', label: 'Jahre Geschichte' },
  { value: '170+', label: 'Alte Herren' },
  { value: '20', label: 'Zimmer' },
  { value: '1843', label: 'Gegründet' },
];

export const testimonials: { quote: string; name: string; field: string }[] = [
  {
    quote:
      'Ich bin nicht hierhergekommen, um zu wohnen. Ich bin geblieben, weil es sich wie Zuhause anfühlt.',
    name: 'Maximilian B.',
    field: 'Maschinenbau, 5. Semester',
  },
  {
    quote:
      'Das Haus hat meinen Studienstart komplett verändert. Ich bin nicht mehr allein mit Fragen — weder fachlich noch menschlich.',
    name: 'Jonas K.',
    field: 'Maschinenbau, 4. Semester',
  },
  {
    quote:
      'Hier lernt man nicht nur für Klausuren. Man lernt, wie man Verantwortung übernimmt und mit Menschen umgeht, auf die man zählen kann.',
    name: 'Lukas B.',
    field: 'Wirtschaftsingenieurwesen, 5. Semester',
  },
];

export const homeHeroActions: HeroAction[] = [
  { href: '/#house', label: 'Haus erleben', variant: 'primary' },
  { href: '/#contact', label: 'Kontakt aufnehmen', variant: 'secondary' },
];

export const homeMetrics: Metric[] = [
  {
    value: '1843',
    label: 'Gründungsjahr',
    detail: 'Älteste Burschenschaft an einer technischen Hochschule in Deutschland.',
  },
  {
    value: '20',
    label: 'Zimmer im Haus',
    detail: 'Möbliertes Wohnen mit kurzem Weg zum KIT.',
  },
  {
    value: '170+',
    label: 'Alte Herren',
    detail: 'Erfahrungen aus Wissenschaft, Wirtschaft und öffentlichem Leben.',
  },
  {
    value: '5 Min.',
    label: 'Zum Campus',
    detail: 'Parkstraße, Oststadt und Universität liegen eng beieinander.',
  },
];

export const homeValues: ValueCard[] = [
  {
    title: 'Verlässliche Gemeinschaft',
    description:
      'Studium, Alltag und Verantwortung werden nicht allein getragen. Unterstützung entsteht hier aus Nähe, Vertrauen und gemeinsamen Standards.',
    detail: 'Gemeinschaft mit klarem Anspruch statt lockerer Beliebigkeit.',
  },
  {
    title: 'Akademischer Fokus',
    description:
      'Lernräume, fachübergreifender Austausch und der direkte Zugang zu Erfahrungswissen machen das Haus zu einem produktiven Umfeld.',
    detail: 'Von Klausurenphase bis Berufsstart.',
  },
  {
    title: 'Tradition mit Gegenwartssinn',
    description:
      'Historische Wurzeln sind sichtbar, aber nicht museal. Die Haltung bleibt konservativ, die Umsetzung bewusst zeitgemäß.',
    detail: 'Substanz statt Nostalgie.',
  },
  {
    title: 'Netzwerk mit Haltung',
    description:
      'Alte Herren, Studierende und Freunde des Hauses bilden ein belastbares Gegenüber für Fragen, Chancen und Entscheidungen.',
    detail: 'Kontakte, die auf Beziehung und nicht auf Show beruhen.',
  },
];

export const homePillars: PillarCard[] = [
  {
    href: '/studium',
    title: 'Studium',
    eyebrow: 'Nicht allein durch die härteste Phase',
    description:
      'Mittagstisch, gemeinsame Lernräume und fachübergreifende Unterstützung — wer hier wohnt, kämpft nicht allein.',
  },
  {
    href: '/karriere',
    title: 'Karriere',
    eyebrow: 'Ein Netzwerk, das wirklich funktioniert',
    description:
      'Über 170 Alte Herren in allen Branchen. Echtes Mentoring statt leerer LinkedIn-Verbindungen.',
  },
  {
    href: '/veranstaltungen',
    title: 'Veranstaltungen',
    eyebrow: 'Momente, die man nicht kaufen kann',
    description:
      'Vorträge, Feste, Ausflüge, Abende auf dem Haus — ein Kalender, der das Studium lebendig macht.',
  },
  {
    href: '/freundschaft',
    title: 'Freundschaft',
    eyebrow: 'Bindungen für das ganze Leben',
    description:
      'Was hier beginnt, hört nicht mit dem Abschluss auf. Der Lebensbund ist kein Marketingversprechen.',
  },
];

export const historyTimeline: TimelineEvent[] = [
  {
    year: '1843',
    title: 'Gründung am Polytechnikum',
    description:
      'Am 10. Oktober 1843 entsteht die Teutonia in Karlsruhe. Sie gehört zu den frühesten studentischen Zusammenschlüssen an einer technischen Hochschule.',
  },
  {
    year: '1848',
    title: 'Politische Verantwortung',
    description:
      'Mitglieder engagieren sich im Freiheitskampf der Badischen Revolution. Der Gedanke von Verantwortung und Haltung prägt den Bund bis heute.',
  },
  {
    year: '1906',
    title: 'Das Haus als Mittelpunkt',
    description:
      'Mit dem eigenen Haus bekommt die Gemeinschaft einen Ort, der Studium, Veranstaltungen und Alltag dauerhaft zusammenführt.',
  },
  {
    year: '1950',
    title: 'Wiederaufbau und Kontinuität',
    description:
      'Nach den Brüchen der Kriegszeit wird der Bund neu belebt und institutionell wieder verankert.',
  },
  {
    year: 'Heute',
    title: 'Konservative Haltung, moderne Form',
    description:
      'Die Teutonia verbindet historische Identität mit einem zeitgemäßen Auftritt und klarer Orientierung auf Studium, Gemeinschaft und Öffentlichkeit.',
  },
];

export const campusFeatures = [
  {
    title: 'Campusnah wohnen',
    description:
      'Von der Parkstraße aus sind Hörsäle, Bibliotheken und Institutsgebäude in wenigen Minuten erreichbar.',
  },
  {
    title: 'Karlsruher Oststadt',
    description:
      'Zwischen Universität, Straßenbahn und Hardtwald liegt das Haus in einer Lage, die Alltag und Ruhe sinnvoll verbindet.',
  },
  {
    title: 'Produktiver Tagesrhythmus',
    description:
      'Mittagstisch, Lernräume und Rückzugsorte machen das Haus zu einem realen Arbeits- und Lebensraum, nicht nur zu einer Adresse.',
  },
];

export const contactCards = [
  {
    title: 'Allgemeiner Kontakt',
    detail: 'Für Besuch, Kennenlernen und Fragen zur Teutonia.',
    value: siteMeta.emails.general,
    href: `mailto:${siteMeta.emails.general}`,
  },
  {
    title: 'Zimmer & Wohnen',
    detail: 'Für Zimmeranfragen und Fragen rund um das Haus.',
    value: siteMeta.emails.rooms,
    href: `mailto:${siteMeta.emails.rooms}`,
  },
  {
    title: 'Telefon',
    detail: 'Direkter Kontakt zum Haus.',
    value: siteMeta.phone,
    href: 'tel:+4972166777348',
  },
];

export const houseSceneAsset: HouseSceneAsset = {
  kind: 'image',
  src: '/images/house/exterior.jpg',
  alt: 'Außenansicht des Hauses der Karlsruher Burschenschaft Teutonia',
};

export const houseRooms: HouseRoom[] = [
  {
    id: 'loggia',
    slug: 'eingang-loggia',
    title: 'Eingang & Loggia',
    teaser: 'Ankommen zwischen Straße, Haus und Gemeinschaft.',
    description:
      'Der Zugang über die Parkstraße führt direkt in einen Alltag, in dem Wege kurz und Begegnungen selbstverständlich sind. Die Loggia erweitert das Haus im Sommer nach außen und macht das Gebäude schon vor dem Eintreten zu einem Treffpunkt.',
    highlights: [
      'Adresse in unmittelbarer Nähe zum KIT',
      'Niedrige Schwelle für Besuch und Kennenlernen',
      'Sommerlicher Treffpunkt mit Blick in die Oststadt',
    ],
    facts: [
      { label: 'Lage', value: 'Parkstraße 1, Karlsruhe-Oststadt' },
      { label: 'Weg zum Campus', value: 'ca. 5 bis 10 Minuten zu Fuß' },
      { label: 'Nutzung', value: 'Ankommen, Treffen, Grillabende' },
    ],
    media: [
      {
        src: '/images/house/exterior.jpg',
        alt: 'Außenansicht des Hauses an der Parkstraße',
      },
    ],
  },
  {
    id: 'bar',
    slug: 'bar-tresen',
    title: 'Bar & Tresen',
    teaser: 'Der informelle Mittelpunkt für Gespräche und spontane Abende.',
    description:
      'Die Bar ist kein Showpiece, sondern ein echter sozialer Knotenpunkt. Hier entstehen Gespräche nach Vorlesungen, kleine Feiern und die informelle Seite des Hauses.',
    highlights: [
      'Kurzer Übergang vom Studienalltag in den Abend',
      'Persönliche Atmosphäre statt anonymer Treffpunkt',
      'Gut geeignet für kleine Runden und spontane Begegnungen',
    ],
    facts: [
      { label: 'Schwerpunkt', value: 'Gespräche, Geburtstage, spontane Abende' },
      { label: 'Charakter', value: 'Privat, ruhig, gemeinschaftlich' },
      { label: 'Verbindung', value: 'Direkt mit dem Hausalltag verzahnt' },
    ],
    media: [
      {
        src: '/images/house/bar.jpg',
        alt: 'Bar und Tresen im Haus der Teutonia',
      },
    ],
  },
  {
    id: 'festsaal',
    slug: 'mittagstisch-festsaal',
    title: 'Mittagstisch & Festsaal',
    teaser: 'Gemeinsame Tafel für Alltag, Vorträge und Veranstaltungen.',
    description:
      'Der große Raum trägt den Alltag ebenso wie besondere Formate. Mittagstisch, Vortragsabende und festliche Anlässe greifen hier ineinander und geben dem Haus seinen öffentlichen Takt.',
    highlights: [
      'Gemeinsames Essen als fixer Tagesanker',
      'Raum für Vorträge, Bälle und studentische Veranstaltungen',
      'Geeignet für formellere und informelle Formate',
    ],
    facts: [
      { label: 'Alltag', value: 'Mittagstisch und Hausgemeinschaft' },
      { label: 'Formate', value: 'Vorträge, Feste, interne Veranstaltungen' },
      { label: 'Funktion', value: 'Öffentlicher Kern des Hauses' },
    ],
    media: [
      {
        src: '/images/house/festsaal.jpg',
        alt: 'Festsaal und Mittagstisch im Haus',
      },
    ],
  },
  {
    id: 'lounge',
    slug: 'fernsehecke-billard',
    title: 'Fernsehecke & Billard',
    teaser: 'Ein entspannter Gegenpol zu Lernphasen und Organisationsarbeit.',
    description:
      'Die Lounge verbindet Rückzug, Gespräch und gemeinsame Freizeit. Gerade weil das Haus nicht nur aus Pflichtterminen besteht, sind solche Räume entscheidend für einen lebendigen Alltag.',
    highlights: [
      'Gemeinsame Abende im kleinen Kreis',
      'Platz für Sportübertragungen und Gespräche',
      'Billard als lockerer Treffpunkt im Haus',
    ],
    facts: [
      { label: 'Nutzung', value: 'Freizeit, Gespräche, Tagesausklang' },
      { label: 'Stimmung', value: 'Informell und wohnlich' },
      { label: 'Mehrwert', value: 'Entlastet zwischen Studium und Organisation' },
    ],
    media: [
      {
        src: '/images/house/lounge.jpg',
        alt: 'Fernsehecke und Billardtisch im Haus',
      },
    ],
  },
  {
    id: 'study',
    slug: 'lern-zeichenzimmer',
    title: 'Lern- & Zeichenzimmer',
    teaser: 'Konzentrierte Arbeit mit kurzen Wegen zu Hilfe und Austausch.',
    description:
      'Für Übungen, Gruppenarbeiten und Klausurvorbereitung stehen eigene Lernräume bereit. Der Mehrwert entsteht aus der Kombination von Ruhe, Nähe und direktem Zugriff auf andere Erfahrungen im Haus.',
    highlights: [
      'Räume für konzentriertes Arbeiten in kleinen Gruppen',
      'Sinnvoll in intensiven Lernphasen',
      'Nah an Menschen, die bei Fragen direkt weiterhelfen können',
    ],
    facts: [
      { label: 'Einsatz', value: 'Lernen, Rechnen, Projektarbeit' },
      { label: 'Typisch', value: 'Klausurenphase und Gruppenübungen' },
      { label: 'Umfeld', value: 'Ruhig, funktional, gemeinschaftsnah' },
    ],
    media: [
      {
        src: '/images/house/lernzimmer.jpg',
        alt: 'Lernzimmer mit Tischen und Arbeitsplätzen',
      },
    ],
  },
  {
    id: 'rooms',
    slug: 'zimmer',
    title: 'Zimmer & Wohnen',
    teaser: 'Campusnah wohnen mit eigenem Zimmer und Anbindung an das Haus.',
    description:
      'Die 20 möblierten Zimmer schaffen eine Wohnform, die Studium und Gemeinschaft sinnvoll verbindet. Die Nähe zum Campus bleibt ein praktischer Vorteil, das eigentliche Alleinstellungsmerkmal ist jedoch das Umfeld.',
    highlights: [
      'Möblierte Zimmer mit eigenem Bad',
      'Kurze Wege zu Hörsälen, Bibliotheken und Straßenbahn',
      'Wohnen in einem aktiven Haus statt in einer anonymen WG',
    ],
    facts: [
      { label: 'Zimmerzahl', value: '20' },
      { label: 'Größe', value: 'ca. 17 m²' },
      { label: 'Ausstattung', value: 'Möbliert, eigenes Bad, Internetanschluss' },
    ],
    media: [
      {
        src: '/images/house/exterior.jpg',
        alt: 'Außenansicht des Hauses mit den Zimmern in der Parkstraße',
      },
    ],
  },
];

export const houseHotspots: HouseHotspot[] = [
  {
    id: 'hs-loggia',
    label: 'Eingang / Loggia',
    teaser: 'Ankommen und Treffpunkt an der Parkstraße',
    roomId: 'loggia',
    cta: 'Loggia ansehen',
    mobileOrder: 1,
    stagePosition: { x: 43, y: 49 },
  },
  {
    id: 'hs-bar',
    label: 'Tresen',
    teaser: 'Bar und informeller Mittelpunkt',
    roomId: 'bar',
    cta: 'Zum Tresen',
    mobileOrder: 2,
    stagePosition: { x: 30, y: 37 },
  },
  {
    id: 'hs-festsaal',
    label: 'Mittagstisch',
    teaser: 'Festsaal und gemeinsamer Tagesanker',
    roomId: 'festsaal',
    cta: 'Festsaal öffnen',
    mobileOrder: 3,
    stagePosition: { x: 56, y: 39 },
  },
  {
    id: 'hs-lounge',
    label: 'Fernsehecke',
    teaser: 'Lounge, Gespräche und Billard',
    roomId: 'lounge',
    cta: 'Lounge öffnen',
    mobileOrder: 4,
    stagePosition: { x: 73, y: 66 },
  },
  {
    id: 'hs-study',
    label: 'Lernzimmer',
    teaser: 'Räume für Übung, Fokus und Austausch',
    roomId: 'study',
    cta: 'Lernräume öffnen',
    mobileOrder: 5,
    stagePosition: { x: 62, y: 25 },
  },
  {
    id: 'hs-rooms',
    label: 'Zimmer',
    teaser: 'Wohnen direkt im Haus',
    roomId: 'rooms',
    cta: 'Zimmerdetails ansehen',
    mobileOrder: 6,
    stagePosition: { x: 16, y: 73 },
  },
];

export const publicPages: Record<string, PublicPageContent> = {
  studium: {
    slug: 'studium',
    title: 'Studium mit kurzen Wegen und echtem Rückhalt',
    description:
      'Lernräume, Alltag auf dem Haus und fachübergreifender Austausch geben dem Studium an der Teutonia einen konkreten Mehrwert.',
    eyebrow: 'Studium & Bildung',
    intro:
      'Akademischer Anspruch ist bei Teutonia nicht bloß ein Wort. Er zeigt sich im Tagesrhythmus, in kurzen Wegen zu anderen Fachrichtungen und in einer Umgebung, die konzentriertes Arbeiten fördert.',
    stats: [
      { value: '5-10 Min.', label: 'zum KIT', detail: 'Campus und Bibliotheken sind zu Fuß erreichbar.' },
      { value: 'Lernräume', label: 'im Haus', detail: 'Für Gruppenarbeiten, Übungen und Klausurvorbereitung.' },
      { value: 'Interdisziplinär', label: 'im Alltag', detail: 'Austausch über Fakultätsgrenzen hinweg.' },
    ],
    highlights: [
      {
        title: 'Lernen im Alltag verankert',
        description:
          'Wer auf dem Haus lebt oder regelmäßig dort ist, muss produktive Routinen nicht künstlich organisieren. Sie entstehen aus der Umgebung.',
      },
      {
        title: 'Direkter Zugriff auf Erfahrung',
        description:
          'Höhere Semester, Absolventen und Freunde des Hauses helfen oft schneller weiter als jede lose Online-Gruppe.',
      },
      {
        title: 'Ruhe und Gemeinschaft zugleich',
        description:
          'Die Mischung aus Arbeitsräumen, Mittagstisch und Rückzugsmöglichkeiten macht das Haus alltagstauglich.',
      },
    ],
    detailBlocks: [
      {
        title: 'Fachwissen ist nur ein Teil von Bildung',
        body:
          'Neben der Vorbereitung auf Prüfungen zählt die Fähigkeit, Zusammenhänge zu verstehen, Positionen zu vertreten und mit anderen tragfähig zusammenzuarbeiten. Diese breitere Bildung entsteht vor allem im direkten Austausch.',
        bullets: [
          'Vorträge und Gesprächsformate auf dem Haus',
          'Austausch zwischen verschiedenen Studienrichtungen',
          'Verbindung von fachlicher und persönlicher Entwicklung',
        ],
      },
      {
        title: 'Studium braucht ein passendes Umfeld',
        body:
          'Ein konzentrierter Lernraum, ein gemeinsamer Mittagstisch und direkte Wege zum Campus wirken banal, sind aber oft entscheidend dafür, ob ein Studium geordnet und erfolgreich verläuft.',
        aside:
          'Teutonia versteht Studium nicht als isolierte Einzelleistung, sondern als Leistung in einem verlässlichen Umfeld.',
      },
    ],
    quote: {
      text: 'Ein gutes Studium braucht nicht nur Disziplin, sondern ein Umfeld, das Leistung im Alltag möglich macht.',
      attribution: 'Teutonia Karlsruhe',
    },
    cta: {
      title: 'Haus und Lernräume im Zusammenhang sehen',
      description:
        'Die Lernkultur der Teutonia wird erst verständlich, wenn man das Haus als Arbeits- und Lebensort erlebt.',
      primary: { href: '/#house', label: 'Zum House Explorer' },
      secondary: { href: '/#contact', label: 'Fragen zum Studium stellen' },
    },
  },
  karriere: {
    slug: 'karriere',
    title: 'Karriere entsteht aus belastbaren Beziehungen',
    description:
      'Das Netzwerk der Teutonia lebt von persönlicher Nähe, generationsübergreifendem Austausch und einem gemeinsamen Verständnis von Verantwortung.',
    eyebrow: 'Netzwerk & Karriere',
    intro:
      'Berufliche Orientierung ist mehr als das Sammeln von Kontakten. Wertvoll wird ein Netzwerk dann, wenn es auf Vertrauen, Gesprächsbereitschaft und gemeinsamen Maßstäben beruht.',
    stats: [
      { value: '170+', label: 'Alte Herren', detail: 'Verbindungen in viele Branchen und Lebenswege.' },
      { value: 'Generationen', label: 'im Austausch', detail: 'Nicht nur punktuell, sondern im Hausalltag verankert.' },
      { value: 'Persönlich', label: 'statt anonym', detail: 'Kontakte entstehen im echten Gespräch.' },
    ],
    highlights: [
      {
        title: 'Orientierung vor Bewerbung',
        description:
          'Oft ist nicht der Lebenslauf die erste Hürde, sondern die Frage, welche Richtung überhaupt sinnvoll ist. Genau dort hilft ein persönliches Netzwerk.',
      },
      {
        title: 'Erfahrung als Gesprächspartner',
        description:
          'Berufliche Fragen lassen sich besser mit Menschen klären, die ähnliche Übergänge schon selbst durchlaufen haben.',
      },
      {
        title: 'Verantwortung bleibt Maßstab',
        description:
          'Karriere wird nicht als Selbstzweck verstanden, sondern als Verbindung von Leistung, Haltung und Verlässlichkeit.',
      },
    ],
    detailBlocks: [
      {
        title: 'Ein Netzwerk, das den Namen verdient',
        body:
          'Teutonia verbindet Studierende mit Absolventen, die in Unternehmen, Forschung, Verwaltung und Selbstständigkeit Verantwortung tragen. Entscheidend ist weniger die Reichweite als die Qualität dieser Beziehungen.',
        bullets: [
          'Persönliche Gespräche statt standardisierter Networking-Events',
          'Einblicke in Berufswege und Entscheidungsrealitäten',
          'Unterstützung bei Übergängen zwischen Studium und Beruf',
        ],
      },
      {
        title: 'Karriere im realen Kontext',
        body:
          'Wer unterschiedliche Lebenswege kennenlernt, ordnet die eigene Entwicklung souveräner ein. Das reduziert Aktionismus und schärft den Blick für das, was langfristig trägt.',
        aside:
          'Gute Kontakte sind dort belastbar, wo sie aus gemeinsamer Erfahrung und gegenseitigem Respekt entstanden sind.',
      },
    ],
    quote: {
      text: 'Berufliche Chancen werden wertvoll, wenn man sie mit Urteilskraft und einem verlässlichen Gegenüber nutzen kann.',
      attribution: 'Teutonia Karlsruhe',
    },
    cta: {
      title: 'Das Haus als Ausgangspunkt kennenlernen',
      description:
        'Das Netzwerk erschließt sich nicht aus Zahlen, sondern aus dem Ort, an dem die Beziehungen entstehen und gepflegt werden.',
      primary: { href: '/#house', label: 'Haus und Alltag ansehen' },
      secondary: { href: '/#contact', label: 'Gespräch anfragen' },
    },
  },
  veranstaltungen: {
    slug: 'veranstaltungen',
    title: 'Veranstaltungen mit Haltung und Atmosphäre',
    description:
      'Vorträge, Feste und studentische Abende geben dem Haus Struktur und machen Teutonia nach innen wie nach außen erlebbar.',
    eyebrow: 'Veranstaltungen & Programm',
    intro:
      'Ein Haus gewinnt Profil durch seine Formate. Gute Veranstaltungen verbinden Gespräch, Gastlichkeit und einen Rahmen, in dem Menschen unterschiedlicher Generationen selbstverständlich zusammenkommen.',
    stats: [
      { value: 'Hausformate', label: 'im Jahreslauf', detail: 'Von Vorträgen bis zu festlichen Anlässen.' },
      { value: 'Gastlichkeit', label: 'mit Maß', detail: 'Nicht laut um jeden Preis, sondern bewusst gestaltet.' },
      { value: 'Öffentlichkeit', label: 'mit Profil', detail: 'Einladungen und Gespräche über den eigenen Kreis hinaus.' },
    ],
    highlights: [
      {
        title: 'Vorträge und Diskussionen',
        description:
          'Fachliche und gesellschaftliche Themen bekommen Raum in Formaten, die nicht auf Oberflächenreize angewiesen sind.',
      },
      {
        title: 'Feste mit Form',
        description:
          'Festliche Veranstaltungen halten Tradition sichtbar, ohne in museale Rituale abzugleiten.',
      },
      {
        title: 'Studentische Abende',
        description:
          'Gerade die kleineren, wiederkehrenden Formate halten das Haus lebendig und niedrigschwellig.',
      },
    ],
    detailBlocks: [
      {
        title: 'Ein Haus braucht Rhythmus',
        body:
          'Veranstaltungen strukturieren das Semester, schaffen gemeinsame Bezugspunkte und öffnen das Haus nach außen. Dadurch wird Teutonia als Gemeinschaft konkret erlebbar.',
        bullets: [
          'Vortragsabende und Gesprächsformate',
          'Interne und öffentliche Festlichkeiten',
          'Wiederkehrende studentische Formate im Hausalltag',
        ],
      },
      {
        title: 'Gastlichkeit ist Teil der Kultur',
        body:
          'Ein guter Rahmen, verlässliche Organisation und eine bewusste Atmosphäre sind kein Beiwerk. Sie prägen, wie ein Haus wahrgenommen wird und wie Menschen dort miteinander umgehen.',
        aside:
          'Veranstaltungen zeigen in verdichteter Form, wofür ein Haus steht.',
      },
    ],
    quote: {
      text: 'Ein gutes Haus erkennt man daran, dass seine Veranstaltungen nicht laut sein müssen, um in Erinnerung zu bleiben.',
      attribution: 'Teutonia Karlsruhe',
    },
    cta: {
      title: 'Den Ort hinter den Formaten entdecken',
      description:
        'Der House Explorer zeigt die Räume, in denen Vorträge, Mittagstisch und festliche Abende zusammenkommen.',
      primary: { href: '/#house', label: 'Räume ansehen' },
      secondary: { href: '/#contact', label: 'Kontakt aufnehmen' },
    },
  },
  freundschaft: {
    slug: 'freundschaft',
    title: 'Freundschaft als tragende Form der Gemeinschaft',
    description:
      'Teutonia versteht Gemeinschaft nicht als temporäre Zweckverbindung, sondern als langfristige Beziehung mit Alltag, Verantwortung und Erinnerung.',
    eyebrow: 'Lebensbund & Freundschaft',
    intro:
      'Freundschaft ist hier keine dekorative Floskel. Sie entsteht aus gemeinsamem Alltag, gegenseitiger Hilfe und dem Willen, auch über Übergänge hinweg verbunden zu bleiben.',
    stats: [
      { value: 'Alltag', label: 'als Grundlage', detail: 'Gemeinschaft wächst durch gelebte Routinen.' },
      { value: 'Lebensbund', label: 'statt Kurzzeitkontakt', detail: 'Verbindung über Studienjahre hinaus.' },
      { value: 'Vertrauen', label: 'im direkten Umgang', detail: 'Persönliche Nähe statt bloßer Zugehörigkeit.' },
    ],
    highlights: [
      {
        title: 'Gemeinschaft im täglichen Miteinander',
        description:
          'Freundschaft zeigt sich in Hilfe, Verlässlichkeit und im gemeinsamen Tragen von Verantwortung.',
      },
      {
        title: 'Übergänge werden gemeinsam bewältigt',
        description:
          'Zwischen Studium, Beruf, Ortswechseln und neuen Lebensphasen bleibt die Verbindung ansprechbar.',
      },
      {
        title: 'Das Haus als gemeinsamer Bezugspunkt',
        description:
          'Ein realer Ort macht langfristige Beziehung anders möglich als reine Online- oder Eventgemeinschaften.',
      },
    ],
    detailBlocks: [
      {
        title: 'Freundschaft braucht Wiederholung',
        body:
          'Gemeinsames Essen, Lernen, Organisieren und Feiern erzeugen eine Verbindlichkeit, aus der echte Nähe entstehen kann. Gerade die unspektakulären Routinen machen den Unterschied.',
        bullets: [
          'Mittagstisch und Alltag auf dem Haus',
          'Verlässliche Unterstützung in Belastungsphasen',
          'Langfristige Bindung über verschiedene Lebensabschnitte',
        ],
      },
      {
        title: 'Ein konservatives Verständnis von Gemeinschaft',
        body:
          'Die Teutonia setzt nicht auf schnelle Zugehörigkeitseffekte. Zugehörigkeit wächst aus Zeit, Haltung und gelebter Verantwortung füreinander.',
        aside:
          'Was langfristig tragen soll, muss im Alltag bewährt werden.',
      },
    ],
    quote: {
      text: 'Freundschaft wird belastbar, wenn sie nicht nur aus Sympathie, sondern aus gemeinsamem Leben entsteht.',
      attribution: 'Teutonia Karlsruhe',
    },
    cta: {
      title: 'Gemeinschaft über den Ort verstehen',
      description:
        'Wer sehen will, wie Freundschaft im Alltag funktioniert, sollte das Haus und seine Räume in Beziehung zueinander betrachten.',
      primary: { href: '/#house', label: 'Zum House Explorer' },
      secondary: { href: '/#contact', label: 'Besuch vereinbaren' },
    },
  },
};

export const legalPageContent = {
  impressum: {
    title: 'Impressum',
    description: 'Rechtliche Angaben und Kontakt zur Karlsruher Burschenschaft Teutonia.',
  },
  privacy: {
    title: 'Datenschutz',
    description: 'Datenschutzinformationen und Ansprechpartner der Karlsruher Burschenschaft Teutonia.',
  },
};
