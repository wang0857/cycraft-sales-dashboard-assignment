import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RankingList } from '../../components/common/RankingList';
import type { ProductRankingItem } from '../../types/sales';

const items: ProductRankingItem[] = [
  { name: '雲端安全服務', revenue: 1_200_000, share: 54.5455 },
  { name: '端點防護軟體', revenue: 550_000, share: 25 },
  { name: '威脅情資平台', revenue: 450_000, share: 20.4545 },
];

describe('RankingList', () => {
  it('renders every item when count is omitted', () => {
    render(<RankingList items={items} />);
    expect(screen.getByText(/1\. 雲端安全服務/)).toBeInTheDocument();
    expect(screen.getByText(/2\. 端點防護軟體/)).toBeInTheDocument();
    expect(screen.getByText(/3\. 威脅情資平台/)).toBeInTheDocument();
  });

  it('caps the rendered items at count, keeping the original order', () => {
    render(<RankingList items={items} count={2} />);
    expect(screen.getByText(/1\. 雲端安全服務/)).toBeInTheDocument();
    expect(screen.getByText(/2\. 端點防護軟體/)).toBeInTheDocument();
    expect(screen.queryByText(/威脅情資平台/)).not.toBeInTheDocument();
  });
});
