
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/auth';
import { ILoginForm } from '../types';

class AuthService {

     loginWithPassword =async (model:ILoginForm):Promise<ApiResponse>=> {
        debugger
      return await api.post('/api/account/loginWithPassword',{password:'1245',phoneNumber:'125454'},model.captchaText)
      
    }

}

export  const authService =new AuthService();