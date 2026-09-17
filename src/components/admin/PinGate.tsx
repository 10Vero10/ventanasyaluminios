import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface PinGateProps {
  pin: string;
  onUnlock: () => void;
  onCancel: () => void;
}

export const PinGate: React.FC<PinGateProps> = ({ pin, onUnlock, onCancel }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === pin) {
      onUnlock();
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16 text-center space-y-6">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-[#00236f] text-white flex items-center justify-center shadow-lg">
        <Lock className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-[#00236f] font-heading">
          Panel de Control
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ingresa el PIN de acceso para editar el sitio.
        </p>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="PIN de acceso"
          className="w-full text-center px-3.5 py-3 rounded-xl border border-slate-300 text-lg tracking-[0.5em] font-mono outline-none focus:border-[#00236f] focus:ring-2 focus:ring-blue-100"
        />
        {error && (
          <p className="text-xs font-bold text-rose-600">
            PIN incorrecto. Intenta de nuevo.
          </p>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-[#00236f] hover:bg-[#1e3a8a] text-white font-heading font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
        >
          Entrar al Panel
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-slate-500 underline hover:text-slate-800"
        >
          Volver al sitio
        </button>
      </form>
    </div>
  );
};