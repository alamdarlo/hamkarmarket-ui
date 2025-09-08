// src/app/(auth)/login/page.tsx
import LoginForm from '@/components/forms/LoginForm';
import MuiLoginForm from '@/components/forms/MuiLoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className=" rounded-lg shadow-sm border border-gray-200">
      {/* <LoginForm /> */}
      <MuiLoginForm />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}