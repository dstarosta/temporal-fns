import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startOfToday as dateFnsStartOfToday } from 'date-fns';
import { startOfToday } from '../src/start-of-today.js';
import { group8Now } from './helpers/group8-fixtures.js';

describe('startOfToday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(group8Now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches date-fns', () => {
    expect(startOfToday()).toEqual(dateFnsStartOfToday());
  });
});
