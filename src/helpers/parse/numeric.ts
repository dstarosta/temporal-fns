// Ported verbatim from date-fns (parse/_lib/constants.js and parse/_lib/utils.js)
// for exact behavioral parity; "simplifying" these risks subtly changing what matches.
const millisecondsInHour = 3_600_000;
const millisecondsInMinute = 60_000;
const millisecondsInSecond = 1000;

export const numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  date: /^(3[01]|[0-2]?\d)/,
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  week: /^(5[0-3]|[0-4]?\d)/,
  hour23h: /^(2[0-3]|[01]?\d)/,
  hour24h: /^(2[0-4]|[01]?\d)/,
  hour11h: /^(1[01]|0?\d)/,
  hour12h: /^(1[0-2]|0?\d)/,
  minute: /^[0-5]?\d/,
  second: /^[0-5]?\d/,

  singleDigit: /^\d/,
  twoDigits: /^\d{1,2}/,
  threeDigits: /^\d{1,3}/,
  fourDigits: /^\d{1,4}/,

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  twoDigitsSigned: /^-?\d{1,2}/,
  threeDigitsSigned: /^-?\d{1,3}/,
  fourDigitsSigned: /^-?\d{1,4}/,
};

export const timezonePatterns = {
  // eslint-disable-next-line sonarjs/anchor-precedence -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  // eslint-disable-next-line sonarjs/anchor-precedence -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  // eslint-disable-next-line sonarjs/anchor-precedence -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  // eslint-disable-next-line sonarjs/anchor-precedence -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  // eslint-disable-next-line sonarjs/anchor-precedence -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
};

export interface ParseResult<T> {
  value: T;
  rest: string;
}

export function mapValue<T, U>(
  result: ParseResult<T> | null,
  fn: (value: T) => U
): ParseResult<U> | null {
  if (!result) {
    return null;
  }
  return { value: fn(result.value), rest: result.rest };
}

export function parseNumericPattern(
  pattern: RegExp,
  dateString: string
): ParseResult<number> | null {
  const matchResult = pattern.exec(dateString);
  if (!matchResult) {
    return null;
  }
  return {
    value: Number.parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length),
  };
}

export function parseTimezonePattern(
  pattern: RegExp,
  dateString: string
): ParseResult<number> | null {
  const matchResult = pattern.exec(dateString);
  if (!matchResult) {
    return null;
  }

  if (matchResult[0] === 'Z') {
    return { value: 0, rest: dateString.slice(1) };
  }

  const sign = matchResult[1] === '+' ? 1 : -1;
  // The hours capture group is mandatory (non-optional) in every
  // timezonePatterns variant, so it's always present whenever the `+`/`-`
  // alternative matched at all; the `: 0` fallback only satisfies
  // noUncheckedIndexedAccess.
  /* v8 ignore next */
  const hours = matchResult[2] ? Number.parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? Number.parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? Number.parseInt(matchResult[5], 10) : 0;

  return {
    value:
      sign *
      (hours * millisecondsInHour +
        minutes * millisecondsInMinute +
        seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length),
  };
}

export function parseAnyDigitsSigned(dateString: string): ParseResult<number> | null {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}

export function parseNDigits(n: number, dateString: string): ParseResult<number> | null {
  switch (n) {
    case 1: {
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    }
    case 2: {
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    }
    case 3: {
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    }
    case 4: {
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    }
    default: {
      return parseNumericPattern(new RegExp(String.raw`^\d{1,${n}}`), dateString);
    }
  }
}

export function parseNDigitsSigned(n: number, dateString: string): ParseResult<number> | null {
  switch (n) {
    // Unreachable through any real token: both callers (R and u) special-case
    // their own length-1 form to call this with n=4 instead, exactly
    // mirroring date-fns' own ExtendedYearParser/ISOWeekYearParser, which
    // never reach this branch either — kept only for structural parity with
    // parseNDigits' equivalent case.
    /* v8 ignore next 3 */
    case 1: {
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    }
    case 2: {
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    }
    case 3: {
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    }
    case 4: {
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    }
    default: {
      return parseNumericPattern(new RegExp(String.raw`^-?\d{1,${n}}`), dateString);
    }
  }
}

export function dayPeriodEnumToHours(dayPeriod: string): number {
  switch (dayPeriod) {
    case 'morning': {
      return 4;
    }
    case 'evening': {
      return 17;
    }
    case 'pm':
    case 'noon':
    case 'afternoon': {
      return 12;
    }
    // 'am', 'midnight', 'night' (and anything else) all map to hour 0.
    default: {
      return 0;
    }
  }
}

export function normalizeTwoDigitYear(twoDigitYear: number, currentYear: number): number {
  const isCommonEra = currentYear > 0;
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

  let result: number;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }

  return isCommonEra ? result : 1 - result;
}

export function isLeapYearIndex(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
