// src/app/(dashboard)/dashboard/page.tsx
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { user } = await getSession();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Hello, {user.firstName}! You have successfully logged in.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Roles</h2>
          <p className="mt-2 text-gray-600">
            {user.roles.join(', ')}
          </p>
        </div>
        
        {user.roles.includes('Admin') && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Admin Access</h2>
            <p className="mt-2 text-gray-600">
              You have administrator privileges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}