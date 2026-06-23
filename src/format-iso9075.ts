import { addLeadingZeros, getDateTimeFields } from './helpers/format-fields.js';
import { type DateLike } from './types.js';

/**
 * The {@link formatISO9075} function options.
 */
export interface FormatISO9075Options {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}

/**
 * @summary Format the date according to the ISO 9075 standard.
 *
 * @description
 * Return the formatted date string in ISO 9075 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18 19:00:52'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075, short format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918 190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, date only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, time only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52'
 */
export function formatISO9075(date: Date | DateLike, options?: FormatISO9075Options): string {
  const fields = getDateTimeFields(date);
  const format = options?.format ?? 'extended';
  const representation = options?.representation ?? 'complete';

  const dateDelimiter = format === 'extended' ? '-' : '';
  const timeDelimiter = format === 'extended' ? ':' : '';

  let result = '';

  if (representation !== 'time') {
    const day = addLeadingZeros(fields.day, 2);
    const month = addLeadingZeros(fields.month, 2);
    const year = addLeadingZeros(fields.year, 4);
    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }

  if (representation !== 'date') {
    const hour = addLeadingZeros(fields.hour, 2);
    const minute = addLeadingZeros(fields.minute, 2);
    const second = addLeadingZeros(fields.second, 2);
    const separator = result === '' ? '' : ' ';
    result = `${result}${separator}${hour}${timeDelimiter}${minute}${timeDelimiter}${second}`;
  }

  return result;
}
