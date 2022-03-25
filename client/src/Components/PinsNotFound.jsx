import image from '../assets/404_background.png'

const pageNotFound = () => {
	return (
		<div className="flex items-center flex-col">
			<h1
				className="font-mono font-bold text-[130px] md:text-[150px] pl-5"
				style={{
					background: `url(${image})`,
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				Oops!
			</h1>
			<h3 className="uppercase font-medium text-[15px] font-['Helvetica']">404! No Pins found</h3>
		</div>
	)
}

export default pageNotFound
