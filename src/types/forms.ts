


export interface ILoginForm {
    username :string,
    phoneNumber: string,
    password?: string,
    emaile: number|string,
    captchaText?: number|string,
}

export interface IRegisterForm {
    username :string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    captchaText?: number|string,
}