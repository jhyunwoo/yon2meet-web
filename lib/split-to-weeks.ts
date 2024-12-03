import { addDays, differenceInDays } from "date-fns";

export default function splitToWeeks(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const days: Date[] = [];
  for (let i = 0; i < differenceInDays(endDate, startDate) + 1; i += 1) {
    days.push(addDays(startDate, i));
  }

  const weeks: Date[][] = [];

  while (days.length > 0) {
    const day = days.shift();
    let week: Date[] = [];
    if (day) {
      week.push(day);
      for (let j = 0; j < 6 - day.getDay(); j += 1) {
        const target = days.shift();
        if (target) {
          week.push(target);
        } else {
          break;
        }
      }
    }
    weeks.push(week);
  }
  return weeks;
}
