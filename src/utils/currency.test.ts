import { describe, expect, it } from 'vitest';

import { formatILS } from './currency';

describe('ILS display formatting', () => {
  it('uses the shekel symbol and two decimal places', () => {
    expect(formatILS(25)).toBe('₪25.00');
    expect(formatILS(35.5)).toBe('₪35.50');
  });
});
