import { expect, it } from 'vitest';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './fixtures.js';
import { type DateLike } from '../../src/types.js';

type TransformFn = {
  (date: Date): Date;
  <T extends DateLike>(date: T): T;
};

export function testDateTransformFn(
  fn: TransformFn,
  dateFnsFn: (date: Date) => Date,
  dates: Date[] = fixtureDates
): void {
  it.each(dates)('matches date-fns for Date input (%s)', (date) => {
    expect(fn(date)).toEqual(dateFnsFn(date));
  });

  it.each(dates)('matches date-fns for PlainDate input (%s)', (date) => {
    const expected = toPlainDate(dateFnsFn(date));
    expect(fn(toPlainDate(date)).toString()).toBe(expected.toString());
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
