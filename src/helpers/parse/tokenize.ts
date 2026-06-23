// Mirrors format.ts's tokenizer/long-format-expansion logic exactly (same
// regex family, same algorithm) — duplicated here rather than imported since
// format.ts's tokenizer is a private, non-exported implementation detail not
// designed for cross-file reuse. Must stay in sync with format.ts if either
// changes (date-fns keeps these as two independently-maintained copies too:
// format.js's formattingTokensRegExp vs parse.js's own).
const formattingTokensRegExp = /[DHIK-MQYc-ehikmqswy]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
// eslint-disable-next-line sonarjs/regex-complexity, sonarjs/super-linear-regex
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[A-Za-z]/;

const dayOfYearTokenRegExp = /^D+$/;
const weekYearTokenRegExp = /^Y+$/;
const throwTokens = new Set(['D', 'DD', 'YY', 'YYYY']);

export function isProtectedDayOfYearToken(token: string): boolean {
  return dayOfYearTokenRegExp.test(token);
}

export function isProtectedWeekYearToken(token: string): boolean {
  return weekYearTokenRegExp.test(token);
}

function protectedTokenMessage(token: string, formatStr: string): string {
  const subject = token[0] === 'Y' ? 'years' : 'days of the month';
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${formatStr}\`) for parsing ${subject}; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

export function warnOrThrowProtectedParseToken(token: string, formatStr: string): void {
  const protectedMessage = protectedTokenMessage(token, formatStr);
  console.warn(protectedMessage);
  if (throwTokens.has(token)) {
    throw new RangeError(protectedMessage);
  }
}

function cleanEscapedString(input: string): string {
  const matches = escapedStringRegExp.exec(input);
  /* v8 ignore next 3 */
  if (!matches) {
    return input;
  }
  /* v8 ignore next */
  return (matches[1] ?? '').replace(doubleQuoteRegExp, "'");
}

type LongFormatWidth = 'short' | 'medium' | 'long' | 'full';

interface LongFormatFn {
  date: (width: LongFormatWidth) => string;
  time: (width: LongFormatWidth) => string;
  dateTime: (width: LongFormatWidth) => string;
}

function dateLongFormat(pattern: string, formatLong: LongFormatFn): string {
  switch (pattern) {
    case 'P': {
      return formatLong.date('short');
    }
    case 'PP': {
      return formatLong.date('medium');
    }
    case 'PPP': {
      return formatLong.date('long');
    }
    default: {
      return formatLong.date('full');
    }
  }
}

function timeLongFormat(pattern: string, formatLong: LongFormatFn): string {
  switch (pattern) {
    case 'p': {
      return formatLong.time('short');
    }
    case 'pp': {
      return formatLong.time('medium');
    }
    case 'ppp': {
      return formatLong.time('long');
    }
    default: {
      return formatLong.time('full');
    }
  }
}

const dateTimeLongPatternRegExp = /(P+)(p+)?/;

function dateTimeLongFormat(pattern: string, formatLong: LongFormatFn): string {
  const matchResult = dateTimeLongPatternRegExp.exec(pattern);
  const datePattern = matchResult?.[1];
  const timePattern = matchResult?.[2];

  if (!timePattern || !datePattern) {
    return dateLongFormat(pattern, formatLong);
  }

  let dateTimeFormatStr: string;
  switch (datePattern) {
    case 'P': {
      dateTimeFormatStr = formatLong.dateTime('short');
      break;
    }
    case 'PP': {
      dateTimeFormatStr = formatLong.dateTime('medium');
      break;
    }
    case 'PPP': {
      dateTimeFormatStr = formatLong.dateTime('long');
      break;
    }
    default: {
      dateTimeFormatStr = formatLong.dateTime('full');
      break;
    }
  }

  return dateTimeFormatStr
    .replace('{{date}}', dateLongFormat(datePattern, formatLong))
    .replace('{{time}}', timeLongFormat(timePattern, formatLong));
}

const dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy',
};

const timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a',
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}',
};

const enUSFormatLong: LongFormatFn = {
  date: (width) => dateFormats[width],
  time: (width) => timeFormats[width],
  dateTime: (width) => dateTimeFormats[width],
};

export function expandLongTokens(formatStr: string): string {
  const matches = formatStr.match(longFormattingTokensRegExp);
  /* v8 ignore next 3 */
  if (!matches) {
    return '';
  }
  return matches
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === 'p' || firstCharacter === 'P') {
        return firstCharacter === 'p'
          ? timeLongFormat(substring, enUSFormatLong)
          : dateTimeLongFormat(substring, enUSFormatLong);
      }
      return substring;
    })
    .join('');
}

export interface ParsePart {
  isToken: boolean;
  value: string;
}

export function tokenizeParseFormat(
  formatStr: string,
  isKnownToken: (tokenChar: string) => boolean
): ParsePart[] {
  const tokens = formatStr.match(formattingTokensRegExp);
  /* v8 ignore next 3 */
  if (!tokens) {
    return [];
  }
  return tokens.map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    /* v8 ignore next */
    const firstCharacter = substring[0] ?? '';
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (isKnownToken(firstCharacter)) {
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
