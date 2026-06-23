/**
 * @summary Return today's date at midnight as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return today's date at midnight as a `Temporal.PlainDateTime`. Per the UTC rule, since
 * `Temporal.PlainDateTime` has no timezone, "today" is resolved using UTC, not the system's
 * local timezone.
 *
 * @returns Today at midnight UTC, as a `Temporal.PlainDateTime`
 */
export function todayPlainDateTime(): Temporal.PlainDateTime {
  return Temporal.Now.plainDateTimeISO('UTC');
}
