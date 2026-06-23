/**
 * @summary Return the current moment as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the current moment as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The current `Temporal.ZonedDateTime` in `timeZone`
 */
export function todayZonedDateTime(
  timeZone: string = Temporal.Now.timeZoneId()
): Temporal.ZonedDateTime {
  return Temporal.Now.zonedDateTimeISO(timeZone);
}
