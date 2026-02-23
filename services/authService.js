import { apiClient } from '@/api/client'

// Сервис авторизации: регистрация и вход по номеру телефона + SMS

export const authService = {
  // Отправить SMS-код на номер телефона
  sendSmsCode: (phone) =>
    apiClient.post('/auth/send-code', { phone }),

  // Подтвердить SMS-код и получить токен
  verifySmsCode: (phone, code) =>
    apiClient.post('/auth/verify-code', { phone, code }),

  // Выход из приложения
  logout: () =>
    apiClient.post('/auth/logout'),
}
