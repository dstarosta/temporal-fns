import { addDays } from './add-days.js';
import { todayPlainDateTime } from './today-plain-date-time.js';

/**
 * @summary Return tomorrow's date at midnight as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return tomorrow's date at midnight as a `Temporal.PlainDateTime`. Per the UTC rule, "today" is
 * resolved using UTC before adding one day.
 *
 * @returns Tomorrow at midnight UTC, as a `Temporal.PlainDateTime`
 */
export function tomorrowPlainDateTime(): Temporal.PlainDateTime {
  return addDays(todayPlainDateTime(), 1);
}
