import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get('accessToken')?.value
  // const authRoute = currentPath.startsWith('/auth') || currentPath === '/'
  // const publicRoute = currentPath.startsWith('/hub')

  // if (accessToken && authRoute) {
  //   return NextResponse.redirect(new URL('/restaurants', request.url))
  // }

  // if (!accessToken && !authRoute && !publicRoute) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  response.headers.set('current-path', request.nextUrl.pathname)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
