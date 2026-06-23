import { afterEach, describe, expect, it } from 'vitest';
import {
  getDefaultOptions as dateFnsGetDefaultOptions,
  setDefaultOptions as dateFnsSetDefaultOptionsImpl,
  startOfWeek as dateFnsStartOfWeek,
} from 'date-fns';
import { getDefaultOptions } from '../src/get-default-options.js';
import { setDefaultOptions } from '../src/set-default-options.js';
import { startOfWeek } from '../src/start-of-week.js';
import { format } from '../src/format.js';
import { type SetDefaultOptions } from '../src/helpers/default-options.js';

// date-fns' own type declarations don't account for exactOptionalPropertyTypes,
// even though their docs explicitly support `{ field: undefined }` to delete a
// default — this wrapper papers over that declaration gap, not a runtime issue.
// `locale` is also typed differently between the two packages (date-fns'
// `Locale` object vs this package's `Intl.LocalesArgument` string), but these
// tests only ever exercise weekStartsOn/firstWeekContainsDate, so the cast is
// safe in practice.
function dateFnsSetDefaultOptions(options: SetDefaultOptions): void {
  dateFnsSetDefaultOptionsImpl(
    options as unknown as Parameters<typeof dateFnsSetDefaultOptionsImpl>[0]
  );
}

describe('getDefaultOptions/setDefaultOptions vs date-fns', () => {
  afterEach(() => {
    setDefaultOptions({
      weekStartsOn: undefined,
      firstWeekContainsDate: undefined,
      locale: undefined,
    });
    dateFnsSetDefaultOptions({ weekStartsOn: undefined, firstWeekContainsDate: undefined });
  });

  it('matches date-fns initial empty state', () => {
    expect(getDefaultOptions()).toEqual(dateFnsGetDefaultOptions());
  });

  it('matches date-fns after setting weekStartsOn', () => {
    setDefaultOptions({ weekStartsOn: 1 });
    dateFnsSetDefaultOptions({ weekStartsOn: 1 });
    expect(getDefaultOptions()).toEqual(dateFnsGetDefaultOptions());
  });

  it('matches date-fns merge behavior across multiple calls', () => {
    setDefaultOptions({ weekStartsOn: 1 });
    setDefaultOptions({ firstWeekContainsDate: 4 });
    dateFnsSetDefaultOptions({ weekStartsOn: 1 });
    dateFnsSetDefaultOptions({ firstWeekContainsDate: 4 });
    expect(getDefaultOptions()).toEqual(dateFnsGetDefaultOptions());
  });

  it('matches date-fns delete-on-undefined behavior', () => {
    setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 });
    dateFnsSetDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 });
    setDefaultOptions({ weekStartsOn: undefined });
    dateFnsSetDefaultOptions({ weekStartsOn: undefined });
    expect(getDefaultOptions()).toEqual(dateFnsGetDefaultOptions());
  });

  it('matches date-fns startOfWeek behavior driven by the default', () => {
    const friday = new Date(2026, 5, 19);
    setDefaultOptions({ weekStartsOn: 1 });
    dateFnsSetDefaultOptions({ weekStartsOn: 1 });
    expect(startOfWeek(friday).toString()).toBe(dateFnsStartOfWeek(friday).toString());
  });

  it('matches date-fns priority: explicit option over default', () => {
    const friday = new Date(2026, 5, 19);
    setDefaultOptions({ weekStartsOn: 1 });
    dateFnsSetDefaultOptions({ weekStartsOn: 1 });
    expect(startOfWeek(friday, { weekStartsOn: 0 }).toString()).toBe(
      dateFnsStartOfWeek(friday, { weekStartsOn: 0 }).toString()
    );
  });

  it('sets a global default locale used by format()', () => {
    const date = new Date(2014, 1, 11);
    setDefaultOptions({ locale: 'fr-FR' });
    expect(format(date, 'MMMM')).toBe(
      new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date)
    );
  });

  it('deletes the global default locale when set to undefined', () => {
    setDefaultOptions({ locale: 'fr-FR' });
    setDefaultOptions({ locale: undefined });
    expect(getDefaultOptions().locale).toBeUndefined();
  });

  it('merges a locale default alongside weekStartsOn', () => {
    setDefaultOptions({ weekStartsOn: 1 });
    setDefaultOptions({ locale: 'fr-FR' });
    expect(getDefaultOptions()).toEqual({ weekStartsOn: 1, locale: 'fr-FR' });
  });
});
