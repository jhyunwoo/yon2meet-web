import { DefaultScheduleType } from "@/app/everytime/image-upload-button";

export default function toDefaultScheduleFormat(times: string[]) {
  const data: DefaultScheduleType[] = [];
  for (const time of times) {
    const timeData = {
      day: 0,
      date: 0,
      hour: 0,
      minutes: 0,
    };
    const formatTime = JSON.parse(time);
    timeData.date = Number(formatTime.date);
    timeData.hour = Number(formatTime.hour);
    timeData.minutes = Number(formatTime.minutes);
    timeData.day = Number(formatTime.day);
    data.push(timeData);
  }

  return data;
}
