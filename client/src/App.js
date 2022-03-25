import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Components/Login'

const App = () => {
	const [user, setUser] = useState(localStorage.getItem('user') === 'undefined' ? null : JSON.parse(localStorage.getItem('user')))

	useEffect(() => setUser(user), [user])
	
	return (
		<Routes>
			<Route path="/login" element={<Login setUser={setUser} />} />
			<Route path="/*" element={<Home user={user} />} />
		</Routes>
	)
}

export default App
