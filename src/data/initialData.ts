import { SiteContent, ProductSystem, GalleryImage, AboutContent } from '../types';

export const INITIAL_HERO_GALLERY: GalleryImage[] = [
  {
    id: 'g-1',
    title: 'Fachada Minimalista Cristales Altos',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'g-2',
    title: 'Ventanal Panorámico Sala Europea',
    url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'g-3',
    title: 'Puerta Monumental & Aluminio Negro',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'g-4',
    title: 'Oficina Cristal Templado & Fachada',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'g-5',
    title: 'Taller de Carpintería y Ensamble',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
  },
];

export const INITIAL_ABOUT_CONTENT: AboutContent = {
  paragraph1:
    'Somos una empresa especializada en la fabricación e instalación de soluciones en vidrio, aluminio y otros materiales, con más de 25 años de experiencia en el sector.',
  paragraph2:
    'Durante todos estos años hemos trabajado para brindar a nuestros clientes productos de alta calidad, excelentes acabados y soluciones adaptadas a sus necesidades, cuidando cada detalle desde la fabricación hasta la instalación.',
  highlightText:
    'Contamos con un equipo de trabajo comprometido y con amplia experiencia, preparado para desarrollar proyectos residenciales, comerciales y empresariales.',
};

export const INITIAL_SITE_CONTENT: SiteContent = {
  heroTitle: 'Aluminio y vidrio a la medida del proyecto',
  heroSubtitle: 'Fabricamos e instalamos ventanas, puertas, portones y divisiones, con más de 25 años de experiencia y acabados de excelencia.',
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  heroBadge: 'VIDRIO TEMPLADO & ALUMINIO · Sistemas 2025',
  phone: '+57 317 846 3260',
  email: 'ventanaluminio@hotmail.com',
  whatsappNumber: '573178463260',
  experienceYears: 25,
  adminPin: '1234',
  quotingEnabled: true,
  featuredLines: [
    {
      id: 'feat-1',
      number: '01',
      title: 'Ventanas',
      categoryTag: 'SISTEMAS ACÚSTICOS & TÉRMICOS',
      description: 'Corredizas y batientes en aluminio, con vidrio sencillo, doble o templado.',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
      linkText: 'Ver productos',
      targetCategory: 'ventanas',
    },
    {
      id: 'feat-2',
      number: '02',
      title: 'Puertas',
      categoryTag: 'SEGURIDAD & ACCESO RESIDENCIAL',
      description: 'De aluminio, vidrio y PVC, para interiores, exteriores y proyectos comerciales.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      linkText: 'Ver productos',
      targetCategory: 'puertas',
    },
    {
      id: 'feat-3',
      number: '03',
      title: 'Portones',
      categoryTag: 'SISTEMAS AUTOMÁTICOS & MANUALES',
      description: 'Instalación de portones tipo americano, robustos y de operación confiable.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      linkText: 'Ver productos',
      targetCategory: 'portones',
    },
    {
      id: 'feat-4',
      number: '04',
      title: 'Divisiones',
      categoryTag: 'ESPACIOS INTERIORES & BAÑOS',
      description: 'En vidrio templado y acrílico para baños y oficinas, fabricadas a la medida exacta.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      linkText: 'Ver productos',
      targetCategory: 'divisiones',
    },
  ],
  heroGallery: INITIAL_HERO_GALLERY,
  about: INITIAL_ABOUT_CONTENT,
};

