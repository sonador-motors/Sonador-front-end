import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                'teal-dark-start': '#194950',
                'teal-dark-end': '#0A3B43',
            },
            keyframes: {
                techFloatLeft: {
                    '0%, 100%': {
                        transform: 'translateY(-10px) rotate3d(1, 1, 0, -2deg)',
                    },
                    '50%': {
                        transform: 'translateY(10px) rotate3d(1, 1, 0, 2deg)',
                    }
                },
                techFloatRight: {
                    '0%, 100%': {
                        transform: 'translateY(10px) rotate3d(1, -1, 0, 2deg)',
                    },
                    '50%': {
                        transform: 'translateY(-10px) rotate3d(1, -1, 0, -2deg)',
                    }
                },
                techPulse: {
                    '0%, 100%': {opacity: '0.8'},
                    '50%': {opacity: '1.0'}
                }
            },
        },
        animation: {
            techFloatLeft: 'techFloatLeft 10s ease-in-out infinite',
            techFloatRight: 'techFloatRight 10s ease-in-out infinite',
            techPulse: 'techPulse 4s ease-in-out infinite',
        },
        fontFamily: {
            sans: [
                'Arial',
                'Helvetica Neue',
                'Hiragino Kaku Gothic ProN',
                'Yu Gothic',
                'Meiryo',
                'system-ui',
                'sans-serif'
            ]
        }
    },
    plugins: [],
} satisfies
Config;
