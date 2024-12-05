import { auth } from "@/auth";
import { NextResponse } from "next/server";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const body = await request.json();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await db
    .update(users)
    .set({
      defaultSchedule: body.schedule,
    })
    .where(eq(users.id, session.user.id));
  return NextResponse.json({ message: "Successfully updated schedule" });
}
