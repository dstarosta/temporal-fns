import { describe, expect, it } from 'vitest';
import { formatISO9075 as dateFnsFormatISO9075 } from 'date-fns';
import { formatISO9075 } from '../src/format-iso9075.js';
import {
  fixtureDates,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('formatISO9075', () => {
  it.each(fixtureDates)('matches date-fns for Date input (%s)', (date) => {
    expect(formatISO9075(date)).toBe(dateFnsFormatISO9075(date));
  });

  it.each(fixtureDates)('matches date-fns for Date input, basic format (%s)', (date) => {
    expect(formatISO9075(date, { format: 'basic' })).toBe(
      dateFnsFormatISO9075(date, { format: 'basic' })
    );
  });

  it.each(fixtureDates)('matches date-fns for Date input, date representation (%s)', (date) => {
    expect(formatISO9075(date, { representation: 'date' })).toBe(
      dateFnsFormatISO9075(date, { representation: 'date' })
    );
  });

  it.each(fixtureDates)('matches date-fns for Date input, time representation (%s)', (date) => {
    expect(formatISO9075(date, { representation: 'time' })).toBe(
      dateFnsFormatISO9075(date, { representation: 'time' })
    );
  });

  it.each(fixtureDates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    expect(formatISO9075(toZonedDateTime(date))).toBe(dateFnsFormatISO9075(date));
  });

  it.each(fixtureDates)('matches date-fns+UTCDate for PlainDateTime input (%s)', (date) => {
    expect(formatISO9075(toPlainDateTime(date))).toBe(dateFnsFormatISO9075(toUTCDate(date)));
  });

  it.each(fixtureDates)(
    'matches date-fns+UTCDate for PlainDate input, date representation (%s)',
    (date) => {
      expect(formatISO9075(toPlainDate(date), { representation: 'date' })).toBe(
        dateFnsFormatISO9075(toUTCDate(date), { representation: 'date' })
      );
    }
  );
});
