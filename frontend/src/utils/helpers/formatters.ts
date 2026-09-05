const GROUPING_FORMATTER = new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 0 });

export function formatCurrency(value: number, options: { signDisplay?: boolean } = {}): string {
  const { signDisplay = false } = options;
  const sign = value < 0 ? '-' : signDisplay && value > 0 ? '+' : '';
  return `${sign}NT$${GROUPING_FORMATTER.format(Math.abs(value))}`;
}

export function formatCompactYi(value: number): string {
  return `${(value / 100_000_000).toFixed(2)}億`;
}

export function formatCompactMillion(value: number): string {
  return `${(value / 1_000_000).toFixed(1)}M`;
}

export function formatMonthRangeLabel(months: { month: string }[]): string {
  if (months.length === 0) return '—';
  const first = months[0].month;
  const last = months[months.length - 1].month;
  return first === last ? first : `${first} – ${last}`;
}

export function formatPercent(
  value: number | null | undefined,
  options: { decimals?: number; signDisplay?: boolean } = {},
): string {
  const { decimals = 1, signDisplay = true } = options;
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—';
  }
  const sign = value > 0 && signDisplay ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}
