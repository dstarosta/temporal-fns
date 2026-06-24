//#region src/format-duration.d.ts
/**
 * An object that represents a duration in years, months, weeks, days, hours, minutes and seconds.
 */
interface Duration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
type FormatDurationUnit = keyof Duration;
/**
 * The {@link formatDuration} function options.
 */
interface FormatDurationOptions {
  format?: FormatDurationUnit[];
  zero?: boolean;
  delimiter?: string;
  locale?: Intl.LocalesArgument;
}
/**
 * @summary Formats a duration in human-readable format
 *
 * @description
 * Return human-readable duration string i.e. "9 months 2 days"
 *
 * @param duration - The duration to format
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Format full duration
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds'
 *
 * @example
 * // Format partial duration
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 *
 * @example
 * // Customize the format
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * ) === '9 months 1 week'
 *
 * @example
 * // Customize the zeros presence
 * formatDuration({ years: 0, months: 9 })
 * //=> '9 months'
 * formatDuration({ years: 0, months: 9 }, { zero: true })
 * //=> '0 years 9 months'
 *
 * @example
 * // Customize the delimiter
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 */
declare function formatDuration(duration: Duration, options?: FormatDurationOptions): string;
//#endregion
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
//#region src/add.d.ts
/**
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
declare function add(date: Date, duration: Duration): Date;
/**
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
declare function add<T extends DateLike>(date: T, duration: Duration): T;
//#endregion
//#region src/helpers/business-days.d.ts
/**
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be added.
 *
 * @returns The new date with the business days added
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * const result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
declare function addBusinessDays(date: Date, amount: number): Date;
declare function addBusinessDays<T extends DateLike>(date: T, amount: number): T;
//#endregion
//#region src/add-days.d.ts
/**
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
declare const addDays: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/add-hours.d.ts
/**
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be added
 *
 * @returns The new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
declare const addHours: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/add-iso-week-years.d.ts
/**
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 *
 * @returns The new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
declare function addISOWeekYears(date: Date, amount: number): Date;
/**
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 *
 * @returns The new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
declare function addISOWeekYears<T extends DateLike>(date: T, amount: number): T;
//#endregion
//#region src/add-milliseconds.d.ts
/**
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be added.
 *
 * @returns The new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
declare const addMilliseconds: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/add-minutes.d.ts
/**
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be added.
 *
 * @returns The new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
declare const addMinutes: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/add-months.d.ts
/**
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
declare const addMonths: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/add-quarters.d.ts
/**
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
declare function addQuarters(date: Date, amount: number): Date;
/**
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
declare function addQuarters<T extends DateLike>(date: T, amount: number): T;
//#endregion
//#region src/add-seconds.d.ts
/**
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be added.
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
declare const addSeconds: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/add-weeks.d.ts
/**
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of weeks to the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be added.
 *
 * @returns The new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * const result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
declare const addWeeks: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/add-years.d.ts
/**
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be added.
 *
 * @returns The new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
declare const addYears: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/are-intervals-adjacent.d.ts
/**
 * @summary Does one interval's end exactly touch the other's start, with no gap and no overlap?
 *
 * @description
 * Does one interval's end exactly touch the other's start, with no gap and no overlap? This is
 * the exact boundary case `areIntervalsOverlapping` excludes by default (non-inclusive) — these
 * two functions are complementary, not equivalent: two intervals can be neither overlapping nor
 * adjacent (a real gap between them).
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether `intervalLeft` and `intervalRight` touch at exactly one boundary
 *
 * @example
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> true
 *
 * @example
 * // A gap, however small, is not adjacent.
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 */
declare function areIntervalsAdjacent(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): boolean;
/**
 * @summary Does one interval's end exactly touch the other's start, with no gap and no overlap?
 *
 * @description
 * Does one interval's end exactly touch the other's start, with no gap and no overlap? This is
 * the exact boundary case `areIntervalsOverlapping` excludes by default (non-inclusive) — these
 * two functions are complementary, not equivalent: two intervals can be neither overlapping nor
 * adjacent (a real gap between them).
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether `intervalLeft` and `intervalRight` touch at exactly one boundary
 *
 * @example
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> true
 *
 * @example
 * // A gap, however small, is not adjacent.
 * areIntervalsAdjacent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 */
declare function areIntervalsAdjacent<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): boolean;
//#endregion
//#region src/are-intervals-equivalent.d.ts
/**
 * @summary Do two intervals have the same `start` and the same `end`?
 *
 * @description
 * Do two intervals have the same `start` and the same `end`? Each interval is normalized first
 * (its earlier date treated as `start`), so a reversed interval is equivalent to its un-reversed
 * counterpart.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether the two intervals have the same `start` and `end`
 *
 * @example
 * areIntervalsEquivalent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
declare function areIntervalsEquivalent(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): boolean;
/**
 * @summary Do two intervals have the same `start` and the same `end`?
 *
 * @description
 * Do two intervals have the same `start` and the same `end`? Each interval is normalized first
 * (its earlier date treated as `start`), so a reversed interval is equivalent to its un-reversed
 * counterpart.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns Whether the two intervals have the same `start` and `end`
 *
 * @example
 * areIntervalsEquivalent(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
declare function areIntervalsEquivalent<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): boolean;
//#endregion
//#region src/are-intervals-overlapping.d.ts
/**
 * The {@link areIntervalsOverlapping} function options.
 */
interface AreIntervalsOverlappingOptions {
  inclusive?: boolean;
}
/**
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not
 * count as overlapping unless `inclusive` is set to `true`.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - The object with options
 *
 * @returns Whether the time intervals are overlapping
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
declare function areIntervalsOverlapping(intervalLeft: Interval<Date>, intervalRight: Interval<Date>, options?: AreIntervalsOverlappingOptions): boolean;
/**
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not
 * count as overlapping unless `inclusive` is set to `true`.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - The object with options
 *
 * @returns Whether the time intervals are overlapping
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
declare function areIntervalsOverlapping<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>, options?: AreIntervalsOverlappingOptions): boolean;
//#endregion
//#region src/clamp.d.ts
/**
 * @summary Return a date bounded by the start and the end of the given interval.
 *
 * @description
 * Clamps a date to the lower bound with the start of the interval and the upper
 * bound with the end of the interval.
 *
 * - When the date is less than the start of the interval, the start is returned.
 * - When the date is greater than the end of the interval, the end is returned.
 * - Otherwise the date is returned.
 *
 * @param date - The date to be bounded
 * @param interval - The interval to bound to
 *
 * @returns The date bounded by the start and the end of the interval
 *
 * @example
 * // What is Mar 21, 2021 bounded to an interval starting at Mar 22, 2021 and ending at Apr 01, 2021
 * const result = clamp(new Date(2021, 2, 21), {
 *   start: new Date(2021, 2, 22),
 *   end: new Date(2021, 3, 1),
 * })
 * //=> Mon Mar 22 2021 00:00:00
 */
declare function clamp(date: Date, interval: Interval<Date>): Date;
/**
 * @summary Return a date bounded by the start and the end of the given interval.
 *
 * @description
 * Clamps a date to the lower bound with the start of the interval and the upper
 * bound with the end of the interval.
 *
 * - When the date is less than the start of the interval, the start is returned.
 * - When the date is greater than the end of the interval, the end is returned.
 * - Otherwise the date is returned.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be bounded
 * @param interval - The interval to bound to
 *
 * @returns The date bounded by the start and the end of the interval
 *
 * @example
 * // What is Mar 21, 2021 bounded to an interval starting at Mar 22, 2021 and ending at Apr 01, 2021
 * const result = clamp(new Date(2021, 2, 21), {
 *   start: new Date(2021, 2, 22),
 *   end: new Date(2021, 3, 1),
 * })
 * //=> Mon Mar 22 2021 00:00:00
 */
declare function clamp<T extends DateLike>(date: T, interval: Interval<T>): T;
//#endregion
//#region src/closest-index-to.d.ts
/**
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns An index of the date closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * const dateToCompare = new Date(2015, 8, 6)
 * const datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * const result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
declare function closestIndexTo(dateToCompare: Date, dates: readonly Date[]): number | undefined;
/**
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dateToCompare`/`dates`, which must share the same
 * concrete type.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns An index of the date closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * const dateToCompare = new Date(2015, 8, 6)
 * const datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * const result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
declare function closestIndexTo<T extends DateLike>(dateToCompare: T, dates: readonly T[]): number | undefined;
//#endregion
//#region src/closest-to.d.ts
/**
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns The date from the array closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * const dateToCompare = new Date(2015, 8, 6)
 * const result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
declare function closestTo(dateToCompare: Date, dates: readonly Date[]): Date | undefined;
/**
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dateToCompare`/`dates`, which must share the same
 * concrete type; the result has that same type.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns The date from the array closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * const dateToCompare = new Date(2015, 8, 6)
 * const result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
declare function closestTo<T extends DateLike>(dateToCompare: T, dates: readonly T[]): T | undefined;
//#endregion
//#region src/compare-asc.d.ts
/**
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
declare function compareAsc(a: Date, b: Date): number;
/**
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
declare function compareAsc<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/compare-desc.d.ts
/**
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * const result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
declare function compareDesc(a: Date, b: Date): number;
/**
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * const result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
declare function compareDesc<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/construct-now.d.ts
/**
 * @summary Constructs a new current date using the passed value's type.
 *
 * @description
 * Constructs a new current date, using the same concrete type as the reference value (a real
 * timezone for `Date`/`Temporal.ZonedDateTime`, UTC for `Temporal.PlainDateTime`, and today's
 * calendar date for `Temporal.PlainDate`). It helps to build generic functions that accept any
 * `DateLike` type and use the current date.
 *
 * @param date - The reference date to take the type from
 *
 * @returns Current date with the same concrete type as `date`
 *
 * @example
 * function isToday<T extends Date>(date: T): boolean {
 *   // If we were to use `new Date()` directly, the function would behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
declare function constructNow(date: Date): Date;
/**
 * @summary Constructs a new current date using the passed value's type.
 *
 * @description
 * Constructs a new current date, using the same concrete type as the reference value (a real
 * timezone for `Date`/`Temporal.ZonedDateTime`, UTC for `Temporal.PlainDateTime`, and today's
 * calendar date for `Temporal.PlainDate`). It helps to build generic functions that accept any
 * `DateLike` type and use the current date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The reference date to take the type from
 *
 * @returns Current date with the same concrete type as `date`
 *
 * @example
 * function isToday<T extends Date>(date: T): boolean {
 *   // If we were to use `new Date()` directly, the function would behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
declare function constructNow<T extends DateLike>(date: T): T;
//#endregion
//#region src/count-interval-units.d.ts
/**
 * @summary Count the number of whole `unit`s spanned by an interval, rounding up partial units.
 *
 * @description
 * Count the number of whole `unit`s spanned by an interval, rounding up partial units. Counts by
 * walking forward from `start` one `unit` at a time (the same calendar-aware step `addDays`/
 * `addMonths`/etc. use), so months/years/weeks are counted by real calendar boundary crossings
 * rather than an approximate fixed-length division — e.g. the number of months between January 31
 * and March 1 is correctly 2 (the second month is partial), not a division of elapsed milliseconds
 * by an average month length.
 *
 * @param interval - The interval to count
 * @param unit - The unit to count by
 *
 * @returns The number of whole `unit`s spanned by the interval, rounded up
 *
 * @example
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   'days'
 * )
 * //=> 9
 *
 * @example
 * // The interval spans a partial second month, so it rounds up to 2.
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 31), end: new Date(2014, 2, 1) },
 *   'months'
 * )
 * //=> 2
 */
declare function countIntervalUnits(interval: Interval<Date>, unit: FormatDurationUnit): number;
/**
 * @summary Count the number of whole `unit`s spanned by an interval, rounding up partial units.
 *
 * @description
 * Count the number of whole `unit`s spanned by an interval, rounding up partial units. Counts by
 * walking forward from `start` one `unit` at a time (the same calendar-aware step `addDays`/
 * `addMonths`/etc. use), so months/years/weeks are counted by real calendar boundary crossings
 * rather than an approximate fixed-length division — e.g. the number of months between January 31
 * and March 1 is correctly 2 (the second month is partial), not a division of elapsed milliseconds
 * by an average month length.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`.
 *
 * @param interval - The interval to count
 * @param unit - The unit to count by
 *
 * @returns The number of whole `unit`s spanned by the interval, rounded up
 *
 * @throws `TypeError` if `unit` is `'hours'`, `'minutes'`, or `'seconds'` and `interval`'s dates
 *   are `Temporal.PlainDate` (which has no time component)
 *
 * @example
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   'days'
 * )
 * //=> 9
 *
 * @example
 * // The interval spans a partial second month, so it rounds up to 2.
 * countIntervalUnits(
 *   { start: new Date(2014, 0, 31), end: new Date(2014, 2, 1) },
 *   'months'
 * )
 * //=> 2
 */
declare function countIntervalUnits<T extends DateLike>(interval: Interval<T>, unit: FormatDurationUnit): number;
//#endregion
//#region src/days-to-weeks.d.ts
/**
 * @summary Convert days to weeks.
 *
 * @description
 * Convert a number of days to a full number of weeks.
 *
 * @param days - The number of days to be converted
 *
 * @returns The number of days converted in weeks
 *
 * @example
 * // Convert 14 days to weeks:
 * const result = daysToWeeks(14)
 * //=> 2
 *
 * @example
 * // It uses trunc rounding:
 * const result = daysToWeeks(13)
 * //=> 1
 */
declare function daysToWeeks(days: number): number;
//#endregion
//#region src/helpers/difference-in-business-days.d.ts
/**
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that aren't in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of business days
 *
 * @example
 * // How many business days are between
 * // 10 January 2014 and 20 July 2014?
 * const result = differenceInBusinessDays(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 0, 10)
 * )
 * //=> 136
 *
 * // How many business days are between
 * // 30 November 2021 and 1 November 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 30),
 *   new Date(2021, 10, 1)
 * )
 * //=> 21
 *
 * // How many business days are between
 * // 1 November 2021 and 1 December 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 11, 1)
 * )
 * //=> -22
 *
 * // How many business days are between
 * // 1 November 2021 and 1 November 2021 ?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 10, 1)
 * )
 * //=> 0
 */
declare function differenceInBusinessDays(a: Date, b: Date): number;
declare function differenceInBusinessDays<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/difference-in-calendar-days.d.ts
/**
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
declare function differenceInCalendarDays(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
declare function differenceInCalendarDays<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/difference-in-calendar-iso-week-years.d.ts
/**
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar ISO week-numbering years
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * const result = differenceInCalendarISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
declare function differenceInCalendarISOWeekYears(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar ISO week-numbering years
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * const result = differenceInCalendarISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
declare function differenceInCalendarISOWeekYears<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/difference-in-calendar-iso-weeks.d.ts
/**
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar ISO weeks
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * const result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6),
 * );
 * //=> 3
 */
declare function differenceInCalendarISOWeeks(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar ISO weeks
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * const result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6),
 * );
 * //=> 3
 */
declare function differenceInCalendarISOWeeks<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/difference-in-calendar-months.d.ts
/**
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
declare function differenceInCalendarMonths(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
declare function differenceInCalendarMonths<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/difference-in-calendar-quarters.d.ts
/**
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
declare function differenceInCalendarQuarters(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
declare function differenceInCalendarQuarters<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/start-of-week.d.ts
/**
 * The {@link startOfWeek} function options.
 */
interface StartOfWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
/**
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfWeek(date: Date, options?: StartOfWeekOptions): Date;
/**
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfWeek<T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
//#endregion
//#region src/difference-in-calendar-weeks.d.ts
/**
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
declare function differenceInCalendarWeeks(a: Date, b: Date, options?: StartOfWeekOptions): number;
/**
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
declare function differenceInCalendarWeeks<T extends DateLike>(a: T, b: T, options?: StartOfWeekOptions): number;
//#endregion
//#region src/difference-in-calendar-years.d.ts
/**
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
declare function differenceInCalendarYears(a: Date, b: Date): number;
/**
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
declare function differenceInCalendarYears<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/helpers/create-difference-in-date-unit.d.ts
/**
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full days
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 */
declare function differenceInDays(a: Date, b: Date): number;
declare function differenceInDays<T extends DateLike>(a: T, b: T): number;
/**
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between two dates. Fractional weeks are
 * truncated towards zero.
 *
 * One "full week" is the distance between a local time in one day to the same
 * local time 7 days earlier or later. A full week can sometimes be less than
 * or more than 7*24 hours if a daylight savings change happens between two dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full weeks
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
 * //=> 2
 */
declare function differenceInWeeks(a: Date, b: Date): number;
declare function differenceInWeeks<T extends DateLike>(a: T, b: T): number;
/**
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
declare function differenceInMonths(a: Date, b: Date): number;
declare function differenceInMonths<T extends DateLike>(a: T, b: T): number;
/**
 * @summary Get the number of quarters between the given dates.
 *
 * @description
 * Get the number of full quarters between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full quarters
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
 * //=> 2
 */
declare function differenceInQuarters(a: Date, b: Date): number;
declare function differenceInQuarters<T extends DateLike>(a: T, b: T): number;
/**
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
declare function differenceInYears(a: Date, b: Date): number;
declare function differenceInYears<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/difference-in-hours.d.ts
/**
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of hours
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * const result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
declare const differenceInHours: {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};
//#endregion
//#region src/difference-in-iso-week-years.d.ts
/**
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * const result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * // => 1
 */
declare function differenceInISOWeekYears(a: Date, b: Date): number;
/**
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * const result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * // => 1
 */
declare function differenceInISOWeekYears<T extends DateLike>(a: T, b: T): number;
//#endregion
//#region src/difference-in-milliseconds.d.ts
/**
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
declare const differenceInMilliseconds: {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};
//#endregion
//#region src/difference-in-minutes.d.ts
/**
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of minutes
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * const result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are between 10:01:59 and 10:00:00
 * const result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */
declare const differenceInMinutes: {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};
//#endregion
//#region src/difference-in-seconds.d.ts
/**
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`; both arguments must share the same concrete type.
 *
 * @param a - The later date
 * @param b - The earlier date
 *
 * @returns The number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
declare const differenceInSeconds: {
  (a: Date, b: Date): number;
  <T extends TimeLike>(a: T, b: T): number;
};
//#endregion
//#region src/helpers/create-each-of-interval.d.ts
/**
 * The options shared by the `eachXOfInterval` family ({@link eachDayOfInterval},
 * {@link eachWeekOfInterval}, {@link eachMonthOfInterval}, and others).
 */
interface EachOfIntervalOptions {
  step?: number;
}
//#endregion
//#region src/each-day-of-interval.d.ts
/**
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
declare function eachDayOfInterval(interval: Interval<Date>, options?: EachOfIntervalOptions): Date[];
/**
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
declare function eachDayOfInterval<T extends DateLike>(interval: Interval<T>, options?: EachOfIntervalOptions): T[];
//#endregion
//#region src/each-hour-of-interval.d.ts
/**
 * @summary Return the array of hours within the specified time interval.
 *
 * @description
 * Return the array of hours within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of hours from the hour of the interval start to the hour of the interval end
 *
 * @example
 * // Each hour between 6 October 2014, 12:00 and 6 October 2014, 15:00
 * const result = eachHourOfInterval({
 *   start: new Date(2014, 9, 6, 12),
 *   end: new Date(2014, 9, 6, 15)
 * });
 * //=> [
 * //   Mon Oct 06 2014 12:00:00,
 * //   Mon Oct 06 2014 13:00:00,
 * //   Mon Oct 06 2014 14:00:00,
 * //   Mon Oct 06 2014 15:00:00
 * // ]
 */
declare function eachHourOfInterval(interval: Interval<Date>, options?: EachOfIntervalOptions): Date[];
/**
 * @summary Return the array of hours within the specified time interval.
 *
 * @description
 * Return the array of hours within the specified time interval.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of hours from the hour of the interval start to the hour of the interval end
 *
 * @example
 * // Each hour between 6 October 2014, 12:00 and 6 October 2014, 15:00
 * const result = eachHourOfInterval({
 *   start: new Date(2014, 9, 6, 12),
 *   end: new Date(2014, 9, 6, 15)
 * });
 * //=> [
 * //   Mon Oct 06 2014 12:00:00,
 * //   Mon Oct 06 2014 13:00:00,
 * //   Mon Oct 06 2014 14:00:00,
 * //   Mon Oct 06 2014 15:00:00
 * // ]
 */
