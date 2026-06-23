import { addDays } from './add-days.js';
import { endOfDay } from './end-of-day.js';

/**
 * @summary Return the end of tomorrow.
 *
 * @description
 * Return the end of tomorrow.
 *
 * @returns The end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
export function endOfTomorrow(): Date {
  return endOfDay(addDays(new Date(), 1));
}
