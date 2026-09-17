import React from 'react';
import { GalleryImage } from '../../types';
import { Upload, Link2, Image as ImageIcon } from 'lucide-react';

interface ImageInputProps {
  value: string;
  gallery: GalleryImage[];
  onChange: (url: string) => void;
  label?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  value,
  gallery,
  onChange,
  label,
}) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-bold text-slate-700 uppercase font-heading block">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
          {value ? (
            <img
              src={value}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex gap-1.5 items-center">
            <Link2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Pega la URL de una imagen"
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:border-[#00236f] outline-none"
            />
          </div>
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#00236f] border border-slate-300 rounded hover:bg-slate-50">
            <Upload className="w-3.5 h-3.5" />
            Subir archivo (base64)
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="pt-1">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
            Elegir de la galería:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {gallery.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => onChange(img.url)}
                title={img.title}
                className={`w-9 h-9 rounded-md overflow-hidden border-2 transition ${
                  value === img.url
                    ? 'border-[#00236f]'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};