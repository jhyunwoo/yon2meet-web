"use client";

import { useState, TouchEvent, useEffect } from "react";
import { getWeekCalendarDateList } from "@/lib/get-week-calendar-date-list";
import toKoDay from "@/lib/to-ko-day";
import timeGenerator from "@/lib/time-generator";
import useDefaultSchedule from "@/lib/hooks/use-default-schedule";
import { addDays } from "date-fns";
import { useDefault } from "@/lib/stores/default-schedule";
import { DefaultScheduleType } from "@/app/everytime/image-upload-button";
import { useLoading } from "@/lib/stores/loading";

interface TimeType {
  time: Date;
  isAvailable: boolean;
}

export function defaultScheduleFormatter(
  defaultSchedule: DefaultScheduleType[],
  startDate: Date,
) {
  const data = [];
  for (const schedule of defaultSchedule) {
    const preset = {
      year: 0,
      month: 0,
      day: 0,
      date: 0,
      hour: "00",
      minutes: "00",
    };
    preset.year = startDate.getFullYear();
    preset.month = startDate.getMonth();
    preset.day = schedule.day;
    preset.hour = String(schedule.hour);
    preset.minutes = "00";
    preset.date = addDays(startDate, schedule.day).getDate();
    data.push(JSON.stringify(preset));
    preset.minutes = "30";
    data.push(JSON.stringify(preset));
  }
  return data;
}

export default function WeekCalendar({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { defaultScheduleData, defaultScheduleIsLoading } =
    useDefaultSchedule();

  const { open, close } = useLoading((state) => state);

  const { absolutelyNot, setDate, handleDateChange } = useDefault(
    (state) => state,
  );

  const dateArray: TimeType[] = getWeekCalendarDateList(startDate, endDate);

  useEffect(() => {
    if (defaultScheduleData) {
      setDate(defaultScheduleFormatter(defaultScheduleData, startDate));
    }
  }, [defaultScheduleData, setDate, startDate]);

  useEffect(() => {
    if (defaultScheduleIsLoading) {
      open();
    } else {
      close();
    }
  }, [close, defaultScheduleIsLoading, open]);

  return (
    <div
      className={
        "p-2 border-2 rounded-lg snap-center border-neutral-200 w-[90vw] h-full flex flex-col"
      }
    >
      <div className={"grid grid-cols-2 px-2"}>
        <div>
          <div className={"text-sm"}>From</div>
          <div className={"text-xl font-semibold"}>
            {startDate.getMonth() + 1}월 {startDate.getDate()}
          </div>
        </div>
        <div>
          <div className={"text-sm"}>To</div>
          <div className={"text-xl font-semibold"}>
            {endDate.getMonth() + 1}월 {endDate.getDate()}
          </div>
        </div>
      </div>
      <div className={"w-full grid grid-cols-7 h-full"}>
        {dateArray.map((data, i) => (
          <div key={i} className={"h-full flex flex-col"}>
            <div className={"flex items-center flex-col"}>
              <div className={"text-sm"}>{toKoDay(data.time.getDay())}</div>
              <div className={"font-semibold"}>{data.time.getDate()}</div>
            </div>
            {timeGenerator(9, 24).map((time, j) => {
              const timeData = JSON.stringify({
                year: data.time.getFullYear(),
                month: data.time.getMonth(),
                day: data.time.getDay(),
                date: data.time.getDate(),
                hour: time.hour,
                minutes: time.minutes,
              });
              if (!data.isAvailable) {
                return (
                  <div
                    key={j}
                    className={`noselect h-full text-[10px] flex items-start justify-end border-[1px] bg-neutral-400 border-neutral-400`}
                  >
                    <p>
                      {time.hour}:{time.minutes}
                    </p>
                  </div>
                );
              }

              return (
                <div
                  key={j}
                  data-time={timeData}
                  className={`noselect h-full text-[10px] flex items-start justify-end border-[1px] ${absolutelyNot.includes(timeData) ? "bg-emerald-700 text-white border-emerald-800" : "border-neutral-300"}`}
                  onMouseDown={() => {
                    setIsDragging(true);
                    handleDateChange(timeData);
                  }}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseEnter={() => {
                    if (isDragging) {
                      handleDateChange(timeData);
                    }
                  }}
                  onTouchStart={() => {
                    setIsDragging(true);
                    handleDateChange(timeData);
                  }}
                  onTouchEnd={() => setIsDragging(false)}
                  onTouchMove={(e: TouchEvent<HTMLDivElement>) => {
                    if (!isDragging) return;

                    const touch = e.touches[0];
                    const element = document.elementFromPoint(
                      touch.clientX,
                      touch.clientY,
                    ) as HTMLElement | null;

                    if (element && element.dataset.time) {
                      handleDateChange(element.dataset.time);
                    }
                  }}
                >
                  <p>
                    {time.hour}:{time.minutes}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
