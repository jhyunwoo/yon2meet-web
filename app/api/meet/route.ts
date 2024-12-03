import db from "@/db";
import { meets } from "@/db/schema";

export async function POST(request: Request) {
  const res = (await request.json()) as {
    title: string;
    startDate: string;
    endDate: string;
  };

  console.log(res);
  const createMeet = await db
    .insert(meets)
    .values({
      title: res.title,
      startDate: res.startDate,
      endDate: res.endDate,
    })
    .returning({ id: meets.id });
  return Response.json({ id: createMeet[0].id });
}
