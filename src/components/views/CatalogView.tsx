import React, { useState } from 'react';
import { ProductSystem, TabType } from '../../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Gauge, 
  X, 
  Send 
} from 'lucide-react';

interface CatalogViewProps {
  products: ProductSystem[];
  onSelectTab: (tab: TabType) => void;
  initialFilter?: string;
  onSelectProductForQuote?: (productTitle: string, category: string) => void;
  quotingEnabled: boolean;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onSelectTab,
  initialFilter = 'todos',
  onSelectProductForQuote,
  quotingEnabled,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [activeModalProduct, setActiveModalProduct] = useState<ProductSystem | null>(null);

  const filterOptions = [
    { id: 'todos', label: 'Todos los Sistemas' },
    { id: 'ventanas', label: 'Ventanas' },
    { id: 'puertas', label: 'Puertas' },
    { id: 'portones', label: 'Portones' },
    { id: 'divisiones', label: 'Divisiones' },
  ];

  const filteredProducts = selectedFilter === 'todos'
    ? products
    : products.filter((p) => p.category === selectedFilter);

  const handleQuoteClick = (product: ProductSystem) => {
    if (onSelectProductForQuote) {
      onSelectProductForQuote(product.title, product.category);
    }
    onSelectTab('cotizar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dbeafe] text-[#1e3a8a] text-xs font-bold font-heading uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
          <span>Catálogo Arquitectónico</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00236f] font-heading tracking-tight">
          Cuatro líneas de trabajo con <span className="font-serif italic font-normal text-[#1e40af]">medida exacta</span>
        </h1>

        <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
          Cada producto se fabrica para la medida de tu obra. Explora nuestros sistemas, tipos y acabados diseñados para durabilidad estructural y elegancia.
        </p>

        {/* 3 Technical Badges matching screenshot 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#eff6ff] text-[#1e40af] flex items-center justify-center shrink-0">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase font-heading">
                Precisión
              </p>
              <p className="text-base font-bold text-[#00236f] font-heading">
                ± 1.0 mm
              </p>
              <p className="text-xs text-[#64748b]">Ajuste perimetral</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase font-heading">
                Acabados
              </p>
              <p className="text-base font-bold text-[#00236f] font-heading">
                Anodizado
              </p>
              <p className="text-xs text-[#64748b]">Y pintura electrostática</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase font-heading">
                Garantía
              </p>
              <p className="text-base font-bold text-[#00236f] font-heading">
                +25 Años
              </p>
              <p className="text-xs text-[#64748b]">De experiencia real</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="pt-6 border-b border-[#e2e8f0] overflow-x-auto">
          <div className="flex items-center gap-2 pb-2 min-w-max">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                id={`catalog-filter-${opt.id}`}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all ${
                  selectedFilter === opt.id
                    ? 'bg-[#00236f] text-white shadow-sm'
                    : 'bg-white border border-[#cbd5e1] text-[#475569] hover:bg-[#f1f5f9]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-md hover:border-[#93c5fd] transition-all flex flex-col justify-between text-left group"
            >
              <div>
                {/* Header of card with section tag */}
                <div className="p-4 sm:px-6 sm:pt-6 pb-2 flex items-center justify-between border-b border-[#f1f5f9]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#00236f] bg-[#e0e7ff] px-2 py-0.5 rounded">
                      {product.categoryNumber || '01'}
                    </span>
                    <span className="text-xs font-bold text-[#64748b] tracking-wider uppercase font-heading">
                      Galería de Trabajos
                    </span>
                  </div>
                  {product.badge && (
                    <span className="text-[11px] font-bold text-[#1e40af] bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div className="p-4 sm:px-6 pt-3 space-y-1">
                  <h3 className="text-2xl font-bold text-[#00236f] font-heading">
                    {product.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#0284c7] font-heading tracking-wide uppercase">
                    {product.subtitle}
                  </p>
                  <p className="text-sm text-[#475569] leading-relaxed pt-1">
                    {product.description}
                  </p>
                </div>

                {/* Product Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 my-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Technical Specs Box */}
                <div className="p-4 sm:px-6 space-y-2">
                  <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#e2e8f0] space-y-2">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="text-[#64748b] font-medium uppercase font-heading text-[10px]">
                          {spec.label}:
                        </span>
                        <span className="text-[#0f172a] font-semibold text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
                {quotingEnabled && (
                  <button
                    onClick={() => handleQuoteClick(product)}
                    className="flex-1 py-2.5 px-4 bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs sm:text-sm font-bold font-heading rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{product.ctaText || 'Cotizar este sistema'}</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="flex-1 py-2.5 px-4 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#00236f] text-xs sm:text-sm font-semibold font-heading rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Detalles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      {quotingEnabled && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#00236f] text-white rounded-xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-bold tracking-widest text-blue-200 uppercase font-heading">
              Fabricación Especializada
            </p>
            <h3 className="text-2xl font-bold font-heading">
              ¿Necesitas un sistema específico? <span className="font-serif italic font-normal text-blue-200">Te asesoramos.</span>
            </h3>
            <p className="text-sm text-blue-100">
              Contanos el espacio y las medidas, y te recomendamos el producto y calibre indicado.
            </p>
          </div>
          <button
            onClick={() => {
              onSelectTab('cotizar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white text-[#00236f] hover:bg-blue-50 font-heading font-bold text-sm rounded-lg shadow transition shrink-0"
          >
            Cotizar ahora
          </button>
        </div>
        </section>
      )}

      {/* Product Spec Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6 relative text-left">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-heading uppercase">
                {activeModalProduct.category}
              </span>
              <h2 className="text-2xl font-bold text-[#00236f] font-heading">
                {activeModalProduct.title} - {activeModalProduct.subtitle}
              </h2>
              <p className="text-sm text-slate-600">
                {activeModalProduct.description}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden aspect-[16/9] border border-slate-200">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#00236f] font-heading uppercase tracking-wider">
                Ficha Técnica & Características
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModalProduct.specs.map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-500 block">{s.label}:</span>
                    <span className="font-bold text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>

              {activeModalProduct.features && (
                <div className="pt-2">
                  <h5 className="text-xs font-bold text-slate-700 uppercase mb-2">Ventajas del Sistema:</h5>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeModalProduct.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 flex gap-3">
              {quotingEnabled && (
                <button
                  onClick={() => {
                    const prod = activeModalProduct;
                    setActiveModalProduct(null);
                    handleQuoteClick(prod);
                  }}
                  className="flex-1 py-3 px-4 bg-[#00236f] hover:bg-[#1e3a8a] text-white font-heading font-bold text-sm rounded-lg transition text-center shadow"
                >
                  Solicitar Cotización de este Sistema
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
