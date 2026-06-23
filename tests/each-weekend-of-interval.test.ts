import { describe, expect, it } from 'vitest';
import { eachWeekendOfInterval as dateFnsEachWeekendOfInterval } from 'date-fns';
import { eachWeekendOfInterval } from '../src/each-weekend-of-interval.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('eachWeekendOfInterval', () => {
  const cases: { start: Date; end: Date; label: string }[] = [
    { start: new Date(2018, 8, 17), end: new Date(2018, 8, 30), label: 'forward' },
    { start: new Date(2018, 8, 30), end: new Date(2018, 8, 17), label: 'reversed' },
  ];

  for (const { start, end, label } of cases) {
    const expected = dateFnsEachWeekendOfInterval({ start, end });

    it(`matches date-fns for Date input (${label})`, () => {
      expect(eachWeekendOfInterval({ start, end })).toEqual(expected);
    });

    it(`matches date-fns for PlainDate input (${label})`, () => {
      const result = eachWeekendOfInterval({ start: toPlainDate(start), end: toPlainDate(end) });
      expect(result.map(String)).toEqual(expected.map((d) => toPlainDate(d).toString()));
    });

    it(`matches date-fns for PlainDateTime input (${label})`, () => {
      const result = eachWeekendOfInterval({
        start: toPlainDateTime(start),
        end: toPlainDateTime(end),
      });
      expect(result.map(String)).toEqual(expected.map((d) => toPlainDateTime(d).toString()));
    });

    it(`matches date-fns for ZonedDateTime input (${label})`, () => {
      const result = eachWeekendOfInterval({
        start: toZonedDateTime(start),
        end: toZonedDateTime(end),
      });
      expect(result.map(String)).toEqual(expected.map((d) => toZonedDateTime(d).toString()));
    });
  }
});
