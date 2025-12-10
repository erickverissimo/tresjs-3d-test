import { format } from 'date-fns';
import { TZDate } from '@date-fns/tz';

export const SECONDS_IN_DAY = 24 * 60 * 60;

export function getCurrentDateStartDay() {
  return toStartDay(new Date());
}

export function getCurrentDateEndDay() {
  return toEndDay(new Date());
}

export function toStartDay(date: Date): Date {
  const newDate = new Date(date.getTime());
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
}

export function toEndDay(date: Date): Date {
  const newDate = new Date(date.getTime());
  newDate.setUTCHours(23, 59, 59, 999);
  return newDate;
}

export function fromIsoWithStartDay(date: string) {
  return toStartDay(new Date(date));
}

export function fromIsoWithEndDay(date: string) {
  return toEndDay(new Date(date));
}

export function firstDayOfMonth(year: number, month: number) {
  return new Date(`${year}-${month}-01`);
}

export function lastDayOfMonth(year: number, month: number): Date {
  const date = new Date(year, month - 1, 32);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dateOfLastDayOfMonth = new Date(firstDay.toISOString());
  dateOfLastDayOfMonth.setDate(dateOfLastDayOfMonth.getDate() - 1);

  return dateOfLastDayOfMonth;
}

export function plusDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

export function plusMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function plusHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export function plusYears(date: Date, years: number): Date {
  const newDate = new Date(date.getTime());
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

export function plusSeconds(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000);
}

export function subtractMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() - minutes * 60 * 1000);
}

export function subtractHours(date: Date, hours: number): Date {
  return new Date(date.getTime() - hours * 60 * 60 * 1000);
}

export function subtractSeconds(date: Date, seconds: number): Date {
  return new Date(date.getTime() - seconds * 1000);
}

export function getMinutesBetween(date1: Date, date2: Date): number {
  return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60);
}

export function getDaysBetween(date1: Date, date2: Date): number {
  return Math.floor(
    Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24))
  );
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

export function formatarDataBrasileira(date: Date): {
  data: string;
  hora: string;
} {
  const dataUtc = new Date(date);

  // Converte para horário do Brasil (UTC-3), considerando horário de verão automaticamente
  const opcoes: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('pt-BR', opcoes);
  const partes = formatter.formatToParts(dataUtc);

  const dia = partes.find((p) => p.type === 'day')?.value;
  const mes = partes.find((p) => p.type === 'month')?.value;
  const ano = partes.find((p) => p.type === 'year')?.value;
  const hora = partes.find((p) => p.type === 'hour')?.value;
  const minuto = partes.find((p) => p.type === 'minute')?.value;

  return {
    data: `${dia}.${mes}.${ano}`,
    hora: `${hora}:${minuto}`,
  };
}

export function convertTime(
  time: string,
  fromTimezone: string,
  toTimezone: string = 'UTC',
  referenceDate: Date = new Date()
): string {
  // Validação do formato de entrada
  const timeRegex = /^([0-1]?\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    throw new Error('Formato de hora inválido. Use HH:MM (ex: 08:00)');
  }

  const [hours, minutes] = time.split(':').map(Number);

  // Usa a data de referência fornecida
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const day = referenceDate.getDate();

  // Função auxiliar para obter offset de um timezone
  function getTimezoneOffset(timezone: string, date: Date): number {
    if (timezone === 'UTC') {
      return 0;
    }

    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'longOffset',
    });

    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find((part) => part.type === 'timeZoneName');

    if (!timeZonePart) {
      throw new Error(`Timezone inválido: ${timezone}`);
    }

    // Parse do offset (ex: "GMT-03:00" -> -180 minutos)
    const offsetMatch = timeZonePart.value.match(/GMT([+-])(\d{2}):(\d{2})/);
    if (!offsetMatch) {
      throw new Error(
        `Não foi possível determinar o offset do timezone: ${timezone}`
      );
    }

    const sign = offsetMatch[1] === '+' ? 1 : -1;
    const offsetHours = parseInt(offsetMatch[2], 10);
    const offsetMinutes = parseInt(offsetMatch[3], 10);
    return sign * (offsetHours * 60 + offsetMinutes);
  }

  // Cria um objeto Date base usando a data de referência e o horário especificado
  const baseDate = new Date();
  baseDate.setFullYear(year, month, day);
  baseDate.setHours(hours, minutes, 0, 0);

  // Obtém os offsets dos timezones na data de referência (importante para horário de verão)
  const fromOffset = getTimezoneOffset(fromTimezone, baseDate);
  const toOffset = getTimezoneOffset(toTimezone, baseDate);

  // Converte o horário do timezone origem para UTC, depois para o timezone destino
  // Primeiro, converte de timezone origem para UTC (subtrai o offset de origem)
  const utcTime = baseDate.getTime() - fromOffset * 60 * 1000;

  // Depois, converte de UTC para timezone destino (adiciona o offset de destino)
  const targetTime = utcTime + toOffset * 60 * 1000;

  const targetDate = new Date(targetTime);

  // Retorna o horário no formato HH:MM
  const resultHours = targetDate.getHours().toString().padStart(2, '0');
  const resultMinutes = targetDate.getMinutes().toString().padStart(2, '0');

  return `${resultHours}:${resultMinutes}`;
}

export function formatToFaceRecognitionDate(date: Date): string {
  const brasilDate = new TZDate(date, 'America/Sao_Paulo');
  return format(brasilDate, 'yyyy-MM-dd HH:mm:ss');
}
