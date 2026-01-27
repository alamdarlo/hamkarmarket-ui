// features/auth/queries/useLogin.ts
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { loginApi } from '../services/auth.service'
import { useAuthStore } from '../store/auth.store'
import type { LoginRequest, LoginResponse } from '../types'
import type { ApiError, ApiResponse } from '@/shared/types/api-error.type'
import { queryClient } from '@/shared/query/queryClient'
import { mapApiError } from '@/shared/lib/utils'

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation<ApiResponse<any>, AxiosError<ApiError>, any>({
    mutationFn: loginApi,

    onSuccess:(res) => {
      if(res.isSuccess)
        setUser(res.data)
    },

    onError: (error) => {
      const uiError = mapApiError(error)
    },
  })
}
