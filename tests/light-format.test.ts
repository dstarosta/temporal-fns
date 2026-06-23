import { describe, expect, it } from 'vitest';
import { lightFormat as dateFnsLightFormat } from 'date-fns';
import { lightFormat } from '../src/light-format.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('lightFormat', () => {
  const date = new Date(2014, 1, 11, 14, 5, 8, 123);
  const formats = [
    'yyyy-MM-dd',
    "yyyy-MM-dd'T'HH:mm:ss",
    'yyyy-MM-dd HH:mm:ss.SSS',
    'M/d/yyyy',
    'h:mm a',
    'HH:mm:ss',
    'yy',
    'yyy',
    'yyyyy',
    "'today is' yyyy-MM-dd",
    "yyyy-MM-dd''",
    'aaa',
    'aaaa',
    'aaaaa',
    'aa',
  ];

  for (const fmt of formats) {
    it(`matches date-fns for Date input (${fmt})`, () => {
      expect(lightFormat(date, fmt)).toBe(dateFnsLightFormat(date, fmt));
    });
  }

  const morningDate = new Date(2014, 1, 11, 0, 5, 8, 123);
  for (const fmt of ['h:mm a', 'HH:mm:ss', 'aaa', 'aaaa', 'aaaaa', 'aa']) {
    it(`matches date-fns for Date input at midnight (${fmt})`, () => {
      expect(lightFormat(morningDate, fmt)).toBe(dateFnsLightFormat(morningDate, fmt));
    });
  }

  it('throws RangeError for invalid Date', () => {
    expect(() => lightFormat(new Date(Number.NaN), 'yyyy-MM-dd')).toThrow(RangeError);
  });

  it('throws RangeError for an unescaped latin alphabet character', () => {
    expect(() => lightFormat(date, 'yyyy-Q-dd')).toThrow(RangeError);
  });

  it('matches date-fns for PlainDateTime input', () => {
    expect(lightFormat(toPlainDateTime(date), 'yyyy-MM-dd HH:mm:ss.SSS')).toBe(
      dateFnsLightFormat(date, 'yyyy-MM-dd HH:mm:ss.SSS')
    );
  });

  it('matches date-fns for PlainDate input', () => {
    expect(lightFormat(toPlainDate(date), 'yyyy-MM-dd')).toBe(
      dateFnsLightFormat(date, 'yyyy-MM-dd')
    );
  });

  it('matches date-fns for ZonedDateTime input (system zone)', () => {
    expect(lightFormat(toZonedDateTime(date), 'yyyy-MM-dd HH:mm:ss.SSS')).toBe(
      dateFnsLightFormat(date, 'yyyy-MM-dd HH:mm:ss.SSS')
    );
  });

  it('matches date-fns for a negative (BC) year', () => {
    const bcDate = new Date(0);
    bcDate.setFullYear(-5);
    expect(lightFormat(bcDate, 'yyyy-MM-dd')).toBe(dateFnsLightFormat(bcDate, 'yyyy-MM-dd'));
  });

  it('matches date-fns for an empty format string', () => {
    expect(lightFormat(date, '')).toBe(dateFnsLightFormat(date, ''));
  });

  it('matches date-fns+UTCDate for PlainDateTime input across fixture dates', () => {
    const fixture = new Date(2026, 5, 19, 14, 32, 10, 250);
    expect(lightFormat(toPlainDateTime(fixture), 'yyyy-MM-dd HH:mm:ss.SSS')).toBe(
      dateFnsLightFormat(toUTCDate(fixture), 'yyyy-MM-dd HH:mm:ss.SSS')
    );
  });
});
