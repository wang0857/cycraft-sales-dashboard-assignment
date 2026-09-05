import { RankingList } from '../common/RankingList';
import type { ProductRankingItem } from '../../types/sales';

interface TopProductsRankingProps {
  items: ProductRankingItem[];
  count: number;
}

export function TopProductsRanking({ items, count }: TopProductsRankingProps) {
  return <RankingList items={items} count={count} />;
}
