import type { DateRangeOption } from '../../types/sales';

export const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  { key: '3m', label: '近 3 個月' },
  { key: '6m', label: '近 6 個月' },
  { key: '1y', label: '近 1 年' },
  { key: 'all', label: '全部（3 年）' },
];

export const DEFAULT_DATE_RANGE = 'all' as const;

export const RANKING_COUNT = 10;
export const TABLE_COUNT = 20;

export const CHART_COLORS = {
  revenue: '#00E5FF',
  momLine: '#4EDEA3',
  positive: '#10B981',
  negative: '#F43F5E',
  warning: '#F59E0B',
};

export const PRODUCT_COLOR_PALETTE = [
  '#00E5FF',
  '#10B981',
  '#4EDEA3',
  '#38BDF8',
  '#A78BFA',
  '#F59E0B',
  '#F43F5E',
  '#FB923C',
  '#34D399',
  '#818CF8',
];

export function getProductColor(index: number): string {
  return PRODUCT_COLOR_PALETTE[index % PRODUCT_COLOR_PALETTE.length];
}

export interface NavItem {
  key: string;
  label: string;
  sectionId: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: '總覽', sectionId: 'section-overview' },
  { key: 'trends', label: '趨勢', sectionId: 'section-trends' },
  { key: 'products', label: '產品', sectionId: 'section-products' },
  { key: 'reports', label: '報告', sectionId: 'section-reports' },
];
