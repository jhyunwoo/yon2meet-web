import DefaultLayout from "@/app/components/default-layout";
import WeekCalendar from "@/app/components/week-calendar";
import db from "@/db";
import { meets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { addDays, differenceInDays } from "date-fns";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ meetId: string }>;
}) {
  const { meetId } = await params;
  const meetDateRange = (
    await db
      .select({ startDate: meets.startDate, endDate: meets.endDate })
      .from(meets)
      .where(eq(meets.id, meetId))
      .limit(1)
  )[0];

  const startDate = new Date(meetDateRange.startDate);
  const endDate = new Date(meetDateRange.endDate);

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

  return (
    <DefaultLayout className={"p-2 flex flex-col gap-2"}>
      <div className={"flex snap-x overflow-x-auto overflow-y-hidden h-full"}>
        <div className={"whitespace-nowrap flex gap-4 px-4 h-full"}>
          {weeks.map((weekData, i) => (
            <WeekCalendar
              startDate={weekData[0]}
              endDate={weekData[weekData.length - 1]}
              key={i}
            />
          ))}
        </div>
      </div>
      <button
        type={"button"}
        className={"p-2 rounded-lg bg-emerald-500 text-white"}
      >
        등록 완료
      </button>
    </DefaultLayout>
  );
}
