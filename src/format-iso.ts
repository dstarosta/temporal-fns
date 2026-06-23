import { addLeadingZeros, getDateTimeFields, getOffsetMinutes } from './helpers/format-fields.js';
import { type DateLike } from './types.js';

/**
 * The {@link formatISO} function options.
 */
export interface FormatISOOptions {
  format?: 'extended' | 'basic';
  representation?: 'complete' | 'date' | 'time';
}

/**
 * @summary Format the date according to the ISO 8601 standard.
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the
 * parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The formatted date string (in local time zone)
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
export function formatISO(date: Date | DateLike, options?: FormatISOOptions): string {
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
    const offsetMinutes = getOffsetMinutes(date);
    let tzOffset: string;
    if (offsetMinutes === 0) {
      tzOffset = 'Z';
    } else {
      const absoluteOffset = Math.abs(offsetMinutes);
      const hourOffset = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
      const minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
      const sign = offsetMinutes < 0 ? '+' : '-';
      tzOffset = `${sign}${hourOffset}:${minuteOffset}`;
    }

    const hour = addLeadingZeros(fields.hour, 2);
    const minute = addLeadingZeros(fields.minute, 2);
    const second = addLeadingZeros(fields.second, 2);
    const separator = result === '' ? '' : 'T';
    const time = [hour, minute, second].join(timeDelimiter);
    result = `${result}${separator}${time}${tzOffset}`;
  }

  return result;
}
