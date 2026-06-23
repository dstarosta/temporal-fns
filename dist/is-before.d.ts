import { DateLike } from "./types.js";

//#region src/is-before.d.ts
/**
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param a - The date that should be before the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
declare function isBefore(a: Date, b: Date): boolean;
/**
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `a`/`b`, which must share the same concrete type.
 *
 * @param a - The date that should be before the other one to return true
 * @param b - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
declare function isBefore<T extends DateLike>(a: T, b: T): boolean;
//#endregion
export { isBefore };
//# sourceMappingURL=is-before.d.ts.map