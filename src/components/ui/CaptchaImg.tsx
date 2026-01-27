// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { api } from '@/lib/api';
import { Captcha, CaptchaHandle } from '@/types/commonTypes';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const CaptchaImg = forwardRef<CaptchaHandle, InputProps>(({ className, error, ...props }, ref) => {
  const [captcha, setCaptchaKey] = useState<Captcha>({ captchaCode: '', captchaImage: '' });

  useEffect(() => {
    refreshCaptcha()
  }, [])


  useImperativeHandle(ref, () => ({
    getCaptchaKey: () => captcha.captchaCode,
    refreshCaptcha: refreshCaptcha
  }), [captcha.captchaCode]);

  const refreshCaptcha = async () => {
    const res = await api.get<Captcha>('/captcha')
    setCaptchaKey(res as any);
  }

  return (
    <div className='w-full rounded-md   flex justify-center text-center'>
      <div className=' w-1' ></div>
      <Image src={'data:image/jpeg;base64,' + captcha?.captchaImage} alt={'captcha image'} width={200} height={42} />
      <button
        type="button"
        className="text-center  p-3.5 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black"
        onClick={() => refreshCaptcha()}
      >

        <RotateCcw className="h-6 " />
      </button>
    </div>
  );
}
);

CaptchaImg.displayName = 'CaptchaImg';
export default CaptchaImg;