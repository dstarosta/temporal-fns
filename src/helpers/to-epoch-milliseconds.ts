import { type DateLike } from '../types.js';

// Converts any supported value to an absolute instant for distance comparisons.
// Date and ZonedDateTime carry a real timezone, so their real elapsed-time
// instant is used. PlainDate/PlainDateTime carry no timezone, so per the UTC
// rule their wall-clock fields are read as UTC.
export function toEpochMilliseconds(date: Date | DateLike): number {
  if (date instanceof Date) {
    return date.getTime();
  }
  if (date instanceof Temporal.ZonedDateTime) {
    return date.epochMilliseconds;
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
