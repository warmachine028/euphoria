import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import logo from '../assets/euphoria.png'
import { client } from '../client'
import { useEffect } from 'react'

const Login = () => {
	const navigate = useNavigate()
	const user = localStorage.getItem('user')

	useEffect(() => {
		if (user === null || user === 'undefined') {
			localStorage.clear()
			navigate('/login')
		} else {
			navigate('/')
		}
	}, [navigate, user])

	const responseGoogle = (response) => {
		const profileObj = jwtDecode(response.credential)
		localStorage.setItem('user', JSON.stringify(profileObj))
		const { name, sub, picture } = profileObj
		const doc = { _id: sub, _type: 'user', userName: name, image: picture }
		client.createIfNotExists(doc).then(() => navigate('/', { replace: true }))
	}

	return (
		<div className="flex justify-start itmes-center flex-col h-screen">
			<div className="relative w-full h-full">
				<video src={shareVideo} type="video/mp4" loop controls={false} muted autoPlay className="w-full h-full object-cover" />
				<div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
					<div className="p-5">
						<img src={logo} width="200px" alt="Euphoria" />
					</div>

					<div className="shadow-2xl">
						<GoogleLogin onSuccess={responseGoogle} onFailure={responseGoogle} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
