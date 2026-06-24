//#region src/fp/types.d.ts
/**
 * A curried, data-last variant of a 1-argument function.
 */
interface FPFn1<Result, Arg1> {
  (arg1: Arg1): Result;
}
/**
 * A curried, data-last variant of a 2-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
interface FPFn2<Result, Arg2, Arg1> {
  (arg2: Arg2): (arg1: Arg1) => Result;
  (arg2: Arg2, arg1: Arg1): Result;
}
/**
 * A curried, data-last variant of a 3-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
interface FPFn3<Result, Arg3, Arg2, Arg1> {
  (arg3: Arg3): (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg3: Arg3): (arg2: Arg2, arg1: Arg1) => Result;
  (arg3: Arg3, arg2: Arg2): (arg1: Arg1) => Result;
  (arg3: Arg3, arg2: Arg2, arg1: Arg1): Result;
}
/**
 * A curried, data-last variant of a 4-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
interface FPFn4<Result, Arg4, Arg3, Arg2, Arg1> {
  (arg4: Arg4): (arg3: Arg3) => (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3) => (arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3, arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3, arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3): (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3): (arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3, arg2: Arg2): (arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3, arg2: Arg2, arg1: Arg1): Result;
}
//#endregion
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
//#endregion
//#region src/fp/add.d.ts
/**
 * Curried, data-last variant of {@link add}.
 */
declare const add: FPFn2<Date, Duration, Date>;
//#endregion
//#region src/fp/add-business-days.d.ts
/**
 * Curried, data-last variant of {@link addBusinessDays}.
 */
declare const addBusinessDays: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-days.d.ts
/**
 * Curried, data-last variant of {@link addDays}.
 */
declare const addDays: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-hours.d.ts
/**
 * Curried, data-last variant of {@link addHours}.
 */
declare const addHours: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-iso-week-years.d.ts
/**
 * Curried, data-last variant of {@link addISOWeekYears}.
 */
declare const addISOWeekYears: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link addMilliseconds}.
 */
declare const addMilliseconds: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-minutes.d.ts
/**
 * Curried, data-last variant of {@link addMinutes}.
 */
declare const addMinutes: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-months.d.ts
/**
 * Curried, data-last variant of {@link addMonths}.
 */
declare const addMonths: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-quarters.d.ts
/**
 * Curried, data-last variant of {@link addQuarters}.
 */
declare const addQuarters: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-seconds.d.ts
/**
 * Curried, data-last variant of {@link addSeconds}.
 */
declare const addSeconds: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-weeks.d.ts
/**
 * Curried, data-last variant of {@link addWeeks}.
 */
declare const addWeeks: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/add-years.d.ts
/**
 * Curried, data-last variant of {@link addYears}.
 */
declare const addYears: FPFn2<Date, number, Date>;
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
//#region src/fp/are-intervals-adjacent.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsAdjacent}.
 */
declare const areIntervalsAdjacent: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/are-intervals-equivalent.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsEquivalent}.
 */
declare const areIntervalsEquivalent: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/are-intervals-overlapping.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsOverlapping}.
 */
declare const areIntervalsOverlapping: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/are-intervals-overlapping.d.ts
/**
 * The {@link areIntervalsOverlapping} function options.
 */
interface AreIntervalsOverlappingOptions {
  inclusive?: boolean;
}
//#endregion
//#region src/fp/are-intervals-overlapping-with-options.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsOverlapping} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const areIntervalsOverlappingWithOptions: FPFn3<boolean, AreIntervalsOverlappingOptions | undefined, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/clamp.d.ts
/**
 * Curried, data-last variant of {@link clamp}.
 */
declare const clamp: FPFn2<Date, Interval<Date>, Date>;
//#endregion
//#region src/fp/closest-index-to.d.ts
/**
 * Curried, data-last variant of {@link closestIndexTo}.
 */
declare const closestIndexTo: FPFn2<number | undefined, readonly Date[], Date>;
//#endregion
//#region src/fp/closest-to.d.ts
/**
 * Curried, data-last variant of {@link closestTo}.
 */
declare const closestTo: FPFn2<Date | undefined, readonly Date[], Date>;
//#endregion
//#region src/fp/compare-asc.d.ts
/**
 * Curried, data-last variant of {@link compareAsc}.
 */
declare const compareAsc: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/compare-desc.d.ts
/**
 * Curried, data-last variant of {@link compareDesc}.
 */
declare const compareDesc: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/construct-now.d.ts
/**
 * Curried, data-last variant of {@link constructNow}.
 */
declare const constructNow: FPFn1<Date, Date>;
//#endregion
//#region src/fp/count-interval-units.d.ts
/**
 * Curried, data-last variant of {@link countIntervalUnits}.
 */
declare const countIntervalUnits: FPFn2<number, keyof Duration, Interval<Date>>;
//#endregion
//#region src/fp/days-to-weeks.d.ts
/**
 * Curried, data-last variant of {@link daysToWeeks}.
 */
declare const daysToWeeks: FPFn1<number, number>;
//#endregion
//#region src/fp/difference-in-business-days.d.ts
/**
 * Curried, data-last variant of {@link differenceInBusinessDays}.
 */
declare const differenceInBusinessDays: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-calendar-days.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarDays}.
 */
declare const differenceInCalendarDays: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-calendar-iso-week-years.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarISOWeekYears}.
 */
declare const differenceInCalendarISOWeekYears: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-calendar-iso-weeks.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarISOWeeks}.
 */
declare const differenceInCalendarISOWeeks: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-calendar-months.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarMonths}.
 */
declare const differenceInCalendarMonths: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-calendar-quarters.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarQuarters}.
 */
declare const differenceInCalendarQuarters: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-calendar-weeks.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarWeeks}.
 */
declare const differenceInCalendarWeeks: FPFn2<number, Date, Date>;
//#endregion
//#region src/start-of-week.d.ts
/**
 * The {@link startOfWeek} function options.
 */
interface StartOfWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
//#endregion
//#region src/fp/difference-in-calendar-weeks-with-options.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarWeeks} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const differenceInCalendarWeeksWithOptions: FPFn3<number, StartOfWeekOptions | undefined, Date, Date>;
//#endregion
//#region src/fp/difference-in-calendar-years.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarYears}.
 */
declare const differenceInCalendarYears: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-days.d.ts
/**
 * Curried, data-last variant of {@link differenceInDays}.
 */
declare const differenceInDays: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-hours.d.ts
/**
 * Curried, data-last variant of {@link differenceInHours}.
 */
declare const differenceInHours: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-iso-week-years.d.ts
/**
 * Curried, data-last variant of {@link differenceInISOWeekYears}.
 */
declare const differenceInISOWeekYears: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link differenceInMilliseconds}.
 */
declare const differenceInMilliseconds: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-minutes.d.ts
/**
 * Curried, data-last variant of {@link differenceInMinutes}.
 */
declare const differenceInMinutes: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-months.d.ts
/**
 * Curried, data-last variant of {@link differenceInMonths}.
 */
declare const differenceInMonths: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-quarters.d.ts
/**
 * Curried, data-last variant of {@link differenceInQuarters}.
 */
declare const differenceInQuarters: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-seconds.d.ts
/**
 * Curried, data-last variant of {@link differenceInSeconds}.
 */
declare const differenceInSeconds: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-weeks.d.ts
/**
 * Curried, data-last variant of {@link differenceInWeeks}.
 */
