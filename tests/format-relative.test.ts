import { describe, expect, it } from 'vitest';
import { formatRelative as dateFnsFormatRelative } from 'date-fns';
import { formatRelative } from '../src/format-relative.js';
import {
  toMidnightUTCDate,
  toPlainDate,
  toPlainDateTime,
  toUTCDate,
  toZonedDateTime,
} from './helpers/fixtures.js';

describe('formatRelative', () => {
  const base = new Date(2014, 1, 11, 14, 5, 8);

  const dayOffsets = [-10, -7, -6, -5, -2, -1, 0, 1, 2, 6, 7, 10];

  for (const dayOffset of dayOffsets) {
    it(`matches date-fns for day offset ${String(dayOffset)} (token boundary coverage)`, () => {
      const date = new Date(base);
      date.setDate(date.getDate() + dayOffset);
      expect(formatRelative(date, base)).toBe(dateFnsFormatRelative(date, base));
    });
  }

  it('matches date-fns with the weekStartsOn option', () => {
    const date = new Date(base);
    date.setDate(date.getDate() - 3);
    expect(formatRelative(date, base, { weekStartsOn: 1 })).toBe(
      dateFnsFormatRelative(date, base, { weekStartsOn: 1 })
    );
  });

  it('matches date-fns for a custom locale (passed through to Intl via format())', () => {
    const date = new Date(base);
    date.setDate(date.getDate() + 3);
    const fmt = formatRelative(date, base, { locale: 'fr-FR' });
    expect(fmt).toContain('vendredi');
  });

  it('matches date-fns for the same instant (today token)', () => {
    expect(formatRelative(base, base)).toBe(dateFnsFormatRelative(base, base));
  });

  it('throws RangeError for an invalid date, matching date-fns', () => {
    const invalid = new Date(Number.NaN);
    expect(() => formatRelative(invalid, base)).toThrow(RangeError);
    expect(() => dateFnsFormatRelative(invalid, base)).toThrow(RangeError);
  });

  it('matches date-fns for ZonedDateTime input', () => {
    const date = new Date(base);
    date.setDate(date.getDate() + 3);
    expect(formatRelative(toZonedDateTime(date), toZonedDateTime(base))).toBe(
      dateFnsFormatRelative(date, base)
    );
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    const date = new Date(base);
    date.setDate(date.getDate() + 3);
    expect(formatRelative(toPlainDateTime(date), toPlainDateTime(base))).toBe(
      dateFnsFormatRelative(toUTCDate(date), toUTCDate(base))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input (time-of-day zeroed, since PlainDate has none)', () => {
    const date = new Date(base);
    date.setDate(date.getDate() + 3);
    expect(formatRelative(toPlainDate(date), toPlainDate(base))).toBe(
      dateFnsFormatRelative(toMidnightUTCDate(date), toMidnightUTCDate(base))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input across all token boundaries', () => {
    for (const dayOffset of dayOffsets) {
      const date = new Date(base);
      date.setDate(date.getDate() + dayOffset);
      expect(formatRelative(toPlainDate(date), toPlainDate(base))).toBe(
        dateFnsFormatRelative(toMidnightUTCDate(date), toMidnightUTCDate(base))
      );
    }
  });
});
