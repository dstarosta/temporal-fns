import { describe, expect, it } from 'vitest';
import { isSameISOWeekYear as dateFnsIsSameISOWeekYear } from 'date-fns';
import { isSameISOWeekYear } from '../src/is-same-iso-week-year.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testSameDayFn } from './helpers/test-same-day-fn.js';

describe('isSameISOWeekYear', () => {
  testSameDayFn(isSameISOWeekYear, dateFnsIsSameISOWeekYear);

  const pairs: [Date, Date][] = [];
  for (const a of isoWeekDates) {
    for (const b of isoWeekDates) {
      pairs.push([a, b]);
    }
  }

  it.each(pairs)('matches date-fns for ISO-week-year boundary dates (%s vs %s)', (a, b) => {
    expect(isSameISOWeekYear(a, b)).toBe(dateFnsIsSameISOWeekYear(a, b));
  });
});
