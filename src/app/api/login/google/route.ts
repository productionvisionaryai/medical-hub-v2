// src/app/api/login/google/route.ts
import { google, lucia } from "@/lib/auth";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";

export async function GET() {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, []);
    url.searchParams.set("scope", "profile email");

    const cookieStore = await cookies();
    cookieStore.set("google_oauth_state", state, { path: "/", secure: true, httpOnly: true });
    cookieStore.set("google_code_verifier", codeVerifier, { path: "/", secure: true, httpOnly: true });

    return Response.redirect(url);
}