import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  const zeroArray = new Array(props.anecdotes.length).fill(0)
  const [scores, setScore] = useState(zeroArray)

  const handleNextAnecdote = () => {
	const randInt = getRandomInteger(0, 5)
	console.log("Current random integer is:", randInt)
	setSelected(randInt)
  }

  const handleVote = () => {
	console.log("Voted for ", selected)
	const copy = [...scores]
	copy[selected] += 1
	setScore(copy)
  }
  return (
    <div>
		<div>{props.anecdotes[selected]}</div>
		<div>has {scores[selected]} votes</div>
		<button onClick={handleVote}>vote</button>
      	<button onClick={handleNextAnecdote}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)