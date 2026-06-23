import { DateLike } from "./types.js";

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
export { getQuarter };
//# sourceMappingURL=get-quarter.d.ts.map