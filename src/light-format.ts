import { addLeadingZeros, getDateTimeFields } from './helpers/format-fields.js';
import { type DateLike } from './types.js';

const formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[A-Za-z]/;

interface Fields {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

function formatYear(fields: Fields, token: string): string {
  const signedYear = fields.year;
  const year = signedYear > 0 ? signedYear : 1 - signedYear;
  return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
}

function formatMonth(fields: Fields, token: string): string {
  return token === 'M' ? String(fields.month) : addLeadingZeros(fields.month, 2);
}

function formatDay(fields: Fields, token: string): string {
  return addLeadingZeros(fields.day, token.length);
}

function formatDayPeriod(fields: Fields, token: string): string {
  const dayPeriod = fields.hour / 12 >= 1 ? 'pm' : 'am';

  switch (token) {
    case 'a':
    case 'aa': {
      return dayPeriod.toUpperCase();
    }
    case 'aaa': {
      return dayPeriod;
    }
    case 'aaaaa': {
      // dayPeriod is always 'am' or 'pm', so index 0 always exists; the
      // fallback only satisfies noUncheckedIndexedAccess.
      /* v8 ignore next */
      return dayPeriod[0] ?? '';
    }
    default: {
      return dayPeriod === 'am' ? 'a.m.' : 'p.m.';
    }
  }
}

function formatHour12(fields: Fields, token: string): string {
  return addLeadingZeros(fields.hour % 12 || 12, token.length);
}

function formatHour24(fields: Fields, token: string): string {
  return addLeadingZeros(fields.hour, token.length);
}

function formatMinute(fields: Fields, token: string): string {
  return addLeadingZeros(fields.minute, token.length);
}

function formatSecond(fields: Fields, token: string): string {
  return addLeadingZeros(fields.second, token.length);
}

function formatFractionalSecond(fields: Fields, token: string): string {
  const numberOfDigits = token.length;
  const fractionalSeconds = Math.trunc(fields.millisecond * 10 ** (numberOfDigits - 3));
  return addLeadingZeros(fractionalSeconds, token.length);
}

const lightFormatters: Record<string, (fields: Fields, token: string) => string> = {
  y: formatYear,
  M: formatMonth,
  d: formatDay,
  a: formatDayPeriod,
  h: formatHour12,
  H: formatHour24,
  m: formatMinute,
  s: formatSecond,
  S: formatFractionalSecond,
};

function cleanEscapedString(input: string): string {
  const matches = escapedStringRegExp.exec(input);
  // cleanEscapedString is only called with a substring already known to
  // start with `'` (see lightFormat below), and escapedStringRegExp is
  // anchored at `^'`, so it always matches; the guard only satisfies the
  // type checker.
  /* v8 ignore next 3 */
  if (!matches) {
    return input;
  }
  // The capture group is non-optional in the pattern, so it's always defined
  // whenever the regex matches at all — same noUncheckedIndexedAccess reasoning.
  /* v8 ignore next */
  return (matches[1] ?? '').replace(doubleQuoteRegExp, "'");
}

/**
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. Unlike `format`, `lightFormat` outputs
 * dates using the most popular tokens, without the long-localized-format (`P`/`p`) machinery.
 *
 * The characters wrapped between two single quote characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real'
 * single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   |
 * |----------------------------------|---------|------------------------------------|
 * | AM, PM                          | a..aaa  | AM, PM                            |
 * |                                 | aaaa    | a.m., p.m.                        |
 * |                                 | aaaaa   | a, p                              |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 |
 * |                                 | yy      | 44, 01, 00, 17                    |
 * |                                 | yyy     | 044, 001, 000, 017                |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |
 * |                                 | MM      | 01, 02, ..., 12                   |
 * | Day of month                    | d       | 1, 2, ..., 31                     |
 * |                                 | dd      | 01, 02, ..., 31                   |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |
 * |                                 | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |
 * |                                 | HH      | 00, 01, 02, ..., 23               |
 * | Minute                          | m       | 0, 1, ..., 59                     |
 * |                                 | mm      | 00, 01, ..., 59                   |
 * | Second                          | s       | 0, 1, ..., 59                     |
 * |                                 | ss      | 00, 01, ..., 59                   |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |
 * |                                 | SS      | 00, 01, ..., 99                   |
 * |                                 | SSS     | 000, 001, ..., 999                |
 * |                                 | SSSS    | ...                               |
 *
 * @param date - The original date
 * @param formatStr - The string of tokens
 *
 * @returns The formatted date string
 *
 * @throws `Invalid time value` if `date` is an invalid `Date`
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * const result = lightFormat(new Date(2014, 1, 11), 'yyyy-MM-dd')
 * //=> '2014-02-11'
 */
export function lightFormat(date: Date | DateLike, formatStr: string): string {
  if (date instanceof Date && Number.isNaN(date.getTime())) {
    throw new RangeError('Invalid time value');
  }

  const fields = getDateTimeFields(date);

  const tokens = formatStr.match(formattingTokensRegExp);
  if (!tokens) {
    return '';
  }

  return tokens
    .map((substring) => {
      if (substring === "''") {
        return "'";
      }

      // Every token produced by formattingTokensRegExp matches at least one
      // character (its final alternative is `.`), so `substring` is never
      // empty and `firstCharacter` is never undefined; the fallbacks below
      // only satisfy noUncheckedIndexedAccess.
      /* v8 ignore next */
      const firstCharacter = substring[0] ?? '';
      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }

      const formatter = lightFormatters[firstCharacter];
      if (formatter) {
        return formatter(fields, substring);
      }

      if (unescapedLatinCharacterRegExp.test(firstCharacter)) {
        throw new RangeError(
          'Format string contains an unescaped latin alphabet character `' + firstCharacter + '`'
        );
      }

      return substring;
    })
    .join('');
}
