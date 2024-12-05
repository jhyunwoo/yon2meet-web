import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { DefaultScheduleType } from "@/app/everytime/image-upload-button";

export default function useDefaultSchedule() {
  const { data, error, isLoading, mutate } = useSWR<DefaultScheduleType[]>(
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
