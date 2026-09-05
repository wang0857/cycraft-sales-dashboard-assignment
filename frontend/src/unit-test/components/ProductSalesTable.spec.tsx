import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductSalesTable } from '../../components/dashboard/ProductSalesTable';
import type { ProductTableRow } from '../../types/sales';

const rows: ProductTableRow[] = [
  {
    rank: 1,
    name: '雲端安全服務',
    rangeRevenue: 4_200_000,
    share: 54.5455,
    trendPercent: 33.3333,
  },
  {
    rank: 2,
    name: '端點防護軟體',
    rangeRevenue: 2_100_000,
    share: 25,
    trendPercent: -8.3333,
  },
];

describe('ProductSalesTable', () => {
  it('renders one row per product with formatted currency, share, and trend values', () => {
    render(<ProductSalesTable rows={rows} />);

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('雲端安全服務')).toBeInTheDocument();
    expect(screen.getByText('NT$4,200,000')).toBeInTheDocument();
    expect(screen.getByText('54.5%')).toBeInTheDocument();
    expect(screen.getByText('+33.3%')).toBeInTheDocument();
    expect(screen.getByText('NT$2,100,000')).toBeInTheDocument();
    expect(screen.getByText('-8.3%')).toBeInTheDocument();
  });

  it('renders a table row for every product plus the header row', () => {
    render(<ProductSalesTable rows={rows} />);
    expect(screen.getAllByRole('row')).toHaveLength(rows.length + 1);
  });
});
