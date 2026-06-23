import { DateLike } from "./types.js";

//#region src/next-saturday.d.ts
/**
 * @summary When is the next Saturday?
 *
 * @description
 * When is the next Saturday?
 *
 * @param date - The date to start counting from
 *
 * @returns The next Saturday
 *
 * @example
 * // When is the next Saturday after Mar, 22, 2020?
 * const result = nextSaturday(new Date(2020, 2, 22))
 * //=> Sat Mar 28 2020 00:00:00
 */
declare function nextSaturday(date: Date): Date;
/**
 * @summary When is the next Saturday?
 *
 * @description
 * When is the next Saturday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The next Saturday
 *
 * @example
 * // When is the next Saturday after Mar, 22, 2020?
 * const result = nextSaturday(new Date(2020, 2, 22))
 * //=> Sat Mar 28 2020 00:00:00
 */
declare function nextSaturday<T extends DateLike>(date: T): T;
//#endregion
export { nextSaturday };
//# sourceMappingURL=next-saturday.d.ts.map