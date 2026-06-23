import { describe, expect, it } from 'vitest';
import { parseISO as dfParseISO } from 'date-fns';
import { parseISO, parseISOPlainDateTime, parseISOZonedDateTime } from '../src/parse-iso.js';

function NotATemporalType(): void {
  /* not a Temporal type */
}

describe('parseISO: Date overload (matches date-fns)', () => {
  const cases: { input: string; additionalDigits?: 0 | 1 | 2 }[] = [
    { input: '2014-02-11T11:30:30' },
    { input: '2014-02-11T11:30:30.500' },
    { input: '2014-02-11T11:30:30Z' },
    { input: '2014-02-11T11:30:30+02:00' },
    { input: '2014-02-11T11:30:30-0500' },
    { input: '2014-02-11' },
    { input: '20140211' },
    { input: '2014-02' },
    { input: '2014' },
    { input: '2014-045' },
    { input: '2014045' },
    { input: '2014-W07' },
    { input: '2014-W07-2' },
    { input: '2014W072' },
    { input: '2014-02-11 11:30:30' },
    { input: '2014-02-11T11:30' },
    { input: '2014-02-11T11' },
    { input: '2014-02-11T11:30:30.123Z' },
    { input: '+002014-02-11', additionalDigits: 2 },
    { input: '+02014-02-11', additionalDigits: 1 },
    { input: '+2014-02-11', additionalDigits: 0 },
    { input: '+02014101', additionalDigits: 1 },
    { input: '-002014-02-11', additionalDigits: 2 },
    { input: '2016-02-29' },
    { input: '2016-366' },
    { input: '2015-365' },
    { input: '2015-W53-3' },
    { input: '1999-W52-5' },
    { input: '2014-02-11T24:00:00' },
    { input: '2014-02-11T24:00:01' },
    { input: '2014-02-30' },
    { input: '2014-13-01' },
    { input: '2014-02-11T25:00:00' },
    { input: '2014-W54-2' },
    { input: 'garbage' },
    { input: '' },
    { input: '2014-02-11T11:30:30+25:00' },
    { input: '2014-02-11T11:30:61' },
    { input: '2014-02-11T11 30 30' },
    { input: '2014-02-11Z' },
    { input: '2014-02-11 11:30:30Z' },
    { input: '2014-02-11T11:30:30+1' },
    { input: '2014-02-11T11:30:30+abc' },
    { input: '2014-02-11T11:30:30+02:99' },
    { input: '2014-99-99' },
    { input: '11:30:30' },
    { input: '2014-XX' },
    { input: '2014-02-11Tabc' },
    { input: '20' },
  ];

  it.each(cases)(
    'matches date-fns for $input (additionalDigits=$additionalDigits)',
    ({ input, additionalDigits }) => {
      const options = additionalDigits === undefined ? undefined : { additionalDigits };
      const expected = dfParseISO(input, options);
      const actual = parseISO(input, options);
      if (Number.isNaN(+expected)) {
        expect(Number.isNaN(+actual)).toBe(true);
      } else {
        expect(+actual).toBe(+expected);
      }
    }
  );

  it('returns Invalid Date for non-string input', () => {
    // @ts-expect-error deliberately testing invalid runtime input
    expect(Number.isNaN(+parseISO(123))).toBe(true);
  });

  it('without an offset, re-applies the parsed UTC fields as local wall-clock fields', () => {
    const result = parseISO('2014-02-11T11:30:30');
    expect(result.getFullYear()).toBe(2014);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(11);
    expect(result.getHours()).toBe(11);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(30);
  });
});

describe('parseISO: PlainDate overload', () => {
  it('parses a complete date and ignores time-of-day', () => {
    const result = parseISO('2014-02-11T11:30:30', { in: Temporal.PlainDate });
    expect(result?.toString()).toBe('2014-02-11');
  });

  it('ignores an offset entirely (no instant conversion)', () => {
    const withOffset = parseISO('2014-02-11T23:30:00+05:00', { in: Temporal.PlainDate });
    const withoutOffset = parseISO('2014-02-11T23:30:00', { in: Temporal.PlainDate });
    expect(withOffset?.toString()).toBe('2014-02-11');
    expect(withOffset?.toString()).toBe(withoutOffset?.toString());
  });

  it('parses a week-date', () => {
    const result = parseISO('2014-W07-2', { in: Temporal.PlainDate });
    expect(result?.toString()).toBe('2014-02-11');
  });

  it('parses an ordinal day-of-year date', () => {
    const result = parseISO('2014-045', { in: Temporal.PlainDate });
    expect(result?.toString()).toBe('2014-02-14');
  });

  it('parses a bare year and bare year-month', () => {
    expect(parseISO('2014', { in: Temporal.PlainDate })?.toString()).toBe('2014-01-01');
    expect(parseISO('2014-02', { in: Temporal.PlainDate })?.toString()).toBe('2014-02-01');
  });

  it('respects additionalDigits', () => {
    const result = parseISO('+02014-02-11', { in: Temporal.PlainDate, additionalDigits: 1 });
    expect(result?.toString()).toBe('2014-02-11');
  });

  it('returns undefined for invalid input', () => {
    expect(parseISO('garbage', { in: Temporal.PlainDate })).toBeUndefined();
    expect(parseISO('2014-13-01', { in: Temporal.PlainDate })).toBeUndefined();
  });
});