declare function eachHourOfInterval<T extends TimeLike>(interval: Interval<T>, options?: EachOfIntervalOptions): T[];
//#endregion
//#region src/each-minute-of-interval.d.ts
/**
 * @summary Return the array of minutes within the specified time interval.
 *
 * @description
 * Returns the array of minutes within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of minutes from the minute of the interval start to the minute of the interval end
 *
 * @example
 * // Each minute between 14 October 2020, 13:00 and 14 October 2020, 13:03
 * const result = eachMinuteOfInterval({
 *   start: new Date(2014, 9, 14, 13),
 *   end: new Date(2014, 9, 14, 13, 3)
 * })
 * //=> [
 * //   Wed Oct 14 2014 13:00:00,
 * //   Wed Oct 14 2014 13:01:00,
 * //   Wed Oct 14 2014 13:02:00,
 * //   Wed Oct 14 2014 13:03:00
 * // ]
 */
declare function eachMinuteOfInterval(interval: Interval<Date>, options?: EachOfIntervalOptions): Date[];
/**
 * @summary Return the array of minutes within the specified time interval.
 *
 * @description
 * Returns the array of minutes within the specified time interval.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of minutes from the minute of the interval start to the minute of the interval end
 *
 * @example
 * // Each minute between 14 October 2020, 13:00 and 14 October 2020, 13:03
 * const result = eachMinuteOfInterval({
 *   start: new Date(2014, 9, 14, 13),
 *   end: new Date(2014, 9, 14, 13, 3)
 * })
 * //=> [
 * //   Wed Oct 14 2014 13:00:00,
 * //   Wed Oct 14 2014 13:01:00,
 * //   Wed Oct 14 2014 13:02:00,
 * //   Wed Oct 14 2014 13:03:00
 * // ]
 */
declare function eachMinuteOfInterval<T extends TimeLike>(interval: Interval<T>, options?: EachOfIntervalOptions): T[];
//#endregion
//#region src/each-month-of-interval.d.ts
/**
 * @summary Return the array of months within the specified time interval.
 *
 * @description
 * Return the array of months within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of months from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each month between 6 February 2014 and 10 August 2014:
 * const result = eachMonthOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Sat Feb 01 2014 00:00:00,
 * //   Sat Mar 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Thu May 01 2014 00:00:00,
 * //   Sun Jun 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * //   Fri Aug 01 2014 00:00:00
 * // ]
 */
declare function eachMonthOfInterval(interval: Interval<Date>, options?: EachOfIntervalOptions): Date[];
/**
 * @summary Return the array of months within the specified time interval.
 *
 * @description
 * Return the array of months within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of months from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each month between 6 February 2014 and 10 August 2014:
 * const result = eachMonthOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Sat Feb 01 2014 00:00:00,
 * //   Sat Mar 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Thu May 01 2014 00:00:00,
 * //   Sun Jun 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * //   Fri Aug 01 2014 00:00:00
 * // ]
 */
declare function eachMonthOfInterval<T extends DateLike>(interval: Interval<T>, options?: EachOfIntervalOptions): T[];
//#endregion
//#region src/each-quarter-of-interval.d.ts
/**
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @param interval - The interval
 * @param options - An object with options
 *
 * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10),
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
declare function eachQuarterOfInterval(interval: Interval<Date>, options?: EachOfIntervalOptions): Date[];
/**
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval
 * @param options - An object with options
 *
 * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10),
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
declare function eachQuarterOfInterval<T extends DateLike>(interval: Interval<T>, options?: EachOfIntervalOptions): T[];
//#endregion
//#region src/each-week-of-interval.d.ts
/**
 * The {@link eachWeekOfInterval} function options.
 */
interface EachWeekOfIntervalOptions extends EachOfIntervalOptions, StartOfWeekOptions {}
/**
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of weeks from the week of the interval start to the week of the interval end
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * const result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
declare function eachWeekOfInterval(interval: Interval<Date>, options?: EachWeekOfIntervalOptions): Date[];
/**
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of weeks from the week of the interval start to the week of the interval end
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * const result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
declare function eachWeekOfInterval<T extends DateLike>(interval: Interval<T>, options?: EachWeekOfIntervalOptions): T[];
//#endregion
//#region src/each-weekend-of-interval.d.ts
/**
 * @summary List all the Saturdays and Sundays in the given date interval.
 *
 * @description
 * Get all the Saturdays and Sundays in the given date interval.
 *
 * @param interval - The given interval
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given date interval
 * const result = eachWeekendOfInterval({
 *   start: new Date(2018, 8, 17),
 *   end: new Date(2018, 8, 30)
 * })
 * //=> [
 * //   Sat Sep 22 2018 00:00:00,
 * //   Sun Sep 23 2018 00:00:00,
 * //   Sat Sep 29 2018 00:00:00,
 * //   Sun Sep 30 2018 00:00:00
 * // ]
 */
declare function eachWeekendOfInterval(interval: Interval<Date>): Date[];
/**
 * @summary List all the Saturdays and Sundays in the given date interval.
 *
 * @description
 * Get all the Saturdays and Sundays in the given date interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The given interval
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given date interval
 * const result = eachWeekendOfInterval({
 *   start: new Date(2018, 8, 17),
 *   end: new Date(2018, 8, 30)
 * })
 * //=> [
 * //   Sat Sep 22 2018 00:00:00,
 * //   Sun Sep 23 2018 00:00:00,
 * //   Sat Sep 29 2018 00:00:00,
 * //   Sun Sep 30 2018 00:00:00
 * // ]
 */
declare function eachWeekendOfInterval<T extends DateLike>(interval: Interval<T>): T[];
//#endregion
//#region src/each-weekend-of-month.d.ts
/**
 * @summary List all the Saturdays and Sundays in the given month.
 *
 * @description
 * Get all the Saturdays and Sundays in the given month.
 *
 * @param date - The given month
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given month
 * const result = eachWeekendOfMonth(new Date(2022, 1, 1))
 * //=> [
 * //   Sat Feb 05 2022 00:00:00,
 * //   Sun Feb 06 2022 00:00:00,
 * //   Sat Feb 12 2022 00:00:00,
 * //   Sun Feb 13 2022 00:00:00,
 * //   Sat Feb 19 2022 00:00:00,
 * //   Sun Feb 20 2022 00:00:00,
 * //   Sat Feb 26 2022 00:00:00,
 * //   Sun Feb 27 2022 00:00:00
 * // ]
 */
declare function eachWeekendOfMonth(date: Date): Date[];
/**
 * @summary List all the Saturdays and Sundays in the given month.
 *
 * @description
 * Get all the Saturdays and Sundays in the given month.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result array has the same concrete type.
 *
 * @param date - The given month
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given month
 * const result = eachWeekendOfMonth(new Date(2022, 1, 1))
 * //=> [
 * //   Sat Feb 05 2022 00:00:00,
 * //   Sun Feb 06 2022 00:00:00,
 * //   Sat Feb 12 2022 00:00:00,
 * //   Sun Feb 13 2022 00:00:00,
 * //   Sat Feb 19 2022 00:00:00,
 * //   Sun Feb 20 2022 00:00:00,
 * //   Sat Feb 26 2022 00:00:00,
 * //   Sun Feb 27 2022 00:00:00
 * // ]
 */
declare function eachWeekendOfMonth<T extends DateLike>(date: T): T[];
//#endregion
//#region src/each-weekend-of-year.d.ts
/**
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @param date - The given year
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * const result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 */
declare function eachWeekendOfYear(date: Date): Date[];
/**
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result array has the same concrete type.
 *
 * @param date - The given year
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * const result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 */
declare function eachWeekendOfYear<T extends DateLike>(date: T): T[];
//#endregion
//#region src/each-year-of-interval.d.ts
/**
 * @summary Return the array of yearly timestamps within the specified time interval.
 *
 * @description
 * Return the array of yearly timestamps within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of yearly timestamps from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each year between 6 February 2014 and 10 August 2017:
 * const result = eachYearOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2017, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Thu Jan 01 2015 00:00:00,
 * //   Fri Jan 01 2016 00:00:00,
 * //   Sun Jan 01 2017 00:00:00
 * // ]
 */
declare function eachYearOfInterval(interval: Interval<Date>, options?: EachOfIntervalOptions): Date[];
/**
 * @summary Return the array of yearly timestamps within the specified time interval.
 *
 * @description
 * Return the array of yearly timestamps within the specified time interval.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result array has the same concrete type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of yearly timestamps from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each year between 6 February 2014 and 10 August 2017:
 * const result = eachYearOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2017, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Thu Jan 01 2015 00:00:00,
 * //   Fri Jan 01 2016 00:00:00,
 * //   Sun Jan 01 2017 00:00:00
 * // ]
 */
declare function eachYearOfInterval<T extends DateLike>(interval: Interval<T>, options?: EachOfIntervalOptions): T[];
//#endregion
//#region src/end-of-day.d.ts
/**
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
declare function endOfDay(date: Date): Date;
/**
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
declare function endOfDay<T extends TimeLike>(date: T): T;
//#endregion
//#region src/end-of-decade.d.ts
/**
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a decade
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
declare function endOfDecade(date: Date): Date;
/**
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a decade
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
declare function endOfDecade<T extends DateLike>(date: T): T;
//#endregion
//#region src/end-of-hour.d.ts
/**
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of an hour
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * const result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
declare function endOfHour(date: Date): Date;
/**
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of an hour
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * const result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
declare function endOfHour<T extends TimeLike>(date: T): T;
//#endregion
//#region src/end-of-iso-week.d.ts
/**
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * const result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
declare function endOfISOWeek(date: Date): Date;
/**
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * const result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
declare function endOfISOWeek<T extends DateLike>(date: T): T;
//#endregion
//#region src/end-of-iso-week-year.d.ts
/**
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
declare function endOfISOWeekYear(date: Date): Date;
/**
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
declare function endOfISOWeekYear<T extends DateLike>(date: T): T;
//#endregion
//#region src/end-of-minute.d.ts
/**
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
declare function endOfMinute(date: Date): Date;
/**
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
declare function endOfMinute<T extends TimeLike>(date: T): T;
//#endregion
//#region src/end-of-month.d.ts
/**
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
declare function endOfMonth(date: Date): Date;
/**
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
declare function endOfMonth<T extends DateLike>(date: T): T;
//#endregion
//#region src/end-of-quarter.d.ts
/**
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
declare function endOfQuarter(date: Date): Date;
/**
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
declare function endOfQuarter<T extends DateLike>(date: T): T;
//#endregion
//#region src/end-of-second.d.ts
/**
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
declare function endOfSecond(date: Date): Date;
/**
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
declare function endOfSecond<T extends TimeLike>(date: T): T;
//#endregion
//#region src/end-of-today.d.ts
/**
 * @summary Return the end of today.
 *
 * @description
 * Return the end of today.
 *
 * @returns The end of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
declare function endOfToday(): Date;
//#endregion
//#region src/end-of-today-plain-date-time.d.ts
/**
 * @summary Return the end of today as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the end of today (23:59:59.999999999) as a `Temporal.PlainDateTime`. Per the UTC rule,
 * "today" is resolved using UTC.
 *
 * @returns The end of today UTC, as a `Temporal.PlainDateTime`
 */
declare function endOfTodayPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/end-of-today-zoned-date-time.d.ts
/**
 * @summary Return the end of today as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the end of today (23:59:59.999999999) as a `Temporal.ZonedDateTime` in the given
 * timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The end of today in `timeZone`, as a `Temporal.ZonedDateTime`
 */
declare function endOfTodayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/end-of-tomorrow.d.ts
/**
 * @summary Return the end of tomorrow.
 *
 * @description
 * Return the end of tomorrow.
 *
 * @returns The end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
declare function endOfTomorrow(): Date;
//#endregion
//#region src/end-of-tomorrow-plain-date-time.d.ts
/**
 * @summary Return the end of tomorrow as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the end of tomorrow (23:59:59.999999999) as a `Temporal.PlainDateTime`. Per the UTC
 * rule, "today" is resolved using UTC before adding one day.
 *
 * @returns The end of tomorrow UTC, as a `Temporal.PlainDateTime`
 */
declare function endOfTomorrowPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/end-of-tomorrow-zoned-date-time.d.ts
/**
 * @summary Return the end of tomorrow as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the end of tomorrow (23:59:59.999999999) as a `Temporal.ZonedDateTime` in the given
 * timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The end of tomorrow in `timeZone`, as a `Temporal.ZonedDateTime`
 */
declare function endOfTomorrowZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/end-of-week.d.ts
/**
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
declare function endOfWeek(date: Date, options?: StartOfWeekOptions): Date;
/**
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
declare function endOfWeek<T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
//#endregion
//#region src/end-of-year.d.ts
/**
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
declare function endOfYear(date: Date): Date;
/**
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
declare function endOfYear<T extends DateLike>(date: T): T;
//#endregion
//#region src/end-of-yesterday.d.ts
/**
 * @summary Return the end of yesterday.
 *
 * @description
 * Return the end of yesterday.
 *
 * @returns The end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
declare function endOfYesterday(): Date;
//#endregion
//#region src/end-of-yesterday-plain-date-time.d.ts
/**
 * @summary Return the end of yesterday as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the end of yesterday (23:59:59.999999999) as a `Temporal.PlainDateTime`. Per the UTC
 * rule, "today" is resolved using UTC before subtracting one day.
 *
 * @returns The end of yesterday UTC, as a `Temporal.PlainDateTime`
 */
declare function endOfYesterdayPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/end-of-yesterday-zoned-date-time.d.ts
/**
 * @summary Return the end of yesterday as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the end of yesterday (23:59:59.999999999) as a `Temporal.ZonedDateTime` in the given
 * timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The end of yesterday in `timeZone`, as a `Temporal.ZonedDateTime`
 */
declare function endOfYesterdayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/helpers/local-week.d.ts
/**
 * The options shared by the local week-numbering functions ({@link getWeek}, {@link getWeekYear},
 * {@link setWeek}, {@link setWeekYear}, {@link startOfWeekYear}, and others).
 */
interface LocalWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}
//#endregion
//#region src/format.d.ts
/**
 * The {@link format} function options.
 */
interface FormatOptions extends LocalWeekOptions {
  locale?: Intl.LocalesArgument;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
  /**
   * An IANA time zone identifier (e.g. `'America/New_York'`) the `x`/`X`/`O`/`z` tokens format
   * against, instead of the system's own time zone. Only applies when `date` is a plain `Date` —
   * a `Temporal.ZonedDateTime` already carries its own real time zone and ignores this option
   * entirely. Mirrors `date-fns-tz`'s `format`'s `timeZone` option.
   */
  timeZone?: string;
}
/**
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * The characters wrapped between two single quote characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 4/29/13, 12:00 AM                 | 7     |
 * |                                 | PPpp    | Apr 29, 2013, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 2013 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 2013 at ...   | 2,7   |
 *
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate`.
 *
 * 6. Specific non-location timezones (e.g. `EST`, `Eastern Standard Time`) are resolved via
 *    `Intl.DateTimeFormat`, and only available when a real IANA time zone is known: either `date`
 *    is a `Temporal.ZonedDateTime` (which always carries one), or `options.timeZone` is set for
 *    plain `Date` input. Without either, these tokens fall back to the GMT-offset format.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them.
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them.
 *
 * @param date - The original date
 * @param formatStr - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws use `yyyy` instead of `YYYY` for formatting years (unless `options.useAdditionalWeekYearTokens` is set)
 * @throws use `yy` instead of `YY` for formatting years (unless `options.useAdditionalWeekYearTokens` is set)
 * @throws use `d` instead of `D` for formatting days of the month (unless `options.useAdditionalDayOfYearTokens` is set)
 * @throws use `dd` instead of `DD` for formatting days of the month (unless `options.useAdditionalDayOfYearTokens` is set)
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
declare function format(date: Date | DateLike, formatStr: string, options?: FormatOptions): string;
//#endregion
//#region src/format-distance.d.ts
/**
 * The {@link formatDistance} function options.
 */
interface FormatDistanceOptions {
  includeSeconds?: boolean;
  addSuffix?: boolean;
  locale?: Intl.LocalesArgument;
}
/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 months                                   | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 */
declare function formatDistance(laterDate: Date, earlierDate: Date, options?: FormatDistanceOptions): string;
/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 months                                   | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `laterDate`/`earlierDate`, which must share the same
 * concrete type.
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 */
declare function formatDistance<T extends DateLike>(laterDate: T, earlierDate: T, options?: FormatDistanceOptions): string;
//#endregion
//#region src/format-distance-strict.d.ts
type FormatDistanceStrictUnit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
type FormatDistanceStrictRoundingMethod = 'floor' | 'ceil' | 'round';
/**
 * The {@link formatDistanceStrict} function options.
 */
interface FormatDistanceStrictOptions {
  addSuffix?: boolean;
  unit?: FormatDistanceStrictUnit;
  roundingMethod?: FormatDistanceStrictRoundingMethod;
  locale?: Intl.LocalesArgument;
}
/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 */
declare function formatDistanceStrict(laterDate: Date, earlierDate: Date, options?: FormatDistanceStrictOptions): string;
/**
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `laterDate`/`earlierDate`, which must share the same
 * concrete type.
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 */
declare function formatDistanceStrict<T extends DateLike>(laterDate: T, earlierDate: T, options?: FormatDistanceStrictOptions): string;
//#endregion
//#region src/format-distance-to-now.d.ts
/**
 * @summary Return the distance between the given date and now in words.
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 months                                   | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * @param date - The given date
 * @param options - The object with options
 *
 * @returns The distance in words
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 */
declare function formatDistanceToNow(date: Date | DateLike, options?: FormatDistanceOptions): string;
//#endregion
//#region src/format-distance-to-now-strict.d.ts
/**
 * @summary Return the distance between the given date and now in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNowStrict(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNowStrict(
 *   new Date(2015, 0, 1, 0, 0, 15)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in 1 year'
 *
 * @example
 * // If today is 28 January 2015,
 * // what is the distance to 1 January 2015, in months, rounded up?
 * const result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 */
declare function formatDistanceToNowStrict(date: Date | DateLike, options?: FormatDistanceStrictOptions): string;
//#endregion
//#region src/format-in-time-zone.d.ts
/**
 * @summary Format the date in the given time zone, regardless of the system's own time zone.
 *
 * @description
 * Format the date in the given time zone, regardless of the system's own time zone. Both the
 * wall-clock fields (year/month/day/hour/etc.) and the `x`/`X`/`O`/`z` timezone tokens reflect
 * `timeZone`.
 *
 * Mirrors `date-fns-tz`'s `formatInTimeZone`. Unlike `date-fns-tz`'s own implementation (which
 * hand-rolls the offset/DST resolution for a plain `Date`), the given date's real instant is
 * attached directly to `timeZone` via `Temporal.ZonedDateTime`, so the result is exactly what the
 * IANA time zone database says applies at that instant — including the `z`/`zzzz` specific-name
 * tokens, which resolve via `Intl.DateTimeFormat` against that same `ZonedDateTime`.
 *
 * @param date - The date representing the real instant to format
 * @param timeZone - The IANA time zone identifier to format `date` in (e.g. `'Europe/Paris'`)
 * @param formatStr - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * const date = new Date('2014-10-25T10:46:20Z')
 * const result = formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ss zzz')
 * //=> '2014-10-25 06:46:20 EST'
 */
declare function formatInTimeZone(date: Date | DateLike, timeZone: string, formatStr: string, options?: FormatOptions): string;
//#endregion
//#region src/format-iso.d.ts
/**
 * The {@link formatISO} function options.
 */
