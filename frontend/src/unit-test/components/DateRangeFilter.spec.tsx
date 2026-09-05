import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DateRangeFilter } from '../../components/common/DateRangeFilter';
import { DATE_RANGE_OPTIONS } from '../../utils/constants';

describe('DateRangeFilter', () => {
  it('renders every option label', () => {
    render(<DateRangeFilter options={DATE_RANGE_OPTIONS} value="all" onChange={() => {}} />);
    DATE_RANGE_OPTIONS.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('marks the active option as pressed', () => {
    render(<DateRangeFilter options={DATE_RANGE_OPTIONS} value="3m" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '近 3 個月' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with the clicked option key', () => {
    const handleChange = vi.fn();
    render(<DateRangeFilter options={DATE_RANGE_OPTIONS} value="all" onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button', { name: '近 6 個月' }));

    expect(handleChange).toHaveBeenCalledWith('6m');
  });
});
