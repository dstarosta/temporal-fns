import { describe, expect, it } from 'vitest';
import { formatDate as dateFnsFormatDate } from 'date-fns';
import { formatDate } from '../src/format.js';

describe('formatDate (alias for format)', () => {
  it('matches date-fns', () => {
    const date = new Date(2014, 1, 11, 14, 5, 8);
    expect(formatDate(date, 'yyyy-MM-dd HH:mm:ss')).toBe(
      dateFnsFormatDate(date, 'yyyy-MM-dd HH:mm:ss')
    );
  });
});
