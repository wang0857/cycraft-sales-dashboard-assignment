import { createTheme } from '@mui/material/styles';
import { FONT_FAMILY_BODY, FONT_FAMILY_HEADING, TYPE_SCALE } from './typography';

export const DESIGN_COLORS = {
  canvas: '#0B0E14',
  card: '#121722',
  interactive: '#1B2232',
  border: '#252E42',
  primary: '#00E5FF',
  secondary: '#10B981',
  tertiary: '#F43F5E',
  warning: '#F59E0B',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: DESIGN_COLORS.canvas, paper: DESIGN_COLORS.card },
    primary: { main: DESIGN_COLORS.primary, contrastText: '#00131A' },
    secondary: { main: DESIGN_COLORS.secondary, contrastText: '#00130C' },
    error: { main: DESIGN_COLORS.tertiary },
    warning: { main: DESIGN_COLORS.warning },
    text: {
      primary: DESIGN_COLORS.textPrimary,
      secondary: DESIGN_COLORS.textSecondary,
      disabled: DESIGN_COLORS.textMuted,
    },
    divider: DESIGN_COLORS.border,
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: FONT_FAMILY_BODY,
    h1: TYPE_SCALE.headlineLg,
    h2: TYPE_SCALE.headlineMd,
    h3: TYPE_SCALE.headlineSm,
    subtitle1: TYPE_SCALE.titleMd,
    body1: TYPE_SCALE.bodyLg,
    body2: TYPE_SCALE.bodyMd,
    caption: TYPE_SCALE.bodySm,
    overline: TYPE_SCALE.labelCaps,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: DESIGN_COLORS.canvas,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: DESIGN_COLORS.card,
          border: `1px solid ${DESIGN_COLORS.border}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY_HEADING,
          fontWeight: 600,
        },
      },
    },
  },
});
