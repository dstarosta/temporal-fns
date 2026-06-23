//#region src/milliseconds-to-hours.d.ts
/**
 * @summary Convert milliseconds to hours.
 *
 * @description
 * Convert a number of milliseconds to a full number of hours.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in hours
 *
 * @example
 * // Convert 7200000 milliseconds to hours:
 * const result = millisecondsToHours(7200000)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToHours(7199999)
 * //=> 1
 */
declare function millisecondsToHours(milliseconds: number): number;
//#endregion
export { millisecondsToHours };
//# sourceMappingURL=milliseconds-to-hours.d.ts.map