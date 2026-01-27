import InstallPWA from "@/shared/components/pwa/InstallPWA";
import Offline from "@/shared/components/pwa/Offline";
import PushNotificationManager from "@/shared/components/pwa/PushNotificationManager";

export default function Page() {
  return (
   <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Offline />
      <PushNotificationManager />
      <InstallPWA />
      {/* <RegisterSW /> */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          برنامه PWA با Next.js
        </h1>
        
        <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">ویژگی‌های PWA:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>قابل نصب روی دستگاه‌ها</li>
            <li>کارکرد آفلاین</li>
            <li>سرعت بالا با کش‌کردن منابع</li>
            <li>تجربه کاربری مانند اپلیکیشن‌های native</li>
            <li>نوتیفیکیشن push</li>
          </ul>
        </div>
        
        <div className="mt-8 text-center">
          <p className="mb-4">
            برای نصب برنامه، دکمه «نصب برنامه» را در پایین سمت چپ صفحه بزنید
          </p>
          <p className="text-sm text-gray-600">
            در موبایل، از منوی اشتراک‌گذاری گزینه «Add to Home Screen» را انتخاب کنید
          </p>
        </div>
      </div>
    </main>
  );
}