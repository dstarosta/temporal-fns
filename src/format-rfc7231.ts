import { addLeadingZeros } from './helpers/format-fields.js';
import { type DateLike } from './types.js';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface UTCFields {
  dayOfWeek: number;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
}

// formatRFC7231 always renders the UTC instant, regardless of the value's own
// timezone — Date/ZonedDateTime carry a real timezone, so their UTC instant
// is converted via the platform's UTC fields/Instant; PlainDate/PlainDateTime
// carry no timezone, so per the UTC rule their wall-clock fields already are
// the UTC fields.
function getUTCFields(date: Date | DateLike): UTCFields {
  if (date instanceof Date) {
    return {
      dayOfWeek: date.getUTCDay(),
      day: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
    };
  }
  if (date instanceof Temporal.ZonedDateTime) {
    const instant = date.toInstant().toZonedDateTimeISO('UTC');
    return {
      dayOfWeek: instant.dayOfWeek % 7,
      day: instant.day,
      month: instant.month - 1,
      year: instant.year,
      hour: instant.hour,
      minute: instant.minute,
      second: instant.second,
    };
  }
  return {
    dayOfWeek: date.dayOfWeek % 7,
    day: date.day,
    month: date.month - 1,
    year: date.year,
    hour: date instanceof Temporal.PlainDate ? 0 : date.hour,
    minute: date instanceof Temporal.PlainDate ? 0 : date.minute,
    second: date instanceof Temporal.PlainDate ? 0 : date.second,
  };
}

/**
 * @summary Format the date according to the RFC 7231 standard.
 *
 * @description
 * Return the formatted date string in RFC 7231 format.
 * The result will always be in UTC timezone.
 *
 * @param date - The original date
 *
 * @returns The formatted date string
 *
 * @throws `Invalid time value` if `date` is an invalid `Date`
 *
 * @example
 * // Represent 18 September 2019 in RFC 7231 format:
 * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
 * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
 */
export function formatRFC7231(date: Date): string;
export function formatRFC7231(date: DateLike): string;
export function formatRFC7231(date: Date | DateLike): string {
  if (date instanceof Date && Number.isNaN(date.getTime())) {
    throw new RangeError('Invalid time value');
  }

  const fields = getUTCFields(date);

  // dayOfWeek is always 0-6 and month is always 0-11 by construction (modulo
  // math / Temporal's guaranteed field ranges), so these are never undefined;
  // the fallbacks only satisfy noUncheckedIndexedAccess.
  /* v8 ignore next 2 */
  const dayName = days[fields.dayOfWeek] ?? '';
  const dayOfMonth = addLeadingZeros(fields.day, 2);
  /* v8 ignore next */
  const monthName = months[fields.month] ?? '';
  const year = fields.year;
  const hour = addLeadingZeros(fields.hour, 2);
  const minute = addLeadingZeros(fields.minute, 2);
  const second = addLeadingZeros(fields.second, 2);

  return `${dayName}, ${dayOfMonth} ${monthName} ${String(year)} ${hour}:${minute}:${second} GMT`;
}