interface FormatISOOptions {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}
/**
 * @summary Format the date according to the ISO 8601 standard.
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string (in local time zone)
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
declare function formatISO(date: Date | DateLike, options?: FormatISOOptions): string;
//#endregion
//#region src/format-iso-duration.d.ts
/**
 * The {@link formatISODuration} function duration.
 */
interface ISODuration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
/**
 * @summary Format a duration object as ISO 8601 duration string
 *
 * @description
 * Format a duration object according to the ISO 8601 duration standard.
 *
 * @param duration - The duration to format
 *
 * @returns The ISO 8601 duration string
 *
 * @example
 * // Format the given duration as ISO 8601 string
 * const result = formatISODuration({
 *   years: 39,
 *   months: 2,
 *   days: 20,
 *   hours: 7,
 *   minutes: 5,
 *   seconds: 0
 * })
 * //=> 'P39Y2M20DT7H5M0S'
 */
declare function formatISODuration(duration: ISODuration): string;
//#endregion
//#region src/format-iso9075.d.ts
/**
 * The {@link formatISO9075} function options.
 */
interface FormatISO9075Options {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}
/**
 * @summary Format the date according to the ISO 9075 standard.
 *
 * @description
 * Return the formatted date string in ISO 9075 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18 19:00:52'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075, short format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918 190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, date only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, time only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52'
 */
declare function formatISO9075(date: Date | DateLike, options?: FormatISO9075Options): string;
//#endregion
//#region src/format-relative.d.ts
/**
 * The {@link formatRelative} function options.
 */
interface FormatRelativeOptions {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
/**
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date, via `Intl.RelativeTimeFormat` —
 * correctly localized for any `options.locale`, not just English. This is a deliberate departure
 * from date-fns' own `formatRelative`: date-fns names the specific weekday and includes a
 * time-of-day (`"last Thursday at 12:45 AM"`), using per-locale `Locale` objects with bundled
 * connector-word data ("last", "at", and so on) for every supported language. There's no
 * `Intl` primitive that provides that same weekday+time composite in an arbitrary locale, so
 * rather than hardcode English connector words and silently produce broken output for every
 * other locale, this resolves to `Intl.RelativeTimeFormat`'s day/week granularity instead, with
 * no time-of-day component, for every locale including English.
 *
 * | Distance to the base date | Result (en)  |
 * |---------------------------|--------------|
 * | Previous 2-6 days         | last week    |
 * | Last day                  | yesterday    |
 * | Same day                  | today        |
 * | Next day                  | tomorrow     |
 * | Next 2-6 days             | next week    |
 * | Other                     | 12/31/2017   |
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date:
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last week"
 *
 * @example
 * // Correctly localized for any locale, unlike date-fns' weekday+time composite:
 * const result = formatRelative(subDays(new Date(), 3), new Date(), { locale: 'es' })
 * //=> "hace 3 días"
 */
declare function formatRelative(date: Date, baseDate: Date, options?: FormatRelativeOptions): string;
/**
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date, via `Intl.RelativeTimeFormat` —
 * correctly localized for any `options.locale`, not just English. This is a deliberate departure
 * from date-fns' own `formatRelative`: date-fns names the specific weekday and includes a
 * time-of-day (`"last Thursday at 12:45 AM"`), using per-locale `Locale` objects with bundled
 * connector-word data ("last", "at", and so on) for every supported language. There's no
 * `Intl` primitive that provides that same weekday+time composite in an arbitrary locale, so
 * rather than hardcode English connector words and silently produce broken output for every
 * other locale, this resolves to `Intl.RelativeTimeFormat`'s day/week granularity instead, with
 * no time-of-day component, for every locale including English.
 *
 * | Distance to the base date | Result (en)  |
 * |---------------------------|--------------|
 * | Previous 2-6 days         | last week    |
 * | Last day                  | yesterday    |
 * | Same day                  | today        |
 * | Next day                  | tomorrow     |
 * | Next 2-6 days             | next week    |
 * | Other                     | 12/31/2017   |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`/`baseDate`, which must share the same
 * concrete type.
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date:
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last week"
 *
 * @example
 * // Correctly localized for any locale, unlike date-fns' weekday+time composite:
 * const result = formatRelative(subDays(new Date(), 3), new Date(), { locale: 'es' })
 * //=> "hace 3 días"
 */
declare function formatRelative<T extends DateLike>(date: T, baseDate: T, options?: FormatRelativeOptions): string;
//#endregion
//#region src/format-rfc3339.d.ts
/**
 * The {@link formatRFC3339} function options.
 */
interface FormatRFC3339Options {
  fractionDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}
/**
 * @summary Format the date according to the RFC 3339 standard.
 *
 * @description
 * Return the formatted date string in RFC 3339 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format:
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format, 3 digits of second fraction
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), {
 *   fractionDigits: 3
 * })
 * //=> '2019-09-18T19:00:52.234Z'
 */
declare function formatRFC3339(date: Date | DateLike, options?: FormatRFC3339Options): string;
//#endregion
//#region src/format-rfc7231.d.ts
/**
 * @summary Format the date according to the RFC 7231 standard.
 *
 * @description
 * Return the formatted date string in RFC 7231 format.
 * The result will always be in UTC timezone.
 *
 * @param date - The original date
 *
 * @returns The formatted date string
 *
 * @throws `Invalid time value` if `date` is an invalid `Date`
 *
 * @example
 * // Represent 18 September 2019 in RFC 7231 format:
 * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
 * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
 */
declare function formatRFC7231(date: Date): string;
declare function formatRFC7231(date: DateLike): string;
//#endregion
//#region src/from-unix-time.d.ts
/**
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp (in seconds). Decimal values will be discarded.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 *
 * @returns The date
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * const result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */
declare function fromUnixTime(unixTime: number): Date;
//#endregion
//#region src/from-unix-time-plain-date-time.d.ts
/**
 * @summary Create a `Temporal.PlainDateTime` from a Unix timestamp.
 *
 * @description
 * Create a `Temporal.PlainDateTime` from a Unix timestamp (in seconds). Decimal values will be
 * discarded. Per the UTC rule, the timestamp's wall-clock fields are resolved using UTC.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 *
 * @returns The date and time
 */
declare function fromUnixTimePlainDateTime(unixTime: number): Temporal.PlainDateTime;
//#endregion
//#region src/from-unix-time-zoned-date-time.d.ts
/**
 * @summary Create a `Temporal.ZonedDateTime` from a Unix timestamp.
 *
 * @description
 * Create a `Temporal.ZonedDateTime` from a Unix timestamp (in seconds), in the given timezone.
 * Decimal values will be discarded.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The date and time in `timeZone`
 */
declare function fromUnixTimeZonedDateTime(unixTime: number, timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/from-zoned-time.d.ts
/**
 * @summary Get the `Date` representing the real instant of a local time in the given time zone.
 *
 * @description
 * Treats the given date's wall-clock fields (year/month/day/hour/minute/second/millisecond) as
 * the local time in `timeZone`, and returns the `Date` instance with the equivalent real instant
 * — i.e. if the input represented local time in `timeZone`, the returned `Date`'s timestamp gives
 * the equivalent instant regardless of the system's own time zone.
 *
 * Mirrors `date-fns-tz`'s `fromZonedTime`, built on `Temporal.ZonedDateTime` for the
 * time-zone-to-instant resolution instead of `date-fns-tz`'s own hand-rolled offset parsing.
 *
 * @param date - The date with wall-clock fields representing the local time in `timeZone`
 * @param timeZone - The IANA time zone identifier the date's fields belong to (e.g.
 *   `'America/Los_Angeles'`)
 *
 * @returns The `Date` instance with the equivalent real instant
 *
 * @example
 * // In June, 10am in Los Angeles is 5pm UTC:
 * const result = fromZonedTime(new Date(2014, 5, 25, 10, 0, 0), 'America/Los_Angeles')
 * //=> 2014-06-25T17:00:00.000Z
 */
declare function fromZonedTime(date: Date | DateLike, timeZone: string): Date;
//#endregion
//#region src/get-date.d.ts
/**
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
declare function getDate(date: Date): number;
declare function getDate(date: DateLike): number;
//#endregion
//#region src/get-day.d.ts
/**
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
declare function getDay(date: Date): number;
declare function getDay(date: DateLike): number;
//#endregion
//#region src/get-day-of-year.d.ts
/**
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
declare function getDayOfYear(date: Date): number;
declare function getDayOfYear(date: DateLike): number;
//#endregion
//#region src/get-days-in-month.d.ts
/**
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param date - The given date
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
declare function getDaysInMonth(date: Date): number;
declare function getDaysInMonth(date: DateLike): number;
//#endregion
//#region src/get-days-in-year.d.ts
/**
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param date - The given date
 *
 * @returns The number of days in a year
 *
 * @example
 * // How many days are in 2012?
 * const result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
declare function getDaysInYear(date: Date): number;
declare function getDaysInYear(date: DateLike): number;
//#endregion
//#region src/get-decade.d.ts
/**
 * @summary Get the decade of the given date.
 *
 * @description
 * Get the decade of the given date.
 *
 * @param date - The given date
 *
 * @returns The year of decade
 *
 * @example
 * // Which decade belongs 27 November 1942?
 * const result = getDecade(new Date(1942, 10, 27))
 * //=> 1940
 */
declare function getDecade(date: Date): number;
declare function getDecade(date: DateLike): number;
//#endregion
//#region src/helpers/default-options.d.ts
/**
 * The shape of the global defaults returned by {@link getDefaultOptions}.
 */
interface DefaultOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  locale?: Intl.LocalesArgument;
}
/**
 * The {@link setDefaultOptions} function options. Set a field to `undefined` to remove it from
 * the stored defaults.
 */
interface SetDefaultOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined;
  locale?: Intl.LocalesArgument | undefined;
}
//#endregion
//#region src/get-default-options.d.ts
/**
 * @summary Get default options.
 *
 * @description
 * Returns an object that contains defaults for `options.weekStartsOn` and
 * `options.firstWeekContainsDate` arguments for all functions.
 *
 * You can change these with {@link setDefaultOptions}.
 *
 * @returns The default options
 *
 * @example
 * const result = getDefaultOptions()
 * //=> {}
 *
 * @example
 * setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 })
 * const result = getDefaultOptions()
 * //=> { weekStartsOn: 1, firstWeekContainsDate: 4 }
 */
declare function getDefaultOptions(): DefaultOptions;
//#endregion
//#region src/get-hours.d.ts
/**
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param date - The given date
 *
 * @returns The hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
declare function getHours(date: Date): number;
declare function getHours(date: TimeLike): number;
//#endregion
//#region src/get-iso-day.d.ts
/**
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date, which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
declare function getISODay(date: Date): number;
declare function getISODay(date: DateLike): number;
//#endregion
//#region src/get-iso-week.d.ts
/**
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
declare function getISOWeek(date: Date): number;
declare function getISOWeek(date: DateLike): number;
//#endregion
//#region src/get-iso-week-year.d.ts
/**
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
declare function getISOWeekYear(date: Date): number;
declare function getISOWeekYear(date: DateLike): number;
//#endregion
//#region src/get-iso-weeks-in-year.d.ts
/**
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The number of ISO weeks in a year
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * const result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
declare function getISOWeeksInYear(date: Date): number;
declare function getISOWeeksInYear(date: DateLike): number;
//#endregion
//#region src/get-milliseconds.d.ts
/**
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The milliseconds
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * const result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
declare function getMilliseconds(date: Date): number;
declare function getMilliseconds(date: TimeLike): number;
//#endregion
//#region src/get-minutes.d.ts
/**
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param date - The given date
 *
 * @returns The minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
declare function getMinutes(date: Date): number;
declare function getMinutes(date: TimeLike): number;
//#endregion
//#region src/get-month.d.ts
/**
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param date - The given date
 *
 * @returns The month index (0-11)
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
declare function getMonth(date: Date): number;
declare function getMonth(date: DateLike): number;
//#endregion
//#region src/get-overlapping-days-in-intervals.d.ts
/**
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals. It uses the time
 * between dates to calculate the number of days, rounding it up to include
 * partial days.
 *
 * Two equal 0-length intervals will result in 0. Two equal 1ms intervals will
 * result in 1.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 *
 * @returns The number of days that overlap in two time intervals
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */
declare function getOverlappingDaysInIntervals(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): number;
/**
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals. It uses the time
 * between dates to calculate the number of days, rounding it up to include
 * partial days.
 *
 * Two equal 0-length intervals will result in 0. Two equal 1ms intervals will
 * result in 1.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 *
 * @returns The number of days that overlap in two time intervals
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */
declare function getOverlappingDaysInIntervals<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): number;
//#endregion
//#region src/get-quarter.d.ts
/**
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param date - The given date
 *
 * @returns The quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2));
 * //=> 3
 */
declare function getQuarter(date: Date): number;
declare function getQuarter(date: DateLike): number;
//#endregion
//#region src/get-seconds.d.ts
/**
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
declare function getSeconds(date: Date): number;
declare function getSeconds(date: TimeLike): number;
//#endregion
//#region src/get-time.d.ts
/**
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
declare function getTime(date: Date): number;
declare function getTime(date: DateLike): number;
//#endregion
//#region src/get-timezone-id.d.ts
/**
 * @summary Get the system's current IANA time zone identifier.
 *
 * @description
 * Get the system's current IANA time zone identifier (e.g. `'America/New_York'`), as reported
 * by the runtime environment. This is a thin wrapper around `Temporal.Now.timeZoneId()`.
 *
 * @returns The system's current IANA time zone identifier
 *
 * @example
 * const result = getTimezoneId()
 * //=> 'America/New_York'
 */
declare function getTimezoneId(): string;
//#endregion
//#region src/get-timezone-offset.d.ts
/**
 * @summary Get the offset, in milliseconds, between an IANA time zone and UTC.
 *
 * @description
 * Get the offset, in milliseconds, between an IANA time zone and UTC, at the instant of the
 * given date (defaults to now). Mirrors `date-fns-tz`'s `getTimezoneOffset`, but the underlying
 * offset lookup is delegated to `Temporal.ZonedDateTime`, which natively resolves daylight-saving
 * transitions and "spring forward" gaps — `date-fns-tz`'s own implementation hand-rolls this
 * resolution and is documented to fall back to an approximation in the ambiguous/gap case;
 * `getTimezoneOffset` here always reflects what the IANA time zone database itself says applies
 * at that instant.
 *
 * For `Date`/`Temporal.ZonedDateTime` input, the instant is the value's own real elapsed-time
 * instant. For `Temporal.PlainDate`/`Temporal.PlainDateTime` input (which carry no time zone),
 * per the UTC rule, their wall-clock fields are read as UTC to derive the instant.
 *
 * @param timeZone - The IANA time zone identifier (e.g. `'America/New_York'`)
 * @param date - The instant at which to look up the offset (defaults to the current instant)
 *
 * @returns The offset in milliseconds (positive east of UTC, negative west of UTC)
 *
 * @example
 * const result = getTimezoneOffset('America/New_York', new Date(2016, 0, 1))
 * //=> -18000000 (-5 * 60 * 60 * 1000, EST)
 *
 * @example
 * const result = getTimezoneOffset('America/New_York', new Date(2016, 6, 1))
 * //=> -14400000 (-4 * 60 * 60 * 1000, EDT)
 */
declare function getTimezoneOffset(timeZone: string, date?: Date | DateLike): number;
//#endregion
//#region src/get-unix-time.d.ts
/**
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05:
 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */
declare function getUnixTime(date: Date): number;
declare function getUnixTime(date: DateLike): number;
//#endregion
//#region src/get-week.d.ts
/**
 * The {@link getWeek} function options.
 */
type GetWeekOptions = LocalWeekOptions;
/**
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */
declare function getWeek(date: Date, options?: GetWeekOptions): number;
declare function getWeek(date: DateLike, options?: GetWeekOptions): number;
//#endregion
//#region src/get-week-of-month.d.ts
/**
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week of month
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * const result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
declare function getWeekOfMonth(date: Date, options?: LocalWeekOptions): number;
declare function getWeekOfMonth(date: DateLike, options?: LocalWeekOptions): number;
//#endregion
//#region src/get-week-year.d.ts
/**
 * The {@link getWeekYear} function options.
 */
type GetWeekYearOptions = LocalWeekOptions;
/**
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
declare function getWeekYear(date: Date, options?: GetWeekYearOptions): number;
declare function getWeekYear(date: DateLike, options?: GetWeekYearOptions): number;
//#endregion
//#region src/get-weeks-in-month.d.ts
/**
 * @summary Get the number of calendar weeks a month spans.
 *
 * @description
 * Get the number of calendar weeks the month in the given date spans.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks does February 2015 span?
 * const result = getWeeksInMonth(new Date(2015, 1, 8))
 * //=> 4
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks does July 2017 span?
 * const result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 })
 * //=> 6
 */
declare function getWeeksInMonth(date: Date, options?: LocalWeekOptions): number;
declare function getWeeksInMonth(date: DateLike, options?: LocalWeekOptions): number;
//#endregion
//#region src/get-year.d.ts
/**
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param date - The given date
 *
 * @returns The year
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
declare function getYear(date: Date): number;
declare function getYear(date: DateLike): number;
//#endregion
//#region src/hours-to-milliseconds.d.ts
/**
 * @summary Convert hours to milliseconds.
 *
 * @description
 * Convert a number of hours to a full number of milliseconds.
 *
 * @param hours - The number of hours to be converted
 *
 * @returns The number of hours converted to milliseconds
 *
 * @example
 * // Convert 2 hours to milliseconds:
 * const result = hoursToMilliseconds(2)
 * //=> 7200000
 */
declare function hoursToMilliseconds(hours: number): number;
//#endregion
//#region src/hours-to-minutes.d.ts
/**
 * @summary Convert hours to minutes.
 *
 * @description
 * Convert a number of hours to a full number of minutes.
 *
 * @param hours - The number of hours to be converted
 *
 * @returns The number of hours converted in minutes
 *
 * @example
 * // Convert 2 hours to minutes:
 * const result = hoursToMinutes(2)
 * //=> 120
 */
declare function hoursToMinutes(hours: number): number;
//#endregion
//#region src/hours-to-seconds.d.ts
/**
 * @summary Convert hours to seconds.
 *
 * @description
 * Convert a number of hours to a full number of seconds.
 *
 * @param hours - The number of hours to be converted
 *
 * @returns The number of hours converted in seconds
 *
 * @example
 * // Convert 2 hours to seconds:
 * const result = hoursToSeconds(2)
 * //=> 7200
 */
declare function hoursToSeconds(hours: number): number;
//#endregion
//#region src/intersect-intervals.d.ts
/**
 * @summary Get the overlapping sub-interval of two intervals, or `null` if they don't overlap.
 *
 * @description
 * Get the overlapping sub-interval of two intervals, or `null` if they don't overlap. Adjacent
 * intervals (one's end equals the other's start) are not considered overlapping and return
 * `null`, matching {@link areIntervalsOverlapping}'s default (non-inclusive) behavior.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The overlapping sub-interval, or `null` if the intervals don't overlap
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 17 2014, end: Mon Jan 20 2014 }
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 24) }
 * )
 * //=> null
 */
declare function intersectIntervals(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): Interval<Date> | null;
/**
 * @summary Get the overlapping sub-interval of two intervals, or `null` if they don't overlap.
 *
 * @description
 * Get the overlapping sub-interval of two intervals, or `null` if they don't overlap. Adjacent
 * intervals (one's end equals the other's start) are not considered overlapping and return
 * `null`, matching {@link areIntervalsOverlapping}'s default (non-inclusive) behavior.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The overlapping sub-interval, or `null` if the intervals don't overlap
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 17 2014, end: Mon Jan 20 2014 }
 *
 * @example
 * intersectIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 24) }
 * )
 * //=> null
 */
declare function intersectIntervals<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): Interval<T> | null;
//#endregion
//#region src/interval.d.ts
/**
 * The {@link interval} function options.
 */
interface IntervalOptions {
  assertPositive?: boolean;
}
/**
 * @summary Creates an interval object and validates its values.
 *
 * @description
 * Creates a normalized interval object and validates its values. If `options.assertPositive` is
 * set and `end` is before `start`, an exception is thrown.
 *
 * @param start - The start of the interval.
 * @param end - The end of the interval.
 * @param options - The options object.
 *
 * @throws `End date must be after start date` when `end` is before `start` and
 * `options.assertPositive` is true.
 *
 * @returns The normalized and validated interval object.
 */
