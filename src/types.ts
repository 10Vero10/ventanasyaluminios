export type TabType = 'inicio' | 'catalogo' | 'nosotros' | 'cotizar' | 'admin';

export type ProductCategory = 'ventanas' | 'puertas' | 'portones' | 'divisiones';

export interface ProductSystem {
  id: string;
  category: ProductCategory;
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
  targetCategory: ProductCategory;
}

export interface GalleryImage {
  id: string;
  title: string;
  url: string;
}

export interface AboutContent {
  paragraph1: string;
  paragraph2: string;
  highlightText: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroBadge: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  experienceYears: number;
  adminPin: string;
  quotingEnabled: boolean;
  featuredLines: FeaturedLine[];
  heroGallery: GalleryImage[];
  about: AboutContent;
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