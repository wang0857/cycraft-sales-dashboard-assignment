import type { MonthlyRevenue } from '../../types/sales';

export const sampleMonths: MonthlyRevenue[] = [
  {
    month: '2025-09',
    products: [
      { name: '雲端安全服務', revenue: 1_000_000 },
      { name: '端點防護軟體', revenue: 500_000 },
      { name: '威脅情資平台', revenue: 300_000 },
    ],
  },
  {
    month: '2025-10',
    products: [
      { name: '雲端安全服務', revenue: 1_100_000 },
      { name: '端點防護軟體', revenue: 450_000 },
      { name: '威脅情資平台', revenue: 350_000 },
    ],
  },
  {
    month: '2025-11',
    products: [
      { name: '雲端安全服務', revenue: 900_000 },
      { name: '端點防護軟體', revenue: 600_000 },
      { name: '威脅情資平台', revenue: 400_000 },
    ],
  },
  {
    month: '2025-12',
    products: [
      { name: '雲端安全服務', revenue: 1_200_000 },
      { name: '端點防護軟體', revenue: 550_000 },
      { name: '威脅情資平台', revenue: 450_000 },
    ],
  },
];
