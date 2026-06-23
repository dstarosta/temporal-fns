// Ported verbatim from date-fns for exact behavioral parity; "simplifying"
// it risks subtly changing what matches.
const jsonDateRegex =
  // eslint-disable-next-line sonarjs/regex-complexity
  /(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/;

export interface ParseJSONTemporalOptions<
  T extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
> {
  in: new (...args: never[]) => T;
}

export type ParseJSONZonedDateTimeOptions = ParseJSONTemporalOptions<Temporal.ZonedDateTime> & {
  timeZone: string;
};

interface ParsedJSONFields {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

// date-fns' parseJSON treats a string with no offset as UTC (unlike
// parseISO, which treats a no-offset string as local wall-clock), and treats
// a string WITH an offset as a real instant to convert. Both cases resolve
// through a UTC timestamp here, so every overload (Date and the Temporal
// extensions below) sees the same UTC-resolved fields — there's no separate
// "ignore the offset" branch like parseISO has.
function parseJSONCore(argument: string): ParsedJSONFields | undefined {
  const parts = jsonDateRegex.exec(argument);
  if (!parts) {
    return undefined;
  }

  const year = parts[1];
  const month = parts[2];
  const day = parts[3];
  const hour = parts[4];
  const minute = parts[5];
  const second = parts[6];
  // Capture groups 1-6 are all mandatory (no `?`) in jsonDateRegex, so they
  // are always defined whenever `parts` matched at all — this check only
  // satisfies noUncheckedIndexedAccess and never actually returns here.
  /* v8 ignore next 8 */
  if (
    year === undefined ||
    month === undefined ||
    day === undefined ||
    hour === undefined ||
    minute === undefined ||
    second === undefined
  ) {
    return undefined;
  }

  const offsetSign = parts[8];
  const offsetHours = Number(parts[9] ?? 0);
  const offsetMinutes = Number(parts[10] ?? 0);
  const signMultiplier = offsetSign === '-' ? -1 : 1;

  const millisecondString = ((parts[7] ?? '0') + '00').slice(0, 3);

  const timestamp = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour) - offsetHours * signMultiplier,
    Number(minute) - offsetMinutes * signMultiplier,
    Number(second),
    Number(millisecondString)
  );

  const combined = new Date(timestamp);
  return {
    year: combined.getUTCFullYear(),
    month: combined.getUTCMonth() + 1,
    day: combined.getUTCDate(),
    hour: combined.getUTCHours(),
    minute: combined.getUTCMinutes(),
    second: combined.getUTCSeconds(),
    millisecond: combined.getUTCMilliseconds(),
  };
}

export function parseJSONValue(argument: string): Date {
  if (typeof argument !== 'string') {
    return new Date(Number.NaN);
  }
  const fields = parseJSONCore(argument);
  if (!fields) {
    return new Date(Number.NaN);
  }
  return new Date(
    Date.UTC(
      fields.year,
      fields.month - 1,
      fields.day,
      fields.hour,
      fields.minute,
      fields.second,
      fields.millisecond
    )
  );
}

export function parseJSONPlainDateTime(argument: string): Temporal.PlainDateTime | undefined {
  if (typeof argument !== 'string') {
    return undefined;
  }
  const fields = parseJSONCore(argument);
  if (!fields) {
    return undefined;
  }
  return Temporal.PlainDateTime.from(fields);
}

export function parseJSONPlainDate(argument: string): Temporal.PlainDate | undefined {
  return parseJSONPlainDateTime(argument)?.toPlainDate();
}

export function parseJSONZonedDateTime(
  argument: string,
  options: { timeZone: string }
): Temporal.ZonedDateTime | undefined {
  if (typeof argument !== 'string') {
    return undefined;
  }
  const fields = parseJSONCore(argument);
  if (!fields) {
    return undefined;
  }
  const instant = Temporal.Instant.fromEpochMilliseconds(
    Date.UTC(
      fields.year,
      fields.month - 1,
      fields.day,
      fields.hour,
      fields.minute,
      fields.second,
      fields.millisecond
    )
  );
  return instant.toZonedDateTimeISO(options.timeZone);
}

type ParseJSONAnyOptions =
  | ParseJSONTemporalOptions<Temporal.PlainDate>
  | ParseJSONTemporalOptions<Temporal.PlainDateTime>
  | ParseJSONZonedDateTimeOptions;

/**
 * @summary Parse a JSON date string.
 *
 * @description
 * Parse a date string produced by `JSON.stringify(date)` — an ISO 8601 string with no `T`/`Z`
 * separator constraints relaxed enough to accept the format JavaScript's `Date#toJSON` produces
 * (e.g. `'2000-03-15T05:20:10.123Z'`), and treats a string with no offset as UTC, unlike
 * {@link parseISO} which treats a no-offset string as local wall-clock time.
 *
 * Without `options.in`, returns a `Date` (an invalid `Date`, whose time value is `NaN`, if the
 * string cannot be parsed). With `options.in` set to a Temporal class constructor, returns an
 * instance of that class, or `undefined` if the string cannot be parsed.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date
 *
 * @example
 * const result = parseJSON('2000-03-15T05:20:10.123Z')
 * //=> Wed Mar 15 2000 05:20:10.123
 */
export function parseJSON(argument: string): Date;
export function parseJSON(
  argument: string,
  options: ParseJSONTemporalOptions<Temporal.PlainDate>
): Temporal.PlainDate | undefined;
export function parseJSON(
  argument: string,
  options: ParseJSONTemporalOptions<Temporal.PlainDateTime>
): Temporal.PlainDateTime | undefined;
export function parseJSON(
  argument: string,
  options: ParseJSONZonedDateTimeOptions
): Temporal.ZonedDateTime | undefined;
export function parseJSON(
  argument: string,
  options?: ParseJSONAnyOptions
): Date | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | undefined {
  if (!options) {
    return parseJSONValue(argument);
  }

  if (options.in === Temporal.PlainDate) {
    return parseJSONPlainDate(argument);
  }

  if (options.in === Temporal.PlainDateTime) {
    return parseJSONPlainDateTime(argument);
  }

  if (options.in === Temporal.ZonedDateTime && 'timeZone' in options) {
    return parseJSONZonedDateTime(argument, options);
  }

  return undefined;
}
