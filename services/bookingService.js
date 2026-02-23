import { apiClient } from '@/api/client'

// Сервис для работы с заявками на оказание услуг

export const bookingService = {
  // Создать заявку на запись
  create: (bookingData) =>
    apiClient.post('/bookings', bookingData),

  // Получить список заявок (для организации)
  getAll: () =>
    apiClient.get('/bookings'),

  // Получить заявку по ID
  getById: (id) =>
    apiClient.get(`/bookings/${id}`),

  // Изменить статус заявки (для организации: подтвердить / отклонить)
  updateStatus: (id, status) =>
    apiClient.put(`/bookings/${id}/status`, { status }),
}
