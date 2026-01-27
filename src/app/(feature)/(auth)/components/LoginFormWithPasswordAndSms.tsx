"use client";
import { useLogin } from "../queries/useLogin";
import { Controller, ErrorOption, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  IconButton,
  Link,
  Slide,
  Fade,
} from "@mui/material";
import { defaultLoginForm, ISendSmsForm, LoginRequest } from "../types";
import Phone from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LucideUserCircle2 } from "lucide-react";
import { LucideCaptions } from "lucide-react";
import { ReactElement, useEffect, useRef, useState } from "react";
import CaptchaImg from "@/shared/components/common/CaptchaImg";
import { CaptchaHandle } from "@/shared/types/commonTypes";
import { toast } from "react-hot-toast";
import { useSendSms } from "../queries/useSmsCode";
import { useCountdown } from "@/shared/hooks/useCountdown";
import ConfirmSmsCode from "./ConfirmSmsCode";
import {
  formatTime,
  isValidIranMobile,
  isValidNationalCode,
  isValidUsername,
  space,
} from "@/shared/lib/utils";

export function LoginFormWithPasswordAndSms() {
  const [smsKey, setSmsKey] = useState("");
  const [sentSms, setSentSms] = useState<boolean>(false);
  const { timeLeft, isCounting, start, stclearTimer } = useCountdown();

  const { mutate, error, isPending } = useLogin();
  const sendSmsMutation = useSendSms();
  const captchaRef = useRef<CaptchaHandle>(null);
  const [generalError, setGeneralError] = useState<string[]|undefined>([]);

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    defaultValues: defaultLoginForm,
    mode: "onTouched",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    setSmsKey("");

    return () => {};
  }, []);

  const onSubmit = async (data: LoginRequest) => {
    setGeneralError([]);
    if (captchaRef.current) {
      const captchaKey = captchaRef.current.getCaptchaKey();

      mutate(
        { data: data, type: "withCaptcha", captchaKey: captchaKey },
        {
          onSuccess: (result) => {
            debugger;
            if (!result.isSuccess) {
                setGeneralError(result.errors);
            }
          },
          onError: (error) => {},
        }
      );
      if (error?.message) captchaRef.current?.refreshCaptcha();
      setGeneralError(["خطايي رخ داده است لطفا بعدا تلاش نماييد"]);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  let userName = watch("username", "");
  let captchaText = watch("captchaText", "");

  const sendSms = async () => {
    debugger;
    setGeneralError([]);
    if (isCounting) return;
    if (!isValidIranMobile(userName)) {
      const errr = errors["username"];
      setError("username", {errr,message:"برای ارسال کد لطفا شماره موبایل خود را وارد کنید"} as ErrorOption);
      return;
    }

    if (captchaRef.current) {
      const captchaKey = captchaRef.current.getCaptchaKey();
      const data: ISendSmsForm = {
        phoneNumber: userName,
        captchaText: captchaText,
      };
      debugger;
      sendSmsMutation.mutate(
        { data, captchaKey: captchaKey! },
        {
          onSuccess: (result) => {
            debugger;
            if (result.isSuccess) {
              console.log(result);
              start(120);
              debugger;
              setSmsKey(result?.data?.key);
              setSentSms(true);
            } else {
              setGeneralError(result?.errors || ["خطایی رخ داده است2 "]);
              captchaRef.current?.refreshCaptcha();
            }
          },
          onError: (error) => {
            stclearTimer();
            debugger;
            setGeneralError(["خطایی رخ داده است2 "]);
            captchaRef.current?.refreshCaptcha();
          },
        }
      );
    }
  };

  return (
    <>
      <Fade in={!sentSms} timeout={400} unmountOnExit>
        <Box
          minHeight="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Paper sx={{ p: 4, pt: 1, pb: 1, width: 360 }} className="">
            <div className="text-center flex justify-center mt-3">
              <LucideUserCircle2
                className="size-20 mr-2 flex"
                fontSize={10}
                fontWeight={10}
              />
            </div>
            <strong className="flex justify-center text-2xl pr-5">
              ورود كاربر
            </strong>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                pt: 8,
                "& .muirtl-13meb6w-MuiInputBase-input-MuiOutlinedInput-input": {
                  direction: "ltr ",
                },
              }}
            >
              <div className="grid col-span-10 col-start-2 h-18 text-align-end">
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "نام کاربری یا شماره موبایل الزامی است",
                    validate: (value) => {
                      const v = value.trim();

                      if (isValidIranMobile(v)) return true;
                      if (isValidNationalCode(v)) return true;
                      if (isValidUsername(v)) return true;

                      return "، نام کاربری یا شماره موبایل معتبر نیست";
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      error={!!errors.username}
                      helperText={errors.username?.message as string}
                      type="text"
                      id="username"
                      size="small"
                      label={`نام کاربری یا شماره موبایل ${space(5)} `}
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
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
                loading={isPending || sendSmsMutation.isPending}
                loadingPosition="center"
                fullWidth
                disabled={isPending || isCounting}
                sx={{ mt: 2 }}
              >
                {!isCounting ? (
                  <span>ورود </span>
                ) : (
                  <span>{`ارسال مجدد بعد از:  ${formatTime(timeLeft)}`}</span>
                )}
              </Button>

              <Button type="button" fullWidth variant="text" onClick={sendSms} sx={{ mt: 4 }}>
                ارسال کد به شماره موبايل
              </Button>
            </Box>
          </Paper>
        </Box>
      </Fade>
      <Slide
        direction="up"
        in={sentSms}
        mountOnEnter
        unmountOnExit
        timeout={400}
      >
        <Box>
          {sentSms && (
            <ConfirmSmsCode
              startCount={(val) => start(val)}
              isCounting={isCounting}
              timeLeft={timeLeft}
              smsKey={smsKey}
              sentSms={setSentSms}
              stclearTimer={stclearTimer}
            />
          )}
        </Box>
      </Slide>
    </>
  );
}
