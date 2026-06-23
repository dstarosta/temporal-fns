import { DateLike } from "./types.js";

//#region src/is-friday.d.ts
/**
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param date - The date to check
 *
 * @returns The date is Friday
 *
 * @example
 * // Is 26 September 2014 Friday?
 * const result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
declare const isFriday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
export { isFriday };
//# sourceMappingURL=is-friday.d.ts.map