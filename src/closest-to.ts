import { closestIndexTo } from './closest-index-to.js';
import { type DateLike } from './types.js';

/**
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns The date from the array closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * const dateToCompare = new Date(2015, 8, 6)
 * const result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
export function closestTo(dateToCompare: Date, dates: readonly Date[]): Date | undefined;
/**
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dateToCompare`/`dates`, which must share the same
 * concrete type; the result has that same type.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns The date from the array closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * const dateToCompare = new Date(2015, 8, 6)
 * const result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
export function closestTo<T extends DateLike>(dateToCompare: T, dates: readonly T[]): T | undefined;
export function closestTo(
  dateToCompare: Date | DateLike,
  dates: readonly (Date | DateLike)[]
): Date | DateLike | undefined {
  const index = closestIndexTo(dateToCompare as Date, dates as readonly Date[]);
  return index === undefined ? undefined : dates[index];
}
