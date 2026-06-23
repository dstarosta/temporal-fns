import { describe, expect, it } from 'vitest';
import { isExists as dateFnsIsExists } from 'date-fns';
import { isExists } from '../src/is-exists.js';

describe('isExists', () => {
  const cases: [number, number, number][] = [
    [2023, 1, 29],
    [2024, 1, 29],
    [2023, 0, 31],
    [2023, 0, 32],
    [2023, 0, 0],
    [2023, 11, 31],
    [2023, 12, 1],
    [2023, -1, 1],
    [2000, 1, 29],
    [1900, 1, 29],
  ];

  for (const [year, month, day] of cases) {
    it(`matches date-fns for (${String(year)}, ${String(month)}, ${String(day)})`, () => {
      expect(isExists(year, month, day)).toBe(dateFnsIsExists(year, month, day));
    });
  }
});
