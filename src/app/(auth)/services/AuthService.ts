
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/auth';
import { ILoginForm, ISendSmsForm } from '../types';

class AuthService {

     loginWithPassword =async (model:ILoginForm,smsKey: string,captchaCode: string):Promise<ApiResponse>=> {
        debugger
      return await api.post('/api/account/loginWithPassword',{...model,smsKey},captchaCode)
    }
     sendSmsCode =async (model:ISendSmsForm,captchaCode: string):Promise<ApiResponse>=> {
        debugger
      return await api.post('/api/account/request-sms-code',model,captchaCode)
    }
}

export  const authService =new AuthService();