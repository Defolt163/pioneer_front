import { apiClient } from '@/api/client'

const DEMO_MODE = true
const DEMO_CODE = '4444'

export const authService = {
  sendEmailCode: async (email) => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 600))
      console.log(`[DEMO] Код для ${email}: ${DEMO_CODE}`)
      return { success: true }
    }
    return apiClient.post('/auth/send-code', { email })
  },

  verifyEmailCode: async (email, code) => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 600))
      if (code === DEMO_CODE) {
        return { token: 'demo-token-12345' }
      }
      throw new Error('Неверный код')
    }
    return apiClient.post('/auth/verify-code', { email, code })
  },

  logout: async () => {
    if (DEMO_MODE) return { success: true }
    return apiClient.post('/auth/logout')
  },
}
