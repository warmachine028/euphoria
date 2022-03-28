import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { urlFor, client } from '../client'

const Pin = ({ pin: { postedBy, image, _id, destination, save: saves }, user: { googleId } }) => {
	const [postHovered, setPostHovered] = useState(false)
	const [savingPost, setSavingPost] = useState(false)
	const navigate = useNavigate()
	const alreadySaved = !!saves?.filter((save) => save.postedBy?._id === googleId)?.length
	const maxlength = 15

	const deletePin = (id) => client.delete(id).then(() => window.location.reload())

	const savePin = (id) => {
		setSavingPost(true)
		// ! Unsave POST -> Not Working
		if (saves.filter((save) => save.postedBy?._id === googleId)) {
			console.log("Yes, it's already saved. Now Unsave it.")
			client
				.patch(id)
				.unset([`save[UserId=="${googleId}"]`])
				.commit()
				.then(() => window.location.reload())
				.finally(() => setSavingPost(false))
		} else {
			client
				.patch(id)
				.insert('after', 'save[-1]', [
					{
						_key: uuidv4(),
						userId: googleId,
						postedBy: {
							_type: 'postedBy',
							_ref: googleId,
						},
					},
				])
				.commit()
				.then(() => {
					window.location.reload()
					setSavingPost(false)
				})
		}
	}


	return (
		<div className="m-2">
			<div onMouseEnter={() => setPostHovered(true)} onMouseLeave={() => setPostHovered(false)} onClick={() => navigate(`/pin-detail/${_id}`)} className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
				{image && <img className="rounded-lg w-full" alt="user-post" src={urlFor(image).width(250).url()} />}
				{postHovered && (
					<div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" style={{ height: '100%' }}>
						<div className="flex items-center justify-between">
							<div className="flex gap-2">
								<a href={`${image?.asset?.url}?dl=`} download onClick={(e) => e.stopPropagation()} className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
									<MdDownloadForOffline />
								</a>
							</div>
							<button
								type="button"
								className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
								onClick={(e) => {
									e.stopPropagation()
									savePin(_id)
								}}
							>
								{alreadySaved ? `${saves?.length} Saved` : savingPost ? 'saving...' : 'save'}
							</button>
						</div>
						<div className="flex justify-between items-center gap-2 w-full">
							<a href={destination} target="_blank" rel="noreferrer" className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md">
								<BsFillArrowUpRightCircleFill />
								{destination.length > maxlength ? `${destination.slice(0, maxlength)}...` : destination}
							</a>
							{postedBy?._id === googleId && (
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation()
										deletePin(_id)
									}}
									className="bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none"
								>
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
				)}
			</div>
			<Link to={`/user-profile/${postedBy._id}`} className="flex gap-2 mt-2 items-center">
				<img alt="user-profile" className="w-8 h-8 rounded-full object-cover" src={postedBy.image} />
				<p className="font-semibold capitalize">{postedBy.userName}</p>
			</Link>
		</div>
	)
}

export default Pin
