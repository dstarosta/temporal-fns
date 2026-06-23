import { startOfDay } from './start-of-day.js';

/**
 * @summary Return the start of today.
 *
 * @description
 * Return the start of today.
 *
 * @returns The start of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
export function startOfToday(): Date {
  return startOfDay(new Date());
}
