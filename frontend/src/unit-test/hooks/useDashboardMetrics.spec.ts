import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { sampleMonths } from '../__fixtures__/sampleSales';

describe('useDashboardMetrics', () => {
  it('computes the full metrics view-model from the given window', () => {
    const { result } = renderHook(() => useDashboardMetrics(sampleMonths));

    expect(result.current.totalRevenue).toBe(7_800_000);
    expect(result.current.mom?.percent).toBeCloseTo(15.7895, 3);
    expect(result.current.topPerformer?.name).toBe('雲端安全服務');
    expect(result.current.ranking[0].name).toBe('雲端安全服務');
    expect(result.current.tableRows).toHaveLength(3);
    expect(result.current.latestMonthLabel).toBe('2025-12');
    expect(result.current.dateRangeLabel).toBe('2025-09 – 2025-12');
  });

  it('scopes every metric — including topPerformer/ranking/table — to whatever window it is given', () => {
    const filtered = sampleMonths.slice(2); // 2025-11, 2025-12 only
    const { result } = renderHook(() => useDashboardMetrics(filtered));

    expect(result.current.totalRevenue).toBe(1_900_000 + 2_200_000);
    expect(result.current.comboSeries).toHaveLength(2);
    // top performer is now scoped to just these 2 months, not the full 4-month history
    expect(result.current.topPerformer?.rangeRevenue).toBe(900_000 + 1_200_000);
    expect(result.current.tableRows).toHaveLength(3);
    expect(result.current.dateRangeLabel).toBe('2025-11 – 2025-12');
  });

  it('returns an empty-safe shape for an empty dataset', () => {
    const { result } = renderHook(() => useDashboardMetrics([]));

    expect(result.current.totalRevenue).toBe(0);
    expect(result.current.mom).toBeNull();
    expect(result.current.topPerformer).toBeNull();
    expect(result.current.ranking).toEqual([]);
    expect(result.current.tableRows).toEqual([]);
    expect(result.current.latestMonthLabel).toBeNull();
    expect(result.current.dateRangeLabel).toBe('—');
  });
});