declare const differenceInWeeks: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/difference-in-years.d.ts
/**
 * Curried, data-last variant of {@link differenceInYears}.
 */
declare const differenceInYears: FPFn2<number, Date, Date>;
//#endregion
//#region src/fp/each-day-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachDayOfInterval}.
 */
declare const eachDayOfInterval: FPFn1<Date[], Interval<Date>>;
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
//#region src/fp/each-day-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachDayOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachDayOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
//#region src/fp/each-hour-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachHourOfInterval}.
 */
declare const eachHourOfInterval: FPFn1<Date[], Interval<Date>>;
//#endregion
//#region src/fp/each-hour-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachHourOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachHourOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
//#region src/fp/each-minute-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachMinuteOfInterval}.
 */
declare const eachMinuteOfInterval: FPFn1<Date[], Interval<Date>>;
//#endregion
//#region src/fp/each-minute-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachMinuteOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachMinuteOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
//#region src/fp/each-month-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachMonthOfInterval}.
 */
declare const eachMonthOfInterval: FPFn1<Date[], Interval<Date>>;
//#endregion
//#region src/fp/each-month-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachMonthOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachMonthOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
//#region src/fp/each-quarter-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachQuarterOfInterval}.
 */
declare const eachQuarterOfInterval: FPFn1<Date[], Interval<Date>>;
//#endregion
//#region src/fp/each-quarter-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachQuarterOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachQuarterOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
//#region src/fp/each-week-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachWeekOfInterval}.
 */
declare const eachWeekOfInterval: FPFn1<Date[], Interval<Date>>;
//#endregion
//#region src/each-week-of-interval.d.ts
/**
 * The {@link eachWeekOfInterval} function options.
 */
interface EachWeekOfIntervalOptions extends EachOfIntervalOptions, StartOfWeekOptions {}
//#endregion
//#region src/fp/each-week-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachWeekOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachWeekOfIntervalWithOptions: FPFn2<Date[], EachWeekOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
//#region src/fp/each-weekend-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachWeekendOfInterval}.
 */
declare const eachWeekendOfInterval: FPFn1<Date[], Interval<Date>>;
//#endregion
//#region src/fp/each-weekend-of-month.d.ts
/**
 * Curried, data-last variant of {@link eachWeekendOfMonth}.
 */
declare const eachWeekendOfMonth: FPFn1<Date[], Date>;
//#endregion
//#region src/fp/each-weekend-of-year.d.ts
/**
 * Curried, data-last variant of {@link eachWeekendOfYear}.
 */
declare const eachWeekendOfYear: FPFn1<Date[], Date>;
//#endregion
//#region src/fp/each-year-of-interval.d.ts
/**
 * Curried, data-last variant of {@link eachYearOfInterval}.
 */
declare const eachYearOfInterval: FPFn1<Date[], Interval<Date>>;
//#endregion
//#region src/fp/each-year-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachYearOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachYearOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
//#region src/fp/end-of-day.d.ts
/**
 * Curried, data-last variant of {@link endOfDay}.
 */
declare const endOfDay: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-decade.d.ts
/**
 * Curried, data-last variant of {@link endOfDecade}.
 */
declare const endOfDecade: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-hour.d.ts
/**
 * Curried, data-last variant of {@link endOfHour}.
 */
declare const endOfHour: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-iso-week.d.ts
/**
 * Curried, data-last variant of {@link endOfISOWeek}.
 */
declare const endOfISOWeek: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-iso-week-year.d.ts
/**
 * Curried, data-last variant of {@link endOfISOWeekYear}.
 */
declare const endOfISOWeekYear: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-minute.d.ts
/**
 * Curried, data-last variant of {@link endOfMinute}.
 */
declare const endOfMinute: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-month.d.ts
/**
 * Curried, data-last variant of {@link endOfMonth}.
 */
declare const endOfMonth: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-quarter.d.ts
/**
 * Curried, data-last variant of {@link endOfQuarter}.
 */
declare const endOfQuarter: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-second.d.ts
/**
 * Curried, data-last variant of {@link endOfSecond}.
 */
declare const endOfSecond: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-today-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link endOfTodayZonedDateTime}.
 */
declare const endOfTodayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/end-of-tomorrow-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link endOfTomorrowZonedDateTime}.
 */
declare const endOfTomorrowZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/end-of-week.d.ts
/**
 * Curried, data-last variant of {@link endOfWeek}.
 */
declare const endOfWeek: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link endOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const endOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/end-of-year.d.ts
/**
 * Curried, data-last variant of {@link endOfYear}.
 */
declare const endOfYear: FPFn1<Date, Date>;
//#endregion
//#region src/fp/end-of-yesterday-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link endOfYesterdayZonedDateTime}.
 */
declare const endOfYesterdayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/format.d.ts
/**
 * Curried, data-last variant of {@link format}.
 */
declare const format: FPFn2<string, string, Date | DateLike>;
//#endregion
//#region src/fp/format-distance.d.ts
/**
 * Curried, data-last variant of {@link formatDistance}.
 */
declare const formatDistance: FPFn2<string, Date, Date>;
//#endregion
//#region src/fp/format-distance-strict.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceStrict}.
 */
declare const formatDistanceStrict: FPFn2<string, Date, Date>;
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
//#endregion
//#region src/fp/format-distance-strict-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceStrict} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceStrictWithOptions: FPFn3<string, FormatDistanceStrictOptions | undefined, Date, Date>;
//#endregion
//#region src/fp/format-distance-to-now.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceToNow}.
 */
declare const formatDistanceToNow: FPFn1<string, Date | DateLike>;
//#endregion
//#region src/fp/format-distance-to-now-strict.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceToNowStrict}.
 */
declare const formatDistanceToNowStrict: FPFn1<string, Date | DateLike>;
//#endregion
//#region src/fp/format-distance-to-now-strict-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceToNowStrict} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceToNowStrictWithOptions: FPFn2<string, FormatDistanceStrictOptions | undefined, Date | DateLike>;
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
//#endregion
//#region src/fp/format-distance-to-now-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceToNow} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceToNowWithOptions: FPFn2<string, FormatDistanceOptions | undefined, Date | DateLike>;
//#endregion
//#region src/fp/format-distance-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistance} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceWithOptions: FPFn3<string, FormatDistanceOptions | undefined, Date, Date>;
//#endregion
//#region src/fp/format-duration.d.ts
/**
 * Curried, data-last variant of {@link formatDuration}.
 */
declare const formatDuration: FPFn1<string, Duration>;
//#endregion
//#region src/fp/format-duration-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDuration} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDurationWithOptions: FPFn2<string, FormatDurationOptions | undefined, Duration>;
//#endregion
//#region src/fp/format-in-time-zone.d.ts
/**
 * Curried, data-last variant of {@link formatInTimeZone}.
 */
declare const formatInTimeZone: FPFn3<string, string, string, Date | DateLike>;
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
//#endregion
//#region src/fp/format-in-time-zone-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatInTimeZone} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatInTimeZoneWithOptions: FPFn4<string, FormatOptions | undefined, string, string, Date | DateLike>;
//#endregion
//#region src/fp/format-iso.d.ts
/**
 * Curried, data-last variant of {@link formatISO}.
 */
declare const formatISO: FPFn1<string, Date | DateLike>;
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
//#endregion
//#region src/fp/format-iso-duration.d.ts
/**
 * Curried, data-last variant of {@link formatISODuration}.
 */
declare const formatISODuration: FPFn1<string, ISODuration>;
//#endregion
//#region src/format-iso.d.ts
/**
 * The {@link formatISO} function options.
 */
