// src/app/doctor/settings/page.tsx
"use client";
import { useState } from "react";

export default function DoctorSettings() {
    const [calLink, setCalLink] = useState("");

    const saveSettings = async () => {
        // Lógica para guardar el link en la tabla Doctor de Prisma
        console.log("Guardando link de Cal.com:", calLink);
    };

    return (
        <div className="max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Configuración de Consultorio Virtual</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Enlace de Cal.com</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                            cal.com/
                        </span>
                        <input
                            type="text"
                            value={calLink}
                            onChange={(e) => setCalLink(e.target.value)}
                            className="flex-1 block w-full rounded-none rounded-r-md border-slate-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="tu-nombre-medico"
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                        Este enlace será usado por Helena (IA) para agendar citas automáticamente.
                    </p>
                </div>

                <button
                    onClick={saveSettings}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                    Sincronizar Agenda
                </button>
            </div>
        </div>
    );
}