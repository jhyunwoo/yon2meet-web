"use client";

import { ChangeEvent } from "react";
import {useCreateSchedule} from "@/lib/stores/create-schedule";

export default function ScheduleNameInput() {
  const { setTitle } = useCreateSchedule((state) => state);

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <input
      type={"text"}
      className={
        "p-2 text-lg rounded-xl bg-neutral-100 ring-2 px-4 ring-neutral-50 focus:ring-emerald-500 w-full focus:outline-none"
      }
      placeholder={"탭하여 새 약속 이름을 입력하세요."}
      onChange={handleTitleChange}
    />
  );
}
