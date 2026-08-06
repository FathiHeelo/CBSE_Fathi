import { describe, expect, it } from 'vitest';

import { yumTaDumTheme } from './theme';

describe('approved Yum Ta Dum design tokens', () => {
  it('keeps the exact approved palette and shape values', () => {
    expect(yumTaDumTheme.palette.primary.main).toBe('#2E7D32');
    expect(yumTaDumTheme.palette.primary.dark).toBe('#1B5E20');
    expect(yumTaDumTheme.palette.secondary.main).toBe('#F57C00');
    expect(yumTaDumTheme.palette.secondary.dark).toBe('#E65100');
    expect(yumTaDumTheme.palette.background.default).toBe('#F7F8F5');
    expect(yumTaDumTheme.shape.borderRadius).toBe(12);
  });
});
