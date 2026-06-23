/**
 * @summary Is the given value a `Temporal.ZonedDateTime`?
 *
 * @description
 * Is the given value a `Temporal.ZonedDateTime`?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.ZonedDateTime`
 */
export function isZonedDateTime(value: unknown): value is Temporal.ZonedDateTime {
  return value instanceof Temporal.ZonedDateTime;
}
