import { useMemo, useState } from 'react';
import { DEFAULT_DATE_RANGE } from '../utils/constants';
import { filterMonthsByRange } from '../utils/helpers/dateRangeFilter';
import type { DateRangeKey, MonthlyRevenue } from '../types/sales';

interface UseDateRangeResult {
  range: DateRangeKey;
  setRange: (range: DateRangeKey) => void;
  filteredMonths: MonthlyRevenue[];
}

export function useDateRange(months: MonthlyRevenue[]): UseDateRangeResult {
  const [range, setRange] = useState<DateRangeKey>(DEFAULT_DATE_RANGE);
  const filteredMonths = useMemo(() => filterMonthsByRange(months, range), [months, range]);
  return { range, setRange, filteredMonths };
}
