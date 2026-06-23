import { createIsDayOfWeek } from './helpers/is-day-of-week.js';

/**
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param date - The date to check
 *
 * @returns The date is Thursday
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * const result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
export const isThursday = createIsDayOfWeek(4);
