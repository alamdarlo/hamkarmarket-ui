import { IChangePasswordForm, ILoginForm, ISendSmsForm } from "../types"

export const defaultLoginForm: ILoginForm = {
    phoneNumber: '',
    password: '',
    captchaText: ''
}

export const defaultSendSmsForm: ISendSmsForm = {
    phoneNumber: '',
    captchaText: ''
}

export const defaultChangepasswordForm: IChangePasswordForm = {
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    captchaText: ''
}