import { expect, it } from 'vitest';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike } from '../../src/types.js';

type SameFn = {
  (a: Date, b: Date): boolean;
  <T extends DateLike>(a: T, b: T): boolean;
};

export function testSameDayFn(fn: SameFn, dateFnsFn: (a: Date, b: Date) => boolean): void {
  const pairs: [Date, Date][] = [];
  for (const a of fixtureDates) {
    for (const b of fixtureDates) {
      pairs.push([a, b]);
    }
  }

  it.each(pairs)('matches date-fns for Date input (%s vs %s)', (a, b) => {
    expect(fn(a, b)).toBe(dateFnsFn(a, b));
  });

  it.each(pairs)('matches date-fns for PlainDate input (%s vs %s)', (a, b) => {
    expect(fn(toPlainDate(a), toPlainDate(b))).toBe(dateFnsFn(a, b));
  });

  it.each(pairs)('matches date-fns for PlainDateTime input (%s vs %s)', (a, b) => {
    expect(fn(toPlainDateTime(a), toPlainDateTime(b))).toBe(dateFnsFn(a, b));
  });

  it.each(pairs)('matches date-fns for ZonedDateTime input (%s vs %s)', (a, b) => {
    expect(fn(toZonedDateTime(a), toZonedDateTime(b))).toBe(dateFnsFn(a, b));
  });
}
