import { addLeadingZeros, getDateTimeFields, getOffsetMinutes } from './helpers/format-fields.js';
import { type DateLike } from './types.js';

/**
 * The {@link formatRFC3339} function options.
 */
export interface FormatRFC3339Options {
  fractionDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

/**
 * @summary Format the date according to the RFC 3339 standard.
 *
 * @description
 * Return the formatted date string in RFC 3339 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format:
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format, 3 digits of second fraction
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), {
 *   fractionDigits: 3
 * })
 * //=> '2019-09-18T19:00:52.234Z'
 */
export function formatRFC3339(date: Date | DateLike, options?: FormatRFC3339Options): string {
  const fields = getDateTimeFields(date);
  const fractionDigits = options?.fractionDigits ?? 0;

  const day = addLeadingZeros(fields.day, 2);
  const month = addLeadingZeros(fields.month, 2);
  const year = fields.year;

  const hour = addLeadingZeros(fields.hour, 2);
  const minute = addLeadingZeros(fields.minute, 2);
  const second = addLeadingZeros(fields.second, 2);

  let fractionalSecond = '';
  if (fractionDigits > 0) {
    const fractionalSeconds = Math.trunc(fields.millisecond * 10 ** (fractionDigits - 3));
    fractionalSecond = '.' + addLeadingZeros(fractionalSeconds, fractionDigits);
  }

  const offsetMinutes = getOffsetMinutes(date);
  let offset: string;
  if (offsetMinutes === 0) {
    offset = 'Z';
  } else {
    const absoluteOffset = Math.abs(offsetMinutes);
    const hourOffset = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
    const minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
    const sign = offsetMinutes < 0 ? '+' : '-';
    offset = `${sign}${hourOffset}:${minuteOffset}`;
  }

  return `${String(year)}-${month}-${day}T${hour}:${minute}:${second}${fractionalSecond}${offset}`;
}
