import DefaultLayout from "@/app/components/default-layout";
import LogInOrAddScheduleButton from "@/app/meet/[meetId]/log-in-or-add-schedule-button";
import CopyLinkButton from "@/app/meet/[meetId]/copy-link-button";
import db from "@/db";
import { meets } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function MeetPage({
  params,
}: {
  params: Promise<{ meetId: string }>;
}) {
  const { meetId } = await params;
  const meetData = (
    await db.select().from(meets).where(eq(meets.id, meetId))
  )[0];

  return (
    <DefaultLayout className={"flex flex-col p-4"}>
      <div className={"w-full py-4 flex items-center justify-between"}>
        <div>
          <div className={"text-sm"}>
            {meetData.absolutelyNot?.length}명 입력
          </div>
          <div className={"text-3xl font-bold"}>{meetData.title}</div>
        </div>
        <CopyLinkButton />
      </div>
      <div
        className={
          "w-full h-full bg-emerald-50 rounded-lg flex items-center justify-center"
        }
      >
        <div>Calendar Area</div>
      </div>
      <LogInOrAddScheduleButton meetId={meetId} />
    </DefaultLayout>
  );
}
