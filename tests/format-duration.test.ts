import { describe, expect, it } from 'vitest';
import { formatDuration as dateFnsFormatDuration } from 'date-fns';
import { formatDuration } from '../src/format-duration.js';

describe('formatDuration', () => {
  it('matches date-fns for a full duration', () => {
    const duration = { years: 2, months: 9, weeks: 1, days: 7, hours: 5, minutes: 9, seconds: 30 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for a partial duration', () => {
    const duration = { months: 9, days: 2 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for a custom format', () => {
    const duration = { years: 2, months: 9, weeks: 1, days: 7, hours: 5, minutes: 9, seconds: 30 };
    const format = ['months', 'weeks'] as const;
    expect(formatDuration(duration, { format: [...format] })).toBe(
      dateFnsFormatDuration(duration, { format: [...format] })
    );
  });

  it('matches date-fns for the zero option', () => {
    const duration = { years: 0, months: 9 };
    expect(formatDuration(duration, { zero: true })).toBe(
      dateFnsFormatDuration(duration, { zero: true })
    );
  });

  it('matches date-fns without the zero option', () => {
    const duration = { years: 0, months: 9 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for a custom delimiter', () => {
    const duration = { years: 2, months: 9, weeks: 3 };
    expect(formatDuration(duration, { delimiter: ', ' })).toBe(
      dateFnsFormatDuration(duration, { delimiter: ', ' })
    );
  });

  it('matches date-fns for singular values', () => {
    const duration = { years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for an empty duration', () => {
    expect(formatDuration({})).toBe(dateFnsFormatDuration({}));
  });
});
