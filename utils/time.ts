import { format, isDate as isDateFn, parseISO } from 'date-fns';

export const slashTimeFormatter = 'yyyy/MM/dd HH:mm:ss';

// ts 类型收窄，判断是否为Date类型
function isDate(target: any): target is Date {
  return isDateFn(target);
}

export function formatSlashTime(date: Date | string | undefined): string {
  if (!date) {
    return '-';
  }

  if (isDate(date)) {
    return format(date, slashTimeFormatter);
  }

  return format(parseISO(date), slashTimeFormatter);
}
