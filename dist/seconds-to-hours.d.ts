//#region src/seconds-to-hours.d.ts
/**
 * @summary Convert seconds to hours.
 *
 * @description
 * Convert a number of seconds to a full number of hours.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in hours
 *
 * @example
 * // Convert 7200 seconds into hours
 * const result = secondsToHours(7200)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToHours(7199)
 * //=> 1
 */
declare function secondsToHours(seconds: number): number;
//#endregion
export { secondsToHours };
//# sourceMappingURL=seconds-to-hours.d.ts.map