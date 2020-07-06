import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const notification = `created anecdote: ${content}`
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(displayNotification(notification))
    dispatch(createAnecdote(newAnecdote))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return(
    <div>
      <h2>Create new anecdote</h2> 
      <form onSubmit={addAnecdote}>
        <input name='anecdote'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm