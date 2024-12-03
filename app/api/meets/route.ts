import db from "@/db";
import { meets, meetsToUsers } from "@/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const res = (await request.json()) as {
    title: string;
    startDate: string;
    endDate: string;
  };

  const createMeet = await db
    .insert(meets)
    .values({
      title: res.title,
      startDate: res.startDate,
      endDate: res.endDate,
    })
    .returning({ id: meets.id });

  const session = await auth();
  if (session?.user?.id) {
    await db
      .insert(meetsToUsers)
      .values({ userId: session.user.id, meetId: createMeet[0].id });
  }

  return NextResponse.json({ id: createMeet[0].id });
}
