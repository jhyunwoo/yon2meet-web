import DefaultLayout from "@/app/components/default-layout";
import WeekCalendar from "@/app/components/week-calendar";
import db from "@/db";
import { meets } from "@/db/schema";
import { eq } from "drizzle-orm";
import SubmitButton from "@/app/meet/[meetId]/schedule/submit-button";
import SetSchedule from "@/app/meet/[meetId]/schedule/set-schedule";
import { auth } from "@/auth";
import splitToWeeks from "@/lib/split-to-weeks";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ meetId: string }>;
}) {
  const session = await auth();
  const { meetId } = await params;
  const meetData = (
    await db
      .select({
        startDate: meets.startDate,
        endDate: meets.endDate,
        adjustable: meets.adjustable,
        absolutelyNot: meets.absolutelyNot,
      })
      .from(meets)
      .where(eq(meets.id, meetId))
      .limit(1)
  )[0];

  const weeks = splitToWeeks(meetData.startDate, meetData.endDate);

  return (
    <DefaultLayout className={"p-2 flex flex-col gap-2"}>
      <SetSchedule
        adjustable={
          meetData.adjustable?.filter(
            (data) => data.userId === session?.user?.id,
          )[0]
        }
        absolutelyNot={
          meetData.absolutelyNot?.filter(
            (data) => data.userId === session?.user?.id,
          )[0]
        }
      />
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
      <SubmitButton meetId={meetId} />
    </DefaultLayout>
  );
}