declare function interval(start: Date, end: Date, options?: IntervalOptions): Interval<Date>;
/**
 * @summary Creates an interval object and validates its values.
 *
 * @description
 * Creates a normalized interval object and validates its values. If `options.assertPositive` is
 * set and `end` is before `start`, an exception is thrown.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `start`/`end`; both arguments must share the same
 * concrete type, and the result has that same type.
 *
 * @param start - The start of the interval.
 * @param end - The end of the interval.
 * @param options - The options object.
 *
 * @throws `End date must be after start date` when `end` is before `start` and
 * `options.assertPositive` is true.
 *
 * @returns The normalized and validated interval object.
 */
declare function interval<T extends DateLike>(start: T, end: T, options?: IntervalOptions): Interval<T>;
//#endregion
//#region src/interval-to-duration.d.ts
/**
 * @summary Convert interval to duration
 *
 * @description
 * Convert an interval object to a duration object.
 *
 * @param interval - The interval to convert to duration
 *
 * @returns The duration object
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * });
 * //=> { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
declare function intervalToDuration(interval: Interval<Date>): Duration;
/**
 * @summary Convert interval to duration
 *
 * @description
 * Convert an interval object to a duration object.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `interval`.
 *
 * @param interval - The interval to convert to duration
 *
 * @returns The duration object
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * });
 * //=> { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
declare function intervalToDuration<T extends TimeLike>(interval: Interval<T>): Duration;
//#endregion
//#region src/intl-format.d.ts
/**
 * The {@link intlFormat} function locale options.
 */
interface IntlFormatLocaleOptions {
  locale: Intl.LocalesArgument;
}
/**
 * @summary Format the date with `Intl.DateTimeFormat`.
 *
 * @description
 * Return the formatted date string in the given format.
 * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
 * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options).
 *
 * @param date - The date to format
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 4 October 2019 in middle-endian format:
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
 * //=> 10/4/2019
 */
declare function intlFormat(date: Date | DateLike): string;
declare function intlFormat(date: Date | DateLike, localeOptions: IntlFormatLocaleOptions): string;
declare function intlFormat(date: Date | DateLike, formatOptions: Intl.DateTimeFormatOptions): string;
declare function intlFormat(date: Date | DateLike, formatOptions: Intl.DateTimeFormatOptions, localeOptions: IntlFormatLocaleOptions): string;
//#endregion
//#region src/intl-format-distance.d.ts
type IntlFormatDistanceUnit = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';
/**
 * The {@link intlFormatDistance} function options.
 */
interface IntlFormatDistanceOptions extends Intl.RelativeTimeFormatOptions {
  unit?: IntlFormatDistanceUnit;
  locale?: Intl.LocalesArgument;
}
/**
 * @summary Formats distance between two dates in a human-readable format
 *
 * @description
 * The function calculates the difference between two dates and formats it as a human-readable
 * string.
 *
 * The function will pick the most appropriate unit depending on the distance between dates. For
 * example, if the distance is a few hours, it might return `x hours`. If the distance is a few
 * months, it might return `x months`.
 *
 * You can also specify a unit to force using it regardless of the distance to get a result like
 * `123456 hours`.
 *
 * See the table below for the unit picking logic:
 *
 * | Distance between dates | Result (past)  | Result (future) |
 * | ------------------------ | -------------- | --------------- |
 * | 0 seconds              | now            | now             |
 * | 1-59 seconds           | X seconds ago  | in X seconds    |
 * | 1-59 minutes           | X minutes ago  | in X minutes    |
 * | 1-23 hours             | X hours ago    | in X hours      |
 * | 1 day                  | yesterday      | tomorrow        |
 * | 2-6 days               | X days ago     | in X days       |
 * | 7 days                 | last week      | next week       |
 * | 8 days-1 month         | X weeks ago    | in X weeks      |
 * | 1 month                | last month     | next month      |
 * | 2-3 months             | X months ago   | in X months     |
 * | 1 quarter              | last quarter   | next quarter    |
 * | 2-3 quarters           | X quarters ago | in X quarters   |
 * | 1 year                 | last year      | next year       |
 * | 2+ years               | X years ago    | in X years      |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options. See MDN for details on
 * [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).
 *
 * @returns The distance in words according to language-sensitive relative time formatting.
 *
 * @example
 * // What is the distance between the dates when the fist date is after the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0)
 * )
 * //=> 'in 1 hour'
 *
 * // What is the distance between the dates when the fist date is before the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0)
 * )
 * //=> '1 hour ago'
 *
 * @example
 * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
 * intlFormatDistance(
 *   new Date(1987, 6, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter' }
 * )
 * //=> 'in 5 quarters'
 *
 * @example
 * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { locale: 'es' }
 * )
 * //=> 'dentro de 1 hora'
 *
 * @example
 * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
 * intlFormatDistance(
 *   new Date(1986, 3, 5, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { numeric: 'always' }
 * )
 * //=> 'in 1 day'
 *
 * @example
 * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
 * intlFormatDistance(
 *   new Date(1988, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { style: 'short' }
 * )
 * //=> 'in 2 yr'
 */
declare function intlFormatDistance(laterDate: Date, earlierDate: Date, options?: IntlFormatDistanceOptions): string;
/**
 * @summary Formats distance between two dates in a human-readable format
 *
 * @description
 * The function calculates the difference between two dates and formats it as a human-readable
 * string.
 *
 * The function will pick the most appropriate unit depending on the distance between dates. For
 * example, if the distance is a few hours, it might return `x hours`. If the distance is a few
 * months, it might return `x months`.
 *
 * You can also specify a unit to force using it regardless of the distance to get a result like
 * `123456 hours`.
 *
 * See the table below for the unit picking logic:
 *
 * | Distance between dates | Result (past)  | Result (future) |
 * | ------------------------ | -------------- | --------------- |
 * | 0 seconds              | now            | now             |
 * | 1-59 seconds           | X seconds ago  | in X seconds    |
 * | 1-59 minutes           | X minutes ago  | in X minutes    |
 * | 1-23 hours             | X hours ago    | in X hours      |
 * | 1 day                  | yesterday      | tomorrow        |
 * | 2-6 days               | X days ago     | in X days       |
 * | 7 days                 | last week      | next week       |
 * | 8 days-1 month         | X weeks ago    | in X weeks      |
 * | 1 month                | last month     | next month      |
 * | 2-3 months             | X months ago   | in X months     |
 * | 1 quarter              | last quarter   | next quarter    |
 * | 2-3 quarters           | X quarters ago | in X quarters   |
 * | 1 year                 | last year      | next year       |
 * | 2+ years               | X years ago    | in X years      |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `laterDate`/`earlierDate`, which must share the same
 * concrete type.
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options. See MDN for details on
 * [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).
 *
 * @returns The distance in words according to language-sensitive relative time formatting.
 *
 * @example
 * // What is the distance between the dates when the fist date is after the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0)
 * )
 * //=> 'in 1 hour'
 *
 * // What is the distance between the dates when the fist date is before the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0)
 * )
 * //=> '1 hour ago'
 *
 * @example
 * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
 * intlFormatDistance(
 *   new Date(1987, 6, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter' }
 * )
 * //=> 'in 5 quarters'
 *
 * @example
 * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { locale: 'es' }
 * )
 * //=> 'dentro de 1 hora'
 *
 * @example
 * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
 * intlFormatDistance(
 *   new Date(1986, 3, 5, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { numeric: 'always' }
 * )
 * //=> 'in 1 day'
 *
 * @example
 * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
 * intlFormatDistance(
 *   new Date(1988, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { style: 'short' }
 * )
 * //=> 'in 2 yr'
 */
declare function intlFormatDistance<T extends DateLike>(laterDate: T, earlierDate: T, options?: IntlFormatDistanceOptions): string;
//#endregion
//#region src/is-after.d.ts
/**
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param a - The date that should be after the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
declare function isAfter(a: Date, b: Date): boolean;
/**
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The date that should be after the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
declare function isAfter<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-before.d.ts
/**
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param a - The date that should be before the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
declare function isBefore(a: Date, b: Date): boolean;
/**
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The date that should be before the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
declare function isBefore<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-date.d.ts
/**
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of `Date`. The function works for dates
 * transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
declare function isDate(value: unknown): value is Date;
//#endregion
//#region src/is-equal.d.ts
/**
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
declare function isEqual(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to compare
 * @param b - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
declare function isEqual<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-exists.d.ts
/**
 * @summary Is the given date exists?
 *
 * @description
 * Checks if the given arguments convert to an existing date.
 *
 * @param year - The year of the date to check
 * @param month - The month of the date to check
 * @param day - The day of the date to check
 *
 * @returns `true` if the date exists
 *
 * @example
 * // For the valid date:
 * const result = isExists(2018, 0, 31)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isExists(2018, 1, 31)
 * //=> false
 */
declare function isExists(year: number, month: number, day: number): boolean;
//#endregion
//#region src/is-first-day-of-month.d.ts
/**
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param date - The date to check
 *
 * @returns The date is the first day of a month
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * const result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
declare function isFirstDayOfMonth(date: Date): boolean;
declare function isFirstDayOfMonth(date: DateLike): boolean;
//#endregion
//#region src/is-friday.d.ts
/**
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param date - The date to check
 *
 * @returns The date is Friday
 *
 * @example
 * // Is 26 September 2014 Friday?
 * const result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
declare const isFriday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
//#region src/is-future.d.ts
/**
 * @summary Is the given date in the future?
 *
 * @description
 * Is the given date in the future?
 *
 * @param date - The date to check
 *
 * @returns The date is in the future
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * const result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
declare function isFuture(date: Date | DateLike): boolean;
//#endregion
//#region src/is-interval-empty.d.ts
/**
 * @summary Is the given interval empty (its start equals its end)?
 *
 * @description
 * Is the given interval empty (its start equals its end)?
 *
 * @param interval - The interval to check
 *
 * @returns Whether the interval's `start` equals its `end`
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 10) })
 * //=> true
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) })
 * //=> false
 */
declare function isIntervalEmpty(interval: Interval<Date>): boolean;
/**
 * @summary Is the given interval empty (its start equals its end)?
 *
 * @description
 * Is the given interval empty (its start equals its end)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`.
 *
 * @param interval - The interval to check
 *
 * @returns Whether the interval's `start` equals its `end`
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 10) })
 * //=> true
 *
 * @example
 * isIntervalEmpty({ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) })
 * //=> false
 */
declare function isIntervalEmpty<T extends DateLike>(interval: Interval<T>): boolean;
//#endregion
//#region src/is-interval-subset.d.ts
/**
 * @summary Is `intervalLeft` fully contained within `intervalRight`?
 *
 * @description
 * Is `intervalLeft` fully contained within `intervalRight`? Uses the non-strict (⊆) definition:
 * an interval is a subset of an equal interval, and a subset of itself.
 *
 * @param intervalLeft - The interval to check
 * @param intervalRight - The interval that might contain `intervalLeft`
 *
 * @returns Whether `intervalLeft` is fully contained within `intervalRight`
 *
 * @example
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 *
 * @example
 * // Equal intervals are subsets of each other (non-strict ⊆).
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
declare function isIntervalSubset(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): boolean;
/**
 * @summary Is `intervalLeft` fully contained within `intervalRight`?
 *
 * @description
 * Is `intervalLeft` fully contained within `intervalRight`? Uses the non-strict (⊆) definition:
 * an interval is a subset of an equal interval, and a subset of itself.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The interval to check
 * @param intervalRight - The interval that might contain `intervalLeft`
 *
 * @returns Whether `intervalLeft` is fully contained within `intervalRight`
 *
 * @example
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 *
 * @example
 * // Equal intervals are subsets of each other (non-strict ⊆).
 * isIntervalSubset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> true
 */
declare function isIntervalSubset<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): boolean;
//#endregion
//#region src/is-interval-superset.d.ts
/**
 * @summary Does `intervalLeft` fully contain `intervalRight`?
 *
 * @description
 * Does `intervalLeft` fully contain `intervalRight`? Uses the non-strict (⊇) definition: an
 * interval is a superset of an equal interval, and a superset of itself. Equivalent to
 * `isIntervalSubset(intervalRight, intervalLeft)`.
 *
 * @param intervalLeft - The interval that might contain `intervalRight`
 * @param intervalRight - The interval to check
 *
 * @returns Whether `intervalLeft` fully contains `intervalRight`
 *
 * @example
 * isIntervalSuperset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) }
 * )
 * //=> true
 */
declare function isIntervalSuperset(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): boolean;
/**
 * @summary Does `intervalLeft` fully contain `intervalRight`?
 *
 * @description
 * Does `intervalLeft` fully contain `intervalRight`? Uses the non-strict (⊇) definition: an
 * interval is a superset of an equal interval, and a superset of itself. Equivalent to
 * `isIntervalSubset(intervalRight, intervalLeft)`.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The interval that might contain `intervalRight`
 * @param intervalRight - The interval to check
 *
 * @returns Whether `intervalLeft` fully contains `intervalRight`
 *
 * @example
 * isIntervalSuperset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) }
 * )
 * //=> true
 */
declare function isIntervalSuperset<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): boolean;
//#endregion
//#region src/is-last-day-of-month.d.ts
/**
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
declare function isLastDayOfMonth(date: Date): boolean;
declare function isLastDayOfMonth(date: DateLike): boolean;
//#endregion
//#region src/is-leap-year.d.ts
/**
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param date - The date to check
 *
 * @returns The date is in the leap year
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * const result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
declare function isLeapYear(date: Date): boolean;
declare function isLeapYear(date: DateLike): boolean;
//#endregion
//#region src/parse.d.ts
/**
 * The {@link parse} function options.
 */
interface ParseOptions {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}
interface ParseTemporalOptions<T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime> extends ParseOptions {
  in: new (...args: never[]) => T;
}
type ParseZonedDateTimeOptions = ParseTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * The characters wrapped between two single quote characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real'
 * single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Values will be assigned to the date in the descending order of priority: years, then months and
 * weeks, then days, then hours, minutes and seconds, then milliseconds. Units of an equal priority
 * overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a
 * year), the values will be taken from `referenceDate`, which works as a context of parsing.
 *
 * If `formatStr` matches with `dateStr` but doesn't provide tokens, `referenceDate` is returned
 * (with the time set to midnight).
 *
 * If parsing fails, an invalid `Date` (whose time value is `NaN`) is returned.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options
 *
 * @returns The parsed date
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * const result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options?: ParseOptions): Date;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a `Temporal.PlainDate`.
 *
 * Throws a `TypeError` if `formatStr` contains any time-of-day token (hour, minute, second,
 * fraction of a second, AM/PM, or day period), since a `Temporal.PlainDate` has no time
 * component.
 *
 * @typeParam T - `Temporal.PlainDate`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.PlainDate`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 * @throws `formatStr` contains a time-of-day token
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options: ParseTemporalOptions<Temporal.PlainDate>): Temporal.PlainDate | undefined;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a
 * `Temporal.PlainDateTime`.
 *
 * Any timezone offset or Unix timestamp token (`X`, `x`, `t`, `T`) parsed from `dateStr` is
 * discarded, since a `Temporal.PlainDateTime` has no time zone to apply it to.
 *
 * @typeParam T - `Temporal.PlainDateTime`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.PlainDateTime`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options: ParseTemporalOptions<Temporal.PlainDateTime>): Temporal.PlainDateTime | undefined;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a
 * `Temporal.ZonedDateTime` in the given `options.timeZone`.
 *
 * If `dateStr` contains an explicit timezone offset or Unix timestamp token, the resulting
 * instant is authoritative and `options.timeZone` only determines its wall-clock representation.
 * Otherwise the parsed wall-clock fields are attached directly to `options.timeZone`.
 *
 * @typeParam T - `Temporal.ZonedDateTime`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.ZonedDateTime` and a
 *   required `timeZone`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 */
declare function parse(dateStr: string, formatStr: string, referenceDate: Date | DateLike, options: ParseZonedDateTimeOptions): Temporal.ZonedDateTime | undefined;
//#endregion
//#region src/is-match.d.ts
/**
 * The {@link isMatch} function options.
 */
type IsMatchOptions = ParseOptions;
/**
 * @summary Validate the date string against the given format string.
 *
 * @description
 * Return true if the given date string matches the given format string, false otherwise.
 *
 * The characters in the format string wrapped between two single quotes (') are escaped. Two
 * single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single
 * quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are
 * prohibited and throw a `RangeError`. For example, using a 24-hour format token with an AM/PM
 * token throws:
 *
 * ```javascript
 * isMatch('23 AM', 'HH a')
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * Values are checked in the descending order of their unit's priority. Units of an equal priority
 * overwrite each other in the order of appearance.
 *
 * If no values of higher priority are matched (e.g. when matching the string 'January 1st'
 * without a year), the values are taken from the current date (`new Date()`), which works as the
 * context for matching.
 *
 * @param dateStr - The date string to verify
 * @param formatStr - The string of tokens
 * @param options - An object with options
 *
 * @returns Is the format string a match for the date string?
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 *
 * @example
 * // Match 11 February 2014 from middle-endian format:
 * const result = isMatch('02/11/2014', 'MM/dd/yyyy')
 * //=> true
 */
declare function isMatch(dateStr: string, formatStr: string, options?: IsMatchOptions): boolean;
//#endregion
//#region src/is-monday.d.ts
/**
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * @param date - The date to check
 *
 * @returns The date is Monday
 *
 * @example
 * // Is 22 September 2014 Monday?
 * const result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
declare const isMonday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
//#region src/is-past.d.ts
/**
 * @summary Is the given date in the past?
 *
 * @description
 * Is the given date in the past?
 *
 * @param date - The date to check
 *
 * @returns The date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * const result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
declare function isPast(date: Date | DateLike): boolean;
//#endregion
//#region src/is-plain-date.d.ts
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
declare function isPlainDate(value: unknown): value is Temporal.PlainDate;
//#endregion
//#region src/is-plain-date-time.d.ts
/**
 * @summary Is the given value a `Temporal.PlainDateTime`?
 *
 * @description
 * Is the given value a `Temporal.PlainDateTime`?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.PlainDateTime`
 */
declare function isPlainDateTime(value: unknown): value is Temporal.PlainDateTime;
//#endregion
//#region src/is-same-day.d.ts
/**
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
declare function isSameDay(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
declare function isSameDay<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-hour.d.ts
/**
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same hour (and same day)
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
 * //=> false
 */
declare function isSameHour(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same hour (and same day)
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
 * //=> false
 */
declare function isSameHour<T extends TimeLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-iso-week.d.ts
/**
 * @summary Are the given dates in the same ISO week (and year)?
 *
 * @description
 * Are the given dates in the same ISO week (and year)?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same ISO week (and year)
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2014, 8, 7))
 * //=> true
 *
 * @example
 * // Are 1 September 2014 and 1 September 2015 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2015, 8, 1))
 * //=> false
 */
declare function isSameISOWeek(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same ISO week (and year)?
 *
 * @description
 * Are the given dates in the same ISO week (and year)?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same ISO week (and year)
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2014, 8, 7))
 * //=> true
 *
 * @example
 * // Are 1 September 2014 and 1 September 2015 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2015, 8, 1))
 * //=> false
 */
declare function isSameISOWeek<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-iso-week-year.d.ts
/**
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
declare function isSameISOWeekYear(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
declare function isSameISOWeekYear<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-minute.d.ts
/**
 * @summary Are the given dates in the same minute (and hour and day)?
 *
 * @description
 * Are the given dates in the same minute (and hour and day)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same minute (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 5 September 2014 06:30:00 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 5, 6, 30)
 * )
 * //=> false
 */
declare function isSameMinute(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same minute (and hour and day)?
 *
 * @description
 * Are the given dates in the same minute (and hour and day)?
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same minute (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 5 September 2014 06:30:00 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 5, 6, 30)
 * )
 * //=> false
 */
