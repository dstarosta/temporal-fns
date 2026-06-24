// Exhaustive generator-bug catcher for src/fp/*.ts: for EVERY export in the src/fp.ts barrel
// (except the 6 hand-written modules already covered by tests/fp.test.ts), calls the curried,
// data-last fp function fully applied with a set of fixture arguments and asserts the result
// equals calling the corresponding direct (data-first) function from src/index.ts with the same
// logical arguments in normal positional order.
//
// This intentionally does NOT test date-math correctness (each function's own dedicated test file
// under tests/ already covers that) - it only needs "good enough" fixture values per parameter to
// catch GENERATOR bugs: wrong arity, wrong argument order, wrong options handling, wrong
// "WithOptions" splitting, wrong return-value plumbing.
//
// The { exportName, directExportName, onlyOptionsParam, args } table is auto-generated (see
// scripts/generate-fp-exhaustive-table.mjs) from each export's compiled dist/<file>.d.ts signature,
// the same way scripts/generate-fp.mjs itself derives arity. Re-run the generator after adding or
// changing a function in src/ (after `npm run build`).
import { describe, expect, it } from 'vitest';
import * as fp from '../src/fp.js';
import * as direct from '../src/index.js';
import { getDefaultOptions } from '../src/get-default-options.js';
import { setDefaultOptions as setDefaultOptionsDirect } from '../src/set-default-options.js';
import { fpExhaustiveTable, type FixtureKind } from './fp-exhaustive.generated.js';

// Reusable fixture values, one per FixtureKind. Plain, deliberately simple values are sufficient -
// this suite isn't asserting date-math correctness, only that the fp wrapper plumbs its arguments
// to the direct function in the right order/shape.
const fixtureDate = new Date(2020, 5, 15, 10, 30, 0, 0);
const fixtureDate2 = new Date(2021, 2, 10, 8, 0, 0, 0);
const fixtureDateArray = [new Date(2020, 0, 1), new Date(2020, 6, 1), new Date(2020, 11, 31)];
const fixtureInterval = { start: new Date(2020, 0, 1), end: new Date(2020, 0, 10) };
const fixtureDuration = { years: 1, months: 2, days: 3, hours: 4 };
const fixtureISODuration = { years: 1, months: 2, days: 3, hours: 4 };
const fixtureDateValues = { year: 2022, month: 3, date: 4 };

