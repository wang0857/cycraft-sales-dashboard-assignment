import type {
  MomExtreme,
  MomGrowth,
  MonthMarker,
  MonthTotal,
  MonthWithGrowth,
  MonthlyRevenue,
  ProductRankingItem,
  ProductTableRow,
  TopPerformer,
} from '../../types/sales';

export function monthRevenueTotal(month: MonthlyRevenue): number {
  return month.products.reduce((sum, product) => sum + product.revenue, 0);
}

export function computeMonthTotals(months: MonthlyRevenue[]): MonthTotal[] {
  return months.map((month) => ({ month: month.month, revenue: monthRevenueTotal(month) }));
}

export function computeMomSeries(totals: MonthTotal[]): MonthWithGrowth[] {
  return totals.map((entry, index) => {
    if (index === 0) {
      return { ...entry, momPercent: null };
    }
    const previous = totals[index - 1].revenue;
    const momPercent = previous === 0 ? null : ((entry.revenue - previous) / previous) * 100;
    return { ...entry, momPercent };
  });
}

export function sumRevenue(totals: MonthTotal[]): number {
  return totals.reduce((sum, entry) => sum + entry.revenue, 0);
}

export function averageRevenue(totals: MonthTotal[]): number {
  return totals.length === 0 ? 0 : sumRevenue(totals) / totals.length;
}

export function computeMomGrowth(months: MonthlyRevenue[]): MomGrowth | null {
  if (months.length < 2) return null;
  const latest = months[months.length - 1];
  const previous = months[months.length - 2];
  const latestRevenue = monthRevenueTotal(latest);
  const previousRevenue = monthRevenueTotal(previous);
  if (previousRevenue === 0) return null;
  const absolute = latestRevenue - previousRevenue;
  const percent = (absolute / previousRevenue) * 100;
  return { latestMonth: latest.month, previousMonth: previous.month, percent, absolute };
}

export function findPeakAndTrough(totals: MonthTotal[]): {
  peak: MonthMarker | null;
  trough: MonthMarker | null;
} {
  if (totals.length === 0) return { peak: null, trough: null };
  let peak = totals[0];
  let trough = totals[0];
  for (const entry of totals) {
    if (entry.revenue > peak.revenue) peak = entry;
    if (entry.revenue < trough.revenue) trough = entry;
  }
  return {
    peak: { month: peak.month, revenue: peak.revenue },
    trough: { month: trough.month, revenue: trough.revenue },
  };
}

export function findMaxMomChange(momSeries: MonthWithGrowth[]): {
  increase: MomExtreme | null;
  decrease: MomExtreme | null;
} {
  let increase: MomExtreme | null = null;
  let decrease: MomExtreme | null = null;
  for (const entry of momSeries) {
    if (entry.momPercent === null) continue;
    if (increase === null || entry.momPercent > increase.percent) {
      increase = { month: entry.month, percent: entry.momPercent };
    }
    if (decrease === null || entry.momPercent < decrease.percent) {
      decrease = { month: entry.month, percent: entry.momPercent };
    }
  }
  return { increase, decrease };
}

export function computeRangeGrowth(totals: MonthTotal[]): { percent: number; absolute: number } | null {
  if (totals.length < 2) return null;
  const first = totals[0].revenue;
  const last = totals[totals.length - 1].revenue;
  if (first === 0) return null;
  return { percent: ((last - first) / first) * 100, absolute: last - first };
}

export function cumulativeByProduct(months: MonthlyRevenue[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const month of months) {
    for (const product of month.products) {
      totals.set(product.name, (totals.get(product.name) ?? 0) + product.revenue);
    }
  }
  return totals;
}

/**
 * `months` is expected to already be the filtered/selected window — every
 * caller here treats its input as the full scope to analyze, not "all history".
 */
export function findTopPerformer(months: MonthlyRevenue[]): TopPerformer | null {
  if (months.length === 0) return null;
  const cumulative = cumulativeByProduct(months);
  const grandTotal = sumRevenue(computeMonthTotals(months));

  let topName: string | null = null;
  let topRevenue = -Infinity;
  for (const [name, revenue] of cumulative) {
    if (revenue > topRevenue) {
      topName = name;
      topRevenue = revenue;
    }
  }
  if (topName === null) return null;

  const latestMonth = months[months.length - 1];
  const latestMonthRevenue = latestMonth.products.find((product) => product.name === topName)?.revenue ?? 0;

  return {
    name: topName,
    rangeRevenue: topRevenue,
    shareOfTotal: grandTotal === 0 ? 0 : (topRevenue / grandTotal) * 100,
    latestMonthRevenue,
  };
}

export function buildProductRanking(months: MonthlyRevenue[], count: number): ProductRankingItem[] {
  const cumulative = cumulativeByProduct(months);
  const windowTotal = sumRevenue(computeMonthTotals(months));

  return [...cumulative.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, revenue]) => ({
      name,
      revenue,
      share: windowTotal === 0 ? 0 : (revenue / windowTotal) * 100,
    }));
}

export function buildProductTableRows(months: MonthlyRevenue[], count: number): ProductTableRow[] {
  if (months.length === 0) return [];
  const cumulative = cumulativeByProduct(months);
  const windowTotal = sumRevenue(computeMonthTotals(months));

  const latestMonth = months[months.length - 1];
  const previousMonth = months.length > 1 ? months[months.length - 2] : null;

  return [...cumulative.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, revenue], index) => {
      const latestRevenue = latestMonth.products.find((p) => p.name === name)?.revenue ?? 0;
      const previousRevenue = previousMonth?.products.find((p) => p.name === name)?.revenue;
      const trendPercent =
        previousRevenue === undefined || previousRevenue === 0
          ? null
          : ((latestRevenue - previousRevenue) / previousRevenue) * 100;
      return {
        rank: index + 1,
        name,
        rangeRevenue: revenue,
        share: windowTotal === 0 ? 0 : (revenue / windowTotal) * 100,
        trendPercent,
      };
    });
}
