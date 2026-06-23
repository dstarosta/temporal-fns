import { describe, expect, it } from 'vitest';
import { toPlainDate } from '../src/to-plain-date.js';
import { fixtureDates, toPlainDate as fixtureToPlainDate } from './helpers/fixtures.js';

describe('toPlainDate', () => {
  it.each(fixtureDates)('converts Date to PlainDate (%s)', (date) => {
    expect(toPlainDate(date).toString()).toBe(fixtureToPlainDate(date).toString());
  });

  it('returns the same PlainDate instance unchanged', () => {
    const pd = Temporal.PlainDate.from('2026-06-19');
    expect(toPlainDate(pd)).toBe(pd);
  });

  it('drops the time-of-day from a PlainDateTime', () => {
    const pdt = Temporal.PlainDateTime.from('2026-06-19T14:32:10');
    expect(toPlainDate(pdt).toString()).toBe('2026-06-19');
  });

  it('drops the time-of-day and zone from a ZonedDateTime', () => {
    const zdt = Temporal.PlainDateTime.from('2026-06-19T14:32:10').toZonedDateTime('UTC');
    expect(toPlainDate(zdt).toString()).toBe('2026-06-19');
  });
});
