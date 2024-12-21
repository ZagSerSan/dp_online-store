import { create } from 'zustand'

const dateStore = create((set) => ({
  endDate: 0,

  setEndDate: (date) => set((state) => ({ endDate: date })),
  resetEndDate: () => set((state) => ({ endDate: 0 }))
}))

export default dateStore
