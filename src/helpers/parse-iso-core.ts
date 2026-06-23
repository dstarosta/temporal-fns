const millisecondsInHour = 3_600_000;
const millisecondsInMinute = 60_000;

export interface ParsedISOFields {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  offsetMilliseconds: number | undefined;
}

const patterns = {
  dateTimeDelimiter: /[ T]/,
  timeZoneDelimiter: /[ z]/i,
  // eslint-disable-next-line sonarjs/super-linear-regex -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
  timezone: /([+Z-].*)$/,
};

// eslint-disable-next-line sonarjs/regex-complexity -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
const dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d))?|)$/;
// eslint-disable-next-line sonarjs/regex-complexity -- ported verbatim from date-fns for exact behavioral parity; "simplifying" it risks subtly changing what matches
const timeRegex = /^(\d{2}(?:[,.]\d*)?)(?::?(\d{2}(?:[,.]\d*)?))?(?::?(\d{2}(?:[,.]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

interface SplitDateStrings {
  date?: string;
  time?: string;
  timezone?: string;
}

function splitDateString(dateString: string): SplitDateStrings {
  const dateStrings: SplitDateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString: string | undefined;

  if (array.length > 2) {
    return dateStrings;
  }

  // String.prototype.split always returns at least one element, so this
  // fallback only satisfies noUncheckedIndexedAccess and never actually runs.
  /* v8 ignore next */
  const first = array[0] ?? '';
  if (/:/.test(first)) {
    timeString = first;
  } else {
    dateStrings.date = first;
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      // Same split-always-returns-an-element reasoning as `first` above.
      /* v8 ignore next */
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0] ?? '';
      timeString = dateString.slice(dateStrings.date.length);
    }
  }

  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token?.[1] === undefined) {
      dateStrings.time = timeString;
    } else {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    }
  }

  return dateStrings;
}

interface ParsedYear {
  year: number;
  restDateString: string;
}

function parseYear(dateString: string, additionalDigits: number): ParsedYear {
  const regex = new RegExp(
    String.raw`^(?:(\d{4}|[+-]\d{${4 + additionalDigits}})|(\d{2}|[+-]\d{${2 + additionalDigits}})$)`
  );

  const captures = regex.exec(dateString);
  if (!captures) {
    return { year: Number.NaN, restDateString: '' };
  }

  const yearCapture = captures[1];
  const centuryCapture = captures[2];
  const year = yearCapture === undefined ? null : Number.parseInt(yearCapture, 10);
  const century = centuryCapture === undefined ? null : Number.parseInt(centuryCapture, 10);

  // The regex's top-level alternation guarantees exactly one of
  // yearCapture/centuryCapture is defined whenever `captures` matched at
  // all, so the `?? Number.NaN` / `?? ''` fallbacks below only satisfy
  // noUncheckedIndexedAccess and never actually run.
  return {
    /* v8 ignore next */
    year: century === null ? (year ?? Number.NaN) : century * 100,
    /* v8 ignore next */
    restDateString: dateString.slice((yearCapture ?? centuryCapture ?? '').length),
  };
}

function parseDateUnit(value: string | undefined): number {
  return value ? Number.parseInt(value, 10) : 1;
}

const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year: number, month: number, date: number): boolean {
  return (
    month >= 0 &&
    month <= 11 &&
    date >= 1 &&
    date <= (daysInMonths[month] ?? (isLeapYearIndex(year) ? 29 : 28))
  );
}

function validateDayOfYearDate(year: number, dayOfYear: number): boolean {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(week: number, day: number): boolean {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function dayOfISOWeekYear(isoWeekYear: number, week: number, day: number): Date {
  const date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

function parseDate(dateString: string, year: number): Date {
  if (Number.isNaN(year)) {
    return new Date(Number.NaN);
  }

  const captures = dateRegex.exec(dateString);
  if (!captures) {
    return new Date(Number.NaN);
  }

  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(week, dayOfWeek)) {
      return new Date(Number.NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  }

  const date = new Date(0);
  if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
    return new Date(Number.NaN);
  }
  date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
  return date;
}

function parseTimeUnit(value: string | undefined): number {
  return (value && Number.parseFloat(value.replace(',', '.'))) || 0;
}

function validateTime(hours: number, minutes: number, seconds: number): boolean {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function parseTime(timeString: string): number {
  const captures = timeRegex.exec(timeString);
  if (!captures) {
    return Number.NaN;
  }

  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return Number.NaN;
  }

  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1000;
}

function validateTimezone(minutes: number): boolean {
  return minutes >= 0 && minutes <= 59;
}

// Sign is inverted from how the offset reads in the string: "+02:00" yields
// -7_200_000 here, because that's the adjustment to apply to the wall-clock
// UTC-equivalent timestamp to land on the real UTC instant (parse-iso.ts adds
// this value when reconstructing the Date/ZonedDateTime instant).
function parseTimezone(timezoneString: string): number {
  if (timezoneString === 'Z') {
    return 0;
  }

  const captures = timezoneRegex.exec(timezoneString);
  if (!captures) {
    return 0;
  }

  const signCapture = captures[1];
  const hoursCapture = captures[2];
  const sign = signCapture === '+' ? -1 : 1;
  // hoursCapture is a mandatory (non-optional) capture group in timezoneRegex,
  // so it's always defined once `captures` matched at all; the fallback only
  // exists to satisfy noUncheckedIndexedAccess and is unreachable in practice.
  /* v8 ignore next */
  const hours = Number.parseInt(hoursCapture ?? '0', 10);
  const minutes = (captures[3] && Number.parseInt(captures[3], 10)) || 0;

  if (!validateTimezone(minutes)) {
    return Number.NaN;
  }

  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}

// Shared by the Date overload (byte-exact date-fns port) and the Temporal
// overloads: parses into UTC-timestamp-derived wall-clock fields, plus the
// raw offset in milliseconds when the string carried one (undefined when it
// didn't, which is the case the two families of overload handle very
// differently — see parse-iso.ts).
export function parseISOCore(
  argument: string,
  additionalDigits: number
): ParsedISOFields | undefined {
  const dateStrings = splitDateString(argument);

  let date: Date | undefined;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || Number.isNaN(+date)) {
    return undefined;
  }

  const timestamp = +date;
  let time = 0;
  let offsetMilliseconds: number | undefined;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (Number.isNaN(time)) {
      return undefined;
    }
  }

  if (dateStrings.timezone) {
    offsetMilliseconds = parseTimezone(dateStrings.timezone);
    if (Number.isNaN(offsetMilliseconds)) {
      return undefined;
    }
  }

  const combined = new Date(timestamp + time);
  return {
    year: combined.getUTCFullYear(),
    month: combined.getUTCMonth() + 1,
    day: combined.getUTCDate(),
    hour: combined.getUTCHours(),
    minute: combined.getUTCMinutes(),
    second: combined.getUTCSeconds(),
    millisecond: combined.getUTCMilliseconds(),
    offsetMilliseconds,
  };
}
