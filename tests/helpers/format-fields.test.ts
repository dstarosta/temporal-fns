import { describe, expect, it } from 'vitest';
import { addLeadingZeros } from '../../src/helpers/format-fields.js';

describe('addLeadingZeros', () => {
  it('pads a negative value with a leading minus sign before the padded digits', () => {
    expect(addLeadingZeros(-1, 4)).toBe('-0001');
  });

  it('pads a positive value with leading zeros', () => {
    expect(addLeadingZeros(1, 4)).toBe('0001');
  });
});
