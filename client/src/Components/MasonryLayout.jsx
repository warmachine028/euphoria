import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakpointObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
}

const MasonryLayout = ({ pins }) => {
	const user = JSON.parse(localStorage.getItem('user'))

	return (
		<Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
			{pins?.map((pin) => <Pin key={pin._id} pin={pin} user={user} className="w-max" />)}
		</Masonry>
	)
}

export default MasonryLayout
