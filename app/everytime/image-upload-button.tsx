"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

interface TimetableType {
  day: string;
  fill_ratio: number;
  time: string;
  x: number;
  y: number;
}

export interface ScheduleType {
  day: number;
  date: number;
  hour: number;
  minutes: number;
}

function scheduleFormatter(schedules: TimetableType[]) {
  const data: ScheduleType[] = [];
  for (const schedule of schedules) {
    const scheduleData = {
      day: 0,
      date: 0,
      hour: 0,
      minutes: 0,
    };
    switch (schedule.day) {
      case "일":
        scheduleData.day = 0;
        break;
      case "월":
        scheduleData.day = 1;
        break;
      case "화":
        scheduleData.day = 2;
        break;
      case "수":
        scheduleData.day = 3;
        break;
      case "목":
        scheduleData.day = 4;
        break;
      case "금":
        scheduleData.day = 5;
        break;
      case "토":
        scheduleData.day = 6;
        break;
      default:
        scheduleData.day = 0;
        break;
    }

    scheduleData.hour = Number(schedule.time.split(":")[0]);
    scheduleData.minutes = Number(schedule.time.split(":")[1]);
    data.push(scheduleData);
  }
  return data;
}

export default function ImageUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleClick() {
    inputRef.current?.click();
  }

  async function handleImageInput() {
    if (!inputRef?.current?.files?.[0]) return alert("Please upload a file");

    const formData = new FormData();
    formData.append("file", inputRef?.current?.files?.[0]); // key를 'file'로 설정

    try {
      const response = await fetch("http://43.203.114.201:8080/image", {
        body: formData,
        method: "POST",
      });
      const result = (await response.json()) as {
        schedule: TimetableType[];
      };

      console.log("Upload success:", result);
      const formattedData = scheduleFormatter(result.schedule);
      const requestUpdateSchedule = await fetch("/api/user/everytime", {
        method: "PUT",
        body: JSON.stringify({
          schedule: formattedData,
        }),
      });
      const updateResult = await requestUpdateSchedule.json();
      console.log(updateResult);
      router.push("/everytime/edit");
    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  return (
    <>
      <input
        hidden={true}
        type={"file"}
        accept={"image/*"}
        ref={inputRef}
        onChange={handleImageInput}
      />
      <button
        onClick={handleClick}
        type={"button"}
        className={
          "p-3 text-lg font-semibold rounded-lg bg-emerald-600 text-white"
        }
      >
        사진 보관함에서 시간표 업로드
      </button>
    </>
  );
}
