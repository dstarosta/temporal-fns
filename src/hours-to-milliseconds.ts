const millisecondsInHour = 3_600_000;

/**
 * @summary Convert hours to milliseconds.
 *
 * @description
 * Convert a number of hours to a full number of milliseconds.
 *
 * @param hours - The number of hours to be converted
 *
 * @returns The number of hours converted to milliseconds
 *
 * @example
 * // Convert 2 hours to milliseconds:
 * const result = hoursToMilliseconds(2)
 * //=> 7200000
 */
export function hoursToMilliseconds(hours: number): number {
  const result = Math.trunc(hours * millisecondsInHour);
  return result === 0 ? 0 : result;
}
