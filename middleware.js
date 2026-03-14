import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose' // рекомендуемая библиотека для работы с JWT в middleware

// Пути, которые не требуют аутентификации
const publicPaths = [
    '/login',
    '/_next/static',
    '/favicon.ico',
]

export async function middleware(request) {
    const { pathname } = request.nextUrl
    
  // Проверяем, является ли путь публичным
    if (isPublicPath(pathname)) {
        return NextResponse.next()
    }

  // Получаем токены из cookies
    const accessToken = request.cookies.get('pioneer_token')?.value
    const refreshToken = request.cookies.get('pioneer_refresh_token')?.value

    const response = await fetch('http://localhost:8000/api/users/me/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    if(response.ok){
      
    }else if(response.status == 401){
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('from', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Для страниц перенаправляем на логин
    
    }

    // Функция для проверки публичных путей
function isPublicPath(pathname) {
    return publicPaths.some(path =>
        pathname.startsWith(path)
    )
}

// Функция для обновления токена
async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
        })

        if (response.ok) {
        const data = await response.json()
        return data
        }
        return null
    } catch (error) {
        console.error('Refresh token error:', error)
        return null
    }
}

// Настройка matching путей
export const config = {
    matcher: [
        /*
        * Match all request paths except:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - public files (public directory)
        */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
}