export const PRODUCT_SYSTEMS: ProductSystem[] = [
  // Ventanas
  {
    id: 'v-corredizas',
    category: 'ventanas',
    categoryNumber: '01',
    title: 'Corredizas',
    subtitle: 'Línea Panorámica',
    description: 'Ideal para espacios amplios: aperturas suaves, buena ventilación y máxima luz natural.',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
    badge: '4 Obras instaladas',
    specs: [
      { label: 'Hojas', value: '2, 3 o 4 hojas deslizantes' },
      { label: 'Hermeticidad', value: 'Felpa siliconada perimetral' },
      { label: 'Vidrios compatibles', value: 'Sencillo, doble, templado' },
    ],
    features: ['Rodamientos de alta precisión en acero inox', 'Felpa siliconada cortaviento', 'Seguro embutido multipunto'],
    ctaText: 'Ver galería / Solicitar muestra',
  },
  {
    id: 'v-batientes',
    category: 'ventanas',
    categoryNumber: '01',
    title: 'Batientes',
    subtitle: 'Apertura 90° con freno',
    description: 'Hojas abatibles con sellado hermético. Un clásico funcional para hogares y oficinas con aislamiento termoacústico.',
    image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1200&q=80',
    badge: 'Apertura 90° con freno',
    specs: [
      { label: 'Aislamiento', value: 'Acústico superior' },
      { label: 'Cierre', value: 'Punto múltiple hermético' },
      { label: 'Perfilería', value: 'Aluminio extruido calibre pesado' },
    ],
    features: ['Brazos de fricción telescópicos', 'Sellado perimetral con empaque EPDM', 'Manija ergonómica europea'],
    ctaText: 'Cotizar sistema batiente',
  },

  // Puertas
  {
    id: 'p-aluminio',
    category: 'puertas',
    categoryNumber: '02',
    title: 'Aluminio',
    subtitle: 'Línea Pesada & Fachadas',
    description: 'Resistentes a la intemperie y de bajo mantenimiento, para interiores y exteriores residenciales y comerciales.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Línea Pesada',
    specs: [
      { label: 'Resistencia', value: 'Resistente a Corrosión y Salitre' },
      { label: 'Seguridad', value: 'Cerraduras de seguridad multipunto' },
      { label: 'Bisagras', value: 'Pivote reforzado oculto' },
    ],
    features: ['Perfil estructural serie 80', 'Cerradura de alta seguridad', 'Acabados anodizados o pintura electrostática'],
    ctaText: 'Cotizar puerta de aluminio',
  },
  {
    id: 'p-vidrio',
    category: 'puertas',
    categoryNumber: '02',
    title: 'Vidrio',
    subtitle: 'Templado Monumental & Pivote',
    description: 'Puertas de vidrio templado, elegantes y seguras, para interiores de oficina y entradas principales de diseño arquitectónico.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    badge: 'Templado 8mm - 12mm',
    specs: [
      { label: 'Cristal', value: 'Templado 8mm - 12mm de seguridad' },
      { label: 'Mecanismo', value: 'Pivotes hidráulicos de piso' },
      { label: 'Acabados', value: 'Vidrio Grabado, Satinado o Claro' },
    ],
    features: ['Cajas hidráulicas embutidas al piso', 'Tiradores arquitectónicos en acero inoxidable', 'Freno a 90° con retorno controlado'],
    ctaText: 'Cotizar puerta de vidrio templado',
  },
  {
    id: 'p-pvc',
    category: 'puertas',
    categoryNumber: '02',
    title: 'PVC & Termoacústicas',
    subtitle: 'Máximo Aislamiento',
    description: 'Buen aislamiento térmico y acústico para hogares, oficinas y espacios comerciales que requieren confort climático total.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    badge: 'Aislamiento Térmico',
    specs: [
      { label: 'Clima', value: 'Cero condensación y sellado total' },
      { label: 'Cierres', value: 'Cierres herméticos perimetrales' },
      { label: 'Refuerzo', value: 'Alma interior de acero galvanizado' },
    ],
    features: ['Perfiles multicámara europeos', 'Vidrio laminado acústico o termopanel', 'Ahorro de energía en climatización'],
    ctaText: 'Cotizar puerta termoacústica',
  },

  // Portones
  {
    id: 'pt-americano',
    category: 'portones',
    categoryNumber: '03',
    title: 'Instalación · Americanos',
    subtitle: 'Robustez & Automatización',
    description: 'Instalación de portones tipo americano: robustos, duraderos y con herrajes confiables para residencias y empresas.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    badge: 'Herrajes de alta resistencia',
    specs: [
      { label: 'Accionamiento', value: 'Accionamiento suave con motor silencioso' },
      { label: 'Seguridad', value: 'Seguridad reforzada con bloqueo automático' },
      { label: 'Estructura', value: 'Paneles térmicos inyectados de poliuretano' },
    ],
    features: ['Control remoto y apertura por app', 'Sensores de reversa infrarrojos', 'Resortes de torsión de alto ciclo'],
    ctaText: 'Cotizar portón seccional',
  },

  // Divisiones
  {
    id: 'd-templado',
    category: 'divisiones',
    categoryNumber: '04',
    title: 'Vidrio Templado',
    subtitle: 'Baños Master & Oficinas',
    description: 'Separadores elegantes, luminosos y seguros, fabricados a la medida de tu espacio con herrajes en acero inoxidable.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Espesor 8mm a 10mm',
    specs: [
      { label: 'Aplicación', value: 'Para baños master & oficinas' },
      { label: 'Espesor', value: 'Cristal templado 8mm a 10mm' },
      { label: 'Herrajes', value: 'Acero inoxidable 304 anti-sarro' },
    ],
    features: ['Sellado magnético anti-fugas de agua', 'Tratamiento hidrófugo fácil limpieza', 'Cortes y perforaciones exactas por láser'],
    ctaText: 'Cotizar división en vidrio templado',
  },
  {
    id: 'd-acrilico',
    category: 'divisiones',
    categoryNumber: '04',
    title: 'Acrílico & Policarbonato',
    subtitle: 'Económicas y Resistentes',
    description: 'Divisiones livianas, económicas y resistentes al agua, perfectas para baños familiares y áreas de alto tránsito.',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    badge: 'Antigolpes y Ligero',
    specs: [
      { label: 'Acabados', value: 'Diseños lisos, gota de agua y texturizados' },
      { label: 'Ventajas', value: 'Antigolpes y peso ultra-ligero' },
      { label: 'Marco', value: 'Aluminio anodizado blanco, natural o negro' },
    ],
    features: ['Perfilería de aluminio de rápida instalación', 'Placas resistentes a la humedad constante', 'Económico y duradero'],
    ctaText: 'Cotizar división en acrílico',
  },
];

export function createId(prefix = 'item'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function normalizeSiteContent(saved: any): SiteContent {
  const base = INITIAL_SITE_CONTENT;
  const merged: SiteContent = { ...base, ...(saved || {}) };
  merged.about = { ...INITIAL_ABOUT_CONTENT, ...(saved?.about || {}) };
  merged.featuredLines = Array.isArray(saved?.featuredLines) ? saved.featuredLines : base.featuredLines;
  merged.heroGallery = Array.isArray(saved?.heroGallery) ? saved.heroGallery : base.heroGallery;
  merged.quotingEnabled = saved?.quotingEnabled !== false;
  merged.adminPin = merged.adminPin || '1234';
  merged.whatsappNumber = merged.whatsappNumber || merged.phone.replace(/[^\d]/g, '');
  return merged;
}

export function normalizeProducts(saved: any): ProductSystem[] {
  if (!Array.isArray(saved) || saved.length === 0) return PRODUCT_SYSTEMS;
  return saved;
}