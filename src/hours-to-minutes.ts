const minutesInHour = 60;

/**
 * @summary Convert hours to minutes.
 *
 * @description
 * Convert a number of hours to a full number of minutes.
 *
 * @param hours - The number of hours to be converted
 *
 * @returns The number of hours converted in minutes
 *
 * @example
 * // Convert 2 hours to minutes:
 * const result = hoursToMinutes(2)
 * //=> 120
 */
export function hoursToMinutes(hours: number): number {
  const result = Math.trunc(hours * minutesInHour);
  return result === 0 ? 0 : result;
}
