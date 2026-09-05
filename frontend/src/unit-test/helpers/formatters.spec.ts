import { describe, expect, it } from 'vitest';
import { formatCompactMillion, formatCompactYi, formatCurrency, formatPercent } from '../../utils/helpers/formatters';

describe('formatCurrency', () => {
  it('formats a plain positive amount with NT$ prefix and grouping', () => {
    expect(formatCurrency(2_605_000)).toBe('NT$2,605,000');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('NT$0');
  });

  it('adds a plus sign when signDisplay is enabled and value is positive', () => {
    expect(formatCurrency(829_949, { signDisplay: true })).toBe('+NT$829,949');
  });

  it('renders negative values with a leading minus before NT$', () => {
    expect(formatCurrency(-42_000)).toBe('-NT$42,000');
  });
});

describe('formatCompactYi', () => {
  it('matches the mockup format for a ~997M total', () => {
    expect(formatCompactYi(997_335_051)).toBe('9.97億');
  });
});

describe('formatCompactMillion', () => {
  it('matches the mockup format for a ~26.6M month', () => {
    expect(formatCompactMillion(26_620_000)).toBe('26.6M');
  });

  it('rounds to one decimal', () => {
    expect(formatCompactMillion(2_605_000)).toBe('2.6M');
  });
});

describe('formatPercent', () => {
  it('adds a plus sign for positive values', () => {
    expect(formatPercent(8.2)).toBe('+8.2%');
  });

  it('keeps the minus sign for negative values', () => {
    expect(formatPercent(-4.2)).toBe('-4.2%');
  });

  it('does not add a sign for zero', () => {
    expect(formatPercent(0)).toBe('0.0%');
  });

  it('renders a placeholder for null/undefined', () => {
    expect(formatPercent(null)).toBe('—');
    expect(formatPercent(undefined)).toBe('—');
  });
});
