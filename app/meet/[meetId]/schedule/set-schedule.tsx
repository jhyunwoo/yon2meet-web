"use client";

import { ScheduleType } from "@/db/schema";
import { useSelectedDate } from "@/lib/stores/selected-date";
import { useEffect } from "react";

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
  }, []);
  return <></>;
}
