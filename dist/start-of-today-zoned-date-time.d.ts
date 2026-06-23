//#region src/start-of-today-zoned-date-time.d.ts
/**
 * @summary Return the start of today as a `Temporal.ZonedDateTime`.
 *
 * @description
 * Return the start of today (midnight) as a `Temporal.ZonedDateTime` in the given timezone.
 *
 * @param timeZone - The IANA timezone identifier to use. Defaults to the system's current timezone.
 *
 * @returns Midnight today in `timeZone`, as a `Temporal.ZonedDateTime`
 */
declare function startOfTodayZonedDateTime(timeZone?: string): Temporal.ZonedDateTime;
//#endregion
export { startOfTodayZonedDateTime };
//# sourceMappingURL=start-of-today-zoned-date-time.d.ts.map