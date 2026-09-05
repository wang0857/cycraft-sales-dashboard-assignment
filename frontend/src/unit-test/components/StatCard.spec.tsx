import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatCard } from '../../components/common/StatCard';

describe('StatCard', () => {
  it('renders the label, icon, and children content', () => {
    render(
      <StatCard icon={<span data-testid="icon" />} label="區間總營收 TOTAL REVENUE">
        <div>NT$1,000,000</div>
      </StatCard>,
    );

    expect(screen.getByText('區間總營收 TOTAL REVENUE')).toBeInTheDocument();
    expect(screen.getByText('NT$1,000,000')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
