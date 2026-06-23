const daysInYear = 365.2425;

/**
 * @summary Convert years to days.
 *
 * @description
 * Convert a number of years to a full number of days.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in days
 *
 * @example
 * // Convert 2 years into days
 * const result = yearsToDays(2)
 * //=> 730
 */
export function yearsToDays(years: number): number {
  const result = Math.trunc(years * daysInYear);
  return result === 0 ? 0 : result;
}
