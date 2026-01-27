'use client'; 
import InputTheme from './thems/InputTheme'
import QueryProvider from './QueryProvider'
import ToastProvider from './ToastProvider'

export default function Providers({ children }) {
  return (
    <>
      <ToastProvider />
      <QueryProvider>
          <InputTheme>{children}</InputTheme>
      </QueryProvider>
    </>
  );
}