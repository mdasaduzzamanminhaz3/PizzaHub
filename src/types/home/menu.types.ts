export interface MenuItem {
  id: string;
  title: string;
  category: string;
  isPremium?: boolean;
  price: number;
  description: string;
  kitchenName: string;
  location: string;
  imageUrl: string;
  href?: string;
}

export interface MenuItemCardProps {
  item: MenuItem;
}

export interface FeaturedMenuProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  items?: MenuItem[];
}