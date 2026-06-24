import { describe, expect, it } from 'vitest';
import { areIntervalsAdjacent } from '../src/are-intervals-adjacent.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('areIntervalsAdjacent', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    expected: boolean;
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) },
      expected: true,
      label: 'right touches the end of left',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2013, 11, 25), end: new Date(2014, 0, 10) },
      expected: true,
      label: 'right touches the start of left',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 21), end: new Date(2014, 0, 30) },
      expected: false,
      label: 'a real gap is not adjacent',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 15), end: new Date(2014, 0, 25) },
      expected: false,
      label: 'overlapping is not adjacent',
    },
    {
      left: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      right: { start: new Date(2014, 0, 30), end: new Date(2014, 0, 20) },
      expected: true,
      label: 'both intervals reversed - normalized before checking adjacency',
    },
  ];

  for (const { left, right, expected, label } of cases) {
    it(`for Date input (${label})`, () => {
      expect(areIntervalsAdjacent(left, right)).toBe(expected);
    });

    it(`for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      expect(areIntervalsAdjacent(leftP, rightP)).toBe(expected);
    });

    it(`for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      expect(areIntervalsAdjacent(leftP, rightP)).toBe(expected);
    });

    it(`for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      expect(areIntervalsAdjacent(leftP, rightP)).toBe(expected);
    });
  }
});
