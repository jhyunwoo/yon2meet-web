"use client";

import { useRouter } from "next/navigation";
import { useSelectedDate } from "@/lib/stores/selected-date";
import { useLoading } from "@/lib/stores/loading";

export default function SubmitButton({ meetId }: { meetId: string }) {
  const { absolutelyNot, adjustable } = useSelectedDate((state) => state);
  const router = useRouter();
  const { open, close } = useLoading((state) => state);

  async function handleSubmit() {
    open();
    const addSchedules = await fetch(`/api/meets/${meetId}`, {
      method: "PUT",
      body: JSON.stringify({
        absolutelyNot: absolutelyNot,
        adjustable: adjustable,
      }),
    });
    const result = await addSchedules.json();
    console.log(result);
    close();
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
