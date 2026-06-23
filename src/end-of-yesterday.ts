import { endOfDay } from './end-of-day.js';
import { subDays } from './sub-days.js';

/**
 * @summary Return the end of yesterday.
 *
 * @description
 * Return the end of yesterday.
 *
 * @returns The end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
export function endOfYesterday(): Date {
  return endOfDay(subDays(new Date(), 1));
}
