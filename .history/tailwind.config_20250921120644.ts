import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Mengaktifkan mode gelap berbasis 'class'
  darkMode: "class",
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. Menambahkan palet warna kustom kita
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        muted: {
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      // 3. Menambahkan font 'Poppins'
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      // 4. Menambahkan efek bayangan (box-shadow) kustom
      boxShadow: {
        'custom-light': '0 4px 15px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 20px rgba(255, 140, 0, 0.2)',
      }
    },
  },
  plugins: [],
};

export default config;