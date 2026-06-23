/**
 * @summary Return today's date as a `Temporal.PlainDate`.
 *
 * @description
 * Return today's date as a `Temporal.PlainDate`, using the system's current timezone to
 * determine the calendar date.
 *
 * @returns Today, as a `Temporal.PlainDate`
 *
 * @example
 * // If today is 6 October 2014:
 * const result = todayPlainDate()
 * //=> PlainDate 2014-10-06
 */
export function todayPlainDate(): Temporal.PlainDate {
  return Temporal.Now.plainDateISO();
}
