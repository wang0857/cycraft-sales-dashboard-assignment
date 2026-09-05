import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrendBadge } from '../../components/common/TrendBadge';

describe('TrendBadge', () => {
  it('renders a positive percent with a plus sign', () => {
    render(<TrendBadge value={8.2} />);
    expect(screen.getByText('+8.2%')).toBeInTheDocument();
  });

  it('renders a negative percent with a minus sign', () => {
    render(<TrendBadge value={-4.2} />);
    expect(screen.getByText('-4.2%')).toBeInTheDocument();
  });

  it('renders a signed currency value when format is "currency"', () => {
    render(<TrendBadge value={829949} format="currency" />);
    expect(screen.getByText('+NT$829,949')).toBeInTheDocument();
  });

  it('renders a placeholder for null values', () => {
    render(<TrendBadge value={null} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
