import { auth } from "@/auth";
import { NextResponse } from "next/server";
import db from "@/db";
import { meets, meetsToUsers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userMeets = await db
    .select({ meets: meets })
    .from(meetsToUsers)
    .innerJoin(meets, eq(meets.id, meetsToUsers.meetId))
    .where(eq(meetsToUsers.userId, session.user.id));

  console.log(userMeets);
  return NextResponse.json(userMeets);
}
