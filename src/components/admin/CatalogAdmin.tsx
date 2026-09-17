import React, { useState } from 'react';
import { ProductSystem, ProductCategory, GalleryImage } from '../../types';
import {
  Plus,
  Trash2,
  Copy,
  Pencil,
  Check,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { createId } from '../../data/initialData';
import { ImageInput } from './ImageInput';

interface CatalogAdminProps {
  products: ProductSystem[];
  onChange: (products: ProductSystem[]) => void;
  gallery: GalleryImage[];
}

const CATEGORY_NUMBERS: Record<ProductCategory, string> = {
  ventanas: '01',
  puertas: '02',
  portones: '03',
  divisiones: '04',
};

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  ventanas: 'Ventanas',
  puertas: 'Puertas',
  portones: 'Portones',
  divisiones: 'Divisiones',
};

function emptyProduct(category: ProductCategory): ProductSystem {
  return {
    id: createId('cat'),
    category,
    categoryNumber: CATEGORY_NUMBERS[category],
    title: 'Nuevo producto',
    subtitle: '',
    description: '',
    image: '',
    badge: '',
    specs: [{ label: 'Material', value: 'Aluminio' }],
    features: ['Característica destacada 1'],
    ctaText: 'Cotizar este sistema',
  };
}

interface Draft {
  products: ProductSystem[];
  onChange: (products: ProductSystem[]) => void;
}

function updateProduct(
  list: ProductSystem[],
  id: string,
  patch: Partial<ProductSystem>
): ProductSystem[] {
  return list.map((p) => (p.id === id ? { ...p, ...patch } : p));
}

