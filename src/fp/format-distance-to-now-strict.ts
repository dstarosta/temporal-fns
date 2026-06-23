import { formatDistanceToNowStrict as fn } from '../format-distance-to-now-strict.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link formatDistanceToNowStrict}.
 */
export const formatDistanceToNowStrict: FPFn1<string, Date | DateLike> = convertToFP(
  fn,
  1
) as FPFn1<string, Date | DateLike>;
