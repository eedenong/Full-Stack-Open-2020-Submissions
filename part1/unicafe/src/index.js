import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Define Button component
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

//Define Display component
const Display = ({text, count}) => <div>{text} {count}</div>

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	//define event handlers
	const handleGood = () => {
	setGood(good + 1)
	}

	const handleNeutral = () => {
	setNeutral(neutral + 1)
	}

	const handleBad = () => {
	setBad(bad + 1)
	}

	return (
	<div>
		<div>
			<h1>give feedback</h1>
			<Button onClick={handleGood} text='good' />
			<Button onClick={handleNeutral} text='neutral' />
			<Button onClick={handleBad} text='bad'/>
		</div>
		<div>
			<h1>statistics</h1>
			<Display text='good' count={good} />
			<Display text='neutral' count={neutral} />
			<Display text='bad' count={bad} />
		</div>
	</div>
	)
}

ReactDOM.render(<App />, 
document.getElementById('root')
)
