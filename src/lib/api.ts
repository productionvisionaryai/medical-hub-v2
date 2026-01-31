import { Doctor } from '@/components/HeroSection';

// Mock data for development - replace with actual database calls
const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    slug: 'juan-perez',
    especialidad: 'Cardiología',
    titulo: 'Médico Cardiólogo',
    bio: 'Especialista en enfermedades del corazón con más de 15 años de experiencia.',
    ubicacion: 'Ciudad de Guatemala',
    email: 'dr.juanperez@ejemplo.com',
    telefono: '+502 1234 5678',
    calendlyUrl: 'https://calendly.com/dr-juan-perez',
    websiteUrl: 'https://drjuanperez.com',
    linkedinUrl: 'https://linkedin.com/in/drjuanperez',
    tono: 'Profesional y técnico',
  },
  {
    id: '2',
    nombre: 'María García',
    slug: 'maria-garcia',
    especialidad: 'Pediatría',
    titulo: 'Médica Pediatra',
    bio: 'Especialista en cuidados de la salud infantil desde recién nacidos hasta adolescentes.',
    ubicacion: 'Antigua Guatemala',
    email: 'dra.mariagarcia@ejemplo.com',
    telefono: '+502 2345 6789',
    calendlyUrl: 'https://calendly.com/dra-maria-garcia',
    tono: 'Cálido y protector',
  },
  {
    id: '3',
    nombre: 'Roberto López',
    slug: 'roberto-lopez',
    especialidad: 'Dermatología',
    titulo: 'Médico Dermatólogo',
    bio: 'Especialista en tratamientos de la piel, estética y cirugía dermatológica.',
    ubicacion: 'Ciudad de Guatemala',
    email: 'dr.robertolopez@ejemplo.com',
    calendlyUrl: 'https://calendly.com/dr-roberto-lopez',
    tono: 'Profesional y técnico',
  },
];

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // In production, replace with actual database query:
  // return prisma.doctor.findUnique({ where: { slug } });

  const doctor = MOCK_DOCTORS.find((d) => d.slug === slug);
  return doctor || null;
}

export async function getAllDoctors(): Promise<Doctor[]> {
  // In production, replace with actual database query:
  // return prisma.doctor.findMany();

  return MOCK_DOCTORS;
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  // In production, replace with actual database query:
  // return prisma.doctor.findUnique({ where: { id } });

  const doctor = MOCK_DOCTORS.find((d) => d.id === id);
  return doctor || null;
}

// Función para generar el system prompt del asistente médico
export function generateMedicalAssistantPrompt(doctor: Doctor): string {
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
  4. Sé empático y escucha las preocupaciones del paciente.
  5. Usa un lenguaje claro y accesible, evitando jerga médica innecesaria.
  6. Si el paciente tiene una emergencia, recomiéndale buscar atención inmediata.
  `.trim();
}
