import {
  format,
  differenceInDays,
  isSameDay,
  isBefore,
  setSeconds,
  setMinutes,
  startOfDay,
  setHours,
  endOfDay,
} from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

export function filterDayTimeByDate(date: Date, dayTime?: string) {
  let start: Date;
  let end: Date;

  switch (dayTime) {
    case 'morning':
      start = setSeconds(setMinutes(setHours(startOfDay(date), 0), 0), 0); // 00:00:00
      end = setSeconds(setMinutes(setHours(date, 12), 0), 0); // 12:00:00
      break;

    case 'afternoon':
      start = setSeconds(setMinutes(setHours(date, 12), 0), 0); // 12:00:00
      end = setSeconds(setMinutes(setHours(date, 17), 0), 0); // 17:00:00
      break;

    case 'night':
      start = setSeconds(setMinutes(setHours(date, 17), 0), 0); // 17:00:00
      end = setSeconds(setMinutes(setHours(endOfDay(date), 23), 59), 59); // 23:59:59
      break;

    default:
      start = startOfDay(date);
      end = endOfDay(date);
      break;
  }

  return {
    start,
    end,
  };
}

export function toStartDay(date: Date) {
  const newDate = new Date(date.getTime());
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
}

export function toEndDay(date: Date) {
  const newDate = new Date(date.getTime());
  newDate.setUTCHours(23, 59, 59, 999);
  return newDate;
}

export function getCurrentDateStartDay() {
  return toStartDay(new Date());
}

export function getCurrentDateEndDay() {
  return toEndDay(new Date());
}

export function fromIsoWithStartDay(date: Date) {
  return toStartDay(new Date(date));
}

export function fromIsoWithEndDay(date: Date) {
  return toEndDay(new Date(date));
}

export function firstDayOfMonth(year: number, month: number) {
  return new Date(`${year}-${month}-01`);
}

export function lastDayOfMonth(year: number, month: number) {
  const date = new Date(year, month - 1, 32);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dateOfLastDayOfMonth = new Date(firstDay.toISOString());
  dateOfLastDayOfMonth.setDate(dateOfLastDayOfMonth.getDate() - 1);

  return dateOfLastDayOfMonth;
}

export function between(startDate: Date, endDate: Date, date: Date) {
  const start = toStartDay(new Date(startDate));
  const end = toStartDay(new Date(endDate));
  const betweenDate = toStartDay(new Date(date));

  return start <= betweenDate && betweenDate <= end;
}

export function convertDateAndTimeToRequest(date: Date, time: string): Date {
  const dateStr = date.toISOString().split('T')[0];
  const myTime = time + ':00';
  const dateTime = dateStr + 'T' + myTime;
  const formatedDate = new Date(dateTime);
  return formatedDate;
}

export function convertDateAndTimeToRequestAsString(
  date: Date,
  time: string,
): string {
  const dateStr = date.toISOString().split('T')[0];
  const myTime = time + ':00';
  const dateTime = dateStr + 'T' + myTime;
  return dateTime;
}

export function splitDateAndTimeFromRequest(date: Date): {
  date: string;
  time: string;
} {
  const formattedDate = format(date, 'dd/MM/yyyy', { locale: ptBR });
  const formattedTime = format(date, 'HH:mm');

  return { date: formattedDate, time: formattedTime };
}

export function formatDurationFromSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function getDifferenceInDays(startDate: Date, endDate: Date): number {
  return differenceInDays(startDate, endDate);
}

export function isTheSameDate(startDate: Date, endDate: Date): boolean {
  return isSameDay(startDate, endDate);
}

export function isTodayOrBefore(startDate: Date, endDate: Date): boolean {
  return isSameDay(startDate, endDate) || isBefore(endDate, startDate);
}

export function formattedDate(date: Date): string {
  const daysOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day} ${month}, ${dayOfWeek}`;
}
