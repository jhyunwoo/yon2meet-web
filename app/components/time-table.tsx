"use client";

import { useState } from "react";

interface TimeType {
  hour: number;
  minutes: number;
}

export default function TimeTable({
  startHour,
  endHour,
}: {
  startHour: number;
  endHour: number;
}) {
  const [selected, setSelected] = useState<number[]>([]);

  const timeList: TimeType[] = [];
  for (let i = 0; i < (endHour - startHour) * 2; i += 1) {
    timeList.push({
      hour: startHour + Math.floor(i / 2),
      minutes: i % 2 === 0 ? 0 : 30,
    });
  }

  function handleDragTime(index: number) {
    setSelected([...selected, index]);
  }

  return (
    <div className={"w-full flex flex-col h-full"}>
      {timeList.map((time, index) => (
        <div
          key={index}
          className={`border-2 border-neutral-300 w-full flex items-start justify-end h-full ${selected.includes(index) ? "bg-red-500" : ""}`}
          onDragStart={() => handleDragTime(index)}
          onTouchStart={() => handleDragTime(index)}
          onTouchMove={() => console.log(index)}
        >
          <p className={"text-xs text-neutral-600"}>
            {time.hour}:{time.minutes == 0 ? "00" : "30"}
          </p>
        </div>
      ))}
    </div>
  );
}
