import { type DateLike, type TimeLike } from '../types.js';

export function zeroTime<T extends DateLike>(date: T): T {
  if (date instanceof Temporal.PlainDate) {
    return date;
  }
  return date.with({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  }) as T;
}

export function endTime<T extends DateLike>(date: T): T {
  if (date instanceof Temporal.PlainDate) {
    return date;
  }
  return date.with({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
    microsecond: 0,
    nanosecond: 0,
  }) as T;
}

export function zeroBelowHour<T extends TimeLike>(date: T): T {
  return date.with({ minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }) as T;
}

export function endBelowHour<T extends TimeLike>(date: T): T {
  return date.with({
    minute: 59,
    second: 59,
    millisecond: 999,
    microsecond: 0,
    nanosecond: 0,
  }) as T;
}

export function zeroBelowMinute<T extends TimeLike>(date: T): T {
  return date.with({ second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }) as T;
}

export function endBelowMinute<T extends TimeLike>(date: T): T {
  return date.with({ second: 59, millisecond: 999, microsecond: 0, nanosecond: 0 }) as T;
}

export function zeroBelowSecond<T extends TimeLike>(date: T): T {
  return date.with({ millisecond: 0, microsecond: 0, nanosecond: 0 }) as T;
}

export function endBelowSecond<T extends TimeLike>(date: T): T {
  return date.with({ millisecond: 999, microsecond: 0, nanosecond: 0 }) as T;
}
