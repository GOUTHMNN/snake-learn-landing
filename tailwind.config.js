/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                brand: {
                    primary: 'var(--color-primary)',
                    secondary: 'var(--color-secondary)',
                    accent: 'var(--color-accent)',
                    gold: '#F59E0B',
                },
                surface: {
                    deep: 'var(--color-bg-deep)',
                    elevated: 'var(--color-bg-elevated)',
                    card: 'var(--color-bg-card)',
                },
            },
            boxShadow: {
                'glow-sm': 'var(--shadow-glow-sm)',
                'glow-md': 'var(--shadow-glow-md)',
                'glow-lg': 'var(--shadow-glow-lg)',
                'depth': 'var(--shadow-depth)',
                'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.15)',
                'glow-purple': '0 0 30px rgba(139, 92, 246, 0.15)',
                'glow-gold': '0 0 30px rgba(245, 158, 11, 0.15)',
            },
            animation: {
                'gradient-x': 'gradient-x 3s ease infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 3s linear infinite',
                'border-flow': 'border-flow 4s linear infinite',
                spotlight: "spotlight 2s ease .75s 1 forwards",
            },
            keyframes: {
                spotlight: {
                    "0%": {
                        opacity: 0,
                        transform: "translate(-72%, -62%) scale(0.5)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translate(-50%,-40%) scale(1)",
                    },
                },
                shimmer: {
                    from: {
                        backgroundPosition: "0 0"
                    },
                    to: {
                        backgroundPosition: "-200% 0"
                    }
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
