import { DateLike } from "./types.js";

//#region src/is-tuesday.d.ts
/**
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param date - The date to check
 *
 * @returns The date is Tuesday
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * const result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
declare const isTuesday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
export { isTuesday };
//# sourceMappingURL=is-tuesday.d.ts.map