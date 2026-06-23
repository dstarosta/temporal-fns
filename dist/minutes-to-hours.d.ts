//#region src/minutes-to-hours.d.ts
/**
 * @summary Convert minutes to hours.
 *
 * @description
 * Convert a number of minutes to a full number of hours.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in hours
 *
 * @example
 * // Convert 140 minutes to hours:
 * const result = minutesToHours(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = minutesToHours(179)
 * //=> 2
 */
declare function minutesToHours(minutes: number): number;
//#endregion
export { minutesToHours };
//# sourceMappingURL=minutes-to-hours.d.ts.map