type loginType = "simple" | "withCaptcha" | "withSms";

export interface LoginRequest {
  username: string;
  password: string;
  captchaText?: string;
  type?: loginType;
}
export const defaultLoginForm: LoginRequest = {
  username: "",
  password: "",
  type: "simple",
};

export interface IRegister {
  phoneNumber: string;
  fullName: string;
  nationalCode: string;
  captchaText?: string;
  password?: string;
}
export const defaultRegisterForm: IRegister = {
  phoneNumber: "",
  fullName: "",
  nationalCode: "",
  captchaText: "",
  password: "",
};

export interface ISendSmsRequest {
  phoneNumber: string;
  captchaText?: string;
}
export interface ISendSmsForm {
  phoneNumber: string;
  captchaText?: string;
}
export const defaultSendSmsForm: ISendSmsForm = {
  phoneNumber: "",
  captchaText: "",
};
export interface IConfirmSmsForm {
  phoneNumber: string;
  code: string[];
  captchaText?: string;
}
export const defaultConfirmSmsForm: IConfirmSmsForm = {
  phoneNumber: "",
  code: ["", "", "", "", "", ""],
  captchaText: "",
};

export interface IChangePasswordForm {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  captchaText: string;
}
export const defaultChangepasswordForm: IChangePasswordForm = {
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  captchaText: "",
};
export type { loginType };
