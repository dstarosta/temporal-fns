import { dateToPlainDateTime } from './convert.js';
import { type DateLike } from '../types.js';

// weekOfYear/yearOfWeek are typed number | undefined because non-ISO calendars
// may not define week numbering — every Temporal value in this library uses
// the default iso8601 calendar, which always defines both, so these never throw.
export function requireWeekOfYear(weekOfYear: number | undefined): number {
  if (weekOfYear === undefined) {
    throw new TypeError('weekOfYear is undefined for this calendar.');
  }
  return weekOfYear;
}

export function requireYearOfWeek(yearOfWeek: number | undefined): number {
  if (yearOfWeek === undefined) {
    throw new TypeError('yearOfWeek is undefined for this calendar.');
  }
  return yearOfWeek;
}

export function getISOWeekValue(date: Date | DateLike): number {
  if (date instanceof Date) {
    return requireWeekOfYear(dateToPlainDateTime(date).weekOfYear);
  }
  return requireWeekOfYear(date.weekOfYear);
}

export function getISOWeekYearValue(date: Date | DateLike): number {
  if (date instanceof Date) {
    return requireYearOfWeek(dateToPlainDateTime(date).yearOfWeek);
  }
  return requireYearOfWeek(date.yearOfWeek);
}
