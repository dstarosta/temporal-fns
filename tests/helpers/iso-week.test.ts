import { describe, expect, it } from 'vitest';
import { requireWeekOfYear, requireYearOfWeek } from '../../src/helpers/iso-week.js';

describe('requireWeekOfYear', () => {
  it('throws when weekOfYear is undefined', () => {
    expect(() => {
      requireWeekOfYear(undefined);
    }).toThrow(TypeError);
  });
});

describe('requireYearOfWeek', () => {
  it('throws when yearOfWeek is undefined', () => {
    expect(() => {
      requireYearOfWeek(undefined);
    }).toThrow(TypeError);
  });
});
