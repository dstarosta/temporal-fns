import { describe, expect, it } from 'vitest';
import { parseJSON as dfParseJSON } from 'date-fns';
import { parseJSON, parseJSONPlainDateTime, parseJSONZonedDateTime } from '../src/parse-json.js';

function NotATemporalType(): void {
  /* not a Temporal type */
}

describe('parseJSON: Date overload (matches date-fns)', () => {
  const cases: string[] = [
    '2000-03-15T05:20:10.123Z',
    '2000-03-15T05:20:10Z',
    '2000-03-15T05:20:10+00:00',
    '2000-03-15T05:20:10+05:45',
    '2000-03-15T05:20:10-05:45',
    '2000-03-15T05:20:10+0000',
    '2000-03-15T05:20:10',
    '2000-03-15T05:20:10.1234567',
    '2000-03-15 05:20:10',
    'garbage',
    '',
  ];

  it.each(cases)('matches date-fns for %s', (input) => {
    const expected = dfParseJSON(input);
    const actual = parseJSON(input);
    if (Number.isNaN(+expected)) {
      expect(Number.isNaN(+actual)).toBe(true);
    } else {
      expect(+actual).toBe(+expected);
    }
  });

  it('returns Invalid Date for non-string input', () => {
    // @ts-expect-error deliberately testing invalid runtime input
    expect(Number.isNaN(+parseJSON(123))).toBe(true);
  });

  it('treats a no-offset string as UTC, unlike parseISO', () => {
    const result = parseJSON('2000-03-15T05:20:10');
    expect(result.toISOString()).toBe('2000-03-15T05:20:10.000Z');
  });
});

describe('parseJSON: PlainDate overload', () => {
  it('parses a complete date-time and ignores time-of-day', () => {
    const result = parseJSON('2000-03-15T05:20:10Z', { in: Temporal.PlainDate });
    expect(result?.toString()).toBe('2000-03-15');
  });

  it('resolves through the UTC instant, so an offset shifts the calendar date', () => {
    const withOffset = parseJSON('2000-03-15T23:30:00+05:00', { in: Temporal.PlainDate });
    expect(withOffset?.toString()).toBe('2000-03-15');
  });

  it('returns undefined for invalid input', () => {
    expect(parseJSON('garbage', { in: Temporal.PlainDate })).toBeUndefined();
  });
});

describe('parseJSON: PlainDateTime overload', () => {
  it('resolves through the UTC instant and exposes those fields as wall-clock', () => {
    const result = parseJSON('2000-03-15T05:20:10+05:00', { in: Temporal.PlainDateTime });
    expect(result?.toString()).toBe('2000-03-15T00:20:10');
  });

  it('parses fractional seconds', () => {
    const result = parseJSON('2000-03-15T05:20:10.123Z', { in: Temporal.PlainDateTime });
    expect(result?.millisecond).toBe(123);
  });

  it('returns undefined for invalid input', () => {
    expect(parseJSON('garbage', { in: Temporal.PlainDateTime })).toBeUndefined();
  });

  it('parseJSONPlainDateTime returns undefined for non-string input', () => {
    // @ts-expect-error deliberately testing invalid runtime input
    expect(parseJSONPlainDateTime(123)).toBeUndefined();
  });
});

describe('parseJSON: ZonedDateTime overload', () => {
  it('converts via instant using the parsed UTC instant', () => {
    const result = parseJSON('2000-03-15T05:20:10Z', {
      in: Temporal.ZonedDateTime,
      timeZone: 'America/New_York',
    });
    expect(result?.toString()).toBe('2000-03-15T00:20:10-05:00[America/New_York]');
  });

  it('converts a non-Z offset via instant too', () => {
    const result = parseJSON('2000-03-15T05:20:10+02:00', {
      in: Temporal.ZonedDateTime,
      timeZone: 'UTC',
    });
    expect(result?.toString()).toBe('2000-03-15T03:20:10+00:00[UTC]');
  });

  it('treats a no-offset string as UTC before converting to timeZone', () => {
    const result = parseJSON('2000-03-15T05:20:10', {
      in: Temporal.ZonedDateTime,
      timeZone: 'America/New_York',
    });
    expect(result?.toString()).toBe('2000-03-15T00:20:10-05:00[America/New_York]');
  });

  it('returns undefined for invalid input', () => {
    expect(parseJSON('garbage', { in: Temporal.ZonedDateTime, timeZone: 'UTC' })).toBeUndefined();
  });

  it('parseJSONZonedDateTime returns undefined for non-string input', () => {
    // @ts-expect-error deliberately testing invalid runtime input
    expect(parseJSONZonedDateTime(123, { timeZone: 'UTC' })).toBeUndefined();
  });
});

describe('parseJSON: unrecognized constructor', () => {
  it('returns undefined when options.in is an unrecognized constructor', () => {
    expect(
      parseJSON('2000-03-15T05:20:10Z', {
        // @ts-expect-error deliberately testing an unsupported `in` constructor
        in: NotATemporalType,
      })
    ).toBeUndefined();
  });
});
