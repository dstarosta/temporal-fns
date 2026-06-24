import { describe, expect, it } from 'vitest';
import { intersectIntervals } from '../src/intersect-intervals.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('intersectIntervals', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    expected: { start: Date; end: Date } | null;
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) },
      expected: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 20) },
      label: 'overlapping',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 21), end: new Date(2014, 0, 24) },
      expected: null,
      label: 'disjoint',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) },
      expected: null,
      label: 'adjacent (touching, not overlapping)',
    },
    {
      left: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      label: 'left fully inside right',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      expected: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      label: 'right fully inside left',
    },
    {
      left: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      right: { start: new Date(2014, 0, 24), end: new Date(2014, 0, 17) },
      expected: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 20) },
      label: 'inverted intervals normalized before intersecting',
    },
  ];

  for (const { left, right, expected, label } of cases) {
    it(`computes the intersection for Date input (${label})`, () => {
      expect(intersectIntervals(left, right)).toEqual(expected);
    });

    it(`computes the intersection for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      const expectedP = expected && {
        start: toPlainDate(expected.start),
        end: toPlainDate(expected.end),
      };
      expect(intersectIntervals(leftP, rightP)).toEqual(expectedP);
    });

    it(`computes the intersection for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      const expectedP = expected && {
        start: toPlainDateTime(expected.start),
        end: toPlainDateTime(expected.end),
      };
      expect(intersectIntervals(leftP, rightP)).toEqual(expectedP);
    });

    it(`computes the intersection for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      const expectedP = expected && {
        start: toZonedDateTime(expected.start),
        end: toZonedDateTime(expected.end),
      };
      expect(intersectIntervals(leftP, rightP)).toEqual(expectedP);
    });
  }
});
