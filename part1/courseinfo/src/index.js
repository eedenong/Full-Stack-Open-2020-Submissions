import React from 'react'
import ReactDOM from 'react-dom'

//Header handles rendering of course name
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
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
  const part1 = props.course.parts[0]
  const part2 = props.course.parts[1]
  const part3 = props.course.parts[2]
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
  const exercises1 = props.course.parts[0].exercises
  const exercises2 = props.course.parts[1].exercises
  const exercises3 = props.course.parts[2].exercises
  return (
    <p>
      Number of exercises {exercises1 + exercises2 +exercises3}
    </p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))