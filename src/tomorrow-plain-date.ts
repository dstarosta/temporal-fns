/**
 * @summary Return tomorrow's date as a `Temporal.PlainDate`.
 *
 * @description
 * Return tomorrow's date as a `Temporal.PlainDate`, using the system's current timezone to
 * determine today's calendar date before adding one day.
 *
 * @returns Tomorrow, as a `Temporal.PlainDate`
 */
export function tomorrowPlainDate(): Temporal.PlainDate {
  return Temporal.Now.plainDateISO().add({ days: 1 });
}
