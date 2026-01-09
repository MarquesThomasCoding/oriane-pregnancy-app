import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Liste des routes accessibles SANS être connecté.
// NOTE : "/" n'est PAS ici, donc elle sera protégée par défaut.
const publicRoutes = ["/nutrition", "/faq", "/login", "/signup"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Vérifier si l'utilisateur est connecté
  // Adaptez le nom du cookie selon votre auth (ex: "session", "supabase-auth-token", etc.)
  const hasSession = request.cookies.has("user-id")

  // 2. Vérifier si la route demandée est publique
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // 3. LOGIQUE DE PROTECTION
  // Si l'utilisateur n'est PAS connecté et tente d'accéder à une route protégée (comme "/")
  if (!hasSession && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url)
    // On ajoute un callback pour revenir sur la page demandée après connexion
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 4. (Optionnel mais recommandé) Redirection inverse
  // Si l'utilisateur EST connecté et essaie d'aller sur /login, on le renvoie sur l'accueil
  if (hasSession && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Le matcher exclut les fichiers statiques pour ne pas ralentir le chargement des images/assets
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg).*)"],
}