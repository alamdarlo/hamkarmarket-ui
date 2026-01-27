
interface CaptchaHandle {
  getCaptchaKey: () => string;
  refreshCaptcha: () => Promise<void>;
}
export class Captcha {
    id: string;
    imageData: string;
    constructor(id: string,imageData: string) {
        this.id = id;
        this.imageData = imageData;
    }
}

  export type { CaptchaHandle }