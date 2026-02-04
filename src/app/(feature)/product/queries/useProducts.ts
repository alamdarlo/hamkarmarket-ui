import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/product";
import { ApiError, ApiResponse } from "@/shared/types/api-error.type";
import { AxiosError } from "axios";
import { fetchProductsApi } from "../services/product.service";

export const useProducts = () => {
  return useQuery<ApiResponse<Product[]>, AxiosError<ApiError>>({
    queryKey: ['products'],
    queryFn: fetchProductsApi,
    retry: 1, // یکبار ری‌تری
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    gcTime: 10 * 60 * 1000, // 10 دقیقه
  });
};


// // Hook برای ایجاد سفارش
// export const useCreateOrder = () => {
//   return useMutation<ApiResponse<any>, AxiosError<ApiError>, any>({
//     mutationFn: createOrderApi,
    
//     onSuccess: (res) => {
//       if (res.isSuccess) {
//         // در اینجا می‌توانید notification نشان دهید
//         console.log('سفارش با موفقیت ثبت شد');
//       }
//     },
    
//     onError: (error) => {
//       const errorMessage = error.response?.data?.message || 'خطا در ثبت سفارش';
//       // در اینجا می‌توانید error را handle کنید
//       console.error('خطای ثبت سفارش:', errorMessage);
//     },
//   });
// };
