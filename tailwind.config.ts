import type { Config } from "tailwindcss";
import { scopedPreflightStyles, isolateInsideOfContainer } from "tailwindcss-scoped-preflight";

const config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  safelist: [
    "lg:col-span-4",
    "lg:col-span-6",
    "lg:col-span-8",
    "lg:col-span-12",
    "border-border",
    "bg-card",
    "border-error",
    "bg-error/30",
    "border-success",
    "bg-success/30",
    "border-warning",
    "bg-warning/30",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        "2xl": "2rem",
        DEFAULT: "1rem",
        lg: "2rem",
        md: "2rem",
        sm: "1rem",
        xl: "2rem",
      },
      screens: {
        "2xl": "86rem",
        lg: "64rem",
        md: "48rem",
        sm: "40rem",
        xl: "80rem",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".twp", {
        except: ".no-twp", // optional, to exclude some elements under .twp from being preflighted, like external markup
      }),
    }),
  ],
  typography: () => ({
    DEFAULT: {
      css: [
        {
          "--tw-prose-body": "var(--text)",
          "--tw-prose-headings": "var(--text)",
          h1: {
            fontWeight: "normal",
            marginBottom: "0.25em",
          },
        },
      ],
    },
    base: {
      css: [
        {
          h1: {
            fontSize: "2.5rem",
          },
          h2: {
            fontSize: "1.25rem",
            fontWeight: 600,
          },
        },
      ],
    },
    md: {
      css: [
        {
          h1: {
            fontSize: "3.5rem",
          },
          h2: {
            fontSize: "1.5rem",
          },
        },
      ],
    },
  }),
} satisfies Config;

export default config;
