import { toEpochMilliseconds } from './helpers/to-epoch-milliseconds.js';
import { type DateLike } from './types.js';

/**
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns An index of the date closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * const dateToCompare = new Date(2015, 8, 6)
 * const datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * const result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
export function closestIndexTo(dateToCompare: Date, dates: readonly Date[]): number | undefined;
/**
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dateToCompare`/`dates`, which must share the same
 * concrete type.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns An index of the date closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * const dateToCompare = new Date(2015, 8, 6)
 * const datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * const result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
export function closestIndexTo<T extends DateLike>(
  dateToCompare: T,
  dates: readonly T[]
): number | undefined;
export function closestIndexTo(
  dateToCompare: Date | DateLike,
  dates: readonly (Date | DateLike)[]
): number | undefined {
  const compareMs = toEpochMilliseconds(dateToCompare);

  let result: number | undefined;
  let minDistance = -1;

  for (const [index, date] of dates.entries()) {
    const distance = Math.abs(compareMs - toEpochMilliseconds(date));
    if (result === undefined || distance < minDistance) {
      result = index;
      minDistance = distance;
    }
  }

  return result;
}
