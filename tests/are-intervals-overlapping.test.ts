import { describe, expect, it } from 'vitest';
import { areIntervalsOverlapping as dateFnsAreIntervalsOverlapping } from 'date-fns';
import { areIntervalsOverlapping } from '../src/are-intervals-overlapping.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('areIntervalsOverlapping', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    inclusive?: boolean;
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) },
      label: 'overlapping',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) },
      label: 'non-overlapping',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) },
      label: 'adjacent, exclusive',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
      inclusive: true,
      label: 'adjacent, inclusive',
    },
    {
      left: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      right: { start: new Date(2014, 0, 21), end: new Date(2014, 0, 17) },
      label: 'inverted intervals',
    },
  ];

  for (const { left, right, inclusive, label } of cases) {
    const options = inclusive === undefined ? undefined : { inclusive };
    const expected = dateFnsAreIntervalsOverlapping(left, right, options);

    it(`matches date-fns for Date input (${label})`, () => {
      expect(areIntervalsOverlapping(left, right, options)).toBe(expected);
    });

    it(`matches date-fns for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      expect(areIntervalsOverlapping(leftP, rightP, options)).toBe(expected);
    });

    it(`matches date-fns for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      expect(areIntervalsOverlapping(leftP, rightP, options)).toBe(expected);
    });

    it(`matches date-fns for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      expect(areIntervalsOverlapping(leftP, rightP, options)).toBe(expected);
    });
  }
});
