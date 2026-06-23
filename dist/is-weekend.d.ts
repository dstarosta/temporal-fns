import { DateLike } from "./types.js";

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
export { isWeekend };
//# sourceMappingURL=is-weekend.d.ts.map