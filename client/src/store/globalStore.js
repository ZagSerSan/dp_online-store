import { create } from 'zustand'

const globalStore = create((set) => ({
  globalLoading: true,
  setGlobalLoading: () => set((state) => ({ globalLoading: false})),
}))

export default globalStore
