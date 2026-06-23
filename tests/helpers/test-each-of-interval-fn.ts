import { expect, it } from 'vitest';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike, type Interval } from '../../src/types.js';

type EachOfIntervalFn<Options> = {
  (interval: Interval<Date>, options?: Options): Date[];
  <T extends DateLike>(interval: Interval<T>, options?: Options): T[];
};

export function testEachOfIntervalFn<Options>(
  fn: EachOfIntervalFn<Options>,
  dateFnsFn: (interval: Interval<Date>, options?: Options) => Date[],
  cases: { start: Date; end: Date; options?: Options; label: string }[]
): void {
  for (const { start, end, options, label } of cases) {
    const expected = dateFnsFn({ start, end }, options);

    it(`matches date-fns for Date input (${label})`, () => {
      expect(fn({ start, end }, options)).toEqual(expected);
    });

    it(`matches date-fns for PlainDate input (${label})`, () => {
      const result = fn({ start: toPlainDate(start), end: toPlainDate(end) }, options);
      expect(result.map(String)).toEqual(expected.map((d) => toPlainDate(d).toString()));
    });

    it(`matches date-fns for PlainDateTime input (${label})`, () => {
      const result = fn({ start: toPlainDateTime(start), end: toPlainDateTime(end) }, options);
      expect(result.map(String)).toEqual(expected.map((d) => toPlainDateTime(d).toString()));
    });

    it(`matches date-fns for ZonedDateTime input (${label})`, () => {
      const result = fn({ start: toZonedDateTime(start), end: toZonedDateTime(end) }, options);
      expect(result.map(String)).toEqual(expected.map((d) => toZonedDateTime(d).toString()));
    });
  }
}
