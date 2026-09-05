import BarChartRounded from '@mui/icons-material/BarChartRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import LeaderboardRounded from '@mui/icons-material/LeaderboardRounded';
import PaidRounded from '@mui/icons-material/PaidRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import TableRowsRounded from '@mui/icons-material/TableRowsRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateRangeFilter } from '../common/DateRangeFilter';
import { EmptyState } from '../common/EmptyState';
import { ErrorState } from '../common/ErrorState';
import { LoadingState } from '../common/LoadingState';
import { MiniStatGrid } from '../common/MiniStatGrid';
import { SectionCard } from '../common/SectionCard';
import type { SectionStatus } from '../common/SectionCard';
import { StatCard } from '../common/StatCard';
import { AppHeader } from '../layout/AppHeader';
import { BottomNav } from '../layout/BottomNav';
import { RevenueComboChart } from './RevenueComboChart';
import { RevenueTrendAreaChart } from './RevenueTrendAreaChart';
import { TopProductsRanking } from './TopProductsRanking';
import { ProductSalesTable } from './ProductSalesTable';
import { CHART_COLORS, DATE_RANGE_OPTIONS, RANKING_COUNT } from '../../utils/constants';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { useDateRange } from '../../hooks/useDateRange';
import { useSalesData } from '../../hooks/useSalesData';
import { FONT_FAMILY_NUMERIC, TYPE_SCALE } from '../../theme/typography';
import { formatCompactMillion, formatCompactYi, formatCurrency, formatPercent } from '../../utils/helpers/formatters';

