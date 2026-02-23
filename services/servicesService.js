import { apiClient } from '@/api/client'

// Сервис для работы с услугами (мойка, шиномонтаж)

export const servicesService = {
  // Получить список всех услуг
  getAll: () =>
    apiClient.get('/services'),

  // Получить организации по выбранной услуге и городу
  getOrganizations: (serviceId, city) =>
    apiClient.get(`/services/${serviceId}/organizations?city=${city}`),

  // Получить состав работ организации по услуге
  getServiceDetails: (serviceId, organizationId) =>
    apiClient.get(`/services/${serviceId}/organizations/${organizationId}/details`),

  // Получить доступное время для записи
  getAvailableSlots: (organizationId, date) =>
    apiClient.get(`/organizations/${organizationId}/slots?date=${date}`),
}
