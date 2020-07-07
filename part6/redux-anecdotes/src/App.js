import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <Anecdotes />
    </div>
  )
}

export default App