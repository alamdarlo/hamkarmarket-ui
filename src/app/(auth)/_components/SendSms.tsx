// src/components/forms/LoginForm.tsx
'use client';
import { Controller, useForm } from 'react-hook-form';
import CaptchaImg from '../../../components/ui/CaptchaImg';
import { LucideUserCircle2 } from 'lucide-react';
import Phone from '@mui/icons-material/Phone';
import { LucideCaptions } from 'lucide-react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import { ISendSmsForm } from '../types';
import { authService } from '../services/AuthService';
import { CaptchaHandle } from '@/types/commonTypes';
import { defaultSendSmsForm } from '../consts/defaultForms';

type props = {
  timeLeft: number,
  isCounting: boolean
  startCount: (duration: number) => void
  setSmsKey: (key: string) => void
}

export default function SendSms(prop: props) {
  const captchaRef = useRef<CaptchaHandle>(null);

  useEffect(() => {
    prop.setSmsKey('')
  
    return () => {
    }
  }, [])
  

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISendSmsForm>({ defaultValues: defaultSendSmsForm, mode: 'all', reValidateMode: 'onBlur' });


  const onSubmit = async (data: ISendSmsForm) => {
    setGeneralError([]);
    setLoading(true);
    if (captchaRef.current) {

      const captchaKey = captchaRef.current.getCaptchaKey();
      authService.sendSmsCode(data, captchaKey).then(function (result) {
        prop.startCount(120);

        if (!result.isSuccess) {
          setGeneralError(result?.errors! || ['خطايي رخ داده است لطفا بعدا تلاش نماييد']);
        }
        else {
          console.log(result)
          const key = result.data?.key
          prop.setSmsKey(key)
        }
      })
        .catch(function (error: any) {
          if (error.code == "ERR_NETWORK") {
            console.log(error)
          }
        }).finally(function () {
          setLoading(false);
        })
    }
  }
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetForm = async () => {
    setGeneralError([]);
    setLoading(false);
    reset(defaultSendSmsForm);
  }

  return (
    <>
      <div className=" justify-center items-center " >
        <div>
          <div className="text-center flex justify-center mt-3">
            <LucideUserCircle2 className="size-20 mr-2 flex" fontSize={10} fontWeight={10} />
          </div><strong className='flex justify-center text-2xl pr-5'>ورود كاربر</strong>
          <h1>
            <p className="text-center   text-xl">

            </p>
          </h1>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 grid-rows-4 mt-5 bg-white" >
            <div className="grid col-span-10 col-start-2 h-[72px]" >
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: 'شماره موبايل اجباريست', pattern: {
                    value: /^09[0-9]{9}$/,
                    message: 'شماره موبايل  صحيح نمي باشد'
                  }
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message as string}
                    type="tel"
                    id="phoneNumber"
                    size='small'
                    label="شماره موبايل"
                    variant="outlined"
                    slotProps={{
                      input: {
                        sx: { borderRadius: 100, padding: '1px 0px' },
                        startAdornment: (
                          <InputAdornment position="start" sx={{ height: '50px' }}>
                            <IconButton>
                              <Phone width={18} />
                            </IconButton>

                          </InputAdornment>
                        ),
                      },
                      inputLabel: {
                        shrink: true,
                        sx: { fontSize: '20px' }
                      },
                    }}
                    className=""
                  />
                )}
              />
            </div>

            <div className="grid col-span-10 col-start-2 h-[72px]">
              <Controller
                name="captchaText"
                control={control}
                defaultValue=""
                rules={{
                  required: 'حاصل عبارت اجباريست',
                  maxLength: 2,
                  minLength: 2,
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    error={!!errors.captchaText}
                    helperText={errors.captchaText?.message as string}
                    id="captchaText"
                    type="text"
                    label="حاصل عبارت"
                    size="small"
                    slotProps={{
                      input: {
                        sx: { borderRadius: 100, padding: '1px 0px' },
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton><LucideCaptions width={18} /></IconButton>
                          </InputAdornment>
                        ),
                      },
                      inputLabel: {
                        shrink: true,
                        sx: { fontSize: '20px' }
                      },
                    }}
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="grid col-span-10 col-start-2 h-11 bg-gray-50" dir='ltr' >
              <CaptchaImg ref={captchaRef} />
            </div>
            <div className="grid col-span-10 col-start-2 h-14 bg-gray-100 border border-gray-300 rounded-full">
              <Button
                type="submit"
                size='large'
                loading={loading}
                disabled={prop.isCounting}
                loadingPosition="center"
                loadingIndicator={`ارسال مجدد بعد از:  ${formatTime(prop.timeLeft)}`}
                variant="outlined"
                sx={{ borderRadius: 100 }}
                className="border border-gray-300 rounded-full"
              >
                {!prop.isCounting ? <span className="text-3xl">ارسال رمز</span> : <span className="text-2xl">{`ارسال مجدد بعد از:  ${formatTime(prop.timeLeft)}`}</span>}

              </Button>
            </div>
            <div className='grid col-span-12 '>
              <ul className='list-disc  list-inside  pr-5 wrap-normal text-base text-red-500'>
                {generalError && (
                  generalError.map((errorMsg: string, index: number) => {
                    return <li key={index} className='wrap-normal'> {errorMsg}</li>
                  })
                )}
              </ul>
            </div>
          </Box>
        </div >

      </div >

    </>
  );
}