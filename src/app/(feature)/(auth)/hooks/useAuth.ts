// features/auth/hooks/useAuth.ts
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import api from "@/shared/lib/api-client";
import { LoginResponse } from "../types";

export const useAuth = () => {
  const { user, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      if (user) return; // اگر قبلاً لود شده

      try {
        const res = await api.get<LoginResponse>("/api/account/me");
        setUser({
          id: res.data.id,
          name: res.data.lastName ?? "",
          lastName: res.data.name ?? "",
          phoneNumber: res.data.phoneNumber ?? "",
          //`${res.data.name ?? ''} ${res.data.lastName ?? ''}`.trim(),
          roles: res.data.roles ?? [],
        });
      } catch (error: any) {
        if (error.response?.status !== 401) {
          console.error("Failed to load user");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, isLoading: useAuthStore((s) => s.isLoading) };
};