interface FormatISOOptions {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}
//#endregion
//#region src/fp/format-iso-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatISO} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatISOWithOptions: FPFn2<string, FormatISOOptions | undefined, Date | DateLike>;
//#endregion
//#region src/fp/format-iso9075.d.ts
/**
 * Curried, data-last variant of {@link formatISO9075}.
 */
declare const formatISO9075: FPFn1<string, Date | DateLike>;
//#endregion
//#region src/format-iso9075.d.ts
/**
 * The {@link formatISO9075} function options.
 */
interface FormatISO9075Options {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}
//#endregion
//#region src/fp/format-iso9075-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatISO9075} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatISO9075WithOptions: FPFn2<string, FormatISO9075Options | undefined, Date | DateLike>;
//#endregion
//#region src/fp/format-relative.d.ts
/**
 * Curried, data-last variant of {@link formatRelative}.
 */
declare const formatRelative: FPFn2<string, Date, Date>;
//#endregion
//#region src/format-relative.d.ts
/**
 * The {@link formatRelative} function options.
 */
interface FormatRelativeOptions {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
//#endregion
//#region src/fp/format-relative-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatRelative} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatRelativeWithOptions: FPFn3<string, FormatRelativeOptions | undefined, Date, Date>;
//#endregion
//#region src/fp/format-rfc3339.d.ts
/**
 * Curried, data-last variant of {@link formatRFC3339}.
 */
declare const formatRFC3339: FPFn1<string, Date | DateLike>;
//#endregion
//#region src/format-rfc3339.d.ts
/**
 * The {@link formatRFC3339} function options.
 */
interface FormatRFC3339Options {
  fractionDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}
//#endregion
//#region src/fp/format-rfc3339-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatRFC3339} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatRFC3339WithOptions: FPFn2<string, FormatRFC3339Options | undefined, Date | DateLike>;
//#endregion
//#region src/fp/format-rfc7231.d.ts
/**
 * Curried, data-last variant of {@link formatRFC7231}.
 */
declare const formatRFC7231: FPFn1<string, Date>;
//#endregion
//#region src/fp/format-with-options.d.ts
/**
 * Curried, data-last variant of {@link format} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatWithOptions: FPFn3<string, FormatOptions | undefined, string, Date | DateLike>;
//#endregion
//#region src/fp/from-unix-time.d.ts
/**
 * Curried, data-last variant of {@link fromUnixTime}.
 */
declare const fromUnixTime: FPFn1<Date, number>;
//#endregion
//#region src/fp/from-unix-time-plain-date-time.d.ts
/**
 * Curried, data-last variant of {@link fromUnixTimePlainDateTime}.
 */
declare const fromUnixTimePlainDateTime: FPFn1<Temporal.PlainDateTime, number>;
//#endregion
//#region src/fp/from-unix-time-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link fromUnixTimeZonedDateTime}.
 */
declare const fromUnixTimeZonedDateTime: FPFn2<Temporal.ZonedDateTime, string | undefined, number>;
//#endregion
//#region src/fp/from-zoned-time.d.ts
/**
 * Curried, data-last variant of {@link fromZonedTime}.
 */
declare const fromZonedTime: FPFn2<Date, string, Date | DateLike>;
//#endregion
//#region src/fp/get-date.d.ts
/**
 * Curried, data-last variant of {@link getDate}.
 */
declare const getDate: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-day.d.ts
/**
 * Curried, data-last variant of {@link getDay}.
 */
declare const getDay: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-day-of-year.d.ts
/**
 * Curried, data-last variant of {@link getDayOfYear}.
 */
declare const getDayOfYear: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-days-in-month.d.ts
/**
 * Curried, data-last variant of {@link getDaysInMonth}.
 */
declare const getDaysInMonth: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-days-in-year.d.ts
/**
 * Curried, data-last variant of {@link getDaysInYear}.
 */
declare const getDaysInYear: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-decade.d.ts
/**
 * Curried, data-last variant of {@link getDecade}.
 */
declare const getDecade: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-hours.d.ts
/**
 * Curried, data-last variant of {@link getHours}.
 */
declare const getHours: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-iso-day.d.ts
/**
 * Curried, data-last variant of {@link getISODay}.
 */
declare const getISODay: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-iso-week.d.ts
/**
 * Curried, data-last variant of {@link getISOWeek}.
 */
declare const getISOWeek: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-iso-week-year.d.ts
/**
 * Curried, data-last variant of {@link getISOWeekYear}.
 */
declare const getISOWeekYear: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-iso-weeks-in-year.d.ts
/**
 * Curried, data-last variant of {@link getISOWeeksInYear}.
 */
declare const getISOWeeksInYear: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link getMilliseconds}.
 */
declare const getMilliseconds: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-minutes.d.ts
/**
 * Curried, data-last variant of {@link getMinutes}.
 */
declare const getMinutes: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-month.d.ts
/**
 * Curried, data-last variant of {@link getMonth}.
 */
declare const getMonth: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-overlapping-days-in-intervals.d.ts
/**
 * Curried, data-last variant of {@link getOverlappingDaysInIntervals}.
 */
declare const getOverlappingDaysInIntervals: FPFn2<number, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/get-quarter.d.ts
/**
 * Curried, data-last variant of {@link getQuarter}.
 */
declare const getQuarter: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-seconds.d.ts
/**
 * Curried, data-last variant of {@link getSeconds}.
 */
declare const getSeconds: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-time.d.ts
/**
 * Curried, data-last variant of {@link getTime}.
 */
declare const getTime: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-timezone-offset.d.ts
/**
 * Curried, data-last variant of {@link getTimezoneOffset}.
 */
declare const getTimezoneOffset: FPFn2<number, Date | DateLike | undefined, string>;
//#endregion
//#region src/fp/get-unix-time.d.ts
/**
 * Curried, data-last variant of {@link getUnixTime}.
 */
declare const getUnixTime: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-week.d.ts
/**
 * Curried, data-last variant of {@link getWeek}.
 */
declare const getWeek: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-week-of-month.d.ts
/**
 * Curried, data-last variant of {@link getWeekOfMonth}.
 */
declare const getWeekOfMonth: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-week-of-month-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeekOfMonth} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeekOfMonthWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/get-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeekWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/get-week-year.d.ts
/**
 * Curried, data-last variant of {@link getWeekYear}.
 */
declare const getWeekYear: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-week-year-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeekYear} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeekYearWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/get-weeks-in-month.d.ts
/**
 * Curried, data-last variant of {@link getWeeksInMonth}.
 */
declare const getWeeksInMonth: FPFn1<number, Date>;
//#endregion
//#region src/fp/get-weeks-in-month-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeeksInMonth} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeeksInMonthWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/get-year.d.ts
/**
 * Curried, data-last variant of {@link getYear}.
 */
declare const getYear: FPFn1<number, Date>;
//#endregion
//#region src/fp/hours-to-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link hoursToMilliseconds}.
 */
declare const hoursToMilliseconds: FPFn1<number, number>;
//#endregion
//#region src/fp/hours-to-minutes.d.ts
/**
 * Curried, data-last variant of {@link hoursToMinutes}.
 */
declare const hoursToMinutes: FPFn1<number, number>;
//#endregion
//#region src/fp/hours-to-seconds.d.ts
/**
 * Curried, data-last variant of {@link hoursToSeconds}.
 */