describe('parseISO: PlainDateTime overload', () => {
  it('parses a complete date-time and ignores an offset', () => {
    const result = parseISO('2014-02-11T11:30:30+05:00', { in: Temporal.PlainDateTime });
    expect(result?.toString()).toBe('2014-02-11T11:30:30');
  });

  it('parses a complete date-time with Z and still ignores it', () => {
    const result = parseISO('2014-02-11T11:30:30Z', { in: Temporal.PlainDateTime });
    expect(result?.toString()).toBe('2014-02-11T11:30:30');
  });

  it('defaults missing time fields to zero', () => {
    const result = parseISO('2014-02-11', { in: Temporal.PlainDateTime });
    expect(result?.toString()).toBe('2014-02-11T00:00:00');
  });

  it('parses fractional seconds', () => {
    const result = parseISO('2014-02-11T11:30:30.500', { in: Temporal.PlainDateTime });
    expect(result?.millisecond).toBe(500);
  });

  it('returns undefined for invalid input', () => {
    expect(parseISO('garbage', { in: Temporal.PlainDateTime })).toBeUndefined();
    expect(parseISO('2014-02-11T25:00:00', { in: Temporal.PlainDateTime })).toBeUndefined();
  });
});

describe('parseISO: ZonedDateTime overload', () => {
  it('requires an explicit timeZone (type-level), and converts via instant when an offset is present', () => {
    const result = parseISO('2014-02-11T11:30:30Z', {
      in: Temporal.ZonedDateTime,
      timeZone: 'America/New_York',
    });
    expect(result?.toString()).toBe('2014-02-11T06:30:30-05:00[America/New_York]');
  });

  it('converts a non-Z offset via instant too', () => {
    const result = parseISO('2014-02-11T11:30:30+02:00', {
      in: Temporal.ZonedDateTime,
      timeZone: 'UTC',
    });
    expect(result?.toString()).toBe('2014-02-11T09:30:30+00:00[UTC]');
  });

  it('treats wall-clock fields as already being in timeZone when no offset is present', () => {
    const result = parseISO('2014-02-11T11:30:30', {
      in: Temporal.ZonedDateTime,
      timeZone: 'America/New_York',
    });
    expect(result?.toString()).toBe('2014-02-11T11:30:30-05:00[America/New_York]');
  });

  it('handles a bare date with no offset by attaching midnight in timeZone', () => {
    const result = parseISO('2014-02-11', {
      in: Temporal.ZonedDateTime,
      timeZone: 'Pacific/Auckland',
    });
    expect(result?.toPlainDate().toString()).toBe('2014-02-11');
    expect(result?.timeZoneId).toBe('Pacific/Auckland');
  });

  it('handles a week-date with an offset', () => {
    const result = parseISO('2014-W07-2T00:00:00Z', {
      in: Temporal.ZonedDateTime,
      timeZone: 'UTC',
    });
    expect(result?.toPlainDate().toString()).toBe('2014-02-11');
  });

  it('returns undefined for invalid input', () => {
    expect(parseISO('garbage', { in: Temporal.ZonedDateTime, timeZone: 'UTC' })).toBeUndefined();
    expect(parseISO('2014-02-30', { in: Temporal.ZonedDateTime, timeZone: 'UTC' })).toBeUndefined();
  });
});

describe('parseISO: standalone exported helpers', () => {
  it('parseISOPlainDateTime returns undefined for non-string input', () => {
    // @ts-expect-error deliberately testing invalid runtime input
    expect(parseISOPlainDateTime(123)).toBeUndefined();
  });

  it('parseISOZonedDateTime returns undefined for non-string input', () => {
    // @ts-expect-error deliberately testing invalid runtime input
    expect(parseISOZonedDateTime(123, { timeZone: 'UTC' })).toBeUndefined();
  });

  it('parseISO returns undefined when options.in is an unrecognized constructor', () => {
    expect(
      parseISO('2014-02-11', {
        // @ts-expect-error deliberately testing an unsupported `in` constructor
        in: NotATemporalType,
      })
    ).toBeUndefined();
  });
});