declare function isSameMinute<T extends TimeLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-month.d.ts
/**
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
declare function isSameMonth(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
declare function isSameMonth<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-quarter.d.ts
/**
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
declare function isSameQuarter(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
declare function isSameQuarter<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-second.d.ts
/**
 * @summary Are the given dates in the same second (and hour and day)?
 *
 * @description
 * Are the given dates in the same second (and hour and day)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same second (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 4 September 2014 06:01.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 4, 6, 1, 15)
 * )
 * //=> false
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 5 September 2014 06:00.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 5, 6, 0, 15)
 * )
 * //=> false
 */
declare function isSameSecond(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same second (and hour and day)?
 *
 * @description
 * Are the given dates in the same second (and hour and day)?
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same second (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 4 September 2014 06:01.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 4, 6, 1, 15)
 * )
 * //=> false
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 5 September 2014 06:00.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 5, 6, 0, 15)
 * )
 * //=> false
 */
declare function isSameSecond<T extends TimeLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-same-week.d.ts
/**
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
declare function isSameWeek(a: Date, b: Date, options?: StartOfWeekOptions): boolean;
/**
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
declare function isSameWeek<T extends DateLike>(a: T, b: T, options?: StartOfWeekOptions): boolean;
//#endregion
//#region src/is-same-year.d.ts
/**
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
declare function isSameYear(a: Date, b: Date): boolean;
/**
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The first date to check
 * @param b - The second date to check
 *
 * @returns The dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
declare function isSameYear<T extends DateLike>(a: T, b: T): boolean;
//#endregion
//#region src/is-saturday.d.ts
/**
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param date - The date to check
 *
 * @returns The date is Saturday
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * const result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
declare const isSaturday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
//#region src/is-sunday.d.ts
/**
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param date - The date to check
 *
 * @returns The date is Sunday
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * const result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
declare const isSunday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
//#region src/is-temporal.d.ts
/**
 * @summary Is the given value a Temporal date-like value?
 *
 * @description
 * Is the given value a {@link DateLike} (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`)?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`
 */
declare function isTemporal(value: unknown): value is DateLike;
//#endregion
//#region src/is-this-hour.d.ts
/**
 * @summary Is the given date in the same hour as the current date?
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this hour
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * const result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
declare function isThisHour(date: Date | TimeLike): boolean;
//#endregion
//#region src/is-this-iso-week.d.ts
/**
 * @summary Is the given date in the same ISO week as the current date?
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to check
 *
 * @returns The date is in this ISO week
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * const result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
declare function isThisISOWeek(date: Date | DateLike): boolean;
//#endregion
//#region src/is-this-minute.d.ts
/**
 * @summary Is the given date in the same minute as the current date?
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this minute
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * const result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */
declare function isThisMinute(date: Date | TimeLike): boolean;
//#endregion
//#region src/is-this-month.d.ts
/**
 * @summary Is the given date in the same month as the current date?
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this month
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * const result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
declare function isThisMonth(date: Date | DateLike): boolean;
//#endregion
//#region src/is-this-quarter.d.ts
/**
 * @summary Is the given date in the same quarter as the current date?
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this quarter
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * const result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
declare function isThisQuarter(date: Date | DateLike): boolean;
//#endregion
//#region src/is-this-second.d.ts
/**
 * @summary Is the given date in the same second as the current date?
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this second
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * const result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
declare function isThisSecond(date: Date | TimeLike): boolean;
//#endregion
//#region src/is-this-week.d.ts
/**
 * @summary Is the given date in the same week as the current date?
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
declare function isThisWeek(date: Date | DateLike, options?: StartOfWeekOptions): boolean;
//#endregion
//#region src/is-this-year.d.ts
/**
 * @summary Is the given date in the same year as the current date?
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this year
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * const result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
declare function isThisYear(date: Date | DateLike): boolean;
//#endregion
//#region src/is-thursday.d.ts
/**
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param date - The date to check
 *
 * @returns The date is Thursday
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * const result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
declare const isThursday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
//#region src/is-today.d.ts
/**
 * @summary Is the given date today?
 *
 * @description
 * Is the given date today?
 *
 * @param date - The date to check
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
declare function isToday(date: Date | DateLike): boolean;
//#endregion
//#region src/is-tomorrow.d.ts
/**
 * @summary Is the given date tomorrow?
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param date - The date to check
 *
 * @returns The date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
declare function isTomorrow(date: Date | DateLike): boolean;
//#endregion
//#region src/is-tuesday.d.ts
/**
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param date - The date to check
 *
 * @returns The date is Tuesday
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * const result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
declare const isTuesday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
//#region src/is-valid.d.ts
/**
 * @summary Is the given date valid?
 *
 * @description
 * Always returns `true`: `Temporal.PlainDate`/`Temporal.PlainDateTime`/`Temporal.ZonedDateTime`
 * values can never represent an "Invalid Date" sentinel the way `Date` can — constructing one
 * from invalid input throws instead. This overload exists purely for API symmetry with the
 * general overload below.
 *
 * @param date - The date to check
 *
 * @returns `true`
 */
declare function isValid(date: DateLike): true;
/**
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise. Argument is converted to `Date`
 * using {@link toDate}. Invalid Date is a `Date`, whose time value is `NaN`.
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
declare function isValid(date: unknown): boolean;
//#endregion
//#region src/is-wednesday.d.ts
/**
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * @param date - The date to check
 *
 * @returns The date is Wednesday
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * const result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
declare const isWednesday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
//#region src/is-weekend.d.ts
/**
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend? A weekend is either Saturday (`6`) or Sunday (`0`).
 *
 * @param date - The date to check
 *
 * @returns The date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * const result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
declare function isWeekend(date: Date): boolean;
declare function isWeekend(date: DateLike): boolean;
//#endregion
//#region src/is-within-interval.d.ts
/**
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @param date - The date to check
 * @param interval - The interval to check
 *
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => false
 *
 * @example
 * // For date equal to the interval start:
 * isWithinInterval(date, { start, end: date })
 * // => true
 *
 * @example
 * // For date equal to the interval end:
 * isWithinInterval(date, { start: date, end })
 * // => true
 */
declare function isWithinInterval(date: Date, interval: Interval<Date>): boolean;
/**
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`/`interval`, which must share the same
 * concrete type.
 *
 * @param date - The date to check
 * @param interval - The interval to check
 *
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => false
 *
 * @example
 * // For date equal to the interval start:
 * isWithinInterval(date, { start, end: date })
 * // => true
 *
 * @example
 * // For date equal to the interval end:
 * isWithinInterval(date, { start: date, end })
 * // => true
 */
declare function isWithinInterval<T extends DateLike>(date: T, interval: Interval<T>): boolean;
//#endregion
//#region src/is-yesterday.d.ts
/**
 * @summary Is the given date yesterday?
 *
 * @description
 * Is the given date yesterday?
 *
 * @param date - The date to check
 *
 * @returns The date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
declare function isYesterday(date: Date | DateLike): boolean;
//#endregion
//#region src/is-zoned-date-time.d.ts
/**
 * @summary Is the given value a `Temporal.ZonedDateTime`?
 *
 * @description
 * Is the given value a `Temporal.ZonedDateTime`?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.ZonedDateTime`
 */
declare function isZonedDateTime(value: unknown): value is Temporal.ZonedDateTime;
//#endregion
//#region src/last-day-of-decade.d.ts
/**
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * @param date - The original date
 *
 * @returns The last day of a decade
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
declare function lastDayOfDecade(date: Date): Date;
/**
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of a decade
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
declare function lastDayOfDecade<T extends DateLike>(date: T): T;
//#endregion
//#region src/last-day-of-iso-week.d.ts
/**
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function lastDayOfISOWeek(date: Date): Date;
/**
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function lastDayOfISOWeek<T extends DateLike>(date: T): T;
//#endregion
//#region src/last-day-of-iso-week-year.d.ts
/**
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
declare function lastDayOfISOWeekYear(date: Date): Date;
/**
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
declare function lastDayOfISOWeekYear<T extends DateLike>(date: T): T;
//#endregion
//#region src/last-day-of-month.d.ts
/**
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 *
 * @param date - The original date
 *
 * @returns The last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
declare function lastDayOfMonth(date: Date): Date;
/**
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
declare function lastDayOfMonth<T extends DateLike>(date: T): T;
//#endregion
//#region src/last-day-of-quarter.d.ts
/**
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 *
 * @param date - The original date
 *
 * @returns The last day of a quarter
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * const result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
declare function lastDayOfQuarter(date: Date): Date;
/**
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of a quarter
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * const result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
declare function lastDayOfQuarter<T extends DateLike>(date: T): T;
//#endregion
//#region src/last-day-of-week.d.ts
/**
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a week
 */
declare function lastDayOfWeek(date: Date, options?: StartOfWeekOptions): Date;
/**
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a week
 */
declare function lastDayOfWeek<T extends DateLike>(date: T, options?: StartOfWeekOptions): T;
//#endregion
//#region src/last-day-of-year.d.ts
/**
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
declare function lastDayOfYear(date: Date): Date;
/**
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
declare function lastDayOfYear<T extends DateLike>(date: T): T;
//#endregion
//#region src/light-format.d.ts
/**
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. Unlike `format`, `lightFormat` outputs
 * dates using the most popular tokens, without the long-localized-format (`P`/`p`) machinery.
 *
 * The characters wrapped between two single quote characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real'
 * single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   |
 * |----------------------------------|---------|------------------------------------|
 * | AM, PM                          | a..aaa  | AM, PM                            |
 * |                                 | aaaa    | a.m., p.m.                        |
 * |                                 | aaaaa   | a, p                              |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 |
 * |                                 | yy      | 44, 01, 00, 17                    |
 * |                                 | yyy     | 044, 001, 000, 017                |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |
 * |                                 | MM      | 01, 02, ..., 12                   |
 * | Day of month                    | d       | 1, 2, ..., 31                     |
 * |                                 | dd      | 01, 02, ..., 31                   |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |
 * |                                 | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |
 * |                                 | HH      | 00, 01, 02, ..., 23               |
 * | Minute                          | m       | 0, 1, ..., 59                     |
 * |                                 | mm      | 00, 01, ..., 59                   |
 * | Second                          | s       | 0, 1, ..., 59                     |
 * |                                 | ss      | 00, 01, ..., 59                   |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |
 * |                                 | SS      | 00, 01, ..., 99                   |
 * |                                 | SSS     | 000, 001, ..., 999                |
 * |                                 | SSSS    | ...                               |
 *
 * @param date - The original date
 * @param formatStr - The string of tokens
 *
 * @returns The formatted date string
 *
 * @throws `Invalid time value` if `date` is an invalid `Date`
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * const result = lightFormat(new Date(2014, 1, 11), 'yyyy-MM-dd')
 * //=> '2014-02-11'
 */
declare function lightFormat(date: Date | DateLike, formatStr: string): string;
//#endregion
//#region src/max.d.ts
/**
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
declare function max(dates: readonly Date[]): Date;
/**
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dates`; the result has the same concrete type.
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
declare function max<T extends DateLike>(dates: readonly T[]): T;
//#endregion
//#region src/milliseconds.d.ts
/**
 * @summary Returns the number of milliseconds in the specified years, months, weeks, days, hours, minutes and seconds.
 *
 * @description
 * Returns the number of milliseconds in the specified years, months, weeks, days, hours, minutes
 * and seconds.
 *
 * One year equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 *
 * One month is a year divided by 12.
 *
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be converted
 *
 * @returns The milliseconds
 *
 * @example
 * // 1 year in milliseconds
 * milliseconds({ years: 1 })
 * //=> 31556952000
 *
 * // 3 months in milliseconds
 * milliseconds({ months: 3 })
 * //=> 7889238000
 */
declare function milliseconds(duration: Duration): number;
//#endregion
//#region src/milliseconds-to-hours.d.ts
/**
 * @summary Convert milliseconds to hours.
 *
 * @description
 * Convert a number of milliseconds to a full number of hours.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in hours
 *
 * @example
 * // Convert 7200000 milliseconds to hours:
 * const result = millisecondsToHours(7200000)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToHours(7199999)
 * //=> 1
 */
declare function millisecondsToHours(milliseconds: number): number;
//#endregion
//#region src/milliseconds-to-minutes.d.ts
/**
 * @summary Convert milliseconds to minutes.
 *
 * @description
 * Convert a number of milliseconds to a full number of minutes.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in minutes
 *
 * @example
 * // Convert 60000 milliseconds to minutes:
 * const result = millisecondsToMinutes(60000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToMinutes(119999)
 * //=> 1
 */
declare function millisecondsToMinutes(milliseconds: number): number;
//#endregion
//#region src/milliseconds-to-seconds.d.ts
/**
 * @summary Convert milliseconds to seconds.
 *
 * @description
 * Convert a number of milliseconds to a full number of seconds.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in seconds
 *
 * @example
 * // Convert 1000 milliseconds to seconds:
 * const result = millisecondsToSeconds(1000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToSeconds(1999)
 * //=> 1
 */
declare function millisecondsToSeconds(milliseconds: number): number;
//#endregion
//#region src/min.d.ts
/**
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @param dates - The dates to compare
 *
 * @returns The earliest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
declare function min(dates: readonly Date[]): Date;
/**
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `dates`; the result has the same concrete type.
 *
 * @param dates - The dates to compare
 *
 * @returns The earliest of the dates
 *
 * @throws `RangeError` when `dates` is empty.
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
declare function min<T extends DateLike>(dates: readonly T[]): T;
//#endregion
//#region src/minutes-to-hours.d.ts
/**
 * @summary Convert minutes to hours.
 *
 * @description
 * Convert a number of minutes to a full number of hours.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in hours
 *
 * @example
 * // Convert 140 minutes to hours:
 * const result = minutesToHours(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = minutesToHours(179)
 * //=> 2
 */
declare function minutesToHours(minutes: number): number;
//#endregion
//#region src/minutes-to-milliseconds.d.ts
/**
 * @summary Convert minutes to milliseconds.
 *
 * @description
 * Convert a number of minutes to a full number of milliseconds.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in milliseconds
 *
 * @example
 * // Convert 2 minutes to milliseconds
 * const result = minutesToMilliseconds(2)
 * //=> 120000
 */
declare function minutesToMilliseconds(minutes: number): number;
//#endregion
//#region src/minutes-to-seconds.d.ts
/**
 * @summary Convert minutes to seconds.
 *
 * @description
 * Convert a number of minutes to a full number of seconds.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in seconds
 *
 * @example
 * // Convert 2 minutes to seconds
 * const result = minutesToSeconds(2)
 * //=> 120
 */
declare function minutesToSeconds(minutes: number): number;
//#endregion
//#region src/months-to-quarters.d.ts
/**
 * @summary Convert number of months to quarters.
 *
 * @description
 * Convert a number of months to a full number of quarters.
 *
 * @param months - The number of months to be converted.
 *
 * @returns The number of months converted in quarters
 *
 * @example
 * // Convert 6 months to quarters:
 * const result = monthsToQuarters(6)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = monthsToQuarters(7)
 * //=> 2
 */
declare function monthsToQuarters(months: number): number;
//#endregion
//#region src/months-to-years.d.ts
/**
 * @summary Convert number of months to years.
 *
 * @description
 * Convert a number of months to a full number of years.
 *
 * @param months - The number of months to be converted
 *
 * @returns The number of months converted in years
 *
 * @example
 * // Convert 36 months to years:
 * const result = monthsToYears(36)
 * //=> 3
 *
 * // It uses floor rounding:
 * const result = monthsToYears(40)
 * //=> 3
 */
declare function monthsToYears(months: number): number;
//#endregion
//#region src/next-day.d.ts
/**
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param date - The date to check
 * @param day - Day of the week
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
declare function nextDay(date: Date, day: number): Date;
/**
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to check
 * @param day - Day of the week
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
declare function nextDay<T extends DateLike>(date: T, day: number): T;
//#endregion
//#region src/next-friday.d.ts
/**
 * @summary When is the next Friday?
 *
 * @description
 * When is the next Friday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Friday
 *
 * @example
 * // When is the next Friday after Mar, 22, 2020?
 * const result = nextFriday(new Date(2020, 2, 22))
 * //=> Fri Mar 27 2020 00:00:00
 */
declare function nextFriday(date: Date): Date;
/**
 * @summary When is the next Friday?
 *
 * @description
 * When is the next Friday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Friday
 *
 * @example
 * // When is the next Friday after Mar, 22, 2020?
 * const result = nextFriday(new Date(2020, 2, 22))
 * //=> Fri Mar 27 2020 00:00:00
 */
declare function nextFriday<T extends DateLike>(date: T): T;
//#endregion
//#region src/next-monday.d.ts
/**
 * @summary When is the next Monday?
 *
 * @description
 * When is the next Monday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Monday
 *
 * @example
 * // When is the next Monday after Mar, 22, 2020?
 * const result = nextMonday(new Date(2020, 2, 22))
 * //=> Mon Mar 23 2020 00:00:00
 */
declare function nextMonday(date: Date): Date;
/**
 * @summary When is the next Monday?
 *
 * @description
 * When is the next Monday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Monday
 *
 * @example
 * // When is the next Monday after Mar, 22, 2020?
 * const result = nextMonday(new Date(2020, 2, 22))
 * //=> Mon Mar 23 2020 00:00:00
 */
declare function nextMonday<T extends DateLike>(date: T): T;
//#endregion
//#region src/next-saturday.d.ts
/**
 * @summary When is the next Saturday?
 *
 * @description
 * When is the next Saturday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Saturday
 *
 * @example
 * // When is the next Saturday after Mar, 22, 2020?
 * const result = nextSaturday(new Date(2020, 2, 22))
 * //=> Sat Mar 28 2020 00:00:00
 */
declare function nextSaturday(date: Date): Date;
/**
 * @summary When is the next Saturday?
 *
 * @description
 * When is the next Saturday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Saturday
 *
 * @example
 * // When is the next Saturday after Mar, 22, 2020?
 * const result = nextSaturday(new Date(2020, 2, 22))
 * //=> Sat Mar 28 2020 00:00:00
 */
declare function nextSaturday<T extends DateLike>(date: T): T;
//#endregion
//#region src/next-sunday.d.ts
/**
 * @summary When is the next Sunday?
 *
 * @description
 * When is the next Sunday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Sunday
 *
 * @example
 * // When is the next Sunday after March 22, 2020?
 * const result = nextSunday(new Date(2020, 2, 22))
 * //=> Sun Mar 29 2020 00:00:00
 */
declare function nextSunday(date: Date): Date;
/**
 * @summary When is the next Sunday?
 *
 * @description
 * When is the next Sunday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Sunday
 *
 * @example
 * // When is the next Sunday after March 22, 2020?
 * const result = nextSunday(new Date(2020, 2, 22))
 * //=> Sun Mar 29 2020 00:00:00
 */
declare function nextSunday<T extends DateLike>(date: T): T;
//#endregion
//#region src/next-thursday.d.ts
/**
 * @summary When is the next Thursday?
 *
 * @description
 * When is the next Thursday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Thursday
 *
 * @example
 * // When is the next Thursday after Mar, 22, 2020?
 * const result = nextThursday(new Date(2020, 2, 22))
 * //=> Thur Mar 26 2020 00:00:00
 */
declare function nextThursday(date: Date): Date;
/**
 * @summary When is the next Thursday?
 *
 * @description
 * When is the next Thursday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Thursday
 *
 * @example
 * // When is the next Thursday after Mar, 22, 2020?
 * const result = nextThursday(new Date(2020, 2, 22))
 * //=> Thur Mar 26 2020 00:00:00
 */
declare function nextThursday<T extends DateLike>(date: T): T;
//#endregion
//#region src/next-tuesday.d.ts
/**
 * @summary When is the next Tuesday?
 *
 * @description
 * When is the next Tuesday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Tuesday
 *
 * @example
 * // When is the next Tuesday after Mar, 22, 2020?
 * const result = nextTuesday(new Date(2020, 2, 22))
 * //=> Tue Mar 24 2020 00:00:00
 */
