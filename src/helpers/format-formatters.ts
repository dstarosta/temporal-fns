import { addLeadingZeros, getDateTimeFields, getOffsetMinutes } from './format-fields.js';
import { getISOWeekValue, getISOWeekYearValue } from './iso-week.js';
import { getWordPart } from './intl-words.js';
import { getWeekValueResolved, getWeekYearValueResolved } from './local-week.js';
import { toEpochMilliseconds } from './to-epoch-milliseconds.js';
import { isoDayOfWeekToSundayBased } from './week.js';
import { type DateLike } from '../types.js';

// weekStartsOn/firstWeekContainsDate are already fully resolved (defaulted)
// by the time a FormatterContext is built, so they're plain numbers here —
// unlike LocalWeekOptions' fields, which are optional narrow unions before
// resolution.
export interface FormatterContext {
  locale: Intl.LocalesArgument;
  weekStartsOn: number;
  firstWeekContainsDate: number;
}

export type Formatter = (date: Date | DateLike, token: string, context: FormatterContext) => string;

// en-US is the default/only built-in locale (per the project's
// locale-aware-via-Intl design): word lookups go through Intl.DateTimeFormat
// wherever it has a native option (month/weekday/era/dayPeriod names).
// Ordinal suffixes and quarter names have no Intl.DateTimeFormat option at
// all, so they're the only hardcoded (en-US) word data in this module.
const ordinalSuffixes: Record<Intl.LDMLPluralRule, string> = {
  zero: 'th',
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: 'th',
  other: 'th',
};

const enUSOrdinalRules = new Intl.PluralRules('en-US', { type: 'ordinal' });

function ordinalNumber(number: number): string {
  return String(number) + ordinalSuffixes[enUSOrdinalRules.select(number)];
}

export const quarterNames = {
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  narrow: ['1', '2', '3', '4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
};

function quarterName(width: keyof typeof quarterNames, quarterNumber: number): string {
  const names = quarterNames[width];
  // quarterNumber is always 1-4 (derived from a valid calendar month), so the
  // index is always in range; the fallback only satisfies noUncheckedIndexedAccess.
  /* v8 ignore next */
  return names[quarterNumber - 1] ?? '';
}

function getQuarterFromMonth(month: number): number {
  return Math.trunc((month - 1) / 3) + 1;
}

// Intl's weekday widths are long/short/narrow; date-fns' 2-letter EEEEEE width
// has no Intl equivalent, so it's derived from 'short' (e.g. "Tue" -> "Tu"),
// matching en-US exactly.
function shortWeekday(date: Date | DateLike, locale: Intl.LocalesArgument): string {
  return getWordPart(date, locale, { weekday: 'short' }, 'weekday').slice(0, 2);
}

function weekdayWord(date: Date | DateLike, token: string, locale: Intl.LocalesArgument): string {
  if (token.length === 5) {
    return getWordPart(date, locale, { weekday: 'narrow' }, 'weekday');
  }
  if (token.length === 6) {
    return shortWeekday(date, locale);
  }
  if (token.length >= 4) {
    return getWordPart(date, locale, { weekday: 'long' }, 'weekday');
  }
  return getWordPart(date, locale, { weekday: 'short' }, 'weekday');
}

function eraWidth(token: string): 'long' | 'short' | 'narrow' {
  if (token === 'GGGGG') {
    return 'narrow';
  }
  return token.length >= 4 ? 'long' : 'short';
}

function eraWord(date: Date | DateLike, token: string, locale: Intl.LocalesArgument): string {
  return getWordPart(date, locale, { era: eraWidth(token), year: 'numeric' }, 'era');
}

function monthWord(date: Date | DateLike, token: string, locale: Intl.LocalesArgument): string {
  if (token === 'MMM' || token === 'LLL') {
    return getWordPart(date, locale, { month: 'short' }, 'month');
  }
  if (token === 'MMMMM' || token === 'LLLLL') {
    return getWordPart(date, locale, { month: 'narrow' }, 'month');
  }
  return getWordPart(date, locale, { month: 'long' }, 'month');
}

function quarterToken(token: string, month: number): string {
  const quarterNumber = getQuarterFromMonth(month);
  switch (token) {
    case 'Q':
    case 'q': {
      return String(quarterNumber);
    }
    case 'QQ':
    case 'qq': {
      return addLeadingZeros(quarterNumber, 2);
    }
    case 'Qo':
    case 'qo': {
      return ordinalNumber(quarterNumber);
    }
    case 'QQQ':
    case 'qqq': {
      return quarterName('abbreviated', quarterNumber);
    }
    case 'QQQQQ':
    case 'qqqqq': {
      return quarterName('narrow', quarterNumber);
    }
    default: {
      return quarterName('wide', quarterNumber);
    }
  }
}

// V8's Intl dayPeriod never reports "midnight" (only "noon"), and date-fns'
// noon/midnight split (b) and morning/afternoon/evening/night thresholds (B)
// are fixed hour cutoffs, not locale data Intl exposes — so both are
// hardcoded (en-US) words, matching date-fns' own enum exactly.
export const dayPeriodsByWidth: Record<
  'narrow' | 'abbreviated' | 'wide',
  Record<string, string>
> = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night',
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night',
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night',
  },
};

