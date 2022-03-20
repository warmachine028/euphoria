import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Components/Login'

const App = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

		if (!User) navigate('/login')
	}, [navigate])

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/*" element={<Home />} />
		</Routes>
	)
}
export default App
