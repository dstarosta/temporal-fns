// Per the UTC rule, PlainDateTime's wall-clock fields are read as UTC, so the
// epoch is resolved through the UTC zone rather than the system zone.
/**
 * @summary Create a `Temporal.PlainDateTime` from a Unix timestamp.
 *
 * @description
 * Create a `Temporal.PlainDateTime` from a Unix timestamp (in seconds). Decimal values will be
 * discarded. Per the UTC rule, the timestamp's wall-clock fields are resolved using UTC.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 *
 * @returns The date and time
 */
export function fromUnixTimePlainDateTime(unixTime: number): Temporal.PlainDateTime {
  return Temporal.Instant.fromEpochMilliseconds(unixTime * 1000)
    .toZonedDateTimeISO('UTC')
    .toPlainDateTime();
}
