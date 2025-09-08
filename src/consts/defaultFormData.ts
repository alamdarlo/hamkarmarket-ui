import { ILoginForm, IRegisterForm } from "@/types/forms";


export const defaultLoginForm: ILoginForm = {
    phoneNumber: '',
    username: '',
    password: '',
    emaile: '',
    captchaText: ''
}

export const defaultRegisterForm: IRegisterForm = {
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    captchaText: ''
}
