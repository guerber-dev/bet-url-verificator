import {Route, Routes} from 'react-router'
import { Home } from './pages/Home'

export function App() {
	return (
		<Routes>
					<Route element={<Home />} index={true} />
		</Routes>
	)
}
