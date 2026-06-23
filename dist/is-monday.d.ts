import { DateLike } from "./types.js";

//#region src/is-monday.d.ts
/**
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * @param date - The date to check
 *
 * @returns The date is Monday
 *
 * @example
 * // Is 22 September 2014 Monday?
 * const result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
declare const isMonday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
export { isMonday };
//# sourceMappingURL=is-monday.d.ts.map