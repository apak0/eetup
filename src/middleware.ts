import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)

  const accessToken = request.cookies.get('accessToken')?.value
  const authRoute = request.nextUrl.pathname.startsWith('/auth')
  const publicRoute = request.nextUrl.pathname.startsWith('/public') || request.nextUrl.pathname === ''

  headers.set('current-path', request.nextUrl.pathname)

  if (accessToken && authRoute) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (!accessToken && !authRoute && !publicRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next({ headers })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
