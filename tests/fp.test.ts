import { describe, expect, it } from 'vitest';
import * as dateFnsFp from 'date-fns/fp';
import { convertToFP } from '../src/fp/helpers/convert-to-fp.js';
import { addDays } from '../src/fp/add-days.js';
import { addDays as addDaysDirect } from '../src/add-days.js';
import { format } from '../src/fp/format.js';
import { formatWithOptions } from '../src/fp/format-with-options.js';
import { format as formatDirect } from '../src/format.js';
import { eachDayOfInterval } from '../src/fp/each-day-of-interval.js';
import { eachDayOfIntervalWithOptions } from '../src/fp/each-day-of-interval-with-options.js';
import { eachDayOfInterval as eachDayOfIntervalDirect } from '../src/each-day-of-interval.js';
import { setWeek } from '../src/fp/set-week.js';
import { setWeek as setWeekDirect } from '../src/set-week.js';
import { setDefaultOptions } from '../src/fp/set-default-options.js';
import { setDefaultOptions as setDefaultOptionsDirect } from '../src/set-default-options.js';
import { getDefaultOptions } from '../src/get-default-options.js';
import { parse } from '../src/fp/parse.js';
import { parseWithOptions } from '../src/fp/parse-with-options.js';
import { parseISO } from '../src/fp/parse-iso.js';
import { parseISOWithOptions } from '../src/fp/parse-iso-with-options.js';
import { parseJSON } from '../src/fp/parse-json.js';
import { intlFormat } from '../src/fp/intl-format.js';
import { parse as parseDirect } from '../src/parse.js';
import { parseISO as parseISODirect } from '../src/parse-iso.js';
import { parseJSON as parseJSONDirect } from '../src/parse-json.js';
import { intlFormat as intlFormatDirect } from '../src/intl-format.js';
import { addDays as addDaysBarrel, format as formatBarrel } from '../src/fp.js';

function joinArgs(a: string, b: number, c: boolean): string {
  return [a, String(b), String(c)].join(':');
}

describe('convertToFP', () => {
  it('accepts all arguments at once, in data-last order', () => {
    const curried = convertToFP(joinArgs, 2) as (b: number, a: string) => string;
    expect(curried(2, 'x')).toBe('x:2:undefined');
  });

  it('accepts arguments one at a time, in data-last order', () => {
    const curried = convertToFP(joinArgs, 3) as (
      c: boolean
    ) => (b: number) => (a: string) => string;
    expect(curried(true)(2)('x')).toBe('x:2:true');
  });

  it('accepts a mix of grouped and one-at-a-time arguments', () => {
    const curried = convertToFP(joinArgs, 3) as (c: boolean, b: number) => (a: string) => string;
    expect(curried(true, 2)('x')).toBe('x:2:true');
  });

  it('does not call the underlying function until all arguments are collected', () => {
    let calls = 0;
    function countingFn(a: string, b: number): string {
      calls++;
      return `${a}${String(b)}`;
    }
    const curried = convertToFP(countingFn, 2) as (b: number) => (a: string) => string;
    const partial = curried(1);
    expect(calls).toBe(0);
    partial('x');
    expect(calls).toBe(1);
  });
});

describe('fp/add-days (no options, arity 2)', () => {
  it('matches the direct function, called fully applied', () => {
    const date = new Date(2020, 0, 1);
    expect(addDays(5, date)).toEqual(addDaysDirect(date, 5));
  });

  it('matches the direct function, called one argument at a time', () => {
    const date = new Date(2020, 0, 1);
    expect(addDays(5)(date)).toEqual(addDaysDirect(date, 5));
  });

  it('matches date-fns/fp', () => {
    const date = new Date(2020, 0, 1);
    expect(addDays(5, date)).toEqual(dateFnsFp.addDays(5, date));
  });
});

describe('fp/set-week (no options, arity 2, options-shaped 2nd positional type)', () => {
  it('matches the direct function', () => {
    const date = new Date(2020, 0, 1);
    expect(setWeek(3, date)).toEqual(setWeekDirect(date, 3));
  });
});

describe('fp/format + fp/format-with-options (options split into a sibling module)', () => {
  it('format (no options) matches the direct function called with no options', () => {
    const date = new Date(2020, 0, 1);
    expect(format('yyyy-MM-dd', date)).toBe(formatDirect(date, 'yyyy-MM-dd'));
  });

  it('formatWithOptions matches the direct function called with options', () => {
    const date = new Date(2020, 0, 1);
    expect(formatWithOptions({ weekStartsOn: 1 }, 'yyyy-MM-dd', date)).toBe(
      formatDirect(date, 'yyyy-MM-dd', { weekStartsOn: 1 })
    );
  });

  it('matches date-fns/fp', () => {
    const date = new Date(2020, 0, 1);
    expect(format('yyyy-MM-dd', date)).toBe(dateFnsFp.format('yyyy-MM-dd', date));
  });

  it('formatWithOptions matches date-fns/fp', () => {
    const date = new Date(2020, 0, 1);
    expect(formatWithOptions({ weekStartsOn: 1 }, 'yyyy-MM-dd', date)).toBe(
      dateFnsFp.formatWithOptions({ weekStartsOn: 1 }, 'yyyy-MM-dd', date)
    );
  });
});

