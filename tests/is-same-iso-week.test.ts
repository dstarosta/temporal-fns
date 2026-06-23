import { describe, expect, it } from 'vitest';
import { isSameISOWeek as dateFnsIsSameISOWeek } from 'date-fns';
import { isSameISOWeek } from '../src/is-same-iso-week.js';
import { isoWeekDates } from './helpers/iso-week-fixtures.js';
import { testSameDayFn } from './helpers/test-same-day-fn.js';

describe('isSameISOWeek', () => {
  testSameDayFn(isSameISOWeek, dateFnsIsSameISOWeek);

  const pairs: [Date, Date][] = [];
  for (const a of isoWeekDates) {
    for (const b of isoWeekDates) {
      pairs.push([a, b]);
    }
  }

  it.each(pairs)('matches date-fns for ISO-week-year boundary dates (%s vs %s)', (a, b) => {
    expect(isSameISOWeek(a, b)).toBe(dateFnsIsSameISOWeek(a, b));
  });
});
