"use client";

import { useDefault } from "@/lib/stores/default-schedule";
import { useRouter } from "next/navigation";
import { useLoading } from "@/lib/stores/loading";

export default function UpdateScheduleButton() {
  const { absolutelyNot } = useDefault((state) => state);
  const router = useRouter();
  const { open, close } = useLoading((state) => state);

  async function handleUpdate() {
    open();
    const requestUpdate = await fetch("/api/user/default-schedule", {
      method: "PUT",
      body: JSON.stringify({ schedule: absolutelyNot }),
    });
    const result = await requestUpdate.json();
    console.log(result);
    router.push("/everytime/my-schedule");
    close();
  }

  return (
    <button
      type={"button"}
      onClick={handleUpdate}
      className={"p-2 rounded-lg bg-emerald-500 text-white w-full"}
    >
      시간표 업데이트
    </button>
  );
}
