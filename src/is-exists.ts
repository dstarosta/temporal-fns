// date-fns' year/month/day take a JS-Date-style 0-indexed month (Jan = 0).
/**
 * @summary Is the given date exists?
 *
 * @description
 * Checks if the given arguments convert to an existing date.
 *
 * @param year - The year of the date to check
 * @param month - The month of the date to check
 * @param day - The day of the date to check
 *
 * @returns `true` if the date exists
 *
 * @example
 * // For the valid date:
 * const result = isExists(2018, 0, 31)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isExists(2018, 1, 31)
 * //=> false
 */
export function isExists(year: number, month: number, day: number): boolean {
  try {
    Temporal.PlainDate.from({ year, month: month + 1, day }, { overflow: 'reject' });
    return true;
  } catch {
    return false;
  }
}
