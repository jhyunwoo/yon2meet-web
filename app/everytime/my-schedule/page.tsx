import DefaultLayout from "@/app/components/default-layout";
import UntouchableWeekCalendar from "@/app/everytime/my-schedule/untouchable-week-calendar";
import Link from "next/link";

export default function MySchedulePage() {
  return (
    <DefaultLayout className={"p-4 flex flex-col items-center"}>
      <div className={"w-full max-w-md"}>
        <div className={"flex items-center justify-between"}>
          <div className={"text-2xl font-bold py-2"}>고정 시간표</div>
          <Link
            href={"/everytime/edit"}
            className={"p-1 px-3 rounded-lg bg-emerald-500 text-white"}
          >
            수정
          </Link>
        </div>
        <UntouchableWeekCalendar
          startDate={new Date(2024, 11, 1)}
          endDate={new Date(2024, 11, 7)}
        />
      </div>
    </DefaultLayout>
  );
}
