import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SelectedDateState {
  date: string[];
}

interface SelectedDateAction {
  addDate: (date: string) => void;
  removeDate: (date: string) => void;
  handleDateChange: (date: string) => void;
}

export const useSelectedDate = create(
  devtools<SelectedDateState & SelectedDateAction>((set) => ({
    date: [],
    addDate: (date) => set((state) => ({ date: [...state.date, date] })),
    removeDate: (date) =>
      set((state) => ({ date: [...state.date.filter((d) => d !== date)] })),
    handleDateChange: (date: string) =>
      set((state) => {
        if (state.date.includes(date)) {
          return { date: [...state.date.filter((d) => d !== date)] };
        } else {
          return { date: [...state.date, date] };
        }
      }),
  })),
);
