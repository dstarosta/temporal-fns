/**
 * @summary Create a `Temporal.ZonedDateTime` from a Unix timestamp.
 *
 * @description
 * Create a `Temporal.ZonedDateTime` from a Unix timestamp (in seconds), in the given timezone.
 * Decimal values will be discarded.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The date and time in `timeZone`
 */
export function fromUnixTimeZonedDateTime(
  unixTime: number,
  timeZone: string = Temporal.Now.timeZoneId()
): Temporal.ZonedDateTime {
  return Temporal.Instant.fromEpochMilliseconds(unixTime * 1000).toZonedDateTimeISO(timeZone);
}
