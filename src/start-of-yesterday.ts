import { startOfDay } from './start-of-day.js';
import { subDays } from './sub-days.js';

/**
 * @summary Return the start of yesterday.
 *
 * @description
 * Return the start of yesterday.
 *
 * @returns The start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
export function startOfYesterday(): Date {
  return startOfDay(subDays(new Date(), 1));
}
