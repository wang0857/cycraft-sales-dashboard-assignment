import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { BarPlot, ChartsGrid, ChartsContainer, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot } from '@mui/x-charts';
import { CHART_COLORS } from '../../utils/constants';
import { formatCompactMillion, formatCurrency, formatPercent } from '../../utils/helpers/formatters';
import type { MonthWithGrowth } from '../../types/sales';

interface RevenueComboChartProps {
  series: MonthWithGrowth[];
}

function LegendDot({ color, shape }: { color: string; shape: 'bar' | 'line' }) {
  return (
    <Box
      sx={{
        width: 12,
        height: shape === 'bar' ? 12 : 3,
        borderRadius: shape === 'bar' ? 0.5 : 999,
        bgcolor: color,
      }}
    />
  );
}

export function RevenueComboChart({ series }: RevenueComboChartProps) {
  const theme = useTheme();
  const months = series.map((entry) => entry.month);
  const revenues = series.map((entry) => entry.revenue);
  const momValues = series.map((entry) => entry.momPercent ?? 0);

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={2.5}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <LegendDot color={CHART_COLORS.revenue} shape="bar" />
          <Typography variant="caption" color="text.secondary">
            總營收（長條）
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <LegendDot color={CHART_COLORS.momLine} shape="line" />
          <Typography variant="caption" color="text.secondary">
            月成長率（折線）
          </Typography>
        </Stack>
      </Stack>

      <ChartsContainer
        height={340}
        sx={{
          '& .MuiBarChart-element': {
            fillOpacity: 0.5,
            stroke: CHART_COLORS.revenue,
            strokeOpacity: 1,
            strokeWidth: 1,
          },
        }}
        series={[
          {
            type: 'bar',
            id: 'revenue',
            data: revenues,
            yAxisId: 'revenue-axis',
            xAxisId: 'month-axis',
            color: CHART_COLORS.revenue,
            valueFormatter: (value: number | null) => (value === null ? '' : formatCurrency(value)),
          },
          {
            type: 'line',
            id: 'mom',
            data: momValues,
            yAxisId: 'mom-axis',
            xAxisId: 'month-axis',
            color: CHART_COLORS.momLine,
            curve: 'monotoneX',
            valueFormatter: (value: number | null) => (value === null ? '' : formatPercent(value)),
          },
        ]}
        xAxis={[{ id: 'month-axis', data: months, scaleType: 'band' }]}
        yAxis={[
          {
            id: 'revenue-axis',
            position: 'left',
            valueFormatter: (value: number) => formatCompactMillion(value),
          },
          {
            id: 'mom-axis',
            position: 'right',
            valueFormatter: (value: number) => `${value.toFixed(0)}%`,
          },
        ]}
      >
        <ChartsGrid horizontal />
        <BarPlot borderRadius={Number(theme.shape.borderRadius) * 0.25} />
        <LinePlot />
        <ChartsXAxis axisId="month-axis" />
        <ChartsYAxis axisId="revenue-axis" />
        <ChartsYAxis axisId="mom-axis" />
        <ChartsTooltip trigger="axis" />
      </ChartsContainer>
    </Stack>
  );
}
