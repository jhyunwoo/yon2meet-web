import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingState {
  isLoading: boolean;
}

interface LoadingAction {
  close: () => void;
  open: () => void;
  convert: () => void;
}

export const useLoading = create(
  devtools<LoadingState & LoadingAction>((set) => ({
    isLoading: false,
    close: () => set(() => ({ isLoading: false })),
    open: () => set(() => ({ isLoading: true })),
    convert: () => set((state) => ({ isLoading: !state.isLoading })),
  })),
);
