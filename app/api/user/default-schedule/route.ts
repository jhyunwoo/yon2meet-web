import { auth } from "@/auth";
import { NextResponse } from "next/server";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import toDefaultScheduleFormat from "@/lib/to-default-schedule-format";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const defaultSchedule = (
    await db
      .select({ schedule: users.defaultSchedule })
      .from(users)
      .where(eq(users.id, session.user.id))
  )[0].schedule;

  return NextResponse.json(defaultSchedule);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as { schedule: string[] };

  await db
    .update(users)
    .set({ defaultSchedule: toDefaultScheduleFormat(body.schedule) })
    .where(eq(users.id, session.user.id));
  return NextResponse.json({ message: "Updated" });
}
