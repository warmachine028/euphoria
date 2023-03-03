import { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { userPinsQuery, userQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import PinsNotFound from './PinsNotFound'

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const btnStyles = 'text-black font-bold p-2 rounded-full w-20 outline-none'

const UserProfile = () => {
	const [user, setUser] = useState(null)
	const [pins, setPins] = useState(null)
	const [text, setText] = useState('created') // created | saved
	const navigate = useNavigate()
	const { userId } = useParams()
	const logOut = () => {
		googleLogout()
		localStorage.clear()
		navigate('/login')
	}

	useEffect(() => {
		const query = userQuery(userId)
		client.fetch(query).then((data) => setUser(data[0]))
	}, [userId])

	// Event Listener to set Pin Every time text changes
	useEffect(() => {
		const query = userPinsQuery(userId, text)
		client.fetch(query).then((data) => setPins(data))
	}, [text, userId])
	return (
		<div className="relative pb-2 h-full justify-center items-center">
			<div className="flex flex-col pb-5">
				<div className="relative flex flex-col mb-7">
					<div className="flex flex-col justify-center items-center">
						<img src={randomImage} className="w-full h-370 2xl:h-510 shadow-lg object-cover" alt="banner" />
						<img src={user?.image} className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover" alt="user-profile" />
						<h1 className="font-bold text-3xl text-center mt-3">{user?.userName}</h1>
						<div className="absolute top-0 z-1 right-0 p-2">
							<button type="button" className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md" onClick={logOut}>
								<AiOutlineLogout color="red" fontSize={21} />
							</button>
						</div>
					</div>
					<div className="text-center mb-7">
						<button type="button" onClick={() => setText('created')} className={`${text === 'created' ? activeBtnStyles : btnStyles}`}>
							Created
						</button>
						<button type="button" onClick={() => setText('saved')} className={`${text === 'saved' ? activeBtnStyles : btnStyles}`}>
							Saved
						</button>
					</div>
					{pins?.length ? <MasonryLayout pins={pins} /> : <PinsNotFound />}
				</div>
			</div>
		</div>
	)
}

export default UserProfile
