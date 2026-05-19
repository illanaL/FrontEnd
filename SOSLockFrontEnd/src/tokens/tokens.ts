export const tokens = {
  colors: {
    teal: {
      50:  'oklch(0.95 0.02 237)',
      100: 'oklch(0.90 0.03 237)',
      200: 'oklch(0.82 0.04 237)',
      300: 'oklch(0.70 0.05 237)',
      400: 'oklch(0.60 0.05 237)',
      500: 'oklch(0.51 0.05 237)',
      600: 'oklch(0.45 0.05 237)',
      700: 'oklch(0.38 0.05 237)',
      800: 'oklch(0.30 0.04 237)',
      900: 'oklch(0.24 0.04 237)',
    },
    light: {
      primary:      'oklch(0.38 0.05 237)', // teal-700
      primaryHover: 'oklch(0.30 0.04 237)', // teal-800
      bg:           'white',
      bgSoft:       'oklch(0.95 0.02 237)', // teal-50
      text:         'oklch(0.24 0.04 237)', // teal-900
      textLight:    'oklch(0.90 0.03 237)', // teal-100
      border:       'oklch(0.82 0.04 237)', // teal-200
    },
    dark: {
      primary:      'oklch(0.60 0.05 237)', // teal-400
      primaryHover: 'oklch(0.70 0.05 237)', // teal-300
      bg:           'oklch(0.24 0.04 237)', // teal-900
      bgSoft:       'oklch(0.30 0.04 237)', // teal-800
      text:         'white',
      textLight:    'oklch(0.82 0.04 237)', // teal-200
      border:       'oklch(0.38 0.05 237)', // teal-700
    },
  },
  animation: {
    fadeIn:  'fadeIn 500ms ease-out forwards',
    slideUp: 'slideUp 400ms ease-out forwards',
  },
} as const;