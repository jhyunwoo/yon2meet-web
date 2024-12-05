import db from "@/db";
import { eq } from "drizzle-orm";
import { meets } from "@/db/schema";
import splitToWeeks from "@/lib/split-to-weeks";
import React from "react";
import DefaultLayout from "@/app/components/default-layout";
import CopyLinkButton from "@/app/meet/[meetId]/copy-link-button";
import UntouchableWeekCalendar from "@/app/components/untouchable-week-calendar";
import LogInOrAddScheduleButton from "@/app/meet/[meetId]/log-in-or-add-schedule-button";

export default async function MeetPage({
  params,
}: {
  params: Promise<{ meetId: string }>;
}) {
  const { meetId } = await params;
  const meetData = (
    await db.select().from(meets).where(eq(meets.id, meetId))
  )[0];
  const weeks = splitToWeeks(meetData.startDate, meetData.endDate);

  return (
    <DefaultLayout className={"flex flex-col p-2 px-4"}>
      <div className={"w-full flex items-center justify-between"}>
        <div>
          <div className={"text-sm"}>
            {meetData.absolutelyNot?.length}명 입력
          </div>
          <div className={"text-3xl font-bold"}>{meetData.title}</div>
        </div>
        <CopyLinkButton />
      </div>

      <div className={"flex snap-x overflow-x-auto overflow-y-hidden h-full"}>
        <div className={"whitespace-nowrap flex gap-4 px-4 h-full"}>
          {weeks.map((weekData, i) => (
            <UntouchableWeekCalendar
              meetId={meetId}
              startDate={weekData[0]}
              endDate={weekData[weekData.length - 1]}
              key={i}
            />
          ))}
        </div>
      </div>

      <LogInOrAddScheduleButton meetId={meetId} />
    </DefaultLayout>
  );
}
