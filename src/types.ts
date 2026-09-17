export type TabType = 'inicio' | 'catalogo' | 'nosotros' | 'cotizar' | 'admin';

export interface ProductSystem {
  id: string;
  category: 'ventanas' | 'puertas' | 'portones' | 'divisiones';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  categoryNumber?: string;
  specs: {
    label: string;
    value: string;
  }[];
  features?: string[];
  ctaText?: string;
}

export interface FeaturedLine {
  id: string;
  number: string;
  title: string;
  categoryTag: string;
  description: string;
  image: string;
  linkText: string;
  targetCategory: 'ventanas' | 'puertas' | 'portones' | 'divisiones';
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroBadge: string;
  phone: string;
  email: string;
  experienceYears: number;
  featuredLines: FeaturedLine[];
}

export interface QuoteFormData {
  name: string;
  phone: string;
  productType: string;
  dimensions: string;
  message: string;
  glassType?: string;
  profileColor?: string;
  estimatedArea?: number;
}
