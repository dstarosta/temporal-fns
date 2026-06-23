import { createIsDayOfWeek } from './helpers/is-day-of-week.js';

/**
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param date - The date to check
 *
 * @returns The date is Tuesday
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * const result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
export const isTuesday = createIsDayOfWeek(2);
