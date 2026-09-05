import type { DateRangeKey } from '../../types/sales';

export const TrendDirection = {
  Up: 'up',
  Down: 'down',
  Flat: 'flat',
} as const;
export type TrendDirection = (typeof TrendDirection)[keyof typeof TrendDirection];

export function getTrendDirection(value: number | null | undefined): TrendDirection {
  if (value === null || value === undefined || value === 0) {
    return TrendDirection.Flat;
  }
  return value > 0 ? TrendDirection.Up : TrendDirection.Down;
}

export const DATE_RANGE_MONTH_COUNT: Record<DateRangeKey, number | null> = {
  '3m': 3,
  '6m': 6,
  '1y': 12,
  all: null,
};

export function resolveMonthWindow(range: DateRangeKey): number | null {
  return DATE_RANGE_MONTH_COUNT[range];
}
