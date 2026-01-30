// src/app/api/login/google/callback/route.ts
export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    // ... validación de cookies de estado ...

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokens.accessToken}` }
    });
    const googleUser = await googleUserResponse.json();

    // 1. Buscamos si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email: googleUser.email } });

    if (existingUser) {
        const session = await lucia.createSession(existingUser.id, {});
        return Response.redirect(new URL("/doctor", request.url));
    }

    // 2. Si es nuevo, lo creamos (Por defecto como Médico para esta fase)
    const newUser = await prisma.user.create({
        data: {
            id: generateId(15),
            email: googleUser.email,
            role: "DOCTOR",
            countryIso: "VE", // Esto debería venir de una cookie de pre-selección
            doctorProfile: {
                create: {
                    licenseId: "PENDING_VERIFICATION_" + Date.now(),
                    dr7Id: `dr7_${googleUser.sub}`
                }
            }
        }
    });

    const session = await lucia.createSession(newUser.id, {});
    return Response.redirect(new URL("/doctor/setup", request.url));
}