import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { endOfToday as dateFnsEndOfToday } from 'date-fns';
import { endOfToday } from '../src/end-of-today.js';
import { group8Now } from './helpers/group8-fixtures.js';

describe('endOfToday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(group8Now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches date-fns', () => {
    expect(endOfToday()).toEqual(dateFnsEndOfToday());
  });
});
