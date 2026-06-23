import { DateLike } from "./types.js";

//#region src/is-saturday.d.ts
/**
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param date - The date to check
 *
 * @returns The date is Saturday
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * const result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
declare const isSaturday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
export { isSaturday };
//# sourceMappingURL=is-saturday.d.ts.map