import { expect, it } from 'vitest';
import { fixtureDates, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type TimeLike } from '../../src/types.js';

type TransformFn = {
  (date: Date): Date;
  <T extends TimeLike>(date: T): T;
};

export function testTimeTransformFn(
  fn: TransformFn,
  dateFnsFn: (date: Date) => Date,
  dates: Date[] = fixtureDates
): void {
  it.each(dates)('matches date-fns for Date input (%s)', (date) => {
    expect(fn(date)).toEqual(dateFnsFn(date));
  });

  it.each(dates)('matches date-fns for PlainDateTime input (%s)', (date) => {
    const expected = toPlainDateTime(dateFnsFn(date));
    expect(fn(toPlainDateTime(date)).toString()).toBe(expected.toString());
  });

  it.each(dates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    const expected = toZonedDateTime(dateFnsFn(date));
    expect(fn(toZonedDateTime(date)).toString()).toBe(expected.toString());
  });
}
