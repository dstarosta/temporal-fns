import { type DateLike } from '../types.js';

// Reads a value's wall-clock fields as if they were UTC, removing the DST/
// timezone offset from the result. This mirrors date-fns' internal
// `getTimezoneOffsetInMilliseconds` subtraction in getOverlappingDaysInIntervals,
// which exists so that a 24-hour calendar day is always exactly 86_400_000ms
// regardless of where a DST transition falls within the interval.
// Date and ZonedDateTime carry a real timezone, so their local wall-clock
// fields are read; PlainDate/PlainDateTime carry no timezone and their fields
// are already the "UTC-equivalent" per the UTC rule.
export function toDstNormalizedMilliseconds(date: Date | DateLike): number {
  if (date instanceof Date) {
    return Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );
  }
  if (date instanceof Temporal.ZonedDateTime) {
    return Date.UTC(
      date.year,
      date.month - 1,
      date.day,
      date.hour,
      date.minute,
      date.second,
      date.millisecond
    );
  }
  if (date instanceof Temporal.PlainDateTime) {
    return Date.UTC(
      date.year,
      date.month - 1,
      date.day,
      date.hour,
      date.minute,
      date.second,
      date.millisecond
    );
  }
  return Date.UTC(date.year, date.month - 1, date.day);
}
