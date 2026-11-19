export type WhyChooseIconName = 'flame' | 'clock' | 'award' | 'truck';

export interface WhyChooseFeature {
  id: string;
  icon: WhyChooseIconName;
  title: string;
  description: string;
}

export interface WhyChooseSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: WhyChooseFeature[];
}