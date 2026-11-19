export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterSocialItem {
  id: string;
  label: string;
  shortCode: string;
  href: string;
}

export interface FooterContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface FooterProps {
  brandName?: string;
  brandHighlight?: string;
  tagline?: string;
  socials?: FooterSocialItem[];
  exploreLinks?: FooterLinkItem[];
  companyLinks?: FooterLinkItem[];
  contact?: FooterContactInfo;
  copyrightText?: string;
  bottomLinks?: FooterLinkItem[];
}