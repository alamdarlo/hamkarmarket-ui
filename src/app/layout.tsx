// src/app/layout.tsx
import type { Metadata } from 'next';
import { getSession } from '@/lib/auth';
import Providers from './providers';
import "@/styles/globals.css";
import InputTheme from './providers/thems/InputTheme'


export const metadata: Metadata = {
  title: 'My App',
  description: 'A Next.js application with authentication',
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSession();

  return (
    <html lang="en" dir='rtl'>
      <body className=''>
        <Providers>
          <InputTheme>{children}</InputTheme>
          
        </Providers>
      </body>
    </html>
  );
}