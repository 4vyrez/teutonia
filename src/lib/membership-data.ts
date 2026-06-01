/**
 * The four stages of membership in KB! Teutonia — single source of truth.
 *
 * Consumed by both the homepage `Mitgliedschaft` section (short form) and the
 * `/mitgliedschaft` route (long form). German copy is lifted verbatim from the
 * design reference (`design_reference/mitgliedschaft.jsx` → `stagesDetail`).
 */

export type MembershipStage = {
  /** Stable slug for keys/anchors. */
  id: string;
  /** Stage name, e.g. "Fux". */
  title: string;
  /** Sub-label (uppercase eyebrow in the design), e.g. "Erstes Jahr · Aufnahme". */
  sub: string;
  /** Rough timeframe shown as a pill, e.g. "~ 1–2 Semester". */
  duration: string;
  /** Long-form description paragraph. */
  body: string;
  /** "Was du bekommst" — rights gained at this stage. */
  rights: string[];
  /** "Was du beiträgst" — duties owed at this stage. */
  duties: string[];
};

export const membershipStages: readonly MembershipStage[] = [
  {
    id: 'fux',
    title: 'Fux',
    sub: 'Erstes Jahr · Aufnahme',
    duration: '~ 1–2 Semester',
    body: 'Als Fux ziehst du ins Haus ein und lernst die Verbindung kennen — Werte, Geschichte, Routinen, Lieder. Du hast keine Pflichten in der Verwaltung, aber wirst in die Abläufe eingebunden. Ein Fuxmajor begleitet dich durch dieses Jahr und beantwortet alles, was zwischen Klausurplan und Stiftungsfest auftaucht.',
    rights: [
      'Wohnen im Haus',
      'Teilnahme an allen Veranstaltungen',
      'Probesemester möglich (3 Monate, ohne Bindung)',
    ],
    duties: [
      'Teilnahme am Hausleben',
      'Lernen der Lieder & Geschichte',
      'Anwesenheit auf der Aktivenkonvent (Stimme nur indirekt)',
    ],
  },
  {
    id: 'bursche',
    title: 'Bursche',
    sub: 'Vollmitglied · nach Burschung',
    duration: 'Hauptstudium · Bachelor / Master',
    body: 'Nach der Burschung — einem Aufnahmegespräch + Convent — bist du Vollmitglied. Du übernimmst eines der Ämter (Sprecher, Schriftwart, Aktivenkasse, Veranstaltung, Fuxmajor) und gestaltest mit, wie das Haus läuft. Hier wird Verantwortung übersetzt in konkrete Aufgaben.',
    rights: [
      'Volles Stimmrecht im Convent',
      'Wahl in Ämter',
      'Mitsprache bei Aufnahme neuer Füxe',
      'Lebenslange Hausnutzung',
    ],
    duties: [
      'Übernahme eines Amts auf 1 Semester',
      'Aktive Teilnahme an Convent & Veranstaltungen',
      'Fux-Betreuung',
    ],
  },
  {
    id: 'inaktiver-bursche',
    title: 'Inaktiver Bursche',
    sub: 'Letzte Studiensemester',
    duration: 'Abschlussphase · Promotion',
    body: 'Wenn die Abschlussarbeit ruft, trittst du in die Inaktivität. Wohnen kannst du weiter — gerade die letzte Phase im Studium profitiert vom ruhigen Haus. Du übernimmst keine Pflichtaufgaben mehr, berätst aber die jüngeren Bundesbrüder und bist bei wichtigen Conventen dabei.',
    rights: [
      'Hausnutzung & Lernzimmer',
      'Beratungsrolle für Aktivitas',
      'Teilnahme an allen Veranstaltungen',
    ],
    duties: ['Anwesenheit auf großen Conventen empfohlen', 'Unterstützung bei Übergaben'],
  },
  {
    id: 'alter-herr',
    title: 'Alter Herr',
    sub: 'Nach dem Studium · lebenslang',
    duration: 'Lebenslang',
    body: 'Mit dem Abschluss endet die Aktivenrolle, aber nicht die Mitgliedschaft. Du trittst dem Altherrenverein bei und bleibst Teil der Verbindung. Für die Aktivitas bist du Ratgeber, Gesprächspartner, manchmal Türöffner. Das Haus bleibt ein Treffpunkt — beim Stiftungsfest, bei Vorträgen, an der Bar.',
    rights: [
      'Lebenslange Verbundenheit',
      'Zugang zum Haus & Alumninetzwerk',
      'Stimmrecht im Altherrenverein',
    ],
    duties: ['Jährlicher Beitrag (gestaffelt nach Lebensphase)', 'Teilnahme nach Möglichkeit'],
  },
] as const;
