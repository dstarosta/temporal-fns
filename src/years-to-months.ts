const monthsInYear = 12;

/**
 * @summary Convert years to months.
 *
 * @description
 * Convert a number of years to a full number of months.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in months
 *
 * @example
 * // Convert 2 years into months
 * const result = yearsToMonths(2)
 * //=> 24
 */
export function yearsToMonths(years: number): number {
  const result = Math.trunc(years * monthsInYear);
  return result === 0 ? 0 : result;
}
