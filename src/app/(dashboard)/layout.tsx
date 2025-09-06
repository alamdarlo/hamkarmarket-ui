// src/app/(dashboard)/layout.tsx
import { ReactNode } from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
// import Header from '@/components/layout/Header';
// import Navigation from '@/components/layout/Navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = await getSession();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header user={user} /> */}
      <div className="flex">
        {/* <Navigation /> */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}