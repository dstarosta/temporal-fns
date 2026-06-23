import { addDays } from './add-days.js';
import { startOfDay } from './start-of-day.js';

/**
 * @summary Return the start of tomorrow.
 *
 * @description
 * Return the start of tomorrow.
 *
 * @returns The start of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
export function startOfTomorrow(): Date {
  return startOfDay(addDays(new Date(), 1));
}
