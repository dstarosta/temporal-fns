import { describe, expect, it } from 'vitest';
import { clamp as dateFnsClamp } from 'date-fns';
import { clamp } from '../src/clamp.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('clamp', () => {
  const cases: { date: Date; start: Date; end: Date; label: string }[] = [
    {
      date: new Date(2021, 2, 21),
      start: new Date(2021, 2, 22),
      end: new Date(2021, 3, 1),
      label: 'below start',
    },
    {
      date: new Date(2021, 2, 23),
      start: new Date(2021, 2, 22),
      end: new Date(2021, 3, 1),
      label: 'within',
    },
    {
      date: new Date(2021, 3, 5),
      start: new Date(2021, 2, 22),
      end: new Date(2021, 3, 1),
      label: 'above end',
    },
  ];

  for (const { date, start, end, label } of cases) {
    const expected = dateFnsClamp(date, { start, end });

    it(`matches date-fns for Date input (${label})`, () => {
      expect(clamp(date, { start, end })).toEqual(expected);
    });

    it(`matches date-fns for PlainDate input (${label})`, () => {
      const result = clamp(toPlainDate(date), { start: toPlainDate(start), end: toPlainDate(end) });
      expect(result.toString()).toBe(toPlainDate(expected).toString());
    });

    it(`matches date-fns for PlainDateTime input (${label})`, () => {
      const result = clamp(toPlainDateTime(date), {
        start: toPlainDateTime(start),
        end: toPlainDateTime(end),
      });
      expect(result.toString()).toBe(toPlainDateTime(expected).toString());
    });

    it(`matches date-fns for ZonedDateTime input (${label})`, () => {
      const result = clamp(toZonedDateTime(date), {
        start: toZonedDateTime(start),
        end: toZonedDateTime(end),
      });
      expect(result.toString()).toBe(toZonedDateTime(expected).toString());
    });
  }
});
