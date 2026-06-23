import { Interval, TimeLike } from "./types.js";
import { EachOfIntervalOptions } from "./helpers/create-each-of-interval.js";

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
export { eachMinuteOfInterval };
//# sourceMappingURL=each-minute-of-interval.d.ts.map