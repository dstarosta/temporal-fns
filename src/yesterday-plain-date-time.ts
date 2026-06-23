import { subDays } from './sub-days.js';
import { todayPlainDateTime } from './today-plain-date-time.js';

/**
 * @summary Return yesterday's date at midnight as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return yesterday's date at midnight as a `Temporal.PlainDateTime`. Per the UTC rule, "today"
 * is resolved using UTC before subtracting one day.
 *
 * @returns Yesterday at midnight UTC, as a `Temporal.PlainDateTime`
 */
export function yesterdayPlainDateTime(): Temporal.PlainDateTime {
  return subDays(todayPlainDateTime(), 1);
}
