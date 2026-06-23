import { startOfDay } from './start-of-day.js';
import { yesterdayPlainDateTime } from './yesterday-plain-date-time.js';

/**
 * @summary Return the start of yesterday as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the start of yesterday (midnight) as a `Temporal.PlainDateTime`. Per the UTC rule,
 * "today" is resolved using UTC before subtracting one day.
 *
 * @returns Midnight UTC yesterday, as a `Temporal.PlainDateTime`
 */
export function startOfYesterdayPlainDateTime(): Temporal.PlainDateTime {
  return startOfDay(yesterdayPlainDateTime());
}
