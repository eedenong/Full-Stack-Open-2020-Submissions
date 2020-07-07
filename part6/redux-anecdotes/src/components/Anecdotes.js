import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL') {
      return anecdotes
    }

    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })
  const byLikes = (a, b) => {
    if (a.votes > b.votes) {
      return -1
    } else if (a.votes < b.votes) {
      return 1
    } else {
      return 0
    }
  }

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    const notification = `you voted ${anecdote.content}`
    dispatch(setNotification(notification, 5))
  }

  return (
    <ul>
      {anecdotes.sort(byLikes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </ul>
  )
}

export default Anecdotes