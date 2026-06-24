import { describe, expect, it } from 'vitest';
import { toDate as dateFnsToDate } from 'date-fns';
import { toDate as dateFnsTzToDate } from 'date-fns-tz';
import { toDate } from '../src/to-date.js';
import { getTimezoneId } from '../src/get-timezone-id.js';

const values: unknown[] = [
  new Date(2026, 5, 19, 14, 32, 10, 250),
  new Date('garbage'),
  1750000000000,
  'not a date',
  null,
  undefined,
  {},
];

describe('toDate', () => {
  it.each(values)('matches date-fns for %s', (value) => {
    expect(toDate(value).toString()).toBe(
      dateFnsToDate(value as Parameters<typeof dateFnsToDate>[0]).toString()
    );
  });

  it('clones, does not return the same Date instance', () => {
    const original = new Date(2026, 5, 19);
    const cloned = toDate(original);
    expect(cloned).not.toBe(original);
    expect(cloned.getTime()).toBe(original.getTime());
  });

  it('converts Temporal.PlainDate', () => {
    const value = new Temporal.PlainDate(2026, 2, 13);
    const converted = new Date(2026, 1, 13);

    expect(toDate(value)).toStrictEqual(converted);
  });

  it('converts Temporal.PlainDateTime', () => {
    const value = new Temporal.PlainDateTime(2026, 2, 13, 14, 0, 25, 128);
    const converted = new Date(2026, 1, 13, 14, 0, 25, 128);

    expect(toDate(value)).toStrictEqual(converted);
  });

  it('converts Temporal.ZonedDateTime', () => {
    const converted = new Date(2026, 1, 13, 14, 0, 25, 128);
    const value = new Temporal.ZonedDateTime(
      BigInt(converted.getTime()) * 1_000_000n,
      getTimezoneId()
    );

    expect(toDate(value)).toStrictEqual(converted);
  });
});

describe('toDate: options.timeZone (matches date-fns-tz)', () => {
  const offsetLessStrings = ['2014-06-25T10:00:00', '2014-12-25T10:00:00', '2014-06-25'];

  it.each(offsetLessStrings)(
    'resolves a string with no offset as local time in timeZone, for %s',
    (value) => {
      expect(toDate(value, { timeZone: 'America/Los_Angeles' }).toISOString()).toBe(
        dateFnsTzToDate(value, { timeZone: 'America/Los_Angeles' }).toISOString()
      );
    }
  );

  it('an offset embedded in the string wins over timeZone', () => {
    const value = '2014-06-25T10:00:00+02:00';
    expect(toDate(value, { timeZone: 'America/Los_Angeles' }).toISOString()).toBe(
      dateFnsTzToDate(value, { timeZone: 'America/Los_Angeles' }).toISOString()
    );
  });

  it('a Z offset wins over timeZone', () => {
    const value = '2014-06-25T10:00:00Z';
    expect(toDate(value, { timeZone: 'America/Los_Angeles' }).toISOString()).toBe(
      dateFnsTzToDate(value, { timeZone: 'America/Los_Angeles' }).toISOString()
    );
  });

  it('returns an invalid Date for an unparseable string', () => {
    expect(toDate('garbage', { timeZone: 'America/Los_Angeles' }).getTime()).toBeNaN();
  });

  it('ignores timeZone for non-string input, same as date-fns-tz', () => {
    const value = new Date(2026, 5, 19, 14, 32, 10, 250);
    expect(toDate(value, { timeZone: 'America/Los_Angeles' })).toStrictEqual(
      dateFnsTzToDate(value, { timeZone: 'America/Los_Angeles' })
    );
  });

  it('without timeZone, a string is passed straight to the Date constructor as before', () => {
    const value = '2014-06-25T10:00:00';
    expect(toDate(value).toString()).toBe(dateFnsToDate(value).toString());
  });
});
