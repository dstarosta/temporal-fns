import { describe, expect, it } from 'vitest';
import { intlFormat as dateFnsIntlFormat } from 'date-fns';
import { intlFormat } from '../src/intl-format.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('intlFormat', () => {
  it.each(fixtureDates)('matches date-fns for Date input, no options (%s)', (date) => {
    expect(intlFormat(date)).toBe(dateFnsIntlFormat(date));
  });

  it.each(fixtureDates)('matches date-fns for Date input, locale options (%s)', (date) => {
    expect(intlFormat(date, { locale: 'ko-KR' })).toBe(
      dateFnsIntlFormat(date, { locale: 'ko-KR' })
    );
  });

  it.each(fixtureDates)('matches date-fns for Date input, format options (%s)', (date) => {
    const formatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
    } as const;
    expect(intlFormat(date, formatOptions)).toBe(dateFnsIntlFormat(date, formatOptions));
  });

  it.each(fixtureDates)('matches date-fns for Date input, format + locale options (%s)', (date) => {
    const formatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as const;
    expect(intlFormat(date, formatOptions, { locale: 'de-DE' })).toBe(
      dateFnsIntlFormat(date, formatOptions, { locale: 'de-DE' })
    );
  });

  it.each(fixtureDates)('matches date-fns for PlainDate input (%s)', (date) => {
    expect(intlFormat(toPlainDate(date))).toBe(dateFnsIntlFormat(date));
  });

  it.each(fixtureDates)('matches date-fns for PlainDateTime input (%s)', (date) => {
    const formatOptions = { dateStyle: 'full', timeStyle: 'medium' } as const;
    expect(intlFormat(toPlainDateTime(date), formatOptions)).toBe(
      dateFnsIntlFormat(date, formatOptions)
    );
  });

  it.each(fixtureDates)('matches date-fns for ZonedDateTime input, system zone (%s)', (date) => {
    const formatOptions = { dateStyle: 'full', timeStyle: 'long' } as const;
    expect(intlFormat(toZonedDateTime(date), formatOptions)).toBe(
      dateFnsIntlFormat(date, formatOptions)
    );
  });

  it('formats a ZonedDateTime using its own (non-system) timezone', () => {
    const [firstFixture] = fixtureDates;
    if (firstFixture === undefined) {
      throw new Error('fixtureDates must be non-empty');
    }
    const zoned = toZonedDateTime(firstFixture, 'Asia/Tokyo');
    const result = intlFormat(zoned, { dateStyle: 'full', timeStyle: 'long' });
    expect(result).toContain('GMT+9');
  });
});
