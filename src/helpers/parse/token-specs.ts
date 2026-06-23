import {
  dayPeriodEnumToHours,
  isLeapYearIndex,
  mapValue,
  normalizeTwoDigitYear,
  numericPatterns,
  parseAnyDigitsSigned,
  parseNDigits,
  parseNDigitsSigned,
  parseNumericPattern,
  parseTimezonePattern,
  timezonePatterns,
  type ParseResult,
} from './numeric.js';
import {
  matchAmPm,
  matchDayPeriod,
  matchEra,
  matchMonth,
  matchOrdinalNumber,
  matchQuarter,
  matchWeekday,
  matchWeekdayTwoLetter,
} from './locale-match.js';
import { type SetterFlags, type WorkingFields } from './setters.js';
import { isoDayOfWeekToSundayBased } from '../week.js';
// Reusing this library's own existing, already-public week-math functions
// (rather than re-deriving date-fns' setWeek.js/setISOWeek.js/etc from
// scratch) — these are pure, side-effect-free functions operating on
// Temporal.PlainDate, so calling them from a helper is safe even though it
// crosses the usual helpers-don't-import-top-level-files convention; the
// alternative (duplicating this week math) is a much larger correctness risk.
import { setDay } from '../../set-day.js';
import { setISODay } from '../../set-iso-day.js';
import { setWeek } from '../../set-week.js';
import { setISOWeek } from '../../set-iso-week.js';
import { startOfWeek } from '../../start-of-week.js';
import { startOfISOWeek } from '../../start-of-iso-week.js';
import { getWeekYearValue } from '../local-week.js';

type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type FirstWeekContainsDate = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface TokenParseContext {
  locale: Intl.LocalesArgument;
  weekStartsOn: number;
  firstWeekContainsDate: number;
}

export interface TokenSpec {
  priority: number;
  subPriority?: number;
  incompatibleTokens: string[] | '*';
  parse: (
    dateString: string,
    token: string,
    context: TokenParseContext
  ) => ParseResult<unknown> | null;
  validate?: (fields: WorkingFields, value: unknown) => boolean;
  apply: (
    fields: WorkingFields,
    value: unknown,
    flags: SetterFlags,
    context: TokenParseContext
  ) => WorkingFields;
}

function zeroTimeOfDay(fields: WorkingFields): WorkingFields {
  return { ...fields, hour: 0, minute: 0, second: 0, millisecond: 0 };
}

function scratchPlainDate(fields: WorkingFields): Temporal.PlainDate {
  return Temporal.PlainDate.from({ year: fields.year, month: fields.month, day: fields.day });
}

function withPlainDate(fields: WorkingFields, plainDate: Temporal.PlainDate): WorkingFields {
  return { ...fields, year: plainDate.year, month: plainDate.month, day: plainDate.day };
}

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInMonthLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

interface YearValue {
  year: number;
  isTwoDigitYear: boolean;
}

function parseYearToken(dateString: string, token: string): ParseResult<YearValue> | null {
  const valueCallback = (year: number): YearValue => ({
    year,
    isTwoDigitYear: token === 'yy' || token === 'YY',
  });
  if (token === 'y' || token === 'Y') {
    return mapValue(parseNDigits(4, dateString), valueCallback);
  }
  if (token === 'yo' || token === 'Yo') {
    return mapValue(matchOrdinalNumberAsResult(dateString), valueCallback);
  }
  return mapValue(parseNDigits(token.length, dateString), valueCallback);
}

function matchOrdinalNumberAsResult(dateString: string): ParseResult<number> | null {
  const result = matchOrdinalNumber(dateString);
  return result ? { value: result.value, rest: result.rest } : null;
}

function applyYearValue(
  fields: WorkingFields,
  value: YearValue,
  flags: SetterFlags,
  day: number
): WorkingFields {
  if (value.isTwoDigitYear) {
    const normalized = normalizeTwoDigitYear(value.year, fields.year);
    return zeroTimeOfDay({ ...fields, year: normalized, month: 1, day });
  }
  const year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
  return zeroTimeOfDay({ ...fields, year, month: 1, day });
}

function matchMonthText(
  dateString: string,
  token: string,
  locale: Intl.LocalesArgument
): ParseResult<number> | null {
  if (token.length === 3) {
    return (
      toParseResult(matchMonth(dateString, 'short', locale)) ??
      toParseResult(matchMonth(dateString, 'narrow', locale))
    );
  }
  if (token.length === 5) {
    return toParseResult(matchMonth(dateString, 'narrow', locale));
  }
  return (
    toParseResult(matchMonth(dateString, 'long', locale)) ??
    toParseResult(matchMonth(dateString, 'short', locale)) ??
    toParseResult(matchMonth(dateString, 'narrow', locale))
  );
}

