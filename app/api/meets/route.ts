import db from "../../../db";
import { NextRequest, NextResponse } from "next/server";
import { meets, meetsToUsers } from "@/db/schema";
import { auth } from "@/auth";
import { desc, eq } from "drizzle-orm";

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

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page"));
  const count = Number(searchParams.get("count"));
  const meetsData = await db
    .select({
      id: meets.id,
      title: meets.title,
      startDate: meets.startDate,
      endDate: meets.endDate,
    })
    .from(meetsToUsers)
    .innerJoin(meets, eq(meets.id, meetsToUsers.meetId))
    .orderBy(desc(meets.startDate))
    .limit(count)
    .offset((page - 1) * count)
    .where(eq(meetsToUsers.userId, session.user.id));

  return NextResponse.json(meetsData);
}
