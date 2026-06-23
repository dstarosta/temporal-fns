import {
  resolveFirstWeekContainsDate,
  resolveLocale,
  resolveWeekStartsOn,
} from './helpers/default-options.js';
import { getDateTimeFields } from './helpers/format-fields.js';
import {
  assembleDate,
  assemblePlainDate,
  assemblePlainDateTime,
  assembleZonedDateTime,
} from './helpers/parse/assemble.js';
import { applySetters, type FieldSetter, type WorkingFields } from './helpers/parse/setters.js';
import {
  isProtectedDayOfYearToken,
  isProtectedWeekYearToken,
  expandLongTokens,
  tokenizeParseFormat,
  warnOrThrowProtectedParseToken,
} from './helpers/parse/tokenize.js';
import { tokenSpecs, type TokenParseContext } from './helpers/parse/token-specs.js';

/**
 * The {@link parse} function options.
 */
export interface ParseOptions {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}

export interface ParseTemporalOptions<
  T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
> extends ParseOptions {
  in: new (...args: never[]) => T;
}

export type ParseZonedDateTimeOptions = ParseTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};

type ParseAnyOptions =
  | ParseOptions
  | ParseTemporalOptions<Temporal.PlainDate>
  | ParseTemporalOptions<Temporal.PlainDateTime>
  | ParseZonedDateTimeOptions;

const timeTokenChars = new Set(['h', 'H', 'K', 'k', 'm', 's', 'S', 'a', 'b', 'B']);

function hasTimeToken(usedTokenChars: Set<string>): boolean {
  return [...usedTokenChars].some((tokenChar) => timeTokenChars.has(tokenChar));
}

interface ParseCoreResult {
  fields: WorkingFields;
  usedTokenChars: Set<string>;
}

function parseCore(
  dateStr: string,
  formatStr: string,
  seed: WorkingFields,
  context: TokenParseContext,
  options: ParseOptions
): ParseCoreResult | undefined {
  if (!formatStr) {
    return dateStr ? undefined : { fields: seed, usedTokenChars: new Set() };
  }

  const expanded = expandLongTokens(formatStr);
  const parts = tokenizeParseFormat(expanded, (tokenChar) => tokenChar in tokenSpecs);
  const usedTokens: { tokenChar: string; fullToken: string }[] = [];
  const setters: FieldSetter[] = [];
  let rest = dateStr;

  for (const part of parts) {
    if (!part.isToken) {
      const literal = part.value === "'" ? "'" : part.value;
      if (!rest.startsWith(literal)) {
        return undefined;
      }
      rest = rest.slice(literal.length);
      continue;
    }

    const token = part.value;
    // token is always non-empty here: tokenizeParseFormat only marks a part
    // isToken:true after its regex matched at least one character (same
    // guarantee format.ts's tokenizeFormat relies on) — the fallback only
    // satisfies noUncheckedIndexedAccess.
    /* v8 ignore next */
    const tokenChar = token[0] ?? '';

    if (
      (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) ||
      (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token))
    ) {
      warnOrThrowProtectedParseToken(token, formatStr);
    }

    const spec = tokenSpecs[tokenChar];
    /* v8 ignore next 3 */
    if (!spec) {
      return undefined;
    }

    if (spec.incompatibleTokens === '*' && usedTokens.length > 0) {
      throw new RangeError(
        `The format string mustn't contain \`${token}\` and any other token at the same time`
      );
    }
    const conflict = usedTokens.find(
      (used) =>
        (Array.isArray(spec.incompatibleTokens) &&
          spec.incompatibleTokens.includes(used.tokenChar)) ||
        used.tokenChar === tokenChar
    );
    if (conflict) {
      throw new RangeError(
        `The format string mustn't contain \`${conflict.fullToken}\` and \`${token}\` at the same time`
      );
    }

    const result = spec.parse(rest, token, context);
    if (!result) {
      return undefined;
    }

    usedTokens.push({ tokenChar, fullToken: token });
    const validateSpec = spec.validate;
    const setter: FieldSetter = {
      tokenChar,
      priority: spec.priority,
      subPriority: spec.subPriority ?? 0,
      apply: (fields, flags) => spec.apply(fields, result.value, flags, context),
    };
    if (validateSpec) {
      setter.validate = (fields) => validateSpec(fields, result.value);
    }
    setters.push(setter);
    rest = result.rest;
  }

  if (rest.length > 0 && /\S/.test(rest)) {
    return undefined;
  }

  const fields = applySetters(seed, setters);
  if (!fields) {
    return undefined;
  }

  return { fields, usedTokenChars: new Set(usedTokens.map((used) => used.tokenChar)) };
}

