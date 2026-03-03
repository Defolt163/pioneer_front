const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('pioneer_token') : null
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, config)

  // токен истёк или недействителен — разлогиниваем и редиректим на вход
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pioneer_user')
      localStorage.removeItem('pioneer_token')
      window.location.href = '/login'
    }
    throw new Error('Сессия истекла. Войдите снова.')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка сервера' }))
    throw new Error(error.message || `Ошибка ${response.status}`)
  }

  return response.json()
}

export const apiClient = {
  get: (endpoint, options) =>
    request(endpoint, { method: 'GET', ...options }),

  post: (endpoint, body, options) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),

  put: (endpoint, body, options) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),

  delete: (endpoint, options) =>
    request(endpoint, { method: 'DELETE', ...options }),
}
