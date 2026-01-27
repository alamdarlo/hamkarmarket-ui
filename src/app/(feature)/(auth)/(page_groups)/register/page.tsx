// src/app/(auth)/register/page.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LucideUser } from "lucide-react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { register } from "../../services/auth.service";
import { defaultRegisterForm, IRegister } from "../../types";
import { CaptchaHandle } from "@/shared/types/commonTypes";
import { Controller, useForm } from "react-hook-form";
import CaptchaImg from "@/shared/components/common/CaptchaImg";
import Phone from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LucideUserCircle2 } from "lucide-react";
import { LucideCaptions } from "lucide-react";
import { toast } from 'react-hot-toast';
import { space } from "@/shared/lib/utils";


export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const [generalError, setGeneralError] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegister>({
    defaultValues: defaultRegisterForm,
    mode: "onTouched",
    reValidateMode: "onBlur",
  });
  const router = useRouter();

  const onSubmit = async (data: IRegister) => {
    debugger
    setGeneralError([]);
    setIsSubmitting(true);
    try {
      if (captchaRef.current) {
        const captchaKey = captchaRef.current.getCaptchaKey();
        await register(data, captchaKey)
          .then(function (result) {
            if (!result.isSuccess) {
              debugger;
              setGeneralError(
                result?.errors! || ["خطايي رخ داده است لطفا بعدا تلاش نماييد"]
              );
            } else {
              toast.success("ثبت با موفقیت انجام شد")
              // Redirect to login page with success message
              router.push("/login?message=Registration successful. Please login.");
              //const key = result.data?.key;
            }
          })
          .catch(function (error: any) {
            captchaRef.current?.refreshCaptcha();
            if (error.code == "ERR_NETWORK") {
            }
          })
          .finally(function () {
            setIsSubmitting(false);
          });

        
      }
    } catch (error: any) {
      setGeneralError(["خطايي رخ داده است لطفا بعدا تلاش نماييد"]);
    } finally {
      setIsSubmitting(false);
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
      <Paper sx={{ p: 4, pt: 1, width: 360 }} className="">
        <div className="text-center flex justify-center mt-3">
          <LucideUserCircle2
            className="size-20 mr-2 flex"
            fontSize={10}
            fontWeight={10}
          />
        </div>
        <strong className="flex justify-center text-2xl pr-5">
          ثبت نام كاربر
        </strong>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            pt: 4,
            "& .muirtl-13meb6w-MuiInputBase-input-MuiOutlinedInput-input": {
              direction: "ltr ",
            },
          }}
        >
          <div className="grid col-span-10 col-start-2 h-18">
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: "نام و نام خانوادگی اجباريست",
                min: { value: 4, message: "2" },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message as string}
                  id="fullName"
                  type="text"
                  label={`نام و نام خانوادگی${space(4)} `}
                  size="small"
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: 100,
                        p: "1px 0px",
                        pr: 0,
                        textAlign: "end",
                      },
                      endAdornment: (
                        <InputAdornment position="start">
                          <LucideCaptions />
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

          <div className="grid col-span-10 col-start-2 h-18">
            <Controller
              name="nationalCode"
              control={control}
              defaultValue=""
              rules={{
                required: " کد ملی اجباريست",
                min: { value: 4, message: "2" },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.nationalCode}
                  helperText={errors.nationalCode?.message as string}
                  id="username"
                  type="text"
                  label="کد ملی"
                  size="small"
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: 100,
                        p: "1px 0px",
                        pr: 0,
                        textAlign: "end",
                      },
                      endAdornment: (
                        <InputAdornment position="start">
                          <LucideUser />
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

          <div className="grid col-span-10 col-start-2 h-18 text-align-end">
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: " شماره موبایل اجباريست",
                pattern: {
                  value: /^09[0-9]{9}$/,
                  message: "شماره موبایل صحيح نمي باشد",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message as string}
                  type="tel"
                  id="phoneNumber"
                  size="small"
                  label={`شماره موبایل${space(4)} `}
                  variant="outlined"
                  slotProps={{
                    input: {
                      className: "text-align-end",
                      sx: { borderRadius: 100, padding: "1px 0px" },
                      endAdornment: (
                        <InputAdornment position="start">
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
                      sx: {
                        borderRadius: 100,
                        p: "1px 0px",
                        pr: 0,
                        textAlign: "end",
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
                required: "حاصل عبارت اجباريست",
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
                  label={`حاصل عبارت${space(4)} `}
                  size="small"
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: 100,
                        p: "1px 0px",
                        pr: 0,
                        textAlign: "end",
                      },
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <LucideCaptions width={18} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                    inputLabel: {
                      shrink: true,
                      sx: { fontSize: "20px" },
                    },
                  }}
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="grid col-span-10 col-start-2 h-12 " dir="ltr">
            <CaptchaImg ref={captchaRef} />
          </div>
          <div className="grid col-span-12 ">
            <ul className="list-disc  list-inside  pr-5 wrap-normal text-base text-red-500">
              {generalError &&
                generalError.map((errorMsg: string, index: number) => {
                  return (
                    <li key={index} className="wrap-normal">
                      {" "}
                      {errorMsg}
                    </li>
                  );
                })}
            </ul>
          </div>
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingPosition="center"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 ,fontSize: "18px"}}
          >
            ثبت
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