declare function nextTuesday(date: Date): Date;
/**
 * @summary When is the next Tuesday?
 *
 * @description
 * When is the next Tuesday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Tuesday
 *
 * @example
 * // When is the next Tuesday after Mar, 22, 2020?
 * const result = nextTuesday(new Date(2020, 2, 22))
 * //=> Tue Mar 24 2020 00:00:00
 */
declare function nextTuesday<T extends DateLike>(date: T): T;
//#endregion
//#region src/next-wednesday.d.ts
/**
 * @summary When is the next Wednesday?
 *
 * @description
 * When is the next Wednesday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Wednesday
 *
 * @example
 * // When is the next Wednesday after Mar, 22, 2020?
 * const result = nextWednesday(new Date(2020, 2, 22))
 * //=> Wed Mar 25 2020 00:00:00
 */
declare function nextWednesday(date: Date): Date;
/**
 * @summary When is the next Wednesday?
 *
 * @description
 * When is the next Wednesday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Wednesday
 *
 * @example
 * // When is the next Wednesday after Mar, 22, 2020?
 * const result = nextWednesday(new Date(2020, 2, 22))
 * //=> Wed Mar 25 2020 00:00:00
 */
declare function nextWednesday<T extends DateLike>(date: T): T;
//#endregion
//#region src/parse-iso.d.ts
/**
 * The {@link parseISO} function options.
 */
interface ParseISOOptions {
  additionalDigits?: 0 | 1 | 2;
}
interface ParseISOTemporalOptions<T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime> extends ParseISOOptions {
  in: new (...args: never[]) => T;
}
type ParseISOZonedDateTimeOptions = ParseISOTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};
/**
 * @summary Parse ISO string.
 *
 * @description
 * Parse the given string in ISO 8601 format.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * Without `options.in`, returns a `Date` in the local time zone (an invalid `Date`, whose time
 * value is `NaN`, if the string cannot be parsed). With `options.in` set to a Temporal class
 * constructor, returns an instance of that class, or `undefined` if the string cannot be parsed.
 *
 * @param string - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
declare function parseISO(string: string, options?: ParseISOOptions): Date;
declare function parseISO(string: string, options: ParseISOTemporalOptions<Temporal.PlainDate>): Temporal.PlainDate | undefined;
declare function parseISO(string: string, options: ParseISOTemporalOptions<Temporal.PlainDateTime>): Temporal.PlainDateTime | undefined;
declare function parseISO(string: string, options: ParseISOZonedDateTimeOptions): Temporal.ZonedDateTime | undefined;
//#endregion
//#region src/parse-json.d.ts
interface ParseJSONTemporalOptions<T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime> {
  in: new (...args: never[]) => T;
}
type ParseJSONZonedDateTimeOptions = ParseJSONTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};
/**
 * @summary Parse a JSON date string.
 *
 * @description
 * Parse a date string produced by `JSON.stringify(date)` — an ISO 8601 string with no `T`/`Z`
 * separator constraints relaxed enough to accept the format JavaScript's `Date#toJSON` produces
 * (e.g. `'2000-03-15T05:20:10.123Z'`), and treats a string with no offset as UTC, unlike
 * {@link parseISO} which treats a no-offset string as local wall-clock time.
 *
 * Without `options.in`, returns a `Date` (an invalid `Date`, whose time value is `NaN`, if the
 * string cannot be parsed). With `options.in` set to a Temporal class constructor, returns an
 * instance of that class, or `undefined` if the string cannot be parsed.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date
 *
 * @example
 * const result = parseJSON('2000-03-15T05:20:10.123Z')
 * //=> Wed Mar 15 2000 05:20:10.123
 */
declare function parseJSON(argument: string): Date;
declare function parseJSON(argument: string, options: ParseJSONTemporalOptions<Temporal.PlainDate>): Temporal.PlainDate | undefined;
declare function parseJSON(argument: string, options: ParseJSONTemporalOptions<Temporal.PlainDateTime>): Temporal.PlainDateTime | undefined;
declare function parseJSON(argument: string, options: ParseJSONZonedDateTimeOptions): Temporal.ZonedDateTime | undefined;
//#endregion
//#region src/previous-day.d.ts
/**
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param date - The date to check
 * @param day - The day of the week
 *
 * @returns The date is the previous day of week
 *
 * @example
 * // When is the previous Monday before Mar, 20, 2020?
 * const result = previousDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 16 2020 00:00:00
 *
 * @example
 * // When is the previous Tuesday before Mar, 21, 2020?
 * const result = previousDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 17 2020 00:00:00
 */
declare function previousDay(date: Date, day: number): Date;
/**
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to check
 * @param day - The day of the week
 *
 * @returns The date is the previous day of week
 *
 * @example
 * // When is the previous Monday before Mar, 20, 2020?
 * const result = previousDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 16 2020 00:00:00
 *
 * @example
 * // When is the previous Tuesday before Mar, 21, 2020?
 * const result = previousDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 17 2020 00:00:00
 */
declare function previousDay<T extends DateLike>(date: T, day: number): T;
//#endregion
//#region src/previous-friday.d.ts
/**
 * @summary When is the previous Friday?
 *
 * @description
 * When is the previous Friday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Friday
 *
 * @example
 * // When is the previous Friday before Jun, 19, 2021?
 * const result = previousFriday(new Date(2021, 5, 19))
 * //=> Fri June 18 2021 00:00:00
 */
declare function previousFriday(date: Date): Date;
/**
 * @summary When is the previous Friday?
 *
 * @description
 * When is the previous Friday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Friday
 *
 * @example
 * // When is the previous Friday before Jun, 19, 2021?
 * const result = previousFriday(new Date(2021, 5, 19))
 * //=> Fri June 18 2021 00:00:00
 */
declare function previousFriday<T extends DateLike>(date: T): T;
//#endregion
//#region src/previous-monday.d.ts
/**
 * @summary When is the previous Monday?
 *
 * @description
 * When is the previous Monday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Monday
 *
 * @example
 * // When is the previous Monday before Jun, 18, 2021?
 * const result = previousMonday(new Date(2021, 5, 18))
 * //=> Mon June 14 2021 00:00:00
 */
declare function previousMonday(date: Date): Date;
/**
 * @summary When is the previous Monday?
 *
 * @description
 * When is the previous Monday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Monday
 *
 * @example
 * // When is the previous Monday before Jun, 18, 2021?
 * const result = previousMonday(new Date(2021, 5, 18))
 * //=> Mon June 14 2021 00:00:00
 */
declare function previousMonday<T extends DateLike>(date: T): T;
//#endregion
//#region src/previous-saturday.d.ts
/**
 * @summary When is the previous Saturday?
 *
 * @description
 * When is the previous Saturday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Saturday
 *
 * @example
 * // When is the previous Saturday before Jun, 20, 2021?
 * const result = previousSaturday(new Date(2021, 5, 20))
 * //=> Sat June 19 2021 00:00:00
 */
declare function previousSaturday(date: Date): Date;
/**
 * @summary When is the previous Saturday?
 *
 * @description
 * When is the previous Saturday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Saturday
 *
 * @example
 * // When is the previous Saturday before Jun, 20, 2021?
 * const result = previousSaturday(new Date(2021, 5, 20))
 * //=> Sat June 19 2021 00:00:00
 */
declare function previousSaturday<T extends DateLike>(date: T): T;
//#endregion
//#region src/previous-sunday.d.ts
/**
 * @summary When is the previous Sunday?
 *
 * @description
 * When is the previous Sunday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Sunday
 *
 * @example
 * // When is the previous Sunday before Jun, 21, 2021?
 * const result = previousSunday(new Date(2021, 5, 21))
 * //=> Sun June 20 2021 00:00:00
 */
declare function previousSunday(date: Date): Date;
/**
 * @summary When is the previous Sunday?
 *
 * @description
 * When is the previous Sunday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Sunday
 *
 * @example
 * // When is the previous Sunday before Jun, 21, 2021?
 * const result = previousSunday(new Date(2021, 5, 21))
 * //=> Sun June 20 2021 00:00:00
 */
declare function previousSunday<T extends DateLike>(date: T): T;
//#endregion
//#region src/previous-thursday.d.ts
/**
 * @summary When is the previous Thursday?
 *
 * @description
 * When is the previous Thursday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Thursday
 *
 * @example
 * // When is the previous Thursday before Jun, 18, 2021?
 * const result = previousThursday(new Date(2021, 5, 18))
 * //=> Thu June 17 2021 00:00:00
 */
declare function previousThursday(date: Date): Date;
/**
 * @summary When is the previous Thursday?
 *
 * @description
 * When is the previous Thursday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Thursday
 *
 * @example
 * // When is the previous Thursday before Jun, 18, 2021?
 * const result = previousThursday(new Date(2021, 5, 18))
 * //=> Thu June 17 2021 00:00:00
 */
declare function previousThursday<T extends DateLike>(date: T): T;
//#endregion
//#region src/previous-tuesday.d.ts
/**
 * @summary When is the previous Tuesday?
 *
 * @description
 * When is the previous Tuesday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Tuesday
 *
 * @example
 * // When is the previous Tuesday before Jun, 18, 2021?
 * const result = previousTuesday(new Date(2021, 5, 18))
 * //=> Tue June 15 2021 00:00:00
 */
declare function previousTuesday(date: Date): Date;
/**
 * @summary When is the previous Tuesday?
 *
 * @description
 * When is the previous Tuesday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Tuesday
 *
 * @example
 * // When is the previous Tuesday before Jun, 18, 2021?
 * const result = previousTuesday(new Date(2021, 5, 18))
 * //=> Tue June 15 2021 00:00:00
 */
declare function previousTuesday<T extends DateLike>(date: T): T;
//#endregion
//#region src/previous-wednesday.d.ts
/**
 * @summary When is the previous Wednesday?
 *
 * @description
 * When is the previous Wednesday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Wednesday
 *
 * @example
 * // When is the previous Wednesday before Jun, 18, 2021?
 * const result = previousWednesday(new Date(2021, 5, 18))
 * //=> Wed June 16 2021 00:00:00
 */
declare function previousWednesday(date: Date): Date;
/**
 * @summary When is the previous Wednesday?
 *
 * @description
 * When is the previous Wednesday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Wednesday
 *
 * @example
 * // When is the previous Wednesday before Jun, 18, 2021?
 * const result = previousWednesday(new Date(2021, 5, 18))
 * //=> Wed June 16 2021 00:00:00
 */
declare function previousWednesday<T extends DateLike>(date: T): T;
//#endregion
//#region src/quarters-to-months.d.ts
/**
 * @summary Convert number of quarters to months.
 *
 * @description
 * Convert a number of quarters to a full number of months.
 *
 * @param quarters - The number of quarters to be converted
 *
 * @returns The number of quarters converted in months
 *
 * @example
 * // Convert 2 quarters to months
 * const result = quartersToMonths(2)
 * //=> 6
 */
declare function quartersToMonths(quarters: number): number;
//#endregion
//#region src/quarters-to-years.d.ts
/**
 * @summary Convert number of quarters to years.
 *
 * @description
 * Convert a number of quarters to a full number of years.
 *
 * @param quarters - The number of quarters to be converted
 *
 * @returns The number of quarters converted in years
 *
 * @example
 * // Convert 8 quarters to years
 * const result = quartersToYears(8)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = quartersToYears(11)
 * //=> 2
 */
declare function quartersToYears(quarters: number): number;
//#endregion
//#region src/round-to-nearest-hours.d.ts
type RoundingMethod = 'ceil' | 'floor' | 'round' | 'trunc';
/**
 * The {@link roundToNearestHours} function options.
 */
interface RoundToNearestHoursOptions {
  nearestTo?: number;
  roundingMethod?: RoundingMethod;
}
/**
 * @summary Rounds the given date to the nearest hour
 *
 * @description
 * Rounds the given date to the nearest hour (or number of hours).
 * Rounds up when the given date is exactly between the nearest round hours.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest hour
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 12 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56))
 * //=> Thu Jul 10 2014 13:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 6 })
 * //=> Thu Jul 10 2014 12:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 8 })
 * //=> Thu Jul 10 2014 16:00:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 1:23:45 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 1, 23, 45), { roundingMethod: 'ceil' })
 * //=> Thu Jul 10 2014 02:00:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:34:56 to nearest 8 hours:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { roundingMethod: 'floor', nearestTo: 8 })
 * //=> Thu Jul 10 2014 08:00:00
 */
declare function roundToNearestHours(date: Date, options?: RoundToNearestHoursOptions): Date;
/**
 * @summary Rounds the given date to the nearest hour
 *
 * @description
 * Rounds the given date to the nearest hour (or number of hours).
 * Rounds up when the given date is exactly between the nearest round hours.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest hour
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 12 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56))
 * //=> Thu Jul 10 2014 13:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 6 })
 * //=> Thu Jul 10 2014 12:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 8 })
 * //=> Thu Jul 10 2014 16:00:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 1:23:45 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 1, 23, 45), { roundingMethod: 'ceil' })
 * //=> Thu Jul 10 2014 02:00:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:34:56 to nearest 8 hours:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { roundingMethod: 'floor', nearestTo: 8 })
 * //=> Thu Jul 10 2014 08:00:00
 */
declare function roundToNearestHours<T extends TimeLike>(date: T, options?: RoundToNearestHoursOptions): T;
//#endregion
//#region src/round-to-nearest-minutes.d.ts
/**
 * The {@link roundToNearestMinutes} function options.
 */
interface RoundToNearestMinutesOptions {
  nearestTo?: number;
  roundingMethod?: RoundingMethod;
}
/**
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest minute
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 30 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * //=> Thu Jul 10 2014 12:15:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
 * //=> Thu Jul 10 2014 12:12:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
 * //=> Thu Jul 10 2014 12:30:00
 */
declare function roundToNearestMinutes(date: Date, options?: RoundToNearestMinutesOptions): Date;
/**
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to round
 * @param options - An object with options
 *
 * @returns The new date rounded to the closest minute
 *
 * @throws `RangeError` if `options.nearestTo` is not between 1 and 30 and `date` is a Temporal value
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * //=> Thu Jul 10 2014 12:15:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
 * //=> Thu Jul 10 2014 12:12:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
 * //=> Thu Jul 10 2014 12:30:00
 */
declare function roundToNearestMinutes<T extends TimeLike>(date: T, options?: RoundToNearestMinutesOptions): T;
//#endregion
//#region src/seconds-to-hours.d.ts
/**
 * @summary Convert seconds to hours.
 *
 * @description
 * Convert a number of seconds to a full number of hours.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in hours
 *
 * @example
 * // Convert 7200 seconds into hours
 * const result = secondsToHours(7200)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToHours(7199)
 * //=> 1
 */
declare function secondsToHours(seconds: number): number;
//#endregion
//#region src/seconds-to-milliseconds.d.ts
/**
 * @summary Convert seconds to milliseconds.
 *
 * @description
 * Convert a number of seconds to a full number of milliseconds.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in milliseconds
 *
 * @example
 * // Convert 2 seconds into milliseconds
 * const result = secondsToMilliseconds(2)
 * //=> 2000
 */
declare function secondsToMilliseconds(seconds: number): number;
//#endregion
//#region src/seconds-to-minutes.d.ts
/**
 * @summary Convert seconds to minutes.
 *
 * @description
 * Convert a number of seconds to a full number of minutes.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in minutes
 *
 * @example
 * // Convert 120 seconds into minutes
 * const result = secondsToMinutes(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToMinutes(119)
 * //=> 1
 */
declare function secondsToMinutes(seconds: number): number;
//#endregion
//#region src/set.d.ts
/**
 * The {@link set} function values.
 */
interface DateValues {
  year?: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}
/**
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets fields on the date from object `values`. A value is not set if it is `undefined`, `null`,
 * or doesn't exist in `values`. Throws a `TypeError` if any of `hours`/`minutes`/`seconds`/
 * `milliseconds` is set and `date` is a `Temporal.PlainDate`, since plain dates have no time
 * component.
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
declare function set(date: Date, values: DateValues): Date;
/**
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets fields on the date from object `values`. A value is not set if it is `undefined`, `null`,
 * or doesn't exist in `values`. Throws a `TypeError` if any of `hours`/`minutes`/`seconds`/
 * `milliseconds` is set and `date` is a `Temporal.PlainDate`, since plain dates have no time
 * component.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
declare function set<T extends DateLike>(date: T, values: DateValues): T;
//#endregion
//#region src/set-date.d.ts
/**
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @param date - The date to be changed
 * @param dayOfMonth - The day of the month of the new date
 *
 * @returns The new date with the day of the month set
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
declare function setDate(date: Date, dayOfMonth: number): Date;
/**
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param dayOfMonth - The day of the month of the new date
 *
 * @returns The new date with the day of the month set
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
declare function setDate<T extends DateLike>(date: T, dayOfMonth: number): T;
//#endregion
//#region src/set-day.d.ts
/**
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function setDay(date: Date, day: number, options?: StartOfWeekOptions): Date;
/**
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function setDay<T extends DateLike>(date: T, day: number, options?: StartOfWeekOptions): T;
//#endregion
//#region src/set-day-of-year.d.ts
/**
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @param date - The date to be changed
 * @param dayOfYear - The day of the year of the new date
 *
 * @returns The new date with the day of the year set
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * const result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
declare function setDayOfYear(date: Date, dayOfYear: number): Date;
/**
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param dayOfYear - The day of the year of the new date
 *
 * @returns The new date with the day of the year set
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * const result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
declare function setDayOfYear<T extends DateLike>(date: T, dayOfYear: number): T;
//#endregion
//#region src/set-default-options.d.ts
/**
 * @summary Set default options.
 *
 * @description
 * Sets the defaults for `options.weekStartsOn` and `options.firstWeekContainsDate` arguments for
 * all functions.
 *
 * @param options - An object with options
 *
 * @example
 * // Start of the week for 2 September 2014:
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Start of the week for 2 September 2014,
 * // when we set that week starts on Monday by default:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Mon Sep 01 2014 00:00:00
 *
 * @example
 * // Manually set options take priority over default options:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2), { weekStartsOn: 0 })
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Remove the option by setting it to `undefined`:
 * setDefaultOptions({ weekStartsOn: 1 })
 * setDefaultOptions({ weekStartsOn: undefined })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 */
declare function setDefaultOptions(options: SetDefaultOptions): void;
//#endregion
//#region src/set-hours.d.ts
/**
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @param date - The date to be changed
 * @param hours - The hours of the new date
 *
 * @returns The new date with the hours set
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
declare function setHours(date: Date, hours: number): Date;
/**
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param hours - The hours of the new date
 *
 * @returns The new date with the hours set
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
declare function setHours<T extends TimeLike>(date: T, hours: number): T;
//#endregion
//#region src/set-iso-day.d.ts
/**
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday, etc.
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function setISODay(date: Date, day: number): Date;
/**
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday, etc.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
declare function setISODay<T extends DateLike>(date: T, day: number): T;
//#endregion
//#region src/set-iso-week.d.ts
/**
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
declare function setISOWeek(date: Date, week: number): Date;
/**
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
declare function setISOWeek<T extends DateLike>(date: T, week: number): T;
//#endregion
//#region src/set-iso-week-year.d.ts
/**
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date, saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param weekYear - The ISO week-numbering year of the new date
 *
 * @returns The new date with the ISO week-numbering year set
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
declare function setISOWeekYear(date: Date, weekYear: number): Date;
/**
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date, saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param weekYear - The ISO week-numbering year of the new date
 *
 * @returns The new date with the ISO week-numbering year set
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
declare function setISOWeekYear<T extends DateLike>(date: T, weekYear: number): T;
//#endregion
//#region src/set-milliseconds.d.ts
/**
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @param date - The date to be changed
 * @param milliseconds - The milliseconds of the new date
 *
 * @returns The new date with the milliseconds set
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
declare function setMilliseconds(date: Date, milliseconds: number): Date;
/**
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param milliseconds - The milliseconds of the new date
 *
 * @returns The new date with the milliseconds set
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
declare function setMilliseconds<T extends TimeLike>(date: T, milliseconds: number): T;
//#endregion
//#region src/set-minutes.d.ts
/**
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @param date - The date to be changed
 * @param minutes - The minutes of the new date
 *
 * @returns The new date with the minutes set
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
declare function setMinutes(date: Date, minutes: number): Date;
/**
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param minutes - The minutes of the new date
 *
 * @returns The new date with the minutes set
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
declare function setMinutes<T extends TimeLike>(date: T, minutes: number): T;
//#endregion
//#region src/set-month.d.ts
/**
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
declare function setMonth(date: Date, month: number): Date;
/**
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
declare function setMonth<T extends DateLike>(date: T, month: number): T;
//#endregion
//#region src/set-quarter.d.ts
/**
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @param date - The date to be changed
 * @param quarter - The quarter of the new date
 *
 * @returns The new date with the quarter set
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
declare function setQuarter(date: Date, quarter: number): Date;
/**
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param quarter - The quarter of the new date
 *
 * @returns The new date with the quarter set
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
declare function setQuarter<T extends DateLike>(date: T, quarter: number): T;
//#endregion
//#region src/set-seconds.d.ts
/**
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
declare function setSeconds(date: Date, seconds: number): Date;
/**
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
declare function setSeconds<T extends TimeLike>(date: T, seconds: number): T;
//#endregion
//#region src/set-week.d.ts
/**
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The date to be changed
 * @param week - The week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week set
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * const result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * const result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
declare function setWeek(date: Date, week: number, options?: LocalWeekOptions): Date;
/**
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param week - The week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week set
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * const result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * const result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
declare function setWeek<T extends DateLike>(date: T, week: number, options?: LocalWeekOptions): T;
//#endregion
//#region src/set-week-year.d.ts
/**
 * @summary Set the local week-numbering year to the given date.
 *
 * @description
 * Set the local week-numbering year to the given date, saving the week number and the weekday
 * number. The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The date to be changed
 * @param weekYear - The local week-numbering year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week-numbering year set
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010 with default options:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004)
 * //=> Sat Jan 03 2004 00:00:00
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010,
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sat Jan 01 2005 00:00:00
 */
