import { describe, expect, it } from 'vitest';
import { milliseconds as dateFnsMilliseconds } from 'date-fns';
import { milliseconds } from '../src/milliseconds.js';

describe('milliseconds', () => {
  const cases = [
    { years: 1, months: 2, weeks: 1, days: 3, hours: 4, minutes: 5, seconds: 6 },
    {},
    { hours: -2 },
    { years: 1 },
    { months: 1 },
    { weeks: 1 },
    { days: 1 },
    { minutes: 1 },
    { seconds: 1 },
    { years: -1, months: -2, weeks: -1, days: -3, hours: -4, minutes: -5, seconds: -6 },
  ];

  for (const duration of cases) {
    it(`matches date-fns for ${JSON.stringify(duration)}`, () => {
      expect(milliseconds(duration)).toBe(dateFnsMilliseconds(duration));
    });
  }
});
