import { expect, it } from 'vitest';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike } from '../../src/types.js';

type CompareFn = {
  (a: Date, b: Date): boolean | number;
  <T extends DateLike>(a: T, b: T): boolean | number;
};

export function testCompareFn(
  fn: CompareFn,
  dateFnsFn: (a: Date, b: Date) => boolean | number
): void {
  const pairs: [Date, Date][] = [];
  for (const a of fixtureDates) {
    for (const b of fixtureDates) {
      pairs.push([a, b]);
    }
  }

  it.each(pairs)('matches date-fns for Date input (%s vs %s)', (a, b) => {
    expect(fn(a, b)).toEqual(dateFnsFn(a, b));
  });

  it.each(pairs)('matches date-fns for PlainDate input (%s vs %s)', (a, b) => {
    expect(fn(toPlainDate(a), toPlainDate(b))).toEqual(dateFnsFn(a, b));
  });

  it.each(pairs)('matches date-fns for PlainDateTime input (%s vs %s)', (a, b) => {
    expect(fn(toPlainDateTime(a), toPlainDateTime(b))).toEqual(dateFnsFn(a, b));
  });

  it.each(pairs)('matches date-fns for ZonedDateTime input (%s vs %s)', (a, b) => {
    expect(fn(toZonedDateTime(a), toZonedDateTime(b))).toEqual(dateFnsFn(a, b));
  });
}
