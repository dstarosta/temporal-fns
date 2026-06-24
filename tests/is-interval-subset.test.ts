import { describe, expect, it } from 'vitest';
import { isIntervalSubset } from '../src/is-interval-subset.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('isIntervalSubset', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    expected: boolean;
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: true,
      label: 'fully inside',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: true,
      label: 'equal intervals are subsets of each other (non-strict)',
    },
    {
      left: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: false,
      label: 'extends past the right end',
    },
    {
      left: { start: new Date(2014, 0, 18), end: new Date(2014, 0, 12) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      expected: true,
      label: 'both intervals reversed - normalized before checking',
    },
    {
      left: { start: new Date(2014, 0, 1), end: new Date(2014, 0, 15) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: false,
      label: 'extends before the right start',
    },
  ];

  for (const { left, right, expected, label } of cases) {
    it(`for Date input (${label})`, () => {
      expect(isIntervalSubset(left, right)).toBe(expected);
    });

    it(`for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      expect(isIntervalSubset(leftP, rightP)).toBe(expected);
    });

    it(`for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      expect(isIntervalSubset(leftP, rightP)).toBe(expected);
    });

    it(`for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      expect(isIntervalSubset(leftP, rightP)).toBe(expected);
    });
  }
});
