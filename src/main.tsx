import './global.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {App} from './App'
import {BettingCheckerProvider} from './context/BettingCheckerContext'

const queryClient = new QueryClient()

const container = document.querySelector('#root')
if (container) {
	const root = createRoot(container)
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<BrowserRouter basename="/">
					<BettingCheckerProvider>
						<App />
					</BettingCheckerProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</StrictMode>
	)
}
