import { apiClient } from '@/api/client'

// Сервис для работы с организациями-партнёрами

export const organizationService = {
  // Отправить заявку на подключение организации к агрегатору
  sendConnectionRequest: (formData) =>
    apiClient.post('/organizations/connect', formData),

  // Получить статус заявки на подключение
  getConnectionStatus: () =>
    apiClient.get('/organizations/connect/status'),

  // Получить список всех заявок (только для администратора)
  getAllRequests: (status) =>
    apiClient.get(`/organizations/connect/requests?status=${status}`),

  // Изменить статус заявки (только для администратора)
  updateRequestStatus: (id, status) =>
    apiClient.put(`/organizations/connect/requests/${id}`, { status }),
}
