import React from 'react';
import { SiteContent, TabType } from '../../types';
import { 
  ArrowRight, 
  FileText, 
  ChevronDown, 
  Compass, 
  Sparkles, 
  Send, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Building2 
} from 'lucide-react';

interface HomeViewProps {
  content: SiteContent;
  onSelectTab: (tab: TabType) => void;
  onFilterCategory?: (cat: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  content,
  onSelectTab,
  onFilterCategory,
}) => {
  const scrollToTrajectory = () => {
    document.getElementById('trayectoria-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLineClick = (targetCategory: string) => {
    if (onFilterCategory) {
      onFilterCategory(targetCategory);
    }
    onSelectTab('catalogo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 lg:space-y-20 pb-12">
      {/* HERO SECTION */}
      <section className="relative pt-4 sm:pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Hero Container: 2-column on desktop for optimal proportions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & Call to actions */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dbeafe] text-[#1e3a8a] text-xs font-bold font-heading tracking-wide uppercase">
                <Compass className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Fábrica · Instalación · A Medida</span>
              </div>

              {/* Title with italic emphasis */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00236f] tracking-tight font-heading leading-tight">
                Aluminio y vidrio <span className="font-serif italic font-normal text-[#1e40af]">a la medida</span> del proyecto
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
                {content.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  id="hero-catalog-button"
                  onClick={() => {
                    onSelectTab('catalogo');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#00236f] hover:bg-[#1e3a8a] text-white rounded-lg font-heading font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <span>Ver catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-quote-button"
                  onClick={() => {
                    onSelectTab('cotizar');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#eff6ff] hover:bg-[#dbeafe] border border-[#bfdbfe] text-[#00236f] rounded-lg font-heading font-semibold text-sm sm:text-base transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#1e40af]" />
                  <span>Cotizar</span>
                </button>
              </div>

              {/* Micro highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e2e8f0]">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#334155] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Perfiles alta resistencia</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#334155] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Vidrio de seguridad templado</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card (Matching screenshots with badges) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#cbd5e1] group bg-slate-900">
                {/* 16:9 Image container */}
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden relative">
                  <img
                    src={content.heroImage}
                    alt="Ventanas y fachadas de aluminio y vidrio"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle architectural gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-heading font-bold border border-white/20 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>{content.heroBadge}</span>
                    </div>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <p className="text-[10px] tracking-widest uppercase font-heading font-bold text-blue-300">
                      INGENIERÍA ESTRUCTURAL
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white font-heading tracking-tight drop-shadow-sm">
                      Calibre Europeo & Sellado Térmico
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile "Desliza para conocer más" indicator */}
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={scrollToTrajectory}
                  className="flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-[#64748b] hover:text-[#00236f] transition-colors py-2 px-4 rounded-full hover:bg-slate-100"
                >
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                  <span>Desliza para conocer más</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: NUESTRA TRAYECTORIA */}
      <section id="trayectoria-section" className="py-8 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#e0f2fe] text-[#0369a1] text-xs font-bold font-heading uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Nuestra Trayectoria</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] font-heading tracking-tight">
              <span className="text-[#1e40af]">{content.experienceYears} años</span> fabricando confianza
            </h2>
            <p className="text-sm sm:text-base text-[#475569] max-w-3xl leading-relaxed">
              Desde cada taller hasta el control final de calidad, cuidamos cada detalle en la fabricación y la instalación de tus ventanas, puertas, portones y divisiones.
            </p>
          </div>

          {/* Feature Cards Grid (Medida Milimétrica & Instalación Limpia) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Medida Milimétrica */}
            <div className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#93c5fd] hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#dbeafe] text-[#1e40af] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wider text-[#64748b] uppercase font-heading">
                  Ajuste Técnico
                </p>
                <h3 className="text-lg font-bold text-[#00236f] font-heading">
                  Medida Milimétrica
                </h3>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">
                Cortes de perfilería con precisión digital que garantizan acoples herméticos y sin filtraciones de viento o agua.
              </p>
            </div>

            {/* Card 2: Instalación Limpia */}
            <div className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#93c5fd] hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#dcfce7] text-[#15803d] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wider text-[#64748b] uppercase font-heading">
                  Garantía
                </p>
                <h3 className="text-lg font-bold text-[#00236f] font-heading">
                  Instalación Limpia
                </h3>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">
                Personal técnico especializado que respeta tu obra, protegiendo pisos, acabados y dejando el área impecable.
              </p>
            </div>
          </div>

          {/* CTA Link Conócenos */}
          <div className="pt-2 text-left">
            <button
              onClick={() => {
                onSelectTab('nosotros');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#00236f] hover:text-[#1e40af] font-heading group"
            >
              <span>Conócenos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: LO QUE FABRICAMOS (4 LÍNEAS DE TRABAJO) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#dbeafe] text-[#1e40af] text-xs font-bold font-heading uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#1e40af]"></span>
            <span>Líneas Especializadas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] font-heading tracking-tight">
            Lo que <span className="font-serif italic font-normal text-[#1e40af]">fabricamos</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">
            Cuatro líneas de trabajo y una sola obsesión: medidas exactas, instalación limpia y acabados que duren.
          </p>
        </div>

        {/* 4 Cards Grid - 2 cols on tablet, 2 or 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {content.featuredLines.map((line) => (
            <div
              key={line.id}
              className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-md hover:border-[#93c5fd] transition-all flex flex-col group"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={line.image}
                  alt={line.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/85 text-white font-mono text-xs font-bold px-2 py-0.5 rounded shadow">
                  {line.number}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <p className="text-[11px] font-bold tracking-wider text-[#64748b] uppercase font-heading">
                    {line.categoryTag}
                  </p>
                  <h3 className="text-xl font-bold text-[#00236f] font-heading">
                    {line.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {line.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleLineClick(line.targetCategory)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00236f] hover:text-[#1e40af] font-heading group/btn"
                  >
                    <span>{line.linkText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: CTA BANNER (¿Listo para tu proyecto? Recibimos tu cotización.) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#00236f] text-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden text-center sm:text-left">
          {/* Subtle architectural decorative lines */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 border border-blue-400/20 rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 -mb-12 w-48 h-48 border border-blue-400/10 rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-[#93c5fd] uppercase font-heading">
              Atención Personalizada
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              ¿Listo para tu proyecto? <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-blue-200">
                Recibimos tu cotización.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
              Medidas, obras y proyectos residenciales, comerciales y empresariales.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
              <button
                id="cta-cotizar-ahora-button"
                onClick={() => {
                  onSelectTab('cotizar');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-[#00236f] hover:bg-blue-50 rounded-lg font-heading font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.99]"
              >
                <Send className="w-4 h-4 text-[#00236f]" />
                <span>Cotizar ahora</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-blue-200 font-medium">
                <Clock className="w-4 h-4 text-blue-300" />
                <span>Respuesta técnica en menos de 24 horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
