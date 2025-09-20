import { ILoginForm, ISendSmsForm } from "@/app/(auth)/types";
import { IRegisterForm } from "@/types/forms";


export const defaultLoginForm: ILoginForm = {
    phoneNumber: '',
    password: '',
    captchaText: ''
}

export const defaultSendSmsForm: ISendSmsForm = {
    phoneNumber: '',
    captchaText: ''
}

export const defaultRegisterForm: IRegisterForm = {
    username: '',   
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    captchaText: ''
}
