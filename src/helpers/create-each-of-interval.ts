import { compare } from './compare.js';
import { type DateLike, type Interval } from '../types.js';

/**
 * The options shared by the `eachXOfInterval` family ({@link eachDayOfInterval},
 * {@link eachWeekOfInterval}, {@link eachMonthOfInterval}, and others).
 */
export interface EachOfIntervalOptions {
  step?: number;
}

// Shared step/reversal/iteration logic for the eachXOfInterval family.
// `snap` aligns a boundary to the unit (e.g. start of day/week/month/hour);
// `add` advances by `step` units of that type.
//
// The loop always walks chronologically forward and pushes (never unshifts) — unshift is O(n) per
// call, which would make the whole loop O(n^2) for any interval whose desired output order is
// reversed (a reversed `interval.start`/`interval.end`, or a negative `step`). Pushing forward and
// reversing the finished array once at the end (O(n) total) produces the identical element order
// without that cost.
export function eachOfInterval<T extends Date | DateLike>(
  interval: Interval<T>,
  options: EachOfIntervalOptions | undefined,
  snap: (date: T) => T,
  add: (date: T, amount: number) => T
): T[] {
  const originalReversed = compare(interval.start, interval.end) > 0;

  let step = options?.step ?? 1;
  if (step === 0) {
    return [];
  }
  const stepDirection = Math.sign(step);
  step = Math.abs(step);

  const logicalStart = originalReversed ? interval.end : interval.start;
  const logicalEnd = originalReversed ? interval.start : interval.end;
  const startBoundary = snap(logicalStart);
  const endBoundary = snap(logicalEnd);

  // Matches the prior reversed/unshift logic exactly: reversed = originalReversed XOR (step < 0).
  const shouldReverseResult = stepDirection < 0 !== originalReversed;

  // `current` and `endBoundary` are always the same concrete type for the whole loop (decided once,
  // above) - picking the comparator once here avoids re-running compare()'s type dispatch on every
  // iteration, which matters since this loop runs once per emitted item.
  const lessOrEqual: (a: T, b: T) => boolean =
    startBoundary instanceof Date
      ? (a, b) => (a as Date).getTime() <= (b as Date).getTime()
      : (a, b) => compare(a, b) <= 0;

  const dates: T[] = [];
  let current = startBoundary;
  while (lessOrEqual(current, endBoundary)) {
    dates.push(current);
    current = add(current, step);
  }

  if (shouldReverseResult) {
    dates.reverse();
  }

  return dates;
}
