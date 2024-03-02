const colors = require('tailwindcss/colors')
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        linagee: {
          dark: colors.gray[900],
          gray: colors.gray[100],
          grayer: '#EDF2F7',
          purple: colors.purple[300],
          link: colors.slate[400],
          lightBackground: '#F7F7F7',
          lightBackground2: '#FFFFFF',
          darkBackground: '#2D3748',
          darkBackground2: '#1A202C',
          darkBackground3: '#171923',
        },
    },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        linagee: ['Source Sans Pro', 'sans-serif'],
        linageeSerif: ['Source Serif Pro', 'serif'],
        linageeMono: ['Source Code Pro', 'monospace'],
        linageeHyperspace: ['Barlow', 'sans-serif'],
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseColor: {
          '0%, 100%': {color: 'default'},
          '50%': {color: colors.yellow[400]},
        },
      },
      animation: {
        rotate: 'rotate 4s linear infinite',
        pulseColor: 'pulseColor 2s ease-in-out infinite'
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },

  plugins: [
    require("flowbite/plugin"),
    require("@headlessui/tailwindcss"),
    addVariablesForColors
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
