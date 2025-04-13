import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  const currentPath = request.nextUrl.pathname

  const accessToken = request.cookies.get('accessToken')?.value
  const authRoute = currentPath.startsWith('/auth') || currentPath === '/'
  const publicRoute = currentPath.startsWith('/hub')

  headers.set('current-path', currentPath)

  if (accessToken && authRoute) {
    return NextResponse.redirect(new URL('/restaurants', request.url))
  }

  if (!accessToken && !authRoute && !publicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next({ headers })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
