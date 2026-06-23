import { describe, expect, it } from 'vitest';
import { isMatch as dfIsMatch } from 'date-fns';
import { isMatch } from '../src/is-match.js';

describe('isMatch (matches date-fns)', () => {
  const cases: { dateStr: string; formatStr: string }[] = [
    { dateStr: '02/11/2014', formatStr: 'MM/dd/yyyy' },
    { dateStr: 'February 11 2014', formatStr: 'MMMM dd yyyy' },
    { dateStr: 'Tuesday, February 11 2014', formatStr: 'EEEE, MMMM dd yyyy' },
    { dateStr: '11:30 PM', formatStr: 'h:mm a' },
    { dateStr: '23:30', formatStr: 'HH:mm' },
    { dateStr: 'garbage', formatStr: 'MM/dd/yyyy' },
    { dateStr: '', formatStr: 'MM/dd/yyyy' },
    { dateStr: '02/11/2014 extra', formatStr: 'MM/dd/yyyy' },
    { dateStr: '2014-13-01', formatStr: 'yyyy-MM-dd' },
    { dateStr: '2014-02-30', formatStr: 'yyyy-MM-dd' },
    { dateStr: 'AD 2014', formatStr: 'GGGG yyyy' },
    { dateStr: 'Q1 2014', formatStr: "'Q'Q yyyy" },
    { dateStr: '512969520', formatStr: 't' },
    { dateStr: '2020-06-15 10:00:00 +02:00', formatStr: 'yyyy-MM-dd HH:mm:ss XXX' },
    { dateStr: '02/11/2014', formatStr: 'MM/dd/yy' },
  ];

  it.each(cases)('matches date-fns for $dateStr against $formatStr', ({ dateStr, formatStr }) => {
    expect(isMatch(dateStr, formatStr)).toBe(dfIsMatch(dateStr, formatStr));
  });

  it('throws RangeError for incompatible tokens, matching date-fns', () => {
    expect(() => isMatch('23 AM', 'HH a')).toThrow(RangeError);
    expect(() => dfIsMatch('23 AM', 'HH a')).toThrow(RangeError);
  });
});
