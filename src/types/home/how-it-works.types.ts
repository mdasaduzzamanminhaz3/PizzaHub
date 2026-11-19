export interface HowItWorksStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface HowItWorksSectionProps {
  eyebrow?: string;
  heading?: string;
  steps?: HowItWorksStep[];
}