
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/auth';
import { ILoginForm, ISendSmsForm } from '../types';

class AuthService {

     loginWithPassword =async (model:ILoginForm,captchaCode: string):Promise<ApiResponse>=> {
        debugger
      return await api.post('/api/account/loginWithPassword',{password:'1245',phoneNumber:'125454'},captchaCode)
    }
     sendSmsCode =async (model:ISendSmsForm,captchaCode: string):Promise<ApiResponse>=> {
        debugger
      return await api.post('/api/account/request-sms-code',model,captchaCode)
    }
}

export  const authService =new AuthService();