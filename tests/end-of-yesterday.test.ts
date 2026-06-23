import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { endOfYesterday as dateFnsEndOfYesterday } from 'date-fns';
import { endOfYesterday } from '../src/end-of-yesterday.js';
import { group8Now } from './helpers/group8-fixtures.js';

describe('endOfYesterday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(group8Now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches date-fns', () => {
    expect(endOfYesterday()).toEqual(dateFnsEndOfYesterday());
  });
});
