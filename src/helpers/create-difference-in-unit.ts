import { type TimeLike } from '../types.js';

type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'milliseconds';

const millisecondsPerUnit: Record<TimeUnit, number> = {
  hours: 3_600_000,
  minutes: 60_000,
  seconds: 1_000,
  milliseconds: 1,
};

export function createDifferenceInTimeUnitValue(unit: TimeUnit) {
  const unitMs = millisecondsPerUnit[unit];
  return function differenceInValue(a: Date | TimeLike, b: Date | TimeLike): number {
    if (a instanceof Date && b instanceof Date) {
      const result = Math.trunc((a.getTime() - b.getTime()) / unitMs);
      return result === 0 ? 0 : result;
    }
    if (a instanceof Temporal.PlainDateTime && b instanceof Temporal.PlainDateTime) {
      return a.since(b, { largestUnit: unit })[unit];
    }
    if (a instanceof Temporal.ZonedDateTime && b instanceof Temporal.ZonedDateTime) {
      return a.since(b, { largestUnit: unit })[unit];
    }
    throw new TypeError('Cannot compute a difference between values of different Temporal types.');
  };
}

export function createDifferenceInTimeUnit(unit: TimeUnit) {
  const fn = createDifferenceInTimeUnitValue(unit);
  function differenceIn(a: Date, b: Date): number;
  function differenceIn<T extends TimeLike>(a: T, b: T): number;
  function differenceIn(a: Date | TimeLike, b: Date | TimeLike): number {
    return fn(a, b);
  }
  return differenceIn;
}
