import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Atkinson', ...defaultTheme.fontFamily.sans],
				serif: ['Roboto Serif', ...defaultTheme.fontFamily.serif]
			},
			colors: {
				...defaultTheme.colors,
				bg: {
					100: "rgb(from var(--bg) r g b / .2)",
					200: "rgb(from var(--bg) r g b / .3)",
					300: "rgb(from var(--bg) r g b / .4)",
					400: "rgb(from var(--bg) r g b / .5)",
					500: "rgb(from var(--bg) r g b / .6)",
					600: "rgb(from var(--bg) r g b / .7)",
					700: "rgb(from var(--bg) r g b / .8)",
					800: "rgb(from var(--bg) r g b / .9)",
					900: "var(--bg)"
				},
				text: {
					100: "rgb(from var(--text) r g b / .2)",
					200: "rgb(from var(--text) r g b / .3)",
					300: "rgb(from var(--text) r g b / .4)",
					400: "rgb(from var(--text) r g b / .5)",
					500: "rgb(from var(--text) r g b / .6)",
					600: "rgb(from var(--text) r g b / .7)",
					700: "rgb(from var(--text) r g b / .8)",
					800: "rgb(from var(--text) r g b / .9)",
					900: "var(--text)"
				},
				primary: {
					100: "rgb(from var(--primary) r g b / .2)",
					200: "rgb(from var(--primary) r g b / .3)",
					300: "rgb(from var(--primary) r g b / .4)",
					400: "rgb(from var(--primary) r g b / .5)",
					500: "rgb(from var(--primary) r g b / .6)",
					600: "rgb(from var(--primary) r g b / .7)",
					700: "rgb(from var(--primary) r g b / .8)",
					800: "rgb(from var(--primary) r g b / .9)",
					900: "var(--primary)"
				},
				secondary: {
					100: "rgb(from var(--secondary) r g b / .2)",
					200: "rgb(from var(--secondary) r g b / .3)",
					300: "rgb(from var(--secondary) r g b / .4)",
					400: "rgb(from var(--secondary) r g b / .5)",
					500: "rgb(from var(--secondary) r g b / .6)",
					600: "rgb(from var(--secondary) r g b / .7)",
					700: "rgb(from var(--secondary) r g b / .8)",
					800: "rgb(from var(--secondary) r g b / .9)",
					900: "var(--secondary)"
				},
				accent: {
					100: "rgb(from var(--accent) r g b / .2)",
					200: "rgb(from var(--accent) r g b / .3)",
					300: "rgb(from var(--accent) r g b / .4)",
					400: "rgb(from var(--accent) r g b / .5)",
					500: "rgb(from var(--accent) r g b / .6)",
					600: "rgb(from var(--accent) r g b / .7)",
					700: "rgb(from var(--accent) r g b / .8)",
					800: "rgb(from var(--accent) r g b / .9)",
					900: "var(--accent)"
				},
			}
		},
	},
	plugins: [],
}
