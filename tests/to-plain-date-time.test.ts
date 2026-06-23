import { describe, expect, it } from 'vitest';
import { toPlainDateTime } from '../src/to-plain-date-time.js';
import { fixtureDates, toPlainDateTime as fixtureToPlainDateTime } from './helpers/fixtures.js';

describe('toPlainDateTime', () => {
  it.each(fixtureDates)('converts Date to PlainDateTime (%s)', (date) => {
    expect(toPlainDateTime(date).toString()).toBe(fixtureToPlainDateTime(date).toString());
  });

  it('returns the same PlainDateTime instance unchanged', () => {
    const pdt = Temporal.PlainDateTime.from('2026-06-19T14:32:10');
    expect(toPlainDateTime(pdt)).toBe(pdt);
  });

  it('assumes midnight for a PlainDate', () => {
    const pd = Temporal.PlainDate.from('2026-06-19');
    expect(toPlainDateTime(pd).toString()).toBe('2026-06-19T00:00:00');
  });

  it('drops the zone but keeps the wall-clock time from a ZonedDateTime', () => {
    const zdt = Temporal.PlainDateTime.from('2026-06-19T14:32:10').toZonedDateTime('UTC');
    expect(toPlainDateTime(zdt).toString()).toBe('2026-06-19T14:32:10');
  });
});
