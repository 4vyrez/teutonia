import { publicEnv } from '@/lib/env';

export const siteConfig = {
  name: 'KB! Teutonia',
  shortName: 'Teutonia',
  longName: 'Karlsruher Burschenschaft Teutonia',
  description:
    'Lerngemeinschaft, Wohnen, Netzwerk in Karlsruhe. 20 möblierte Zimmer ab 280 € — direkt am KIT. Seit 1843.',
  tagline: 'Mehr als ein Zimmer. Eine Lerngemeinschaft seit 1843.',
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  appUrl: publicEnv.NEXT_PUBLIC_APP_URL,
  locale: 'de_DE',
  language: 'de',
  founded: '1843-10-10',
  address: {
    street: 'Parkstraße 1',
    postalCode: '76131',
    city: 'Karlsruhe',
    country: 'DE',
    full: 'Parkstraße 1, 76131 Karlsruhe',
  },
  geo: {
    latitude: 49.0125,
    longitude: 8.4124,
  },
  contact: {
    phone: '+49 721 66777348',
    phoneDisplay: '0721 66 777 348',
    emails: {
      zimmer: 'zimmer@kbteutonia.de',
      sprecher: 'x@kbteutonia.de',
      schriftwart: 'xx@kbteutonia.de',
      veranstaltung: 'xxx@kbteutonia.de',
      fuxmajor: 'fm@kbteutonia.de',
      aktivenkasse: 'ak@kbteutonia.de',
      hauptkasse: 'hk@kbteutonia.de',
      admin: 'admin@kbteutonia.de',
    },
  },
  social: {
    facebook: 'https://www.facebook.com/KB.Teutonia/',
    instagram: 'https://www.instagram.com/teutoniakarlsruhe/',
  },
  facts: {
    rooms: 20,
    roomSizeSqm: 17,
    rentEur: 280,
    walkUniMin: 5,
    walkInfoBibMin: 2,
    walkUniBibMin: 7,
    walkTramMin: 5,
    tramLines: '4 / 5',
  },
  navigation: [
    { label: 'Das Haus', href: '#haus' },
    { label: 'Gemeinschaft', href: '#saeulen' },
    { label: 'Lage', href: '#lage' },
    { label: 'Mitgliedschaft', href: '#mitgliedschaft' },
    { label: 'Programm', href: '#semester' },
    { label: 'Geschichte', href: '#geschichte' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
