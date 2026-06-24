import { describe, expect, it } from 'vitest';
import { subtractInterval } from '../src/subtract-interval.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('subtractInterval', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    expected: { start: Date; end: Date }[];
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: [
        { start: new Date(2014, 0, 1), end: new Date(2014, 0, 10) },
        { start: new Date(2014, 0, 20), end: new Date(2014, 0, 31) },
      ],
      label: 'right fully inside left - splits into two parts',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 1), end: new Date(2014, 0, 31) },
      expected: [],
      label: 'right fully covers left - nothing remains',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 21), end: new Date(2014, 0, 24) },
      expected: [{ start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }],
      label: 'disjoint - left untouched',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 15), end: new Date(2014, 0, 25) },
      expected: [{ start: new Date(2014, 0, 10), end: new Date(2014, 0, 15) }],
      label: 'right overlaps only the end of left',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 1), end: new Date(2014, 0, 15) },
      expected: [{ start: new Date(2014, 0, 15), end: new Date(2014, 0, 20) }],
      label: 'right overlaps only the start of left',
    },
    {
      left: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      right: { start: new Date(2014, 0, 24), end: new Date(2014, 0, 17) },
      expected: [{ start: new Date(2014, 0, 10), end: new Date(2014, 0, 17) }],
      label: 'both intervals reversed - normalized before subtracting',
    },
  ];

  for (const { left, right, expected, label } of cases) {
    it(`computes the difference for Date input (${label})`, () => {
      expect(subtractInterval(left, right)).toEqual(expected);
    });

    it(`computes the difference for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      const expectedP = expected.map((part) => ({
        start: toPlainDate(part.start),
        end: toPlainDate(part.end),
      }));
      expect(subtractInterval(leftP, rightP)).toEqual(expectedP);
    });

    it(`computes the difference for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      const expectedP = expected.map((part) => ({
        start: toPlainDateTime(part.start),
        end: toPlainDateTime(part.end),
      }));
      expect(subtractInterval(leftP, rightP)).toEqual(expectedP);
    });

    it(`computes the difference for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      const expectedP = expected.map((part) => ({
        start: toZonedDateTime(part.start),
        end: toZonedDateTime(part.end),
      }));
      expect(subtractInterval(leftP, rightP)).toEqual(expectedP);
    });
  }
});
