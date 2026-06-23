import { createIsDayOfWeek } from './helpers/is-day-of-week.js';

/**
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param date - The date to check
 *
 * @returns The date is Saturday
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * const result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
export const isSaturday = createIsDayOfWeek(6);
