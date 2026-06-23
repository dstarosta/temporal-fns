import { afterEach, describe, expect, it } from 'vitest';
import { setDefaultOptions } from '../src/set-default-options.js';
import { getDefaultOptions } from '../src/get-default-options.js';
import { startOfWeek } from '../src/start-of-week.js';
import { endOfWeek } from '../src/end-of-week.js';
import { setDay } from '../src/set-day.js';
import { differenceInCalendarWeeks } from '../src/difference-in-calendar-weeks.js';
import { isSameWeek } from '../src/is-same-week.js';
import { startOfISOWeek } from '../src/start-of-iso-week.js';
import { endOfISOWeek } from '../src/end-of-iso-week.js';

describe('getDefaultOptions/setDefaultOptions', () => {
  afterEach(() => {
    setDefaultOptions({ weekStartsOn: undefined, firstWeekContainsDate: undefined });
  });

  it('starts empty', () => {
    expect(getDefaultOptions()).toEqual({});
  });

  it('returns a copy, not a live reference', () => {
    const first = getDefaultOptions();
    setDefaultOptions({ weekStartsOn: 1 });
    expect(first).toEqual({});
    expect(getDefaultOptions()).toEqual({ weekStartsOn: 1 });
  });

  it('merges new options with existing ones', () => {
    setDefaultOptions({ weekStartsOn: 1 });
    setDefaultOptions({ firstWeekContainsDate: 4 });
    expect(getDefaultOptions()).toEqual({ weekStartsOn: 1, firstWeekContainsDate: 4 });
  });

  it('removes a key by setting it to undefined', () => {
    setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 });
    setDefaultOptions({ weekStartsOn: undefined });
    expect(getDefaultOptions()).toEqual({ firstWeekContainsDate: 4 });
  });

  it('affects startOfWeek when no explicit weekStartsOn is passed', () => {
    const friday = new Date(2026, 5, 19);
    setDefaultOptions({ weekStartsOn: 1 });
    expect(startOfWeek(friday).toString()).toBe(
      startOfWeek(friday, { weekStartsOn: 1 }).toString()
    );
  });

  it('is overridden by an explicit weekStartsOn option', () => {
    const friday = new Date(2026, 5, 19);
    setDefaultOptions({ weekStartsOn: 1 });
    expect(startOfWeek(friday, { weekStartsOn: 0 }).toString()).toBe(
      startOfWeek(friday, { weekStartsOn: 0 }).toString()
    );
    expect(startOfWeek(friday, { weekStartsOn: 0 }).toString()).not.toBe(
      startOfWeek(friday, { weekStartsOn: 1 }).toString()
    );
  });

  it('affects endOfWeek', () => {
    const friday = new Date(2026, 5, 19);
    setDefaultOptions({ weekStartsOn: 1 });
    expect(endOfWeek(friday).toString()).toBe(endOfWeek(friday, { weekStartsOn: 1 }).toString());
  });

  it('affects setDay', () => {
    const friday = new Date(2026, 5, 19);
    setDefaultOptions({ weekStartsOn: 1 });
    expect(setDay(friday, 3).toString()).toBe(setDay(friday, 3, { weekStartsOn: 1 }).toString());
  });

  it('affects differenceInCalendarWeeks', () => {
    const earlier = new Date(2026, 5, 19);
    const later = new Date(2026, 5, 22);
    setDefaultOptions({ weekStartsOn: 1 });
    expect(differenceInCalendarWeeks(later, earlier)).toBe(
      differenceInCalendarWeeks(later, earlier, { weekStartsOn: 1 })
    );
  });

  it('affects isSameWeek transitively via startOfWeek', () => {
    const sunday = new Date(2026, 5, 21);
    const nextMonday = new Date(2026, 5, 22);
    setDefaultOptions({ weekStartsOn: 1 });
    // With weekStartsOn: 1 (Monday-start), Sunday Jun 21 and Monday Jun 22
    // fall in different weeks (Sunday ends one week, Monday starts the next).
    expect(isSameWeek(sunday, nextMonday)).toBe(
      isSameWeek(sunday, nextMonday, { weekStartsOn: 1 })
    );
    expect(isSameWeek(sunday, nextMonday)).toBe(false);
  });

  it('does not affect startOfISOWeek/endOfISOWeek (always Monday-start)', () => {
    const friday = new Date(2026, 5, 19);
    setDefaultOptions({ weekStartsOn: 6 });
    expect(startOfISOWeek(friday).toString()).toBe(
      startOfWeek(friday, { weekStartsOn: 1 }).toString()
    );
    expect(endOfISOWeek(friday).toString()).toBe(endOfWeek(friday, { weekStartsOn: 1 }).toString());
  });
});