export const CatalogAdmin: React.FC<CatalogAdminProps> = ({
  products,
  onChange,
  gallery,
}) => {
  const [filter, setFilter] = useState<ProductCategory | 'todos'>('todos');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [snapshots, setSnapshots] = useState<Record<string, string>>({});

  const editing = products.find((p) => p.id === editingId) || null;

  const filtered = filter === 'todos' ? products : products.filter((p) => p.category === filter);

  const addProduct = (category: ProductCategory) => {
    const p = emptyProduct(category);
    onChange([...products, p]);
    setEditingId(p.id);
    setSnapshots((s) => ({ ...s, [p.id]: JSON.stringify(p) }));
  };

  const startEdit = (p: ProductSystem) => {
    setEditingId(p.id);
    setSnapshots((s) => ({ ...s, [p.id]: JSON.stringify(p) }));
  };

  const cancelEdit = () => {
    if (editingId && snapshots[editingId]) {
      const restored = JSON.parse(snapshots[editingId]) as ProductSystem;
      onChange(updateProduct(products, editingId, restored));
    }
    setEditingId(null);
  };

  const commitEdit = () => setEditingId(null);

  const duplicateProduct = (p: ProductSystem) => {
    const copy: ProductSystem = {
      ...p,
      id: createId('cat'),
      title: `${p.title} (copia)`,
    };
    onChange([...products, copy]);
  };

  const deleteProduct = (id: string) => {
    if (!window.confirm('¿Eliminar este producto del catálogo?')) return;
    onChange(products.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const move = (index: number, dir: -1 | 1) => {
    if (filter !== 'todos') return;
    const next = [...filtered];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  };

  const patchSpec = (id: string, idx: number, key: 'label' | 'value', val: string) => {
    onChange(
      updateProduct(products, id, {
        specs: products
          .find((p) => p.id === id)!
          .specs.map((s, i) => (i === idx ? { ...s, [key]: val } : s)),
      })
    );
  };

  const patchFeature = (id: string, idx: number, val: string) => {
    const prod = products.find((p) => p.id === id)!;
    onChange(
      updateProduct(products, id, {
        features: (prod.features || []).map((f, i) => (i === idx ? val : f)),
      })
    );
  };

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:border-[#00236f] focus:ring-2 focus:ring-blue-100 outline-none';

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(['todos', 'ventanas', 'puertas', 'portones', 'divisiones'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition ${
                filter === c
                  ? 'bg-[#00236f] text-white'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c === 'todos' ? 'Todos' : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {filter !== 'todos' && (
            <button
              onClick={() => addProduct(filter as ProductCategory)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-bold font-heading transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Agregar en {CATEGORY_LABELS[filter as ProductCategory]}
            </button>
          )}
        </div>
      </div>

      {/* Editor panel */}
      {editing && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-[#00236f] font-heading">
                Editando: {editing.title}
              </h4>
              <p className="text-[11px] text-slate-500">
                {"Los cambios son locales hasta pulsar 'Guardar y Publicar'."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={cancelEdit}
                className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
                title="Descartar cambios"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={commitEdit}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-bold font-heading transition"
              >
                <Check className="w-4 h-4" />
                Listo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">Título</label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => onChange(updateProduct(products, editing.id, { title: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">Subtítulo</label>
              <input
                type="text"
                value={editing.subtitle}
                onChange={(e) => onChange(updateProduct(products, editing.id, { subtitle: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">Categoría</label>
              <select
                value={editing.category}
                onChange={(e) =>
                  onChange(
                    updateProduct(products, editing.id, {
                      category: e.target.value as ProductCategory,
                      categoryNumber: CATEGORY_NUMBERS[e.target.value as ProductCategory],
                    })
                  )
                }
                className={inputClass}
              >
                {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">Badge</label>
              <input
                type="text"
                value={editing.badge || ''}
                onChange={(e) => onChange(updateProduct(products, editing.id, { badge: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">Descripción</label>
              <textarea
                rows={2}
                value={editing.description}
                onChange={(e) => onChange(updateProduct(products, editing.id, { description: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase font-heading">Texto del botón</label>
              <input
                type="text"
                value={editing.ctaText || ''}
                onChange={(e) => onChange(updateProduct(products, editing.id, { ctaText: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <ImageInput
                label="Imagen del producto"
                value={editing.image}
                gallery={gallery}
                onChange={(url) => onChange(updateProduct(products, editing.id, { image: url }))}
              />
            </div>
          </div>

          {/* Specs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#00236f] font-heading uppercase tracking-wide">
                Ficha Técnica (specs)
              </p>
              <button
                onClick={() =>
                  onChange(
                    updateProduct(products, editing.id, {
                      specs: [...editing.specs, { label: '', value: '' }],
                    })
                  )
                }
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#00236f] border border-slate-300 rounded hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar spec
              </button>
            </div>
            <div className="space-y-2">
              {editing.specs.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Etiqueta"
                    value={s.label}
                    onChange={(e) => patchSpec(editing.id, i, 'label', e.target.value)}
                    className={`${inputClass} w-1/3`}
                  />
                  <input
                    type="text"
                    placeholder="Valor"
                    value={s.value}
                    onChange={(e) => patchSpec(editing.id, i, 'value', e.target.value)}
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    onClick={() =>
                      onChange(
                        updateProduct(products, editing.id, {
                          specs: editing.specs.filter((_, idx) => idx !== i),
                        })
                      )
                    }
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#00236f] font-heading uppercase tracking-wide">
                Ventajas / características
              </p>
              <button
                onClick={() =>
                  onChange(
                    updateProduct(products, editing.id, {
                      features: [...(editing.features || []), ''],
                    })
                  )
                }
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#00236f] border border-slate-300 rounded hover:bg-slate-50"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
            <div className="space-y-2">
              {(editing.features || []).map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => patchFeature(editing.id, i, e.target.value)}
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    onClick={() =>
                      onChange(
                        updateProduct(products, editing.id, {
                          features: (editing.features || []).filter((_, idx) => idx !== i),
                        })
                      )
                    }
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="space-y-2.5">
        {filtered.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">No hay productos en esta categoría.</p>
            <button
              onClick={() =>
                filter === 'todos' ? addProduct('ventanas') : addProduct(filter as ProductCategory)
              }
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-bold font-heading"
            >
              <Plus className="w-3.5 h-3.5" />
              Agregar producto
            </button>
          </div>
        )}
        {filtered.map((p, idx) => (
          <div
            key={p.id}
            className={`p-4 rounded-xl border transition flex items-center justify-between gap-4 ${
              editingId === p.id
                ? 'border-blue-300 bg-blue-50/40'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => move(idx, -1)}
                disabled={idx === 0 || filter !== 'todos'}
                className="text-slate-400 hover:text-[#00236f] disabled:opacity-30"
                title="Subir"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <div className="w-14 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 font-heading truncate">
                  {p.title || 'Sin título'}
                </p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wide font-semibold">
                  {CATEGORY_LABELS[p.category]} · {p.specs.length} specs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => move(idx, 1)}
                disabled={idx === filtered.length - 1 || filter !== 'todos'}
                className="text-slate-400 hover:text-[#00236f] disabled:opacity-30"
                title="Bajar"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => (editingId === p.id ? commitEdit() : startEdit(p))}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
                  editingId === p.id
                    ? 'bg-[#00236f] text-white border-[#00236f]'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
                title={editingId === p.id ? 'Listo' : 'Editar'}
              >
                {editingId === p.id ? <Check className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => duplicateProduct(p)}
                className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100"
                title="Duplicar"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="p-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                title="Eliminar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};