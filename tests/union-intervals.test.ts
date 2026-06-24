import { describe, expect, it } from 'vitest';
import { unionIntervals } from '../src/union-intervals.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('unionIntervals', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    expected: { start: Date; end: Date };
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) },
      expected: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 24) },
      label: 'overlapping',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 12) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
      expected: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 24) },
      label: 'disjoint with a gap - envelope spans the gap too',
    },
    {
      left: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      label: 'left fully inside right',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      expected: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      label: 'right fully inside left',
    },
    {
      left: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      right: { start: new Date(2014, 0, 24), end: new Date(2014, 0, 17) },
      expected: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 24) },
      label: 'inverted intervals normalized before unioning',
    },
  ];

  for (const { left, right, expected, label } of cases) {
    it(`computes the union for Date input (${label})`, () => {
      expect(unionIntervals(left, right)).toEqual(expected);
    });

    it(`computes the union for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      const expectedP = { start: toPlainDate(expected.start), end: toPlainDate(expected.end) };
      expect(unionIntervals(leftP, rightP)).toEqual(expectedP);
    });

    it(`computes the union for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      const expectedP = {
        start: toPlainDateTime(expected.start),
        end: toPlainDateTime(expected.end),
      };
      expect(unionIntervals(leftP, rightP)).toEqual(expectedP);
    });

    it(`computes the union for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      const expectedP = {
        start: toZonedDateTime(expected.start),
        end: toZonedDateTime(expected.end),
      };
      expect(unionIntervals(leftP, rightP)).toEqual(expectedP);
    });
  }
});
