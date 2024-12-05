"use client";

import { useRouter } from "next/navigation";
import { useCreateSchedule } from "@/lib/stores/create-schedule";
import { useLoading } from "@/lib/stores/loading";

export default function CreateMeetButton() {
  const router = useRouter();
  const { title, start, end } = useCreateSchedule((state) => state);
  const { open, close } = useLoading((state) => state);

  async function handleClick() {
    if (!start || !end) {
      alert("시작일과 종료일을 설정해주세요.");
      return;
    }
    open();
    const requestCreateMeet = await fetch(`/api/meets`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        startDate: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
        endDate: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
      }),
    });

    const result = await requestCreateMeet.json();
    close();
    router.push(`/meet/${result.id}`);
  }

  return (
    <button
      onClick={handleClick}
      type={"button"}
      className={
        "w-full p-2 rounded-lg bg-emerald-500 text-white font-semibold text-lg text-center"
      }
    >
      약속 만들기
    </button>
  );
}
