import { describe, expect, it } from 'vitest';
import { formatISO as dateFnsFormatISO } from 'date-fns';
import { formatISO } from '../src/format-iso.js';
import {
  fixtureDates,
  toMidnightUTCDate,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('formatISO', () => {
  it.each(fixtureDates)('matches date-fns for Date input (%s)', (date) => {
    expect(formatISO(date)).toBe(dateFnsFormatISO(date));
  });

  it.each(fixtureDates)('matches date-fns for Date input, basic format (%s)', (date) => {
    expect(formatISO(date, { format: 'basic' })).toBe(dateFnsFormatISO(date, { format: 'basic' }));
  });

  it.each(fixtureDates)('matches date-fns for Date input, date representation (%s)', (date) => {
    expect(formatISO(date, { representation: 'date' })).toBe(
      dateFnsFormatISO(date, { representation: 'date' })
    );
  });

  it.each(fixtureDates)('matches date-fns for Date input, time representation (%s)', (date) => {
    expect(formatISO(date, { representation: 'time' })).toBe(
      dateFnsFormatISO(date, { representation: 'time' })
    );
  });

  it.each(fixtureDates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    expect(formatISO(toZonedDateTime(date))).toBe(dateFnsFormatISO(date));
  });

  it.each(fixtureDates)('matches date-fns+UTCDate for PlainDateTime input (%s)', (date) => {
    expect(formatISO(toPlainDateTime(date))).toBe(dateFnsFormatISO(toUTCDate(date)));
  });

  it.each(fixtureDates)(
    'matches date-fns+UTCDate for PlainDate input, date representation (%s)',
    (date) => {
      expect(formatISO(toPlainDate(date), { representation: 'date' })).toBe(
        dateFnsFormatISO(toMidnightUTCDate(date), { representation: 'date' })
      );
    }
  );

  it.each(fixtureDates)(
    'matches date-fns+UTCDate for PlainDate input, complete representation (%s)',
    (date) => {
      expect(formatISO(toPlainDate(date))).toBe(dateFnsFormatISO(toMidnightUTCDate(date)));
    }
  );

  it('produces a positive offset sign for a positive-offset timezone', () => {
    const [firstFixture] = fixtureDates;
    if (firstFixture === undefined) {
      throw new Error('fixtureDates must be non-empty');
    }
    const zoned = toZonedDateTime(firstFixture, 'Asia/Tokyo');
    expect(formatISO(zoned)).toBe('2026-01-01T00:00:00+09:00');
  });
});
