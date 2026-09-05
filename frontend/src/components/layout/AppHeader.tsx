import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';

export function AppHeader() {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Box component="img" src={logo} alt="Logo" sx={{ width: 40, height: 40, flexShrink: 0 }} />
      <Box>
        <Typography variant="h2" component="h1">
          資安產品 3 年銷售分析
        </Typography>
        <Typography variant="body2" color="text.secondary">
          資安產品與服務 3 年全維度營收分析平台（2023-2025）
        </Typography>
      </Box>
    </Stack>
  );
}
