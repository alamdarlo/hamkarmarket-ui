// src/components/forms/LoginForm.tsx
"use client";
import { Controller, useForm } from "react-hook-form";
import { LucideUserCircle2 } from "lucide-react";
import Phone from "@mui/icons-material/Phone";
import { LucideCaptions } from "lucide-react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CaptchaImg from "@/shared/components/common/CaptchaImg";
import { defaultSendSmsForm, ISendSmsForm, ISendSmsRequest } from "../types";
import { CaptchaHandle } from "@/shared/types/commonTypes";
import { sendSmsCode } from "../services/auth.service";
import { useSendSms } from "../queries/useSmsCode";
import { formatTime } from "@/shared/lib/utils";

type props = {
  timeLeft: number;
  isCounting: boolean;
  startCount: (duration: number) => void;
  stclearTimer: () => void;
  setSmsKey: (key: string) => void;
  sentSms: (state: boolean) => void;
};

export default function SendSms(prop: props) {
  const captchaRef = useRef<CaptchaHandle>(null);
  const sendSmsMutation = useSendSms();
  useEffect(() => {
    prop.setSmsKey("");

    return () => {};
  }, []);

  const [generalError, setGeneralError] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISendSmsForm>({
    defaultValues: defaultSendSmsForm,
    mode: "all",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: ISendSmsForm) => {
    setGeneralError([]);
    if (prop.isCounting) return;

    if (captchaRef.current) {
      const captchaKey = captchaRef.current.getCaptchaKey();
      //mutate({ ...data, captchaKey});

      sendSmsMutation.mutate(
        { data, captchaKey: captchaKey! },
        {
          onSuccess: (result) => {
            debugger;
            if (result.isSuccess) {
              console.log(result);
              prop.startCount(120);
              debugger
              prop.setSmsKey(result?.data?.key);
              prop.sentSms(true);
            } else {
              setGeneralError(result?.errors || ["خطایی رخ داده است2 "]);
              captchaRef.current?.refreshCaptcha();
            }
          },
          onError: (error) => {
            prop.stclearTimer();
            debugger;
            setGeneralError(["خطایی رخ داده است2 "]);
            captchaRef.current?.refreshCaptcha();
          },
        }
      );

      // sendSmsCode(data, captchaKey)
      // .then(function (result) {
      //   if (!result.isSuccess) {
      //     debugger
      //     prop.stclearTimer()
      //     setGeneralError(
      //       result?.errors! || ["خطايي رخ داده است لطفا بعدا تلاش نماييد"]
      //     );
      //   } else {
      //       prop.startCount(120);
      //       const key = result.data?.key;
      //       prop.setSmsKey(key);
      //       prop.sentSms(true);
      //     }
      //   })
      //   .catch(function (error: any) {
      //     captchaRef.current?.refreshCaptcha();
      //     if (error.code == "ERR_NETWORK") {
      //     }
      //   })
      //   .finally(function () {
      //     setLoading(false);
      //   });
    }
  };


  const resetForm = async () => {
    setGeneralError([]);
    reset(defaultSendSmsForm);
  };

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
          <div className="grid col-span-10 col-start-2 h-18">
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: "شماره موبايل اجباريست",
                pattern: {
                  value: /^09[0-9]{9}$/,
                  message: "شماره موبايل  صحيح نمي باشد",
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
                  label="شماره موبايل"
                  variant="outlined"
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: 100,
                        p: "1px 0px",
                        pr: 0,
                        textAlign: "end",
                      },
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ height: "50px" }}
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
                  className=""
                />
              )}
            />
          </div>

          <div className="grid col-span-10 col-start-2 h-18">
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
                  label="حاصل عبارت"
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
          <div
            className="grid col-span-10 col-start-2 h-12 bg-gray-50"
            dir="ltr"
          >
            <CaptchaImg ref={captchaRef} />
          </div>
          <div className="grid col-span-12 pt-3">
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
            //loading={loading}
            //disabled={prop.isCounting}
            loading={sendSmsMutation.isPending}
            disabled={prop.isCounting}
            loadingPosition="center"
            fullWidth
            loadingIndicator={`ارسال مجدد بعد از:  ${formatTime(
              prop.timeLeft
            )}`}
            variant="contained"
            //sx={{ borderRadius: 100 }}
            sx={{ mt: 2 }}
          >
              {!prop.isCounting ? (
                <span>ارسال رمز</span>
              ) : (
                <span>{`ارسال مجدد بعد از:  ${formatTime(prop.timeLeft)}`}</span>
              )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
