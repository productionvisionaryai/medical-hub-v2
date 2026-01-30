// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'Medical Hub V2 | Visionary AI',
    description: 'Plataforma Médica de Próxima Generación con Inteligencia Agéntica Helena.',
    manifest: '/manifest.json', // Recomendado para PWA médica
}

export const viewport: Viewport = {
    themeColor: '#2563eb',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1, // Evita el zoom molesto en inputs de iOS
    userScalable: false,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className={`${inter.variable} scroll-smooth`}>
            <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
                {/* Nexus Note: Aquí podrías envolver con Providers de Auth 
                   o QueryClient en el futuro.
                */}
                <main className="flex-grow">
                    {children}
                </main>

                {/* Footer Minimalista de Cumplimiento */}
                <footer className="py-4 border-t bg-white text-center">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                        © 2026 Visionary AI Labs • Secured by OpenClaw Technology
                    </p>
                </footer>
            </body>
        </html>
    )
}