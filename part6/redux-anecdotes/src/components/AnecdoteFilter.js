import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  const handleFilterChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.setFilter(filter)
  }

  return (
    <div>
      filter<input name='filter' type='text' onChange={handleFilterChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(AnecdoteFilter)

export default ConnectedFilter