declare function setWeekYear(date: Date, weekYear: number, options?: LocalWeekOptions): Date;
/**
 * @summary Set the local week-numbering year to the given date.
 *
 * @description
 * Set the local week-numbering year to the given date, saving the week number and the weekday
 * number. The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param weekYear - The local week-numbering year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week-numbering year set
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010 with default options:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004)
 * //=> Sat Jan 03 2004 00:00:00
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010,
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sat Jan 01 2005 00:00:00
 */
declare function setWeekYear<T extends DateLike>(date: T, weekYear: number, options?: LocalWeekOptions): T;
//#endregion
//#region src/set-year.d.ts
/**
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
declare function setYear(date: Date, year: number): Date;
/**
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
declare function setYear<T extends DateLike>(date: T, year: number): T;
//#endregion
//#region src/slice-interval.d.ts
/**
 * @summary Get the envelope of a range of duration-sized chunks of an interval.
 *
 * @description
 * Split `interval` into `duration`-sized chunks (as {@link splitIntervalByDuration} would), then
 * take the envelope (earliest start to latest end) of the chunks selected by `startIndex` and
 * `endIndex`, using the same semantics as `Array#slice`: negative indices count from the end,
 * `endIndex` defaults to the end of the chunk list, and an empty selection (e.g. an out-of-range
 * `startIndex`) returns `null`.
 *
 * @param interval - The interval to chunk and slice
 * @param duration - The size of each chunk
 * @param startIndex - The index of the first chunk to include (inclusive); negative counts from
 *   the end, as in `Array#slice`
 * @param endIndex - The index of the last chunk to include (exclusive); negative counts from the
 *   end, as in `Array#slice`. Defaults to the end of the chunk list.
 *
 * @returns The envelope of the selected chunks, or `null` if the selection is empty
 *
 * @throws `RangeError` if `duration` doesn't represent a positive amount of time
 *
 * @example
 * // 10-day interval chunked into 3-day pieces: [0,3), [3,6), [6,9), [9,10) - take chunks 0 and 1.
 * sliceInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 },
 *   0,
 *   2
 * )
 * //=> { start: Wed Jan 01 2014, end: Sat Jan 07 2014 }
 *
 * @example
 * // Negative indices count from the end, as in Array#slice.
 * sliceInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 },
 *   -1
 * )
 * //=> { start: Sat Jan 07 2014, end: Wed Jan 10 2014 }
 */
declare function sliceInterval(interval: Interval<Date>, duration: Duration, startIndex: number, endIndex?: number): Interval<Date> | null;
/**
 * @summary Get the envelope of a range of duration-sized chunks of an interval.
 *
 * @description
 * Split `interval` into `duration`-sized chunks (as {@link splitIntervalByDuration} would), then
 * take the envelope (earliest start to latest end) of the chunks selected by `startIndex` and
 * `endIndex`, using the same semantics as `Array#slice`: negative indices count from the end,
 * `endIndex` defaults to the end of the chunk list, and an empty selection (e.g. an out-of-range
 * `startIndex`) returns `null`.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result has the same concrete type.
 *
 * @param interval - The interval to chunk and slice
 * @param duration - The size of each chunk
 * @param startIndex - The index of the first chunk to include (inclusive); negative counts from
 *   the end, as in `Array#slice`
 * @param endIndex - The index of the last chunk to include (exclusive); negative counts from the
 *   end, as in `Array#slice`. Defaults to the end of the chunk list.
 *
 * @returns The envelope of the selected chunks, or `null` if the selection is empty
 *
 * @throws `RangeError` if `duration` doesn't represent a positive amount of time
 *
 * @example
 * // 10-day interval chunked into 3-day pieces: [0,3), [3,6), [6,9), [9,10) - take chunks 0 and 1.
 * sliceInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 },
 *   0,
 *   2
 * )
 * //=> { start: Wed Jan 01 2014, end: Sat Jan 07 2014 }
 *
 * @example
 * // Negative indices count from the end, as in Array#slice.
 * sliceInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 },
 *   -1
 * )
 * //=> { start: Sat Jan 07 2014, end: Wed Jan 10 2014 }
 */
declare function sliceInterval<T extends DateLike>(interval: Interval<T>, duration: Duration, startIndex: number, endIndex?: number): Interval<T> | null;
//#endregion
//#region src/split-interval-by-duration.d.ts
/**
 * @summary Split an interval into consecutive chunks of the given duration.
 *
 * @description
 * Split an interval into consecutive chunks of the given duration, walking forward from `start`.
 * The final chunk is truncated to `end` if the interval's length isn't an exact multiple of
 * `duration`. Returns an empty array if `interval.start` equals `interval.end`.
 *
 * @param interval - The interval to split
 * @param duration - The size of each chunk
 *
 * @returns The interval split into consecutive `duration`-sized chunks
 *
 * @throws `RangeError` if `duration` doesn't represent a positive amount of time
 *
 * @example
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Fri Jan 10 2014 }
 * // ]
 *
 * @example
 * // The final chunk is truncated when the length isn't an exact multiple of duration.
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 8) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Wed Jan 08 2014 }
 * // ]
 */
declare function splitIntervalByDuration(interval: Interval<Date>, duration: Duration): Interval<Date>[];
/**
 * @summary Split an interval into consecutive chunks of the given duration.
 *
 * @description
 * Split an interval into consecutive chunks of the given duration, walking forward from `start`.
 * The final chunk is truncated to `end` if the interval's length isn't an exact multiple of
 * `duration`. Returns an empty array if `interval.start` equals `interval.end`.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `interval`; the result has the same concrete type.
 *
 * @param interval - The interval to split
 * @param duration - The size of each chunk
 *
 * @returns The interval split into consecutive `duration`-sized chunks
 *
 * @throws `RangeError` if `duration` doesn't represent a positive amount of time
 *
 * @example
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Fri Jan 10 2014 }
 * // ]
 *
 * @example
 * // The final chunk is truncated when the length isn't an exact multiple of duration.
 * splitIntervalByDuration(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 8) },
 *   { days: 3 }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Sat Jan 04 2014 },
 * //   { start: Sat Jan 04 2014, end: Tue Jan 07 2014 },
 * //   { start: Tue Jan 07 2014, end: Wed Jan 08 2014 }
 * // ]
 */
declare function splitIntervalByDuration<T extends DateLike>(interval: Interval<T>, duration: Duration): Interval<T>[];
//#endregion
//#region src/start-of-day.d.ts
/**
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
declare function startOfDay(date: Date): Date;
/**
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
declare function startOfDay<T extends TimeLike>(date: T): T;
//#endregion
//#region src/start-of-decade.d.ts
/**
 * @summary Return the start of a decade for the given date.
 *
 * @description
 * Return the start of a decade for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a decade
 *
 * @example
 * // The start of a decade for 21 October 2015 00:00:00:
 * const result = startOfDecade(new Date(2015, 9, 21, 00, 00, 00))
 * //=> Jan 01 2010 00:00:00
 */
declare function startOfDecade(date: Date): Date;
/**
 * @summary Return the start of a decade for the given date.
 *
 * @description
 * Return the start of a decade for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a decade
 *
 * @example
 * // The start of a decade for 21 October 2015 00:00:00:
 * const result = startOfDecade(new Date(2015, 9, 21, 00, 00, 00))
 * //=> Jan 01 2010 00:00:00
 */
declare function startOfDecade<T extends DateLike>(date: T): T;
//#endregion
//#region src/start-of-hour.d.ts
/**
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
declare function startOfHour(date: Date): Date;
/**
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
declare function startOfHour<T extends TimeLike>(date: T): T;
//#endregion
//#region src/start-of-iso-week.d.ts
/**
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfISOWeek(date: Date): Date;
/**
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfISOWeek<T extends DateLike>(date: T): T;
//#endregion
//#region src/start-of-iso-week-year.d.ts
/**
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
declare function startOfISOWeekYear(date: Date): Date;
/**
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year, which always starts 3 days before the year's
 * first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
declare function startOfISOWeekYear<T extends DateLike>(date: T): T;
//#endregion
//#region src/start-of-minute.d.ts
/**
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
declare function startOfMinute(date: Date): Date;
/**
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
declare function startOfMinute<T extends TimeLike>(date: T): T;
//#endregion
//#region src/start-of-month.d.ts
/**
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfMonth(date: Date): Date;
/**
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
declare function startOfMonth<T extends DateLike>(date: T): T;
//#endregion
//#region src/start-of-quarter.d.ts
/**
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
declare function startOfQuarter(date: Date): Date;
/**
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
declare function startOfQuarter<T extends DateLike>(date: T): T;
//#endregion
//#region src/start-of-second.d.ts
/**
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
declare function startOfSecond(date: Date): Date;
/**
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 *
 * @typeParam T - A {@link TimeLike} type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
declare function startOfSecond<T extends TimeLike>(date: T): T;
//#endregion
//#region src/start-of-today.d.ts
/**
 * @summary Return the start of today.
 *
 * @description
 * Return the start of today.
 *
 * @returns The start of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
declare function startOfToday(): Date;
//#endregion
//#region src/start-of-today-plain-date-time.d.ts
/**
 * @summary Return the start of today as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the start of today (midnight) as a `Temporal.PlainDateTime`. Per the UTC rule, "today"
 * is resolved using UTC.
 *
 * @returns Midnight UTC today, as a `Temporal.PlainDateTime`
 */
declare function startOfTodayPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/start-of-today-zoned-date-time.d.ts
/**
 * @summary Return the start of today as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the start of today (midnight) as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns Midnight today in `timeZone`, as a `Temporal.ZonedDateTime`
 */
declare function startOfTodayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/start-of-tomorrow.d.ts
/**
 * @summary Return the start of tomorrow.
 *
 * @description
 * Return the start of tomorrow.
 *
 * @returns The start of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
declare function startOfTomorrow(): Date;
//#endregion
//#region src/start-of-tomorrow-plain-date-time.d.ts
/**
 * @summary Return the start of tomorrow as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the start of tomorrow (midnight) as a `Temporal.PlainDateTime`. Per the UTC rule,
 * "today" is resolved using UTC before adding one day.
 *
 * @returns Midnight UTC tomorrow, as a `Temporal.PlainDateTime`
 */
declare function startOfTomorrowPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/start-of-tomorrow-zoned-date-time.d.ts
/**
 * @summary Return the start of tomorrow as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the start of tomorrow (midnight) as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns Midnight tomorrow in `timeZone`, as a `Temporal.ZonedDateTime`
 */
declare function startOfTomorrowZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/start-of-week-year.d.ts
/**
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
declare function startOfWeekYear(date: Date, options?: LocalWeekOptions): Date;
/**
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
declare function startOfWeekYear<T extends DateLike>(date: T, options?: LocalWeekOptions): T;
//#endregion
//#region src/start-of-year.d.ts
/**
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
declare function startOfYear(date: Date): Date;
/**
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
declare function startOfYear<T extends DateLike>(date: T): T;
//#endregion
//#region src/start-of-yesterday.d.ts
/**
 * @summary Return the start of yesterday.
 *
 * @description
 * Return the start of yesterday.
 *
 * @returns The start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
declare function startOfYesterday(): Date;
//#endregion
//#region src/start-of-yesterday-plain-date-time.d.ts
/**
 * @summary Return the start of yesterday as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return the start of yesterday (midnight) as a `Temporal.PlainDateTime`. Per the UTC rule,
 * "today" is resolved using UTC before subtracting one day.
 *
 * @returns Midnight UTC yesterday, as a `Temporal.PlainDateTime`
 */
declare function startOfYesterdayPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/start-of-yesterday-zoned-date-time.d.ts
/**
 * @summary Return the start of yesterday as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the start of yesterday (midnight) as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns Midnight yesterday in `timeZone`, as a `Temporal.ZonedDateTime`
 */
declare function startOfYesterdayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/sub.d.ts
/**
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
declare function sub(date: Date, duration: Duration): Date;
/**
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * Throws a `TypeError` if `duration` has any of `hours`/`minutes`/`seconds` set and `date` is a
 * `Temporal.PlainDate`, since plain dates have no time component.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
declare function sub<T extends DateLike>(date: T, duration: Duration): T;
//#endregion
//#region src/sub-business-days.d.ts
/**
 * @summary Subtract the specified number of business days (mon - fri) from the given date.
 *
 * @description
 * Subtract the specified number of business days (mon - fri) from the given date, ignoring weekends.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be subtracted.
 *
 * @returns The new date with the business days subtracted
 *
 * @example
 * // Subtract 10 business days from 1 September 2014:
 * const result = subBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
 */
declare function subBusinessDays(date: Date, amount: number): Date;
/**
 * @summary Subtract the specified number of business days (mon - fri) from the given date.
 *
 * @description
 * Subtract the specified number of business days (mon - fri) from the given date, ignoring weekends.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be subtracted.
 *
 * @returns The new date with the business days subtracted
 *
 * @example
 * // Subtract 10 business days from 1 September 2014:
 * const result = subBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
 */
declare function subBusinessDays<T extends DateLike>(date: T, amount: number): T;
//#endregion
//#region src/sub-days.d.ts
/**
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
declare const subDays: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/sub-hours.d.ts
/**
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be subtracted.
 *
 * @returns The new date with the hours subtracted
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * const result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
declare const subHours: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/sub-iso-week-years.d.ts
/**
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be subtracted.
 *
 * @returns The new date with the ISO week-numbering years subtracted
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * const result = subISOWeekYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
declare function subISOWeekYears(date: Date, amount: number): Date;
/**
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be subtracted.
 *
 * @returns The new date with the ISO week-numbering years subtracted
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * const result = subISOWeekYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
declare function subISOWeekYears<T extends DateLike>(date: T, amount: number): T;
//#endregion
//#region src/sub-milliseconds.d.ts
/**
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be subtracted.
 *
 * @returns The new date with the milliseconds subtracted
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.750:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 750), 750)
 * //=> Thu Jul 10 2014 12:45:30.000
 */
declare const subMilliseconds: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/sub-minutes.d.ts
/**
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be subtracted.
 *
 * @returns The new date with the minutes subtracted
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
declare const subMinutes: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/sub-months.d.ts
/**
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be subtracted.
 *
 * @returns The new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
declare const subMonths: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/sub-quarters.d.ts
/**
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be subtracted.
 *
 * @returns The new date with the quarters subtracted
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * const result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
declare function subQuarters(date: Date, amount: number): Date;
/**
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be subtracted.
 *
 * @returns The new date with the quarters subtracted
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * const result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
declare function subQuarters<T extends DateLike>(date: T, amount: number): T;
//#endregion
//#region src/sub-seconds.d.ts
/**
 * @summary Subtract the specified number of seconds from the given date.
 *
 * @description
 * Subtract the specified number of seconds from the given date.
 *
 * @typeParam T - A `TimeLike` type (`Temporal.PlainDateTime` or `Temporal.ZonedDateTime`).
 * Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be subtracted.
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:30:
 * const result = subSeconds(new Date(2014, 6, 10, 12, 45, 30), 30)
 * //=> Thu Jul 10 2014 12:45:00
 */
declare const subSeconds: {
  (date: Date, amount: number): Date;
  <T extends TimeLike>(date: T, amount: number): T;
};
//#endregion
//#region src/subtract-interval.d.ts
/**
 * @summary Get the parts of an interval not covered by another interval.
 *
 * @description
 * Get the parts of `intervalLeft` not covered by `intervalRight`. Returns an empty array if
 * `intervalRight` fully covers `intervalLeft`, an array with one interval if `intervalRight`
 * doesn't overlap `intervalLeft` at all (the original interval, unchanged) or only overlaps one
 * end of it, or an array with two intervals if `intervalRight` is fully contained within
 * `intervalLeft` (splitting it into a "before" and "after" part).
 *
 * @param intervalLeft - The interval to subtract from
 * @param intervalRight - The interval to subtract
 *
 * @returns The parts of `intervalLeft` not covered by `intervalRight`
 *
 * @example
 * // intervalRight fully contained within intervalLeft: splits into two parts.
 * subtractInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Fri Jan 10 2014 },
 * //   { start: Mon Jan 20 2014, end: Fri Jan 31 2014 }
 * // ]
 *
 * @example
 * // intervalRight fully covers intervalLeft: nothing remains.
 * subtractInterval(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) }
 * )
 * //=> []
 */
declare function subtractInterval(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): Interval<Date>[];
/**
 * @summary Get the parts of an interval not covered by another interval.
 *
 * @description
 * Get the parts of `intervalLeft` not covered by `intervalRight`. Returns an empty array if
 * `intervalRight` fully covers `intervalLeft`, an array with one interval if `intervalRight`
 * doesn't overlap `intervalLeft` at all (the original interval, unchanged) or only overlaps one
 * end of it, or an array with two intervals if `intervalRight` is fully contained within
 * `intervalLeft` (splitting it into a "before" and "after" part).
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The interval to subtract from
 * @param intervalRight - The interval to subtract
 *
 * @returns The parts of `intervalLeft` not covered by `intervalRight`
 *
 * @example
 * // intervalRight fully contained within intervalLeft: splits into two parts.
 * subtractInterval(
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) },
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 * )
 * //=> [
 * //   { start: Wed Jan 01 2014, end: Fri Jan 10 2014 },
 * //   { start: Mon Jan 20 2014, end: Fri Jan 31 2014 }
 * // ]
 *
 * @example
 * // intervalRight fully covers intervalLeft: nothing remains.
 * subtractInterval(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) }
 * )
 * //=> []
 */
