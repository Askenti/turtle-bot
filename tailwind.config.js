/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── WARDEN brand palette (hotel × robotics) ──
        warden: {
          // Deep teal — primary dark backgrounds
          'teal-deep':   '#051E22',
          'teal-dark':   '#0A2E33',
          'teal':        '#103E42',
          'teal-mid':    '#155A60',
          'teal-light':  '#1F8189',
          // Warm beige — light/hotel-lobby sections
          'beige':       '#F5F0E6',
          'beige-warm':  '#EDE3D0',
          'beige-soft':  '#E2D7BE',
          'beige-mute':  '#A89A82',
          // Electric cyan — accents, glow, interactive
          'cyan':        '#00F0FF',
          'cyan-bright': '#66F7FF',
          'cyan-soft':   '#3DD9E6',
          'cyan-dim':    '#1A8B94',
          'cyan-glow':   'rgba(0, 240, 255, 0.18)',
          // Ink — text on light bg
          'ink':         '#0A2E33',
          'ink-mute':    '#46686C',
        },
        // ── Spectra: Luxury Smart Hospitality palette ──
        // Premium hotel + Apple minimalism. Cream is intentionally neutral
        // (avoiding yellow drift); mist-blue carries the "smart tech" notes.
        spectra: {
          'cream':       '#F4EFE7',  // primary light bg — neutral, slight gray undertone
          'cream-deep':  '#EBE4D6',  // section variant for soft alternation
          'pearl':       '#FBFAF7',  // near-white with cream warmth
          'mist':        '#D6E1E8',  // soft pale blue — cards, dashboards
          'mist-deep':   '#B4C6D2',  // accented blue for highlights
          'mist-glass':  'rgba(214, 225, 232, 0.6)',
          'ink':         '#0A0E12',  // softened black with blue undertone
          'ink-soft':    '#1A1F25',
          'ink-mute':    '#3A4045',  // secondary body text
          'ink-faint':   '#7A8088',  // tertiary / captions
          'hairline':    'rgba(10, 14, 18, 0.08)',  // 1px divider on cream
        },
        // ── Agency dark palette ──
        agency: {
          'black':       '#0a0a0a',
          'dark':        '#111111',
          'gray':        '#1a1a1a',
          'muted':       '#2a2a2a',
          'sand':        '#c9b99a',
          'sand-light':  '#d9cdb2',
          'sand-muted':  '#a09078',
          'cream':       '#f5f0e6',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'editorial': ['"Cormorant Garamond"', 'Georgia', 'serif'],  // luxury hospitality headlines
        'sans': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "glitch-bar": {
          "0%, 100%": { transform: "translateX(0)", opacity: "0.8" },
          "10%": { transform: "translateX(-2px)", opacity: "1" },
          "20%": { transform: "translateX(2px)", opacity: "0.6" },
          "30%": { transform: "translateX(0)", opacity: "0.9" },
          "40%": { transform: "translateX(-1px)", opacity: "0.7" },
          "50%": { transform: "translateX(1px)", opacity: "1" },
          "60%": { transform: "translateX(0)", opacity: "0.8" },
        },
        "text-flicker": {
          "0%, 100%": { opacity: "1" },
          "3%": { opacity: "0.8" },
          "6%": { opacity: "1" },
          "7%": { opacity: "0.9" },
          "9%": { opacity: "1" },
          "87%": { opacity: "1" },
          "89%": { opacity: "0.85" },
          "91%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "glitch-bar": "glitch-bar 3s ease-in-out infinite",
        "text-flicker": "text-flicker 4s ease-in-out infinite",
      },
      transitionDuration: {
        '220': '220ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.23,1,0.32,1)',
        'smooth': 'cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
