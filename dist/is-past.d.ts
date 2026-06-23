import { DateLike } from "./types.js";

//#region src/is-past.d.ts
/**
 * @summary Is the given date in the past?
 *
 * @description
 * Is the given date in the past?
 *
 * @param date - The date to check
 *
 * @returns The date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * const result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
declare function isPast(date: Date | DateLike): boolean;
//#endregion
export { isPast };
//# sourceMappingURL=is-past.d.ts.map