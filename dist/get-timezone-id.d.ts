//#region src/get-timezone-id.d.ts
/**
 * @summary Get the system's current IANA time zone identifier.
 *
 * @description
 * Get the system's current IANA time zone identifier (e.g. `'America/New_York'`), as reported
 * by the runtime environment. This is a thin wrapper around `Temporal.Now.timeZoneId()`.
 *
 * @returns The system's current IANA time zone identifier
 *
 * @example
 * const result = getTimezoneId()
 * //=> 'America/New_York'
 */
declare function getTimezoneId(): string;
//#endregion
export { getTimezoneId };
//# sourceMappingURL=get-timezone-id.d.ts.map