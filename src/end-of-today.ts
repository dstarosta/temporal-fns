import { endOfDay } from './end-of-day.js';

/**
 * @summary Return the end of today.
 *
 * @description
 * Return the end of today.
 *
 * @returns The end of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
export function endOfToday(): Date {
  return endOfDay(new Date());
}
