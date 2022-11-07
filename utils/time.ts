import { format, isDate as isDateFn, parseISO } from 'date-fns';

export const dashTimeFormatter = 'yyyy-MM-dd HH:mm:ss';
export const dateFormatter = 'yyyy-MM-dd';
export const yearFormatter = 'yyyy';
export const yearMonthFormatter = 'yyyy-MM';
export const monthDayFormatter = 'MM-dd';

// ts 类型收窄，判断是否为Date类型
function isDate(target: any): target is Date {
  return isDateFn(target);
}

export function formatTime(
  date: Date | string | undefined,
  formatter = dashTimeFormatter
): string {
  if (!date) {
    return '-';
  }

  if (isDate(date)) {
    return format(date, formatter);
  }

  return format(parseISO(date), formatter);
}
