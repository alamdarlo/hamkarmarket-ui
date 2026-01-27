import { create } from 'zustand'

export const useUIStore = create<{
  loading: boolean
  setLoading: (v: boolean) => void
}>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}))