declare const hoursToSeconds: FPFn1<number, number>;
//#endregion
//#region src/fp/intersect-intervals.d.ts
/**
 * Curried, data-last variant of {@link intersectIntervals}.
 */
declare const intersectIntervals: FPFn2<Interval<Date> | null, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/interval.d.ts
/**
 * Curried, data-last variant of {@link interval}.
 */
declare const interval: FPFn2<Interval<Date>, Date, Date>;
//#endregion
//#region src/fp/interval-to-duration.d.ts
/**
 * Curried, data-last variant of {@link intervalToDuration}.
 */
declare const intervalToDuration: FPFn1<Duration, Interval<Date>>;
//#endregion
//#region src/interval.d.ts
/**
 * The {@link interval} function options.
 */
interface IntervalOptions {
  assertPositive?: boolean;
}
//#endregion
//#region src/fp/interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link interval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const intervalWithOptions: FPFn3<Interval<Date>, IntervalOptions | undefined, Date, Date>;
//#endregion
//#region src/intl-format.d.ts
/**
 * The {@link intlFormat} function locale options.
 */
interface IntlFormatLocaleOptions {
  locale: Intl.LocalesArgument;
}
//#endregion
//#region src/fp/intl-format.d.ts
/**
 * Curried, data-last variant of {@link intlFormat}, curried at its highest arity (`date`,
 * `formatOptions`, `localeOptions`) — mirroring date-fns' own `fp/intlFormat`, which picks the same
 * arity for the same reason: `intlFormat`'s 1- and 2-argument overloads disagree on what the 2nd
 * positional argument means (`localeOptions` vs. `formatOptions`), so there's no single smaller
 * curry arity that covers every call shape. Pass `{}` for `formatOptions` to only set
 * `localeOptions`.
 */
declare const intlFormat: FPFn3<string, IntlFormatLocaleOptions | undefined, Intl.DateTimeFormatOptions | undefined, Date | DateLike>;
//#endregion
//#region src/fp/intl-format-distance.d.ts
/**
 * Curried, data-last variant of {@link intlFormatDistance}.
 */
declare const intlFormatDistance: FPFn2<string, Date, Date>;
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
//#endregion
//#region src/fp/intl-format-distance-with-options.d.ts
/**
 * Curried, data-last variant of {@link intlFormatDistance} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const intlFormatDistanceWithOptions: FPFn3<string, IntlFormatDistanceOptions | undefined, Date, Date>;
//#endregion
//#region src/fp/is-after.d.ts
/**
 * Curried, data-last variant of {@link isAfter}.
 */
declare const isAfter: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-before.d.ts
/**
 * Curried, data-last variant of {@link isBefore}.
 */
declare const isBefore: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-date.d.ts
/**
 * Curried, data-last variant of {@link isDate}.
 */
declare const isDate: FPFn1<boolean, unknown>;
//#endregion
//#region src/fp/is-equal.d.ts
/**
 * Curried, data-last variant of {@link isEqual}.
 */
declare const isEqual: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-exists.d.ts
/**
 * Curried, data-last variant of {@link isExists}.
 */
declare const isExists: FPFn3<boolean, number, number, number>;
//#endregion
//#region src/fp/is-first-day-of-month.d.ts
/**
 * Curried, data-last variant of {@link isFirstDayOfMonth}.
 */
declare const isFirstDayOfMonth: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-friday.d.ts
/**
 * Curried, data-last variant of {@link isFriday}.
 */
declare const isFriday: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-future.d.ts
/**
 * Curried, data-last variant of {@link isFuture}.
 */
declare const isFuture: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-interval-empty.d.ts
/**
 * Curried, data-last variant of {@link isIntervalEmpty}.
 */
declare const isIntervalEmpty: FPFn1<boolean, Interval<Date>>;
//#endregion
//#region src/fp/is-interval-subset.d.ts
/**
 * Curried, data-last variant of {@link isIntervalSubset}.
 */
declare const isIntervalSubset: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/is-interval-superset.d.ts
/**
 * Curried, data-last variant of {@link isIntervalSuperset}.
 */
declare const isIntervalSuperset: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/is-last-day-of-month.d.ts
/**
 * Curried, data-last variant of {@link isLastDayOfMonth}.
 */
declare const isLastDayOfMonth: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-leap-year.d.ts
/**
 * Curried, data-last variant of {@link isLeapYear}.
 */
declare const isLeapYear: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-match.d.ts
/**
 * Curried, data-last variant of {@link isMatch}.
 */
declare const isMatch: FPFn2<boolean, string, string>;
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
//#endregion
//#region src/fp/is-match-with-options.d.ts
/**
 * Curried, data-last variant of {@link isMatch} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const isMatchWithOptions: FPFn3<boolean, ParseOptions | undefined, string, string>;
//#endregion
//#region src/fp/is-monday.d.ts
/**
 * Curried, data-last variant of {@link isMonday}.
 */
declare const isMonday: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-past.d.ts
/**
 * Curried, data-last variant of {@link isPast}.
 */
declare const isPast: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-plain-date.d.ts
/**
 * Curried, data-last variant of {@link isPlainDate}.
 */
declare const isPlainDate: FPFn1<boolean, unknown>;
//#endregion
//#region src/fp/is-plain-date-time.d.ts
/**
 * Curried, data-last variant of {@link isPlainDateTime}.
 */
declare const isPlainDateTime: FPFn1<boolean, unknown>;
//#endregion
//#region src/fp/is-same-day.d.ts
/**
 * Curried, data-last variant of {@link isSameDay}.
 */
declare const isSameDay: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-hour.d.ts
/**
 * Curried, data-last variant of {@link isSameHour}.
 */
declare const isSameHour: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-iso-week.d.ts
/**
 * Curried, data-last variant of {@link isSameISOWeek}.
 */
declare const isSameISOWeek: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-iso-week-year.d.ts
/**
 * Curried, data-last variant of {@link isSameISOWeekYear}.
 */
declare const isSameISOWeekYear: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-minute.d.ts
/**
 * Curried, data-last variant of {@link isSameMinute}.
 */
declare const isSameMinute: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-month.d.ts
/**
 * Curried, data-last variant of {@link isSameMonth}.
 */
declare const isSameMonth: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-quarter.d.ts
/**
 * Curried, data-last variant of {@link isSameQuarter}.
 */
declare const isSameQuarter: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-second.d.ts
/**
 * Curried, data-last variant of {@link isSameSecond}.
 */
declare const isSameSecond: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-week.d.ts
/**
 * Curried, data-last variant of {@link isSameWeek}.
 */
declare const isSameWeek: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-same-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link isSameWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const isSameWeekWithOptions: FPFn3<boolean, StartOfWeekOptions | undefined, Date, Date>;
//#endregion
//#region src/fp/is-same-year.d.ts
/**
 * Curried, data-last variant of {@link isSameYear}.
 */
declare const isSameYear: FPFn2<boolean, Date, Date>;
//#endregion
//#region src/fp/is-saturday.d.ts
/**
 * Curried, data-last variant of {@link isSaturday}.
 */
declare const isSaturday: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-sunday.d.ts
/**
 * Curried, data-last variant of {@link isSunday}.
 */
declare const isSunday: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-temporal.d.ts
/**
 * Curried, data-last variant of {@link isTemporal}.
 */
declare const isTemporal: FPFn1<boolean, unknown>;
//#endregion
//#region src/fp/is-this-hour.d.ts
/**
 * Curried, data-last variant of {@link isThisHour}.
 */
