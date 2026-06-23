import { withDate } from './convert.js';
import { type DateLike, type TimeLike } from '../types.js';

type DateUnit = 'days' | 'weeks' | 'months' | 'years';
type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'milliseconds';

const millisecondsPerUnit: Record<TimeUnit, number> = {
  hours: 3_600_000,
  minutes: 60_000,
  seconds: 1_000,
  milliseconds: 1,
};

// days/weeks are pure day-count arithmetic with no calendar-overflow ambiguity (unlike
// months/years, where e.g. Jan 31 + 1 month must constrain to Feb 29, not overflow into March -
// Temporal's `.add()` and `Date#setMonth()` can disagree there). `Date#setDate()` operates on
// calendar fields directly (like `Temporal.PlainDateTime#add()`), so it's DST-safe and produces
// identical results to the Temporal round-trip below, without the conversion/allocation cost -
// this matters because eachDayOfInterval/eachWeekOfInterval call this once per emitted item.
const daysPerUnit: Record<'days' | 'weeks', number> = {
  days: 1,
  weeks: 7,
};

// Date and Temporal.ZonedDateTime carry a real timezone, so adding a calendar
// unit (days/weeks/months/years) is pure calendar-field arithmetic — there is
// no elapsed-time ambiguity to introduce, so both branches agree regardless
// of local/UTC interpretation.
export function createAddDateLikeUnit(unit: DateUnit, sign: 1 | -1) {
  if (unit === 'days' || unit === 'weeks') {
    const unitDays = daysPerUnit[unit];
    return function addUnit<T extends DateLike>(date: T | Date, amount: number): T | Date {
      const signedDays = (sign === 1 ? amount : -amount) * unitDays;
      if (date instanceof Date) {
        const result = new Date(date);
        result.setDate(result.getDate() + signedDays);
        return result;
      }
      return date.add({ days: signedDays }) as T;
    };
  }

  return function addUnit<T extends DateLike>(date: T | Date, amount: number): T | Date {
    const signedAmount = sign === 1 ? amount : -amount;
    if (date instanceof Date) {
      return withDate(date, (dateTime) => dateTime.add({ [unit]: signedAmount }));
    }
    return date.add({ [unit]: signedAmount }) as T;
  };
}

export function createAddDateUnit(unit: DateUnit) {
  const fn = createAddDateLikeUnit(unit, 1);
  function addUnit(date: Date, amount: number): Date;
  function addUnit<T extends DateLike>(date: T, amount: number): T;
  function addUnit(date: Date | DateLike, amount: number): Date | DateLike {
    return fn(date, amount);
  }
  return addUnit;
}

export function createSubDateUnit(unit: DateUnit) {
  const fn = createAddDateLikeUnit(unit, -1);
  function subUnit(date: Date, amount: number): Date;
  function subUnit<T extends DateLike>(date: T, amount: number): T;
  function subUnit(date: Date | DateLike, amount: number): Date | DateLike {
    return fn(date, amount);
  }
  return subUnit;
}

// Date and Temporal.ZonedDateTime carry a real timezone, so adding a time
// unit (hours/minutes/seconds) must be real-elapsed-time (DST-aware) math —
// Date via millisecond arithmetic, ZonedDateTime via its own `.add()` (which
// already resolves through the instant). Temporal.PlainDateTime carries no
// timezone, so `.add()` is pure wall-clock arithmetic with no DST — this
// matches `date-fns` used with `@date-fns/utc`'s `UTCDate`, not plain
// `date-fns`.
export function createAddTimeLikeUnit(unit: TimeUnit, sign: 1 | -1) {
  const unitMs = millisecondsPerUnit[unit];
  return function addUnit<T extends TimeLike>(date: T | Date, amount: number): T | Date {
    const signedAmount = sign === 1 ? amount : -amount;
    if (date instanceof Date) {
      return new Date(date.getTime() + signedAmount * unitMs);
    }
    return date.add({ [unit]: signedAmount }) as T;
  };
}

export function createAddTimeUnit(unit: TimeUnit) {
  const fn = createAddTimeLikeUnit(unit, 1);
  function addUnit(date: Date, amount: number): Date;
  function addUnit<T extends TimeLike>(date: T, amount: number): T;
  function addUnit(date: Date | TimeLike, amount: number): Date | TimeLike {
    return fn(date, amount);
  }
  return addUnit;
}

export function createSubTimeUnit(unit: TimeUnit) {
  const fn = createAddTimeLikeUnit(unit, -1);
  function subUnit(date: Date, amount: number): Date;
  function subUnit<T extends TimeLike>(date: T, amount: number): T;
  function subUnit(date: Date | TimeLike, amount: number): Date | TimeLike {
    return fn(date, amount);
  }
  return subUnit;
}
