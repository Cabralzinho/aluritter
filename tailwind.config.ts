import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: "#root",
  theme: {
    extend: {
      screens: {
        mobile: { max: '767px' },
        desktop: { max: '1024px' },
        tablet: { min: '768px', max: '1023px' }
      }
    },
  },
  plugins: [],
}

export default config
