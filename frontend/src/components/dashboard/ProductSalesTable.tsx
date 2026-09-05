import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { TrendBadge } from '../common/TrendBadge';
import { FONT_FAMILY_NUMERIC } from '../../theme/typography';
import { formatCurrency, formatPercent } from '../../utils/helpers/formatters';
import type { ProductTableRow } from '../../types/sales';

interface ProductSalesTableProps {
  rows: ProductTableRow[];
}

export function ProductSalesTable({ rows }: ProductSalesTableProps) {
  return (
    <TableContainer sx={{ maxHeight: 520 }}>
      <Table stickyHeader size="small" aria-label="產品銷售明細表" sx={{ minWidth: 640 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>排名</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>產品 / 服務名稱</TableCell>
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
              區間營收 (NT$)
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
              佔區間總營收比重
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
              趨勢狀態
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: FONT_FAMILY_NUMERIC, color: row.rank === 1 ? 'primary.main' : 'text.secondary' }}
                >
                  #{row.rank}
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.name}</TableCell>
              <TableCell align="right" sx={{ fontFamily: FONT_FAMILY_NUMERIC, whiteSpace: 'nowrap' }}>
                {formatCurrency(row.rangeRevenue)}
              </TableCell>
              <TableCell align="right" sx={{ fontFamily: FONT_FAMILY_NUMERIC, whiteSpace: 'nowrap' }}>
                {formatPercent(row.share, { signDisplay: false })}
              </TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                <TrendBadge value={row.trendPercent} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
