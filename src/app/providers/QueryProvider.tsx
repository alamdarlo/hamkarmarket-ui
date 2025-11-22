'use client'; // This is mandatory

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: {
  children: React.ReactNode;
}) {
  // Using useState to ensure QueryClient is created only once
  // This is crucial for stability and performance.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // These are good default options.
            // StaleTime can be adjusted based on your needs.
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false, // Can be set to true for highly dynamic data
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}