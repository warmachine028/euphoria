import { useState, useEffect } from 'react'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import PageNotFound from './PageNotFound'

const Search = ({ searchTerm }) => {
	const [pins, setPins] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (searchTerm !== '') {
			setLoading(true)
			const query = searchQuery(searchTerm.toLowerCase())

			client.fetch(query).then((data) => {
				setPins(data)
				setLoading(false)
			})
		} else {
			client.fetch(feedQuery).then((data) => {
				setPins(data)
				setLoading(false)
			})
		}
	}, [searchTerm])

	return (
		<div>
			{loading && <Spinner message="Searching for pins..." />}
			{pins?.length ? <MasonryLayout pins={pins} /> : ''}
			{!pins?.length && searchTerm !== '' && !loading && <PageNotFound />}
		</div>
	)
}

export default Search
