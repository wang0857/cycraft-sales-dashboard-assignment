import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardOverview />
    </ThemeProvider>
  );
}

export default App;
