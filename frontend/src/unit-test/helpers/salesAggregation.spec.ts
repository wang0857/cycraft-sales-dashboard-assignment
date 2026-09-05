import { describe, expect, it } from 'vitest';
import {
  averageRevenue,
  buildProductRanking,
  buildProductTableRows,
  computeMomGrowth,
  computeMomSeries,
  computeMonthTotals,
  computeRangeGrowth,
  cumulativeByProduct,
  findMaxMomChange,
  findPeakAndTrough,
  findTopPerformer,
  monthRevenueTotal,
  sumRevenue,
} from '../../utils/helpers/salesAggregation';
import { sampleMonths } from '../__fixtures__/sampleSales';

describe('monthRevenueTotal', () => {
  it('sums all product revenue for a month', () => {
    expect(monthRevenueTotal(sampleMonths[3])).toBe(2_200_000);
  });
});

describe('computeMonthTotals', () => {
  it('maps every month to its total', () => {
    expect(computeMonthTotals(sampleMonths)).toEqual([
      { month: '2025-09', revenue: 1_800_000 },
      { month: '2025-10', revenue: 1_900_000 },
      { month: '2025-11', revenue: 1_900_000 },
      { month: '2025-12', revenue: 2_200_000 },
    ]);
  });
});

describe('sumRevenue / averageRevenue', () => {
  const totals = computeMonthTotals(sampleMonths);

  it('sums across months', () => {
    expect(sumRevenue(totals)).toBe(7_800_000);
  });

  it('averages across months', () => {
    expect(averageRevenue(totals)).toBe(1_950_000);
  });

  it('averages to 0 for an empty list', () => {
    expect(averageRevenue([])).toBe(0);
  });
});

describe('computeMomSeries', () => {
  it('leaves the first month with a null momPercent', () => {
    const [first] = computeMomSeries(computeMonthTotals(sampleMonths));
    expect(first.momPercent).toBeNull();
  });

  it('computes month-over-month percent for subsequent months', () => {
    const series = computeMomSeries(computeMonthTotals(sampleMonths));
    expect(series[1].momPercent).toBeCloseTo(5.5556, 3);
    expect(series[2].momPercent).toBeCloseTo(0, 3);
    expect(series[3].momPercent).toBeCloseTo(15.7895, 3);
  });

  it('returns null instead of dividing by zero when the previous month is 0', () => {
    const series = computeMomSeries([
      { month: '2025-01', revenue: 0 },
      { month: '2025-02', revenue: 500 },
    ]);
    expect(series[1].momPercent).toBeNull();
  });
});

describe('computeMomGrowth', () => {
  it('compares the latest two months', () => {
    const result = computeMomGrowth(sampleMonths);
    expect(result).not.toBeNull();
    expect(result?.latestMonth).toBe('2025-12');
    expect(result?.previousMonth).toBe('2025-11');
    expect(result?.absolute).toBe(300_000);
    expect(result?.percent).toBeCloseTo(15.7895, 3);
  });

  it('returns null when there are fewer than 2 months', () => {
    expect(computeMomGrowth([sampleMonths[0]])).toBeNull();
  });
});

describe('findPeakAndTrough', () => {
  it('finds the highest and lowest month', () => {
    const totals = computeMonthTotals(sampleMonths);
    const { peak, trough } = findPeakAndTrough(totals);
    expect(peak).toEqual({ month: '2025-12', revenue: 2_200_000 });
    expect(trough).toEqual({ month: '2025-09', revenue: 1_800_000 });
  });

  it('returns nulls for an empty list', () => {
    expect(findPeakAndTrough([])).toEqual({ peak: null, trough: null });
  });
});

describe('findMaxMomChange', () => {
  it('finds the largest increase and the largest decrease', () => {
    const momSeries = computeMomSeries(computeMonthTotals(sampleMonths));
    const { increase, decrease } = findMaxMomChange(momSeries);
    expect(increase?.month).toBe('2025-12');
    expect(increase?.percent).toBeCloseTo(15.7895, 3);
    expect(decrease?.month).toBe('2025-11');
    expect(decrease?.percent).toBeCloseTo(0, 3);
  });
});

describe('computeRangeGrowth', () => {
  it('compares the first and last month', () => {
    const totals = computeMonthTotals(sampleMonths);
    const growth = computeRangeGrowth(totals);
    expect(growth?.absolute).toBe(400_000);
    expect(growth?.percent).toBeCloseTo(22.2222, 3);
  });
});

describe('cumulativeByProduct', () => {
  it('sums each product across all months', () => {
    const cumulative = cumulativeByProduct(sampleMonths);
    expect(cumulative.get('雲端安全服務')).toBe(4_200_000);
    expect(cumulative.get('端點防護軟體')).toBe(2_100_000);
    expect(cumulative.get('威脅情資平台')).toBe(1_500_000);
  });
});

describe('findTopPerformer', () => {
  it('picks the product with the highest cumulative revenue across the given window', () => {
    const top = findTopPerformer(sampleMonths);
    expect(top?.name).toBe('雲端安全服務');
    expect(top?.rangeRevenue).toBe(4_200_000);
    expect(top?.shareOfTotal).toBeCloseTo(53.8462, 3);
    expect(top?.latestMonthRevenue).toBe(1_200_000);
  });

  it('returns null for an empty dataset', () => {
    expect(findTopPerformer([])).toBeNull();
  });
});

describe('buildProductRanking', () => {
  it('sums each product across the whole window, ranks by that sum, and caps at count', () => {
    const ranking = buildProductRanking(sampleMonths, 2);
    expect(ranking).toHaveLength(2);
    expect(ranking[0]).toMatchObject({ name: '雲端安全服務', revenue: 4_200_000 });
    expect(ranking[0].share).toBeCloseTo(53.8462, 3);
    expect(ranking[1]).toMatchObject({ name: '端點防護軟體', revenue: 2_100_000 });
    expect(ranking[1].share).toBeCloseTo(26.9231, 3);
  });

  it('only reflects the months it is given (i.e. respects an already-filtered window)', () => {
    const ranking = buildProductRanking(sampleMonths.slice(2), 3); // 2025-11, 2025-12 only
    const cloud = ranking.find((r) => r.name === '雲端安全服務');
    expect(cloud?.revenue).toBe(900_000 + 1_200_000);
  });
});

describe('buildProductTableRows', () => {
  it('ranks by window-summed revenue and trends latest-vs-previous month per product', () => {
    const rows = buildProductTableRows(sampleMonths, 3);
    expect(rows).toHaveLength(3);

    expect(rows[0]).toMatchObject({ rank: 1, name: '雲端安全服務', rangeRevenue: 4_200_000 });
    expect(rows[0].share).toBeCloseTo(53.8462, 3);
    expect(rows[0].trendPercent).toBeCloseTo(33.3333, 3);

    expect(rows[1]).toMatchObject({ rank: 2, name: '端點防護軟體', rangeRevenue: 2_100_000 });
    expect(rows[1].trendPercent).toBeCloseTo(-8.3333, 3);

    expect(rows[2]).toMatchObject({ rank: 3, name: '威脅情資平台', rangeRevenue: 1_500_000 });
    expect(rows[2].trendPercent).toBeCloseTo(12.5, 3);
  });

  it('returns an empty array for an empty dataset', () => {
    expect(buildProductTableRows([], 20)).toEqual([]);
  });

  it('leaves trendPercent null when there is no previous month to compare', () => {
    const rows = buildProductTableRows([sampleMonths[0]], 3);
    expect(rows.every((row) => row.trendPercent === null)).toBe(true);
  });
});
