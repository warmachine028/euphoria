import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => (
	<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</BrowserRouter>
	</GoogleOAuthProvider>
)

export default App
