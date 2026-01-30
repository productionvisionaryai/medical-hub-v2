import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { lucia } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Manejo de sesión para el middleware
  const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null;

  // Si no hay sesión, permitimos que continúe (el control de acceso se puede hacer en las páginas)
  // o podemos redirigir aquí si es una ruta protegida.

  let user = null;
  if (sessionId) {
    const { user: luciaUser } = await lucia.validateSession(sessionId);
    user = luciaUser;
  }

  // Lógica solicitada por el usuario: Control de Región para Doctores
  if (user && request.nextUrl.pathname.startsWith("/doctor")) {
    const region = request.cookies.get("x-medical-region")?.value;

    // Si la ISO del país del usuario no coincide con la región de la cookie
    if (user.countryIso !== region) {
      return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/doctor/:path*',
    '/api/:path*'
  ],
};
