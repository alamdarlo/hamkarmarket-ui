"use client";

import { Box, Button, Paper, TextField } from "@mui/material";
import { LucideUserCircle2 } from "lucide-react";
import { Controller, useForm , useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { defaultConfirmSmsForm, IConfirmSmsForm } from "../types";
import { useVerifySms } from "../queries/useVerifySms";
import { useRouter } from "next/navigation";
type props = {
  timeLeft: number;
  isCounting: boolean;
  startCount: (duration: number) => void;
  stclearTimer: () => void;
  smsKey: string;
  sentSms: (state: boolean) => void;
};

export default function ConfirmSmsCode(prop: props) {
  const verifyMutation = useVerifySms();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string[]>([]);
const router = useRouter();
  const { control, handleSubmit, watch, setValue } = useForm<IConfirmSmsForm>({
    defaultValues: defaultConfirmSmsForm,
    mode: "all",
  });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const codeValues = useWatch({
  control,
  name: "code",
});

  useEffect(() => {
    if (!codeValues || verifyMutation.isPending) return;
    const code = codeValues.join("");
    if (code.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [codeValues]);

  
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    setValue(`code.${index}`, value);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !codeValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    pasted.split("").forEach((char, index) => {
      setValue(`code.${index}`, char);
    });

    inputRefs.current[pasted.length - 1]?.focus();
  };

  const onSubmit = async (data: IConfirmSmsForm) => {
    const finalCode = data.code.join("");

    if (finalCode.length !== 6) {
      setGeneralError(["کد تایید را کامل وارد نمایید"]);
      return;
    }

    setLoading(true);
    setGeneralError([]);

    try {
      console.log("OTP:", finalCode);
      verifyMutation.mutate({phoneNumber: prop.smsKey,smsCode:finalCode,},
    {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (error) => {
        debugger;
        setGeneralError(["کد وارد شده نامعتبر است"]);
      },
    }
  );
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ p: 4, pt: 1, width: 360 }}>
        <div className="flex justify-center mt-3">
          <LucideUserCircle2 className="size-20" />
        </div>

        <strong className="flex justify-center text-2xl mt-2">
          تایید کد پیامک
        </strong>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 6 }}>
          <div
            className="flex justify-center gap-2"
            dir="ltr"
            onPaste={handlePaste}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Controller
                key={index}
                name={`code.${index}`}
                control={control}
                rules={{ required: true, pattern: /^\d$/ }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    value={field.value || ""}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e: any) => handleKeyDown(e, index)}
                    inputProps={{
                      maxLength: 1,
                      inputMode: "numeric",
                      style: {
                        textAlign: "center",
                        fontSize: 20,
                      },
                    }}
                    sx={{
                      width: 48,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "999px",
                      },
                    }}
                    size="small"
                  />
                )}
              />
            ))}
          </div>

          {generalError.length > 0 && (
            <ul className="text-red-500 text-sm mt-3 pr-4 list-disc">
              {generalError.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}

          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={prop.isCounting}
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => {
              prop.stclearTimer();
              prop.sentSms(false); // 🔥 برگشت به SendSms
            }}
          >
            {!prop.isCounting
              ? "ارسال مجدد "
              : `ارسال مجدد بعد از ${formatTime(prop.timeLeft)}`}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
