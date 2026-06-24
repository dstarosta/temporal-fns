import { Duration } from "./format-duration.js";
import { DateLike, Interval } from "./types.js";

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
export { sliceInterval };
//# sourceMappingURL=slice-interval.d.ts.map