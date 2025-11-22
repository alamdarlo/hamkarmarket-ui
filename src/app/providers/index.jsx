// app/providers/index.jsx
'use client'; // Because we're using QueryProvider and others which are client components

import AuthProvider from './AuthProvider';
import ToastProvider from './ToastProvider';
import QueryProvider from './QueryProvider';


export default function Providers({ children }) {
  return (
    // The order can sometimes matter.
    // e.g., a component in ToastProvider might need access to Auth context.
    // QueryProvider often doesn't depend on others, so it's usually on the outside.
    <>
      <ToastProvider />
      <QueryProvider>
        <AuthProvider>
            {children}
        </AuthProvider>
      </QueryProvider>
    </>
  );
}