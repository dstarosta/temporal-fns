import { expect, it } from 'vitest';
import { toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type Interval, type TimeLike } from '../../src/types.js';

type EachOfIntervalTimeFn<Options> = {
  (interval: Interval<Date>, options?: Options): Date[];
  <T extends TimeLike>(interval: Interval<T>, options?: Options): T[];
};

export function testEachOfIntervalTimeFn<Options>(
  fn: EachOfIntervalTimeFn<Options>,
  dateFnsFn: (interval: Interval<Date>, options?: Options) => Date[],
  cases: { start: Date; end: Date; options?: Options; label: string }[]
): void {
  for (const { start, end, options, label } of cases) {
    const expected = dateFnsFn({ start, end }, options);

    it(`matches date-fns for Date input (${label})`, () => {
      expect(fn({ start, end }, options)).toEqual(expected);
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
