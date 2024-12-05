import ScheduleNameInput from "./components/schedule-name-input";
import CalendarList from "./components/calendar-list";
import CreateMeetButton from "./components/create-meet-button";
import DefaultLayout from "@/app/components/default-layout";

export default function HomePage() {
  return (
    <DefaultLayout className={'flex flex-col p-4 gap-2 max-w-md items-center justify-center mx-auto'}>
      <ScheduleNameInput />
      <div
        className={
          "overflow-y-auto ring-2 ring-neutral-300 rounded-xl w-full h-full max-w-sm"
        }
      >
        <CalendarList
          start={{ year: 2024, month: 12 }}
          end={{ year: 2025, month: 11 }}
        />
      </div>
      <CreateMeetButton />
    </DefaultLayout>
  );
}
