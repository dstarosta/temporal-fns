import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { endOfTomorrow as dateFnsEndOfTomorrow } from 'date-fns';
import { endOfTomorrow } from '../src/end-of-tomorrow.js';
import { group8Now } from './helpers/group8-fixtures.js';

describe('endOfTomorrow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(group8Now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches date-fns', () => {
    expect(endOfTomorrow()).toEqual(dateFnsEndOfTomorrow());
  });
});
