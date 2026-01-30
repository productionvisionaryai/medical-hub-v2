// src/app/page.tsx
import Link from 'next/link';
import { Bot, User, Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 bg-slate-50">
            {/* Logo y Header */}
            <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Stethoscope className="text-white w-10 h-10" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    Medical Hub <span className="text-blue-600">V2</span>
                </h1>
                <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
                    Ecosistema agéntico de salud impulsado por Helena AI.
                    Seleccione su portal de acceso.
                </p>
            </div>

            {/* Opciones de Acceso */}
            <div className="grid gap-4 w-full max-w-md">
                <Link href="/patient" className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Portal del Paciente</h3>
                                <p className="text-xs text-slate-500 italic">Consultar con Helena AI</p>
                            </div>
                        </div>
                        <ArrowRight className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                </Link>

                <Link href="/doctor" className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-md transition-all active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 rounded-xl text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Portal Médico</h3>
                                <p className="text-xs text-slate-500 italic">Gestión de Especialistas</p>
                            </div>
                        </div>
                        <ArrowRight className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                    </div>
                </Link>
            </div>

            {/* Branding & Trust */}
            <div className="mt-16 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                    <ShieldCheck className="text-green-500" size={16} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Infraestructura Encriptada • HIPAA Compliant
                    </span>
                </div>

                <div className="text-center">
                    <p className="text-[11px] font-medium text-slate-400">
                        Powered by <span className="text-blue-600 font-bold">Visionary AI</span>
                    </p>
                    <p className="text-[9px] text-slate-300 uppercase tracking-tighter mt-1">
                        OpenClaw Agentic Engine v6.2
                    </p>
                </div>
            </div>
        </div>
    );
}