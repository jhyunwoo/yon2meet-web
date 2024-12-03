import ScheduleNameInput from "@/app/components/schedule-name-input";
import CalendarList from "@/app/components/calendar-list";
import CreateMeetButton from "@/app/components/create-meet-button";

export default function HomePage() {
  return (
    <div className={"w-full h-screen flex flex-col pt-14 p-4 gap-2"}>
      <ScheduleNameInput />
      <div
        className={
          "overflow-x-auto ring-2 ring-neutral-400 rounded-xl w-full h-full max-w-sm"
        }
      >
        <CalendarList
          start={{ year: 2024, month: 12 }}
          end={{ year: 2025, month: 11 }}
        />
      </div>
      <CreateMeetButton />
    </div>
  );
}
