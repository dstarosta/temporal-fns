import { describe, expect, it } from 'vitest';
import * as dateFns from 'date-fns';
import { hoursToMilliseconds } from '../src/hours-to-milliseconds.js';
import { hoursToMinutes } from '../src/hours-to-minutes.js';
import { hoursToSeconds } from '../src/hours-to-seconds.js';
import { millisecondsToHours } from '../src/milliseconds-to-hours.js';
import { millisecondsToMinutes } from '../src/milliseconds-to-minutes.js';
import { millisecondsToSeconds } from '../src/milliseconds-to-seconds.js';
import { minutesToHours } from '../src/minutes-to-hours.js';
import { minutesToMilliseconds } from '../src/minutes-to-milliseconds.js';
import { minutesToSeconds } from '../src/minutes-to-seconds.js';
import { secondsToHours } from '../src/seconds-to-hours.js';
import { secondsToMilliseconds } from '../src/seconds-to-milliseconds.js';
import { secondsToMinutes } from '../src/seconds-to-minutes.js';
import { monthsToQuarters } from '../src/months-to-quarters.js';
import { monthsToYears } from '../src/months-to-years.js';
import { quartersToMonths } from '../src/quarters-to-months.js';
import { quartersToYears } from '../src/quarters-to-years.js';
import { yearsToMonths } from '../src/years-to-months.js';
import { yearsToQuarters } from '../src/years-to-quarters.js';
import { daysToWeeks } from '../src/days-to-weeks.js';
import { weeksToDays } from '../src/weeks-to-days.js';
import { yearsToDays } from '../src/years-to-days.js';

const sampleInputs = [0, 1, -1, 2.7, -2.7, 13, -13, 0.4, -0.4, 1000];

const converters: {
  name: string;
  fn: (value: number) => number;
  dateFnsFn: (value: number) => number;
}[] = [
  { name: 'hoursToMilliseconds', fn: hoursToMilliseconds, dateFnsFn: dateFns.hoursToMilliseconds },
  { name: 'hoursToMinutes', fn: hoursToMinutes, dateFnsFn: dateFns.hoursToMinutes },
  { name: 'hoursToSeconds', fn: hoursToSeconds, dateFnsFn: dateFns.hoursToSeconds },
  {
    name: 'minutesToMilliseconds',
    fn: minutesToMilliseconds,
    dateFnsFn: dateFns.minutesToMilliseconds,
  },
  { name: 'minutesToSeconds', fn: minutesToSeconds, dateFnsFn: dateFns.minutesToSeconds },
  {
    name: 'secondsToMilliseconds',
    fn: secondsToMilliseconds,
    dateFnsFn: dateFns.secondsToMilliseconds,
  },
  { name: 'quartersToMonths', fn: quartersToMonths, dateFnsFn: dateFns.quartersToMonths },
  { name: 'yearsToMonths', fn: yearsToMonths, dateFnsFn: dateFns.yearsToMonths },
  { name: 'yearsToQuarters', fn: yearsToQuarters, dateFnsFn: dateFns.yearsToQuarters },
  { name: 'weeksToDays', fn: weeksToDays, dateFnsFn: dateFns.weeksToDays },
  { name: 'yearsToDays', fn: yearsToDays, dateFnsFn: dateFns.yearsToDays },
  { name: 'daysToWeeks', fn: daysToWeeks, dateFnsFn: dateFns.daysToWeeks },
];

// The divide-direction converters affected by date-fns' negative-zero bug
// (see negativeZeroCases below) still need their own non-zero-result branch
// exercised with an ordinary positive input — sampleInputs' -1 case alone
// isn't enough to cover both the `result === 0` and plain `result` return
// paths for every one of these functions.
const positiveOnlyConverters: {
  name: string;
  fn: (value: number) => number;
  dateFnsFn: (value: number) => number;
}[] = [
  { name: 'millisecondsToHours', fn: millisecondsToHours, dateFnsFn: dateFns.millisecondsToHours },
  {
    name: 'millisecondsToMinutes',
    fn: millisecondsToMinutes,
    dateFnsFn: dateFns.millisecondsToMinutes,
  },
  {
    name: 'millisecondsToSeconds',
    fn: millisecondsToSeconds,
    dateFnsFn: dateFns.millisecondsToSeconds,
  },
  { name: 'minutesToHours', fn: minutesToHours, dateFnsFn: dateFns.minutesToHours },
  { name: 'secondsToHours', fn: secondsToHours, dateFnsFn: dateFns.secondsToHours },
  { name: 'secondsToMinutes', fn: secondsToMinutes, dateFnsFn: dateFns.secondsToMinutes },
  { name: 'monthsToQuarters', fn: monthsToQuarters, dateFnsFn: dateFns.monthsToQuarters },
  { name: 'monthsToYears', fn: monthsToYears, dateFnsFn: dateFns.monthsToYears },
  { name: 'quartersToYears', fn: quartersToYears, dateFnsFn: dateFns.quartersToYears },
];

