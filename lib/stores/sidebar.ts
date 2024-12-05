import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
}

interface SidebarAction {
  close: () => void;
  open: () => void;
  convert: () => void;
}

export const useSidebar = create(
  devtools<SidebarState & SidebarAction>((set) => ({
    isOpen: false,
    close: () => set(() => ({ isOpen: false })),
    open: () => set(() => ({ isOpen: true })),
    convert: () => set((state) => ({ isOpen: !state.isOpen })),
  })),
);
