'use client'
import { Link } from '@mui/material';
import LoginForm from '../_components/LoginForm';
import { useState } from 'react';
import SendSms from '../_components/SendSms';

export default function LoginPage() {
  const [isLoginform, setLoginForm] = useState(true);
  
  return (
    <div className=" rounded-lg shadow-sm border border-gray-200">
      {/* <LoginForm /> */}
      {isLoginform ? <LoginForm /> : <SendSms />

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