//#region src/format-iso-duration.d.ts
/**
 * The {@link formatISODuration} function duration.
 */
interface ISODuration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
/**
 * @summary Format a duration object as ISO 8601 duration string
 *
 * @description
 * Format a duration object according to the ISO 8601 duration standard.
 *
 * @param duration - The duration to format
 *
 * @returns The ISO 8601 duration string
 *
 * @example
 * // Format the given duration as ISO 8601 string
 * const result = formatISODuration({
 *   years: 39,
 *   months: 2,
 *   days: 20,
 *   hours: 7,
 *   minutes: 5,
 *   seconds: 0
 * })
 * //=> 'P39Y2M20DT7H5M0S'
 */
declare function formatISODuration(duration: ISODuration): string;
//#endregion
export { ISODuration, formatISODuration };
//# sourceMappingURL=format-iso-duration.d.ts.map