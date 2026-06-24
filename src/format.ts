import { formatters, type FormatterContext } from './helpers/format-formatters.js';
import {
  resolveFirstWeekContainsDate,
  resolveLocale,
  resolveWeekStartsOn,
} from './helpers/default-options.js';
import { type LocalWeekOptions } from './helpers/local-week.js';
import { type DateLike } from './types.js';

/**
 * The {@link format} function options.
 */
export interface FormatOptions extends LocalWeekOptions {
  locale?: Intl.LocalesArgument;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
  /**
   * An IANA time zone identifier (e.g. `'America/New_York'`) the `x`/`X`/`O`/`z` tokens format
   * against, instead of the system's own time zone. Only applies when `date` is a plain `Date` —
   * a `Temporal.ZonedDateTime` already carries its own real time zone and ignores this option
   * entirely. Mirrors `date-fns-tz`'s `format`'s `timeZone` option.
   */
  timeZone?: string;
}

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp = /[DHIK-MQYc-ehikmqswy]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// Catches symbols escaped by quotes, and sequences of P/p (long localized
// date/time combinations), e.g. `PPPPPPPppppp`.
// eslint-disable-next-line sonarjs/regex-complexity, sonarjs/super-linear-regex
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[A-Za-z]/;

const dayOfYearTokenRegExp = /^D+$/;
const weekYearTokenRegExp = /^Y+$/;
const throwTokens = new Set(['D', 'DD', 'YY', 'YYYY']);

function isProtectedDayOfYearToken(token: string): boolean {
  return dayOfYearTokenRegExp.test(token);
}

function isProtectedWeekYearToken(token: string): boolean {
  return weekYearTokenRegExp.test(token);
}

function protectedTokenMessage(token: string, formatStr: string): string {
  const subject = token[0] === 'Y' ? 'years' : 'days of the month';
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${formatStr}\`) for formatting ${subject}; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

function warnOrThrowProtectedToken(token: string, formatStr: string): void {
  const protectedMessage = protectedTokenMessage(token, formatStr);
  console.warn(protectedMessage);
  if (throwTokens.has(token)) {
    throw new RangeError(protectedMessage);
  }
}

function cleanEscapedString(input: string): string {
  const matches = escapedStringRegExp.exec(input);
  // cleanEscapedString is only called with a substring already known to
  // start with `'` (see the main tokenizer below), and escapedStringRegExp is
  // anchored at `^'`, so it always matches; the guard only satisfies the type
  // checker.
  /* v8 ignore next 3 */
  if (!matches) {
    return input;
  }
  // The capture group is non-optional in the pattern, so it's always defined
  // whenever the regex matches at all — same noUncheckedIndexedAccess reasoning.
  /* v8 ignore next */
  return (matches[1] ?? '').replace(doubleQuoteRegExp, "'");
}

interface FormatPart {
  isToken: boolean;
  value: string;
}

// Splits formatStr into P/p long-date/time runs (kept as a single opaque token each, e.g.
// 'PPpp' stays one token rather than being expanded into a literal sub-pattern) and everything
// else (re-tokenized normally via tokenizeFormat). P/p are resolved at format-time instead of
// here, via their own `formatters` entries (see dateTimeLongToken in format-formatters.ts) -
// unlike every other long-date width, P/p's actual rendered text depends on `locale` (each
// locale has its own date/time order and connector words), so it can't be decided from formatStr
// alone the way this function's result is cached.
function tokenizeLongFormat(formatStr: string): FormatPart[] {
  const matches = formatStr.match(longFormattingTokensRegExp);
  // formatStr is always a non-empty pattern by the time this runs (an empty
  // string never reaches here through `format`'s normal use), and the regex's
  // final alternative `.` matches any single character, so .match always
  // returns at least one element for non-empty input — this only guards the
  // pathological empty-string case.
  /* v8 ignore next 3 */
  if (!matches) {
    return [];
  }

  // longFormattingTokensRegExp's fallback `.` alternative matches one character at a time for
  // anything that isn't a P/p run or a quoted string (e.g. 'yyyy' comes back as four separate
  // 'y' matches) - those need to be re-joined into contiguous non-P/p runs before tokenizeFormat
  // sees them, otherwise tokenizeFormat would tokenize each single character on its own (losing
  // any multi-character token like 'yyyy' entirely) instead of the original substring.
  const parts: FormatPart[] = [];
  let pendingRun = '';
  for (const substring of matches) {
    const firstCharacter = substring[0];
    if (firstCharacter === 'p' || firstCharacter === 'P') {
      if (pendingRun) {
        parts.push(...tokenizeFormat(pendingRun));
        pendingRun = '';
      }
      parts.push({ isToken: true, value: substring });
    } else {
      pendingRun += substring;
    }
  }
  if (pendingRun) {
    parts.push(...tokenizeFormat(pendingRun));
  }
  return parts;
}

