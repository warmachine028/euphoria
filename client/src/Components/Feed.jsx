import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import PageNotFound from './PageNotFound'
const Feed = () => {
	const [loading, setLoading] = useState(false)
	const [pins, setPins] = useState(null)
	const { categoryId } = useParams()

	useEffect(() => {
		setLoading(true)
		const query = categoryId ? searchQuery(categoryId) : feedQuery
		client.fetch(query).then((data) => {
			setPins(data)
			setLoading(false)
		})
	}, [categoryId])

	if (loading) return <Spinner message="We are adding new ideas to your feed!" />

	return pins?.length ? <MasonryLayout pins={pins} /> : <PageNotFound />
}

export default Feed
