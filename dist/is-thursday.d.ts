import { DateLike } from "./types.js";

//#region src/is-thursday.d.ts
/**
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param date - The date to check
 *
 * @returns The date is Thursday
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * const result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
declare const isThursday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
export { isThursday };
//# sourceMappingURL=is-thursday.d.ts.map