function dayPeriodWord(key: string, width: 'narrow' | 'abbreviated' | 'wide'): string {
  // key is always one of the literal keys above (am/pm/midnight/noon/...),
  // never missing from the table; the fallback only satisfies
  // noUncheckedIndexedAccess.
  /* v8 ignore next */
  return dayPeriodsByWidth[width][key] ?? '';
}

// AM/PM (a token): plain AM/PM via Intl's hour12 dayPeriod.
function aDayPeriod(date: Date | DateLike, token: string, locale: Intl.LocalesArgument): string {
  const value = getWordPart(date, locale, { hour: 'numeric', hour12: true }, 'dayPeriod');
  if (token.length <= 2) {
    return value;
  }
  if (token.length === 3) {
    return value.toLowerCase();
  }
  if (token.length === 5) {
    return value.slice(0, 1).toLowerCase();
  }
  return value === 'AM' ? 'a.m.' : 'p.m.';
}

function getBDayPeriodKey(hour: number): string {
  if (hour === 12) {
    return 'noon';
  }
  if (hour === 0) {
    return 'midnight';
  }
  return hour / 12 >= 1 ? 'pm' : 'am';
}

// AM, PM, noon, midnight (b token).
function bDayPeriod(date: Date | DateLike, token: string): string {
  const key = getBDayPeriodKey(getDateTimeFields(date).hour);
  if (token.length === 5) {
    return dayPeriodWord(key, 'narrow');
  }
  if (token.length === 3) {
    return dayPeriodWord(key, 'abbreviated').toLowerCase();
  }
  if (token.length >= 4) {
    return dayPeriodWord(key, 'wide');
  }
  return dayPeriodWord(key, 'abbreviated');
}

function getFlexibleDayPeriodKey(hour: number): string {
  if (hour >= 17) {
    return 'evening';
  }
  if (hour >= 12) {
    return 'afternoon';
  }
  return hour >= 4 ? 'morning' : 'night';
}

// In the morning/afternoon/evening, at night (B token).
function flexibleDayPeriod(date: Date | DateLike, token: string): string {
  const key = getFlexibleDayPeriodKey(getDateTimeFields(date).hour);
  if (token.length === 5) {
    return dayPeriodWord(key, 'narrow');
  }
  if (token.length >= 4) {
    return dayPeriodWord(key, 'wide');
  }
  return dayPeriodWord(key, 'abbreviated');
}