declare const isThisHour: FPFn1<boolean, Date | TimeLike>;
//#endregion
//#region src/fp/is-this-iso-week.d.ts
/**
 * Curried, data-last variant of {@link isThisISOWeek}.
 */
declare const isThisISOWeek: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-this-minute.d.ts
/**
 * Curried, data-last variant of {@link isThisMinute}.
 */
declare const isThisMinute: FPFn1<boolean, Date | TimeLike>;
//#endregion
//#region src/fp/is-this-month.d.ts
/**
 * Curried, data-last variant of {@link isThisMonth}.
 */
declare const isThisMonth: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-this-quarter.d.ts
/**
 * Curried, data-last variant of {@link isThisQuarter}.
 */
declare const isThisQuarter: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-this-second.d.ts
/**
 * Curried, data-last variant of {@link isThisSecond}.
 */
declare const isThisSecond: FPFn1<boolean, Date | TimeLike>;
//#endregion
//#region src/fp/is-this-week.d.ts
/**
 * Curried, data-last variant of {@link isThisWeek}.
 */
declare const isThisWeek: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-this-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link isThisWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const isThisWeekWithOptions: FPFn2<boolean, StartOfWeekOptions | undefined, Date | DateLike>;
//#endregion
//#region src/fp/is-this-year.d.ts
/**
 * Curried, data-last variant of {@link isThisYear}.
 */
declare const isThisYear: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-thursday.d.ts
/**
 * Curried, data-last variant of {@link isThursday}.
 */
declare const isThursday: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-today.d.ts
/**
 * Curried, data-last variant of {@link isToday}.
 */
declare const isToday: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-tomorrow.d.ts
/**
 * Curried, data-last variant of {@link isTomorrow}.
 */
declare const isTomorrow: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-tuesday.d.ts
/**
 * Curried, data-last variant of {@link isTuesday}.
 */
declare const isTuesday: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-valid.d.ts
/**
 * Curried, data-last variant of {@link isValid}.
 */
declare const isValid: FPFn1<true, DateLike>;
//#endregion
//#region src/fp/is-wednesday.d.ts
/**
 * Curried, data-last variant of {@link isWednesday}.
 */
declare const isWednesday: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-weekend.d.ts
/**
 * Curried, data-last variant of {@link isWeekend}.
 */
declare const isWeekend: FPFn1<boolean, Date>;
//#endregion
//#region src/fp/is-within-interval.d.ts
/**
 * Curried, data-last variant of {@link isWithinInterval}.
 */
declare const isWithinInterval: FPFn2<boolean, Interval<Date>, Date>;
//#endregion
//#region src/fp/is-yesterday.d.ts
/**
 * Curried, data-last variant of {@link isYesterday}.
 */
declare const isYesterday: FPFn1<boolean, Date | DateLike>;
//#endregion
//#region src/fp/is-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link isZonedDateTime}.
 */
declare const isZonedDateTime: FPFn1<boolean, unknown>;
//#endregion
//#region src/fp/last-day-of-decade.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfDecade}.
 */
declare const lastDayOfDecade: FPFn1<Date, Date>;
//#endregion
//#region src/fp/last-day-of-iso-week.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfISOWeek}.
 */
declare const lastDayOfISOWeek: FPFn1<Date, Date>;
//#endregion
//#region src/fp/last-day-of-iso-week-year.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfISOWeekYear}.
 */
declare const lastDayOfISOWeekYear: FPFn1<Date, Date>;
//#endregion
//#region src/fp/last-day-of-month.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfMonth}.
 */
declare const lastDayOfMonth: FPFn1<Date, Date>;
//#endregion
//#region src/fp/last-day-of-quarter.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfQuarter}.
 */
declare const lastDayOfQuarter: FPFn1<Date, Date>;
//#endregion
//#region src/fp/last-day-of-week.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfWeek}.
 */
declare const lastDayOfWeek: FPFn1<Date, Date>;
//#endregion
//#region src/fp/last-day-of-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const lastDayOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/last-day-of-year.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfYear}.
 */
declare const lastDayOfYear: FPFn1<Date, Date>;
//#endregion
//#region src/fp/light-format.d.ts
/**
 * Curried, data-last variant of {@link lightFormat}.
 */
declare const lightFormat: FPFn2<string, string, Date | DateLike>;
//#endregion
//#region src/fp/max.d.ts
/**
 * Curried, data-last variant of {@link max}.
 */
declare const max: FPFn1<Date, readonly Date[]>;
//#endregion
//#region src/fp/milliseconds.d.ts
/**
 * Curried, data-last variant of {@link milliseconds}.
 */
declare const milliseconds: FPFn1<number, Duration>;
//#endregion
//#region src/fp/milliseconds-to-hours.d.ts
/**
 * Curried, data-last variant of {@link millisecondsToHours}.
 */
declare const millisecondsToHours: FPFn1<number, number>;
//#endregion
//#region src/fp/milliseconds-to-minutes.d.ts
/**
 * Curried, data-last variant of {@link millisecondsToMinutes}.
 */
declare const millisecondsToMinutes: FPFn1<number, number>;
//#endregion
//#region src/fp/milliseconds-to-seconds.d.ts
/**
 * Curried, data-last variant of {@link millisecondsToSeconds}.
 */
declare const millisecondsToSeconds: FPFn1<number, number>;
//#endregion
//#region src/fp/min.d.ts
/**
 * Curried, data-last variant of {@link min}.
 */
declare const min: FPFn1<Date, readonly Date[]>;
//#endregion
//#region src/fp/minutes-to-hours.d.ts
/**
 * Curried, data-last variant of {@link minutesToHours}.
 */
declare const minutesToHours: FPFn1<number, number>;
//#endregion
//#region src/fp/minutes-to-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link minutesToMilliseconds}.
 */
declare const minutesToMilliseconds: FPFn1<number, number>;
//#endregion
//#region src/fp/minutes-to-seconds.d.ts
/**
 * Curried, data-last variant of {@link minutesToSeconds}.
 */
declare const minutesToSeconds: FPFn1<number, number>;
//#endregion
//#region src/fp/months-to-quarters.d.ts
/**
 * Curried, data-last variant of {@link monthsToQuarters}.
 */
declare const monthsToQuarters: FPFn1<number, number>;
//#endregion
//#region src/fp/months-to-years.d.ts
/**
 * Curried, data-last variant of {@link monthsToYears}.
 */
declare const monthsToYears: FPFn1<number, number>;
//#endregion
//#region src/fp/next-day.d.ts
/**
 * Curried, data-last variant of {@link nextDay}.
 */
declare const nextDay: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/next-friday.d.ts
/**
 * Curried, data-last variant of {@link nextFriday}.
 */
declare const nextFriday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/next-monday.d.ts
/**
 * Curried, data-last variant of {@link nextMonday}.
 */
declare const nextMonday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/next-saturday.d.ts
/**
 * Curried, data-last variant of {@link nextSaturday}.
 */
declare const nextSaturday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/next-sunday.d.ts
/**
 * Curried, data-last variant of {@link nextSunday}.
 */
declare const nextSunday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/next-thursday.d.ts
/**
 * Curried, data-last variant of {@link nextThursday}.
 */
declare const nextThursday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/next-tuesday.d.ts
/**
 * Curried, data-last variant of {@link nextTuesday}.
 */
declare const nextTuesday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/next-wednesday.d.ts
/**
 * Curried, data-last variant of {@link nextWednesday}.
 */
