import { dateToPlainDateTime } from './convert.js';
import { resolveFirstWeekContainsDate, resolveWeekStartsOn } from './default-options.js';
import { isoDayOfWeekToSundayBased } from './week.js';
import { type DateLike } from '../types.js';

/**
 * The options shared by the local week-numbering functions ({@link getWeek}, {@link getWeekYear},
 * {@link setWeek}, {@link setWeekYear}, {@link startOfWeekYear}, and others).
 */
export interface LocalWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

function toPlainDateOnly(date: Date | DateLike): Temporal.PlainDate {
  if (date instanceof Date) {
    return dateToPlainDateTime(date).toPlainDate();
  }
  if (date instanceof Temporal.PlainDate) {
    return date;
  }
  return date.toPlainDate();
}

function startOfLocalWeek(date: Temporal.PlainDate, weekStartsOn: number): Temporal.PlainDate {
  const sundayBasedDay = isoDayOfWeekToSundayBased(date.dayOfWeek);
  const daysSinceStart =
    sundayBasedDay < weekStartsOn
      ? sundayBasedDay - weekStartsOn + 7
      : sundayBasedDay - weekStartsOn;
  return date.subtract({ days: daysSinceStart });
}

function startOfWeekYear(
  date: Temporal.PlainDate,
  weekStartsOn: number,
  firstWeekContainsDate: number
): Temporal.PlainDate {
  const year = date.year;
  const firstWeekOfThisYear = Temporal.PlainDate.from({
    year,
    month: 1,
    day: firstWeekContainsDate,
  });
  return startOfLocalWeek(firstWeekOfThisYear, weekStartsOn);
}

// Takes already-resolved (defaulted) plain numbers — for callers, like
// format()'s per-token formatters, that resolved weekStartsOn/
// firstWeekContainsDate once upfront and need to reuse them across many
// tokens without re-resolving (and without LocalWeekOptions' narrow literal
// union, which a plain `number` variable can't satisfy).
export function getWeekYearValueResolved(
  date: Date | DateLike,
  weekStartsOn: number,
  firstWeekContainsDate: number
): number {
  const plainDate = toPlainDateOnly(date);
  const year = plainDate.year;

  const startOfNextYear = startOfWeekYear(
    Temporal.PlainDate.from({ year: year + 1, month: 1, day: 1 }),
    weekStartsOn,
    firstWeekContainsDate
  );
  const startOfThisYear = startOfWeekYear(
    Temporal.PlainDate.from({ year, month: 1, day: 1 }),
    weekStartsOn,
    firstWeekContainsDate
  );

  if (Temporal.PlainDate.compare(plainDate, startOfNextYear) >= 0) {
    return year + 1;
  }
  if (Temporal.PlainDate.compare(plainDate, startOfThisYear) >= 0) {
    return year;
  }
  return year - 1;
}

export function getWeekValueResolved(
  date: Date | DateLike,
  weekStartsOn: number,
  firstWeekContainsDate: number
): number {
  const plainDate = toPlainDateOnly(date);
  const weekYear = getWeekYearValueResolved(plainDate, weekStartsOn, firstWeekContainsDate);
  const startOfThisWeek = startOfLocalWeek(plainDate, weekStartsOn);
  const startOfTheWeekYear = startOfWeekYear(
    Temporal.PlainDate.from({ year: weekYear, month: 1, day: 1 }),
    weekStartsOn,
    firstWeekContainsDate
  );

  const daysDiff = startOfThisWeek.since(startOfTheWeekYear, { largestUnit: 'days' }).days;
  return Math.round(daysDiff / 7) + 1;
}

export function getWeekYearValue(date: Date | DateLike, options?: LocalWeekOptions): number {
  return getWeekYearValueResolved(
    date,
    resolveWeekStartsOn(options?.weekStartsOn),
    resolveFirstWeekContainsDate(options?.firstWeekContainsDate)
  );
}

export function getWeekValue(date: Date | DateLike, options?: LocalWeekOptions): number {
  return getWeekValueResolved(
    date,
    resolveWeekStartsOn(options?.weekStartsOn),
    resolveFirstWeekContainsDate(options?.firstWeekContainsDate)
  );
}

export function startOfWeekYearPlainDate(
  date: Date | DateLike,
  options?: LocalWeekOptions
): Temporal.PlainDate {
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);
  const firstWeekContainsDate = resolveFirstWeekContainsDate(options?.firstWeekContainsDate);
  const year = getWeekYearValueResolved(date, weekStartsOn, firstWeekContainsDate);
  return startOfWeekYear(
    Temporal.PlainDate.from({ year, month: 1, day: 1 }),
    weekStartsOn,
    firstWeekContainsDate
  );
}
