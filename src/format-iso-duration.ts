/**
 * The {@link formatISODuration} function duration.
 */
export interface ISODuration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

// Deliberately diverges from date-fns: date-fns' formatISODuration never
// references `weeks` in its output template, even though `weeks` is part of
// its own Duration type, so it's always silently dropped. This implementation
// includes weeks in the output.
/**
 * @summary Format a duration object as ISO 8601 duration string
 *
 * @description
 * Format a duration object according to the ISO 8601 duration standard.
 *
 * @param duration - The duration to format
 *
 * @returns The ISO 8601 duration string
 *
 * @example
 * // Format the given duration as ISO 8601 string
 * const result = formatISODuration({
 *   years: 39,
 *   months: 2,
 *   days: 20,
 *   hours: 7,
 *   minutes: 5,
 *   seconds: 0
 * })
 * //=> 'P39Y2M20DT7H5M0S'
 */
export function formatISODuration(duration: ISODuration): string {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  return `P${String(years)}Y${String(months)}M${String(weeks)}W${String(days)}DT${String(hours)}H${String(minutes)}M${String(seconds)}S`;
}
