"use client";
import { useLogin } from "../queries/useLogin";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { defaultLoginForm, LoginRequest } from "../types";
import Phone from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LucideUserCircle2 } from 'lucide-react';
import { LucideCaptions } from 'lucide-react';
import { useRef, useState } from "react";
import CaptchaImg from "@/shared/components/common/CaptchaImg";
import { CaptchaHandle } from "@/shared/types/commonTypes";
import { toast } from 'react-hot-toast';



export function LoginFormWithCaptch() {
  const { mutate, error, isPending } = useLogin();
   const captchaRef = useRef<CaptchaHandle>(null);
  const [generalError, setGeneralError] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    defaultValues: defaultLoginForm,
    mode: "onTouched",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: LoginRequest) => {
    setGeneralError([]);
     if (captchaRef.current) {

      const captchaKey = captchaRef.current.getCaptchaKey();

    mutate({ data: data, type: "withCaptcha" , captchaKey: captchaKey});
    if(error?.message)
      captchaRef.current?.refreshCaptcha();
      setGeneralError(['خطايي رخ داده است لطفا بعدا تلاش نماييد']);
    } 
    
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ p: 4,pt:1, width: 360}} className="" >
         <div className="text-center flex justify-center mt-3">
            <LucideUserCircle2 className="size-20 mr-2 flex" fontSize={10} fontWeight={10} />
          </div><strong className='flex justify-center text-2xl pr-5'>ورود كاربر</strong>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{pt:8,
          '& .muirtl-13meb6w-MuiInputBase-input-MuiOutlinedInput-input':{
                          direction:'ltr '
                        }
        }} >
           <div className="grid col-span-10 col-start-2 h-18 text-align-end">
            <Controller
              name="username"
              control={control}
              defaultValue=""
              
              rules={{
                required: "نام کاربری اجباريست",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "نام کاربری صحيح نمي باشد",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.username}
                  helperText={errors.username?.message as string}
                  type="tel"
                  
                  id="username"
                  size="small"
                  label="     نام کاربری    "
                  variant="outlined"
                  slotProps={{
                    input: {
                      className:"text-align-end",
                      sx: { borderRadius: 100, padding: "1px 0px"},
                      endAdornment: (
                        <InputAdornment
                          position="start"
                        >
                          <IconButton>
                            <Phone width={18} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                    inputLabel: {
                      shrink: true,
                      sx: { fontSize: "20px" },
                    },
                  }}
                  className="text-align-end"
                />
              )}
            />
          </div>

          <div className="grid col-span-10 col-start-2 h-18">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: " رمز عبور اجباريست",
                min: { value: 4, message: "2" },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="رمز عبور"
                  size="small"
                  slotProps={{
                    input: {
                      sx: { borderRadius: 100, p: "1px 0px", pr:0,
                        textAlign:'end'
                      },
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
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
                      sx: { fontSize: "20px" },
                    },
                  }}
                  variant="outlined"
                  sx={{}}
                />
              )}
            />
          </div>

           <div className="grid col-span-10 col-start-2 h-14">
              <Controller
                name="captchaText"
                control={control}
                defaultValue=""
                rules={{
                  required: 'حاصل عبارت اجباريست',
                  maxLength: 3,
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
                        sx: { borderRadius: 100, p: "1px 0px", pr:0,textAlign:'end'},
                        endAdornment: (
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
            <div className="grid col-span-10 col-start-2 h-12 " dir='ltr' >
              <CaptchaImg ref={captchaRef} />
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
          <Button
            type="submit"
            variant="contained"
            loading={isPending}
            loadingPosition="center"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            ورود
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
