// src/app/doctor/verify/page.tsx
import { ShieldAlert, Clock, CheckCircle } from "lucide-react";

export default function VerifyPage({ status = "PENDING" }: { status: 'PENDING' | 'REJECTED' }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
                {status === "PENDING" ? (
                    <Clock className="w-12 h-12 text-blue-600 animate-pulse" />
                ) : (
                    <ShieldAlert className="w-12 h-12 text-red-600" />
                )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
                {status === "PENDING" ? "Verificación en Proceso" : "Acceso Restringido"}
            </h1>
            <p className="mt-4 text-slate-600 max-w-md">
                {status === "PENDING"
                    ? "Grok y Dr7 AI están validando tus credenciales con el registro nacional. Esto suele tardar menos de 24 horas."
                    : "No pudimos validar tu licencia médica. Por favor, contacta a soporte o revisa tus datos."}
            </p>
        </div>
    );
}