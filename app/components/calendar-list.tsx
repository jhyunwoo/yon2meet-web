import { differenceInMonths } from "date-fns";
import Calendar from "./calendar";

interface MonthType {
  year: number;
  month: number;
}

export default function CalendarList({
  start,
  end,
}: {
  start: MonthType;
  end: MonthType;
}) {
  const startDate = new Date(start.year, start.month - 1);
  const endDate = new Date(end.year, end.month - 1);

  const monthsBetween = differenceInMonths(endDate, startDate) + 1;

  const monthList: MonthType[] = [];

  let startYear = start.year;
  let startMonth = start.month;
  for (let i = 0; i < monthsBetween; i++) {
    if (startMonth <= 12) {
      monthList.push({
        year: startYear,
        month: startMonth,
      });
    } else {
      startYear++;
      startMonth = 1;
      monthList.push({
        year: startYear,
        month: startMonth,
      });
    }
    startMonth++;
  }

  return (
    <>
      {monthList.map((date, index) => (
        <Calendar year={date.year} month={date.month} key={index} />
      ))}
    </>
  );
}