// Distinct fixture values for the SAME kind, used positionally so that an argument-order bug (e.g.
// swapping arg1/arg2 of the same kind) produces a different - and therefore catchable - result
// rather than silently matching by coincidence.
function fixtureForKind(kind: FixtureKind, position: number): unknown {
  switch (kind) {
    case 'date': {
      return position === 0 ? fixtureDate : fixtureDate2;
    }
    case 'dateArray': {
      return fixtureDateArray;
    }
    case 'interval': {
      return fixtureInterval;
    }
    case 'duration': {
      return fixtureDuration;
    }
    case 'isoDuration': {
      return fixtureISODuration;
    }
    case 'dateValues': {
      return fixtureDateValues;
    }
    case 'string': {
      return 'MM/dd/yyyy';
    }
    case 'timeZoneId': {
      return 'America/New_York';
    }
    case 'durationUnit': {
      return 'days';
    }
    case 'number': {
      return 3;
    }
    case 'boolean': {
      return true;
    }
    case 'options': {
      return {};
    }
    default: {
      kind satisfies never;
      throw new TypeError(`Unhandled fixture kind: ${String(kind)}`);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic call-through harness
type AnyFn = (...args: any[]) => unknown;

function lookupFn(barrel: Record<string, AnyFn | undefined>, name: string): AnyFn {
  const fn = barrel[name];
  if (typeof fn !== 'function') {
    throw new TypeError(`Expected "${name}" to be exported as a function.`);
  }
  return fn;
}

// "Now"-based exports call Temporal.Now/Date.now() internally, so the fp call and the direct call
// - made microseconds apart - never produce byte-identical results. These are compared via an
// epoch-millisecond tolerance instead of toEqual, mirroring the existing precedent in
// tests/today-zoned-date-time.test.ts.
const nowBasedExports = new Set([
  'constructNow',
  'endOfTodayZonedDateTime',
  'endOfTomorrowZonedDateTime',
  'endOfYesterdayZonedDateTime',
  'startOfTodayZonedDateTime',
  'startOfTomorrowZonedDateTime',
  'startOfYesterdayZonedDateTime',
  'todayZonedDateTime',
  'tomorrowZonedDateTime',
  'yesterdayZonedDateTime',
]);

// Extracts a comparable epoch-millisecond value from any "now"-based result shape this table can
// produce: Date (constructNow's Date branch) or Temporal.ZonedDateTime (every other entry above).
function toComparableEpochMilliseconds(value: unknown): number {
  if (value instanceof Date) {
    return value.getTime();
  }
  if (value instanceof Temporal.ZonedDateTime) {
    return value.epochMilliseconds;
  }
  throw new TypeError(`Unsupported now-based result type: ${String(value)}`);
}

describe('fp exhaustive coverage (generator-bug catcher)', () => {
  it('covers every generated export exactly once', () => {
    const handWritten = new Set([
      'parse',
      'parseWithOptions',
      'parseISO',
      'parseISOWithOptions',
      'parseJSON',
      'intlFormat',
    ]);
    const generatedExportNames = Object.keys(fp)
      .filter((name) => !handWritten.has(name))
      .sort((a, b) => a.localeCompare(b));
    const tableExportNames = fpExhaustiveTable
      .map((c) => c.exportName)
      .sort((a, b) => a.localeCompare(b));
    expect(tableExportNames).toEqual(generatedExportNames);
  });

  describe.each(fpExhaustiveTable)('$exportName', (testCase) => {
    it('matches the direct function called with the same logical arguments', () => {
      const fpFn = lookupFn(fp as Record<string, AnyFn | undefined>, testCase.exportName);

      const argValues = testCase.args.map((arg, index) => fixtureForKind(arg.kind, index));

      if (testCase.onlyOptionsParam) {
        // e.g. setDefaultOptions(options): the direct function takes the SAME single options arg
        // (no positional data to reverse), and has a void return - compared via a side effect
        // rather than a return value.
        expect(argValues).toHaveLength(1);
        try {
          fpFn(argValues[0]);
          const afterFp = getDefaultOptions();
          setDefaultOptionsDirect({
            weekStartsOn: undefined,
            firstWeekContainsDate: undefined,
            locale: undefined,
          });

          const directFn = lookupFn(
            direct as unknown as Record<string, AnyFn | undefined>,
            testCase.directExportName
          );
          directFn(argValues[0]);
          const afterDirect = getDefaultOptions();

          expect(afterFp).toEqual(afterDirect);
        } finally {
          setDefaultOptionsDirect({
            weekStartsOn: undefined,
            firstWeekContainsDate: undefined,
            locale: undefined,
          });
        }
        return;
      }

      // Fully-applied curried call: all positional args at once, REVERSED (data-last order).
      const fpResult = fpFn(...[...argValues].reverse());

      const directFn = lookupFn(
        direct as unknown as Record<string, AnyFn | undefined>,
        testCase.directExportName
      );
      const directResult = directFn(...argValues);

      if (nowBasedExports.has(testCase.exportName)) {
        if (
          fpResult instanceof Temporal.ZonedDateTime &&
          directResult instanceof Temporal.ZonedDateTime
        ) {
          expect(fpResult.timeZoneId).toBe(directResult.timeZoneId);
        }
        const diffMs = Math.abs(
          toComparableEpochMilliseconds(fpResult) - toComparableEpochMilliseconds(directResult)
        );
        expect(diffMs).toBeLessThan(1000);
        return;
      }

      expect(fpResult).toEqual(directResult);
    });
  });
});
