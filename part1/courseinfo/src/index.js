import React from 'react'
import ReactDOM from 'react-dom'

//Header handles rendering of course name
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

//Part renders name and number of exercises for particular part
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  )
}

//Content renders parts and exercises
const Content = (props) => {
  return (
    <div>
      <Part name={props.names[0]} exercise={props.exercises[0]} />
      <Part name={props.names[1]} exercise={props.exercises[1]} />
      <Part name={props.names[2]} exercise={props.exercises[2]} />
    </div>
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
  const namesArr = [part1, part2, part3]
  const exercisesArr = [exercises1, exercises2, exercises3]
  
  return (
    <div>
      <Header course={course} />
      <Content names={namesArr} exercises={exercisesArr} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))