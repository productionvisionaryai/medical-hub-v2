// src/components/chat/ModernChat.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Bot, User, Activity, Sparkles,
    RefreshCw, Phone, Calendar, ShieldCheck,
    AlertTriangle, HeartPulse, ExternalLink
} from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

import MedicalAlert from '../ui/medical-alert';
import RecoveryActions from '../ui/recovery-actions';
import ConsentForm from '../compliance/ConsentForm';

interface ModernChatProps {
    patientId: string;
    doctorCalLink?: string; // Dinámico para cada doctor
    doctorName?: string;
}

interface MessageWithContent extends UIMessage {
    content: string;
}

export default function ModernChat({ patientId, doctorCalLink = "visionary-ai/consulta", doctorName }: ModernChatProps) {
    const [hasConsent, setHasConsent] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');

    // 1. Inicialización de Cal.com con Branding Visionary
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "light",
                styles: { branding: { brandColor: "#2563eb" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    useEffect(() => {
        const consent = localStorage.getItem('helena_medical_consent');
        if (consent === 'true') setHasConsent(true);
    }, []);

    const { messages, append, status, error } = useChat({
        api: '/api/medical-chat',
        body: { patientId }, // Pasamos el contexto al backend
        onError: (err) => console.error("Nexus Audit - Chat Error:", err)
    });

    // 2. Analizador de Contexto con Branding y Dinamismo
    const getContextualActions = useCallback((content: string) => {
        const text = content.toLowerCase();

        if (text.includes('agendar') || text.includes('cita')) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-3 text-blue-800">
                        <Calendar size={14} className="text-blue-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Agenda con {doctorName || 'Especialista'}</span>
                    </div>
                    <button
                        data-cal-link={doctorCalLink}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                        Seleccionar Horario <ExternalLink size={14} />
                    </button>
                </motion.div>
            );
        }

        if (text.includes('urgente') || text.includes('⚠️')) {
            return (
                <div className="mt-4">
                    <MedicalAlert
                        type="warning"
                        title="Atención Prioritaria"
                        description="Helena ha detectado síntomas que requieren supervisión inmediata."
                        actions={
                            <RecoveryActions
                                actions={[
                                    { label: 'Emergencias', variant: 'primary', icon: <Phone size={16} />, onClick: () => window.open('tel:911') },
                                    { label: 'Soporte Visionary', variant: 'secondary', onClick: () => window.open('https://wa.me/tu_numero') }
                                ]}
                            />
                        }
                    />
                </div>
            );
        }
        return null;
    }, [doctorCalLink, doctorName]);

    if (!hasConsent) return <ConsentForm onConsent={(granted) => { if (granted) localStorage.setItem('helena_medical_consent', 'true'); setHasConsent(granted); }} />;

    return (
        <div className="flex flex-col h-[90vh] w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">

            {/* Header con Status de Sincronización */}
            <div className="p-4 border-b bg-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">Helena AI</h2>
                        <div className="flex items-center gap-1.5 text-[9px] text-green-600 font-bold uppercase">
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            Encrypted & HIPAA Ready
                        </div>
                    </div>
                </div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                    Visionary AI Labs
                </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                <AnimatePresence>
                    {messages.map((m) => (
                        <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] ${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'} p-4 rounded-2xl text-sm shadow-sm`}>
                                {m.content}
                                {m.role === 'assistant' && getContextualActions(m.content)}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input y Footer Branding */}
            <div className="p-6 bg-white border-t">
                <form onSubmit={(e) => { e.preventDefault(); append({ role: 'user', content: input } as any); setInput(''); }} className="relative">
                    <input
                        className="w-full pl-6 pr-14 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                        value={input}
                        placeholder="Consulta a Helena..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl">
                        <Send size={18} />
                    </button>
                </form>

                {/* Branding Final (Powered by Visionary AI) */}
                <div className="mt-4 flex items-center justify-between border-t pt-4 border-slate-50">
                    <div className="flex items-center gap-1 text-[9px] text-slate-400">
                        <ShieldCheck size={10} />
                        Protocolo de seguridad activo
                    </div>
                    <div className="text-[9px] font-medium text-slate-400">
                        Powered by <span className="text-blue-600 font-bold">Visionary AI</span>
                    </div>
                </div>
            </div>
        </div>
    );
}