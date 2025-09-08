// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { api } from '@/lib/api';
import { Captcha } from '@/types/commonTypes';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const CaptchaImg = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const [captcha, setCaptchaKey] = useState<Captcha>({ captchaCode: '', captchaImage: '' });

    useEffect(() => {
      refreshCaptcha()

    }, [])

    const refreshCaptcha = async () => {
      const res = await api.get<Captcha>('/captcha')
      setCaptchaKey(res as any);
    }

    return (
      <div className='w-full rounded-md border border-gray-300 flex justify-between'>
        <div className='flex w-1' ></div>
        <Image src={'data:image/jpeg;base64,' + captcha?.captchaImage} alt={'captcha image'} width={200} height={42} />
        <button
          type="button"
          className=" flex  items-center"
          onClick={() => refreshCaptcha()}
        >

          <RotateCcw className="h-6 w-7 text-green-500 mr-2" />
        </button>
      </div>
    );
  }
);

CaptchaImg.displayName = 'CaptchaImg';
export default CaptchaImg;