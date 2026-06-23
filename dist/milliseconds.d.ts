import { Duration } from "./format-duration.js";

//#region src/milliseconds.d.ts
/**
 * @summary Returns the number of milliseconds in the specified years, months, weeks, days, hours, minutes and seconds.
 *
 * @description
 * Returns the number of milliseconds in the specified years, months, weeks, days, hours, minutes
 * and seconds.
 *
 * One year equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 *
 * One month is a year divided by 12.
 *
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be converted
 *
 * @returns The milliseconds
 *
 * @example
 * // 1 year in milliseconds
 * milliseconds({ years: 1 })
 * //=> 31556952000
 *
 * // 3 months in milliseconds
 * milliseconds({ months: 3 })
 * //=> 7889238000
 */
declare function milliseconds(duration: Duration): number;
//#endregion
export { milliseconds };
//# sourceMappingURL=milliseconds.d.ts.map