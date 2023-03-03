import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import logo from '../assets/logo.png'
import { categories } from '../utils/data'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({ closeToggle, user }) => {
	const handleCloseSidebar = () => closeToggle(false)

	return (
		<div className="flex flex-col justify-between bg-white h-full overflow-y-auto min-w-210 hide-scrollbar">
			<div className="flex flex-col">
				<Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSidebar}>
					<img src={logo} alt="logo" className="w-full" />
				</Link>
				<div className="flex flex-col gap-5">
					<NavLink to="/" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar}>
						<RiHomeFill />
						Home
					</NavLink>
					<h3 className="mt-2 px-5 text-base 2xl:text-xl italic font-serif">Discover Categories</h3>
					{
						// Rendering All Categories in SideBar
						categories.slice(0, categories.length).map((category) => (
							<NavLink to={`/category/${category.name}`} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar} key={category.name}>
								<img src={category.image} className="w-7 h-7 rounded-full shadow-lg" alt="category" />
								{category.name}
							</NavLink>
						))
					}
				</div>
			</div>
			<Link to={`user-profile/${user.sub}`} className="flex my-5 mb-3 gap-2 items-center bg-white shadow-lg mx-3" onClick={handleCloseSidebar}>
				<img src={user.picture} alt="profile" className="w-10 h-10 rounded-full" />
				<p>{user.name}</p>
				<IoIosArrowForward />
			</Link>
		</div>
	)
}

export default Sidebar
