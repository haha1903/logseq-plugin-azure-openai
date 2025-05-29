// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#292D3E",
          dark: "#2f3447",
        },
        accent: {
          DEFAULT: "#373d53",
          hover: "#474e6c",
          dark: "#454c69",
        },
      },
      animation: {
        'bounce-delay-150': 'bounce 1s infinite 150ms',
        'bounce-delay-300': 'bounce 1s infinite 300ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      scrollbar: {
        hide: 'scrollbar-width: none; -ms-overflow-style: none; &::-webkit-scrollbar { display: none; }',
        thin: 'scrollbar-width: thin;',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            'border-radius': '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            'border-radius': '3px',
          },
        },
        '.scrollbar-thumb-slate-600': {
          '&::-webkit-scrollbar-thumb': {
            'background-color': '#475569',
          },
        },
        '.scrollbar-track-slate-800': {
          '&::-webkit-scrollbar-track': {
            'background-color': '#1e293b',
          },
        },
      })
    }
  ],
};
