import { createIsDayOfWeek } from './helpers/is-day-of-week.js';

/**
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param date - The date to check
 *
 * @returns The date is Friday
 *
 * @example
 * // Is 26 September 2014 Friday?
 * const result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
export const isFriday = createIsDayOfWeek(5);
