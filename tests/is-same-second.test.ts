import { describe } from 'vitest';
import { isSameSecond as dateFnsIsSameSecond } from 'date-fns';
import { isSameSecond } from '../src/is-same-second.js';
import { testSameTimeFn } from './helpers/test-same-time-fn.js';

describe('isSameSecond', () => {
  testSameTimeFn(isSameSecond, dateFnsIsSameSecond);
});