function buildContext(options: ParseOptions | undefined): TokenParseContext {
  return {
    locale: resolveLocale(options?.locale),
    weekStartsOn: resolveWeekStartsOn(options?.weekStartsOn),
    firstWeekContainsDate: resolveFirstWeekContainsDate(options?.firstWeekContainsDate),
  };
}

function seedFields(referenceDate: Date): WorkingFields {
  const fields = getDateTimeFields(referenceDate);
  return { ...fields, offsetMinutes: undefined, epochMilliseconds: undefined };
}

/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * The characters wrapped between two single quote characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real'
 * single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Values will be assigned to the date in the descending order of priority: years, then months and
 * weeks, then days, then hours, minutes and seconds, then milliseconds. Units of an equal priority
 * overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a
 * year), the values will be taken from `referenceDate`, which works as a context of parsing.
 *
 * If `formatStr` matches with `dateStr` but doesn't provide tokens, `referenceDate` is returned
 * (with the time set to midnight).
 *
 * If parsing fails, an invalid `Date` (whose time value is `NaN`) is returned.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options
 *
 * @returns The parsed date
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * const result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 */
export function parse(
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
  options?: ParseOptions
): Date;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a `Temporal.PlainDate`.
 *
 * Throws a `TypeError` if `formatStr` contains any time-of-day token (hour, minute, second,
 * fraction of a second, AM/PM, or day period), since a `Temporal.PlainDate` has no time
 * component.
 *
 * @typeParam T - `Temporal.PlainDate`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.PlainDate`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 * @throws `formatStr` contains a time-of-day token
 */
export function parse(
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
  options: ParseTemporalOptions<Temporal.PlainDate>
): Temporal.PlainDate | undefined;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a
 * `Temporal.PlainDateTime`.
 *
 * Any timezone offset or Unix timestamp token (`X`, `x`, `t`, `T`) parsed from `dateStr` is
 * discarded, since a `Temporal.PlainDateTime` has no time zone to apply it to.
 *
 * @typeParam T - `Temporal.PlainDateTime`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.PlainDateTime`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 */
export function parse(
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
  options: ParseTemporalOptions<Temporal.PlainDateTime>
): Temporal.PlainDateTime | undefined;
/**
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string, as a
 * `Temporal.ZonedDateTime` in the given `options.timeZone`.
 *
 * If `dateStr` contains an explicit timezone offset or Unix timestamp token, the resulting
 * instant is authoritative and `options.timeZone` only determines its wall-clock representation.
 * Otherwise the parsed wall-clock fields are attached directly to `options.timeZone`.
 *
 * @typeParam T - `Temporal.ZonedDateTime`. Selected via `options.in`.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - Defines values missing from the parsed `dateStr`
 * @param options - An object with options, including `in: typeof Temporal.ZonedDateTime` and a
 *   required `timeZone`
 *
 * @returns The parsed date, or `undefined` if `dateStr` doesn't match `formatStr`
 *
 * @throws Format string contains an unescaped latin alphabet character
 * @throws The format string mustn't contain two incompatible tokens (e.g. `HH` and `a`) at the
 *   same time
 */
export function parse(
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
  options: ParseZonedDateTimeOptions
): Temporal.ZonedDateTime | undefined;
export function parse(
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
  options?: ParseAnyOptions
): Date | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | undefined {
  const context = buildContext(options);
  const seed = seedFields(referenceDate);

  if (!options || !('in' in options)) {
    if (Number.isNaN(referenceDate.getTime())) {
      return new Date(Number.NaN);
    }
    const resolved = parseCore(dateStr, formatStr, seed, context, options ?? {});
    if (!resolved) {
      return new Date(Number.NaN);
    }
    return assembleDate(resolved.fields);
  }

  const resolved = parseCore(dateStr, formatStr, seed, context, options);
  if (!resolved) {
    return undefined;
  }

  if (options.in === Temporal.PlainDate) {
    if (hasTimeToken(resolved.usedTokenChars)) {
      throw new TypeError('Cannot parse a time-of-day token into a Temporal.PlainDate.');
    }
    return assemblePlainDate(resolved.fields);
  }
  if (options.in === Temporal.PlainDateTime) {
    return assemblePlainDateTime(resolved.fields);
  }
  if (options.in === Temporal.ZonedDateTime && 'timeZone' in options) {
    return assembleZonedDateTime(resolved.fields, options.timeZone);
  }
  return undefined;
}
