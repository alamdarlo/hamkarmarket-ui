
import api from '@/shared/lib/api-client'
import type { IChangePasswordForm, IRegister, ISendSmsRequest, LoginRequest, LoginResponse } from '../types'

export const loginApi = async (req: any): Promise<any> => {
  let result: any;
  debugger
  let data;
  switch (req.type) {
    case 'simple':
      data={username: req.data.username,password:req.data.password}
      result = await api.post<any>('/api/account/simpleLogin',data)
      break;
   case 'withCaptcha':
    data={username: req.data.username,password: req.data.password,captchaText:req.data.captchaText}
      result = await api.post<any>('/api/account/loginWithCaptcha',data,req.captchaKey)
      break;
   case 'withSms':
    data={phoneNumber: req.data.phoneNumber,smsCode: req.data.smsCode,captchaText:req.captchaText}
      result = await api.post<any>('/api/account/loginWithSms',data,req.captchaKey)
      break;
    default:
      data={username: req.data.username,password: req.data.password}
      result = await api.post<any>('/api/account/simpleLogin',data as LoginRequest)
  }
  
  return result // فقط user info
}

export const sendSmsCode = async (data:ISendSmsRequest,captchaKey:string): Promise<any> => {
  debugger
    const res= await api.post('/api/account/request-sms-code',data,captchaKey)
    return res;
}

export const verifySmsCode = async (data: {phoneNumber: string; smsCode: string;}): Promise<any> => {
  const res = await api.post("/api/account/loginWithSms", data);
  return res;
};

export const register = async (data:IRegister,captchaKey:string): Promise<any> => {
  debugger
    const res= await api.post('/api/account/register',data,captchaKey)
    return res;
}


export const changePassword = async (data:IChangePasswordForm,captchaKey:string): Promise<any> => {
  debugger
    const res= await api.post('/api/account/change-password',data,captchaKey)
    return res;
}