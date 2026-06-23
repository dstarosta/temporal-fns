import { type DateLike } from '../types.js';

export function addLeadingZeros(value: number, length: number): string {
  const sign = value < 0 ? '-' : '';
  return sign + Math.abs(value).toString().padStart(length, '0');
}

export interface DateTimeFields {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

export function getDateTimeFields(date: Date | DateLike): DateTimeFields {
  if (date instanceof Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      millisecond: date.getMilliseconds(),
    };
  }
  if (date instanceof Temporal.PlainDate) {
    return {
      year: date.year,
      month: date.month,
      day: date.day,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };
  }
  return {
    year: date.year,
    month: date.month,
    day: date.day,
    hour: date.hour,
    minute: date.minute,
    second: date.second,
    millisecond: date.millisecond,
  };
}

// Date and ZonedDateTime carry a real timezone, so the offset reflects that
// zone. PlainDate/PlainDateTime carry no timezone, so per the UTC rule they
// are treated as having a zero offset (their fields are semantically UTC).
export function getOffsetMinutes(date: Date | DateLike): number {
  if (date instanceof Date) {
    return date.getTimezoneOffset();
  }
  if (date instanceof Temporal.ZonedDateTime) {
    return -date.offsetNanoseconds / 60_000_000_000;
  }
  return 0;
}
