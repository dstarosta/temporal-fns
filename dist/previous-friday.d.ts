import { DateLike } from "./types.js";

//#region src/previous-friday.d.ts
/**
 * @summary When is the previous Friday?
 *
 * @description
 * When is the previous Friday?
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Friday
 *
 * @example
 * // When is the previous Friday before Jun, 19, 2021?
 * const result = previousFriday(new Date(2021, 5, 19))
 * //=> Fri June 18 2021 00:00:00
 */
declare function previousFriday(date: Date): Date;
/**
 * @summary When is the previous Friday?
 *
 * @description
 * When is the previous Friday?
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`; the result has the same concrete type.
 *
 * @param date - The date to start counting from
 *
 * @returns The previous Friday
 *
 * @example
 * // When is the previous Friday before Jun, 19, 2021?
 * const result = previousFriday(new Date(2021, 5, 19))
 * //=> Fri June 18 2021 00:00:00
 */
declare function previousFriday<T extends DateLike>(date: T): T;
//#endregion
export { previousFriday };
//# sourceMappingURL=previous-friday.d.ts.map