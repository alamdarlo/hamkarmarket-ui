'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { createWorker } from 'tesseract.js';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// فقط در کلاینت لود بشه → حل مشکل TextEncoder در SSR

const faceapi = dynamic(
  () => {
    return import('@vladmandic/face-api') as Promise<any>;
  },
  { ssr: false }
);

interface UserData {
  fullName: string;
  nationalCode: string;
  personnelNumber: string;
  faceImage: string | null;
}

export default function RegisterWithCard() {
  const [step, setStep] = useState<'upload' | 'scanning' | 'processing' | 'confirm'>('upload');
  const [faceapi, setFaceapi] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    nationalCode: '',
    personnelNumber: '',
    faceImage: null,
  });

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const qrReaderRef = useRef<HTMLDivElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // بارگذاری مدل‌های face-api فقط در مرورگر
  useEffect(() => {
    if (typeof window === 'undefined' || !faceapi) return;
 
    const loadModels = async () => {
       const faceapiModule = await import('@vladmandic/face-api');
        setFaceapi(faceapiModule);
      try {
        const MODEL_URL = '/models/face-api'; // فایل‌ها رو در public/models/face-api بذار
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        console.log('مدل‌های face-api با موفقیت لود شدند');
        setModelsLoaded(true);
      } catch (err) {
        console.error('خطا در لود مدل‌های face-api', err);
      }
    };

    loadModels();
  }, []);

  // پاک کردن اسکنر
  const clearScanner = useCallback(() => {
    scannerRef.current?.clear();
    scannerRef.current = null;
  }, []);

  // شروع اسکن QR
  const startQRScanner = useCallback(() => {
    if (!qrReaderRef.current) return;
    clearScanner();

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 12,
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1,
        rememberLastUsedCamera: true,
        showZoomSliderIfSupported: true,
        showTorchButtonIfSupported: true,
        defaultZoomValueIfSupported: 1.5,
      },
      false
    );

    scanner.render(
      (decodedText: string) => {
        console.log('QR اسکن شد:', decodedText);
        const parts = decodedText.trim().split('|');
        if (parts.length >= 2) {
          setUserData(prev => ({
            ...prev,
            fullName: parts[0].trim(),
            nationalCode: parts[1].trim(),
          }));
        }
        clearScanner();
        processCardImage(imageUrl);
      },
      () => {
        // خالی بذار تا هر فریم لاگ نزنه
      }
    );

    scannerRef.current = scanner;
  }, [imageUrl, clearScanner]);

  // آپلود تصویر
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStep('scanning');
    setTimeout(startQRScanner, 600);
  };

  // پردازش تصویر (OCR + تشخیص چهره)
  const processCardImage = async (imgSrc: string) => {
    if (!imgSrc) return;
    setStep('processing');

    // OCR فارسی + انگلیسی
    const worker = await createWorker('fas+eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          console.log(`OCR: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    const { data: { text } } = await worker.recognize(imgSrc);
    await worker.terminate();

    const numbers = text.match(/\d{4,12}/g) || [];
    const personnelNumber = numbers.find(n => n.length >= 4 && n.length <= 10) || 'تشخیص نشد';

    // تشخیص چهره (فقط در مرورگر)
    let faceImage = imgSrc;

    if (typeof window !== 'undefined' && modelsLoaded) {
      const img = new window.Image();
      img.src = imgSrc;

      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      const detection = await faceapi.detectSingleFace(img).withFaceLandmarks();

      if (detection) {
        const box = detection.detection.box;
        const canvas = document.createElement('canvas');
        const size = Math.max(box.width, box.height) + 180;

        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(
          img,
          box.x - 90,
          box.y - 110,
          size,
          size,
          0,
          0,
          size,
          size
        );

        faceImage = canvas.toDataURL('image/jpeg', 0.95);
      }
    }

    setUserData(prev => ({ ...prev, personnelNumber, faceImage }));
    setStep('confirm');
  };

  // تأیید نهایی
  const handleSubmit = () => {
    console.log('کاربر ثبت شد:', userData);
    alert('ثبت‌نام با موفقیت انجام شد!');
  };

  // تمیزکاری
  useEffect(() => {
    return () => {
      clearScanner();
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl, clearScanner]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            ثبت‌نام با کارت پرسنلی
          </h1>

          {/* مرحله آپلود */}
          {step === 'upload' && (
            <div className="text-center space-y-8">
              <div className="bg-gray-100 border-4 border-dashed rounded-2xl p-16">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="upload"
                />
                <label htmlFor="upload" className="cursor-pointer">
                  <div className="text-7xl mb-4">Upload</div>
                  <p className="text-xl text-gray-600">عکس کارت پرسنلی را آپلود کنید</p>
                </label>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-3">یا مستقیماً با دوربین بگیرید</p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="block mx-auto text-sm file:mr-4 file:py-3 file:px-8 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
              </div>
            </div>
          )}

          {/* مرحله اسکن QR */}
          {step === 'scanning' && (
            <div className="text-center space-y-6">
              <p className="text-lg text-gray-700 font-medium">
                QR کد سمت راست کارت را در کادر قرار دهید
              </p>
              <div id="qr-reader" ref={qrReaderRef} className="mx-auto max-w-sm rounded-xl overflow-hidden shadow-lg" />
            </div>
          )}

          {/* مرحله پردازش */}
          {step === 'processing' && (
            <div className="text-center py-20">
              <div className="animate-spin w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full mx-auto mb-8" />
              <p className="text-xl text-gray-700 font-medium">در حال خواندن کارت پرسنلی...</p>
              <p className="text-sm text-gray-500 mt-4">لطفاً صبر کنید</p>
            </div>
          )}

          {/* مرحله تأیید */}
          {step === 'confirm' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center text-green-600">اطلاعات با موفقیت استخراج شد!</h2>

              {userData.faceImage && (
                <div className="flex justify-center">
                  <Image
                    src={userData.faceImage}
                    alt="چهره"
                    width={200}
                    height={200}
                    className="rounded-full border-4 border-indigo-200 shadow-lg object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 text-lg">
                <div className="flex justify-between p-5 bg-gray-50 rounded-xl">
                  <span className="font-semibold">نام و نام خانوادگی:</span>
                  <span className="text-indigo-700 font-medium">{userData.fullName || '—'}</span>
                </div>
                <div className="flex justify-between p-5 bg-gray-50 rounded-xl">
                  <span className="font-semibold">کد ملی:</span>
                  <span className="text-indigo-700 font-medium">{userData.nationalCode || '—'}</span>
                </div>
                <div className="flex justify-between p-5 bg-gray-50 rounded-xl">
                  <span className="font-semibold">شماره پرسنلی:</span>
                  <span className="text-indigo-700 font-medium">{userData.personnelNumber}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
              >
                تأیید و ثبت‌نام
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}