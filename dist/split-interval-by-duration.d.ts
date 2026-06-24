import { Duration } from "./format-duration.js";
import { DateLike, Interval } from "./types.js";

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
export { splitIntervalByDuration };
//# sourceMappingURL=split-interval-by-duration.d.ts.map