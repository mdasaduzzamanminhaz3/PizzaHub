export interface HeroAction {
  label: string;
  href: string;
}

export interface FeaturedKitchen {
  label: string;
  name: string;
  rating: number;
  bakeTemp: string;
  imageUrl: string;
  imageAlt: string;
}

export interface HeroProps {
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  features?: string[];
  featuredKitchen?: FeaturedKitchen;
}