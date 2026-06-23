import { parseISOCore } from './helpers/parse-iso-core.js';

/**
 * The {@link parseISO} function options.
 */
export interface ParseISOOptions {
  additionalDigits?: 0 | 1 | 2;
}

export interface ParseISOTemporalOptions<
  T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
> extends ParseISOOptions {
  in: new (...args: never[]) => T;
}

export type ParseISOZonedDateTimeOptions = ParseISOTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};

/**
 * @summary Parse ISO string into a `Date`.
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of `Date`.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or the values are
 * invalid, it returns an invalid `Date` (whose time value is `NaN`).
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 */
export function parseISOValue(argument: string, options?: ParseISOOptions): Date {
  const invalidDate = () => new Date(Number.NaN);

  if (typeof argument !== 'string') {
    return invalidDate();
  }

  const additionalDigits = options?.additionalDigits ?? 2;
  const fields = parseISOCore(argument, additionalDigits);
  if (!fields) {
    return invalidDate();
  }

  if (fields.offsetMilliseconds === undefined) {
    const result = new Date(0);
    result.setFullYear(fields.year, fields.month - 1, fields.day);
    result.setHours(fields.hour, fields.minute, fields.second, fields.millisecond);
    return result;
  }

  const utcTimestamp = Date.UTC(
    fields.year,
    fields.month - 1,
    fields.day,
    fields.hour,
    fields.minute,
    fields.second,
    fields.millisecond
  );
  return new Date(utcTimestamp + fields.offsetMilliseconds);
}

export function parseISOPlainDateTime(
  argument: string,
  options?: ParseISOOptions
): Temporal.PlainDateTime | undefined {
  if (typeof argument !== 'string') {
    return undefined;
  }

  const additionalDigits = options?.additionalDigits ?? 2;
  const fields = parseISOCore(argument, additionalDigits);
  if (!fields) {
    return undefined;
  }

  return Temporal.PlainDateTime.from({
    year: fields.year,
    month: fields.month,
    day: fields.day,
    hour: fields.hour,
    minute: fields.minute,
    second: fields.second,
    millisecond: fields.millisecond,
  });
}

export function parseISOPlainDate(
  argument: string,
  options?: ParseISOOptions
): Temporal.PlainDate | undefined {
  return parseISOPlainDateTime(argument, options)?.toPlainDate();
}

export function parseISOZonedDateTime(
  argument: string,
  options: ParseISOOptions & { timeZone: string }
): Temporal.ZonedDateTime | undefined {
  if (typeof argument !== 'string') {
    return undefined;
  }

  const additionalDigits = options.additionalDigits ?? 2;
  const fields = parseISOCore(argument, additionalDigits);
  if (!fields) {
    return undefined;
  }

  const plainDateTime = Temporal.PlainDateTime.from({
    year: fields.year,
    month: fields.month,
    day: fields.day,
    hour: fields.hour,
    minute: fields.minute,
    second: fields.second,
    millisecond: fields.millisecond,
  });

  if (fields.offsetMilliseconds === undefined) {
    return plainDateTime.toZonedDateTime(options.timeZone);
  }

  const utcInstant = Temporal.Instant.fromEpochMilliseconds(
    Date.UTC(
      fields.year,
      fields.month - 1,
      fields.day,
      fields.hour,
      fields.minute,
      fields.second,
      fields.millisecond
    ) + fields.offsetMilliseconds
  );
  return utcInstant.toZonedDateTimeISO(options.timeZone);
}

type ParseISOAnyOptions =
  | ParseISOOptions
  | ParseISOTemporalOptions<Temporal.PlainDate>
  | ParseISOTemporalOptions<Temporal.PlainDateTime>
  | ParseISOZonedDateTimeOptions;

/**
 * @summary Parse ISO string.
 *
 * @description
 * Parse the given string in ISO 8601 format.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * Without `options.in`, returns a `Date` in the local time zone (an invalid `Date`, whose time
 * value is `NaN`, if the string cannot be parsed). With `options.in` set to a Temporal class
 * constructor, returns an instance of that class, or `undefined` if the string cannot be parsed.
 *
 * @param string - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
export function parseISO(string: string, options?: ParseISOOptions): Date;
export function parseISO(
  string: string,
  options: ParseISOTemporalOptions<Temporal.PlainDate>
): Temporal.PlainDate | undefined;
export function parseISO(
  string: string,
  options: ParseISOTemporalOptions<Temporal.PlainDateTime>
): Temporal.PlainDateTime | undefined;
export function parseISO(
  string: string,
  options: ParseISOZonedDateTimeOptions
): Temporal.ZonedDateTime | undefined;
export function parseISO(
  string: string,
  options?: ParseISOAnyOptions
): Date | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | undefined {
  if (!options || !('in' in options)) {
    return parseISOValue(string, options);
  }

  if (options.in === Temporal.PlainDate) {
    return parseISOPlainDate(string, options);
  }

  if (options.in === Temporal.PlainDateTime) {
    return parseISOPlainDateTime(string, options);
  }

  if (options.in === Temporal.ZonedDateTime && 'timeZone' in options) {
    return parseISOZonedDateTime(string, options);
  }

  return undefined;
}
