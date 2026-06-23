import { DateLike } from "./types.js";
import { StartOfWeekOptions } from "./start-of-week.js";

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
export { isThisWeek };
//# sourceMappingURL=is-this-week.d.ts.map