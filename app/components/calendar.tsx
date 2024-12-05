"use client";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import {useCreateSchedule} from "@/lib/stores/create-schedule";

function getMonthDates(year: number, month: number) {
  const startDate = startOfMonth(new Date(year, month - 1, 1));
  const endDate = endOfMonth(new Date(year, month - 1, 1));

  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
}

function CalenderHeader() {
  return (
    <>
      <div
        className={"border-b-2 flex items-center justify-center rounded-tl-lg"}
      >
        일
      </div>
      <div className={"border-b-2 flex items-center justify-center"}>월</div>
      <div className={"border-b-2 flex items-center justify-center"}>화</div>
      <div className={"border-b-2 flex items-center justify-center"}>수</div>
      <div className={"border-b-2 flex items-center justify-center"}>목</div>
      <div className={"border-b-2 flex items-center justify-center"}>금</div>
      <div
        className={"border-b-2 flex items-center justify-center rounded-tr-lg"}
      >
        토
      </div>
    </>
  );
}

export default function Calendar({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const { setStart, setEnd, start, end } = useCreateSchedule((state) => state);

  const dates = getMonthDates(year, month);
  const emptyDates = [];
  for (let i = 0; i < dates[0].getDay(); i++) {
    emptyDates.push(1);
  }

  function handlePickDate(date: Date) {
    if (start === undefined) {
      setStart(date);
    } else if (date < start) {
      setStart(date);
      setEnd(undefined);
    } else if (start && end) {
      setStart(date);
      setEnd(undefined);
    } else {
      setEnd(date);
    }
  }

  return (
    <div className={"flex flex-col items-center justify-center p-4 w-full"}>
      <div className={"font-semibold text-xl"}>
        {year}년 {month}월
      </div>
      <div className={"grid grid-cols-7 w-full place-items-stretch aspect-1"}>
        <CalenderHeader />
        {emptyDates.map((_, index) => (
          <div key={index} />
        ))}
        {dates.map((date, index) => (
          <button
            type={"button"}
            disabled={date.getMonth() !== month - 1}
            onClick={() => handlePickDate(date)}
            key={index}
            className={`flex items-center justify-center ${isSameDay(date, start!) ? "rounded-l-xl" : ""} ${isSameDay(date, end!) ? "rounded-r-xl" : ""} ${isSameDay(date, start!) || isSameDay(date, end!) ? "bg-emerald-500 text-white" : ""} ${start! < date && date < end! ? "bg-emerald-200" : ""} ${date.getDay() === 0 && !(isSameDay(date, start!) || isSameDay(date, end!)) ? "text-red-600" : ""} ${date.getDay() === 6 && !(isSameDay(date, start!) || isSameDay(date, end!)) ? "text-blue-600" : ""}`}
          >
            <div>{date.getDate()}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
