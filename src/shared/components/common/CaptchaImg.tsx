// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { RotateCcw } from 'lucide-react';
import Image from 'next/image';
import {
  Button,
} from "@mui/material";
import { Captcha, CaptchaHandle } from '@/shared/types/commonTypes';
import api from '@/shared/lib/api-client';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const CaptchaImg = forwardRef<CaptchaHandle, InputProps>(({ className, error, ...props }, ref) => {
  const [captcha, setCaptchaKey] = useState<Captcha>({ id: '', imageData: '' });

  useEffect(() => {
    refreshCaptcha()
  }, [])


  useImperativeHandle(ref, () => ({
    getCaptchaKey: () => captcha.id,
    refreshCaptcha: refreshCaptcha
  }), [captcha.imageData]);

  const refreshCaptcha = async () => {
    const res = await api.get<Captcha>('/captcha')
    setCaptchaKey(res as any);
  }

  return (
    <div className='w-full rounded-md   flex justify-center text-center'>
      <div className=' w-1' ></div>
      <Image src={'data:image/jpeg;base64,' + captcha?.imageData} alt={'captcha image'} width={200} height={42} />
      <Button
        type="button"
        variant="text"
        className="text-center  p-3.5  hover:cursor-pointer click:"
        onClick={() => refreshCaptcha()}
      >

        <RotateCcw className="h-6 hover:text-lg" />
      </Button>
    </div>
  );
}
);

CaptchaImg.displayName = 'CaptchaImg';
export default CaptchaImg;