function toParseResult<T>(match: { value: T; rest: string } | undefined): ParseResult<T> | null {
  return match ? { value: match.value, rest: match.rest } : null;
}

function toZeroIndexed(value: number): number {
  return value - 1;
}

function parseMonthToken(dateString: string, token: string, locale: Intl.LocalesArgument) {
  switch (token) {
    case 'M':
    case 'L': {
      return mapValue(parseNumericPattern(numericPatterns.month, dateString), toZeroIndexed);
    }
    case 'MM':
    case 'LL': {
      return mapValue(parseNDigits(2, dateString), toZeroIndexed);
    }
    case 'Mo':
    case 'Lo': {
      return mapValue(matchOrdinalNumberAsResult(dateString), toZeroIndexed);
    }
    default: {
      return mapValue(matchMonthText(dateString, token, locale), toZeroIndexed);
    }
  }
}

// Every fallback alternative below (everything after the first
// `toParseResult(...)` in each `??` chain) appears unreachable in practice:
// checked CLDR weekday data for en-US, de-DE, fr-FR, es-ES, pt-BR, ja-JP, and
// eo (date-fns' own canonical "needs special locale handling" example) —
// every locale's `short` width gives 7 distinct, always-matching
// abbreviations, so the first-tried width never fails. Left untagged rather
// than `v8 ignore`d since this is a sampling of locales, not a proof for
// every locale Intl could ever support — a future, not-yet-surveyed locale
// could plausibly need the fallback.
function parseWeekdayText(
  dateString: string,
  token: string,
  locale: Intl.LocalesArgument
): ParseResult<number> | null {
  if (token.length === 3) {
    return (
      toParseResult(matchWeekday(dateString, 'short', locale)) ??
      toParseResult(matchWeekday(dateString, 'narrow', locale))
    );
  }
  if (token.length === 5) {
    return toParseResult(matchWeekday(dateString, 'narrow', locale));
  }
  if (token.length === 6) {
    return (
      toParseResult(matchWeekdayTwoLetter(dateString, locale)) ??
      toParseResult(matchWeekday(dateString, 'narrow', locale))
    );
  }
  return (
    toParseResult(matchWeekday(dateString, 'long', locale)) ??
    toParseResult(matchWeekday(dateString, 'short', locale)) ??
    toParseResult(matchWeekday(dateString, 'narrow', locale))
  );
}

// isoWeekdayToSundayBasedLocal: date-fns' LocalDayParser/StandAloneLocalDayParser
// math, converting an ISO (Monday=1) weekday into the e/c token's
// weekStartsOn-relative numbering.
function isoToLocalDayValue(isoDayOfWeek: number, weekStartsOn: number): number {
  const wholeWeekDays = Math.floor((isoDayOfWeek - 1) / 7) * 7;
  return ((isoDayOfWeek + weekStartsOn + 6) % 7) + wholeWeekDays;
}

function parseLocalDayToken(
  dateString: string,
  token: string,
  context: TokenParseContext
): ParseResult<number> | null {
  if (token.endsWith('o')) {
    return mapValue(matchOrdinalNumberAsResult(dateString), (value) =>
      isoToLocalDayValue(value, context.weekStartsOn)
    );
  }
  if (token.length <= 2) {
    return mapValue(parseNDigits(token.length, dateString), (value) =>
      isoToLocalDayValue(value, context.weekStartsOn)
    );
  }
  // Weekday TEXT (e.g. "Tuesday") names the actual day directly — unlike the
  // numeric e/c digit, which is weekStartsOn-relative, the parsed weekday
  // here just needs converting from ISO to setDay's Sunday-based 0-6, with
  // no weekStartsOn shift (verified directly against real date-fns:
  // parse('Tue', 'eee', ref) lands on an actual Tuesday regardless of
  // weekStartsOn).
  return mapValue(parseWeekdayText(dateString, token, context.locale), (value) =>
    isoDayOfWeekToSundayBased(value)
  );
}

function applyLocalDayValue(
  fields: WorkingFields,
  value: number,
  weekStartsOn: number
): WorkingFields {
  const result = setDay(scratchPlainDate(fields), value, {
    weekStartsOn: weekStartsOn as WeekStartsOn,
  });
  return zeroTimeOfDay(withPlainDate(fields, result));
}

