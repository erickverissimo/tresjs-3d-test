export const DaysOfWeek = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday',
} as const;

export const daysOfWeekKeys = Object.values(DaysOfWeek) as [
  (typeof DaysOfWeek)[keyof typeof DaysOfWeek]
];

export function getDayOfWeek(date: Date): string {
  const day = date.getDay();
  return daysOfWeekKeys[day];
}