declare function subtractInterval<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): Interval<T>[];
//#endregion
//#region src/sub-weeks.d.ts
/**
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be subtracted.
 *
 * @returns The new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
declare const subWeeks: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/sub-years.d.ts
/**
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @typeParam T - A `DateLike` type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be subtracted.
 *
 * @returns The new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
declare const subYears: {
  (date: Date, amount: number): Date;
  <T extends DateLike>(date: T, amount: number): T;
};
//#endregion
//#region src/timezone-id.d.ts
declare const timeZoneIds: readonly ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmera", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/La_Rioja", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Buenos_Aires", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Catamarca", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chihuahua", "America/Ciudad_Juarez", "America/Coral_Harbour", "America/Cordoba", "America/Costa_Rica", "America/Coyhaique", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Fort_Nelson", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Indianapolis", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Jujuy", "America/Juneau", "America/Kentucky/Monticello", "America/Kralendijk", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Louisville", "America/Lower_Princes", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Mendoza", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Ojinaga", "America/Panama", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Velho", "America/Puerto_Rico", "America/Punta_Arenas", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok", "Arctic/Longyearbyen", "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Atyrau", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Calcutta", "Asia/Chita", "Asia/Colombo", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Katmandu", "Asia/Khandyga", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Rangoon", "Asia/Riyadh", "Asia/Saigon", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ulaanbaatar", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yekaterinburg", "Asia/Yerevan", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faeroe", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/Perth", "Australia/Sydney", "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Kirov", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Saratov", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Ulyanovsk", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zurich", "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", "Indian/Reunion", "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Ponape", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Truk", "Pacific/Wake", "Pacific/Wallis"];
/**
 * @summary A valid IANA time zone identifier (e.g. `'America/New_York'`, `'UTC'`).
 *
 * @description
 * A valid IANA time zone identifier, as a string literal union of the 418 zone names known at
 * the time this list was generated (see the comment above `timeZoneIds` for how/when to
 * regenerate it). Useful for `Temporal.ZonedDateTime`-producing functions' `timeZone` parameter
 * when you want autocomplete and a compile-time check against typos, instead of accepting any
 * `string`.
 *
 * This is intentionally a separate, opt-in type — every `timeZone: string` parameter elsewhere
 * in this library still accepts a plain `string`, so passing a dynamically-loaded or
 * runtime-validated zone name (not statically known at the call site) keeps working without a
 * cast.
 */
type TimeZoneId = (typeof timeZoneIds)[number];
//#endregion
//#region src/to-date.d.ts
/**
 * The {@link toDate} function options.
 */
interface ToDateOptions {
  /**
   * The IANA time zone identifier to resolve string input in, when the string has no offset of
   * its own. Matches `date-fns-tz`'s `toDate` `options.timeZone`.
   */
  timeZone?: string;
}
/**
 * @summary Convert the given argument to an instance of `Date`.
 *
 * @description
 * Convert the given argument to an instance of `Date`.
 *
 * If the argument is an instance of `Date`, the function returns its clone.
 *
 * If the argument is a `Temporal.PlainDate` or `Temporal.PlainDateTime`, its wall-clock fields
 * (with midnight assumed for `PlainDate`) are read as local time, matching this library's other
 * `Date`-producing conversions. If the argument is a `Temporal.ZonedDateTime`, the returned `Date`
 * represents the same instant (`argument.epochMilliseconds`), not its wall-clock fields
 * reinterpreted as local time.
 *
 * If the argument is a number, it is passed directly to the `Date` constructor (treated as a
 * timestamp).
 *
 * If the argument is a string and `options.timeZone` is not given, it is passed directly to the
 * `Date` constructor. If `options.timeZone` is given, the string is parsed as ISO 8601 (complete
 * or partial) and resolved as the local time in that time zone — unless the string itself
 * carries an offset, in which case the offset wins and `options.timeZone` is ignored, matching
 * `date-fns-tz`'s `toDate`.
 *
 * If the argument is none of the above, the function returns an invalid `Date` (whose time
 * value is `NaN`).
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The converted date
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse a string with no offset as local time in a time zone:
 * const result = toDate('2014-06-25T10:00:00', { timeZone: 'America/Los_Angeles' })
 * //=> 2014-06-25T17:00:00.000Z
 */
declare function toDate(argument: unknown, options?: ToDateOptions): Date;
//#endregion
//#region src/to-plain-date.d.ts
/**
 * @summary Convert the given value to a `Temporal.PlainDate`.
 *
 * @description
 * Convert the given value to a `Temporal.PlainDate`, dropping any time-of-day/timezone
 * information it carries. Per the UTC rule, a `Date`'s local calendar date is used; a
 * `Temporal.ZonedDateTime`'s calendar date in its own timezone is used.
 *
 * @param value - The value to convert
 *
 * @returns The value's calendar date
 */
declare function toPlainDate(value: Date | DateLike): Temporal.PlainDate;
//#endregion
//#region src/to-plain-date-time.d.ts
/**
 * @summary Convert the given value to a `Temporal.PlainDateTime`.
 *
 * @description
 * Convert the given value to a `Temporal.PlainDateTime`, dropping any timezone information it
 * carries. Per the UTC rule, a `Date`'s fields are read as UTC; a `Temporal.ZonedDateTime`'s
 * fields in its own timezone are used; a `Temporal.PlainDate` gets a midnight time-of-day.
 *
 * @param value - The value to convert
 *
 * @returns The value's date and time, with no timezone
 */
declare function toPlainDateTime(value: Date | DateLike): Temporal.PlainDateTime;
//#endregion
//#region src/to-zoned-date-time.d.ts
/**
 * @summary Convert the given value to a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @description
 * Convert the given value to a `Temporal.ZonedDateTime` in the given timezone. A `Date` or
 * `Temporal.PlainDate`/`Temporal.PlainDateTime` is interpreted as that timezone's wall-clock
 * time; an existing `Temporal.ZonedDateTime` is re-zoned (its instant is preserved, but its
 * wall-clock fields shift to the new timezone).
 *
 * @param value - The value to convert
 * @param timeZone - The IANA timezone identifier to attach
 *
 * @returns The value as a `Temporal.ZonedDateTime` in `timeZone`
 */
declare function toZonedDateTime(value: Date | DateLike, timeZone: string): Temporal.ZonedDateTime;
//#endregion
//#region src/to-zoned-time.d.ts
/**
 * @summary Get a `Date` whose fields represent the local time in the given time zone.
 *
 * @description
 * Get a `Date` instance whose wall-clock fields (year/month/day/hour/minute/second/millisecond,
 * read via the `Date` object's LOCAL getters, e.g. `getFullYear()`/`getHours()`) represent the
 * local time in `timeZone` of the given date's real instant. In other words, when the returned
 * `Date` is formatted (with any function that reads its local fields), it shows the equivalent
 * wall-clock time in `timeZone`, regardless of the system's own time zone.
 *
 * Mirrors `date-fns-tz`'s `toZonedTime`, built on `Temporal.ZonedDateTime` for the
 * instant-to-time-zone resolution instead of `date-fns-tz`'s own hand-rolled offset parsing.
 *
 * @param date - The date with the relevant real instant
 * @param timeZone - The IANA time zone identifier to get local time for (e.g.
 *   `'America/New_York'`)
 *
 * @returns A `Date` whose local fields represent the wall-clock time in `timeZone`
 *
 * @example
 * // In June, 10am UTC is 6am in New York (-04:00):
 * const result = toZonedTime(new Date('2014-06-25T10:00:00.000Z'), 'America/New_York')
 * //=> Jun 25 2014 06:00:00 (in the system's own time zone fields)
 */
declare function toZonedTime(date: Date | DateLike, timeZone: string): Date;
//#endregion
//#region src/today-plain-date.d.ts
/**
 * @summary Return today's date as a `Temporal.PlainDate`.
 *
 * @description
 * Return today's date as a `Temporal.PlainDate`, using the system's current timezone to
 * determine the calendar date.
 *
 * @returns Today, as a `Temporal.PlainDate`
 *
 * @example
 * // If today is 6 October 2014:
 * const result = todayPlainDate()
 * //=> PlainDate 2014-10-06
 */
declare function todayPlainDate(): Temporal.PlainDate;
//#endregion
//#region src/today-plain-date-time.d.ts
/**
 * @summary Return today's date at midnight as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return today's date at midnight as a `Temporal.PlainDateTime`. Per the UTC rule, since
 * `Temporal.PlainDateTime` has no timezone, "today" is resolved using UTC, not the system's
 * local timezone.
 *
 * @returns Today at midnight UTC, as a `Temporal.PlainDateTime`
 */
declare function todayPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/today-zoned-date-time.d.ts
/**
 * @summary Return the current moment as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the current moment as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The current `Temporal.ZonedDateTime` in `timeZone`
 */
declare function todayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/tomorrow-plain-date.d.ts
/**
 * @summary Return tomorrow's date as a `Temporal.PlainDate`.
 *
 * @description
 * Return tomorrow's date as a `Temporal.PlainDate`, using the system's current timezone to
 * determine today's calendar date before adding one day.
 *
 * @returns Tomorrow, as a `Temporal.PlainDate`
 */
declare function tomorrowPlainDate(): Temporal.PlainDate;
//#endregion
//#region src/tomorrow-plain-date-time.d.ts
/**
 * @summary Return tomorrow's date at midnight as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return tomorrow's date at midnight as a `Temporal.PlainDateTime`. Per the UTC rule, "today" is
 * resolved using UTC before adding one day.
 *
 * @returns Tomorrow at midnight UTC, as a `Temporal.PlainDateTime`
 */
declare function tomorrowPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/tomorrow-zoned-date-time.d.ts
/**
 * @summary Return this time tomorrow as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return this time tomorrow as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns This time tomorrow, as a `Temporal.ZonedDateTime` in `timeZone`
 */
declare function tomorrowZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
//#region src/union-intervals.d.ts
/**
 * @summary Get the envelope spanning two intervals (the earliest start to the latest end).
 *
 * @description
 * Get the envelope spanning two intervals: an interval from the earliest of the two `start`s to
 * the latest of the two `end`s. Unlike {@link intersectIntervals}, this is always defined, even
 * when the two intervals don't overlap or aren't adjacent — in that case the result also spans
 * the gap between them, which is the standard definition of an interval union/envelope as used by
 * other Temporal-based libraries.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The envelope interval spanning both `intervalLeft` and `intervalRight`
 *
 * @example
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 *
 * @example
 * // Non-overlapping intervals: the result also spans the gap between them.
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 12) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 */
declare function unionIntervals(intervalLeft: Interval<Date>, intervalRight: Interval<Date>): Interval<Date>;
/**
 * @summary Get the envelope spanning two intervals (the earliest start to the latest end).
 *
 * @description
 * Get the envelope spanning two intervals: an interval from the earliest of the two `start`s to
 * the latest of the two `end`s. Unlike {@link intersectIntervals}, this is always defined, even
 * when the two intervals don't overlap or aren't adjacent — in that case the result also spans
 * the gap between them, which is the standard definition of an interval union/envelope as used by
 * other Temporal-based libraries.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The first interval
 * @param intervalRight - The second interval
 *
 * @returns The envelope interval spanning both `intervalLeft` and `intervalRight`
 *
 * @example
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 *
 * @example
 * // Non-overlapping intervals: the result also spans the gap between them.
 * unionIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 12) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) }
 * )
 * //=> { start: Fri Jan 10 2014, end: Fri Jan 24 2014 }
 */
declare function unionIntervals<T extends DateLike>(intervalLeft: Interval<T>, intervalRight: Interval<T>): Interval<T>;
//#endregion
//#region src/weeks-to-days.d.ts
/**
 * @summary Convert weeks to days.
 *
 * @description
 * Convert a number of weeks to a full number of days.
 *
 * @param weeks - The number of weeks to be converted
 *
 * @returns The number of weeks converted in days
 *
 * @example
 * // Convert 2 weeks into days
 * const result = weeksToDays(2)
 * //=> 14
 */
declare function weeksToDays(weeks: number): number;
//#endregion
//#region src/years-to-days.d.ts
/**
 * @summary Convert years to days.
 *
 * @description
 * Convert a number of years to a full number of days.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in days
 *
 * @example
 * // Convert 2 years into days
 * const result = yearsToDays(2)
 * //=> 730
 */
declare function yearsToDays(years: number): number;
//#endregion
//#region src/years-to-months.d.ts
/**
 * @summary Convert years to months.
 *
 * @description
 * Convert a number of years to a full number of months.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in months
 *
 * @example
 * // Convert 2 years into months
 * const result = yearsToMonths(2)
 * //=> 24
 */
declare function yearsToMonths(years: number): number;
//#endregion
//#region src/years-to-quarters.d.ts
/**
 * @summary Convert years to quarters.
 *
 * @description
 * Convert a number of years to a full number of quarters.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in quarters
 *
 * @example
 * // Convert 2 years to quarters
 * const result = yearsToQuarters(2)
 * //=> 8
 */
declare function yearsToQuarters(years: number): number;
//#endregion
//#region src/yesterday-plain-date.d.ts
/**
 * @summary Return yesterday's date as a `Temporal.PlainDate`.
 *
 * @description
 * Return yesterday's date as a `Temporal.PlainDate`, using the system's current timezone to
 * determine today's calendar date before subtracting one day.
 *
 * @returns Yesterday, as a `Temporal.PlainDate`
 */
declare function yesterdayPlainDate(): Temporal.PlainDate;
//#endregion
//#region src/yesterday-plain-date-time.d.ts
/**
 * @summary Return yesterday's date at midnight as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return yesterday's date at midnight as a `Temporal.PlainDateTime`. Per the UTC rule, "today"
 * is resolved using UTC before subtracting one day.
 *
 * @returns Yesterday at midnight UTC, as a `Temporal.PlainDateTime`
 */
declare function yesterdayPlainDateTime(): Temporal.PlainDateTime;
//#endregion
//#region src/yesterday-zoned-date-time.d.ts
/**
 * @summary Return this time yesterday as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return this time yesterday as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns This time yesterday, as a `Temporal.ZonedDateTime` in `timeZone`
 */
declare function yesterdayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
export { type AreIntervalsOverlappingOptions, type DateLike, type DateValues, type DefaultOptions, type Duration, type EachOfIntervalOptions, type EachWeekOfIntervalOptions, type FormatDistanceOptions, type FormatDistanceStrictOptions, type FormatDistanceStrictRoundingMethod, type FormatDistanceStrictUnit, type FormatDurationOptions, type FormatDurationUnit, type FormatISO9075Options, type FormatISOOptions, type FormatOptions, type FormatRFC3339Options, type FormatRelativeOptions, type GetWeekOptions, type GetWeekYearOptions, type ISODuration, type Interval, type IntervalOptions, type IntlFormatDistanceOptions, type IntlFormatDistanceUnit, type IntlFormatLocaleOptions, type IsMatchOptions, type LocalWeekOptions, type ParseISOOptions, type ParseISOTemporalOptions, type ParseISOZonedDateTimeOptions, type ParseJSONTemporalOptions, type ParseJSONZonedDateTimeOptions, type ParseOptions, type ParseTemporalOptions, type ParseZonedDateTimeOptions, type RoundToNearestHoursOptions, type RoundToNearestMinutesOptions, type RoundingMethod, type SetDefaultOptions, type StartOfWeekOptions, type TimeLike, type TimeZoneId, add, addBusinessDays, addDays, addHours, addISOWeekYears, addMilliseconds, addMinutes, addMonths, addQuarters, addSeconds, addWeeks, addYears, areIntervalsAdjacent, areIntervalsEquivalent, areIntervalsOverlapping, clamp, closestIndexTo, closestTo, compareAsc, compareDesc, constructNow, countIntervalUnits, daysToWeeks, differenceInBusinessDays, differenceInCalendarDays, differenceInCalendarISOWeekYears, differenceInCalendarISOWeeks, differenceInCalendarMonths, differenceInCalendarQuarters, differenceInCalendarWeeks, differenceInCalendarYears, differenceInDays, differenceInHours, differenceInISOWeekYears, differenceInMilliseconds, differenceInMinutes, differenceInMonths, differenceInQuarters, differenceInSeconds, differenceInWeeks, differenceInYears, eachDayOfInterval, eachHourOfInterval, eachMinuteOfInterval, eachMonthOfInterval, eachQuarterOfInterval, eachWeekOfInterval, eachWeekendOfInterval, eachWeekendOfMonth, eachWeekendOfYear, eachYearOfInterval, endOfDay, endOfDecade, endOfHour, endOfISOWeek, endOfISOWeekYear, endOfMinute, endOfMonth, endOfQuarter, endOfSecond, endOfToday, endOfTodayPlainDateTime, endOfTodayZonedDateTime, endOfTomorrow, endOfTomorrowPlainDateTime, endOfTomorrowZonedDateTime, endOfWeek, endOfYear, endOfYesterday, endOfYesterdayPlainDateTime, endOfYesterdayZonedDateTime, format, format as formatDate, formatDistance, formatDistanceStrict, formatDistanceToNow, formatDistanceToNowStrict, formatDuration, formatISO, formatISO9075, formatISODuration, formatInTimeZone, formatRFC3339, formatRFC7231, formatRelative, fromUnixTime, fromUnixTimePlainDateTime, fromUnixTimeZonedDateTime, fromZonedTime, getDate, getDay, getDayOfYear, getDaysInMonth, getDaysInYear, getDecade, getDefaultOptions, getHours, getISODay, getISOWeek, getISOWeekYear, getISOWeeksInYear, getMilliseconds, getMinutes, getMonth, getOverlappingDaysInIntervals, getQuarter, getSeconds, getTime, getTimezoneId, getTimezoneOffset, getUnixTime, getWeek, getWeekOfMonth, getWeekYear, getWeeksInMonth, getYear, hoursToMilliseconds, hoursToMinutes, hoursToSeconds, intersectIntervals, interval, intervalToDuration, intlFormat, intlFormatDistance, isAfter, isBefore, isDate, isEqual, isExists, isFirstDayOfMonth, isFriday, isFuture, isIntervalEmpty, isIntervalSubset, isIntervalSuperset, isLastDayOfMonth, isLeapYear, isMatch, isMonday, isPast, isPlainDate, isPlainDateTime, isSameDay, isSameHour, isSameISOWeek, isSameISOWeekYear, isSameMinute, isSameMonth, isSameQuarter, isSameSecond, isSameWeek, isSameYear, isSaturday, isSunday, isTemporal, isThisHour, isThisISOWeek, isThisMinute, isThisMonth, isThisQuarter, isThisSecond, isThisWeek, isThisYear, isThursday, isToday, isTomorrow, isTuesday, isValid, isWednesday, isWeekend, isWithinInterval, isYesterday, isZonedDateTime, lastDayOfDecade, lastDayOfISOWeek, lastDayOfISOWeekYear, lastDayOfMonth, lastDayOfQuarter, lastDayOfWeek, lastDayOfYear, lightFormat, max, milliseconds, millisecondsToHours, millisecondsToMinutes, millisecondsToSeconds, min, minutesToHours, minutesToMilliseconds, minutesToSeconds, monthsToQuarters, monthsToYears, nextDay, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday, parse, parseISO, parseJSON, previousDay, previousFriday, previousMonday, previousSaturday, previousSunday, previousThursday, previousTuesday, previousWednesday, quartersToMonths, quartersToYears, roundToNearestHours, roundToNearestMinutes, secondsToHours, secondsToMilliseconds, secondsToMinutes, set, setDate, setDay, setDayOfYear, setDefaultOptions, setHours, setISODay, setISOWeek, setISOWeekYear, setMilliseconds, setMinutes, setMonth, setQuarter, setSeconds, setWeek, setWeekYear, setYear, sliceInterval, splitIntervalByDuration, startOfDay, startOfDecade, startOfHour, startOfISOWeek, startOfISOWeekYear, startOfMinute, startOfMonth, startOfQuarter, startOfSecond, startOfToday, startOfTodayPlainDateTime, startOfTodayZonedDateTime, startOfTomorrow, startOfTomorrowPlainDateTime, startOfTomorrowZonedDateTime, startOfWeek, startOfWeekYear, startOfYear, startOfYesterday, startOfYesterdayPlainDateTime, startOfYesterdayZonedDateTime, sub, subBusinessDays, subDays, subHours, subISOWeekYears, subMilliseconds, subMinutes, subMonths, subQuarters, subSeconds, subWeeks, subYears, subtractInterval, timeZoneIds, toDate, toPlainDate, toPlainDateTime, toZonedDateTime, toZonedTime, todayPlainDate, todayPlainDateTime, todayZonedDateTime, tomorrowPlainDate, tomorrowPlainDateTime, tomorrowZonedDateTime, unionIntervals, weeksToDays, yearsToDays, yearsToMonths, yearsToQuarters, yesterdayPlainDate, yesterdayPlainDateTime, yesterdayZonedDateTime };