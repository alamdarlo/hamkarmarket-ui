import type { Metadata, Viewport } from "next";
import "../(global)/globals.css";
import { Suspense } from "react";
import Providers from "../(global)/providers";

export const metadata: Metadata = {
  title: "Next.js PWA App",
  description: "یک برنامه پیشرونده وب با Next.js",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "pwa", "next-pwa"],
  authors: [
    {
      name: "Your Name",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-128x128.png" },
    { rel: "icon", url: "icons/128x128.png" },
  ],
};

export const viewport: Viewport = {
  //themeColor: '#colorHere',
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir='rtl'>
      <body className={`antialiased`}>
        <Providers>
          <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
