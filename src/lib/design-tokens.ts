export const colors = {
  accent: '#10B981',
  accentHover: '#059669',
  accentLight: '#D1FAE5',
  accentGlow: '#10B98133',

  bgPrimary: '#FFFFFF',
  bgSecondary: '#F5F5F7',
  bgTertiary: '#FBFBFD',

  surface: '#FFFFFF',
  surface2: '#F5F5F7',

  border: '#D2D2D7',
  borderLight: '#E8E8ED',

  textPrimary: '#1D1D1F',
  textSecondary: '#6E6E73',
  textTertiary: '#AEAEB2',

  destructive: '#FF3B30',
  destructiveHover: '#D70015',

  info: '#0A84FF',
  warning: '#FF9F0A',

  status: {
    pending: { bg: '#FFF3CD', text: '#92400E' },
    confirmed: { bg: '#D1FAE5', text: '#065F46' },
    shipped: { bg: '#DBEAFE', text: '#1E40AF' },
    delivered: { bg: '#D1FAE5', text: '#10B981' },
    cancelled: { bg: '#FEE2E2', text: '#991B1B' },
    refunded: { bg: '#F3E8FF', text: '#6B21A8' },
  },
} as const;

export const darkColors = {
  accent: '#10B981',
  accentHover: '#34D399',
  accentLight: '#064E3B',
  accentGlow: '#10B98133',

  bgPrimary: '#000000',
  bgSecondary: '#1C1C1E',
  bgTertiary: '#2C2C2E',

  surface: '#1C1C1E',
  surface2: '#2C2C2E',

  border: '#38383A',
  borderLight: '#48484A',

  textPrimary: '#F5F5F7',
  textSecondary: '#AEAEB2',
  textTertiary: '#6E6E73',

  destructive: '#FF3B30',
  destructiveHover: '#D70015',

  info: '#0A84FF',
  warning: '#FF9F0A',

  status: {
    pending: { bg: '#3D2A0B', text: '#FCD34D' },
    confirmed: { bg: '#064E3B', text: '#6EE7B7' },
    shipped: { bg: '#1E3A8A', text: '#93C5FD' },
    delivered: { bg: '#064E3B', text: '#34D399' },
    cancelled: { bg: '#450A0A', text: '#FCA5A5' },
    refunded: { bg: '#3B0764', text: '#D8B4FE' },
  },
} as const;

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "SF Pro Display", sans-serif',
  fontMono: 'ui-monospace, "SF Mono", monospace',

  sizes: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    md: '17px',
    lg: '22px',
    xl: '28px',
    '2xl': '40px',
    '3xl': '56px',
  },

  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  letterSpacing: {
    titles: '-0.02em',
    body: '-0.01em',
    labels: '0em',
  },
} as const;

export const spacing = {
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
} as const;

export const borderRadius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
  lg: '0 8px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
  xl: '0 24px 64px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)',
  accent: '0 8px 32px rgba(16,185,129,0.25)',
} as const;

export const transitions = {
  ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  micro: '150ms',
  normal: '250ms',
  large: '400ms',
  hero: '600ms',
} as const;

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1440px',
} as const;

export const layout = {
  sidebarWidth: '260px',
  headerHeight: '60px',
} as const;
