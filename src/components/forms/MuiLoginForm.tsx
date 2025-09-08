// src/components/forms/LoginForm.tsx
'use client';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Input from '@/components/ui/Input';
import CaptchaImg from '../ui/CaptchaImg';
import { ILoginForm } from '@/types/forms';
import { defaultLoginForm } from '@/consts/defaultFormData';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Modal,
  TextField,
} from "@mui/material";
export default function MuiLoginForm() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<ILoginForm>({ defaultValues: defaultLoginForm });


  const onSubmit = async (data: ILoginForm) => {
    debugger
    console.log(data)
  };

  const resetForm = async () => {
    reset(defaultLoginForm);
  }



  return (
    <>
      <div className="rounded flex justify-center items-center ">
        <div>
          <div className="text-center ">

            <AccountCircleRoundedIcon sx={{ fontSize: 80 }} />
          </div><strong className='flex justify-center text-2xl'>ورود كاربر</strong>
          <h1>
            <p className="text-center   text-xl">

            </p>
          </h1>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 grid-rows-5">
            <div className="grid col-span-10 col-start-2 h-[72px]">
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: 'شماره موبايل اجباريست', pattern: {
                    value: /^(?:\+98|0)?9\d{9}$/,
                    //  RegExp("^09[0-9]{9}$"), 
                    message: 'شماره موبايل  صحيح نمي باشد'
                  }
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    inputRef={ref}
                    // {...field}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message as string}
                    type="tel"
                    id="phoneNumber"
                    label={"شماره موبايل"}
                    variant="standard"
                    sx={{}}
                    //className="grid  col-span-10 col-start-2 h-[72px] "
                    className="text-sm"
                  />
                )}
              />
            </div>

            <div className="grid col-span-10 col-start-2 h-[72px]">
              <CaptchaImg />
            </div>

            <div className="grid col-span-10 col-start-2 h-[72px]">
              <Controller
                name="captchaText"
                control={control}
                defaultValue=""
                rules={{
                  required: 'حاصل عبارت اجباريست',
                  min: { value: 4, message: '2' },
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    inputRef={ref}
                    error={!!errors.captchaText}
                    helperText={errors.captchaText?.message as string}
                    id="captchaText"
                    type="password"
                    label="كپچا"
                    variant="standard"
                    sx={{}}
                    className="text-sm"
                  //className="grid  col-span-10 col-start-2 h-[72px] "
                  />
                )}
              />
            </div>

            <div className="grid col-span-10 col-start-2 h-[72px]">
              <Button
                type="submit"
                //disabled={isLoading}
                className="w-full"
              >
                Sign in
                {/* {isLoading ? 'Signing in...' : 'Sign in'} */}
              </Button>
            </div>
          </Box>
        </div>

      </div >
    </>
  );
}