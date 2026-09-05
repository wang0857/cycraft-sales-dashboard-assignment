import type { DateRangeKey, MonthlyRevenue } from '../../types/sales';
import { resolveMonthWindow } from '../enums';

export function filterMonthsByRange(months: MonthlyRevenue[], range: DateRangeKey): MonthlyRevenue[] {
  const windowSize = resolveMonthWindow(range);
  if (windowSize === null || windowSize >= months.length) {
    return months;
  }
  return months.slice(months.length - windowSize);
}
