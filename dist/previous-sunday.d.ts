import { DateLike } from "./types.js";

//#region src/previous-sunday.d.ts
/**
 * @summary When is the previous Sunday?
 *
 * @description
 * When is the previous Sunday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Sunday
 *
 * @example
 * // When is the previous Sunday before Jun, 21, 2021?
 * const result = previousSunday(new Date(2021, 5, 21))
 * //=> Sun June 20 2021 00:00:00
 */
declare function previousSunday(date: Date): Date;
/**
 * @summary When is the previous Sunday?
 *
 * @description
 * When is the previous Sunday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Sunday
 *
 * @example
 * // When is the previous Sunday before Jun, 21, 2021?
 * const result = previousSunday(new Date(2021, 5, 21))
 * //=> Sun June 20 2021 00:00:00
 */
declare function previousSunday<T extends DateLike>(date: T): T;
//#endregion
export { previousSunday };
//# sourceMappingURL=previous-sunday.d.ts.map