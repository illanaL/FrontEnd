export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "oklch(0.95 0.02 237)",
          100: "oklch(0.90 0.03 237)",
          200: "oklch(0.82 0.04 237)",
          300: "oklch(0.70 0.05 237)",
          400: "oklch(0.60 0.05 237)",
          500: "oklch(0.51 0.05 237)",
          600: "oklch(0.45 0.05 237)",
          700: "oklch(0.38 0.05 237)",
          800: "oklch(0.30 0.04 237)",
          900: "oklch(0.24 0.04 237)",
        }
      },
      keyframes: {
        popIn: {
          '0%':   { opacity: '0', transform: 'scale(2)' },
          '40%':  { opacity: '1', transform: 'scale(1)' },
          '70%':  { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {                             
        'fade-in': 'fadeIn 500ms ease-out forwards',
        'slide-up': 'slideUp 400ms ease-out forwards',
        'pop-in': 'popIn 2500ms ease-out 5 forwards',
      },
    },                                          
  },
}