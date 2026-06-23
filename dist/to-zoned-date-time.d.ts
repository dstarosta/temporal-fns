import { DateLike } from "./types.js";

//#region src/to-zoned-date-time.d.ts
/**
 * @summary Convert the given value to a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @description
 * Convert the given value to a `Temporal.ZonedDateTime` in the given timezone. A `Date` or
 * `Temporal.PlainDate`/`Temporal.PlainDateTime` is interpreted as that timezone's wall-clock
 * time; an existing `Temporal.ZonedDateTime` is re-zoned (its instant is preserved, but its
 * wall-clock fields shift to the new timezone).
 *
 * @param value - The value to convert
 * @param timeZone - The IANA timezone identifier to attach
 *
 * @returns The value as a `Temporal.ZonedDateTime` in `timeZone`
 */
declare function toZonedDateTime(value: Date | DateLike, timeZone: string): Temporal.ZonedDateTime;
//#endregion
export { toZonedDateTime };
//# sourceMappingURL=to-zoned-date-time.d.ts.map