declare const nextWednesday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/parse.d.ts
/**
 * Curried, data-last variant of {@link parse}. Does not accept `parse`'s options parameter; use
 * {@link parseWithOptions} for that. Only the plain `Date`-returning overload (no `options.in`) is
 * available here, matching date-fns' own `fp/parse` precedent of hardcoding the plain `Date`
 * signature rather than threading the `options.in`-discriminated return type through currying.
 */
declare const parse: FPFn3<Date, Date, string, string>;
//#endregion
//#region src/fp/parse-iso.d.ts
/**
 * Curried, data-last variant of {@link parseISO}. Does not accept `parseISO`'s options parameter;
 * use {@link parseISOWithOptions} for that. Only the plain `Date`-returning overload (no
 * `options.in`) is available here, matching date-fns' own `fp/parseISO` precedent of hardcoding the
 * plain `Date` signature rather than threading the `options.in`-discriminated return type through
 * currying.
 *
 * There's only one argument to curry, so unlike the other `fp/` modules this isn't a curried
 * function at all — it's just `parseISO` itself, included for API parity with date-fns' `fp`.
 */
declare const parseISO: FPFn1<Date, string>;
//#endregion
//#region src/parse-iso.d.ts
/**
 * The {@link parseISO} function options.
 */
interface ParseISOOptions {
  additionalDigits?: 0 | 1 | 2;
}
//#endregion
//#region src/fp/parse-iso-with-options.d.ts
/**
 * Curried, data-last variant of {@link parseISO} that also accepts its options parameter (as the
 * first curried argument, i.e. the last positional argument). Only the plain `Date`-returning
 * overload (no `options.in`) is available here; see {@link parseISO} for why.
 */
declare const parseISOWithOptions: FPFn2<Date, ParseISOOptions | undefined, string>;
//#endregion
//#region src/fp/parse-json.d.ts
/**
 * Curried, data-last variant of {@link parseJSON}. Only the plain `Date`-returning overload (no
 * `options.in`) is available here: unlike the rest of this library's `options` parameters,
 * `parseJSON`'s `options` exists solely to select a `Temporal` return type, not to tweak behavior,
 * so there's no generic options bag to thread through a `parseJSONWithOptions` curried variant.
 *
 * There's only one argument to curry, so unlike the other `fp/` modules this isn't a curried
 * function at all — it's just `parseJSON` itself, included for API parity with date-fns' `fp`.
 */
declare const parseJSON: FPFn1<Date, string>;
//#endregion
//#region src/fp/parse-with-options.d.ts
/**
 * Curried, data-last variant of {@link parse} that also accepts its options parameter (as the
 * first curried argument, i.e. the last positional argument). Only the plain `Date`-returning
 * overload (no `options.in`) is available here; see {@link parse} for why.
 */
declare const parseWithOptions: FPFn4<Date, ParseOptions | undefined, Date, string, string>;
//#endregion
//#region src/fp/previous-day.d.ts
/**
 * Curried, data-last variant of {@link previousDay}.
 */
declare const previousDay: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/previous-friday.d.ts
/**
 * Curried, data-last variant of {@link previousFriday}.
 */
declare const previousFriday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/previous-monday.d.ts
/**
 * Curried, data-last variant of {@link previousMonday}.
 */
declare const previousMonday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/previous-saturday.d.ts
/**
 * Curried, data-last variant of {@link previousSaturday}.
 */
declare const previousSaturday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/previous-sunday.d.ts
/**
 * Curried, data-last variant of {@link previousSunday}.
 */
declare const previousSunday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/previous-thursday.d.ts
/**
 * Curried, data-last variant of {@link previousThursday}.
 */
declare const previousThursday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/previous-tuesday.d.ts
/**
 * Curried, data-last variant of {@link previousTuesday}.
 */
declare const previousTuesday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/previous-wednesday.d.ts
/**
 * Curried, data-last variant of {@link previousWednesday}.
 */
declare const previousWednesday: FPFn1<Date, Date>;
//#endregion
//#region src/fp/quarters-to-months.d.ts
/**
 * Curried, data-last variant of {@link quartersToMonths}.
 */
declare const quartersToMonths: FPFn1<number, number>;
//#endregion
//#region src/fp/quarters-to-years.d.ts
/**
 * Curried, data-last variant of {@link quartersToYears}.
 */
declare const quartersToYears: FPFn1<number, number>;
//#endregion
//#region src/fp/round-to-nearest-hours.d.ts
/**
 * Curried, data-last variant of {@link roundToNearestHours}.
 */
declare const roundToNearestHours: FPFn1<Date, Date>;
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
//#endregion
//#region src/fp/round-to-nearest-hours-with-options.d.ts
/**
 * Curried, data-last variant of {@link roundToNearestHours} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const roundToNearestHoursWithOptions: FPFn2<Date, RoundToNearestHoursOptions | undefined, Date>;
//#endregion
//#region src/fp/round-to-nearest-minutes.d.ts
/**
 * Curried, data-last variant of {@link roundToNearestMinutes}.
 */
declare const roundToNearestMinutes: FPFn1<Date, Date>;
//#endregion
//#region src/round-to-nearest-minutes.d.ts
/**
 * The {@link roundToNearestMinutes} function options.
 */
interface RoundToNearestMinutesOptions {
  nearestTo?: number;
  roundingMethod?: RoundingMethod;
}
//#endregion
//#region src/fp/round-to-nearest-minutes-with-options.d.ts
/**
 * Curried, data-last variant of {@link roundToNearestMinutes} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const roundToNearestMinutesWithOptions: FPFn2<Date, RoundToNearestMinutesOptions | undefined, Date>;
//#endregion
//#region src/fp/seconds-to-hours.d.ts
/**
 * Curried, data-last variant of {@link secondsToHours}.
 */
declare const secondsToHours: FPFn1<number, number>;
//#endregion
//#region src/fp/seconds-to-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link secondsToMilliseconds}.
 */
declare const secondsToMilliseconds: FPFn1<number, number>;
//#endregion
//#region src/fp/seconds-to-minutes.d.ts
/**
 * Curried, data-last variant of {@link secondsToMinutes}.
 */
declare const secondsToMinutes: FPFn1<number, number>;
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
//#endregion
//#region src/fp/set.d.ts
/**
 * Curried, data-last variant of {@link set}.
 */
declare const set: FPFn2<Date, DateValues, Date>;
//#endregion
//#region src/fp/set-date.d.ts
/**
 * Curried, data-last variant of {@link setDate}.
 */
declare const setDate: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-day.d.ts
/**
 * Curried, data-last variant of {@link setDay}.
 */
declare const setDay: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-day-of-year.d.ts
/**
 * Curried, data-last variant of {@link setDayOfYear}.
 */
declare const setDayOfYear: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-day-with-options.d.ts
/**
 * Curried, data-last variant of {@link setDay} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const setDayWithOptions: FPFn3<Date, StartOfWeekOptions | undefined, number, Date>;
//#endregion
//#region src/helpers/default-options.d.ts
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
//#region src/fp/set-default-options.d.ts
/**
 * Curried, data-last variant of {@link setDefaultOptions}.
 */
declare const setDefaultOptions: FPFn1<void, SetDefaultOptions>;
//#endregion
//#region src/fp/set-hours.d.ts
/**
 * Curried, data-last variant of {@link setHours}.
 */
declare const setHours: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-iso-day.d.ts
/**
 * Curried, data-last variant of {@link setISODay}.
 */
declare const setISODay: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-iso-week.d.ts
/**
 * Curried, data-last variant of {@link setISOWeek}.
 */
