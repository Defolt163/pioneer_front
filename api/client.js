// Базовый URL бэкенда — меняется в .env
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// Базовая функция для всех запросов
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Добавляем токен авторизации если есть
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, config)

  // Если сервер вернул ошибку
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка сервера' }))
    throw new Error(error.message || `Ошибка ${response.status}`)
  }

  return response.json()
}

// Методы для удобства
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
