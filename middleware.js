import { NextResponse } from 'next/server'

// простая проверка JWT без verify
function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1]
        const payload = JSON.parse(atob(base64Payload))
        return payload
    } catch {
        return null
    }
}

export function middleware(request) {
    const { pathname } = request.nextUrl

    if (isPublicPath(pathname)) {
        return NextResponse.next()
    }

    const accessToken = request.cookies.get('pioneer_token')?.value

    if (!accessToken) {
        return redirectToLogin(request)
    }

    const payload = parseJwt(accessToken)

    if (!payload) {
        return redirectToLogin(request)
    }

    // проверка expiration
    const now = Math.floor(Date.now() / 1000)

    if (payload.exp < now) {
        return redirectToLogin(request)
    }

    return NextResponse.next()
}

function redirectToLogin(request) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
}

function isPublicPath(pathname) {
    return ['/login', '/_next', '/favicon.ico'].some(path =>
        pathname.startsWith(path)
    )
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}