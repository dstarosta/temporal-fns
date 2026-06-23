import { minutesToSeconds as fn } from '../minutes-to-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link minutesToSeconds}.
 */
export const minutesToSeconds: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
