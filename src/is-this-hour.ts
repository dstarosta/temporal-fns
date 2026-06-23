import { constructNowTimeValue } from './construct-now.js';
import { isSameHourValue } from './is-same-hour.js';
import { type TimeLike } from './types.js';

/**
 * @summary Is the given date in the same hour as the current date?
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this hour
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * const result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
export function isThisHour(date: Date | TimeLike): boolean {
  return isSameHourValue(date, constructNowTimeValue(date));
}
