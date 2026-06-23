import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startOfYesterday as dateFnsStartOfYesterday } from 'date-fns';
import { startOfYesterday } from '../src/start-of-yesterday.js';
import { group8Now } from './helpers/group8-fixtures.js';

describe('startOfYesterday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(group8Now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches date-fns', () => {
    expect(startOfYesterday()).toEqual(dateFnsStartOfYesterday());
  });
});
