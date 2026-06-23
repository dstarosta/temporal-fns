import { DateLike } from "./types.js";
import { LocalWeekOptions } from "./helpers/local-week.js";

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
export { GetWeekOptions, getWeek };
//# sourceMappingURL=get-week.d.ts.map