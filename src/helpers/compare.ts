import { toComparable } from './to-comparable.js';
import { type DateLike } from '../types.js';

export function compare(a: Date | DateLike, b: Date | DateLike): number {
  // Avoid round-tripping both sides through Temporal.PlainDateTime when they're already plain
  // Dates: comparing their millisecond timestamps directly is equivalent (same wall-clock fields
  // produce the same relative order) and far cheaper - this matters for hot loops like
  // eachOfInterval, which calls compare() once per emitted item.
  if (a instanceof Date && b instanceof Date) {
    return Math.sign(a.getTime() - b.getTime());
  }

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