declare const setISOWeek: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-iso-week-year.d.ts
/**
 * Curried, data-last variant of {@link setISOWeekYear}.
 */
declare const setISOWeekYear: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link setMilliseconds}.
 */
declare const setMilliseconds: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-minutes.d.ts
/**
 * Curried, data-last variant of {@link setMinutes}.
 */
declare const setMinutes: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-month.d.ts
/**
 * Curried, data-last variant of {@link setMonth}.
 */
declare const setMonth: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-quarter.d.ts
/**
 * Curried, data-last variant of {@link setQuarter}.
 */
declare const setQuarter: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-seconds.d.ts
/**
 * Curried, data-last variant of {@link setSeconds}.
 */
declare const setSeconds: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-week.d.ts
/**
 * Curried, data-last variant of {@link setWeek}.
 */
declare const setWeek: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link setWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const setWeekWithOptions: FPFn3<Date, LocalWeekOptions | undefined, number, Date>;
//#endregion
//#region src/fp/set-week-year.d.ts
/**
 * Curried, data-last variant of {@link setWeekYear}.
 */
declare const setWeekYear: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/set-week-year-with-options.d.ts
/**
 * Curried, data-last variant of {@link setWeekYear} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const setWeekYearWithOptions: FPFn3<Date, LocalWeekOptions | undefined, number, Date>;
//#endregion
//#region src/fp/set-year.d.ts
/**
 * Curried, data-last variant of {@link setYear}.
 */
declare const setYear: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/slice-interval.d.ts
/**
 * Curried, data-last variant of {@link sliceInterval}.
 */
declare const sliceInterval: FPFn4<Interval<Date> | null, number | undefined, number, Duration, Interval<Date>>;
//#endregion
//#region src/fp/split-interval-by-duration.d.ts
/**
 * Curried, data-last variant of {@link splitIntervalByDuration}.
 */
declare const splitIntervalByDuration: FPFn2<Interval<Date>[], Duration, Interval<Date>>;
//#endregion
//#region src/fp/start-of-day.d.ts
/**
 * Curried, data-last variant of {@link startOfDay}.
 */
declare const startOfDay: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-decade.d.ts
/**
 * Curried, data-last variant of {@link startOfDecade}.
 */
declare const startOfDecade: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-hour.d.ts
/**
 * Curried, data-last variant of {@link startOfHour}.
 */
declare const startOfHour: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-iso-week.d.ts
/**
 * Curried, data-last variant of {@link startOfISOWeek}.
 */
declare const startOfISOWeek: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-iso-week-year.d.ts
/**
 * Curried, data-last variant of {@link startOfISOWeekYear}.
 */
declare const startOfISOWeekYear: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-minute.d.ts
/**
 * Curried, data-last variant of {@link startOfMinute}.
 */
declare const startOfMinute: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-month.d.ts
/**
 * Curried, data-last variant of {@link startOfMonth}.
 */
declare const startOfMonth: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-quarter.d.ts
/**
 * Curried, data-last variant of {@link startOfQuarter}.
 */
declare const startOfQuarter: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-second.d.ts
/**
 * Curried, data-last variant of {@link startOfSecond}.
 */
declare const startOfSecond: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-today-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link startOfTodayZonedDateTime}.
 */
declare const startOfTodayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/start-of-tomorrow-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link startOfTomorrowZonedDateTime}.
 */
declare const startOfTomorrowZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/start-of-week.d.ts
/**
 * Curried, data-last variant of {@link startOfWeek}.
 */
declare const startOfWeek: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link startOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const startOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/start-of-week-year.d.ts
/**
 * Curried, data-last variant of {@link startOfWeekYear}.
 */
declare const startOfWeekYear: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-week-year-with-options.d.ts
/**
 * Curried, data-last variant of {@link startOfWeekYear} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const startOfWeekYearWithOptions: FPFn2<Date, LocalWeekOptions | undefined, Date>;
//#endregion
//#region src/fp/start-of-year.d.ts
/**
 * Curried, data-last variant of {@link startOfYear}.
 */
declare const startOfYear: FPFn1<Date, Date>;
//#endregion
//#region src/fp/start-of-yesterday-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link startOfYesterdayZonedDateTime}.
 */
declare const startOfYesterdayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/sub.d.ts
/**
 * Curried, data-last variant of {@link sub}.
 */
declare const sub: FPFn2<Date, Duration, Date>;
//#endregion
//#region src/fp/sub-business-days.d.ts
/**
 * Curried, data-last variant of {@link subBusinessDays}.
 */
declare const subBusinessDays: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-days.d.ts
/**
 * Curried, data-last variant of {@link subDays}.
 */
declare const subDays: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-hours.d.ts
/**
 * Curried, data-last variant of {@link subHours}.
 */
declare const subHours: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-iso-week-years.d.ts
/**
 * Curried, data-last variant of {@link subISOWeekYears}.
 */
declare const subISOWeekYears: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-milliseconds.d.ts
/**
 * Curried, data-last variant of {@link subMilliseconds}.
 */
declare const subMilliseconds: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-minutes.d.ts
/**
 * Curried, data-last variant of {@link subMinutes}.
 */
declare const subMinutes: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-months.d.ts
/**
 * Curried, data-last variant of {@link subMonths}.
 */
declare const subMonths: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-quarters.d.ts
/**
 * Curried, data-last variant of {@link subQuarters}.
 */
declare const subQuarters: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-seconds.d.ts
/**
 * Curried, data-last variant of {@link subSeconds}.
 */
declare const subSeconds: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-weeks.d.ts
/**
 * Curried, data-last variant of {@link subWeeks}.
 */
declare const subWeeks: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/sub-years.d.ts
/**
 * Curried, data-last variant of {@link subYears}.
 */
declare const subYears: FPFn2<Date, number, Date>;
//#endregion
//#region src/fp/subtract-interval.d.ts
/**
 * Curried, data-last variant of {@link subtractInterval}.
 */
declare const subtractInterval: FPFn2<Interval<Date>[], Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/to-date.d.ts
/**
 * Curried, data-last variant of {@link toDate}.
 */
declare const toDate: FPFn1<Date, unknown>;
//#endregion
//#region src/fp/to-plain-date.d.ts
/**
 * Curried, data-last variant of {@link toPlainDate}.
 */
declare const toPlainDate: FPFn1<Temporal.PlainDate, Date | DateLike>;
//#endregion
//#region src/fp/to-plain-date-time.d.ts
/**
 * Curried, data-last variant of {@link toPlainDateTime}.
 */
declare const toPlainDateTime: FPFn1<Temporal.PlainDateTime, Date | DateLike>;
//#endregion
//#region src/fp/to-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link toZonedDateTime}.
 */
declare const toZonedDateTime: FPFn2<Temporal.ZonedDateTime, string, Date | DateLike>;
//#endregion
//#region src/fp/to-zoned-time.d.ts
/**
 * Curried, data-last variant of {@link toZonedTime}.
 */
declare const toZonedTime: FPFn2<Date, string, Date | DateLike>;
//#endregion
//#region src/fp/today-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link todayZonedDateTime}.
 */
declare const todayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/tomorrow-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link tomorrowZonedDateTime}.
 */
declare const tomorrowZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
//#region src/fp/union-intervals.d.ts
/**
 * Curried, data-last variant of {@link unionIntervals}.
 */
