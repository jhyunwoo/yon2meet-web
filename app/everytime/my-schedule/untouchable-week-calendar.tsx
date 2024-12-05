"use client";

import { getWeekCalendarDateList } from "@/lib/get-week-calendar-date-list";
import toKoDay from "@/lib/to-ko-day";
import timeGenerator from "@/lib/time-generator";
import useDefaultSchedule from "@/lib/hooks/use-default-schedule";
import { defaultScheduleFormatter } from "@/app/everytime/edit/week-calendar";

export interface TimeType {
  time: Date;
  isAvailable: boolean;
}

export default function UntouchableWeekCalendar({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const adjustable: string[] = [];

  const dateArray: TimeType[] = getWeekCalendarDateList(startDate, endDate);

  const { defaultScheduleData } = useDefaultSchedule();

  const absolutelyNot: string[] = defaultScheduleData
    ? defaultScheduleFormatter(defaultScheduleData, startDate)
    : [];

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
                  className={`noselect h-full text-[10px] flex items-start justify-end border-[1px] ${absolutelyNot?.includes(timeData) ? "bg-emerald-700 text-white border-emerald-800" : adjustable.includes(timeData) ? "bg-sky-700 text-white border-sky-800" : "border-neutral-200"} `}
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
