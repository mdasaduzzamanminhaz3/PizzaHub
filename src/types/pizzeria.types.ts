export interface PartnerPizzeria {
  id: string;
  name: string;
  location: string;
  rating: number;
  activeMenuCount: number;
  avatarUrl: string;
  avatarAlt: string;
  isPremium?: boolean;
  specialtyTag?: string;
  href?: string;
}

export interface PartnerPizzeriaCardProps {
  pizzeria: PartnerPizzeria;
}

export interface PartnerPizzeriasSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  pizzerias?: PartnerPizzeria[];
}