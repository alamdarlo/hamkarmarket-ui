// features/auth/store/auth.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthUser = {
  id: string
  name: string
  lastName: string
  phoneNumber: string
  roles: string[]
}

type AuthState = {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  logout: () => void
  isLoading: boolean // اختیاری: برای نمایش لودر هنگام چک کاربر
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null, isLoading: false }),
    }),
    {
      name: 'auth-user',
      partialize: (state) => ({ user: state.user }), // فقط user رو persist کن
    }
  )
)