// Parsing a format string into FormatPart[] only depends on formatStr itself (never on date or
// options), and the same format string is typically reused across many calls (e.g. formatting a
// list of dates with one shared pattern) - caching the parse avoids re-running both tokenizer
// regexps on every call. Capped since real-world format strings come from a small, code-level set
// of constants; unbounded growth would only happen from pathological dynamically-generated format
// strings, which this cap protects against.
//
// Eviction removes the oldest 20% of entries (by insertion order, which Map iterates in) rather
// than clearing everything: if a caller's actual working set sits right at/above the cap (e.g. a
// multi-tenant app with one format string per tenant), a full clear would sawtooth - wiping every
// entry, including ones still being reused, on every single call once the cache is full. Evicting
// a rolling fraction instead means most of a steady-state working set survives across evictions.
// This is an insertion-order approximation of LRU (it doesn't bump entries on read), not true LRU,
// but is far cheaper and sufficient given the cap is a defensive measure, not a hot budget.
const formatPartsCache = new Map<string, FormatPart[]>();
const formatPartsCacheLimit = 500;
const formatPartsCacheEvictFraction = 0.2;

function parseFormatParts(formatStr: string): FormatPart[] {
  const cached = formatPartsCache.get(formatStr);
  if (cached) {
    return cached;
  }
  const parts = tokenizeLongFormat(formatStr);
  if (formatPartsCache.size >= formatPartsCacheLimit) {
    const evictCount = Math.ceil(formatPartsCacheLimit * formatPartsCacheEvictFraction);
    const oldestKeys = formatPartsCache.keys();
    for (let i = 0; i < evictCount; i++) {
      const { value: oldestKey, done } = oldestKeys.next();
      // evictCount is always < formatPartsCacheLimit, and this only runs once the cache has
      // reached at least that many entries, so the iterator can never actually run out within
      // this loop; this is an invariant check, not a real runtime possibility.
      /* v8 ignore next 3 */
      if (done) {
        throw new Error('Unreachable: formatPartsCache eviction ran out of keys.');
      }
      formatPartsCache.delete(oldestKey);
    }
  }
  formatPartsCache.set(formatStr, parts);
  return parts;
}

function tokenizeFormat(formatStr: string): FormatPart[] {
  const tokens = formatStr.match(formattingTokensRegExp);
  /* v8 ignore next 3 */
  if (!tokens) {
    return [];
  }
  return tokens.map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    // Every token produced by formattingTokensRegExp matches at least one
    // character (its final alternative is `.`), so `substring` is never
    // empty and `firstCharacter` is never undefined; the fallback only
    // satisfies noUncheckedIndexedAccess.
    /* v8 ignore next */
    const firstCharacter = substring[0] ?? '';
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (unescapedLatinCharacterRegExp.test(firstCharacter)) {
      throw new RangeError(
        'Format string contains an unescaped latin alphabet character `' + firstCharacter + '`'
      );
    }
    return { isToken: false, value: substring };
  });
}

/**
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * The characters wrapped between two single quote characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 4/29/13, 12:00 AM                 | 7     |
 * |                                 | PPpp    | Apr 29, 2013, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 2013 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 2013 at ...   | 2,7   |
 *
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate`.
 *
 * 6. Specific non-location timezones (e.g. `EST`, `Eastern Standard Time`) are resolved via
 *    `Intl.DateTimeFormat`, and only available when a real IANA time zone is known: either `date`
 *    is a `Temporal.ZonedDateTime` (which always carries one), or `options.timeZone` is set for
 *    plain `Date` input. Without either, these tokens fall back to the GMT-offset format.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them.
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them.
 *
 * @param date - The original date
 * @param formatStr - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws use `yyyy` instead of `YYYY` for formatting years (unless `options.useAdditionalWeekYearTokens` is set)
 * @throws use `yy` instead of `YY` for formatting years (unless `options.useAdditionalWeekYearTokens` is set)
 * @throws use `d` instead of `D` for formatting days of the month (unless `options.useAdditionalDayOfYearTokens` is set)
 * @throws use `dd` instead of `DD` for formatting days of the month (unless `options.useAdditionalDayOfYearTokens` is set)
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
export function format(date: Date | DateLike, formatStr: string, options?: FormatOptions): string {
  const locale = resolveLocale(options?.locale);
  const weekStartsOn = resolveWeekStartsOn(options?.weekStartsOn);
  const firstWeekContainsDate = resolveFirstWeekContainsDate(options?.firstWeekContainsDate);

  if (date instanceof Date && Number.isNaN(date.getTime())) {
    throw new RangeError('Invalid time value');
  }

  const parts = parseFormatParts(formatStr);

  const context: FormatterContext = {
    locale,
    weekStartsOn,
    firstWeekContainsDate,
    ...(options?.timeZone !== undefined && { timeZone: options.timeZone }),
  };

  return parts
    .map((part) => {
      if (!part.isToken) {
        return part.value;
      }

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) ||
        (!options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token))
      ) {
        warnOrThrowProtectedToken(token, formatStr);
      }

      // token[0] is always a key in `formatters`: tokenizeFormat only marks
      // a part as isToken:true after confirming `formatters[firstCharacter]`
      // exists.
      /* v8 ignore next */
      const formatter = formatters[token[0] ?? ''];
      /* v8 ignore next 3 */
      if (!formatter) {
        return '';
      }
      return formatter(date, token, context);
    })
    .join('');
}

export { format as formatDate };
