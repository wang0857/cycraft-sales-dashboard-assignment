import raw from '../data-source/sales_data.json';
import type { MonthlyRevenue } from '../types/sales';

function assertMonthlyRevenueShape(data: unknown): asserts data is MonthlyRevenue[] {
  const isValid =
    Array.isArray(data) &&
    data.every(
      (month) =>
        typeof month === 'object' &&
        month !== null &&
        typeof (month as { month?: unknown }).month === 'string' &&
        Array.isArray((month as { products?: unknown }).products),
    );
  if (!isValid) {
    throw new Error('sales_data.json does not match the expected MonthlyRevenue[] shape');
  }
}

assertMonthlyRevenueShape(raw);

export const salesData = raw;
