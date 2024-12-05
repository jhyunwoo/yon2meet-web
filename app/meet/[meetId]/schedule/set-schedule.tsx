"use client";

import { useEffect } from "react";
import {useSelectedDate} from "@/lib/stores/selected-date";
import {ScheduleType} from "@/db/schema";

export default function SetSchedule({
  adjustable,
  absolutelyNot,
}: {
  adjustable: ScheduleType | undefined;
  absolutelyNot: ScheduleType | undefined;
}) {
  const { setDate } = useSelectedDate((state) => state);
  useEffect(() => {
    if (adjustable && absolutelyNot) {
      setDate(absolutelyNot.schedules, adjustable.schedules);
    }
  }, [absolutelyNot, adjustable, setDate]);
  return <></>;
}
