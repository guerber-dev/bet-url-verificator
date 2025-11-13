import {Suspense} from 'react'
import {ErrorBoundary, type FallbackProps} from 'react-error-boundary'
import {Route, Routes} from 'react-router'
import { Home } from './pages/Home'

function renderError({error}: FallbackProps) {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre style={{whiteSpace: 'normal', color: 'red'}}>{error.message}</pre>
		</div>
	)
}

function LoadingOrError() {
	return <div>Loading...</div>
}

export function App() {
	return (
		<ErrorBoundary fallbackRender={renderError}>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route element={<Home />} index={true} />
				</Routes>
			</Suspense>
		</ErrorBoundary>
	)
}