describe('unit conversions', () => {
  for (const { name, fn, dateFnsFn } of converters) {
    it.each(sampleInputs)(`${name} matches date-fns for %s`, (value) => {
      expect(fn(value)).toBe(dateFnsFn(value));
    });
  }

  for (const { name, fn, dateFnsFn } of positiveOnlyConverters) {
    it.each([0, 1, 2.7, 13, 0.4, 1000])(`${name} matches date-fns for positive %s`, (value) => {
      expect(fn(value)).toBe(dateFnsFn(value));
    });
  }

  describe('divisions diverging from date-fns negative-zero bug (fixed here, tested explicitly)', () => {
    const negativeZeroCases: {
      name: string;
      fn: (value: number) => number;
      dateFnsFn: (value: number) => number;
      input: number;
    }[] = [
      {
        name: 'millisecondsToHours',
        fn: millisecondsToHours,
        dateFnsFn: dateFns.millisecondsToHours,
        input: -1,
      },
      {
        name: 'millisecondsToMinutes',
        fn: millisecondsToMinutes,
        dateFnsFn: dateFns.millisecondsToMinutes,
        input: -1,
      },
      {
        name: 'millisecondsToSeconds',
        fn: millisecondsToSeconds,
        dateFnsFn: dateFns.millisecondsToSeconds,
        input: -1,
      },
      { name: 'minutesToHours', fn: minutesToHours, dateFnsFn: dateFns.minutesToHours, input: -1 },
      { name: 'secondsToHours', fn: secondsToHours, dateFnsFn: dateFns.secondsToHours, input: -1 },
      {
        name: 'secondsToMinutes',
        fn: secondsToMinutes,
        dateFnsFn: dateFns.secondsToMinutes,
        input: -1,
      },
      {
        name: 'monthsToQuarters',
        fn: monthsToQuarters,
        dateFnsFn: dateFns.monthsToQuarters,
        input: -1,
      },
      { name: 'monthsToYears', fn: monthsToYears, dateFnsFn: dateFns.monthsToYears, input: -1 },
      {
        name: 'quartersToYears',
        fn: quartersToYears,
        dateFnsFn: dateFns.quartersToYears,
        input: -1,
      },
    ];

    for (const { name, fn, dateFnsFn, input } of negativeZeroCases) {
      it(`${name}(${String(input)}) returns +0, unlike date-fns' -0`, () => {
        expect(Object.is(dateFnsFn(input), -0)).toBe(true);
        expect(Object.is(fn(input), -0)).toBe(false);
        expect(fn(input)).toBe(0);
      });
    }
  });

  // Large-magnitude values (both signs) for the functions affected by the
  // negative-zero divergence above: large enough that the result is never
  // zero, so toBe's Object.is semantics can't accidentally re-trigger the
  // -0-vs-+0 mismatch for inputs that aren't actually testing that bug.
  for (const { name, fn, dateFnsFn } of [
    {
      name: 'millisecondsToHours',
      fn: millisecondsToHours,
      dateFnsFn: dateFns.millisecondsToHours,
    },
    {
      name: 'millisecondsToMinutes',
      fn: millisecondsToMinutes,
      dateFnsFn: dateFns.millisecondsToMinutes,
    },
    {
      name: 'millisecondsToSeconds',
      fn: millisecondsToSeconds,
      dateFnsFn: dateFns.millisecondsToSeconds,
    },
    { name: 'minutesToHours', fn: minutesToHours, dateFnsFn: dateFns.minutesToHours },
    { name: 'secondsToHours', fn: secondsToHours, dateFnsFn: dateFns.secondsToHours },
    { name: 'secondsToMinutes', fn: secondsToMinutes, dateFnsFn: dateFns.secondsToMinutes },
    { name: 'monthsToQuarters', fn: monthsToQuarters, dateFnsFn: dateFns.monthsToQuarters },
    { name: 'monthsToYears', fn: monthsToYears, dateFnsFn: dateFns.monthsToYears },
    { name: 'yearsToQuarters', fn: yearsToQuarters, dateFnsFn: dateFns.yearsToQuarters },
  ]) {
    it.each([10_000_000, -10_000_000, 123_456_789, -123_456_789])(
      `${name} matches date-fns for large-magnitude value %s`,
      (value) => {
        expect(fn(value)).toBe(dateFnsFn(value));
      }
    );
  }
});
