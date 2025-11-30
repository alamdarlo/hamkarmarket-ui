// src/components/forms/LoginForm.tsx
'use client';
import { Controller, ErrorOption, useForm } from 'react-hook-form';
import CaptchaImg from '../../../components/ui/CaptchaImg';
import { LucideUserCircle2 } from 'lucide-react';
import Phone from '@mui/icons-material/Phone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LucideCaptions } from 'lucide-react';
import { CaptchaHandle } from '@/types/commonTypes';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useRef, useState } from 'react';
import { ILoginForm } from '../types';
import { authService } from '../services/AuthService';
import { toast } from 'react-toastify';
import { defaultLoginForm } from '../_consts/defaultForms';

type props = {
  smsKey: string,
}
export default function LoginForm(prop:props) {
  const captchaRef = useRef<CaptchaHandle>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [generalError, setGeneralError] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getFieldState,
    setError,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({ defaultValues: defaultLoginForm, mode: 'all', reValidateMode: 'onBlur' });


  const onSubmit = async (data: ILoginForm) => {
    setGeneralError([]);
    setLoading(true);

    if (captchaRef.current) {

      const captchaKey = captchaRef.current.getCaptchaKey();

      authService.loginWithPassword(data,prop.smsKey, captchaKey).then(function (result) {

        if (!result.isSuccess){
          setGeneralError(result.errors! || ['خطايي رخ داده است لطفا بعدا تلاش نماييد']);

        }
        else
          alert('login success')
      })
        .catch(function (error: any) {
          if (error.code == "ERR_NETWORK")
            console.log(error)
        }).finally(function () {
          setLoading(false);
        })
    } else
      toast.error("خطا در گرفتن اطلاعات كپچاي تصويري")
  }

  const resetForm = async () => {
    setGeneralError([]);
    setLoading(false);
    reset(defaultLoginForm);
  }

  const sendSms = async () => {
    const phoneNumber = watch("phoneNumber")
    const errr = errors["phoneNumber"]
    const { isDirty, invalid } = getFieldState("phoneNumber")
    resetForm()
    reset({ ...defaultLoginForm, phoneNumber: phoneNumber });

    if (!isDirty || invalid) {
      setError("phoneNumber", errr as ErrorOption)
      console.log(phoneNumber)
    }
    else {
      console.log(phoneNumber)
    }
  }

  return (
      <div className=" justify-center items-center " >
        <div>
          <div className="text-center flex justify-center mt-3">
            <LucideUserCircle2 className="size-20 mr-2 flex" fontSize={10} fontWeight={10} />
          </div><strong className='flex justify-center text-2xl pr-5'>ورود كاربر</strong>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 grid-rows-5 mt-5 bg-white" >
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
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: ' رمز عبور اجباريست',
                  min: { value: 4, message: '2' },
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    label="رمز عبور"
                    size="small"
                    slotProps={{
                      input: {
                        sx: { borderRadius: 100, padding: '1px 0px' },
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                              }
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            {/* <LucideLock /> */}
                          </InputAdornment>
                        ),
                      },

                      inputLabel: {
                        shrink: true,
                        sx: { fontSize: '20px' }
                      },
                    }}
                    variant="outlined"
                    sx={{}}
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
                loadingPosition="center"
                variant="outlined"
                sx={{ borderRadius: 100 }}
                className="border border-gray-300 rounded-full"
              >
                <span className="text-3xl">ورود</span>
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
  );
}