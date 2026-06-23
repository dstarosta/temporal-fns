import { endOfDay } from './end-of-day.js';
import { yesterdayPlainDateTime } from './yesterday-plain-date-time.js';

/**
 * @summary Return the end of yesterday as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the end of yesterday (23:59:59.999999999) as a `Temporal.PlainDateTime`. Per the UTC
 * rule, "today" is resolved using UTC before subtracting one day.
 *
 * @returns The end of yesterday UTC, as a `Temporal.PlainDateTime`
 */
export function endOfYesterdayPlainDateTime(): Temporal.PlainDateTime {
  return endOfDay(yesterdayPlainDateTime());
}
