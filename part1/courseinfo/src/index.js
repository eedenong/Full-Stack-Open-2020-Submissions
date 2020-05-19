import React from 'react'
import ReactDOM from 'react-dom'

//Header handles rendering of course name
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

//Content renders parts and exercises
const Content = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

//Total renders total number of exercises
const Total = (props) => {
  return (
    <p>
      Number of exercises {props.number}
    </p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))