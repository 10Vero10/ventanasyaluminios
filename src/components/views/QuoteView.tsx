import React, { useState, useEffect } from 'react';
import { QuoteFormData } from '../../types';
import { 
  Calculator, 
  MessageCircle, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Layers, 
  Maximize2,
  ExternalLink
} from 'lucide-react';

interface QuoteViewProps {
  phone: string;
  email: string;
  whatsappNumber: string;
  initialProductType?: string;
  onQuoteSubmitted?: (data: QuoteFormData) => void;
}

export const QuoteView: React.FC<QuoteViewProps> = ({
  phone,
  email,
  whatsappNumber,
  initialProductType,
  onQuoteSubmitted,
}) => {
  // Configurator state
  const [widthCm, setWidthCm] = useState<number>(150);
  const [heightCm, setHeightCm] = useState<number>(120);
  const [glassType, setGlassType] = useState<string>('Vidrio Claro');
  const [profileColor, setProfileColor] = useState<string>('Negro Mate Europeo');

  // Form state
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    productType: initialProductType || 'Ventanas arquitectónicas',
    dimensions: '120 cm alto x 150 cm ancho (1.80 m²)',
    message: '',
  });

  const [appliedFeedback, setAppliedFeedback] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Calculate estimated area
  const areaM2 = ((widthCm * heightCm) / 10000).toFixed(2);

  // Update initialProductType if changed externally
  useEffect(() => {
    if (initialProductType) {
      setFormData((prev) => ({
        ...prev,
        productType: initialProductType,
      }));
    }
  }, [initialProductType]);

  const handleApplyDimensions = () => {
    const dimText = `${heightCm} cm alto x ${widthCm} cm ancho (${areaM2} m²) · ${glassType} / Perfil ${profileColor}`;
    setFormData((prev) => ({
      ...prev,
      dimensions: dimText,
      message: prev.message || `Hola, me interesa una cotización para ${formData.productType} con medidas de ${widthCm} cm x ${heightCm} cm en ${glassType}.`,
    }));

    setAppliedFeedback(true);
    setTimeout(() => setAppliedFeedback(false), 3000);

    // Scroll to form smoothly
    document.getElementById('solicitud-cotizacion-rapida')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Por favor ingresa tu nombre y teléfono para recibir la cotización.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketNum = 'VYA-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket(ticketNum);

      if (onQuoteSubmitted) {
        onQuoteSubmitted({
          ...formData,
          estimatedArea: parseFloat(areaM2),
          glassType,
          profileColor,
        });
      }
    }, 600);
  };

  const generateWhatsappUrl = () => {
    const message = `*SOLICITUD DE COTIZACIÓN - VENTANAS Y ALUMINIO*
*Nombre:* ${formData.name || 'Cliente interesado'}
*Teléfono:* ${formData.phone || 'Por definir'}
*Producto:* ${formData.productType}
*Medidas calculadas:* ${widthCm} cm ancho x ${heightCm} cm alto (${areaM2} m²)
*Vidrio:* ${glassType}
*Acabado de perfil:* ${profileColor}
*Detalles adicionales:* ${formData.message || 'Sin observaciones adicionales'}`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dbeafe] text-[#1e3a8a] text-xs font-bold font-heading uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
          <span>Cotizar</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00236f] font-heading tracking-tight">
          Hablemos de <span className="font-serif italic font-normal text-[#1e40af]">tu proyecto</span>
        </h1>

        <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
          Escríbenos o llámanos: te asesoramos en materiales, medidas y presupuesto con tolerancias exactas y garantía de fábrica.
        </p>
      </section>

      {/* Main Grid: 2 Columns on Desktop for optimal layout and proportion */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Contact Direct Channels & Interactive Scaled Blueprint Configurator */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Direct Contact Card matching screenshot 5 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#1e40af] bg-[#eff6ff] px-2 py-0.5 rounded font-heading uppercase tracking-wide">
                  Contáctanos
                </span>
                <h3 className="text-xl font-bold text-[#00236f] font-heading mt-1">
                  Cotiza sin costo y sin compromiso
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-1">
                  Cuéntanos el espacio y las medidas, y te recomendamos la mejor opción en vidrio, aluminio o PVC para tu hogar, tu oficina o tu negocio.
                </p>
              </div>

              {/* Direct WhatsApp Call to Action Button */}
              <a
                href={generateWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="quote-direct-whatsapp-button"
                className="flex items-center justify-between p-3.5 bg-[#ecfdf5] hover:bg-[#d1fae5] border border-[#a7f3d0] rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#065f46] font-heading">
                      Escribir por WhatsApp
                    </p>
                    <p className="text-[11px] font-semibold text-[#047857] tracking-wider uppercase">
                      Respuesta Rápida · Canal Directo
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#059669] group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Email & Phone info items */}
              <div className="space-y-2 pt-1">
                <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] flex items-center gap-3 text-xs sm:text-sm">
                  <div className="w-8 h-8 rounded bg-[#dbeafe] text-[#1e40af] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase font-bold text-[#64748b]">Correo Electrónico</p>
                    <a href={`mailto:${email}`} className="font-semibold text-[#0f172a] hover:underline truncate block">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] flex items-center gap-3 text-xs sm:text-sm">
                  <div className="w-8 h-8 rounded bg-[#dbeafe] text-[#1e40af] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#64748b]">Teléfono · WhatsApp</p>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-semibold text-[#0f172a] hover:underline">
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Plano Esquemático Dinámico (Configurador Dimensional a Escala) */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-[#eff6ff] text-[#1e40af]">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#00236f] font-heading">
                      Plano Esquemático Dinámico
                    </h3>
                    <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider font-heading">
                      Configurador Dimensional a Escala
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#1e40af] bg-[#e0e7ff] px-2 py-0.5 rounded">
                  ESC: 1:20
                </span>
              </div>

              {/* Architectural Canvas / Schematic Blueprint */}
              <div className="relative p-6 sm:p-8 bg-[#f0f4fa] rounded-xl border border-[#cbd5e1] overflow-hidden flex flex-col items-center justify-center min-h-[260px] select-none">
                {/* Architectural Blueprint grid pattern */}
                <div 
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Top dimension callout with arrows */}
                <div className="relative z-10 mb-3 flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#1e40af]">
                  <span className="w-8 border-t border-dashed border-[#1e40af]"></span>
                  <span className="bg-white/90 px-2 py-0.5 rounded shadow-xs border border-blue-200">
                    {widthCm} cm
                  </span>
                  <span className="w-8 border-t border-dashed border-[#1e40af]"></span>
                </div>

                {/* Centered Window Frame with dynamic aspect ratio */}
                <div className="relative z-10 flex items-center justify-center w-full max-w-[280px]">
                  {/* Left dimension callout */}
                  <div className="absolute -left-10 sm:-left-12 top-1/2 -translate-y-1/2 flex flex-col items-center text-xs font-mono font-bold text-[#1e40af]">
                    <span className="h-6 border-l border-dashed border-[#1e40af]"></span>
                    <span className="bg-white/90 px-1 py-0.5 rounded shadow-xs border border-blue-200 text-[10px] my-1 -rotate-90">
                      {heightCm} cm
                    </span>
                    <span className="h-6 border-l border-dashed border-[#1e40af]"></span>
                  </div>

                  {/* Window Representation Box */}
                  <div 
                    className="relative transition-all duration-200 rounded-sm shadow-md border-4 flex items-center justify-center"
                    style={{
                      width: `${Math.min(240, Math.max(120, (widthCm / 350) * 240))}px`,
                      height: `${Math.min(180, Math.max(90, (heightCm / 260) * 180))}px`,
                      borderColor: profileColor.includes('Negro') ? '#1e293b' : profileColor.includes('Blanco') ? '#cbd5e1' : '#94a3b8',
                      backgroundColor: glassType.includes('Templado') 
                        ? 'rgba(186, 230, 253, 0.55)' 
                        : glassType.includes('Reflectivo') 
                        ? 'rgba(251, 191, 36, 0.35)' 
                        : 'rgba(224, 242, 254, 0.4)',
                    }}
                  >
                    {/* Glass reflection gloss diagonal */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"></div>

                    {/* Window Mullion divider (vertical split line if wider) */}
                    {widthCm > 140 && (
                      <div 
                        className="absolute top-0 bottom-0 w-1.5"
                        style={{
                          backgroundColor: profileColor.includes('Negro') ? '#1e293b' : '#94a3b8',
                        }}
                      />
                    )}

                    {/* Inner Label */}
                    <span className="relative z-10 text-[11px] font-bold tracking-wider text-[#0f172a] bg-white/80 px-2 py-0.5 rounded shadow-xs uppercase font-heading">
                      {glassType}
                    </span>
                  </div>
                </div>

                {/* Bottom Metric Pills matching screenshot */}
                <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 w-full max-w-sm text-center">
                  <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Ancho</p>
                    <p className="text-xs font-bold text-[#00236f]">{widthCm} cm</p>
                  </div>
                  <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Alto</p>
                    <p className="text-xs font-bold text-[#00236f]">{heightCm} cm</p>
                  </div>
                  <div className="p-2 bg-white/95 rounded-lg border border-emerald-200 shadow-xs">
                    <p className="text-[10px] text-emerald-700 font-bold uppercase">Área Estimada</p>
                    <p className="text-xs font-extrabold text-emerald-600">{areaM2} m²</p>
                  </div>
                </div>
              </div>

              {/* Sliders & Controls */}
              <div className="space-y-4">
                {/* Width Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#334155] font-heading">ANCHO DE VENTANA (CM)</span>
                    <span className="font-mono font-bold text-[#00236f] text-sm">{widthCm} cm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setWidthCm((w) => Math.max(60, w - 5))}
                      className="w-8 h-8 rounded border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shrink-0"
                      aria-label="Disminuir ancho"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min={60}
                      max={350}
                      value={widthCm}
                      onChange={(e) => setWidthCm(Number(e.target.value))}
                      className="w-full accent-[#00236f] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setWidthCm((w) => Math.min(350, w + 5))}
                      className="w-8 h-8 rounded border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shrink-0"
                      aria-label="Aumentar ancho"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#334155] font-heading">ALTO DE VENTANA (CM)</span>
                    <span className="font-mono font-bold text-[#00236f] text-sm">{heightCm} cm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setHeightCm((h) => Math.max(60, h - 5))}
                      className="w-8 h-8 rounded border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shrink-0"
                      aria-label="Disminuir alto"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min={60}
                      max={260}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-[#00236f] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setHeightCm((h) => Math.min(260, h + 5))}
                      className="w-8 h-8 rounded border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shrink-0"
                      aria-label="Aumentar alto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Glass Type Picker */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading block mb-1.5">
                    Tipo de Vidrio:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['Vidrio Claro', 'Vidrio Templado', 'Reflectivo / Bronce', 'Esmerilado'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGlassType(g)}
                        className={`p-2 rounded-lg border text-left font-medium transition ${
                          glassType === g
                            ? 'border-[#00236f] bg-[#eff6ff] text-[#00236f] font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  id="apply-dimensions-to-quote-button"
                  type="button"
                  onClick={handleApplyDimensions}
                  className="w-full py-3 px-4 bg-[#eff6ff] hover:bg-[#dbeafe] border border-[#93c5fd] text-[#00236f] font-heading font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Maximize2 className="w-4 h-4 text-[#1e40af]" />
                  <span>Aplicar medidas a mi cotización</span>
                </button>

                {appliedFeedback && (
                  <p className="text-xs font-bold text-emerald-600 text-center animate-in fade-in">
                    ✓ Medidas aplicadas al formulario de cotización.
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Solicitud de Cotización Rápida & Asesoría a Domicilio */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Form Card */}
            <div 
              id="solicitud-cotizacion-rapida" 
              className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="border-b border-[#e2e8f0] pb-4">
                <span className="text-[11px] font-bold text-[#1e40af] bg-[#eff6ff] px-2 py-0.5 rounded font-heading uppercase tracking-wide">
                  Formulario Directo
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#00236f] font-heading mt-1">
                  Solicitud de Cotización Rápida
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] pt-1">
                  Completa tus datos y recibirás asesoría técnica detallada con cálculo de materiales.
                </p>
              </div>

              {submittedTicket ? (
                <div className="p-6 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#065f46] font-heading">
                      ¡Solicitud Registrada con Éxito!
                    </h4>
                    <p className="text-xs text-[#047857] mt-1 font-mono font-bold">
                      Radicado: {submittedTicket}
                    </p>
                    <p className="text-xs text-[#065f46] mt-2">
                      Nos pondremos en contacto contigo a la brevedad posible al número indicado.
                    </p>
                  </div>

                  <a
                    href={generateWhatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm rounded-lg shadow transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar también por WhatsApp para atención inmediata</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedTicket(null)}
                    className="text-xs text-slate-500 underline hover:text-slate-800 block mx-auto pt-2"
                  >
                    Crear otra cotización
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Nombre y Apellido */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#334155] uppercase font-heading block">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] focus:border-[#00236f] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-[#0f172a] bg-[#f8fafc]"
                    />
                  </div>

                  {/* Teléfono / WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#334155] uppercase font-heading block">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] focus:border-[#00236f] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-[#0f172a] bg-[#f8fafc]"
                    />
                  </div>

                  {/* Tipo de producto */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#334155] uppercase font-heading block">
                      Tipo de Producto
                    </label>
                    <select
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] focus:border-[#00236f] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-[#0f172a] bg-[#f8fafc]"
                    >
                      <option value="Ventanas arquitectónicas">Ventanas arquitectónicas (Corredizas / Batientes)</option>
                      <option value="Puertas en aluminio o vidrio">Puertas en aluminio, vidrio o PVC</option>
                      <option value="Portones tipo americano">Portones tipo americano automatizados</option>
                      <option value="Divisiones de baño o oficina">Divisiones en vidrio templado o acrílico</option>
                      <option value="Fachadas flotantes o vitrinas">Fachadas flotantes o vitrinas comerciales</option>
                    </select>
                  </div>

                  {/* Medidas Aproximadas */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#334155] uppercase font-heading block">
                      Medidas Aproximadas (Alto x Ancho en cm)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 120 alto x 150 ancho"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] focus:border-[#00236f] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-[#0f172a] bg-[#f8fafc]"
                    />
                    <p className="text-[11px] text-slate-500">
                      💡 Tip: Puedes usar el calculador dimensional de la izquierda para fijar medidas milimétricas.
                    </p>
                  </div>

                  {/* Mensaje o detalles */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#334155] uppercase font-heading block">
                      Mensaje o Detalles del Proyecto
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tipo de vidrio (templado, laminado), color de perfil o dirección aproximada..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] focus:border-[#00236f] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-[#0f172a] bg-[#f8fafc]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#00236f] hover:bg-[#1e3a8a] text-white font-heading font-bold text-sm sm:text-base rounded-lg shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Enviando solicitud...' : 'Enviar solicitud de asesoría'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Asesoría técnica y visita a domicilio box matching screenshot 5 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#00236f]">
                <Layers className="w-5 h-5 text-[#1e40af]" />
                <h4 className="text-base font-bold font-heading">
                  Asesoría técnica y visita a domicilio
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Realizamos visitas técnicas para toma de medidas exactas, muestreo físico de perfiles de aluminio y revisión estructural en sitio sin compromiso adicional.
              </p>

              <div className="pt-2 border-t border-[#f1f5f9] space-y-2 text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0284c7]" />
                  <span><strong>Lunes a Sábado:</strong> 7:30 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>Instaladores certificados con protocolos de seguridad en obra</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
