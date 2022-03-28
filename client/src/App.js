import { Routes, Route } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Components/Login'

const App = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/*" element={<Home />} />
		</Routes>
	)
}

export default App
