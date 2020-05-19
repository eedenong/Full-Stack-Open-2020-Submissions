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
  const part1 = props.content[0]
  const part2 = props.content[1]
  const part3 = props.content[2]

  return (
    <div>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  const contentArr = [part1, part2, part3]
  
  return (
    <div>
      <Header course={course} />
      <Content content={contentArr} />
      <Total number={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))