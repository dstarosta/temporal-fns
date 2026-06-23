const daysInWeek = 7;

/**
 * @summary Convert weeks to days.
 *
 * @description
 * Convert a number of weeks to a full number of days.
 *
 * @param weeks - The number of weeks to be converted
 *
 * @returns The number of weeks converted in days
 *
 * @example
 * // Convert 2 weeks into days
 * const result = weeksToDays(2)
 * //=> 14
 */
export function weeksToDays(weeks: number): number {
  const result = Math.trunc(weeks * daysInWeek);
  return result === 0 ? 0 : result;
}
