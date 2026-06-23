import { startOfDay } from './start-of-day.js';
import { todayPlainDateTime } from './today-plain-date-time.js';

/**
 * @summary Return the start of today as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the start of today (midnight) as a `Temporal.PlainDateTime`. Per the UTC rule, "today"
 * is resolved using UTC.
 *
 * @returns Midnight UTC today, as a `Temporal.PlainDateTime`
 */
export function startOfTodayPlainDateTime(): Temporal.PlainDateTime {
  return startOfDay(todayPlainDateTime());
}
