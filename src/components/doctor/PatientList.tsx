// src/components/doctor/PatientList.tsx
import { prisma } from "@/lib/prisma";

export const PatientList = async ({ doctorId }: { doctorId: string }) => {
    const patients = await prisma.patient.findMany({
        where: { doctors: { some: { id: doctorId } } },
        include: {
            user: true,
            biometrics: { take: 1, orderBy: { timestamp: 'desc' } }
        }
    });

    return (
        <div className="grid gap-4">
            {patients.map(p => (
                <div key={p.id} className="p-4 bg-white rounded-xl border flex justify-between items-center shadow-sm">
                    <div>
                        <p className="font-bold text-slate-900">{p.user.email}</p>
                        <p className="text-xs text-slate-500">ID: {p.id.slice(0, 8)}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-medium text-blue-600">
                            Último Pulso: {p.biometrics[0]?.value || "--"} BPM
                        </span>
                        <p className="text-[10px] text-slate-400">Sincronizado hace 5 min</p>
                    </div>
                </div>
            ))}
        </div>
    );
};