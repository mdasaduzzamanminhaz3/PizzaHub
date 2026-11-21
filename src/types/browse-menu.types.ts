import { MenuItem } from "./home/menu.types";

export interface BrowseMenuProps {
  heading?: string;
  subheading?: string;
  items?: MenuItem[];
  categories?: string[];
  locations?: string[];
}

