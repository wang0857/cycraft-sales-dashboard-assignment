import { useState } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import Inventory2Rounded from '@mui/icons-material/Inventory2Rounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { NAV_ITEMS } from '../../utils/constants';

const NAV_ICONS: Record<string, ReactNode> = {
  overview: <DashboardRounded />,
  trends: <ShowChartRounded />,
  products: <Inventory2Rounded />,
  reports: <DescriptionRounded />,
};

export function BottomNav() {
  const [value, setValue] = useState('overview');

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const item = NAV_ITEMS.find((navItem) => navItem.key === newValue);
    if (item) {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        borderTop: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels sx={{ bgcolor: 'background.paper' }}>
        {NAV_ITEMS.map((item) => (
          <BottomNavigationAction key={item.key} value={item.key} label={item.label} icon={NAV_ICONS[item.key]} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
