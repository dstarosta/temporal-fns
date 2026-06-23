import { describe, expect, it } from 'vitest';
import { formatRFC3339 as dateFnsFormatRFC3339 } from 'date-fns';
import { formatRFC3339 } from '../src/format-rfc3339.js';
import { fixtureDates, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('formatRFC3339', () => {
  it.each(fixtureDates)('matches date-fns for Date input (%s)', (date) => {
    expect(formatRFC3339(date)).toBe(dateFnsFormatRFC3339(date));
  });

  it.each(fixtureDates)('matches date-fns for Date input, fractionDigits 3 (%s)', (date) => {
    expect(formatRFC3339(date, { fractionDigits: 3 })).toBe(
      dateFnsFormatRFC3339(date, { fractionDigits: 3 })
    );
  });

  it.each(fixtureDates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    expect(formatRFC3339(toZonedDateTime(date))).toBe(dateFnsFormatRFC3339(date));
  });

  it.each(fixtureDates)('matches date-fns+UTCDate for PlainDateTime input (%s)', (date) => {
    expect(formatRFC3339(toPlainDateTime(date))).toBe(dateFnsFormatRFC3339(toUTCDate(date)));
  });

  it.each(fixtureDates)(
    'matches date-fns+UTCDate for PlainDateTime input, fractionDigits 3 (%s)',
    (date) => {
      expect(formatRFC3339(toPlainDateTime(date), { fractionDigits: 3 })).toBe(
        dateFnsFormatRFC3339(toUTCDate(date), { fractionDigits: 3 })
      );
    }
  );

  it('produces a positive offset sign for a positive-offset timezone', () => {
    const [firstFixture] = fixtureDates;
    if (firstFixture === undefined) {
      throw new Error('fixtureDates must be non-empty');
    }
    const zoned = toZonedDateTime(firstFixture, 'Asia/Tokyo');
    expect(formatRFC3339(zoned)).toBe('2026-01-01T00:00:00+09:00');
  });
});
