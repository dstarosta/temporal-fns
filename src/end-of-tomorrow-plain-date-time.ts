import { endOfDay } from './end-of-day.js';
import { tomorrowPlainDateTime } from './tomorrow-plain-date-time.js';

/**
 * @summary Return the end of tomorrow as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the end of tomorrow (23:59:59.999999999) as a `Temporal.PlainDateTime`. Per the UTC
 * rule, "today" is resolved using UTC before adding one day.
 *
 * @returns The end of tomorrow UTC, as a `Temporal.PlainDateTime`
 */
export function endOfTomorrowPlainDateTime(): Temporal.PlainDateTime {
  return endOfDay(tomorrowPlainDateTime());
}
