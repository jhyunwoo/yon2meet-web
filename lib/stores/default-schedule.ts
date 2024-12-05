import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DefaultState {
  absolutelyNot: string[];
}

interface DefaultAction {
  addDate: (date: string) => void;
  removeDate: (date: string) => void;
  handleDateChange: (date: string) => void;
  setDate: (absolutelyNot: string[]) => void;
}

export const useDefault = create(
  devtools<DefaultState & DefaultAction>((set) => ({
    absolutelyNot: [],
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
          };
        } else {
          return { absolutelyNot: [...state.absolutelyNot, date] };
        }
      }),
    setDate: (absolutelyNot: string[]) =>
      set(() => ({ absolutelyNot: absolutelyNot })),
  })),
);
