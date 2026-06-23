const minutesInHour = 60;

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
export function minutesToHours(minutes: number): number {
  const result = Math.trunc(minutes / minutesInHour);
  return result === 0 ? 0 : result;
}
