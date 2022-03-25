import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import shareVideo from '../assets/share.mp4'
import { FcGoogle } from 'react-icons/fc'
import logo from '../assets/euphoria.png'
import { client } from '../client'
import { useEffect } from 'react'

const Login = ({ setUser }) => {
	const navigate = useNavigate()
	const user = localStorage.getItem('user')

	useEffect(() => {
		if (user === null || user === 'undefined') {
			localStorage.clear()
			navigate('/login')
		} else {
			setUser(JSON.parse(user))
			navigate('/')
		}
	}, [navigate, setUser, user])

	const responseGoogle = (response) => {
		localStorage.setItem('user', JSON.stringify(response.profileObj))
		const { name, googleId, imageUrl } = response.profileObj

		const doc = { _id: googleId, _type: 'user', userName: name, image: imageUrl }
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
						<GoogleLogin
							clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
							render={(renderProps) => (
								<button type="button" className="bg-mainColor fg-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none" onClick={renderProps.onClick} disabled={renderProps.disabled}>
									<FcGoogle className="mr-4" />
									Sign In With Google
								</button>
							)}
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy="single_host_origin"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
