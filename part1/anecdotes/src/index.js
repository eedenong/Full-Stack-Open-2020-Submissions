import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

//finds the index of the maximum element in the array
function findIndexOfMax(array) {
	if (array.length === 0) {
		return -1
	}

	let max = array[0]
	let maxIdx = 0

	for (let i = 0; i < array.length; i++) {
		if (array[i] > max) {
			max = array[i]
			maxIdx = i
		}
	}

	return maxIdx
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

  // find the index of the anecdote with the most votes
  const maxVotesAnecdoteIndex = findIndexOfMax(scores)
  
  return (
    <div>
		<div>
			<h1>Anecdote of the day</h1>
			<div>{props.anecdotes[selected]}</div>
			<div>has {scores[selected]} votes</div>
			<button onClick={handleVote}>vote</button>
			<button onClick={handleNextAnecdote}>next anecdote</button>
		</div>
		<div>
			<h1>Anecdote with most votes</h1>
			<div>{props.anecdotes[maxVotesAnecdoteIndex]}</div>
			<div>has {scores[maxVotesAnecdoteIndex]} votes</div>
		</div>
		
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