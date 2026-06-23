import { describe } from 'vitest';
import { previousTuesday as dateFnsPreviousTuesday } from 'date-fns';
import { previousTuesday } from '../src/previous-tuesday.js';
import { testDateTransformFn } from './helpers/test-date-transform-fn.js';

describe('previousTuesday', () => {
  testDateTransformFn(previousTuesday, dateFnsPreviousTuesday);
});
