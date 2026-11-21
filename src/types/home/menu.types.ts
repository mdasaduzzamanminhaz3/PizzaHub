export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  location: string;
  vendorId: string;
  status?: string;
  isActive?: boolean;
  isFeatured: boolean;
  description: string;
  image: string;
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