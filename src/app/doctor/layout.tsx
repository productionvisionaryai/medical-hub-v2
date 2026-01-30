// src/app/doctor/layout.tsx
import { ReactNode } from 'react';

export default function DoctorLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar Mobile-First */}
            <aside className="w-full md:w-64 bg-white border-b md:border-r border-slate-200 p-6">
                <div className="font-bold text-xl text-blue-600 mb-8">Medical Hub Dr.</div>
                <nav className="space-y-2">
                    <a href="/doctor" className="block p-3 bg-blue-50 text-blue-700 rounded-lg font-medium">Panel Principal</a>
                    <a href="/doctor/patients" className="block p-3 text-slate-600 hover:bg-slate-100 rounded-lg transition">Mis Pacientes</a>
                    <a href="/doctor/schedule" className="block p-3 text-slate-600 hover:bg-slate-100 rounded-lg transition">Agenda (Cal.com)</a>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}