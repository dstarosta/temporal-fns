import { describe, expect, it } from 'vitest';
import { differenceInBusinessDays as dateFnsDifferenceInBusinessDays } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { differenceInBusinessDays } from '../src/difference-in-business-days.js';
import { businessDayDates } from './helpers/business-day-fixtures.js';
import { testDifferenceInDateFn } from './helpers/test-difference-in-date-fn.js';

describe('differenceInBusinessDays', () => {
  testDifferenceInDateFn(
    differenceInBusinessDays,
    dateFnsDifferenceInBusinessDays,
    businessDayDates
  );

  it('is antisymmetric across timezones, unlike real date-fns + @date-fns/tz', () => {
    // Real date-fns' differenceInBusinessDays walks its internal day-by-day loop using
    // earlierDate's own embedded zone (via TZDate-aware addDays/isSameDay), so which argument is
    // "earlier" silently picks which zone's calendar the whole walk uses - the result is NOT a
    // true antisymmetric function of the two instants. Confirmed directly against date-fns@4.4.0 +
    // @date-fns/tz@1.5.0: differenceInBusinessDays(a, b) = 4 but differenceInBusinessDays(b, a) =
    // -3 (not -4) for the dates below - swapping arguments doesn't just flip the sign.
    const nyDate = new TZDate(2026, 4, 15, 20, 0, 0, 'America/New_York');
    const sgDate = new TZDate(2026, 4, 12, 0, 0, 0, 'Asia/Singapore');
    const dateFnsForward = dateFnsDifferenceInBusinessDays(nyDate, sgDate);
    const dateFnsBackward = dateFnsDifferenceInBusinessDays(sgDate, nyDate);
    expect(dateFnsForward).toBe(4);
    expect(dateFnsBackward).toBe(-3);
    expect(dateFnsForward + dateFnsBackward).not.toBe(0);

    // temporal-fns converts both arguments to their own Temporal.PlainDate (in their own zone)
    // BEFORE the day-counting walk begins, so the walk itself operates on zone-independent plain
    // calendar dates - there's no embedded zone left to introduce an order-dependent bias.
    const nyZoned = Temporal.ZonedDateTime.from('2026-05-15T20:00:00-04:00[America/New_York]');
    const sgZoned = Temporal.ZonedDateTime.from('2026-05-12T00:00:00+08:00[Asia/Singapore]');
    const forward = differenceInBusinessDays(nyZoned, sgZoned);
    const backward = differenceInBusinessDays(sgZoned, nyZoned);
    expect(forward).toBe(-backward);
    expect(forward + backward).toBe(0);
  });
});
