import { addDays, differenceInDays } from "date-fns";
import { TimeType } from "@/app/components/untouchable-week-calendar";

export function getWeekCalendarDateList(startDate: Date, endDate: Date) {
  const dateArray: TimeType[] = [];
  const gapBetweenDay = differenceInDays(endDate, startDate) + 1;

  if (startDate.getDay() !== 0) {
    for (let i = 0; i < startDate.getDay(); i += 1) {
      dateArray.push({
        time: addDays(startDate, -1 * (i + 1)),
        isAvailable: false,
      });
    }
    dateArray.reverse();
  }

  for (let i = 0; i < gapBetweenDay; i += 1) {
    dateArray.push({ time: addDays(startDate, i), isAvailable: true });
  }
  if (endDate.getDay() !== 6) {
    for (let i = 0; i < 6 - endDate.getDay(); i += 1) {
      dateArray.push({
        time: addDays(endDate, i + 1),
        isAvailable: false,
      });
    }
  }
  return dateArray;
}
