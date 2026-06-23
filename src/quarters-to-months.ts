const monthsInQuarter = 3;

/**
 * @summary Convert number of quarters to months.
 *
 * @description
 * Convert a number of quarters to a full number of months.
 *
 * @param quarters - The number of quarters to be converted
 *
 * @returns The number of quarters converted in months
 *
 * @example
 * // Convert 2 quarters to months
 * const result = quartersToMonths(2)
 * //=> 6
 */
export function quartersToMonths(quarters: number): number {
  const result = Math.trunc(quarters * monthsInQuarter);
  return result === 0 ? 0 : result;
}
