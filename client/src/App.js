import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Components/Login'

const App = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
	return (
		<Routes>
			<Route path="/login" element={<Login setUser={setUser} />} />
			<Route path="/*" element={<Home user={user} />} />
		</Routes>
	)
}

export default App