function parseIsoDayToken(dateString: string, token: string, locale: Intl.LocalesArgument) {
  if (token === 'io') {
    return matchOrdinalNumberAsResult(dateString);
  }
  if (token.length <= 2) {
    return parseNDigits(token.length, dateString);
  }
  // parseWeekdayText already returns an ISO (Monday=1...Sunday=7) value,
  // exactly what setISODay expects — no conversion needed (unlike the e/c/E
  // tokens, which need an ISO -> Sunday-based conversion for setDay).
  return parseWeekdayText(dateString, token, locale);
}

function applyIsoDayValue(fields: WorkingFields, value: number): WorkingFields {
  const result = setISODay(scratchPlainDate(fields), value);
  return zeroTimeOfDay(withPlainDate(fields, result));
}

function parseQuarterToken(dateString: string, token: string): ParseResult<number> | null {
  if (token.endsWith('o')) {
    return matchOrdinalNumberAsResult(dateString);
  }
  if (token.length <= 2) {
    return parseNDigits(token.length, dateString);
  }
  if (token.length === 3) {
    return (
      toParseResult(matchQuarter(dateString, 'abbreviated')) ??
      toParseResult(matchQuarter(dateString, 'narrow'))
    );
  }
  if (token.length === 5) {
    return toParseResult(matchQuarter(dateString, 'narrow'));
  }
  return (
    toParseResult(matchQuarter(dateString, 'wide')) ??
    toParseResult(matchQuarter(dateString, 'abbreviated')) ??
    toParseResult(matchQuarter(dateString, 'narrow'))
  );
}

function applyQuarterValue(fields: WorkingFields, value: number): WorkingFields {
  return zeroTimeOfDay({ ...fields, month: (value - 1) * 3 + 1, day: 1 });
}

function parseDayPeriodToken(dateString: string, token: string): ParseResult<string> | null {
  if (token.length === 5) {
    return toParseResult(matchDayPeriod(dateString, 'narrow'));
  }
  if (token.length === 3) {
    return (
      toParseResult(matchDayPeriod(dateString, 'abbreviated')) ??
      toParseResult(matchDayPeriod(dateString, 'narrow'))
    );
  }
  return (
    toParseResult(matchDayPeriod(dateString, 'wide')) ??
    toParseResult(matchDayPeriod(dateString, 'abbreviated')) ??
    toParseResult(matchDayPeriod(dateString, 'narrow'))
  );
}

function applyHour(fields: WorkingFields, hour: number): WorkingFields {
  return { ...fields, hour, minute: 0, second: 0, millisecond: 0 };
}

