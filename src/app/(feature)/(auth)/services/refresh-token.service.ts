import api from '@/shared/lib/api-client'
import type { LoginResponse } from '../types'

export const refreshTokenApi = async (): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(
    '/api/account/refresh-token',
  )

  return res.data
}