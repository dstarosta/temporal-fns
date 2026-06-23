import { describe, expect, it } from 'vitest';
import { formatRFC7231 as dateFnsFormatRFC7231 } from 'date-fns';
import { formatRFC7231 } from '../src/format-rfc7231.js';
import {
  fixtureDates,
  toMidnightUTCDate,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('formatRFC7231', () => {
  for (const date of fixtureDates) {
    it(`matches date-fns for Date input (${date.toISOString()})`, () => {
      expect(formatRFC7231(date)).toBe(dateFnsFormatRFC7231(date));
    });

    it(`matches date-fns for ZonedDateTime input (${date.toISOString()})`, () => {
      expect(formatRFC7231(toZonedDateTime(date))).toBe(dateFnsFormatRFC7231(date));
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${date.toISOString()})`, () => {
      expect(formatRFC7231(toPlainDateTime(date))).toBe(dateFnsFormatRFC7231(toUTCDate(date)));
    });

    it(`matches date-fns+UTCDate for PlainDate input (${date.toISOString()})`, () => {
      expect(formatRFC7231(toPlainDate(date))).toBe(dateFnsFormatRFC7231(toMidnightUTCDate(date)));
    });
  }

  it('matches date-fns for ZonedDateTime input in a fixed non-UTC zone', () => {
    // toZonedDateTime(date, 'Asia/Tokyo') reinterprets `date`'s wall-clock
    // fields (2014-10-25 10:33:22) as Tokyo local time, so its UTC instant is
    // 2014-10-25T01:33:22Z — independently computed here since plain date-fns
    // has no fixed-IANA-zone formatting for `Date` to compare against.
    const date = new Date(2014, 9, 25, 10, 33, 22);
    expect(formatRFC7231(toZonedDateTime(date, 'Asia/Tokyo'))).toBe(
      'Sat, 25 Oct 2014 01:33:22 GMT'
    );
  });

  it('throws RangeError for an invalid Date', () => {
    expect(() => formatRFC7231(new Date(Number.NaN))).toThrow(RangeError);
  });
});
