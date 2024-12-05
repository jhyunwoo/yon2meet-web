"use client";

export default function UpdateScheduleButton() {
  async function handleUpdate() {}

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
