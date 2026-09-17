import React, { useState } from 'react';
import { SiteContent, TabType, FeaturedLine, GalleryImage, ProductSystem, ProductCategory } from '../../types';
import {
  CheckCircle2,
  ExternalLink,
  LogOut,
  Upload,
  RotateCcw,
  Trash2,
  Edit3,
  Save,
  GripVertical,
  Image as ImageIcon,
  Check,
  Sparkles,
  Plus,
  ChevronUp,
  ChevronDown,
  Key,
  Clock,
  Sliders,
  Layers,
} from 'lucide-react';
import { createId } from '../../data/initialData';
import { ImageInput } from '../admin/ImageInput';
import { CatalogAdmin } from '../admin/CatalogAdmin';

interface AdminViewProps {
  content: SiteContent;
  products: ProductSystem[];
  onUpdateContent: (newContent: SiteContent) => void;
  onUpdateProducts: (newProducts: ProductSystem[]) => void;
  onSelectTab: (tab: TabType) => void;
}

type AdminTab = 'inicio' | 'catalogo' | 'nosotros' | 'config';

const featuredCategories: ProductCategory[] = ['ventanas', 'puertas', 'portones', 'divisiones'];

export const AdminView: React.FC<AdminViewProps> = ({
  content,
  products,
  onUpdateContent,
  onUpdateProducts,
  onSelectTab,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('inicio');

  // Hero drafts
  const [title, setTitle] = useState(content.heroTitle);
  const [subtitle, setSubtitle] = useState(content.heroSubtitle);
  const [heroImage, setHeroImage] = useState(content.heroImage);
  const [heroBadge, setHeroBadge] = useState(content.heroBadge);

  // Featured lines drafts
  const [featuredLines, setFeaturedLines] = useState<FeaturedLine[]>(content.featuredLines);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  // Catalog draft
  const [productsDraft, setProductsDraft] = useState<ProductSystem[]>(products);

  // About draft
  const [experienceYears, setExperienceYears] = useState(content.experienceYears);
  const [paragraph1, setParagraph1] = useState(content.about.paragraph1);
  const [paragraph2, setParagraph2] = useState(content.about.paragraph2);
  const [highlightText, setHighlightText] = useState(content.about.highlightText);

  // Config drafts
  const [quotingEnabled, setQuotingEnabled] = useState(content.quotingEnabled);
  const [adminPin, setAdminPin] = useState(content.adminPin);

  // Gallery draft
  const [gallery, setGallery] = useState<GalleryImage[]>(content.heroGallery);
  const [addImageTitle, setAddImageTitle] = useState('');
  const [addImageUrl, setAddImageUrl] = useState('');

  const [lastSaved, setLastSaved] = useState<string>('—');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const moveFeaturedLine = (index: number, dir: -1 | 1) => {
    setFeaturedLines((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
  };

  const handleUpdateFeaturedLine = (id: string, updatedFields: Partial<FeaturedLine>) => {
    setFeaturedLines((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const handleAddGalleryImage = () => {
    if (!addImageUrl.trim()) return;
    const img: GalleryImage = {
      id: createId('img'),
      title: addImageTitle.trim() || 'Imagen',
      url: addImageUrl.trim(),
    };
    setGallery((prev) => [...prev, img]);
    setAddImageTitle('');
    setAddImageUrl('');
  };

  const handleGalleryFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAddImageUrl(String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveAll = () => {
    const now = new Date().toLocaleString([], {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated: SiteContent = {
      ...content,
      heroTitle: title,
      heroSubtitle: subtitle,
      heroImage,
      heroBadge,
      featuredLines,
      heroGallery: gallery,
      experienceYears,
      about: {
        paragraph1,
        paragraph2,
        highlightText,
      },
      quotingEnabled,
      adminPin,
    };

    onUpdateContent(updated);
    onUpdateProducts(productsDraft);
    setLastSaved(now);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-[#f8fafc] text-sm text-slate-900 focus:border-[#00236f] focus:ring-2 focus:ring-blue-100 outline-none';

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'nosotros', label: 'Quiénes Somos' },
    { id: 'config', label: 'Configuración' },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 text-left space-y-6">
        {/* Top Admin Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00236f] text-white text-xs font-bold font-heading uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
              Panel de Control
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff6ff] text-[#1e40af] text-xs font-bold font-heading uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
              Edición en el Navegador
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
              onClick={() => onSelectTab('inicio')}
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
              title="Salir del Panel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#e2e8f0] shadow-xs">
            <p className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase font-heading flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0284c7]" />
              Productos en Catálogo
            </p>
            <p className="text-2xl font-black text-[#00236f] font-heading mt-1">
              {productsDraft.length}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#e2e8f0] shadow-xs">
            <p className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase font-heading flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#0284c7]" />
              Imágenes en Galería
            </p>
            <p className="text-2xl font-black text-[#00236f] font-heading mt-1">
              {gallery.length}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#e2e8f0] shadow-xs">
            <p className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase font-heading flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
              Último Guardado
            </p>
            <p className="text-2xl font-black text-[#00236f] font-heading mt-1 truncate">
              {lastSaved}
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-[#e2e8f0] pt-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`px-6 py-2.5 text-xs sm:text-sm font-heading font-bold transition-all border-b-2 whitespace-nowrap ${
                activeAdminTab === tab.id
                  ? 'border-[#00236f] text-[#00236f]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeAdminTab === 'inicio' && (
          <>
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
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* SECTION: CARGA DE IMAGEN HERO + GALERÍA */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#00236f] font-heading">
                    Carga de Imagen Hero (Slider)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sin límite de imágenes. Pon una URL externa o sube un archivo (base64).
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#1e40af] uppercase">
                  Recomendado 16:9
                </span>
              </div>

              <ImageInput
                label="Imagen actual del hero"
                value={heroImage}
                gallery={gallery}
                onChange={setHeroImage}
              />

              {/* Previsualización de corte (16:9) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 font-heading uppercase">
                  <span>Previsualización (16:9)</span>
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
                      onClick={() => setHeroImage('')}
                      className="p-1 hover:text-rose-600 transition"
                      title="Limpiar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-sm">
                  {heroImage ? (
                    <img
                      src={heroImage}
                      alt="Previsualización hero"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                      Sin imagen seleccionada
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 text-white text-[11px] font-mono px-3 py-1.5 rounded flex items-center justify-between">
                    <span>Imagen hero actual</span>
                    <span className="text-emerald-400 font-bold">16:9</span>
                  </div>
                </div>
              </div>

              {/* Galería de imágenes */}
              <div className="pt-2 border-t border-[#f1f5f9] space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-[#00236f] font-heading">
                    Galería de Imágenes
                  </h4>
                  <p className="text-xs text-slate-500">
                    Agrega todas las imágenes que quieras; podrás usarlas desde cualquier selector.
                  </p>
                </div>

                {/* Add image form */}
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Agregar imagen a la galería
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Título (ej. Fachada comercial)"
                      value={addImageTitle}
                      onChange={(e) => setAddImageTitle(e.target.value)}
                      className={`${inputClass} sm:w-1/3`}
                    />
                    <input
                      type="text"
                      placeholder="URL de la imagen"
                      value={addImageUrl}
                      onChange={(e) => setAddImageUrl(e.target.value)}
                      className={`${inputClass} flex-1`}
                    />
                    <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#00236f] border border-slate-300 rounded-lg hover:bg-slate-50">
                      <Upload className="w-3.5 h-3.5" />
                      Subir
                      <input type="file" accept="image/*" className="hidden" onChange={handleGalleryFile} />
                    </label>
                    <button
                      type="button"
                      onClick={handleAddGalleryImage}
                      disabled={!addImageUrl.trim()}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-bold font-heading transition disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Agregar
                    </button>
                  </div>
                </div>

                {/* Gallery grid */}
                {gallery.length === 0 ? (
                  <p className="text-xs text-slate-400">La galería está vacía.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {gallery.map((img) => (
                      <div
                        key={img.id}
                        className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group"
                      >
                        <div className="aspect-[4/3] w-full">
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-2">
                          <p className="text-[10px] font-semibold text-white truncate">
                            {img.title}
                          </p>
                        </div>
                        <div className="absolute top-1.5 right-1.5 flex gap-1">
                          <button
                            type="button"
                            onClick={() => setHeroImage(img.url)}
                            title="Usar como imagen hero"
                            className={`p-1 rounded bg-white/90 hover:bg-white text-[#00236f] ${
                              heroImage === img.url ? 'ring-1 ring-[#00236f]' : ''
                            }`}
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setGallery((prev) => prev.filter((g) => g.id !== img.id))}
                            title="Eliminar imagen"
                            className="p-1 rounded bg-white/90 hover:bg-white text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SECTION: 4 TARJETAS DE LÍNEA DESTACADA */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#00236f] font-heading">
                    Tarjetas de Línea Destacada
                  </h3>
                  <p className="text-xs text-slate-500">
                    Reorganiza o actualiza los textos e imagen de cada línea de fabricación
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#1e40af] uppercase">
                  Editar contenido
                </span>
              </div>

              <div className="space-y-3">
                {featuredLines.map((line, idx) => {
                  const isEditing = editingCardId === line.id;
                  return (
                    <div
                      key={line.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full min-w-0">
                          <GripVertical className="w-5 h-5 text-slate-400 cursor-grab shrink-0" />
                          <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                            {line.image ? (
                              <img
                                src={line.image}
                                alt={line.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-[#00236f]">
                                {line.number}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 font-heading truncate">
                                {line.title}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                              {line.categoryTag}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => moveFeaturedLine(idx, -1)}
                            disabled={idx === 0}
                            className="text-slate-400 hover:text-[#00236f] disabled:opacity-30"
                            title="Subir"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveFeaturedLine(idx, 1)}
                            disabled={idx === featuredLines.length - 1}
                            className="text-slate-400 hover:text-[#00236f] disabled:opacity-30"
                            title="Bajar"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
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

                      {isEditing && (
                        <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">
                              Título
                            </label>
                            <input
                              type="text"
                              value={line.title}
                              onChange={(e) =>
                                handleUpdateFeaturedLine(line.id, { title: e.target.value })
                              }
                              className={inputClass}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">
                              Etiqueta de categoría
                            </label>
                            <input
                              type="text"
                              value={line.categoryTag}
                              onChange={(e) =>
                                handleUpdateFeaturedLine(line.id, { categoryTag: e.target.value })
                              }
                              className={inputClass}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">
                              Descripción
                            </label>
                            <input
                              type="text"
                              value={line.description}
                              onChange={(e) =>
                                handleUpdateFeaturedLine(line.id, { description: e.target.value })
                              }
                              className={inputClass}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">
                              Categoría destino
                            </label>
                            <select
                              value={line.targetCategory}
                              onChange={(e) =>
                                handleUpdateFeaturedLine(line.id, {
                                  targetCategory: e.target.value as ProductCategory,
                                })
                              }
                              className={inputClass}
                            >
                              {featuredCategories.map((c) => (
                                <option key={c} value={c}>
                                  {c.charAt(0).toUpperCase() + c.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <ImageInput
                              label="Imagen de la tarjeta"
                              value={line.image}
                              gallery={gallery}
                              onChange={(url) => handleUpdateFeaturedLine(line.id, { image: url })}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeAdminTab === 'catalogo' && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#00236f] font-heading">
                  Catálogo de Productos
                </h3>
                <p className="text-xs text-slate-500">
                  Agrega, edita, duplica o elimina productos y sus imágenes.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#1e40af] uppercase">
                {productsDraft.length} productos
              </span>
            </div>

            <CatalogAdmin
              products={productsDraft}
              onChange={setProductsDraft}
              gallery={gallery}
            />
          </div>
        )}

        {activeAdminTab === 'nosotros' && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#00236f] font-heading">
                  Quiénes Somos
                </h3>
                <p className="text-xs text-slate-500">
                  Textos de la sección de historia y trayectoria.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#1e40af] uppercase">
                Contenido
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
                  Años de experiencia
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className={`${inputClass} max-w-[160px]`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
                  Párrafo 1 · Historia
                </label>
                <textarea
                  rows={3}
                  value={paragraph1}
                  onChange={(e) => setParagraph1(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
                  Párrafo 2 · Historia
                </label>
                <textarea
                  rows={3}
                  value={paragraph2}
                  onChange={(e) => setParagraph2(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
                  Destacado (recuadro azul)
                </label>
                <textarea
                  rows={3}
                  value={highlightText}
                  onChange={(e) => setHighlightText(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'config' && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-2.5 border-b border-[#f1f5f9] pb-4">
              <div className="p-2 rounded-lg bg-[#eff6ff] text-[#00236f]">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#00236f] font-heading">
                  Configuración General
                </h3>
                <p className="text-xs text-slate-500">
                  Controla lo que se muestra a los usuarios del sitio.
                </p>
              </div>
            </div>

            {/* Toggle de cotización */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#f8fafc] border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#b45309] flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f172a] font-heading">
                    Activar opción de cotización
                  </p>
                  <p className="text-xs text-slate-500 max-w-md">
                    Al desactivarla se ocultan: el menú "Cotizar", los botones de cotización, el
                    formulario, el configurador a escala y el acceso directo por WhatsApp.
                    Teléfono y correo siguen visibles.
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={quotingEnabled}
                onClick={() => setQuotingEnabled((q) => !q)}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                  quotingEnabled ? 'bg-[#00236f]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    quotingEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-[#1e40af]" />
                <p className="text-sm font-bold text-[#0f172a] font-heading">
                  Clave de acceso al panel (PIN)
                </p>
              </div>
              <p className="text-xs text-slate-500">
                El panel se abre agregando <code className="bg-slate-100 px-1 rounded">?admin=1</code>{" "}
                al final de la URL y luego ingresando este PIN.
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className={`${inputClass} max-w-[200px] font-mono tracking-widest`}
              />
            </div>
          </div>
        )}

        {/* Global Save Button */}
        <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00236f]" />
            <div>
              <p className="text-xs font-bold text-[#00236f] font-heading">
                Cambios listos para aplicar
              </p>
              <p className="text-[11px] text-slate-500">
                Se guardan en el navegador y se reflejan en el sitio al instante
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