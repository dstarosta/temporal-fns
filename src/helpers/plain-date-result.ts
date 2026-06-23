import { dateToPlainDateTime, plainDateTimeToDate } from './convert.js';
import { type DateLike } from '../types.js';

// Converts a Temporal.PlainDate result back into whichever type the original
// `date | DateLike` input was: Date stays Date, PlainDate stays PlainDate,
// PlainDateTime/ZonedDateTime keep their original time-of-day's calendar
// portion replaced but their own type (and, for ZonedDateTime, time zone).
export function plainDateResultAs(
  result: Temporal.PlainDate,
  original: Date | DateLike
): Date | DateLike {
  if (original instanceof Date) {
    return plainDateTimeToDate(result.toPlainDateTime());
  }
  if (original instanceof Temporal.PlainDate) {
    return result;
  }
  if (original instanceof Temporal.PlainDateTime) {
    return result.toPlainDateTime();
  }
  return result.toZonedDateTime(original.timeZoneId);
}

export function toPlainDate(value: Date | DateLike): Temporal.PlainDate {
  if (value instanceof Date) {
    const dateTime = dateToPlainDateTime(value);
    return Temporal.PlainDate.from({
      year: dateTime.year,
      month: dateTime.month,
      day: dateTime.day,
    });
  }
  if (value instanceof Temporal.PlainDate) {
    return value;
  }
  return Temporal.PlainDate.from({ year: value.year, month: value.month, day: value.day });
}