describe('fp/each-day-of-interval + ...-with-options (array-returning, Interval<Date> param)', () => {
  it('eachDayOfInterval matches the direct function', () => {
    const interval = { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) };
    expect(eachDayOfInterval(interval)).toEqual(eachDayOfIntervalDirect(interval));
  });

  it('eachDayOfIntervalWithOptions matches the direct function called with options', () => {
    const interval = { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) };
    expect(eachDayOfIntervalWithOptions({ step: 2 }, interval)).toEqual(
      eachDayOfIntervalDirect(interval, { step: 2 })
    );
  });

  it('matches date-fns/fp', () => {
    const interval = { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) };
    expect(eachDayOfInterval(interval)).toEqual(dateFnsFp.eachDayOfInterval(interval));
  });

  it('eachDayOfIntervalWithOptions matches date-fns/fp', () => {
    const interval = { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) };
    expect(eachDayOfIntervalWithOptions({ step: 2 }, interval)).toEqual(
      dateFnsFp.eachDayOfIntervalWithOptions({ step: 2 }, interval)
    );
  });
});

describe('fp/set-default-options (single options-only parameter, no options-omitted sibling)', () => {
  it('matches the direct function', () => {
    setDefaultOptions({ weekStartsOn: 1 });
    expect(getDefaultOptions()).toEqual({ weekStartsOn: 1 });
    setDefaultOptionsDirect({ weekStartsOn: undefined });
    expect(getDefaultOptions()).toEqual({});
  });
});

describe('fp/parse + fp/parse-with-options (hand-written, arity 4/3)', () => {
  it('parse matches the direct function with no options', () => {
    const referenceDate = new Date(2020, 0, 1);
    expect(parse(referenceDate)('MM/dd/yyyy')('02/11/2014')).toEqual(
      parseDirect('02/11/2014', 'MM/dd/yyyy', referenceDate)
    );
  });

  it('parseWithOptions matches the direct function with options', () => {
    const referenceDate = new Date(2020, 0, 1);
    expect(
      parseWithOptions({ weekStartsOn: 1 })(referenceDate)('MM/dd/yyyy')('02/11/2014')
    ).toEqual(parseDirect('02/11/2014', 'MM/dd/yyyy', referenceDate, { weekStartsOn: 1 }));
  });

  it('matches date-fns/fp', () => {
    const referenceDate = new Date(2020, 0, 1);
    expect(parse(referenceDate)('MM/dd/yyyy')('02/11/2014')).toEqual(
      dateFnsFp.parse(referenceDate, 'MM/dd/yyyy', '02/11/2014')
    );
  });

  it('parseWithOptions matches date-fns/fp', () => {
    const referenceDate = new Date(2020, 0, 1);
    expect(
      parseWithOptions({ weekStartsOn: 1 })(referenceDate)('MM/dd/yyyy')('02/11/2014')
    ).toEqual(
      dateFnsFp.parseWithOptions({ weekStartsOn: 1 }, referenceDate, 'MM/dd/yyyy', '02/11/2014')
    );
  });
});

describe('fp/parse-iso + fp/parse-iso-with-options (hand-written, arity 1/2)', () => {
  it('parseISO matches the direct function', () => {
    expect(parseISO('2014-02-11T11:30:30')).toEqual(parseISODirect('2014-02-11T11:30:30'));
  });

  it('parseISOWithOptions matches the direct function called with options', () => {
    expect(parseISOWithOptions({ additionalDigits: 1 })('+02014101')).toEqual(
      parseISODirect('+02014101', { additionalDigits: 1 })
    );
  });

  it('matches date-fns/fp', () => {
    expect(parseISO('2014-02-11T11:30:30')).toEqual(dateFnsFp.parseISO('2014-02-11T11:30:30'));
  });

  it('parseISOWithOptions matches date-fns/fp', () => {
    expect(parseISOWithOptions({ additionalDigits: 1 })('+02014101')).toEqual(
      dateFnsFp.parseISOWithOptions({ additionalDigits: 1 }, '+02014101')
    );
  });
});

describe('fp/parse-json (hand-written, arity 1, no with-options sibling)', () => {
  it('matches the direct function', () => {
    expect(parseJSON('2000-03-15T05:20:10.123Z')).toEqual(
      parseJSONDirect('2000-03-15T05:20:10.123Z')
    );
  });

  it('matches date-fns/fp', () => {
    expect(parseJSON('2000-03-15T05:20:10.123Z')).toEqual(
      dateFnsFp.parseJSON('2000-03-15T05:20:10.123Z')
    );
  });
});

describe('fp/intl-format (hand-written, curried at its highest arity)', () => {
  it('matches the direct function called with both formatOptions and localeOptions', () => {
    const date = new Date(2020, 0, 1);
    expect(intlFormat({ locale: 'en-US' })({ dateStyle: 'short' })(date)).toBe(
      intlFormatDirect(date, { dateStyle: 'short' }, { locale: 'en-US' })
    );
  });

  it('matches the direct function called with no localeOptions', () => {
    const date = new Date(2020, 0, 1);
    expect(intlFormat(undefined, {})(date)).toBe(intlFormatDirect(date));
  });

  it('matches date-fns/fp', () => {
    const date = new Date(2020, 0, 1);
    expect(intlFormat({ locale: 'en-US' })({ dateStyle: 'short' })(date)).toBe(
      dateFnsFp.intlFormat({ locale: 'en-US' }, { dateStyle: 'short' }, date)
    );
  });
});

describe('fp.ts barrel', () => {
  it('re-exports the same function references as the per-file modules', () => {
    expect(addDaysBarrel).toBe(addDays);
    expect(formatBarrel).toBe(format);
  });
});
