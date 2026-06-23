const millisecondsInSecond = 1000;

/**
 * @summary Convert seconds to milliseconds.
 *
 * @description
 * Convert a number of seconds to a full number of milliseconds.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in milliseconds
 *
 * @example
 * // Convert 2 seconds into milliseconds
 * const result = secondsToMilliseconds(2)
 * //=> 2000
 */
export function secondsToMilliseconds(seconds: number): number {
  const result = seconds * millisecondsInSecond;
  return result === 0 ? 0 : result;
}
