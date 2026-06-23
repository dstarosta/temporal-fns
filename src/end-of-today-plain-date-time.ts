import { endOfDay } from './end-of-day.js';
import { todayPlainDateTime } from './today-plain-date-time.js';

/**
 * @summary Return the end of today as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the end of today (23:59:59.999999999) as a `Temporal.PlainDateTime`. Per the UTC rule,
 * "today" is resolved using UTC.
 *
 * @returns The end of today UTC, as a `Temporal.PlainDateTime`
 */
export function endOfTodayPlainDateTime(): Temporal.PlainDateTime {
  return endOfDay(todayPlainDateTime());
}
