"use client";

import DefaultLayout from "@/app/components/default-layout";
import WeekCalendar from "@/app/everytime/edit/week-calendar";
import UpdateScheduleButton from "@/app/everytime/edit/update-schedule-button";

export default function EverytimeEditPage() {
  return (
    <DefaultLayout className={"flex justify-center p-4"}>
      <div
        className={
          "w-full max-w-md mx-auto flex flex-col items-center justify-between gap-2"
        }
      >
        <div className={"text-xl font-semibold mr-auto"}>기본 시간표</div>
        <WeekCalendar
          startDate={new Date(2024, 11, 1)}
          endDate={new Date(2024, 11, 7)}
        />
        <UpdateScheduleButton />
      </div>
    </DefaultLayout>
  );
}
