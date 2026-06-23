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
export function eachOfInterval<T extends Date | DateLike>(
  interval: Interval<T>,
  options: EachOfIntervalOptions | undefined,
  snap: (date: T) => T,
  add: (date: T, amount: number) => T
): T[] {
  const reversedInterval = compare(interval.start, interval.end) > 0;
  const startBoundary = snap(reversedInterval ? interval.end : interval.start);
  const endBoundary = snap(reversedInterval ? interval.start : interval.end);

  let step = options?.step ?? 1;
  if (step === 0) {
    return [];
  }
  let reversed = reversedInterval;
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates: T[] = [];
  let current = startBoundary;
  while (compare(current, endBoundary) <= 0) {
    if (reversed) {
      dates.unshift(current);
    } else {
      dates.push(current);
    }
    current = add(current, step);
  }

  return dates;
}
