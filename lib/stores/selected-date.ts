import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SelectedDateState {
  absolutelyNot: string[];
  adjustable: string[];
}

interface SelectedDateAction {
  addDate: (date: string) => void;
  removeDate: (date: string) => void;
  handleDateChange: (date: string) => void;
  setDate: (absolutelyNot: string[], adjustable: string[]) => void;
}

export const useSelectedDate = create(
  devtools<SelectedDateState & SelectedDateAction>((set) => ({
    absolutelyNot: [],
    adjustable: [],
    addDate: (date) =>
      set((state) => ({ absolutelyNot: [...state.absolutelyNot, date] })),
    removeDate: (date) =>
      set((state) => ({
        absolutelyNot: [...state.absolutelyNot.filter((d) => d !== date)],
      })),
    handleDateChange: (date: string) =>
      set((state) => {
        if (state.absolutelyNot.includes(date)) {
          return {
            absolutelyNot: [...state.absolutelyNot.filter((d) => d !== date)],
            adjustable: [...state.adjustable, date],
          };
        } else if (state.adjustable.includes(date)) {
          return {
            adjustable: [...state.adjustable.filter((d) => d !== date)],
          };
        } else {
          return { absolutelyNot: [...state.absolutelyNot, date] };
        }
      }),
    setDate: (absolutelyNot: string[], adjustable: string[]) =>
      set(() => ({ absolutelyNot: absolutelyNot, adjustable: adjustable })),
  })),
);
