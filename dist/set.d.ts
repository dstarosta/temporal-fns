import { DateLike } from "./types.js";

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
export { DateValues, set };
//# sourceMappingURL=set.d.ts.map