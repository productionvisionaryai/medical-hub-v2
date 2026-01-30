// src/app/doctor/page.tsx
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { Activity, Users, Clock, CreditCard } from 'lucide-react';

export default async function DoctorDashboard() {
    const cookieStore = await cookies();
    const region = cookieStore.get('x-medical-region')?.value || 'GLOBAL';

    // Simulación de ID de Doctor (En prod vendría de Lucia Auth)
    const currentDoctorId = "doctor-uuid-here";

    // Consulta de alto rendimiento con Prisma
    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId: currentDoctorId,
            // El aislamiento geográfico ocurre aquí y en el Middleware
        },
        include: {
            patient: {
                include: { user: true, biometrics: { take: 1, orderBy: { timestamp: 'desc' } } }
            }
        },
        orderBy: { scheduledAt: 'asc' },
        take: 5
    });

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Bienvenido, Dr.</h1>
                <p className="text-slate-500">Región: <span className="font-mono bg-blue-100 px-2 py-1 rounded text-sm text-blue-700">{region}</span></p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={<Users />} label="Pacientes Activos" value="12" />
                <StatCard icon={<Clock />} label="Citas para hoy" value="4" />
                <StatCard icon={<CreditCard />} label="Pendiente de cobro (Sats)" value="45,000" />
            </div>

            {/* Upcoming Appointments Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="font-semibold text-lg text-slate-800">Próximas Citas</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4">Paciente</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Último Biométrico (HR)</th>
                                <th className="px-6 py-4">Hora</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {appointments.map((appt) => (
                                <tr key={appt.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 font-medium">{appt.patient.user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${appt.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {appt.patient.biometrics[0]?.value || '--'} BPM
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">
                                        {new Date(appt.scheduledAt).toLocaleTimeString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
            <div>
                <p className="text-sm text-slate-500 font-medium">{label}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}