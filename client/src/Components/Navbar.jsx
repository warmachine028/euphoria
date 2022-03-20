import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
	const navigate = useNavigate()

	if (!user) return null

	return (
		<div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
			<div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
				<IoMdSearch fontSize={21} className="ml-1" />
				<input type="text" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="Search" onFocus={() => navigate('/search')} className="p-2 w-full bg-white outline-none" />
			</div>
			<div className="flex gap-3">
				<Link to={`/create-pin`} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
					<IoMdAdd />
				</Link>
				<Link to={`user-profile/${user._id}`} className="hidden md:block align-middle">
					<img src={user.image} alt="user" className=" w-14 h-12 rounded-full" />
				</Link>
			</div>
		</div>
	)
}

export default Navbar
