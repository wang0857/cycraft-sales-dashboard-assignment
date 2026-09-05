import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { DateRangeKey, DateRangeOption } from '../../types/sales';

interface DateRangeFilterProps {
  options: DateRangeOption[];
  value: DateRangeKey;
  onChange: (value: DateRangeKey) => void;
}

export function DateRangeFilter({ options, value, onChange }: DateRangeFilterProps) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      size="small"
      onChange={(_event, next: DateRangeKey | null) => {
        if (next) onChange(next);
      }}
      sx={{ gap: 0.75, flexWrap: 'wrap' }}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.key}
          value={option.key}
          sx={{
            textTransform: 'none',
            borderRadius: '9999px !important',
            border: '1px solid',
            borderColor: 'divider',
            px: 1.75,
            py: 0.5,
            color: 'text.secondary',
            bgcolor: 'background.default',
            '&.Mui-selected': {
              color: 'primary.main',
              borderColor: 'primary.main',
              bgcolor: 'rgba(0, 229, 255, 0.12)',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgba(0, 229, 255, 0.18)',
            },
          }}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
