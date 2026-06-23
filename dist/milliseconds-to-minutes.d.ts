//#region src/milliseconds-to-minutes.d.ts
/**
 * @summary Convert milliseconds to minutes.
 *
 * @description
 * Convert a number of milliseconds to a full number of minutes.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in minutes
 *
 * @example
 * // Convert 60000 milliseconds to minutes:
 * const result = millisecondsToMinutes(60000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToMinutes(119999)
 * //=> 1
 */
declare function millisecondsToMinutes(milliseconds: number): number;
//#endregion
export { millisecondsToMinutes };
//# sourceMappingURL=milliseconds-to-minutes.d.ts.map