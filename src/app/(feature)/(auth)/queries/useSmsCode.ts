// features/auth/queries/useLogin.ts
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import {  sendSmsCode } from '../services/auth.service'

import type { ApiError } from '@/shared/types/api-error.type'


export const useSendSms = () => {
  return useMutation<any, AxiosError<ApiError>, {data: any;captchaKey: string;}>({
    mutationFn: ({ data, captchaKey }) =>sendSmsCode(data, captchaKey),
  });
};
