import {Route, Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import Lgpd from './pages/lgpd'

export function App() {
	return (
		<Routes>
				<Route element={<Home />} index={true} />
				<Route path="/lgpd" element={<Lgpd />} />
		</Routes>
	)
}
