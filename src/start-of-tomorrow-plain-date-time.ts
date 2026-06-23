import { startOfDay } from './start-of-day.js';
import { tomorrowPlainDateTime } from './tomorrow-plain-date-time.js';

/**
 * @summary Return the start of tomorrow as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the start of tomorrow (midnight) as a `Temporal.PlainDateTime`. Per the UTC rule,
 * "today" is resolved using UTC before adding one day.
 *
 * @returns Midnight UTC tomorrow, as a `Temporal.PlainDateTime`
 */
export function startOfTomorrowPlainDateTime(): Temporal.PlainDateTime {
  return startOfDay(tomorrowPlainDateTime());
}
