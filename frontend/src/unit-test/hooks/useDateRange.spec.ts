import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDateRange } from '../../hooks/useDateRange';
import { sampleMonths } from '../__fixtures__/sampleSales';

describe('useDateRange', () => {
  it('defaults to "all" and returns every month', () => {
    const { result } = renderHook(() => useDateRange(sampleMonths));
    expect(result.current.range).toBe('all');
    expect(result.current.filteredMonths).toHaveLength(4);
  });

  it('updates filteredMonths when setRange is called', () => {
    const { result } = renderHook(() => useDateRange(sampleMonths));

    act(() => {
      result.current.setRange('3m');
    });

    expect(result.current.range).toBe('3m');
    expect(result.current.filteredMonths.map((m) => m.month)).toEqual(['2025-10', '2025-11', '2025-12']);
  });
});
