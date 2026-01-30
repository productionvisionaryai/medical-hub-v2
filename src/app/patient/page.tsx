// src/app/patient/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ModernChat from '@/components/chat/ModernChat';
import CalendarSection from '@/components/patient/CalendarSection';
import CalendarSkeleton from '@/components/ui/calendar-skeleton';
import BlinkPayment from '@/components/payments/BlinkPayment';

export default function PatientPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulamos carga de datos del doctor desde la DB
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
            <div className="w-full max-w-4xl space-y-6">
                
                {/* 1. Chat Helena */}
                <ModernChat patientId="cm6lbpizv0000vn88m8p7gpx7" />

                {/* 2. Pagos (Tip Jar) - Siempre abierto y visible */}
                <BlinkPayment />

                {/* 3. Agendamiento con Skeleton */}
                {isLoading ? (
                    <CalendarSkeleton />
                ) : (
                    <CalendarSection 
                        doctorName="Pablo Cortés"
                        calLink="pablo-cortes-7cwjtu/30min"
                    />
                )}

                <p className="text-center text-[10px] text-slate-400 mt-8">
                   Powered by Visionary AI • 2026
                </p>
            </div>
        </div>
    );
}
