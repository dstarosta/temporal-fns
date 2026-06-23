import { DateLike } from "./types.js";

//#region src/is-sunday.d.ts
/**
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param date - The date to check
 *
 * @returns The date is Sunday
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * const result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
declare const isSunday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
export { isSunday };
//# sourceMappingURL=is-sunday.d.ts.map