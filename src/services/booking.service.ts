// src/services/booking.service.ts (Lógica de servidor)
import { prisma } from "@/lib/prisma";

export const getDoctorAvailability = async (doctorId: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
        select: { calLink: true }
    });

    if (!doctor?.calLink) return null;

    // Aquí OpenClaw podría consultar directamente la API de Cal.com
    return `https://cal.com/${doctor.calLink}`;
};