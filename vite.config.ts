import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig(() => ({
	plugins: [
		react(), 
		tailwindcss(),
		{
			name: 'html-transform',
			transformIndexHtml(html) {
				// Adiciona o base path em URLs absolutas que não o tenham
				return html
					.replace(/href="\/(?!bet-url-verificator)/g, 'href="/bet-url-verificator/')
					.replace(/url\('\/(?!bet-url-verificator)/g, "url('/bet-url-verificator/")
			}
		}
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	base: '/bet-url-verificator/'
}))
