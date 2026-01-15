import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': 'var(--primary-purple)',
        'primary-purple-dark': 'var(--primary-purple-dark)',
        'primary-purple-light': 'var(--primary-purple-light)',
        'primary-gold': 'var(--primary-gold)',
        'primary-gold-dark': 'var(--primary-gold-dark)',
        'accent-purple': 'var(--accent-purple)',
        'accent-cream': 'var(--accent-cream)',
      },
    },
  },
  plugins: [],
};

export default config;
