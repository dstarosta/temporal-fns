const quartersInYear = 4;

/**
 * @summary Convert years to quarters.
 *
 * @description
 * Convert a number of years to a full number of quarters.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in quarters
 *
 * @example
 * // Convert 2 years to quarters
 * const result = yearsToQuarters(2)
 * //=> 8
 */
export function yearsToQuarters(years: number): number {
  const result = Math.trunc(years * quartersInYear);
  return result === 0 ? 0 : result;
}