function formatTimezone(offsetMinutes: number, delimiter = ''): string {
  const sign = offsetMinutes > 0 ? '-' : '+';
  const absOffset = Math.abs(offsetMinutes);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

function formatTimezoneShort(offsetMinutes: number, delimiter = ''): string {
  const sign = offsetMinutes > 0 ? '-' : '+';
  const absOffset = Math.abs(offsetMinutes);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offsetMinutes: number): string {
  if (offsetMinutes % 60 === 0) {
    const sign = offsetMinutes > 0 ? '-' : '+';
    return sign + addLeadingZeros(Math.abs(offsetMinutes) / 60, 2);
  }
  return formatTimezone(offsetMinutes);
}

function getDayOfYearValue(date: Date | DateLike): number {
  const fields = getDateTimeFields(date);
  const startOfYear = Temporal.PlainDate.from({ year: fields.year, month: 1, day: 1 });
  const current = Temporal.PlainDate.from({
    year: fields.year,
    month: fields.month,
    day: fields.day,
  });
  return startOfYear.until(current, { largestUnit: 'days' }).days + 1;
}

function getLocalDayOfWeek(date: Date | DateLike, weekStartsOn: number): number {
  const fields = getDateTimeFields(date);
  const isoDayOfWeek = Temporal.PlainDate.from({
    year: fields.year,
    month: fields.month,
    day: fields.day,
  }).dayOfWeek;
  const sundayBasedDay = isoDayOfWeekToSundayBased(isoDayOfWeek);
  return sundayBasedDay < weekStartsOn
    ? sundayBasedDay - weekStartsOn + 8
    : sundayBasedDay - weekStartsOn + 1;
}

export const formatters: Record<string, Formatter> = {
  G: (date, token, { locale }) => eraWord(date, token, locale),

  y: (date, token) => {
    const fields = getDateTimeFields(date);
    const signedYear = fields.year;
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    if (token === 'yo') {
      return ordinalNumber(year);
    }
    return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
  },

  Y: (date, token, { weekStartsOn, firstWeekContainsDate }) => {
    const signedWeekYear = getWeekYearValueResolved(date, weekStartsOn, firstWeekContainsDate);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === 'YY') {
      return addLeadingZeros(weekYear % 100, 2);
    }
    if (token === 'Yo') {
      return ordinalNumber(weekYear);
    }
    return addLeadingZeros(weekYear, token.length);
  },

  R: (date, token) => addLeadingZeros(getISOWeekYearValue(date), token.length),

  u: (date, token) => addLeadingZeros(getDateTimeFields(date).year, token.length),

  Q: (date, token) => quarterToken(token, getDateTimeFields(date).month),
  q: (date, token) => quarterToken(token, getDateTimeFields(date).month),

  M: (date, token, { locale }) => {
    const fields = getDateTimeFields(date);
    if (token === 'M') {
      return String(fields.month);
    }
    if (token === 'MM') {
      return addLeadingZeros(fields.month, 2);
    }
    if (token === 'Mo') {
      return ordinalNumber(fields.month);
    }
    return monthWord(date, token, locale);
  },

  L: (date, token, { locale }) => {
    const fields = getDateTimeFields(date);
    if (token === 'L') {
      return String(fields.month);
    }
    if (token === 'LL') {
      return addLeadingZeros(fields.month, 2);
    }
    if (token === 'Lo') {
      return ordinalNumber(fields.month);
    }
    return monthWord(date, token, locale);
  },

  w: (date, token, { weekStartsOn, firstWeekContainsDate }) => {
    const week = getWeekValueResolved(date, weekStartsOn, firstWeekContainsDate);
    if (token === 'wo') {
      return ordinalNumber(week);
    }
    return addLeadingZeros(week, token.length);
  },

  I: (date, token) => {
    const isoWeek = getISOWeekValue(date);
    if (token === 'Io') {
      return ordinalNumber(isoWeek);
    }
    return addLeadingZeros(isoWeek, token.length);
  },

  d: (date, token) => {
    const fields = getDateTimeFields(date);
    if (token === 'do') {
      return ordinalNumber(fields.day);
    }
    return addLeadingZeros(fields.day, token.length);
  },

  D: (date, token) => {
    const dayOfYear = getDayOfYearValue(date);
    if (token === 'Do') {
      return ordinalNumber(dayOfYear);
    }
    return addLeadingZeros(dayOfYear, token.length);
  },

  E: (date, token, { locale }) => weekdayWord(date, token, locale),

  // eslint-disable-next-line id-denylist -- this is the `e` token's key, not a restricted identifier
  e: (date, token, { locale, weekStartsOn }) => {
    if (token === 'e' || token === 'ee' || token === 'eo') {
      const localDayOfWeek = getLocalDayOfWeek(date, weekStartsOn);
      if (token === 'e') {
        return String(localDayOfWeek);
      }
      if (token === 'ee') {
        return addLeadingZeros(localDayOfWeek, 2);
      }
      return ordinalNumber(localDayOfWeek);
    }
    return weekdayWord(date, token, locale);
  },

  c: (date, token, { locale, weekStartsOn }) => {
    if (token === 'c' || token === 'cc' || token === 'co') {
      const localDayOfWeek = getLocalDayOfWeek(date, weekStartsOn);
      if (token === 'c') {
        return String(localDayOfWeek);
      }
      if (token === 'co') {
        return ordinalNumber(localDayOfWeek);
      }
      return addLeadingZeros(localDayOfWeek, token.length);
    }
    return weekdayWord(date, token, locale);
  },

  i: (date, token, { locale }) => {
    if (token === 'i' || token === 'ii' || token === 'io') {
      const fields = getDateTimeFields(date);
      const isoDayOfWeek = Temporal.PlainDate.from({
        year: fields.year,
        month: fields.month,
        day: fields.day,
      }).dayOfWeek;
      if (token === 'i') {
        return String(isoDayOfWeek);
      }
      if (token === 'io') {
        return ordinalNumber(isoDayOfWeek);
      }
      return addLeadingZeros(isoDayOfWeek, token.length);
    }
    return weekdayWord(date, token, locale);
  },

  a: (date, token, { locale }) => aDayPeriod(date, token, locale),
  b: (date, token) => bDayPeriod(date, token),
  B: (date, token) => flexibleDayPeriod(date, token),

  h: (date, token) => {
    const fields = getDateTimeFields(date);
    const hours = fields.hour % 12 || 12;
    if (token === 'ho') {
      return ordinalNumber(hours);
    }
    return addLeadingZeros(hours, token.length);
  },

  H: (date, token) => {
    const fields = getDateTimeFields(date);
    if (token === 'Ho') {
      return ordinalNumber(fields.hour);
    }
    return addLeadingZeros(fields.hour, token.length);
  },

  K: (date, token) => {
    const fields = getDateTimeFields(date);
    const hours = fields.hour % 12;
    if (token === 'Ko') {
      return ordinalNumber(hours);
    }
    return addLeadingZeros(hours, token.length);
  },

  k: (date, token) => {
    const fields = getDateTimeFields(date);
    const hours = fields.hour === 0 ? 24 : fields.hour;
    if (token === 'ko') {
      return ordinalNumber(hours);
    }
    return addLeadingZeros(hours, token.length);
  },

  m: (date, token) => {
    const fields = getDateTimeFields(date);
    if (token === 'mo') {
      return ordinalNumber(fields.minute);
    }
    return addLeadingZeros(fields.minute, token.length);
  },

  s: (date, token) => {
    const fields = getDateTimeFields(date);
    if (token === 'so') {
      return ordinalNumber(fields.second);
    }
    return addLeadingZeros(fields.second, token.length);
  },

  S: (date, token) => {
    const fields = getDateTimeFields(date);
    const numberOfDigits = token.length;
    const fractionalSeconds = Math.trunc(fields.millisecond * 10 ** (numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  },

  X: (date, token) => {
    const offsetMinutes = getOffsetMinutes(date);
    if (offsetMinutes === 0) {
      return 'Z';
    }
    if (token === 'X') {
      return formatTimezoneWithOptionalMinutes(offsetMinutes);
    }
    if (token === 'XXXX' || token === 'XX') {
      return formatTimezone(offsetMinutes);
    }
    return formatTimezone(offsetMinutes, ':');
  },

  x: (date, token) => {
    const offsetMinutes = getOffsetMinutes(date);
    if (token === 'x') {
      return formatTimezoneWithOptionalMinutes(offsetMinutes);
    }
    if (token === 'xxxx' || token === 'xx') {
      return formatTimezone(offsetMinutes);
    }
    return formatTimezone(offsetMinutes, ':');
  },

  O: (date, token) => {
    const offsetMinutes = getOffsetMinutes(date);
    if (token === 'O' || token === 'OO' || token === 'OOO') {
      return 'GMT' + formatTimezoneShort(offsetMinutes, ':');
    }
    return 'GMT' + formatTimezone(offsetMinutes, ':');
  },

  z: (date, token) => {
    const offsetMinutes = getOffsetMinutes(date);
    if (token === 'z' || token === 'zz' || token === 'zzz') {
      return 'GMT' + formatTimezoneShort(offsetMinutes, ':');
    }
    return 'GMT' + formatTimezone(offsetMinutes, ':');
  },

  t: (date, token) => addLeadingZeros(Math.trunc(toEpochMilliseconds(date) / 1000), token.length),

  T: (date, token) => addLeadingZeros(toEpochMilliseconds(date), token.length),
};
