"use client";

import { CalendarIcon, Clock, ShieldCheck, User, CheckCircle2 } from "lucide-react";

interface CalendarSectionProps {
  doctorName?: string;
  specialty?: string;
  calLink?: string;
  duration?: number;
}

export default function CalendarSection({
  doctorName = "Pablo Cortés",
  specialty = "Especialista Visionary AI",
  calLink = "pablo-cortes-7cwjtu/30min",
  duration = 30,
}: CalendarSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <CalendarIcon size={18} className="text-emerald-600" />
        <span className="text-[10px] text-emerald-700 font-black uppercase tracking-wider">
          Disponible
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-b from-blue-50/50 to-white p-5">
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <ShieldCheck size={80} className="text-blue-600 rotate-12" />
        </div>

        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center border border-blue-50 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform">
              <User size={28} className="text-blue-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-lg shadow-lg">
              <CheckCircle2 size={12} />
            </div>
          </div>
          <div>
            <p className="text-sm font-black text-slate-800 tracking-tight">{doctorName}</p>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{specialty}</p>
          </div>
        </div>

        {/* BOTÓN CONECTADO A CAL.COM */}
        <button 
          data-cal-link={calLink}
          data-cal-config='{"layout":"month_view"}'
          className="w-full py-4 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.97] transition-all flex items-center justify-center gap-3"
        >
          <Clock size={18} className="animate-pulse" />
          Reservar Sesión de {duration} min
        </button>
        
        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            <ShieldCheck size={12} className="text-blue-400" />
            Sincronización segura vía Cal.com
          </p>
          <p className="text-[9px] text-slate-300 italic text-center">
            Recibirás acceso instantáneo por WhatsApp y Email
          </p>
        </div>
      </div>
    </section>
  );
}
