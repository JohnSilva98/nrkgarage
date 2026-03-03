import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 🔓 Rotas públicas
  const publicRoutes = ["/"];

  // Se for rota pública, deixa passar
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Se não estiver autenticado, redireciona
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};