export const tokenSpecs: Record<string, TokenSpec> = {
  G: {
    priority: 140,
    incompatibleTokens: ['R', 'u', 't', 'T'],
    parse: (dateString, token, { locale }) => {
      if (token === 'GGGGG') {
        return toParseResult(matchEra(dateString, 'narrow', locale));
      }
      if (token === 'GGGG') {
        return (
          toParseResult(matchEra(dateString, 'long', locale)) ??
          toParseResult(matchEra(dateString, 'short', locale)) ??
          toParseResult(matchEra(dateString, 'narrow', locale))
        );
      }
      return (
        toParseResult(matchEra(dateString, 'short', locale)) ??
        toParseResult(matchEra(dateString, 'narrow', locale))
      );
    },
    apply: (fields, value, flags) => {
      flags.era = value as 0 | 1;
      return zeroTimeOfDay({ ...fields, year: value as number, month: 1, day: 1 });
    },
  },

  y: {
    priority: 130,
    incompatibleTokens: ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token) => parseYearToken(dateString, token),
    validate: (_fields, value) =>
      (value as YearValue).isTwoDigitYear || (value as YearValue).year > 0,
    apply: (fields, value, flags) => applyYearValue(fields, value as YearValue, flags, 1),
  },

  Y: {
    priority: 130,
    incompatibleTokens: ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T'],
    parse: (dateString, token) => parseYearToken(dateString, token),
    validate: (_fields, value) =>
      (value as YearValue).isTwoDigitYear || (value as YearValue).year > 0,
    apply: (fields, value, flags, context) => {
      const yearValue = value as YearValue;
      const currentWeekYear = getWeekYearValue(scratchPlainDate(fields), {
        weekStartsOn: context.weekStartsOn as WeekStartsOn,
        firstWeekContainsDate: context.firstWeekContainsDate as FirstWeekContainsDate,
      });
      let next: WorkingFields;
      if (yearValue.isTwoDigitYear) {
        const normalized = normalizeTwoDigitYear(yearValue.year, currentWeekYear);
        next = zeroTimeOfDay({
          ...fields,
          year: normalized,
          month: 1,
          day: context.firstWeekContainsDate,
        });
      } else {
        const year = !('era' in flags) || flags.era === 1 ? yearValue.year : 1 - yearValue.year;
        next = zeroTimeOfDay({ ...fields, year, month: 1, day: context.firstWeekContainsDate });
      }
      const result = startOfWeek(scratchPlainDate(next), {
        weekStartsOn: context.weekStartsOn as WeekStartsOn,
      });
      return withPlainDate(next, result);
    },
  },

  R: {
    priority: 130,
    incompatibleTokens: ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T'],
    parse: (dateString, token) =>
      token === 'R'
        ? parseNDigitsSigned(4, dateString)
        : parseNDigitsSigned(token.length, dateString),
    apply: (fields, value) => {
      const firstWeekOfYear = Temporal.PlainDate.from({ year: value as number, month: 1, day: 4 });
      const result = startOfISOWeek(firstWeekOfYear);
      return zeroTimeOfDay(withPlainDate(fields, result));
    },
  },

  u: {
    priority: 130,
    incompatibleTokens: ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token) =>
      token === 'u'
        ? parseNDigitsSigned(4, dateString)
        : parseNDigitsSigned(token.length, dateString),
    apply: (fields, value) => zeroTimeOfDay({ ...fields, year: value as number, month: 1, day: 1 }),
  },

  Q: {
    priority: 120,
    incompatibleTokens: ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token) => parseQuarterToken(dateString, token),
    validate: (_fields, value) => (value as number) >= 1 && (value as number) <= 4,
    apply: (fields, value) => applyQuarterValue(fields, value as number),
  },
  q: {
    priority: 120,
    incompatibleTokens: ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token) => parseQuarterToken(dateString, token),
    validate: (_fields, value) => (value as number) >= 1 && (value as number) <= 4,
    apply: (fields, value) => applyQuarterValue(fields, value as number),
  },

  M: {
    priority: 110,
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token, { locale }) => parseMonthToken(dateString, token, locale),
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 11,
    apply: (fields, value) => zeroTimeOfDay({ ...fields, month: (value as number) + 1, day: 1 }),
  },
  L: {
    priority: 110,
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token, { locale }) => parseMonthToken(dateString, token, locale),
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 11,
    apply: (fields, value) => zeroTimeOfDay({ ...fields, month: (value as number) + 1, day: 1 }),
  },

  w: {
    priority: 100,
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'w') {
        return parseNumericPattern(numericPatterns.week, dateString);
      }
      if (token === 'wo') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 1 && (value as number) <= 53,
    apply: (fields, value, _flags, context) => {
      const options = {
        weekStartsOn: context.weekStartsOn as WeekStartsOn,
        firstWeekContainsDate: context.firstWeekContainsDate as FirstWeekContainsDate,
      };
      const afterSetWeek = setWeek(scratchPlainDate(fields), value as number, options);
      const result = startOfWeek(afterSetWeek, options);
      return zeroTimeOfDay(withPlainDate(fields, result));
    },
  },

  I: {
    priority: 100,
    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'I') {
        return parseNumericPattern(numericPatterns.week, dateString);
      }
      if (token === 'Io') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 1 && (value as number) <= 53,
    apply: (fields, value) => {
      const afterSetWeek = setISOWeek(scratchPlainDate(fields), value as number);
      const result = startOfISOWeek(afterSetWeek);
      return zeroTimeOfDay(withPlainDate(fields, result));
    },
  },

  d: {
    priority: 90,
    subPriority: 1,
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'd') {
        return parseNumericPattern(numericPatterns.date, dateString);
      }
      if (token === 'do') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (fields, value) => {
      const isLeap = isLeapYearIndex(fields.year);
      // fields.month is always 1-12 (every path that sets it validates that
      // range, and the seed's month comes from a real Date/Temporal value),
      // so the index is always in range; the fallback only satisfies
      // noUncheckedIndexedAccess.
      /* v8 ignore next */
      const max = (isLeap ? daysInMonthLeapYear : daysInMonth)[fields.month - 1] ?? 31;
      return (value as number) >= 1 && (value as number) <= max;
    },
    apply: (fields, value) => zeroTimeOfDay({ ...fields, day: value as number }),
  },

  D: {
    priority: 90,
    subPriority: 1,
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'D' || token === 'DD') {
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      }
      if (token === 'Do') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (fields, value) => {
      const max = isLeapYearIndex(fields.year) ? 366 : 365;
      return (value as number) >= 1 && (value as number) <= max;
    },
    apply: (fields, value) => zeroTimeOfDay({ ...fields, month: 1, day: value as number }),
  },

  E: {
    priority: 90,
    incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T'],
    // E is always text (day-of-week names) — names the actual weekday
    // directly (no weekStartsOn shift), converted from ISO to setDay's
    // Sunday-based 0-6, same as the e/c tokens' own text branch.
    parse: (dateString, token, { locale }) =>
      mapValue(parseWeekdayText(dateString, token, locale), (value) =>
        isoDayOfWeekToSundayBased(value)
      ),
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 6,
    apply: (fields, value, _flags, context) =>
      applyLocalDayValue(fields, value as number, context.weekStartsOn),
  },
  // eslint-disable-next-line id-denylist -- this is the `e` token's key, not a restricted identifier
  e: {
    priority: 90,
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T'],
    parse: (dateString, token, context) => parseLocalDayToken(dateString, token, context),
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 6,
    apply: (fields, value, _flags, context) =>
      applyLocalDayValue(fields, value as number, context.weekStartsOn),
  },
  c: {
    priority: 90,
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T'],
    parse: (dateString, token, context) => parseLocalDayToken(dateString, token, context),
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 6,
    apply: (fields, value, _flags, context) =>
      applyLocalDayValue(fields, value as number, context.weekStartsOn),
  },
  i: {
    priority: 90,
    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T'],
    parse: (dateString, token, { locale }) => parseIsoDayToken(dateString, token, locale),
    validate: (_fields, value) => (value as number) >= 1 && (value as number) <= 7,
    apply: (fields, value) => applyIsoDayValue(fields, value as number),
  },

  a: {
    priority: 80,
    incompatibleTokens: ['b', 'B', 'H', 'k', 't', 'T'],
    parse: (dateString, token, { locale }) => {
      if (token.length === 5) {
        return (
          toParseResult(matchAmPm(dateString, locale)) ??
          toParseResult(matchDayPeriod(dateString, 'narrow'))
        );
      }
      if (token.length <= 3) {
        return (
          toParseResult(matchAmPm(dateString, locale)) ??
          toParseResult(matchDayPeriod(dateString, 'narrow'))
        );
      }
      return (
        toParseResult(matchAmPm(dateString, locale)) ??
        toParseResult(matchDayPeriod(dateString, 'wide')) ??
        toParseResult(matchDayPeriod(dateString, 'abbreviated')) ??
        toParseResult(matchDayPeriod(dateString, 'narrow'))
      );
    },
    apply: (fields, value) => applyHour(fields, dayPeriodEnumToHours(value as string)),
  },
  b: {
    priority: 80,
    incompatibleTokens: ['a', 'B', 'H', 'k', 't', 'T'],
    parse: (dateString, token) => parseDayPeriodToken(dateString, token),
    apply: (fields, value) => applyHour(fields, dayPeriodEnumToHours(value as string)),
  },
  B: {
    priority: 80,
    incompatibleTokens: ['a', 'b', 't', 'T'],
    parse: (dateString, token) => parseDayPeriodToken(dateString, token),
    apply: (fields, value) => applyHour(fields, dayPeriodEnumToHours(value as string)),
  },

  h: {
    priority: 70,
    incompatibleTokens: ['H', 'K', 'k', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'h') {
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      }
      if (token === 'ho') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 1 && (value as number) <= 12,
    apply: (fields, value) => {
      const hourValue = value as number;
      const isPM = fields.hour >= 12;
      if (isPM && hourValue < 12) {
        return applyHour(fields, hourValue + 12);
      }
      if (!isPM && hourValue === 12) {
        return applyHour(fields, 0);
      }
      return applyHour(fields, hourValue);
    },
  },
  H: {
    priority: 70,
    incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'H') {
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      }
      if (token === 'Ho') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 23,
    apply: (fields, value) => applyHour(fields, value as number),
  },
  K: {
    priority: 70,
    incompatibleTokens: ['h', 'H', 'k', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'K') {
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      }
      if (token === 'Ko') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 11,
    apply: (fields, value) => {
      const hourValue = value as number;
      const isPM = fields.hour >= 12;
      return applyHour(fields, isPM && hourValue < 12 ? hourValue + 12 : hourValue);
    },
  },
  k: {
    priority: 70,
    incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T'],
    parse: (dateString, token) => {
      if (token === 'k') {
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      }
      if (token === 'ko') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 1 && (value as number) <= 24,
    apply: (fields, value) => {
      const hourValue = value as number;
      // The `: hourValue` branch is unreachable: validate already guarantees
      // hourValue <= 24, mirroring date-fns' own Hour1To24Parser.set(), which
      // carries the identical (also-dead) ternary.
      /* v8 ignore next */
      return applyHour(fields, hourValue <= 24 ? hourValue % 24 : hourValue);
    },
  },

  m: {
    priority: 60,
    incompatibleTokens: ['t', 'T'],
    parse: (dateString, token) => {
      if (token === 'm') {
        return parseNumericPattern(numericPatterns.minute, dateString);
      }
      if (token === 'mo') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 59,
    apply: (fields, value) => ({ ...fields, minute: value as number, second: 0, millisecond: 0 }),
  },

  s: {
    priority: 50,
    incompatibleTokens: ['t', 'T'],
    parse: (dateString, token) => {
      if (token === 's') {
        return parseNumericPattern(numericPatterns.second, dateString);
      }
      if (token === 'so') {
        return matchOrdinalNumberAsResult(dateString);
      }
      return parseNDigits(token.length, dateString);
    },
    validate: (_fields, value) => (value as number) >= 0 && (value as number) <= 59,
    apply: (fields, value) => ({ ...fields, second: value as number, millisecond: 0 }),
  },

  S: {
    priority: 30,
    incompatibleTokens: ['t', 'T'],
    parse: (dateString, token) =>
      mapValue(parseNDigits(token.length, dateString), (value) =>
        Math.trunc(value * 10 ** (-token.length + 3))
      ),
    apply: (fields, value) => ({ ...fields, millisecond: value as number }),
  },

  X: {
    priority: 10,
    incompatibleTokens: ['t', 'T', 'x'],
    parse: (dateString, token) => {
      switch (token) {
        case 'X': {
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        }
        case 'XX': {
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        }
        case 'XXXX': {
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        }
        case 'XXXXX': {
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        }
        default: {
          return parseTimezonePattern(timezonePatterns.extended, dateString);
        }
      }
    },
    apply: (fields, value, flags) => {
      // Unreachable: t/T have incompatibleTokens: '*', so neither can ever
      // co-occur with X/x in a format string that got this far — mirrors
      // date-fns' own ISOTimezoneWithZParser/ISOTimezoneParser, which carry
      // the identical (also-dead) guard for the same reason.
      /* v8 ignore next 2 */
      if (flags.timestampIsSet) {
        return fields;
      }
      return { ...fields, offsetMinutes: (value as number) / 60_000 };
    },
  },
  x: {
    priority: 10,
    incompatibleTokens: ['t', 'T', 'X'],
    parse: (dateString, token) => {
      switch (token) {
        case 'x': {
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        }
        case 'xx': {
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        }
        case 'xxxx': {
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        }
        case 'xxxxx': {
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        }
        default: {
          return parseTimezonePattern(timezonePatterns.extended, dateString);
        }
      }
    },
    apply: (fields, value, flags) => {
      // Unreachable: t/T have incompatibleTokens: '*', so neither can ever
      // co-occur with X/x in a format string that got this far — mirrors
      // date-fns' own ISOTimezoneWithZParser/ISOTimezoneParser, which carry
      // the identical (also-dead) guard for the same reason.
      /* v8 ignore next 2 */
      if (flags.timestampIsSet) {
        return fields;
      }
      return { ...fields, offsetMinutes: (value as number) / 60_000 };
    },
  },

  t: {
    priority: 40,
    incompatibleTokens: '*',
    parse: (dateString) => parseAnyDigitsSigned(dateString),
    apply: (fields, value, flags) => {
      flags.timestampIsSet = true;
      return { ...fields, epochMilliseconds: (value as number) * 1000 };
    },
  },
  T: {
    priority: 20,
    incompatibleTokens: '*',
    parse: (dateString) => parseAnyDigitsSigned(dateString),
    apply: (fields, value, flags) => {
      flags.timestampIsSet = true;
      return { ...fields, epochMilliseconds: value as number };
    },
  },
};
