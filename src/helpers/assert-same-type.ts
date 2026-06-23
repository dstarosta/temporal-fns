import { type DateLike } from '../types.js';

export function assertSameType(a: DateLike, b: DateLike): void {
  const sameType =
    (a instanceof Temporal.PlainDate && b instanceof Temporal.PlainDate) ||
    (a instanceof Temporal.PlainDateTime && b instanceof Temporal.PlainDateTime) ||
    (a instanceof Temporal.ZonedDateTime && b instanceof Temporal.ZonedDateTime);
  if (!sameType) {
    throw new TypeError('Cannot compare values of different Temporal types.');
  }
}
