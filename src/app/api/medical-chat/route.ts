import { xai } from '@ai-sdk/xai';
import { streamText, tool } from 'ai'; // Importamos 'tool'
import { prisma } from '@/lib/prisma';
import { z } from 'zod'; // Para validación de esquemas

export async function POST(req: Request) {
    const { messages, patientId } = await req.json();

    const result = await streamText({
        model: xai('grok-beta'),
        system: `Eres Helena, el agente médico de OpenClaw para Visionary AI.
        Tienes permiso para:
        1. Consultar biométricos en tiempo real.
        2. Generar alertas de urgencia.
        3. Coordinar agendamientos vía Cal.com.`,
        messages,
        tools: {
            // HERRAMIENTA 1: Consultar historial profundo
            getPatientHistory: tool({
                description: 'Obtiene el historial clínico extendido del paciente',
                parameters: z.object({
                    limit: z.number().default(10),
                }),
                execute: async ({ limit }) => {
                    return await prisma.biometricData.findMany({
                        where: { patientId },
                        take: limit,
                        orderBy: { timestamp: 'desc' },
                    });
                },
            }),
            // HERRAMIENTA 2: Activar Alerta de Protocolo OpenClaw
            triggerMedicalAlert: tool({
                description: 'Activa una alerta visual de urgencia en la interfaz',
                parameters: z.object({
                    severity: z.enum(['warning', 'danger']),
                    reason: z.string(),
                }),
                execute: async ({ severity, reason }) => {
                    // Aquí podrías disparar un webhook a OpenClaw para notificar al doctor
                    return { status: 'alert_active', severity, reason };
                },
            }),
        },
    });

    return result.toDataStreamResponse();
}
