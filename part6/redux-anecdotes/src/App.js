import React from 'react'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <Anecdotes />
    </div>
  )
}

export default App