/**
 * @summary Return yesterday's date as a `Temporal.PlainDate`.
 *
 * @description
 * Return yesterday's date as a `Temporal.PlainDate`, using the system's current timezone to
 * determine today's calendar date before subtracting one day.
 *
 * @returns Yesterday, as a `Temporal.PlainDate`
 */
export function yesterdayPlainDate(): Temporal.PlainDate {
  return Temporal.Now.plainDateISO().subtract({ days: 1 });
}
