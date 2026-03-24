export interface SiteLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavigationItem extends SiteLink {
  children?: SiteLink[];
}

export interface HeroAction extends SiteLink {
  variant?: 'primary' | 'secondary';
}

export interface Metric {
  value: string;
  label: string;
  detail?: string;
}

export interface ValueCard {
  title: string;
  description: string;
  detail?: string;
}

export interface PillarCard {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface HighlightCard {
  title: string;
  description: string;
}

export interface DetailBlock {
  title: string;
  body: string;
  bullets?: string[];
  aside?: string;
}

export interface PublicPageContent {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  stats: Metric[];
  highlights: HighlightCard[];
  detailBlocks: DetailBlock[];
  quote: {
    text: string;
    attribution: string;
  };
  cta: {
    title: string;
    description: string;
    primary: SiteLink;
    secondary: SiteLink;
  };
}

export interface HouseSceneAsset {
  kind: 'image' | 'glb';
  src: string;
  poster?: string;
  alt: string;
}

export interface HouseMedia {
  src: string;
  alt: string;
}

export interface HouseFact {
  label: string;
  value: string;
}

export interface HouseRoom {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  description: string;
  highlights: string[];
  facts: HouseFact[];
  media: HouseMedia[];
}

export interface StagePosition {
  x: number;
  y: number;
}

export interface HouseHotspot {
  id: string;
  label: string;
  teaser: string;
  roomId: string;
  cta: string;
  mobileOrder: number;
  stagePosition: StagePosition;
}