declare const unionIntervals: FPFn2<Interval<Date>, Interval<Date>, Interval<Date>>;
//#endregion
//#region src/fp/weeks-to-days.d.ts
/**
 * Curried, data-last variant of {@link weeksToDays}.
 */
declare const weeksToDays: FPFn1<number, number>;
//#endregion
//#region src/fp/years-to-days.d.ts
/**
 * Curried, data-last variant of {@link yearsToDays}.
 */
declare const yearsToDays: FPFn1<number, number>;
//#endregion
//#region src/fp/years-to-months.d.ts
/**
 * Curried, data-last variant of {@link yearsToMonths}.
 */
declare const yearsToMonths: FPFn1<number, number>;
//#endregion
//#region src/fp/years-to-quarters.d.ts
/**
 * Curried, data-last variant of {@link yearsToQuarters}.
 */
declare const yearsToQuarters: FPFn1<number, number>;
//#endregion
//#region src/fp/yesterday-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link yesterdayZonedDateTime}.
 */
declare const yesterdayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined>;
//#endregion
export { add, addBusinessDays, addDays, addHours, addISOWeekYears, addMilliseconds, addMinutes, addMonths, addQuarters, addSeconds, addWeeks, addYears, areIntervalsAdjacent, areIntervalsEquivalent, areIntervalsOverlapping, areIntervalsOverlappingWithOptions, clamp, closestIndexTo, closestTo, compareAsc, compareDesc, constructNow, countIntervalUnits, daysToWeeks, differenceInBusinessDays, differenceInCalendarDays, differenceInCalendarISOWeekYears, differenceInCalendarISOWeeks, differenceInCalendarMonths, differenceInCalendarQuarters, differenceInCalendarWeeks, differenceInCalendarWeeksWithOptions, differenceInCalendarYears, differenceInDays, differenceInHours, differenceInISOWeekYears, differenceInMilliseconds, differenceInMinutes, differenceInMonths, differenceInQuarters, differenceInSeconds, differenceInWeeks, differenceInYears, eachDayOfInterval, eachDayOfIntervalWithOptions, eachHourOfInterval, eachHourOfIntervalWithOptions, eachMinuteOfInterval, eachMinuteOfIntervalWithOptions, eachMonthOfInterval, eachMonthOfIntervalWithOptions, eachQuarterOfInterval, eachQuarterOfIntervalWithOptions, eachWeekOfInterval, eachWeekOfIntervalWithOptions, eachWeekendOfInterval, eachWeekendOfMonth, eachWeekendOfYear, eachYearOfInterval, eachYearOfIntervalWithOptions, endOfDay, endOfDecade, endOfHour, endOfISOWeek, endOfISOWeekYear, endOfMinute, endOfMonth, endOfQuarter, endOfSecond, endOfTodayZonedDateTime, endOfTomorrowZonedDateTime, endOfWeek, endOfWeekWithOptions, endOfYear, endOfYesterdayZonedDateTime, format, formatDistance, formatDistanceStrict, formatDistanceStrictWithOptions, formatDistanceToNow, formatDistanceToNowStrict, formatDistanceToNowStrictWithOptions, formatDistanceToNowWithOptions, formatDistanceWithOptions, formatDuration, formatDurationWithOptions, formatISO, formatISO9075, formatISO9075WithOptions, formatISODuration, formatISOWithOptions, formatInTimeZone, formatInTimeZoneWithOptions, formatRFC3339, formatRFC3339WithOptions, formatRFC7231, formatRelative, formatRelativeWithOptions, formatWithOptions, fromUnixTime, fromUnixTimePlainDateTime, fromUnixTimeZonedDateTime, fromZonedTime, getDate, getDay, getDayOfYear, getDaysInMonth, getDaysInYear, getDecade, getHours, getISODay, getISOWeek, getISOWeekYear, getISOWeeksInYear, getMilliseconds, getMinutes, getMonth, getOverlappingDaysInIntervals, getQuarter, getSeconds, getTime, getTimezoneOffset, getUnixTime, getWeek, getWeekOfMonth, getWeekOfMonthWithOptions, getWeekWithOptions, getWeekYear, getWeekYearWithOptions, getWeeksInMonth, getWeeksInMonthWithOptions, getYear, hoursToMilliseconds, hoursToMinutes, hoursToSeconds, intersectIntervals, interval, intervalToDuration, intervalWithOptions, intlFormat, intlFormatDistance, intlFormatDistanceWithOptions, isAfter, isBefore, isDate, isEqual, isExists, isFirstDayOfMonth, isFriday, isFuture, isIntervalEmpty, isIntervalSubset, isIntervalSuperset, isLastDayOfMonth, isLeapYear, isMatch, isMatchWithOptions, isMonday, isPast, isPlainDate, isPlainDateTime, isSameDay, isSameHour, isSameISOWeek, isSameISOWeekYear, isSameMinute, isSameMonth, isSameQuarter, isSameSecond, isSameWeek, isSameWeekWithOptions, isSameYear, isSaturday, isSunday, isTemporal, isThisHour, isThisISOWeek, isThisMinute, isThisMonth, isThisQuarter, isThisSecond, isThisWeek, isThisWeekWithOptions, isThisYear, isThursday, isToday, isTomorrow, isTuesday, isValid, isWednesday, isWeekend, isWithinInterval, isYesterday, isZonedDateTime, lastDayOfDecade, lastDayOfISOWeek, lastDayOfISOWeekYear, lastDayOfMonth, lastDayOfQuarter, lastDayOfWeek, lastDayOfWeekWithOptions, lastDayOfYear, lightFormat, max, milliseconds, millisecondsToHours, millisecondsToMinutes, millisecondsToSeconds, min, minutesToHours, minutesToMilliseconds, minutesToSeconds, monthsToQuarters, monthsToYears, nextDay, nextFriday, nextMonday, nextSaturday, nextSunday, nextThursday, nextTuesday, nextWednesday, parse, parseISO, parseISOWithOptions, parseJSON, parseWithOptions, previousDay, previousFriday, previousMonday, previousSaturday, previousSunday, previousThursday, previousTuesday, previousWednesday, quartersToMonths, quartersToYears, roundToNearestHours, roundToNearestHoursWithOptions, roundToNearestMinutes, roundToNearestMinutesWithOptions, secondsToHours, secondsToMilliseconds, secondsToMinutes, set, setDate, setDay, setDayOfYear, setDayWithOptions, setDefaultOptions, setHours, setISODay, setISOWeek, setISOWeekYear, setMilliseconds, setMinutes, setMonth, setQuarter, setSeconds, setWeek, setWeekWithOptions, setWeekYear, setWeekYearWithOptions, setYear, sliceInterval, splitIntervalByDuration, startOfDay, startOfDecade, startOfHour, startOfISOWeek, startOfISOWeekYear, startOfMinute, startOfMonth, startOfQuarter, startOfSecond, startOfTodayZonedDateTime, startOfTomorrowZonedDateTime, startOfWeek, startOfWeekWithOptions, startOfWeekYear, startOfWeekYearWithOptions, startOfYear, startOfYesterdayZonedDateTime, sub, subBusinessDays, subDays, subHours, subISOWeekYears, subMilliseconds, subMinutes, subMonths, subQuarters, subSeconds, subWeeks, subYears, subtractInterval, toDate, toPlainDate, toPlainDateTime, toZonedDateTime, toZonedTime, todayZonedDateTime, tomorrowZonedDateTime, unionIntervals, weeksToDays, yearsToDays, yearsToMonths, yearsToQuarters, yesterdayZonedDateTime };