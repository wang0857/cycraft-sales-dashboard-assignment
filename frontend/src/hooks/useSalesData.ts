import { useEffect, useState } from 'react';
import { getSalesData } from '../services/salesDataService';
import type { MonthlyRevenue } from '../types/sales';

interface UseSalesDataResult {
  data: MonthlyRevenue[];
  loading: boolean;
  error: Error | null;
}

export function useSalesData(): UseSalesDataResult {
  const [data, setData] = useState<MonthlyRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getSalesData()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Failed to load sales data'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
