/**
 * @summary Is the given value a `Temporal.PlainDateTime`?
 *
 * @description
 * Is the given value a `Temporal.PlainDateTime`?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.PlainDateTime`
 */
export function isPlainDateTime(value: unknown): value is Temporal.PlainDateTime {
  return value instanceof Temporal.PlainDateTime;
}
