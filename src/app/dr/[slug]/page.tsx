import HeroSection, { Doctor } from '@/components/HeroSection';
import ModernChat from '@/components/chat/ModernChat';
import { getDoctorBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // In production, fetch all doctor slugs from the database
  // const doctors = await getAllDoctors();
  // return doctors.map((doctor) => ({ slug: doctor.slug }));
  
  // For static export, return known slugs
  return [
    { slug: 'juan-perez' },
    { slug: 'maria-garcia' },
    { slug: 'roberto-lopez' },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: 'Doctor No Encontrado',
    };
  }

  return {
    title: `Dr. ${doctor.nombre} - ${doctor.especialidad}`,
    description: doctor.bio || `Perfil del Dr. ${doctor.nombre}, ${doctor.especialidad}`,
    openGraph: {
      title: `Dr. ${doctor.nombre} - ${doctor.especialidad}`,
      description: doctor.bio || `Perfil del Dr. ${doctor.nombre}, ${doctor.especialidad}`,
      images: doctor.imagenUrl ? [doctor.imagenUrl] : [],
    },
  };
}

// Ejemplo de cómo construir el prompt según el doctor
function getSystemPrompt(doctor: Doctor): string {
  const tonoPersonalidad = doctor.especialidad === 'Pediatría' 
    ? 'Cálido y protector' 
    : 'Profesional y técnico';
  
  return `
  Eres el asistente médico inteligente de: ${doctor.nombre}.
  Especialidad: ${doctor.especialidad}.
  Ubicación: ${doctor.ubicacion}.
  Tu tono debe ser: ${tonoPersonalidad}.
  
  Instrucciones críticas:
  1. Si el paciente pregunta por costos, dile que varían según el caso pero puede agendar una evaluación.
  2. Tu objetivo final es que el paciente use el botón de reserva de Cal.com.
  3. No des diagnósticos definitivos, siempre sugiere la consulta presencial.
  `.trim();
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  // Generar el system prompt para el asistente médico
  const systemPrompt = getSystemPrompt(doctor);
  
  // Log para debugging (en desarrollo)
  console.log('System Prompt para el asistente:', systemPrompt);

  // Extraer el Cal.com link del full URL o usar un formato por defecto
  const getCalLink = (url?: string) => {
    if (!url) return 'visionary-ai/consulta';
    // Extraer el path de la URL (ej: https://calendly.com/dr-juan-perez -> dr-juan-perez)
    return url.replace('https://calendly.com/', '');
  };

  return (
    <main>
      <HeroSection doctor={doctor} />
      
      {/* Chat con Asistente IA personalizado */}
      <section className="chat-section" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <ModernChat 
          patientId="demo-patient" // En producción, obtener del contexto de autenticación
          doctorName={doctor.nombre}
          doctorCalLink={getCalLink(doctor.calendlyUrl)}
          systemInstructions={systemPrompt}
        />
      </section>
      
      {/* Debug: Mostrar el system prompt en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <section className="debug-section" style={{ padding: '2rem', background: '#f5f5f5', marginTop: '2rem' }}>
          <h2>Debug: System Prompt del Asistente</h2>
          <pre style={{ background: '#333', color: '#0f0', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
            {systemPrompt}
          </pre>
        </section>
      )}
      
      {/* Aquí puedes agregar más secciones como: */}
      {/* - Servicios ofrecidos */}
      {/* - Testimonios de pacientes */}
    </main>
  );
}
