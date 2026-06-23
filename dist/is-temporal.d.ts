import { DateLike } from "./types.js";

//#region src/is-temporal.d.ts
/**
 * @summary Is the given value a Temporal date-like value?
 *
 * @description
 * Is the given value a {@link DateLike} (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`)?
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a `Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`
 */
declare function isTemporal(value: unknown): value is DateLike;
//#endregion
export { isTemporal };
//# sourceMappingURL=is-temporal.d.ts.map