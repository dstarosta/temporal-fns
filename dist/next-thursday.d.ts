import { DateLike } from "./types.js";

//#region src/next-thursday.d.ts
/**
 * @summary When is the next Thursday?
 *
 * @description
 * When is the next Thursday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Thursday
 *
 * @example
 * // When is the next Thursday after Mar, 22, 2020?
 * const result = nextThursday(new Date(2020, 2, 22))
 * //=> Thur Mar 26 2020 00:00:00
 */
declare function nextThursday(date: Date): Date;
/**
 * @summary When is the next Thursday?
 *
 * @description
 * When is the next Thursday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Thursday
 *
 * @example
 * // When is the next Thursday after Mar, 22, 2020?
 * const result = nextThursday(new Date(2020, 2, 22))
 * //=> Thur Mar 26 2020 00:00:00
 */
declare function nextThursday<T extends DateLike>(date: T): T;
//#endregion
export { nextThursday };
//# sourceMappingURL=next-thursday.d.ts.map