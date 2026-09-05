export interface ProductRevenue {
  name: string;
  revenue: number;
}

export interface MonthlyRevenue {
  month: string;
  products: ProductRevenue[];
}

export type DateRangeKey = '3m' | '6m' | '1y' | 'all';

export interface DateRangeOption {
  key: DateRangeKey;
  label: string;
}

export interface MonthTotal {
  month: string;
  revenue: number;
}

export interface MonthWithGrowth extends MonthTotal {
  momPercent: number | null;
}

export interface MonthMarker {
  month: string;
  revenue: number;
}

export interface MomGrowth {
  latestMonth: string;
  previousMonth: string;
  percent: number;
  absolute: number;
}

export interface MomExtreme {
  month: string;
  percent: number;
}

export interface TopPerformer {
  name: string;
  rangeRevenue: number;
  shareOfTotal: number;
  latestMonthRevenue: number;
}

export interface ProductRankingItem {
  name: string;
  revenue: number;
  share: number;
}

export interface ProductTableRow {
  rank: number;
  name: string;
  rangeRevenue: number;
  share: number;
  trendPercent: number | null;
}

export interface DashboardMetrics {
  totalRevenue: number;
  monthCount: number;
  averageMonthlyRevenue: number;
  mom: MomGrowth | null;
  topPerformer: TopPerformer | null;
  comboSeries: MonthWithGrowth[];
  peakMonth: MonthMarker | null;
  troughMonth: MonthMarker | null;
  maxMomIncrease: MomExtreme | null;
  maxMomDecrease: MomExtreme | null;
  rangeGrowth: { percent: number; absolute: number } | null;
  ranking: ProductRankingItem[];
  tableRows: ProductTableRow[];
  latestMonthLabel: string | null;
  dateRangeLabel: string | null;
}
