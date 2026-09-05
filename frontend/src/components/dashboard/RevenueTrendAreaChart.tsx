import { AreaPlot, ChartsContainer, ChartsGrid, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot } from '@mui/x-charts';
import { CHART_COLORS } from '../../utils/constants';
import { formatCompactMillion, formatCurrency } from '../../utils/helpers/formatters';
import type { MonthTotal } from '../../types/sales';

interface RevenueTrendAreaChartProps {
  series: MonthTotal[];
}

const GRADIENT_ID = 'revenue-trend-area-gradient';

export function RevenueTrendAreaChart({ series }: RevenueTrendAreaChartProps) {
  const months = series.map((entry) => entry.month);
  const revenues = series.map((entry) => entry.revenue);

  return (
    <ChartsContainer
      height={280}
      sx={{
        '& .MuiLineChart-area': { fill: `url(#${GRADIENT_ID})` },
      }}
      series={[
        {
          type: 'line',
          id: 'trend',
          data: revenues,
          xAxisId: 'month-axis',
          yAxisId: 'revenue-axis',
          area: true,
          showMark: false,
          color: CHART_COLORS.revenue,
          valueFormatter: (value: number | null) => (value === null ? '' : formatCurrency(value)),
        },
      ]}
      xAxis={[{ id: 'month-axis', data: months, scaleType: 'point' }]}
      yAxis={[{ id: 'revenue-axis', valueFormatter: (value: number) => formatCompactMillion(value) }]}
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHART_COLORS.revenue} stopOpacity={0.5} />
          <stop offset="100%" stopColor={CHART_COLORS.revenue} stopOpacity={0} />
        </linearGradient>
      </defs>
      <ChartsGrid horizontal />
      <AreaPlot />
      <LinePlot />
      <ChartsXAxis axisId="month-axis" />
      <ChartsYAxis axisId="revenue-axis" />
      <ChartsTooltip trigger="axis" />
    </ChartsContainer>
  );
}
