import { DateLike } from "./types.js";

//#region src/is-wednesday.d.ts
/**
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * @param date - The date to check
 *
 * @returns The date is Wednesday
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * const result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
declare const isWednesday: {
  (date: Date): boolean;
  (date: DateLike): boolean;
};
//#endregion
export { isWednesday };
//# sourceMappingURL=is-wednesday.d.ts.map