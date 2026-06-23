//#region src/today-zoned-date-time.d.ts
/**
 * @summary Return the current moment as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the current moment as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns The current `Temporal.ZonedDateTime` in `timeZone`
 */
declare function todayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
export { todayZonedDateTime };
//# sourceMappingURL=today-zoned-date-time.d.ts.map