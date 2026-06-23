import { getQuarterValue } from './get-quarter.js';
import { setMonth } from './set-month.js';
import { type DateLike } from './types.js';

/**
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @param date - The date to be changed
 * @param quarter - The quarter of the new date
 *
 * @returns The new date with the quarter set
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
export function setQuarter(date: Date, quarter: number): Date;
/**
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param quarter - The quarter of the new date
 *
 * @returns The new date with the quarter set
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
export function setQuarter<T extends DateLike>(date: T, quarter: number): T;
export function setQuarter(date: Date | DateLike, quarter: number): Date | DateLike {
  const oldQuarter = getQuarterValue(date);
  const diff = quarter - oldQuarter;

  if (date instanceof Date) {
    return setMonth(date, date.getMonth() + diff * 3);
  }
  return setMonth(date, date.month - 1 + diff * 3);
}
