import { describe, expect, it } from 'vitest';
import { isWithinInterval as dateFnsIsWithinInterval } from 'date-fns';
import { isWithinInterval } from '../src/is-within-interval.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('isWithinInterval', () => {
  const cases: { date: Date; start: Date; end: Date; label: string }[] = [
    {
      date: new Date(2014, 0, 3),
      start: new Date(2014, 0, 1),
      end: new Date(2014, 0, 7),
      label: 'within',
    },
    {
      date: new Date(2014, 0, 10),
      start: new Date(2014, 0, 1),
      end: new Date(2014, 0, 7),
      label: 'outside',
    },
    {
      date: new Date(2014, 0, 1),
      start: new Date(2014, 0, 1),
      end: new Date(2014, 0, 7),
      label: 'equal to start',
    },
    {
      date: new Date(2014, 0, 7),
      start: new Date(2014, 0, 1),
      end: new Date(2014, 0, 7),
      label: 'equal to end',
    },
    {
      date: new Date(2014, 0, 3),
      start: new Date(2014, 0, 7),
      end: new Date(2014, 0, 1),
      label: 'inverted interval',
    },
  ];

  for (const { date, start, end, label } of cases) {
    const expected = dateFnsIsWithinInterval(date, { start, end });

    it(`matches date-fns for Date input (${label})`, () => {
      expect(isWithinInterval(date, { start, end })).toBe(expected);
    });

    it(`matches date-fns for PlainDate input (${label})`, () => {
      expect(
        isWithinInterval(toPlainDate(date), { start: toPlainDate(start), end: toPlainDate(end) })
      ).toBe(expected);
    });

    it(`matches date-fns for PlainDateTime input (${label})`, () => {
      expect(
        isWithinInterval(toPlainDateTime(date), {
          start: toPlainDateTime(start),
          end: toPlainDateTime(end),
        })
      ).toBe(expected);
    });

    it(`matches date-fns for ZonedDateTime input (${label})`, () => {
      expect(
        isWithinInterval(toZonedDateTime(date), {
          start: toZonedDateTime(start),
          end: toZonedDateTime(end),
        })
      ).toBe(expected);
    });
  }
});
