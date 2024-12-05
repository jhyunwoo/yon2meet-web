import useSWR from "swr";
import fetcher from "@/lib/fetcher";

interface MeetType {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

export default function useMeets(page: number, count: number) {
  const { data, error, isLoading, mutate } = useSWR<MeetType[]>(
    `/api/meets?page=${page}&count=${count}`,
    fetcher,
  );

  return {
    meetsData: data,
    meetsError: error,
    meetsIsLoading: isLoading,
    mutateMeets: mutate,
  };
}
