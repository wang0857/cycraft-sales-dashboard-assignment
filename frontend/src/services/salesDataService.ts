import { salesData } from '../data/salesData';
import type { MonthlyRevenue } from '../types/sales';

export async function getSalesData(): Promise<MonthlyRevenue[]> {
  return salesData;
}
