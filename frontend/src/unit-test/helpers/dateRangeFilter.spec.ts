import { describe, expect, it } from 'vitest';
import { filterMonthsByRange } from '../../utils/helpers/dateRangeFilter';
import { sampleMonths } from '../__fixtures__/sampleSales';

describe('filterMonthsByRange', () => {
  it('returns the trailing N months for a window smaller than the dataset', () => {
    const result = filterMonthsByRange(sampleMonths, '3m');
    expect(result.map((m) => m.month)).toEqual(['2025-10', '2025-11', '2025-12']);
  });

  it('returns the full dataset when the window is larger than the dataset', () => {
    const result = filterMonthsByRange(sampleMonths, '1y');
    expect(result).toHaveLength(4);
  });

  it('returns everything for "all"', () => {
    const result = filterMonthsByRange(sampleMonths, 'all');
    expect(result).toEqual(sampleMonths);
  });

  it('does not mutate the source array', () => {
    const copy = [...sampleMonths];
    filterMonthsByRange(sampleMonths, '3m');
    expect(sampleMonths).toEqual(copy);
  });
});
