import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Define Button component
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

//Define Display component
const Statistic = ({text, value}) => {
	// adds a % for the statistic for percentage of positive feedback
	if (text === 'positive') {
		return (
			<div>{text} {value} %</div>
		)
	}
	return (
		<div>{text} {value}</div>
	)
	
}

const Statistics = ({good, neutral, bad, total, score}) => {
	if (total === 0) {
		return (
			<div>
				<h1>statistics</h1>
				<div>No feedback given</div>
			</div>
		)
	}
	return (
		<div>
			<h1>statistics</h1>
			<Statistic text='good' value={good} />
			<Statistic text='neutral' value={neutral} />
			<Statistic text='bad' value={bad} />
			<Statistic text='average' value={score / total} />
			<Statistic text='positive' value={(good / total) * 100} />
		</div>
	)
}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [total, setTotal] = useState(0)
	const [score, setScore] = useState(0)
	
	//define event handlers
	const handleGood = () => {
		setGood(good + 1)
		setScore(score + 1)
		setTotal(total + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
		setTotal(total +  1)
	}

	const handleBad = () => {
		setBad(bad + 1)
		setScore(score - 1)
		setTotal(total + 1)
	}

	return (
	<div>
		<div>
			<h1>give feedback</h1>
			<Button onClick={handleGood} text='good' />
			<Button onClick={handleNeutral} text='neutral' />
			<Button onClick={handleBad} text='bad'/>
		</div>
		<Statistics good={good} neutral={neutral} bad={bad} total={total} score={score} />
	</div>
	)
}

ReactDOM.render(<App />, 
document.getElementById('root')
)
