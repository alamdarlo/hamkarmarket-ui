"use client";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import SendSms from "../../components/SendSms";
import { useCountdown } from "@/shared/hooks/useCountdown";
import ConfirmSmsCode from "../../components/ConfirmSmsCode";
import { Fade, Slide, Box } from "@mui/material";

export default function LoginPage() {
  const [smsKey, setSmsKey] = useState("");
  const [sentSms, setSentSms] = useState<boolean>(false);
  const { timeLeft, isCounting, start, stclearTimer } = useCountdown();

  useEffect(() => {
    setSmsKey("");

    return () => {};
  }, []);

  const onReSent = async () => {
    setSentSms(false);
  };

  return (
    // <div className=" rounded-lg shadow-sm border border-gray-200 justify-center">
 <Box className="rounded-lg shadow-sm border border-gray-200">
      {/* SEND SMS */}
      <Fade in={!sentSms} timeout={400} unmountOnExit>
        <Box>
          {!sentSms && (
            <SendSms
              startCount={(val) => start(val)}
              isCounting={isCounting}
              timeLeft={timeLeft}
              setSmsKey={setSmsKey}
              sentSms={setSentSms}
              stclearTimer={stclearTimer}
            />
          )}
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
    </Box>

  );
}
