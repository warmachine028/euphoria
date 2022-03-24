import { Link, Route, Routes } from 'react-router-dom'
import { Sidebar, UserProfile } from '../Components'
import { useState, useRef, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import icon from '../assets/favicon.png'
import { HiMenu } from 'react-icons/hi'
import Pins from './Pins'
// import heading from '../assets/heading.png'

const Home = ({ user }) => {
	const [toggleSideBar, setToggleSideBar] = useState(false)
	const scrollRef = useRef(null)

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0)
	}, [scrollRef])

	if (!user) return null
	return (
		<div className="flex bg-grey-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
			<div className="hidden md:flex h-screen flex-initial">
				<Sidebar user={user} />
			</div>
			<div className="flex md:hidden flex-row">
				<div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
					<HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSideBar(true)} />
					<Link to="/*" className="flex space-x-5">
						<img src={icon} alt="logo" className="h-10" />
					</Link>
					<Link to={`user-profile/${user.googleId}`}>
						<img src={user.imageUrl} alt="user-pic" className="w-9 h-9 rounded-full" />
					</Link>
				</div>
				{toggleSideBar && (
					<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-empty z-10 animate-slide-in ease-out">
						<div className="absolute w-full flex justify-end items-center p-2">
							<AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSideBar(false)} />
						</div>
						<Sidebar user={user} closeToggle={setToggleSideBar} />
					</div>
				)}
			</div>
			<div className="pd-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
				<Routes>
					<Route path="/user-profile/:userId" element={<UserProfile />} />
					<Route path="/*" element={<Pins user={user} />} />
				</Routes>
			</div>
		</div>
	)
}

export default Home