export function DashboardOverview() {
  const { data, loading, error } = useSalesData();
  const { range, setRange, filteredMonths } = useDateRange(data);
  const metrics = useDashboardMetrics(filteredMonths);

  const baseStatus: SectionStatus = loading ? 'loading' : error ? 'error' : 'ready';
  const statusOr = (empty: boolean): SectionStatus => (baseStatus !== 'ready' ? baseStatus : empty ? 'empty' : 'ready');

  const momColor = (metrics.mom?.percent ?? 0) < 0 ? CHART_COLORS.negative : CHART_COLORS.positive;
  const tableRangeTotal = metrics.tableRows.reduce((sum, row) => sum + row.rangeRevenue, 0);
  const activeRangeLabel = DATE_RANGE_OPTIONS.find((option) => option.key === range)?.label ?? '';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 }, px: { xs: 2, md: 3 }, pb: { xs: 10, md: 4 } }}>
        <Stack spacing={3}>
          <Stack
            id="section-overview"
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              scrollMarginTop: 16,
            }}
          >
            <AppHeader />
            <DateRangeFilter options={DATE_RANGE_OPTIONS} value={range} onChange={setRange} />
          </Stack>

          {baseStatus === 'error' ? (
            <ErrorState height={320} />
          ) : (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <StatCard icon={<PaidRounded fontSize="small" />} label="區間總營收 TOTAL REVENUE" accentColor="text.secondary">
                  {baseStatus === 'loading' ? (
                    <LoadingState height={88} />
                  ) : (
                    <>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <Typography sx={{ ...TYPE_SCALE.labelNumericLg, color: 'text.primary' }}>
                          {formatCurrency(metrics.totalRevenue)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: CHART_COLORS.positive, fontFamily: FONT_FAMILY_NUMERIC }}>
                          {formatCompactYi(metrics.totalRevenue)}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        涵蓋月數：{metrics.monthCount} 個月・月均：{formatCurrency(metrics.averageMonthlyRevenue)}
                      </Typography>
                    </>
                  )}
                </StatCard>
              </Grid>

              <Grid size={{ xs: 6, md: 4 }}>
                <StatCard icon={<TrendingUpRounded fontSize="small" />} label="最新月成長率 MOM GROWTH" accentColor={momColor}>
                  {baseStatus === 'loading' ? (
                    <LoadingState height={88} />
                  ) : metrics.mom ? (
                    <>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography sx={{ ...TYPE_SCALE.labelNumericLg, color: momColor }}>
                          {formatPercent(metrics.mom.percent)}
                        </Typography>
                        <Chip
                          size="small"
                          label={metrics.mom.percent >= 0 ? '持續成長' : '成長放緩'}
                          sx={{ bgcolor: alpha(momColor, 0.14), color: momColor }}
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        對比基準期：{metrics.mom.previousMonth} vs {metrics.mom.latestMonth}・
                        {formatCurrency(metrics.mom.absolute, { signDisplay: true })}
                      </Typography>
                    </>
                  ) : (
                    <EmptyState message="尚無足夠月份可比較" height={88} />
                  )}
                </StatCard>
              </Grid>

              <Grid size={{ xs: 6, md: 4 }}>
                <StatCard icon={<EmojiEventsRounded fontSize="small" />} label="表現最好產品 TOP PERFORMER" accentColor={CHART_COLORS.warning}>
                  {baseStatus === 'loading' ? (
                    <LoadingState height={88} />
                  ) : metrics.topPerformer ? (
                    <>
                      <Typography variant="h3" noWrap>
                        {metrics.topPerformer.name}
                      </Typography>
                      <Chip
                        size="small"
                        icon={<EmojiEventsRounded sx={{ fontSize: '14px !important' }} />}
                        label={`冠軍（${formatPercent(metrics.topPerformer.shareOfTotal, { signDisplay: false })}）`}
                        sx={{ bgcolor: alpha(CHART_COLORS.warning, 0.14), color: CHART_COLORS.warning, my: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        該產品累計貢獻：{formatCurrency(metrics.topPerformer.rangeRevenue)}（
                        {formatCompactMillion(metrics.topPerformer.rangeRevenue)}）
                      </Typography>
                    </>
                  ) : (
                    <EmptyState message="尚無資料" height={88} />
                  )}
                </StatCard>
              </Grid>

              <Grid size={12}>
                <SectionCard
                  icon={<BarChartRounded fontSize="small" />}
                  title="複合分析圖表：各月總營收（長條）＋月成長率（折線）"
                  subtitle="雙軸同步呈現：左軸為營收規模（NT$ M），右軸為月成長率（%）"
                  action={
                    metrics.peakMonth && (
                      <Chip
                        size="small"
                        label={`最高月：${metrics.peakMonth.month}（${formatCompactMillion(metrics.peakMonth.revenue)}）`}
                        sx={{ bgcolor: alpha(CHART_COLORS.revenue, 0.14), color: CHART_COLORS.revenue }}
                      />
                    )
                  }
                  status={statusOr(metrics.comboSeries.length === 0)}
                >
                  <RevenueComboChart series={metrics.comboSeries} />
                  <MiniStatGrid
                    items={[
                      {
                        label: '區間營收峰值',
                        value: metrics.peakMonth ? `${metrics.peakMonth.month}（${formatCurrency(metrics.peakMonth.revenue)}）` : '—',
                      },
                      {
                        label: '最大月增幅',
                        value: metrics.maxMomIncrease
                          ? `${metrics.maxMomIncrease.month}（${formatPercent(metrics.maxMomIncrease.percent)}）`
                          : '—',
                        valueColor: CHART_COLORS.positive,
                      },
                      {
                        label: '最大月回檔',
                        value: metrics.maxMomDecrease
                          ? `${metrics.maxMomDecrease.month}（${formatPercent(metrics.maxMomDecrease.percent)}）`
                          : '—',
                        valueColor: CHART_COLORS.negative,
                      },
                    ]}
                  />
                </SectionCard>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <SectionCard
                  id="section-trends"
                  icon={<ShowChartRounded fontSize="small" />}
                  title={`${activeRangeLabel}營收走勢`}
                  subtitle="所選期間月營收走勢，標註區間高低點"
                  action={metrics.dateRangeLabel && <Chip size="small" label={metrics.dateRangeLabel} />}
                  status={statusOr(metrics.comboSeries.length === 0)}
                >
                  <RevenueTrendAreaChart series={metrics.comboSeries} />
                  <MiniStatGrid
                    items={[
                      {
                        label: '區間最低月谷底',
                        value: metrics.troughMonth
                          ? `${metrics.troughMonth.month}（${formatCurrency(metrics.troughMonth.revenue)}）`
                          : '—',
                        valueColor: CHART_COLORS.negative,
                      },
                      {
                        label: '區間最高月頂峰',
                        value: metrics.peakMonth
                          ? `${metrics.peakMonth.month}（${formatCurrency(metrics.peakMonth.revenue)}）`
                          : '—',
                        valueColor: CHART_COLORS.positive,
                      },
                      {
                        label: '區間成長',
                        value: metrics.rangeGrowth
                          ? `${formatPercent(metrics.rangeGrowth.percent)}（${formatCurrency(metrics.rangeGrowth.absolute, { signDisplay: true })}）`
                          : '—',
                        valueColor: CHART_COLORS.positive,
                      },
                    ]}
                  />
                </SectionCard>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <SectionCard
                  id="section-products"
                  icon={<LeaderboardRounded fontSize="small" />}
                  title="各產品線營收比較"
                  subtitle={`${activeRangeLabel}核心資安產品動態佔比（Top ${RANKING_COUNT}）`}
                  action={metrics.dateRangeLabel && <Chip size="small" label={metrics.dateRangeLabel} />}
                  status={statusOr(metrics.ranking.length === 0)}
                >
                  <TopProductsRanking items={metrics.ranking} count={RANKING_COUNT} />
                </SectionCard>
              </Grid>

              <Grid size={12}>
                <SectionCard
                  id="section-reports"
                  icon={<TableRowsRounded fontSize="small" />}
                  title="當期各產品線銷售表現明細"
                  subtitle="所選期間各產品線營收與佔比完整清單"
                  action={
                    <Chip
                      size="small"
                      label={`共 ${metrics.tableRows.length} 項・區間總計：${formatCurrency(tableRangeTotal)}`}
                    />
                  }
                  status={statusOr(metrics.tableRows.length === 0)}
                >
                  <ProductSalesTable rows={metrics.tableRows} />
                </SectionCard>
              </Grid>
            </Grid>
          )}
        </Stack>
      </Container>
      <BottomNav />
    </Box>
  );
}
