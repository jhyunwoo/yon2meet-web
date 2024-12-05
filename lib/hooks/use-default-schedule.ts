import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { ScheduleType } from "@/app/everytime/image-upload-button";

export default function useDefaultSchedule() {
  const { data, error, isLoading, mutate } = useSWR<ScheduleType[]>(
    `/api/user/default-schedule`,
    fetcher,
  );

  return {
    defaultScheduleData: data,
    defaultScheduleError: error,
    defaultScheduleIsLoading: isLoading,
    mutateDefaultSchedule: mutate,
  };
}
