"use client";

import { useSelectedDate } from "@/lib/stores/selected-date";
import { useRouter } from "next/navigation";

export default function SubmitButton({ meetId }: { meetId: string }) {
  const { absolutelyNot, adjustable } = useSelectedDate((state) => state);
  const router = useRouter();

  async function handleSubmit() {
    const addSchedules = await fetch(`/api/meets/${meetId}`, {
      method: "PUT",
      body: JSON.stringify({
        absolutelyNot: absolutelyNot,
        adjustable: adjustable,
      }),
    });
    const result = await addSchedules.json();
    console.log(result);
    router.push(`/meet/${meetId}`);
  }

  return (
    <button
      onClick={handleSubmit}
      type={"button"}
      className={"p-2 rounded-lg bg-emerald-500 text-white"}
    >
      등록 완료
    </button>
  );
}
