//#region src/types.d.ts
/**
 * @summary A Temporal type that supports calendar-unit arithmetic and differences.
 *
 * @description
 * A Temporal type that supports date-unit arithmetic and differences (days/weeks/months/years):
 * `Temporal.PlainDate`, `Temporal.PlainDateTime`, or `Temporal.ZonedDateTime`. `Temporal.Instant`
 * is excluded — it has no calendar and rejects date-unit `Duration`s.
 *
 * For `differenceInDays`/`differenceInWeeks`/`differenceInMonths`/`differenceInYears`
 * specifically: `Date` and `Temporal.ZonedDateTime` carry a real timezone, so results are
 * local-timezone, DST-aware "is this period full" math. `Temporal.PlainDate` and
 * `Temporal.PlainDateTime` carry no timezone at all, so their fields are treated as UTC —
 * results have no DST adjustment and no offset.
 */
type DateLike = Temporal.PlainDateTime | Temporal.PlainDate | Temporal.ZonedDateTime;
/**
 * @summary A Temporal type that supports time-unit arithmetic and differences.
 *
 * @description
 * A Temporal type that supports time-unit arithmetic and differences (hours/minutes/seconds):
 * `Temporal.PlainDateTime`, or `Temporal.ZonedDateTime`. `Temporal.PlainDate` is excluded — it
 * has no time component, and `Duration` balancing would silently round sub-day amounts into
 * whole days (e.g. +1 hour would be a no-op).
 *
 * For `differenceInHours`/`differenceInMinutes`/`differenceInSeconds` specifically: `Date` and
 * `Temporal.ZonedDateTime` carry a real timezone, so results are real-elapsed-time (DST-aware).
 * `Temporal.PlainDateTime` carries no timezone, so subtraction is pure wall-clock math with no
 * DST adjustment.
 */
type TimeLike = Temporal.PlainDateTime | Temporal.ZonedDateTime;
/**
 * @summary An object that combines two dates to represent a time interval.
 *
 * @description
 * An object that combines two dates to represent the time interval, with both ends resolved to
 * the same concrete type. Unlike some interval representations, `start` is not required to be
 * `<= end` at the type level — functions that iterate (e.g. `eachDayOfInterval`) automatically
 * reverse direction for an inverted interval.
 *
 * @typeParam T - The concrete date type shared by both `start` and `end`.
 */
interface Interval<T> {
  /** The start of the interval. */
  start: T;
  /** The end of the interval. */
  end: T;
}
//#endregion
export { DateLike, Interval, TimeLike };
//# sourceMappingURL=types.d.ts.map