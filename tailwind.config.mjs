import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	plugins: [typography],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				...defaultTheme.fontFamily,
				sans: ['Atkinson', ...defaultTheme.fontFamily.sans],
				mono: ['Fira Code', ...defaultTheme.fontFamily.mono]
			},
			colors: {
				...defaultTheme.colors,
				bg: {
					100: "var(--color-bg-100)",
					200: "var(--color-bg-200)",
					300: "var(--color-bg-300)",
					400: "var(--color-bg-400)",
					500: "var(--color-bg-500)",
					600: "var(--color-bg-600)",
					700: "var(--color-bg-700)",
					800: "var(--color-bg-800)",
					900: "var(--color-bg-900)",
				},
				text: {
					50: "var(--color-text-50)",
					100: "var(--color-text-100)",
					200: "var(--color-text-200)",
					300: "var(--color-text-300)",
					400: "var(--color-text-400)",
					500: "var(--color-text-500)",
					600: "var(--color-text-600)",
					700: "var(--color-text-700)",
					800: "var(--color-text-800)",
					900: "var(--color-text-900)",
				},
				primary: {
					100: "var(--color-primary-100)",
					200: "var(--color-primary-200)",
					300: "var(--color-primary-300)",
					400: "var(--color-primary-400)",
					500: "var(--color-primary-500)",
					600: "var(--color-primary-600)",
					700: "var(--color-primary-700)",
					800: "var(--color-primary-800)",
					900: "var(--color-primary-900)",
				},
				secondary: {
					100: "var(--color-secondary-100)",
					200: "var(--color-secondary-200)",
					300: "var(--color-secondary-300)",
					400: "var(--color-secondary-400)",
					500: "var(--color-secondary-500)",
					600: "var(--color-secondary-600)",
					700: "var(--color-secondary-700)",
					800: "var(--color-secondary-800)",
					900: "var(--color-secondary-900)",
				},
				accent: {
					100: "var(--color-accent-100)",
					200: "var(--color-accent-200)",
					300: "var(--color-accent-300)",
					400: "var(--color-accent-400)",
					500: "var(--color-accent-500)",
					600: "var(--color-accent-600)",
					700: "var(--color-accent-700)",
					800: "var(--color-accent-800)",
					900: "var(--color-accent-900)",
				},
			},
			animation: {
				'hero-pulse': 'hero-pulse 1s ease-in-out infinite alternate',
				'slide-right': 'slide-right 200ms ease-in-out',
				'slide-left': 'slide-left 200ms ease-in-out',
				'slide-up': 'slide-up 200ms ease-in-out',
				'slide-down': 'slide-down 200ms ease-in-out',
			},
			keyframes: {
				'hero-pulse': {
					'0%': {
						filter: 'grayscale(0)',
						opacity: 0.85
					},
					'100%':
					{
						filter: 'grayscale(0.8)',
						opacity: 1
					}
				},
				'slide-right': {
					'0%': { transform: 'translateX(-100px)', opacity: 0 },
					'100%': { transform: 'translateX(0)', opacity: 1 },
				},
				'slide-left': {
					'0%': { transform: 'translateX(100px)', opacity: 0 },
					'100%': { transform: 'translateX(0)', opacity: 1 },
				},
				'slide-up': {
					'0%': { transform: 'translateY(100px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
				'slide-down': {
					'0%': { transform: 'translateY(-100px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
			},
		},
	},
}
