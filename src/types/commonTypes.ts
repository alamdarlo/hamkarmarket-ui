import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { arSD } from "@mui/x-data-grid/locales";

interface CaptchaHandle {
  getCaptchaKey: () => string;
  refreshCaptcha: () => Promise<void>;
}


interface IResult {
    data: any | null | undefined;
    status: number;
    message?: string;
    success: boolean;

}
export class Result implements IResult {
    data: any | null;
    status: number;
    message?: string;
    success: boolean
    constructor(data: any | null, status: number, success: boolean, message?: string) {
        this.data = data;
        this.status = status;
        this.success = success;
        this.message = message;
    }
}

export class KeyValue {
    id?: number | string;
    value?: string;
    key?:string;
    constructor(id?: number | string, value?: string, key?: string) {
        this.id = id;
        this.value = value;
        this.key = key;
    }
}
type keyval = Record<string, number | string>;
type hhh=Map<string, number>
type hhdh= Set<number>

export class Captcha {
    captchaCode: string;
    captchaImage: string;
    constructor(captchaCode: string,captchaImage: string) {
        this.captchaCode = captchaCode;
        this.captchaImage = captchaImage;
    }
}
export class selectedRows {
    gridId: string;
    Ids: string[];
    constructor(gridId: string,ids: string[]) {
        this.gridId = gridId;
        this.Ids = ids;
    }
}

export class ExpandedKeyValue {
    id?: number | string;
    value?: boolean;
    constructor(id?: number | string, value?: boolean) {
        this.id = id;
        this.value = value;
    }
}
export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  type GridActions = 'Edit' | 'Delete' | 'Cancel' | 'Save';
  export type { IResult, GridActions,CaptchaHandle }