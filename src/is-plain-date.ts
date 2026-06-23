/**
 * @summary Is the given value a `Temporal.PlainDate`?
 *
 * @description
 * Is the given value a `Temporal.PlainDate`?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.PlainDate`
 */
export function isPlainDate(value: unknown): value is Temporal.PlainDate {
  return value instanceof Temporal.PlainDate;
}
