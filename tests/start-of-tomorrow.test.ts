import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startOfTomorrow as dateFnsStartOfTomorrow } from 'date-fns';
import { startOfTomorrow } from '../src/start-of-tomorrow.js';
import { group8Now } from './helpers/group8-fixtures.js';

describe('startOfTomorrow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(group8Now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches date-fns', () => {
    expect(startOfTomorrow()).toEqual(dateFnsStartOfTomorrow());
  });
});
