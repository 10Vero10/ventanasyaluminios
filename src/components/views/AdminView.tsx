import React, { useState } from 'react';
import { SiteContent, TabType, FeaturedLine } from '../../types';
import { 
  CheckCircle2, 
  ExternalLink, 
  Key, 
  LogOut, 
  Upload, 
  RotateCcw, 
  Trash2, 
  Edit3, 
  Save, 
  GripVertical, 
  Sliders, 
  Image as ImageIcon,
  Check,
  Sparkles
} from 'lucide-react';

interface AdminViewProps {
  content: SiteContent;
  onUpdateContent: (newContent: SiteContent) => void;
  onSelectTab: (tab: TabType) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  content,
  onUpdateContent,
  onSelectTab,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'inicio' | 'catalogo' | 'nosotros'>('inicio');

  // Form states initialized with content
  const [title, setTitle] = useState(content.heroTitle);
  const [subtitle, setSubtitle] = useState(content.heroSubtitle);
  const [heroImage, setHeroImage] = useState(content.heroImage);
  const [heroBadge, setHeroBadge] = useState(content.heroBadge);
  const [featuredLines, setFeaturedLines] = useState<FeaturedLine[]>(content.featuredLines);

  const [lastSaved, setLastSaved] = useState<string>('11:42 AM');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  // Preset architectural photography for quick hero swap
  const heroPresets = [
    {
      title: 'Fachada Minimalista Cristales Altos',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Ventanal Panorámico Sala Europea',
      url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Puerta Monumental & Aluminio Negro',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Oficina Cristal Templado & Fachada',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  const handleSaveAll = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updated: SiteContent = {
      ...content,
      heroTitle: title,
      heroSubtitle: subtitle,
      heroImage: heroImage,
      heroBadge: heroBadge,
      featuredLines: featuredLines,
    };

    onUpdateContent(updated);
    setLastSaved(formattedTime);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleUpdateFeaturedLine = (id: string, updatedFields: Partial<FeaturedLine>) => {
    setFeaturedLines((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Admin Status & Action Bar matching screenshot 6 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 text-left space-y-6">
        {/* Status badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00236f] text-white text-xs font-bold font-heading uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
              Panel de Control
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold font-heading uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
              Vercel Conectado
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectTab('inicio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-white border border-[#cbd5e1] hover:bg-slate-50 text-[#00236f] rounded-lg text-xs font-heading font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Sitio</span>
            </button>

            <button
              onClick={() => alert('Modo administrativo activo. Configuración segura de endpoints.')}
              className="px-3 py-1.5 bg-white border border-[#cbd5e1] hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-heading font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>Clave</span>
            </button>

            <button
              onClick={() => onSelectTab('inicio')}
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
              title="Salir del Panel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Metric Cards matching screenshot 6 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#e2e8f0] shadow-xs">
            <p className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase font-heading">
              Imágenes Activas
            </p>
            <p className="text-2xl font-black text-[#00236f] font-heading mt-1">
              18 <span className="text-sm font-normal text-slate-400">/ 32</span>
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#e2e8f0] shadow-xs">
            <p className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase font-heading">
              Último Guardado
            </p>
            <p className="text-2xl font-black text-[#00236f] font-heading mt-1">
              {lastSaved}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
            <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-heading">
              Build Vercel
            </p>
            <div className="flex items-center gap-1.5 text-emerald-700 font-heading font-bold text-lg mt-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Deploy Listo</span>
            </div>
          </div>
        </div>

        {/* Section Tabs matching screenshot 6: Inicio, Catálogo, Quiénes Somos */}
        <div className="flex items-center gap-2 border-b border-[#e2e8f0] pt-2">
          {[
            { id: 'inicio', label: 'Inicio' },
            { id: 'catalogo', label: 'Catálogo' },
            { id: 'nosotros', label: 'Quiénes Somos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-6 py-2.5 text-xs sm:text-sm font-heading font-bold transition-all border-b-2 ${
                activeAdminTab === tab.id
                  ? 'border-[#00236f] text-[#00236f]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION: HERO PRINCIPAL & SLOGAN */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#eff6ff] text-[#00236f]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#00236f] font-heading">
                  Hero Principal & Slogan
                </h3>
                <p className="text-xs text-slate-500">
                  Edita los textos que ven los usuarios al ingresar al sitio
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold uppercase text-[#1e40af] bg-[#eff6ff] px-2.5 py-1 rounded">
              Sección Principal
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
                Título de Portada
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-sm text-[#0f172a] bg-[#f8fafc] focus:border-[#00236f] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
                Subtítulo / Bajada
              </label>
              <textarea
                rows={3}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-sm text-[#0f172a] bg-[#f8fafc] focus:border-[#00236f] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
                Badge del Banner Superior
              </label>
              <input
                type="text"
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-sm text-[#0f172a] bg-[#f8fafc] focus:border-[#00236f] outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION: CARGA DE IMAGEN HERO (SLIDER) */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#00236f] font-heading">
                Carga de Imagen Hero (Slider)
              </h3>
              <p className="text-xs text-slate-500">
                Optimizado para resoluciones 16:9 de alto impacto visual
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              Máx. 3 MB (WebP, JPG)
            </span>
          </div>

          {/* Drag & Drop Visual Area */}
          <div className="p-8 border-2 border-dashed border-[#93c5fd] rounded-2xl bg-[#f8fbff] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#dbeafe] text-[#1e40af] flex items-center justify-center mx-auto shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#00236f] font-heading">
                Arrastra tu fotografía aquí o pulsa para explorar
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Formato 16:9 optimizado automáticamente para Vercel
              </p>
            </div>

            {/* Presets selector */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                O selecciona una fotografía arquitectónica de alta resolución:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {heroPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroImage(preset.url)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition ${
                      heroImage === preset.url
                        ? 'bg-[#00236f] text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Previsualización de corte (16:9) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 font-heading uppercase">
              <span>Previsualización de Corte (16:9)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHeroImage(content.heroImage)}
                  className="p-1 hover:text-[#00236f] transition"
                  title="Restablecer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroImage(heroPresets[0].url)}
                  className="p-1 hover:text-rose-600 transition"
                  title="Limpiar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-sm">
              <img
                src={heroImage}
                alt="Previsualización hero"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 text-white text-[11px] font-mono px-3 py-1.5 rounded flex items-center justify-between">
                <span>hero-fachada-aluminio.webp · 1.4 MB</span>
                <span className="text-emerald-400 font-bold">1920 × 1080</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: 4 TARJETAS DE LÍNEA DESTACADA (DRAG / EDIT) */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#00236f] font-heading">
                4 Tarjetas de Línea Destacada
              </h3>
              <p className="text-xs text-slate-500">
                Reorganiza o actualiza los textos de cada línea de fabricación
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#1e40af] uppercase">
              Drag para reordenar
            </span>
          </div>

          <div className="space-y-3">
            {featuredLines.map((line) => {
              const isEditing = editingCardId === line.id;
              return (
                <div
                  key={line.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <GripVertical className="w-5 h-5 text-slate-400 cursor-grab shrink-0" />
                    
                    {/* Thumbnail preview */}
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <img
                        src={line.image}
                        alt={line.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {isEditing ? (
                      <div className="space-y-1.5 flex-1">
                        <input
                          type="text"
                          value={line.title}
                          onChange={(e) =>
                            handleUpdateFeaturedLine(line.id, { title: e.target.value })
                          }
                          className="px-2 py-1 text-xs border rounded w-full bg-white font-bold"
                        />
                        <input
                          type="text"
                          value={line.categoryTag}
                          onChange={(e) =>
                            handleUpdateFeaturedLine(line.id, { categoryTag: e.target.value })
                          }
                          className="px-2 py-1 text-[11px] border rounded w-full bg-white text-slate-600"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#00236f]">
                            {line.number}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 font-heading">
                            {line.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
                          {line.categoryTag} · {line.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setEditingCardId(isEditing ? null : line.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
                        isEditing
                          ? 'bg-[#00236f] text-white border-[#00236f]'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                      <span>{isEditing ? 'Listo' : 'Editar'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Save Button */}
        <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00236f]" />
            <div>
              <p className="text-xs font-bold text-[#00236f] font-heading">
                Cambios listos para aplicar
              </p>
              <p className="text-[11px] text-slate-500">
                Se actualizarán inmediatamente en la web en vivo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                ¡Guardado con éxito!
              </span>
            )}
            <button
              id="admin-save-all-button"
              type="button"
              onClick={handleSaveAll}
              className="py-2.5 px-6 bg-[#00236f] hover:bg-[#1e3a8a] text-white font-heading font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar y Publicar</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
