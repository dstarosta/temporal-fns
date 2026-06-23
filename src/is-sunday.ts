import { createIsDayOfWeek } from './helpers/is-day-of-week.js';

/**
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param date - The date to check
 *
 * @returns The date is Sunday
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * const result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
export const isSunday = createIsDayOfWeek(0);
