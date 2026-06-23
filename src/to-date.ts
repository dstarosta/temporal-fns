// Mirrors date-fns' toDate: clones a Date, converts a number/string via the
// Date constructor, and falls through to the constructor for anything else
// (which yields an Invalid Date rather than throwing, matching native Date
// behavior for unsupported input).
/**
 * @summary Convert the given argument to an instance of `Date`.
 *
 * @description
 * Convert the given argument to an instance of `Date`.
 *
 * If the argument is an instance of `Date`, the function returns its clone.
 *
 * If the argument is a number or string, it is passed directly to the `Date` constructor (a
 * number is treated as a timestamp).
 *
 * If the argument is none of the above, the function returns an invalid `Date` (whose time
 * value is `NaN`).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
export function toDate(argument: unknown): Date {
  if (argument instanceof Date) {
    return new Date(argument);
  }
  return new Date(argument as ConstructorParameters<typeof Date>[0]);
}
