import { describe, expect, it } from 'vitest';
import { formatISODuration as dateFnsFormatISODuration } from 'date-fns';
import { formatISODuration } from '../src/format-iso-duration.js';

describe('formatISODuration', () => {
  it('matches date-fns aside from the weeks segment', () => {
    const duration = { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 };
    expect(formatISODuration(duration)).toBe('P39Y2M0W20DT7H5M0S');
    expect(dateFnsFormatISODuration(duration)).toBe('P39Y2M20DT7H5M0S');
  });

  it('matches date-fns aside from the weeks segment, for an empty duration', () => {
    expect(formatISODuration({})).toBe('P0Y0M0W0DT0H0M0S');
    expect(dateFnsFormatISODuration({})).toBe('P0Y0M0DT0H0M0S');
  });

  it('matches date-fns aside from the weeks segment, for negative values', () => {
    const duration = { years: -1, days: -3 };
    expect(formatISODuration(duration)).toBe('P-1Y0M0W-3DT0H0M0S');
    expect(dateFnsFormatISODuration(duration)).toBe('P-1Y0M-3DT0H0M0S');
  });

  it('includes weeks, deliberately diverging from date-fns (which silently drops it)', () => {
    const duration = { years: 1, weeks: 2, days: 3 };
    expect(formatISODuration(duration)).toBe('P1Y0M2W3DT0H0M0S');
    expect(dateFnsFormatISODuration(duration)).toBe('P1Y0M3DT0H0M0S');
  });

  it('renders weeks alone', () => {
    expect(formatISODuration({ weeks: 5 })).toBe('P0Y0M5W0DT0H0M0S');
  });
});
