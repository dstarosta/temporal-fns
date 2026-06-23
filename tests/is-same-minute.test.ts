import { describe } from 'vitest';
import { isSameMinute as dateFnsIsSameMinute } from 'date-fns';
import { isSameMinute } from '../src/is-same-minute.js';
import { testSameTimeFn } from './helpers/test-same-time-fn.js';

describe('isSameMinute', () => {
  testSameTimeFn(isSameMinute, dateFnsIsSameMinute);
});
