import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CreateScheduleState {
  title: string;
  start: Date | undefined;
  end: Date | undefined;
  participants: number;
}

interface CreateScheduleAction {
  setTitle: (title: string) => void;
  setStart: (start: Date | undefined) => void;
  setEnd: (end: Date | undefined) => void;
  setParticipants: (participants: number) => void;
}

export const useCreateSchedule = create(
  devtools<CreateScheduleState & CreateScheduleAction>((set) => ({
    title: "",
    start: undefined,
    end: undefined,
    participants: 0,
    setTitle: (title: string) => set(() => ({ title })),
    setStart: (start: Date | undefined) => set(() => ({ start })),
    setEnd: (end: Date | undefined) => set(() => ({ end })),
    setParticipants: (participants: number) => set(() => ({ participants })),
  })),
);
