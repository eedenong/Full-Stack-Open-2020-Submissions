import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  return (
    <div>
      filter<input name='filter' type='text' onChange={handleFilterChange} />
    </div>
  )
}

export default AnecdoteFilter