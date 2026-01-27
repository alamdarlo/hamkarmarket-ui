// auth/hooks/useVerifySms.ts
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { verifySmsCode } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { ApiError } from "next/dist/server/api-utils";

export const useVerifySms = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation<any, AxiosError<ApiError>, {phoneNumber: string;smsCode: string;}>({
    mutationFn: verifySmsCode,

    onSuccess: (res) => {
      if(res.isSuccess)
        setUser(res.data)

    },

    onError: (error) => {
      // mapApiError(error)
    },
  });
};
