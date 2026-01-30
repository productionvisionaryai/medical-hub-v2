import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Blink envía los datos del pago aquí
        const { paymentHash, amount, status, patientId } = body;

        if (status === 'SUCCESS') {
            // Registramos el aporte en la ficha del paciente
            await prisma.payment.create({
                data: {
                    hash: paymentHash,
                    amount: amount,
                    patientId: patientId,
                    type: 'LIGHTNING_TIP'
                }
            });
            console.log(`✅ Pago recibido de ${amount} sats para el paciente ${patientId}`);
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
    }
}
