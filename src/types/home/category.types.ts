export interface PizzaCategory {
  id: string;
  name: string;
  itemCount: number;
  href?: string;
}

export interface CategorySectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  categories?: PizzaCategory[];
  onSelectCategory?: (categoryId: string) => void;
}