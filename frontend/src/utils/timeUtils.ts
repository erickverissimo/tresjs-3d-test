export interface TimerItem {
  timer: string | number | Date;
}

export function getTimelapseInSeconds(msStart: number, msEnd: number): number {
  return Math.floor((msEnd - msStart) / 1000);
}

export function calcTimeInSeconds(timerList?: TimerItem[]): {
  seconds: number;
  currentStartTime: number | null;
} {
  let totalSeconds = 0;
  let currentStartTime: number | null = null;
  if (timerList) {
    const timers = timerList.map((timerItem) =>
      new Date(timerItem.timer).getTime(),
    );
    timers.sort((a, b) => a - b);

    if (timers.length % 2 === 1) {
      currentStartTime = timers[timers.length - 1];
    }

    for (let i = 0; i < timers.length - 1; i += 2) {
      const seconds = getTimelapseInSeconds(timers[i], timers[i + 1]);
      totalSeconds += seconds;
    }
  }

  return { seconds: totalSeconds, currentStartTime };
}

export function formatSecondsForClock(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = (totalSeconds % 3600) % 60;

  const hoursStr = `${hours}`.padStart(2, '0');
  const secondsStr = `${seconds}`.padStart(2, '0');
  const minutesStr = `${minutes}`.padStart(2, '0');

  const format =
    hours > 0
      ? `${hoursStr}:${minutesStr}:${secondsStr}`
      : `${minutesStr}:${secondsStr}`;

  return format;
}

export function formatDurationForDisplay(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  // const seconds = totalSeconds % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  // if (hours > 0) {
  //   return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}s`;
  // }

  return `${pad(hours)}h${pad(minutes)}min`;
}

export function timeConvert(minutes: number): string {
  const num = minutes;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutess = (hours - rhours) * 60;
  const rminutes = Math.round(minutess);

  const hoursStr = `${rhours}`.padStart(2, '0');
  const minutesStr = `${rminutes}`.padStart(2, '0');

  return `${hoursStr}:${minutesStr}`;
}

export function estimatedTime(miliseconds: number): string {
  const seconds = miliseconds / 1000;
  const minutes = seconds / 60;
  return timeConvert(minutes);
}

export function getSecondsBetween(startDate: Date, finalDate: Date): number {
  const miliseconds = finalDate.getTime() - startDate.getTime();
  return miliseconds / 1000;
}

export function getMinutesBetween(startDate: Date, finalDate: Date): number {
  const seconds = getSecondsBetween(startDate, finalDate);
  return seconds / 60;
}
