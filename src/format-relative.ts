import { differenceInCalendarDaysValue } from './difference-in-calendar-days.js';
import { format } from './format.js';
import { type DateLike } from './types.js';

/**
 * The {@link formatRelative} function options.
 */
export interface FormatRelativeOptions {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

type FormatRelativeToken = 'lastWeek' | 'yesterday' | 'today' | 'tomorrow' | 'nextWeek' | 'other';

const formatRelativeLocale: Record<FormatRelativeToken, string> = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P',
};

function getToken(diff: number): FormatRelativeToken {
  if (diff < -6) {
    return 'other';
  }
  if (diff < -1) {
    return 'lastWeek';
  }
  if (diff < 0) {
    return 'yesterday';
  }
  if (diff < 1) {
    return 'today';
  }
  if (diff < 2) {
    return 'tomorrow';
  }
  if (diff < 7) {
    return 'nextWeek';
  }
  return 'other';
}

/**
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date.
 *
 * | Distance to the base date | Result                    |
 * |-----------------------------|---------------------------|
 * | Previous 6 days           | last Sunday at 04:30 AM   |
 * | Last day                  | yesterday at 04:30 AM     |
 * | Same day                  | today at 04:30 AM         |
 * | Next day                  | tomorrow at 04:30 AM      |
 * | Next 6 days               | Sunday at 04:30 AM        |
 * | Other                     | 12/31/2017                |
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date. In this example, today is Wednesday
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last Thursday at 12:45 AM"
 */
export function formatRelative(date: Date, baseDate: Date, options?: FormatRelativeOptions): string;
/**
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date.
 *
 * | Distance to the base date | Result                    |
 * |-----------------------------|---------------------------|
 * | Previous 6 days           | last Sunday at 04:30 AM   |
 * | Last day                  | yesterday at 04:30 AM     |
 * | Same day                  | today at 04:30 AM         |
 * | Next day                  | tomorrow at 04:30 AM      |
 * | Next 6 days               | Sunday at 04:30 AM        |
 * | Other                     | 12/31/2017                |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`/`baseDate`, which must share the same
 * concrete type.
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date. In this example, today is Wednesday
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last Thursday at 12:45 AM"
 */
export function formatRelative<T extends DateLike>(
  date: T,
  baseDate: T,
  options?: FormatRelativeOptions
): string;
export function formatRelative(
  date: Date | DateLike,
  baseDate: Date | DateLike,
  options?: FormatRelativeOptions
): string {
  const diff = differenceInCalendarDaysValue(date, baseDate);
  const token = getToken(diff);
  const formatStr = formatRelativeLocale[token];

  return format(date, formatStr, options);
}
