import db from "@/db";
import { meets, meetsToUsers } from "@/db/schema";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ meetId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id || !session.user.name) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { meetId } = await params;
  const res = (await request.json()) as {
    absolutelyNot: string[];
    adjustable: string[];
  };

  let prevData = (
    await db
      .select({
        adjustable: meets.adjustable,
        absolutelyNot: meets.absolutelyNot,
      })
      .from(meets)
      .where(eq(meets.id, meetId))
      .limit(1)
  )[0];

  if (prevData.absolutelyNot) {
    for (let i = 0; i < prevData.absolutelyNot.length; i += 1) {
      if (prevData.absolutelyNot[i].userId === session.user.id) {
        prevData.absolutelyNot.splice(i, 1);
      }
    }
  }
  if (prevData.adjustable) {
    for (let i = 0; i < prevData.adjustable.length; i += 1) {
      if (prevData.adjustable[i].userId === session.user.id) {
        prevData.adjustable.splice(i, 1);
      }
    }
  }

  await db
    .update(meets)
    .set({
      adjustable: [
        ...(prevData.adjustable ? prevData.adjustable : []),
        {
          userName: session.user.name,
          userId: session.user.id,
          schedules: res.adjustable,
        },
      ],
      absolutelyNot: [
        ...(prevData.absolutelyNot ? prevData.absolutelyNot : []),
        {
          userName: session.user.name,
          userId: session.user.id,
          schedules: res.absolutelyNot,
        },
      ],
    })
    .where(eq(meets.id, meetId));

  // Link meet and user
  const findPrevLink = await db
    .select()
    .from(meetsToUsers)
    .where(
      and(
        eq(meetsToUsers.userId, session.user.id),
        eq(meetsToUsers.meetId, meetId),
      ),
    );

  if (findPrevLink.length === 0) {
    await db
      .insert(meetsToUsers)
      .values({ userId: session.user.id, meetId: meetId });
  }

  return NextResponse.json({ message: "Success" });
}
