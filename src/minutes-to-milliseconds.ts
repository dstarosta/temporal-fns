const millisecondsInMinute = 60_000;

/**
 * @summary Convert minutes to milliseconds.
 *
 * @description
 * Convert a number of minutes to a full number of milliseconds.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in milliseconds
 *
 * @example
 * // Convert 2 minutes to milliseconds
 * const result = minutesToMilliseconds(2)
 * //=> 120000
 */
export function minutesToMilliseconds(minutes: number): number {
  const result = Math.trunc(minutes * millisecondsInMinute);
  return result === 0 ? 0 : result;
}
