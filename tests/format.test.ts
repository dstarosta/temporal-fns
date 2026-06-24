import { describe, expect, it } from 'vitest';
import { format as dateFnsFormat } from 'date-fns';
import { format as dateFnsTzFormat } from 'date-fns-tz';
import { format } from '../src/format.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('format', () => {
  const date = new Date(2014, 1, 11, 14, 5, 8, 123);
  const morning = new Date(2014, 1, 11, 9, 5, 8, 123);
  const midnight = new Date(2014, 1, 11, 0, 5, 8, 123);
  const noon = new Date(2014, 1, 11, 12, 5, 8, 123);
  const evening = new Date(2014, 1, 11, 19, 5, 8, 123);

  const tokenFormats = [
    'GGGG',
    'GGG',
    'GG',
    'G',
    'GGGGG',
    'yyyy',
    'yyy',
    'yy',
    'y',
    'yyyyy',
    'yo',
    'YYYY',
    'YYY',
    'YY',
    'Y',
    'YYYYY',
    'Yo',
    'R',
    'RR',
    'RRR',
    'RRRR',
    'RRRRR',
    'u',
    'uu',
    'uuu',
    'uuuu',
    'QQQQ',
    'QQQ',
    'QQ',
    'Q',
    'QQQQQ',
    'Qo',
    'qqqq',
    'qqq',
    'qq',
    'q',
    'qqqqq',
    'qo',
    'MMMM',
    'MMM',
    'MM',
    'M',
    'MMMMM',
    'Mo',
    'LLLL',
    'LLL',
    'LL',
    'L',
    'LLLLL',
    'Lo',
    'ww',
    'w',
    'wo',
    'II',
    'I',
    'Io',
    'dd',
    'd',
    'do',
    'DDD',
    'DD',
    'Do',
    'EEEE',
    'EEE',
    'EE',
    'E',
    'EEEEE',
    'EEEEEE',
    'eeee',
    'eee',
    'ee',
    'e',
    'eeeee',
    'eeeeee',
    'eo',
    'cccc',
    'ccc',
    'cc',
    'c',
    'ccccc',
    'cccccc',
    'co',
    'iiii',
    'iii',
    'ii',
    'i',
    'iiiii',
    'iiiiii',
    'io',
    'aaaa',
    'aaa',
    'aa',
    'a',
    'aaaaa',
    'bbbb',
    'bbb',
    'bb',
    'b',
    'bbbbb',
    'BBBB',
    'BBB',
    'BB',
    'B',
    'BBBBB',
    'hh',
    'h',
    'ho',
    'HH',
    'H',
    'Ho',
    'KK',
    'K',
    'Ko',
    'kk',
    'k',
    'ko',
    'mm',
    'm',
    'mo',
    'ss',
    's',
    'so',
    'S',
    'SS',
    'SSS',
    'SSSS',
    'XXXXX',
    'XXXX',
    'XXX',
    'XX',
    'X',
    'xxxxx',
    'xxxx',
    'xxx',
    'xx',
    'x',
    'OOOO',
    'OOO',
    'OO',
    'O',
    'zzzz',
    'zzz',
    'zz',
    'z',
    't',
    'tt',
    'T',
    'TT',
    'P',
    'PP',
    'PPP',
    'PPPP',
    'p',
    'pp',
    'ppp',
    'pppp',
    'Pp',
    'PPpp',
    'PPPppp',
    'PPPPpppp',
  ];

  const sweepOptions = { useAdditionalDayOfYearTokens: true, useAdditionalWeekYearTokens: true };

  for (const fmt of tokenFormats) {
    it(`matches date-fns for token ${fmt}`, () => {
      expect(format(date, fmt, sweepOptions)).toBe(dateFnsFormat(date, fmt, sweepOptions));
    });
  }

  it('matches date-fns for a combined literal format string', () => {
    const fmt = "'today is' do 'of' MMMM, yyyy 'at' h:mm:ss a 'o''clock'";
    expect(format(date, fmt)).toBe(dateFnsFormat(date, fmt));
  });

  it('matches date-fns for an escaped quote pair with no closing quote', () => {
    const fmt = "yyyy-MM-dd'unterminated";
    expect(format(date, fmt)).toBe(dateFnsFormat(date, fmt));
  });

  it('matches date-fns for an escaped literal single quote', () => {
    const fmt = "h 'o''clock'";
    expect(format(date, fmt)).toBe(dateFnsFormat(date, fmt));
  });

  it('matches date-fns for a bare doubled quote outside any quoted block', () => {
    const fmt = "yyyy''MM";
    expect(format(date, fmt)).toBe(dateFnsFormat(date, fmt));
  });

  it('diverges from date-fns for an empty format string: date-fns crashes, this returns an empty string', () => {
    expect(() => dateFnsFormat(date, '')).toThrow(TypeError);
    expect(format(date, '')).toBe('');
  });

  for (const [label, sample] of [
    ['morning', morning],
    ['midnight', midnight],
    ['noon', noon],
    ['evening', evening],
  ] as const) {
    it(`matches date-fns for dayPeriod tokens at ${label}`, () => {
      const fmt = 'a aaaa aaaaa b bbbb bbbbb B BBBB BBBBB';
      expect(format(sample, fmt)).toBe(dateFnsFormat(sample, fmt));
    });
  }

  it('matches date-fns for hour-related tokens at midnight and noon', () => {
    for (const sample of [midnight, noon]) {
      const fmt = 'h H K k';
      expect(format(sample, fmt)).toBe(dateFnsFormat(sample, fmt));
    }
  });

  it('matches date-fns with weekStartsOn and firstWeekContainsDate options', () => {
    const sample = new Date(2005, 0, 2);
    const fmt = 'YYYY-ww-eeee-cccc-e-c-eo-co';
    const options = {
      weekStartsOn: 1 as const,
      firstWeekContainsDate: 4 as const,
      useAdditionalWeekYearTokens: true,
    };
    expect(format(sample, fmt, options)).toBe(dateFnsFormat(sample, fmt, options));
  });

  it('matches date-fns for a custom locale option (passed through to Intl)', () => {
    const fmt = 'MMMM EEEE';
    expect(format(date, fmt, { locale: 'fr-FR' })).toBe(
      new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date) +
        ' ' +
        new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date)
    );
  });

  describe('protected tokens', () => {
    it('throws for DD without the opt-in option', () => {
      expect(() => format(date, 'DD')).toThrow(RangeError);
    });

    it('throws for D without the opt-in option', () => {
      expect(() => format(date, 'D')).toThrow(RangeError);
    });

    it('throws for YYYY without the opt-in option', () => {
      expect(() => format(date, 'YYYY')).toThrow(RangeError);
    });

    it('throws for YY without the opt-in option', () => {
      expect(() => format(date, 'YY')).toThrow(RangeError);
    });

    it('does not throw for Y (warns instead, since only YY/YYYY are forced to throw)', () => {
      expect(() => format(date, 'Y')).not.toThrow();
    });

    it('matches date-fns for D with useAdditionalDayOfYearTokens', () => {
      expect(format(date, 'D', { useAdditionalDayOfYearTokens: true })).toBe(
        dateFnsFormat(date, 'D', { useAdditionalDayOfYearTokens: true })
      );
    });

    it('matches date-fns for YY with useAdditionalWeekYearTokens', () => {
      expect(format(date, 'YY', { useAdditionalWeekYearTokens: true })).toBe(
        dateFnsFormat(date, 'YY', { useAdditionalWeekYearTokens: true })
      );
    });
  });

  it('throws RangeError for an invalid Date', () => {
    expect(() => format(new Date(Number.NaN), 'yyyy')).toThrow(RangeError);
  });

  it('throws RangeError for an unescaped latin alphabet character', () => {
    expect(() => format(date, 'yyyy-Z-dd')).toThrow(RangeError);
  });

  it('matches date-fns for a negative (BC) year', () => {
    const bcDate = new Date(0);
    bcDate.setFullYear(-5);
    const fmt = 'yyyy GGGG yo';
    expect(format(bcDate, fmt)).toBe(dateFnsFormat(bcDate, fmt));
  });

  it('matches date-fns for a negative (BC) local week-numbering year', () => {
    const bcDate = new Date(0);
    bcDate.setFullYear(-5);
    const fmt = 'YYYY Yo';
    const options = { useAdditionalWeekYearTokens: true };
    expect(format(bcDate, fmt, options)).toBe(dateFnsFormat(bcDate, fmt, options));
  });

  it('matches date-fns for timezone tokens in a non-UTC zone', () => {
    const fmt = 'XXX xxx OOOO zzzz X x';
    expect(format(date, fmt)).toBe(dateFnsFormat(date, fmt));
  });

  it('matches date-fns for timezone tokens at exactly UTC (Z)', () => {
    const utcSample = new Date(Date.UTC(2014, 1, 11, 14, 5, 8));
    // Force a UTC-like comparison: both X and XXX collapse to 'Z' only when
    // offsetMinutes is exactly 0, which depends on the system timezone, so
    // this just verifies date-fns parity for whatever the local zone yields.
    expect(format(utcSample, 'X')).toBe(dateFnsFormat(utcSample, 'X'));
  });

  it("matches date-fns for everything but the zzzz token, which resolves the real system-zone name instead of date-fns' GMT-offset fallback", () => {
    const fmtWithoutZ = "EEEE, MMMM do, yyyy 'at' h:mm:ss a";
    expect(format(toZonedDateTime(date), fmtWithoutZ)).toBe(dateFnsFormat(date, fmtWithoutZ));

    const expectedZoneName = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long' })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value;
    expect(format(toZonedDateTime(date), 'zzzz')).toBe(expectedZoneName);
  });

  it('formats a ZonedDateTime in a fixed non-system zone using that zone (not the system zone)', () => {
    // toZonedDateTime(date, 'Asia/Tokyo') reinterprets `date`'s wall-clock
    // fields (2014-02-11 14:05:08) as Tokyo local time, so the expected
    // output keeps those same wall-clock fields with Tokyo's fixed +09:00
    // offset (no DST) — this cannot be cross-checked against plain date-fns,
    // which has no fixed-IANA-zone formatting for `Date`.
    const fmt = 'yyyy-MM-dd HH:mm:ss XXX X';
    expect(format(toZonedDateTime(date, 'Asia/Tokyo'), fmt)).toBe('2014-02-11 14:05:08 +09:00 +09');
  });

  it('formats timezone tokens for a fractional (non-whole-hour) offset zone', () => {
    // Asia/Kolkata is a fixed +05:30 offset (no DST) — exercises the
    // non-zero-minutes branches of the short (O/z) and optional-minutes (X/x)
    // timezone formatters, which whole-hour zones like Tokyo/Eastern never do.
    const fmt = 'X x O z';
    expect(format(toZonedDateTime(date, 'Asia/Kolkata'), fmt)).toBe(
      '+0530 +0530 GMT+5:30 GMT+5:30'
    );
  });

  it('matches date-fns-tz for options.timeZone with a plain Date input (offset token)', () => {
    const sample = new Date('2014-10-25T10:46:20Z');
    const fmt = 'yyyy-MM-dd HH:mm:ssXXX';
    expect(format(sample, fmt, { timeZone: 'America/New_York' })).toBe(
      dateFnsTzFormat(sample, fmt, { timeZone: 'America/New_York' })
    );
  });

  it('matches date-fns-tz for options.timeZone with a plain Date input (short zone-name token)', () => {
    const sample = new Date('2014-10-25T10:46:20Z');
    const fmt = 'yyyy-MM-dd HH:mm:ss zzz';
    expect(format(sample, fmt, { timeZone: 'America/New_York' })).toBe(
      dateFnsTzFormat(sample, fmt, { timeZone: 'America/New_York' })
    );
  });

  it('ignores options.timeZone for ZonedDateTime input - its own zone always wins', () => {
    const zoned = toZonedDateTime(date, 'Asia/Tokyo');
    const fmt = 'yyyy-MM-dd HH:mm:ss XXX';
    expect(format(zoned, fmt, { timeZone: 'America/New_York' })).toBe(format(zoned, fmt));
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    const fmt = 'PPPPpppp';
    expect(format(toPlainDateTime(date), fmt)).toBe(dateFnsFormat(toUTCDate(date), fmt));
  });

  it('matches date-fns+UTCDate for PlainDate input', () => {
    const fmt = 'PPPP';
    expect(format(toPlainDate(date), fmt)).toBe(dateFnsFormat(toUTCDate(date), fmt));
  });

  it('matches date-fns+UTCDate for PlainDate timezone tokens (always UTC/Z)', () => {
    expect(format(toPlainDate(date), 'XXX')).toBe(dateFnsFormat(toUTCDate(date), 'XXX'));
  });

  it('reuses the same parsed format string correctly across different dates and option sets', () => {
    // The parsed token list for a given formatStr is cached internally (it never depends on date
    // or options) - this guards against the cache leaking state between calls with the same
    // formatStr but different dates/options.
    const fmt = "yyyy-MM-dd'T'HH:mm:ss";
    const first = format(date, fmt);
    const second = format(morning, fmt, { locale: 'fr-FR' });
    const third = format(date, fmt);
    expect(first).toBe(dateFnsFormat(date, fmt));
    expect(second).toBe(dateFnsFormat(morning, fmt));
    expect(third).toBe(first);
  });

  it('evicts the oldest entries once the internal format-string cache exceeds its size cap, without breaking subsequent calls', () => {
    // The cache is capped at 500 entries and evicts the oldest 20% (not cleared wholesale) once
    // full - exercise that eviction branch directly by formatting with more than 500 distinct
    // format strings (each made distinct via a differently-sized literal-text suffix), then
    // confirm formatting still works correctly both for a fresh format string (cache miss after
    // eviction) and for one of the earliest, now-likely-evicted strings (must still re-parse
    // correctly, not return stale/wrong data).
    for (let i = 0; i < 501; i++) {
      format(date, `yyyy-MM-dd '${'-'.repeat(i)}'`);
    }
    const freshFmt = 'yyyy-MM-dd';
    expect(format(date, freshFmt)).toBe(dateFnsFormat(date, freshFmt));

    const earlyFmt = "yyyy-MM-dd '-'";
    expect(format(date, earlyFmt)).toBe(dateFnsFormat(date, earlyFmt));
  });
});
