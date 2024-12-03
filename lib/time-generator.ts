export default function timeGenerator(startHour: number, endHour: number) {
  const gap = endHour - startHour;
  const timeList: { hour: string; minutes: string }[] = [];
  for (let i = 0; i < gap * 2; i += 1) {
    if (i % 2 === 0) {
      timeList.push({
        hour: `${startHour + Math.floor(i / 2)}`,
        minutes: "00",
      });
    } else {
      timeList.push({
        hour: `${startHour + Math.floor(i / 2)}`,
        minutes: "30",
      });
    }
  }

  return timeList;
}
