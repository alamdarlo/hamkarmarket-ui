// src/app/(auth)/login/page.tsx
// import LoginForm from '@/components/forms/LoginForm';

import Link from 'next/link';
import LoginForm from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <div className=" rounded-lg shadow-sm border border-gray-200">
      {/* <LoginForm /> */}
      <LoginForm />
      
      <div className="mt-6 text-center mb-3">
        <p className="text-sm text-gray-600">

          <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
           ارسال رمز به شماره موبايل 
          </Link>
        </p>
      </div>
    </div>
  );
}