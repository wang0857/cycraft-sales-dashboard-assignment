import { useMemo } from 'react';
import { RANKING_COUNT, TABLE_COUNT } from '../utils/constants';
import {
  averageRevenue,
  buildProductRanking,
  buildProductTableRows,
  computeMomGrowth,
  computeMomSeries,
  computeMonthTotals,
  computeRangeGrowth,
  findMaxMomChange,
  findPeakAndTrough,
  findTopPerformer,
  sumRevenue,
} from '../utils/helpers/salesAggregation';
import { formatMonthRangeLabel } from '../utils/helpers/formatters';
import type { DashboardMetrics, MonthlyRevenue } from '../types/sales';

/**
 * `months` is the already date-range-filtered set — every metric here (stat cards,
 * both charts, ranking, table) is scoped to it, so every one of them responds to the
 * 近3個月/近6個月/近1年/全部(3年) filter.
 */
export function useDashboardMetrics(months: MonthlyRevenue[]): DashboardMetrics {
  return useMemo(() => {
    const totals = computeMonthTotals(months);
    const comboSeries = computeMomSeries(totals);
    const { peak, trough } = findPeakAndTrough(totals);
    const { increase, decrease } = findMaxMomChange(comboSeries);
    const latestMonth = months.length > 0 ? months[months.length - 1] : null;

    return {
      totalRevenue: sumRevenue(totals),
      monthCount: months.length,
      averageMonthlyRevenue: averageRevenue(totals),
      mom: computeMomGrowth(months),
      topPerformer: findTopPerformer(months),
      comboSeries,
      peakMonth: peak,
      troughMonth: trough,
      maxMomIncrease: increase,
      maxMomDecrease: decrease,
      rangeGrowth: computeRangeGrowth(totals),
      ranking: buildProductRanking(months, RANKING_COUNT),
      tableRows: buildProductTableRows(months, TABLE_COUNT),
      latestMonthLabel: latestMonth?.month ?? null,
      dateRangeLabel: formatMonthRangeLabel(months),
    };
  }, [months]);
}
