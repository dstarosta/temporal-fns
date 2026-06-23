import { toComparable } from './to-comparable.js';
import { type DateLike } from '../types.js';

export function compare(a: Date | DateLike, b: Date | DateLike): number {
  const left = toComparable(a);
  const right = toComparable(b);

  if (left instanceof Temporal.PlainDate && right instanceof Temporal.PlainDate) {
    return Temporal.PlainDate.compare(left, right);
  }
  if (left instanceof Temporal.PlainDateTime && right instanceof Temporal.PlainDateTime) {
    return Temporal.PlainDateTime.compare(left, right);
  }
  if (left instanceof Temporal.ZonedDateTime && right instanceof Temporal.ZonedDateTime) {
    return Temporal.ZonedDateTime.compare(left, right);
  }
  throw new TypeError('Cannot compare values of different Temporal types.');
}
