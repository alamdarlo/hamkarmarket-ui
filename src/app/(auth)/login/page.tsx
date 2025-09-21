'use client'
import { Link } from '@mui/material';
import LoginForm from '../_components/LoginForm';
import { useEffect, useState } from 'react';
import SendSms from '../_components/SendSms';
import { useCountdown } from '@/hooks/useCountdown';

export default function LoginPage() {
  const [isLoginform, setLoginForm] = useState(true);
  const [smsKey, setSmsKey] = useState('');
  const { timeLeft, isCounting, start, stclearTimer } = useCountdown();

  useEffect(() => {
    setSmsKey('')

    return () => {
    }
  }, [])
  
  return (
    <div className=" rounded-lg shadow-sm border border-gray-200">
      {/* <LoginForm /> */}
      {isLoginform ? <LoginForm smsKey={smsKey} /> : <SendSms startCount={(val) => start(val)} isCounting={isCounting} timeLeft={timeLeft} setSmsKey={setSmsKey} />

      }

      <div className="mt-6 text-center mb-3">
        <p className="text-sm text-gray-600">
          {isLoginform ? <Link
            component="button"
            variant="body2"
            onClick={() => setLoginForm(false)}
          >
            ارسال رمز به شماره موبايل
          </Link>
            :
            <Link
              component="button"
              variant="body2"
              onClick={() => setLoginForm(true)}
            >
              ورود
            </Link>
          }
        </p>
      </div>
    </div>
  );
}