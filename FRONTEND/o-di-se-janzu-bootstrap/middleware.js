import { NextResponse } from "next/server";

export function middleware(request) {
  const refreshtoken = request.cookies.get("refreshtoken")?.value;
  const { pathname } = request.nextUrl;

  // Si l'user est déja connecté et essai d'accéder au login on redirige diirect vers le dash
  if (pathname === "/admin/login" && refreshtoken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Si l'user n'est pas connecté et essaie d'accéder au dash, redirection vers le login

  if (pathname.startsWith("/admin/dashboard") && !refreshtoken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// middleware actif uniquement sur les routes admin
export const config = {
  matcher: ["/admin/:path*"],
};
