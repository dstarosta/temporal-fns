import { DateLike } from "./types.js";

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
export { getDecade };
//# sourceMappingURL=get-decade.d.ts.map