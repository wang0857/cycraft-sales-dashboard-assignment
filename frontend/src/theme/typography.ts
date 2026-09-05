export const FONT_FAMILY_HEADING = '"Space Grotesk", sans-serif';
export const FONT_FAMILY_BODY = '"Hanken Grotesk", sans-serif';
export const FONT_FAMILY_NUMERIC = '"JetBrains Mono", monospace';

export const TYPE_SCALE = {
  headlineLg: {
    fontFamily: FONT_FAMILY_HEADING,
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '44px',
    letterSpacing: '-0.03em',
  },
  headlineLgMobile: {
    fontFamily: FONT_FAMILY_HEADING,
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '34px',
    letterSpacing: '-0.02em',
  },
  headlineMd: {
    fontFamily: FONT_FAMILY_HEADING,
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '28px',
    letterSpacing: '-0.02em',
  },
  headlineSm: {
    fontFamily: FONT_FAMILY_HEADING,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },
  titleMd: {
    fontFamily: FONT_FAMILY_BODY,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '-0.01em',
  },
  bodyLg: {
    fontFamily: FONT_FAMILY_BODY,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '22px',
  },
  bodyMd: {
    fontFamily: FONT_FAMILY_BODY,
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '18px',
  },
  bodySm: {
    fontFamily: FONT_FAMILY_BODY,
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0.01em',
  },
  labelNumericLg: {
    fontFamily: FONT_FAMILY_NUMERIC,
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '28px',
    letterSpacing: '-0.03em',
  },
  labelNumericMd: {
    fontFamily: FONT_FAMILY_NUMERIC,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
  },
  labelNumericSm: {
    fontFamily: FONT_FAMILY_NUMERIC,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
  },
  labelCaps: {
    fontFamily: FONT_FAMILY_HEADING,
    fontSize: '10px',
    fontWeight: 700,
    lineHeight: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
};
